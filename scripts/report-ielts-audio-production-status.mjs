#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { mediaBinary } from './lib/ielts-audio-timing.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const args = Object.fromEntries(process.argv.slice(2).map(argument => {
  const [key, ...value] = argument.replace(/^--/u, '').split('=');
  return [key, value.length ? value.join('=') : 'true'];
}));
for (const key of Object.keys(args)) assert.ok(['output-json', 'output-md', 'base-status'].includes(key), `Unknown flag: ${key}`);

const readJson = file => existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : null;
const manifest = readJson(path.join(root, 'config/ielts-audio/production-manifest.json'));
const repairManifest = readJson(path.join(root, 'config/ielts-audio/repair-manifest.json'));
const baseStatus = args['base-status'] ? readJson(path.resolve(args['base-status'])) : null;
const baseBySet = new Map((baseStatus?.sets ?? []).map(row => [row.set, row]));
const audioDuration = file => {
  if (!existsSync(file)) return null;
  const result = spawnSync(mediaBinary('ffprobe'), ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file], { encoding: 'utf8' });
  return result.status === 0 && Number.isFinite(Number(result.stdout.trim())) ? Number(result.stdout.trim()) : null;
};
const productionBySet = new Map();
const productionRoot = path.join(root, 'output/ielts-audio', manifest.manifestSha256);

if (existsSync(productionRoot)) {
  for (const name of readdirSync(productionRoot)) {
    const batch = path.join(productionRoot, name);
    const generation = readJson(path.join(batch, 'generation-log.json'));
    const technical = readJson(path.join(batch, 'technical-qa.json'));
    if (!generation || !technical) continue;
    for (const file of generation.files ?? []) {
      const technicalFile = technical.files?.find(candidate => candidate.setId === file.setId);
      const qa = readJson(path.join(path.dirname(file.path), `staged-asr-qa-set-${file.set}.json`));
      productionBySet.set(file.set, { file, technical, technicalFile, qa });
    }
  }
}

const repairBySet = new Map();
const repairRoot = path.join(root, 'output/ielts-audio-repairs', repairManifest.repairManifestSha256);
if (existsSync(repairRoot)) {
  const generation = readJson(path.join(repairRoot, 'repair-generation-log.json'));
  for (const file of generation?.files ?? []) {
    const qa = readJson(path.join(path.dirname(file.path), `repair-qa-report-set-${file.set}.json`));
    repairBySet.set(file.set, { file, qa });
  }
}

const existingAsrRoot = path.join(root, 'output/ielts-asr', manifest.manifestSha256);
const rows = manifest.rows.map(row => {
  const produced = productionBySet.get(row.set);
  const repaired = repairBySet.get(row.set);
  const existingAsr = readJson(path.join(existingAsrRoot, `asr-report-set-${row.set}.json`));
  const productionPassed = produced?.technical?.status === 'technical_qa_passed_pending_transcript_and_owner_listening_review'
    && produced?.qa?.status === 'PASS'
    && produced.qa.audioSha256 === produced.file.audioSha256
    && produced.qa.manifestSha256 === manifest.manifestSha256;
  const repairPassed = repaired?.qa?.status === 'PASS'
    && repaired.qa.audioSha256 === repaired.file.sha256
    && repaired.qa.repairManifestSha256 === repairManifest.repairManifestSha256;
  const legacyAnswersPresent = existingAsr?.completionEvidenceFound === existingAsr?.completionEvidenceTotal;
  const base = baseBySet.get(row.set);
  let state = 'AUTOMATED_QA_INCOMPLETE';
  let source = 'PUBLIC_LEGACY';
  let completionEvidence = existingAsr ? `${existingAsr.completionEvidenceFound}/${existingAsr.completionEvidenceTotal}` : '0/0';
  let wordErrorRate = existingAsr?.wordErrorRate ?? null;
  let durationSeconds = base?.metrics?.audio?.[0]?.seconds ?? base?.durationSeconds
    ?? audioDuration(path.join(root, 'public', row.audioUrl));
  let nextAction = 'Resolver la evidencia automática faltante antes de revisión humana.';
  if (productionPassed) {
    state = 'AUTO_QA_PASS_PENDING_HUMAN';
    source = 'STAGED_NEW';
    completionEvidence = produced.qa.effectiveCompletionEvidence;
    wordErrorRate = produced.qa.effectiveWordErrorRate ?? produced.qa.globalAsr?.wordErrorRate ?? null;
    durationSeconds = produced.technicalFile?.durationSeconds ?? null;
    nextAction = 'Escucha humana completa Q1–Q40; después publicar por hash.';
  } else if (repairPassed) {
    state = 'AUTO_QA_PASS_PENDING_HUMAN';
    source = 'STAGED_REPAIR';
    completionEvidence = repaired.qa.effectiveCompletionEvidence;
    wordErrorRate = null;
    durationSeconds = audioDuration(repaired.file.path);
    nextAction = 'Escucha humana completa Q1–Q40 de la reparación; después publicar por hash.';
  } else if (legacyAnswersPresent) {
    state = 'LEGACY_ANSWERS_PRESENT_PENDING_HUMAN';
    nextAction = 'Escucha humana completa; decidir conservación o reemplazo según longitud y naturalidad.';
  }
  return {
    set: row.set,
    state,
    source,
    releaseReady: false,
    completionEvidence,
    wordErrorRate,
    durationSeconds,
    listeningScriptWords: row.scriptAudit.totalWords,
    readingWords: base?.metrics?.readingWords ?? base?.readingWords ?? null,
    writing: base?.metrics?.writing ?? base?.writing ?? [],
    task1Image: base?.metrics?.task1Image ?? base?.task1Image ?? null,
    nextAction,
  };
});

