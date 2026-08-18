/**
 * Guardián del transcriptor de francés.
 *
 *     npm run check:fonetica-frances
 *
 * El francés no lleva diccionario: es una tabla de reglas ordenadas, y el orden decide el
 * resultado. Cambiar una para arreglar una palabra rompe otra en silencio — de hecho ya
 * pasó: comprobar la caída de la `e` muda antes que la sílaba cerrada hacía que `annette`
 * saliera /ant/ en vez de /anɛt/, y costó 1.200 palabras de acierto.
 *
 * Cada caso lleva escrito qué vigila.
 */

import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'

const root = path.resolve(import.meta.dirname, '..')

if (!process.execArgv.some((a) => a.includes('strip-types')) && Number(process.versions.node.split('.')[0]) < 23) {
  const again = spawnSync(process.execPath,
    ['--experimental-strip-types', '--no-warnings', import.meta.filename, ...process.argv.slice(2)],
    { stdio: 'inherit' })
  process.exit(again.status ?? 1)
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    try { return nextResolve(specifier, context) } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) return nextResolve(`${specifier}.ts`, context)
      throw error
    }
  },
})

const { transcribeFrench } = await import(pathToFileURL(path.join(root, 'src/lib/fonetica/frances/ipa.ts')).href)
const { transcribeFrenchText } = await import(pathToFileURL(path.join(root, 'src/lib/fonetica/frances/transcribe.ts')).href)

/** [palabra, AFI esperado, qué regla vigila] */
const CASES = [
  ['bonjour', 'bɔ̃ʒuʁ', 'vocal nasal + ou'],
  ['merci', 'mɛʁsi', 'c ante i suena /s/'],
  ['avec', 'avɛk', 'c FINAL suena /k/ — el fallo de includes("") la ablandaba siempre'],
  ['blanc', 'blɑ̃', 'c final tras nasal calla'],
  ['oui', 'wi', 'ou ante vocal es semiconsonante'],
  ['beaucoup', 'boku', 'eau, y la p final calla'],
  ['eau', 'o', 'tres letras, un solo sonido'],
  ['oiseau', 'wazo', 'oi + s entre vocales + eau'],
  ['maison', 'mɛzɔ̃', 's entre vocales suena /z/'],
  ['temps', 'tɑ̃', 'ps final calla entero'],
  ['nation', 'nasjɔ̃', 'ti ante on suena /sj/'],
  ['question', 'kɛstjɔ̃', '…pero NO tras s'],
  ['ville', 'vil', 'ill que suena /il/: va por lista'],
  ['famille', 'famij', 'ill normal suena /ij/'],
  ['travail', 'tʁavaj', 'ail final'],
  ['soleil', 'sɔlɛj', 'eil final'],
  ['annette', 'anɛt', 'sílaba cerrada: la e es /ɛ/ y NO se cae'],
  ['allemand', 'almɑ̃', 'la e muda SÍ se cae si no amontona consonantes'],
  ['parler', 'paʁle', '-er final es /e/'],
  ['mer', 'mɛʁ', '…salvo en la lista de excepciones'],
  ['chez', 'ʃe', '-ez final es /e/'],
  ['actes', 'akt', '-es final calla'],
  ['les', 'le', '…pero no en monosílabos'],
  ['le', 'lə', 'la e final de monosílabo es schwa'],
  ['jeune', 'ʒœn', 'eu abierta ante consonante'],
  ['heureux', 'œʁø', 'eux final es cerrada'],
  ['nuit', 'nɥi', 'ui'],
  ['grand', 'ɡʁɑ̃', 'd final calla'],
  ['petit', 'pəti', 't final calla'],
  ['français', 'fʁɑ̃sɛ'],
  ['étudiant', 'etydjɑ̃', 'i ante vocal es semiconsonante'],
  ['moment', 'mɔmɑ̃', '-ment suena (medido: 98 %)'],
  ['parlent', 'paʁl', '-ent de verbo calla (medido: 94-97 %)'],

  /* Lista cerrada de irregulares. Si una de estas falla, alguien tocó IRREGULARES. */
  ['est', 'ɛ', 'el verbo más frecuente del idioma: NO es /ɛs/'],
  ['vingt', 'vɛ̃', 'la g no suena'],
  ['femme', 'fam', 'la única e que suena /a/'],
  ['monsieur', 'məsjø', 'irregular de arriba abajo'],
  ['fils', 'fis', 'calla la l y suena la s: al revés de lo normal'],
  ['second', 'səɡɔ̃', 'la c suena /ɡ/'],
  ['tabac', 'taba', 'c final muda, contra CaReFuL'],
  ['gentil', 'ʒɑ̃ti', 'l final muda, contra CaReFuL'],
  ['sept', 'sɛt', 'calla la p, no la t'],
]

