/**
 * Guardián del transcriptor fonético.
 *
 *     npm run check:fonetica
 *
 * Comprueba que un conjunto de palabras cuya pronunciación británica y americana está
 * documentada en los diccionarios de aprendizaje sigue saliendo como debe.
 *
 * Por qué hace falta: la derivación del británico son reglas encadenadas con cinco
 * conjuntos léxicos, y tocar una para arreglar una palabra rompe otra sin hacer ruido.
 * Este archivo es la red. Cada caso lleva escrito **qué regla vigila**, así que cuando
 * falle uno se sabe dónde mirar, no solo que algo se torció.
 *
 * Las palabras de abajo no son una muestra al azar: cada una es el ejemplo canónico de su
 * fenómeno. Si una falla, el fenómeno entero está roto.
 */

import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'
import { readFileSync } from 'node:fs'

const root = path.resolve(import.meta.dirname, '..')

if (!process.execArgv.some((a) => a.includes('strip-types')) && Number(process.versions.node.split('.')[0]) < 23) {
  const again = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--no-warnings', import.meta.filename, ...process.argv.slice(2)],
    { stdio: 'inherit' },
  )
  process.exit(again.status ?? 1)
}

// Node lee TypeScript pero no resuelve los imports sin extensión que usa el proyecto.
registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) return nextResolve(`${specifier}.ts`, context)
      throw error
    }
  },
})

const { transcribeWord } = await import(
  pathToFileURL(path.join(root, 'src/lib/fonetica/ipa.ts')).href
)
const { transcribe } = await import(
  pathToFileURL(path.join(root, 'src/lib/fonetica/transcribe.ts')).href
)

/* ------------------------------------------------------------------ *
 * Diccionario
 * ------------------------------------------------------------------ */

const DICTIONARY_PATH = 'src/data/fonetica/en-cmudict.txt'
let raw
try {
  raw = readFileSync(path.join(root, DICTIONARY_PATH), 'utf8')
} catch {
  console.error(`\n✗ Falta ${DICTIONARY_PATH}.`)
  console.error('  Regenéralo con: node scripts/build-fonetica-dict.mjs\n')
  process.exit(1)
}

const dictionary = new Map()
for (const line of raw.split('\n')) {
  const space = line.indexOf(' ')
  if (space < 0) continue
  const word = line.slice(0, space).replace(/\(\d+\)$/, '')
  const phones = line.slice(space + 1)
  const existing = dictionary.get(word)
  if (existing) existing.push(phones)
  else dictionary.set(word, [phones])
}

if (dictionary.size < 120_000) {
  console.error(`\n✗ El diccionario tiene ${dictionary.size} palabras; se esperaban más de 120.000.`)
  console.error('  Regenéralo con: node scripts/build-fonetica-dict.mjs\n')
  process.exit(1)
}

/* ------------------------------------------------------------------ *
 * Casos
 * ------------------------------------------------------------------ */

