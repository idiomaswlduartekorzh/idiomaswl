import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Japonés — Elige tu nivel JLPT',
  description: 'Ejercicios interactivos de japonés por nivel JLPT. Gramática A1/N5, A2/N4 y B1/N3 con práctica progresiva.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'N5 · Principiante',
    desc: 'Hiragana, Katakana, ～は～です, あります/います, números y vocabulario cotidiano.',
    href: '/practica/japones/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: 'N4', desc: 'て形、～ている、adjectives い/な, verbos de movimiento, JLPT N4.', href: '/practica/japones/a2', available: true, count: '20 temas de gramática' },
  { nivel: 'B1', name: 'N3', desc: 'Forma ta/nai, kanji N3 (~350 chars), expresiones condicionales.', href: '/practica/japones/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: 'N2', desc: 'Gramática compleja, kanji N2 (~1000 chars), escritura formal.', available: false },
  { nivel: 'C1', name: 'N1', desc: 'Registro keigo, kanji N1 (~2000 chars), nivel JLPT N1.', available: false },
];

export default function JaponesPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Japonés — Ejercicios interactivos JLPT"
        description="Ejercicios de japonés por nivel JLPT: gramática A1/N5, A2/N4 y B1/N3, Hiragana, Katakana y vocabulario."
        url="https://www.idiomaswl.com/practica/japones"
        educationalLevel="A1,A2,B1,N5,N4,N3"
        teaches="Japonés, JLPT, Hiragana, Katakana"
        inLanguage="ja"
      />
      <LanguageHub
        langLabel="🇯🇵 Japonés"
        eyebrow="🇯🇵 Japonés / 日本語"
        title="Elige tu nivel"
        lead="El japonés usa 3 sistemas de escritura: ひらがな (hiragana), カタカナ (katakana) y 漢字 (kanji). Aquí empezamos con los dos primeros."
        accent="#bc002d"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="japones" />}
      />
    </>
  );
}
