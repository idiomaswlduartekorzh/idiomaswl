'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_TWO_LESSONS, bodyTwoParagraph } from './body-two-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = [
  { title: 'Identify the second function', mode: 'mcq' },
  { title: 'Choose a distinct controlling idea', mode: 'mcq' },
  { title: 'Detect repetition or misalignment', mode: 'mcq' },
  { title: 'Assemble the Body 2 blocks', mode: 'assemble' },
  { title: 'Complete the relationship block', mode: 'mcq' },
  { title: 'Write one connecting sentence', mode: 'write' },
  { title: 'Build the complete Body 2 paragraph', mode: 'paragraph' },
  { title: 'Transfer to complete essay practice', mode: 'transfer' },
] as const;

/**
 * Reparte las opciones; la correcta se escribe siempre primera en el array.
 *
 * Era una rotación cíclica sembrada con el número de nivel, igual para los cinco tipos de
 * ensayo: la secuencia de letras correctas era idéntica en todos y bastaba memorizarla para
 * aprobar el motor sin leer. Ahora la semilla incluye el tipo y el reparto es un barajado
 * real, con las posiciones equilibradas por bloques.
 */
function rotateOptions<T>(items: T[], seed: string, index: number) {
  return placeFirstAsCorrect(items, seed, index).options;
}
/**
 * ¿Este modo evalúa algo de verdad?
 *
 * Los modos de escritura solo cuentan palabras, y además el botón que dispara la evaluación
 * está deshabilitado por debajo del mismo umbral: cuando se puede pulsar, la condición ya es
 * cierta por construcción, así que «Revise this attempt.» era código inalcanzable. Decir
 * «Level complete.» ahí afirma sobre un texto que nadie ha leído.
 */
const SE_CORRIGE = new Set(['mcq', 'assemble', 'order']);

function wordCount(value: string) { return value.trim() ? value.trim().split(/\s+/).length : 0; }

