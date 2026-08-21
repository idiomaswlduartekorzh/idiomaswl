#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import vm from 'node:vm'
import process from 'node:process'
import { createRequire } from 'node:module'

/**
 * Guardián del superhub de SAT.
 *
 * Qué protege, y por qué. El clúster de `/examenes/sat/guia/` son páginas que
 * compilan aunque estén rotas de la única forma que importa: sin `canonical`, sin
 * entrada en el sitemap, sin enlace de vuelta al simulacro, o prometiendo en el
 * marcado preguntas que no están en pantalla. Nada de eso pone rojo el build.
 *
 * Ya nos pasó una versión de esto: la lista de exámenes del sitemap se escribía a
 * mano y se quedó sin `sat`. El hub existía, se veía y Google no lo tenía. Este
 * script existe para que ese fallo no se pueda repetir en silencio.
 *
 *   node scripts/check-sat-superhub.mjs
 */

const require = createRequire(import.meta.url)
const ts = require('typescript')

const ROOT = process.cwd()
const GUIDES = path.join(ROOT, 'src/data/satGuides.ts')
const DOMAIN_TYPES = path.join(ROOT, 'src/data/mocks/sat/module-types.ts')
const SITEMAP = path.join(ROOT, 'src/app/sitemap.ts')
const RUTA = path.join(ROOT, 'src/app/(site)/examenes/[exam]/guia/[slug]/page.tsx')
const HUB = path.join(ROOT, 'src/app/(site)/examenes/[exam]/page.tsx')
const INDICE = path.join(ROOT, 'src/app/(site)/examenes/[exam]/ExamCluster.tsx')

// Tope de la descripción: el mismo que aplica check-seo-snippets a todo el sitio.
// Por encima, Google la recorta y la promesa del resultado se parte a mitad.
const MAX_DESC = 155
const MAX_TITLE = 70

const fallos = []
const avisos = []
const fail = (slug, puerta, msg) => fallos.push({ slug, puerta, msg })
const warn = (slug, puerta, msg) => avisos.push({ slug, puerta, msg })

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

// Un guardián que no puede cargar lo que audita tiene que decirlo y parar. Dar luz
// verde por no haber mirado es peor que no existir.
let guias, mapaDominios
try {
  ;({ SAT_GUIDES: guias } = loadTs(GUIDES))
  ;({ SAT_DOMAIN_GUIDE_SLUG: mapaDominios } = loadTs(DOMAIN_TYPES))
} catch (err) {
  console.error(`❌ No se pudo cargar el clúster: ${err.message}`)
  process.exit(1)
}
if (!Array.isArray(guias) || guias.length === 0) {
  console.error('❌ `SAT_GUIDES` no exporta ninguna página. El espinazo está vacío.')
  process.exit(1)
}

const escritos = new Set(guias.map(g => g.slug))

// ── Puerta 1 · la ruta existe ────────────────────────────────────────────────
if (!fs.existsSync(RUTA)) {
  fail('—', 'ruta', 'no existe src/app/(site)/examenes/[exam]/guia/[slug]/page.tsx: las guías no se sirven')
}

// ── Puerta 2 · el sitemap las envía ──────────────────────────────────────────
const sitemap = fs.existsSync(SITEMAP) ? fs.readFileSync(SITEMAP, 'utf8') : ''
if (!sitemap.includes('SAT_GUIDE_SLUGS')) {
  fail('—', 'sitemap', 'sitemap.ts no importa SAT_GUIDE_SLUGS: las guías existen y Google no las recibe')
}
if (!/Object\.keys\(EXAMS\)/.test(sitemap)) {
  fail('—', 'sitemap', 'la lista de exámenes del sitemap volvió a escribirse a mano; se deriva de EXAMS')
}

