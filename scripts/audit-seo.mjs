#!/usr/bin/env node
/**
 * Auditoría SEO de producción. Depende de red y, por diseño, NO corre en prebuild.
 *
 * Comprueba señales que ya fallaron en el sitio: respuestas del sitemap, páginas
 * huérfanas, callejones internos, paridad FAQ, URLs críticas, host único y cadenas.
 *
 * Uso:
 *   npm run audit:seo:prod
 *   npm run audit:seo:prod:quick
 *   node scripts/audit-seo.mjs --base=http://localhost:3000
 */

import dns from 'node:dns';
import { canonicalHref, compareFaqParity, robotsDirectives } from './lib/seo-audit-utils.mjs';

// Evita falsos bloqueos de Undici cuando el resolver entrega primero una ruta IPv6
// sin salida en runners que sí tienen conectividad IPv4.
dns.setDefaultResultOrder('ipv4first');

const args = process.argv.slice(2);
const BASE = (args.find((arg) => arg.startsWith('--base='))?.split('=').slice(1).join('=') || 'https://www.idiomaswl.com').replace(/\/$/, '');
const BASE_URL = new URL(BASE);
const CANONICAL_ORIGIN = ['localhost', '127.0.0.1'].includes(BASE_URL.hostname)
  ? 'https://www.idiomaswl.com'
  : BASE_URL.origin;
const QUICK = args.includes('--quick');
const CONCURRENCY = 4;
const REQUEST_TIMEOUT_MS = 30_000;
const REQUEST_ATTEMPTS = 3;

/** Muestra explícita de URLs con historial confirmado. Se amplía con exportes URL-level de GSC. */
const URLS_CRITICAS = [
  '/practica/ingles/a1/gramatica/verbo-to-be',
  '/practica/ingles/a1/gramatica/preposiciones-de-lugar',
  '/practica/italiano/a1/gramatica/la-negacion',
  '/blog/icfes-vocabulario-ingles-palabras-mas-frecuentes',
  '/examenes/cambridge-b2',
  '/examenes/icfes',
  '/clases-de-ingles-bucaramanga',
];

const problemas = [];
const fallo = (regla, detalle) => problemas.push({ regla, detalle });
const cache = new Map();

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

async function request(url, { follow = false } = {}) {
  const key = `${follow ? 'follow' : 'manual'}:${url}`;
  if (cache.has(key)) return cache.get(key);

  const pending = (async () => {
    let lastError = 'sin respuesta';
    for (let attempt = 1; attempt <= REQUEST_ATTEMPTS; attempt += 1) {
      try {
        const response = await fetch(url, {
          redirect: follow ? 'follow' : 'manual',
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
          headers: { 'user-agent': 'IdiomasWL-SEO-Audit/1.0' },
        });
        return {
          status: response.status,
          location: response.headers.get('location'),
          body: await response.text(),
          error: null,
        };
      } catch (error) {
        const cause = error instanceof Error && error.cause && typeof error.cause === 'object'
          ? `: ${error.cause.code ?? error.cause.message ?? String(error.cause)}`
          : '';
        lastError = `${error instanceof Error ? error.message : String(error)}${cause}`;
        if (attempt < REQUEST_ATTEMPTS) {
          await new Promise((resolve) => setTimeout(resolve, attempt * 250));
        }
      }
    }
    return { status: 0, location: null, body: '', error: lastError };
  })();

  cache.set(key, pending);
  return pending;
}

const normalizePath = (value) => {
  const path = value.replace(/\/$/, '') || '/';
  return path.startsWith('/') ? path : `/${path}`;
};

function internalRoutes(html) {
  const routes = [];
  for (const match of html.matchAll(/href=["']([^"'#?]+)["']/gi)) {
    try {
      const url = new URL(match[1], `${BASE}/`);
      if (url.origin === new URL(BASE).origin) routes.push(normalizePath(url.pathname));
    } catch {
      // Un href inválido pertenece a otra auditoría de HTML.
    }
  }
  return routes;
}

