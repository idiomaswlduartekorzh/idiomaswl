/**
 * De un texto en inglés a una lista de piezas transcritas.
 *
 * Conserva la forma del texto —saltos de línea, espacios y signos— porque una
 * transcripción sirve para leerla en paralelo con el original, y si se pierde el
 * párrafo se pierde media utilidad.
 *
 * Cada palabra sale con **todas** sus pronunciaciones válidas y en **los dos acentos**,
 * de una vez. Así cambiar de británico a americano, o elegir otra variante, no vuelve a
 * pedir nada al servidor: ya está todo en la respuesta.
 */

import { parseArpabet } from './phones'
import { toAmerican, toBritish } from './ipa'
import { LETTER_NAMES, WEAK_FORMS, type WeakForm } from './weak-forms'
import type { NotationSystem, Token, TokenStatus, WordToken } from './tipos'

export type { Token, PlainToken, BreakToken, TokenStatus, WordToken } from './tipos'

/** Los dos acentos que ofrece el inglés. Los consume la pantalla. */
export const ENGLISH_SYSTEMS: NotationSystem[] = [
  { id: 'uk', label: 'Británico', hint: 'RP' },
  { id: 'us', label: 'Americano', hint: 'General American' },
]

/* ------------------------------------------------------------------ *
 * Números
 * ------------------------------------------------------------------ */

const ONES = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
  'seventeen', 'eighteen', 'nineteen',
]
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety']
const SCALES: [number, string][] = [
  [1_000_000_000_000, 'trillion'],
  [1_000_000_000, 'billion'],
  [1_000_000, 'million'],
  [1_000, 'thousand'],
]

/** `1984` → `one thousand nine hundred eighty four`. Lectura llana, sin años emparejados. */
function numberToWords(value: number): string[] {
  if (!Number.isFinite(value)) return []
  if (value < 0) return ['minus', ...numberToWords(-value)]
  if (value < 20) return [ONES[value]]
  if (value < 100) {
    const rest = value % 10
    return rest === 0 ? [TENS[Math.floor(value / 10)]] : [TENS[Math.floor(value / 10)], ONES[rest]]
  }
  if (value < 1000) {
    const rest = value % 100
    const head = [ONES[Math.floor(value / 100)], 'hundred']
    return rest === 0 ? head : [...head, ...numberToWords(rest)]
  }
  for (const [size, name] of SCALES) {
    if (value >= size) {
      const rest = value % size
      const head = [...numberToWords(Math.floor(value / size)), name]
      return rest === 0 ? head : [...head, ...numberToWords(rest)]
    }
  }
  return [String(value)]
}

/** Convierte lo que el usuario escribió (`1,200`, `3.5`) en palabras. */
function digitsToWords(raw: string): string[] {
  // La coma solo separa miles si la siguen exactamente tres cifras.
  const cleaned = raw.replace(/,(?=\d{3}\b)/g, '')
  const [whole, ...decimals] = cleaned.split('.')
  const words = numberToWords(Number(whole))
  if (decimals.length === 0) return words
  const fraction = decimals.join('').split('').map((d) => ONES[Number(d)] ?? d)
  return [...words, 'point', ...fraction]
}

/* ------------------------------------------------------------------ *
 * Rescate morfológico
 * ------------------------------------------------------------------ */

const VOICELESS = new Set(['P', 'T', 'K', 'F', 'TH', 'S', 'SH', 'CH', 'HH'])
const SIBILANT = new Set(['S', 'Z', 'SH', 'ZH', 'CH', 'JH'])

function lastPhone(phones: string): string {
  const parts = phones.trim().split(' ')
  return (parts[parts.length - 1] ?? '').replace(/\d$/, '')
}

/** La `-s` suena /s/, /z/ o /ɪz/ según el sonido anterior: `cats`, `dogs`, `buses`. */
function addPluralS(phones: string): string {
  const last = lastPhone(phones)
  if (SIBILANT.has(last)) return `${phones} IH0 Z`
  if (VOICELESS.has(last)) return `${phones} S`
  return `${phones} Z`
}

