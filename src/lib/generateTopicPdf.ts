// Generador de PDF membretado de WeLearn para un tema de gramática.
// Lee la estructura estándar de GrammarTopic, así que funciona para CUALQUIER
// tema (inglés/otros idiomas, A1/A2/B1) sin cambios. Descarga en un clic.
//
// jsPDF se importa dinámicamente para no cargar la librería en el bundle inicial;
// solo se descarga cuando el usuario pulsa "Descargar PDF".

import type { GrammarTopic } from '@/data/practica/grammar-types'

// Paleta de marca WeLearn
const NAVY: [number, number, number] = [20, 33, 92]    // #14215c
const RED: [number, number, number] = [200, 32, 46]    // #c8202e
const INK: [number, number, number] = [34, 40, 60]
const GRAY: [number, number, number] = [110, 118, 140]
const SOFT: [number, number, number] = [232, 236, 244]

interface PdfMeta {
  levelLabel: string   // ej. "Inglés A2"
  skillLabel: string   // ej. "Gramática"
  url: string
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

export async function generateTopicPdf(topic: GrammarTopic, meta: PdfMeta) {
  const { jsPDF } = await import('jspdf')
  const autoTable = (await import('jspdf-autotable')).default

  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const pageW = doc.internal.pageSize.getWidth()
  const pageH = doc.internal.pageSize.getHeight()
  const M = 16                       // margen
  const contentW = pageW - M * 2
  let y = M

  const logo = await loadDataUrl('/images/welearn-logo.png')

  // ---- helpers ----
  function ensure(space: number) {
    if (y + space > pageH - 20) {
      doc.addPage()
      y = M
    }
  }
  function paragraph(text: string, opts: { size?: number; color?: [number, number, number]; gap?: number; lh?: number } = {}) {
    const size = opts.size ?? 10.5
    const lh = opts.lh ?? 5
    doc.setFont('helvetica', 'normal').setFontSize(size).setTextColor(...(opts.color ?? INK))
    const lines = doc.splitTextToSize(text, contentW) as string[]
    for (const line of lines) {
      ensure(lh)
      doc.text(line, M, y)
      y += lh
    }
    y += opts.gap ?? 2.5
  }
  function heading(text: string, opts: { size?: number; color?: [number, number, number]; gapTop?: number } = {}) {
    y += opts.gapTop ?? 3
    ensure(8)
    doc.setFont('helvetica', 'bold').setFontSize(opts.size ?? 12).setTextColor(...(opts.color ?? NAVY))
    const lines = doc.splitTextToSize(text, contentW) as string[]
    for (const line of lines) { ensure(6); doc.text(line, M, y); y += 5.6 }
    y += 1.5
  }

  // ---- membrete (encabezado de marca) ----
  const headerBottom = M + 16
  if (logo) {
    try { doc.addImage(logo, 'PNG', M, y - 2, 15, 15) } catch { /* noop */ }
  }
  doc.setFont('helvetica', 'bold').setFontSize(15).setTextColor(...NAVY)
  doc.text('Idiomas WeLearn', M + 19, y + 4)
  doc.setFont('helvetica', 'normal').setFontSize(9).setTextColor(...GRAY)
  doc.text('Aprender un idioma, en serio.', M + 19, y + 9.5)
  // meta a la derecha
  doc.setFont('helvetica', 'bold').setFontSize(9).setTextColor(...RED)
  doc.text(`${meta.levelLabel} · ${meta.skillLabel}`.toUpperCase(), pageW - M, y + 4, { align: 'right' })
  // regla azul con acento rojo
  y = headerBottom
  doc.setDrawColor(...NAVY).setLineWidth(0.6).line(M, y, pageW - M, y)
  doc.setDrawColor(...RED).setLineWidth(0.6).line(M, y, M + 28, y)
  y += 8

  // ---- título del tema ----
  doc.setFont('helvetica', 'bold').setFontSize(19).setTextColor(...NAVY)
  const titleLines = doc.splitTextToSize(topic.title, contentW) as string[]
  for (const line of titleLines) { ensure(9); doc.text(line, M, y); y += 8 }
  if (topic.shortTitle && topic.seoDescription) {
    y += 1
    paragraph(topic.seoDescription, { size: 10, color: GRAY, gap: 4 })
  }

  // ---- intro ----
  heading('¿Cuándo y cómo se usa?')
  topic.intro.forEach((p) => paragraph(p))

  // ---- secciones ----
  topic.sections?.forEach((sec) => {
    heading(sec.heading, { size: 11.5, gapTop: 4 })
    sec.body.forEach((p) => paragraph(p))
  })

  // ---- tablas ----
  const tables = topic.tables && topic.tables.length > 0 ? topic.tables : topic.table ? [topic.table] : []
  tables.forEach((t) => {
    heading(t.caption || 'Tabla de referencia', { size: 11, gapTop: 4 })
    autoTable(doc, {
      startY: y,
      head: [t.headers],
      body: t.rows,
      margin: { left: M, right: M },
      styles: { fontSize: 9, cellPadding: 2, textColor: INK, lineColor: SOFT, lineWidth: 0.1 },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
    })
    // @ts-expect-error lastAutoTable lo añade el plugin en runtime
    y = (doc.lastAutoTable?.finalY ?? y) + 5
  })

  // ---- ejemplos ----
  if (topic.examples?.length) {
    heading('Ejemplos', { gapTop: 4 })
    topic.examples.forEach((ex) => {
      ensure(6)
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...NAVY)
      const enLines = doc.splitTextToSize(ex.en, contentW) as string[]
      enLines.forEach((l) => { ensure(5); doc.text(l, M, y); y += 5 })
      doc.setFont('helvetica', 'italic').setFontSize(9.5).setTextColor(...GRAY)
      const esLines = doc.splitTextToSize(`— ${ex.es}${ex.note ? `  (${ex.note})` : ''}`, contentW) as string[]
      esLines.forEach((l) => { ensure(4.6); doc.text(l, M, y); y += 4.6 })
      y += 2
    })
  }

