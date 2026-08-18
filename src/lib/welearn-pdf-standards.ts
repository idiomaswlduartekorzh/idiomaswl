// Fuente única de los datos de marca y del texto legal que llevan los PDFs
// descargables de WeLearn. Lo usan tanto la plantilla (src/lib/pdfDocument.ts)
// como las páginas web que ofrecen la descarga, para que el aviso de propiedad
// diga exactamente lo mismo en los dos sitios.

export const WELEARN_PDF_STANDARD_VERSION = '1.0'
export const WELEARN_PDF_OWNER = 'Material original propiedad de Idiomas WeLearn.'
export const WELEARN_PDF_NOTICE = 'Este material es propiedad de Idiomas WeLearn. No es un documento oficial del examen.'
export const WELEARN_PDF_BASE_URL = 'https://www.idiomaswl.com'

// PDF suelto, subido a mano a /public/downloads, con su propia landing.
// Es anterior a la plantilla generada; se queda como está.
export const IELTS_INTRODUCTION_PDF = {
  href: '/downloads/ielts-writing-task-1-introduccion-paraphrasing-welearn.pdf',
  landingPath: '/recursos/ielts-writing-task-1-introduccion-pdf',
  title: 'IELTS Writing Task 1 Introduccion PDF: guia de paraphrasing',
} as const

// ---- Marca ------------------------------------------------------------------

export const WELEARN_BRAND = {
  name: 'Idiomas WeLearn',
  tagline: 'The power of communication',
  claim: 'Aprender un idioma, en serio.',
  site: 'idiomaswl.com',
  city: 'Bucaramanga, Colombia',
  whatsapp: '573005004253',
} as const

// Colores tomados del logo original (public/images/welearn-logo.png), no de la
// paleta del sitio: el membrete tiene que casar con el logo que lleva encima.
// El azul del sitio (#14215c) es más oscuro y se usa para el texto, donde manda
// la legibilidad sobre papel.
export const WELEARN_LOGO_BLUE: [number, number, number] = [8, 53, 164]    // #0835a4
export const WELEARN_LOGO_RED: [number, number, number] = [227, 7, 12]     // #e3070c

// Recorte del logo (wordmark + swoosh + claim) preparado para el membrete.
// Generado desde welearn-logo.png; el ratio se guarda aquí porque jsPDF exige
// ancho y alto explícitos y deformar el logo es un error de marca, no de layout.
export const WELEARN_PDF_MARK = {
  src: '/images/welearn-pdf-mark.png',
  ratio: 760 / 251,
} as const

// ---- Legal ------------------------------------------------------------------

// El año se calcula en el momento de generar el PDF, no al compilar: un PDF
// descargado el año que viene tiene que llevar el año que viene.
export function welearnCopyright(year: number = new Date().getFullYear()): string {
  return `© ${year} ${WELEARN_BRAND.name}. Todos los derechos reservados.`
}

export const WELEARN_PDF_LICENSE =
  'Uso personal y educativo. Prohibida su reproducción total o parcial, su venta o su distribución sin autorización escrita.'

export const WELEARN_PDF_SOURCE_NOTE =
  'Descargado de idiomaswl.com. La versión viva de este material está siempre en el sitio.'
