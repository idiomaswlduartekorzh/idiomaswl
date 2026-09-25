import type { DiagnosticBankRecord } from './types.ts';

export const DIAGNOSTIC_AUDIO_BUCKET = 'diagnostic-audio';

export interface DiagnosticMediaObject {
  mediaId: string;
  bucket: typeof DIAGNOSTIC_AUDIO_BUCKET;
  objectPath: string;
  mimeType: 'audio/mpeg';
  sha256: string;
  itemIds: readonly string[];
}

export function resolveDiagnosticMediaObject(
  bank: readonly DiagnosticBankRecord[],
  mediaId: string,
): DiagnosticMediaObject | null {
  const records = bank.filter(record => record.publicItem.stimulus.kind === 'audio'
    && record.publicItem.stimulus.mediaId === mediaId);
  if (!records.length) return null;
  const match = /^en-(a1|a2|b1)-legacy-listening-(\d{2})$/.exec(mediaId);
  if (!match || records.some(record => record.source.kind !== 'welearn-legacy')) return null;
  const hashes = new Set(records.map(record => /audio-sha256:([a-f0-9]{64})$/.exec(record.source.reference)?.[1]));
  if (hashes.size !== 1 || hashes.has(undefined)) throw new Error(`diagnostic media ${mediaId} has inconsistent source hashes`);
  return {
    mediaId,
    bucket: DIAGNOSTIC_AUDIO_BUCKET,
    objectPath: `legacy/en/${match[1]}/listening-${match[2]}.mp3`,
    mimeType: 'audio/mpeg',
    sha256: [...hashes][0] as string,
    itemIds: records.map(record => record.publicItem.id),
  };
}
