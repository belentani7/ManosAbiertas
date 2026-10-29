import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { LANGUAGES } from "@/i18n/languages";

const LOCALES = LANGUAGES.map((language) => language.code);

const SECTIONS = [
  { path: "", priority: 1.0, changefreq: "daily" as const },
  { path: "/ia", priority: 0.9, changefreq: "weekly" as const },
  { path: "/cv", priority: 0.9, changefreq: "weekly" as const },
  { path: "/office", priority: 0.8, changefreq: "weekly" as const },
  { path: "/recursos", priority: 0.9, changefreq: "daily" as const },
  { path: "/derechos", priority: 0.9, changefreq: "weekly" as const },
  { path: "/herramientas", priority: 0.8, changefreq: "weekly" as const },
  { path: "/eventos", priority: 0.7, changefreq: "daily" as const },
  { path: "/cursos", priority: 0.8, changefreq: "weekly" as const },
  { path: "/comunidad", priority: 0.7, changefreq: "daily" as const },
  { path: "/contactos", priority: 0.6, changefreq: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [
    ...["index.html", "orientacion.html", "programas.html", "empleo.html", "recursos.html",
      "proyecto.html", "taller-documentos.html", "taller-criterio-ia.html",
      "taller-puente-pt-es.html", "campus/index.html"].map((path) => ({
      url: `${SITE_URL}/${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "index.html" ? 1 : 0.6,
    })),
  ];

  for (const locale of LOCALES) {
    for (const section of SECTIONS) {
      const url = `${SITE_URL}/${locale}${section.path}`;
      const alternates: Record<string, string> = {};
      
      for (const altLocale of LOCALES) {
        alternates[altLocale] = `${SITE_URL}/${altLocale}${section.path}`;
      }

      urls.push({
        url,
        changeFrequency: section.changefreq,
        priority: section.priority,
        alternates: { languages: alternates },
      });
    }
  }

  return urls;
}
