import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { PARAPHRASE_TECHNIQUES } from '../../src/app/(site)/practica/ielts/academic/writing/task2/paraphrasing/paraphrasing-data'
import { GUIDED } from '../../src/app/(site)/practica/ielts/academic/writing/task2/paraphrasing/paraphrasing-explainers'
import { ENGINE_DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task2/paraphrasing/paraphrasing-engine-data'

/**
 * Paráfrasis — la primera habilidad transversal de Task 2 con recorrido propio.
 *
 * La unidad se construyó para no repetir los defectos que la auditoría de agosto de 2026
 * encontró en las ocho unidades de Task 1, así que estas pruebas comprueban justo eso: que la
 * lección no dé las respuestas del motor, que cada opción explique por qué falla ELLA, y que
 * los distractores se barajen de verdad en vez de rotar.
 */

const HUB = '/practica/ielts/academic/writing/task2/paraphrasing'
const MOTOR = 'section[aria-labelledby="paraphrasing-engine"]'

/** Palabras sin carga: no dicen nada sobre si dos frases son la misma. */
const VACIAS = new Set(['the', 'a', 'an', 'of', 'in', 'on', 'for', 'and', 'or', 'to', 'is', 'are', 'was', 'were', 'with', 'that', 'this', 'by', 'at', 'as', 'from', 'into', 'then', 'before', 'after', 'they', 'it', 'its', 'their', 'which', 'have', 'has', 'been', 'not', 'would', 'will', 'should'])
const carga = (texto: string) => new Set(
  texto.toLowerCase().replace(/[^a-z0-9\s]/gu, ' ').split(/\s+/u).filter((palabra) => palabra.length > 3 && !VACIAS.has(palabra)),
)

test('las cinco técnicas tienen página propia y el hub lleva a todas', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.goto(HUB)

  for (const technique of PARAPHRASE_TECHNIQUES) {
    const ficha = page.getByRole('link', { name: new RegExp(technique.label, 'i') }).first()
    await expect(ficha, `el hub tiene que enlazar «${technique.label}»`).toBeVisible()
  }

  for (const technique of PARAPHRASE_TECHNIQUES) {
    await page.goto(`${HUB}/${technique.slug}`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText(technique.label)
    /**
     * El recorrido completo, no una página que solo salta al quiz.
     *
     * `.first()` porque en `word-form` la frase de la mecánica es también la del primer
     * ejemplo resuelto —la mecánica la presenta y el ejemplo la desglosa— y el modo estricto
     * de Playwright falla ante dos coincidencias. Lo que se comprueba es que esté, no cuántas
     * veces.
     */
    await expect(page.getByText(technique.howItWorks.rewritten).first()).toBeVisible()
    await expect(page.getByRole('heading', { name: /Which one still says the same thing/ })).toBeVisible()
    await expect(page.getByText(technique.mistakes[0].wrong).first()).toBeVisible()
  }

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('cada técnica trae los cuatro bloques del blueprint, y en orden', async ({ page }) => {
  /**
   * El orden es la mitad del blueprint. David lo pidió así: «primero explicación larga y
   * detallada, luego ejemplos, luego ejercicio guiado y luego el motor». Una página que
   * tuviera los cuatro bloques desordenados —el motor antes de la explicación— pasaría una
   * comprobación de presencia y seguiría enseñando al revés.
   */
  const BLOQUES = [
    ['1 · explicación larga', 'the long version'],
    ['1 · qué cuesta saltárselo', 'What it costs you to skip'],
    ['1 · dónde deja de aplicar', 'Where it stops applying'],
    ['2 · ejemplos', 'the move in two sentences'],
    ['3 · ejercicio guiado', 'with the scaffolding on'],
    ['4 · motor, reconocer', 'step 1, the meaning'],
    ['4 · motor, producir', 'step 2, production'],
  ] as const

  for (const technique of PARAPHRASE_TECHNIQUES) {
    await page.goto(`${HUB}/${technique.slug}`)
    const cuerpo = (await page.locator('body').innerText()).toLowerCase()

    const posiciones: number[] = []
    for (const [nombre, aguja] of BLOQUES) {
      const donde = cuerpo.indexOf(aguja.toLowerCase())
      expect(donde, `${technique.slug}: falta el bloque «${nombre}»`).toBeGreaterThanOrEqual(0)
      posiciones.push(donde)
    }
    const ordenadas = [...posiciones].sort((a, b) => a - b)
    expect(posiciones, `${technique.slug}: los bloques salen desordenados`).toEqual(ordenadas)

    // «Larga y detallada» se mide. Una definición de dos párrafos no es una lección.
    const palabras = cuerpo.split(/\s+/u).filter(Boolean).length
    expect(palabras, `${technique.slug}: solo ${palabras} palabras en toda la página`).toBeGreaterThan(1500)
  }
})

test('el ejercicio guiado no enseña el modelo hasta que escribes, y abre los pasos en orden', async ({ page }) => {
  await page.goto(`${HUB}/synonyms`)
  const guiado = page.locator('#guided')
  await guiado.scrollIntoViewIfNeeded()

  const pasos = guiado.locator('[data-step]')
  await expect(pasos, 'el guiado tiene que traer sus pasos').toHaveCount(GUIDED.synonyms.steps.length)

  // El paso 1 abierto, el 2 cerrado: sin su área de escritura hasta que el anterior se resuelva.
  await expect(pasos.nth(0).locator('textarea')).toBeVisible()
  await expect(pasos.nth(1).locator('textarea')).toHaveCount(0)

  const boton = pasos.nth(0).getByRole('button', { name: /Compare with the model/ })
  await expect(boton, 'sin escribir nada, no se puede comparar').toBeDisabled()
  await expect(pasos.nth(0).getByText(/more word.* before you can compare/)).toBeVisible()

  // En el examen no hay corrector, ni autocorrección, ni mayúsculas automáticas.
  await expect(pasos.nth(0).locator('textarea')).toHaveAttribute('spellcheck', 'false')

  // Escribir poco no basta: el mínimo es el andamio entero.
  await pasos.nth(0).locator('textarea').fill('too short')
  await expect(boton, 'dos palabras no desbloquean nada').toBeDisabled()

  await pasos.nth(0).locator('textarea').fill('I would leave the topic words alone because replacing them would narrow it')
  await expect(boton).toBeEnabled()
  await boton.click()

  await expect(guiado.getByText(GUIDED.synonyms.steps[0].model.slice(0, 40), { exact: false })).toBeVisible()
  // Y solo entonces se abre el siguiente.
  await expect(pasos.nth(1).locator('textarea')).toBeVisible()
})

test('ninguna frase del motor sale del texto de las cinco lecciones', async ({ page }) => {
  /**
   * Se recorren las cinco lecciones EN PANTALLA y se resta el motor: leer el `body` a secas
   * recoge sus opciones, que son las respuestas. Ese fallo apareció en tres unidades de
   * Task 1 seguidas —el test acababa acusándose a sí mismo de la fuga que buscaba.
   */
  let leccion = ''
  for (const technique of PARAPHRASE_TECHNIQUES) {
    await page.goto(`${HUB}/${technique.slug}`)
    leccion += `\n${await page.locator('body').innerText()}`
  }
  expect(leccion.length, 'las cinco lecciones tienen que traer texto').toBeGreaterThan(20_000)

  const enLaLeccion = carga(leccion)

  /**
   * Por SOLAPAMIENTO de palabras, no por subcadena: «The flakes are heated and turned into
   * pellets» no es subcadena de «The flakes are then heated and turned into plastic pellets»,
   * y es la misma frase. Lo destapó una prueba de mordida en `procesos`.
   */
  for (const drill of ENGINE_DRILLS) {
    for (const frase of [drill.original, drill.rewrite].filter(Boolean) as string[]) {
      const suyas = carga(frase)
      const dentro = [...suyas].filter((palabra) => enLaLeccion.has(palabra)).length / suyas.size
      expect(dentro, `el ${Math.round(dentro * 100)} % de «${frase.slice(0, 45)}…» ya está en las lecciones`).toBeLessThan(0.8)
    }
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
    ...PARAPHRASE_TECHNIQUES.flatMap((item) => item.drills.flatMap((d) => d.options.map((o) => o.why))),
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
       * Se mide el ORDEN RELATIVO DE LOS DISTRACTORES, no la letra de la correcta.
       *
       * Una rotación reparte las letras perfectamente —al reintroducirla en `procesos` salió
       * DBACD BACDB ACDBA— y aun así deja los distractores en el orden en que están escritos.
       * Ningún reparto de letras lo habría detectado.
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

test('en móvil se recorre igual, en inglés y sin promesas de banda', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

  await page.setViewportSize({ width: 375, height: 812 })

  for (const ruta of [HUB, `${HUB}/voice`]) {
    await page.goto(ruta)
    /**
     * Se restan los nombres en español de las técnicas antes de medir.
     *
     * Las fichas del hub llevan «Synonyms · Parafrasear con sinónimos» a propósito, igual que
     * las siete familias de conectores llevan su `spanishName`: el contenido se aprende en
     * inglés y la etiqueta de navegación ayuda a un lector colombiano a saber dónde está. Lo
     * que este test busca es español colado en el CONTENIDO, que es otra cosa — la primera
     * versión no distinguía las dos y acusaba a la etiqueta bilingüe.
     */
    let cuerpo = await page.locator('body').innerText()
    /**
     * La resta va SIN distinguir mayúsculas.
     *
     * `.promptChoice strong` lleva `text-transform: uppercase`, y `innerText` devuelve el
     * texto YA TRANSFORMADO: lo que llega es «CAMBIAR LA ESTRUCTURA DE LA FRASE». Una resta
     * sensible a mayúsculas no encuentra nada y la comprobación acusa a la etiqueta bilingüe
     * que acaba de intentar excluir. Es el mismo tropiezo que dio «ENUNCIADO» en Task 1.
     */
    for (const technique of PARAPHRASE_TECHNIQUES) {
      const escapado = technique.spanishName.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&')
      cuerpo = cuerpo.replace(new RegExp(escapado, 'giu'), ' ')
    }

    expect(cuerpo, `queda español en ${ruta}`).not.toMatch(/\b(enunciado|ejercicio|respuesta|elige|escribe|frase|sinónimo|párrafo)\b/i)
    expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)
  }

  const motor = page.locator(MOTOR)
  await page.goto(HUB)
  await motor.scrollIntoViewIfNeeded()
  await expect(motor.locator('[data-option]')).toHaveCount(4)

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('la ficha de habilidades transversales de Task 2 lleva a esta unidad', async ({ page }) => {
  await page.goto('/practica/ielts/academic/writing/task2')
  const ficha = page.getByRole('link', { name: /Paraphrasing/ }).first()
  await expect(ficha).toHaveAttribute('href', HUB)
})
