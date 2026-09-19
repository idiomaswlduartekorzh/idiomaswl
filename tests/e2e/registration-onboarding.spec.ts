import { expect, test } from '@playwright/test';

test.describe('registro guiado', () => {
  test('exige elegir el producto antes de mostrar la creación de cuenta', async ({ page }) => {
    await page.goto('/registro');

    await expect(page.getByRole('heading', { name: '¿Qué idioma quieres estudiar?' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Continuar' })).toBeDisabled();

    await page.getByLabel('Idioma').selectOption('ingles');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await expect(page.getByRole('heading', { name: '¿Cuál es tu objetivo?' })).toBeVisible();
    await page.getByRole('button', { name: /Preparación para un examen/ }).click();
    await page.getByLabel('Examen').selectOption('ielts');
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.900/ })).toHaveCount(0);
    await page.getByRole('button', { name: /Autodidacta/ }).click();
    await page.getByRole('button', { name: /Exámenes \+ feedback personalizado · \$99\.900/ }).click();
    await expect(page.getByRole('button', { name: 'Continuar al registro' })).toBeEnabled();
    await page.getByRole('button', { name: 'Continuar al registro' }).click();

    await expect(page.getByRole('heading', { name: 'Crea tu cuenta' })).toBeVisible();
    await expect(page.getByText('IELTS · $99.900')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toBeVisible();
    await expect(page.getByLabel('Nombre completo')).toBeVisible();
    await expect(page.getByLabel('Correo electrónico')).toBeVisible();

    await page.getByRole('button', { name: 'Cambiar' }).click();
    await expect(page.getByRole('button', { name: 'Continuar con Google' })).toHaveCount(0);
  });

  test('el idioma general abre el reglamento antes de pedir los datos', async ({ page }) => {
    await page.goto('/registro');
    await page.getByLabel('Idioma').selectOption('frances');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Idioma general/ }).click();
    await page.getByRole('button', { name: /Impulso · \$760\.000/ }).click();
    await page.getByRole('button', { name: 'Continuar al reglamento' }).click();

    await expect(page).toHaveURL(/\/precios\?idioma=frances&objetivo=general&plan=impulso&nivel=No\+s%C3%A9\+mi\+nivel&paso=reglamento/);
    await expect(page.getByRole('heading', { name: 'Lo importante, antes de inscribirte' })).toBeVisible();
    const acceptance = page.getByLabel(/Confirmo que leí y acepto el reglamento/);
    await expect(acceptance).not.toBeChecked();
    await expect(page.getByText(/El formulario se desbloquea al confirmar la lectura/)).toBeVisible();
    await acceptance.check();
    await expect(page.getByLabel('WhatsApp con código de país')).toBeVisible();
    await expect(page.getByLabel('Dirección de residencia')).toBeVisible();
    await expect(page.getByLabel('Propósito del curso')).toBeVisible();
    await expect(page.getByLabel('Firma electrónica')).toBeVisible();
  });

  test('filtra los exámenes por el idioma elegido y muestra los tres precios', async ({ page }) => {
    await page.goto('/registro');
    await page.getByLabel('Idioma').selectOption('coreano');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Preparación para un examen/ }).click();
    await expect(page.getByLabel('Examen').getByRole('option', { name: 'TOPIK' })).toHaveCount(1);
    await expect(page.getByLabel('Examen').getByRole('option', { name: 'IELTS' })).toHaveCount(0);
    await page.getByLabel('Examen').selectOption('topik');
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.900/ })).toHaveCount(0);
    await page.getByRole('button', { name: /Autodidacta/ }).click();
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.900/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Exámenes \+ corrección automática · \$49\.900/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Exámenes \+ feedback personalizado · \$99\.900/ })).toBeVisible();
  });

  test('la preparación con profesor exige un plan y abre su reglamento', async ({ page }) => {
    await page.goto('/registro');
    await page.getByLabel('Idioma').selectOption('italiano');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Preparación para un examen/ }).click();
    await page.getByLabel('Examen').selectOption('cils-celi');
    await page.getByRole('button', { name: /Con profesor/ }).click();
    await expect(page.getByRole('button', { name: 'Continuar al reglamento' })).toBeDisabled();
    await expect(page.getByRole('button', { name: /Impulso · \$760\.000/ })).toBeVisible();
    await page.getByRole('button', { name: /Impulso · \$760\.000/ }).click();
    await page.getByRole('button', { name: 'Continuar al reglamento' }).click();
    await expect(page).toHaveURL(/\/precios\?idioma=italiano&objetivo=CILS&plan=impulso&nivel=No\+s%C3%A9\+mi\+nivel&paso=reglamento/);
    await expect(page.getByRole('heading', { name: 'Lo importante, antes de inscribirte' })).toBeVisible();
    const summary = page.getByRole('region', { name: 'Todo claro antes de seguir.' });
    await expect(summary.getByText('Italiano · CILS')).toBeVisible();
    await expect(summary.getByText('Impulso · 3 clases por semana')).toBeVisible();
    await expect(summary.getByText('$760.000 COP')).toBeVisible();
  });
});
