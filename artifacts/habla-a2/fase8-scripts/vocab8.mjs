import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set8.json','utf8'));
const norm=s=>s.toLowerCase().replace(/\(.*?\)/g,' ').replace(/\*.*?\*/g,' ').replace(/·/g,' / ').split('/')[0]
  .replace(/[^a-z\s'-]/g,' ').replace(/\s+/g,' ').trim().replace(/^(to|a|an|the)\s+/,'').replace(/^(to|a|an|the)\s+/,'').trim();
const all=[];
for(const r of R) for(const v of r.vocab) all.push({k:norm(v.word), raw:v.word, n:r.n, rol:r.rol, what:v.what, here:v.here});
console.log('=== TOTAL entradas:', all.length, '· roles:', R.length, '· por rol:', R.map(r=>r.n+r.rol+':'+r.vocab.length).join(' '));
const m=new Map(); for(const e of all){ if(!m.has(e.k)) m.set(e.k,[]); m.get(e.k).push(e); }
console.log('formas distintas (normalizadas):', m.size);
const cross=[...m.entries()].map(([k,v])=>[k,v,new Set(v.map(x=>x.n))]).filter(x=>x[2].size>1).sort((a,b)=>b[2].size-a[2].size);
console.log('\n=== CRUZAN ESCENARIOS ===');
for(const [k,v,s] of cross) console.log(`  ${k.padEnd(26)} ${s.size} escenarios (${[...s].join(',')})  ${v.length} entradas`);
const ec=cross.reduce((a,x)=>a+x[1].length,0);
console.log(`  cruzan: ${cross.length} formas · ${ec}/${all.length} entradas = ${(ec/all.length*100).toFixed(1)} % · exclusivas de un escenario: ${((all.length-ec)/all.length*100).toFixed(1)} %`);
console.log('\n=== exclusivas por escenario ===');
for(let n=1;n<=8;n++){const e=all.filter(x=>x.n===n);const ex=e.filter(x=>new Set(m.get(x.k).map(y=>y.n)).size===1);console.log(`  esc ${n}: ${ex.length}/${e.length} = ${(ex.length/e.length*100).toFixed(0)} %`);}
// campos semánticos: los del informe anterior + los cuatro que faltaban
const CAMPOS={
 'trámite / papel / contrato':/claim|form|receipt|log\b|lease|note\b|paper|sign|file|warning|case\b|term|writing|referral|commitment|incident|folder|proof|\bid\b|document|contract|cut-off|record/i,
 'dinero / pago':/money|pay|cash|price|charge|refund|bill|credit|owe|chip in|fee\b|deal|tip|bonus|cost|short|bounce|deposit|discount|installment/i,
 'tiempo / agenda':/appointment|shift|opening|book|schedule|cut-off|business days|expire|renew|review date|overtime|on time|late/i,
 'objeto / oficio de la escena':/gear|brake|cable|tire|mattress|couch|hammock|camping|truck|lock|bike|tooth|tongue|x-ray|key|warehouse|daycare|wifi|pallet|forklift|seat|helmet/i,
 'persona / cargo':/doorman|guard|manager|mechanic|nephew|cousin|brother-in-law|neighbor|member|patient|customer|staff|retention|collections|supervisor|coach/i,
 '· COMIDA / COCINA':/cook|pot|fire|firewood|broth|simmer|serving|raw|cassava|plantain|chicken|rice|fridge|cooler|stew|boil|leftover|plate|meal|lunch|feed|hungry|eat|dish|container/i,
 '· TRANSPORTE (no papeleo)':/bike|motorcycle|ride|helmet|gas\b|road|bus\b|fit\b|carry|strap|rack|trip|river|dirt road|traffic|hill/i,
 '· CUERPO / SALUD no dental':/tired|hungry|thirsty|sunburn|heat|sweat|hurt|ache|dizzy|rest|sleep|hot|cold/i,
 '· OCIO / TIEMPO LIBRE':/river|swim|picnic|party|weekend|hang out|game|football|music|beach|walk/i,
};
console.log('\n=== CAMPO SEMÁNTICO (una entrada puede caer en dos) ===');
for(const [nombre,re] of Object.entries(CAMPOS)){
  const hit=all.filter(e=>re.test(e.k+' '+e.what+' '+e.here));
  const escs=new Set(hit.map(e=>e.n));
  console.log(`  ${nombre.padEnd(30)} ${String(hit.length).padStart(3)} entradas (${(hit.length/all.length*100).toFixed(1).padStart(4)} %) · ${escs.size}/8 escenarios (${[...escs].sort().join(',')})`);
}
const papel=new Set(all.filter(e=>/claim|form|receipt|log\b|lease|note\b|paper|sign|file|warning|case\b|term|writing|referral|commitment|incident|folder|proof|\bid\b|document|contract|cut-off|record/i.test(e.k+' '+e.what)).map(e=>e.k+e.n+e.rol));
const plata=new Set(all.filter(e=>/money|pay|cash|price|charge|refund|bill|credit|owe|chip in|fee\b|deal|tip|bonus|cost|short|bounce|deposit|discount|installment/i.test(e.k+' '+e.what)).map(e=>e.k+e.n+e.rol));
const union=new Set([...papel,...plata]);
console.log(`\n  PAPEL ∪ DINERO (sin doble conteo): ${union.size}/${all.length} = ${(union.size/all.length*100).toFixed(1)} %`);
// bloque genérico
const GEN=/^(deal|sign|lock|shift|tips|form|proof|id|in writing|cover|owe someone|owe|owe someone a favor|charge|bill|pay someone back|be short|charge someone|appointment|opening|branch|be out all day|pick up|spot|fit|business days|in cash|cash|lend|swap|split a shift|be off|cover a shift|note|file|case|record|receipt|paper|term|paperwork|sign off)$/;
const gen=all.filter(e=>GEN.test(e.k));
console.log(`\n=== ENTRADAS QUE VALDRÍAN EN CUALQUIER ESCENARIO === ${gen.length}/${all.length} = ${(gen.length/all.length*100).toFixed(1)} %`);
const pr=new Map(); for(const e of gen){const k=e.n+e.rol; pr.set(k,(pr.get(k)||0)+1);} 
console.log('  por rol:',[...pr.entries()].sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}:${v}`).join(' '));
console.log('  formas:',[...new Set(gen.map(e=>e.k))].sort().join(' · '));
// glosas idénticas
const g=new Map(); for(const e of all){const k=e.what.trim().toLowerCase(); if(!k)continue; if(!g.has(k))g.set(k,[]); g.get(k).push(e);}
let gr=0, gx=0;
console.log('\n=== GLOSAS IDÉNTICAS ===');
for(const [k,v] of g) if(v.length>1){gr+=v.length; const escs=new Set(v.map(x=>x.n)); if(escs.size>1){gx+=v.length; console.log(`  CRUZA ESCENARIO x${v.length} [${v.map(x=>x.n+x.rol).join(' ')}] «${k.slice(0,70)}»`);}}
console.log(`  repetidas: ${gr}/${all.length} = ${(gr/all.length*100).toFixed(1)} % · de ellas, cruzando escenario: ${gx}`);
// columna here calcable (§11: ni pronombre + verbo conjugado, ni comillas, ni ejemplo)
const CALC=/^(you|i|he|she|it|they|we)\b\s+\w+|["'`«]|\bsay\b.*[:,]/i;
console.log('\n=== columna `here` sospechosa de calcable ===');
const sos=all.filter(e=>CALC.test(e.here.replace(/^\*+/,'').trim()));
for(const e of sos) console.log(`  ${e.n}${e.rol} | ${e.raw} → ${e.here.slice(0,90)}`);
console.log(`  ${sos.length}/${all.length} = ${(sos.length/all.length*100).toFixed(1)} %`);
