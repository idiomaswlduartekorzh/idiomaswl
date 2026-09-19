'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileDown,
  Headphones,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';

import { AudioPlayer } from '@/components/exam-runner/primitives';
import PdfDownloadButton from '@/components/practica/PdfDownloadButton';
import { ieltsQuestionNumber } from '@/data/ielts/question-number';
import type {
  IeltsListeningSectionPractice,
  PublicIeltsFormGroupQuestion,
  PublicIeltsListeningQuestion,
  PublicIeltsListeningSection,
  PublicIeltsMatchingQuestion,
  PublicIeltsMcqQuestion,
  PublicIeltsMultiSelectQuestion,
  PublicIeltsTableGroupQuestion,
} from '@/data/ielts/sectional-listening-adapter';
import type { IeltsListeningPracticeAnswers, IeltsListeningPracticeResult } from '@/lib/ielts/listening-practice-contract';

import styles from './runner.module.css';

type Phase = 'intro' | 'practice' | 'scoring' | 'results';
const blankKey = (groupId: string, num: number) => `${groupId}__${num}`;
const emptyAnswers = (): IeltsListeningPracticeAnswers => ({ fills: {}, mcq: {}, ms: {}, match: {} });

function responseNumbers(question: PublicIeltsListeningQuestion): number[] {
  if (question.type === 'formgroup') return question.blanks.map(blank => blank.num);
  if (question.type === 'tablegroup') return question.rows.flatMap(row => row.flatMap(cell => typeof cell === 'string' ? [] : [cell.num]));
  if (question.type === 'multiselect' || question.type === 'matching') {
    return Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange[0] + index);
  }
  return [ieltsQuestionNumber(question.id)];
}

function answeredNumbers(section: PublicIeltsListeningSection, answers: IeltsListeningPracticeAnswers): Set<number> {
  const answered = new Set<number>();
  for (const question of section.questions) {
    if (question.type === 'formgroup') {
      for (const blank of question.blanks) if ((answers.fills[blankKey(question.id, blank.num)] ?? '').trim()) answered.add(blank.num);
    } else if (question.type === 'tablegroup') {
      for (const cell of question.rows.flat()) if (typeof cell !== 'string' && (answers.fills[blankKey(question.id, cell.num)] ?? '').trim()) answered.add(cell.num);
    } else if (question.type === 'multiselect') {
      const selected = answers.ms[question.id] ?? [];
      responseNumbers(question).slice(0, selected.length).forEach(number => answered.add(number));
    } else if (question.type === 'matching') {
      for (const item of question.items) if (answers.match[blankKey(question.id, item.num)]) answered.add(item.num);
    } else if (answers.mcq[question.id] !== undefined) {
      answered.add(ieltsQuestionNumber(question.id));
    }
  }
  return answered;
}

function sectionResponseNumbers(section: PublicIeltsListeningSection): number[] {
  return section.questions.flatMap(responseNumbers).sort((a, b) => a - b);
}

function FormGroup({ question, answers, onFill }: {
  question: PublicIeltsFormGroupQuestion;
  answers: IeltsListeningPracticeAnswers;
  onFill: (key: string, value: string) => void;
}) {
  const blanks = new Map(question.blanks.map(blank => [blank.num, blank]));
  return (
    <article className="ielts-form">
      <div className="ielts-group__label">
        <span className="ielts-group__range">Questions {question.qRange[0]}–{question.qRange[1]}</span>
        {question.groupLabel.split('\n').map((line, index) => <p key={index}>{line}</p>)}
      </div>
      {question.imageUrl ? <div className="ielts-form__diagram"><Image src={question.imageUrl} alt={question.imageAlt ?? 'Listening diagram'} width={700} height={400} style={{ width: '100%', height: 'auto' }} /></div> : null}
      {question.title ? <p className="ielts-form__title">{question.title}</p> : null}
      {question.example ? <p className="ielts-form__example"><em>Example</em><br />{question.example}</p> : null}
      <div className="ielts-form__body">
        {question.template.split(/(\{\{\d+\}\})/).map((part, index) => {
          const marker = part.match(/^\{\{(\d+)\}\}$/);
          if (marker) {
            const number = Number(marker[1]);
            const blank = blanks.get(number);
            const key = blankKey(question.id, number);
            return (
              <span key={index} className="ielts-form__blank-wrap">
                <span className="ielts-form__blank-num">{number}</span>
                <input type="text" aria-label={`Question ${number}`} autoComplete="off" className="ielts-form__input" value={answers.fills[key] ?? ''} onChange={event => onFill(key, event.target.value)} placeholder="Answer…" style={{ width: `${Math.max(7, (blank?.maxWords ?? 1) * 4)}ch` }} />
              </span>
            );
          }
          return <span key={index}>{part.split('\n').map((line, lineIndex, lines) => <span key={lineIndex}>{line.startsWith('•') ? <span className="ielts-form__bullet">{line}</span> : line}{lineIndex < lines.length - 1 ? <br /> : null}</span>)}</span>;
        })}
      </div>
    </article>
  );
}

