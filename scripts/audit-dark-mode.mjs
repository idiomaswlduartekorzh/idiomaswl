#!/usr/bin/env node

import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...value] = arg.replace(/^--/, '').split('=');
    return [key, value.length ? value.join('=') : true];
  }),
);

const baseUrl = String(args['base-url'] || 'http://127.0.0.1:3012').replace(/\/$/, '');
const theme = String(args.theme || 'dark');
const viewportName = String(args.viewport || 'desktop');
const viewport = viewportName === 'mobile' ? { width: 390, height: 844 } : { width: 1440, height: 1000 };
const limit = Math.max(0, Number(args.limit || 0));
const concurrency = Math.min(8, Math.max(1, Number(args.concurrency || 4)));
const output = path.resolve(String(args.output || `artifacts/dark-mode-audit-${viewportName}.json`));

const normalizeRoute = (value) => {
  try {
    const pathname = value.startsWith('http') ? new URL(value).pathname : value;
    const clean = `/${pathname}`.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
    return clean;
  } catch {
    return null;
  }
};

async function routesFromSitemap() {
  try {
    const response = await fetch(`${baseUrl}/sitemap.xml`);
    if (!response.ok) return [];
    const xml = await response.text();
    return [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => normalizeRoute(match[1])).filter(Boolean);
  } catch {
    return [];
  }
}

async function staticAppRoutes() {
  const appRoot = path.resolve('src/app');
  const pages = [];
  const walk = async (directory) => {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) await walk(absolute);
      else if (/^page\.(?:[cm]?[jt]sx?)$/.test(entry.name)) pages.push(directory);
    }
  };
  await walk(appRoot);
  return pages.map((directory) => {
    const segments = path.relative(appRoot, directory).split(path.sep).filter(Boolean)
      .filter((segment) => !(segment.startsWith('(') && segment.endsWith(')')))
      .filter((segment) => !segment.startsWith('@'));
    if (segments.some((segment) => segment.includes('[') || segment.startsWith('_'))) return null;
    return normalizeRoute(segments.join('/'));
  }).filter(Boolean);
}

async function buildRouteManifest() {
  if (args.routes) {
    return String(args.routes).split(',').map(normalizeRoute).filter(Boolean);
  }

  const [sitemapRoutes, staticRoutes] = await Promise.all([routesFromSitemap(), staticAppRoutes()]);
  const routes = [...new Set([...sitemapRoutes, ...staticRoutes])]
    .filter((route) => route !== '/' && route !== '/home')
    .filter((route) => !route.includes('['))
    .sort((a, b) => a.localeCompare(b));
  return limit ? routes.slice(0, limit) : routes;
}

