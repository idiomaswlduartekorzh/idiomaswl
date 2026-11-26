import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { evaluateSet, evidenceScaffold, hydrateRegistry, releaseFingerprint } from '../scripts/lib/ielts-harness-core.mjs';

const sha256 = value => createHash('sha256').update(value).digest('hex');
const human = id => ({ kind: 'human', id });
const material = () => ({
  set: 1,
  mockId: 'set-1',
  source: 'src/data/mocks/ielts-set-1.ts',
  sourceSha256: 'source',
  contentSha256: 'content',
  objectiveSha256: 'objective',
  listeningTranscriptSha256: 'transcript',
  readingContentSha256: 'reading',
  writingContentSha256: 'writing',
  speakingContentSha256: 'speaking',
  audio: [{ url: '/audio/set-1.mp3', exists: true, sha256: 'audio' }],
  listening: [{ part: 1, words: 700 }, { part: 2, words: 700 }, { part: 3, words: 700 }, { part: 4, words: 700 }],
  readingWords: 2400,
  writingImage: { url: '/image.png', exists: true, sha256: 'image', bytes: 1200, dimensions: { width: 900, height: 500 } },
  readingImages: [],
  writingTasks: [
    { task: 1, stimulusWords: 20, instructionWords: 20, minWords: 150, imageUrl: '/image.png' },
    { task: 2, stimulusWords: 30, instructionWords: 20, minWords: 250, imageUrl: null },
  ],
  issues: [],
  lexicalFlags: [],
});

function completeRecord(root, current = material()) {
  const fixture = Buffer.from('independent approved key\n');
  fs.writeFileSync(path.join(root, 'fixture.json'), fixture);
  const asrReport = Buffer.from(`${JSON.stringify({
    schemaVersion: 1,
    releaseAuthorized: false,
    status: 'PASS',
    audioSha256: 'audio',
    transcriptSha256: 'transcript',
    wordErrorRate: 0.03,
    maximumWordErrorRate: 0.08,
    completionEvidenceFound: 24,
    completionEvidenceTotal: 24,
  })}\n`);
  fs.writeFileSync(path.join(root, 'asr.json'), asrReport);
  const technicalReport = Buffer.from(`${JSON.stringify({
    schemaVersion: 1,
    releaseAuthorized: false,
    status: 'PASS',
    audioSha256: 'audio',
    checks: { decode: true, format: true, loudness: true, timing: true },
  })}\n`);
  fs.writeFileSync(path.join(root, 'technical.json'), technicalReport);
  const uxReport = Buffer.from(`${JSON.stringify({
    schemaVersion: 1,
    status: 'PASS',
    browserReview: { status: 'PASS' },
    sets: [{
      set: 1,
      status: 'PASS',
      contentSha256: 'content',
      checks: { route: true, responsive: true },
    }],
  })}\n`);
  fs.writeFileSync(path.join(root, 'ux.json'), uxReport);
  const reviewer = human('academic-reviewer');
  const reviewedAt = '2026-09-04T12:00:00.000Z';
  const evidenceFile = { evidencePath: 'fixture.json', evidenceSha256: sha256(fixture) };
  const asrEvidenceFile = { evidencePath: 'asr.json', evidenceSha256: sha256(asrReport) };
  const technicalEvidenceFile = { evidencePath: 'technical.json', evidenceSha256: sha256(technicalReport) };
  const uxEvidenceFile = { evidencePath: 'ux.json', evidenceSha256: sha256(uxReport) };
  return {
    set: 1,
    knownAudioStatus: 'FULL_MATCH_REVIEWED',
    provenance: { source: 'review-log', observedAt: '2026-09-04' },
    listening: {
      binding: { audioSha256: 'audio', transcriptSha256: 'transcript', objectiveSha256: 'objective' },
      technicalQa: { status: 'PASS', audioSha256: 'audio', ...technicalEvidenceFile },
      machineAlignment: { status: 'PASS', audioSha256: 'audio', transcriptSha256: 'transcript', wordErrorRate: 0.03, maximumWordErrorRate: 0.08, ...asrEvidenceFile },
      questions: Array.from({ length: 40 }, (_, index) => ({ question: index + 1, startSeconds: index * 10, endSeconds: index * 10 + 5, audiblePhrase: `audible evidence ${index + 1}`, rationale: 'Audio supports the keyed response.', status: 'APPROVED', reviewer, reviewedAt })),
    },
    reading: {
      binding: { readingSha256: 'reading', objectiveSha256: 'objective' },
      questions: Array.from({ length: 40 }, (_, index) => ({ question: index + 1, passagePart: Math.min(3, Math.floor(index / 14) + 1), paragraph: `P${index + 1}`, sourceExcerpt: `reading evidence ${index + 1}`, rationale: 'Passage supports the keyed response.', status: 'APPROVED', reviewer, reviewedAt })),
    },
    writing: {
      binding: { writingSha256: 'writing', task1ImageSha256: 'image' },
      tasks: [
        { task: 1, checks: { visualMatchesPrompt: true, title: true, units: true, dates: true, legend: true, legibility: true }, status: 'APPROVED', reviewer, reviewedAt },
        { task: 2, checks: { promptComplete: true, responseModeClear: true, wordingReviewed: true }, status: 'APPROVED', reviewer, reviewedAt },
      ],
    },
    speaking: {
      status: 'APPROVED',
      binding: { speakingSha256: 'speaking' },
      checks: {
        threeOrderedParts: true,
        part1Breadth: true,
        part2CueCard: true,
        part3Breadth: true,
        topicContinuity: true,
      },
      reviewer,
      reviewedAt,
      ...evidenceFile,
    },
    objectiveKey: {
      status: 'APPROVED',
      objectiveSha256: 'objective',
      evidencePath: 'fixture.json',
      evidenceSha256: sha256(fixture),
      reviewer,
      reviewedAt,
    },
    ux: { status: 'APPROVED', binding: { contentSha256: 'content' }, viewports: [390, 1280], reviewer, reviewedAt, ...uxEvidenceFile },
    releaseApproval: { status: 'PENDING', releaseFingerprintSha256: releaseFingerprint(current), reviewer, reviewedAt },
  };
}

