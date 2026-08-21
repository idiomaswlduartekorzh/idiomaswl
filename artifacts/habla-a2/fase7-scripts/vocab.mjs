import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set.json','utf8'));
const norm=s=>s.toLowerCase()
  .replace(/\(.*?\)/g,' ').replace(/\*.*?\*/g,' ')
  .replace(/·/g,' / ').split('/')[0]
  .replace(/[^a-z\s'-]/g,' ').replace(/\s+/g,' ').trim()
  .replace(/^(to|a|an|the)\s+/,'').replace(/^(to|a|an|the)\s+/,'').trim();
const all=[];
for(const r of R) for(const v of r.vocab) all.push({k:norm(v.word), raw:v.word, n:r.n, rol:r.rol, what:v.what, here:v.here});
console.log('=== TOTAL entradas de vocabulario:', all.length, '· roles:', R.length);
const m=new Map();
for(const e of all){ if(!m.has(e.k)) m.set(e.k,[]); m.get(e.k).push(e); }
console.log('formas distintas (normalizadas):', m.size);
// repetidas entre ESCENARIOS distintos
const cross=[...m.entries()].map(([k,v])=>[k,v,new Set(v.map(x=>x.n))]).filter(x=>x[2].size>1).sort((a,b)=>b[2].size-a[2].size);
const inRole=[...m.entries()].filter(([k,v])=>v.length>1&&new Set(v.map(x=>x.n)).size===1);
console.log('\n=== REPETIDAS ENTRE ESCENARIOS DISTINTOS ===');
for(const [k,v,s] of cross) console.log(`  ${k.padEnd(26)} ${s.size} escenarios (${[...s].join(',')})  ${v.length} entradas`);
const entradasCross=cross.reduce((a,x)=>a+x[1].length,0);
console.log(`repetidas entre escenarios: ${cross.length} formas · ${entradasCross} entradas de ${all.length} = ${(entradasCross/all.length*100).toFixed(1)} %`);
console.log(`únicas de un solo escenario: ${all.length-entradasCross} = ${((all.length-entradasCross)/all.length*100).toFixed(1)} %`);
console.log('\n=== repetidas DENTRO del mismo escenario (los dos roles) ===');
for(const [k,v] of inRole) console.log(`  esc ${v[0].n}: ${k}  (${v.map(x=>x.rol).join('+')})  glosa idéntica: ${v[0].what.trim()===v[1].what.trim()?'SÍ':'no'}`);
console.log(`  → ${inRole.length} formas · ${inRole.reduce((a,x)=>a+x[1].length,0)} entradas = ${(inRole.reduce((a,x)=>a+x[1].length,0)/all.length*100).toFixed(1)} %`);
// glosas idénticas literales
console.log('\n=== GLOSAS ("what it is") IDÉNTICAS LITERALMENTE ===');
const g=new Map();
for(const e of all){const k=e.what.trim().toLowerCase(); if(!k)continue; if(!g.has(k))g.set(k,[]); g.get(k).push(e);}
let gr=0;
for(const [k,v] of g) if(v.length>1){gr+=v.length; console.log(`  x${v.length} [${v.map(x=>x.n+x.rol).join(' ')}] «${k.slice(0,80)}»`);}
console.log(`  glosas repetidas literalmente: ${gr}/${all.length} = ${(gr/all.length*100).toFixed(1)} %`);
// campo semantico
const CAMPOS={
 'trámite/papel/contrato':/claim|form|receipt|log|lease|note|paper|sign|file|warning|case|term|writing|referral|commitment|incident|folder|proof|id|document/i,
 'dinero/pago':/money|pay|cash|price|charge|refund|bill|credit|owe|chip in|fee|deal|tip|bonus|charge|cost|short|bounce/i,
 'tiempo/agenda':[/appointment|shift|opening|book|schedule|cut-off|business days|expire|renew|review date|night|day/i],
 'objeto/oficio de la escena':/gear|brake|cable|tire|mattress|couch|hammock|camping|truck|lock|bike|tooth|tongue|x-ray|key|warehouse|daycare|gigabyte|data|wifi/i,
 'persona/rol':/doorman|guard|manager|mechanic|nephew|cousin|brother-in-law|neighbor|member|patient|customer|staff|retention|collections/i,
};
console.log('\n=== CAMPO SEMÁNTICO (por escenario, sobre 8 escenarios) ===');
for(const [nombre,rx] of Object.entries(CAMPOS)){
  const re=Array.isArray(rx)?rx[0]:rx;
  const escs=new Set(all.filter(e=>re.test(e.k+' '+e.what)).map(e=>e.n));
  const c=all.filter(e=>re.test(e.k+' '+e.what)).length;
  console.log(`  ${nombre.padEnd(30)} ${c} entradas (${(c/all.length*100).toFixed(1)} %) · presente en ${escs.size}/8 escenarios`);
}
// genericidad: ¿la palabra vale en cualquier escenario?
const GEN=/^(deal|to sign|sign|lock|shift|tips|a form|form|proof|id|in writing|to cover|cover|to owe someone|to owe|to owe someone a favor|a charge|charge|a bill|bill|to pay someone back|to be short|to charge someone|appointment|opening|branch|to be out all day|to pick up|a spot|spot|to fit|business days|in cash|cash|to lend|to lend lent)$/;
console.log('\n=== ENTRADAS QUE VALDRÍAN EN CUALQUIER ESCENARIO (prueba de §11: ¿llega al cierre sin ella?) ===');
const gen=all.filter(e=>GEN.test(e.k));
console.log(`  ${gen.length}/${all.length} = ${(gen.length/all.length*100).toFixed(1)} %`);
const porRol=new Map();
for(const e of gen){const k=e.n+e.rol; porRol.set(k,(porRol.get(k)||0)+1);}
console.log('  por rol:',[...porRol.entries()].sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}:${v}`).join(' '));
// densidad por escenario: palabras propias
console.log('\n=== PALABRAS EXCLUSIVAS DE UN SOLO ESCENARIO, por escenario ===');
for(let n=1;n<=8;n++){
  const e=all.filter(x=>x.n===n);
  const ex=e.filter(x=>new Set(m.get(x.k).map(y=>y.n)).size===1);
  console.log(`  esc ${n}: ${ex.length}/${e.length} exclusivas = ${(ex.length/e.length*100).toFixed(0)} %`);
}
