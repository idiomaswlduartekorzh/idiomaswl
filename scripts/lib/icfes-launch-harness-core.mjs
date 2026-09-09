import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const HASH_PATTERN = /^[a-f0-9]{64}$/;
const COMMIT_PATTERN = /^[a-f0-9]{7,40}$/;
const REQUIRED_GATES = ['editorial', 'seo', 'pricing', 'security', 'privacy', 'payments', 'teacher-ops', 'release'];

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), 'utf8'));
}

function withoutKey(value, key) {
  const copy = structuredClone(value);
  delete copy[key];
  return copy;
}

export function calculateWorkOrderDigest(workOrder) {
  return sha256(stableStringify(withoutKey(workOrder, 'workOrderDigest')));
}

export function calculateCandidateDigest(candidate) {
  return sha256(stableStringify(withoutKey(candidate, 'candidateDigest')));
}

export function loadHarness(repoRoot) {
  const root = 'config/icfes-launch-harness';
  const policy = readJson(repoRoot, `${root}/policy.json`);
  const campaign = readJson(repoRoot, `${root}/campaign.json`);
  const approvals = readJson(repoRoot, `${root}/approvals.json`);
  const candidateLedger = readJson(repoRoot, `${root}/candidate-ledger.json`);
  const releaseManifest = readJson(repoRoot, `${root}/release-manifest.json`);
  const schemas = Object.fromEntries(Object.entries(policy.schemas ?? {}).map(([key, value]) => [key, readJson(repoRoot, value)]));
  const workOrders = campaign.workOrders.map((file) => readJson(repoRoot, file));
  return { approvals, campaign, candidateLedger, policy, releaseManifest, repoRoot, schemas, workOrders };
}

export function loadReviewReports(repoRoot, policy, candidateId) {
  const directory = path.join(repoRoot, policy.artifactRoot, candidateId);
  if (!existsSync(directory)) return [];
  return readdirSync(directory)
    .filter((name) => name.endsWith('.json'))
    .sort()
    .map((name) => readJson(repoRoot, path.join(policy.artifactRoot, candidateId, name)));
}

function push(condition, failures, message) {
  if (!condition) failures.push(message);
}

function unique(values) {
  return new Set(values).size === values.length;
}

function validTimestamp(value) {
  return typeof value === 'string' && Number.isFinite(Date.parse(value));
}

function roleMap(policy) {
  return new Map(policy.roles.map((role) => [role.id, role]));
}

function workOrderFor(harness, candidate) {
  return harness.workOrders.find((order) => order.workOrderId === candidate.workOrderId);
}

function approvalsFor(harness, candidate) {
  return harness.approvals.approvals.filter((approval) => approval.candidateId === candidate.candidateId);
}

export function validateReviewReport(report, { candidate, policy, workOrder, priorReports = [] }) {
  const failures = [];
  push(report?.schemaVersion === 1, failures, 'report: schemaVersion debe ser 1');
  push(typeof report?.reportId === 'string' && report.reportId.length > 0, failures, 'report: falta reportId');
  push(report?.workOrderId === workOrder.workOrderId, failures, 'report: workOrderId no coincide');
  push(report?.workOrderDigest === workOrder.workOrderDigest, failures, 'report: workOrderDigest obsoleto');
  push(report?.candidateId === candidate.candidateId, failures, 'report: candidateId no coincide');
  push(report?.candidateDigest === candidate.candidateDigest, failures, 'report: candidateDigest obsoleto');
  push(policy.requiredReviewRoles.includes(report?.role), failures, `report: rol no permitido ${report?.role ?? 'vacío'}`);
  push(['PASS', 'FAIL', 'BLOCKED'].includes(report?.verdict), failures, 'report: verdict inválido');
  push(validTimestamp(report?.generatedAt), failures, 'report: generatedAt inválido');
  push(typeof report?.actor?.actorId === 'string' && report.actor.actorId.length >= 2, failures, 'report: actorId inválido');
  push(['agent', 'human'].includes(report?.actor?.actorType), failures, 'report: actorType inválido');
  push(Array.isArray(report?.checks) && report.checks.length > 0, failures, 'report: falta checks');
  push(Array.isArray(report?.findings), failures, 'report: findings debe ser arreglo');
  for (const finding of report?.findings ?? []) {
    push(typeof finding.resourceId === 'string' && finding.resourceId.length > 0, failures, 'report finding: falta resourceId');
    push(typeof finding.evidence === 'string' && finding.evidence.length > 0, failures, 'report finding: falta evidence');
    push(['critical', 'high', 'medium', 'low'].includes(finding.severity), failures, 'report finding: severity inválida');
    push(['high', 'medium', 'low'].includes(finding.confidence), failures, 'report finding: confidence inválida');
    push(typeof finding.blockProduction === 'boolean', failures, 'report finding: falta blockProduction');
  }
  for (const prior of priorReports) {
    const forbidden = policy.separationRules.some(({ left, right }) =>
      ((left === report.role && right === prior.role) || (right === report.role && left === prior.role))
      && prior.actor?.actorId === report.actor?.actorId);
    push(!forbidden, failures, `report: ${report.actor?.actorId ?? 'actor'} no puede cubrir a la vez ${prior.role} y ${report.role}`);
  }
  return failures;
}

