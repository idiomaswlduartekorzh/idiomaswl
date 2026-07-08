/**
 * PracticeSchemaRenderer
 * Renderiza todos los JSON-LD schemas necesarios para una página de práctica
 * Uso:
 *   <PracticeSchemaRenderer lang="ingles" level="a1" skill="lectura" />
 */

import { getPracticeSchemas } from '@/lib/practica-metadata'

interface PracticeSchemaRendererProps {
  lang: string
  level: string
  skill: string
}

export function PracticeSchemaRenderer({ lang, level, skill }: PracticeSchemaRendererProps) {
  const { learningResourceSchema, breadcrumbSchema } = getPracticeSchemas(lang, level, skill)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }}
        suppressHydrationWarning
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        suppressHydrationWarning
      />
    </>
  )
}

interface LevelSchemaRendererProps {
  lang: string
  level: string
}

export function LevelSchemaRenderer({ lang, level }: LevelSchemaRendererProps) {
  const { getLevelSchemas } = require('@/lib/practica-metadata')
  const { breadcrumbSchema } = getLevelSchemas(lang, level)

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      suppressHydrationWarning
    />
  )
}
