import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Inglés B2 — Elige una habilidad',
  description: 'Inglés B2: Use of English (Multiple Choice Cloze + Word Formation), Reading, Writing y más. Preparación FCE Cambridge y ICFES Saber 11.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/ingles/b2' },
};

const HABILIDADES = [
  {
    id: 'uso-del-idioma', emoji: '🔤', name: 'Use of English', eng: 'Grammar & Vocab',
    desc: 'Multiple Choice Cloze (FCE Part 1 / ICFES) + Word Formation (FCE Part 3). 3 textos de cloze + 2 pasajes de formación de palabras.',
    count: '5 textos · 40 ejercicios', href: '/practica/ingles/b2/uso-del-idioma', available: true,
  },
  {
    id: 'reading', emoji: '📖', name: 'Reading', eng: 'Comprensión lectora',
    desc: 'Textos B2 con preguntas de comprensión, inferencia y vocabulario en contexto. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'writing', emoji: '✍️', name: 'Writing', eng: 'Escritura',
    desc: 'Essays, reports y formal letters al estilo FCE con criterios de evaluación y modelo. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'listening', emoji: '🎧', name: 'Listening', eng: 'Comprensión auditiva',
    desc: 'Multiple matching, sentence completion y multiple choice al estilo FCE. Próximamente.',
    count: 'Próximamente', href: '#', available: false,
  },
  {
    id: 'conectores', emoji: '🎯', name: 'Quest: Conectores', eng: 'Advanced Connectors',
    desc: 'Domina moreover, nevertheless, consequently, provided that, despite y más con 6 niveles progresivos.',
    count: '6 niveles · 48 ejercicios', href: '/practica/ingles/b2/conectores', available: true,
  },
];

export default function InglesB2Page() {
  return (
    <>
      <SkillHub
        langHref="/practica/ingles"
        langLabel="🇬🇧 Inglés"
        levelLabel="B2"
        eyebrow="Inglés B2 — Intermedio alto"
        title="Elige una habilidad"
        lead="Preparación para FCE Cambridge (B2) y refuerzo avanzado de inglés. Ejercicios enfocados en las habilidades donde más se necesita práctica."
        accent="#0066cc"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consejo:</strong> Empieza por <strong>Use of English</strong> — es la sección donde más estudiantes pierden puntos en el FCE y en el ICFES. Los errores en cloze y formación de palabras son los más sistemáticos y los más fáciles de corregir con práctica dirigida.
          </>
        }
      />
    </>
  );
}
