'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BookOpenText,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Headphones,
  Mic2,
  Pause,
  PenLine,
  Play,
  RotateCcw,
  Sparkles,
  Target,
  Volume2,
  X,
} from 'lucide-react';
import {
  IELTS_GUIDED_SET_1_AUDIO,
  IELTS_GUIDED_SET_1_LISTENING,
  IELTS_GUIDED_SET_1_READING,
  IELTS_GUIDED_SET_1_SPEAKING,
  IELTS_GUIDED_SET_1_WRITING,
  type IeltsGuidedListeningItem,
} from '@/data/ielts/guided-set-1';
import styles from './ielts-guided.module.css';

type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
type ListeningMode = 'practice' | 'review';
type ReadingMode = 'practice' | 'review';
type BandLevel = '5.5' | '9.0';

const SKILLS: Array<{ id: Skill; label: string; icon: typeof Headphones; count: number }> = [
  { id: 'listening', label: 'Listening', icon: Headphones, count: IELTS_GUIDED_SET_1_LISTENING.length },
  { id: 'reading', label: 'Reading', icon: BookOpenText, count: IELTS_GUIDED_SET_1_READING.length },
  { id: 'writing', label: 'Writing', icon: PenLine, count: 1 },
  { id: 'speaking', label: 'Speaking', icon: Mic2, count: 1 },
];

const STORAGE_KEY = 'welearn:ielts:set-1:guided:v7';
const LISTENING_SECTION_END_SECONDS = 330;

function normalize(value: string) {
  return value.trim().toLocaleLowerCase('en').replace(/\s+/g, ' ');
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainder = Math.floor(seconds % 60);
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

function FullListeningPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const duration = LISTENING_SECTION_END_SECONDS;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className={styles.fullPlayer}>
      <audio
        ref={audioRef}
        src={IELTS_GUIDED_SET_1_AUDIO}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onTimeUpdate={event => {
          setPosition(event.currentTarget.currentTime);
          if (event.currentTarget.currentTime >= LISTENING_SECTION_END_SECONDS) {
            event.currentTarget.pause();
            event.currentTarget.currentTime = LISTENING_SECTION_END_SECONDS;
            setPosition(LISTENING_SECTION_END_SECONDS);
          }
        }}
      />
      <button type="button" className={styles.fullPlayButton} onClick={toggle} aria-label={playing ? 'Pausar audio completo' : 'Reproducir audio completo'}>
        {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
      </button>
      <div className={styles.fullPlayerBody}>
        <div className={styles.fullPlayerHeading}>
          <span><Volume2 size={15} /> Audio completo · Section 1</span>
          <strong>{formatTime(position)} / {formatTime(duration)}</strong>
        </div>
        <input
          aria-label="Posición del audio completo"
          type="range"
          min={0}
          max={duration}
          step="0.1"
          value={Math.min(position, duration)}
          onChange={event => {
            const next = Number(event.target.value);
            if (audioRef.current) audioRef.current.currentTime = next;
            setPosition(next);
          }}
        />
        <small>Escucha y completa todas las respuestas. La corrección se desbloquea al terminar.</small>
      </div>
    </div>
  );
}