export function validateApproval(approval, { candidate, policy, workOrder }) {
  const failures = [];
  push(approval?.workOrderId === workOrder.workOrderId, failures, 'approval: workOrderId no coincide');
  push(approval?.workOrderDigest === workOrder.workOrderDigest, failures, 'approval: workOrderDigest obsoleto');
  push(approval?.candidateId === candidate.candidateId, failures, 'approval: candidateId no coincide');
  push(approval?.candidateDigest === candidate.candidateDigest, failures, 'approval: candidateDigest obsoleto');
  push(policy.requiredApprovalRoles.includes(approval?.role), failures, `approval: rol no requerido ${approval?.role ?? 'vacío'}`);
  push(approval?.actor?.actorType === 'human', failures, 'approval: solo una persona puede aprobar');
  push(typeof approval?.actor?.actorId === 'string' && approval.actor.actorId.length >= 2, failures, 'approval: actorId inválido');
  push(typeof approval?.actor?.credential === 'string' && approval.actor.credential.length > 0, failures, 'approval: falta credential humana');
  push(['APPROVE', 'REJECT'].includes(approval?.decision), failures, 'approval: decision inválida');
  push(validTimestamp(approval?.approvedAt), failures, 'approval: approvedAt inválido');
  push(typeof approval?.evidence === 'string' && approval.evidence.length > 0, failures, 'approval: falta evidencia');
  return failures;
}

