const DRAFT_SCHEMA_VERSION = 1;
const DRAFT_KEY_PREFIX = 'welearn:diagnostic:draft:';

export type DiagnosticSubmittedResponse =
  | { kind: 'single-choice'; optionId: string | null }
  | { kind: 'multiple-choice'; optionIds: string[] }
  | { kind: 'ordering'; optionIds: string[] }
  | { kind: 'short-text'; value: string };

export type DiagnosticDraftAnswer = {
  response: DiagnosticSubmittedResponse;
  responseMs: number | null;
  audioPlayCount: number | null;
};

type ObjectiveDraftItem = {
  id: string;
  response:
    | { kind: 'single-choice'; optionIds: readonly string[] }
    | { kind: 'multiple-choice'; optionIds: readonly string[]; selectCount: number }
    | { kind: 'ordering'; optionIds: readonly string[] }
    | { kind: 'short-text'; maxWords: number };
  stimulus: { kind: string; maxPlays?: number };
};

export type ObjectiveDraftContext = {
  attemptId: string;
  attemptVersion: number;
  stage: { stageId: string; itemIds: readonly string[] };
  items: readonly ObjectiveDraftItem[];
};

export type WritingDraftContext = {
  attemptId: string;
  attemptVersion: number;
  stage: { stageId: string };
  prompt: { id: string; contentVersion: string; maximumWords: number };
};

type ObjectiveDraft = {
  schemaVersion: typeof DRAFT_SCHEMA_VERSION;
  kind: 'objective';
  attemptId: string;
  attemptVersion: number;
  stageId: string;
  itemIds: string[];
  itemIndex: number;
  answers: Record<string, DiagnosticDraftAnswer>;
};

type WritingDraft = {
  schemaVersion: typeof DRAFT_SCHEMA_VERSION;
  kind: 'writing';
  attemptId: string;
  attemptVersion: number;
  stageId: string;
  promptId: string;
  promptContentVersion: string;
  text: string;
};

type SessionStore = Pick<Storage, 'getItem' | 'setItem' | 'removeItem' | 'key' | 'length'>;

function draftKey(attemptId: string, stageId: string): string {
  return `${DRAFT_KEY_PREFIX}${encodeURIComponent(attemptId)}:${encodeURIComponent(stageId)}`;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function sameStrings(actual: unknown, expected: readonly string[]): actual is string[] {
  return Array.isArray(actual)
    && actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);
}

function boundedInteger(value: unknown, maximum: number): number | null | undefined {
  if (value === null) return null;
  return Number.isInteger(value) && Number(value) >= 0 && Number(value) <= maximum ? Number(value) : undefined;
}

function validatedAnswer(value: unknown, item: ObjectiveDraftItem): DiagnosticDraftAnswer | null {
  if (!isRecord(value) || !isRecord(value.response)) return null;
  const response = value.response;
  let cleanResponse: DiagnosticSubmittedResponse;

  if (item.response.kind === 'single-choice') {
    const contract = item.response;
    if (response.kind !== 'single-choice') return null;
    if (response.optionId !== null && (typeof response.optionId !== 'string' || !contract.optionIds.includes(response.optionId))) return null;
    cleanResponse = { kind: 'single-choice', optionId: response.optionId as string | null };
  } else if (item.response.kind === 'multiple-choice') {
    const contract = item.response;
    if (response.kind !== 'multiple-choice' || !Array.isArray(response.optionIds)) return null;
    const optionIds = response.optionIds;
    if (optionIds.length > contract.selectCount
      || optionIds.some(optionId => typeof optionId !== 'string' || !contract.optionIds.includes(optionId))
      || new Set(optionIds).size !== optionIds.length) return null;
    cleanResponse = { kind: 'multiple-choice', optionIds: optionIds as string[] };
  } else if (item.response.kind === 'ordering') {
    const contract = item.response;
    if (response.kind !== 'ordering' || !Array.isArray(response.optionIds)) return null;
    const optionIds = response.optionIds;
    if (optionIds.length !== 0 && optionIds.length !== contract.optionIds.length) return null;
    if (optionIds.some(optionId => typeof optionId !== 'string' || !contract.optionIds.includes(optionId))
      || new Set(optionIds).size !== optionIds.length) return null;
    cleanResponse = { kind: 'ordering', optionIds: optionIds as string[] };
  } else {
    if (response.kind !== 'short-text' || typeof response.value !== 'string' || response.value.length > 20_000) return null;
    cleanResponse = { kind: 'short-text', value: response.value };
  }

  const responseMs = boundedInteger(value.responseMs, 3_600_000);
  const maxPlays = item.stimulus.kind === 'audio' && Number.isInteger(item.stimulus.maxPlays)
    ? Number(item.stimulus.maxPlays)
    : 0;
  const audioPlayCount = boundedInteger(value.audioPlayCount, maxPlays);
  if (responseMs === undefined || audioPlayCount === undefined) return null;
  if (item.stimulus.kind !== 'audio' && audioPlayCount !== null) return null;
  if (item.stimulus.kind === 'audio' && audioPlayCount === null) return null;
  return { response: cleanResponse, responseMs, audioPlayCount };
}