/**
 * [palabra, cómo se pinta con las mudas entre corchetes, qué vigila]
 *
 * Vigila algo que el AFI solo NO detecta: una regla larga puede tragarse una letra muda
 * sin marcarla. `deux` sonaba /dø/ —correcto— pero salía en pantalla sin una sola letra
 * atenuada, que es justo lo que esta herramienta promete enseñar.
 */
const MUDAS = [
  ['deux', 'deu[x]', 'la x que se traga la regla de -eux'],
  ['nez', 'ne[z]', 'la z que se traga la regla de -ez'],
  ['parler', 'parle[r]', 'la r del infinitivo'],
  ['premier', 'premie[r]', 'la r de -ier'],
  ['tableaux', 'tableau[x]', 'la x de -eaux'],
  ['beaucoup', 'beaucou[p]', 'consonante final normal: el camino de siempre'],
  ['homme', '[h]omm[e]', 'la h inicial y la e final, agrupadas aparte'],
  ['parlent', 'parl[ent]', 'las tres letras seguidas van en un solo corchete'],
  ['est', 'e[st]', 'las mudas de un irregular se pintan igual'],
  ['mer', 'mer', 'la r SÍ suena aquí: ni un corchete'],
]

/** [frase, AFI con enlaces, qué vigila] */
const PHRASES = [
  ['les amis', 'le‿z ami', 'liaison obligatoria: la s reaparece como /z/'],
  ['les copains', 'le kɔpɛ̃', 'sin liaison ante consonante'],
  ['les héros', 'le eʁo', 'la h aspirada BLOQUEA la liaison'],
  ['un homme', 'œ̃‿n ɔm', 'liaison de vocal nasal'],
  ['petit ami', 'pəti‿t ami', 'la t muda reaparece'],
  ['nous avons', 'nu‿z avɔ̃', 'pronombre + verbo'],
  ['deux ans', 'dø‿z ɑ̃', 'número + nombre'],
]

const failures = []

for (const [word, expected, rule] of CASES) {
  const result = transcribeFrench(word)
  if (!result) { failures.push(`${word}: no se pudo transcribir  — ${rule ?? ''}`); continue }
  if (result.ipa !== expected) {
    failures.push(`${word}: esperaba /${expected}/ y salió /${result.ipa}/  — ${rule ?? ''}`)
  }
}

const render = (text) => transcribeFrenchText(text).map((t) => {
  if (t.kind !== 'word') return t.text ?? ''
  const link = t.linking?.afi?.[0]
  return (t.forms.afi[0] ?? `[${t.text}]`) + (link && t.followedByVowel ? `‿${link}` : '')
}).join('')

for (const [phrase, expected, rule] of PHRASES) {
  const actual = render(phrase)
  if (actual !== expected) failures.push(`«${phrase}»: esperaba «${expected}» y salió «${actual}»  — ${rule}`)
}

for (const [word, expected, rule] of MUDAS) {
  const token = transcribeFrenchText(word).find((t) => t.kind === 'word')
  const actual = token?.spoken ?? token?.text ?? '(nada)'
  if (actual !== expected) {
    failures.push(`${word}: esperaba «${expected}» y salió «${actual}»  — ${rule}`)
  }
}

for (const notFrench of ['', '123', '한국어']) {
  if (transcribeFrench(notFrench) !== null) failures.push(`«${notFrench}» debería devolver null`)
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} caso(s) de francés fuera de sitio:\n`)
  for (const f of failures) console.error(`  · ${f}`)
  console.error('\nLa tabla de reglas es ordenada: si esto falla, probablemente se movió una regla')
  console.error('de sitio, no solo su contenido. Ver el encabezado de src/lib/fonetica/frances/ipa.ts.\n')
  process.exit(1)
}

console.log(`Francés íntegro: ${CASES.length} palabras, ${MUDAS.length} juegos de letras mudas y ${PHRASES.length} frases con liaison comprobadas.`)
