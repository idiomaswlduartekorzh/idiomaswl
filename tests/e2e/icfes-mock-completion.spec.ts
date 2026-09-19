import { expect, test } from '@playwright/test';

test('an ICFES mock completes against the real grading API with commerce disabled', async ({ page }) => {
  page.on('dialog', (dialog) => void dialog.accept());
  await page.goto('/examenes/icfes/practica/mock-01');
  await page.getByRole('button', { name: /Empezar modo examen/ }).click();
  await page.getByRole('button', { name: 'Finalizar examen' }).click();
  await expect(page.getByTestId('icfes-free-result')).toBeVisible();
  await expect(page.getByText('Tu resultado ya está visible. Dejar tus datos es opcional.')).toBeVisible();
  await expect(page.getByTestId('icfes-pass-offer')).toHaveCount(0);
});
