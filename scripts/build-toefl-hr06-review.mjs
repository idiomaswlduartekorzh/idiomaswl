import { readFile, writeFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import path from 'node:path';

const root = process.cwd();
const sourceCommit = '2b6bd7f9d911e4551ceac988e495a904f5e76f96';
const candidateSets = Array.from({ length: 19 }, (_, index) => index + 2);
const sampleSets = new Set([5, 9, 10, 15, 20]);

const batchFiles = [
  ['src/data/toefl/listening-fixed-sets-1-5.ts', 'TOEFL_FIXED_LISTENING_SETS_1_TO_5'],
  ['src/data/toefl/listening-fixed-sets-6-10.ts', 'TOEFL_FIXED_LISTENING_SETS_6_TO_10'],
  ['src/data/toefl/listening-fixed-sets-11-15.ts', 'TOEFL_FIXED_LISTENING_SETS_11_TO_15'],
  ['src/data/toefl/listening-fixed-sets-16-20.ts', 'TOEFL_FIXED_LISTENING_SETS_16_TO_20'],
];

const scoringFiles = [
  'src/server/toefl/listening-fixed-sets-1-5.ts',
  'src/server/toefl/listening-fixed-sets-6-10.ts',
  'src/server/toefl/listening-fixed-sets-11-15.ts',
  'src/server/toefl/listening-fixed-sets-16-20.ts',
];

const fixedSets = new Map();
for (const [relativePath, exportName] of batchFiles) {
  const module = await import(pathToFileURL(path.join(root, relativePath)).href);
  for (const set of module[exportName]) fixedSets.set(set.setNumber, set);
}

const fixedKeys = new Map();
for (const relativePath of scoringFiles) {
  const source = await readFile(path.join(root, relativePath), 'utf8');
  for (const match of source.matchAll(/^\s*(\d+):\s*\[([^\]]+)\],?$/gm)) {
    fixedKeys.set(Number(match[1]), [...match[2].matchAll(/'([A-D])'/g)].map((entry) => entry[1]));
  }
}

function fixedEntries(set) {
  const withStimulus = (entry, sectionLabel) => ({
    item: entry.item,
    audioUrl: entry.plannedAudioUrl,
    script: entry.script,
    instructions: 'Escucha la intervención y elige la mejor respuesta.',
    sectionLabel,
  });
  const longItems = (stimulus, sectionLabel) => stimulus.items.map((item) => ({
    item,
    audioUrl: stimulus.plannedAudioUrl,
    script: stimulus.script,
    instructions: stimulus.instructions,
    sectionLabel,
  }));
  return [
    ...set.module1ChooseAdditions.map((entry) => withStimulus(entry, 'Módulo 1 · respuesta breve')),
    ...set.module2.choose.map((entry) => withStimulus(entry, 'Módulo 2 · respuesta breve')),
    ...longItems(set.module2.conversation, 'Módulo 2 · conversación'),
    ...longItems(set.module2.announcement, 'Módulo 2 · anuncio'),
    ...longItems(set.module2.academic, 'Módulo 2 · charla académica'),
  ];
}

