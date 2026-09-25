import { createHash } from 'node:crypto';

import { ENGLISH_DIAGNOSTIC_BLUEPRINT } from '../../lib/diagnostic/blueprint.ts';
import { LOCATOR_OBJECTIVE_SKILLS } from '../../lib/diagnostic/mst.ts';
import type {
  CefrLevel,
  DiagnosticObjectiveSkill,
  DiagnosticRouteId,
} from '../../lib/diagnostic/types.ts';
import type { DiagnosticBankRecord } from './types.ts';

export interface DiagnosticSelectionReceipt {
  stage: 'locator' | 'precision';
  seedFingerprint: string;
  routeId: DiagnosticRouteId | null;
  itemIds: readonly string[];
  allocation: Readonly<Record<DiagnosticObjectiveSkill, number>>;
}

export interface DiagnosticStageSelection {
  records: readonly DiagnosticBankRecord[];
  receipt: DiagnosticSelectionReceipt;
}

export interface DiagnosticCapacityDeficit {
  stage: 'locator' | 'precision';
  skill: DiagnosticObjectiveSkill;
  level: CefrLevel;
  required: number;
  available: number;
}

function stableRank(seed: string, itemId: string): string {
  return createHash('sha256').update(`${seed}\u0000${itemId}`).digest('hex');
}

function seedFingerprint(seed: string): string {
  return createHash('sha256').update(seed).digest('hex').slice(0, 16);
}

function isSelectable(record: DiagnosticBankRecord, language: string, excluded: ReadonlySet<string>): boolean {
  return record.publicItem.language === language
    && (record.status === 'pilot' || record.status === 'operational')
    && record.review.status === 'approved'
    && !excluded.has(record.publicItem.id);
}

function stimulusIdentity(record: DiagnosticBankRecord): string {
  const stimulus = record.publicItem.stimulus;
  if (stimulus.kind === 'audio') return `audio:${stimulus.mediaId}`;
  if (stimulus.kind === 'text') return `text:${stimulus.stimulusId}`;
  return `item:${record.publicItem.id}`;
}

function selectDistinctStimuli(
  records: readonly DiagnosticBankRecord[],
  count: number,
  seed: string,
): DiagnosticBankRecord[] {
  const ranked = [...records].sort((a, b) => {
    const rank = stableRank(seed, a.publicItem.id).localeCompare(stableRank(seed, b.publicItem.id));
    return rank || a.publicItem.id.localeCompare(b.publicItem.id);
  });
  const selected: DiagnosticBankRecord[] = [];
  const usedStimuli = new Set<string>();
  for (const record of ranked) {
    const stimulus = stimulusIdentity(record);
    if (usedStimuli.has(stimulus)) continue;
    selected.push(record);
    usedStimuli.add(stimulus);
    if (selected.length === count) return selected;
  }
  return selected;
}

function allocationFor(records: readonly DiagnosticBankRecord[]): Record<DiagnosticObjectiveSkill, number> {
  return Object.fromEntries(
    LOCATOR_OBJECTIVE_SKILLS.map(skill => [skill, records.filter(record => record.publicItem.skill === skill).length]),
  ) as Record<DiagnosticObjectiveSkill, number>;
}

function requireBucket(
  bank: readonly DiagnosticBankRecord[],
  language: string,
  skill: DiagnosticObjectiveSkill,
  level: CefrLevel,
  count: number,
  seed: string,
  excluded: ReadonlySet<string>,
): DiagnosticBankRecord[] {
  const candidates = bank.filter(record =>
    isSelectable(record, language, excluded)
    && record.publicItem.skill === skill
    && record.publicItem.levelCandidate === level,
  );
  const selected = selectDistinctStimuli(candidates, count, `${seed}:${skill}:${level}`);
  if (selected.length < count) {
    throw new Error(`diagnostic bank exhausted for ${skill}/${level}: required ${count}, available ${selected.length}`);
  }
  return selected;
}

export function selectEnglishLocator(
  bank: readonly DiagnosticBankRecord[],
  seed: string,
  excludedItemIds: ReadonlySet<string> = new Set(),
): DiagnosticStageSelection {
  if (!seed) throw new Error('selection seed is required');
  const records = LOCATOR_OBJECTIVE_SKILLS.flatMap(skill =>
    ENGLISH_DIAGNOSTIC_BLUEPRINT.locator.targetLevels.flatMap(level =>
      requireBucket(bank, 'en', skill, level, 1, seed, excludedItemIds),
    ),
  );
  return {
    records,
    receipt: {
      stage: 'locator', seedFingerprint: seedFingerprint(seed), routeId: null,
      itemIds: records.map(record => record.publicItem.id), allocation: allocationFor(records),
    },
  };
}

export function selectEnglishPrecisionStage(
  bank: readonly DiagnosticBankRecord[],
  routeId: DiagnosticRouteId,
  seed: string,
  usedItemIds: ReadonlySet<string>,
): DiagnosticStageSelection {
  if (!seed) throw new Error('selection seed is required');
  const route = ENGLISH_DIAGNOSTIC_BLUEPRINT.routes.find(candidate => candidate.id === routeId);
  if (!route) throw new Error(`unknown diagnostic route: ${routeId}`);
  const decisionsPerSkill = ENGLISH_DIAGNOSTIC_BLUEPRINT.precision.minimumDecisions / LOCATOR_OBJECTIVE_SKILLS.length;
  if (!Number.isInteger(decisionsPerSkill) || decisionsPerSkill % route.levels.length !== 0) {
    throw new Error('precision blueprint cannot be balanced across skills and route levels');
  }
  const perLevel = decisionsPerSkill / route.levels.length;
  const selectedIds = new Set(usedItemIds);
  const records: DiagnosticBankRecord[] = [];
  for (const skill of LOCATOR_OBJECTIVE_SKILLS) {
    for (const level of route.levels) {
      const selected = requireBucket(bank, 'en', skill, level, perLevel, seed, selectedIds);
      selected.forEach(record => selectedIds.add(record.publicItem.id));
      records.push(...selected);
    }
  }
  return {
    records,
    receipt: {
      stage: 'precision', seedFingerprint: seedFingerprint(seed), routeId,
      itemIds: records.map(record => record.publicItem.id), allocation: allocationFor(records),
    },
  };
}

export function auditEnglishMstCapacity(bank: readonly DiagnosticBankRecord[]): DiagnosticCapacityDeficit[] {
  const deficits: DiagnosticCapacityDeficit[] = [];
  for (const skill of LOCATOR_OBJECTIVE_SKILLS) {
    for (const level of ENGLISH_DIAGNOSTIC_BLUEPRINT.levels) {
      const available = new Set(
        bank
          .filter(record => isSelectable(record, 'en', new Set())
            && record.publicItem.skill === skill
            && record.publicItem.levelCandidate === level)
          .map(stimulusIdentity),
      ).size;
      // A2/B1/B2 need one locator item plus two same-level precision items.
      const required = ENGLISH_DIAGNOSTIC_BLUEPRINT.locator.targetLevels.includes(level) ? 3 : 2;
      if (available < required) deficits.push({ stage: 'precision', skill, level, required, available });
    }
  }
  return deficits;
}

