'use client';

import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import { AudioPlayer, formatTime } from '@/components/exam-runner/primitives';
import type { Exam } from '@/data/exams';
import type {
  MockExam, Question, MockSection,
  MCQQuestion, WriteQuestion, SpeakQuestion,
  WordCompleteQuestion, SentenceBuildQuestion, RepeatQuestion,
  ToeflBuildSentenceQuestion, ToeflReadingSingleQuestion, ToeflReadingMultiQuestion,
  ToeflListeningSingleQuestion,
} from '@/data/mocks/types';
import type { CompleteWordsScoreResult } from '@/data/toefl/complete-the-words-set-1';
import type { ToeflReadingScoreResult } from '@/lib/toefl/reading-contract';
import type { ToeflBuildSentenceScoreResult } from '@/lib/toefl/build-sentence-contract';
import type { ToeflListeningScoreResult } from '@/lib/toefl/listening-contract';
import BuildSentenceItem from '@/components/toefl/BuildSentenceItem';
import { ReadingMultiChoiceGroup, ReadingSingleChoiceGroup } from '@/components/toefl/ReadingChoiceGroup';
import { IELTSSpeakingRecorder, type IeltsSpeakingRecording } from '@/components/exam-runner/IELTSSpeakingRecorder';
import { TOEFLSubmission } from '@/components/exam-runner/TOEFLSubmission';
import { TOEFLWritingReportPanel } from '@/components/labs/TOEFLWritingReportPanel';
import { useWritingAssessment } from '@/lib/labs/hooks/useWritingAssessment';
import type { ToeflSubmissionReceipt } from '@/lib/toefl/review-blueprint';
import type { ToeflObjectiveAnswers, ToeflSpeakingPromptRef } from '@/lib/toefl/submission';
import {
  buildToeflFixedStages,
  countStageInteractions,
  flattenForwardItems,
  type ToeflFixedStage,
} from '@/lib/toefl/fixed-session';

// ── Fixed practice shape aligned to the 2026 TOEFL iBT task families ──────────
// This runner neither claims adaptive routing nor awards an ETS 1–6 score.

function getSkillSections(mock: MockExam, skill: string) {
  return mock.sections.filter(s => s.skill === skill);
}

