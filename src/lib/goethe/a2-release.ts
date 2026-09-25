import releaseManifest from '@/data/mocks/goethe-a2-release.json' with { type: 'json' };

export type GoetheA2ReleaseState =
  | 'LEGACY_HOLD'
  | 'CONTENT_REVIEW'
  | 'AUDIO_BLOCKED'
  | 'READY_FOR_HUMAN_REVIEW'
  | 'PUBLISHED';

export type GoetheA2ReleaseRecord = {
  id: string;
  state: GoetheA2ReleaseState;
  published: boolean;
  contentReady: boolean;
  visualsReady: boolean;
  audioReady: boolean;
  scoringReady: boolean;
  humanApproved: boolean;
  practicePublished?: boolean;
  practiceSkills?: Array<'reading' | 'writing' | 'speaking'>;
};

const releases = new Map(
  (releaseManifest.sets as GoetheA2ReleaseRecord[]).map(record => [record.id, record]),
);

export function getGoetheA2Release(mockId: string): GoetheA2ReleaseRecord | undefined {
  return releases.get(mockId);
}

export function isGoetheA2Published(mockId: string): boolean {
  const release = getGoetheA2Release(mockId);
  return Boolean(
    release
    && release.state === 'PUBLISHED'
    && release.published
    && release.contentReady
    && release.visualsReady
    && release.audioReady
    && release.scoringReady
    && release.humanApproved,
  );
}

export function isGoetheA2Held(mockId: string): boolean {
  return /^a2-\d+$/.test(mockId) && !isGoetheA2Published(mockId);
}

export function isGoetheA2PracticePublished(
  mockId: string,
  skill: 'reading' | 'writing' | 'speaking',
): boolean {
  const release = getGoetheA2Release(mockId);
  return Boolean(
    release
    && release.practicePublished
    && release.practiceSkills?.includes(skill)
    && release.contentReady
    && release.visualsReady
    && release.scoringReady,
  );
}
