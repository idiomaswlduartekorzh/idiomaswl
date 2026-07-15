'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import type { ListeningExercise, ListeningQuestion } from '@/data/practica/ingles-a1-listening'

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6

const STAGES = ['Preparar', 'Idea general', 'Detalles', 'Descubrir', 'Escucha guiada', 'Consolidar', 'Cierre']
const STORAGE_KEY = 'wl-listening-a1-progress'

function answer(question: ListeningQuestion, choice: number | undefined) {
  return choice !== undefined && question.options[choice]?.correct
}

function speak(text: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

export default function ListeningJourney({ exercises }: { exercises: ListeningExercise[] }) {
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? '')
  const [stage, setStage] = useState<Stage>(0)
  const [played, setPlayed] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [gistChoice, setGistChoice] = useState<number>()
  const [detailChoices, setDetailChoices] = useState<Record<number, number>>({})
  const [consolidationChoice, setConsolidationChoice] = useState<number>()
  const [showTranslation, setShowTranslation] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  const audioRef = useRef<HTMLAudioElement>(null)

  const exercise = useMemo(() => exercises.find(item => item.id === selectedId) ?? exercises[0], [exercises, selectedId])
  const detailScore = exercise.details.filter((question, index) => answer(question, detailChoices[index])).length
  const totalQuestions = 1 + exercise.details.length + 1
  const score = (answer(exercise.gist, gistChoice) ? 1 : 0) + detailScore + (answer(exercise.consolidation, consolidationChoice) ? 1 : 0)
  const readyForNext = stage === 0 || played

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(saved)) setCompleted(saved)
    } catch { /* Empty progress is safe. */ }
  }, [])

  function selectExercise(id: string) {
    setSelectedId(id); setStage(0); setPlayed(false); setCurrentTime(0); setGistChoice(undefined); setDetailChoices({}); setConsolidationChoice(undefined); setShowTranslation(false)
    window.setTimeout(() => document.getElementById('listening-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function nextStage() {
    if (stage < 6 && readyForNext) setStage((stage + 1) as Stage)
  }

  function finish() {
    if (!completed.includes(exercise.id)) {
      const next = [...completed, exercise.id]
      setCompleted(next)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }
  }

  const activeSentence = exercise.transcript.length
    ? Math.min(exercise.transcript.length - 1, Math.floor((currentTime / Math.max(exercise.duration, 1)) * exercise.transcript.length))
    : -1

  return (
    <div className="listen-shell">
      <aside className="listen-catalog" aria-label="Ejercicios de escucha A1">
        <div className="listen-catalog__head"><span>Ruta A1</span><strong>{completed.length}/20 completados</strong></div>
        {[0, 1, 2, 3].map(block => {
          const set = exercises.slice(block * 5, block * 5 + 5)
          return <section key={block} className="listen-block"><h2>Bloque {block + 1}</h2>{set.map(item => <button type="button" key={item.id} className={`listen-card${item.id === exercise.id ? ' is-active' : ''}`} onClick={() => selectExercise(item.id)}><span>{completed.includes(item.id) ? '✓' : item.order}</span><div><b>{item.title}</b><small>{item.duration}s · {item.titleEs}</small></div></button>)}</section>
        })}
      </aside>

      <section className="listen-work" id="listening-player">
        <Link href="/practica/ingles/a1" className="listen-back">← Inglés A1</Link>
        <p className="eyebrow"><span className="ink-line" />Listening · Inglés A1 · Ejercicio {exercise.order} de 20</p>
        <h1>🎧 {exercise.title}</h1>
        <p className="listen-objective">{exercise.objective}</p>
        <div className="listen-tags">{exercise.grammar.map(tag => <span key={tag}>{tag}</span>)}<span>~{exercise.duration} segundos</span></div>

        <ol className="listen-steps" aria-label="Progreso del ejercicio">{STAGES.map((label, index) => <li key={label} className={index === stage ? 'is-current' : index < stage ? 'is-done' : ''}><span>{index < stage ? '✓' : index + 1}</span><em>{label}</em></li>)}</ol>

        {stage === 0 && <section className="listen-panel"><p className="listen-kicker">1. Preparar el oído</p><h2>Palabras que te ayudarán a escuchar</h2><p>Escúchalas y relaciónalas con su significado. No necesitas memorizar todas.</p><div className="listen-keywords">{exercise.keywords.map(item => <button type="button" key={item.en} onClick={() => speak(item.en)}><b>🔊 {item.en}</b><span>{item.es}</span></button>)}</div><button className="listen-primary" onClick={nextStage}>Ya estoy listo para escuchar</button></section>}

        {stage >= 1 && stage <= 5 && <div className="listen-player"><audio ref={audioRef} src={`/audio/ingles/a1/listening-${String(exercise.order).padStart(2, '0')}.mp3`} onPlay={() => setPlayed(true)} onTimeUpdate={event => setCurrentTime(event.currentTarget.currentTime)} /><button className="listen-play" type="button" onClick={() => { const audio = audioRef.current; if (!audio) return; audio.paused ? audio.play() : audio.pause() }}>▶ Escuchar {played ? 'de nuevo' : ''}</button><button className="listen-rewind" type="button" onClick={() => { if (audioRef.current) audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5) }}>↺ 5 s</button><div className="listen-timeline"><span style={{ width: `${Math.min(100, (currentTime / exercise.duration) * 100)}%` }} /></div><small>{Math.floor(currentTime)} s / ~{exercise.duration} s</small></div>}

        {stage === 1 && <QuestionCard question={exercise.gist} choice={gistChoice} onChoose={setGistChoice} title="2. Primera escucha · idea general" help="Escucha sin leer. Busca el tema, no cada palabra." onContinue={nextStage} disabled={!played || gistChoice === undefined} />}
        {stage === 2 && <section className="listen-panel"><p className="listen-kicker">3. Segunda escucha · detalles</p><h2>Ahora busca datos concretos</h2>{exercise.details.length ? exercise.details.map((question, index) => <QuestionCard key={question.prompt} question={question} choice={detailChoices[index]} onChoose={choice => setDetailChoices(current => ({ ...current, [index]: choice }))} compact />) : <p>Las preguntas de detalle para este audio se activarán al cargar su guion alineado.</p>}<button className="listen-primary" onClick={nextStage} disabled={!played || (exercise.details.length > 0 && Object.keys(detailChoices).length < exercise.details.length)}>Revisar lo que escuché</button></section>}
        {stage === 3 && <section className="listen-panel"><p className="listen-kicker">4. Descubrir el texto</p><h2>Conecta el sonido con la escritura</h2>{exercise.transcript.length ? <><button type="button" className="listen-text-toggle" onClick={() => setShowTranslation(value => !value)}>{showTranslation ? 'Ocultar traducción' : 'Ver traducción de apoyo'}</button><div className="listen-transcript">{exercise.transcript.map((line, index) => <p key={line.en} className={index === activeSentence ? 'is-speaking' : ''}><b>{line.en}</b>{showTranslation && <span>{line.es}</span>}</p>)}</div></> : <p>Este audio ya tiene vocabulario y reproductor. El texto sincronizado se añade en la siguiente pasada editorial.</p>}<button className="listen-primary" onClick={nextStage}>Escuchar con guía</button></section>}
        {stage === 4 && <section className="listen-panel"><p className="listen-kicker">5. Escucha guiada</p><h2>Sigue los fragmentos mientras escuchas</h2><p>El resaltado actual usa bloques por oración. La versión final añadirá tiempos de palabra extraídos del audio.</p>{exercise.transcript.length ? <div className="listen-transcript listen-transcript--guided">{exercise.transcript.map((line, index) => <p key={line.en} className={index === activeSentence ? 'is-speaking' : ''}>{line.en}</p>)}</div> : <div className="listen-empty">Repite el audio y concéntrate en las cinco palabras preparadas.</div>}<button className="listen-primary" onClick={nextStage}>Comprobar lo aprendido</button></section>}
        {stage === 5 && <QuestionCard question={exercise.consolidation} choice={consolidationChoice} onChoose={setConsolidationChoice} title="6. Consolidar" help="Responde sin mirar la transcripción." onContinue={nextStage} disabled={consolidationChoice === undefined} />}
        {stage === 6 && <section className="listen-panel listen-close"><p className="listen-kicker">7. Cierre</p><h2>{score / totalQuestions >= 0.7 ? 'Listo para avanzar' : 'Repasa una vez más'}</h2><p>Entendiste <b>{score} de {totalQuestions}</b> comprobaciones. {score / totalQuestions >= 0.7 ? 'La idea general y los datos clave ya están en marcha.' : 'Vuelve al audio, busca una palabra clave y escucha otra vez sin presión.'}</p><div className="listen-review"><b>Para recordar</b>{exercise.keywords.slice(0, 3).map(item => <span key={item.en}>{item.en} · {item.es}</span>)}</div><button className="listen-primary" onClick={finish}>Marcar ejercicio como completado</button>{exercise.order < exercises.length && <button className="listen-secondary" onClick={() => selectExercise(exercises[exercise.order].id)}>Siguiente audio →</button>}</section>}
      </section>
    </div>
  )
}

function QuestionCard({ question, choice, onChoose, title, help, onContinue, disabled, compact = false }: { question: ListeningQuestion; choice?: number; onChoose: (choice: number) => void; title?: string; help?: string; onContinue?: () => void; disabled?: boolean; compact?: boolean }) {
  return <section className={`listen-panel listen-question${compact ? ' is-compact' : ''}`}>{title && <p className="listen-kicker">{title}</p>}{title && <h2>{help}</h2>}<p className="listen-question__prompt">{question.prompt}</p><div className="listen-options">{question.options.map((option, index) => <button type="button" key={option.label} className={choice === index ? `is-selected${option.correct ? ' is-correct' : ' is-wrong'}` : ''} onClick={() => onChoose(index)}><span>{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>{choice !== undefined && <p className={`listen-feedback${question.options[choice].correct ? ' is-correct' : ''}`}>{question.options[choice].correct ? '✓ ' : '↺ '}{question.options[choice].feedback}</p>}{onContinue && <button className="listen-primary" onClick={onContinue} disabled={disabled}>Continuar</button>}</section>
}
