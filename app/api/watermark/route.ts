import sharp from "sharp";

// Bakes a small brand watermark into the actual image bytes (not a page
// overlay) so property photos can't just be right-click-saved clean.
// Only ever fetches from Sanity's own CDN — the `src` param is not a
// general-purpose proxy.
const ALLOWED_HOST = "cdn.sanity.io";

export const revalidate = false;

const WATERMARK_TEXT = "THE SWEET HOME CO.";
// SVG doesn't measure text for us — sharp renders via librsvg, no DOM/canvas
// available — so the plate is sized from an estimated glyph width for
// Arial Bold uppercase rather than a fixed fraction of the image width.
const CHAR_WIDTH_EM = 0.62;

function buildWatermarkSvg(width: number) {
  let fontSize = Math.max(10, Math.round(width * 0.016));
  const iconArea = fontSize * 2.3;
  const rightPad = fontSize * 0.9;

  let plateWidth = Math.round(iconArea + WATERMARK_TEXT.length * fontSize * CHAR_WIDTH_EM + rightPad);

  // Keep the badge from dominating narrow/small source images.
  const maxPlateWidth = width * 0.45;
  if (plateWidth > maxPlateWidth) {
    const scale = maxPlateWidth / plateWidth;
    fontSize = Math.max(8, Math.round(fontSize * scale));
    plateWidth = Math.round(maxPlateWidth);
  }

  const plateHeight = Math.round(fontSize * 2.6);
  const padding = Math.round(width * 0.025);
  const dotRadius = fontSize * 0.5;
  const dotCx = fontSize * 1.15;
  const textX = fontSize * 2.3;
  const textY = plateHeight / 2 + fontSize * 0.35;

  const svg = `
    <svg width="${plateWidth}" height="${plateHeight}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${plateWidth}" height="${plateHeight}" rx="${plateHeight / 2}" fill="#0C2D52" fill-opacity="0.55"/>
      <circle cx="${dotCx}" cy="${plateHeight / 2}" r="${dotRadius}" fill="#F07820"/>
      <text x="${textX}" y="${textY}" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="600" letter-spacing="0.5" fill="#FFFFFF">${WATERMARK_TEXT}</text>
    </svg>
  `;

  return { svg, plateWidth, plateHeight, padding };
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

    const { svg, plateWidth, plateHeight, padding } = buildWatermarkSvg(width);
    const markBuffer = Buffer.from(svg);

    const watermarked = await image
      .composite([
        {
          input: markBuffer,
          top: Math.max(0, height - plateHeight - padding),
          left: Math.max(0, width - plateWidth - padding),
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
