import assert from 'node:assert/strict'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { GERMAN_STRUCTURE_QUEST } from '../src/data/practica/german-structure-quest-config.ts'
import {
  createWorkOrder,
  deriveState,
  fingerprint,
  fingerprintsForForm,
  levelOneConnector,
  levelOnePlacement,
  loadHarness,
  materializeFormContent,
  requiredRoleIds,
  stableStringify,
  validateCandidate,
  validateHarness,
} from '../scripts/lib/german-tense-harness-core.mjs'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const harness = loadHarness(repoRoot)
const LEVEL_ONE_CONNECTOR_PATTERN = /\b(?:dass|weil|obwohl|wenn|nachdem|bevor|ob)\b/giu

function applyLevelOneClauseContract(runtime, spec) {
  const contract = spec.levelOneClauseContract
  if (!contract) return
  const connectorOrder = ['ob', 'ob', 'weil', 'obwohl', 'dass', 'wenn', 'weil', 'obwohl', 'dass', 'wenn']
  runtime.choice.forEach((item, index) => {
    const gapIndex = item.context.indexOf('___')
    const beforeGap = item.context.slice(0, gapIndex)
    const matches = [...beforeGap.matchAll(LEVEL_ONE_CONNECTOR_PATTERN)]
    const lastConnector = matches.at(-1)
    const targetPrefix = lastConnector ? beforeGap.slice(lastConnector.index + lastConnector[0].length).trimStart() : beforeGap.trimStart()
    const connector = connectorOrder[index]
    assert.ok(contract.allowedConnectors.includes(connector), `${spec.id}: el fixture requiere ${connector}`)
    if (index === 0) item.context = `Weißt du, ob ${targetPrefix}___?`
    else if (index === 1) item.context = `Kannst du sagen, ob ${targetPrefix}___?`
    else if (index === 2 || index === 3) item.context = `${connector[0].toLocaleUpperCase('de')}${connector.slice(1)} ${targetPrefix}___, beginnt der nächste Schritt.`
    else item.context = `Der Zusammenhang ist klar, ${connector} ${targetPrefix}___.`
  })
}

function synchronizeLevelOneContext(candidate, index, context) {
  const item = candidate.runtime.choice[index]
  item.context = context
  const annotation = candidate.annotations.find((entry) => entry.level === 1 && entry.itemId === item.id)
  annotation.runtimeFingerprint = fingerprint(item)
}

function validAnnotation(formId, level, runtimeItem, accepted, auxiliary) {
  const uniqueAccepted = [...new Set(accepted)]
  return {
    itemId: runtimeItem.id,
    runtimeFingerprint: fingerprint(runtimeItem),
    level,
    lemma: 'machen',
    senseId: 'machen.1',
    targetForm: formId,
    person: '3',
    number: 'singular',
    clauseType: 'main',
    function: 'test',
    anchorIds: [],
    auxiliary,
    participle: auxiliary ? 'gemacht' : null,
    separation: 'not-applicable',
    prefix: null,
    expectedUnit: uniqueAccepted.join(' | '),
    accepted: uniqueAccepted,
    distractorRationale: [],
  }
}

function validCandidate(formId) {
  const spec = harness.forms[formId]
  const runtime = structuredClone(materializeFormContent(GERMAN_STRUCTURE_QUEST, formId))
  applyLevelOneClauseContract(runtime, spec)
  const auxiliary = spec.allowedAuxiliaries[0] ?? null
  for (const story of runtime.finalStories) {
    for (const gap of story.gaps) {
      gap.answers = gap.answers.map((answer) => {
        const words = answer.trim().split(/\s+/u).filter(Boolean)
        const filler = auxiliary ?? 'werden'
        return [...words, ...Array(Math.max(0, spec.minimumFinalUnitTokens - words.length)).fill(filler)].join(' ')
      })
    }
  }
  return {
    formId,
    runtime,
    annotations: [
      ...runtime.choice.map((item) => validAnnotation(formId, 1, item, [item.answer], auxiliary)),
      ...runtime.micro.map((item) => validAnnotation(formId, 2, item, item.gaps.flatMap((gap) => gap.answers), auxiliary)),
      ...runtime.long.map((item) => validAnnotation(formId, 3, item, item.gaps.flatMap((gap) => gap.answers), auxiliary)),
      ...runtime.error.map((item) => validAnnotation(formId, 4, item, item.answers, auxiliary)),
      ...runtime.separation.map((item) => validAnnotation(formId, 5, item, item.answers, auxiliary)),
      ...runtime.finalStories.map((item) => validAnnotation(formId, 6, item, item.gaps.flatMap((gap) => gap.answers), auxiliary)),
    ],
    sources: [{ title: 'Goethe', url: 'https://www.goethe.de/', checkedAt: '2026-09-05' }],
  }
}

