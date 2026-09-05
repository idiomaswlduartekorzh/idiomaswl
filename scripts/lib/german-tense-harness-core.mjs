import { createHash } from 'node:crypto'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'

export function readJson(file) {
  return JSON.parse(readFileSync(file, 'utf8'))
}

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

export function fingerprint(value) {
  return createHash('sha256').update(stableStringify(value)).digest('hex')
}

export function materializeFormContent(config, formId) {
  return {
    choice: config.choiceChallenges.filter((item) => item.tenses.includes(formId)),
    micro: config.microStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)),
    long: config.longStories.filter((item) => item.gaps.some((gap) => gap.tense === formId)),
    error: config.errorChallenges.filter((item) => item.tense === formId),
    separation: (config.separationChallenges ?? []).filter((item) => item.tense === formId),
    finalStories: (config.finalStories ?? []).filter((item) => item.gaps.some((gap) => gap.tense === formId)),
  }
}

export function loadHarness(repoRoot) {
  const root = path.join(repoRoot, 'config/german-tense-harness')
  const policy = readJson(path.join(root, 'policy.json'))
  const campaign = readJson(path.join(root, 'campaign.json'))
  const approvals = readJson(path.join(root, 'approvals.json'))
  const formsDir = path.join(root, 'forms')
  const forms = Object.fromEntries(
    readdirSync(formsDir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => {
        const spec = readJson(path.join(formsDir, file))
        return [spec.id, spec]
      }),
  )
  const promptContents = Object.fromEntries(policy.roles.map((role) => {
    const promptFile = path.join(repoRoot, role.prompt)
    return [role.id, existsSync(promptFile) ? readFileSync(promptFile, 'utf8') : null]
  }))
  const promptFingerprints = Object.fromEntries(Object.entries(promptContents).map(([id, content]) => [id, content ? fingerprint(content) : null]))
  const promptNames = Object.fromEntries(Object.entries(promptContents).map(([id, content]) => [id, content?.match(/^name:\s*(.+)$/m)?.[1]?.trim() ?? null]))
  const harnessFiles = [
    'scripts/lib/german-tense-harness-core.mjs',
    'config/german-tense-harness/policy.json',
    ...Object.values(policy.schemas),
  ]
  const harnessFingerprint = fingerprint(Object.fromEntries(
    harnessFiles.map((file) => [file, readFileSync(path.join(repoRoot, file), 'utf8')]),
  ))
  return { approvals, campaign, forms, harnessFingerprint, policy, promptFingerprints, promptNames, repoRoot }
}

export function fingerprintsForForm(harness, config, formId) {
  return {
    contentFingerprint: fingerprint(materializeFormContent(config, formId)),
    harnessFingerprint: harness.harnessFingerprint,
    specFingerprint: fingerprint(harness.forms[formId]),
    promptFingerprint: fingerprint(harness.promptFingerprints),
  }
}

