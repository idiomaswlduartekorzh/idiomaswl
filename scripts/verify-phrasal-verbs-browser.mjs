#!/usr/bin/env node

import { chromium } from '@playwright/test'

const base = process.env.PHRASAL_VERBS_TEST_URL || 'http://127.0.0.1:3128/herramientas/vocabulario/ingles/phrasal-verbs'
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const consoleErrors = []
const pageErrors = []
const badResponses = []

page.on('console', message => {
  if (message.type() === 'error') consoleErrors.push(`${message.text()} @ ${message.location().url || 'inline'}`)
})
page.on('pageerror', error => pageErrors.push(error.message))
page.on('response', response => {
  if (response.status() >= 400) badResponses.push(`${response.status()} ${response.url()}`)
})

const checks = []
const expansionRoutes = [
  ['phrasal-verbs-comunicacion-redes-sociales', 'Phrasal verbs para comunicación y redes sociales'],
  ['phrasal-verbs-transporte-conduccion', 'Phrasal verbs para transporte y conducción'],
  ['phrasal-verbs-familia-crianza', 'Phrasal verbs para familia y crianza'],
  ['phrasal-verbs-vivienda-arriendo', 'Phrasal verbs para vivienda, arriendo y alquiler'],
  ['phrasal-verbs-con-turn', 'Phrasal verbs con TURN'],
  ['phrasal-verbs-con-come', 'Phrasal verbs con COME'],
  ['phrasal-verbs-con-bring', 'Phrasal verbs con BRING'],
  ['phrasal-verbs-con-give', 'Phrasal verbs con GIVE'],
]
const check = (condition, label, detail = '') => {
  checks.push({ label, ok: Boolean(condition), detail })
  if (!condition) throw new Error(`${label}${detail ? `: ${detail}` : ''}`)
}
const visit = async url => {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.locator('body').waitFor({ state: 'visible' })
}