test('harness and German runtime declare the same keyed form inventory', () => {
  assert.deepEqual(validateHarness(harness, GERMAN_STRUCTURE_QUEST), [])
  assert.deepEqual(
    new Set(Object.keys(harness.forms)),
    new Set(GERMAN_STRUCTURE_QUEST.forms.map((form) => form.id)),
  )
})

test('fingerprints are stable and change when content or specifications change', () => {
  assert.equal(stableStringify({ b: 2, a: 1 }), stableStringify({ a: 1, b: 2 }))
  assert.equal(fingerprint({ b: 2, a: 1 }), fingerprint({ a: 1, b: 2 }))
  assert.notEqual(fingerprint({ a: 1 }), fingerprint({ a: 2 }))

  const current = fingerprintsForForm(harness, GERMAN_STRUCTURE_QUEST, 'perfekt-haben')
  const mutated = structuredClone(GERMAN_STRUCTURE_QUEST)
  mutated.separationChallenges.find((item) => item.tense === 'perfekt-haben').answers[0] = 'mutiert'
  const changed = fingerprintsForForm(harness, mutated, 'perfekt-haben')
  assert.notEqual(current.contentFingerprint, changed.contentFingerprint)
  assert.equal(current.specFingerprint, changed.specFingerprint)
})

test('auxiliary reviewer is mandatory only for forms whose construction needs it', () => {
  assert.ok(requiredRoleIds(harness.policy, 'perfekt-haben').includes('auxiliary'))
  assert.ok(requiredRoleIds(harness.policy, 'futur-zwei').includes('auxiliary'))
  assert.ok(!requiredRoleIds(harness.policy, 'praesens').includes('auxiliary'))
  assert.ok(!requiredRoleIds(harness.policy, 'imperativ').includes('auxiliary'))
})

test('static harness rejects a missing form and a wrong Perfekt auxiliary policy', () => {
  const missing = structuredClone(harness)
  delete missing.forms['perfekt-sein']
  assert.ok(validateHarness(missing, GERMAN_STRUCTURE_QUEST).some((failure) => failure.startsWith('forms:')))

  const wrongAuxiliary = structuredClone(harness)
  wrongAuxiliary.forms['perfekt-haben'].auxiliaryPolicy = 'fixed-sein'
  assert.ok(validateHarness(wrongAuxiliary, GERMAN_STRUCTURE_QUEST).includes('perfekt-haben: debe fijar haben'))

  const wrongPrompt = structuredClone(harness)
  wrongPrompt.promptNames.author = 'otro-agente'
  assert.ok(validateHarness(wrongPrompt, GERMAN_STRUCTURE_QUEST).includes('author: el name del prompt no coincide con policy'))

  const missingLevelOneContract = structuredClone(harness)
  delete missingLevelOneContract.forms['perfekt-haben'].levelOneClauseContract
  assert.ok(validateHarness(missingLevelOneContract, GERMAN_STRUCTURE_QUEST).includes('perfekt-haben: falta levelOneClauseContract'))

  const missingPlacementQuota = structuredClone(harness)
  delete missingPlacementQuota.forms['perfekt-haben'].levelOneClauseContract.minimumMatrixObQuestions
  assert.ok(validateHarness(missingPlacementQuota, GERMAN_STRUCTURE_QUEST).includes('perfekt-haben: minimumMatrixObQuestions inválido'))
})