const reviewItems = [];
for (const setNumber of candidateSets) {
  const candidatePath = path.join(root, `docs/toefl-listening-set${setNumber}-options-candidate.json`);
  const candidate = JSON.parse(await readFile(candidatePath, 'utf8'));
  const mockModule = await import(pathToFileURL(path.join(root, `src/data/mocks/toefl-set-${setNumber}.ts`)).href);
  const legacy = new Map();

  for (const section of mockModule.default.sections.filter((entry) => entry.skill === 'listening')) {
    for (const question of section.questions ?? []) {
      if (question.type !== 'mcq') continue;
      legacy.set(question.id, {
        item: {
          id: `item:${question.id}-fixed-v1`,
          prompt: question.text,
          options: question.options.map((text) => ({ text })),
        },
        audioUrl: question.audioUrl ?? section.audioUrl,
        script: section.transcript ?? null,
        instructions: section.instructions,
        sectionLabel: section.title.replace(/^Listening\s*[—-]\s*/, ''),
        correctIndex: question.answer,
      });
    }
  }

  const fixed = fixedEntries(fixedSets.get(setNumber));
  const labels = fixedKeys.get(setNumber);
  if (!labels || labels.length !== fixed.length) {
    throw new Error(`No se pudieron resolver las ${fixed.length} claves nuevas del Set ${setNumber}.`);
  }
  const expanded = new Map(fixed.map((entry, index) => [entry.item.id, {
    ...entry,
    correctIndex: labels[index].charCodeAt(0) - 65,
  }]));

  for (const [position, candidateItem] of candidate.items.entries()) {
    const legacyId = candidateItem.id.replace(/^item:/, '').replace(/-fixed-v1$/, '');
    const source = candidateItem.id.endsWith('-fixed-v1') ? legacy.get(legacyId) : expanded.get(candidateItem.id);
    if (!source) throw new Error(`No se encontró la fuente de ${candidateItem.id}.`);
    const before = source.item.options.map((option) => option.text);
    const after = candidateItem.options;
    reviewItems.push({
      id: candidateItem.id,
      setNumber,
      position: position + 1,
      sectionLabel: source.sectionLabel,
      prompt: source.item.prompt,
      audioUrl: `../public${source.audioUrl}`,
      script: source.script,
      instructions: source.instructions,
      correctIndex: source.correctIndex,
      before,
      after,
      rationale: candidateItem.rationale,
      priorityAudio: setNumber >= 8 && setNumber <= 20 && /^item:t\d+-l-cr[1-5]-fixed-v1$/.test(candidateItem.id),
      fixedSample: sampleSets.has(setNumber),
    });
  }
}

if (reviewItems.length !== 646) throw new Error(`Se esperaban 646 ítems y se generaron ${reviewItems.length}.`);
const priorityCount = reviewItems.filter((item) => item.priorityAudio).length;
if (priorityCount !== 65) throw new Error(`Se esperaban 65 contrastes auditivos prioritarios y se generaron ${priorityCount}.`);

