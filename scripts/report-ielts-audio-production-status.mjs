#!/usr/bin/env node

import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
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
const legacyReplacementManifest = readJson(path.join(root, 'config/ielts-audio/legacy-replacement-manifest.json'));
const castingSha256 = createHash('sha256').update(readFileSync(path.join(root, 'config/ielts-audio/voice-casting.json'))).digest('hex');
const legacyReplacementCastingSha256 = createHash('sha256').update(readFileSync(path.join(root, 'config/ielts-audio/legacy-replacement-casting.json'))).digest('hex');
const batchApproval = readJson(path.join(root, 'config/ielts-audio/batch-quality-approval.json'));
const legacyReplacementApproval = readJson(path.join(root, 'config/ielts-audio/legacy-replacement-quality-approval.json'));
const legacyDecision = readJson(path.join(root, 'config/ielts-audio/legacy-audio-audit-decision.json'));
const { approvalSha256, ...batchApprovalCore } = batchApproval ?? {};
const computedApprovalSha256 = createHash('sha256').update(JSON.stringify(batchApprovalCore)).digest('hex');
assert.equal(approvalSha256, computedApprovalSha256, 'Batch quality approval digest is stale');
assert.equal(batchApproval.status, 'APPROVED', 'Batch quality approval is not approved');
assert.equal(batchApproval.productionManifestSha256, manifest.manifestSha256, 'Batch quality approval belongs to a stale production manifest');
assert.equal(batchApproval.repairManifestSha256, repairManifest.repairManifestSha256, 'Batch quality approval belongs to a stale repair manifest');
assert.equal(batchApproval.castingSha256, castingSha256, 'Batch quality approval belongs to a stale casting and assembly policy');
const qualityApprovalBySet = new Map(batchApproval.files.map(file => [file.set, file]));
const { approvalSha256: legacyReplacementApprovalSha256, ...legacyReplacementApprovalCore } = legacyReplacementApproval ?? {};
const computedLegacyReplacementApprovalSha256 = createHash('sha256').update(JSON.stringify(legacyReplacementApprovalCore)).digest('hex');
assert.equal(legacyReplacementApprovalSha256, computedLegacyReplacementApprovalSha256, 'Legacy replacement quality approval digest is stale');
assert.equal(legacyReplacementApproval.status, 'APPROVED', 'Legacy replacement quality approval is not approved');
assert.equal(legacyReplacementApproval.manifestSha256, legacyReplacementManifest.manifestSha256, 'Legacy replacement quality approval belongs to a stale manifest');
assert.equal(legacyReplacementApproval.castingSha256, legacyReplacementCastingSha256, 'Legacy replacement quality approval belongs to stale casting');
assert.equal(legacyReplacementApproval.releaseAuthorized, false, 'Quality approval must not authorize release');
const legacyReplacementQualityApprovalBySet = new Map(legacyReplacementApproval.files.map(file => [file.set, file]));
const { decisionSha256, ...legacyDecisionCore } = legacyDecision ?? {};
const computedLegacyDecisionSha256 = createHash('sha256').update(JSON.stringify(legacyDecisionCore)).digest('hex');
assert.equal(decisionSha256, computedLegacyDecisionSha256, 'Legacy audio audit decision digest is stale');
assert.equal(legacyDecision.status, 'REPLACE_RECOMMENDED', 'Legacy audio audit decision is not final');
assert.equal(legacyDecision.productionManifestSha256, manifest.manifestSha256, 'Legacy audio audit decision belongs to a stale production manifest');
assert.equal(legacyReplacementManifest.sourceProductionManifestSha256, manifest.manifestSha256, 'Legacy replacements belong to a stale production manifest');
assert.equal(legacyReplacementManifest.legacyAudioAuditDecisionSha256, legacyDecision.decisionSha256, 'Legacy replacements belong to a stale audit decision');
const legacyAuditBySet = new Map(legacyDecision.sets.map(row => [row.set, row]));
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
      productionBySet.set(file.set, { file, generation, technical, technicalFile, qa });
    }
  }
}

const repairBySet = new Map();
const repairRoot = path.join(root, 'output/ielts-audio-repairs', repairManifest.repairManifestSha256);
if (existsSync(repairRoot)) {
  const generation = readJson(path.join(repairRoot, 'repair-generation-log.json'));
  for (const file of generation?.files ?? []) {
    const qa = readJson(path.join(path.dirname(file.path), `repair-qa-report-set-${file.set}.json`));
    repairBySet.set(file.set, { file, generation, qa });
  }
}

