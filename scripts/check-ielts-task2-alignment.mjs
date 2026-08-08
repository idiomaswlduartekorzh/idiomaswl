import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Comprueba que cada ejercicio de IELTS Writing Task 2 muestre lo suyo y no lo de otro.
 *
 * Existe por un fallo que llegó a producción: el mapa del enunciado buscaba el tema en una
 * tabla aparte, por posición (`TOPICS[lesson.id][index]`). Dos listas paralelas que hay que
 * mantener en el mismo orden a mano, y que se habían desincronizado en 10 de los 25
 * ejercicios. El de «prison sentences» anunciaba international tourism; el de «museums»,
 * prison policy. Ninguna comprobación lo veía porque las dos listas eran válidas por
 * separado: el error solo existe en la relación entre ellas.
 *
 * La corrección fue quitar la tabla y colgar el tema del propio ejemplo. Esta comprobación
 * defiende esa decisión: si alguien vuelve a introducir un emparejamiento por posición, o
 * declara un tema que no tiene nada que ver con su enunciado, el build se para.
 *
 *   node scripts/check-ielts-task2-alignment.mjs
 *   node scripts/check-ielts-task2-alignment.mjs --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const task2 = path.join(repoRoot, 'src', 'app', '(site)', 'practica', 'ielts', 'academic', 'writing', 'task2')
const verbose = process.argv.includes('--verbose')

/** Los cinco tipos tienen que seguir existiendo, con cinco ejemplos cada uno. */
const EXPECTED_TYPES = ['opinion', 'discussion', 'problem-solution', 'advantages-disadvantages', 'direct-questions']
const EXPECTED_EXAMPLES = 5

/** Palabras sin carga temática: aparecen en cualquier enunciado y no prueban parentesco. */
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'on', 'for', 'is', 'are', 'be', 'been', 'this', 'that',
  'some', 'people', 'others', 'think', 'believe', 'should', 'more', 'many', 'what', 'why', 'how', 'do', 'does',
  'you', 'your', 'their', 'they', 'it', 'its', 'with', 'from', 'by', 'at', 'as', 'than', 'these', 'those',
  'discuss', 'views', 'opinion', 'extent', 'agree', 'disagree', 'advantages', 'disadvantages', 'outweigh',
  'problems', 'solutions', 'causes', 'reasons', 'give', 'own', 'both', 'while', 'other', 'can', 'could',
])

/**
 * Temas que nombran su enunciado con otras palabras, no con las suyas.
 *
 * La comprobación busca solapamiento léxico, y eso deja fuera al título que resume bien
 * usando sinónimos. Cada línea es una decisión revisada a mano contra el enunciado, no un
 * atajo: si añades una, comprueba antes que el tema es realmente el del enunciado.
 */
const SYNONYM_TITLES = new Map([
  ['discussion--city-investment', 'el enunciado contrapone gastar en parques o en vivienda; «city investment» es exactamente esa decisión, con otras palabras'],
  ['problem-solution--student-inactivity', 'el enunciado dice «schoolchildren do not get enough physical exercise»; «student inactivity» lo nombra en positivo'],
])

const words = (value) =>
  value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/gu, '').replace(/[^a-z0-9\s]/gu, ' ')
    .split(/\s+/u).filter((word) => word.length > 3 && !STOPWORDS.has(word))

/** Raíz corta: «museums» tiene que emparejar con «museum», «prisons» con «prison». */
const stem = (word) => word.slice(0, Math.max(4, Math.ceil(word.length * 0.7)))

function loadModule(file, resolve) {
  const compiled = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  }).outputText
  const exports = {}
  const container = { exports }
  Function('module', 'exports', 'require', compiled)(container, exports, resolve)
  return container.exports
}

const introduction = loadModule(path.join(task2, 'introduccion', 'introduction-data.ts'), () => ({}))
const analysis = loadModule(
  path.join(task2, 'analisis-pregunta', 'prompt-analysis-data.ts'),
  () => introduction,
)

const failures = []
const seen = new Map()

const lessons = analysis.PROMPT_ANALYSIS_LESSONS ?? []

if (lessons.length !== EXPECTED_TYPES.length) {
  failures.push(`Hay ${lessons.length} tipos de ensayo; se esperaban ${EXPECTED_TYPES.length}.`)
}
for (const expected of EXPECTED_TYPES) {
  if (!lessons.some((lesson) => lesson.id === expected)) failures.push(`Falta el tipo de ensayo «${expected}».`)
}

