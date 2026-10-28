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

const RANGE_DEFINITIONS = [
  {
    id: '0-99',
    range: '0–99',
    values: [0, 3, 7, 11, 14, 18, 20, 22, 27, 30, 33, 39, 42, 48, 50, 56, 64, 71, 85, 99],
  },
  {
    id: '100-199',
    range: '100–199',
    values: [100, 101, 105, 109, 110, 112, 118, 120, 124, 130, 137, 140, 145, 150, 156, 160, 168, 175, 184, 199],
  },
  {
    id: '1000-100000',
    range: '1.000–100.000',
    values: [1_000, 1_001, 1_010, 1_100, 1_200, 1_500, 1_999, 2_000, 2_500, 3_100, 4_700, 9_999, 10_000, 12_000, 25_000, 37_800, 50_000, 64_000, 99_999, 100_000],
  },
] as const

export const PORTUGUESE_NUMBER_DICTATION_SETS: PortugueseNumberDictationSet[] = RANGE_DEFINITIONS.flatMap((range, rangeIndex) => {
  const items = range.values.map((value) => ({
    value,
    spoken: portugueseNumberWords(value),
  }))
  const firstOrder = rangeIndex * 2 + 1
  const audioUrl = `/audio/portugues/a1/numeros/${range.id}/ditado-20.mp3`

  return [
    {
      id: `${range.id}-digits`,
      order: firstOrder,
      title: `Números de ${range.range} · em algarismos`,
      range: range.range,
      description: 'Ouça cada número e registre a resposta usando somente algarismos.',
      answerMode: 'digits' as const,
      modeLabel: 'Em cifras',
      audioUrl,
      items,
    },
    {
      id: `${range.id}-words`,
      order: firstOrder + 1,
      title: `Números de ${range.range} · por extenso`,
      range: range.range,
      description: 'Ouça os mesmos 20 números e escreva cada resposta por extenso, com ortografia completa.',
      answerMode: 'words' as const,
      modeLabel: 'Com letras',
      audioUrl,
      items,
    },
  ]
})

