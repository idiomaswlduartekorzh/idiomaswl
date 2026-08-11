import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { BODY_ONE_LESSONS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/body-1/body-one-data'
import { BODY_TWO_LESSONS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/body-2/body-two-data'

/**
 * Introducción, Body 1 y Body 2: auditoría de Usuario en navegador.
 *
 * Código y pedagogía ya estaban cerradas. Quedaba lo que solo se ve usándolas, y era lo
 * mismo en las tres: **los mínimos no se anunciaban**. El botón de comparar se apagaba por
 * debajo de 8, 10 o 6 palabras según la caja y nada lo explicaba.
 *
 * El corrector ortográfico NO se comprueba aquí, aunque también fallaba en doce áreas. Se
 * comprueba en `scripts/check-ielts-task2-alignment.mjs`, sobre el fuente: la mitad de esas
 * áreas viven detrás de un paso bloqueado, así que un test de navegador solo vería las que
 * consiguiera desbloquear, y el guardián las ve todas —incluidas las de mañana—.
 *
 *   npx playwright test tests/e2e/ielts-task2-intro-bodies.spec.ts
 */

const taller = (page: Page) => page.locator('[class*="guidedWorkshop"]')
const escape = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Los dos cuerpos abren su paso de escritura eligiendo la frase temática correcta. */
const CUERPOS = [
  {
    nombre: 'body-1',
    ruta: '/practica/ielts/academic/writing/task2/body-1',
    correcta: BODY_ONE_LESSONS[0].examples[1].blocks[0].text,
    boton: 'Check the topic sentence',
  },
  {
    nombre: 'body-2',
    ruta: '/practica/ielts/academic/writing/task2/body-2',
    correcta: BODY_TWO_LESSONS[0].examples[1].blocks[0].text,
    boton: 'Check the controlling idea',
  },
] as const

for (const unidad of CUERPOS) {
  test.describe(unidad.nombre, () => {
    test('el botón de comparar dice cuántas palabras faltan, y el número baja al escribir', async ({ page }) => {
      await page.goto(unidad.ruta)

      // Paso 1: elegir la frase correcta abre el paso de escritura.
      await taller(page).getByRole('button', { name: new RegExp(escape(unidad.correcta.slice(0, 45))) }).first().click()
      await taller(page).getByRole('button', { name: new RegExp(`^${unidad.boton}`) }).click()

      const boton = taller(page).getByRole('button', { name: 'Show me the model' })
      await expect(boton).toBeVisible()
      await expect(boton).toBeDisabled()

      const aviso = taller(page).getByText(/\d+ more words? to go before you can compare/)
      await expect(aviso).toBeVisible()
      const antes = Number((await aviso.innerText()).match(/^(\d+)/)![1])
      expect(antes, 'con las cajas vacías tienen que faltar palabras').toBeGreaterThan(0)

      // El contador está vivo: no es un texto fijo.
      await taller(page).locator('textarea').first().fill('one two three four five six seven eight')
      const despues = Number((await aviso.innerText()).match(/^(\d+)/)![1])
      expect(despues, 'el número que falta tiene que bajar al escribir').toBeLessThan(antes)

      // Y el corrector está apagado en las cajas que acaban de aparecer.
      for (const caja of await taller(page).locator('textarea').all()) {
        await expect(caja).toHaveAttribute('spellcheck', 'false')
      }
    })
  })
}

const TODAS = [
  { nombre: 'introduccion', ruta: '/practica/ielts/academic/writing/task2/introduccion' },
  ...CUERPOS.map((c) => ({ nombre: c.nombre, ruta: c.ruta })),
]

for (const unidad of TODAS) {
  test(`${unidad.nombre}: no queda jerga interna en pantalla`, async ({ page }) => {
    await page.goto(unidad.ruta)
    const cuerpo = await page.locator('body').innerText()
    for (const frase of ['Expert comparison', 'controlling decision', 'Follow the exact route', 'Identify the layer']) {
      expect(cuerpo.includes(frase), `quedó «${frase}» a la vista`).toBe(false)
    }
  })

  test(`${unidad.nombre}: en móvil se recorre y la consola queda limpia`, async ({ page }) => {
    const errores: string[] = []
    page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
    page.on('pageerror', (e) => errores.push(String(e)))

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(unidad.ruta)
    await expect(taller(page).first()).toBeVisible()
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
}
