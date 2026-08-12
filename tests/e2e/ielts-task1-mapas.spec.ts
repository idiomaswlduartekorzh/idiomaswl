import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { MAP_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/mapas/mapas-drills'

/**
 * Unidad 8 de Task 1 — mapas.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · 5 de las 12 respuestas del motor estaban contenidas en una frase modelo de la lección,
 *     dos con el 100 % de sus palabras. La lección trabaja cinco mapas con 25 frases modelo.
 *   · Una sola explicación para las cuatro opciones.
 *   · `arrange` no barajaba: dejaba los distractores en su orden escrito.
 */

const RUTA = '/practica/ielts/academic/writing/task1/mapas'
const MOTOR = 'section[aria-labelledby="map-progressive-engine"]'

/** Palabras sin carga: no dicen nada sobre si dos frases son la misma. */
const VACIAS = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'is', 'are', 'was', 'were', 'with', 'that', 'this', 'by', 'at', 'as', 'from', 'into', 'then', 'before', 'after', 'they', 'it', 'its', 'their', 'which'])
const carga = (texto: string) => new Set(
  texto.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').split(/\s+/u).filter((palabra) => palabra.length > 3 && !VACIAS.has(palabra)),
)

test('la lección enseña sus cinco mapas y el motor practica sobre otros', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  const mapas = page.getByRole('tab').filter({ hasText: /^\d\d · / })
  const cuantosMapas = await mapas.count()
  // Sin la guarda, un localizador vacío deja la comprobación pasando sin haber mirado nada.
  expect(cuantosMapas, 'los cinco mapas de la lección').toBeGreaterThanOrEqual(5)

  /**
   * Lo que este test comprueba en PANTALLA es que los enunciados del motor no hablen de los
   * mapas que la lección trabaja. La comprobación exacta —que ninguna opción quepa dentro de
   * una frase modelo— vive en `check-ielts-task1-alignment.mjs`, donde se mide por
   * solapamiento de palabras contra las 25 frases del dato.
   *
   * Se separó así después de pelearme con el DOM: revelar los 20 modelos exige escribir en
   * cada uno de los cuatro cambios de los cinco mapas, y el localizador acabó siendo más
   * frágil que la propiedad que quería probar. La compuerta lo mide mejor y está mordida.
   */
  const titulos: string[] = []
  for (let mapa = 0; mapa < cuantosMapas; mapa += 1) {
    titulos.push(await mapas.nth(mapa).innerText())
  }

  /**
   * Se mide cuánto del TÍTULO aparece en el enunciado, no al revés.
   *
   * La primera versión hacía la división contraria y la prueba de mordida la tumbó: un
   * enunciado largo contra un título de tres palabras da siempre un porcentaje bajo, así que
   * pasaba aunque el enunciado nombrase el mapa de la lección. El título es la parte corta:
   * es la que hay que buscar dentro de la otra.
   */
  for (const drill of MAP_DRILLS) {
    const enElEnunciado = carga(drill.prompt)
    for (const titulo of titulos) {
      // Sin los años: «Town centre changes, 1990-2020» aporta {town, centre, changes}. Dejar
      // 1990 y 2020 dentro diluía la medida hasta que un enunciado que decía «town centre»
      // pasaba con un 40 %. Lo destapó la prueba de mordida, dos veces.
      const suyas = carga(titulo.replace(/^\d\d · /, '').replace(/\d/gu, ' '))
      /**
       * Tres palabras mínimo. «Park changes» son dos, y cualquier enunciado que mencione un
       * «car park» daba 1 de 2 y saltaba sin motivo. Un título de dos palabras no identifica
       * un mapa: el que sí lo hace es el de tres o más.
       */
      if (suyas.size < 3) continue
      const dentro = [...suyas].filter((palabra) => enElEnunciado.has(palabra)).length / suyas.size
      expect(dentro, `el motor pregunta por «${titulo.trim()}», que la lección trabaja: «${drill.prompt.slice(0, 45)}…»`).toBeLessThan(0.5)
    }
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada opción explica por qué falla ELLA, y ningún motivo se repite', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = MAP_DRILLS.filter((item) => item.level === 1)[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.getByRole('button').filter({ hasText: mala.text }).click()
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.locator('[role="status"] strong')).toHaveText('Not this one.')
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }

  const motivos = MAP_DRILLS.flatMap((item) => item.options.map((option) => option.why))
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
    const banco = MAP_DRILLS.filter((item) => item.level === nivel)
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

  const total = MAP_DRILLS.filter((item) => item.level === 1).length
  for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
    await expect(motor.getByText(`Exercise ${ejercicio + 1} of ${total}`)).toBeVisible()
    await motor.getByRole('button').filter({ hasText: /^[A-D]\. / }).first().click()
    await motor.getByRole('button', { name: 'Check answer' }).click()
    const etiqueta = ejercicio === total - 1 ? 'Start this level again →' : 'Next exercise →'
    await expect(motor.getByRole('button', { name: etiqueta })).toBeVisible()
    await motor.getByRole('button', { name: etiqueta }).click()
  }
})

test('en móvil se recorre igual, sin corrector, en inglés y sin promesas de banda', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(RUTA)

  // En el examen se escribe a mano. El área aparece al elegir un cambio que describir.
  await page.getByRole('tab').filter({ hasText: /^\d\d · / }).first().click()
  const areas = page.locator('textarea')
  if (await areas.count()) await expect(areas.first()).toHaveAttribute('spellcheck', 'false')

  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()
  await expect(motor.getByRole('button').filter({ hasText: /^[A-D]\. / })).toHaveCount(4)

  const cuerpo = await page.locator('body').innerText()
  expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|mapa)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
