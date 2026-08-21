// Reparto de ACTOS DE HABLA contado sobre TURNOS PRODUCIDOS (§5).
// Unidad: cada fila de la tabla «Say it here» = un turno que la pareja tiene que producir
// para llegar al cierre. Clasificación primaria a mano, una fila = un acto.
// 'apertura', 'cierre-ritual' y 'dar-dato/razon' NO son actos del catálogo de §7: se cuentan
// aparte y no entran en el reparto.
const M={
'1A.1':'apertura','1A.2':'proponer-alternativa','1A.3':'dar-dato/razon','1A.4':'poner-limite','1A.5':'dar-dato/razon','1A.6':'dar-dato/razon','1A.7':'proponer-alternativa','1A.8':'rechazar','1A.9':'negociar','1A.10':'pedir-aclaracion',
'1B.1':'apertura','1B.2':'poner-limite','1B.3':'quejarse','1B.4':'rechazar','1B.5':'insistir','1B.6':'rechazar','1B.7':'proponer-alternativa','1B.8':'negociar','1B.9':'pedir-favor','1B.10':'pedir-aclaracion',
'2A.1':'dar-mala-noticia','2A.2':'rechazar','2A.3':'pedir-aclaracion','2A.4':'recomendar','2A.5':'recomendar','2A.6':'dar-dato/razon','2A.7':'pedir-aclaracion','2A.8':'recomendar','2A.9':'recomendar',
'2B.1':'pedir-favor','2B.2':'dar-dato/razon','2B.3':'dar-dato/razon','2B.4':'rechazar','2B.5':'pedir-aclaracion','2B.6':'proponer-alternativa','2B.7':'proponer-alternativa','2B.8':'dar-dato/razon','2B.9':'pedir-aclaracion',
'3A.1':'dar-dato/razon','3A.2':'dar-dato/razon','3A.3':'pedir-favor','3A.4':'pedir-favor','3A.5':'dar-mala-noticia','3A.6':'negociar','3A.7':'negociar','3A.8':'proponer-alternativa','3A.9':'proponer-alternativa',
'3B.1':'dar-mala-noticia','3B.2':'dar-mala-noticia','3B.3':'dar-dato/razon','3B.4':'dar-dato/razon','3B.5':'proponer-alternativa','3B.6':'conceder-con-condicion',
'4A.1':'quejarse','4A.2':'quejarse','4A.3':'pedir-favor','4A.4':'dar-dato/razon','4A.5':'dar-dato/razon','4A.6':'pedir-aclaracion','4A.7':'pedir-aclaracion','4A.8':'pedir-favor','4A.9':'conceder-con-condicion',
'4B.1':'disculparse','4B.2':'pedir-aclaracion','4B.3':'pedir-aclaracion','4B.4':'dar-dato/razon','4B.5':'dar-dato/razon','4B.6':'dar-dato/razon','4B.7':'poner-limite','4B.8':'negociar','4B.9':'proponer-alternativa',
'5A.1':'pedir-aclaracion','5A.2':'pedir-aclaracion','5A.3':'disculparse','5A.4':'dar-dato/razon','5A.5':'dar-dato/razon','5A.6':'poner-limite','5A.7':'pedir-favor','5A.8':'proponer-alternativa','5A.9':'dar-dato/razon',
'5B.1':'apertura','5B.2':'apertura','5B.3':'pedir-aclaracion','5B.4':'rechazar','5B.5':'poner-limite','5B.6':'dar-dato/razon','5B.7':'dar-dato/razon','5B.8':'dar-dato/razon','5B.9':'conceder-con-condicion',
'6A.1':'dar-dato/razon','6A.2':'dar-mala-noticia','6A.3':'disculparse','6A.4':'rechazar','6A.5':'dar-dato/razon','6A.6':'pedir-aclaracion','6A.7':'pedir-aclaracion','6A.8':'proponer-alternativa','6A.9':'poner-limite','6A.10':'proponer-alternativa',
'6B.1':'apertura','6B.2':'conceder-con-condicion','6B.3':'rechazar','6B.4':'proponer-alternativa','6B.5':'pedir-aclaracion','6B.6':'poner-limite','6B.7':'dar-dato/razon','6B.8':'dar-mala-noticia','6B.9':'dar-dato/razon','6B.10':'proponer-alternativa',
'7A.1':'quejarse','7A.2':'rechazar','7A.3':'pedir-aclaracion','7A.4':'quejarse','7A.5':'poner-limite','7A.6':'conceder-con-condicion','7A.7':'quejarse','7A.8':'rechazar','7A.9':'cierre-ritual',
'7B.1':'disculparse','7B.2':'disculparse','7B.3':'dar-dato/razon','7B.4':'pedir-aclaracion','7B.5':'pedir-favor','7B.6':'negociar','7B.7':'pedir-aclaracion','7B.8':'apertura','7B.9':'cierre-ritual',
'8A.1':'pedir-aclaracion','8A.2':'dar-dato/razon','8A.3':'dar-dato/razon','8A.4':'pedir-favor','8A.5':'pedir-aclaracion','8A.6':'quejarse','8A.7':'poner-limite','8A.8':'pedir-aclaracion','8A.9':'pedir-aclaracion',
'8B.1':'pedir-aclaracion','8B.2':'dar-dato/razon','8B.3':'dar-dato/razon','8B.4':'rechazar','8B.5':'poner-limite','8B.6':'poner-limite','8B.7':'pedir-favor','8B.8':'disculparse','8B.9':'rechazar',
};
const CAT=new Set(['pedir-favor','rechazar','negociar','disculparse','quejarse','proponer-alternativa','dar-mala-noticia','insistir','poner-limite','pedir-aclaracion','conceder-con-condicion','recomendar']);
const filas=Object.entries(M).map(([k,a])=>({n:+k[0],rol:k[1],acto:a}));
console.log('turnos-materia clasificados:',filas.length,'· en catálogo §7:',filas.filter(f=>CAT.has(f.acto)).length,'· fuera de catálogo:',filas.filter(f=>!CAT.has(f.acto)).length);
const esc=new Map(), fil=new Map();
for(const f of filas){ if(!esc.has(f.acto))esc.set(f.acto,new Set()); esc.get(f.acto).add(f.n); fil.set(f.acto,(fil.get(f.acto)||0)+1); }
const ord=[...esc.entries()].sort((a,b)=>b[1].size-a[1].size||fil.get(b[0])-fil.get(a[0]));
console.log('\nacto                      esc.  %esc   veredicto(≤40 %)  filas  %filas   escenarios');
for(const [a,s] of ord){
  const p=s.size/8*100, pf=fil.get(a)/filas.length*100;
  console.log(`${a.padEnd(24)} ${String(s.size).padStart(2)}/8 ${p.toFixed(1).padStart(6)} %  ${CAT.has(a)?(p>40?'FALLA ':'  ok  '):' n/a  '}  ${String(fil.get(a)).padStart(4)} ${pf.toFixed(1).padStart(6)} %   ${[...s].sort().join(',')}`);
}
const cat=ord.filter(x=>CAT.has(x[0]));
console.log('\nmáximo del catálogo:', (Math.max(...cat.map(x=>x[1].size))/8*100).toFixed(1)+' %');
console.log('actos del catálogo que FALLAN (>40 % de los escenarios):', cat.filter(x=>x[1].size/8>0.4).map(x=>`${x[0]} ${(x[1].size/8*100).toFixed(1)} %`).join(' · ')||'ninguno');
console.log('actos del catálogo ausentes del set:',[...CAT].filter(a=>!esc.has(a)).join(', ')||'ninguno');
// por rol: ¿se reparte el acto entre A y B?
console.log('\n=== ¿quién produce cada acto? (A/B) ===');
for(const [a,s] of ord){ if(!CAT.has(a))continue; const A=filas.filter(f=>f.acto===a&&f.rol==='A').length,B=filas.filter(f=>f.acto===a&&f.rol==='B').length; console.log(`  ${a.padEnd(24)} A ${String(A).padStart(2)} · B ${String(B).padStart(2)}`);}
