// Auditoría de conjunto — set inglés A2 «habla acompañada», fase 4.
// Datos transcritos de fase4-escenarios-*.md y fase4-fichas-*.md (versión del 19 ago 2026).
const S = [
 {n:1,slug:'the-bike-in-the-parking-lot',speechActs:['rechazar','conceder-con-condicion'],power:'a>b',initiator:'b',outcome:'acuerdo',minutes:6,turns:12,
  setting:'porteria',settingKind:'calle',barrio:'Cabecera',aula:false,culpaA:false,
  reloj:false,terceroDecide:false,cartaCanal:'mensaje-ausente',cartaA:'b',cartaTurno:5,salidas:3,
  cierreTipo:'checklist',cierreGesto:false,
  onScene:[{rol:'a',nombre:null,gen:'neutro',poder:true},{rol:'b',nombre:null,gen:'neutro',poder:false}],
  offScene:[{nombre:'cuñado',gen:'m',decide:false},{nombre:'portero',gen:'m',decide:false}],
  ganador:null, culpableNombrado:null,
  actosEscritos:['rechazar','conceder-con-condicion','proponer-alternativa','pedir-aclaracion']},

 {n:2,slug:'no-appointment-until-thursday',speechActs:['dar-mala-noticia','recomendar'],power:'a>b',initiator:'b',outcome:'acuerdo',minutes:6,turns:12,
  setting:'recepcion-clinica',settingKind:'mostrador',barrio:'Cabecera',aula:false,culpaA:false,
  reloj:true,terceroDecide:true,cartaCanal:'mensaje-ausente',cartaA:'a',cartaTurno:5,salidas:3,
  cierreTipo:'checklist',cierreGesto:false,
  onScene:[{rol:'a',nombre:null,gen:'neutro',poder:true},{rol:'b',nombre:null,gen:'neutro',poder:false}],
  offScene:[{nombre:'doctora Restrepo',gen:'f',decide:true},{nombre:'la administradora',gen:'f',decide:true},{nombre:'la hermana',gen:'f',decide:false}],
  ganador:null, culpableNombrado:null,
  actosEscritos:['dar-mala-noticia','recomendar','rechazar','proponer-alternativa','pedir-aclaracion','disculparse']},

 {n:3,slug:'swap-the-saturday-shift',speechActs:['pedir-favor','conceder-con-condicion'],power:'igual',initiator:'a',outcome:'acuerdo-parcial',minutes:7,turns:14,
  setting:'trastienda-cafe',settingKind:'trabajo',barrio:'Cabecera',aula:false,culpaA:true,
  reloj:true,terceroDecide:true,cartaCanal:'mensaje-ausente',cartaA:'a',cartaTurno:6,salidas:3,
  cierreTipo:'checklist',cierreGesto:true,
  onScene:[{rol:'a',nombre:null,gen:'neutro',poder:false},{rol:'b',nombre:null,gen:'neutro',poder:false}],
  offScene:[{nombre:'Nayibe',gen:'f',decide:true},{nombre:'Katherine',gen:'f',decide:true},{nombre:'Duván',gen:'m',decide:false}],
  ganador:null, culpableNombrado:null,
  actosEscritos:['pedir-favor','conceder-con-condicion','rechazar','proponer-alternativa','dar-mala-noticia']},

 {n:4,slug:'a-charge-i-did-not-make',speechActs:['quejarse','pedir-aclaracion'],power:'b>a',initiator:'a',outcome:'acuerdo-parcial',minutes:7,turns:15,
  setting:'tienda-operadora',settingKind:'mostrador',barrio:'centro comercial',aula:false,culpaA:false,
  reloj:false,terceroDecide:false,cartaCanal:'mensaje-ausente',cartaA:'a',cartaTurno:5,salidas:3,
  cierreTipo:'checklist',cierreGesto:false,
  onScene:[{rol:'a',nombre:null,gen:'neutro',poder:false},{rol:'b',nombre:'Yolima',gen:'f',poder:true}],
  offScene:[{nombre:'Brayan',gen:'m',decide:false},{nombre:'la hermana',gen:'f',decide:false}],
  ganador:'b', culpableNombrado:null,
  actosEscritos:['quejarse','pedir-aclaracion','rechazar','proponer-alternativa','conceder-con-condicion','disculparse']},

 {n:5,slug:'late-again-on-monday',speechActs:['disculparse','conceder-con-condicion'],power:'b>a',initiator:'b',outcome:'acuerdo',minutes:7,turns:14,
  setting:'oficina-almacen',settingKind:'trabajo',barrio:'carrera 15',aula:false,culpaA:true,
  reloj:false,terceroDecide:false,cartaCanal:'en-persona',cartaA:'b',cartaTurno:5,salidas:3,
  cierreTipo:'checklist',cierreGesto:false,
  onScene:[{rol:'a',nombre:'Julián',gen:'m',poder:false},{rol:'b',nombre:'doña Amparo',gen:'f',poder:true}],
  offScene:[{nombre:'Alba',gen:'f',decide:false},{nombre:'Matías',gen:'m',decide:false},{nombre:'la vecina del 3',gen:'f',decide:false}],
  ganador:null, culpableNombrado:'Julián',
  actosEscritos:['disculparse','conceder-con-condicion','rechazar','proponer-alternativa','pedir-aclaracion']},

 {n:6,slug:'the-cousin-on-the-sofa',speechActs:['dar-mala-noticia','proponer-alternativa'],power:'igual',initiator:'a',outcome:'acuerdo-parcial',minutes:8,turns:14,
  setting:'cocina-piso',settingKind:'casa',barrio:'Cabecera',aula:false,culpaA:true,
  reloj:true,terceroDecide:true,cartaCanal:'mensaje-ausente',cartaA:'b',cartaTurno:6,salidas:3,
  cierreTipo:'checklist',cierreGesto:false,
  onScene:[{rol:'a',nombre:'Dani',gen:'neutro',poder:false},{rol:'b',nombre:'Cris',gen:'f',poder:false}],
  offScene:[{nombre:'Iván',gen:'m',decide:false},{nombre:'Óscar',gen:'m',decide:true},{nombre:'la mamá de Cris',gen:'f',decide:false},{nombre:'la tía',gen:'f',decide:false}],
  ganador:null, culpableNombrado:'Dani',
  actosEscritos:['dar-mala-noticia','proponer-alternativa','rechazar','conceder-con-condicion','pedir-aclaracion']},

 {n:7,slug:'two-more-people-for-the-trip',speechActs:['quejarse','rechazar'],power:'a>b',initiator:'b',outcome:'aplazado',minutes:6,turns:14,
  setting:'parqueadero',settingKind:'calle',barrio:'conjunto',aula:false,culpaA:false,
  reloj:true,terceroDecide:true,cartaCanal:'mensaje-ausente',cartaA:'a',cartaTurno:4,salidas:3,
  cierreTipo:'checklist',cierreGesto:true,
  onScene:[{rol:'a',nombre:'Valentina',gen:'f',poder:true},{rol:'b',nombre:'Kevin',gen:'m',poder:false}],
  offScene:[{nombre:'doña Nubia',gen:'f',decide:true},{nombre:'el administrador',gen:'m',decide:true},{nombre:'Óscar',gen:'m',decide:false},{nombre:'Sebastián',gen:'m',decide:false},{nombre:'Andrea',gen:'f',decide:false}],
  ganador:'a', culpableNombrado:'Kevin',
  actosEscritos:['quejarse','rechazar','pedir-aclaracion','proponer-alternativa','conceder-con-condicion']},

 {n:8,slug:'cancel-the-gym-i-am-leaving',speechActs:['pedir-favor','rechazar','proponer-alternativa'],power:'b>a',initiator:'a',outcome:'sin-acuerdo',minutes:7,turns:16,
  setting:'recepcion-gimnasio',settingKind:'mostrador',barrio:'Cabecera',aula:false,culpaA:false,
  reloj:true,terceroDecide:true,cartaCanal:'mensaje-ausente',cartaA:'b',cartaTurno:3,salidas:2,
  cierreTipo:'checklist',cierreGesto:true,
  onScene:[{rol:'a',nombre:'Tatiana',gen:'f',poder:false},{rol:'b',nombre:'Milena',gen:'f',poder:true}],
  offScene:[{nombre:'Édison',gen:'m',decide:true},{nombre:'Yurany',gen:'f',decide:false},{nombre:'Duván',gen:'m',decide:false}],
  ganador:'b', culpableNombrado:null,
  actosEscritos:['pedir-favor','rechazar','proponer-alternativa','quejarse','pedir-aclaracion','recomendar']},
];
const N=S.length, pct=x=>(x/N*100).toFixed(1)+' %';
const tally=(f)=>{const m=new Map();for(const s of S)for(const v of [].concat(f(s)))m.set(v,(m.get(v)||0)+1);return [...m.entries()].sort((a,b)=>b[1]-a[1]);};
const list=(f)=>S.filter(f).map(s=>s.n).join(', ')||'—';

