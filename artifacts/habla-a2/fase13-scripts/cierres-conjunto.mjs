// ¿LOS OCHO CIERRES SON DE LA MISMA FORMA? Se mide con solape literal de 6-gramas entre los
// bloques `## Both screens — how it ends`, `## After — both screens` y los `### You did it if`.
// Un solape alto entre dos escenarios distintos significa que el estudiante que hace los dos
// ve el mismo texto dos veces, aunque la historia sea otra.
import { readFileSync } from 'node:fs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = { 1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md', 2: 'fase7-fichas-2-no-appointment-until-thursday.md', 3: 'fase7-modelo-ficha-en.md', 4: 'fase8-fichas-4nuevo.md', 5: 'fase7-fichas-5-late-again-on-monday.md', 6: 'fase7-fichas-6-the-cousin-on-the-sofa.md', 7: 'fase7-fichas-7-two-more-people-for-the-trip.md', 8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md' };
const bloque = (t, ini) => { const i = t.search(ini); if (i < 0) return ''; const m = /^## /gm; m.lastIndex = i + 5; const nx = m.exec(t); return t.slice(i, nx ? nx.index : t.length); };
const tok = s => s.toLowerCase().replace(/[^a-záéíóúñ0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
const sh = (s, n = 6) => { const w = tok(s), o = new Set(); for (let i = 0; i + n <= w.length; i++) o.add(w.slice(i, i + n).join(' ')); return o; };
const jac = (a, b) => { const i = [...a].filter(x => b.has(x)).length; return i / Math.min(a.size, b.size || 1); };

for (const [nom, re] of [['BOTH SCREENS — how it ends', /^## Both screens/m], ['AFTER — both screens, in Spanish', /^## After — both screens/m]]) {
  console.log(`\n=== ${nom} · solape literal de 6-gramas (% del bloque más corto) ===`);
  const B = {};
  for (const e of Object.keys(F)) { const t = readFileSync(DIR + F[e], 'utf8'); B[e] = bloque(t, re); }
  console.log('  tamaño: ' + Object.keys(F).map(e => `${e}:${tok(B[e]).length}p`).join(' '));
  console.log('|   | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |');
  console.log('|---|---|---|---|---|---|---|---|---|');
  const S = {}; for (const e of Object.keys(F)) S[e] = sh(B[e]);
  const pares = [];
  for (const a of Object.keys(F)) {
    const fila = Object.keys(F).map(b => a === b ? '·' : (jac(S[a], S[b]) * 100).toFixed(0) + '%');
    Object.keys(F).forEach(b => { if (+b > +a) pares.push([a, b, jac(S[a], S[b])]); });
    console.log(`| **${a}** | ${fila.join(' | ')} |`);
  }
  const top = pares.sort((x, y) => y[2] - x[2]).slice(0, 4);
  console.log('  pares más parecidos: ' + top.map(([a, b, v]) => `${a}↔${b} ${(v * 100).toFixed(0)} %`).join(' · '));
  const alto = pares.filter(p => p[2] >= .25);
  if (alto.length) {
    console.log(`  pares por encima del 25 %: ${alto.length} → ${alto.map(([a, b, v]) => `${a}↔${b} ${(v * 100).toFixed(0)} %`).join(' · ')}`);
    const [a, b] = alto[0];
    const com = [...S[a]].filter(x => S[b].has(x)).slice(0, 6);
    console.log(`  muestra de lo que comparten ${a} y ${b}:`);
    com.forEach(x => console.log(`    «…${x}…»`));
  }
}

console.log('\n=== FAMILIA DE CIERRE, leída del propio texto ===');
for (const e of Object.keys(F)) {
  const t = readFileSync(DIR + F[e], 'utf8'), b = bloque(t, /^## Both screens/m);
  const seis = /Each of you says three things out loud\. Six in total/i.test(b);
  const together = /\*\*Together, once:?\*\*/i.test(b);
  const reglas = (b.match(/^\*\*(Four|Five|Three) rules/m) || [''])[0];
  const puntos = (b.match(/^\d+\. /gm) || []).length;
  console.log(`  esc ${e}: ${seis ? 'TRES CADA UNO / seis en total' : 'lista compartida de ' + puntos + ' puntos'}${together ? ' + Together' : ''}${reglas ? ' + ' + reglas.replace(/\*/g, '') : ''}`);
}
