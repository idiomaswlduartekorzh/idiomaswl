export interface IeltsPracticeAnswers {
  fills: Record<string, string>;
  mcq: Record<string, number>;
  ms: Record<string, string[]>;
  match: Record<string, string>;
  write: Record<string, string>;
  speak: Record<string, string>;
}

export interface IeltsPracticeDraft {
  schemaVersion: 1;
  mockId: string;
  contentVersion: string;
  activeSkill: string;
  expiresAt: number;
  savedAt: number;
  answers: IeltsPracticeAnswers;
}

const DRAFT_PREFIX = 'wl_ielts_practice_draft';
const MAX_TEXT_LENGTH = 100_000;

export function emptyIeltsPracticeAnswers(): IeltsPracticeAnswers {
  return { fills: {}, mcq: {}, ms: {}, match: {}, write: {}, speak: {} };
}

export function ieltsPracticeDraftKey(mockId: string, contentVersion: string): string {
  return `${DRAFT_PREFIX}:${mockId}:${contentVersion}`;
}

function recordOfStrings(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries: [string, string][] = [];
  for (const [key, item] of Object.entries(value)) {
    if (typeof item !== 'string' || item.length > MAX_TEXT_LENGTH) return null;
    entries.push([key, item]);
  }
  return Object.fromEntries(entries);
}

function recordOfNumbers(value: unknown): Record<string, number> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries: [string, number][] = [];
  for (const [key, item] of Object.entries(value)) {
    if (!Number.isInteger(item) || (item as number) < 0 || (item as number) > 20) return null;
    entries.push([key, item as number]);
  }
  return Object.fromEntries(entries);
}

function recordOfStringArrays(value: unknown): Record<string, string[]> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries: [string, string[]][] = [];
  for (const [key, item] of Object.entries(value)) {
    if (!Array.isArray(item) || item.some(choice => typeof choice !== 'string' || choice.length > 10)) return null;
    entries.push([key, [...new Set(item as string[])]]);
  }
  return Object.fromEntries(entries);
}

/**
 * Accepts only a draft for the current editorial version. Recording blobs are
 * deliberately excluded: browsers cannot reliably retain microphone evidence
 * in localStorage, so a restored attempt must record Speaking again.
 */
export function parseIeltsPracticeDraft(
  serialized: string | null,
  expectedMockId: string,
  expectedContentVersion: string,
): IeltsPracticeDraft | null {
  if (!serialized || serialized.length > 1_000_000) return null;
  try {
    const candidate = JSON.parse(serialized) as Partial<IeltsPracticeDraft>;
    if (candidate.schemaVersion !== 1
      || candidate.mockId !== expectedMockId
      || candidate.contentVersion !== expectedContentVersion
      || typeof candidate.activeSkill !== 'string'
      || !Number.isFinite(candidate.expiresAt)
      || !Number.isFinite(candidate.savedAt)
      || !candidate.answers) return null;

    const fills = recordOfStrings(candidate.answers.fills);
    const mcq = recordOfNumbers(candidate.answers.mcq);
    const ms = recordOfStringArrays(candidate.answers.ms);
    const match = recordOfStrings(candidate.answers.match);
    const write = recordOfStrings(candidate.answers.write);
    const speak = recordOfStrings(candidate.answers.speak);
    if (!fills || !mcq || !ms || !match || !write || !speak) return null;

    return {
      schemaVersion: 1,
      mockId: candidate.mockId,
      contentVersion: candidate.contentVersion,
      activeSkill: candidate.activeSkill,
      expiresAt: candidate.expiresAt as number,
      savedAt: candidate.savedAt as number,
      answers: { fills, mcq, ms, match, write, speak },
    };
  } catch {
    return null;
  }
}

export function createIeltsPracticeDraft(input: Omit<IeltsPracticeDraft, 'schemaVersion' | 'savedAt'>): IeltsPracticeDraft {
  return { schemaVersion: 1, savedAt: Date.now(), ...input };
}
