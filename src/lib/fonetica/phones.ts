/**
 * Inventario ARPABET y su conversión a AFI (IPA), con silabificación.
 *
 * El diccionario base es el CMU Pronouncing Dictionary, que escribe las pronunciaciones
 * en ARPABET: 39 fonemas en mayúsculas, y las vocales llevan pegado un dígito de acento
 * (0 átona, 1 tónica principal, 2 tónica secundaria).
 *
 *     computer  ->  K AH0 M P Y UW1 T ER0
 *
 * Convertir eso a AFI no es sustituir símbolo por símbolo. El CMU marca el acento
 * **sobre la vocal**, y el AFI lo marca **delante de la sílaba**. Sin silabificar, el
 * resultado sale como `kəmpjˈuːtə` en vez de `kəmˈpjuːtə` — que es exactamente el error
 * que delata a los transcriptores automáticos. Por eso aquí hay un silabificador de
 * verdad (ver `syllabify`), y no un buscar-y-reemplazar.
 */

/** Un fonema ARPABET ya separado de su dígito de acento. */
export interface Phone {
  /** El símbolo sin dígito: `AH`, `K`, `UW`… */
  readonly symbol: string
  /** 0 átona, 1 tónica principal, 2 secundaria. Las consonantes son `null`. */
  readonly stress: 0 | 1 | 2 | null
}

/** Vocales ARPABET. Todo lo demás es consonante. */
export const VOWELS = new Set([
  'AA', 'AE', 'AH', 'AO', 'AW', 'AY', 'EH', 'ER', 'EY',
  'IH', 'IY', 'OW', 'OY', 'UH', 'UW',
])

export function isVowel(phone: Phone): boolean {
  return VOWELS.has(phone.symbol)
}

/** Parte `"K AH0 M P Y UW1 T ER0"` en fonemas con su acento. */
export function parseArpabet(pronunciation: string): Phone[] {
  return pronunciation
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((token) => {
      const match = /^([A-Z]+)([012])?$/.exec(token)
      if (!match) return { symbol: token, stress: null }
      const [, symbol, digit] = match
      return {
        symbol,
        stress: digit === undefined ? null : (Number(digit) as 0 | 1 | 2),
      }
    })
}

/* ------------------------------------------------------------------ *
 * Silabificación
 * ------------------------------------------------------------------ */

/**
 * Grupos consonánticos que el inglés admite al principio de una sílaba.
 *
 * Se usan para repartir las consonantes que quedan entre dos vocales. El principio es
 * el de **ataque máximo**: de las consonantes disponibles, la sílaba siguiente se queda
 * con todas las que pueda formando un ataque legal, y el resto cierran la anterior.
 * En `computer` (…M P Y UW…) el ataque máximo legal es `PY` (/pj/), así que la `M`
 * cierra la sílaba previa: `kəm-pjuː-tə`.
 */
const LEGAL_ONSETS = new Set([
  // Dos consonantes
  'P L', 'P R', 'P Y', 'T R', 'T W', 'T Y', 'K L', 'K R', 'K W', 'K Y',
  'B L', 'B R', 'B Y', 'D R', 'D W', 'D Y', 'G L', 'G R', 'G W',
  'F L', 'F R', 'F Y', 'TH R', 'TH W', 'SH R', 'SH L', 'SH M', 'SH N', 'SH W',
  'S L', 'S W', 'S P', 'S T', 'S K', 'S M', 'S N', 'S F', 'S Y',
  'HH Y', 'HH W', 'V Y', 'M Y', 'N Y', 'L Y', 'G Y',
  // Tres consonantes
  'S P L', 'S P R', 'S T R', 'S K R', 'S K W', 'S P Y', 'S T Y', 'S K Y',
])

/**
 * Vocales laxas: no pueden quedarse en sílaba abierta.
 *
 * Es la restricción que hace que `happy` se divida `hæp-i` y no `hæ-pi`. Sin ella el
 * ataque máximo dejaría sílabas que el inglés no permite.
 *
 * Solo vale para vocales **tónicas**. La schwa átona sí vive en sílaba abierta, y
 * olvidarlo desplazaba el acento: `hello` salía `həlˈoʊ` en vez de `həˈloʊ`, porque la
 * `l` se quedaba cerrando la primera sílaba en lugar de abrir la segunda.
 */
const LAX_VOWELS = new Set(['AE', 'EH', 'IH', 'UH', 'AH'])

export interface Syllable {
  readonly phones: Phone[]
  /** Acento de su núcleo vocálico. */
  readonly stress: 0 | 1 | 2
  /** Índice del núcleo dentro de `phones`. */
  readonly nucleus: number
}

/**
 * Reparte los fonemas en sílabas por ataque máximo.
 *
 * Las consonantes anteriores al primer núcleo van con la primera sílaba, y las
 * posteriores al último cierran la última. Una palabra sin ninguna vocal (siglas mal
 * formadas, ruido) devuelve una sola sílaba átona, que es lo bastante bueno para no
 * romper nada aguas abajo.
 */
