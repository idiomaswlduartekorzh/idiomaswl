/** Labs — contratos de datos. Aislados de src/lib/types/. */

export type IeltsTask = 'task1-academic' | 'task1-general' | 'task2';

/**
 * Los cuatro criterios oficiales, 25% cada uno.
 *
 * OJO: el primer criterio cambia de nombre según el task —
 * Task 1 se evalúa con Task Achievement, Task 2 con Task Response.
 * No son intercambiables: TA mide si transfirió la información del gráfico;
 * TR mide si formuló y sostuvo una posición. Ver criterionFor().
 */
export type IeltsCriterion =
  | 'taskAchievement'      // solo Task 1
  | 'taskResponse'         // solo Task 2
  | 'coherenceCohesion'
  | 'lexicalResource'
  | 'grammaticalRange';

/** El criterio de tarea que corresponde a cada task. */
export function criterionFor(task: IeltsTask): 'taskAchievement' | 'taskResponse' {
  return task === 'task2' ? 'taskResponse' : 'taskAchievement';
}

/**
 * `criterion` es la key del criterio dentro de la rúbrica activa (ver
 * WritingRubric abajo) — string genérico porque cada familia de examen
 * (IELTS/TOEFL/Cambridge) tiene sus propios criterios oficiales, distintos
 * entre sí. La validez real la impone el responseSchema que arma el
 * proveedor a partir de rubric.criteria, no el tipo de TypeScript.
 */
export interface CriterionScore {
  criterion: string;
  /** Puntaje en la escala de la rúbrica activa (ver WritingRubric.scoreScale). */
  band:      number;
  /** Por qué ese puntaje, en español, referido al texto del estudiante. */
  reason:    string;
}

/** Un error concreto localizado en el texto del estudiante. */
export interface TextIssue {
  /** Fragmento exacto tal como lo escribió el estudiante. */
  quote:      string;
  /** Cómo debería decirlo. */
  suggestion: string;
  /** Por qué está mal, en español. */
  explanation:string;
  severity:   'critica' | 'moderada' | 'menor';
  criterion:  string;
  issueType?: 'vocabulary' | 'grammar' | 'style' | 'unclear';
}

/** Un criterio de la rúbrica: la key que usa el JSON schema + su label humano. */
export interface RubricCriterionSpec {
  key:   string;
  label: string;
}

/**
 * Contrato genérico que debe cumplir la rúbrica de cada familia de examen
 * (IELTS/TOEFL/Cambridge) para que providers/gemini.ts pueda armar el
 * responseSchema y el system prompt sin conocer los criterios de antemano.
 */
export interface WritingRubric<TaskId extends string = string> {
  examFamily: string;
  criteria:   RubricCriterionSpec[];
  /** Escala de puntaje de ESTA familia — no todas usan bandas 0-9 de IELTS. */
  scoreScale: { min: number; max: number; step: number };
  buildSystemPrompt(task: TaskId): string;
}

/** Capa GRATIS: lo que ve cualquiera sin dejar datos. */
export interface FreeAssessment {
  overallBand: number;
  criteria:    CriterionScore[];
  /** Máximo 3. El resto queda detrás del lead. */
  topIssues:   TextIssue[];
  wordCount:   number;
  /** Cuántos errores más se detectaron y no se muestran. Es el gancho. */
  hiddenIssueCount: number;
}

/** Capa PAGA (post-lead): el reporte completo. */
export interface FullAssessment extends FreeAssessment {
  allIssues:   TextIssue[];
  /** El ensayo reescrito a band 7+, para comparar. */
  rewritten:   string;
  /** Plan de mejora semana por semana. */
  studyPlan:   { week: number; focus: string; actions: string[] }[];
  /** Puente al método WeLearn: qué paso de los 17 ataca esto. */
  weLearnStep?: string;
}

/** Reporte unificado de Writing (Task 1 + Task 2). */
export interface IELTSWritingReport {
  task1?: FreeAssessment;
  task2?: FreeAssessment;
  overallBand?: number;  // promedio de ambas tareas
  generatedAt: number;   // timestamp
}

/** Azure Pronunciation Assessment, normalizado. */
export interface PronunciationResult {
  accuracy:     number;   // 0–100
  fluency:      number;
  completeness: number;
  pronunciation:number;   // score agregado
  words: {
    word:     string;
    accuracy: number;
    error?:   'Mispronunciation' | 'Omission' | 'Insertion' | 'None';
  }[];
  transcript: string;
}

export interface LabsError {
  code:    'not_configured' | 'rate_limited' | 'invalid_input' | 'provider_error' | 'text_too_long';
  message: string;
}
