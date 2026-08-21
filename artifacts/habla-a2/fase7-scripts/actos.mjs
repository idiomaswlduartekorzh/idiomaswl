import { readFileSync } from 'node:fs';
const R=JSON.parse(readFileSync('/tmp/habla-set.json','utf8'));
// Clasificador de ACTO por lo que el turno HACE (form + glosa "what it does here" + función),
// no por la etiqueta speechActs del escenario.
const ACT=[
 ['pedir-favor',      /can i ask you a favor|the ask|ask for a favor|asking for it|i'?d like a refund|i'?d like a written|can you help me|can i come back|can you keep it for me|ask for your money|what you walked in for|ask for the signature|can you sign/i],
 ['rechazar',         /\bno\b|refuse|turn (the number )?down|can'?t (do|go|pay|tell)|not going to work|hold the line|holding the line|that'?s not enough|say no|not enough yet|close the (question|door)|i'?m not saying no|say it is not enough|deny/i],
 ['proponer-alternativa',/another way|alternative|option|instead|what about|maybe we can|how about|offer(ing)? |a second way|two ways|other door|i can (do it|put|include)|propose|offer another/i],
 ['negociar',         /if (you|i) .*,? (i|we)( can|'ll)|trad(e|ing)|something for something|price moves|bargain|put a price on|yes with a price|moving the deal|swap/i],
 ['disculparse',      /sorry|apolog|i'?m sorry|say sorry|own it|it'?s my fault|owning it/i],
 ['quejarse',         /complain|complaint|mistake on my bill|i didn'?t use|that'?s not what we said|why didn'?t you tell me|open the complaint|you haven'?t paid/i],
 ['dar-mala-noticia', /bad news|there'?s a problem|fully booked|the news|break something|not authorized|that'?s not true anymore|taking it back|the hard part|no truck|gone/i],
 ['insistir',         /again|second and third no|insist|go back to the money every time|say it once,? and don'?t fight|repeat(ing)? your/i],
 ['poner-limite',     /limit|i can'?t go under|my number|the line you can'?t|mark the limit|deadline|i have to be careful|book your hours|not on the table|one condition|hold it/i],
 ['pedir-aclaracion', /\?`|what does that mean|ask (what|how|why|which|when|who)|open question|what happened|which paper|let me repeat|read it back|say it back|check what you just heard|just to check|asking about theirs|asking back|what'?s up|dictate|copy the number/i],
 ['conceder-con-condicion',/only if|but only if|yes,? with a condition|granting with a condition|i can do it,? but|if you .*,? i'?ll|grant it|i'?m ok with it|close on your condition/i],
 ['recomendar',       /you should|instructions|advice|put something cold|don'?t chew|go to the emergency|tell them what to do|recommend/i],
];
const rows=[];
for(const r of R) for(const e of r.exp){
  const t=`${e.fn} ${e.form} ${e.does}`;
  const hits=ACT.filter(([,rx])=>rx.test(t)).map(([k])=>k);
  rows.push({n:r.n,rol:r.rol,fn:e.fn,acts:hits.length?hits:['(sin clasificar)']});
}
console.log('turnos-materia (filas de exponentes) analizados:',rows.length);
const N=8, pct=x=>(x/N*100).toFixed(1)+' %';
const porActo=new Map();
for(const r of rows) for(const a of new Set(r.acts)){ if(!porActo.has(a)) porActo.set(a,new Set()); porActo.get(a).add(r.n); }
const cntFilas=new Map();
for(const r of rows) for(const a of new Set(r.acts)) cntFilas.set(a,(cntFilas.get(a)||0)+1);
console.log('\n=== ACTO POR TURNOS PRODUCIDOS — presencia en escenarios (umbral §5: ≤40 %) ===');
const ord=[...porActo.entries()].sort((a,b)=>b[1].size-a[1].size);
for(const [a,s] of ord) console.log(`${a.padEnd(24)} ${s.size}/8  ${pct(s.size).padStart(7)}  ${s.size/N>0.4?'FALLA':'ok'}   filas: ${cntFilas.get(a)}  esc. ${[...s].sort().join(',')}`);
console.log('\nmáximo:',pct(Math.max(...ord.map(x=>x[1].size))));
console.log('sin clasificar:',rows.filter(r=>r.acts[0]==='(sin clasificar)').length);
