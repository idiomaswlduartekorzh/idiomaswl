#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const basePath = '/herramientas/vocabulario/ingles/phrasal-verbs'
const publicRoot = path.join(repoRoot, 'public', basePath)
const canonicalRoot = `https://www.idiomaswl.com${basePath}`
const failures = []
const expansionRoutes = new Set([
  'phrasal-verbs-comunicacion-redes-sociales', 'phrasal-verbs-transporte-conduccion',
  'phrasal-verbs-familia-crianza', 'phrasal-verbs-vivienda-arriendo',
  'phrasal-verbs-con-turn', 'phrasal-verbs-con-come', 'phrasal-verbs-con-bring',
  'phrasal-verbs-con-give',
])

const fail = (message) => failures.push(message)
const read = (relativePath) => fs.readFileSync(path.join(repoRoot, relativePath), 'utf8')
const exists = (absolutePath) => fs.existsSync(absolutePath)

if (!exists(publicRoot)) {
  fail(`No existe el banco estático en public${basePath}.`)
} else {
  const dataPath = path.join(publicRoot, 'data', 'ecosystem.json')
  if (!exists(dataPath)) {
    fail('Falta data/ecosystem.json, fuente del buscador y la trazabilidad.')
  } else {
    const ecosystem = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    const combined = [...ecosystem.occurrences, ...ecosystem.family_occurrences]
    const semanticBank = [...combined, ...ecosystem.particle_occurrences]
    const expectedSummary = {
      topics: ecosystem.topics.length,
      occurrences: ecosystem.occurrences.length,
      unique_terms: new Set(ecosystem.occurrences.map((entry) => entry.term)).size,
      families: ecosystem.families.length,
      family_occurrences: ecosystem.family_occurrences.length,
      particles: ecosystem.particles.length,
      particle_occurrences: ecosystem.particle_occurrences.length,
      total_occurrences: combined.length,
      unique_terms_all: new Set(combined.map((entry) => entry.term)).size,
      learning_routes: ecosystem.topics.length + ecosystem.families.length + ecosystem.particles.length,
      examples_total: combined.reduce((total, entry) => total + entry.examples_en.length, 0),
    }

    for (const [key, expected] of Object.entries(expectedSummary)) {
      if (ecosystem.summary?.[key] !== expected) {
        fail(`ecosystem.json: ${key} debe derivarse como ${expected}; recibido ${ecosystem.summary?.[key]}.`)
      }
    }

    if (ecosystem.topics.length < 32) fail(`El banco debe conservar al menos 32 contextos; hay ${ecosystem.topics.length}.`)
    if (ecosystem.families.length < 10) fail(`El banco debe conservar al menos 10 familias; hay ${ecosystem.families.length}.`)
    if (ecosystem.summary.total_occurrences < 832) fail(`El banco no puede bajar de 832 usos; hay ${ecosystem.summary.total_occurrences}.`)
    for (const entry of semanticBank) {
      if (!entry.sense_id || !entry.base_verb || !Array.isArray(entry.particles)) {
        fail(`${entry.id}: falta la identidad semántica derivada.`)
      }
      if (!Array.isArray(entry.examples_en) || entry.examples_en.length < 2) {
        fail(`${entry.id}: debe conservar al menos dos ejemplos.`)
      }
    }

    const routes = [
      'explorar',
      'phrasal-verbs-esenciales',
      ...ecosystem.topics.map((entry) => entry.path),
      ...ecosystem.families.map((entry) => entry.path),
      ...ecosystem.particles.map((entry) => entry.path),
    ]

    const expectedRoutes = 2 + ecosystem.summary.learning_routes
    if (new Set(routes).size !== expectedRoutes) fail(`Se esperaban ${expectedRoutes} rutas SEO únicas; hay ${new Set(routes).size}.`)

    for (const route of routes) {
      const htmlPath = path.join(publicRoot, route, 'index.html')
      if (!exists(htmlPath)) {
        fail(`Falta la página SEO ${route}/index.html.`)
        continue
      }

      const html = fs.readFileSync(htmlPath, 'utf8')
      const canonical = `${canonicalRoot}/${route}`
      if (!html.includes(`<link rel="canonical" href="${canonical}">`)) {
        fail(`${route}: canonical ausente o incorrecto.`)
      }
      if (!html.includes('<meta property="og:image"')) fail(`${route}: falta og:image.`)
      if (!html.includes('<meta name="twitter:image"') && expansionRoutes.has(route)) fail(`${route}: falta twitter:image.`)
      if (!html.includes('application/ld+json')) fail(`${route}: falta JSON-LD.`)
      if (!html.includes(`${basePath}/assets/seo/`)) fail(`${route}: la imagen no usa la ruta productiva.`)
      const imageMatch = html.match(/<meta property="og:image" content="[^"]+\/assets\/seo\/([^"]+)">/)
      if (!imageMatch || !exists(path.join(publicRoot, 'assets', 'seo', imageMatch[1]))) {
        fail(`${route}: el archivo de og:image no existe.`)
      }
      if (imageMatch?.[1].endsWith('.svg')) fail(`${route}: og:image debe usar una imagen raster, no SVG.`)
    }
  }

  const rootHtml = fs.readFileSync(path.join(publicRoot, 'index.html'), 'utf8')
  if (!rootHtml.includes(`<link rel="canonical" href="${canonicalRoot}"`)) fail('La portada perdió su canonical productiva.')
  if (!rootHtml.includes('phrasal-verbs-esenciales-welearn.png')) fail('La portada perdió su imagen social.')

  const pdfDir = path.join(publicRoot, 'pdfs')
  const pdfs = exists(pdfDir) ? fs.readdirSync(pdfDir).filter((name) => name.endsWith('.pdf')) : []
  const ecosystem = JSON.parse(fs.readFileSync(path.join(publicRoot, 'data', 'ecosystem.json'), 'utf8'))
  const minimumPdfs = ecosystem.summary.learning_routes + 2
  if (pdfs.length < minimumPdfs) fail(`Se esperaban al menos ${minimumPdfs} archivos PDF; hay ${pdfs.length}.`)
  const expectedGuideNames = [
    ...ecosystem.topics.map((entry) => `${entry.path}.pdf`),
    ...ecosystem.families.map((entry) => `${entry.path}.pdf`),
    ...ecosystem.particles.map((entry) => `${entry.path}.pdf`),
  ]
  for (const guideName of expectedGuideNames) {
    if (!pdfs.includes(guideName)) fail(`Falta el PDF correspondiente a la ruta: ${guideName}.`)
  }
  for (const pdf of pdfs) {
    const buffer = fs.readFileSync(path.join(pdfDir, pdf))
    if (buffer.length < 5_000 || buffer.subarray(0, 4).toString() !== '%PDF') {
      fail(`${pdf}: el archivo no parece un PDF útil.`)
    }
  }

  const textExtensions = new Set(['.html', '.js', '.json', '.xml', '.txt', '.css'])
  const visit = (directory) => {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = path.join(directory, entry.name)
      if (entry.isDirectory()) visit(absolutePath)
      else if (textExtensions.has(path.extname(entry.name))) {
        const source = fs.readFileSync(absolutePath, 'utf8')
        if (source.includes('idiomaswl-phrasal-verbs-preview.welearninstitute.chatgpt.site')) {
          fail(`${path.relative(publicRoot, absolutePath)} conserva el dominio del preview.`)
        }
        if (source.includes('Preview editorial')) {
          fail(`${path.relative(publicRoot, absolutePath)} conserva una etiqueta de preview.`)
        }
      }
    }
  }
  visit(publicRoot)
}

