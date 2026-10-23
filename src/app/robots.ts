import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://manosabiertas.space-z.ai";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    // Mantener las rutas y assets de Next accesibles al renderizado de Googlebot.
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
  };
}