function validatePolicy(policy, failures) {
  push(policy.schemaVersion === 1, failures, 'policy: schemaVersion debe ser 1');
  push(JSON.stringify(policy.gateOrder) === JSON.stringify(REQUIRED_GATES), failures, 'policy: gateOrder debe contener los ocho gates contractuales en orden');
  push(unique(policy.roles.map(({ id }) => id)), failures, 'policy: roles duplicados');
  const roles = roleMap(policy);
  for (const roleId of [...policy.requiredReviewRoles, ...policy.requiredApprovalRoles]) {
    push(roles.has(roleId), failures, `policy: falta rol ${roleId}`);
  }
  for (const roleId of policy.requiredApprovalRoles) {
    push(roles.get(roleId)?.humanRequired === true && roles.get(roleId)?.mayApprove === true, failures, `policy: ${roleId} debe exigir aprobación humana`);
  }
  const tierBySku = new Map(policy.commercialModel.tiers.map((tier) => [tier.sku, tier]));
  const expectedTiers = [
    ['icfes-detail-attempt-v1', 12000, null, 0],
    ['exam-auto', 49000, 30, 0],
    ['exam-teacher', 99000, 30, 1],
  ];
  for (const [sku, priceCop, durationDays, humanReviewCredits] of expectedTiers) {
    const tier = tierBySku.get(sku);
    push(Boolean(tier), failures, `policy: falta tier ${sku}`);
    push(tier?.priceCop === priceCop, failures, `policy: precio incorrecto para ${sku}`);
    push(tier?.durationDays === durationDays, failures, `policy: duración incorrecta para ${sku}`);
    push(tier?.humanReviewCredits === humanReviewCredits, failures, `policy: cupo humano incorrecto para ${sku}`);
  }
  push(tierBySku.get('exam-auto')?.examSlug === 'icfes', failures, 'policy: exam-auto debe estar limitado a examSlug=icfes');
  push(tierBySku.get('exam-teacher')?.examSlug === 'icfes', failures, 'policy: exam-teacher debe estar limitado a examSlug=icfes');
  push(tierBySku.get('exam-teacher')?.humanReviewSlaHours === 24, failures, 'policy: el tier humano debe prometer 24h exactamente');
  push(policy.commercialModel.creditRules.sameAuthenticatedOwner === true, failures, 'policy: upgrades deben pertenecer a la misma cuenta');
  push(policy.commercialModel.creditRules.singleUseCredit === true, failures, 'policy: un crédito de upgrade debe consumirse una sola vez');
  push(policy.commercialModel.creditRules.serverCalculated === true, failures, 'policy: el servidor debe calcular upgrades');
  const upgrades = new Map(policy.commercialModel.upgradeCredits.map((upgrade) => [`${upgrade.fromSku}->${upgrade.toSku}`, upgrade]));
  push(upgrades.get('icfes-detail-attempt-v1->exam-auto')?.payableCop === 37000, failures, 'policy: upgrade 12k→49k debe cobrar 37k');
  push(upgrades.get('icfes-detail-attempt-v1->exam-teacher')?.payableCop === 87000, failures, 'policy: upgrade 12k→99k debe cobrar 87k');
  push(upgrades.get('exam-auto->exam-teacher')?.payableCop === 50000, failures, 'policy: upgrade 49k→99k debe cobrar 50k');
  const mockPattern = new RegExp(policy.mockExpansion.idPattern);
  push(mockPattern.test('mock-24') && mockPattern.test('mock-100'), failures, 'policy: idPattern debe permitir expansión más allá de mock-23');
  push(policy.mockExpansion.firstExpansionId === 'mock-24', failures, 'policy: firstExpansionId debe ser mock-24');
  push(policy.mockExpansion.allowAuthorSelfApproval === false, failures, 'policy: autor no puede autoaprobar');
  push(policy.mockExpansion.requireHashBoundHumanApproval === true, failures, 'policy: aprobaciones deben estar ligadas al hash');
  const stops = policy.stopConditions ?? [];
  push(unique(stops.map(({ id }) => id)), failures, 'policy: stop conditions duplicadas');
  for (const gate of REQUIRED_GATES) push(stops.some((stop) => stop.gate === gate), failures, `policy: falta stop condition para ${gate}`);
}

function validateCampaign(harness, failures) {
  const { campaign, policy } = harness;
  push(campaign.schemaVersion === 1, failures, 'campaign: schemaVersion debe ser 1');
  push(COMMIT_PATTERN.test(campaign.baseCommit), failures, 'campaign: baseCommit inválido');
  push(unique(campaign.queue), failures, 'campaign: queue duplicada');
  const pattern = new RegExp(policy.mockExpansion.idPattern);
  push(campaign.expansionQueue.some(({ mockId }) => Number(mockId.slice(5)) > 23), failures, 'campaign: debe contener al menos un mock posterior a mock-23');
  for (const item of campaign.expansionQueue) {
    push(pattern.test(item.mockId), failures, `campaign: mockId inválido ${item.mockId}`);
    push(item.catalogEligible === false || item.status === 'release-candidate', failures, `campaign: ${item.mockId} no puede entrar al catálogo antes de release-candidate`);
  }
}

