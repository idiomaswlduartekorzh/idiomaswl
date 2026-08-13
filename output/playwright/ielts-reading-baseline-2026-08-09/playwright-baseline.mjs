#!/usr/bin/env node

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../../..');
const BASE_URL = process.env.IELTS_READING_BASE_URL ?? 'http://localhost:3001';
const baseline = JSON.parse(readFileSync(resolve(HERE, 'baseline.json'), 'utf8'));

const routeFromPageFile = path =>
  path
    .replace(/^src\/app\/\(site\)/u, '')
    .replace(/\/page\.tsx$/u, '');

const publishedRoutes = baseline.sourceIdentity.files
  .map(file => file.path)
  .filter(path =>
    /^src\/app\/\(site\)\/practica\/ielts\/reading\/(tipos-de-preguntas|habilidades)\/[^/]+\/page\.tsx$/u
      .test(path),
  )
  .map(routeFromPageFile)
  .sort();

const routes = [
  '/practica/ielts/reading',
  '/practica/ielts/reading/tipos-de-preguntas',
  '/practica/ielts/reading/habilidades',
  ...publishedRoutes,
];

const viewports = [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1024, height: 768 },
  { width: 1440, height: 900 },
];

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();

async function gotoReady(page, url, { requireH1 = true } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      const response = await page.goto(url, { waitUntil: 'commit', timeout: 90_000 });
      if (requireH1) {
        await page.locator('h1').first().waitFor({ state: 'attached', timeout: 30_000 });
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 8) await page.waitForTimeout(1_000);
    }
  }
  throw lastError;
}

async function requestGetReady(url, options = {}) {
  let lastError;
  for (let attempt = 1; attempt <= 8; attempt += 1) {
    try {
      return await context.request.get(url, options);
    } catch (error) {
      lastError = error;
      if (attempt < 8) await new Promise(resolveTimeout => setTimeout(resolveTimeout, 1_000));
    }
  }
  throw lastError;
}

async function inspectRoute(route) {
  const page = await context.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  const pageerrors = [];
  const consoleErrors = [];
  const failedRequests = [];

  page.on('pageerror', error => pageerrors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', request => {
    failedRequests.push({
      url: request.url(),
      reason: request.failure()?.errorText ?? 'unknown',
    });
  });

  const response = await gotoReady(page, `${BASE_URL}${route}`);
  await page.waitForTimeout(100);
  const dom = await page.evaluate(() => ({
    title: document.title,
    h1: [...document.querySelectorAll('h1')].map(node => node.textContent?.trim() ?? ''),
    mainCount: document.querySelectorAll('main').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? null,
    readingLinks: [...document.querySelectorAll('main a[href]')]
      .map(link => link.getAttribute('href'))
      .filter(href => href?.startsWith('/practica/ielts/reading')),
    hasObsoleteComingSoon: /próximamente en reading/iu.test(document.body.innerText),
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));

  await page.close();
  return {
    route,
    status: response?.status() ?? null,
    ...dom,
    pageerrors,
    consoleErrors: [...new Set(consoleErrors)].sort(),
    failedRequests: failedRequests
      .filter((request, index, array) =>
        array.findIndex(candidate =>
          candidate.url === request.url && candidate.reason === request.reason,
        ) === index,
      )
      .sort((a, b) => a.url.localeCompare(b.url)),
  };
}

const routeResults = [];
for (const route of routes) routeResults.push(await inspectRoute(route));

const internalLinks = [...new Set(
  routeResults.flatMap(result => result.readingLinks),
)].sort();
const internalLinkResults = [];
for (const href of internalLinks) {
  const response = await requestGetReady(`${BASE_URL}${href}`, {
    failOnStatusCode: false,
    maxRedirects: 5,
  });
  internalLinkResults.push({ href, status: response.status() });
}

const responsive = [];
for (const viewport of viewports) {
  const page = await context.newPage();
  await page.setViewportSize(viewport);
  await gotoReady(page, `${BASE_URL}/practica/ielts/reading`);
  const metrics = await page.evaluate(() => {
    const whatsapp = document.querySelector('a[href*="wa.me"]')?.getBoundingClientRect();
    const passage = [...document.querySelectorAll('*')]
      .find(node => node.textContent?.trim() === 'Reading Passage')
      ?.parentElement?.getBoundingClientRect();
    const overlaps = (a, b) => Boolean(
      a && b && a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top,
    );
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      whatsappOverlapsPassage: overlaps(whatsapp, passage),
      firstQuestionTop: [...document.querySelectorAll('*')]
        .find(node => node.textContent?.trim() === 'Statement 1')
        ?.getBoundingClientRect().top ?? null,
      passageBottom: passage?.bottom ?? null,
    };
  });
  responsive.push({ ...viewport, ...metrics });
  await page.close();
}

