import type { IeltsListeningPart } from './listening-practice-contract';

export interface IeltsListeningRegistryIdentity {
  readonly id: string;
  readonly contentVersion: string;
  readonly part: IeltsListeningPart;
  readonly practiceNumber: number;
}

export interface IeltsListeningRegistryEntryIdentity {
  readonly key: string;
  readonly identity: IeltsListeningRegistryIdentity;
}

export interface IeltsListeningRegistryBundleSnapshot extends IeltsListeningRegistryEntryIdentity {
  readonly publicPractice: {
    readonly id: string;
    readonly contentVersion: string;
    readonly part: IeltsListeningPart;
    readonly practiceNumber: number;
    readonly questionCount: number;
    readonly questionRange: readonly number[];
  };
  readonly publicQuestionNumbers: readonly number[];
  readonly questionNumbers: readonly number[];
  readonly scoreProbe: {
    readonly total: number;
    readonly outcomes: ReadonlyArray<{ readonly number: number }>;
  };
}

export interface IeltsListeningPublicCatalogEntry {
  readonly practiceId: string;
  readonly contentVersion: string;
  readonly part: IeltsListeningPart;
  readonly practiceNumber: number;
  readonly publication: 'public';
}

export function assertIeltsListeningScoringIdentity(
  expected: IeltsListeningRegistryIdentity,
  actual: IeltsListeningRegistryIdentity,
): void {
  if (
    actual.id !== expected.id
    || actual.contentVersion !== expected.contentVersion
    || actual.part !== expected.part
    || actual.practiceNumber !== expected.practiceNumber
  ) {
    throw new Error(`IELTS Listening scorer identity mismatch for ${expected.id}.`);
  }
}

export function assertIeltsListeningRegistryEntries(
  entries: readonly IeltsListeningRegistryEntryIdentity[],
): void {
  if (!entries.length) throw new Error('IELTS Listening registry cannot be empty.');

  const keys = new Set<string>();
  const identityIds = new Set<string>();
  const partPracticePairs = new Set<string>();
  for (const entry of entries) {
    const { identity } = entry;
    if (!entry.key.trim() || entry.key !== identity.id) {
      throw new Error(`IELTS Listening registry key mismatch for ${entry.key || 'empty key'}.`);
    }
    if (keys.has(entry.key)) throw new Error(`Duplicate IELTS Listening registry key: ${entry.key}.`);
    if (![1, 2, 3, 4].includes(identity.part)) {
      throw new Error(`IELTS Listening registry has an invalid part for ${identity.id}.`);
    }
    if (!Number.isInteger(identity.practiceNumber) || identity.practiceNumber <= 0) {
      throw new Error(`IELTS Listening registry has an invalid practice number for ${identity.id}.`);
    }
    const pair = `${identity.part}:${identity.practiceNumber}`;
    if (partPracticePairs.has(pair)) {
      throw new Error(`Duplicate IELTS Listening part/practice pair: ${pair}.`);
    }
    const expectedId = `welearn-listening-part-${identity.part}-${String(identity.practiceNumber).padStart(3, '0')}`;
    if (identity.id !== expectedId) {
      throw new Error(`IELTS Listening registry identity must be ${expectedId}.`);
    }
    if (identityIds.has(identity.id)) throw new Error(`Duplicate IELTS Listening identity: ${identity.id}.`);
    if (!identity.contentVersion.trim()) {
      throw new Error(`IELTS Listening practice ${identity.id} has no content version.`);
    }
    keys.add(entry.key);
    identityIds.add(identity.id);
    partPracticePairs.add(pair);
  }
}

function expectedQuestionNumbers(identity: IeltsListeningRegistryIdentity): number[] {
  const firstQuestion = (identity.part - 1) * 10 + 1;
  return Array.from({ length: 10 }, (_, index) => firstQuestion + index);
}

function assertExactNumbers(actual: readonly number[], expected: readonly number[], label: string): void {
  if (actual.length !== expected.length || actual.some((number, index) => number !== expected[index])) {
    throw new Error(`${label} must be exactly ${expected[0]}–${expected.at(-1)}.`);
  }
}

export function assertIeltsListeningRegistrationBundle(
  snapshot: IeltsListeningRegistryBundleSnapshot,
): void {
  assertIeltsListeningRegistryEntries([{ key: snapshot.key, identity: snapshot.identity }]);
  const { identity, publicPractice, scoreProbe } = snapshot;
  if (
    publicPractice.id !== identity.id
    || publicPractice.contentVersion !== identity.contentVersion
    || publicPractice.part !== identity.part
    || publicPractice.practiceNumber !== identity.practiceNumber
  ) {
    throw new Error(`IELTS Listening public projection mismatch for ${identity.id}.`);
  }

  const expected = expectedQuestionNumbers(identity);
  if (publicPractice.questionCount !== expected.length) {
    throw new Error(`IELTS Listening public question count mismatch for ${identity.id}.`);
  }
  assertExactNumbers(publicPractice.questionRange, [expected[0], expected.at(-1)!], 'IELTS Listening public range');
  assertExactNumbers(snapshot.publicQuestionNumbers, expected, 'IELTS Listening public group questions');
  assertExactNumbers(snapshot.questionNumbers, expected, 'IELTS Listening scorer question range');
  if (scoreProbe.total !== expected.length) {
    throw new Error(`IELTS Listening scorer total mismatch for ${identity.id}.`);
  }
  assertExactNumbers(scoreProbe.outcomes.map((outcome) => outcome.number), expected, 'IELTS Listening scorer outcomes');
}

export function assertIeltsListeningRegistryCatalog(
  registryEntries: readonly IeltsListeningRegistryEntryIdentity[],
  catalogEntries: readonly IeltsListeningPublicCatalogEntry[],
): void {
  assertIeltsListeningRegistryEntries(registryEntries);
  if (!catalogEntries.length) throw new Error('IELTS Listening public catalog cannot be empty.');
  const byId = new Map<string, IeltsListeningPublicCatalogEntry>();
  for (const entry of catalogEntries) {
    if (entry.publication !== 'public') {
      throw new Error(`IELTS Listening runtime catalog entry ${entry.practiceId} is not public.`);
    }
    if (byId.has(entry.practiceId)) {
      throw new Error(`Duplicate IELTS Listening public catalog entry: ${entry.practiceId}.`);
    }
    byId.set(entry.practiceId, entry);
  }
  if (byId.size !== registryEntries.length) {
    throw new Error('IELTS Listening registry and public catalog are not one-to-one.');
  }
  for (const { identity } of registryEntries) {
    const catalog = byId.get(identity.id);
    if (!catalog) throw new Error(`IELTS Listening registry entry ${identity.id} has no public catalog release.`);
    if (
      catalog.contentVersion !== identity.contentVersion
      || catalog.part !== identity.part
      || catalog.practiceNumber !== identity.practiceNumber
    ) {
      throw new Error(`IELTS Listening public catalog identity mismatch for ${identity.id}.`);
    }
  }
}
