import { Metadata } from 'next';

interface OGImageOptions {
  title: string;
  description?: string;
  section?: string;
  locale: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://manosabiertas.space-z.ai';
const DEFAULT_IMAGE = '/og-default.png';
const TWITTER_HANDLE = '@manosabiertas';

const SECTION_CONFIG: Record<string, { title: string; description: string; image: string; color: string }> = {
  ia: { title: 'Aprende IA', description: '8 cursos interactivos de IA (ChatGPT, Gemini, Copilot, Claude, DeepSeek, Qwen, Perplexity, Meta AI)', image: '/og-ia.png', color: '#6366f1' },
  cv: { title: 'Crea tu CV', description: 'Constructor de CV profesional Europass/ATS con IA integrada', image: '/og-cv.png', color: '#059669' },
  office: { title: 'Curso Office', description: 'Curso completo de Word, Excel y PowerPoint desde cero', image: '/og-office.png', color: '#dc2626' },
  recursos: { title: 'Recursos Verificados', description: '3.647+ recursos verificados: cursos, ONGs, oficinas, teléfonos, webs', image: '/og-recursos.png', color: '#0891b2' },
  derechos: { title: 'Derechos y Ayudas', description: '61 guías verificadas: NIE, arraigo, asilo, vivienda, SMI, violencia de género', image: '/og-derechos.png', color: '#7c3aed' },
  herramientas: { title: 'Herramientas Prácticas', description: 'Calculadora coste de vida, gestor documentos, plantillas, recordatorios', image: '/og-herramientas.png', color: '#ea580c' },
  comunidad: { title: 'Comunidad', description: 'Foro, eventos, cursos externos, mentoría', image: '/og-comunidad.png', color: '#db2777' },
  contacto: { title: 'Contacto', description: 'Conecta con Manos Abiertas', image: '/og-contacto.png', color: '#4338ca' }
};

const ALL_LOCALES = ['es', 'en', 'pt', 'ca', 'fr', 'it', 'de', 'zh', 'ar', 'pt-BR'];
const SECTIONS = ['', 'ia', 'cv', 'office', 'recursos', 'derechos', 'herramientas', 'comunidad', 'contacto'];

export function generateMetadata(options: OGImageOptions): Metadata {
  const { title, description, section, locale, image, type = 'website', publishedTime, modifiedTime, authors, tags } = options;

  const sectionConfig = section ? SECTION_CONFIG[section] : null;
  const finalTitle = title || (sectionConfig ? `${sectionConfig.title} | Manos Abiertas` : 'Manos Abiertas · IA, CV y Derechos para personas inmigrantes en España');
  const finalDescription = description || sectionConfig?.description || 'Plataforma gratuita multilingüe para personas inmigrantes en España. Aprende IA, crea tu CV, conoce tus derechos y accede a 3.647+ recursos verificados.';
  const finalImage = image || sectionConfig?.image || DEFAULT_IMAGE;

  const url = `${BASE_URL}/${locale}${section ? `/${section}` : ''}`;
  const imageUrl = `${BASE_URL}${finalImage}`;

  const languages: Record<string, string> = {};
  for (const l of ALL_LOCALES) {
    languages[l] = `${BASE_URL}/${l}${section ? `/${section}` : ''}`;
  }

  const metadata: Metadata = {
    title: finalTitle,
    description: finalDescription,
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: url,
      languages
    },
    openGraph: {
      type,
      title: finalTitle,
      description: finalDescription,
      url,
      siteName: 'Manos Abiertas',
      locale: locale,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
          type: 'image/png'
        }
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors,
        tags
      })
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [imageUrl],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    category: section || 'general',
    classification: 'Plataforma gratuita para inmigrantes en España',
    keywords: [
      'inmigrantes España',
      'latinoamericanos en España',
      'IA para principiantes',
      'CV Europass',
      'derechos inmigrantes',
      'recursos verificados',
      'cursos gratis',
      'Manos Abiertas'
    ].concat(tags || [])
  };

  return metadata;
}

