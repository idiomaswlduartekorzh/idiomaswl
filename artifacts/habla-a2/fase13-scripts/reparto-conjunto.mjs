// REPARTO DEL CONJUNTO (§5 del blueprint) — poder, arranque, desenlace, culpa, escenografía.
// La banda del diseñador se LEE del disco (no se copia de ningún informe). Culpa y
// escenografía no están escritas como campo: se codifican a mano y cada una lleva pegada la
// línea de la ficha que la sostiene, para que se pueda discutir la codificación, no la cifra.
import { readFileSync } from 'node:fs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = {
  1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md',
  2: 'fase7-fichas-2-no-appointment-until-thursday.md',
  3: 'fase7-modelo-ficha-en.md',
  4: 'fase8-fichas-4nuevo.md',
  5: 'fase7-fichas-5-late-again-on-monday.md',
  6: 'fase7-fichas-6-the-cousin-on-the-sofa.md',
  7: 'fase7-fichas-7-two-more-people-for-the-trip.md',
  8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md',
};
// La banda vive en las 2-3 líneas anteriores al primer `## ROLE A`.
function banda(e) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const cab = t.slice(0, t.indexOf('\n## ROLE A')).replace(/\n/g, ' ');
  const g = (re) => { const m = cab.match(re); return m ? m[1].trim() : '?'; };
  return {
    poder: g(/poder \*\*([^*]+)\*\*/),
    arranca: g(/arranca\s+\*\*([^*]+)\*\*/),
    desenlace: g(/desenlace\s*\*?\*?\s*\*\*([^*]+)\*\*/) !== '?' ? g(/desenlace\s*\*?\*?\s*\*\*([^*]+)\*\*/) : g(/desenlace[^*]*\*\*([^*]+)\*\*/),
    min: g(/\*\*(\d+ min)\*\*/),
    turnos: g(/(\d+(?:-\d+)? turnos por rol|A (\d+) turnos)/),
  };
}
// quién arranca, leído de la cabecera de cada ROL (You start / They start), no de la banda
function arranqueRoles(e) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const iA = t.indexOf('\n## ROLE A'), iB = t.indexOf('\n## ROLE B');
  const iC = t.indexOf('\n## ', iB + 5);
  const A = t.slice(iA, iB), B = t.slice(iB, iC);
  const q = s => /\*\*(You|He|She|\w+) speaks? first\.?\*\*|\*\*You start\.?\*\*/.test(s) ? 'abre'
    : /\*\*(They|He|She|\w+) starts?\.?\*\*/.test(s) ? 'responde' : '?';
  return [q(A), q(B)];
}

