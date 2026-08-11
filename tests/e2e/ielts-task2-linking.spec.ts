import { expect, test, type Page } from '@playwright/test'
import { erroresPropios } from './consola-ajena'
import { LINKING_FAMILIES } from '../../src/app/(site)/practica/ielts/academic/writing/task2/linking-language/linking-data'
import { MIXED_QUIZ } from '../../src/app/(site)/practica/ielts/academic/writing/task2/linking-language/linking-mixed'
import { ENGINE_LEVELS, acceptedFor } from '../../src/app/(site)/practica/ielts/academic/writing/task2/linking-language/linking-engine-data'

/**
 * Linking language: el hub y las siete páginas de familia.
 *
 * La página era una sola que iba directa al quiz, con estilos sueltos que no se parecían al
 * resto de Task 2. David pidió las dos cosas: la estructura de las demás unidades —explicar,
 * ejemplos, ejercicios, motor— y que valiera para quien busca conectores en general, no solo
 * para IELTS. De ahí las siete URLs.
 *
 *   npx playwright test tests/e2e/ielts-task2-linking.spec.ts
 */

const HUB = '/practica/ielts/academic/writing/task2/linking-language'
const rutaDe = (slug: string) => `${HUB}/${slug}`

const escapar = (v: string) => v.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * El botón de opción incluye la letra: su nombre accesible es «A Furthermore».
 *
 * Anclar solo al final no basta: «either» es sufijo de «neither», así que `/either$/` casaba
 * con los dos botones de la familia correlativa. Hay que anclar el nombre entero.
 */
const nombreDeOpcion = (texto: string) => new RegExp(`^[A-D]\\s+${escapar(texto)}$`)

const porConector = (page: Page, texto: string) =>
  page.getByRole('button', { name: nombreDeOpcion(texto) })

/** Los botones de opción llevan la letra y el conector; se lee el texto sin la letra. */
async function opciones(page: Page, dentroDe = 'article') {
  const textos = await page.locator(`${dentroDe} button`).allInnerTexts()
  return textos.map((t) => t.replace(/^[A-D]\s*/, '').trim()).filter(Boolean)
}

test.describe('Hub de conectores', () => {
  test('presenta las siete familias con enlace propio', async ({ page }) => {
    await page.goto(HUB)
    for (const family of LINKING_FAMILIES) {
      const ficha = page.getByRole('link', { name: new RegExp(family.label) }).first()
      await expect(ficha).toBeVisible()
      await expect(ficha).toHaveAttribute('href', rutaDe(family.slug))
    }
  })

  test('el test mixto no promete ninguna banda al terminar', async ({ page }) => {
    await page.goto(HUB)
    // Se responde bien las ocho para llegar al final.
    for (const question of MIXED_QUIZ) {
      // Acotado al test mixto: sin acotar, /Next/ pesca también el botón «Open Next.js Dev
      // Tools» que el servidor de desarrollo inyecta en la página.
      const test = page.locator('#mixed-test')
      await test.getByRole('button', { name: nombreDeOpcion(question.correct) }).first().click()
      await test.getByRole('button', { name: /^(Next|See the result)$/ }).click()
    }
    await expect(page.getByText('8 of 8 right', { exact: false })).toBeVisible()
    const cuerpo = await page.locator('body').innerText()
    expect(/nivel Band|Band \d/i.test(cuerpo), 'quedó una promesa de banda').toBe(false)
    await expect(page.getByText('are one skill, not a band score', { exact: false })).toBeVisible()
  })
})

