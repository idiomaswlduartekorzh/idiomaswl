import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * Auditoría del CONTENIDO de las series de escucha.
 *
 * El validador (validate-listening-series.mjs) comprueba que la serie esté bien formada:
 * que haya 20 episodios, que las palabras clave se oigan, que la respuesta correcta no
 * caiga siempre en la misma letra. Lo que no comprueba es si el ejercicio se puede
 * responder con lo que suena, que es otra cosa.
 *
 * Este script mide cinco propiedades que solo existen mirando pregunta y audio a la vez:
 *
 *  1. ANCLAJE. El feedback de cada pregunta cita la línea del guion que la justifica
 *     («It was raining hard...»). Si esa cita no está en ningún turno del episodio, o el
 *     redactor la inventó, o el guion cambió después y nadie actualizó la pregunta. Las
 *     dos cosas dejan al estudiante sin manera de acertar escuchando.
 *
 *  2. RESPUESTA EN EL AUDIO. La opción correcta se escribe en español y los turnos traen
 *     su traducción, así que se puede comprobar que lo que afirma la opción correcta
 *     aparece de verdad en lo que se dice.
 *
 *  3. PISTA POR LONGITUD. Vicio clásico de quien redacta test: la opción correcta sale
 *     más elaborada que los distractores porque es la única que el redactor pensó de
 *     verdad. Se acierta contando palabras, sin escuchar.
 *
 *  4. NIVEL. Que A1, A2 y B1 del mismo idioma sean tres niveles distintos y en ese orden,
 *     medido sobre el texto, no sobre la etiqueta declarada.
 *
 *  5. DURACIÓN. La duración declarada en la serie mueve la barra de progreso del
 *     reproductor. Si no coincide con el mp3, la barra miente.
 *
 *   node scripts/audit-listening-content.mjs
 *   node scripts/audit-listening-content.mjs --lang ingles
 *   node scripts/audit-listening-content.mjs --verbose
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const seriesDir = path.join(repoRoot, 'src', 'data', 'practica', 'series')
const audioRoot = path.join(repoRoot, 'public', 'audio')

const args = process.argv.slice(2)
const verbose = args.includes('--verbose')
const val = (flag) => (args.includes(flag) ? args[args.indexOf(flag) + 1] : null)
const onlyLang = val('--lang')

/** Desfase tolerable entre la duración declarada y la real del mp3. */
const DESFASE_MAXIMO = 4
/** A partir de cuántas palabras de más la opción correcta canta. */
const VENTAJA_MAXIMA = 2.2
/** Palabras de diferencia a partir de las cuales una opción destaca a simple vista. */
const DESTAQUE = 3

function loadModule(file) {
  const source = fs.readFileSync(file, 'utf8')
  const compiled = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    fileName: file,
    reportDiagnostics: true,
  })
  const module = { exports: {} }
  Function('module', 'exports', compiled.outputText)(module, module.exports)
  return module.exports
}

function loadSeries(file) {
  return Object.values(loadModule(file)).find((value) => value?.episodes)
}

const { seriesToExercises } = loadModule(path.join(seriesDir, 'adapt.ts'))
const { balanceOptions } = loadModule(path.join(repoRoot, 'src', 'data', 'practica', 'listening-shuffle.ts'))

const strip = (value) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/gu, '')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim()

/** Palabras sin carga semántica: aparecen en cualquier frase y no prueban nada. */
const VACIAS = new Set([
  'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas', 'de', 'del', 'a', 'al', 'en', 'y', 'o', 'que',
  'se', 'su', 'sus', 'lo', 'le', 'les', 'con', 'por', 'para', 'no', 'si', 'es', 'son', 'ser', 'esta',
  'este', 'esa', 'ese', 'eso', 'esto', 'muy', 'mas', 'pero', 'como', 'cuando', 'donde', 'porque',
  'ha', 'han', 'he', 'hay', 'the', 'and', 'to', 'of', 'in', 'is', 'it', 'a', 'was', 'were',
])

const contentWords = (value) => strip(value).split(' ').filter((word) => word.length > 2 && !VACIAS.has(word))

