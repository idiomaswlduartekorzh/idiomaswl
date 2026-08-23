// LO QUE SOLO SE VE MIRANDO LOS OCHO JUNTOS.
// ¿corren sobre el mismo motor? ¿se repiten nombres, oficios, horas, cifras, tipos de carta?
// ¿los ocho cierres tienen la misma forma? ¿los ocho reparten la carga igual?
import { readFileSync } from 'node:fs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = { 1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md', 2: 'fase7-fichas-2-no-appointment-until-thursday.md', 3: 'fase7-modelo-ficha-en.md', 4: 'fase8-fichas-4nuevo.md', 5: 'fase7-fichas-5-late-again-on-monday.md', 6: 'fase7-fichas-6-the-cousin-on-the-sofa.md', 7: 'fase7-fichas-7-two-more-people-for-the-trip.md', 8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md' };
const T = {}, ZONA = {};
for (const e of Object.keys(F)) {
  T[e] = readFileSync(DIR + F[e], 'utf8');
  const iA = T[e].indexOf('\n## ROLE A');
  const iAf = T[e].search(/^## After — both screens/m);
  let fin = T[e].length;
  if (iAf >= 0) { const m = /^## /gm; m.lastIndex = iAf + 10; const nx = m.exec(T[e]); if (nx) fin = nx.index; }
  ZONA[e] = T[e].slice(iA < 0 ? 0 : iA, fin);
}
const roleSlice = (e, r) => {
  const t = ZONA[e], iA = t.indexOf('## ROLE A'), iB = t.indexOf('\n## ROLE B'), iC = t.indexOf('\n## ', iB + 5);
  return r === 'A' ? t.slice(iA, iB) : t.slice(iB, iC);
};

console.log('=== 1 · ¿MISMO MOTOR? · las piezas de §11, rol a rol ===');
// Se buscan por su etiqueta en negrita al principio de línea, y por la cabecera ###
const PIEZAS = [
  ['situación', /\*\*(Where you are|The patio,[^*]*|The bike, and what fits)\*\*/],
  ['objetivo', /\*\*(You want|What you want|What you need before you go)\*\*/],
  ['restricciones', /\*\*(You can't|Three things you won't do)\*\*/],
  ['dato oculto', /\*\*(Only you know|Nobody out there knows this|What you haven't said yet)\*\*/],
  ['lo que se pierde', /\*\*(If you walk away with nothing|If she rides off[^*]*|If you leave at eleven forty[^*]*)\*\*/],
  ['datos duros', /^### (Facts|The numbers you're (cooking|carrying)[^\n]*)/m],
  ['vocabulario', /^### (Words you need here|Words for the (fire|road))/m],
  ['caja', /^### (Your toolkit|What to take from the toolkit)/m],
  ['exponentes', /^### (Say it here|Out loud[^\n]*)/m],
  ['criterios', /^### (You did it if|The lunch happened if|You rode off right if)/m],
];
console.log('| rol | ' + PIEZAS.map(p => p[0]).join(' | ') + ' | piezas |');
console.log('|---' + PIEZAS.map(() => '|---').join('') + '|---|');
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const r of ['A', 'B']) {
  const s = roleSlice(e, r);
  const hits = PIEZAS.map(([, re]) => re.test(s));
  console.log(`| ${e}${r} | ${hits.map(h => h ? '·' : '**NO**').join(' | ')} | ${hits.filter(Boolean).length}/10 |`);
}
console.log('\n  etiquetas REALES de cada pieza, para ver quién se sale del molde:');
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const r of ['A', 'B']) {
  const s = roleSlice(e, r);
  const bold = [...s.matchAll(/^\*\*([^*]{3,60})\*\*\s*·/gm)].map(m => m[1]);
  const h3 = [...s.matchAll(/^### ([^\n·—]+)/gm)].map(m => m[1].trim());
  console.log(`  ${e}${r}: prosa [${bold.join(' | ')}]  ###[${h3.join(' | ')}]`);
}

console.log('\n=== 2 · LOS OCHO CIERRES · ¿la misma forma? ===');
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const r of ['A', 'B']) {
  const s = roleSlice(e, r);
  const i = s.search(/^### (You did it if|The lunch happened if|You rode off right if)/m);
  let txt = i < 0 ? '' : s.slice(i).split('\n').slice(1).join(' ').split('---')[0].trim();
  const forma = /^\s*1\./m.test(txt) ? 'lista numerada' : (txt.match(/·/g) || []).length >= 3 ? 'sarta de viñetas «·»' : 'prosa corrida';
  const pal = txt.replace(/[*·`>|—]/g, ' ').split(/\s+/).filter(x => /[A-Za-z0-9]/.test(x)).length;
  const crit = forma === 'lista numerada' ? (txt.match(/^\s*\d+\./gm) || []).length : (txt.split('·').length);
  console.log(`  ${e}${r}: ${forma.padEnd(22)} ${String(pal).padStart(3)} pal · ~${crit} criterios`);
}
console.log('\n  fórmulas de cierre que se repiten LITERALMENTE entre escenarios distintos:');
const FORM = [
  [/what is (still )?open (was said|has a name)|said out loud what is still open|The open question has a name/i, 'lo que queda abierto, con nombre y hora'],
  [/you never (said|blamed)[^.·]*(problem is them|this is their problem|blamed the group)|never said that this is their problem/i, '«nunca dijiste que el problema son ellos»'],
  [/breakfast tomorrow still works/i, '«breakfast tomorrow still works»'],
  [/tomorrow you still travel together/i, '«tomorrow you still travel together»'],
  [/asked an open question and learned something new|open question/i, '«una pregunta abierta»'],
  [/the 5th, the 12th and the last hour that counts/i, '«the 5th, the 12th and the last hour that counts»'],
  [/\*\*one\*\* way and what it needs/i, '«one way and what it needs»'],
];
for (const [re, nom] of FORM) {
  const hits = [];
  for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const r of ['A', 'B']) {
    const s = roleSlice(e, r); const i = s.search(/^### (You did it if|The lunch happened if|You rode off right if)/m);
    if (i >= 0 && re.test(s.slice(i))) hits.push(e + r);
  }
  console.log(`  ${nom.padEnd(46)} ${hits.length}/16 roles · ${new Set(hits.map(h => h[0])).size}/8 esc · ${hits.join(', ')}`);
}

console.log('\n=== 3 · NOMBRES · ¿se repite alguno entre escenarios? ===');
const NOM = /\b(Fabián|Duván|Camilo|Kevin|Iván|Nelson|Elkin|Hernán|Sebastián|Édgar|Édison|Wilmer|Matías|Mauricio|Amparo|Valentina|Tatiana|Milena|Astrid|Alba|Andrea|Marcela|Nubia|Nayibe|Katherine|Yurany|Restrepo|Dani|Cris)\b/g;
const donde = new Map();
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const m of new Set([...ZONA[e].matchAll(NOM)].map(x => x[1]))) { if (!donde.has(m)) donde.set(m, []); donde.get(m).push(e); }
const rep = [...donde].filter(([, v]) => v.length > 1);
console.log(`  nombres distintos en la zona jugable: ${donde.size}`);
console.log(`  repetidos entre escenarios: ${rep.length ? rep.map(([k, v]) => `${k} (esc ${v.join(',')})`).join(' · ') : 'ninguno'}`);
console.log(`  escenarios SIN ningún nombre propio: ${[1,2,3,4,5,6,7,8].filter(e => ![...ZONA[e].matchAll(NOM)].length).join(', ') || 'ninguno'}`);
for (const e of [1,2,3,4,5,6,7,8]) console.log(`    esc ${e}: ${[...new Set([...ZONA[e].matchAll(NOM)].map(x => x[1]))].join(', ') || '— sin nombres —'}`);

console.log('\n=== 4 · TIPO DE «CARTA» ===');
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const i = T[e].search(/^## The card/m); const j = T[e].indexOf('\n## ', i + 5);
  const c = T[e].slice(i, j < 0 ? i + 1500 : j);
  const tipo = /Email|email/.test(c) ? 'email' : /WhatsApp|message|Message|chat/.test(c) ? 'mensaje / chat' : /call|llamada|Missed/.test(c) ? 'llamada' : /screen|Screen/.test(c) ? 'pantalla del sistema' : '?';
  const canal = (c.match(/^> \*\*[^\n]*/m) || [''])[0].slice(0, 90);
  console.log(`  esc ${e}: ${tipo.padEnd(20)} ${canal}`);
}

console.log('\n=== 5 · CARGA · turnos declarados, minutos, segundos por turno ===');
console.log('| esc | turnos/rol | globales | min | seg/turno | filas A | filas B |');
console.log('|---|---|---|---|---|---|---|');
const TUR = { 1: [8, 6], 2: [9, 6], 3: [7, 7], 4: [9, 7], 5: [9, 8], 6: [9, 8], 7: [9, 7], 8: [8, 8] };
const FIL = { 1: [8, 8], 2: [9, 9], 3: [6, 6], 4: [9, 9], 5: [9, 9], 6: [8, 9], 7: [9, 9], 8: [8, 8] };
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const [t, m] = TUR[e], g = t * 2;
  console.log(`| ${e} | ${t} | ${g} | ${m} | ${(m * 60 / g).toFixed(0)} s | ${FIL[e][0]} | ${FIL[e][1]} |`);
}
const segs = [1,2,3,4,5,6,7,8].map(e => TUR[e][1] * 60 / (TUR[e][0] * 2));
console.log(`  seg/turno: min ${Math.min(...segs).toFixed(0)} (esc ${[1,2,3,4,5,6,7,8][segs.indexOf(Math.min(...segs))]}) · max ${Math.max(...segs).toFixed(0)} (esc ${[1,2,3,4,5,6,7,8][segs.indexOf(Math.max(...segs))]}) · rango ${(Math.max(...segs) - Math.min(...segs)).toFixed(0)} s`);

console.log('\n=== 6 · HORAS Y CIFRAS que se repiten entre escenarios ===');
const horas = new Map(), cifras = new Map();
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  for (const m of new Set([...ZONA[e].matchAll(/\b(\d{1,2}:\d{2})\b/g)].map(x => x[1]))) { if (!horas.has(m)) horas.set(m, new Set()); horas.get(m).add(e); }
  for (const m of new Set([...ZONA[e].matchAll(/\b(\d{2,3},000|\d{1,3}\.\d{3})\b/g)].map(x => x[1]))) { if (!cifras.has(m)) cifras.set(m, new Set()); cifras.get(m).add(e); }
}
console.log('  horas en ≥2 escenarios: ' + [...horas].filter(([, v]) => v.size > 1).map(([k, v]) => `${k} (${[...v].join(',')})`).join(' · '));
console.log('  cifras de pesos en ≥2 escenarios: ' + ([...cifras].filter(([, v]) => v.size > 1).map(([k, v]) => `${k} (${[...v].join(',')})`).join(' · ') || 'ninguna'));
console.log('  escenarios con una cifra de pesos en la zona jugable: ' + [1,2,3,4,5,6,7,8].filter(e => /\d{2,3},000|\d{1,3}\.\d{3}/.test(ZONA[e])).join(', '));

console.log('\n=== 7 · EL MOLDE DE SALIDA · ¿cómo se resuelve cada uno? ===');
const SALIDA = {
  1: 'se cambia QUÉ entra en el trato (piezas + transporte), no el precio',
  2: 'se ofrece OTRA sede y otra hora + algo para esta noche',
  3: 'se parte el turno en dos y se paga con una fecha',
  4: 'se cocina en dos tandas y se suelta el recipiente con condición',
  5: 'se cambia la hora de entrada a cambio de dos mañanas de formación',
  6: 'se reparte la mesa por franjas y se busca una segunda cama',
  7: 'se aplaza la deuda con fecha y entra uno de los dos, no los dos',
  8: 'no hay salida: se abre un caso y se firma, la cancelación no llega',
};
const MOLDE = { 1: 'ofrecer alternativa', 2: 'ofrecer alternativa', 3: 'ofrecer alternativa', 4: 'ofrecer alternativa', 5: 'intercambio condicionado', 6: 'ofrecer alternativa', 7: 'intercambio condicionado', 8: 'sustituto de segundo orden' };
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) console.log(`  esc ${e}: [${MOLDE[e]}] ${SALIDA[e]}`);
const mc = {}; for (const e of [1,2,3,4,5,6,7,8]) mc[MOLDE[e]] = (mc[MOLDE[e]] || 0) + 1;
for (const k of Object.keys(mc)) console.log(`  → ${k}: ${mc[k]}/8 = ${(mc[k] / 8 * 100).toFixed(0)} %`);
