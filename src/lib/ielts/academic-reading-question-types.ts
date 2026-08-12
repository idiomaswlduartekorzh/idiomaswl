export type IeltsAcademicReadingOfficialTypeNumber =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;

export type IeltsAcademicReadingOfficialTypeId =
  | 'multiple-choice'
  | 'identifying-information'
  | 'identifying-writer-views-claims'
  | 'matching-information'
  | 'matching-headings'
  | 'matching-features'
  | 'matching-sentence-endings'
  | 'sentence-completion'
  | 'summary-note-table-flow-chart-completion'
  | 'diagram-label-completion'
  | 'short-answer-questions';

export type IeltsAcademicReadingWeLearnRouteSlug =
  | 'multiple-choice'
  | 'true-false-not-given'
  | 'yes-no-not-given'
  | 'matching-information'
  | 'matching-headings'
  | 'matching-features'
  | 'matching-sentence-endings'
  | 'sentence-completion'
  | 'summary-completion'
  | 'note-completion'
  | 'table-completion'
  | 'flow-chart-completion'
  | 'diagram-labeling'
  | 'short-answer';

export interface IeltsAcademicReadingWeLearnRouteContract {
  slug: IeltsAcademicReadingWeLearnRouteSlug;
  label: string;
}

export interface IeltsAcademicReadingOfficialTypeContract {
  id: IeltsAcademicReadingOfficialTypeId;
  officialNumber: IeltsAcademicReadingOfficialTypeNumber;
  officialName: string;
  welearnPracticeFocus: string;
  welearnRoutes: readonly IeltsAcademicReadingWeLearnRouteContract[];
  welearnSplitRationale?: string;
}

const OFFICIAL_SOURCE_URL =
  'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading';

