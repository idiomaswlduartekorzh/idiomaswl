// PDF de vocabulario — la lista de un nivel, por bloques temáticos, con su
// ejemplo de uso y lo que cada idioma exige anclar (el acento y las colocaciones
// en inglés, el artículo y el plural en alemán, el acento tónico en ruso…).
//
// Ese "extra" no es adorno: un sustantivo alemán sin artículo es un dato
// incompleto que enseña mal, y por eso el esquema lo obliga. El PDF lo respeta.

import type { VocabEntry, VocabLevel } from '@/data/practica/vocabulario/schema'
import { createBrandedDoc, GRAY, INK, NAVY, SOFT } from '@/lib/pdf/brandedDoc'
import { canRenderPdf, idiomaLabel, pdfFilename, scriptFontDe } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

// Cada idioma declara su `extra` como unión discriminada, y además por clase de
// palabra: el alemán separa sustantivo (artículo + plural) de verbo (auxiliar +
// participio). Por eso no se puede leer `e.articulo` a secas — el compilador lo
// impide, y hace bien. Se comprueba campo a campo, en el orden en que conviene
// leerlos, y lo que no exista simplemente no sale.
const CAMPOS_ANCLAJE = ['articulo', 'plural', 'acento', 'auxiliar', 'participio', 'genero', 'aspecto', 'contador'] as const

/** Lo que hay que memorizar además del lema: el dato sin el cual la palabra se aprende mal. */
function anclaje(entry: VocabEntry): string {
  const e = entry.extra as Record<string, unknown>
  const partes = CAMPOS_ANCLAJE.filter((k) => typeof e[k] === 'string' && e[k]).map((k) => e[k] as string)

  // Las colocaciones inglesas son la mitad del valor de la ficha: saber
  // "decision" no da "make a decision".
  if (Array.isArray(e.colocaciones)) {
    const chunks = (e.colocaciones as Array<{ chunk?: string }>).map((c) => c.chunk).filter(Boolean)
    if (chunks.length) partes.push(chunks.join(', '))
  }
  return partes.join(' · ')
}

export async function generateVocabularyPdf(level: VocabLevel) {
  const idioma = level.lang
  if (!canRenderPdf(idioma)) {
    throw new Error(
      `Todavía no se pueden generar PDF en ${idiomaLabel(idioma)}: hace falta incrustar una fuente con su alfabeto.`
    )
  }

  const total = level.bloques.reduce((n, b) => n + b.entradas.length, 0)
  const api = await createBrandedDoc({
    levelLabel: `${idiomaLabel(idioma)} ${level.nivel.toUpperCase()}`,
    skillLabel: 'Vocabulario',
    title: `Vocabulario de ${idiomaLabel(idioma)} ${level.nivel.toUpperCase()}`,
    subject: `${total} palabras organizadas por ${level.eje}`,
    keywords: ['vocabulario', idiomaLabel(idioma), level.nivel],
    sourceUrl: `${WELEARN_PDF_BASE_URL}/practica/${idioma}/${level.nivel}/vocabulario`,
    scriptFont: scriptFontDe(idioma),
  })
  const { doc, state, paragraph, heading, title, callout, tableMargin, contentW, familia } = api
  const autoTable = (await import('jspdf-autotable')).default

  title(
    `Vocabulario de ${idiomaLabel(idioma)} ${level.nivel.toUpperCase()}`,
    `Vocabulario · ${total} palabras · ${level.bloques.length} bloques`
  )
  paragraph(`Organizado por ${level.eje}, no por orden alfabético: se memoriza mejor por familias de significado.`, {
    size: 10.5, color: GRAY, gap: 3,
  })

  // De dónde sale la lista: el estudiante merece saberlo.
  //
  // `listaBase.nota` está pensada como salvedad de una línea, pero en la
  // práctica algunos niveles guardan ahí el registro de auditoría del catálogo:
  // miles de palabras de trabajo interno, con fechas y decisiones de redacción.
  // Eso no va en un material para estudiantes, así que solo pasa si es corta.
  const nota = level.listaBase.nota && level.listaBase.nota.length <= 220 ? level.listaBase.nota : ''
  const fuente = [
    level.listaBase.fuente,
    level.listaBase.cupoOficial ? `cupo oficial: ${level.listaBase.cupoOficial}` : '',
    nota,
  ]
    .filter(Boolean)
    .join(' · ')
  callout('Lista de referencia', fuente, [240, 245, 255], NAVY)

  level.bloques.forEach((bloque) => {
    heading(`${bloque.nombre} (${bloque.entradas.length})`, { size: 11.5, gapTop: 6 })
    autoTable(doc, {
      startY: state.y,
      head: [['Palabra', 'Español', 'Clase', 'Hay que saber también', 'Ejemplo']],
      body: bloque.entradas.map((e) => [e.lemma, e.es, e.pos, anclaje(e), `${e.ejemplo.target} — ${e.ejemplo.es}`]),
      margin: tableMargin,
      styles: { font: familia, fontSize: 8, cellPadding: 1.8, textColor: INK, lineColor: SOFT, lineWidth: 0.1, overflow: 'linebreak' },
      headStyles: { font: familia, fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 8 },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: {
        0: { cellWidth: contentW * 0.14, fontStyle: 'bold' },
        1: { cellWidth: contentW * 0.15 },
        // "preposición" es la clase más larga y tiene que caber en una línea
        2: { cellWidth: contentW * 0.13 },
        3: { cellWidth: contentW * 0.22 },
        4: { cellWidth: contentW * 0.36 },
      },
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 5
  })

  api.save(pdfFilename(idioma, level.nivel, 'vocabulario'))
}
