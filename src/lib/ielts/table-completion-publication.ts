import 'server-only';

import { createHash } from 'node:crypto';
import type { TableCompletionPassage } from '@/data/practica-exams/seo-catalog';
import { IELTS_READING_RIGHTS_REGISTRY } from '@/data/practica-exams/ielts-reading-rights-registry';
import { assessIeltsReadingRights } from '@/lib/ielts/academic-reading-rights';

function stableValue(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(stableValue);
  if (value === null || typeof value !== 'object') return value;

  return Object.fromEntries(
    Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, entry]) => [key, stableValue(entry)]),
  );
}

function sha256(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function passageSha256(passage: string) {
  return sha256(passage.normalize('NFKC').replace(/\s+/gu, ' ').trim());
}

export function getTableCompletionPublicationState(
  passages: readonly TableCompletionPassage[],
) {
  const decisions = passages.map((passage) =>
    assessIeltsReadingRights(IELTS_READING_RIGHTS_REGISTRY, {
      assetId: `formative:table-completion:${passage.id}`,
      sourceObjectSha256: sha256(JSON.stringify(stableValue(passage))),
      passageSha256: passageSha256(passage.passage),
    }),
  );

  const guidedPracticePendingReasons = new Set([
    'authorship-unresolved',
    'factual-review-incomplete',
    'human-review-pending',
  ]);
  const eligibleForGuidedPractice = decisions.length === passages.length &&
    decisions.every((decision) =>
      decision.rightsBasis === 'licensed' &&
      decision.reasonCodes.every((reason) => guidedPracticePendingReasons.has(reason)),
    );

  return {
    decisions,
    eligibleForGuidedPractice,
  };
}
