/**
 * De un texto en coreano a la lista de piezas transcritas.
 *
 * Mucho más corto que su equivalente inglés, y no por descuido: el coreano no necesita
 * diccionario, ni rescate morfológico, ni números escritos en letra —los números en
 * coreano tienen dos sistemas y elegir cuál va depende de qué se cuenta, así que se dejan
 * como están en vez de adivinar—.
 *
 * Devuelve el mismo formato que el inglés (`../tipos`), para que la pantalla sea una sola.
 */

import type { NotationSystem, Token } from '../tipos'
import { transcribeKorean } from './ipa'

/** Lo que ofrece el coreano. El AFI va primero porque es el producto. */
export const KOREAN_SYSTEMS: NotationSystem[] = [
  { id: 'afi', label: 'Alfabeto fonético', hint: 'cómo suena' },
  {
    id: 'rr',
    label: 'Romanización',
    hint: 'cómo se escribe',
    // `학교` se romaniza `hakgyo` aunque suene [학꾜]: la romanización oficial no refleja
    // la tensificación. Sirve para un pasaporte, no para aprender a hablar.
    noEsPronunciacion: true,
  },
]

/** Un bloque hangul completo. Los jamo sueltos y el resto no entran. */
const HANGUL = /[가-힣]/

/**
 * Parte el texto en palabras coreanas y todo lo demás.
 *
 * «Todo lo demás» incluye espacios, signos, cifras y cualquier alfabeto: se conserva tal
 * cual. Un texto coreano real lleva números arábigos y a menudo hanja o siglas latinas, y
 * transcribirlos a la fuerza sería inventar.
 */
export function transcribeKoreanText(text: string): Token[] {
  const tokens: Token[] = []
  let buffer = ''

  const flushPlain = () => {
    if (!buffer) return
    const previous = tokens[tokens.length - 1]
    if (previous?.kind === 'plain') {
      tokens[tokens.length - 1] = { kind: 'plain', text: previous.text + buffer }
    } else {
      tokens.push({ kind: 'plain', text: buffer })
    }
    buffer = ''
  }

  let word = ''
  const flushWord = () => {
    if (!word) return
    const reading = transcribeKorean(word)
    tokens.push({
      kind: 'word',
      text: word,
      forms: reading ? { afi: [reading.ipa], rr: [reading.rr] } : { afi: [], rr: [] },
      spoken: reading?.spoken,
      status: reading ? 'ok' : 'unknown',
    })
    word = ''
  }

  for (const character of text) {
    if (character === '\n' || character === '\r') {
      flushWord()
      flushPlain()
      if (character === '\n') tokens.push({ kind: 'break' })
      continue
    }
    if (HANGUL.test(character)) {
      flushPlain()
      word += character
      continue
    }
    flushWord()
    buffer += character
  }

  flushWord()
  flushPlain()
  return tokens
}
