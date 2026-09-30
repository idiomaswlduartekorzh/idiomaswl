#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { familyExpansions, topicExpansions } from './phrasal-verbs-expansion-data.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const basePath = '/herramientas/vocabulario/ingles/phrasal-verbs'
const publicRoot = path.join(repoRoot, 'public', basePath)
const canonicalRoot = `https://www.idiomaswl.com${basePath}`
const dataPath = path.join(publicRoot, 'data', 'ecosystem.json')
const imageRoot = path.join(publicRoot, 'assets', 'seo')
const appPath = path.join(publicRoot, 'app-v2.js')
const senseRegistryPath = path.join(repoRoot, 'scripts', 'phrasal-verbs-expansion-sense-ids.json')

const read = file => fs.readFileSync(file, 'utf8')
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}
const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
})[character])
const unique = values => [...new Set(values)]
const groupRows = rows => unique(rows.map(row => row.subtopic)).map(subtopic => ({
  subtopic,
  rows: rows.filter(row => row.subtopic === subtopic),
}))
const senseRegistry = JSON.parse(read(senseRegistryPath))

const ecosystem = JSON.parse(read(dataPath))
const topicSlugs = new Set(topicExpansions.map(entry => entry.slug))
const familySlugs = new Set(familyExpansions.map(entry => entry.slug))

ecosystem.topics = ecosystem.topics.filter(entry => !topicSlugs.has(entry.slug))
ecosystem.families = ecosystem.families.filter(entry => !familySlugs.has(entry.slug))
ecosystem.occurrences = ecosystem.occurrences.filter(entry => !topicSlugs.has(entry.topic))
ecosystem.family_occurrences = ecosystem.family_occurrences.filter(entry => !familySlugs.has(entry.family))

for (const topic of topicExpansions) {
  ecosystem.topics.push({
    slug: topic.slug,
    path: topic.path,
    title: topic.title,
    short: topic.short,
    description: topic.description,
    note: topic.note,
    image: topic.image,
    image_alt: topic.imageAlt,
  })
  topic.rows.forEach(([subtopic, term, meaning, example, secondExample, level], index) => {
    ecosystem.occurrences.push({
      id: `${topic.slug}-${String(index + 1).padStart(2, '0')}`,
      topic: topic.slug,
      topic_title: topic.title,
      subtopic,
      term,
      meaning_es: meaning,
      example_en: example,
      example_2_en: secondExample,
      examples_en: [example, secondExample],
      level,
      source_type: 'topic',
      source_path: topic.path,
    })
  })
}

for (const family of familyExpansions) {
  ecosystem.families.push({
    slug: family.slug,
    verb: family.verb,
    path: family.path,
    title: family.title,
    description: family.description,
    note: family.note,
    image: family.image,
    social_image: family.socialImage,
  })
  family.rows.forEach(([subtopic, term, meaning, grammar, example, secondExample, level], index) => {
    ecosystem.family_occurrences.push({
      id: `family-${family.slug}-${String(index + 1).padStart(2, '0')}`,
      family: family.slug,
      family_title: family.title,
      topic_title: family.title,
      subtopic,
      term,
      meaning_es: meaning,
      grammar,
      level,
      example_en: example,
      example_2_en: secondExample,
      examples_en: [example, secondExample],
      source_type: 'family',
      source_path: family.path,
    })
  })
}

