'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent, MutableRefObject } from 'react'
import { JAPANESE_SCRIPTS_A1 } from '@/data/japanese-scripts-a1'
import type { JapaneseScriptId, JapaneseScriptItem } from '@/data/japanese-scripts-a1'
import styles from './JapaneseScriptLesson.module.css'

type SectionId = 'learn' | 'chart' | 'strokes' | 'practice' | 'resources'
type PracticeMode = 'write' | 'choose'

const SCRIPT_ORDER: JapaneseScriptId[] = ['hiragana', 'katakana', 'kanji']
const SECTION_LABELS: Array<[SectionId, string, string]> = [
  ['learn', '01', 'Comprender'],
  ['chart', '02', 'Tabla visual'],
  ['strokes', '03', 'Orden de trazos'],
  ['practice', '04', 'Práctica'],
  ['resources', '05', 'Recursos'],
]

function shuffle<T>(values: T[], seed: string): T[] {
  const next = [...values]
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
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(random() * (index + 1))
    ;[next[index], next[swap]] = [next[swap], next[index]]
  }
  return next
}

function normalize(value: string) {
  return value
    .trim()
    .toLocaleLowerCase('es')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ')
}

function playAudio(src: string, audioRef: MutableRefObject<HTMLAudioElement | null>) {
  audioRef.current?.pause()
  const audio = new Audio(src)
  audioRef.current = audio
  void audio.play()
}

function AudioButton({ src, label, audioRef }: { src: string; label: string; audioRef: MutableRefObject<HTMLAudioElement | null> }) {
  return (
    <button className={styles.audioButton} type="button" onClick={() => playAudio(src, audioRef)} aria-label={label}>
      <span aria-hidden="true">▶</span> Escuchar
    </button>
  )
}

