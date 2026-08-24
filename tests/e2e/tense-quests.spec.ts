import { expect, test } from '@playwright/test'

const ROUTES = ['italiano', 'ingles', 'frances', 'portugues', 'aleman', 'ruso', 'japones', 'coreano']

test('el catálogo comparte el sistema visual de Práctica y cabe en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/herramientas/quizes')

  await expect(page.locator('.wlp-page')).toBeVisible()
  await expect(page.locator('.wlp-card--path')).toHaveCount(9)
  await expect(page.locator('.wl-catalog-card')).toHaveCount(0)
  await expect(page.locator('main')).toHaveCount(1)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(1)
})

async function reset(page: import('@playwright/test').Page, route: string) {
  await page.goto(`/herramientas/quizes/${route}`)
  await page.evaluate(() => window.localStorage.clear())
  await page.reload()
}

async function configureFirstForm(page: import('@playwright/test').Page) {
  await page.locator('section[aria-labelledby="tense-selector-title"] button[aria-pressed]').first().click()
  await page.getByRole('button', { name: /Crear mi quiz/ }).click()
}

test('las 8 rutas conservan un solo landmark principal y caben en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  for (const route of ROUTES) {
    await page.goto(`/herramientas/quizes/${route}`)
    await expect(page.locator('#tense-selector-title')).toBeVisible()
    await expect(page.locator('main')).toHaveCount(1)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow, route).toBeLessThanOrEqual(1)
  }
})

test('elegir siempre B ya no aprueba y la reconstrucción individual ofrece distractores', async ({ page }) => {
  await reset(page, 'coreano')
  await configureFirstForm(page)

  for (let index = 0; index < 3; index += 1) {
    await page.locator('.wlp-option').nth(1).click()
    await page.getByRole('button', { name: index === 2 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('1 de 3 puntos correctos')

  await page.getByRole('tab').nth(5).click()
  await expect(page).toHaveURL(/level=6/)
  await expect(page.locator('button[aria-label^="Espacio "]')).toHaveCount(1)
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
  await expect(page.getByText('Hay tarjetas distractoras que no se usan.')).toBeVisible()
})

test('un intento se restaura y cambiar selección limpia la URL', async ({ page }) => {
  await reset(page, 'ingles')
  await configureFirstForm(page)
  await page.locator('.wlp-option').first().click()
  await page.getByRole('button', { name: /Guardar y seguir/ }).click()
  await expect(page.getByText('2 / 3', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => {
    const raw = window.localStorage.getItem('wl-english-tense-quest-v2')
    return raw ? JSON.parse(raw).attempt?.itemIndex : -1
  })).toBe(1)

  await page.reload()
  await expect(page.getByText('2 / 3', { exact: true })).toBeVisible()
  await expect(page).toHaveURL(/forms=present-simple/)

  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Cambiar selección' }).click()
  await expect(page.locator('#tense-selector-title')).toBeVisible()
  await expect(page).not.toHaveURL(/forms=/)
  await expect(page).not.toHaveURL(/level=/)
})

test('un estudiante puede cerrar los 6 niveles sin recibir corrección anticipada', async ({ page }) => {
  await reset(page, 'frances')
  await configureFirstForm(page)

  for (let item = 0; item < 3; item += 1) {
    await expect(page.getByText('Respuesta correcta:', { exact: false })).toHaveCount(0)
    await page.locator('.wlp-option').first().click()
    await page.getByRole('button', { name: item === 2 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(1).click()
  for (let item = 0; item < 3; item += 1) {
    await page.locator('input[name*="micro-gap"]').fill('x')
    await page.getByRole('button', { name: item === 2 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('0 de 3 puntos correctos')

  await page.getByRole('tab').nth(2).click()
  for (let item = 0; item < 2; item += 1) {
    const fields = page.locator('input[name*="story-gap"]')
    for (let field = 0; field < await fields.count(); field += 1) await fields.nth(field).fill('x')
    await page.getByRole('button', { name: item === 1 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('0 de 6 puntos correctos')

  await page.getByRole('tab').nth(3).click()
  for (let item = 0; item < 2; item += 1) {
    await page.locator('button[aria-pressed]').filter({ hasText: /\S/ }).first().click()
    await page.locator('input[name$="-correction"]').fill('x')
    await page.getByRole('button', { name: item === 1 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(4).click()
  const selects = page.locator('select')
  for (let select = 0; select < await selects.count(); select += 1) await selects.nth(select).selectOption({ index: 1 })
  await page.getByRole('button', { name: /Terminar nivel/ }).click()
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(5).click()
  await page.locator('[class*="wordBank"] button').first().click()
  await page.getByRole('button', { name: /Terminar nivel/ }).click()
  await expect(page.getByRole('status')).toContainText('Nivel completado')
})

test('parámetros y progreso local corruptos no rompen el quiz', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=no-existe&level=99')
  await expect(page.locator('#tense-selector-title')).toBeVisible()

  await page.evaluate(() => {
    window.localStorage.setItem('wl-english-tense-quest-v2', JSON.stringify({
      attempt: {
        selectedTenses: ['present-simple'], activeLevel: 99, itemIndex: 999,
        responses: {}, savedLevelResponses: {}, current: {}, questionResults: {}, summary: false,
      },
    }))
  })
  await page.goto('/herramientas/quizes/ingles?forms=present-simple&level=99')
  await expect(page.getByText('1 / 3', { exact: true })).toBeVisible()
  await expect(page.locator('.wlp-option')).toHaveCount(4)
})
