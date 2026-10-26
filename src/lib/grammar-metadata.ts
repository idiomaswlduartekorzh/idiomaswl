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
  nivel: string,
  options: { contentLanguage?: 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt' } = {},
): Metadata {
  const english = options.contentLanguage === 'en'
  const french = options.contentLanguage === 'fr'
  const german = options.contentLanguage === 'de'
  const italian = options.contentLanguage === 'it'
  const portuguese = options.contentLanguage === 'pt'
  const lang = IDIOMA_LABELS[idioma] ?? idioma
  const canonical = `https://www.idiomaswl.com/practica/${idioma}/${nivel}/gramatica/${topic.slug}`
  const visual = grammarVisualUrl(idioma, nivel, topic.slug)
  const visualAlt = english
    ? `Visual guide to ${topic.shortTitle} for English ${nivel.toUpperCase()}: ${topic.guide.formula}`
    : french
    ? `Guide visuel de ${topic.shortTitle} en français ${nivel.toUpperCase()} : ${topic.guide.formula}`
    : german
    ? `Visueller Leitfaden zu ${topic.shortTitle} für Deutsch ${nivel.toUpperCase()}: ${topic.guide.formula}`
    : italian
    ? `Guida visiva a ${topic.shortTitle} per italiano ${nivel.toUpperCase()}: ${topic.guide.formula}`
    : portuguese
    ? `Guia visual de ${topic.shortTitle} para português ${nivel.toUpperCase()}: ${topic.guide.formula}`
    : isGrammarVisualLanguage(idioma)
    ? grammarVisualAlt(topic, idioma, nivel)
    : `Explicación visual de ${topic.shortTitle}`

  // El título y la descripción del buscador se derivan; NO son `topic.metaTitle`
  // ni `topic.description` en crudo. `description` se pinta además en el cuerpo
  // del artículo, así que está escrita para leerse en la página: en el resultado
  // de Google salía cortada y regalaba la respuesta. Ver `@/lib/seo-snippet`.
  const title = english || french || german || italian || portuguese ? fitTitle(topic.metaTitle) : buildGrammarTitle(topic)
  const description = english
    ? fitDescription(`${topic.description} Includes a visual map, progressive practice and three printable PDFs.`)
    : french
    ? fitDescription(`${topic.description} Carte visuelle, pratique progressive et trois PDF à imprimer.`)
    : german
    ? fitDescription(`${topic.description} Mit visueller Karte, progressiven Übungen und drei druckbaren PDFs.`)
    : italian
    ? fitDescription(`${topic.description} Con mappa visiva, pratica progressiva e tre PDF stampabili.`)
    : portuguese
    ? fitDescription(`${topic.description} Com mapa visual, prática progressiva e três PDFs para imprimir.`)
    : buildGrammarDescription(topic)

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      // En redes no hay corte a 60/155: ahí sí compensa el titular largo.
      title: topic.metaTitle,
      description: topic.lead,
      type: 'website',
      locale: english ? 'en_US' : french ? 'fr_FR' : german ? 'de_DE' : italian ? 'it_IT' : portuguese ? 'pt_BR' : 'es_CO',
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
      'article:section': english ? `English grammar ${nivel.toUpperCase()}` : french ? `Grammaire française ${nivel.toUpperCase()}` : german ? `Deutsche Grammatik ${nivel.toUpperCase()}` : italian ? `Grammatica italiana ${nivel.toUpperCase()}` : portuguese ? `Gramática portuguesa ${nivel.toUpperCase()}` : `Gramática ${lang} ${nivel.toUpperCase()}`,
    },
  }
}

