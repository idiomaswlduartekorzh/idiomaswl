import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Русская грамматика A1–C2 — полный курс с практикой',
  description: 'Русский язык от кириллицы до грамматики C2: объяснения, визуальные карты, поэтапная практика и три PDF для каждой продвинутой темы.',
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
  { nivel: 'B2', name: 'Самостоятельное владение', desc: 'Вид, падежная семантика, глаголы движения, причастия, сложные предложения и фокус.', href: '/practica/ruso/b2', available: true, count: '32 урока · 96 PDF' },
  { nivel: 'C1', name: 'Профессиональная точность', desc: 'Акциональность, синтаксическая компрессия, доказательность, академический стиль и регистр.', href: '/practica/ruso/c1', available: true, count: '32 урока · 96 PDF' },
  { nivel: 'C2', name: 'Мастерство дискурса', desc: 'Перспектива, прагматика, вариативность, жанровая грамматика и профессиональная редактура.', href: '/practica/ruso/c2', available: true, count: '36 уроков · 108 PDF' },
];

export default function RusoPage() {
  return (
    <>
      <CourseSchema
        name="Русская грамматика A1–C2 — полный курс"
        description="Русский язык от кириллицы и падежей до дискурса, стилистики и редактуры C2."
        url="https://www.idiomaswl.com/practica/ruso"
        educationalLevel="A1,A2,B1,B2,C1,C2"
        teaches="Русский язык, кириллица, падежи, вид глагола, синтаксис, прагматика, стиль"
        inLanguage="ru"
      />
      <LanguageHub
        language="ruso"
        langLabel="🇷🇺 Ruso"
        eyebrow="🇷🇺 Ruso / Русский"
        title="Выберите свой уровень"
        lead="От кириллицы и базовых падежей до сложного синтаксиса, прагматики и редакторского мастерства C2. Каждый этап соединяет объяснение, визуальную модель и практику."
        accent="#cc0000"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="ruso" />}
      />
    </>
  );
}