const slugify = value => String(value)
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')
const recognizedParticles = new Set([
  'up', 'down', 'in', 'out', 'on', 'off', 'over', 'around', 'back', 'along', 'away',
  'through', 'across', 'by', 'after', 'before', 'forward', 'together', 'apart', 'upon',
  'with', 'to', 'for', 'into',
])
const semanticBank = [...ecosystem.occurrences, ...ecosystem.family_occurrences, ...ecosystem.particle_occurrences]
const expansionIds = new Set([
  ...topicExpansions.flatMap(topic => topic.rows.map((_, index) => `${topic.slug}-${String(index + 1).padStart(2, '0')}`)),
  ...familyExpansions.flatMap(family => family.rows.map((_, index) => `family-${family.slug}-${String(index + 1).padStart(2, '0')}`)),
])
for (const item of semanticBank) {
  const words = item.term.split(/\s+/)
  if (expansionIds.has(item.id) && !senseRegistry[item.id]) throw new Error(`Falta sense_id estable para ${item.id}`)
  item.sense_id = senseRegistry[item.id] || item.sense_id || `${slugify(item.term)}--${slugify(item.meaning_es)}`
  item.base_verb = words[0]
  item.particles = words.slice(1).filter(word => recognizedParticles.has(word))
}
const sensesByForm = new Map()
for (const item of semanticBank) {
  const senses = sensesByForm.get(item.term) || new Set()
  senses.add(item.sense_id)
  sensesByForm.set(item.term, senses)
}
for (const item of semanticBank) {
  item.same_form_other_senses = [...sensesByForm.get(item.term)].filter(sense => sense !== item.sense_id)
}

const topicMatches = new Map()
for (const item of ecosystem.occurrences) {
  const matches = topicMatches.get(item.term) || []
  matches.push(item)
  topicMatches.set(item.term, matches)
}
for (const item of ecosystem.occurrences) {
  const matches = topicMatches.get(item.term)
  item.context_count = unique(matches.map(match => match.topic)).length
  item.sense_count = sensesByForm.get(item.term)?.size || 1
  item.is_cross_context = item.context_count > 1 || item.sense_count > 1
}
for (const item of ecosystem.family_occurrences) {
  const matches = topicMatches.get(item.term) || []
  item.context_count = unique(matches.map(match => match.topic)).length
  item.sense_count = sensesByForm.get(item.term)?.size || 1
  item.is_cross_context = item.context_count > 0 || item.sense_count > 1
}

const combinedOccurrences = [...ecosystem.occurrences, ...ecosystem.family_occurrences]
ecosystem.summary = {
  topics: ecosystem.topics.length,
  occurrences: ecosystem.occurrences.length,
  unique_terms: unique(ecosystem.occurrences.map(item => item.term)).length,
  cross_context_terms: [...topicMatches.values()].filter(matches => unique(matches.map(item => item.topic)).length > 1).length,
  families: ecosystem.families.length,
  family_occurrences: ecosystem.family_occurrences.length,
  particles: ecosystem.particles.length,
  particle_occurrences: ecosystem.particle_occurrences.length,
  total_occurrences: combinedOccurrences.length,
  unique_terms_all: unique(combinedOccurrences.map(item => item.term)).length,
  learning_routes: ecosystem.topics.length + ecosystem.families.length + ecosystem.particles.length,
  examples_total: combinedOccurrences.reduce((sum, item) => sum + item.examples_en.length, 0),
}
const resolveImage = entry => {
  if (entry.image) {
    if (!fs.existsSync(path.join(imageRoot, entry.image))) throw new Error(`No existe la imagen declarada ${entry.image}`)
    return entry.image
  }
  const stem = `${entry.path}-welearn`
  const match = ['png', 'jpg', 'svg'].map(extension => `${stem}.${extension}`)
    .find(filename => fs.existsSync(path.join(imageRoot, filename)))
  if (!match) throw new Error(`No existe imagen SEO para ${entry.path}`)
  return match
}
for (const collection of [ecosystem.topics, ecosystem.families, ecosystem.particles]) {
  for (const entry of collection) {
    entry.image = resolveImage(entry)
    if (entry.social_image && !fs.existsSync(path.join(imageRoot, entry.social_image))) {
      throw new Error(`No existe la imagen social declarada ${entry.social_image}`)
    }
  }
}
write(dataPath, `${JSON.stringify(ecosystem, null, 2)}\n`)

