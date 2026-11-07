'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Pause, Play, RotateCcw, Sparkles, Volume2 } from 'lucide-react'
import type { ImprovisaExercise, ImprovisaLanguage, ImprovisaLevel } from '@/data/practica/improvisa/config'
import { LANGUAGE_NAMES } from '@/data/practica/improvisa/config'
import styles from './improvisa.module.css'

const REVEAL_TIMING = { a1: [8, 16, 24, 32, 40, 48], a2: [9, 19, 29, 39, 49, 59], b1: [10, 22, 34, 46, 58, 70] }
const DURATIONS = { a1: 58, a2: 70, b1: 82 }
type Locale = 'es' | 'en'

type Phase = 'ready' | 'running' | 'paused' | 'review'

const COPY = {
  es: {
    back: 'Volver a Speaking', brand: 'LABORATORIO DE VOZ', topTag: '20 ejercicios',
    eyebrow: 'HABLA SIN GUION', headline: 'Una historia.', headlineAccent: 'Seis sorpresas.',
    artLine1: '¿y', artLine2: 'ahora?', artCaption: 'PRÁCTICA ORAL',
    heroLead: 'Responde una pregunta en inglés. La pista anuncia la categoría; la palabra aparece cuando la línea llega a su marca. Intégrala sin perder el hilo.',
    how1: 'Elige un ejercicio', how2: 'Habla en inglés', how3: 'Revisa tus 6 palabras',
    exercise: 'Ejercicio', of: 'de', locked: 'bloqueado', instructionLanguage: 'Idioma de instrucciones',
    stage: 'PRÁCTICA ORAL', aloud: 'EN VOZ ALTA', startingQuestion: 'PREGUNTA INICIAL',
    followUp: 'PARA AMPLIAR TU RESPUESTA', mission: 'Tu misión',
    ready: 'LISTO PARA EMPEZAR', running: 'EN DIRECTO', paused: 'EN PAUSA', review: 'RONDA TERMINADA',
    firstClue: 'PRIMERA PISTA', nextCategory: 'PRÓXIMA CATEGORÍA', lastWord: 'ÚLTIMA PALABRA',
    firstInstruction: 'Empieza a responder. La primera palabra aparecerá pronto.',
    reviewTitle: '¿Las usaste todas?', reviewInstruction: 'Marca las seis palabras o expresiones que realmente incorporaste.',
    storyStarts: 'Tu respuesta empieza contigo', nextIn: 'La siguiente llega en',
    close: 'Cierra tu respuesta antes de que termine el tiempo.',
    start: 'Empezar ejercicio', pause: 'Pausar', resume: 'Continuar', finish: 'Terminar ahora', retry: 'Repetir ejercicio',
    timeline: 'EL RECORRIDO', revealed: 'pistas reveladas', begins: 'COMIENZA', ends: 'FINAL',
    repertoire: 'TU REPERTORIO', wordsTitle: 'Las seis sorpresas', hidden: 'POR DESCUBRIR',
    wordsHelp: 'Se revelarán mientras hablas.', reviewWords: 'Marca solo lo que dijiste en voz alta.', incorporated: 'La incorporé',
    incorporatedCount: 'incorporadas', pass: '¡Ejercicio superado! Puedes pasar al siguiente.',
    fail: 'Si faltó alguna, repite tu respuesta y prueba otra forma de introducirla.',
    final: '¡Completaste los 20 ejercicios!', nextExercise: 'Siguiente ejercicio',
    footer: 'HABLAR TAMBIÉN SE ENTRENA',
  },
  en: {
    back: 'Back to Speaking', brand: 'SPEAKING LAB', topTag: '20 exercises',
    eyebrow: 'SPEAK WITHOUT A SCRIPT', headline: 'One story.', headlineAccent: 'Six surprises.',
    artLine1: 'what', artLine2: 'next?', artCaption: 'SPEAKING PRACTICE',
    heroLead: 'Answer a question in English. A clue announces the category; the word appears when the line reaches its mark. Work it into your answer without losing your train of thought.',
    how1: 'Choose an exercise', how2: 'Speak in English', how3: 'Review your 6 words',
    exercise: 'Exercise', of: 'of', locked: 'locked', instructionLanguage: 'Instruction language',
    stage: 'SPEAKING PRACTICE', aloud: 'SPEAK OUT LOUD', startingQuestion: 'STARTING QUESTION',
    followUp: 'TO EXPAND YOUR ANSWER', mission: 'Your mission',
    ready: 'READY TO BEGIN', running: 'LIVE', paused: 'PAUSED', review: 'ROUND COMPLETE',
    firstClue: 'FIRST CLUE', nextCategory: 'NEXT CATEGORY', lastWord: 'FINAL WORD',
    firstInstruction: 'Start answering. The first word will appear soon.',
    reviewTitle: 'Did you use them all?', reviewInstruction: 'Check the six words or expressions you actually used.',
    storyStarts: 'Your answer begins with you', nextIn: 'Next word in',
    close: 'Finish your answer before time runs out.',
    start: 'Start exercise', pause: 'Pause', resume: 'Continue', finish: 'Finish now', retry: 'Try again',
    timeline: 'THE JOURNEY', revealed: 'clues revealed', begins: 'START', ends: 'FINISH',
    repertoire: 'YOUR WORDS', wordsTitle: 'Six surprises', hidden: 'TO BE REVEALED',
    wordsHelp: 'They appear as you speak.', reviewWords: 'Check only what you said aloud.', incorporated: 'I used it',
    incorporatedCount: 'used', pass: 'Exercise complete! You can move on.',
    fail: 'If you missed one, try again and find another way to use it.',
    final: 'You completed all 20 exercises!', nextExercise: 'Next exercise',
    footer: 'SPEAKING GETS BETTER WITH PRACTICE',
  },
} as const

