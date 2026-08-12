import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { VOCAB_FUNCTIONS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/academic-vocabulary/vocabulary-data'
import { ENGINE_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/academic-vocabulary/vocabulary-engine-data'

/**
 * Vocabulario académico — la segunda habilidad transversal de Task 2 con recorrido propio.
 *
 * Lo que estas pruebas defienden, además de que la unidad funcione:
 *
 *   · Que el comparador VAGO → PRECISO se vea. Es lo que David pidió —enseñar por qué el
 *     vocabulario preciso puntúa más— y es lo primero que se cae si alguien reordena la página.
 *   · Que ninguna página prometa una banda. La regla es de todo el curso y aquí es delicada,
 *     porque la unidad habla del criterio de Lexical Resource todo el rato.
 *   · Que el motor no pregunte por lo que la lección acaba de imprimir.
 */

const HUB = '/practica/ielts/academic/writing/task2/academic-vocabulary'
const MOTOR = 'section[aria-labelledby="vocabulary-engine"]'

const VACIAS = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'is', 'are', 'was', 'were', 'with', 'that', 'this', 'by', 'at', 'as', 'from', 'into', 'then', 'they', 'it', 'its', 'their', 'which', 'have', 'has', 'been', 'not', 'would', 'will', 'should', 'more', 'than', 'about'])
const carga = (texto: string) => new Set(
  texto.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').split(/\s+/u).filter((palabra) => palabra.length > 3 && !VACIAS.has(palabra)),
)