const toolsPage = read('src/app/(site)/herramientas/page.tsx')
const vocabularyHub = read('src/app/(site)/herramientas/vocabulario/page.tsx')
const englishHub = read('src/app/(site)/herramientas/vocabulario/ingles/page.tsx')
const sitemap = read('src/app/sitemap.ts')
const nextConfig = read('next.config.ts')
const vocabularyCatalog = read('src/data/herramientas/vocabulario.ts')

if (!toolsPage.includes("href: '/herramientas/vocabulario'")) fail('Herramientas no enlaza el hub de Vocabulario.')
if (!vocabularyHub.includes('VOCABULARY_LANGUAGES.map')) fail('El hub no deriva sus tarjetas del catálogo de idiomas.')
if (!englishHub.includes('PHRASAL_VERBS_BASE_PATH')) fail('El hub de inglés no enlaza el banco de phrasal verbs.')
if (!sitemap.includes('PHRASAL_VERB_SEO_PAGES.map')) fail('El sitemap principal no deriva las rutas SEO del banco.')
if (!nextConfig.includes("source: '/herramientas/vocabulario/ingles/phrasal-verbs/:slug(phrasal-verbs-[a-z-]+)'")) {
  fail('Next no conserva el rewrite limpio de las páginas editoriales.')
}
if (!nextConfig.includes("source: '/herramientas/vocabulario/ingles/phrasal-verbs/pdfs/:path*'") || !nextConfig.includes("value: 'noindex, follow, noarchive'")) {
  fail('Los PDF deben llevar X-Robots-Tag noindex para evitar competir con sus landings.')
}

if (exists(path.join(publicRoot, 'data', 'ecosystem.json'))) {
  const ecosystem = JSON.parse(fs.readFileSync(path.join(publicRoot, 'data', 'ecosystem.json'), 'utf8'))
  const catalogEntries = [...vocabularyCatalog.matchAll(/\{\s*slug: '([^']+)', image: '([^']+)'\s*\}/g)]
    .filter(([, slug]) => slug === 'explorar' || slug.startsWith('phrasal-verbs-'))
    .map(([, slug, image]) => ({ slug, image }))
  const expectedCatalog = [
    { slug: 'explorar', image: 'phrasal-verbs-esenciales-welearn.png' },
    { slug: 'phrasal-verbs-esenciales', image: 'phrasal-verbs-esenciales-welearn.png' },
    ...ecosystem.topics.map((entry) => ({ slug: entry.path, image: entry.image })),
    ...ecosystem.families.map((entry) => ({ slug: entry.path, image: entry.social_image || entry.image })),
    ...ecosystem.particles.map((entry) => ({ slug: entry.path, image: entry.image })),
  ]
  if (JSON.stringify(catalogEntries) !== JSON.stringify(expectedCatalog)) {
    fail('El catálogo TypeScript de SEO no coincide exactamente con las rutas e imágenes de ecosystem.json.')
  }
}

if (failures.length) {
  console.error(`El contrato del banco de phrasal verbs falló (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const ecosystem = JSON.parse(fs.readFileSync(path.join(publicRoot, 'data', 'ecosystem.json'), 'utf8'))
  const routeCount = ecosystem.summary.learning_routes + 2
  const pdfCount = fs.readdirSync(path.join(publicRoot, 'pdfs')).filter((name) => name.endsWith('.pdf')).length
  console.log(`Banco de phrasal verbs íntegro: ${routeCount} rutas SEO, ${pdfCount} PDFs, imágenes, semántica y navegación verificadas.`)
}
