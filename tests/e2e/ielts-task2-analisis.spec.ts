import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { ANALYSIS_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/analysis-drills'
import { PROMPT_ANALYSIS_LESSONS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/analisis-pregunta/prompt-analysis-data'

/**
 * Análisis del enunciado (IELTS Task 2) en navegador — la cuarta auditoría.
 *
 * `scripts/check-ielts-task2-alignment.mjs` mide el banco en Node: reparto de la letra
 * correcta, longitud, distractores reciclados, un mensaje por opción. Esto hace clic, que es
 * otra cosa. El defecto que lo justifica ya pasó aquí: el motor guardaba `selected` y
 * `checked` en su propio estado y no los reiniciaba al cambiar de familia, así que el
 * veredicto de una pregunta se quedaba pintado encima de las opciones de la siguiente. En
 * Node eso no existe, porque en Node no hay pestañas que cambiar.
 *
 * Los tests atacan: fallan a propósito en las tres opciones malas y exigen tres
 * explicaciones distintas; escriben palabra a palabra hasta el mínimo anunciado y exigen que
 * el botón se abra exactamente ahí. Lo que se afirma al final no es que la página cargue.
 *
 * No levanta servidor (misma razón que el resto: 8 GB). Arranca tú y luego:
 *
 *   npm run dev:safe                                              # en otra terminal
 *   npx playwright test tests/e2e/ielts-task2-analisis.spec.ts
 */

const RUTA = '/practica/ielts/academic/writing/task2/analisis-pregunta'
const MINIMOS = [20, 15, 45, 250]
const PRIMER_NIVEL_DE_ESCRITURA = 4

const motor = (page: Page) => page.locator('section').filter({ has: page.getByRole('heading', { name: 'Practise prompt analysis by level' }) })
const opciones = (page: Page) => motor(page).locator('button').filter({ hasText: /\S/ }).filter({ hasNot: page.locator('svg') })

async function abrirNivel(page: Page, nivel: number) {
  await motor(page).getByRole('button', { name: new RegExp(`^${nivel + 1} · `) }).click()
}

async function opcionPorTexto(page: Page, texto: string) {
  // El botón imprime la letra y luego el texto; `hasText` con string busca subcadena.
  return motor(page).locator('button').filter({ hasText: texto.slice(0, 60) }).first()
}

test.describe('Motor de análisis del enunciado', () => {
  test('las 20 preguntas de opción se aciertan leyendo, y el acierto se reconoce', async ({ page }) => {
    await page.goto(RUTA)

    for (const lesson of PROMPT_ANALYSIS_LESSONS) {
      await page.getByRole('tab', { name: lesson.shortLabel, exact: true }).click()

      for (const [nivel, drill] of ANALYSIS_DRILLS[lesson.id].entries()) {
        await abrirNivel(page, nivel)

        // El enunciado que se pinta es el del ejercicio, no el de otro.
        await expect(motor(page).getByText(drill.prompt, { exact: false })).toBeVisible()
        await expect(motor(page).getByText(drill.question, { exact: false })).toBeVisible()

        const correcta = drill.options[drill.correct]
        await (await opcionPorTexto(page, correcta.text)).click()
        await motor(page).getByRole('button', { name: 'Check my answer' }).click()

        await expect(motor(page).getByText('Correct', { exact: true })).toBeVisible()
        await expect(motor(page).getByText(correcta.why.replace('Correct. ', '').slice(0, 40), { exact: false })).toBeVisible()
      }
    }
  })

  test('fallar en tres opciones distintas da tres explicaciones distintas', async ({ page }) => {
    await page.goto(RUTA)
    const drill = ANALYSIS_DRILLS.opinion[0]
    const malas = drill.options.filter((_, index) => index !== drill.correct)
    const mensajes: string[] = []

    for (const mala of malas) {
      await abrirNivel(page, 0)
      await motor(page).getByRole('button', { name: 'Reset' }).click()
      await (await opcionPorTexto(page, mala.text)).click()
      await motor(page).getByRole('button', { name: 'Check my answer' }).click()

      await expect(motor(page).getByText('Not this one', { exact: true })).toBeVisible()
      mensajes.push((await motor(page).getByText(mala.why.slice(0, 45), { exact: false }).first().textContent()) ?? '')
      // Al fallar se enseña además cuál era la buena: no se deja al estudiante a ciegas.
      await expect(motor(page).getByText('This prompt needs:', { exact: false })).toBeVisible()
    }

    expect(new Set(mensajes).size, `tres fallos distintos deberían dar tres explicaciones distintas, y dieron ${new Set(mensajes).size}`).toBe(3)
  })

  test('los niveles de escritura anuncian el mínimo, cuentan, y abren el botón justo ahí', async ({ page }) => {
    await page.goto(RUTA)

    for (const [posicion, minimo] of MINIMOS.entries()) {
      const nivel = PRIMER_NIVEL_DE_ESCRITURA + posicion
      await abrirNivel(page, nivel)

      const area = motor(page).locator('textarea')
      const boton = motor(page).getByRole('button', { name: 'Compare with the model' })

      // 1. El mínimo se anuncia ANTES de escribir, y dice cuánto falta.
      await expect(motor(page).getByText(`Minimum ${minimo} words · ${minimo} to go`, { exact: false })).toBeVisible()
      await expect(boton).toBeDisabled()

      // 2. Una palabra por debajo sigue cerrado, y lo dice.
      await area.fill(Array.from({ length: minimo - 1 }, (_, i) => `word${i}`).join(' '))
      await expect(motor(page).getByText(`${minimo - 1} words`, { exact: false })).toBeVisible()
      await expect(motor(page).getByText('1 to go', { exact: false })).toBeVisible()
      await expect(boton).toBeDisabled()

      // 3. En el número anunciado, ni antes ni después, se abre.
      await area.fill(Array.from({ length: minimo }, (_, i) => `word${i}`).join(' '))
      await expect(boton).toBeEnabled()

      // 4. Y lo que sale no es una nota: es el modelo para comparar.
      await boton.click()
      await expect(motor(page).getByText('Your response is ready to compare')).toBeVisible()
      await expect(motor(page).getByText('cannot be graded automatically', { exact: false })).toBeVisible()
      await expect(motor(page).getByText('Model plan:', { exact: false })).toBeVisible()
    }
  })

  test('el área de escritura no lleva corrector: en el examen no lo hay', async ({ page }) => {
    await page.goto(RUTA)
    await abrirNivel(page, PRIMER_NIVEL_DE_ESCRITURA)
    await expect(motor(page).locator('textarea')).toHaveAttribute('spellcheck', 'false')
  })

  test('cambiar de familia no deja el veredicto anterior pintado sobre las opciones nuevas', async ({ page }) => {
    await page.goto(RUTA)
    const drill = ANALYSIS_DRILLS.opinion[0]

    await abrirNivel(page, 0)
    await (await opcionPorTexto(page, drill.options[drill.correct].text)).click()
    await motor(page).getByRole('button', { name: 'Check my answer' }).click()
    await expect(motor(page).getByText('Correct', { exact: true })).toBeVisible()

    await page.getByRole('tab', { name: 'Discussion', exact: true }).click()
    await expect(motor(page).getByText('Correct', { exact: true })).toHaveCount(0)
    await expect(motor(page).getByText('Not this one', { exact: true })).toHaveCount(0)
  })

  test('en móvil se puede recorrer igual, y la consola no se ensucia', async ({ page }) => {
    const errores: string[] = []
    page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })
    page.on('pageerror', (error) => errores.push(String(error)))

    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(RUTA)

    const drill = ANALYSIS_DRILLS.opinion[2]
    await abrirNivel(page, 2)
    await (await opcionPorTexto(page, drill.options[drill.correct].text)).click()
    await motor(page).getByRole('button', { name: 'Check my answer' }).click()
    await expect(motor(page).getByText('Correct', { exact: true })).toBeVisible()

    // El taller guiado también tiene que funcionar a 375, no solo el motor.
    await page.getByRole('button', { name: 'Show me the model map' }).scrollIntoViewIfNeeded()
    await expect(page.getByText('Fill in all three boxes to see the model')).toBeVisible()

    expect(erroresPropios(errores), errores.join('\n')).toEqual([])
  })
})