/** La `-ed` suena /t/, /d/ o /ɪd/: `walked`, `played`, `wanted`. */
function addPastD(phones: string): string {
  const last = lastPhone(phones)
  if (last === 'T' || last === 'D') return `${phones} IH0 D`
  if (VOICELESS.has(last)) return `${phones} T`
  return `${phones} D`
}

/** `running` → `runing`: deshace la consonante duplicada antes del sufijo. */
function undouble(stem: string): string {
  return /(.)\1$/.test(stem) ? stem.slice(0, -1) : stem
}

interface Rescue { readonly bases: string[]; readonly apply: (phones: string) => string }

/**
 * Formas de llegar a una palabra que no está en el diccionario desde una que sí.
 *
 * El CMU tiene 126.037 palabras, pero el inglés genera derivados sin parar. Sin esto,
 * `rebooting` o `googled` saldrían marcadas como desconocidas aunque su raíz esté.
 * El orden importa: se prueban de arriba abajo y gana la primera raíz que exista.
 */
function rescuesFor(word: string): Rescue[] {
  const out: Rescue[] = []
  // Una raíz de una o dos letras no es una raíz: es una coincidencia. Sin este tope,
  // `ies` se «deducía» de `y` y salía /waɪz/, y `biped` de `bip` como /bɪpt/.
  const MIN_STEM = 3
  if (word.length <= MIN_STEM) return out
  const drop = (n: number) => word.slice(0, -n)

  if (word.endsWith("'s")) out.push({ bases: [drop(2)], apply: addPluralS })
  if (word.endsWith('ies')) out.push({ bases: [`${drop(3)}y`], apply: addPluralS })
  if (word.endsWith('es')) out.push({ bases: [drop(2), drop(1)], apply: addPluralS })
  if (word.endsWith('s') && !word.endsWith('ss')) out.push({ bases: [drop(1)], apply: addPluralS })
  if (word.endsWith('ied')) out.push({ bases: [`${drop(3)}y`], apply: addPastD })
  if (word.endsWith('ed')) out.push({ bases: [drop(2), drop(1), undouble(drop(2))], apply: addPastD })
  if (word.endsWith('ing')) {
    out.push({
      bases: [drop(3), `${drop(3)}e`, undouble(drop(3))],
      apply: (phones) => `${phones} IH0 NG`,
    })
  }
  if (word.endsWith('ly')) {
    out.push({ bases: [drop(2), `${drop(2)}e`], apply: (phones) => `${phones} L IY0` })
  }
  if (word.endsWith('est')) {
    out.push({ bases: [drop(3), drop(2), undouble(drop(3))], apply: (phones) => `${phones} IH0 S T` })
  }
  if (word.endsWith('er')) {
    out.push({ bases: [drop(2), drop(1), undouble(drop(2))], apply: (phones) => `${phones} ER0` })
  }
  return out
}

/* ------------------------------------------------------------------ *
 * Transcripción
 * ------------------------------------------------------------------ */

/** Símbolos con los que puede empezar una vocal en la salida, marca de acento aparte. */
const VOWEL_STARTS = new Set([...'iɪeɛæaɑɒɔʊuʌɜəɚɝ'])

function startsWithVowel(ipa: string): boolean {
  if (typeof ipa !== 'string') return false
  const first = ipa.replace(/^[ˈˌ]/, '')[0]
  return first !== undefined && VOWEL_STARTS.has(first)
}

/**
 * Forma débil de una palabra, si la tiene.
 *
 * Va por `Object.hasOwn` y no por `WEAK_FORMS[palabra]` porque el objeto hereda las claves
 * de `Object.prototype`: con acceso directo, la palabra `constructor` devolvía una función
 * en lugar de una forma débil y hacía caer la petición con un 500.
 */
function weakFormOf(word: string): WeakForm | null {
  return Object.hasOwn(WEAK_FORMS, word) ? WEAK_FORMS[word] : null
}