for (const family of LINKING_FAMILIES) {
  test.describe(`familia: ${family.slug}`, () => {
    test('explica, da ejemplos, nombra los errores y luego pone ejercicios', async ({ page }) => {
      await page.goto(rutaDe(family.slug))

      // 1. Qué señala esta familia, antes de cualquier ejercicio.
      await expect(page.getByRole('heading', { level: 1 })).toContainText(family.label)
      await expect(page.getByText(family.signals, { exact: false }).first()).toBeVisible()

      // 2. Cada conector, con su nota de uso: es lo que casi nunca se enseña.
      for (const connector of family.connectors) {
        await expect(page.getByText(connector.usage.slice(0, 45), { exact: false }).first()).toBeVisible()
      }

      // 3. Ejemplos resueltos y errores típicos con su reparación.
      for (const example of family.examples) {
        await expect(page.getByText(example.why.slice(0, 45), { exact: false }).first()).toBeVisible()
      }
      for (const mistake of family.mistakes) {
        await expect(page.getByText(mistake.right.slice(0, 40), { exact: false }).first()).toBeVisible()
      }

      // 4. Y sus tres ejercicios.
      await expect(page.getByRole('heading', { name: /Choose the connector the sentence actually needs/ })).toBeVisible()
    })


    test('explica la mecánica ANTES de pedir nada', async ({ page }) => {
      /**
       * David: «siento que asume muy rápido que la gente entiende… debería primero haber una
       * explicación de qué hace esta familia, conectar oraciones». Esto vigila ese orden:
       * la mecánica con sus dos frases va antes que cualquier ejercicio.
       */
      await page.goto(rutaDe(family.slug))

      await expect(page.getByRole('heading', { name: /A connector joins two sentences/ })).toBeVisible()
      await expect(page.getByText(family.howItWorks.first, { exact: false }).first()).toBeVisible()
      await expect(page.getByText(family.howItWorks.second, { exact: false }).first()).toBeVisible()
      await expect(page.getByText(family.howItWorks.plain.slice(0, 50), { exact: false }).first()).toBeVisible()

      // Y el orden en la página: mecánica → relación → conectores → ejercicios de palabra.
      const orden = await page.locator('h2').allInnerTexts()
      const iMecanica = orden.findIndex((t) => /A connector joins two sentences/.test(t))
      const iRelacion = orden.findIndex((t) => /Before the word, the direction/.test(t))
      const iPalabra = orden.findIndex((t) => /Choose the connector the sentence actually needs/.test(t))
      expect(iMecanica, 'la mecánica va primera').toBeGreaterThanOrEqual(0)
      expect(iRelacion, 'la relación va después de la mecánica').toBeGreaterThan(iMecanica)
      expect(iPalabra, 'la palabra va después de la relación').toBeGreaterThan(iRelacion)
    })

    test('el ejercicio de relación no ofrece conectores, sino frases', async ({ page }) => {
      await page.goto(rutaDe(family.slug))
      const taller = page.locator('#relationship [class*="guidedWorkshop"]')
      await expect(taller.getByText(family.continuation.stem, { exact: false }).first()).toBeVisible()

      // Se elige una que NO encaja: tiene que decir qué relación es en realidad.
      const noEncaja = family.continuation.options.find((o) => !o.fits)!
      await taller.getByRole('button', { name: new RegExp(escapar(noEncaja.text.slice(0, 40))) }).click()
      await expect(taller.getByText('That is a different relationship.')).toBeVisible()
      await expect(taller.getByText(noEncaja.why.slice(0, 40), { exact: false })).toBeVisible()

      // Y sigue viva: se puede acertar sin refrescar.
      const encaja = family.continuation.options.find((o) => o.fits)!
      await taller.getByRole('button', { name: new RegExp(escapar(encaja.text.slice(0, 40))) }).click()
      await expect(taller.getByText('That is the one.')).toBeVisible()
    })

    test('fallar dos veces explica qué señala el conector que elegiste', async ({ page }) => {
      await page.goto(rutaDe(family.slug))
      const drill = family.drills[0]
      const primerEjercicio = page.locator('#practice article').first()
      const disponibles = (await primerEjercicio.locator('button').allInnerTexts()).map((t) => t.replace(/^[A-D]\s*/, '').trim())
      const mala = disponibles.find((t) => t !== drill.correct && drill.options.includes(t))!

      await primerEjercicio.getByRole('button', { name: nombreDeOpcion(mala) }).click()
      await expect(primerEjercicio.getByText('Not that one — try again')).toBeVisible()
      await primerEjercicio.getByRole('button', { name: nombreDeOpcion(mala) }).click()

      await expect(primerEjercicio.getByText(`“${mala}” signals that`, { exact: false })).toBeVisible()
      // Y se puede reintentar sin refrescar.
      await primerEjercicio.getByRole('button', { name: /Try it again/ }).click()
      await primerEjercicio.getByRole('button', { name: nombreDeOpcion(drill.correct) }).click()
      await expect(primerEjercicio.getByText(`Correct — “${drill.correct}”`)).toBeVisible()
    })
  })
}

