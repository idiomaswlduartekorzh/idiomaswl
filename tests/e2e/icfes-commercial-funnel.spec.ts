import { expect, test, type Page } from '@playwright/test';

const attemptId = '12345678-1234-4234-8234-123456789abc';
const offers = [
  {
    offerId: 'exam-single', code: 'icfes-single-report-v1', title: 'Informe de un intento',
    amountInCents: 1_290_000, currency: 'COP', billingLabel: 'pago único',
    benefits: ['Detalle pregunta por pregunta'], checkoutEnabled: false,
  },
  {
    offerId: 'exam-auto', code: 'icfes-membership-v1', title: 'Membresía ICFES',
    amountInCents: 4_990_000, currency: 'COP', billingLabel: 'renovable cada 30 días',
    benefits: ['Informes e historial'], checkoutEnabled: false,
  },
  {
    offerId: 'exam-teacher', code: 'icfes-intensive-v1', title: 'Membresía ICFES Intensiva',
    amountInCents: 9_990_000, currency: 'COP', billingLabel: 'renovable cada 30 días',
    benefits: ['Feedback pedagógico personalizado de WeLearn, generado automáticamente a partir de tus resultados'],
    checkoutEnabled: false,
  },
] as const;

async function expectNoHorizontalOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBe(true);
}

for (const device of [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
] as const) {
  test(`ICFES lead → offer → free funnel is private and responsive on ${device.name}`, async ({ page }) => {
    await page.setViewportSize({ width: device.width, height: device.height });
    page.on('dialog', (dialog) => void dialog.accept());
    await page.route('**/api/icfes/attempts/start', (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ ok: true, attemptToken: 'opaque-test-token' }),
    }));
    await page.route('**/api/icfes/attempts/grade', async (route) => {
      const payload = route.request().postDataJSON() as Record<string, unknown>;
      expect(payload).toEqual(expect.objectContaining({ examId: 'mock-01', attemptToken: 'opaque-test-token' }));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ ok: true, attemptId, examId: 'mock-01', leadRequired: true, officialResource: false, premiumEligible: true }),
      });
    });
    await page.route(`**/api/icfes/attempts/${attemptId}/lead`, async (route) => {
      const payload = route.request().postDataJSON() as Record<string, unknown>;
      expect(payload).toEqual(expect.objectContaining({ consentVersion: 'icfes-lead-contact-2026-09-12-v1' }));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          ok: true,
          offer: { version: 'icfes-2026-09-12-v2', offers, checkoutMode: 'disabled' },
          premiumEligible: true,
          officialResource: false,
        }),
      });
    });
    await page.route(`**/api/icfes/attempts/${attemptId}/free-summary`, (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        ok: true,
        result: {
          attemptId, examId: 'mock-01', correct: 31, total: 45, percentage: 69,
          disclaimer: 'Resultado pedagógico no oficial; no predice el puntaje ICFES.',
          officialResource: false, premiumEligible: true,
        },
      }),
    }));

    await page.goto('/examenes/icfes/practica/mock-01');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await page.getByRole('button', { name: /Empezar modo examen/ }).click();
    await page.locator('.prac-sidebar__submit button').click();

    await expect(page.getByTestId('icfes-lead-gate')).toBeVisible();
    await expect(page.getByText('Tu examen ya fue calificado')).toBeVisible();
    await expect(page.getByText(/31|69%/)).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await page.getByLabel('Nombre completo').fill('Prueba ICFES');
    await page.getByLabel('Correo electrónico').fill('prueba@example.com');
    await page.getByRole('textbox', { name: 'WhatsApp', exact: true }).fill('3001234567');
    await page.getByLabel(/Autorizo a WeLearn/).check();
    await page.getByRole('button', { name: 'Guardar y ver opciones' }).click();

    const offerScreen = page.getByTestId('icfes-offer-screen');
    await expect(offerScreen).toBeVisible();
    await expect(offerScreen.getByText('COP 12.900', { exact: true })).toBeVisible();
    await expect(offerScreen.getByText('COP 49.900', { exact: true })).toBeVisible();
    await expect(offerScreen.getByText('COP 99.900', { exact: true })).toBeVisible();
    await expect(offerScreen.getByText('renovable cada 30 días')).toHaveCount(2);
    const intensive = offerScreen.locator('article').filter({ hasText: 'Membresía ICFES Intensiva' });
    await expect(intensive.getByText('Feedback pedagógico personalizado de WeLearn, generado automáticamente a partir de tus resultados')).toBeVisible();
    await expect(offerScreen.locator('article').filter({ hasNotText: 'Membresía ICFES Intensiva' }).getByText(/Feedback pedagógico personalizado/)).toHaveCount(0);
    await expect(offerScreen.getByText(/docente|profesor|24 horas/i)).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await offerScreen.getByRole('button', { name: 'Continuar con resumen gratuito' }).click();
    const freeResult = page.getByTestId('icfes-free-result');
    await expect(freeResult).toContainText('31/45');
    await expect(freeResult).toContainText('69%');
    await expect(freeResult).toContainText('no oficial');
    await expect(freeResult.getByText(/desglose|habilidades|respuesta correcta|explicación/i)).toHaveCount(0);
    await expectNoHorizontalOverflow(page);
  });
}

test('ICFES mock still finishes with a score when persistence and payments are off', async ({ page }) => {
  page.on('dialog', (dialog) => void dialog.accept());
  await page.route('**/api/icfes/attempts/start', (route) => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({ ok: true, attemptToken: 'opaque-test-token' }),
  }));
  await page.route('**/api/icfes/attempts/grade', (route) => route.fulfill({
    status: 200, contentType: 'application/json',
    body: JSON.stringify({
      ok: true, attemptId, examId: 'mock-01', leadRequired: false, commerceAvailable: false,
      freeSummary: {
        attemptId, examId: 'mock-01', correct: 31, total: 45, percentage: 69,
        disclaimer: 'Resultado pedagógico no oficial; no predice el puntaje ICFES.',
        officialResource: false, premiumEligible: true,
      },
    }),
  }));
  await page.goto('/examenes/icfes/practica/mock-01');
  await page.getByRole('button', { name: /Empezar modo examen/ }).click();
  await page.locator('.prac-sidebar__submit button').click();
  const result = page.getByTestId('icfes-free-only-result');
  await expect(result).toContainText('31/45');
  await expect(result).toContainText('No te pedimos datos ni se generó un cobro');
  await expect(page.getByTestId('icfes-lead-gate')).toHaveCount(0);
  await expectNoHorizontalOverflow(page);
});
