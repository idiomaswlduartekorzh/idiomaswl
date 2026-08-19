#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import process from 'node:process'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

/**
 * La prueba a ciegas (puerta 6), convertida en medición.
 *
 * Hasta ahora se le pedía a un auditor que «tapara mentalmente el texto». Eso es una
 * promesa, no un control: el pasaje seguía en su contexto. Este script extrae el examen
 * SIN los textos —solo enunciado y opciones— para que el solucionador no pueda verlos
 * aunque quiera, y guarda la clave aparte.
 *
 * Por qué importa el rigor aquí: la puerta 6 es la que decide si el examen mide lectura,
 * y la cifra que da (45-70 % la noche del 18 ago) es la que gobierna el plan entero.
 *
 *   node scripts/sat-blind-test.mjs --module sat-set-1-m1 --out /tmp/ciego.md
 *   node scripts/sat-blind-test.mjs --module sat-set-1-m1 --score '["A","C",…]' --etiqueta haiku
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const satDir = path.join(repoRoot, 'src/data/mocks/sat')
const LETTERS = ['A', 'B', 'C', 'D']

const args = process.argv.slice(2)
const val = (f) => (args.includes(f) ? args[args.indexOf(f) + 1] : null)
const moduleId = val('--module')
const outPath = val('--out')
const scoreRaw = val('--score')
const panelPath = val('--panel')
const paraAuditor = args.includes('--auditoria')
const etiqueta = val('--etiqueta') || 'anónimo'

const cache = new Map()
function loadTs(file) {
  const resolved = path.resolve(file)
  if (cache.has(resolved)) return cache.get(resolved)
  const out = ts.transpileModule(fs.readFileSync(resolved, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText
  const localRequire = (spec) => {
    if (!spec.startsWith('.')) return require(spec)
    const base = path.resolve(path.dirname(resolved), spec)
    for (const c of [base, `${base}.ts`, path.join(base, 'index.ts')]) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) return loadTs(c)
    }
    return {}
  }
  const sandbox = { exports: {}, module: { exports: {} }, require: localRequire, console }
  sandbox.module.exports = sandbox.exports
  vm.runInNewContext(out, sandbox, { filename: resolved })
  cache.set(resolved, sandbox.exports)
  return sandbox.exports
}

function findModule(id) {
  for (const f of fs.readdirSync(satDir)) {
    if (!f.endsWith('.ts') || f === 'module-types.ts' || f === 'build-sat-mock.ts') continue
    const exported = loadTs(path.join(satDir, f))
    for (const v of Object.values(exported)) {
      if (v && Array.isArray(v.items) && v.id === id) return v
    }
  }
  return null
}

const mod = findModule(moduleId)
if (!mod) {
  console.error(`No existe el módulo «${moduleId}».`)
  process.exit(1)
}

const clave = mod.items.map((q) => LETTERS[q.answer])

// ── modo puntuar ──
if (scoreRaw) {
  let respuestas
  try {
    respuestas = JSON.parse(scoreRaw)
  } catch {
    console.error('--score espera un JSON con un array de letras, p. ej. \'["A","C","B"]\'')
    process.exit(1)
  }
  if (respuestas.length !== clave.length) {
    console.error(`Se esperaban ${clave.length} respuestas y llegaron ${respuestas.length}.`)
    process.exit(1)
  }
  const metaById = new Map((mod.meta || []).map((m) => [m.id, m]))
  const aciertos = respuestas.filter((r, i) => String(r).trim().toUpperCase() === clave[i])
  const pct = (100 * aciertos.length) / clave.length

  // Por dominio: dice qué parte del examen se resuelve sin leer, no solo cuánto.
  const porDominio = {}
  respuestas.forEach((r, i) => {
    const d = metaById.get(mod.items[i].id)?.domain || '?'
    porDominio[d] = porDominio[d] || { ok: 0, total: 0 }
    porDominio[d].total++
    if (String(r).trim().toUpperCase() === clave[i]) porDominio[d].ok++
  })

  console.log(`\n🕶  Prueba a ciegas · ${moduleId} · solucionador: ${etiqueta}`)
  console.log(`   ${aciertos.length}/${clave.length} = ${pct.toFixed(1)} %  (azar 25 % · techo tolerado 35 %)`)
  console.log(`   ${pct <= 35 ? '✅ dentro de umbral' : `❌ ${(pct - 35).toFixed(1)} puntos por encima del techo`}`)
  for (const [d, v] of Object.entries(porDominio)) {
    console.log(`   ${d}: ${v.ok}/${v.total} (${((100 * v.ok) / v.total).toFixed(0)} %)`)
  }
  const fallados = mod.items.map((q, i) => (String(respuestas[i]).trim().toUpperCase() === clave[i] ? q.id : null)).filter(Boolean)
  console.log(`   acertados sin leer: ${fallados.join(' ') || 'ninguno'}\n`)
  process.exit(0)
}

// ── modo panel: varios solucionadores a la vez, y qué ítem filtra ──
//
// Es el modo que importa para trabajar. La media dice si el examen está roto; el desglose
// por ítem dice CUÁL hay que rehacer, que es lo único accionable. Un ítem que aciertan 8
// de 8 sin leer no mide nada: es un regalo de puntos que además le miente al estudiante.
if (panelPath) {
  const panel = JSON.parse(fs.readFileSync(panelPath, 'utf8'))
  const metaById = new Map((mod.meta || []).map((m) => [m.id, m]))
  const n = panel.length
  console.log(`\n🕶  Prueba a ciegas · ${moduleId} · panel de ${n} solucionadores\n`)

  const pcts = panel.map((p) => {
    const ok = p.respuestas.filter((r, i) => String(r).toUpperCase() === clave[i]).length
    console.log(`   ${String(p.etiqueta).padEnd(12)} ${ok}/${clave.length} = ${((100 * ok) / clave.length).toFixed(1)} %`)
    return (100 * ok) / clave.length
  })
  const media = pcts.reduce((a, b) => a + b, 0) / n
  console.log(`\n   media ${media.toFixed(1)} %  ·  azar 25 %  ·  techo 35 %  →  ${media <= 35 ? '✅' : `❌ +${(media - 35).toFixed(1)}`}\n`)

  const filtran = []
  console.log(`   ítem   dom   clave   aciertan sin leer`)
  mod.items.forEach((q, i) => {
    const ok = panel.filter((p) => String(p.respuestas[i]).toUpperCase() === clave[i]).length
    const marca = ok >= Math.ceil(0.75 * n) ? '🔴 filtra' : ok >= Math.ceil(0.5 * n) ? '🟠' : '✅'
    if (ok >= Math.ceil(0.75 * n)) filtran.push(q.id)
    console.log(`   ${q.id.padEnd(6)} ${(metaById.get(q.id)?.domain || '?').padEnd(5)} ${clave[i].padEnd(7)} ${String(ok).padStart(2)}/${n}  ${marca}`)
  })
  console.log(`\n   filtran (≥75 % del panel acierta sin leer): ${filtran.length}/${mod.items.length} → ${filtran.join(' ') || 'ninguno'}\n`)
  process.exit(filtran.length || media > 35 ? 1 : 0)
}

// ── modo copia para el auditor ──
//
// Lo pidieron los propios auditores de clave única: la lectura a ciegas es imposible sobre
// los archivos de bloque, porque la cabecera declara la secuencia completa de claves y el
// `answer` está cuatro líneas bajo cada opción. Compensaban derivando del texto antes de
// mirar, pero eso es disciplina, no un control. Esta copia lleva los textos —que el auditor
// SÍ necesita, a diferencia del panel— y ni las claves ni las razones.
if (paraAuditor) {
  const out = [
    `# ${moduleId} — copia para auditoría de clave`,
    '',
    'Los textos completos, sin las claves ni las razones declaradas. Resuelve cada ítem y',
    'escribe tu respuesta ANTES de abrir el archivo original para comparar.',
    '',
  ]
  mod.items.forEach((q, i) => {
    out.push(`## ${i + 1} · ${q.id}`, '', q.stimulus, '', `**${q.text}**`, '')
    q.options.forEach((o, k) => out.push(`${LETTERS[k]}. ${o}`))
    out.push('')
  })
  const texto = out.join('\n')
  if (outPath) {
    fs.writeFileSync(outPath, texto)
    console.log(`Copia para auditoría escrita en ${outPath} (${mod.items.length} ítems con sus textos, sin claves).`)
  } else console.log(texto)
  process.exit(0)
}

// ── modo extraer ──
const lineas = [
  `# Examen a ciegas · ${moduleId}`,
  '',
  'Responde cada pregunta eligiendo A, B, C o D. **No dispones de los textos**: elige lo que',
  'creas más probable. Si no tienes ninguna base, elige al azar.',
  '',
]
mod.items.forEach((q, i) => {
  lineas.push(`## ${i + 1}. ${q.text}`)
  q.options.forEach((o, k) => lineas.push(`${LETTERS[k]}. ${o}`))
  lineas.push('')
})

const texto = lineas.join('\n')
if (outPath) {
  fs.writeFileSync(outPath, texto)
  console.log(`Examen a ciegas escrito en ${outPath} (${mod.items.length} preguntas, sin los textos).`)
  console.log(`Clave (NO se la des al solucionador): ${clave.join('')}`)
} else {
  console.log(texto)
}
