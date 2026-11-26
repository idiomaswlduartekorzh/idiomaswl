import SkillHub from '@/components/practica/SkillHub'

const LEVEL_COPY = {
  c1: {
    name: 'Avanzado',
    lead: 'Practica lectura, gramática, escritura y expresión oral con tareas académicas y profesionales de nivel C1.',
  },
  c2: {
    name: 'Maestría',
    lead: 'Perfecciona la lectura crítica, la precisión gramatical, la escritura y la expresión oral de nivel C2.',
  },
} as const

export default function AdvancedEnglishLevelHub({ level }: { level: keyof typeof LEVEL_COPY }) {
  const copy = LEVEL_COPY[level]
  const levelLabel = level.toUpperCase()

  return (
    <SkillHub
      langHref="/practica/ingles"
      langLabel="🇬🇧 Inglés"
      levelLabel={levelLabel}
      eyebrow={`Inglés ${levelLabel} — ${copy.name}`}
      title="Elige una habilidad"
      lead={copy.lead}
      accent="#0066cc"
      skills={[{
        id: 'lectura',
        name: 'Reading',
        eng: 'Critical reading',
        desc: 'Read 20 texts, answer evidence-based questions and write a short response.',
        count: '20 readings · 120 questions',
        href: `/en/practice/english/${level}/reading`,
        available: true,
      }, {
        id: 'gramatica',
        name: 'Gramática',
        eng: 'Advanced Grammar',
        desc: 'Cuatro lecciones completas con explicación para hispanohablantes, infografía propia, seis niveles de práctica y PDF descargable.',
        count: '4 temas · 24 niveles de práctica',
        href: `/practica/ingles/${level}/gramatica`,
        available: true,
      }, {
        id: 'escritura',
        name: 'Writing',
        eng: 'Workplace correspondence',
        desc: 'Read the email and evidence, test your interpretation, then write and revise a careful reply.',
        count: '20 workplace cases',
        href: `/practica/ingles/${level}/escritura`,
        available: true,
      }, ...(level === 'c1' ? [{
        id: 'habla',
        name: 'Speaking',
        eng: 'Speaking',
        desc: 'Improvise with surprise words or defend a position with advanced vocabulary.',
        count: '20 improvisation questions · 20 dilemmas',
        href: '/practica/ingles/c1/habla',
        available: true,
      }] : [])]}
    />
  )
}