function formatTime(seconds: number) {
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`
}

export default function ImprovisaClient({ language, level, exercises }: { language: ImprovisaLanguage; level: ImprovisaLevel; exercises: ImprovisaExercise[] }) {
  const [locale, setLocale] = useState<Locale>('es')
  const REVEAL_AT = REVEAL_TIMING[level]
  const DURATION = DURATIONS[level]
  const SOLO_PATH = `/practica/${language}/${level}/habla${language === 'ingles' || level === 'a2' ? '/solo' : ''}`
  const [exerciseIndex, setExerciseIndex] = useState(0)
  const [unlocked, setUnlocked] = useState(0)
  const [phase, setPhase] = useState<Phase>('ready')
  const [elapsed, setElapsed] = useState(0)
  const [checked, setChecked] = useState<boolean[]>(Array(6).fill(false))
  const startedAt = useRef(0)
  const banked = useRef(0)
  const stageRef = useRef<HTMLElement>(null)
  const tabsRef = useRef<HTMLDivElement>(null)
  const exercise = exercises[exerciseIndex]
  const target = LANGUAGE_NAMES[language]
  const copy = COPY[locale]
  const headline = level === 'a1'
    ? locale === 'es' ? 'Una idea.' : 'One idea.'
    : level === 'a2' ? locale === 'es' ? 'Una situación.' : 'One situation.'
      : copy.headline
  const heroLead = locale === 'es' ? copy.heroLead.replace('en inglés', `en ${target.es.toLowerCase()}`) : copy.heroLead.replace('in English', `in ${target.en}`)
  const howSpeak = locale === 'es' ? `Habla en ${target.es.toLowerCase()}` : `Speak in ${target.en}`
  const progressKey = `improvisa:v2:${language}:${level}`
  const revealed = REVEAL_AT.filter((at) => elapsed >= at).length
  const nextAt = REVEAL_AT[revealed]
  const remaining = Math.max(0, DURATION - elapsed)
  const allChecked = checked.every(Boolean)

  useEffect(() => {
    const saved = Number(window.localStorage.getItem(progressKey))
    if (!Number.isInteger(saved) || saved < 0 || saved >= exercises.length) return
    const timeout = window.setTimeout(() => {
      setUnlocked(saved)
      setExerciseIndex(saved)
      tabsRef.current?.scrollTo({ left: saved * 170, behavior: 'auto' })
    }, 0)
    return () => window.clearTimeout(timeout)
  }, [progressKey, exercises.length])

  useEffect(() => {
    if (phase !== 'running') return
    const interval = window.setInterval(() => {
      const next = Math.min(DURATION, Math.floor(banked.current + (Date.now() - startedAt.current) / 1000))
      setElapsed(next)
      if (next >= DURATION) setPhase('review')
    }, 100)
    return () => window.clearInterval(interval)
  }, [phase, DURATION])

  const reset = useCallback((nextExercise = exerciseIndex) => {
    banked.current = 0
    startedAt.current = 0
    setElapsed(0)
    setChecked(Array(6).fill(false))
    setPhase('ready')
    setExerciseIndex(nextExercise)
  }, [exerciseIndex])

  function start() {
    startedAt.current = Date.now()
    setPhase('running')
  }

  function pause() {
    banked.current += (Date.now() - startedAt.current) / 1000
    setPhase('paused')
  }

  function finish() {
    setElapsed(DURATION)
    setPhase('review')
  }

  function advance() {
    if (!allChecked || exerciseIndex === exercises.length - 1) return
    const nextUnlocked = Math.max(unlocked, exerciseIndex + 1)
    setUnlocked(nextUnlocked)
    window.localStorage.setItem(progressKey, String(nextUnlocked))
    reset(exerciseIndex + 1)
    window.setTimeout(() => {
      tabsRef.current?.scrollTo({ left: nextUnlocked * 170, behavior: 'smooth' })
      stageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.topbar}>
          <Link href={SOLO_PATH} className={styles.back}><ArrowLeft size={17} /> {copy.back}</Link>
          <span className={styles.brand}>WELEARN <span>/</span> {copy.brand}</span>
          <span className={styles.topTag}>{target.es} {level.toUpperCase()} · {copy.topTag}</span>
        </header>

        <section className={styles.hero} aria-labelledby="improvisa-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.sparkle}><Sparkles size={15} /></span> {copy.eyebrow}</p>
            <h1 id="improvisa-title">{headline}<br /><em>{copy.headlineAccent}</em></h1>
            <p className={styles.heroLead}>{heroLead}</p>
            <div className={styles.how}>
              <span><b>01</b> {copy.how1}</span><i />
              <span><b>02</b> {howSpeak}</span><i />
              <span><b>03</b> {copy.how3}</span>
            </div>
          </div>
          <div className={styles.heroArt} aria-hidden="true">
            <span className={styles.artOrbit} /><span className={styles.artQuote}>“</span>
            <span className={styles.artWord}>{copy.artLine1}<br />{copy.artLine2}</span><span className={styles.artDot} />
            <span className={styles.artCaption}>{target.es} {level.toUpperCase()} · {copy.artCaption}</span>
          </div>
        </section>

        <div className={styles.controlsRow}>
          <div className={styles.exercisePicker}>
          <p className={styles.exerciseCount}>{copy.exercise} {exerciseIndex + 1} {copy.of} {exercises.length}</p>
          <div ref={tabsRef} className={styles.levels} aria-label={copy.exercise}>
            {exercises.map((item, index) => (
              <button key={`${index}-${item.question}`} type="button"
                disabled={index > unlocked || phase === 'running' || phase === 'paused'}
                aria-current={index === exerciseIndex ? 'step' : undefined}
                className={`${styles.levelTab} ${index === exerciseIndex ? styles.levelTabActive : ''}`}
                onClick={() => reset(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span> {item.title[locale === 'es' ? 'es' : 'target']}
                {index > unlocked ? ` · ${copy.locked}` : ''}
              </button>
            ))}
          </div>
          </div>
          <div className={styles.language} role="group" aria-label={copy.instructionLanguage}>
            <button type="button" className={locale === 'es' ? styles.languageActive : ''}
              onClick={() => setLocale('es')} aria-pressed={locale === 'es'}>Español</button>
            <button type="button" className={locale === 'en' ? styles.languageActive : ''}
              onClick={() => setLocale('en')} aria-pressed={locale === 'en'}>English</button>
          </div>
        </div>

        <section ref={stageRef} className={styles.stage} aria-label={`${copy.exercise} ${exerciseIndex + 1}`}>
          <div className={styles.stageTop}>
            <span className={styles.stageKicker}>{target.es.toUpperCase()} {level.toUpperCase()} <span>·</span> {copy.exercise.toUpperCase()} {String(exerciseIndex + 1).padStart(2, '0')}</span>
            <span className={styles.stagePill}><Volume2 size={14} /> {copy.aloud}</span>
          </div>
          <div className={styles.stageGrid}>
            <div className={styles.storyBrief}>
              <p className={styles.smallLabel}>{copy.startingQuestion}</p>
              <h2 lang={target.code}>{exercise.question}</h2>
              <p className={styles.followUpLabel}>{copy.followUp}</p>
              <p lang={target.code}>{exercise.followUp}</p>
              <div className={styles.challenge}><span>✦</span><div><strong>{copy.mission}</strong><p>{exercise.focus[locale === 'es' ? 'es' : 'target']}</p></div></div>
            </div>
            <div className={styles.livePanel}>
              <div className={styles.timerHead}>
                <span>{copy[phase]}</span><strong aria-live="off">{formatTime(remaining)}</strong>
              </div>
              <div className={styles.promptCard}>
                {phase === 'ready' ? <>
                  <span className={styles.promptOverline}>{copy.firstClue}</span>
                  <span className={styles.promptHint}>{exercise.cues[0].category[locale === 'es' ? 'es' : 'target']}</span>
                  <p>{copy.firstInstruction}</p>
                </> : phase === 'review' ? <>
                  <span className={styles.promptOverline}>{copy.review}</span>
                  <span className={styles.promptHint}>{copy.reviewTitle}</span>
                  <p>{copy.reviewInstruction}</p>
                </> : <>
                  <span className={styles.promptOverline}>{revealed < 6 ? copy.nextCategory : copy.lastWord}</span>
                  <span className={styles.promptHint}>{exercise.cues[revealed < 6 ? revealed : 5].category[locale === 'es' ? 'es' : 'target']}</span>
                  <div className={styles.currentWord} aria-live="assertive" lang={revealed > 0 ? target.code : undefined}>
                    {revealed > 0 ? exercise.cues[revealed - 1].word : <span>{copy.storyStarts}</span>}
                  </div>
                  <p>{revealed < 6 ? `${copy.nextIn} ${Math.max(0, nextAt - elapsed)} s` : copy.close}</p>
                </>}
              </div>
              <div className={styles.actionRow}>
                {phase === 'ready' && <button type="button" className={styles.primaryButton} onClick={start}><Play size={17} fill="currentColor" /> {copy.start}</button>}
                {phase === 'running' && <button type="button" className={styles.primaryButton} onClick={pause}><Pause size={17} fill="currentColor" /> {copy.pause}</button>}
                {phase === 'paused' && <button type="button" className={styles.primaryButton} onClick={start}><Play size={17} fill="currentColor" /> {copy.resume}</button>}
                {phase === 'review' && <button type="button" className={styles.primaryButton} onClick={() => reset()}><RotateCcw size={17} /> {copy.retry}</button>}
                {(phase === 'running' || phase === 'paused') && revealed === 6 && <button type="button" className={styles.textButton} onClick={finish}>{copy.finish}</button>}
              </div>
            </div>
          </div>
          <div className={styles.timelineSection}>
            <div className={styles.timelineHeading}><span>{copy.timeline}</span><span>{revealed} / 6 {copy.revealed}</span></div>
            <div className={styles.timeline} role="img" aria-label={`${elapsed} / ${DURATION} s · ${revealed} / 6`}>
              <div className={styles.timelineFill} style={{ width: `${(elapsed / DURATION) * 100}%` }} />
              {REVEAL_AT.map((at, index) => <span key={at} className={`${styles.marker} ${elapsed >= at ? styles.markerDone : ''}`} style={{ left: `${(at / DURATION) * 100}%` }}><span>{index + 1}</span></span>)}
            </div>
            <div className={styles.timelineEnds}><span>{copy.begins}</span><span>{copy.ends}</span></div>
          </div>
        </section>

        <section className={styles.wordsSection} aria-labelledby="words-title">
          <div className={styles.wordsTitle}><div><p className={styles.smallLabel}>{copy.repertoire}</p><h2 id="words-title">{copy.wordsTitle}</h2></div><p>{phase === 'review' ? copy.reviewWords : copy.wordsHelp}</p></div>
          <div className={styles.wordGrid}>
            {exercise.cues.map((cue, index) => {
              const visible = revealed > index || phase === 'review'
              return <div key={`${exerciseIndex}-${index}`} className={`${styles.wordTile} ${visible ? styles.wordTileVisible : ''} ${phase === 'review' && checked[index] ? styles.wordTileChecked : ''}`}>
                <span className={styles.tileIndex}>{String(index + 1).padStart(2, '0')}</span>
                <span className={styles.tileCategory}>{visible ? cue.category[locale === 'es' ? 'es' : 'target'] : copy.hidden}</span>
                <strong lang={target.code}>{visible ? cue.word : '······'}</strong>
                {visible && locale === 'es' && cue.gloss ? <small className={styles.wordGloss}>{cue.gloss}</small> : null}
                {phase === 'review' && <label className={styles.checkLabel}>
                  <input type="checkbox" aria-label={`${copy.incorporated}: ${cue.word}`} checked={checked[index]} onChange={() => setChecked((prev) => prev.map((value, i) => i === index ? !value : value))} />
                  <span><Check size={15} /></span> {copy.incorporated}
                </label>}
              </div>
            })}
          </div>
          {phase === 'review' && <div className={styles.resultBar}>
            <div><strong>{checked.filter(Boolean).length} / 6 {copy.incorporatedCount}</strong><p>{allChecked ? exerciseIndex === exercises.length - 1 ? copy.final : copy.pass : copy.fail}</p></div>
            {allChecked && exerciseIndex < exercises.length - 1 && <button type="button" className={styles.nextButton} onClick={advance}>{copy.nextExercise} <ArrowRight size={17} /></button>}
          </div>}
        </section>
        <footer className={styles.footer}>WELEARN <span>·</span> {copy.footer}</footer>
      </div>
    </div>
  )
}