const zoomPage = await context.newPage();
await zoomPage.setViewportSize({ width: 390, height: 844 });
await gotoReady(zoomPage, `${BASE_URL}/practica/ielts/reading`);
const zoom200 = await zoomPage.evaluate(() => {
  document.documentElement.style.zoom = '2';
  return {
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    horizontalOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    visibleButtons: [...document.querySelectorAll('button')]
      .filter(button => {
        const rect = button.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      }).length,
  };
});
await zoomPage.close();

const keyboardPage = await context.newPage();
await gotoReady(keyboardPage, `${BASE_URL}/practica/ielts/reading`);
const keyboardStops = [];
for (let index = 0; index < 8; index += 1) {
  await keyboardPage.keyboard.press('Tab');
  keyboardStops.push(await keyboardPage.evaluate(() => ({
    tag: document.activeElement?.tagName ?? null,
    text: document.activeElement?.textContent?.trim() ?? '',
    ariaLabel: document.activeElement?.getAttribute('aria-label'),
    href: document.activeElement?.getAttribute('href'),
  })));
}
const optionSemantics = await keyboardPage.evaluate(() => ({
  fieldsets: document.querySelectorAll('fieldset').length,
  radiogroups: document.querySelectorAll('[role="radiogroup"]').length,
  progressbars: document.querySelectorAll('[role="progressbar"]').length,
  ariaLiveRegions: document.querySelectorAll('[aria-live]').length,
}));
await keyboardPage.close();

const interactionPage = await context.newPage();
await gotoReady(interactionPage, `${BASE_URL}/practica/ielts/reading`);
await interactionPage.getByRole('button', { name: 'FALSE' }).first().click();
const afterCorrect = await interactionPage.evaluate(() => ({
  showsExplanation: document.body.innerText.includes('Mainly in Brazil'),
  disabled: [...document.querySelectorAll('button')]
    .filter(button => ['TRUE', 'FALSE', 'NOT GIVEN'].includes(button.textContent?.trim() ?? ''))
    .slice(0, 3)
    .map(button => button.disabled),
  progressOneOfEight: document.body.innerText.includes('1/8'),
}));
await interactionPage.reload({ waitUntil: 'domcontentloaded' });
const afterReload = await interactionPage.evaluate(() => ({
  showsExplanation: document.body.innerText.includes('Mainly in Brazil'),
  disabled: [...document.querySelectorAll('button')]
    .filter(button => ['TRUE', 'FALSE', 'NOT GIVEN'].includes(button.textContent?.trim() ?? ''))
    .slice(0, 3)
    .map(button => button.disabled),
  progressOneOfEight: document.body.innerText.includes('1/8'),
}));
await interactionPage.getByRole('button', { name: 'TRUE' }).first().click();
const deliberateError = await interactionPage.getByText(/La respuesta es FALSE/).first().textContent();
await interactionPage.close();

const absentPlannedSurfaces = [];
for (const route of [
  '/practica/ielts/reading/diagnostico',
  '/practica/ielts/reading/practica',
  '/practica/ielts/reading/simulacro',
]) {
  const response = await requestGetReady(`${BASE_URL}${route}`, {
    failOnStatusCode: false,
    maxRedirects: 0,
  });
  absentPlannedSurfaces.push({ route, status: response.status() });
}

await browser.close();

const result = {
  schemaVersion: 'ielts-reading-playwright-baseline.v1',
  baseUrl: BASE_URL,
  routeSourceCombinedSha256: baseline.sourceIdentity.combinedSha256,
  scope: {
    hubs: 3,
    publishedQuestionTypeRoutes: baseline.routes.questionTypes.published,
    publishedSkillRoutes: baseline.routes.skills.published,
    totalRoutes: routes.length,
  },
  summary: {
    routesStatus200: routeResults.filter(result => result.status === 200).length,
    routesWithOneH1: routeResults.filter(result => result.h1.length === 1).length,
    routesWithOneMain: routeResults.filter(result => result.mainCount === 1).length,
    routesWithCanonical: routeResults.filter(result => result.canonical !== null).length,
    routesWithoutHorizontalOverflow: routeResults.filter(
      result => result.scrollWidth === result.clientWidth,
    ).length,
    internalLinksChecked: internalLinkResults.length,
    internalLinksStatus200: internalLinkResults.filter(result => result.status === 200).length,
  },
  routes: routeResults,
  internalLinks: internalLinkResults,
  responsive,
  zoom200,
  keyboard: {
    firstEightStops: keyboardStops,
    optionSemantics,
  },
  interaction: {
    afterCorrect,
    afterReload,
    deliberateError,
  },
  absentPlannedSurfaces,
  applicability: {
    covered:
      'current hubs, all 14 question-type routes, all 6 skill routes, internal links, five viewports, zoom, keyboard baseline, click/feedback/reload',
    deferred:
      'Learn hints, Practice submit, Exam 3/40/60, Review, versioned navigation and offline robustness do not exist yet and retain later rows',
  },
};

const json = `${JSON.stringify(result, null, 2)}\n`;
if (process.argv.includes('--write')) {
  writeFileSync(resolve(HERE, 'playwright-baseline.json'), json);
} else {
  process.stdout.write(json);
}
