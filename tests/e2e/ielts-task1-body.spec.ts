import { expect, test } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { DRILLS } from '../../src/app/(site)/practica/ielts/academic/writing/task1/body-drills'

/**
 * Unidades 3 y 4 de Task 1 — Body 1 y Body 2.
 *
 * Las dos páginas son el mismo componente con `body={1}` y `body={2}`, así que se auditan a
 * la vez pero se recorren las dos: un fallo que solo aparezca en Body 2 tiene que salir.
 *
 * Lo que encontró la auditoría del 12 de agosto de 2026:
 *
 *   · El motor practicaba sobre **los seis gráficos que la lección resuelve encima**, y va
 *     dentro de esa misma lección: 5 de las 12 respuestas solapaban un párrafo modelo
 *     impreso a un palmo, una palabra por palabra.
 *   · Una sola explicación para las cuatro opciones.
 *   · `rotate()` desplazaba en ciclo en vez de repartir.
 *   · «Next exercise →» también en el último ejercicio del nivel: daba la vuelta en silencio.
 */

const RUTAS = { 1: '/practica/ielts/academic/writing/task1/body-1', 2: '/practica/ielts/academic/writing/task1/body-2' } as const

for (const body of [1, 2] as const) {
  const RUTA = RUTAS[body]
  const MOTOR = `section[aria-labelledby="task1-body-${body}-engine"]`

  test.describe(`Body ${body}`, () => {
    test('ninguna respuesta del motor está impresa en la lección', async ({ page }) => {
      const errores: string[] = []
      page.on('console', (message) => { if (message.type() === 'error') errores.push(message.text()) })

      await page.goto(RUTA)

      /**
       * La lección enseña un tipo de gráfico cada vez, con su párrafo modelo. Hay que
       * recorrer los seis: leer el `body` de entrada solo ve uno.
       */
      // Los seis tipos son `role="tab"` dentro de su tablist, no botones sueltos. Buscarlos
      // como botones devolvía cero y el bucle recorría la lección en vacío: lo caza la guarda.
      const tipos = page.getByRole('tablist', { name: new RegExp(`Body ${body} visual types`) }).getByRole('tab')
      const cuantos = await tipos.count()
      expect(cuantos, 'los seis tipos de gráfico de la lección').toBeGreaterThanOrEqual(6)

      let leccion = ''
      /** Los gráficos que la lección resuelve, leídos de la pantalla. */
      const graficosDeLaLeccion: string[] = []

      for (let tipo = 0; tipo < cuantos; tipo += 1) {
        await tipos.nth(tipo).click()
        // El enunciado que la lección enseña para este tipo. Es texto visible: más estable
        // que leer el `aria-label` del SVG, y basta para saber de qué gráfico se habla.
        const tarjeta = page.locator('article.wl-card').filter({ hasText: `MODEL BODY ${body}` })
        graficosDeLaLeccion.push((await tarjeta.locator('p').nth(1).innerText()).replace(/[“”"]/g, '').trim())
        // Solo la lección: el motor va en la misma página y sus opciones SON las respuestas.
        // La tarjeta del ejemplo guiado, que es donde vive el párrafo modelo.
        leccion += `\n${await page.locator('article.wl-card').filter({ hasText: `MODEL BODY ${body}` }).innerText()}`
      }
      expect(leccion.length, 'la lección recorrida tiene que traer texto').toBeGreaterThan(3_000)

      for (const drill of DRILLS[body]) {
        const respuesta = drill.options[drill.correct].text
        expect(leccion, `esta respuesta está impresa en la lección: «${respuesta.slice(0, 55)}…»`).not.toContain(respuesta)
      }

      /**
       * El PAR (gráfico, variante) lo vigila `check-ielts-task1-alignment.mjs`, no este test.
       *
       * Aquí la respuesta correcta es una estrategia —«agrupa los dos que suben»— y el
       * párrafo modelo de la lección la demuestra sin repetir una palabra, así que comparar
       * textos no puede cazar que el motor vuelva al gráfico de la lección. Lo destapó la
       * prueba de mordida. La comprobación exacta es sobre los datos, y allí está.
       */
      expect(graficosDeLaLeccion.filter(Boolean).length, 'los seis gráficos de la lección').toBe(cuantos)
    })

    test('cada opción explica por qué falla ELLA', async ({ page }) => {
      await page.goto(RUTA)
      const motor = page.locator(MOTOR)
      await motor.scrollIntoViewIfNeeded()

      const drill = DRILLS[body].filter((item) => item.level === 1)[0]
      const mala = drill.options.find((_, index) => index !== drill.correct)!
      await motor.getByRole('button').filter({ hasText: mala.text }).click()
      await motor.getByRole('button', { name: 'Check answer' }).click()

      await expect(motor.getByText('Not yet.')).toBeVisible()
      for (const option of drill.options) {
        await expect(motor.getByText(option.why.slice(0, 45), { exact: false }).first()).toBeVisible()
      }

      const motivos = DRILLS[body].flatMap((item) => item.options.map((option) => option.why))
      expect(new Set(motivos).size, 'hay motivos repetidos').toBe(motivos.length)
    })

    test('las opciones se barajan, no se rotan', async ({ page }) => {
      await page.goto(RUTA)
      const motor = page.locator(MOTOR)
      await motor.scrollIntoViewIfNeeded()

      /**
       * Una rotación reparte las letras perfectamente, así que mirar la letra no basta: lo
       * que una rotación NO cambia es el orden relativo de los distractores. Con cuatro
       * opciones, 4 de las 24 permutaciones son rotaciones, así que al barajar salen ~2 de 6.
       */
      let rotadas = 0
      const letras: string[] = []

      for (const nivel of [1, 2, 3] as const) {
        await motor.getByRole('button', { name: new RegExp(`Level ${nivel}`) }).click()
        const banco = DRILLS[body].filter((item) => item.level === nivel)
        for (const [indice, drill] of banco.entries()) {
          const opciones = motor.getByRole('button').filter({ hasText: /^[A-D]\. / })
          const textos = await opciones.allTextContents()
          const permutacion = textos.map((texto) => drill.options.findIndex((option) => texto.includes(option.text)))
          expect(permutacion.every((valor) => valor >= 0), `nivel ${nivel} ejercicio ${indice + 1}: falta alguna opción`).toBe(true)
          if (permutacion.every((valor, i) => valor === (permutacion[0] + i) % permutacion.length)) rotadas += 1
          letras.push('ABCD'[permutacion.indexOf(drill.correct)])

          await opciones.nth(permutacion.indexOf(drill.correct)).click()
          await motor.getByRole('button', { name: 'Check answer' }).click()
          await expect(motor.getByText('Good choice.')).toBeVisible()
          await motor.getByRole('button', { name: /Next exercise|Start this level again/ }).click()
        }
      }

      expect(rotadas, `${rotadas} de ${letras.length} conservan el orden de los distractores`).toBeLessThanOrEqual(3)
      expect(new Set(letras).size, `la respuesta solo cae en ${[...new Set(letras)].join('')}`).toBeGreaterThanOrEqual(3)
    })

    test('el último ejercicio del nivel lo dice, y el botón bloqueado explica por qué', async ({ page }) => {
      await page.goto(RUTA)
      const motor = page.locator(MOTOR)
      await motor.scrollIntoViewIfNeeded()

      await expect(motor.getByRole('button', { name: 'Check answer' })).toBeDisabled()
      await expect(motor.getByText('Choose an option first')).toBeVisible()

      const total = DRILLS[body].filter((item) => item.level === 1).length
      for (let ejercicio = 0; ejercicio < total; ejercicio += 1) {
        await expect(motor.getByText(`Exercise ${ejercicio + 1} of ${total}`)).toBeVisible()
        await motor.getByRole('button').filter({ hasText: /^[A-D]\. / }).first().click()
        await motor.getByRole('button', { name: 'Check answer' }).click()
        const etiqueta = ejercicio === total - 1 ? 'Start this level again →' : 'Next exercise →'
        await expect(motor.getByRole('button', { name: etiqueta })).toBeVisible()
        await motor.getByRole('button', { name: etiqueta }).click()
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

      const cuerpo = await page.locator('body').innerText()
      expect(cuerpo, 'queda español en el contenido de IELTS').not.toMatch(/\b(enunciado|bloque|ejercicio|respuesta|elige|escribe|párrafo)\b/i)
      expect(cuerpo, 'ninguna página puede prometer una banda').not.toMatch(/Band \d/)

      expect(erroresPropios(errores), errores.join('\n')).toEqual([])
    })
  })
}
