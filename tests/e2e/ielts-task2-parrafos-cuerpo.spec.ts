import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import {
  BODY_DRILLS,
  DIAGNOSTIC,
  WORKED_EXAMPLE,
} from '../../src/app/(site)/practica/ielts/academic/writing/task2/parrafos-cuerpo/body-paragraph-drills'

/**
 * Sub-habilidad 3 — párrafos de cuerpo (TEEL).
 *
 * Los dos defectos que justifican estos tests:
 *
 *   · El «diagnóstico» ofrecía cuatro observaciones y las cuatro eran defectos reales, así
 *     que pulsarlas todas era la solución. Ahora tres de las siete son señuelos y marcarlo
 *     todo ya no aprueba.
 *   · El botón de ensamblar se bloqueaba en silencio. Ahora dice qué caja está corta y por
 *     cuántas palabras.
 */

const RUTA = '/practica/ielts/academic/writing/task2/parrafos-cuerpo'

const taller = (page: Page) => page.locator('[class*="examplePanel"]').last()
const diagnostico = (page: Page) => page.locator('#diagnostic')
const observacion = (page: Page, claim: string) =>
  diagnostico(page).getByRole('button').filter({ hasText: claim })

/** Rellena las tres cajas del ejercicio activo con `palabras` palabras cada una. */
async function escribir(page: Page, palabras: number) {
  const cajas = taller(page).getByRole('textbox')
  const total = await cajas.count()
  for (let index = 0; index < total; index += 1) {
    await cajas.nth(index).fill(Array.from({ length: palabras }, (_, n) => `word${n}`).join(' '))
  }
}

test('el ejemplo resuelto va antes de escribir, con las dos versiones', async ({ page }) => {
  await page.goto(RUTA)
  await expect(page.getByText('Worked example')).toBeVisible()
  await expect(page.getByText(WORKED_EXAMPLE.weakVersion.slice(0, 50), { exact: false })).toBeVisible()
  // Cada bloque sale dos veces: en el párrafo corrido y en su ficha. Las dos son correctas.
  await expect(page.getByText(WORKED_EXAMPLE.blocks[1].text.slice(0, 50), { exact: false })).toHaveCount(2)
  for (const cambio of WORKED_EXAMPLE.whatChanged) {
    await expect(page.getByText(cambio.slice(0, 40), { exact: false })).toBeVisible()
  }
  // Y cada bloque dice qué trabajo hace, no solo cómo suena.
  await expect(page.getByText(WORKED_EXAMPLE.blocks[0].job.slice(0, 40), { exact: false })).toBeVisible()
})

test('los cinco ejercicios se abren y cada uno trae su enunciado', async ({ page }) => {
  await page.goto(RUTA)
  for (const [posicion, drill] of BODY_DRILLS.entries()) {
    await page.getByRole('button', { name: new RegExp(`^${String(posicion + 1).padStart(2, '0')} · `) }).click()
    await expect(taller(page).getByText(drill.prompt.slice(0, 50), { exact: false })).toBeVisible()
    await expect(taller(page).getByText(drill.topicSentence.slice(0, 50), { exact: false })).toBeVisible()
    await expect(taller(page).getByRole('textbox')).toHaveCount(drill.fields.length)
  }
})

test('el botón bloqueado dice qué caja está corta y por cuánto', async ({ page }) => {
  await page.goto(RUTA)
  const drill = BODY_DRILLS[0]
  const boton = taller(page).getByRole('button', { name: /Assemble the paragraph/ })

  await expect(boton).toBeDisabled()
  // El mínimo se anuncia ANTES de escribir, no al chocar contra el botón.
  await expect(taller(page).getByText(`Minimum ${drill.fields[0].minWords} words`, { exact: false }).first()).toBeVisible()
  await expect(taller(page).getByText('Still short:', { exact: false })).toBeVisible()
  for (const field of drill.fields) {
    await expect(taller(page).getByText(`${field.label} (${field.minWords} more)`, { exact: false })).toBeVisible()
  }

  // A media caja sigue bloqueado, y el aviso baja de número.
  await taller(page).getByRole('textbox').first().fill('one two three four five')
  await expect(boton).toBeDisabled()
  await expect(taller(page).getByText(`${drill.fields[0].label} (${drill.fields[0].minWords - 5} more)`, { exact: false })).toBeVisible()
})

