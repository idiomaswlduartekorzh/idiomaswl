'use client'

import { useReducer, useMemo, Fragment } from 'react'
import type {
  GrammarTopic,
  Level,
  ChoiceLevel,
  DualLevel,
  GuidedTextLevel,
  FreeTextLevel,
  WriteLevel,
  WriteItem,
  Blank,
} from '@/data/grammar/types'
import { useGrammarProgress } from '@/components/grammar/useGrammarProgress'
import PdfDownloadButton from '@/components/practica/PdfDownloadButton'
import { canRenderPdf } from '@/lib/pdf/languages'

type RelatedWritingExercise = {
  id: string
  sequence: number
  title: string
  genre: string
}

// ── State machine ────────────────────────────────────────────────────────────

type Phase = 'idle' | 'practicing' | 'reviewing'

interface State {
  phase: Phase
  activeLevelIdx: number
  currentIdx: number
  answers: Record<string, string>
  score: number
  total: number
}

const initialState: State = {
  phase: 'practicing',
  activeLevelIdx: 0,
  currentIdx: 0,
  answers: {},
  score: 0,
  total: 0,
}

type Action =
  | { type: 'START'; levelIdx: number }
  | { type: 'SET'; key: string; value: string }
  | { type: 'NEXT' }
  | { type: 'SUBMIT'; score: number; total: number }
  | { type: 'RETRY' }
  | { type: 'BACK' }

function reducer(s: State, a: Action): State {
  switch (a.type) {
    case 'START':
      return { ...initialState, phase: 'practicing', activeLevelIdx: a.levelIdx }
    case 'SET':
      return { ...s, answers: { ...s.answers, [a.key]: a.value } }
    case 'NEXT':
      return { ...s, currentIdx: s.currentIdx + 1 }
    case 'SUBMIT':
      return { ...s, phase: 'reviewing', score: a.score, total: a.total }
    case 'RETRY':
      return { ...initialState, phase: 'practicing', activeLevelIdx: s.activeLevelIdx }
    case 'BACK':
      return { ...initialState, activeLevelIdx: s.activeLevelIdx }
  }
}

// ── Option shuffling ─────────────────────────────────────────────────────────
// Grammar topic data always lists the correct answer as the first element of
// `options` (authoring convention), so rendering it verbatim puts the right
// choice in position 1 on every question. Fisher-Yates shuffles the display
// order while `answer`/scoring still reference the original string value. The
// seed keeps SSR and the first client render identical, avoiding hydration
// mismatches without putting the answer in a fixed position.