test('work order is keyed by form and freezes all four fingerprints', () => {
  const order = createWorkOrder(harness, GERMAN_STRUCTURE_QUEST, 'perfekt-sein', 'abc123')
  assert.equal(order.formId, 'perfekt-sein')
  assert.equal(order.baseCommit, 'abc123')
  assert.equal(order.spec.auxiliaryPolicy, 'fixed-sein')
  assert.ok(order.requiredRoles.includes('auxiliary'))
  assert.ok(order.requiredReports.includes('auxiliary.json'))
  assert.equal(order.requiredCoverage.finalStoryMinimumGaps, 10)
  assert.match(order.baselineContentFingerprint, /^[a-f0-9]{64}$/)
  assert.match(order.harnessFingerprint, /^[a-f0-9]{64}$/)
  assert.match(order.specFingerprint, /^[a-f0-9]{64}$/)
  assert.match(order.promptFingerprint, /^[a-f0-9]{64}$/)
})

test('candidate contract rejects incomplete level 6 units and malformed evidence', () => {
  const formId = 'perfekt-haben'
  const spec = harness.forms[formId]
  const candidate = validCandidate(formId)
  assert.deepEqual(validateCandidate(candidate, spec, harness.policy), [])

  const incomplete = structuredClone(candidate)
  incomplete.runtime.finalStories[0].gaps[0].answers = ['gemacht']
  assert.ok(validateCandidate(incomplete, spec, harness.policy).some((failure) => failure.includes('unidad verbal completa')))

  const wrongConstruction = structuredClone(candidate)
  wrongConstruction.runtime.finalStories[0].gaps[0].answers = ['geplant ist']
  assert.ok(validateCandidate(wrongConstruction, spec, harness.policy).some((failure) => failure.includes('no cumple la construcción')))

  const strippedContext = structuredClone(candidate)
  strippedContext.runtime.finalStories[0].segments[0] = ''
  assert.ok(validateCandidate(strippedContext, spec, harness.policy).some((failure) => failure.includes('runtimeFingerprint no coincide')))

  const swappedSeparation = structuredClone(candidate)
  const firstSeparable = swappedSeparation.runtime.separation.find((item) => item.separation === 'separable')
  const firstInseparable = swappedSeparation.runtime.separation.find((item) => item.separation === 'inseparable')
  firstSeparable.separation = 'inseparable'
  firstInseparable.separation = 'separable'
  assert.ok(validateCandidate(swappedSeparation, spec, harness.policy).some((failure) => failure.includes('runtimeFingerprint no coincide')))

  const wrongForm = structuredClone(candidate)
  wrongForm.formId = 'perfekt-sein'
  assert.ok(validateCandidate(wrongForm, spec, harness.policy).includes('candidate: formId debe ser perfekt-haben'))

  const missingAnnotation = structuredClone(candidate)
  missingAnnotation.annotations.pop()
  assert.ok(validateCandidate(missingAnnotation, spec, harness.policy).includes('candidate.annotations: nivel 6 requiere 1 entrada por historia'))

  const wrongAuxiliary = structuredClone(candidate)
  wrongAuxiliary.annotations[0].auxiliary = 'sein'
  assert.ok(validateCandidate(wrongAuxiliary, spec, harness.policy).some((failure) => failure.includes('auxiliar sein fuera del contrato')))

  const insufficientCoverage = structuredClone(candidate)
  insufficientCoverage.runtime.choice.pop()
  assert.ok(validateCandidate(insufficientCoverage, spec, harness.policy).includes('candidate.runtime: choice 9/10'))

  const futureTwo = validCandidate('futur-zwei')
  const futureSpec = harness.forms['futur-zwei']
  futureTwo.runtime.finalStories[0].gaps[0].answers = ['gemacht haben']
  assert.ok(validateCandidate(futureTwo, futureSpec, harness.policy).some((failure) => failure.includes('unidad verbal completa')))

  futureTwo.runtime.finalStories[0].gaps[0].answers = ['veranstaltet hat wird']
  assert.ok(validateCandidate(futureTwo, futureSpec, harness.policy).some((failure) => failure.includes('no cumple la construcción')))

  const imperative = validCandidate('imperativ')
  imperative.runtime.finalStories[0].gaps[0].answers = ['prüft']
  assert.ok(validateCandidate(imperative, harness.forms.imperativ, harness.policy).some((failure) => failure.includes('accepted no coincide')))
})

