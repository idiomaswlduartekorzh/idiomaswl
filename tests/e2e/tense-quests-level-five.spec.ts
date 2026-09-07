import { expect, test } from '@playwright/test'

import { ENGLISH_TENSE_QUEST } from '../../src/data/practica/english-tense-quest-config.ts'
import { FRENCH_STRUCTURE_QUEST } from '../../src/data/practica/french-structure-quest-config.ts'
import { GERMAN_STRUCTURE_QUEST } from '../../src/data/practica/german-structure-quest-config.ts'
import { ITALIAN_TENSE_QUEST } from '../../src/data/practica/italian-tense-quest-config.ts'
import { JAPANESE_STRUCTURE_QUEST } from '../../src/data/practica/japanese-structure-quest-config.ts'
import { KOREAN_STRUCTURE_QUEST } from '../../src/data/practica/korean-structure-quest-config.ts'
import { PORTUGUESE_STRUCTURE_QUEST } from '../../src/data/practica/portuguese-structure-quest-config.ts'
import { RUSSIAN_STRUCTURE_QUEST } from '../../src/data/practica/russian-structure-quest-config.ts'

const ROUTES = [
  ['italiano', ITALIAN_TENSE_QUEST],
  ['ingles', ENGLISH_TENSE_QUEST],
  ['frances', FRENCH_STRUCTURE_QUEST],
  ['portugues', PORTUGUESE_STRUCTURE_QUEST],
  ['aleman', GERMAN_STRUCTURE_QUEST],
  ['ruso', RUSSIAN_STRUCTURE_QUEST],
  ['japones', JAPANESE_STRUCTURE_QUEST],
  ['coreano', KOREAN_STRUCTURE_QUEST],
] as const

for (const [route, config] of ROUTES) {
  test(`${route}: todas las formas del nivel 5 son revisables y la práctica normal es editable`, async ({ page }) => {
    const pageErrors: string[] = []
    page.on('pageerror', (error) => pageErrors.push(error.message))

    for (const form of config.forms) {
      await page.goto(`/herramientas/quizes/${route}?forms=${encodeURIComponent(form.id)}&level=5&review=1`)
      await expect(page.locator('[data-quest-hydrated="true"]')).toBeVisible()
      await expect(page.getByRole('tab').nth(4)).toHaveAttribute('aria-selected', 'true')
      await expect(page.getByText('RESPUESTA PARA REVISIÓN')).toBeVisible()
      await expect(page.getByRole('textbox')).not.toHaveValue('')
      await expect(page.getByRole('textbox')).not.toBeEditable()

      if (route === 'aleman') {
        await expect(page.locator('[aria-label^="Clasifica "] button[aria-pressed="true"]')).toHaveCount(1)
      } else {
        await expect(page.getByText('PRODUCCIÓN DE LA ORACIÓN')).toBeVisible()
        await expect(page.locator('select')).toHaveCount(0)
      }
    }

    const firstForm = config.forms[0]
    await page.goto(`/herramientas/quizes/${route}?forms=${encodeURIComponent(firstForm.id)}&level=5`)
    await expect(page.locator('[data-quest-hydrated="true"]')).toBeVisible()
    const answer = page.getByRole('textbox')
    await expect(answer).toBeEditable()
    await expect(answer).toHaveValue('')
    await answer.fill('respuesta de prueba')
    if (route === 'aleman') await page.locator('[aria-label^="Clasifica "] button').first().click()
    await expect(page.getByRole('button', { name: /Guardar y seguir|Finalizar nivel/ })).toBeEnabled()
    expect(pageErrors).toEqual([])
  })
}
