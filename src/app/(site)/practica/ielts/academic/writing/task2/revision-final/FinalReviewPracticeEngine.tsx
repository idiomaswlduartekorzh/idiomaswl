'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { REVIEW_LESSONS, pickDistractors } from './review-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = ['Name the check that fails', 'Find the missing instruction', 'Diagnose logic drift', 'Order the review', 'Choose the revision', 'Rewrite one sentence', 'Run a full checklist', 'Transfer to timed practice'];
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

export default function FinalReviewPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0); const [selected, setSelected] = useState(''); const [checked, setChecked] = useState(false); const [ordered, setOrdered] = useState<string[]>([]); const [writing, setWriting] = useState(''); const [ticks, setTicks] = useState<boolean[]>([]); const [completed, setCompleted] = useState<number[]>([]);
  const lesson = REVIEW_LESSONS.find((item) => item.id === essayType) ?? REVIEW_LESSONS[0]; const example = lesson.cases[1 + (level % (lesson.cases.length - 1))];
  useEffect(() => { setTicks(lesson.layers.map(() => false)); }, [lesson]);
  useEffect(() => { const saved = window.localStorage.getItem(`welearn-task2-final-review-${essayType}`); if (saved) setCompleted(JSON.parse(saved)); }, [essayType]);
  const correctOrder = lesson.layers.map((layer) => layer.label);
  /**
   * Explicación por OPCIÓN. En el nivel 0 se deduce: cada distractor es otra capa de
   * revisión real, y cada capa tiene su pregunta escrita en los datos, así que la
   * explicación dice qué comprueba esa capa y por qué no es la que toca aquí.
   */
  const mcq = useMemo(() => {
    if (level === 0) {
      const why = new Map<string, string>([[example.category, `Correct. ${example.explanation}`]]);
      for (const layer of lesson.layers) {
        if (layer.label === example.category) continue;
        why.set(layer.label, `${layer.label} asks: “${layer.question}” That is a real check, but it is not what fails here. This draft breaks down at ${example.category.toLowerCase()}.`);
      }
      return { q: 'Read this extract. Which check does it fail first?', c: example.draft, a: example.category, o: rotate([example.category, ...pickDistractors(correctOrder, example.category, example.issue)], `review|${lesson.id}`, level), why };
    }
    if (level === 1) {
      /**
       * La respuesta sale del EJEMPLO, no del tipo.
       *
       * Era `lesson.decisiveCheck`, y la página lo imprime en el panel de la familia como
       * «Decisive check: …». Es el tercer sitio de Task 2 donde aparece el mismo patrón:
       * campo del tipo usado como respuesta, con el tipo impreso encima. `example.issue`
       * describe el fallo de ESTE borrador y no se pinta en ninguna parte —el ejemplo
       * resuelto que sí lo enseña es el 0, y este motor nunca lo usa—.
       */
      const a = example.issue;
      return { q: 'Which sentence says what is wrong with this draft?', c: example.draft, a, o: rotate([a, 'Did I use at least five different linking phrases spread evenly across the four paragraphs?', 'Did I include a statistic or a named research study in every single body paragraph?', 'Did I write exactly four paragraphs, each of them roughly the same length as the others?'], `review|${lesson.id}`, level), why: new Map([
        [a, `Correct. ${lesson.instruction}`],
        ['Did I use at least five different linking phrases spread evenly across the four paragraphs?', 'Counting linkers measures nothing. Overusing them is a common way to lose marks on Coherence, and none of it answers the task.'],
        ['Did I include a statistic or a named research study in every single body paragraph?', 'Task 2 never asks for data, and invented studies cost more than they gain. Examples can be hypothetical.'],
        ['Did I write exactly four paragraphs, each of them roughly the same length as the others?', 'There is no required paragraph count or length. What matters is whether each paragraph does a job the prompt asked for.'],
      ]) };
    }
    if (level === 2) {
      const a = example.explanation;
      return { q: 'Which diagnosis protects Task Response most directly?', c: example.draft, a, o: rotate([a, 'The draft needs a more advanced synonym for its most frequently repeated noun.', 'The draft must include a rhetorical question so that it engages the examiner directly.', 'The draft needs a longer opening sentence in order to signal an academic register.'], `review|${lesson.id}`, level), why: new Map([
        [a, 'Correct. This is the fault that changes whether the essay answers the question.'],
        ['The draft needs a more advanced synonym for its most frequently repeated noun.', 'Vocabulary is worth fixing, but later. An essay with perfect synonyms that misses the task still scores badly on Task Response.'],
        ['The draft must include a rhetorical question so that it engages the examiner directly.', 'Rhetorical questions do not raise any band and often read as informal. They also postpone the answer instead of giving it.'],
        ['The draft needs a longer opening sentence in order to signal an academic register.', 'Length is not register, and the opening is not what fails here. Fix the answer and the logic before polishing sentences.'],
      ]) };
    }
    const a = example.revision;
    return { q: 'Which revision fixes the identified problem without changing the essay topic?', c: example.draft, a, o: rotate([a, 'This topic is important and has a great many advantages and disadvantages for everyone involved.', 'A famous study at a well-known university proves that this issue affects absolutely everyone.', 'In the future, society will certainly solve this problem without needing any further intervention.'], `review|${lesson.id}`, level), why: new Map([
      [a, `Correct. ${example.explanation}`],
      ['This topic is important and has a great many advantages and disadvantages for everyone involved.', 'This could be pasted into any essay on any subject. A revision has to fix the specific fault, not replace it with something vaguer.'],
      ['A famous study at a well-known university proves that this issue affects absolutely everyone.', 'Inventing a source adds a new problem on top of the original one, and “absolutely everyone” overstates the claim.'],
      ['In the future, society will certainly solve this problem without needing any further intervention.', 'This changes the subject to a prediction the essay never argued, so the original fault is still there.'],
    ]) };
  }, [correctOrder, example, lesson, level]);
  const mode = level <= 2 || level === 4 ? 'mcq' : level === 3 ? 'order' : level === 5 ? 'write' : level === 6 ? 'checklist' : 'transfer';
  const passed = mode === 'mcq' ? selected === mcq.a : mode === 'order' ? ordered.join('|') === correctOrder.join('|') : mode === 'write' ? words(writing) >= 12 : mode === 'checklist' ? ticks.every(Boolean) : true;
  function reset() { setSelected(''); setChecked(false); setOrdered([]); setWriting(''); setTicks(lesson.layers.map(() => false)); }
  function go(index: number) { setLevel(index); reset(); }
  function check() { setChecked(true); if (passed) { const next = Array.from(new Set([...completed, level])); setCompleted(next); window.localStorage.setItem(`welearn-task2-final-review-${essayType}`, JSON.stringify(next)); } }
  return <section id="practice-engine" className={`${styles.section} ${styles.practiceSection}`}><div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2>Review the essay by level</h2><p>Move from identifying one issue to running the complete pre-submission sequence.</p></div><div className={styles.levelRail}>{LEVELS.map((title, index) => <button key={title} type="button" className={`${styles.levelButton} ${level === index ? styles.levelButtonActive : ''} ${completed.includes(index) ? styles.levelButtonDone : ''}`} onClick={() => go(index)}><span>{completed.includes(index) ? '✓' : index + 1}</span><strong>{title}</strong></button>)}</div><div className={styles.enginePanel}><div className={styles.engineHeader}><div><p>Level {level + 1} of 8</p><h3>{LEVELS[level]}</h3></div><strong>{completed.length}/8 complete</strong></div><div className={styles.exerciseBody}><span className={styles.typeTag}>{lesson.shortLabel}</span>
    {mode === 'mcq' && <><p className={styles.exercisePrompt}>{mcq.q}</p><p className={styles.exerciseInstruction}>{mcq.c}</p><div className={styles.optionGrid}>{mcq.o.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === mcq.a ? styles.correct : ''} ${checked && selected === option && option !== mcq.a ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></>}
    {mode === 'order' && <><p className={styles.exercisePrompt}>Put the five checks in the order worth running them.</p><p className={styles.exerciseInstruction}>Fix the answer before polishing the language.</p><div className={styles.assemblyWorkspace}>{ordered.map((label, index) => <button key={label} type="button" onClick={() => setOrdered((current) => current.filter((_, itemIndex) => itemIndex !== index))}><span>{index + 1}</span>{label}</button>)}</div><div className={styles.blockChoices}>{rotate(correctOrder, `review-orden|${lesson.id}`, 2).filter((label) => !ordered.includes(label)).map((label) => <button key={label} type="button" onClick={() => setOrdered((current) => [...current, label])}>{label}</button>)}</div></>}
    {mode === 'write' && <><p className={styles.exercisePrompt}>Rewrite the sentence while preserving its intended answer.</p><p className={styles.reviewDraft}>{example.draft}</p><p className={styles.exerciseInstruction}>{example.issue}</p><textarea className={styles.engineTextarea} rows={5} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} spellCheck={false} autoCorrect="off" autoCapitalize="off" /><p className={styles.wordMeter}>{words(writing)} words · study target: 12+ purposeful words</p></>}
    {mode === 'checklist' && <><p className={styles.exercisePrompt}>Run the complete review sequence on your current draft.</p><p className={styles.exerciseInstruction}>Tick a check only after you can point to evidence in the essay.</p><div className={styles.optionGrid}>{lesson.layers.map((layer, index) => <button key={layer.label} type="button" className={`${styles.option} ${ticks[index] ? styles.correct : ''}`} onClick={() => setTicks((current) => current.map((value, itemIndex) => itemIndex === index ? !value : value))}><span>{ticks[index] ? '✓' : index + 1}</span><strong>{layer.label}:</strong> {layer.question}</button>)}</div></>}
    {mode === 'transfer' && <div className={styles.transferBridge}><span>Review-to-submission bridge</span><h4>Your review order is ready for the complete essay</h4><p>Use this sequence during Complete Essay Practice. It checks evidence; it does not generate an automated band score.</p><ul>{correctOrder.map((item) => <li key={item}>{item}</li>)}</ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
    <div className={styles.exerciseActions}><button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" onClick={check} disabled={(mode === 'mcq' && !selected) || (mode === 'order' && ordered.length !== correctOrder.length) || (mode === 'write' && words(writing) < 12) || (mode === 'checklist' && !ticks.every(Boolean))}><CheckCircle2 size={17} /> {mode === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button></div>{checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><CheckCircle2 size={20} /><div><strong>{passed ? SE_CORRIGE.has(mode) ? 'Level complete.' : 'Ready to compare.' : 'Revise this attempt.'}</strong><p>{mode === 'mcq' ? (mcq.why.get(selected) ?? mcq.why.get(mcq.a)) : mode === 'order' ? `Use ${correctOrder.join(' → ')}.` : mode === 'write' ? `Compare the function of your revision with: ${example.revision}` : mode === 'checklist' ? 'The checklist is complete only when every tick is supported by visible essay evidence.' : 'Transfer ready; no automated band has been assigned.'}</p></div></div>}
  </div><div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(7, level + 1))} disabled={level === 7}>Next <ArrowRight size={16} /></button></div></div></section>;
}
