import assert from 'node:assert/strict';
import test from 'node:test';

import {
  MEDICAL_AGENT_POLICY_VERSION,
  MEDICAL_AGENT_READINESS,
  MEDICAL_VERIFICATION_AGENTS,
  MEDICAL_VERIFICATION_EVAL_CASES,
  REQUIRED_MEDICAL_AGENT_IDS,
  createMedicalAgentInput,
  evaluateMedicalRelease,
} from '../src/data/medical-residency/index.ts';

const question = {
  schemaVersion: 1,
  id: 'synthetic-governance-001',
  revision: 1,
  status: 'draft',
  stem: 'Caso completamente sintético para probar el controlador.',
  leadIn: '¿Cuál opción satisface el contrato ficticio?',
  options: [
    { id: 'a', text: 'Opción A', rationale: 'Justificación sintética A.' },
    { id: 'b', text: 'Opción B', rationale: 'Justificación sintética B.' },
    { id: 'c', text: 'Opción C', rationale: 'Justificación sintética C.' },
    { id: 'd', text: 'Opción D', rationale: 'Justificación sintética D.' },
  ],
  correctOptionId: 'b',
  learningObjective: 'Probar gobernanza sin afirmar conocimiento médico.',
  clinicalPearl: 'Contenido sintético sin uso educativo clínico.',
  cognitiveTask: 'interpretation',
  taxonomy: {
    domain: 'synthetic',
    specialty: null,
    system: null,
    topic: 'governance',
    subtopic: null,
    population: null,
    careSetting: null,
  },
  blueprintMappings: [
    { university: 'ucaldas', blueprintVersion: 'ucaldas-2027.v1', officialDomainId: 'general-medicine' },
  ],
  sources: [
    {
      id: 'synthetic-source',
      institution: 'Fixture local',
      title: 'Fuente sintética de gobernanza',
      versionOrYear: '2026',
      urlOrDoi: 'https://example.invalid/synthetic',
      locator: 'fixture:1',
      accessedAt: '2026-08-28',
      sourceClass: 'standard-textbook',
    },
  ],
  review: {
    authorId: 'unassigned',
    clinicalReviewerId: null,
    sourceReviewerId: null,
    reviewedAt: null,
    nextReviewAt: null,
    originalityCheckedAt: null,
  },
  media: [],
  psychometrics: {
    editorialDifficulty: 1,
    observedDifficulty: null,
    discrimination: null,
    medianResponseSeconds: null,
    sampleSize: 0,
  },
};

const request = {
  reviewRunId: 'council-run-001',
  questionId: question.id,
  questionRevision: question.revision,
  questionDigest: 'question-sha256',
  sourceBundleDigest: 'sources-sha256',
  blueprintVersion: 'ucaldas-2027.v1',
  questionSnapshot: question,
  evidencePacket: [
    {
      sourceId: 'synthetic-source',
      sourceClass: 'standard-textbook',
      title: 'Fuente sintética de gobernanza',
      versionOrYear: '2026',
      jurisdiction: 'synthetic',
      locator: 'fixture:1',
      retrievedAt: '2026-08-28',
      snapshotSha256: 'source-snapshot-sha256',
      claimsExpected: ['claim-1'],
    },
  ],
  riskFlags: [],
  policyVersion: MEDICAL_AGENT_POLICY_VERSION,
  requestedAt: '2026-08-28T12:00:00.000Z',
};

function passingRuns() {
  return REQUIRED_MEDICAL_AGENT_IDS.map((agentId, index) => {
    const definition = MEDICAL_VERIFICATION_AGENTS.find((agent) => agent.id === agentId);
    assert.ok(definition);
    const clinical = agentId === 'clinical-solver-a' || agentId === 'clinical-adversary-b';

    return {
      runId: `run-${index + 1}`,
      questionId: request.questionId,
      questionRevision: request.questionRevision,
      questionDigest: request.questionDigest,
      sourceBundleDigest: request.sourceBundleDigest,
      agentId,
      agentVersion: definition.version,
      promptVersion: definition.promptVersion,
      promptSha256: `prompt-sha256-${index}`,
      modelProvider: 'synthetic-provider',
      modelId: 'synthetic-model',
      modelSnapshot: 'synthetic-model-2026-08-28',
      verdict: 'pass',
      proposedAnswerId: clinical ? 'b' : null,
      defensibleAlternativeIds: [],
      evidenceClaims: agentId === 'source-provenance'
        ? [{
            claimId: 'claim-1',
            status: 'supported',
            sourceId: 'synthetic-source',
            sourceSnapshotSha256: 'source-snapshot-sha256',
            locator: 'fixture:1',
            conciseReason: 'El fixture local respalda el claim sintético.',
          }]
        : [],
      findings: [],
      limitations: ['Fixture sin contenido clínico.'],
      conciseRationale: 'Salida sintética para probar la política.',
      traceIds: [`trace-${index + 1}`],
      startedAt: '2026-08-28T12:00:00.000Z',
      completedAt: '2026-08-28T12:00:01.000Z',
      inputTokens: 10,
      outputTokens: 10,
      costMicros: 1,
    };
  });
}

