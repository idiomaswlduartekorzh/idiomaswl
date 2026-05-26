import type { Metadata } from 'next';
import MetodoClient from './MetodoClient';

export const metadata: Metadata = {
  title: 'El Método WeLearn — Cómo aprendemos de verdad',
  description:
    'Descubre el método WeLearn: 11 etapas diarias diseñadas por nuestra fundadora, doctora en Filología, para que el cerebro interiorice un idioma sin memorización forzada. Más de 1.000 estudiantes y 100 certificaciones internacionales aprobadas.',
  keywords: [
    'método WeLearn', 'aprender idiomas método efectivo', 'método pedagógico idiomas Colombia',
    'IELTS preparación efectiva', 'TOEFL método aprendizaje', 'Zhanna Korzh filología',
    'adquisición de segunda lengua', 'once pasos aprendizaje idioma',
  ],
  openGraph: {
    title: 'El Método WeLearn — Ciencia + Pasión',
    description:
      'Más de 1.000 estudiantes. Más de 100 certificaciones internacionales aprobadas. Así funciona nuestra metodología.',
    url: 'https://idiomaswl.com/metodo',
  },
  alternates: { canonical: 'https://idiomaswl.com/metodo' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: 'Idiomas WeLearn',
  url: 'https://idiomaswl.com',
  description:
    'Plataforma educativa con metodología propia para aprender idiomas y obtener certificaciones internacionales.',
  founder: {
    '@type': 'Person',
    name: 'Zhanna Korzh',
    jobTitle: 'Doctora en Filología — Fundadora de WeLearn',
    description:
      'PhD en Filología con especialización en adquisición de segundas lenguas. Diseñó el método WeLearn de 11 etapas.',
  },
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
