import type { Metadata } from 'next';
import LinksClient from './LinksClient';

export const metadata: Metadata = {
  title: 'Links',
  description: 'Todos los links de Idiomas WeLearn: clases de inglés, coreano, precios, blog y más.',
  alternates: { canonical: '/links' },
  robots: { index: false, follow: true },
};

export default function LinksPage() {
  return <LinksClient />;
}
