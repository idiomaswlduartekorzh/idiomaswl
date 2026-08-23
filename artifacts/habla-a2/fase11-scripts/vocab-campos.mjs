// CAMPO SEMÁNTICO del vocabulario del set — clasificación EXCLUSIVA (una entrada, un campo).
// 23 ago 2026 · MEDIO 8: reetiquetadas las filas 2A, 2B, 6A y 6B tras separar el vocabulario de
// las dos pantallas de los escenarios 2 y 6 (6A pasa de 9 a 10 entradas).
// La medición anterior usaba regex solapadas: una misma entrada caía en «papel» y en «dinero»
// a la vez, y por eso el 41 % no se podía interpretar. Aquí cada entrada tiene un campo y solo uno.
import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set11.json','utf8'));
const C={
'1A':['OBJETO','OBJETO','DINERO','OBJETO','DINERO','OBJETO','PAPEL','PERSONA','DINERO','OBJETO'],
'1B':['OBJETO','PERSONA','DINERO','DINERO','OBJETO','DINERO','TRANSPORTE','OBJETO','TRANSPORTE','OBJETO'],
'2A':['TIEMPO','TIEMPO','PAPEL','PAPEL','TIEMPO','PAPEL','SALUD','TIEMPO','TIEMPO','SALUD'],
'2B':['TRABAJO','SALUD','SALUD','TIEMPO','PAPEL','SALUD','TIEMPO','DINERO','SALUD','TRABAJO'],
'3A':['DINERO','TRABAJO','TRABAJO','TRABAJO','TRABAJO','TRABAJO','TRABAJO','SOCIAL','TRABAJO','TRABAJO'],
'3B':['TRABAJO','TRABAJO','TRABAJO','TRABAJO','TIEMPO','TRABAJO','DINERO','TRABAJO','TRABAJO','TRABAJO'],
'4A':['OCIO','OCIO','OCIO','OCIO','OCIO','OCIO','OCIO','OCIO','OCIO','OCIO'],
'4B':['OCIO','OCIO','OCIO','SOCIAL','OCIO','OCIO','OBJETO','OCIO','TRANSPORTE','SOCIAL'],
'5A':['TRABAJO','PAPEL','PAPEL','SOCIAL','PAPEL','TRANSPORTE','PAPEL','SOCIAL','TRABAJO','PAPEL'],
'5B':['PAPEL','PAPEL','PAPEL','PAPEL','PAPEL','TRABAJO','TRABAJO','PAPEL','PAPEL'],
'6A':['PERSONA','CASA','TRANSPORTE','PERSONA','SOCIAL','CASA','PAPEL','TIEMPO','SOCIAL','CASA'],
'6B':['CASA','TRABAJO','TRABAJO','CASA','PAPEL','OBJETO','TIEMPO','OBJETO','PAPEL','TRANSPORTE'],
'7A':['OCIO','PERSONA','PAPEL','PERSONA','DINERO','DINERO','DINERO','PAPEL','OCIO'],
'7B':['OCIO','TRABAJO','OCIO','PAPEL','TIEMPO','PERSONA','DINERO','TRANSPORTE','DINERO','DINERO'],
'8A':['DINERO','TRANSPORTE','TIEMPO','PAPEL','PAPEL','DINERO','DINERO','PAPEL','PAPEL','PAPEL'],
'8B':['PAPEL','TIEMPO','DINERO','PAPEL','DINERO','PAPEL','PAPEL','PAPEL','PAPEL','PAPEL'],
};
const all=[];
for(const r of R){const k=r.n+r.rol, c=C[k];
 if(c.length!==r.vocab.length) throw new Error(`${k}: ${c.length} etiquetas para ${r.vocab.length} entradas`);
 r.vocab.forEach((v,i)=>all.push({n:r.n,rol:r.rol,w:v.word,c:c[i]}));}
const T=all.length;
console.log(`entradas de vocabulario del set: ${T}  (16 roles)`);
const cnt=new Map(), esc=new Map();
for(const e of all){cnt.set(e.c,(cnt.get(e.c)||0)+1); if(!esc.has(e.c))esc.set(e.c,new Set()); esc.get(e.c).add(e.n);}
console.log('\ncampo             entradas   %     escenarios');
for(const [c,n] of [...cnt].sort((a,b)=>b[1]-a[1]))
  console.log(`  ${c.padEnd(14)} ${String(n).padStart(6)}  ${(n/T*100).toFixed(1).padStart(5)} %  ${esc.get(c).size}/8  (${[...esc.get(c)].sort().join(',')})`);
const papel=cnt.get('PAPEL')+cnt.get('DINERO');
console.log(`\nPAPEL + DINERO juntos: ${papel}/${T} = ${(papel/T*100).toFixed(1)} %   ← la cifra que la medición anterior dio en 41 %`);
console.log(`OCIO / COMIDA / VIAJE: ${cnt.get('OCIO')||0}/${T} = ${((cnt.get('OCIO')||0)/T*100).toFixed(1)} %   ← antes era CERO`);
console.log(`  y de esas ${cnt.get('OCIO')}, ${all.filter(e=>e.c==='OCIO'&&e.n===4).length} son del escenario 4 (el nuevo) y ${all.filter(e=>e.c==='OCIO'&&e.n!==4).length} del 7`);
console.log('\n=== por escenario: campo dominante ===');
for(let n=1;n<=8;n++){const e=all.filter(x=>x.n===n), m=new Map();
 for(const x of e)m.set(x.c,(m.get(x.c)||0)+1);
 const o=[...m].sort((a,b)=>b[1]-a[1]);
 console.log(`  esc ${n} (${e.length}): ${o.map(([c,v])=>`${c} ${v}`).join(' · ')}`);}
console.log('\n=== SIN el escenario 4, ¿cómo queda el set? ===');
const sin4=all.filter(e=>e.n!==4), m4=new Map();
for(const x of sin4)m4.set(x.c,(m4.get(x.c)||0)+1);
console.log([...m4].sort((a,b)=>b[1]-a[1]).map(([c,v])=>`${c} ${(v/sin4.length*100).toFixed(1)} %`).join(' · '));
