#!/usr/bin/env node

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { chromium } from '@playwright/test';

const base = process.env.IELTS_SMOKE_BASE ?? 'http://127.0.0.1:3137';
const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 },
];
const browser = await chromium.launch({ headless: true });
const browserErrors = [];
const acceptedSet4Sha256 = '4fef56f5678bce1405bfa58cfc4619bf9e81c77a57132ad64173998b37c72ed2';

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

    const set4 = await page.goto(`${base}/examenes/ielts/practica/set-4`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(set4?.status(), 200, `${viewport.name}: Set 4 status`);
    assert.doesNotMatch(await page.locator('body').innerText(), /versión heredada|Listening pendiente/i);
    await page.getByRole('button', { name: 'Empezar examen' }).click();
    await page.getByRole('heading', { level: 1, name: 'IELTS Academic Set 4' }).waitFor();
    const acceptedListeningTab = page.locator('nav[aria-label="Secciones del simulacro"] button').filter({ hasText: /^Listening/ });
    assert.equal(await acceptedListeningTab.isDisabled(), false, `${viewport.name}: accepted Listening must be enabled`);
    const set4Audio = page.locator('audio[src*="ielts-listening-set-4.mp3"]');
    await set4Audio.waitFor({ state: 'attached' });
    const set4AudioSrc = await set4Audio.getAttribute('src');
    assert.ok(set4AudioSrc, `${viewport.name}: Set 4 audio src`);
    if (viewport.name === 'desktop') {
      const audioResponse = await page.request.get(new URL(set4AudioSrc, base).toString());
      assert.equal(audioResponse.status(), 200, 'Set 4 audio response');
      assert.match(audioResponse.headers()['content-type'] ?? '', /^audio\/mpeg/);
      assert.equal(createHash('sha256').update(await audioResponse.body()).digest('hex'), acceptedSet4Sha256, 'served Set 4 audio must be the accepted master');
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth), false, `${viewport.name}: Set 4 runner overflow`);

    const set5 = await page.goto(`${base}/examenes/ielts/practica/set-5`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(set5?.status(), 200, `${viewport.name}: Set 5 status`);
    assert.match(await page.locator('body').innerText(), /versión heredada|audio final 2026|revisión editorial/i);

    const set13 = await page.goto(`${base}/examenes/ielts/practica/set-13`, { waitUntil: 'domcontentloaded', timeout: 30_000 });
    assert.equal(set13?.status(), 200, `${viewport.name}: Set 13 status`);
    assert.match(await page.locator('body').innerText(), /Listening está temporalmente excluido|Listening pendiente/i);
    await page.getByRole('button', { name: 'Empezar examen' }).click();
    await page.getByRole('heading', { level: 1, name: 'IELTS Academic Set 13' }).waitFor();
    await page.getByRole('button', { name: /^Reading\b/ }).waitFor();
    const unavailableListeningTab = page.locator('nav[aria-label="Secciones del simulacro"] button').filter({ hasText: /^Listening/ });
    assert.equal(await unavailableListeningTab.isDisabled(), true, `${viewport.name}: unavailable Listening must stay disabled`);
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
    sets: [4, 5, 13],
    set4AudioSha256: acceptedSet4Sha256,
    viewports: viewports.map(viewport => viewport.name),
    locks: 0,
    averageUserJourney: 'intro-to-reading',
    privateResult: 'redirected-to-login',
    browserErrors: 0,
  }));
} finally {
  await browser.close();
}
