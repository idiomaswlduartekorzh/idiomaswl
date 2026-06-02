'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { saveExamResult } from '@/lib/actions/saveExamResult';
import type { Exam } from '@/data/exams';
import type {
  MockExam,
  MockSection,
  Question,
  MCQQuestion,
  WriteQuestion,
  SpeakQuestion,
  FormGroupQuestion,
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

function SpeakRenderer({ q }: { q: SpeakQuestion }) {
  return (
    <div className="lang-q lang-q--speak">
      <div className="lang-speak__badge">🎙️ Parte {q.partNumber}</div>
      <p className="lang-q__text">{q.text}</p>
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

// ── Section view ──────────────────────────────────────────────────────────────

function SectionView({
  section,
  mcqAnswers,
  writeAnswers,
  formAnswers,
  multiAnswers,
  matchAnswers,
  onMCQ,
  onWrite,
  onForm,
  onMulti,
  onMatch,
  showResults,
}: {
  section: MockSection;
  mcqAnswers: Record<string, number>;
  writeAnswers: Record<string, string>;
  formAnswers: Record<string, Record<number, string>>;
  multiAnswers: Record<string, string[]>;
  matchAnswers: Record<string, Record<number, string>>;
  onMCQ: (id: string, i: number) => void;
  onWrite: (id: string, v: string) => void;
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

      {section.transcript && !section.audioUrl && (
        <div className="lang-section__passage">
          <p className="lang-section__passage-label">Transcripción (audio)</p>
          <div className="lang-section__passage-text">{section.transcript}</div>
        </div>
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
            return <SpeakRenderer key={q.id} q={q as SpeakQuestion} />;
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

function ResultsView({ mock, exam, mcqAnswers, writeAnswers, onRetry }: {
  mock: MockExam;
  exam: Exam;
  mcqAnswers: Record<string, number>;
  writeAnswers: Record<string, string>;
  onRetry: () => void;
}) {
  const mcqSections = mock.sections.map(sec => {
    const qs = sec.questions.filter(q => q.type === 'mcq' || q.type === 'dialog') as MCQQuestion[];
    const correct = qs.filter(q => mcqAnswers[q.id] === q.answer).length;
    return { part: sec.part, title: sec.title, skill: sec.skill, total: qs.length, correct };
  }).filter(s => s.total > 0);

  const totalCorrect = mcqSections.reduce((a, s) => a + s.correct, 0);
  const totalQ = mcqSections.reduce((a, s) => a + s.total, 0);
  const score = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

  // Collect all write questions across all sections
  const writeQuestions = mock.sections.flatMap(sec =>
    sec.questions.filter(q => q.type === 'write') as WriteQuestion[]
  );
  const writtenResponses = writeQuestions.filter(q => writeAnswers[q.id]?.trim());

  return (
    <div className="prac-results">
      <div className="prac-results__hero" style={{ '--exam-color': exam.color } as React.CSSProperties}>
        <p className="prac-results__label">Resultado — preguntas objetivas</p>
        <div className="prac-results__score">{score}</div>
        <p className="prac-results__score-sub">sobre 100</p>
        <p className="prac-results__fraction">{totalCorrect} / {totalQ} correctas</p>
      </div>

      {mcqSections.length > 0 && (
        <div className="prac-results__sections">
          {mcqSections.map(s => {
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
        <div style={{ margin: '1.5rem 0' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem' }}>
            ✍️ Tus respuestas escritas
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            Estas respuestas han sido enviadas a tu profesor para corrección. Recibirás feedback personalizado.
          </p>
          {writtenResponses.map(q => (
            <div key={q.id} style={{ marginBottom: '1.25rem', background: '#f8f9fa', borderRadius: 10, padding: '1rem', border: '1px solid #e5e7eb' }}>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.8rem', fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {q.stimulusLabel ?? `Tarea ${q.taskNumber ?? ''}`}
              </p>
              <div style={{ fontSize: '0.9rem', color: '#222', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                {writeAnswers[q.id]}
              </div>
              <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: '#888' }}>
                {writeAnswers[q.id].trim().split(/\s+/).length} palabras
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="prac-results__note" style={{ padding: '1rem', background: '#fff7ed', borderRadius: 8, margin: '1rem 0', border: '1px solid #fed7aa' }}>
        <p style={{ margin: 0, color: '#9a3412', fontSize: '0.88rem', fontWeight: 600 }}>
          📬 Tus respuestas escritas y de expresión oral han sido enviadas a tu profesor para revisión. Pronto recibirás feedback.
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
  const [phase, setPhase] = useState<Phase>('intro');
  const [sectionIdx, setSectionIdx] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<string, number>>({});
  const [writeAnswers, setWriteAnswers] = useState<Record<string, string>>({});
  const [formAnswers, setFormAnswers] = useState<Record<string, Record<number, string>>>({});
  const [multiAnswers, setMultiAnswers] = useState<Record<string, string[]>>({});
  const [matchAnswers, setMatchAnswers] = useState<Record<string, Record<number, string>>>({});

  const currentSection = mock.sections[sectionIdx];
  const isLast = sectionIdx === mock.sections.length - 1;

  const handleMCQ = useCallback((id: string, i: number) => {
    setMcqAnswers(prev => ({ ...prev, [id]: i }));
  }, []);

  const handleWrite = useCallback((id: string, v: string) => {
    setWriteAnswers(prev => ({ ...prev, [id]: v }));
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
    setFormAnswers({});
    setMultiAnswers({});
    setMatchAnswers({});
    setSectionIdx(0);
    setPhase('intro');
  }, []);

  // Save to Supabase when entering results phase
  useEffect(() => {
    if (phase !== 'results') return;

    const mcqSections = mock.sections.map(sec => {
      const qs = sec.questions.filter(q => q.type === 'mcq' || q.type === 'dialog') as MCQQuestion[];
      const correct = qs.filter(q => mcqAnswers[q.id] === q.answer).length;
      return { title: sec.title, skill: sec.skill ?? '', correct, total: qs.length };
    }).filter(s => s.total > 0);

    const totalCorrect = mcqSections.reduce((a, s) => a + s.correct, 0);
    const totalQ = mcqSections.reduce((a, s) => a + s.total, 0);
    const score = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;

    // Collect write answers keyed by task label
    const writeQuestions = mock.sections.flatMap(sec =>
      sec.questions.filter(q => q.type === 'write') as WriteQuestion[]
    );
    const task1 = writeQuestions.find(q => q.taskNumber === 1);
    const task2 = writeQuestions.find(q => q.taskNumber === 2);

    saveExamResult(
      {
        examSlug: exam.slug,
        examName: exam.name,
        mockTitle: mock.title,
        totalScore: score,
        totalMax: 100,
        totalLabel: `${totalCorrect}/${totalQ} preguntas objetivas correctas`,
        skills: mcqSections.map(s => ({
          name: s.title,
          skill: s.skill,
          score: s.total > 0 ? Math.round((s.correct / s.total) * 100) : 0,
          max: 100,
          label: `${s.correct}/${s.total}`,
        })),
      },
      {
        writing_task1_answer: task1 ? (writeAnswers[task1.id] ?? undefined) : undefined,
        writing_task2_answer: task2 ? (writeAnswers[task2.id] ?? undefined) : undefined,
      }
    ).catch(() => {/* silent — don't block UI */});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === 'results') {
    return (
      <div className="prac-shell">
        <ResultsView mock={mock} exam={exam} mcqAnswers={mcqAnswers} writeAnswers={writeAnswers} onRetry={handleRetry} />
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
          <button onClick={() => setPhase('exam')} className="btn btn-lg" style={{ background: exam.color, color: '#fff', border: 'none' }}>
            Comenzar práctica
          </button>
          <Link href={`/examenes/${exam.slug}`} className="btn btn-ghost btn-sm" style={{ marginTop: '0.5rem' }}>
            ← Volver
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="prac-shell">
      {/* Section tabs */}
      <div className="lang-section-tabs">
        {mock.sections.map((s, i) => {
          // Build a compact unique label: abbreviate skill group + part number
          const base = s.title.split('–')[0].trim();
          const partMatch = s.title.match(/Part\s+(\d+)/i);
          const partSuffix = partMatch ? ` P${partMatch[1]}` : '';
          const shortBase = base
            .replace('Reading & Use of English', 'R&UoE')
            .replace('Compréhension de l\'oral', 'CO')
            .replace('Compréhension des écrits', 'CE')
            .replace('Production écrite', 'PE')
            .replace('Production orale', 'PO')
            .replace('Listening', 'Listening')
            .replace('Writing', 'Writing')
            .replace('Speaking', 'Speaking');
          const label = shortBase + (partSuffix && !shortBase.includes('P') ? partSuffix : '');
          return (
            <button
              key={`tab-${i}`}
              onClick={() => setSectionIdx(i)}
              className={`lang-section-tab${i === sectionIdx ? ' lang-section-tab--active' : ''}`}
              style={i === sectionIdx ? { borderColor: exam.color, color: exam.color } : {}}
            >
              <span className="lang-section-tab__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="lang-section-tab__label">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Current section */}
      <SectionView
        section={currentSection}
        mcqAnswers={mcqAnswers}
        writeAnswers={writeAnswers}
        formAnswers={formAnswers}
        multiAnswers={multiAnswers}
        matchAnswers={matchAnswers}
        onMCQ={handleMCQ}
        onWrite={handleWrite}
        onForm={handleForm}
        onMulti={handleMulti}
        onMatch={handleMatch}
        showResults={false}
      />

      {/* Navigation */}
      <div className="lang-nav-bar">
        <button
          onClick={() => setSectionIdx(i => Math.max(0, i - 1))}
          disabled={sectionIdx === 0}
          className="btn btn-ghost btn-sm"
        >
          ← Anterior
        </button>
        {isLast ? (
          <button onClick={() => setPhase('results')} className="btn btn-sm" style={{ background: exam.color, color: '#fff', border: 'none' }}>
            Finalizar práctica
          </button>
        ) : (
          <button onClick={() => setSectionIdx(i => i + 1)} className="btn btn-sm">
            Siguiente parte →
          </button>
        )}
      </div>
    </div>
  );
}
