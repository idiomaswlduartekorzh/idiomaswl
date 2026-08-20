// Plantilla membretada de los PDF descargables de WeLearn.
//
// Todo lo que se descarga del sitio sale de aquí, para que un PDF de gramática
// de inglés y una lectura de portugués se reconozcan como el mismo material y
// como material de WeLearn: mismas píldoras del logo en las esquinas, mismo
// logo arriba a la derecha, mismo copyright abajo, en TODAS las páginas.
//
// Cómo está montada la página (A4, milímetros):
//
//   ┌─────────────────────────────────────────┐
//   │ ◣ píldoras azules          [logo WeLearn]│  banda de membrete (0 → 40)
//   │                          INGLÉS A2 · …  │
//   │ ─────────────────────────────────────── │
//   │                                         │
//   │            contenido (40 → 275)         │
//   │                                         │
//   │ ─────────────────────────────────────── │
//   │ © 2026 Idiomas WeLearn …   Página 1 de 3│  banda legal (275 → 297)
//   │ Uso personal…              píldoras ◥   │
//   └─────────────────────────────────────────┘
//
// El membrete se dibuja al FINAL, sobre todas las páginas ya creadas
// (`finalize()`), no al empezar cada una. Es la única forma de que las páginas
// que abre jspdf-autotable por su cuenta también salgan membretadas: el
// generador no controla cuándo se parte una tabla. Como el membrete vive en los
// márgenes y el contenido nunca entra ahí, dibujarlo encima no tapa nada.

import { sanitize, pierdeCaracteres, type ScriptFont } from '@/lib/pdf/sanitize'
import {
  WELEARN_BRAND,
  WELEARN_LOGO_BLUE,
  WELEARN_LOGO_RED,
  WELEARN_PDF_LICENSE,
  WELEARN_PDF_MARK,
  welearnCopyright,
} from '@/lib/welearn-pdf-standards'

// ---- Paleta -----------------------------------------------------------------
// Los azules y rojos del logo son para los adornos; para el texto se usa el azul
// oscuro del sitio, que sobre papel se lee mejor que el azul vivo del logo.
export const NAVY: RGB = [20, 33, 92]      // #14215c — títulos
export const RED: RGB = [200, 32, 46]      // #c8202e — alertas y etiquetas
export const GREEN: RGB = [16, 120, 85]
export const INK: RGB = [34, 40, 60]       // texto corrido
export const GRAY: RGB = [110, 118, 140]   // texto secundario
export const SOFT: RGB = [232, 236, 244]   // líneas y filas alternas
export const PURPLE: RGB = [124, 58, 237]

export type RGB = [number, number, number]

// ---- Medidas de la página ---------------------------------------------------
const PAGE_W = 210
const PAGE_H = 297
const M = 18                    // margen lateral
const HEADER_H = 40             // dónde empieza el contenido
const FOOTER_TOP = PAGE_H - 22  // dónde tiene que terminar el contenido

// Escala del adorno de esquina: el logo original mide 1254 px de lado y sus
// medidas se guardaron en % de ese lado (ver measurements en el commit). 90 mm
// = 100 % deja el adorno dentro del margen y fuera de la caja de texto.
const ORN = 90 / 100
const WEDGE_SHORT = 21 * ORN    // 18,9 mm — cateto corto del triángulo
const WEDGE_LONG = 36 * ORN     // 32,4 mm — cateto largo

// El saneado vive en `./sanitize`, compartido con los guiones que recortan las
// tipografías: si el recorte y el saneado no salieran del mismo sitio,
// discreparían, y la discrepancia se ve como un hueco en el PDF del estudiante.

/** Saneado con la fuente por defecto (Helvetica). Dentro de un documento, usa su `S`. */
export const S = (text: string) => sanitize(text)

/** ¿Lleva alfabetos que la fuente del documento no dibuja? */
export const hasUnsupportedScript = (text: string, script?: ScriptFont) => pierdeCaracteres(text, script)

// ---- Logo -------------------------------------------------------------------
// Se pide una sola vez por sesión: un tema de gramática y una lectura seguidas
// no deben provocar dos descargas del mismo PNG.
let markCache: string | null | undefined

