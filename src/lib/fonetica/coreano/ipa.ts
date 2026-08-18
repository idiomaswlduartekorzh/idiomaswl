/**
 * De hangul ya «sonado» a AFI y a romanización.
 *
 * `hangul.ts` decide **qué letras se pronuncian**; este archivo decide **cómo suena cada
 * una**, que no es lo mismo: la misma letra cambia según dónde esté en la sílaba.
 *
 *     ㄱ  suena /k/ al principio de palabra   (가다  → /kada/)
 *         suena /ɡ/ entre sonidos sonoros     (아기  → /aɡi/)
 *         suena /k̚/ cerrando sílaba, sin soltar aire  (책  → /tɕʰɛk̚/)
 *
 * Ese tercer caso es el que más cuesta a un hispanohablante: en español no existe una
 * oclusiva sin soltar el aire, así que `책` se pronuncia «chek-e» y deja de entenderse.
 * Por eso la marca `̚` se conserva en la transcripción en vez de simplificarla.
 *
 * La romanización sigue la **Romanización Revisada** (RR), que es la oficial de Corea del
 * Sur desde 2000 y la que aparece en los carteles de la calle. Se ofrece junto al AFI
 * porque son dos cosas distintas: el AFI dice cómo suena y la RR dice cómo se escribe en
 * nuestro alfabeto. Un estudiante necesita las dos, y confundirlas es un error común.
 */

import { applySoundChanges, decomposeWord, type Syllable } from './hangul'

/** Consonante en posición de ataque. */
const ONSET_IPA: Record<string, string> = {
  'ㄱ': 'k', 'ㄲ': 'k͈', 'ㄴ': 'n', 'ㄷ': 't', 'ㄸ': 't͈', 'ㄹ': 'ɾ',
  'ㅁ': 'm', 'ㅂ': 'p', 'ㅃ': 'p͈', 'ㅅ': 's', 'ㅆ': 's͈', 'ㅇ': '',
  'ㅈ': 'tɕ', 'ㅉ': 't͈ɕ', 'ㅊ': 'tɕʰ', 'ㅋ': 'kʰ', 'ㅌ': 'tʰ',
  'ㅍ': 'pʰ', 'ㅎ': 'h',
}

/**
 * Las tres consonantes que se sonorizan entre sonidos sonoros.
 *
 * No es una variante libre: `부부` es /pubu/, con las dos ㅂ distintas. El estudiante que
 * dice /pupu/ suena raro, y el que dice /bubu/ también.
 */
const VOICED_ONSET: Record<string, string> = {
  'ㄱ': 'ɡ', 'ㄷ': 'd', 'ㅂ': 'b', 'ㅈ': 'dʑ',
}

/** Consonante que cierra sílaba: siete sonidos, y las oclusivas no sueltan el aire. */
const CODA_IPA: Record<string, string> = {
  'ㄱ': 'k̚', 'ㄴ': 'n', 'ㄷ': 't̚', 'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p̚', 'ㅇ': 'ŋ',
}

const VOWEL_IPA: Record<string, string> = {
  'ㅏ': 'a', 'ㅐ': 'ɛ', 'ㅑ': 'ja', 'ㅒ': 'jɛ', 'ㅓ': 'ʌ', 'ㅔ': 'e',
  'ㅕ': 'jʌ', 'ㅖ': 'je', 'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wɛ', 'ㅚ': 'we',
  'ㅛ': 'jo', 'ㅜ': 'u', 'ㅝ': 'wʌ', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'ju',
  'ㅡ': 'ɯ', 'ㅢ': 'ɰi', 'ㅣ': 'i',
}

const ONSET_RR: Record<string, string> = {
  'ㄱ': 'g', 'ㄲ': 'kk', 'ㄴ': 'n', 'ㄷ': 'd', 'ㄸ': 'tt', 'ㄹ': 'r',
  'ㅁ': 'm', 'ㅂ': 'b', 'ㅃ': 'pp', 'ㅅ': 's', 'ㅆ': 'ss', 'ㅇ': '',
  'ㅈ': 'j', 'ㅉ': 'jj', 'ㅊ': 'ch', 'ㅋ': 'k', 'ㅌ': 't', 'ㅍ': 'p', 'ㅎ': 'h',
}

const CODA_RR: Record<string, string> = {
  'ㄱ': 'k', 'ㄴ': 'n', 'ㄷ': 't', 'ㄹ': 'l', 'ㅁ': 'm', 'ㅂ': 'p', 'ㅇ': 'ng',
}

