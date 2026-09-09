#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { sha256 } from './lib/ielts-audio-production.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const manifest = JSON.parse(readFileSync(path.join(root, 'config/ielts-audio/legacy-replacement-manifest.json'), 'utf8'));
const castingBytes = readFileSync(path.join(root, 'config/ielts-audio/legacy-replacement-casting.json'));
const castingSha256 = sha256(castingBytes);
const productionRoot = path.join(root, 'output', manifest.outputNamespace, manifest.manifestSha256);
const outputRoot = path.join(root, 'output/ielts-legacy-replacement-review-2026-09-09');

const reviewChecks = {
  5: [
    { question: 3, time: '02:13', answer: 'cathedral', purpose: 'claridad de respuesta y cambio de turno' },
    { question: 17, time: '09:41', answer: 'hot drinks', purpose: 'entrada después de diálogo largo' },
    { question: 40, time: '27:12', answer: 'water', purpose: 'claridad y cierre del audio' },
  ],
  6: [
    { question: 1, time: '01:33', answer: '3 days', purpose: 'número y respuesta temprana' },
    { question: 17, time: '11:56', answer: 'toddlers', purpose: 'claridad en la mitad del examen' },
    { question: 40, time: '28:22', answer: 'bag', purpose: 'final del examen' },
  ],
  7: [
    { question: 1, time: '01:25', answer: 'Whitcombe', purpose: 'apellido y deletreo W-H-I-T-C-O-M-B-E' },
    { question: 17, time: '12:04', answer: 'diving suit', purpose: 'frase con distractor cercano' },
    { question: 40, time: '29:12', answer: 'caffeine', purpose: 'claridad cerca del final' },
  ],
  8: [
    { question: 2, time: '01:28', answer: '0161 496 0175', purpose: 'teléfono completo' },
    { question: 17, time: '10:30', answer: 'sports centre', purpose: 'distractor de ubicación' },
    { question: 40, time: '28:00', answer: 'quartz', purpose: 'final del examen' },
  ],
  10: [
    { question: 7, time: '04:58', answer: '£11.50', purpose: 'precio hablado con claridad' },
    { question: 21, time: '15:36', answer: 'a community library', purpose: 'respuesta antes ausente; descarta sports hall y railway station' },
    { question: 40, time: '27:44', answer: 'food', purpose: 'final del examen' },
  ],
  11: [
    { question: 1, time: '01:20', answer: 'Redhill', purpose: 'nombre de vía y deletreo R-E-D-H-I-L-L' },
    { question: 17, time: '12:37', answer: 'costumes', purpose: 'claridad de palabra clave' },
    { question: 40, time: '28:30', answer: 'Renaissance', purpose: 'final del examen' },
  ],
  12: [
    { question: 1, time: '01:20', answer: 'Ashgrove', purpose: 'dirección y deletreo A-S-H-G-R-O-V-E' },
    { question: 17, time: '12:26', answer: 'strawberries', purpose: 'claridad de palabra larga' },
    { question: 40, time: '28:14', answer: 'ultraviolet', purpose: 'final del examen' },
  ],
};

function generationDirectories() {
  return readdirSync(productionRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && entry.name.startsWith('sets-'))
    .map(entry => path.join(productionRoot, entry.name));
}

function loadSet(set) {
  for (const directory of generationDirectories()) {
    const logPath = path.join(directory, 'generation-log.json');
    if (!existsSync(logPath)) continue;
    const log = JSON.parse(readFileSync(logPath, 'utf8'));
    const file = log.files?.find(candidate => candidate.set === set);
    if (!file) continue;
    assert.equal(log.status, 'complete_pending_qa');
    assert.equal(log.manifestSha256, manifest.manifestSha256);
    assert.equal(log.castingSha256, castingSha256);
    const technical = JSON.parse(readFileSync(path.join(directory, 'technical-qa.json'), 'utf8'));
    assert.equal(technical.status, 'technical_qa_passed_pending_transcript_and_owner_listening_review');
    assert.equal(technical.manifestSha256, manifest.manifestSha256);
    assert.equal(technical.castingSha256, castingSha256);
    const measurements = technical.files.find(candidate => candidate.setId === file.setId);
    assert.ok(measurements && Object.values(measurements.checks).every(Boolean));
    assert.equal(measurements.audioSha256, file.audioSha256);
    const qaPath = path.join(path.dirname(file.path), `staged-asr-qa-set-${set}.json`);
    const qa = JSON.parse(readFileSync(qaPath, 'utf8'));
    assert.equal(qa.status, 'PASS');
    assert.equal(qa.audioSha256, file.audioSha256);
    assert.equal(qa.manifestSha256, manifest.manifestSha256);
    assert.equal(qa.castingSha256, castingSha256);
    assert.equal(qa.effectiveCompletionEvidence, '33/33');
    assert.deepEqual(qa.unresolvedQuestions, []);
    return {
      set,
      audioPath: file.path,
      audioSha256: file.audioSha256,
      durationSeconds: measurements.durationSeconds,
      audibleSeconds: measurements.timing.audibleSeconds,
      silenceRatio: measurements.timing.silenceRatio,
      integratedLoudnessLufs: measurements.integratedLoudnessLufs,
      truePeakDbfs: measurements.truePeakDbfs,
      effectiveWordErrorRate: qa.effectiveWordErrorRate,
      completionEvidence: qa.effectiveCompletionEvidence,
      technicalStatus: 'PASS',
      asrStatus: 'PASS',
      checks: reviewChecks[set],
      humanReviewTemplate: path.join(path.dirname(file.path), `human-review-set-${set}.template.json`),
    };
  }
  throw new Error(`No generated audio found for Set ${set}`);
}

