// ACTOS DE HABLA en CUOTA DE TURNOS del set (§5, regla del 21 ago 2026: techo 30 %, suelo 3 %).
// Unidad: cada fila de la tabla de exponentes = un turno que la pareja tiene que producir para
// llegar al cierre. Clasificación primaria a mano, una fila = un acto, por la columna `function`.
// 'apertura', 'cierre-ritual' y 'dar-dato/razon' NO están en el catálogo de §7: se cuentan aparte.
const M={
'1A.1':'pedir-aclaracion','1A.2':'poner-limite','1A.3':'proponer-alternativa','1A.4':'conceder-con-condicion','1A.5':'apertura','1A.6':'dar-dato/razon','1A.7':'proponer-alternativa','1A.8':'dar-dato/razon','1A.9':'dar-dato/razon',
'1B.1':'pedir-aclaracion','1B.2':'pedir-favor','1B.3':'poner-limite','1B.4':'pedir-favor','1B.5':'dar-dato/razon','1B.6':'conceder-con-condicion','1B.7':'apertura','1B.8':'rechazar','1B.9':'quejarse',
'2A.1':'poner-limite','2A.2':'dar-mala-noticia','2A.3':'dar-dato/razon','2A.4':'recomendar','2A.5':'pedir-aclaracion','2A.6':'pedir-aclaracion','2A.7':'dar-dato/razon','2A.8':'recomendar','2A.9':'recomendar',
'2B.1':'pedir-aclaracion','2B.2':'pedir-aclaracion','2B.3':'pedir-favor','2B.4':'dar-dato/razon','2B.5':'quejarse','2B.6':'dar-dato/razon','2B.7':'proponer-alternativa','2B.8':'poner-limite','2B.9':'proponer-alternativa',
'3A.1':'pedir-aclaracion','3A.2':'pedir-favor','3A.3':'dar-mala-noticia','3A.4':'negociar','3A.5':'proponer-alternativa','3A.6':'dar-dato/razon',
'3B.1':'proponer-alternativa','3B.2':'pedir-aclaracion','3B.3':'dar-mala-noticia','3B.4':'dar-dato/razon','3B.5':'poner-limite','3B.6':'conceder-con-condicion',
'4A.1':'recomendar','4A.2':'insistir','4A.3':'pedir-aclaracion','4A.4':'apertura','4A.5':'pedir-favor','4A.6':'rechazar','4A.7':'proponer-alternativa','4A.8':'dar-dato/razon','4A.9':'conceder-con-condicion',
'4B.1':'recomendar','4B.2':'pedir-aclaracion','4B.3':'quejarse','4B.4':'insistir','4B.5':'apertura','4B.6':'rechazar','4B.7':'dar-mala-noticia','4B.8':'proponer-alternativa','4B.9':'conceder-con-condicion',
'5A.1':'disculparse','5A.2':'pedir-aclaracion','5A.3':'pedir-aclaracion','5A.4':'proponer-alternativa','5A.5':'negociar','5A.6':'poner-limite','5A.7':'dar-dato/razon','5A.8':'dar-dato/razon','5A.9':'pedir-favor',
'5B.1':'pedir-aclaracion','5B.2':'dar-dato/razon','5B.3':'dar-mala-noticia','5B.4':'conceder-con-condicion','5B.5':'apertura','5B.6':'negociar','5B.7':'dar-dato/razon','5B.8':'dar-dato/razon','5B.9':'proponer-alternativa',
'6A.1':'pedir-aclaracion','6A.2':'dar-mala-noticia','6A.3':'rechazar','6A.4':'proponer-alternativa','6A.5':'disculparse','6A.6':'proponer-alternativa','6A.7':'pedir-aclaracion','6A.8':'poner-limite',
'6B.1':'proponer-alternativa','6B.2':'conceder-con-condicion','6B.3':'rechazar','6B.4':'dar-dato/razon','6B.5':'proponer-alternativa','6B.6':'poner-limite','6B.7':'dar-mala-noticia','6B.8':'dar-dato/razon','6B.9':'pedir-aclaracion',
'7A.1':'pedir-aclaracion','7A.2':'quejarse','7A.3':'poner-limite','7A.4':'conceder-con-condicion','7A.5':'rechazar','7A.6':'quejarse','7A.7':'quejarse','7A.8':'cierre-ritual','7A.9':'rechazar',
'7B.1':'pedir-aclaracion','7B.2':'pedir-aclaracion','7B.3':'negociar','7B.4':'disculparse','7B.5':'disculparse','7B.6':'pedir-favor','7B.7':'dar-dato/razon','7B.8':'cierre-ritual','7B.9':'cierre-ritual',
// esc 8, 22 ago: A gana dos filas de `asking again` (insistir) — ver fase12-cuota-registro.md
'8A.1':'insistir','8A.2':'insistir','8A.3':'pedir-favor','8A.4':'pedir-aclaracion','8A.5':'pedir-aclaracion','8A.6':'quejarse','8A.7':'poner-limite','8A.8':'dar-dato/razon',
// esc 8, 22 ago: B gana `asking again for the reason` (insistir) y `offering another way` deja de ser
// una concesión condicionada — la condición se mudó a la fila del no, y la fila propone de verdad.
'8B.1':'insistir','8B.2':'pedir-favor','8B.3':'pedir-aclaracion','8B.4':'dar-dato/razon','8B.5':'proponer-alternativa','8B.6':'rechazar','8B.7':'poner-limite','8B.8':'disculparse',
};
const CAT=['pedir-favor','rechazar','negociar','disculparse','quejarse','proponer-alternativa','dar-mala-noticia','insistir','poner-limite','pedir-aclaracion','conceder-con-condicion','recomendar'];
const DECL={1:['rechazar','conceder-con-condicion'],2:['dar-mala-noticia','recomendar'],3:['pedir-favor','conceder-con-condicion'],4:['recomendar','insistir','conceder-con-condicion'],5:['disculparse','conceder-con-condicion'],6:['dar-mala-noticia','proponer-alternativa'],7:['quejarse','rechazar'],8:['pedir-favor','rechazar','proponer-alternativa']};
const declarados=new Set(Object.values(DECL).flat());
const filas=Object.entries(M).map(([k,a])=>({n:+k.split('.')[0][0],rol:k.split('.')[0][1],acto:a}));
const T=filas.length;
console.log(`turnos-materia del set: ${T}  (una fila de exponente = un turno que hay que producir)`);
console.log(`  en catálogo §7: ${filas.filter(f=>CAT.includes(f.acto)).length} · fuera de catálogo: ${filas.filter(f=>!CAT.includes(f.acto)).length}`);
console.log(`  actos declarados en las bandas: ${[...declarados].sort().join(', ')}  (${declarados.size}/12)`);
console.log(`  del catálogo NO declarados: ${CAT.filter(a=>!declarados.has(a)).join(', ')}`);
const cnt=new Map(), esc=new Map(), porRol=new Map();
for(const f of filas){cnt.set(f.acto,(cnt.get(f.acto)||0)+1); if(!esc.has(f.acto))esc.set(f.acto,new Set()); esc.get(f.acto).add(f.n); const k=f.acto+'|'+f.rol; porRol.set(k,(porRol.get(k)||0)+1);}
const ord=[...cnt.entries()].sort((a,b)=>b[1]-a[1]);
console.log('\nacto                      turnos   %turnos  techo30  suelo3   esc.  A / B');
console.log('-'.repeat(84));
for(const [a,c] of ord){
  const p=c/T*100, enCat=CAT.includes(a), esDecl=declarados.has(a);
  const techo=p>30?'FALLA':(enCat?' ok ':' n/a');
  const suelo=esDecl?(p<3?'FALLA':' ok '):'  — ';
  console.log(`${a.padEnd(24)} ${String(c).padStart(6)}  ${p.toFixed(1).padStart(6)} %  ${techo.padStart(6)}  ${suelo.padStart(6)}   ${String(esc.get(a).size).padStart(2)}/8  ${String(porRol.get(a+'|A')||0).padStart(2)} / ${String(porRol.get(a+'|B')||0).padStart(2)}`);
}
const ausentes=CAT.filter(a=>!cnt.has(a));
console.log(`\nactos del catálogo ausentes del set: ${ausentes.join(', ')||'ninguno'}`);
const fallaTecho=ord.filter(([a,c])=>c/T>0.30);
const fallaSuelo=CAT.filter(a=>declarados.has(a)&&(cnt.get(a)||0)/T<0.03);
console.log(`por encima del techo (30 %): ${fallaTecho.map(([a,c])=>`${a} ${(c/T*100).toFixed(1)} %`).join(' · ')||'ninguno'}`);
console.log(`declarados por debajo del suelo (3 %): ${fallaSuelo.map(a=>`${a} ${((cnt.get(a)||0)/T*100).toFixed(1)} %`).join(' · ')||'ninguno'}`);
console.log(`máximo del set: ${ord[0][0]} con ${(ord[0][1]/T*100).toFixed(1)} % · mínimo declarado: ${[...declarados].map(a=>[a,(cnt.get(a)||0)/T*100]).sort((x,y)=>x[1]-y[1])[0].map((v,i)=>i?v.toFixed(1)+' %':v).join(' con ')}`);
console.log('\n=== por escenario: ¿se produce lo que la banda declara? ===');
for(let n=1;n<=8;n++){
  const f=filas.filter(x=>x.n===n), tot=f.length;
  const prod=new Set(f.map(x=>x.acto));
  const falta=DECL[n].filter(a=>!prod.has(a));
  const distintos=[...prod].filter(a=>CAT.includes(a)).length;
  console.log(`  esc ${n}: ${tot} turnos · ${distintos} actos del catálogo distintos · declara [${DECL[n].join(', ')}] · sin producir: ${falta.join(', ')||'—'}`);
}
