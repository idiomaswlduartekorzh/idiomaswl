import type { Metadata } from 'next'
import type { GrammarTopic } from '@/data/grammar/types'
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
    },
    other: {
      'article:section': `Gramática ${lang} ${nivel.toUpperCase()}`,
    },
  }
}

export function generateGrammarIndexMetadata(idioma: string, nivel: string): Metadata {
  const lang = IDIOMA_LABELS[idioma] ?? idioma
  const canonical = `https://www.idiomaswl.com/practica/${idioma}/${nivel}/gramatica`
  return {
    // Sin sufijo de marca: Google ya muestra el nombre del sitio aparte, y aquí
    // cada carácter gastado en repetirlo es un carácter que se come el corte.
    title: fitTitle(`Gramática de ${lang} ${nivel.toUpperCase()}: todos los temas con ejercicios`),
    description: fitDescription(
      `Todos los temas de gramática de ${lang} ${nivel.toUpperCase()}, cada uno con explicación para hispanohablantes y ejercicios corregidos al instante.`
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
