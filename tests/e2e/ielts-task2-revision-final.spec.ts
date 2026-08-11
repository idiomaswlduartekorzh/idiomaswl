import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { REVIEW_LESSONS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/revision-final/review-data'

/**
 * Revisión final en navegador.
 *
 * Lo que se defiende: que haya un TEXTO COMPLETO que leer antes de juzgar el borrador. Sin
 * él, seis de los veinticinco casos eran indetectables — el fallo de «Task Response» es una
 * ausencia, y una ausencia no se ve en un fragmento de dos frases. Se acertaba emparejando
 * la etiqueta con la descripción del problema.
 *
 *   npm run dev:safe                                                  # en otra terminal
 *   npx playwright test tests/e2e/ielts-task2-revision-final.spec.ts
 */

const RUTA = '/practica/ielts/academic/writing/task2/revision-final'
const taller = (page: Page) => page.locator('[class*="guidedWorkshop"]')
const escape = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

async function abrir(page: Page) {
  await page.goto(RUTA)
  await expect(page.getByRole('heading', { name: 'Read the finished essay, then find what the draft lost' })).toBeVisible()
}

test.describe('Revisión final', () => {
  test('el ensayo completo va delante del borrador', async ({ page }) => {
    await abrir(page)
    const caso = REVIEW_LESSONS[0].cases[1]

    expect(caso.model.length, 'cada caso necesita los cuatro párrafos').toBe(4)
    for (const parrafo of caso.model) {
      await expect(taller(page).getByText(parrafo.text.slice(0, 60), { exact: false })).toBeVisible()
      await expect(taller(page).getByText(parrafo.label, { exact: true })).toBeVisible()
    }
    // Y el borrador defectuoso está, y no es lo mismo que el modelo.
    await expect(taller(page).getByText(caso.draft.slice(0, 50), { exact: false })).toBeVisible()
  })

  test('el ejemplo resuelto también enseña su borrador, no solo la descripción', async ({ page }) => {
    await page.goto(RUTA)
    const worked = REVIEW_LESSONS[0].cases[0]
    await expect(page.getByText(worked.draft.slice(0, 50), { exact: false })).toBeVisible()
    await expect(page.getByText(worked.issue.slice(0, 45), { exact: false })).toBeVisible()
  })

  test('fallar en dos controles distintos da dos explicaciones distintas', async ({ page }) => {
    await abrir(page)
    const caso = REVIEW_LESSONS[0].cases[1]
    /**
     * Los distractores se leen de la REJILLA, no de la lista completa de controles.
     *
     * `pickDistractors` mete tres de los cuatro controles equivocados y rota cuál queda
     * fuera, así que tomar «los dos primeros de la lista» acertaba uno y fallaba el otro:
     * el test daba 1 de 2 y parecía un fallo del producto cuando era mío.
     */
    const enPantalla = (await taller(page).locator('[class*="optionGrid"] button').allInnerTexts())
      .map((t) => t.replace(/^[A-D]\s*/, '').trim())
    const malos = enPantalla.filter((label) => label !== caso.category)
    expect(malos.length, 'la rejilla debe traer tres controles equivocados').toBe(3)
    const mensajes: string[] = []

    for (const malo of malos.slice(0, 2)) {
      const opcion = taller(page).getByRole('button', { name: new RegExp(escape(malo)) })
      await opcion.first().click()
      await taller(page).getByRole('button', { name: 'Check the diagnosis' }).click()
      await expect(taller(page).getByText('Something else breaks before that.')).toBeVisible()
      mensajes.push((await taller(page).getByText('That check asks:', { exact: false }).textContent()) ?? '')
    }
    expect(mensajes.length, 'deberían caber al menos dos controles equivocados en la rejilla').toBeGreaterThanOrEqual(2)
    expect(new Set(mensajes).size).toBe(mensajes.length)
  })

  test('acertar abre la revisión, y avisa de que no es una nota', async ({ page }) => {
    await abrir(page)
    const caso = REVIEW_LESSONS[0].cases[1]

    await expect(taller(page).getByText('Choose one of the checks to see whether it is the one.')).toBeVisible()
    await taller(page).getByRole('button', { name: new RegExp(escape(caso.category)) }).click()
    await taller(page).getByRole('button', { name: 'Check the diagnosis' }).click()
    await expect(taller(page).getByText('That is what breaks first.')).toBeVisible()

    await taller(page).getByRole('button', { name: 'Reveal the targeted revision' }).click()
    await expect(taller(page).getByText(caso.revision.slice(0, 45), { exact: false })).toBeVisible()
    await expect(taller(page).getByText('It is not a band score', { exact: false })).toBeVisible()
  })

  test('ni una sola vez aparece la palabra «layer» en pantalla', async ({ page }) => {
    await page.goto(RUTA)
    const texto = (await page.locator('body').innerText()).toLowerCase()
    expect(texto.includes('layer'), 'quedó jerga interna a la vista').toBe(false)
  })

  test('las cinco familias tienen su ensayo completo', async ({ page }) => {
    await abrir(page)
    for (const familia of REVIEW_LESSONS) {
      await page.getByRole('tab', { name: familia.shortLabel, exact: true }).click()
      await expect(taller(page).getByText('A complete answer to this prompt')).toBeVisible()
      await expect(taller(page).getByText(familia.cases[1].model[1].text.slice(0, 55), { exact: false })).toBeVisible()
    }
  })

  test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
    page.on('pageerror', (e) => errores.push(String(e)))

    await page.setViewportSize({ width: 375, height: 812 })
    await abrir(page)
    const caso = REVIEW_LESSONS[0].cases[1]
    await taller(page).getByRole('button', { name: new RegExp(escape(caso.category)) }).click()
    await taller(page).getByRole('button', { name: 'Check the diagnosis' }).click()
    await expect(taller(page).getByText('That is what breaks first.')).toBeVisible()

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})
