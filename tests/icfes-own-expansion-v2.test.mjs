import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  REVIEW_ROLES,
  calculateIcfesCandidateDigest,
  sha256,
  validateCandidateState,
  validateExpansionSchema,
} from '../scripts/lib/icfes-own-expansion-core.mjs';

const manifest = JSON.parse(readFileSync('src/data/icfes/own-mock-expansion-manifest.json', 'utf8'));
const schema = JSON.parse(readFileSync('src/data/icfes/own-mock-expansion.schema.json', 'utf8'));

function sourceFixture() {
  let cursor = 0;
  return {
    id: 'mock-24',
    examSlug: 'icfes',
    title: 'Candidate fixture',
    sections: [1, 2, 3, 4, 5, 6, 7].map((part, index) => ({
      part,
      questions: Array.from({ length: index === 6 ? 9 : 6 }, () => {
        cursor += 1;
        return { id: `q${cursor}`, type: 'mcq', part, text: `Question ${cursor}`, options: ['A', 'B', 'C'], answer: 0 };
      }),
    })),
  };
}

function reviewedCandidate(state = 'in-review') {
  const source = sourceFixture();
  const candidate = {
    candidateId: 'mock-24-v1',
    mockId: 'mock-24',
    modulePath: 'src/data/mocks/icfes-mock-24.ts',
    route: '/examenes/icfes/practica/mock-24',
    contentVersion: '2026-09-12.1',
    contentHash: sha256(JSON.stringify(source)),
    candidateDigest: '',
    provenance: {
      status: 'verified', kind: 'welearn-original', owner: 'Idiomas WeLearn', rights: 'owned-content',
      authoringRecord: 'artifacts/icfes/mock-24/authoring.json',
      itemEvidence: Array.from({ length: 45 }, (_, index) => ({ itemId: `q${index + 1}`, authorshipEvidence: `record:${index + 1}`, factSources: [] })),
    },
    editorial: { status: state, reviewReports: [], adjudication: null },
    release: { status: state === 'approved' ? 'approved' : 'draft', catalogEligible: false, indexEligible: false, premiumEligible: false, deploymentEvidence: null },
  };
  candidate.candidateDigest = calculateIcfesCandidateDigest(candidate);
  return { candidate, source };
}

function approve(candidate) {
  candidate.editorial.reviewReports = REVIEW_ROLES.map((role, index) => ({
    role, actorId: `reviewer-${index + 1}`, verdict: 'PASS', candidateDigest: candidate.candidateDigest, findings: [],
  }));
  candidate.editorial.adjudication = {
    actorId: 'human-adjudicator', actorType: 'human', decision: 'APPROVE',
    candidateDigest: candidate.candidateDigest, evidence: 'Question-level review complete.',
  };
}

test('the real JSON Schema accepts v2 and rejects unknown fields', () => {
  assert.deepEqual(validateExpansionSchema(manifest, schema), []);
  const invalid = structuredClone(manifest);
  invalid.candidates[0].unsafeImplicitPublish = true;
  assert.ok(validateExpansionSchema(invalid, schema).some((failure) => failure.includes('additional properties')));
});

test('mock-24 starts fail-closed and outside every public surface', () => {
  const draft = manifest.candidates.find(({ mockId }) => mockId === 'mock-24');
  assert.ok(draft);
  assert.deepEqual(validateCandidateState(draft, { publicSurfaces: [
    readFileSync('src/data/exams.ts', 'utf8'),
    readFileSync('src/data/mocks/index.ts', 'utf8'),
    readFileSync('src/data/icfes/guided-registry.ts', 'utf8'),
    readFileSync('src/app/sitemap.ts', 'utf8'),
  ] }), []);
  assert.deepEqual(draft.release, {
    status: 'draft', catalogEligible: false, indexEligible: false, premiumEligible: false, deploymentEvidence: null,
  });
});

test('safe state transitions require evidence before catalog and monetization', () => {
  const { candidate, source } = reviewedCandidate('in-review');
  assert.deepEqual(validateCandidateState(candidate, { source }), []);

  candidate.editorial.status = 'approved';
  candidate.release.status = 'approved';
  approve(candidate);
  assert.deepEqual(validateCandidateState(candidate, { source }), []);

  candidate.editorial.status = 'release-candidate';
  candidate.release.status = 'release-candidate';
  candidate.release.catalogEligible = true;
  assert.deepEqual(validateCandidateState(candidate, { source }), []);
  assert.equal(candidate.release.premiumEligible, false);

  candidate.editorial.status = 'published';
  candidate.release.status = 'published';
  candidate.release.premiumEligible = true;
  candidate.release.deploymentEvidence = {
    commitSha: 'abcdef1234567', deploymentId: 'prod-24', environment: 'production',
    deployedAt: '2026-09-12T12:00:00-05:00', smokeReport: 'artifacts/icfes/mock-24/smoke.json',
  };
  assert.deepEqual(validateCandidateState(candidate, { source }), []);
  assert.equal(candidate.release.indexEligible, false, 'runner remains noindex after publication');
});

test('content or provenance drift invalidates the digest and bound reviews', () => {
  const { candidate, source } = reviewedCandidate('approved');
  approve(candidate);
  candidate.provenance.itemEvidence[0].authorshipEvidence = 'changed-after-review';
  const failures = validateCandidateState(candidate, { source });
  assert.ok(failures.some((failure) => failure.includes('candidateDigest obsoleto')));

  candidate.candidateDigest = calculateIcfesCandidateDigest(candidate);
  const staleReports = validateCandidateState(candidate, { source });
  assert.ok(staleReports.some((failure) => failure.includes('reporte') && failure.includes('digest obsoleto')));
  assert.ok(staleReports.some((failure) => failure.includes('adjudicación ligada a digest obsoleto')));
});

test('contradictory reports and PASS with blocking findings fail closed', () => {
  const { candidate, source } = reviewedCandidate('approved');
  approve(candidate);
  candidate.editorial.reviewReports[0].findings.push({
    questionId: 'q1', severity: 'critical', blockProduction: true, evidence: 'Two defensible keys.',
  });
  let failures = validateCandidateState(candidate, { source });
  assert.ok(failures.some((failure) => failure.includes('PASS con hallazgos bloqueantes')));

  candidate.editorial.reviewReports[0].findings = [];
  candidate.editorial.reviewReports[1].verdict = 'BLOCKED';
  failures = validateCandidateState(candidate, { source });
  assert.ok(failures.some((failure) => failure.includes('PASS y FAIL/BLOCKED contradictorios')));
});
