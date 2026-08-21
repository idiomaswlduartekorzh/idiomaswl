// Extrae las 16 fichas de la composición NUEVA (7 arreglados + el 4 nuevo).
// El 4 nuevo renombra sus secciones: el mapeo va por función, no por título literal.
import { readFileSync, writeFileSync } from 'node:fs';
const DIR='/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
export const F=[
 [1,'fase7-fichas-1-the-bike-in-the-parking-lot.md'],
 [2,'fase7-fichas-2-no-appointment-until-thursday.md'],
 [3,'fase7-modelo-ficha-en.md'],
 [4,'fase8-fichas-4nuevo.md'],
 [5,'fase7-fichas-5-late-again-on-monday.md'],
 [6,'fase7-fichas-6-the-cousin-on-the-sofa.md'],
 [7,'fase7-fichas-7-two-more-people-for-the-trip.md'],
 [8,'fase7-fichas-8-cancel-the-gym-i-am-leaving.md'],
];
const seccion=(h)=>{
  const t=h.toLowerCase();
  if(/words you need|words for the/.test(t)) return 'vocab';
  if(/say it here|out loud/.test(t)) return 'exp';
  if(/^###\s*facts|numbers you'?re/.test(t)) return 'facts';
  if(/toolkit/.test(t)) return 'tool';
  if(/you did it if|happened if|rode off right if/.test(t)) return 'ok';
  return 'otro';
};
const out=[];
for(const [n,f] of F){
  const lines=readFileSync(DIR+f,'utf8').split('\n');
  let role=null, sec=null;
  for(const L of lines){
    if(/^## ROLE /i.test(L)){ role={n, rol:/ROLE A/i.test(L)?'A':'B', titulo:L.replace(/^##\s*/,''), archivo:f, vocab:[], exp:[], secs:[], prosa:0, prosaLineas:[]}; out.push(role); sec=null; continue; }
    if(/^## /.test(L)){ role=null; continue; }
    if(!role) continue;
    if(/^###\s/.test(L)){ sec=seccion(L); role.secs.push([sec, L.replace(/^###\s*/,'')]); continue; }
    if(/^\s*\|/.test(L)){
      const c=L.split('|').map(s=>s.trim()).filter((s,i,a)=>i>0&&i<a.length-1);
      if(c.every(x=>/^:?-+:?$/.test(x))) continue;
      if(sec==='vocab'&&c.length>=2&&c[0]&&!/^word$/i.test(c[0])) role.vocab.push({word:c[0],what:c[1]||'',here:c[2]||''});
      if(sec==='exp'&&c.length>=2&&c[0]&&!/^(function|job)$/i.test(c[0])) role.exp.push({fn:c[0],form:c[1]||'',does:c[2]||''});
      continue;
    }
    if(/^#/.test(L)) continue;
    role.prosaLineas.push(L);
  }
}
const NO=/[*·→—=`>|]/g;
const cnt=s=>s.replace(NO,' ').split(/\s+/).filter(t=>/[A-Za-zÀ-ÿ0-9]/.test(t)).length;
for(const r of out) r.prosa=r.prosaLineas.reduce((a,l)=>a+cnt(l),0);
writeFileSync('/tmp/habla-set8.json',JSON.stringify(out,null,1));
console.log('roles:',out.length);
console.log(out.map(r=>`${r.n}${r.rol}  prosa ${String(r.prosa).padStart(4)}  vocab ${String(r.vocab.length).padStart(2)}  exp ${String(r.exp.length).padStart(2)}`).join('\n'));
