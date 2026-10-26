import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Italiano — Elige tu nivel MCER',
  description: 'Esercizi interattivi e corsi completi di grammatica italiana dal livello A1 al C2, con mappe visive, pratica progressiva e PDF.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano' },
};

const NIVELES = [
  {
    nivel: 'A1', name: 'Principiante',
    desc: 'Artículos, essere/avere, verbos regulares, vocabulario cotidiano y frases de supervivencia.',
    href: '/practica/italiano/a1', available: true,
    count: '6 habilidades · 40+ ejercicios',
  },
  {
    nivel: 'A2', name: 'Elementare',
    desc: 'Passato prossimo, imperfetto, futuro semplice, pronomi diretti/indiretti e comparativi.',
    href: '/practica/italiano/a2', available: true,
    count: '6 habilidades · 50+ ejercicios',
  },
  {
    nivel: 'B1', name: 'Intermedio',
    desc: 'Congiuntivo, condizionale, particelle pronominali, lettura, scrittura, ascolto e vocabolario.',
    href: '/practica/italiano/b1', available: true,
    count: '7 percorsi · 230+ esercizi',
  },
  {
    nivel: 'B2', name: 'Intermedio alto',
    desc: 'Tempi, modi, pronomi, forme implicite e organizzazione testuale con pratica integrata e grammatica completa.',
    href: '/practica/italiano/b2', available: true,
    count: '30 lezioni · 90 PDF · pratica integrata',
  },
  { nivel: 'C1', name: 'Avanzato', desc: 'Sintassi complessa, modalità, coesione, registro e scrittura accademica.', href: '/practica/italiano/c1', available: true, count: '30 lezioni · 90 PDF' },
  { nivel: 'C2', name: 'Padronanza', desc: 'Prospettiva, portata, ritmo, polifonia e revisione editoriale di livello avanzato.', href: '/practica/italiano/c2', available: true, count: '30 lezioni · 90 PDF' },
];

export default function ItalianoPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Italiano — Ejercicios interactivos MCER"
        description="Percorso di italiano dal livello A1 al C2 con grammatica interattiva, mappe visive, esercizi progressivi e PDF."
        url="https://www.idiomaswl.com/practica/italiano"
        educationalLevel="A1, A2, B1, B2, C1, C2"
        teaches="Italiano, CILS, CELI"
        inLanguage="it"
      />
      <LanguageHub
        language="italiano"
        langLabel="🇮🇹 Italiano"
        eyebrow="🇮🇹 Italiano"
        title="Scegli il tuo livello"
        lead="Esercizi organizzati per livello QCER. Parti da A1 e prosegui fino a C2 con grammatica guidata, mappe visive, pratica estesa e materiali scaricabili."
        accent="#009246"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="italiano" />}
      />
    </>
  );
}
