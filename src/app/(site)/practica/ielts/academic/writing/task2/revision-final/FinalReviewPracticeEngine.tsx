'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { REVIEW_LESSONS } from './review-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = ['Identify the layer', 'Find the missing instruction', 'Diagnose logic drift', 'Order the review', 'Choose the revision', 'Rewrite one sentence', 'Run a full checklist', 'Transfer to timed practice'];
/**
 * Reparte las opciones; la correcta se escribe siempre primera en el array.
 *
 * Era una rotación cíclica sembrada con el número de nivel, igual para los cinco tipos de
 * ensayo: la secuencia de letras correctas era idéntica en todos y bastaba memorizarla para
 * aprobar el motor sin leer. Ahora la semilla incluye el tipo y el reparto es un barajado
 * real, con las posiciones equilibradas por bloques.
 */
function rotate<T>(items: T[], seed: string, index: number) {
  return placeFirstAsCorrect(items, seed, index).options;
}
function words(value: string) { return value.trim().split(/\s+/).filter(Boolean).length; }

export default function FinalReviewPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0); const [selected, setSelected] = useState(''); const [checked, setChecked] = useState(false); const [ordered, setOrdered] = useState<string[]>([]); const [writing, setWriting] = useState(''); const [ticks, setTicks] = useState<boolean[]>([]); const [completed, setCompleted] = useState<number[]>([]);
  const lesson = REVIEW_LESSONS.find((item) => item.id === essayType) ?? REVIEW_LESSONS[0]; const example = lesson.cases[(level + 1) % lesson.cases.length];
  useEffect(() => { setTicks(lesson.layers.map(() => false)); }, [lesson]);
  useEffect(() => { const saved = window.localStorage.getItem(`welearn-task2-final-review-${essayType}`); if (saved) setCompleted(JSON.parse(saved)); }, [essayType]);
  const correctOrder = lesson.layers.map((layer) => layer.label);
  const mcq = useMemo(() => {
    if (level === 0) return { q: 'Which review layer should diagnose this issue?', c: example.issue, a: example.category, o: rotate([example.category, ...correctOrder.filter((item) => item !== example.category).slice(0, 3)], `review|${lesson.id}`, level), f: example.explanation };
    if (level === 1) return { q: `What is the decisive ${lesson.shortLabel} task check?`, c: example.prompt, a: lesson.decisiveCheck, o: rotate([lesson.decisiveCheck, 'Did I use at least five linking phrases?', 'Did I include a statistic in every body paragraph?', 'Did I write exactly four paragraphs?'], `review|${lesson.id}`, level), f: lesson.instruction };
    if (level === 2) return { q: 'Which diagnosis protects Task Response most directly?', c: example.issue, a: example.explanation, o: rotate([example.explanation, 'The draft needs a more advanced synonym.', 'The draft must include a rhetorical question.', 'The draft needs a longer opening sentence.'], `review|${lesson.id}`, level), f: 'Review the answer and logic before polishing individual words.' };
    return { q: 'Which revision fixes the identified problem without changing the essay topic?', c: example.issue, a: example.revision, o: rotate([example.revision, 'This topic is important and has many advantages and disadvantages.', 'A famous study proves that this issue affects everyone.', 'In the future, society will certainly solve the problem.'], `review|${lesson.id}`, level), f: example.explanation };
  }, [correctOrder, example, lesson, level]);
  const mode = level <= 2 || level === 4 ? 'mcq' : level === 3 ? 'order' : level === 5 ? 'write' : level === 6 ? 'checklist' : 'transfer';
  const passed = mode === 'mcq' ? selected === mcq.a : mode === 'order' ? ordered.join('|') === correctOrder.join('|') : mode === 'write' ? words(writing) >= 12 : mode === 'checklist' ? ticks.every(Boolean) : true;
  function reset() { setSelected(''); setChecked(false); setOrdered([]); setWriting(''); setTicks(lesson.layers.map(() => false)); }
  function go(index: number) { setLevel(index); reset(); }
  function check() { setChecked(true); if (passed) { const next = Array.from(new Set([...completed, level])); setCompleted(next); window.localStorage.setItem(`welearn-task2-final-review-${essayType}`, JSON.stringify(next)); } }
  return <section id="practice-engine" className={`${styles.section} ${styles.practiceSection}`}><div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2>Review the essay by level</h2><p>Move from identifying one issue to running the complete pre-submission sequence.</p></div><div className={styles.levelRail}>{LEVELS.map((title, index) => <button key={title} type="button" className={`${styles.levelButton} ${level === index ? styles.levelButtonActive : ''} ${completed.includes(index) ? styles.levelButtonDone : ''}`} onClick={() => go(index)}><span>{completed.includes(index) ? '✓' : index + 1}</span><strong>{title}</strong></button>)}</div><div className={styles.enginePanel}><div className={styles.engineHeader}><div><p>Level {level + 1} of 8</p><h3>{LEVELS[level]}</h3></div><strong>{completed.length}/8 complete</strong></div><div className={styles.exerciseBody}><span className={styles.typeTag}>{lesson.shortLabel}</span>
    {mode === 'mcq' && <><p className={styles.exercisePrompt}>{mcq.q}</p><p className={styles.exerciseInstruction}>{mcq.c}</p><div className={styles.optionGrid}>{mcq.o.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === mcq.a ? styles.correct : ''} ${checked && selected === option && option !== mcq.a ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></>}
    {mode === 'order' && <><p className={styles.exercisePrompt}>Put the review layers in the most useful order.</p><p className={styles.exerciseInstruction}>Fix the answer before polishing the language.</p><div className={styles.assemblyWorkspace}>{ordered.map((label, index) => <button key={label} type="button" onClick={() => setOrdered((current) => current.filter((_, itemIndex) => itemIndex !== index))}><span>{index + 1}</span>{label}</button>)}</div><div className={styles.blockChoices}>{rotate(correctOrder, `review-orden|${lesson.id}`, 2).filter((label) => !ordered.includes(label)).map((label) => <button key={label} type="button" onClick={() => setOrdered((current) => [...current, label])}>{label}</button>)}</div></>}
    {mode === 'write' && <><p className={styles.exercisePrompt}>Rewrite the sentence while preserving its intended answer.</p><p className={styles.exerciseInstruction}>{example.issue}</p><textarea className={styles.engineTextarea} rows={5} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} /><p className={styles.wordMeter}>{words(writing)} words · study target: 12+ purposeful words</p></>}
    {mode === 'checklist' && <><p className={styles.exercisePrompt}>Run the complete review sequence on your current draft.</p><p className={styles.exerciseInstruction}>Tick a layer only after you can point to evidence in the essay.</p><div className={styles.optionGrid}>{lesson.layers.map((layer, index) => <button key={layer.label} type="button" className={`${styles.option} ${ticks[index] ? styles.correct : ''}`} onClick={() => setTicks((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}><span>{ticks[index] ? '✓' : index + 1}</span><strong>{layer.label}:</strong> {layer.question}</button>)}</div></>}
    {mode === 'transfer' && <div className={styles.transferBridge}><span>Review-to-submission bridge</span><h4>Your review order is ready for the complete essay</h4><p>Use this sequence during Complete Essay Practice. It checks evidence; it does not generate an automated band score.</p><ul>{correctOrder.map((item) => <li key={item}>{item}</li>)}</ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
    <div className={styles.exerciseActions}><button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" onClick={check} disabled={(mode === 'mcq' && !selected) || (mode === 'order' && ordered.length !== correctOrder.length) || (mode === 'write' && words(writing) < 12) || (mode === 'checklist' && !ticks.every(Boolean))}><CheckCircle2 size={17} /> {mode === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button></div>{checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><CheckCircle2 size={20} /><div><strong>{passed ? 'Level complete.' : 'Revise this attempt.'}</strong><p>{mode === 'mcq' ? mcq.f : mode === 'order' ? `Use ${correctOrder.join(' → ')}.` : mode === 'write' ? `Compare the function of your revision with: ${example.revision}` : mode === 'checklist' ? 'The checklist is complete only when every tick is supported by visible essay evidence.' : 'Transfer ready; no automated band has been assigned.'}</p></div></div>}
  </div><div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(7, level + 1))} disabled={level === 7}>Next <ArrowRight size={16} /></button></div></div></section>;
}
