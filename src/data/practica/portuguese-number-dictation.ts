export type PortugueseNumberDictationItem = {
  value: number
  spoken: string
  audioUrl: string
}

export type PortugueseNumberDictationSet = {
  id: string
  order: number
  title: string
  range: string
  description: string
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
    id: '0-99-a',
    title: 'Números de 0 a 99 · série 1',
    range: '0–99',
    description: 'Contrastes curtos, dezenas cheias e combinações com “e”.',
    values: [0, 3, 7, 11, 14, 18, 20, 22, 27, 30, 33, 39, 42, 48, 50, 56, 64, 71, 85, 99],
  },
  {
    id: '0-99-b',
    title: 'Números de 0 a 99 · série 2',
    range: '0–99',
    description: 'Uma segunda rodada com pares auditivos diferentes.',
    values: [1, 5, 9, 10, 12, 16, 19, 21, 25, 28, 34, 40, 45, 53, 60, 67, 73, 80, 88, 96],
  },
  {
    id: '100-199-a',
    title: 'Números de 100 a 199 · série 1',
    range: '100–199',
    description: 'De “cem” a combinações completas com dezenas e unidades.',
    values: [100, 101, 105, 109, 110, 112, 118, 120, 124, 130, 137, 140, 145, 150, 156, 160, 168, 175, 184, 199],
  },
  {
    id: '100-199-b',
    title: 'Números de 100 a 199 · série 2',
    range: '100–199',
    description: 'Reforço auditivo de “cento e” com novas combinações.',
    values: [102, 106, 111, 115, 119, 121, 128, 133, 139, 142, 149, 151, 157, 163, 169, 172, 180, 186, 190, 198],
  },
  {
    id: '1000-100000-a',
    title: 'Números de 1.000 a 100.000 · série 1',
    range: '1.000–100.000',
    description: 'Milhares redondos e números extensos de uso cotidiano.',
    values: [1_000, 1_001, 1_010, 1_100, 1_200, 1_500, 1_999, 2_000, 2_500, 3_100, 4_700, 9_999, 10_000, 12_000, 25_000, 37_800, 50_000, 64_000, 99_999, 100_000],
  },
  {
    id: '1000-100000-b',
    title: 'Números de 1.000 a 100.000 · série 2',
    range: '1.000–100.000',
    description: 'Milhares irregulares para dominar agrupamentos e ligações.',
    values: [1_005, 1_075, 1_250, 2_010, 2_345, 5_001, 7_500, 10_800, 14_600, 21_000, 33_333, 40_500, 52_740, 68_000, 74_519, 80_000, 88_888, 90_607, 95_000, 99_900],
  },
] as const

export const PORTUGUESE_NUMBER_DICTATION_SETS: PortugueseNumberDictationSet[] = SET_DEFINITIONS.map((set, setIndex) => ({
  id: set.id,
  order: setIndex + 1,
  title: set.title,
  range: set.range,
  description: set.description,
  items: set.values.map((value, itemIndex) => ({
    value,
    spoken: portugueseNumberWords(value),
    audioUrl: `/audio/portugues/a1/numeros/${set.id}/${String(itemIndex + 1).padStart(2, '0')}.mp3`,
  })),
}))

