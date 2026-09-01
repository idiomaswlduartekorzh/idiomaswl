import 'server-only';

import publicCatalog from '../../../config/ielts-listening-practices.json';
import {
  getIeltsListeningPart1Identity,
  getIeltsListeningPart1Practice,
  getIeltsListeningPart1QuestionNumbers,
  getIeltsListeningPart1ResponseSpecs,
  scoreIeltsListeningPart1Registration,
} from '@/data/ielts/listening-part1-welearn-001.server';
import type {
  IeltsListeningPublicPractice,
  IeltsListeningResponseSpec,
  IeltsListeningScoreResult,
} from '@/lib/ielts/listening-practice-contract';
import {
  ieltsListeningPublicQuestionNumbers,
  ieltsListeningPublicResponseSpecs,
} from '@/lib/ielts/listening-public-contract';
import {
  assertIeltsListeningRegistrationBundle,
  assertIeltsListeningRegistryCatalog,
  assertIeltsListeningRegistryEntries,
  assertIeltsListeningScoringIdentity,
  type IeltsListeningPublicCatalogEntry,
  type IeltsListeningRegistryIdentity,
} from '@/lib/ielts/listening-registry-contract';

interface ServerPracticeRegistration {
  getIdentity: () => IeltsListeningRegistryIdentity;
  getPublicPractice: () => IeltsListeningPublicPractice;
  getQuestionNumbers: () => number[];
  getResponseSpecs: () => IeltsListeningResponseSpec[];
  score: (responses: Readonly<Record<string, string>>) => {
    readonly identity: IeltsListeningRegistryIdentity;
    readonly result: IeltsListeningScoreResult;
  };
}

interface ValidatedServerPracticeRegistration {
  readonly identity: IeltsListeningRegistryIdentity;
  readonly publicPractice: IeltsListeningPublicPractice;
  readonly questionNumbers: readonly number[];
  readonly responseSpecs: readonly IeltsListeningResponseSpec[];
  readonly score: (responses: Readonly<Record<string, string>>) => IeltsListeningScoreResult;
}

const REGISTRATION_ENTRIES: readonly (readonly [string, ServerPracticeRegistration])[] = [
  ['welearn-listening-part-1-001', {
    getIdentity: getIeltsListeningPart1Identity,
    getPublicPractice: getIeltsListeningPart1Practice,
    getQuestionNumbers: getIeltsListeningPart1QuestionNumbers,
    getResponseSpecs: getIeltsListeningPart1ResponseSpecs,
    score: scoreIeltsListeningPart1Registration,
  }],
];

const REGISTRY_IDENTITIES = REGISTRATION_ENTRIES.map(([key, registration]) => ({
  key,
  identity: registration.getIdentity(),
}));

assertIeltsListeningRegistryEntries(REGISTRY_IDENTITIES);
assertIeltsListeningRegistryCatalog(
  REGISTRY_IDENTITIES,
  publicCatalog.practices as readonly IeltsListeningPublicCatalogEntry[],
);

function validatedRegistration(
  key: string,
  registration: ServerPracticeRegistration,
): ValidatedServerPracticeRegistration {
  const identity = registration.getIdentity();
  const publicPractice = registration.getPublicPractice();
  const publicQuestionNumbers = Object.freeze(ieltsListeningPublicQuestionNumbers(publicPractice));
  const publicResponseSpecs = Object.freeze(ieltsListeningPublicResponseSpecs(publicPractice));
  const questionNumbers = Object.freeze([...registration.getQuestionNumbers()]);
  const responseSpecs = Object.freeze(registration.getResponseSpecs().map((spec) =>
    spec.kind === 'text' ? { ...spec } : { ...spec, allowedValues: [...spec.allowedValues] },
  ));
  const probeResponses = Object.fromEntries(
    Array.from({ length: 10 }, (_, index) => [String((identity.part - 1) * 10 + index + 1), `__registry_probe_${index}__`]),
  );
  const scoreEnvelope = registration.score(probeResponses);
  assertIeltsListeningScoringIdentity(identity, scoreEnvelope.identity);
  const scoreProbe = scoreEnvelope.result;
  const snapshot = {
    key,
    identity,
    publicPractice,
    publicQuestionNumbers,
    questionNumbers,
    publicResponseSpecs,
    responseSpecs,
    scoreProbe,
  } as const;
  assertIeltsListeningRegistrationBundle(snapshot);

  return Object.freeze({
    identity,
    publicPractice,
    questionNumbers,
    responseSpecs,
    score(responses: Readonly<Record<string, string>>) {
      const scoreEnvelope = registration.score(responses);
      assertIeltsListeningScoringIdentity(identity, scoreEnvelope.identity);
      const result = scoreEnvelope.result;
      assertIeltsListeningRegistrationBundle({ ...snapshot, scoreProbe: result });
      return result;
    },
  });
}

const REGISTRATIONS = new Map<string, ValidatedServerPracticeRegistration>(
  REGISTRATION_ENTRIES.map(([key, registration]) => [key, validatedRegistration(key, registration)]),
);

function registeredPractice(practiceId: unknown): ValidatedServerPracticeRegistration | null {
  if (typeof practiceId !== 'string') return null;
  const registration = REGISTRATIONS.get(practiceId) ?? null;
  if (!registration) return null;
  if (registration.identity.id !== practiceId) {
    throw new Error(`IELTS Listening registry key mismatch for ${practiceId}.`);
  }
  return registration;
}

export function getIeltsListeningPracticeIdentityForSession(practiceId: unknown, part: unknown) {
  const registration = registeredPractice(practiceId);
  if (!registration || typeof part !== 'string') return null;
  const identity = registration.identity;
  return part === String(identity.part) ? identity : null;
}

export function getIeltsListeningPracticeForSession(practiceId: unknown, part: unknown) {
  const identity = getIeltsListeningPracticeIdentityForSession(practiceId, part);
  if (!identity) return null;
  const registration = registeredPractice(identity.id);
  if (!registration) return null;
  return registration.publicPractice;
}

export function getIeltsListeningScorer(practiceId: unknown) {
  const registration = registeredPractice(practiceId);
  if (!registration) return null;
  return {
    identity: registration.identity,
    questionNumbers: registration.questionNumbers,
    responseSpecs: registration.responseSpecs,
    score: registration.score,
  } as const;
}
