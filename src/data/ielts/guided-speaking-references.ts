import audioManifest from '../../../config/ielts-guided-speaking-audio.json' with { type: 'json' };
import { IELTS_GUIDED_SPEAKING_AUDIO_STATUS } from './guided-speaking-audio.generated.ts';
import { IELTS_GUIDED_SPEAKING_REFERENCES_21_40 } from './guided-speaking-references-21-40.ts';

export type IeltsGuidedSpeakingBand = '5.5' | '9.0';

export type IeltsGuidedSpeakingAudio = {
  ready: boolean;
  url: string | null;
  durationSeconds: number | null;
  sampleRate: number | null;
  sha256: string | null;
  contentSha256: string | null;
};

export type IeltsGuidedSpeakingSample = {
  label: string;
  audio: IeltsGuidedSpeakingAudio;
  transcript: string;
  verdict: string;
  criteria: readonly (readonly [string, string])[];
};

export type IeltsGuidedSpeakingReference = {
  cueCard: string;
  fullCueCard: string;
  bullets: readonly string[];
  pedagogicalNotice: string;
  samples: Record<IeltsGuidedSpeakingBand, IeltsGuidedSpeakingSample>;
};

type ManifestBandProfile = {
  label: string;
  verdict: string;
  criteria: string[][];
};

type ManifestItem = {
  setNumber: number;
  band: IeltsGuidedSpeakingBand;
  cueCard: string;
  text: string;
};

type BandFeedback = {
  verdict: string;
  fluency: string;
  lexical: string;
  grammar: string;
  pronunciation: string;
};

type EditorialCorrection = {
  setNumber: number;
  sourceQuestionId: string;
  sourceCueCard: string;
  displayCueCard: string;
  editorialCorrectionReason: string;
};

const manifest = audioManifest as {
  pedagogicalNotice: string;
  bandProfiles: Record<IeltsGuidedSpeakingBand, ManifestBandProfile>;
  band55FeedbackBySet: Record<string, BandFeedback>;
  band9FeedbackBySet: Record<string, BandFeedback>;
  editorialCorrections: EditorialCorrection[];
  items: ManifestItem[];
};

type SpeakingAudioGateState = {
  readonly ready: boolean;
  readonly approved: boolean;
  readonly files: Record<IeltsGuidedSpeakingBand, {
    readonly generated: boolean;
    readonly approved: boolean;
    readonly ready: boolean;
  }>;
};

export function isIeltsGuidedSpeakingPairExposable(setStatus: SpeakingAudioGateState): boolean {
  return setStatus.ready === true
    && setStatus.approved === true
    && (['5.5', '9.0'] as const).every(band => {
      const file = setStatus.files[band];
      return file.generated === true && file.approved === true && file.ready === true;
    });
}

function cueCardTitle(fullCueCard: string): string {
  const firstLine = fullCueCard.split('\n', 1)[0].trim();
  return firstLine;
}

function cueCardBullets(fullCueCard: string): string[] {
  return fullCueCard
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('•') || line.startsWith('-') || /^and explain\b/i.test(line))
    .map(line => line.replace(/^(?:•|-|and explain)\s*/i, '').replace(/[.]$/, ''));
}

function buildReference(setNumber: number): IeltsGuidedSpeakingReference {
  const pair = manifest.items.filter(item => item.setNumber === setNumber);
  if (pair.length !== 2 || new Set(pair.map(item => item.cueCard)).size !== 1) {
    throw new Error(`IELTS guided Speaking Set ${setNumber} does not have one coherent 5.5/9.0 pair.`);
  }
  const sourceCueCard = pair[0].cueCard;
  const correction = manifest.editorialCorrections.find(item => item.setNumber === setNumber);
  if (correction && correction.sourceCueCard !== sourceCueCard) {
    throw new Error(`IELTS guided Speaking Set ${setNumber} editorial correction is not bound to its source cue card.`);
  }
  const fullCueCard = correction?.displayCueCard ?? sourceCueCard;
  const samples = Object.fromEntries(
    pair.map(item => {
      const profile = manifest.bandProfiles[item.band];
      const feedback = item.band === '5.5'
        ? manifest.band55FeedbackBySet[String(setNumber)]
        : manifest.band9FeedbackBySet[String(setNumber)];
      if (!feedback) {
        throw new Error(`IELTS guided Speaking Set ${setNumber} is missing tailored band ${item.band} feedback.`);
      }
      const setStatus = IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets[
        String(setNumber) as keyof typeof IELTS_GUIDED_SPEAKING_AUDIO_STATUS.sets
      ];
      const fileStatus = setStatus.files[item.band];
      const exposable = isIeltsGuidedSpeakingPairExposable(setStatus);
      const audio = {
        ready: exposable,
        url: exposable ? fileStatus.url : '',
        durationSeconds: fileStatus.durationSeconds,
        sampleRate: fileStatus.sampleRate,
        sha256: fileStatus.sha256,
        contentSha256: fileStatus.contentSha256,
      };
      return [
        item.band,
        {
          label: profile.label,
          audio,
          transcript: item.text,
          verdict: feedback.verdict,
          criteria: [
            ['Fluency & Coherence', feedback.fluency],
            ['Lexical Resource', feedback.lexical],
            ['Grammatical Range & Accuracy', feedback.grammar],
            ['Pronunciation', feedback.pronunciation],
          ],
        },
      ];
    }),
  ) as unknown as Record<IeltsGuidedSpeakingBand, IeltsGuidedSpeakingSample>;

  return {
    cueCard: cueCardTitle(fullCueCard),
    fullCueCard,
    bullets: cueCardBullets(fullCueCard),
    pedagogicalNotice: manifest.pedagogicalNotice,
    samples,
  };
}

const releasedReferences = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const setNumber = index + 1;
    return [setNumber, buildReference(setNumber)];
  }),
) as Record<number, IeltsGuidedSpeakingReference>;

export const IELTS_GUIDED_SPEAKING_REFERENCES = {
  ...releasedReferences,
  ...IELTS_GUIDED_SPEAKING_REFERENCES_21_40,
} as Record<number, IeltsGuidedSpeakingReference>;

export function getIeltsGuidedSpeakingReference(setNumber: number): IeltsGuidedSpeakingReference {
  const reference = IELTS_GUIDED_SPEAKING_REFERENCES[setNumber];
  if (!reference) throw new Error(`No guided Speaking reference exists for IELTS Set ${setNumber}.`);
  return reference;
}
