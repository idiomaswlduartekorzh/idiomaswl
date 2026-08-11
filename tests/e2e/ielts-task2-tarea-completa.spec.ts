import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { TASK2_PROMPT_BANK, BANK_BY_FAMILY } from '../../src/app/(site)/practica/ielts/academic/writing/task2/tarea-completa/task2-prompt-bank'

/**
 * Tarea Completa en navegador.
 *
 * Lo que se defiende aquí no se puede medir en Node: que el reloj corra de verdad, que el
 * área de escritura no lleve corrector, y que **ningún paso quede bloqueado sin salida**.
 * Los dos atascos que había eran de ese tipo: el botón de terminar no existía por debajo de
 * 200 palabras —ausente, no deshabilitado— y para pasar de la revisión había que marcar las
 * ocho casillas de un checklist que pedía honestidad.
 *
 *   npm run dev:safe                                                    # en otra terminal
 *   npx playwright test tests/e2e/ielts-task2-tarea-completa.spec.ts
 */

const RUTA = '/practica/ielts/academic/writing/task2/tarea-completa'

async function elegir(page: Page, titulo: string) {
  await page.goto(RUTA)
  await page.getByRole('button', { name: new RegExp(titulo) }).first().click()
  await expect(page.getByRole('button', { name: /Start writing/ })).toBeVisible()
}

async function escribir(page: Page, titulo: string, palabras: number) {
  await elegir(page, titulo)
  await page.getByRole('button', { name: /Start writing/ }).click()
  const area = page.getByLabel('Your complete essay')
  await expect(area).toBeVisible()
  if (palabras > 0) await area.fill(Array.from({ length: palabras }, (_, i) => `word${i}`).join(' '))
  return area
}

