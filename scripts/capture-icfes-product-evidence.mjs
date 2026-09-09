import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

const baseUrl = process.env.ICFES_AUDIT_BASE_URL ?? 'http://127.0.0.1:3108';
const outputDir = new URL('../artifacts/icfes-audit/', import.meta.url).pathname;
const executablePath = process.env.CHROME_EXECUTABLE_PATH
  ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath });
const findings = [];

function collectKeys(value, keys = new Set()) {
  if (!value || typeof value !== 'object') return keys;
  if (Array.isArray(value)) {
    value.forEach((item) => collectKeys(item, keys));
    return keys;
  }
  Object.entries(value).forEach(([key, nested]) => {
    keys.add(key);
    collectKeys(nested, keys);
  });
  return keys;
}

for (const device of [
  { name: 'desktop', viewport: { width: 1440, height: 1000 } },
  { name: 'mobile', viewport: { width: 390, height: 844 } },
]) {
  const context = await browser.newContext({ viewport: device.viewport });
  const page = await context.newPage();
  const errors = [];
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${baseUrl}/examenes/icfes/practica/mock-01`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1_500);
  await Promise.all([
    page.waitForResponse((response) => response.url().endsWith('/api/icfes/attempts/start') && response.status() === 200),
    page.getByRole('button', { name: 'Empezar modo examen →' }).click(),
  ]);
  await page.getByRole('button', { name: 'Parte 7 0/10' }).click();
  const finishButton = page.getByRole('button', { name: 'Finalizar examen' }).first();
  await finishButton.waitFor({ state: 'visible' });
  page.once('dialog', (dialog) => dialog.accept());
  const [gradeResponse] = await Promise.all([
    page.waitForResponse((response) => response.url().endsWith('/api/icfes/attempts/grade') && response.status() === 200),
    finishButton.click(),
  ]);
  const gradePayload = await gradeResponse.json();
  const gradePayloadKeys = [...collectKeys(gradePayload)].sort();
  const forbiddenResultKeys = ['answer', 'answers', 'correctAnswer', 'explanation', 'insights', 'questions', 'rationale'];
  const leakedKeys = forbiddenResultKeys.filter((key) => gradePayloadKeys.includes(key));
  if (leakedKeys.length) {
    throw new Error(`${device.name}: sensitive scoring keys leaked: ${leakedKeys.join(', ')}`);
  }
  await page.getByTestId('icfes-free-result').waitFor({ state: 'visible' });
  await page.getByText('Tu resultado ya está visible. Dejar tus datos es opcional.').waitFor({ state: 'visible' });
  const body = await page.locator('body').innerText();
  const normalizedBody = body.toLocaleLowerCase('es');
  if (!normalizedBody.includes('resultado gratuito inmediato') || !normalizedBody.includes('dejar tus datos es opcional')) {
    throw new Error(`${device.name}: free-first result contract is not visible: ${body.slice(0, 500)}`);
  }
  if (body.includes('Pase ICFES — COP 49.900')) {
    throw new Error(`${device.name}: disabled offer unexpectedly visible`);
  }
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
  });
  const artifactPath = `artifacts/icfes-audit/icfes-free-result-${device.name}-2026-09-08.png`;
  const path = `${outputDir}icfes-free-result-${device.name}-2026-09-08.png`;
  await page.screenshot({ path, fullPage: true });
  findings.push({
    device: device.name,
    viewport: device.viewport,
    path: artifactPath,
    gradePayloadKeys,
    sensitiveScoringKeys: leakedKeys,
    consoleErrors: errors,
  });
  await context.close();
}

await browser.close();
await writeFile(
  `${outputDir}icfes-product-e2e-2026-09-08.json`,
  `${JSON.stringify({ ok: findings.every((finding) => finding.consoleErrors.length === 0), findings }, null, 2)}\n`,
  'utf8',
);
if (findings.some((finding) => finding.consoleErrors.length)) {
  throw new Error(JSON.stringify(findings, null, 2));
}
console.log(JSON.stringify({ ok: true, findings }, null, 2));