function shuffle<T>(arr: T[], seed: string): T[] {
  const a = [...arr]
  let state = 2166136261
  for (const char of seed) {
    state ^= char.codePointAt(0) ?? 0
    state = Math.imul(state, 16777619)
  }
  const random = () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ── Scoring helpers ──────────────────────────────────────────────────────────

function norm(s: string) {
  return s.toLowerCase().trim().replace(/[.,!?]/g, '').replace(/\s+/g, ' ')
}

function matchAnswer(user: string, answer: string, accepted?: string[]) {
  const u = norm(user)
  return u === norm(answer) || (accepted ?? []).some((a) => u === norm(a))
}

// Pistas objetivo en alfabeto latino nombradas en el enunciado tras un disparador
// de uso ("usa/usando/using/use/utilise/verwende"). Solo cuenta como pista si esa
// palabra también aparece en la respuesta-modelo: así se descartan palabras de
// instrucción ("verbos", "forma", "oración") y se conserva la estructura objetivo
// real (p.ej. "who", "that", "weil", "porque").
function writeCues(item: WriteItem): string[] {
  const src = `${item.scene ?? ''} ${item.prompt ?? ''}`
  const model = norm(`${item.answer ?? ''} ${(item.accepted ?? []).join(' ')}`)
  const cues: string[] = []
  const re = /\b(?:usando|usa|using|use|utilisez|utilise|verwende)\s+["'«“‘]?([a-zA-Zàâäéèêëïîôöùûüçñáíóúü'-]{3,20})["'»”’]?/gi
  for (const m of src.matchAll(re)) {
    const c = m[1].toLowerCase().replace(/^['-]+|['-]+$/g, '')
    if (c.length >= 3 && model.includes(c)) cues.push(c)
  }
  return cues
}

// Evaluación del nivel de producción libre (write). No se puede calificar por
// coincidencia exacta, porque el estudiante escribe una frase propia y el
// `answer`/`accepted` son solo ejemplos-modelo, no un conjunto cerrado. Capas:
//   1) Coincidencia exacta/aceptada → correcto (protege los niveles controlados
//      de "combina las frases", donde sí hay una transformación determinada).
//   2) Se rechaza respuesta vacía o copia literal del enunciado.
//   3) Se exige un intento sustancial: ≥3 palabras, o ≥6 caracteres (CJK/Hangul,
//      que no separan por espacios de forma fiable).
//   4) Si el enunciado nombra una estructura objetivo latina presente en el
//      modelo, se exige que la respuesta la contenga (p.ej. "who"). Para objetivos
//      no-latinos (coreano/japonés/ruso), que van como sufijo flexionado y no se
//      pueden verificar por texto, se acredita el intento sustancial.
// Cambio monótono: nada que hoy se marque correcto pasa a incorrecto; solo se
// recupera producción libre válida que antes se marcaba en rojo indebidamente.
function evaluateWrite(item: WriteItem, user: string): boolean {
  if (matchAnswer(user, item.answer, item.accepted)) return true
  const u = norm(user)
  if (!u) return false
  if (u === norm(item.prompt ?? '') || u === norm(item.scene ?? '')) return false
  const words = u.split(' ').filter(Boolean).length
  const chars = u.replace(/\s/g, '').length
  if (words < 3 && chars < 6) return false
  const cues = writeCues(item)
  if (cues.length) return cues.some((c) => u.includes(c))
  return true
}

// Índices de hueco [[n]] presentes en un texto, en orden y sin repetir. El motor
// sólo renderiza un input por cada [[n]] presente, así que scoring y validación
// deben derivarse de este conjunto (no de la longitud cruda de `blanks`). Así un
// desajuste de datos —más blanks que huecos, o al revés— nunca bloquea el nivel.
function gapIndices(text: string): number[] {
  const seen = new Set<number>()
  const out: number[] = []
  for (const m of text.matchAll(/\[\[(\d+)\]\]/g)) {
    const i = Number(m[1])
    if (!seen.has(i)) { seen.add(i); out.push(i) }
  }
  return out
}

function dualItemText(item: DualLevel['items'][number]): string {
  return item.lines.map(([, t]) => t).join(' ')
}

function scoreLevel(level: Level, answers: Record<string, string>): { score: number; total: number } {
  if (level.type === 'choice') {
    const l = level as ChoiceLevel
    let score = 0
    l.items.forEach((item, i) => {
      if ((answers[`${i}`] ?? '').toLowerCase() === item.answer.toLowerCase()) score++
    })
    return { score, total: l.items.length }
  }
  if (level.type === 'dual') {
    const l = level as DualLevel
    let score = 0, total = 0
    l.items.forEach((item, ii) => {
      const present = gapIndices(dualItemText(item))
      present.forEach((bi) => {
        const blank = item.blanks[bi]
        if (!blank) return // hueco sin respuesta definida: no puntúa
        total++
        if ((answers[`${ii}-${bi}`] ?? '').toLowerCase() === blank.answer.toLowerCase()) score++
      })
    })
    return { score, total }
  }
  if (level.type === 'guidedText' || level.type === 'freeText') {
    const l = level as GuidedTextLevel | FreeTextLevel
    let score = 0, total = 0
    gapIndices(l.text).forEach((i) => {
      const blank = l.blanks[i]
      if (!blank) return // hueco extra sin respuesta: no puntúa (evita bloqueo)
      total++
      if (matchAnswer(answers[`${i}`] ?? '', blank.answer, blank.accepted)) score++
    })
    return { score, total }
  }
  if (level.type === 'write') {
    const l = level as WriteLevel
    let score = 0
    l.items.forEach((item, i) => {
      if (evaluateWrite(item, answers[`${i}`] ?? '')) score++
    })
    return { score, total: l.items.length }
  }
  return { score: 0, total: 0 }
}

// ── Text with inline blanks ──────────────────────────────────────────────────

function TextWithBlanks({
  text,
  blanks,
  answers,
  onChange,
}: {
  text: string
  blanks: Blank[]
  answers: Record<string, string>
  onChange: (key: string, value: string) => void
}) {
  const parts = text.split(/\[\[(\d+)\]\]/)
  const shuffledOptions = useMemo(
    () => blanks.map((b, index) => (b.options ? shuffle(b.options, `${text}-${index}-${b.answer}`) : undefined)),
    [blanks, text],
  )
  return (
    <p className="story-text">
      {parts.map((part, i) => {
        if (i % 2 === 0) return <Fragment key={i}>{part}</Fragment>
        const bi = parseInt(part)
        const blank = blanks[bi]
        const key = `${bi}`
        if (blank?.options?.length) {
          return (
            <select
              key={i}
              className="blank-field"
              value={answers[key] ?? ''}
              onChange={(e) => onChange(key, e.target.value)}
            >
              <option value="">—</option>
              {shuffledOptions[bi]!.map((o, oi) => <option key={oi} value={o}>{o}</option>)}
            </select>
          )
        }
        return (
          <input
            key={i}
            type="text"
            className="blank-field"
            value={answers[key] ?? ''}
            onChange={(e) => onChange(key, e.target.value)}
            placeholder="___"
          />
        )
      })}
    </p>
  )
}

// ── Choice level ─────────────────────────────────────────────────────────────

type UiLanguage = 'es' | 'en' | 'fr' | 'de' | 'it' | 'pt'
const GERMAN_UI: Record<string, string> = {
  'Question': 'Frage', 'View results →': 'Ergebnisse anzeigen →', 'Next →': 'Weiter →', 'Context': 'Kontext',
  'Submit answers →': 'Antworten abgeben →', 'Exercise': 'Übung', 'Instruction': 'Aufgabe',
  'Write your answer here...': 'Schreiben Sie Ihre Antwort hier...', '(no answer)': '(keine Antwort)',
  'gap': 'Lücke', 'Gap': 'Lücke', 'Detailed review': 'Ausführliche Auswertung',
  'Review every answer with its correction and explanation.': 'Prüfen Sie jede Antwort mit Korrektur und Begründung.',
  'correct': 'richtig', '✓ Correct': '✓ Richtig', '✗ Review': '✗ Überarbeiten', 'Your answer': 'Ihre Antwort',
  'Correct answer': 'Richtige Antwort', 'Download this topic as a PDF': 'Dieses Thema als PDF herunterladen',
  'Explanation, reference table, exercises and answer key. Ready to print.': 'Erklärung, Übersicht, Übungen und Lösungsschlüssel. Druckfertig.',
  'Visual lab': 'Visuelles Labor', 'Writing transfer': 'Transfer zum Schreiben',
  'The guided task asks you to use this structure in a communicative situation at the same level.': 'Die gelenkte Aufgabe überträgt diese Struktur auf eine kommunikative Situation desselben Niveaus.',
  'Progressive practice': 'Progressives Training', '6 practice stages': '6 Übungsstufen',
  'Score at least 65% in each stage to unlock the next one. Corrections appear after you complete the whole stage, not after each question.': 'Erreichen Sie in jeder Stufe mindestens 65 %, um die nächste freizuschalten. Die Korrekturen erscheinen nach der gesamten Stufe, nicht nach jeder Frage.',
  'Stage': 'Stufe', 'Score at least 65% in the previous stage to unlock': 'Erreichen Sie in der vorherigen Stufe mindestens 65 %, um diese freizuschalten',
  'Teacher note': 'Didaktischer Hinweis', 'Select a stage above to begin the practice.': 'Wählen Sie oben eine Stufe aus, um die Übungen zu beginnen.',
  'Exit': 'Beenden', 'Stage passed!': 'Stufe bestanden!', 'Keep improving': 'Weiter üben', 'of': 'von',
  ' · Next stage unlocked': ' · Nächste Stufe freigeschaltet', ' · You need 65% to continue': ' · Sie benötigen 65 %, um fortzufahren',
  'Try again': 'Erneut versuchen', 'Topic completed! →': 'Thema abgeschlossen! →', 'Your progress': 'Ihr Fortschritt',
  'stages unlocked': 'Stufen freigeschaltet', 'stages': 'Stufen', 'Objective': 'Lernziel',
  'Key decisions': 'Wichtige Entscheidungen', 'Quick reference': 'Schnellübersicht', 'Common errors': 'Häufige Fehler',
}
const ITALIAN_UI: Record<string, string> = {
  'Question': 'Domanda', 'View results →': 'Vedi i risultati →', 'Next →': 'Avanti →', 'Context': 'Contesto',
  'Submit answers →': 'Invia le risposte →', 'Exercise': 'Esercizio', 'Instruction': 'Consegna',
  'Write your answer here...': 'Scrivi qui la tua risposta...', '(no answer)': '(nessuna risposta)',
  'gap': 'spazio', 'Gap': 'Spazio', 'Detailed review': 'Correzione dettagliata',
  'Review every answer with its correction and explanation.': 'Rivedi ogni risposta con la correzione e la spiegazione.',
  'correct': 'corrette', '✓ Correct': '✓ Corretta', '✗ Review': '✗ Da rivedere', 'Your answer': 'La tua risposta',
  'Correct answer': 'Risposta corretta', 'Download this topic as a PDF': 'Scarica questo argomento in PDF',
  'Explanation, reference table, exercises and answer key. Ready to print.': 'Spiegazione, tabella di riferimento, esercizi e soluzioni. Pronto da stampare.',
  'Visual lab': 'Laboratorio visivo', 'Writing transfer': 'Trasferimento alla scrittura',
  'The guided task asks you to use this structure in a communicative situation at the same level.': 'L’attività guidata ti chiede di usare questa struttura in una situazione comunicativa dello stesso livello.',
  'Progressive practice': 'Pratica progressiva', '6 practice stages': '6 fasi di pratica',
  'Score at least 65% in each stage to unlock the next one. Corrections appear after you complete the whole stage, not after each question.': 'Ottieni almeno il 65% in ogni fase per sbloccare la successiva. Le correzioni compaiono dopo l’intera fase, non dopo ogni domanda.',
  'Stage': 'Fase', 'Score at least 65% in the previous stage to unlock': 'Ottieni almeno il 65% nella fase precedente per sbloccare questa',
  'Teacher note': 'Nota didattica', 'Select a stage above to begin the practice.': 'Seleziona una fase qui sopra per iniziare la pratica.',
  'Exit': 'Esci', 'Stage passed!': 'Fase superata!', 'Keep improving': 'Continua a migliorare', 'of': 'su',
  ' · Next stage unlocked': ' · Fase successiva sbloccata', ' · You need 65% to continue': ' · Serve il 65% per continuare',
  'Try again': 'Riprova', 'Topic completed! →': 'Argomento completato! →', 'Your progress': 'I tuoi progressi',
  'stages unlocked': 'fasi sbloccate', 'stages': 'fasi', 'Objective': 'Obiettivo',
  'Key decisions': 'Decisioni chiave', 'Quick reference': 'Riferimento rapido', 'Common errors': 'Errori frequenti',
}
const PORTUGUESE_UI: Record<string, string> = {
  'Question': 'Questão', 'View results →': 'Ver resultados →', 'Next →': 'Avançar →', 'Context': 'Contexto',
  'Submit answers →': 'Enviar respostas →', 'Exercise': 'Exercício', 'Instruction': 'Instrução',
  'Write your answer here...': 'Escreva sua resposta aqui...', '(no answer)': '(sem resposta)',
  'gap': 'lacuna', 'Gap': 'Lacuna', 'Detailed review': 'Correção detalhada',
  'Review every answer with its correction and explanation.': 'Revise cada resposta com a correção e a explicação.',
  'correct': 'corretas', '✓ Correct': '✓ Correta', '✗ Review': '✗ Revisar', 'Your answer': 'Sua resposta',
  'Correct answer': 'Resposta correta', 'Download this topic as a PDF': 'Baixar este tema em PDF',
  'Explanation, reference table, exercises and answer key. Ready to print.': 'Explicação, tabela de referência, exercícios e gabarito. Pronto para imprimir.',
  'Visual lab': 'Laboratório visual', 'Writing transfer': 'Transferência para a escrita',
  'The guided task asks you to use this structure in a communicative situation at the same level.': 'A tarefa guiada pede que você use esta estrutura em uma situação comunicativa do mesmo nível.',
  'Progressive practice': 'Prática progressiva', '6 practice stages': '6 etapas de prática',
  'Score at least 65% in each stage to unlock the next one. Corrections appear after you complete the whole stage, not after each question.': 'Acerte pelo menos 65% em cada etapa para liberar a seguinte. As correções aparecem ao concluir a etapa inteira, não após cada questão.',
  'Stage': 'Etapa', 'Score at least 65% in the previous stage to unlock': 'Acerte pelo menos 65% na etapa anterior para liberar esta',
  'Teacher note': 'Nota didática', 'Select a stage above to begin the practice.': 'Selecione uma etapa acima para começar a prática.',
  'Exit': 'Sair', 'Stage passed!': 'Etapa concluída!', 'Keep improving': 'Continue praticando', 'of': 'de',
  ' · Next stage unlocked': ' · Próxima etapa liberada', ' · You need 65% to continue': ' · Você precisa de 65% para continuar',
  'Try again': 'Tentar novamente', 'Topic completed! →': 'Tema concluído! →', 'Your progress': 'Seu progresso',
  'stages unlocked': 'etapas liberadas', 'stages': 'etapas', 'Objective': 'Objetivo',
  'Key decisions': 'Decisões-chave', 'Quick reference': 'Referência rápida', 'Common errors': 'Erros frequentes',
}
const tr = (language: UiLanguage, english: string, spanish: string, french: string) => {
  if (language === 'en') return english
  if (language === 'fr') return french
  if (language === 'de') {
    const writingMatch = english.match(/^Use (.+) in a text$/u)
    return writingMatch ? `${writingMatch[1]} in einem Text verwenden` : (GERMAN_UI[english] ?? english)
  }
  if (language === 'it') {
    const writingMatch = english.match(/^Use (.+) in a text$/u)
    return writingMatch ? `Usare ${writingMatch[1]} in un testo` : (ITALIAN_UI[english] ?? english)
  }
  if (language === 'pt') {
    const writingMatch = english.match(/^Use (.+) in a text$/u)
    return writingMatch ? `Usar ${writingMatch[1]} em um texto` : (PORTUGUESE_UI[english] ?? english)
  }
  return spanish
}

function ChoicePractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
  uiLanguage,
}: {
  level: ChoiceLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
  uiLanguage: UiLanguage
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  const canProceed = !!(answers[`${idx}`])
  const shuffledOptions = useMemo(() => shuffle(item.options, `${item.scene}-${item.answer}`), [item])

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>{tr(uiLanguage, 'Question', 'Pregunta', 'Question')} {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="dialogue">
        {item.lines.map(([speaker, text], li) => (
          <div key={li} className="dialogue-line">
            <div className="speaker">{speaker}</div>
            <div><p>{text}</p></div>
          </div>
        ))}
      </div>
      <div className="options">
        {shuffledOptions.map((opt, oi) => (
          <button
            key={oi}
            className={`option${answers[`${idx}`] === opt ? ' is-selected' : ''}`}
            onClick={() => dispatch({ type: 'SET', key: `${idx}`, value: opt })}
          >
            {opt}
          </button>
        ))}
      </div>
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? tr(uiLanguage, 'View results →', 'Ver resultados →', 'Voir les résultats →') : tr(uiLanguage, 'Next →', 'Siguiente →', 'Suivant →')}
        </button>
      </div>
    </div>
  )
}

