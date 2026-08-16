import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Inglés A2 — Elige una habilidad',
  description: 'Inglés A2: pasado simple, comparativos, present continuous, going to/will y modales. Lectura, gramática, escritura, habla, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/a2' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Reading',
    desc: '10 lecturas A2 con audio narrado: viajes, trabajo, opiniones. Vocabulario clickeable y evidencia.',
    count: '10 lecturas · con audio', href: '/practica/ingles/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammar',
    desc: 'Past simple, past continuous, comparativos y superlativos, futuro (will/going to), present perfect, cuantificadores, modales y condicional. Explicación profunda por tema.',
    count: '15 temas · 240+ ejercicios', href: '/practica/ingles/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Writing',
    desc: '5 tareas A2 con gramática integrada, modelo y checklist de revisión.',
    count: '5 prompts guiados', href: '/practica/ingles/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Speaking',
    desc: '20 frases A2 con contexto situacional, pronunciación y variantes formal/informal.',
    count: '20 frases esenciales', href: '/practica/ingles/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabulary',
    desc: '8 sets temáticos × 10 palabras. 3 modos de práctica: flashcard, MCQ y escribir.',
    count: '8 sets · 80+ palabras', href: '/practica/ingles/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Listening',
    ...listeningCard('ingles', 'a2', '«Sam’s Corner»: Maya alquila el local de su abuelo y monta un café con veinte libros prestados de la biblioteca.'),
    href: '/practica/ingles/a2/escucha', available: true,
  },
];

export default function InglesA2Page() {
  return (
    <>
      <CourseSchema
        name="Inglés A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Inglés nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/ingles/a2"
        educationalLevel="A2"
        teaches="Inglés, habilidades MCER"
        inLanguage="in"
      />
      <SkillHub
        langHref="/practica/ingles"
        langLabel="🇬🇧 Inglés"
        levelLabel="A2"
        eyebrow="Inglés A2 — Elemental"
        title="Elige una habilidad"
        lead="Seis habilidades para consolidar el inglés elemental. Practica pasado simple, comparativos y modales."
        accent="#0066cc"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consejo:</strong> Empieza por <strong>Gramática</strong> para entender el pasado simple, luego practica con <strong>Lectura</strong> usando textos del mundo real.
          </>
        }
      />
      <PracticaWABanner
        idioma="inglés"
        color="#0066cc"
        msg="Hola, estoy practicando inglés A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
