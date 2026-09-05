import { expect, test } from '@playwright/test'
import { GERMAN_STRUCTURE_QUEST as quest } from '../../src/data/practica/german-structure-quest-config'

test('alemán: modo de revisión deja los seis niveles resueltos al 100% y permite avanzar', async ({ page }) => {
  await page.goto('/herramientas/quizes/aleman?forms=praesens&level=4&review=1')
  await expect(page.getByText('Respuesta para revisión')).toBeVisible()
  await expect(page.getByRole('tab')).toHaveCount(6)
  for (const tab of await page.getByRole('tab').all()) await expect(tab).toContainText('100%')
  await expect(page.locator('[class*="errorToken"]')).toHaveCount(0)
  await expect(page.getByRole('textbox')).toHaveCount(2)
  await expect(page.getByLabel('Forma que está mal')).toHaveValue('arbeiten')
  await expect(page.getByLabel('Forma corregida')).toHaveValue('arbeitet')
  await expect(page.getByText('arbeiten → arbeitet')).toBeVisible()
  await page.getByRole('button', { name: 'Siguiente reto' }).click()
  await expect(page.getByText('2 / 10', { exact: true })).toBeVisible()

  await page.getByRole('tab', { name: /Trennbar oder untrennbar/ }).click()
  await expect(page.getByText('Mara ___ jeden Werktag um sechs Uhr.', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Trennbar', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByLabel('Escribe la oración completa')).toHaveValue('Mara steht jeden Werktag um sechs Uhr auf.')
  await expect(page.getByText('trennbar · Mara steht jeden Werktag um sechs Uhr auf.')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Siguiente reto' })).toBeEnabled()

  await page.getByRole('tab', { name: /Lange Geschichte/ }).click()
  await expect(page.getByText(/beginnen: beginnt/)).toBeVisible()
  await expect(page.getByRole('textbox')).toHaveCount(11)
  await expect(page.getByRole('textbox').first()).toHaveValue('beginnt')
})

for (const { id: form } of quest.forms) {
  test(`alemán ${form}: seis niveles, recarga y contrato propio`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/herramientas/quizes/aleman?forms=${form}&level=1`)
    const choices = quest.choiceChallenges.filter((item) => item.tenses.includes(form))
    const micro = quest.microStories.filter((item) => item.gaps.some((gap) => gap.tense === form))
    const stories = quest.longStories.filter((item) => item.gaps.some((gap) => gap.tense === form))
    const repairs = quest.errorChallenges.filter((item) => item.tense === form)
    const separation = quest.separationChallenges!.filter((item) => item.tense === form)
    const writtenFinal = quest.finalStories!.find((item) => item.gaps.some((gap) => gap.tense === form))!

    for (let level = 0; level < 6; level += 1) {
      await page.getByRole('tab').nth(level).click()
      await page.waitForLoadState('networkidle')
      const itemTotal = level === 5 ? 1 : 10
      for (let index = 0; index < itemTotal; index += 1) {
        await expect(page.getByText(`${index + 1} / ${itemTotal}`, { exact: true })).toBeVisible()
        if (level === 0) {
          await page.locator('.wlp-option').filter({ hasText: new RegExp(`^.[\\s]*${choices[index].answer}$`) }).click()
        } else if (level === 1 || level === 2) {
          const item = (level === 1 ? micro : stories)[index]
          for (const [gapIndex, gap] of item.gaps.entries()) await page.getByRole('textbox').nth(gapIndex).fill(gap.answers[0])
          if (level === 2 && index === 3 && form === 'praesens') {
            await expect(page.getByRole('textbox').nth(0)).toHaveValue('wählt')
            await expect(page.getByRole('textbox').nth(2)).toHaveValue('liest')
            await expect(page.locator('[class*="proseExercise"]')).toContainText('um fünf Uhr die Themen aus.')
            await expect(page.locator('[class*="proseExercise"]')).toContainText('um sechs Uhr die Meldungen vor.')
          }
        } else if (level === 3) {
          const item = repairs[index]
          const wrongForm = item.chunks.find((chunk) => chunk.id === item.wrongId)!.form
          await page.getByLabel('Forma que está mal').fill(wrongForm)
          await page.getByLabel('Forma corregida').fill(item.answers[0])
        } else if (level === 4) {
          const item = separation[index]
          await page.getByRole('button', { name: item.separation === 'separable' ? 'Trennbar' : 'Untrennbar', exact: true }).click()
          await page.getByLabel('Escribe la oración completa').fill(item.answers[0])
        } else {
          for (const [gapIndex, gap] of writtenFinal.gaps.entries()) await page.getByRole('textbox').nth(gapIndex).fill(gap.answers[0])
        }
        await expect(page.getByRole('status')).toHaveCount(0)
        if (level === 1 && index === 5) {
          await expect.poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{}').attempt?.itemIndex, quest.storageKey)).toBe(5)
          await page.reload()
          await expect(page.getByRole('textbox')).toHaveValue(micro[index].gaps[0].answers[0])
        }
        await page.getByRole('button', { name: index === itemTotal - 1 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
      }
      const expectedPoints = level === 2 ? 30 : level === 4 ? 20 : level === 5 ? writtenFinal.gaps.length : 10
      await expect(page.getByRole('status')).toContainText(`${expectedPoints} de ${expectedPoints} puntos correctos`)
    }
    await expect(page.getByRole('status')).toContainText('Completaste los seis niveles con un promedio de 100%.')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    expect(errors).toEqual([])
  })
}
