import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const cases = [
  {
    set: 2, objectId: 'object:t2-r-ctw-v2', itemPrefix: 'item:t2-r-ctw-v2:',
    answers: ['ngs', 'ome', 'at', 'em', 'ckly', 'he', 'n', 'f', 'st', 've'],
    readingObjectId: 'object:toefl-reading-set2-v2', readingLabels: [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
    module2ReadingLabels: ['c', 'b', 'b', 'a', 'c', 'c', 'a', 'd', 'b', 'c'],
    buildObjectId: 'object:toefl-build-sentence-set2-v2',
  },
  {
    set: 5, objectId: 'object:t5-r-ctw-v2', itemPrefix: 'item:t5-r-ctw-v2:',
    answers: ['eep', 'ain', 'ot', 'ut', 't', 'ive', 'ries', 'her', 'esses', 'arch'],
    readingObjectId: 'object:toefl-reading-set5-v2', readingLabels: [['b'], ['c'], ['d'], ['a'], ['b'], ['b', 'c']],
    module2ReadingLabels: ['c', 'a', 'd', 'a', 'c', 'b', 'd', 'a', 'c', 'b'],
    buildObjectId: 'object:toefl-build-sentence-set5-v2',
  },
  {
    set: 6, objectId: 'object:t6-r-ctw-v2', itemPrefix: 'item:t6-r-ctw-v2:',
    answers: ['ting', 'ries', 'n', 'dy', 'sfers', 'o', 'wer', 'sfer', 'low', 'ant'],
    readingObjectId: 'object:toefl-reading-set6-v2', readingLabels: [['a'], ['b'], ['b'], ['d'], ['a'], ['b', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set6-v2',
  },
  {
    set: 10, objectId: 'object:t10-r-ctw-v2', itemPrefix: 'item:t10-r-ctw-v2:',
    answers: ['gin', 'in', 'r', 'ects', 'her', 'wing', 'des', 'nd', 'ries', 'nd'],
    readingObjectId: 'object:toefl-reading-set10-v2', readingLabels: [['d'], ['a'], ['b'], ['c'], ['d'], ['a', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set10-v2',
  },
  {
    set: 11, objectId: 'object:t11-r-ctw-v2', itemPrefix: 'item:t11-r-ctw-v2:',
    answers: ['he', 'me', 'ome', 'ot', 'hts', 'e', 'der', 'nd', 'vive', 'ting'],
    readingObjectId: 'object:toefl-reading-set11-v2', readingLabels: [['c'], ['d'], ['a'], ['b'], ['c'], ['a', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set11-v2',
  },
  {
    set: 15, objectId: 'object:t15-r-ctw-v2', itemPrefix: 'item:t15-r-ctw-v2:',
    answers: ['duce', 'aust', 'ile', 'ough', 'tal', 'act', 'n', 'ation', 'icle', 'nd'],
    readingObjectId: 'object:toefl-reading-set15-v2', readingLabels: [['c'], ['d'], ['a'], ['b'], ['c'], ['a', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set15-v2',
  },
  {
    set: 16, objectId: 'object:t16-r-ctw-v2', itemPrefix: 'item:t16-r-ctw-v2:',
    answers: ['ers', 'ow', 'nse', 'at', 'ows', 'der', 'wn', 'ing', 'an', 'leys'],
    readingObjectId: 'object:toefl-reading-set16-v2', readingLabels: [['b'], ['c'], ['d'], ['a'], ['b'], ['a', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set16-v2',
  },
  {
    set: 20, objectId: 'object:t20-r-ctw-v2', itemPrefix: 'item:t20-r-ctw-v2:',
    answers: ['els', 'ight', 'ricity', 'nd', 'se', 'ir', 'ive', 'power', 'rgy', 'wing'],
    readingObjectId: 'object:toefl-reading-set20-v2', readingLabels: [['a'], ['b'], ['c'], ['d'], ['a'], ['a', 'c']],
    buildObjectId: 'object:toefl-build-sentence-set20-v2',
  },
] as const;

const buildPatterns = [
  [2, 4, 0, 3, 1],
  [4, 1, 3, 0, 2],
  [3, 0, 4, 1, 2],
  [1, 3, 0, 4, 2],
  [2, 0, 3, 1, 4],
];

function buildAnswerPositions(set: number, item: number) {
  const pattern = buildPatterns[(set * 2 + item * 3) % buildPatterns.length];
  return [0, 1, 2, 3].map((sourceIndex) => pattern.indexOf(sourceIndex) + 1);
}

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
    const module1ReadingLabels = 'module2ReadingLabels' in candidate
      ? candidate.readingLabels.slice(0, 5)
      : candidate.readingLabels;
    for (let index = 0; index < module1ReadingLabels.length; index += 1) {
      const suffix = index === 5 ? 'supplementary' : 'v2';
      for (const label of module1ReadingLabels[index]) {
        await page.locator(`input[value="item:t${candidate.set}-r-ap${index + 1}-${suffix}:option-${label}"]`).check();
      }
    }
    if ('module2ReadingLabels' in candidate) {
      for (let index = 0; index < candidate.module2ReadingLabels.length; index += 1) {
        const code = index < 5 ? `dl${index + 1}` : `ap${index - 4}`;
        const label = candidate.module2ReadingLabels[index];
        await page.locator(`input[value="item:t${candidate.set}-r-m2-${code}-v1:option-${label}"]`).check();
      }
      await expect(page.getByText(/práctica complementaria WeLearn · fuera/)).toHaveCount(0);
    } else {
      await expect(page.getByText('Práctica complementaria WeLearn · fuera de las 5 preguntas del piloto oficial')).toBeVisible();
    }

    await page.getByRole('button', { name: /Writing/ }).click();
    await expect(page.locator('fieldset').filter({ hasText: /Item \d+ of 10/ })).toHaveCount(10);
    for (let item = 1; item <= 10; item += 1) {
      const itemId = `item:t${candidate.set}-w-bs${item}-v2`;
      for (const position of buildAnswerPositions(candidate.set, item)) {
        await page.locator(`[id="${itemId}:tile-${position}-control"]`).click();
      }
    }

    const scoreRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/complete-the-words/score'));
    const scoreResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/complete-the-words/score'));
    const readingRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/reading/score'));
    const readingResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/reading/score'));
    const buildRequest = page.waitForRequest((request) =>
      request.url().includes('/api/practica/toefl/build-sentence/score'));
    const buildResponse = page.waitForResponse((response) =>
      response.url().includes('/api/practica/toefl/build-sentence/score'));
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
    const expectedReadingItems = 'module2ReadingLabels' in candidate ? 15 : 6;
    expect(readingPayload.presentedItemIds).toHaveLength(expectedReadingItems);
    const readingResult = await (await readingResponse).json() as { correct: number; denominator: number };
    expect(readingResult).toMatchObject({ correct: expectedReadingItems, denominator: expectedReadingItems });
    const buildPayload = (await buildRequest).postDataJSON() as { objectId: string; presentedItemIds: string[] };
    expect(buildPayload.objectId).toBe(candidate.buildObjectId);
    expect(buildPayload.presentedItemIds).toHaveLength(10);
    const buildResult = await (await buildResponse).json() as { correct: number; denominator: number };
    expect(buildResult).toMatchObject({ correct: 10, denominator: 10 });
    await expect(page.getByRole('heading', { name: 'Cierre de Writing' })).toBeVisible();
    expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
  });
}
