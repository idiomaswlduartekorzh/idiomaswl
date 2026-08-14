import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const cases = [
  {
    set: 2, objectId: 'object:t2-r-ctw-v2', itemPrefix: 'item:t2-r-ctw-v2:',
    answers: ['ngs', 'ome', 'at', 'em', 'ckly', 'he', 'n', 'f', 'st', 've'],
    readingObjectId: 'object:toefl-reading-set2-v2', readingLabels: [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
  },
  {
    set: 5, objectId: 'object:t5-r-ctw-v2', itemPrefix: 'item:t5-r-ctw-v2:',
    answers: ['eep', 'ain', 'ot', 'ut', 't', 'ive', 'ries', 'her', 'esses', 'arch'],
    readingObjectId: 'object:toefl-reading-set5-v2', readingLabels: [['b'], ['c'], ['d'], ['a'], ['b'], ['b', 'c']],
  },
] as const;

for (const candidate of cases) {
  test(`Set ${candidate.set} renders and closes its own ten-target CTW object`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('dialog', (dialog) => dialog.accept());
    await page.goto('/');
    await page.evaluate(() => window.localStorage.clear());
    await page.goto(`/examenes/toefl/practica/set-${candidate.set}`);
    await page.getByRole('button', { name: 'Empezar examen' }).click();

    const inputs = page.locator(`span[data-blank-id^="${candidate.itemPrefix}"] input`);
    await expect(inputs).toHaveCount(10);
    for (let index = 0; index < 10; index += 1) {
      await expect(inputs.nth(index)).toHaveAccessibleName(new RegExp(`blank ${index + 1} of 10`));
      await inputs.nth(index).fill(candidate.answers[index]);
    }
    for (let index = 0; index < candidate.readingLabels.length; index += 1) {
      const suffix = index === 5 ? 'supplementary' : 'v2';
      for (const label of candidate.readingLabels[index]) {
        await page.locator(`input[value="item:t${candidate.set}-r-ap${index + 1}-${suffix}:option-${label}"]`).check();
      }
    }
    await expect(page.getByText('Práctica complementaria WeLearn · fuera de las 5 preguntas del piloto oficial')).toBeVisible();

    const scoreRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/complete-the-words/score'));
    const scoreResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/complete-the-words/score'));
    const readingRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/reading/score'));
    const readingResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/reading/score'));
    await page.getByRole('button', { name: /Speaking/ }).first().click();
    await page.getByRole('button', { name: 'Finalizar examen' }).click();
    const request = await scoreRequest;
    const payload = request.postDataJSON() as {
      objectId: string;
      responses: Record<string, string>;
      presentedBlankIds: string[];
    };
    expect(payload.objectId).toBe(candidate.objectId);
    expect(payload.presentedBlankIds).toHaveLength(10);
    expect(Object.keys(payload.responses)).toEqual(payload.presentedBlankIds);
    const result = await (await scoreResponse).json() as { objectId: string; correct: number; denominator: number };
    expect(result).toMatchObject({ objectId: candidate.objectId, correct: 10, denominator: 10 });
    const readingPayload = (await readingRequest).postDataJSON() as { objectId: string; presentedItemIds: string[] };
    expect(readingPayload.objectId).toBe(candidate.readingObjectId);
    expect(readingPayload.presentedItemIds).toHaveLength(6);
    const readingResult = await (await readingResponse).json() as { correct: number; denominator: number };
    expect(readingResult).toMatchObject({ correct: 6, denominator: 6 });
    await expect(page.getByRole('heading', { name: 'Cierre de Writing' })).toBeVisible();
    expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
  });
}
