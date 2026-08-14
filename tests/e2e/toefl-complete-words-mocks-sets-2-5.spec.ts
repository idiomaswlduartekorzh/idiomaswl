import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const cases = [
  { set: 2, objectId: 'object:t2-r-ctw-v2', itemPrefix: 'item:t2-r-ctw-v2:', answers: ['ngs', 'ome', 'at', 'em', 'ckly', 'he', 'n', 'f', 'st', 've'] },
  { set: 5, objectId: 'object:t5-r-ctw-v2', itemPrefix: 'item:t5-r-ctw-v2:', answers: ['eep', 'ain', 'ot', 'ut', 't', 'ive', 'ries', 'her', 'esses', 'arch'] },
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

    const scoreRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/complete-the-words/score'));
    const scoreResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/complete-the-words/score'));
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
    await expect(page.getByRole('heading', { name: 'Cierre de Writing' })).toBeVisible();
    expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
  });
}
