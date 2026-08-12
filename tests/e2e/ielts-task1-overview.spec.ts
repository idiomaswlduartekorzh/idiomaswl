import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { OVERVIEWS, PRACTICE, WORKED } from '../../src/app/(site)/practica/ielts/academic/writing/task1/overview/overview-data'
import { LEVELS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/overview/overview-drills'

/**
 * Unidad 2 de Task 1 — el overview.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · 6 de las 15 respuestas del motor estaban impresas en la lección, dos palabra por palabra.
 *   · Una sola explicación para las cuatro opciones.
 *   · `rotateOptions` desplazaba en ciclo en vez de repartir: el orden relativo de los
 *     distractores se conserva y las secuencias de letras son fijas por nivel.
 *   · El marcador seguía sumando al dar la segunda vuelta.
 */

const RUTA = '/practica/ielts/academic/writing/task1/overview'
const MOTOR = 'section[aria-labelledby="task1-overview-practice"]'

test('ninguna respuesta del motor está impresa en la lección', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(RUTA)

  expect(OVERVIEWS.length, 'los 30 gráficos del Visual Lab').toBe(30)
  expect(WORKED.length, 'tres resueltos por tipo').toBe(18)
  expect(PRACTICE.length, 'dos por tipo para el motor').toBe(12)

  /**
   * Hay que recorrer la lección entera: enseña un tipo de gráfico y un ejemplo cada vez, así
   * que leer el `body` de entrada solo ve uno de los dieciocho.
   */
  let leccion = ''
  // El selector de tipo son botones, no pestañas: `getByRole('tab')` encontraba 3 —los
  // ejemplos— y el bucle recorría la lección equivocada. Lo destapó la guarda de abajo.
  const tipos = page.getByRole('button', { name: /^(Line graph|Bar chart|Pie chart|Table|Process diagram|Map)/ })
  const cuantosTipos = await tipos.count()
  // Sin esta guarda, un localizador que no encuentra nada deja `leccion` vacía y las
  // comprobaciones de abajo pasan sin haber mirado nada. Ya pasó una vez.
  expect(cuantosTipos, 'los seis tipos de gráfico').toBe(6)

  for (let tipo = 0; tipo < cuantosTipos; tipo += 1) {
    await tipos.nth(tipo).click()
    // Las pestañas se rotulan «01 · <lo que hay que ver>», no «Example N».
    const ejemplos = page.getByRole('tablist', { name: /^Examples of/ }).getByRole('tab')
    const cuantos = await ejemplos.count()
    expect(cuantos, `el tipo ${tipo + 1} tiene que enseñar tres ejemplos resueltos`).toBe(3)
    for (let ejemplo = 0; ejemplo < cuantos; ejemplo += 1) {
      await ejemplos.nth(ejemplo).click()
      /**
       * Solo LA LECCIÓN, no el `body`. Leyendo la página entera se recogían también las
       * opciones del motor, que son las respuestas: el test se acusaba a sí mismo.
       */
      leccion += `\n${await page.locator('article[role="tabpanel"]').innerText()}`
      leccion += `\n${await page.locator('.wl-card').filter({ hasText: 'Choose the correct overview' }).innerText()}`
    }
  }
  expect(leccion.length, 'la lección recorrida tiene que traer texto').toBeGreaterThan(10_000)

  for (const drill of LEVELS.flatMap((nivel) => nivel.items)) {
    const respuesta = drill.options[drill.correct].text
    expect(leccion, `esta respuesta ya está impresa en la lección: «${respuesta.slice(0, 60)}…»`).not.toContain(respuesta)
    // Y el modelo del gráfico sobre el que se practica tampoco puede estar arriba.
    expect(leccion, `el modelo de ${drill.source.kind} v${drill.source.variant} está impreso arriba`).not.toContain(drill.source.model)
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada opción explica por qué falla ELLA, y no se repite ningún motivo', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = LEVELS[0].items[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.getByRole('button').filter({ hasText: mala.text }).click()
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.getByText('Not yet.')).toBeVisible()
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }

  // Y el overview modelo completo, que antes solo estaba arriba y ahora se enseña aquí.
  await expect(motor.getByText(drill.source.model.slice(0, 50), { exact: false })).toBeVisible()

  const motivos = LEVELS.flatMap((nivel) => nivel.items).flatMap((item) => item.options.map((option) => option.why))
  expect(new Set(motivos).size, 'hay motivos repetidos entre ejercicios').toBe(motivos.length)
})

