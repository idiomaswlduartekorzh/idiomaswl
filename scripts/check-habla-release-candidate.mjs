import process from 'node:process'
import { ROLEPLAY_INGLES_A2_CANDIDATE } from '../src/data/practica/habla-acompanado/drafts/index.ts'
import { ENGLISH_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ingles-a2.ts'

const progressOnly = process.argv.includes('--progress')
const failures = []
const expectedProfiles = ['solid-solid', 'solid-weak', 'weak-weak', 'quiet', 'shortcut']
const newSequences = new Set([4, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20])
const newScenarios = ROLEPLAY_INGLES_A2_CANDIDATE.filter((scenario) => newSequences.has(scenario.sequence))

function fail(message) {
  failures.push(message)
}

const auditsBySlug = new Map(ENGLISH_A2_RELEASE_AUDITS.map((audit) => [audit.slug, audit]))
if (auditsBySlug.size !== ENGLISH_A2_RELEASE_AUDITS.length) fail('Hay slugs de auditoría repetidos.')

for (const scenario of newScenarios) {
  const audit = auditsBySlug.get(scenario.slug)
  if (!audit) {
    fail(`${scenario.slug}: falta auditoría de cinco perfiles.`)
    continue
  }
  if (audit.verdict !== 'pass') fail(`${scenario.slug}: el veredicto sigue en revise.`)
  const profiles = audit.runs.map((run) => run.profile)
  for (const profile of expectedProfiles) {
    if (profiles.filter((value) => value === profile).length !== 1) fail(`${scenario.slug}: necesita exactamente una corrida ${profile}.`)
  }
  for (const run of audit.runs) {
    const where = `${scenario.slug}/${run.profile}`
    if (run.globalTurns < 6) fail(`${where}: se resolvió en ${run.globalTurns} turnos globales; el mínimo es 6.`)
    if (run.complicationAt !== scenario.card.afterTurn) fail(`${where}: abrió la carta en ${run.complicationAt}; debía ser ${scenario.card.afterTurn}.`)
    if (!run.noLeak) fail(`${where}: registra filtración entre fichas.`)
    if (!run.reachesClosing) fail(`${where}: no llega al criterio de cierre.`)
    if (run.requiredPieces.length < 4) fail(`${where}: solo produjo ${run.requiredPieces.length} piezas obligatorias.`)
    if (run.profile === 'solid-solid' || run.profile === 'weak-weak') {
      const totalWords = run.wordsA + run.wordsB
      const shareA = totalWords ? run.wordsA / totalWords : 0
      if (shareA < 0.4 || shareA > 0.6) fail(`${where}: reparto por palabras A ${(shareA * 100).toFixed(1)} %, fuera de 40–60 %.`)
    }
  }
}

for (const audit of ENGLISH_A2_RELEASE_AUDITS) {
  if (!newScenarios.some((scenario) => scenario.slug === audit.slug)) fail(`${audit.slug}: auditoría huérfana; no pertenece a los 12 escenarios nuevos.`)
}

const audited = newScenarios.filter((scenario) => auditsBySlug.has(scenario.slug)).length
if (failures.length && !progressOnly) {
  console.error(`Candidato inglés A2 no liberable: ${audited}/${newScenarios.length} escenarios auditados.`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else if (failures.length) {
  console.log(`Auditoría de release en progreso: ${audited}/${newScenarios.length} escenarios; faltan ${newScenarios.length - audited}.`)
} else {
  console.log(`Candidato inglés A2 liberable: ${newScenarios.length}/${newScenarios.length} escenarios nuevos pasan cinco perfiles; 20 prácticas listas para promoción.`)
}
