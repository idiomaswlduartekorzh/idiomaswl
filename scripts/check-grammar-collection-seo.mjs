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
    const indexComponent = language === 'aleman' ? '<GermanGrammarCollection' : '<GrammarCollectionIndex'
    const topicComponent = language === 'aleman' ? '<GermanGrammarTopicPage' : '<GrammarCollectionTopicPage'

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

if (errors.length) {
  console.error(`La protección SEO de gramática falló (${errors.length}):`)
  errors.forEach((error) => console.error(`- ${error}`))
  process.exit(1)
}

console.log('✓ Protección SEO: 17 índices y 17 plantillas conservan metadata, contenido rastreable, datos estructurados, visuales e interlinking.')
