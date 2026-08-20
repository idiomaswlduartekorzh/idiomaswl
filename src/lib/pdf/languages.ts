// Qué alfabeto necesita cada idioma para salir en PDF.
//
// Helvetica, la fuente que trae el formato PDF, solo escribe latino. Los otros
// tres alfabetos no se pierden: se corrompen. Por eso el coreano, el japonés y
// el ruso llevan su tipografía incrustada dentro del archivo.
//
// No son las Noto completas —la coreana sola son 10 MB— sino un recorte a los
// caracteres que nuestro contenido usa de verdad: 209 KB el coreano, 491 KB el
// japonés, 78 KB el ruso. Se generan con `scripts/build-pdf-fonts.mjs` y las
// vigila `npm run check:pdf-fonts`, que falla si el contenido estrena un
// carácter que el recorte no trae.

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

/**
 * Idiomas que necesitan una fuente incrustada, y cuál. Los que no están aquí se
 * escriben con Helvetica, que ya sabe latino.
 */
const FUENTE_POR_IDIOMA: Record<string, 'ko' | 'ja' | 'ru'> = {
  coreano: 'ko',
  japones: 'ja',
  ruso: 'ru',
}

/** El alfabeto que hay que incrustar para este idioma, si necesita alguno. */
export function scriptFontDe(idioma: string): 'ko' | 'ja' | 'ru' | undefined {
  return FUENTE_POR_IDIOMA[idioma]
}

export function idiomaLabel(idioma: string): string {
  return IDIOMA_LABELS[idioma] ?? idioma
}

/**
 * ¿Se puede generar un PDF legible de este idioma? Hoy los ocho: los latinos con
 * Helvetica y los otros tres con su fuente recortada.
 */
export function canRenderPdf(idioma: string): boolean {
  return idioma in IDIOMA_LABELS
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
