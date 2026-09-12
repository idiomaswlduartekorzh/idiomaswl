import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';

export const AUDIO_OBSERVATIONS = new Set([
  'FULL_MATCH_REVIEWED',
  'SAMPLE_MATCH_ONLY',
  'CONFIRMED_MISMATCH',
  'MISSING',
  'UNKNOWN',
]);

const CONTENT_BLOCKERS = new Set([
  'STRUCTURE',
  'NUMBERING',
  'DUPLICATE_QUESTION_ID',
  'READING_MISSING',
  'READING_LENGTH',
  'SCRIPT_MISSING',
  'WRITING_IMAGE_MISSING',
  'WRITING_PROMPT_MISSING',
  'OPTION_KEY_INVALID',
  'MATCH_KEY_INVALID',
  'MULTI_KEY_INVALID',
  'EMPTY_ANSWER',
  'ANSWER_WORD_LIMIT_REVIEW',
]);

const sha256 = value => createHash('sha256').update(value).digest('hex');
const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const reviewed = entry => nonempty(entry?.reviewedAt) && !Number.isNaN(Date.parse(entry.reviewedAt));
const exactQuestions = entries => {
  if (!Array.isArray(entries)) return false;
  const numbers = entries.map(entry => entry.question).sort((a, b) => a - b);
  return JSON.stringify(numbers) === JSON.stringify(Array.from({ length: 40 }, (_, index) => index + 1));
};
const isIndependentHuman = reviewer => Boolean(
  reviewer
  && reviewer.kind === 'human'
  && typeof reviewer.id === 'string'
  && reviewer.id.trim()
  && !['harness', 'ielts-harness', 'generator', 'self'].includes(reviewer.id.trim().toLowerCase()),
);
const isIndependentReviewer = reviewer => Boolean(
  reviewer
  && ['human', 'agent', 'academic-agent', 'qa-agent', 'visual-review-agent', 'ux-agent'].includes(reviewer.kind)
  && typeof reviewer.id === 'string'
  && reviewer.id.trim()
  && !['harness', 'ielts-harness', 'generator', 'self'].includes(reviewer.id.trim().toLowerCase()),
);
const allApproved = entries => Array.isArray(entries) && entries.every(entry => entry.status === 'APPROVED');
const sameBinding = (actual, expected) => Boolean(actual) && Object.entries(expected).every(([key, value]) => actual[key] === value);

export function validateRegistry(registry) {
  if (!registry || registry.schemaVersion !== 1) throw Error('Evidence registry must use schemaVersion 1');
  if (!Array.isArray(registry.sets) || registry.sets.length !== 20) throw Error('Evidence registry must contain exactly 20 sets');
  const numbers = registry.sets.map(record => record.set).sort((a, b) => a - b);
  if (JSON.stringify(numbers) !== JSON.stringify(Array.from({ length: 20 }, (_, index) => index + 1))) {
    throw Error('Evidence registry must contain Set 1 through Set 20 exactly once');
  }
  for (const record of registry.sets) {
    if (!AUDIO_OBSERVATIONS.has(record.knownAudioStatus)) throw Error(`Set ${record.set}: unknown audio status ${record.knownAudioStatus}`);
    if (!record.provenance?.source || !record.provenance?.observedAt) throw Error(`Set ${record.set}: observation provenance is required`);
  }
  return registry;
}

export function releaseFingerprint(material) {
  return sha256(JSON.stringify({
    contentSha256: material.contentSha256,
    objectiveSha256: material.objectiveSha256,
    listeningTranscriptSha256: material.listeningTranscriptSha256,
    readingContentSha256: material.readingContentSha256,
    writingContentSha256: material.writingContentSha256,
    speakingContentSha256: material.speakingContentSha256,
    audio: material.audio.map(asset => ({ url: asset.url, sha256: asset.sha256 ?? null })),
    writingImage: material.writingImage ? { url: material.writingImage.url, sha256: material.writingImage.sha256 ?? null } : null,
    readingImages: material.readingImages.map(asset => ({ url: asset.url, sha256: asset.sha256 ?? null })),
  }));
}