export function generateGrammarIndexMetadata(idioma: string, nivel: string, topicCount?: number, options?: { includeAudio?: boolean }): Metadata {
  const lang = IDIOMA_LABELS[idioma] ?? idioma
  const canonical = `https://www.idiomaswl.com/practica/${idioma}/${nivel}/gramatica`
  const japaneseA1 = idioma === 'japones' && nivel.toLowerCase() === 'a1'
  const englishComplete = idioma === 'ingles' && topicCount
  const frenchComplete = idioma === 'frances' && topicCount && ['b2', 'c1', 'c2'].includes(nivel.toLowerCase())
  const germanComplete = idioma === 'aleman' && topicCount && ['b2', 'c1', 'c2'].includes(nivel.toLowerCase())
  const italianComplete = idioma === 'italiano' && topicCount && ['b2', 'c1', 'c2'].includes(nivel.toLowerCase())
  const portugueseComplete = idioma === 'portugues' && topicCount && ['b2', 'c1', 'c2'].includes(nivel.toLowerCase())
  const includeAudio = options?.includeAudio ?? true
  const englishResourceLabel = includeAudio ? 'con audio' : 'con PDF e infografías'
  return {
    // Sin sufijo de marca: Google ya muestra el nombre del sitio aparte, y aquí
    // cada carácter gastado en repetirlo es un carácter que se come el corte.
    title: fitTitle(japaneseA1 ? 'Gramática japonesa A1: 28 temas con audio y ejercicios' : englishComplete ? `Gramática inglesa ${nivel.toUpperCase()}: ${topicCount} temas ${englishResourceLabel}` : frenchComplete ? `Grammaire française ${nivel.toUpperCase()} : ${topicCount} cours avec PDF` : germanComplete ? `Deutsche Grammatik ${nivel.toUpperCase()}: ${topicCount} Lektionen mit PDF` : italianComplete ? `Grammatica italiana ${nivel.toUpperCase()}: ${topicCount} lezioni con PDF` : portugueseComplete ? `Gramática portuguesa ${nivel.toUpperCase()}: ${topicCount} aulas com PDF` : `Gramática de ${lang} ${nivel.toUpperCase()}: todos los temas con ejercicios`),
    description: fitDescription(
      japaneseA1
        ? 'Curso completo de gramática japonesa A1 para hispanohablantes: 28 temas, mapas visuales, audio nativo, práctica progresiva y PDF descargables.'
        : englishComplete
          ? `${topicCount} lecciones de gramática inglesa ${nivel.toUpperCase()} para hispanohablantes ${includeAudio ? 'con audio nativo, ' : 'con infografías, '}PDF descargable y ejercicios corregidos al instante.`
        : frenchComplete
          ? `${topicCount} cours complets de grammaire française ${nivel.toUpperCase()} avec cartes visuelles, exercices progressifs, cours PDF et corrigés.`
        : germanComplete
          ? `${topicCount} vollständige Lektionen zur deutschen Grammatik ${nivel.toUpperCase()} mit visuellen Karten, Übungen, Kurs-PDF und Lösungen.`
        : italianComplete
          ? `${topicCount} lezioni complete di grammatica italiana ${nivel.toUpperCase()} con mappe visive, esercizi, corso PDF e soluzioni.`
        : portugueseComplete
          ? `${topicCount} aulas completas de gramática portuguesa ${nivel.toUpperCase()} com mapas visuais, exercícios, curso em PDF e gabarito.`
        : `Todos los temas de gramática de ${lang} ${nivel.toUpperCase()}, cada uno con explicación para hispanohablantes y ejercicios corregidos al instante.`
    ),
    alternates: { canonical },
    openGraph: {
      title: frenchComplete ? `Grammaire française ${nivel.toUpperCase()} — ${topicCount} thèmes` : germanComplete ? `Deutsche Grammatik ${nivel.toUpperCase()} — ${topicCount} Themen` : italianComplete ? `Grammatica italiana ${nivel.toUpperCase()} — ${topicCount} argomenti` : portugueseComplete ? `Gramática portuguesa ${nivel.toUpperCase()} — ${topicCount} temas` : `Gramática ${lang} ${nivel.toUpperCase()} — Temas`,
      description: frenchComplete ? `Maîtrisez la grammaire française ${nivel.toUpperCase()} avec des explications, des cartes visuelles, des exercices et trois PDF par thème.` : germanComplete ? `Beherrschen Sie die deutsche Grammatik ${nivel.toUpperCase()} mit Erklärungen, visuellen Karten, Übungen und drei PDFs pro Thema.` : italianComplete ? `Padroneggia la grammatica italiana ${nivel.toUpperCase()} con spiegazioni, mappe visive, esercizi e tre PDF per argomento.` : portugueseComplete ? `Domine a gramática portuguesa ${nivel.toUpperCase()} com explicações, mapas visuais, exercícios e três PDFs por tema.` : `Domina la gramática ${lang} ${nivel.toUpperCase()} tema por tema, con explicación y práctica progresiva.`,
      type: 'website',
      locale: frenchComplete ? 'fr_FR' : germanComplete ? 'de_DE' : italianComplete ? 'it_IT' : portugueseComplete ? 'pt_BR' : 'es_CO',
      url: canonical,
    },
  }
}
