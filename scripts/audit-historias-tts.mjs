// ─── Auditoría de las Historias como guion de locución ────────────────────────
//
// El guardián `check-historias.mjs` mira el ejercicio. Este mira otra cosa: si el
// texto está listo para meterse en un TTS y cuánto va a costar.
//
//   node scripts/audit-historias-tts.mjs
//
// Dos preguntas:
//   1. ¿Hay algo que un TTS lea mal? (cifras, mayúsculas sostenidas, comillas
//      raras, líneas vacías, espacios artificiales…)
//   2. ¿Cuántos caracteres factura cada nota de voz? ElevenLabs cobra por
//      carácter del campo `text`, así que un espacio de más es un carácter de más.
//
// La normalización de aquí es LA MISMA que usa scripts/generate-historias-audio.mjs.
// Si cambia una, cambia la otra: el número que ves aquí es el que se paga.

import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const { HISTORIA_LANG_KEYS, HISTORIAS_BY_LANG, HISTORIA_LANGS } =
  await import('../src/data/practica/historias/index.ts');
const { ttsTextFor, TTS_LANG_NOTES } = await import('./lib/historias-tts.mjs');

const problems = [];
const warnings = [];
const rows = [];

// Cosas que un TTS lee mal o de forma imprevisible.
const CHECKS = [
  { id: 'cifras', re: /\d/, msg: 'lleva cifras: el TTS puede leerlas en otro idioma o formato' },
  { id: 'mayusculas', re: /\b[A-ZÁÉÍÓÚÜÑ]{3,}\b/, msg: 'lleva una palabra en mayúsculas sostenidas: algunos modelos la deletrean' },
  { id: 'url', re: /https?:\/\/|www\./i, msg: 'lleva una URL' },
  { id: 'emoji', re: /\p{Extended_Pictographic}/u, msg: 'lleva un emoji' },
  { id: 'corchetes', re: /[[\]{}]/, msg: 'lleva corchetes o llaves: se leen como texto' },
  { id: 'barras', re: /\s\/\s/, msg: 'lleva una barra suelta: se lee "barra"' },
  { id: 'abreviatura', re: /\b(etc|p\.ej|vs|aprox)\b\.?/i, msg: 'lleva una abreviatura' },
];

for (const lang of HISTORIA_LANG_KEYS) {
  for (const h of HISTORIAS_BY_LANG[lang]) {
    for (const v of h.voices) {
      const id = `${lang}/${h.slug}/${v.key}`;
      const label = `${HISTORIA_LANGS[lang].flag} ${h.title} · ${v.name}`;

      // ── Correctitud del guion ──────────────────────────────────────────
      v.paragraphs.forEach((p, i) => {
        const where = `${id} línea ${i + 1}`;
        if (!p.trim()) problems.push(`${where}: línea vacía`);
        if (p !== p.trim()) problems.push(`${where}: espacios al principio o al final`);
        if (/\s{2,}/.test(p)) warnings.push(`${where}: espacios dobles`);
        for (const c of CHECKS) if (c.re.test(p)) warnings.push(`${where}: ${c.msg} → «${p.slice(0, 60)}»`);
      });

      const dupes = v.paragraphs.filter((p, i) => v.paragraphs.indexOf(p) !== i);
      if (dupes.length) warnings.push(`${id}: líneas repetidas (${dupes.length}) — a propósito en estas historias, pero conviene oírlas`);

      // ── Coste ──────────────────────────────────────────────────────────
      const bruto = v.paragraphs.join('\n\n').length;
      const tts = ttsTextFor(lang, v.paragraphs);
      rows.push({
        id, label, lang, ready: v.audioSrc !== null,
        lines: v.paragraphs.length, bruto, neto: tts.length,
        ahorro: bruto - tts.length,
      });
    }
  }
}

// ── Informe ────────────────────────────────────────────────────────────────
const pend = rows.filter(r => !r.ready);
const sum = (a, k) => a.reduce((n, r) => n + r[k], 0);

console.log('CARACTERES FACTURABLES POR NOTA DE VOZ\n');
console.log('  ' + 'nota'.padEnd(46) + 'líneas'.padStart(7) + 'bruto'.padStart(8) + 'enviado'.padStart(9) + 'ahorro'.padStart(8));
for (const r of rows) {
  const mark = r.ready ? '✓' : ' ';
  console.log(`${mark} ${r.label.slice(0, 45).padEnd(46)}${String(r.lines).padStart(7)}${String(r.bruto).padStart(8)}${String(r.neto).padStart(9)}${(r.ahorro ? '-' + r.ahorro : '').padStart(8)}`);
}

const netoPend = sum(pend, 'neto');
const brutoPend = sum(pend, 'bruto');
console.log(`\n  ${pend.length} notas pendientes · ${netoPend.toLocaleString('es')} caracteres a enviar`);
if (brutoPend !== netoPend) {
  console.log(`  (sin normalizar serían ${brutoPend.toLocaleString('es')}: la normalización ahorra ${(brutoPend - netoPend).toLocaleString('es')} caracteres)`);
}

console.log('\nCOSTE DE UNA PASADA COMPLETA\n');
// Tarifas MEDIDAS en esta cuenta, no las nominales de ElevenLabs. Son las mismas
// que usa generate-historias-audio.mjs: si las dos difieren, la factura previa
// miente y se toman decisiones con el número equivocado.
const modelos = [
  { id: 'eleven_flash_v2_5',      credito: 0.277, usd: 0.05, nota: 'mitad de precio por carácter' },
  { id: 'eleven_multilingual_v2', credito: 0.548, usd: 0.10, nota: 'el más estable en textos largos' },
  { id: 'eleven_v3',              credito: 0.548, usd: 0.10, nota: 'el más expresivo' },
];
for (const m of modelos) {
  const cr = Math.round(netoPend * m.credito);
  const usd = (netoPend / 1000) * m.usd;
  console.log(`  ${m.id.padEnd(24)} ${cr.toLocaleString('es').padStart(8)} créditos   ~$${usd.toFixed(2).padStart(6)}   ${m.nota}`);
}

console.log('\nNOTAS POR IDIOMA\n');
for (const lang of HISTORIA_LANG_KEYS) {
  const n = TTS_LANG_NOTES[lang];
  if (n) console.log(`  ${HISTORIA_LANGS[lang].flag} ${HISTORIA_LANGS[lang].label.padEnd(10)} ${n}`);
}

if (warnings.length) {
  console.log(`\nAVISOS (${warnings.length}) — nada bloquea, pero escúchalos al revisar:`);
  const shown = warnings.slice(0, 25);
  for (const w of shown) console.log(`  · ${w}`);
  if (warnings.length > shown.length) console.log(`  … y ${warnings.length - shown.length} más`);
}

if (problems.length) {
  console.error(`\n✗ ${problems.length} problema(s) que sí bloquean:`);
  for (const p of problems) console.error(`  · ${p}`);
  process.exit(1);
}
console.log('\n✓ Guiones listos para locución: sin líneas vacías, sin espacios sueltos, sin caracteres que rompan el TTS.');
