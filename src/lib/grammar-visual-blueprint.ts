import type { GrammarTopic } from '@/data/grammar/types'

export type GrammarVisualKind =
  | 'script'
  | 'contrast'
  | 'reference'
  | 'transformation'
  | 'timeline'
  | 'structure'
  | 'usage'

export interface GrammarVisualBlueprint {
  kind: GrammarVisualKind
  eyebrow: string
  purpose: string
  headers: string[]
  rows: string[][]
  formulaParts: string[]
}

const SCRIPT_SLUGS = new Set([
  'hiragana-basico',
  'katakana-basico',
  'hangul-basico',
  'alfabeto-cirilico',
  'kanji-esencial-a1',
])

const SCRIPT_GRIDS: Record<string, { headers: string[]; rows: string[][] }> = {
  'hiragana-basico': {
    headers: ['fila', 'a', 'i', 'u', 'e', 'o'],
    rows: [
      ['vocal', 'あ a', 'い i', 'う u', 'え e', 'お o'],
      ['k', 'か ka', 'き ki', 'く ku', 'け ke', 'こ ko'],
      ['s', 'さ sa', 'し shi', 'す su', 'せ se', 'そ so'],
      ['t', 'た ta', 'ち chi', 'つ tsu', 'て te', 'と to'],
      ['n', 'な na', 'に ni', 'ぬ nu', 'ね ne', 'の no'],
      ['h', 'は ha', 'ひ hi', 'ふ fu', 'へ he', 'ほ ho'],
      ['m', 'ま ma', 'み mi', 'む mu', 'め me', 'も mo'],
      ['y', 'や ya', '—', 'ゆ yu', '—', 'よ yo'],
      ['r', 'ら ra', 'り ri', 'る ru', 'れ re', 'ろ ro'],
      ['w/n', 'わ wa', '—', '—', '—', 'を wo · ん n'],
    ],
  },
  'katakana-basico': {
    headers: ['fila', 'a', 'i', 'u', 'e', 'o'],
    rows: [
      ['vocal', 'ア a', 'イ i', 'ウ u', 'エ e', 'オ o'],
      ['k', 'カ ka', 'キ ki', 'ク ku', 'ケ ke', 'コ ko'],
      ['s', 'サ sa', 'シ shi', 'ス su', 'セ se', 'ソ so'],
      ['t', 'タ ta', 'チ chi', 'ツ tsu', 'テ te', 'ト to'],
      ['n', 'ナ na', 'ニ ni', 'ヌ nu', 'ネ ne', 'ノ no'],
      ['h', 'ハ ha', 'ヒ hi', 'フ fu', 'ヘ he', 'ホ ho'],
      ['m', 'マ ma', 'ミ mi', 'ム mu', 'メ me', 'モ mo'],
      ['y', 'ヤ ya', '—', 'ユ yu', '—', 'ヨ yo'],
      ['r', 'ラ ra', 'リ ri', 'ル ru', 'レ re', 'ロ ro'],
      ['w/n', 'ワ wa', '—', '—', '—', 'ヲ wo · ン n'],
    ],
  },
  'hangul-basico': {
    headers: ['grupo', 'letras y sonidos'],
    rows: [
      ['Vocales verticales', 'ㅏ a · ㅓ eo · ㅣ i · ㅐ ae · ㅔ e'],
      ['Vocales horizontales', 'ㅗ o · ㅜ u · ㅡ eu · ㅚ oe · ㅟ wi'],
      ['Consonantes 1', 'ㄱ g/k · ㄴ n · ㄷ d/t · ㄹ r/l · ㅁ m · ㅂ b/p · ㅅ s'],
      ['Consonantes 2', 'ㅇ muda/ng · ㅈ j · ㅊ ch · ㅋ k · ㅌ t · ㅍ p · ㅎ h'],
      ['Bloque abierto', 'ㄱ + ㅏ = 가 (ga)'],
      ['Con batchim', 'ㅎ + ㅏ + ㄴ = 한 (han)'],
    ],
  },
  'alfabeto-cirilico': {
    headers: ['grupo', 'letras', 'sonido'],
    rows: [
      ['Familiares', 'А О К М Т', 'a · o · k · m · t'],
      ['Trampas', 'В Н Р С Х У', 'v · n · r · s · j · u'],
      ['Nuevas', 'Б Г Д Л П Ф З Й', 'b · g · d · l · p · f · z · y'],
      ['Sibilantes', 'Ж Ш Щ Ц Ч', 'zh · sh · shch · ts · ch'],
      ['Vocales', 'Я Ё Ю Э И Е', 'ya · yo · yu · e · i · ye'],
      ['Signos', 'Ь Ъ', 'suaviza · separa'],
    ],
  },
  'kanji-esencial-a1': {
    headers: ['kanji', 'lectura útil', 'idea central'],
    rows: [
      ['一 二 三', 'ichi · ni · san', 'uno · dos · tres'],
      ['日 月', 'hi/nichi · tsuki/getsu', 'día/sol · luna/mes'],
      ['人 木', 'hito/jin · ki/moku', 'persona · árbol'],
      ['水 火', 'mizu/sui · hi/ka', 'agua · fuego'],
      ['山 川', 'yama/san · kawa/sen', 'montaña · río'],
    ],
  },
}

