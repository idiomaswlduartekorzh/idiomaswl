import process from 'node:process'
import {
  ROLEPLAY_INGLES_A1_CANDIDATE,
  ROLEPLAY_INGLES_A2_CANDIDATE,
  ROLEPLAY_INGLES_B1_CANDIDATE,
  ROLEPLAY_COREANO_A2_CANDIDATE,
  ROLEPLAY_FRANCES_A2_CANDIDATE,
  ROLEPLAY_ITALIANO_A2_CANDIDATE,
  ROLEPLAY_PORTUGUES_A2_CANDIDATE,
  ROLEPLAY_ALEMAN_A2_CANDIDATE,
  ROLEPLAY_RUSO_A2_CANDIDATE,
  ROLEPLAY_JAPONES_A2_CANDIDATE,
} from '../src/data/practica/habla-acompanado/drafts/index.ts'
import { KOREAN_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-coreano-a2.ts'
import { ENGLISH_A1_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ingles-a1.ts'
import { ENGLISH_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ingles-a2.ts'
import { ENGLISH_B1_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ingles-b1.ts'
import { FRENCH_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-frances-a2.ts'
import { ITALIAN_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-italiano-a2.ts'
import { PORTUGUESE_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-portugues-a2.ts'
import { GERMAN_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-aleman-a2.ts'
import { RUSSIAN_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-ruso-a2.ts'
import { JAPANESE_A2_RELEASE_AUDITS } from '../src/data/practica/habla-acompanado/drafts/audit-japones-a2.ts'

const progressOnly = process.argv.includes('--progress')
const targetArg = process.argv.find((argument) => argument.startsWith('--target='))
const target = targetArg?.slice('--target='.length) ?? 'ingles-a2'
const failures = []
const expectedProfiles = ['solid-solid', 'solid-weak', 'weak-weak', 'quiet', 'shortcut']
const configurations = {
  'ingles-a1': {
    label: 'inglés A1',
    scenarios: ROLEPLAY_INGLES_A1_CANDIDATE,
    audits: ENGLISH_A1_RELEASE_AUDITS,
  },
  'ingles-a2': {
    label: 'inglés A2',
    scenarios: ROLEPLAY_INGLES_A2_CANDIDATE.filter((scenario) => new Set([4, 7, 8, 11, 12, 14, 15, 16, 17, 18, 19, 20]).has(scenario.sequence)),
    audits: ENGLISH_A2_RELEASE_AUDITS,
  },
  'ingles-b1': {
    label: 'inglés B1',
    scenarios: ROLEPLAY_INGLES_B1_CANDIDATE,
    audits: ENGLISH_B1_RELEASE_AUDITS,
  },
  'coreano-a2': {
    label: 'coreano A2',
    scenarios: ROLEPLAY_COREANO_A2_CANDIDATE,
    audits: KOREAN_A2_RELEASE_AUDITS,
  },
  'frances-a2': {
    label: 'francés A2',
    scenarios: ROLEPLAY_FRANCES_A2_CANDIDATE,
    audits: FRENCH_A2_RELEASE_AUDITS,
  },
  'italiano-a2': {
    label: 'italiano A2',
    scenarios: ROLEPLAY_ITALIANO_A2_CANDIDATE,
    audits: ITALIAN_A2_RELEASE_AUDITS,
  },
  'portugues-a2': {
    label: 'portugués A2',
    scenarios: ROLEPLAY_PORTUGUES_A2_CANDIDATE,
    audits: PORTUGUESE_A2_RELEASE_AUDITS,
  },
  'aleman-a2': {
    label: 'alemán A2',
    scenarios: ROLEPLAY_ALEMAN_A2_CANDIDATE,
    audits: GERMAN_A2_RELEASE_AUDITS,
  },
  'ruso-a2': {
    label: 'ruso A2',
    scenarios: ROLEPLAY_RUSO_A2_CANDIDATE,
    audits: RUSSIAN_A2_RELEASE_AUDITS,
  },
  'japones-a2': {
    label: 'japonés A2',
    scenarios: ROLEPLAY_JAPONES_A2_CANDIDATE,
    audits: JAPANESE_A2_RELEASE_AUDITS,
  },
}
const configuration = configurations[target]
if (!configuration) {
  console.error(`Target de release desconocido: ${target}. Usa ingles-a1, ingles-a2, ingles-b1, coreano-a2, frances-a2, italiano-a2, portugues-a2, aleman-a2, ruso-a2 o japones-a2.`)
  process.exit(1)
}
const newScenarios = configuration.scenarios

function fail(message) {
  failures.push(message)
}

const auditsBySlug = new Map(configuration.audits.map((audit) => [audit.slug, audit]))
if (auditsBySlug.size !== configuration.audits.length) fail('Hay slugs de auditoría repetidos.')

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

for (const audit of configuration.audits) {
  if (!newScenarios.some((scenario) => scenario.slug === audit.slug)) fail(`${audit.slug}: auditoría huérfana; no pertenece al candidato ${configuration.label}.`)
}

const audited = newScenarios.filter((scenario) => auditsBySlug.has(scenario.slug)).length
if (failures.length && !progressOnly) {
  console.error(`Candidato ${configuration.label} no liberable: ${audited}/${newScenarios.length} escenarios auditados.`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else if (failures.length) {
  console.log(`Auditoría de release en progreso: ${audited}/${newScenarios.length} escenarios; faltan ${newScenarios.length - audited}.`)
} else {
  console.log(`Candidato ${configuration.label} liberable: ${newScenarios.length}/${newScenarios.length} escenarios pasan cinco perfiles; ${newScenarios.length} prácticas listas para promoción.`)
}
