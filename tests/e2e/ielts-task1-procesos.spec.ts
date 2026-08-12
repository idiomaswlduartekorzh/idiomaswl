import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { PROCESS_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/procesos/procesos-drills'

/**
 * Unidad 7 de Task 1 — procesos.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · 6 de las 12 respuestas del motor cabían dentro de un párrafo modelo de la lección,
 *     cuatro con el 100 % de sus palabras. El modelo va detrás de «Reveal answers →», así que
 *     no se ve de entrada; pero quien hace la lección lo revela.
 *   · Una sola explicación para las cuatro opciones.
 *   · `arrange` no barajaba: dejaba los distractores en su orden escrito.
 *   · La lección pintaba `<Task1ApprovedProcessVisual variant={exIdx} />`: el gráfico salía de
 *     la posición del ejercicio en la lista, no del ejercicio.
 */

const RUTA = '/practica/ielts/academic/writing/task1/procesos'
const MOTOR = 'section[aria-labelledby="process-progressive-engine"]'

test('ninguna respuesta del motor aparece en la lección, ni siquiera revelada', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  /**
   * Se recorren los cinco procesos REVELANDO el modelo, que es lo que hace un estudiante que
   * termina la lección, y se resta el motor: leer el `body` a secas recoge sus opciones, que
   * son las respuestas.
   */
  let leccion = ''
  for (let proceso = 0; proceso < 5; proceso += 1) {
    const revelar = page.getByRole('button', { name: 'Reveal answers →' })
    await expect(revelar, `el proceso ${proceso + 1} tiene que poder revelarse`).toBeVisible()
    await revelar.click()
    const pagina = await page.locator('body').innerText()
    const delMotor = await page.locator(MOTOR).innerText()
    leccion += `\n${pagina.replace(delMotor, '')}`
    const siguiente = page.getByRole('button', { name: /Next process →|Back to the beginning →/ })
    await siguiente.click()
  }
  expect(leccion.length, 'los cinco procesos revelados tienen que traer texto').toBeGreaterThan(15_000)

  /**
   * Por SOLAPAMIENTO de palabras, no por subcadena.
   *
   * «The flakes are heated and turned into pellets» no es subcadena de «The flakes are then
   * heated and turned into plastic pellets», y es la misma frase. La primera versión de este
   * test usaba `toContain` y la prueba de mordida lo destapó: devolví esa opción al motor y el
   * test siguió en verde.
   */
  const VACIAS = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'is', 'are', 'was', 'were', 'with', 'that', 'this', 'by', 'at', 'as', 'from', 'into', 'then', 'before', 'after', 'they', 'it', 'its', 'their', 'which'])
  const carga = (texto: string) => new Set(
    texto.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').split(/\s+/u).filter((palabra) => palabra.length > 3 && !VACIAS.has(palabra)),
  )
  const enLaLeccion = carga(leccion)

  for (const drill of PROCESS_DRILLS) {
    const respuesta = drill.options[drill.correct].text
    const suyas = carga(respuesta)
    const dentro = [...suyas].filter((palabra) => enLaLeccion.has(palabra)).length / suyas.size
    expect(dentro, `el ${Math.round(dentro * 100)} % de esta respuesta está en la lección: «${respuesta.slice(0, 50)}…»`).toBeLessThan(0.8)
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada opción explica por qué falla ELLA, y ningún motivo se repite', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = PROCESS_DRILLS.filter((item) => item.level === 1)[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.getByRole('button').filter({ hasText: mala.text }).click()
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.locator('[role="status"] strong')).toHaveText('Not this one.')
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }

  const motivos = PROCESS_DRILLS.flatMap((item) => item.options.map((option) => option.why))
  expect(new Set(motivos).size, 'hay motivos repetidos entre ejercicios').toBe(motivos.length)
})

test('los distractores se barajan: no conservan su orden escrito', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  let enOrden = 0
  const letras: string[] = []

  for (const nivel of [1, 2, 3] as const) {
    await motor.getByRole('button', { name: new RegExp(`Level ${nivel}`) }).click()
    const banco = PROCESS_DRILLS.filter((item) => item.level === nivel)
    for (const [indice, drill] of banco.entries()) {
      const opciones = motor.getByRole('button').filter({ hasText: /^[A-D]\. / })
      const textos = await opciones.allTextContents()
      const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
      expect(permutacion.every((valor) => valor >= 0), `nivel ${nivel} ejercicio ${indice + 1}: falta alguna opción`).toBe(true)

      // Lo que delata a `arrange`: los distractores en el mismo orden en que están escritos.
      const distractores = permutacion.filter((valor) => valor !== drill.correct)
      const ordenados = [...distractores].sort((a, b) => a - b)
      if (distractores.every((valor, i) => valor === ordenados[i])) enOrden += 1
      letras.push('ABCD'[permutacion.indexOf(drill.correct)])

      await opciones.nth(permutacion.indexOf(drill.correct)).click()
      await motor.getByRole('button', { name: 'Check answer' }).click()
      await expect(motor.locator('[role="status"] strong')).toHaveText('Good work.')
      await motor.getByRole('button', { name: /Next exercise|Start this level again/ }).click()
    }
  }

  expect(enOrden, `${enOrden} de ${letras.length} conservan el orden escrito de los distractores`).toBeLessThanOrEqual(6)
  expect(new Set(letras).size, `solo salen ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBe(4)
})

test('el último ejercicio del nivel lo dice, y el botón bloqueado explica por qué', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  await expect(motor.getByRole('button', { name: 'Check answer' })).toBeDisabled()
  await expect(motor.getByText('Choose an option first')).toBeVisible()

  const total = PROCESS_DRILLS.filter((item) => item.level === 1).length
  for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
    await expect(motor.getByText(`Exercise ${ejercicio + 1} of ${total}`)).toBeVisible()
    await motor.getByRole('button').filter({ hasText: /^[A-D]\. / }).first().click()
    await motor.getByRole('button', { name: 'Check answer' }).click()
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
  expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|proceso)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
