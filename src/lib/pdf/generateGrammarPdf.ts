// PDF de un tema de gramática — sirve para los 465 temas de los 8 idiomas sin
// tocar nada, porque lee la estructura estándar de `GrammarTopic`.
//
// Ojo: el tipo bueno es `@/data/grammar/types`, el del registro que pintan las
// páginas vivas. Existe otro `GrammarTopic` en `@/data/practica/grammar-types`,
// del currículo antiguo, con otros campos. Son distintos.
//
// El PDF no es una copia de la página: es una hoja de trabajo. Lleva la
// explicación, la tabla y los ejercicios CON los huecos vacíos, y las soluciones
// al final, para que se pueda imprimir y resolver a mano.

import type { GrammarTopic, Level } from '@/data/grammar/types'
import { createBrandedDoc, hasUnsupportedScript, GRAY, INK, NAVY, RED, SOFT, PURPLE, GREEN } from '@/lib/pdf/brandedDoc'
import { canRenderPdf, idiomaLabel, levelLabel, pdfFilename, scriptFontDe } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

/** Un hueco `[[0]]` del texto se convierte en una raya numerada que se puede rellenar a mano. */
function fillBlanks(text: string): string {
  return text.replace(/\[\[(\d+)\]\]/g, (_, n) => ` (${Number(n) + 1}) __________ `)
}

/** Enumera las soluciones de un nivel para la hoja de respuestas del final. */
function answersOf(level: Level): string[] {
  switch (level.type) {
    case 'choice':
      return level.items.map((it) => it.answer)
    case 'dual':
      return level.items.flatMap((it) => it.blanks.map((b) => b.answer))
    case 'guidedText':
    case 'freeText':
      return level.blanks.map((b) => b.answer)
    case 'write':
      return level.items.map((it) => it.answer)
    default:
      return []
  }
}