function TableGroup({ question, answers, onFill }: {
  question: PublicIeltsTableGroupQuestion;
  answers: IeltsListeningPracticeAnswers;
  onFill: (key: string, value: string) => void;
}) {
  return (
    <article className="ielts-tableq">
      <div className="ielts-group__label"><span className="ielts-group__range">Questions {question.qRange[0]}–{question.qRange[1]}</span>{question.groupLabel.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
      <div className="ielts-tableq__scroll"><table className="ielts-tableq__table"><thead><tr>{question.headers.map(header => <th key={header}>{header}</th>)}</tr></thead><tbody>
        {question.rows.map((row, rowIndex) => <tr key={rowIndex}>{row.map((cell, cellIndex) => {
          if (typeof cell === 'string') return <td key={cellIndex}>{cell}</td>;
          const key = blankKey(question.id, cell.num);
          return <td key={cellIndex} className="ielts-tableq__cell--blank"><span className="ielts-form__blank-num">{cell.num}</span><input type="text" aria-label={`Question ${cell.num}`} autoComplete="off" className="ielts-form__input" value={answers.fills[key] ?? ''} onChange={event => onFill(key, event.target.value)} placeholder="Answer…" /></td>;
        })}</tr>)}
      </tbody></table></div>
    </article>
  );
}

function MultiSelect({ question, answers, onToggle }: {
  question: PublicIeltsMultiSelectQuestion;
  answers: IeltsListeningPracticeAnswers;
  onToggle: (letter: string) => void;
}) {
  const selected = answers.ms[question.id] ?? [];
  return (
    <article className="ielts-multiselect">
      <div className="ielts-group__label"><span className="ielts-group__range">Questions {question.qRange[0]}–{question.qRange[1]}</span><p>{question.text}</p><p className="ielts-multiselect__hint">Choose {question.selectCount === 2 ? 'TWO' : question.selectCount} letters.</p></div>
      <div className="ielts-multiselect__opts">{question.options.map(option => {
        const checked = selected.includes(option.letter);
        const disabled = !checked && selected.length >= question.selectCount;
        return <label key={option.letter} className={`ielts-multiselect__opt${checked ? ' ielts-multiselect__opt--checked' : ''}${disabled ? ' ielts-multiselect__opt--disabled' : ''}`}><input type="checkbox" checked={checked} disabled={disabled} onChange={() => onToggle(option.letter)} /><span className="ielts-multiselect__letter">{option.letter}</span><span className="ielts-multiselect__text">{option.text}</span></label>;
      })}</div><p className="ielts-multiselect__count">Selected: {selected.length}/{question.selectCount}</p>
    </article>
  );
}

function Matching({ question, answers, onMatch }: {
  question: PublicIeltsMatchingQuestion;
  answers: IeltsListeningPracticeAnswers;
  onMatch: (key: string, value: string) => void;
}) {
  return (
    <article className="ielts-matching">
      <div className="ielts-group__label"><span className="ielts-group__range">Questions {question.qRange[0]}–{question.qRange[1]}</span>{question.groupLabel?.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
      <div className="ielts-matching__endings">{question.endings.map(ending => <div key={ending.letter} className="ielts-matching__ending"><span className="ielts-matching__letter">{ending.letter}</span><span>{ending.text}</span></div>)}</div>
      <div className="ielts-matching__items">{question.items.map(item => {
        const key = blankKey(question.id, item.num);
        return <div key={item.num} className="ielts-matching__row"><span className="ielts-form__blank-num">{item.num}</span><p className="ielts-matching__stem">{item.stem}</p><select className="ielts-matching__select" aria-label={`Question ${item.num}: choose a matching letter`} value={answers.match[key] ?? ''} onChange={event => onMatch(key, event.target.value)}><option value="">Choose…</option>{question.endings.map(ending => <option key={ending.letter} value={ending.letter}>{ending.letter}</option>)}</select></div>;
      })}</div>
    </article>
  );
}

function Mcq({ question, answers, onMcq }: {
  question: PublicIeltsMcqQuestion;
  answers: IeltsListeningPracticeAnswers;
  onMcq: (index: number) => void;
}) {
  const number = ieltsQuestionNumber(question.id);
  return (
    <article className="ielts-mcq"><div className="ielts-mcq__num">{number}.</div><div className="ielts-mcq__body"><p className="ielts-mcq__text">{question.text}</p><div className="prac-options">{question.options.map((option, index) => <button type="button" key={index} onClick={() => onMcq(index)} className={`prac-option${answers.mcq[question.id] === index ? ' prac-option--selected' : ''}`}><span className="prac-option__letter">{String.fromCharCode(65 + index)}</span><span className="prac-option__text">{option}</span></button>)}</div></div></article>
  );
}

function QuestionView({ question, answers, setAnswers }: {
  question: PublicIeltsListeningQuestion;
  answers: IeltsListeningPracticeAnswers;
  setAnswers: React.Dispatch<React.SetStateAction<IeltsListeningPracticeAnswers>>;
}) {
  const onFill = (key: string, value: string) => setAnswers(previous => ({ ...previous, fills: { ...previous.fills, [key]: value } }));
  if (question.type === 'formgroup') return <FormGroup question={question} answers={answers} onFill={onFill} />;
  if (question.type === 'tablegroup') return <TableGroup question={question} answers={answers} onFill={onFill} />;
  if (question.type === 'multiselect') return <MultiSelect question={question} answers={answers} onToggle={letter => setAnswers(previous => { const current = previous.ms[question.id] ?? []; const next = current.includes(letter) ? current.filter(item => item !== letter) : [...current, letter]; return { ...previous, ms: { ...previous.ms, [question.id]: next } }; })} />;
  if (question.type === 'matching') return <Matching question={question} answers={answers} onMatch={(key, value) => setAnswers(previous => ({ ...previous, match: { ...previous.match, [key]: value } }))} />;
  return <Mcq question={question} answers={answers} onMcq={index => setAnswers(previous => ({ ...previous, mcq: { ...previous.mcq, [question.id]: index } }))} />;
}

export default function IELTSListeningSectionRunner({ practice }: { practice: IeltsListeningSectionPractice }) {
  const storageKey = `wl:ielts:sectional:listening:${practice.sourceMockId}:${practice.contentVersion}`;
  const [phase, setPhase] = useState<Phase>('intro');
  const [partIndex, setPartIndex] = useState(0);
  const [answers, setAnswers] = useState<IeltsListeningPracticeAnswers>(emptyAnswers);
  const [result, setResult] = useState<IeltsListeningPracticeResult | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [scoringError, setScoringError] = useState(false);
  const setLabel = practice.sourceMockId.replace('set-', 'Set ');
  const activeSection = practice.sections[partIndex];
  const answeredByPart = useMemo(() => practice.sections.map(section => answeredNumbers(section, answers)), [answers, practice.sections]);
  const partNumbers = useMemo(() => practice.sections.map(sectionResponseNumbers), [practice.sections]);
  const answeredTotal = new Set(answeredByPart.flatMap(numbers => [...numbers])).size;

  useEffect(() => {
    let cancelled = false;
    queueMicrotask(() => {
      if (cancelled) return;
      try {
        const raw = window.localStorage.getItem(storageKey);
        if (raw) {
          const saved = JSON.parse(raw) as { version?: number; partIndex?: number; answers?: IeltsListeningPracticeAnswers };
          if (saved.version === 1 && saved.answers) {
            setPartIndex(Math.min(Math.max(saved.partIndex ?? 0, 0), 3));
            setAnswers(saved.answers);
            setPhase('practice');
          }
        }
      } catch {}
      setHydrated(true);
    });
    return () => { cancelled = true; };
  }, [storageKey]);

  useEffect(() => {
    if (!hydrated || phase !== 'practice') return;
    try { window.localStorage.setItem(storageKey, JSON.stringify({ version: 1, partIndex, answers })); } catch {}
  }, [answers, hydrated, partIndex, phase, storageKey]);

  useEffect(() => {
    if (phase === 'practice' || phase === 'results') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [phase]);

  const downloadPdf = useCallback(async () => {
    const { generateIeltsListeningWorksheetPdf } = await import('@/lib/pdf/generateIeltsListeningWorksheetPdf');
    await generateIeltsListeningWorksheetPdf(practice);
  }, [practice]);

  const submit = useCallback(async () => {
    setPhase('scoring');
    setScoringError(false);
    try {
      const response = await fetch('/api/practica/ielts/listening/score', {
        method: 'POST', headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ mockId: practice.sourceMockId, objectId: practice.objectId, contentVersion: practice.contentVersion, answers }),
      });
      if (!response.ok) throw new Error('score unavailable');
      setResult(await response.json() as IeltsListeningPracticeResult);
      try { window.localStorage.removeItem(storageKey); } catch {}
      setPhase('results');
    } catch {
      setScoringError(true);
      setPhase('practice');
    }
  }, [answers, practice, storageKey]);

  const reset = () => {
    try { window.localStorage.removeItem(storageKey); } catch {}
    setAnswers(emptyAnswers()); setPartIndex(0); setResult(null); setScoringError(false); setPhase('intro');
  };

  if (phase === 'intro') return (
    <div className={styles.shell}><section className={styles.intro}>
      <p className={styles.kicker}>IELTS Listening practice · {setLabel}</p>
      <h1>Use the real set at your own pace.</h1>
      <p className={styles.lead}>Listen as many times as you need, pause, rewind, move freely between all four parts and answer without a timer. The 40 questions are the same audited questions used in the complete mock.</p>
      <div className={styles.introGrid}><article><Headphones aria-hidden="true" /><strong>Full playback control</strong><span>Pause, replay, jump back 10 seconds or drag the timeline.</span></article><article><FileDown aria-hidden="true" /><strong>Printable student copy</strong><span>Download all four parts and a blank answer sheet as a WeLearn PDF.</span></article><article><ShieldCheck aria-hidden="true" /><strong>Audited source set</strong><span>Audio, numbering and answer keys stay connected to {setLabel}.</span></article><article><CheckCircle2 aria-hidden="true" /><strong>Private scoring</strong><span>Your key stays on the server; the browser receives only your result.</span></article></div>
      <p className={styles.disclosure}>Practice mode is untimed and replayable. The estimated band is for study guidance and is not an official IELTS result.</p>
      <div className={styles.actions}><button type="button" disabled={!hydrated} onClick={() => setPhase('practice')}>Start practice <ArrowRight aria-hidden="true" /></button><PdfDownloadButton generate={downloadPdf} label="Download student PDF" /><Link href="/practica/ielts/listening/simulacros">Back to the library</Link></div>
    </section></div>
  );

  if (phase === 'results' && result) return (
    <div className={styles.shell}><section className={styles.results}>
      <p className={styles.kicker}>IELTS Listening · {setLabel}</p><h1>Estimated band {result.band}</h1><p className={styles.score}>{result.correct}<span>/40 correct</span></p>
      <div className={styles.partResults}>{result.parts.map(part => <article key={part.part}><span>Part {part.part}</span><strong>{part.correct}/{part.total}</strong></article>)}</div>
      <p className={styles.disclosure}>{result.disclosure}</p>
      <div className={styles.actions}><button type="button" onClick={reset}><RotateCcw aria-hidden="true" /> Try again</button><PdfDownloadButton generate={downloadPdf} label="Download student PDF" /><Link href="/practica/ielts/listening/simulacros">Choose another set</Link></div>
    </section></div>
  );

  return (
    <div className={styles.shell}>
      <header className={styles.runnerHeader}><div><p>IELTS Listening practice · {setLabel}</p><strong>Part {activeSection.part} of 4</strong></div><span className={styles.progressCopy}>{answeredTotal}/40 answered</span><div className={styles.progressTrack}><span style={{ width: `${answeredTotal / 40 * 100}%` }} /></div></header>
      <div className={styles.audioDock}><AudioPlayer key={practice.audioUrl} src={practice.audioUrl} label={`${setLabel} complete Listening audio`} replayable /><p>The same recording covers Parts 1–4. You can pause, replay or rewind throughout practice.</p></div>
      <nav className={styles.partNav} aria-label="Listening parts">{practice.sections.map((section, index) => <button type="button" key={section.part} aria-current={index === partIndex ? 'step' : undefined} onClick={() => setPartIndex(index)}><span>Part {section.part}</span><small>{answeredByPart[index].size}/{partNumbers[index].length}</small></button>)}</nav>
      <section className={styles.runnerBody} aria-labelledby="active-listening-part"><div className={styles.partHeading}><p>Questions {partNumbers[partIndex][0]}–{partNumbers[partIndex].at(-1)}</p><h1 id="active-listening-part">{activeSection.title.replace(/^Listening\s*[—-]\s*/i, '')}</h1><span>{activeSection.instructions}</span></div><div className={styles.questions}>{activeSection.questions.map(question => <QuestionView key={question.id} question={question} answers={answers} setAnswers={setAnswers} />)}</div></section>
      {scoringError ? <p className={styles.error} role="alert">We could not score this attempt. Your answers are still saved; please try again.</p> : null}
      <footer className={styles.runnerFooter}><button type="button" disabled={partIndex === 0} onClick={() => setPartIndex(index => index - 1)}><ArrowLeft aria-hidden="true" /> Previous part</button><PdfDownloadButton generate={downloadPdf} label="Student PDF" compact />{partIndex < 3 ? <button type="button" onClick={() => setPartIndex(index => index + 1)}>Next part <ArrowRight aria-hidden="true" /></button> : <button type="button" disabled={phase === 'scoring'} onClick={submit}>{phase === 'scoring' ? 'Scoring…' : `Finish and score (${answeredTotal}/40)`}</button>}</footer>
    </div>
  );
}