const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  productionManifestSha256: manifest.manifestSha256,
  repairManifestSha256: repairManifest.repairManifestSha256,
  publicAudioChanged: false,
  humanReviewRequired: true,
  summary: {
    totalSets: rows.length,
    automatedQaPassed: rows.filter(row => row.state === 'AUTO_QA_PASS_PENDING_HUMAN').length,
    legacyAnswersPresentPendingHuman: rows.filter(row => row.state === 'LEGACY_ANSWERS_PRESENT_PENDING_HUMAN').length,
    answerCoverageComplete: rows.filter(row => {
      const [found, total] = row.completionEvidence.split('/').map(Number);
      return total > 0 && found === total;
    }).length,
    releaseReady: 0,
  },
  sets: rows,
};

const labels = {
  AUTO_QA_PASS_PENDING_HUMAN: 'QA automático aprobado; falta escucha humana',
  LEGACY_ANSWERS_PRESENT_PENDING_HUMAN: 'Respuestas presentes; falta decisión humana',
  AUTOMATED_QA_INCOMPLETE: 'QA automático incompleto',
};
const cell = value => String(value ?? '—').replaceAll('|', '\\|').replaceAll('\n', ' ');
const markdown = [
  '# Estado actual de producción IELTS',
  '',
  `Generado: ${report.generatedAt}`,
  `Manifiesto de producción: \`${manifest.manifestSha256}\``,
  `Cobertura automática de respuestas: **${report.summary.answerCoverageComplete}/20 sets**`,
  `QA automático completo en staging: **${report.summary.automatedQaPassed}/20 sets**`,
  'Publicación: **0/20**; todos requieren escucha humana y el audio público permanece sin cambios.',
  '',
  '| Set | Estado de audio | Fuente | Min | Guion L | Respuestas | WER | Reading | Writing T1/T2 | Imagen T1 | Próxima acción |',
  '|---:|---|---|---:|---:|---:|---:|---:|---|---|---|',
];
for (const row of rows) {
  const minutes = Number.isFinite(row.durationSeconds) ? (row.durationSeconds / 60).toFixed(1) : '—';
  const wer = Number.isFinite(row.wordErrorRate) ? `${(row.wordErrorRate * 100).toFixed(2)}%` : 'reparación focal';
  const writing = row.writing.length ? row.writing.map(task => `${task.stimulusWords}/${task.instructionWords}`).join(' · ') : '—';
  const image = row.task1Image ? `${row.task1Image.dimensions?.width ?? '?'}×${row.task1Image.dimensions?.height ?? '?'}` : '—';
  markdown.push(`| ${row.set} | ${labels[row.state]} | ${row.source} | ${minutes} | ${row.listeningScriptWords} | ${row.completionEvidence} | ${wer} | ${row.readingWords ?? '—'} | ${writing} | ${image} | ${cell(row.nextAction)} |`);
}
markdown.push('', 'Los estados automáticos no sustituyen la escucha humana ni autorizan publicación.', '');

if (args['output-json']) writeFileSync(path.resolve(args['output-json']), `${JSON.stringify(report, null, 2)}\n`);
if (args['output-md']) writeFileSync(path.resolve(args['output-md']), `${markdown.join('\n')}\n`);
console.log(JSON.stringify({ summary: report.summary, outputs: { json: args['output-json'] ?? null, markdown: args['output-md'] ?? null } }, null, 2));
