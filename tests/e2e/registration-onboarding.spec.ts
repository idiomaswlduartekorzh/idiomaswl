import { expect, test } from '@playwright/test';

test.describe('registro guiado', () => {
  test('exige elegir el producto antes de mostrar la creación de cuenta', async ({ page }) => {
    await page.goto('/registro');

    await expect(page.getByRole('heading', { name: '¿Qué quieres aprender?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Continuar' })).toBeDisabled();

    await page.getByRole('button', { name: /Preparar un examen/ }).click();
    await page.getByLabel('Examen').selectOption('ielts');
    await page.getByLabel('Suscripción').selectOption('exam-teacher');
    await expect(page.getByRole('button', { name: 'Continuar' })).toBeEnabled();
    await page.getByRole('button', { name: 'Continuar' }).click();

    await expect(page.getByRole('heading', { name: 'Crea tu cuenta' })).toBeVisible();
    await expect(page.getByText('IELTS · $99.000')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toBeVisible();
    await expect(page.getByLabel('Nombre completo')).toBeVisible();
    await expect(page.getByLabel('Correo electrónico')).toBeVisible();

    await page.getByRole('button', { name: 'Cambiar' }).click();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toHaveCount(0);
  });

  test('conserva el idioma antes de crear la cuenta', async ({ page }) => {
    await page.goto('/registro');
    await page.getByRole('button', { name: /Aprender un idioma/ }).click();
    await page.getByLabel('Idioma').selectOption('frances');
    await page.getByRole('button', { name: 'Continuar' }).click();

    await expect(page.getByText('Idioma · Francés')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Crear cuenta' })).toBeVisible();
  });
});