// ── Puerta 3 · el hub enseña el clúster ──────────────────────────────────────
//
// Un clúster al que solo se entra por el sitemap es una lista de URLs, no un hub:
// ni el lector lo recorre ni el rastreador reparte autoridad por él.
if (!fs.existsSync(INDICE)) {
  fail('—', 'hub', 'no existe ExamCluster.tsx: el hub no tiene índice del clúster')
} else {
  const indice = fs.readFileSync(INDICE, 'utf8')
  if (!indice.includes('SAT_GUIDES') || !indice.includes('SAT_GUIDE_GROUPS')) {
    fail('—', 'hub', 'el índice del hub no se genera desde SAT_GUIDES: una lista escrita a mano se queda vieja a la primera página nueva')
  }
}
const hub = fs.existsSync(HUB) ? fs.readFileSync(HUB, 'utf8') : ''
if (!hub.includes('ExamCluster')) {
  fail('—', 'hub', '/examenes/sat no pinta el índice del clúster: a las guías solo se llegaría por el sitemap')
}

// ── Puerta 3 bis · cada dominio del examen tiene su página ───────────────────
for (const [dominio, slug] of Object.entries(mapaDominios ?? {})) {
  const g = guias.find(x => x.slug === slug)
  if (!g) {
    fail(slug, 'dominios', `la pantalla de resultados enlaza a /examenes/sat/guia/${slug} para ${dominio} y esa guía no existe: 404 al estudiante`)
  } else if (g.domain !== dominio) {
    fail(slug, 'dominios', `declara domain «${g.domain}» pero el mapa la usa para «${dominio}»`)
  }
}

// ── Puerta 4 · el aviso de marca, en las tres superficies ────────────────────
//
// Nuestras páginas reproducen los enunciados literales de College Board porque
// replicar el formato exige replicar la instrucción. Eso no es problema de derechos
// —son frases funcionales cortas— sino de marca: un simulacro que imita el examen sin
// decir de quién es la marca puede leerse como que College Board nos avala.
//
// El aviso vive en `src/data/sat-marca.ts` y tiene que aparecer donde el estudiante
// esté: las guías, el índice del hub y el simulacro. Se comprueba que las tres lo
// importen, no que exista el fichero: un aviso que nadie pinta no avisa a nadie.
const SUPERFICIES = [
  ['src/data/sat-marca.ts', 'la fuente única del aviso'],
  ['src/app/(site)/examenes/[exam]/guia/[slug]/page.tsx', 'las páginas de guía'],
  ['src/app/(site)/examenes/[exam]/ExamCluster.tsx', 'el índice del hub'],
  ['src/app/(site)/examenes/[exam]/practica/[mockId]/PracticeClient.tsx', 'el simulacro'],
]
for (const [rel, quien] of SUPERFICIES) {
  const abs = path.join(ROOT, rel)
  if (!fs.existsSync(abs)) { fail('—', 'marca', `falta ${rel} (${quien})`); continue }
  const txt = fs.readFileSync(abs, 'utf8')
  const buscado = rel.endsWith('sat-marca.ts') ? 'College Board' : 'SAT_MARCA'
  if (!txt.includes(buscado)) {
    fail('—', 'marca', `${quien} no lleva el aviso de marca: el simulacro imita el examen sin decir de quién es la marca`)
  }
}

