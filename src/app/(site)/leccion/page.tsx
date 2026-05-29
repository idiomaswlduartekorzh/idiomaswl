import type { Metadata } from 'next';
import LeccionClient from './LeccionClient';

export const metadata: Metadata = {
  title: 'Cómo funciona el Método WeLearn',
  description:
    'Once etapas diarias que imitan la forma en que el cerebro interioriza un idioma: activación, adquisición guiada, reconocimiento, escucha, gramática, producción y revisión espaciada. Preview interactivo.',
  keywords: ['método WeLearn', 'cómo aprender idiomas', 'once pasos', 'aprendizaje de idiomas', 'producción guiada'],
  openGraph: {
    title: 'Cómo funciona el Método WeLearn',
    description: 'Once etapas diarias diseñadas para que el cerebro interiorice un idioma de verdad.',
    url: 'https://idiomaswl.com/leccion',
  },
  alternates: {
    canonical: 'https://idiomaswl.com/leccion',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://idiomaswl.com' },
    { '@type': 'ListItem', position: 2, name: 'Lecciones', item: 'https://idiomaswl.com/leccion' },
  ],
};

export default function LeccionPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <LeccionClient />
    </>
  );
}
