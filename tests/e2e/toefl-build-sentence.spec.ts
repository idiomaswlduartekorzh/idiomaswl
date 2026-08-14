import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const ROUTE = '/practica/toefl/writing/build-a-sentence';
const MOCK_ROUTE = '/examenes/toefl/practica/set-1';
const answerPositions = [
  [2, 5, 1, 4],
  [4, 2, 5, 1],
  [2, 5, 1, 4],
  [4, 1, 3],
  [3, 4, 1],
  [2, 5, 4, 1],
  [4, 1, 3],
  [2, 5, 1, 4],
  [4, 2, 5, 1],
  [2, 5, 1, 4],
];

function pilot(page: import('@playwright/test').Page) {
  return page.locator('#build-sentence-set1-title').locator('xpath=../..');
}

async function completeItem(page: import('@playwright/test').Page, itemNumber: number) {
  const itemId = `item:t1-w-bs${itemNumber}-v2`;
  for (const position of answerPositions[itemNumber - 1]) {
    await page.locator(`[id="${itemId}:tile-${position}-control"]`).click();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
});

test('muestra 10 intercambios contextualizados y la interacción primaria funciona con teclado', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(ROUTE);
  const set = pilot(page);
  await expect(set.locator('fieldset')).toHaveCount(10);
  await expect(set.getByText(/ETS usa movimiento de fragmentos/)).toBeVisible();

  const first = set.locator('fieldset').first();
  await expect(first).toContainText('Where is Mia meeting us?');
  await expect(first.getByRole('button', { name: /outside\. Add to position 1 of 4/ })).toBeVisible();
  const correctFirst = [2, 5, 1, 4];
  for (const [index, position] of correctFirst.entries()) {
    const control = page.locator(`[id="item:t1-w-bs1-v2:tile-${position}-control"]`);
    await control.focus();
    await expect(control).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator(`[id="item:t1-w-bs1-v2-position-${index + 1}"]`)).toBeFocused();
  }
  await expect(first.getByRole('button', { name: /Position 4 of 4: the library/ })).toBeVisible();
  await expect(first.locator('[aria-label="Available fragments"] button:disabled')).toHaveCount(5);
  expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
});

test('restaura orden y foco, luego corrige una sola vez 10/10', async ({ page }) => {
  await page.goto(ROUTE);
  await completeItem(page, 1);
  await expect(page.locator('[id="item:t1-w-bs1-v2-position-4"]')).toBeFocused();
  const focusTarget = page.locator('[id="item:t1-w-bs2-v2:tile-4-control"]');
  await focusTarget.focus();
  await expect(focusTarget).toBeFocused();
  await expect.poll(() => page.evaluate(() => {
    const raw = window.localStorage.getItem('wl:toefl:build-sentence:set1:attempt:v1');
    return raw ? JSON.parse(raw).lastFocusId : '';
  })).toBe('item:t1-w-bs2-v2:tile-4-control');

  await page.reload();
  await expect(page.locator('[id="item:t1-w-bs1-v2-position-4"]')).toContainText('the library');
  await expect(focusTarget).toBeFocused();

  for (let itemNumber = 2; itemNumber <= 10; itemNumber += 1) await completeItem(page, itemNumber);
  let scoreRequests = 0;
  page.on('request', (request) => {
    if (request.url().includes('/api/practica/toefl/build-sentence/score')) scoreRequests += 1;
  });
  await pilot(page).getByRole('button', { name: 'Finalizar y corregir' }).click();
  await expect(pilot(page).getByRole('status').filter({ hasText: 'Resultado de práctica' })).toContainText('10 de 10');
  await expect(pilot(page).getByText('Correct order.')).toHaveCount(10);
  expect(scoreRequests).toBe(1);

  await page.reload();
  await expect(pilot(page).getByRole('status').filter({ hasText: 'Resultado de práctica' })).toContainText('10 de 10');
  expect(scoreRequests).toBe(1);
});

test('un fallo técnico conserva los fragmentos y no crea errores académicos', async ({ page }) => {
  await page.goto(ROUTE);
  await completeItem(page, 1);
  await page.route('**/api/practica/toefl/build-sentence/score', (route) => route.abort());
  await pilot(page).getByRole('button', { name: 'Finalizar y corregir' }).click();
  await expect(pilot(page).getByRole('status').filter({ hasText: 'fallo técnico' })).toContainText('no se convirtieron en errores académicos');
  await expect(page.locator('[id="item:t1-w-bs1-v2-position-4"]')).toContainText('the library');
  await expect(pilot(page).getByText('Resultado de práctica')).toHaveCount(0);
});

test('el simulacro completo usa los 10 ítems nuevos, restaura foco y cabe a 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(MOCK_ROUTE);
  await page.getByRole('button', { name: 'Empezar examen' }).click();
  await page.getByRole('button', { name: /Writing/ }).click();
  await expect(page.locator('fieldset').filter({ hasText: /Item \d+ of 10/ })).toHaveCount(10);
  await expect(page.getByText(/botones equivalentes/)).toBeVisible();

  const firstControl = page.locator('[id="item:t1-w-bs1-v2:tile-2-control"]');
  await firstControl.focus();
  await page.keyboard.press('Enter');
  const placed = page.locator('[id="item:t1-w-bs1-v2-position-1"]');
  await expect(placed).toBeFocused();
  await page.reload();
  await expect(page.getByRole('button', { name: /Position 1 of 4: is/ })).toBeVisible();
  await expect(placed).toBeFocused();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