function validateWorkOrders(harness, failures) {
  const { campaign, policy, repoRoot, workOrders } = harness;
  push(workOrders.length === campaign.workOrders.length, failures, 'work-orders: inventario incompleto');
  push(unique(workOrders.map(({ workOrderId }) => workOrderId)), failures, 'work-orders: workOrderId duplicado');
  for (const order of workOrders) {
    push(order.schemaVersion === 1, failures, `${order.workOrderId}: schemaVersion inválido`);
    push(COMMIT_PATTERN.test(order.baseCommit), failures, `${order.workOrderId}: baseCommit inválido`);
    push(validTimestamp(order.createdAt), failures, `${order.workOrderId}: createdAt inválido`);
    push(HASH_PATTERN.test(order.workOrderDigest), failures, `${order.workOrderId}: workOrderDigest inválido`);
    push(order.workOrderDigest === calculateWorkOrderDigest(order), failures, `${order.workOrderId}: workOrderDigest no coincide`);
    push(JSON.stringify(order.requiredGates) === JSON.stringify(policy.gateOrder), failures, `${order.workOrderId}: requiredGates no coincide con policy`);
    push(JSON.stringify(order.requiredRoles) === JSON.stringify(policy.requiredReviewRoles), failures, `${order.workOrderId}: requiredRoles no coincide con policy`);
    push(unique(order.inputArtifacts.map(({ path: artifactPath }) => artifactPath)), failures, `${order.workOrderId}: inputArtifacts duplicados`);
    for (const artifact of order.inputArtifacts) {
      const absolute = path.join(repoRoot, artifact.path);
      push(existsSync(absolute), failures, `${order.workOrderId}: falta input ${artifact.path}`);
      if (existsSync(absolute)) push(sha256(readFileSync(absolute)) === artifact.sha256, failures, `${order.workOrderId}: digest obsoleto ${artifact.path}`);
    }
    const target = new Map(order.targetOffer.map((tier) => [tier.sku, tier]));
    for (const tier of policy.commercialModel.tiers) {
      const orderTier = target.get(tier.sku);
      push(orderTier?.priceCop === tier.priceCop && orderTier?.durationDays === tier.durationDays && orderTier?.humanReviewCredits === tier.humanReviewCredits,
        failures, `${order.workOrderId}: targetOffer no coincide para ${tier.sku}`);
    }
  }
}

function validateCandidates(harness, failures) {
  const { candidateLedger, policy, repoRoot } = harness;
  push(candidateLedger.schemaVersion === 1, failures, 'candidate-ledger: schemaVersion debe ser 1');
  push(unique(candidateLedger.candidates.map(({ candidateId }) => candidateId)), failures, 'candidate-ledger: candidateId duplicado');
  const stopIds = new Set(policy.stopConditions.map(({ id }) => id));
  const roleIds = new Set(policy.roles.map(({ id }) => id));
  for (const candidate of candidateLedger.candidates) {
    const order = workOrderFor(harness, candidate);
    push(Boolean(order), failures, `${candidate.candidateId}: work order inexistente`);
    push(COMMIT_PATTERN.test(candidate.baseCommit), failures, `${candidate.candidateId}: baseCommit inválido`);
    push(HASH_PATTERN.test(candidate.candidateDigest), failures, `${candidate.candidateId}: candidateDigest inválido`);
    push(candidate.candidateDigest === calculateCandidateDigest(candidate), failures, `${candidate.candidateId}: candidateDigest no coincide`);
    push(unique(candidate.subjectArtifacts.map(({ path: artifactPath }) => artifactPath)), failures, `${candidate.candidateId}: subjectArtifacts duplicados`);
    for (const artifact of candidate.subjectArtifacts) {
      const absolute = path.join(repoRoot, artifact.path);
      push(HASH_PATTERN.test(artifact.sha256), failures, `${candidate.candidateId}: hash inválido ${artifact.path}`);
      push(existsSync(absolute), failures, `${candidate.candidateId}: falta subject ${artifact.path}`);
      if (existsSync(absolute)) push(sha256(readFileSync(absolute)) === artifact.sha256, failures, `${candidate.candidateId}: subject digest obsoleto ${artifact.path}`);
    }
    push(JSON.stringify(Object.keys(candidate.gateAssessments)) === JSON.stringify(policy.gateOrder), failures, `${candidate.candidateId}: gateAssessments incompletos o fuera de orden`);
    for (const gate of policy.gateOrder) {
      const assessment = candidate.gateAssessments[gate];
      push(['PASS', 'FAIL', 'BLOCKED'].includes(assessment?.status), failures, `${candidate.candidateId}: estado inválido en ${gate}`);
      push(roleIds.has(assessment?.ownerRole), failures, `${candidate.candidateId}: ownerRole inválido en ${gate}`);
      push(validTimestamp(assessment?.checkedAt), failures, `${candidate.candidateId}: checkedAt inválido en ${gate}`);
      push(Array.isArray(assessment?.evidence) && assessment.evidence.length > 0, failures, `${candidate.candidateId}: falta evidencia en ${gate}`);
      for (const evidence of assessment?.evidence ?? []) push(existsSync(path.join(repoRoot, evidence.path)), failures, `${candidate.candidateId}: evidencia inexistente ${evidence.path}`);
      for (const stopId of assessment?.stopConditionIds ?? []) push(stopIds.has(stopId), failures, `${candidate.candidateId}: stop condition desconocida ${stopId}`);
    }
    if (order) {
      const reports = loadReviewReports(repoRoot, policy, candidate.candidateId);
      reports.forEach((report, index) => failures.push(...validateReviewReport(report, { candidate, policy, workOrder: order, priorReports: reports.slice(0, index) })));
    }
  }
}

