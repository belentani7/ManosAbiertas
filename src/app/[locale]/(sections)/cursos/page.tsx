import { Metadata } from 'next';
import { CoursesLibrarySection } from '@/components/manos-abiertas/courses-library-section';

export const metadata: Metadata = {
  title: 'Cursos Externos',
  description: 'Biblioteca de cursos gratuitos de entidades públicas, ONGs y universidades con procedencia visible. Confirma disponibilidad y condiciones en la fuente.',
  openGraph: {
    title: 'Cursos · Manos Abiertas',
    description: 'Directorio de cursos gratuitos con procedencia visible para personas inmigrantes',
    type: 'website',
  },
};

export default function CursosPage() {
  return <CoursesLibrarySection />;
}