const icon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='12' fill='%2314215c'/%3E%3Cpath d='M16 18h9l7 24 7-24h9L37 48H27z' fill='white'/%3E%3C/svg%3E"
const header = `<header class="seo-top"><a href="${basePath}"><img src="${basePath}/assets/welearn-wordmark.png" alt="Idiomas WeLearn"></a><nav><a href="/herramientas/vocabulario/ingles">Vocabulario</a><a href="${basePath}">Banco</a><a href="${basePath}/explorar">Explorar todo</a><a href="${basePath}#pdfs">PDFs</a></nav></header>`
const footer = label => `<footer class="seo-footer"><span>Idiomas WeLearn · ${label}</span><a href="${basePath}/explorar">Explorar todo el banco</a></footer>`

function pageHead({ title, description, pathName, image, socialImage = image, structuredData }) {
  const canonical = `${canonicalRoot}/${pathName}`
  const imageUrl = `${canonicalRoot}/assets/seo/${socialImage}`
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
    <title>${escapeHtml(title)} | WeLearn</title><meta name="description" content="${escapeHtml(description)}"><meta name="robots" content="index,follow,max-image-preview:large">
    <link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:title" content="${escapeHtml(title)}"><meta property="og:description" content="${escapeHtml(description)}"><meta property="og:url" content="${canonical}"><meta property="og:image" content="${imageUrl}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)}"><meta name="twitter:description" content="${escapeHtml(description)}"><meta name="twitter:image" content="${imageUrl}"><link rel="stylesheet" href="${basePath}/seo-pages.css"><link rel="icon" type="image/svg+xml" href="${icon}"><script type="application/ld+json">${JSON.stringify(structuredData)}</script></head><body>`
}

function relatedLinksMarkup(item) {
  const seen = new Set()
  const links = semanticBank
    .filter(match => match.term === item.term && match.source_path && match.source_path !== item.source_path)
    .filter(match => {
      if (seen.has(match.source_path)) return false
      seen.add(match.source_path)
      return true
    })
    .slice(0, 4)
  if (!links.length) return ''
  return `<nav class="cross-links" aria-label="Rutas relacionadas con ${escapeHtml(item.term)}"><span>También en</span>${links.map(match => `<a href="${basePath}/${escapeHtml(match.source_path)}">${escapeHtml(match.topic_title || match.family_title || match.particle_title || match.source_path)}</a>`).join('')}</nav>`
}

function topicArticle(item) {
  const cross = item.is_cross_context
    ? `<button class="cross-badge" data-related-term="${escapeHtml(item.term)}">↗ ${item.context_count} contextos · ${item.sense_count} sentidos</button>`
    : ''
  return `<article id="${item.id}" class="ecosystem-term" data-search="${escapeHtml(`${item.term} ${item.meaning_es} ${item.subtopic} ${item.examples_en.join(' ')}`.toLowerCase())}">
      <div><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning_es)}</span><em class="term-meta">${escapeHtml(item.level)}</em></div>
      <div class="term-examples">${item.examples_en.map((example, index) => `<p><span>Ejemplo ${index + 1}</span>${escapeHtml(example)}</p>`).join('')}</div>${cross}${relatedLinksMarkup(item)}</article>`
}

function familyArticle(item) {
  const cross = item.is_cross_context
    ? `<button class="cross-badge" data-related-term="${escapeHtml(item.term)}">↗ ${item.context_count} contextos del banco</button>`
    : ''
  return `<article id="${item.id}" class="ecosystem-term family-term">
      <div><strong>${escapeHtml(item.term)}</strong><span>${escapeHtml(item.meaning_es)}</span><em class="term-meta">${escapeHtml(item.grammar)} · ${escapeHtml(item.level)}</em></div>
      <div class="term-examples">${item.examples_en.map((example, index) => `<p><span>Ejemplo ${index + 1}</span>${escapeHtml(example)}</p>`).join('')}</div>${cross}${relatedLinksMarkup(item)}</article>`
}

