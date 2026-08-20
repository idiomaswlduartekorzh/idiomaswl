#!/usr/bin/env node
/**
 * Recorta las tipografías que llevan los PDF de coreano, japonés y ruso.
 *
 * POR QUÉ EXISTE
 *
 * Un PDF lleva la tipografía dentro. jsPDF no sabe recortarla: mete el archivo
 * entero. Noto Sans KR pesa 10 MB, así que cada hoja de gramática coreana
 * pesaría 10 MB — peor que no poder descargarla.
 *
 * Pero nuestro contenido coreano no usa los 11.000 caracteres del hangul: usa
 * unos 750. Recortada a esos, la fuente baja a unos cientos de KB. Por eso el
 * recorte se hace AQUÍ, una vez, y al repositorio sube solo el resultado.
 *
 * CÓMO SE REGENERA (solo hace falta al añadir contenido con caracteres nuevos,
 * y el guardián `check:pdf-fonts` avisa cuando pasa)
 *
 *   1. Descarga las Noto originales a una carpeta temporal FUERA del repo:
 *        NotoSansKR[wght].ttf, NotoSansJP[wght].ttf y NotoSans[wdth,wght].ttf
 *        de https://github.com/google/fonts (carpetas ofl/notosanskr, etc.)
 *   2. npm i subset-font   (en esa carpeta temporal, no en el proyecto)
 *   3. node scripts/build-pdf-fonts.mjs --src <esa-carpeta>
 *
 * Las originales NO se commitean: son 22 MB y no hacen falta para compilar.
 * Licencia SIL OFL 1.1, que permite incrustarlas y redistribuirlas.
 */

import { readdirSync, readFileSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
// El MISMO saneador que usa el navegador al escribir el PDF. Compartirlo es lo
// que garantiza que el recorte contenga exactamente lo que se va a imprimir.
import { sanitize } from '../src/lib/pdf/sanitize.ts'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DEST = join(ROOT, 'public/fonts')

const srcFlag = process.argv.indexOf('--src')
const SRC = srcFlag > -1 ? process.argv[srcFlag + 1] : null

/**
 * Base común a todos los recortes: lo que la plantilla escribe siempre —el pie
 * de copyright, «Página 3 de 7»— más el español de las explicaciones. Sin esto
 * el PDF coreano perdería su propio membrete.
 */
const BASE =
  ' !"#$%&\'()*+,-./0123456789:;<=>?@' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`' +
  'abcdefghijklmnopqrstuvwxyz{|}~' +
  'áéíóúüñÁÉÍÓÚÜÑ¿¡ºª·«»' +
  'àèìòùâêîôûäëïöçÀÈÌÒÙÂÊÎÔÛÄËÏÖÇãõÃÕß' +
  '©®€—–…•“”‘’"\' '

// Dos pesos por idioma: la plantilla pone en negrita todos los títulos y las
// etiquetas del membrete, y jsPDF necesita un archivo distinto por peso — no
// sabe engordar una fuente. Solo se incrusta el idioma del PDF que se descarga.
export const PESOS = { normal: 400, bold: 700 }

export const IDIOMAS = {
  coreano: { fuente: 'NotoSansKR', codigo: 'ko', dirs: ['src/data/grammar/coreano', 'src/data/practica/historias/coreano'], lectura: 'ko-' },
  japones: { fuente: 'NotoSansJP', codigo: 'ja', dirs: ['src/data/grammar/japones', 'src/data/practica/historias/japones'], lectura: 'ja-' },
  ruso:    { fuente: 'NotoSans',   codigo: 'ru', dirs: ['src/data/grammar/ruso',    'src/data/practica/historias/ruso'],    lectura: 'ru-' },
}

/** Nombre del archivo recortado que se commitea. */
export const nombreFuente = (codigo, peso) => `welearn-${codigo}-${peso}.ttf`

function walk(dir, out = []) {
  if (!existsSync(dir)) return out
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p, out)
    else if (/\.(ts|tsx|json)$/.test(e.name)) out.push(p)
  }
  return out
}

/**
 * Los caracteres que ese idioma puede llegar a IMPRIMIR — no los que hay en los
 * archivos. La diferencia importa: el contenido trae flechas y emoji que el
 * saneador convierte o descarta antes de llegar al papel, y meterlos en el
 * recorte sería engordar la fuente con glifos que nadie va a pedir.
 */
export function caracteresDe(cfg) {
  const archivos = cfg.dirs.flatMap((d) => walk(join(ROOT, d)))
  const lecturas = walk(join(ROOT, 'src/data/reading/exercises')).filter((f) => f.includes('/' + cfg.lectura))
  const set = new Set(sanitize(BASE, cfg.codigo))
  for (const f of [...archivos, ...lecturas]) {
    for (const ch of sanitize(readFileSync(f, 'utf8'), cfg.codigo)) {
      const c = ch.codePointAt(0)
      if (c >= 0x20 && c !== 0x7f) set.add(ch)
    }
  }
  return [...set].sort().join('')
}

async function main() {
  if (!SRC) {
    console.error('Falta --src <carpeta con las Noto originales>. Lee la cabecera de este archivo.')
    process.exit(1)
  }
  const { default: subsetFont } = await import(join(SRC, 'node_modules/subset-font/index.js'))
    .catch(() => import('subset-font'))

  mkdirSync(DEST, { recursive: true })
  for (const [lang, cfg] of Object.entries(IDIOMAS)) {
    const origen = join(SRC, `${cfg.fuente}.ttf`)
    if (!existsSync(origen)) { console.error(`  falta ${origen}`); process.exit(1) }
    const chars = caracteresDe(cfg)
    const antes = statSync(origen).size
    const original = readFileSync(origen)
    const tamanos = []
    for (const peso of Object.values(PESOS)) {
      // Las Noto de Google son variables y jsPDF necesita una estática: se fija el eje.
      const buf = await subsetFont(original, chars, {
        targetFormat: 'truetype',
        variationAxes: { wght: peso },
      })
      const salida = nombreFuente(cfg.codigo, peso)
      writeFileSync(join(DEST, salida), buf)
      tamanos.push(`${peso}: ${(buf.length / 1024).toFixed(0)} KB`)
    }
    console.log(
      `  ${lang.padEnd(8)} ${String([...chars].length).padStart(5)} caracteres · ` +
      `${(antes / 1048576).toFixed(1)} MB -> ${tamanos.join(' · ')}`
    )
  }
  console.log('\nRecuerda: las originales no se commitean; los recortes sí.')
}

if (import.meta.url === `file://${process.argv[1]}`) await main()