/**
 * Extrae las citas del feedback. Los redactores usan comillas latinas «...» y, en algunas
 * series, comillas rectas o inglesas.
 *
 * Los puntos suspensivos dentro de una cita significan «y más adelante»: en
 * «ein großer grauer Kater … Alt und dick» los dos fragmentos salen de turnos distintos.
 * Buscar la cadena entera no encuentra nada aunque las dos partes estén en el guion, así
 * que se parte por la elipsis y cada trozo se comprueba por su cuenta.
 */
function quotes(feedback) {
  const found = []
  for (const match of feedback.matchAll(/[«"“]([^»"”]{4,})[»"”]/gu)) {
    for (const fragment of match[1].split(/\s*(?:…|\.\.\.)\s*/u)) {
      if (fragment.trim()) found.push(fragment.trim())
    }
  }
  return found
}

function mp3Duration(file) {
  try {
    const out = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {
      encoding: 'utf8',
    })
    return Number.parseFloat(out.trim())
  } catch {
    return null
  }
}

/** Marcadores de subordinación: separan A1 de A2 y B1 mejor que la longitud sola. */
const SUBORDINACION = {
  ingles: ['because', 'although', 'while', 'when', 'if', 'that', 'which', 'who', 'before', 'after', 'since', 'unless', 'whether', 'so that'],
  aleman: ['weil', 'obwohl', 'während', 'wenn', 'dass', 'der', 'die', 'das', 'bevor', 'nachdem', 'seit', 'damit', 'ob', 'als'],
  frances: ['parce', 'bien que', 'pendant', 'quand', 'si', 'que', 'qui', 'avant', 'après', 'depuis', 'pour que', 'lorsque'],
  italiano: ['perché', 'benché', 'mentre', 'quando', 'se', 'che', 'chi', 'prima', 'dopo', 'da quando', 'affinché'],
  portugues: ['porque', 'embora', 'enquanto', 'quando', 'se', 'que', 'quem', 'antes', 'depois', 'desde', 'para que'],
  ruso: ['потому', 'хотя', 'пока', 'когда', 'если', 'что', 'который', 'перед', 'после', 'чтобы'],
  coreano: ['때문', '지만', '면서', '으면', '는데', '아서', '어서', '니까', '려고'],
  japones: ['から', 'ので', 'けど', 'ながら', 'たら', 'ても', 'のに', 'ために'],
}

const problems = []
const warnings = []
const rows = []

const files = fs
  .readdirSync(seriesDir)
  .filter((name) => name.endsWith('-series.ts'))
  .filter((name) => !onlyLang || name.startsWith(`${onlyLang}-`))
  .sort()

