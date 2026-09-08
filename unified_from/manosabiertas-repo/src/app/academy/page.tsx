import type { Metadata } from "next";
import { AcademyPlatform } from "@/components/academy/academy-platform";

export const metadata: Metadata = {
  title: "Academia Abierta | Cursos gratuitos de CV, IA y Office",
  description:
    "Formación profesional gratuita y abierta para crear un CV, usar inteligencia artificial con criterio y dominar Office.",
  alternates: {
    canonical: "/academy",
  },
  openGraph: {
    title: "Academia Abierta",
    description:
      "Cursos gratuitos de CV, inteligencia artificial y Office para aprender a tu ritmo.",
    type: "website",
    url: "/academy",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Academia Abierta",
  description:
    "Cursos gratuitos de CV, inteligencia artificial y Office para público general.",
  isAccessibleForFree: true,
  audience: {
    "@type": "Audience",
    audienceType: "Público general",
  },
  hasPart: [
    { "@type": "Course", name: "CV profesional", isAccessibleForFree: true },
    { "@type": "Course", name: "Inteligencia artificial", isAccessibleForFree: true },
    { "@type": "Course", name: "Office y productividad", isAccessibleForFree: true },
  ],
};

export default function AcademyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <AcademyPlatform />
    </>
  );
}
