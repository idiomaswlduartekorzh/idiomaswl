import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { chromium, expect } from '@playwright/test';

const args = Object.fromEntries(process.argv.slice(2).map(arg => {
  const equals = arg.indexOf('=');
  return [arg.slice(2, equals), arg.slice(equals + 1)];
}));
const baseURL = new URL(args.base || 'http://127.0.0.1:3000').origin;
const hub = '/practica/ielts';
const skills = {};
const errors = [];
const options = { headless: true, args: ['--use-fake-device-for-media-stream'] };
const browser = await chromium.launch({ ...options, channel: process.env.PLAYWRIGHT_CHROMIUM_CHANNEL || 'chrome' })
  .catch(() => chromium.launch(options));
const desktop = await browser.newContext({ baseURL, viewport: { width: 1440, height: 900 } });
const page = await desktop.newPage();
page.setDefaultTimeout(30000);
page.setDefaultNavigationTimeout(120000);
page.on('pageerror', error => errors.push(error.message));

async function visit(target, path) {
  const response = await target.goto(path, { waitUntil: 'domcontentloaded', timeout: 90000 });
  assert.equal(response?.status(), 200, path);
  await expect(target.locator('h1').first()).toBeVisible();
}

async function enterSkill(slug) {
  await visit(page, hub);
  await page.locator('main a[href="' + hub + '/' + slug + '"]').first().click({ timeout: 120000 });
  await expect(page).toHaveURL(baseURL + hub + '/' + slug, { timeout: 90000 });
}

async function openExplanation(summary) {
  await summary.focus();
  await summary.press('Enter');
  return summary.locator('..');
}

async function checkRecording() {
  await page.getByRole('button', { name: 'Record response', exact: true }).click();
  const stop = page.getByRole('button', { name: /^Stop/ });
  await expect(stop).toContainText('0:01', { timeout: 10000 });
  await stop.click();
  const recording = page.locator('#develop audio');
  await expect(recording).toHaveCount(1);
  await recording.evaluate(audio => audio.play());
  await recording.evaluate(audio => audio.pause());
}