for (const name of files) {
  const series = loadSeries(path.join(seriesDir, name))
  if (!series) continue

  const lang = name.replace(/-(a1|a2|b1)-series\.ts$/u, '')
  const level = name.match(/-(a1|a2|b1)-series\.ts$/u)[1]
  const label = `${lang}/${level}`
  const exercises = balanceOptions(seriesToExercises(series, { audioAvailable: true }))

  const letras = { 'idea general': [0, 0, 0], detalle: [0, 0, 0], consolidación: [0, 0, 0] }
  const estrategiaLarga = { intentos: 0, aciertos: 0 }
  const estrategiaCorta = { intentos: 0, aciertos: 0 }
  let sinAnclaje = 0
  let sinRespuesta = 0
  let pistaLongitud = 0
  let desfase = 0
  const desfases = []

  let palabras = 0
  let turnos = 0
  let subordinadas = 0
  const vocabulario = new Set()

  for (const [index, episode] of series.episodes.entries()) {
    const ejercicio = exercises[index]
    const turnosTexto = episode.turns.map((turn) => turn.target).join(' ')
    const turnosEs = episode.turns.map((turn) => turn.es).join(' ')
    const anclaTarget = strip(turnosTexto)
    const anclaEs = strip(turnosEs)

    turnos += episode.turns.length
    for (const turn of episode.turns) {
      const tokens = strip(turn.target).split(' ').filter(Boolean)
      // Japonés y coreano no separan palabras con espacios de la misma manera, así que
      // contar tokens mide la ortografía, no la complejidad. Para esas dos lenguas la
      // unidad es el carácter, que sí escala con lo que el estudiante tiene que procesar.
      palabras += lang === 'japones' || lang === 'coreano' ? strip(turn.target).replace(/\s/gu, '').length : tokens.length
      for (const token of tokens) vocabulario.add(token)
      const marcas = SUBORDINACION[lang] ?? []
      const bruto = lang === 'coreano' || lang === 'japones' ? turn.target : ` ${strip(turn.target)} `
      subordinadas += marcas.filter((marca) =>
        lang === 'coreano' || lang === 'japones' ? bruto.includes(marca) : bruto.includes(` ${strip(marca)} `),
      ).length
    }

    // 1. Anclaje: la cita del feedback tiene que estar en el guion.
    const preguntas = [
      ['idea general', episode.gist, ejercicio.gist],
      ...episode.details.map((question, i) => ['detalle', question, ejercicio.details[i]]),
      ['consolidación', episode.consolidation, ejercicio.consolidation],
    ]

    for (const [tipo, cruda, pintada] of preguntas) {
      letras[tipo][pintada.options.findIndex((option) => option.correct)] += 1

      // La consolidación no cita el audio: es un hueco de gramática y su feedback ilustra
      // la regla («aveva deciso / aveva detto», «женщина, работающая в музее»). Exigirle
      // que esas formas estén en el guion mide la regla, no el episodio.
      if (tipo !== 'consolidación') {
        for (const cita of quotes(cruda.feedback)) {
          const aguja = strip(cita)
          if (aguja.length < 6) continue
          if (!anclaTarget.includes(aguja) && !anclaEs.includes(aguja)) {
            sinAnclaje += 1
            problems.push(`${label} ep${String(episode.order).padStart(2, '0')} · ${tipo}: el feedback cita «${cita}», que no está en ningún turno`)
          }
        }
      }

      const correcta = cruda.options[cruda.answer]
      const distractores = cruda.options.filter((_, i) => i !== cruda.answer)

      // 2. La respuesta correcta tiene que poder deducirse de lo que se dice.
      // La consolidación queda fuera: es un hueco de gramática, no de comprensión.
      if (tipo !== 'consolidación') {
        const claves = contentWords(correcta)
        // Por raíz, no por palabra entera: la opción dice «Se lava» y el turno traduce
        // «me lavo». Exigir la forma exacta mide la conjugación del español, no si la
        // respuesta se puede sacar del audio.
        const apoyadas = claves.filter((word) => {
          const raiz = word.slice(0, Math.max(4, Math.ceil(word.length * 0.6)))
          return anclaEs.includes(raiz) || anclaTarget.includes(raiz)
        })
        if (claves.length && apoyadas.length === 0) {
          sinRespuesta += 1
          warnings.push(`${label} ep${String(episode.order).padStart(2, '0')} · ${tipo}: «${correcta}» no comparte ninguna palabra con lo que se dice`)
        }
      }

      /**
       * 3. Pista por longitud, medida como se explota de verdad.
       *
       * Contar casos sueltos donde la correcta es más larga no dice nada: en cualquier
       * examen la respuesta buena suele ser la más específica, y por tanto la más larga.
       * Lo que importa es si eso basta para aprobar sin escuchar. Así que se juega la
       * estrategia entera —«marca siempre la opción más larga»— y se mira qué saca. Con
       * tres opciones, el azar da 33 %.
       */
      const largos = cruda.options.map((option) => strip(option).split(' ').filter(Boolean).length)
      const ordenados = [...largos].sort((a, b) => b - a)
      const maximo = ordenados[0]
      const minimo = ordenados[ordenados.length - 1]

      /**
       * Solo cuenta si la diferencia se VE. Con tres opciones casi siempre hay una que es
       * la más larga por una palabra, y contar eso infla la medida hasta el 75 % sin que
       * exista ningún atajo: la primera versión de esta comprobación daba justo eso y era
       * un artefacto de la métrica, no un defecto del contenido.
       *
       * El atajo existe cuando una opción destaca: al menos DESTAQUE palabras por encima
       * de la segunda más larga. Eso ya es una silueta que se distingue sin leer.
       */
      if (maximo - ordenados[1] >= DESTAQUE) {
        estrategiaLarga.intentos += 1
        if (largos[cruda.answer] === maximo) estrategiaLarga.aciertos += 1
      }
      if (ordenados[ordenados.length - 2] - minimo >= DESTAQUE) {
        estrategiaCorta.intentos += 1
        if (largos[cruda.answer] === minimo) estrategiaCorta.aciertos += 1
      }

      const largoCorrecta = largos[cruda.answer]
      const largoMedio = distractores.reduce((total, item) => total + strip(item).split(' ').filter(Boolean).length, 0) / Math.max(distractores.length, 1)
      if (largoMedio > 0 && largoCorrecta / largoMedio >= VENTAJA_MAXIMA && largoCorrecta - largoMedio >= 3) {
        pistaLongitud += 1
        warnings.push(`${label} ep${String(episode.order).padStart(2, '0')} · ${tipo}: la correcta tiene ${largoCorrecta} palabras y los distractores ${largoMedio.toFixed(1)} de media`)
      }
    }

    // 5. Duración declarada contra el mp3 real.
    const mp3 = path.join(audioRoot, lang, level, `listening-${String(episode.order).padStart(2, '0')}.mp3`)
    if (fs.existsSync(mp3)) {
      const real = mp3Duration(mp3)
      if (real) {
        const delta = Math.abs(real - episode.duration)
        desfases.push({ order: episode.order, declarada: episode.duration, real: Math.round(real) })
        if (delta > DESFASE_MAXIMO) {
          desfase += 1
          problems.push(`${label} ep${String(episode.order).padStart(2, '0')}: declara ${episode.duration}s y el mp3 dura ${real.toFixed(1)}s (${delta.toFixed(1)}s de desfase)`)
        }
      }
    }
  }

  const total = series.episodes.length
  rows.push({
    label,
    lang,
    level,
    palabrasPorTurno: palabras / turnos,
    subordinadasPorEpisodio: subordinadas / total,
    vocabulario: vocabulario.size,
    letras,
    estrategiaLarga,
    estrategiaCorta,
    sinAnclaje,
    sinRespuesta,
    pistaLongitud,
    desfase,
    desfases,
  })
}

