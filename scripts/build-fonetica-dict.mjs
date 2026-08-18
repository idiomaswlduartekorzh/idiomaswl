/**
 * Prepara el diccionario de pronunciación inglesa que usa /herramientas/transcripcion-fonetica.
 *
 *     node scripts/build-fonetica-dict.mjs
 *
 * Baja el CMU Pronouncing Dictionary de Carnegie Mellon, lo limpia y lo deja en
 * `src/data/fonetica/en-cmudict.txt`. El resultado **se commitea**: el despliegue no
 * puede depender de que GitHub responda.
 *
 * El archivo guarda ARPABET, no AFI, a propósito. La conversión a alfabeto fonético vive
 * en `src/lib/fonetica/ipa.ts`, y dejarla ahí significa que corregir una regla del
 * británico no obliga a regenerar 3,4 MB de datos: se corrige el código y ya.
 *
 * Licencia del CMU: BSD de dos cláusulas, libre para uso comercial. Se conserva el aviso
 * en `src/data/fonetica/LICENSE-cmudict.txt`.
 */

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT_DIR = join(ROOT, 'src/data/fonetica')
const SOURCE = 'https://raw.githubusercontent.com/cmusphinx/cmudict/master/cmudict.dict'

const LICENSE = `El diccionario de pronunciación de este directorio procede del CMU Pronouncing
Dictionary (cmudict), de la Universidad Carnegie Mellon.

  https://github.com/cmusphinx/cmudict

Copyright (c) 2015, Alexander Rudnicky. Distribuido bajo licencia BSD de dos
cláusulas: se permite la redistribución y el uso, con o sin modificaciones, con o
sin ánimo de lucro, siempre que se conserve este aviso.

Se redistribuye modificado: ver scripts/build-fonetica-dict.mjs para saber
exactamente qué se le quitó.
`

console.log('Descargando el CMU Pronouncing Dictionary…')
const response = await fetch(SOURCE)
if (!response.ok) {
  console.error(`No se pudo descargar: HTTP ${response.status}`)
  process.exit(1)
}
const raw = await response.text()

let kept = 0
let dropped = 0
const lines = []

for (const line of raw.split('\n')) {
  // El CMU trae comentarios al final de algunas líneas, detrás de `#`.
  const clean = line.split('#')[0].trim()
  if (!clean) continue

  const space = clean.indexOf(' ')
  if (space < 0) continue

  const head = clean.slice(0, space)
  const phones = clean.slice(space + 1).trim()

  // La forma base de `word(2)` es `word`: son pronunciaciones alternativas de lo mismo.
  const base = head.replace(/\(\d+\)$/, '')

  // Fuera la puntuación suelta del CMU (`!exclamation-point`, `,comma`) y todo lo que
  // no sea una palabra: la herramienta ya trata los signos por su cuenta.
  if (!/^[a-z][a-z'.-]*$/.test(base)) { dropped++; continue }
  if (!/^[A-Z]+[012]?( [A-Z]+[012]?)*$/.test(phones)) { dropped++; continue }

  lines.push(`${head} ${phones}`)
  kept++
}

await mkdir(OUT_DIR, { recursive: true })
const text = `${lines.join('\n')}\n`
await writeFile(join(OUT_DIR, 'en-cmudict.txt'), text, 'utf8')
await writeFile(join(OUT_DIR, 'LICENSE-cmudict.txt'), LICENSE, 'utf8')

const unique = new Set(lines.map((l) => l.slice(0, l.indexOf(' ')).replace(/\(\d+\)$/, '')))
console.log(`  pronunciaciones: ${kept}   palabras distintas: ${unique.size}   descartadas: ${dropped}`)
console.log(`  ${(text.length / 1048576).toFixed(2)} MB en src/data/fonetica/en-cmudict.txt`)
