import releaseManifest from '@/data/mocks/goethe-b1-release.json' with { type: 'json' };

export type GoetheB1ReleaseRecord = {
  id: string;
  state: 'AUDIO_BLOCKED' | 'READY_FOR_HUMAN_REVIEW' | 'PUBLISHED';
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
  (releaseManifest.sets as GoetheB1ReleaseRecord[]).map(record => [record.id, record]),
);

export function getGoetheB1Release(mockId: string) {
  return releases.get(mockId);
}

export function isGoetheB1Published(mockId: string) {
  const release = getGoetheB1Release(mockId);
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

export function isGoetheB1Held(mockId: string) {
  return (/^b1-\d+$/.test(mockId) || mockId === 'set-1') && !isGoetheB1Published(mockId);
}

export function isGoetheB1PracticePublished(
  mockId: string,
  skill: 'reading' | 'writing' | 'speaking',
) {
  const release = getGoetheB1Release(mockId);
  return Boolean(
    release
    && release.practicePublished
    && release.practiceSkills?.includes(skill)
    && release.contentReady
    && release.visualsReady
    && release.scoringReady,
  );
}
