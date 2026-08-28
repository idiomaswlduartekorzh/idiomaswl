import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'japones',
  'a2',
  "20 episodios narrativos A2: «二十年目のスタンプ», temporada 2. Guion dialogado con romaji, vocabulario, preguntas y transcripción bilingüe.",
);

export const metadata: Metadata = {
  title: 'Japonés A2 — Elige una habilidad',
  description: 'Japonés A2: て-form, た-form, ～ています, ～たいです, ～ことができます, ～なければなりません. Lectura, gramática, vocabulario, escritura, habla y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/japones/a2' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: '読む (Yomu)',
    desc: '5 textos A2 en japonés (80-120 palabras) con romaji. Vocabulario interactivo clickeable, 6 preguntas por texto.',
    count: '5 textos · 30 preguntas', href: '/practica/japones/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: '文法 (Bunpō)',
    desc: 'て-form, た-form (pasado), ～ています, ～たいです (querer), ～ことができます (poder) y ～なければなりません (deber).',
    count: '5 temas · 50+ ejercicios', href: '/practica/japones/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: '書く (Kaku)',
    desc: '5 tareas A2 guiadas: emails, relatos, comparaciones. Acepta romaji o hiragana/katakana.',
    count: '5 prompts guiados', href: '/practica/japones/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: '話す (Hanasu)',
    desc: '20 frases A2 con contexto situacional, romaji y guía de pronunciación para hispanohablantes.',
    count: '20 frases esenciales', href: '/practica/japones/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: '語彙 (Goi)',
    desc: '8 sets temáticos × 10 palabras. Script japonés + romaji + español. 3 modos de práctica.',
    count: '8 sets · 80+ palabras', href: '/practica/japones/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: '聞く (Kiku)',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/japones/a2/escucha', available: true,
  },
];

export default function JaponesA2Page() {
  return (
    <>
      <CourseSchema
        name="Japonés A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Japonés nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/japones/a2"
        educationalLevel="A2"
        teaches="Japonés, habilidades MCER"
        inLanguage="ja"
      />
      <SkillHub
        langHref="/practica/japones"
        langLabel="🇯🇵 Japonés"
        levelLabel="A2"
        eyebrow="Japonés A2 — 初級"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar el japonés elemental. Practica て-form, た-form, ～ています y más."
        accent="#bc002d"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>ヒント (consejo):</strong> Empieza por <strong>文法 · Gramática</strong> para aprender la て-form — la llave de la gramática A2. Luego combínala con <strong>読む · Lectura</strong> para textos reales.
          </>
        }
      />
      <PracticaWABanner
        idioma="japonés"
        color="#bc002d"
        msg="Hola, estoy practicando japonés A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
