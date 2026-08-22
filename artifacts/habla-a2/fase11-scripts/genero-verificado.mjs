// Verificación del reparto de género SOBRE LAS FICHAS, no sobre el informe de fase 9.
//
// Diferencia con fase9-scripts/reparto-genero.mjs: aquí se lee SOLO la parte jugable del
// archivo —de `## ROLE A` hasta la primera cabecera `## ` posterior a «After — both screens»—.
// El script de fase 9 lee el archivo entero, changelog incluido, y por eso resuelve el dueño
// del carro del escenario 4 sobre una línea de la adenda que todavía dice «Marcela's car».
import { readFileSync } from 'node:fs';
const DIR='/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/';
const F={1:'fase7-fichas-1-the-bike-in-the-parking-lot.md',2:'fase7-fichas-2-no-appointment-until-thursday.md',3:'fase7-modelo-ficha-en.md',4:'fase8-fichas-4nuevo.md',5:'fase7-fichas-5-late-again-on-monday.md',6:'fase7-fichas-6-the-cousin-on-the-sofa.md',7:'fase7-fichas-7-two-more-people-for-the-trip.md',8:'fase7-fichas-8-cancel-the-gym-i-am-leaving.md'};
const GEN={'Fabián':'H','Duván':'H','Camilo':'H','Kevin':'H','Iván':'H','Nelson':'H','Elkin':'H','Hernán':'H','Sebastián':'H','Édgar':'H','Édison':'H','Wilmer':'H','Matías':'H','Mauricio':'H','doña Amparo':'M','Valentina':'M','Tatiana':'M','Milena':'M','Astrid':'M','Alba':'M','Andrea':'M','Marcela':'M','doña Nubia':'M','Nayibe':'M','Katherine':'M','Yurany':'M','Dr. Restrepo':'M','Dani':'N','Cris':'N'};
const gen=n=>GEN[n]??'?';
function jugable(txt){
  const iA=txt.indexOf('\n## ROLE A');
  const iAfter=txt.search(/^## After — both screens/m);
  let fin=txt.length;
  if(iAfter>=0){ const m=/^## /gm; m.lastIndex=iAfter+10; const nx=m.exec(txt); if(nx) fin=nx.index; }
  return txt.slice(iA<0?0:iA, fin);
}
console.log('| esc | zona jugable (car.) | archivo entero (car.) | changelog descartado |');
console.log('|---|---|---|---|');
const J={},T={};
for(const e of Object.keys(F)){const t=readFileSync(DIR+F[e],'utf8');T[e]=t;J[e]=jugable(t);
 console.log(`| ${e} | ${J[e].length} | ${t.length} | ${(100-J[e].length/t.length*100).toFixed(0)} % |`);}

console.log('\n=== NOMBRES DE LOS 16 ROLES, leídos de la banda del diseñador ===');
const nom=(e,r)=>{const m=T[e].match(new RegExp('\\*\\*'+r+' = ([^*]+)\\*\\*'));return m?m[1].trim():'— sin nombre —';};
for(const e of Object.keys(F)) console.log(`  esc ${e}: A = ${nom(e,'A').padEnd(14)} (${gen(nom(e,'A'))})   B = ${nom(e,'B').padEnd(14)} (${gen(nom(e,'B'))})`);

console.log('\n=== APARICIONES DE CADA NOMBRE EN LA ZONA JUGABLE (0 = el nombre solo vive en el changelog) ===');
for(const e of Object.keys(F)){
  const hits=[...new Set([...J[e].matchAll(/\b(Fabián|Duván|Camilo|Kevin|Iván|Nelson|Elkin|Hernán|Sebastián|Édgar|Édison|Wilmer|Matías|Mauricio|Amparo|Valentina|Tatiana|Milena|Astrid|Alba|Andrea|Marcela|Nubia|Nayibe|Katherine|Yurany|Restrepo|Dani|Cris)\b/g)].map(m=>m[1]))];
  const c=hits.map(h=>`${h}(${gen(h)||gen('doña '+h)||'?'}):${(J[e].match(new RegExp('\\b'+h+'\\b','g'))||[]).length}`);
  console.log(`  esc ${e}: ${c.join('  ')}`);
}

console.log('\n=== ESCENARIO 4 · quién tiene la MOTO (recurso) y quién el CARRO (estorbo) ===');
for(const [et,rx] of [['moto 11:40',/(\S+)'s bike \| out 11:40/],['moto (2ª mención)',/(\S+)'s bike by the gate/],['carro que no vuelve',/(\S+)'s car, finally out/],['dato oculto del carro',/read (\S+)'s message at eleven eleven/]]){
  const m=J[4].match(rx); console.log(`  ${et.padEnd(22)} → ${m?m[1]+' ('+gen(m[1])+')':'NO ENCONTRADO en la zona jugable'}`);
}
const enChangelog=T[4].slice(J[4].length).match(/Marcela's car/g);
console.log(`  «Marcela's car» en la ZONA JUGABLE: ${(J[4].match(/Marcela's car/g)||[]).length} · en el CHANGELOG: ${enChangelog?enChangelog.length:0}`);

console.log('\n=== PRONOMBRES DE TERCERA PERSONA, ficha por ficha, SOLO zona jugable ===');
console.log('| esc | A: he/his/him | A: she/her | B: he/his/him | B: she/her |');
console.log('|---|---|---|---|---|');
for(const e of Object.keys(F)){
  const j=J[e], iB=j.indexOf('\n## ROLE B'), iC=j.indexOf('\n## ',iB+1);
  const A=j.slice(0,iB<0?j.length:iB), B=j.slice(iB<0?0:iB, iC<0?j.length:iC);
  const c=(s,re)=>(s.match(re)||[]).length;
  console.log(`| ${e} | ${c(A,/\b(he|him|his)\b/gi)} | ${c(A,/\b(she|her|hers)\b/gi)} | ${c(B,/\b(he|him|his)\b/gi)} | ${c(B,/\b(she|her|hers)\b/gi)} |`);
}