function verifyEvidenceFile(root, approval) {
  if (!approval?.evidencePath || !approval.evidenceSha256) return false;
  const candidate = path.resolve(root, approval.evidencePath);
  const relative = path.relative(root, candidate);
  if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(candidate)) return false;
  return sha256(fs.readFileSync(candidate)) === approval.evidenceSha256;
}

function verifyFinalReleaseApprovalEvidence(root, approval, set, fingerprint) {
  if (!verifyEvidenceFile(root, approval)) return false;
  try {
    const receipt = JSON.parse(fs.readFileSync(path.resolve(root, approval.evidencePath), 'utf8'));
    const { receiptSha256, ...core } = receipt;
    const row = receipt.sets?.find(candidate => candidate.set === set);
    return receipt.schemaVersion === 1
      && receipt.status === 'APPROVED'
      && sha256(JSON.stringify(core)) === receiptSha256
      && isIndependentHuman(receipt.reviewer)
      && receipt.reviewer.kind === approval.reviewer.kind
      && receipt.reviewer.id === approval.reviewer.id
      && receipt.approvedAt === approval.reviewedAt
      && row?.releaseFingerprintSha256 === fingerprint;
  } catch {
    return false;
  }
}

function verifyMachineAlignmentEvidence(root, alignment, expected) {
  if (!verifyEvidenceFile(root, alignment)) return false;
  try {
    const report = JSON.parse(fs.readFileSync(path.resolve(root, alignment.evidencePath), 'utf8'));
    if (alignment.method === 'Q1_Q40_AUDIBLE_EVIDENCE') {
      return report.schemaVersion === 1
        && report.status === 'PASS'
        && report.audio?.sha256 === expected.audioSha256
        && report.transcript?.harnessTranscriptSha256 === expected.transcriptSha256
        && report.summary?.questions === 40
        && report.summary?.supported === 40
        && report.summary?.unresolved === 0
        && exactQuestions(report.evidence)
        && report.evidence.every(item => Number.isFinite(item.startSeconds)
          && Number.isFinite(item.endSeconds) && item.endSeconds > item.startSeconds && nonempty(item.audiblePhrase));
    }
    return report.schemaVersion === 1
      && report.releaseAuthorized === false
      && report.status === 'PASS'
      && report.audioSha256 === expected.audioSha256
      && report.transcriptSha256 === expected.transcriptSha256
      && report.wordErrorRate === alignment.wordErrorRate
      && report.maximumWordErrorRate === alignment.maximumWordErrorRate
      && report.completionEvidenceFound === report.completionEvidenceTotal;
  } catch {
    return false;
  }
}

function verifyTechnicalAudioEvidence(root, technical, expectedAudioSha256) {
  if (!verifyEvidenceFile(root, technical)) return false;
  try {
    const report = JSON.parse(fs.readFileSync(path.resolve(root, technical.evidencePath), 'utf8'));
    const file = Array.isArray(report.files)
      ? report.files.find(candidate => candidate.audioSha256 === expectedAudioSha256)
      : Array.isArray(report.sets)
        ? report.sets.find(candidate => candidate.audioSha256 === expectedAudioSha256)
        : report;
    return report.schemaVersion === 1
      && report.releaseAuthorized === false
      && ['PASS', 'technical_qa_passed_pending_transcript_and_owner_listening_review'].includes(report.status)
      && file?.audioSha256 === expectedAudioSha256
      && file.checks
      && Object.keys(file.checks).length > 0
      && Object.values(file.checks).every(Boolean);
  } catch {
    return false;
  }
}

function verifyUxEvidence(root, ux, expectedContentSha256, setNumber) {
  if (!verifyEvidenceFile(root, ux)) return false;
  try {
    const report = JSON.parse(fs.readFileSync(path.resolve(root, ux.evidencePath), 'utf8'));
    const row = report.sets?.find(candidate => candidate.set === setNumber);
    return report.schemaVersion === 1
      && report.status === 'PASS'
      && row?.status === 'PASS'
      && row.contentSha256 === expectedContentSha256
      && row.checks
      && Object.values(row.checks).every(Boolean)
      && report.browserReview?.status === 'PASS';
  } catch {
    return false;
  }
}

