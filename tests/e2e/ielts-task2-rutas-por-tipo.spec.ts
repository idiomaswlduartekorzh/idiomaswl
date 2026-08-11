import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { GUIDED_EXERCISES, READING_METHOD, pathFor } from '../../src/app/(site)/practica/ielts/academic/writing/task2/type-paths/type-path-data'
import type { EssayTypeId } from '../../src/app/(site)/practica/ielts/academic/writing/task2/introduccion/introduction-data'

/**
 * Las rutas por tipo de ensayo, después de la idea de David: «cojamos las partes que ya
 * tenemos ahí, de opinión, y las ponemos en opinión como bloques de lego».
 *
 * Eran cinco lecciones sueltas de ~362 líneas casi idénticas que volvían a explicar por su
 * cuenta lo que el curso ya enseña. Ahora cada ruta es el camino entero filtrado a un tipo,
 * armado con la fuente de las cinco unidades.
 *
 * LO QUE VIGILAN ESTOS TESTS
 *
 *   · Que lo que se pinta venga DE LA FUENTE. Si alguien copia un ejemplo aquí y luego cambia
 *     el original, esta comprobación es la que lo caza: se compara la pantalla contra
 *     `pathFor()`, no contra un texto escrito en el test.
 *   · Que el ejercicio dé una explicación POR OPCIÓN, también a las que no elegiste.
 *   · Que el contenido de IELTS esté en inglés. El FAQ no: responde a lo que un estudiante
 *     colombiano escribe en Google y es la superficie de búsqueda de la página. Se queda en
 *     español a propósito, decidido con David.
 */

/** Se va ampliando conforme cada ruta pasa a la ruta compartida. */
const RUTAS: EssayTypeId[] = ['opinion', 'discussion', 'problem-solution', 'advantages-disadvantages', 'direct-questions']

const BASE = '/practica/ielts/academic/writing/task2'
const SLUG: Record<string, string> = {
  opinion: 'opinion',
  discussion: 'discussion',
  'problem-solution': 'problem-solution',
  'advantages-disadvantages': 'advantages-disadvantages',
  'direct-questions': 'direct-question',
}

/** Español académico que no puede aparecer en el contenido de IELTS. */
const ESPANOL = /¿|¡|\b(ensayo|párrafo|tesis|postura|Aprende|Elige|Revisar|Cuerpo|Ejercicio|Banco|originales|practicamos|Fuerte|Débil|Útil|Riesgoso)\b/i