// ── Puerta 4 · cada página está completa ─────────────────────────────────────
for (const g of guias) {
  const s = g.slug
  if (!g.title || g.title.length > MAX_TITLE) fail(s, 'metadata', `title de ${g.title?.length ?? 0} caracteres (máx ${MAX_TITLE})`)
  if (!g.description) fail(s, 'metadata', 'sin description')
  else if (g.description.length > MAX_DESC) fail(s, 'metadata', `description de ${g.description.length} caracteres (máx ${MAX_DESC}): Google la recorta`)
  if (!g.h1) fail(s, 'metadata', 'sin h1')
  if (!['seccion', 'dominio', 'preparacion'].includes(g.group)) {
    fail(s, 'metadata', `group «${g.group}» desconocido: la página no saldría en el índice del hub`)
  }
  if (!g.lead) fail(s, 'contenido', 'sin lead: es la frase que citan los motores de respuesta')
  if (!Array.isArray(g.sections) || g.sections.length < 3) fail(s, 'contenido', `${g.sections?.length ?? 0} secciones (mín. 3)`)
  if (!Array.isArray(g.faqs) || g.faqs.length < 3) fail(s, 'contenido', `${g.faqs?.length ?? 0} preguntas frecuentes (mín. 3)`)
  if (!Array.isArray(g.sources) || g.sources.length === 0) fail(s, 'fuentes', 'sin fuentes oficiales: nada se publica sin fuente verificable')
  if (!/^\d{4}-\d{2}-\d{2}$/.test(g.checkedISO ?? '')) fail(s, 'fuentes', `checkedISO «${g.checkedISO}» no es AAAA-MM-DD: el dateModified del marcado saldría mal`)

  // Una sección vacía compila y no dice nada.
  for (const sec of g.sections ?? []) {
    if (!sec.h) fail(s, 'contenido', 'una sección sin título')
    if (!Array.isArray(sec.body) || sec.body.length === 0) fail(s, 'contenido', `sección «${sec.h}» sin párrafos`)
  }
  for (const f of g.faqs ?? []) {
    if (!f.q || !f.a) fail(s, 'contenido', 'una pregunta frecuente sin enunciado o sin respuesta')
  }
}

// ── Puerta 5 · enlaces internos ──────────────────────────────────────────────
for (const g of guias) {
  const s = g.slug
  const rel = g.relatedSlugs ?? []
  if (rel.includes(s)) fail(s, 'enlaces', 'se enlaza a sí misma')
  if (new Set(rel).size !== rel.length) fail(s, 'enlaces', 'relatedSlugs repetidos')
  for (const r of rel) {
    if (!escritos.has(r)) warn(s, 'enlaces', `apunta a «${r}», que aún no está escrita (se filtra sola, no genera 404)`)
  }
  const externos = g.related ?? []
  if (!externos.some(r => typeof r.href === 'string' && r.href.startsWith('/examenes/sat/practica/'))) {
    fail(s, 'enlaces', 'no enlaza al simulacro: una guía que explica y no deja medir se queda a medias')
  }
}

// ── Puerta 6 · la página madre enlaza a todo el espinazo ─────────────────────
const madre = guias.find(g => g.slug === 'reading-and-writing')
if (!madre) {
  fail('reading-and-writing', 'estructura', 'falta la página madre del espinazo')
} else {
  for (const slug of escritos) {
    if (slug === madre.slug) continue
    if (!(madre.relatedSlugs ?? []).includes(slug)) {
      fail('reading-and-writing', 'estructura', `la página madre no enlaza a «${slug}»: el clúster se queda sin centro`)
    }
  }
}

// ── informe ──────────────────────────────────────────────────────────────────
console.log(`\n🕸️  Superhub SAT — ${guias.length} página(s) del espinazo\n`)
for (const g of guias) {
  const propios = fallos.filter(f => f.slug === g.slug)
  console.log(`${propios.length ? '❌' : '✅'} /examenes/sat/guia/${g.slug}  ·  ${g.sections.length} secciones · ${g.faqs.length} preguntas`)
}
if (avisos.length) {
  console.log('\n⚠️  Avisos')
  for (const a of avisos) console.log(`   ${a.slug} · ${a.puerta} · ${a.msg}`)
}
if (fallos.length) {
  console.log('\n❌ Fallos')
  for (const f of fallos) console.log(`   ${f.slug} · ${f.puerta} · ${f.msg}`)
  console.log(`\n❌ ${fallos.length} fallo(s). El clúster no se publica así.\n`)
  process.exit(1)
}
console.log('\n✅ Las ocho puertas del clúster, superadas.\n')
