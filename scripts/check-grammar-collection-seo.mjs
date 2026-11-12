import { readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const languages = ['aleman', 'frances', 'italiano', 'portugues', 'ruso']
const levels = ['a1', 'a2', 'b1']
const routes = [
  ...languages.flatMap((language) => levels.map((level) => [language, level])),
  ['japones', 'a2'],
  ['japones', 'b1'],
]
const errors = []
const specialized = { aleman: 'German', frances: 'French', italiano: 'Italian' }

function source(relativePath) {
  return readFileSync(join(root, relativePath), 'utf8')
}

function expect(content, marker, context) {
  if (!content.includes(marker)) errors.push(`${context}: falta ${marker}`)
}

for (const [language, level] of routes) {
    const routeRoot = `src/app/(site)/practica/${language}/${level}/gramatica`
    const indexSource = source(`${routeRoot}/page.tsx`)
    const topicSource = source(`${routeRoot}/[slug]/page.tsx`)
    const componentPrefix = specialized[language]
    const indexComponent = componentPrefix ? `<${componentPrefix}GrammarCollection` : '<GrammarCollectionIndex'
    const topicComponent = componentPrefix ? `<${componentPrefix}GrammarTopicPage` : '<GrammarCollectionTopicPage'

    expect(indexSource, 'generateGrammarIndexMetadata', `${language}/${level} índice`)
    expect(indexSource, indexComponent, `${language}/${level} índice`)
    expect(topicSource, 'generateStaticParams', `${language}/${level} lección`)
    expect(topicSource, 'generateGrammarMetadata', `${language}/${level} lección`)
    expect(topicSource, topicComponent, `${language}/${level} lección`)
}

const shared = source('src/components/grammar/GrammarCollection.tsx')
for (const marker of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  "'@type': 'LearningResource'",
  "'@type': 'BreadcrumbList'",
  'topic.seo.map',
  '<GrammarTopicClient',
  '<TopicNav',
  'topic.title',
  'isAccessibleForFree: true',
  'grammarVisualImageObject',
  '<GrammarTopicVisual',
]) expect(shared, marker, 'fachada compartida')

if (shared.startsWith("'use client'")) {
  errors.push('fachada compartida: no debe ser Client Component; el contenido SEO debe renderizarse en servidor')
}

const germanCollection = source('src/components/grammar/GermanGrammarCollection.tsx')
for (const marker of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  'topics.map',
  'topic.slug',
]) expect(germanCollection, marker, 'fachada alemana de colección')

const germanTopic = source('src/components/grammar/GermanGrammarTopicPage.tsx')
for (const marker of [
  "'@type': 'LearningResource'",
  "'@type': 'BreadcrumbList'",
  'isAccessibleForFree: true',
  '<GermanGrammarLesson',
  '<TopicNav',
  'resource.exercisesPdf',
  'resource.answerKeyPdf',
]) expect(germanTopic, marker, 'fachada alemana de lección')

const germanLesson = source('src/components/grammar/GermanGrammarLesson.tsx')
for (const marker of [
  '<GrammarTopicVisual',
  'topic.seo.map',
  '<ReferenceTable',
]) expect(germanLesson, marker, 'contenido alemán rastreable')

if (germanCollection.startsWith("'use client'") || germanTopic.startsWith("'use client'")) {
  errors.push('fachada alemana: colección y lección deben renderizar datos estructurados en servidor')
}

const frenchCollection = source('src/components/grammar/FrenchGrammarCollection.tsx')
for (const marker of [
  "'@type': 'CollectionPage'",
  "'@type': 'ItemList'",
  'topics.map',
  'topic.slug',
]) expect(frenchCollection, marker, 'fachada francesa de colección')

const frenchTopic = source('src/components/grammar/FrenchGrammarTopicPage.tsx')
for (const marker of [
  "'@type': 'LearningResource'",
  "'@type': 'BreadcrumbList'",
  'isAccessibleForFree: true',
  'grammarVisualImageObject',
  '<FrenchGrammarLesson',
  '<TopicNav',
  'resource.exercisesPdf',
  'resource.answerKeyPdf',
]) expect(frenchTopic, marker, 'fachada francesa de lección')

const frenchLesson = source('src/components/grammar/FrenchGrammarLesson.tsx')
for (const marker of [
  '<GrammarTopicVisual',
  'topic.seo.map',
  '<ReferenceTable',
]) expect(frenchLesson, marker, 'contenido francés rastreable')

if (frenchCollection.startsWith("'use client'") || frenchTopic.startsWith("'use client'")) {
  errors.push('fachada francesa: colección y lección deben renderizar datos estructurados en servidor')
}

const italianCollection = source('src/components/grammar/ItalianGrammarCollection.tsx')
for (const marker of ["'@type':'CollectionPage'", "'@type':'ItemList'", 'topics.map', 'topic.slug']) expect(italianCollection, marker, 'facciata italiana della raccolta')
const italianTopic = source('src/components/grammar/ItalianGrammarTopicPage.tsx')
for (const marker of ["'@type':'LearningResource'", 'isAccessibleForFree:true', 'grammarVisualImageObject', '<ItalianGrammarLesson', '<TopicNav', 'resource.exercisesPdf', 'resource.answerKeyPdf']) expect(italianTopic, marker, 'facciata italiana della lezione')
const italianLesson = source('src/components/grammar/ItalianGrammarLesson.tsx')
for (const marker of ['<GrammarTopicVisual', 'topic.seo.map', '<ReferenceTable']) expect(italianLesson, marker, 'contenuto italiano indicizzabile')
if (italianCollection.startsWith("'use client'") || italianTopic.startsWith("'use client'")) errors.push('facciata italiana: raccolta e lezione devono essere renderizzate sul server')

if (errors.length) {
  console.error(`La protección SEO de gramática falló (${errors.length}):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('✓ Protección SEO: 17 índices y 17 plantillas conservan metadata, contenido rastreable, datos estructurados, visuales e interlinking.')
