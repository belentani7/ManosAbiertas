import type { ReactNode } from 'react';

interface SectionsLayoutProps {
  children: ReactNode;
}

export default function SectionsLayout({ children }: SectionsLayoutProps) {
  return <main id="main-content">{children}</main>;
}
