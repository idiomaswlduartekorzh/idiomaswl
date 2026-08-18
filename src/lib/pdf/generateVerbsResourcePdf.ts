// PDF de los 100 verbos irregulares del inglés, sobre la plantilla membretada.
//
// Sustituye al generador anterior (src/lib/generateVerbsResourcePdf.ts), que
// colgaba de la plantilla vieja. El contenido es el mismo; lo que cambia es que
// ahora sale con el mismo membrete que el resto del material.

import { IRREGULAR_VERBS_100, TOTAL_VERBS, type IrregularVerbGroup } from '@/data/practica/recursos/verbos-irregulares-100'
import { createBrandedDoc, GRAY, INK, NAVY, SOFT } from '@/lib/pdf/brandedDoc'
import { pdfFilename } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

export async function generateVerbsResourcePdf() {
  const api = await createBrandedDoc({
    levelLabel: 'Inglés',
    skillLabel: 'Referencia',
    title: `Los ${TOTAL_VERBS} verbos irregulares más comunes del inglés`,
    subject: 'Lista de referencia organizada por patrón de sonido',
    keywords: ['verbos irregulares', 'inglés', 'past simple', 'participio'],
    sourceUrl: `${WELEARN_PDF_BASE_URL}/practica/ingles/a2/gramatica/past-simple-irregular`,
  })
  const { doc, state, contentW, paragraph, heading, title, tableMargin } = api
  const autoTable = (await import('jspdf-autotable')).default

  title(
    `Los ${TOTAL_VERBS} verbos irregulares más comunes del inglés`,
    `Referencia · ${IRREGULAR_VERBS_100.length} familias de sonido`
  )
  paragraph(
    'Organizados por patrón de sonido, no alfabéticamente: así se memorizan por familias, que es como se enseñan en Idiomas WeLearn. Cada tabla lleva base, pasado, participio y traducción.',
    { size: 10.5, color: GRAY, gap: 4 }
  )

  IRREGULAR_VERBS_100.forEach((group: IrregularVerbGroup) => {
    heading(group.pattern, { size: 11.5, gapTop: 5 })
    paragraph(group.soundNote, { size: 9, color: GRAY, gap: 2 })
    autoTable(doc, {
      startY: state.y,
      head: [['Base', 'Pasado', 'Participio', 'Español']],
      body: group.verbs.map((v) => [v.base, v.past, v.participle, v.es + (v.note ? ` (${v.note})` : '')]),
      margin: tableMargin,
      styles: { fontSize: 8.6, cellPadding: 1.9, textColor: INK, lineColor: SOFT, lineWidth: 0.1, overflow: 'linebreak' },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: { 3: { cellWidth: contentW * 0.4 } },
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 4
  })

  api.save(pdfFilename('ingles', `${TOTAL_VERBS}-verbos-irregulares`))
}