const sets = manifest.rows.map(row => loadSet(row.set));
const reportCore = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  status: 'AUTOMATIC_QA_PASS_PENDING_HUMAN_REVIEW',
  manifestSha256: manifest.manifestSha256,
  castingSha256,
  modelId: 'eleven_flash_v2_5',
  account: {
    availableCreditsBefore: 53285,
    availableCreditsAfter: 15102,
    observedCreditsConsumed: 38183,
    protectedReserveCredits: 5000,
  },
  sets,
  releaseAuthorized: false,
};
const report = { ...reportCore, reportSha256: sha256(JSON.stringify(reportCore)) };
mkdirSync(outputRoot, { recursive: true });
const jsonPath = path.join(outputRoot, 'review-batch.json');
writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`);

const esc = value => String(value).replace(/[&<>"']/gu, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
const fmtDuration = seconds => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;
const cards = sets.map(item => `
  <article class="card">
    <div class="top"><div><span class="eyebrow">IELTS Listening</span><h2>Set ${item.set}</h2></div><span class="pass">AUTO QA PASS</span></div>
    <audio controls preload="metadata" src="${esc(pathToFileURL(item.audioPath).href)}"></audio>
    <div class="metrics">
      <span><b>${fmtDuration(item.durationSeconds)}</b> duración</span>
      <span><b>${(item.effectiveWordErrorRate * 100).toFixed(2)}%</b> WER</span>
      <span><b>${item.completionEvidence}</b> respuestas</span>
      <span><b>${item.integratedLoudnessLufs.toFixed(2)}</b> LUFS</span>
      <span><b>${item.truePeakDbfs.toFixed(2)}</b> dBTP</span>
    </div>
    <h3>Puntos recomendados</h3>
    <ol>${item.checks.map(check => `<li><button data-time="${check.time}" aria-label="Ir a ${check.time}">${check.time}</button> <b>Q${check.question}: ${esc(check.answer)}</b><small>${esc(check.purpose)}</small></li>`).join('')}</ol>
    <p class="path">${esc(item.audioPath)}</p>
  </article>`).join('');

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Revisión · Reemplazos IELTS Listening</title><style>
:root{color-scheme:dark;--bg:#09100e;--panel:#101b18;--line:#263a34;--ink:#eef8f3;--muted:#91a9a0;--mint:#65e6ad;--gold:#f6c96b}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at 10% 0,#153429 0,transparent 34%),var(--bg);color:var(--ink);font:15px/1.5 ui-sans-serif,system-ui;padding:32px}main{max-width:1100px;margin:auto}.hero{padding:30px;border:1px solid var(--line);border-radius:24px;background:#0d1714cc;margin-bottom:20px}.eyebrow{color:var(--mint);font-size:12px;font-weight:800;letter-spacing:.14em;text-transform:uppercase}h1{font-size:clamp(30px,5vw,52px);line-height:1.05;margin:8px 0 14px}h2{font-size:28px;margin:3px 0}h3{font-size:14px;margin:20px 0 8px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em}.summary{color:var(--muted);max-width:780px}.notice{border-left:3px solid var(--gold);padding:10px 14px;background:#19180f;color:#eadab5}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(330px,1fr));gap:18px}.card{background:var(--panel);border:1px solid var(--line);border-radius:20px;padding:20px}.top{display:flex;justify-content:space-between;align-items:flex-start}.pass{font-size:11px;font-weight:900;color:#05120d;background:var(--mint);padding:5px 8px;border-radius:999px}audio{width:100%;margin:18px 0}.metrics{display:grid;grid-template-columns:repeat(3,1fr);gap:7px}.metrics span{background:#0a1311;border:1px solid #20302b;padding:8px;border-radius:10px;color:var(--muted);font-size:11px}.metrics b{display:block;color:var(--ink);font-size:14px}ol{padding-left:22px;margin:0}li{padding:7px 0}li button{border:1px solid #3a5a50;background:#14241f;color:var(--mint);border-radius:7px;padding:3px 7px;cursor:pointer}li small{display:block;color:var(--muted);margin-left:58px}.path{font:10px/1.35 ui-monospace,monospace;color:#557068;overflow-wrap:anywhere;border-top:1px solid var(--line);padding-top:12px}.footer{color:var(--muted);margin:24px 4px}.footer b{color:var(--ink)}
</style></head><body><main><section class="hero"><span class="eyebrow">Lote de reemplazo · 9 sep 2026</span><h1>7 audios listos para revisión humana</h1><p class="summary">Cada master aprobó formato, duración, densidad audible, silencios, loudness, true peak, fidelidad ASR y 33/33 respuestas de completar. Los botones llevan al punto aproximado en el reproductor de cada set.</p><p class="notice">Estado: pendiente de tu escucha. Estos archivos siguen en staging y no han reemplazado los audios públicos.</p></section><section class="grid">${cards}</section><p class="footer"><b>Créditos:</b> 38.183 observados · 15.102 disponibles · reserva mínima de 5.000 intacta. &nbsp; <b>Manifiesto:</b> ${manifest.manifestSha256}</p></main><script>document.querySelectorAll('.card').forEach(card=>card.querySelectorAll('button[data-time]').forEach(button=>button.addEventListener('click',()=>{const [m,s]=button.dataset.time.split(':').map(Number);const audio=card.querySelector('audio');audio.currentTime=m*60+s;audio.play()})))</script></body></html>`;
const htmlPath = path.join(outputRoot, 'reporte-revision-audios-ielts.html');
writeFileSync(htmlPath, html);
console.log(JSON.stringify({ status: report.status, sets: sets.length, jsonPath, htmlPath, reportSha256: report.reportSha256, releaseAuthorized: false }, null, 2));
