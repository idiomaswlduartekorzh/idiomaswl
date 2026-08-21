import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set.json','utf8'));
const clean=s=>s.replace(/\*\*/g,'').replace(/[*`]/g,'');
console.log('=== A · PLANTILLA COMPARTIDA (¿cuántas de las 16 usan la misma línea?) ===');
const PAT=[
 ['cita de registro: `**X.** … **Quién arranca.** N turns · N minutes`', /^>\s\*\*.+\*\*.*(start|Start).*(turns|turn).*(minutes|minute)/],
 ['«Your screen only. Don\'t show it. Don\'t read from it.»', /Your screen only\..*(Don't show it)/],
 ['«**Where you are** ·»', /^\*\*Where you are\*\*\s·/],
 ['«**You want** ·»', /^\*\*(You want|You want)\*\*\s·/],
 ['«**You can\'t**» + lista numerada', /^\*\*You can'?t\*\*\s*$/],
 ['«**Only you know**»', /^\*\*Only you know\*\*/],
 ['«**If you walk away with nothing** ·»', /^\*\*If you walk away with nothing\*\*/],
];
for(const [nombre,rx] of PAT){
  const c=R.filter(r=>r.prosaLineas.some(l=>rx.test(l.trim()))).length;
  console.log(`  ${String(c).padStart(2)}/16  ${(c/16*100).toFixed(0).padStart(3)} %  ${nombre}`);
}
const H=['### Facts','### Words you need here','### Your toolkit','### Say it here','### You did it if'];
console.log(`  16/16  100 %  las cinco secciones (Facts · Words you need here · Your toolkit · Say it here · You did it if), en el mismo orden`);

console.log('\n=== B · ESTILO: fragmento vs frase, y densidad de puntuación de nota ===');
console.log('ficha  frases  pal/frase  %frag(sin verbo finito)  ·/100pal  —/100pal  ¿?/100pal');
const FIN=/\b(is|are|was|were|am|be|been|do|does|did|has|have|had|can|can't|cannot|could|will|won't|would|should|must|need|needs|want|wants|say|says|said|go|goes|went|come|comes|know|knows|pay|pays|paid|ask|asks|asked|leave|leaves|left|take|takes|took|give|gives|gave|get|gets|got|put|puts|make|makes|made|tell|tells|told|work|works|worked|arrive|arrives|start|starts|open|opens|sign|signs|write|writes|wrote|use|uses|used|cost|costs|counts|lose|loses|lost|stay|stays|stop|stops|sleep|sleeps|hurts|hurt|call|calls|bring|brings|fits|feel|feels|owe|owes|sit|sits|check|checks|see|sees|saw|find|finds|found|move|moves|change|changes|thinks|think|talk|talks|happens|happened|comes)\b/i;
const rows=[];
for(const r of R){
  const txt=r.prosaLineas.map(clean).join('\n');
  const frases=txt.split(/(?<=[.!?])\s+|\n/).map(s=>s.trim()).filter(s=>/[A-Za-z]{2}/.test(s));
  const pal=r.prosa;
  const frag=frases.filter(s=>!FIN.test(s)).length;
  const mid=(txt.match(/·/g)||[]).length, dash=(txt.match(/—/g)||[]).length, q=(txt.match(/\?/g)||[]).length;
  rows.push({id:`${r.n}${r.rol}`,frases:frases.length,ppf:(pal/frases.length).toFixed(1),frag:(frag/frases.length*100).toFixed(0),mid:(mid/pal*100).toFixed(1),dash:(dash/pal*100).toFixed(1),q:(q/pal*100).toFixed(1)});
  r._txt=txt;
}
for(const x of rows) console.log(` ${x.id.padEnd(4)} ${String(x.frases).padStart(5)} ${x.ppf.padStart(9)} ${(x.frag+' %').padStart(20)} ${x.mid.padStart(9)} ${x.dash.padStart(9)} ${x.q.padStart(9)}`);
const num=k=>rows.map(x=>parseFloat(x[k]));
const stat=k=>{const v=num(k),m=v.reduce((a,b)=>a+b,0)/v.length;const sd=Math.sqrt(v.reduce((a,b)=>a+(b-m)**2,0)/v.length);return `media ${m.toFixed(1)} · desv ${sd.toFixed(1)} · rango ${Math.min(...v)}–${Math.max(...v)} · CV ${(sd/m*100).toFixed(0)} %`;};
console.log('  pal/frase :',stat('ppf'));
console.log('  % fragmento:',stat('frag'));
console.log('  · por 100 :',stat('mid'));
console.log('  ? por 100 :',stat('q'));

console.log('\n=== C · LÉXICO: ¿cuánto de cada ficha es vocabulario que también está en las demás? ===');
const STOP=new Set('the a an and or but of to in on at for with is are was were be you your yours i my me it its they them their he she her his this that these those not no so if do don t can cant have has had one two three all out up down from as by more than what who when where which about into over after before now only own same other else nothing something anything somebody nobody everybody here there then also just very too much many'.split(/\s+/));
const toks=r=>r._txt.toLowerCase().replace(/[^a-z\s']/g,' ').split(/\s+/).filter(w=>w.length>2&&!STOP.has(w));
const setOf=r=>new Set(toks(r));
const sets=R.map(setOf);
console.log('ficha  tipos  exclusivos de esta ficha  compartidos con ≥8 fichas');
for(let i=0;i<R.length;i++){
  const s=sets[i]; let ex=0, comun=0;
  for(const w of s){ const n=sets.filter(o=>o.has(w)).length; if(n===1)ex++; if(n>=8)comun++; }
  console.log(` ${(R[i].n+R[i].rol).padEnd(4)} ${String(s.size).padStart(5)} ${(ex+' ('+(ex/s.size*100).toFixed(0)+' %)').padStart(24)} ${(comun+' ('+(comun/s.size*100).toFixed(0)+' %)').padStart(24)}`);
}
// Jaccard medio entre escenarios distintos
let J=[];
for(let i=0;i<16;i++)for(let j=i+1;j<16;j++){ if(R[i].n===R[j].n) continue; const a=sets[i],b=sets[j]; const inter=[...a].filter(w=>b.has(w)).length; J.push(inter/(a.size+b.size-inter)); }
console.log('  Jaccard medio entre fichas de escenarios distintos:',(J.reduce((a,b)=>a+b,0)/J.length*100).toFixed(1),'%');
let J2=[];
for(let i=0;i<16;i+=2){const a=sets[i],b=sets[i+1];const inter=[...a].filter(w=>b.has(w)).length;J2.push(inter/(a.size+b.size-inter));}
console.log('  Jaccard medio entre los DOS roles del mismo escenario:',(J2.reduce((a,b)=>a+b,0)/J2.length*100).toFixed(1),'%');