console.log('=== 1 · ACTOS DE HABLA (campo declarado speechActs) — umbral ≤40 % ===');
for(const [k,c] of tally(s=>s.speechActs)) console.log(`${k.padEnd(24)} ${c}/8  ${pct(c).padStart(7)}  ${c/N>0.4?'FALLA':'ok'}   esc. ${S.filter(s=>s.speechActs.includes(k)).map(s=>s.n).join(',')}`);
console.log('máximo declarado:',pct(Math.max(...tally(s=>s.speechActs).map(x=>x[1]))));
console.log('\n=== 1bis · ACTOS QUE EL TEXTO EXIGE DE VERDAD (turnos escritos + criterios de cierre) ===');
for(const [k,c] of tally(s=>s.actosEscritos)) console.log(`${k.padEnd(24)} ${c}/8  ${pct(c).padStart(7)}  ${c/N>0.4?'FALLA':'ok'}   esc. ${S.filter(s=>s.actosEscritos.includes(k)).map(s=>s.n).join(',')}`);

console.log('\n=== 2 · PODER — umbral: a>b (manda el estudiante) ≥3 de 8 ===');
for(const [k,c] of tally(s=>s.power)) console.log(`${k.padEnd(10)} ${c}/8 ${pct(c).padStart(7)}  esc. ${S.filter(s=>s.power===k).map(s=>s.n).join(',')}`);
console.log('asimétricos (a>b o b>a):',S.filter(s=>s.power!=='igual').length+'/8',pct(S.filter(s=>s.power!=='igual').length));