function Practice({ scriptId, audioRef }: { scriptId: JapaneseScriptId; audioRef: MutableRefObject<HTMLAudioElement | null> }) {
  const lesson = JAPANESE_SCRIPTS_A1[scriptId]
  const [mode, setMode] = useState<PracticeMode>('write')
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)

  const queue = useMemo(
    () => shuffle(lesson.items, `${scriptId}-${mode}-${round}`).slice(0, 10),
    [lesson.items, mode, round, scriptId],
  )
  const item = queue[index]
  const choices = useMemo(() => {
    if (!item) return []
    const distractors = shuffle(
      lesson.items.filter((candidate) => candidate.glyph !== item.glyph),
      `${scriptId}-${item.code}-${round}-distractors`,
    ).slice(0, 3)
    return shuffle([item, ...distractors], `${scriptId}-${item.code}-${round}-choices`)
  }, [item, lesson.items, round, scriptId])

  const isKanji = scriptId === 'kanji'
  const done = index >= queue.length

  function restart(nextMode = mode) {
    setMode(nextMode)
    setRound((value) => value + 1)
    setIndex(0)
    setScore(0)
    setAnswer('')
    setAnswered(false)
    setWasCorrect(false)
  }

  function submitWritten(event: FormEvent) {
    event.preventDefault()
    if (!item || answered || !answer.trim()) return
    const correct = item.accepts.map(normalize).includes(normalize(answer))
    setAnswered(true)
    setWasCorrect(correct)
    if (correct) setScore((value) => value + 1)
  }

  function choose(candidate: JapaneseScriptItem) {
    if (!item || answered) return
    const correct = candidate.glyph === item.glyph
    setAnswer(candidate.glyph)
    setAnswered(true)
    setWasCorrect(correct)
    if (correct) setScore((value) => value + 1)
  }

  function next() {
    setIndex((value) => value + 1)
    setAnswer('')
    setAnswered(false)
    setWasCorrect(false)
  }

  if (done) {
    const message = score >= 9
      ? 'Excelente reconocimiento. Ya puedes aumentar la velocidad.'
      : score >= 7
        ? 'Buen avance. Haz otra mezcla para afianzar los pares difíciles.'
        : 'Revisa la tabla y repite con otros diez caracteres.'
    return (
      <div className={styles.practiceLayout}>
        <PracticeModes active={mode} scriptId={scriptId} onSelect={restart} />
        <div className={styles.exercise}>
          <div className={styles.prompt}>✓</div>
          <div className={styles.result}>
            <span className={styles.kicker}>Sesión terminada</span>
            <strong>{score}/10</strong>
            <p>{message}</p>
            <button className={styles.primaryButton} type="button" onClick={() => restart()}>Practicar otros 10</button>
          </div>
        </div>
      </div>
    )
  }

  const reversePrompt = isKanji ? item.meaning ?? '' : item.reading
  const expected = isKanji ? item.meaning : item.reading

  return (
    <div className={styles.practiceLayout}>
      <PracticeModes active={mode} scriptId={scriptId} onSelect={restart} />
      <div className={styles.exercise}>
        <div className={styles.prompt} lang="ja">{mode === 'write' ? item.glyph : reversePrompt}</div>
        <div className={styles.exerciseBody}>
          <div className={styles.questionMeta}>
            <b>Pregunta {index + 1} de 10</b>
            <span>Aciertos: {score}</span>
          </div>
          <div className={styles.progressTrack}><span style={{ width: `${(index / 10) * 100}%` }} /></div>
          <AudioButton src={item.audio} label={`Escuchar ${item.glyph}`} audioRef={audioRef} />
          <h3>
            {mode === 'write'
              ? isKanji ? '¿Qué significa este kanji?' : `¿Cómo suena este ${lesson.name.toLocaleLowerCase('es')}?`
              : isKanji ? '¿Qué kanji corresponde?' : `¿Qué ${lesson.name.toLocaleLowerCase('es')} corresponde?`}
          </h3>
          <p>
            {mode === 'write'
              ? isKanji ? 'Escribe su significado principal en español.' : 'Escribe la lectura en rōmaji.'
              : isKanji ? 'Lee el significado y elige el carácter correcto.' : 'Lee el rōmaji y elige la forma correcta.'}
          </p>

          {mode === 'write' ? (
            <form className={styles.answerForm} onSubmit={submitWritten}>
              <label className={styles.srOnly} htmlFor={`${scriptId}-answer`}>{isKanji ? 'Significado en español' : 'Lectura en rōmaji'}</label>
              <input
                id={`${scriptId}-answer`}
                value={answer}
                onChange={(event) => setAnswer(event.target.value)}
                disabled={answered}
                autoComplete="off"
                autoCapitalize="none"
                placeholder={isKanji ? 'Ejemplo: agua' : 'Ejemplo: ka'}
              />
              <button className={styles.primaryButton} type="submit" disabled={answered || !answer.trim()}>Comprobar</button>
            </form>
          ) : (
            <div className={styles.choices}>
              {choices.map((candidate) => {
                const correct = answered && candidate.glyph === item.glyph
                const wrong = answered && answer === candidate.glyph && candidate.glyph !== item.glyph
                return (
                  <button
                    key={candidate.glyph}
                    type="button"
                    lang="ja"
                    disabled={answered}
                    className={`${styles.choice}${correct ? ` ${styles.good}` : ''}${wrong ? ` ${styles.bad}` : ''}`}
                    onClick={() => choose(candidate)}
                  >
                    {candidate.glyph}
                  </button>
                )
              })}
            </div>
          )}

          <div className={`${styles.feedback}${answered ? ` ${wasCorrect ? styles.feedbackGood : styles.feedbackBad}` : ''}`} role="status">
            {!answered && (mode === 'write' ? 'No distingue mayúsculas ni tildes.' : 'Elige una de las cuatro opciones.')}
            {answered && wasCorrect && `Correcto: ${item.glyph} corresponde a ${expected}.`}
            {answered && !wasCorrect && `La respuesta correcta es ${expected}. ${item.glyph} se lee ${item.reading}.`}
          </div>
          {answered && <button className={styles.primaryButton} type="button" onClick={next}>{index === 9 ? 'Ver resultado' : 'Siguiente carácter'}</button>}
        </div>
      </div>
    </div>
  )
}

function PracticeModes({ active, scriptId, onSelect }: { active: PracticeMode; scriptId: JapaneseScriptId; onSelect: (mode: PracticeMode) => void }) {
  const isKanji = scriptId === 'kanji'
  return (
    <div className={styles.practiceModes}>
      <button type="button" className={active === 'write' ? styles.activeMode : ''} onClick={() => onSelect('write')}>
        <b>1. {isKanji ? 'Escribe el significado' : 'Escribe cómo suena'}</b>
        <span>{isKanji ? 'Kanji → español' : `${JAPANESE_SCRIPTS_A1[scriptId].name} → rōmaji`}</span>
      </button>
      <button type="button" className={active === 'choose' ? styles.activeMode : ''} onClick={() => onSelect('choose')}>
        <b>2. {isKanji ? 'Elige el kanji' : 'Elige el carácter'}</b>
        <span>{isKanji ? 'Español → kanji' : `Rōmaji → ${JAPANESE_SCRIPTS_A1[scriptId].name.toLocaleLowerCase('es')}`}</span>
      </button>
    </div>
  )
}

