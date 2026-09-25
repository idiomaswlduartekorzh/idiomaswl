import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { CEFR_LEVELS } from '../src/lib/diagnostic/types.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from '../src/server/diagnostic/bank/language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from '../src/server/diagnostic/bank/reading.en.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from '../src/server/diagnostic/bank/writing.en.ts';
import { ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK } from '../src/server/diagnostic/bank/index.ts';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const outputPath = join(root, 'docs/diagnostic-bank-readiness.json');
const writeMode = process.argv.includes('--write');
const skills = ['reading', 'listening', 'grammar', 'vocabulary'];
const authored = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];

function stimulusIdentity(record) {
  const stimulus = record.publicItem.stimulus;
  if (stimulus.kind === 'audio') return `audio:${stimulus.mediaId}`;
  if (stimulus.kind === 'text') return `text:${stimulus.stimulusId}`;
  return `item:${record.publicItem.id}`;
}

const cells = CEFR_LEVELS.flatMap((level) => skills.map((skill) => {
  const cell = authored.filter((record) => record.publicItem.levelCandidate === level && record.publicItem.skill === skill);
  const approved = ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK.filter((record) =>
    record.publicItem.levelCandidate === level && record.publicItem.skill === skill && record.review.status === 'approved');
  const operational = approved.filter((record) => record.status === 'operational' && record.exposure === 'reserved');
  const reservedDrafts = cell.filter((record) => record.status === 'reserved' && record.exposure === 'reserved');
  const exposedDrafts = cell.filter((record) => record.exposure !== 'reserved');
  const requiredStimuli = skill === 'reading' || skill === 'listening' ? 6 : null;
  const reservedDraftStimuli = new Set(reservedDrafts.map(stimulusIdentity)).size;
  return {
    level,
    skill,
    requirements: { decisions: 12, distinctStimuli: requiredStimuli },
    authored: {
      reservedDraftDecisions: reservedDrafts.length,
      nonReservedDraftDecisions: exposedDrafts.length,
      reservedDraftDistinctStimuli: reservedDraftStimuli,
    },
    approvedPilotDecisions: approved.filter((record) => record.status === 'pilot').length,
    operationalDecisions: operational.length,
    authoringGap: Math.max(0, 12 - reservedDrafts.length),
    operationalGap: Math.max(0, 12 - operational.length),
    stimulusAuthoringGap: requiredStimuli === null ? null : Math.max(0, requiredStimuli - reservedDraftStimuli),
  };
}));

const writing = CEFR_LEVELS.map((level) => {
  const prompts = ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES.filter((record) => record.publicPrompt.levelCandidate === level);
  return {
    level,
    requiredParallelPrompts: 4,
    reservedDraftPrompts: prompts.filter((record) => record.status === 'reserved' && record.exposure === 'reserved').length,
    approvedPrompts: prompts.filter((record) => record.review.status === 'approved').length,
  };
});

const report = {
  reportVersion: 'diagnostic-bank-readiness-v1',
  snapshotDate: '2026-09-24',
  releaseReady: false,
  note: 'Draft counts show editorial progress only. They are not approved, calibrated, or selectable.',
  summary: {
    requiredObjectiveDecisions: cells.reduce((sum, cell) => sum + cell.requirements.decisions, 0),
    reservedDraftObjectiveDecisions: cells.reduce((sum, cell) => sum + cell.authored.reservedDraftDecisions, 0),
    nonReservedDraftObjectiveDecisions: cells.reduce((sum, cell) => sum + cell.authored.nonReservedDraftDecisions, 0),
    operationalObjectiveDecisions: cells.reduce((sum, cell) => sum + cell.operationalDecisions, 0),
    objectiveCellsWithDraftCapacity: cells.filter((cell) => cell.authoringGap === 0 && (cell.stimulusAuthoringGap ?? 0) === 0).length,
    objectiveCellsRequired: cells.length,
    writingDraftPrompts: writing.reduce((sum, row) => sum + row.reservedDraftPrompts, 0),
    writingApprovedPrompts: writing.reduce((sum, row) => sum + row.approvedPrompts, 0),
  },
  objectiveCells: cells,
  writing,
};

const rendered = `${JSON.stringify(report, null, 2)}\n`;
if (writeMode) {
  writeFileSync(outputPath, rendered);
  process.stdout.write(`Wrote ${outputPath}\n`);
} else {
  if (!existsSync(outputPath)) throw new Error(`Missing ${outputPath}; run with --write`);
  if (readFileSync(outputPath, 'utf8') !== rendered) {
    throw new Error('Diagnostic bank readiness report is stale; regenerate it with --write');
  }
  process.stdout.write(`✓ Bank readiness current: ${report.summary.reservedDraftObjectiveDecisions}/${report.summary.requiredObjectiveDecisions} reserved draft decisions\n`);
}