function validateApprovals(harness, failures) {
  const { approvals, candidateLedger, policy } = harness;
  push(approvals.schemaVersion === 1, failures, 'approvals: schemaVersion debe ser 1');
  push(unique(approvals.approvals.map(({ approvalId }) => approvalId)), failures, 'approvals: approvalId duplicado');
  for (const approval of approvals.approvals) {
    const candidate = candidateLedger.candidates.find(({ candidateId }) => candidateId === approval.candidateId);
    const order = candidate ? workOrderFor(harness, candidate) : null;
    push(Boolean(candidate && order), failures, `${approval.approvalId}: candidato u orden inexistente`);
    if (candidate && order) failures.push(...validateApproval(approval, { candidate, policy, workOrder: order }));
  }
  for (const candidate of candidateLedger.candidates) {
    const candidateApprovals = approvalsFor(harness, candidate);
    push(unique(candidateApprovals.map(({ role }) => role)), failures, `${candidate.candidateId}: dos aprobaciones para el mismo rol`);
    for (const { left, right } of policy.separationRules) {
      const leftApproval = candidateApprovals.find(({ role }) => role === left);
      const rightApproval = candidateApprovals.find(({ role }) => role === right);
      if (leftApproval && rightApproval) push(leftApproval.actor.actorId !== rightApproval.actor.actorId, failures, `${candidate.candidateId}: ${left} y ${right} requieren personas distintas`);
    }
  }
}

export function deriveCandidateState(harness, candidate, reports = loadReviewReports(harness.repoRoot, harness.policy, candidate.candidateId)) {
  for (const gate of harness.policy.gateOrder) {
    if (candidate.gateAssessments[gate]?.status === 'FAIL') return `FAIL_${gate.toUpperCase().replaceAll('-', '_')}`;
  }
  for (const gate of harness.policy.gateOrder) {
    if (candidate.gateAssessments[gate]?.status === 'BLOCKED') return `BLOCKED_${gate.toUpperCase().replaceAll('-', '_')}`;
  }
  const order = workOrderFor(harness, candidate);
  if (!order) return 'DRAFT';
  const validPassingRoles = new Set(reports.filter((report) => report.verdict === 'PASS'
    && validateReviewReport(report, { candidate, policy: harness.policy, workOrder: order, priorReports: reports.filter((other) => other !== report) }).length === 0)
    .map(({ role }) => role));
  if (harness.policy.requiredReviewRoles.some((role) => !validPassingRoles.has(role))) return 'AWAITING_REVIEW_REPORTS';
  const approvals = approvalsFor(harness, candidate);
  const approvedRoles = new Set(approvals.filter((approval) => approval.decision === 'APPROVE'
    && validateApproval(approval, { candidate, policy: harness.policy, workOrder: order }).length === 0)
    .map(({ role }) => role));
  if (harness.policy.requiredApprovalRoles.some((role) => !approvedRoles.has(role))) return 'AWAITING_HUMAN_APPROVAL';
  const released = harness.releaseManifest.releases.some((release) => release.candidateId === candidate.candidateId
    && release.candidateDigest === candidate.candidateDigest && release.workOrderDigest === order.workOrderDigest);
  return released ? 'RELEASED' : 'READY_FOR_RELEASE';
}

