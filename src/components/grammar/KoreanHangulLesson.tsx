'use client'

import Image from 'next/image'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent, MutableRefObject } from 'react'
import base from './JapaneseScriptLesson.module.css'
import styles from './KoreanHangulLesson.module.css'

type SectionId = 'learn' | 'chart' | 'blocks' | 'practice' | 'resources'
type PracticeMode = 'read' | 'choose'
type LetterKind = 'vocal' | 'consonante'

type HangulLetter = {
  glyph: string
  reading: string
  accepts: string[]
  kind: LetterKind
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
  ['chart', '02', 'Tabla visual'],
  ['blocks', '03', 'Formar bloques'],
  ['practice', '04', 'Práctica'],
  ['resources', '05', 'Recursos'],
]

const AUDIO_TRACKS = [
  { id: 'modelo-silabas', title: 'Modelo de sílabas', korean: '가, 나, 다, 라, 마, 바, 사, 아, 자, 차, 카, 타, 파, 하.', note: 'Consonante + ㅏ', src: '/audio/coreano/a1/grammar/hangul-basico/modelo-silabas.m4a' },
  { id: 'vocales-basicas', title: 'Vocales básicas', korean: '아, 어, 오, 우, 으, 이.', note: 'a, eo, o, u, eu, i', src: '/audio/coreano/a1/grammar/hangul-basico/vocales-basicas.m4a' },
  { id: 'palabras-basicas', title: 'Palabras para leer', korean: '아이. 어디. 오늘. 우리. 이름. 한글.', note: 'niño · dónde · hoy · nosotros · nombre · hangeúl', src: '/audio/coreano/a1/grammar/hangul-basico/palabras-basicas.m4a' },
  { id: 'frases-iniciales', title: 'Primeras frases', korean: '안녕하세요. 감사합니다. 저는 한국어를 공부해요.', note: 'Hola · Gracias · Estudio coreano', src: '/audio/coreano/a1/grammar/hangul-basico/frases-iniciales.m4a' },
] as const