async function readSitemap() {
  const response = await request(`${BASE}/sitemap.xml`, { follow: true });
  if (response.status !== 200) {
    const detail = response.status || response.error || 'sin respuesta';
    throw new Error(`sitemap.xml no respondió 200 (${detail})`);
  }

  const absoluteUrls = [...response.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1].trim());
  if (!absoluteUrls.length) throw new Error('sitemap.xml no contiene URLs');

  const seen = new Set();
  const entries = [];
  for (const absoluteUrl of absoluteUrls) {
    let parsed;
    try {
      parsed = new URL(absoluteUrl);
    } catch {
      fallo('sitemap-invalido', `URL inválida: ${absoluteUrl}`);
      continue;
    }
    if (seen.has(absoluteUrl)) fallo('sitemap-duplicado', absoluteUrl);
    seen.add(absoluteUrl);
    if (new URL(BASE).hostname === 'www.idiomaswl.com' && parsed.origin !== 'https://www.idiomaswl.com') {
      fallo('sitemap-host', `${absoluteUrl} no usa el host canónico`);
    }
    entries.push({ absoluteUrl, path: normalizePath(parsed.pathname) });
  }
  return entries;
}

/** El dominio desnudo debe consolidar autoridad en www con redirección permanente. */
async function checkHost() {
  if (new URL(BASE).hostname !== 'www.idiomaswl.com') return;
  const response = await request('https://idiomaswl.com/');
  if (![301, 308].includes(response.status)) {
    fallo('host-unico', `idiomaswl.com responde ${response.status || response.error} (se espera 301 o 308)`);
  }
  if (!response.location || new URL(response.location, 'https://idiomaswl.com/').hostname !== 'www.idiomaswl.com') {
    fallo('host-unico', `la redirección no apunta a www: ${response.location || 'sin Location'}`);
  }
}

/** Toda URL publicada en sitemap debe responder directamente 200. */
async function checkSitemapResponses(entries) {
  const sample = QUICK ? entries.filter((_, index) => index % 10 === 0) : entries;
  const responses = await mapLimit(sample, CONCURRENCY, async (entry) => ({ entry, response: await request(`${BASE}${entry.path}`) }));

  for (const { entry, response } of responses) {
    if (response.status === 200) {
      if (robotsDirectives(response.body).includes('noindex')) {
        fallo('sitemap-noindex', `${entry.path} declara noindex`);
      }
      const canonical = canonicalHref(response.body);
      if (!canonical) {
        fallo('sitemap-sin-canonical', `${entry.path} no declara canonical`);
      } else {
        const canonicalUrl = new URL(canonical, `${BASE}${entry.path}`);
        if (canonicalUrl.origin !== CANONICAL_ORIGIN || normalizePath(canonicalUrl.pathname) !== entry.path) {
          fallo('sitemap-canonical-ajena', `${entry.path} declara ${canonicalUrl.toString()}`);
        }
      }
      continue;
    }
    if (response.status === 0) fallo('sitemap-red', `${entry.path}: ${response.error || 'sin respuesta'}`);
    else if (response.status >= 500) fallo('sitemap-5xx', `${entry.path} devuelve ${response.status}`);
    else if (response.status === 404) fallo('sitemap-404', `${entry.path} devuelve 404`);
    else if (response.status >= 300 && response.status < 400) fallo('sitemap-redireccion', `${entry.path} devuelve ${response.status} → ${response.location || 'sin Location'}`);
    else fallo('sitemap-no-200', `${entry.path} devuelve ${response.status}`);
  }
}

/** Las sondas con historial no pueden quedar inaccesibles, aunque no estén en sitemap. */
async function checkCriticalUrls() {
  const responses = await mapLimit(URLS_CRITICAS, CONCURRENCY, async (path) => ({ path, response: await request(BASE + path) }));
  for (const { path, response } of responses) {
    if (response.status === 0 || response.status === 404 || response.status >= 500) {
      fallo('url-critica-inaccesible', `${path} devuelve ${response.status || response.error}`);
    }
  }
}

/** Una sonda que redirige no debe apuntar a otra redirección. */
async function checkRedirectChains() {
  const results = await mapLimit(URLS_CRITICAS, CONCURRENCY, async (path) => {
    const first = await request(BASE + path);
    if (first.status < 300 || first.status >= 400 || !first.location) return null;
    const destination = new URL(first.location, BASE + path).toString();
    const second = await request(destination);
    return second.status >= 300 && second.status < 400 ? { path, destination, status: second.status } : null;
  });
  for (const result of results) {
    if (result) fallo('cadena-de-redireccion', `${result.path} → ${result.destination} → ${result.status}`);
  }
}

