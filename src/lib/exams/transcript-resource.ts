export type ExamTranscriptResource = {
  href: string;
  answerKeyHref: string;
  interfaceLanguage: 'Español' | 'Deutsch';
  audioLanguage: 'inglés' | 'alemán';
};

export type ExamMaterialKind = 'transcript' | 'answer-key';

type TranscriptSeries = {
  folder: string;
  filePrefix: string;
  mockPattern: RegExp;
  maxSet: number;
  interfaceLanguage: ExamTranscriptResource['interfaceLanguage'];
  audioLanguage: ExamTranscriptResource['audioLanguage'];
};

const TRANSCRIPT_SERIES: Record<string, TranscriptSeries> = {
  ielts: {
    folder: 'ielts',
    filePrefix: 'ielts',
    mockPattern: /^set-(\d+)$/,
    maxSet: 20,
    interfaceLanguage: 'Español',
    audioLanguage: 'inglés',
  },
  goethe: {
    folder: 'goethe-a1',
    filePrefix: 'goethe-a1',
    mockPattern: /^a1-(\d+)$/,
    maxSet: 7,
    interfaceLanguage: 'Deutsch',
    audioLanguage: 'alemán',
  },
  'cambridge-b2': {
    folder: 'fce',
    filePrefix: 'fce',
    mockPattern: /^set-(\d+)$/,
    maxSet: 10,
    interfaceLanguage: 'Español',
    audioLanguage: 'inglés',
  },
  toefl: {
    folder: 'toefl',
    filePrefix: 'toefl',
    mockPattern: /^set-(\d+)$/,
    maxSet: 20,
    interfaceLanguage: 'Español',
    audioLanguage: 'inglés',
  },
};

export function getExamTranscriptResource(examSlug: string, mockId: string): ExamTranscriptResource | null {
  const series = TRANSCRIPT_SERIES[examSlug];
  if (!series) return null;

  const match = mockId.match(series.mockPattern);
  const setNumber = match ? Number(match[1]) : 0;
  if (!Number.isInteger(setNumber) || setNumber < 1 || setNumber > series.maxSet) return null;

  const paddedSet = String(setNumber).padStart(2, '0');
  return {
    href: `/api/exam-materials/${examSlug}/${mockId}/transcript`,
    answerKeyHref: `/api/exam-materials/${examSlug}/${mockId}/answer-key`,
    interfaceLanguage: series.interfaceLanguage,
    audioLanguage: series.audioLanguage,
  };
}

export function getPrivateExamMaterial(examSlug: string, mockId: string, kind: ExamMaterialKind) {
  const series = TRANSCRIPT_SERIES[examSlug];
  if (!series) return null;
  const match = mockId.match(series.mockPattern);
  const setNumber = match ? Number(match[1]) : 0;
  if (!Number.isInteger(setNumber) || setNumber < 1 || setNumber > series.maxSet) return null;
  const paddedSet = String(setNumber).padStart(2, '0');
  const suffix = kind === 'transcript' ? 'transcripciones' : 'claves';
  const category = kind === 'transcript' ? 'exam-transcriptions' : 'exam-answer-keys';
  const fileName = `${series.filePrefix}-set-${paddedSet}-${suffix}.pdf`;
  return {
    fileName,
    relativePath: `${category}/${series.folder}/${fileName}`,
  } as const;
}