export async function generateGrammarPdf(topic: GrammarTopic, idioma: string, nivel: string) {
  if (!canRenderPdf(idioma)) {
    throw new Error(
      `Todavía no se pueden generar PDF en ${idiomaLabel(idioma)}: hace falta incrustar una fuente con su alfabeto.`
    )
  }

  const url = `${WELEARN_PDF_BASE_URL}/practica/${idioma}/${nivel}/gramatica/${topic.slug}`
  const api = await createBrandedDoc({
    levelLabel: levelLabel(idioma, nivel),
    skillLabel: 'Gramática',
    title: topic.title,
    subject: topic.description,
    keywords: [topic.shortTitle, topic.category, `gramática ${idiomaLabel(idioma)}`],
    sourceUrl: url,
    scriptFont: scriptFontDe(idioma),
  })
  const { doc, M, contentW, state, paragraph, heading, title, bullet, callout, ensure, tableMargin, S, F, familia } = api
  const autoTable = (await import('jspdf-autotable')).default

  // `font: familia` no es redundante: jspdf-autotable no hereda la tipografía
  // del documento, elige la suya. Sin esto, el cuerpo del PDF coreano sale bien
  // y sus TABLAS salen como basura, que es justo lo que costó descubrir.
  const table = (head: string[], body: string[][], columnStyles?: Record<number, object>) => {
    autoTable(doc, {
      startY: state.y,
      head: [head.map((c) => S(c))],
      body: body.map((r) => r.map((c) => S(c))),
      margin: tableMargin,
      styles: { font: familia, fontSize: 8.8, cellPadding: 2, textColor: INK, lineColor: SOFT, lineWidth: 0.1, overflow: 'linebreak' },
      headStyles: { font: familia, fillColor: NAVY, textColor: [255, 255, 255], fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 249, 252] },
      columnStyles,
    })
    state.y = (doc.lastAutoTable?.finalY ?? state.y) + 6
  }

  // ---- portada de contenido ----
  title(topic.title, `Gramática · ${topic.category} · ${topic.level}`)
  paragraph(topic.lead, { size: 10.5, color: GRAY, gap: 4 })

  // ---- la ficha de una ojeada ----
  callout('Objetivo', topic.guide.goal, [240, 245, 255], NAVY)
  state.y += 2.5
  ensure(20)
  F('bold').setFontSize(9).setTextColor(...NAVY)
  doc.text('Fórmula', M, state.y); state.y += 4.8
  paragraph(topic.guide.formula, { size: 10, style: 'bold', gap: 2.5 })
  F('bold').setFontSize(9).setTextColor(...NAVY)
  ensure(6); doc.text('Modelo', M, state.y); state.y += 4.8
  paragraph(topic.guide.model, { size: 10, color: INK, gap: 3 })

  if (topic.outcomes?.length) {
    heading('Al terminar vas a poder')
    topic.outcomes.forEach((o) => bullet(o))
  }

  // ---- explicación ----
  if (topic.description) {
    heading('De qué va este tema')
    paragraph(topic.description)
  }

  if (topic.guide.decisions?.length) {
    heading('Cómo se decide, paso a paso')
    topic.guide.decisions.forEach((d) => bullet(d))
  }

  if (topic.guide.table?.length > 1) {
    heading('Tabla de referencia')
    const [head, ...rows] = topic.guide.table
    table(head, rows)
  }

  if (topic.guide.mistakes?.length) {
    heading('Errores que delatan al hispanohablante')
    topic.guide.mistakes.forEach((m) => bullet(m, { color: RED }))
  }

  // ---- artículo del especialista (las secciones SEO de la página) ----
  topic.seo?.forEach((section) => {
    heading(section.heading, { size: 11.5 })
    section.paragraphs.forEach((p) => paragraph(p))
    if (section.table?.length && section.table.length > 1) {
      const [head, ...rows] = section.table
      table(head, rows)
    }
    if (section.examples?.length) {
      section.examples.forEach((ex) => {
        ensure(6)
        F('bold').setFontSize(9.5).setTextColor(...NAVY)
        const first = S(ex[0] ?? '')
        doc.text(first, M, state.y)
        const w = doc.getTextWidth(first)
        if (ex[1]) {
          F('italic').setTextColor(...GRAY)
          doc.text(S(` — ${ex.slice(1).join(' · ')}`), M + w, state.y)
        }
        state.y += 5.2
      })
      state.y += 2
    }
  })

  // ---- hoja de trabajo ----
  doc.addPage()
  state.y = 40
  title('Practica', 'Hoja de trabajo · imprime y resuelve')
  paragraph(
    'Los ejercicios son los mismos de la página, con los huecos vacíos. Las soluciones están al final, para que primero lo intentes.',
    { size: 9.5, color: GRAY, gap: 4 }
  )

  topic.practice?.levels?.forEach((level, li) => {
    heading(`${li + 1}. ${level.title}`, { size: 11 })
    paragraph(`${level.tag} — ${level.intro}`, { size: 9, color: GRAY, gap: 3 })

    if (level.type === 'choice') {
      level.items.forEach((it, i) => {
        ensure(16)
        if (it.scene) paragraph(it.scene, { size: 8.5, color: GRAY, style: 'italic', gap: 1 })
        it.lines.forEach(([who, said]) => {
          paragraph(`${i + 1}. ${who ? `${who}: ` : ''}${said}`, { size: 10, gap: 1 })
        })
        paragraph(it.options.map((o, oi) => `${String.fromCharCode(97 + oi)}) ${o}`).join('   '), {
          size: 9.5, color: INK, indent: 6, gap: 3,
        })
      })
    } else if (level.type === 'dual') {
      level.items.forEach((it, i) => {
        ensure(14)
        if (it.scene) paragraph(it.scene, { size: 8.5, color: GRAY, style: 'italic', gap: 1 })
        it.lines.forEach(([who, said]) => {
          paragraph(`${i + 1}. ${who ? `${who}: ` : ''}${fillBlanks(said)}`, { size: 10, gap: 1 })
        })
        state.y += 1.5
      })
    } else if (level.type === 'guidedText' || level.type === 'freeText') {
      if (level.scene) paragraph(level.scene, { size: 9, color: GRAY, style: 'italic', gap: 2 })
      paragraph(fillBlanks(level.text), { size: 10, lh: 5.6, gap: 3 })
    } else if (level.type === 'write') {
      level.items.forEach((it, i) => {
        ensure(16)
        if (it.scene) paragraph(it.scene, { size: 8.5, color: GRAY, style: 'italic', gap: 1 })
        paragraph(`${i + 1}. ${it.prompt}`, { size: 10, gap: 2 })
        doc.setDrawColor(...SOFT).setLineWidth(0.25)
        ensure(8)
        doc.line(M + 6, state.y, M + contentW, state.y)
        state.y += 7
      })
    }
  })

  // ---- soluciones ----
  const levelsWithAnswers = (topic.practice?.levels ?? []).filter((l) => answersOf(l).length > 0)
  if (levelsWithAnswers.length) {
    heading('Soluciones', { size: 13, gapTop: 8 })
    paragraph('Compruébalas solo después de haberlo intentado: mirar antes ahorra tiempo y no enseña nada.', {
      size: 9, color: GRAY, gap: 3,
    })
    levelsWithAnswers.forEach((level, li) => {
      const answers = answersOf(level)
      ensure(12)
      F('bold').setFontSize(9.5).setTextColor(...NAVY)
      doc.text(S(`${li + 1}. ${level.title}`), M, state.y)
      state.y += 5
      paragraph(answers.map((a, i) => `${i + 1}. ${a}`).join('   ·   '), { size: 9.5, color: GREEN, indent: 4, gap: 3 })
    })
  }

  // Aviso: si algo del contenido no cabía en la fuente de este documento, se ha
  // caído al escribirlo. Pasa, por ejemplo, en la lección de japonés que compara
  // con el coreano: la fuente japonesa no trae hangul, y servir esos kanji con
  // la coreana le daría al estudiante formas de trazo equivocadas. Se prefiere
  // perder el ejemplo y DECIRLO, antes que dejar un hueco mudo en la frase.
  const allText = [
    topic.title, topic.lead, topic.description,
    ...(topic.outcomes ?? []),
    ...(topic.guide?.decisions ?? []),
    ...(topic.seo ?? []).flatMap((sec) => [sec.heading, ...sec.paragraphs]),
  ].join(' ')
  if (hasUnsupportedScript(allText, scriptFontDe(idioma))) {
    callout(
      'Nota',
      'Parte del texto original usa un alfabeto que esta versión imprimible no puede escribir, y se ha omitido. La versión completa está en la página del tema.',
      [253, 242, 243], RED
    )
  }

  api.save(pdfFilename(idioma, nivel, topic.slug))
}
