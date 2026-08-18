/**
 * De un texto en francés a la lista de piezas transcritas.
 *
 * Lo que este archivo añade sobre `ipa.ts` es **la liaison**, que solo se puede resolver
 * mirando la palabra siguiente: `les` es /le/, pero `les amis` es /le‿zami/. Una consonante
 * que llevaba toda la palabra callada reaparece, y encima cambia de sonido.
 *
 * ## Por qué no se marca siempre que podría
 *
 * En francés la liaison tiene tres grados: obligatoria, prohibida y opcional. La
 * obligatoria depende de la gramática —determinante y nombre, pronombre y verbo— y la
 * prohibida también: detrás de un nombre en singular no se hace, y ante `h` aspirada
 * tampoco.
 *
 * Sin analizar la frase no se puede saber el caso general, así que aquí **solo se marca la
 * obligatoria**, a partir de una lista cerrada de palabras que siempre la provocan. Es
 * menos de lo que un francés hace al hablar, pero todo lo que marca es cierto — y para
 * quien aprende, una liaison de menos es un error pequeño y una de más es un error feo.
 */

import type { NotationSystem, Token } from '../tipos'
import { transcribeFrench } from './ipa'

export const FRENCH_SYSTEMS: NotationSystem[] = [
  { id: 'afi', label: 'Alfabeto fonético', hint: 'cómo suena' },
]

/**
 * Palabras que provocan liaison obligatoria con la siguiente.
 *
 * Son determinantes, pronombres, preposiciones cortas, auxiliares y los adjetivos que van
 * delante del nombre. Fuera de esta lista la liaison es opcional o está prohibida, y la
 * herramienta prefiere callarse antes que inventar.
 */
const LIAISON_TRIGGERS = new Set([
  // determinantes
  'les', 'des', 'un', 'une', 'ces', 'ses', 'mes', 'tes', 'nos', 'vos', 'leurs',
  'aux', 'quels', 'quelles', 'tous', 'certains', 'plusieurs', 'quelques',
  // números
  'deux', 'trois', 'six', 'dix', 'vingt', 'cent',
  // pronombres
  'nous', 'vous', 'ils', 'elles', 'on', 'en', 'y', 'les', 'nous', 'vous',
  // verbos y auxiliares frecuentes
  'est', 'sont', 'ont', 'était', 'étaient', 'sommes', 'êtes', 'avons', 'avez',
  'peut', 'veut', 'doit', 'fait', 'vient', 'prend',
  // preposiciones y adverbios
  'dans', 'chez', 'sans', 'sous', 'très', 'plus', 'moins', 'bien', 'trop', 'quand',
  // adjetivos que van delante del nombre
  'petit', 'petits', 'grand', 'grands', 'gros', 'bon', 'bons', 'mauvais',
  'premier', 'dernier', 'long', 'vieux', 'nouvel',
])

/**
 * Palabras con `h` aspirada.
 *
 * Ante ellas NO se hace liaison ni elisión, aunque empiecen por vocal al oído: se dice
 * `le héros` y no `l'héros`. No hay regla que lo prediga —depende de si la palabra vino
 * del germánico o del latín—, así que va por lista.
 */
const H_ASPIRE = new Set([
  'héros', 'haricot', 'haricots', 'hasard', 'haut', 'haute', 'hauteur', 'honte',
  'hors', 'huit', 'hibou', 'hockey', 'hall', 'halte', 'hamac', 'hamburger',
  'hanche', 'handicap', 'hangar', 'harpe', 'hâte', 'hausse', 'havre', 'hérisson',
  'hernie', 'hiérarchie', 'hollande', 'homard', 'hongrie', 'housse', 'hublot',
  'huche', 'hurler', 'hutte',
])

/** Empieza por sonido vocálico: vocal escrita, o `h` muda. */
function startsWithVowelSound(word: string): boolean {
  const lower = word.toLowerCase()
  if (H_ASPIRE.has(lower)) return false
  const first = lower[0]
  if (first === 'h') return true          // h muda: l'homme, les hommes
  return 'aeiouyàâéèêëîïôöùûü'.includes(first ?? '')
}

