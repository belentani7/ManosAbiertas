import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://manosabiertas.space-z.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    // Next.js assets must remain crawlable so search engines can render content.
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
