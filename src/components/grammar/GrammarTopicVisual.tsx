import Image from 'next/image'
import type { GrammarTopic } from '@/data/grammar/types'
import {
  GRAMMAR_VISUAL_LANGUAGES,
  grammarVisualAlt,
  grammarVisualPath,
  type GrammarVisualLanguage,
  type GrammarVisualLevel,
} from '@/lib/grammar-visual'
import { getGrammarVisualKind } from '@/lib/grammar-visual-blueprint'
import styles from './GrammarTopicVisual.module.css'

const VISUAL_LABELS = {
  script: 'Mapa de escritura',
  contrast: 'Comparación visual',
  reference: 'Tabla de referencia',
  transformation: 'Tabla de transformaciones',
  timeline: 'Línea de tiempo',
  structure: 'Constructor visual',
  usage: 'Mapa de uso',
} as const

export default function GrammarTopicVisual({
  topic,
  idioma,
  nivel,
  priority = false,
  uiLanguage = 'es',
}: {
  topic: GrammarTopic
  idioma: GrammarVisualLanguage
  nivel: GrammarVisualLevel
  priority?: boolean
  uiLanguage?: 'es' | 'en'
}) {
  const english = uiLanguage === 'en'
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const imagePath = grammarVisualPath(idioma, nivel, topic.slug)
  const visualLabel = VISUAL_LABELS[getGrammarVisualKind(topic)]

  return (
    <figure className={styles.figure} aria-labelledby={`visual-caption-${topic.slug}`}>
      <div className={styles.heading}>
        <div>
          <span>{english ? 'Visual guide to save and share' : 'Guía visual para guardar y compartir'}</span>
          <h2>{english ? `Visual guide: ${topic.shortTitle}` : `${visualLabel} de ${topic.shortTitle}`}</h2>
        </div>
        <p>{language.native} · {nivel.toUpperCase()}</p>
      </div>
      <a href={imagePath} className={styles.imageLink} aria-label={english ? `Open the full-size ${topic.shortTitle} infographic` : `Abrir la infografía de ${topic.shortTitle} en tamaño completo`}>
        <Image
          src={imagePath}
          alt={english ? `Visual guide to ${topic.shortTitle} for English ${nivel.toUpperCase()}: ${topic.guide.formula}` : grammarVisualAlt(topic, idioma, nivel)}
          width={1200}
          height={630}
          sizes="(max-width: 820px) 100vw, 1120px"
          priority={priority}
          unoptimized
        />
      </a>
      <figcaption id={`visual-caption-${topic.slug}`}>
        <span>{english ? 'Key rule' : 'Regla clave'}</span>
        <strong>{topic.guide.formula}</strong>
        <p>{english ? 'Original learning resource built from this lesson’s specific rule, table and examples. Open it at full size.' : 'Recurso educativo original construido con la tabla, la regla o el mapa específico de esta lección. Ábrelo en tamaño completo.'}</p>
      </figcaption>
    </figure>
  )
}