function norm(s: string) {
  return s.trim().toLowerCase().replace(/[.,!?;:'"]/g, '');
}

function StageDeadlineTimer({ deadlineAt, totalSecs, onExpire }: {
  deadlineAt: number;
  totalSecs: number;
  onExpire: () => void;
}) {
  const [remaining, setRemaining] = useState(() => Math.max(0, Math.ceil((deadlineAt - Date.now()) / 1000)));
  const expired = useRef(false);
  const expireRef = useRef(onExpire);

  useEffect(() => {
    expireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    expired.current = false;
    const update = () => {
      const next = Math.max(0, Math.ceil((deadlineAt - Date.now()) / 1000));
      setRemaining(next);
      if (next === 0 && !expired.current) {
        expired.current = true;
        expireRef.current();
      }
    };
    update();
    const interval = window.setInterval(update, 1000);
    return () => window.clearInterval(interval);
  }, [deadlineAt]);

  const urgent = remaining < 300;
  return (
    <div className={`prac-timer${urgent ? ' prac-timer--urgent' : ''}`} role="timer" aria-live={urgent ? 'polite' : 'off'}>
      <span className="prac-timer__label">Tiempo del bloque</span>
      <span className="prac-timer__val">{formatTime(remaining)}</span>
      <div className="prac-timer__bar" aria-hidden="true">
        <div className="prac-timer__fill" style={{ width: `${Math.min(100, (remaining / totalSecs) * 100)}%`, background: urgent ? '#c8202e' : 'var(--accent)' }} />
      </div>
    </div>
  );
}

// ── Answer state ────────────────────────────────────────────────────────────────

interface Answers {
  mcq: Record<string, number>;                        // qid -> option index
  word: Record<string, Record<number, string>>;       // qid -> blankNum -> value
  build: Record<string, number[]>;                    // qid -> tile order (indices)
  buildV2: Record<string, string[]>;                  // stable item id -> stable tile ids
  single: Record<string, string>;                     // stable item id -> stable option id
  multi: Record<string, string[]>;                    // stable item id -> stable option ids
  listening: Record<string, string>;                  // stable Listening item id -> stable option id
  write: Record<string, string>;                      // qid -> essay
  speak: Record<string, string>;                      // qid -> notes
}
const EMPTY: Answers = { mcq: {}, word: {}, build: {}, buildV2: {}, single: {}, multi: {}, listening: {}, write: {}, speak: {} };

// ── MCQ (Read in Daily Life / Academic Passage / all Listening) ─────────────────

function MCQView({ q, index, value, onChange }: {
  q: MCQQuestion; index: number; value: number | undefined; onChange: (i: number) => void;
}) {
  return (
    <div className="ielts-mcq">
      <div className="ielts-mcq__num">{index}.</div>
      <div className="ielts-mcq__body">
        {q.stimulusLabel && <p className="ielts-form__title">{q.stimulusLabel}</p>}
        {q.audioUrl && <AudioPlayer src={q.audioUrl} label={`Audio ${index}`} />}
        {q.stimulus && <pre className="t26-stimulus">{q.stimulus}</pre>}
        <p className="ielts-mcq__text">{q.text}</p>
        <div className="prac-options">
          {q.options.map((opt, i) => (
            <button key={i}
              className={`prac-option${value === i ? ' prac-option--selected' : ''}`}
              onClick={() => onChange(i)}>
              <span className="prac-option__letter">{String.fromCharCode(65 + i)}</span>
              <span className="prac-option__text">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface AudioLifecycle {
  alreadyPlayed: boolean;
  completed: boolean;
  onPlaybackStart: () => void;
  onEnded: () => void;
  onPlaybackError: () => void;
}

function ListeningSingleView({ q, index, value, onChange, audio, responseEnabled = true }: {
  q: ToeflListeningSingleQuestion;
  index: number;
  value: string | undefined;
  onChange: (optionId: string) => void;
  audio?: AudioLifecycle;
  responseEnabled?: boolean;
}) {
  const blocked = q.mediaStatus === 'script-ready-audio-blocked';
  const waitingForAudio = !blocked && (!responseEnabled || (q.task === 'choose-response' && !audio?.completed));
  return (
    <div className="ielts-mcq" data-media-status={q.mediaStatus}>
      <div className="ielts-mcq__num">{index}.</div>
      <div className="ielts-mcq__body">
        {q.task === 'choose-response' && q.audioUrl && audio && (
          <AudioPlayer
            src={q.audioUrl}
            label={`Listening item ${index}`}
            alreadyPlayed={audio.alreadyPlayed}
            onPlaybackStart={audio.onPlaybackStart}
            onEnded={audio.onEnded}
            onPlaybackError={audio.onPlaybackError}
          />
        )}
        {blocked && q.task === 'choose-response' && (
          <p className="t26-audio-blocked" role="status">
            Audio pendiente de aprobación. Esta pregunta se muestra para revisión editorial y no se califica todavía.
          </p>
        )}
        {waitingForAudio && <p className="t26-section-note" role="status">Escucha el audio completo antes de responder.</p>}
        <p className="ielts-mcq__text">{q.text}</p>
        <div className="prac-options" role="radiogroup" aria-label={`Listening question ${index}`}>
          {q.options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={value === option.id}
              className={`prac-option${value === option.id ? ' prac-option--selected' : ''}`}
              onClick={() => onChange(option.id)}
              disabled={blocked || waitingForAudio}
            >
              <span className="prac-option__letter">{option.label}</span>
              <span className="prac-option__text">{option.text}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Complete the Words (Reading) ────────────────────────────────────────────────

function WordCompleteView({ q, values, onChange, onFocus }: {
  q: WordCompleteQuestion;
  values: Record<number, string>;
  onChange: (num: number, v: string) => void;
  onFocus: (inputId: string) => void;
}) {
  const byNum = Object.fromEntries(q.blanks.map(b => [b.num, b]));
  const parts = q.template.split(/(\{\{\d+\}\})/);
  return (
    <div className="ielts-form t26-word">
      {q.instructions && <p className="ielts-form__title">{q.instructions}</p>}
      <div className="ielts-form__body">
        {parts.map((part, i) => {
          const m = part.match(/^\{\{(\d+)\}\}$/);
          if (m) {
            const num = parseInt(m[1]);
            const blank = byNum[num];
            const missingLength = blank?.missingLength
              ?? Math.max(1, (blank?.answer?.length ?? 0) - (blank?.prefix?.length ?? 0) - (blank?.suffix?.length ?? 0));
            const inputId = `${q.id}-blank-${num}`;
            const invalidCharacters = !/^[a-z]*$/i.test(values[num] ?? '');
            return (
              <span key={i} className="t26-word__wrap" data-blank-id={blank?.id}>
                <span className="t26-word__num" aria-hidden="true">{num}</span>
                {blank?.prefix && <span className="t26-word__given">{blank.prefix}</span>}
                <label className="t26-sr-only" htmlFor={inputId}>
                  Passage {q.id}, blank {num} of {q.blanks.length}, prefix {blank?.prefix ?? 'none'}, enter {missingLength} missing letters
                </label>
                <input
                  id={inputId}
                  type="text"
                  className="t26-word__input"
                  value={values[num] ?? ''}
                  onChange={e => onChange(num, e.target.value)}
                  onFocus={() => onFocus(inputId)}
                  placeholder={'_'.repeat(missingLength)}
                  maxLength={missingLength}
                  inputMode="text"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  pattern="[A-Za-z]*"
                  aria-invalid={invalidCharacters}
                  aria-describedby={`${inputId}-hint${invalidCharacters ? ` ${inputId}-error` : ''}`}
                  style={{ width: `${Math.max(2.4, missingLength + 0.8)}ch` }}
                />
                <span id={`${inputId}-hint`} className="t26-sr-only">Write exactly {missingLength} letters.</span>
                {invalidCharacters && <span id={`${inputId}-error`} className="t26-sr-only">Use letters A to Z only, without internal spaces, numbers, or punctuation.</span>}
                {blank?.suffix && <span className="t26-word__given">{blank.suffix}</span>}
              </span>
            );
          }
          return <span key={i} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
        })}
      </div>
    </div>
  );
}

// ── Build a Sentence (Writing) ──────────────────────────────────────────────────

function SentenceBuildView({ q, order, onChange }: {
  q: SentenceBuildQuestion; order: number[]; onChange: (order: number[]) => void;
}) {
  const used = new Set(order);
  const toggle = (idx: number) => {
    if (used.has(idx)) onChange(order.filter(i => i !== idx));
    else onChange([...order, idx]);
  };
  return (
    <div className="ielts-write t26-build">
      {q.prompt && <p className="ielts-write__prompt">{q.prompt}</p>}
      <p className="t26-build__hint">Toca las palabras en el orden correcto para formar una oración gramatical.</p>
      <div className="t26-build__answer">
        {order.length === 0
          ? <span className="t26-build__placeholder">Tu oración aparecerá aquí…</span>
          : order.map((idx, pos) => (
              <button key={pos} className="t26-build__tile t26-build__tile--placed" onClick={() => toggle(idx)}>
                {q.tiles[idx]}
              </button>
            ))}
      </div>
      <div className="t26-build__bank">
        {q.tiles.map((tile, idx) => (
          <button key={idx}
            className={`t26-build__tile${used.has(idx) ? ' t26-build__tile--used' : ''}`}
            disabled={used.has(idx)}
            onClick={() => toggle(idx)}>
            {tile}
          </button>
        ))}
      </div>
      {order.length > 0 && (
        <button className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }} onClick={() => onChange([])}>
          Reiniciar oración
        </button>
      )}
    </div>
  );
}

// ── Write an Email / Academic Discussion (Writing) ──────────────────────────────

function WriteView({ q, value, onChange }: { q: WriteQuestion; value: string; onChange: (v: string) => void }) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const hasMinimum = q.minWords > 0;
  return (
    <div className="ielts-write">
      <div className="ielts-group__label">
        <span className="ielts-group__range">{q.stimulusLabel ?? `Task ${q.taskNumber}`}</span>
      </div>
      <div className="ielts-write__stimulus">{q.stimulus.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}</div>
      <p className="ielts-write__prompt">{q.text}</p>
      {q.timeLimitSeconds && (
        <p className="t26-section-note">
          Referencia de esta tarea: {q.timeLimitSeconds / 60} minutos. La respuesta se guarda
          para corrección privada; cualquier 0–5 mostrado es una estimación pedagógica por tarea.
        </p>
      )}
      <textarea
        className="ielts-write__area"
        name={`toefl-writing-task-${q.taskNumber}`}
        aria-label={`Respuesta de ${q.stimulusLabel ?? `Writing Task ${q.taskNumber}`}`}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Escribe tu respuesta aquí…"
        rows={10}
        spellCheck={false}
        autoCorrect="off"
      />
      <div className="ielts-write__meta">
        <span className={hasMinimum && words < q.minWords ? 'ielts-write__wc--low' : 'ielts-write__wc'}>
          {words} palabras {hasMinimum && words < q.minWords ? `(mínimo recomendado ≥ ${q.minWords})` : (!hasMinimum ? '(sin mínimo oficial publicado)' : '')}
        </span>
        <span>Sin corrector ortográfico</span>
      </div>
    </div>
  );
}

// ── Listen and Repeat (Speaking) ────────────────────────────────────────────────

function RepeatView({ q, audio }: { q: RepeatQuestion; audio?: AudioLifecycle }) {
  const [revealed, setRevealed] = useState(false);
  const blocked = q.mediaStatus === 'script-ready-audio-blocked';
  return (
    <div className="ielts-speak t26-repeat" data-media-status={q.mediaStatus}>
      <div className="ielts-group__label">
        <span className="ielts-group__range">Listen and Repeat — Item {q.itemNumber}</span>
      </div>
      {q.audioUrl && audio && (
        <AudioPlayer
          src={q.audioUrl}
          label={`Repeat sentence ${q.itemNumber}`}
          alreadyPlayed={audio.alreadyPlayed}
          onPlaybackStart={audio.onPlaybackStart}
          onEnded={audio.onEnded}
          onPlaybackError={audio.onPlaybackError}
        />
      )}
      {blocked && (
        <p className="t26-audio-blocked" role="status">
          Audio pendiente de aprobación. Este guion se incluye para revisión editorial y no se evalúa todavía.
        </p>
      )}
      <p className="t26-repeat__instruction">Escucha la oración y repítela en voz alta con la misma pronunciación, ritmo y entonación.</p>
      {!blocked && !audio?.completed && <p className="t26-section-note" role="status">Escucha la oración completa. Después repítela inmediatamente en voz alta.</p>}
      {audio?.completed && <p className="t26-section-note" role="status">Audio completado. Repite ahora la oración y grábala para la revisión privada.</p>}
      {blocked && (
        <>
          <button className="btn btn-ghost btn-sm" onClick={() => setRevealed(r => !r)}>
            {revealed ? 'Ocultar guion editorial' : 'Ver guion editorial'}
          </button>
          {revealed && <p className="t26-repeat__target">“{q.targetSentence}”</p>}
        </>
      )}
    </div>
  );
}

// ── Take an Interview (Speaking) ────────────────────────────────────────────────

function InterviewView({ q, audio }: { q: SpeakQuestion; audio?: AudioLifecycle }) {
  const blocked = q.mediaStatus === 'script-ready-audio-blocked';
  return (
    <div className="ielts-speak" data-media-status={q.mediaStatus}>
      <div className="ielts-group__label">
        <span className="ielts-group__range">Take an Interview — Question {q.partNumber}</span>
      </div>
      {q.audioUrl && audio && (
        <AudioPlayer
          src={q.audioUrl}
          label={`Interview question ${q.partNumber}`}
          alreadyPlayed={audio.alreadyPlayed}
          onPlaybackStart={audio.onPlaybackStart}
          onEnded={audio.onEnded}
          onPlaybackError={audio.onPlaybackError}
        />
      )}
      {blocked && (
        <p className="t26-audio-blocked" role="status">
          Audio del entrevistador pendiente de aprobación. El guion se incluye para revisión editorial y esta pregunta no se evalúa todavía.
        </p>
      )}
      {q.text.split('\n\n').map((p, i) => <p key={i} className="ielts-speak__prompt">{p}</p>)}
      {!blocked && <p className="t26-section-note">Responde inmediatamente y sin tiempo de preparación. La grabación quedará pendiente de escucha y revisión; no se inventa una nota oral.</p>}
    </div>
  );
}

// ── Section panel ────────────────────────────────────────────────────────────────

function renderQuestion(q: Question, index: number, ans: Answers, h: Handlers) {
  switch (q.type) {
    case 'mcq':
    case 'dialog':
      return <MCQView key={q.id} q={q} index={index} value={ans.mcq[q.id]} onChange={i => h.onMCQ(q.id, i)} />;
    case 'wordcomplete':
      return <WordCompleteView key={q.id} q={q} values={ans.word[q.id] ?? {}} onChange={(n, v) => h.onWord(q.id, n, v)} onFocus={h.onWordFocus} />;
    case 'toefl-reading-single':
      return <ReadingSingleChoiceGroup key={q.id} itemId={q.id} number={index} prompt={q.text} options={q.options} selectedOptionId={ans.single[q.id]} onSelect={(optionId) => h.onSingle(q.id, optionId)} onFocus={h.onReadingFocus} />;
    case 'toefl-reading-multi':
      return <ReadingMultiChoiceGroup key={q.id} itemId={q.id} number={index} prompt={q.text} options={q.options} selectedOptionIds={ans.multi[q.id] ?? []} selectCount={q.selectCount} onChange={(optionIds) => h.onMulti(q.id, optionIds)} onFocus={h.onReadingFocus} supplementary />;
    case 'multiselect':
      return <ReadingMultiChoiceGroup
        key={q.id}
        itemId={q.id}
        number={index}
        prompt={q.text}
        options={q.options.map((option) => ({ id: `${q.id}:option-${option.letter.toLowerCase()}`, label: option.letter, text: option.text }))}
        selectedOptionIds={ans.multi[q.id] ?? []}
        selectCount={q.selectCount}
        onChange={(optionIds) => h.onMulti(q.id, optionIds)}
        onFocus={h.onReadingFocus}
      />;
    case 'toefl-listening-single':
      return <ListeningSingleView key={q.id} q={q} index={index} value={ans.listening[q.id]} onChange={(optionId) => h.onListening(q.id, optionId)} />;
    case 'sentencebuild':
      return <SentenceBuildView key={q.id} q={q} order={ans.build[q.id] ?? []} onChange={o => h.onBuild(q.id, o)} />;
    case 'toefl-build-sentence':
      return <BuildSentenceItem
        key={q.id}
        item={q}
        number={index}
        order={ans.buildV2[q.id] ?? []}
        onChange={(order) => h.onBuildV2(q.id, order)}
        onFocus={h.onBuildFocus}
      />;
    case 'write':
      return <WriteView key={q.id} q={q} value={ans.write[q.id] ?? ''} onChange={v => h.onWrite(q.id, v)} />;
    case 'repeat':
      return <RepeatView key={q.id} q={q} />;
    case 'speak':
      return <InterviewView key={q.id} q={q} />;
    default:
      return null;
  }
}

function SectionPanel({ section, ans, handlers }: { section: MockSection; ans: Answers; handlers: Handlers }) {
  let mcqCounter = 0;
  const body = (
    <div className="ielts-panel__questions">
      {section.questions.map(q => {
        const numbered = q.type === 'mcq' || q.type === 'dialog' || q.type === 'toefl-reading-single'
          || q.type === 'toefl-reading-multi' || q.type === 'multiselect' || q.type === 'toefl-build-sentence';
        const listeningNumbered = q.type === 'toefl-listening-single';
        const idx = numbered || listeningNumbered ? ++mcqCounter : mcqCounter;
        return renderQuestion(q, idx, ans, handlers);
      })}
    </div>
  );
  if (section.passage) {
    return (
      <div className="ielts-split">
        <div className="ielts-split__passage">
          <p className="ielts-split__passage-label">{section.passageTitle ?? 'Reading text'}</p>
          <div className="ielts-split__passage-text">
            {section.passage.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
          </div>
        </div>
        <div className="ielts-split__right">
          <p className="ielts-split__section-title">{section.title}</p>
          <p className="ielts-split__instructions">{section.instructions}</p>
          {section.sectionNote && <p className="t26-section-note">{section.sectionNote}</p>}
          {body}
        </div>
      </div>
    );
  }
  return (
    <div className="ielts-section-panel">
      <p className="ielts-section-panel__title">{section.title}</p>
      <p className="ielts-section-panel__instructions">{section.instructions}</p>
      {section.sectionNote && <p className="t26-section-note">{section.sectionNote}</p>}
      {section.mediaStatus === 'script-ready-audio-blocked' && (
        <p className="t26-audio-blocked" role="status">
          Audio pendiente de aprobación. El guion y las preguntas están disponibles en la revisión editorial, pero este estímulo no se presenta ni se califica todavía.
        </p>
      )}
      {section.audioUrl && (
        <div className="ielts-audio-sticky">
          <AudioPlayer src={section.audioUrl} label="TOEFL Listening" />
        </div>
      )}
      {body}
    </div>
  );
}

function ForwardItemPanel({
  stage,
  section,
  question,
  position,
  total,
  ans,
  handlers,
  audio,
  speakingRecording,
  onSpeakingRecordingChange,
}: {
  stage: ToeflFixedStage;
  section: MockSection;
  question: Question;
  position: number;
  total: number;
  ans: Answers;
  handlers: Handlers;
  audio?: AudioLifecycle;
  speakingRecording?: IeltsSpeakingRecording;
  onSpeakingRecordingChange: (recording: IeltsSpeakingRecording | undefined) => void;
}) {
  const sharedListeningAudio = question.type === 'toefl-listening-single'
    && question.task !== 'choose-response'
    && section.audioUrl;
  const blocked = (question.type === 'toefl-listening-single' || question.type === 'repeat' || question.type === 'speak')
    && question.mediaStatus === 'script-ready-audio-blocked';

  return (
    <section className="ielts-section-panel" aria-labelledby="t26-forward-title">
      <p className="t26-stage-kicker">{stage.label} · Ítem {position} de {total}</p>
      <h2 id="t26-forward-title" className="ielts-section-panel__title" tabIndex={-1}>{section.title}</h2>
      <p className="ielts-section-panel__instructions">{section.instructions}</p>
      {section.sectionNote && <p className="t26-section-note">{section.sectionNote}</p>}
      {sharedListeningAudio && audio && (
        <div className="ielts-audio-sticky">
          <AudioPlayer
            src={section.audioUrl}
            label={section.title}
            alreadyPlayed={audio.alreadyPlayed}
            onPlaybackStart={audio.onPlaybackStart}
            onEnded={audio.onEnded}
            onPlaybackError={audio.onPlaybackError}
          />
        </div>
      )}
      {sharedListeningAudio && !blocked && !audio?.completed && (
        <p className="t26-section-note" role="status">Escucha el estímulo completo antes de responder. No podrás volver a preguntas anteriores.</p>
      )}
      {question.type === 'toefl-listening-single' && (
        <ListeningSingleView
          q={question}
          index={position}
          value={ans.listening[question.id]}
          onChange={(optionId) => handlers.onListening(question.id, optionId)}
          audio={question.task === 'choose-response' ? audio : undefined}
          responseEnabled={blocked || Boolean(audio?.completed)}
        />
      )}
      {question.type === 'repeat' && <RepeatView q={question} audio={audio} />}
      {question.type === 'speak' && <InterviewView q={question} audio={audio} />}
      {(question.type === 'repeat' || question.type === 'speak') && !blocked && audio?.completed && (
        <div className="t26-recorder" aria-labelledby={`recorder-${question.id}`}>
          <h3 id={`recorder-${question.id}`}>Graba tu respuesta oral</h3>
          <p>El audio permanece en esta pestaña hasta que envíes el simulacro. Al enviarlo se guarda en almacenamiento privado para corrección.</p>
          <IELTSSpeakingRecorder
            key={question.id}
            questionId={question.id}
            recording={speakingRecording}
            maxSeconds={180}
            onChange={onSpeakingRecordingChange}
          />
        </div>
      )}
      {blocked && (
        <p className="t26-audio-blocked" role="status">
          Ítem bloqueado por medio faltante: puede revisarse y avanzarse en el preview, pero no responderse ni calificarse.
        </p>
      )}
    </section>
  );
}

// ── Results ──────────────────────────────────────────────────────────────────────

type WordScoreMap = Record<string, CompleteWordsScoreResult>;

function computeReadingListening(
  mock: MockExam,
  skill: string,
  ans: Answers,
  wordScores: WordScoreMap,
  readingScore?: ToeflReadingScoreResult,
  listeningScore?: ToeflListeningScoreResult,
) {
  let correct = 0, total = 0;
  if (skill === 'reading' && readingScore) {
    correct += readingScore.correct;
    total += readingScore.denominator;
  }
  if (skill === 'listening' && listeningScore) {
    correct += listeningScore.correct;
    total += listeningScore.denominator;
  }
  for (const sec of getSkillSections(mock, skill)) {
    for (const q of sec.questions) {
      if (q.type === 'mcq' || q.type === 'dialog') {
        total++; if (ans.mcq[q.id] === q.answer) correct++;
      } else if (q.type === 'wordcomplete') {
        const serverScore = wordScores[q.id];
        if (serverScore) {
          correct += serverScore.correct;
          total += serverScore.denominator;
          continue;
        }
        for (const b of q.blanks) {
          if (!b.answer) continue;
          total++;
          const missing = b.answer.slice(b.prefix?.length ?? 0, b.answer.length - (b.suffix?.length ?? 0));
          if (norm(ans.word[q.id]?.[b.num] ?? '') === norm(missing)) correct++;
        }
      } else if (q.type === 'toefl-reading-single' || q.type === 'toefl-reading-multi') {
        // Server-scored reading keys reconcile once through readingScore.
        continue;
      } else if (q.type === 'toefl-listening-single') {
        // Fixed Listening keys reconcile once through the server-only score.
        continue;
      } else if (q.type === 'multiselect') {
        total++;
        const selectedLetters = (ans.multi[q.id] ?? []).map((id) => id.slice(id.lastIndexOf('-') + 1).toUpperCase());
        if (selectedLetters.length === q.selectCount
          && q.answers.length === selectedLetters.length
          && q.answers.every((letter) => selectedLetters.includes(letter))) correct++;
      }
    }
  }
  return { correct, total };
}

function Results({ mock, exam, ans, wordScores, readingScore, listeningScore, buildScore, capturedSpeakingCount, receipt, onRetry }: {
  mock: MockExam;
  exam: Exam;
  ans: Answers;
  wordScores: WordScoreMap;
  readingScore?: ToeflReadingScoreResult;
  listeningScore?: ToeflListeningScoreResult;
  buildScore?: ToeflBuildSentenceScoreResult;
  capturedSpeakingCount: number;
  receipt: ToeflSubmissionReceipt;
  onRetry: () => void;
}) {
  const r = computeReadingListening(mock, 'reading', ans, wordScores, readingScore);
  const l = computeReadingListening(mock, 'listening', ans, wordScores, readingScore, listeningScore);
  const blockedListening = getSkillSections(mock, 'listening').flatMap((section) => section.questions)
    .filter((question) => question.type === 'toefl-listening-single' && question.mediaStatus === 'script-ready-audio-blocked').length;
  const blockedSpeaking = getSkillSections(mock, 'speaking').flatMap((section) => section.questions)
    .filter((question) => (question.type === 'repeat' || question.type === 'speak')
      && question.mediaStatus === 'script-ready-audio-blocked').length;

  const buildQs = getSkillSections(mock, 'writing').flatMap(s => s.questions).filter(q => q.type === 'sentencebuild') as SentenceBuildQuestion[];
  let bCorrect = buildScore?.correct ?? 0;
  let bTotal = buildScore?.denominator ?? 0;
  for (const q of buildQs) {
    const order = ans.build[q.id] ?? [];
    const built = order.map(i => q.tiles[i]);
    if (built.length === q.answer.length && built.every((w, i) => norm(w) === norm(q.answer[i]))) bCorrect++;
    bTotal++;
  }
  const constructedWriting = getSkillSections(mock, 'writing').flatMap(s => s.questions).filter(q => q.type === 'write');
  const savedWriting = constructedWriting.filter((question) => (ans.write[question.id] ?? '').trim()).length;
  const emailQuestion = constructedWriting.find(question => question.type === 'write' && question.taskNumber === 1) as WriteQuestion | undefined;
  const discussionQuestion = constructedWriting.find(question => question.type === 'write' && question.taskNumber === 2) as WriteQuestion | undefined;
  const emailAssessment = useWritingAssessment('toefl', mock.id, 1, emailQuestion ? ans.write[emailQuestion.id] ?? '' : '', receipt);
  const discussionAssessment = useWritingAssessment('toefl', mock.id, 2, discussionQuestion ? ans.write[discussionQuestion.id] ?? '' : '', receipt);

  return (
    <main className="t26-results" style={{ '--exam-color': exam.color } as React.CSSProperties}>
      <p className="prac-intro__eyebrow">{exam.flag} {exam.name} · resultado de práctica fija</p>
      <h1>{mock.title}</h1>
      <p className="t26-results__disclosure" role="status">
        La entrega quedó guardada. No se calculó banda 1–6, overall ni equivalencia /120: la conversión oficial de ETS no es pública. Los puntajes 0–5 de Writing son estimaciones pedagógicas por tarea.
      </p>
      <div className="t26-results__grid">
        <section>
          <h2>Reading</h2>
          <p className="t26-results__raw">{readingScore ? `${r.correct}/${r.total}` : 'Corrección no disponible'}</p>
          <p>Puntaje bruto de práctica; no es score ETS.</p>
        </section>
        <section>
          <h2>Listening</h2>
          <p className="t26-results__raw">{listeningScore ? `${l.correct}/${l.total} listos` : 'Corrección no disponible'}</p>
          <p>{blockedListening} ítems quedaron fuera por audio pendiente; no cuentan como error.</p>
        </section>
        <section>
          <h2>Writing</h2>
          <p className="t26-results__raw">Build {buildScore ? `${bCorrect}/${bTotal}` : 'sin corrección'}</p>
          <p>Email y Discussion guardados: {savedWriting}/{constructedWriting.length}. Los reportes por tarea aparecen debajo.</p>
        </section>
        <section>
          <h2>Speaking</h2>
          <p className="t26-results__raw">En revisión</p>
          <p>{capturedSpeakingCount} respuestas privadas enviadas; {blockedSpeaking} prompts bloqueados. El profesor debe escuchar la evidencia antes de emitir una estimación.</p>
        </section>
      </div>
      <section className="t26-results__writing" aria-labelledby="t26-writing-results-title">
        <h2 id="t26-writing-results-title">Corrección de Writing</h2>
        <TOEFLWritingReportPanel taskLabel="Write an Email" state={emailAssessment.state} result={emailAssessment.result} />
        <TOEFLWritingReportPanel taskLabel="Academic Discussion" state={discussionAssessment.state} result={discussionAssessment.result} />
      </section>
      <p className="t26-results__date">Cerrado el {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
      <div className="t26-results__actions">
        <button type="button" className="btn" onClick={onRetry}>Reiniciar práctica</button>
        <Link href={`/examenes/${exam.slug}`} className="btn btn-ghost">Volver a {exam.name}</Link>
      </div>
    </main>
  );
}

// ── Handlers type ────────────────────────────────────────────────────────────────

interface Handlers {
  onMCQ: (id: string, i: number) => void;
  onWord: (id: string, num: number, v: string) => void;
  onWordFocus: (inputId: string) => void;
  onSingle: (id: string, optionId: string) => void;
  onMulti: (id: string, optionIds: string[]) => void;
  onListening: (id: string, optionId: string) => void;
  onReadingFocus: (inputId: string) => void;
  onBuild: (id: string, order: number[]) => void;
  onBuildV2: (id: string, order: string[]) => void;
  onBuildFocus: (controlId: string) => void;
  onWrite: (id: string, v: string) => void;
  onSpeak: (id: string, v: string) => void;
}

// ── Main component ────────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'submit' | 'results';

function createClientId(prefix: string) {
  const value = typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}:${value}`;
}

export default function Toefl2026PracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const [phase, setPhase] = useState<Phase>('intro');
  const stages = useMemo(() => buildToeflFixedStages(mock), [mock]);
  const [stageIndex, setStageIndex] = useState(0);
  const [forwardItemIndex, setForwardItemIndex] = useState(0);
  const [stageDeadlineAt, setStageDeadlineAt] = useState<number | null>(null);
  const [startedMediaIds, setStartedMediaIds] = useState<string[]>([]);
  const [completedMediaIds, setCompletedMediaIds] = useState<string[]>([]);
  const [currentPlayingMediaId, setCurrentPlayingMediaId] = useState('');
  const [recordings, setRecordings] = useState<Record<string, IeltsSpeakingRecording>>({});
  const [receipt, setReceipt] = useState<ToeflSubmissionReceipt | null>(null);
  const [ans, setAns] = useState<Answers>(EMPTY);
  const [wordScores, setWordScores] = useState<WordScoreMap>({});
  const [readingScore, setReadingScore] = useState<ToeflReadingScoreResult>();
  const [listeningScore, setListeningScore] = useState<ToeflListeningScoreResult>();
  const [buildScore, setBuildScore] = useState<ToeflBuildSentenceScoreResult>();
  const [attemptId, setAttemptId] = useState('');
  const [lastWordFocusId, setLastWordFocusId] = useState('');
  const [lastReadingFocusId, setLastReadingFocusId] = useState('');
  const [lastBuildFocusId, setLastBuildFocusId] = useState('');
  const [hydrated, setHydrated] = useState(false);
  const [scoringWords, setScoringWords] = useState(false);
  const [wordScoringError, setWordScoringError] = useState(false);
  const [readingScoringError, setReadingScoringError] = useState(false);
  const [listeningScoringError, setListeningScoringError] = useState(false);
  const [buildScoringError, setBuildScoringError] = useState(false);
  const storageKey = `wl:toefl:mock:${mock.id}:attempt:v1`;

  useEffect(() => {
    if ((phase !== 'exam' && phase !== 'submit') || Object.keys(recordings).length === 0) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeUnload);
    return () => window.removeEventListener('beforeunload', warnBeforeUnload);
  }, [phase, recordings]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as {
            version?: number;
            attemptId?: string;
            ans?: Answers;
            wordScores?: WordScoreMap;
            readingScore?: ToeflReadingScoreResult;
            listeningScore?: ToeflListeningScoreResult;
            buildScore?: ToeflBuildSentenceScoreResult;
            activeSkill?: string;
            stageIndex?: number;
            forwardItemIndex?: number;
            stageDeadlineAt?: number | null;
            startedMediaIds?: string[];
            completedMediaIds?: string[];
            lastWordFocusId?: string;
            lastReadingFocusId?: string;
            lastBuildFocusId?: string;
          };
          if ([1, 2, 3, 4].includes(saved.version ?? 0) && saved.attemptId && saved.ans) {
            setAttemptId(saved.attemptId);
            setAns({
              ...EMPTY,
              ...saved.ans,
              single: saved.ans.single ?? {},
              multi: saved.ans.multi ?? {},
              listening: saved.ans.listening ?? {},
              buildV2: saved.ans.buildV2 ?? {},
            });
            setWordScores(saved.wordScores ?? {});
            setReadingScore(saved.readingScore);
            setListeningScore(saved.listeningScore);
            setBuildScore(saved.buildScore);
            const restoredStageIndex = saved.version === 4 && Number.isInteger(saved.stageIndex)
              ? Math.min(Math.max(saved.stageIndex ?? 0, 0), Math.max(stages.length - 1, 0))
              : Math.max(0, stages.findIndex((stage) => stage.skill === saved.activeSkill));
            const restoredStage = stages[restoredStageIndex];
            setStageIndex(restoredStageIndex);
            // Browser storage cannot safely serialize microphone Blobs. A reload
            // during Speaking therefore restarts that block so no prior response
            // is silently presented as captured.
            setForwardItemIndex(restoredStage?.skill === 'speaking'
              ? 0
              : saved.version === 4 ? Math.max(0, saved.forwardItemIndex ?? 0) : 0);
            const restoredStarted = saved.startedMediaIds ?? [];
            setStartedMediaIds(restoredStarted);
            // If a tab closed during playback, the one-play stimulus stays consumed,
            // but the candidate is not trapped outside the response controls.
            setCompletedMediaIds([...new Set([...(saved.completedMediaIds ?? []), ...restoredStarted])]);
            setStageDeadlineAt(saved.version === 4 && saved.stageDeadlineAt !== undefined
              ? saved.stageDeadlineAt
              : restoredStage?.timeLimitSeconds ? Date.now() + restoredStage.timeLimitSeconds * 1000 : null);
            setLastWordFocusId(saved.lastWordFocusId ?? '');
            setLastReadingFocusId(saved.lastReadingFocusId ?? '');
            setLastBuildFocusId(saved.lastBuildFocusId ?? '');
            setPhase('exam');
            const focusId = saved.lastBuildFocusId || saved.lastReadingFocusId || saved.lastWordFocusId;
            if (focusId) {
              window.requestAnimationFrame(() => document.getElementById(focusId)?.focus());
            }
          } else {
            setAttemptId(createClientId('attempt'));
          }
        } else {
          setAttemptId(createClientId('attempt'));
        }
      } catch {
        setAttemptId(createClientId('attempt'));
      }
      setHydrated(true);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [stages, storageKey]);

  useEffect(() => {
    if (!hydrated || !attemptId || phase === 'intro' || phase === 'results') return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({
        version: 4,
        attemptId,
        ans,
        wordScores,
        readingScore,
        listeningScore,
        buildScore,
        stageIndex,
        forwardItemIndex,
        stageDeadlineAt,
        startedMediaIds,
        completedMediaIds,
        lastWordFocusId,
        lastReadingFocusId,
        lastBuildFocusId,
      }));
    } catch {
      // Anonymous practice continues without local restoration.
    }
  }, [ans, attemptId, buildScore, completedMediaIds, forwardItemIndex, hydrated, lastBuildFocusId, lastReadingFocusId, lastWordFocusId, listeningScore, phase, readingScore, stageDeadlineAt, stageIndex, startedMediaIds, storageKey, wordScores]);

  useEffect(() => {
    if (phase !== 'exam') return;
    const activeStage = stages[stageIndex];
    const focusId = activeStage?.skill === 'reading'
      ? lastReadingFocusId || lastWordFocusId
      : activeStage?.skill === 'writing' ? lastBuildFocusId : '';
    if (focusId) window.requestAnimationFrame(() => document.getElementById(focusId)?.focus());
  }, [lastBuildFocusId, lastReadingFocusId, lastWordFocusId, phase, stageIndex, stages]);

  const handlers: Handlers = {
    onMCQ: useCallback((id, i) => setAns(p => ({ ...p, mcq: { ...p.mcq, [id]: i } })), []),
    onWord: useCallback((id, num, v) => setAns(p => ({ ...p, word: { ...p.word, [id]: { ...(p.word[id] ?? {}), [num]: v } } })), []),
    onWordFocus: useCallback((inputId) => setLastWordFocusId(inputId), []),
    onSingle: useCallback((id, optionId) => setAns(p => ({ ...p, single: { ...p.single, [id]: optionId } })), []),
    onMulti: useCallback((id, optionIds) => setAns(p => ({ ...p, multi: { ...p.multi, [id]: optionIds } })), []),
    onListening: useCallback((id, optionId) => setAns(p => ({ ...p, listening: { ...p.listening, [id]: optionId } })), []),
    onReadingFocus: useCallback((inputId) => setLastReadingFocusId(inputId), []),
    onBuild: useCallback((id, order) => setAns(p => ({ ...p, build: { ...p.build, [id]: order } })), []),
    onBuildV2: useCallback((id, order) => setAns(p => ({ ...p, buildV2: { ...p.buildV2, [id]: order } })), []),
    onBuildFocus: useCallback((controlId) => setLastBuildFocusId(controlId), []),
    onWrite: useCallback((id, v) => setAns(p => ({ ...p, write: { ...p.write, [id]: v } })), []),
    onSpeak: useCallback((id, v) => setAns(p => ({ ...p, speak: { ...p.speak, [id]: v } })), []),
  };

  const blueprintItems = stages.reduce((total, stage) => total + countStageInteractions(stage), 0);
  const blockedAudioItems = mock.sections.flatMap((section) => section.questions)
    .filter((question) => (question.type === 'toefl-listening-single' || question.type === 'repeat' || question.type === 'speak')
      && question.mediaStatus === 'script-ready-audio-blocked').length;
  const writingQuestions = getSkillSections(mock, 'writing').flatMap(section => section.questions)
    .filter((question): question is WriteQuestion => question.type === 'write');
  const emailQuestion = writingQuestions.find(question => question.taskNumber === 1);
  const discussionQuestion = writingQuestions.find(question => question.taskNumber === 2);
  const speakingPrompts: ToeflSpeakingPromptRef[] = getSkillSections(mock, 'speaking')
    .flatMap(section => section.questions)
    .flatMap<ToeflSpeakingPromptRef>(question => question.type === 'repeat' ? [{
      questionId: question.id,
      taskType: 'repeat' as const,
      label: `Listen and Repeat ${question.itemNumber}`,
    }] : question.type === 'speak' ? [{
      questionId: question.id,
      taskType: 'interview' as const,
      label: `Take an Interview ${question.partNumber}`,
    }] : []);
  const objectiveAnswers: ToeflObjectiveAnswers = {
    word: ans.word,
    single: ans.single,
    multi: ans.multi,
    listening: ans.listening,
    build: ans.buildV2,
  };

  const goSubmit = useCallback(async () => {
    if (scoringWords) return;
    setScoringWords(true);
    setWordScoringError(false);
    setReadingScoringError(false);
    setListeningScoringError(false);
    setBuildScoringError(false);
    let failureSkill: 'reading' | 'listening' | 'writing' = 'reading';
    try {
      const stableAttemptId = attemptId || createClientId('attempt');
      if (!attemptId) setAttemptId(stableAttemptId);
      const serverQuestions = getSkillSections(mock, 'reading')
        .flatMap((section) => section.questions)
        .filter((question): question is WordCompleteQuestion & { objectId: string } =>
          question.type === 'wordcomplete'
          && question.serverScoring === 'toefl-complete-words'
          && typeof question.objectId === 'string');
      const nextScores = { ...wordScores };
      for (const question of serverQuestions) {
        if (nextScores[question.id]) continue;
        const responseByBlank = Object.fromEntries(question.blanks.map((blank) => [
          blank.id!,
          ans.word[question.id]?.[blank.num] ?? '',
        ]));
        const response = await fetch('/api/practica/toefl/complete-the-words/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: question.objectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${question.id}`,
            responses: responseByBlank,
            presentedBlankIds: question.blanks.map((blank) => blank.id),
          }),
        });
        if (!response.ok) {
          setWordScoringError(true);
          throw new Error('word_scoring_unavailable');
        }
        nextScores[question.id] = await response.json() as CompleteWordsScoreResult;
      }
      setWordScores(nextScores);

      const readingQuestions = getSkillSections(mock, 'reading')
        .flatMap((section) => section.questions)
        .filter((question): question is ToeflReadingSingleQuestion | ToeflReadingMultiQuestion =>
          (question.type === 'toefl-reading-single' || question.type === 'toefl-reading-multi')
          && question.serverScoring === 'toefl-reading');
      let nextReadingScore = readingScore;
      if (readingQuestions.length > 0 && !nextReadingScore) {
        const objectIds = new Set(readingQuestions.map((question) => question.objectId));
        if (objectIds.size !== 1) {
          setReadingScoringError(true);
          throw new Error('reading_object_identity_mismatch');
        }
        const [readingObjectId] = objectIds;
        const responses = Object.fromEntries(readingQuestions.map((question) => [
          question.id,
          question.type === 'toefl-reading-single' ? ans.single[question.id] ?? null : ans.multi[question.id] ?? [],
        ]));
        const response = await fetch('/api/practica/toefl/reading/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: readingObjectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${readingObjectId}`,
            responses,
            presentedItemIds: readingQuestions.map((question) => question.id),
          }),
        });
        if (!response.ok) {
          setReadingScoringError(true);
          throw new Error('reading_scoring_unavailable');
        }
        nextReadingScore = await response.json() as ToeflReadingScoreResult;
        setReadingScore(nextReadingScore);
      }

      const listeningQuestions = getSkillSections(mock, 'listening')
        .flatMap((section) => section.questions)
        .filter((question): question is ToeflListeningSingleQuestion =>
          question.type === 'toefl-listening-single'
          && question.serverScoring === 'toefl-listening'
          && question.mediaStatus === 'ready-existing');
      let nextListeningScore = listeningScore;
      if (listeningQuestions.length > 0 && !nextListeningScore) {
        failureSkill = 'listening';
        const objectIds = new Set(listeningQuestions.map((question) => question.objectId));
        if (objectIds.size !== 1) {
          setListeningScoringError(true);
          throw new Error('listening_object_identity_mismatch');
        }
        const [listeningObjectId] = objectIds;
        const response = await fetch('/api/practica/toefl/listening/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: listeningObjectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${listeningObjectId}`,
            responses: Object.fromEntries(listeningQuestions.map((question) => [question.id, ans.listening[question.id] ?? null])),
            presentedItemIds: listeningQuestions.map((question) => question.id),
          }),
        });
        if (!response.ok) {
          setListeningScoringError(true);
          throw new Error('listening_scoring_unavailable');
        }
        nextListeningScore = await response.json() as ToeflListeningScoreResult;
        setListeningScore(nextListeningScore);
      }

      const buildQuestions = getSkillSections(mock, 'writing')
        .flatMap((section) => section.questions)
        .filter((question): question is ToeflBuildSentenceQuestion =>
          question.type === 'toefl-build-sentence' && question.serverScoring === 'toefl-build-sentence');
      let nextBuildScore = buildScore;
      if (buildQuestions.length > 0 && !nextBuildScore) {
        failureSkill = 'writing';
        const objectIds = new Set(buildQuestions.map((question) => question.objectId));
        if (objectIds.size !== 1) {
          setBuildScoringError(true);
          throw new Error('build_sentence_object_identity_mismatch');
        }
        const [buildObjectId] = objectIds;
        const response = await fetch('/api/practica/toefl/build-sentence/score', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            objectId: buildObjectId,
            attemptId: stableAttemptId,
            closeId: `close:${stableAttemptId}:${buildObjectId}`,
            responses: Object.fromEntries(buildQuestions.map((question) => [question.id, ans.buildV2[question.id] ?? []])),
            presentedItemIds: buildQuestions.map((question) => question.id),
          }),
        });
        if (!response.ok) {
          setBuildScoringError(true);
          throw new Error('build_sentence_scoring_unavailable');
        }
        nextBuildScore = await response.json() as ToeflBuildSentenceScoreResult;
        setBuildScore(nextBuildScore);
      }
      setPhase('submit');
    } catch {
      if (failureSkill === 'writing') setBuildScoringError(true);
      setPhase('exam');
    } finally {
      setScoringWords(false);
    }
  }, [ans.buildV2, ans.listening, ans.multi, ans.single, ans.word, attemptId, buildScore, listeningScore, mock, readingScore, scoringWords, wordScores]);

  const handleRetry = useCallback(() => {
    setAns(EMPTY);
    setWordScores({}); setReadingScore(undefined); setListeningScore(undefined); setBuildScore(undefined); setAttemptId(createClientId('attempt')); setLastWordFocusId(''); setLastReadingFocusId(''); setLastBuildFocusId('');
    setStageIndex(0); setForwardItemIndex(0); setStageDeadlineAt(null); setStartedMediaIds([]); setCompletedMediaIds([]); setCurrentPlayingMediaId(''); setRecordings({}); setReceipt(null);
    setWordScoringError(false); setReadingScoringError(false); setListeningScoringError(false); setBuildScoringError(false);
    try { window.localStorage.removeItem(storageKey); } catch { /* local-only reset */ }
    setPhase('intro');
  }, [storageKey]);

  const beginExam = useCallback(() => {
    const firstStage = stages[0];
    setStageIndex(0);
    setForwardItemIndex(0);
    setStageDeadlineAt(firstStage?.timeLimitSeconds ? Date.now() + firstStage.timeLimitSeconds * 1000 : null);
    setPhase('exam');
  }, [stages]);

  const closeStage = useCallback(async (expired = false) => {
    const activeStage = stages[stageIndex];
    if (!activeStage) return;
    if (!expired && !window.confirm(`Cerrar ${activeStage.label}? Después de continuar no podrás volver a este bloque.`)) return;

    const nextIndex = stageIndex + 1;
    if (nextIndex >= stages.length) {
      await goSubmit();
      return;
    }
    const nextStage = stages[nextIndex];
    setStageIndex(nextIndex);
    setForwardItemIndex(0);
    setStageDeadlineAt(nextStage.timeLimitSeconds ? Date.now() + nextStage.timeLimitSeconds * 1000 : null);
    window.requestAnimationFrame(() => document.getElementById('t26-stage-heading')?.focus());
  }, [goSubmit, stageIndex, stages]);

  const activeStage = stages[stageIndex];
  const forwardItems = activeStage?.navigation === 'forward-only' ? flattenForwardItems(activeStage) : [];
  const currentForwardItem = forwardItems[Math.min(forwardItemIndex, Math.max(forwardItems.length - 1, 0))];
  const currentQuestion = currentForwardItem?.question;
  const currentSection = currentForwardItem?.section;
  const currentMediaId = currentQuestion && currentSection
    ? currentQuestion.type === 'toefl-listening-single' && currentQuestion.task !== 'choose-response'
      ? currentSection.mediaId
      : (currentQuestion.type === 'toefl-listening-single' || currentQuestion.type === 'repeat' || currentQuestion.type === 'speak')
        ? currentQuestion.mediaId
        : undefined
    : undefined;
  const currentMediaStarted = currentMediaId ? startedMediaIds.includes(currentMediaId) : false;
  const currentMediaCompleted = currentMediaId
    ? completedMediaIds.includes(currentMediaId) || (currentMediaStarted && currentPlayingMediaId !== currentMediaId)
    : true;
  const currentAudio = currentMediaId ? {
    alreadyPlayed: currentMediaStarted,
    completed: currentMediaCompleted,
    onPlaybackStart: () => {
      setStartedMediaIds((previous) => previous.includes(currentMediaId) ? previous : [...previous, currentMediaId]);
      setCurrentPlayingMediaId(currentMediaId);
    },
    onEnded: () => {
      setCompletedMediaIds((previous) => previous.includes(currentMediaId) ? previous : [...previous, currentMediaId]);
      setCurrentPlayingMediaId('');
    },
    onPlaybackError: () => {
      setStartedMediaIds((previous) => previous.filter((mediaId) => mediaId !== currentMediaId));
      setCurrentPlayingMediaId('');
    },
  } satisfies AudioLifecycle : undefined;
  const currentForwardBlocked = Boolean(currentQuestion
    && (currentQuestion.type === 'toefl-listening-single' || currentQuestion.type === 'repeat' || currentQuestion.type === 'speak')
    && currentQuestion.mediaStatus === 'script-ready-audio-blocked');
  const currentSpeakingComplete = currentQuestion && (currentQuestion.type === 'repeat' || currentQuestion.type === 'speak')
    ? Boolean(recordings[currentQuestion.id])
    : true;
  const forwardCanAdvance = currentForwardBlocked || (currentMediaCompleted && currentSpeakingComplete);

  const advanceForward = () => {
    if (!forwardCanAdvance) return;
    if (forwardItemIndex < forwardItems.length - 1) {
      setForwardItemIndex((index) => index + 1);
      window.requestAnimationFrame(() => document.getElementById('t26-forward-title')?.focus());
      return;
    }
    void closeStage(false);
  };

  if (phase === 'submit') {
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <TOEFLSubmission
          mockId={mock.id}
          mockTitle={mock.title}
          attemptId={attemptId}
          objectiveAnswers={objectiveAnswers}
          writingEmail={emailQuestion ? ans.write[emailQuestion.id] ?? '' : ''}
          writingDiscussion={discussionQuestion ? ans.write[discussionQuestion.id] ?? '' : ''}
          speakingPrompts={speakingPrompts}
          recordings={recordings}
          onBack={() => setPhase('exam')}
          onSuccess={(nextReceipt) => {
            setReceipt(nextReceipt);
            try { window.localStorage.removeItem(storageKey); } catch { /* receipt remains in memory */ }
            setPhase('results');
          }}
        />
      </div>
    );
  }

  if (phase === 'results' && receipt) {
    return (
      <div className="prac-shell"><style>{T26_CSS}</style>
        <Results mock={mock} exam={exam} ans={ans} wordScores={wordScores} readingScore={readingScore} listeningScore={listeningScore} buildScore={buildScore} capturedSpeakingCount={Object.keys(recordings).length} receipt={receipt} onRetry={handleRetry} />
      </div>
    );
  }

  // ── Intro ──
  if (phase === 'intro') {
    return (
      <div className="prac-shell prac-shell--intro"><style>{T26_CSS}</style>
        <div className="prac-intro" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name} · Formato 2026</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{blueprintItems}</span><span className="prac-intro__stat-lbl">Ítems del blueprint</span></div>
            <div className="prac-intro__stat"><span className="prac-intro__stat-val">{stages.length}</span><span className="prac-intro__stat-lbl">Bloques secuenciales</span></div>
            {blockedAudioItems > 0 && <div className="prac-intro__stat"><span className="prac-intro__stat-val">{blockedAudioItems}</span><span className="prac-intro__stat-lbl">Ítems con audio pendiente</span></div>}
          </div>
          <div className="prac-intro__tips">
            <p className="prac-intro__tips-title">Práctica fija alineada al formato vigente desde enero de 2026</p>
            <ul>
              <li>Reading: Complete the Words, Read in Daily Life, Read an Academic Passage.</li>
              <li>Listening: preguntas una por una, sólo hacia adelante y audio de una reproducción.</li>
              <li>Writing: Build a Sentence, Write an Email, Write for an Academic Discussion.</li>
              <li>Speaking: Listen and Repeat y Take an Interview, sin preparación.</li>
            </ul>
            <p>
              WeLearn usa la forma fija de práctica publicada para garantizar 97 interacciones reproducibles.
              No afirma replicar el enrutamiento adaptativo de ETS.
              {blockedAudioItems > 0 && ' Los ítems sin medio se muestran sólo para revisión y no se califican.'}
            </p>
          </div>
          <button className="btn prac-intro__start" onClick={beginExam}>Empezar práctica fija</button>
          <Link href={`/examenes/${exam.slug}`} className="prac-intro__back">Volver a {exam.name}</Link>
        </div>
      </div>
    );
  }

  if (!activeStage) return null;

  // ── Exam ──
  return (
    <div className="prac-shell prac-shell--exam" style={{ '--exam-color': exam.color } as React.CSSProperties}>
      <style>{T26_CSS}</style>
      <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href={`/examenes/${exam.slug}`} className="prac-topbar__back">{exam.name}</Link>
          <span className="prac-topbar__title">{mock.title}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">Bloque {stageIndex + 1}/{stages.length}</span>
          {activeStage.timeLimitSeconds && stageDeadlineAt
            ? <StageDeadlineTimer key={`${activeStage.id}:${stageDeadlineAt}`} deadlineAt={stageDeadlineAt} totalSecs={activeStage.timeLimitSeconds} onExpire={() => { void closeStage(true); }} />
            : <span className="t26-no-clock">Sin segundos oficiales por ítem</span>}
        </div>
      </header>

      <ol className="t26-stage-track" aria-label="Progreso del simulacro">
        {stages.map((stage, index) => (
          <li key={stage.id} aria-current={index === stageIndex ? 'step' : undefined} data-state={index < stageIndex ? 'closed' : index === stageIndex ? 'current' : 'pending'}>
            <span>{index + 1}</span>{stage.label}
          </li>
        ))}
      </ol>

      {wordScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Complete the Words por un fallo técnico. Esas respuestas no se convirtieron en errores académicos y siguen guardadas localmente. Revisa el bloque y vuelve a finalizar.
        </div>
      )}
      {readingScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Read in Daily Life y Academic Passage por un fallo técnico. Tus selecciones siguen guardadas y ninguna se contó como error académico. Vuelve a finalizar para reintentar.
        </div>
      )}
      {listeningScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir los ítems de Listening que sí tienen audio. Tus selecciones siguen guardadas y ninguna se contó como error académico. Vuelve a finalizar para reintentar.
        </div>
      )}
      {buildScoringError && (
        <div className="t26-technical" role="status" aria-live="polite">
          No pudimos corregir Build a Sentence por un fallo técnico. Tus órdenes siguen guardados y ninguno se contó como error académico. Vuelve a finalizar para reintentar.
        </div>
      )}

      <div className="ielts-exam-body">
        <div className="t26-stage-heading">
          <p className="t26-stage-kicker">Bloque {stageIndex + 1} de {stages.length} · {activeStage.navigation === 'forward-only' ? 'sólo hacia adelante' : 'revisión dentro del módulo'}</p>
          <h1 id="t26-stage-heading" tabIndex={-1}>{activeStage.label}</h1>
          <p>{activeStage.timingDisclosure}</p>
          <p>Al cerrar este bloque no podrás volver. El avance se guarda sólo en este navegador.</p>
        </div>
        {activeStage.navigation === 'within-module' && activeStage.sections.map((section, index) => (
          <SectionPanel key={`${section.part}-${index}`} section={section} ans={ans} handlers={handlers} />
        ))}
        {activeStage.navigation === 'forward-only' && currentForwardItem && (
          <ForwardItemPanel
            key={currentMediaId ?? currentForwardItem.question.id}
            stage={activeStage}
            section={currentForwardItem.section}
            question={currentForwardItem.question}
            position={currentForwardItem.position}
            total={currentForwardItem.total}
            ans={ans}
            handlers={handlers}
            audio={currentAudio}
            speakingRecording={currentQuestion ? recordings[currentQuestion.id] : undefined}
            onSpeakingRecordingChange={(recording) => {
              if (!currentQuestion) return;
              setRecordings(previous => {
                if (!recording) {
                  const next = { ...previous };
                  delete next[currentQuestion.id];
                  return next;
                }
                return { ...previous, [currentQuestion.id]: recording };
              });
            }}
          />
        )}
        <div className="ielts-exam-footer">
          <div className="ielts-skill-nav__row">
            {activeStage.navigation === 'forward-only'
              ? (
                <button type="button" className="btn" disabled={!forwardCanAdvance || scoringWords} onClick={advanceForward}>
                  {scoringWords
                    ? 'Calculando resultados…'
                    : currentForwardBlocked && forwardItemIndex < forwardItems.length - 1
                      ? 'Omitir ítem sin audio y continuar →'
                    : forwardItemIndex < forwardItems.length - 1
                      ? 'Confirmar y siguiente ítem →'
                      : stageIndex < stages.length - 1 ? 'Cerrar bloque y continuar →' : 'Finalizar práctica'}
                </button>
              )
              : (
                <button type="button" className="btn" disabled={scoringWords} onClick={() => { void closeStage(false); }}>
                  {scoringWords ? 'Calculando resultados…' : stageIndex < stages.length - 1 ? 'Cerrar bloque y continuar →' : 'Finalizar práctica'}
                </button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal CSS for the 2026-only task types (supplements ielts-*/prac-* in globals.css).
const T26_CSS = `
  .t26-stimulus { white-space: pre-wrap; font-family: inherit; background: var(--surface,#f6f7f9); border:1px solid var(--line-soft,#e3e6ea); border-radius:8px; padding:.75rem 1rem; margin:.5rem 0; line-height:1.6; }
  .t26-word .ielts-form__body { max-width:78ch; font-size:clamp(1rem,1.25vw,1.1rem); line-height:2.05; }
  .t26-word__wrap { position:relative; display:inline-flex; align-items:baseline; vertical-align:baseline; margin-inline:.06em; padding:.55em .02em 0; white-space:nowrap; }
  .t26-word__num { position:absolute; inset-block-start:.05em; inset-inline-start:.05em; color:var(--muted,#687386); font:700 .52rem/1 var(--mono,monospace); letter-spacing:.02em; }
  .t26-word__given { font-weight:600; }
  .t26-word__input { box-sizing:content-box; min-width:2.45ch; min-height:0; height:auto; border:none; border-bottom:2px solid var(--exam-color,#0a56c4); border-radius:2px 2px 0 0; background:rgba(10,86,196,.045); color:var(--ink,#1a2230); font-family:inherit; font-size:1em; font-weight:600; line-height:1.1; text-align:left; vertical-align:baseline; margin:0; padding:.18em .1em .08em; transition:border-color .15s ease,background-color .15s ease,box-shadow .15s ease; }
  .t26-word__input:focus-visible { outline:2px solid #f59e0b; outline-offset:2px; background:rgba(10,86,196,.09); box-shadow:0 2px 0 rgba(245,158,11,.35); }
  .t26-word__input[aria-invalid="true"] { border-bottom-color:#b42318; background:rgba(180,35,24,.08); }
  .t26-sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
  .t26-technical { margin:.8rem auto 0; max-width:1100px; padding:.8rem 1rem; border-left:4px solid #b42318; background:rgba(180,35,24,.08); color:var(--ink,#1a2230); font-size:.88rem; line-height:1.55; }
  .t26-audio-blocked { margin:.7rem 0; padding:.7rem .8rem; border:1px solid #b7791f; border-left-width:4px; border-radius:8px; background:rgba(183,121,31,.09); color:var(--ink,#1a2230); font-size:.88rem; line-height:1.55; }
  .t26-audio-blocked + .ielts-mcq__text { margin-top:.8rem; }
  [data-media-status="script-ready-audio-blocked"] .prac-option:disabled { opacity:.62; cursor:not-allowed; }
  .t26-section-note { margin:.7rem 0; padding:.65rem .75rem; border-left:3px solid var(--exam-color,#0a56c4); background:rgba(10,86,196,.06); color:var(--ink,#1a2230); font-size:.86rem; line-height:1.55; }
  .t26-reading-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #047857; border-radius:12px; background:rgba(4,120,87,.07); color:var(--ink,#1a2230); }
  .t26-build-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #047857; border-radius:12px; background:rgba(4,120,87,.07); color:var(--ink,#1a2230); }
  .t26-writing-report { max-width:900px; margin:1rem auto; padding:1rem; border:1px solid #1a4fcc; border-radius:12px; background:rgba(26,79,204,.07); color:var(--ink,#1a2230); }
  .t26-reading-report h2, .t26-build-report h2, .t26-writing-report h2 { margin:0 0 .5rem; font-size:1.1rem; }
  .t26-reading-report p, .t26-build-report p, .t26-writing-report p { margin:.35rem 0; line-height:1.5; }
  .t26-build__answer { min-height:48px; border:1px dashed var(--line-soft,#cbd2da); border-radius:10px; padding:.6rem; display:flex; flex-wrap:wrap; gap:.4rem; align-items:center; margin:.5rem 0; }
  .t26-build__placeholder { color:var(--muted,#8a94a3); font-size:.9rem; }
  .t26-build__bank { display:flex; flex-wrap:wrap; gap:.4rem; margin-top:.5rem; }
  .t26-build__tile { font:inherit; padding:.4rem .8rem; border-radius:8px; border:1px solid var(--exam-color,#0a56c4); background:rgba(10,86,196,.06); color:var(--ink,#1a2230); cursor:pointer; }
  .t26-build__tile--used { opacity:.35; cursor:default; }
  .t26-build__tile--placed { background:var(--exam-color,#0a56c4); color:#fff; }
  .t26-build__hint { font-size:.85rem; color:var(--muted,#8a94a3); margin:.25rem 0 .5rem; }
  .t26-repeat__instruction { font-size:.9rem; margin:.6rem 0; }
  .t26-repeat__target { font-size:1.05rem; font-weight:600; margin-top:.5rem; padding:.6rem .9rem; background:rgba(10,86,196,.06); border-radius:8px; }
  .t26-recorder { margin:1rem 0; padding:1rem; border:1px solid var(--line-soft,#d9dee6); border-radius:12px; background:var(--surface,#fff); }
  .t26-recorder h3 { margin:0 0 .4rem; font-size:1rem; }
  .t26-recorder p { line-height:1.5; }
  .t26-recorder__actions { display:flex; flex-wrap:wrap; align-items:center; gap:.65rem; }
  .t26-recorder__live { color:#b42318; font-weight:800; }
  .t26-recorder audio { width:100%; margin-top:.8rem; }
  .t26-no-clock { max-width:190px; color:var(--muted,#687386); font-size:.76rem; line-height:1.3; text-align:right; }
  .t26-stage-track { display:flex; gap:.45rem; max-width:1200px; margin:.75rem auto 0; padding:0 1rem .5rem; overflow-x:auto; list-style:none; }
  .t26-stage-track li { display:flex; align-items:center; gap:.38rem; flex:0 0 auto; padding:.38rem .55rem; border:1px solid var(--line-soft,#d9dee6); border-radius:999px; color:var(--muted,#687386); font-size:.72rem; }
  .t26-stage-track li span { display:grid; place-items:center; width:1.25rem; height:1.25rem; border-radius:50%; background:var(--line-soft,#d9dee6); font-weight:800; }
  .t26-stage-track li[data-state="closed"] { color:#047857; border-color:#047857; }
  .t26-stage-track li[data-state="closed"] span { background:#047857; color:#fff; }
  .t26-stage-track li[data-state="current"] { color:var(--ink,#1a2230); border-color:var(--exam-color,#0a56c4); background:rgba(10,86,196,.07); font-weight:700; }
  .t26-stage-track li[data-state="current"] span { background:var(--exam-color,#0a56c4); color:#fff; }
  .t26-stage-heading { max-width:1100px; margin:1rem auto; padding:1rem; border:1px solid var(--line-soft,#d9dee6); border-radius:12px; background:var(--surface,#fff); color:var(--ink,#1a2230); }
  .t26-stage-heading h1 { margin:.15rem 0 .5rem; font-size:clamp(1.35rem,3vw,2rem); }
  .t26-stage-heading h1:focus-visible, #t26-forward-title:focus-visible { outline:3px solid #f59e0b; outline-offset:4px; }
  .t26-stage-heading p { margin:.35rem 0; line-height:1.5; }
  .t26-stage-kicker { color:var(--exam-color,#0a56c4); font-size:.76rem; font-weight:800; letter-spacing:.04em; text-transform:uppercase; }
  .t26-results { width:min(100% - 2rem,1000px); margin:2rem auto; padding:clamp(1rem,4vw,2.25rem); color:var(--ink,#1a2230); }
  .t26-results h1 { margin:.2rem 0 1rem; font-size:clamp(1.8rem,5vw,3rem); }
  .t26-results__disclosure { padding:1rem; border:1px solid #b7791f; border-left-width:5px; border-radius:10px; background:rgba(183,121,31,.09); line-height:1.6; }
  .t26-results__grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; margin:1.5rem 0; }
  .t26-results__grid section { padding:1rem; border:1px solid var(--line-soft,#d9dee6); border-radius:12px; background:var(--surface,#fff); }
  .t26-results__grid h2 { margin:0 0 .45rem; font-size:1.05rem; }
  .t26-results__grid p { margin:.35rem 0; line-height:1.5; }
  .t26-results__raw { color:var(--exam-color,#0a56c4); font-size:1.35rem; font-weight:800; }
  .t26-results__writing { margin:1.5rem 0; }
  .t26-results__writing > h2 { margin:0 0 .75rem; }
  .t26-writing-report { max-width:none; background:var(--surface,#fff); }
  .t26-writing-report h3 { margin:0; font-size:1.05rem; }
  .t26-writing-report__head { display:flex; justify-content:space-between; align-items:flex-start; gap:1rem; }
  .t26-writing-report__head strong { color:var(--exam-color,#0a56c4); font-size:1.7rem; }
  .t26-writing-report__notice { padding:.7rem; border-left:3px solid #b7791f; background:rgba(183,121,31,.08); font-size:.84rem; }
  .t26-writing-report__criteria { display:grid; grid-template-columns:repeat(auto-fit,minmax(190px,1fr)); gap:.65rem; margin:1rem 0; }
  .t26-writing-report__criteria > div { padding:.7rem; border:1px solid var(--line-soft,#d9dee6); border-radius:8px; }
  .t26-writing-report details { margin-top:.75rem; }
  .t26-writing-report summary { cursor:pointer; font-weight:750; }
  .t26-writing-report li { margin:.5rem 0; line-height:1.5; }
  .t26-writing-report__rewrite { white-space:pre-wrap; }
  .t26-results__date { color:var(--muted,#687386); }
  .t26-results__actions { display:flex; flex-wrap:wrap; gap:.75rem; margin-top:1rem; }
  @media (max-width:640px) {
    .t26-results__grid { grid-template-columns:1fr; }
    .t26-no-clock, .prac-topbar__title, .prac-topbar__right > .ielts-topbar__progress, .prac-timer__label { display:none; }
    .prac-topbar { gap:.5rem; padding-inline:.75rem; }
    .prac-topbar__right, .prac-timer { min-width:0; gap:.45rem; }
    .prac-timer__bar { width:48px; }
  }
  @media (max-width:420px) { .t26-word .ielts-form__body { font-size:1rem; line-height:2.2; overflow-wrap:normal; } .t26-word__wrap { margin-inline:.08em; padding-block-start:.62em; } }
  @media (prefers-reduced-motion:reduce) { .t26-word *, .t26-technical, .t26-audio-blocked { transition-duration:.01ms!important; animation-duration:.01ms!important; scroll-behavior:auto!important; } }
`;
