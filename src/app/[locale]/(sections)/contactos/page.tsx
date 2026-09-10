import { Metadata } from 'next';
import { ContactsSection } from '@/components/manos-abiertas/contacts-section';

export const metadata: Metadata = {
  title: 'Contactos de Emergencia y Ayuda',
  description: 'Directorio de 41 contactos de emergencia y ayuda con procedencia visible. Confirma teléfonos, horarios y disponibilidad antes de usar cada servicio.',
  openGraph: {
    title: 'Contactos · Manos Abiertas',
    description: 'Directorio de contactos de emergencia y ayuda para personas inmigrantes en España',
    type: 'website',
  },
};

export default function ContactosPage() {
  return <ContactsSection />;
}
