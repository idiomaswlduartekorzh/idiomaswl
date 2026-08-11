import { expect, test, type Locator, type Page } from '@playwright/test'
import { INGLES_A1 } from '../../src/data/practica/vocabulario/ingles-a1'
import { ahuecar } from '../../src/data/practica/vocabulario/ejercicios'
import type { VocabBlock, VocabEntry, VocabLevel } from '../../src/data/practica/vocabulario/schema'

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
 *
 * Se recorren **todos los bloques del nivel**, no solo el primero. La versión anterior estaba
 * fijada a `bloques[0]` y eso dejaba el contenido nuevo sin cubrir: un bloque puede pasar el
 * validador de Node y aun así no tener ni un chunk de tres palabras con el que salir de la
 * caja 5. Eso solo se ve jugándolo.
 */

const NIVEL: VocabLevel = INGLES_A1
const rutaDe = (b: VocabBlock) => `/practica/${NIVEL.lang}/${NIVEL.nivel}/vocabulario/${b.id}`

/** Botones que son acciones, no respuestas. */
const ACCIONES = new Set(['Salir', 'Siguiente', 'Reintentar', 'Comprobar', 'Corregir', '🔊 Escuchar'])

/**
 * El veredicto, y solo el veredicto.
 *
 * Un `/^✓/` a secas casaba también con «✓ Usaste el chunk…», que es el elogio y no el
 * veredicto. Anclar al texto exacto evita confundir las dos cosas — que es justo la confusión
 * que producía el atasco cuando el motor felicitaba y suspendía a la vez.
 */
const VEREDICTO_BIEN = /^✓ (Guardada|Sube a la caja \d)/
const VEREDICTO_MAL = /^✗ (Todavía no|Era «)/

async function opciones(tarjeta: Locator): Promise<string[]> {
  const textos = await tarjeta.locator('button').allTextContents()
  return textos.map((t) => t.trim()).filter((t) => t && !ACCIONES.has(t))
}

/** Responde bien en la caja que toque. */
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

async function entrarEnLaUnidad(page: Page, bloque: VocabBlock) {
  await page.goto(rutaDe(bloque))
  await page.getByRole('button', { name: /Estudiar esta unidad/ }).first().click()
  await expect(page.locator('[data-testid="ejercicio"]')).toBeVisible()
}

/** El chunk con el que un estudiante podría salir de la caja 5, si lo hay. */
function chunkLargo(entrada: VocabEntry): string | undefined {
  return ('colocaciones' in entrada.extra ? entrada.extra.colocaciones : [])
    .map((c) => c.chunk.replace(/[…().]/g, ' ').replace(/\s+/g, ' ').trim())
    .find((c) => c.split(' ').length >= 3)
}

// ─────────────────────────────────────────────────────────────────────────────

