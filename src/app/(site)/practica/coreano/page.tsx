import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import KoreanToolsClient from './KoreanToolsClient';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Coreano — Elige tu nivel TOPIK',
  description: 'Ejercicios interactivos de coreano por nivel. Gramática A1, A2 y B1: Hangul, partículas, verbos y conectores TOPIK.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/coreano' },
};

const NIVELES = [
  {
    nivel: 'A1', name: '초급 · Principiante',
    desc: 'Hangul, 이에요/예요, partículas (은/는 이/가 을/를), números y verbos -아/어요.',
    href: '/practica/coreano/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  { nivel: 'A2', name: '초급+', desc: '과거형 (-았/었어요), verbos irregulares, expresiones de tiempo.', href: '/practica/coreano/a2', available: true, count: '20 temas de gramática' },
  { nivel: 'B1', name: '중급', desc: 'Conectores (-고, -지만, -아서), honoríficos y vocabulario TOPIK II.', href: '/practica/coreano/b1', available: true, count: '20 temas de gramática' },
  { nivel: 'B2', name: '중급+', desc: 'Patrones causales y condicionales, registro formal/informal.', available: false },
  { nivel: 'C1', name: '고급', desc: 'Gramática avanzada, vocabulario académico y nivel TOPIK II 5–6.', available: false },
];

const HERRAMIENTAS = [
  { name: '🔊 Lector Hangul', desc: 'Ciclo de lectura A1–B1 con descomposición de sílabas Hangul y romanización.', href: '/practica/coreano#herramientas', tag: 'En esta página' },
  { name: '🎤 Expresión Oral 1', desc: 'Introducción en coreano: 자기소개 (jagi sogae) con frases guiadas.', href: '/practica/korean-speaking-1', tag: 'Actividad' },
  { name: '📚 Vocabulario', desc: 'Palabras esenciales en coreano organizadas por tema con tarjetas de memoria.', href: '/practica/vocabulario-coreano', tag: 'Actividad' },
];

export default function CoreanoPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Coreano — Hangul y gramática TOPIK"
        description="Ejercicios interactivos de coreano por nivel TOPIK. Hangul, partículas, verbos y vocabulario esencial."
        url="https://www.idiomaswl.com/practica/coreano"
        educationalLevel="A1,A2,B1"
        teaches="Coreano, Hangul, TOPIK"
        inLanguage="es"
      />
      <LanguageHub
        langLabel="🇰🇷 Coreano"
        eyebrow="🇰🇷 Coreano / 한국어"
        title="Elige tu nivel"
        lead="El coreano usa el alfabeto Hangul (한글), diseñado científicamente en 1443. Aprenderás a leerlo en menos de una semana."
        accent="#534AB7"
        levels={NIVELES}
        tools={HERRAMIENTAS}
        toolsEyebrow="Herramientas adicionales"
        beforeLevels={<HistoriasCard lang="coreano" />}
      />
      <KoreanToolsClient />
    </>
  );
}
