import type { Metadata } from 'next';
import LeccionClient from './LeccionClient';

export const metadata: Metadata = {
  title: 'Cómo funciona el Método WeLearn',
  description:
    'Once etapas diarias que imitan cómo el cerebro interioriza un idioma: activación, escucha, gramática, producción y revisión espaciada.',
  keywords: ['método WeLearn', 'cómo aprender idiomas', 'once pasos', 'aprendizaje de idiomas', 'producción guiada'],
  openGraph: {
    title: 'Cómo funciona el Método WeLearn',
    description: 'Once etapas diarias diseñadas para que el cerebro interiorice un idioma de verdad.',
    url: 'https://www.idiomaswl.com/leccion',
  },
  alternates: {
    canonical: 'https://www.idiomaswl.com/leccion',
  },
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
    { '@type': 'ListItem', position: 2, name: 'Lecciones', item: 'https://www.idiomaswl.com/leccion' },
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
