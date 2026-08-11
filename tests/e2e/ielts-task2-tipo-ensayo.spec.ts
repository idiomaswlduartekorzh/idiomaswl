import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import {
  MISREAD_CASES,
  TYPE_DRILLS,
  TYPE_OPTIONS,
} from '../../src/app/(site)/practica/ielts/academic/writing/task2/tipo-ensayo/essay-type-drills'

/**
 * Sub-habilidad 1 — identificar el tipo de ensayo.
 *
 * La unidad venía con tres defectos que sólo se ven midiendo, y estos tests existen para que
 * no vuelvan:
 *
 *   · las cinco primeras respuestas caían en las posiciones 0,1,2,3,4 de una rejilla fija,
 *   · cinco de las nueve pistas imprimían el nombre del tipo correcto,
 *   · la explicación era la misma eligieras la opción que eligieras.
 *
 * Los dos primeros los mide `check:ielts-task2` sobre los datos. Aquí se comprueba lo que el
 * estudiante ve de verdad en pantalla.
 */

const RUTA = '/practica/ielts/academic/writing/task2/tipo-ensayo'

const empezar = async (page: Page) => {
  await page.goto(RUTA)
  await page.getByRole('button', { name: /^Start practice/ }).click()
}

const opcion = (page: Page, label: string) =>
  page.getByRole('button', { name: label, exact: true })

/** La etiqueta de una categoría a partir de su id. */
const etiqueta = (id: string) => TYPE_OPTIONS.find((option) => option.id === id)!.label

/** Una categoría distinta de la correcta, para fallar a propósito. */
const otra = (correcta: string, evitar: string[] = []) =>
  TYPE_OPTIONS.find((option) => option.id !== correcta && !evitar.includes(option.id))!

test('la referencia lista las cinco categorías con su instrucción', async ({ page }) => {
  await page.goto(RUTA)
  for (const option of TYPE_OPTIONS) {
    await expect(page.getByText(option.label, { exact: true }).first()).toBeVisible()
  }
  await expect(page.getByRole('button', { name: /^Start practice/ })).toBeVisible()
})

test('los diez enunciados se recorren y cada uno pide su tipo', async ({ page }) => {
  await empezar(page)
  for (const [posicion, drill] of TYPE_DRILLS.entries()) {
    await expect(page.getByText(`${posicion + 1}/${TYPE_DRILLS.length}`, { exact: true })).toBeVisible()
    await expect(page.getByText(drill.prompt.slice(0, 60), { exact: false })).toBeVisible()
    await opcion(page, etiqueta(drill.answer)).click()
    await expect(page.getByText(drill.why.slice(0, 50), { exact: false })).toBeVisible()
    await page.getByRole('button', { name: posicion < TYPE_DRILLS.length - 1 ? /^Next prompt/ : /^Critical reading/ }).click()
  }
  await expect(page.getByRole('heading', { name: 'This essay answered a different question' })).toBeVisible()
})

test('la pista del primer fallo NO dice cuál es la respuesta', async ({ page }) => {
  await empezar(page)
  const drill = TYPE_DRILLS[0]
  const fallo = otra(drill.answer)

  await opcion(page, fallo.label).click()
  await expect(page.getByText('Not that one. Read it again:')).toBeVisible()
  await expect(page.getByText(drill.hint.slice(0, 40), { exact: false })).toBeVisible()

  // Lo que no puede pasar: que la pista imprima el nombre del tipo correcto.
  const aviso = page.locator('[aria-live="polite"]')
  await expect(aviso).not.toContainText(etiqueta(drill.answer))

  // Y la pregunta sigue abierta: el primer fallo no la cierra.
  await expect(page.getByText(drill.why.slice(0, 40), { exact: false })).toHaveCount(0)
})

test('cada opción equivocada explica por qué falla ELLA', async ({ page }) => {
  await empezar(page)
  const drill = TYPE_DRILLS[0]
  const primera = otra(drill.answer)
  const segunda = otra(drill.answer, [primera.id])

  await opcion(page, primera.label).click()
  await expect(page.getByText(drill.wrong[primera.id].slice(0, 45), { exact: false })).toBeVisible()

  await opcion(page, segunda.label).click()
  await expect(page.getByText(drill.wrong[segunda.id].slice(0, 45), { exact: false })).toBeVisible()

  // Dos mensajes distintos para dos errores distintos.
  expect(drill.wrong[primera.id]).not.toBe(drill.wrong[segunda.id])
})

