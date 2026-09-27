import { createHash } from 'node:crypto';

import type { DiagnosticBankRecord } from '../types.ts';

export const DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION = 'diagnostic-item-cue-audit-v2';
export const DIAGNOSTIC_BANK_REVIEW_POLICY_VERSION = 'diagnostic-bank-review-policy-v3';

export type DiagnosticItemCueCode =
  | 'DUPLICATE_NORMALIZED_OPTIONS'
  | 'META_RESPONSE_OPTION'
  | 'ABSOLUTE_LANGUAGE_ASYMMETRY'
  | 'KEY_MATERIALLY_LONGER'
  | 'KEY_MATERIALLY_SHORTER'
  | 'OPTION_LENGTH_SPREAD'
  | 'CAPITALIZATION_PATTERN_BREAK'
  | 'TERMINAL_PUNCTUATION_PATTERN_BREAK';

export interface DiagnosticItemCueFinding {
  code: DiagnosticItemCueCode;
  severity: 'blocking' | 'review';
  optionPositions: readonly number[];
  evidence: string;
  reviewQuestion: string;
}

export interface DiagnosticItemCueAudit {
  auditVersion: typeof DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION;
  disposition: 'NO_AUTOMATED_CUE_FOUND' | 'HUMAN_REVIEW_REQUIRED' | 'BLOCKING_DEFECT';
  keyPosition: number;
  optionProfiles: readonly {
    position: number;
    tokenCount: number;
    characterCount: number;
  }[];
  findings: readonly DiagnosticItemCueFinding[];
}

const META_RESPONSE = /^(?:all|none)\s+of\s+(?:the\s+)?(?:above|these)|^(?:both|either|neither)\s+[a-z]\s+(?:and|or|nor)\s+[a-z]$/iu;
const ABSOLUTE_LANGUAGE = /\b(?:always|never|only|every(?:one|thing|where)?|all|none|entirely|completely|impossible|inevitably|obviously|definitely|unlawful|exclusively)\b|\bno reasonable\b|\bof any kind\b/iu;
const FILL_IN_PROMPT = /_{2,}|\bcomplete\b/iu;

function normalizeOption(text: string): string {
  return text.normalize('NFKC').toLocaleLowerCase('en')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/gu, ' ')
    .trim();
}

function tokens(text: string): readonly string[] {
  return text.normalize('NFKC').match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) ?? [];
}

function terminalPunctuation(text: string): string {
  return text.trim().match(/[.!?]$/u)?.[0] ?? 'none';
}

function startsUppercase(text: string): boolean | null {
  const firstLetter = text.match(/\p{L}/u)?.[0];
  return firstLetter ? firstLetter === firstLetter.toLocaleUpperCase('en') : null;
}

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? Number.POSITIVE_INFINITY : numerator / denominator;
}

function rounded(value: number): string {
  return Number.isFinite(value) ? value.toFixed(2) : 'infinite';
}

