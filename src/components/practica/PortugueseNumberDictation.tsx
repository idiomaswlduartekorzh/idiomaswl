'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PORTUGUESE_NUMBER_DICTATION_SETS } from '@/data/practica/portuguese-number-dictation'
import styles from './PortugueseNumberDictation.module.css'

type FieldResult = 'idle' | 'correct' | 'wrong'
type StoredProgress = { completed: boolean[]; scores: number[]; unlockedSet: number }

const STORAGE_KEY = 'welearn:portugues:a1:numeros-ditado:v5'
const setCount = PORTUGUESE_NUMBER_DICTATION_SETS.length
const emptyCompleted = () => PORTUGUESE_NUMBER_DICTATION_SETS.map(() => false)
const emptyScores = () => PORTUGUESE_NUMBER_DICTATION_SETS.map(() => 0)
const emptyAnswers = () => Array.from({ length: 20 }, () => '')
const emptyResults = () => Array.from({ length: 20 }, (): FieldResult => 'idle')

function parseNumericAnswer(value: string): number | null {
  const digits = value.replace(/[^0-9]/g, '')
  return digits ? Number(digits) : null
}

function normalizeWrittenAnswer(value: string): string {
  return value.normalize('NFC').toLocaleLowerCase('pt-BR').replace(/[.,;:!?]/g, '').replace(/\s+/g, ' ').trim()
}

function safeProgress(value: unknown): StoredProgress | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as Partial<StoredProgress>
  if (!Array.isArray(candidate.completed) || !Array.isArray(candidate.scores) || typeof candidate.unlockedSet !== 'number') return null
  if (candidate.completed.length !== setCount || candidate.scores.length !== setCount) return null
  return {
    completed: candidate.completed.map(Boolean),
    scores: candidate.scores.map((score) => Math.max(0, Math.min(20, Number(score) || 0))),
    unlockedSet: Math.max(0, Math.min(setCount - 1, candidate.unlockedSet)),
  }
}

