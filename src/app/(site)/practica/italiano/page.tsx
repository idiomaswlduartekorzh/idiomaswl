import LanguageHub from '@/components/practica/LanguageHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';
import HistoriasCard from '@/components/practica/HistoriasCard';

export const metadata: Metadata = {
  title: 'Práctica de Italiano — Elige tu nivel MCER',
  description: 'Ejercicios interactivos de italiano por nivel MCER. A1, A2, B1 y práctica integrada B2 con lectura, gramática, escucha y escritura.',
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
    desc: 'Ejercicios integrados estilo TOEFL/IELTS: lectura, escucha, comprensión y escritura argumentativa.',
    href: '/practica/italiano/b2', available: true,
    count: '1 ejercicio integrado',
  },
  { nivel: 'C1', name: 'Avanzato', desc: 'Grammatica complessa, collocazioni, scrittura avanzata e livello CILS C1.', available: false },
];

export default function ItalianoPage() {
  return (
    <>
      <CourseSchema
        name="Práctica de Italiano — Ejercicios interactivos MCER"
        description="Ejercicios de italiano por nivel MCER: A1, A2, B1 y práctica integrada B2. Vocabulario, gramática, lectura, escucha y escritura."
        url="https://www.idiomaswl.com/practica/italiano"
        educationalLevel="A1, A2, B1, B2"
        teaches="Italiano, CILS, CELI"
        inLanguage="it"
      />
      <LanguageHub
        langLabel="🇮🇹 Italiano"
        eyebrow="🇮🇹 Italiano"
        title="Scegli il tuo livello"
        lead="Ejercicios organizados por nivel MCER. Empieza en A1, avanza por A2 y B1 con gramática guiada o salta a los integrados B2."
        accent="#009246"
        levels={NIVELES}
        beforeLevels={<HistoriasCard lang="italiano" />}
        tools={[
          {
            name: 'La macchina del tempo',
            desc: 'Acumulativo autocorregible: 11 formas verbales, 39 retos y seis niveles sin subjuntivo.',
            href: '/practica/italiano/tiempos-verbales',
            tag: '6 niveles',
          },
        ]}
        toolsEyebrow="Laboratorio de gramática"
      />
    </>
  );
}
