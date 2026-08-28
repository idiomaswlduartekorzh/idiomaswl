export type OfficialEvidenceStatus =
  | 'explicit'
  | 'calculated-from-official-schedule'
  | 'not-published';

export type BlueprintReadiness =
  | 'full-simulation-ready'
  | 'partial-structure'
  | 'program-agreement-required'
  | 'monitor-only';

export type MedicalResidencyUniversitySlug =
  | 'udea'
  | 'unal-bogota'
  | 'univalle'
  | 'ucaldas'
  | 'unilibre-barranquilla'
  | 'unilibre-cali'
  | 'unicartagena'
  | 'uninorte'
  | 'uniatlantico';

export type OfficialSourceId =
  | 'udea-resolution-00006-2026'
  | 'udea-posgrados-2026'
  | 'univalle-resolution-374-2024'
  | 'univalle-clinical-admissions-manual'
  | 'ucaldas-call-2027'
  | 'unal-admissions-2027-1'
  | 'unilibre-applicant-guide-2025'
  | 'unicartagena-call-2027-1'
  | 'uninorte-medical-specializations'
  | 'uniatlantico-snies-guide-2026';

export interface OfficialSource {
  id: OfficialSourceId;
  institution: string;
  title: string;
  documentType: 'resolution' | 'call' | 'guide' | 'manual' | 'official-page';
  publishedAt: string | null;
  effectiveCycle: string | null;
  url: string;
  retrievedAt: string;
  supports: readonly string[];
  limitations: readonly string[];
}

export interface EvidenceValue<T> {
  value: T | null;
  status: OfficialEvidenceStatus;
  sourceIds: readonly OfficialSourceId[];
  note: string;
}

export interface OfficialExamDomain {
  id: string;
  label: string;
  scope: 'general' | 'specialty' | 'basic' | 'clinical' | 'community' | 'humanistic' | 'other';
  sourceIds: readonly OfficialSourceId[];
}

export interface ExamCompositionBlock {
  id: string;
  label: string;
  questions: number | null;
  percentage: number | null;
  scope: 'general' | 'specialty';
}

export interface SelectionWeight {
  component: 'knowledge-exam' | 'interview' | 'cv';
  percentage: number;
}

export interface PublishedSelectionWeights {
  components: readonly SelectionWeight[];
  complete: boolean;
}

export interface MedicalResidencyBlueprint {
  slug: MedicalResidencyUniversitySlug;
  university: string;
  campusOrRegion: string;
  marketLabel: string;
  effectiveCycle: string;
  version: string;
  readiness: BlueprintReadiness;
  sourceIds: readonly OfficialSourceId[];
  officialDomains: readonly OfficialExamDomain[];
  exam: {
    questionCount: EvidenceValue<number>;
    durationMinutes: EvidenceValue<number>;
    composition: EvidenceValue<readonly ExamCompositionBlock[]>;
    itemFormat: EvidenceValue<string>;
    minimumPassingScore: EvidenceValue<string>;
    scoringMethod: EvidenceValue<string>;
    selectionWeights: EvidenceValue<PublishedSelectionWeights>;
    medicalEnglish: EvidenceValue<string>;
  };
  capabilities: {
    fullLengthMock: boolean;
    timedPractice: boolean;
    specialtyExtension: boolean;
    medicalEnglishModule: boolean;
    interviewPreparation: boolean;
    cvPreparation: boolean;
  };
  programAgreementRequired: boolean;
  unknowns: readonly string[];
  productGuardrails: readonly string[];
  independentPreparationNotice: string;
}

export type MedicalQuestionEditorialStatus =
  | 'draft'
  | 'clinical-review'
  | 'source-review'
  | 'psychometric-review'
  | 'ui-qa'
  | 'pilot'
  | 'published'
  | 'suspended'
  | 'retired';

export type MedicalQuestionCognitiveTask =
  | 'recall'
  | 'interpretation'
  | 'diagnosis'
  | 'next-best-step'
  | 'treatment'
  | 'prognosis'
  | 'prevention'
  | 'ethics-and-regulation';

export interface MedicalQuestionSource {
  id: string;
  institution: string;
  title: string;
  versionOrYear: string;
  urlOrDoi: string;
  locator: string;
  accessedAt: string;
  sourceClass:
    | 'colombia-clinical-guideline'
    | 'colombia-regulation'
    | 'colombia-surveillance-protocol'
    | 'systematic-review'
    | 'international-guideline'
    | 'standard-textbook';
}

export interface MedicalQuestionV1 {
  schemaVersion: 1;
  id: string;
  revision: number;
  status: MedicalQuestionEditorialStatus;
  stem: string;
  leadIn: string;
  options: readonly {
    id: string;
    text: string;
    rationale: string;
  }[];
  correctOptionId: string;
  learningObjective: string;
  clinicalPearl: string;
  cognitiveTask: MedicalQuestionCognitiveTask;
  taxonomy: {
    domain: string;
    specialty: string | null;
    system: string | null;
    topic: string;
    subtopic: string | null;
    population: string | null;
    careSetting: string | null;
  };
  blueprintMappings: readonly {
    university: MedicalResidencyUniversitySlug;
    blueprintVersion: string;
    officialDomainId: string;
  }[];
  sources: readonly MedicalQuestionSource[];
  review: {
    authorId: string;
    clinicalReviewerId: string | null;
    sourceReviewerId: string | null;
    reviewedAt: string | null;
    nextReviewAt: string | null;
    originalityCheckedAt: string | null;
  };
  media: readonly {
    id: string;
    kind: 'image' | 'ecg' | 'radiology' | 'pathology' | 'table';
    alt: string;
    license: string;
    attribution: string;
  }[];
  psychometrics: {
    editorialDifficulty: 1 | 2 | 3 | 4 | 5;
    observedDifficulty: number | null;
    discrimination: number | null;
    medianResponseSeconds: number | null;
    sampleSize: number;
  };
}