/** Compara preguntas, no el número bruto de <details>; otras funciones también usan details. */
async function checkFaqs(paths) {
  const candidates = paths.filter((path) => /^\/(examenes\/[a-z0-9-]+|clases-de-[a-z0-9-]+|quienes-somos)$/.test(path));
  const results = await mapLimit(candidates, CONCURRENCY, async (path) => {
    const response = await request(BASE + path);
    if (response.status !== 200) return null;
    const parity = compareFaqParity(response.body);
    return parity.schema.length ? { path, ...parity } : null;
  });

  for (const result of results) {
    if (!result || (!result.missingVisible.length && !result.missingSchema.length)) continue;
    const details = [
      result.missingVisible.length ? `faltan visibles: ${result.missingVisible.slice(0, 2).join(' | ')}` : '',
      result.missingSchema.length ? `faltan en schema: ${result.missingSchema.slice(0, 2).join(' | ')}` : '',
    ].filter(Boolean).join('; ');
    fallo('paridad-faq', `${result.path}: ${details}`);
  }
}

/** Ninguna página de práctica publicada debe tener menos de cinco enlaces útiles. */
async function checkDeadEnds(paths) {
  const practice = paths.filter((path) => /^\/practica\/[a-z]+\/(a1|a2|b1|b2)\/[a-z-]+$/.test(path));
  const sample = QUICK ? practice.filter((_, index) => index % 7 === 0) : practice;
  const results = await mapLimit(sample, CONCURRENCY, async (path) => {
    const response = await request(BASE + path);
    if (response.status !== 200) return null;
    const links = new Set(internalRoutes(response.body).filter((href) => /^\/(practica|clases-de|examenes)/.test(href)));
    return { path, count: links.size };
  });
  for (const result of results) {
    if (result && result.count < 5) fallo('callejon-sin-salida', `${result.path} solo tiene ${result.count} enlaces salientes`);
  }
}

/** En modo completo, toda URL de sitemap debe recibir al menos un enlace interno. */
async function checkOrphans(paths) {
  const incoming = new Set();
  await mapLimit(paths, CONCURRENCY, async (path) => {
    const response = await request(BASE + path);
    if (response.status !== 200) return;
    for (const href of internalRoutes(response.body)) incoming.add(href);
  });
  for (const path of paths) {
    if (!incoming.has(path)) fallo('huerfana', `${path} no recibe ningún enlace interno`);
  }
}

let entries;
try {
  entries = await readSitemap();
} catch (error) {
  console.error(`No se pudo auditar ${BASE}: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}

const paths = [...new Set(entries.map((entry) => entry.path))];
console.log(`Auditando ${BASE} — ${entries.length} URLs en el sitemap${QUICK ? ' (muestra rápida)' : ''}\n`);

await checkHost();
await checkSitemapResponses(entries);
await checkCriticalUrls();
await checkRedirectChains();
await checkFaqs(paths);
await checkDeadEnds(paths);
if (!QUICK) await checkOrphans(paths);

const RULES = {
  'host-unico': 'Host canónico único',
  'sitemap-invalido': 'URLs inválidas en sitemap',
  'sitemap-duplicado': 'URLs duplicadas en sitemap',
  'sitemap-host': 'Host incorrecto en sitemap',
  'sitemap-red': 'Errores de red en sitemap',
  'sitemap-5xx': 'Errores 5xx en sitemap',
  'sitemap-404': 'Errores 404 en sitemap',
  'sitemap-redireccion': 'Redirecciones dentro del sitemap',
  'sitemap-no-200': 'Respuestas no 200 en sitemap',
  'sitemap-noindex': 'URLs noindex dentro del sitemap',
  'sitemap-sin-canonical': 'URLs del sitemap sin canonical',
  'sitemap-canonical-ajena': 'Canonicals divergentes dentro del sitemap',
  'url-critica-inaccesible': 'URLs críticas inaccesibles',
  'cadena-de-redireccion': 'Cadenas de redirección',
  'paridad-faq': 'Paridad entre FAQs visibles y schema',
  'callejon-sin-salida': 'Callejones sin salida',
  huerfana: 'Páginas huérfanas',
};

if (!problemas.length) {
  console.log(`Sin problemas en ${QUICK ? 'la muestra rápida' : 'la auditoría completa'}.`);
  process.exit(0);
}

const byRule = problemas.reduce((groups, finding) => {
  (groups[finding.regla] ??= []).push(finding);
  return groups;
}, {});
for (const [rule, findings] of Object.entries(byRule)) {
  console.log(`\n${RULES[rule] ?? rule} — ${findings.length}`);
  for (const { detalle } of findings.slice(0, 15)) console.log(`   ${detalle}`);
  if (findings.length > 15) console.log(`   ... y ${findings.length - 15} más`);
}

console.log(`\nTotal: ${problemas.length} problemas.`);
process.exit(1);
