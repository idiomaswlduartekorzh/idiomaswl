import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Inglés B1 — Elige una habilidad',
  description: 'Inglés B1: present perfect, past continuous, condicionales y voz pasiva. Lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ingles/b1' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Reading',
    desc: '10 lecturas B1 con audio narrado: noticias, cultura, ciencia. Present perfect y condicionales.',
    count: '10 lecturas · con audio', href: '/practica/ingles/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammar',
    desc: 'Present Perfect, Past Continuous, First/Second Conditional y Passive Voice. 10 ejercicios por tema.',
    count: '5 temas · 50+ ejercicios', href: '/practica/ingles/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Writing',
    desc: '5 tareas B1: ensayos de opinión, cartas formales, descripciones comparativas.',
    count: '5 prompts guiados', href: '/practica/ingles/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Speaking',
    desc: '20 frases B1 con registros formal e informal, para debates y discusiones.',
    count: '20 frases esenciales', href: '/practica/ingles/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulary',
    desc: '8 sets temáticos × 10 palabras. Modos: flashcard, MCQ y escribir.',
    count: '8 sets · 80+ palabras', href: '/practica/ingles/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Listening',
    ...listeningCard('ingles', 'b1', '«The Door Stays Open»: el edificio del café sale a la venta y Maya tiene una semana para reunir una oferta imposible.'),
    href: '/practica/ingles/b1/escucha', available: true,
  },
  {
    id: 'conjunciones', emoji: '🎯', name: 'Quest: Conjunciones', eng: 'Conjunctions Quest',
    desc: 'Domina and/but/although/when/if/however con 6 niveles progresivos: selección, escritura libre y sprint.',
    count: '6 niveles · 48 ejercicios', href: '/practica/ingles/b1/conjunciones', available: true,
  },
];

export default function InglesB1Page() {
  return (
    <>
      <CourseSchema
        name="Inglés B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Inglés nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://idiomaswl.com/practica/ingles/b1"
        educationalLevel="B1"
        teaches="Inglés, habilidades MCER"
        inLanguage="in"
      />
      <SkillHub
        langHref="/practica/ingles"
        langLabel="🇬🇧 Inglés"
        levelLabel="B1"
        eyebrow="Inglés B1 — Intermedio"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar el inglés intermedio. Practica present perfect, condicionales y voz pasiva."
        accent="#0066cc"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consejo:</strong> Empieza por <strong>Gramática</strong> para dominar el Present Perfect, luego aplícalo en <strong>Lectura</strong> y <strong>Escritura</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="inglés"
        color="#0066cc"
        msg="Hola, estoy practicando inglés B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