export function requiredRoleIds(policy, formId) {
  return policy.pipeline.filter((roleId) => {
    const role = policy.roles.find((candidate) => candidate.id === roleId)
    return !role?.requiredFor || role.requiredFor.includes(formId)
  })
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function tokenCount(value) {
  return String(value).trim().split(/\s+/u).filter(Boolean).length
}

const FINAL_UNIT_PATTERNS = {
  'perfekt-haben': /\b(?:habe|hast|hat|haben|habt)$/iu,
  'perfekt-sein': /\b(?:bin|bist|ist|sind|seid)$/iu,
  plusquamperfekt: /\b(?:hatte|hattest|hatten|hattet|war|warst|waren|wart)$/iu,
  'futur-eins': /\b(?:werde|wirst|wird|werden|werdet)$/iu,
  'futur-zwei': /\b(?:haben|sein)\s+(?:werde|wirst|wird|werden|werdet)$/iu,
  'wuerde-form': /\b(?:würde|würdest|würden|würdet)$/iu,
  'konjunktiv-vergangenheit': /\b(?:hätte|hättest|hätten|hättet|wäre|wärst|wären|wärt)$/iu,
}

export function validateCandidate(candidate, spec, policy) {
  const failures = []
  const fail = (condition, message) => { if (!condition) failures.push(message) }
  const coverage = policy.requiredCoverage

  fail(candidate && typeof candidate === 'object' && !Array.isArray(candidate), 'candidate: debe ser un objeto')
  if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return failures
  fail(candidate.formId === spec.id, `candidate: formId debe ser ${spec.id}`)

  const runtimeKeys = ['choice', 'micro', 'long', 'error', 'separation', 'finalStories']
  fail(candidate.runtime && typeof candidate.runtime === 'object' && !Array.isArray(candidate.runtime), 'candidate: falta runtime')
  for (const key of runtimeKeys) {
    fail(Array.isArray(candidate.runtime?.[key]), `candidate.runtime: ${key} debe ser un array`)
  }
  if (runtimeKeys.every((key) => Array.isArray(candidate.runtime?.[key]))) {
    for (const key of ['choice', 'micro', 'long', 'error', 'separation', 'finalStories']) {
      fail(candidate.runtime[key].length === coverage[key], `candidate.runtime: ${key} ${candidate.runtime[key].length}/${coverage[key]}`)
    }
    const finalGaps = candidate.runtime.finalStories.flatMap((story) => Array.isArray(story.gaps) ? story.gaps : [])
    fail(finalGaps.length >= coverage.finalStoryMinimumGaps, `candidate.runtime: nivel 6 requiere al menos ${coverage.finalStoryMinimumGaps} decisiones`)
    for (const gap of finalGaps) {
      fail(isNonEmptyString(gap.id), 'candidate.runtime: cada hueco final requiere id')
      fail(Array.isArray(gap.answers) && gap.answers.length > 0, `${gap.id ?? 'hueco final'}: faltan respuestas`)
      for (const answer of gap.answers ?? []) {
        fail(tokenCount(answer) >= spec.minimumFinalUnitTokens, `${gap.id ?? 'hueco final'}: "${answer}" no contiene la unidad verbal completa (${spec.minimumFinalUnitTokens} palabras)`)
        const unitPattern = FINAL_UNIT_PATTERNS[spec.id]
        if (unitPattern) fail(unitPattern.test(answer), `${gap.id ?? 'hueco final'}: "${answer}" no cumple la construcción ${spec.construction}`)
      }
    }
    fail(candidate.runtime.separation.filter((item) => item.separation === 'separable').length === coverage.separable, `candidate.runtime: balance separable ${coverage.separable}`)
    fail(candidate.runtime.separation.filter((item) => item.separation === 'inseparable').length === coverage.inseparable, `candidate.runtime: balance inseparable ${coverage.inseparable}`)
  }

  fail(Array.isArray(candidate.annotations), 'candidate: annotations debe ser un array')
  if (Array.isArray(candidate.annotations)) {
    const requiredAnnotationFields = [
      'itemId', 'runtimeFingerprint', 'level', 'lemma', 'senseId', 'targetForm', 'person', 'number',
      'clauseType', 'function', 'anchorIds', 'auxiliary', 'participle', 'separation',
      'prefix', 'expectedUnit', 'accepted', 'distractorRationale',
    ]
    const annotationIds = candidate.annotations.map((item) => item?.itemId)
    fail(new Set(annotationIds).size === annotationIds.length, 'candidate.annotations: itemId debe ser único')
    for (const item of candidate.annotations) {
      fail(item && typeof item === 'object' && !Array.isArray(item), 'candidate.annotations: cada entrada debe ser un objeto')
      if (!item || typeof item !== 'object' || Array.isArray(item)) continue
      for (const field of requiredAnnotationFields) fail(Object.hasOwn(item, field), `${item.itemId ?? 'anotación'}: falta ${field}`)
      fail(isNonEmptyString(item.itemId), 'candidate.annotations: itemId vacío')
      fail(Number.isInteger(item.level) && item.level >= 1 && item.level <= 6, `${item.itemId ?? 'anotación'}: level inválido`)
      fail(item.targetForm === spec.id, `${item.itemId ?? 'anotación'}: targetForm debe ser ${spec.id}`)
      fail(Array.isArray(item.anchorIds), `${item.itemId ?? 'anotación'}: anchorIds debe ser un array`)
      fail(Array.isArray(item.accepted) && item.accepted.length > 0, `${item.itemId ?? 'anotación'}: accepted vacío`)
      fail(Array.isArray(item.accepted) && new Set(item.accepted).size === item.accepted.length, `${item.itemId ?? 'anotación'}: accepted debe contener variantes únicas`)
      fail(Array.isArray(item.distractorRationale), `${item.itemId ?? 'anotación'}: distractorRationale debe ser un array`)
      if (spec.allowedAuxiliaries.length > 0) {
        fail(spec.allowedAuxiliaries.includes(item.auxiliary), `${item.itemId ?? 'anotación'}: auxiliar ${item.auxiliary ?? 'nulo'} fuera del contrato`)
      }
    }
    for (let level = 1; level <= 5; level += 1) {
      fail(candidate.annotations.filter((item) => item?.level === level).length === 10, `candidate.annotations: nivel ${level} requiere 10 entradas`)
    }
    fail(candidate.annotations.filter((item) => item?.level === 6).length === coverage.finalStories, `candidate.annotations: nivel 6 requiere ${coverage.finalStories} entrada por historia`)

    const annotatedRuntime = [
      ['choice', 1, (item) => [item.answer]],
      ['micro', 2, (item) => item.gaps.flatMap((gap) => gap.answers)],
      ['long', 3, (item) => item.gaps.flatMap((gap) => gap.answers)],
      ['error', 4, (item) => item.answers],
      ['separation', 5, (item) => item.answers],
      ['finalStories', 6, (item) => item.gaps.flatMap((gap) => gap.answers)],
    ]
    for (const [runtimeKey, level, answersFor] of annotatedRuntime) {
      for (const runtimeItem of candidate.runtime?.[runtimeKey] ?? []) {
        const annotation = candidate.annotations.find((item) => item?.level === level && item.itemId === runtimeItem.id)
        fail(Boolean(annotation), `${runtimeItem.id}: falta anotación enlazada del nivel ${level}`)
        if (!annotation) continue
        const runtimeAnswers = answersFor(runtimeItem)
        const uniqueRuntimeAnswers = [...new Set(runtimeAnswers)]
        fail(Array.isArray(annotation.accepted) && sameMembers(annotation.accepted, uniqueRuntimeAnswers), `${runtimeItem.id}: accepted no coincide con las respuestas del runtime`)
        fail(annotation.runtimeFingerprint === fingerprint(runtimeItem), `${runtimeItem.id}: runtimeFingerprint no coincide con el reto materializado`)
      }
    }
  }

  fail(Array.isArray(candidate.sources) && candidate.sources.length > 0, 'candidate: sources debe incluir al menos una fuente')
  for (const source of Array.isArray(candidate.sources) ? candidate.sources : []) {
    fail(isNonEmptyString(source?.title), 'candidate.sources: falta title')
    fail(isNonEmptyString(source?.url) && /^https?:\/\//u.test(source.url), 'candidate.sources: url inválida')
    fail(/^\d{4}-\d{2}-\d{2}$/u.test(source?.checkedAt ?? ''), 'candidate.sources: checkedAt debe usar YYYY-MM-DD')
  }

  return failures
}

export function validateReport(report, roleId, formId) {
  const failures = []
  const fail = (condition, message) => { if (!condition) failures.push(message) }
  const hash = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value)

  fail(report && typeof report === 'object' && !Array.isArray(report), `${roleId}: el informe debe ser un objeto`)
  if (!report || typeof report !== 'object' || Array.isArray(report)) return failures
  fail(report.schemaVersion === 1, `${roleId}: schemaVersion debe ser 1`)
  fail(report.role === roleId, `${roleId}: role no coincide`)
  fail(report.formId === formId, `${roleId}: formId no coincide`)
  fail(report.verdict === 'PASS' || report.verdict === 'FAIL', `${roleId}: verdict debe ser PASS o FAIL`)
  fail(hash(report.candidateFingerprint), `${roleId}: candidateFingerprint inválida`)
  fail(hash(report.harnessFingerprint), `${roleId}: harnessFingerprint inválida`)
  fail(hash(report.specFingerprint), `${roleId}: specFingerprint inválida`)
  fail(hash(report.promptFingerprint), `${roleId}: promptFingerprint inválida`)
  fail(Array.isArray(report.checks), `${roleId}: checks debe ser un array`)
  fail(Array.isArray(report.findings), `${roleId}: findings debe ser un array`)
  fail(!Number.isNaN(Date.parse(report.generatedAt)), `${roleId}: generatedAt inválido`)
  if (roleId === 'author') {
    fail(hash(report.baselineContentFingerprint), 'author: baselineContentFingerprint inválida')
    fail(report.candidate && typeof report.candidate === 'object', 'author: falta candidate')
  }
  if (roleId === 'integrator') fail(hash(report.runtimeContentFingerprint), 'integrator: runtimeContentFingerprint inválida')
  return failures
}

function sameMembers(left, right) {
  return left.length === right.length && left.every((value) => right.includes(value))
}

export function validateHarness(harness, config) {
  const failures = []
  const fail = (condition, message) => { if (!condition) failures.push(message) }
  const { campaign, forms, policy, promptFingerprints, promptNames, repoRoot } = harness
  const configIds = config.forms.map((form) => form.id)
  const specIds = Object.keys(forms)
  const roleIds = policy.roles.map((role) => role.id)

  fail(policy.schemaVersion === 1, 'policy: schemaVersion debe ser 1')
  fail(Object.values(policy.schemas ?? {}).every((file) => existsSync(path.join(repoRoot, file))), 'policy: falta al menos un schema del harness')
  fail(policy.referenceForm === campaign.referenceForm, 'campaign: referenceForm no coincide con policy')
  fail(configIds.includes(policy.referenceForm), 'policy: referenceForm no existe en GERMAN_FORMS')
  fail(sameMembers(configIds, specIds), `forms: deben coincidir exactamente con GERMAN_FORMS (${configIds.join(', ')})`)
  fail(new Set(roleIds).size === roleIds.length, 'policy: hay roles duplicados')
  fail(new Set(policy.roles.map((role) => role.output)).size === policy.roles.length, 'policy: hay archivos de salida duplicados')
  fail(sameMembers(policy.pipeline, roleIds), 'policy: pipeline debe contener cada rol exactamente una vez')
  fail(policy.roles.filter((role) => role.mayEditRuntime).map((role) => role.id).join(',') === 'integrator', 'policy: solo integrator puede editar runtime')
  fail(Object.values(promptFingerprints).every(Boolean), 'policy: falta al menos un prompt de agente')
  for (const role of policy.roles) fail(promptNames[role.id] === role.agent, `${role.id}: el name del prompt no coincide con policy`)

  const expectedQueue = configIds.filter((id) => id !== policy.referenceForm)
  fail(sameMembers(campaign.queue, expectedQueue), 'campaign: la cola debe contener todas las formas no referencia exactamente una vez')
  fail(campaign.parallelism?.maximumAgents >= 2 && campaign.parallelism?.maximumAgents <= 4, 'campaign: maximumAgents debe estar entre 2 y 4')

  const requiredSpecFields = [
    'id', 'label', 'sourceFile', 'stage', 'cefr', 'construction', 'auxiliaryPolicy',
    'allowedAuxiliaries', 'minimumFinalUnitTokens', 'morphology', 'wordOrder', 'contextContract', 'separableContract', 'knownRisks',
  ]
  for (const id of configIds) {
    const spec = forms[id]
    if (!spec) continue
    for (const field of requiredSpecFields) fail(Object.hasOwn(spec, field), `${id}: falta ${field}`)
    fail(spec.id === id, `${id}: el id interno no coincide con el archivo`)
    fail(existsSync(path.join(repoRoot, spec.sourceFile)), `${id}: sourceFile no existe`)
    fail(Array.isArray(spec.morphology) && spec.morphology.length > 0, `${id}: faltan reglas morfológicas`)
    fail(Array.isArray(spec.wordOrder) && spec.wordOrder.length > 0, `${id}: faltan reglas de orden`)
    fail(Array.isArray(spec.contextContract) && spec.contextContract.length > 0, `${id}: faltan anclas o funciones`)
    fail(Array.isArray(spec.separableContract) && spec.separableContract.length > 0, `${id}: falta contrato de separación`)
    fail(Number.isInteger(spec.minimumFinalUnitTokens) && spec.minimumFinalUnitTokens >= 1, `${id}: minimumFinalUnitTokens inválido`)
    fail(id === policy.referenceForm ? spec.stage === 'approved-reference' : spec.stage === 'queued', `${id}: stage inválido`)

    const content = materializeFormContent(config, id)
    const coverage = policy.requiredCoverage
    fail(content.choice.length === coverage.choice, `${id}: choice ${content.choice.length}/${coverage.choice}`)
    fail(content.micro.length === coverage.micro, `${id}: micro ${content.micro.length}/${coverage.micro}`)
    fail(content.long.length === coverage.long, `${id}: long ${content.long.length}/${coverage.long}`)
    fail(content.error.length === coverage.error, `${id}: error ${content.error.length}/${coverage.error}`)
    fail(content.separation.length === coverage.separation, `${id}: separation ${content.separation.length}/${coverage.separation}`)
    fail(content.finalStories.length === coverage.finalStories, `${id}: finalStories ${content.finalStories.length}/${coverage.finalStories}`)
    fail((content.finalStories[0]?.gaps.length ?? 0) >= coverage.finalStoryMinimumGaps, `${id}: historia final demasiado corta`)
    fail(content.separation.filter((item) => item.separation === 'separable').length === coverage.separable, `${id}: balance separable inválido`)
    fail(content.separation.filter((item) => item.separation === 'inseparable').length === coverage.inseparable, `${id}: balance inseparable inválido`)
  }

  fail(forms['perfekt-haben']?.auxiliaryPolicy === 'fixed-haben', 'perfekt-haben: debe fijar haben')
  fail(forms['perfekt-sein']?.auxiliaryPolicy === 'fixed-sein', 'perfekt-sein: debe fijar sein')
  for (const id of ['plusquamperfekt', 'futur-zwei', 'konjunktiv-vergangenheit']) {
    fail(forms[id]?.auxiliaryPolicy === 'inherits-perfect-auxiliary', `${id}: debe heredar el auxiliar del Perfekt`)
  }

  return failures
}

export function createWorkOrder(harness, config, formId, baseCommit) {
  const spec = harness.forms[formId]
  if (!spec) throw new Error(`Forma desconocida: ${formId}`)
  const fingerprints = fingerprintsForForm(harness, config, formId)
  return {
    schemaVersion: 1,
    campaignId: harness.campaign.campaignId,
    formId,
    baseCommit,
    createdAt: new Date().toISOString(),
    baselineContentFingerprint: fingerprints.contentFingerprint,
    harnessFingerprint: fingerprints.harnessFingerprint,
    specFingerprint: fingerprints.specFingerprint,
    promptFingerprint: fingerprints.promptFingerprint,
    spec,
    requiredRoles: requiredRoleIds(harness.policy, formId),
    requiredReports: requiredRoleIds(harness.policy, formId).map((roleId) => {
      const role = harness.policy.roles.find((candidate) => candidate.id === roleId)
      return role.output
    }),
    requiredCoverage: harness.policy.requiredCoverage,
    runtimeGates: harness.policy.runtimeGates,
    allowedRuntimeFiles: [spec.sourceFile, 'src/data/practica/german-advanced-editorial.ts', 'src/data/practica/german-structure-quest-config.ts'],
  }
}

export function deriveState({ approval, fingerprints, policy, reports, requiredRoles, spec, workOrder }) {
  if (!spec) return 'MISSING_SPEC'
  const approvalMatches = approval
    && approval.contentFingerprint === fingerprints.contentFingerprint
    && approval.specFingerprint === fingerprints.specFingerprint
  if (spec.stage === 'approved-reference' && approvalMatches) return 'APPROVED'
  if (!workOrder) return 'NEEDS_DRAFT'
  const workOrderMatches = workOrder.formId === spec.id
    && workOrder.harnessFingerprint === fingerprints.harnessFingerprint
    && workOrder.specFingerprint === fingerprints.specFingerprint
    && workOrder.promptFingerprint === fingerprints.promptFingerprint
  if (!workOrderMatches) return 'BLOCKED_SCHEMA'
  if (!reports.author) return 'NEEDS_DRAFT'
  const author = reports.author
  const candidateFingerprint = author.candidate ? fingerprint(author.candidate) : null
  const candidateRuntimeFingerprint = author.candidate?.runtime ? fingerprint(author.candidate.runtime) : null
  if (!policy
    || validateReport(author, 'author', spec.id).length > 0
    || validateCandidate(author.candidate, spec, policy).length > 0) return 'BLOCKED_SCHEMA'
  const authorMatches = author.formId === spec.id
    && author.verdict === 'PASS'
    && author.baselineContentFingerprint === workOrder.baselineContentFingerprint
    && author.harnessFingerprint === fingerprints.harnessFingerprint
    && author.specFingerprint === fingerprints.specFingerprint
    && author.promptFingerprint === fingerprints.promptFingerprint
    && author.candidateFingerprint === candidateFingerprint
  if (!authorMatches) return 'BLOCKED_SCHEMA'

  const matching = (report, roleId) => report
    && validateReport(report, roleId, spec.id).length === 0
    && report.candidateFingerprint === candidateFingerprint
    && report.harnessFingerprint === fingerprints.harnessFingerprint
    && report.specFingerprint === fingerprints.specFingerprint
    && report.promptFingerprint === fingerprints.promptFingerprint

  for (const role of ['morphology', 'auxiliary']) {
    if (!requiredRoles.includes(role)) continue
    if (!matching(reports[role], role) || reports[role].verdict !== 'PASS') return 'BLOCKED_LINGUISTIC'
  }
  for (const role of ['pedagogy', 'adversary']) {
    if (!matching(reports[role], role) || reports[role].verdict !== 'PASS') return 'BLOCKED_PEDAGOGY'
  }
  if (!matching(reports.integrator, 'integrator')
    || reports.integrator.verdict !== 'PASS'
    || reports.integrator.runtimeContentFingerprint !== fingerprints.contentFingerprint
    || candidateRuntimeFingerprint !== fingerprints.contentFingerprint) return 'BLOCKED_RUNTIME'
  if (!matching(reports.warden, 'warden') || reports.warden.verdict !== 'PASS') return 'BLOCKED_RUNTIME'
  return approvalMatches ? 'APPROVED' : 'READY_FOR_HUMAN_REVIEW'
}

export function readRunReports(runDir, policy) {
  return Object.fromEntries(policy.roles.map((role) => {
    const file = path.join(runDir, role.output)
    return [role.id, existsSync(file) ? readJson(file) : null]
  }))
}