export function hydrateRegistry(registry, root) {
  validateRegistry(registry);
  return {
    ...registry,
    sets: registry.sets.map(record => {
      if (!record.evidencePath) return record;
      const candidate = path.resolve(root, record.evidencePath);
      const relative = path.relative(root, candidate);
      if (relative.startsWith('..') || path.isAbsolute(relative) || !fs.existsSync(candidate)) {
        throw Error(`Set ${record.set}: evidencePath is missing or outside the repository`);
      }
      const evidence = JSON.parse(fs.readFileSync(candidate, 'utf8'));
      if (evidence.schemaVersion !== 1 || evidence.set !== record.set) throw Error(`Set ${record.set}: invalid external evidence identity`);
      return { ...record, ...evidence, set: record.set, knownAudioStatus: record.knownAudioStatus, provenance: record.provenance, evidencePath: record.evidencePath };
    }),
  };
}

function evidenceCoverage(material, record, root) {
  const audioSha256 = material.audio.length === 1 ? material.audio[0].sha256 : null;
  const listeningBinding = {
    audioSha256,
    transcriptSha256: material.listeningTranscriptSha256,
    objectiveSha256: material.objectiveSha256,
  };
  const readingBinding = {
    readingSha256: material.readingContentSha256,
    objectiveSha256: material.objectiveSha256,
  };
  const writingBinding = {
    writingSha256: material.writingContentSha256,
    task1ImageSha256: material.writingImage?.sha256 ?? null,
  };
  const uxBinding = { contentSha256: material.contentSha256 };
  const speakingBinding = { speakingSha256: material.speakingContentSha256 };

  const listening = Boolean(
    exactQuestions(record.listening?.questions)
    && allApproved(record.listening.questions)
    && record.listening.questions.every(entry => (
      isIndependentReviewer(entry.reviewer)
      && reviewed(entry)
      && Number.isFinite(entry.startSeconds)
      && Number.isFinite(entry.endSeconds)
      && entry.startSeconds >= 0
      && entry.endSeconds > entry.startSeconds
      && nonempty(entry.audiblePhrase)
      && nonempty(entry.rationale)
    ))
    && sameBinding(record.listening.binding, listeningBinding)
    && record.listening.technicalQa?.status === 'PASS'
    && record.listening.technicalQa?.audioSha256 === audioSha256
    && verifyTechnicalAudioEvidence(root, record.listening.technicalQa, audioSha256)
    && record.listening.machineAlignment?.status === 'PASS'
    && record.listening.machineAlignment?.audioSha256 === audioSha256
    && record.listening.machineAlignment?.transcriptSha256 === material.listeningTranscriptSha256
    && (record.listening.machineAlignment.method === 'Q1_Q40_AUDIBLE_EVIDENCE'
      || (Number.isFinite(record.listening.machineAlignment?.wordErrorRate)
        && Number.isFinite(record.listening.machineAlignment?.maximumWordErrorRate)
        && record.listening.machineAlignment.wordErrorRate <= record.listening.machineAlignment.maximumWordErrorRate))
    && verifyMachineAlignmentEvidence(root, record.listening.machineAlignment, listeningBinding),
  );
  const reading = Boolean(
    exactQuestions(record.reading?.questions)
    && allApproved(record.reading.questions)
    && record.reading.questions.every(entry => (
      isIndependentReviewer(entry.reviewer)
      && reviewed(entry)
      && Number.isInteger(entry.passagePart)
      && entry.passagePart >= 1
      && entry.passagePart <= 3
      && nonempty(entry.paragraph)
      && nonempty(entry.sourceExcerpt)
      && nonempty(entry.rationale)
    ))
    && sameBinding(record.reading.binding, readingBinding),
  );
  const writing = Boolean(
    sameBinding(record.writing?.binding, writingBinding)
    && Array.isArray(record.writing?.tasks)
    && record.writing.tasks.length === 2
    && JSON.stringify(record.writing.tasks.map(task => task.task).sort()) === '[1,2]'
    && allApproved(record.writing.tasks)
    && record.writing.tasks.every(task => (
      isIndependentReviewer(task.reviewer)
      && reviewed(task)
      && task.checks
      && Object.keys(task.checks).length > 0
      && Object.values(task.checks).every(Boolean)
    )),
  );
  const speaking = Boolean(
    sameBinding(record.speaking?.binding, speakingBinding)
    && record.speaking?.status === 'APPROVED'
    && isIndependentReviewer(record.speaking.reviewer)
    && reviewed(record.speaking)
    && record.speaking.checks
    && Object.keys(record.speaking.checks).length > 0
    && Object.values(record.speaking.checks).every(Boolean)
    && verifyEvidenceFile(root, record.speaking)
  );
  const objectiveKey = Boolean(
    record.objectiveKey?.status === 'APPROVED'
    && isIndependentReviewer(record.objectiveKey.reviewer)
    && reviewed(record.objectiveKey)
    && record.objectiveKey.objectiveSha256 === material.objectiveSha256
    && verifyEvidenceFile(root, record.objectiveKey),
  );
  const ux = Boolean(
    record.ux?.status === 'APPROVED'
    && isIndependentReviewer(record.ux.reviewer)
    && sameBinding(record.ux.binding, uxBinding)
    && Array.isArray(record.ux.viewports)
    && record.ux.viewports.length >= 2
    && reviewed(record.ux)
    && verifyUxEvidence(root, record.ux, material.contentSha256, material.set),
  );
  return { listening, reading, writing, speaking, objectiveKey, ux };
}