const LETTERS: HangulLetter[] = [
  { glyph: 'ㅏ', reading: 'a', accepts: ['a'], kind: 'vocal' },
  { glyph: 'ㅓ', reading: 'eo', accepts: ['eo'], kind: 'vocal' },
  { glyph: 'ㅗ', reading: 'o', accepts: ['o'], kind: 'vocal' },
  { glyph: 'ㅜ', reading: 'u', accepts: ['u'], kind: 'vocal' },
  { glyph: 'ㅡ', reading: 'eu', accepts: ['eu'], kind: 'vocal' },
  { glyph: 'ㅣ', reading: 'i', accepts: ['i'], kind: 'vocal' },
  { glyph: 'ㅐ', reading: 'ae', accepts: ['ae'], kind: 'vocal' },
  { glyph: 'ㅔ', reading: 'e', accepts: ['e'], kind: 'vocal' },
  { glyph: 'ㅚ', reading: 'oe / we', accepts: ['oe', 'we'], kind: 'vocal' },
  { glyph: 'ㅟ', reading: 'wi', accepts: ['wi'], kind: 'vocal' },
  { glyph: 'ㄱ', reading: 'g / k', accepts: ['g', 'k', 'g/k'], kind: 'consonante' },
  { glyph: 'ㄴ', reading: 'n', accepts: ['n'], kind: 'consonante' },
  { glyph: 'ㄷ', reading: 'd / t', accepts: ['d', 't', 'd/t'], kind: 'consonante' },
  { glyph: 'ㄹ', reading: 'r / l', accepts: ['r', 'l', 'r/l'], kind: 'consonante' },
  { glyph: 'ㅁ', reading: 'm', accepts: ['m'], kind: 'consonante' },
  { glyph: 'ㅂ', reading: 'b / p', accepts: ['b', 'p', 'b/p'], kind: 'consonante' },
  { glyph: 'ㅅ', reading: 's', accepts: ['s'], kind: 'consonante' },
  { glyph: 'ㅇ', reading: 'muda / ng', accepts: ['muda', 'ng', 'muda/ng'], kind: 'consonante' },
  { glyph: 'ㅈ', reading: 'j', accepts: ['j'], kind: 'consonante' },
  { glyph: 'ㅊ', reading: 'ch', accepts: ['ch'], kind: 'consonante' },
  { glyph: 'ㅋ', reading: 'k aspirada', accepts: ['k', 'k aspirada'], kind: 'consonante' },
  { glyph: 'ㅌ', reading: 't aspirada', accepts: ['t', 't aspirada'], kind: 'consonante' },
  { glyph: 'ㅍ', reading: 'p aspirada', accepts: ['p', 'p aspirada'], kind: 'consonante' },
  { glyph: 'ㅎ', reading: 'h', accepts: ['h'], kind: 'consonante' },
]

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
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function openSection(next: SectionId) {
    setSection(next)
    requestAnimationFrame(() => document.getElementById('korean-hangul-nav')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div className={`${base.lesson} ${styles.lesson}`}>
      <nav className={`${base.scriptSwitch} ${styles.learningSwitch}`} aria-label="Ruta de hangeúl">
        <button type="button" className={section === 'learn' ? styles.activeSwitch : ''} onClick={() => openSection('learn')}>Hangeúl</button>
        <button type="button" className={section === 'blocks' ? styles.activeSwitch : ''} onClick={() => openSection('blocks')}>Bloques</button>
        <button type="button" className={section === 'practice' ? styles.activeSwitch : ''} onClick={() => openSection('practice')}>Lectura A1</button>
      </nav>

      <section className={base.hero}>
        <div className={base.heroCopy}>
          <p className={base.eyebrow}>Coreano · Escritura · A1</p>
          <h1>Hangeúl básico</h1>
          <p>Aprende las 24 letras esenciales, comprende cómo se convierten en bloques silábicos y practica en ambas direcciones sin depender de la romanización.</p>
          <div className={base.heroActions}><button className={base.primaryButton} type="button" onClick={() => openSection('practice')}>Empezar práctica →</button><button className={base.secondaryButton} type="button" onClick={() => openSection('learn')}>Ver explicación</button></div>
        </div>
        <div className={base.heroVisual}>
          <Image src="/assets/korean/step002/kr_step002_geulja_signs_v1.png" alt="Letreros coreanos para reconocer bloques silábicos del hangeúl" fill priority sizes="(max-width: 860px) 100vw, 42vw" />
          <span className={`${base.heroMark} ${styles.heroMark}`} lang="ko">한</span>
          <p>Un alfabeto de 24 letras que se organiza visualmente en bloques cuadrados.</p>
          <div className={base.heroFacts}><div><b>24</b><span>letras básicas</span></div><div><b>2</b><span>modos de práctica</span></div><div><b>35 min</b><span>sesión sugerida</span></div></div>
        </div>
      </section>

      <nav id="korean-hangul-nav" className={base.sectionNav} aria-label="Contenido de la lección">
        {SECTION_LABELS.map(([id, number, label]) => <button key={id} type="button" className={section === id ? base.activeSection : ''} onClick={() => openSection(id)}><small>{number}</small><b>{label}</b></button>)}
      </nav>

      <div className={base.surface}>
        {section === 'learn' ? (
          <section aria-labelledby="hangul-intro-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Fundamento antes de memorizar</span><h2 id="hangul-intro-title">Qué es el hangeúl y por qué se aprende por bloques</h2></div></header>
            <div className={base.prose}><p>El hangeúl (한글) es el alfabeto del coreano. Sus 14 consonantes y 10 vocales básicas no se escriben en una fila continua: se agrupan dentro de un bloque que representa una sílaba.</p><p>En 가, por ejemplo, ㄱ aporta el sonido inicial y ㅏ la vocal. Si aparece una consonante final, se coloca en la base: 한 combina ㅎ + ㅏ + ㄴ. Leer coreano consiste en reconocer primero el bloque y después recorrer sus partes.</p><p>Para un hispanohablante el reto principal no es memorizar 24 símbolos aislados, sino asociar forma, posición y sonido sin convertir la romanización en una muleta permanente.</p></div>
            <div className={base.infoGrid}><article className={base.infoCard}><small>Su función</small><span lang="ko">한</span><p>Cada bloque representa una sílaba y conserva una forma visual cuadrada.</p></article><article className={base.infoCard}><small>Cómo se organiza</small><span lang="ko">가</span><p>La vocal va a la derecha o debajo de la consonante inicial.</p></article><article className={base.infoCard}><small>Meta A1</small><span lang="ko">글</span><p>Reconocer las 24 letras y leer bloques básicos sin depender del latín.</p></article></div>
            <div className={base.callout}><strong>Clave para hispanohablantes.</strong> No leas ㅓ como dos sonidos porque se escriba eo. La romanización es una etiqueta provisional; escucha la voz coreana y vuelve siempre a la forma original.</div>
            <div className={styles.audioGrid}>{AUDIO_TRACKS.map((track, index) => <article key={track.id} className={styles.audioCard}><span>{String(index + 1).padStart(2, '0')}</span><h3>{track.title}</h3><p lang="ko">{track.korean}</p><small>{track.note}</small><audio controls preload="metadata" src={track.src}>Tu navegador no puede reproducir este audio.</audio></article>)}</div>
          </section>
        ) : null}

        {section === 'chart' ? (
          <section aria-labelledby="hangul-chart-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Referencia visual</span><h2 id="hangul-chart-title">Las 24 letras y la lógica de los bloques</h2><p>Usa el mapa para comparar formas, ubicar vocales verticales u horizontales y construir tus primeras sílabas.</p></div><a className={base.secondaryButton} href="/downloads/coreano-a1/idiomaswl-hangul-chart.svg" download>Descargar SVG</a></header>
            <div className={base.chartLayout}><div className={base.chartFrame}><Image src="/downloads/coreano-a1/idiomaswl-hangul-chart.svg" alt="Tabla visual completa de las letras básicas del hangeúl" width={1600} height={1200} sizes="(max-width: 860px) 100vw, 72vw" unoptimized /></div><aside className={base.tipList} aria-label="Consejos para estudiar la tabla"><div><b>1. Separa por función</b><span>Memoriza primero vocales y luego consonantes; después combínalas.</span></div><div><b>2. Mira la dirección</b><span>ㅏ, ㅓ y ㅣ van a la derecha; ㅗ, ㅜ y ㅡ van debajo.</span></div><div><b>3. Lee en bloques</b><span>No deletrees indefinidamente: combina las partes y recupera una sola sílaba.</span></div></aside></div>
          </section>
        ) : null}

        {section === 'blocks' ? (
          <section aria-labelledby="hangul-blocks-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Construcción guiada</span><h2 id="hangul-blocks-title">Forma y desarma bloques silábicos</h2><p>Selecciona un bloque para ver sus componentes, su disposición y el papel del batchim.</p></div></header>
            <div className={base.strokeLayout}><div className={`${base.strokeGrid} ${styles.blockGrid}`}>{BLOCKS.map((candidate) => <button key={candidate.glyph} type="button" lang="ko" className={block.glyph === candidate.glyph ? base.activeStroke : ''} onClick={() => setBlock(candidate)} aria-label={`${candidate.glyph}, ${candidate.reading}`}>{candidate.glyph}</button>)}</div><div className={`${base.strokePlayer} ${styles.blockPlayer}`}><span className={styles.bigBlock} lang="ko">{block.glyph}</span><div className={styles.blockParts}>{block.parts.map((part, index) => <span key={`${part}-${index}`} lang="ko">{part}</span>)}</div><h3>{block.glyph} · {block.reading}{block.meaning ? ` · ${block.meaning}` : ''}</h3><p>{block.layout}</p><AudioButton src={AUDIO_TRACKS[2].src} label="Escuchar palabras básicas" audioRef={audioRef} /></div></div>
          </section>
        ) : null}

        {section === 'practice' ? (
          <section aria-labelledby="hangul-practice-title"><header className={base.sectionHeader}><div><span className={base.kicker}>Práctica · sesión de 10</span><h2 id="hangul-practice-title">Reconoce el hangeúl en ambas direcciones</h2><p>Cada sesión mezcla diez de las 24 letras: primero de la forma al sonido y después del sonido a la forma.</p></div></header><HangulPractice audioRef={audioRef} /></section>
        ) : null}

        {section === 'resources' ? (
          <section aria-labelledby="hangul-resources-title">
            <header className={base.sectionHeader}><div><span className={base.kicker}>Biblioteca descargable</span><h2 id="hangul-resources-title">Recursos para estudiar sin conexión</h2><p>Materiales listos para imprimir, guardar o usar en sesiones cortas de pronunciación.</p></div></header>
            <div className={base.resources}><ResourceCard icon="▦" title="Tabla visual" copy="Las 24 letras, sus lecturas y la composición de bloques." href="/downloads/coreano-a1/idiomaswl-hangul-chart.svg" label="Descargar SVG" /><ResourceCard icon="▤" title="Cuaderno A1" copy="7 páginas con explicación, audio, 32 ejercicios y soluciones." href="/downloads/coreano-a1/idiomaswl-hangul-basico-a1.pdf" label="Descargar PDF" /><ResourceCard icon="▶" title="Audio coreano" copy="Las cuatro pistas Chatterbox aprobadas, reunidas para estudiar sin conexión." href="/downloads/coreano-a1/idiomaswl-hangul-audios.zip" label="Descargar ZIP" /><ResourceCard icon="▣" title="Imagen editorial" copy="Escena coreana original utilizada como referencia visual de la unidad." href="/assets/korean/step002/kr_step002_geulja_signs_v1.png" label="Descargar imagen" /></div>
            <div className={base.faq}><details><summary>¿Debo memorizar las 24 letras en un día?</summary><p>No. Estudia grupos pequeños, combínalos de inmediato y repasa con sesiones mezcladas.</p></details><details><summary>¿Por qué ㅇ a veces no suena?</summary><p>Al inicio funciona como soporte mudo para una vocal; al final del bloque suena ng.</p></details><details><summary>¿Qué es el batchim?</summary><p>Es la consonante que ocupa la base del bloque y cierra la sílaba.</p></details><details><summary>¿Cuándo dejo la romanización?</summary><p>Desde el principio úsala solo para comprobar. Tápala en la segunda lectura.</p></details></div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function ResourceCard({ icon, title, copy, href, label }: { icon: string; title: string; copy: string; href: string; label: string }) {
  return <article className={base.resourceCard}><span aria-hidden="true">{icon}</span><h3>{title}</h3><p>{copy}</p><a href={href} download>{label} →</a></article>
}
