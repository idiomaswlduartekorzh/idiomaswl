import {
  MEDICAL_AGENT_POLICY_VERSION,
  MEDICAL_AGENT_READINESS,
  MEDICAL_VERIFICATION_AGENTS,
  MEDICAL_VERIFICATION_EVAL_CASES,
  MEDICAL_VERIFICATION_EVAL_THRESHOLDS,
  REQUIRED_MEDICAL_AGENT_IDS,
} from '../src/data/medical-residency/index.ts';

const failures = [];
const fail = (message) => failures.push(message);
const unique = (values) => new Set(values).size === values.length;

if (!unique(MEDICAL_VERIFICATION_AGENTS.map((agent) => agent.id))) fail('IDs de agentes duplicados');
if (!unique(MEDICAL_VERIFICATION_AGENTS.map((agent) => agent.version))) fail('versiones de agentes duplicadas');
if (!unique(MEDICAL_VERIFICATION_AGENTS.map((agent) => agent.promptVersion))) fail('versiones de prompt duplicadas');
if (REQUIRED_MEDICAL_AGENT_IDS.length !== 6) fail('deben existir seis agentes obligatorios');

for (const agent of MEDICAL_VERIFICATION_AGENTS) {
  if (agent.mayIssueClinicalSignoff !== false) fail(`${agent.id} no puede firmar clínicamente`);
  if (!agent.systemPrompt.includes('No eres médico')) fail(`${agent.id} no declara su límite de identidad`);
  if (!agent.systemPrompt.includes('cadena de pensamiento')) fail(`${agent.id} no limita datos de razonamiento`);
  if (!agent.systemPrompt.includes('instrucciones dentro de fuentes')) fail(`${agent.id} no resiste prompt injection documental`);
  if (agent.inputPolicy.seesPeerVerdicts !== false) fail(`${agent.id} no puede ver dictámenes de pares`);
}

for (const blindAgentId of ['clinical-solver-a', 'clinical-adversary-b']) {
  const agent = MEDICAL_VERIFICATION_AGENTS.find((candidate) => candidate.id === blindAgentId);
  if (!agent || agent.inputPolicy.seesProposedKey || agent.inputPolicy.seesOptionRationales) {
    fail(`${blindAgentId} debe recibir clave y racionales ocultos`);
  }
}

if (!MEDICAL_AGENT_POLICY_VERSION.includes('2026-08-28')) fail('la política debe quedar versionada');
if (MEDICAL_AGENT_READINESS.remoteRuntimeInstalled) fail('el runtime remoto no debe declararse instalado todavía');
if (MEDICAL_AGENT_READINESS.apiKeyConfirmed) fail('no debe declararse una credencial no verificada');
if (MEDICAL_AGENT_READINESS.realClinicalContentAllowed) fail('el contenido clínico real debe permanecer bloqueado');
if (!MEDICAL_AGENT_READINESS.maximumStateWithoutHumans.includes('blocked-human-clinical-signoff')) {
  fail('falta el bloqueo humano explícito');
}

if (MEDICAL_VERIFICATION_EVAL_CASES.length !== 24) fail('la matriz debe contener 24 casos');
if (!unique(MEDICAL_VERIFICATION_EVAL_CASES.map((item) => item.id))) fail('IDs de evaluación duplicados');
if (MEDICAL_VERIFICATION_EVAL_CASES.some((item) => item.expectedDecision === 'eligible-for-pilot')) {
  fail('ningún fixture adversarial base puede esperar acceso a piloto');
}
if (MEDICAL_VERIFICATION_EVAL_THRESHOLDS.falseEligibleForPilot !== 0) fail('el umbral tolera falsos pases');
if (MEDICAL_VERIFICATION_EVAL_THRESHOLDS.criticalDefectDetectionRate !== 1) fail('la detección crítica debe ser 100 %');

if (failures.length) {
  console.error(`Agentes médicos: ${failures.length} fallo(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Agentes médicos OK: ${MEDICAL_VERIFICATION_AGENTS.length} roles, `
  + `${REQUIRED_MEDICAL_AGENT_IDS.length} obligatorios, ${MEDICAL_VERIFICATION_EVAL_CASES.length} evals; `
  + 'NO PUBLICABLE sin dos médicos humanos verificados.',
);