for (const lesson of lessons) {
  if (lesson.examples.length !== EXPECTED_EXAMPLES) {
    failures.push(`${lesson.id}: ${lesson.examples.length} ejemplos, se esperaban ${EXPECTED_EXAMPLES}.`)
  }

  for (const example of lesson.examples) {
    const etiqueta = `${lesson.id}/${example.title ?? '(sin título)'}`

    // 1. Identificador único. Sin él, dos ejercicios distintos pueden compartir destino.
    if (!example.id) failures.push(`${etiqueta}: sin identificador.`)
    else if (seen.has(example.id)) failures.push(`Identificador repetido «${example.id}»: ${seen.get(example.id)} y ${etiqueta}.`)
    else seen.set(example.id, etiqueta)

    // 2. Campos obligatorios: el ejercicio no se puede pintar a medias.
    for (const field of ['title', 'prompt', 'instruction', 'plan']) {
      if (!example[field]?.trim?.()) failures.push(`${etiqueta}: falta «${field}».`)
    }
    for (const field of ['topic', 'instruction', 'scope', 'position']) {
      if (!example.map?.[field]?.trim?.()) failures.push(`${etiqueta}: falta «map.${field}».`)
    }
    if (!Array.isArray(example.map?.bodyRoute) || example.map.bodyRoute.length !== 2) {
      failures.push(`${etiqueta}: la ruta de cuerpos no tiene dos tramos.`)
    }
    if (!example.blocks?.length) failures.push(`${etiqueta}: sin bloques de modelo.`)

    // 3. LA COMPROBACIÓN QUE HABRÍA CAZADO EL FALLO: el tema anunciado tiene que hablar
    // de lo mismo que el enunciado. Basta con que comparta una palabra con carga temática.
    const tema = words(example.map?.topic ?? '')
    const enunciado = words(example.prompt ?? '').map(stem)
    const excusado = SYNONYM_TITLES.has(example.id)
    if (!excusado && tema.length && !tema.some((word) => enunciado.some((raiz) => stem(word).startsWith(raiz) || raiz.startsWith(stem(word))))) {
      failures.push(
        `${etiqueta}: el tema anunciado «${example.map.topic}» no aparece en su enunciado «${String(example.prompt).slice(0, 70)}…». Señal de emparejamiento por posición.`,
      )
    }

    // 4. La arquitectura tiene que ser la de SU tipo, no la de otro.
    if (example.essayType && example.essayType !== lesson.id) {
      failures.push(`${etiqueta}: declara el tipo «${example.essayType}» dentro de «${lesson.id}».`)
    }

    if (verbose) console.log(`  · ${etiqueta} → ${example.map?.topic}`)
  }
}

/**
 * Que la opción correcta no se delate por ser la más larga.
 *
 * Lo vio David probando: «las respuestas largas casi siempre son las correctas». Medido:
 * en 6 de las 8 preguntas del banco la correcta sacaba entre 7 y 14 palabras a la
 * siguiente, así que se acertaba por silueta, sin leer.
 *
 * La corrección fue alargar los distractores, nunca acortar la correcta: recortar la buena
 * le quita la precisión que precisamente se está enseñando. Cada distractor creció
 * desarrollando su propio error.
 *
 * Se toleran 2 palabras de diferencia. A partir de 3 la opción destaca a simple vista.
 */
const DESTAQUE = 3
const contar = (value) => value.trim().split(/\s+/u).filter(Boolean).length

// Los bancos de opción son los exports de introduction-data que son listas de preguntas.
const banks = Object.entries(introduction).filter(
  ([, value]) => Array.isArray(value) && value.length && Array.isArray(value[0]?.options) && 'correct' in (value[0].options[0] ?? {}),
)

if (!banks.length) failures.push('No se encontró ningún banco de opciones en introduction-data.')

for (const [name, bank] of banks) {
  for (const [index, question] of bank.entries()) {
    const largos = question.options.map((option) => contar(option.text))
    const correcta = question.options.findIndex((option) => option.correct)
    if (correcta < 0) { failures.push(`${name}[${index}]: ninguna opción marcada como correcta.`); continue }
    const ordenados = [...largos].sort((a, b) => b - a)
    // Solo importa cuando la que destaca ES la correcta: un distractor largo no delata nada.
    if (largos[correcta] === ordenados[0] && ordenados[0] - ordenados[1] >= DESTAQUE) {
      failures.push(
        `${name}[${index}]: la correcta tiene ${ordenados[0]} palabras y la siguiente ${ordenados[1]}; se acierta por longitud. Alarga los distractores, no acortes la correcta.`,
      )
    }
  }
}

if (failures.length) {
  console.error('IELTS Task 2 — alineación enunciado/modelo:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log(`IELTS Task 2 alineado: ${lessons.length} tipos × ${EXPECTED_EXAMPLES} ejemplos, ${seen.size} identificadores únicos, cada tema en su enunciado.`)
}
