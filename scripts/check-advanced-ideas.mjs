import process from 'node:process'
import { ADVANCED_CYCLE, ADVANCED_LESSONS, ADVANCED_TOPICS } from '../src/data/practica/advanced-topics.ts'
import { GUIDED_ADVANCED_LESSONS } from '../src/data/practica/advanced-guided-topics.ts'

// Piso histórico protegido por la línea base de producción.
const PUBLISHED_FLOOR = 2
// Piso nuevo: los siete temas del catálogo ya tienen un blueprint guiado completo.
const GUIDED_BLUEPRINT_FLOOR = 7
const failures = []
const publishedTopicSlugs = new Set(ADVANCED_TOPICS.filter(({ status }) => status !== 'planned').map(({ slug }) => slug))
const publishedGuidedLessons = GUIDED_ADVANCED_LESSONS.filter(({ slug }) => publishedTopicSlugs.has(slug))
const guidedSlugs = new Set(publishedGuidedLessons.map(({ slug }) => slug))
const deliveredLessons = [
  ...ADVANCED_LESSONS.filter(({ slug }) => !guidedSlugs.has(slug)),
  ...publishedGuidedLessons,
]

const fail = (message) => failures.push(message)
const requireText = (value, where) => {
  if (typeof value !== 'string' || !value.trim()) fail(`${where} está vacío.`)
}
const unique = (values, label) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  if (duplicates.length) fail(`${label} repetidos: ${[...new Set(duplicates)].join(', ')}`)
}

function validateQuestions(questions, minimum, where) {
  if (!Array.isArray(questions) || questions.length < minimum) {
    fail(`${where} debe tener al menos ${minimum} preguntas.`)
    return
  }
  unique(questions.map(({ id }) => id), `${where}: ids`)
  for (const question of questions) {
    requireText(question.prompt, `${where}, ${question.id}: enunciado`)
    requireText(question.explanation, `${where}, ${question.id}: explicación`)
    if (!Array.isArray(question.options) || question.options.length < 2) {
      fail(`${where}, ${question.id}: necesita al menos dos opciones.`)
    } else {
      unique(question.options, `${where}, ${question.id}: opciones`)
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= question.options.length) {
        fail(`${where}, ${question.id}: respuesta fuera de las opciones.`)
      }
    }
  }
}

unique(ADVANCED_TOPICS.map(({ slug }) => slug), 'Slugs de temas')
unique(ADVANCED_LESSONS.map(({ slug }) => slug), 'Slugs de lecciones')
unique(ADVANCED_LESSONS.map(({ sequence }) => sequence), 'Secuencias de lecciones')
unique(GUIDED_ADVANCED_LESSONS.map(({ slug }) => slug), 'Slugs de lecciones guiadas')
unique(deliveredLessons.map(({ sequence }) => sequence), 'Secuencias publicadas')
if (ADVANCED_CYCLE.length !== 6) fail(`El ciclo debe conservar 6 movimientos; tiene ${ADVANCED_CYCLE.length}.`)
if (deliveredLessons.length < PUBLISHED_FLOOR) fail(`Cayó por debajo del piso de ${PUBLISHED_FLOOR} lecciones.`)
if (GUIDED_ADVANCED_LESSONS.length < GUIDED_BLUEPRINT_FLOOR) fail(`Cayó por debajo del piso de ${GUIDED_BLUEPRINT_FLOOR} blueprints guiados.`)

const publishedTopics = ADVANCED_TOPICS.filter(({ status }) => status !== 'planned')
if (publishedTopics.length !== deliveredLessons.length) {
  fail(`Hay ${publishedTopics.length} temas publicados y ${deliveredLessons.length} lecciones activas.`)
}
const sequence = deliveredLessons.map(({ sequence }) => sequence).sort((a, b) => a - b)
const expected = Array.from({ length: deliveredLessons.length }, (_, index) => index + 1)
if (sequence.join(',') !== expected.join(',')) fail(`La secuencia debe ser ${expected.join(',')}; es ${sequence.join(',')}.`)

for (const topic of publishedTopics) {
  const lesson = deliveredLessons.find(({ slug }) => slug === topic.slug)
  if (!lesson) {
    fail(`El tema ${topic.slug} no tiene lección.`)
    continue
  }
  const minutes = 'guidedMinutes' in lesson ? lesson.guidedMinutes : lesson.minutes
  if (topic.level !== lesson.level || topic.minutes !== minutes) fail(`La lección activa ${topic.slug}: nivel o duración no coincide con el catálogo.`)
  if ('category' in lesson && topic.category !== lesson.category) fail(`La lección activa ${topic.slug}: categoría no coincide con el catálogo.`)
}

for (const lesson of ADVANCED_LESSONS) {
  const where = `Lección ${lesson.sequence} (${lesson.slug})`
  const topic = publishedTopics.find(({ slug }) => slug === lesson.slug)
  if (!topic) fail(`${where}: no está disponible en el catálogo.`)
  if (topic && !guidedSlugs.has(lesson.slug) && (topic.level !== lesson.level || topic.minutes !== lesson.minutes || topic.category !== lesson.category)) {
    fail(`${where}: nivel, duración o categoría no coincide con el catálogo.`)
  }
  for (const [label, value] of [
    ['título', lesson.title], ['objetivo', lesson.objective], ['guion', lesson.listening?.script],
    ['producción', lesson.production?.prompt], ['modelo', lesson.production?.model],
  ]) requireText(value, `${where}: ${label}`)

  if (!Array.isArray(lesson.opening?.options) || lesson.opening.options.length < 2) fail(`${where}: apertura incompleta.`)
  validateQuestions(lesson.listening?.questions, 2, `${where}: escucha`)
  validateQuestions(lesson.practice?.questions, 4, `${where}: práctica`)

  if (!Array.isArray(lesson.reading?.sections) || lesson.reading.sections.length < 4) {
    fail(`${where}: necesita al menos cuatro secciones de lectura.`)
  } else {
    for (const section of lesson.reading.sections) {
      requireText(section.heading, `${where}: encabezado`)
      if (!Array.isArray(section.paragraphs) || !section.paragraphs.length) fail(`${where}: sección sin párrafos.`)
    }
  }
  if (!Array.isArray(lesson.reading?.sources) || !lesson.reading.sources.length) {
    fail(`${where}: no tiene fuentes.`)
  } else {
    for (const source of lesson.reading.sources) {
      requireText(source.label, `${where}: fuente`)
      try {
        if (new URL(source.href).protocol !== 'https:') fail(`${where}: fuente sin HTTPS: ${source.href}`)
      } catch {
        fail(`${where}: URL inválida: ${source.href}`)
      }
    }
  }
  if (!Array.isArray(lesson.vocabulary) || lesson.vocabulary.length < 8) fail(`${where}: vocabulario incompleto.`)
  else unique(lesson.vocabulary.map(({ term }) => term), `${where}: vocabulario`)
  if (!Array.isArray(lesson.production?.checklist) || lesson.production.checklist.length < 4) fail(`${where}: checklist incompleto.`)
}

if (failures.length) {
  console.error('El guardián de Ideas avanzadas falló:')
  failures.forEach((failure) => console.error(`- ${failure}`))
  process.exitCode = 1
} else {
  console.log(`Ideas avanzadas íntegro: ${deliveredLessons.length} lecciones activas y ${ADVANCED_TOPICS.length} temas.`)
}