function EvidenceClip({ item, autoPlay = false }: { item: IeltsGuidedListeningItem; autoPlay?: boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(item.startSeconds);
  const clipDuration = item.endSeconds - item.startSeconds;
  const progress = Math.min(100, Math.max(0, ((position - item.startSeconds) / clipDuration) * 100));

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (audio.currentTime < item.startSeconds || audio.currentTime >= item.endSeconds - 0.08) {
      audio.currentTime = item.startSeconds;
      setPosition(item.startSeconds);
    }
    try {
      await audio.play();
      setPlaying(true);
    } catch {
      setPlaying(false);
    }
  };

  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio) return;
    const start = () => {
      audio.currentTime = item.startSeconds;
      setPosition(item.startSeconds);
      void audio.play().catch(() => setPlaying(false));
    };
    if (audio.readyState >= 2) start();
    else audio.addEventListener('canplay', start, { once: true });
    return () => audio.removeEventListener('canplay', start);
  }, [autoPlay, item.startSeconds]);

  return (
    <div className={styles.clip}>
      <audio
        ref={audioRef}
        src={IELTS_GUIDED_SET_1_AUDIO}
        preload="metadata"
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => {
          const audio = audioRef.current;
          if (!audio) return;
          setPosition(audio.currentTime);
          if (audio.currentTime >= item.endSeconds) {
            audio.pause();
            setPosition(item.endSeconds);
          }
        }}
      />
      <button type="button" className={styles.clipButton} onClick={toggle} aria-label={playing ? 'Pausar evidencia' : 'Escuchar evidencia'}>
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <div className={styles.clipBody}>
        <div className={styles.clipMeta}>
          <strong>{playing ? 'Reproduciendo la pista exacta' : 'Escuchar solo la evidencia'}</strong>
          <span>{formatTime(item.startSeconds)}–{formatTime(item.endSeconds)}</span>
        </div>
        <div className={styles.wave} aria-hidden="true">
          {Array.from({ length: 28 }, (_, index) => (
            <span key={index} className={index / 28 <= progress / 100 ? styles.wavePlayed : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Feedback({ correct, answer, explanation, trap }: { correct: boolean; answer: string; explanation: string; trap: string }) {
  return (
    <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status">
      <span className={styles.feedbackIcon}>{correct ? <Check size={18} /> : <X size={18} />}</span>
      <div>
        <strong>{correct ? 'Bien resuelto.' : `Respuesta: ${answer}`}</strong>
        <p>{explanation}</p>
        {!correct && <p className={styles.trap}><span>Por qué engaña:</span> {trap}</p>}
      </div>
    </div>
  );
}

export default function IeltsGuidedCoach({ readingPassage }: { readingPassage: string }) {
  const [activeSkill, setActiveSkill] = useState<Skill>('listening');
  const [listeningMode, setListeningMode] = useState<ListeningMode>('practice');
  const [readingMode, setReadingMode] = useState<ReadingMode>('practice');
  const [listeningIndex, setListeningIndex] = useState(0);
  const [readingIndex, setReadingIndex] = useState(0);
  const [listeningAnswers, setListeningAnswers] = useState<Record<number, string>>({});
  const [readingAnswers, setReadingAnswers] = useState<Record<number, string>>({});
  const [checkedListening, setCheckedListening] = useState<number[]>([]);
  const [checkedReading, setCheckedReading] = useState<number[]>([]);
  const [writingBand, setWritingBand] = useState<BandLevel>('5.5');
  const [speakingBand, setSpeakingBand] = useState<BandLevel>('5.5');
  const [writingReviewed, setWritingReviewed] = useState(false);
  const [speakingReviewed, setSpeakingReviewed] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, unknown>;
        if (saved.activeSkill && SKILLS.some(skill => skill.id === saved.activeSkill)) setActiveSkill(saved.activeSkill as Skill);
        if (saved.listeningMode === 'practice' || saved.listeningMode === 'review') setListeningMode(saved.listeningMode);
        if (saved.readingMode === 'practice' || saved.readingMode === 'review') setReadingMode(saved.readingMode);
        if (typeof saved.listeningIndex === 'number') setListeningIndex(Math.min(saved.listeningIndex, IELTS_GUIDED_SET_1_LISTENING.length - 1));
        if (typeof saved.readingIndex === 'number') setReadingIndex(Math.min(saved.readingIndex, IELTS_GUIDED_SET_1_READING.length - 1));
        if (saved.listeningAnswers && typeof saved.listeningAnswers === 'object') setListeningAnswers(saved.listeningAnswers as Record<number, string>);
        if (saved.readingAnswers && typeof saved.readingAnswers === 'object') setReadingAnswers(saved.readingAnswers as Record<number, string>);
        if (Array.isArray(saved.checkedListening)) setCheckedListening(saved.checkedListening as number[]);
        if (Array.isArray(saved.checkedReading)) setCheckedReading(saved.checkedReading as number[]);
        if (saved.writingBand === '5.5' || saved.writingBand === '9.0') setWritingBand(saved.writingBand);
        if (saved.speakingBand === '5.5' || saved.speakingBand === '9.0') setSpeakingBand(saved.speakingBand);
        if (typeof saved.writingReviewed === 'boolean') setWritingReviewed(saved.writingReviewed);
        if (typeof saved.speakingReviewed === 'boolean') setSpeakingReviewed(saved.speakingReviewed);
      } catch {
        // A corrupt local draft should never block the lesson.
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        activeSkill,
        listeningMode,
        readingMode,
        listeningIndex,
        readingIndex,
        listeningAnswers,
        readingAnswers,
        checkedListening,
        checkedReading,
        writingBand,
        speakingBand,
        writingReviewed,
        speakingReviewed,
      }));
    } catch {
      // Private browsing or a full storage quota should not block practice.
    }
  }, [activeSkill, checkedListening, checkedReading, hydrated, listeningAnswers, listeningIndex, listeningMode, readingAnswers, readingIndex, readingMode, speakingBand, speakingReviewed, writingBand, writingReviewed]);

  const listening = IELTS_GUIDED_SET_1_LISTENING[listeningIndex];
  const reading = IELTS_GUIDED_SET_1_READING[readingIndex];
  const listeningCorrect = listening.accepted.includes(normalize(listeningAnswers[listening.number] ?? ''));
  const listeningAnswered = IELTS_GUIDED_SET_1_LISTENING.filter(item => normalize(listeningAnswers[item.number] ?? '')).length;
  const listeningReady = listeningAnswered === IELTS_GUIDED_SET_1_LISTENING.length;
  const readingCorrect = reading.accepted.includes(normalize(readingAnswers[reading.number] ?? ''));
  const readingAnswered = IELTS_GUIDED_SET_1_READING.filter(item => normalize(readingAnswers[item.number] ?? '')).length;
  const readingReady = readingAnswered === IELTS_GUIDED_SET_1_READING.length;
  const writingSample = IELTS_GUIDED_SET_1_WRITING.samples[writingBand];
  const speakingSample = IELTS_GUIDED_SET_1_SPEAKING.samples[speakingBand];
  const completed = checkedListening.length + checkedReading.length + (writingReviewed ? 1 : 0) + (speakingReviewed ? 1 : 0);
  const total = IELTS_GUIDED_SET_1_LISTENING.length + IELTS_GUIDED_SET_1_READING.length + 2;
  const progress = Math.round((completed / total) * 100);
  const processSteps = activeSkill === 'reading'
    ? [['Lee', 'el pasaje completo'], ['Responde', 'por grupos'], ['Entrega', 'sin pistas previas'], ['Corrige', 'con el texto exacto']]
    : activeSkill === 'writing'
      ? [['Lee', 'la referencia 5.5'], ['Lee', 'la referencia 9'], ['Compara', 'los cuatro criterios'], ['Transfiere', 'la diferencia a tu texto']]
      : activeSkill === 'speaking'
        ? [['Escucha', 'la referencia 5.5'], ['Escucha', 'la referencia 9'], ['Compara', 'los cuatro criterios'], ['Transfiere', 'la estrategia a tu voz']]
        : [['Escucha', 'el audio completo'], ['Responde', 'toda la sección'], ['Entrega', 'sin pistas previas'], ['Corrige', 'respuesta + audio exacto']];

  const completedFor = (skill: Skill) => {
    if (skill === 'listening') return checkedListening.length;
    if (skill === 'reading') return checkedReading.length;
    if (skill === 'writing') return writingReviewed ? 1 : 0;
    return speakingReviewed ? 1 : 0;
  };

  const reset = () => {
    if (!window.confirm('¿Quieres borrar el progreso de esta guía en este dispositivo?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setActiveSkill('listening');
    setListeningMode('practice');
    setReadingMode('practice');
    setListeningIndex(0);
    setReadingIndex(0);
    setListeningAnswers({});
    setReadingAnswers({});
    setCheckedListening([]);
    setCheckedReading([]);
    setWritingBand('5.5');
    setSpeakingBand('5.5');
    setWritingReviewed(false);
    setSpeakingReviewed(false);
  };

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <div className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan">
          <Link href="/examenes/ielts"><ArrowLeft size={15} /> IELTS</Link>
          <span>/</span>
          <span aria-current="page">Set 1 · Modo guiado</span>
        </nav>

        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span className={styles.eyebrow}><Sparkles size={14} /> Tutor de bolsillo · piloto</span>
            <h1>Entiende la respuesta.<br /><em>No solo la mires.</em></h1>
            <p>Primero haces la sección como en el examen. Al terminar, corriges una respuesta a la vez con el segundo exacto del audio o la línea precisa del texto.</p>
            <div className={styles.heroActions}>
              <button type="button" onClick={() => document.getElementById('guided-workspace')?.scrollIntoView({ behavior: 'smooth' })}>Continuar la guía <ArrowRight size={17} /></button>
              <Link href="/examenes/ielts/practica/set-1">Ir al modo examen</Link>
            </div>
          </div>
          <aside className={styles.progressCard} aria-label="Progreso de la guía">
            <div className={styles.progressTop}><span>Tu recorrido</span><strong>{progress}%</strong></div>
            <div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div>
            <p><strong>{completed} de {total}</strong> micro-retos revisados</p>
            <div className={styles.progressSkills}>
              {SKILLS.map(skill => <span key={skill.id}><skill.icon size={15} />{completedFor(skill.id)}/{skill.count}</span>)}
            </div>
            <small>{hydrated ? 'Progreso guardado en este dispositivo' : 'Recuperando tu progreso…'}</small>
          </aside>
        </header>

        <section className={styles.promiseStrip} aria-label="Cómo funciona">
          {processSteps.map(([title, detail], index) => <div key={`${index}-${title}`}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{detail}</small></div>)}
        </section>

        <section id="guided-workspace" className={styles.workspace}>
          <aside className={styles.skillRail}>
            <div className={styles.railHeading}><span>IELTS Academic</span><strong>Set 1 guiado</strong></div>
            <div className={styles.skillButtons}>
              {SKILLS.map(skill => {
                const Icon = skill.icon;
                const done = completedFor(skill.id);
                return (
                  <button key={skill.id} type="button" className={activeSkill === skill.id ? styles.skillActive : undefined} onClick={() => setActiveSkill(skill.id)}>
                    <span className={styles.skillIcon}><Icon size={19} /></span>
                    <span><strong>{skill.label}</strong><small>{done === skill.count ? 'Completado' : `${done}/${skill.count} revisados`}</small></span>
                    {done === skill.count ? <CheckCircle2 className={styles.skillDone} size={18} /> : <ArrowRight size={16} />}
                  </button>
                );
              })}
            </div>
            <div className={styles.railNote}><Target size={18} /><p><strong>Regla del modo guía</strong>Primero completas la sección. Las respuestas y la evidencia aparecen únicamente durante la corrección.</p></div>
          </aside>

          <div className={styles.lesson}>
            {activeSkill === 'listening' && (
              <>
                <div className={styles.lessonHeader}>
                  <div><span className={styles.lessonTag}>Listening · Section 1</span><h2>{listeningMode === 'practice' ? 'Escucha primero. Corrige después.' : 'Ahora sí: entiende cada respuesta.'}</h2><p>{listeningMode === 'practice' ? 'Reproduce el audio y completa las cuatro respuestas. No verás claves ni pistas hasta entregar la sección.' : 'Avanza pregunta por pregunta. Cada corrección incluye el fragmento exacto donde se escucha la respuesta.'}</p></div>
                  <span className={styles.lessonCount}>{listeningMode === 'practice' ? 'Fase 1 · Resolver' : `Corrección ${listeningIndex + 1}/${IELTS_GUIDED_SET_1_LISTENING.length}`}</span>
                </div>
                {listeningMode === 'practice' ? (
                  <div className={styles.listeningPractice}>
                    <FullListeningPlayer />
                    <div className={styles.answerSheetHeading}>
                      <div><span>Hoja de respuestas</span><strong>{listeningAnswered} de {IELTS_GUIDED_SET_1_LISTENING.length} contestadas</strong></div>
                      <small>ONE WORD ONLY</small>
                    </div>
                    <div className={styles.listeningQuestionStack}>
                      {IELTS_GUIDED_SET_1_LISTENING.map(item => (
                        <label key={item.number} className={styles.listeningQuestionRow}>
                          <span className={styles.listeningNumber}>{item.number}</span>
                          <span className={styles.listeningPrompt}><small>{item.prompt}</small><strong>{item.frame}</strong></span>
                          <input
                            aria-label={`Respuesta de la pregunta ${item.number}`}
                            value={listeningAnswers[item.number] ?? ''}
                            onChange={event => setListeningAnswers(current => ({ ...current, [item.number]: event.target.value }))}
                            placeholder="Tu respuesta"
                            autoComplete="off"
                          />
                        </label>
                      ))}
                    </div>
                    <div className={styles.submitSection}>
                      <div><ClipboardCheck size={20} /><p><strong>¿Terminaste de escuchar?</strong><span>Al entregar, comenzaremos la corrección desde la pregunta 1.</span></p></div>
                      <button
                        type="button"
                        className={styles.primaryButton}
                        disabled={!listeningReady}
                        onClick={() => {
                          setListeningIndex(0);
                          setListeningMode('review');
                          const firstNumber = IELTS_GUIDED_SET_1_LISTENING[0].number;
                          setCheckedListening(current => current.includes(firstNumber) ? current : [...current, firstNumber]);
                        }}
                      >Entregar y corregir <ArrowRight size={16} /></button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.correctionFlow}>
                    <div className={styles.correctionSteps} aria-label="Progreso de corrección">
                      {IELTS_GUIDED_SET_1_LISTENING.map((item, index) => <span key={item.number} className={index <= listeningIndex ? styles.correctionStepActive : undefined}>{index < listeningIndex ? <Check size={13} /> : index + 1}</span>)}
                    </div>
                    <div className={styles.questionCard}>
                      <div className={styles.questionMeta}><span>Pregunta {listening.number}</span><small>{listening.prompt}</small></div>
                      <h3>{listening.frame}</h3>
                      <div className={styles.answerComparison}>
                        <div><span>Tu respuesta</span><strong>{listeningAnswers[listening.number]}</strong></div>
                        <div className={listeningCorrect ? styles.answerRight : styles.answerCorrection}><span>Respuesta correcta</span><strong>{listening.answer} {listeningCorrect && <Check size={16} />}</strong></div>
                      </div>
                      <Feedback correct={listeningCorrect} answer={listening.answer} explanation={listening.explanation} trap={listening.trap} />
                      <div className={styles.evidenceBlock}>
                        <div className={styles.evidenceHeading}><span>Aquí se escucha la respuesta</span><small>Fragmento exacto · púlsalo y repítelo</small></div>
                        <EvidenceClip key={listening.number} item={listening} autoPlay />
                        <blockquote>“{listening.audiblePhrase}”</blockquote>
                      </div>
                    </div>
                    <div className={styles.lessonFooter}>
                      <button type="button" className={styles.secondaryButton} onClick={() => listeningIndex === 0 ? setListeningMode('practice') : setListeningIndex(index => index - 1)}><ArrowLeft size={16} /> {listeningIndex === 0 ? 'Volver a respuestas' : 'Anterior'}</button>
                      <span>Repite el fragmento hasta reconocer la palabra y el distractor.</span>
                      {listeningIndex < IELTS_GUIDED_SET_1_LISTENING.length - 1 ? (
                        <button type="button" className={styles.primaryButton} onClick={() => {
                          const nextIndex = listeningIndex + 1;
                          setListeningIndex(nextIndex);
                          const nextNumber = IELTS_GUIDED_SET_1_LISTENING[nextIndex].number;
                          setCheckedListening(current => current.includes(nextNumber) ? current : [...current, nextNumber]);
                        }}>Siguiente corrección <ArrowRight size={16} /></button>
                      ) : (
                        <button type="button" className={styles.primaryButton} onClick={() => setActiveSkill('reading')}>Continuar con Reading <ArrowRight size={16} /></button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}

            {activeSkill === 'reading' && (
              <>
                <div className={styles.lessonHeader}>
                  <div><span className={styles.lessonTag}>Reading · Passage 1</span><h2>{readingMode === 'practice' ? 'Lee y responde. La evidencia viene después.' : 'Corrige siguiendo la huella del texto.'}</h2><p>{readingMode === 'practice' ? 'Trabaja con el pasaje y completa la hoja de respuestas sin pistas. Al entregar, revisaremos cada decisión.' : 'Compara tu respuesta y mira la frase exacta que la confirma, la contradice o completa el espacio.'}</p></div>
                  <span className={styles.lessonCount}>{readingMode === 'practice' ? 'Fase 1 · Resolver' : `Corrección ${readingIndex + 1}/${IELTS_GUIDED_SET_1_READING.length}`}</span>
                </div>
                {readingMode === 'practice' ? (
                  <div className={styles.readingPractice}>
                    <article className={styles.passagePanel}>
                      <div className={styles.passageTopbar}><span>Reading Passage 1</span><small>Texto de referencia</small></div>
                      <h3>Bakelite</h3>
                      <div className={styles.passageCopy}>
                        {readingPassage.split('\n\n').map((paragraph, index) => <p key={index}><span aria-hidden="true">{String.fromCharCode(65 + index)}</span>{paragraph}</p>)}
                      </div>
                    </article>
                    <aside className={styles.readingSheet}>
                      <div className={styles.readingSheetHeader}>
                        <span>Hoja de respuestas</span>
                        <strong>{readingAnswered} de {IELTS_GUIDED_SET_1_READING.length} contestadas</strong>
                        <small>Estas preguntas representan dos grupos del Passage 1.</small>
                      </div>
                      <div className={styles.questionGroupLabel}><span>Questions 1–3</span><strong>Summary completion</strong></div>
                      {IELTS_GUIDED_SET_1_READING.slice(0, 1).map(item => (
                        <div key={item.number} className={styles.readingQuestionCompact}>
                          <div><span>{item.number}</span><p>{item.prompt}</p></div>
                          <label><span>ONE WORD ONLY</span><input aria-label={`Respuesta de Reading ${item.number}`} value={readingAnswers[item.number] ?? ''} onChange={event => setReadingAnswers(current => ({ ...current, [item.number]: event.target.value }))} placeholder="Tu respuesta" autoComplete="off" /></label>
                        </div>
                      ))}
                      <div className={styles.questionGroupLabel}><span>Questions 11–13</span><strong>TRUE / FALSE / NOT GIVEN</strong></div>
                      {IELTS_GUIDED_SET_1_READING.slice(1).map(item => (
                        <div key={item.number} className={styles.readingQuestionCompact}>
                          <div><span>{item.number}</span><p>{item.prompt}</p></div>
                          <div className={styles.compactChoices}>
                            {item.options?.map(option => <button key={option} type="button" className={readingAnswers[item.number] === option ? styles.choiceSelected : undefined} onClick={() => setReadingAnswers(current => ({ ...current, [item.number]: option }))}>{option}</button>)}
                          </div>
                        </div>
                      ))}
                      <div className={styles.readingSubmit}>
                        <p><strong>Entrega cuando termines.</strong><span>Después aparecerá la evidencia exacta, una pregunta a la vez.</span></p>
                        <button type="button" className={styles.primaryButton} disabled={!readingReady} onClick={() => {
                          setReadingIndex(0);
                          setReadingMode('review');
                          const firstNumber = IELTS_GUIDED_SET_1_READING[0].number;
                          setCheckedReading(current => current.includes(firstNumber) ? current : [...current, firstNumber]);
                        }}>Entregar y corregir <ArrowRight size={16} /></button>
                      </div>
                    </aside>
                    </div>
                  ) : (
                    <div className={styles.correctionFlow}>
                      <div className={styles.correctionSteps} aria-label="Progreso de corrección de Reading">
                        {IELTS_GUIDED_SET_1_READING.map((item, index) => <span key={item.number} className={index <= readingIndex ? styles.correctionStepActive : undefined}>{index < readingIndex ? <Check size={13} /> : index + 1}</span>)}
                      </div>
                      <div className={styles.questionCard}>
                        <div className={styles.questionMeta}><span>Pregunta {reading.number}</span><small>{reading.kind === 'choice' ? 'TRUE / FALSE / NOT GIVEN' : 'ONE WORD ONLY'}</small></div>
                        <h3>{reading.prompt}</h3>
                        <div className={styles.answerComparison}>
                          <div><span>Tu respuesta</span><strong>{readingAnswers[reading.number]}</strong></div>
                          <div className={readingCorrect ? styles.answerRight : styles.answerCorrection}><span>Respuesta correcta</span><strong>{reading.answer} {readingCorrect && <Check size={16} />}</strong></div>
                        </div>
                      <Feedback correct={readingCorrect} answer={reading.answer} explanation={reading.explanation} trap={reading.trap} />
                      <div className={styles.readingEvidence}>
                          <div className={styles.evidenceHeading}><span>Aquí está la respuesta</span><small>Pasaje 1 · evidencia exacta resaltada</small></div>
                        <p>{reading.evidenceBefore}<mark>{reading.evidenceFocus}</mark>{reading.evidenceAfter}</p>
                      </div>
                      </div>
                      <div className={styles.lessonFooter}>
                        <button type="button" className={styles.secondaryButton} onClick={() => readingIndex === 0 ? setReadingMode('practice') : setReadingIndex(index => index - 1)}><ArrowLeft size={16} /> {readingIndex === 0 ? 'Volver a respuestas' : 'Anterior'}</button>
                        <span>Observa la paráfrasis: la evidencia no siempre repite las palabras de la pregunta.</span>
                        {readingIndex < IELTS_GUIDED_SET_1_READING.length - 1 ? (
                          <button type="button" className={styles.primaryButton} onClick={() => {
                            const nextIndex = readingIndex + 1;
                            setReadingIndex(nextIndex);
                            const nextNumber = IELTS_GUIDED_SET_1_READING[nextIndex].number;
                            setCheckedReading(current => current.includes(nextNumber) ? current : [...current, nextNumber]);
                          }}>Siguiente corrección <ArrowRight size={16} /></button>
                        ) : (
                          <button type="button" className={styles.primaryButton} onClick={() => setActiveSkill('writing')}>Continuar con Writing <ArrowRight size={16} /></button>
                        )}
                      </div>
                    </div>
                  )}
              </>
            )}

            {activeSkill === 'writing' && (
              <>
                <div className={styles.lessonHeader}>
                  <div><span className={styles.lessonTag}>Writing · Task 2</span><h2>La diferencia entre 5.5 y 9, sobre la página</h2><p>Dos respuestas originales a la misma tarea. Cambia de banda y observa qué ocurre con la postura, el desarrollo, el vocabulario y la gramática.</p></div>
                  <span className={styles.lessonCount}>2 referencias</span>
                </div>
                <div className={styles.referenceLayout}>
                  <div className={styles.promptCard}><span>Pregunta</span><p>{IELTS_GUIDED_SET_1_WRITING.prompt}</p></div>
                  <div className={styles.bandSelector} aria-label="Elegir referencia de Writing">
                    {(['5.5', '9.0'] as BandLevel[]).map(band => <button key={band} type="button" className={writingBand === band ? styles.bandActive : undefined} onClick={() => setWritingBand(band)}><span>Banda</span><strong>{band === '9.0' ? '9' : band}</strong><small>{band === '5.5' ? 'Competente, con límites' : 'Avanzada y precisa'}</small></button>)}
                  </div>
                  <article className={styles.samplePaper}>
                    <div className={styles.samplePaperTop}><div><span>{writingSample.label}</span><strong>Respuesta completa</strong></div><small>{writingSample.wordCount} palabras</small></div>
                    <p className={styles.sampleVerdict}>{writingSample.verdict}</p>
                    <div className={styles.essayCopy}>{writingSample.answer.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
                  </article>
                  <div className={styles.criteriaSection}>
                    <div className={styles.criteriaHeading}><span>Lectura por criterios</span><small>Perfil pedagógico aproximado</small></div>
                    <div className={styles.criteriaGrid}>{writingSample.criteria.map(([criterion, note], index) => <div key={criterion}><span>0{index + 1}</span><strong>{criterion}</strong><p>{note}</p></div>)}</div>
                  </div>
                  <div className={styles.noticeStrip}><span>Fíjate especialmente en</span>{writingSample.notice.map(item => <strong key={item}><Check size={14} />{item}</strong>)}</div>
                  <div className={styles.referenceNote}><Sparkles size={17} /><p><strong>No memorices la respuesta.</strong> Compara la función de cada párrafo y la precisión del lenguaje. La banda mostrada es una referencia pedagógica de WeLearn, no una calificación oficial.</p></div>
                  <div className={styles.referenceActions}>
                    <button type="button" className={styles.secondaryButton} onClick={() => setWritingBand(writingBand === '5.5' ? '9.0' : '5.5')}>Ver banda {writingBand === '5.5' ? '9' : '5.5'}</button>
                    <button type="button" className={styles.primaryButton} onClick={() => setWritingReviewed(true)}>{writingReviewed ? <><Check size={16} /> Comparación revisada</> : 'Marcar como revisada'}</button>
                  </div>
                </div>
                <div className={styles.lessonFooter}><span>Abre ambas bandas antes de pasar a Speaking.</span><button type="button" className={styles.primaryButton} disabled={!writingReviewed} onClick={() => setActiveSkill('speaking')}>Ir a Speaking <ArrowRight size={16} /></button></div>
              </>
            )}

            {activeSkill === 'speaking' && (
              <>
                <div className={styles.lessonHeader}>
                  <div><span className={styles.lessonTag}>Speaking · Part 2</span><h2>{speakingSample.audio.ready ? 'Escucha cómo cambia una respuesta de 5.5 a 9' : 'Compara una respuesta de 5.5 con una de banda 9'}</h2><p>La misma cue card, dos desarrollos. Compara continuidad, precisión, variedad gramatical y profundidad antes de practicar con tu propia voz.</p></div>
                  <span className={styles.lessonCount}>2 referencias</span>
                </div>
                <div className={styles.referenceLayout}>
                  <div className={styles.cueCard}>
                    <span>Cue card</span>
                    <h3>{IELTS_GUIDED_SET_1_SPEAKING.cueCard}</h3>
                    <p>You should say:</p>
                    <ul>{IELTS_GUIDED_SET_1_SPEAKING.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul>
                  </div>
                  <div className={styles.bandSelector} aria-label="Elegir referencia de Speaking">
                    {(['5.5', '9.0'] as BandLevel[]).map(band => <button key={band} type="button" className={speakingBand === band ? styles.bandActive : undefined} onClick={() => setSpeakingBand(band)}><span>Banda</span><strong>{band === '9.0' ? '9' : band}</strong><small>{band === '5.5' ? 'Clara, pero limitada' : 'Flexible y desarrollada'}</small></button>)}
                  </div>
                  <article className={styles.speakingSample}>
                    <div className={styles.samplePaperTop}><div><span>{speakingSample.label}</span><strong>Respuesta narrada</strong></div><small>Part 2 · ejemplo</small></div>
                    <p className={styles.sampleVerdict}>{speakingSample.verdict}</p>
                    {speakingSample.audio.ready ? (
                      <audio key={speakingBand} controls preload="metadata" src={speakingSample.audio.url}>Tu navegador no puede reproducir este audio.</audio>
                    ) : (
                      <div className={styles.audioPending} role="status">
                        <div><Volume2 size={19} /><span>Audio final</span></div>
                        <strong>Preparado para Chatterbox</strong>
                        <p>El guion ya está cerrado. El reproductor se activará automáticamente cuando las dos voces pasen la revisión final.</p>
                      </div>
                    )}
                    <details className={styles.transcript}><summary>Leer transcripción completa</summary><div>{speakingSample.transcript.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></details>
                  </article>
                  <div className={styles.criteriaSection}>
                    <div className={styles.criteriaHeading}><span>Lectura por criterios</span><small>Perfil pedagógico aproximado</small></div>
                    <div className={styles.criteriaGrid}>{speakingSample.criteria.map(([criterion, note], index) => <div key={criterion}><span>0{index + 1}</span><strong>{criterion}</strong><p>{note}</p></div>)}</div>
                  </div>
                  <div className={styles.referenceNote}><Volume2 size={17} /><p><strong>Referencia pedagógica, no voz de candidato.</strong> El audio Chatterbox servirá para seguir el guion y su ritmo. La banda se explica por el contenido y los criterios; la pronunciación real siempre debe evaluarse en la voz del candidato.</p></div>
                  <div className={styles.referenceActions}>
                    <button type="button" className={styles.secondaryButton} onClick={() => setSpeakingBand(speakingBand === '5.5' ? '9.0' : '5.5')}>{speakingSample.audio.ready ? 'Escuchar' : 'Ver'} banda {speakingBand === '5.5' ? '9' : '5.5'}</button>
                    <button type="button" className={styles.primaryButton} onClick={() => setSpeakingReviewed(true)}>{speakingReviewed ? <><Check size={16} /> Comparación revisada</> : 'Marcar como revisada'}</button>
                  </div>
                  {speakingReviewed && <div className={styles.completionCard} role="status"><CheckCircle2 size={30} /><div><strong>Recorrido comparativo completo</strong><p>Ya tienes dos referencias claras para detectar qué cambia entre una respuesta suficiente y una respuesta avanzada.</p></div></div>}
                </div>
              </>
            )}
          </div>
        </section>

        <footer className={styles.pageFooter}>
          <div><strong>Práctica original y no oficial de WeLearn.</strong><span>Los clips y las citas están ligados a la evidencia revisada del Set 1. El progreso mide esta guía, no una banda IELTS.</span></div>
          <button type="button" onClick={reset}><RotateCcw size={15} /> Reiniciar progreso</button>
        </footer>
      </div>
    </main>
  );
}
