// Qué caracteres puede escribir de verdad un PDF de WeLearn, y en qué se
// convierten los que no.
//
// Vive aparte de la plantilla porque lo usan dos mundos: el navegador, al
// generar el PDF, y los guiones de `scripts/` que recortan las tipografías y
// vigilan que el contenido no estrene un carácter sin glifo. Si el recorte y el
// saneado no salieran del mismo sitio, acabarían discrepando, y la discrepancia
// se ve como un hueco en blanco dentro del PDF de un estudiante.

export type ScriptFont = 'ko' | 'ja' | 'ru'

// CP1252, lo que Helvetica escribe además de Latin-1: incluye la œ francesa,
// las comillas curvas y la raya larga.
const CP1252_EXTRA = new Set([...'€‚ƒ„…†‡ˆ‰Š‹ŒŽ‘’“”•–—˜™š›œžŸ'])

// Símbolos que el contenido usa y que ninguna de nuestras fuentes dibuja: se
// traducen a algo equivalente en vez de perderse. Comprobado generando PDF de
// prueba: sin esto, "→" sale como !' y "✓" como una comilla suelta.
const TYPOGRAPHIC: Array<[RegExp, string]> = [
  [/→/g, ' -> '], [/←/g, ' <- '], [/↔/g, ' <-> '],
  [/↑/g, ' (sube) '], [/↓/g, ' (baja) '], [/↗/g, ' (sube) '], [/↘/g, ' (baja) '],
  [/[≈∼]/g, '~'], [/≠/g, ' =/= '], [/[−]/g, '-'], [/∞/g, 'infinito'],
  [/∅/g, 'Ø'], [/[─━]/g, '-'],
  [/[✓✔✅]/g, '[OK]'], [/[✗✘❌]/g, '[MAL]'], [/⚡/g, ''],
]

// Media transcripción fonética es peor que ninguna: enseña una pronunciación
// falsa. Si dentro de /…/ o […] hay símbolos AFI, se quita el grupo entero.
const IPA = /[ɐ-ʯʰ-˿̀-ͯ]/
const IPA_GROUP = /[/[]([^/[\]]{0,40})[/\]]/g

/**
 * Bloques Unicode que cubre la fuente de cada documento.
 *
 * No es teoría: se midió sobre las Noto originales. NotoSansJP NO trae hangul,
 * así que un PDF japonés no puede escribir un ejemplo coreano — y hay una
 * lección de japonés A2 que compara con el coreano. Por eso el japonés y el
 * coreano no comparten lista: servir kanji con la fuente coreana daría formas
 * de trazo coreanas a un estudiante de japonés, que es un error de enseñanza.
 */
const RANGOS: Record<ScriptFont, Array<[number, number]>> = {
  ko: [[0x1100, 0x11ff], [0x3000, 0x303f], [0x3040, 0x30ff], [0x3130, 0x318f],
       [0x3400, 0x4dbf], [0x4e00, 0x9fff], [0xac00, 0xd7af], [0xff00, 0xffef], [0x0400, 0x04ff]],
  ja: [[0x3000, 0x303f], [0x3040, 0x30ff], [0x3400, 0x4dbf], [0x4e00, 0x9fff],
       [0xff00, 0xffef], [0x0400, 0x04ff]],
  ru: [[0x0400, 0x04ff]],
}

function escribible(ch: string, script?: ScriptFont): boolean {
  const c = ch.codePointAt(0)!
  if (c <= 0xff || CP1252_EXTRA.has(ch)) return true
  if (!script) return false
  return RANGOS[script].some(([a, b]) => c >= a && c <= b)
}

/** Aplica solo las sustituciones de símbolos, sin filtrar todavía. */
function traducirSimbolos(text: string): string {
  let out = text
  for (const [re, to] of TYPOGRAPHIC) out = out.replace(re, to)
  return out.replace(IPA_GROUP, (whole, inner) => (IPA.test(inner) ? '' : whole))
}

/**
 * Deja el texto tal y como va a salir impreso: símbolos traducidos y fuera lo
 * que la fuente del documento no sabe dibujar.
 */
export function sanitize(text: string, script?: ScriptFont): string {
  if (!text) return text ?? ''
  const out = [...traducirSimbolos(text)].filter((ch) => escribible(ch, script)).join('')
  return out.replace(/ {2,}/g, ' ').trim()
}

/**
 * ¿Se ha caído algo por el camino? Sirve para que el PDF lo diga en voz alta en
 * vez de entregar una frase con un agujero que el estudiante no sabe explicar.
 */
export function pierdeCaracteres(text: string, script?: ScriptFont): boolean {
  if (!text) return false
  return [...traducirSimbolos(text)].some((ch) => !escribible(ch, script))
}