test('la respuesta no se queda en la misma letra ni sigue una secuencia', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  /**
   * Antes rotaba: `shift = [1,3,0,2][seed % 4]` con `seed = nivel * 5 + índice`. Una rotación
   * no baraja —conserva el orden relativo— y la secuencia de letras salía fija. Aquí se lee
   * la letra que ve el estudiante, no la que está escrita en los datos.
   */
  const letras: string[] = []
  /** Preguntas cuyo orden en pantalla es una rotación del orden escrito. */
  let rotadas = 0

  for (const [nivel, level] of LEVELS.entries()) {
    await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).click()
    for (const [indice, drill] of level.items.entries()) {
      const opciones = motor.getByRole('button').filter({ hasText: /^[A-D]\. / })
      const textos = await opciones.allTextContents()
      const posicion = textos.findIndex((texto) => texto.includes(drill.options[drill.correct].text))
      expect(posicion, `nivel ${nivel + 1} ejercicio ${indice + 1}: la correcta no está en pantalla`).toBeGreaterThanOrEqual(0)
      letras.push('ABCD'[posicion])

      /**
       * Y aquí lo que de verdad distingue barajar de rotar.
       *
       * La primera versión de este test solo miraba el reparto de letras, y la prueba de
       * mordida lo tumbó: al devolver la rotación cíclica, las quince letras salían
       * repartidísimas —DBACD BACDB ACDBA, las cuatro letras, tres secuencias distintas— y el
       * test pasaba tan contento. Una rotación reparte perfectamente. Lo que NO hace es
       * cambiar el orden relativo de los distractores: si el que inventa una causa siempre va
       * justo detrás de la buena, se aprende esa posición y ya está.
       */
      const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
      const esRotacion = permutacion.every((valor, i) => valor === (permutacion[0] + i) % permutacion.length)
      if (esRotacion) rotadas += 1
      await opciones.nth(posicion).click()
      await motor.getByRole('button', { name: 'Check answer' }).click()
      await expect(motor.getByText('Good observation.')).toBeVisible()
      await motor.getByRole('button', { name: /Next exercise|Next level/ }).click()
    }
  }

  const cuenta = new Map<string, number>()
  for (const letra of letras) cuenta.set(letra, (cuenta.get(letra) ?? 0) + 1)
  expect(new Set(letras).size, `solo salen ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBe(4)
  expect(Math.max(...cuenta.values()), `una letra domina: ${letras.join(' ')}`).toBeLessThanOrEqual(letras.length / 2)

  // Y las tres secuencias de cinco letras tienen que ser distintas entre sí.
  const secuencias = [0, 1, 2].map((nivel) => letras.slice(nivel * 5, nivel * 5 + 5).join(''))
  expect(new Set(secuencias).size, `dos niveles comparten secuencia: ${secuencias.join(' | ')}`).toBe(3)

  // Con cuatro opciones, 4 de las 24 permutaciones son rotaciones: al barajar salen ~2 de 15.
  // Rotando salen las 15. Ocho deja sitio de sobra al azar y no llega ni de lejos a rotar.
  expect(rotadas, `${rotadas} de ${letras.length} preguntas conservan el orden de los distractores`).toBeLessThanOrEqual(8)
})

test('el marcador no pasa del total aunque se den dos vueltas', async ({ page }) => {
  await page.goto(RUTA)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  for (const vuelta of [1, 2]) {
    for (const [nivel, level] of LEVELS.entries()) {
      await motor.getByRole('button', { name: new RegExp(`^${nivel + 1}\\.`) }).click()
      for (const drill of level.items) {
        await motor.getByRole('button').filter({ hasText: drill.options[drill.correct].text }).click()
        await motor.getByRole('button', { name: 'Check answer' }).click()
        await expect(motor.getByText('Good observation.'), `vuelta ${vuelta}`).toBeVisible()
        await motor.getByRole('button', { name: /Next exercise|Next level/ }).click()
      }
    }
  }

  for (const [nivel, level] of LEVELS.entries()) {
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

  // Sin distinguir mayúsculas: media página va en versalitas por CSS.
  const cuerpo = await page.locator('body').innerText()
  expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|nivel)\b/i)
  expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

  // Y el botón bloqueado dice por qué.
  await expect(motor.getByRole('button', { name: 'Check answer' })).toBeDisabled()
  await expect(motor.getByText('Choose an option first')).toBeVisible()

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})