interface Rendered { us: string[]; uk: string[]; ukLinking: boolean[] }

function renderPronunciations(pronunciations: string[], word: string): Rendered {
  const us: string[] = []
  const uk: string[] = []
  const ukLinking: boolean[] = []

  // El CMU repite pronunciaciones que, ya en AFI, resultan idénticas. Se descartan por el
  // PAR (americano, británico), no por cada mitad a su aire: comprobarlas por separado
  // tiraba pares legítimos en los que solo una de las dos formas se repetía.
  const seen = new Set<string>()

  for (const arpabet of pronunciations) {
    const phones = parseArpabet(arpabet)
    const british = toBritish(phones, word)
    const american = toAmerican(phones, word)
    const key = `${american} | ${british.ipa}`
    if (seen.has(key)) continue
    seen.add(key)
    us.push(american)
    uk.push(british.ipa)
    ukLinking.push(british.linkingR)
  }

  return { us, uk, ukLinking }
}

/** Deletrea una sigla: `BBC` → `ˌbiː-ˌbiː-ˈsiː`. */
function spellOut(word: string): Rendered | null {
  const letters = [...word.toLowerCase()]
  if (letters.some((letter) => !LETTER_NAMES[letter])) return null
  return {
    us: [letters.map((letter) => LETTER_NAMES[letter].us).join('-')],
    uk: [letters.map((letter) => LETTER_NAMES[letter].uk).join('-')],
    ukLinking: [false],
  }
}

/**
 * Las letras acentuadas entran en la palabra a propósito.
 *
 * Sin ellas, `naïve` se partía en `na` + `ï` + `ve`, y los dos trozos existen en el
 * diccionario: la herramienta devolvía /nɒ viː/ dándolo por bueno. Ahora `naïve` es una
 * sola palabra, no está en el diccionario, y sale marcada — que es la verdad.
 */
const LETTER = 'A-Za-zÀ-ÖØ-öø-ÿŒœŠšŸŽž'
const TOKEN_PATTERN = new RegExp(
  `(\\r\\n|[\\r\\n])|([${LETTER}]+(?:['’][${LETTER}]+)*)|(\\d+(?:[.,]\\d+)*)|([\\s\\S])`,
  'g',
)

export interface TranscribeOptions {
  /** Trata las mayúsculas como siglas y las deletrea. Se apaga si TODO el texto va en mayúsculas. */
  readonly acronyms?: boolean
}