function sectionsMarkup(items, article) {
  return groupRows(items).map(({ subtopic, rows }, groupIndex) => `<section class="topic-section"><div class="topic-heading"><span>${String(groupIndex + 1).padStart(2, '0')}</span><h2>${escapeHtml(subtopic)}</h2><em>${rows.length} usos</em></div><div class="ecosystem-list">${rows.map(article).join('')}</div></section>`).join('')
}

function itemList(entry, items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: entry.title,
    description: entry.description,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${item.term}: ${item.meaning_es}`,
      url: `${canonicalRoot}/${entry.path}#${item.id}`,
    })),
  }
}

for (const topic of topicExpansions) {
  const items = ecosystem.occurrences.filter(item => item.topic === topic.slug)
  const groups = groupRows(items)
  const connections = unique(items.filter(item => item.is_cross_context).map(item => item.term)).length
  const description = `${topic.description} ${items.length} usos, dos ejemplos por uso y ejercicios interactivos.`
  const html = `${pageHead({ title: topic.title, description, pathName: topic.path, image: topic.image, structuredData: itemList(topic, items) })}${header}
    <main class="seo-main topic-page" data-topic="${topic.slug}"><div class="crumb"><a href="${basePath}">Banco</a> / ${escapeHtml(topic.short)}</div>
    <section class="seo-hero"><div><p class="eyebrow">Contexto ampliado · ${groups.length} subtemas</p><h1>${escapeHtml(topic.title)}</h1><p class="lead">${escapeHtml(topic.note)}</p><div class="cta-row"><a class="cta red" href="#lista">Ver ${items.length} usos</a><a class="cta ghost" href="#practica">Practicar 12 preguntas</a><a class="cta ghost" href="${basePath}/pdfs/${topic.path}.pdf" download>Descargar PDF · 2 ejemplos por uso</a></div></div>
    <figure><img src="${basePath}/assets/seo/${topic.image}" width="1600" height="900" alt="${escapeHtml(topic.imageAlt)}"><figcaption>Recurso visual indexable de Idiomas WeLearn.</figcaption></figure></section>
    <section class="topic-summary"><div><strong>${items.length}</strong><span>usos contextuales</span></div><div><strong>${groups.length}</strong><span>subtemas</span></div><div><strong>${connections}</strong><span>conexiones con otras rutas</span></div></section>
    <section id="lista"><div class="intro-grid"><h2>Lista por subtemas</h2><p>Las etiquetas ↗ señalan expresiones que también aparecen en otros contextos o con otro significado. Ábrelas para seguir su trazabilidad.</p></div>${sectionsMarkup(items, topicArticle)}</section>
    <section id="practica" class="topic-quiz"><div><p class="eyebrow">Motor transversal</p><h2>Practica este contexto</h2><p>Doce preguntas equilibradas entre los subtemas, con opciones plausibles y producción escrita.</p></div><div class="topic-quiz-card" data-quiz-mount></div></section>
    <section class="faq"><h2>Preguntas frecuentes</h2><details><summary>¿Cómo estudiar esta lista?</summary><p>Recorre un subtema, compara los dos ejemplos y completa el quiz. Repite después con las expresiones que conectan varias rutas.</p></details><details><summary>¿El PDF contiene la misma ruta?</summary><p>Sí. Incluye los veinte usos, dos ejemplos por uso, un repaso breve y acceso directo a la práctica web.</p></details></section>
    <dialog class="related-dialog" data-related-dialog></dialog></main>${footer('Inglés en contexto')}<script src="${basePath}/ecosystem.js" defer></script></body></html>`
  write(path.join(publicRoot, topic.path, 'index.html'), html)
}

