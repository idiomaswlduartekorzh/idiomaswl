import { expect, test } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

test.setTimeout(300_000);

const EMAIL_ROUTE = '/practica/toefl/writing/write-an-email';
const DISCUSSION_ROUTE = '/practica/toefl/writing/academic-discussion';
const MOCK_ROUTE = '/examenes/toefl/practica/set-1';
const EMAIL_KEY = 'wl:toefl:writing:item:t1-w-email-v2:attempt:v1';

function timed(page: import('@playwright/test').Page, title: string) {
  return page.getByRole('heading', { name: title, level: 2 }).locator('xpath=../../..');
}

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => window.localStorage.clear());
});

test('Email inicia 7 minutos, restaura texto/foco/deadline y sella sin score', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto(EMAIL_ROUTE);
  let practice = timed(page, 'Piloto Set 1 · Write an Email');
  await expect(practice.getByRole('button', { name: 'Empezar tarea de 7 minutos' })).toBeVisible();
  await practice.getByRole('button', { name: 'Empezar tarea de 7 minutos' }).click();
  await expect(practice).toContainText('ETS no publica un mínimo para Email');
  const textarea = practice.getByRole('textbox', { name: 'Tu respuesta' });
  await expect(textarea).toHaveAttribute('spellcheck', 'false');
  await textarea.fill('Dear Hotel Team, I need to arrive one day earlier. Could you please confirm whether I can add one night and tell me the additional cost? Thank you.');
  await textarea.focus();
  const before = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)!), EMAIL_KEY);

  await page.reload();
  practice = timed(page, 'Piloto Set 1 · Write an Email');
  await expect(practice.getByRole('textbox', { name: 'Tu respuesta' })).toHaveValue(/Dear Hotel Team/);
  await expect(practice.getByRole('textbox', { name: 'Tu respuesta' })).toBeFocused();
  const after = await page.evaluate((key) => JSON.parse(window.localStorage.getItem(key)!), EMAIL_KEY);
  expect(after.deadlineMs).toBe(before.deadlineMs);
  expect(after.attemptId).toBe(before.attemptId);

  await practice.getByRole('button', { name: 'Enviar y sellar respuesta' }).click();
  await expect(practice.getByRole('textbox', { name: 'Tu respuesta' })).toBeDisabled();
  await expect(practice.getByRole('status')).toContainText('not_evaluated');
  await expect(practice.getByText(/no se convirtió en una banda ni score ETS/)).toBeVisible();
  await expect(practice.locator('input[type="checkbox"]')).toHaveCount(6);
  expect(erroresPropios(errors), errors.join('\n')).toEqual([]);
});

test('recargar después del deadline expira y no reabre la respuesta', async ({ page }) => {
  await page.goto(EMAIL_ROUTE);
  let practice = timed(page, 'Piloto Set 1 · Write an Email');
  await practice.getByRole('button', { name: 'Empezar tarea de 7 minutos' }).click();
  await practice.getByRole('textbox', { name: 'Tu respuesta' }).fill('A draft that must remain after expiry.');
  await page.evaluate((key) => {
    const saved = JSON.parse(window.localStorage.getItem(key)!);
    saved.deadlineMs = Date.now() - 1_000;
    saved.phase = 'active';
    window.localStorage.setItem(key, JSON.stringify(saved));
  }, EMAIL_KEY);
  await page.reload();
  practice = timed(page, 'Piloto Set 1 · Write an Email');
  await expect(practice.getByRole('status')).toContainText('Tiempo finalizado');
  await expect(practice.getByRole('textbox', { name: 'Tu respuesta' })).toHaveValue('A draft that must remain after expiry.');
  await expect(practice.getByRole('textbox', { name: 'Tu respuesta' })).toBeDisabled();
  await expect(practice.getByRole('button', { name: 'Enviar y sellar respuesta' })).toHaveCount(0);
});

test('Academic Discussion usa 10 minutos y mantiene el mínimo recomendado de 100', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto(DISCUSSION_ROUTE);
  const practice = timed(page, 'Piloto Set 1 · Write for an Academic Discussion');
  await expect(practice.getByRole('button', { name: 'Empezar tarea de 10 minutos' })).toBeVisible();
  await practice.getByRole('button', { name: 'Empezar tarea de 10 minutos' }).click();
  await expect(practice).toContainText('mínimo recomendado 100');
  await expect(practice).toContainText('Sin corrector ortográfico');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('el Set 1 guarda Email/Discussion pero ya no pide una banda de Writing inventada', async ({ page }) => {
  await page.goto(MOCK_ROUTE);
  await page.getByRole('button', { name: 'Empezar examen' }).click();
  await page.getByRole('button', { name: /Writing/ }).click();
  await expect(page.getByText(/Official task limit: 7 minutes/)).toBeVisible();
  await expect(page.getByText(/Official task limit: 10 minutes/)).toBeVisible();
  await expect(page.getByText(/80–120/)).toHaveCount(0);
  const writingBoxes = page.getByRole('textbox');
  await expect(writingBoxes).toHaveCount(2);
  await expect(writingBoxes.first()).toHaveAttribute('spellcheck', 'false');
  await writingBoxes.first().fill('Email draft');
  await writingBoxes.nth(1).fill('Discussion draft');

  await page.getByRole('button', { name: /^Speaking\s+\d+\// }).click();
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Finalizar examen' }).click();
  await expect(page.getByRole('heading', { name: 'Cierre de Writing' })).toBeVisible({ timeout: 180_000 });
  await expect(page.getByText(/not_evaluated/)).toHaveCount(2);
  await expect(page.getByRole('button', { name: 'Continuar sin inventar score' })).toBeVisible();
  await expect(page.getByText('Autoevaluación: Writing (Email + Academic Discussion)')).toHaveCount(0);
});