  // ---- contraste ----
  if (topic.contrast?.length) {
    heading(`Del español al ${meta.levelLabel.split(' ')[0].toLowerCase()} (evita la traducción literal)`, { size: 11, gapTop: 4 })
    topic.contrast.forEach((c) => {
      ensure(6)
      doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor(...GRAY)
      doc.text(`${c.es}  →  `, M, y)
      const w = doc.getTextWidth(`${c.es}  →  `)
      doc.setFont('helvetica', 'bold').setTextColor(...NAVY)
      doc.text(c.en, M + w, y)
      y += 4.8
      paragraph(c.note, { size: 9, color: GRAY, gap: 1.5 })
    })
  }

  // ---- errores comunes ----
  if (topic.commonMistakes?.length) {
    heading('Errores comunes de hispanohablantes', { gapTop: 4 })
    topic.commonMistakes.forEach((m) => {
      ensure(6)
      doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...RED)
      doc.text(`✗ ${m.wrong}`, M, y); y += 4.6
      doc.setTextColor(16, 150, 105)
      doc.text(`✓ ${m.right}`, M, y); y += 4.6
      paragraph(m.note, { size: 9, color: GRAY, gap: 1.5 })
    })
  }

  // ---- tip ----
  if (topic.tip) {
    ensure(14)
    y += 2
    doc.setFillColor(...SOFT).roundedRect(M, y, contentW, 0.1, 2, 2, 'F') // marcador
    const tipLines = doc.splitTextToSize(`Truco: ${topic.tip}`, contentW - 8) as string[]
    const boxH = tipLines.length * 4.8 + 6
    ensure(boxH)
    doc.setFillColor(245, 243, 252).roundedRect(M, y, contentW, boxH, 2, 2, 'F')
    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(124, 58, 237)
    let ty = y + 6
    tipLines.forEach((l, i) => {
      doc.setFont('helvetica', i === 0 ? 'bold' : 'normal').setTextColor(...(i === 0 ? [124, 58, 237] as [number, number, number] : INK))
      doc.text(l, M + 4, ty); ty += 4.8
    })
    y += boxH + 4
  }

  // ---- FAQ ----
  if (topic.faq?.length) {
    heading('Preguntas frecuentes', { gapTop: 4 })
    topic.faq.forEach((f) => {
      ensure(8)
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...NAVY)
      const qLines = doc.splitTextToSize(f.q, contentW) as string[]
      qLines.forEach((l) => { ensure(5); doc.text(l, M, y); y += 5 })
      paragraph(f.a, { size: 9.5, color: INK, gap: 3 })
    })
  }

  // ---- pie de página en todas las páginas ----
  const pages = doc.getNumberOfPages()
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p)
    doc.setDrawColor(...SOFT).setLineWidth(0.3).line(M, pageH - 12, pageW - M, pageH - 12)
    doc.setFont('helvetica', 'normal').setFontSize(8).setTextColor(...GRAY)
    doc.text('idiomaswl.com · Aprender un idioma, en serio.', M, pageH - 8)
    doc.text(`Página ${p} de ${pages}`, pageW - M, pageH - 8, { align: 'right' })
  }

  const safe = topic.slug.replace(/[^a-z0-9-]/gi, '-')
  doc.save(`welearn-${safe}.pdf`)
}
