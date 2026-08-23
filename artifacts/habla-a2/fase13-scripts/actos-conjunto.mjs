// ACTOS DE HABLA — cuota de turnos del SET, medida sobre las filas que HOY están en disco.
//
// Por qué no se reusa `fase11-scripts/actos-cuota.mjs`: su mapa está caducado. Declara
// 9 filas para 1A y 9 para 1B, y el commit 9cfc3dd0 («nueve filas para ocho turnos es un
// guion») las dejó en 8 y 8. Ese script mide 135 turnos-materia sobre un set que hoy tiene
// 133, y las 2 filas fantasma cuentan actos que ya no existen. Aquí el mapa se valida contra
// el número real de filas de cada rol antes de contar: si no cuadra, el script se para.
//
// Unidad: una fila de la tabla de exponentes = un turno que la pareja tiene que producir.
// Criterio de clasificación (uno por fila, el acto dominante):
//   · la forma manda sobre la etiqueta; la tercera columna desempata
//   · fuera del catálogo §7: apertura, cierre-ritual, dar-dato/razon, ganar-tiempo
import { readFileSync } from 'node:fs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = [
  [1, 'fase7-fichas-1-the-bike-in-the-parking-lot.md'],
  [2, 'fase7-fichas-2-no-appointment-until-thursday.md'],
  [3, 'fase7-modelo-ficha-en.md'],
  [4, 'fase8-fichas-4nuevo.md'],
  [5, 'fase7-fichas-5-late-again-on-monday.md'],
  [6, 'fase7-fichas-6-the-cousin-on-the-sofa.md'],
  [7, 'fase7-fichas-7-two-more-people-for-the-trip.md'],
  [8, 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md'],
];

