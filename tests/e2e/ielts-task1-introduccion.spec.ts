import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { PARAPHRASES, WORKED, PRACTICE } from '../../src/app/(site)/practica/ielts/academic/writing/task1/introduccion/introduction-data'
import { CHOICE_DRILLS, CLOZE_DRILLS, PRODUCTION_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/introduccion/introduction-drills'

/**
 * Unidad 1 de Task 1 — la introducción.
 *
 * Lo que estos tests vigilan es lo que la auditoría del 12 de agosto de 2026 encontró roto:
 *
 *   · 10 de las 11 respuestas del motor estaban impresas en la lección, encima del ejercicio.
 *   · Se podía pulsar «Check answer» con huecos sin rellenar, y quedarse con el botón muerto
 *     sin que nada dijera por qué.
 *   · Una sola explicación para las cuatro opciones, y al fallar no se enseñaba la buena.
 *
 * `scripts/check-ielts-task1-alignment.mjs` vigila los datos. Estos tests vigilan la pantalla.
 */

const RUTA = '/practica/ielts/academic/writing/task1/introduccion'

test('la lección enseña resueltos los suyos, y el motor practica sobre los otros', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  expect(PARAPHRASES.length, 'los 30 gráficos del Visual Lab').toBe(30)
  expect(WORKED.length + PRACTICE.length).toBe(PARAPHRASES.length)

  /**
   * El corazón del asunto: ninguna respuesta del motor puede estar escrita en la página antes
   * de intentarla. Se comprueba contra el texto REAL de la pantalla, no contra los datos:
   * es la única forma de cazar que alguien vuelva a imprimirla en otro sitio.
   */
  /**
   * El ejemplo que sale de entrada enseña su enunciado y su modelo. Se mira ANTES de
   * recorrer: el recorrido termina en otra pestaña.
   */
  const primero = WORKED.find((item) => item.kind === 'line')!
  await expect(page.getByText(primero.prompt.slice(0, 45), { exact: false }).first()).toBeVisible()
  await expect(page.getByText(primero.model.slice(0, 45), { exact: false }).first()).toBeVisible()

  /**
   * Hay que RECORRERLA. La lección enseña un ejemplo cada vez, así que leer el `body` de
   * entrada solo ve tres de los dieciocho. La primera versión de este test hacía justo eso y
   * la prueba de mordida lo cazó: marcando un gráfico del motor como `worked: true`, su
   * respuesta volvía a imprimirse en la lección y el test seguía en verde.
   */
  let cuerpo = ''
  const pestanas = page.getByRole('tab')
  for (let tipo = 0; tipo < (await pestanas.count()); tipo += 1) {
    await pestanas.nth(tipo).click()
    const ejemplos = page.getByRole('button', { name: /EXAMPLE 0/ })
    for (let ejemplo = 0; ejemplo < (await ejemplos.count()); ejemplo += 1) {
      await ejemplos.nth(ejemplo).click()
      cuerpo += `\n${await page.locator('body').innerText()}`
    }
  }

  const respuestas = [
    ...CLOZE_DRILLS.map((drill) => `${drill.before} ${drill.gaps.map((gap) => gap.answer).join(' ')} ${drill.after}`),
    ...[...CHOICE_DRILLS, ...PRODUCTION_DRILLS].map((drill) => drill.options[drill.correct].text),
  ]
  for (const respuesta of respuestas) {
    expect(cuerpo, `esta respuesta ya está impresa en la página: «${respuesta.slice(0, 60)}…»`).not.toContain(respuesta)
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('el enunciado que se lee es el del gráfico que se pinta', async ({ page }) => {
  await page.goto(RUTA)

  /**
   * La lección pintaba `<Chart variant={exampleIndex} />` contra un texto escrito en otra
   * lista, y tres de los treinta ejemplos habían quedado desparejados: se leía «average
   * temperature in three cities» y en pantalla había un gráfico de visitas a la biblioteca.
   * El `aria-label` del SVG lleva el título real del gráfico, así que se puede comparar.
   */
  const lineas = WORKED.filter((item) => item.kind === 'line')
  for (const [posicion, ejemplo] of lineas.entries()) {
    await page.getByRole('button', { name: /EXAMPLE 0/ }).nth(posicion).click()
    // El SVG de LA TARJETA. Antes se leía el primero de la página, que es de otra sección:
    // el test pasaba por casualidad y la mordida lo destapó.
    const tarjeta = page.locator('article').filter({ hasText: 'IELTS reference visual' })
    const titulo = await tarjeta.locator('svg[role="img"]').first().getAttribute('aria-label')
    const clave = titulo!.toLowerCase().split(/[,(]/)[0].split(' ').filter((palabra) => palabra.length > 4)
    const enunciado = ejemplo.prompt.toLowerCase()
    const encajan = clave.filter((palabra) => enunciado.includes(palabra.replace(/s$/, ''))).length
    expect(encajan, `el ejemplo dice «${ejemplo.prompt.slice(0, 50)}…» y en pantalla hay «${titulo}»`).toBeGreaterThanOrEqual(2)
  }
})

test('el botón dice cuántos huecos faltan, y no deja comprobar a medias', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator('section[aria-labelledby="task1-intro-practice"]')
  await motor.scrollIntoViewIfNeeded()

  const comprobar = motor.getByRole('button', { name: 'Check answer' })
  await expect(comprobar).toBeDisabled()
  await expect(motor.getByText('3 blanks still to fill')).toBeVisible()

  /**
   * El fallo de antes: `answers` se llenaba por índice, así que elegir PRIMERO el tercer
   * hueco dejaba `[vacío, vacío, 'x']` con longitud 3 y desbloqueaba el botón con dos huecos
   * sin tocar. Por eso aquí se empieza por el último.
   */
  const huecos = motor.locator('select')
  await huecos.nth(2).selectOption({ index: 1 })
  await expect(comprobar, 'con dos huecos vacíos no se puede comprobar').toBeDisabled()
  await expect(motor.getByText('2 blanks still to fill')).toBeVisible()

  await huecos.nth(0).selectOption({ index: 1 })
  await expect(motor.getByText('1 blank still to fill')).toBeVisible()
  await huecos.nth(1).selectOption({ index: 1 })
  await expect(comprobar).toBeEnabled()
})

test('al fallar se enseña la respuesta y el motivo de cada opción', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator('section[aria-labelledby="task1-intro-practice"]')
  await motor.scrollIntoViewIfNeeded()

  const drill = CLOZE_DRILLS[0]
  const huecos = motor.locator('select')
  // Se elige a propósito una opción mala en cada hueco.
  for (let slot = 0; slot < drill.gaps.length; slot += 1) {
    const malas = drill.gaps[slot].options.filter((option) => option.text !== drill.gaps[slot].answer)
    await huecos.nth(slot).selectOption(malas[0].text)
  }
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.getByText('Not yet.')).toBeVisible()
  // La frase entera y correcta, que antes no se enseñaba nunca.
  const completa = `${drill.before} ${drill.gaps.map((gap) => gap.answer).join(' ')} ${drill.after}`
  await expect(motor.getByText(completa, { exact: false })).toBeVisible()

  // Y el motivo de las NUEVE opciones, también las que no se eligieron.
  const motivos = drill.gaps.flatMap((gap) => gap.options.map((option) => option.why))
  expect(new Set(motivos).size, 'ningún motivo se repite').toBe(motivos.length)
  for (const motivo of motivos) {
    await expect(motor.getByText(motivo.slice(0, 45), { exact: false }).first()).toBeVisible()
  }
})

test('los tres niveles se recorren enteros y el marcador no pasa del total', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator('section[aria-labelledby="task1-intro-practice"]')
  await motor.scrollIntoViewIfNeeded()

  const totales = [CLOZE_DRILLS.length, CHOICE_DRILLS.length, PRODUCTION_DRILLS.length]

  /**
   * DOS vueltas, no una.
   *
   * Con una sola vuelta este test no probaba nada: cada ejercicio se contesta una vez y el
   * marcador sale bien aunque nadie lleve la cuenta de lo ya puntuado. El defecto —repetir el
   * motor infla el marcador hasta 8/4— solo aparece al volver a pasar. Lo descubrió la prueba
   * de mordida: quitar el control de duplicados dejaba el test en verde.
   */
  for (const vuelta of [1, 2]) {
    for (const [nivel, total] of totales.entries()) {
      await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).click()
      for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
        await expect(motor.getByText(`Exercise ${ejercicio + 1} of ${total}`)).toBeVisible()
        if (nivel === 0) {
          const huecos = motor.locator('select')
          for (let slot = 0; slot < (await huecos.count()); slot += 1) {
            // La buena es la única que aparece en las tres, así que se prueban todas.
            const opciones = await huecos.nth(slot).locator('option').allTextContents()
            const buena = opciones.indexOf(CLOZE_DRILLS[ejercicio].gaps[slot].answer)
            await huecos.nth(slot).selectOption({ index: buena })
          }
        } else {
          const banco = nivel === 1 ? CHOICE_DRILLS : PRODUCTION_DRILLS
          const buena = banco[ejercicio].options[banco[ejercicio].correct].text
          // El texto entero: dos opciones del nivel 2 comparten sus primeras 45 letras.
          await motor.getByRole('button').filter({ hasText: buena }).click()
        }
        await motor.getByRole('button', { name: /Check answer/ }).click()
        // Se acierta a propósito: es acertando dos veces como se infla un marcador sin tope.
        await expect(motor.getByText('Good observation.'), `vuelta ${vuelta}, nivel ${nivel + 1}, ejercicio ${ejercicio + 1}`).toBeVisible()
        await motor.getByRole('button', { name: /Next exercise|Next level|Start again/ }).click()
      }
    }
  }

  /** Dar la vuelta entera no puede dejar el marcador en 5/4: los aciertos se cuentan una vez. */
  for (const [nivel, total] of totales.entries()) {
    const etiqueta = await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).innerText()
    const marcador = etiqueta.match(/(\d+)\/(\d+)/)!
    expect(Number(marcador[1]), `nivel ${nivel + 1}: ${etiqueta}`).toBeLessThanOrEqual(total)
    expect(Number(marcador[2])).toBe(total)
  }
})

test('en móvil se recorre igual, todo en inglés y sin promesas de banda', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(RUTA)
  const motor = page.locator('section[aria-labelledby="task1-intro-practice"]')
  await motor.scrollIntoViewIfNeeded()
  await expect(motor.locator('select')).toHaveCount(CLOZE_DRILLS[0].gaps.length)

  /** El FAQ va en español a propósito; el contenido de IELTS, no. */
  const cuerpo = await page.locator('body').innerText()
  const sinFaq = cuerpo.split(/Preguntas frecuentes/i)[0]
  /**
   * Sin distinguir mayúsculas, a propósito: media página va en versalitas por CSS y
   * `innerText` devuelve el texto ya transformado. La primera versión de este test buscaba
   * «Enunciado» con mayúscula inicial y no veía «ENUNCIADO», que es como se pinta. La prueba
   * de mordida lo cazó.
   */
  expect(sinFaq, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
