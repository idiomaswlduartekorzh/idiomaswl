/**
 * Descomposición del hangul y reglas de cambio fonético (음운 변동).
 *
 * El coreano es lo contrario del inglés: **no necesita diccionario**. Cada bloque
 * silábico dice qué letras lo forman, y lo que hay que saber es cómo cambian esas letras
 * al tocarse con las de al lado. Eso son reglas, y son deterministas.
 *
 *     학교   se escribe  ㅎㅏㄱ + ㄱㅛ   y suena  [학꾜]  /hakˈk͈jo/
 *     국물   se escribe  ㄱㅜㄱ + ㅁㅜㄹ  y suena  [궁물]  /kuŋmul/
 *     신라   se escribe  ㅅㅣㄴ + ㄹㅏ   y suena  [실라]  /ɕilla/
 *
 * Sin estas reglas, una transcripción de coreano es una transliteración letra a letra —
 * exactamente el error que comete el estudiante principiante, y el que esta herramienta
 * existe para corregir.
 *
 * Las reglas y su orden salen de la 표준 발음법 (Normas de Pronunciación Estándar) del
 * Instituto Nacional de la Lengua Coreana. El orden **importa**: aplicar la tensificación
 * antes de la nasalización da resultados distintos, y equivocados.
 */

/** Los 19 sonidos que pueden abrir sílaba, en el orden que fija Unicode. */
export const INITIALS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const

/** Las 21 vocales, en el orden de Unicode. */
export const MEDIALS = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
  'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
] as const

/** Los 27 cierres posibles más el vacío. Los de dos letras son los grupos consonánticos. */
export const FINALS = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
  'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const

const BASE = 0xac00
const LAST = 0xd7a3

/** Una sílaba ya abierta en sus tres piezas. `final` vacío significa sílaba abierta. */
export interface Syllable {
  initial: string
  medial: string
  /** Puede ser un grupo consonántico: `ㄺ`, `ㄼ`… Son los 겹받침. */
  final: string
  /**
   * Este cierre tensa la consonante siguiente aunque no sea oclusivo.
   *
   * Lo pone la simplificación de grupos, y solo para `ㄵ ㄻ ㄼ ㄾ ㅀ`. Ver
   * `TENSIFYING_CLUSTERS`.
   */
  tensifies?: boolean
}

export function isHangulSyllable(character: string): boolean {
  const code = character.codePointAt(0) ?? 0
  return code >= BASE && code <= LAST
}

/**
 * Abre un bloque silábico en sus tres piezas.
 *
 * Es aritmética pura sobre el código Unicode, no una tabla de búsqueda: el hangul se
 * diseñó para esto. `hangul-js`, que ya está en el proyecto, no sirve aquí porque
 * devuelve las letras en fila sin decir cuál cierra la sílaba, y toda la fonética
 * coreana depende exactamente de eso.
 */
export function decompose(character: string): Syllable | null {
  if (!isHangulSyllable(character)) return null
  const code = (character.codePointAt(0) ?? 0) - BASE
  const finalIndex = code % 28
  const medialIndex = ((code - finalIndex) / 28) % 21
  const initialIndex = Math.floor((code - finalIndex) / 28 / 21)
  return {
    initial: INITIALS[initialIndex],
    medial: MEDIALS[medialIndex],
    final: FINALS[finalIndex],
  }
}

/* ------------------------------------------------------------------ *
 * Tablas de las reglas
 * ------------------------------------------------------------------ */

/**
 * 음절의 끝소리 규칙 — el cierre de sílaba solo tiene siete sonidos.
 *
 * Da igual qué letra se escriba al final: al pronunciarla sin vocal detrás, se reduce a
 * uno de estos siete. Por eso `옷`, `옺` y `옽` suenan las tres igual.
 */
const NEUTRALIZED: Record<string, string> = {
  'ㄱ': 'ㄱ', 'ㄲ': 'ㄱ', 'ㅋ': 'ㄱ',
  'ㄴ': 'ㄴ',
  'ㄷ': 'ㄷ', 'ㅅ': 'ㄷ', 'ㅆ': 'ㄷ', 'ㅈ': 'ㄷ', 'ㅊ': 'ㄷ', 'ㅌ': 'ㄷ', 'ㅎ': 'ㄷ',
  'ㄹ': 'ㄹ',
  'ㅁ': 'ㅁ',
  'ㅂ': 'ㅂ', 'ㅍ': 'ㅂ',
  'ㅇ': 'ㅇ',
}

/**
 * 자음군 단순화 — de dos consonantes finales solo se pronuncia una.
 *
 * Cuál se queda no es predecible: `읽다` suena [익따] (se queda la ㄱ) pero `읽어` suena
 * [일거] (pasa la ㄱ a la sílaba siguiente y se queda la ㄹ). La tabla dice cuál
 * sobrevive cuando NO hay vocal detrás.
 */
