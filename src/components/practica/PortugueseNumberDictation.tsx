'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PORTUGUESE_NUMBER_DICTATION_SETS } from '@/data/practica/portuguese-number-dictation'
import styles from './PortugueseNumberDictation.module.css'

type Feedback = 'idle' | 'correct' | 'wrong'
type StoredProgress = { positions: number[]; unlockedSet: number }

const STORAGE_KEY = 'welearn:portugues:a1:numeros-ditado:v1'
const emptyPositions = () => PORTUGUESE_NUMBER_DICTATION_SETS.map(() => 0)

function parseNumericAnswer(value: string): number | null {
  const digits = value.replace(/[^0-9]/g, '')
  return digits ? Number(digits) : null
}

function safeProgress(value: unknown): StoredProgress | null {
  if (!value || typeof value !== 'object') return null
  const candidate = value as Partial<StoredProgress>
  if (!Array.isArray(candidate.positions) || typeof candidate.unlockedSet !== 'number') return null
  if (candidate.positions.length !== PORTUGUESE_NUMBER_DICTATION_SETS.length) return null
  return {
    positions: candidate.positions.map((position) => Math.max(0, Math.min(20, Number(position) || 0))),
    unlockedSet: Math.max(0, Math.min(PORTUGUESE_NUMBER_DICTATION_SETS.length - 1, candidate.unlockedSet)),
  }
}

