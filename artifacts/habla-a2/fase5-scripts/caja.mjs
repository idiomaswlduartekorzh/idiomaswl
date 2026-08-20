import fs from 'fs';
const files=['fase4-fichas-1-3.md','fase4-fichas-4-6.md','fase4-fichas-7-8.md'];
const rows=[];
for(const f of files){
  const lines=fs.readFileSync('/Users/josedavidduartesilva/Developer/idiomaswl/artifacts/habla-a2/'+f,'utf8').split('\n');
  let inT=false, card=0;
  for(const l of lines){
    if(/^## Ficha del rol/.test(l)) card++;
    if(/^### Andamiaje/.test(l)){inT=true;continue;}
    if(inT && /^###|^##|^# /.test(l)){inT=false;continue;}
    if(!inT) continue;
    const m=l.match(/^\|\s*`([^`]+)`\s*\|([^|]+)\|/);
    if(m) rows.push({f,card,form:m[1].trim(),use:m[2].trim().toLowerCase()});
  }
}
const CAJA=[
 ['abrir/saludar',/abrir|saludar|apertura|antes de soltarlo|pre-secuencia|avisar de que viene algo|comprobar que es el momento/],
 ['cerrar/despedir/agradecer',/cerrar|despedir|agradec|thank|dejar la relación|volver al trabajo|sin que quede mal/],
 ['pedir repetición/aclaración',/repitan|que te lo repitan|repetir|no entendiste|comprobar que entendiste|didn't catch|deletre/],
 ['reformular lo propio',/otras palabras|reformul|volver a decirlo|decirlo otra vez|de otra forma|recoger una frase|volver a decirla|rescatar una frase/],
 ['decir por qué importa',/por qué te importa|por qué algo importa|por qué le importa|qué pierdes|qué te juegas|decir por qué|tu razón|por qué se lo pides/],
 ['callar sin mentir',/sin mentir|no contestar .* sin mentir|sostener lo que no|no vas a contar|cerrar una puerta sin dar el motivo/],
];
let caja=0; const byFn=new Map();
for(const r of rows){ let hit=null; for(const [n,re] of CAJA) if(re.test(r.use)){hit=n;break;} if(hit){caja++;byFn.set(hit,(byFn.get(hit)||0)+1);r.caja=hit;} }
console.log('filas de andamiaje totales:',rows.length,'· fichas:',new Set(rows.map(r=>r.f+r.card)).size);
console.log('filas que son CAJA DE HERRAMIENTAS DEL NIVEL (§10):',caja,`(${(caja/rows.length*100).toFixed(1)} %)`);
for(const [k,v] of [...byFn.entries()].sort((a,b)=>b[1]-a[1])) console.log('  ',k.padEnd(28),v,`(${(v/rows.length*100).toFixed(1)} %)`);
console.log('filas propias del escenario:',rows.length-caja,`(${((rows.length-caja)/rows.length*100).toFixed(1)} %)`,'→ media por rol:',((rows.length-caja)/16).toFixed(1));
// cuántas fichas tienen 6-10 exponentes PROPIOS tras separar la caja
const per=new Map();
for(const r of rows){const k=r.f+'#'+r.card; if(!per.has(k))per.set(k,{t:0,p:0}); const o=per.get(k); o.t++; if(!r.caja)o.p++;}
const props=[...per.values()].map(o=>o.p).sort((a,b)=>a-b);
console.log('exponentes propios por ficha:',props.join(','),'· fichas con <6 propios:',props.filter(x=>x<6).length,'de',props.length);
