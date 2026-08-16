import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Ruso — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de ruso por nivel MCER. A1, A2 y B1 con gramática, casos, verbos de movimiento y práctica progresiva.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ruso' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Начинающий',
    desc: 'Alfabeto cirílico, pronombres, verbo "ser/estar", casos nominativos y números 1–20.',
    href: '/practica/ruso/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'Elementare', desc: 'Caso acusativo, pasado del verbo, verbos de movimiento (идти/ехать).', href: '/practica/ruso/a2', available: true, count: '20 temas de gramática' },
  { nivel: 'B1', name: 'Intermedio', desc: 'Aspecto verbal (perfectivo/imperfectivo), caso dativo e instrumental.', href: '/practica/ruso/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'Intermedio alto', desc: 'Participios, gerundios, subjuntivo y escritura académica.', available: false },
  { nivel: 'C1', name: 'Avanzado', desc: 'Registro formal, collocaciones idiomáticas y nivel TORFL-3.', available: false },
];

export default function RusoPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Ruso — Ejercicios interactivos MCER"
        description="Ejercicios de ruso por nivel MCER: gramática A1, A2 y B1, alfabeto cirílico, vocabulario y verbos de movimiento."
        url="https://www.idiomaswl.com/practica/ruso"
        educationalLevel="A1,A2,B1"
        teaches="Ruso, alfabeto cirílico"
        inLanguage="ru"
      />
      <LanguageHub
        langLabel="🇷🇺 Ruso"
        eyebrow="🇷🇺 Ruso / Русский"
        title="Elige tu nivel"
        lead="Ejercicios organizados por nivel MCER. El ruso usa el alfabeto cirílico — aquí aprenderás desde cero con transliteración."
        accent="#cc0000"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="ruso" />}
      />
    </>
  );
}