test('candidate contract requires varied level-one connectors and complete compound units', () => {
  for (const [candidateFormId, candidateSpec] of Object.entries(harness.forms).filter(([, formSpec]) => formSpec.levelOneClauseContract)) {
    assert.deepEqual(validateCandidate(validCandidate(candidateFormId), candidateSpec, harness.policy), [], candidateFormId)
  }

  const formId = 'perfekt-haben'
  const spec = harness.forms[formId]
  const candidate = validCandidate(formId)
  assert.deepEqual(validateCandidate(candidate, spec, harness.policy), [])

  const connectors = candidate.runtime.choice.map((item) => levelOneConnector(item.context))
  const placements = candidate.runtime.choice.map((item) => levelOnePlacement(item.context))
  assert.ok(new Set(connectors).size >= spec.levelOneClauseContract.minimumDistinctConnectors)
  assert.ok(candidate.runtime.choice.filter((item) => item.context.includes('?')).length >= spec.levelOneClauseContract.minimumInterrogativeContexts)
  assert.ok(placements.filter((placement) => placement === 'matrix-ob').length >= spec.levelOneClauseContract.minimumMatrixObQuestions)
  assert.ok(placements.filter((placement) => placement === 'preposed').length >= spec.levelOneClauseContract.minimumPreposedTargetClauses)

  const connectorInPreviousClause = structuredClone(candidate)
  synchronizeLevelOneContext(connectorInPreviousClause, 0, 'Weil die Sitzung endet, das Team die Aufgabe ___.')
  assert.equal(levelOneConnector(connectorInPreviousClause.runtime.choice[0].context), null)
  const previousClauseFailures = validateCandidate(connectorInPreviousClause, spec, harness.policy)
  assert.ok(previousClauseFailures.some((failure) => failure.includes(`${connectorInPreviousClause.runtime.choice[0].id}: falta un conector`)))
  assert.ok(!previousClauseFailures.some((failure) => failure.includes('runtimeFingerprint no coincide')))

  const dassQuestions = structuredClone(candidate)
  synchronizeLevelOneContext(dassQuestions, 0, 'Weißt du, dass das Team die Aufgabe ___?')
  synchronizeLevelOneContext(dassQuestions, 1, 'Kannst du sagen, dass das Team die Aufgabe ___?')
  const dassQuestionFailures = validateCandidate(dassQuestions, spec, harness.policy)
  assert.ok(dassQuestionFailures.some((failure) => failure.includes('requiere al menos 2 preguntas matrices con ob (0)')))
  assert.ok(!dassQuestionFailures.some((failure) => failure.includes('contextos interrogativos') || failure.includes('runtimeFingerprint no coincide')))

  const allEmbedded = structuredClone(candidate)
  const embeddedConnectors = ['dass', 'dass', 'weil', 'obwohl', 'dass', 'wenn', 'weil', 'obwohl', 'ob', 'ob']
  embeddedConnectors.forEach((connector, index) => {
    const context = index < 2
      ? `Weißt du, ${connector} das Team die Aufgabe ___?`
      : `Die Leitung bestätigt, ${connector} das Team die Aufgabe ___.`
    synchronizeLevelOneContext(allEmbedded, index, context)
  })
  assert.ok(allEmbedded.runtime.choice.every((item) => levelOnePlacement(item.context) === 'embedded'))
  const allEmbeddedFailures = validateCandidate(allEmbedded, spec, harness.policy)
  assert.ok(allEmbeddedFailures.some((failure) => failure.includes('requiere al menos 2 subordinadas objetivo antepuestas (0)')))
  assert.ok(!allEmbeddedFailures.some((failure) => failure.includes('contextos interrogativos') || failure.includes('runtimeFingerprint no coincide')))

  const onlyDass = structuredClone(candidate)
  for (const item of onlyDass.runtime.choice) {
    const index = onlyDass.runtime.choice.indexOf(item)
    synchronizeLevelOneContext(onlyDass, index, 'Mia berichtet, dass sie die Aufgabe ___. ')
  }
  const onlyDassFailures = validateCandidate(onlyDass, spec, harness.policy)
  assert.ok(onlyDassFailures.some((failure) => failure.includes('requiere al menos 4 conectores distintos (1)')))
  assert.ok(onlyDassFailures.some((failure) => failure.includes('usa dass 10/3')))
  assert.ok(!onlyDassFailures.some((failure) => failure.includes('runtimeFingerprint no coincide')))

  const truncated = structuredClone(candidate)
  const choice = truncated.runtime.choice[0]
  const answerIndex = choice.options.indexOf(choice.answer)
  choice.answer = 'gemacht'
  choice.options[answerIndex] = 'gemacht'
  const annotation = truncated.annotations.find((entry) => entry.level === 1 && entry.itemId === choice.id)
  annotation.accepted = ['gemacht']
  annotation.expectedUnit = 'gemacht'
  annotation.runtimeFingerprint = fingerprint(choice)
  const truncatedFailures = validateCandidate(truncated, spec, harness.policy)
  assert.ok(truncatedFailures.some((failure) => failure.includes('no contiene la unidad verbal completa (2 palabras)')))
  assert.ok(!truncatedFailures.some((failure) => failure.includes('accepted no coincide') || failure.includes('runtimeFingerprint no coincide')))
})