function humanAttestation(role, physicianId) {
  return {
    id: `attestation-${role}`,
    kind: 'clinical-signoff',
    actorKind: 'verified-human',
    role,
    physicianId,
    credentialVerificationId: `credential-${physicianId}`,
    credentialVerified: true,
    conflictOfInterestDeclared: true,
    questionDigest: request.questionDigest,
    sourceBundleDigest: request.sourceBundleDigest,
    decision: 'approved',
    signedAt: '2026-08-28T13:00:00.000Z',
  };
}

test('los agentes tienen roles versionados y ninguno puede firmar clínicamente', () => {
  assert.equal(MEDICAL_VERIFICATION_AGENTS.length, 7);
  assert.equal(REQUIRED_MEDICAL_AGENT_IDS.length, 6);
  assert.ok(MEDICAL_VERIFICATION_AGENTS.every((agent) => agent.mayIssueClinicalSignoff === false));
  assert.equal(MEDICAL_AGENT_READINESS.realClinicalContentAllowed, false);
});

test('los dos revisores clínicos reciben clave y racionales ocultos', () => {
  for (const agentId of ['clinical-solver-a', 'clinical-adversary-b']) {
    const input = createMedicalAgentInput(request, agentId);
    assert.equal(input.question.correctOptionId, null);
    assert.ok(input.question.options.every((option) => option.rationale === null));
    assert.equal('peerVerdicts' in input, false);
  }
});

test('la unanimidad automatizada queda bloqueada sin dos médicos humanos', () => {
  const result = evaluateMedicalRelease(request, passingRuns());
  assert.equal(result.decision, 'blocked-human-clinical-signoff');
  assert.match(result.reasons.join(' '), /dos médicos humanos/i);
});

test('un hallazgo crítico no se puede levantar por mayoría', () => {
  const runs = passingRuns();
  runs[1] = {
    ...runs[1],
    verdict: 'fail',
    findings: [{
      code: 'MED-DOSE-CRITICAL',
      severity: 'critical',
      message: 'Valor sintético inseguro.',
      remediation: 'Rehacer el fixture.',
      evidenceClaimIds: [],
    }],
  };

  assert.equal(evaluateMedicalRelease(request, runs).decision, 'revision-required');
});

test('otra respuesta defendible produce desacuerdo bloqueante', () => {
  const runs = passingRuns();
  runs[2] = { ...runs[2], defensibleAlternativeIds: ['c'] };
  assert.equal(evaluateMedicalRelease(request, runs).decision, 'blocked-agent-disagreement');
});

test('una edición posterior o una traza ausente invalida la revisión', () => {
  const staleRuns = passingRuns();
  staleRuns[0] = { ...staleRuns[0], questionDigest: 'old-question-sha256' };
  assert.equal(evaluateMedicalRelease(request, staleRuns).decision, 'blocked-machine-failure');

  const untraceableRuns = passingRuns();
  untraceableRuns[0] = { ...untraceableRuns[0], traceIds: [] };
  assert.equal(evaluateMedicalRelease(request, untraceableRuns).decision, 'blocked-machine-failure');
});

test('una clave fuera de las opciones falla antes de consultar criterio clínico', () => {
  const invalidQuestion = { ...question, correctOptionId: 'z' };
  const invalidRequest = { ...request, questionSnapshot: invalidQuestion };
  assert.equal(evaluateMedicalRelease(invalidRequest, passingRuns()).decision, 'blocked-machine-failure');
});

test('una bandera de alto riesgo exige el especialista condicional', () => {
  const riskyRequest = { ...request, riskFlags: ['dose-or-unit'] };
  assert.equal(evaluateMedicalRelease(riskyRequest, passingRuns()).decision, 'blocked-machine-failure');
});

test('solo dos médicos verificados y distintos habilitan el paso a piloto', () => {
  const samePerson = [
    humanAttestation('medical-author', 'physician-1'),
    humanAttestation('clinical-reviewer', 'physician-1'),
  ];
  assert.equal(
    evaluateMedicalRelease(request, passingRuns(), samePerson).decision,
    'blocked-human-clinical-signoff',
  );

  const distinctPeople = [
    humanAttestation('medical-author', 'physician-1'),
    humanAttestation('clinical-reviewer', 'physician-2'),
  ];
  assert.equal(evaluateMedicalRelease(request, passingRuns(), distinctPeople).decision, 'eligible-for-pilot');
});

test('una supuesta firma de IA no tiene autoridad', () => {
  const fakeAiAttestation = {
    ...humanAttestation('medical-author', 'agent-1'),
    actorKind: 'ai-agent',
  };
  assert.equal(
    evaluateMedicalRelease(request, passingRuns(), [fakeAiAttestation]).decision,
    'blocked-human-clinical-signoff',
  );
});

test('la matriz adversarial contiene 24 casos y ninguno espera publicación o piloto', () => {
  assert.equal(MEDICAL_VERIFICATION_EVAL_CASES.length, 24);
  assert.ok(MEDICAL_VERIFICATION_EVAL_CASES.some((item) => item.id === 'MED-E018'));
  assert.ok(MEDICAL_VERIFICATION_EVAL_CASES.every((item) => item.expectedDecision !== 'eligible-for-pilot'));
});
