import type {
  RoleId,
  RoleplayGrammarReference,
  RoleplayRole,
  RoleplayScenario,
  SpeechAct,
} from '../types.ts'

type RoleSeed = {
  name: string
  nameEs: string
  headline: string
  address: 'Вы' | 'ты'
  situation: string
  goal: string
  constraints: [string, string, string]
  hidden: [string, string, string]
  stakes: string
  facts: RoleplayRole['facts']
  vocab: RoleplayRole['vocab']
  toolkit: string
  exponents: RoleplayRole['exponents']
  success: string
}

type GrammarSeed = { slug: keyof typeof GRAMMAR_TITLES; rationale: string }

type ScenarioSeed = {
  slug: string
  sequence: number
  title: string
  titleTarget: string
  setting: string
  settingEs: string
  speechActs: SpeechAct[]
  power: RoleplayScenario['power']
  initiator: RoleId
  outcome: RoleplayScenario['outcome']
  minutes: number
  turnsPerRole: number
  roles: [RoleSeed, RoleSeed]
  card: {
    toRole: RoleId
    afterTurn: number
    before: string
    title: string
    rows: string[][]
    note: string
  }
  closingItems: string[]
  debrief: string[]
  grammar: GrammarSeed[]
}

const GRAMMAR_TITLES = {
  'acusativo-movimiento': 'Acusativo de movimiento en ruso A2',
  'adverbios-tiempo': 'Adverbios de tiempo en ruso A2',
  'aspecto-verbal': 'Aspecto verbal en ruso A2',
  comparativos: 'Comparativos en ruso A2',
  condicional: 'Condicional en ruso A2',
  'dativo-uso': 'Dativo en ruso A2',
  'futuro-imperfectivo': 'Futuro imperfectivo en ruso A2',
  'futuro-perfectivo': 'Futuro perfectivo en ruso A2',
  'genitivo-cantidad': 'Genitivo de cantidad y negación en ruso A2',
  imperativo: 'Imperativo en ruso A2',
  'instrumental-uso': 'Instrumental en ruso A2',
  'oraciones-subordinadas': 'Oraciones subordinadas en ruso A2',
  'pasado-verbos': 'Pasado de los verbos en ruso A2',
  'plurales-irregulares': 'Plurales irregulares en ruso A2',
  'prepositivo-avanzado': 'Prepositivo avanzado en ruso A2',
  'pronombres-reflexivos': 'Pronombres reflexivos en ruso A2',
  'pronombres-relativos': 'Pronombres relativos en ruso A2',
  superlativos: 'Superlativos en ruso A2',
  'verbos-movimiento': 'Verbos de movimiento en ruso A2',
  'verbos-prefijados': 'Verbos prefijados de movimiento en ruso A2',
} as const

function makeRole(seed: RoleSeed, id: RoleId, initiator: RoleId, minutes: number, turns: number): RoleplayRole {
  const starts = id === initiator ? 'Вы начинаете.' : 'Другой участник начинает.'
  return {
    id,
    name: seed.name,
    nameEs: seed.nameEs,
    headline: seed.headline,
    briefing: [
      `**Говорите конкретно и спокойно.** Обращение: **${seed.address}**. **${starts}** Около ${turns} реплик · ${minutes} минут.`,
      '**Смотрите только на свой экран.** Не показывайте карточку партнёру и не читайте скрытые данные как готовую фразу.',
    ],
    prose: [
      { label: 'Ситуация сейчас', text: seed.situation },
      { label: 'Ваша цель', text: seed.goal },
      { label: 'Что невозможно', items: seed.constraints },
      { label: 'Только вы знаете', items: seed.hidden },
      { label: 'Если решения не будет', text: seed.stakes },
    ],
    facts: seed.facts,
    vocab: seed.vocab,
    toolkit: seed.toolkit,
    exponents: [...seed.exponents].sort((a, b) => a.purpose.localeCompare(b.purpose, 'ru', { sensitivity: 'base' })),
    success: seed.success,
  }
}

export function makeRussianA2Scenario(seed: ScenarioSeed): RoleplayScenario {
  const grammarReferences: RoleplayGrammarReference[] = seed.grammar.map((reference) => ({
    slug: reference.slug,
    level: 'a2',
    title: GRAMMAR_TITLES[reference.slug],
    rationale: reference.rationale,
  }))

  return {
    id: `ruso-a2-${seed.slug}`,
    slug: seed.slug,
    sequence: seed.sequence,
    language: 'ruso',
    level: 'a2',
    title: seed.title,
    titleTarget: seed.titleTarget,
    setting: seed.setting,
    settingEs: seed.settingEs,
    speechActs: seed.speechActs,
    power: seed.power,
    initiator: seed.initiator,
    outcome: seed.outcome,
    minutes: seed.minutes,
    turnsPerRole: seed.turnsPerRole,
    source: `docs/habla-ruso-a2-parrilla.md#${seed.sequence}`,
    roles: [
      makeRole(seed.roles[0], 'a', seed.initiator, seed.minutes, seed.turnsPerRole),
      makeRole(seed.roles[1], 'b', seed.initiator, seed.minutes, seed.turnsPerRole),
    ],
    card: {
      toRole: seed.card.toRole,
      afterTurn: seed.card.afterTurn,
      openWhen: [{ kind: 'p', text: `**Откройте карточку после ${seed.card.afterTurn}-й реплики всего разговора.** До этого ${seed.card.before} Не показывайте экран партнёру.` }],
      blocks: [{ kind: 'quote', blocks: [
        { kind: 'p', text: `**${seed.card.title}**` },
        { kind: 'table', rows: seed.card.rows },
        { kind: 'p', text: seed.card.note },
      ] }],
    },
    closing: [
      { kind: 'p', text: '**Закончите разговор, когда оба участника могут повторить эти пункты:**' },
      { kind: 'ol', items: seed.closingItems },
    ],
    debrief: seed.debrief,
    grammarReferences,
  }
}
