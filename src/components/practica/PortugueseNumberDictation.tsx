'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { PORTUGUESE_NUMBER_DICTATION_SETS, portugueseNumberWords } from '@/data/practica/portuguese-number-dictation'
import { protectedMaterialHref } from '@/lib/material-download'
import styles from './PortugueseNumberDictation.module.css'

type FieldResult = 'idle' | 'correct' | 'wrong'
type StoredProgress = { completed: boolean[]; scores: number[]; unlockedSet: number }
type PlaybackMode = 'easy' | 'medium' | 'hard'

const STORAGE_KEY = 'welearn:portugues:a1:numeros-ditado:v6'
const setCount = PORTUGUESE_NUMBER_DICTATION_SETS.length
const emptyCompleted = () => PORTUGUESE_NUMBER_DICTATION_SETS.map(() => false)
const emptyScores = () => PORTUGUESE_NUMBER_DICTATION_SETS.map(() => 0)
const emptyAnswers = () => Array.from({ length: 20 }, () => '')
const emptyResults = () => Array.from({ length: 20 }, (): FieldResult => 'idle')
const PLAYBACK_MODES: ReadonlyArray<{ id: PlaybackMode; label: string; rate: number; note: string }> = [
  { id: 'easy', label: 'Fácil', rate: 1, note: 'Pausado e bem marcado' },
  { id: 'medium', label: 'Médio', rate: 1.15, note: 'Mais próximo da fala real' },
  { id: 'hard', label: 'Difícil', rate: 1.3, note: 'Rápido, mas ainda natural' },
]
const NUMBER_FAMILY_COLORS = ['#167448', '#2457a7', '#b57d00', '#b84632', '#7651a8', '#087f8c', '#b33a53', '#297b68', '#3f58a8', '#c05b16'] as const
const NUMBER_FAMILIES = Array.from({ length: 10 }, (_, familyIndex) => {
  const start = familyIndex * 10
  return {
    range: `${start}–${start + 9}`,
    label: familyIndex === 0 ? 'Base' : familyIndex === 1 ? 'Formas próprias' : `Família de ${portugueseNumberWords(start)}`,
    color: NUMBER_FAMILY_COLORS[familyIndex],
    values: Array.from({ length: 10 }, (_, offset) => start + offset),
  }
})
const SCALE_EXAMPLES = [
  { value: '100', spoken: 'cem', note: 'Use cem quando não há nada depois.' },
  { value: '101', spoken: 'cento e um', note: 'De 101 a 199, use cento.' },
  { value: '200', spoken: 'duzentos', note: 'As centenas têm forma própria.' },
  { value: '1.000', spoken: 'mil', note: 'Não diga um mil.' },
  { value: '1.001', spoken: 'mil e um', note: 'O e liga mil a uma dezena ou unidade.' },
  { value: '2.500', spoken: 'dois mil e quinhentos', note: 'Use e antes de uma centena exata.' },
  { value: '25.000', spoken: 'vinte e cinco mil', note: 'Construa a quantidade e acrescente mil.' },
  { value: '100.000', spoken: 'cem mil', note: 'O limite desta unidade.' },
] as const
const DOWNLOADS = [
  {
    code: 'PDF',
    title: 'Curso completo',
    copy: 'Tabela 0–99, regras de formação, centenas, milhares e percurso de estudo.',
    label: 'Baixar o curso',
    href: '/api/site-materials/portugues-a1/grammar/idiomaswl-numeros-ditado-a1.pdf',
  },
  {
    code: 'EX',
    title: 'Caderno de exercícios',
    copy: 'Seis fichas de vinte respostas para usar com os áudios da aula.',
    label: 'Baixar os exercícios',
    href: '/api/site-materials/portugues-a1/grammar/idiomaswl-numeros-ditado-a1-exercicios.pdf',
  },
  {
    code: 'GAB',
    title: 'Gabarito comentado',
    copy: 'As 120 respostas em cifras e por extenso, organizadas por faixa.',
    label: 'Baixar o gabarito',
    href: '/api/site-materials/portugues-a1/grammar/idiomaswl-numeros-ditado-a1-gabarito.pdf',
  },
] as const

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
  const [playbackMode, setPlaybackMode] = useState<PlaybackMode>('easy')
  const audioRef = useRef<HTMLAudioElement>(null)

  const selectedSet = PORTUGUESE_NUMBER_DICTATION_SETS[activeSet]
  const currentScore = results.filter((result) => result === 'correct').length
  const wrongCount = results.filter((result) => result === 'wrong').length
  const filledCount = answers.filter((answer) => answer.trim()).length
  const allFilled = filledCount === selectedSet.items.length
  const completedCount = completed.filter(Boolean).length
  const selectedPlaybackMode = PLAYBACK_MODES.find((mode) => mode.id === playbackMode) ?? PLAYBACK_MODES[0]

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

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.playbackRate = selectedPlaybackMode.rate
    audio.preservesPitch = true
  }, [activeSet, selectedPlaybackMode.rate])

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

  function selectPlaybackMode(mode: PlaybackMode) {
    setPlaybackMode(mode)
    const audio = audioRef.current
    const nextMode = PLAYBACK_MODES.find((option) => option.id === mode)
    if (audio && nextMode) {
      audio.playbackRate = nextMode.rate
      audio.preservesPitch = true
    }
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
            <p className={styles.eyebrow}>Aula completa · Português brasileiro · A1</p>
            <h1>Números em português: compreender, escrever e ouvir.</h1>
            <p className={styles.lead}>Aprenda a formar números de zero a cem mil, compare as famílias por cor e depois treine a escuta em seis ditados completos.</p>
            <div className={styles.heroMetrics}><span><b>6</b> áudios</span><span><b>6</b> fichas</span><span><b>3</b> ritmos</span><span><b>{completedCount}/6</b> concluídas</span></div>
          </div>
          <aside className={styles.heroCard}>
            <span>Método WeLearn</span><strong>entenda o padrão antes de escutar</strong><p>Use a tabela como referência, reconstrua as regras e só então passe ao ditado em ritmo fácil, médio ou difícil.</p>
          </aside>
        </header>

        <nav className={styles.lessonNav} aria-label="Conteúdo da aula">
          <a href="#compreender"><span>01</span>Compreender</a>
          <a href="#tabela"><span>02</span>Tabela 0–99</a>
          <a href="#construir"><span>03</span>Passo a passo</a>
          <a href="#pratica"><span>04</span>Prática</a>
          <a href="#materiais"><span>05</span>Materiais</a>
        </nav>

        <section id="compreender" className={styles.lessonSection} aria-labelledby="understand-title">
          <div className={styles.sectionHeading}>
            <div><span>Explicação pedagógica</span><h2 id="understand-title">Primeiro, enxergue a lógica dos números</h2></div>
            <p>Em português brasileiro, você memoriza as formas de 0 a 19 e depois combina dezenas, centenas e milhares com regras muito estáveis.</p>
          </div>
          <div className={styles.outcomeGrid}>
            <article><span>01</span><h3>Reconhecer</h3><p>Identifique as palavras-base e as dezenas sem traduzir número por número.</p></article>
            <article><span>02</span><h3>Construir</h3><p>Use <b>e</b> no lugar certo para formar números compostos.</p></article>
            <article><span>03</span><h3>Escrever</h3><p>Passe do som às cifras e das cifras à ortografia completa.</p></article>
          </div>
          <div className={styles.coreRule}>
            <span>Regra central</span>
            <div><b>dezena</b><i>+</i><strong>e</strong><i>+</i><b>unidade</b></div>
            <p><em>42</em> = quarenta <strong>e</strong> dois · <em>87</em> = oitenta <strong>e</strong> sete</p>
          </div>
        </section>

        <section id="tabela" className={styles.lessonSection} aria-labelledby="number-chart-title">
          <div className={styles.sectionHeading}>
            <div><span>Mapa visual completo</span><h2 id="number-chart-title">Tabela dos números de 0 a 99</h2></div>
            <p>Cada cor marca uma família. Compare o início de cada palavra e observe como a unidade reaparece depois de <b>e</b>.</p>
          </div>
          <div className={styles.familyGrid}>
            {NUMBER_FAMILIES.map((family) => (
              <article className={styles.familyCard} style={{ '--family-color': family.color } as React.CSSProperties} key={family.range}>
                <header><span>{family.range}</span><strong>{family.label}</strong></header>
                <div>{family.values.map((value) => <p key={value}><b>{value}</b><span lang="pt-BR">{portugueseNumberWords(value)}</span></p>)}</div>
              </article>
            ))}
          </div>
        </section>

        <section id="construir" className={styles.lessonSection} aria-labelledby="building-title">
          <div className={styles.sectionHeading}>
            <div><span>Raciocínio guiado</span><h2 id="building-title">De cem a cem mil, sem decorar listas</h2></div>
            <p>As escalas maiores repetem os mesmos blocos. Leia cada exemplo como uma construção, não como uma palavra isolada.</p>
          </div>
          <div className={styles.scaleGrid}>
            {SCALE_EXAMPLES.map((example) => <article key={example.value}><span>{example.value}</span><strong lang="pt-BR">{example.spoken}</strong><p>{example.note}</p></article>)}
          </div>
          <div className={styles.contrastGrid}>
            <article><span>Observe o <b>e</b></span><strong>145</strong><p>cento <mark>e</mark> quarenta <mark>e</mark> cinco</p></article>
            <article><span>Não traduza do espanhol</span><strong>40 · 50 · 60</strong><p><mark>quarenta</mark> · <mark>cinquenta</mark> · <mark>sessenta</mark></p></article>
            <article><span>Cem ou cento?</span><strong>100 · 118</strong><p><mark>cem</mark> · <mark>cento e dezoito</mark></p></article>
          </div>
          <div className={styles.warningBox}><strong>Erros frequentes</strong><p>Evite <s>cuarenta</s>, <s>cincuenta</s>, <s>seiscentos</s> e <s>um mil</s>. Em português: <b>quarenta</b>, <b>cinquenta</b>, <b>seiscentos</b> e <b>mil</b>.</p></div>
        </section>

        <section id="pratica" className={styles.route} aria-labelledby="number-route-title">
          <div className={styles.sectionHeading}>
            <div><span>Prática progressiva</span><h2 id="number-route-title">Agora escute: três faixas, duas fichas em cada uma</h2></div>
            <p>Complete a ficha em cifras para liberar a ortografia; complete ambas para avançar ao intervalo seguinte.</p>
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
                  <span aria-hidden="true">{isPlaying ? 'Ⅱ' : '▶'}</span><strong>{isPlaying ? 'Pausar o ditado' : playCount ? 'Continuar o ditado' : 'Reproduzir o ditado completo'}</strong><small>20 números · {selectedPlaybackMode.label} {selectedPlaybackMode.rate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}×</small>
                </button>
                <div className={styles.audioGuidance}><b>Antes de começar</b><p>Tenha as 20 caixas à vista. Você pode mudar o ritmo, pausar ou repetir o áudio quando precisar.</p><button type="button" onClick={restartDictation}>↺ Reiniciar do começo</button></div>
                <div className={styles.speedPanel}>
                  <div><span>Modalidade</span><strong>Escolha o ritmo do ditado</strong></div>
                  <div className={styles.speedOptions} role="radiogroup" aria-label="Velocidade do ditado">
                    {PLAYBACK_MODES.map((mode) => (
                      <button
                        type="button"
                        role="radio"
                        aria-checked={playbackMode === mode.id}
                        data-active={playbackMode === mode.id}
                        key={mode.id}
                        onClick={() => selectPlaybackMode(mode.id)}
                      >
                        <span>{mode.label}</span>
                        <b>{mode.rate.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}×</b>
                        <small>{mode.note}</small>
                      </button>
                    ))}
                  </div>
                </div>
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

        <section id="materiais" className={styles.resources} aria-labelledby="resources-title">
          <div className={styles.sectionHeading}>
            <div><span>Biblioteca de estudo</span><h2 id="resources-title">Materiais WeLearn para imprimir e revisar</h2></div>
            <p>Os três arquivos usam a identidade visual e o membrete oficial de Idiomas WeLearn.</p>
          </div>
          <div className={styles.resourceGrid}>
            {DOWNLOADS.map((resource) => <article key={resource.code}><span>{resource.code}</span><div><strong>{resource.title}</strong><p>{resource.copy}</p><a href={protectedMaterialHref(resource.href)} download>{resource.label} <b>↓</b></a></div></article>)}
          </div>
          <div className={styles.studyPlan}><strong>Percurso recomendado</strong><ol><li><b>10 min</b> Leia a tabela por famílias.</li><li><b>10 min</b> Reconstrua as regras sem olhar.</li><li><b>20 min</b> Faça um ditado no ritmo adequado.</li><li><b>10 min</b> Corrija a ortografia com o gabarito.</li></ol></div>
        </section>
      </div>
    </div>
  )
}