console.log('\n=== 3 · QUIÉN ARRANCA — umbral 40–60 % cada rol ===');
for(const k of ['a','b']){const c=S.filter(s=>s.initiator===k).length;console.log(`${k.toUpperCase()} ${c}/8 ${pct(c)}  esc. ${list(s=>s.initiator===k)}`);}

console.log('\n=== 4 · DESENLACE — umbral ≥1 sin-acuerdo y ≥1 acuerdo-parcial ===');
for(const [k,c] of tally(s=>s.outcome)) console.log(`${k.padEnd(16)} ${c}/8 ${pct(c).padStart(7)}  esc. ${S.filter(s=>s.outcome===k).map(s=>s.n).join(',')}`);

console.log('\n=== 5 · CULPA (¿el problema lo causa A?) — umbral ≤50 % ===');
console.log('sí:',S.filter(s=>s.culpaA).length+'/8',pct(S.filter(s=>s.culpaA).length),'esc.',list(s=>s.culpaA));

console.log('\n=== 6 · ESCENOGRAFÍA — umbral ≤2 en aula ===');
console.log('aula:',S.filter(s=>s.aula).length+'/8',pct(S.filter(s=>s.aula).length));
for(const [k,c] of tally(s=>s.settingKind)) console.log(`  ${k.padEnd(12)} ${c}/8 ${pct(c).padStart(7)}  esc. ${S.filter(s=>s.settingKind===k).map(s=>s.n).join(',')}`);
const cab=S.filter(s=>s.barrio==='Cabecera').length; console.log('  mismo barrio (Cabecera):',cab+'/8',pct(cab),'esc.',list(s=>s.barrio==='Cabecera'));

console.log('\n=== EXTRA A · EL MOLDE DEL MOTOR ===');
console.log('con reloj (fecha/hora límite inamovible):',S.filter(s=>s.reloj).length+'/8',pct(S.filter(s=>s.reloj).length),'esc.',list(s=>s.reloj));
console.log('con tercero ausente que decide o veta:',S.filter(s=>s.terceroDecide).length+'/8',pct(S.filter(s=>s.terceroDecide).length),'esc.',list(s=>s.terceroDecide));
console.log('motor completo (reloj Y tercero):',S.filter(s=>s.reloj&&s.terceroDecide).length+'/8',pct(S.filter(s=>s.reloj&&s.terceroDecide).length),'esc.',list(s=>s.reloj&&s.terceroDecide));
console.log('libres de los dos:',S.filter(s=>!s.reloj&&!s.terceroDecide).length+'/8','esc.',list(s=>!s.reloj&&!s.terceroDecide));
console.log('carta que llega por el móvil de un ausente:',S.filter(s=>s.cartaCanal==='mensaje-ausente').length+'/8',pct(S.filter(s=>s.cartaCanal==='mensaje-ausente').length),'· en persona:',list(s=>s.cartaCanal==='en-persona'));
console.log('carta a A:',list(s=>s.cartaA==='a'),'| a B:',list(s=>s.cartaA==='b'),'| turnos globales:',S.map(s=>s.cartaTurno).join(','));
console.log('zona de acuerdo con exactamente 3 salidas:',S.filter(s=>s.salidas===3).length+'/8',pct(S.filter(s=>s.salidas===3).length));
console.log('cierre = recitar una lista de datos en voz alta:',S.filter(s=>s.cierreTipo==='checklist').length+'/8',pct(S.filter(s=>s.cierreTipo==='checklist').length),'· con gesto físico:',list(s=>s.cierreGesto));
console.log('minutos:',S.map(s=>s.minutes).join(','),'· media',(S.reduce((a,s)=>a+s.minutes,0)/N).toFixed(2),'· dentro del techo de §4 (≤6):',S.filter(s=>s.minutes<=6).length+'/8');