/** [palabra, americano esperado, británico esperado, qué vigila] */
const CASES = [
  // El acento tónico va delante de la sílaba, no encima de la vocal.
  ['hello', 'həˈloʊ', 'həˈləʊ', 'silabificación: el acento no puede caer dentro de la sílaba'],
  ['computer', 'kəmˈpjutɚ', 'kəmˈpjuːtə', 'silabificación: ataque máximo /pj/'],
  ['about', 'əˈbaʊt', 'əˈbaʊt', 'silabificación: la schwa átona sí abre sílaba'],

  // La /r/ británica.
  ['car', 'kɑr', 'kɑː', 'no roticidad'],
  ['carpet', 'ˈkɑrpət', 'ˈkɑːpɪt', 'no roticidad ante consonante'],
  ['here', 'hir', 'hɪə', 'vocal + /r/ muda → diptongo centrado'],
  ['there', 'ðɛr', 'ðeə', 'vocal + /r/ muda → diptongo centrado'],
  ['around', 'əˈraʊnd', 'əˈraʊnd', 'la /r/ de ER abre la sílaba siguiente'],
  ['history', 'ˈhɪstəri', 'ˈhɪstəri', 'la /r/ de ER suena ante vocal'],

  // BATH.
  ['ask', 'æsk', 'ɑːsk', 'BATH'],
  ['dance', 'dæns', 'dɑːns', 'BATH'],
  ['example', 'ɪɡˈzæmpəl', 'ɪɡˈzɑːmpəl', 'BATH'],
  ['banana', 'bəˈnænə', 'bəˈnɑːnə', 'BATH en préstamo'],
  ['classic', 'ˈklæsɪk', 'ˈklæsɪk', 'BATH: NO se extiende a toda la familia de class'],

  // PALM y su contrario.
  ['father', 'ˈfɑðɚ', 'ˈfɑːðə', 'PALM'],
  ['pasta', 'ˈpɑstə', 'ˈpæstə', 'préstamo que el británico acorta'],
  ['hot', 'hɑt', 'hɒt', 'LOT por defecto'],

  // CLOTH frente a THOUGHT — el CMU no los distingue.
  ['off', 'ɔf', 'ɒf', 'CLOTH'],
  ['dog', 'dɔɡ', 'dɒɡ', 'CLOTH'],
  ['often', 'ˈɔfən', 'ˈɒfən', 'CLOTH'],
  ['bought', 'bɑt', 'bɔːt', 'THOUGHT: el CMU lo escribe como boss'],
  ['caught', 'kɑt', 'kɔːt', 'THOUGHT'],
  ['thought', 'θɔt', 'θɔːt', 'THOUGHT'],
  ['boss', 'bɑs', 'bɒs', 'la ortografía separa boss de bought'],

  // ORANGE frente a STORY.
  ['orange', 'ˈɔrəndʒ', 'ˈɒrəndʒ', 'ORANGE'],
  ['forest', 'ˈfɔrəst', 'ˈfɒrɪst', 'ORANGE, y la /ɪ/ átona de -est'],
  ['story', 'ˈstɔri', 'ˈstɔːri', 'ORANGE: story NO entra'],

  // Yod, por ortografía y no por lista.
  ['new', 'nu', 'njuː', 'yod'],
  ['student', 'ˈstudənt', 'ˈstjuːdənt', 'yod'],
  ['tune', 'tun', 'tjuːn', 'yod'],
  ['noon', 'nun', 'nuːn', 'yod: NO con oo'],
  ['soup', 'sup', 'suːp', 'yod: NO con ou'],
  ['true', 'tru', 'truː', 'yod: NO si hay /r/ entre medias'],
  ['super', 'ˈsupɚ', 'ˈsuːpə', 'yod bloqueado a mano'],

  // La /ɪ/ átona que el británico conserva.
  ['accident', 'ˈæksədənt', 'ˈæksɪdənt', 'KIT átona por ortografía'],
  ['wanted', 'ˈwɔntɪd', 'ˈwɒntɪd', 'KIT átona tras /t d/'],
  ['houses', 'ˈhaʊsəz', 'ˈhaʊsɪz', 'KIT átona ante sibilante'],
  ['village', 'ˈvɪlədʒ', 'ˈvɪlɪdʒ', 'KIT átona en -age'],

  // Terminaciones.
  ['fertile', 'ˈfɝtəl', 'ˈfɜːtaɪl', 'sufijo -ile'],
  ['necessary', 'ˈnɛsəˌsɛri', 'ˈnesəsəri', '-ary se reduce y pierde el acento secundario'],
  ['category', 'ˈkætəˌɡɔri', 'ˈkætəɡəri', '-ory se reduce'],
  ['happy', 'ˈhæpi', 'ˈhæpi', 'happy tensing'],
  ['react', 'riˈækt', 'riˈækt', 'la /i/ átona es breve también dentro de la palabra'],

  // Excepciones de palabra entera.
  ['schedule', 'ˈskɛdʒʊl', 'ˈʃedjuːl', 'excepción léxica'],
  ['tomato', 'təˈmeɪˌtoʊ', 'təˈmɑːtəʊ', 'excepción léxica'],

  /* ── Lo que encontró la auditoría de agosto de 2026 ────────────────────────
     Cada uno de estos salía mal y son palabras frecuentes. Ver
     docs/transcripcion-fonetica.md §4. */

  // La /r/ entre vocales también deja diptongo: no solo la /r/ muda.
  ['serious', 'ˈsɪriəs', 'ˈsɪəriəs', 'diptongo centrado ante /r/ intervocálica'],
  ['experience', 'ɪkˈspɪriəns', 'ɪkˈspɪəriəns', 'diptongo centrado ante /r/ intervocálica'],
  ['hero', 'ˈhɪroʊ', 'ˈhɪərəʊ', 'diptongo centrado ante /r/ intervocálica'],
  ['theory', 'ˈθɪri', 'ˈθɪəri', 'diptongo centrado ante /r/ intervocálica'],
  ['curious', 'ˈkjʊriəs', 'ˈkjʊəriəs', 'diptongo centrado ante /r/ intervocálica'],
  ['during', 'ˈdʊrɪŋ', 'ˈdjʊərɪŋ', 'yod sobre UH, que antes no se disparaba nunca'],
  ['spirit', 'ˈspɪrət', 'ˈspɪrɪt', 'la ortografía «ir» NO lleva diptongo'],
  ['mirror', 'ˈmɪrɚ', 'ˈmɪrə', 'la ortografía «ir» NO lleva diptongo'],

  // marry / merry / Mary: el RP mantiene tres clases donde el americano tiene una.
  ['marry', 'ˈmɛri', 'ˈmæri', 'clase de marry: doble erre'],
  ['merry', 'ˈmɛri', 'ˈmeri', 'clase de merry'],
  ['mary', 'ˈmɛri', 'ˈmeəri', 'clase de Mary'],
  ['character', 'ˈkɛrɪktɚ', 'ˈkærɪktə', 'clase de marry con erre simple: va por lista'],
  ['apparent', 'əˈpɛrənt', 'əˈpærənt', 'clase de marry con erre simple: va por lista'],

  // El alcance de las reglas ortográficas.
  ['swallow', 'ˈswɑloʊ', 'ˈswɒləʊ', 'THOUGHT solo si ESTA vocal se escribe au/aw/ou'],
  ['proximity', 'prɑkˈsɪməti', 'prɒkˈsɪməti', '/ks/ no es ataque de sílaba: el acento va tras la k'],
  ['quiet', 'ˈkwaɪət', 'ˈkwaɪət', 'la /ɪ/ átona no se aplica tras diptongo'],
  ['ability', 'əˈbɪləti', 'əˈbɪləti', '-ity lleva schwa, y la -y final no se alarga'],
  ['agree', 'əˈɡri', 'əˈɡriː', '-ee tónica final SÍ es larga'],

  // Listas corregidas.
  ["can't", 'kænt', 'kɑːnt', 'BATH: el apóstrofo forma parte de la palabra'],
  ['franc', 'fræŋk', 'fræŋk', 'franc NO es BATH, solo France'],
  ['catalogue', 'ˈkætəˌlɔɡ', 'ˈkætəˌlɒɡ', 'CLOTH con la grafía británica -logue'],
  ['figure', 'ˈfɪɡjɚ', 'ˈfɪɡə', 'lleva yod en americano y no en británico'],
]

