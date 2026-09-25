import type { CefrLevel, DiagnosticReviewStatus } from './types.ts';

export const DIAGNOSTIC_WRITING_CRITERIA = [
  'task-fulfilment',
  'organisation',
  'grammar-control',
  'vocabulary-control',
] as const;

export type DiagnosticWritingCriterion = (typeof DIAGNOSTIC_WRITING_CRITERIA)[number];

export const DIAGNOSTIC_WRITING_TASK_RELEVANCE = [
  'on-task',
  'partially-off-task',
  'off-task',
] as const;

export const DIAGNOSTIC_WRITING_AUTHORSHIP = [
  'no-concern',
  'prompt-copy',
  'suspected-external-text',
] as const;

export interface DiagnosticWritingResponseQuality {
  taskRelevance: (typeof DIAGNOSTIC_WRITING_TASK_RELEVANCE)[number];
  authorship: (typeof DIAGNOSTIC_WRITING_AUTHORSHIP)[number];
  rationale: string;
}

export interface DiagnosticWritingResponseScreening {
  screeningVersion: 'welearn-writing-response-screening-en-v1';
  wordCount: number;
  lengthStatus: 'empty' | 'below-minimum' | 'within-range' | 'above-maximum';
  promptCopy: {
    status: 'not-detected' | 'review-required';
    longestTokenRun: number;
    matchedPhrase: string | null;
  };
  taskRelevance: 'human-review-required';
}

export interface DiagnosticWritingPrompt {
  id: string;
  contentVersion: string;
  language: string;
  levelCandidate: CefrLevel;
  title: string;
  situation: string;
  instructions: readonly string[];
  minimumWords: number;
  maximumWords: number;
  recommendedMinutes: number;
}

export interface DiagnosticWritingPromptRecord {
  publicPrompt: DiagnosticWritingPrompt;
  status: 'reserved' | 'pilot' | 'operational' | 'retired';
  exposure: 'reserved' | 'public-practice' | 'previously-public';
  review: {
    status: DiagnosticReviewStatus;
    reviewerId?: string;
    reviewedAt?: string;
    contentSha256?: string;
  };
  source: { kind: 'welearn-original' | 'welearn-legacy' | 'adapted-practice'; reference: string };
}

export const ENGLISH_WRITING_RUBRIC: Readonly<
  Record<DiagnosticWritingCriterion, Readonly<Record<CefrLevel, string>>>
> = {
  'task-fulfilment': {
    A1: 'Comunica datos personales o necesidades inmediatas mediante frases aisladas y pertinentes.',
    A2: 'Cubre los puntos explícitos de una tarea cotidiana breve con información comprensible.',
    B1: 'Desarrolla los puntos principales y añade explicaciones sencillas relevantes para el propósito.',
    B2: 'Desarrolla plenamente la tarea, sostiene una posición y selecciona detalle pertinente para el lector.',
    C1: 'Responde con precisión a un propósito complejo y controla énfasis, implicación y necesidades del lector.',
    C2: 'Cumple propósitos complejos con sutileza, selección estratégica de contenido y efecto comunicativo consistente.',
  },
  organisation: {
    A1: 'Ordena palabras y frases breves con conectores elementales.',
    A2: 'Conecta una secuencia sencilla con recursos frecuentes y una progresión reconocible.',
    B1: 'Organiza un texto conectado en párrafos funcionales y mantiene una progresión generalmente clara.',
    B2: 'Estructura y cohesiona el texto con variedad suficiente para sostener una argumentación o narración clara.',
    C1: 'Gestiona con flexibilidad la arquitectura global, las transiciones y las referencias internas.',
    C2: 'Construye una organización compleja, fluida y eficaz, ajustada al género y al efecto buscado.',
  },
  'grammar-control': {
    A1: 'Usa patrones simples memorizados; los errores son frecuentes pero parte del mensaje resulta recuperable.',
    A2: 'Controla estructuras simples frecuentes aunque mantiene errores sistemáticos en formulaciones menos rutinarias.',
    B1: 'Combina estructuras frecuentes con control razonable; los errores rara vez impiden entender la idea principal.',
    B2: 'Usa una variedad de estructuras con buen control y corrige o evita formulaciones problemáticas.',
    C1: 'Mantiene un control alto de estructuras complejas, con errores escasos y difíciles de detectar.',
    C2: 'Sostiene control consistente y flexible de estructuras complejas incluso bajo alta densidad de significado.',
  },
  'vocabulary-control': {
    A1: 'Usa palabras y expresiones básicas para información personal y situaciones inmediatas.',
    A2: 'Dispone de repertorio suficiente para rutinas conocidas, aunque repite y circunloquia con frecuencia.',
    B1: 'Cuenta con rango para temas familiares y puede reformular cuando no dispone de una palabra exacta.',
    B2: 'Selecciona vocabulario variado con control general de colocación, precisión y registro.',
    C1: 'Usa repertorio amplio y flexible, con precisión de matiz y escasa búsqueda visible.',
    C2: 'Explota un repertorio muy amplio con dominio de matiz, colocación, registro y efecto retórico.',
  },
};

export function validateWritingRubric(): string[] {
  const errors: string[] = [];
  for (const criterion of DIAGNOSTIC_WRITING_CRITERIA) {
    for (const level of ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const) {
      if ((ENGLISH_WRITING_RUBRIC[criterion][level] ?? '').trim().length < 40) {
        errors.push(`${criterion}/${level} descriptor is incomplete`);
      }
    }
  }
  return errors;
}
