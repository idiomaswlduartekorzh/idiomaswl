import { expect, test } from '@playwright/test';

test('an ICFES mock completes against the real grading API and stops at the required lead gate', async ({ page }) => {
  page.on('dialog', (dialog) => void dialog.accept());
  await page.goto('/examenes/icfes/practica/mock-01');
  await page.getByRole('button', { name: /Empezar modo examen/ }).click();
  await page.getByRole('button', { name: 'Finalizar examen' }).click();
  const gate = page.getByTestId('icfes-lead-gate');
  await expect(gate).toBeVisible();
  await expect(gate.getByText('Tu examen ya fue calificado')).toBeVisible();
  await expect(gate.getByLabel('Nombre completo')).toHaveAttribute('required', '');
  await expect(gate.getByLabel('Correo electrónico')).toHaveAttribute('required', '');
  await expect(gate.getByLabel('WhatsApp')).toHaveAttribute('required', '');
  await expect(page.getByTestId('icfes-result-offers')).toHaveCount(0);
  await expect(page.getByText(/\d+\/45/)).toHaveCount(0);
});
