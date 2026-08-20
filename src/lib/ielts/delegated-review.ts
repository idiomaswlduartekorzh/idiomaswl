import type { FullAssessment } from '@/lib/labs/types';

export const IELTS_DELEGATED_REVIEW_TASKS = [
  'writing_task_1',
  'writing_task_2',
  'speaking',
] as const;

export type IeltsDelegatedReviewTask = (typeof IELTS_DELEGATED_REVIEW_TASKS)[number];

export interface IeltsOfficialRubricReference {
  version: string;
  title: string;
  sourceUrl: string;
  criteria: { key: string; label: string }[];
  notice: string;
}

export interface IeltsDelegatedCriterionScore {
  criterion: string;
  band: number;
  reason: string;
}

export interface IeltsDelegatedReviewInput {
  evaluatorName: string;
  evaluatorModel: string;
  overallBand: number;
  criteria: IeltsDelegatedCriterionScore[];
  summary: string;
  strengths: string[];
  priorities: string[];
}

export interface IeltsDelegatedReviewMetadata {
  source: 'delegated-agent';
  callCode: string;
  evaluatorName: string;
  evaluatorModel: string;
  summary: string;
  strengths: string[];
  priorities: string[];
  officialRubricVersion: string;
  officialRubricUrl: string;
  submittedAt: string;
}

export interface IeltsDelegatedWritingAssessment extends FullAssessment {
  delegatedReview: IeltsDelegatedReviewMetadata;
}

export interface IeltsSpeakingAssessment {
  overallBand: number;
  criteria: IeltsDelegatedCriterionScore[];
  delegatedReview: IeltsDelegatedReviewMetadata;
}

export interface IeltsDelegatedWritingAssignment {
  kind: 'writing';
  prompt: string;
  answer: string;
  wordCount: number;
  minWords: number;
  imageUrl?: string;
}

export interface IeltsDelegatedSpeakingPrompt {
  questionId: string;
  partNumber: number;
  prompt: string;
  cueCard?: string;
  followUp?: string[];
  notes?: string;
  audioUrl?: string;
}

export interface IeltsDelegatedSpeakingAssignment {
  kind: 'speaking';
  prompts: IeltsDelegatedSpeakingPrompt[];
}

export interface IeltsDelegatedReviewCase {
  callCode: string;
  submissionId: string;
  mockId: string;
  mockTitle: string;
  taskType: IeltsDelegatedReviewTask;
  taskLabel: string;
  expiresAt: string;
  rubric: IeltsOfficialRubricReference;
  assignment: IeltsDelegatedWritingAssignment | IeltsDelegatedSpeakingAssignment;
  submissionEndpoint: string;
  responseContract: {
    evaluatorName: string;
    evaluatorModel: string;
    overallBand: string;
    criteria: { criterion: string; band: string; reason: string }[];
    summary: string;
    strengths: string;
    priorities: string;
  };
}

const WRITING_SOURCE = 'https://ielts.org/cdn/ielts-guides/ielts-writing-band-descriptors.pdf';
const SPEAKING_SOURCE = 'https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf';
const PUBLIC_DESCRIPTOR_VERSION = 'IELTS public band descriptors · Updated May 2023';

const SHARED_WRITING_CRITERIA = [
  { key: 'coherenceCohesion', label: 'Coherence and Cohesion' },
  { key: 'lexicalResource', label: 'Lexical Resource' },
  { key: 'grammaticalRange', label: 'Grammatical Range and Accuracy' },
];

export const IELTS_OFFICIAL_RUBRICS: Record<IeltsDelegatedReviewTask, IeltsOfficialRubricReference> = {
  writing_task_1: {
    version: PUBLIC_DESCRIPTOR_VERSION,
    title: 'IELTS Writing Task 1 Band Descriptors',
    sourceUrl: WRITING_SOURCE,
    criteria: [
      { key: 'taskAchievement', label: 'Task Achievement' },
      ...SHARED_WRITING_CRITERIA,
    ],
    notice: 'La rúbrica enlazada es oficial. La banda producida por un agente es una estimación y no un resultado oficial de IELTS.',
  },
  writing_task_2: {
    version: PUBLIC_DESCRIPTOR_VERSION,
    title: 'IELTS Writing Task 2 Band Descriptors',
    sourceUrl: WRITING_SOURCE,
    criteria: [
      { key: 'taskResponse', label: 'Task Response' },
      ...SHARED_WRITING_CRITERIA,
    ],
    notice: 'La rúbrica enlazada es oficial. La banda producida por un agente es una estimación y no un resultado oficial de IELTS.',
  },
  speaking: {
    version: PUBLIC_DESCRIPTOR_VERSION,
    title: 'IELTS Speaking Band Descriptors',
    sourceUrl: SPEAKING_SOURCE,
    criteria: [
      { key: 'fluencyCoherence', label: 'Fluency and Coherence' },
      { key: 'lexicalResource', label: 'Lexical Resource' },
      { key: 'grammaticalRangeAccuracy', label: 'Grammatical Range and Accuracy' },
      { key: 'pronunciation', label: 'Pronunciation' },
    ],
    notice: 'La rúbrica enlazada es oficial. La banda producida por un agente a partir de grabaciones es una estimación y no un resultado oficial de IELTS.',
  },
};

