import type {
  RoleId,
  RoleplayGrammarReference,
  RoleplayRole,
  RoleplayScenario,
  RoleplayLevel,
  SpeechAct,
} from '../types.ts'

type RoleSeed = {
  name: string
  nameEs: string
  headline: string
  address: 'です・ます' | '普通体'
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

type GrammarSeed = {
  level: RoleplayLevel
  slug: string
  rationale: string
}

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

const GRAMMAR_TITLES: Record<string, string> = {
  'a1/conjunciones': 'Conjunciones y conectores básicos en japonés A1',
  'a1/desu-masu': 'Desu y Masu en japonés A1',
  'a1/estructura-sov-particulas': 'Estructura SOV y partículas en japonés A1',
  'a1/expresiones-cotidianas': 'Expresiones cotidianas esenciales en japonés A1',
  'a1/interrogativos-ka': 'Palabras interrogativas y か en japonés A1',
  'a1/jikan-tiempo': 'La hora en japonés A1',
  'a1/masu-kei-conjugacion': 'Conjugación ます en japonés A1',
  'a1/negacion-completa': 'Negación completa en japonés A1',
  'a1/numeros-contadores': 'Números y contadores en japonés A1',
  'a1/particula-de-e': 'Partículas で y へ en japonés A1',
  'a1/particula-wa-ga': 'Partícula は y が en japonés A1',
  'a1/particula-wo-ni': 'Partículas を y に en japonés A1',
  'a1/tai-form': 'Forma たい en japonés A1',
  'a1/te-form-permission': 'Forma て y permiso en japonés A1',
  'a2/ageru-morau-kureru-a2': 'あげる・もらう・くれる en japonés A2',
  'a2/dake-shika-bakari-a2': 'だけ・しか・ばかり en japonés A2',
  'a2/deshou-a2': '〜でしょう en japonés A2',
  'a2/hikaku-a2': 'Comparación en japonés A2',
  'a2/kamoshirenai-a2': '〜かもしれない en japonés A2',
  'a2/kanoukei-a2': 'Forma potencial en japonés A2',
  'a2/mae-ni-ato-de-a2': '前に・後で en japonés A2',
  'a2/n-desu-a2': '〜んです en japonés A2',
  'a2/nagara-a2': '〜ながら en japonés A2',
  'a2/nakereba-naranai-a2': '〜なければならない en japonés A2',
  'a2/noun-modification-a2': 'Modificación nominal en japonés A2',
  'a2/ta-koto-ga-aru-a2': '〜たことがある en japonés A2',
  'a2/tara-condicional-a2': '〜たら condicional en japonés A2',
  'a2/tari-tari-a2': '〜たり〜たりする en japonés A2',
  'a2/te-form-sequence-a2': 'Forma て para secuencias en japonés A2',
  'a2/te-iru-a2': '〜ている en japonés A2',
  'a2/te-mo-ii-a2': '〜てもいい y 〜てはいけない en japonés A2',
  'a2/to-condicional-a2': '〜と condicional en japonés A2',
  'a2/to-omoimasu-a2': '〜と思います en japonés A2',
  'a2/ukemi-a2': 'Forma pasiva en japonés A2',
}

function makeRole(seed: RoleSeed, id: RoleId, initiator: RoleId, minutes: number, turns: number): RoleplayRole {
  const starts = id === initiator ? 'あなたから始めます。' : '相手から始めます。'
  return {
    id,
    name: seed.name,
    nameEs: seed.nameEs,
    headline: seed.headline,
    briefing: [
      `**具体的に、落ち着いて話してください。** 話し方：**${seed.address}**。**${starts}** 目安は一人${turns}回・${minutes}分です。`,
      '**自分の画面だけを見てください。** 相手にカードを見せず、秘密の情報を完成したせりふのように読まないでください。',
    ],
    prose: [
      { label: '今の状況', text: seed.situation },
      { label: 'あなたの目標', text: seed.goal },
      { label: 'できないこと', items: seed.constraints },
      { label: 'あなただけが知っていること', items: seed.hidden },
      { label: '決まらなかったら', text: seed.stakes },
    ],
    facts: seed.facts,
    vocab: seed.vocab,
    toolkit: seed.toolkit,
    exponents: [...seed.exponents].sort((a, b) => a.purpose.localeCompare(b.purpose, 'ja', { sensitivity: 'base' })),
    success: seed.success,
  }
}

export function makeJapaneseA2Scenario(seed: ScenarioSeed): RoleplayScenario {
  const grammarReferences: RoleplayGrammarReference[] = seed.grammar.map((reference) => {
    const key = `${reference.level}/${reference.slug}`
    const title = GRAMMAR_TITLES[key]
    if (!title) throw new Error(`Falta título gramatical para ${key}`)
    return { slug: reference.slug, level: reference.level, title, rationale: reference.rationale }
  })

  return {
    id: `japones-a2-${seed.slug}`,
    slug: seed.slug,
    sequence: seed.sequence,
    language: 'japones',
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
    source: `docs/habla-japones-a2-parrilla.md#${seed.sequence}`,
    roles: [
      makeRole(seed.roles[0], 'a', seed.initiator, seed.minutes, seed.turnsPerRole),
      makeRole(seed.roles[1], 'b', seed.initiator, seed.minutes, seed.turnsPerRole),
    ],
    card: {
      toRole: seed.card.toRole,
      afterTurn: seed.card.afterTurn,
      openWhen: [{ kind: 'p', text: `**会話全体の${seed.card.afterTurn}番目の発言が終わったら、カードを開けてください。** その前に、${seed.card.before} 相手に画面を見せないでください。` }],
      blocks: [{ kind: 'quote', blocks: [
        { kind: 'p', text: `**${seed.card.title}**` },
        { kind: 'table', rows: seed.card.rows },
        { kind: 'p', text: seed.card.note },
      ] }],
    },
    closing: [
      { kind: 'p', text: '**二人が次の項目を言い直せたら、会話を終わります：**' },
      { kind: 'ol', items: seed.closingItems },
    ],
    debrief: seed.debrief,
    grammarReferences,
  }
}