for (const family of familyExpansions) {
  const items = ecosystem.family_occurrences.filter(item => item.family === family.slug)
  const groups = groupRows(items)
  const forms = unique(items.map(item => item.term)).length
  const connections = unique(items.filter(item => item.context_count > 0).map(item => item.term)).length
  const description = `${family.description} ${items.length} usos con dos ejemplos y práctica.`
  const html = `${pageHead({ title: family.title, description, pathName: family.path, image: family.image, socialImage: family.socialImage, structuredData: itemList(family, items) })}${header}
    <main class="seo-main topic-page family-page" data-family="${family.slug}"><div class="crumb"><a href="${basePath}">Banco</a> / Familia ${family.verb}</div>
    <section class="seo-hero"><div><p class="eyebrow">Familia verbal · ${groups.length} grupos semánticos</p><h1>${family.title}</h1><p class="lead">${escapeHtml(family.note)}</p><div class="cta-row"><a class="cta red" href="#lista">Ver ${items.length} usos</a><a class="cta ghost" href="#practica">Practicar 12 preguntas</a><a class="cta ghost" href="${basePath}/pdfs/${family.path}.pdf" download>Descargar PDF</a></div></div>
    <figure><img src="${basePath}/assets/seo/${family.image}" width="1600" height="900" alt="Mapa visual de ${family.title} de Idiomas WeLearn"><figcaption>Mapa semántico indexable · Idiomas WeLearn.</figcaption></figure></section>
    <section class="topic-summary"><div><strong>${forms}</strong><span>combinaciones distintas</span></div><div><strong>${items.length}</strong><span>significados en contexto</span></div><div><strong>${connections}</strong><span>enlaces a temas reales</span></div></section>
    <section id="lista"><div class="intro-grid"><h2>Mapa de significados</h2><p>Una combinación puede repetirse cuando activa sentidos diferentes. Las etiquetas ↗ abren los contextos cotidianos y profesionales donde ya aparece.</p></div>${sectionsMarkup(items, familyArticle)}</section>
    <section id="practica" class="topic-quiz"><div><p class="eyebrow">Motor transversal</p><h2>Practica la familia ${family.verb}</h2><p>Doce preguntas equilibradas entre grupos semánticos, con reconocimiento, contraste y producción escrita.</p></div><div class="topic-quiz-card" data-quiz-mount></div></section>
    <section class="faq"><h2>Preguntas frecuentes</h2><details><summary>¿Por qué una combinación aparece más de una vez?</summary><p>Porque el significado cambia con el contexto. Cada fila representa un sentido distinto y conserva ejemplos propios.</p></details><details><summary>¿Debo memorizar todos los sentidos a la vez?</summary><p>No. Empieza por los usos A1–B1 y añade los sentidos B2–C1 cuando ya reconozcas la combinación en frases reales.</p></details></section>
    <dialog class="related-dialog" data-related-dialog></dialog></main>${footer('Familias verbales')}<script src="${basePath}/ecosystem.js" defer></script></body></html>`
  write(path.join(publicRoot, family.path, 'index.html'), html)
}

function svgForFamily(family) {
  const groups = groupRows(ecosystem.family_occurrences.filter(item => item.family === family.slug))
  const colors = ['#d6292f', '#ef6954', '#d9a53a', '#318a85', '#5269a6']
  const cards = groups.map(({ subtopic, rows }, index) => {
    const x = 72 + (index % 3) * 500
    const y = 350 + Math.floor(index / 3) * 270
    const terms = unique(rows.map(row => row.term)).slice(0, 4)
    return `<g transform="translate(${x} ${y})"><rect width="446" height="210" rx="24" fill="#ffffff" stroke="#d8dceb" stroke-width="3"/><rect width="12" height="210" rx="6" fill="${colors[index]}"/><text x="36" y="50" font-family="Arial, sans-serif" font-size="22" font-weight="700" fill="#15235e">${escapeHtml(subtopic)}</text>${terms.map((term, termIndex) => `<text x="36" y="${92 + termIndex * 30}" font-family="Arial, sans-serif" font-size="20" fill="#3f4966">${escapeHtml(term)}</text>`).join('')}</g>`
  }).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900"><rect width="1600" height="900" fill="#f4f1ea"/><path d="M0 0h1600v22H0z" fill="#d6292f"/><text x="72" y="105" font-family="Arial, sans-serif" font-size="28" letter-spacing="4" fill="#d6292f">IDIOMAS WELEARN · MAPA SEMÁNTICO</text><text x="72" y="235" font-family="Arial, sans-serif" font-size="112" font-weight="700" fill="#15235e">${family.verb}</text><text x="470" y="217" font-family="Arial, sans-serif" font-size="34" fill="#3f4966">20 usos · 5 grupos</text>${cards}<text x="72" y="858" font-family="Arial, sans-serif" font-size="20" fill="#6b7280">Aprende la combinación completa. La partícula orienta el significado, pero el contexto lo confirma.</text></svg>`
}
for (const family of familyExpansions) write(path.join(imageRoot, family.image), svgForFamily(family))