export function generateStructuredData(
  type: 'organization' | 'website' | 'course' | 'article' | 'faq' | 'howto' | 'localbusiness' | 'event',
  data: Record<string, unknown>
): object {
  const base = {
    '@context': 'https://schema.org',
    '@type': type.charAt(0).toUpperCase() + type.slice(1)
  };

  switch (type) {
    case 'organization':
      return {
        ...base,
        name: 'Manos Abiertas',
        url: BASE_URL,
        logo: `${BASE_URL}/logo.png`,
        description: 'Plataforma gratuita multilingüe para personas inmigrantes en España',
        sameAs: [
          'https://twitter.com/manosabiertas',
          'https://github.com/belentani7/ManosAbiertas'
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Spanish', 'English', 'Portuguese', 'French', 'Arabic', 'Chinese']
        }
      };

    case 'website':
      return {
        ...base,
        name: 'Manos Abiertas',
        url: BASE_URL,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${BASE_URL}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      };

    case 'course':
      return {
        ...base,
        name: data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'Manos Abiertas'
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: data.duration,
          inLanguage: data.language
        },
        educationalLevel: data.level,
        teaches: data.skills,
        inLanguage: data.language,
        isAccessibleForFree: true
      };

    case 'article':
      return {
        ...base,
        headline: data.title,
        description: data.description,
        image: data.image,
        datePublished: data.publishedTime,
        dateModified: data.modifiedTime,
        author: {
          '@type': 'Organization',
          name: 'Manos Abiertas'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Manos Abiertas',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/logo.png` }
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': data.url
        }
      };

    case 'faq':
      return {
        ...base,
        mainEntity: (data.questions as Array<{ question: string; answer: string }>).map((q) => ({
          '@type': 'Question',
          name: q.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: q.answer
          }
        }))
      };

    case 'howto':
      return {
        ...base,
        name: data.title,
        description: data.description,
        step: (data.steps as Array<{ title: string; description: string; image?: string }>).map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: step.title,
          text: step.description,
          ...(step.image && { image: step.image })
        })),
        totalTime: data.totalTime,
        estimatedCost: data.estimatedCost
      };

    case 'localbusiness':
      return {
        ...base,
        name: data.name,
        description: data.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: data.streetAddress,
          addressLocality: data.city,
          addressRegion: data.region,
          postalCode: data.postalCode,
          addressCountry: 'ES'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: data.lat,
          longitude: data.lng
        },
        telephone: data.phone,
        email: data.email,
        url: data.website,
        openingHoursSpecification: (data.hours as Array<{ day: string; open: string; close: string }>)?.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: h.day,
          opens: h.open,
          closes: h.close
        })),
        priceRange: data.priceRange,
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Mobile Payment',
        languages: ['Spanish', 'English', 'Portuguese', 'French', 'Arabic', 'Chinese']
      };

    case 'event':
      return {
        ...base,
        name: data.title,
        description: data.description,
        startDate: data.startDate,
        endDate: data.endDate,
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        location: {
          '@type': 'VirtualLocation',
          url: data.url
        },
        organizer: {
          '@type': 'Organization',
          name: 'Manos Abiertas',
          url: BASE_URL
        },
        offers: {
          '@type': 'Offer',
          price: data.price || 0,
          priceCurrency: 'EUR',
          availability: 'https://schema.org/InStock'
        }
      };

    default:
      return base;
  }
}

export function generateSitemapXml(resources: Array<{ id: string; updatedAt?: string }> = []): string {
  const now = new Date().toISOString().split('T')[0];

  let xml = '';

  for (const locale of ALL_LOCALES) {
    for (const section of SECTIONS) {
      const priority = section === '' ? '1.0' : '0.8';
      const changefreq = section === '' ? 'daily' : 'weekly';

      xml += `
  <url>
    <loc>${BASE_URL}/${locale}${section ? `/${section}` : ''}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>`;

      for (const loc of ALL_LOCALES) {
        xml += `\n    <xhtml:link rel="alternate" hreflang="${loc}" href="${BASE_URL}/${loc}${section ? `/${section}` : ''}"/>`;
      }
      xml += `
    <xhtml:link rel="alternate" hreflang="x-default" href="${BASE_URL}/${locale}${section ? `/${section}` : ''}"/>
  </url>`;
    }
  }

  // Resources
  for (const resource of resources.slice(0, 1000)) {
    for (const locale of ['es', 'en', 'pt']) {
      xml += `
  <url>
    <loc>${BASE_URL}/${locale}/recursos/${resource.id}</loc>
    <lastmod>${resource.updatedAt || now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${BASE_URL}/es/recursos/${resource.id}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${BASE_URL}/en/recursos/${resource.id}"/>
    <xhtml:link rel="alternate" hreflang="pt" href="${BASE_URL}/pt/recursos/${resource.id}"/>
  </url>`;
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xml}
</urlset>`;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /static/
Disallow: /*.json$

Sitemap: ${BASE_URL}/sitemap.xml
Host: ${BASE_URL}
`;
}

export function generateManifest(locale: string = 'es'): object {
  return {
    name: 'Manos Abiertas',
    short_name: 'ManosAbiertas',
    description: 'Plataforma gratuita multilingüe para personas inmigrantes en España',
    start_url: `/${locale}`,
    display: 'standalone',
    background_color: '#03060b',
    theme_color: '#ff1a4a',
    orientation: 'portrait-primary',
    scope: `/${locale}`,
    icons: [
      { src: '/icon-72.png', sizes: '72x72', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-96.png', sizes: '96x96', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-128.png', sizes: '128x128', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-144.png', sizes: '144x144', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-152.png', sizes: '152x152', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-384.png', sizes: '384x384', type: 'image/png', purpose: 'any maskable' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
    ],
    categories: ['education', 'utilities', 'productivity', 'social'],
    shortcuts: [
      { name: 'Aprende IA', short_name: 'IA', url: `/${locale}/ia`, description: 'Cursos de IA' },
      { name: 'Crea tu CV', short_name: 'CV', url: `/${locale}/cv`, description: 'Constructor CV' },
      { name: 'Recursos', short_name: 'Recursos', url: `/${locale}/recursos`, description: 'Buscar recursos' },
      { name: 'Derechos', short_name: 'Derechos', url: `/${locale}/derechos`, description: 'Guías legales' }
    ],
    display_override: ['window-controls-overlay', 'standalone'],
    launch_handler: { client_mode: 'focus-existing' }
  };
}