function validateReleases(harness, failures) {
  const { candidateLedger, policy, releaseManifest } = harness;
  push(releaseManifest.schemaVersion === 1, failures, 'release-manifest: schemaVersion debe ser 1');
  push(unique(releaseManifest.releases.map(({ releaseId }) => releaseId)), failures, 'release-manifest: releaseId duplicado');
  for (const release of releaseManifest.releases) {
    const candidate = candidateLedger.candidates.find(({ candidateId }) => candidateId === release.candidateId);
    const order = candidate ? workOrderFor(harness, candidate) : null;
    push(Boolean(candidate && order), failures, `${release.releaseId}: candidato u orden inexistente`);
    if (!candidate || !order) continue;
    push(release.candidateDigest === candidate.candidateDigest, failures, `${release.releaseId}: candidateDigest obsoleto`);
    push(release.workOrderDigest === order.workOrderDigest, failures, `${release.releaseId}: workOrderDigest obsoleto`);
    push(validTimestamp(release.releasedAt), failures, `${release.releaseId}: releasedAt inválido`);
    const approvals = approvalsFor(harness, candidate);
    const listed = approvals.filter((approval) => release.approvalIds.includes(approval.approvalId));
    const approvedRoles = new Set(listed.filter(({ decision }) => decision === 'APPROVE').map(({ role }) => role));
    push(policy.requiredApprovalRoles.every((role) => approvedRoles.has(role)), failures, `${release.releaseId}: faltan aprobaciones humanas requeridas`);
    const warden = listed.find(({ role }) => role === 'release-warden');
    push(Boolean(warden && warden.actor.actorId === release.releaseWardenActorId), failures, `${release.releaseId}: release warden no coincide`);
    const reports = loadReviewReports(harness.repoRoot, policy, candidate.candidateId);
    const stateWithoutRelease = deriveCandidateState({ ...harness, releaseManifest: { ...releaseManifest, releases: releaseManifest.releases.filter((item) => item !== release) } }, candidate, reports);
    push(stateWithoutRelease === 'READY_FOR_RELEASE', failures, `${release.releaseId}: candidato no estaba READY_FOR_RELEASE (${stateWithoutRelease})`);
  }
}

export function validateHarness(harness) {
  const failures = [];
  validatePolicy(harness.policy, failures);
  validateCampaign(harness, failures);
  for (const [name, schema] of Object.entries(harness.schemas)) {
    push(schema?.$schema === 'https://json-schema.org/draft/2020-12/schema', failures, `schema ${name}: draft incorrecto`);
    push(typeof schema?.$id === 'string' && schema.$id.includes('icfes-launch'), failures, `schema ${name}: $id inválido`);
  }
  validateWorkOrders(harness, failures);
  validateCandidates(harness, failures);
  validateApprovals(harness, failures);
  validateReleases(harness, failures);
  return failures;
}

export function inventory(harness) {
  return {
    systemId: harness.policy.systemId,
    campaignId: harness.campaign.campaignId,
    targetTiers: harness.policy.commercialModel.tiers.map(({ sku, priceCop, durationDays, humanReviewCredits, humanReviewSlaHours }) => ({ sku, priceCop, durationDays, humanReviewCredits, ...(humanReviewSlaHours ? { humanReviewSlaHours } : {}) })),
    expansionQueue: harness.campaign.expansionQueue,
    candidates: harness.candidateLedger.candidates.map((candidate) => ({
      candidateId: candidate.candidateId,
      candidateDigest: candidate.candidateDigest,
      state: deriveCandidateState(harness, candidate),
      gates: Object.fromEntries(harness.policy.gateOrder.map((gate) => [gate, candidate.gateAssessments[gate].status])),
      releaseReady: deriveCandidateState(harness, candidate) === 'READY_FOR_RELEASE',
    })),
    releases: harness.releaseManifest.releases.length,
  };
}
