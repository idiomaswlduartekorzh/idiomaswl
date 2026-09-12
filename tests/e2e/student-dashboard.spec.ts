import { expect, test } from '@playwright/test';

test.describe('dashboard de estudiante después del pago', () => {
  test('distingue el examen individual de una suscripción', async ({ page }) => {
    await page.goto('/revision/dashboard-estudiante?plan=single');

    await expect(page.getByTestId('student-dashboard')).toHaveAttribute('data-plan', 'single');
    await expect(page.getByRole('heading', { name: 'Un examen' })).toBeVisible();
    await expect(page.getByText('$12.900 COP · pago único')).toBeVisible();
    await expect(page.getByText('Suscripción', { exact: true })).toHaveCount(0);
    await expect(page.getByRole('link', { name: /Ver reporte/ })).toBeVisible();
  });

  test('muestra renovación e intentos sin prometer feedback humano en el plan automático', async ({ page }) => {
    await page.goto('/revision/dashboard-estudiante?plan=automatic');

    await expect(page.getByTestId('student-dashboard')).toHaveAttribute('data-plan', 'automatic');
    await expect(page.getByRole('heading', { name: 'Xpress', exact: true })).toBeVisible();
    await expect(page.getByText('$49.900 COP · cada 30 días')).toBeVisible();
    await expect(page.getByText('Renovación activa')).toBeVisible();
    await expect(page.getByText(/No es una revisión humana/)).toHaveCount(0);
  });

  test('separa el feedback asistido por IA de las clases con profesor', async ({ page }) => {
    await page.goto('/revision/dashboard-estudiante?plan=personalized');

    await expect(page.getByTestId('student-dashboard')).toHaveAttribute('data-plan', 'personalized');
    await expect(page.getByRole('heading', { name: 'Xpress + feedback' })).toBeVisible();
    await expect(page.getByText('$99.900 COP · cada 30 días')).toBeVisible();
    await expect(page.getByText(/WeLearn lo genera con asistencia de IA/)).toBeVisible();
    await expect(page.getByText(/No es una revisión humana ni un resultado oficial/)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mi acompañamiento' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Coordinar por WhatsApp' })).toBeVisible();
  });
});
