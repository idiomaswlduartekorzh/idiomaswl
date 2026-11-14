import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Italiano B2 — Esercizi integrati',
  description: 'Italiano B2: esercizi integrati di lettura, ascolto e scrittura, con 20 casi di comunicazione sul lavoro.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b2' },
};

const HABILIDADES = [
  {
    id: 'integrado',
    emoji: '🧩',
    name: 'Esercizio integrato',
    eng: 'Lettura + ascolto + scrittura',
    desc: 'Un esercizio integrato su cittadinanza e doppia nazionalità: leggi, ascolta, rispondi e scrivi un breve parere.',
    count: '1 esercizio · 6 domande + scrittura',
    href: '/practica/italiano/b2/integrato/oath-of-allegiance',
    available: true,
  },
  {
    id: 'lectura',
    emoji: '📖',
    name: 'Lettura',
    eng: 'Lettura',
    desc: '20 testi B2 con inferenze, posizione dell’autore e lessico in contesto.',
    count: '20 letture · 120 domande',
    href: '/en/practice/italian/b2/reading',
    available: true,
  },
  {
    id: 'gramatica',
    emoji: '📐',
    name: 'Grammatica',
    eng: 'Grammatica',
    desc: '30 lezioni complete con mappe visive, pratica progressiva e tre PDF per argomento.',
    count: '30 argomenti · 90 PDF',
    href: '/practica/italiano/b2/gramatica',
    available: true,
  },
  {
    id: 'ascolto',
    emoji: '🎧',
    name: 'Ascolto',
    eng: 'Ascolto',
    desc: 'Audio B2 con punti di vista diversi, tesi, concessioni e conclusioni.',
    count: 'In arrivo',
    href: '#',
    available: false,
  },
  {
    id: 'escritura',
    emoji: '✍️',
    name: 'Scrittura',
    eng: 'Scrittura',
    desc: '20 casi di lavoro: leggi un’email, verifica i fatti, chiarisci il malinteso e scrivi una risposta.',
    count: '20 casi · 5 passaggi',
    href: '/practica/italiano/b2/escritura',
    available: true,
  },
];

export default function ItalianoB2Page() {
  return (
    <>
      <CourseSchema
        name="Italiano B2 — Esercizi integrati"
        description="Esercitati in italiano B2 con lettura, ascolto, comprensione e scrittura."
        url="https://www.idiomaswl.com/practica/italiano/b2"
        educationalLevel="B2"
        teaches="Italiano B2, lettura, ascolto, scrittura, cittadinanza"
        inLanguage="it"
      />
      <SkillHub
        langHref="/practica/italiano"
        langLabel="🇮🇹 Italiano"
        breadcrumbLabel="Esercizi"
        breadcrumbAriaLabel="Percorso di navigazione"
        levelLabel="B2"
        eyebrow="Italiano B2 — Intermedio alto"
        title="Scegli un'abilità"
        lead="Esercizi B2 con testi, audio e attività di scrittura per affrontare punti di vista e malintesi concreti."
        accent="#009246"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consiglio:</strong> inizia dall’<strong>Esercizio integrato</strong> per allenare comprensione e scrittura, oppure esplora i <strong>20 casi di lavoro</strong>.
          </>
        }
      />
    </>
  );
}
