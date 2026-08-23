// GÉNERO DEL CONJUNTO (§5): «Se cuenta quién manda en escena, quién decide fuera, quién gana
// y quién causa el problema». Aquí se cuentan las CUATRO cosas, no solo los pronombres.
// Los nombres se leen del disco; el género y el papel de cada uno se codifican a mano con la
// línea de la ficha que lo sostiene. El aviso de §5 —«ojo con arreglarlo del revés»— obliga a
// mirar también la columna de FUERA de escena, que es donde el sesgo se esconde después.
import { readFileSync } from 'node:fs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = { 1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md', 2: 'fase7-fichas-2-no-appointment-until-thursday.md', 3: 'fase7-modelo-ficha-en.md', 4: 'fase8-fichas-4nuevo.md', 5: 'fase7-fichas-5-late-again-on-monday.md', 6: 'fase7-fichas-6-the-cousin-on-the-sofa.md', 7: 'fase7-fichas-7-two-more-people-for-the-trip.md', 8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md' };
const ZONA = {};
for (const e of Object.keys(F)) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const iA = t.indexOf('\n## ROLE A'); const iAf = t.search(/^## After — both screens/m);
  let fin = t.length; if (iAf >= 0) { const m = /^## /gm; m.lastIndex = iAf + 10; const nx = m.exec(t); if (nx) fin = nx.index; }
  ZONA[e] = t.slice(iA < 0 ? 0 : iA, fin);
}
const G = { 'Fabián': 'H', 'Camilo': 'H', 'Kevin': 'H', 'Iván': 'H', 'Nelson': 'H', 'Elkin': 'H', 'Hernán': 'H', 'Sebastián': 'H', 'Édgar': 'H', 'Édison': 'H', 'Wilmer': 'H', 'Matías': 'H', 'Mauricio': 'H', 'Amparo': 'M', 'Valentina': 'M', 'Tatiana': 'M', 'Astrid': 'M', 'Alba': 'M', 'Andrea': 'M', 'Marcela': 'M', 'Nubia': 'M', 'Nayibe': 'M', 'Katherine': 'M', 'Yurany': 'M', 'Restrepo': 'M', 'Dani': 'N', 'Cris': 'N' };

// las cuatro columnas de §5, codificadas con su prueba
const T = {
  1: { A: ['—', 'sin nombre ni pronombre'], B: ['—', 'sin nombre ni pronombre'], manda: ['—', 'poder a>b pero los dos roles son anónimos'], fuera: ['el portero', 'H', '«The doorman told you twice» — la regla que no se puede romper'], carta: ['el cuñado', 'H', '«No truck today … — my brother-in-law»'], gana: ['—', 'acuerdo: ganan los dos'], culpa: ['—', 'el hueco de 40.000, de nadie'] },
  2: { A: ['—', 'sin nombre'], B: ['—', 'sin nombre'], manda: ['—', 'poder a>b, mostrador anónimo'], fuera: ['Dr. Restrepo', 'M', '«You can\'t ask Dr. Restrepo anything before 5:00»'], carta: ['Dr. Restrepo', 'M', '«Dr. Restrepo · 4:24 p.m.»'], gana: ['—', 'acuerdo: ganan los dos'], culpa: ['—', 'un diente roto el domingo'] },
  3: { A: ['—', 'sin nombre'], B: ['—', 'sin nombre'], manda: ['—', 'poder igual, los dos anónimos'], fuera: ['Nayibe', 'M', '«Nayibe said in front of everybody that nobody pays for a shift here»'], carta: ['el centro de examen', '—', '«Email · exam center»'], gana: ['—', 'acuerdo parcial'], culpa: ['A', 'A se examina el sábado que le toca abrir'] },
  4: { A: ['Fabián', 'H'], B: ['Astrid', 'M'], manda: ['Fabián', 'H', 'poder a>b · «the house, the fire and the food are his»'], fuera: ['la mamá', 'M', '«Coming at 1:00 | her, your uncle and aunt»' ], carta: ['la mamá', 'M', '«Phone · your mother · 11:2x»'], gana: ['—', 'acuerdo parcial'], culpa: ['Astrid', 'M', '«At ten I told you …. That\'s not true now.»'] },
  5: { A: ['Camilo', 'H'], B: ['doña Amparo', 'M'], manda: ['doña Amparo', 'M', 'poder b>a · «She is your supervisor»'], fuera: ['—', '—', 'nadie decide por encima de Amparo: la restricción es la política de la tienda'], carta: ['Alba', 'M', '«Alba knocks on the office door»'], gana: ['—', 'acuerdo: los dos se llevan lo suyo'], culpa: ['Camilo', 'H', '«You have promised twice»'] },
  6: { A: ['Dani', 'N'], B: ['Cris', 'N'], manda: ['—', 'poder igual · los dos neutros a propósito'], fuera: ['la tía', 'M', '«You said yes to your aunt on Sunday» · «tonight your aunt will hear about it»'], carta: ['la mamá', 'M', '«Voice message from your mom · 8:44 p.m.»'], gana: ['—', 'acuerdo parcial'], culpa: ['Dani', 'N', '«You said yes to your aunt on Sunday»'] },
  7: { A: ['Valentina', 'M'], B: ['Kevin', 'H'], manda: ['Valentina', 'M', 'poder a>b · «the reservation in your name»'], fuera: ['doña Nubia', 'M', '«only doña Nubia can change your list»'], carta: ['doña Nubia', 'M', '«Voice note from doña Nubia»'], gana: ['Valentina', 'M', 'aplazado: Kevin no se lleva las dos plazas y la deuda queda con fecha'], culpa: ['Kevin', 'H', '«You said yes to two people on Tuesday»'] },
  8: { A: ['Tatiana', 'M'], B: ['Mauricio', 'H'], manda: ['Mauricio', 'M?', 'poder b>a · el mostrador'], fuera: ['Édison / retención', 'H', '«That answer comes from retention, in writing, and not from you»'], carta: ['Édison', 'H', '«Message from Édison · 6:52 p.m.»'], gana: ['Mauricio', 'H', 'sin acuerdo: él se lleva la firma, ella no se lleva la baja'], culpa: ['Wilmer', 'H', '«Wilmer promised a cancellation … he is gone»'] },
};
T[8].manda = ['Mauricio', 'H', 'poder b>a · el mostrador'];

const pct = (n, d) => `${n}/${d} = ${(n / d * 100).toFixed(0)} %`;
console.log('| esc | rol A | rol B | manda en escena | decide fuera | manda la carta | gana | causa el problema |');
console.log('|---|---|---|---|---|---|---|---|');
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const t = T[e];
  console.log(`| ${e} | ${t.A[0]} (${t.A[1]}) | ${t.B[0]} (${t.B[1]}) | ${t.manda[0]} (${t.manda[1]}) | ${t.fuera[0]} (${t.fuera[1]}) | ${t.carta[0]} (${t.carta[1]}) | ${t.gana[0]} ${t.gana[1] && t.gana[1].length < 3 ? '(' + t.gana[1] + ')' : ''} | ${t.culpa[0]} ${t.culpa[1] && t.culpa[1].length < 3 ? '(' + t.culpa[1] + ')' : ''} |`);
}
const cuenta = (campo, idx) => {
  const c = { H: 0, M: 0, N: 0, '—': 0 };
  for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) { const g = T[e][campo][idx]; c[['H', 'M', 'N'].includes(g) ? g : '—']++; }
  return c;
};
console.log('\n=== LAS CUATRO COLUMNAS DE §5 ===');
for (const [nom, campo, idx] of [['rol A', 'A', 1], ['rol B', 'B', 1], ['manda EN escena', 'manda', 1], ['decide FUERA de escena', 'fuera', 1], ['manda la carta', 'carta', 1], ['gana', 'gana', 1], ['causa el problema', 'culpa', 1]]) {
  const c = cuenta(campo, idx);
  const total = c.H + c.M + c.N;
  console.log(`  ${nom.padEnd(24)} H ${c.H} · M ${c.M} · N ${c.N} · sin género ${c['—']}   ${total ? `(sobre los ${total} con género: H ${pct(c.H, total)}, M ${pct(c.M, total)})` : ''}`);
}
console.log('\n  regla §5 «ni el poder ni la culpa se concentran en un género»:');
const mp = cuenta('manda', 1), cp = cuenta('culpa', 1), fp = cuenta('fuera', 1), kp = cuenta('carta', 1);
console.log(`    poder EN escena: H ${mp.H} · M ${mp.M} → ${Math.abs(mp.H - mp.M) <= 1 ? 'PASA' : 'FALLA'}`);
console.log(`    culpa:           H ${cp.H} · M ${cp.M} · N ${cp.N} → ${Math.abs(cp.H - cp.M) <= 2 ? 'PASA' : 'FALLA'}`);
console.log(`    decide FUERA:    H ${fp.H} · M ${fp.M} → ${Math.abs(fp.H - fp.M) <= 1 ? 'PASA' : '**DESEQUILIBRIO**'}  ← la columna del aviso de §5`);
console.log(`    manda la carta:  H ${kp.H} · M ${kp.M} → ${Math.abs(kp.H - kp.M) <= 1 ? 'PASA' : '**DESEQUILIBRIO**'}`);

