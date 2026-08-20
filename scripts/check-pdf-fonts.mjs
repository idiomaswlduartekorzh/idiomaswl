#!/usr/bin/env node
/**
 * Guardián de las tipografías recortadas de los PDF.
 *
 * Las fuentes de `public/fonts/` no traen el alfabeto entero: traen exactamente
 * los caracteres que el contenido usaba el día que se generaron. Eso es lo que
 * permite que una hoja de gramática coreana pese 108 KB en vez de 10 MB.
 *
 * El riesgo es evidente: el día que alguien escriba una palabra coreana con una
 * sílaba que el recorte no tiene, esa sílaba saldrá VACÍA en el PDF. No falla
 * nada, no avisa nadie, y el estudiante se descarga una frase con un agujero.
 *
 * Este guardián lee el `cmap` de cada fuente recortada, lo compara con los
 * caracteres del contenido y para el build si falta alguno. Si te para:
 * regenera los recortes con `node scripts/build-pdf-fonts.mjs --src <carpeta>`
 * (lee su cabecera) y commitea los .ttf nuevos. No lo silencies: el hueco no se
 * ve hasta que un estudiante abre el PDF.
 */

import { readFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { IDIOMAS, PESOS, caracteresDe, nombreFuente } from './build-pdf-fonts.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

/** Los puntos de código que una fuente TrueType sabe dibujar, leídos de su tabla `cmap`. */
function cobertura(ttf) {
  const buf = readFileSync(ttf)
  const numTables = buf.readUInt16BE(4)
  let cmapOff = 0
  for (let i = 0; i < numTables; i++) {
    const p = 12 + i * 16
    if (buf.toString('ascii', p, p + 4) === 'cmap') cmapOff = buf.readUInt32BE(p + 8)
  }
  if (!cmapOff) throw new Error(`${ttf}: sin tabla cmap`)

  // Se prefiere el formato 12 (Unicode completo) y si no, el 4 (plano básico).
  const n = buf.readUInt16BE(cmapOff + 2)
  let best = null
  for (let i = 0; i < n; i++) {
    const rec = cmapOff + 4 + i * 8
    const off = cmapOff + buf.readUInt32BE(rec + 4)
    const fmt = buf.readUInt16BE(off)
    if (fmt === 12) { best = { fmt, off }; break }
    if (fmt === 4 && !best) best = { fmt, off }
  }
  if (!best) throw new Error(`${ttf}: cmap sin formato 4 ni 12`)

  const out = new Set()
  if (best.fmt === 12) {
    const grupos = buf.readUInt32BE(best.off + 12)
    for (let g = 0; g < grupos; g++) {
      const p = best.off + 16 + g * 12
      const ini = buf.readUInt32BE(p), fin = buf.readUInt32BE(p + 4)
      for (let c = ini; c <= fin; c++) out.add(c)
    }
    return out
  }

  const segX2 = buf.readUInt16BE(best.off + 6)
  const segs = segX2 / 2
  const endO = best.off + 14
  const startO = endO + segX2 + 2
  const deltaO = startO + segX2
  const rangeO = deltaO + segX2
  for (let s = 0; s < segs; s++) {
    const end = buf.readUInt16BE(endO + s * 2)
    const start = buf.readUInt16BE(startO + s * 2)
    if (start === 0xffff) continue
    const delta = buf.readInt16BE(deltaO + s * 2)
    const rango = buf.readUInt16BE(rangeO + s * 2)
    for (let c = start; c <= end && c !== 0x10000; c++) {
      let gid
      if (rango === 0) gid = (c + delta) & 0xffff
      else {
        const gi = rangeO + s * 2 + rango + (c - start) * 2
        if (gi + 1 >= buf.length) continue
        gid = buf.readUInt16BE(gi)
        if (gid) gid = (gid + delta) & 0xffff
      }
      if (gid) out.add(c) // glifo 0 es .notdef: ese carácter NO está cubierto
    }
  }
  return out
}

let fallos = 0
for (const [lang, cfg] of Object.entries(IDIOMAS)) {
  const necesarios = [...caracteresDe(cfg)]
  for (const peso of Object.values(PESOS)) {
    const ttf = join(ROOT, 'public/fonts', nombreFuente(cfg.codigo, peso))
    if (!existsSync(ttf)) {
      console.error(`  FALTA la fuente ${nombreFuente(cfg.codigo, peso)} — regenera con scripts/build-pdf-fonts.mjs`)
      fallos++
      continue
    }
    const cubiertos = cobertura(ttf)
    const huecos = necesarios.filter((ch) => !cubiertos.has(ch.codePointAt(0)))
    if (huecos.length) {
      console.error(
        `\n  ${lang} (peso ${peso}): ${huecos.length} caracteres del contenido NO están en la fuente recortada.`
      )
      console.error(`  Saldrían en blanco en el PDF: ${huecos.slice(0, 30).join(' ')}${huecos.length > 30 ? ' …' : ''}`)
      console.error(`  Regenera los recortes: node scripts/build-pdf-fonts.mjs --src <carpeta con las Noto>`)
      fallos++
    }
  }
}

if (fallos) {
  console.error(`\nFuentes de PDF: ${fallos} problema(s). El build se para.\n`)
  process.exit(1)
}
console.log('\nFuentes de PDF íntegras: coreano, japonés y ruso cubren todo su contenido.\n')
