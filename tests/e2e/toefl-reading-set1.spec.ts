import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const DAILY_ROUTE = '/practica/toefl/reading/formato-2026/read-in-daily-life';
const ACADEMIC_ROUTE = '/practica/toefl/reading/formato-2026/read-an-academic-passage';
const MOCK_ROUTE = '/examenes/toefl/practica/set-1';

function practice(page: import('@playwright/test').Page, scope: 'daily-life' | 'academic') {
  return page.locator(`#reading-set1-${scope}-title`).locator('xpath=../..');
}

async function chooseByOptionIndex(
  container: import('@playwright/test').Locator,
  optionIndexes: number[],
) {
  const groups = container.locator('fieldset:has(input[type="radio"])');
  for (let index = 0; index < optionIndexes.length; index += 1) {
    await groups.nth(index).getByRole('radio').nth(optionIndexes[index]).check();
  }
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
});

test('Daily Life muestra 3 + 2 preguntas accesibles, restaura estado y corrige 5/5', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(DAILY_ROUTE);
  let set = practice(page, 'daily-life');
  await expect(set.getByRole('radio')).toHaveCount(20);
  await expect(set.getByText('Correct answer.')).toHaveCount(0);
  await expect(set.locator('fieldset')).toHaveCount(5);

  await chooseByOptionIndex(set, [1, 3, 2, 0, 1]);
  const focused = set.locator('fieldset').nth(3).getByRole('radio').nth(0);
  await focused.focus();
  const focusedId = await focused.getAttribute('id');

  await page.reload();
  set = practice(page, 'daily-life');
  await expect(set.getByRole('radio', { checked: true })).toHaveCount(5);
  await expect(page.locator(`[id="${focusedId}"]`)).toBeFocused();
  await set.getByRole('button', { name: 'Finalizar y corregir' }).click();
  await expect(set.getByRole('status').filter({ hasText: 'Resultado de práctica' })).toContainText('5 de 5');
  await expect(set.getByText('Correct answer.')).toHaveCount(5);
  await expect(set.getByText(/no equivale a una puntuación oficial/)).toBeVisible();
  expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
});

test('Academic Passage presenta cinco preguntas oficiales y separa la complementaria exacta', async ({ page }) => {
  await page.goto(ACADEMIC_ROUTE);
  const set = practice(page, 'academic');
  await expect(set.getByRole('radio')).toHaveCount(20);
  await expect(set.getByRole('checkbox')).toHaveCount(4);
  await expect(set.getByText(/fuera de las 5 preguntas del piloto oficial/)).toBeVisible();
  await chooseByOptionIndex(set, [2, 0, 3, 1, 2]);

  const checks = set.getByRole('checkbox');
  await checks.nth(0).check();
  await checks.nth(2).check();
  await expect(set.getByText('Selected 2 of 2.')).toBeVisible();
  await checks.nth(1).click({ force: true });
  await expect(checks.nth(1)).not.toBeChecked();
  await expect(set.getByText(/Remove one selection/)).toBeVisible();

  await set.getByRole('button', { name: 'Finalizar y corregir' }).click();
  const result = set.getByRole('status').filter({ hasText: 'Resultado de práctica' });
  await expect(result).toContainText('5 de 5');
  await expect(result).toContainText('Complementaria WeLearn: correcta');
});

test('un fallo técnico conserva la selección y no la convierte en error académico', async ({ page }) => {
  await page.goto(DAILY_ROUTE);
  const set = practice(page, 'daily-life');
  await set.locator('fieldset').first().getByRole('radio').nth(1).check();
  await page.route('**/api/practica/toefl/reading/score', (route) => route.abort());
  await set.getByRole('button', { name: 'Finalizar y corregir' }).click();
  await expect(set.getByRole('status').filter({ hasText: 'fallo técnico' })).toContainText('no se convirtieron en errores académicos');
  await expect(set.getByRole('radio', { checked: true })).toHaveCount(1);
  await expect(set.getByText('Resultado de práctica')).toHaveCount(0);
});

test('el Set 1 renderiza y restaura singles y multiselect sin omitir la nota editorial', async ({ page }) => {
  await page.goto(MOCK_ROUTE);
  await page.getByRole('button', { name: 'Empezar examen' }).click();
  await expect(page.getByText(/Las preguntas 1–5 forman el piloto/)).toBeVisible();
  await expect(page.getByRole('radio')).toHaveCount(40);
  await expect(page.getByRole('checkbox')).toHaveCount(4);

  const firstRadio = page.getByRole('radio').first();
  await firstRadio.check();
  await firstRadio.focus();
  const focusId = await firstRadio.getAttribute('id');
  await page.reload();
  await expect(page.getByRole('radio', { checked: true })).toHaveCount(1);
  await expect(page.locator(`[id="${focusId}"]`)).toBeFocused();
});

test('Reading permanece utilizable a 320 px, zoom 200 %, modo oscuro y movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto(ACADEMIC_ROUTE);
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  const set = practice(page, 'academic');
  const first = set.getByRole('radio').first();
  await first.focus();
  const styles = await first.locator('xpath=..').evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      color: computed.color,
      background: computed.backgroundColor,
      outlineStyle: computed.outlineStyle,
      outlineWidth: computed.outlineWidth,
    };
  });
  expect(styles.color).not.toBe(styles.background);
  expect(styles.outlineStyle).not.toBe('none');
  expect(styles.outlineWidth).not.toBe('0px');
  let overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.evaluate(() => { document.documentElement.style.zoom = '1'; });
  await page.setViewportSize({ width: 320, height: 900 });
  overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
