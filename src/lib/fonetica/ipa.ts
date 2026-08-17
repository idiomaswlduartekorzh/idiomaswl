/**
 * Conversión de una palabra del CMU (ARPABET) a AFI, en americano y en británico.
 *
 * El americano es casi una sustitución directa. El británico es una derivación con
 * reglas —la /r/ que no se pronuncia, `oʊ` → `əʊ`, el yod— más los conjuntos léxicos de
 * `lexical-sets.ts` para lo que ninguna regla predice.
 *
 * Las marcas de acento (`ˈ` principal, `ˌ` secundaria) se colocan **al principio de la
 * sílaba**, que es la convención de los diccionarios. El CMU las marca sobre la vocal,
 * así que hay que silabificar para moverlas de sitio: sin eso `computer` sale
 * `kəmpjˈuːtə` en vez de `kəmˈpjuːtə`.
 */

import {
  AMERICAN, BRITISH, SCHWA, isVowel, parseArpabet, syllabify,
  type Phone,
} from './phones'
import {
  BATH, BRITISH_OVERRIDES, CLOTH, ILE, ORANGE, PALM,
  TRAP_BEFORE_R, TRAP_FROM_LOT, YOD, YOD_BLOCKED,
} from './lexical-sets'

export interface WordIpa {
  readonly ipa: string
  /**
   * La palabra termina en una /r/ que el británico calla, pero que **reaparece si la
   * siguiente palabra empieza por vocal**: `far` es /fɑː/, pero `far away` es
   * /fɑːr əˈweɪ/. Se resuelve al montar la frase, no aquí.
   */
  readonly linkingR: boolean
}

/** Sibilantes: delante de `-es` el británico dice /ɪz/ y el americano /əz/. */
const SIBILANTS = new Set(['S', 'Z', 'SH', 'ZH', 'CH', 'JH'])

/** Consonantes tras las que el británico conserva el yod: `new` /njuː/. */
const YOD_TRIGGERS = new Set(['T', 'D', 'N', 'S', 'Z', 'TH'])

/**
 * ¿Esta /ə/ átona es /ɪ/ en británico?
 *
 * `wanted` es /ˈwɑntəd/ en Estados Unidos y /ˈwɒntɪd/ en Inglaterra. Los entornos
 * salen de medir el CMU contra wikipron: de las 108 palabras acabadas en `-ted`, 99
 * llevan /ɪ/ en británico; en `-ist` son el 100 %, y en `-ess` solo el 17 %, así que
 * esa terminación se queda fuera.
 */
function isBritishKit(word: string, previous: Phone | undefined, next: Phone | undefined): boolean {
  const nextSymbol = next?.symbol
  const previousSymbol = previous?.symbol
  if (!nextSymbol) return false

  // wanted, needed
  if (nextSymbol === 'D' && (previousSymbol === 'T' || previousSymbol === 'D')) return true
  // stupid, rapid, valid
  if (nextSymbol === 'D' && word.endsWith('id')) return true
  // houses, faces, wishes, judges
  if (nextSymbol === 'Z' && previousSymbol && SIBILANTS.has(previousSymbol)) return true
  // damage, village
  if (nextSymbol === 'JH' && word.endsWith('age')) return true
  // justice, basis
  if (nextSymbol === 'S' && /(ice|is)$/.test(word)) return true
  // artist, biggest — aquí la vocal va seguida de /s/, no de /t/
  if (nextSymbol === 'S' && /(ist|est)$/.test(word)) return true
  // rabbit, market — pero no tras diptongo: `quiet` es /ˈkwaɪət/, no /ˈkwaɪɪt/
  if (nextSymbol === 'T' && /(it|et)$/.test(word)) {
    return previousSymbol !== 'AY' && previousSymbol !== 'AW'
  }

  return false
}

