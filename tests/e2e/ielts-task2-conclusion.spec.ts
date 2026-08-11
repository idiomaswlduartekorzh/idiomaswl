import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { drillsFor } from '../../src/app/(site)/practica/ielts/academic/writing/task2/conclusion/conclusion-drills'

/**
 * El taller de conclusión en navegador.
 *
 * Lo que se defiende: que el ensayo esté DELANTE antes de pedir que se cierre. El defecto
 * era que el paso 2 decía «write a complete conclusion» sin haber mostrado la introducción,
 * el Body 1 ni el Body 2 — «¿cómo voy a colocar algo que yo no he visto?». Un test que solo
 * comprobase que la página carga no vería nada de esto.
 *
 *   npm run dev:safe                                              # en otra terminal
 *   npx playwright test tests/e2e/ielts-task2-conclusion.spec.ts
 */

const RUTA = '/practica/ielts/academic/writing/task2/conclusion'
/**
 * La raíz del taller.
 *
 * El primer intento fue `page.locator('div').filter({ has: heading }).last()`, y falló los
 * siete tests: `.last()` de los divs que CONTIENEN el título devuelve el más interno, que es
 * el `<div><span/><h3/></div>` de la cabecera. Ahí no hay ninguna opción, así que todo
 * esperaba a un botón que nunca iba a aparecer. Los módulos CSS conservan el nombre original
 * como sufijo —`page-module__x86vhW__guidedWorkshop`— y solo hay uno en la página.
 */
const taller = (page: Page) => page.locator('[class*="guidedWorkshop"]')

async function abrir(page: Page) {
  await page.goto(RUTA)
  await expect(page.getByRole('heading', { name: 'Read the essay, then close it' })).toBeVisible()
}

/** Resuelve el paso indicado eligiendo su opción correcta. */
async function resolver(page: Page, drill: ReturnType<typeof drillsFor>[number], paso: number) {
  const step = drill.steps[paso]
  await taller(page).getByRole('button', { name: new RegExp(escape(step.options[step.correct].text.slice(0, 45))) }).first().click()
  await taller(page).getByRole('button', { name: 'Check this choice' }).nth(paso).click()
}

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

test.describe('Taller de conclusión', () => {
  test('el ensayo entero se lee ANTES de pedir nada', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]

    for (const nombre of ['Introduction', 'Body 1', 'Body 2']) {
      await expect(taller(page).getByRole('heading', { name: nombre, exact: true })).toBeVisible()
    }
    // Y es el ensayo de ESTE enunciado, no un texto de relleno.
    for (const parte of [drill.introduction, drill.bodyOne, drill.bodyTwo]) {
      await expect(taller(page).getByText(parte[0].text.slice(0, 55), { exact: false })).toBeVisible()
    }
  })

  test('la tesis se subraya al acertar el restatement, no antes', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]
    const tesis = drill.introduction.find((s) => s.highlight)!

    await expect(page.locator('mark, [class*="essayHighlight"]')).toHaveCount(0)
    await resolver(page, drill, 0)
    await expect(taller(page).getByText('That closes this essay.')).toBeVisible()

    const marcado = page.locator('[class*="essayHighlight"]')
    await expect(marcado.first()).toBeVisible()
    await expect(marcado.first()).toHaveText(tesis.text)
    await expect(page.getByText('Your restatement has to say this again', { exact: false })).toBeVisible()
  })

  test('acertar la síntesis subraya además los dos cierres parciales', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]
    await resolver(page, drill, 0)
    await resolver(page, drill, 1)

    // Tesis + último de Body 1 + último de Body 2 = tres.
    await expect(page.locator('[class*="essayHighlight"]')).toHaveCount(3)
    await expect(page.getByText('the last sentence of each body paragraph', { exact: false })).toBeVisible()
  })

  test('fallar en dos opciones distintas da dos explicaciones distintas, y nombran el ensayo ajeno', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]
    const malas = drill.steps[0].options.filter((_, i) => i !== drill.steps[0].correct)
    const mensajes: string[] = []

    for (const mala of malas.slice(0, 2)) {
      await page.reload()
      await taller(page).getByRole('button', { name: new RegExp(escape(mala.text.slice(0, 45))) }).first().click()
      await taller(page).getByRole('button', { name: 'Check this choice' }).first().click()
      await expect(taller(page).getByText('That closes a different essay.')).toBeVisible()
      mensajes.push((await taller(page).getByText(mala.why.slice(0, 40), { exact: false }).first().textContent()) ?? '')
    }
    expect(new Set(mensajes).size).toBe(2)
  })

  test('el paso 3 no se abre hasta haber resuelto los dos anteriores, y anuncia el mínimo', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]

    await expect(taller(page).getByText('Now write it in your own words')).toBeVisible()
    await expect(taller(page).getByRole('button', { name: 'Show me the model conclusion' })).toHaveCount(0)

    await resolver(page, drill, 0)
    await resolver(page, drill, 1)

    const boton = taller(page).getByRole('button', { name: 'Show me the model conclusion' })
    await expect(boton).toBeVisible()
    await expect(boton).toBeDisabled()
    await expect(taller(page).getByText('At least 8 words · 8 to go').first()).toBeVisible()
    await expect(taller(page).getByText('Write at least 8 words in both boxes')).toBeVisible()

    const cajas = taller(page).locator('textarea')
    await expect(cajas).toHaveCount(2)
    for (const caja of await cajas.all()) {
      await expect(caja).toHaveAttribute('spellcheck', 'false')
      await caja.fill('one two three four five six seven eight')
    }
    await expect(boton).toBeEnabled()

    await boton.click()
    await expect(taller(page).getByText('this page cannot read your text', { exact: false })).toBeVisible()
    await expect(taller(page).getByText(drill.blocks[0].text.slice(0, 45), { exact: false }).first()).toBeVisible()
  })


  test('equivocarse no deja atascado: se puede volver a elegir', async ({ page }) => {
    await abrir(page)
    const drill = drillsFor('opinion')[1]
    const step = drill.steps[0]
    const mala = step.options.findIndex((_, i) => i !== step.correct)

    await taller(page).getByRole('button', { name: new RegExp(escape(step.options[mala].text.slice(0, 45))) }).first().click()
    await taller(page).getByRole('button', { name: 'Check this choice' }).first().click()
    await expect(taller(page).getByText('That closes a different essay.')).toBeVisible()
    await expect(taller(page).getByText('Pick another one', { exact: false })).toBeVisible()

    // Sin refrescar ni reiniciar: la rejilla sigue viva y se puede acertar.
    await resolver(page, drill, 0)
    await expect(taller(page).getByText('That closes this essay.')).toBeVisible()
  })

  test('las cinco familias tienen su ensayo y sus dos pasos', async ({ page }) => {
    await abrir(page)
    for (const familia of ['Opinion', 'Discussion', 'Problem–Solution', 'Advantages–Disadvantages', 'Direct Questions']) {
      await page.getByRole('tab', { name: familia, exact: true }).click()
      await expect(taller(page).getByRole('heading', { name: 'Body 2', exact: true })).toBeVisible()
      await expect(taller(page).getByRole('button', { name: 'Check this choice' })).toHaveCount(1)
    }
  })

  test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
    page.on('pageerror', (e) => errores.push(String(e)))

    await page.setViewportSize({ width: 375, height: 812 })
    await abrir(page)
    const drill = drillsFor('opinion')[1]
    await resolver(page, drill, 0)
    await resolver(page, drill, 1)
    await expect(page.locator('[class*="essayHighlight"]')).toHaveCount(3)

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})
