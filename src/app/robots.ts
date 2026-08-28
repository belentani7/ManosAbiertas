import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/static/"],
      },
    ],
    sitemap: "https://belentani7.github.io/ManosAbiertas/sitemap.xml",
    host: "https://belentani7.github.io/ManosAbiertas",
  };
}
