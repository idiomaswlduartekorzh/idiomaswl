import { expect, test } from '@playwright/test'

const ROUTES = [
  ['italiano', 'presente'],
  ['ingles', 'present-simple'],
  ['frances', 'present'],
  ['portugues', 'presente'],
  ['aleman', 'praesens'],
  ['ruso', 'present-imperfective'],
  ['japones', 'nonpast-affirmative'],
  ['coreano', 'present-polite'],
] as const

for (const [route, form] of ROUTES) {
  test(`${route}: revisión muestra respuestas, seis niveles y producción final`, async ({ page }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))
    await page.goto(`/herramientas/quizes/${route}?forms=${form}&level=1&review=1`)
    await expect(page.locator('[data-quest-hydrated="true"]')).toBeVisible()

    await expect(page.getByRole('tab')).toHaveCount(6)
    for (const tab of await page.getByRole('tab').all()) await expect(tab).toContainText('Revisión')
    await expect(page.getByRole('note')).toContainText('las respuestas están precargadas')
    await expect(page.locator('.wlp-option[aria-pressed="true"]')).toHaveCount(1)

    await page.getByRole('tab').nth(1).dispatchEvent('click')
    const microAnswers = await page.getByRole('textbox').evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value))
    expect(microAnswers.length).toBeGreaterThan(0)
    expect(microAnswers.every((answer: string) => answer.trim().length > 0)).toBe(true)

    await page.getByRole('tab').nth(2).dispatchEvent('click')
    const sceneAnswers = await page.getByRole('textbox').evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value))
    expect(sceneAnswers.length).toBeGreaterThan(0)
    expect(sceneAnswers.every((answer: string) => answer.trim().length > 0)).toBe(true)

    await page.getByRole('tab').nth(3).dispatchEvent('click')
    await expect(page.locator('[class*="errorToken"]')).toHaveCount(0)
    await expect(page.getByLabel('Forma que está mal')).not.toHaveValue('')
    await expect(page.getByLabel('Forma corregida')).not.toHaveValue('')

    await page.getByRole('tab').nth(4).dispatchEvent('click')
    if (route === 'aleman') {
      await expect(page.getByLabel('Escribe la oración completa')).not.toHaveValue('')
    } else {
      await expect(page.getByText('Uno de los elementos es el verbo en forma base: conjúgalo según el contexto y ordena las demás piezas para escribir la oración completa.')).toBeVisible()
      await expect(page.getByRole('textbox')).not.toHaveValue('')
      await expect(page.getByText('Respuesta completada para revisión')).toBeVisible()
      await expect(page.getByText(/ordered narrative|reconstruct the sequence/i)).toHaveCount(0)
      await expect(page.locator('select')).toHaveCount(0)
    }

    await page.getByRole('tab').nth(5).dispatchEvent('click')
    const finalFields = page.getByRole('textbox')
    expect(await finalFields.count()).toBeGreaterThanOrEqual(10)
    const finalAnswers = await finalFields.evaluateAll((inputs) => inputs.map((input) => (input as HTMLInputElement).value))
    expect(finalAnswers.every((answer: string) => answer.trim().length > 0)).toBe(true)
    expect(pageErrors).toEqual([])
  })
}

test('la práctica mixta oculta las etiquetas, mezcla los tiempos y limita el recorrido', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=present-perfect%2Cpast-continuous&level=1')
  await expect(page.locator('[data-quest-hydrated="true"]')).toBeVisible()

  const panel = page.locator('article[role="tabpanel"]')
  await expect(panel).toContainText('CONTRASTE ENTRE FORMAS')
  await expect(panel).toContainText('Decisión en contexto 1')
  await expect(panel).toContainText('1 / 12')
  await expect(panel).not.toContainText(/Present perfect/i)
  await expect(panel).not.toContainText(/Past continuous/i)
  await expect(panel).toContainText('Elige la opción que encaja con el significado y las pistas del contexto.')

  for (let level = 0; level < 5; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('12 retos')
  }
  await expect(page.getByRole('tab').nth(5)).toContainText('2 retos')
})
