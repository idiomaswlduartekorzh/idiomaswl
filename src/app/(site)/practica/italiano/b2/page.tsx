import SkillHub from '@/components/practica/SkillHub'
import type { Metadata } from 'next';
import { CourseSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Italiano B2 — Esercizi integrati',
  description: 'Italiano B2: práctica integrada con lectura, escucha, preguntas de comprensión y escritura argumentativa.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b2' },
};

const HABILIDADES = [
  {
    id: 'integrado',
    emoji: '🧩',
    name: 'Esercizio integrato',
    eng: 'Reading + Listening + Writing',
    desc: 'Simulacro integrado B2 sobre ciudadanía, juramento de fidelidad y doble nacionalidad. Lee, escucha, responde y escribe una opinión breve.',
    count: '1 simulacro · 6 preguntas + writing',
    href: '/practica/italiano/b2/integrato/oath-of-allegiance',
    available: true,
  },
  {
    id: 'lectura',
    emoji: '📖',
    name: 'Lettura',
    eng: 'Lectura',
    desc: 'Textos argumentativos B2 con inferencia, postura del autor y vocabulario institucional.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'gramatica',
    emoji: '📐',
    name: 'Grammatica',
    eng: 'Gramática',
    desc: 'Congiuntivo, periodo ipotetico, connettivi argomentativi y estilo indirecto.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'ascolto',
    emoji: '🎧',
    name: 'Ascolto',
    eng: 'Escucha',
    desc: 'Audios B2 con opiniones contrastadas, tesis, concesiones y conclusiones.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
  {
    id: 'scrittura',
    emoji: '✍️',
    name: 'Scrittura',
    eng: 'Escritura',
    desc: 'Ensayos breves con tesis, argumentos, contraargumento y conectores de nivel B2.',
    count: 'Próximamente',
    href: '#',
    available: false,
  },
];

export default function ItalianoB2Page() {
  return (
    <>
      <CourseSchema
        name="Italiano B2 — Ejercicios integrados"
        description="Practica Italiano B2 con lectura, escucha, comprensión y escritura argumentativa."
        url="https://www.idiomaswl.com/practica/italiano/b2"
        educationalLevel="B2"
        teaches="Italiano B2, lectura, escucha, escritura, ciudadanía"
        inLanguage="it"
      />
      <SkillHub
        langHref="/practica/italiano"
        langLabel="🇮🇹 Italiano"
        levelLabel="B2"
        eyebrow="Italiano B2 — Intermedio alto"
        title="Scegli un&apos;abilità"
        lead="Práctica de nivel B2 con tareas integradas: texto académico breve, audio con postura contraria, preguntas de comprensión y escritura argumentativa."
        accent="#009246"
        skills={HABILIDADES}
        tip={
          <>
            💡 <strong>Consiglio:</strong> empieza por el <strong>Esercizio integrato</strong>. Es el formato más completo para entrenar comprensión, postura crítica y producción escrita en una sola sesión.
          </>
        }
      />
    </>
  );
}
