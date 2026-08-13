import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '/Users/josedavidduartesilva/.npm/_npx/31e32ef8478fbf80/node_modules/playwright/index.mjs';

const outputDir = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = 'http://localhost:3002';
const hubPath = '/practica/ielts/reading/tipos-de-preguntas';
const expectedMatrix = [
  [1, 'Multiple choice', ['multiple-choice']],
  [2, 'Identifying information (True/False/Not given)', ['true-false-not-given']],
  [3, 'Identifying writer’s views/claims (Yes/No/Not given)', ['yes-no-not-given']],
  [4, 'Matching information', ['matching-information']],
  [5, 'Matching headings', ['matching-headings']],
  [6, 'Matching features', ['matching-features']],
  [7, 'Matching sentence endings', ['matching-sentence-endings']],
  [8, 'Sentence completion', ['sentence-completion']],
  [9, 'Summary/note/table/flow-chart completion', ['summary-completion', 'note-completion', 'table-completion', 'flow-chart-completion']],
  [10, 'Diagram label completion', ['diagram-labeling']],
  [11, 'Short-answer questions', ['short-answer']],
];
const expectedSlugs = expectedMatrix.flatMap(([, , slugs]) => slugs);
const typeNineSlugs = expectedMatrix.find(([number]) => number === 9)[2];
const viewports = [
  { name: 'mobile-320x568', width: 320, height: 568 },
  { name: 'mobile-390x844', width: 390, height: 844 },
  { name: 'tablet-768x1024', width: 768, height: 1024 },
  { name: 'desktop-1024x768', width: 1024, height: 768 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
];

const assertions = [];
const record = (name, pass, details = null) => {
  assertions.push({ name, pass: Boolean(pass), details });
};

const browser = await chromium.launch({
  headless: true,
  executablePath: '/Users/josedavidduartesilva/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell',
});
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();
const consoleMessages = [];
const pageErrors = [];
const failedRequests = [];

page.on('console', (message) => {
  if (['error', 'warning'].includes(message.type())) {
    consoleMessages.push({ type: message.type(), text: message.text(), url: message.location().url });
  }
});
page.on('pageerror', (error) => pageErrors.push(error.message));
page.on('requestfailed', (request) => {
  failedRequests.push({ url: request.url(), error: request.failure()?.errorText ?? 'unknown' });
});

const routeResults = [];
for (const slug of expectedSlugs) {
  const routePath = `${hubPath}/${slug}`;
  const response = await page.goto(`${baseUrl}${routePath}`, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await page.locator('h1').first().waitFor({ state: 'visible', timeout: 20_000 });
  const routeResult = await page.evaluate((expectedPath) => ({
    h1Count: document.querySelectorAll('h1').length,
    h1: document.querySelector('h1')?.textContent?.trim() ?? '',
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    currentBreadcrumb: document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')?.textContent?.trim() ?? '',
    bodyIncludesComingSoon: document.body.innerText.toLowerCase().includes('próximamente'),
    expectedPath,
  }), routePath);
  routeResults.push({ slug, status: response?.status() ?? null, ...routeResult });
}

record('14 destinos publicados responden 200', routeResults.every((route) => route.status === 200), routeResults.map(({ slug, status }) => ({ slug, status })));
record('14 destinos tienen un solo H1', routeResults.every((route) => route.h1Count === 1), routeResults.map(({ slug, h1Count }) => ({ slug, h1Count })));
record('14 destinos tienen canonical congruente', routeResults.every((route) => route.canonical.endsWith(route.expectedPath)), routeResults.map(({ slug, canonical }) => ({ slug, canonical })));
record('ningún destino publicado se anuncia como próximamente', routeResults.every((route) => !route.bodyIncludesComingSoon));

const response = await page.goto(`${baseUrl}${hubPath}`, { waitUntil: 'networkidle', timeout: 45_000 });
await page.locator('[data-reading-question-type-contract]').waitFor({ state: 'visible', timeout: 20_000 });
const hub = await page.evaluate(() => {
  const types = [...document.querySelectorAll('[data-official-type]')].map((node) => ({
    number: Number(node.getAttribute('data-official-type')),
    name: node.querySelector('h3')?.textContent?.trim() ?? '',
    slugs: [...node.querySelectorAll('[data-welearn-route]')].map((route) => route.getAttribute('data-welearn-route')),
  }));
  const routeSlugs = [...document.querySelectorAll('[data-welearn-route]')].map((node) => node.getAttribute('data-welearn-route'));
  const content = document.documentElement.textContent ?? '';
  return {
    statusText: document.querySelector('[data-reading-question-type-contract]')?.getAttribute('data-reading-question-type-contract'),
    h1Count: document.querySelectorAll('h1').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '',
    types,
    routeSlugs,
    approvedLabelVisible: document.body.innerText.includes('11 tipos oficiales numerados · 14 rutas WeLearn'),
    prohibitedClaimAbsent: !/14 tipos oficiales/i.test(content),
    sourceLink: document.querySelector('a[href="https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading"]') !== null,
    rightsLink: document.querySelector('a[href="https://ielts.org/legal/ielts-copyright-and-trade-mark-statement"]') !== null,
    breadcrumbCurrent: document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]')?.textContent?.trim() ?? '',
    englishOfficialHeadings: [...document.querySelectorAll('[data-official-type] h3')].every((node) => node.getAttribute('lang') === 'en'),
    englishRouteHeadings: [...document.querySelectorAll('[data-welearn-route] h4')].every((node) => node.getAttribute('lang') === 'en'),
    preTaskRevealStates: [...document.querySelectorAll('[data-mixed-task]')].map((node) => node.getAttribute('data-question-type-revealed')),
    preParagraphRevealStates: [...document.querySelectorAll('[data-passage-paragraph]')].map((node) => node.getAttribute('data-function-revealed')),
    genericLabels: [...document.querySelectorAll('[data-mixed-task]')].filter((node) => node.textContent?.includes('Formato por identificar')).length,
    answerKeyAttributes: [...document.querySelectorAll('[data-reading-mixed-engine] *')].flatMap((node) => [...node.attributes]).filter((attribute) => /correct|answer|solution|key/i.test(attribute.name)).map((attribute) => attribute.name),
  };
});

record('hub responde 200', response?.status() === 200, response?.status());
record('hub tiene un solo H1 y canonical', hub.h1Count === 1 && hub.canonical.endsWith(hubPath), { h1Count: hub.h1Count, canonical: hub.canonical });
record('contrato v1 visible en DOM', hub.statusText === 'ielts-academic-reading-question-types.v1', hub.statusText);
record('matriz visible exacta 11 ↔ 14', JSON.stringify(hub.types) === JSON.stringify(expectedMatrix.map(([number, name, slugs]) => ({ number, name, slugs }))));
record('14 slugs visibles y únicos', hub.routeSlugs.length === 14 && new Set(hub.routeSlugs).size === 14, hub.routeSlugs);
record('label aprobado visible y claim prohibido ausente', hub.approvedLabelVisible && hub.prohibitedClaimAbsent);
record('fuente oficial y límite de derechos visibles', hub.sourceLink && hub.rightsLink);
record('breadcrumb semántico con current', hub.breadcrumbCurrent === 'Tipos de preguntas', hub.breadcrumbCurrent);
record('nombres oficiales y rutas marcan idioma inglés', hub.englishOfficialHeadings && hub.englishRouteHeadings);
record('motor no revela tipos antes de responder', hub.preTaskRevealStates.length > 0 && hub.preTaskRevealStates.every((state) => state === 'false') && hub.genericLabels === hub.preTaskRevealStates.length, { tasks: hub.preTaskRevealStates.length, genericLabels: hub.genericLabels });
record('motor no revela funciones de párrafo antes de cerrar set', hub.preParagraphRevealStates.length > 0 && hub.preParagraphRevealStates.every((state) => state === 'false'), { paragraphs: hub.preParagraphRevealStates.length });
record('motor no serializa clave en atributos DOM', hub.answerKeyAttributes.length === 0, hub.answerKeyAttributes);

const firstTask = page.locator('[data-mixed-task]').first();
const firstOption = firstTask.locator('button').first();
await firstOption.focus();
await page.keyboard.press('Enter');
await firstTask.waitFor({ state: 'visible' });
const postInteraction = await page.evaluate(() => ({
  taskStates: [...document.querySelectorAll('[data-mixed-task]')].map((node) => node.getAttribute('data-question-type-revealed')),
  paragraphStates: [...document.querySelectorAll('[data-passage-paragraph]')].map((node) => node.getAttribute('data-function-revealed')),
  firstTaskGeneric: document.querySelector('[data-mixed-task]')?.textContent?.includes('Formato por identificar') ?? true,
  firstTaskDisabledButtons: document.querySelectorAll('[data-mixed-task]')[0]?.querySelectorAll('button:disabled').length ?? 0,
}));
record('teclado responde y revela solo el ítem contestado', postInteraction.taskStates[0] === 'true' && postInteraction.taskStates.slice(1).every((state) => state === 'false') && !postInteraction.firstTaskGeneric && postInteraction.firstTaskDisabledButtons > 0, postInteraction);
record('una respuesta no revela todavía funciones del set', postInteraction.paragraphStates.every((state) => state === 'false'), postInteraction.paragraphStates);
await page.screenshot({ path: path.join(outputDir, 'contract-after-keyboard-answer-1440x900.png'), fullPage: false });

await page.reload({ waitUntil: 'networkidle' });
const restoredPreState = await page.locator('[data-mixed-task]').evaluateAll((nodes) => nodes.every((node) => node.getAttribute('data-question-type-revealed') === 'false'));
record('reload restaura estado pre-respuesta sin tipo revelado', restoredPreState);

const typeNineResults = [];
for (const slug of typeNineSlugs) {
  const routePath = `${hubPath}/${slug}`;
  const childResponse = await page.goto(`${baseUrl}${routePath}`, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await page.locator('h1').waitFor({ state: 'visible', timeout: 20_000 });
  typeNineResults.push(await page.evaluate(({ slug, status }) => ({
    slug,
    status,
    routeLabel: /Ruta WeLearn del tipo oficial\s*9/i.test(document.body.innerText),
    groupingExplanation: /agrupa Summary, Note, Table y Flow-chart Completion/i.test(document.body.innerText),
    mapBackLink: document.querySelector('nav[aria-label="Breadcrumb"] a[href="/practica/ielts/reading/tipos-de-preguntas"]') !== null,
    currentBreadcrumb: document.querySelector('nav[aria-label="Breadcrumb"] [aria-current="page"]') !== null,
    h1Lang: document.querySelector('h1')?.getAttribute('lang'),
    officialSource: document.querySelector('a[href="https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading"]') !== null,
  }), { slug, status: childResponse?.status() ?? null }));
}
record('cuatro rutas del tipo 9 declaran su condición WeLearn', typeNineResults.every((route) => route.status === 200 && route.routeLabel && route.groupingExplanation), typeNineResults);
record('cuatro rutas del tipo 9 conservan breadcrumb accesible', typeNineResults.every((route) => route.mapBackLink && route.currentBreadcrumb && route.h1Lang === 'en'), typeNineResults);
record('cuatro rutas del tipo 9 enlazan la fuente oficial exacta', typeNineResults.every((route) => route.officialSource), typeNineResults);

const viewportResults = [];
for (const viewport of viewports) {
  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(`${baseUrl}${hubPath}`, { waitUntil: 'networkidle', timeout: 45_000 });
  const metrics = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    typeNineVisible: document.querySelector('[data-official-type="9"]') !== null,
  }));
  viewportResults.push({ ...viewport, ...metrics, overflow: metrics.scrollWidth - metrics.clientWidth });
  if (viewport.name === 'mobile-390x844') {
    await page.screenshot({ path: path.join(outputDir, 'contract-mobile-390x844.png'), fullPage: true });
  }
}
record('cinco viewports sin overflow horizontal', viewportResults.every((viewport) => viewport.overflow === 0), viewportResults);
record('tipo 9 presente en cinco viewports', viewportResults.every((viewport) => viewport.typeNineVisible), viewportResults);