test.describe('Tarea Completa', () => {
  test('las cinco familias están, con sus cinco enunciados y su modelo', async ({ page }) => {
    await page.goto(RUTA)
    expect(TASK2_PROMPT_BANK.length, 'el banco debe cubrir 5 familias × 5').toBe(25)

    for (const familia of BANK_BY_FAMILY) {
      await page.getByRole('tab', { name: `${familia.label} (${familia.prompts.length})`, exact: true }).click()
      for (const item of familia.prompts) {
        await expect(page.getByText(item.prompt, { exact: false })).toBeVisible()
      }
      // Y cada ficha anuncia el tamaño de su modelo: nunca por debajo del mínimo de la tarea.
      for (const item of familia.prompts) {
        expect(item.modelWords, `${item.title} tiene un modelo de ${item.modelWords} palabras`).toBeGreaterThanOrEqual(250)
      }
    }
  })

  test('el área de escritura no lleva corrector, ni el plan tampoco', async ({ page }) => {
    await elegir(page, 'Museum funding')
    for (const area of await page.locator('textarea').all()) {
      await expect(area).toHaveAttribute('spellcheck', 'false')
    }
    await page.getByRole('button', { name: /Start writing/ }).click()
    await expect(page.getByLabel('Your complete essay')).toHaveAttribute('spellcheck', 'false')
  })

  test('el reloj arranca, se pausa y se reanuda', async ({ page }) => {
    await escribir(page, 'Museum funding', 0)
    const reloj = page.locator('text=/^[0-9]{2}:[0-9]{2}$/').first()
    const inicial = await reloj.textContent()

    await expect.poll(async () => await reloj.textContent(), { timeout: 5000 }).not.toBe(inicial)

    await page.getByRole('button', { name: 'Pause', exact: true }).click()
    const pausado = await reloj.textContent()
    await page.waitForTimeout(1800)
    expect(await reloj.textContent(), 'en pausa el reloj no puede seguir bajando').toBe(pausado)

    await page.getByRole('button', { name: 'Resume', exact: true }).click()
    await expect.poll(async () => await reloj.textContent(), { timeout: 5000 }).not.toBe(pausado)
  })

  test('se puede terminar por debajo del mínimo, y se dice qué se pierde', async ({ page }) => {
    await escribir(page, 'Museum funding', 12)

    // El botón EXISTE con 12 palabras. Antes desaparecía por debajo de 200 sin explicación.
    const terminar = page.getByRole('button', { name: /Finish anyway — 12 words/ })
    await expect(terminar).toBeVisible()
    await expect(terminar).toBeEnabled()
    await expect(page.getByText('Task 2 asks for at least 250 words', { exact: false })).toBeVisible()
    await expect(page.getByText('238 to reach the minimum', { exact: false })).toBeVisible()

    await terminar.click()
    await expect(page.getByRole('heading', { name: /What to look for before you open the model/ })).toBeVisible()
  })

  test('la revisión no obliga a marcar nada para avanzar', async ({ page }) => {
    await escribir(page, 'Museum funding', 260)
    await page.getByRole('button', { name: /Finish and review/ }).click()

    const abrir = page.getByRole('button', { name: /Open the model answer/ })
    await expect(abrir).toBeEnabled()
    await expect(page.getByText('0 of 7 ticked')).toBeVisible()

    await abrir.click()
    await expect(page.getByRole('heading', { name: /Model answer/ })).toBeVisible()
  })

  test('la auto-rúbrica dice que es tuya, no una nota del ensayo', async ({ page }) => {
    await escribir(page, 'Museum funding', 260)
    await page.getByRole('button', { name: /Finish and review/ }).click()

    await expect(page.getByText('this page never reads your essay', { exact: false })).toBeVisible()
    for (const criterio of ['Task Response', 'Coherence and Cohesion', 'Lexical Resource', 'Grammatical Range and Accuracy']) {
      await page.getByRole('button', { name: `${criterio}: 7` }).click()
    }
    await expect(page.getByText('Average of your four estimates: 7.0', { exact: false })).toBeVisible()
    await expect(page.getByText('this is your number, not a mark', { exact: false })).toBeVisible()
  })

  test('el modelo enseña los cuatro párrafos, su función, y el texto propio al lado', async ({ page }) => {
    const item = TASK2_PROMPT_BANK.find((x) => x.title === 'Museum funding')!
    await escribir(page, 'Museum funding', 0)
    await page.getByLabel('Your complete essay').fill('This is my own attempt at the essay.')
    await page.getByRole('button', { name: /Finish anyway/ }).click()
    await page.getByRole('button', { name: /Open the model answer/ }).click()

    for (const paragraph of item.model) {
      await expect(page.getByText(paragraph.text.slice(0, 70), { exact: false })).toBeVisible()
      await expect(page.getByText(paragraph.job.slice(0, 45), { exact: false })).toBeVisible()
    }
    await expect(page.getByText('This is my own attempt at the essay.')).toBeVisible()
    await expect(page.getByText('Your essay · 8 words', { exact: false })).toBeVisible()
  })


  test('el plan sigue a la vista mientras se escribe', async ({ page }) => {
    await elegir(page, 'Museum funding')
    const cajas = await page.locator('textarea').all()
    await cajas[0].fill('I largely agree with free entry')
    await cajas[1].fill('Body 1 argues about access by income')
    await page.getByRole('button', { name: /Start writing/ }).click()

    // Lo escrito en la planificación tiene que seguir leyéndose con el reloj corriendo.
    await expect(page.getByText('Your plan', { exact: true })).toBeVisible()
    await expect(page.getByText('I largely agree with free entry', { exact: false })).toBeVisible()
    await expect(page.getByText('Body 1 argues about access by income', { exact: false })).toBeVisible()
  })


  test('escribir no pierde el cursor ni pega saltos de vista', async ({ page }) => {
    /**
     * `Shell` y `PromptCard` estaban definidos DENTRO del componente. Eso crea un tipo nuevo
     * en cada render, así que React desmontaba y remontaba la página entera en cada tecla: el
     * foco se perdía y la vista saltaba. David: «al escribir hay un scroll raro».
     */
    await escribir(page, 'Museum funding', 0)
    const area = page.getByLabel('Your complete essay')
    await area.click()
    await page.keyboard.type('Globalisation has changed how people work.')

    await expect(area).toBeFocused()
    await expect(area).toHaveValue('Globalisation has changed how people work.')
    await expect(page.getByText('6 words · 244 to reach the minimum')).toBeVisible()
  })

  test('en móvil se recorre entero y la consola queda limpia', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
    page.on('pageerror', (e) => errores.push(String(e)))

    await page.setViewportSize({ width: 375, height: 812 })
    await escribir(page, 'Living abroad', 260)
    await page.getByRole('button', { name: /Finish and review/ }).click()
    await page.getByRole('button', { name: /Open the model answer/ }).click()
    await expect(page.getByRole('heading', { name: /Model answer/ })).toBeVisible()

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})
