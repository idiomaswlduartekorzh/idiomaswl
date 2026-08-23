// VOCABULARIO DEL CONJUNTO — tres cosas que solo se ven con los dieciséis bloques juntos:
//   A · solape A↔B dentro del mismo escenario (§11: «solo las de ESTE rol en ESTE escenario»)
//   B · exclusividad entre escenarios
//   C · entradas de adorno, con una prueba comprobable en vez de una lista a mano:
//       §11 dice que entran «las que aparecen en los datos duros del propio rol, las que le
//       va a soltar el otro, y las del oficio de la escena». Prueba: ¿la palabra aparece en
//       ALGÚN otro sitio de las dos fichas del escenario —datos, prosa, exponentes, carta—
//       o solo en su propia fila de vocabulario? Si solo ahí, no la sostiene nada.
import { readFileSync } from 'node:fs';
import { leer } from './actos-conjunto.mjs';
const DIR = '/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F = { 1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md', 2: 'fase7-fichas-2-no-appointment-until-thursday.md', 3: 'fase7-modelo-ficha-en.md', 4: 'fase8-fichas-4nuevo.md', 5: 'fase7-fichas-5-late-again-on-monday.md', 6: 'fase7-fichas-6-the-cousin-on-the-sofa.md', 7: 'fase7-fichas-7-two-more-people-for-the-trip.md', 8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md' };
const ZONA = {};
for (const e of Object.keys(F)) {
  const t = readFileSync(DIR + F[e], 'utf8');
  const iA = t.indexOf('\n## ROLE A');
  const iAf = t.search(/^## After — both screens/m);
  let fin = t.length;
  if (iAf >= 0) { const m = /^## /gm; m.lastIndex = iAf + 10; const nx = m.exec(t); if (nx) fin = nx.index; }
  ZONA[e] = t.slice(iA < 0 ? 0 : iA, fin);
}
const norm = s => s.toLowerCase().replace(/\(.*?\)/g, ' ').replace(/\*.*?\*/g, ' ').replace(/·/g, ' / ').split('/')[0]
  .replace(/[^a-z\s'-]/g, ' ').replace(/\s+/g, ' ').trim().replace(/^(to|a|an|the)\s+/, '').replace(/^(to|a|an|the)\s+/, '').trim();

const roles = leer();
const all = [];
for (const r of roles) for (const v of r.vocab) all.push({ k: norm(v.word), raw: v.word, n: r.n, rol: r.rol, what: v.what, here: v.here });
console.log(`entradas: ${all.length} · roles: ${roles.length} · formas distintas: ${new Set(all.map(x => x.k)).size}`);
console.log(`por rol: ${roles.map(r => r.n + r.rol + ':' + r.vocab.length).join(' ')}`);
console.log(`§11 pide 8-10 por rol → ${roles.every(r => r.vocab.length >= 8 && r.vocab.length <= 10) ? '16/16 dentro' : 'FALLA'}`);

console.log('\n=== A · SOLAPE A↔B DENTRO DEL MISMO ESCENARIO ===');
console.log('| esc | A | B | formas compartidas | % del presupuesto | glosa idéntica |');
console.log('|---|---|---|---|---|---|');
let totalComp = 0;
for (let n = 1; n <= 8; n++) {
  const A = all.filter(x => x.n === n && x.rol === 'A'), B = all.filter(x => x.n === n && x.rol === 'B');
  const comp = A.filter(a => B.some(b => b.k === a.k));
  const igual = comp.filter(a => B.find(b => b.k === a.k).what.trim() === a.what.trim());
  totalComp += comp.length * 2;
  console.log(`| ${n} | ${A.length} | ${B.length} | ${comp.length} · ${comp.map(x => '`' + x.k + '`').join(', ') || '—'} | ${(comp.length * 2 / (A.length + B.length) * 100).toFixed(0)} % | ${igual.length}/${comp.length} |`);
}
console.log(`  del presupuesto total del set (${all.length} entradas), ${totalComp} se gastan dos veces = ${(totalComp / all.length * 100).toFixed(1)} %`);

console.log('\n=== B · EXCLUSIVIDAD ENTRE ESCENARIOS ===');
const m = new Map();
for (const e of all) { if (!m.has(e.k)) m.set(e.k, []); m.get(e.k).push(e); }
const cross = [...m].filter(([, v]) => new Set(v.map(x => x.n)).size > 1);
console.log(`  formas en más de un escenario: ${cross.length} → ${cross.map(([k, v]) => `\`${k}\` (esc ${[...new Set(v.map(x => x.n))].join(',')})`).join(' · ')}`);
console.log(`  entradas afectadas: ${cross.reduce((a, x) => a + x[1].length, 0)}/${all.length} = ${(cross.reduce((a, x) => a + x[1].length, 0) / all.length * 100).toFixed(1)} %`);
for (let n = 1; n <= 8; n++) {
  const e = all.filter(x => x.n === n);
  const ex = e.filter(x => new Set(m.get(x.k).map(y => y.n)).size === 1);
  console.log(`  esc ${n}: ${ex.length}/${e.length} exclusivas = ${(ex.length / e.length * 100).toFixed(0)} %`);
}

console.log('\n=== C · ENTRADAS QUE NO SOSTIENE NADA MÁS DE LA FICHA ===');
console.log('  (la palabra no reaparece en ninguna otra parte de las dos fichas del escenario)');
let huerf = 0;
const porRol = new Map();
for (const e of all) {
  const cuerpo = ZONA[e.n].split('\n').filter(l => !(new RegExp('^\\|\\s*' + e.raw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\s*\\|').test(l.trim()))).join('\n');
  // se prueba CADA palabra de contenido, no solo la última: `to freeze a membership` se
  // sostiene con `freeze`, y buscando solo `membership` salía huérfana sin serlo.
  const raices = e.k.split(' ').filter(w => w.length > 3 && !/^(your|this|that|with|from|into|some|they|them|about)$/.test(w));
  const sostiene = (raices.length ? raices : [e.k]).some(raiz =>
    new RegExp('\\b' + raiz.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(s|es|d|ed|ing)?\\b', 'i').test(cuerpo));
  if (!sostiene) {
    huerf++; porRol.set(e.n + e.rol, (porRol.get(e.n + e.rol) || 0) + 1);
    console.log(`  ${e.n}${e.rol}  \`${e.raw}\`  — «${e.what.slice(0, 58)}»`);
  }
}
console.log(`  ${huerf}/${all.length} = ${(huerf / all.length * 100).toFixed(1)} % · por rol: ${[...porRol].sort((a, b) => b[1] - a[1]).map(([k, v]) => k + ':' + v).join(' ')}`);