// ── Dual level ───────────────────────────────────────────────────────────────

function DualPractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
  uiLanguage,
}: {
  level: DualLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
  uiLanguage: UiLanguage
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  // Sólo se exige respuesta para los huecos que realmente se renderizan (aquellos
  // con un blank definido). Un [[n]] sin blank se muestra como texto y no bloquea.
  const requiredBi = gapIndices(dualItemText(item)).filter((bi) => item.blanks[bi])
  const canProceed = requiredBi.every((bi) => !!(answers[`${idx}-${bi}`]))
  const shuffledOptions = useMemo(
    () => item.blanks.map((b, index) => (b.options ? shuffle(b.options, `${item.scene}-${index}-${b.answer}`) : undefined)),
    [item],
  )

  function renderLine(line: [string, string]) {
    const [speaker, text] = line
    const parts = text.split(/\[\[(\d+)\]\]/)
    return (
      <div className="dialogue-line">
        <div className="speaker">{speaker}</div>
        <div>
          <p>
            {parts.map((part, pi) => {
              if (pi % 2 === 0) return <Fragment key={pi}>{part}</Fragment>
              const bi = parseInt(part)
              const blank = item.blanks[bi]
              if (!blank) return <span key={pi} className="blank-field">___</span>
              const key = `${idx}-${bi}`
              return (
                <select
                  key={pi}
                  className="blank-field"
                  value={answers[key] ?? ''}
                  onChange={(e) => dispatch({ type: 'SET', key, value: e.target.value })}
                >
                  <option value="">—</option>
                  {(shuffledOptions[bi] ?? []).map((o, oi) => <option key={oi} value={o}>{o}</option>)}
                </select>
              )
            })}
          </p>
        </div>
      </div>
    )
  }

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>{tr(uiLanguage, 'Context', 'Diálogo', 'Contexte')} {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="dialogue">
        {item.lines.map((line, li) => (
          <Fragment key={li}>{renderLine(line)}</Fragment>
        ))}
      </div>
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? tr(uiLanguage, 'View results →', 'Ver resultados →', 'Voir les résultats →') : tr(uiLanguage, 'Next →', 'Siguiente →', 'Suivant →')}
        </button>
      </div>
    </div>
  )
}

