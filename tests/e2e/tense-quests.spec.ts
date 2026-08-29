import { expect, test } from '@playwright/test'

const ROUTES = ['italiano', 'ingles', 'frances', 'portugues', 'aleman', 'ruso', 'japones', 'coreano']

test('el catálogo comparte el sistema visual de Práctica y cabe en móvil', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/herramientas/quizes')

  await expect(page.locator('.wlp-page')).toBeVisible()
  await expect(page.locator('.wlp-card--path')).toHaveCount(8)
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
  await expect(page.getByText('2 / 10', { exact: true })).toBeVisible()
  await expect.poll(() => page.evaluate(() => {
    const raw = window.localStorage.getItem('wl-english-tense-quest-v4')
    return raw ? JSON.parse(raw).attempt?.itemIndex : -1
  })).toBe(1)

  await page.reload()
  await expect(page.getByText('2 / 10', { exact: true })).toBeVisible()
  await expect(page).toHaveURL(/forms=present-simple/)

  page.once('dialog', (dialog) => dialog.accept())
  await page.getByRole('button', { name: 'Cambiar selección' }).click()
  await expect(page.locator('#tense-selector-title')).toBeVisible()
  await expect(page).not.toHaveURL(/forms=/)
  await expect(page).not.toHaveURL(/level=/)
})

