import { expect, test, type Page, type Route } from '@playwright/test';
import { erroresPropios } from './consola-ajena';

const DIAGNOSTIC_ROUTE = '/nivel-radar';
const STORAGE_KEY = 'welearn:diagnostic:active-attempt';
const ATTEMPT_ID = '10000000-0000-4000-8000-000000000001';
const EXPIRES_AT = '2026-09-26T12:00:00.000Z';

const objectiveDelivery = {
  attemptId: ATTEMPT_ID,
  attemptVersion: 1,
  expiresAt: EXPIRES_AT,
  stage: { stageId: 'locator-stage-1', kind: 'locator', itemIds: ['reading-1', 'listening-1', 'grammar-1'] },
  items: [
    {
      id: 'reading-1', contentVersion: 'v1', skill: 'reading', subdomain: 'detail',
      prompt: 'When does the library close?',
      stimulus: { kind: 'text', stimulusId: 'notice-1', title: 'Library notice', body: 'Open Tuesday until 6 p.m.' },
      response: { kind: 'single-choice', optionIds: ['monday', 'tuesday'] },
      displayOptions: [{ id: 'monday', text: 'Monday' }, { id: 'tuesday', text: 'Tuesday' }],
    },
    {
      id: 'listening-1', contentVersion: 'v1', skill: 'listening', subdomain: 'detail',
      prompt: 'Which platform does the speaker mention?',
      stimulus: {
        kind: 'audio', mediaId: 'private-audio-1', src: '/api/diagnostic/media/private-audio-1',
        startMs: 0, endMs: 2_000, maxPlays: 2,
      },
      response: { kind: 'single-choice', optionIds: ['train', 'bus'] },
      displayOptions: [{ id: 'train', text: 'The train platform' }, { id: 'bus', text: 'The bus platform' }],
    },
    {
      id: 'grammar-1', contentVersion: 'v1', skill: 'grammar', subdomain: 'verb-form',
      prompt: 'Choose the two acceptable forms.', stimulus: { kind: 'none' },
      response: { kind: 'multiple-choice', optionIds: ['has-left', 'left', 'leave'], selectCount: 2 },
      displayOptions: [
        { id: 'has-left', text: 'She has left already.' },
        { id: 'left', text: 'She left yesterday.' },
        { id: 'leave', text: 'She leave yesterday.' },
      ],
    },
  ],
} as const;

const writingDelivery = {
  attemptId: ATTEMPT_ID,
  attemptVersion: 2,
  expiresAt: EXPIRES_AT,
  stage: { stageId: 'writing-stage-1', kind: 'writing', itemIds: ['writing-b1-1'] },
  prompt: {
    id: 'writing-b1-1', contentVersion: 'v1', title: 'A short message',
    situation: 'Write to a classmate about your English routine.',
    instructions: ['Describe when you study.', 'Explain one goal.'],
    minimumWords: 5, maximumWords: 20, recommendedMinutes: 8,
  },
} as const;

const resultProfile = {
  globalLevel: 'B1',
  globalRange: ['A2', 'B1'],
  skills: ['reading', 'listening', 'writing', 'grammar', 'vocabulary'].map((skill, index) => ({
    skill,
    estimatedLevel: index === 1 ? 'A2' : 'B1',
    plausibleRange: index === 1 ? ['A1', 'B1'] : ['A2', 'B2'],
    confidence: index === 1 ? 0.54 : 0.76,
  })),
  recommendations: [{
    priority: 1, skill: 'listening', currentLevel: 'A2', targetLevel: 'B1',
    reason: 'La escucha tiene el rango más amplio.', practice: { href: '/practica/ingles', label: 'Practicar escucha' },
  }],
  warnings: ['La estimación de escucha conserva incertidumbre alta.'],
};

async function fulfillJson(route: Route, status: number, body: unknown) {
  await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
}

async function beginDiagnostic(page: Page) {
  await page.goto(DIAGNOSTIC_ROUTE);
  await expect(page.getByRole('heading', { name: /Tu perfil real/ })).toBeVisible();
  const start = page.getByRole('button', { name: /Iniciar diagnóstico/ });
  await expect(start).toBeDisabled();
  const audioSample = page.getByLabel('Muestra de sonido no puntuada');
  await expect(audioSample.locator('source')).toHaveAttribute('src', /en-a1-my-morning-at-the-cafe\.mp3/);
  await audioSample.evaluate(element => element.dispatchEvent(new Event('play', { bubbles: true })));
  await page.getByLabel('Confirmo que escuché la muestra con claridad.').check();
  await page.getByLabel(/Acepto que mis respuestas/).check();
  await start.click();
}

test.beforeEach(async ({ page }) => {
  await page.route('**/api/diagnostic/media/private-audio-1', route => route.fulfill({
    status: 200,
    contentType: 'audio/mpeg',
    body: Buffer.from([]),
  }));
});

