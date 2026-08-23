import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { ROLEPLAY_INGLES_A2 } from '../src/data/practica/habla-acompanado/ingles-a2.ts'
import { TOOLKIT_INGLES_A2 } from '../src/data/practica/habla-acompanado/toolkit-ingles-a2.ts'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

function fail(message) {
  failures.push(message)
}

function unique(values, label) {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index)
  if (duplicates.length) fail(`${label} repetidos: ${[...new Set(duplicates)].join(', ')}`)
}

function grammarSlugs(level) {
  const directory = path.join(root, 'src/data/grammar/ingles', level)
  const slugs = new Set()
  for (const file of fs.readdirSync(directory)) {
    if (!file.endsWith('.ts') || file === 'index.ts') continue
    const source = fs.readFileSync(path.join(directory, file), 'utf8')
    const match = source.match(/\bslug:\s*['"]([^'"]+)['"]/)
    if (match) slugs.add(match[1])
  }
  return slugs
}

const grammarByLevel = {
  a1: grammarSlugs('a1'),
  a2: grammarSlugs('a2'),
  b1: grammarSlugs('b1'),
}

if (ROLEPLAY_INGLES_A2.length !== 8) {
  fail(`El piloto debe tener 8 escenarios; tiene ${ROLEPLAY_INGLES_A2.length}.`)
}

unique(ROLEPLAY_INGLES_A2.map((scenario) => scenario.id), 'Ids de escenario')
unique(ROLEPLAY_INGLES_A2.map((scenario) => scenario.slug), 'Slugs de escenario')
unique(ROLEPLAY_INGLES_A2.map((scenario) => scenario.sequence), 'Secuencias de escenario')

for (const scenario of ROLEPLAY_INGLES_A2) {
  const where = `Escenario ${scenario.sequence} (${scenario.slug})`

  if (scenario.language !== 'ingles' || scenario.level !== 'a2') fail(`${where}: no pertenece al piloto inglés A2.`)
  if (scenario.minutes < 5 || scenario.minutes > 8) fail(`${where}: ${scenario.minutes} minutos queda fuera del rango A2 5–8.`)
  if (scenario.turnsPerRole < 6 || scenario.turnsPerRole > 9) fail(`${where}: ${scenario.turnsPerRole} turnos por rol queda fuera del rango A2 6–9.`)
  if (scenario.roles.length !== 2 || scenario.roles[0]?.id !== 'a' || scenario.roles[1]?.id !== 'b') {
    fail(`${where}: debe declarar exactamente los roles A y B, en ese orden.`)
  }
  if (scenario.card.afterTurn < 3 || scenario.card.afterTurn > 6) fail(`${where}: la carta entra en el turno global ${scenario.card.afterTurn}; debe entrar entre 3 y 6.`)
  if (!scenario.roles.some((role) => role.id === scenario.card.toRole)) fail(`${where}: la carta apunta a un rol inexistente.`)
  if (!scenario.card.openWhen.length || !scenario.card.blocks.length) fail(`${where}: la carta no tiene disparador o contenido.`)
  if (!scenario.closing.length) fail(`${where}: no tiene criterio de cierre.`)
  if (scenario.debrief.length < 3 || scenario.debrief.length > 4) fail(`${where}: debe tener 3–4 preguntas de debrief; tiene ${scenario.debrief.length}.`)
  if (scenario.speechActs.length < 2) fail(`${where}: declara menos de 2 actos de habla.`)
  unique(scenario.speechActs, `${where}: actos de habla`)

  for (const role of scenario.roles) {
    const roleWhere = `${where}, rol ${role.id.toUpperCase()}`
    if (role.briefing.length < 2) fail(`${roleWhere}: el briefing está incompleto.`)
    if (role.prose.length < 5) fail(`${roleWhere}: faltan piezas de situación, objetivo o asimetría.`)
    if (!role.facts.length) fail(`${roleWhere}: no tiene datos duros.`)
    if (role.vocab.length < 8 || role.vocab.length > 10) fail(`${roleWhere}: debe tener 8–10 palabras; tiene ${role.vocab.length}.`)
    if (role.exponents.length < 6 || role.exponents.length > 9) fail(`${roleWhere}: debe tener 6–9 exponentes; tiene ${role.exponents.length}.`)
    if (!role.success.trim()) fail(`${roleWhere}: no declara su criterio de éxito.`)
    unique(role.vocab.map((entry) => entry.word), `${roleWhere}: vocabulario`)
    unique(role.exponents.map((entry) => entry.form), `${roleWhere}: exponentes`)
  }

  if (!scenario.grammarReferences.length) fail(`${where}: no tiene referencias gramaticales.`)
  for (const ref of scenario.grammarReferences) {
    if (!grammarByLevel[ref.level].has(ref.slug)) {
      fail(`${where}: la referencia ${ref.level}/${ref.slug} no existe en el registro de gramática.`)
    }
  }
}

if (TOOLKIT_INGLES_A2.blocks.length !== 8) {
  fail(`La caja A2 debe tener 8 bloques; tiene ${TOOLKIT_INGLES_A2.blocks.length}.`)
}
unique(TOOLKIT_INGLES_A2.blocks.map((block) => block.number), 'Números de la caja de herramientas')
for (const block of TOOLKIT_INGLES_A2.blocks) {
  if (block.rows.length < 3) fail(`Caja A2, bloque ${block.number}: tiene menos de 3 formas de apoyo.`)
  unique(block.rows.map((row) => row.form), `Caja A2, bloque ${block.number}: formas`)
}

const protectedRoutes = [
  'src/app/(site)/practica/ingles/a2/habla/page.tsx',
  'src/app/(site)/practica/ingles/a2/habla/solo/page.tsx',
  'src/app/(site)/practica/ingles/a2/habla/acompanada/page.tsx',
  'src/app/(site)/practica/ingles/a2/habla/acompanada/[slug]/page.tsx',
  'src/app/(site)/practica/ingles/a2/habla/acompanada/[slug]/[role]/page.tsx',
]
for (const route of protectedRoutes) {
  if (!fs.existsSync(path.join(root, route))) fail(`Falta la ruta pública: ${route}`)
}

if (failures.length) {
  console.error('Habla acompañada no supera sus puertas estructurales:')
  for (const failure of failures) console.error(`- ${failure}`)
  process.exitCode = 1
} else {
  const roles = ROLEPLAY_INGLES_A2.reduce((sum, scenario) => sum + scenario.roles.length, 0)
  const references = ROLEPLAY_INGLES_A2.reduce((sum, scenario) => sum + scenario.grammarReferences.length, 0)
  console.log(`Habla acompañada íntegra: ${ROLEPLAY_INGLES_A2.length} escenarios, ${roles} roles y ${references} referencias gramaticales verificadas.`)
}