console.log('\n── Reparto de la letra correcta (lo que ve el estudiante) ──')
for (const row of rows) {
  const linea = Object.entries(row.letras)
    .map(([tipo, cuenta]) => {
      const suma = cuenta.reduce((a, b) => a + b, 0) || 1
      return `${tipo} ${cuenta.map((n) => `${Math.round((n / suma) * 100)}%`).join('/')}`
    })
    .join('  ·  ')
  console.log(`  ${row.label.padEnd(14)} ${linea}`)
}

console.log('\n── Se puede aprobar sin escuchar? (el azar da 33 %) ──')
const totalLarga = rows.reduce((acc, row) => ({ intentos: acc.intentos + row.estrategiaLarga.intentos, aciertos: acc.aciertos + row.estrategiaLarga.aciertos }), { intentos: 0, aciertos: 0 })
const totalCorta = rows.reduce((acc, row) => ({ intentos: acc.intentos + row.estrategiaCorta.intentos, aciertos: acc.aciertos + row.estrategiaCorta.aciertos }), { intentos: 0, aciertos: 0 })
const pct = (item) => (item.intentos ? (item.aciertos / item.intentos) * 100 : 0)
const preguntas = rows.reduce((total, row) => total + row.letras['idea general'].reduce((a, b) => a + b, 0) + row.letras.detalle.reduce((a, b) => a + b, 0) + row.letras.consolidación.reduce((a, b) => a + b, 0), 0)
console.log(`  preguntas donde una opción destaca por ${DESTAQUE}+ palabras: ${totalLarga.intentos} de ${preguntas}`)
console.log(`  de esas, marcar la más larga acierta: ${pct(totalLarga).toFixed(1)} % (${totalLarga.aciertos}/${totalLarga.intentos})`)
console.log(`  de las que tienen una notablemente más corta, marcarla acierta: ${pct(totalCorta).toFixed(1)} % (${totalCorta.aciertos}/${totalCorta.intentos})`)
const peorLarga = [...rows].sort((a, b) => pct(b.estrategiaLarga) - pct(a.estrategiaLarga)).slice(0, 3)
console.log(`  series más explotables por longitud: ${peorLarga.map((row) => `${row.label} ${pct(row.estrategiaLarga).toFixed(0)} %`).join(', ')}`)
// Por encima de este umbral la estrategia deja de ser azar y se convierte en un atajo.
const LIMITE_ESTRATEGIA = 55
if (pct(totalLarga) > LIMITE_ESTRATEGIA) problems.push(`marcar siempre la opción más larga acierta el ${pct(totalLarga).toFixed(1)} % de las preguntas`)
if (pct(totalCorta) > LIMITE_ESTRATEGIA) problems.push(`marcar siempre la opción más corta acierta el ${pct(totalCorta).toFixed(1)} % de las preguntas`)

