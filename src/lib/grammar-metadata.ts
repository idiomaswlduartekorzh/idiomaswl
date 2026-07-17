import type { Metadata } from 'next'
import type { GrammarTopic } from '@/data/grammar/types'

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

  return {
    title: topic.metaTitle,
    description: topic.description,
    alternates: { canonical },
    openGraph: {
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
    title: `Gramática ${lang} ${nivel.toUpperCase()} — Temas y ejercicios | Idiomas WeLearn`,
    description: `Aprende gramática de ${lang} nivel ${nivel.toUpperCase()} con explicaciones de especialista y práctica progresiva de 6 niveles. Para hispanohablantes.`,
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
