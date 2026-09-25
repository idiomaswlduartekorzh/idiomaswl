import { createHash } from 'node:crypto';

import type { DiagnosticListeningProductionBrief } from './listening-production-lower.en.ts';

function canonical(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonical);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, child]) => [key, canonical(child)]));
  }
  return value;
}

export function diagnosticListeningPreproductionContentSha256(
  brief: DiagnosticListeningProductionBrief,
): string {
  const reviewable = {
    mediaId: brief.audioArtifact.mediaId,
    level: brief.level,
    productionVersion: brief.productionVersion,
    exposure: brief.exposure,
    recording: brief.recording,
    questions: brief.questions,
  };
  return createHash('sha256').update(JSON.stringify(canonical(reviewable))).digest('hex');
}
