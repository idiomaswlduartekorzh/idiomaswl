import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { COMPARISONS, PRACTICE, WORKED } from '../../src/app/(site)/practica/ielts/academic/writing/task1/comparaciones/comparisons-data'
import { COMPARISON_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/comparaciones/comparisons-drills'

/**
 * Unidad 6 de Task 1 — comparaciones.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · La lección resolvía los 20 gráficos y el motor practicaba sobre esos mismos 20: 3 de las
 *     15 respuestas solapaban un modelo impreso arriba, una al 88 %.
 *   · Una sola explicación para las cuatro opciones.
 *   · `arrangeOptions` NO barajaba: dejaba los distractores en el orden en que estaban
 *     escritos e insertaba la correcta en un hueco a mano. El distractor que invierte la
 *     comparación salía siempre en la misma posición relativa a la buena.
 */

const RUTA = '/practica/ielts/academic/writing/task1/comparaciones'
const MOTOR = 'section[aria-labelledby="comparison-engine-title"]'

test('el motor practica sobre gráficos que la lección no resuelve', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  expect(COMPARISONS.length, 'los 20 ejemplos de comparación').toBe(20)
  expect(WORKED.length, 'tres resueltos por tipo').toBe(12)
  expect(PRACTICE.length, 'dos por tipo para el motor').toBe(8)

  /**
   * Se recorre la lección entera y se resta el motor: leer el `body` a secas recoge también
   * las opciones del ejercicio, que son las respuestas. Ya ha pasado en tres unidades.
   */
  // Son `role="tab"`, no botones sueltos. Buscarlos como botones devolvía cero y el bucle
  // recorría la lección en vacío: lo caza la guarda de conteo, no la suerte.
  const tipos = page.getByRole('tab').filter({ hasText: /^(Line graph|Bar chart|Pie chart|Table)/ })
  const cuantos = await tipos.count()
  expect(cuantos, 'los cuatro tipos de gráfico').toBeGreaterThanOrEqual(4)

  let leccion = ''
  for (let tipo = 0; tipo < cuantos; tipo += 1) {
    await tipos.nth(tipo).click()
    const pagina = await page.locator('body').innerText()
    const delMotor = await page.locator(MOTOR).innerText()
    leccion += `\n${pagina.replace(delMotor, '')}`
  }
  expect(leccion.length, 'la lección recorrida tiene que traer texto').toBeGreaterThan(5_000)

  for (const drill of COMPARISON_DRILLS) {
    const respuesta = drill.options[drill.correct].text
    expect(leccion, `esta respuesta ya está impresa arriba: «${respuesta.slice(0, 55)}…»`).not.toContain(respuesta)
    expect(leccion, `el modelo de ${drill.source.kind} v${drill.source.variant} está impreso arriba`).not.toContain(drill.source.model)
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada opción explica por qué falla ELLA, y ningún motivo se repite', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = COMPARISON_DRILLS.filter((item) => item.level === 1)[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.getByRole('button').filter({ hasText: mala.text }).click()

  await expect(motor.getByText('Not this one.')).toBeVisible()
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }
  // Y la comparación modelo del gráfico, que antes solo estaba arriba.
  await expect(motor.getByText(drill.source.model.slice(0, 45), { exact: false })).toBeVisible()

  const motivos = COMPARISON_DRILLS.flatMap((item) => item.options.map((option) => option.why))
  expect(new Set(motivos).size, 'hay motivos repetidos entre ejercicios').toBe(motivos.length)
})

test('los distractores se barajan: no conservan su orden escrito', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  /**
   * `arrangeOptions` conservaba el orden de los distractores tal cual y solo insertaba la
   * correcta en `slot`. Aquí se mide lo que de verdad delata eso: si los distractores salen en
   * pantalla en el mismo orden en que están escritos, reconocer uno sitúa a los demás.
   */
  let enOrden = 0
  const letras: string[] = []

  for (const nivel of [1, 2, 3] as const) {
    await motor.getByRole('button', { name: new RegExp(`Level ${nivel}`) }).click()
    const banco = COMPARISON_DRILLS.filter((item) => item.level === nivel)
    for (const [indice, drill] of banco.entries()) {
      const opciones = motor.getByRole('button').filter({ hasText: /^[A-D]\. / })
      const textos = await opciones.allTextContents()
      const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
      expect(permutacion.every((valor) => valor >= 0), `nivel ${nivel} ejercicio ${indice + 1}: falta alguna opción`).toBe(true)

      const distractores = permutacion.filter((valor) => valor !== drill.correct)
      const ordenados = [...distractores].sort((a, b) => a - b)
      if (distractores.every((valor, i) => valor === ordenados[i])) enOrden += 1
      letras.push('ABCD'[permutacion.indexOf(drill.correct)])

      await opciones.nth(permutacion.indexOf(drill.correct)).click()
      // `getByText('Correct.')` casa también con el rótulo «· correct» de cada motivo: hay que
      // apuntar al veredicto, que va en negrita dentro del bloque de estado.
      await expect(motor.locator('[role="status"] strong')).toHaveText('Correct.')
      await motor.getByRole('button', { name: /Next exercise|Start this level again/ }).click()
    }
  }

  // Con tres distractores, 1 de las 6 permutaciones conserva el orden: al barajar salen ~2 de 15.
  expect(enOrden, `${enOrden} de ${letras.length} preguntas conservan el orden escrito de los distractores`).toBeLessThanOrEqual(7)
  expect(new Set(letras).size, `solo salen ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBe(4)
})

test('el último ejercicio del nivel lo dice', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const total = COMPARISON_DRILLS.filter((item) => item.level === 1).length
  for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
    await motor.getByRole('button').filter({ hasText: /^[A-D]\. / }).first().click()
    const etiqueta = ejercicio === total - 1 ? 'Start this level again →' : 'Next exercise →'
    await expect(motor.getByRole('button', { name: etiqueta })).toBeVisible()
    await motor.getByRole('button', { name: etiqueta }).click()
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

  const cuerpo = await page.locator('body').innerText()
  expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|comparación)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
