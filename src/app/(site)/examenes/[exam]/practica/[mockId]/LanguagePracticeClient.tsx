'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { saveExamResult } from '@/lib/actions/saveExamResult';
import { Timer, SkillTabs } from '@/components/exam-runner/primitives';
import { WritingAssessmentPanel } from '@/components/labs/WritingAssessmentPanel';
import { isFreeCambridgeMock } from '@/lib/labs/exam-bridge/cambridge';
import { isFreeGoetheMock } from '@/lib/labs/exam-bridge/goethe';
import { isFreeCilsCeliMock } from '@/lib/labs/exam-bridge/cils-celi';
import { isFreeDelfDalfMock } from '@/lib/labs/exam-bridge/delf-dalf';
import { isFreeCelpeBrasMock } from '@/lib/labs/exam-bridge/celpe-bras';
import type { Exam } from '@/data/exams';
import type {
  MockExam,
  MockSection,
  Question,
  MCQQuestion,
  WriteQuestion,
  SpeakQuestion,
  FormGroupQuestion,
  FormBlank,
  MultiSelectQuestion,
  MatchingGroupQuestion,
} from '@/data/mocks/types';

// ── Helpers ───────────────────────────────────────────────────────────────────

function isYouTube(url?: string) {
  return !!url && (url.includes('youtube.com') || url.includes('youtu.be'));
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = Math.floor(s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

function normaliseAnswer(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ');
}

function isAcceptedAnswer(value: string | undefined, blank: FormBlank) {
  if (!value) return false;
  const candidate = normaliseAnswer(value);
  return blank.answers.some(answer => normaliseAnswer(answer) === candidate);
}

function sameLetterSet(a: string[], b: string[]) {
  if (a.length !== b.length) return false;
  const left = [...a].map(x => x.toUpperCase()).sort().join('|');
  const right = [...b].map(x => x.toUpperCase()).sort().join('|');
  return left === right;
}

const SKILL_ORDER = ['listening', 'reading', 'writing', 'speaking', 'general'];
const SKILL_LABEL: Record<string, string> = {
  listening: 'Listening', reading: 'Reading', writing: 'Writing',
  speaking: 'Speaking', general: 'General',
};

function getSkillSections(mock: MockExam, skill: string) {
  return mock.sections.filter(s => (s.skill ?? 'general') === skill);
}

function orderedSkills(mock: MockExam) {
  return SKILL_ORDER.filter(sk => mock.sections.some(s => (s.skill ?? 'general') === sk));
}

function getObjectiveWeight(mock: MockExam, section: MockSection) {
  if (mock.examSlug !== 'cambridge-b2') return 1;
  const title = section.title.toLowerCase();
  if (title.includes('part 4') || title.includes('part 5') || title.includes('part 6')) return 2;
  return 1;
}

function getObjectiveScores(
  mock: MockExam,
  mcqAnswers: Record<string, number>,
  formAnswers: Record<string, Record<number, string>>,
  multiAnswers: Record<string, string[]>,
  matchAnswers: Record<string, Record<number, string>>
) {
  return mock.sections.map(sec => {
    let correct = 0;
    let total = 0;
    const weight = getObjectiveWeight(mock, sec);

    sec.questions.forEach(q => {
      if (q.type === 'mcq' || q.type === 'dialog') {
        total += weight;
        if (mcqAnswers[q.id] === q.answer) correct += weight;
      }

      if (q.type === 'formgroup') {
        q.blanks.forEach(blank => {
          total += weight;
          if (isAcceptedAnswer(formAnswers[q.id]?.[blank.num], blank)) correct += weight;
        });
      }

      if (q.type === 'multiselect') {
        total += weight;
        if (sameLetterSet(multiAnswers[q.id] ?? [], q.answers)) correct += weight;
      }

      if (q.type === 'matching') {
        q.items.forEach(item => {
          total += weight;
          if ((matchAnswers[q.id]?.[item.num] ?? '').toUpperCase() === item.answer.toUpperCase()) correct += weight;
        });
      }
    });

    return { part: sec.part, title: sec.title, skill: sec.skill, total, correct };
  }).filter(s => s.total > 0);
}

// ── Audio / Video player ──────────────────────────────────────────────────────

function MediaPlayer({ url }: { url: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playing, setPlaying] = useState(false);

  if (isYouTube(url)) {
    return (
      <div className="lang-media lang-media--video">
        <iframe
          src={url}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="lang-media__iframe"
          title="Estímulo de audio/video"
        />
      </div>
    );
  }

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play(); setPlaying(true); }
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    a.currentTime = ((e.clientX - rect.left) / rect.width) * duration;
  };

  return (
    <div className="lang-media lang-media--audio">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={() => setCurrent(audioRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />
      <button onClick={toggle} className="lang-media__btn">
        {playing ? '⏸' : '▶'} {playing ? 'Pausar' : 'Reproducir'}
      </button>
      <div className="lang-media__progress" onClick={seek} role="slider" aria-label="Progreso">
        <div className="lang-media__fill" style={{ width: duration ? `${(current / duration) * 100}%` : '0%' }} />
      </div>
      <span className="lang-media__time">{formatTime(current)} / {formatTime(duration)}</span>
    </div>
  );
}

// ── Question renderers ────────────────────────────────────────────────────────

function MCQRenderer({
  q,
  answer,
  onAnswer,
  showResult,
}: {
  q: MCQQuestion;
  answer: number | undefined;
  onAnswer: (i: number) => void;
  showResult: boolean;
}) {
  return (
    <div className="lang-q">
      {q.stimulusLabel && <p className="lang-q__label">{q.stimulusLabel}</p>}
      {q.stimulus && <pre className="lang-q__stimulus">{q.stimulus}</pre>}
      <p className="lang-q__text">{q.text}</p>
      <div className="lang-q__options">
        {q.options.map((opt, i) => {
          let cls = 'lang-opt';
          if (showResult) {
            if (i === q.answer) cls += ' lang-opt--correct';
            else if (i === answer) cls += ' lang-opt--wrong';
          } else if (answer === i) {
            cls += ' lang-opt--selected';
          }
          // Strip leading letter prefix added by some mock files (e.g. "A  role" → "role")
          const optText = opt.replace(/^[A-H][\s.)\-]+/, '');
          return (
            <button key={i} onClick={() => !showResult && onAnswer(i)} className={cls}>
              <span className="lang-opt__letter">{String.fromCharCode(65 + i)}</span>
              <span>{optText}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FormGroupRenderer({
  q,
  values,
  onChange,
}: {
  q: FormGroupQuestion;
  values: Record<number, string>;
  onChange: (num: number, val: string) => void;
}) {
  const parts = q.template.split(/(\{\{\d+\}\})/g);
  return (
    <div className="lang-q">
      <p className="lang-q__label">{q.groupLabel}</p>
      {q.title && <p className="lang-q__title">{q.title}</p>}
      {q.example && <p className="lang-q__example">Ejemplo: {q.example}</p>}
      {q.imageUrl && <img src={q.imageUrl} alt={q.imageAlt ?? ''} className="lang-q__img" />}
      <div className="lang-formgroup">
        {parts.map((part, idx) => {
          const match = part.match(/^\{\{(\d+)\}\}$/);
          if (match) {
            const num = parseInt(match[1]);
            const blank = q.blanks.find(b => b.num === num);
            return (
              <input
                key={idx}
                type="text"
                value={values[num] ?? ''}
                onChange={e => onChange(num, e.target.value)}
                placeholder={`(${num})`}
                className="lang-formgroup__input"
                maxLength={(blank?.maxWords ?? 3) * 15}
              />
            );
          }
          return <span key={idx} style={{ whiteSpace: 'pre-wrap' }}>{part}</span>;
        })}
      </div>
    </div>
  );
}

function MultiSelectRenderer({
  q,
  selected,
  onToggle,
}: {
  q: MultiSelectQuestion;
  selected: string[];
  onToggle: (letter: string) => void;
}) {
  return (
    <div className="lang-q">
      <p className="lang-q__text">{q.text}</p>
      <p className="lang-q__hint">Selecciona {q.selectCount} respuestas.</p>
      <div className="lang-q__options">
        {q.options.map(opt => (
          <button
            key={opt.letter}
            onClick={() => onToggle(opt.letter)}
            className={`lang-opt${selected.includes(opt.letter) ? ' lang-opt--selected' : ''}`}
          >
            <span className="lang-opt__letter">{opt.letter}</span>
            <span>{opt.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function MatchingRenderer({
  q,
  values,
  onChange,
}: {
  q: MatchingGroupQuestion;
  values: Record<number, string>;
  onChange: (num: number, val: string) => void;
}) {
  return (
    <div className="lang-q">
      {q.groupLabel && <p className="lang-q__label">{q.groupLabel}</p>}
      <div className="lang-matching">
        <div className="lang-matching__endings">
          {q.endings.map(e => (
            <div key={e.letter} className="lang-matching__ending">
              <span className="lang-opt__letter">{e.letter}</span>
              <span>{e.text}</span>
            </div>
          ))}
        </div>
        <div className="lang-matching__items">
          {q.items.map(item => (
            <div key={item.num} className="lang-matching__item">
              <span className="lang-matching__num">{item.num}.</span>
              <span className="lang-matching__stem">{item.stem}</span>
              <select
                value={values[item.num] ?? ''}
                onChange={e => onChange(item.num, e.target.value)}
                className="lang-matching__select"
              >
                <option value="">–</option>
                {q.endings.map(e => <option key={e.letter} value={e.letter}>{e.letter}</option>)}
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WriteRenderer({
  q,
  value,
  onChange,
}: {
  q: WriteQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;
  const enough = words >= q.minWords;
  return (
    <div className="lang-q lang-q--write">
      {q.stimulusLabel && <p className="lang-q__label">{q.stimulusLabel}</p>}
      {q.imageUrl && <img src={q.imageUrl} alt={q.imageAlt ?? ''} className="lang-q__img" />}
      {q.stimulus && <div className="lang-q__stimulus lang-q__stimulus--block">{q.stimulus}</div>}
      <p className="lang-q__text">{q.text}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="lang-write__area"
        rows={14}
        placeholder={`Escribe aquí tu respuesta en el idioma del examen (mínimo ${q.minWords} palabras)...`}
      />
      <p className={`lang-write__count${enough ? ' lang-write__count--ok' : ''}`}>
        {words} / {q.minWords} palabras {enough ? '✓' : ''}
      </p>
    </div>
  );
}

function SpeakRenderer({
  q,
  value,
  onChange,
}: {
  q: SpeakQuestion;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="lang-q lang-q--speak">
      <div className="lang-speak__badge">🎙️ Parte {q.partNumber}</div>
      <p className="lang-q__text">{q.text}</p>
      {q.imageUrls && q.imageUrls.length > 0 && (
        <div className="lang-speak__images">
          {q.imageUrls.map((url, i) => (
            <figure key={url} className="lang-speak__image-card">
              <img
                src={url}
                alt={q.imageAlts?.[i] ?? `Speaking Part ${q.partNumber} visual ${i + 1}`}
                className="lang-speak__image"
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
        </div>
      )}
      {q.cueCard && (
        <div className="lang-speak__cuecard">
          <p className="lang-speak__cuelabel">Tarjeta de apoyo</p>
          <pre className="lang-speak__cuetext">{q.cueCard}</pre>
        </div>
      )}
      {q.followUp && q.followUp.length > 0 && (
        <div className="lang-speak__followup">
          <p className="lang-speak__followlabel">Preguntas de seguimiento:</p>
          <ul>
            {q.followUp.map((f, i) => <li key={i}>{f}</li>)}
          </ul>
        </div>
      )}
      <div className="lang-speak__note">
        Practica en voz alta. El examen real se realiza con un examinador.
      </div>
      <label className="lang-speak__notes">
        <span className="lang-speak__notes-label">Notas de respuesta</span>
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="lang-speak__notes-area"
          rows={5}
          placeholder="Escribe aquí tus ideas clave, conectores o una transcripción breve de tu respuesta..."
        />
      </label>
    </div>
  );
}

// ── Passage text: renders [WORD] as keyword badges ───────────────────────────

function PassageText({ text }: { text: string }) {
  // Split on [WORD] patterns and render them as styled badges
  const parts = text.split(/(\[[A-Z-]+\])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (/^\[[A-Z-]+\]$/.test(part)) {
          const word = part.slice(1, -1);
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                fontFamily: 'var(--mono, monospace)',
                fontSize: '0.72em',
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#1d4ed8',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                borderRadius: 4,
                padding: '1px 6px',
                margin: '0 2px',
                verticalAlign: 'middle',
                textTransform: 'uppercase',
              }}
            >
              {word}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ── Transcript block (collapsible) ───────────────────────────────────────────

function TranscriptBlock({ transcript }: { transcript: string }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="lang-section__passage">
      <button
        onClick={() => setOpen(o => !o)}
        className="lang-section__passage-label"
        style={{ cursor: 'pointer', background: 'none', border: 'none', textAlign: 'left', width: '100%', display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}
      >
        <span>📄 Transcript</span>
        <span style={{ fontSize: '0.75em', opacity: 0.7 }}>{open ? '▲' : '▼'}</span>
      </button>
      {open && (
        <div className="lang-section__passage-text" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit', lineHeight: 1.75 }}>
          {transcript}
        </div>
      )}
    </div>
  );
}

// ── Section view ──────────────────────────────────────────────────────────────

function SectionView({
  section,
  mcqAnswers,
  writeAnswers,
  speakingAnswers,
  formAnswers,
  multiAnswers,
  matchAnswers,
  onMCQ,
  onWrite,
  onSpeak,
  onForm,
  onMulti,
  onMatch,
  showResults,
}: {
  section: MockSection;
  mcqAnswers: Record<string, number>;
  writeAnswers: Record<string, string>;
  speakingAnswers: Record<string, string>;
  formAnswers: Record<string, Record<number, string>>;
  multiAnswers: Record<string, string[]>;
  matchAnswers: Record<string, Record<number, string>>;
  onMCQ: (id: string, i: number) => void;
  onWrite: (id: string, v: string) => void;
  onSpeak: (id: string, v: string) => void;
  onForm: (id: string, num: number, v: string) => void;
  onMulti: (id: string, letter: string) => void;
  onMatch: (id: string, num: number, v: string) => void;
  showResults: boolean;
}) {
  return (
    <div className="lang-section">
      <div className="lang-section__header">
        <h2 className="lang-section__title">{section.title}</h2>
        <p className="lang-section__instructions">{section.instructions}</p>
      </div>

      {section.audioUrl && (
        <div className="lang-section__media">
          <MediaPlayer url={section.audioUrl} />
        </div>
      )}

      {section.passage && (
        <div className="lang-section__passage">
          <p className="lang-section__passage-label">📄 Read the text</p>
          <div className="lang-section__passage-text">
            <PassageText text={section.passage} />
          </div>
        </div>
      )}

      {section.transcript && (
        <TranscriptBlock transcript={section.transcript} />
      )}

      <div className="lang-section__questions">
        {section.questions.map((q: Question) => {
          if (q.type === 'mcq' || q.type === 'dialog') {
            return (
              <MCQRenderer
                key={q.id}
                q={q as MCQQuestion}
                answer={mcqAnswers[q.id]}
                onAnswer={i => onMCQ(q.id, i)}
                showResult={showResults}
              />
            );
          }
          if (q.type === 'write') {
            return (
              <WriteRenderer
                key={q.id}
                q={q as WriteQuestion}
                value={writeAnswers[q.id] ?? ''}
                onChange={v => onWrite(q.id, v)}
              />
            );
          }
          if (q.type === 'speak') {
            return (
              <SpeakRenderer
                key={q.id}
                q={q as SpeakQuestion}
                value={speakingAnswers[q.id] ?? ''}
                onChange={v => onSpeak(q.id, v)}
              />
            );
          }
          if (q.type === 'formgroup') {
            return (
              <FormGroupRenderer
                key={q.id}
                q={q as FormGroupQuestion}
                values={formAnswers[q.id] ?? {}}
                onChange={(num, v) => onForm(q.id, num, v)}
              />
            );
          }
          if (q.type === 'multiselect') {
            return (
              <MultiSelectRenderer
                key={q.id}
                q={q as MultiSelectQuestion}
                selected={multiAnswers[q.id] ?? []}
                onToggle={letter => onMulti(q.id, letter)}
              />
            );
          }
          if (q.type === 'matching') {
            return (
              <MatchingRenderer
                key={q.id}
                q={q as MatchingGroupQuestion}
                values={matchAnswers[q.id] ?? {}}
                onChange={(num, v) => onMatch(q.id, num, v)}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}

// ── Results ───────────────────────────────────────────────────────────────────

function ResultsView({ mock, exam, mcqAnswers, writeAnswers, speakingAnswers, formAnswers, multiAnswers, matchAnswers, onRetry }: {
  mock: MockExam;
  exam: Exam;
  mcqAnswers: Record<string, number>;
  writeAnswers: Record<string, string>;
  speakingAnswers: Record<string, string>;
  formAnswers: Record<string, Record<number, string>>;
  multiAnswers: Record<string, string[]>;
  matchAnswers: Record<string, Record<number, string>>;
  onRetry: () => void;
}) {
  const objectiveSections = getObjectiveScores(mock, mcqAnswers, formAnswers, multiAnswers, matchAnswers);

  const totalCorrect = objectiveSections.reduce((a, s) => a + s.correct, 0);
  const totalQ = objectiveSections.reduce((a, s) => a + s.total, 0);
  const score = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

  // Collect all write questions across all sections
  const writeQuestions = mock.sections.flatMap(sec =>
    sec.questions.filter(q => q.type === 'write') as WriteQuestion[]
  );
  const speakQuestions = mock.sections.flatMap(sec =>
    sec.questions.filter(q => q.type === 'speak') as SpeakQuestion[]
  );
  const writtenResponses = writeQuestions.filter(q => writeAnswers[q.id]?.trim());
  const speakingNotes = speakQuestions.filter(q => speakingAnswers[q.id]?.trim());
  const objectiveUnit = mock.examSlug === 'cambridge-b2' ? 'puntos objetivos' : 'correctas';
  const hasReviewResponses = writtenResponses.length > 0 || speakingNotes.length > 0;

  return (
    <div className="prac-results">
      <div className="prac-results__hero" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <p className="prac-results__label">Resultado - preguntas objetivas</p>
        <div className="prac-results__score">{score}</div>
        <p className="prac-results__score-sub">sobre 100</p>
        <p className="prac-results__fraction">{totalCorrect} / {totalQ} {objectiveUnit}</p>
      </div>

      {objectiveSections.length > 0 && (
        <div className="prac-results__sections">
          {objectiveSections.map(s => {
            const pct = s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0;
            return (
              <div key={s.part} className="prac-results__sec">
                <div className="prac-results__sec-header">
                  <span>{s.title}</span>
                  <span style={{ color: exam.color, fontWeight: 700 }}>{s.correct}/{s.total}</span>
                </div>
                <div className="prac-results__bar">
                  <div className="prac-results__bar-fill" style={{ width: `${pct}%`, background: exam.color }} />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Writing responses — shown to student for self-review */}
      {writtenResponses.length > 0 && (
        <div className="prac-results__responses">
          <h3 className="prac-results__responses-title">
            ✍️ Tus respuestas escritas
          </h3>
          <p className="prac-results__responses-copy">
            Estas respuestas han sido enviadas a tu profesor para corrección. Recibirás feedback personalizado.
          </p>
          {writtenResponses.map(q => (
            <div key={q.id} className="prac-results__response-card">
              <p className="prac-results__response-label">
                {q.stimulusLabel ?? `Tarea ${q.taskNumber ?? ''}`}
              </p>
              <div className="prac-results__response-text">
                {writeAnswers[q.id]}
              </div>
              <p className="prac-results__response-meta">
                {writeAnswers[q.id].trim().split(/\s+/).length} palabras
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Motor automático de Writing — solo Cambridge B2 tiene rúbrica propia por ahora */}
      {mock.examSlug === 'cambridge-b2' && isFreeCambridgeMock(mock.id) && (() => {
        const cbTask1 = writeQuestions.find(q => q.taskNumber === 1);
        const cbTask2 = writeQuestions.find(q => q.taskNumber === 2);
        return (
          <>
            {cbTask1 && writeAnswers[cbTask1.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="cambridge-b2"
                mockId={mock.id}
                taskNumber={1}
                taskLabel="Writing — Part 1 (Essay)"
                essay={writeAnswers[cbTask1.id]}
                maxScore={5}
                fallbackNotice="Tu Part 1 ha sido registrada para revisión."
              />
            )}
            {cbTask2 && writeAnswers[cbTask2.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="cambridge-b2"
                mockId={mock.id}
                taskNumber={2}
                taskLabel="Writing — Part 2"
                essay={writeAnswers[cbTask2.id]}
                maxScore={5}
                fallbackNotice="Tu Part 2 ha sido registrada para revisión."
              />
            )}
          </>
        );
      })()}

      {mock.examSlug === 'goethe' && isFreeGoetheMock(mock.id) && (() => {
        const gTask1 = writeQuestions.find(q => q.taskNumber === 1);
        if (!gTask1 || !writeAnswers[gTask1.id]?.trim()) return null;
        return (
          <WritingAssessmentPanel
            examSlug="goethe"
            mockId={mock.id}
            taskNumber={1}
            taskLabel="Schreiben"
            essay={writeAnswers[gTask1.id]}
            maxScore={25}
            fallbackNotice="Tu Schreiben ha sido registrado para revisión."
          />
        );
      })()}

      {mock.examSlug === 'cils-celi' && isFreeCilsCeliMock(mock.id) && (() => {
        const cTask1 = writeQuestions.find(q => q.taskNumber === 1);
        const cTask2 = writeQuestions.find(q => q.taskNumber === 2);
        return (
          <>
            {cTask1 && writeAnswers[cTask1.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="cils-celi"
                mockId={mock.id}
                taskNumber={1}
                taskLabel="Produzione Scritta 1"
                essay={writeAnswers[cTask1.id]}
                maxScore={20}
                fallbackNotice="Tu Produzione Scritta 1 ha sido registrada para revisión."
              />
            )}
            {cTask2 && writeAnswers[cTask2.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="cils-celi"
                mockId={mock.id}
                taskNumber={2}
                taskLabel="Produzione Scritta 2"
                essay={writeAnswers[cTask2.id]}
                maxScore={20}
                fallbackNotice="Tu Produzione Scritta 2 ha sido registrada para revisión."
              />
            )}
          </>
        );
      })()}

      {mock.examSlug === 'delf-dalf' && isFreeDelfDalfMock(mock.id) && (() => {
        const dTask1 = writeQuestions.find(q => q.taskNumber === 1);
        const dTask2 = writeQuestions.find(q => q.taskNumber === 2);
        return (
          <>
            {dTask1 && writeAnswers[dTask1.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="delf-dalf"
                mockId={mock.id}
                taskNumber={1}
                taskLabel="Production écrite"
                essay={writeAnswers[dTask1.id]}
                maxScore={25}
                fallbackNotice="Tu Production écrite ha sido registrada para revisión."
              />
            )}
            {dTask2 && writeAnswers[dTask2.id]?.trim() && (
              <WritingAssessmentPanel
                examSlug="delf-dalf"
                mockId={mock.id}
                taskNumber={2}
                taskLabel="Production écrite — Tâche 2"
                essay={writeAnswers[dTask2.id]}
                maxScore={25}
                fallbackNotice="Tu segunda tarea ha sido registrada para revisión."
              />
            )}
          </>
        );
      })()}

      {/* CELPE-Bras tiene 4 tareas reales — se ubican por section.part (1-4),
          NO por taskNumber (ese campo se repite 1,2,1,2 en este mock, ver
          exam-bridge/celpe-bras.ts). */}
      {mock.examSlug === 'celpe-bras' && isFreeCelpeBrasMock(mock.id) && (
        <>
          {([1, 2, 3, 4] as const).map((partNumber) => {
            const q = writeQuestions.find(wq => wq.part === partNumber);
            if (!q || !writeAnswers[q.id]?.trim()) return null;
            return (
              <WritingAssessmentPanel
                key={q.id}
                examSlug="celpe-bras"
                mockId={mock.id}
                taskNumber={partNumber}
                taskLabel={`Tarefa ${partNumber}`}
                essay={writeAnswers[q.id]}
                maxScore={5}
                fallbackNotice={`Tu Tarefa ${partNumber} ha sido registrada para revisión.`}
              />
            );
          })}
        </>
      )}

      {speakingNotes.length > 0 && (
        <div className="prac-results__responses">
          <h3 className="prac-results__responses-title">
            🎙️ Tus notas de Speaking
          </h3>
          <p className="prac-results__responses-copy">
            Estas notas acompañan tu práctica oral para que el profesor pueda revisar ideas, estructura y vocabulario.
          </p>
          {speakingNotes.map(q => (
            <div key={q.id} className="prac-results__response-card">
              <p className="prac-results__response-label">
                Speaking Part {q.partNumber}
              </p>
              <div className="prac-results__response-text">
                {speakingAnswers[q.id]}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="prac-results__note">
        <p>
          {hasReviewResponses
            ? '📬 Tus respuestas escritas y notas de Speaking han sido enviadas para revisión. Pronto recibirás feedback.'
            : '📬 No agregaste respuestas escritas ni notas de Speaking para revisión. Puedes intentarlo de nuevo cuando quieras practicar el envío.'}
        </p>
      </div>

      <div className="prac-results__actions">
        <button onClick={onRetry} className="btn btn-ghost">Intentar de nuevo</button>
        <Link href={`/examenes/${exam.slug}`} className="btn">Volver al examen</Link>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

type Phase = 'intro' | 'exam' | 'results';

export default function LanguagePracticeClient({ exam, mock }: { exam: Exam; mock: MockExam }) {
  const skills = orderedSkills(mock);
  const [phase, setPhase] = useState<Phase>('intro');
  const [activeSkill, setActiveSkill] = useState(skills[0] ?? 'reading');
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [writeAnswers, setWriteAnswers] = useState<Record<string, string>>({});
  const [speakingAnswers, setSpeakingAnswers] = useState<Record<string, string>>({});
  const [formAnswers, setFormAnswers] = useState<Record<string, Record<number, string>>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<string, string[]>>({});
  const [matchAnswers, setMatchAnswers] = useState<Record<string, Record<number, string>>>({});

  const handleMCQ = useCallback((id: string, i: number) => {
    setMcqAnswers(prev => ({ ...prev, [id]: i }));
  }, []);

  const handleWrite = useCallback((id: string, v: string) => {
    setWriteAnswers(prev => ({ ...prev, [id]: v }));
  }, []);

  const handleSpeak = useCallback((id: string, v: string) => {
    setSpeakingAnswers(prev => ({ ...prev, [id]: v }));
  }, []);

  const handleForm = useCallback((id: string, num: number, v: string) => {
    setFormAnswers(prev => ({ ...prev, [id]: { ...(prev[id] ?? {}), [num]: v } }));
  }, []);

  const handleMulti = useCallback((id: string, letter: string) => {
    setMultiAnswers(prev => {
      const cur = prev[id] ?? [];
      return { ...prev, [id]: cur.includes(letter) ? cur.filter(l => l !== letter) : [...cur, letter] };
    });
  }, []);

  const handleMatch = useCallback((id: string, num: number, v: string) => {
    setMatchAnswers(prev => ({ ...prev, [id]: { ...(prev[id] ?? {}), [num]: v } }));
  }, []);

  const handleRetry = useCallback(() => {
    setMcqAnswers({});
    setWriteAnswers({});
    setSpeakingAnswers({});
    setFormAnswers({});
    setMultiAnswers({});
    setMatchAnswers({});
    setActiveSkill(skills[0] ?? 'reading');
    setPhase('intro');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const progressMap = Object.fromEntries(skills.map(sk => {
    let done = 0, total = 0;
    for (const sec of getSkillSections(mock, sk)) {
      for (const q of sec.questions) {
        if (q.type === 'mcq' || q.type === 'dialog') { total++; if (mcqAnswers[q.id] !== undefined) done++; }
        else if (q.type === 'formgroup') { for (const b of q.blanks) { total++; if ((formAnswers[q.id]?.[b.num] ?? '').trim()) done++; } }
        else if (q.type === 'multiselect') { total++; if ((multiAnswers[q.id] ?? []).length > 0) done++; }
        else if (q.type === 'matching') { for (const it of q.items) { total++; if (matchAnswers[q.id]?.[it.num]) done++; } }
        else if (q.type === 'write') { total++; if ((writeAnswers[q.id] ?? '').trim()) done++; }
        else if (q.type === 'speak') { total++; if ((speakingAnswers[q.id] ?? '').trim()) done++; }
      }
    }
    return [sk, { done, total }];
  }));
  const totalAnswered = Object.values(progressMap).reduce((a, p) => a + p.done, 0);
  const totalQs = Object.values(progressMap).reduce((a, p) => a + p.total, 0);

  // Save to Supabase when entering results phase
  useEffect(() => {
    if (phase !== 'results') return;

    const objectiveSections = getObjectiveScores(mock, mcqAnswers, formAnswers, multiAnswers, matchAnswers);

    const totalCorrect = objectiveSections.reduce((a, s) => a + s.correct, 0);
    const totalQ = objectiveSections.reduce((a, s) => a + s.total, 0);
    const score = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

    // Collect write answers keyed by task label
    const writeQuestions = mock.sections.flatMap(sec =>
      sec.questions.filter(q => q.type === 'write') as WriteQuestion[]
    );
    const task1 = writeQuestions.find(q => q.taskNumber === 1);
    const task2 =
      writeQuestions.find(q => q.taskNumber === 2 && writeAnswers[q.id]?.trim()) ??
      writeQuestions.find(q => q.taskNumber === 2);
    const savedSpeakingAnswers = Object.fromEntries(
      Object.entries(speakingAnswers).filter(([, value]) => value.trim())
    );

    saveExamResult(
      {
        examSlug: exam.slug,
        examName: exam.name,
        mockTitle: mock.title,
        totalScore: score,
        totalMax: 100,
        totalLabel: `${totalCorrect}/${totalQ} preguntas objetivas correctas`,
        skills: objectiveSections.map(s => ({
          name: s.title,
          skill: s.skill ?? '',
          score: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
          max: 100,
          label: `${s.correct}/${s.total}`,
        })),
      },
      {
        writing_task1_answer: task1 ? (writeAnswers[task1.id] ?? undefined) : undefined,
        writing_task2_answer: task2 ? (writeAnswers[task2.id] ?? undefined) : undefined,
        speaking_answers: Object.keys(savedSpeakingAnswers).length > 0 ? savedSpeakingAnswers : undefined,
      }
    ).catch(() => {/* silent — don't block UI */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'results') {
    return (
      <div className="prac-shell">
        <ResultsView
          mock={mock}
          exam={exam}
          mcqAnswers={mcqAnswers}
          writeAnswers={writeAnswers}
          speakingAnswers={speakingAnswers}
          formAnswers={formAnswers}
          multiAnswers={multiAnswers}
          matchAnswers={matchAnswers}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  if (phase === 'intro') {
    return (
      <div className="prac-shell prac-shell--intro">
        <div className="prac-intro" style={{ '--exam-color': exam.color } as React.CSSProperties}>
          <p className="prac-intro__eyebrow">{exam.flag} {exam.name}</p>
          <h1 className="prac-intro__title">{mock.title}</h1>
          <p className="prac-intro__sub">{mock.subtitle}</p>
          <div className="prac-intro__stats">
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{mock.sections.length}</span>
              <span className="prac-intro__stat-lbl">Partes</span>
            </div>
            <div className="prac-intro__stat">
              <span className="prac-intro__stat-val">{mock.timeMinutes}</span>
              <span className="prac-intro__stat-lbl">Minutos</span>
            </div>
          </div>
          <div className="prac-intro__sections">
            {mock.sections.map((s, i) => (
              <div key={`${s.part}-${i}`} className="prac-intro__section-item">
                <span className="prac-intro__section-num">{String(i + 1).padStart(2, '0')}</span>
                <span className="prac-intro__section-sep">·</span>
                <span>{s.title}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { setActiveSkill(skills[0] ?? 'reading'); setPhase('exam'); }} className="btn btn-lg" style={{ background: exam.color, color: '#fff', border: 'none' }}>
            Comenzar práctica
          </button>
          <Link href={`/examenes/${exam.slug}`} className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }}>
            ← Volver
          </Link>
        </div>
      </div>
    );
  }

  const activeSections = getSkillSections(mock, activeSkill);
  const unanswered = totalQs - totalAnswered;

  return (
    <div className="prac-shell prac-shell--exam" style={{ '--exam-color': exam.color } as React.CSSProperties}>
      <header className="prac-topbar" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <div className="prac-topbar__left">
          <Link href={`/examenes/${exam.slug}`} className="prac-topbar__back">{exam.name}</Link>
          <span className="prac-topbar__title">{mock.title}</span>
        </div>
        <div className="prac-topbar__right">
          <span className="ielts-topbar__progress">{totalAnswered}/{totalQs}</span>
          <Timer totalSecs={mock.timeMinutes * 60} onExpire={() => setPhase('results')} />
        </div>
      </header>

      <SkillTabs skills={skills} active={activeSkill} onSelect={setActiveSkill} progress={progressMap} labels={SKILL_LABEL} />

      <div className="ielts-exam-body">
        {activeSections.map((sec, i) => (
          <SectionView
            key={`${sec.part}-${i}`}
            section={sec}
            mcqAnswers={mcqAnswers}
            writeAnswers={writeAnswers}
            speakingAnswers={speakingAnswers}
            formAnswers={formAnswers}
            multiAnswers={multiAnswers}
            matchAnswers={matchAnswers}
            onMCQ={handleMCQ}
            onWrite={handleWrite}
            onSpeak={handleSpeak}
            onForm={handleForm}
            onMulti={handleMulti}
            onMatch={handleMatch}
            showResults={false}
          />
        ))}

        <div className="ielts-exam-footer">
          <div className="ielts-skill-nav__row">
            {skills.map((sk, i) => {
              if (sk !== activeSkill) return null;
              const prev = skills[i - 1], next = skills[i + 1];
              return (
                <span key={sk} style={{ display: 'flex', gap: '0.75rem' }}>
                  {prev && <button onClick={() => setActiveSkill(prev)} className="btn btn-ghost btn-sm">← {SKILL_LABEL[prev]}</button>}
                  {next
                    ? <button onClick={() => setActiveSkill(next)} className="btn btn-sm">{SKILL_LABEL[next]} →</button>
                    : <button onClick={() => {
                        if (unanswered > 0 && !confirm(`${unanswered} pregunta(s) sin responder. ¿Finalizar de todas formas?`)) return;
                        setPhase('results');
                      }} className="btn">Finalizar práctica</button>
                  }
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