export default function PortugueseNumberDictation() {
  const [positions, setPositions] = useState<number[]>(emptyPositions)
  const [unlockedSet, setUnlockedSet] = useState(0)
  const [activeSet, setActiveSet] = useState(0)
  const [answer, setAnswer] = useState('')
  const [feedback, setFeedback] = useState<Feedback>('idle')
  const [audioError, setAudioError] = useState(false)
  const [playCount, setPlayCount] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectedSet = PORTUGUESE_NUMBER_DICTATION_SETS[activeSet]
  const position = positions[activeSet] ?? 0
  const completed = position >= selectedSet.items.length
  const item = completed ? null : selectedSet.items[position]
  const totalCompleted = positions.reduce((sum, value) => sum + value, 0)

  useEffect(() => {
    try {
      const stored = safeProgress(JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null'))
      if (!stored) return
      setPositions(stored.positions)
      setUnlockedSet(stored.unlockedSet)
      const firstOpen = stored.positions.findIndex((value) => value < 20)
      setActiveSet(firstOpen === -1 ? stored.positions.length - 1 : Math.min(firstOpen, stored.unlockedSet))
    } catch {
      // A damaged local value should never block the exercise.
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
      audio?.pause()
    }
  }, [])

  function persist(nextPositions: number[], nextUnlocked: number) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ positions: nextPositions, unlockedSet: nextUnlocked }))
  }

  function selectSet(index: number) {
    if (index > unlockedSet) return
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    audioRef.current?.pause()
    setActiveSet(index)
    setAnswer('')
    setFeedback('idle')
    setAudioError(false)
    setPlayCount(0)
    setMistakes(0)
  }

  async function playCurrent() {
    if (!item || !audioRef.current) return
    setAudioError(false)
    audioRef.current.currentTime = 0
    try {
      await audioRef.current.play()
      setPlayCount((count) => count + 1)
    } catch {
      setAudioError(true)
    }
  }

  function submitAnswer() {
    if (!item || feedback === 'correct') return
    if (parseNumericAnswer(answer) !== item.value) {
      setFeedback('wrong')
      setMistakes((value) => value + 1)
      return
    }
    setFeedback('correct')
    const nextPositions = positions.map((value, index) => index === activeSet ? Math.min(selectedSet.items.length, value + 1) : value)
    const setFinished = nextPositions[activeSet] >= selectedSet.items.length
    const nextUnlocked = setFinished
      ? Math.min(PORTUGUESE_NUMBER_DICTATION_SETS.length - 1, Math.max(unlockedSet, activeSet + 1))
      : unlockedSet
    setPositions(nextPositions)
    setUnlockedSet(nextUnlocked)
    persist(nextPositions, nextUnlocked)

    advanceTimer.current = setTimeout(() => {
      if (setFinished && activeSet < PORTUGUESE_NUMBER_DICTATION_SETS.length - 1) setActiveSet(activeSet + 1)
      setAnswer('')
      setFeedback('idle')
      setAudioError(false)
      setPlayCount(0)
      setMistakes(0)
    }, 1_050)
  }

  function restartSet() {
    const nextPositions = positions.map((value, index) => index === activeSet ? 0 : value)
    setPositions(nextPositions)
    persist(nextPositions, unlockedSet)
    setAnswer('')
    setFeedback('idle')
    setPlayCount(0)
    setMistakes(0)
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
            <h1>Ouça o número. Escreva o que ouviu.</h1>
            <p className={styles.lead}>Se acertar, você avança. Se errar, permanece no mesmo número e pode ouvi-lo outra vez. A rota cresce de 0–99 até 100.000.</p>
            <div className={styles.heroMetrics}><span><b>6</b> séries</span><span><b>120</b> números</span><span><b>{totalCompleted}</b> concluídos</span></div>
          </div>
          <aside className={styles.heroCard}>
            <span>Regra do treino</span><strong>ouvir → escrever → conferir</strong><p>Digite somente algarismos. Pontos e espaços de milhar são aceitos.</p>
          </aside>
        </header>

        <section className={styles.route} aria-labelledby="number-route-title">
          <div className={styles.sectionHeading}>
            <div><span>Seu percurso</span><h2 id="number-route-title">Seis séries, dificuldade progressiva</h2></div>
            <p>Uma série só é liberada quando a anterior chega a 20 acertos.</p>
          </div>
          <div className={styles.setGrid}>
            {PORTUGUESE_NUMBER_DICTATION_SETS.map((set, index) => {
              const locked = index > unlockedSet
              const setCompleted = positions[index] >= set.items.length
              return (
                <button type="button" key={set.id} className={`${styles.setCard} ${index === activeSet ? styles.activeSet : ''}`} onClick={() => selectSet(index)} disabled={locked} aria-current={index === activeSet ? 'step' : undefined}>
                  <span>{locked ? 'Bloqueada' : setCompleted ? 'Concluída' : `Série ${set.order}`}</span><strong>{set.range}</strong><small>{positions[index]}/20</small>
                </button>
              )
            })}
          </div>
        </section>

        <section className={styles.trainer} aria-live="polite">
          <div className={styles.trainerTop}>
            <div><span>Série {selectedSet.order} · {selectedSet.range}</span><h2>{selectedSet.title}</h2><p>{selectedSet.description}</p></div>
            <div className={styles.counter}>{completed ? '20/20' : `${position + 1}/20`}</div>
          </div>

          {completed ? (
            <div className={styles.completedPanel}>
              <span>✓</span><h3>Série concluída</h3><p>Você acertou os 20 números. A próxima faixa já está liberada.</p>
              <div>
                {activeSet < PORTUGUESE_NUMBER_DICTATION_SETS.length - 1 ? <button type="button" onClick={() => selectSet(activeSet + 1)}>Ir para a próxima série</button> : <strong>Rota completa: 120 números concluídos.</strong>}
                <button type="button" className={styles.ghostButton} onClick={restartSet}>Repetir esta série</button>
              </div>
            </div>
          ) : item ? (
            <div className={styles.exercise}>
              <audio ref={audioRef} src={item.audioUrl} preload="none" onError={() => setAudioError(true)} />
              <button type="button" className={styles.listenButton} onClick={playCurrent}>
                <span aria-hidden="true">▶</span><strong>{playCount ? 'Ouvir novamente' : 'Ouvir o número'}</strong><small>{playCount ? `${playCount} reprodução${playCount === 1 ? '' : 'ões'}` : 'Você pode repetir quando precisar'}</small>
              </button>
              {audioError ? <p className={styles.audioError}>O áudio desta série ainda não está disponível. A estrutura está pronta e aguarda a geração final.</p> : null}
              <label className={styles.answerField}>
                <span>Qual número você ouviu?</span>
                <input type="text" inputMode="numeric" autoComplete="off" placeholder="Digite em algarismos" value={answer} onChange={(event) => { setAnswer(event.target.value); if (feedback === 'wrong') setFeedback('idle') }} onKeyDown={(event) => { if (event.key === 'Enter') submitAnswer() }} disabled={feedback === 'correct'} />
              </label>
              <button type="button" className={styles.checkButton} onClick={submitAnswer} disabled={!answer.trim() || feedback === 'correct'}>Conferir resposta</button>
              {feedback === 'wrong' ? <div className={styles.wrongFeedback}><b>Ainda não.</b><p>Ouça novamente e tente o mesmo número. Você não perde o seu progresso.</p></div> : null}
              {feedback === 'correct' ? <div className={styles.correctFeedback}><b>Correto: {item.value.toLocaleString('pt-BR')}</b><p lang="pt-BR">{item.spoken}</p></div> : null}
              <footer className={styles.exerciseFooter}><span>Tentativas incorretas nesta rodada: <b>{mistakes}</b></span><span>Áudio individual · sem revelar a resposta antes do acerto</span></footer>
            </div>
          ) : null}
        </section>

        <section className={styles.teacherNote}>
          <div><span>Para aula e estudo autônomo</span><h2>O modelo está pronto para escalar</h2></div>
          <p>Os dados, a correção e o desbloqueio são independentes do idioma. Depois de validar esta versão em português, a mesma estrutura pode receber listas e vozes próprias para os demais idiomas.</p>
        </section>
      </div>
    </div>
  )
}

