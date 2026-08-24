import { expect, test } from '@playwright/test'

const ROUTE = '/herramientas/quizes/pronombres/italiano'

async function reset(page: import('@playwright/test').Page) {
  await page.goto(ROUTE)
  await page.evaluate(() => window.localStorage.removeItem('wl-italian-pronoun-quest-v1'))
  await page.goto(ROUTE)
}

async function configureFirstTopic(page: import('@playwright/test').Page) {
  await page.locator('section[aria-labelledby="pronoun-selector-title"] button[aria-pressed]').first().click()
  await page.getByRole('button', { name: /Crear mi quiz/ }).click()
}

test('el catálogo descubre la nueva familia y el piloto cabe en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/herramientas/quizes')
  await expect(page.getByRole('link', { name: /Quién hace qué a quién/ })).toBeVisible()
  await page.getByRole('link', { name: /Quién hace qué a quién/ }).click()
  await expect(page).toHaveURL(/\/herramientas\/quizes\/pronombres$/)
  await page.getByRole('link', { name: /La catena dei pronomi/ }).click()
  await expect(page.locator('#pronoun-selector-title')).toBeVisible()
  await expect(page.locator('main')).toHaveCount(1)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
})

test('no revela corrección antes de cerrar el nivel y restaura el intento', async ({ page }) => {
  await reset(page)
  await configureFirstTopic(page)
  await expect(page).toHaveURL(/topics=soggetto/)

  await page.locator('.wlp-option').first().click()
  await expect(page.getByText('Respuesta correcta:', { exact: false })).toHaveCount(0)
  await page.getByRole('button', { name: /Guardar y seguir/ }).click()
  await expect(page.getByText('2 / 3', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => {
    const raw = window.localStorage.getItem('wl-italian-pronoun-quest-v1')
    return raw ? JSON.parse(raw).attempt?.itemIndex : -1
  })).toBe(1)

  await page.reload()
  await expect(page.getByText('2 / 3', { exact: true })).toBeVisible()
  for (let index = 1; index < 3; index += 1) {
    await page.locator('.wlp-option').first().click()
    await page.getByRole('button', { name: index === 2 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')
  await expect(page.getByText('Respuesta correcta:', { exact: false }).first()).toBeVisible()
})

test('los seis niveles son cerrados y el banco individual conserva distractores', async ({ page }) => {
  await reset(page)
  await configureFirstTopic(page)
  await expect(page.locator('input, textarea')).toHaveCount(0)

  for (let level = 0; level < 5; level += 1) {
    await page.getByRole('tab').nth(level).click()
    await expect(page.locator('.wlp-option')).toHaveCount(4)
  }

  await page.getByRole('tab').nth(5).click()
  await expect(page.locator('button[aria-label^="Espacio "]')).toHaveCount(1)
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
  await expect(page.getByText('Hay tarjetas distractoras que no se usan.')).toBeVisible()
  await page.locator('button[aria-label^="Espacio "]').click()
  await page.locator('[class*="wordBank"] button').first().click()
  await page.getByRole('button', { name: /Terminar nivel/ }).click()
  await expect(page.getByRole('status')).toContainText('Nivel completado')
})

test('estado local y parámetros corruptos vuelven a una configuración segura', async ({ page }) => {
  await page.goto(`${ROUTE}?topics=no-existe&level=99`)
  await expect(page.locator('#pronoun-selector-title')).toBeVisible()

  await page.evaluate(() => window.localStorage.setItem('wl-italian-pronoun-quest-v1', JSON.stringify({
    attempt: { selectedTopics: ['soggetto'], activeLevel: 99, itemIndex: 999 },
  })))
  await page.goto(`${ROUTE}?topics=soggetto&level=99`)
  await expect(page.getByText('1 / 3', { exact: true })).toBeVisible()
  await expect(page.locator('.wlp-option')).toHaveCount(4)
})