const legacyReplacementBySet = new Map();
const legacyReplacementRoot = path.join(root, 'output', legacyReplacementManifest.outputNamespace, legacyReplacementManifest.manifestSha256);
if (existsSync(legacyReplacementRoot)) {
  for (const name of readdirSync(legacyReplacementRoot)) {
    const batch = path.join(legacyReplacementRoot, name);
    const generation = readJson(path.join(batch, 'generation-log.json'));
    const technical = readJson(path.join(batch, 'technical-qa.json'));
    if (!generation || !technical) continue;
    for (const file of generation.files ?? []) {
      const technicalFile = technical.files?.find(candidate => candidate.setId === file.setId);
      const qa = readJson(path.join(path.dirname(file.path), `staged-asr-qa-set-${file.set}.json`));
      legacyReplacementBySet.set(file.set, { file, generation, technical, technicalFile, qa });
    }
  }
}

const existingAsrRoot = path.join(root, 'output/ielts-asr', manifest.manifestSha256);
const rows = manifest.rows.map(row => {
  const produced = productionBySet.get(row.set);
  const repaired = repairBySet.get(row.set);
  const legacyReplacement = legacyReplacementBySet.get(row.set);
  const existingAsr = readJson(path.join(existingAsrRoot, `asr-report-set-${row.set}.json`));
  const productionPassed = produced?.technical?.status === 'technical_qa_passed_pending_transcript_and_owner_listening_review'
    && produced?.qa?.status === 'PASS'
    && produced?.generation?.castingSha256 === castingSha256
    && produced?.technical?.castingSha256 === castingSha256
    && produced?.qa?.castingSha256 === castingSha256
    && produced.qa.audioSha256 === produced.file.audioSha256
    && produced.qa.manifestSha256 === manifest.manifestSha256;
  const repairPassed = repaired?.qa?.status === 'PASS'
    && repaired?.generation?.castingSha256 === castingSha256
    && repaired?.qa?.castingSha256 === castingSha256
    && repaired.qa.audioSha256 === repaired.file.sha256
    && repaired.qa.repairManifestSha256 === repairManifest.repairManifestSha256;
  const legacyReplacementPassed = legacyReplacement?.technical?.status === 'technical_qa_passed_pending_transcript_and_owner_listening_review'
    && legacyReplacement?.qa?.status === 'PASS'
    && legacyReplacement?.generation?.castingSha256 === legacyReplacementCastingSha256
    && legacyReplacement?.technical?.castingSha256 === legacyReplacementCastingSha256
    && legacyReplacement?.qa?.castingSha256 === legacyReplacementCastingSha256
    && legacyReplacement.qa.audioSha256 === legacyReplacement.file.audioSha256
    && legacyReplacement.qa.manifestSha256 === legacyReplacementManifest.manifestSha256;
  const legacyAnswersPresent = existingAsr?.completionEvidenceFound === existingAsr?.completionEvidenceTotal;
  const currentStaged = productionPassed
    ? { source: 'STAGED_NEW', audioSha256: produced.file.audioSha256 }
    : repairPassed ? { source: 'STAGED_REPAIR', audioSha256: repaired.file.sha256 }
      : legacyReplacementPassed ? { source: 'STAGED_LEGACY_REPLACEMENT', audioSha256: legacyReplacement.file.audioSha256 } : null;
  const qualityApproval = currentStaged?.source === 'STAGED_LEGACY_REPLACEMENT'
    ? legacyReplacementQualityApprovalBySet.get(row.set)
    : qualityApprovalBySet.get(row.set);
  const audioQualityApproved = Boolean(currentStaged)
    && qualityApproval?.source === currentStaged.source
    && qualityApproval?.audioSha256 === currentStaged.audioSha256;
  const base = baseBySet.get(row.set);
  const legacySetDecision = legacyAuditBySet.get(row.set);
  const publicAudioPath = path.join(root, 'public', row.audioUrl);
  const publicAudioSha256 = existsSync(publicAudioPath)
    ? createHash('sha256').update(readFileSync(publicAudioPath)).digest('hex')
    : null;
  const legacyReplacementRecommended = legacySetDecision?.recommendation === 'REPLACE'
    && legacySetDecision?.audioSha256 === publicAudioSha256;
  let state = 'AUTOMATED_QA_INCOMPLETE';
  let source = 'PUBLIC_LEGACY';
  let completionEvidence = existingAsr ? `${existingAsr.completionEvidenceFound}/${existingAsr.completionEvidenceTotal}` : '0/0';
  let wordErrorRate = existingAsr?.wordErrorRate ?? null;
  let durationSeconds = base?.metrics?.audio?.[0]?.seconds ?? base?.durationSeconds
    ?? audioDuration(path.join(root, 'public', row.audioUrl));
  let nextAction = 'Resolver la evidencia automática faltante antes de revisión humana.';
  if (productionPassed) {
    state = audioQualityApproved ? 'BATCH_QUALITY_APPROVED_PENDING_Q40' : 'AUTO_QA_PASS_PENDING_HUMAN';
    source = 'STAGED_NEW';
    completionEvidence = produced.qa.effectiveCompletionEvidence;
    wordErrorRate = produced.qa.effectiveWordErrorRate ?? produced.qa.globalAsr?.wordErrorRate ?? null;
    durationSeconds = produced.technicalFile?.durationSeconds ?? null;
    nextAction = 'Escucha humana completa Q1–Q40; después publicar por hash.';
  } else if (repairPassed) {
    state = audioQualityApproved ? 'BATCH_QUALITY_APPROVED_PENDING_Q40' : 'AUTO_QA_PASS_PENDING_HUMAN';
    source = 'STAGED_REPAIR';
    completionEvidence = repaired.qa.effectiveCompletionEvidence;
    wordErrorRate = null;
    durationSeconds = audioDuration(repaired.file.path);
    nextAction = 'Escucha humana completa Q1–Q40 de la reparación; después publicar por hash.';
  } else if (legacyReplacementPassed) {
    state = audioQualityApproved ? 'BATCH_QUALITY_APPROVED_PENDING_Q40' : 'AUTO_QA_PASS_PENDING_HUMAN';
    source = 'STAGED_LEGACY_REPLACEMENT';
    completionEvidence = legacyReplacement.qa.effectiveCompletionEvidence;
    wordErrorRate = legacyReplacement.qa.effectiveWordErrorRate ?? legacyReplacement.qa.globalAsr?.wordErrorRate ?? null;
    durationSeconds = legacyReplacement.technicalFile?.durationSeconds ?? null;
    nextAction = audioQualityApproved
      ? 'Calidad auditiva aprobada por hash; falta autorización separada para publicar.'
      : 'Escucha humana del reemplazo; después registrar aprobación por hash antes de publicar.';
  } else if (legacyReplacementRecommended) {
    state = 'LEGACY_REPLACE_RECOMMENDED';
    nextAction = 'Reconstruir el guion, generar en staging y repetir QA automático antes de escucha humana.';
  } else if (legacyAnswersPresent) {
    state = 'LEGACY_ANSWERS_PRESENT_PENDING_HUMAN';
    nextAction = 'Escucha humana completa; decidir conservación o reemplazo según longitud y naturalidad.';
  }
  return {
    set: row.set,
    state,
    source,
    releaseReady: false,
    audioQualityApproved,
    completionEvidence,
    wordErrorRate,
    durationSeconds,
    listeningScriptWords: legacyReplacementManifest.rows.find(candidate => candidate.set === row.set)?.scriptAudit.totalWords ?? row.scriptAudit.totalWords,
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
  legacyReplacementManifestSha256: legacyReplacementManifest.manifestSha256,
  legacyReplacementQualityApprovalSha256: legacyReplacementApprovalSha256,
  castingSha256,
  legacyReplacementCastingSha256,
  publicAudioChanged: false,
  humanReviewRequired: true,
  summary: {
    totalSets: rows.length,
    automatedQaPassed: rows.filter(row => ['AUTO_QA_PASS_PENDING_HUMAN', 'BATCH_QUALITY_APPROVED_PENDING_Q40'].includes(row.state)).length,
    audioQualityApproved: rows.filter(row => row.audioQualityApproved).length,
    legacyReplacementRecommended: rows.filter(row => row.state === 'LEGACY_REPLACE_RECOMMENDED').length,
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
  BATCH_QUALITY_APPROVED_PENDING_Q40: 'Calidad del lote aprobada; falta evidencia Q1–Q40',
  AUTO_QA_PASS_PENDING_HUMAN: 'QA automático aprobado; falta escucha humana',
  LEGACY_ANSWERS_PRESENT_PENDING_HUMAN: 'Respuestas presentes; falta decisión humana',
  LEGACY_REPLACE_RECOMMENDED: 'Auditoría completa; reemplazo recomendado',
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
  `Calidad auditiva del lote aprobada por el propietario: **${report.summary.audioQualityApproved}/20 sets**`,
  `Audios heredados con reemplazo recomendado: **${report.summary.legacyReplacementRecommended}/7 sets auditados**`,
  'Publicación: **0/20**; el audio público permanece sin cambios y requiere autorización separada.',
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