const CLUSTER_KEEPS: Record<string, string> = {
  'ㄳ': 'ㄱ', 'ㄵ': 'ㄴ', 'ㄶ': 'ㄴ', 'ㄺ': 'ㄱ', 'ㄻ': 'ㅁ',
  'ㄼ': 'ㄹ', 'ㄽ': 'ㄹ', 'ㄾ': 'ㄹ', 'ㄿ': 'ㅂ', 'ㅀ': 'ㄹ', 'ㅄ': 'ㅂ',
}

/** La letra que se va a la sílaba siguiente cuando el grupo sí tiene vocal detrás. */
const CLUSTER_MOVES: Record<string, [string, string]> = {
  'ㄳ': ['ㄱ', 'ㅅ'], 'ㄵ': ['ㄴ', 'ㅈ'], 'ㄶ': ['ㄴ', 'ㅎ'], 'ㄺ': ['ㄹ', 'ㄱ'],
  'ㄻ': ['ㄹ', 'ㅁ'], 'ㄼ': ['ㄹ', 'ㅂ'], 'ㄽ': ['ㄹ', 'ㅅ'], 'ㄾ': ['ㄹ', 'ㅌ'],
  'ㄿ': ['ㄹ', 'ㅍ'], 'ㅀ': ['ㄹ', 'ㅎ'], 'ㅄ': ['ㅂ', 'ㅅ'],
}

/** 격음화 — al juntarse con ㅎ, la consonante se vuelve aspirada. */
const ASPIRATED: Record<string, string> = {
  'ㄱ': 'ㅋ', 'ㄷ': 'ㅌ', 'ㅂ': 'ㅍ', 'ㅈ': 'ㅊ',
}

/** 경음화 — detrás de una consonante cerrada, la siguiente se tensa. */
const TENSE: Record<string, string> = {
  'ㄱ': 'ㄲ', 'ㄷ': 'ㄸ', 'ㅂ': 'ㅃ', 'ㅅ': 'ㅆ', 'ㅈ': 'ㅉ',
}

/** 비음화 — ante nasal, la oclusiva se nasaliza en el mismo punto de articulación. */
const NASALIZED: Record<string, string> = {
  'ㄱ': 'ㅇ', 'ㄷ': 'ㄴ', 'ㅂ': 'ㅁ',
}

/** Cierres que obligan a tensar la consonante siguiente. */
const OBSTRUENT_FINALS = new Set(['ㄱ', 'ㄷ', 'ㅂ'])

/**
 * Grupos finales que tensan la consonante siguiente pese a acabar en nasal o líquida.
 *
 * `앉다` suena [안따] y `넓게` suena [널께], aunque ni /n/ ni /l/ son oclusivas. La norma
 * (제24항 y 제25항) lo condiciona a que sea **raíz verbal**, que es información
 * morfológica y no está en la escritura: `산도` («también la montaña») sí es [산도].
 *
 * Estos cinco grupos son la parte que sí se puede saber sin morfología, porque solo
 * aparecen en raíces verbales: `앉-`, `얹-`, `삶-`, `젊-`, `넓-`, `핥-`, `싫-`. Los cierres
 * simples `ㄴ` y `ㅁ` se quedan fuera a propósito: ahí no hay forma de acertar siempre, y
 * tensar de más estropearía palabras corrientes.
 */
const TENSIFYING_CLUSTERS = new Set(['ㄵ', 'ㄻ', 'ㄼ', 'ㄾ', 'ㅀ'])

/** Vocales que empiezan por /j/ o son /i/: disparan la palatalización. */
const I_LIKE = new Set(['ㅣ', 'ㅕ', 'ㅑ', 'ㅛ', 'ㅠ', 'ㅖ', 'ㅒ'])

/* ------------------------------------------------------------------ *
 * El motor de reglas
 * ------------------------------------------------------------------ */

/**
 * Aplica los cambios fonéticos a una palabra ya descompuesta.
 *
 * Devuelve las mismas sílabas con las letras que **de verdad se pronuncian**. El orden de
 * los pasos es el de la norma estándar y no es intercambiable.
 */
export interface SoundChangeOptions {
  /**
   * Aplicar la tensificación (경음화).
   *
   * Se puede apagar porque la **Romanización Revisada no la refleja**: `학교` se romaniza
   * `hakgyo` aunque suene [학꾜]. Sí refleja la asimilación (`신라` → `silla`) y la
   * aspiración (`좋다` → `jota`). Es una asimetría de la norma oficial, no un descuido.
   */
  readonly tensify?: boolean
}