const routeHref = pathName => `${basePath}/${pathName}`
const topicCounts = new Map(ecosystem.occurrences.map(item => [item.topic, (ecosystem.occurrences.filter(other => other.topic === item.topic)).length]))
const contexts = ecosystem.topics.map(topic => {
  const items = ecosystem.occurrences.filter(item => item.topic === topic.slug)
  const levels = unique(items.map(item => item.level)).sort()
  return [topic.short, topicCounts.get(topic.slug), levels.length > 1 ? `${levels[0]}–${levels.at(-1)}` : levels[0], routeHref(topic.path)]
})
const verbs = ecosystem.families.map(family => {
  const items = ecosystem.family_occurrences.filter(item => item.family === family.slug)
  return [family.verb, unique(items.map(item => item.term)).length, items.length, routeHref(family.path)]
})
const particles = ecosystem.particles.map(particle => {
  const items = ecosystem.particle_occurrences.filter(item => item.particle === particle.slug)
  return [particle.particle, unique(items.map(item => item.term)).length, items.length, routeHref(particle.path)]
})
const pdfs = [
  { type: 'contexto', title: 'Aeropuerto y vuelos', meta: '18 expresiones · 9 páginas', href: `${basePath}/pdfs/phrasal-verbs-aeropuerto.pdf` },
  ...ecosystem.topics.map(topic => {
    const items = ecosystem.occurrences.filter(item => item.topic === topic.slug)
    return { type: 'contexto', title: topic.short, meta: `${items.length} usos · ${unique(items.map(item => item.subtopic)).length} subtemas · 2 ejemplos por uso`, href: `${basePath}/pdfs/${topic.path}.pdf` }
  }),
  ...ecosystem.families.map(family => {
    const items = ecosystem.family_occurrences.filter(item => item.family === family.slug)
    return { type: 'verbo', title: family.title, meta: `${unique(items.map(item => item.term)).length} combinaciones · ${items.length} usos · ${items.length * 2} ejemplos`, href: `${basePath}/pdfs/${family.path}.pdf` }
  }),
  ...ecosystem.particles.map(particle => {
    const items = ecosystem.particle_occurrences.filter(item => item.particle === particle.slug)
    return { type: 'partícula', title: particle.title, meta: `${unique(items.map(item => item.term)).length} combinaciones · ${items.length} usos · ${items.length * 2} ejemplos`, href: `${basePath}/pdfs/${particle.path}.pdf` }
  }),
]