for (const tipo of RUTAS) {
  const ruta = `${BASE}/${SLUG[tipo]}`

  test.describe(`ruta ${tipo}`, () => {
    test('recorre los seis pasos, del enunciado al ensayo terminado', async ({ page }) => {
      await page.goto(ruta)
      const path = pathFor(tipo)

      await expect(page.getByRole('heading', { level: 1 })).toContainText(path.label)
      await expect(page.getByText(path.signal.slice(0, 40), { exact: false }).first()).toBeVisible()
      await expect(page.getByText(path.trap.slice(0, 40), { exact: false }).first()).toBeVisible()

      /**
       * UN solo enunciado arriba, con su instrucción marcada — y la instrucción puede ser más
       * de una frase. Marcar solo la última dejaba en gris la primera pregunta de los
       * enunciados de dos preguntas, que es justo donde está el error del tipo.
       */
      const marcado = await page.locator('#prompt mark').innerText()
      expect(path.thread.prompt, 'lo marcado tiene que ser el final del enunciado').toContain(marcado)
      expect(marcado.trim(), 'lo marcado termina donde termina el enunciado').toMatch(/[?.]$/)

      const gris = path.thread.prompt.replace(marcado, '').trim()
      expect(gris, 'ninguna pregunta puede quedarse fuera de lo marcado').not.toMatch(/\?/)

      // Paso 1 — el MÉTODO: la pregunta fuera, la respuesta dentro.
      const leer = page.locator('#reading')
      for (const [posicion, step] of READING_METHOD.entries()) {
        await expect(leer.getByText(step.ask, { exact: false })).toBeVisible()
        await expect(leer.getByText(step.where.slice(0, 45), { exact: false })).toBeVisible()
        await expect(leer.locator('details').nth(posicion)).not.toHaveAttribute('open', '')
      }
      // Y la respuesta sí está, detrás del pliegue.
      await leer.locator('details').first().click()
      await expect(leer.getByText(path.reading.topic, { exact: false })).toBeVisible()

      // Pasos 2 a 5 — cada párrafo con su ejemplo ya resuelto.
      for (const step of path.steps) {
        const seccion = page.locator(`#${step.key}`)
        await expect(seccion.getByRole('heading', { name: step.title })).toBeVisible()
        // La cadena va ANTES del resultado: qué obliga el enunciado, y qué decides.
        await expect(seccion.getByText('What the prompt forces here', { exact: false })).toBeVisible()
        await expect(seccion.getByText(step.forces.slice(0, 40), { exact: false })).toBeVisible()
        await expect(seccion.getByText(step.decision.slice(0, 40), { exact: false })).toBeVisible()
        await expect(seccion.getByText(step.blocks[0].text.slice(0, 45), { exact: false })).toBeVisible()
        await expect(seccion.getByRole('link', { name: new RegExp(step.hrefLabel) })).toHaveAttribute('href', step.href)
      }

      // Paso 6 — solo las familias de conectores que este tipo necesita.
      for (const family of path.linking) {
        await expect(page.locator('#linking').getByRole('link', { name: /Open this family/ }).first()).toBeVisible()
        await expect(page.locator('#linking').getByText(family.label, { exact: false })).toBeVisible()
      }

      // Y el ensayo terminado, con sus cuatro párrafos.
      await expect(page.locator('#model').getByText(path.model!.paragraphs[0].text.slice(0, 45), { exact: false })).toBeVisible()
      await expect(page.locator('#model').getByText(`${path.model!.words} words`, { exact: false })).toBeVisible()
    })

    test('el paso 1 enseña el MÉTODO, no la respuesta ya resuelta', async ({ page }) => {
      await page.goto(ruta)
      const path = pathFor(tipo)
      const leer = page.locator('#reading')

      /**
       * David: «no explica cómo llegar a esto, cómo llego a sacar el topic». La versión
       * anterior enseñaba las seis respuestas a la vista. Con la respuesta delante nadie
       * intenta sacarla, así que el paso enseñaba un análisis hecho, no a analizar.
       */
      const texto = await leer.innerText()
      for (const step of READING_METHOD) {
        expect(texto, `falta la pregunta de «${step.label}»`).toContain(step.ask)
      }

      // Cerradas, las respuestas no se leen.
      const cerrado = await leer.evaluate((node) => (node as HTMLElement).innerText)
      expect(cerrado, 'la respuesta del topic no puede verse sin abrir').not.toContain(path.reading.position)

      // Y las seis se pueden abrir.
      await expect(leer.locator('details')).toHaveCount(READING_METHOD.length)
    })

    test('los pasos van sobre el MISMO enunciado, o lo dicen', async ({ page }) => {
      await page.goto(ruta)
      const path = pathFor(tipo)

      /**
       * Antes cada paso enseñaba su primer ejemplo, y esos ejemplos son enunciados distintos:
       * se leía el enunciado A y justo debajo la introducción del B. Ahora se hila uno solo.
       * Donde un módulo no lo tenga, la página tiene que avisarlo — callarlo es peor.
       */
      const fuera = path.steps.filter((step) => !step.onThread)
      for (const step of path.steps.filter((item) => item.onThread)) {
        await expect(page.locator(`#${step.key}`).getByText('Heads up:', { exact: false })).toHaveCount(0)
      }
      for (const step of fuera) {
        await expect(page.locator(`#${step.key}`).getByText('Heads up:', { exact: false })).toBeVisible()
      }
      expect(path.thread.steps, 'el hilo tiene que cubrir al menos 3 de los 5 módulos').toBeGreaterThanOrEqual(3)
    })

    test('nada se copia: lo de pantalla es lo de la fuente', async ({ page }) => {
      await page.goto(ruta)
      const path = pathFor(tipo)

      /**
       * El fallo que costó 10 ejercicios desalineados en producción fue una segunda lista
       * paralela. Aquí se comprueba que no la haya: el texto de cada bloque tiene que ser
       * literalmente el del módulo de origen.
       */
      const visible = await page.locator('body').innerText()
      for (const step of path.steps) {
        for (const block of step.blocks) {
          expect(visible, `${step.key}/${block.label} no coincide con su módulo`).toContain(block.text)
        }
      }
      for (const paragraph of path.model!.paragraphs) {
        expect(visible, `el modelo ${paragraph.label} no coincide con el banco`).toContain(paragraph.text)
      }
    })

    test('el ejercicio explica CADA opción, también las no elegidas', async ({ page }) => {
      await page.goto(ruta)
      const exercise = GUIDED_EXERCISES[tipo]!
      const practica = page.locator('#practice')

      const mala = exercise.first.options.find((option) => !option.good)!
      await practica.getByRole('button').filter({ hasText: mala.text.slice(0, 45) }).click()
      await practica.getByRole('button', { name: /Check the answer/ }).click()

      await expect(practica.getByText('Not that one.')).toBeVisible()
      // Las tres explicaciones salen, no solo la de la que pulsé.
      for (const option of exercise.first.options) {
        await expect(practica.getByText(option.why.slice(0, 45), { exact: false })).toBeVisible()
      }

      // Y son distintas entre sí.
      const motivos = exercise.first.options.map((option) => option.why)
      expect(new Set(motivos).size).toBe(motivos.length)
    })

    test('la segunda tanda admite varias y cuenta los aciertos', async ({ page }) => {
      await page.goto(ruta)
      const exercise = GUIDED_EXERCISES[tipo]!
      const practica = page.locator('#practice')
      const buenas = exercise.second.options.filter((option) => option.good)

      for (const option of buenas) {
        await practica.getByRole('button').filter({ hasText: option.text.slice(0, 45) }).click()
      }
      await practica.getByRole('button', { name: /Check the plan/ }).click()
      await expect(practica.getByText('All of them, and nothing else.')).toBeVisible()
    })

    test('el contenido de IELTS está en inglés y no promete ninguna banda', async ({ page }) => {
      await page.goto(ruta)
      const cuerpo = await page.locator('body').innerText()
      const sinFaq = cuerpo.split(/Preguntas frecuentes/i)

      expect(sinFaq[0], 'queda español en el contenido de IELTS').not.toMatch(ESPANOL)
      expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)
    })

    test('en móvil se recorre igual y la consola queda limpia', async ({ page }) => {
      const errores: string[] = []
      page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

      await page.setViewportSize({ width: 375, height: 812 })
      await page.goto(ruta)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      await page.locator('#model').scrollIntoViewIfNeeded()

      expect(erroresPropios(errores), errores.join('\n')).toEqual([])
    })
  })
}