export default function BodyTwoPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [assembled, setAssembled] = useState<string[]>([]);
  const [writing, setWriting] = useState('');
  const [paragraphFields, setParagraphFields] = useState<string[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const lesson = BODY_TWO_LESSONS.find((item) => item.id === essayType) ?? BODY_TWO_LESSONS[0];
  // examples[0] es el worked example impreso más arriba; se salta. Ver BodyOnePracticeEngine.
  const exercise = lesson.examples[1 + (level % (lesson.examples.length - 1))];
  const active = LEVELS[level];

  useEffect(() => { const saved = window.localStorage.getItem(`welearn-task2-body2-${essayType}`); if (saved) setCompleted(JSON.parse(saved)); }, [essayType]);
  useEffect(() => { setParagraphFields(exercise.blocks.map(() => '')); }, [exercise]);

  const mcq = useMemo(() => {
    if (level === 0) return { question: `What is the function of the ${exercise.blocks[2].label.toLowerCase()} block?`, context: exercise.blocks[2].text, correct: exercise.blocks[2].purpose, options: rotateOptions([exercise.blocks[2].purpose, 'Repeats the Body 1 argument in slightly different vocabulary.', 'Introduces several unrelated ideas inside the same paragraph.', 'Replaces the conclusion with an entirely new argument.'], `body2|${lesson.id}`, level), feedback: `For this ${lesson.shortLabel} task, the ${exercise.blocks[2].label.toLowerCase()} performs a specific job: ${exercise.blocks[2].purpose}` };
    if (level === 1) return { question: 'Which sentence gives Body 2 one distinct and aligned job?', context: exercise.prompt, correct: exercise.blocks[0].text, options: rotateOptions([exercise.blocks[0].text, exercise.commonMistake, 'This topic is genuinely important and has many different aspects that all deserve careful attention.', 'As was already stated in Body 1, the first idea is very significant and worth emphasising again.'], `body2|${lesson.id}`, level), feedback: 'The correct sentence adds the second reason, view, response or direct answer without losing alignment.' };
    if (level === 2) return { question: 'Which diagnosis identifies the most serious Body 2 error?', context: `Body 2 job: ${exercise.paragraphJob} Draft: “The first idea is important. This shows that the first idea has many benefits. For this reason, the first idea should be considered.”`, correct: 'The draft repeats Body 1 instead of completing the second paragraph job.', options: rotateOptions(['The draft repeats Body 1 instead of completing the second paragraph job.', 'The draft needs an invented statistic and a named source to sound more convincing.', 'The draft should add a well-known proverb so that the paragraph opens more memorably.', 'The draft must remove every link back to Body 1 and stand completely on its own.'], `body2|${lesson.id}`, level), feedback: 'Progression means adding the next required idea, not merely restating earlier reasoning.' };
    return { question: `Which sentence best completes the ${exercise.blocks[2].label} block?`, context: `${exercise.blocks[0].text} ${exercise.blocks[1].text} [${exercise.blocks[2].label.toUpperCase()} MISSING] ${exercise.blocks[3].text} ${exercise.blocks[4].text}`, correct: exercise.blocks[2].text, options: rotateOptions([exercise.blocks[2].text, 'This is a very important issue in the modern world of today, affecting a great many people.', 'A famous study at a leading university proves this beyond any doubt for every case.', 'There are many advantages and many disadvantages to absolutely everything discussed here.'], `body2|${lesson.id}`, level), feedback: `The model ${exercise.blocks[2].label.toLowerCase()} performs the relationship required by this question type.` };
  }, [exercise, lesson, level]);

  const assemblyChoices = useMemo(() => rotateOptions(exercise.blocks.map((item) => item.label), `body2|${lesson.id}`, level), [exercise, lesson.examples, level]);
  const assemblyCorrect = assembled.join('|') === exercise.blocks.map((item) => item.label).join('|');
  const mcqCorrect = selected === mcq.correct;
  const paragraphWords = paragraphFields.reduce((total, value) => total + wordCount(value), 0);

  function rememberComplete() { const next = Array.from(new Set([...completed, level])); setCompleted(next); window.localStorage.setItem(`welearn-task2-body2-${essayType}`, JSON.stringify(next)); }
  function check() { setChecked(true); if ((active.mode === 'mcq' && mcqCorrect) || (active.mode === 'assemble' && assemblyCorrect) || (active.mode === 'write' && wordCount(writing) >= 12) || (active.mode === 'paragraph' && paragraphWords >= 65) || active.mode === 'transfer') rememberComplete(); }
  function resetExercise() { setSelected(''); setChecked(false); setAssembled([]); setWriting(''); setParagraphFields(exercise.blocks.map(() => '')); }
  function go(next: number) { setLevel(next); resetExercise(); }
  const passed = (active.mode === 'mcq' && mcqCorrect) || (active.mode === 'assemble' && assemblyCorrect) || (active.mode === 'write' && wordCount(writing) >= 12) || (active.mode === 'paragraph' && paragraphWords >= 65) || active.mode === 'transfer';

  return <section id="practice-engine" className={`${styles.section} ${styles.practiceSection}`}>
    <div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2>Build Body 2 by level</h2><p>Move from recognising the second paragraph job to completing a full timed response without losing progression.</p></div>
    <div className={styles.levelRail}>{LEVELS.map((item, index) => <button key={item.title} type="button" className={`${styles.levelButton} ${index === level ? styles.levelButtonActive : ''} ${completed.includes(index) ? styles.levelButtonDone : ''}`} onClick={() => go(index)}><span>{completed.includes(index) ? '✓' : index + 1}</span><strong>{item.title}</strong></button>)}</div>
    <div className={styles.enginePanel}><div className={styles.engineHeader}><div><p>Level {level + 1} of {LEVELS.length}</p><h3>{active.title}</h3></div><strong>{completed.length}/{LEVELS.length} complete</strong></div><div className={styles.exerciseBody}>
      <span className={styles.typeTag}>{lesson.shortLabel}</span>
      {active.mode === 'mcq' && <><p className={styles.exercisePrompt}>{mcq.question}</p><p className={styles.exerciseInstruction}>{mcq.context}</p><div className={styles.optionGrid}>{mcq.options.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === mcq.correct ? styles.correct : ''} ${checked && selected === option && option !== mcq.correct ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></>}
      {active.mode === 'assemble' && <><p className={styles.exercisePrompt}>Assemble the blocks in the correct sequence for this question type.</p><p className={styles.exerciseInstruction}>{exercise.paragraphJob}</p><div className={styles.assemblyWorkspace}>{assembled.map((label, index) => <button type="button" key={`${label}-${index}`} onClick={() => { setAssembled((current) => current.filter((_, itemIndex) => itemIndex !== index)); setChecked(false); }}><span>{index + 1}</span>{label}</button>)}</div><div className={styles.blockChoices}>{assemblyChoices.filter((label) => !assembled.includes(label)).map((label) => <button type="button" key={label} onClick={() => { setAssembled((current) => [...current, label]); setChecked(false); }}>{label}</button>)}</div></>}
      {active.mode === 'write' && <><p className={styles.exercisePrompt}>Write one original {exercise.blocks[2].label.toLowerCase()} sentence.</p><p className={styles.exerciseInstruction}><strong>{exercise.blocks[0].label}:</strong> {exercise.blocks[0].text}<br />{exercise.blocks[2].purpose}</p><textarea className={styles.engineTextarea} rows={6} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} placeholder={`Write one ${exercise.blocks[2].label.toLowerCase()} sentence of at least 12 words.`} /><p className={styles.wordMeter}>{wordCount(writing)} words · study target: 12+ purposeful words</p></>}
      {active.mode === 'paragraph' && <><p className={styles.exercisePrompt}>Build a complete Body 2 paragraph with the {lesson.shortLabel} architecture.</p><p className={styles.exerciseInstruction}>{exercise.prompt}<br /><strong>Body 2 job:</strong> {exercise.paragraphJob}</p><div className={styles.paragraphBuilder}>{exercise.blocks.map((block, index) => <label key={block.label}><strong>{block.label}</strong><span>{block.purpose}</span><textarea rows={3} value={paragraphFields[index] ?? ''} onChange={(event) => { setParagraphFields((current) => current.map((value, fieldIndex) => fieldIndex === index ? event.target.value : value)); setChecked(false); }} /></label>)}</div><p className={styles.wordMeter}>{paragraphWords} words · WeLearn study target: about 80–110 words, adjusted to the essay</p></>}
      {active.mode === 'transfer' && <div className={styles.transferBridge}><span>Paragraph-to-essay bridge</span><h4>Your Body 2 block work is ready to transfer</h4><p>Complete Essay Practice is where timing and the full 250-word response belong. This engine remains focused on building the second paragraph correctly.</p><ul><li>Carry over the exact Body 2 job.</li><li>Keep the {exercise.blocks.map((block) => block.label).join(' → ')} sequence visible.</li><li>Confirm that the paragraph completes the instruction without repeating Body 1.</li></ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
      <div className={styles.exerciseActions}><button type="button" className={styles.secondaryButton} onClick={resetExercise}><RotateCcw size={16} /> Reset</button><button type="button" onClick={check} disabled={(active.mode === 'mcq' && !selected) || (active.mode === 'assemble' && assembled.length !== exercise.blocks.length) || (active.mode === 'write' && wordCount(writing) < 12) || (active.mode === 'paragraph' && paragraphWords < 65)}><CheckCircle2 size={17} /> {active.mode === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button></div>
      {checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite"><CheckCircle2 size={20} /><div><strong>{passed ? SE_CORRIGE.has(active.mode) ? 'Level complete.' : 'Ready to compare.' : 'Revise this attempt.'}</strong><p>{active.mode === 'mcq' ? mcq.feedback : active.mode === 'assemble' ? `For this ${lesson.shortLabel} task, the study sequence is ${exercise.blocks.map((block) => block.label).join(' → ')}.` : active.mode === 'write' ? `Compare the function of your sentence with the model ${exercise.blocks[2].label.toLowerCase()} block.` : active.mode === 'paragraph' ? 'Read the blocks as one continuous paragraph. Check that Body 2 adds a distinct idea and completes the required answer.' : 'The transfer point is ready. Complete Essay Practice handles timing and the full response; this engine does not award a band score.'}</p>{active.mode !== 'transfer' && <p><strong>Model:</strong> {bodyTwoParagraph(exercise)}</p>}</div></div>}
    </div><div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(LEVELS.length - 1, level + 1))} disabled={level === LEVELS.length - 1}>Next <ArrowRight size={16} /></button></div></div>
  </section>;
}
