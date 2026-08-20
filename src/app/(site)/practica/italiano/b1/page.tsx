import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import { PracticaWABanner } from '@/components/PracticaWABanner';
import { listeningCard } from '@/data/practica/series/page-copy';

const ESCUCHA = listeningCard(
  'italiano',
  'b1',
  '20 episodi narrativi B1: «Le chiavi della sartoria», stagione 3. Copione dialogato, vocabolario, domande e trascrizione bilingue.',
);

export const metadata: Metadata = {
  title: 'Italiano B1 — Elige una habilidad',
  description: 'Italiano B1: congiuntivo, condizionale, particelle, pronomi relativi, periodo ipotetico y discorso indiretto, con las seis habilidades.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b1' },
};

const HABILIDADES = [
  {
    id: 'lectura', emoji: '📖', name: 'Lectura', eng: 'Lettura',
    desc: '5 testi B1 (120-150 parole): attualità, cultura, scienza. Congiuntivo y Condizionale in contesto.',
    count: '5 testi · 30 domande', href: '/practica/italiano/b1/lectura', available: true,
  },
  {
    id: 'gramatica', emoji: '📐', name: 'Gramática', eng: 'Grammatica',
    desc: 'Congiuntivo, Condizionale, Particelle pronominali, Pronomi relativi, Periodo ipotetico y Discorso indiretto.',
    count: '6 percorsi · 100+ esercizi', href: '/practica/italiano/b1/gramatica', available: true,
  },
  {
    id: 'escritura', emoji: '✍️', name: 'Escritura', eng: 'Scrittura',
    desc: '5 compiti B1: email formali, saggi di opinione, descrizioni comparative.',
    count: '5 compiti guidati', href: '/practica/italiano/b1/escritura', available: true,
  },
  {
    id: 'habla', emoji: '🗣️', name: 'Expresión oral', eng: 'Parlato',
    desc: '20 espressioni B1 per discussioni, opinioni e conversazioni formali.',
    count: '20 espressioni essenziali', href: '/practica/italiano/b1/habla', available: true,
  },
  {
    id: 'vocabulario', emoji: '📚', name: 'Vocabulario', eng: 'Vocabolario',
    desc: '8 set tematici × 10 parole. Flashcard, quiz e scrittura.',
    count: '8 set · 80+ parole', href: '/practica/italiano/b1/vocabulario', available: true,
  },
  {
    id: 'escucha', emoji: '🎧', name: 'Escucha', eng: 'Ascolto',
    desc: ESCUCHA.desc,
    count: ESCUCHA.count, href: '/practica/italiano/b1/escucha', available: true,
  },
  {
    id: 'particelle', emoji: '🎯', name: 'Particelle pronominali', eng: 'Grammatica quest',
    desc: 'Guida + quest con XP: domina ci, ne, gli, le, vi in 6 livelli progressivi dentro grammatica B1.',
    count: '6 livelli · 48 esercizi', href: '/practica/italiano/b1/particelle', available: true,
  },
];

export default function ItalianoB1Page() {
  return (
    <>
      <CourseSchema
        name="Italiano B1 — Lectura, Gramática, Vocabulario y más"
        description="Practica Italiano nivel B1: lectura, gramática, vocabulario, escritura, habla y escucha. Ejercicios interactivos con congiuntivo, condizionale, particelle pronominali y pronomi relativi."
        url="https://www.idiomaswl.com/practica/italiano/b1"
        educationalLevel="B1"
        teaches="Italiano, habilidades MCER"
        inLanguage="it"
      />
      <SkillHub
        langHref="/practica/italiano"
        langLabel="🇮🇹 Italiano"
        levelLabel="B1"
        eyebrow="Italiano B1 — Intermedio"
        title="Elige una habilidad"
        lead="Sette percorsi per l&apos;italiano intermedio. Practica il congiuntivo, il condizionale, le particelle pronominali y i pronomi relativi."
        accent="#009246"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consiglio:</strong> Inizia con <strong>Gramática</strong> per padroneggiare il congiuntivo, poi pratica con <strong>Lettura</strong> e <strong>Scrittura</strong>.
          </>
        }
      />
      <PracticaWABanner
        idioma="italiano"
        color="#009246"
        msg="Hola, estoy practicando italiano B1 en WeLearn y me gustaría agendar una clase."
      />
    </>
  );
}