function publicationMatchesMaterial(material, audioPublication) {
  if (audioPublication?.status !== 'PUBLISHED_HASH_VERIFIED') return false;
  const asset = material.audio.find(candidate => candidate.url === audioPublication.audioUrl);
  return Boolean(asset?.exists && asset.sha256 === audioPublication.audioSha256);
}

function remediation(material, record, coverage, audioPublication) {
  const publishedHashVerified = publicationMatchesMaterial(material, audioPublication);
  const contentCodes = material.issues.filter(issue => CONTENT_BLOCKERS.has(issue.code)).map(issue => issue.code);
  if (material.audio.some(asset => !asset.exists) || (!publishedHashVerified && record.knownAudioStatus === 'MISSING')) {
    if (contentCodes.length === 0) {
      return 'Producir el MP3 desde el guion congelado y ejecutar ASR, timecodes Q1–Q40 y revisión humana.';
    }
    return 'Corregir y congelar guiones/preguntas; después producir el MP3 y ejecutar ASR, timecodes Q1–Q40 y revisión humana.';
  }
  if (!publishedHashVerified && record.knownAudioStatus === 'CONFIRMED_MISMATCH') {
    return 'Retirar el MP3 ajeno, reconstruir audio desde el guion corregido y repetir alineación completa Q1–Q40.';
  }
  if (contentCodes.length) {
    return `Corregir contenido (${[...new Set(contentCodes)].join(', ')}) y regenerar todas las evidencias afectadas.`;
  }
  if (!coverage.listening) return publishedHashVerified
    ? 'El MP3 público coincide con staging, QA, aprobación y recibo por hash; falta evidencia humana independiente con timecodes y frase audible para Listening Q1–Q40.'
    : 'Completar ASR y evidencia humana con timecodes y frase audible para Listening Q1–Q40.';
  if (!coverage.reading) return 'Completar evidencia por párrafo y justificación para Reading Q1–Q40.';
  if (!coverage.writing) return 'Auditar Writing Task 1 (visual, unidades, fechas y consigna) y Task 2.';
  if (!coverage.speaking) return 'Auditar las tres partes de Speaking, su amplitud y la continuidad temática entre Part 2 y Part 3.';
  if (!coverage.objectiveKey) return 'Congelar y aprobar una clave independiente ligada a la huella objetiva actual.';
  if (!coverage.ux) return 'Ejecutar QA del flujo real en móvil y escritorio, incluida persistencia y reporte.';
  return 'Realizar la aprobación humana final de release sobre la huella consolidada.';
}

