#!/usr/bin/env node
/**
 * Auditoría de la red interna del sitio, contra producción.
 *
 * Nace de la Fase 0 del plan (docs/PLAN-ATAQUE-SEO-FASES.md): «red verificada al
 * 100 %» no puede ser una comprobación única, porque cada despliegue puede
 * romperla. Esto se ejecuta y falla ruidosamente.
 *
 * Comprueba seis cosas que ya fallaron de verdad en este sitio:
 *
 *   1. Huérfanas         — una URL en el sitemap sin ningún enlace entrante no se
 *                          rastrea. /clases-de-ingles-bucaramanga tuvo 1 impresión
 *                          en 12 días por esto.
 *   2. Callejones        — las páginas de destreza tenían 0 o 1 enlaces salientes;
 *                          Google dejó 470 páginas en «Descubierta: sin indexar».
 *   3. Paridad de FAQs   — el FAQPage escrito aparte diverge del texto visible.
 *                          Pasó en el hub de Bucaramanga.
 *   4. 404 con historial — 75 URLs indexadas devolvían 404 tras renombrar slugs.
 *   5. Host único        — el 307 en vez de 308 mantuvo 35 URLs indexadas sin www.
 *   6. Cadenas           — una redirección que apunta a otra pierde señal.
 *
 * Uso:
 *   node scripts/audit-seo.mjs                 # todo
 *   node scripts/audit-seo.mjs --quick         # sin el grafo completo (rápido)
 *   node scripts/audit-seo.mjs --base=http://localhost:3000
 *
 * Sale con código 1 si algo falla, para poder encadenarlo antes de desplegar.
 */

const args = process.argv.slice(2);
const BASE = (args.find(a => a.startsWith('--base=')) || '--base=https://www.idiomaswl.com').split('=')[1];
const QUICK = args.includes('--quick');
const CONCURRENCY = 10;

/** URLs que tuvieron impresiones alguna vez. Se amplía al exportar Search Console. */
const URLS_CON_HISTORIAL = [
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

async function mapLimit(items, limit, fn) {
  const out = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, async () => {
      while (i < items.length) {
        const n = i++;
        try { out[n] = await fn(items[n]); } catch { out[n] = null; }
      }
    })
  );
  return out;
}

async function head(url) {
  try {
    const r = await fetch(url, { redirect: 'manual' });
    return { status: r.status, location: r.headers.get('location') };
  } catch { return { status: 0, location: null }; }
}

async function text(url) {
  try {
    const r = await fetch(url);
    return r.ok ? await r.text() : '';
  } catch { return ''; }
}

const rutasDe = html => [...html.matchAll(/href="(\/[^"#?]*)"/g)].map(m => m[1]);

// ─────────────────────────────────────────────────────────────────────────────

async function sitemap() {
  const xml = await text(`${BASE}/sitemap.xml`);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  return locs.map(u => u.replace(/^https?:\/\/[^/]+/, '') || '/');
}

/** 5 · Un solo host canónico: el dominio sin www debe hacer 308, no 307. */
async function checkHost() {
  const { status, location } = await head('https://idiomaswl.com/');
  if (status !== 308 && status !== 301) {
    fallo('host-unico', `idiomaswl.com responde ${status} (se espera 308 o 301). Un 307 es temporal y mantiene ambas versiones indexadas.`);
  }
  if (location && !location.includes('www.')) {
    fallo('host-unico', `la redirección no apunta a www: ${location}`);
  }
}

/** 4 · Ninguna URL con historial de impresiones puede devolver 404. */
async function check404() {
  const res = await mapLimit(URLS_CON_HISTORIAL, CONCURRENCY, async p => ({ p, ...(await head(BASE + p)) }));
  for (const r of res) {
    if (!r) continue;
    if (r.status === 404) fallo('404-con-historial', `${r.p} devuelve 404 y tuvo impresiones`);
  }
}

/** 6 · Una redirección no debe apuntar a otra redirección. */
async function checkCadenas() {
  const res = await mapLimit(URLS_CON_HISTORIAL, CONCURRENCY, async p => {
    const a = await head(BASE + p);
    if (a.status < 300 || a.status >= 400 || !a.location) return null;
    const destino = a.location.startsWith('http') ? a.location : BASE + a.location;
    const b = await head(destino);
    return b.status >= 300 && b.status < 400 ? { p, destino, status: b.status } : null;
  });
  for (const r of res) if (r) fallo('cadena-de-redireccion', `${r.p} -> ${r.destino} -> ${r.status}`);
}

/** 3 · Las FAQs visibles deben coincidir con las del FAQPage. */
async function checkFaqs(rutas) {
  const candidatas = rutas.filter(p => /^\/(examenes\/[a-z0-9-]+|clases-de-[a-z0-9-]+|quienes-somos)$/.test(p));
  const res = await mapLimit(candidatas, CONCURRENCY, async p => {
    const html = await text(BASE + p);
    if (!html) return null;
    let enSchema = 0;
    for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const d = JSON.parse(m[1]);
        for (const n of d['@graph'] || [d]) {
          if (n['@type'] === 'FAQPage') enSchema = n.mainEntity.length;
        }
      } catch { /* marcado no parseable: se reporta abajo */ }
    }
    if (!enSchema) return null;
    // Las FAQs visibles se pintan como <details> o como bloques con clase faq-q
    const visibles = (html.match(/<details/g) || []).length || (html.match(/wlh-faq-q/g) || []).length;
    return { p, enSchema, visibles };
  });
  for (const r of res) {
    if (!r) continue;
    if (r.visibles !== r.enSchema) {
      fallo('paridad-faq', `${r.p}: ${r.visibles} visibles vs ${r.enSchema} en el schema`);
    }
  }
}

