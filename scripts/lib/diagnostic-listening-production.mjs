import { createHash } from 'node:crypto';

import {
  diagnosticListeningCanonicalTranscript,
  diagnosticListeningTranscriptSha256,
} from '../../src/server/diagnostic/bank/listening-production-lower.en.ts';

const sha256 = value => createHash('sha256').update(value, 'utf8').digest('hex');

export function buildDiagnosticListeningProductionPackage(briefs) {
  const media = [...briefs]
    .sort((left, right) => left.id.localeCompare(right.id))
    .map(brief => ({
      mediaId: brief.audioArtifact.mediaId,
      level: brief.level,
      productionVersion: brief.productionVersion,
      transcript: diagnosticListeningCanonicalTranscript(brief),
      transcriptSha256: diagnosticListeningTranscriptSha256(brief),
      targetDurationSeconds: [...brief.recording.targetDurationSeconds],
      paceWordsPerMinute: [...brief.recording.paceWordsPerMinute],
      delivery: brief.recording.delivery,
      speakers: [...new Set(brief.recording.turns.map(turn => turn.speaker))],
      privateObjectPath: brief.audioArtifact.privateObjectPath,
    }));
  const packageCore = {
    packageVersion: 'diagnostic-listening-recording-package-v1',
    language: 'en',
    status: 'recording-input-only',
    warning: 'This package contains no questions, answer keys or rationales. A recording is not a diagnostic item until independent transcript, alignment, linguistic and assessment review are complete.',
    media,
  };
  return {
    ...packageCore,
    packageSha256: sha256(JSON.stringify(packageCore)),
  };
}