export function applySoundChanges(input: Syllable[], options: SoundChangeOptions = {}): Syllable[] {
  const out: Syllable[] = input.map((s) => ({ ...s }))

  for (let i = 0; i < out.length; i++) {
    const current = out[i]
    const next = out[i + 1]
    if (!current.final) continue

    // ── 1. ㅎ: aspira lo que toca, o desaparece ────────────────────────────
    // 좋다 → [조타].  놓아 → [노아].  싫어 → [시러].
    if (next) {
      // Ojo: `ㅀ` y `ㄶ` son UN solo carácter Unicode, no dos. Preguntar por
      // `.endsWith('ㅎ')` no funciona; hay que mirar la tabla de grupos.
      const hasFinalH = current.final === 'ㅎ' || CLUSTER_MOVES[current.final]?.[1] === 'ㅎ'
      if (hasFinalH && ASPIRATED[next.initial]) {
        next.initial = ASPIRATED[next.initial]
        current.final = current.final === 'ㅎ' ? '' : CLUSTER_MOVES[current.final]?.[0] ?? ''
        continue
      }
      if (hasFinalH && next.initial === 'ㅅ') {
        next.initial = 'ㅆ'
        current.final = current.final === 'ㅎ' ? '' : CLUSTER_MOVES[current.final]?.[0] ?? ''
        continue
      }
      if (hasFinalH && next.initial === 'ㅇ') {
        // La ㅎ se cae del todo; si era un grupo, la otra letra sí pasa.
        current.final = current.final === 'ㅎ' ? '' : CLUSTER_MOVES[current.final]?.[0] ?? ''
        if (current.final) { next.initial = current.final; current.final = '' }
        continue
      }
      // ㅎ como inicial detrás de oclusiva: 축하 → [추카]
      if (next.initial === 'ㅎ' && ASPIRATED[NEUTRALIZED[current.final] ?? '']) {
        next.initial = ASPIRATED[NEUTRALIZED[current.final]]
        current.final = ''
        continue
      }
    }

    // ── 2. 연음: la sílaba siguiente empieza sin consonante ────────────────
    // 한국어 → [한구거].  읽어 → [일거].  꽃이 → [꼬치].
    if (next && next.initial === 'ㅇ') {
      const cluster = CLUSTER_MOVES[current.final]
      if (cluster) {
        current.final = cluster[0]
        next.initial = cluster[1]
      } else {
        // 구개음화: ㄷ/ㅌ + 이 se vuelven ㅈ/ㅊ.  같이 → [가치].
        if (current.final === 'ㄷ' && I_LIKE.has(next.medial)) next.initial = 'ㅈ'
        else if (current.final === 'ㅌ' && I_LIKE.has(next.medial)) next.initial = 'ㅊ'
        else next.initial = current.final
        current.final = ''
      }
      continue
    }

    // ── 3. Sin vocal detrás: el grupo se simplifica y el cierre se neutraliza ──
    if (CLUSTER_KEEPS[current.final]) {
      if (TENSIFYING_CLUSTERS.has(current.final)) current.tensifies = true
      current.final = CLUSTER_KEEPS[current.final]
    }
    current.final = NEUTRALIZED[current.final] ?? current.final
  }

  // ── 4. Nasalización y lateralización ────────────────────────────────────
  // Van en una pasada aparte porque miran el cierre YA neutralizado.
  for (let i = 0; i < out.length - 1; i++) {
    const current = out[i]
    const next = out[i + 1]
    if (!current.final) continue

    // 비음화: 국물 → [궁물].  밥맛 → [밤맏].
    if ((next.initial === 'ㄴ' || next.initial === 'ㅁ') && NASALIZED[current.final]) {
      current.final = NASALIZED[current.final]
      continue
    }
    // ㄹ detrás de oclusiva se vuelve ㄴ, y arrastra la nasalización: 독립 → [동닙].
    if (next.initial === 'ㄹ' && NASALIZED[current.final]) {
      next.initial = 'ㄴ'
      current.final = NASALIZED[current.final]
      continue
    }
    // 유음화: ㄴ y ㄹ que se tocan se vuelven las dos ㄹ.  신라 → [실라].  설날 → [설랄].
    if (current.final === 'ㄴ' && next.initial === 'ㄹ') { current.final = 'ㄹ'; continue }
    if (current.final === 'ㄹ' && next.initial === 'ㄴ') { next.initial = 'ㄹ'; continue }
    // ㅁ/ㅇ + ㄹ → ㄴ:  종로 → [종노].
    if ((current.final === 'ㅁ' || current.final === 'ㅇ') && next.initial === 'ㄹ') {
      next.initial = 'ㄴ'
    }
  }

  // ── 5. 경음화, al final: mira el resultado de todo lo anterior ───────────
  // 학교 → [학꾜].  앉다 → [안따].  읽다 → [익따].
  if (options.tensify !== false) {
    for (let i = 0; i < out.length - 1; i++) {
      const current = out[i]
      const next = out[i + 1]
      const tensa = OBSTRUENT_FINALS.has(current.final) || current.tensifies === true
      if (tensa && TENSE[next.initial]) {
        next.initial = TENSE[next.initial]
      }
    }
  }

  return out
}

/** Abre una palabra entera. Devuelve `null` si algún carácter no es un bloque hangul. */
export function decomposeWord(word: string): Syllable[] | null {
  const syllables: Syllable[] = []
  for (const character of word) {
    const syllable = decompose(character)
    if (!syllable) return null
    syllables.push(syllable)
  }
  return syllables.length > 0 ? syllables : null
}