const SPECIAL_TABLES: Record<string, { headers: string[]; rows: string[][] }> = {
  'you-ni-naru-b1': {
    headers: ['momento', 'japonés', 'qué cambia'],
    rows: [
      ['Antes', '日本語が話せませんでした。', 'No podía hablar japonés.'],
      ['Proceso', '毎日練習しました。', 'Practiqué todos los días.'],
      ['Ahora', '日本語が話せるようになりました。', 'Llegué a poder hablar japonés.'],
    ],
  },
}

const MODE_GROUPS: Record<Exclude<GrammarVisualKind, 'script' | 'usage'>, string[]> = {
  contrast: ['contrast', 'split', 'comparison', 'identity-swap', 'subject-object-swap', 'auxiliary-split', 'preference-scale'],
  reference: ['table', 'grid', 'chart', 'paradigm', 'conjugation', 'case', 'numbers', 'reference', 'article', 'pronoun', 'noun-chart', 'distance-grid'],
  transformation: ['transformation', 'alternate', 'adjective-conjugation', 'na-adjective-forms', 'negation-complete'],
  timeline: ['timeline', 'time', 'frequency', 'certainty-meter', 'threshold', 'goal-arrow'],
  structure: ['sentence', 'word-order', 'particle', 'question', 'formula', 'connector', 'conjunction', 'preposition', 'owner', 'existence', 'modal-rule', 'bridge', 'conversation-flow', 'desire-form'],
}

function includesAny(value: string, terms: string[]): boolean {
  return terms.some((term) => value.includes(term))
}

export function getGrammarVisualKind(topic: GrammarTopic): GrammarVisualKind {
  const mode = topic.visual.mode.toLowerCase()
  const searchable = `${topic.slug} ${topic.shortTitle} ${topic.category} ${mode} ${topic.visual.graphicPrompt} ${topic.visual.teacherLens} ${topic.guide.goal} ${topic.guide.formula}`.toLowerCase()

  if (SCRIPT_SLUGS.has(topic.slug) || includesAny(mode, ['syllab', 'alphabet', 'kanji', 'hangul'])) return 'script'
  if (includesAny(searchable, ['ser-e-estar', 'ser y estar', 'ser o estar', 'versus', ' vs ', 'diferencia']) || includesAny(mode, MODE_GROUPS.contrast)) return 'contrast'
  if (includesAny(searchable, ['irregular', 'plural', 'cambio de raíz', 'stem change']) || includesAny(mode, MODE_GROUPS.transformation)) return 'transformation'
  if (includesAny(mode, MODE_GROUPS.reference) || includesAny(searchable, ['conjugación', 'conjugacao', 'conjugation', 'declinación', 'casos '])) return 'reference'
  if (includesAny(mode, MODE_GROUPS.timeline) || includesAny(searchable, ['pasado', 'past ', 'futuro', 'future', 'perfect', 'progresiv', 'progreso', 'cambio gradual'])) return 'timeline'
  if (includesAny(mode, MODE_GROUPS.structure) || includesAny(searchable, ['partícula', 'particula', 'orden ', 'pregunta', 'negación', 'negation', 'conector'])) return 'structure'
  return 'usage'
}

function compact(value: string): string {
  return value.replace(/\s+/g, ' ').trim()
}

function splitFormula(formula: string): string[] {
  const normalized = compact(formula)
  const separator = normalized.includes(' → ') ? ' → ' : normalized.includes(' + ') ? ' + ' : normalized.includes(' | ') ? ' | ' : null
  if (!separator) return [normalized]
  return normalized.split(separator).map(compact).filter(Boolean).slice(0, 5)
}

function sourceRows(topic: GrammarTopic): { headers: string[]; rows: string[][] } {
  const candidates = [topic.guide.table, ...topic.seo.flatMap((section) => section.table ? [section.table] : [])]
    .filter((table) => table.length > 1)
    .sort((left, right) => right.length - left.length)
  const [header = [], ...body] = candidates[0] ?? topic.guide.table
  if (body.length) return { headers: header.map(compact), rows: body.map((row) => row.map(compact)) }
  return {
    headers: ['forma', 'uso'],
    rows: topic.visual.scene.slice(0, 6).map(([form, use]) => [compact(form), compact(use)]),
  }
}

function tableRows(table: string[][]): { headers: string[]; rows: string[][] } {
  const [header = [], ...body] = table
  return { headers: header.map(compact), rows: body.map((row) => row.map(compact)) }
}

const EYEBROWS: Record<GrammarVisualKind, string> = {
  script: 'MAPA DE ESCRITURA',
  contrast: 'COMPARACIÓN CLAVE',
  reference: 'TABLA DE REFERENCIA',
  transformation: 'CAMBIOS QUE DEBES MEMORIZAR',
  timeline: 'ANTES · CAMBIO · RESULTADO',
  structure: 'CÓMO SE CONSTRUYE',
  usage: 'MAPA DE USO',
}

export function buildGrammarVisualBlueprint(topic: GrammarTopic): GrammarVisualBlueprint {
  const kind = getGrammarVisualKind(topic)
  const scripted = SCRIPT_GRIDS[topic.slug]
  const special = SPECIAL_TABLES[topic.slug]
  const source = scripted ?? special ?? (kind === 'contrast' ? tableRows(topic.guide.table) : sourceRows(topic))
  const fallbackRows = topic.visual.scene.slice(0, 6).map(([form, use]) => [compact(form), compact(use)])
  const rows = source.rows.length ? source.rows : fallbackRows

  return {
    kind,
    eyebrow: EYEBROWS[kind],
    purpose: compact(topic.visual.teacherLens || topic.guide.goal),
    headers: source.headers,
    rows,
    formulaParts: splitFormula(topic.guide.formula),
  }
}
