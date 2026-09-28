#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const basePath = '/herramientas/vocabulario/ingles/phrasal-verbs'
const publicRoot = path.join(repoRoot, 'public', basePath)
const canonicalRoot = `https://www.idiomaswl.com${basePath}`
const failures = []

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
    const expectedSummary = {
      topics: 28,
      total_occurrences: 672,
      unique_terms_all: 334,
      learning_routes: 40,
      examples_total: 1344,
    }

    for (const [key, expected] of Object.entries(expectedSummary)) {
      if (ecosystem.summary?.[key] !== expected) {
        fail(`ecosystem.json: ${key} debe ser ${expected}; recibido ${ecosystem.summary?.[key]}.`)
      }
    }

    const routes = [
      'explorar',
      'phrasal-verbs-esenciales',
      ...ecosystem.topics.map((entry) => entry.path),
      ...ecosystem.families.map((entry) => entry.path),
      ...ecosystem.particles.map((entry) => entry.path),
    ]

    if (new Set(routes).size !== 42) fail(`Se esperaban 42 rutas SEO únicas; hay ${new Set(routes).size}.`)

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
      if (!html.includes('application/ld+json')) fail(`${route}: falta JSON-LD.`)
      if (!html.includes(`${basePath}/assets/seo/`)) fail(`${route}: la imagen no usa la ruta productiva.`)
    }
  }

  const rootHtml = fs.readFileSync(path.join(publicRoot, 'index.html'), 'utf8')
  if (!rootHtml.includes(`<link rel="canonical" href="${canonicalRoot}"`)) fail('La portada perdió su canonical productiva.')
  if (!rootHtml.includes('phrasal-verbs-esenciales-welearn.png')) fail('La portada perdió su imagen social.')

  const pdfDir = path.join(publicRoot, 'pdfs')
  const pdfs = exists(pdfDir) ? fs.readdirSync(pdfDir).filter((name) => name.endsWith('.pdf')) : []
  if (pdfs.length !== 42) fail(`Se esperaban 42 archivos PDF; hay ${pdfs.length}.`)
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

if (!toolsPage.includes("href: '/herramientas/vocabulario'")) fail('Herramientas no enlaza el hub de Vocabulario.')
if (!vocabularyHub.includes('VOCABULARY_LANGUAGES.map')) fail('El hub no deriva sus tarjetas del catálogo de idiomas.')
if (!englishHub.includes('PHRASAL_VERBS_BASE_PATH')) fail('El hub de inglés no enlaza el banco de phrasal verbs.')
if (!sitemap.includes('PHRASAL_VERB_SEO_PAGES.map')) fail('El sitemap principal no deriva las rutas SEO del banco.')
if (!nextConfig.includes("source: '/herramientas/vocabulario/ingles/phrasal-verbs/:slug(phrasal-verbs-[a-z-]+)'")) {
  fail('Next no conserva el rewrite limpio de las páginas editoriales.')
}

if (failures.length) {
  console.error(`El contrato del banco de phrasal verbs falló (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  console.log('Banco de phrasal verbs íntegro: 42 rutas SEO, 42 PDFs, imágenes y navegación productiva verificadas.')
}
