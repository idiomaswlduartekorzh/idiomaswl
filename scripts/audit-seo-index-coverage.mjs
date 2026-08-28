#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

import { canonicalHref, robotsDirectives } from './lib/seo-audit-utils.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const BASE = (process.argv.find((arg) => arg.startsWith('--base='))?.split('=').slice(1).join('=') || 'http://127.0.0.1:3000').replace(/\/$/, '');
const MANIFEST = path.join(ROOT, '.next/prerender-manifest.json');
const CONCURRENCY = 6;

// El sitemap ya documenta que las páginas madre de escritura, habla, lectura y vocabulario
// general permanecen fuera hasta una decisión editorial separada. Estas excepciones no se
// infieren por cantidad: las rutas especiales se enumeran para que una página nueva vuelva a
// fallar hasta ser publicada, marcada noindex o añadida conscientemente a esta política.
const INTENTIONAL_OMISSION_RULES = [
  {
    pattern: /^\/practica\/(?:aleman|coreano|frances|ingles|italiano|japones|portugues|ruso)\/(?:a1|a2|b1)\/(?:escritura|habla|lectura|vocabulario)$/,
    reason: 'destreza general pendiente de decisión editorial',
  },
  {
    pattern: /^\/practica\/coreano\/a2\/leccion-integrada$/,
    reason: 'piloto integrado fuera del lanzamiento indexable',
  },
  {
    pattern: /^\/practica\/ingles\/(?:b1\/conjunciones|b2(?:\/conectores|\/uso-del-idioma)?)$/,
    reason: 'ruta inglesa complementaria fuera del catálogo publicado',
  },
  {
    pattern: /^\/practica\/italiano\/(?:b1\/particelle|b2|b2\/integrato\/oath-of-allegiance|grammatica)$/,
    reason: 'ruta italiana complementaria fuera del catálogo publicado',
  },
  {
    pattern: /^\/practica\/ielts-writing-conectores$/,
    reason: 'actividad IELTS heredada pendiente de retirar la estimación de banda',
  },
];

if (!fs.existsSync(MANIFEST)) {
  console.error('Falta .next/prerender-manifest.json. Ejecuta npm run build antes de esta auditoría.');
  process.exit(1);
}

const normalizePath = (value) => value.replace(/\/$/, '') || '/';
const excludedArtifact = (route) => (
  route.startsWith('/_')
  || /\.[a-z0-9]+$/i.test(route)
  || /\/opengraph-image(?:-[a-z0-9]+)?$/i.test(route)
);

async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let nextIndex = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex++;
      out[index] = await fn(items[index]);
    }
  }));
  return out;
}

async function request(route) {
  try {
    const response = await fetch(`${BASE}${route}`, {
      redirect: 'manual',
      signal: AbortSignal.timeout(30_000),
      headers: { 'user-agent': 'IdiomasWL-SEO-Coverage-Audit/1.0' },
    });
    return {
      route,
      status: response.status,
      contentType: response.headers.get('content-type') ?? '',
      xRobotsTag: response.headers.get('x-robots-tag') ?? '',
      body: await response.text(),
    };
  } catch (error) {
    return { route, status: 0, contentType: '', xRobotsTag: '', body: '', error: error instanceof Error ? error.message : String(error) };
  }
}

const sitemapResponse = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(30_000) });
if (!sitemapResponse.ok) {
  console.error(`sitemap.xml respondió ${sitemapResponse.status}.`);
  process.exit(1);
}

const sitemapXml = await sitemapResponse.text();
const sitemapPaths = new Set(
  [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => normalizePath(new URL(match[1]).pathname))
);
const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const prerenderedRoutes = Object.keys(manifest.routes)
  .map(normalizePath)
  .filter((route) => !excludedArtifact(route));
const omittedRoutes = prerenderedRoutes.filter((route) => !sitemapPaths.has(route));
const responses = await mapLimit(omittedRoutes, CONCURRENCY, request);

const failures = [];
const indexableOmissions = [];
for (const response of responses) {
  if (response.status === 0 || response.status >= 500) {
    failures.push(`${response.route}: ${response.status || response.error}`);
    continue;
  }
  if (response.status !== 200 || !response.contentType.includes('text/html')) continue;
  if (robotsDirectives(response.body).includes('noindex') || /(?:^|,)\s*noindex\b/i.test(response.xRobotsTag)) continue;
  const canonical = canonicalHref(response.body);
  const canonicalPath = canonical ? normalizePath(new URL(canonical, `${BASE}${response.route}`).pathname) : null;
  if (canonicalPath && canonicalPath !== response.route) continue;
  indexableOmissions.push({ route: response.route, canonical });
}

const intentionalOmissions = [];
const unexpectedOmissions = [];
for (const omission of indexableOmissions) {
  const rule = INTENTIONAL_OMISSION_RULES.find(({ pattern }) => pattern.test(omission.route));
  if (rule) intentionalOmissions.push({ ...omission, reason: rule.reason });
  else unexpectedOmissions.push(omission);
}

console.log(
  `Cobertura local: ${prerenderedRoutes.length} rutas HTML candidatas, ${sitemapPaths.size} en sitemap, ${omittedRoutes.length} revisadas fuera del sitemap.`
);

if (unexpectedOmissions.length) {
  console.log(`\nPáginas indexables fuera del sitemap sin política — ${unexpectedOmissions.length}`);
  for (const item of unexpectedOmissions.slice(0, 200)) {
    console.log(`  ${item.route}${item.canonical ? ` · canonical ${item.canonical}` : ' · sin canonical'}`);
  }
  if (unexpectedOmissions.length > 200) console.log(`  ... y ${unexpectedOmissions.length - 200} más`);
}

if (intentionalOmissions.length) {
  const counts = new Map();
  for (const item of intentionalOmissions) counts.set(item.reason, (counts.get(item.reason) ?? 0) + 1);
  console.log(`\nExclusiones indexables reconocidas por política — ${intentionalOmissions.length}`);
  for (const [reason, count] of counts) console.log(`  ${count} · ${reason}`);
}

if (failures.length) {
  console.log(`\nRutas prerenderizadas inaccesibles — ${failures.length}`);
  for (const failure of failures.slice(0, 30)) console.log(`  ${failure}`);
}

if (unexpectedOmissions.length || failures.length) {
  process.exit(1);
}

console.log('Sin omisiones indexables inesperadas ni rutas prerenderizadas rotas.');