export default function PortugueseNumberDictation() {
  const [completed, setCompleted] = useState<boolean[]>(emptyCompleted)
  const [scores, setScores] = useState<number[]>(emptyScores)
  const [unlockedSet, setUnlockedSet] = useState(0)
  const [activeSet, setActiveSet] = useState(0)
  const [answers, setAnswers] = useState<string[]>(emptyAnswers)
  const [results, setResults] = useState<FieldResult[]>(emptyResults)
  const [hasChecked, setHasChecked] = useState(false)
  const [audioError, setAudioError] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const selectedSet = PORTUGUESE_NUMBER_DICTATION_SETS[activeSet]
  const currentScore = results.filter((result) => result === 'correct').length
  const wrongCount = results.filter((result) => result === 'wrong').length
  const filledCount = answers.filter((answer) => answer.trim()).length
  const allFilled = filledCount === selectedSet.items.length
  const completedCount = completed.filter(Boolean).length

  useEffect(() => {
    try {
      const stored = safeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'))
      if (!stored) return
      setCompleted(stored.completed)
      setScores(stored.scores)
      setUnlockedSet(stored.unlockedSet)
      const firstOpen = stored.completed.findIndex((value) => !value)
      setActiveSet(firstOpen === -1 ? setCount - 1 : Math.min(firstOpen, stored.unlockedSet))
    } catch {
      // A damaged local value should never block the exercise.
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    return () => audio?.pause()
  }, [])

  function persist(nextCompleted: boolean[], nextScores: number[], nextUnlocked: number) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: nextCompleted, scores: nextScores, unlockedSet: nextUnlocked }))
  }

  function resetWorksheet() {
    audioRef.current?.pause()
    setAnswers(emptyAnswers())
    setResults(emptyResults())
    setHasChecked(false)
    setAudioError(false)
    setPlayCount(0)
    setIsPlaying(false)
  }

  function selectSet(index: number) {
    if (index > unlockedSet) return
    setActiveSet(index)
    resetWorksheet()
  }

  async function toggleDictation() {
    if (!audioRef.current) return
    if (!audioRef.current.paused) {
      audioRef.current.pause()
      return
    }
    setAudioError(false)
    try {
      if (audioRef.current.ended) audioRef.current.currentTime = 0
      await audioRef.current.play()
      setPlayCount((count) => count + 1)
    } catch {
      setAudioError(true)
    }
  }

  async function restartDictation() {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    setAudioError(false)
    try {
      await audioRef.current.play()
      setPlayCount((count) => count + 1)
    } catch {
      setAudioError(true)
    }
  }

  function updateAnswer(index: number, value: string) {
    setAnswers((current) => current.map((answer, answerIndex) => answerIndex === index ? value : answer))
    if (results[index] !== 'idle') {
      setResults((current) => current.map((result, resultIndex) => resultIndex === index ? 'idle' : result))
    }
  }

  function checkWorksheet() {
    const nextResults = selectedSet.items.map((item, index): FieldResult => {
      const correct = selectedSet.answerMode === 'digits'
        ? parseNumericAnswer(answers[index]) === item.value
        : normalizeWrittenAnswer(answers[index]) === normalizeWrittenAnswer(item.spoken)
      return correct ? 'correct' : 'wrong'
    })
    const nextScore = nextResults.filter((result) => result === 'correct').length
    const passed = nextScore === selectedSet.items.length
    const nextCompleted = completed.map((value, index) => index === activeSet ? passed : value)
    const nextScores = scores.map((value, index) => index === activeSet ? Math.max(value, nextScore) : value)
    const nextUnlocked = passed ? Math.min(setCount - 1, Math.max(unlockedSet, activeSet + 1)) : unlockedSet

    setResults(nextResults)
    setHasChecked(true)
    setScores(nextScores)
    if (passed) {
      setCompleted(nextCompleted)
      setUnlockedSet(nextUnlocked)
    }
    persist(nextCompleted, nextScores, nextUnlocked)
  }

  function repeatCompletedSet() {
    const nextCompleted = completed.map((value, index) => index === activeSet ? false : value)
    const nextScores = scores.map((value, index) => index === activeSet ? 0 : value)
    setCompleted(nextCompleted)
    setScores(nextScores)
    persist(nextCompleted, nextScores, unlockedSet)
    resetWorksheet()
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <nav className={styles.breadcrumb} aria-label="Navegação">
          <Link href="/practica">Prática</Link><span>/</span>
          <Link href="/practica/portugues">Português</Link><span>/</span>
          <Link href="/practica/portugues/a1/gramatica">Gramática A1</Link><span>/</span>
          <strong>Números ditados</strong>
        </nav>

        <header className={styles.hero}>
          <div>
            <p className={styles.eyebrow}>Laboratório auditivo · Português brasileiro · A1</p>
            <h1>Um áudio. Vinte números. Uma folha completa.</h1>
            <p className={styles.lead}>Ouça o ditado inteiro e preencha as 20 respostas ao mesmo tempo. Em cada faixa você responde primeiro em cifras e depois escreve os mesmos números por extenso.</p>
            <div className={styles.heroMetrics}><span><b>3</b> áudios</span><span><b>6</b> fichas</span><span><b>{completedCount}/6</b> concluídas</span></div>
          </div>
          <aside className={styles.heroCard}>
            <span>Dinâmica real de ditado</span><strong>escute tudo, responda tudo, confira no final</strong><p>As 20 caixas ficam visíveis durante a reprodução. A verificação destaca apenas o que precisa ser corrigido.</p>
          </aside>
        </header>

        <section className={styles.route} aria-labelledby="number-route-title">
          <div className={styles.sectionHeading}>
            <div><span>Seu percurso</span><h2 id="number-route-title">Três faixas, duas fichas em cada uma</h2></div>
            <p>Complete a ficha em cifras para liberar a ortografia; complete ambas para avançar.</p>
          </div>
          <div className={styles.setGrid}>
            {PORTUGUESE_NUMBER_DICTATION_SETS.map((set, index) => {
              const locked = index > unlockedSet
              return (
                <button type="button" key={set.id} className={`${styles.setCard} ${index === activeSet ? styles.activeSet : ''}`} onClick={() => selectSet(index)} disabled={locked} aria-current={index === activeSet ? 'step' : undefined}>
                  <span>{locked ? 'Bloqueada' : completed[index] ? 'Concluída' : `Ficha ${set.order}`}</span><strong>{set.range}</strong><em>{set.modeLabel}</em><small>{scores[index]}/20</small>
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.trainer} aria-live="polite">
          <div className={styles.trainerTop}>
            <div><span>Ficha {selectedSet.order} · {selectedSet.range}</span><h2>{selectedSet.title}</h2><p>{selectedSet.description}</p></div>
            <div className={styles.counter}>{scores[activeSet]}/20</div>
          </div>

          {completed[activeSet] ? (
            <div className={styles.completedPanel}>
              <span>✓</span><h3>Ficha concluída</h3><p>Você identificou e escreveu corretamente os 20 números.</p>
              <div>
                {activeSet < setCount - 1 ? <button type="button" onClick={() => selectSet(activeSet + 1)}>Ir para a próxima ficha</button> : <strong>Rota completa: seis fichas concluídas.</strong>}
                <button type="button" className={styles.ghostButton} onClick={repeatCompletedSet}>Refazer esta ficha</button>
              </div>
            </div>
          ) : (
            <div className={styles.worksheet}>
              <audio ref={audioRef} src={selectedSet.audioUrl} preload="none" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => setIsPlaying(false)} onError={() => setAudioError(true)} />
              <div className={styles.audioPanel}>
                <button type="button" className={styles.listenButton} onClick={toggleDictation}>
                  <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span><strong>{isPlaying ? 'Pausar o ditado' : playCount ? 'Continuar o ditado' : 'Reproduzir o ditado completo'}</strong><small>Um áudio com os 20 números · mesma ordem da ficha</small>
                </button>
                <div className={styles.audioGuidance}><b>Antes de começar</b><p>Tenha as 20 caixas à vista. Você pode pausar ou repetir o áudio quando precisar.</p><button type="button" onClick={restartDictation}>↺ Reiniciar do começo</button></div>
              </div>
              {audioError ? <p className={styles.audioError}>O áudio completo desta faixa ainda não está disponível. A ficha está pronta e aguarda a geração final.</p> : null}

              <div className={styles.modeBanner} data-mode={selectedSet.answerMode}>
                <span>{selectedSet.answerMode === 'digits' ? '01' : 'Aa'}</span>
                <div><b>{selectedSet.answerMode === 'digits' ? 'Responda em cifras' : 'Responda por extenso'}</b><p>{selectedSet.answerMode === 'digits' ? 'Exemplo: 48' : 'Exemplo: quarenta e oito'}</p></div>
              </div>

              <div className={styles.answerGrid} data-mode={selectedSet.answerMode} aria-label="Folha de respostas do ditado">
                {selectedSet.items.map((item, index) => (
                  <label className={styles.answerCard} data-result={results[index]} key={`${selectedSet.id}-${index}`}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <input
                      type="text"
                      lang="pt-BR"
                      inputMode={selectedSet.answerMode === 'digits' ? 'numeric' : 'text'}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      aria-label={`Resposta ${index + 1}`}
                      placeholder={selectedSet.answerMode === 'digits' ? 'Número' : 'Por extenso'}
                      value={answers[index]}
                      onChange={(event) => updateAnswer(index, event.target.value)}
                      readOnly={results[index] === 'correct'}
                    />
                    {results[index] === 'correct' ? <b aria-label="Resposta correta">✓</b> : results[index] === 'wrong' ? <b aria-label="Resposta incorreta">!</b> : null}
                  </label>
                ))}
              </div>

              <div className={styles.verificationBar}>
                <div><span>Preenchidas</span><strong>{filledCount}/20</strong></div>
                <button type="button" className={styles.checkButton} onClick={checkWorksheet} disabled={!allFilled}>Verificar as 20 respostas</button>
              </div>

              {hasChecked && wrongCount > 0 ? <div className={styles.wrongFeedback}><b>{currentScore}/20 corretas.</b><p>As respostas certas ficaram protegidas. Corrija somente as {wrongCount} caixas marcadas e verifique novamente.</p></div> : null}
              <footer className={styles.exerciseFooter}><span>Reproduções do áudio: <b>{playCount}</b></span><span>{selectedSet.answerMode === 'digits' ? 'Reconhecimento numérico' : 'Ortografia em português'} · correção conjunta</span></footer>
            </div>
          )}
        </section>

        <section className={styles.teacherNote}>
          <div><span>Para aula e estudo autônomo</span><h2>Uma ficha que funciona como um ditado real</h2></div>
          <p>O aluno administra o áudio e vinte respostas simultâneas. Cada faixa reaproveita a mesma gravação para avaliar duas habilidades diferentes sem duplicar o consumo de voz.</p>
        </section>
      </div>
    </div>
  )
}