console.log('\n=== D · CAMPO SEMÁNTICO, contado sobre las 157 entradas ===');
const CAMPOS = {
  'papeleo / contrato': /form|receipt|log|lease|note|paper|sign|file|warning|case|term|writing|referral|commitment|incident|proof|\bid\b|document|reservation|list|record/i,
  'dinero': /money|pay|cash|price|charge|refund|bill|credit|owe|fee|tip|bonus|cost|bounce|deposit|split the|chip/i,
  'tiempo / agenda': /appointment|shift|book|schedule|cut-off|business days|expire|renew|night|deadline|be off|in a row|opening|closing/i,
  'objeto de la escena': /gear|brake|cable|tire|mattress|couch|hammock|camping|truck|lock|bike|tooth|x-ray|key|wifi|pot|fire|cooler|container|lid/i,
  'persona / rol': /doorman|guard|manager|mechanic|cousin|brother-in-law|neighbor|member|patient|customer|staff|retention|collections|coach|supervisor|host/i,
  'comida / ocio / viaje': /serving|simmer|raw|leftovers|plate|lunch|river|trip|swim|walk back|ride|empty-handed|boil/i,
};
for (const [nom, re] of Object.entries(CAMPOS)) {
  const hit = all.filter(e => re.test(e.k + ' ' + e.what));
  console.log(`  ${nom.padEnd(24)} ${String(hit.length).padStart(3)}  ${(hit.length / all.length * 100).toFixed(1).padStart(5)} %  ${new Set(hit.map(x => x.n)).size}/8 esc`);
}
const sin = all.filter(e => !Object.values(CAMPOS).some(re => re.test(e.k + ' ' + e.what)));
console.log(`  sin clasificar           ${String(sin.length).padStart(3)}  ${(sin.length / all.length * 100).toFixed(1).padStart(5)} %`);