console.log('\n=== NOMBRES DE LA ZONA JUGABLE, por género ===');
const NOM = new RegExp('\\b(' + Object.keys(G).join('|') + ')\\b', 'g');
const vistos = new Map();
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) for (const m of new Set([...ZONA[e].matchAll(NOM)].map(x => x[1]))) { if (!vistos.has(m)) vistos.set(m, []); vistos.get(m).push(e); }
const porG = { H: [], M: [], N: [] };
for (const [n] of vistos) porG[G[n]].push(n);
console.log(`  hombres ${porG.H.length}: ${porG.H.join(', ')}`);
console.log(`  mujeres ${porG.M.length}: ${porG.M.join(', ')}`);
console.log(`  neutros ${porG.N.length}: ${porG.N.join(', ')}`);
console.log(`  reparto de los ${vistos.size} nombres: H ${pct(porG.H.length, vistos.size)} · M ${pct(porG.M.length, vistos.size)} · N ${pct(porG.N.length, vistos.size)}`);

console.log('\n=== PRONOMBRES DE 3.ª PERSONA en la zona jugable (quién es «el otro» del que se habla) ===');
console.log('| esc | he/him/his | she/her |');
console.log('|---|---|---|');
let h = 0, s = 0;
for (const e of [1, 2, 3, 4, 5, 6, 7, 8]) {
  const a = (ZONA[e].match(/\b(he|him|his)\b/gi) || []).length, b = (ZONA[e].match(/\b(she|her|hers)\b/gi) || []).length;
  h += a; s += b; console.log(`| ${e} | ${a} | ${b} |`);
}
console.log(`| SET | ${h} | ${s} |  → H ${pct(h, h + s)} · M ${pct(s, h + s)}`);
