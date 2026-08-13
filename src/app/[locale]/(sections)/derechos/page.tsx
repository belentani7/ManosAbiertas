import { Metadata } from 'next';
import { RightsSection } from '@/components/manos-abiertas/rights-section';

export const metadata: Metadata = {
  title: 'Derechos y Ayudas',
  description: 'Guías paso a paso sobre NIE, extranjería, asilo, nacionalidad, vivienda, SMI, prestaciones y violencia de género. Confirma la vigencia en las fuentes oficiales.',
  openGraph: {
    title: 'Derechos y Ayudas · Manos Abiertas',
    description: 'Guías de derechos y trámites con fuentes visibles para personas inmigrantes en España',
    type: 'website',
  },
};

export default function DerechosPage() {
  return <RightsSection />;
}
