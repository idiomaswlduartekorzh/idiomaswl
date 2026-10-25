import SkillHub from '@/components/practica/SkillHub'

const LEVEL_COPY = {
  c1: {
    name: 'Avanzado',
    lead: 'Controla énfasis, postura y densidad en inglés académico y profesional con una ruta piloto de gramática avanzada.',
  },
  c2: {
    name: 'Maestría',
    lead: 'Perfecciona cohesión, flujo de información, evidencialidad y registro con decisiones gramaticales de nivel experto.',
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
      title="Piloto de gramática avanzada"
      lead={copy.lead}
      accent="#0066cc"
      skills={[{
        id: 'gramatica',
        name: 'Gramática',
        eng: 'Advanced Grammar',
        desc: 'Cuatro lecciones completas con explicación para hispanohablantes, infografía propia, seis niveles de práctica y PDF descargable.',
        count: '4 temas · 24 niveles de práctica',
        href: `/practica/ingles/${level}/gramatica`,
        available: true,
      }]}
      tip={<><strong>Piloto B2–C2:</strong> esta fase incluye páginas, práctica, infografías y PDF verificables para cada tema.</>}
    />
  )
}