export function evaluateSet(material, record, root, audioPublication = null) {
  const coverage = evidenceCoverage(material, record, root);
  const reasons = [];
  const missingAudio = material.audio.some(asset => !asset.exists);
  const publishedHashVerified = publicationMatchesMaterial(material, audioPublication);
  if (audioPublication && !publishedHashVerified) reasons.push('PUBLISHED_AUDIO_MATERIAL_BINDING_INVALID');
  if (missingAudio) reasons.push('AUDIO_MISSING');
  else if (!publishedHashVerified && record.knownAudioStatus === 'MISSING') reasons.push('AUDIO_OBSERVATION_STALE');
  if (!publishedHashVerified && record.knownAudioStatus === 'CONFIRMED_MISMATCH') reasons.push('AUDIO_MISMATCH');
  if (!publishedHashVerified && record.knownAudioStatus === 'SAMPLE_MATCH_ONLY') reasons.push('AUDIO_FULL_REVIEW_PENDING');
  if (publishedHashVerified && !coverage.listening) reasons.push('PUBLISHED_AUDIO_FULL_Q40_EVIDENCE_PENDING');
  const contentCodes = [...new Set(material.issues.filter(issue => CONTENT_BLOCKERS.has(issue.code)).map(issue => issue.code))];
  reasons.push(...contentCodes);
  for (const [area, passed] of Object.entries(coverage)) if (!passed) reasons.push(`${area.toUpperCase()}_EVIDENCE_INCOMPLETE`);

  const fingerprint = releaseFingerprint(material);
  const finalApproval = Boolean(
    record.releaseApproval?.status === 'APPROVED'
    && isIndependentHuman(record.releaseApproval.reviewer)
    && reviewed(record.releaseApproval)
    && record.releaseApproval.releaseFingerprintSha256 === fingerprint
    && verifyFinalReleaseApprovalEvidence(root, record.releaseApproval, material.set, fingerprint)
  );
  let state;
  if (missingAudio || (!publishedHashVerified && record.knownAudioStatus === 'MISSING')) state = 'BLOCKED_ASSET';
  else if (!publishedHashVerified && record.knownAudioStatus === 'CONFIRMED_MISMATCH') state = 'BLOCKED_ALIGNMENT';
  else if (contentCodes.length) state = 'BLOCKED_CONTENT';
  else if (Object.values(coverage).some(value => !value)) state = 'NEEDS_FULL_EVIDENCE';
  else if (!finalApproval) state = 'READY_FOR_HUMAN_REVIEW';
  else state = 'RELEASE_READY';

  return {
    set: material.set,
    mockId: material.mockId,
    state,
    releaseReady: state === 'RELEASE_READY',
    knownAudioStatus: record.knownAudioStatus,
    effectiveAudioStatus: publishedHashVerified ? audioPublication.status : record.knownAudioStatus,
    audioPublication,
    audioPublicationMaterialBound: publishedHashVerified,
    provenance: record.provenance,
    coverage,
    fingerprints: {
      release: fingerprint,
      content: material.contentSha256,
      objective: material.objectiveSha256,
      audio: material.audio.map(asset => asset.sha256 ?? null),
      listeningTranscript: material.listeningTranscriptSha256,
      reading: material.readingContentSha256,
      writing: material.writingContentSha256,
      speaking: material.speakingContentSha256,
      task1Image: material.writingImage?.sha256 ?? null,
    },
    metrics: {
      listeningScriptWords: material.listening.reduce((total, part) => total + part.words, 0),
      listeningPartWords: material.listening.map(part => part.words),
      audio: material.audio.map(asset => ({
        url: asset.url,
        exists: asset.exists,
        bytes: asset.bytes,
        sha256: asset.sha256 ?? null,
        seconds: asset.seconds ?? null,
        streams: asset.streams ?? null,
        probe: asset.probe ?? null,
        decode: asset.decode ?? null,
      })),
      readingWords: material.readingWords,
      writing: material.writingTasks.map(task => ({
        task: task.task,
        stimulusWords: task.stimulusWords,
        instructionWords: task.instructionWords,
        minWords: task.minWords,
        imageUrl: task.imageUrl,
      })),
      task1Image: material.writingImage ? {
        url: material.writingImage.url,
        bytes: material.writingImage.bytes,
        dimensions: material.writingImage.dimensions,
      } : null,
      listeningEvidence: record.listening?.questions?.filter(entry => entry.status === 'APPROVED').length ?? 0,
      readingEvidence: record.reading?.questions?.filter(entry => entry.status === 'APPROVED').length ?? 0,
    },
    issues: material.issues,
    lexicalFlags: material.lexicalFlags,
    reasons: [...new Set(reasons)],
    nextAction: state === 'RELEASE_READY'
      ? 'Ninguna: huella actual aprobada para uso con estudiantes.'
      : remediation(material, record, coverage, audioPublication),
    notes: record.notes ?? [],
  };
}

