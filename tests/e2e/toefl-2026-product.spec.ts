import { expect, test } from '@playwright/test';

const MOCK_ROUTE = '/examenes/toefl/practica/set-1';
const STORAGE_KEY = 'wl:toefl:mock:set-1:attempt:v1';
const WRITING_SAMPLE = 'This original practice response is intentionally long enough to enter the private correction flow. It develops one clear purpose, adds relevant supporting detail, and uses complete sentences throughout the response.';

test.use({
  permissions: ['microphone'],
  launchOptions: {
    args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
  },
});

test('Speaking keeps all 11 recordings until the private submission screen', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', message => {
    if (message.type() === 'error') errors.push(message.text());
  });
  page.on('dialog', dialog => dialog.accept());

  await page.goto('/');
  await page.evaluate(({ key, writing }) => {
    window.localStorage.setItem(key, JSON.stringify({
      version: 4,
      attemptId: `attempt:${crypto.randomUUID()}`,
      ans: {
        mcq: {},
        word: {},
        single: {},
        multi: {},
        listening: {},
        build: {},
        buildV2: {},
        write: {
          'item:t1-w-email-v2': writing,
          'item:t1-w-disc-v2': writing,
        },
        speak: {},
      },
      wordScores: {},
      stageIndex: 7,
      forwardItemIndex: 0,
      stageDeadlineAt: null,
      startedMediaIds: [],
      completedMediaIds: [],
    }));
  }, { key: STORAGE_KEY, writing: WRITING_SAMPLE });

  await page.goto(MOCK_ROUTE);
  await expect(page.getByRole('heading', { name: 'Speaking', level: 1 })).toBeVisible();

  for (let item = 1; item <= 11; item += 1) {
    await expect(page.getByText(new RegExp(`Ítem ${item} de 11`))).toBeVisible();
    await page.locator('audio').first().dispatchEvent('ended');
    const record = page.getByRole('button', { name: 'Grabar respuesta' });
    await expect(record).toBeVisible();
    await record.click();
    await expect(page.getByRole('button', { name: /Detener/ })).toBeVisible();
    await page.waitForTimeout(1_250);
    await page.getByRole('button', { name: /Detener/ }).click();
    await expect(page.getByText(/Audio listo/)).toBeVisible();
    await page.getByRole('button', { name: item < 11 ? /Confirmar y siguiente ítem/ : /Finalizar práctica/ }).click();
  }

  await expect(page.getByRole('heading', { name: 'Envía el simulacro para corrección' })).toBeVisible({ timeout: 30_000 });
  await expect(page.getByText('11/11 audios · Listos')).toBeVisible();
  await expect(page.getByText(/control técnico.*no se presentan como mínimo oficial de ETS/)).toHaveCount(0);

  await page.setViewportSize({ width: 390, height: 844 });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  expect(errors).toEqual([]);
});
