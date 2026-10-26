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
  uiLanguage?: 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt'
}) {
  const english = uiLanguage === 'en'
  const french = uiLanguage === 'fr'
  const german = uiLanguage === 'de'
  const italian = uiLanguage === 'it'
  const portuguese = uiLanguage === 'pt'
  const language = GRAMMAR_VISUAL_LANGUAGES[idioma]
  const imagePath = grammarVisualPath(idioma, nivel, topic.slug)
  const visualLabel = VISUAL_LABELS[getGrammarVisualKind(topic)]

  return (
    <figure className={styles.figure} aria-labelledby={`visual-caption-${topic.slug}`}>
      <div className={styles.heading}>
        <div>
          <span>{english ? 'Visual guide to save and share' : french ? 'Guide visuel à enregistrer et partager' : german ? 'Visuellen Leitfaden speichern und teilen' : italian ? 'Guida visiva da salvare e condividere' : portuguese ? 'Guia visual para salvar e compartilhar' : 'Guía visual para guardar y compartir'}</span>
          <h2>{english ? `Visual guide: ${topic.shortTitle}` : french ? `Guide visuel : ${topic.shortTitle}` : german ? `Visueller Leitfaden: ${topic.shortTitle}` : italian ? `Guida visiva: ${topic.shortTitle}` : portuguese ? `Guia visual: ${topic.shortTitle}` : `${visualLabel} de ${topic.shortTitle}`}</h2>
        </div>
        <p>{language.native} · {nivel.toUpperCase()}</p>
      </div>
      <a href={imagePath} className={styles.imageLink} aria-label={english ? `Open the full-size ${topic.shortTitle} infographic` : french ? `Ouvrir l’infographie ${topic.shortTitle} en grand format` : german ? `Infografik zu ${topic.shortTitle} in voller Größe öffnen` : italian ? `Apri l’infografica di ${topic.shortTitle} a grandezza intera` : portuguese ? `Abrir o infográfico de ${topic.shortTitle} em tamanho completo` : `Abrir la infografía de ${topic.shortTitle} en tamaño completo`}>
        <Image
          src={imagePath}
          alt={english ? `Visual guide to ${topic.shortTitle} for English ${nivel.toUpperCase()}: ${topic.guide.formula}` : french ? `Guide visuel de ${topic.shortTitle} en français ${nivel.toUpperCase()} : ${topic.guide.formula}` : german ? `Visueller Leitfaden zu ${topic.shortTitle} für Deutsch ${nivel.toUpperCase()}: ${topic.guide.formula}` : italian ? `Guida visiva a ${topic.shortTitle} per italiano ${nivel.toUpperCase()}: ${topic.guide.formula}` : portuguese ? `Guia visual de ${topic.shortTitle} para português ${nivel.toUpperCase()}: ${topic.guide.formula}` : grammarVisualAlt(topic, idioma, nivel)}
          width={1200}
          height={630}
          sizes="(max-width: 820px) 100vw, 1120px"
          priority={priority}
          unoptimized
        />
      </a>
      <figcaption id={`visual-caption-${topic.slug}`}>
        <span>{english ? 'Key rule' : french ? 'Règle clé' : german ? 'Kernregel' : italian ? 'Regola chiave' : portuguese ? 'Regra-chave' : 'Regla clave'}</span>
        <strong>{topic.guide.formula}</strong>
        <p>{english ? 'Original learning resource built from this lesson’s specific rule, table and examples. Open it at full size.' : french ? 'Ressource pédagogique originale construite à partir de la règle, du tableau et des exemples propres à cette leçon. Ouvrez-la en grand format.' : german ? 'Originales Lernmaterial aus der Regel, der Tabelle und den Beispielen dieser Lektion. Öffnen Sie es in voller Größe.' : italian ? 'Risorsa didattica originale costruita con la regola, la tabella e gli esempi specifici della lezione. Aprila a grandezza intera.' : portuguese ? 'Recurso didático original criado com a regra, a tabela e os exemplos específicos desta lição. Abra em tamanho completo.' : 'Recurso educativo original construido con la tabla, la regla o el mapa específico de esta lección. Ábrelo en tamaño completo.'}</p>
      </figcaption>
    </figure>
  )
}
