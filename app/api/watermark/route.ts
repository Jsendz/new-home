import sharp from "sharp";

// Bakes a small brand watermark into the actual image bytes (not a page
// overlay) so property photos can't just be right-click-saved clean.
// Only ever fetches from Sanity's own CDN — the `src` param is not a
// general-purpose proxy.
const ALLOWED_HOST = "cdn.sanity.io";

export const revalidate = false;

// Fetched over HTTP (not read from disk) because files under /public
// aren't guaranteed to be present in the serverless function's own
// filesystem on Vercel — they're deployed as static assets instead.
// Cached per warm instance so repeat requests don't re-fetch it.
let cachedLogoSvg: string | null = null;

async function getLogoSvgText(request: Request): Promise<string> {
  if (cachedLogoSvg) return cachedLogoSvg;
  const logoUrl = new URL("/logo.svg", request.url);
  const res = await fetch(logoUrl);
  if (!res.ok) throw new Error(`Failed to fetch logo.svg (${res.status})`);
  cachedLogoSvg = await res.text();
  return cachedLogoSvg;
}

const LOGO_OPACITY = 0.75;

async function buildLogoWatermark(request: Request, imageWidth: number) {
  const svgText = await getLogoSvgText(request);
  // logo.svg has no built-in transparency, so wrap its contents in a
  // semi-opaque group before rasterizing — that bakes the fade into the
  // resulting PNG's alpha channel, which composite() then respects.
  const withOpacity = svgText
    .replace(/(<svg[^>]*>)/, `$1<g opacity="${LOGO_OPACITY}">`)
    .replace(/(<\/svg>)/, `</g>$1`);

  const markSize = Math.max(24, Math.round(imageWidth * 0.11));
  const padding = Math.round(imageWidth * 0.025);

  const buffer = await sharp(Buffer.from(withOpacity), { density: 300 })
    .resize(markSize, markSize)
    .png()
    .toBuffer();

  return { buffer, markSize, padding };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const src = searchParams.get("src");

  if (!src) {
    return new Response("Missing src", { status: 400 });
  }

  let sourceUrl: URL;
  try {
    sourceUrl = new URL(src);
  } catch {
    return new Response("Invalid src", { status: 400 });
  }

  if (sourceUrl.hostname !== ALLOWED_HOST) {
    return new Response("Source not allowed", { status: 400 });
  }

  const upstream = await fetch(sourceUrl.toString());
  if (!upstream.ok) {
    return new Response("Upstream fetch failed", { status: 502 });
  }
  const originalBuffer = Buffer.from(await upstream.arrayBuffer());

  try {
    const image = sharp(originalBuffer);
    const metadata = await image.metadata();
    const width = metadata.width ?? 900;
    const height = metadata.height ?? 600;

    const { buffer: markBuffer, markSize, padding } = await buildLogoWatermark(request, width);

    const watermarked = await image
      .composite([
        {
          input: markBuffer,
          top: Math.max(0, height - markSize - padding),
          left: Math.max(0, width - markSize - padding),
        },
      ])
      .webp({ quality: 82 })
      .toBuffer();

    return new Response(new Uint8Array(watermarked), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Watermarking failed, serving original image:", error);
    return new Response(new Uint8Array(originalBuffer), {
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") || "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  }
}