// ── Text level (guidedText / freeText) ───────────────────────────────────────

function TextPractice({
  level,
  answers,
  dispatch,
  onSubmit,
  uiLanguage,
}: {
  level: GuidedTextLevel | FreeTextLevel
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
  uiLanguage: UiLanguage
}) {
  // Sólo se exigen los huecos [[n]] presentes en el texto que tienen blank
  // definido; huecos extra son opcionales y blanks sin hueco se ignoran.
  const requiredIdx = gapIndices(level.text).filter((i) => level.blanks[i])
  const canSubmit = requiredIdx.every((i) => !!(answers[`${i}`]))

  function handleChange(key: string, value: string) {
    dispatch({ type: 'SET', key, value })
  }

  function handleSubmit() {
    const result = scoreLevel(level, answers)
    onSubmit(result.score, result.total)
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>{level.scene}</span>
      </div>
      <TextWithBlanks
        text={level.text}
        blanks={level.blanks}
        answers={answers}
        onChange={handleChange}
      />
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canSubmit} onClick={handleSubmit}>
          {tr(uiLanguage, 'Submit answers →', 'Enviar respuestas →', 'Envoyer les réponses →')}
        </button>
      </div>
    </div>
  )
}

// ── Write level ──────────────────────────────────────────────────────────────