let app = read(appPath)
app = app.replace(/^const contexts=.*$/m, `const contexts=${JSON.stringify(contexts)}`)
app = app.replace(/^const verbs=.*$/m, `const verbs=${JSON.stringify(verbs)}`)
app = app.replace(/^const particles=.*$/m, `const particles=${JSON.stringify(particles)}`)
app = app.replace(/const pdfs=\[[\s\S]*?\]\n\nconst quizQuestions=/, `const pdfs=${JSON.stringify(pdfs, null, 2)}\n\nconst quizQuestions=`)
app = app.replace(/Explorar los [\d.]+ usos/g, `Explorar los ${ecosystem.summary.total_occurrences.toLocaleString('es-CO')} usos`)
app = app.replace(/<strong>\d+<\/strong><span>expresiones únicas<\/span>/g, `<strong>${ecosystem.summary.unique_terms_all}</strong><span>expresiones únicas</span>`)
app = app.replace(/<strong>\d+<\/strong><span>significados y usos<\/span>/g, `<strong>${ecosystem.summary.total_occurrences}</strong><span>significados y usos</span>`)
app = app.replace(/<strong>\d+<\/strong><span>rutas amplias<\/span>/g, `<strong>${ecosystem.summary.learning_routes}</strong><span>rutas amplias</span>`)
app = app.replace(/<strong>[\d.]+<\/strong><span>ejemplos contextualizados<\/span>/g, `<strong>${ecosystem.summary.examples_total}</strong><span>ejemplos contextualizados</span>`)
app = app.replace(/\d+ recursos reales: \d+ rutas temáticas, \d+ familias verbales, \d+ partículas y aeropuerto\./g, `${pdfs.length} recursos reales: ${ecosystem.topics.length} rutas temáticas, ${ecosystem.families.length} familias verbales, ${ecosystem.particles.length} partículas y aeropuerto.`)
write(appPath, app)

let root = read(path.join(publicRoot, 'index.html'))
root = root.replace(/\d+ expresiones, \d+ usos, [\d.]+ ejemplos/, `${ecosystem.summary.unique_terms_all} expresiones, ${ecosystem.summary.total_occurrences} usos, ${ecosystem.summary.examples_total.toLocaleString('es-CO')} ejemplos`)
root = root.replace(/"numberOfItems":\d+/, `"numberOfItems":${ecosystem.summary.total_occurrences}`)
write(path.join(publicRoot, 'index.html'), root)

let explorer = read(path.join(publicRoot, 'explorar', 'index.html'))
explorer = explorer.replace(/"numberOfItems": \d+/, `"numberOfItems": ${ecosystem.summary.total_occurrences}`)
explorer = explorer.replace(/Buscar en \d+ usos/, `Buscar en ${ecosystem.summary.total_occurrences} usos`)
explorer = explorer.replace(/<strong>\d+<\/strong><span>expresiones únicas<\/span>/, `<strong>${ecosystem.summary.unique_terms_all}</strong><span>expresiones únicas</span>`)
explorer = explorer.replace(/<strong>\d+<\/strong><span>significados y usos<\/span>/, `<strong>${ecosystem.summary.total_occurrences}</strong><span>significados y usos</span>`)
explorer = explorer.replace(/<strong>\d+<\/strong><span>rutas de aprendizaje<\/span>/, `<strong>${ecosystem.summary.learning_routes}</strong><span>rutas de aprendizaje</span>`)

