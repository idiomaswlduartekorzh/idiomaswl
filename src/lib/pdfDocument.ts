// Base compartida para generar PDFs membretados de WeLearn (jsPDF).
// Usado por generateTopicPdf.ts (lección de un tema) y generateVerbsResourcePdf.ts
// (recurso de referencia). Centraliza: membrete, pie de página, sanitizado de
// texto y los helpers de layout (heading/paragraph/tabla), para que cualquier
// PDF nuevo de la plataforma se vea y se comporte igual sin duplicar código.

// Paleta de marca WeLearn
export const NAVY: [number, number, number] = [20, 33, 92]    // #14215c
export const RED: [number, number, number] = [200, 32, 46]    // #c8202e
export const GREEN: [number, number, number] = [16, 150, 105]
export const INK: [number, number, number] = [34, 40, 60]
export const GRAY: [number, number, number] = [110, 118, 140]
export const SOFT: [number, number, number] = [232, 236, 244]
export const PURPLE: [number, number, number] = [124, 58, 237]

// welearn-logo-mark.png es un recorte pre-generado (scripts: sharp) del banner
// original, replicando el mismo crop que usa el header web (SiteNav: object-fit
// cover, object-position "center 42%") para mostrar solo el wordmark "WeLearn".
export const LOGO_RATIO = 1099 / 441

// Los fuentes estándar de jsPDF (Helvetica) solo soportan WinAnsi/Latin-1. El
// contenido pedagógico usa "→" y otros símbolos fuera de ese rango, que sin
// sanear se corrompen en el PDF (mojibake tipo "!'"). Se reemplazan por
// equivalentes ASCII/Latin-1 seguros; cualquier otro carácter no soportado
// (emoji, símbolos exóticos) se elimina en vez de corromperse silenciosamente.
export function S(text: string): string {
  if (!text) return text
  return text
    .replace(/→/g, ' -> ')
    .replace(/–/g, '-')
    .replace(/[^\x00-\xFF]/g, '')
    .replace(/ {2,}/g, ' ')
    .trim()
}

interface PageMeta {
  levelLabel: string   // ej. "Inglés A2" o "Recurso"
  skillLabel: string   // ej. "Gramática" o "Referencia"
}

async function loadDataUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url)
    const blob = await res.blob()
    return await new Promise((resolve) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result as string)
      reader.onerror = () => resolve(null)
      reader.readAsDataURL(blob)
    })
  } catch {
    return null
  }
}

// jsPDF no tiene tipos propios exhaustivos para el objeto `doc`; se usa `any`
// deliberadamente aquí ya que es una librería sin tipos estrictos disponibles
// para todos los métodos usados (roundedRect, getTextWidth, etc.).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBrandedDoc(meta: PageMeta) {
  const { jsPDF } = await import('jspdf')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const doc = new jsPDF({ unit: 'mm', format: 'a4' }) as any
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const M = 16
  const contentW = pageW - M * 2
  const state = { y: M }

  const logo = await loadDataUrl('/images/welearn-logo-mark.png')

  function ensure(space: number) {
    if (state.y + space > pageH - 20) {
      doc.addPage()
      state.y = M
    }
  }
  function paragraph(text: string, opts: { size?: number; color?: [number, number, number]; gap?: number; lh?: number } = {}) {
    const size = opts.size ?? 10.5
    const lh = opts.lh ?? 5
    doc.setFont('helvetica', 'normal').setFontSize(size).setTextColor(...(opts.color ?? INK))
    const lines = doc.splitTextToSize(S(text), contentW) as string[]
    for (const line of lines) {
      ensure(lh)
      doc.text(line, M, state.y)
      state.y += lh
    }
    state.y += opts.gap ?? 2.5
  }
  function heading(text: string, opts: { size?: number; color?: [number, number, number]; gapTop?: number } = {}) {
    state.y += opts.gapTop ?? 3
    ensure(8)
    doc.setFont('helvetica', 'bold').setFontSize(opts.size ?? 12).setTextColor(...(opts.color ?? NAVY))
    const lines = doc.splitTextToSize(S(text), contentW) as string[]
    for (const line of lines) { ensure(6); doc.text(line, M, state.y); state.y += 5.6 }
    state.y += 1.5
  }

  // ---- membrete (encabezado de marca) ----
  function drawHeader(rightLabel: string) {
    const logoH = 9
    const logoW = logoH * LOGO_RATIO
    const headerBottom = M + 16
    if (logo) {
      try { doc.addImage(logo, 'PNG', M, state.y, logoW, logoH) } catch { /* noop */ }
    }
    const textX = M + logoW + 5
    doc.setFont('helvetica', 'bold').setFontSize(13).setTextColor(...NAVY)
    doc.text('Idiomas WeLearn', textX, state.y + 4)
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...GRAY)
    doc.text('Aprender un idioma, en serio.', textX, state.y + 9)
    doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...RED)
    doc.text(S(rightLabel).toUpperCase(), pageW - M, state.y + 4, { align: 'right' })
    state.y = headerBottom
    doc.setDrawColor(...NAVY).setLineWidth(0.6).line(M, state.y, pageW - M, state.y)
    doc.setDrawColor(...RED).setLineWidth(0.6).line(M, state.y, M + 28, state.y)
    state.y += 8
  }
  drawHeader(`${meta.levelLabel} · ${meta.skillLabel}`)

  // ---- pie de página (se dibuja al final, sobre todas las páginas ya creadas) ----
  function drawFooterOnAllPages() {
    const pages = doc.getNumberOfPages()
    for (let p = 1; p <= pages; p++) {
      doc.setPage(p)
      doc.setDrawColor(...SOFT).setLineWidth(0.3).line(M, pageH - 12, pageW - M, pageH - 12)
      doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(...GRAY)
      doc.text('idiomaswl.com · Aprender un idioma, en serio.', M, pageH - 8)
      doc.text(`Página ${p} de ${pages}`, pageW - M, pageH - 8, { align: 'right' })
    }
  }

  return {
    doc, pageW, pageH, M, contentW, state,
    ensure, paragraph, heading, drawFooterOnAllPages,
    get y() { return state.y }, set y(v: number) { state.y = v },
  }
}
