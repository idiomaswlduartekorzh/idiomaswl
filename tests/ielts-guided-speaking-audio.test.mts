import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { IELTS_GUIDED_SPEAKING_AUDIO_STATUS } from '../src/data/ielts/guided-speaking-audio.generated.ts';
import {
  getIeltsGuidedSpeakingReference,
  isIeltsGuidedSpeakingPairExposable,
} from '../src/data/ielts/guided-speaking-references.ts';

type ManifestItem = {
  id: string;
  setNumber: number;
  sourceMockFile: string;
  sourceQuestionId: string;
  band: '5.5' | '9.0';
  cueCard: string;
  output: string;
  publicUrl: string;
  text: string;
  minimumDurationSeconds: number;
  maximumDurationSeconds: number;
};

const manifest = JSON.parse(
  await readFile(new URL('../config/ielts-guided-speaking-audio.json', import.meta.url), 'utf8'),
) as {
  schemaVersion: number;
  setCount: number;
  bandProfiles: Record<'5.5' | '9.0', { criteria: string[][] }>;
  band55FeedbackBySet: Record<string, Record<string, string>>;
  band9FeedbackBySet: Record<string, Record<string, string>>;
  audioApprovalPolicy: {
    generationDoesNotApprove: boolean;
    pairApprovalRequired: boolean;
    independentHumanReviewerRequired: boolean;
    requiredBindingsPerBand: string[];
  };
  editorialCorrections: Array<{
    setNumber: number;
    sourceQuestionId: string;
    sourceCueCard: string;
    displayCueCard: string;
    editorialCorrectionReason: string;
  }>;
  items: ManifestItem[];
};

test('guided Speaking manifest covers Sets 1–20 with one complete band pair each', () => {
  assert.equal(manifest.schemaVersion, 3);
  assert.equal(manifest.setCount, 20);
  assert.equal(manifest.items.length, 40);
  assert.equal(new Set(manifest.items.map(item => item.id)).size, 40);
  assert.equal(new Set(manifest.items.map(item => item.output)).size, 40);

  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const pair = manifest.items.filter(item => item.setNumber === setNumber);
    assert.deepEqual(pair.map(item => item.band).sort(), ['5.5', '9.0']);
    assert.equal(new Set(pair.map(item => item.cueCard)).size, 1);
    assert.ok(pair.find(item => item.band === '5.5')!.text.trim().split(/\s+/).length >= 95);
    assert.ok(pair.find(item => item.band === '9.0')!.text.trim().split(/\s+/).length >= 160);
    assert.ok(pair.every(item => item.minimumDurationSeconds === 55));
    assert.ok(pair.every(item => item.maximumDurationSeconds === 120));
  }

  assert.equal(manifest.bandProfiles['5.5'].criteria.length, 4);
  assert.equal(manifest.bandProfiles['9.0'].criteria.length, 4);
  assert.deepEqual(manifest.bandProfiles['5.5'].criteria.map(([criterion]) => criterion), [
    'Fluency & Coherence',
    'Lexical Resource',
    'Grammatical Range & Accuracy',
    'Pronunciation',
  ]);
  assert.deepEqual(manifest.bandProfiles['9.0'].criteria.map(([criterion]) => criterion), [
    'Fluency & Coherence',
    'Lexical Resource',
    'Grammatical Range & Accuracy',
    'Pronunciation',
  ]);
  assert.equal(manifest.audioApprovalPolicy.generationDoesNotApprove, true);
  assert.equal(manifest.audioApprovalPolicy.pairApprovalRequired, true);
  assert.equal(manifest.audioApprovalPolicy.independentHumanReviewerRequired, true);
  assert.deepEqual(manifest.audioApprovalPolicy.requiredBindingsPerBand.sort(), ['contentSha256', 'sha256']);
});

test('both band profiles have tailored verdicts and four criteria for every set', () => {
  for (const [band, feedbackBySet] of [
    ['5.5', manifest.band55FeedbackBySet],
    ['9.0', manifest.band9FeedbackBySet],
  ] as const) {
    assert.equal(Object.keys(feedbackBySet).length, 20);
    const verdicts = new Set<string>();
    const criterionNotes = new Set<string>();

    for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
      const feedback = feedbackBySet[String(setNumber)];
      assert.deepEqual(Object.keys(feedback).sort(), ['fluency', 'grammar', 'lexical', 'pronunciation', 'verdict']);
      verdicts.add(feedback.verdict);
      for (const key of ['fluency', 'lexical', 'grammar', 'pronunciation']) criterionNotes.add(feedback[key]);

      const reference = getIeltsGuidedSpeakingReference(setNumber).samples[band];
      assert.equal(reference.verdict, feedback.verdict);
      assert.equal(reference.criteria.length, 4);
      assert.deepEqual(reference.criteria.map(([criterion]) => criterion), [
        'Fluency & Coherence',
        'Lexical Resource',
        'Grammatical Range & Accuracy',
        'Pronunciation',
      ]);
      assert.deepEqual(reference.criteria.map(([, note]) => note), [
        feedback.fluency,
        feedback.lexical,
        feedback.grammar,
        feedback.pronunciation,
      ]);
    }

    assert.equal(verdicts.size, 20);
    assert.equal(criterionNotes.size, 80);
  }
});

