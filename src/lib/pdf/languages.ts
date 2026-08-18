// Qué idiomas pueden salir hoy en PDF, y por qué los demás no.
//
// Los PDF se escriben con Helvetica, la fuente estándar del formato, que solo
// cubre el alfabeto latino (WinAnsi/CP1252). El coreano, el japonés y el ruso
// no se pierden: se corrompen, salen como basura ilegible.
//
// Arreglarlo exige incrustar una fuente con esos alfabetos en el propio PDF:
// para el ruso bastaría con ~400 KB de una Noto con cirílico; para el hangul y
// el kana hacen falta varios MB, porque son miles de glifos. Es una decisión de
// producto (peso de la descarga) y de licencia, no un despiste: hasta que se
// tome, esas rutas no ofrecen botón de descarga en vez de entregar un PDF roto.

export const IDIOMA_LABELS: Record<string, string> = {
  ingles: 'Inglés',
  aleman: 'Alemán',
  frances: 'Francés',
  italiano: 'Italiano',
  portugues: 'Portugués',
  ruso: 'Ruso',
  japones: 'Japonés',
  coreano: 'Coreano',
}

/** Idiomas cuyo contenido se escribe en alfabeto latino y ya se puede imprimir. */
const LATIN_SCRIPT = new Set(['ingles', 'aleman', 'frances', 'italiano', 'portugues'])

export function idiomaLabel(idioma: string): string {
  return IDIOMA_LABELS[idioma] ?? idioma
}

/** ¿Se puede generar hoy un PDF legible de este idioma? */
export function canRenderPdf(idioma: string): boolean {
  return LATIN_SCRIPT.has(idioma)
}

/** Etiqueta de membrete: "Inglés A2". */
export function levelLabel(idioma: string, nivel: string): string {
  return `${idiomaLabel(idioma)} ${nivel.toUpperCase()}`
}

/** Nombre de archivo sin acentos ni espacios: welearn-ingles-a2-present-perfect.pdf */
export function pdfFilename(...parts: string[]): string {
  const slug = parts
    .join('-')
    .normalize('NFD')
    // marcas diacríticas sueltas que deja NFD; escrito con escapes porque el
    // rango literal son caracteres invisibles en el código
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
  return `welearn-${slug}.pdf`
}