console.log('\n── Nivel medido sobre el texto ──')
console.log('  (japonés y coreano se miden en caracteres por turno, no en palabras)')
console.log(`  ${'serie'.padEnd(14)} ${'unidades/turno'.padStart(14)} ${'subord./episodio'.padStart(17)} ${'vocabulario'.padStart(12)}`)
const byLang = new Map()
for (const row of rows) {
  console.log(
    `  ${row.label.padEnd(14)} ${row.palabrasPorTurno.toFixed(1).padStart(14)} ${row.subordinadasPorEpisodio.toFixed(1).padStart(17)} ${String(row.vocabulario).padStart(12)}`,
  )
  if (!byLang.has(row.lang)) byLang.set(row.lang, [])
  byLang.get(row.lang).push(row)
}

for (const [lang, list] of byLang) {
  const order = ['a1', 'a2', 'b1'].map((level) => list.find((row) => row.level === level)).filter(Boolean)
  if (order.length < 2) continue
  for (let i = 1; i < order.length; i += 1) {
    if (order[i].vocabulario <= order[i - 1].vocabulario) {
      problems.push(`${lang}: ${order[i].level.toUpperCase()} no tiene más vocabulario que ${order[i - 1].level.toUpperCase()} (${order[i].vocabulario} vs ${order[i - 1].vocabulario})`)
    }
    if (order[i].palabrasPorTurno <= order[i - 1].palabrasPorTurno) {
      warnings.push(`${lang}: los turnos de ${order[i].level.toUpperCase()} no son más largos que los de ${order[i - 1].level.toUpperCase()} (${order[i].palabrasPorTurno.toFixed(1)} vs ${order[i - 1].palabrasPorTurno.toFixed(1)})`)
    }
  }
}

if (verbose) {
  console.log('\n── Duración declarada vs mp3 ──')
  for (const row of rows) {
    const peores = row.desfases
      .map((item) => ({ ...item, delta: Math.abs(item.real - item.declarada) }))
      .sort((a, b) => b.delta - a.delta)
      .slice(0, 3)
    console.log(`  ${row.label.padEnd(14)} ${peores.map((item) => `ep${item.order}: ${item.declarada}→${item.real}s`).join('  ')}`)
  }
}

console.log('\n── Resumen ──')
for (const row of rows) {
  const fallos = row.sinAnclaje + row.desfase
  const avisos = row.sinRespuesta + row.pistaLongitud
  const marca = fallos ? '✗' : avisos ? '·' : '✓'
  console.log(`  ${marca} ${row.label.padEnd(14)} anclaje ${row.sinAnclaje}  ·  sin respuesta ${row.sinRespuesta}  ·  pista por longitud ${row.pistaLongitud}  ·  desfase ${row.desfase}`)
}

if (problems.length) {
  console.log(`\n✗ ${problems.length} problemas`)
  for (const item of problems) console.log(`  - ${item}`)
}
if (warnings.length) {
  console.log(`\n· ${warnings.length} avisos`)
  for (const item of warnings.slice(0, 60)) console.log(`  · ${item}`)
  if (warnings.length > 60) console.log(`  · … y ${warnings.length - 60} más`)
}

console.log(`\n${rows.length} series auditadas. ${problems.length} problemas, ${warnings.length} avisos.`)
process.exit(problems.length ? 1 : 0)
