'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
import type {
  IeltsGuidedMockData,
  IeltsGuidedObjectiveItem,
  IeltsGuidedUnit,
} from '@/data/ielts/guided-mock';
import {
  getIeltsGuidedCorrectItemIds,
  normalizeIeltsGuidedAnswer,
  sanitizeIeltsGuidedIndex,
} from '@/data/ielts/guided-mock';
import styles from './ielts-guided.module.css';

type Skill = 'listening' | 'reading' | 'writing' | 'speaking';
type GuidedMode = 'practice' | 'review';
type BandLevel = '5.5' | '9.0';

function safeStringRecord(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === 'string'));
}

function formatTimestamp(seconds: number) {
  const safeSeconds = Math.max(0, Math.floor(seconds));
  return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, '0')}`;
}

function UnitPicker({ units, activeIndex, onChange }: {
  units: readonly IeltsGuidedUnit[];
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className={styles.correctionSteps} aria-label="Elegir bloque de práctica">
      {units.map((unit, index) => (
        <button
          key={unit.id}
          type="button"
          className={index === activeIndex ? styles.correctionStepActive : undefined}
          onClick={() => onChange(index)}
          aria-label={`Parte ${unit.part}, bloque ${unit.segment}`}
        >
          {unit.part}.{unit.segment}
        </button>
      ))}
    </div>
  );
}

function AnswerControl({ item, value, onChange }: {
  item: IeltsGuidedObjectiveItem;
  value: string;
  onChange: (value: string) => void;
}) {
  if (item.kind === 'choice') {
    return (
      <div className={styles.compactChoices}>
        {item.options?.map(option => (
          <button
            key={option}
            type="button"
            className={value === option ? styles.choiceSelected : undefined}
            onClick={() => onChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
    );
  }
  return (
    <input
      aria-label={`Respuesta de la pregunta ${item.number}`}
      value={value}
      onChange={event => onChange(event.target.value)}
      placeholder="Tu respuesta"
      autoComplete="off"
    />
  );
}

function Feedback({ correct, item }: { correct: boolean; item: IeltsGuidedObjectiveItem }) {
  if (item.evidence.status === 'pending-independent-review') {
    return (
      <div className={styles.audioPending} role="status">
        <strong>Corrección pendiente de revisión independiente</strong>
        <p>La clave y el fragmento no se muestran hasta que otra persona valide la nueva evidencia.</p>
      </div>
    );
  }
  return (
    <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackWrong}`} role="status">
      <span className={styles.feedbackIcon}>{correct ? <Check size={18} /> : <X size={18} />}</span>
      <div>
        <strong>{correct ? 'Bien resuelto.' : `Respuesta: ${item.answer}`}</strong>
        <p>{item.explanation}</p>
        {!correct && <p className={styles.trap}><span>Por qué engaña:</span> {item.trap}</p>}
      </div>
    </div>
  );
}

function EvidenceClip({ unit, item }: { unit: IeltsGuidedUnit; item: IeltsGuidedObjectiveItem }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [position, setPosition] = useState(item.audioClip?.startSeconds ?? 0);
  if (!unit.audioUrl || !item.audioClip) return null;
  const clip = item.audioClip;
  const duration = Math.max(0.1, clip.endSeconds - clip.startSeconds);
  const progress = Math.min(100, Math.max(0, ((position - clip.startSeconds) / duration) * 100));

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.currentTime < clip.startSeconds || audio.currentTime >= clip.endSeconds - 0.08) {
      audio.currentTime = clip.startSeconds;
      setPosition(clip.startSeconds);
    }
    try {
      await audio.play();
    } catch {
      setPlaying(false);
    }
  };

  return (
    <div className={styles.clip}>
      <audio
        ref={audioRef}
        src={unit.audioUrl}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={event => {
          setPosition(event.currentTarget.currentTime);
          if (event.currentTarget.currentTime >= clip.endSeconds) {
            event.currentTarget.pause();
            event.currentTarget.currentTime = clip.endSeconds;
            setPosition(clip.endSeconds);
          }
        }}
      />
      <button type="button" className={styles.clipButton} onClick={toggle} aria-label={playing ? 'Pausar evidencia' : 'Escuchar evidencia'}>
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <div className={styles.clipBody}>
        <div className={styles.clipMeta}><strong>{playing ? 'Reproduciendo la pista exacta' : 'Escuchar sólo la evidencia'}</strong><span>{clip.startSeconds.toFixed(1)}s–{clip.endSeconds.toFixed(1)}s</span></div>
        <div className={styles.wave} aria-hidden="true">{Array.from({ length: 28 }, (_, index) => <span key={index} className={index / 28 <= progress / 100 ? styles.wavePlayed : undefined} />)}</div>
      </div>
    </div>
  );
}

