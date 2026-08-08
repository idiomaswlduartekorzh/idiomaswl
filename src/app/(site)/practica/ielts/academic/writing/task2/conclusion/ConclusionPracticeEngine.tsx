'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { CONCLUSION_LESSONS, conclusionText } from './conclusion-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = [
  ['Identify the job', 'mcq'], ['Choose the aligned restatement', 'mcq'], ['Detect conclusion drift', 'mcq'],
  ['Assemble the blocks', 'assemble'], ['Complete the synthesis', 'mcq'], ['Write one closing block', 'write'],
  ['Build the conclusion', 'paragraph'], ['Transfer to the full essay', 'transfer'],
] as const;
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
/**
 * ¿Este modo evalúa algo de verdad?
 *
 * Los modos de escritura solo cuentan palabras, y además el botón que dispara la evaluación
 * está deshabilitado por debajo del mismo umbral: cuando se puede pulsar, la condición ya es
 * cierta por construcción, así que «Revise this attempt.» era código inalcanzable. Decir
 * «Level complete.» ahí afirma sobre un texto que nadie ha leído.
 */
const SE_CORRIGE = new Set(['mcq', 'assemble', 'order']);

function words(value: string) { return value.trim().split(/\s+/).filter(Boolean).length; }

export default function ConclusionPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0); const [selected, setSelected] = useState(''); const [checked, setChecked] = useState(false);
  const [assembled, setAssembled] = useState<string[]>([]); const [writing, setWriting] = useState(''); const [fields, setFields] = useState<string[]>([]); const [completed, setCompleted] = useState<number[]>([]);
  const lesson = CONCLUSION_LESSONS.find((item) => item.id === essayType) ?? CONCLUSION_LESSONS[0];
  const example = lesson.examples[1 + (level % (lesson.examples.length - 1))]; const active = LEVELS[level];
  useEffect(() => { setFields(example.blocks.map(() => '')); }, [example]);
  useEffect(() => { const saved = window.localStorage.getItem(`welearn-task2-conclusion-${essayType}`); if (saved) setCompleted(JSON.parse(saved)); }, [essayType]);
  const mcq = useMemo(() => {
    // `c` se pinta como contexto ENCIMA de las opciones, así que no puede ser la respuesta:
    // valía `lesson.function`, es decir, la opción correcta impresa sobre la rejilla.
    if (level === 0) return { q: `What must this ${lesson.shortLabel} conclusion do?`, c: example.prompt, a: lesson.function, o: rotate([lesson.function, 'Introduce the strongest idea that did not fit in the body.', 'Describe what the essay has discussed without giving an answer.', 'Predict how the topic will change in the future.'], `conclusion|${lesson.id}`, level), f: 'A conclusion completes the existing answer; it does not create a new one.' };
    if (level === 1) return { q: 'Which opening preserves the established answer?', c: example.prompt, a: example.blocks[0].text, o: rotate([example.blocks[0].text, 'This essay has looked at several different ideas about this important topic and has explained what a number of people think about it.', 'There are convincing arguments on every side of this debate, so no clear judgement is possible and each reader must decide alone.', 'A new policy will certainly solve this problem within a few years, helped by technology that this essay has not discussed.'], `conclusion|${lesson.id}`, level), f: 'The aligned opening restates the same answer with fresh wording.' };
    if (level === 2) return { q: 'Which diagnosis identifies the most serious conclusion error?', c: 'Draft: “In conclusion, both sides are interesting. A future study may discover a better answer.”', a: 'The draft loses the required answer and introduces new speculation.', o: rotate(['The draft loses the required answer and introduces new speculation.', 'The draft needs an invented statistic and a named source to sound more convincing.', 'The draft is wrong because every conclusion needs three sentences.', 'The draft should copy the thesis word for word.'], `conclusion|${lesson.id}`, level), f: 'Position drift and new ideas damage Task Response more seriously than a missing memorised phrase.' };
    return { q: `Which sentence best completes the ${example.blocks[1].label.toLowerCase()}?`, c: `${example.blocks[0].text} [SECOND BLOCK MISSING]`, a: example.blocks[1].text, o: rotate([example.blocks[1].text, 'This issue has many causes, effects, benefits and disadvantages that different groups of people will weigh in different ways.', 'A famous study carried out by leading international researchers proves beyond doubt that this answer is the correct one.', 'Governments should also consider taxation, housing reform and international agreements, none of which was discussed anywhere in the body paragraphs.'], `conclusion|${lesson.id}`, level), f: 'The final block synthesises reasoning already developed in the essay.' };
  }, [example, lesson, level]);
  const order = example.blocks.map((block) => block.label); const assemblyCorrect = assembled.join('|') === order.join('|');
  const totalWords = fields.reduce((sum, value) => sum + words(value), 0);
  const passed = active[1] === 'mcq' ? selected === mcq.a : active[1] === 'assemble' ? assemblyCorrect : active[1] === 'write' ? words(writing) >= 10 : active[1] === 'paragraph' ? totalWords >= 25 : true;
  function reset() { setSelected(''); setChecked(false); setAssembled([]); setWriting(''); setFields(example.blocks.map(() => '')); }
  function go(index: number) { setLevel(index); reset(); }
  function check() { setChecked(true); if (passed) { const next = Array.from(new Set([...completed, level])); setCompleted(next); window.localStorage.setItem(`welearn-task2-conclusion-${essayType}`, JSON.stringify(next)); } }

  return <section id="practice-engine" className={`${styles.section} ${styles.practiceSection}`}><div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2>Close the essay by level</h2><p>Practise the conclusion as a sequence of decisions before transferring it to a timed response.</p></div>
    <div className={styles.levelRail}>{LEVELS.map(([title], index) => <button key={title} type="button" className={`${styles.levelButton} ${index === level ? styles.levelButtonActive : ''} ${completed.includes(index) ? styles.levelButtonDone : ''}`} onClick={() => go(index)}><span>{completed.includes(index) ? '✓' : index + 1}</span><strong>{title}</strong></button>)}</div>
    <div className={styles.enginePanel}><div className={styles.engineHeader}><div><p>Level {level + 1} of 8</p><h3>{active[0]}</h3></div><strong>{completed.length}/8 complete</strong></div><div className={styles.exerciseBody}><span className={styles.typeTag}>{lesson.shortLabel}</span>
      {active[1] === 'mcq' && <><p className={styles.exercisePrompt}>{mcq.q}</p><p className={styles.exerciseInstruction}>{mcq.c}</p><div className={styles.optionGrid}>{mcq.o.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === mcq.a ? styles.correct : ''} ${checked && selected === option && option !== mcq.a ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></>}
      {active[1] === 'assemble' && <><p className={styles.exercisePrompt}>Assemble this conclusion architecture.</p><p className={styles.exerciseInstruction}>{example.conclusionJob}</p><div className={styles.assemblyWorkspace}>{assembled.map((label, index) => <button key={`${label}-${index}`} type="button" onClick={() => setAssembled((current) => current.filter((_, itemIndex) => itemIndex !== index))}><span>{index + 1}</span>{label}</button>)}</div><div className={styles.blockChoices}>{rotate(order, `conclusion-orden|${lesson.id}`, 1).filter((label) => !assembled.includes(label)).map((label) => <button key={label} type="button" onClick={() => setAssembled((current) => [...current, label])}>{label}</button>)}</div></>}
      {active[1] === 'write' && <><p className={styles.exercisePrompt}>Write one original {example.blocks[1].label.toLowerCase()}.</p><p className={styles.exerciseInstruction}>{example.prompt}</p><textarea className={styles.engineTextarea} rows={5} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} /><p className={styles.wordMeter}>{words(writing)} words · study target: 10+ purposeful words</p></>}
      {active[1] === 'paragraph' && <><p className={styles.exercisePrompt}>Build the complete conclusion.</p><p className={styles.exerciseInstruction}>{example.prompt}</p><div className={styles.paragraphBuilder}>{example.blocks.map((block, index) => <label key={block.label}><strong>{block.label}</strong><span>{block.purpose}</span><textarea rows={4} value={fields[index] ?? ''} onChange={(event) => { setFields((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value)); setChecked(false); }} /></label>)}</div><p className={styles.wordMeter}>{totalWords} words · WeLearn study target: about 30–50 words, adjusted to the essay</p></>}
      {active[1] === 'transfer' && <div className={styles.transferBridge}><span>Conclusion-to-essay bridge</span><h4>Your closing blocks are ready to transfer</h4><p>Complete Essay Practice is where timing and the full 250-word response belong.</p><ul><li>Keep the same answer from the thesis.</li><li>Synthesise only ideas developed in the body.</li><li>Run Final Review before submitting the complete response.</li></ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
      <div className={styles.exerciseActions}><button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" onClick={check} disabled={(active[1] === 'mcq' && !selected) || (active[1] === 'assemble' && assembled.length !== order.length) || (active[1] === 'write' && words(writing) < 10) || (active[1] === 'paragraph' && totalWords < 25)}><CheckCircle2 size={17} /> {active[1] === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button></div>
      {checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><CheckCircle2 size={20} /><div><strong>{passed ? SE_CORRIGE.has(active[1]) ? 'Level complete.' : 'Ready to compare.' : 'Revise this attempt.'}</strong><p>{active[1] === 'mcq' ? mcq.f : active[1] === 'assemble' ? `Use ${order.join(' → ')} for this task.` : active[1] === 'transfer' ? 'Transfer is ready; this engine does not award a band score.' : `Compare the function of each sentence with this model: ${conclusionText(example)}`}</p></div></div>}
    </div><div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(7, level + 1))} disabled={level === 7}>Next <ArrowRight size={16} /></button></div></div>
  </section>;
}