try {
  await enterSkill('reading');
  await page.locator('main a[href$="/habilidades/gestion-del-tiempo"]').first().waitFor();
  const destinations = await page.locator('main a').evaluateAll(links =>
    [...new Set(links.map(link => link.pathname).filter(path =>
      /^\/practica\/ielts\/reading\/(?:habilidades\/[^/]+|tipos-de-preguntas\/[^/]+|mixed-practice)$/.test(path)))]);
  assert.equal(destinations.filter(path => path.includes('/habilidades/')).length, 6, 'Reading skill links');
  assert.equal(destinations.filter(path => path.includes('/tipos-de-preguntas/')).length, 14, 'Reading question types');
  assert.ok(destinations.includes(hub + '/reading/mixed-practice'), 'Mixed practice must be reachable from Reading');
  for (const path of destinations) {
    const response = await desktop.request.get(path, { timeout: 120000 });
    assert.equal(response.status(), 200, path);
    assert.match(await response.text(), /data-active-practice="true"/, path);
    await response.dispose();
  }
  await page.locator('main a[href$="/habilidades/scanning"]').first().click();
  const guided = page.getByRole('region', { name: 'Guided scanning practice' });
  const question = guided.locator('article').filter({ has: page.locator('fieldset') }).first();
  const checkSignal = question.getByRole('button', { name: 'Check search signal' });
  await expect(checkSignal).toBeDisabled();
  const signals = question.getByRole('radio');
  await expect(async () => {
    await signals.nth(1).check();
    await signals.first().check();
    await expect(checkSignal).toBeEnabled({ timeout: 1500 });
  }).toPass({ timeout: 45000 });
  await checkSignal.click();
  const evidenceChoices = question.getByRole('group').last().getByRole('radio');
  await evidenceChoices.first().check();
  await question.getByRole('button', { name: 'Check evidence' }).click();
  await expect(question.getByRole('status')).toHaveCount(2);
  skills.Reading = { lessons: destinations.length, guidedSignalAndEvidence: true };

  await enterSkill('writing');
  for (const [task, count, name] of [['task1', 7, 'Practise this visual type'], ['task2', 5, 'Practise this question type']]) {
    await page.locator('main a[href="' + hub + '/academic/writing/' + task + '"]').first().click();
    const cards = page.locator('article').filter({ has: page.getByRole('link', { name: new RegExp(name) }) });
    await expect(cards).toHaveCount(count);
    for (const card of await cards.all()) {
      const opened = await openExplanation(card.locator('summary'));
      await expect(opened.locator('p').first()).toBeVisible();
      const href = await card.getByRole('link', { name: new RegExp(name) }).getAttribute('href');
      const response = await desktop.request.get(href, { timeout: 120000 });
      assert.equal(response.status(), 200, href);
      await response.dispose();
    }
    await visit(page, hub + '/writing');
  }
  const rubric = await desktop.request.get(hub + '/academic/writing/rubrica');
  assert.equal(rubric.status(), 200);
  await rubric.dispose();
  skills.Writing = { visualFamilies: 7, essayFamilies: 5, rubric: true };

  await enterSkill('listening');
  for (const part of [1, 2, 3, 4]) {
    const card = page.locator('#listening-part-' + part);
    const button = card.getByRole('button', { name: 'Check my answer' });
    await expect(button).toBeDisabled();
    await expect(card.locator('details')).toHaveCount(0);
    const clip = card.locator('audio');
    await clip.evaluate(async audio => { await audio.play(); audio.pause(); });
    assert.ok(await clip.evaluate(audio => audio.duration > 5 && audio.duration < 25), 'Part ' + part + ' excerpt duration');
    if (await card.getByRole('radio').count()) await card.getByRole('radio').first().check();
    else await card.getByRole('textbox').fill('another');
    await button.click();
    await expect(card.getByRole('status')).toBeVisible();
    const reviewed = await openExplanation(card.locator('summary'));
    await expect(reviewed.locator('p')).toBeVisible();
    await card.getByRole('button', { name: 'Try this clip again' }).click();
    await expect(card.locator('details')).toHaveCount(0);
  }
  skills.Listening = { playableExcerpts: 4, attemptCorrectionRetry: 4 };

  await enterSkill('speaking');
  await desktop.grantPermissions(['microphone'], { origin: baseURL });
  const workshop = page.locator('#develop');
  for (const part of [1, 2, 3]) {
    await workshop.getByRole('radio', { name: new RegExp('Part ' + part) }).check();
    await expect(workshop.locator('blockquote').first()).toBeVisible();
    const details = await openExplanation(workshop.locator('summary'));
    await expect(details.locator('blockquote')).toBeVisible();
    await expect(details.getByText('Try it once more')).toBeVisible();
  }
  await checkRecording();
  await workshop.getByRole('radio', { name: 'Second take' }).check();
  await checkRecording();
  await workshop.getByRole('radio', { name: /First take/ }).check();
  await expect(workshop.locator('audio')).toHaveAccessibleName(/Part 3, take 1/);
  await workshop.getByRole('radio', { name: /Part 2/ }).check();
  await expect(workshop.locator('audio')).toHaveCount(0);
  await workshop.getByRole('radio', { name: /Part 3/ }).check();
  await expect(workshop.locator('audio')).toHaveCount(1);
  skills.Speaking = { parts: 3, separateRecordingsPlayed: 2 };

  const mobile = await browser.newContext({ baseURL, viewport: { width: 320, height: 844 }, colorScheme: 'dark' });
  const small = await mobile.newPage();
  small.on('pageerror', error => errors.push(error.message));
  await mobile.addInitScript(() => {
    localStorage.setItem('wl-theme', 'dark');
    if (navigator.mediaDevices) navigator.mediaDevices.getUserMedia = () => Promise.reject(new DOMException('Denied', 'NotAllowedError'));
  });
  for (const slug of ['reading/habilidades/scanning', 'academic/writing/task1', 'academic/writing/task2', 'listening', 'speaking']) {
    await visit(small, hub + '/' + slug);
    await small.locator('html').evaluate(el => el.setAttribute('data-theme', 'dark'));
    assert.ok(await small.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1), 'Horizontal overflow on ' + slug);
  }
  await small.getByRole('button', { name: 'Record response' }).click();
  await expect(small.locator('.ielts-recorder__message')).toContainText(/microphone/i);
  await small.getByRole('radio', { name: /Part 2/ }).check();
  await expect((await openExplanation(small.locator('#develop summary'))).locator('blockquote')).toBeVisible();
  skills.Speaking.withoutMicrophone = true;
  await mobile.close();
  assert.deepEqual(errors, []);
  console.log('IELTS Academic browser checks passed across four skills.');
} finally {
  await browser.close();
  if (args.output) {
    await mkdir(dirname(args.output), { recursive: true });
    await writeFile(args.output, JSON.stringify({ passed: Object.keys(skills).length === 4 && !!skills.Speaking?.withoutMicrophone && !errors.length, skills, errors, baseURL }, null, 2) + '\n');
  }
}
