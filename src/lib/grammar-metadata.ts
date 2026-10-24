import type { Metadata } from 'next'
import type { GrammarTopic } from '@/data/grammar/types'
import { grammarVisualAlt, grammarVisualUrl, isGrammarVisualLanguage } from '@/lib/grammar-visual'
import {
  buildGrammarDescription,
  buildGrammarTitle,
  fitDescription,
  fitTitle,
} from '@/lib/seo-snippet'

const IDIOMA_LABELS: Record<string, string> = {
  ingles: 'Inglés',
  aleman: 'Alemán',
  frances: 'Francés',
  italiano: 'Italiano',
  portugues: 'Portugués',
  ruso: 'Ruso',
  japones: 'Japonés',
  coreano: 'Coreano',
}

export function generateGrammarMetadata(
  topic: GrammarTopic,
  idioma: string,
  nivel: string
): Metadata {
  const lang = IDIOMA_LABELS[idioma] ?? idioma
  const canonical = `https://www.idiomaswl.com/practica/${idioma}/${nivel}/gramatica/${topic.slug}`
  const visual = grammarVisualUrl(idioma, nivel, topic.slug)
  const visualAlt = isGrammarVisualLanguage(idioma)
    ? grammarVisualAlt(topic, idioma, nivel)
    : `Explicación visual de ${topic.shortTitle}`

  // El título y la descripción del buscador se derivan; NO son `topic.metaTitle`
  // ni `topic.description` en crudo. `description` se pinta además en el cuerpo
  // del artículo, así que está escrita para leerse en la página: en el resultado
  // de Google salía cortada y regalaba la respuesta. Ver `@/lib/seo-snippet`.
  const title = buildGrammarTitle(topic)
  const description = buildGrammarDescription(topic)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      // En redes no hay corte a 60/155: ahí sí compensa el titular largo.
      title: topic.metaTitle,
      description: topic.lead,
      type: 'website',
      locale: 'es_CO',
      url: canonical,
      images: [{ url: visual, width: 1200, height: 630, alt: visualAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: topic.metaTitle,
      description: topic.lead,
      images: [{ url: visual, alt: visualAlt }],
    },
    other: {
      'article:section': `Gramática ${lang} ${nivel.toUpperCase()}`,
    },
  }
}

export function generateGrammarIndexMetadata(idioma: string, nivel: string, topicCount?: number): Metadata {
  const lang = IDIOMA_LABELS[idioma] ?? idioma
  const canonical = `https://www.idiomaswl.com/practica/${idioma}/${nivel}/gramatica`
  const japaneseA1 = idioma === 'japones' && nivel.toLowerCase() === 'a1'
  const englishComplete = idioma === 'ingles' && topicCount
  return {
    // Sin sufijo de marca: Google ya muestra el nombre del sitio aparte, y aquí
    // cada carácter gastado en repetirlo es un carácter que se come el corte.
    title: fitTitle(japaneseA1 ? 'Gramática japonesa A1: 28 temas con audio y ejercicios' : englishComplete ? `Gramática inglesa ${nivel.toUpperCase()}: ${topicCount} temas con audio` : `Gramática de ${lang} ${nivel.toUpperCase()}: todos los temas con ejercicios`),
    description: fitDescription(
      japaneseA1
        ? 'Curso completo de gramática japonesa A1 para hispanohablantes: 28 temas, mapas visuales, audio nativo, práctica progresiva y PDF descargables.'
        : englishComplete
          ? `${topicCount} lecciones de gramática inglesa ${nivel.toUpperCase()} para hispanohablantes con audio nativo, PDF descargable y ejercicios corregidos al instante.`
        : `Todos los temas de gramática de ${lang} ${nivel.toUpperCase()}, cada uno con explicación para hispanohablantes y ejercicios corregidos al instante.`
    ),
    alternates: { canonical },
    openGraph: {
      title: `Gramática ${lang} ${nivel.toUpperCase()} — Temas`,
      description: `Domina la gramática ${lang} ${nivel.toUpperCase()} tema por tema, con explicación y práctica progresiva.`,
      type: 'website',
      locale: 'es_CO',
      url: canonical,
    },
  }
}