console.log('\n=== EXTRA B · EL GÉNERO DEL PODER ===');
const on=S.flatMap(s=>s.onScene.map(r=>({...r,n:s.n})));
const nam=on.filter(r=>r.nombre);
const g=k=>nam.filter(r=>r.gen===k).length;
console.log('roles en escena:',on.length,'· con nombre propio:',nam.length,'· sin nombre / género neutro:',on.length-nam.length);
console.log('  nombrados en escena → mujeres',g('f'),`(${(g('f')/nam.length*100).toFixed(1)} %)`,'· hombres',g('m'),`(${(g('m')/nam.length*100).toFixed(1)} %)`,'· neutros',g('neutro'));
const pod=on.filter(r=>r.poder&&r.nombre);
console.log('  quien manda EN ESCENA y tiene nombre:',pod.map(r=>`${r.nombre} (${r.gen}, esc.${r.n})`).join(' · '));
console.log('    → mujeres',pod.filter(r=>r.gen==='f').length+'/'+pod.length,`(${(pod.filter(r=>r.gen==='f').length/pod.length*100).toFixed(0)} %)`);
const off=S.flatMap(s=>s.offScene.map(r=>({...r,n:s.n})));
const dec=off.filter(r=>r.decide);
console.log('  quien decide FUERA de escena:',dec.map(r=>`${r.nombre} (${r.gen}, esc.${r.n})`).join(' · '));
console.log('    → mujeres',dec.filter(r=>r.gen==='f').length+'/'+dec.length,`(${(dec.filter(r=>r.gen==='f').length/dec.length*100).toFixed(0)} %)`,'· hombres',dec.filter(r=>r.gen==='m').length);
const win=S.filter(s=>s.ganador);
console.log('  escenarios con ganador claro:',win.map(s=>{const r=s.onScene.find(x=>x.rol===s.ganador);const l=s.onScene.find(x=>x.rol!==s.ganador);return `esc.${s.n}: gana ${r.nombre||'(sin nombre)'} [${r.gen}] / pierde ${l.nombre||'(sin nombre)'} [${l.gen}]`}).join(' · '));
const culp=S.filter(s=>s.culpableNombrado);
console.log('  personas nombradas en escena que causan el problema:',culp.map(s=>{const r=s.onScene.find(x=>x.nombre===s.culpableNombrado);return `${r.nombre} [${r.gen}] esc.${s.n}`}).join(' · '));
console.log('    hombres nombrados en escena que son la causa:',nam.filter(r=>r.gen==='m').filter(r=>S.find(s=>s.culpableNombrado===r.nombre)).length+'/'+g('m'));
console.log('    mujeres nombradas en escena que son la causa:',nam.filter(r=>r.gen==='f').filter(r=>S.find(s=>s.culpableNombrado===r.nombre)).length+'/'+g('f'));

console.log('\n=== EXTRA C · NOMBRES REPETIDOS EN EL SET ===');
const all=new Map();
for(const s of S) for(const r of [...s.onScene,...s.offScene]) if(r.nombre&&/^[A-ZÁÉÍÓÚÑ]/.test(r.nombre)){const k=r.nombre;if(!all.has(k))all.set(k,[]);all.get(k).push(s.n);}
for(const [k,v] of all) if(new Set(v).size>1) console.log(`  COLISIÓN: «${k}» aparece como dos personas distintas en los escenarios ${[...new Set(v)].join(' y ')}`);