test('desktop recorre evidencia objetiva, audio, omisión y escritura con teclado', async ({ page }) => {
  const consoleErrors: string[] = [];
  const submissions: unknown[] = [];
  page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
  await page.route('**/api/diagnostic/attempts', async route => {
    if (route.request().method() === 'POST') await fulfillJson(route, 200, { ok: true, delivery: objectiveDelivery });
    else await route.fallback();
  });
  await page.route('**/api/diagnostic/attempts/*/stages/*', async route => {
    submissions.push(route.request().postDataJSON());
    if (route.request().url().endsWith('/locator-stage-1')) {
      await fulfillJson(route, 200, { ok: true, delivery: writingDelivery });
    } else {
      await fulfillJson(route, 200, { ok: true });
    }
  });

  await beginDiagnostic(page);
  await expect(page.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '33');
  const tuesday = page.getByRole('button', { name: /Tuesday/ });
  await tuesday.focus();
  await page.keyboard.press('Enter');
  await expect(tuesday).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Siguiente/ }).click();

  await expect(page.getByText('0 de 2 reproducciones iniciadas')).toBeVisible();
  await page.locator('audio').dispatchEvent('play');
  await expect(page.getByText('1 de 2 reproducciones iniciadas')).toBeVisible();
  await page.getByRole('button', { name: /No sé \/ omitir/ }).click();
  await expect(page.getByRole('button', { name: /No sé \/ omitir/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Siguiente/ }).click();

  await page.getByRole('button', { name: /has left already/ }).click();
  await page.getByRole('button', { name: /left yesterday/ }).click();
  await page.getByRole('button', { name: /Enviar etapa/ }).click();
  await expect(page.getByRole('heading', { name: 'Write to a classmate about your English routine.' })).toBeVisible();
  const sendWriting = page.getByRole('button', { name: /Enviar para evaluación/ });
  await expect(sendWriting).toBeDisabled();
  await page.getByRole('textbox', { name: 'Tu respuesta' }).fill('I study English nightly and practise listening.');
  await expect(sendWriting).toBeEnabled();
  await sendWriting.click();
  await expect(page.getByRole('heading', { name: 'Tu evidencia está completa' })).toBeVisible();

  expect(submissions).toHaveLength(2);
  const objective = submissions[0] as { responses: Array<Record<string, unknown>> };
  expect(objective.responses).toHaveLength(3);
  expect(objective.responses[1]).toMatchObject({ itemId: 'listening-1', audioPlayCount: 1, response: { optionId: null } });
  expect(submissions[1]).toMatchObject({ attemptVersion: 2, responseText: 'I study English nightly and practise listening.' });
  expect(erroresPropios(consoleErrors), consoleErrors.join('\n')).toEqual([]);
});

test('recarga restaura pregunta y selección; un fallo conserva evidencia para reintentar', async ({ page }) => {
  let stageSubmissions = 0;
  await page.route('**/api/diagnostic/attempts', async route => {
    if (route.request().method() === 'POST') await fulfillJson(route, 200, { ok: true, delivery: objectiveDelivery });
    else await route.fallback();
  });
  await page.route(`**/api/diagnostic/attempts/${ATTEMPT_ID}`, route =>
    fulfillJson(route, 200, { ok: true, resume: { kind: 'objective-stage', delivery: objectiveDelivery } }));
  await page.route('**/api/diagnostic/attempts/*/stages/*', async route => {
    stageSubmissions += 1;
    if (stageSubmissions === 1) await fulfillJson(route, 503, { ok: false, error: 'Servicio temporalmente no disponible.' });
    else await fulfillJson(route, 200, { ok: true, delivery: writingDelivery });
  });

  await beginDiagnostic(page);
  await page.getByRole('button', { name: /Tuesday/ }).click();
  await page.getByRole('button', { name: /Siguiente/ }).click();
  await page.getByRole('button', { name: /No sé \/ omitir/ }).click();
  await page.getByRole('button', { name: /Siguiente/ }).click();
  const validForm = page.getByRole('button', { name: /has left already/ });
  await validForm.click();
  await page.reload();
  await expect(page.getByText('Choose the two acceptable forms.')).toBeVisible();
  await expect(page.getByRole('button', { name: /has left already/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Enviar etapa/ }).click();
  await expect(page.getByText('Servicio temporalmente no disponible.')).toBeVisible();
  await expect(page.getByRole('button', { name: /has left already/ })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: /Enviar etapa/ }).click();
  await expect(page.getByRole('heading', { name: 'Write to a classmate about your English routine.' })).toBeVisible();
  expect(stageSubmissions).toBe(2);
});

test('móvil muestra resultado integral con rangos, cinco habilidades y sin desborde', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(({ key, attemptId }) => sessionStorage.setItem(key, attemptId), {
    key: STORAGE_KEY, attemptId: ATTEMPT_ID,
  });
  await page.route(`**/api/diagnostic/attempts/${ATTEMPT_ID}`, route =>
    fulfillJson(route, 200, { ok: true, resume: {
      kind: 'result', attemptId: ATTEMPT_ID, attemptVersion: 4, status: 'completed', resultProfile,
    } }));
  await page.goto(DIAGNOSTIC_ROUTE);
  await expect(page.getByRole('heading', { name: 'Nivel global B1' })).toBeVisible();
  await expect(page.getByText('Rango plausible global: A2–B1.')).toBeVisible();
  await expect(page.getByText(/Advertencias del perfil/)).toContainText('incertidumbre alta');
  await expect(page.locator('[class*="profileCard"]')).toHaveCount(6);
  await expect(page.getByText(/provisionales hasta completar calibración/)).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('un intento abandonado vuelve al inicio y elimina el puntero de reanudación', async ({ page }) => {
  await page.addInitScript(({ key, attemptId }) => sessionStorage.setItem(key, attemptId), {
    key: STORAGE_KEY, attemptId: ATTEMPT_ID,
  });
  await page.route(`**/api/diagnostic/attempts/${ATTEMPT_ID}`, route =>
    fulfillJson(route, 200, { ok: true, resume: {
      kind: 'closed', attemptId: ATTEMPT_ID, attemptVersion: 2, status: 'abandoned',
    } }));
  await page.goto(DIAGNOSTIC_ROUTE);
  await expect(page.getByRole('heading', { name: /Tu perfil real/ })).toBeVisible();
  await expect(page.getByText('El intento fue cerrado.')).toBeVisible();
  await expect.poll(() => page.evaluate(key => sessionStorage.getItem(key), STORAGE_KEY)).toBeNull();
});
