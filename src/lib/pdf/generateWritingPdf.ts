// PDF de un ejercicio de escritura — la única destreza que se quedó sin
// descarga cuando se montó la plantilla.
//
// Es la que más gana en papel: escribir a mano un texto de 60 palabras con la
// lectura modelo delante, las palabras obligatorias a la vista y los criterios
// de evaluación al lado es exactamente lo que se hace en un aula. Por eso el
// PDF lleva pauta de verdad, no un hueco.
//
// El modelo de respuesta va al final y avisado: leerlo antes de escribir
// convierte el ejercicio en una copia.

import type { IntegratedWritingExercise } from '@/data/practica/writing-integrated'
import { createBrandedDoc, GRAY, GREEN, INK, NAVY, RED, SOFT } from '@/lib/pdf/brandedDoc'
import { canRenderPdf, idiomaLabel, levelLabel, pdfFilename, scriptFontDe } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

export async function generateWritingPdf(ex: IntegratedWritingExercise) {
  const idioma = ex.language
  if (!canRenderPdf(idioma)) {
    throw new Error(`Todavía no se pueden generar PDF en ${idiomaLabel(idioma)}.`)
  }

  const api = await createBrandedDoc({
    levelLabel: levelLabel(idioma, ex.level),
    skillLabel: 'Escritura',
    title: ex.title,
    subject: `${ex.genre} · ${ex.cefrDescriptor}`,
    keywords: ['escritura', ex.genre, idiomaLabel(idioma)],
    sourceUrl: `${WELEARN_PDF_BASE_URL}/practica/${idioma}/${ex.level}/escritura`,
    scriptFont: scriptFontDe(idioma),
  })
  const { doc, M, contentW, state, paragraph, heading, title, bullet, callout, ensure, F } = api

  title(ex.title, `Escritura · ${ex.genre} · ${ex.level.toUpperCase()}`)
  paragraph(ex.cefrDescriptor, { size: 10, color: GRAY, gap: 4 })

  // ---- el texto modelo que se lee antes de escribir ----
  heading(ex.readingTitle || 'Lee primero')
  ex.readingText.split(/\n{2,}/).forEach((p) => {
    if (p.trim()) paragraph(p.trim(), { size: 10.5, lh: 5.6, gap: 3 })
  })
  if (ex.readingFocus?.length) {
    paragraph('Fíjate en:', { size: 9, style: 'bold', color: NAVY, gap: 1.5 })
    ex.readingFocus.forEach((f) => bullet(f, { size: 9.5 }))
  }

  // ---- la consigna ----
  callout('Tu tarea', ex.prompt, [240, 245, 255], NAVY)
  if (ex.supportPrompt) paragraph(ex.supportPrompt, { size: 9.5, color: GRAY, gap: 3 })
  paragraph(
    `Mínimo ${ex.minWords} palabras · usa al menos ${ex.requiredCount} de las expresiones obligatorias.`,
    { size: 9, color: RED, style: 'bold', gap: 3 }
  )

  // ---- palabras obligatorias, con casilla para tacharlas ----
  if (ex.requiredTerms?.length) {
    heading('Expresiones que tienes que usar', { size: 11 })
    ex.requiredTerms.forEach((t) => {
      ensure(6)
      // Casilla vacía: en papel, tacharla es lo que sustituye al contador de la web.
      doc.setDrawColor(...GRAY).setLineWidth(0.3).rect(M, state.y - 3, 3.2, 3.2, 'S')
      F('bold').setFontSize(9.8).setTextColor(...INK)
      const termino = api.S(t.term)
      doc.text(termino, M + 6, state.y)
      const w = doc.getTextWidth(termino)
      F('normal').setFontSize(8.6).setTextColor(...GRAY)
      // La separación va en la coordenada, no en el texto: el saneador recorta
      // los espacios de los extremos y el guion se pegaría a la palabra.
      doc.text(api.S(`— ${t.label ?? t.kind}`), M + 8 + w, state.y)
      state.y += 5.4
    })
    state.y += 2
  }

  if (ex.planningQuestions?.length) {
    heading('Antes de escribir, respóndete esto', { size: 11 })
    ex.planningQuestions.forEach((q) => bullet(q, { size: 9.5 }))
  }

  // ---- pauta para escribir a mano ----
  heading('Escribe aquí', { size: 12, gapTop: 5 })
  doc.setDrawColor(...SOFT).setLineWidth(0.25)
  // Unas 18 líneas: suficiente para los mínimos de A1 a B1 sin regalar páginas.
  for (let i = 0; i < 18; i++) {
    ensure(8.5)
    doc.line(M, state.y, M + contentW, state.y)
    state.y += 8.5
  }

  if (ex.successCriteria?.length) {
    heading('Repásalo con esta lista', { size: 11, gapTop: 5 })
    ex.successCriteria.forEach((c) => {
      ensure(6)
      doc.setDrawColor(...GRAY).setLineWidth(0.3).rect(M, state.y - 3, 3.2, 3.2, 'S')
      paragraph(c, { size: 9.5, indent: 6, gap: 0.6 })
    })
    state.y += 2
  }

  if (ex.grammarReferences?.length) {
    heading('Si algo se te atasca', { size: 11, gapTop: 4 })
    ex.grammarReferences.forEach((g) => bullet(`${g.title} — ${g.rationale}`, { size: 9.3 }))
  }

  // ---- modelo, al final y a propósito ----
  doc.addPage()
  state.y = 40
  title('Un modelo posible', 'Léelo DESPUÉS de escribir el tuyo')
  paragraph(
    'No es la respuesta correcta: es una de muchas. Compáralo con lo que escribiste y busca qué hace distinto, no qué hace igual.',
    { size: 9.5, color: GRAY, gap: 4 }
  )
  ex.modelAnswer.split(/\n{2,}/).forEach((p) => {
    if (p.trim()) paragraph(p.trim(), { size: 10.5, lh: 5.6, color: GREEN, gap: 3 })
  })
  if (ex.modelNote) callout('Por qué funciona', ex.modelNote, [240, 250, 245], GREEN)

  api.save(pdfFilename(idioma, ex.level, 'escritura', ex.id))
}
