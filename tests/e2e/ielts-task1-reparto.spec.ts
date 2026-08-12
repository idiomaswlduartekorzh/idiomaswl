import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'

/**
 * Las dos páginas de Task 1 que pintaban las opciones en el orden en que están escritas.
 *
 * Medido el 12 de agosto de 2026: en `overview` la respuesta correcta era la opción 1 en las
 * SEIS lecciones, y en `tendencias` era la A o la B en las nueve preguntas —nunca la C, nunca
 * la D. Los dos ejercicios funcionaban y sus respuestas eran correctas; el defecto solo
 * existe en el conjunto, que es como hay que medirlo.
 *
 * `scripts/check-ielts-task1-alignment.mjs` vigila los datos. Estos tests vigilan la PANTALLA,
 * que es donde ya se coló una vez este mismo fallo en vocabulario: el barajado vivía dentro
 * del JSX y los datos parecían sanos.
 */

const BASE = '/practica/ielts/academic/writing/task1'

test.describe('overview — la correcta no vive siempre en la opción 1', () => {
  test('cada tipo de gráfico mueve la respuesta de sitio', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

    await page.goto(`${BASE}/overview`)

    /**
     * Se recorren los seis tipos y se anota en qué posición cae la buena.
     *
     * Esta página solo revela si acertaste LA QUE PULSASTE: las demás siguen diciendo
     * «Option N». Así que se prueban una a una hasta dar con ella, que es exactamente lo
     * que puede hacer un estudiante y por tanto lo que hay que medir.
     */
    const posiciones: number[] = []
    const pestanas = page.getByRole('button').filter({ hasText: /^(Line graph|Bar chart|Pie charts|Table|Process diagram|Map)$/ })
    expect(await pestanas.count(), 'tienen que seguir estando los seis tipos de gráfico').toBeGreaterThanOrEqual(6)

    // El taller de la lección, no el motor de práctica que va debajo con sus propias opciones.
    const taller = page.locator('.wl-card').filter({ hasText: 'Choose the correct overview' })
    const opciones = () => taller.getByRole('button').filter({ hasText: /^Option \d/ })

    for (let tipo = 0; tipo < 6; tipo += 1) {
      await pestanas.nth(tipo).click()
      const total = await opciones().count()
      expect(total, 'cada lección tiene que ofrecer opciones').toBeGreaterThanOrEqual(3)

      let buena = -1
      for (let posicion = 0; posicion < total && buena < 0; posicion += 1) {
        await opciones().nth(posicion).click()
        const elegida = taller.getByRole('button').filter({ hasText: /^(Correct|Review)/ }).first()
        if ((await elegida.innerText()).startsWith('Correct')) buena = posicion
        await taller.getByRole('button', { name: 'Practice again' }).click()
      }
      expect(buena, 'alguna de las opciones tiene que ser la correcta').toBeGreaterThanOrEqual(0)
      posiciones.push(buena)
    }

    const cuenta = new Map<number, number>()
    for (const posicion of posiciones) cuenta.set(posicion, (cuenta.get(posicion) ?? 0) + 1)
    const repetida = Math.max(...cuenta.values())
    expect(repetida, `la correcta cae siempre en el mismo sitio: ${posiciones.join(' ')}`).toBeLessThanOrEqual(posiciones.length / 2)

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})

test.describe('tendencias — la correcta llega a la C y a la D', () => {
  test('las nueve preguntas reparten la respuesta entre las cuatro letras', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

    await page.goto(`${BASE}/tendencias`)
    const motor = page.locator('section').filter({ hasText: 'Level 1 · Classify the observation' }).last()
    await motor.scrollIntoViewIfNeeded()

    const letras: string[] = []
    for (let pregunta = 0; pregunta < 9; pregunta += 1) {
      const opciones = page.getByRole('button').filter({ hasText: /^[A-D]\. / })
      await opciones.first().click()
      await page.getByRole('button', { name: /Check answer/ }).click()

      /**
       * La buena se reconoce por el borde verde, que es lo único que la distingue. Leerlo
       * del estilo calculado es lo que hace este test distinto del script: comprueba lo
       * que se ve, no lo que dicen los datos.
       */
      const total = await opciones.count()
      for (let posicion = 0; posicion < total; posicion += 1) {
        const boton = opciones.nth(posicion)
        const color = await boton.evaluate((node) => getComputedStyle(node).borderTopColor)
        if (color === 'rgb(5, 150, 105)') letras.push(String.fromCharCode(65 + posicion))
      }
      await page.getByRole('button', { name: /Next (exercise|level)/ }).click()
    }

    expect(letras.length, 'una respuesta marcada por pregunta').toBe(9)
    expect(new Set(letras).size, `solo salen las letras ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBeGreaterThanOrEqual(3)
    const cuenta = new Map<string, number>()
    for (const letra of letras) cuenta.set(letra, (cuenta.get(letra) ?? 0) + 1)
    expect(Math.max(...cuenta.values()), `una letra domina: ${letras.join(' ')}`).toBeLessThanOrEqual(4)

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})