export default function JapaneseScriptLesson({ scriptId }: { scriptId: JapaneseScriptId }) {
  const lesson = JAPANESE_SCRIPTS_A1[scriptId]
  const [section, setSection] = useState<SectionId>('learn')
  const [stroke, setStroke] = useState(lesson.items[0])
  const [replay, setReplay] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function openSection(next: SectionId) {
    setSection(next)
    requestAnimationFrame(() => document.getElementById('japanese-script-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className={styles.lesson}>
      <nav className={styles.scriptSwitch} aria-label="Sistema de escritura japonés">
        {SCRIPT_ORDER.map((id) => (
          <Link key={id} className={id === scriptId ? styles.activeScript : ''} href={`/practica/japones/a1/gramatica/${JAPANESE_SCRIPTS_A1[id].slug}`}>
            {JAPANESE_SCRIPTS_A1[id].name}
          </Link>
        ))}
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Japonés · Escritura · A1</p>
          <h1>{lesson.title}</h1>
          <p>{lesson.lead}</p>
          <div className={styles.heroActions}>
            <button className={styles.primaryButton} type="button" onClick={() => openSection('practice')}>Empezar práctica →</button>
            <button className={styles.secondaryButton} type="button" onClick={() => openSection('learn')}>Ver explicación</button>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <Image src={lesson.image} alt={lesson.imageAlt} fill priority sizes="(max-width: 860px) 100vw, 42vw" />
          <span className={styles.heroMark} lang="ja">{lesson.mark}</span>
          <p>{lesson.caption}</p>
          <div className={styles.heroFacts}>
            <div><b>{lesson.total}</b><span>{lesson.totalLabel}</span></div>
            <div><b>2</b><span>modos de práctica</span></div>
            <div><b>{lesson.duration}</b><span>sesión sugerida</span></div>
          </div>
        </div>
      </section>

      <nav id="japanese-script-nav" className={styles.sectionNav} aria-label="Contenido de la lección">
        {SECTION_LABELS.map(([id, number, label]) => (
          <button key={id} type="button" className={section === id ? styles.activeSection : ''} onClick={() => openSection(id)}>
            <small>{number}</small><b>{id === 'chart' && scriptId === 'kanji' ? 'Kanji esenciales' : label}</b>
          </button>
        ))}
      </nav>

      <div id="japanese-script-content" className={styles.surface}>
        {section === 'learn' && (
          <section aria-labelledby="script-intro-title">
            <header className={styles.sectionHeader}>
              <div><span className={styles.kicker}>{lesson.intro.eyebrow}</span><h2 id="script-intro-title">{lesson.intro.title}</h2></div>
            </header>
            <div className={styles.prose}>
              {lesson.intro.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className={styles.infoGrid}>
              {lesson.intro.cards.map(([label, glyph, copy]) => (
                <article key={label} className={styles.infoCard}>
                  <small>{label}</small><span lang="ja">{glyph}</span><p>{copy}</p>
                </article>
              ))}
            </div>
            <div className={styles.callout}><strong>Clave para hispanohablantes.</strong> {lesson.intro.callout}</div>
            <div className={styles.wordGrid}>
              {lesson.intro.examples.map((example) => (
                <article key={`${example.japanese}-${example.reading}`} className={styles.wordCard}>
                  <span lang="ja">{example.japanese}</span><b>{example.reading}</b><small>{example.meaning}</small>
                  <AudioButton src={example.audio} label={`Escuchar ${example.japanese}`} audioRef={audioRef} />
                </article>
              ))}
            </div>
          </section>
        )}

        {section === 'chart' && (
          <section aria-labelledby="script-chart-title">
            <header className={styles.sectionHeader}>
              <div><span className={styles.kicker}>Referencia visual</span><h2 id="script-chart-title">{lesson.chartTitle}</h2><p>{lesson.chartCopy}</p></div>
              <a className={styles.secondaryButton} href={lesson.resources.chart} download>Descargar PNG</a>
            </header>
            <div className={styles.chartLayout}>
              <div className={styles.chartFrame}><Image src={lesson.chartImage} alt={`Tabla visual completa de ${lesson.name}`} width={1500} height={1900} sizes="(max-width: 860px) 100vw, 72vw" /></div>
              <aside className={styles.tipList} aria-label="Consejos para estudiar la tabla">
                {lesson.tips.map(([title, copy], index) => <div key={title}><b>{index + 1}. {title}</b><span>{copy}</span></div>)}
              </aside>
            </div>
          </section>
        )}

        {section === 'strokes' && (
          <section aria-labelledby="script-strokes-title">
            <header className={styles.sectionHeader}>
              <div><span className={styles.kicker}>Escritura guiada</span><h2 id="script-strokes-title">Orden de trazos de {lesson.total} {scriptId === 'kanji' ? 'kanji' : 'caracteres'}</h2><p>{lesson.strokeCopy}</p></div>
            </header>
            <div className={styles.strokeLayout}>
              <div className={styles.strokeGrid}>
                {lesson.items.map((item) => (
                  <button key={item.code} type="button" lang="ja" className={stroke.code === item.code ? styles.activeStroke : ''} onClick={() => { setStroke(item); setReplay((value) => value + 1) }} aria-label={`${item.glyph}, ${item.reading}${item.meaning ? `, ${item.meaning}` : ''}`}>
                    {item.glyph}
                  </button>
                ))}
              </div>
              <div className={styles.strokePlayer}>
                <Image key={`${stroke.code}-${replay}`} src={`/japanese-a1/strokes/${scriptId}/${stroke.code}.svg?replay=${replay}`} alt={`Orden animado de trazos de ${stroke.glyph}`} width={320} height={320} unoptimized />
                <h3>{stroke.glyph} · {stroke.reading}{stroke.meaning ? ` · ${stroke.meaning}` : ''}</h3>
                <AudioButton src={stroke.audio} label={`Escuchar ${stroke.glyph}`} audioRef={audioRef} />
                <p>Repite el movimiento en papel hasta poder hacerlo sin mirar.</p>
                <button className={styles.secondaryButton} type="button" onClick={() => setReplay((value) => value + 1)}>Repetir animación</button>
              </div>
            </div>
          </section>
        )}

        {section === 'practice' && (
          <section aria-labelledby="script-practice-title">
            <header className={styles.sectionHeader}>
              <div><span className={styles.kicker}>Práctica · sesión de 10</span><h2 id="script-practice-title">{lesson.practiceTitle}</h2><p>{lesson.practiceCopy}</p></div>
            </header>
            <Practice scriptId={scriptId} audioRef={audioRef} />
          </section>
        )}

        {section === 'resources' && (
          <section aria-labelledby="script-resources-title">
            <header className={styles.sectionHeader}>
              <div><span className={styles.kicker}>Biblioteca descargable</span><h2 id="script-resources-title">Recursos para estudiar sin conexión</h2><p>Todos los materiales conservan la identidad visual de Idiomas WeLearn y están listos para imprimir o guardar.</p></div>
            </header>
            <div className={styles.resources}>
              <ResourceCard icon="▦" title="Tabla visual" copy="Referencia completa en alta resolución para pantalla o impresión." href={lesson.resources.chart} label="Descargar PNG" />
              <ResourceCard icon="▤" title="Cuaderno A1" copy={`${scriptId === 'kanji' ? '7' : '10'} páginas con explicación, tabla, trazos y práctica guiada.`} href={lesson.resources.pdf} label="Descargar PDF" />
              <ResourceCard icon="✎" title="Trazos animados" copy={`${lesson.items.length} archivos SVG con orden de trazos y atribución AnimCJK.`} href={lesson.resources.strokes} label="Descargar ZIP" />
              <ResourceCard icon="▣" title="Imagen editorial" copy="Imagen original creada para esta unidad con la identidad de Idiomas WeLearn." href={lesson.resources.image} label="Descargar imagen" />
            </div>
            <div className={styles.faq}>
              {lesson.faqs.map(([question, response]) => <details key={question}><summary>{question}</summary><p>{response}</p></details>)}
            </div>
            <p className={styles.attribution}>Trazos basados en AnimCJK, distribuidos con su licencia y atribución dentro de los descargables.</p>
          </section>
        )}
      </div>
    </div>
  )
}

function ResourceCard({ icon, title, copy, href, label }: { icon: string; title: string; copy: string; href: string; label: string }) {
  return (
    <article className={styles.resourceCard}>
      <span aria-hidden="true">{icon}</span><h3>{title}</h3><p>{copy}</p><a href={href} download>{label} →</a>
    </article>
  )
}
