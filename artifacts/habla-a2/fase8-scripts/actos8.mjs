// Reparto de ACTOS DE HABLA sobre TURNOS PRODUCIDOS, con la regla de §5 vigente
// (auditoría del 21 ago 2026): ningún acto por encima del 30 % de los turnos del set,
// y ninguno de los DECLARADOS por debajo del 3 %.
// Unidad: cada fila de la tabla de exponentes = un turno que la pareja tiene que producir.
// Clasificación primaria a mano sobre el par (form + «what it does here»), no sobre el
// nombre de la fila ni sobre el campo speechActs del escenario.
// Composición NUEVA: el 4 viejo retirado, el 4 nuevo (`the-pot-is-already-on`) dentro.
const M={
'1A.1':'pedir-aclaracion','1A.2':'poner-limite','1A.3':'proponer-alternativa','1A.4':'negociar','1A.5':'apertura','1A.6':'dar-dato/razon','1A.7':'proponer-alternativa','1A.8':'poner-limite','1A.9':'dar-dato/razon',
'1B.1':'pedir-aclaracion','1B.2':'negociar','1B.3':'poner-limite','1B.4':'pedir-favor','1B.5':'dar-dato/razon','1B.6':'proponer-alternativa','1B.7':'apertura','1B.8':'rechazar','1B.9':'quejarse',
'2A.1':'poner-limite','2A.2':'dar-mala-noticia','2A.3':'dar-dato/razon','2A.4':'recomendar','2A.5':'pedir-aclaracion','2A.6':'pedir-aclaracion','2A.7':'dar-dato/razon','2A.8':'recomendar','2A.9':'recomendar',
'2B.1':'pedir-aclaracion','2B.2':'pedir-aclaracion','2B.3':'pedir-favor','2B.4':'dar-dato/razon','2B.5':'quejarse','2B.6':'dar-dato/razon','2B.7':'proponer-alternativa','2B.8':'poner-limite','2B.9':'proponer-alternativa',
'3A.1':'pedir-aclaracion','3A.2':'pedir-favor','3A.3':'dar-mala-noticia','3A.4':'negociar','3A.5':'proponer-alternativa','3A.6':'dar-dato/razon',
'3B.1':'proponer-alternativa','3B.2':'pedir-aclaracion','3B.3':'dar-mala-noticia','3B.4':'dar-dato/razon','3B.5':'poner-limite','3B.6':'conceder-con-condicion',
'4A.1':'pedir-aclaracion','4A.2':'dar-dato/razon','4A.3':'poner-limite','4A.4':'insistir','4A.5':'insistir','4A.6':'insistir','4A.7':'recomendar','4A.8':'proponer-alternativa','4A.9':'conceder-con-condicion',
'4B.1':'dar-dato/razon','4B.2':'poner-limite','4B.3':'recomendar','4B.4':'recomendar','4B.5':'quejarse','4B.6':'pedir-aclaracion','4B.7':'rechazar','4B.8':'insistir','4B.9':'conceder-con-condicion',
'5A.1':'disculparse','5A.2':'pedir-aclaracion','5A.3':'pedir-aclaracion','5A.4':'proponer-alternativa','5A.5':'negociar','5A.6':'poner-limite','5A.7':'dar-dato/razon','5A.8':'negociar','5A.9':'pedir-favor',
'5B.1':'pedir-aclaracion','5B.2':'dar-dato/razon','5B.3':'dar-mala-noticia','5B.4':'conceder-con-condicion','5B.5':'apertura','5B.6':'negociar','5B.7':'dar-dato/razon','5B.8':'dar-dato/razon','5B.9':'proponer-alternativa',
'6A.1':'pedir-aclaracion','6A.2':'dar-mala-noticia','6A.3':'poner-limite','6A.4':'proponer-alternativa','6A.5':'disculparse','6A.6':'proponer-alternativa','6A.7':'pedir-aclaracion','6A.8':'dar-dato/razon',
'6B.1':'proponer-alternativa','6B.2':'conceder-con-condicion','6B.3':'poner-limite','6B.4':'dar-mala-noticia','6B.5':'proponer-alternativa','6B.6':'apertura','6B.7':'poner-limite','6B.8':'dar-mala-noticia','6B.9':'dar-dato/razon','6B.10':'pedir-aclaracion',
'7A.1':'pedir-aclaracion','7A.2':'quejarse','7A.3':'poner-limite','7A.4':'conceder-con-condicion','7A.5':'rechazar','7A.6':'quejarse','7A.7':'quejarse','7A.8':'cierre-ritual','7A.9':'rechazar',
'7B.1':'pedir-aclaracion','7B.2':'pedir-aclaracion','7B.3':'negociar','7B.4':'disculparse','7B.5':'disculparse','7B.6':'pedir-favor','7B.7':'dar-dato/razon','7B.8':'cierre-ritual','7B.9':'cierre-ritual',
'8A.1':'pedir-favor','8A.2':'pedir-aclaracion','8A.3':'pedir-aclaracion','8A.4':'quejarse','8A.5':'poner-limite','8A.6':'dar-dato/razon',
'8B.1':'pedir-favor','8B.2':'dar-dato/razon','8B.3':'dar-dato/razon','8B.4':'rechazar','8B.5':'poner-limite','8B.6':'disculparse',
};
// Lo que cada escenario DECLARA en su banda de diseñador (campo speechActs).
const DECL={1:['rechazar','conceder-con-condicion'],2:['dar-mala-noticia','recomendar'],3:['pedir-favor','conceder-con-condicion'],
4:['recomendar','insistir','conceder-con-condicion'],5:['disculparse','conceder-con-condicion'],6:['dar-mala-noticia','proponer-alternativa'],
7:['quejarse','rechazar'],8:['pedir-favor','rechazar','proponer-alternativa']};
const CAT=new Set(['pedir-favor','rechazar','negociar','disculparse','quejarse','proponer-alternativa','dar-mala-noticia','insistir','poner-limite','pedir-aclaracion','conceder-con-condicion','recomendar']);
const filas=Object.entries(M).map(([k,a])=>({n:+k.split('.')[0].slice(0,-1),rol:k.split('.')[0].slice(-1),acto:a}));
const N=filas.length;
const declarados=new Set(Object.values(DECL).flat());
console.log('turnos-materia clasificados:',N,'· en catálogo §7:',filas.filter(f=>CAT.has(f.acto)).length,'· fuera de catálogo:',filas.filter(f=>!CAT.has(f.acto)).length);
console.log('actos declarados por el set:',[...declarados].sort().join(', '),`(${declarados.size}/12)`);
const esc=new Map(), fil=new Map();
for(const f of filas){ if(!esc.has(f.acto))esc.set(f.acto,new Set()); esc.get(f.acto).add(f.n); fil.set(f.acto,(fil.get(f.acto)||0)+1); }
const ord=[...fil.entries()].sort((a,b)=>b[1]-a[1]);
console.log('\nacto                     turnos  CUOTA   techo30 suelo3  decl  esc.  escenarios');
for(const [a,c] of ord){
  const q=c/N*100, s=esc.get(a);
  const d=declarados.has(a);
  const techo=CAT.has(a)?(q>30?'FALLA':'  ok '):' n/a ';
  const suelo=CAT.has(a)?(d?(q<3?'FALLA':'  ok '):'  —  '):' n/a ';
  console.log(`${a.padEnd(24)} ${String(c).padStart(4)} ${q.toFixed(1).padStart(6)} % ${techo.padStart(7)} ${suelo.padStart(7)}  ${(d?'sí':'no').padStart(4)} ${String(s.size).padStart(3)}/8  ${[...s].sort().join(',')}`);
}
const cat=ord.filter(x=>CAT.has(x[0]));
console.log('\ncuota máxima del catálogo:', (Math.max(...cat.map(x=>x[1]))/N*100).toFixed(1)+' % ('+cat[0][0]+')');
console.log('por encima del techo del 30 %:', cat.filter(x=>x[1]/N>0.30).map(x=>x[0]).join(', ')||'ninguno');
console.log('DECLARADOS por debajo del suelo del 3 %:', cat.filter(x=>declarados.has(x[0])&&x[1]/N<0.03).map(x=>`${x[0]} ${(x[1]/N*100).toFixed(1)} %`).join(' · ')||'ninguno');
console.log('del catálogo, por debajo del 3 % (declarados o no):', cat.filter(x=>x[1]/N<0.03).map(x=>`${x[0]} ${(x[1]/N*100).toFixed(1)} %`).join(' · ')||'ninguno');
console.log('actos del catálogo ausentes del set:',[...CAT].filter(a=>!fil.has(a)).join(', ')||'ninguno');
console.log('\n=== declarado vs producido, por escenario ===');
for(let n=1;n<=8;n++){
  const prod=new Set(filas.filter(f=>f.n===n&&CAT.has(f.acto)).map(f=>f.acto));
  const falta=DECL[n].filter(a=>!prod.has(a));
  console.log(`  esc ${n}: declara [${DECL[n].join(', ')}] · produce ${prod.size} actos distintos${falta.length?' · DECLARADO Y NO PRODUCIDO: '+falta.join(', '):''}`);
}
console.log('\n=== ¿quién produce cada acto? (A/B) ===');
for(const [a,c] of ord){ if(!CAT.has(a))continue; const A=filas.filter(f=>f.acto===a&&f.rol==='A').length,B=filas.filter(f=>f.acto===a&&f.rol==='B').length;
  const sesgo=(A===0||B===0)&&c>=3?'  ← todo en un rol':''; console.log(`  ${a.padEnd(24)} A ${String(A).padStart(2)} · B ${String(B).padStart(2)}${sesgo}`);}
console.log('\n=== turnos-materia por escenario ===');
for(let n=1;n<=8;n++){const f=filas.filter(x=>x.n===n);console.log(`  esc ${n}: ${f.length} filas · ${new Set(f.filter(x=>CAT.has(x.acto)).map(x=>x.acto)).size} actos distintos del catálogo`);}