// filas leídas del disco
export function leer() {
  const roles = [];
  for (const [n, f] of F) {
    const lines = readFileSync(DIR + f, 'utf8').split('\n');
    let role = null, sec = null;
    for (const L of lines) {
      if (/^## ROLE /i.test(L)) { role = { n, rol: /ROLE A/i.test(L) ? 'A' : 'B', exp: [], vocab: [], facts: [], sec: [] }; roles.push(role); sec = null; continue; }
      if (/^## /.test(L)) { role = null; continue; }
      if (!role) continue;
      if (/^###\s/.test(L)) { role.sec.push(L.replace(/^###\s*/, '').trim()); sec = null; continue; }
      if (/^\s*\|/.test(L)) {
        const c = L.split('|').map(s => s.trim()).filter((s, i, a) => i > 0 && i < a.length - 1);
        if (c.every(x => /^:?-+:?$/.test(x))) continue;
        const h0 = (c[0] || '').toLowerCase(), h1 = (c[1] || '').toLowerCase();
        if (/^word$/.test(h0) && /what it is/.test(h1)) { sec = 'vocab'; continue; }
        if (/^function$/.test(h0) && /^form$/.test(h1)) { sec = 'exp'; continue; }
        if (c.length === 2 && !h0 && !h1) { sec = 'facts'; continue; }
        if (c.length === 2 && /^time$/.test(h0)) { sec = 'facts'; continue; }
        if (sec === 'vocab' && c[0]) role.vocab.push({ word: c[0], what: c[1] || '', here: c[2] || '' });
        if (sec === 'exp' && c[0]) role.exp.push({ fn: c[0], form: c[1] || '', does: c[2] || '' });
        if (sec === 'facts' && c[0]) role.facts.push(c.join(' | '));
      }
    }
  }
  return roles;
}

// mapa: escenario+rol -> acto por fila, EN EL ORDEN EN QUE ESTÁN EN LA FICHA
const M = {
  '1A': ['pedir-aclaracion', 'poner-limite', 'pedir-aclaracion', 'conceder-con-condicion', 'apertura', 'dar-dato/razon', 'proponer-alternativa', 'poner-limite'],
  '1B': ['pedir-aclaracion', 'poner-limite', 'apertura', 'pedir-favor', 'poner-limite', 'conceder-con-condicion', 'rechazar', 'quejarse'],
  '2A': ['pedir-aclaracion', 'pedir-aclaracion', 'recomendar', 'dar-dato/razon', 'poner-limite', 'recomendar', 'dar-mala-noticia', 'recomendar', 'dar-dato/razon'],
  '2B': ['pedir-aclaracion', 'pedir-aclaracion', 'dar-dato/razon', 'dar-dato/razon', 'proponer-alternativa', 'proponer-alternativa', 'pedir-favor', 'dar-dato/razon', 'poner-limite'],
  '3A': ['pedir-aclaracion', 'pedir-favor', 'dar-mala-noticia', 'negociar', 'proponer-alternativa', 'dar-dato/razon'],
  '3B': ['proponer-alternativa', 'pedir-aclaracion', 'conceder-con-condicion', 'poner-limite', 'dar-mala-noticia', 'dar-dato/razon'],
  '4A': ['recomendar', 'insistir', 'pedir-aclaracion', 'conceder-con-condicion', 'apertura', 'pedir-favor', 'dar-dato/razon', 'proponer-alternativa', 'dar-dato/razon'],
  '4B': ['recomendar', 'pedir-aclaracion', 'proponer-alternativa', 'quejarse', 'conceder-con-condicion', 'insistir', 'apertura', 'rechazar', 'dar-mala-noticia'],
  '5A': ['poner-limite', 'pedir-aclaracion', 'pedir-aclaracion', 'disculparse', 'proponer-alternativa', 'pedir-favor', 'negociar', 'dar-dato/razon', 'proponer-alternativa'],
  '5B': ['pedir-aclaracion', 'conceder-con-condicion', 'dar-dato/razon', 'negociar', 'proponer-alternativa', 'dar-mala-noticia', 'apertura', 'dar-dato/razon', 'dar-dato/razon'],
  '6A': ['proponer-alternativa', 'pedir-aclaracion', 'rechazar', 'disculparse', 'proponer-alternativa', 'pedir-aclaracion', 'dar-dato/razon', 'dar-mala-noticia'],
  '6B': ['proponer-alternativa', 'pedir-favor', 'conceder-con-condicion', 'proponer-alternativa', 'poner-limite', 'dar-mala-noticia', 'pedir-favor', 'dar-dato/razon', 'pedir-aclaracion'],
  '7A': ['pedir-aclaracion', 'quejarse', 'poner-limite', 'cierre-ritual', 'quejarse', 'conceder-con-condicion', 'poner-limite', 'rechazar', 'quejarse'],
  '7B': ['pedir-aclaracion', 'pedir-aclaracion', 'cierre-ritual', 'disculparse', 'disculparse', 'dar-dato/razon', 'negociar', 'pedir-favor', 'dar-dato/razon'],
  '8A': ['insistir', 'insistir', 'pedir-favor', 'pedir-aclaracion', 'ganar-tiempo', 'quejarse', 'poner-limite', 'dar-dato/razon'],
  '8B': ['insistir', 'pedir-favor', 'ganar-tiempo', 'dar-dato/razon', 'proponer-alternativa', 'rechazar', 'disculparse', 'poner-limite'],
};

const CAT = ['pedir-favor', 'rechazar', 'negociar', 'disculparse', 'quejarse', 'proponer-alternativa', 'dar-mala-noticia', 'insistir', 'poner-limite', 'pedir-aclaracion', 'conceder-con-condicion', 'recomendar'];
const FUERA = ['apertura', 'cierre-ritual', 'dar-dato/razon', 'ganar-tiempo'];
const DECL = { 1: ['rechazar', 'conceder-con-condicion'], 2: ['dar-mala-noticia', 'recomendar'], 3: ['pedir-favor', 'conceder-con-condicion'], 4: ['recomendar', 'insistir', 'conceder-con-condicion'], 5: ['disculparse', 'conceder-con-condicion'], 6: ['dar-mala-noticia', 'proponer-alternativa'], 7: ['quejarse', 'rechazar'], 8: ['pedir-favor', 'rechazar', 'proponer-alternativa'] };

if (process.argv[1] && process.argv[1].endsWith('actos-conjunto.mjs')) {
const roles = leer();
let error = 0;
console.log('=== 0 · el mapa contra el disco (esto es lo que el script viejo no hace) ===');
for (const r of roles) {
  const k = r.n + r.rol, m = M[k];
  const ok = m && m.length === r.exp.length;
  if (!ok) { error++; console.log(`  ${k}: DISCO ${r.exp.length} filas · MAPA ${m ? m.length : 0}  <-- DESCUADRE`); }
}
console.log(error ? `  ${error} roles descuadrados` : `  16/16 cuadran · ${roles.reduce((a, r) => a + r.exp.length, 0)} filas`);
if (error) process.exit(1);

const filas = [];
for (const r of roles) M[r.n + r.rol].forEach((a, i) => filas.push({ n: r.n, rol: r.rol, i, acto: a, fn: r.exp[i].fn }));
const T = filas.length;

console.log(`\n=== 1 · CUOTA DE TURNOS DEL SET · ${T} turnos-materia ===`);
console.log('   (el script de fase 11 dice 135: mide 2 filas que ya no están en el escenario 1)');
const decl = new Set(Object.values(DECL).flat());
const cnt = new Map(), esc = new Map(), porRol = new Map();
for (const f of filas) {
  cnt.set(f.acto, (cnt.get(f.acto) || 0) + 1);
  if (!esc.has(f.acto)) esc.set(f.acto, new Set());
  esc.get(f.acto).add(f.n);
  porRol.set(f.acto + '|' + f.rol, (porRol.get(f.acto + '|' + f.rol) || 0) + 1);
}
const ord = [...cnt.entries()].sort((a, b) => b[1] - a[1]);
console.log('\nacto                      turnos   %turnos  techo30  suelo3  esc.   A / B');
console.log('-'.repeat(78));
for (const [a, c] of ord) {
  const p = c / T * 100;
  const techo = p > 30 ? 'FALLA' : (CAT.includes(a) ? ' ok ' : ' n/a');
  const suelo = decl.has(a) ? (p < 3 ? 'FALLA' : ' ok ') : '  — ';
  console.log(`${a.padEnd(24)} ${String(c).padStart(6)}  ${p.toFixed(1).padStart(6)} %  ${techo.padStart(6)}  ${suelo.padStart(6)}  ${String(esc.get(a).size).padStart(2)}/8   ${String(porRol.get(a + '|A') || 0).padStart(2)} / ${String(porRol.get(a + '|B') || 0).padStart(2)}`);
}
const aus = CAT.filter(a => !cnt.has(a));
console.log(`\nactos del catálogo AUSENTES: ${aus.join(', ') || 'ninguno'}`);
console.log(`por encima del techo (30 %): ${ord.filter(([, c]) => c / T > .30).map(([a, c]) => `${a} ${(c / T * 100).toFixed(1)} %`).join(' · ') || 'ninguno'}`);
console.log(`declarados por debajo del suelo (3 %): ${[...decl].filter(a => (cnt.get(a) || 0) / T < .03).map(a => `${a} ${((cnt.get(a) || 0) / T * 100).toFixed(1)} %`).join(' · ') || 'ninguno'}`);
console.log(`del catálogo por debajo del 3 % aunque NO se declaren: ${CAT.filter(a => (cnt.get(a) || 0) / T < .03).map(a => `${a} ${((cnt.get(a) || 0) / T * 100).toFixed(1)} %`).join(' · ') || 'ninguno'}`);

console.log(`\ncatálogo §7: ${filas.filter(f => CAT.includes(f.acto)).length}/${T} = ${(filas.filter(f => CAT.includes(f.acto)).length / T * 100).toFixed(1)} % · fuera de catálogo: ${filas.filter(f => FUERA.includes(f.acto)).length}`);

console.log('\n=== 2 · ¿el escenario produce lo que su banda declara, EN LOS DOS ROLES? ===');
for (let n = 1; n <= 8; n++) {
  const fa = filas.filter(x => x.n === n && x.rol === 'A').map(x => x.acto);
  const fb = filas.filter(x => x.n === n && x.rol === 'B').map(x => x.acto);
  const soloA = DECL[n].filter(a => fa.includes(a) && !fb.includes(a));
  const soloB = DECL[n].filter(a => fb.includes(a) && !fa.includes(a));
  const nada = DECL[n].filter(a => !fa.includes(a) && !fb.includes(a));
  console.log(`  esc ${n}: declara [${DECL[n].join(' + ')}] · en ninguno: ${nada.join(', ') || '—'} · solo A: ${soloA.join(', ') || '—'} · solo B: ${soloB.join(', ') || '—'}`);
}

console.log('\n=== 3 · diversidad por rol (actos distintos del catálogo, de sus filas) ===');
for (const r of roles) {
  const a = filas.filter(x => x.n === r.n && x.rol === r.rol).map(x => x.acto);
  const d = new Set(a.filter(x => CAT.includes(x)));
  console.log(`  ${r.n}${r.rol}: ${r.exp.length} filas · ${d.size} actos del catálogo · ${[...d].join(', ')}`);
}
}