// CODIFICACIÓN A MANO, con la línea del disco que la sostiene
const CULPA = {
  1: { quien: 'nadie', nota: 'el hueco entre 390.000 y 350.000 · «Entre los dos números hay $40.000 que no se cierran con dinero»' },
  2: { quien: 'manda', nota: 'el mostrador apuntó mal el teléfono · «in the file now: 310 218 44 71, taken here by phone in March» — GRAVE 4, aplicado el 23 ago 2026' },
  3: { quien: 'A', nota: 'A se examina el sábado que le toca abrir · «Your exam: IELTS, Saturday 12, 8:00 a.m.»' },
  4: { quien: 'B', nota: 'Astrid dio a las diez un número que hoy es falso · «At ten I told you …. That\'s not true now.»' },
  5: { quien: 'A', nota: 'Camilo lleva tres lunes tarde · «You have promised twice»' },
  6: { quien: 'A', nota: 'Dani dijo que sí a la tía el domingo sin preguntar · «You said yes to your aunt on Sunday»' },
  7: { quien: 'B', nota: 'Kevin dijo que sí a dos personas el martes · «You said yes to two people on Tuesday»' },
  8: { quien: 'fuera de escena', nota: 'Wilmer prometió una cancelación y ya no trabaja allí · «Wilmer promised a cancellation … he is gone»' },
};
const ESCENA = {
  1: { sitio: 'portería / lobby de un edificio', tipo: 'zona común de vivienda', ciudad: 'Cabecera', reloj: 'de día · «The shop closes at one»' },
  2: { sitio: 'mostrador de clínica dental', tipo: 'mostrador de institución', ciudad: 'Cabecera', reloj: 'martes 16:20' },
  3: { sitio: 'trastienda de un café', tipo: 'trabajo', ciudad: '—', reloj: 'martes 15:40' },
  4: { sitio: 'patio de una casa', tipo: 'casa ajena / familia', ciudad: 'Girón', reloj: 'domingo 11:20' },
  5: { sitio: 'oficina de una bodega de repuestos', tipo: 'trabajo', ciudad: '—', reloj: 'lunes 7:35' },
  6: { sitio: 'cocina y sala de un apartamento compartido', tipo: 'casa propia', ciudad: '—', reloj: 'martes 20:20' },
  7: { sitio: 'parqueadero de un edificio', tipo: 'zona común de vivienda', ciudad: '—', reloj: 'viernes 19:20' },
  8: { sitio: 'mostrador de un gimnasio', tipo: 'mostrador de institución', ciudad: 'Cabecera', reloj: 'sin hora · «straight from work»' },
};
const RELACION = {
  1: 'desconocidos · trato de compraventa', 2: 'institución ↔ ciudadano', 3: 'iguales · compañeros de turno',
  4: 'iguales · amigos en casa de él', 5: 'jefa ↔ empleado', 6: 'iguales · compañeros de piso',
  7: 'iguales · amigos', 8: 'institución ↔ cliente',
};
const CARTA = {}; // dueño de la carta, leído del disco
for (const e of Object.keys(F)) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const m = t.match(/^## The card[^\n]*/m) || [''];
  CARTA[e] = /role a|rol a|ROLE A/i.test(m[0]) || /Valentina|Fabián/.test(m[0]) ? 'A'
    : /role b|rol b|ROLE B/i.test(m[0]) || /Mauricio|Cris/.test(m[0]) ? 'B' : '?';
  CARTA[e + '_txt'] = m[0].replace(/^## /, '');
}

console.log('| esc | poder | arranca (banda) | arranca (roles) | desenlace | min | relación | sitio | culpa | carta |');
console.log('|---|---|---|---|---|---|---|---|---|---|');
const B = {};
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  B[e] = banda(e);
  const [a, b] = arranqueRoles(e);
  const arr = a === 'abre' ? 'A' : b === 'abre' ? 'B' : '?';
  console.log(`| ${e} | ${B[e].poder} | ${B[e].arranca} | ${arr} | ${B[e].desenlace} | ${B[e].min} | ${RELACION[e]} | ${ESCENA[e].sitio} | ${CULPA[e].quien} | ${CARTA[e]} |`);
}
const pct = (n, d = 8) => `${n}/8 = ${(n / d * 100).toFixed(0)} %`;
const c = (o, f) => [1, 2, 3, 4, 5, 6, 7, 8].filter(e => f(o[e])).length;

console.log('\n=== PODER ===');
for (const p of ['a>b', 'b>a', 'igual']) console.log(`  ${p.padEnd(6)} ${pct(c(B, x => x.poder === p))}   esc ${[1,2,3,4,5,6,7,8].filter(e=>B[e].poder===p).join(', ')}`);
console.log(`  hay un rol que MANDA en ${pct(c(B, x => x.poder !== 'igual'))} · entre IGUALES en ${pct(c(B, x => x.poder === 'igual'))}`);
console.log(`  regla §5 «el estudiante manda en ≥ 3 de 8»: en 8 de 8 uno de los dos asientos manda o son iguales → ${c(B, x => x.poder !== 'igual') >= 3 ? 'PASA' : 'FALLA'}`);
console.log(`  asiento que manda: A en ${c(B, x => x.poder === 'a>b')} · B en ${c(B, x => x.poder === 'b>a')} · nadie en ${c(B, x => x.poder === 'igual')}`);

console.log('\n=== QUIÉN ARRANCA ===');
const arrA = [1,2,3,4,5,6,7,8].filter(e => arranqueRoles(e)[0] === 'abre');
console.log(`  A abre: ${pct(arrA.length)}  (esc ${arrA.join(', ')})`);
console.log(`  B abre: ${pct(8 - arrA.length)}  (esc ${[1,2,3,4,5,6,7,8].filter(e=>!arrA.includes(e)).join(', ')})`);
console.log(`  regla 40-60 %: ${arrA.length / 8 >= .4 && arrA.length / 8 <= .6 ? 'PASA' : 'FALLA'}`);
console.log('  cruce poder × arranque:');
for (const e of [1,2,3,4,5,6,7,8]) {
  const arr = arranqueRoles(e)[0] === 'abre' ? 'A' : 'B';
  const manda = B[e].poder === 'a>b' ? 'A' : B[e].poder === 'b>a' ? 'B' : '—';
  console.log(`    esc ${e}: abre ${arr} · manda ${manda} → ${manda === '—' ? 'iguales' : arr === manda ? 'abre EL QUE MANDA' : 'abre EL QUE PIDE'}`);
}