function approveFinal(root, current, record) {
  const reviewer = human('academic-reviewer');
  const approvedAt = '2026-09-04T12:00:00.000Z';
  const core = {
    schemaVersion: 1,
    status: 'APPROVED',
    approvedAt,
    reviewer,
    statement: 'I approve this current release fingerprint for student use.',
    sets: [{ set: 1, releaseFingerprintSha256: releaseFingerprint(current) }],
  };
  const receipt = Buffer.from(`${JSON.stringify({ ...core, receiptSha256: sha256(JSON.stringify(core)) })}\n`);
  fs.writeFileSync(path.join(root, 'final-approval.json'), receipt);
  record.releaseApproval = {
    status: 'APPROVED',
    releaseFingerprintSha256: releaseFingerprint(current),
    reviewer,
    reviewedAt: approvedAt,
    evidencePath: 'final-approval.json',
    evidenceSha256: sha256(receipt),
  };
}

test('complete fresh evidence stops at final human release review', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const result = evaluateSet(current, completeRecord(root, current), root);
    assert.equal(result.state, 'READY_FOR_HUMAN_REVIEW');
    assert.deepEqual(result.coverage, { listening: true, reading: true, writing: true, speaking: true, objectiveKey: true, ux: true });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('final independent approval over the current fingerprint releases the set', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    approveFinal(root, current, record);
    const result = evaluateSet(current, record, root);
    assert.equal(result.state, 'RELEASE_READY');
    assert.equal(result.releaseReady, true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('an APPROVED label without a hash-bound human receipt cannot release a set', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.releaseApproval.status = 'APPROVED';
    const result = evaluateSet(current, record, root);
    assert.equal(result.state, 'READY_FOR_HUMAN_REVIEW');
    assert.equal(result.releaseReady, false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a changed passage invalidates previously approved Reading evidence', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const previous = material();
    const record = completeRecord(root, previous);
    const changed = { ...previous, readingContentSha256: 'changed-reading', contentSha256: 'changed-content' };
    const result = evaluateSet(changed, record, root);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
    assert.equal(result.coverage.reading, false);
    assert.equal(result.coverage.ux, false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('the harness cannot approve its own evidence', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.listening.questions[0].reviewer = human('ielts-harness');
    const result = evaluateSet(current, record, root);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
    assert.equal(result.coverage.listening, false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('an APPROVED label cannot hide empty timecodes or rationale', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.listening.questions[7].audiblePhrase = '';
    record.reading.questions[12].rationale = '';
    const result = evaluateSet(current, record, root);
    assert.equal(result.coverage.listening, false);
    assert.equal(result.coverage.reading, false);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('machine alignment fields must agree with the hashed ASR report', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.listening.machineAlignment.wordErrorRate = 0.01;
    const result = evaluateSet(current, record, root);
    assert.equal(result.coverage.listening, false);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('the general harness recognizes only the complete, independently reviewed Listening packages', async t => {
  const repo = fileURLToPath(new URL('../', import.meta.url));
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-reviewed-listening-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  for (const directory of ['config', 'public', 'tests']) {
    fs.symlinkSync(path.join(repo, directory), path.join(root, directory), 'dir');
  }
  const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
  const inventoryPath = path.join(root, 'materials.json');
  execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings',
    path.join(repo, 'scripts/audit-ielts-materials.mjs'), `--output=${inventoryPath}`]);
  const materials = read('materials.json').sets;
  const records = hydrateRegistry(read('config/ielts-harness/evidence-registry.json'), root).sets;

  for (const set of [1, 4]) {
    await t.test(`Set ${set} real recording, ASR sources and independent review scope`, () => {
      const current = materials.find(row => row.set === set);
      const record = records.find(row => row.set === set);
      const original = read(record.listening.machineAlignment.evidencePath);
      const result = evaluateSet(current, record, root);
      assert.equal(result.coverage.listening, true);
      const pendingRelease = { ...record, releaseApproval: { status: 'PENDING' } };
      assert.equal(evaluateSet(current, pendingRelease, root).releaseReady, false);

      const repairedQuestion = set === 1 ? 11 : 28;
      const candidate = () => structuredClone(record);
      const rejects = (changed, label) =>
        assert.equal(evaluateSet(current, changed, root).coverage.listening, false, label);
      for (const [label, mutate] of [
        ['unknown method with a similar name', row => { row.machineAlignment.method += '_EXTRA'; }],
        ['less specific method for the repaired package', row => { row.machineAlignment.method = 'Q1_Q40_AUDIBLE_EVIDENCE'; }],
        ['missing evidence file', row => { row.machineAlignment.evidencePath = 'absent.json'; }],
        ['stale evidence digest', row => { row.machineAlignment.evidenceSha256 = 'stale'; }],
        ['registry phrase differs from the recording', row => { row.questions[0].audiblePhrase += ' changed'; }],
        ['reassigned reviewer on a repaired row', row => { row.questions.find(q => q.question === repairedQuestion).reviewer.id = 'someone-else'; }],
      ]) {
        const changed = candidate();
        mutate(changed.listening);
        rejects(changed, label);
      }

      for (const [label, mutate, method] of [
        ['missing independent review', artifact => { delete artifact.independentReview; }],
        ['removed review and downgraded method', artifact => { delete artifact.independentReview; }, 'Q1_Q40_AUDIBLE_EVIDENCE'],
        ['another review package', artifact => { artifact.independentReview.artifactPackageSha256 = '0'.repeat(64); }],
        ['missing reviewed question', artifact => { artifact.independentReview.scope.pop(); }],
        ['reassigned package reviewer', artifact => { artifact.reviewer.id = 'someone-else'; }],
        ['withdrawn review on a repaired question', artifact => { artifact.evidence.find(q => q.question === repairedQuestion).reviewStatus = 'PENDING'; }],
        ['stale published audio', artifact => { artifact.audio.sha256 = '0'.repeat(64); }],
        ['stale transcript', artifact => { artifact.transcript.harnessTranscriptSha256 = '0'.repeat(64); }],
        ['missing ASR source', artifact => { artifact.asr.globalSourcePath = 'absent.json'; }],
        ['incomplete forty-question coverage', artifact => { artifact.evidence.pop(); }],
        ['changed source timecode', artifact => { artifact.evidence[0].sourceAsr.startSeconds += 0.3; }],
      ]) {
        const changed = candidate();
        const core = structuredClone(original);
        delete core.artifactSha256;
        mutate(core);
        // Update both carrier digests so each failure exercises the evidence itself.
        const bytes = JSON.stringify({ ...core, artifactSha256: sha256(JSON.stringify(core)) });
        const evidencePath = `changed-set-${set}.json`;
        fs.writeFileSync(path.join(root, evidencePath), bytes);
        Object.assign(changed.listening.machineAlignment, { evidencePath, evidenceSha256: sha256(bytes) });
        if (method) changed.listening.machineAlignment.method = method;
        rejects(changed, label);
      }
    });
  }
});

test('regenerating the twenty dossiers preserves reviewed files and isolates a missing package', t => {
  const repo = fileURLToPath(new URL('../', import.meta.url));
  const clone = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-generator-copy-'));
  t.after(() => fs.rmSync(clone, { recursive: true, force: true }));
  for (const directory of ['scripts', 'config']) {
    fs.cpSync(path.join(repo, directory), path.join(clone, directory), { recursive: true });
  }
  for (const directory of ['src', 'public', 'tests']) {
    fs.symlinkSync(path.join(repo, directory), path.join(clone, directory), 'dir');
  }
  const harness = path.join(clone, 'config/ielts-harness');
  const dossier = set => path.join(harness, `evidence/set-${set}.json`);
  const read = file => JSON.parse(fs.readFileSync(file, 'utf8'));
  const write = (file, value) => fs.writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
  const digests = () => Object.fromEntries(fs.readdirSync(harness, { recursive: true })
    .filter(file => file.endsWith('.json')).map(file => [file, sha256(fs.readFileSync(path.join(harness, file)))]));
  const run = () => JSON.parse(execFileSync(process.execPath, ['--experimental-strip-types', '--no-warnings',
    path.join(clone, 'scripts/generate-ielts-harness-evidence.mjs')], { cwd: clone, encoding: 'utf8' }));

  const original = digests();
  for (let runNumber = 0; runNumber < 2; runNumber++) {
    const result = run();
    assert.equal(result.status, 'PASS');
    assert.equal(result.sets, 20);
    assert.equal(result.listeningQuestions, 800);
    assert.equal(result.changedFiles, 0);
    assert.deepEqual(digests(), original);
  }

  const missing = path.join(harness, 'listening-evidence/set-4-listening-evidence.json');
  const base1 = read(dossier(1));
  const base3 = read(dossier(3));
  const base4 = read(dossier(4));
  fs.unlinkSync(missing);
  const pending3 = structuredClone(base3);
  pending3.speaking.status = 'PENDING';
  write(dossier(3), pending3);
  const partial = run();
  assert.deepEqual(partial.pendingIndependentListening, [{ set: 4, reason: 'INDEPENDENT_PACKAGE_MISSING' }]);
  assert.equal(partial.sets, 20);
  assert.equal(partial.listeningQuestions, 760);
  assert.equal(partial.changedFiles, 1);
  assert.deepEqual(read(dossier(3)).speaking, base3.speaking);
  assert.deepEqual(read(dossier(1)), base1);
  assert.deepEqual(read(dossier(4)), base4);
  assert.equal(fs.existsSync(missing), false);
  assert.equal(run().changedFiles, 0);

  const stale = structuredClone(base1);
  stale.listening.binding.audioSha256 = 'former-audio';
  stale.speaking.binding.speakingSha256 = 'former-speaking-material';
  write(dossier(1), stale);
  const staleResult = run();
  assert.deepEqual(staleResult.pendingIndependentListening.map(item => item.reason),
    ['LISTENING_MATERIAL_CHANGED', 'INDEPENDENT_PACKAGE_MISSING']);
  assert.equal(staleResult.listeningQuestions, 720);
  const after = read(dossier(1));
  assert.deepEqual(after.listening, stale.listening);
  assert.equal(after.speaking.status, 'PENDING');
  assert.deepEqual(after.ux, base1.ux);
  assert.deepEqual(after.releaseApproval, base1.releaseApproval);
  assert.equal(run().changedFiles, 0);
});

test('Listening evidence cannot pass without a hash-bound technical audio report', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.listening.technicalQa.audioSha256 = 'other-audio';
    const result = evaluateSet(current, record, root);
    assert.equal(result.coverage.listening, false);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('duplicate question evidence does not count as Q1-Q40 coverage', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.reading.questions[39].question = 39;
    const result = evaluateSet(current, record, root);
    assert.equal(result.coverage.reading, false);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a changed Speaking review invalidates previously approved evidence', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.speaking.binding.speakingSha256 = 'changed-speaking';
    const result = evaluateSet(current, record, root);
    assert.equal(result.coverage.speaking, false);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('missing and mismatched audio remain hard blockers', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const missing = material();
    missing.audio[0] = { ...missing.audio[0], exists: false, sha256: undefined };
    const missingResult = evaluateSet(missing, completeRecord(root, missing), root);
    assert.equal(missingResult.state, 'BLOCKED_ASSET');
    assert.match(missingResult.nextAction, /^Producir el MP3 desde el guion congelado/);
    missing.issues.push({ code: 'READING_LENGTH', detail: '1000 words', severity: 'high' });
    assert.match(evaluateSet(missing, completeRecord(root, missing), root).nextAction, /^Corregir y congelar guiones/);
    const current = material();
    const mismatch = completeRecord(root, current);
    mismatch.knownAudioStatus = 'CONFIRMED_MISMATCH';
    assert.equal(evaluateSet(current, mismatch, root).state, 'BLOCKED_ALIGNMENT');
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a hash-verified publication supersedes a stale observation without granting release', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.knownAudioStatus = 'CONFIRMED_MISMATCH';
    record.listening.questions[0].status = 'PENDING';
    const publication = {
      status: 'PUBLISHED_HASH_VERIFIED',
      audioUrl: '/audio/set-1.mp3',
      audioSha256: 'audio',
      humanQualityApproval: true,
      fullQ40Evidence: false,
      releaseReady: false,
    };
    const result = evaluateSet(current, record, root, publication);
    assert.equal(result.state, 'NEEDS_FULL_EVIDENCE');
    assert.equal(result.releaseReady, false);
    assert.equal(result.effectiveAudioStatus, 'PUBLISHED_HASH_VERIFIED');
    assert.ok(!result.reasons.includes('AUDIO_MISMATCH'));
    assert.ok(result.reasons.includes('PUBLISHED_AUDIO_FULL_Q40_EVIDENCE_PENDING'));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('a publication receipt cannot supersede the observation for another runtime audio route', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'ielts-harness-test-'));
  try {
    const current = material();
    const record = completeRecord(root, current);
    record.knownAudioStatus = 'CONFIRMED_MISMATCH';
    const publication = {
      status: 'PUBLISHED_HASH_VERIFIED',
      audioUrl: '/audio/another-set.mp3',
      audioSha256: 'audio',
      fullQ40Evidence: false,
      releaseReady: false,
    };
    const result = evaluateSet(current, record, root, publication);
    assert.equal(result.state, 'BLOCKED_ALIGNMENT');
    assert.equal(result.effectiveAudioStatus, 'CONFIRMED_MISMATCH');
    assert.equal(result.audioPublicationMaterialBound, false);
    assert.ok(result.reasons.includes('PUBLISHED_AUDIO_MATERIAL_BINDING_INVALID'));
    assert.ok(result.reasons.includes('AUDIO_MISMATCH'));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('scaffold contains one pending record for every Listening and Reading point', () => {
  const scaffold = evidenceScaffold(material());
  assert.equal(scaffold.listening.questions.length, 40);
  assert.equal(scaffold.reading.questions.length, 40);
  assert.deepEqual(scaffold.listening.questions.map(entry => entry.question), Array.from({ length: 40 }, (_, index) => index + 1));
  assert.equal(scaffold.speaking.status, 'PENDING');
  assert.equal(scaffold.releaseApproval.status, 'PENDING');
});
