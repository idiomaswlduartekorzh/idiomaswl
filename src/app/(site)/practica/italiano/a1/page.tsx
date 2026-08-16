import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

export const metadata: Metadata = {
  title: 'Italiano A1 — Elige una habilidad',
  description: 'Italiano A1: lectura con textos cortos, gramática (artículos, essere, avere, verbos), escritura guiada, expresión oral y vocabulario temático.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/a1' },
};

const HABILIDADES = [
  { id: 'lectura', emoji: '📖', name: 'Lettura', eng: 'Lectura', desc: '5 textos A1 con vocabulario clickeable. La vita di Sofia, la famiglia, la casa, il cibo, la scuola.', count: '5 textos · 25 preguntas', href: '/practica/italiano/a1/lectura' },
  { id: 'gramatica', emoji: '📐', name: 'Grammatica', eng: 'Gramática', desc: 'Los 15 temas del A1: artículos (il/lo/gli), essere, avere, verbos -are/-ere/-ire, negación, posesivos (il mio), preposiciones articuladas (al/nel/del), c\'è/ci sono y más. Con explicación, tablas y contraste español→italiano.', count: '15 temas · 200+ ejercicios', href: '/practica/italiano/a1/gramatica' },
  { id: 'escritura', emoji: '✍️', name: 'Scrittura', eng: 'Escritura', desc: '5 tareas guiadas con modelo: presentarsi, descrivere la famiglia, la casa, le attività e i gusti.', count: '5 prompts guiados', href: '/practica/italiano/a1/escritura' },
  { id: 'habla', emoji: '🗣️', name: 'Espressione orale', eng: 'Expresión oral', desc: '12 frases de supervivencia en italiano con pronunciación detallada para hispanohablantes.', count: '12 frases esenciales', href: '/practica/italiano/a1/habla' },
  { id: 'vocabulario', emoji: '📚', name: 'Vocabolario', eng: 'Vocabulario', desc: '6 sets temáticos: la famiglia, i colori, il cibo, i giorni, il corpo, i numeri.', count: '6 sets · 60+ palabras', href: '/practica/italiano/a1/vocabulario' },
  { id: 'escucha', emoji: '🎧', name: 'Ascolto', eng: 'Escucha', ...listeningCard('italiano', 'a1', '«Il primo mese a Bologna»: Valeria llega a estudiar y recorre el barrio a pie, de la panadería a la sastrería.'), href: '/practica/italiano/a1/escucha' },
];

export default function ItalianoA1Page() {
  return (
    <>
      <CourseSchema
        name="Italiano A1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Italiano nivel A1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con feedback inmediato."
        url="https://www.idiomaswl.com/practica/italiano/a1"
        educationalLevel="A1"
        teaches="Italiano, habilidades MCER"
        inLanguage="it"
      />
      <SkillHub
        langHref="/practica/italiano"
        langLabel="🇮🇹 Italiano"
        levelLabel="A1"
        eyebrow="Italiano A1 — Principiante"
        title="Scegli un&apos;abilità"
        lead="Sei abilità per un italiano solido da zero. Puoi praticarle in qualsiasi ordine."
        accent="#009246"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consiglio:</strong> Inizia con <strong>Lettura</strong> per attivare il vocabolario, poi rafforza con <strong>Grammatica</strong>. Le flashcard di <strong>Vocabolario</strong> consolidano quello che hai letto.
          </>
        }
      />
      <PracticaWABanner
        idioma="italiano"
        color="#009246"
        msg="Hola, estoy practicando italiano en WeLearn y me gustaría agendar una clase de diagnóstico gratis."
      />
    </>
  );
}
