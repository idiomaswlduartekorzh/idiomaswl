'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent, MutableRefObject } from 'react'
import { protectedMaterialHref } from '@/lib/material-download'
import base from './JapaneseScriptLesson.module.css'
import styles from './KoreanHangulLesson.module.css'

type SectionId = 'learn' | 'chart' | 'strokes' | 'blocks' | 'practice' | 'resources'
type PracticeMode = 'read' | 'choose'
type LetterKind = 'vocal' | 'consonante'

type HangulLetter = {
  glyph: string
  reading: string
  accepts: string[]
  kind: LetterKind
  family: 'basica' | 'tensa' | 'compuesta'
}

type StrokeSpec = {
  d: string
  start: [number, number]
  transform?: string
}

type HangulBlock = {
  glyph: string
  reading: string
  parts: string[]
  layout: string
  meaning?: string
}

const SECTION_LABELS: Array<[SectionId, string, string]> = [
  ['learn', '01', 'Comprender'],
  ['chart', '02', 'Tabla completa'],
  ['strokes', '03', 'Orden de trazos'],
  ['blocks', '04', 'Formar bloques'],
  ['practice', '05', 'Práctica'],
  ['resources', '06', 'Recursos'],
]

const AUDIO_TRACKS = [
  { id: 'modelo-silabas', title: 'Modelo de sílabas', korean: '가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하.', note: 'Consonante + ㅏ', src: '/audio/coreano/a1/grammar/hangul-basico/modelo-silabas.m4a' },
  { id: 'vocales-basicas', title: 'Vocales básicas', korean: '아, 어, 오, 우, 으, 이.', note: 'a, eo, o, u, eu, i', src: '/audio/coreano/a1/grammar/hangul-basico/vocales-basicas.m4a' },
  { id: 'palabras-basicas', title: 'Palabras para leer', korean: '아이. 어디. 오늘. 우리. 이름. 한글.', note: 'niño · dónde · hoy · nosotros · nombre · hangeúl', src: '/audio/coreano/a1/grammar/hangul-basico/palabras-basicas.m4a' },
  { id: 'frases-iniciales', title: 'Primeras frases', korean: '안녕하세요. 감사합니다. 저는 한국어를 공부해요.', note: 'Hola · Gracias · Estudio coreano', src: '/audio/coreano/a1/grammar/hangul-basico/frases-iniciales.m4a' },
] as const