test('italiano ofrece progresivos, diez retos por nivel e informe final', async ({ page }) => {
  await reset(page, 'italiano')
  await expect(page.getByText('Presente progressivo', { exact: true })).toBeVisible()
  await expect(page.getByText('Imperfetto progressivo', { exact: true })).toBeVisible()
  await configureFirstForm(page)

  for (let level = 0; level < 6; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  }

  await page.getByRole('tab').nth(5).click()
  for (let item = 0; item < 10; item += 1) {
    await page.locator('[class*="wordBank"] button:not([disabled])').first().click()
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Resultado global y próximos pasos')
  await expect(page.getByRole('status')).toContainText('Comentarios de mejora')
  await expect(page.getByRole('status')).toContainText('1 de 6 niveles')
  await expect(page.getByRole('status')).not.toContainText('10 de 10 puntos correctos')
})

test('italiano usa relatos conectados y un dossier final distinto del nivel uno', async ({ page }) => {
  await page.goto('/herramientas/quizes/italiano?forms=trapassato-remoto&level=3')

  await expect(page.getByText('Il decreto reale', { exact: true })).toBeVisible()
  await expect(page.getByText(/Non appena il re/)).toBeVisible()
  await expect(page.getByRole('textbox')).toHaveCount(3)
  await expect(page.locator('[class*="proseExercise"]')).not.toContainText(' · ')

  await page.getByRole('tab').nth(5).click()
  await expect(page).toHaveURL(/level=6/)
  await expect(page.getByText(/Non appena il notaio/)).toBeVisible()
  await expect(page.getByText(/Non appena il re ebbe letto il messaggio/)).toHaveCount(0)
  await expect(page.locator('button[aria-label^="Espacio "]')).toHaveCount(1)
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('los presentes ingleses usan diez bancos editoriales y relatos conectados', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=present-simple&level=3')

  for (let level = 0; level < 6; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  }
  await expect(page.getByText('Opening the neighborhood café', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox')).toHaveCount(3)
  await expect(page.locator('[class*="proseExercise"]')).not.toContainText(' · ')

  await page.getByRole('tab').nth(5).click()
  await expect(page.getByText(/Every dawn the lighthouse keeper/)).toBeVisible()
  await expect(page.locator('button[aria-label^="Espacio "]')).toHaveCount(1)
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('los pasados perfectos ingleses muestran dos planos temporales explícitos', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=past-perfect&level=3')

  for (let level = 0; level < 6; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  }
  await expect(page.getByText('Before the conference opened', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('before the doors opened')
  await expect(page.getByRole('textbox')).toHaveCount(3)

  await page.getByRole('tab').nth(5).click()
  await expect(page.getByText(/By the time the nurse arrived/)).toBeVisible()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('los futuros perfectos ingleses exponen límite y duración', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=future-perfect-continuous&level=3')

  for (let level = 0; level < 6; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  }
  await expect(page.getByText('By the laboratory review', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('By Friday')
  await expect(page.locator('[class*="proseExercise"]')).toContainText('for six months')
  await expect(page.getByRole('textbox')).toHaveCount(3)

  await page.getByRole('tab').nth(5).click()
  await expect(page.getByText(/By October, Maya/)).toBeVisible()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('un estudiante puede cerrar los 6 niveles sin recibir corrección anticipada', async ({ page }) => {
  await reset(page, 'frances')
  await configureFirstForm(page)

  for (let level = 0; level < 6; level += 1) {
    await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  }

  for (let item = 0; item < 10; item += 1) {
    await expect(page.getByText('Respuesta correcta:', { exact: false })).toHaveCount(0)
    await page.locator('.wlp-option').first().click()
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(1).click()
  for (let item = 0; item < 10; item += 1) {
    await page.getByRole('textbox').fill('x')
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('0 de 10 puntos correctos')

  await page.getByRole('tab').nth(2).click()
  for (let item = 0; item < 10; item += 1) {
    const fields = page.getByRole('textbox')
    for (let field = 0; field < await fields.count(); field += 1) await fields.nth(field).fill('x')
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('0 de 30 puntos correctos')

  await page.getByRole('tab').nth(3).click()
  for (let item = 0; item < 10; item += 1) {
    await page.locator('button[aria-pressed]').filter({ hasText: /\S/ }).first().click()
    await page.locator('input[name$="-correction"]').fill('x')
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(4).click()
  for (let item = 0; item < 10; item += 1) {
    await page.locator('select').selectOption({ index: 1 })
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')

  await page.getByRole('tab').nth(5).click()
  for (let item = 0; item < 10; item += 1) {
    await page.locator('[class*="wordBank"] button').first().click()
    await page.getByRole('button', { name: item === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
  }
  await expect(page.getByRole('status')).toContainText('Nivel completado')
})

test('francés mantiene registro literario y planos temporales explícitos', async ({ page }) => {
  await page.goto('/herramientas/quizes/frances?forms=passe-simple&level=3')
  await expect(page.getByText('Chapitre I · La lettre', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox')).toHaveCount(3)
  await expect(page.locator('[class*="proseExercise"]')).not.toContainText(' · ')

  await page.goto('/herramientas/quizes/frances?forms=plus-que-parfait&level=3')
  await expect(page.getByText('Avant l’ouverture du restaurant', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Quand les premiers clients sont arrivés')

  await page.getByRole('tab').nth(5).click()
  await expect(page.getByText(/Quand le directeur est arrivé/)).toBeVisible()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('portugués brasileño distingue progresivo y futuro compuesto con contexto', async ({ page }) => {
  await page.goto('/herramientas/quizes/portugues?forms=progressivo&level=3')
  for (let level = 0; level < 6; level += 1) await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  await expect(page.getByText('A transmissão ao vivo', { exact: true })).toBeVisible()
  await expect(page.getByRole('textbox')).toHaveCount(3)
  await expect(page.locator('[class*="proseExercise"]')).toContainText('A repórter')

  await page.goto('/herramientas/quizes/portugues?forms=futuro-composto&level=3')
  await expect(page.getByText('Até a abertura de sexta', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Até sexta de manhã')

  await page.getByRole('tab').nth(5).click()
  await expect(page.getByText(/Até amanhã à noite/)).toBeVisible()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('alemán evalúa la unidad verbal completa y muestra anclas y tratamiento', async ({ page }) => {
  await page.goto('/herramientas/quizes/aleman?forms=futur-zwei&level=3')
  for (let level = 0; level < 6; level += 1) await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  await expect(page.getByText('Vor der Messe', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Bis die Messe öffnet')
  await expect(page.getByRole('textbox')).toHaveCount(3)

  await page.goto('/herramientas/quizes/aleman?forms=imperativ&level=3')
  await expect(page.getByText('Pauls Kochschritte', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Paul')

  await page.getByRole('tab').nth(5).click()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('ruso distingue proceso, contrafactualidad pasada y selección de aspecto', async ({ page }) => {
  await page.goto('/herramientas/quizes/ruso?forms=past-imperfective&level=3')
  for (let level = 0; level < 6; level += 1) await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  await expect(page.getByText('Вечер в мастерской', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Вчера весь вечер')
  await expect(page.getByRole('textbox')).toHaveCount(3)

  await page.goto('/herramientas/quizes/ruso?forms=conditional-past&level=3')
  await expect(page.getByText('Вчерашняя переправа', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('Если бы вчера')

  await page.goto('/herramientas/quizes/ruso?forms=infinitive-aspect&level=3')
  await expect(page.getByText('Работа над отчётом', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('начала')
  await page.getByRole('tab').nth(5).click()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('japonés separa progresión y estado resultante con construcciones completas', async ({ page }) => {
  await page.goto('/herramientas/quizes/japones?forms=progressive&level=3')
  for (let level = 0; level < 6; level += 1) await expect(page.getByRole('tab').nth(level)).toContainText('10 retos')
  await expect(page.getByText('生放送の準備中', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('今')
  await expect(page.getByRole('textbox')).toHaveCount(3)

  await page.goto('/herramientas/quizes/japones?forms=result-state&level=3')
  await expect(page.getByText('閉館後の博物館', { exact: true })).toBeVisible()
  await expect(page.locator('[class*="proseExercise"]')).toContainText('閉館後')

  await page.goto('/herramientas/quizes/japones?forms=experience&level=2')
  await expect(page.getByText('京都の経験', { exact: true })).toBeVisible()
  await page.getByRole('tab').nth(5).click()
  await expect(page.locator('[class*="wordBank"] button')).toHaveCount(4)
})

test('parámetros y progreso local corruptos no rompen el quiz', async ({ page }) => {
  await page.goto('/herramientas/quizes/ingles?forms=no-existe&level=99')
  await expect(page.locator('#tense-selector-title')).toBeVisible()

  await page.evaluate(() => {
    window.localStorage.setItem('wl-english-tense-quest-v4', JSON.stringify({
      attempt: {
        selectedTenses: ['present-simple'], activeLevel: 99, itemIndex: 999,
        responses: {}, savedLevelResponses: {}, current: {}, questionResults: {}, summary: false,
      },
    }))
  })
  await page.goto('/herramientas/quizes/ingles?forms=present-simple&level=99')
  await expect(page.getByText('1 / 10', { exact: true })).toBeVisible()
  await expect(page.locator('.wlp-option')).toHaveCount(4)
})