const explorerCard = ({ path: pathName, image, title, label, meta, description, className = '' }) => `<a class="explore-topic-card${className ? ` ${className}` : ''}" href="${routeHref(pathName)}"><img src="${basePath}/assets/seo/${image}" width="1600" height="900" alt="${escapeHtml(title)}"><div><strong>${escapeHtml(label)}</strong><span>${escapeHtml(meta)} · PDF</span><p>${escapeHtml(description)}</p></div></a>`
const familyCards = ecosystem.families.map(family => {
  const items = ecosystem.family_occurrences.filter(item => item.family === family.slug)
  return explorerCard({ path: family.path, image: family.image, title: family.title, label: family.verb, meta: `${items.length} usos · ${unique(items.map(item => item.term)).length} combinaciones`, description: family.description, className: 'family-card' })
}).join('')
const particleCards = ecosystem.particles.map(particle => {
  const items = ecosystem.particle_occurrences.filter(item => item.particle === particle.slug)
  return explorerCard({ path: particle.path, image: particle.image, title: particle.title, label: particle.particle, meta: `${items.length} usos · ${unique(items.map(item => item.term)).length} combinaciones`, description: particle.description, className: 'particle-card' })
}).join('')
const topicCards = ecosystem.topics.map(topic => {
  const items = ecosystem.occurrences.filter(item => item.topic === topic.slug)
  return explorerCard({ path: topic.path, image: topic.image, title: topic.title, label: topic.short, meta: `${items.length} usos · ${unique(items.map(item => item.subtopic)).length} subtemas`, description: topic.description })
}).join('')
const replaceExplorerSection = (source, label, nextLabel, content) => {
  const startMarker = `<section><div class="section-head"><div><span class="section-index">${label}</span>`
  const start = source.indexOf(startMarker)
  if (start < 0) throw new Error(`No se encontró la sección ${label} en explorar/index.html`)
  const end = nextLabel
    ? source.indexOf(`<section><div class="section-head"><div><span class="section-index">${nextLabel}</span>`, start)
    : source.indexOf('<section class="search-output"', start)
  if (end < 0) throw new Error(`No se encontró el cierre de ${label} en explorar/index.html`)
  return `${source.slice(0, start)}${content}\n    ${source.slice(end)}`
}
explorer = replaceExplorerSection(explorer, 'FAMILIAS VERBALES', 'PARTÍCULAS', `<section><div class="section-head"><div><span class="section-index">FAMILIAS VERBALES</span><h2>${ecosystem.families.length} verbos, ${ecosystem.family_occurrences.length} usos</h2></div></div><div class="explore-topic-grid">${familyCards}</div></section>`)
explorer = replaceExplorerSection(explorer, 'PARTÍCULAS', 'TEMAS Y PROFESIONES', `<section><div class="section-head"><div><span class="section-index">PARTÍCULAS</span><h2>${ecosystem.particles.length} lentes para reconocer patrones</h2></div></div><div class="explore-topic-grid">${particleCards}</div></section>`)
explorer = replaceExplorerSection(explorer, 'TEMAS Y PROFESIONES', null, `<section><div class="section-head"><div><span class="section-index">TEMAS Y PROFESIONES</span><h2>${ecosystem.topics.length} rutas amplias</h2></div></div><div class="explore-topic-grid">${topicCards}</div></section>`)
write(path.join(publicRoot, 'explorar', 'index.html'), explorer)

const sitemapRoutes = [
  { path: '', title: 'Banco de phrasal verbs en inglés', image: 'phrasal-verbs-esenciales-welearn.png' },
  { path: 'explorar', title: 'Explorar todos los phrasal verbs', image: 'phrasal-verbs-esenciales-welearn.png' },
  { path: 'phrasal-verbs-esenciales', title: 'Phrasal verbs esenciales', image: 'phrasal-verbs-esenciales-welearn.png' },
  ...ecosystem.topics.map(topic => ({ path: topic.path, title: topic.title, image: topic.image })),
  ...ecosystem.families.map(family => ({ path: family.path, title: family.title, image: family.social_image || family.image })),
  ...ecosystem.particles.map(particle => ({ path: particle.path, title: particle.title, image: particle.image })),
]
const updatedPaths = new Set(['', 'explorar', ...topicExpansions.map(entry => entry.path), ...familyExpansions.map(entry => entry.path)])
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${sitemapRoutes.map(routeEntry => `  <url><loc>${canonicalRoot}${routeEntry.path ? `/${routeEntry.path}` : ''}</loc>${updatedPaths.has(routeEntry.path) ? '<lastmod>2026-09-29</lastmod>' : ''}<image:image><image:loc>${canonicalRoot}/assets/seo/${routeEntry.image}</image:loc></image:image></url>`).join('\n')}\n</urlset>\n`
write(path.join(publicRoot, 'sitemap.xml'), sitemap)

console.log(JSON.stringify({ summary: ecosystem.summary, newRoutes: topicExpansions.length + familyExpansions.length, pdfResources: pdfs.length }, null, 2))
