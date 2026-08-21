import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set8.json','utf8'));
const clean=s=>s.replace(/\*\*/g,'').replace(/[*`]/g,'');
console.log('=== A · PLANTILLA COMPARTIDA (de 16 fichas) ===');
const PAT=[
 ['cita de registro «… N turns · N minutes»', /^>\s\*\*.+\*\*.*(start|Start).*(turns|turn).*(minutes|minute)/],
 ['«Your screen only. Don\'t show it. Don\'t read from it.»', /Your screen only\..*(Don't show it)/],
 ['«**Where you are** ·»', /^\*\*Where you are\*\*\s·/],
 ['«**You want** ·»', /^\*\*You want\*\*\s·/],
 ['«**You can\'t**»', /^\*\*You can'?t\*\*\s*$/],
 ['«**Only you know**»', /^\*\*Only you know\*\*/],
 ['«**If you walk away with nothing** ·»', /^\*\*If you walk away with nothing\*\*/],
];
for(const [nombre,rx] of PAT){
  const q=R.filter(r=>r.prosaLineas.some(l=>rx.test(l.trim())));
  console.log(`  ${String(q.length).padStart(2)}/16  ${(q.length/16*100).toFixed(0).padStart(3)} %  ${nombre}   [las que NO: ${R.filter(r=>!q.includes(r)).map(r=>r.n+r.rol).join(',')||'—'}]`);
}
console.log('\n=== A2 · las cinco secciones fijas, ¿con el mismo título? ===');
const CANON=['facts','vocab','tool','exp','ok'];
const nombres=new Map(CANON.map(c=>[c,new Map()]));
for(const r of R) for(const [c,t] of r.secs){ if(!nombres.has(c)) nombres.set(c,new Map()); const m=nombres.get(c); const key=t.replace(/\s+—.*$/,'').replace(/\s*·.*$/,'').trim(); m.set(key,(m.get(key)||0)+1); }
for(const [c,m] of nombres) console.log(`  ${c.padEnd(6)} ${[...m.entries()].map(([k,v])=>`«${k}» x${v}`).join(' · ')}`);
console.log('\n=== A3 · BLOQUES PROPIOS (encabezado en negrita que no está en la plantilla de 7) ===');
const PLANT=/^\*\*(Where you are|You want|You can'?t|Only you know|If you walk away with nothing)\*\*/;
let sin=0;
for(const r of R){
  const props=r.prosaLineas.map(l=>l.trim()).filter(l=>/^\*\*[A-Z][^*]{3,60}\*\*/.test(l)&&!PLANT.test(l)).map(l=>l.match(/^\*\*([^*]+)\*\*/)[1]);
  const extraSec=r.secs.filter(([c])=>c==='otro').map(([,t])=>t);
  const todo=[...props,...extraSec];
  if(!todo.length) sin++;
  console.log(` ${(r.n+r.rol).padEnd(4)} ${todo.length?todo.join(' · ').slice(0,150):'— NINGUNO'}`);
}
console.log(`  fichas sin ni un bloque propio: ${sin}/16 = ${(sin/16*100).toFixed(1)} %  (ronda anterior: 11/16 = 68,8 %)`);
console.log('\n=== B · ESTILO ===');
const FIN=/\b(is|are|was|were|am|be|been|do|does|did|has|have|had|can|can't|cannot|could|will|won't|would|should|must|need|needs|want|wants|say|says|said|go|goes|went|come|comes|know|knows|pay|pays|paid|ask|asks|asked|leave|leaves|left|take|takes|took|give|gives|gave|get|gets|got|put|puts|make|makes|made|tell|tells|told|work|works|worked|arrive|arrives|start|starts|open|opens|sign|signs|write|writes|wrote|use|uses|used|cost|costs|counts|lose|loses|lost|stay|stays|stop|stops|sleep|sleeps|hurts|hurt|call|calls|bring|brings|fits|feel|feels|owe|owes|sit|sits|check|checks|see|sees|saw|find|finds|found|move|moves|change|changes|thinks|think|talk|talks|happens|happened|cook|cooks|eat|eats|ate|ride|rides|rode|lit|goes)\b/i;
const rows=[];
for(const r of R){
  const txt=r.prosaLineas.map(clean).join('\n');
  const frases=txt.split(/(?<=[.!?])\s+|\n/).map(s=>s.trim()).filter(s=>/[A-Za-z]{2}/.test(s));
  const pal=r.prosa, frag=frases.filter(s=>!FIN.test(s)).length;
  const mid=(txt.match(/·/g)||[]).length;
  rows.push({id:`${r.n}${r.rol}`,frases:frases.length,ppf:+(pal/frases.length).toFixed(1),frag:+(frag/frases.length*100).toFixed(0),mid:+(mid/pal*100).toFixed(1)});
  r._txt=txt;
}
console.log('ficha  frases  pal/frase  %fragmento  ·/100pal');
for(const x of rows.slice().sort((a,b)=>a.frag-b.frag)) console.log(` ${x.id.padEnd(4)} ${String(x.frases).padStart(5)} ${String(x.ppf).padStart(9)} ${(x.frag+' %').padStart(11)} ${String(x.mid).padStart(9)}`);
const stat=k=>{const v=rows.map(x=>x[k]),m=v.reduce((a,b)=>a+b,0)/v.length,sd=Math.sqrt(v.reduce((a,b)=>a+(b-m)**2,0)/v.length);return `media ${m.toFixed(1)} · desv ${sd.toFixed(1)} · rango ${Math.min(...v)}–${Math.max(...v)} · CV ${(sd/m*100).toFixed(0)} %`;};
console.log('  pal/frase  :',stat('ppf'));
console.log('  %fragmento :',stat('frag'));
console.log('  ·/100 pal  :',stat('mid'));
console.log('\n=== C · LÉXICO ===');
const STOP=new Set('the a an and or but of to in on at for with is are was were be you your yours i my me it its they them their he she her his this that these those not no so if do don t can cant have has had one two three all out up down from as by more than what who when where which about into over after before now only own same other else nothing something anything somebody nobody everybody here there then also just very too much many'.split(/\s+/));
const toks=r=>r._txt.toLowerCase().replace(/[^a-z\s']/g,' ').split(/\s+/).filter(w=>w.length>2&&!STOP.has(w));
const sets=R.map(r=>new Set(toks(r)));
console.log('ficha  tipos  exclusivos  compartidos con ≥8');
for(let i=0;i<R.length;i++){const s=sets[i];let ex=0,co=0;for(const w of s){const n=sets.filter(o=>o.has(w)).length;if(n===1)ex++;if(n>=8)co++;}
 console.log(` ${(R[i].n+R[i].rol).padEnd(4)} ${String(s.size).padStart(5)} ${(ex+' ('+(ex/s.size*100).toFixed(0)+' %)').padStart(12)} ${(co+' ('+(co/s.size*100).toFixed(0)+' %)').padStart(20)}`);}
let J=[];for(let i=0;i<16;i++)for(let j=i+1;j<16;j++){if(R[i].n===R[j].n)continue;const a=sets[i],b=sets[j],inter=[...a].filter(w=>b.has(w)).length;J.push(inter/(a.size+b.size-inter));}
console.log('  Jaccard medio entre fichas de escenarios distintos:',(J.reduce((a,b)=>a+b,0)/J.length*100).toFixed(1),'%');
let J2=[];for(let i=0;i<16;i+=2){const a=sets[i],b=sets[i+1],inter=[...a].filter(w=>b.has(w)).length;J2.push(inter/(a.size+b.size-inter));}
console.log('  Jaccard medio entre los dos roles del mismo escenario:',(J2.reduce((a,b)=>a+b,0)/J2.length*100).toFixed(1),'%');
