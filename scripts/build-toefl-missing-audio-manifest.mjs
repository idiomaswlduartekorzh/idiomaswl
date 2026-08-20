import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { TOEFL_FIXED_LISTENING_SETS_1_TO_5 } from '../src/data/toefl/listening-fixed-sets-1-5.ts';
import { TOEFL_FIXED_LISTENING_SETS_6_TO_10 } from '../src/data/toefl/listening-fixed-sets-6-10.ts';
import { TOEFL_FIXED_LISTENING_SETS_11_TO_15 } from '../src/data/toefl/listening-fixed-sets-11-15.ts';
import { TOEFL_FIXED_LISTENING_SETS_16_TO_20 } from '../src/data/toefl/listening-fixed-sets-16-20.ts';
import { TOEFL_FIXED_REPEAT_BY_SET } from '../src/data/toefl/speaking-fixed-repeat.ts';

const require = createRequire(import.meta.url);
const ts = require('typescript');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, '..');
const outputPath = path.join(repoRoot, 'docs', 'toefl-2026-missing-audio-manifest-2026-08-20.tsv');
const shouldWrite = process.argv.includes('--write');
const wordCount = (text) => text.match(/[A-Za-z]+(?:[’'][A-Za-z]+)?/g)?.length ?? 0;
const sha256 = (text) => createHash('sha256').update(text).digest('hex');
const oneLine = (value) => String(value).replace(/[\t\r\n]+/g, ' ').trim();

const sampleMediaIds = new Set([
  'media:toefl:set-1:listening-m1-choose-6',
  'media:toefl:set-1:listening-m2-choose-1',
  'media:toefl:set-1:listening-m2-conversation',
  'media:toefl:set-1:listening-m2-announcement',
  'media:toefl:set-1:listening-m2-academic-talk',
  'media:toefl:set-1:speaking-repeat-7',
  'media:toefl:set-1:speaking-interview-1',
  'media:toefl:set-2:listening-m1-choose-6',
  'media:toefl:set-2:listening-m1-choose-7',
  'media:toefl:set-2:listening-m2-conversation',
]);

function sourceBatch(setNumber) {
  if (setNumber <= 5) return '1-5';
  if (setNumber <= 10) return '6-10';
  if (setNumber <= 15) return '11-15';
  return '16-20';
}

function castProfile(label) {
  const normalized = label.toUpperCase();
  if (normalized === 'STUDENT') return 'student';
  if (normalized === 'PROFESSOR' || normalized === 'INSTRUCTOR') return 'professor';
  if (normalized === 'ANNOUNCER') return 'announcer';
  return 'staff';
}

function labeledSegments(script, fallbackRoles) {
  const blocks = script.trim().split(/\n\s*\n/).map((block) => block.trim()).filter(Boolean);
  const segments = [];
  for (const block of blocks) {
    const match = block.match(/^([A-Z][A-Z ]+):\s*([\s\S]*)$/);
    if (match) {
      segments.push({ speaker: match[1], profile: castProfile(match[1]), text: match[2].trim() });
    } else if (segments.length > 0) {
      segments.at(-1).text += `\n\n${block}`;
    } else {
      segments.push({ speaker: fallbackRoles[0] ?? 'NARRATOR', profile: fallbackRoles[0] ?? 'narrator', text: block });
    }
  }
  return segments;
}

function row({
  setNumber,
  section,
  module,
  task,
  mediaId,
  plannedUrl,
  sourceItemIds,
  sourceRef,
  script,
  declaredRoles,
  segments,
}) {
  return {
    media_id: mediaId,
    set_id: `set-${setNumber}`,
    section,
    module,
    task,
    source_item_ids: sourceItemIds.join(';'),
    planned_url: plannedUrl,
    source_ref: sourceRef,
    script_sha256: sha256(script.trim()),
    source_script_characters: script.trim().length,
    billable_characters: segments.reduce((total, segment) => total + segment.text.length, 0),
    words: segments.reduce((total, segment) => total + wordCount(segment.text), 0),
    request_segments: segments.length,
    speaker_labels: [...new Set(segments.map((segment) => segment.speaker))].join(';'),
    declared_voice_roles: [...new Set(declaredRoles)].join(';'),
    cast_profiles: [...new Set(segments.map((segment) => segment.profile))].join(';'),
    target_profile: 'mp3_44100_64_mono_after_QA',
    sample_candidate: sampleMediaIds.has(mediaId) ? 'yes' : 'no',
    media_status: 'script-ready-audio-blocked',
    approval_status: 'blocked_pending_owner_manifest_voices_sample_cost',
    _segments: segments.map((segment) => ({ ...segment })),
  };
}

const listeningSets = [
  ...TOEFL_FIXED_LISTENING_SETS_1_TO_5,
  ...TOEFL_FIXED_LISTENING_SETS_6_TO_10,
  ...TOEFL_FIXED_LISTENING_SETS_11_TO_15,
  ...TOEFL_FIXED_LISTENING_SETS_16_TO_20,
];

const rows = [];
for (const set of listeningSets) {
  const batch = sourceBatch(set.setNumber);
  const sourceFile = `src/data/toefl/listening-fixed-sets-${batch}.ts`;
  const listeningEntries = [
    ...set.module1ChooseAdditions.map((entry) => ({ entry, module: 'listening-1' })),
    ...set.module2.choose.map((entry) => ({ entry, module: 'listening-2' })),
    { entry: set.module2.conversation, module: 'listening-2' },
    { entry: set.module2.announcement, module: 'listening-2' },
    { entry: set.module2.academic, module: 'listening-2' },
  ];
  for (const { entry, module } of listeningEntries) {
    const isChoose = entry.task === 'choose-response';
    const segments = isChoose
      ? [{ speaker: entry.voiceRoles[0], profile: entry.voiceRoles[0], text: entry.script.trim() }]
      : labeledSegments(entry.script, entry.voiceRoles);
    rows.push(row({
      setNumber: set.setNumber,
      section: 'listening',
      module,
      task: entry.task,
      mediaId: entry.mediaId,
      plannedUrl: entry.plannedAudioUrl,
      sourceItemIds: isChoose ? [entry.item.id] : entry.items.map((item) => item.id),
      sourceRef: `${sourceFile}#${entry.mediaId}`,
      script: entry.script,
      declaredRoles: entry.voiceRoles,
      segments,
    }));
  }

  for (const repeat of TOEFL_FIXED_REPEAT_BY_SET[set.setNumber] ?? []) {
    rows.push(row({
      setNumber: set.setNumber,
      section: 'speaking',
      module: 'speaking',
      task: 'listen-and-repeat',
      mediaId: repeat.mediaId,
      plannedUrl: repeat.plannedAudioUrl,
      sourceItemIds: [repeat.id],
      sourceRef: `src/data/toefl/speaking-fixed-repeat.ts#${repeat.id}`,
      script: repeat.targetSentence,
      declaredRoles: [repeat.voiceRole],
      segments: [{ speaker: repeat.voiceRole, profile: repeat.voiceRole, text: repeat.targetSentence.trim() }],
    }));
  }
}

function propertyMap(node, sourceFile) {
  return Object.fromEntries(node.properties
    .filter(ts.isPropertyAssignment)
    .map((property) => {
      const name = ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)
        ? property.name.text
        : property.name.getText(sourceFile).replace(/^['"]|['"]$/g, '');
      return [name, property.initializer];
    }));
}

function stringLiteral(node) {
  return node && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) ? node.text : null;
}

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const relativeFile = `src/data/mocks/toefl-set-${setNumber}.ts`;
  const absoluteFile = path.join(repoRoot, relativeFile);
  const sourceFile = ts.createSourceFile(
    absoluteFile,
    readFileSync(absoluteFile, 'utf8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TS,
  );
  const interviews = [];
  const visit = (node) => {
    if (ts.isObjectLiteralExpression(node)) {
      const properties = propertyMap(node, sourceFile);
      if (stringLiteral(properties.type) === 'speak') {
        const id = stringLiteral(properties.id);
        const sourceText = stringLiteral(properties.text);
        const partNumber = Number(properties.partNumber?.getText(sourceFile));
        assert.ok(id && sourceText && Number.isInteger(partNumber), `${relativeFile} has a malformed Interview item`);
        interviews.push({ id, sourceText, partNumber });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  assert.equal(interviews.length, 4, `${relativeFile} must expose four Interview prompts`);
  interviews.sort((a, b) => a.partNumber - b.partNumber);
  for (const interview of interviews) {
    const script = interview.sourceText.replace(/^Interviewer:\s*/i, '').trim();
    const mediaId = `media:toefl:set-${setNumber}:speaking-interview-${interview.partNumber}`;
    rows.push(row({
      setNumber,
      section: 'speaking',
      module: 'speaking',
      task: 'take-an-interview',
      mediaId,
      plannedUrl: `/audio/toefl/set-${setNumber}/interview-${interview.partNumber}.mp3`,
      sourceItemIds: [interview.id],
      sourceRef: `${relativeFile}#${interview.id}`,
      script,
      declaredRoles: ['interviewer'],
      segments: [{ speaker: 'INTERVIEWER', profile: 'interviewer', text: script }],
    }));
  }
}

rows.sort((a, b) => Number(a.set_id.slice(4)) - Number(b.set_id.slice(4))
  || a.section.localeCompare(b.section)
  || a.planned_url.localeCompare(b.planned_url));

assert.equal(rows.length, 400, 'the fixed expansion must plan exactly 400 missing audio files');
assert.equal(new Set(rows.map((entry) => entry.media_id)).size, 400, 'media IDs must be unique');
assert.equal(new Set(rows.map((entry) => entry.planned_url)).size, 400, 'planned URLs must be unique');
assert.equal(rows.filter((entry) => entry.sample_candidate === 'yes').length, 10, 'the proposed pilot must exercise all ten casting profiles');
assert.ok(rows.every((entry) => !existsSync(path.join(repoRoot, 'public', entry.planned_url))), 'planned output must not overwrite an existing file');

const fields = Object.keys(rows[0]).filter((field) => !field.startsWith('_'));
const metadata = [
  ['manifest_id', 'toefl-2026-missing-audio-manifest'],
  ['manifest_version', '2026-08-20.v1'],
  ['scope', '400_new_files_only;260_existing_mp3_preserved'],
  ['generation_authorized', 'no'],
].map(([key, value]) => `# ${key}\t${value}`);
const tsv = `${metadata.join('\n')}\n${fields.join('\t')}\n${rows.map((entry) => fields.map((field) => oneLine(entry[field])).join('\t')).join('\n')}\n`;
const byTask = rows.reduce((groups, entry) => {
  const group = groups.get(entry.task) ?? [];
  group.push(entry);
  groups.set(entry.task, group);
  return groups;
}, new Map());
const summary = {
  files: rows.length,
  billableCharacters: rows.reduce((total, entry) => total + entry.billable_characters, 0),
  sourceScriptCharacters: rows.reduce((total, entry) => total + entry.source_script_characters, 0),
  words: rows.reduce((total, entry) => total + entry.words, 0),
  requestSegments: rows.reduce((total, entry) => total + entry.request_segments, 0),
  sampleFiles: rows.filter((entry) => entry.sample_candidate === 'yes').length,
  sampleBillableCharacters: rows.filter((entry) => entry.sample_candidate === 'yes')
    .reduce((total, entry) => total + entry.billable_characters, 0),
  byTask: Object.fromEntries([...byTask.entries()].map(([task, entries]) => [task, {
    files: entries.length,
    billableCharacters: entries.reduce((total, entry) => total + entry.billable_characters, 0),
    requestSegments: entries.reduce((total, entry) => total + entry.request_segments, 0),
  }])),
  manifestSha256: sha256(tsv),
};

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  if (shouldWrite) {
    writeFileSync(outputPath, tsv, 'utf8');
    console.log(`wrote ${path.relative(repoRoot, outputPath)}`);
  } else {
    assert.ok(existsSync(outputPath), 'checked-in missing-audio manifest must exist');
    assert.equal(readFileSync(outputPath, 'utf8'), tsv, 'checked-in missing-audio manifest is stale; run with --write');
  }
  console.log(JSON.stringify(summary, null, 2));
}

export { rows as TOEFL_MISSING_AUDIO_ROWS, summary as TOEFL_MISSING_AUDIO_SUMMARY };