async function inspectPage(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'domcontentloaded', timeout: 45_000 });
  await page.evaluate((requestedTheme) => {
    localStorage.setItem('wl-theme', requestedTheme);
    document.documentElement.setAttribute('data-theme', requestedTheme);
  }, theme);
  await page.reload({ waitUntil: 'networkidle', timeout: 45_000 }).catch(() => undefined);
  await page.waitForTimeout(180);

  const audit = await page.evaluate(() => {
    const parseColor = (value) => {
      const match = value?.match(/rgba?\(([^)]+)\)/i);
      if (!match) return null;
      const raw = match[1].trim().split(/[\s,\/]+/).filter(Boolean).map(Number);
      if (raw.length < 3 || raw.slice(0, 3).some(Number.isNaN)) return null;
      return { r: raw[0], g: raw[1], b: raw[2], a: Number.isFinite(raw[3]) ? raw[3] : 1 };
    };
    const blend = (front, back) => {
      const a = front.a + back.a * (1 - front.a);
      if (!a) return { r: 0, g: 0, b: 0, a: 0 };
      return {
        r: (front.r * front.a + back.r * back.a * (1 - front.a)) / a,
        g: (front.g * front.a + back.g * back.a * (1 - front.a)) / a,
        b: (front.b * front.a + back.b * back.a * (1 - front.a)) / a,
        a,
      };
    };
    const luminance = ({ r, g, b }) => {
      const channel = (value) => {
        const normalized = value / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
    };
    const contrast = (a, b) => {
      const [light, dark] = [luminance(a), luminance(b)].sort((x, y) => y - x);
      return (light + 0.05) / (dark + 0.05);
    };
    const selectorFor = (element) => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const classes = [...element.classList].slice(0, 2).map((name) => `.${CSS.escape(name)}`).join('');
      return `${element.tagName.toLowerCase()}${classes}`;
    };
    const effectiveBackground = (element) => {
      let current = element;
      let result = { r: 0, g: 0, b: 0, a: 0 };
      let complex = false;
      while (current) {
        const style = getComputedStyle(current);
        if (style.backgroundImage !== 'none') complex = true;
        const layer = parseColor(style.backgroundColor);
        if (layer && layer.a > 0) result = blend(result, layer);
        if (result.a >= 0.995) break;
        current = current.parentElement;
      }
      if (result.a < 0.995) {
        const fallback = parseColor(getComputedStyle(document.documentElement).backgroundColor) || { r: 11, g: 15, b: 23, a: 1 };
        result = blend(result, fallback);
      }
      return { color: result, complex };
    };
    const hasDirectText = (element) => [...element.childNodes].some((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim());
    const contrastFailures = [];

    for (const element of document.body.querySelectorAll('*')) {
      if (!(element instanceof HTMLElement)) continue;
      const isControl = /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(element.tagName);
      const controlLabel = isControl
        ? (element.innerText || element.getAttribute('value') || element.getAttribute('placeholder') || '').trim()
        : '';
      if (!hasDirectText(element) && !controlLabel) continue;
      if (element.matches(':disabled, [aria-disabled="true"]')) continue;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (rect.width < 1 || rect.height < 1 || style.display === 'none' || style.visibility === 'hidden' || Number(style.opacity) < 0.08) continue;
      const foreground = parseColor(style.color);
      const background = effectiveBackground(element);
      if (!foreground || foreground.a < 0.08 || (background.complex && parseColor(style.backgroundColor)?.a < 0.9)) continue;
      const compositedForeground = blend({ ...foreground, a: foreground.a * Number(style.opacity || 1) }, background.color);
      const ratio = contrast(compositedForeground, background.color);
      const fontSize = Number.parseFloat(style.fontSize);
      const fontWeight = Number.parseInt(style.fontWeight, 10) || 400;
      const large = fontSize >= 24 || (fontSize >= 18.66 && fontWeight >= 700);
      const required = large ? 3 : 4.5;
      if (ratio + 0.05 < required) {
        contrastFailures.push({
          selector: selectorFor(element),
          text: (element.innerText || element.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 110),
          ratio: Number(ratio.toFixed(2)),
          required,
          color: style.color,
          background: getComputedStyle(element).backgroundColor,
          effectiveBackground: `rgba(${Math.round(background.color.r)}, ${Math.round(background.color.g)}, ${Math.round(background.color.b)}, ${background.color.a.toFixed(2)})`,
          inlineStyle: element.getAttribute('style') || '',
        });
      }
    }

    const rootStyle = getComputedStyle(document.documentElement);
    const bodyStyle = getComputedStyle(document.body);
    const shellPaint = [rootStyle.backgroundColor, rootStyle.backgroundImage, bodyStyle.backgroundColor, bodyStyle.backgroundImage].join(' ');
    const purpleShell = /(?:83,\s*74,\s*183|124,\s*58,\s*237|139,\s*92,\s*246|#534ab7|#7c3aed|#8b5cf6)/i.test(shellPaint);
    const maxOverflow = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - window.innerWidth;

    return {
      title: document.title,
      surface: document.documentElement.getAttribute('data-wl-surface'),
      appliedTheme: document.documentElement.getAttribute('data-theme'),
      tokens: {
        canvas: rootStyle.getPropertyValue('--wl-canvas').trim(),
        surface: rootStyle.getPropertyValue('--wl-surface').trim(),
        text: rootStyle.getPropertyValue('--wl-text').trim(),
        accent: rootStyle.getPropertyValue('--wl-accent').trim(),
      },
      purpleShell,
      horizontalOverflow: Math.max(0, Math.round(maxOverflow)),
      contrastFailures: contrastFailures.slice(0, 80),
      contrastFailureCount: contrastFailures.length,
    };
  });

  const status = response?.status() || 0;
  const failures = [
    ...(status >= 400 ? [`HTTP ${status}`] : []),
    ...(audit.surface !== 'editorial' ? [`surface=${audit.surface || 'missing'}`] : []),
    ...(audit.appliedTheme !== theme ? [`theme=${audit.appliedTheme || 'missing'}`] : []),
    ...(audit.purpleShell ? ['purple-shell'] : []),
    ...(audit.horizontalOverflow > 2 ? [`overflow=${audit.horizontalOverflow}px`] : []),
    ...(audit.contrastFailureCount ? [`contrast=${audit.contrastFailureCount}`] : []),
  ];
  return { route, url: `${baseUrl}${route}`, status, ok: failures.length === 0, failures, ...audit };
}

async function main() {
  const routes = await buildRouteManifest();
  if (!routes.length) throw new Error('No se encontraron rutas para auditar.');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport, colorScheme: theme === 'dark' ? 'dark' : 'light' });
  await context.addInitScript((requestedTheme) => {
    try {
      localStorage.setItem('wl-theme', requestedTheme);
      document.documentElement.setAttribute('data-theme', requestedTheme);
    } catch {
      // about:blank has no storage origin; the script runs again on navigation.
    }
  }, theme);
  const results = new Array(routes.length);
  let cursor = 0;

  await Promise.all(Array.from({ length: Math.min(concurrency, routes.length) }, async () => {
    const page = await context.newPage();
    while (cursor < routes.length) {
      const index = cursor++;
      const route = routes[index];
      try {
        results[index] = await inspectPage(page, route);
      } catch (error) {
        results[index] = { route, url: `${baseUrl}${route}`, status: 0, ok: false, failures: ['navigation'], error: String(error) };
      }
      const item = results[index];
      console.log(`${item.ok ? 'PASS' : 'FAIL'} ${route}${item.failures?.length ? ` — ${item.failures.join(', ')}` : ''}`);
    }
    await page.close();
  }));

  await browser.close();
  const failed = results.filter((result) => !result.ok);
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl,
    theme,
    viewport: { name: viewportName, ...viewport },
    excludes: ['/', '/home'],
    summary: { total: results.length, passed: results.length - failed.length, failed: failed.length },
    results,
  };
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
  console.log(`\n${report.summary.passed}/${report.summary.total} rutas sin fallos. Informe: ${output}`);
  if (failed.length) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
