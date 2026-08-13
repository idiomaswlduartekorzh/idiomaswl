import type {
  IeltsReadingRightsRecord,
  IeltsReadingRightsRegistry,
} from '@/lib/ielts/academic-reading-rights';

const ASSESSED_AT = '2026-08-09T00:00:00-05:00';
const SENTENCE_COMPLETION_ASSESSED_AT = '2026-08-09T16:35:00Z';
const SUMMARY_COMPLETION_ASSESSED_AT = '2026-08-11T15:05:35Z';
const NOTE_COMPLETION_ASSESSED_AT = '2026-08-11T16:08:30Z';
const TABLE_COMPLETION_ASSESSED_AT = '2026-08-11T17:09:30Z';

function quarantinedSetOneRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  evidenceIds: readonly string[];
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-mock-set-1'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'probable-third-party-match',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: 'Cambridge IELTS 5 — Academic Reading Test 2',
      observedIdentifier: 'ISBN 978-0-521-67701-1',
      confidence: 'high',
      evidenceIds: input.evidenceIds,
      limitation:
        'Las fuentes revisadas permiten identificar una coincidencia editorial probable; no demuestran por sí solas titularidad, licencia ni autorización de WeLearn.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'ielts-copyright-policy',
        'cambridge-ielts-5-catalog',
        ...input.evidenceIds,
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'Búsqueda dirigida y no exhaustiva. No se localizó evidencia de autorización en las fuentes revisadas; esto no equivale a afirmar que no exista.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes contienen afirmaciones históricas, científicas o sociales que deben verificarse claim-by-claim antes de cualquier avance editorial.',
    },
    factualSourceResearch: {
      status: 'not-started',
      sourceEvidenceIds: [],
      limitation:
        'F0.2a solo estableció procedencia y derechos del mock. La verificación factual de sus pasajes pertenece a una subunidad posterior.',
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-title-sequence-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'El cotejo automático/documental solo prioriza revisión. No adjudica derechos, autoría, módulo ni exactitud factual.',
    },
  };
}

function quarantinedFormativeMultipleChoiceRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-multiple-choice-route'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-multiple-choice-catalog',
        'repository-multiple-choice-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título y primera oración. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-multiple-choice-catalog',
        'repository-multiple-choice-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La afirmación visible no sustituye evidencia estructurada.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'El pasaje presenta afirmaciones factuales al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeTfngRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-tfng-route', 'ielts-tfng-official-format'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: ['repository-tfng-catalog', 'repository-tfng-route'],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título y primera oración. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-tfng-catalog',
        'repository-tfng-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La afirmación visible no sustituye evidencia estructurada.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'El pasaje presenta afirmaciones factuales o un caso concreto al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeYnngRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-ynng-route', 'ielts-ynng-official-format'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: ['repository-ynng-catalog', 'repository-ynng-route'],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título y primera oración. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-ynng-catalog',
        'repository-ynng-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La afirmación visible no sustituye evidencia estructurada.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'El pasaje presenta afirmaciones sociales, económicas o institucionales al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeMatchingInformationRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-matching-information-route', 'ielts-matching-information-official-format'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: ['repository-matching-information-catalog', 'repository-matching-information-route'],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título y primera oración. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-matching-information-catalog',
        'repository-matching-information-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La afirmación visible no sustituye evidencia estructurada.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'El pasaje presenta afirmaciones sanitarias, museológicas o ambientales al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeMatchingHeadingsRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-matching-headings-route', 'ielts-matching-headings-official-format'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: ['repository-matching-headings-catalog', 'repository-matching-headings-route'],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título y primera oración. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-matching-headings-catalog',
        'repository-matching-headings-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La afirmación visible no sustituye evidencia estructurada.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'El pasaje presenta afirmaciones cívicas, agrícolas o de transporte al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeMatchingFeaturesRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: ['repository-matching-features-route', 'ielts-matching-features-official-format'],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: ['repository-matching-features-catalog', 'repository-matching-features-route'],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración, nombres propios y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-matching-features-catalog',
        'repository-matching-features-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. Los nombres de personas, grupos, laboratorios y programas tampoco están declarados como reales, compuestos o ficticios.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes atribuyen hallazgos, resultados institucionales y relaciones causales a entidades nombradas; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeMatchingSentenceEndingsRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: [
        'repository-matching-sentence-endings-route',
        'ielts-matching-sentence-endings-official-format',
      ],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-matching-sentence-endings-catalog',
        'repository-matching-sentence-endings-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-matching-sentence-endings-catalog',
        'repository-matching-sentence-endings-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco es original de WeLearn, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. Las fuentes factuales candidatas tampoco aportan esa evidencia de procedencia o derechos.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes presentan afirmaciones urbanas, alimentarias e institucionales al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeSentenceCompletionRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: [
        'repository-sentence-completion-route',
        'ielts-sentence-completion-official-format',
      ],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-sentence-completion-catalog',
        'repository-sentence-completion-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-sentence-completion-catalog',
        'repository-sentence-completion-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco contiene textos originales de WeLearn y no copia preguntas oficiales, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. La disponibilidad de fuentes factuales tampoco verifica procedencia ni concede derechos sobre la redacción.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes presentan afirmaciones ambientales, educativas, económicas y operativas al estudiante; las fuentes candidatas no sustituyen una verificación humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: SENTENCE_COMPLETION_ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica respuestas, acredita autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeSummaryCompletionRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: [
        'repository-summary-completion-route',
        'ielts-summary-completion-official-format',
      ],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-summary-completion-catalog',
        'repository-summary-completion-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-summary-completion-catalog',
        'repository-summary-completion-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta pública retira el banco mientras esta decisión permanezca en cuarentena. No existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes; las fuentes candidatas verifican, como máximo, ideas factuales y no conceden derechos sobre la redacción.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes presentan afirmaciones ambientales, urbanas, educativas y de seguridad; las fuentes candidatas no sustituyen una revisión humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: SUMMARY_COMPLETION_ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica respuestas, acredita autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeNoteCompletionRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: [
        'repository-note-completion-route',
        'ielts-note-completion-official-format',
      ],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-note-completion-catalog',
        'repository-note-completion-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-note-completion-catalog',
        'repository-note-completion-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco contiene textos originales de WeLearn y no copia preguntas oficiales, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. Las fuentes candidatas verifican, como máximo, ideas factuales; no conceden derechos sobre la redacción.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes presentan afirmaciones educativas, agrícolas, operativas y de servicio público; las fuentes candidatas no sustituyen una revisión humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: NOTE_COMPLETION_ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica respuestas, acredita autoría ni autoriza publicación.',
    },
  };
}

function quarantinedFormativeTableCompletionRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  return {
    assetId: input.assetId,
    sourceObjectSha256: input.sourceObjectSha256,
    passageSha256: input.passageSha256,
    moduleAssessment: {
      value: 'academic',
      status: 'inferred',
      evidenceIds: [
        'repository-table-completion-route',
        'ielts-table-completion-official-format',
      ],
    },
    authorship: {
      status: 'unknown',
      authorId: null,
      authorName: null,
      evidenceIds: [],
    },
    provenanceAssessment: {
      status: 'unresolved',
      observedWorkTitle: input.observedWorkTitle,
      observedCollection: null,
      observedIdentifier: null,
      confidence: 'none',
      evidenceIds: [
        'repository-table-completion-catalog',
        'repository-table-completion-route',
      ],
      limitation:
        'Búsqueda dirigida y no exhaustiva por título, primera oración y fragmentos distintivos. No se localizó una coincidencia exacta en los resultados revisados; ese resultado negativo no demuestra originalidad, autoría ni ausencia universal de una fuente previa.',
    },
    rightsAssessment: {
      basis: 'unknown-quarantined',
      status: 'reviewed-unresolved',
      rightsHolder: null,
      evidenceIds: [
        'repository-table-completion-catalog',
        'repository-table-completion-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'not-located-in-reviewed-sources',
      limitation:
        'La ruta afirma que el banco contiene textos originales de WeLearn y no copia preguntas oficiales, pero no existe registro de autoría, titularidad, licencia ni autorización asociado a estos hashes. Las fuentes candidatas verifican, como máximo, ideas factuales; no conceden derechos sobre la redacción.',
    },
    factualReviewRequirement: {
      policy: 'required',
      rationale:
        'Los pasajes presentan afirmaciones arquitectónicas, ambientales, educativas y museológicas; las fuentes candidatas no sustituyen una revisión humana claim-by-claim.',
    },
    factualSourceResearch: {
      status: 'candidate-sources-collected',
      sourceEvidenceIds: input.factualSourceEvidenceIds,
      limitation: input.factualLimitation,
    },
    factualReview: {
      status: 'not-reviewed',
      verifiedAt: null,
      sourceEvidenceIds: [],
      notApplicableRationale: null,
    },
    humanReview: {
      status: 'pending',
      reviewerId: null,
      reviewerName: null,
      reviewerRole: null,
      reviewedAt: null,
      decisionNote: null,
      evidenceIds: [],
    },
    automatedTriage: {
      methodVersion: 'directed-provenance-and-factual-source-review.v1',
      assessedAt: TABLE_COMPLETION_ASSESSED_AT,
      isHumanApproval: false,
      note:
        'La investigación automatizada propone fuentes candidatas y riesgos para revisión humana. No verifica hechos, adjudica respuestas, acredita autoría ni autoriza publicación.',
    },
  };
}

function quarantinedRemediatedTableCompletionRecord(input: {
  assetId: string;
  sourceObjectSha256: string;
  passageSha256: string;
  observedWorkTitle: string;
  factualSourceEvidenceIds: readonly string[];
  factualLimitation: string;
}): IeltsReadingRightsRecord {
  const historical = quarantinedFormativeTableCompletionRecord(input);

  return {
    ...historical,
    moduleAssessment: {
      value: 'academic',
      status: 'declared',
      evidenceIds: [
        'ielts-table-completion-academic-module-declaration',
        'ielts-table-completion-official-format',
      ],
    },
    provenanceAssessment: {
      ...historical.provenanceAssessment,
      status: 'verified-licensed',
      confidence: 'high',
      evidenceIds: [
        'welearn-table-completion-publication-attestation',
        'repository-table-completion-remediation-module',
        'repository-table-completion-quarantine-route',
      ],
      limitation:
        'Un representante autorizado de WeLearn declaró el derecho de publicación y explotación para práctica guiada. La declaración no identifica al autor original ni constituye una opinión legal externa.',
    },
    rightsAssessment: {
      ...historical.rightsAssessment,
      basis: 'licensed',
      status: 'verified',
      rightsHolder: 'WeLearn',
      evidenceIds: [
        'welearn-table-completion-publication-attestation',
        'repository-table-completion-remediation-module',
        'repository-table-completion-quarantine-route',
        'ielts-copyright-policy',
      ],
      authorizationEvidenceStatus: 'located-and-verified',
      limitation:
        'La autorización se limita a la práctica guiada WeLearn y se apoya en la declaración interna registrada el 2026-08-11. No concede aval de IELTS ni autoriza presentar el banco como examen oficial.',
    },
    automatedTriage: {
      ...historical.automatedTriage,
      methodVersion: 'table-completion-guided-publication.v1',
      note:
        'El control reconcilia la versión remediada y la autorización declarada. No verifica hechos, sustituye revisión IELTS humana ni convierte la práctica en modo Exam.',
    },
  };
}

