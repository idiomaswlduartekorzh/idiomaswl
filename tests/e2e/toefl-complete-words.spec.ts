import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const ROUTE = '/practica/toefl/reading/formato-2026/complete-the-words';
const MOCK_ROUTE = '/examenes/toefl/practica/set-1';
const OBJECT_ID = 'object:t1-r-cw2-v3';
const answers = ['ides', 'ght', 'at', 'ke', 'n', 'ible', 'ide', 'un', 'cess', 'lear'];

function publicPractice(page: import('@playwright/test').Page) {
  return page.locator('#ctw-practice-title').locator('xpath=../../..');
}

function candidateInputs(page: import('@playwright/test').Page) {
  return page.locator('input[id^="t1-r-cw2-v3-blank-"]');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
});

test('la interacción primaria tiene diez inputs accesibles y ninguna clave visible antes del cierre', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(ROUTE);

  await expect(page).toHaveTitle(/Complete the Words: letras faltantes/);
  const practice = publicPractice(page);
  await expect(practice).toHaveAttribute('data-object-id', OBJECT_ID);
  const inputs = candidateInputs(page);
  await expect(inputs).toHaveCount(10);
  await expect(practice.getByText(/Resultado de esta práctica/)).toHaveCount(0);
  await expect(practice.getByText(/Correcta:/)).toHaveCount(0);

  for (let index = 0; index < 10; index += 1) {
    const input = inputs.nth(index);
    await expect(input).toHaveAccessibleName(new RegExp(`blank ${index + 1} of 10`));
    await expect(input).toHaveAttribute('maxlength', String(answers[index].length));
    await expect(input).toHaveAttribute('autocomplete', 'off');
    await expect(input).toHaveAttribute('autocapitalize', 'off');
    await expect(input).toHaveAttribute('spellcheck', 'false');
  }

  await inputs.first().focus();
  for (let index = 1; index < 10; index += 1) {
    await page.keyboard.press('Tab');
    await expect(inputs.nth(index)).toBeFocused();
  }
  expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
});

test('recarga valores y foco, cierra una sola vez y muestra un resultado local 10/10', async ({ page }) => {
  await page.goto(ROUTE);
  const practice = publicPractice(page);
  let inputs = candidateInputs(page);
  for (let index = 0; index < 5; index += 1) await inputs.nth(index).fill(answers[index]);
  await inputs.nth(4).focus();

  await page.reload();
  inputs = candidateInputs(page);
  for (let index = 0; index < 5; index += 1) await expect(inputs.nth(index)).toHaveValue(answers[index]);
  await expect(inputs.nth(4)).toBeFocused();

  for (let index = 5; index < 10; index += 1) await inputs.nth(index).fill(answers[index]);
  let scoreRequests = 0;
  page.on('request', (request) => {
    if (request.url().includes('/api/practica/toefl/complete-the-words/score')) scoreRequests += 1;
  });
  await practice.getByRole('button', { name: 'Cerrar bloque y comprobar' }).click();

  const result = practice.getByRole('status').filter({ hasText: 'Resultado de esta práctica' });
  await expect(result).toContainText('10/10');
  await expect(result).toContainText('No es una puntuación oficial');
  await expect(practice.getByText(/Correcta:/)).toHaveCount(10);
  expect(scoreRequests).toBe(1);

  await page.reload();
  await expect(practice.getByRole('status').filter({ hasText: 'Resultado de esta práctica' })).toContainText('10/10');
  expect(scoreRequests).toBe(1);

  const firstAttempt = await page.evaluate(() => JSON.parse(window.localStorage.getItem('wl:toefl:ctw:t1-r-cw2-v3:v1')!));
  await practice.getByRole('button', { name: 'Empezar otro intento' }).click();
  await expect(candidateInputs(page).first()).toHaveValue('');
  const localState = await page.evaluate(() => ({
    current: JSON.parse(window.localStorage.getItem('wl:toefl:ctw:t1-r-cw2-v3:v1')!),
    history: JSON.parse(window.localStorage.getItem('wl:toefl:ctw:t1-r-cw2-v3:history:v1') ?? '[]'),
  }));
  expect(localState.current.attemptId).not.toBe(firstAttempt.attemptId);
  expect(localState.history.find((item: { attemptId: string }) => item.attemptId === firstAttempt.attemptId)?.result.correct).toBe(10);
});

test('entrada inválida no se limpia en silencio y un fallo técnico no se vuelve error académico', async ({ page }) => {
  await page.goto(ROUTE);
  const practice = publicPractice(page);
  const second = practice.locator('input').nth(1);
  await second.fill('gh7');
  await expect(second).toHaveValue('gh7');
  await expect(second).toHaveAttribute('aria-invalid', 'true');

  await page.route('**/api/practica/toefl/complete-the-words/score', (route) => route.abort());
  await practice.getByRole('button', { name: 'Cerrar bloque y comprobar' }).click();
  await expect(practice.getByRole('status').filter({ hasText: 'fallo técnico' })).toContainText('Ninguna respuesta se contó como error académico');
  await expect(practice.getByText(/Resultado de esta práctica/)).toHaveCount(0);
  await expect(second).toHaveValue('gh7');
});

test('la práctica se mantiene dentro de 320 px y el banco anterior conserva sus 16 ítems con etiqueta honesta', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(ROUTE);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole('link', { name: 'Selección de palabras por contexto' }).click();
  await expect(page.getByRole('heading', { name: 'Selección de palabras por contexto', level: 1 })).toBeVisible();
  await expect(page.getByText('no son la interacción Complete the Words')).toBeVisible();
  await expect(page.locator('article')).toHaveCount(16);
});

test('mantiene foco y legibilidad con zoom equivalente a 200 %, modo oscuro y movimiento reducido', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 640, height: 900 });
  await page.goto(ROUTE);
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  const inputs = candidateInputs(page);
  await expect(inputs).toHaveCount(10);
  await inputs.first().focus();
  const styles = await inputs.first().evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      color: computed.color,
      background: computed.backgroundColor,
      outlineStyle: computed.outlineStyle,
      outlineWidth: computed.outlineWidth,
      animationDuration: computed.animationDuration,
    };
  });
  expect(styles.color).not.toBe(styles.background);
  expect(styles.outlineStyle).not.toBe('none');
  expect(styles.outlineWidth).not.toBe('0px');
  expect(styles.animationDuration.split(',').every((duration) => Number.parseFloat(duration) <= 0.001)).toBeTruthy();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('el Set 1 conserva las diez respuestas al cambiar de habilidad y recargar', async ({ page }) => {
  await page.goto(MOCK_ROUTE);
  await page.getByRole('button', { name: 'Empezar examen' }).click();
  let inputs = candidateInputs(page);
  await expect(inputs).toHaveCount(10);
  for (let index = 0; index < 5; index += 1) await inputs.nth(index).fill(answers[index]);
  await inputs.nth(4).focus();

  await page.getByRole('button', { name: /Listening/ }).first().click();
  await page.getByRole('button', { name: /Reading/ }).first().click();
  for (let index = 0; index < 5; index += 1) await expect(inputs.nth(index)).toHaveValue(answers[index]);

  await page.reload();
  inputs = candidateInputs(page);
  await expect(inputs).toHaveCount(10);
  for (let index = 0; index < 5; index += 1) await expect(inputs.nth(index)).toHaveValue(answers[index]);
  await expect(inputs.nth(4)).toBeFocused();
});
