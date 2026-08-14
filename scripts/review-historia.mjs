// ─── Prueba de lectura de una historia ────────────────────────────────────────
//
//   node scripts/review-historia.mjs ingles/the-cash-bar
//
// El guardián (check-historias.mjs) mide el conjunto y dice sí o no. Esto es lo
// otro: saca la historia entera en texto plano, con la respuesta correcta ya
// marcada y con la cuenta de palabras de cada opción, para leerla como la lee
// un alumno ANTES de que exista el audio y antes de commitear.
//
// POR QUÉ EXISTE. Escribiendo «the-tip-screen» pasaron dos cosas que ningún
// guardián veía:
//
//   1. Un reemplazo por bloques metió los distractores de una pregunta en otra.
//      La opción marcada como correcta seguía en su índice, así que compilaba,
//      pasaba el guardián, y en pantalla la respuesta correcta no respondía a la
//      pregunta. Solo se ve leyéndolo.
//   2. La respuesta correcta era la más larga en el 100 % de las preguntas.
//      Eso sí lo mide el guardián, pero después de escribir; aquí sale mientras
//      todavía es barato cambiarlo.
//
// Lee del registro ya balanceado, que es lo que ve el alumno: si algo se movió
// de sitio, se ve aquí y no en producción.

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

const { HISTORIAS_BY_LANG, HISTORIA_LANG_KEYS } = await import('../src/data/practica/historias/index.ts');

const arg = process.argv[2];
if (!arg || !arg.includes('/')) {
  console.error('Uso: node scripts/review-historia.mjs <idioma>/<slug>\n');
  console.error('Disponibles:');
  for (const l of HISTORIA_LANG_KEYS) for (const h of HISTORIAS_BY_LANG[l]) console.error(`  ${l}/${h.slug}`);
  process.exit(1);
}
const [lang, slug] = arg.split('/');
const h = (HISTORIAS_BY_LANG[lang] ?? []).find(x => x.slug === slug);
if (!h) { console.error(`No existe ${arg}.`); process.exit(1); }

const cjk = lang === 'coreano' || lang === 'japones';
const largo = s => (cjk ? [...s.trim()].length : s.trim().split(/\s+/).length);
const palabras = t => t.join(' ').trim().split(/\s+/).length;

const linea = '─'.repeat(78);
console.log(`\n${linea}\n${h.title}   ·   ${lang} ${h.level}   ·   ${h.voices.length} voces\n${linea}`);

console.log(`\nNARRADOR — ${h.narrator.paragraphs.length} párrafos, ${palabras(h.narrator.paragraphs)} palabras`);
for (const v of h.voices) {
  const chars = v.paragraphs.join('\n\n').length;
  console.log(`VOZ ${v.key.toUpperCase()} — ${v.name} (${v.sex}, ${v.role}) · ${v.paragraphs.length} líneas, ${palabras(v.paragraphs)} palabras, ${chars} caracteres · audio: ${v.audioSrc ?? 'PENDIENTE'}`);
}

const bloques = [
  ['NARRADOR', h.narrator.questions],
  ...h.voices.map(v => [`VOZ ${v.key.toUpperCase()} · ${v.name}`, v.questions]),
  ['FINAL', h.finalQuestions],
];

let masLarga = 0, exceso = 0, total = 0;
const posiciones = [0, 0, 0, 0];

for (const [nombre, qs] of bloques) {
  console.log(`\n\n${linea}\n${nombre}\n${linea}`);
  qs.forEach((q, i) => {
    const ls = q.opts.map(o => largo(o));
    const c = ls[q.correct];
    const maxD = Math.max(...ls.filter((_, k) => k !== q.correct));
    total++; posiciones[q.correct]++;
    if (c > maxD) masLarga++;
    if (c - maxD >= 3) exceso++;

    console.log(`\n${i + 1}. [${q.type}] ${q.q}`);
    q.opts.forEach((o, k) => {
      const marca = k === q.correct ? '  ✔' : '   ';
      const aviso = k === q.correct && c > maxD ? `  ← la más larga (+${c - maxD})` : '';
      console.log(`${marca} ${String.fromCharCode(65 + k)}) [${String(ls[k]).padStart(2)}] ${o}${aviso}`);
    });
    console.log(`     → ${q.explanation}`);
  });
}

console.log(`\n\n${linea}`);
console.log(`${total} preguntas.`);
console.log(`Posición de la correcta: ${posiciones.map((n, i) => `${String.fromCharCode(65 + i)}=${n}`).join('  ')}`);
console.log(`La correcta es la más larga en ${((masLarga / total) * 100).toFixed(0)} % (${masLarga}/${total}) · con 3+ de ventaja: ${exceso}`);
console.log(`${linea}\n`);