/**
 * ¿Esta /ɑ/ del CMU es en realidad la vocal de `thought`?
 *
 * El CMU no distingue `bought` de `boss`: escribe las dos con `AA`, porque buena parte
 * de los hablantes estadounidenses las ha fusionado. El británico sí las distingue
 * (/bɔːt/ frente a /bɒs/), y lo único que las separa es cómo se escriben: el grupo de
 * `thought` lleva `au`, `aw`, `ough`, `augh` o `al` ante /l k t m/.
 *
 * `calm` y `palm` encajarían en el patrón `al`, pero se comprueban antes contra PALM.
 */
function isThoughtSpelling(word: string, spelling: string | undefined): boolean {
  // Con la vocal emparejada a su letra, la decisión es exacta: solo es THOUGHT si **esta**
  // vocal se escribe `au`, `aw` u `ou`. Sin ese emparejamiento, mirar la palabra entera
  // convertía en /ɔː/ vocales de otra sílaba: `swallow` salía /ˈswɔːləʊ/ y `allot`
  // /əˈlɔːt/ porque en algún sitio de la palabra había un `al`.
  if (spelling !== undefined) return /^(au|aw|ou)$/.test(spelling)
  return /(au|aw|ough|augh|al[lktm])/.test(word)
}

/**
 * Grupos de letras vocálicas de una palabra, sin la `-e` muda final.
 *
 * Sirve para saber **con qué letra se escribe** cada vocal del CMU: si el número de
 * grupos coincide con el número de vocales pronunciadas, se pueden emparejar por
 * posición. `accident` da `a·i·e` y se pronuncia `AE1·AH0·AH0`, así que la segunda
 * vocal es la letra `i`.
 *
 * La coincidencia de número no siempre se da (`chocolate` tiene tres grupos y dos
 * vocales); cuando falla, quien llama se queda con su valor por defecto.
 */
function spellingVowelGroups(word: string): string[] {
  const trimmed = word.replace(/([^aeiouy])e$/, '$1')
  // La `w` entra en el grupo si va detrás de vocal, para que `new` dé `ew` y no `e`.
  return trimmed.match(/[aeiouy]+w?/g) ?? []
}

/** Inglés americano. Sustitución directa, con schwa para `AH0` y `ɚ`/`ɝ` para `ER`. */
export function toAmerican(phones: Phone[], word: string): string {
  const syllables = syllabify(phones)
  const hasPrimary = syllables.some((s) => s.stress === 1)
  const multisyllabic = syllables.length > 1

  const flat: Phone[] = syllables.flatMap((s) => s.phones)
  let cursor = 0
  let out = ''
  /** La /r/ que `ER` lleva dentro abre la sílaba siguiente: `around` es /əˈraʊnd/. */
  let pendingR = false

  /** La `-y` final no lleva marca de acento aunque el CMU se la ponga: `ability`. */
  const happyIndex = multisyllabic
    && flat.length > 0
    && flat[flat.length - 1].symbol === 'IY'
    && flat[flat.length - 1].stress !== 1
    ? flat.length - 1
    : -1
  let syllableStart = 0

  for (const syllable of syllables) {
    const nucleusIndex = syllableStart + syllable.nucleus
    syllableStart += syllable.phones.length

    let mark = ''
    if (multisyllabic && nucleusIndex !== happyIndex) {
      if (syllable.stress === 1) mark = 'ˈ'
      else if (syllable.stress === 2 && hasPrimary) mark = 'ˌ'
    }
    out += mark
    if (pendingR) { out += 'r'; pendingR = false }

    for (const phone of syllable.phones) {
      const index = cursor++
      const { symbol, stress } = phone
      if (symbol === 'AH') {
        out += stress === 0 ? SCHWA : AMERICAN.AH
      } else if (symbol === 'ER') {
        const prevocalic = flat[index + 1] !== undefined && isVowel(flat[index + 1])
        if (prevocalic) { out += stress === 0 ? SCHWA : 'ɝ'; pendingR = true }
        else out += stress === 0 ? 'ɚ' : 'ɝ'
      } else {
        out += AMERICAN[symbol] ?? ''
      }
    }
  }
  return out || word
}