const LETTER = "A-Za-zÀ-ÖØ-öø-ÿŒœ"
const TOKEN_PATTERN = new RegExp(
  `(\\r\\n|[\\r\\n])|([${LETTER}]+(?:['’][${LETTER}]+)*)|([\\s\\S])`,
  'g',
)

export function transcribeFrenchText(text: string): Token[] {
  const tokens: Token[] = []

  for (const match of text.matchAll(TOKEN_PATTERN)) {
    const [, lineBreak, word, other] = match

    if (lineBreak !== undefined) { tokens.push({ kind: 'break' }); continue }

    if (word !== undefined) {
      // La elisión ya viene escrita: `l'ami` se parte en `l'` y `ami`. Se transcribe el
      // trozo entero, que es como suena.
      const reading = transcribeFrench(word)
      tokens.push({
        kind: 'word',
        text: word,
        forms: { afi: reading ? [reading.ipa] : [] },
        // Se reaprovecha `spoken` para enseñar qué letras callan: la pantalla lo pinta
        // igual que el `학교 → 학꾜` del coreano.
        spoken: reading ? renderSilence(word, reading.silent) : undefined,
        linking: reading?.liaison ? { afi: [reading.liaison] } : undefined,
        status: reading ? 'ok' : 'unknown',
      })
      continue
    }

    const previous = tokens[tokens.length - 1]
    if (previous?.kind === 'plain') {
      tokens[tokens.length - 1] = { kind: 'plain', text: previous.text + other }
    } else {
      tokens.push({ kind: 'plain', text: other })
    }
  }

  return applyLiaison(tokens, text)
}

/**
 * Devuelve la palabra con las letras mudas entre corchetes: `beaucou[p]`, `[h]omm[e]`.
 *
 * Se probó con puntos —`beaucou·`— y no se entendía: `homme` salía `·omm·` y parecía un
 * error de codificación. Los corchetes se leen solos, y agrupan las mudas seguidas, que
 * es como el estudiante las percibe: `parl[ent]`, no `parl[e][n][t]`.
 */
function renderSilence(word: string, silent: number[]): string {
  if (silent.length === 0) return word
  const set = new Set(silent)
  let out = ''
  let inside = false
  for (let i = 0; i < word.length; i++) {
    const isSilent = set.has(i)
    if (isSilent && !inside) { out += '['; inside = true }
    if (!isSilent && inside) { out += ']'; inside = false }
    out += word[i]
  }
  if (inside) out += ']'
  return out
}

/**
 * Marca dónde la consonante final vuelve a sonar.
 *
 * Solo entre una palabra de `LIAISON_TRIGGERS` y otra que empiece por sonido vocálico, y
 * sin nada por medio salvo un espacio: un punto o una coma cortan el grupo fónico.
 */
function applyLiaison(tokens: Token[], _text: string): Token[] {
  const wordIndexes = tokens
    .map((token, index) => (token.kind === 'word' ? index : -1))
    .filter((index) => index >= 0)

  for (let i = 0; i < wordIndexes.length - 1; i++) {
    const current = tokens[wordIndexes[i]]
    const next = tokens[wordIndexes[i + 1]]
    if (current.kind !== 'word' || next.kind !== 'word') continue

    // Entre las dos solo puede haber espacios.
    let separated = false
    for (let k = wordIndexes[i] + 1; k < wordIndexes[i + 1]; k++) {
      const between = tokens[k]
      if (between.kind === 'break') { separated = true; break }
      if (between.kind === 'plain' && /[^ \t]/.test(between.text)) { separated = true; break }
    }
    if (separated) continue

    if (!LIAISON_TRIGGERS.has(current.text.toLowerCase())) continue
    if (!startsWithVowelSound(next.text)) continue

    tokens[wordIndexes[i]] = { ...current, followedByVowel: true }
  }

  return tokens
}
