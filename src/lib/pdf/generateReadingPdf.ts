// PDF de una lectura — el texto, su glosario, las preguntas con los huecos sin
// marcar y las soluciones con la evidencia al final. Vale para cualquiera de las
// 210 lecturas porque lee el esquema estándar `ReadingExercise`.

import type { ReadingExercise, ReadingQuestion, TutorLocale, LocalizedText } from '@/lib/reading/types'
import { createBrandedDoc, GRAY, GREEN, INK, NAVY, RED, SOFT } from '@/lib/pdf/brandedDoc'
import { canRenderPdf, idiomaLabel, pdfFilename } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

// Los códigos del esquema de lectura no son los slugs de las rutas.
const LANG_SLUG: Record<string, string> = {
  en: 'ingles', fr: 'frances', it: 'italiano', de: 'aleman',
  ru: 'ruso', ja: 'japones', ko: 'coreano', pt: 'portugues',
}

const t = (text: LocalizedText | undefined, locale: TutorLocale): string =>
  text?.[locale] ?? text?.es ?? text?.en ?? ''

/** Texto de la respuesta correcta, resuelto contra las opciones cuando las hay. */
function answerText(q: ReadingQuestion): string {
  const { answer, options } = q
  if (typeof answer === 'boolean') return answer ? 'Verdadero' : 'Falso'
  if (Array.isArray(answer)) {
    return answer.map((a) => options?.find((o) => o.id === a)?.text ?? String(a)).join(' · ')
  }
  if (typeof answer === 'string') {
    return options?.find((o) => o.id === answer)?.text ?? answer
  }
  return Object.values(answer as Record<string, unknown>).map(String).join(' · ')
}

