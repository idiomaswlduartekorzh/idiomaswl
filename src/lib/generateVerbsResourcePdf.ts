// Genera el PDF de referencia "Los 100 verbos irregulares más comunes del
// inglés, por patrón de sonido" — descarga en un clic, membretado igual que
// los PDFs de lección (mismo módulo base pdfDocument.ts).

import { IRREGULAR_VERBS_100, TOTAL_VERBS, type IrregularVerbGroup } from '@/data/practica/recursos/verbos-irregulares-100'
import { createBrandedDoc, S, NAVY, GRAY, SOFT } from '@/lib/pdfDocument'

export async function generateVerbsResourcePdf() {
  const autoTable = (await import('jspdf-autotable')).default
  const { doc, M, contentW, state, ensure, paragraph, heading, drawFooterOnAllPages } =
    await createBrandedDoc({ levelLabel: 'Inglés', skillLabel: 'Recurso de referencia' })

  doc.setFont('helvetica', 'bold').setFontSize(19).setTextColor(...NAVY)
  const titleLines = doc.splitTextToSize(S(`Los ${TOTAL_VERBS} verbos irregulares más comunes del inglés`), contentW) as string[]
  for (const line of titleLines) { ensure(9); doc.text(line, M, state.y); state.y += 8 }
  state.y += 1
  paragraph(
    'Organizados por patrón de sonido -no alfabéticamente- para que se memoricen por familias, igual que se enseñan en Idiomas WeLearn. Incluye base, pasado, participio y traducción.',
    { size: 10, color: GRAY, gap: 4 }
  )

  IRREGULAR_VERBS_100.forEach((group: IrregularVerbGroup) => {
    heading(group.pattern, { size: 12, gapTop: 5 })
    paragraph(group.soundNote, { size: 9, color: GRAY, gap: 2 })
    autoTable(doc, {
      startY: state.y,
      head: [['Base', 'Pasado', 'Participio', 'Español']],
      body: group.verbs.map((v) => [v.base, v.past, v.participle, S(v.es) + (v.note ? ` (${S(v.note)})` : '')]),
      margin: { left: M, right: M },
      styles: { fontSize: 8.5, cellPadding: 1.8, textColor: [34, 40, 60], lineColor: SOFT, lineWidth: 0.1 },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: { 3: { cellWidth: contentW * 0.4 } },
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 3
  })

  drawFooterOnAllPages()
  doc.save('welearn-100-verbos-irregulares-ingles.pdf')
}
