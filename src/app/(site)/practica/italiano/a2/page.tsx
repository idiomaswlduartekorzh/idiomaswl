import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'italiano',
  'a2',
  "20 episodi narrativi A2: «La bicicletta gialla», stagione 2. Copione dialogato, vocabolario, domande e trascrizione bilingue.",
);

export const metadata: Metadata = {
  title: 'Italiano A2 — Elige una habilidad',
  description: 'Italiano A2: passato prossimo, imperfetto, futuro semplice, pronomi e comparativi. Lectura, gramática, vocabulario, escritura, habla y escucha.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/a2' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lettura',
    desc: '5 testi A2 (80-120 palabras): viajes, trabajo, ciudad, amigos. Vocabulario clickeable, 6 domande per testo.',
    count: '5 testi · 30 domande', href: '/practica/italiano/a2/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammatica',
    desc: 'Passato prossimo (essere/avere), imperfetto, futuro semplice, pronomi diretti/indiretti e comparativi.',
    count: '5 temi · 50+ esercizi', href: '/practica/italiano/a2/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Scrittura',
    desc: '5 compiti guidati A2 con modello e checklist di revisione: email, racconto, descrizione.',
    count: '5 prompts guiados', href: '/practica/italiano/a2/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Parlato',
    desc: '20 frasi A2 con contesto situazionale, pronuncia e varianti formale/informale.',
    count: '20 frasi essenziali', href: '/practica/italiano/a2/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabolario',
    desc: '8 set tematici × 10 parole. 3 modalità: flashcard, scelta multipla e scrittura.',
    count: '8 set · 80+ parole', href: '/practica/italiano/a2/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Ascolto',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/italiano/a2/escucha', available: true,
  },
];

export default function ItalianoA2Page() {
  return (
    <>
      <CourseSchema
        name="Italiano A2 — Lectura, Gramática, Vocabulario y más"
        description="Practica Italiano nivel A2: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/italiano/a2"
        educationalLevel="A2"
        teaches="Italiano, habilidades MCER"
        inLanguage="it"
      />
      <SkillHub
        langHref="/practica/italiano"
        langLabel="🇮🇹 Italiano"
        levelLabel="A2"
        eyebrow="Italiano A2 — Elementare"
        title="Elige una habilidad"
        lead="Sei abilità per consolidare l&apos;italiano elementare. Practica passato prossimo, imperfetto, futuro semplice e pronomi."
        accent="#009246"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consiglio:</strong> Inizia con <strong>Gramática</strong> per padroneggiare il passato prossimo, poi esercitati con <strong>Lettura</strong> usando testi autentici.
          </>
        }
      />
      <PracticaWABanner
        idioma="italiano"
        color="#009246"
        msg="Hola, estoy practicando italiano A2 en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
