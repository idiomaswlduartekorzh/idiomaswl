import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Alemán B1 — Elige una habilidad',
  description: 'Alemán B1: Konjunktiv II, Relativsätze, Passiv, temporale Konjunktionen e Indirekte Rede. 6 habilidades interactivas.',
  alternates: { canonical: 'https://idiomaswl.com/practica/aleman/b1' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lesen', eng: 'Lectura', desc: '5 Texte B1 (120-150 Wörter): Alltag, Kultur, Umwelt. Konjunktiv II y Passiv en contexto.', count: '5 Texte · 30 Fragen', href: '/practica/aleman/b1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatik', eng: 'Gramática', desc: 'Konjunktiv II, Relativsätze, Passiv Präsens, temporale Konjunktionen y Indirekte Rede.', count: '5 Themen · 50+ Übungen', href: '/practica/aleman/b1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Schreiben', eng: 'Escritura', desc: '5 Aufgaben B1: formelle Briefe, Meinungsaufsätze, Vergleiche.', count: '5 geleitete Aufgaben', href: '/practica/aleman/b1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Sprechen', eng: 'Expresión oral', desc: '20 Ausdrücke B1 für Diskussionen, Meinungen y formelle Gespräche.', count: '20 wesentliche Ausdrücke', href: '/practica/aleman/b1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vokabular', eng: 'Vocabulario', desc: '8 Themenbereiche × 10 Wörter. Lernkarten, MCQ y Schreiben.', count: '8 Sets · 80+ Wörter', href: '/practica/aleman/b1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Hören', eng: 'Escucha', ...listeningCard('aleman', 'b1', '«Der Brief ohne Absender»: ein Brief ohne Absender, ein altes Foto und zwei Partner, die seit dreißig Jahren nicht miteinander sprechen.'), href: '/practica/aleman/b1/escucha' },
];

export default function AlemanB1Page() {
  return (
    <>
      <CourseSchema
        name="Alemán B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Alemán nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://idiomaswl.com/practica/aleman/b1"
        educationalLevel="B1"
        teaches="Alemán, habilidades MCER"
        inLanguage="al"
      />
      <SkillHub
        langHref="/practica/aleman"
        langLabel="🇩🇪 Alemán"
        levelLabel="B1"
        eyebrow="Alemán B1 — Mittelstufe"
        title="Elige una habilidad"
        lead="Seis habilidades para el alemán intermedio. Practica Konjunktiv II, Relativsätze y Passiv."
        accent="#dd0000"
        skills={HABILIDADES}
        tip={
          <>
            💡 Empieza con <strong>Grammatik</strong> para dominar el Konjunktiv II, luego practica en <strong>Lesen</strong> y <strong>Schreiben</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="alemán"
        color="#dd0000"
        msg="Hola, estoy practicando alemán B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