function WritePractice({
  level,
  idx,
  answers,
  dispatch,
  onSubmit,
  uiLanguage,
}: {
  level: WriteLevel
  idx: number
  answers: Record<string, string>
  dispatch: React.Dispatch<Action>
  onSubmit: (score: number, total: number) => void
  uiLanguage: UiLanguage
}) {
  const item = level.items[idx]
  const isLast = idx === level.items.length - 1
  const canProceed = !!(answers[`${idx}`] ?? '').trim()

  function next() {
    if (isLast) {
      const result = scoreLevel(level, answers)
      onSubmit(result.score, result.total)
    } else {
      dispatch({ type: 'NEXT' })
    }
  }

  return (
    <div className="question-shell">
      <div className="question-topline">
        <span>{tr(uiLanguage, 'Exercise', 'Ejercicio', 'Exercice')} {idx + 1} / {level.items.length}</span>
        <div className="mini-progress">
          <span style={{ width: `${((idx + 1) / level.items.length) * 100}%` }} />
        </div>
      </div>
      <span className="scene-label">{item.scene}</span>
      <div className="write-card">
        <span className="write-card__label">{tr(uiLanguage, 'Instruction', 'Instrucción', 'Consigne')}</span>
        <p className="write-card__text">{item.prompt}</p>
      </div>
      <textarea
        className="answer-field"
        value={answers[`${idx}`] ?? ''}
        onChange={(e) => dispatch({ type: 'SET', key: `${idx}`, value: e.target.value })}
        placeholder={tr(uiLanguage, 'Write your answer here...', 'Escribe tu respuesta aquí...', 'Écrivez votre réponse ici...')}
        rows={2}
        style={{ resize: 'vertical', marginTop: '0.75rem' }}
      />
      <div className="gram-actions">
        <button className="gram-btn accent" disabled={!canProceed} onClick={next}>
          {isLast ? tr(uiLanguage, 'Submit answers →', 'Enviar respuestas →', 'Envoyer les réponses →') : tr(uiLanguage, 'Next →', 'Siguiente →', 'Suivant →')}
        </button>
      </div>
    </div>
  )
}

// ── Deferred review (shown after completing a level) ─────────────────────────