for (const BLOQUE of NIVEL.bloques) {
  const porLemma = new Map(BLOQUE.entradas.map((e) => [e.lemma, e]))

  test.describe(`${NIVEL.lang}/${NIVEL.nivel} · ${BLOQUE.nombre}`, () => {
    test('cada ficha declara de dónde sale su ejemplo y traduce sus chunks', async ({ page }) => {
      await page.goto(rutaDe(BLOQUE))

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
      await entrarEnLaUnidad(page, BLOQUE)

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

    /**
     * La respuesta no puede estar impresa mientras se pide producirla.
     *
     * La fila de progreso pintaba los diez lemas, con el actual marcado en rojo. La caja 3
     * decía «escríbela sin ayuda» y la tenía encima. Las dos cajas de producción no pedían
     * nada y el motor felicitaba igual. Lo encontró una persona haciendo de estudiante; el
     * validador de Node no podía verlo porque el dato estaba bien y lo que fallaba era la
     * pantalla — exactamente el mismo patrón que el sesgo de la letra B.
     */
    test('en las cajas de producción la palabra no aparece escrita en ninguna parte', async ({ page }) => {
      await entrarEnLaUnidad(page, BLOQUE)

      const tarjeta = page.locator('[data-testid="ejercicio"]')

      // La caja 1 es de reconocer: ahí el lema SÍ se muestra, es la pregunta.
      await responderBien(tarjeta, porLemma.get((await tarjeta.getAttribute('data-lemma'))!)!, 1)
      await tarjeta.getByRole('button', { name: /^(Siguiente|Reintentar)$/ }).click()

      for (let paso = 0; paso < 40; paso += 1) {
        if ((await tarjeta.count()) === 0) break
        const caja = Number(await tarjeta.getAttribute('data-caja'))
        const lemma = (await tarjeta.getAttribute('data-lemma'))!
        const entrada = porLemma.get(lemma)!

        if (caja >= 2) {
          // El texto visible de la tarjeta no puede contener la palabra que se pide.
          // Se exceptúa la caja 2 con inicial, que enseña la primera letra a propósito.
          const visible = (await tarjeta.innerText()).toLowerCase()
          const variante = await tarjeta.getAttribute('data-variante')
          if (!(caja === 2 && variante === 'inicial')) {
            expect(
              visible.includes(lemma.toLowerCase()),
              `la caja ${caja} de «${lemma}» imprime la respuesta:\n${visible.slice(0, 400)}`,
            ).toBe(false)
          }
          return // con una caja de producción comprobada basta para cazar la regresión
        }

        await responderBien(tarjeta, entrada, caja)
        await tarjeta.getByRole('button', { name: /^(Siguiente|Reintentar)$/ }).click()
      }
    })

    test('la caja 5 no aprueba español ni una palabra que no es', async ({ page }) => {
      await entrarEnLaUnidad(page, BLOQUE)

      const tarjeta = page.locator('[data-testid="ejercicio"]')

      // Subir una palabra hasta la caja 5 por el camino corto.
      let entrada = porLemma.get((await tarjeta.getAttribute('data-lemma'))!)!
      for (let paso = 0; paso < 40; paso += 1) {
        const caja = Number(await tarjeta.getAttribute('data-caja'))
        entrada = porLemma.get((await tarjeta.getAttribute('data-lemma'))!)!
        if (caja === 5) break
        await responderBien(tarjeta, entrada, caja)
        await tarjeta.getByRole('button', { name: /^(Siguiente|Reintentar)$/ }).click()
      }

      // Ataque: una frase en español que contiene la palabra inglesa.
      await tarjeta.locator('textarea').fill(`Yo uso ${entrada.lemma} todos los dias`)
      await tarjeta.getByRole('button', { name: 'Comprobar' }).click()
      await expect(tarjeta.getByText(VEREDICTO_MAL)).toBeVisible()
      await expect(tarjeta.getByText(/está en español/)).toBeVisible()
    })

    test('la escalera entera: cinco cajas, ortografía, sin callejones, y termina en el cierre', async ({ page }) => {
      test.slow()

      // Si ninguna entrada de la unidad trae un chunk de tres palabras, el ataque de copiar el
      // chunk no se puede montar y la salida que el motor le ofrece al estudiante tampoco
      // existe. Es un defecto del bloque, no una excusa para saltarse el test.
      const conChunk = BLOQUE.entradas.slice(0, 10).filter((e) => chunkLargo(e))
      expect(
        conChunk.length,
        `la primera unidad de «${BLOQUE.nombre}» no tiene ni un chunk de tres palabras: ` +
          `no hay con qué salir de la caja 5`,
      ).toBeGreaterThan(0)

      await entrarEnLaUnidad(page, BLOQUE)

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

        const chunk = chunkLargo(entrada)
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
          await expect(tarjeta.getByText(/combinación que imprime la ficha/)).toBeVisible()
          await expect(tarjeta.getByText(/Usaste la combinación/)).toHaveCount(0)
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
  })
}
