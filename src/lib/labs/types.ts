/** Labs — contratos de datos. Aislados de src/lib/types/. */

export type IeltsTask = 'task1-academic' | 'task1-general' | 'task2';

/** Los cuatro criterios oficiales de IELTS Writing. */
export type IeltsCriterion =
  | 'taskResponse'
  | 'coherenceCohesion'
  | 'lexicalResource'
  | 'grammaticalRange';

export interface CriterionScore {
  criterion: IeltsCriterion;
  /** Band 0–9 en pasos de 0.5. */
  band:      number;
  /** Por qué ese band, en español, referido al texto del estudiante. */
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
  criterion:  IeltsCriterion;
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
  code:    'not_configured' | 'rate_limited' | 'invalid_input' | 'provider_error';
  message: string;
}
