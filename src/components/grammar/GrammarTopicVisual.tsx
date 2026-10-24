import Image from 'next/image'
import type { GrammarTopic } from '@/data/grammar/types'
import {
  GRAMMAR_VISUAL_LANGUAGES,
  grammarVisualAlt,
  grammarVisualPath,
  type GrammarVisualLanguage,
  type GrammarVisualLevel,
} from '@/lib/grammar-visual'
import styles from './GrammarTopicVisual.module.css'

export default function GrammarTopicVisual({
  topic,
  idioma,
  nivel,
  priority = false,
}: {
  topic: GrammarTopic
  idioma: GrammarVisualLanguage
  nivel: GrammarVisualLevel
  priority?: boolean
}) {
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const imagePath = grammarVisualPath(idioma, nivel, topic.slug)

  return (
    <figure className={styles.figure} aria-labelledby={`visual-caption-${topic.slug}`}>
      <div className={styles.heading}>
        <div>
          <span>Guía visual para guardar y compartir</span>
          <h2>Explicación visual de {topic.shortTitle}</h2>
        </div>
        <p>{language.native} · {nivel.toUpperCase()}</p>
      </div>
      <a href={imagePath} className={styles.imageLink} aria-label={`Abrir la infografía de ${topic.shortTitle} en tamaño completo`}>
        <Image
          src={imagePath}
          alt={grammarVisualAlt(topic, idioma, nivel)}
          width={1200}
          height={630}
          sizes="(max-width: 820px) 100vw, 1120px"
          priority={priority}
          unoptimized
        />
      </a>
      <figcaption id={`visual-caption-${topic.slug}`}>
        <span>Regla clave</span>
        <strong>{topic.guide.formula}</strong>
        <p>Imagen educativa original de Idiomas WeLearn. Ábrela para verla en tamaño completo.</p>
      </figcaption>
    </figure>
  )
}