const VOWEL_RR: Record<string, string> = {
  'ㅏ': 'a', 'ㅐ': 'ae', 'ㅑ': 'ya', 'ㅒ': 'yae', 'ㅓ': 'eo', 'ㅔ': 'e',
  'ㅕ': 'yeo', 'ㅖ': 'ye', 'ㅗ': 'o', 'ㅘ': 'wa', 'ㅙ': 'wae', 'ㅚ': 'oe',
  'ㅛ': 'yo', 'ㅜ': 'u', 'ㅝ': 'wo', 'ㅞ': 'we', 'ㅟ': 'wi', 'ㅠ': 'yu',
  'ㅡ': 'eu', 'ㅢ': 'ui', 'ㅣ': 'i',
}

/** Sonidos tras los que una oclusiva suave se sonoriza: vocales, nasales y /l/. */
const VOICED_FINALS = new Set(['', 'ㄴ', 'ㄹ', 'ㅁ', 'ㅇ'])

export interface KoreanReading {
  /** Alfabeto fonético internacional. */
  readonly ipa: string
  /** Romanización Revisada, la oficial de Corea del Sur. */
  readonly rr: string
  /** Cómo se escribiría en hangul lo que de verdad se pronuncia: `학교` → `학꾜`. */
  readonly spoken: string
}

const HANGUL_BASE = 0xac00
const INITIAL_ORDER = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'
const MEDIAL_ORDER = 'ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'
const FINAL_ORDER = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']

/** Vuelve a montar un bloque hangul. Sirve para enseñar la pronunciación escrita. */
function recompose(syllable: Syllable): string {
  const initial = INITIAL_ORDER.indexOf(syllable.initial)
  const medial = MEDIAL_ORDER.indexOf(syllable.medial)
  const final = FINAL_ORDER.indexOf(syllable.final)
  if (initial < 0 || medial < 0 || final < 0) return ''
  return String.fromCodePoint(HANGUL_BASE + (initial * 21 + medial) * 28 + final)
}

/**
 * Transcribe una palabra coreana.
 *
 * Devuelve `null` si la palabra no es hangul: quien llama decide qué hacer con eso —en la
 * herramienta se marca, no se inventa.
 */
export function transcribeKorean(word: string): KoreanReading | null {
  const written = decomposeWord(word)
  if (!written) return null

  const spoken = applySoundChanges(written)
  // La romanización se saca de una versión SIN tensificar: ver `SoundChangeOptions`.
  const romanized = applySoundChanges(written, { tensify: false })

  let ipa = ''
  let rr = ''
  let hangul = ''

  spoken.forEach((syllable, index) => {
    const previous = spoken[index - 1]
    // El ataque se sonoriza si viene detrás de vocal, nasal o /l/ — nunca al empezar.
    const voiced = index > 0
      && VOICED_FINALS.has(previous.final)
      && VOICED_ONSET[syllable.initial] !== undefined

    const onset = voiced ? VOICED_ONSET[syllable.initial] : (ONSET_IPA[syllable.initial] ?? '')
    // La /s/ se palataliza ante /i/ y ante semivocal: 시 es /ɕi/, no /si/.
    const palatal = syllable.initial === 'ㅅ' && /^[ij]/.test(VOWEL_IPA[syllable.medial] ?? '')
    const onsetIpa = palatal ? 'ɕ' : onset

    // Dos /l/ seguidas: 신라 → [실라] /ɕilla/. La ㄹ inicial tras ㄹ no es vibrante.
    const doubledL = syllable.initial === 'ㄹ' && previous?.final === 'ㄹ'

    ipa += (doubledL ? 'l' : onsetIpa)
      + (VOWEL_IPA[syllable.medial] ?? '')
      + (CODA_IPA[syllable.final] ?? '')

    const forRr = romanized[index] ?? syllable
    const previousRr = romanized[index - 1]
    // `신라` es `silla`, no `silra`: tras ㄹ, la ㄹ inicial ya no es vibrante.
    const rrOnset = forRr.initial === 'ㄹ' && previousRr?.final === 'ㄹ'
      ? 'l'
      : (ONSET_RR[forRr.initial] ?? '')
    rr += rrOnset + (VOWEL_RR[forRr.medial] ?? '') + (CODA_RR[forRr.final] ?? '')

    hangul += recompose(syllable)
  })

  return { ipa, rr, spoken: hangul }
}
