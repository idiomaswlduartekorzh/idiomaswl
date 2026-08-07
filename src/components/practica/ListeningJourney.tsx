'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import type { ListeningExercise, ListeningQuestion } from '@/data/practica/ingles-a1-listening'
import { balanceOptions } from '@/data/practica/listening-shuffle'
import ListeningPlayer from './ListeningPlayer'

type Stage = 0 | 1 | 2 | 3 | 4 | 5 | 6

const STAGES = ['Preparar', 'Idea general', 'Detalles', 'Descubrir', 'Escucha guiada', 'Consolidar', 'Cierre']

/** «47 s» para lo corto y «1:03» a partir del minuto, que es como se lee un audio. */
function duracion(seconds: number) {
  return seconds < 60 ? `${seconds} s` : `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
}

function answer(question: ListeningQuestion, choice: number | undefined) {
  return choice !== undefined && question.options[choice]?.correct
}

function speak(text: string, lang: string) {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = lang
  utterance.rate = 0.8
  window.speechSynthesis.speak(utterance)
}

export default function ListeningJourney({
  exercises,
  level = 'A1',
  audioBasePath = '/audio/ingles/a1',
  backHref = '/practica/ingles/a1',
  progressKey,
  seriesTitle,
  seriesDescription,
  languageLabel = 'Inglés',
  skillLabel = 'Listening',
  speechLang = 'en-US',
  audioMode = 'mp3',
}: {
  exercises: ListeningExercise[]
  level?: string
  audioBasePath?: string
  backHref?: string
  progressKey?: string
  seriesTitle?: string
  seriesDescription?: string
  /** Nombre del idioma para migas y encabezado (p. ej. "Italiano"). */
  languageLabel?: string
  /** Etiqueta de la destreza en el idioma meta (p. ej. "Ascolto"). */
  skillLabel?: string
  /** BCP-47 para speechSynthesis; sin esto las palabras se leen con acento inglés. */
  speechLang?: string
  /**
   * De dónde sale el audio del ejercicio.
   * - `mp3`: archivo en `audioBasePath` (audio definitivo con voces nativas).
   * - `navegador`: la voz sintética del sistema lee la transcripción turno a turno.
   *   Provisional, para poder revisar el recorrido completo antes de grabar.
   * - `ninguno`: no hay audio; se muestra el aviso y el recorrido queda bloqueado.
   */
  audioMode?: 'mp3' | 'navegador' | 'ninguno'
}) {
  const [selectedId, setSelectedId] = useState(exercises[0]?.id ?? '')
  const [stage, setStage] = useState<Stage>(0)
  const [played, setPlayed] = useState(false)
  // La línea que suena ahora. La avisa el reproductor solo cuando cambia; el tiempo exacto
  // se queda dentro de ListeningPlayer para no repintar la página cuatro veces por segundo.
  const [activeLine, setActiveLine] = useState(-1)
  const [gistChoice, setGistChoice] = useState<number>()
  const [detailChoices, setDetailChoices] = useState<Record<number, number>>({})
  const [consolidationChoice, setConsolidationChoice] = useState<number>()
  const [showTranslation, setShowTranslation] = useState(false)
  const [completed, setCompleted] = useState<string[]>([])
  // Modo navegador: la línea que se está leyendo ahora, y si el sistema tiene voz del idioma.
  const [ttsLine, setTtsLine] = useState(-1)
  const [voiceMissing, setVoiceMissing] = useState(false)
  const storageKey = progressKey ?? `wl-listening-${level.toLowerCase()}-progress`

  // Las opciones se reparten aquí para que la respuesta correcta no caiga siempre en la
  // misma letra. Se hace sobre la serie entera, no sobre el ejercicio suelto, porque el
  // equilibrio solo se puede garantizar viendo todas las preguntas a la vez.
  // Ver src/data/practica/listening-shuffle.ts.
  const balanced = useMemo(() => balanceOptions(exercises), [exercises])
  const exercise = useMemo(() => balanced.find(item => item.id === selectedId) ?? balanced[0], [balanced, selectedId])
  const detailScore = exercise.details.filter((question, index) => answer(question, detailChoices[index])).length
  const totalQuestions = 1 + exercise.details.length + 1
  const score = (answer(exercise.gist, gistChoice) ? 1 : 0) + detailScore + (answer(exercise.consolidation, consolidationChoice) ? 1 : 0)
  const readyForNext = stage === 0 || played
  const audioAvailable = exercise.audioAvailable !== false
  // Si hay algo que escuchar —mp3 o voz del sistema— el recorrido puede avanzar.
  const canListen = audioMode === 'navegador' ? !voiceMissing : audioAvailable
  const hasTranslations = exercise.transcript.some(line => Boolean(line.es.trim()))

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]')
      if (Array.isArray(saved)) setCompleted(saved)
    } catch { /* Empty progress is safe. */ }
  }, [storageKey])

  // Si el sistema no tiene voz del idioma, speechSynthesis lee el texto con la voz por
  // defecto: el hangul o el cirílico salen como ruido. Más vale avisar que reproducir eso.
  useEffect(() => {
    if (audioMode !== 'navegador' || typeof window === 'undefined' || !window.speechSynthesis) return
    const check = () => {
      const prefix = speechLang.split('-')[0]
      setVoiceMissing(!window.speechSynthesis.getVoices().some(voice => voice.lang.startsWith(prefix)))
    }
    check()
    window.speechSynthesis.onvoiceschanged = check
    return () => { window.speechSynthesis.cancel(); window.speechSynthesis.onvoiceschanged = null }
  }, [audioMode, speechLang])

  /** Lee la transcripción turno a turno y va marcando la línea activa. */
  function speakTranscript() {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()
    setPlayed(true)
    const prefix = speechLang.split('-')[0]
    const voice = window.speechSynthesis.getVoices().find(item => item.lang.startsWith(prefix)) ?? null

    exercise.transcript.forEach((line, index) => {
      const utterance = new SpeechSynthesisUtterance(line.en)
      utterance.lang = speechLang
      // Más lento que el habla normal: es comprensión auditiva de nivel inicial.
      utterance.rate = 0.85
      if (voice) utterance.voice = voice
      utterance.onstart = () => setTtsLine(index)
      if (index === exercise.transcript.length - 1) utterance.onend = () => setTtsLine(-1)
      window.speechSynthesis.speak(utterance)
    })
  }

  function selectExercise(id: string) {
    // La voz del navegador sigue hablando aunque se cambie de ejercicio: se corta a mano.
    window.speechSynthesis?.cancel()
    setSelectedId(id); setStage(0); setPlayed(false); setActiveLine(-1); setGistChoice(undefined); setDetailChoices({}); setConsolidationChoice(undefined); setShowTranslation(false)
    window.setTimeout(() => document.getElementById('listening-player')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0)
  }

  function nextStage() {
    if (stage < 6 && readyForNext) setStage((stage + 1) as Stage)
  }

  function finish() {
    if (!completed.includes(exercise.id)) {
      const next = [...completed, exercise.id]
      setCompleted(next)
      window.localStorage.setItem(storageKey, JSON.stringify(next))
    }
  }

  // Con voz del navegador la línea se sabe exacta, porque cada turno es una locución propia
  // y avisa al empezar. Con mp3 la deduce el reproductor y la comunica al cambiar.
  const activeSentence = audioMode === 'navegador' ? ttsLine : activeLine

  return (
    <div className="listen-shell">
      <aside className="listen-catalog" aria-label={`Ejercicios de escucha ${level}`}>
        <div className="listen-catalog__head"><span>{seriesTitle ?? `Ruta ${level}`}</span><strong>{completed.length}/{exercises.length} completados</strong></div>
        {Array.from({ length: Math.ceil(exercises.length / 5) }, (_, block) => {
          const set = exercises.slice(block * 5, block * 5 + 5)
          return <section key={block} className="listen-block"><h2>Bloque {block + 1}</h2>{set.map(item => <button type="button" key={item.id} className={`listen-card${item.id === exercise.id ? ' is-active' : ''}`} onClick={() => selectExercise(item.id)}><span>{completed.includes(item.id) ? '✓' : item.order}</span><div><b>{item.title}</b><small>{item.audioAvailable === false ? 'Audio en preparación' : `${duracion(item.duration)} · ${item.titleEs}`}</small></div></button>)}</section>
        })}
      </aside>

      <section className="listen-work" id="listening-player">
        <Link href={backHref} className="listen-back">← {languageLabel} {level}</Link>
        <p className="eyebrow"><span className="ink-line" />{skillLabel} · {languageLabel} {level} · Ejercicio {exercise.order} de {exercises.length}</p>
        <h1>🎧 {exercise.title}</h1>
        {seriesDescription && <p className="listen-series">{seriesDescription}</p>}
        <p className="listen-objective">{exercise.objective}</p>
        <div className="listen-tags">{exercise.grammar.map(tag => <span key={tag}>{tag}</span>)}<span>{duracion(exercise.duration)}</span></div>

        <ol className="listen-steps" aria-label="Progreso del ejercicio">{STAGES.map((label, index) => <li key={label} className={index === stage ? 'is-current' : index < stage ? 'is-done' : ''}><span>{index < stage ? '✓' : index + 1}</span><em>{label}</em></li>)}</ol>

        {stage === 0 && <section className="listen-panel"><p className="listen-kicker">1. Preparar el oído</p><h2>Palabras que te ayudarán a escuchar</h2><p>Escúchalas y relaciónalas con su significado. No necesitas memorizar todas.</p><div className="listen-keywords">{exercise.keywords.map(item => <button type="button" key={item.en} onClick={() => speak(item.en, speechLang)}><b>🔊 {item.en}</b><span>{item.es}</span></button>)}</div><button className="listen-primary" onClick={nextStage}>Ya estoy listo para escuchar</button></section>}

        {stage >= 1 && stage <= 5 && (
          audioMode === 'navegador' ? (
            voiceMissing
              ? <div className="listen-empty">🔇 Tu dispositivo no tiene instalada una voz de {languageLabel.toLowerCase()}, así que la lectura provisional sonaría como ruido. El audio con voces nativas llega en la siguiente fase; mientras tanto puedes seguir el guion y las preguntas.</div>
              : <div className="listen-player">
                  <button className="listen-play" type="button" onClick={speakTranscript}>▶ Escuchar {played ? 'de nuevo' : ''}</button>
                  <button className="listen-rewind" type="button" onClick={() => { window.speechSynthesis?.cancel(); setTtsLine(-1) }}>■ Parar</button>
                  <div className="listen-timeline"><span style={{ width: `${ttsLine < 0 ? 0 : Math.min(100, ((ttsLine + 1) / Math.max(exercise.transcript.length, 1)) * 100)}%` }} /></div>
                  <small>Voz provisional del navegador · turno {ttsLine < 0 ? '—' : ttsLine + 1} de {exercise.transcript.length}</small>
                </div>
          ) : audioAvailable ? (
            <ListeningPlayer
              src={`${audioBasePath}/${exercise.audioFile ?? `listening-${String(exercise.order).padStart(2, '0')}`}.mp3`}
              fallbackDuration={exercise.duration}
              lines={exercise.transcript.map(line => ({ chars: line.en.length }))}
              onFirstPlay={() => setPlayed(true)}
              onLineChange={setActiveLine}
              label={exercise.title}
            />
          ) : <div className="listen-empty">🎙️ Este guion ya está preparado. El audio se activará cuando esté grabado.</div>
        )}

        {stage === 1 && <QuestionCard question={exercise.gist} choice={gistChoice} onChoose={setGistChoice} title="2. Primera escucha · idea general" help="Escucha sin leer. Busca el tema, no cada palabra." onContinue={nextStage} disabled={!canListen || !played || gistChoice === undefined} />}
        {stage === 2 && <section className="listen-panel"><p className="listen-kicker">3. Segunda escucha · detalles</p><h2>Ahora busca datos concretos</h2>{exercise.details.length ? exercise.details.map((question, index) => <QuestionCard key={question.prompt} question={question} choice={detailChoices[index]} onChoose={choice => setDetailChoices(current => ({ ...current, [index]: choice }))} compact />) : <p>Las preguntas de detalle para este audio se activarán al cargar su guion alineado.</p>}<button className="listen-primary" onClick={nextStage} disabled={!played || (exercise.details.length > 0 && Object.keys(detailChoices).length < exercise.details.length)}>Revisar lo que escuché</button></section>}
        {stage === 3 && <section className="listen-panel"><p className="listen-kicker">4. Descubrir el texto</p><h2>Conecta el sonido con la escritura</h2>{exercise.transcript.length ? <>{hasTranslations && <button type="button" className="listen-text-toggle" onClick={() => setShowTranslation(value => !value)}>{showTranslation ? 'Ocultar traducción' : 'Ver traducción de apoyo'}</button>}<div className="listen-transcript">{exercise.transcript.map((line, index) => <p key={index} className={index === activeSentence ? 'is-speaking' : ''}>{line.speaker && <em className="listen-speaker">{line.speaker}</em>}<b>{line.en}</b>{line.romanization && <span className="listen-roman">{line.romanization}</span>}{showTranslation && line.es && <span>{line.es}</span>}</p>)}</div></> : <p>Este audio ya tiene vocabulario y reproductor. El texto sincronizado se añade en la siguiente pasada editorial.</p>}<button className="listen-primary" onClick={nextStage}>Escuchar con guía</button></section>}
        {stage === 4 && <section className="listen-panel"><p className="listen-kicker">5. Escucha guiada</p><h2>Sigue los fragmentos mientras escuchas</h2><p>El resaltado actual usa bloques por oración. La versión final añadirá tiempos de palabra extraídos del audio.</p>{exercise.transcript.length ? <div className="listen-transcript listen-transcript--guided">{exercise.transcript.map((line, index) => <p key={index} className={index === activeSentence ? 'is-speaking' : ''}>{line.speaker && <em className="listen-speaker">{line.speaker}</em>}{line.en}{line.romanization && <span className="listen-roman">{line.romanization}</span>}</p>)}</div> : <div className="listen-empty">Repite el audio y concéntrate en las cinco palabras preparadas.</div>}<button className="listen-primary" onClick={nextStage}>Comprobar lo aprendido</button></section>}
        {stage === 5 && <QuestionCard question={exercise.consolidation} choice={consolidationChoice} onChoose={setConsolidationChoice} title="6. Consolidar" help="Responde sin mirar la transcripción." onContinue={nextStage} disabled={consolidationChoice === undefined} />}
        {stage === 6 && <section className="listen-panel listen-close"><p className="listen-kicker">7. Cierre</p><h2>{score / totalQuestions >= 0.7 ? 'Listo para avanzar' : 'Repasa una vez más'}</h2><p>Entendiste <b>{score} de {totalQuestions}</b> comprobaciones. {score / totalQuestions >= 0.7 ? 'La idea general y los datos clave ya están en marcha.' : 'Vuelve al audio, busca una palabra clave y escucha otra vez sin presión.'}</p><div className="listen-review"><b>Para recordar</b>{exercise.keywords.slice(0, 3).map(item => <span key={item.en}>{item.en} · {item.es}</span>)}</div><button className="listen-primary" onClick={finish}>Marcar ejercicio como completado</button>{exercise.order < exercises.length && <button className="listen-secondary" onClick={() => selectExercise(exercises[exercise.order].id)}>Siguiente audio →</button>}</section>}
      </section>
    </div>
  )
}

function QuestionCard({ question, choice, onChoose, title, help, onContinue, disabled, compact = false }: { question: ListeningQuestion; choice?: number; onChoose: (choice: number) => void; title?: string; help?: string; onContinue?: () => void; disabled?: boolean; compact?: boolean }) {
  return <section className={`listen-panel listen-question${compact ? ' is-compact' : ''}`}>{title && <p className="listen-kicker">{title}</p>}{title && <h2>{help}</h2>}<p className="listen-question__prompt">{question.prompt}</p><div className="listen-options">{question.options.map((option, index) => <button type="button" key={option.label} className={choice === index ? `is-selected${option.correct ? ' is-correct' : ' is-wrong'}` : ''} onClick={() => onChoose(index)}><span>{String.fromCharCode(65 + index)}</span>{option.label}</button>)}</div>{choice !== undefined && <p className={`listen-feedback${question.options[choice].correct ? ' is-correct' : ''}`}>{question.options[choice].correct ? '✓ ' : '↺ '}{question.options[choice].feedback}</p>}{onContinue && <button className="listen-primary" onClick={onContinue} disabled={disabled}>Continuar</button>}</section>
}
