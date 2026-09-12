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
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.000/ })).toHaveCount(0);
    await page.getByRole('button', { name: /Autodidacta/ }).click();
    await page.getByRole('button', { name: /Exámenes \+ feedback docente · \$99\.000/ }).click();
    await expect(page.getByRole('button', { name: 'Continuar al registro' })).toBeEnabled();
    await page.getByRole('button', { name: 'Continuar al registro' }).click();

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
    await page.getByLabel('Idioma').selectOption('frances');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Idioma general/ }).click();
    await page.getByRole('button', { name: /Impulso · \$760\.000/ }).click();
    await page.getByRole('button', { name: 'Continuar al registro' }).click();

    await expect(page.getByText('Francés · Impulso · $760.000')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Crear cuenta' })).toBeVisible();
  });

  test('filtra los exámenes por el idioma elegido y muestra los tres precios', async ({ page }) => {
    await page.goto('/registro');
    await page.getByLabel('Idioma').selectOption('coreano');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Preparación para un examen/ }).click();
    await expect(page.getByLabel('Examen').getByRole('option', { name: 'TOPIK' })).toHaveCount(1);
    await expect(page.getByLabel('Examen').getByRole('option', { name: 'IELTS' })).toHaveCount(0);
    await page.getByLabel('Examen').selectOption('topik');
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.000/ })).toHaveCount(0);
    await page.getByRole('button', { name: /Autodidacta/ }).click();
    await expect(page.getByRole('button', { name: /Un examen autodidacta · \$12\.000/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Exámenes \+ corrección automática · \$49\.000/ })).toBeVisible();
    await expect(page.getByRole('button', { name: /Exámenes \+ feedback docente · \$99\.000/ })).toBeVisible();
  });

  test('la preparación con profesor abre los precios con idioma y examen seleccionados', async ({ page }) => {
    await page.goto('/registro');
    await page.getByLabel('Idioma').selectOption('italiano');
    await page.getByRole('button', { name: 'Continuar' }).click();
    await page.getByRole('button', { name: /Preparación para un examen/ }).click();
    await page.getByLabel('Examen').selectOption('cils-celi');
    await page.getByRole('button', { name: /Con profesor/ }).click();
    await expect(page.getByRole('button', { name: 'Ver clases y precios' })).toBeVisible();
    await page.getByRole('button', { name: 'Ver clases y precios' }).click();
    await expect(page).toHaveURL(/\/precios\?idioma=italiano&objetivo=CILS&plan=esencial&nivel=No\+s%C3%A9\+mi\+nivel/);
    const candidateLanguage = page.getByRole('radio', { name: 'Italiano' });
    if (await candidateLanguage.count()) {
      await expect(candidateLanguage).toBeChecked();
    } else {
      await expect(page.getByRole('tab', { name: '🇮🇹 Italiano' })).toHaveAttribute('aria-selected', 'true');
    }
  });
});