test('al llegar al mínimo se desbloquea y el párrafo se lee entero', async ({ page }) => {
  await page.goto(RUTA)
  const drill = BODY_DRILLS[0]
  await escribir(page, Math.max(...drill.fields.map((field) => field.minWords)))

  const boton = taller(page).getByRole('button', { name: /Assemble the paragraph/ })
  await expect(boton).toBeEnabled()
  await expect(taller(page).getByText('Still short:', { exact: false })).toHaveCount(0)
  await boton.click()

  await expect(taller(page).getByText('Your paragraph, read as one')).toBeVisible()
  // Nada afirma que esté bien: la página no lee inglés.
  await expect(taller(page).getByText('does not mark your English', { exact: false })).toBeVisible()
})

test('el modelo no aparece hasta haber escrito los tres bloques', async ({ page }) => {
  await page.goto(RUTA)
  const drill = BODY_DRILLS[0]
  const modelo = drill.fields[0].model.slice(0, 45)

  await expect(taller(page).getByText(modelo, { exact: false })).toHaveCount(0)
  await escribir(page, 30)
  await taller(page).getByRole('button', { name: /Assemble the paragraph/ }).click()
  await expect(taller(page).getByText(modelo, { exact: false })).toHaveCount(0)

  await taller(page).getByRole('button', { name: /Compare with a model/ }).click()
  await expect(taller(page).getByText(modelo, { exact: false })).toBeVisible()
})

test('el diagnóstico SE PUEDE FALLAR: hay señuelos y lo dicen', async ({ page }) => {
  await page.goto(RUTA)
  const senuelo = DIAGNOSTIC.observations.find((item) => !item.real)!

  await observacion(page, senuelo.claim).click()
  await expect(diagnostico(page).getByText('Not a defect.', { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText(senuelo.why.slice(0, 45), { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText('0 of 4 real defects found', { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText('1 wrong call', { exact: false })).toBeVisible()
})

test('marcarlo TODO ya no aprueba', async ({ page }) => {
  await page.goto(RUTA)
  for (const item of DIAGNOSTIC.observations) await observacion(page, item.claim).click()

  const senuelos = DIAGNOSTIC.observations.filter((item) => !item.real).length
  await expect(diagnostico(page).getByText(`${senuelos} wrong calls`, { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText('and nothing that was not there', { exact: false })).toHaveCount(0)
})

test('los cuatro reales, y ninguno de los otros, cierra el ejercicio', async ({ page }) => {
  await page.goto(RUTA)
  for (const item of DIAGNOSTIC.observations.filter((entry) => entry.real)) {
    await observacion(page, item.claim).click()
    await expect(diagnostico(page).getByText(item.why.slice(0, 45), { exact: false })).toBeVisible()
  }
  await expect(diagnostico(page).getByText('4 of 4 real defects found', { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText('and nothing that was not there', { exact: false })).toBeVisible()
  await expect(diagnostico(page).getByText(DIAGNOSTIC.rebuilt.slice(0, 45), { exact: false })).toBeVisible()
})

test('las áreas de escritura no llevan corrector', async ({ page }) => {
  await page.goto(RUTA)
  const cajas = taller(page).getByRole('textbox')
  await expect(cajas).toHaveCount(BODY_DRILLS[0].fields.length)
  for (const valor of await cajas.evaluateAll((nodes) => nodes.map((n) => (n as HTMLTextAreaElement).spellcheck))) {
    expect(valor, 'en el examen no hay corrector').toBe(false)
  }
})

test('ni una promesa de banda ni una palabra de español', async ({ page }) => {
  await page.goto(RUTA)
  await escribir(page, 30)
  await taller(page).getByRole('button', { name: /Assemble the paragraph/ }).click()
  await taller(page).getByRole('button', { name: /Compare with a model/ }).click()
  for (const item of DIAGNOSTIC.observations) await observacion(page, item.claim).click()

  const visible = (await page.locator('body').innerText()).replace(/Práctica|Prácticas|Idiomas|Español/g, '')
  expect(visible).not.toMatch(/Band \d/)
  expect(visible).not.toMatch(/¿|¡|párrafo|ensayo|ejercicio|Correcto|Incorrecto/i)
})

test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(RUTA)
  await escribir(page, 30)
  await taller(page).getByRole('button', { name: /Assemble the paragraph/ }).click()
  await expect(taller(page).getByText('Your paragraph, read as one')).toBeVisible()

  const propios = erroresPropios(errores)
  expect(propios, errores.join('\n')).toEqual([])
})
