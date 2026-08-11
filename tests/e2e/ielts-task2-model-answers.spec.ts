import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { BANK_BY_FAMILY } from '../../src/app/(site)/practica/ielts/academic/writing/task2/tarea-completa/task2-prompt-bank'
import { CHECKLIST, WEAK_STRONG } from '../../src/app/(site)/practica/ielts/academic/writing/task2/model-answers/model-answer-extras'

/**
 * La biblioteca de ensayos modelo.
 *
 * El defecto medido: la página traía CINCO ensayos escritos a mano y ninguno de los cinco
 * existía en el banco de 25. Dos juegos de modelos desconectados en el mismo curso — y los
 * del banco son los que están compuestos con los párrafos que el alumno trabaja.
 *
 * Estos tests vigilan que no vuelva a haber un segundo juego: lo que sale en pantalla tiene
 * que ser literalmente el del banco.
 */

const RUTA = '/practica/ielts/academic/writing/task2/model-answers'
const TOTAL = BANK_BY_FAMILY.reduce((sum, family) => sum + family.prompts.length, 0)

test('las cinco familias están, con sus cinco ensayos cada una', async ({ page }) => {
  await page.goto(RUTA)
  await expect(page.getByRole('heading', { level: 1 })).toContainText(`${TOTAL} complete essays`)

  for (const family of BANK_BY_FAMILY) {
    await page.getByRole('tab', { name: family.label }).click()
    // `button`: sin él el localizador pesca también el contenedor `.exampleTabs`.
    await expect(page.locator('button[class*="exampleTab"]')).toHaveCount(family.prompts.length)
  }
})

test('cada ensayo sale DEL BANCO, palabra por palabra', async ({ page }) => {
  await page.goto(RUTA)

  for (const family of BANK_BY_FAMILY) {
    await page.getByRole('tab', { name: family.label }).click()
    for (const [posicion, essay] of family.prompts.entries()) {
      await page.getByRole('button', { name: new RegExp(`^${String(posicion + 1).padStart(2, '0')} · `) }).click()

      const visible = await page.locator('[class*="examplePanel"]').innerText()
      expect(visible, `${essay.id}: el enunciado no es el del banco`).toContain(essay.prompt)
      for (const paragraph of essay.model) {
        expect(visible, `${essay.id}/${paragraph.label} no coincide con el banco`).toContain(paragraph.text)
        expect(visible, `${essay.id}/${paragraph.label} sin su función`).toContain(paragraph.job)
      }
      // La etiqueta del enunciado va en versalitas por diseño: «OPINION · 269 WORDS».
      expect(visible.toLowerCase(), `${essay.id}: falta el recuento de palabras`).toContain(`${essay.modelWords} words`)
      // Son tres avisos distintos, y cada uno tiene que verse por separado.
      for (const warning of essay.watchFor) {
        expect(visible, `${essay.id}: falta un aviso de «written to avoid»`).toContain(warning)
      }
    }
  }
})

test('la comparación flojo/fuerte enseña las dos versiones y por qué', async ({ page }) => {
  await page.goto(RUTA)
  for (const pair of WEAK_STRONG) {
    await expect(page.locator('#weak-strong').getByText(pair.weak.slice(0, 45), { exact: false })).toBeVisible()
    await expect(page.locator('#weak-strong').getByText(pair.strong.slice(0, 45), { exact: false })).toBeVisible()
    await expect(page.locator('#weak-strong').getByText(pair.why.slice(0, 45), { exact: false })).toBeVisible()
  }
})

test('la lista de comprobación son preguntas, con su motivo', async ({ page }) => {
  await page.goto(RUTA)
  for (const item of CHECKLIST) {
    await expect(page.locator('#checklist').getByText(item.question, { exact: false })).toBeVisible()
    await expect(page.locator('#checklist').getByText(item.why.slice(0, 40), { exact: false })).toBeVisible()
    // Una comprobación se puede responder sí o no: si no acaba en interrogante, es un consejo.
    expect(item.question.trim().endsWith('?'), `«${item.question}» no es una pregunta`).toBe(true)
  }
})

test('ni una promesa de banda, y el contenido de IELTS en inglés', async ({ page }) => {
  await page.goto(RUTA)
  const cuerpo = await page.locator('body').innerText()
  const sinFaq = cuerpo.split(/Preguntas frecuentes/i)

  expect(cuerpo, 'un modelo no es una nota').not.toMatch(/Band \d/)
  expect(sinFaq[0], 'queda español en el contenido de IELTS')
    .not.toMatch(/¿|¡|\b(ensayo|párrafo|Introducción|Conclusión|Responde|Desarrolla|Cierra)\b/)
})

test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(RUTA)
  await page.getByRole('tab', { name: BANK_BY_FAMILY[2].label }).click()
  await expect(page.locator('[class*="examplePanel"]')).toBeVisible()

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