test('state is derived from matching evidence and stale evidence is invalidated', () => {
  const formId = 'perfekt-haben'
  const spec = harness.forms[formId]
  const fingerprints = fingerprintsForForm(harness, GERMAN_STRUCTURE_QUEST, formId)
  const requiredRoles = requiredRoleIds(harness.policy, formId)
  const candidate = validCandidate(formId)
  fingerprints.contentFingerprint = fingerprint(candidate.runtime)
  const candidateFingerprint = fingerprint(candidate)
  const pass = (role) => ({
    schemaVersion: 1,
    role,
    formId,
    verdict: 'PASS',
    candidateFingerprint,
    harnessFingerprint: fingerprints.harnessFingerprint,
    specFingerprint: fingerprints.specFingerprint,
    promptFingerprint: fingerprints.promptFingerprint,
    checks: [],
    findings: [],
    generatedAt: '2026-09-05T00:00:00.000Z',
  })
  const workOrder = {
    formId,
    baselineContentFingerprint: fingerprints.contentFingerprint,
    harnessFingerprint: fingerprints.harnessFingerprint,
    specFingerprint: fingerprints.specFingerprint,
    promptFingerprint: fingerprints.promptFingerprint,
  }
  const author = {
    ...pass('author'),
    baselineContentFingerprint: fingerprints.contentFingerprint,
    candidate,
  }

  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: {}, requiredRoles, spec, workOrder: null }), 'NEEDS_DRAFT')
  assert.equal(deriveState({
    fingerprints,
    policy: harness.policy,
    reports: {},
    requiredRoles,
    spec,
    workOrder: { ...workOrder, promptFingerprint: '0'.repeat(64) },
  }), 'BLOCKED_SCHEMA')
  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: { author }, requiredRoles, spec, workOrder }), 'BLOCKED_LINGUISTIC')

  const linguistic = { author, morphology: pass('morphology'), auxiliary: pass('auxiliary') }
  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: linguistic, requiredRoles, spec, workOrder }), 'BLOCKED_PEDAGOGY')

  const reviewed = { ...linguistic, pedagogy: pass('pedagogy'), adversary: pass('adversary') }
  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: reviewed, requiredRoles, spec, workOrder }), 'BLOCKED_RUNTIME')

  const complete = {
    ...reviewed,
    integrator: { ...pass('integrator'), runtimeContentFingerprint: fingerprints.contentFingerprint },
    warden: pass('warden'),
  }
  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: complete, requiredRoles, spec, workOrder }), 'READY_FOR_HUMAN_REVIEW')
  assert.equal(deriveState({ approval: fingerprints, fingerprints, policy: harness.policy, reports: complete, requiredRoles, spec, workOrder }), 'APPROVED')

  const stale = structuredClone(complete)
  stale.morphology.candidateFingerprint = '0'.repeat(64)
  assert.equal(deriveState({ fingerprints, policy: harness.policy, reports: stale, requiredRoles, spec, workOrder }), 'BLOCKED_LINGUISTIC')
})

test('materialized coverage uses the active German mechanics', () => {
  for (const form of GERMAN_STRUCTURE_QUEST.forms) {
    const content = materializeFormContent(GERMAN_STRUCTURE_QUEST, form.id)
    assert.equal(content.choice.length, 10)
    assert.equal(content.micro.length, 10)
    assert.equal(content.long.length, 10)
    assert.equal(content.error.length, 10)
    assert.equal(content.separation.length, 10)
    assert.equal(content.finalStories.length, 1)
    assert.ok(content.finalStories[0].gaps.length >= 10)
  }
})