test('en móvil se recorre una familia entera y la consola queda limpia', async ({ page }) => {
  const errores: string[] = []
  page.on('console', (m) => { if (m.type() === 'error') errores.push(m.text()) })
  page.on('pageerror', (e) => errores.push(String(e)))

  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto(rutaDe('contrast'))
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.getByRole('link', { name: /All seven families/ }).click()
  await expect(page).toHaveURL(new RegExp(`${HUB}$`))

  expect(erroresPropios(errores), errores.join('\n')).toEqual([])
})

test('todo el contenido de las familias está en inglés', async ({ page }) => {
  for (const family of LINKING_FAMILIES.slice(0, 3)) {
    await page.goto(rutaDe(family.slug))
    const cuerpo = await page.locator('main, body').first().innerText()
    // El nombre en español solo puede salir en los metadatos, no en el cuerpo de la página.
    const espanol = cuerpo.match(/\b(Adición|Contraste|Concesión|Comparación|Pista|Correcto|Siguiente|Respuesta)\b/g)
    expect(espanol, `quedó español en ${family.slug}: ${espanol?.join(', ')}`).toBeNull()
  }
})

/**
 * El motor progresivo de seis niveles, en el hub.
 *
 * Lo que más importa vigilar es la regla que pidió David: «si escoge however y la reemplaza
 * por furthermore, las de la familia que sean plausibles también valen como acierto». Un
 * ejercicio que exige la palabra exacta enseña a adivinar la palabra, no la relación.
 */
/**
 * El motor progresivo: seis niveles, y todo dentro del párrafo.
 *
 * La primera versión sacaba los huecos a tarjetas «Gap 1 / Gap 2» debajo del texto, y el
 * nivel 5 pintaba de amarillo los conectores rotos —o sea, daba la respuesta—. David tumbó
 * las dos cosas. La segunda abría un cuadrito con una caja de texto dentro para escribir:
 * «no despliegas nada al hacer click, se escribe ahí directamente». También tumbada.
 * Estos tests vigilan que ninguna vuelva.
 */