test('las ocho funciones tienen página propia, y cada una enseña vago frente a preciso', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(HUB)
  for (const item of VOCAB_FUNCTIONS) {
    await expect(page.getByRole('link', { name: new RegExp(item.label, 'i') }).first(), `el hub enlaza «${item.label}»`).toBeVisible()
  }

  for (const item of VOCAB_FUNCTIONS) {
    await page.goto(`${HUB}/${item.slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(item.label)

    // El comparador es la pieza que justifica la unidad entera: las dos versiones y el motivo.
    await expect(page.getByText(item.upgrade.vague).first()).toBeVisible()
    await expect(page.getByText(item.upgrade.precise).first()).toBeVisible()
    await expect(page.getByText(item.upgrade.why.slice(0, 40), { exact: false }).first()).toBeVisible()

    // Y el patrón de cada palabra, que es la mitad de lo que se enseña aquí.
    for (const word of item.words) {
      await expect(page.getByText(word.pattern.slice(0, 40), { exact: false }).first(), `${item.slug}: falta el patrón de «${word.text}»`).toBeVisible()
    }
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('ninguna frase del motor sale del texto de las ocho lecciones', async ({ page }) => {
  /**
   * Se recorren las ocho lecciones EN PANTALLA y se resta el motor: leer el `body` a secas
   * recoge sus opciones, que son las respuestas. Ese fallo apareció tres veces seguidas en
   * Task 1, con el test acusándose a sí mismo de la fuga que buscaba.
   */
  let leccion = ''
  for (const item of VOCAB_FUNCTIONS) {
    await page.goto(`${HUB}/${item.slug}`)
    leccion += `\n${await page.locator('body').innerText()}`
  }
  expect(leccion.length, 'las ocho lecciones tienen que traer texto').toBeGreaterThan(30_000)

  const enLaLeccion = carga(leccion)
  for (const drill of ENGINE_DRILLS) {
    const suyas = carga(drill.sentence)
    const dentro = [...suyas].filter((palabra) => enLaLeccion.has(palabra)).length / suyas.size
    expect(dentro, `el ${Math.round(dentro * 100)} % de «${drill.sentence.slice(0, 45)}…» ya está en las lecciones`).toBeLessThan(0.8)
  }
})

test('cada opción explica por qué falla ELLA, y ningún motivo se repite', async ({ page }) => {
  await page.goto(HUB)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  const drill = ENGINE_DRILLS.filter((item) => item.level === 1)[0]
  const mala = drill.options.find((_, index) => index !== drill.correct)!
  await motor.locator('[data-option]').filter({ hasText: mala.text }).click()
  await motor.getByRole('button', { name: 'Check answer' }).click()

  await expect(motor.locator('[role="status"] strong').first()).toHaveText('Not this one.')
  for (const option of drill.options) {
    await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
  }

  const motivos = [
    ...ENGINE_DRILLS.flatMap((item) => item.options.map((option) => option.why)),
    ...VOCAB_FUNCTIONS.flatMap((item) => item.drills.flatMap((d) => d.options.map((o) => o.why))),
  ]
  expect(new Set(motivos).size, 'hay motivos repetidos entre ejercicios').toBe(motivos.length)
})

test('los distractores se barajan y la correcta pasa por las cuatro posiciones', async ({ page }) => {
  await page.goto(HUB)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  let enOrden = 0
  const letras: string[] = []

  for (const nivel of [1, 2, 3] as const) {
    await motor.locator(`[data-level="${nivel}"]`).click()
    const banco = ENGINE_DRILLS.filter((item) => item.level === nivel)
    for (const [indice, drill] of banco.entries()) {
      const opciones = motor.locator('[data-option]')
      // Sin la guarda, un localizador vacío deja la comprobación pasando sin mirar nada.
      await expect(opciones, `nivel ${nivel} ejercicio ${indice + 1}`).toHaveCount(4)
      const textos = await opciones.allTextContents()
      const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
      expect(permutacion.every((valor) => valor >= 0), `nivel ${nivel} ejercicio ${indice + 1}: falta alguna opción`).toBe(true)

      /**
       * Se mide el ORDEN RELATIVO DE LOS DISTRACTORES, no la letra de la correcta: una
       * rotación reparte las letras perfectamente y aun así deja los distractores en el orden
       * en que están escritos. Ningún reparto de letras lo detectaría.
       */
      const distractores = permutacion.filter((valor) => valor !== drill.correct)
      const ordenados = [...distractores].sort((a, b) => a - b)
      if (distractores.every((valor, i) => valor === ordenados[i])) enOrden += 1
      letras.push('ABCD'[permutacion.indexOf(drill.correct)])

      await opciones.nth(permutacion.indexOf(drill.correct)).click()
      await motor.getByRole('button', { name: 'Check answer' }).click()
      await expect(motor.locator('[role="status"] strong').first()).toHaveText('Good work.')
      await motor.getByRole('button', { name: /Next exercise|Start this level again/ }).click()
    }
  }

  expect(enOrden, `${enOrden} de ${letras.length} conservan el orden escrito de los distractores`).toBeLessThanOrEqual(6)
  expect(new Set(letras).size, `solo salen ${[...new Set(letras)].join('')}: ${letras.join(' ')}`).toBe(4)
})

test('el último ejercicio del nivel lo dice, y el botón bloqueado explica por qué', async ({ page }) => {
  await page.goto(HUB)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()

  await expect(motor.getByRole('button', { name: 'Check answer' })).toBeDisabled()
  await expect(motor.getByText('Choose an option first')).toBeVisible()

  const total = ENGINE_DRILLS.filter((item) => item.level === 1).length
  for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
    await expect(motor.getByText(`Exercise ${ejercicio + 1} of ${total}`)).toBeVisible()
    await motor.locator('[data-option]').first().click()
    await motor.getByRole('button', { name: 'Check answer' }).click()
    const etiqueta = ejercicio === total - 1 ? 'Start this level again →' : 'Next exercise →'
    await expect(motor.getByRole('button', { name: etiqueta })).toBeVisible()
    await motor.getByRole('button', { name: etiqueta }).click()
  }
})

test('en móvil se recorre igual, en inglés y sin prometerle una banda a nadie', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })

  for (const ruta of [HUB, `${HUB}/register`, `${HUB}/hedging`]) {
    await page.goto(ruta)
    /**
     * Se restan los nombres en español de las funciones antes de medir, SIN distinguir
     * mayúsculas: `.promptChoice strong` lleva `text-transform: uppercase` y `innerText`
     * devuelve el texto ya transformado. Una resta sensible a mayúsculas no encuentra nada y
     * la comprobación acaba acusando a la etiqueta bilingüe que quería excluir.
     */
    let cuerpo = await page.locator('body').innerText()
    for (const item of VOCAB_FUNCTIONS) {
      const escapado = item.spanishName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
      cuerpo = cuerpo.replace(new RegExp(escapado, 'giu'), ' ')
    }

    expect(cuerpo, `queda español en ${ruta}`).not.toMatch(/\b(enunciado|ejercicio|respuesta|elige|escribe|palabra|frase)\b/i)
    // La regla más delicada de esta unidad: habla del criterio todo el rato y no puede
    // convertir eso en la promesa de una nota.
    expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)
  }

  await page.goto(HUB)
  const motor = page.locator(MOTOR)
  await motor.scrollIntoViewIfNeeded()
  await expect(motor.locator('[data-option]')).toHaveCount(4)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('la ficha de habilidades transversales de Task 2 lleva a esta unidad', async ({ page }) => {
  await page.goto('/practica/ielts/academic/writing/task2')
  await expect(page.getByRole('link', { name: /Academic vocabulary/ }).first()).toHaveAttribute('href', HUB)
})