export async function generateReadingPdf(exercise: ReadingExercise, locale: TutorLocale = 'es') {
  const idioma = LANG_SLUG[exercise.language] ?? exercise.language
  if (!canRenderPdf(idioma)) {
    throw new Error(
      `Todavía no se pueden generar PDF en ${idiomaLabel(idioma)}: hace falta incrustar una fuente con su alfabeto.`
    )
  }

  const nivel = exercise.level.cefr.toLowerCase()
  const titulo = t(exercise.content.title, locale)
  const api = await createBrandedDoc({
    levelLabel: `${idiomaLabel(idioma)} ${exercise.level.cefr}`,
    skillLabel: 'Lectura',
    title: titulo,
    subject: t(exercise.content.mission, locale),
    keywords: [exercise.classification.topic, exercise.classification.genre, `lectura ${idiomaLabel(idioma)}`],
    sourceUrl: `${WELEARN_PDF_BASE_URL}/practica/${idioma}/${nivel}/lectura/${exercise.slug}`,
  })
  const { doc, M, contentW, state, paragraph, heading, title, bullet, callout, ensure, tableMargin } = api
  const autoTable = (await import('jspdf-autotable')).default

  title(titulo, `Lectura · ${exercise.classification.genre} · ${exercise.level.displayLabel}`)
  const intro = t(exercise.content.intro, locale)
  if (intro) paragraph(intro, { size: 10.5, color: GRAY, gap: 3 })

  const mission = t(exercise.content.mission, locale)
  if (mission) callout('Tu misión', mission, [240, 245, 255], NAVY)

  paragraph(
    `${exercise.content.wordCount} palabras · unos ${exercise.content.estimatedMinutes} minutos de lectura`,
    { size: 8.5, color: GRAY, gap: 3 }
  )

  // ---- el texto ----
  heading('El texto')
  exercise.content.targetText.split(/\n{2,}/).forEach((para) => {
    if (para.trim()) paragraph(para.trim(), { size: 10.5, lh: 5.6, gap: 3 })
  })

  // ---- glosario ----
  if (exercise.content.vocabulary?.length) {
    heading('Glosario')
    autoTable(doc, {
      startY: state.y,
      head: [['Palabra', 'Significado']],
      body: exercise.content.vocabulary.map((v) => [v.surface, t(v.glosses, locale)]),
      margin: tableMargin,
      styles: { fontSize: 8.8, cellPadding: 2, textColor: INK, lineColor: SOFT, lineWidth: 0.1, overflow: 'linebreak' },
      headStyles: { fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles: { 0: { cellWidth: 45, fontStyle: 'bold' } },
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 6
  }

  const cultural = t(exercise.content.culturalNote, locale)
  if (cultural) callout('Nota cultural', cultural, [255, 249, 240], [180, 110, 20])
  const spanishNote = t(exercise.content.spanishSpeakerNote, locale)
  if (spanishNote) callout('Para hispanohablantes', spanishNote, [253, 242, 243], RED)

  // ---- preguntas ----
  heading('Preguntas', { gapTop: 6 })
  exercise.questions.forEach((q, i) => {
    ensure(18)
    paragraph(`${i + 1}. ${q.prompt}`, { size: 10, gap: 1.5 })
    if (q.options?.length) {
      // Ordenar no es elegir: si las opciones salen con a) b) c), el estudiante
      // marca una y da la pregunta por hecha. Con una casilla delante, la tarea
      // se lee sola.
      const esOrdenar = q.type === 'ordering'
      if (esOrdenar) {
        paragraph('Numera del 1 al ' + q.options.length + ' según el orden en que ocurren.', {
          size: 8.6, color: GRAY, style: 'italic', indent: 6, gap: 1,
        })
      }
      q.options.forEach((o, oi) => {
        const marca = esOrdenar ? '___' : `${String.fromCharCode(97 + oi)})`
        paragraph(`${marca} ${o.text}`, { size: 9.5, indent: 6, gap: 0.8 })
      })
      if (q.type === 'multiple-choice') {
        paragraph('(puede haber más de una correcta)', { size: 8.4, color: GRAY, indent: 6, gap: 0.8 })
      }
    } else {
      doc.setDrawColor(...SOFT).setLineWidth(0.25)
      ensure(8); doc.line(M + 6, state.y, M + contentW, state.y); state.y += 7
    }
    state.y += 2
  })

  // ---- escritura ----
  if (exercise.production) {
    heading('Ahora escribe tú', { gapTop: 6 })
    paragraph(t(exercise.production.prompt, locale), { size: 10, gap: 2 })
    paragraph(`Entre ${exercise.production.minWords} y ${exercise.production.maxWords} palabras.`, {
      size: 9, color: GRAY, gap: 2,
    })
    exercise.production.hints?.forEach((h) => bullet(h, { size: 9.5 }))
    doc.setDrawColor(...SOFT).setLineWidth(0.25)
    for (let i = 0; i < 8; i++) { ensure(8); doc.line(M, state.y, M + contentW, state.y); state.y += 8 }
  }

  // ---- soluciones ----
  heading('Soluciones', { size: 13, gapTop: 8 })
  paragraph('Cada respuesta va con la frase del texto que la demuestra: si no la encuentras, la respuesta no se ha entendido, se ha adivinado.', {
    size: 9, color: GRAY, gap: 3,
  })
  exercise.questions.forEach((q, i) => {
    ensure(14)
    doc.setFont('helvetica', 'bold').setFontSize(9.5).setTextColor(...GREEN)
    doc.text(`${i + 1}. ${answerText(q)}`.slice(0, 120), M, state.y)
    state.y += 4.8
    const strategy = t(q.feedback?.strategy, locale)
    if (strategy) paragraph(strategy, { size: 9, color: INK, indent: 4, gap: 1 })
    if (q.evidence) paragraph(`Evidencia: "${q.evidence}"`, { size: 8.6, color: GRAY, indent: 4, gap: 2.5 })
  })

  api.save(pdfFilename(idioma, nivel, 'lectura', exercise.slug))
}
