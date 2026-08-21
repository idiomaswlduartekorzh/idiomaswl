import type { FullAssessment } from '@/lib/labs/types';

export const IELTS_DELEGATED_REVIEW_TASKS = [
  'writing_task_1',
  'writing_task_2',
  'speaking',
] as const;

export type IeltsDelegatedReviewTask = (typeof IELTS_DELEGATED_REVIEW_TASKS)[number];

export interface IeltsOfficialRubricReference {
  version: string;
  verifiedAt: string;
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
  audioEvidenceAttested?: boolean;
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
  recordingCoverage: {
    available: number;
    expected: number;
    complete: boolean;
  };
  evidenceLabel: string;
}

export interface IeltsDelegatedAgentWorkflow {
  version: 'welearn-ielts-delegated-review-v2';
  steps: string[];
  evidenceRequirements: string[];
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
  agentWorkflow: IeltsDelegatedAgentWorkflow;
  submissionEndpoint: string;
  responseContract: {
    evaluatorName: string;
    evaluatorModel: string;
    overallBand: string;
    criteria: { criterion: string; band: string; reason: string }[];
    summary: string;
    strengths: string;
    priorities: string;
    audioEvidenceAttested?: string;
  };
}

const WRITING_SOURCE = 'https://ielts.org/cdn/ielts-guides/ielts-writing-band-descriptors.pdf';
const SPEAKING_SOURCE = 'https://ielts.org/cdn/ielts-guides/ielts-speaking-band-descriptors.pdf';
const WRITING_DESCRIPTOR_VERSION = 'IELTS Writing public band descriptors · Updated May 2023';
const SPEAKING_DESCRIPTOR_VERSION = 'IELTS Speaking public band descriptors · verified 2026-08-20';

const SHARED_WRITING_CRITERIA = [
  { key: 'coherenceCohesion', label: 'Coherence and Cohesion' },
  { key: 'lexicalResource', label: 'Lexical Resource' },
  { key: 'grammaticalRange', label: 'Grammatical Range and Accuracy' },
];

export const IELTS_OFFICIAL_RUBRICS: Record<IeltsDelegatedReviewTask, IeltsOfficialRubricReference> = {
  writing_task_1: {
    version: WRITING_DESCRIPTOR_VERSION,
    verifiedAt: '2026-08-20',
    title: 'IELTS Writing Task 1 Band Descriptors',
    sourceUrl: WRITING_SOURCE,
    criteria: [
      { key: 'taskAchievement', label: 'Task Achievement' },
      ...SHARED_WRITING_CRITERIA,
    ],
    notice: 'La rúbrica enlazada es oficial. La banda producida por un agente es una estimación y no un resultado oficial de IELTS.',
  },
  writing_task_2: {
    version: WRITING_DESCRIPTOR_VERSION,
    verifiedAt: '2026-08-20',
    title: 'IELTS Writing Task 2 Band Descriptors',
    sourceUrl: WRITING_SOURCE,
    criteria: [
      { key: 'taskResponse', label: 'Task Response' },
      ...SHARED_WRITING_CRITERIA,
    ],
    notice: 'La rúbrica enlazada es oficial. La banda producida por un agente es una estimación y no un resultado oficial de IELTS.',
  },
  speaking: {
    version: SPEAKING_DESCRIPTOR_VERSION,
    verifiedAt: '2026-08-20',
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
  return 'Speaking · diagnóstico del simulacro';
}

export function taskShortCode(task: IeltsDelegatedReviewTask): string {
  if (task === 'writing_task_1') return 'W1';
  if (task === 'writing_task_2') return 'W2';
  return 'SP';
}

export function findMissingIeltsSpeakingAudioIds(
  prompts: readonly { questionId: string }[],
  audioPaths: Record<string, string> | null | undefined,
): string[] {
  return prompts
    .map(prompt => prompt.questionId)
    .filter(questionId => !audioPaths?.[questionId]?.trim());
}

export function buildIeltsDelegatedAgentWorkflow(task: IeltsDelegatedReviewTask): IeltsDelegatedAgentWorkflow {
  const sharedSteps = [
    'Verifica el código del llamado, el UUID del intento, la tarea y la versión de la rúbrica antes de evaluar.',
    'Contrasta la evidencia entregada con la consigna exacta y con los descriptores oficiales enlazados.',
    'Asigna una banda de 0 a 9, en pasos de 0.5, a cada uno de los cuatro criterios y justifica cada decisión.',
    'Calcula la banda de la tarea como el promedio de los cuatro criterios, redondeado al medio punto más cercano.',
    'Envía el reporte completo una sola vez al submissionEndpoint; una entrega válida cierra el llamado.',
  ];

  if (task !== 'speaking') {
    return {
      version: 'welearn-ielts-delegated-review-v2',
      steps: sharedSteps,
      evidenceRequirements: [
        'Cita rasgos verificables del texto de la estudiante; no inventes intención, contenido ni errores que no aparezcan en la respuesta.',
        'Distingue el cumplimiento de la tarea, la organización, el léxico y la gramática según la tarea de Writing asignada.',
      ],
    };
  }

  return {
    version: 'welearn-ielts-delegated-review-v2',
    steps: [
      sharedSteps[0],
      'Escucha todas las grabaciones en orden y compara cada respuesta con su pregunta, cue card y preguntas de seguimiento.',
      sharedSteps[1],
      sharedSteps[2],
      sharedSteps[3],
      sharedSteps[4],
    ],
    evidenceRequirements: [
      'No infieras pronunciación desde notas o transcripciones: sustenta Pronunciation únicamente en evidencia audible.',
      'Para Fluency and Coherence observa continuidad, pausas, autocorrecciones, desarrollo y conexión de ideas.',
      'Para Lexical Resource y Grammatical Range and Accuracy cita elecciones lingüísticas audibles y su efecto en la comunicación.',
      'Para Pronunciation considera inteligibilidad, sonidos, acento léxico, ritmo, entonación y connected speech; no penalices un acento solo por no ser nativo.',
      'Si una grabación requerida no se reproduce o no contiene voz evaluable, no inventes una banda: solicita al administrador un llamado nuevo.',
      'La banda es una estimación diagnóstica de estas muestras y no equivale a una entrevista oficial IELTS de 11–14 minutos.',
    ],
  };
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
  if (task === 'speaking' && candidate.audioEvidenceAttested !== true) {
    return { ok: false, message: 'Confirma que escuchaste todas las grabaciones y que contienen voz evaluable antes de emitir la banda.' };
  }

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
      audioEvidenceAttested: task === 'speaking' ? true : undefined,
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