console.log('\n=== DESENLACE ===');
const D = {};
for (const e of [1,2,3,4,5,6,7,8]) D[B[e].desenlace] = (D[B[e].desenlace] || 0) + 1;
for (const k of Object.keys(D)) console.log(`  ${k.padEnd(16)} ${pct(D[k])}  esc ${[1,2,3,4,5,6,7,8].filter(e=>B[e].desenlace===k).join(', ')}`);
console.log(`  regla «≥1 sin acuerdo y ≥1 acuerdo parcial»: sin acuerdo ${D['sin acuerdo']||0} · parcial ${D['acuerdo-parcial']||0} → ${(D['sin acuerdo']||0)>=1 && (D['acuerdo-parcial']||0)>=1 ? 'PASA' : 'FALLA'}`);

console.log('\n=== CULPA ===');
for (const q of ['A', 'B', 'nadie', 'fuera de escena']) {
  const l = [1,2,3,4,5,6,7,8].filter(e => CULPA[e].quien === q);
  if (l.length) console.log(`  ${q.padEnd(16)} ${pct(l.length)}  esc ${l.join(', ')}`);
}
const jugador = [1,2,3,4,5,6,7,8].filter(e => ['A','B'].includes(CULPA[e].quien));
console.log(`  la causa está en uno de los dos asientos: ${pct(jugador.length)} · fuera de los dos: ${pct(8 - jugador.length)}`);
console.log(`  regla «el estudiante la tiene ≤ 50 %», por asiento: A ${pct(c(CULPA, x=>x.quien==='A'))} · B ${pct(c(CULPA, x=>x.quien==='B'))} → ${Math.max(c(CULPA,x=>x.quien==='A'), c(CULPA,x=>x.quien==='B'))<=4 ? 'PASA' : 'FALLA'}`);
console.log('\n  cruce CULPA × PODER — quién es el culpable respecto de quién manda:');
let culpaAbajo = 0, culpaArriba = 0;
for (const e of jugador) {
  const manda = B[e].poder === 'a>b' ? 'A' : B[e].poder === 'b>a' ? 'B' : '—';
  const rel = manda === '—' ? 'entre iguales' : CULPA[e].quien === manda ? 'LA TIENE EL QUE MANDA' : 'la tiene el que pide';
  if (rel === 'LA TIENE EL QUE MANDA') culpaArriba++; else if (rel === 'la tiene el que pide') culpaAbajo++;
  console.log(`    esc ${e}: culpa ${CULPA[e].quien} · manda ${manda} → ${rel}`);
}
console.log(`  el que MANDA causa el problema en ${culpaArriba} de los 8 escenarios · el que PIDE, en ${culpaAbajo} · entre iguales, ${jugador.length - culpaArriba - culpaAbajo}`);

console.log('\n=== ESCENOGRAFÍA ===');
const tipos = {};
for (const e of [1,2,3,4,5,6,7,8]) tipos[ESCENA[e].tipo] = (tipos[ESCENA[e].tipo] || 0) + 1;
for (const k of Object.keys(tipos).sort((a,b)=>tipos[b]-tipos[a])) console.log(`  ${k.padEnd(30)} ${pct(tipos[k])}  esc ${[1,2,3,4,5,6,7,8].filter(e=>ESCENA[e].tipo===k).join(', ')}`);
console.log(`  regla «≤ 2 de 8 en aula»: aulas 0/8 → PASA`);
console.log('  reloj de cada escena:');
for (const e of [1,2,3,4,5,6,7,8]) console.log(`    esc ${e}: ${ESCENA[e].reloj}${ESCENA[e].ciudad !== '—' ? '  · ' + ESCENA[e].ciudad : ''}`);
const dias = { martes: [2,3,6], lunes: [5], viernes: [7], domingo: [4], 'sin día': [1,8] };
console.log('  día de la semana: ' + Object.entries(dias).map(([d,l])=>`${d} ${l.length}`).join(' · '));

console.log('\n=== RELACIÓN ENTRE LOS DOS (monotonía de pareja) ===');
const rel = {};
for (const e of [1,2,3,4,5,6,7,8]) { const k = RELACION[e].split(' · ')[0]; rel[k] = (rel[k]||0)+1; }
for (const k of Object.keys(rel).sort((a,b)=>rel[b]-rel[a])) console.log(`  ${k.padEnd(24)} ${pct(rel[k])}`);

console.log('\n=== LA CARTA — dueño y momento ===');
for (const e of [1,2,3,4,5,6,7,8]) console.log(`  esc ${e}: ${CARTA[e]}  «${CARTA[e + '_txt']}»`);
console.log(`  dueño A: ${pct(c(CARTA, x => x === 'A'))} · dueño B: ${pct(c(CARTA, x => x === 'B'))}`);
