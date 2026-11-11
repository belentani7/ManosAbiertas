import { Metadata } from 'next';
import { PricingSection } from '@/components/manos-abiertas/pricing-section';

export const metadata: Metadata = {
  title: 'Planes y precios',
  description: 'La plataforma educativa ManosAbiertas es gratuita. Soporte, despliegue gestionado y consultoría son servicios técnicos opcionales con precios públicos.',
  openGraph: {
    title: 'Planes y precios · Manos Abiertas',
    description: 'Acceso educativo gratuito · Soporte 89 €/mes · Despliegue gestionado 149 €/mes · Consultoría 89 €/hora',
    type: 'website',
  },
};

export default function PlanesPage() {
  return <PricingSection />;
}
