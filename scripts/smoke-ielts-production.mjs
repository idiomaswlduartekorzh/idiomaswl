#!/usr/bin/env node

import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';

const base = process.env.IELTS_SMOKE_BASE ?? 'http://127.0.0.1:3137';
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];
const browser = await chromium.launch({ headless: true });
const browserErrors = [];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport: viewport });
    page.setDefaultTimeout(15_000);
    page.on('console', message => {
      if (message.type() === 'error') browserErrors.push(`console:${page.url()}:${message.text()}`);
    });
    page.on('pageerror', error => browserErrors.push(`page:${page.url()}:${error.stack ?? error.message}`));

    const catalog = await page.goto(`${base}/examenes/ielts`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(catalog?.status(), 200, `${viewport.name}: IELTS catalog status`);
    assert.equal(await page.getByText('Suscríbete para acceder').count(), 0, `${viewport.name}: subscription locks`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `${viewport.name}: catalog overflow`);
    await page.getByRole('heading', { level: 1 }).waitFor();

    const set5 = await page.goto(`${base}/examenes/ielts/practica/set-5`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(set5?.status(), 200, `${viewport.name}: Set 5 status`);
    assert.match(await page.locator('body').innerText(), /versión heredada|audio final 2026|revisión editorial/i);

    const set13 = await page.goto(`${base}/examenes/ielts/practica/set-13`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(set13?.status(), 200, `${viewport.name}: Set 13 status`);
    assert.match(await page.locator('body').innerText(), /Listening está temporalmente excluido|Listening pendiente/i);
    await page.getByRole('button', { name: 'Empezar examen' }).click();
    await page.getByRole('heading', { level: 1, name: 'IELTS Academic Set 13' }).waitFor();
    await page.getByRole('button', { name: /^Reading\b/ }).waitFor();
    assert.equal(await page.getByRole('button', { name: /^Listening\b/ }).isDisabled(), true, `${viewport.name}: unavailable Listening must stay disabled`);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `${viewport.name}: runner overflow`);
    await page.close();
  }

  const privatePage = await browser.newPage();
  privatePage.setDefaultTimeout(15_000);
  await privatePage.goto(`${base}/dashboard/student/resultados/ielts/00000000-0000-4000-8000-000000000000`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
  await privatePage.waitForURL(/\/login(?:\?|$)/);
  assert.match(privatePage.url(), /\/login(?:\?|$)/, 'private IELTS result must redirect to login');
  await privatePage.close();

  assert.deepEqual(browserErrors, [], browserErrors.join('\n'));
  console.log(JSON.stringify({
    catalog: 200,
    sets: [5, 13],
    viewports: viewports.map(viewport => viewport.name),
    locks: 0,
    averageUserJourney: 'intro-to-reading',
    privateResult: 'redirected-to-login',
    browserErrors: 0,
  }));
} finally {
  await browser.close();
}