export const IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT = {
  schemaVersion: 'ielts-academic-reading-question-types.v1',
  module: 'academic',
  officialTypeCount: 11,
  welearnRouteCount: 14,
  productLabel:
    '11 tipos oficiales numerados · 14 rutas WeLearn para practicar sus formatos y variantes.',
  source: {
    authority: 'IELTS',
    title: 'IELTS Academic: Reading test format',
    url: OFFICIAL_SOURCE_URL,
    reviewedAt: '2026-08-09',
  },
  rights: {
    basis: 'factual-descriptive-reference',
    scope: 'Official type names and numbering only',
    copiedPassagesOrTasks: false,
    usesOfficialLogos: false,
    affiliation: 'independent-not-endorsed',
    noticeUrl: 'https://ielts.org/legal/ielts-copyright-and-trade-mark-statement',
    reviewedAt: '2026-08-09',
  },
  officialTypes: [
    {
      id: 'multiple-choice',
      officialNumber: 1,
      officialName: 'Multiple choice',
      welearnPracticeFocus:
        'Comparar cada opción con la pregunta exacta y descartar ecos léxicos o verdades parciales.',
      welearnRoutes: [{ slug: 'multiple-choice', label: 'Multiple Choice' }],
    },
    {
      id: 'identifying-information',
      officialNumber: 2,
      officialName: 'Identifying information (True/False/Not given)',
      welearnPracticeFocus:
        'Distinguir apoyo, contradicción y ausencia sin usar conocimiento externo.',
      welearnRoutes: [{ slug: 'true-false-not-given', label: 'True/False/Not Given' }],
    },
    {
      id: 'identifying-writer-views-claims',
      officialNumber: 3,
      officialName: 'Identifying writer’s views/claims (Yes/No/Not given)',
      welearnPracticeFocus:
        'Atribuir con precisión la postura o claim del autor antes de decidir.',
      welearnRoutes: [{ slug: 'yes-no-not-given', label: 'Yes/No/Not Given' }],
    },
    {
      id: 'matching-information',
      officialNumber: 4,
      officialName: 'Matching information',
      welearnPracticeFocus:
        'Localizar detalles concretos en párrafos sin confundirlos con la idea principal.',
      welearnRoutes: [{ slug: 'matching-information', label: 'Matching Information' }],
    },
    {
      id: 'matching-headings',
      officialNumber: 5,
      officialName: 'Matching headings',
      welearnPracticeFocus:
        'Elegir la idea principal que cubre el párrafo completo, no un detalle llamativo.',
      welearnRoutes: [{ slug: 'matching-headings', label: 'Matching Headings' }],
    },
    {
      id: 'matching-features',
      officialNumber: 6,
      officialName: 'Matching features',
      welearnPracticeFocus:
        'Rastrear relaciones y atribuciones entre personas, categorías, teorías o hechos.',
      welearnRoutes: [{ slug: 'matching-features', label: 'Matching Features' }],
    },
    {
      id: 'matching-sentence-endings',
      officialNumber: 7,
      officialName: 'Matching sentence endings',
      welearnPracticeFocus:
        'Completar el significado de la oración; la gramática por sí sola no decide.',
      welearnRoutes: [
        { slug: 'matching-sentence-endings', label: 'Matching Sentence Endings' },
      ],
    },
    {
      id: 'sentence-completion',
      officialNumber: 8,
      officialName: 'Sentence completion',
      welearnPracticeFocus:
        'Localizar el detalle y entregar una forma gramaticalmente válida dentro del límite.',
      welearnRoutes: [{ slug: 'sentence-completion', label: 'Sentence Completion' }],
    },
    {
      id: 'summary-note-table-flow-chart-completion',
      officialNumber: 9,
      officialName: 'Summary/note/table/flow-chart completion',
      welearnPracticeFocus:
        'Usar la estructura de la representación, la paráfrasis y la forma esperada para completar cada gap.',
      welearnRoutes: [
        { slug: 'summary-completion', label: 'Summary Completion' },
        { slug: 'note-completion', label: 'Note Completion' },
        { slug: 'table-completion', label: 'Table Completion' },
        { slug: 'flow-chart-completion', label: 'Flow-chart Completion' },
      ],
      welearnSplitRationale:
        'IELTS los agrupa en un solo tipo oficial. WeLearn los separa en cuatro rutas porque cambia la representación que el estudiante debe interpretar.',
    },
    {
      id: 'diagram-label-completion',
      officialNumber: 10,
      officialName: 'Diagram label completion',
      welearnPracticeFocus:
        'Relacionar una descripción detallada del texto con partes o posiciones del diagrama.',
      welearnRoutes: [{ slug: 'diagram-labeling', label: 'Diagram Labeling' }],
    },
    {
      id: 'short-answer-questions',
      officialNumber: 11,
      officialName: 'Short-answer questions',
      welearnPracticeFocus:
        'Encontrar un detalle factual y responder con la forma mínima permitida por la instrucción.',
      welearnRoutes: [{ slug: 'short-answer', label: 'Short-answer Questions' }],
    },
  ],
} as const satisfies {
  schemaVersion: string;
  module: 'academic';
  officialTypeCount: 11;
  welearnRouteCount: 14;
  productLabel: string;
  source: {
    authority: 'IELTS';
    title: string;
    url: string;
    reviewedAt: string;
  };
  rights: {
    basis: 'factual-descriptive-reference';
    scope: string;
    copiedPassagesOrTasks: false;
    usesOfficialLogos: false;
    affiliation: 'independent-not-endorsed';
    noticeUrl: string;
    reviewedAt: string;
  };
  officialTypes: readonly IeltsAcademicReadingOfficialTypeContract[];
};

export const IELTS_ACADEMIC_READING_WELEARN_ROUTES =
  IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT.officialTypes.flatMap((officialType) =>
    officialType.welearnRoutes.map((route) => ({
      ...route,
      officialTypeId: officialType.id,
      officialNumber: officialType.officialNumber,
      officialName: officialType.officialName,
    })),
  );

export function findIeltsAcademicReadingOfficialTypeByRoute(
  slug: string,
): IeltsAcademicReadingOfficialTypeContract | undefined {
  return IELTS_ACADEMIC_READING_QUESTION_TYPE_CONTRACT.officialTypes.find((officialType) =>
    officialType.welearnRoutes.some((route) => route.slug === slug),
  );
}

export function getIeltsAcademicReadingOfficialTypeByRoute(
  slug: IeltsAcademicReadingWeLearnRouteSlug,
): IeltsAcademicReadingOfficialTypeContract {
  const officialType = findIeltsAcademicReadingOfficialTypeByRoute(slug);
  if (!officialType) {
    throw new Error(`Unknown IELTS Academic Reading WeLearn route slug: ${slug}`);
  }
  return officialType;
}