function readJson(storage: SessionStore, key: string): unknown {
  const raw = storage.getItem(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    storage.removeItem(key);
    return null;
  }
}

export function readObjectiveDraft(
  storage: SessionStore,
  context: ObjectiveDraftContext,
): Pick<ObjectiveDraft, 'answers' | 'itemIndex'> | null {
  const key = draftKey(context.attemptId, context.stage.stageId);
  const value = readJson(storage, key);
  if (!isRecord(value)
    || value.schemaVersion !== DRAFT_SCHEMA_VERSION
    || value.kind !== 'objective'
    || value.attemptId !== context.attemptId
    || value.attemptVersion !== context.attemptVersion
    || value.stageId !== context.stage.stageId
    || !sameStrings(value.itemIds, context.stage.itemIds)
    || !Number.isInteger(value.itemIndex)
    || Number(value.itemIndex) < 0
    || Number(value.itemIndex) >= context.items.length
    || !isRecord(value.answers)) {
    if (value !== null) storage.removeItem(key);
    return null;
  }

  const items = new Map(context.items.map(item => [item.id, item]));
  const answers: Record<string, DiagnosticDraftAnswer> = {};
  for (const [itemId, answer] of Object.entries(value.answers)) {
    const item = items.get(itemId);
    if (!item) { storage.removeItem(key); return null; }
    const clean = validatedAnswer(answer, item);
    if (!clean) { storage.removeItem(key); return null; }
    answers[itemId] = clean;
  }
  return { answers, itemIndex: Number(value.itemIndex) };
}

export function writeObjectiveDraft(
  storage: SessionStore,
  context: ObjectiveDraftContext,
  answers: Record<string, DiagnosticDraftAnswer>,
  itemIndex: number,
): void {
  const cleanAnswers: Record<string, DiagnosticDraftAnswer> = {};
  const items = new Map(context.items.map(item => [item.id, item]));
  for (const [itemId, answer] of Object.entries(answers)) {
    const item = items.get(itemId);
    if (!item) continue;
    const clean = validatedAnswer(answer, item);
    if (clean) cleanAnswers[itemId] = clean;
  }
  const draft: ObjectiveDraft = {
    schemaVersion: DRAFT_SCHEMA_VERSION,
    kind: 'objective',
    attemptId: context.attemptId,
    attemptVersion: context.attemptVersion,
    stageId: context.stage.stageId,
    itemIds: [...context.stage.itemIds],
    itemIndex: Math.max(0, Math.min(context.items.length - 1, Math.trunc(itemIndex))),
    answers: cleanAnswers,
  };
  storage.setItem(draftKey(context.attemptId, context.stage.stageId), JSON.stringify(draft));
}

export function readWritingDraft(storage: SessionStore, context: WritingDraftContext): string | null {
  const key = draftKey(context.attemptId, context.stage.stageId);
  const value = readJson(storage, key);
  if (!isRecord(value)
    || value.schemaVersion !== DRAFT_SCHEMA_VERSION
    || value.kind !== 'writing'
    || value.attemptId !== context.attemptId
    || value.attemptVersion !== context.attemptVersion
    || value.stageId !== context.stage.stageId
    || value.promptId !== context.prompt.id
    || value.promptContentVersion !== context.prompt.contentVersion
    || typeof value.text !== 'string'
    || value.text.length > 50_000) {
    if (value !== null) storage.removeItem(key);
    return null;
  }
  return value.text;
}

export function writeWritingDraft(storage: SessionStore, context: WritingDraftContext, text: string): void {
  const draft: WritingDraft = {
    schemaVersion: DRAFT_SCHEMA_VERSION,
    kind: 'writing',
    attemptId: context.attemptId,
    attemptVersion: context.attemptVersion,
    stageId: context.stage.stageId,
    promptId: context.prompt.id,
    promptContentVersion: context.prompt.contentVersion,
    text: text.slice(0, 50_000),
  };
  storage.setItem(draftKey(context.attemptId, context.stage.stageId), JSON.stringify(draft));
}

export function clearDiagnosticAttemptDrafts(storage: SessionStore, attemptId: string, keepStageId?: string): void {
  const attemptPrefix = `${DRAFT_KEY_PREFIX}${encodeURIComponent(attemptId)}:`;
  const keepKey = keepStageId ? draftKey(attemptId, keepStageId) : null;
  const keys: string[] = [];
  for (let index = 0; index < storage.length; index += 1) {
    const key = storage.key(index);
    if (key?.startsWith(attemptPrefix) && key !== keepKey) keys.push(key);
  }
  for (const key of keys) storage.removeItem(key);
}
