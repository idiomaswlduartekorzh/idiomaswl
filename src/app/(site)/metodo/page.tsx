import type { Metadata } from 'next';
import MetodoClient from './MetodoClient';

export const metadata: Metadata = {
  title: 'El Método WeLearn — Cómo aprendemos de verdad',
  description:
    'Once etapas diarias, diseñadas por una doctora en Filología, para que el cerebro interiorice un idioma sin memorización forzada.',
  keywords: [
    'método WeLearn', 'aprender idiomas método efectivo', 'método pedagógico idiomas Colombia',
    'IELTS preparación efectiva', 'TOEFL método aprendizaje', 'Zhanna Korzh filología',
    'adquisición de segunda lengua', 'once pasos aprendizaje idioma',
  ],
  openGraph: {
    title: 'El Método WeLearn — Ciencia + Pasión',
    description:
      'Más de 1.000 estudiantes. Más de 100 certificaciones internacionales aprobadas. Así funciona nuestra metodología.',
    url: 'https://www.idiomaswl.com/metodo',
  },
  alternates: { canonical: 'https://www.idiomaswl.com/metodo' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'EducationalOrganization',
      name: 'Idiomas WeLearn',
      url: 'https://www.idiomaswl.com',
      description:
        'Plataforma educativa con metodología propia para aprender idiomas y obtener certificaciones internacionales.',
      founder: {
        '@type': 'Person',
        name: 'Zhanna Korzh',
        jobTitle: 'Doctora en Filología — Fundadora de WeLearn',
        description:
          'PhD en Filología con especialización en adquisición de segundas lenguas. Diseñó el método WeLearn de 11 etapas.',
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.idiomaswl.com' },
        { '@type': 'ListItem', position: 2, name: 'El Método WeLearn', item: 'https://www.idiomaswl.com/metodo' },
      ],
    },
  ],
};

export default function MetodoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MetodoClient />
    </>
  );
}