const data = JSON.stringify(reviewItems).replaceAll('<', '\\u003c');
const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Revisión académica HR-06 · TOEFL Listening</title>
  <style>
    :root{color-scheme:light;--ink:#172033;--muted:#647086;--line:#dce2ed;--paper:#fff;--bg:#f3f5f9;--blue:#3157d5;--green:#087a55;--green-bg:#e9f8f1;--red:#b42318;--red-bg:#fff0ee;--amber:#9a6700;--amber-bg:#fff6d8}
    *{box-sizing:border-box} body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}
    header{background:#12203d;color:white;padding:24px clamp(18px,4vw,56px)} header h1{margin:0 0 6px;font-size:clamp(24px,4vw,36px)} header p{margin:0;color:#d7e0f4}
    main{max-width:1080px;margin:0 auto;padding:24px 18px 64px}.card{background:var(--paper);border:1px solid var(--line);border-radius:16px;box-shadow:0 8px 28px #1c2b4a0b;padding:20px;margin-bottom:18px}
    .what{border-left:6px solid var(--blue)} h2,h3{margin-top:0}.what ol{margin-bottom:0}.warning{background:var(--amber-bg);border:1px solid #f1d47a;border-radius:10px;padding:12px 14px}
    .toolbar{display:grid;grid-template-columns:2fr 1fr 1fr;gap:12px}.toolbar label{font-size:13px;color:var(--muted);font-weight:700}.toolbar select{display:block;width:100%;margin-top:5px;padding:10px;border:1px solid var(--line);border-radius:9px;background:white;font-size:15px}
    .progress{height:10px;background:#e8ecf3;border-radius:99px;overflow:hidden;margin:14px 0 7px}.progress>span{display:block;height:100%;background:var(--blue);width:0}.small{color:var(--muted);font-size:13px}
    .item-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start}.eyebrow{color:var(--blue);font-weight:800;font-size:13px;text-transform:uppercase;letter-spacing:.04em}.tag{display:inline-block;background:#eef2ff;color:#3347a4;border-radius:99px;padding:4px 9px;font-size:12px;font-weight:800}
    audio{width:100%;margin:16px 0}.prompt{font-size:20px;font-weight:750;margin:8px 0 16px}.options{display:grid;gap:10px}.option{position:relative;border:1px solid var(--line);border-radius:12px;padding:13px 14px 12px 52px}.option.correct{border:2px solid var(--green);background:var(--green-bg)}
    .letter{position:absolute;left:14px;top:13px;width:27px;height:27px;border:1px solid #aeb8c9;border-radius:50%;display:grid;place-items:center;font-weight:800}.correct .letter{background:var(--green);border-color:var(--green);color:#fff}.answer-badge{color:var(--green);font-size:11px;font-weight:900;text-transform:uppercase;margin-left:8px}.counts{color:var(--muted);font-size:12px;margin-top:5px}.before{color:#765b00;background:#fff9e7;border-radius:7px;padding:7px 9px;margin-top:8px;font-size:13px}.before s{text-decoration-thickness:1px}
    details{margin-top:15px;border-top:1px solid var(--line);padding-top:12px} summary{cursor:pointer;color:var(--blue);font-weight:700}.script{white-space:pre-wrap;background:#f7f8fb;border-radius:9px;padding:13px;margin-top:10px;font-size:14px}.rationale{font-size:13px;color:var(--muted)}
    .checks{display:grid;gap:9px;margin:16px 0}.checks label{display:flex;gap:9px;align-items:flex-start}.checks input{margin-top:5px}.notes{width:100%;min-height:76px;border:1px solid var(--line);border-radius:9px;padding:10px;font:inherit}
    .actions,.nav{display:flex;gap:10px;flex-wrap:wrap;margin-top:13px}.nav{justify-content:space-between}.btn{border:0;border-radius:9px;padding:10px 14px;font-weight:800;cursor:pointer}.btn:disabled{opacity:.45;cursor:not-allowed}.primary{background:var(--green);color:white}.danger{background:var(--red);color:white}.secondary{background:#e9edf5;color:var(--ink)}.download{background:var(--blue);color:white}.status{font-size:13px;font-weight:800;margin-top:10px}.status.ok{color:var(--green)}.status.issue{color:var(--red)}
    @media(max-width:720px){.toolbar{grid-template-columns:1fr}.item-head{display:block}.item-head .tag{margin-top:8px}}
  </style>
</head>
<body>
<header><h1>Revisión académica HR-06</h1><p>TOEFL Listening · corrección del sesgo de longitud · Sets 2–20</p></header>
<main>
  <section class="card what">
    <h2>Esto es exactamente lo que debes revisar</h2>
    <ol>
      <li><strong>Escucha el audio completo.</strong></li>
      <li><strong>Mira la opción verde:</strong> debe ser la respuesta correcta a lo escuchado.</li>
      <li><strong>Revisa las otras tres:</strong> deben sonar posibles, pero ser claramente incorrectas.</li>
      <li><strong>Compara “Antes” con la redacción nueva:</strong> el cambio de longitud no debe alterar el significado ni sonar artificial.</li>
      <li>Marca las cuatro casillas y pulsa <strong>Aprobar este ítem</strong>, o escribe el problema y pulsa <strong>Necesita corrección</strong>.</li>
    </ol>
    <p class="warning"><strong>Empieza por “65 audios prioritarios”.</strong> Son las cinco respuestas breves de los Sets 8–20 que todavía necesitan contraste auditivo humano.</p>
  </section>
  <section class="card">
    <div class="toolbar">
      <label>Alcance<select id="scope"><option value="priority">65 audios prioritarios</option><option value="sample">Muestra fija: Sets 5, 9, 10, 15 y 20</option><option value="all">Todo: Sets 2–20 (646)</option></select></label>
      <label>Set<select id="set"><option value="all">Todos</option>${candidateSets.map((n) => `<option value="${n}">Set ${n}</option>`).join('')}</select></label>
      <label>Estado<select id="status"><option value="all">Todos</option><option value="pending">Pendientes</option><option value="approved">Aprobados</option><option value="issue">Con corrección</option></select></label>
    </div>
    <div class="progress"><span id="bar"></span></div><div id="progressText" class="small"></div>
  </section>
  <section id="item" class="card"></section>
  <section class="card">
    <div class="nav"><button class="btn secondary" id="prev">← Anterior</button><span id="index" class="small"></span><button class="btn secondary" id="next">Siguiente →</button></div>
    <div class="actions"><button class="btn download" id="download">Descargar decisiones</button><button class="btn secondary" id="clearChecks">Limpiar casillas de este ítem</button></div>
  </section>
</main>
<script>
const ITEMS=${data};
const STORE='toefl-hr06-review-${sourceCommit.slice(0,8)}';
const saved=JSON.parse(localStorage.getItem(STORE)||'{}'); let cursor=0; let visible=[];
const el=(id)=>document.getElementById(id); const letters=['A','B','C','D'];
const words=(text)=>(text.trim().match(/\\S+/g)||[]).length;
const esc=(text)=>String(text??'').replace(/[&<>"']/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function state(id){return saved[id]||{decision:'pending',checks:[false,false,false,false],notes:''}}
function persist(){localStorage.setItem(STORE,JSON.stringify(saved))}
function applyFilters(){
  const scope=el('scope').value,set=el('set').value,status=el('status').value;
  visible=ITEMS.filter((x)=>(scope==='all'||scope==='priority'&&x.priorityAudio||scope==='sample'&&x.fixedSample)&&(set==='all'||x.setNumber===Number(set))&&(status==='all'||state(x.id).decision===status));
  cursor=Math.min(cursor,Math.max(visible.length-1,0)); render();
}
function optionHtml(item,text,i){
  const old=item.before[i],changed=old!==text,correct=i===item.correctIndex;
  return '<div class="option '+(correct?'correct':'')+'"><span class="letter">'+letters[i]+'</span><strong>'+esc(text)+'</strong>'+(correct?'<span class="answer-badge">clave esperada</span>':'')+'<div class="counts">'+words(text)+' palabras'+(changed?' · antes '+words(old):' · sin cambio')+'</div>'+(changed?'<div class="before"><strong>Antes:</strong> <s>'+esc(old)+'</s></div>':'')+'</div>';
}
function render(){
  const reviewed=visible.filter((x)=>state(x.id).decision!=='pending').length,total=visible.length;
  el('bar').style.width=(total?reviewed/total*100:0)+'%'; el('progressText').textContent=reviewed+' de '+total+' revisados en este filtro';
  el('index').textContent=total?(cursor+1)+' / '+total:'0 / 0'; el('prev').disabled=cursor<=0;el('next').disabled=cursor>=total-1;
  if(!total){el('item').innerHTML='<h2>No hay ítems con estos filtros.</h2>';return}
  const item=visible[cursor],s=state(item.id),changed=item.after.filter((x,i)=>x!==item.before[i]).length;
  el('item').innerHTML='<div class="item-head"><div><div class="eyebrow">Set '+item.setNumber+' · pregunta '+item.position+' de 34</div><h2>'+esc(item.sectionLabel)+'</h2></div><span class="tag">'+(item.priorityAudio?'Audio prioritario':'Revisión completa')+'</span></div>'+
    '<p class="small">'+esc(item.instructions||'')+'</p><audio controls preload="metadata" src="'+esc(item.audioUrl)+'"></audio><div class="prompt">'+esc(item.prompt)+'</div><div class="options">'+item.after.map((x,i)=>optionHtml(item,x,i)).join('')+'</div>'+
    (item.script?'<details><summary>Ver transcripción o guion después de escuchar</summary><div class="script">'+esc(item.script)+'</div></details>':'')+'<details><summary>Ver justificación editorial</summary><p class="rationale">'+esc(item.rationale)+'</p></details>'+
    '<h3 style="margin-top:20px">Confirmación</h3><div class="checks">'+[
      'El audio y la pregunta corresponden.',
      'La opción verde conserva el significado correcto.',
      'Los tres distractores son plausibles y claramente incorrectos.',
      'La redacción nueva suena natural y no revela la clave por longitud.'
    ].map((label,i)=>'<label><input type="checkbox" data-check="'+i+'" '+(s.checks[i]?'checked':'')+'><span>'+label+'</span></label>').join('')+'</div><textarea class="notes" id="notes" placeholder="Observación o corrección concreta...">'+esc(s.notes)+'</textarea><div class="actions"><button class="btn primary" id="approve" '+(s.checks.every(Boolean)?'':'disabled')+'>Aprobar este ítem</button><button class="btn danger" id="issue">Necesita corrección</button></div><div class="status '+(s.decision==='approved'?'ok':s.decision==='issue'?'issue':'')+'">Estado: '+(s.decision==='approved'?'APROBADO':s.decision==='issue'?'NECESITA CORRECCIÓN':'PENDIENTE')+' · '+changed+' opciones modificadas</div>';
  document.querySelectorAll('[data-check]').forEach((box)=>box.addEventListener('change',()=>{const current=state(item.id);current.checks[Number(box.dataset.check)]=box.checked;saved[item.id]=current;persist();el('approve').disabled=!current.checks.every(Boolean)}));
  el('notes').addEventListener('input',(e)=>{const current=state(item.id);current.notes=e.target.value;saved[item.id]=current;persist()});
  el('approve').onclick=()=>decide(item,'approved'); el('issue').onclick=()=>decide(item,'issue');
}
function decide(item,decision){const s=state(item.id);s.decision=decision;saved[item.id]=s;persist();if(cursor<visible.length-1)cursor++;applyFilters()}
['scope','set','status'].forEach((id)=>el(id).addEventListener('change',()=>{cursor=0;applyFilters()}));
el('prev').onclick=()=>{if(cursor>0){cursor--;render();scrollTo({top:document.querySelector('#item').offsetTop-10,behavior:'smooth'})}};
el('next').onclick=()=>{if(cursor<visible.length-1){cursor++;render();scrollTo({top:document.querySelector('#item').offsetTop-10,behavior:'smooth'})}};
el('clearChecks').onclick=()=>{if(!visible.length)return;const s=state(visible[cursor].id);s.checks=[false,false,false,false];saved[visible[cursor].id]=s;persist();render()};
el('download').onclick=()=>{const decisions=ITEMS.map((x)=>({id:x.id,setNumber:x.setNumber,...state(x.id)})).filter((x)=>x.decision!=='pending'||x.notes);const payload={artifactType:'toefl-hr06-human-review-decisions',sourceCommit:'${sourceCommit}',exportedAt:new Date().toISOString(),summary:{approved:decisions.filter(x=>x.decision==='approved').length,issues:decisions.filter(x=>x.decision==='issue').length,totalScope:646},decisions};const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='toefl-hr06-decisiones.json';a.click();URL.revokeObjectURL(a.href)};
applyFilters();
</script>
</body></html>`;

const output = path.join(root, 'docs/toefl-hr06-review.html');
await writeFile(output, html);
console.log(`✓ ${path.relative(root, output)}: ${reviewItems.length} ítems; ${priorityCount} audios prioritarios.`);
