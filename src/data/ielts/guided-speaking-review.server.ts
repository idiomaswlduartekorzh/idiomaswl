import 'server-only';

import audioManifest from '../../../config/ielts-guided-speaking-audio.json' with { type: 'json' };
import { IELTS_GUIDED_SPEAKING_AUDIO_STATUS } from './guided-speaking-audio.generated';

type ReviewBand = '5.5' | '9.0';

type ManifestItem = {
  id: string;
  setNumber: number;
  band: ReviewBand;
  cueCard: string;
  text: string;
  publicUrl: string;
};

const manifest = audioManifest as { items: ManifestItem[] };

export type IeltsSpeakingAudioReviewSet = {
  setNumber: number;
  cueCard: string;
  generated: boolean;
  approved: boolean;
  ready: boolean;
  samples: Array<{
    id: string;
    band: ReviewBand;
    transcript: string;
    generated: boolean;
    approved: boolean;
    ready: boolean;
    url: string;
    durationSeconds: number | null;
    sampleRate: number | null;
    sha256: string | null;
  }>;
};

export function getIeltsSpeakingAudioReviewSets(): IeltsSpeakingAudioReviewSet[] {
  return Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    const items = manifest.items.filter(item => item.setNumber === setNumber);
    const setStatus = IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets[
      String(setNumber) as keyof typeof IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets
    ];

    return {
      setNumber,
      cueCard: items[0]?.cueCard ?? '',
      generated: setStatus.generated,
      approved: setStatus.approved,
      ready: setStatus.ready,
      samples: items.map(item => {
        const file = setStatus.files[item.band];
        return {
          id: item.id,
          band: item.band,
          transcript: item.text,
          generated: file.generated,
          approved: file.approved,
          ready: file.ready,
          url: item.publicUrl,
          durationSeconds: file.durationSeconds,
          sampleRate: file.sampleRate,
          sha256: file.sha256,
        };
      }),
    };
  });
}
