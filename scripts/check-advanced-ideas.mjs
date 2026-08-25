import process from 'node:process'
import { ADVANCED_CYCLE, ADVANCED_LESSONS, ADVANCED_TOPICS } from '../src/data/practica/advanced-topics.ts'

// Piso monotónico: estos dos ciclos ya están publicados y no pueden desaparecer.
const PUBLISHED_FLOOR = 2
const failures = []

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
if (ADVANCED_CYCLE.length !== 6) fail(`El ciclo debe conservar 6 movimientos; tiene ${ADVANCED_CYCLE.length}.`)
if (ADVANCED_LESSONS.length < PUBLISHED_FLOOR) fail(`Cayó por debajo del piso de ${PUBLISHED_FLOOR} lecciones.`)

const availableTopics = ADVANCED_TOPICS.filter(({ status }) => status === 'available')
if (availableTopics.length !== ADVANCED_LESSONS.length) {
  fail(`Hay ${availableTopics.length} temas disponibles y ${ADVANCED_LESSONS.length} lecciones.`)
}
const sequence = ADVANCED_LESSONS.map(({ sequence }) => sequence).sort((a, b) => a - b)
const expected = Array.from({ length: ADVANCED_LESSONS.length }, (_, index) => index + 1)
if (sequence.join(',') !== expected.join(',')) fail(`La secuencia debe ser ${expected.join(',')}; es ${sequence.join(',')}.`)

for (const topic of availableTopics) {
  if (!ADVANCED_LESSONS.some(({ slug }) => slug === topic.slug)) fail(`El tema ${topic.slug} no tiene lección.`)
}

for (const lesson of ADVANCED_LESSONS) {
  const where = `Lección ${lesson.sequence} (${lesson.slug})`
  const topic = availableTopics.find(({ slug }) => slug === lesson.slug)
  if (!topic) fail(`${where}: no está disponible en el catálogo.`)
  if (topic && (topic.level !== lesson.level || topic.minutes !== lesson.minutes || topic.category !== lesson.category)) {
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
  console.log(`Ideas avanzadas íntegro: ${ADVANCED_LESSONS.length} lecciones y ${ADVANCED_TOPICS.length} temas.`)
}