function PracticeAudio({ unit }: { unit: IeltsGuidedUnit }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const segments = unit.practiceSegments ?? [];
  const [segmentIndex, setSegmentIndex] = useState(0);
  const segment = segments[segmentIndex];
  const [position, setPosition] = useState(segment?.startSeconds ?? 0);
  if (!unit.audioUrl || !segment) return null;

  const seek = (nextPosition: number) => {
    const bounded = Math.min(segment.endSeconds, Math.max(segment.startSeconds, nextPosition));
    if (audioRef.current) audioRef.current.currentTime = bounded;
    setPosition(bounded);
  };

  const chooseSegment = (index: number) => {
    const next = segments[index];
    if (!next) return;
    audioRef.current?.pause();
    setSegmentIndex(index);
    if (audioRef.current) audioRef.current.currentTime = next.startSeconds;
    setPosition(next.startSeconds);
  };

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    if (audio.currentTime < segment.startSeconds || audio.currentTime >= segment.endSeconds - 0.08) seek(segment.startSeconds);
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
        src={unit.audioUrl}
        preload="metadata"
        onLoadedMetadata={() => seek(segment.startSeconds)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={event => {
          const current = event.currentTarget.currentTime;
          setPosition(current);
          if (current >= segment.endSeconds) {
            event.currentTarget.pause();
            seek(segment.endSeconds);
          }
        }}
      />
      <button type="button" className={styles.fullPlayButton} onClick={toggle} aria-label={playing ? 'Pausar bloque' : 'Reproducir bloque'}>
        {playing ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
      </button>
      <div className={styles.fullPlayerBody}>
        <div className={styles.fullPlayerHeading}>
          <span><Volume2 size={15} /> Fragmento verificado {segmentIndex + 1}/{segments.length}</span>
          <strong>{formatTimestamp(position)} / {formatTimestamp(segment.endSeconds)}</strong>
        </div>
        {segments.length > 1 && (
          <div className={styles.segmentPicker} aria-label="Fragmentos verificados del bloque">
            {segments.map((current, index) => (
              <button key={`${current.startSeconds}-${current.endSeconds}`} type="button" aria-pressed={index === segmentIndex} onClick={() => chooseSegment(index)}>
                {index + 1} · P{current.questionNumbers.join('/')}
              </button>
            ))}
          </div>
        )}
        <input
          aria-label="Posición dentro del fragmento verificado"
          type="range"
          min={segment.startSeconds}
          max={segment.endSeconds}
          step="0.1"
          value={Math.min(segment.endSeconds, Math.max(segment.startSeconds, position))}
          onChange={event => seek(Number(event.target.value))}
        />
        <small>Estos fragmentos breves provienen de cortes ya aprobados; no se presentan como límites oficiales de la parte.</small>
      </div>
    </div>
  );
}

function SourceEvidence({ unit, item }: { unit: IeltsGuidedUnit; item: IeltsGuidedObjectiveItem }) {
  if (item.evidence.status === 'pending-independent-review') {
    return (
      <div className={styles.audioPending} role="status">
        <strong>Evidencia en revisión</strong>
        <p>Este fragmento queda cerrado hasta completar una revisión independiente.</p>
      </div>
    );
  }
  return (
    <div className={unit.skill === 'reading' ? styles.readingEvidence : styles.evidenceBlock}>
      <div className={styles.evidenceHeading}>
        <span>{unit.skill === 'listening' ? 'Aquí se escucha la respuesta' : 'Aquí se sustenta la respuesta'}</span>
        <small>Evidencia aprobada y vinculada a esta pregunta</small>
      </div>
      {unit.skill === 'listening' && <EvidenceClip unit={unit} item={item} />}
      <p>{item.evidence.before}<mark>{item.evidence.focus}</mark>{item.evidence.after}</p>
    </div>
  );
}

function ReferencePending({ skill }: { skill: 'Writing' | 'Speaking' }) {
  return (
    <div className={styles.referenceLayout}>
      <div className={styles.audioPending} role="status">
        <div>{skill === 'Writing' ? <PenLine size={19} /> : <Mic2 size={19} />}<span>{skill}</span></div>
        <strong>Referencia separada del banco objetivo</strong>
        <p>Este set conserva sus tareas originales. Los ejemplos de bandas 5.5 y 9 se conectan desde un módulo editorial independiente para que una actualización no altere preguntas, claves ni evidencias.</p>
      </div>
    </div>
  );
}

export default function IeltsGuidedMockCoach({ data }: { data: IeltsGuidedMockData }) {
  const [activeSkill, setActiveSkill] = useState<Skill>('listening');
  const [listeningUnitIndex, setListeningUnitIndex] = useState(0);
  const [readingUnitIndex, setReadingUnitIndex] = useState(0);
  const [listeningItemIndex, setListeningItemIndex] = useState(0);
  const [readingItemIndex, setReadingItemIndex] = useState(0);
  const [listeningMode, setListeningMode] = useState<GuidedMode>('practice');
  const [readingMode, setReadingMode] = useState<GuidedMode>('practice');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [reviewed, setReviewed] = useState<string[]>([]);
  const [writingBand, setWritingBand] = useState<BandLevel>('5.5');
  const [speakingBand, setSpeakingBand] = useState<BandLevel>('5.5');
  const [writingReviewed, setWritingReviewed] = useState(false);
  const [speakingReviewed, setSpeakingReviewed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const storageKey = `welearn:ielts:${data.mockId}:guided:v1`;

  const listeningUnit = data.listeningUnits[listeningUnitIndex];
  const readingUnit = data.readingUnits[readingUnitIndex];
  const listeningItem = listeningUnit.items[listeningItemIndex];
  const readingItem = readingUnit.items[readingItemIndex];
  const objectiveItems = useMemo(
    () => [...data.listeningUnits.flatMap(unit => unit.items), ...data.readingUnits.flatMap(unit => unit.items)],
    [data.listeningUnits, data.readingUnits],
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? '{}') as Record<string, unknown>;
        if (['listening', 'reading', 'writing', 'speaking'].includes(String(saved.activeSkill))) setActiveSkill(saved.activeSkill as Skill);
        setListeningUnitIndex(sanitizeIeltsGuidedIndex(saved.listeningUnitIndex, data.listeningUnits.length));
        setReadingUnitIndex(sanitizeIeltsGuidedIndex(saved.readingUnitIndex, data.readingUnits.length));
        setAnswers(safeStringRecord(saved.answers));
        if (Array.isArray(saved.reviewed)) setReviewed(saved.reviewed.filter((value): value is string => typeof value === 'string' && objectiveItems.some(item => item.id === value)));
        if (saved.writingBand === '5.5' || saved.writingBand === '9.0') setWritingBand(saved.writingBand);
        if (saved.speakingBand === '5.5' || saved.speakingBand === '9.0') setSpeakingBand(saved.speakingBand);
        if (typeof saved.writingReviewed === 'boolean') setWritingReviewed(saved.writingReviewed);
        if (typeof saved.speakingReviewed === 'boolean') setSpeakingReviewed(saved.speakingReviewed);
      } catch {
        // A corrupt local draft should never block practice.
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [data.listeningUnits.length, data.readingUnits.length, objectiveItems, storageKey]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        activeSkill,
        listeningUnitIndex,
        readingUnitIndex,
        answers,
        reviewed,
        writingBand,
        speakingBand,
        writingReviewed,
        speakingReviewed,
      }));
    } catch {
      // Storage is an enhancement, never a requirement.
    }
  }, [activeSkill, answers, hydrated, listeningUnitIndex, readingUnitIndex, reviewed, speakingBand, speakingReviewed, storageKey, writingBand, writingReviewed]);

  const listeningReviewed = data.listeningUnits.flatMap(unit => unit.items).filter(item => reviewed.includes(item.id)).length;
  const readingReviewed = data.readingUnits.flatMap(unit => unit.items).filter(item => reviewed.includes(item.id)).length;
  const total = objectiveItems.length + (data.references.writing ? 1 : 0) + (data.references.speaking ? 1 : 0);
  const completed = listeningReviewed + readingReviewed + (writingReviewed ? 1 : 0) + (speakingReviewed ? 1 : 0);
  const progress = total ? Math.round((completed / total) * 100) : 0;

  const skillRows = [
    { id: 'listening' as const, label: 'Listening', icon: Headphones, count: 40, done: listeningReviewed },
    { id: 'reading' as const, label: 'Reading', icon: BookOpenText, count: 40, done: readingReviewed },
    { id: 'writing' as const, label: 'Writing', icon: PenLine, count: data.references.writing ? 1 : 0, done: writingReviewed ? 1 : 0 },
    { id: 'speaking' as const, label: 'Speaking', icon: Mic2, count: data.references.speaking ? 1 : 0, done: speakingReviewed ? 1 : 0 },
  ];

  const setAnswer = (item: IeltsGuidedObjectiveItem, value: string) => setAnswers(current => ({ ...current, [item.id]: value }));
  const correctItemIds = useMemo(() => getIeltsGuidedCorrectItemIds(objectiveItems, answers), [answers, objectiveItems]);
  const isCorrect = (item: IeltsGuidedObjectiveItem) => correctItemIds.has(item.id);
  const unitReady = (unit: IeltsGuidedUnit) => unit.items.every(item => normalizeIeltsGuidedAnswer(answers[item.id] ?? ''));
  const markReviewed = (item: IeltsGuidedObjectiveItem) => setReviewed(current => current.includes(item.id) ? current : [...current, item.id]);

  const reset = () => {
    if (!window.confirm('¿Quieres borrar el progreso de esta guía en este dispositivo?')) return;
    localStorage.removeItem(storageKey);
    setActiveSkill('listening');
    setListeningUnitIndex(0);
    setReadingUnitIndex(0);
    setListeningItemIndex(0);
    setReadingItemIndex(0);
    setListeningMode('practice');
    setReadingMode('practice');
    setAnswers({});
    setReviewed([]);
    setWritingReviewed(false);
    setSpeakingReviewed(false);
  };

  const renderObjectiveSkill = (skill: 'listening' | 'reading') => {
    const isListening = skill === 'listening';
    const units = isListening ? data.listeningUnits : data.readingUnits;
    const unitIndex = isListening ? listeningUnitIndex : readingUnitIndex;
    const unit = isListening ? listeningUnit : readingUnit;
    const itemIndex = isListening ? listeningItemIndex : readingItemIndex;
    const item = isListening ? listeningItem : readingItem;
    const mode = isListening ? listeningMode : readingMode;
    const setUnitIndex = isListening ? setListeningUnitIndex : setReadingUnitIndex;
    const setItemIndex = isListening ? setListeningItemIndex : setReadingItemIndex;
    const setMode = isListening ? setListeningMode : setReadingMode;
    const label = isListening ? 'Listening' : 'Reading';

    const changeUnit = (index: number) => {
      setUnitIndex(index);
      setItemIndex(0);
      setMode('practice');
    };

    const next = () => {
      markReviewed(item);
      if (itemIndex < unit.items.length - 1) {
        setItemIndex(itemIndex + 1);
        return;
      }
      if (unitIndex < units.length - 1) {
        changeUnit(unitIndex + 1);
        return;
      }
      setActiveSkill(isListening ? 'reading' : 'writing');
    };

    return (
      <>
        <div className={styles.lessonHeader}>
          <div>
            <span className={styles.lessonTag}>{label} · Parte {unit.part} · Bloque {unit.segment}</span>
            <h2>{mode === 'practice' ? (isListening ? 'Escucha primero. Corrige después.' : 'Lee y responde. La evidencia viene después.') : 'Corrige una respuesta a la vez.'}</h2>
            <p>{mode === 'practice' ? unit.instructions : 'Compara tu decisión con la clave y vuelve a la frase que sostiene la respuesta.'}</p>
          </div>
          <span className={styles.lessonCount}>{mode === 'practice' ? `Bloque ${unitIndex + 1}/${units.length}` : `Corrección ${itemIndex + 1}/${unit.items.length}`}</span>
        </div>
        <UnitPicker units={units} activeIndex={unitIndex} onChange={changeUnit} />
        {mode === 'practice' ? (
          isListening ? (
            <div className={styles.listeningPractice}>
              {unit.audioUrl && unit.practiceSegments?.length ? (
                <PracticeAudio key={unit.id} unit={unit} />
              ) : (
                <div className={styles.audioPending}><strong>Audio pendiente</strong><p>El guion y las claves ya están vinculados.</p></div>
              )}
              <div className={styles.answerSheetHeading}><div><span>Hoja de respuestas</span><strong>{unit.items.filter(current => normalizeIeltsGuidedAnswer(answers[current.id] ?? '')).length} de {unit.items.length} contestadas</strong></div><small>Bloque {unit.segment} de la Parte {unit.part}</small></div>
              <div className={styles.listeningQuestionStack}>
                {unit.items.map(current => (
                  <div key={current.id} className={styles.listeningQuestionRow}>
                    <span className={styles.listeningNumber}>{current.number}</span>
                    <span className={styles.listeningPrompt}><small>{current.prompt}</small><strong>{current.frame}</strong></span>
                    <AnswerControl item={current} value={answers[current.id] ?? ''} onChange={value => setAnswer(current, value)} />
                  </div>
                ))}
              </div>
              <div className={styles.submitSection}><div><ClipboardCheck size={20} /><p><strong>¿Terminaste este bloque?</strong><span>La evidencia aparece después de entregar.</span></p></div><button type="button" className={styles.primaryButton} disabled={!unitReady(unit)} onClick={() => { setItemIndex(0); setMode('review'); markReviewed(unit.items[0]); }}>Entregar y corregir <ArrowRight size={16} /></button></div>
            </div>
          ) : (
            <div className={styles.readingPractice}>
              <article className={styles.passagePanel}><div className={styles.passageTopbar}><span>Reading Passage {unit.part - 4}</span><small>Texto fuente completo</small></div><h3>{unit.title.replace(/^Reading\s*[—-]\s*/i, '')}</h3>{unit.visuals.length > 0 && <div className={styles.sourceVisuals}>{unit.visuals.map(visual => <figure key={visual.url}><Image src={visual.url} alt={visual.alt} width={1100} height={700} sizes="(max-width: 900px) 100vw, 52vw" unoptimized /></figure>)}</div>}<div className={styles.passageCopy}>{unit.sourceText.split('\n\n').map((paragraph, index) => <p key={index}><span aria-hidden="true">{String.fromCharCode(65 + index)}</span>{paragraph}</p>)}</div></article>
              <aside className={styles.readingSheet}>
                <div className={styles.readingSheetHeader}><span>Hoja de respuestas</span><strong>{unit.items.filter(current => normalizeIeltsGuidedAnswer(answers[current.id] ?? '')).length} de {unit.items.length} contestadas</strong><small>Parte {unit.part - 4} · bloque {unit.segment}</small></div>
                {unit.items.map(current => <div key={current.id} className={styles.readingQuestionCompact}><div><span>{current.number}</span><p>{current.prompt}</p><strong>{current.frame}</strong></div><AnswerControl item={current} value={answers[current.id] ?? ''} onChange={value => setAnswer(current, value)} /></div>)}
                <div className={styles.readingSubmit}><p><strong>Entrega cuando termines.</strong><span>Después aparecerá la evidencia pregunta por pregunta.</span></p><button type="button" className={styles.primaryButton} disabled={!unitReady(unit)} onClick={() => { setItemIndex(0); setMode('review'); markReviewed(unit.items[0]); }}>Entregar y corregir <ArrowRight size={16} /></button></div>
              </aside>
            </div>
          )
        ) : (
          <div className={styles.correctionFlow}>
            <div className={styles.correctionSteps} aria-label={`Progreso de corrección de ${label}`}>{unit.items.map((current, index) => <span key={current.id} className={index <= itemIndex ? styles.correctionStepActive : undefined}>{index < itemIndex ? <Check size={13} /> : current.number}</span>)}</div>
            <div className={styles.questionCard}>
              <div className={styles.questionMeta}><span>Pregunta {item.number}</span><small>{item.prompt}</small></div>
              <h3>{item.frame}</h3>
              <div className={styles.answerComparison}><div><span>Tu respuesta</span><strong>{answers[item.id]}</strong></div>{item.evidence.status === 'approved-excerpt' ? <div className={isCorrect(item) ? styles.answerRight : styles.answerCorrection}><span>Respuesta correcta</span><strong>{item.answer} {isCorrect(item) && <Check size={16} />}</strong></div> : <div><span>Respuesta correcta</span><strong>Pendiente de revisión</strong></div>}</div>
              <Feedback correct={isCorrect(item)} item={item} />
              <SourceEvidence unit={unit} item={item} />
            </div>
            <div className={styles.lessonFooter}><button type="button" className={styles.secondaryButton} onClick={() => itemIndex === 0 ? setMode('practice') : setItemIndex(itemIndex - 1)}><ArrowLeft size={16} />{itemIndex === 0 ? 'Volver a respuestas' : 'Anterior'}</button><span>Comprueba la relación entre pregunta, clave y fuente.</span><button type="button" className={styles.primaryButton} onClick={next}>{itemIndex < unit.items.length - 1 ? 'Siguiente corrección' : unitIndex < units.length - 1 ? 'Siguiente bloque' : isListening ? 'Continuar con Reading' : 'Continuar con Writing'} <ArrowRight size={16} /></button></div>
          </div>
        )}
      </>
    );
  };

  const writing = data.references.writing;
  const speaking = data.references.speaking;
  const writingSample = writing?.samples[writingBand];
  const speakingSample = speaking?.samples[speakingBand];

  return (
    <main className={styles.page}>
      <div className={styles.glowOne} aria-hidden="true" />
      <div className={styles.glowTwo} aria-hidden="true" />
      <div className={styles.shell}>
        <nav className={styles.breadcrumbs} aria-label="Migas de pan"><Link href="/examenes/ielts"><ArrowLeft size={15} /> IELTS</Link><span>/</span><span aria-current="page">Set {data.setNumber} · Modo guiado</span></nav>
        <header className={styles.hero}>
          <div className={styles.heroCopy}><span className={styles.eyebrow}><Sparkles size={14} /> Tutor de bolsillo</span><h1>Entiende la respuesta.<br /><em>No solo la mires.</em></h1><p>Resuelve cada parte en dos bloques manejables. Después corriges una respuesta a la vez con la clave y la evidencia del mismo mock.</p><div className={styles.heroActions}><button data-exam-start="true" type="button" onClick={() => document.getElementById('guided-workspace')?.scrollIntoView({ behavior: 'smooth' })}>Continuar la guía <ArrowRight size={17} /></button><Link href={`/examenes/ielts/practica/${data.mockId}`}>Ir al modo examen</Link></div></div>
          <aside className={styles.progressCard} aria-label="Progreso de la guía"><div className={styles.progressTop}><span>Tu recorrido</span><strong>{progress}%</strong></div><div className={styles.progressTrack}><span style={{ width: `${progress}%` }} /></div><p><strong>{completed} de {total}</strong> micro-retos revisados</p><div className={styles.progressSkills}>{skillRows.map(skill => <span key={skill.id}><skill.icon size={15} />{skill.done}/{skill.count}</span>)}</div><small>{hydrated ? 'Progreso guardado en este dispositivo' : 'Recuperando tu progreso…'}</small></aside>
        </header>
        <section className={styles.promiseStrip} aria-label="Cómo funciona">{[['Resuelve', 'un bloque corto'], ['Entrega', 'sin pistas'], ['Corrige', 'una por una'], ['Comprueba', 'la fuente exacta']].map(([title, detail], index) => <div key={title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{title}</strong><small>{detail}</small></div>)}</section>
        <section id="guided-workspace" data-exam-start="true" className={styles.workspace}>
          <aside className={styles.skillRail}><div className={styles.railHeading}><span>IELTS Academic</span><strong>Set {data.setNumber} guiado</strong></div><div className={styles.skillButtons}>{skillRows.map(skill => { const Icon = skill.icon; const done = skill.count > 0 && skill.done === skill.count; return <button key={skill.id} type="button" className={activeSkill === skill.id ? styles.skillActive : undefined} onClick={() => setActiveSkill(skill.id)}><span className={styles.skillIcon}><Icon size={19} /></span><span><strong>{skill.label}</strong><small>{skill.count ? done ? 'Completado' : `${skill.done}/${skill.count} revisados` : 'Módulo editorial pendiente'}</small></span>{done ? <CheckCircle2 className={styles.skillDone} size={18} /> : <ArrowRight size={16} />}</button>; })}</div><div className={styles.railNote}><Target size={18} /><p><strong>Regla del modo guía</strong>Primero completas el bloque. La clave y la evidencia aparecen únicamente durante la corrección.</p></div></aside>
          <div className={styles.lesson}>
            {activeSkill === 'listening' && renderObjectiveSkill('listening')}
            {activeSkill === 'reading' && renderObjectiveSkill('reading')}
            {activeSkill === 'writing' && <><div className={styles.lessonHeader}><div><span className={styles.lessonTag}>Writing · Task 2</span><h2>Compara el desarrollo, no memorices el texto.</h2><p>Las referencias de banda viven separadas del mock y conservan su propia revisión editorial.</p></div></div>{!writing || !writingSample ? <ReferencePending skill="Writing" /> : <div className={styles.referenceLayout}><div className={styles.promptCard}><span>Pregunta</span><p>{writing.prompt}</p></div><div className={styles.bandSelector}>{(['5.5', '9.0'] as BandLevel[]).map(band => <button key={band} type="button" className={writingBand === band ? styles.bandActive : undefined} onClick={() => setWritingBand(band)}><span>Banda</span><strong>{band === '9.0' ? '9' : band}</strong></button>)}</div><article className={styles.samplePaper}><div className={styles.samplePaperTop}><div><span>{writingSample.label}</span><strong>Respuesta completa</strong></div><small>{writingSample.wordCount} palabras</small></div><p className={styles.sampleVerdict}>{writingSample.verdict}</p><div className={styles.essayCopy}>{writingSample.answer.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article><div className={styles.criteriaGrid}>{writingSample.criteria.map(([criterion, note], index) => <div key={criterion}><span>0{index + 1}</span><strong>{criterion}</strong><p>{note}</p></div>)}</div><div className={styles.noticeStrip} role="note"><span>Aviso pedagógico</span><strong>Estas muestras son referencias aproximadas, no calificaciones oficiales ni predicciones de tu banda.</strong></div><button type="button" className={styles.primaryButton} onClick={() => setWritingReviewed(true)}>{writingReviewed ? 'Comparación revisada' : 'Marcar como revisada'}</button></div>}</>}
            {activeSkill === 'speaking' && <><div className={styles.lessonHeader}><div><span className={styles.lessonTag}>Speaking · Part 2</span><h2>Dos niveles, una misma cue card.</h2><p>El guion, sus criterios y el estado del audio se conectan por set.</p></div></div>{!speaking || !speakingSample ? <ReferencePending skill="Speaking" /> : <div className={styles.referenceLayout}><div className={styles.cueCard}><span>Cue card</span><h3>{speaking.cueCard}</h3><p>You should say:</p><ul>{speaking.bullets.map(bullet => <li key={bullet}>{bullet}</li>)}</ul></div><div className={styles.bandSelector}>{(['5.5', '9.0'] as BandLevel[]).map(band => <button key={band} type="button" className={speakingBand === band ? styles.bandActive : undefined} onClick={() => setSpeakingBand(band)}><span>Banda</span><strong>{band === '9.0' ? '9' : band}</strong></button>)}</div><article className={styles.speakingSample}><div className={styles.samplePaperTop}><div><span>{speakingSample.label}</span><strong>Respuesta narrada</strong></div></div><p className={styles.sampleVerdict}>{speakingSample.verdict}</p>{speakingSample.audio.ready && speakingSample.audio.url ? <audio controls preload="metadata" src={speakingSample.audio.url} /> : <div className={styles.audioPending}><div><Volume2 size={19} /><span>Audio final</span></div><strong>Preparado para Chatterbox</strong><p>El reproductor se activa sólo después de producción y revisión.</p></div>}<details className={styles.transcript}><summary>Leer transcripción completa</summary><div>{speakingSample.transcript.split('\n\n').map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></details></article><div className={styles.criteriaGrid}>{speakingSample.criteria.map(([criterion, note], index) => <div key={criterion}><span>0{index + 1}</span><strong>{criterion}</strong><p>{note}</p></div>)}</div><div className={styles.noticeStrip} role="note"><span>Aviso pedagógico</span><strong>{speaking.pedagogicalNotice}</strong></div><button type="button" className={styles.primaryButton} onClick={() => setSpeakingReviewed(true)}>{speakingReviewed ? 'Comparación revisada' : 'Marcar como revisada'}</button></div>}</>}
          </div>
        </section>
        <footer className={styles.pageFooter}><div><strong>Práctica de preparación no oficial de WeLearn.</strong><span>Las claves y evidencias provienen del mismo mock revisado. Este recorrido no predice una banda oficial.</span></div><button type="button" onClick={reset}><RotateCcw size={15} /> Reiniciar progreso</button></footer>
      </div>
    </main>
  );
}