export function auditDiagnosticItemCues(record: DiagnosticBankRecord): DiagnosticItemCueAudit {
  if (record.publicItem.response.kind !== 'single-choice'
    || record.scoring.kind !== 'single-choice'
    || !record.publicItem.displayOptions?.length) {
    throw new Error(`${record.publicItem.id}: cue audit requires a single-choice item with display options`);
  }
  const options = record.publicItem.displayOptions;
  const scoring = record.scoring;
  const keyIndex = options.findIndex(option => option.id === scoring.optionId);
  if (keyIndex < 0) throw new Error(`${record.publicItem.id}: cue audit cannot resolve the scoring key`);
  const profiles = options.map((option, index) => ({
    position: index + 1,
    tokenCount: tokens(option.text).length,
    characterCount: normalizeOption(option.text).length,
  }));
  const findings: DiagnosticItemCueFinding[] = [];

  const normalizedGroups = new Map<string, number[]>();
  options.forEach((option, index) => {
    const normalized = normalizeOption(option.text);
    normalizedGroups.set(normalized, [...(normalizedGroups.get(normalized) ?? []), index + 1]);
  });
  const duplicatePositions = [...normalizedGroups.values()].filter(group => group.length > 1).flat();
  if (duplicatePositions.length) {
    findings.push({
      code: 'DUPLICATE_NORMALIZED_OPTIONS', severity: 'blocking', optionPositions: duplicatePositions,
      evidence: 'Two or more options become identical after case, punctuation and whitespace normalization.',
      reviewQuestion: 'Replace the duplicate options before this item can be approved.',
    });
  }

  const metaPositions = options.flatMap((option, index) => META_RESPONSE.test(normalizeOption(option.text)) ? [index + 1] : []);
  if (metaPositions.length) {
    findings.push({
      code: 'META_RESPONSE_OPTION', severity: 'review', optionPositions: metaPositions,
      evidence: 'An option uses an all/none/both/either response shortcut.',
      reviewQuestion: 'Does this option create test-wiseness unrelated to the target construct?',
    });
  }

  const absolutePositions = options.flatMap((option, index) =>
    ABSOLUTE_LANGUAGE.test(option.text) ? [index + 1] : []);
  const distractorPositions = options.flatMap((_, index) => index === keyIndex ? [] : [index + 1]);
  if (!absolutePositions.includes(keyIndex + 1)
    && distractorPositions.every(position => absolutePositions.includes(position))) {
    findings.push({
      code: 'ABSOLUTE_LANGUAGE_ASYMMETRY', severity: 'review', optionPositions: distractorPositions,
      evidence: 'Both distractors use absolute or extreme language while the keyed option does not.',
      reviewQuestion: 'Is the contrast required by the construct, or can a candidate choose the uniquely qualified option without understanding the target language or text?',
    });
  }

  const key = profiles[keyIndex];
  const distractors = profiles.filter((_, index) => index !== keyIndex);
  const distractorMeanTokens = distractors.reduce((sum, item) => sum + item.tokenCount, 0) / distractors.length;
  const distractorMeanCharacters = distractors.reduce((sum, item) => sum + item.characterCount, 0) / distractors.length;
  const longerByTokens = key.tokenCount >= Math.max(...distractors.map(item => item.tokenCount)) + 2
    && ratio(key.tokenCount, distractorMeanTokens) >= 1.6;
  const longerByCharacters = key.characterCount >= Math.max(...distractors.map(item => item.characterCount)) + 10
    && ratio(key.characterCount, distractorMeanCharacters) >= 1.6;
  if (longerByTokens || longerByCharacters) {
    findings.push({
      code: 'KEY_MATERIALLY_LONGER', severity: 'review', optionPositions: [key.position],
      evidence: `The keyed option is materially longer than its distractors (token ratio ${rounded(ratio(key.tokenCount, distractorMeanTokens))}; character ratio ${rounded(ratio(key.characterCount, distractorMeanCharacters))}).`,
      reviewQuestion: 'Is the extra length construct-relevant, or does it reveal the answer?',
    });
  }
  const shorterByTokens = key.tokenCount + 2 <= Math.min(...distractors.map(item => item.tokenCount))
    && ratio(key.tokenCount, distractorMeanTokens) <= 0.625;
  const shorterByCharacters = key.characterCount + 10 <= Math.min(...distractors.map(item => item.characterCount))
    && ratio(key.characterCount, distractorMeanCharacters) <= 0.625;
  if (shorterByTokens || shorterByCharacters) {
    findings.push({
      code: 'KEY_MATERIALLY_SHORTER', severity: 'review', optionPositions: [key.position],
      evidence: `The keyed option is materially shorter than its distractors (token ratio ${rounded(ratio(key.tokenCount, distractorMeanTokens))}; character ratio ${rounded(ratio(key.characterCount, distractorMeanCharacters))}).`,
      reviewQuestion: 'Is the brevity construct-relevant, or does it reveal the answer?',
    });
  }

  const maximumTokens = Math.max(...profiles.map(item => item.tokenCount));
  const minimumTokens = Math.min(...profiles.map(item => item.tokenCount));
  const maximumCharacters = Math.max(...profiles.map(item => item.characterCount));
  const minimumCharacters = Math.min(...profiles.map(item => item.characterCount));
  if ((maximumTokens >= minimumTokens + 3 && ratio(maximumTokens, minimumTokens) >= 2.5)
    || (maximumCharacters >= minimumCharacters + 14 && ratio(maximumCharacters, minimumCharacters) >= 2.5)) {
    findings.push({
      code: 'OPTION_LENGTH_SPREAD', severity: 'review', optionPositions: profiles.map(item => item.position),
      evidence: `The option set has a wide length spread (${minimumTokens}-${maximumTokens} tokens; ${minimumCharacters}-${maximumCharacters} normalized characters).`,
      reviewQuestion: 'Are the options sufficiently parallel to prevent length-based guessing?',
    });
  }

  if (!FILL_IN_PROMPT.test(record.publicItem.prompt)) {
    const capitalization = options.map(option => startsUppercase(option.text));
    const known = capitalization.filter(value => value !== null);
    if (known.length === options.length && new Set(known).size > 1
      && known.filter(Boolean).length !== known.length / 2) {
      findings.push({
        code: 'CAPITALIZATION_PATTERN_BREAK', severity: 'review',
        optionPositions: capitalization.flatMap((value, index) => value === (known.filter(Boolean).length === 1) ? [index + 1] : []),
        evidence: 'One option breaks the capitalization pattern of the other options.',
        reviewQuestion: 'Does capitalization disclose option type or correctness?',
      });
    }
  }

  const terminals = options.map(option => terminalPunctuation(option.text));
  const terminalCounts = new Map<string, number>();
  for (const terminal of terminals) terminalCounts.set(terminal, (terminalCounts.get(terminal) ?? 0) + 1);
  if (terminalCounts.size > 1) {
    const singleton = [...terminalCounts].find(([, count]) => count === 1)?.[0];
    if (singleton) {
      findings.push({
        code: 'TERMINAL_PUNCTUATION_PATTERN_BREAK', severity: 'review',
        optionPositions: terminals.flatMap((value, index) => value === singleton ? [index + 1] : []),
        evidence: 'One option breaks the terminal-punctuation pattern of the other options.',
        reviewQuestion: 'Is the punctuation difference linguistically necessary and non-cueing?',
      });
    }
  }

  return {
    auditVersion: DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION,
    disposition: findings.some(finding => finding.severity === 'blocking')
      ? 'BLOCKING_DEFECT'
      : findings.length ? 'HUMAN_REVIEW_REQUIRED' : 'NO_AUTOMATED_CUE_FOUND',
    keyPosition: keyIndex + 1,
    optionProfiles: profiles,
    findings,
  };
}