test('el segundo fallo cierra la pregunta y enseña la respuesta con su instrucción', async ({ page }) => {
  await empezar(page)
  const drill = TYPE_DRILLS[0]
  const primera = otra(drill.answer)
  const segunda = otra(drill.answer, [primera.id])

  await opcion(page, primera.label).click()
  await opcion(page, segunda.label).click()

  await expect(page.getByText(`It was ${etiqueta(drill.answer)}.`)).toBeVisible()
  await expect(page.getByText(drill.why.slice(0, 50), { exact: false })).toBeVisible()
  await expect(page.getByText('The words that decide it:', { exact: false })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Next prompt/ })).toBeVisible()
})

test('la insignia sale del dato, no del número de pregunta', async ({ page }) => {
  await empezar(page)
  for (const drill of TYPE_DRILLS) {
    await expect(page.getByText(drill.tricky ? 'Commonly misread' : 'Clear signal', { exact: true })).toBeVisible()
    await opcion(page, etiqueta(drill.answer)).click()
    const boton = page.getByRole('button', { name: /^Next prompt|^Critical reading/ })
    await boton.click()
    if (await page.getByRole('heading', { name: 'This essay answered a different question' }).isVisible()) break
  }
})

test('el análisis crítico recorre los tres ensayos y cada opción tiene su motivo', async ({ page }) => {
  await empezar(page)
  for (const drill of TYPE_DRILLS) {
    await opcion(page, etiqueta(drill.answer)).click()
    await page.getByRole('button', { name: /^Next prompt|^Critical reading/ }).click()
  }

  for (const [posicion, caso] of MISREAD_CASES.entries()) {
    await expect(page.getByText(`Case ${posicion + 1} of ${MISREAD_CASES.length}`)).toBeVisible()
    await expect(page.getByText(caso.essay[0].text.slice(0, 45), { exact: false })).toBeVisible()

    // Fallar a propósito: sale el motivo de ESA opción, no uno genérico.
    const fallo = otra(caso.wrote)
    await opcion(page, fallo.label).click()
    await expect(page.getByText(caso.wrong[fallo.id].slice(0, 45), { exact: false })).toBeVisible()

    await opcion(page, etiqueta(caso.wrote)).click()
    await expect(page.getByText(caso.tell.slice(0, 45), { exact: false })).toBeVisible()
    await expect(page.getByText(caso.fix.text.slice(0, 45), { exact: false })).toBeVisible()
    await page.getByRole('button', { name: posicion < MISREAD_CASES.length - 1 ? /^Next case/ : /^See your result/ }).click()
  }

  await expect(page.getByRole('heading', { name: 'Ten prompts, three essays' })).toBeVisible()
})

test('el resultado da un número de aciertos, nunca una banda', async ({ page }) => {
  await empezar(page)
  for (const drill of TYPE_DRILLS) {
    await opcion(page, etiqueta(drill.answer)).click()
    await page.getByRole('button', { name: /^Next prompt|^Critical reading/ }).click()
  }
  for (const [posicion, caso] of MISREAD_CASES.entries()) {
    await opcion(page, etiqueta(caso.wrote)).click()
    await page.getByRole('button', { name: posicion < MISREAD_CASES.length - 1 ? /^Next case/ : /^See your result/ }).click()
  }

  const maximo = TYPE_DRILLS.length * 2
  await expect(page.getByText(`${maximo}/${maximo}`, { exact: true })).toBeVisible()
  await expect(page.getByText('not a', { exact: false })).toBeVisible()
  await expect(page.locator('body')).not.toContainText(/Band \d/)
})

test('ni una palabra de español en el contenido de IELTS', async ({ page }) => {
  await empezar(page)
  for (const drill of TYPE_DRILLS) {
    const visible = await page.locator('main, body').first().innerText()
    // El migajero lleva «Práctica» del armazón del sitio; el ejercicio, no.
    const cuerpo = visible.replace(/Práctica|Prácticas/g, '')
    expect(cuerpo, `enunciado ${drill.id}`).not.toMatch(/¿|¡|ensayo|pregunta|opinión|Correcto|Incorrecto/i)
    await opcion(page, etiqueta(drill.answer)).click()
    await page.getByRole('button', { name: /^Next prompt|^Critical reading/ }).click()
  }
})

test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await empezar(page)
  const drill = TYPE_DRILLS[0]
  await opcion(page, etiqueta(drill.answer)).click()
  await expect(page.getByText(drill.why.slice(0, 40), { exact: false })).toBeVisible()

  const propios = erroresPropios(errores)
  expect(propios, errores.join('\n')).toEqual([])
})
