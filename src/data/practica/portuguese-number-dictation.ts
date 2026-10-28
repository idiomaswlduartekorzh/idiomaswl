export type PortugueseNumberDictationItem = {
  value: number
  spoken: string
}

export type PortugueseNumberDictationSet = {
  id: string
  order: number
  title: string
  range: string
  description: string
  answerMode: 'digits' | 'words'
  modeLabel: string
  audioUrl: string
  items: PortugueseNumberDictationItem[]
}

const SMALL = [
  'zero',
  'um',
  'dois',
  'três',
  'quatro',
  'cinco',
  'seis',
  'sete',
  'oito',
  'nove',
  'dez',
  'onze',
  'doze',
  'treze',
  'catorze',
  'quinze',
  'dezesseis',
  'dezessete',
  'dezoito',
  'dezenove',
] as const

const TENS: Record<number, string> = {
  20: 'vinte',
  30: 'trinta',
  40: 'quarenta',
  50: 'cinquenta',
  60: 'sessenta',
  70: 'setenta',
  80: 'oitenta',
  90: 'noventa',
}

const HUNDREDS: Record<number, string> = {
  1: 'cento',
  2: 'duzentos',
  3: 'trezentos',
  4: 'quatrocentos',
  5: 'quinhentos',
  6: 'seiscentos',
  7: 'setecentos',
  8: 'oitocentos',
  9: 'novecentos',
}

function underOneHundred(value: number): string {
  if (value < 20) return SMALL[value]
  const ten = Math.floor(value / 10) * 10
  const unit = value % 10
  return unit === 0 ? TENS[ten] : `${TENS[ten]} e ${SMALL[unit]}`
}

function underOneThousand(value: number): string {
  if (value < 100) return underOneHundred(value)
  if (value === 100) return 'cem'
  const hundred = Math.floor(value / 100)
  const rest = value % 100
  return rest === 0 ? HUNDREDS[hundred] : `${HUNDREDS[hundred]} e ${underOneHundred(rest)}`
}

/** Brazilian Portuguese cardinal spelling for the range used by this exercise. */
export function portugueseNumberWords(value: number): string {
  if (!Number.isInteger(value) || value < 0 || value > 100_000) {
    throw new RangeError(`Portuguese number dictation only supports integers from 0 to 100000: ${value}`)
  }
  if (value < 1_000) return underOneThousand(value)
  if (value === 100_000) return 'cem mil'

  const thousands = Math.floor(value / 1_000)
  const rest = value % 1_000
  const prefix = thousands === 1 ? 'mil' : `${underOneThousand(thousands)} mil`
  if (rest === 0) return prefix

  // Brazilian usage links the final group with "e" when it is below 100 or
  // an exact hundred: "mil e cinco", "dois mil e quinhentos". Otherwise the
  // thousands and hundreds groups stay adjacent: "dois mil trezentos e...".
  const joiner = rest < 100 || rest % 100 === 0 ? ' e ' : ' '
  return `${prefix}${joiner}${underOneThousand(rest)}`
}

const SET_DEFINITIONS = [
  {
    id: '0-99-digits',
    range: '0–99',
    answerMode: 'digits',
    values: [42, 54, 85, 63, 16, 67, 11, 99, 27, 50, 18, 71, 33, 87, 56, 14, 48, 22, 39, 39],
  },
  {
    id: '0-99-words',
    range: '0–99',
    answerMode: 'words',
    values: [6, 92, 24, 0, 57, 81, 35, 13, 74, 46, 2, 68, 90, 29, 53, 17, 76, 41, 8, 95],
  },
  {
    id: '100-999-digits',
    range: '100–999',
    answerMode: 'digits',
    values: [145, 302, 999, 418, 560, 711, 284, 630, 105, 872, 396, 500, 217, 684, 901, 453, 790, 118, 765, 340],
  },
  {
    id: '100-999-words',
    range: '100–999',
    answerMode: 'words',
    values: [823, 156, 407, 692, 250, 934, 318, 701, 579, 112, 845, 263, 980, 436, 600, 174, 759, 521, 888, 209],
  },
  {
    id: '1000-100000-digits',
    range: '1.000–100.000',
    answerMode: 'digits',
    values: [25_000, 1_001, 64_000, 2_500, 99_999, 1_200, 10_000, 4_700, 100_000, 1_999, 37_800, 1_000, 50_000, 3_100, 12_000, 1_100, 9_999, 2_000, 1_010, 1_500],
  },
  {
    id: '1000-100000-words',
    range: '1.000–100.000',
    answerMode: 'words',
    values: [18_600, 1_045, 52_408, 7_070, 31_999, 80_000, 2_250, 15_015, 69_420, 95_800, 6_304, 40_040, 23_700, 11_111, 72_005, 3_999, 27_080, 50_500, 1_900, 88_888],
  },
] as const

export const PORTUGUESE_NUMBER_DICTATION_SETS: PortugueseNumberDictationSet[] = SET_DEFINITIONS.map((set, index) => {
  const items = set.values.map((value) => ({
    value,
    spoken: portugueseNumberWords(value),
  }))
  const modeLabel = set.answerMode === 'digits' ? 'Em cifras' : 'Com letras'

  return {
    id: set.id,
    order: index + 1,
    title: `Números de ${set.range} · ${set.answerMode === 'digits' ? 'em algarismos' : 'por extenso'}`,
    range: set.range,
    description: set.answerMode === 'digits'
      ? 'Ouça os 20 números deste áudio e registre cada resposta usando somente algarismos.'
      : 'Ouça uma nova sequência de 20 números e escreva cada resposta por extenso, com ortografia completa.',
    answerMode: set.answerMode,
    modeLabel,
    audioUrl: `/audio/portugues/a1/numeros/${set.id}/ditado-20.mp3`,
    items,
  }
})

