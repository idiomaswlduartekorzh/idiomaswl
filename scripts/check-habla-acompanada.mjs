import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import {
  ROLEPLAY_LEVELS,
  ROLEPLAY_LANGUAGES,
  ROLEPLAY_PUBLISHED_FLOORS,
  ROLEPLAY_SETS,
  ROLEPLAY_TARGET_SET_KEYS,
  ROLEPLAY_TARGET_SET_SIZE,
  roleplaySetKey,
} from '../src/data/practica/habla-acompanado/index.ts'
import { ROLEPLAY_DRAFT_SETS } from '../src/data/practica/habla-acompanado/drafts/index.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []
const grammarCache = new Map()

function fail(message) {
  failures.push(message)
}

function unique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  if (duplicates.length) fail(`${label} repetidos: ${[...new Set(duplicates)].join(', ')}`)
}

function countBy(values) {
  return values.reduce((counts, value) => {
    counts[value] = (counts[value] ?? 0) + 1
    return counts
  }, {})
}

function roleProseWordCount(role, language) {
  const text = [
    ...role.briefing,
    ...role.prose.flatMap((block) => [block.text ?? '', ...(block.items ?? [])]),
    role.toolkit,
    role.success,
  ].join(' ').replace(/[`*_]/g, ' ')
  const segmenter = new Intl.Segmenter(ROLEPLAY_LANGUAGES[language].htmlLang, { granularity: 'word' })
  return [...segmenter.segment(text)].filter((segment) => segment.isWordLike).length
}

function isAlphabetical(values, locale) {
  const expected = [...values].sort((a, b) => a.localeCompare(b, locale, { sensitivity: 'base' }))
  return values.every((value, index) => value === expected[index])
}

function grammarSlugs(language, level) {
  const key = `${language}-${level}`
  if (grammarCache.has(key)) return grammarCache.get(key)

  const directory = path.join(root, 'src/data/grammar', language, level)
  const slugs = new Set()
  if (!fs.existsSync(directory)) {
    fail(`No existe el registro de gramática ${language}/${level}.`)
    grammarCache.set(key, slugs)
    return slugs
  }

  for (const file of fs.readdirSync(directory)) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue
    const source = fs.readFileSync(path.join(directory, file), 'utf8')
    const match = source.match(/\bslug:\s*['"]([^'"]+)['"]/)
    if (match) slugs.add(match[1])
  }
  grammarCache.set(key, slugs)
  return slugs
}

function validateCompleteSetDistribution(set, where) {
  const initiators = countBy(set.scenarios.map((scenario) => scenario.initiator))
  const powers = countBy(set.scenarios.map((scenario) => scenario.power))
  const outcomes = countBy(set.scenarios.map((scenario) => scenario.outcome))
  const cards = countBy(set.scenarios.map((scenario) => scenario.card.toRole))

  for (const role of ['a', 'b']) {
    if ((initiators[role] ?? 0) < 8 || (initiators[role] ?? 0) > 12) {
      fail(`${where}: el rol ${role.toUpperCase()} inicia ${initiators[role] ?? 0} veces; debe iniciar entre 8 y 12.`)
    }
    if ((cards[role] ?? 0) < 8 || (cards[role] ?? 0) > 12) {
      fail(`${where}: el rol ${role.toUpperCase()} recibe ${cards[role] ?? 0} cartas; debe recibir entre 8 y 12.`)
    }
  }
  if ((powers['a>b'] ?? 0) < 6 || (powers['b>a'] ?? 0) < 6) {
    fail(`${where}: el poder debe favorecer a cada rol en al menos 6 escenarios.`)
  }
  if ((outcomes['acuerdo-parcial'] ?? 0) < 3) fail(`${where}: necesita al menos 3 acuerdos parciales.`)
  if ((outcomes['sin-acuerdo'] ?? 0) < 2) fail(`${where}: necesita al menos 2 cierres sin acuerdo.`)
  if ((outcomes.aplazado ?? 0) < 2) fail(`${where}: necesita al menos 2 cierres aplazados.`)
  if ((outcomes.acuerdo ?? 0) > 13) fail(`${where}: no puede tener más de 13 acuerdos completos.`)
}

unique(ROLEPLAY_TARGET_SET_KEYS, 'Combinaciones objetivo')
if (ROLEPLAY_TARGET_SET_KEYS.length !== 24) {
  fail(`La matriz objetivo debe tener 24 conjuntos; tiene ${ROLEPLAY_TARGET_SET_KEYS.length}.`)
}

const setKeys = ROLEPLAY_SETS.map((set) => roleplaySetKey(set.language, set.level))
unique(setKeys, 'Conjuntos publicados')
unique(ROLEPLAY_DRAFT_SETS.map((set) => roleplaySetKey(set.language, set.level)), 'Conjuntos en borrador')

for (const floorKey of Object.keys(ROLEPLAY_PUBLISHED_FLOORS)) {
  if (!setKeys.includes(floorKey)) {
    fail(`El conjunto publicado ${floorKey} desapareció del registro vivo.`)
  }
}

const validationSets = [
  ...ROLEPLAY_SETS.map((set) => ({ set, published: true })),
  ...ROLEPLAY_DRAFT_SETS.map((set) => ({ set, published: false })),
]

for (const { set, published } of validationSets) {
  const key = roleplaySetKey(set.language, set.level)
  const where = `${published ? 'Conjunto' : 'Borrador'} ${key}`
  const floor = ROLEPLAY_PUBLISHED_FLOORS[key]
  const allowedCounts = floor === undefined ? [ROLEPLAY_TARGET_SET_SIZE] : [floor, ROLEPLAY_TARGET_SET_SIZE]

  if (!ROLEPLAY_TARGET_SET_KEYS.includes(key)) fail(`${where}: no pertenece a la matriz objetivo.`)
  if (published && floor === undefined) {
    fail(`${where}: está publicado pero no declara un piso monotónico.`)
  }
  if (published && !allowedCounts.includes(set.scenarios.length)) {
    fail(`${where}: tiene ${set.scenarios.length} escenarios; las cuentas publicables son ${[...new Set(allowedCounts)].join(' o ')}.`)
  }
  if (published && floor !== undefined && set.scenarios.length < floor) {
    fail(`${where}: cayó por debajo del piso publicado de ${floor}.`)
  }
  if (!published && (set.scenarios.length < 1 || set.scenarios.length > ROLEPLAY_TARGET_SET_SIZE)) {
    fail(`${where}: debe contener entre 1 y ${ROLEPLAY_TARGET_SET_SIZE} escenarios durante la autoría.`)
  }
  if (set.toolkit.language !== set.language || set.toolkit.level !== set.level) {
    fail(`${where}: la caja no pertenece al mismo idioma y nivel.`)
  }
  if (!set.toolkit.blocks.length) fail(`${where}: la caja de herramientas está vacía.`)
  unique(set.toolkit.blocks.map((block) => block.number), `${where}: números de la caja`)
  for (const block of set.toolkit.blocks) {
    if (block.rows.length < 3) fail(`${where}, caja ${block.number}: tiene menos de 3 formas de apoyo.`)
    unique(block.rows.map((row) => row.form), `${where}, caja ${block.number}: formas`)
  }

  unique(set.scenarios.map((scenario) => scenario.id), `${where}: ids de escenario`)
  unique(set.scenarios.map((scenario) => scenario.slug), `${where}: slugs de escenario`)
  unique(set.scenarios.map((scenario) => scenario.sequence), `${where}: secuencias de escenario`)
  const actualSequence = set.scenarios.map((scenario) => scenario.sequence).sort((a, b) => a - b)
  const expectedSequence = Array.from({ length: set.scenarios.length }, (_, index) => index + 1)
  if (published && actualSequence.join(',') !== expectedSequence.join(',')) {
    fail(`${where}: la secuencia debe ser 1..${set.scenarios.length}; es ${actualSequence.join(',')}.`)
  }
  if (!published && actualSequence.some((sequence) => sequence < 1 || sequence > ROLEPLAY_TARGET_SET_SIZE)) {
    fail(`${where}: las secuencias de borrador deben quedar entre 1 y ${ROLEPLAY_TARGET_SET_SIZE}; son ${actualSequence.join(',')}.`)
  }
  if (!published && set.scenarios.length === ROLEPLAY_TARGET_SET_SIZE && actualSequence.join(',') !== expectedSequence.join(',')) {
    fail(`${where}: al llegar a 20 la secuencia debe ser 1..20; es ${actualSequence.join(',')}.`)
  }

  for (const scenario of set.scenarios) {
    const scenarioWhere = `${where}, escenario ${scenario.sequence} (${scenario.slug})`
    const range = ROLEPLAY_LEVELS[set.level]

    if (scenario.language !== set.language || scenario.level !== set.level) {
      fail(`${scenarioWhere}: idioma o nivel distinto del conjunto.`)
    }
    if (scenario.minutes < range.minMinutes || scenario.minutes > range.maxMinutes) {
      fail(`${scenarioWhere}: ${scenario.minutes} minutos queda fuera del rango ${range.label} ${range.minMinutes}–${range.maxMinutes}.`)
    }
    if (scenario.turnsPerRole < range.minTurns || scenario.turnsPerRole > range.maxTurns) {
      fail(`${scenarioWhere}: ${scenario.turnsPerRole} turnos queda fuera del rango ${range.label} ${range.minTurns}–${range.maxTurns}.`)
    }
    if (scenario.roles.length !== 2 || scenario.roles[0]?.id !== 'a' || scenario.roles[1]?.id !== 'b') {
      fail(`${scenarioWhere}: debe declarar exactamente los roles A y B, en ese orden.`)
    }
    if (scenario.card.afterTurn < 3 || scenario.card.afterTurn > 6) {
      fail(`${scenarioWhere}: la carta entra en el turno global ${scenario.card.afterTurn}; debe entrar entre 3 y 6.`)
    }
    if (!scenario.roles.some((role) => role.id === scenario.card.toRole)) fail(`${scenarioWhere}: la carta apunta a un rol inexistente.`)
    if (!scenario.card.openWhen.length || !scenario.card.blocks.length) fail(`${scenarioWhere}: la carta no tiene disparador o contenido.`)
    if (!scenario.closing.length) fail(`${scenarioWhere}: no tiene criterio de cierre.`)
    if (scenario.debrief.length < 3 || scenario.debrief.length > 4) {
      fail(`${scenarioWhere}: debe tener 3–4 preguntas de debrief; tiene ${scenario.debrief.length}.`)
    }
    if (scenario.speechActs.length < 2) fail(`${scenarioWhere}: declara menos de 2 actos de habla.`)
    unique(scenario.speechActs, `${scenarioWhere}: actos de habla`)

    for (const role of scenario.roles) {
      const roleWhere = `${scenarioWhere}, rol ${role.id.toUpperCase()}`
      const proseLimit = set.level === 'b1' ? 600 : 450
      const tableLimits = set.level === 'b1'
        ? { facts: 14, vocabMin: 10, vocabMax: 12, exponentsMin: 8, exponentsMax: 10 }
        : { facts: 10, vocabMin: 8, vocabMax: 10, exponentsMin: 6, exponentsMax: 9 }
      const proseWords = roleProseWordCount(role, set.language)
      if (role.briefing.length < 2) fail(`${roleWhere}: el briefing está incompleto.`)
      if (role.prose.length < 5) fail(`${roleWhere}: faltan piezas de situación, objetivo o asimetría.`)
      if (!role.facts.length) fail(`${roleWhere}: no tiene datos duros.`)
      if (proseWords > proseLimit) fail(`${roleWhere}: la prosa tiene ${proseWords} palabras; el máximo de ${range.label} es ${proseLimit}.`)
      if (role.facts.length > tableLimits.facts) fail(`${roleWhere}: tiene ${role.facts.length} datos; el máximo de ${range.label} es ${tableLimits.facts}.`)
      if (role.vocab.length < tableLimits.vocabMin || role.vocab.length > tableLimits.vocabMax) {
        fail(`${roleWhere}: debe tener ${tableLimits.vocabMin}–${tableLimits.vocabMax} palabras; tiene ${role.vocab.length}.`)
      }
      if (role.exponents.length < tableLimits.exponentsMin || role.exponents.length > tableLimits.exponentsMax) {
        fail(`${roleWhere}: debe tener ${tableLimits.exponentsMin}–${tableLimits.exponentsMax} exponentes; tiene ${role.exponents.length}.`)
      }
      if (role.exponents.length > scenario.turnsPerRole) fail(`${roleWhere}: tiene más exponentes (${role.exponents.length}) que turnos declarados (${scenario.turnsPerRole}).`)
      if (!isAlphabetical(role.exponents.map((entry) => entry.purpose), ROLEPLAY_LANGUAGES[set.language].htmlLang)) {
        fail(`${roleWhere}: los exponentes no están ordenados alfabéticamente por función.`)
      }
      if (!role.success.trim()) fail(`${roleWhere}: no declara su criterio de éxito.`)
      unique(role.vocab.map((entry) => entry.word), `${roleWhere}: vocabulario`)
      unique(role.exponents.map((entry) => entry.form), `${roleWhere}: exponentes`)
    }

    if (!scenario.grammarReferences.length) fail(`${scenarioWhere}: no tiene referencias gramaticales.`)
    for (const ref of scenario.grammarReferences) {
      if (!grammarSlugs(set.language, ref.level).has(ref.slug)) {
        fail(`${scenarioWhere}: la referencia ${set.language}/${ref.level}/${ref.slug} no existe.`)
      }
    }
  }

  if (set.scenarios.length === ROLEPLAY_TARGET_SET_SIZE) validateCompleteSetDistribution(set, where)

  if (published) {
    const routeBase = `src/app/(site)/practica/${set.language}/${set.level}/habla`
    const protectedRoutes = [
      `${routeBase}/page.tsx`,
      `${routeBase}/solo/page.tsx`,
      `${routeBase}/acompanada/page.tsx`,
      `${routeBase}/acompanada/herramientas/page.tsx`,
      `${routeBase}/acompanada/[slug]/page.tsx`,
      `${routeBase}/acompanada/[slug]/[role]/page.tsx`,
    ]
    for (const route of protectedRoutes) {
      if (!fs.existsSync(path.join(root, route))) fail(`${where}: falta la ruta pública ${route}.`)
    }
  }
}

const sharedExperiencePath = path.join(root, 'src/components/practica/roleplay/RoleplayExperience.tsx')
const sharedExperience = fs.readFileSync(sharedExperiencePath, 'utf8')
if (sharedExperience.includes('/practica/ingles/a2')) {
  fail('El componente compartido conserva una ruta clavada a /practica/ingles/a2.')
}

if (failures.length) {
  console.error('Habla acompañada no supera sus puertas estructurales:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const scenarios = ROLEPLAY_SETS.reduce((sum, set) => sum + set.scenarios.length, 0)
  const roles = ROLEPLAY_SETS.reduce(
    (sum, set) => sum + set.scenarios.reduce((setSum, scenario) => setSum + scenario.roles.length, 0),
    0,
  )
  const references = ROLEPLAY_SETS.reduce(
    (sum, set) => sum + set.scenarios.reduce((setSum, scenario) => setSum + scenario.grammarReferences.length, 0),
    0,
  )
  const target = ROLEPLAY_TARGET_SET_KEYS.length * ROLEPLAY_TARGET_SET_SIZE
  const draftScenarios = ROLEPLAY_DRAFT_SETS.reduce((sum, set) => sum + set.scenarios.length, 0)
  const draftSummary = draftScenarios ? ` Borradores validados fuera del registro: ${draftScenarios}.` : ''
  console.log(`Habla acompañada íntegra: ${ROLEPLAY_SETS.length}/24 conjuntos, ${scenarios}/${target} escenarios, ${roles} roles y ${references} referencias verificadas.${draftSummary}`)
}