test('scripted references are paced as spoken long turns rather than mini-essays', () => {
  const hesitation = /\b(?:um|well|actually|honestly|you know|to be honest|I think|I suppose|of course|if that makes sense|oh)\b/gi;
  for (const item of manifest.items) {
    assert.ok(!item.text.includes('\n\n'), `${item.id} still has mini-essay paragraphing`);
    if (item.band === '5.5') {
      const markers = item.text.match(hesitation)?.length ?? 0;
      assert.ok(markers >= 1 && markers <= 5, `${item.id} needs limited, natural hesitation rather than a polished essay or caricature`);
    }
  }
  assert.match(manifest.items.find(item => item.setNumber === 1 && item.band === '9.0')!.text, /I had very little idea/);
  assert.match(manifest.items.find(item => item.setNumber === 3 && item.band === '9.0')!.text, /I had to navigate/);
});

test('every planned cue card is bound to the current Part 2 prompt in its source mock', async () => {
  for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
    const mockModule = await import(`../src/data/mocks/ielts-set-${setNumber}.ts`);
    const mock = mockModule.default;
    const speaking = mock.sections.find((section: { skill: string }) => section.skill === 'speaking');
    const part2 = speaking?.questions.find((question: { id: string }) => question.id === 'sp2');
    assert.ok(part2?.cueCard, `Set ${setNumber} is missing its Part 2 cue card`);

    const planned = manifest.items.filter(item => item.setNumber === setNumber);
    for (const item of planned) {
      assert.equal(item.sourceMockFile, `src/data/mocks/ielts-set-${setNumber}.ts`);
      assert.equal(item.sourceQuestionId, 'sp2');
      assert.equal(item.cueCard, part2.cueCard);
    }
  }
});

test('Set 4 display correction is explicit, source-bound and does not rewrite the canonical mock', async () => {
  assert.equal(manifest.editorialCorrections.length, 1);
  const correction = manifest.editorialCorrections[0];
  assert.equal(correction.setNumber, 4);
  assert.equal(correction.sourceQuestionId, 'sp2');
  assert.ok(correction.displayCueCard.startsWith('Describe a practical skill you have learned.'));
  assert.ok(correction.displayCueCard.endsWith(correction.sourceCueCard));
  assert.ok(correction.editorialCorrectionReason.length > 40);

  const mockModule = await import('../src/data/mocks/ielts-set-4.ts');
  const sections = mockModule.default.sections as Array<{
    skill?: string;
    questions: Array<{ id: string; cueCard?: string }>;
  }>;
  const speaking = sections.find(section => section.skill === 'speaking');
  const source = speaking?.questions.find(question => question.id === 'sp2')?.cueCard;
  assert.ok(source);
  assert.equal(source, correction.sourceCueCard);
  assert.equal(getIeltsGuidedSpeakingReference(4).fullCueCard, correction.displayCueCard);
});

test('generated WAV pairs remain hidden until independent human approval', async () => {
  assert.equal(IELTS_GUIDED_SPEAKING_AUDIO_STATUS.schemaVersion, 4);
  assert.equal(Object.keys(IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets).length, 20);
  assert.equal(IELTS_GUIDED_SPEAKING_AUDIO_STATUS.generated, true);
  assert.equal(IELTS_GUIDED_SPEAKING_AUDIO_STATUS.approved, false);
  assert.equal(IELTS_GUIDED_SPEAKING_AUDIO_STATUS.ready, false);

  for (const item of manifest.items) {
    const setStatus = IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets[
      String(item.setNumber) as keyof typeof IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets
    ];
    assert.ok(setStatus);
    assert.equal(setStatus.generated, true);
    assert.equal(setStatus.approved, false);
    assert.equal(setStatus.ready, false);
    assert.equal(setStatus.humanReview, null);
    const fileStatus = setStatus.files[item.band];
    assert.equal(fileStatus.generated, true);
    assert.equal(fileStatus.approved, false);
    assert.equal(fileStatus.ready, false);
    assert.equal(fileStatus.url, item.publicUrl);
    assert.ok(fileStatus.durationSeconds !== null && fileStatus.durationSeconds >= 55 && fileStatus.durationSeconds <= 120);
    assert.equal(fileStatus.sampleRate, 24000);
    assert.match(fileStatus.sha256 ?? '', /^[a-f0-9]{64}$/);
    assert.match(fileStatus.contentSha256 ?? '', /^[a-f0-9]{64}$/);
    const wav = await readFile(new URL(`../${item.output}`, import.meta.url));
    assert.ok(wav.byteLength > 44);
    assert.equal(createHash('sha256').update(wav).digest('hex'), fileStatus.sha256);
    const runtimeAudio = getIeltsGuidedSpeakingReference(item.setNumber).samples[item.band].audio;
    assert.equal(runtimeAudio.ready, false);
    assert.equal(runtimeAudio.url, '');
  }
});

