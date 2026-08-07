import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Validación estructural y editorial de las series narrativas de listening A1.
// Corre en prebuild: si una serie desaparece o se degrada, el build falla antes de publicar.
// Origen editorial: docs/a1-listening-series (auditoría curricular de 100 episodios).

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')

// Mínimos históricos por nivel. No se reducen sin decisión explícita y documentada
// (misma regla que el umbral de 465 temas de gramática en check-practica-catalog).
// Suben cuando el contenido aterriza, nunca bajan. Miden regresión —que no desaparezca lo
// publicado—, no deuda: poner aquí un número mayor que lo escrito deja el build en rojo.
// A2 pasa a 6 en cuanto las seis series estén escritas y validadas.
const EXPECTED_SERIES = { a1: 7, a2: 8, b1: 7 }
const EXPECTED_EPISODES = 20
const VERBOSE = process.argv.includes('--verbose')

/**
 * Unidades léxicas por episodio según nivel. A1 sale de la auditoría curricular original;
 * A2 escala ~1,3x porque el nivel admite frases subordinadas y conectores.
 */
const UNIT_RANGES = {
  a1: { ko: [30, 55], ja: [45, 75], ru: [40, 70], default: [50, 85] },
  a2: { ko: [40, 72], ja: [58, 98], ru: [52, 92], default: [65, 110] },
  // B1 vuelve a escalar ~1,4x sobre A2: subordinación, discurso indirecto y conectores.
  b1: { ko: [55, 100], ja: [80, 140], ru: [72, 130], default: [95, 150] },
}

const normalize = (value) => value.replace(/\s+/gu, ' ').trim()

/**
 * Palabras clave en forma de diccionario cuya flexión SÍ se oye en el episodio.
 * Cada línea es una decisión editorial deliberada, no un descuido: la comprobación de
 * audibilidad falla el build para todo lo que no esté aquí.
 *
 * Contexto: una primera medición encontró 58 keywords que el estudiante nunca iba a oír,
 * lo que vacía de sentido la fase 1 del blueprint («activar el vocabulario que hará
 * audible el texto»). Se sustituyeron 48; estas 10 se conservan por buenas razones.
 *
 * Marcadas con REVISAR: dudosas, pendientes del hablante nativo.
 */
const LEMMA_EXCEPTIONS = new Map([
  ['portugues|7|por quê', 'se oye «por que»; el circunflejo solo se escribe en posición final, el sonido es el mismo'],
  ['portugues|14|ir', 'se oye «vamos», conjugación supletiva de ir; la gramática declarada del episodio es precisamente «ir»'],
  ['coreano|4|일해요', 'se oye «일도 해요»: el mismo verbo separado por la partícula 도'],
  ['japones|15|話したい', 'se oye «話をしたい»: mismo lexema con partícula を intercalada'],
  ['japones|19|だから', 'se oye «雨ですから» y «大切ですから»: el mismo conector con cópula formal'],
  ['ruso|11|один', 'se oye «одна репетиция», femenino del mismo numeral'],
  ['ruso|15|идти', 'se oye «идём пешком» e «идём быстро», presente del mismo verbo'],
  ['ruso|6|не моя', 'REVISAR: se oye «шарф не мой», masculino. Confirmar con hablante nativo si el femenino aparece.'],
  ['ruso|6|звезда', 'REVISAR: confirmar con hablante nativo qué forma se oye en el episodio.'],
  ['ruso|15|бежать', 'REVISAR: confirmar con hablante nativo si alguna forma de бежать se oye.'],
])

const CJK = /[぀-ヿ一-鿿가-힯]/u
/** Alfabetos que nunca deben aparecer dentro de un campo `romanization`. */
const NON_LATIN = /[぀-ヿ㐀-鿿가-힯Ѐ-ӿ]/u
/**
 * Artículos que no cuentan al comprobar si una palabra clave se oye.
 *
 * El alemán obliga a ampliar la lista: sus palabras clave se declaran con artículo —«der
 * Absender», «die Kiste»— porque el género es parte de lo que hay que aprender, y sin esta
 * entrada la comprobación exigiría oír además la forma exacta «der», que en el episodio
 * puede aparecer declinada como «dem» o «den», o no aparecer.
 */