export function buildHarnessReport(inventory, registry, root, publicationBySet = new Map()) {
  validateRegistry(registry);
  const records = new Map(registry.sets.map(record => [record.set, record]));
  const sets = inventory.sets.map(material => evaluateSet(material, records.get(material.set), root, publicationBySet.get(material.set) ?? null));
  const stateCounts = Object.fromEntries([...new Set(sets.map(set => set.state))].sort().map(state => [state, sets.filter(set => set.state === state).length]));
  return {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    baseCommit: inventory.baseCommit,
    policy: {
      releaseRule: 'A set is RELEASE_READY only when automatic checks and identified independent domain reviews are complete and fresh, and final human approval is bound to the current release fingerprint.',
      selfApprovalForbidden: true,
      staleEvidenceInvalidated: true,
    },
    summary: {
      total: sets.length,
      releaseReady: sets.filter(set => set.releaseReady).length,
      readyForHumanReview: sets.filter(set => set.state === 'READY_FOR_HUMAN_REVIEW').length,
      audioPublishedHashVerified: sets.filter(set => set.audioPublication?.status === 'PUBLISHED_HASH_VERIFIED').length,
      stateCounts,
    },
    remediationQueue: sets.slice().sort((left, right) => {
      const priority = set => set.set === 1 ? 0 : set.set <= 4 ? 1 : set.set <= 12 ? 2 : 3;
      return priority(left) - priority(right) || left.set - right.set;
    }).map(set => ({ set: set.set, state: set.state, action: set.nextAction })),
    sets,
  };
}

export function evidenceScaffold(material) {
  const audioSha256 = material.audio.length === 1 ? material.audio[0].sha256 ?? null : null;
  const pendingReviewer = { kind: 'human', id: '' };
  const candidateFor = (skill, question) => {
    const row = (material.objectiveAuditRows ?? []).find(candidate => (
      candidate.skill === skill
      && question >= candidate.number
      && question < candidate.number + candidate.weight
    ));
    return row ? {
      part: row.part,
      responseKey: row.key,
      responseKind: row.kind,
      candidateAcceptedAnswers: row.accepted,
      options: row.options ?? null,
    } : { part: null, responseKey: '', responseKind: '', candidateAcceptedAnswers: [], options: null };
  };
  return {
    schemaVersion: 1,
    set: material.set,
    generatedFrom: {
      source: material.source,
      sourceSha256: material.sourceSha256,
      releaseFingerprintSha256: releaseFingerprint(material),
    },
    listening: {
      binding: { audioSha256, transcriptSha256: material.listeningTranscriptSha256, objectiveSha256: material.objectiveSha256 },
      technicalQa: { status: 'PENDING', evidencePath: '', evidenceSha256: '', audioSha256 },
      machineAlignment: { status: 'PENDING', engine: '', evidencePath: '', evidenceSha256: '', audioSha256, transcriptSha256: material.listeningTranscriptSha256, wordErrorRate: null, maximumWordErrorRate: 0.08 },
      questions: Array.from({ length: 40 }, (_, index) => {
        const question = index + 1;
        return {
          question,
          ...candidateFor('listening', question),
          startSeconds: null,
          endSeconds: null,
          audiblePhrase: '',
          rationale: '',
          status: 'PENDING',
          reviewer: pendingReviewer,
          reviewedAt: '',
        };
      }),
    },
    reading: {
      binding: { readingSha256: material.readingContentSha256, objectiveSha256: material.objectiveSha256 },
      questions: Array.from({ length: 40 }, (_, index) => {
        const question = index + 1;
        const candidate = candidateFor('reading', question);
        return {
          question,
          ...candidate,
          passagePart: candidate.part,
          paragraph: '',
          sourceExcerpt: '',
          rationale: '',
          status: 'PENDING',
          reviewer: pendingReviewer,
          reviewedAt: '',
        };
      }),
    },
    writing: {
      binding: { writingSha256: material.writingContentSha256, task1ImageSha256: material.writingImage?.sha256 ?? null },
      tasks: [
        { task: 1, checks: { visualMatchesPrompt: false, title: false, units: false, dates: false, legend: false, legibility: false }, status: 'PENDING', reviewer: pendingReviewer, reviewedAt: '', notes: '' },
        { task: 2, checks: { promptComplete: false, responseModeClear: false, wordingReviewed: false }, status: 'PENDING', reviewer: pendingReviewer, reviewedAt: '', notes: '' },
      ],
    },
    speaking: { status: 'PENDING', binding: { speakingSha256: material.speakingContentSha256 }, checks: {},
      reviewer: pendingReviewer, reviewedAt: '', evidencePath: '', evidenceSha256: '' },
    objectiveKey: { status: 'PENDING', objectiveSha256: material.objectiveSha256, evidencePath: '', evidenceSha256: '', reviewer: pendingReviewer, reviewedAt: '' },
    ux: { status: 'PENDING', binding: { contentSha256: material.contentSha256 }, viewports: [], reviewer: pendingReviewer, reviewedAt: '', evidencePath: '', evidenceSha256: '' },
    releaseApproval: { status: 'PENDING', releaseFingerprintSha256: releaseFingerprint(material), reviewer: pendingReviewer, reviewedAt: '' },
  };
}

