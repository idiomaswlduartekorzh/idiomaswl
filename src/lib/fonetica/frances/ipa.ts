/**
 * Del francés escrito al AFI, por reglas.
 *
 * El francés está a medio camino entre el inglés y el coreano. No necesita diccionario
 * —su ortografía sí predice la pronunciación, al revés que la inglesa— pero tampoco es
 * transparente: hay que saber qué letras callan, cuáles se juntan para formar un solo
 * sonido y cuáles reaparecen cuando la palabra siguiente empieza por vocal.
 *
 *     petit      →  /pəti/     la `t` final no suena
 *     petit ami  →  /pəti tami/  …salvo aquí, que sí
 *     beaucoup   →  /boku/     `eau` es un solo sonido, y la `p` calla
 *
 * ## Qué devuelve, y por qué no solo el AFI
 *
 * Además de la transcripción, marca **qué letras no suenan**. Eso es la mitad de la
 * clase: un hispanohablante que ve `beaucoup` pronuncia las nueve letras, y el problema
 * no se arregla dándole /boku/ —se arregla enseñándole que cuatro de esas letras están
 * mudas y cuáles son.
 *
 * ## Cómo funciona
 *
 * Recorre la palabra de izquierda a derecha probando reglas ordenadas de más larga a más
 * corta, y se queda con la primera que encaje. El orden **no es negociable**: si `an` se
 * comprobara después de `a`, ninguna vocal nasal se formaría nunca.
 */

/** Letras que cuentan como vocal para las reglas de contexto. */
const VOWELS = 'aeiouyàâäéèêëîïôöùûüÿœæ'

const isVowel = (character: string | undefined): boolean =>
  character !== undefined && VOWELS.includes(character)

/**
 * Consonantes finales que SÍ suenan.
 *
 * La regla mnemotécnica francesa es «CaReFuL»: c, r, f, l. El resto de consonantes
 * finales callan. Tiene excepciones en las dos direcciones y por eso existe la lista de
 * `EXCEPTIONS`, pero como regla de base acierta la gran mayoría.
 */
const SOUNDED_FINALS = 'crfl'

export interface FrenchReading {
  readonly ipa: string
  /** Índices de las letras que no suenan, para poder atenuarlas en pantalla. */
  readonly silent: number[]
  /**
   * Consonante que reaparece si la palabra siguiente empieza por vocal.
   *
   * `les` es /le/, pero `les amis` es /le‿zami/. La `s` no solo vuelve: suena /z/.
   */
  readonly liaison: string | null
}

interface Context {
  readonly word: string
  readonly index: number
  /** Lo que viene justo después del trozo que se está resolviendo. */
  readonly next: string | undefined
  readonly afterNext: string | undefined
  readonly atStart: boolean
  /** El trozo llega hasta el final de la palabra. */
  readonly atEnd: boolean
  /** El AFI emitido hasta aquí. Hace falta para saber si la schwa se cae. */
  readonly emitted: string
}

/** Símbolos vocálicos del AFI francés, para mirar atrás en lo ya emitido. */
const IPA_VOWELS = 'aeiouyɛœøɔəɑɥ'

/**
 * ¿Lo emitido termina en vocal + UNA consonante?
 *
 * Es la condición de la caída de la `e` muda: `allemand` se dice /almɑ̃/ y no /aləmɑ̃/,
 * porque quitarla deja `lm`, que el francés pronuncia sin problema. La schwa solo se
 * sostiene cuando quitarla amontonaría tres consonantes.
 */
function endsVowelConsonant(emitted: string): boolean {
  const chars = [...emitted.normalize('NFC').replace(/[\u0303\u0361]/g, '')]
  if (chars.length < 2) return false
  const last = chars[chars.length - 1]
  const previous = chars[chars.length - 2]
  return !IPA_VOWELS.includes(last) && IPA_VOWELS.includes(previous)
}

interface Rule {
  /** Letras que consume, en minúsculas. */
  readonly match: string
  /** Qué suena. Cadena vacía = la letra calla. */
  readonly ipa: string | ((context: Context) => string)
  /** Si falla, se prueba la regla siguiente. */
  readonly when?: (context: Context) => boolean
}

/** La consonante final suena si es una de CaReFuL. */
const finalSounds = (letter: string) => SOUNDED_FINALS.includes(letter)

/**
 * Reglas, de más larga a más corta.
 *
 * Dentro de la misma longitud, primero la más específica. Cambiar este orden cambia el
 * resultado: es una tabla, no una lista.
 */