const ARTICLES = new Set([
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'l', 'o', 'a', 'os', 'as', 'um', 'uma', 'en', 'no', 'na',
  'der', 'die', 'das', 'dem', 'den', 'ein', 'eine', 'einen', 'einem', 'einer',
])

/** Pronombres reflexivos: van en el lema del diccionario, pero en el audio se oyen declinados. */
const DE_REFLEXIVE = new Set(['sich', 'mich', 'dich', 'uns', 'euch'])
/** Prefijos separables frecuentes, para reconocer «aufgestellt» partiendo de «aufstellen». */
const DE_PREFIXES = ['zurück', 'heraus', 'herein', 'hinaus', 'wieder', 'durch', 'hoch', 'über', 'unter', 'auf', 'aus', 'ein', 'mit', 'nach', 'vor', 'weg', 'los', 'ab', 'an', 'um', 'zu']

/**
 * Audibilidad en alemán, donde la regla general —«flexionar solo añade sufijos»— es falsa.
 *
 * Medido sobre la primera pasada de aleman-b1-series.ts: 17 palabras clave marcadas como
 * inaudibles se oían perfectamente. El fallo no estaba en el contenido sino en el criterio,
 * y son tres mecanismos, no uno:
 *
 *  - el participio mete «ge» DENTRO de la palabra: fegen → gefegt, aufstellen → aufgestellt;
 *  - el reflexivo se declina: «sich erinnern» se oye «ich erinnere mich»;
 *  - la raíz cambia de vocal: vergessen → vergisst, ausbleiben → ausblieben.
 *
 * Contra los dos primeros hay regla; contra el tercero solo una raíz más corta (40 % en vez
 * del 60 % del resto de lenguas). Eso afloja el filtro, así que se comprobó que sigue cazando
 * lo que tiene que cazar: «auftreten» declarada en un episodio donde nadie actúa.
 *
 * Lo que NO se acepta: el prefijo suelto al final de la frase («hört … zu» para «zuhören»).
 * Admitirlo daba por buena «auftreten» porque el episodio decía «Treffpunkt» y «auf» por
 * separado. Cuando el prefijo se separa de verdad, la palabra clave se declara en la forma
 * que se oye y el infinitivo va en la glosa.
 */
function isAudibleGerman(keyword, tokens) {
  // El guion separa palabras dentro del compuesto —U-Bahn, T-Shirt—, y los tokens del
  // episodio ya vienen partidos por él: sin partir también la clave, «die U-Bahn» no se
  // encuentra en un texto que dice exactamente «U-Bahn».
  const words = keyword.toLowerCase().normalize('NFC').split(/[\s-]+/u)
    .filter((word) => word.length > 1 && !ARTICLES.has(word) && !DE_REFLEXIVE.has(word))
  if (!words.length) return false

  return words.every((word) => {
    const stem = word.slice(0, Math.max(3, Math.ceil(word.length * 0.4)))
    const prefix = DE_PREFIXES.find((item) => word.startsWith(item) && word.length > item.length + 2)
    const base = prefix ? word.slice(prefix.length) : ''
    const baseStem = base.slice(0, Math.max(3, Math.ceil(base.length * 0.4)))

    return tokens.some((token) => {
      if (token.startsWith(stem)) return true
      if (token.startsWith('ge') && token.slice(2).startsWith(stem)) return true
      if (!prefix || !token.startsWith(prefix)) return false
      return token.slice(prefix.length).replace(/^ge/u, '').startsWith(baseStem)
    })
  })
}

