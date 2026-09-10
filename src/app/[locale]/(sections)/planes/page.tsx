import { Metadata } from 'next';
import { PricingSection } from '@/components/manos-abiertas/pricing-section';

export const metadata: Metadata = {
  title: 'Planes y precios',
  description: 'Planes de Manos Abiertas: Comunidad gratis, Premium 9 €/mes y talleres para organizaciones. Precios claros, sin permanencia.',
  openGraph: {
    title: 'Planes y precios · Manos Abiertas',
    description: 'Comunidad gratis · Premium 9 €/mes · Organizaciones 199 €/taller',
    type: 'website',
  },
};

export default function PlanesPage() {
  return <PricingSection />;
}