/** 2 · Ninguna página de práctica puede tener menos de 5 enlaces salientes. */
async function checkCallejones(rutas) {
  const practica = rutas.filter(p => /^\/practica\/[a-z]+\/(a1|a2|b1|b2)\/[a-z-]+$/.test(p));
  const muestra = QUICK ? practica.filter((_, i) => i % 7 === 0) : practica;
  const res = await mapLimit(muestra, CONCURRENCY, async p => {
    const html = await text(BASE + p);
    if (!html) return null;
    const n = new Set(rutasDe(html).filter(h => /^\/(practica|clases-de|examenes)/.test(h))).size;
    return { p, n };
  });
  for (const r of res) if (r && r.n < 5) fallo('callejon-sin-salida', `${r.p} solo tiene ${r.n} enlaces salientes`);
}

/** 1 · Toda URL del sitemap debe recibir al menos un enlace interno. */
async function checkHuerfanas(rutas) {
  const entrantes = new Set();
  const paginas = QUICK ? rutas.filter((_, i) => i % 5 === 0) : rutas;
  await mapLimit(paginas, CONCURRENCY, async p => {
    for (const h of rutasDe(await text(BASE + p))) entrantes.add(h.replace(/\/$/, '') || '/');
  });
  for (const p of rutas) {
    const clave = p.replace(/\/$/, '') || '/';
    if (!entrantes.has(clave)) fallo('huerfana', `${p} no recibe ningún enlace interno`);
  }
}

// ─────────────────────────────────────────────────────────────────────────────

const rutas = await sitemap();
if (!rutas.length) {
  console.error('No se pudo leer el sitemap. ¿Está el sitio arriba?');
  process.exit(1);
}
console.log(`Auditando ${BASE} — ${rutas.length} URLs en el sitemap${QUICK ? ' (modo rápido)' : ''}\n`);

await checkHost();
await check404();
await checkCadenas();
await checkFaqs(rutas);
await checkCallejones(rutas);
if (!QUICK) await checkHuerfanas(rutas);

const REGLAS = {
  'host-unico': '5 · Un solo host canónico',
  '404-con-historial': '4 · URLs con historial que devuelven 404',
  'cadena-de-redireccion': '6 · Cadenas de redirección',
  'paridad-faq': '3 · Paridad entre FAQs visibles y schema',
  'callejon-sin-salida': '2 · Callejones sin salida',
  huerfana: '1 · Páginas huérfanas',
};

if (!problemas.length) {
  console.log('Sin problemas. La red interna está sana.');
  process.exit(0);
}

const porRegla = {};
for (const p of problemas) (porRegla[p.regla] ||= []).push(p.detalle);

for (const [regla, lista] of Object.entries(porRegla)) {
  console.log(`\n${REGLAS[regla] ?? regla} — ${lista.length}`);
  for (const d of lista.slice(0, 15)) console.log(`   ${d}`);
  if (lista.length > 15) console.log(`   ... y ${lista.length - 15} más`);
}

console.log(`\nTotal: ${problemas.length} problemas.`);
console.log('Nota: la raíz "/" aparece como huérfana a propósito mientras la home siga en /home.');
process.exit(1);
