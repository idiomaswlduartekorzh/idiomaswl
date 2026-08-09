import { expect, test, type Locator } from '@playwright/test'
import { INGLES_A1 } from '../../src/data/practica/vocabulario/ingles-a1'
import { ahuecar } from '../../src/data/practica/vocabulario/ejercicios'
import type { VocabEntry } from '../../src/data/practica/vocabulario/schema'

/**
 * Auditoría de vocabulario en navegador — la segunda pasada.
 *
 * El validador de Node mide el conjunto y ejecuta la lógica; esto hace clic. La diferencia
 * importa: el sesgo de la respuesta siempre en la segunda opción vivía en el JSX y el
 * validador no lo veía, y el atasco de la caja 5 —«we are friends» premiado y suspendido a la
 * vez— solo apareció cuando una persona se quedó encallada ahí.
 *
 * Por eso estos tests atacan en vez de comprobar que la página carga: fallan a propósito,
 * copian el chunk que la propia ficha imprime, escriben la palabra suelta. Lo que se afirma
 * al final es que **no hay manera de quedarse sin salida**.
 */

const BLOQUE = INGLES_A1.bloques[0]
const RUTA = `/practica/ingles/a1/vocabulario/${BLOQUE.id}`

/** Botones que son acciones, no respuestas. */
const ACCIONES = new Set(['Salir', 'Siguiente', 'Reintentar', 'Comprobar', 'Corregir', '🔊 Escuchar'])

const porLemma = new Map(BLOQUE.entradas.map((e) => [e.lemma, e]))

/**
 * El veredicto, y solo el veredicto.
 *
 * Un `/^✓/` a secas casaba también con «✓ Usaste el chunk…», que es el elogio y no el
 * veredicto. Anclar al texto exacto evita confundir las dos cosas — que es justo la confusión
 * que producía el atasco cuando el motor felicitaba y suspendía a la vez.
 */
const VEREDICTO_BIEN = /^✓ (Dominada|Sube a la caja \d)/
const VEREDICTO_MAL = /^✗ (Todavía no|Era «)/

async function opciones(tarjeta: Locator): Promise<string[]> {
  const textos = await tarjeta.locator('button').allTextContents()
  return textos.map((t) => t.trim()).filter((t) => t && !ACCIONES.has(t))
}

/** Responde bien en la caja que toque. Devuelve qué caja era. */
async function responderBien(tarjeta: Locator, entrada: VocabEntry, caja: number) {
  if (caja === 1) {
    await tarjeta.getByRole('button', { name: entrada.es, exact: true }).click()
    return
  }
  if (caja === 5) {
    await tarjeta.locator('textarea').fill(`${entrada.lemma} matters to me today`)
  } else if (caja === 4) {
    const hueco = ahuecar(entrada.ejemplo.target, entrada.lemma)
    await tarjeta.locator('input').fill(hueco ? hueco.forma : entrada.lemma)
  } else {
    await tarjeta.locator('input').fill(entrada.lemma)
  }
  await tarjeta.getByRole('button', { name: 'Comprobar' }).click()
}

async function entrarEnLaUnidad(page: import('@playwright/test').Page) {
  await page.goto(RUTA)
  await page.getByRole('button', { name: /Estudiar esta unidad/ }).first().click()
  await expect(page.locator('[data-testid="ejercicio"]')).toBeVisible()
}

// ─────────────────────────────────────────────────────────────────────────────

test('cada ficha declara de dónde sale su ejemplo y traduce sus chunks', async ({ page }) => {
  await page.goto(RUTA)

  const fichas = page.locator('article')
  await expect(fichas).toHaveCount(BLOQUE.entradas.length)

  const problemas = await fichas.evaluateAll((nodos) =>
    nodos.flatMap((n) => {
      const texto = n.textContent ?? ''
      const titulo = n.querySelector('h3')?.textContent?.trim() ?? '(sin título)'
      const fallos: string[] = []
      // Sello de procedencia: escucha, lectura o redactado. Nunca en blanco.
      if (!/🎧 ep\d+|📄 lectura|✎ redactado/.test(texto)) {
        fallos.push(`${titulo}: sin sello de procedencia`)
      }
      // Cada chunk lleva su traducción detrás de un guion largo.
      const chunks = [...n.querySelectorAll('li')]
      if (chunks.length === 0) fallos.push(`${titulo}: sin colocaciones`)
      for (const li of chunks) {
        if (!(li.textContent ?? '').includes(' — ')) {
          fallos.push(`${titulo}: colocación sin traducir «${li.textContent}»`)
        }
      }
      return fallos
    }),
  )

  expect(problemas, problemas.join('\n')).toEqual([])
})

test('fallar en la caja 1 dice el significado, no la palabra, y devuelve a la caja 1', async ({ page }) => {
  await entrarEnLaUnidad(page)

  const tarjeta = page.locator('[data-testid="ejercicio"]')
  const lemma = await tarjeta.getAttribute('data-lemma')
  const entrada = porLemma.get(lemma!)!

  // Ataque: elegir a propósito una opción que no es.
  const equivocada = (await opciones(tarjeta)).find((o) => o !== entrada.es)!
  await tarjeta.getByRole('button', { name: equivocada, exact: true }).click()

  const veredicto = tarjeta.getByText(VEREDICTO_MAL)
  await expect(veredicto).toBeVisible()

  // La pregunta era el significado: responder «Era «father»» contesta a otra pregunta.
  await expect(veredicto).toContainText(entrada.es)
  await expect(veredicto).not.toContainText(`«${entrada.lemma}»`)

  await tarjeta.getByRole('button', { name: 'Reintentar' }).click()
  await expect(page.locator('[data-testid="ejercicio"]')).toHaveAttribute('data-caja', '1')
})

