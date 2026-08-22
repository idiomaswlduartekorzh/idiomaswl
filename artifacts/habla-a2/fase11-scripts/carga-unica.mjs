// PUERTA 5 del conjunto — UN SOLO CONTADOR para los ocho escenarios.
//
// Por qué existe: fase 11 midió la carga con OCHO contadores distintos (cinco .mjs y tres .py).
// Los .mjs cuentan EN BRUTO (español, muletillas, cifras y lo leído en voz alta incluidos);
// los .py de los escenarios 6, 7 y 8 descartan el español entre «…», las muletillas
// (uh/ehh/eh/mmm/em) y todo token que no empiece por letra latina — o sea, las cifras.
// §6 puerta 5 exige «un solo contador, y declarado». Este es el criterio BRUTO, para los ocho.
//
// Se mide SOLO sobre parejas de perfil parejo: sección 1 (SÓLIDO+SÓLIDO) y 3 (FLOJO+FLOJO).
import { readFileSync } from 'node:fs';
const DIR='/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const CFG={
 1:{f:'fase11-simulacion-1.md', head:/^## (\d) · /, turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
 2:{f:'fase11-simulacion-2.md', head:/^## (\d) · /, turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
 3:{f:'fase11-simulacion-3.md', head:/^# (\d) · /,  turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
 4:{f:'fase11-simulacion-4.md', head:/^## (\d) · /, turn:/^\*\*(FAB|AST)-(\d+)\*\*\s*[—-]?\s*(.*)$/, map:{FAB:'A',AST:'B'}},
 5:{f:'fase11-simulacion-5.md', head:/^## (\d) · /, turn:/^\*\*(CAM|AMP)-(\d+)\*\*\s*[—-]?\s*(.*)$/, map:{CAM:'A',AMP:'B'}},
 6:{f:'fase11-simulacion-6.md', head:/^## (\d) · /, turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
 7:{f:'fase11-simulacion-7.md', head:/^## (\d) · /, turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
 8:{f:'fase11-simulacion-8.md', head:/^## (\d) · /, turn:/^\*\*([AB])(\d+)\*\*\s*[—-]?\s*(.*)$/},
};
// BRUTO: fuera solo lo que NO sale por la boca — marcas de turno, acotaciones y cronómetro.
function pal(t){
  const cut=[' — **',' — *(',' ⚠ '].map(x=>t.indexOf(x)).filter(i=>i>=0);
  if(cut.length) t=t.slice(0,Math.min(...cut));
  t=t.replace(/`\[[^\]]*\]`/g,' ').replace(/\[[^\]]*\]/g,' ').replace(/\*\([^)]*\)\*/g,' ').replace(/\([^)]*\)/g,' ');
  t=t.replace(/[*_`»«"><]/g,' ');
  return t.split(/[\s—–·]+/).filter(w=>/[\p{L}\p{N}]/u.test(w)).length;
}
const R=[];
for(const e of Object.keys(CFG)){
  const c=CFG[e]; const L=readFileSync(DIR+c.f,'utf8').split('\n');
  let sec=null; const S={};
  for(const ln of L){
    if(/^#{1,3} /.test(ln)){ const h=ln.match(c.head); sec=h?h[1]:null; if(sec&&!S[sec])S[sec]={A:0,B:0,tA:0,tB:0}; continue; }
    if(!sec) continue;
    const m=ln.match(c.turn); if(!m) continue;
    const rol=c.map?c.map[m[1]]:m[1];
    S[sec][rol]+=pal(m[3]); S[sec]['t'+rol]+=1;
  }
  for(const k of ['1','3']){ const s=S[k]; if(!s) continue;
    const tot=s.A+s.B, menor=Math.min(s.A,s.B)/tot*100;
    R.push({e:+e, par:k==='1'?'SÓLIDO+SÓLIDO':'FLOJO+FLOJO', A:s.A,B:s.B,tA:s.tA,tB:s.tB, menor}); }
}
console.log('| esc | pareja | turnos A/B | palabras A | palabras B | reparto A/B | lado menor | ≥40 % |');
console.log('|---|---|---|---|---|---|---|---|');
for(const r of R) console.log(`| ${r.e} | ${r.par} | ${r.tA}/${r.tB} | ${r.A} | ${r.B} | ${(r.A/(r.A+r.B)*100).toFixed(0)}/${(r.B/(r.A+r.B)*100).toFixed(0)} | **${r.menor.toFixed(1)} %** | ${r.menor>=40?'sí':'**NO**'} |`);
const pasa=R.filter(r=>r.menor>=40).length;
console.log(`\nparejas de perfil parejo: ${R.length} · pasan la puerta 5: ${pasa} = ${(pasa/R.length*100).toFixed(0)} % · peor caso ${Math.min(...R.map(r=>r.menor)).toFixed(1)} %`);
console.log('fallan: '+R.filter(r=>r.menor<40).map(r=>`esc ${r.e} ${r.par} (${r.menor.toFixed(1)} %)`).join(' · '));
console.log('\n--- por tipo de pareja ---');
for(const p of ['SÓLIDO+SÓLIDO','FLOJO+FLOJO']){const l=R.filter(r=>r.par===p);
 console.log(`  ${p.padEnd(14)} pasan ${l.filter(r=>r.menor>=40).length}/${l.length} · media del lado menor ${(l.reduce((a,b)=>a+b.menor,0)/l.length).toFixed(1)} %`);}