// Chromium does not expose browser-toolbar zoom through Playwright. Halving the
// CSS viewport is the reproducible reflow equivalent of a 1440×900 viewport at 200%.
await page.setViewportSize({ width: 720, height: 450 });
await page.goto(`${baseUrl}${hubPath}`, { waitUntil: 'networkidle', timeout: 45_000 });
const zoomMetrics = await page.evaluate(() => ({
  clientWidth: document.documentElement.clientWidth,
  scrollWidth: document.documentElement.scrollWidth,
  typeNineVisible: document.querySelector('[data-official-type="9"]') !== null,
}));
zoomMetrics.overflow = zoomMetrics.scrollWidth - zoomMetrics.clientWidth;
zoomMetrics.emulation = '1440×900 physical viewport at 200% → 720×450 CSS reflow viewport';
record('zoom 200% conserva el contrato sin overflow', zoomMetrics.overflow === 0 && zoomMetrics.typeNineVisible, zoomMetrics);

const internalFailedRequests = failedRequests.filter((request) => request.url.startsWith(baseUrl));
const knownBaselineConsole = consoleMessages.filter((message) =>
  message.text.includes('Content Security Policy')
  && (message.text.includes('meta-capi-param-builder-clientjs') || message.text.includes('connect.facebook.net')),
);
const unexpectedConsole = consoleMessages.filter((message) => !knownBaselineConsole.includes(message));
record('cero pageerror', pageErrors.length === 0, pageErrors);
record('cero requests internas fallidas', internalFailedRequests.length === 0, internalFailedRequests);
record('cero errores propios de consola', unexpectedConsole.length === 0, { unexpectedConsole, knownBaselineConsoleCount: knownBaselineConsole.length });

await context.close();
await browser.close();

const result = {
  audit: 'IELTS Academic Reading official 11 types ↔ 14 WeLearn routes',
  date: '2026-08-09',
  baseUrl,
  runner: 'Playwright 1.63.0-alpha-2026-08-05 / Chromium',
  passed: assertions.every((assertion) => assertion.pass),
  summary: {
    passed: assertions.filter((assertion) => assertion.pass).length,
    failed: assertions.filter((assertion) => !assertion.pass).length,
    total: assertions.length,
  },
  assertions,
  routeResults,
  typeNineResults,
  viewportResults,
  zoomMetrics,
  diagnostics: {
    pageErrors,
    internalFailedRequests,
    externalFailedRequests: failedRequests.filter((request) => !request.url.startsWith(baseUrl)),
    unexpectedConsole,
    knownBaselineConsole,
  },
};

await fs.writeFile(path.join(outputDir, 'playwright-audit.json'), `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(result.summary));
if (!result.passed) process.exitCode = 1;