test('la escalera entera: cinco cajas, ortografía, sin callejones, y termina en el cierre', async ({ page }) => {
  test.slow()
  await entrarEnLaUnidad(page)

  const tarjeta = page.locator('[data-testid="ejercicio"]')
  const cajasVistas = new Set<string>()
  const variantesVistas = new Set<string>()
  const posicionesCorrectas: number[] = []
  /**
   * Los ataques se hacen de uno en uno, y cada uno cuesta una vuelta entera.
   *
   * Fallar devuelve la palabra a la caja 1 —así está diseñado— así que no se pueden encadenar
   * dos ataques en la misma visita a la caja 5: tras el primero ya no hay caja 5 donde seguir.
   * Se ataca una vez por visita y se deja que la escalera la traiga de vuelta.
   */
  const ataquesPendientes = ['palabra-suelta', 'chunk-copiado'] as const
  const ataquesHechos: string[] = []

  for (let paso = 0; paso < 90; paso += 1) {
    if ((await tarjeta.count()) === 0) break

    const caja = (await tarjeta.getAttribute('data-caja'))!
    const lemma = (await tarjeta.getAttribute('data-lemma'))!
    const entrada = porLemma.get(lemma)!
    cajasVistas.add(caja)

    if (caja === '2') variantesVistas.add((await tarjeta.getAttribute('data-variante')) ?? 'inicial')
    if (caja === '1') posicionesCorrectas.push((await opciones(tarjeta)).indexOf(entrada.es))

    const chunk = ('colocaciones' in entrada.extra ? entrada.extra.colocaciones : [])
      .map((c) => c.chunk.replace(/[…().]/g, ' ').replace(/\s+/g, ' ').trim())
      .find((c) => c.split(' ').length >= 3)
    const toca = ataquesPendientes.find((a) => !ataquesHechos.includes(a))

    if (caja === '5' && toca === 'palabra-suelta') {
      // La palabra suelta no es producir, es copiar.
      ataquesHechos.push('palabra-suelta')
      await tarjeta.locator('textarea').fill(entrada.lemma)
      await tarjeta.getByRole('button', { name: 'Comprobar' }).click()
      await expect(tarjeta.getByText(VEREDICTO_MAL)).toBeVisible()
      await expect(tarjeta.getByText(/no basta/)).toBeVisible()
    } else if (caja === '5' && toca === 'chunk-copiado' && chunk) {
      // Copiar el chunk que la propia ficha imprime tampoco vale. Y sobre todo: no puede
      // felicitar y suspender a la vez, que es exactamente como se producía el atasco.
      ataquesHechos.push('chunk-copiado')
      await tarjeta.locator('textarea').fill(chunk)
      await tarjeta.getByRole('button', { name: 'Comprobar' }).click()
      await expect(tarjeta.getByText(VEREDICTO_MAL)).toBeVisible()
      await expect(tarjeta.getByText(/chunk de la ficha/)).toBeVisible()
      await expect(tarjeta.getByText(/Usaste el chunk/)).toHaveCount(0)
    } else if (caja === '5' && chunk && ataquesHechos.length === ataquesPendientes.length) {
      // Y la salida que se le ofrece al estudiante tiene que funcionar de verdad.
      await tarjeta.locator('textarea').fill(`${chunk} every single day`)
      await tarjeta.getByRole('button', { name: 'Comprobar' }).click()
      await expect(tarjeta.getByText(VEREDICTO_BIEN)).toBeVisible()
    } else {
      await responderBien(tarjeta, entrada, Number(caja))
    }

    // Una sola espera por paso: se pulsa lo que haya salido, avance o reintento.
    await tarjeta.getByRole('button', { name: /^(Siguiente|Reintentar)$/ }).click()
  }

  expect(ataquesHechos, 'no se llegó a atacar la caja 5').toEqual([...ataquesPendientes])

  // La escalera tiene cinco peldaños y hay que haberlos pisado todos.
  expect([...cajasVistas].sort()).toEqual(['1', '2', '3', '4', '5'])

  // La caja 2 alterna: si siempre pidiera lo mismo, se aprende el formato y no la palabra.
  expect(variantesVistas.size, `variantes de la caja 2 vistas: ${[...variantesVistas]}`).toBeGreaterThan(1)

  // Y la correcta no puede caer siempre en el mismo sitio: se acertaría por posición.
  expect(new Set(posicionesCorrectas).size, `posiciones: ${posicionesCorrectas}`).toBeGreaterThan(1)

  // Termina en el cierre de unidad, no en una pantalla muerta.
  await expect(page.getByText(/llegaron a la caja 5/)).toBeVisible()
  await expect(page.getByText(/DICTADO|ESCRITURA · Cierre/)).toBeVisible()
})