/** ¿Se oye la palabra clave en el episodio, aunque sea flexionada? */
function isAudible(keyword, text, tokens, lang) {
  const key = keyword.toLowerCase().normalize('NFC')
  const body = text.toLowerCase().normalize('NFC')
  if (body.includes(key)) return true
  if (lang === 'aleman') return isAudibleGerman(keyword, tokens)

  // ko/ja: los morfemas de contenido son de 1-3 caracteres y flexionan por sufijo.
  if (CJK.test(keyword)) {
    const stem = key.slice(0, 2)
    return stem.length >= 2 && body.includes(stem)
  }

  const words = key.split(/[\s’']+/u).filter((word) => word.length > 1 && !ARTICLES.has(word))
  if (!words.length) return false
  return words.every((word) => {
    const stem = word.slice(0, Math.max(3, Math.ceil(word.length * 0.6)))
    return tokens.some((token) => token.startsWith(stem))
  })
}

/**
 * Primera letra de cada palabra transliterada.
 *
 * Lo que motivó la comprobación: en coreano B1, «저것도» estaba transliterado «Geogeotdo»
 * en lugar de «Jeogeotdo» —un copiar-pegar desde «그것도»—. Solo salió porque un revisor
 * nativo leyó esa línea concreta. Contar variantes de una misma palabra no sirve para
 * cazarlo: «저것도» aparece una sola vez en todo el corpus, así que no tiene con qué chocar.
 *
 * El comienzo de palabra sí se puede comprobar sin romanizador completo: la consonante
 * inicial de una sílaba hangul y la primera letra de una cirílica son tablas fijas, y la
 * asimilación que complica el resto de la palabra no las toca. Medido sobre 3.373 palabras
 * coreanas y 3.995 rusas: ni un falso positivo.
 */
const KO_ONSETS = ['g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp', 's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h']
const KO_VOWELS = ['a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye', 'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we', 'wi', 'yu', 'eu', 'ui', 'i']
// BGN/PCGN. Donde el sistema admite más de una forma se aceptan todas.
const RU_INITIALS = {
  а: ['a'], б: ['b'], в: ['v'], г: ['g'], д: ['d'], е: ['ye', 'e'], ё: ['yo', 'ye', 'e'], ж: ['zh'],
  з: ['z'], и: ['i'], й: ['y'], к: ['k'], л: ['l'], м: ['m'], н: ['n'], о: ['o'], п: ['p'],
  р: ['r'], с: ['s'], т: ['t'], у: ['u'], ф: ['f'], х: ['kh', 'h'], ц: ['ts'], ч: ['ch'],
  ш: ['sh'], щ: ['shch'], ы: ['y'], э: ['e'], ю: ['yu'], я: ['ya'],
}

/** Comienzos admitidos para la primera letra de `word`, o null si no hay regla. */
function expectedStarts(word, lang) {
  if (lang === 'coreano') {
    const code = word.charCodeAt(0) - 0xac00
    if (code < 0 || code > 11171) return null
    const onset = KO_ONSETS[Math.floor(code / 588)]
    return [onset || KO_VOWELS[Math.floor((code % 588) / 28)]]
  }
  if (lang === 'ruso') return RU_INITIALS[word[0].toLowerCase()] ?? null
  return null // el japonés no separa palabras: no hay con qué alinear
}

const cleanWord = (word) => word.replace(/[.,!?…«»"'’()~—-]/gu, '').trim()

function romanizationErrors(series, lang) {
  const found = []
  for (const episode of series.episodes) {
    for (const [index, turn] of episode.turns.entries()) {
      const source = turn.target.split(/\s+/u).map(cleanWord).filter(Boolean)
      const roman = (turn.romanization ?? '').split(/\s+/u).map(cleanWord).filter(Boolean)
      if (source.length !== roman.length) continue
      for (const [position, word] of source.entries()) {
        const starts = expectedStarts(word, lang)
        if (!starts) continue
        const written = roman[position].toLowerCase()
        if (!starts.some((start) => written.startsWith(start))) {
          found.push(`${episode.id}: turno ${index + 1} translitera «${word}» como «${roman[position]}»; debería empezar por ${starts.map((s) => `«${s}»`).join(' o ')}`)
        }
      }
    }
  }
  return found
}

function countUnits(text, locale) {
  if (locale.startsWith('ja')) {
    const segmenter = new Intl.Segmenter(locale, { granularity: 'word' })
    return [...segmenter.segment(text)].filter((item) => item.isWordLike).length
  }

  return text.trim().split(/\s+/u).filter(Boolean).length
}

/** Transpila un .ts sin dependencias en tiempo de ejecución y devuelve sus exports. */
function loadModule(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
    reportDiagnostics: true,
  })

  const diagnostics = compiled.diagnostics ?? []
  if (diagnostics.length) {
    throw new Error(diagnostics.map((item) => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'))
  }

  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return module.exports
}

function loadSeries(file) {
  return Object.values(loadModule(file)).find((value) => value?.episodes)
}

const { seriesToExercises } = loadModule(path.join(seriesDir, 'adapt.ts'))
const { balanceOptions } = loadModule(path.join(repoRoot, 'src', 'data', 'practica', 'listening-shuffle.ts'))

/**
 * Reparto de la respuesta correcta entre las tres letras, medido sobre lo que el runner
 * pinta de verdad (después de `balanceOptions`), no sobre el orden del fichero.
 *
 * Lo que motivó la comprobación: inglés A1, alemán A1/A2/B1 e italiano A1 —publicadas—
 * tenían la respuesta correcta en la opción A en el 100 % de las preguntas. Pulsando
 * siempre la primera se completaba el ejercicio sin escuchar. Ninguna revisión episodio
 * a episodio lo detecta, porque el sesgo solo existe en el conjunto.
 */
const MAX_SHARE = 0.45

function balanceErrors(exercises, label) {
  const errors = []
  const buckets = { 'idea general': [0, 0, 0], detalle: [0, 0, 0], consolidación: [0, 0, 0] }

  for (const exercise of balanceOptions(exercises)) {
    const questions = [
      ['idea general', exercise.gist],
      ...exercise.details.map((question) => ['detalle', question]),
      ['consolidación', exercise.consolidation],
    ]
    for (const [kind, question] of questions) {
      const index = question?.options?.findIndex((option) => option.correct) ?? -1
      if (index >= 0 && index < 3) buckets[kind][index] += 1
    }
  }

  for (const [kind, counts] of Object.entries(buckets)) {
    const total = counts.reduce((sum, value) => sum + value, 0)
    if (!total) continue
    const share = Math.max(...counts) / total
    const letters = counts.map((count, index) => `${String.fromCharCode(65 + index)}=${count}`).join(' ')
    if (share > MAX_SHARE) {
      errors.push(`${label}/${kind}: la respuesta cae en la misma letra el ${Math.round(share * 100)} % de las veces (${letters})`)
    }
    if (counts.includes(0)) {
      errors.push(`${label}/${kind}: hay una letra que nunca es correcta (${letters})`)
    }
  }

  return errors
}

function validateQuestion(question, label, errors) {
  if (!question || !question.prompt || !question.feedback) errors.push(`${label}: pregunta incompleta`)
  if (!Array.isArray(question?.options) || question.options.length !== 3) errors.push(`${label}: debe tener tres opciones`)
  if (!Number.isInteger(question?.answer) || question.answer < 0 || question.answer > 2) errors.push(`${label}: respuesta fuera de rango`)
}

function validateSeries(series, file, lang, level) {
  const errors = []
  const rows = []
  const answerSlots = new Set()
  if (!series) return { errors: [`${file}: no se encontró una serie exportada`], rows, chars: 0, turns: 0 }
  if (series.level !== level.toUpperCase()) errors.push(`La serie debe declarar nivel ${level.toUpperCase()}; declara ${series.level}`)
  if (series.episodes.length !== EXPECTED_EPISODES) {
    errors.push(`Se esperaban ${EXPECTED_EPISODES} episodios; hay ${series.episodes.length}`)
  }

  // El casting de voces se deriva de series.characters: un personaje que hable sin estar
  // declarado se quedaría sin voz asignada en la generación.
  const declared = new Set((series.characters ?? []).map((character) => character.name))
  if (!declared.size) errors.push('La serie no declara personajes')

  const ids = new Set()
  const orders = new Set()
  let chars = 0
  let turns = 0

  for (const episode of series.episodes) {
    const label = episode.id ?? `episodio-${episode.order}`
    if (ids.has(episode.id)) errors.push(`${label}: id duplicado`)
    if (orders.has(episode.order)) errors.push(`${label}: orden duplicado`)
    ids.add(episode.id)
    orders.add(episode.order)

    if (episode.turns.length < 4 || episode.turns.length > 8) errors.push(`${label}: ${episode.turns.length} turnos; deben ser 4–8`)
    for (const [index, turn] of episode.turns.entries()) {
      if (!turn.speaker || !turn.target || !turn.es) errors.push(`${label}: turno ${index + 1} incompleto`)
      if (turn.speaker && !declared.has(turn.speaker)) {
        errors.push(`${label}: turno ${index + 1} habla «${turn.speaker}», que no está en characters`)
      }
      // Una transliteración que conserva hangul, kana o cirílico es un copiar-pegar a medias:
      // el estudiante que la necesita para leer se encuentra justo lo que no sabe leer.
      if (turn.romanization && NON_LATIN.test(turn.romanization)) {
        errors.push(`${label}: turno ${index + 1} deja caracteres sin transliterar en romanization`)
      }
      chars += (turn.target ?? '').length
      turns += 1
    }

    const cleanFromTurns = episode.turns.map((turn) => turn.target).join(' ')
    if (normalize(cleanFromTurns) !== normalize(episode.ttsScript)) errors.push(`${label}: ttsScript no coincide con los turnos`)

    // Blueprint, fase 1: las palabras previas sirven para «activar el vocabulario que hará
    // audible el texto». Una que no suena en este audio prepara al estudiante para nada.
    if (episode.keywords.length < 5 || episode.keywords.length > 8) {
      errors.push(`${label}: ${episode.keywords.length} palabras clave; el blueprint pide 5–8`)
    }
    const tokens = cleanFromTurns.toLowerCase().normalize('NFC').split(/[^\p{L}\p{N}]+/u).filter(Boolean)
    for (const keyword of episode.keywords) {
      if (isAudible(keyword.target, cleanFromTurns, tokens, lang)) continue
      const exception = LEMMA_EXCEPTIONS.get(`${lang}|${episode.order}|${keyword.target}`)
      if (!exception) {
        errors.push(`${label}: la palabra clave «${keyword.target}» no se oye en el audio`)
      }
    }

    // El nombre del mp3 se deriva del order; sin un order válido el runner pide un archivo inexistente.
    if (!Number.isInteger(episode.order) || episode.order < 1 || episode.order > EXPECTED_EPISODES) {
      errors.push(`${label}: order fuera del rango 1–${EXPECTED_EPISODES}`)
    }
    if (!Number.isFinite(episode.duration) || episode.duration <= 0) {
      errors.push(`${label}: duration inválida (la usa el placeholder de audio)`)
    }

    const units = countUnits(episode.ttsScript, series.locale)
    const ranges = UNIT_RANGES[level] ?? UNIT_RANGES.a1
    const script = series.locale.slice(0, 2)
    const [minimum, maximum] = ranges[script] ?? ranges.default
    if (units < minimum || units > maximum) errors.push(`${label}: ${units} unidades; rango ${minimum}–${maximum} para ${level.toUpperCase()}`)

    validateQuestion(episode.gist, `${label}/gist`, errors)
    if (!Array.isArray(episode.details) || episode.details.length !== 3) errors.push(`${label}: debe tener tres preguntas de detalle`)
    else episode.details.forEach((item, index) => validateQuestion(item, `${label}/detalle-${index + 1}`, errors))
    validateQuestion(episode.consolidation, `${label}/consolidación`, errors)
    for (const item of [episode.gist, ...(episode.details ?? []), episode.consolidation]) {
      if (Number.isInteger(item?.answer)) answerSlots.add(item.answer)
    }

    // El nivel del audit debe coincidir con el de la serie: si no, el brief editorial
    // de un episodio A2 dice A1 y quien lo lea después decidirá con un dato falso.
    if (!episode.audit || !episode.audit.continuity) errors.push(`${label}: auditoría incompleta`)
    else if (episode.audit.level !== level.toUpperCase()) {
      errors.push(`${label}: audit.level es ${episode.audit.level} en una serie ${level.toUpperCase()}`)
    }
    rows.push({ order: episode.order, id: label, units, turns: episode.turns.length })
  }

  for (let order = 1; order <= EXPECTED_EPISODES; order += 1) {
    if (!orders.has(order)) errors.push(`Falta el orden ${order}`)
  }
  if (answerSlots.size < 3) errors.push('Las respuestas correctas no se distribuyen entre las tres posiciones')
  errors.push(...balanceErrors(seriesToExercises(series, { audioAvailable: false }), 'reparto'))
  errors.push(...romanizationErrors(series, lang))

  return { errors, rows, chars, turns }
}

if (!fs.existsSync(seriesDir)) {
  console.error(`✗ No existe ${path.relative(repoRoot, seriesDir)}`)
  process.exit(1)
}

// Fichero por serie: <idioma>-<nivel>-series.ts
const files = fs.readdirSync(seriesDir)
  .map((name) => ({ name, match: name.match(/^([a-z]+)-(a1|a2|b1)-series\.ts$/u) }))
  .filter((entry) => entry.match)
  .map((entry) => ({ file: path.join(seriesDir, entry.name), name: entry.name, lang: entry.match[1], level: entry.match[2] }))
  .sort((a, b) => (a.level === b.level ? a.lang.localeCompare(b.lang) : a.level.localeCompare(b.level)))

let hasErrors = false
let totalChars = 0
let totalTurns = 0

for (const [level, expected] of Object.entries(EXPECTED_SERIES)) {
  const found = files.filter((entry) => entry.level === level).length
  if (found < expected) {
    console.error(`✗ Se esperaban ${expected} series de listening ${level.toUpperCase()}; se encontraron ${found}.`)
    console.error('  Contenido protegido: no se reduce el umbral sin una decisión explícita y documentada.')
    hasErrors = true
  }
}

for (const { file, name, lang, level } of files) {
  const result = validateSeries(loadSeries(file), name, lang, level)
  totalChars += result.chars
  totalTurns += result.turns

  if (VERBOSE) {
    console.log(`\n${name}`)
    console.table(result.rows)
  }

  if (result.errors.length) {
    hasErrors = true
    console.error(`✗ ${name}`)
    console.error(result.errors.map((error) => `  - ${error}`).join('\n'))
  } else {
    console.log(`✓ ${name} — ${result.rows.length} episodios, ${result.turns} turnos, ${result.chars} caracteres`)
  }
}

// Las series publicadas antes de este trabajo (inglés, alemán, italiano A1) están escritas
// a mano en el esquema del runner y no pasan por el adaptador, así que el bucle de arriba
// no las ve. Son justo las que tenían el 100 % de respuestas en la opción A.
const PUBLISHED = [
  'ingles-a1-listening.ts',
  'ingles-a2-listening.ts',
  'ingles-b1-listening.ts',
  'aleman-a1-listening.ts',
  'aleman-a2-listening.ts',
  'aleman-b1-listening.ts',
  'italiano-a1-ascolto.ts',
]

for (const name of PUBLISHED) {
  const file = path.join(repoRoot, 'src', 'data', 'practica', name)
  if (!fs.existsSync(file)) continue

  /**
   * Un fichero de esta lista que ya deriva de una serie se salta: su reparto se mide
   * arriba, sobre la serie, y aquí no se puede ni cargar.
   *
   * `loadModule` transpila el .ts y lo evalúa con Function(), donde no existe `require`.
   * Mientras estos ficheros eran listas literales daba igual; en cuanto alemán B1 pasó a
   * importar su serie, el validador entero reventó con «require is not defined» DESPUÉS
   * de haber impreso todos los ✓. Se coló hasta main porque la comprobación previa fue
   * `grep '^✗'`, y un fallo que no imprime ✗ pasa ese filtro sin despeinarse.
   */
  if (/^import\s*\{[^}]*\}\s*from\s*'\.\/series\//mu.test(fs.readFileSync(file, 'utf8'))) {
    console.log(`· ${name} — deriva de su serie; el reparto ya se midió ahí`)
    continue
  }

  // Varios de estos ficheros exportan más de una lista; la serie es la más larga.
  const lists = Object.values(loadModule(file)).filter((value) => Array.isArray(value) && value.length && value[0]?.gist)
  const exercises = lists.sort((a, b) => b.length - a.length)[0]
  if (!exercises) continue

  const errors = balanceErrors(exercises, 'reparto')
  if (errors.length) {
    hasErrors = true
    console.error(`✗ ${name}`)
    console.error(errors.map((error) => `  - ${error}`).join('\n'))
  } else {
    console.log(`✓ ${name} — ${exercises.length} episodios, reparto equilibrado`)
  }
}

// Correspondencia entre el interruptor de audio y los mp3 que hay en disco.
// Un idioma marcado como listo sin sus 20 archivos publicaría un reproductor roto.
const audioReadySource = fs.readFileSync(path.join(seriesDir, 'audio-ready.ts'), 'utf8')
const audioReady = []
for (const block of audioReadySource.matchAll(/export const ([AB]\d)_AUDIO_READY = \{([\s\S]*?)\n\} as const/gu)) {
  const level = block[1].toLowerCase()
  for (const [, lang, value] of block[2].matchAll(/^\s{2}(\w+):\s*(true|false),/gmu)) {
    audioReady.push({ lang, level, ready: value === 'true' })
  }
}

for (const [level, expected] of Object.entries(EXPECTED_SERIES)) {
  const declared = audioReady.filter((entry) => entry.level === level).length
  if (declared < expected) {
    console.error(`✗ ${level.toUpperCase()}_AUDIO_READY declara ${declared} idiomas; se esperaban ${expected}`)
    hasErrors = true
  }
}

let placeholderLangs = []

for (const { lang, level, ready } of audioReady) {
  const dir = path.join(repoRoot, 'public', 'audio', lang, level)
  const isPlaceholder = fs.existsSync(path.join(dir, 'PLACEHOLDER'))
  if (isPlaceholder) placeholderLangs.push(`${lang}/${level}`)

  if (!ready) continue

  // Los pitidos de scripts/make-placeholder-audio.mjs viven en la MISMA ruta y con el
  // MISMO nombre que el audio definitivo, porque si no no servirían para revisar la
  // interfaz. Esta comprobación es lo único que impide publicarlos como si fueran voces.
  if (isPlaceholder) {
    hasErrors = true
    console.error(`✗ ${lang}/${level}: marcado como listo pero public/audio/${lang}/${level} contiene audio PROVISIONAL`)
    console.error('  Genera el audio real y ejecuta: node scripts/make-placeholder-audio.mjs --clean')
    continue
  }

  const missing = []
  for (let order = 1; order <= EXPECTED_EPISODES; order += 1) {
    const mp3 = path.join(dir, `listening-${String(order).padStart(2, "0")}.mp3`)
    if (!fs.existsSync(mp3)) missing.push(path.relative(repoRoot, mp3))
  }
  if (missing.length) {
    hasErrors = true
    console.error(`✗ ${lang}/${level}: marcado como listo pero faltan ${missing.length} mp3`)
    console.error(missing.slice(0, 5).map((item) => `  - ${item}`).join('\n'))
  } else {
    console.log(`✓ audio ${lang}/${level}: ${EXPECTED_EPISODES}/${EXPECTED_EPISODES} mp3 en disco`)
  }
}

if (placeholderLangs.length) {
  console.log(`Audio provisional en disco (no commitear): ${placeholderLangs.join(', ')}`)
}

const pending = audioReady.filter((entry) => !entry.ready).map((entry) => entry.lang + '/' + entry.level)
if (pending.length) console.log(`Audio pendiente (páginas en modo «en preparación»): ${pending.join(', ')}`)

if (!hasErrors) {
  console.log(`Listening A1: ${files.length} series, ${totalTurns} turnos, ${totalChars} caracteres de TTS.`)
}

process.exitCode = hasErrors ? 1 : 0
