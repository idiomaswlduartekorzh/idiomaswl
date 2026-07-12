// Generador de PDF membretado de WeLearn para un tema de gramática.
// Lee la estructura estándar de GrammarTopic, así que funciona para CUALQUIER
// tema (inglés/otros idiomas, A1/A2/B1) sin cambios. Descarga en un clic.
//
// jsPDF se importa dinámicamente (vía createBrandedDoc) para no cargar la
// librería en el bundle inicial; solo se descarga cuando el usuario pulsa
// "Descargar PDF".

import type { GrammarTopic } from '@/data/practica/grammar-types'
import { createBrandedDoc, S, NAVY, RED, GREEN, INK, GRAY, SOFT } from '@/lib/pdfDocument'

interface PdfMeta {
  levelLabel: string   // ej. "Inglés A2"
  skillLabel: string   // ej. "Gramática"
  url: string
}

export async function generateTopicPdf(topic: GrammarTopic, meta: PdfMeta) {
  const autoTable = (await import('jspdf-autotable')).default
  const { doc, M, contentW, state, ensure, paragraph, heading, drawFooterOnAllPages } =
    await createBrandedDoc({ levelLabel: meta.levelLabel, skillLabel: meta.skillLabel })

  // ---- título del tema ----
  doc.setFont('helvetica', 'bold').setFontSize(19).setTextColor(...NAVY)
  const titleLines = doc.splitTextToSize(S(topic.title), contentW) as string[]
  for (const line of titleLines) { ensure(9); doc.text(line, M, state.y); state.y += 8 }
  if (topic.shortTitle && topic.seoDescription) {
    state.y += 1
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
      startY: state.y,
      head: [t.headers.map(S)],
      body: t.rows.map((row) => row.map(S)),
      margin: { left: M, right: M },
      styles: { fontSize: 9, cellPadding: 2, textColor: INK, lineColor: SOFT, lineWidth: 0.1 },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 5
  })

  // ---- ejemplos ----
  if (topic.examples?.length) {
    heading('Ejemplos', { gapTop: 4 })
    topic.examples.forEach((ex) => {
      ensure(6)
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...NAVY)
      const enLines = doc.splitTextToSize(S(ex.en), contentW) as string[]
      enLines.forEach((l: string) => { ensure(5); doc.text(l, M, state.y); state.y += 5 })
      doc.setFont('helvetica', 'italic').setFontSize(9.5).setTextColor(...GRAY)
      const esLines = doc.splitTextToSize(S(`- ${ex.es}${ex.note ? `  (${ex.note})` : ''}`), contentW) as string[]
      esLines.forEach((l: string) => { ensure(4.6); doc.text(l, M, state.y); state.y += 4.6 })
      state.y += 2
    })
  }

  // ---- contraste ----
  if (topic.contrast?.length) {
    heading(`Del español al ${meta.levelLabel.split(' ')[0].toLowerCase()} (evita la traducción literal)`, { size: 11, gapTop: 4 })
    topic.contrast.forEach((c) => {
      ensure(6)
      doc.setFont('helvetica', 'normal').setFontSize(9.5).setTextColor(...GRAY)
      const esText = `${S(c.es)} -> `
      doc.text(esText, M, state.y)
      const w = doc.getTextWidth(esText)
      doc.setFont('helvetica', 'bold').setTextColor(...NAVY)
      doc.text(S(c.en), M + w, state.y)
      state.y += 4.8
      paragraph(c.note, { size: 9, color: GRAY, gap: 1.5 })
    })
  }

  // ---- errores comunes ----
  if (topic.commonMistakes?.length) {
    heading('Errores comunes de hispanohablantes', { gapTop: 4 })
    topic.commonMistakes.forEach((m) => {
      ensure(6)
      doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...RED)
      const wrongLines = doc.splitTextToSize(S(`Incorrecto: ${m.wrong}`), contentW) as string[]
      wrongLines.forEach((l: string) => { ensure(4.6); doc.text(l, M, state.y); state.y += 4.6 })
      doc.setTextColor(...GREEN)
      const rightLines = doc.splitTextToSize(S(`Correcto: ${m.right}`), contentW) as string[]
      rightLines.forEach((l: string) => { ensure(4.6); doc.text(l, M, state.y); state.y += 4.6 })
      paragraph(m.note, { size: 9, color: GRAY, gap: 1.5 })
    })
  }

  // ---- tip ----
  if (topic.tip) {
    ensure(14)
    state.y += 2
    // El tamaño/estilo de fuente debe fijarse ANTES de splitTextToSize: jsPDF
    // mide el ancho de línea con la fuente ACTUAL del doc en ese momento.
    doc.setFont('helvetica', 'bold').setFontSize(9.5)
    const tipLines = doc.splitTextToSize(S(`Truco: ${topic.tip}`), contentW - 8) as string[]
    const boxH = tipLines.length * 4.8 + 6
    ensure(boxH)
    doc.setFillColor(245, 243, 252).roundedRect(M, state.y, contentW, boxH, 2, 2, 'F')
    let ty = state.y + 6
    tipLines.forEach((l: string, i: number) => {
      doc.setFont('helvetica', i === 0 ? 'bold' : 'normal').setFontSize(9.5).setTextColor(...(i === 0 ? [124, 58, 237] as [number, number, number] : INK))
      doc.text(l, M + 4, ty); ty += 4.8
    })
    state.y += boxH + 4
  }

  // ---- FAQ ----
  if (topic.faq?.length) {
    heading('Preguntas frecuentes', { gapTop: 4 })
    topic.faq.forEach((f) => {
      ensure(8)
      doc.setFont('helvetica', 'bold').setFontSize(10).setTextColor(...NAVY)
      const qLines = doc.splitTextToSize(S(f.q), contentW) as string[]
      qLines.forEach((l: string) => { ensure(5); doc.text(l, M, state.y); state.y += 5 })
      paragraph(f.a, { size: 9.5, color: INK, gap: 3 })
    })
  }

  // ---- recurso asociado (si el tema lo define) ----
  if (topic.relatedResource) {
    ensure(16)
    state.y += 2
    doc.setDrawColor(...NAVY).setLineWidth(0.3).roundedRect(M, state.y, contentW, 13, 2, 2, 'S')
    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...NAVY)
    doc.text(S(topic.relatedResource.label), M + 4, state.y + 5.5)
    doc.setFont('helvetica', 'normal').setFontSize(8.5).setTextColor(...GRAY)
    doc.text(S(topic.relatedResource.url.replace(/^https?:\/\//, '')), M + 4, state.y + 10)
    state.y += 17
  }

  drawFooterOnAllPages()

  const safe = topic.slug.replace(/[^a-z0-9-]/gi, '-')
  doc.save(`welearn-${safe}.pdf`)
}
