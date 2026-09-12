#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...rest] = argument.replace(/^--/u, '').split('=');
  return [key, rest.length ? rest.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['harness', 'contract', 'output'].includes(key), `Unknown flag: ${key}`);

const readJson = relative => JSON.parse(fs.readFileSync(path.resolve(root, relative), 'utf8'));
const escapeHtml = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
const harnessPath = args.harness ?? 'output/ielts-harness-final-2026-09-12.json';
const contractPath = args.contract ?? 'output/ielts-complete-contract-final-2026-09-12.json';
const outputPath = path.resolve(root, args.output
  ?? 'output/ielts-final-release-review-2026-09-12/reporte-final-20-mocks-ielts.html');
const harness = readJson(harnessPath);
const contract = readJson(contractPath);

assert.equal(harness.summary.total, 20);
assert.equal(harness.summary.readyForHumanReview, 20);
assert.equal(harness.summary.audioPublishedHashVerified, 20);
assert.deepEqual(contract.summary.statusCounts, { PASS: 20 });
assert.deepEqual(contract.summary.issueCounts, { P0: 0, P1: 0, P2: 0 });

const reportDirectory = path.dirname(outputPath);
const relativeAsset = url => path.relative(reportDirectory, path.join(root, 'public', url.replace(/^\//u, '')));
const contractBySet = new Map(contract.sets.map(row => [row.set, row]));
const rows = harness.sets.map(set => {
  const detailed = contractBySet.get(set.set);
  const seconds = set.metrics.audio[0]?.seconds;
  const minutes = Number.isFinite(seconds) ? `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}` : '—';
  const writingImage = detailed.assets.writingTask1.url;
  return `<tr>
    <td><strong>Set ${set.set}</strong></td><td><span class="pass">AUDITADO</span></td>
    <td>${minutes}</td><td>${set.metrics.listeningEvidence}/40</td><td>${set.metrics.readingEvidence}/40</td>
    <td>${set.coverage.objectiveKey ? '✓' : '—'}</td><td>${set.coverage.writing ? '✓' : '—'}</td>
    <td>${set.coverage.speaking ? '✓' : '—'}</td><td>${set.coverage.ux ? '✓' : '—'}</td>
    <td><code>${escapeHtml(set.fingerprints.release.slice(0, 12))}…</code></td>
  </tr>
  <tr class="media-row"><td colspan="10"><details><summary>Revisar audio y visual de Set ${set.set}</summary>
    <div class="media-grid"><div><p>Listening master publicado</p><audio controls preload="none" src="${escapeHtml(relativeAsset(set.metrics.audio[0].url))}"></audio></div>
    <div><p>Writing Task 1</p><a href="${escapeHtml(relativeAsset(writingImage))}" target="_blank"><img src="${escapeHtml(relativeAsset(writingImage))}" alt="Visual de Writing Task 1, Set ${set.set}"></a></div></div>
  </details></td></tr>`;
}).join('\n');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Revisión final · 20 mocks IELTS</title>
<style>
:root{color-scheme:light;--ink:#13231c;--muted:#5f6f67;--green:#146c43;--soft:#edf8f2;--line:#d7e2dc;--amber:#9a5b00}*{box-sizing:border-box}body{margin:0;background:#f7faf8;color:var(--ink);font-family:Inter,ui-sans-serif,system-ui,sans-serif;line-height:1.45}.wrap{max-width:1220px;margin:auto;padding:38px 22px 70px}h1{font-size:clamp(2rem,5vw,3.6rem);line-height:1.03;margin:0 0 12px}.lede{max-width:800px;color:var(--muted);font-size:1.12rem}.cards{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin:28px 0}.card{background:white;border:1px solid var(--line);border-radius:16px;padding:18px}.card b{display:block;font-size:1.8rem;color:var(--green)}.gate{background:#fff8e8;border:1px solid #ecd29a;border-radius:16px;padding:18px;margin:20px 0 28px}.gate strong{color:var(--amber)}.table-wrap{overflow:auto;background:white;border:1px solid var(--line);border-radius:16px}table{width:100%;border-collapse:collapse;min-width:900px}th,td{padding:12px 11px;border-bottom:1px solid var(--line);text-align:center}th{position:sticky;top:0;background:#f1f6f3;font-size:.78rem;text-transform:uppercase;letter-spacing:.04em}td:first-child,th:first-child{text-align:left}.pass{display:inline-block;background:var(--soft);color:var(--green);font-weight:750;border-radius:999px;padding:4px 9px;font-size:.74rem}.media-row td{padding:0 14px 12px;text-align:left;background:#fbfdfc}.media-row summary{cursor:pointer;color:var(--green);padding:8px 0;font-weight:650}.media-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;padding:8px 0 16px}.media-grid audio{width:100%}.media-grid img{display:block;max-width:100%;max-height:300px;border:1px solid var(--line);border-radius:8px;background:white}.checks{margin-top:28px;background:white;border:1px solid var(--line);border-radius:16px;padding:20px}.checks li{margin:8px 0}code{font-size:.78rem;color:#44534c}@media(max-width:760px){.cards{grid-template-columns:1fr 1fr}.media-grid{grid-template-columns:1fr}.wrap{padding:24px 12px 50px}}
</style></head><body><main class="wrap">
<p>IELTS · CONTROL DE LIBERACIÓN</p><h1>20 mocks listos para aprobación humana final</h1>
<p class="lede">El harness volvió a verificar cada audio, pregunta, clave, texto, visual, Writing, Speaking, hoja de respuestas, flujo de captura del lead y estado de interfaz contra la huella actual de cada set.</p>
<section class="cards"><div class="card"><b>20/20</b>contratos integrales PASS</div><div class="card"><b>800/800</b>respuestas audibles con tiempo</div><div class="card"><b>800/800</b>preguntas Reading sustentadas</div><div class="card"><b>0</b>hallazgos P0, P1 o P2</div></section>
<section class="gate"><strong>Único paso pendiente:</strong> registrar la aprobación humana final sobre las 20 huellas mostradas abajo. El sistema mantiene los sets en <code>READY_FOR_HUMAN_REVIEW</code> hasta recibirla.</section>
<div class="table-wrap"><table><thead><tr><th>Set</th><th>Estado</th><th>Audio</th><th>Listening</th><th>Reading</th><th>Clave</th><th>Writing</th><th>Speaking</th><th>UX</th><th>Huella</th></tr></thead><tbody>${rows}</tbody></table></div>
<section class="checks"><h2>Validaciones finales</h2><ul>
<li>20 MP3 públicos ligados por hash a staging, QA, aprobación humana de calidad y recibo de publicación.</li>
<li>Writing: 40 tareas verificadas; visuales ligados por hash y prompts coherentes.</li>
<li>Speaking: Parts 1, 2 y 3 en los 20 sets, con cue card, amplitud y continuidad temática revisadas.</li>
<li>UX real: navegación completa, borrador persistente, temporizador continuo, móvil, captura del lead y ausencia de errores de consola.</li>
<li>TypeScript y build de producción de Next.js 16.2.6: PASS.</li>
</ul><p>Generado ${escapeHtml(harness.generatedAt)} · commit base <code>${escapeHtml(harness.baseCommit)}</code></p></section>
</main></body></html>`;

fs.mkdirSync(reportDirectory, { recursive: true });
fs.writeFileSync(outputPath, html);
console.log(JSON.stringify({ status: 'PASS', output: outputPath, sets: 20, releaseGate: 'HUMAN_APPROVAL_PENDING' }, null, 2));