const failures = []

for (const [word, expectedUs, expectedUk, rule] of CASES) {
  const pronunciations = dictionary.get(word)
  if (!pronunciations) {
    failures.push(`${word}: no está en el diccionario (¿se regeneró mal?)`)
    continue
  }
  const { us, uk } = transcribeWord(pronunciations[0], word)
  if (us !== expectedUs) failures.push(`${word} · americano: esperaba /${expectedUs}/ y salió /${us}/  — ${rule}`)
  if (uk.ipa !== expectedUk) failures.push(`${word} · británico: esperaba /${expectedUk}/ y salió /${uk.ipa}/  — ${rule}`)
}

/* ------------------------------------------------------------------ *
 * El tokenizador
 * ------------------------------------------------------------------ */

const renderUk = (text) =>
  transcribe(text, dictionary)
    .map((token) => {
      if (token.kind === 'break') return '\n'
      if (token.kind === 'plain') return token.text
      if (token.status === 'unknown') return `[${token.text}]`
      // Formato común desde la generalización a varios idiomas: ver src/lib/fonetica/tipos.ts
      const link = token.linking?.uk?.[0] && token.followedByVowel ? 'r' : ''
      return token.forms.uk[0] + link
    })
    .join('')

/** [entrada, salida británica esperada, qué vigila] */
const TEXT_CASES = [
  ['far away', 'fɑːr əˈweɪ', '/r/ de enlace ante vocal'],
  ['far from', 'fɑː frɒm', '/r/ de enlace: NO ante consonante'],
  ['25 students', 'ˈtwenti faɪv ˈstjuːdənts', 'números a palabras'],
  ['3.5 hours', 'θriː pɔɪnt faɪv ˈaʊəz', 'decimales'],
  ['the BBC', 'ðə biː-biː-siː', 'siglas deletreadas'],
  ['rebooting', 'riˈbuːtɪŋ', 'rescate morfológico desde reboot'],
  ['Hello, world!', 'həˈləʊ, wɜːld!', 'la puntuación se conserva'],
]

for (const [input, expected, rule] of TEXT_CASES) {
  const actual = renderUk(input)
  if (actual !== expected) {
    failures.push(`«${input}»: esperaba «${expected}» y salió «${actual}»  — ${rule}`)
  }
}

/* ------------------------------------------------------------------ *
 * Resultado
 * ------------------------------------------------------------------ */

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} caso(s) de transcripción fonética fuera de sitio:\n`)
  for (const failure of failures) console.error(`  · ${failure}`)
  console.error('\nNo ajustes el caso esperado para que pase: cada uno es el ejemplo canónico')
  console.error('de su fenómeno, y si falla es la regla la que se movió. Ver')
  console.error('docs/transcripcion-fonetica.md, apartado 3.\n')
  process.exit(1)
}

console.log(
  `Fonética íntegra: ${CASES.length} palabras y ${TEXT_CASES.length} frases comprobadas ` +
  `sobre ${dictionary.size.toLocaleString('es-CO')} entradas.`,
)
