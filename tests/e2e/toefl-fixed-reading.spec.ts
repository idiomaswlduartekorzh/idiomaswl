import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const cases = [
  {
    set: 1,
    ctwObjectId: 'object:t1-r-m2-ctw-v1',
    ctwAnswers: ['vide', 'nd', 'or', 'ine', 'ile', 'ach', 'ant', 'cks', 'he', 'ter'],
    readingLabels: ['b', 'c', 'c', 'b', 'd', 'b', 'c', 'a', 'd', 'b'],
    combinedReadingCount: 20,
  },
  {
    set: 5,
    ctwObjectId: 'object:t5-r-m2-ctw-v1',
    ctwAnswers: ['ves', 'ade', 'ration', 'iage', 'ol', 'ir', 'orb', 'ile', 'fer', 'or'],
    readingLabels: ['c', 'a', 'd', 'a', 'c', 'b', 'd', 'a', 'c', 'b'],
    combinedReadingCount: 15,
  },
  {
    set: 10,
    ctwObjectId: 'object:t10-r-m2-ctw-v1',
    ctwAnswers: ['nd', 'rials', 'orb', 'und', 'us', 'oes', 'nse', 'iers', 'ock', 'ween'],
    readingLabels: ['a', 'b', 'c', 'a', 'b', 'a', 'b', 'c', 'd', 'a'],
    combinedReadingCount: 15,
  },
  {
    set: 15,
    ctwObjectId: 'object:t15-r-m2-ctw-v1',
    ctwAnswers: ['nts', 'end', 'mals', 'rry', 'ween', 'ile', 'or', 'ls', 'r', 'rby'],
    readingLabels: ['a', 'c', 'b', 'd', 'a', 'b', 'a', 'c', 'd', 'b'],
    combinedReadingCount: 15,
  },
] as const;

for (const candidate of cases) {
  test(`Set ${candidate.set} presenta y puntúa Reading Módulo 2 sin suplementos`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('dialog', (dialog) => dialog.accept());
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.goto(`/examenes/toefl/practica/set-${candidate.set}`);
    await page.getByRole('button', { name: 'Empezar examen' }).click();

    await expect(page.getByText(/Módulo 2/)).toHaveCount(4);
    await expect(page.getByRole('checkbox')).toHaveCount(0);
    await expect(page.getByText(/práctica complementaria WeLearn · fuera/)).toHaveCount(0);
    await expect(page.locator('span[data-blank-id] input')).toHaveCount(20);

    const m2Inputs = page.locator(`span[data-blank-id^="item:t${candidate.set}-r-m2-ctw-v1:"] input`);
    await expect(m2Inputs).toHaveCount(10);
    for (let index = 0; index < candidate.ctwAnswers.length; index += 1) {
      await expect(m2Inputs.nth(index)).toHaveAccessibleName(new RegExp(`blank ${index + 1} of 10`));
      await m2Inputs.nth(index).fill(candidate.ctwAnswers[index]);
    }

    for (let index = 0; index < candidate.readingLabels.length; index += 1) {
      const code = index < 5 ? `dl${index + 1}` : `ap${index - 4}`;
      await page.locator(
        `input[value="item:t${candidate.set}-r-m2-${code}-v1:option-${candidate.readingLabels[index]}"]`,
      ).check();
    }

    const ctwResponsePromise = page.waitForResponse(async (response) => {
      if (!response.url().includes('/api/practica/toefl/complete-the-words/score')) return false;
      return (await response.json() as { objectId?: string }).objectId === candidate.ctwObjectId;
    });
    const readingRequestPromise = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/reading/score'));
    const readingResponsePromise = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/reading/score'));

    await page.getByRole('button', { name: /Speaking/ }).first().click();
    await page.getByRole('button', { name: 'Finalizar examen' }).click();

    const ctwResult = await (await ctwResponsePromise).json() as { correct: number; denominator: number };
    expect(ctwResult).toMatchObject({ correct: 10, denominator: 10 });

    const readingPayload = (await readingRequestPromise).postDataJSON() as { presentedItemIds: string[] };
    expect(readingPayload.presentedItemIds).toHaveLength(candidate.combinedReadingCount);
    expect(readingPayload.presentedItemIds.filter((id) => id.includes('-r-m2-'))).toHaveLength(10);
    const readingResult = await (await readingResponsePromise).json() as {
      outcomes: { itemId: string; rawPoints: number }[];
    };
    expect(readingResult.outcomes.filter((item) => item.itemId.includes('-r-m2-'))).toHaveLength(10);
    expect(readingResult.outcomes.filter((item) => item.itemId.includes('-r-m2-')).every((item) => item.rawPoints === 1)).toBe(true);
    expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
  });
}
