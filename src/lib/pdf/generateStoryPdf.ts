// PDF de una historia — narrador, las versiones que se contradicen, las
// preguntas y el solucionario. El audio no se puede meter en un PDF, así que la
// transcripción deja de ser una ayuda opcional y pasa a ser el material.

import type { Historia, StoryQuestion } from '@/data/practica/historias/types'
import { createBrandedDoc, GRAY, GREEN, INK, NAVY, RED, SOFT } from '@/lib/pdf/brandedDoc'
import { canRenderPdf, idiomaLabel, pdfFilename, scriptFontDe } from '@/lib/pdf/languages'
import { WELEARN_PDF_BASE_URL } from '@/lib/welearn-pdf-standards'

export async function generateStoryPdf(historia: Historia) {
  const idioma = historia.lang
  if (!canRenderPdf(idioma)) {
    throw new Error(
      `Todavía no se pueden generar PDF en ${idiomaLabel(idioma)}: hace falta incrustar una fuente con su alfabeto.`
    )
  }

  const api = await createBrandedDoc({
    levelLabel: `${idiomaLabel(idioma)} ${historia.level}`,
    skillLabel: 'Historias',
    title: historia.title,
    subject: historia.metaDescription,
    keywords: ['comprensión', 'historia', idiomaLabel(idioma)],
    sourceUrl: `${WELEARN_PDF_BASE_URL}/practica/${idioma}/historias/${historia.slug}`,
    scriptFont: scriptFontDe(idioma),
  })
  const { doc, M, contentW, state, paragraph, heading, title, callout, ensure , S, F } = api

  // Numeración corrida de las preguntas: el solucionario tiene que poder
  // referirse a ellas sin ambigüedad aunque estén repartidas en cinco secciones.
  let n = 0
  const key: Array<{ n: number; answer: string; why: string }> = []

  const askAll = (questions: StoryQuestion[]) => {
    questions.forEach((q) => {
      n += 1
      ensure(18)
      paragraph(`${n}. ${q.q}`, { size: 10, gap: 1.5 })
      q.opts.forEach((o, oi) => {
        paragraph(`${String.fromCharCode(97 + oi)}) ${o}`, { size: 9.5, indent: 6, gap: 0.8 })
      })
      state.y += 2
      key.push({
        n,
        answer: `${String.fromCharCode(97 + q.correct)}) ${q.opts[q.correct]}`,
        why: q.explanation,
      })
    })
  }

  title(historia.title, `Historia · Comprensión integrada · ${historia.level}`)
  paragraph(historia.tagline, { size: 10.5, color: GRAY, gap: 3 })
  paragraph(historia.intro, { gap: 3 })

  // ---- narrador ----
  heading('Lo que cuenta el narrador')
  historia.narrator.paragraphs.forEach((p) => paragraph(p, { size: 10.5, lh: 5.6, gap: 2.5 }))
  if (historia.narrator.tip) callout('Antes de responder', historia.narrator.tip, [240, 245, 255], NAVY)
  heading('Preguntas sobre el narrador', { size: 11 })
  askAll(historia.narrator.questions)

  // ---- voces ----
  historia.voices.forEach((voice) => {
    heading(`La versión de ${voice.name} (${voice.role})`, { size: 11.5, gapTop: 6 })
    paragraph(
      'En la web esto es una nota de voz. Aquí va transcrita: léela sabiendo que es su versión, no la verdad.',
      { size: 8.6, color: GRAY, style: 'italic', gap: 2.5 }
    )
    voice.paragraphs.forEach((p) => paragraph(p, { size: 10.5, lh: 5.6, gap: 2.5 }))
    heading(`Preguntas sobre ${voice.name}`, { size: 10.5 })
    askAll(voice.questions)
  })

  // ---- cierre ----
  if (historia.finalIntro?.length) {
    heading('Y ahora, junta las versiones', { gapTop: 6 })
    historia.finalIntro.forEach((p) => paragraph(p, { gap: 2.5 }))
  }
  askAll(historia.finalQuestions)

  // ---- lengua útil ----
  if (historia.keyLanguage?.length) {
    heading('Lengua que te llevas', { gapTop: 6 })
    historia.keyLanguage.forEach((k) => {
      ensure(8)
      F('bold').setFontSize(9.8).setTextColor(...NAVY)
      const phrase = `${k.phrase}`
      doc.text(phrase, M, state.y)
      const w = doc.getTextWidth(phrase)
      F('normal').setTextColor(...GRAY)
      doc.text(` — ${k.meaning}`, M + w, state.y)
      state.y += 5.2
    })
    state.y += 2
  }

  if (historia.discussion) {
    callout('Para discutir', `${historia.discussion.question} ${historia.discussion.note}`, [253, 242, 243], RED)
  }

  // ---- escritura ----
  // Cada voz trae sus propias consignas de escritura; se piden todas las
  // primeras, que son las que responden a esa versión concreta de los hechos.
  const prompts = historia.voices.map((v) => v.write1Prompt).filter(Boolean)
  if (prompts.length) {
    heading('Escribe', { gapTop: 6 })
    prompts.forEach((prompt, i) => {
      paragraph(`${i + 1}. ${prompt}`, { size: 10, gap: 2 })
      doc.setDrawColor(...SOFT).setLineWidth(0.25)
      for (let l = 0; l < 4; l++) { ensure(8); doc.line(M, state.y, M + contentW, state.y); state.y += 8 }
      state.y += 2
    })
  }

  // ---- soluciones ----
  heading('Soluciones', { size: 13, gapTop: 8 })
  paragraph('Las opciones están en el mismo orden que en la web, así que las letras coinciden.', {
    size: 9, color: GRAY, gap: 3,
  })
  key.forEach((k) => {
    ensure(12)
    F('bold').setFontSize(9.5).setTextColor(...GREEN)
    const head = `${k.n}. ${k.answer}`
    const headLines = doc.splitTextToSize(head, contentW) as string[]
    headLines.forEach((l: string) => { ensure(5); doc.text(l, M, state.y); state.y += 4.8 })
    paragraph(k.why, { size: 9, color: INK, indent: 4, gap: 2.2 })
  })

  api.save(pdfFilename(idioma, 'historia', historia.slug))
}
