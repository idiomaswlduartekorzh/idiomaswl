import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { audioReady } from '@/data/practica/series/audio-ready';

export const metadata: Metadata = {
  title: 'Francés A1 — Elige una habilidad',
  description: 'Francés A1: lectura, gramática (articles, être, avoir), escritura, expresión oral, vocabulario y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/frances/a1' },
};

const AUDIO_LISTO = audioReady('frances');

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lecture', eng: 'Lectura', desc: '5 textos A1 con vocabulario clickeable. Sophie à Paris, la famille, la maison, les repas, l\'école.', count: '5 textos · 25 preguntas', href: '/practica/frances/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammaire', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos, être, avoir, verbos -ER, negación, partitivos, posesivos, futuro próximo y más. Cada tema con explicación, tablas, contraste español→francés y ejercicios.', count: '15 temas · 200+ ejercicios', href: '/practica/frances/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Écriture', eng: 'Escritura', desc: '5 tareas guiadas con modelo: presentarse, describir la familia, la casa, las actividades y los gustos.', count: '5 prompts guiados', href: '/practica/frances/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expression orale', eng: 'Expresión oral', desc: '15 frases de supervivencia en francés con pronunciación detallada para hispanohablantes.', count: '15 frases esenciales', href: '/practica/frances/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulaire', eng: 'Vocabulario', desc: '6 sets temáticos: la famille, les couleurs, la nourriture, les jours, le corps, les chiffres.', count: '6 sets · 60+ palabras', href: '/practica/frances/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Compréhension orale', eng: 'Escucha', desc: `20 episodios narrativos A1: «Le carnet rouge». Guion dialogado, vocabulario previo, preguntas y transcripción bilingüe.${AUDIO_LISTO ? '' : ' Audio en producción.'}`, count: AUDIO_LISTO ? '20 episodios · 100 preguntas' : '20 episodios · audio en producción', href: '/practica/frances/a1/escucha' },
];

export default function FrancesA1Page() {
  return (
    <>
      <CourseSchema
        name="Francés A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Francés nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/frances/a1"
        educationalLevel="A1"
        teaches="Francés, habilidades MCER"
        inLanguage="fr"
      />
      <SkillHub
        langHref="/practica/frances"
        langLabel="🇫🇷 Francés"
        levelLabel="A1"
        eyebrow="Francés A1 — Débutant"
        title="Elige una habilidad"
        lead="Six compétences pour un français solide depuis zéro. Tu peux les pratiquer dans n&apos;importe quel ordre."
        accent="#003189"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Conseil:</strong> Commence par <strong>Lecture</strong> pour activer le vocabulaire, puis renforce avec <strong>Grammaire</strong>. Les <strong>flashcards Vocabulaire</strong> consolident ce que tu as lu.
          </>
        }
      />
      <PracticaWABanner
        idioma="francés"
        color="#003189"
        msg="Hola, estoy practicando francés en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