async function loadMark(): Promise<string | null> {
  if (markCache !== undefined) return markCache
  try {
    const res = await fetch(WELEARN_PDF_MARK.src)
    if (!res.ok) throw new Error(String(res.status))
    const blob = await res.blob()
    markCache = await new Promise<string | null>((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    markCache = null // sin logo el PDF sigue saliendo: el resto del membrete basta
  }
  return markCache
}

// ---- Fuentes de alfabetos no latinos ---------------------------------------
// Helvetica, la fuente que trae el formato PDF, solo escribe latino. Para el
// coreano, el japonés y el ruso hay que meter la tipografía DENTRO del archivo.
//
// Las de `public/fonts/` no son las Noto completas: están recortadas a los
// caracteres que nuestro contenido usa de verdad (`scripts/build-pdf-fonts.mjs`).
// Sin ese recorte, la coreana entera son 10 MB en cada hoja de gramática.
export type { ScriptFont }

const FONT_FAMILY = 'WLScript'
const PESOS: Array<['normal' | 'bold', number]> = [['normal', 400], ['bold', 700]]

// Una vez por sesión y peso: bajar dos veces la misma fuente para dos PDF
// seguidos del mismo idioma sería tirar el ancho de banda del estudiante.
const fontCache = new Map<string, string | null>()

async function loadFontBase64(script: ScriptFont, peso: number): Promise<string | null> {
  const key = `${script}-${peso}`
  if (fontCache.has(key)) return fontCache.get(key)!
  try {
    const res = await fetch(`/fonts/welearn-${key}.ttf`)
    if (!res.ok) throw new Error(String(res.status))
    const buf = await res.arrayBuffer()
    // base64 sin desbordar la pila: los .apply con arrays grandes revientan.
    const bytes = new Uint8Array(buf)
    let bin = ''
    for (let i = 0; i < bytes.length; i += 0x8000) {
      bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000))
    }
    fontCache.set(key, btoa(bin))
  } catch {
    fontCache.set(key, null)
  }
  return fontCache.get(key)!
}

// ---- Metadatos del documento ------------------------------------------------
export interface BrandedDocMeta {
  /** Etiqueta izquierda del membrete: "Inglés A2", "Recurso". */
  levelLabel: string
  /** Etiqueta derecha: "Gramática", "Lectura", "Vocabulario". */
  skillLabel: string
  /** Título real del material; va a las propiedades del archivo. */
  title: string
  /** Descripción corta para las propiedades del archivo. */
  subject?: string
  keywords?: string[]
  /** URL de la página viva de la que sale este material. */
  sourceUrl?: string
  /**
   * Alfabeto que hay que incrustar. Sin esto, el coreano, el japonés y el ruso
   * no salen en blanco: salen corrompidos.
   */
  scriptFont?: ScriptFont
}

/* eslint-disable @typescript-eslint/no-explicit-any */
// jsPDF no publica tipos para todo lo que se usa aquí (triangle, roundedRect,
// setLineCap, lastAutoTable), así que el `doc` va como `any` a propósito.

