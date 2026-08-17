import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Alemán A1 — Elige una habilidad',
  description: 'Alemán A1: Lesen, Grammatik (Artikel, sein, Pronomen), Schreiben, Sprechen, Vokabular und Hören.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/a1' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lesen', desc: '5 Texte A1: Anna in Berlin, die Familie, das Haus, das Essen, die Schule. Jedes Wort klickbar.', count: '5 Texte · 25 Fragen', href: '/practica/aleman/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammatik', desc: 'Los 15 temas del A1: artículos (der/die/das), kein, plural, sein/haben, orden de palabras (verbo en 2), acusativo, modales, verbos separables, es gibt y más. Con explicación, tablas y contraste español→alemán.', count: '15 temas · 200+ ejercicios', href: '/practica/aleman/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Schreiben', desc: '5 geführte Schreibaufgaben: sich vorstellen, Familie, Wohnung, Aktivitäten, Vorlieben.', count: '5 geführte Aufgaben', href: '/practica/aleman/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Sprechen', desc: '15 Überlebensphrasen auf Deutsch mit detaillierter Aussprache für spanischsprachige Lerner.', count: '15 Grundphrasen', href: '/practica/aleman/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vokabular', desc: '6 Themensets: Familie, Farben, Essen, Wochentage, Körper, Zahlen. Lernkarten + 3 Modi.', count: '6 Sets · 60+ Wörter', href: '/practica/aleman/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Hören', ...listeningCard('aleman', 'a1', '«Ein Zimmer in Berlin»: Emma kommt mit vierzehn Kartons an und lernt in einem Jahr, allein U-Bahn zu fahren und ein Café aufzuschließen.'), href: '/practica/aleman/a1/escucha' },
];

export default function AlemanA1Page() {
  return (
    <>
      <CourseSchema
        name="Alemán A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Alemán nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/aleman/a1"
        educationalLevel="A1"
        teaches="Alemán, habilidades MCER"
        inLanguage="al"
      />
      <SkillHub
        langHref="/practica/aleman"
        langLabel="🇩🇪 Alemán"
        levelLabel="A1"
        eyebrow="Alemán A1 — Anfänger"
        title="Elige una habilidad"
        lead="Sechs Fertigkeiten für ein solides Deutsch von Grund auf. Übe sie in beliebiger Reihenfolge."
        accent="#dd0000"
        skills={HABILIDADES}
      />
      <PracticaWABanner
        idioma="alemán"
        color="#dd0000"
        msg="Hola, estoy practicando alemán en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