test.describe('Motor progresivo', () => {
  const motor = (page: Page) => page.locator('#engine')
  const irANivel = async (page: Page, n: number) =>
    motor(page).getByRole('button', { name: new RegExp(`^${n} · `) }).click()

  test('los seis niveles se abren y cada uno pide algo distinto', async ({ page }) => {
    await page.goto(HUB)
    for (const nivel of ENGINE_LEVELS) {
      await irANivel(page, nivel.level)
      await expect(motor(page).getByRole('heading', { name: nivel.title })).toBeVisible()
      await expect(motor(page).getByText(nivel.instruction.slice(0, 45), { exact: false })).toBeVisible()
    }
  })

  test('el hueco vive DENTRO del texto: se pulsa y ahí mismo se elige', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 1)

    // Nada de tarjetas «Gap 1» debajo: solo el párrafo con su hueco.
    await expect(motor(page).getByText('Gap 1', { exact: true })).toHaveCount(0)
    const hueco = motor(page).getByRole('button', { name: 'The connector' })
    await expect(hueco).toHaveText('_______')

    await hueco.click()
    await motor(page).getByRole('button', { name: 'Furthermore', exact: true }).click()
    await expect(hueco).toHaveText('Furthermore')
    await motor(page).getByRole('button', { name: 'Check', exact: true }).click()
    await expect(motor(page).getByText('That works.')).toBeVisible()
  })

  test('la lista del hueco no se corta contra el borde del panel', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 1)
    const nivel = ENGINE_LEVELS[0] as Extract<typeof ENGINE_LEVELS[number], { kind: 'one-gap' }>

    /**
     * El panel llevaba `overflow: hidden` y recortaba la lista por abajo: «queda cortado».
     * La última opción es justo la que desaparecía, así que se elige esa.
     */
    await motor(page).getByRole('button', { name: 'The connector' }).click()
    const opciones = motor(page).locator('[aria-expanded="true"] + span button')
    await expect(opciones).toHaveCount(1 + nivel.decoys.length)
    await opciones.last().click()
    await expect(motor(page).getByRole('button', { name: 'The connector' })).not.toHaveText('_______')
  })

  test('nivel 4: dos huecos escribibles, y se juzgan los dos', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 4)
    const nivel = ENGINE_LEVELS[3] as Extract<typeof ENGINE_LEVELS[number], { kind: 'two-gaps' }>

    for (const [posicion, hueco] of nivel.gaps.entries()) {
      await motor(page).getByRole('textbox', { name: `Gap ${posicion + 1}` }).fill(hueco.best.toLowerCase())
    }
    await motor(page).getByRole('button', { name: 'Check both' }).click()
    await expect(motor(page).getByText('Both joins are right.')).toBeVisible()
  })

  test('nivel 2: se escribe DENTRO del hueco, sin desplegar nada', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 2)
    const nivel = ENGINE_LEVELS[1] as Extract<typeof ENGINE_LEVELS[number], { kind: 'one-gap' }>

    // El hueco es la caja de texto: ni botón que abra, ni «Put it in», ni encabezado.
    await expect(motor(page).getByRole('button', { name: 'The connector' })).toHaveCount(0)
    const hueco = motor(page).getByRole('textbox', { name: 'The connector' })
    await hueco.click()
    await expect(motor(page).getByRole('button', { name: 'Put it in' })).toHaveCount(0)

    // No el que escribió el redactor: OTRO de la misma familia.
    const alternativo = acceptedFor(nivel.family).find((c) => c !== nivel.best.toLowerCase())!
    await hueco.fill(alternativo)
    await motor(page).getByRole('button', { name: 'Check', exact: true }).click()
    await expect(motor(page).getByText('That works.')).toBeVisible()
  })

  test('nivel 2: un conector de otra familia no cuela, y dice cuáles valían', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 2)
    await motor(page).getByRole('textbox', { name: 'The connector' }).fill('furthermore')
    await motor(page).getByRole('button', { name: 'Check', exact: true }).click()
    await expect(motor(page).getByText('Not that relationship.')).toBeVisible()
    await expect(motor(page).getByText('Any of these would have worked:', { exact: false })).toBeVisible()
  })

  test('nivel 5: NO se ve cuáles están mal', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 5)

    /**
     * Los cuatro conectores tienen que verse idénticos. Antes los rotos iban en amarillo y el
     * bueno en azul: «ya me estás diciendo cuáles están mal, no tiene sentido».
     */
    const huecos = motor(page).getByRole('textbox', { name: 'Replace it with…' })
    await expect(huecos).toHaveCount(4)
    const clases = await huecos.evaluateAll((nodes) => nodes.map((n) => n.className))
    expect(new Set(clases).size, 'los cuatro conectores deben verse iguales').toBe(1)
  })

  test('nivel 5: se repara escribiendo encima, con cualquiera de la familia correcta', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 5)
    await expect(motor(page).getByText('0 of 3 repaired.')).toBeVisible()

    const hueco = motor(page).getByRole('textbox', { name: 'Replace it with…' }).first()
    await hueco.fill('moreover')
    await hueco.press('Enter')
    await expect(motor(page).getByText('1 of 3 repaired.')).toBeVisible()
  })

  test('nivel 5: tocar el que ya estaba bien lo dice, y no cuenta', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 5)
    const hueco = motor(page).getByRole('textbox', { name: 'Replace it with…' }).nth(3)
    await hueco.fill('overall')
    await hueco.press('Enter')
    await expect(motor(page).getByText('That one was already right.')).toBeVisible()
    await expect(motor(page).getByText('0 of 3 repaired.')).toBeVisible()
  })

  test('nivel 5: salir de un conector sin tocarlo no lo juzga', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 5)
    // Pasar por encima de uno correcto y salir no puede acusar de nada.
    await motor(page).getByRole('textbox', { name: 'Replace it with…' }).nth(3).click()
    await motor(page).getByRole('textbox', { name: 'Replace it with…' }).first().click()
    await expect(motor(page).getByText('That one was already right.')).toHaveCount(0)
  })

  test('nivel 6: al ordenar sale el párrafo corrido con su hueco dentro', async ({ page }) => {
    await page.goto(HUB)
    await irANivel(page, 6)
    const nivel = ENGINE_LEVELS[5] as Extract<typeof ENGINE_LEVELS[number], { kind: 'order' }>

    await expect(motor(page).getByRole('button', { name: 'The connector' })).toHaveCount(0)
    for (const card of [...nivel.cards].sort((a, b) => a.order - b.order)) {
      await motor(page).getByRole('button', { name: new RegExp(escapar(card.text.slice(0, 40))) }).click()
    }
    const hueco = motor(page).getByRole('button', { name: 'The connector' })
    await expect(hueco).toHaveText('_______')
    await hueco.click()
    await motor(page).getByRole('button', { name: nivel.best, exact: true }).click()
    await motor(page).getByRole('button', { name: 'Check the join' }).click()
    await expect(motor(page).getByText('That is the join.')).toBeVisible()
  })
})