test('runtime refuses half-ready and generated-but-unapproved Speaking pairs', () => {
  const file = (generated: boolean, approved: boolean, ready: boolean) => ({ generated, approved, ready });

  assert.equal(isIeltsGuidedSpeakingPairExposable({
    approved: false,
    ready: false,
    files: { '5.5': file(true, false, false), '9.0': file(true, false, false) },
  }), false, 'a generated pair must remain hidden before human approval');

  assert.equal(isIeltsGuidedSpeakingPairExposable({
    approved: true,
    ready: true,
    files: { '5.5': file(true, true, true), '9.0': file(true, false, false) },
  }), false, 'one approved file must never expose half a pair');

  assert.equal(isIeltsGuidedSpeakingPairExposable({
    approved: true,
    ready: true,
    files: { '5.5': file(true, true, true), '9.0': file(true, true, true) },
  }), true);
});

test('receipt checks require literal true booleans and regeneration persists revocation first', async () => {
  const scriptUrl = new URL('../scripts/generate-ielts-guided-speaking-audio.py', import.meta.url);
  const scriptPath = decodeURIComponent(scriptUrl.pathname);
  const probe = String.raw`
import copy
import importlib.util

spec = importlib.util.spec_from_file_location("guided_speaking_generator", ${JSON.stringify(scriptPath)})
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

files = {
    "5.5": {"generated": True, "approved": True, "ready": True, "url": "/5.wav", "durationSeconds": 60, "sampleRate": 24000, "sha256": "wav-55", "contentSha256": "content-55"},
    "9.0": {"generated": True, "approved": True, "ready": True, "url": "/9.wav", "durationSeconds": 90, "sampleRate": 24000, "sha256": "wav-90", "contentSha256": "content-90"},
}
pending_files = {
    "5.5": {"generated": False, "approved": False, "ready": False, "url": "/5.wav", "durationSeconds": None, "sampleRate": None, "sha256": None, "contentSha256": None},
    "9.0": {"generated": False, "approved": False, "ready": False, "url": "/9.wav", "durationSeconds": None, "sampleRate": None, "sha256": None, "contentSha256": None},
}
status = {"generated": False, "approved": False, "ready": False, "generatedAt": None, "approvedAt": None, "sets": {}}
for number in range(1, 21):
    current_files = copy.deepcopy(files if number == 1 else pending_files)
    status["sets"][str(number)] = {
        "generated": number == 1,
        "approved": number == 1,
        "ready": number == 1,
        "generatedAt": "old" if number == 1 else None,
        "approvedAt": "old" if number == 1 else None,
        "humanReview": {"old": True} if number == 1 else None,
        "files": current_files,
    }

bad_receipt = {
    "schemaVersion": 1,
    "kind": "ielts-guided-speaking-acoustic-review",
    "setNumber": 1,
    "decision": "APPROVED",
    "reviewer": "human-reviewer",
    "reviewedAt": "2026-10-20T18:30:00-05:00",
    "notes": "Both files were listened to completely.",
    "checks": {
        "identityStable": "false",
        "noArtifacts": True,
        "intelligible": True,
        "naturalPauses": True,
        "transcriptMatch": True,
        "durationAppropriate": True,
    },
    "files": {
        "5.5": {"sha256": "wav-55", "contentSha256": "content-55"},
        "9.0": {"sha256": "wav-90", "contentSha256": "content-90"},
    },
}
try:
    module.validate_review_receipt(bad_receipt, status)
except ValueError:
    pass
else:
    raise AssertionError('truthy string bypassed the acoustic checks')

events = []
module.write_status = lambda snapshot: events.append(("persist", copy.deepcopy(snapshot)))
manifest = {"items": [
    {"setNumber": 1, "band": "5.5", "publicUrl": "/5.wav"},
    {"setNumber": 1, "band": "9.0", "publicUrl": "/9.wav"},
]}
module.invalidate_selected_sets_for_generation(status, manifest, [1])
events.append(("generate", None))
assert [event[0] for event in events] == ["persist", "generate"]
persisted = events[0][1]
module.assert_generation_gate_revoked(persisted, [1])
assert persisted["sets"]["1"]["humanReview"] is None
assert all(not persisted["sets"]["1"]["files"][band]["ready"] for band in ("5.5", "9.0"))
`;
  const result = spawnSync('python3', ['-c', probe], { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr || result.stdout);

  const source = await readFile(scriptUrl, 'utf8');
  const main = source.slice(source.indexOf('def main()'));
  assert.ok(
    main.indexOf('invalidate_selected_sets_for_generation(status, manifest, selected_sets)') < main.indexOf('import torch'),
    'main must persist revocation before loading Chatterbox or generating audio',
  );
  assert.match(source, /persisted_status = load_status\(\)[\s\S]*assert_generation_gate_revoked\(persisted_status, selected_sets\)[\s\S]*shutil\.copy2/);
});
