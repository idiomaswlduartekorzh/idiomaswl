import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { PRACTICE_SCENARIOS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/tendencias/tendencias-scenarios'
import { TREND_LEVELS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/tendencias/tendencias-drills'

/**
 * Unidad 5 de Task 1 — tendencias.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · El motor preguntaba sobre los cinco escenarios que el ejercicio de selección abre en
 *     canal. Comparando la respuesta contra cada observación por separado salía 1 de 9 y
 *     parecía poca cosa; pero la respuesta de nivel 3 es la SUMA de las tres observaciones
 *     que el ejercicio acaba de marcar como correctas, y una suma no se parece a sus partes.
 *   · Una sola explicación para las cuatro opciones.
 *   · El marcador seguía sumando al dar la segunda vuelta.
 */

const RUTA = '/practica/ielts/academic/writing/task1/tendencias'
const MOTOR = 'section[aria-labelledby="task1-trends-practice"]'

test('el motor practica sobre gráficos que la lección no disecciona', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  expect(PRACTICE_SCENARIOS.length, 'los cuatro gráficos del motor').toBe(4)

  /**
   * Se recorre el ejercicio de selección entero —enseña un escenario cada vez— y se recoge
   * todo lo que imprime, incluidas las observaciones reveladas.
   */
  const escenarios = page.getByRole('tab').filter({ hasText: /^\d\d · / })
  const cuantos = await escenarios.count()
  // Sin esta guarda, un localizador que no encuentra nada deja la comprobación en vacío.
  expect(cuantos, 'los cinco escenarios del ejercicio de selección').toBeGreaterThanOrEqual(5)

  let leccion = ''
  for (let indice = 0; indice < cuantos; indice += 1) {
    await escenarios.nth(indice).click()
    /**
     * Hay que revelar el análisis para que las observaciones se impriman: es lo que ve el
     * estudiante antes de bajar al motor. El botón se llama «View analysis →» y pide al menos
     * una observación marcada. Ojo con buscarlo por un nombre laxo: la primera versión de
     * este test cogía el «Check answer» del motor, que está deshabilitado, y se quedaba
     * esperando hasta el timeout.
     */
    await page.getByRole('button').filter({ hasText: /^\d\d?\s|^[A-Z]/ }).first().waitFor()
    const observaciones = page.locator('button').filter({ hasText: /^[A-Z].{40,}/ })
    await observaciones.first().click()
    const revelar = page.getByRole('button', { name: 'View analysis →' })
    if (await revelar.isEnabled()) await revelar.click()
    /**
     * Todo MENOS el motor. Leer el `body` entero recoge también las opciones del ejercicio de
     * abajo, que son las respuestas: el test se acusa a sí mismo. Ya pasó en la unidad de
     * overview, y volvió a pasar aquí.
     */
    const pagina = await page.locator('body').innerText()
    const delMotor = await page.locator(MOTOR).innerText()
    leccion += `\n${pagina.replace(delMotor, '')}`
  }
  expect(leccion.length, 'el ejercicio recorrido tiene que traer texto').toBeGreaterThan(20_000)

  /**
   * Ni la respuesta ni el TÍTULO del gráfico del motor pueden estar arriba. El título importa
   * tanto como el texto: si el motor vuelve a un escenario que el ejercicio disecciona, sus
   * observaciones relevantes ya están impresas aunque ninguna frase coincida palabra a palabra.
   */
  for (const escenario of PRACTICE_SCENARIOS) {
    expect(leccion, `el escenario «${escenario.id}» también lo usa el ejercicio de arriba`).not.toContain(escenario.title)
  }
  for (const drill of TREND_LEVELS.flatMap((nivel) => nivel.items)) {
    const respuesta = drill.options[drill.correct].text
    expect(leccion, `esta respuesta ya está impresa arriba: «${respuesta.slice(0, 55)}…»`).not.toContain(respuesta)
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada opción explica por qué falla ELLA, y ningún motivo se repite', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = TREND_LEVELS[0].items[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.getByRole('button').filter({ hasText: mala.text }).click()
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.getByText('Not quite yet.')).toBeVisible()
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }

  const motivos = TREND_LEVELS.flatMap((nivel) => nivel.items).flatMap((item) => item.options.map((option) => option.why))
  expect(new Set(motivos).size, 'hay motivos repetidos entre ejercicios').toBe(motivos.length)
})

test('la respuesta se reparte entre las cuatro letras y no se rota', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const letras: string[] = []
  let rotadas = 0

  for (const [nivel, level] of TREND_LEVELS.entries()) {
    await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).click()
    for (const [indice, drill] of level.items.entries()) {
      const opciones = motor.getByRole('button').filter({ hasText: /^[A-D]\. / })
      const textos = await opciones.allTextContents()
      const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
      expect(permutacion.every((valor) => valor >= 0), `nivel ${nivel + 1} ejercicio ${indice + 1}: falta alguna opción`).toBe(true)
      // Una rotación reparte las letras igual de bien; lo que no cambia es el orden relativo.
      if (permutacion.every((valor, i) => valor === (permutacion[0] + i) % permutacion.length)) rotadas += 1
      letras.push('ABCD'[permutacion.indexOf(drill.correct)])

      await opciones.nth(permutacion.indexOf(drill.correct)).click()
      await motor.getByRole('button', { name: 'Check answer' }).click()
      await expect(motor.getByText('Good observation.')).toBeVisible()
      await motor.getByRole('button', { name: /Next exercise|Next level/ }).click()
    }
  }

  expect(new Set(letras).size, `solo salen ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBe(4)
  expect(rotadas, `${rotadas} de ${letras.length} conservan el orden de los distractores`).toBeLessThanOrEqual(5)
})

test('el marcador no pasa del total aunque se den dos vueltas', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  for (const vuelta of [1, 2]) {
    for (const [nivel, level] of TREND_LEVELS.entries()) {
      await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).click()
      for (const drill of level.items) {
        await motor.getByRole('button').filter({ hasText: drill.options[drill.correct].text }).click()
        await motor.getByRole('button', { name: 'Check answer' }).click()
        await expect(motor.getByText('Good observation.'), `vuelta ${vuelta}`).toBeVisible()
        await motor.getByRole('button', { name: /Next exercise|Next level/ }).click()
      }
    }
  }

  for (const [nivel, level] of TREND_LEVELS.entries()) {
    const etiqueta = await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).innerText()
    const marcador = etiqueta.match(/(\d+)\/(\d+)/)!
    expect(Number(marcador[1]), `nivel ${nivel + 1}: ${etiqueta}`).toBeLessThanOrEqual(level.items.length)
    expect(Number(marcador[2])).toBe(level.items.length)
  }
})

test('en móvil se recorre igual, todo en inglés y sin promesas de banda', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()
  await expect(motor.getByRole('button').filter({ hasText: /^[A-D]\. / })).toHaveCount(4)

  await expect(motor.getByRole('button', { name: 'Check answer' })).toBeDisabled()
  await expect(motor.getByText('Choose an option first')).toBeVisible()

  const cuerpo = await page.locator('body').innerText()
  expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|gráfico)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