function DeferredReview({ level, answers, uiLanguage }: { level: Level; answers: Record<string, string>; uiLanguage: UiLanguage }) {
  type ReviewItem = {
    label: string
    user: string
    correct: string
    explain: string
    isGood: boolean
  }

  const items: ReviewItem[] = []

  if (level.type === 'choice') {
    const l = level as ChoiceLevel
    l.items.forEach((item, i) => {
      const user = answers[`${i}`] ?? ''
      items.push({
        label: item.scene,
        user: user || tr(uiLanguage, '(no answer)', '(sin respuesta)', '(sans réponse)'),
        correct: item.answer,
        explain: item.explain,
        isGood: user.toLowerCase() === item.answer.toLowerCase(),
      })
    })
  } else if (level.type === 'dual') {
    const l = level as DualLevel
    l.items.forEach((item, ii) => {
      gapIndices(dualItemText(item)).forEach((bi) => {
        const blank = item.blanks[bi]
        if (!blank) return
        const user = answers[`${ii}-${bi}`] ?? ''
        items.push({
          label: `${item.scene} — ${tr(uiLanguage, 'gap', 'espacio', 'espace')} ${bi + 1}`,
          user: user || tr(uiLanguage, '(no answer)', '(sin respuesta)', '(sans réponse)'),
          correct: blank.answer,
          explain: blank.explain,
          isGood: user.toLowerCase() === blank.answer.toLowerCase(),
        })
      })
    })
  } else if (level.type === 'guidedText' || level.type === 'freeText') {
    const l = level as GuidedTextLevel | FreeTextLevel
    gapIndices(l.text).forEach((i) => {
      const blank = l.blanks[i]
      if (!blank) return
      const user = answers[`${i}`] ?? ''
      items.push({
        label: `${tr(uiLanguage, 'Gap', 'Espacio', 'Espace')} ${i + 1}`,
        user: user || tr(uiLanguage, '(no answer)', '(sin respuesta)', '(sans réponse)'),
        correct: blank.answer,
        explain: blank.explain,
        isGood: matchAnswer(user, blank.answer, blank.accepted),
      })
    })
  } else if (level.type === 'write') {
    const l = level as WriteLevel
    l.items.forEach((item, i) => {
      const user = answers[`${i}`] ?? ''
      items.push({
        label: item.scene,
        user: user || tr(uiLanguage, '(no answer)', '(sin respuesta)', '(sans réponse)'),
        correct: item.answer,
        explain: item.explain,
        isGood: evaluateWrite(item, user),
      })
    })
  }

  const goodCount = items.filter((it) => it.isGood).length

  return (
    <div className="review-section">
      <div className="review-heading">
        <div>
          <h3>{tr(uiLanguage, 'Detailed review', 'Revisión detallada', 'Correction détaillée')}</h3>
          <p>{tr(uiLanguage, 'Review every answer with its correction and explanation.', 'Cada respuesta con su corrección y explicación del porqué.', 'Revoyez chaque réponse avec sa correction et son explication.')}</p>
        </div>
        <span className="review-summary">{goodCount}/{items.length} {tr(uiLanguage, 'correct', 'correctas', 'correctes')}</span>
      </div>
      <div className="review-grid">
        {items.map((it, i) => (
          <div key={i} className={`review-card ${it.isGood ? 'good' : 'bad'}`}>
            <div className="review-card__top">
              <span className="review-index">{i + 1}</span>
              <span className="review-status">{it.isGood ? tr(uiLanguage, '✓ Correct', '✓ Correcto', '✓ Correct') : tr(uiLanguage, '✗ Review', '✗ Revisar', '✗ À revoir')}</span>
            </div>
            <p className="review-prompt">{it.label}</p>
            <div className="review-answer-grid">
              <div className="review-answer">
                <span>{tr(uiLanguage, 'Your answer', 'Tu respuesta', 'Votre réponse')}</span>
                <b>{it.user}</b>
              </div>
              <div className="review-answer">
                <span>{tr(uiLanguage, 'Correct answer', 'Respuesta correcta', 'Réponse correcte')}</span>
                <b>{it.correct}</b>
              </div>
            </div>
            <p className="review-explain">{it.explain}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────────────────────

export default function GrammarTopicClient({
  topic,
  idioma,
  nivel,
  relatedWritingExercises = [],
  mode = 'full',
  uiLanguage = 'es',
}: {
  topic: GrammarTopic
  idioma: string
  nivel: string
  relatedWritingExercises?: RelatedWritingExercise[]
  mode?: 'full' | 'practiceOnly'
  uiLanguage?: UiLanguage
}) {
  const { progress, mounted, recordLevel } = useGrammarProgress(idioma, nivel, topic.slug)
  const [state, dispatch] = useReducer(reducer, initialState)

  const activeLevel = topic.practice.levels[state.activeLevelIdx]

  function handleSubmit(score: number, total: number) {
    dispatch({ type: 'SUBMIT', score, total })
    recordLevel(
      activeLevel.id,
      score,
      total,
      state.activeLevelIdx,
      topic.practice.levels.length,
    )
  }

  function isUnlocked(i: number) {
    if (!mounted) return i === 0
    return i < progress.unlocked
  }

  const pct = state.total ? Math.round((state.score / state.total) * 100) : 0
  const passed = pct >= 65

  return (
    <>
      {/* ── Descarga ───────────────────────────────────────────────────────── */}
      {mode === 'full' && canRenderPdf(idioma) && (
        <div className="topic-download no-print">
          <PdfDownloadButton
            color={topic.color}
            label={tr(uiLanguage, 'Download this topic as a PDF', 'Descargar este tema en PDF', 'Télécharger ce thème en PDF')}
            generate={async () => {
              const { generateGrammarPdf } = await import('@/lib/pdf/generateGrammarPdf')
              await generateGrammarPdf(topic, idioma, nivel)
            }}
          />
          <span>{tr(uiLanguage, 'Explanation, reference table, exercises and answer key. Ready to print.', 'Explicación, tabla y ejercicios con las soluciones. Para imprimir y resolver a mano.', 'Explication, tableau de référence, exercices et corrigé. Prêt à imprimer.')}</span>
        </div>
      )}

      {/* ── Visual Brief ───────────────────────────────────────────────────── */}
      {mode === 'full' && <div className="visual-brief">
        <div className="visual-brief__header">
          <div>
            <span className="section-label">— {tr(uiLanguage, 'Visual lab', 'Laboratorio visual', 'Laboratoire visuel')}</span>
            <h3 className="gram-h3">{topic.visual.graphicPrompt}</h3>
          </div>
          <p>{topic.visual.teacherLens}</p>
        </div>

        {topic.visual.scene.length > 0 && (
          <div className="topic-lab">
            <div className="lab-stage">
              {topic.visual.scene.map(([original, pronoun], i) => (
                <div
                  key={i}
                  className="lab-token"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <span>{original}</span>
                  <b>→ {pronoun}</b>
                </div>
              ))}
            </div>
            <div className="lab-coach">
              <span>📐</span>
              <strong>{topic.guide.model}</strong>
              <div className="sense-tags">
                {topic.visual.learnerModes.map((mode, i) => (
                  <em key={i}>{mode}</em>
                ))}
              </div>
            </div>
          </div>
        )}

        {topic.guide.decisions.length > 0 && (
          <div className="decision-flow">
            {topic.guide.decisions.map((d, i) => (
              <div
                key={i}
                className="flow-step"
                style={{ '--i': i } as React.CSSProperties}
              >
                <span>{i + 1}</span>
                <p>{d}</p>
              </div>
            ))}
          </div>
        )}

        <div className="pattern-map">
          {topic.guide.table.map(([col1, col2, col3], i) => (
            <div
              key={i}
              className="pattern-row"
              style={{ '--i': i } as React.CSSProperties}
            >
              <b>{col1}</b>
              <span>{col2}</span>
              <code>{col3}</code>
            </div>
          ))}
        </div>

        {topic.guide.mistakes.length > 0 && (
          <div className="visual-alerts">
            {topic.guide.mistakes.map((m, i) => (
              <p key={i}><span />{m}</p>
            ))}
          </div>
        )}
      </div>}

      {relatedWritingExercises.length > 0 && (
        <section className="grammar-writing-bridge" aria-labelledby="grammar-writing-bridge-title">
          <div>
            <span className="section-label">— {tr(uiLanguage, 'Writing transfer', 'Transferencia a escritura', 'Transfert vers l’écriture')}</span>
            <h2 id="grammar-writing-bridge-title" className="gram-h2">{tr(uiLanguage, `Use ${topic.shortTitle} in a text`, `Usa ${topic.shortTitle} en un texto`, `Employez ${topic.shortTitle} dans un texte`)}</h2>
            <p>{tr(uiLanguage, 'The guided task asks you to use this structure in a communicative situation at the same level.', 'La práctica guiada te pide usar esta estructura para resolver una situación comunicativa del mismo nivel.', 'La tâche guidée vous demande d’employer cette structure dans une situation communicative du même niveau.')}</p>
          </div>
          <div className="grammar-writing-bridge__links">
            {relatedWritingExercises.map(exercise => (
              <a key={exercise.id} href={`/practica/${idioma}/${nivel}/escritura?ejercicio=${exercise.id}`}>
                <span>{String(exercise.sequence).padStart(2, '0')}</span>
                <b>{exercise.title}</b>
                <small>{exercise.genre}</small>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* ── Practice Journey overview ───────────────────────────────────────── */}
      <div id="practica" className="practice-journey">
        <div className="practice-journey__intro">
          <div>
            <span className="section-label">— {tr(uiLanguage, 'Progressive practice', 'Práctica progresiva', 'Pratique progressive')}</span>
            <h2 className="gram-h2">{tr(uiLanguage, '6 practice stages', '6 niveles de práctica', '6 étapes de pratique')}</h2>
          </div>
          <p>
            {tr(uiLanguage,
              'Score at least 65% in each stage to unlock the next one. Corrections appear after you complete the whole stage, not after each question.',
              'Supera el 65 % en cada nivel para desbloquear el siguiente. Las correcciones aparecen al terminar el nivel completo, no pregunta por pregunta.',
              'Obtenez au moins 65 % à chaque étape pour débloquer la suivante. Les corrections apparaissent après toute l’étape, et non après chaque question.')}
          </p>
        </div>
        <div className="journey-grid">
          {topic.practice.levels.map((level, i) => {
            const verb = topic.visual.practiceVerbs?.[i] ?? `${tr(uiLanguage, 'Stage', 'Nivel', 'Étape')} ${i + 1}`
            return (
              <div
                key={level.id}
                className="journey-step"
                style={{ '--i': i } as React.CSSProperties}
              >
                <span>{i + 1}</span>
                <b>{verb}</b>
                <strong>{level.title}</strong>
                <p>{level.tag}{' · '}{level.intro.length > 55 ? level.intro.slice(0, 55) + '…' : level.intro}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Learning layout ─────────────────────────────────────────────────── */}
      <div className="learning-layout">
        {/* Main practice area */}
        <div className="practice-main">
          {/* Level strip — always visible */}
          <div className="level-strip">
            {topic.practice.levels.map((level, i) => {
              const unlocked = isUnlocked(i)
              const best = mounted ? progress.scores[level.id] : undefined
              const isActive = state.activeLevelIdx === i && state.phase !== 'idle'
              return (
                <button
                  key={level.id}
                  className={`level-card${isActive ? ' is-active' : ''}${!unlocked ? ' is-locked' : ''}`}
                  disabled={!unlocked}
                  onClick={() => dispatch({ type: 'START', levelIdx: i })}
                  title={!unlocked ? tr(uiLanguage, 'Score at least 65% in the previous stage to unlock', 'Supera el nivel anterior con ≥65% para desbloquear', 'Obtenez au moins 65 % à l’étape précédente pour débloquer') : level.title}
                >
                  <span>{unlocked ? (i + 1) : '🔒'}</span>
                  <strong>{level.title}</strong>
                  <em>{level.tag}</em>
                  {best && (
                    <em style={{ color: 'var(--topic-color)', fontWeight: 800 }}>
                      {best.percent}%
                    </em>
                  )}
                </button>
              )
            })}
          </div>

          {/* Idle: show teacher note */}
          {state.phase === 'idle' && (
            <div className="teacher-note">
              <span className="section-label">— {tr(uiLanguage, 'Teacher note', 'Nota del especialista', 'Note pédagogique')}</span>
              <h2 className="gram-h2">{topic.guide.goal}</h2>
              <p>{topic.guide.model}</p>
              <p style={{ marginTop: '0.65rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                {tr(uiLanguage, 'Select a stage above to begin the practice.', 'Selecciona un nivel arriba para comenzar la práctica.', 'Sélectionnez une étape ci-dessus pour commencer la pratique.')}
              </p>
            </div>
          )}

          {/* Practicing */}
          {state.phase === 'practicing' && (
            <div className="lesson-panel">
              <div className="lesson-panel__bar" />
              <div className="lesson-panel__inner">
                <div className="level-kicker">
                  <span className="pill active">{tr(uiLanguage, 'Stage', 'Nivel', 'Étape')} {state.activeLevelIdx + 1}</span>
                  <span className="pill">{activeLevel.tag}</span>
                  <button
                    className="gram-btn secondary"
                    onClick={() => dispatch({ type: 'BACK' })}
                    style={{ padding: '0.28rem 0.65rem', minHeight: 28, fontSize: '0.78rem' }}
                  >
                    ← {tr(uiLanguage, 'Exit', 'Salir', 'Quitter')}
                  </button>
                </div>
                <h2 className="lesson-title">{activeLevel.title}</h2>
                <p className="lesson-intro">{activeLevel.intro}</p>

                {activeLevel.type === 'choice' && (
                  <ChoicePractice
                    level={activeLevel as ChoiceLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                    uiLanguage={uiLanguage}
                  />
                )}
                {activeLevel.type === 'dual' && (
                  <DualPractice
                    level={activeLevel as DualLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                    uiLanguage={uiLanguage}
                  />
                )}
                {(activeLevel.type === 'guidedText' || activeLevel.type === 'freeText') && (
                  <TextPractice
                    level={activeLevel as GuidedTextLevel | FreeTextLevel}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                    uiLanguage={uiLanguage}
                  />
                )}
                {activeLevel.type === 'write' && (
                  <WritePractice
                    level={activeLevel as WriteLevel}
                    idx={state.currentIdx}
                    answers={state.answers}
                    dispatch={dispatch}
                    onSubmit={handleSubmit}
                    uiLanguage={uiLanguage}
                  />
                )}
              </div>
            </div>
          )}

          {/* Reviewing */}
          {state.phase === 'reviewing' && (
            <>
              <div className="lesson-panel">
                <div
                  className="lesson-panel__bar"
                  style={{ background: passed ? 'var(--good)' : 'var(--bad)' }}
                />
                <div className="lesson-panel__inner">
                  <div className="result-box">
                    <div
                      className="score-ring"
                      style={{ '--pct': pct } as React.CSSProperties}
                    >
                      <span>{pct}%</span>
                    </div>
                    <div>
                      <h2
                        className="gram-h2"
                        style={{ fontSize: 'clamp(1.3rem, 3vw, 1.9rem)', color: passed ? 'var(--good)' : 'var(--ink)' }}
                      >
                        {passed ? tr(uiLanguage, 'Stage passed!', '¡Nivel superado!', 'Étape réussie !') : tr(uiLanguage, 'Keep improving', 'Puedes mejorar', 'Continuez à progresser')}
                      </h2>
                      <p style={{ color: 'var(--muted)', margin: '0.4rem 0 0.9rem', fontSize: '0.94rem' }}>
                        {state.score} {tr(uiLanguage, 'of', 'de', 'sur')} {state.total} {tr(uiLanguage, 'correct', 'correctas', 'correctes')} · {pct}%
                        {passed && state.activeLevelIdx + 1 < topic.practice.levels.length
                          ? tr(uiLanguage, ' · Next stage unlocked', ' · Siguiente nivel desbloqueado', ' · Étape suivante débloquée')
                          : ''}
                        {!passed ? tr(uiLanguage, ' · You need 65% to continue', ' · Necesitas 65% para avanzar', ' · Il faut 65 % pour continuer') : ''}
                      </p>
                      <div className="gram-actions">
                        <button
                          className="gram-btn secondary"
                          onClick={() => dispatch({ type: 'RETRY' })}
                        >
                          {tr(uiLanguage, 'Try again', 'Reintentar', 'Réessayer')}
                        </button>
                        {state.activeLevelIdx + 1 < topic.practice.levels.length && (
                          <button
                            className="gram-btn accent"
                            disabled={!isUnlocked(state.activeLevelIdx + 1)}
                            onClick={() => dispatch({ type: 'START', levelIdx: state.activeLevelIdx + 1 })}
                          >
                            {tr(uiLanguage, 'Stage', 'Nivel', 'Étape')} {state.activeLevelIdx + 2} →
                          </button>
                        )}
                        {state.activeLevelIdx === topic.practice.levels.length - 1 && passed && (
                          <button
                            className="gram-btn accent"
                            onClick={() => dispatch({ type: 'BACK' })}
                          >
                            {tr(uiLanguage, 'Topic completed! →', '¡Tema completado! →', 'Thème terminé ! →')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <DeferredReview level={activeLevel} answers={state.answers} uiLanguage={uiLanguage} />
            </>
          )}
        </div>

        {/* Study Rail */}
        <aside className="study-rail">
          {/* Progress */}
          <div className="rail-card progress-card">
            <span className="rail-kicker">{tr(uiLanguage, 'Your progress', 'Tu progreso', 'Votre progression')}</span>
            <strong>{topic.shortTitle}</strong>
            <div className="rail-meter">
              <span
                style={{
                  width: mounted
                    ? `${(Math.min(progress.unlocked, topic.practice.levels.length) / topic.practice.levels.length) * 100}%`
                    : '0%',
                }}
              />
            </div>
            <p style={{ marginTop: '0.4rem', fontSize: '0.78rem' }}>
              {mounted
                ? `${Math.min(progress.unlocked, topic.practice.levels.length)} / ${topic.practice.levels.length} ${tr(uiLanguage, 'stages unlocked', 'niveles desbloqueados', 'étapes débloquées')}`
                : `0 / ${topic.practice.levels.length} ${tr(uiLanguage, 'stages', 'niveles', 'étapes')}`}
            </p>
          </div>

          {/* Objective */}
          <div className="rail-card">
            <span className="rail-kicker">{tr(uiLanguage, 'Objective', 'Objetivo', 'Objectif')}</span>
            <strong>{topic.guide.goal}</strong>
            <p style={{ marginTop: '0.35rem' }}>{topic.guide.formula}</p>
          </div>

          {/* Decisions */}
          <div className="rail-card">
            <span className="rail-kicker">{tr(uiLanguage, 'Key decisions', 'Decisiones clave', 'Décisions clés')}</span>
            <ul>
              {topic.guide.decisions.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          {/* Reference table */}
          <div className="rail-card">
            <span className="rail-kicker">{tr(uiLanguage, 'Quick reference', 'Referencia rápida', 'Référence rapide')}</span>
            <div className="grammar-table" style={{ marginTop: '0.5rem' }}>
              {topic.guide.table.map(([col1, col2, col3], i) => (
                <div key={i} className="grammar-table__row">
                  <span>
                    <b style={{ color: 'var(--topic-color)', fontFamily: 'var(--mono)', fontWeight: 900 }}>
                      {col1}
                    </b>
                  </span>
                  <span>{col2}</span>
                  <span>
                    <code style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem' }}>{col3}</code>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Common mistakes */}
          <div className="rail-card">
            <span className="rail-kicker">{tr(uiLanguage, 'Common errors', 'Errores frecuentes', 'Erreurs fréquentes')}</span>
            <ul>
              {topic.guide.mistakes.map((m, i) => <li key={i}>{m}</li>)}
            </ul>
          </div>
        </aside>
      </div>
    </>
  )
}
