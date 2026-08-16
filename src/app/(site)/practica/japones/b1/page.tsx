import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'japones',
  'b1',
  '20 episodios narrativos B1: «二十二年目の広場», temporada 3. Guion dialogado con romaji, vocabulario, preguntas y transcripción bilingüe.',
);

export const metadata: Metadata = {
  title: 'Japonés B1 — Elige una habilidad',
  description: 'Japonés B1: voz pasiva, causativa, condicional 〜たら, 〜のに y permisos/prohibiciones. Lectura, gramática, vocabulario, escritura, habla y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/japones/b1' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: '読む (Yomu)', eng: 'Lectura',
    desc: '5 textos B1 (120-150 palabras): noticias, cultura, sociedad. Pasiva y causativa en contexto.',
    count: '5 textos · 30 preguntas', href: '/practica/japones/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: '文法 (Bunpō)', eng: 'Gramática',
    desc: '〜てもいい/〜てはいけない, 受身形, 使役形, 〜たら y 〜のに. 10 ejercicios por tema.',
    count: '5 temas · 50+ ejercicios', href: '/practica/japones/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: '書く (Kaku)', eng: 'Escritura',
    desc: '5 tareas B1 con kanji + romaji: cartas, opiniones, comparaciones.',
    count: '5 prompts guiados', href: '/practica/japones/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: '話す (Hanasu)', eng: 'Expresión oral',
    desc: '20 frases B1 con kanji, romaji y fonética para debates y situaciones formales.',
    count: '20 frases esenciales', href: '/practica/japones/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: '語彙 (Goi)', eng: 'Vocabulario',
    desc: '8 sets temáticos × 10 palabras con romaji. Flashcard, MCQ y escritura.',
    count: '8 sets · 80+ palabras', href: '/practica/japones/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: '聞く (Kiku)', eng: 'Escucha',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/japones/b1/escucha', available: true,
  },
];

export default function JaponesB1Page() {
  return (
    <>
      <CourseSchema
        name="Japonés B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Japonés nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Voz pasiva, causativa, condicional y más."
        url="https://idiomaswl.com/practica/japones/b1"
        educationalLevel="B1"
        teaches="Japonés, habilidades MCER"
        inLanguage="ja"
      />
      <SkillHub
        langHref="/practica/japones"
        langLabel="🇯🇵 Japonés"
        levelLabel="B1"
        eyebrow="日本語 B1 — 中級 (Chūkyū)"
        title="Elige una habilidad"
        lead="Seis habilidades para el japonés intermedio. Practica la voz pasiva, causativa, condicional y permisos/prohibiciones."
        accent="#bc002d"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>ヒント (consejo):</strong> Empieza con <strong>文法 · Gramática</strong> para dominar la <strong>受身形 (voz pasiva)</strong>, luego practica en <strong>読む · Lectura</strong> y <strong>話す · Habla</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="japonés"
        color="#bc002d"
        msg="Hola, estoy practicando japonés B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
