import { expect, test } from '@playwright/test'
import { GERMAN_STRUCTURE_QUEST as quest } from '../../src/data/practica/german-structure-quest-config'

for (const form of ['praesens', 'imperativ'] as const) {
  test(`alemán ${form}: seis niveles, recarga y corrección de partículas`, async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto(`/herramientas/quizes/aleman?forms=${form}&level=1`)
    const choices = quest.choiceChallenges.filter((item) => item.tenses.includes(form))
    const micro = quest.microStories.filter((item) => item.gaps.some((gap) => gap.tense === form))
    const stories = quest.longStories.filter((item) => item.gaps.some((gap) => gap.tense === form))
    const repairs = quest.errorChallenges.filter((item) => item.tense === form)
    const timelines = quest.timelineChallenges.filter((item) => item.slots.some((slot) => slot.tense === form))

    for (let level = 0; level < 6; level += 1) {
      await page.getByRole('tab').nth(level).click()
      await page.waitForLoadState('networkidle')
      for (let index = 0; index < 10; index += 1) {
        await expect(page.getByText(`${index + 1} / 10`, { exact: true })).toBeVisible()
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
          await page.locator('[class*="errorToken"]').nth(item.chunks.findIndex((chunk) => chunk.id === item.wrongId)).click()
          await page.getByRole('textbox').fill(item.answers[0])
        } else if (level === 4) {
          await page.getByRole('combobox').selectOption(timelines[index].slots[0].answer)
        } else {
          const item = quest.finalChallenges[index]
          const gap = item.gaps.find((gap) => gap.tenseId === form)!
          const card = item.cards.find((card) => gap.answerCardId === card.id)!
          await page.locator('[class*="wordBank"] button').filter({ hasText: new RegExp(`^${card.text}$`) }).click()
        }
        await expect(page.getByRole('status')).toHaveCount(0)
        if (level === 1 && index === 5) {
          await expect.poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? '{}').attempt?.itemIndex, quest.storageKey)).toBe(5)
          await page.reload()
          await expect(page.getByRole('textbox')).toHaveValue(micro[index].gaps[0].answers[0])
        }
        await page.getByRole('button', { name: index === 9 ? /Terminar nivel/ : /Guardar y seguir/ }).click()
      }
      await expect(page.getByRole('status')).toContainText(level === 2 ? '30 de 30 puntos correctos' : '10 de 10 puntos correctos')
    }
    await expect(page.getByRole('status')).toContainText('Completaste los seis niveles con un promedio de 100%.')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
    expect(overflow).toBeLessThanOrEqual(1)
    expect(errors).toEqual([])
  })
}