try {
  await visit(base)
  check((await page.locator('body').innerText()).length > 500, 'Hub con contenido')
  check(await page.getByText('Comunicación y redes sociales', { exact: true }).count() > 0, 'Nueva categoría visible en el hub')
  check(await page.getByText('Phrasal verbs con TURN', { exact: true }).count() > 0, 'Nueva familia visible en el hub')
  check(await page.locator('[data-nextjs-dialog]').count() === 0, 'Sin overlay de Next.js')
  await page.screenshot({ path: '/private/tmp/phrasal-verbs-expansion-hub.png', fullPage: true })

  for (const [slug, title] of expansionRoutes) {
    await visit(`${base}/${slug}`)
    await page.locator('.ecosystem-term').first().waitFor({ state: 'visible' })
    await page.locator('.topic-quiz-options button').first().waitFor({ state: 'visible' })
    check(await page.locator('h1').innerText() === title, `${slug}: título correcto`)
    check(await page.locator('.ecosystem-term').count() === 20, `${slug}: 20 usos`)
    check(await page.locator('.term-examples p').count() === 40, `${slug}: 40 ejemplos`)
    check(await page.locator('.topic-quiz-options button').count() === 4, `${slug}: quiz con cuatro opciones`)
    check(await page.locator('.cross-links a').count() > 0, `${slug}: enlaces internos rastreables`)
    const routeImage = page.locator('.seo-hero img')
    await routeImage.evaluate(image => image.complete ? undefined : new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('La imagen no terminó de cargar en 15 segundos.')), 15_000)
      image.addEventListener('load', () => { clearTimeout(timer); resolve() }, { once: true })
      image.addEventListener('error', () => { clearTimeout(timer); reject(new Error('La imagen respondió con error.')) }, { once: true })
    }))
    check(await routeImage.evaluate(image => image.complete && image.naturalWidth > 0), `${slug}: imagen principal cargada`)
    const pdfResponse = await page.request.get(`${base}/pdfs/${slug}.pdf`)
    check(pdfResponse.ok(), `${slug}: PDF responde 200`, String(pdfResponse.status()))
    check((pdfResponse.headers()['content-type'] || '').includes('application/pdf'), `${slug}: PDF conserva content-type`)
    check((await pdfResponse.body()).length > 5000, `${slug}: PDF tiene contenido útil`)
  }

  await visit(`${base}/phrasal-verbs-comunicacion-redes-sociales`)
  await page.locator('.topic-quiz-options button').first().waitFor({ state: 'visible' })
  check(await page.locator('h1').innerText() === 'Phrasal verbs para comunicación y redes sociales', 'Título de contexto correcto')
  check(await page.locator('.ecosystem-term').count() === 20, 'Contexto con 20 usos')
  check(await page.locator('.term-examples p').count() === 40, 'Contexto con 40 ejemplos')
  check(await page.locator('.topic-quiz-options button').count() === 4, 'Quiz cargado con cuatro opciones')
  check(await page.locator('.cross-badge').count() > 0, 'Trazabilidad visible')
  await page.locator('.cross-badge').first().click()
  check(await page.locator('dialog[open] .related-list a').count() > 1, 'Diálogo conecta múltiples rutas')
  await page.locator('[data-close-dialog]').click()
  await page.locator('.topic-quiz-options button').first().click()
  check(await page.locator('[data-quiz-feedback]').innerText().then(text => text.length > 10), 'Quiz entrega retroalimentación')
  await page.screenshot({ path: '/private/tmp/phrasal-verbs-comunicacion.png', fullPage: true })

  await visit(`${base}/phrasal-verbs-con-turn`)
  await page.locator('.topic-quiz-options button').first().waitFor({ state: 'visible' })
  check(await page.locator('h1').innerText() === 'Phrasal verbs con TURN', 'Título de familia correcto')
  check(await page.locator('.ecosystem-term').count() === 20, 'Familia con 20 sentidos')
  check(await page.locator('.term-examples p').count() === 40, 'Familia con 40 ejemplos')
  check(await page.locator('.topic-quiz-options button').count() === 4, 'Quiz de familia cargado')
  const familyImage = page.locator('.seo-hero img')
  check(await familyImage.evaluate(image => image.complete && image.naturalWidth > 0), 'Mapa semántico cargado')

  await page.setViewportSize({ width: 390, height: 844 })
  await visit(`${base}/phrasal-verbs-comunicacion-redes-sociales`)
  await page.locator('.ecosystem-term').first().waitFor({ state: 'visible' })
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
  check(mobileOverflow <= 1, 'Ruta adaptable sin desbordamiento horizontal', String(mobileOverflow))
  await page.screenshot({ path: '/private/tmp/phrasal-verbs-comunicacion-mobile.png', fullPage: true })
  await page.setViewportSize({ width: 1440, height: 1000 })

  const ecosystemResponse = page.waitForResponse(response => response.url().endsWith('/data/ecosystem.json') && response.ok())
  await visit(`${base}/explorar`)
  await ecosystemResponse
  await page.locator('.explore-topic-card').first().waitFor({ state: 'visible' })
  check(await page.locator('.explore-topic-card.family-card').count() === 10, 'Explorador con 10 familias')
  check(await page.locator('.explore-topic-card.particle-card').count() === 6, 'Explorador con 6 partículas')
  check(await page.locator('.explore-topic-card:not(.family-card):not(.particle-card)').count() === 32, 'Explorador con 32 contextos')
  await page.locator('#ecosystem-search').fill('turn off')
  await page.waitForFunction(() => document.querySelectorAll('[data-search-list] .ecosystem-term').length >= 2)
  check(await page.locator('[data-search-list] .ecosystem-term').count() >= 2, 'Buscador recupera sentidos múltiples')

  check(consoleErrors.length === 0, 'Sin errores de consola', consoleErrors.join(' | '))
  check(pageErrors.length === 0, 'Sin errores de página', pageErrors.join(' | '))
  check(badResponses.length === 0, 'Sin recursos HTTP fallidos', badResponses.join(' | '))
  console.log(JSON.stringify({ ok: true, checks, screenshots: ['/private/tmp/phrasal-verbs-expansion-hub.png', '/private/tmp/phrasal-verbs-comunicacion.png', '/private/tmp/phrasal-verbs-comunicacion-mobile.png'] }, null, 2))
} finally {
  await browser.close()
}