export function syllabify(phones: Phone[]): Syllable[] {
  const nucleiIndexes = phones
    .map((phone, index) => (isVowel(phone) ? index : -1))
    .filter((index) => index >= 0)

  if (nucleiIndexes.length === 0) {
    return [{ phones: [...phones], stress: 0, nucleus: -1 }]
  }

  /** Índice del fonema donde arranca cada sílaba. */
  const starts: number[] = [0]

  for (let i = 1; i < nucleiIndexes.length; i++) {
    const previousNucleus = nucleiIndexes[i - 1]
    const currentNucleus = nucleiIndexes[i]
    const cluster = phones.slice(previousNucleus + 1, currentNucleus)

    // Ataque máximo: se prueba a ceder el grupo entero, luego uno menos, etc.
    let onsetSize = 0
    for (let size = Math.min(cluster.length, 3); size >= 1; size--) {
      const candidate = cluster.slice(cluster.length - size)
      const key = candidate.map((p) => p.symbol).join(' ')
      const legal = size === 1 ? candidate[0].symbol !== 'NG' : LEGAL_ONSETS.has(key)
      if (!legal) continue

      // Una vocal laxa tónica no puede quedar en sílaba abierta: si ceder este ataque
      // dejaría la sílaba anterior sin coda, se cede una consonante menos.
      const leavesPreviousOpen = size === cluster.length
      const previousIsStressedLax = LAX_VOWELS.has(phones[previousNucleus].symbol)
        && phones[previousNucleus].stress !== 0
      if (leavesPreviousOpen && previousIsStressedLax) continue

      onsetSize = size
      break
    }

    starts.push(currentNucleus - onsetSize)
  }

  return starts.map((start, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : phones.length
    const slice = phones.slice(start, end)
    const nucleusIndex = nucleiIndexes[i] - start
    return {
      phones: slice,
      stress: (phones[nucleiIndexes[i]].stress ?? 0) as 0 | 1 | 2,
      nucleus: nucleusIndex,
    }
  })
}

/* ------------------------------------------------------------------ *
 * Mapas a AFI
 * ------------------------------------------------------------------ */

/**
 * Inglés americano (General American).
 *
 * Convención de manual estadounidense: sin marcas de longitud (`i`, `u`, `ɑ`), vocal
 * retrofleja escrita `ɝ`/`ɚ`, y `r` en vez de `ɹ` — que es lo que usan los diccionarios
 * de aprendizaje y lo que el estudiante reconoce.
 */
export const AMERICAN: Record<string, string> = {
  AA: 'ɑ', AE: 'æ', AH: 'ʌ', AO: 'ɔ', AW: 'aʊ', AY: 'aɪ',
  EH: 'ɛ', ER: 'ɝ', EY: 'eɪ', IH: 'ɪ', IY: 'i', OW: 'oʊ',
  OY: 'ɔɪ', UH: 'ʊ', UW: 'u',
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', F: 'f', G: 'ɡ', HH: 'h',
  JH: 'dʒ', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ŋ', P: 'p',
  R: 'r', S: 's', SH: 'ʃ', T: 't', TH: 'θ', V: 'v', W: 'w',
  Y: 'j', Z: 'z', ZH: 'ʒ',
}

/**
 * Inglés británico (RP, convención de Gimson / Cambridge EPD).
 *
 * Diferencias de notación que no son de pronunciación sino de tradición: DRESS se
 * escribe `e` y no `ɛ`, y las vocales largas llevan `ː`. Las vocales que dependen de
 * la /r/ perdida (`ɑː`, `ɪə`, `eə`…) no salen de este mapa: las produce `british.ts`,
 * porque dependen del contexto y no del fonema aislado.
 */
export const BRITISH: Record<string, string> = {
  AA: 'ɒ', AE: 'æ', AH: 'ʌ', AO: 'ɔː', AW: 'aʊ', AY: 'aɪ',
  EH: 'e', ER: 'ɜː', EY: 'eɪ', IH: 'ɪ', IY: 'iː', OW: 'əʊ',
  OY: 'ɔɪ', UH: 'ʊ', UW: 'uː',
  B: 'b', CH: 'tʃ', D: 'd', DH: 'ð', F: 'f', G: 'ɡ', HH: 'h',
  JH: 'dʒ', K: 'k', L: 'l', M: 'm', N: 'n', NG: 'ŋ', P: 'p',
  R: 'r', S: 's', SH: 'ʃ', T: 't', TH: 'θ', V: 'v', W: 'w',
  Y: 'j', Z: 'z', ZH: 'ʒ',
}

/** La vocal átona por defecto: `AH0` no es /ʌ/ sino schwa. */
export const SCHWA = 'ə'