export async function createBrandedDoc(meta: BrandedDocMeta) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true }) as any
  const contentW = PAGE_W - M * 2
  const state = { y: HEADER_H }

  const mark = await loadMark()

  // ---- tipografía del documento ----
  // Si el material está en un alfabeto que Helvetica no escribe, se incrusta la
  // fuente recortada de ese idioma y se usa para TODO el documento (también el
  // membrete y el español), no solo para las palabras en lengua meta: partir
  // cada línea en trozos por alfabeto es frágil y se nota en el interletraje.
  let familia = 'helvetica'
  if (meta.scriptFont) {
    const cargadas = await Promise.all(
      PESOS.map(async ([, peso]) => loadFontBase64(meta.scriptFont!, peso))
    )
    if (cargadas.every(Boolean)) {
      PESOS.forEach(([estilo, peso], i) => {
        const archivo = `welearn-${meta.scriptFont}-${peso}.ttf`
        doc.addFileToVFS(archivo, cargadas[i])
        doc.addFont(archivo, FONT_FAMILY, estilo)
      })
      familia = FONT_FAMILY
    }
    // Si la descarga falla nos quedamos en Helvetica: el PDF saldrá sin el
    // alfabeto, pero saldrá. El generador ya avisa dentro del documento.
  }

  // Noto no trae cursiva y jsPDF no la finge: la cursiva cae a redonda.
  const F = (estilo: 'normal' | 'bold' | 'italic' = 'normal') =>
    doc.setFont(familia, familia === 'helvetica' ? estilo : estilo === 'italic' ? 'normal' : estilo)

  // Sombrea la `S` del módulo a propósito: dentro de este documento el saneado
  // sabe si hay una fuente que escribe el alfabeto, así que no lo filtra.
  const conFuente = familia !== 'helvetica'
  const S = (text: string) => sanitize(text, conFuente ? meta.scriptFont : undefined)

  doc.setProperties({
    title: S(meta.title),
    subject: S(meta.subject ?? `${meta.levelLabel} · ${meta.skillLabel}`),
    author: WELEARN_BRAND.name,
    keywords: [...(meta.keywords ?? []), WELEARN_BRAND.name, meta.levelLabel, meta.skillLabel].map(S).join(', '),
    creator: `${WELEARN_BRAND.name} — ${WELEARN_BRAND.site}`,
  })

  // ---- adorno de esquina: las píldoras del logo --------------------------
  // Un triángulo en el vértice, con una muesca en forma de píldora recortada
  // sobre él, y dos píldoras sueltas que se alejan y encogen. Es el motivo del
  // logo: barras a 45° con las puntas redondeadas.
  function pill(x1: number, y1: number, x2: number, y2: number, thickness: number, color: RGB) {
    doc.setDrawColor(...color).setLineWidth(thickness).setLineCap('round')
    doc.line(x1, y1, x2, y2)
    doc.setLineCap('butt')
  }

  // Píldora a 45° definida por su centro y su longitud (como en el logo).
  function pillAt(cx: number, cy: number, length: number, thickness: number, color: RGB, up: boolean) {
    const h = length / 2 / Math.SQRT2
    const s = up ? 1 : -1
    pill(cx - h * s, cy + h * s, cx + h * s, cy - h * s, thickness, color)
  }

  function cornerOrnament(corner: 'tl' | 'br') {
    const isTop = corner === 'tl'
    const color = isTop ? WELEARN_LOGO_BLUE : WELEARN_LOGO_RED
    // Arriba-izquierda el triángulo cae por el lado (estrecho y alto); abajo-derecha
    // se tumba a lo largo del pie. Así las dos esquinas pesan igual y ninguna
    // invade la línea del copyright.
    const legX = isTop ? WEDGE_SHORT : WEDGE_LONG
    const legY = isTop ? WEDGE_LONG : WEDGE_SHORT
    const ox = isTop ? 0 : PAGE_W
    const oy = isTop ? 0 : PAGE_H
    const sx = isTop ? 1 : -1
    const sy = isTop ? 1 : -1

    doc.setFillColor(...color)
    doc.triangle(ox, oy, ox + legX * sx, oy, ox, oy + legY * sy, 'F')

    // Muesca blanca sobre el triángulo (el corte que en el logo separa las barras).
    const nx = ox + 5.2 * sx
    const ny = oy + 9.0 * sy
    pillAt(nx, ny, 7.4, 2.5, [255, 255, 255], isTop)

    // Píldoras sueltas: la primera con las medidas medidas del logo, la segunda
    // más pequeña y más lejos, que es lo que da la sensación de movimiento.
    pillAt(ox + 16.6 * sx, oy + 10.5 * sy, 6.2, 2.6, color, isTop)
    pillAt(ox + 23.0 * sx, oy + 15.5 * sy, 4.2, 2.2, color, isTop)
  }

  // ---- membrete y pie, sobre cada página ya creada -----------------------
  function drawLetterhead() {
    const pages = doc.getNumberOfPages()
    const copyright = welearnCopyright()
    const label = S(`${meta.levelLabel} · ${meta.skillLabel}`).toUpperCase()

    for (let p = 1; p <= pages; p++) {
      doc.setPage(p)

      cornerOrnament('tl')
      cornerOrnament('br')

      // logo arriba a la derecha
      const logoW = 38
      const logoH = logoW / WELEARN_PDF_MARK.ratio
      if (mark) {
        // el mismo alias en todas las páginas: jsPDF incrusta el PNG una sola vez
        try { doc.addImage(mark, 'PNG', PAGE_W - M - logoW, 12, logoW, logoH, 'wl-mark', 'FAST') } catch { /* sin logo */ }
      } else {
        F('bold').setFontSize(15).setTextColor(...NAVY)
        doc.text(WELEARN_BRAND.name, PAGE_W - M, 20, { align: 'right' })
      }

      F('bold').setFontSize(8).setTextColor(...RED)
      doc.text(label, PAGE_W - M, 12 + logoH + 4.5, { align: 'right' })

      // regla del membrete: azul de lado a lado, con el arranque en rojo (los dos
      // colores del logo, en el mismo orden en que aparecen en él)
      doc.setDrawColor(...NAVY).setLineWidth(0.5).line(M, 34, PAGE_W - M, 34)
      doc.setDrawColor(...RED).setLineWidth(0.5).line(M, 34, M + 30, 34)

      // pie
      doc.setDrawColor(...SOFT).setLineWidth(0.3).line(M, PAGE_H - 16, PAGE_W - M, PAGE_H - 16)
      F('bold').setFontSize(7.5).setTextColor(...NAVY)
      doc.text(S(`${copyright} · ${WELEARN_BRAND.site}`), M, PAGE_H - 11)
      F('normal').setTextColor(...GRAY)
      doc.text(`Página ${p} de ${pages}`, PAGE_W - M, PAGE_H - 11, { align: 'right' })
      doc.setFontSize(6.4)
      doc.text(S(WELEARN_PDF_LICENSE), M, PAGE_H - 7)
    }
  }

  // ---- helpers de composición -------------------------------------------
  function addPage() {
    doc.addPage()
    state.y = HEADER_H
  }

  function ensure(space: number) {
    if (state.y + space > FOOTER_TOP) addPage()
  }

  function paragraph(text: string, opts: { size?: number; color?: RGB; gap?: number; lh?: number; style?: 'normal' | 'bold' | 'italic'; indent?: number } = {}) {
    const size = opts.size ?? 10
    const lh = opts.lh ?? 4.9
    const indent = opts.indent ?? 0
    F(opts.style ?? 'normal').setFontSize(size).setTextColor(...(opts.color ?? INK))
    const lines = doc.splitTextToSize(S(text), contentW - indent) as string[]
    for (const line of lines) {
      ensure(lh)
      doc.text(line, M + indent, state.y)
      state.y += lh
    }
    state.y += opts.gap ?? 2.4
  }

  function heading(text: string, opts: { size?: number; color?: RGB; gapTop?: number; rule?: boolean } = {}) {
    state.y += opts.gapTop ?? 4
    ensure(10)
    const size = opts.size ?? 12
    F('bold').setFontSize(size).setTextColor(...(opts.color ?? NAVY))
    const lines = doc.splitTextToSize(S(text), contentW) as string[]
    const step = size * 0.48 + 1.4
    let lastBaseline = state.y
    for (const line of lines) { ensure(6); doc.text(line, M, state.y); lastBaseline = state.y; state.y += step }
    // La rayita roja se ancla a la ÚLTIMA línea del título, no a `state.y`: si se
    // dibuja después de reservar el aire del párrafo siguiente cae encima de su
    // primera línea y la tacha.
    if (opts.rule !== false) {
      doc.setDrawColor(...RED).setLineWidth(0.5).line(M, lastBaseline + 2.4, M + 14, lastBaseline + 2.4)
    }
    state.y = lastBaseline + 8.6
  }

  /** Título grande de la primera página. */
  function title(text: string, kicker?: string) {
    if (kicker) {
      F('bold').setFontSize(8).setTextColor(...RED)
      ensure(5)
      doc.text(S(kicker).toUpperCase(), M, state.y)
      state.y += 5.5
    }
    F('bold').setFontSize(20).setTextColor(...NAVY)
    const lines = doc.splitTextToSize(S(text), contentW) as string[]
    for (const line of lines) { ensure(10); doc.text(line, M, state.y); state.y += 8.6 }
    state.y += 1.5
  }

  function bullet(text: string, opts: { color?: RGB; size?: number } = {}) {
    const size = opts.size ?? 10
    F('normal').setFontSize(size)
    const lines = doc.splitTextToSize(S(text), contentW - 6) as string[]
    ensure(lines.length * 4.9)
    doc.setFillColor(...(opts.color ?? RED))
    doc.circle(M + 1.4, state.y - 1.2, 0.9, 'F')
    doc.setTextColor(...INK)
    for (const line of lines) { ensure(4.9); doc.text(line, M + 6, state.y); state.y += 4.9 }
    state.y += 1.4
  }

  /** Recuadro de color para trucos, avisos y respuestas. */
  function callout(label: string, body: string, tint: RGB, accent: RGB) {
    F('normal').setFontSize(9.2)
    const lines = doc.splitTextToSize(S(body), contentW - 10) as string[]
    const boxH = lines.length * 4.6 + 11

    // Un recuadro se dibuja de una pieza: no sabe partirse por la mitad. Si el
    // texto no cabe en una página entera, el rectángulo se sale del papel y pisa
    // el copyright. En ese caso se degrada a título + párrafo, que sí pagina.
    if (boxH > FOOTER_TOP - HEADER_H) {
      heading(label, { size: 10.5, color: accent })
      paragraph(body, { size: 9.2 })
      return
    }

    ensure(boxH + 2)
    doc.setFillColor(...tint).roundedRect(M, state.y, contentW, boxH, 2, 2, 'F')
    doc.setFillColor(...accent).rect(M, state.y, 1.6, boxH, 'F')
    F('bold').setFontSize(8).setTextColor(...accent)
    doc.text(S(label).toUpperCase(), M + 5, state.y + 5.5)
    F('normal').setFontSize(9.2).setTextColor(...INK)
    let ty = state.y + 10.5
    for (const line of lines) { doc.text(line, M + 5, ty); ty += 4.6 }
    state.y += boxH + 3.5
  }

  /** Márgenes que hay que pasarle a jspdf-autotable para que respete el membrete. */
  const tableMargin = { top: HEADER_H, bottom: PAGE_H - FOOTER_TOP, left: M, right: M }

  /** Cierra el documento: pinta el membrete en todas las páginas y descarga. */
  function save(filename: string) {
    if (meta.sourceUrl) {
      // Rastro de origen, para que un PDF suelto siempre sepa volver al sitio.
      ensure(14)
      state.y += 2
      doc.setDrawColor(...SOFT).setLineWidth(0.3).roundedRect(M, state.y, contentW, 12, 2, 2, 'S')
      F('bold').setFontSize(8).setTextColor(...NAVY)
      doc.text('Versión viva de este material, con ejercicios interactivos:', M + 4, state.y + 5)
      F('normal').setFontSize(8).setTextColor(...GRAY)
      doc.text(S(meta.sourceUrl.replace(/^https?:\/\//, '')), M + 4, state.y + 9.2)
      state.y += 15
    }
    drawLetterhead()
    doc.save(filename.endsWith('.pdf') ? filename : `${filename}.pdf`)
  }

  return {
    doc, M, contentW, pageW: PAGE_W, pageH: PAGE_H, state, tableMargin,
    ensure, addPage, paragraph, heading, title, bullet, callout, save,
    /** Saneado consciente de la fuente de este documento. Úsalo, no el `S` del módulo. */
    S,
    /** Fija la tipografía del documento con el estilo pedido. Devuelve el `doc` para encadenar. */
    F,
    /** Nombre de familia en uso: 'helvetica' o la fuente incrustada. */
    familia,
    get y() { return state.y }, set y(v: number) { state.y = v },
  }
}

export type BrandedDoc = Awaited<ReturnType<typeof createBrandedDoc>>