const LETTERS: HangulLetter[] = [
  { glyph: 'ㄱ', reading: 'g / k', accepts: ['g', 'k', 'g/k'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㄲ', reading: 'kk', accepts: ['kk'], kind: 'consonante', family: 'tensa' },
  { glyph: 'ㄴ', reading: 'n', accepts: ['n'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㄷ', reading: 'd / t', accepts: ['d', 't', 'd/t'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㄸ', reading: 'tt', accepts: ['tt'], kind: 'consonante', family: 'tensa' },
  { glyph: 'ㄹ', reading: 'r / l', accepts: ['r', 'l', 'r/l'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅁ', reading: 'm', accepts: ['m'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅂ', reading: 'b / p', accepts: ['b', 'p', 'b/p'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅃ', reading: 'pp', accepts: ['pp'], kind: 'consonante', family: 'tensa' },
  { glyph: 'ㅅ', reading: 's', accepts: ['s'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅆ', reading: 'ss', accepts: ['ss'], kind: 'consonante', family: 'tensa' },
  { glyph: 'ㅇ', reading: 'muda / ng', accepts: ['muda', 'ng', 'muda/ng'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅈ', reading: 'j', accepts: ['j'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅉ', reading: 'jj', accepts: ['jj'], kind: 'consonante', family: 'tensa' },
  { glyph: 'ㅊ', reading: 'ch', accepts: ['ch'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅋ', reading: 'k aspirada', accepts: ['k', 'k aspirada'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅌ', reading: 't aspirada', accepts: ['t', 't aspirada'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅍ', reading: 'p aspirada', accepts: ['p', 'p aspirada'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅎ', reading: 'h', accepts: ['h'], kind: 'consonante', family: 'basica' },
  { glyph: 'ㅏ', reading: 'a', accepts: ['a'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅐ', reading: 'ae', accepts: ['ae'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅑ', reading: 'ya', accepts: ['ya'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅒ', reading: 'yae', accepts: ['yae'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅓ', reading: 'eo', accepts: ['eo'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅔ', reading: 'e', accepts: ['e'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅕ', reading: 'yeo', accepts: ['yeo'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅖ', reading: 'ye', accepts: ['ye'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅗ', reading: 'o', accepts: ['o'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅘ', reading: 'wa', accepts: ['wa'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅙ', reading: 'wae', accepts: ['wae'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅚ', reading: 'oe / we', accepts: ['oe', 'we'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅛ', reading: 'yo', accepts: ['yo'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅜ', reading: 'u', accepts: ['u'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅝ', reading: 'wo', accepts: ['wo'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅞ', reading: 'we', accepts: ['we'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅟ', reading: 'wi', accepts: ['wi'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅠ', reading: 'yu', accepts: ['yu'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅡ', reading: 'eu', accepts: ['eu'], kind: 'vocal', family: 'basica' },
  { glyph: 'ㅢ', reading: 'ui', accepts: ['ui', 'eui'], kind: 'vocal', family: 'compuesta' },
  { glyph: 'ㅣ', reading: 'i', accepts: ['i'], kind: 'vocal', family: 'basica' },
]

const stroke = (d: string, x: number, y: number, transform?: string): StrokeSpec => ({ d, start: [x, y], transform })

const BASE_STROKES: Record<string, StrokeSpec[]> = {
  'ㄱ': [stroke('M35 42 H140 V140', 35, 42)],
  'ㄴ': [stroke('M42 35 V140 H145', 42, 35)],
  'ㄷ': [stroke('M38 38 H142', 38, 38), stroke('M38 38 V142 H142', 38, 38)],
  'ㄹ': [stroke('M38 35 H142 V82 H55 V135 H145', 38, 35)],
  'ㅁ': [stroke('M40 35 V140', 40, 35), stroke('M40 35 H140 V140', 40, 35), stroke('M40 140 H140', 40, 140)],
  'ㅂ': [stroke('M42 32 V145', 42, 32), stroke('M138 32 V145', 138, 32), stroke('M42 48 H138', 42, 48), stroke('M42 112 H138', 42, 112)],
  'ㅅ': [stroke('M88 35 L42 142', 88, 35), stroke('M90 35 L142 142', 90, 35)],
  'ㅇ': [stroke('M90 34 C42 34 42 146 90 146 C138 146 138 34 90 34', 90, 34)],
  'ㅈ': [stroke('M38 37 H142', 38, 37), stroke('M88 55 L42 142', 88, 55), stroke('M90 55 L142 142', 90, 55)],
  'ㅊ': [stroke('M66 28 H114', 66, 28), stroke('M38 55 H142', 38, 55), stroke('M88 70 L42 145', 88, 70), stroke('M90 70 L142 145', 90, 70)],
  'ㅋ': [stroke('M35 42 H140 V140', 35, 42), stroke('M35 90 H138', 35, 90)],
  'ㅌ': [stroke('M35 34 H145', 35, 34), stroke('M48 83 H132', 48, 83), stroke('M38 50 V132 H142 V50', 38, 50)],
  'ㅍ': [stroke('M38 43 H142', 38, 43), stroke('M38 132 H142', 38, 132), stroke('M58 30 V145', 58, 30), stroke('M122 30 V145', 122, 30)],
  'ㅎ': [stroke('M66 28 H114', 66, 28), stroke('M42 58 H138', 42, 58), stroke('M90 76 C52 76 52 145 90 145 C128 145 128 76 90 76', 90, 76)],
  'ㅏ': [stroke('M82 28 V150', 82, 28), stroke('M82 88 H145', 82, 88)],
  'ㅐ': [stroke('M55 28 V150', 55, 28), stroke('M55 88 H105', 55, 88), stroke('M125 28 V150', 125, 28)],
  'ㅑ': [stroke('M75 25 V155', 75, 25), stroke('M75 68 H145', 75, 68), stroke('M75 112 H145', 75, 112)],
  'ㅒ': [stroke('M45 25 V155', 45, 25), stroke('M45 68 H92', 45, 68), stroke('M45 112 H92', 45, 112), stroke('M120 25 V155', 120, 25)],
  'ㅓ': [stroke('M35 88 H98', 35, 88), stroke('M98 28 V150', 98, 28)],
  'ㅔ': [stroke('M35 88 H85', 35, 88), stroke('M85 28 V150', 85, 28), stroke('M125 28 V150', 125, 28)],
  'ㅕ': [stroke('M35 68 H105', 35, 68), stroke('M35 112 H105', 35, 112), stroke('M105 25 V155', 105, 25)],
  'ㅖ': [stroke('M28 68 H75', 28, 68), stroke('M28 112 H75', 28, 112), stroke('M75 25 V155', 75, 25), stroke('M125 25 V155', 125, 25)],
  'ㅗ': [stroke('M90 35 V92', 90, 35), stroke('M30 92 H150', 30, 92)],
  'ㅘ': [stroke('M62 28 V86', 62, 28), stroke('M25 86 H112', 25, 86), stroke('M125 30 V150', 125, 30), stroke('M125 92 H158', 125, 92)],
  'ㅙ': [stroke('M48 28 V86', 48, 28), stroke('M18 86 H91', 18, 86), stroke('M100 30 V150', 100, 30), stroke('M100 92 H132', 100, 92), stroke('M150 30 V150', 150, 30)],
  'ㅚ': [stroke('M62 30 V88', 62, 30), stroke('M25 88 H105', 25, 88), stroke('M135 30 V150', 135, 30)],
  'ㅛ': [stroke('M65 35 V92', 65, 35), stroke('M115 35 V92', 115, 35), stroke('M25 92 H155', 25, 92)],
  'ㅜ': [stroke('M28 75 H152', 28, 75), stroke('M90 75 V145', 90, 75)],
  'ㅝ': [stroke('M20 70 H103', 20, 70), stroke('M62 70 V142', 62, 70), stroke('M105 102 H145', 105, 102), stroke('M145 32 V150', 145, 32)],
  'ㅞ': [stroke('M18 70 H88', 18, 70), stroke('M53 70 V142', 53, 70), stroke('M88 102 H112', 88, 102), stroke('M112 32 V150', 112, 32), stroke('M152 32 V150', 152, 32)],
  'ㅟ': [stroke('M25 70 H105', 25, 70), stroke('M65 70 V142', 65, 70), stroke('M135 30 V150', 135, 30)],
  'ㅠ': [stroke('M25 70 H155', 25, 70), stroke('M65 70 V140', 65, 70), stroke('M115 70 V140', 115, 70)],
  'ㅡ': [stroke('M25 90 H155', 25, 90)],
  'ㅢ': [stroke('M20 90 H105', 20, 90), stroke('M138 28 V152', 138, 28)],
  'ㅣ': [stroke('M90 25 V155', 90, 25)],
}

const doubleStrokes = (glyph: 'ㄱ' | 'ㄷ' | 'ㅂ' | 'ㅅ' | 'ㅈ') => [
  ...BASE_STROKES[glyph].map((item) => ({ ...item, transform: 'translate(3 35) scale(.62)' })),
  ...BASE_STROKES[glyph].map((item) => ({ ...item, transform: 'translate(67 35) scale(.62)' })),
]

const STROKES: Record<string, StrokeSpec[]> = {
  ...BASE_STROKES,
  'ㄲ': doubleStrokes('ㄱ'),
  'ㄸ': doubleStrokes('ㄷ'),
  'ㅃ': doubleStrokes('ㅂ'),
  'ㅆ': doubleStrokes('ㅅ'),
  'ㅉ': doubleStrokes('ㅈ'),
}

const BLOCKS: HangulBlock[] = [
  { glyph: '가', reading: 'ga', parts: ['ㄱ', 'ㅏ'], layout: 'Vocal vertical: la vocal va a la derecha.' },
  { glyph: '나', reading: 'na', parts: ['ㄴ', 'ㅏ'], layout: 'Vocal vertical: la vocal va a la derecha.' },
  { glyph: '더', reading: 'deo', parts: ['ㄷ', 'ㅓ'], layout: 'Vocal vertical: la vocal va a la derecha.' },
  { glyph: '모', reading: 'mo', parts: ['ㅁ', 'ㅗ'], layout: 'Vocal horizontal: la vocal va debajo.' },
  { glyph: '우', reading: 'u', parts: ['ㅇ', 'ㅜ'], layout: 'ㅇ inicia mudo; ㅜ va debajo.' },
  { glyph: '이', reading: 'i', parts: ['ㅇ', 'ㅣ'], layout: 'ㅇ inicia mudo; ㅣ va a la derecha.' },
  { glyph: '한', reading: 'han', parts: ['ㅎ', 'ㅏ', 'ㄴ'], layout: 'ㄴ ocupa la posición final o batchim.', meaning: 'coreano / Corea' },
  { glyph: '글', reading: 'geul', parts: ['ㄱ', 'ㅡ', 'ㄹ'], layout: 'ㅡ va debajo y ㄹ cierra el bloque.', meaning: 'escritura / texto' },
  { glyph: '밥', reading: 'bap', parts: ['ㅂ', 'ㅏ', 'ㅂ'], layout: 'La segunda ㅂ funciona como batchim.', meaning: 'arroz / comida' },
  { glyph: '물', reading: 'mul', parts: ['ㅁ', 'ㅜ', 'ㄹ'], layout: 'ㅜ va debajo y ㄹ ocupa la base.', meaning: 'agua' },
  { glyph: '강', reading: 'gang', parts: ['ㄱ', 'ㅏ', 'ㅇ'], layout: 'ㅇ al final suena ng.', meaning: 'río' },
  { glyph: '집', reading: 'jip', parts: ['ㅈ', 'ㅣ', 'ㅂ'], layout: 'ㅂ cierra el bloque como batchim.', meaning: 'casa' },
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
  return value.trim().toLocaleLowerCase('es').replace(/\s+/g, ' ')
}

function playAudio(src: string, audioRef: MutableRefObject<HTMLAudioElement | null>) {
  audioRef.current?.pause()
  const audio = new Audio(src)
  audioRef.current = audio
  void audio.play()
}

function AudioButton({ src, label, audioRef }: { src: string; label: string; audioRef: MutableRefObject<HTMLAudioElement | null> }) {
  return <button className={base.audioButton} type="button" onClick={() => playAudio(src, audioRef)} aria-label={label}><span aria-hidden="true">▶</span> Escuchar</button>
}

function StrokeDiagram({ letter, replayKey }: { letter: HangulLetter; replayKey: number }) {
  const strokes = STROKES[letter.glyph]
  return (
    <svg key={`${letter.glyph}-${replayKey}`} className={styles.strokeDiagram} viewBox="0 0 180 180" role="img" aria-label={`Orden de trazos de ${letter.glyph}`}>
      <rect className={styles.strokePaper} x="4" y="4" width="172" height="172" rx="18" />
      <path className={styles.guideGlyph} d="M24 90 H156 M90 24 V156" />
      <g aria-hidden="true">
        {strokes.map((item, index) => <path key={`ghost-${letter.glyph}-${index}`} className={styles.strokeGhost} d={item.d} transform={item.transform} />)}
      </g>
      {strokes.map((item, index) => (
        <path
          key={`${letter.glyph}-${index}`}
          className={styles.animatedStroke}
          d={item.d}
          transform={item.transform}
          pathLength="1"
          style={{ animationDelay: `${0.45 + index * 0.82}s` }}
        />
      ))}
    </svg>
  )
}

function HangulPractice({ audioRef }: { audioRef: MutableRefObject<HTMLAudioElement | null> }) {
  const [mode, setMode] = useState<PracticeMode>('read')
  const [round, setRound] = useState(0)
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(false)
  const queue = useMemo(() => shuffle(LETTERS, `${mode}-${round}`).slice(0, 10), [mode, round])
  const item = queue[index]
  const choices = useMemo(() => {
    if (!item) return []
    const distractors = shuffle(LETTERS.filter((candidate) => candidate.glyph !== item.glyph), `${item.glyph}-${round}`).slice(0, 3)
    return shuffle([item, ...distractors], `${item.glyph}-${round}-choices`)
  }, [item, round])
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

  function choose(candidate: HangulLetter) {
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
    const message = score >= 9 ? 'Excelente reconocimiento. Ya puedes aumentar la velocidad.' : score >= 7 ? 'Buen avance. Repite para afianzar las formas difíciles.' : 'Vuelve a la tabla y prueba otra mezcla de diez letras.'
    return <div className={base.practiceLayout}><PracticeModes active={mode} onSelect={restart} /><div className={base.exercise}><div className={base.prompt}>✓</div><div className={base.result}><span className={base.kicker}>Sesión terminada</span><strong>{score}/10</strong><p>{message}</p><button className={base.primaryButton} type="button" onClick={() => restart()}>Practicar otros 10</button></div></div></div>
  }

  const groupAudio = item.kind === 'vocal' ? AUDIO_TRACKS[1] : AUDIO_TRACKS[0]
  return (
    <div className={base.practiceLayout}>
      <PracticeModes active={mode} onSelect={restart} />
      <div className={base.exercise}>
        <div className={`${base.prompt} ${styles.koreanPrompt}`} lang="ko">{mode === 'read' ? item.glyph : item.reading}</div>
        <div className={base.exerciseBody}>
          <div className={base.questionMeta}><b>Pregunta {index + 1} de 10</b><span>Aciertos: {score}</span></div>
          <div className={base.progressTrack}><span style={{ width: `${(index / 10) * 100}%` }} /></div>
          <AudioButton src={groupAudio.src} label={`Escuchar ${groupAudio.title}`} audioRef={audioRef} />
          <h3>{mode === 'read' ? '¿Cómo se lee esta letra?' : '¿Qué letra corresponde a esta lectura?'}</h3>
          <p>{mode === 'read' ? 'Escribe su lectura aproximada en letras latinas.' : 'Elige una de las cuatro formas del hangeúl.'}</p>
          {mode === 'read' ? (
            <form className={base.answerForm} onSubmit={submitWritten}>
              <label className={base.srOnly} htmlFor="hangul-answer">Lectura aproximada</label>
              <input id="hangul-answer" value={answer} onChange={(event) => setAnswer(event.target.value)} disabled={answered} autoComplete="off" autoCapitalize="none" placeholder="Ejemplo: a, eo, n" />
              <button className={base.primaryButton} type="submit" disabled={answered || !answer.trim()}>Comprobar</button>
            </form>
          ) : (
            <div className={base.choices}>{choices.map((candidate) => {
              const correct = answered && candidate.glyph === item.glyph
              const wrong = answered && answer === candidate.glyph && candidate.glyph !== item.glyph
              return <button key={candidate.glyph} type="button" lang="ko" disabled={answered} className={`${base.choice}${correct ? ` ${base.good}` : ''}${wrong ? ` ${base.bad}` : ''}`} onClick={() => choose(candidate)}>{candidate.glyph}</button>
            })}</div>
          )}
          <div className={`${base.feedback}${answered ? ` ${wasCorrect ? base.feedbackGood : base.feedbackBad}` : ''}`} role="status">
            {!answered && (mode === 'read' ? 'Acepta las lecturas principales indicadas en la tabla.' : 'Elige una de las cuatro opciones.')}
            {answered && wasCorrect && `Correcto: ${item.glyph} corresponde a ${item.reading}.`}
            {answered && !wasCorrect && `La respuesta correcta es ${item.reading}.`}
          </div>
          {answered ? <button className={base.primaryButton} type="button" onClick={next}>{index === 9 ? 'Ver resultado' : 'Siguiente letra'}</button> : null}
        </div>
      </div>
    </div>
  )
}

function PracticeModes({ active, onSelect }: { active: PracticeMode; onSelect: (mode: PracticeMode) => void }) {
  return <div className={base.practiceModes}><button type="button" className={active === 'read' ? base.activeMode : ''} onClick={() => onSelect('read')}><b>1. Escribe cómo suena</b><span>Hangeúl → lectura</span></button><button type="button" className={active === 'choose' ? base.activeMode : ''} onClick={() => onSelect('choose')}><b>2. Elige la letra</b><span>Lectura → hangeúl</span></button></div>
}

export default function KoreanHangulLesson() {
  const [section, setSection] = useState<SectionId>('learn')
  const [block, setBlock] = useState(BLOCKS[0])
  const [strokeLetter, setStrokeLetter] = useState(LETTERS[0])
  const [strokeReplay, setStrokeReplay] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function openSection(next: SectionId) {
    setSection(next)
    requestAnimationFrame(() => document.getElementById('korean-hangul-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className={`${base.lesson} ${styles.lesson}`}>
      <nav className={`${base.scriptSwitch} ${styles.learningSwitch}`} aria-label="Ruta de hangeúl">
        <button type="button" className={section === 'learn' ? styles.activeSwitch : ''} onClick={() => openSection('learn')}>Hangeúl</button>
        <button type="button" className={section === 'strokes' ? styles.activeSwitch : ''} onClick={() => openSection('strokes')}>Trazos</button>
        <button type="button" className={section === 'blocks' ? styles.activeSwitch : ''} onClick={() => openSection('blocks')}>Bloques</button>
        <button type="button" className={section === 'practice' ? styles.activeSwitch : ''} onClick={() => openSection('practice')}>Lectura A1</button>
      </nav>

      <section className={base.hero}>
        <div className={base.heroCopy}>
          <p className={base.eyebrow}>Coreano · Escritura · A1</p>
          <h1>Hangeúl básico</h1>
          <p>Aprende los 40 jamo del hangeúl moderno —19 consonantes y 21 vocales—, domina sus trazos y conviértelos en bloques silábicos.</p>
          <div className={base.heroActions}><button className={base.primaryButton} type="button" onClick={() => openSection('practice')}>Empezar práctica →</button><button className={base.secondaryButton} type="button" onClick={() => openSection('learn')}>Ver explicación</button></div>
        </div>
        <div className={base.heroVisual}>
          <Image src="/assets/korean/step002/kr_step002_geulja_signs_v1.png" alt="Letreros coreanos para reconocer bloques silábicos del hangeúl" fill priority sizes="(max-width: 860px) 100vw, 42vw" />
          <span className={`${base.heroMark} ${styles.heroMark}`} lang="ko">한</span>
          <p>24 jamo básicos más 16 formas tensas o compuestas, organizados en bloques cuadrados.</p>
          <div className={base.heroFacts}><div><b>40</b><span>jamo modernos</span></div><div><b>40</b><span>guías de trazos</span></div><div><b>45 min</b><span>sesión sugerida</span></div></div>
        </div>
      </section>

      <nav id="korean-hangul-nav" className={`${base.sectionNav} ${styles.sectionNav}`} aria-label="Contenido de la lección">
        {SECTION_LABELS.map(([id, number, label]) => <button key={id} type="button" className={section === id ? base.activeSection : ''} onClick={() => openSection(id)}><small>{number}</small><b>{label}</b></button>)}
      </nav>

      <div className={base.surface}>
        {section === 'learn' ? (
          <section aria-labelledby="hangul-intro-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Fundamento antes de memorizar</span><h2 id="hangul-intro-title">Qué es el hangeúl y por qué se aprende por bloques</h2></div></header>
            <div className={base.prose}><p>El hangeúl (한글) es el alfabeto del coreano. Parte de 14 consonantes y 10 vocales básicas; al sumar cinco consonantes tensas y once vocales compuestas, el inventario moderno de inicio de sílaba y vocal reúne 40 formas.</p><p>En 가, por ejemplo, ㄱ aporta el sonido inicial y ㅏ la vocal. Si aparece una consonante final, se coloca en la base: 한 combina ㅎ + ㅏ + ㄴ. Leer coreano consiste en reconocer primero el bloque y después recorrer sus partes.</p><p>Para un hispanohablante el reto principal es asociar forma, posición, trazo y sonido sin convertir la romanización en una muleta permanente.</p></div>
            <div className={base.infoGrid}><article className={base.infoCard}><small>Su función</small><span lang="ko">한</span><p>Cada bloque representa una sílaba y conserva una forma visual cuadrada.</p></article><article className={base.infoCard}><small>Inventario moderno</small><span lang="ko">40</span><p>19 consonantes y 21 vocales, incluidas las formas tensas y compuestas.</p></article><article className={base.infoCard}><small>Meta A1</small><span lang="ko">글</span><p>Reconocer todo el inventario y leer bloques básicos sin depender del latín.</p></article></div>
            <div className={base.callout}><strong>Clave para hispanohablantes.</strong> No leas ㅓ como dos sonidos porque se escriba eo. La romanización es una etiqueta provisional; escucha la voz coreana y vuelve siempre a la forma original.</div>
            <div className={styles.audioGrid}>{AUDIO_TRACKS.map((track, index) => <article key={track.id} className={styles.audioCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{track.title}</h3><p lang="ko">{track.korean}</p><small>{track.note}</small><audio controls preload="metadata" src={track.src}>Tu navegador no puede reproducir este audio.</audio></article>)}</div>
          </section>
        ) : null}

        {section === 'chart' ? (
          <section aria-labelledby="hangul-chart-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Referencia visual completa</span><h2 id="hangul-chart-title">Los 40 jamo del hangeúl moderno</h2><p>Compara las 19 consonantes y las 21 vocales. Las etiquetas distinguen formas básicas, tensas y compuestas.</p></div><a className={base.secondaryButton} href={protectedMaterialHref('/downloads/coreano-a1/idiomaswl-hangul-chart.svg')} download>Descargar SVG</a></header>
            <div className={base.chartLayout}><div className={base.chartFrame}><Image src="/downloads/coreano-a1/idiomaswl-hangul-chart.svg" alt="Tabla visual completa de las 19 consonantes y 21 vocales del hangeúl moderno" width={1600} height={1200} sizes="(max-width: 860px) 100vw, 72vw" unoptimized /></div><aside className={base.tipList} aria-label="Consejos para estudiar la tabla"><div><b>1. Aprende la base</b><span>Empieza con los 24 jamo básicos y usa su forma para entender los 16 derivados.</span></div><div><b>2. Agrupa familias</b><span>Compara ㄱ/ㄲ, ㄷ/ㄸ y ㅗ/ㅘ/ㅙ/ㅚ para ver qué se añade.</span></div><div><b>3. Lee en bloques</b><span>No deletrees indefinidamente: combina las partes y recupera una sola sílaba.</span></div></aside></div>
          </section>
        ) : null}

        {section === 'strokes' ? (
          <section aria-labelledby="hangul-strokes-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Escritura guiada · 40 formas</span><h2 id="hangul-strokes-title">Orden y dirección de los trazos</h2><p>Elige cualquier jamo. La animación numera cada movimiento y marca su dirección; en general, escribe de arriba abajo y de izquierda a derecha.</p></div></header>
            <div className={base.strokeLayout}>
              <div className={`${base.strokeGrid} ${styles.jamoStrokeGrid}`}>{LETTERS.map((candidate) => <button key={candidate.glyph} type="button" lang="ko" className={strokeLetter.glyph === candidate.glyph ? base.activeStroke : ''} onClick={() => { setStrokeLetter(candidate); setStrokeReplay((value) => value + 1) }} aria-label={`${candidate.glyph}, ${candidate.reading}, ${candidate.kind}`}>{candidate.glyph}</button>)}</div>
              <div className={`${base.strokePlayer} ${styles.strokePlayer}`}>
                <div className={styles.strokeCanvas}><StrokeDiagram letter={strokeLetter} replayKey={strokeReplay} /><span className={styles.strokeSequence}>{STROKES[strokeLetter.glyph].map((_, index) => <i key={index}>{index + 1}</i>)}</span></div>
                <div className={styles.strokeMeta}><span className={styles.familyTag}>{strokeLetter.family === 'basica' ? 'Forma básica' : strokeLetter.family === 'tensa' ? 'Consonante tensa' : 'Vocal compuesta'}</span><h3><span lang="ko">{strokeLetter.glyph}</span> · {strokeLetter.reading}</h3><p>{STROKES[strokeLetter.glyph].length} {STROKES[strokeLetter.glyph].length === 1 ? 'movimiento mostrado' : 'movimientos mostrados'}. La forma gris anticipa el carácter y la tinta aparece en el orden correcto.</p><button className={base.secondaryButton} type="button" onClick={() => setStrokeReplay((value) => value + 1)}>↻ Repetir animación</button></div>
              </div>
            </div>
            <div className={base.callout}><strong>Nota de escritura.</strong> Los trazos muestran una forma escolar clara. El aspecto exacto puede variar ligeramente según la tipografía o la caligrafía, pero se conserva el principio de arriba abajo y de izquierda a derecha.</div>
          </section>
        ) : null}

        {section === 'blocks' ? (
          <section aria-labelledby="hangul-blocks-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Construcción guiada</span><h2 id="hangul-blocks-title">Forma y desarma bloques silábicos</h2><p>Selecciona un bloque para ver sus componentes, su disposición y el papel del batchim.</p></div></header>
            <div className={base.strokeLayout}><div className={`${base.strokeGrid} ${styles.blockGrid}`}>{BLOCKS.map((candidate) => <button key={candidate.glyph} type="button" lang="ko" className={block.glyph === candidate.glyph ? base.activeStroke : ''} onClick={() => setBlock(candidate)} aria-label={`${candidate.glyph}, ${candidate.reading}`}>{candidate.glyph}</button>)}</div><div className={`${base.strokePlayer} ${styles.blockPlayer}`}><span className={styles.bigBlock} lang="ko">{block.glyph}</span><div className={styles.blockParts}>{block.parts.map((part, index) => <span key={`${part}-${index}`} lang="ko">{part}</span>)}</div><h3>{block.glyph} · {block.reading}{block.meaning ? ` · ${block.meaning}` : ''}</h3><p>{block.layout}</p><AudioButton src={AUDIO_TRACKS[2].src} label="Escuchar palabras básicas" audioRef={audioRef} /></div></div>
          </section>
        ) : null}

        {section === 'practice' ? (
          <section aria-labelledby="hangul-practice-title"><header className={base.sectionHeader}><div><span className={base.kicker}>Práctica · sesión de 10</span><h2 id="hangul-practice-title">Reconoce el hangeúl en ambas direcciones</h2><p>Cada sesión mezcla diez de los 40 jamo: primero de la forma al sonido y después del sonido a la forma.</p></div></header><HangulPractice audioRef={audioRef} /></section>
        ) : null}

        {section === 'resources' ? (
          <section aria-labelledby="hangul-resources-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Biblioteca descargable</span><h2 id="hangul-resources-title">Recursos para estudiar sin conexión</h2><p>Materiales listos para imprimir, guardar o usar en sesiones cortas de pronunciación.</p></div></header>
            <div className={base.resources}><ResourceCard icon="▦" title="Tabla visual completa" copy="Los 40 jamo modernos, sus lecturas y sus familias." href="/downloads/coreano-a1/idiomaswl-hangul-chart.svg" label="Descargar SVG" /><ResourceCard icon="▤" title="Cuaderno A1" copy="7 páginas con explicación, audio, 32 ejercicios y soluciones." href="/api/site-materials/coreano-a1/idiomaswl-hangul-basico-a1.pdf" label="Descargar PDF" /><ResourceCard icon="▶" title="Audio coreano" copy="Las cuatro pistas Chatterbox aprobadas, reunidas para estudiar sin conexión." href="/api/site-materials/coreano-a1/idiomaswl-hangul-audios.zip" label="Descargar ZIP" /><ResourceCard icon="▣" title="Imagen editorial" copy="Escena coreana original utilizada como referencia visual de la unidad." href="/assets/korean/step002/kr_step002_geulja_signs_v1.png" label="Descargar imagen" /></div>
            <div className={base.faq}><details><summary>¿Debo memorizar los 40 jamo en un día?</summary><p>No. Aprende primero los 24 básicos; después añade las cinco consonantes tensas y las once vocales compuestas por familias.</p></details><details><summary>¿Por qué ㅇ a veces no suena?</summary><p>Al inicio funciona como soporte mudo para una vocal; al final del bloque suena ng.</p></details><details><summary>¿Qué es el batchim?</summary><p>Es la consonante que ocupa la base del bloque y cierra la sílaba.</p></details><details><summary>¿Cuándo dejo la romanización?</summary><p>Desde el principio úsala solo para comprobar. Tápala en la segunda lectura.</p></details></div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function ResourceCard({ icon, title, copy, href, label }: { icon: string; title: string; copy: string; href: string; label: string }) {
  return <article className={base.resourceCard}><span aria-hidden="true">{icon}</span><h3>{title}</h3><p>{copy}</p><a href={protectedMaterialHref(href)} download>{label} →</a></article>
}