const RULES: Rule[] = [
  /* ── Cuatro y tres letras ─────────────────────────────────────────────── */
  { match: 'eaux', ipa: 'o' },
  { match: 'aient', ipa: 'ɛ', when: (c) => c.atEnd },   // verbos: ils avaient
  { match: 'eux', ipa: 'ø', when: (c) => c.atEnd },
  { match: 'eau', ipa: 'o' },
  { match: 'œur', ipa: 'œʁ' },
  { match: 'eur', ipa: 'œʁ', when: (c) => c.atEnd },
  { match: 'oin', ipa: 'wɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'ain', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'aim', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'ein', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'ien', ipa: 'jɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  // Puñado de palabras donde `ill` suena /il/ y no /ij/. Son pocas y muy frecuentes.
  { match: 'ill', ipa: 'il', when: (c) => ILL_AS_L.has(c.word) },
  { match: 'ouill', ipa: 'uj' },
  { match: 'euill', ipa: 'œj' },
  { match: 'aill', ipa: 'aj' },
  { match: 'eill', ipa: 'ɛj' },
  { match: 'ill', ipa: 'ij' },
  { match: 'ail', ipa: 'aj', when: (c) => c.atEnd },
  { match: 'eil', ipa: 'ɛj', when: (c) => c.atEnd },
  // `-ent` final: medido sobre 7.172 palabras de referencia. Calla en el 94-97 % de los
  // casos —son terceras personas del plural: `parlent`, `abadassent`— salvo detrás de
  // `m`, donde suena el 98 % (`moment`, `clément`), y detrás de `c` (67 %).
  { match: 'ent', ipa: 'ɑ̃', when: (c) => c.atEnd && 'mc'.includes(c.word[c.index - 1] ?? '') },
  { match: 'ent', ipa: '', when: (c) => c.atEnd && c.index >= 2 },
  // `-ai` final de verbo suena /e/: j'irai, abadai.
  { match: 'ai', ipa: 'e', when: (c) => c.atEnd },
  // `-er` final es /e/ y no /ɛʁ/: parler, alger, boulanger. Es la terminación más
  // frecuente del francés y sin ella fallaban 3.453 palabras.
  { match: 'ier', ipa: 'je', when: (c) => c.atEnd },
  { match: 'ers', ipa: 'ɛʁ', when: (c) => c.atEnd },
  // Una `s` final muda arrastra a la consonante que la precede: `desprets` es /dɛspʁɛ/.
  { match: 'ts', ipa: '', when: (c) => c.atEnd },
  { match: 'ds', ipa: '', when: (c) => c.atEnd },
  { match: 'ps', ipa: '', when: (c) => c.atEnd },
  { match: 'xs', ipa: '', when: (c) => c.atEnd },
  { match: 'er', ipa: 'e', when: (c) => c.atEnd && !ER_KEEPS_R.has(c.word) },
  { match: 'ez', ipa: 'e', when: (c) => c.atEnd },
  // `-es` final calla entera: actes /akt/, femmes /fam/.
  // …pero no en los monosílabos: `les` es /le/, `des` /de/, `ces` /se/. Solo calla
  // cuando hay una raíz de verdad delante.
  { match: 'es', ipa: 'e', when: (c) => c.atEnd && c.index === 1 },
  { match: 'es', ipa: '', when: (c) => c.atEnd },
  // `ti` ante vocal suena /sj/: nation, patience. Salvo tras s o x, donde se queda /tj/:
  // question, mixtion.
  // Solo en los sufijos donde de verdad ocurre —`nation`, `patience`, `partiel`— y no
  // tras `s` o `x`, que lo bloquean: `question` se dice /kɛstjɔ̃/.
  {
    match: 'ti',
    ipa: 'sj',
    when: (c) => {
      const rest = c.word.slice(c.index + 2)
      if ('sx'.includes(c.word[c.index - 1] ?? '')) return false
      return /^(on|en|al|el|eu|air)/.test(rest)
    },
  },

  /* ── Dos letras: vocales nasales ──────────────────────────────────────── */
  // La nasal solo se forma si NO le sigue vocal ni la misma nasal doblada:
  // `bon` es /bɔ̃/ pero `bonne` es /bɔn/.
  { match: 'an', ipa: 'ɑ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'am', ipa: 'ɑ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'en', ipa: 'ɑ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'em', ipa: 'ɑ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'in', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'im', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'yn', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'ym', ipa: 'ɛ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'on', ipa: 'ɔ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'om', ipa: 'ɔ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },
  { match: 'un', ipa: 'œ̃', when: (c) => !isVowel(c.next) && c.next !== 'n' },
  { match: 'um', ipa: 'œ̃', when: (c) => !isVowel(c.next) && c.next !== 'm' },

  /* ── Dos letras: vocales ──────────────────────────────────────────────── */
  // `oy` y `ay` ante vocal valen por dos íes: `boyancé` es /bwajɑ̃se/, `payer` /peje/.
  { match: 'oy', ipa: 'waj', when: (c) => isVowel(c.next) },
  { match: 'ay', ipa: 'ɛj', when: (c) => isVowel(c.next) },
  { match: 'au', ipa: 'o' },
  { match: 'ai', ipa: 'ɛ' },
  { match: 'aî', ipa: 'ɛ' },
  { match: 'ei', ipa: 'ɛ' },
  { match: 'oi', ipa: 'wa' },
  { match: 'oî', ipa: 'wa' },
  // `ou` ante vocal es semiconsonante: `oui` es /wi/, no /ui/.
  { match: 'ou', ipa: (c) => (isVowel(c.next) ? 'w' : 'u') },
  { match: 'oû', ipa: 'u' },
  { match: 'où', ipa: 'u' },
  // `eu` es cerrada en sílaba abierta y abierta en cerrada: peu /pø/, peur /pœʁ/.
  // Cerrada en sílaba abierta, abierta en cerrada. La `e` muda final no cierra sílaba,
  // así que `areuse` es /aʁøz/ y no /aʁœz/.
  {
    match: 'eu',
    ipa: (c) => {
      if (c.atEnd || isVowel(c.next)) return 'ø'
      // Cerrada ante /z/ —`areuse`, `heureuse`— pero abierta ante el resto:
      // `jeune` es /ʒœn/.
      if (c.afterNext === 'e' && c.word.length === c.index + 4 && 'sz'.includes(c.next ?? '')) return 'ø'
      if (c.next === 'z') return 'ø'
      return 'œ'
    },
  },
  { match: 'œu', ipa: (c) => (c.atEnd ? 'ø' : 'œ') },
  { match: 'ui', ipa: 'ɥi' },
  { match: 'ue', ipa: 'y', when: (c) => c.atEnd },

  /* ── Dos letras: consonantes ──────────────────────────────────────────── */
  { match: 'ch', ipa: 'ʃ' },
  { match: 'ph', ipa: 'f' },
  { match: 'th', ipa: 't' },
  { match: 'gn', ipa: 'ɲ' },
  { match: 'qu', ipa: 'k' },
  { match: 'gu', ipa: 'ɡ', when: (c) => c.next === 'e' || c.next === 'i' },
  { match: 'ss', ipa: 's' },
  { match: 'cc', ipa: (c) => (c.next === 'e' || c.next === 'i' ? 'ks' : 'k') },
  { match: 'll', ipa: 'l' },
  { match: 'mm', ipa: 'm' },
  { match: 'nn', ipa: 'n' },
  { match: 'tt', ipa: 't' },
  { match: 'pp', ipa: 'p' },
  { match: 'rr', ipa: 'ʁ' },
  { match: 'ff', ipa: 'f' },
  { match: 'bb', ipa: 'b' },
  { match: 'dd', ipa: 'd' },

  /* ── Una letra: vocales ───────────────────────────────────────────────── */
  { match: 'é', ipa: 'e' },
  { match: 'è', ipa: 'ɛ' },
  { match: 'ê', ipa: 'ɛ' },
  { match: 'ë', ipa: 'ɛ' },
  { match: 'à', ipa: 'a' },
  { match: 'â', ipa: 'a' },   // el francés moderno fundió /ɑ/ con /a/
  { match: 'î', ipa: 'i' },
  { match: 'ï', ipa: 'i' },
  { match: 'ô', ipa: 'o' },
  { match: 'ö', ipa: 'ɔ' },
  { match: 'ù', ipa: 'y' },
  { match: 'û', ipa: 'y' },
  { match: 'ü', ipa: 'y' },
  { match: 'œ', ipa: 'œ' },
  { match: 'a', ipa: 'a' },
  // `i` ante vocal es semiconsonante: `chipiez` es /ʃipje/. Pero no ante una `e` final
  // muda, que no suena: `vie` es /vi/.
  { match: 'i', ipa: (c) => (isVowel(c.next) && !(c.next === 'e' && c.afterNext === undefined) ? 'j' : 'i') },
  // La `o` es cerrada al final de palabra y abierta ante consonante: mot /mo/, sort /sɔʁ/.
  // Cerrada al final y ante /z/ —`rose`, `chose`—, abierta ante el resto.
  {
    match: 'o',
    ipa: (c) => {
      if (c.atEnd) return 'o'
      if (c.next === 'z') return 'o'
      if (c.next === 's' && isVowel(c.afterNext)) return 'o'
      // Si la consonante que sigue es final y muda, la sílaba queda abierta:
      // `bardot` es /baʁdo/, no /baʁdɔt/.
      if (c.afterNext === undefined && c.next !== undefined
          && !isVowel(c.next) && !'crfl'.includes(c.next)) return 'o'
      return 'ɔ'
    },
  },
  // `u` ante vocal es semiconsonante: `gargantua` es /ɡaʁɡɑ̃tɥa/, `nuage` es /nɥaʒ/.
  { match: 'u', ipa: (c) => (isVowel(c.next) && c.next !== 'e' ? 'ɥ' : 'y') },
  { match: 'y', ipa: (c) => (isVowel(c.next) ? 'j' : 'i') },
  // La `e` final calla; en sílaba cerrada es abierta; si no, schwa.
  {
    match: 'e',
    ipa: (c) => {
      // La `e` final calla… salvo en los monosílabos gramaticales, donde es la única
      // vocal que tienen: `le` es /lə/, `je` /ʒə/, `de` /də/.
      if (c.atEnd) return c.index === 1 ? 'ə' : ''
      const next = c.next
      const after = c.afterNext
      if (next === undefined || isVowel(next)) return 'ə'
      if (next === 'x') return 'ɛ'

      // ── Primero, la sílaba cerrada. El ORDEN importa: una `e` en sílaba cerrada es
      // /ɛ/ y NUNCA se cae. Comprobar antes la caída daba `annette` → /ant/.
      // Dos consonantes cierran la sílaba, salvo si la segunda es `r` o `l`: ahí forman
      // grupo y se van juntas a la sílaba siguiente (`secret` es /səkʁɛ/).
      if (after === undefined) return 'ɛ'
      if (!isVowel(after) && !'rlh'.includes(after)) return 'ɛ'

      // ── Y solo entonces, la caída de la `e` muda: se cae si al quitarla no se
      // amontonan tres consonantes (la «loi des trois consonnes»). `allemand` da
      // /almɑ̃/ porque `lm` se pronuncia; `abaderiez` conserva la suya, porque quitarla
      // dejaría `dʁj` —la `i` de `iez` se vuelve semiconsonante y cuenta como tercera—.
      const afterBecomesSemivowel = 'iyu'.includes(after) && isVowel(c.word[c.index + 3])
      if (endsVowelConsonant(c.emitted) && !afterBecomesSemivowel) return ''

      return 'ə'
    },
  },

  /* ── Una letra: consonantes ───────────────────────────────────────────── */
  { match: 'ç', ipa: 's' },
  // Ojo con la comparación: `'eiy'.includes('')` es TRUE en JavaScript, así que sin
  // comprobar antes que haya letra siguiente, toda `c` final se ablandaba y `avec`
  // sonaba /avɛs/.
  // Además, la `c` final tras vocal nasal calla: `blanc` es /blɑ̃/, `franc` /fʁɑ̃/.
  {
    match: 'c',
    ipa: (c) => {
      if (c.atEnd && 'nm'.includes(c.word[c.index - 1] ?? '')) return ''
      if (c.next === undefined) return 'k'
      return 'eiyéèê'.includes(c.next) ? 's' : 'k'
    },
  },
  { match: 'g', ipa: (c) => (c.next !== undefined && 'eiyéèê'.includes(c.next) ? 'ʒ' : 'ɡ') },
  // La `s` entre vocales suena /z/: rose /ʁoz/, poison /pwazɔ̃/.
  { match: 's', ipa: (c) => (!c.atStart && isVowel(c.word[c.index - 1]) && isVowel(c.next) ? 'z' : 's') },
  // /ɡz/ solo en el prefijo `ex-` ante vocal: `exact` /ɛɡzakt/ frente a `aixois` /ɛkswa/.
  { match: 'x', ipa: (c) => (c.index === 1 && c.word[0] === 'e' && isVowel(c.next) ? 'ɡz' : 'ks') },
  { match: 'h', ipa: '' },
  { match: 'j', ipa: 'ʒ' },
  { match: 'w', ipa: 'w' },
  { match: 'r', ipa: 'ʁ' },
  // Ensordecimiento ante consonante sorda: `absalom` se dice /apsalɔm/.
  { match: 'b', ipa: (c) => ('stpkf'.includes(c.next ?? '') ? 'p' : 'b') },
  { match: 'd', ipa: (c) => ('stpkf'.includes(c.next ?? '') ? 't' : 'd') },
  { match: 'f', ipa: 'f' },
  { match: 'k', ipa: 'k' },
  { match: 'l', ipa: 'l' },
  { match: 'm', ipa: 'm' },
  { match: 'n', ipa: 'n' },
  { match: 'p', ipa: 'p' },
  { match: 't', ipa: 't' },
  { match: 'v', ipa: 'v' },
  { match: 'z', ipa: 'z' },
]

/**
 * Palabras donde `-er` final SÍ suena /ɛʁ/.
 *
 * La terminación `-er` es /e/ en el 99 % de los casos —todos los infinitivos y casi todos
 * los nombres— pero un puñado de palabras muy frecuentes conservan la erre.
 */
/** Donde `ill` suena /il/ y no /ij/: `ville` es /vil/, no /vij/. */
const ILL_AS_L = new Set([
  'ville', 'villes', 'village', 'villages', 'villageois', 'mille', 'milles', 'million',
  'millions', 'milliard', 'milliards', 'tranquille', 'tranquilles', 'tranquillement',
  'bacille', 'billion', 'distiller', 'osciller', 'vaciller', 'pupille',
])

const ER_KEEPS_R = new Set([
  'mer', 'fer', 'hier', 'cher', 'hiver', 'amer', 'enfer', 'cancer', 'ver', 'fier',
  'super', 'poker', 'revolver', 'starter', 'reporter', 'leader', 'manager',
])

/** Cómo sonaría cada letra final si de verdad se pronunciara. Sirve para saber si ya sonó. */
const LIAISON_LETTER_SOUNDS: Record<string, string> = {
  s: 's', x: 'ks', z: 'z', d: 'd', t: 't', n: 'n', p: 'p', r: 'ʁ', g: 'ɡ',
}

/** Con qué suena la consonante final cuando reaparece ante vocal. */
const LIAISON_SOUNDS: Record<string, string> = {
  s: 'z', x: 'z', z: 'z',
  d: 't', t: 't',
  n: 'n', p: 'p', r: 'ʁ', g: 'k',
}

export function transcribeFrench(raw: string): FrenchReading | null {
  const word = raw.toLowerCase()
  if (!/^[a-zà-öø-ÿœæ'-]+$/i.test(word)) return null

  let ipa = ''
  const silent: number[] = []
  let index = 0

  while (index < word.length) {
    const rest = word.slice(index)
    let applied = false

    for (const rule of RULES) {
      if (!rest.startsWith(rule.match)) continue
      const end = index + rule.match.length
      const context: Context = {
        word,
        index,
        next: word[end],
        afterNext: word[end + 1],
        atStart: index === 0,
        atEnd: end === word.length,
        emitted: ipa,
      }
      if (rule.when && !rule.when(context)) continue

      const sound = typeof rule.ipa === 'function' ? rule.ipa(context) : rule.ipa
      // Una consonante final que no sea CaReFuL calla, salvo que la regla ya lo diga.
      const isFinalConsonant = context.atEnd
        && rule.match.length === 1
        && !isVowel(rule.match)
        && rule.match !== 'h'
      const finalSilent = isFinalConsonant && !finalSounds(rule.match)

      if (sound === '' || finalSilent) {
        for (let k = index; k < end; k++) silent.push(k)
      } else {
        ipa += sound
      }

      index = end
      applied = true
      break
    }

    if (!applied) {
      // Carácter sin regla (apóstrofo, guion): se salta sin inventar.
      silent.push(index)
      index += 1
    }
  }

  const lastLetter = word[word.length - 1]
  let liaison: string | null = null
  // Hay liaison si la letra final es de las que enlazan Y no ha sonado ya. Se comprueba
  // sobre el resultado, no sobre la lista de mudas: en `les` la `s` desaparece dentro de
  // la regla de `-es`, así que nunca llegó a marcarse como muda, pero enlaza igual.
  const wouldSound = LIAISON_LETTER_SOUNDS[lastLetter]
  if (LIAISON_SOUNDS[lastLetter] && (wouldSound === undefined || !ipa.endsWith(wouldSound))) {
    liaison = LIAISON_SOUNDS[lastLetter]
  } else if ((lastLetter === 'n' || lastLetter === 'm') && /[ɑ̃ɛ̃ɔ̃œ̃]$/.test(ipa)) {
    // Vocal nasal escrita con `n`: esa `n` no suena sola, pero reaparece ante vocal.
    // `un` es /œ̃/ y `un homme` es /œ̃‿nɔm/.
    liaison = 'n'
  }

  return { ipa, silent, liaison }
}