export function transcribe(
  text: string,
  dictionary: Map<string, string[]>,
  options: TranscribeOptions = {},
): Token[] {
  const tokens: Token[] = []
  // Si el texto entero va en mayúsculas, no son siglas: es alguien gritando.
  const shouty = text === text.toUpperCase() && /[A-Z]{3}/.test(text)
  const treatCapsAsAcronyms = (options.acronyms ?? true) && !shouty

  const lookup = (word: string): string[] | undefined => dictionary.get(word)

  const pronounce = (raw: string): { rendered: Rendered; status: TokenStatus } => {
    const word = raw.toLowerCase().replace(/’/g, "'")

    const direct = lookup(word)
    if (direct) return { rendered: renderPronunciations(direct, word), status: 'ok' }

    for (const rescue of rescuesFor(word)) {
      for (const base of rescue.bases) {
        // Cuatro letras, no tres: con tres, `biped` se «deducía» de `bip` y daba /bɪpt/.
        // Las raíces de tres letras casi siempre están en el CMU ya con sus derivados
        // (`bags`, `mapped`), así que exigir cuatro apenas cuesta cobertura.
        if (base.length < 4) continue
        const found = lookup(base)
        if (!found) continue
        const derived = found.map(rescue.apply)
        return { rendered: renderPronunciations(derived, word), status: 'derived' }
      }
    }

    return { rendered: { us: [], uk: [], ukLinking: [] }, status: 'unknown' }
  }

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const [, lineBreak, word, digits, other] = match

    if (lineBreak !== undefined) {
      tokens.push({ kind: 'break' })
      continue
    }

    if (word !== undefined) {
      // Una sigla se deletrea aunque exista como palabra: `US` no es `us`.
      const isAcronym = treatCapsAsAcronyms && word.length >= 2 && word === word.toUpperCase()
      const spelled = isAcronym ? spellOut(word) : null
      const { rendered, status } = spelled
        ? { rendered: spelled, status: 'ok' as TokenStatus }
        : pronounce(word)

      const lower = word.toLowerCase().replace(/’/g, "'")
      const weak = weakFormOf(lower)

      tokens.push({
        kind: 'word',
        text: word,
        forms: { uk: rendered.uk, us: rendered.us },
        linking: { uk: rendered.ukLinking.map((l) => (l ? 'r' : null)), us: rendered.ukLinking.map(() => null) },
        weak: weak ? { us: weak.us, uk: weak.uk } : null,
        status,
        followedByVowel: false,
      })
      continue
    }

    if (digits !== undefined) {
      const words = digitsToWords(digits)
      const parts = words.map((part) => pronounce(part))
      const british = parts.map((p) => p.rendered.uk[0] ?? '').join(' ').trim()
      const american = parts.map((p) => p.rendered.us[0] ?? '').join(' ').trim()
      // `1,5` no es un millar: `Number('1,5')` da NaN y el número se quedaba en blanco,
      // pero marcado como correcto. Un hueco vacío miente más que un aviso.
      const readable = words.length > 0 && british.length > 0 && american.length > 0

      tokens.push({
        kind: 'word',
        text: digits,
        forms: { uk: readable ? [british] : [], us: readable ? [american] : [] },
        linking: { uk: [null], us: [null] },
        weak: null,
        status: readable && !parts.some((p) => p.status === 'unknown') ? 'ok' : 'unknown',
        followedByVowel: false,
      })
      continue
    }

    // Espacios y signos: se agrupan con el anterior si también era texto llano.
    const previous = tokens[tokens.length - 1]
    if (previous?.kind === 'plain') {
      tokens[tokens.length - 1] = { kind: 'plain', text: previous.text + other }
    } else {
      tokens.push({ kind: 'plain', text: other })
    }
  }

  return applyLinking(tokens)
}

/**
 * Marca qué palabras van seguidas de un sonido vocálico.
 *
 * De eso depende la /r/ de enlace del británico —`far` es /fɑː/ pero `far away` es
 * /fɑːr əˈweɪ/— y también la elección entre `the` /ðə/ y `the` /ði/.
 */
function applyLinking(tokens: Token[]): Token[] {
  const wordIndexes = tokens
    .map((token, index) => (token.kind === 'word' ? index : -1))
    .filter((index) => index >= 0)

  /** Un punto, un signo de cierre o un salto de línea rompen el grupo fónico. */
  const separated = (from: number, to: number): boolean => {
    for (let i = from + 1; i < to; i++) {
      const between = tokens[i]
      if (between.kind === 'break') return true
      if (between.kind === 'plain' && /[.?!;:…]/.test(between.text)) return true
    }
    return false
  }

  for (let i = 0; i < wordIndexes.length - 1; i++) {
    // `far. Away` son dos frases: ahí no hay /r/ de enlace ni `the` ante vocal.
    if (separated(wordIndexes[i], wordIndexes[i + 1])) continue

    const next = tokens[wordIndexes[i + 1]] as WordToken
    const nextForm = next.forms.uk?.[0] ?? next.forms.us?.[0] ?? ''
    if (!startsWithVowel(nextForm)) continue

    const current = tokens[wordIndexes[i]] as WordToken
    const weakForm = weakFormOf(current.text.toLowerCase())
    tokens[wordIndexes[i]] = {
      ...current,
      followedByVowel: true,
      weak: weakForm?.beforeVowel
        ? { us: weakForm.beforeVowel.us, uk: weakForm.beforeVowel.uk }
        : current.weak,
    }
  }

  return tokens
}