/** Inglés británico (RP). Ver el encabezado del archivo. */
export function toBritish(phones: Phone[], word: string): WordIpa {
  // `Object.hasOwn` y no `BRITISH_OVERRIDES[word]` a secas: el objeto hereda las claves de
  // `Object.prototype`, así que la palabra inglesa `constructor` —que está en el CMU y es
  // vocabulario corriente— devolvía una función en vez de una cadena y tumbaba la petición
  // entera con un 500.
  if (Object.hasOwn(BRITISH_OVERRIDES, word)) {
    const override = BRITISH_OVERRIDES[word]
    return { ipa: override, linkingR: /[əɑɔɜ]ː?$/.test(override) }
  }

  const syllables = syllabify(phones)
  const hasPrimary = syllables.some((s) => s.stress === 1)
  const multisyllabic = syllables.length > 1
  const spelledAr = /ar/.test(word)

  // Índice plano para poder mirar el fonema anterior y el siguiente sin salir de la sílaba.
  const flat: Phone[] = syllables.flatMap((s) => s.phones)
  let cursor = 0
  let linkingR = false

  /**
   * Con qué letra se escribe cada vocal, cuando se puede saber.
   *
   * El británico conserva una /ɪ/ átona donde el americano ya dice schwa, y lo que las
   * separa es la ortografía: `accident` es /ˈæksɪdənt/ y `moment` es /ˈməʊmənt/. Sin
   * esto, 1.300 palabras del diccionario salían con schwa de más.
   */
  const vowelIndexes = flat.map((p, i) => (isVowel(p) ? i : -1)).filter((i) => i >= 0)
  const letterGroups = spellingVowelGroups(word)
  const spellingOf = new Map<number, string>()
  if (letterGroups.length === vowelIndexes.length) {
    vowelIndexes.forEach((phoneIndex, k) => spellingOf.set(phoneIndex, letterGroups[k]))
  }

  // -ile: fertile /ˈfɜːtaɪl/ frente a /ˈfɝtl/
  const isIle = ILE.has(word)
    && word.endsWith('ile')
    && flat.length >= 2
    && flat[flat.length - 1].symbol === 'L'
    && flat[flat.length - 2].symbol === 'AH'

  // -ary / -ory / -ery: necessary /ˈnesəsəri/, no /ˈnesəsˌeri/
  const reducesAry = /(ary|ory|ery)$/.test(word)
    && flat.length >= 3
    && flat[flat.length - 1].symbol === 'IY'
    && flat[flat.length - 2].symbol === 'R'
    && ['EH', 'AO', 'AA'].includes(flat[flat.length - 3].symbol)
    && flat[flat.length - 3].stress !== 1
  /** La sílaba que se reduce pierde también su marca de acento secundario. */
  const reducedIndex = reducesAry ? flat.length - 3 : -1

  /**
   * `-ity` lleva schwa, no /ɪ/.
   *
   * La regla general de este archivo dice que una vocal átona escrita con `i` es /ɪ/ en
   * británico, y para `accident` o `abdicate` es cierto. Pero en `-ity` los diccionarios
   * de aprendizaje actuales —Cambridge, Oxford— escriben schwa: `ability` es /əˈbɪləti/.
   * Es la terminación más frecuente afectada por la regla, así que la excepción se
   * declara aquí en vez de dejarla al azar de la ortografía.
   */
  const ityIndex = /ity$/.test(word)
    && flat.length >= 3
    && flat[flat.length - 1].symbol === 'IY'
    && flat[flat.length - 2].symbol === 'T'
    && flat[flat.length - 3].symbol === 'AH'
    ? flat.length - 3
    : -1

  /**
   * La `-y` final es breve y átona, aunque el CMU le ponga acento secundario.
   *
   * `ability` viene del CMU como `… T IY2` y salía /əˈbɪləˌtiː/: vocal larga y una marca
   * de acento que nadie escribe. En RP es /əˈbɪləti/. Se excluye el acento principal a
   * propósito, porque ahí sí es larga: `agree` es /əˈɡriː/.
   */
  const happyIndex = multisyllabic
    && flat.length > 0
    && flat[flat.length - 1].symbol === 'IY'
    && flat[flat.length - 1].stress !== 1
    ? flat.length - 1
    : -1

  let out = ''
  let syllableStart = 0
  /** La /r/ que `ER` lleva dentro abre la sílaba siguiente: `around` es /əˈraʊnd/. */
  let pendingR = false

  for (const syllable of syllables) {
    const nucleusIndex = syllableStart + syllable.nucleus
    syllableStart += syllable.phones.length

    if (multisyllabic && nucleusIndex !== reducedIndex && nucleusIndex !== happyIndex) {
      if (syllable.stress === 1) out += 'ˈ'
      else if (syllable.stress === 2 && hasPrimary) out += 'ˌ'
    }
    if (pendingR) { out += 'r'; pendingR = false }

    for (const phone of syllable.phones) {
      const index = cursor++
      const { symbol, stress } = phone
      const previous = flat[index - 1]
      const next = flat[index + 1]
      const afterNext = flat[index + 2]
      const isLast = index === flat.length - 1
      /** La /r/ solo se pronuncia si le sigue una vocal. */
      const rIsSilent = next?.symbol === 'R' && !(afterNext && isVowel(afterNext))
      const rIsPrevocalic = next?.symbol === 'R' && afterNext && isVowel(afterNext)

      // --- la propia /r/ ---
      if (symbol === 'R') {
        const soundsHere = next && isVowel(next)
        if (soundsHere) out += 'r'
        else if (isLast) linkingR = true
        continue
      }

      // --- vocales seguidas de /r/ muda: se funden en una vocal larga o un diptongo ---
      if (rIsSilent) {
        switch (symbol) {
          case 'AA': out += 'ɑː'; break
          case 'AO': out += 'ɔː'; break
          case 'OW': out += 'ɔː'; break
          case 'EH': case 'AE': out += 'eə'; break
          case 'IH': case 'IY': out += 'ɪə'; break
          case 'UH': case 'UW': out += 'ʊə'; break
          case 'AY': out += 'aɪə'; break
          case 'AW': out += 'aʊə'; break
          case 'EY': out += 'eə'; break
          case 'AH': out += stress === 0 ? SCHWA : 'ɜː'; break
          case 'ER': out += stress === 0 ? SCHWA : 'ɜː'; break
          default: out += BRITISH[symbol] ?? ''
        }
        continue
      }

      switch (symbol) {
        case 'ER':
          // `ER` lleva la /r/ dentro. Si le sigue vocal, esa /r/ sí suena:
          // `history` es /ˈhɪstəri/, no /ˈhɪstəi/.
          out += stress === 0 ? SCHWA : 'ɜː'
          if (next && isVowel(next)) pendingR = true
          else if (isLast) linkingR = true
          break

        case 'AH': {
          const spelledI = spellingOf.get(index) === 'i' || spellingOf.get(index) === 'y'
          if (isIle && index === flat.length - 2) out += 'aɪ'
          else if (stress !== 0) out += BRITISH.AH
          else if (index === ityIndex) out += SCHWA
          else if (spelledI || isBritishKit(word, previous, next)) out += 'ɪ'
          else out += SCHWA
          break
        }

        case 'AA':
          if (index === reducedIndex) out += SCHWA
          else if (rIsPrevocalic) out += spelledAr ? 'ɑː' : 'ɒ'
          else if (PALM.has(word)) out += 'ɑː'
          else if (TRAP_FROM_LOT.has(word)) out += 'æ'
          else if (isThoughtSpelling(word, spellingOf.get(index))) out += 'ɔː'
          else out += 'ɒ'
          break

        case 'AO':
          if (index === reducedIndex) out += SCHWA
          // `orange` es /ˈɒrɪndʒ/ y `story` es /ˈstɔːri/. La doble erre lo delata:
          // `abhorrence`, `quarrel`, `horror` llevan la vocal breve.
          else if (rIsPrevocalic) out += ORANGE.has(word) || /(orr|arr)/.test(word) ? 'ɒ' : 'ɔː'
          else out += CLOTH.has(word) ? 'ɒ' : 'ɔː'
          break

        case 'AE':
          out += BATH.has(word) ? 'ɑː' : 'æ'
          break

        case 'EH':
          // la /e/ de -ary se reduce a schwa
          if (index === reducedIndex) out += SCHWA
          // El RP mantiene tres clases donde el americano fundió todo en /ɛr/:
          // `marry` /ˈmæri/, `merry` /ˈmeri/ y `Mary` /ˈmeəri/. El CMU las escribe
          // igual, así que las separa la ortografía: la doble erre marca la primera.
          else if (rIsPrevocalic && (TRAP_BEFORE_R.has(word) || /arr/.test(word))) out += 'æ'
          else if (rIsPrevocalic && /(ar|air|ear)/.test(word)) out += 'eə'
          else out += 'e'
          break

        case 'IY':
          // `series` es /ˈsɪəriːz/, no /ˈsiːriːz/: la /r/ intervocálica también deja
          // diptongo. Ver el caso `IH`.
          if (rIsPrevocalic && !/(ir|yr)/.test(word)) out += 'ɪə'
          // happy tensing: la /i/ átona es breve — `city` /ˈsɪti/, `react` /riˈækt/
          else out += stress === 0 || index === happyIndex ? 'i' : 'iː'
          break

        case 'IH':
          // `serious` es /ˈsɪəriəs/ y `spirit` es /ˈspɪrɪt`: las dos llevan /r/ entre
          // vocales, y lo que las separa es con qué letra se escribe la vocal. Con `e`
          // o `ea` queda el diptongo; con `i` o `y`, la vocal breve.
          if (rIsPrevocalic && !/(ir|yr)/.test(word)) out += 'ɪə'
          else out += 'ɪ'
          break

        case 'UH':
          // `during`, `Europe`, `jury`, `rural`: /ʊə/ también ante /r/ intervocálica,
          // y con el yod si la consonante anterior lo admite.
          if (rIsPrevocalic) {
            const yod = previous !== undefined
              && YOD_TRIGGERS.has(previous.symbol)
              && !YOD_BLOCKED.has(word)
            out += yod ? 'jʊə' : 'ʊə'
          } else {
            out += 'ʊ'
          }
          break

        case 'UW': {
          // `new` es /njuː/ y `noon` es /nuːn/: las dos llevan /uː/ tras /n/, y lo único
          // que las separa es cómo se escribe la vocal. Con `u`, `ew`, `eu`, `ue` o `ui`
          // el británico conserva el yod; con `oo`, `ou` u `o`, no.
          const spelling = spellingOf.get(index)
          const yodSpelling = spelling !== undefined && /^(u|eu|ew|ue|ui|iu|ieu)$/.test(spelling)
          const takesYod = previous !== undefined
            && YOD_TRIGGERS.has(previous.symbol)
            && !YOD_BLOCKED.has(word)
            && (yodSpelling || YOD.has(word))
          out += takesYod ? 'juː' : 'uː'
          break
        }

        default:
          out += BRITISH[symbol] ?? ''
      }
    }
  }

  return { ipa: out || word, linkingR }
}

/** Atajo: de la cadena ARPABET del CMU directamente al AFI de los dos acentos. */
export function transcribeWord(arpabet: string, word: string): { us: string; uk: WordIpa } {
  const phones = parseArpabet(arpabet)
  return { us: toAmerican(phones, word), uk: toBritish(phones, word) }
}
