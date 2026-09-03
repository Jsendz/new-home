import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./i18n/request.ts",
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    // No `search` restriction: the src query param is per-image and
    // validated inside the route handler itself (only cdn.sanity.io is
    // ever fetched), so pattern-matching it here would add nothing.
    localPatterns: [
      { pathname: "/api/watermark" },
    ],
  },
};

export default withNextIntl(nextConfig);