export const IELTS_READING_RIGHTS_REGISTRY = {
  schemaVersion: 'ielts-academic-reading-rights-registry.v2',
  policyVersion: '2026-08-09.v8',
  module: 'academic',
  defaultDisposition: {
    rightsBasis: 'unknown-quarantined',
    disposition: 'quarantine',
    reasonCode: 'missing-rights-registry-entry',
  },
  evidence: [
    {
      id: 'repository-mock-set-1',
      kind: 'repository-source',
      label: 'IELTS mock set-1 source record',
      repositoryPath: 'src/data/mocks/ielts-set-1.ts',
      accessedAt: '2026-08-09',
      note:
        'El archivo padre se rotula IELTS Academic; esa etiqueta permite inferir el módulo, pero no sustituye una declaración editorial por activo.',
    },
    {
      id: 'ielts-copyright-policy',
      kind: 'official-policy',
      label: 'IELTS copyright and trade mark statement',
      url: 'https://ielts.org/legal/ielts-copyright-and-trade-mark-statement',
      accessedAt: '2026-08-09',
      note:
        'Política oficial revisada para delimitar reutilización y necesidad de autorización. No concede licencia a este repositorio.',
    },
    {
      id: 'ielts-tfng-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Identifying Information (True/False/Not Given)',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial distingue acuerdo, contradicción y ausencia de información; también prohíbe decidir con conocimiento externo. No valida las claves de este banco.',
    },
    {
      id: 'ielts-ynng-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Identifying writer’s views/claims',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial define YES como acuerdo con la view/claim del escritor, NO como contradicción y NOT GIVEN como ni acuerdo ni contradicción; prohíbe usar conocimiento previo. No valida las claves de este banco.',
    },
    {
      id: 'cambridge-ielts-5-catalog',
      kind: 'publisher-catalog',
      label: 'Cambridge ELT catalogue — Cambridge IELTS 5',
      url: 'https://www.cambridge.org/elt/order/catalogue/Exams.pdf',
      accessedAt: '2026-08-09',
      note:
        'Catálogo oficial que identifica Cambridge IELTS 5 Student’s Book with answers, ISBN 978-0-521-67701-1. No acredita que WeLearn tenga licencia.',
    },
    {
      id: 'external-cambridge-5-test-2-sequence',
      kind: 'external-identification',
      label: 'External identification of Cambridge 5 Test 2 passage sequence',
      url: 'https://www.babarenglish.com/post/cambridge-ielts-academic-5-reading-test-1-answers-with-explanation',
      accessedAt: '2026-08-09',
      note:
        'Página externa usada solo para cotejo dirigido de la secuencia Bakelite / What’s so funny? / The Birth of Scientific English.',
    },
    {
      id: 'external-birth-scientific-english',
      kind: 'external-identification',
      label: 'External identification of The Birth of Scientific English',
      url: 'https://ieltsdeal.com/ielts-academic-reading-cambridge-5-test-2-reading-passage-3-the-birth-of-scientific-english-with-best-solutions-and-best-explanations/',
      accessedAt: '2026-08-09',
      note:
        'Página externa usada solo para reforzar la identificación del tercer pasaje; no es evidencia de autorización.',
    },
    {
      id: 'repository-multiple-choice-catalog',
      kind: 'repository-source',
      label: 'WeLearn Multiple Choice formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de los tres pasajes, 18 preguntas, opciones, claves y explicaciones. El archivo no declara autor, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-multiple-choice-route',
      kind: 'repository-source',
      label: 'Published WeLearn Multiple Choice route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/multiple-choice/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn” y “sin copiar preguntas oficiales”; el claim queda observado, no verificado por registro de autoría.',
    },
    {
      id: 'sleep-cairney-sws-emotional-2014',
      kind: 'factual-source',
      label: 'Cairney et al. — targeted memory reactivation during slow-wave sleep',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3954173/',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre sueño de ondas lentas, husos y consolidación de memoria emocional; no verifica por sí solo todas las generalizaciones del pasaje.',
    },
    {
      id: 'sleep-rem-sws-emotional-2025',
      kind: 'factual-source',
      label: 'Both slow-wave and REM sleep contribute to emotional memory consolidation',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11930935/',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato cuya discusión subraya resultados mixtos y complementarios para SWS/REM; obliga a revisar el reparto categórico presentado por el pasaje.',
    },
    {
      id: 'sleep-deprivation-students-2017',
      kind: 'factual-source',
      label: 'Effects of sleep deprivation on university-student performance',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC5489575/',
      accessedAt: '2026-08-09',
      note:
        'Ensayo cruzado controlado candidato: una noche sin dormir afectó reacción, pero no mostró deterioro significativo en las pruebas cognitivas usadas. Sirve como contraevidencia frente a afirmaciones demasiado amplias.',
    },
    {
      id: 'river-environment-agency-2024',
      kind: 'factual-source',
      label: 'Environment Agency — improving river habitats during high and low flows',
      url: 'https://www.gov.uk/government/publications/improving-river-habitats-to-support-wildlife-during-high-and-low-flows',
      accessedAt: '2026-08-09',
      note:
        'Investigación institucional candidata sobre medidas de restauración, hábitat y resiliencia a sequías e inundaciones. No identifica el caso “Millgate”.',
    },
    {
      id: 'river-skerne-case-study',
      kind: 'factual-source',
      label: 'Environment Agency — River Skerne restoration case study',
      url: 'https://assets.publishing.service.gov.uk/media/5a74bc46ed915d4d83b5e88b/strw83-e-e.pdf',
      accessedAt: '2026-08-09',
      note:
        'Caso institucional candidato de restauración fluvial urbana y soft revetment. Es un caso distinto y no valida estadísticas, empresas o resultados atribuidos a “Millgate”.',
    },
    {
      id: 'notes-mueller-oppenheimer-2014',
      kind: 'factual-source',
      label: 'Mueller and Oppenheimer — longhand versus laptop note taking',
      url: 'https://doi.org/10.1177/0956797614524581',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre transcripción literal, procesamiento y desempeño conceptual. Debe leerse junto con replicaciones y resultados nulos.',
    },
    {
      id: 'notes-mitchell-zheng-2019-replication',
      kind: 'factual-source',
      label: 'Mitchell and Zheng — replication of longhand versus laptop findings',
      url: 'https://aisel.aisnet.org/trr/vol5/iss1/9/',
      accessedAt: '2026-08-09',
      note:
        'Replicación primaria candidata que no reprodujo el mismo patrón conceptual del estudio original y recomienda más investigación.',
    },
    {
      id: 'notes-medical-students-no-difference-2022',
      kind: 'factual-source',
      label: 'No difference in recall across tablet, laptop and longhand note taking',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9247713/',
      accessedAt: '2026-08-09',
      note:
        'Estudio observacional/experimental candidato que no halló diferencia en recuerdo factual o conceptual entre las modalidades evaluadas; limita cualquier conclusión universal.',
    },
    {
      id: 'repository-tfng-catalog',
      kind: 'repository-source',
      label: 'WeLearn True/False/Not Given formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de los tres pasajes, 22 afirmaciones, claves y explicaciones. El archivo no declara autor, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-tfng-route',
      kind: 'repository-source',
      label: 'Published WeLearn True/False/Not Given route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/true-false-not-given/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “sets originales de WeLearn”, “Banco original WeLearn” y “sin copiar preguntas oficiales”; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'urban-epa-heat-island',
      kind: 'factual-source',
      label: 'US EPA — using trees and vegetation to reduce heat islands',
      url: 'https://www.epa.gov/heatislands/using-trees-and-vegetation-reduce-heat-islands',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre sombra, evapotranspiración, temperaturas urbanas y demanda de aire acondicionado; no verifica la autoría del pasaje.',
    },
    {
      id: 'urban-usfs-canopy-inequality-2021',
      kind: 'factual-source',
      label: 'US Forest Service — tree cover and temperature disparity',
      url: 'https://research.fs.usda.gov/treesearch/62536',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre desigualdad de canopy por ingresos y temperatura, basado en imágenes aéreas y Landsat; no respalda cada detalle comparativo del pasaje.',
    },
    {
      id: 'urban-usfs-assessment-management-2018',
      kind: 'factual-source',
      label: 'US Forest Service — improving city forests through assessment and management',
      url: 'https://research.fs.usda.gov/treesearch/55851',
      accessedAt: '2026-08-09',
      note:
        'Revisión candidata sobre beneficios, evaluación, selección de especies, mantenimiento, consumo de agua y posibles costos de infraestructura.',
    },
    {
      id: 'school-govuk-extended-day-case',
      kind: 'factual-source',
      label: 'GOV.UK — extended school day case studies',
      url: 'https://www.gov.uk/government/publications/the-report-of-the-commission-on-race-and-ethnic-disparities/education-and-training',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata que documenta escuelas abiertas para homework support, individual study y library/ICT facilities; no identifica el caso narrado ni sus datos de asistencia.',
    },
    {
      id: 'school-southwark-homework-clubs',
      kind: 'factual-source',
      label: 'Southwark Council — library homework help clubs',
      url: 'https://www.southwark.gov.uk/culture-and-sport/libraries/library-activities-children/homework-help-clubs-kids',
      accessedAt: '2026-08-09',
      note:
        'Fuente municipal candidata que confirma horarios after-school y apoyo voluntario en clubes de tarea; no valida supervisores, términos o patrones de uso del pasaje.',
    },
    {
      id: 'coastal-earnse-bay-storm-2024',
      kind: 'factual-source',
      label: 'Westmorland and Furness Council — Earnse Bay storm damage',
      url: 'https://www.westmorlandandfurness.gov.uk/news/2024/council-taking-action-following-storm-damage-earnse-bay',
      accessedAt: '2026-08-09',
      note:
        'Caso municipal candidato de daño por tormenta, señalización y desplazamiento inland mediante roll-back; es un caso distinto del texto y no valida sus métricas.',
    },
    {
      id: 'coastal-natural-england-dorset-2025',
      kind: 'factual-source',
      label: 'Natural England — Dorset coast path improvements and roll-back',
      url: 'https://www.gov.uk/government/news/dorset-path-improved-from-kimmeridge-bay-to-south-haven-point',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre mejora de rutas y provisión para mover el sendero tras erosión; no identifica la ciudad, visitantes, cafés ni ahorro descritos.',
    },
    {
      id: 'coastal-dune-management-govuk',
      kind: 'factual-source',
      label: 'GOV.UK — sand dune processes and management',
      url: 'https://www.gov.uk/flood-and-coastal-erosion-risk-management-research-reports/sand-dune-processes-and-management-for-flood-and-coastal-defence',
      accessedAt: '2026-08-09',
      note:
        'Investigación oficial candidata sobre dinámica, conservación y técnicas de manejo de dunas; no verifica la propuesta ni el seguimiento del caso del pasaje.',
    },
    {
      id: 'repository-ynng-catalog',
      kind: 'repository-source',
      label: 'WeLearn Yes/No/Not Given formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de los tres pasajes, 22 afirmaciones, claves y explicaciones. El archivo no declara autor, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-ynng-route',
      kind: 'repository-source',
      label: 'Published WeLearn Yes/No/Not Given route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/yes-no-not-given/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn” y “Banco original WeLearn”; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'station-lta-gift-art',
      kind: 'factual-source',
      label: 'Singapore LTA — Gift of Art in public transport',
      url: 'https://www.lta.gov.sg/content/ltagov/en/getting_around/public_transport/a_better_public_transport_experience/art_in_public_transport/gift-of-art.html',
      accessedAt: '2026-08-09',
      note:
        'Fuente primaria institucional candidata sobre arte en estaciones, experiencia de pasajeros y conexión con quienes viven y trabajan alrededor. No valida la preferencia normativa del autor del pasaje.',
    },
    {
      id: 'station-opdc-community-brief',
      kind: 'factual-source',
      label: 'OPDC — Park Royal subway public-art community brief',
      url: 'https://consult.opdc.london.gov.uk/park-royal-subway-improvements',
      accessedAt: '2026-08-09',
      note:
        'Brief público candidato que exige trabajo con la comunidad local, representación, wayfinding, durabilidad y presupuesto. Es un caso específico y no prueba efectos generales sobre confianza.',
    },
    {
      id: 'remote-ons-hybrid-2025',
      kind: 'factual-source',
      label: 'ONS — access to hybrid work in Great Britain',
      url: 'https://www.ons.gov.uk/employmentandlabourmarket/peopleinwork/employmentandemployeetypes/articles/whohasaccesstohybridworkingreatbritain/latest',
      accessedAt: '2026-08-09',
      note:
        'Fuente estadística primaria candidata sobre persistencia y distribución del trabajo híbrido. No determina la política óptima para cada empresa o centro urbano.',
    },
    {
      id: 'remote-london-assembly-central-2024',
      kind: 'factual-source',
      label: 'London Assembly — impact of remote working on central London',
      url: 'https://www.london.gov.uk/who-we-are/what-london-assembly-does/london-assembly-work/london-assembly-publications/impact-remote-working-central-london',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre ridership, footfall, dwell time, spend y public realm en el centro de Londres. No prueba cada relación causal generalizada por el pasaje.',
    },
    {
      id: 'remote-ecb-work-preference-2025',
      kind: 'factual-source',
      label: 'ECB Consumer Expectations Survey — remote-work preferences',
      url: 'https://www.ecb.europa.eu/press/economic-bulletin/focus/2025/html/ecb.ebbox202506_04~2cd6fd1c14.en.html',
      accessedAt: '2026-08-09',
      note:
        'Fuente primaria candidata sobre prevalencia, preferencia y satisfacción con modelos híbridos en la zona euro. No prueba que dos o tres días comunes sean universalmente óptimos.',
    },
    {
      id: 'uniforms-dfe-policy-2026',
      kind: 'factual-source',
      label: 'UK Department for Education — developing school uniform policy',
      url: 'https://www.gov.uk/government/publications/school-uniform/school-uniforms',
      accessedAt: '2026-08-09',
      note:
        'Guía oficial candidata sobre identidad, consulta, flexibilidad, igualdad, religión, discapacidad, disciplina y asequibilidad. Sustenta riesgos de aplicación, no una conclusión universal a favor o en contra.',
    },
    {
      id: 'uniforms-dfe-cost-2026',
      kind: 'factual-source',
      label: 'UK Department for Education — cost of school uniforms',
      url: 'https://www.gov.uk/government/publications/cost-of-school-uniforms',
      accessedAt: '2026-08-09',
      note:
        'Guía estatutaria candidata sobre coste razonable y gestión de proveedores. No demuestra que la mayoría de escuelas use proveedor único.',
    },
    {
      id: 'uniforms-cma-costs',
      kind: 'factual-source',
      label: 'UK Competition and Markets Authority — school uniforms',
      url: 'https://www.gov.uk/government/collections/school-uniforms',
      accessedAt: '2026-08-09',
      note:
        'Evidencia institucional candidata sobre quejas de familias, exclusividad y diferencias de precio. No valida por sí sola todos los claims de desigualdad o identidad del pasaje.',
    },
    {
      id: 'ielts-matching-information-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Matching information',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial exige localizar información específica en párrafos o secciones identificados por letras; algunas secciones pueden reutilizarse cuando la instrucción lo permite. No valida las claves de este banco.',
    },
    {
      id: 'repository-matching-information-catalog',
      kind: 'repository-source',
      label: 'WeLearn Matching Information formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de tres pasajes, 15 párrafos, 18 statements, letras, explicaciones y trampas. No declara autor, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-matching-information-route',
      kind: 'repository-source',
      label: 'Published WeLearn Matching Information route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-information/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn” y “Banco original WeLearn”; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'noise-who-environmental-guidance',
      kind: 'factual-source',
      label: 'WHO — guidance on environmental noise',
      url: 'https://www.who.int/tools/compendium-on-health-and-environment/environmental-noise',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre fuentes de ruido y efectos en sueño, cognición, hipertensión y cardiopatía. No valida cada medida municipal del pasaje.',
    },
    {
      id: 'noise-ec-environmental-noise-directive',
      kind: 'factual-source',
      label: 'European Commission — Environmental Noise Directive',
      url: 'https://environment.ec.europa.eu/topics/noise/environmental-noise-directive_en',
      accessedAt: '2026-08-09',
      note:
        'Fuente normativa candidata sobre mapas de ruido, exposición, información pública y planes de acción. No confirma el método ficticio concreto de sensor + traffic counts + complaints.',
    },
    {
      id: 'noise-who-health-inequalities',
      kind: 'factual-source',
      label: 'WHO Europe — noise and health inequalities',
      url: 'https://www.who.int/europe/health-topics/noise',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata que documenta desigualdades de exposición asociadas con nivel socioeconómico. No valida cada contraste urbano del pasaje.',
    },
    {
      id: 'museum-cci-light-deterioration',
      kind: 'factual-source',
      label: 'Canadian Conservation Institute — light, ultraviolet and infrared',
      url: 'https://www.canada.ca/en/conservation-institute/services/agents-deterioration/light.html',
      accessedAt: '2026-08-09',
      note:
        'Guía técnica candidata sobre daño acumulativo, sensibilidades por material y niveles de luz. No establece una fórmula universal de diseño de exposición.',
    },
    {
      id: 'museum-cci-textiles-light',
      kind: 'factual-source',
      label: 'Canadian Conservation Institute — textiles and the environment',
      url: 'https://www.canada.ca/en/conservation-institute/services/conservation-preservation-publications/canadian-conservation-institute-notes/textiles-environment.html',
      accessedAt: '2026-08-09',
      note:
        'Guía técnica candidata sobre sensibilidad de textiles, daño acumulativo, exposición limitada y luces activadas por visitantes.',
    },
    {
      id: 'museum-smithsonian-accessible-lighting',
      kind: 'factual-source',
      label: 'Smithsonian — Guidelines for Accessible Exhibition Design',
      url: 'https://affiliations.si.edu/wp-content/uploads/PDFs/Accessible-Exhibition-Design.pdf',
      accessedAt: '2026-08-09',
      note:
        'Guía institucional candidata sobre rutas iluminadas, seguridad, contraste y legibilidad. No valida por sí sola todas las decisiones curatoriales descritas.',
    },
    {
      id: 'wetlands-noaa-coastal-resiliency',
      kind: 'factual-source',
      label: 'NOAA Fisheries — coastal resiliency',
      url: 'https://www.fisheries.noaa.gov/news/coastal-resiliency',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre humedales como infraestructura verde, energía de olas, inundaciones, suelos y hábitat. No valida la historia causal completa del pasaje.',
    },
    {
      id: 'wetlands-noaa-estuary-restoration-act',
      kind: 'factual-source',
      label: 'NOAA Fisheries — Estuary Restoration Act',
      url: 'https://www.fisheries.noaa.gov/national/habitat-conservation/estuary-restoration-act',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre pérdida, restauración, monitoreo, inundaciones y hábitat de peces en estuarios.',
    },
    {
      id: 'wetlands-noaa-restoration-monitoring',
      kind: 'factual-source',
      label: 'NOAA Fisheries — monitoring and evaluation for restoration projects',
      url: 'https://www.fisheries.noaa.gov/national/habitat-conservation/monitoring-and-evaluation-restoration-projects',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre restauración hidrológica y monitoreo de procesos físicos, biológicos y geoquímicos a largo plazo.',
    },
    {
      id: 'ielts-matching-headings-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Matching headings',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial exige relacionar párrafos o secciones con headings identificados por números romanos según su idea principal; hay más headings que secciones y un heading no puede reutilizarse. No valida las claves de este banco.',
    },
    {
      id: 'repository-matching-headings-catalog',
      kind: 'repository-source',
      label: 'WeLearn Matching Headings formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de tres pasajes, 17 párrafos y 27 opciones de heading, con claves, explicaciones y trampas. No declara autor, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-matching-headings-route',
      kind: 'repository-source',
      label: 'Published WeLearn Matching Headings route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-headings/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn” y “Banco original WeLearn”; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'libraries-gla-civic-spaces',
      kind: 'factual-source',
      label: 'Greater London Authority — libraries as civic spaces',
      url: 'https://www.london.gov.uk/libraries-civic-spaces',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre bibliotecas como infraestructura cívica y comunitaria. No verifica cada descripción histórica o servicio del pasaje.',
    },
    {
      id: 'libraries-ala-digital-literacy',
      kind: 'factual-source',
      label: 'American Library Association — digital literacy in public libraries',
      url: 'https://www.ala.org/news/2026/02/digital-literacy-public-libraries',
      accessedAt: '2026-08-09',
      note:
        'Fuente sectorial candidata sobre apoyo de alfabetización digital en bibliotecas públicas. No valida la adopción universal ni todos los efectos atribuidos en el pasaje.',
    },
    {
      id: 'libraries-imls-making',
      kind: 'factual-source',
      label: 'Institute of Museum and Library Services — making and makerspaces',
      url: 'https://www.imls.gov/about/learn-about-imls/priority-areas/making',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre espacios de creación y aprendizaje práctico en bibliotecas. No verifica cada ejemplo ni resultado comunitario del pasaje.',
    },
    {
      id: 'urban-epa-brownfields-agriculture',
      kind: 'factual-source',
      label: 'US EPA — brownfields and urban agriculture',
      url: 'https://www.epa.gov/brownfields/frequent-questions-about-brownfields-and-urban-agriculture',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre evaluación de suelo y riesgos al establecer agricultura urbana en brownfields. No valida cada técnica o beneficio del pasaje.',
    },
    {
      id: 'urban-usda-school-gardens',
      kind: 'factual-source',
      label: 'USDA Food and Nutrition Service — school gardens',
      url: 'https://www.fna.usda.gov/f2s/school-gardens',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre jardines escolares como recurso de aprendizaje y alimentación. No demuestra todos los efectos educativos o sociales expuestos en el pasaje.',
    },
    {
      id: 'urban-fao-healthy-soils',
      kind: 'factual-source',
      label: 'FAO — healthy soils for resilient and greener cities',
      url: 'https://www.fao.org/newsroom/story/healthy-soils-for-more-resilient-and-greener-cities/en',
      accessedAt: '2026-08-09',
      note:
        'Fuente intergubernamental candidata sobre salud del suelo y resiliencia urbana. No verifica todas las relaciones causales ni prácticas concretas del pasaje.',
    },
    {
      id: 'night-eea-rail-low-carbon',
      kind: 'factual-source',
      label: 'European Environment Agency — rail and waterborne transport for low-carbon travel',
      url: 'https://www.eea.europa.eu/en/analysis/publications/rail-and-waterborne-best-for-low-carbon-motorised-transport',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata que compara emisiones de modos de transporte. No valida cada comparación de ruta ni la experiencia completa de los trenes nocturnos descrita.',
    },
    {
      id: 'night-eu-cross-border-rail',
      kind: 'factual-source',
      label: 'European Commission — long-distance cross-border passenger rail',
      url: 'https://op.europa.eu/en/publication-detail/-/publication/5eb5c258-6ea2-11ec-9136-01aa75ed71a1/language-en',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre servicios ferroviarios transfronterizos de larga distancia, barreras y oportunidades. No verifica cada afirmación comercial o operativa del pasaje.',
    },
    {
      id: 'night-era-sleeper-authorisation',
      kind: 'factual-source',
      label: 'European Union Agency for Railways — sleeper train authorisation',
      url: 'https://www.era.europa.eu/content/era-signs-first-authorisation-new-generation-sleeper-trains-substantial-step-reviving-night',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre la autorización de una nueva generación de coches cama y el renovado interés por servicios nocturnos. No valida el panorama completo ni todas las causas descritas.',
    },
    {
      id: 'ielts-matching-features-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Matching features',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial exige relacionar statements o información con una lista A/B/C de features; algunas opciones pueden quedar sin usar o reutilizarse cuando la instrucción lo permite. No valida las claves de este banco.',
    },
    {
      id: 'repository-matching-features-catalog',
      kind: 'repository-source',
      label: 'WeLearn Matching Features formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de tres pasajes, 14 features y 19 statements con claves, explicaciones y trampas. No declara autor, estado real/compuesto/ficticio de entidades, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-matching-features-route',
      kind: 'repository-source',
      label: 'Published WeLearn Matching Features route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-features/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn”, “Banco original WeLearn” y ausencia de copia de preguntas oficiales; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'urban-nyc-rooftop-farm',
      kind: 'factual-source',
      label: 'NYC Mayor’s Office — rooftop farm case',
      url: 'https://www.nyc.gov/mayors-office/news/2022/04/mayor-adams-opens-rooftop-farm-staten-island-grow-organic-produce-absorb-stormwater-to',
      accessedAt: '2026-08-09',
      note:
        'Caso institucional candidato sobre agricultura en azoteas. No identifica Green Roof Collective, Lina Torres ni demuestra su economía, clientes o procedencia.',
    },
    {
      id: 'urban-doe-controlled-environment-agriculture',
      kind: 'factual-source',
      label: 'US Department of Energy — controlled-environment agriculture',
      url: 'https://www.energy.gov/cmei/ito/articles/water-energy-and-future-farming',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre producción controlada, suelo, agua y energía. No valida precios urbanos, suficiencia alimentaria ni una entidad nombrada en el pasaje.',
    },
    {
      id: 'urban-epa-vacant-land-agriculture',
      kind: 'factual-source',
      label: 'US EPA — urban agriculture on vacant land',
      url: 'https://www.epa.gov/brownfields/urban-agriculture',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre reutilización de lotes urbanos. No demuestra reducción causal de vertidos, seguridad o custodia pública ni identifica Vacant Lot Alliance.',
    },
    {
      id: 'urban-usda-cea-energy',
      kind: 'factual-source',
      label: 'USDA Agricultural Research Service — controlled-environment production',
      url: 'https://www.ars.usda.gov/research/publications/publication/?seqNo115=434664',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre producción anual, energía, inversión y soporte técnico. No acredita Metroponics Lab ni su ubicación o resultados concretos.',
    },
    {
      id: 'memory-pubmed-route-decisions',
      kind: 'factual-source',
      label: 'PubMed — active decision-making and route learning',
      url: 'https://pubmed.ncbi.nlm.nih.gov/25419818/',
      accessedAt: '2026-08-09',
      note:
        'Estudio candidato sobre la contribución de decisiones activas al aprendizaje espacial. No valida el protocolo de pausas/predicción ni identifica a Helen Ward.',
    },
    {
      id: 'memory-goodwin-cowitness',
      kind: 'factual-source',
      label: 'Goodwin 2017 — confident co-witness misinformation',
      url: 'https://doi.org/10.1002/acp.3320',
      accessedAt: '2026-08-09',
      note:
        'Contraste académico cercano sobre información errónea de un co-testigo seguro. No identifica Moreno Lab ni demuestra que el pasaje derive del artículo.',
    },
    {
      id: 'memory-nia-external-aids',
      kind: 'factual-source',
      label: 'National Institute on Aging — external memory aids',
      url: 'https://www.nia.nih.gov/health/health-care-professionals-information/caring-older-patients-cognitive-impairment',
      accessedAt: '2026-08-09',
      note:
        'Guía institucional candidata sobre listas, calendarios, recordatorios y organizadores. No valida el ensayo, los objetos concretos ni a Kenji Sato.',
    },
    {
      id: 'memory-pmc-sleep-vocabulary',
      kind: 'factual-source',
      label: 'PubMed Central — sleep and vocabulary retention',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10275344/',
      accessedAt: '2026-08-09',
      note:
        'Estudio candidato sobre sueño y retención de vocabulario. No valida la comparación exacta entre revisión noche-mañana y dos revisiones vespertinas.',
    },
    {
      id: 'memory-plos-open-book',
      kind: 'factual-source',
      label: 'PLOS ONE — preparation for open-book testing',
      url: 'https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0273185',
      accessedAt: '2026-08-09',
      note:
        'Estudio candidato sobre preparación y uso de materiales en pruebas abiertas. No demuestra que permitir apuntes cause preparación más activa ni identifica Open Notes Group.',
    },
    {
      id: 'transport-tfl-bus-priority',
      kind: 'factual-source',
      label: 'Transport for London — Bus Priority Programme',
      url: 'https://tfl.gov.uk/modes/buses/bus-priority-programme',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre prioridad de buses y actividad de bordillo. No acredita Rivergate, tres corredores ni los resultados y ajustes narrados.',
    },
    {
      id: 'transport-who-safe-speeds',
      kind: 'factual-source',
      label: 'World Health Organization — Streets for Life',
      url: 'https://www.who.int/news/item/17-05-2021-streets-for-life-campaign-calls-for-30-km-h-urban-streets-to-ensure-safe-healthy-green-and-liveable-cities',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre velocidades seguras y lesiones. No confirma Northbridge, volumen de tráfico estable ni sus datos hospitalarios.',
    },
    {
      id: 'transport-uk-maas-accessibility',
      kind: 'factual-source',
      label: 'UK Department for Transport — Mobility as a Service code',
      url: 'https://www.gov.uk/government/publications/mobility-as-a-service-maas-code-of-practice/mobility-as-a-service-code-of-practice',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre integración modal y alternativas para usuarios sin smartphone o banca digital. No acredita Metro Card Integration Project ni su secuencia de despliegue.',
    },
    {
      id: 'transport-doe-smart-charge',
      kind: 'factual-source',
      label: 'US Department of Energy — smart charge management for fleets',
      url: 'https://www.energy.gov/cmei/femp/smart-charge-management-implementation-federal-fleets',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional candidata sobre llegada, salida, permanencia y prioridades de carga. No valida Hillside, sus retornos tardíos ni ahorro de combustible.',
    },
    {
      id: 'transport-nyc-pedestrian-plaza',
      kind: 'factual-source',
      label: 'NYC DOT — Dyckman Plaza pedestrianization case',
      url: 'https://www.nyc.gov/html/dot/html/pr2021/dyckman-plaza-transforms-inwood-open-street.shtml',
      accessedAt: '2026-08-09',
      note:
        'Caso institucional candidato sobre espacio peatonal y restauración. No valida East Market, las declaraciones de taxistas ni que una consulta originara un shuttle accesible.',
    },
    {
      id: 'ielts-matching-sentence-endings-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Matching sentence endings',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial exige completar cada inicio con el mejor final identificado por letra; hay más finales que inicios, algunos quedan sin usar y los inicios siguen el orden del pasaje. Evalúa comprensión de ideas principales y no valida las claves de este banco.',
    },
    {
      id: 'repository-matching-sentence-endings-catalog',
      kind: 'repository-source',
      label: 'WeLearn Matching Sentence Endings formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de los tres pasajes, inicios, finales, claves y explicaciones. No declara autor, procedencia externa, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-matching-sentence-endings-route',
      kind: 'repository-source',
      label: 'Published WeLearn Matching Sentence Endings route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/matching-sentence-endings/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn”, “Banco original WeLearn” y ausencia de copia de preguntas oficiales; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'micro-epa-within-city-hotspots',
      kind: 'factual-source',
      label: 'US EPA — measuring heat islands',
      url: 'https://www.epa.gov/heatislands/measuring-heat-islands',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre hotspots dentro de una ciudad y diferencias superficiales de escala fina. No demuestra lo que la gente suele pensar ni acredita por sí sola la definición exacta de microclima del pasaje.',
    },
    {
      id: 'micro-epa-cool-pavements',
      kind: 'factual-source',
      label: 'US EPA — cool pavements and heat islands',
      url: 'https://www.epa.gov/heatislands/using-cool-pavements-reduce-heat-islands',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre pavimentos convencionales más calientes y alternativas reflectantes o permeables. No verifica directamente la liberación lenta de calor después del atardecer descrita en el pasaje.',
    },
    {
      id: 'micro-epa-tree-shade',
      kind: 'factual-source',
      label: 'US EPA — benefits of trees and vegetation',
      url: 'https://www.epa.gov/heatislands/benefits-trees-and-vegetation',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre sombra y evapotranspiración como mecanismos de enfriamiento. No demuestra la comparación exacta entre ubicaciones o diseños planteada en el pasaje.',
    },
    {
      id: 'micro-city-london-wind-guidelines',
      kind: 'factual-source',
      label: 'City of London — microclimate and wind guidelines',
      url: 'https://www.cityoflondon.gov.uk/services/planning/planning-application-requirements/microclimate-guidelines',
      accessedAt: '2026-08-09',
      note:
        'Guía oficial candidata que exige estudiar temprano los efectos de viento y microclima de desarrollos grandes. No valida resultados opuestos en calles concretas ni todas las relaciones causales del pasaje.',
    },
    {
      id: 'micro-noaa-transit-shade-study',
      kind: 'factual-source',
      label: 'NOAA repository — heat vulnerability and transit shade study',
      url: 'https://repository.library.noaa.gov/view/noaa/59089/noaa_59089_DS1.pdf',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre experiencias de calor y falta de sombra en calles y paradas de transporte. No demuestra que una intervención sea universalmente la más eficaz.',
    },
    {
      id: 'food-usda-farm-market-loss',
      kind: 'factual-source',
      label: 'USDA ERS — food loss on farms and markets',
      url: 'https://ers.usda.gov/amber-waves/2020/march/food-loss-why-food-stays-on-the-farm-or-off-the-market',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata que respalda que precios inferiores a costes de cosecha, procesamiento o envío pueden dejar cultivos sin recolectar. No valida todas las causas o magnitudes del pasaje.',
    },
    {
      id: 'food-springer-grocery-holiday-forecasting',
      kind: 'factual-source',
      label: 'Operational planning for public holidays in grocery retailing',
      url: 'https://link.springer.com/article/10.1007/s12063-022-00342-z',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre datos históricos, calendario, comportamiento local y ajustes meteorológicos en retail alimentario. No acredita que una cadena concreta combine exactamente los tres insumos ni obtenga el resultado narrado.',
    },
    {
      id: 'food-frontiers-imperfect-produce-cues',
      kind: 'factual-source',
      label: 'Frontiers — naturalness cues and imperfect produce',
      url: 'https://www.frontiersin.org/journals/sustainable-food-systems/articles/10.3389/fsufs.2023.1313814/full',
      accessedAt: '2026-08-09',
      note:
        'Experimentos candidatos sobre señales de marketing y aceptación de productos imperfectos. No validan la comparación exacta entre contenedor de descuento, exposición normal y recetas del pasaje.',
    },
    {
      id: 'food-fda-donation-safety',
      kind: 'factual-source',
      label: 'US FDA — key steps for donating food',
      url: 'https://www.fda.gov/food/retail-food-industryregulatory-assistance-training/key-steps-donating-food-retail-food-establishments',
      accessedAt: '2026-08-09',
      note:
        'Guía oficial candidata sobre etiquetado, empaque, temperatura, transporte y registros para donación. No acredita las ventanas de recogida ni cocinas comunitarias específicas descritas.',
    },
    {
      id: 'food-epa-wasted-food-scale',
      kind: 'factual-source',
      label: 'US EPA — Wasted Food Scale',
      url: 'https://www.epa.gov/sustainable-management-food/wasted-food-scale',
      accessedAt: '2026-08-09',
      note:
        'La escala oficial prioriza prevención, donación y upcycling por encima del compostaje. No respalda el superlativo “último paso” en todos los casos ni lo que especialistas suelen recomendar.',
    },
    {
      id: 'coastal-ala-resilience-hubs',
      kind: 'factual-source',
      label: 'American Library Association — Resilient Communities guidelines',
      url: 'https://www.ala.org/tools/programming/climatechange/guidelines',
      accessedAt: '2026-08-09',
      note:
        'Guía primaria candidata sobre bibliotecas como Climate Resilience Hubs, información de preparación y capacitación. No acredita varios concejos costeros ni el contenido específico sobre seguros de inundación.',
    },
    {
      id: 'coastal-imls-trusted-libraries',
      kind: 'factual-source',
      label: 'Institute of Museum and Library Services — libraries as essential community services',
      url: 'https://www.imls.gov/news-events/news-releases/primary-source-directors-message-may-2011?Archive=y&F_All=y',
      accessedAt: '2026-08-09',
      note:
        'Fuente institucional que caracteriza las bibliotecas como recursos comunitarios de confianza y servicios esenciales. No valida la conducta exacta, la capacitación del personal ni el disclaimer sobre asesoría legal o técnica del pasaje.',
    },
    {
      id: 'coastal-noaa-flood-map-workshops',
      kind: 'factual-source',
      label: 'NOAA — tips for using coastal flood maps in communities',
      url: 'https://coast.noaa.gov/data/digitalcoast/pdf/flood-exposure-tips.pdf',
      accessedAt: '2026-08-09',
      note:
        'Guía oficial candidata sobre conversaciones y talleres comunitarios apoyados en mapas de inundación. No identifica bibliotecas ni la comparación concreta con fotografías de calles.',
    },
    {
      id: 'coastal-noaa-participatory-flood-mapping',
      kind: 'factual-source',
      label: 'NOAA — participatory mapping for watershed management',
      url: 'https://coast.noaa.gov/digitalcoast/training/nc-watershed-management.html',
      accessedAt: '2026-08-09',
      note:
        'Caso oficial candidato en que aportes comunitarios cartografían preocupaciones por inundación. No identifica Harbor Point, bibliotecas, desagües ni priorización de mantenimiento.',
    },
    {
      id: 'coastal-fema-community-information-sharing',
      kind: 'factual-source',
      label: 'FEMA — information sharing for private-public partnerships',
      url: 'https://www.fema.gov/sites/default/files/documents/fema_npd_information-sharing-guide-for-private-public-partnerships_092023.pdf',
      accessedAt: '2026-08-09',
      note:
        'Guía oficial candidata sobre intercambio de información y resiliencia mediante alianzas público-privadas. No demuestra el rol específico de bibliotecas ni el ranking de cuál sería su mayor valor.',
    },
    {
      id: 'ielts-summary-completion-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Summary/note/table/flow-chart completion',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-11',
      note:
        'La fuente oficial confirma dos variantes de Summary Completion, límites variables, pérdida del punto por exceso, contracciones no probadas y palabras con guion contadas como una. También indica que las respuestas pueden no seguir el orden textual y suelen venir de una parte del texto. No valida este banco ni sus claves.',
    },
    {
      id: 'ielts-summary-completion-official-samples',
      kind: 'official-policy',
      label: 'IELTS Academic Reading sample tasks — Summary Completion',
      url: 'https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test',
      accessedAt: '2026-08-11',
      note:
        'La página oficial ofrece muestras separadas para seleccionar palabras del texto y para seleccionar de una lista. Se usa solo para contrastar la existencia de ambas variantes; no se reproducen sus pasajes, preguntas ni claves.',
    },
    {
      id: 'repository-summary-completion-catalog',
      kind: 'repository-source',
      label: 'WeLearn Summary Completion formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-11',
      note:
        'Fuente de tres pasajes, 18 huecos, claves, una alternativa, hints y explicaciones. No declara autor, fecha de redacción, procedencia externa, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-summary-completion-route',
      kind: 'repository-source',
      label: 'Published WeLearn Summary Completion route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/summary-completion/page.tsx',
      accessedAt: '2026-08-11',
      note:
        'La superficie publicada afirma “textos originales de WeLearn” y “Banco original WeLearn”. Esos claims quedan observados, no verificados por un registro de autoría o licencia.',
    },
    {
      id: 'urban-fao-upa-short-supply-chains',
      kind: 'factual-source',
      label: 'FAO — Urban and peri-urban agriculture',
      url: 'https://www.fao.org/urban-peri-urban-agriculture/about/en',
      accessedAt: '2026-08-11',
      note:
        'Fuente institucional candidata sobre cadenas cortas de suministro en agricultura urbana y periurbana. No demuestra que toda granja de azotea acorte cadenas ni la escala, cultivos o clientes descritos.',
    },
    {
      id: 'urban-nps-green-roof-structural-load',
      kind: 'factual-source',
      label: 'US National Park Service — physical impact of green roofs',
      url: 'https://www.nps.gov/articles/000/green-roofs-on-historic-buildings-physical-impact.htm',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre carga adicional, peso saturado y necesidad de evaluación estructural en edificios históricos. No respalda que una irrigación cuidadosa reduzca la carga.',
    },
    {
      id: 'urban-nyc-green-roof-requirements',
      kind: 'factual-source',
      label: 'NYC Department of Buildings — green roof requirements',
      url: 'https://www.nyc.gov/site/buildings/codes/green-roofs.page',
      accessedAt: '2026-08-11',
      note:
        'Fuente municipal candidata sobre análisis estructural profesional, carga saturada y aislamiento. Está marcada All Rights Reserved y solo se usa como referencia factual, no para reproducir contenido.',
    },
    {
      id: 'urban-epa-rainwater-potable-demand',
      kind: 'factual-source',
      label: 'US EPA — green infrastructure and drought preparation',
      url: 'https://www.epa.gov/green-infrastructure/prepare-drought',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata que indica que barriles y cisternas pueden reducir demanda de agua potable. No valida cualquier diseño, lugar o magnitud y treated water es más amplio que potable water.',
    },
    {
      id: 'urban-usda-cornell-agriculture-education',
      kind: 'factual-source',
      label: 'USDA NIFA/Cornell — urban agriculture education in New York City',
      url: 'https://portal.nifa.usda.gov/web/crisprojectpages/1021530-outcomes-of-urban-agriculture-education-in-new-york-city.html',
      accessedAt: '2026-08-11',
      note:
        'Proyecto candidato sobre agricultura urbana, invernaderos en azoteas y aprendizaje STEM/científico en escuelas. El contenido remitido por Cornell no se presume dominio público ni valida el universal del pasaje.',
    },
    {
      id: 'repair-cafe-official-about',
      kind: 'factual-source',
      label: 'Repair Café International — About Repair Café',
      url: 'https://www.repaircafe.org/en/about/',
      accessedAt: '2026-08-11',
      note:
        'Fuente primaria candidata sobre funcionamiento, aprendizaje y voluntarios expertos. La historia oficial identifica un primer evento organizado; no acredita el origen plural como reuniones informales.',
    },
    {
      id: 'repair-cafe-official-house-rules',
      kind: 'factual-source',
      label: 'Repair Café International — House rules',
      url: 'https://www.repaircafe.org/en/house-rules/',
      accessedAt: '2026-08-11',
      note:
        'Fuente primaria candidata: visitantes reparan por sí mismos cuando es posible, expertos pueden rechazar objetos y puede limitarse un objeto. No establece el requisito eléctrico universal del pasaje.',
    },
    {
      id: 'repair-cafe-official-faq',
      kind: 'factual-source',
      label: 'Repair Café International — FAQ',
      url: 'https://www.repaircafe.org/en/faq/',
      accessedAt: '2026-08-11',
      note:
        'Fuente primaria candidata: no es un servicio convencional y suelen existir piezas pequeñas, pero no prueba una comprobación sistemática antes de cada sesión. Copyright 2026; no se presume licencia abierta.',
    },
    {
      id: 'repair-cafe-official-foundation',
      kind: 'factual-source',
      label: 'Repair Café International Foundation',
      url: 'https://www.repaircafe.org/en/foundation/',
      accessedAt: '2026-08-11',
      note:
        'Fuente primaria candidata sobre conservación y difusión de habilidades de reparación y cohesión social. No demuestra grupos etarios, confianza medida ni todos los efectos descritos.',
    },
    {
      id: 'shade-nasa-extreme-weather-frequency',
      kind: 'factual-source',
      label: 'NASA — Climate change and extreme weather',
      url: 'https://science.nasa.gov/climate-change/extreme-weather/',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre olas de calor récord más frecuentes e intensas globalmente. No demuestra la misma tendencia o magnitud en cada ciudad.',
    },
    {
      id: 'shade-epa-climate-indicators-2024',
      kind: 'factual-source',
      label: 'US EPA — Climate Change Indicators in the United States 2024',
      url: 'https://nepis.epa.gov/Exe/ZyPURL.cgi?Dockey=P101AXFE.txt',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre frecuencia de olas de calor, exposición, sensibilidad y vulnerabilidad. No permite tratar exposición y sensibilidad como el mismo mecanismo para todos los grupos.',
    },
    {
      id: 'shade-ut-austin-satellite-ground-mapping',
      kind: 'factual-source',
      label: 'UT Austin — city and community extreme-heat mapping',
      url: 'https://news.utexas.edu/2021/06/29/ut-austin-teams-up-with-city-and-community-to-fight-extreme-heat-in-austin/',
      accessedAt: '2026-08-11',
      note:
        'Proyecto primario candidato que combina satélite, sensores terrestres, modelos y experiencia de residentes. No prueba un flujo universal que siempre comience con satélite.',
    },
    {
      id: 'shade-rmit-shadeways-routes',
      kind: 'factual-source',
      label: 'RMIT University — Shadeways heat mapping',
      url: 'https://www.rmit.edu.au/news/all-news/2019/dec/smart-city-tech-keeps-bendigo-cool-mapping-hot-spots',
      accessedAt: '2026-08-11',
      note:
        'Fuente universitaria candidata sobre rutas sombreadas, Street View e imágenes térmicas para priorizar intervenciones. No demuestra percepción de longitud ni several blocks. Copyright RMIT; no reproducir.',
    },
    {
      id: 'shade-phoenix-action-plan',
      kind: 'factual-source',
      label: 'City of Phoenix — Tree and Shade Programs',
      url: 'https://www.phoenix.gov/administration/departments/heat/tree-shade-programs.html',
      accessedAt: '2026-08-11',
      note:
        'Plan municipal candidato que vincula sombra con población vulnerable y lugares donde se camina, espera el bus o usan parques. No acredita small ni un beneficio cuantificado para many people.',
    },
    {
      id: 'ielts-sentence-completion-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Sentence completion',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-09',
      note:
        'La regla oficial exige completar cada hueco con palabras del texto, respetar el límite indicado y mantiene las preguntas en el orden de la información. Las palabras con guion cuentan como una y las contracciones no se prueban. No valida las claves de este banco.',
    },
    {
      id: 'ielts-british-american-spelling-policy',
      kind: 'official-policy',
      label: 'IELTS acceptance of British and American spellings',
      url: 'https://ielts.org/news-and-insights/ielts-is-the-most-trusted-english-test-in-the-world-heres-why',
      accessedAt: '2026-08-09',
      note:
        'La orientación oficial de IELTS indica que se aceptan grafías británicas y estadounidenses. Esta política permite revisar una variante ortográfica explícita, pero no valida automáticamente las alternativas ni las claves de este banco.',
    },
    {
      id: 'repository-sentence-completion-catalog',
      kind: 'repository-source',
      label: 'WeLearn Sentence Completion formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-09',
      note:
        'Fuente de tres pasajes, 18 frases incompletas, claves, alternativas, hints y explicaciones. No declara autor, procedencia externa, rightsBasis, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-sentence-completion-route',
      kind: 'repository-source',
      label: 'Published WeLearn Sentence Completion route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/sentence-completion/page.tsx',
      accessedAt: '2026-08-09',
      note:
        'La superficie publicada afirma “textos originales de WeLearn”, “Banco original WeLearn” y ausencia de copia de preguntas oficiales; los claims quedan observados, no verificados por registro de autoría.',
    },
    {
      id: 'wetland-epa-about-green-infrastructure',
      kind: 'factual-source',
      label: 'US EPA — about green infrastructure',
      url: 'https://www.epa.gov/green-infrastructure/about-green-infrastructure',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre sistemas de plantas y suelo que almacenan, infiltran y filtran lluvia frente al drenaje gris. Sustenta el mecanismo general, no prueba que todo wetland park tenga el diseño descrito; disponibilidad no verifica el claim ni concede licencia sobre el pasaje.',
    },
    {
      id: 'wetland-epa-mitigate-flooding',
      kind: 'factual-source',
      label: 'US EPA — green infrastructure to mitigate flooding',
      url: 'https://www.epa.gov/green-infrastructure/mitigate-flooding',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata sobre absorción y almacenamiento temporal de lluvia, menor acumulación en calles y alivio de redes de tuberías. No demuestra un efecto universal o cuantificado para cada tormenta; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'wetland-epa-wetland-functions',
      kind: 'factual-source',
      label: 'US EPA — wetland functions and value',
      url: 'https://www.epa.gov/wetlands/how-do-wetlands-function-and-why-are-they-valuable',
      accessedAt: '2026-08-09',
      note:
        'Fuente oficial candidata que identifica insectos, anfibios y aves entre los organismos de humedales. No prueba que cada humedal urbano construido sostenga todos esos grupos; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'wetland-epa-pond-wetland-maintenance',
      kind: 'factual-source',
      label: 'US EPA — stormwater pond and wetland maintenance guide',
      url: 'https://www.epa.gov/sites/default/files/2015-11/documents/pondmgmtguide.pdf',
      accessedAt: '2026-08-09',
      note:
        'Guía técnica candidata sobre inspección tras tormentas, salud vegetal, residuos, obstrucciones y mantenimiento. No sustenta de forma exacta cada frecuencia o la frase sobre revisar niveles de agua; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'wetland-uk-blockage-management',
      kind: 'factual-source',
      label: 'GOV.UK — blockage management guide',
      url: 'https://www.gov.uk/government/publications/blockage-management-guide',
      accessedAt: '2026-08-09',
      note:
        'Investigación oficial candidata sobre residuos, vegetación y sedimento que reducen capacidad de flujo y pueden elevar el riesgo de inundación. La aplicación a un parque descuidado es inferencial; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'makers-ala-libraries-build-business',
      kind: 'factual-source',
      label: 'American Library Association — Libraries Build Business playbook',
      url: 'https://www.ala.org/advocacy/sites/ala.org.advocacy/files/content/Workforce/LBB_Playbook_web_013122.pdf',
      accessedAt: '2026-08-09',
      note:
        'Fuente sectorial candidata con casos de makerspaces bibliotecarios que ofrecen impresoras 3D, equipos audiovisuales y máquinas de coser. No demuestra prevalencia en many towns ni el inventario completo; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'makers-australian-public-libraries-study',
      kind: 'factual-source',
      label: 'Slatter and Howard — makerspaces in Australian public libraries',
      url: 'https://www.tandfonline.com/doi/abs/10.1080/00049670.2013.853335',
      accessedAt: '2026-08-09',
      note:
        'Estudio cualitativo candidato sobre el cambio de una imagen de consumo de información hacia creación y participación comunitaria. El acceso directo fue limitado y la muestra es pequeña; disponibilidad o indexación no verifica el claim ni concede licencia.',
    },
    {
      id: 'makers-public-library-coach-study',
      kind: 'factual-source',
      label: 'Pijls et al. — children and coaches in a public-library makerspace',
      url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9040691/',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato sobre experiencias de 307 niños y formación de coaches en makerspaces de la biblioteca pública de Ámsterdam. Apoya la importancia de guía y capacitación, no prueba el superlativo works best ni realistic first projects; disponibilidad no licencia el pasaje.',
    },
    {
      id: 'makers-imls-community-needs',
      kind: 'factual-source',
      label: 'IMLS and Maker Ed — Library as Incubator Project white paper',
      url: 'https://makered.org/wp-content/uploads/2019/12/IMLS-LibraryMakerspaces2019_WPweb_final.pdf',
      accessedAt: '2026-08-09',
      note:
        'Guía institucional candidata sobre diseñar making como respuesta a necesidades comunitarias y considerar costes. No prueba que equipo costoso quede sin uso ni una consecuencia universal; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'makers-wheaton-noise-zones',
      kind: 'factual-source',
      label: 'Wheaton Public Library — Noise Level Zones Policy',
      url: 'https://www.wheatonlibrary.org/policies/noise-level-zones-policy',
      accessedAt: '2026-08-09',
      note:
        'Política institucional candidata que separa zonas silenciosas, tranquilas y de conversación para proteger lectura y estudio. No es específica de makerspaces ni demuestra que esa separación defina a toda biblioteca exitosa; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'night-naga-ordinance',
      kind: 'factual-source',
      label: 'City Government of Naga — night-market ordinance',
      url: 'https://www2.naga.gov.ph/prev-ordinance/ordinance-no-2014-004/',
      accessedAt: '2026-08-09',
      note:
        'Ordenanza primaria candidata que permite cerrar temporalmente calles y regular venta de bienes y comida en night markets. No sustenta el lighting plan, la economía causal ni la comparación con un shopping centre; disponibilidad no licencia el pasaje.',
    },
    {
      id: 'night-bromley-test-trading',
      kind: 'factual-source',
      label: 'London Borough of Bromley — test-trading market stall',
      url: 'https://www.bromley.gov.uk/TestTradingMarketStall',
      accessedAt: '2026-08-09',
      note:
        'Programa municipal candidato de prueba comercial de bajo coste y riesgo para refinar productos, precios y marca. No es un night market y el acceso directo fue limitado; disponibilidad o indexación no verifica el claim ni concede licencia.',
    },
    {
      id: 'night-primary-built-environment-accessibility',
      kind: 'factual-source',
      label: 'Buildings — built-environment accessibility of night markets',
      url: 'https://www.mdpi.com/2075-5309/16/14/2728',
      accessedAt: '2026-08-09',
      note:
        'Estudio primario candidato que usa paradas de transporte, rail y accesos como indicadores de accesibilidad de mercados nocturnos. No compara exactamente una parada con un aparcamiento aislado y el acceso directo fue limitado; disponibilidad no verifica ni licencia.',
    },
    {
      id: 'night-maidstone-street-trading-policy',
      kind: 'factual-source',
      label: 'Maidstone Borough Council — street trading policy',
      url: 'https://maidstone.gov.uk/home/primary-services/council-and-democracy/information-and-data/council-performance-reports/policies/street-trading-policy',
      accessedAt: '2026-08-09',
      note:
        'Política municipal candidata sobre obstrucción peatonal, residuos, ruido nocturno y audio amplificado. Regula street trading en general y no prueba el efecto de sentirse lively; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'night-hackney-market-metrics-costs',
      kind: 'factual-source',
      label: 'Hackney Council — markets fees, footfall, waste and feedback',
      url: 'https://consultation.hackney.gov.uk/parking-markets/fees-and-charges-2026/',
      accessedAt: '2026-08-09',
      note:
        'Consulta municipal candidata que documenta footfall, limpieza, residuos, costes y feedback. No sustenta ventas de vendors, crowd movement, frecuencia after each event ni el superlativo strongest; disponibilidad no verifica el claim ni concede licencia.',
    },
    {
      id: 'ielts-note-completion-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Summary, note, table and flow-chart completion',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-11',
      note:
        'La fuente oficial agrupa Note Completion en el tipo 9, describe variantes con palabras del texto o lista, exige respetar el límite y encaje gramatical, y aclara que las respuestas no necesariamente siguen el orden. No valida este banco ni sus claves.',
    },
    {
      id: 'ielts-note-completion-official-samples',
      kind: 'official-policy',
      label: 'IELTS Academic sample test questions',
      url: 'https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test',
      accessedAt: '2026-08-11',
      note:
        'Página oficial de materiales de muestra usada como referencia editorial secundaria. No autoriza copiar tareas oficiales ni certifica el contenido WeLearn.',
    },
    {
      id: 'repository-note-completion-catalog',
      kind: 'repository-source',
      label: 'WeLearn Note Completion formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-11',
      note:
        'Fuente de tres pasajes, 18 notas incompletas, claves, hints y explicaciones. No declara autor, historial de creación, titular, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-note-completion-route',
      kind: 'repository-source',
      label: 'Published WeLearn Note Completion route and originality claim',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/note-completion/page.tsx',
      accessedAt: '2026-08-11',
      note:
        'La superficie publicada afirma “textos originales de WeLearn”, “Banco original WeLearn” y ausencia de copia de preguntas oficiales. Son claims observados, no verificados por un registro de autoría o derechos.',
    },
    {
      id: 'note-mobile-nsw-outreach-report',
      kind: 'factual-source',
      label: 'State Library of New South Wales — Mobile and Outreach Services report',
      url: 'https://pls.sl.nsw.gov.au/sites/default/files/2023-09/mobile_outreach_services.pdf',
      accessedAt: '2026-08-11',
      note:
        'Fuente sectorial candidata sobre acceso para personas que no llegan a una sucursal, costes operativos y necesidades de personal. No demuestra que mantener sucursales fijas sea siempre demasiado caro ni verifica el pasaje.',
    },
    {
      id: 'note-mobile-wingecarribee-timetable',
      kind: 'factual-source',
      label: 'Wingecarribee Shire Council — Mobile Library',
      url: 'https://library.wsc.nsw.gov.au/explore/mobile-library/',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo municipal candidato con libros, revistas y un horario periódico. No sustenta el conjunto exacto de escuelas, mercados y community halls ni una regla universal.',
    },
    {
      id: 'note-mobile-derbyshire-village-hall-stops',
      kind: 'factual-source',
      label: 'Derbyshire County Council — Mobile libraries',
      url: 'https://www.derbyshire.gov.uk/leisure/libraries/services/mobile-libraries/mobile-libraries.aspx',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo oficial candidato de paradas junto a village halls. No acredita mercados, escuelas ni el claim combinado del pasaje.',
    },
    {
      id: 'note-mobile-nsw-library-partnerships',
      kind: 'factual-source',
      label: 'State Library of New South Wales — Programs and partnerships',
      url: 'https://pls.sl.nsw.gov.au/managing-my-library/buildings-and-spaces/people-places/influence/programs-and-partnerships',
      accessedAt: '2026-08-11',
      note:
        'Orientación institucional candidata sobre alianzas de bibliotecas. No demuestra la cadena causal ni el trío exacto schools, health centres and volunteer groups para mobile libraries.',
    },
    {
      id: 'note-mobile-australia-public-library-guidelines',
      kind: 'factual-source',
      label: 'Australian Public Library Alliance — Guidelines, standards and outcome measures',
      url: 'https://content.plconnect.slq.qld.gov.au/sites/default/files/APLAALIA-guidelinesstandardsoutcomemeasures-2016.pdf',
      accessedAt: '2026-08-11',
      note:
        'Guía sectorial candidata que trata escuelas, servicios de salud y voluntariado en bibliotecas públicas. No convierte esos ejemplos en una condición universal de éxito ni concede licencia sobre el pasaje.',
    },
    {
      id: 'note-seed-fao-borrow-return',
      kind: 'factual-source',
      label: 'FAO — Community seed bank borrowing and return after harvest',
      url: 'https://www.fao.org/4/ac546e/ac546e07.htm',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata que documenta préstamo antes de sembrar y devolución después de la cosecha en un contexto local. Las condiciones y cantidades varían entre bancos.',
    },
    {
      id: 'note-seed-cgiar-community-adaptation',
      kind: 'factual-source',
      label: 'CGIAR — Community seed banks and local climate adaptation',
      url: 'https://www.cgiar.org/news-events/news/planting-seeds-of-hope-community-seed-banks-empower-farmers-and-address-climate-risk-in-india',
      accessedAt: '2026-08-11',
      note:
        'Fuente institucional candidata sobre variedades locales, diversidad y adaptación climática. No sustenta conjuntamente valleys, islands, taste y selección multigeneracional.',
    },
    {
      id: 'note-seed-croptrust-registration',
      kind: 'factual-source',
      label: 'CGIAR Genebank Platform — Registration procedures',
      url: 'https://cgkb.cgiar.croptrust.org/images/file/procedures/chapter_registration_%20genebankmanual8.pdf',
      accessedAt: '2026-08-11',
      note:
        'Manual técnico candidato sobre nombre de accesión, sitio de recolección, origen y otros descriptores. No demuestra que voluntarios de todo community seed bank sigan exactamente ese flujo.',
    },
    {
      id: 'note-seed-fao-storage',
      kind: 'factual-source',
      label: 'FAO — Seed storage conditions',
      url: 'https://www.fao.org/4/AD226E/AD226E06.htm',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre almacenamiento seco y fresco, contenedores y protección contra insectos y hongos. Existen diferencias por especie y tipo de semilla.',
    },
    {
      id: 'note-seed-fao-viability-regeneration',
      kind: 'factual-source',
      label: 'FAO — Seed germination testing and regeneration timing',
      url: 'https://www.fao.org/4/x6109e/x6109e06.htm',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre pruebas de germinación en muestras y decisiones de regeneración. Simplifica prácticas de genebank que no necesariamente se aplican igual a todo community seed bank.',
    },
    {
      id: 'note-night-tasmania-open-library-trial',
      kind: 'factual-source',
      label: 'Tasmanian Government — Open Library Access trial',
      url: 'https://www.premier.tas.gov.au/latest-news/2024/september/open-library-access-trial-to-commence-in-2025',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo gubernamental candidato de horario extendido, estudio silencioso, prueba temporal, seguridad y consentimiento de guardianes. No demuestra el protocolo universal descrito.',
    },
    {
      id: 'note-night-nsw-extended-study-hours',
      kind: 'factual-source',
      label: 'State Library of New South Wales — Extended study hours',
      url: 'https://www.sl.nsw.gov.au/news/extended-study-hours-students',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo institucional candidato de horas de estudio extendidas y acceso parcial a espacios. No verifica falta de espacio tranquilo en casa ni una configuración uniforme de servicios.',
    },
    {
      id: 'note-night-albany-after-hours-study',
      kind: 'factual-source',
      label: 'City of Albany — After-hours study space',
      url: 'https://library.albany.wa.gov.au/news/library-launches-after-hours-study-space/964',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo municipal candidato con espacio asegurado, Wi-Fi y requisitos de permiso para menores. No sustenta el paquete universal de counters, children’s areas y archives.',
    },
    {
      id: 'note-night-kuringgai-foyer',
      kind: 'factual-source',
      label: 'Ku-ring-gai Council — Library After Hours Foyer',
      url: 'https://www.krg.nsw.gov.au/Community/Ku-ring-gai-Library/Library-After-Hours/Library-After-Hours-Foyer',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo municipal candidato de acceso after-hours con Wi-Fi y límites de equipos y servicios. Muestra variación entre sedes, no el bundle exacto del pasaje.',
    },
    {
      id: 'note-night-ryde-opening-trial',
      kind: 'factual-source',
      label: 'City of Ryde — Extended opening trial',
      url: 'https://www.ryde.nsw.gov.au/Council/Media-Centre/News-and-Public-Notices/Eastwood-Library-begins-exciting-247-opening-trial',
      accessedAt: '2026-08-11',
      note:
        'Ejemplo municipal candidato de prueba de doce meses, controles de seguridad y feedback. No establece que las bibliotecas usually midan exactamente las variables o adopten la decisión descrita.',
    },
    {
      id: 'ielts-table-completion-official-format',
      kind: 'official-policy',
      label: 'IELTS Academic Reading — Summary, note, table and flow-chart completion',
      url: 'https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading',
      accessedAt: '2026-08-11',
      note:
        'La fuente oficial incluye Table Completion en el tipo 9, describe las variantes con palabras del texto o lista, exige respetar el límite y encaje gramatical, y aclara que las respuestas pueden no seguir el orden. No valida este banco ni sus claves.',
    },
    {
      id: 'ielts-table-completion-sample-task',
      kind: 'official-policy',
      label: 'IELTS Academic sample test questions — Table Completion',
      url: 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test',
      accessedAt: '2026-08-11',
      note:
        'La página oficial ofrece una muestra de Table Completion. Se usa solo para contrastar el formato; no autoriza copiar tareas oficiales ni certifica el contenido WeLearn.',
    },
    {
      id: 'repository-table-completion-catalog',
      kind: 'repository-source',
      label: 'WeLearn Table Completion formative bank source',
      repositoryPath: 'src/data/practica-exams/seo-catalog.ts',
      accessedAt: '2026-08-11',
      note:
        'Fuente de tres pasajes, tres tablas, 18 huecos, claves, hints y explicaciones. No declara autor, historial de creación, titular, licencia, revisor ni fuentes factuales por activo.',
    },
    {
      id: 'repository-table-completion-route',
      kind: 'repository-source',
      label: 'WeLearn Table Completion route and quarantine enforcement',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx',
      accessedAt: '2026-08-11',
      note:
        'La superficie pública conserva la explicación del formato, pero retira pasajes, preguntas y claves mientras procedencia, derechos, revisión factual y aprobación humana sigan pendientes.',
    },
    {
      id: 'repository-table-completion-remediation-module',
      kind: 'repository-source',
      label: 'WeLearn Table Completion versioned remediation source',
      repositoryPath: 'src/data/practica-exams/ielts-table-completion-remediated.ts',
      accessedAt: '2026-08-11',
      note:
        'Versión candidata separada que corrige cuatro hallazgos materiales sin modificar las identidades históricas. No constituye aprobación IELTS, factual, legal ni editorial humana.',
    },
    {
      id: 'repository-table-completion-quarantine-route',
      kind: 'repository-source',
      label: 'WeLearn Table Completion public quarantine route',
      repositoryPath:
        'src/app/(site)/practica/ielts/reading/tipos-de-preguntas/table-completion/page.tsx',
      accessedAt: '2026-08-11',
      note:
        'La ruta informativa evalúa los registros de la versión remediada en el servidor y no entrega los pasajes, preguntas ni claves mientras cualquiera permanezca inelegible.',
    },
    {
      id: 'ielts-table-completion-academic-module-declaration',
      kind: 'module-declaration',
      label: 'WeLearn declaration of the Academic Reading Table Completion module',
      repositoryPath: 'src/lib/ielts/academic-reading-question-types.ts',
      accessedAt: '2026-08-11',
      note:
        'Declara la ruta como práctica de IELTS Academic Reading para el tipo oficial 9. No implica aval de IELTS ni valida el banco.',
    },
    {
      id: 'welearn-table-completion-publication-attestation',
      kind: 'license-document',
      label: 'WeLearn authorized-representative publication attestation',
      repositoryPath: 'docs/ielts-table-completion-publication-attestation-2026-08-11.md',
      accessedAt: '2026-08-11',
      note:
        'El representante autorizado confirma el derecho de WeLearn a publicar y explotar los tres pasajes v2 y autoriza exclusivamente su publicación como práctica guiada.',
    },
    {
      id: 'table-cooling-yourhome-passive',
      kind: 'factual-source',
      label: 'Australian Government — Passive cooling',
      url: 'https://www.yourhome.gov.au/passive-design/passive-cooling',
      accessedAt: '2026-08-11',
      note:
        'Fuente gubernamental candidata sobre ventilación, diseño pasivo y reducción de ganancias térmicas. No implica que la refrigeración mecánica nunca sea necesaria ni valida por sí sola todo el pasaje.',
    },
    {
      id: 'table-cooling-yourhome-thermal-mass',
      kind: 'factual-source',
      label: 'Australian Government — Thermal mass',
      url: 'https://www.yourhome.gov.au/passive-design/thermal-mass',
      accessedAt: '2026-08-11',
      note:
        'Fuente gubernamental candidata sobre absorción diurna y descarga nocturna de calor. El rendimiento depende de clima, sombra, ventilación y rango térmico.',
    },
    {
      id: 'table-cooling-yourhome-shading',
      kind: 'factual-source',
      label: 'Australian Government — Shading',
      url: 'https://www.yourhome.gov.au/passive-design/shading',
      accessedAt: '2026-08-11',
      note:
        'Fuente gubernamental candidata sobre orientación solar y sombreado exterior. No convierte una formulación simplificada sobre el vidrio en una regla universal.',
    },
    {
      id: 'table-cooling-newham-external-shading',
      kind: 'factual-source',
      label: 'London Borough of Newham — Overheating guidance',
      url: 'https://www.newham.gov.uk/downloads/file/5380/newham-climate-change-guidance-and-topic-paper-part-3-overheating',
      accessedAt: '2026-08-11',
      note:
        'Guía municipal candidata sobre control solar y sombreado externo. No demuestra la eficacia de cualquier diseño ni concede derechos sobre la redacción WeLearn.',
    },
    {
      id: 'table-rain-epa-types',
      kind: 'factual-source',
      label: 'US EPA — Types of Green Infrastructure',
      url: 'https://www.epa.gov/green-infrastructure/types-green-infrastructure',
      accessedAt: '2026-08-11',
      note:
        'Fuente oficial candidata sobre rain gardens y bioretention. Distingue variantes técnicas y no prueba que todo sistema infiltre toda el agua recibida.',
    },
    {
      id: 'table-rain-epa-brochure',
      kind: 'factual-source',
      label: 'US EPA — What Is a Rain Garden?',
      url: 'https://cfpub.epa.gov/npstbx/files/cwc_raingardenbrochure.pdf',
      accessedAt: '2026-08-11',
      note:
        'Material EPA candidato sobre áreas plantadas, retención temporal e infiltración. No convierte resultados dependientes del sitio en garantías universales.',
    },
    {
      id: 'table-rain-usda-drainage',
      kind: 'factual-source',
      label: 'USDA NRCS — Home Drainage Guide',
      url: 'https://www.nrcs.usda.gov/sites/default/files/2024-07/Home_Drainage_Guide.v25.pdf',
      accessedAt: '2026-08-11',
      note:
        'Guía oficial candidata sobre ubicación, drenaje y suelos húmedos. La pudrición y el rendimiento dependen de especie, suelo, oxígeno y duración.',
    },
    {
      id: 'table-rain-psu-introduction',
      kind: 'factual-source',
      label: 'Penn State Extension — An Introduction to Rain Gardens',
      url: 'https://extension.psu.edu/an-introduction-to-rain-gardens',
      accessedAt: '2026-08-11',
      note:
        'Fuente universitaria candidata sobre selección de plantas y ciclos húmedo-seco. Native no garantiza por sí solo raíces profundas ni adecuación al sitio.',
    },
    {
      id: 'table-rain-epa-school-learning',
      kind: 'factual-source',
      label: 'US EPA — Teacher Resources',
      url: 'https://archive.epa.gov/students/web/html/teachers.html',
      accessedAt: '2026-08-11',
      note:
        'Archivo EPA candidato con recursos escolares y ambientales. No cuantifica que las escuelas usen rain gardens “often” como aula exterior.',
    },
    {
      id: 'table-museum-nps-records',
      kind: 'factual-source',
      label: 'US National Park Service — Museum Handbook Part II',
      url: 'https://www.nps.gov/subjects/museums/mh2.htm',
      accessedAt: '2026-08-11',
      note:
        'Manual oficial candidato sobre registros, catalogación y responsabilidad documental. No prescribe la tríada exacta de entrevistas, labels y catálogos del pasaje.',
    },
    {
      id: 'table-museum-collections-trust',
      kind: 'factual-source',
      label: 'Collections Trust — Cataloguing procedure',
      url: 'https://collectionstrust.org.uk/resource/cataloguing-suggested-procedure/',
      accessedAt: '2026-08-11',
      note:
        'Guía sectorial candidata sobre catalogación, fuentes y transparencia de incertidumbre. Los mínimos y esquemas varían entre instituciones.',
    },
    {
      id: 'table-museum-canada-small',
      kind: 'factual-source',
      label: 'Government of Canada — Capture Your Collections, Small Museum Version',
      url: 'https://www.canada.ca/en/heritage-information-network/services/digitization/capture-collections-small-museum.html',
      accessedAt: '2026-08-11',
      note:
        'Guía gubernamental candidata que separa captura, metadatos y gestión. No convierte “why it matters” en campo obligatorio universal.',
    },
    {
      id: 'table-museum-nps-photography',
      kind: 'factual-source',
      label: 'US National Park Service — Museum photography',
      url: 'https://www.nps.gov/subjects/museums/upload/MHII_AppK_Photography-2.pdf',
      accessedAt: '2026-08-11',
      note:
        'Manual oficial candidato sobre fotografía consistente, fondos, escala y manejo. No valida por sí solo todos los controles de publicación narrados.',
    },
    {
      id: 'table-museum-loc-preservation',
      kind: 'factual-source',
      label: 'Library of Congress — Reformatting and digitizing FAQ',
      url: 'https://www.loc.gov/preservation/about/faqs/reformatting.html',
      accessedAt: '2026-08-11',
      note:
        'Fuente institucional candidata sobre digitalización y preservación. No establece una regla universal de revisión por trained staff para todo registro voluntario.',
    },
  ],
  entries: [
    quarantinedSetOneRecord({
      assetId: 'mock:set-1:reading-part-5',
      sourceObjectSha256: '51bfb1a6a110ed1cb09211aab48d533026c6d87992de3a6c45bff267e5ecdb56',
      passageSha256: 'f1800a80933cf687f5fd27c9f7176c9db92a8128783b87b6c17c44a3a8f6199e',
      observedWorkTitle: 'Bakelite',
      evidenceIds: ['external-cambridge-5-test-2-sequence'],
    }),
    quarantinedSetOneRecord({
      assetId: 'mock:set-1:reading-part-6',
      sourceObjectSha256: 'df93c358fb8c79c806d5537f5d8cd99379e5815f90433d4c158f0015e799a2a8',
      passageSha256: '2de952fc362533e1c006d05737840c99eea546079f78f1f87f51beb9b8f3684f',
      observedWorkTitle: 'What’s so funny?',
      evidenceIds: ['external-cambridge-5-test-2-sequence'],
    }),
    quarantinedSetOneRecord({
      assetId: 'mock:set-1:reading-part-7',
      sourceObjectSha256: 'cbcff7fc3583ddb6bbccd3828f361f3ed6ce094f1b7352eb3c8e53b5ceb9cf97',
      passageSha256: 'abc4c678cfe569e824db64cb821daf4c49b01c775175dac0162c9db51a5019bc',
      observedWorkTitle: 'The Birth of Scientific English',
      evidenceIds: [
        'external-cambridge-5-test-2-sequence',
        'external-birth-scientific-english',
      ],
    }),
    quarantinedFormativeMultipleChoiceRecord({
      assetId: 'formative:multiple-choice:mc-sleep-learning',
      sourceObjectSha256: '8070aae114aa34083b349fa810d547af6cf58d176df75f77e217681a83f4e91f',
      passageSha256: 'a7762787b2602930b5df81974ca2c5c658c3877c9a9843c0e25a4a90e11bc13c',
      observedWorkTitle: 'Sleep and learning',
      factualSourceEvidenceIds: [
        'sleep-cairney-sws-emotional-2014',
        'sleep-rem-sws-emotional-2025',
        'sleep-deprivation-students-2017',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan que sueño y memoria se relacionan, pero muestran resultados dependientes de etapa, tarea y diseño. Falta una fuente primaria que corresponda al estudio de pares de palabras descrito y una revisión humana claim-by-claim.',
    }),
    quarantinedFormativeMultipleChoiceRecord({
      assetId: 'formative:multiple-choice:mc-river-restoration',
      sourceObjectSha256: 'f44a635695ddbd5da41b0867acb404cd557247e33c14679e462541b86f1b5469',
      passageSha256: '3e16760822406856be93e5f821bc0409f91bf05007bb57908b6294b2b382d35e',
      observedWorkTitle: 'River restoration in industrial towns',
      factualSourceEvidenceIds: [
        'river-environment-agency-2024',
        'river-skerne-case-study',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes institucionales apoyan principios generales de restauración, hábitat y resiliencia, pero no identifican “Millgate” ni verifican sus cifras, encuestas, loading bays o cafés. El caso debe documentarse como ficticio o sustituirse por un caso trazable antes de aprobación.',
    }),
    quarantinedFormativeMultipleChoiceRecord({
      assetId: 'formative:multiple-choice:mc-digital-notes',
      sourceObjectSha256: 'b3510e65794dae07e473b89839115fe272244cee0a7ab7deae3291375f0bda20',
      passageSha256: '7f0a8cff97dbee095a78e83e1ae8fbdcb6b671e87b57cd9f52646a437496742d',
      observedWorkTitle: 'Digital notes and memory',
      factualSourceEvidenceIds: [
        'notes-mueller-oppenheimer-2014',
        'notes-mitchell-zheng-2019-replication',
        'notes-medical-students-no-difference-2022',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. El pasaje refleja razonablemente un debate no resuelto, pero debe atribuir el estudio original y conservar el matiz aportado por replicaciones y resultados nulos. No hay revisión humana claim-by-claim.',
    }),
    quarantinedFormativeTfngRecord({
      assetId: 'formative:true-false-not-given:tfng-set-urban-trees',
      sourceObjectSha256: 'a9218541f32e3423ae4cedfad35784679f481e7f281ad79a50fa005d11b0e214',
      passageSha256: '91f3be3364e010290f0af8d4b1d07a655fa7ea5e710576b6f0a92128e2fd40a4',
      observedWorkTitle: 'Urban trees and heat risk',
      factualSourceEvidenceIds: [
        'urban-epa-heat-island',
        'urban-usfs-canopy-inequality-2021',
        'urban-usfs-assessment-management-2018',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan enfriamiento por sombra/transpiración, desigualdad de canopy y necesidad de planificación, pero no validan cada generalización histórica, geográfica o de implementación del pasaje. Falta revisión humana claim-by-claim.',
    }),
    quarantinedFormativeTfngRecord({
      assetId: 'formative:true-false-not-given:tfng-set-school-libraries',
      sourceObjectSha256: 'd672bb4a7732a959ba7a304993e935bf0f64a25465eda44286778ccd2f6d9878',
      passageSha256: '45db7a8749e7ee355f8125c26c76d91faa5e8c67c213d03a194306cf91fab344',
      observedWorkTitle: 'School libraries after class',
      factualSourceEvidenceIds: [
        'school-govuk-extended-day-case',
        'school-southwark-homework-clubs',
      ],
      factualLimitation:
        'Las fuentes candidatas demuestran que existen espacios y clubes after-school con apoyo y voluntariado, pero no identifican el programa descrito, sus términos, supervisores, attendance records, board decision ni patrones por edad. El caso debe documentarse como sintético/composite o sustituirse por uno trazable.',
    }),
    quarantinedFormativeTfngRecord({
      assetId: 'formative:true-false-not-given:tfng-set-coastal-paths',
      sourceObjectSha256: '8e528d9d0e9f0dc1cef8a003cd96b76bdd0100c935e47cbb9da140c130cc5bd7',
      passageSha256: '35e904d378e8e819049cf1d026b9b1e83dc45e1d164f8e15e91ebfb5a2f9b225',
      observedWorkTitle: 'Coastal walking paths',
      factualSourceEvidenceIds: [
        'coastal-earnse-bay-storm-2024',
        'coastal-natural-england-dorset-2025',
        'coastal-dune-management-govuk',
      ],
      factualLimitation:
        'Las fuentes candidatas respaldan tormentas, roll-back inland, señalización y manejo de dunas, pero no identifican la ciudad ni verifican longitud, footfall, viewing points, fencing, seasonal notices o maintenance costs. El caso debe declararse sintético/composite o reemplazarse por un caso trazable.',
    }),
    quarantinedFormativeYnngRecord({
      assetId: 'formative:yes-no-not-given:ynng-station-art',
      sourceObjectSha256: '1fe59c7e1fad1d831a4fa08a7dfa302d7b1bd37005884bf77ce1b9b379abf680',
      passageSha256: '13d655a77274b4fa20bbc39e558395d3db455f46043ff23ca2e122b2bb237f0a',
      observedWorkTitle: 'Public art in transport stations',
      factualSourceEvidenceIds: [
        'station-lta-gift-art',
        'station-opdc-community-brief',
      ],
      factualLimitation:
        'Las fuentes candidatas muestran programas de arte en transporte, conexión local, participación comunitaria, wayfinding y límites prácticos, pero no verifican que proyectos modestos generen más confianza ni que el criterio normativo del pasaje sea empíricamente generalizable.',
    }),
    quarantinedFormativeYnngRecord({
      assetId: 'formative:yes-no-not-given:ynng-remote-work',
      sourceObjectSha256: '5a21449c9d3e9dd7e93d30a3c216d088f89c1fbd011439067aa45827d41ec772',
      passageSha256: '0a88ab17c6741765c43344c80b3543e4add8309cefea1c7ebc674d1364795a78',
      observedWorkTitle: 'Why city centres still need office workers',
      factualSourceEvidenceIds: [
        'remote-ons-hybrid-2025',
        'remote-london-assembly-central-2024',
        'remote-ecb-work-preference-2025',
      ],
      factualLimitation:
        'Las fuentes candidatas documentan trabajo híbrido persistente, preferencia por modelos híbridos y efectos que autoridades monitorizan sobre footfall y gasto; no prueban que dos o tres días comunes sean la mejor solución universal ni cada causalidad del ensayo.',
    }),
    quarantinedFormativeYnngRecord({
      assetId: 'formative:yes-no-not-given:ynng-school-uniforms',
      sourceObjectSha256: '2ad9bf267d022a21725a714a100c3956bda28932183daf210400fce5cddccf0a',
      passageSha256: '21d4fa469e99313439dc5ac41a8fd28683d70d058314be4be57376be11e8cdee',
      observedWorkTitle: 'A careful argument about school uniforms',
      factualSourceEvidenceIds: [
        'uniforms-dfe-policy-2026',
        'uniforms-dfe-cost-2026',
        'uniforms-cma-costs',
      ],
      factualLimitation:
        'Las fuentes candidatas sustentan que coste, proveedor, consulta, flexibilidad y aplicación no discriminatoria importan, pero no verifican que los uniformes reduzcan competencia visible ni todas las comparaciones sociales del pasaje.',
    }),
    quarantinedFormativeMatchingInformationRecord({
      assetId: 'formative:matching-information:mi-city-noise',
      sourceObjectSha256: '4dedd37f4422d13c2d7f2e8ed948820849d92987cc5bdce84350ecee344ded62',
      passageSha256: 'b85fe921aedbd48f035d1bdd764bc033b5af62a2b5f1af4dab6d994af0b93bc1',
      observedWorkTitle: 'How cities respond to noise',
      factualSourceEvidenceIds: [
        'noise-who-environmental-guidance',
        'noise-ec-environmental-noise-directive',
        'noise-who-health-inequalities',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan riesgos sanitarios, cartografía, información pública y desigualdad socioeconómica, pero no verifican el street-canyon example, el efecto de cada medida ni todas las relaciones causales del pasaje.',
    }),
    quarantinedFormativeMatchingInformationRecord({
      assetId: 'formative:matching-information:mi-museum-lighting',
      sourceObjectSha256: 'f68ddab75ce213fcf42bb1b0f815138e25fad5218bedd135f74758d970b51280',
      passageSha256: '26799b69ea658d6268841c5d3ea29a408a93d5e459de8beaa49952c6e89db211',
      observedWorkTitle: 'Lighting in modern museums',
      factualSourceEvidenceIds: [
        'museum-cci-light-deterioration',
        'museum-cci-textiles-light',
        'museum-smithsonian-accessible-lighting',
      ],
      factualLimitation:
        'Las fuentes candidatas respaldan daño acumulativo, sensibilidad de papel/textiles, exposición limitada, luces activadas por visitantes y seguridad de rutas; no validan cada comparación con piedra ni una solución universal de iluminación.',
    }),
    quarantinedFormativeMatchingInformationRecord({
      assetId: 'formative:matching-information:mi-coastal-restoration',
      sourceObjectSha256: 'c2e06a4c723bfd321924f9e2961937b494280c8edd55ab9658e3775284b467d7',
      passageSha256: '9510b6698b7e693561945516c8ff49a6abbf965e7ad1324017abcbfc373c6947',
      observedWorkTitle: 'Restoring coastal wetlands',
      factualSourceEvidenceIds: [
        'wetlands-noaa-coastal-resiliency',
        'wetlands-noaa-estuary-restoration-act',
        'wetlands-noaa-restoration-monitoring',
      ],
      factualLimitation:
        'Las fuentes candidatas respaldan resiliencia, hábitat, restauración hidrológica y monitoreo a largo plazo, pero no verifican cada secuencia histórica, conflicto comunitario, indicador específico ni la combinación exacta con sea walls del pasaje.',
    }),
    quarantinedFormativeMatchingHeadingsRecord({
      assetId: 'formative:matching-headings:mh-public-libraries',
      sourceObjectSha256: '9e99d0518d90a6a64fc622a49cc293a2966aa17ac59142685b0e8bdb266eb918',
      passageSha256: 'e1b63291ae9e2ed99efb145d5a6322a17532b207fd7a4caf18ad4d2a9238955a',
      observedWorkTitle: 'The changing role of public libraries',
      factualSourceEvidenceIds: [
        'libraries-gla-civic-spaces',
        'libraries-ala-digital-literacy',
        'libraries-imls-making',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan funciones cívicas, alfabetización digital y makerspaces, pero no verifican cada secuencia histórica, alcance del servicio ni efecto comunitario del pasaje.',
    }),
    quarantinedFormativeMatchingHeadingsRecord({
      assetId: 'formative:matching-headings:mh-urban-farming',
      sourceObjectSha256: 'd8505ea0480be939eade2759c1b8536201346219f6817e092f2c7712845564eb',
      passageSha256: '00d5dfbda4a92ff0c9e18d445dde1517d5d9ffce37341e6a3d9a960b374b4019',
      observedWorkTitle: 'Urban farming beyond fresh food',
      factualSourceEvidenceIds: [
        'urban-epa-brownfields-agriculture',
        'urban-usda-school-gardens',
        'urban-fao-healthy-soils',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan evaluación de suelo, jardines escolares y salud del suelo urbano, pero no verifican todos los beneficios, restricciones ni relaciones causales del pasaje.',
    }),
    quarantinedFormativeMatchingHeadingsRecord({
      assetId: 'formative:matching-headings:mh-night-trains',
      sourceObjectSha256: '6c77fe0e8e219f2cf1a674244d40f9a864e7c3d84e0300450dbb6d36a622e08d',
      passageSha256: '6336810444e52bbd62f2d9b17d344aeb4e0d01be6aae774ff6a369bdce1b277d',
      observedWorkTitle: 'The return of night trains',
      factualSourceEvidenceIds: [
        'night-eea-rail-low-carbon',
        'night-eu-cross-border-rail',
        'night-era-sleeper-authorisation',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan ventajas relativas de emisiones, barreras transfronterizas y renovada autorización de coches cama, pero no verifican cada tendencia comercial, causa ni comparación del pasaje.',
    }),
    quarantinedFormativeMatchingFeaturesRecord({
      assetId: 'formative:matching-features:mf-urban-farming',
      sourceObjectSha256: '94fcc6b7c50c8ab6d433890bf4d9b6e0155cb5519203d3e89aa70362346aa68d',
      passageSha256: 'c7923d205c2f2bcaeb9bd28724d37bdaeb69f774ce6447bcfaad4e165d12937e',
      observedWorkTitle: 'Different approaches to urban farming',
      factualSourceEvidenceIds: [
        'urban-nyc-rooftop-farm',
        'urban-doe-controlled-environment-agriculture',
        'urban-usda-school-gardens',
        'urban-epa-vacant-land-agriculture',
        'urban-usda-cea-energy',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas permiten contrastar agricultura en azoteas, producción controlada, huertos escolares, lotes vacantes y costes técnicos, pero no acreditan las entidades nombradas ni verifican todos los resultados, clientes, acuerdos o relaciones causales del pasaje.',
    }),
    quarantinedFormativeMatchingFeaturesRecord({
      assetId: 'formative:matching-features:mf-memory-research',
      sourceObjectSha256: 'c88f5a60dc24c9ce76a773055168b14f496321f720e215401053fc22bba6a36d',
      passageSha256: 'd75a32a55a1430590620c682a941f68e09f5d41a06bc53103934f5bf2f9c34c9',
      observedWorkTitle: 'Different approaches to studying memory',
      factualSourceEvidenceIds: [
        'memory-pubmed-route-decisions',
        'memory-goodwin-cowitness',
        'memory-nia-external-aids',
        'memory-pmc-sleep-vocabulary',
        'memory-plos-open-book',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas permiten contrastar decisiones espaciales, misinformation social, ayudas externas, sueño y pruebas con apuntes, pero no acreditan a Helen Ward, Moreno Lab, Kenji Sato, Sleep Recall Study u Open Notes Group ni los protocolos y efectos exactos atribuidos.',
    }),
    quarantinedFormativeMatchingFeaturesRecord({
      assetId: 'formative:matching-features:mf-transport-policies',
      sourceObjectSha256: '2b101575e9c524ab47060bdd6266b6d46138502be62b5aea708672eeb226e7b4',
      passageSha256: '769eba354fabc78b677e52b719effcc078faf7de7a146b4170dfdec6791f409c',
      observedWorkTitle: 'City transport policies with different goals',
      factualSourceEvidenceIds: [
        'transport-tfl-bus-priority',
        'transport-who-safe-speeds',
        'transport-uk-maas-accessibility',
        'transport-doe-smart-charge',
        'transport-nyc-pedestrian-plaza',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas permiten contrastar prioridad de buses, velocidad segura, integración modal, carga de flotas y peatonalización, pero no acreditan los cinco programas nombrados ni sus corredores, cifras, quejas, fases, consultas o resultados exactos.',
    }),
    quarantinedFormativeMatchingSentenceEndingsRecord({
      assetId: 'formative:matching-sentence-endings:mse-microclimates',
      sourceObjectSha256: '932ccefb0130c9fb9fa030f3eee1e21948efcb4da58ed537fde24049fae21f05',
      passageSha256: 'ac2396cf723727f640ba86eb44f7becb08ab829777aedc08632f8ea8af18318e',
      observedWorkTitle: 'How small design choices change city heat',
      factualSourceEvidenceIds: [
        'micro-epa-within-city-hotspots',
        'micro-epa-cool-pavements',
        'micro-epa-tree-shade',
        'micro-city-london-wind-guidelines',
        'micro-noaa-transit-shade-study',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan hotspots intraurbanos, pavimentos, sombra, estudios de viento y exposición térmica en transporte, pero no verifican todas las comparaciones de ubicación, secuencias temporales, superlativos ni relaciones causales exactas del pasaje.',
    }),
    quarantinedFormativeMatchingSentenceEndingsRecord({
      assetId: 'formative:matching-sentence-endings:mse-food-waste',
      sourceObjectSha256: '1682b3ff5b6fac272eb80a77d5cecda5307d98d24a690c912f19a42afcc92aa4',
      passageSha256: '3c0f8568ccb8244132db25509b08180bc0b6d97e88a0182c61f92502bb8332e9',
      observedWorkTitle: 'Why food waste policies need more than one solution',
      factualSourceEvidenceIds: [
        'food-usda-farm-market-loss',
        'food-springer-grocery-holiday-forecasting',
        'food-frontiers-imperfect-produce-cues',
        'food-fda-donation-safety',
        'food-epa-wasted-food-scale',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan pérdidas por incentivos de mercado, previsión minorista, señales para productos imperfectos, seguridad en donación y jerarquías de gestión, pero no acreditan las implementaciones, combinaciones de insumos, resultados o generalizaciones exactas del pasaje.',
    }),
    quarantinedFormativeMatchingSentenceEndingsRecord({
      assetId: 'formative:matching-sentence-endings:mse-coastal-libraries',
      sourceObjectSha256: '87e771a35de1ad2b132f30a3c61abaf60471fdd0636034d977376d6aed05ebad',
      passageSha256: '50fff086a9cf78142f742a48679aa252e2d8a680e107d26d6fb9b078d00b29bb',
      observedWorkTitle: 'Libraries as climate information hubs',
      factualSourceEvidenceIds: [
        'coastal-ala-resilience-hubs',
        'coastal-imls-trusted-libraries',
        'coastal-noaa-flood-map-workshops',
        'coastal-noaa-participatory-flood-mapping',
        'coastal-fema-community-information-sharing',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan bibliotecas como recursos de confianza, resilience hubs, talleres con mapas, mapeo participativo e intercambio de información, pero no acreditan los concejos, Harbor Point, prácticas, resultados o ranking de valor exactos del pasaje.',
    }),
    quarantinedFormativeSentenceCompletionRecord({
      assetId: 'formative:sentence-completion:sentence-wetland-parks',
      sourceObjectSha256: '42f7976e179acf1b8afec86285530ad9b5a5a26aba13ca89c7ad82c86bbf22db',
      passageSha256: 'f1f74d465074ba9570c9c4cbb381538a4b0f38c16251930c4d90f2126d14e1a8',
      observedWorkTitle: 'Wetland parks and urban flood control',
      factualSourceEvidenceIds: [
        'wetland-epa-about-green-infrastructure',
        'wetland-epa-mitigate-flooding',
        'wetland-epa-wetland-functions',
        'wetland-epa-pond-wetland-maintenance',
        'wetland-uk-blockage-management',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan almacenamiento e infiltración de lluvia, alivio de redes, hábitat y mantenimiento, pero varios apoyos corresponden a infraestructura verde o humedales en general. No verifican que todo parque produzca cada efecto ni la formulación exacta sobre niveles de agua. Disponibilidad o respuesta HTTP no verifica hechos, autoría, derechos ni licencia; falta revisión humana claim-by-claim.',
    }),
    quarantinedFormativeSentenceCompletionRecord({
      assetId: 'formative:sentence-completion:sentence-library-makerspaces',
      sourceObjectSha256: '8f2b278d1b180a17a78f9aa3057364ebf3a8e401ff6b3b529ac109f8936da6bc',
      passageSha256: 'e13b68261fc5b2e3c3488ffbb2f920710954d7959d744d0deb24b572edd7b5db',
      observedWorkTitle: 'Library makerspaces and practical learning',
      factualSourceEvidenceIds: [
        'makers-ala-libraries-build-business',
        'makers-australian-public-libraries-study',
        'makers-public-library-coach-study',
        'makers-imls-community-needs',
        'makers-wheaton-noise-zones',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan ejemplos de equipos, el giro de consumo a creación, la importancia de coaches, necesidades comunitarias y zonas de ruido, pero no verifican prevalencia, works best, realistic first projects, equipo costoso sin uso ni el superlativo successful. Algunos accesos fueron limitados. Disponibilidad o indexación no verifica hechos, autoría, derechos ni licencia; falta revisión humana claim-by-claim.',
    }),
    quarantinedFormativeSentenceCompletionRecord({
      assetId: 'formative:sentence-completion:sentence-night-markets',
      sourceObjectSha256: 'b0434ae0c3ed919b06a0c256586f1753d299b260bbe5aa34c2813ed788622ff3',
      passageSha256: '612893d0f0aabbd88a9b75699523b67530744c3402dfe051e0f4197d7657ff1c',
      observedWorkTitle: 'Night markets and local economies',
      factualSourceEvidenceIds: [
        'night-naga-ordinance',
        'night-bromley-test-trading',
        'night-primary-built-environment-accessibility',
        'night-maidstone-street-trading-policy',
        'night-hackney-market-metrics-costs',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan cierre temporal de calles, prueba comercial, accesibilidad, controles de nuisance y algunas métricas/costes, pero no verifican el lighting plan, las comparaciones exactas, la cadena causal, la frecuencia after each event ni los superlativos del pasaje. Algunos accesos fueron limitados. Disponibilidad o indexación no verifica hechos, autoría, derechos ni licencia; falta revisión humana claim-by-claim.',
    }),
    quarantinedFormativeSummaryCompletionRecord({
      assetId: 'formative:summary-completion:summary-urban-farms',
      sourceObjectSha256: 'f10464976342bfef4607a46ba77d611310ffd7cabeae7c9949bd78a100d93640',
      passageSha256: '71854aeab48ed3c297f05b2c6c5f3ce081c4febe7e8799d61ece40364f84e80e',
      observedWorkTitle: 'Rooftop farms in modern cities',
      factualSourceEvidenceIds: [
        'urban-fao-upa-short-supply-chains',
        'urban-nps-green-roof-structural-load',
        'urban-nyc-green-roof-requirements',
        'urban-epa-rainwater-potable-demand',
        'urban-usda-cornell-agriculture-education',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan cadenas cortas, cargas estructurales, requisitos de techos verdes, menor demanda de agua potable y ejemplos educativos, pero no verifican escala, cultivos, clientes, todos los efectos ni la afirmación combinada sobre suelo ligero e irrigación. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedFormativeSummaryCompletionRecord({
      assetId: 'formative:summary-completion:summary-repair-cafes',
      sourceObjectSha256: '1d4de4d085159c2cb86336bc9f7277d39f26e1ab4d5ff3a4eac0c4a5ff03f2c4',
      passageSha256: 'd335aea3d71ba26b7fa484f697a5b73b9bc4745937ca0d8dd60c18582f88e4ca',
      observedWorkTitle: 'Community repair cafes',
      factualSourceEvidenceIds: [
        'repair-cafe-official-about',
        'repair-cafe-official-house-rules',
        'repair-cafe-official-faq',
        'repair-cafe-official-foundation',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes primarias respaldan el aprendizaje, la ayuda de especialistas, reglas de participación, piezas pequeñas y cohesión social, pero no acreditan el origen plural, la práctica universal de permanecer, una comprobación previa sistemática, el requisito eléctrico only ni los grupos y efectos exactos. Copyright y marca no equivalen a licencia para WeLearn.',
    }),
    quarantinedFormativeSummaryCompletionRecord({
      assetId: 'formative:summary-completion:summary-shade-mapping',
      sourceObjectSha256: '1321f00ec9e13f803a18a8582c40aad5398dd1ea73dd04eb552d6a1eec5e0230',
      passageSha256: '663aa18c9170a448f562bcfe4d3b10d70494198020800995dd978dfc07a97307',
      observedWorkTitle: 'Mapping shade in hot cities',
      factualSourceEvidenceIds: [
        'shade-nasa-extreme-weather-frequency',
        'shade-epa-climate-indicators-2024',
        'shade-ut-austin-satellite-ground-mapping',
        'shade-rmit-shadeways-routes',
        'shade-phoenix-action-plan',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan tendencias de calor, distinción entre exposición y sensibilidad, combinación satélite/sensores y priorización de sombra, pero no un flujo universal, percepción de longitud, several blocks, mecanismos idénticos para grupos ni beneficios cuantificados. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedFormativeNoteCompletionRecord({
      assetId: 'formative:note-completion:note-mobile-libraries',
      sourceObjectSha256: '8d64253dbba9480da1cb9de4082bbf4c7bbee221fc17f748e9f9ddaeadb8ea3f',
      passageSha256: 'c22dfef22bc06bd72409d3952715faee8ade98a21f9a019384b0a3c46b6fb343',
      observedWorkTitle: 'Mobile libraries and community reading',
      factualSourceEvidenceIds: [
        'note-mobile-nsw-outreach-report',
        'note-mobile-wingecarribee-timetable',
        'note-mobile-derbyshire-village-hall-stops',
        'note-mobile-nsw-library-partnerships',
        'note-mobile-australia-public-library-guidelines',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan casos de outreach, horarios, paradas, costes y alianzas, pero no verifican market days, la comparación “as much as”, el conjunto exacto de destinos o una cadena causal universal. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedFormativeNoteCompletionRecord({
      assetId: 'formative:note-completion:note-seed-banks',
      sourceObjectSha256: 'f67761984beb116c7f80dbc9f8807b976a79dda2a2890fdc9b926c8815c438ff',
      passageSha256: 'e754e89bcb82bc8f9655028851c8696014be32fcbcd8007f6faf2b245ee38709',
      observedWorkTitle: 'Community seed banks',
      factualSourceEvidenceIds: [
        'note-seed-fao-borrow-return',
        'note-seed-cgiar-community-adaptation',
        'note-seed-croptrust-registration',
        'note-seed-fao-storage',
        'note-seed-fao-viability-regeneration',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan préstamo y devolución, adaptación local, documentación, almacenamiento y pruebas de germinación, pero no verifican cada geografía, rasgo, actor o práctica como universal de todo community seed bank. Disponibilidad no prueba autoría, licencia ni revisión humana.',
    }),
    quarantinedFormativeNoteCompletionRecord({
      assetId: 'formative:note-completion:note-night-libraries',
      sourceObjectSha256: 'e77d5edaaaefd183affe68194bf95ad7cd6696cdbecc1148b7281c46c8f46ccd',
      passageSha256: 'c7d601de88b071a6061fa7b20ebb292656934f2e1808f0a9d69809a1f16df218',
      observedWorkTitle: 'Night study spaces in public libraries',
      factualSourceEvidenceIds: [
        'note-night-tasmania-open-library-trial',
        'note-night-nsw-extended-study-hours',
        'note-night-albany-after-hours-study',
        'note-night-kuringgai-foyer',
        'note-night-ryde-opening-trial',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan ejemplos de acceso extendido, espacios de estudio, seguridad, servicios parciales, pruebas y permiso de guardianes, pero no verifican prevalencia, el bundle exacto, los conteos operativos ni cleaning staff. Disponibilidad no prueba autoría, licencia ni revisión humana.',
    }),
    quarantinedFormativeTableCompletionRecord({
      assetId: 'formative:table-completion:table-cooling-buildings',
      sourceObjectSha256: 'bbf741fdf9e92620e9491e0b4197558aefe99b2c12b9a6cf11e94da8330518bd',
      passageSha256: '4855b6c5fc0b048304b1746b7423c1973b3ef548176673ccbde2641d513e946c',
      observedWorkTitle: 'Passive cooling in public buildings',
      factualSourceEvidenceIds: [
        'table-cooling-yourhome-passive',
        'table-cooling-yourhome-thermal-mass',
        'table-cooling-yourhome-shading',
        'table-cooling-newham-external-shading',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan ventilación, masa térmica y sombreado, pero no convierten condiciones dependientes de clima, geometría y operación en reglas universales. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedFormativeTableCompletionRecord({
      assetId: 'formative:table-completion:table-rain-gardens',
      sourceObjectSha256: '23e079b4c30603c96b2ed16bd1f68f52ffc6850d5b780d3af8e29bd5047a70b9',
      passageSha256: 'b1dd317e09c2ef80e152284263acdb390ca86494e33a95d9dfc425c658ee140f',
      observedWorkTitle: 'Rain gardens in school grounds',
      factualSourceEvidenceIds: [
        'table-rain-epa-types',
        'table-rain-epa-brochure',
        'table-rain-usda-drainage',
        'table-rain-psu-introduction',
        'table-rain-epa-school-learning',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan retención, infiltración, criterios de ubicación y selección de plantas, pero no verifican resultados universales ni la prevalencia escolar expresada como “often”. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedFormativeTableCompletionRecord({
      assetId: 'formative:table-completion:table-museum-inventory',
      sourceObjectSha256: 'c7641b80b191b3bedd29a75df19bd1c39174b467e58947a817718d2d0b3fd069',
      passageSha256: 'f21af1a1f11c1f8b5d70b6f73b3f0113ee76d41de8e39dbe9914570b9e096e69',
      observedWorkTitle: 'Digitising small museum collections',
      factualSourceEvidenceIds: [
        'table-museum-nps-records',
        'table-museum-collections-trust',
        'table-museum-canada-small',
        'table-museum-nps-photography',
        'table-museum-loc-preservation',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan separación entre captura, catalogación, metadatos, transparencia y preservación, pero no verifican la tríada exacta de identificación ni una regla universal de revisión por trained staff antes de publicar. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedRemediatedTableCompletionRecord({
      assetId: 'formative:table-completion:table-cooling-buildings-v2',
      sourceObjectSha256: '79ae262670eb35e36b580f98a4118cfcee30bfad791d3fdd8df468fe0bd6e2c0',
      passageSha256: '4855b6c5fc0b048304b1746b7423c1973b3ef548176673ccbde2641d513e946c',
      observedWorkTitle: 'Passive cooling in public buildings',
      factualSourceEvidenceIds: [
        'table-cooling-yourhome-passive',
        'table-cooling-yourhome-thermal-mass',
        'table-cooling-yourhome-shading',
        'table-cooling-newham-external-shading',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan ventilación, masa térmica y sombreado, pero no convierten condiciones dependientes de clima, geometría y operación en reglas universales. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedRemediatedTableCompletionRecord({
      assetId: 'formative:table-completion:table-rain-gardens-v2',
      sourceObjectSha256: '3657ab4d2fd74e15f96f1bb3eaeb7c81f5d06589e61a50eb6b0fb45a27f4c33f',
      passageSha256: 'b1dd317e09c2ef80e152284263acdb390ca86494e33a95d9dfc425c658ee140f',
      observedWorkTitle: 'Rain gardens in school grounds',
      factualSourceEvidenceIds: [
        'table-rain-epa-types',
        'table-rain-epa-brochure',
        'table-rain-usda-drainage',
        'table-rain-psu-introduction',
        'table-rain-epa-school-learning',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan retención, infiltración, criterios de ubicación y selección de plantas, pero no verifican resultados universales ni la prevalencia escolar expresada como “often”. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
    quarantinedRemediatedTableCompletionRecord({
      assetId: 'formative:table-completion:table-museum-inventory-v2',
      sourceObjectSha256: '2baaf47342491d7b3080fa25c15acd3384c8adf42307efcfc71fb057fb288c3d',
      passageSha256: 'f6bd010f5ded5659fcbb1de9ebe26decad4692a5a37cbac1d4a9e55378b7f00f',
      observedWorkTitle: 'Digitising small museum collections',
      factualSourceEvidenceIds: [
        'table-museum-nps-records',
        'table-museum-collections-trust',
        'table-museum-canada-small',
        'table-museum-nps-photography',
        'table-museum-loc-preservation',
      ],
      factualLimitation:
        'Cobertura dirigida y parcial. Las fuentes candidatas respaldan separación entre captura, catalogación, metadatos, transparencia y preservación, pero no verifican la tríada exacta de identificación ni una regla universal de revisión por trained staff antes de publicar. Disponibilidad no prueba autoría, licencia, hechos ni revisión humana.',
    }),
  ],
} as const satisfies IeltsReadingRightsRegistry;