const escapeCell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
export function renderMarkdown(report) {
  const labels = {
    BLOCKED_ASSET: 'Bloqueado: falta archivo',
    BLOCKED_ALIGNMENT: 'Bloqueado: audio desalineado',
    BLOCKED_CONTENT: 'Bloqueado: contenido',
    NEEDS_FULL_EVIDENCE: 'Falta evidencia integral',
    READY_FOR_HUMAN_REVIEW: 'Listo para aprobación humana',
    RELEASE_READY: 'Listo para uso',
  };
  const lines = [
    '# Estado del harness IELTS',
    '',
    `Generado: ${report.generatedAt}`,
    `Commit auditado: \`${report.baseCommit}\``,
    `Sets con auditoría integral completa y listos para aprobación humana: **${report.summary.readyForHumanReview}/${report.summary.total}**`,
    `Sets con aprobación humana final registrada: **${report.summary.releaseReady}/${report.summary.total}**`,
    `MP3 públicos ligados por hash a staging, QA, aprobación y recibo: **${report.summary.audioPublishedHashVerified}/${report.summary.total}**`,
    '',
    '| Set | Estado | Audio observado | MP3 min | Guion L | Evidencia L/R | Clave | Speaking | UX | Reading | Writing T1/T2 | Próxima acción |',
    '|---:|---|---|---:|---:|---:|---|---|---|---:|---|---|',
  ];
  for (const set of report.sets) {
    const writing = set.metrics.writing.map(task => `${task.stimulusWords}/${task.instructionWords}`).join(' · ');
    const seconds = set.metrics.audio[0]?.seconds;
    const minutes = Number.isFinite(seconds) ? (seconds / 60).toFixed(1) : '—';
    lines.push(`| ${set.set} | ${labels[set.state]} | ${set.effectiveAudioStatus} | ${minutes} | ${set.metrics.listeningScriptWords} | ${set.metrics.listeningEvidence}/40 · ${set.metrics.readingEvidence}/40 | ${set.coverage.objectiveKey ? 'aprobada' : 'pendiente'} | ${set.coverage.speaking ? 'aprobado' : 'pendiente'} | ${set.coverage.ux ? 'aprobada' : 'pendiente'} | ${set.metrics.readingWords} | ${writing} | ${escapeCell(set.nextAction)} |`);
  }
  lines.push('', '## Cola de reparación', '');
  for (const item of report.remediationQueue) lines.push(`${item.set}. **Set ${item.set} — ${labels[item.state]}:** ${item.action}`);
  lines.push('', 'Los conteos y hashes son controles automáticos. Ningún set obtiene aprobación académica a partir de su propia clave, guion o texto.', '');
  return lines.join('\n');
}