export function diagnosticItemCueAuditAggregate(records: readonly DiagnosticBankRecord[]) {
  type AggregateCell = {
    level: string;
    skill: string;
    items: number;
    flaggedItems: number;
    blockingItems: number;
    keyPositions: number[];
    findings: Record<string, number>;
  };
  const cells = new Map<string, AggregateCell>();
  for (const record of [...records].sort((left, right) => left.publicItem.id.localeCompare(right.publicItem.id))) {
    const audit = auditDiagnosticItemCues(record);
    const cellKey = `${record.publicItem.levelCandidate}:${record.publicItem.skill}`;
    const cell: AggregateCell = cells.get(cellKey) ?? {
      level: record.publicItem.levelCandidate,
      skill: record.publicItem.skill,
      items: 0,
      flaggedItems: 0,
      blockingItems: 0,
      keyPositions: Array(record.publicItem.displayOptions?.length ?? 0).fill(0),
      findings: {},
    };
    cell.items += 1;
    if (audit.findings.length) cell.flaggedItems += 1;
    if (audit.disposition === 'BLOCKING_DEFECT') cell.blockingItems += 1;
    cell.keyPositions[audit.keyPosition - 1] += 1;
    for (const finding of audit.findings) cell.findings[finding.code] = (cell.findings[finding.code] ?? 0) + 1;
    cells.set(cellKey, cell);
  }
  const orderedCells = [...cells.values()].sort((left, right) =>
    left.level.localeCompare(right.level) || left.skill.localeCompare(right.skill));
  const totals = orderedCells.reduce((result, cell) => ({
    items: result.items + cell.items,
    flaggedItems: result.flaggedItems + cell.flaggedItems,
    blockingItems: result.blockingItems + cell.blockingItems,
  }), { items: 0, flaggedItems: 0, blockingItems: 0 });
  return { auditVersion: DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION, totals, cells: orderedCells };
}

export function diagnosticReviewBasisSha256(
  contentSha256: string,
  kind: 'objective' | 'writing',
  cueAudit: DiagnosticItemCueAudit | null = null,
): string {
  const reviewPolicy = kind === 'objective'
    ? { version: DIAGNOSTIC_BANK_REVIEW_POLICY_VERSION, cueAuditVersion: DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION }
    : { version: DIAGNOSTIC_BANK_REVIEW_POLICY_VERSION, cueAuditVersion: null };
  if (kind === 'objective' && cueAudit?.auditVersion !== DIAGNOSTIC_ITEM_CUE_AUDIT_VERSION) {
    throw new Error('objective review basis requires the current cue audit');
  }
  if (kind === 'writing' && cueAudit !== null) throw new Error('writing review basis cannot include an objective cue audit');
  return createHash('sha256').update(JSON.stringify({ contentSha256, kind, reviewPolicy, cueAudit })).digest('hex');
}