export function isIeltsDelegatedReviewTask(value: unknown): value is IeltsDelegatedReviewTask {
  return typeof value === 'string' && (IELTS_DELEGATED_REVIEW_TASKS as readonly string[]).includes(value);
}

export function taskLabel(task: IeltsDelegatedReviewTask): string {
  if (task === 'writing_task_1') return 'Writing Task 1';
  if (task === 'writing_task_2') return 'Writing Task 2';
  return 'Speaking completo';
}

export function taskShortCode(task: IeltsDelegatedReviewTask): string {
  if (task === 'writing_task_1') return 'W1';
  if (task === 'writing_task_2') return 'W2';
  return 'SP';
}

export function normalizeIeltsHalfBand(value: unknown): number | null {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  if (value < 0 || value > 9) return null;
  const rounded = Math.round(value * 2) / 2;
  return Math.abs(value - rounded) < 0.000001 ? rounded : null;
}

function cleanLine(value: unknown, maxLength: number): string {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function cleanList(value: unknown): string[] | null {
  if (!Array.isArray(value) || value.length < 1 || value.length > 8) return null;
  const cleaned = value.map(item => cleanLine(item, 600)).filter(Boolean);
  return cleaned.length === value.length ? cleaned : null;
}

export type IeltsDelegatedReviewValidation =
  | { ok: true; assessment: IeltsDelegatedReviewInput }
  | { ok: false; message: string };

export function validateIeltsDelegatedReviewInput(
  task: IeltsDelegatedReviewTask,
  value: unknown,
): IeltsDelegatedReviewValidation {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { ok: false, message: 'La evaluación debe ser un objeto JSON.' };
  }

  const candidate = value as Record<string, unknown>;
  const evaluatorName = cleanLine(candidate.evaluatorName, 120);
  const evaluatorModel = cleanLine(candidate.evaluatorModel, 120);
  const overallBand = normalizeIeltsHalfBand(candidate.overallBand);
  const summary = cleanLine(candidate.summary, 3_000);
  const strengths = cleanList(candidate.strengths);
  const priorities = cleanList(candidate.priorities);

  if (evaluatorName.length < 2 || evaluatorModel.length < 2) {
    return { ok: false, message: 'Identifica el evaluador y el modelo utilizado.' };
  }
  if (overallBand == null) return { ok: false, message: 'La banda general debe ir de 0 a 9 en pasos de 0.5.' };
  if (summary.length < 40) return { ok: false, message: 'Incluye un resumen sustentado de al menos 40 caracteres.' };
  if (!strengths || !priorities) return { ok: false, message: 'Incluye entre 1 y 8 fortalezas y prioridades concretas.' };

  const rubric = IELTS_OFFICIAL_RUBRICS[task];
  if (!Array.isArray(candidate.criteria) || candidate.criteria.length !== rubric.criteria.length) {
    return { ok: false, message: `Debes evaluar exactamente los ${rubric.criteria.length} criterios oficiales.` };
  }

  const rawCriteria = candidate.criteria as unknown[];
  const criteria: IeltsDelegatedCriterionScore[] = [];
  const seen = new Set<string>();
  for (const rawCriterion of rawCriteria) {
    if (!rawCriterion || typeof rawCriterion !== 'object' || Array.isArray(rawCriterion)) {
      return { ok: false, message: 'Cada criterio debe ser un objeto válido.' };
    }
    const row = rawCriterion as Record<string, unknown>;
    const criterion = cleanLine(row.criterion, 80);
    const band = normalizeIeltsHalfBand(row.band);
    const reason = cleanLine(row.reason, 1_500);
    if (!rubric.criteria.some(item => item.key === criterion) || seen.has(criterion)) {
      return { ok: false, message: `El criterio “${criterion || 'vacío'}” no corresponde a esta tarea o está repetido.` };
    }
    if (band == null || reason.length < 20) {
      return { ok: false, message: `La banda y la justificación de ${criterion} no son válidas.` };
    }
    seen.add(criterion);
    criteria.push({ criterion, band, reason });
  }

  if (rubric.criteria.some(item => !seen.has(item.key))) {
    return { ok: false, message: 'Falta al menos un criterio oficial.' };
  }

  const calculatedOverall = Math.round((criteria.reduce((sum, criterion) => sum + criterion.band, 0) / criteria.length) * 2) / 2;
  if (overallBand !== calculatedOverall) {
    return { ok: false, message: `La banda general debe ser ${calculatedOverall}, el promedio de los cuatro criterios.` };
  }

  return {
    ok: true,
    assessment: {
      evaluatorName,
      evaluatorModel,
      overallBand,
      criteria,
      summary,
      strengths,
      priorities,
    },
  };
}

export function buildDelegatedReviewMetadata(input: {
  callCode: string;
  rubric: IeltsOfficialRubricReference;
  assessment: IeltsDelegatedReviewInput;
  submittedAt: string;
}): IeltsDelegatedReviewMetadata {
  return {
    source: 'delegated-agent',
    callCode: input.callCode,
    evaluatorName: input.assessment.evaluatorName,
    evaluatorModel: input.assessment.evaluatorModel,
    summary: input.assessment.summary,
    strengths: input.assessment.strengths,
    priorities: input.assessment.priorities,
    officialRubricVersion: input.rubric.version,
    officialRubricUrl: input.rubric.sourceUrl,
    submittedAt: input.submittedAt,
  };
}
