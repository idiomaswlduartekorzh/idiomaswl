'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { BODY_ONE_LESSONS, bodyParagraph } from './body-one-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = [
  { title: 'Identify the function', mode: 'mcq' },
  { title: 'Choose an aligned topic sentence', mode: 'mcq' },
  { title: 'Detect the logic error', mode: 'mcq' },
  { title: 'Assemble the blocks', mode: 'assemble' },
  { title: 'Complete the missing block', mode: 'mcq' },
  { title: 'Write one original sentence', mode: 'write' },
  { title: 'Build the complete Body 1 paragraph', mode: 'paragraph' },
  { title: 'Transfer to complete essay practice', mode: 'transfer' },
] as const;

/**
 * Reparte las opciones. La correcta siempre se escribe primera en el array.
 *
 * Antes esto era una rotación cíclica sembrada con `level + índice del ejemplo`. Como esa
 * semilla no distinguía un tipo de ensayo de otro, los cinco compartían la misma secuencia
 * de letras correctas —D, B, D, A— y bastaba memorizar cuatro para aprobar el motor entero
 * sin leer los enunciados. Ahora la semilla lleva el tipo de ensayo y el reparto es un
 * barajado real con posiciones equilibradas por bloques.
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

function wordCount(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

export default function BodyOnePracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [assembled, setAssembled] = useState<string[]>([]);
  const [writing, setWriting] = useState('');
  const [paragraphFields, setParagraphFields] = useState<string[]>([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const lesson = BODY_ONE_LESSONS.find((item) => item.id === essayType) ?? BODY_ONE_LESSONS[0];
  // examples[0] es el worked example, impreso entero más arriba en la misma página: si un
  // nivel cae en él, «completa el bloque que falta» se responde scrolleando. Se salta el 0.
  const exercise = lesson.examples[1 + (level % (lesson.examples.length - 1))];
  const active = LEVELS[level];

  useEffect(() => {
    const saved = window.localStorage.getItem(`welearn-task2-body1-${essayType}`);
    if (saved) setCompleted(JSON.parse(saved));
  }, [essayType]);

  useEffect(() => { setParagraphFields(exercise.blocks.map(() => '')); }, [exercise]);

  /**
   * Explicación por OPCIÓN, no una sola para toda la pregunta.
   *
   * Antes las cuatro opciones compartían la misma frase: fallabas y no te decía por qué
   * fallaba lo TUYO. Ahora casi toda la explicación se deduce, y se deduce porque la fase
   * anterior hizo que los distractores salieran del propio ejercicio: si el distractor es
   * el `purpose` del bloque 4, la explicación es «ese es el trabajo del bloque 4». Solo el
   * nivel 2, cuyas opciones son diagnósticos escritos a mano, necesita texto propio.
   */
  const mcq = useMemo(() => {
    const otros = lesson.examples.filter((item) => item !== exercise).slice(0, 3);

    if (level === 0) {
      const objetivo = exercise.blocks[2];
      const why = new Map(exercise.blocks.map((block) => [
        block.purpose,
        block === objetivo
          ? `Correct. That is exactly what the ${objetivo.label.toLowerCase()} does in this paragraph.`
          : `That is the job of the ${block.label.toLowerCase()} block, not the ${objetivo.label.toLowerCase()}. Both are in this paragraph, but they do different work.`,
      ]));
      return {
        question: `What is the function of this ${objetivo.label.toLowerCase()} block?`,
        context: objetivo.text,
        correct: objetivo.purpose,
        options: rotateOptions([objetivo.purpose, exercise.blocks[0].purpose, exercise.blocks[3].purpose, exercise.blocks[4].purpose], `body1|${lesson.id}`, level),
        why,
      };
    }

    if (level === 1) {
      const why = new Map<string, string>([[exercise.blocks[0].text, 'Correct. It states one claim that the four sentences after it can prove.']]);
      for (const item of otros) why.set(item.blocks[0].text, `That is a well-built topic sentence, but it belongs to the “${item.title}” paragraph. It does not answer this prompt, and Task Response measures exactly that.`);
      return {
        question: 'Which topic sentence gives this Body 1 paragraph one aligned job?',
        context: exercise.prompt,
        correct: exercise.blocks[0].text,
        options: rotateOptions([exercise.blocks[0].text, ...otros.map((item) => item.blocks[0].text)], `body1|${lesson.id}`, level),
        why,
      };
    }

    if (level === 2) {
      const correct = 'The draft states a claim but does not develop its logic.';
      return {
        question: 'Which diagnosis identifies the most serious paragraph error?',
        context: `Paragraph job: ${exercise.paragraphJob} Draft: "${exercise.blocks[0].text} This is a very important issue for everyone. Many people have different opinions. It has advantages and disadvantages."`,
        correct,
        options: rotateOptions([correct, 'The draft needs a memorised proverb to make its opening sound more impressive.', 'The draft must include an exact statistic and the name of the study behind it.', 'The draft should delete its topic sentence and begin straight with the supporting detail.'], `body1|${lesson.id}`, level),
        why: new Map([
          [correct, 'Correct. The draft asserts and then repeats itself. Nothing in it explains why the claim holds.'],
          ['The draft needs a memorised proverb to make its opening sound more impressive.', 'A proverb adds decoration, not development. The examiner is reading for reasoning, and a memorised phrase can lower the score rather than raise it.'],
          ['The draft must include an exact statistic and the name of the study behind it.', 'No statistic is required in Task 2, and inventing one is worse than leaving it out. What is missing here is the explanation, not the data.'],
          ['The draft should delete its topic sentence and begin straight with the supporting detail.', 'Removing the topic sentence would leave the paragraph with no claim at all. The claim is the one part that works; it is the support underneath it that is missing.'],
        ]),
      };
    }

    const objetivo = exercise.blocks[3];
    const why = new Map<string, string>([[objetivo.text, `Correct. It makes the ${exercise.blocks[2].label.toLowerCase()} concrete without changing what the paragraph is about.`]]);
    for (const item of otros) why.set(item.blocks[3].text, `That is a good illustration, but it comes from the “${item.title}” paragraph. Dropping it in here changes the topic halfway through.`);
    return {
      question: `Which sentence best completes the missing ${objetivo.label} block?`,
      context: `${exercise.blocks[0].text} ${exercise.blocks[1].text} ${exercise.blocks[2].text} [${objetivo.label.toUpperCase()} MISSING] ${exercise.blocks[4].text}`,
      correct: objetivo.text,
      options: rotateOptions([objetivo.text, ...otros.map((item) => item.blocks[3].text)], `body1|${lesson.id}`, level),
      why,
    };
  }, [exercise, lesson.examples, lesson.id, level]);

  const assemblyChoices = useMemo(() => rotateOptions(exercise.blocks.map((item) => item.label), `body1-assemble|${lesson.id}`, level), [exercise, lesson.examples, level]);
  const assemblyCorrect = assembled.join('|') === exercise.blocks.map((item) => item.label).join('|');
  const mcqCorrect = selected === mcq.correct;
  const paragraphWords = paragraphFields.reduce((total, value) => total + wordCount(value), 0);

  function rememberComplete() {
    const next = Array.from(new Set([...completed, level]));
    setCompleted(next);
    window.localStorage.setItem(`welearn-task2-body1-${essayType}`, JSON.stringify(next));
  }

  function check() {
    setChecked(true);
    if ((active.mode === 'mcq' && mcqCorrect) || (active.mode === 'assemble' && assemblyCorrect) || (active.mode === 'write' && wordCount(writing) >= 12) || (active.mode === 'paragraph' && paragraphWords >= 65) || active.mode === 'transfer') rememberComplete();
  }

  function resetExercise() {
    setSelected('');
    setChecked(false);
    setAssembled([]);
    setWriting('');
    setParagraphFields(exercise.blocks.map(() => ''));
  }

  function go(next: number) {
    setLevel(next);
    resetExercise();
  }

  const passed = (active.mode === 'mcq' && mcqCorrect) || (active.mode === 'assemble' && assemblyCorrect) || (active.mode === 'write' && wordCount(writing) >= 12) || (active.mode === 'paragraph' && paragraphWords >= 65) || active.mode === 'transfer';

  return <section id="practice-engine" className={`${styles.section} ${styles.practiceSection}`}>
    <div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2>Build Body 1 by level</h2><p>Move from recognising one sentence function to transferring the paragraph into a complete timed essay.</p></div>
    <div className={styles.levelRail}>{LEVELS.map((item, index) => <button key={item.title} type="button" className={`${styles.levelButton} ${index === level ? styles.levelButtonActive : ''} ${completed.includes(index) ? styles.levelButtonDone : ''}`} onClick={() => go(index)}><span>{completed.includes(index) ? '✓' : index + 1}</span><strong>{item.title}</strong></button>)}</div>
    <div className={styles.enginePanel}>
      <div className={styles.engineHeader}><div><p>Level {level + 1} of {LEVELS.length}</p><h3>{active.title}</h3></div><strong>{completed.length}/{LEVELS.length} complete</strong></div>
      <div className={styles.exerciseBody}>
        <span className={styles.typeTag}>{lesson.shortLabel}</span>
        {active.mode === 'mcq' && <><p className={styles.exercisePrompt}>{mcq.question}</p><p className={styles.exerciseInstruction}>{mcq.context}</p><div className={styles.optionGrid}>{mcq.options.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === mcq.correct ? styles.correct : ''} ${checked && selected === option && option !== mcq.correct ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></>}
        {active.mode === 'assemble' && <><p className={styles.exercisePrompt}>Assemble the blocks in the correct sequence for this question type.</p><p className={styles.exerciseInstruction}>{exercise.paragraphJob}</p><div className={styles.assemblyWorkspace}>{assembled.map((label, index) => <button type="button" key={`${label}-${index}`} onClick={() => { setAssembled((current) => current.filter((_, itemIndex) => itemIndex !== index)); setChecked(false); }}><span>{index + 1}</span>{label}</button>)}</div><div className={styles.blockChoices}>{assemblyChoices.filter((label) => !assembled.includes(label)).map((label) => <button type="button" key={label} onClick={() => { setAssembled((current) => [...current, label]); setChecked(false); }}>{label}</button>)}</div></>}
        {active.mode === 'write' && <><p className={styles.exercisePrompt}>Write one original {exercise.blocks[2].label.toLowerCase()} sentence.</p><p className={styles.exerciseInstruction}><strong>{exercise.blocks[0].label}:</strong> {exercise.blocks[0].text}<br />{exercise.blocks[2].purpose}</p><textarea className={styles.engineTextarea} rows={6} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} placeholder={`Write one ${exercise.blocks[2].label.toLowerCase()} sentence of at least 12 words.`} /><p className={styles.wordMeter}>{wordCount(writing)} words · study target: 12+ purposeful words</p></>}
        {active.mode === 'paragraph' && <><p className={styles.exercisePrompt}>Build a complete Body 1 paragraph with the {lesson.shortLabel} architecture.</p><p className={styles.exerciseInstruction}>{exercise.prompt}<br /><strong>Paragraph job:</strong> {exercise.paragraphJob}</p><div className={styles.paragraphBuilder}>{exercise.blocks.map((block, index) => <label key={block.label}><strong>{block.label}</strong><span>{block.purpose}</span><textarea rows={3} value={paragraphFields[index] ?? ''} onChange={(event) => { setParagraphFields((current) => current.map((value, fieldIndex) => fieldIndex === index ? event.target.value : value)); setChecked(false); }} /></label>)}</div><p className={styles.wordMeter}>{paragraphWords} words · WeLearn study target: about 80–110 words, adjusted to the essay</p></>}
        {active.mode === 'transfer' && <div className={styles.transferBridge}><span>Paragraph-to-essay bridge</span><h4>Your Body 1 block work is ready to transfer</h4><p>Complete Essay Practice is where you combine prompt analysis, introduction, both body paragraphs and conclusion under one timer. This lesson keeps its engine focused on Body 1.</p><ul><li>Carry over the exact paragraph job.</li><li>Keep the {exercise.blocks.map((block) => block.label).join(' → ')} sequence visible.</li><li>Check that Body 2 adds a different required idea.</li></ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
        <div className={styles.exerciseActions}>
          <button type="button" className={styles.secondaryButton} onClick={resetExercise}><RotateCcw size={16} /> Reset</button>
          <button type="button" onClick={check} disabled={(active.mode === 'mcq' && !selected) || (active.mode === 'assemble' && assembled.length !== exercise.blocks.length) || (active.mode === 'write' && wordCount(writing) < 12) || (active.mode === 'paragraph' && paragraphWords < 65)}><CheckCircle2 size={17} /> {active.mode === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button>
        </div>
        {checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite"><CheckCircle2 size={20} /><div><strong>{passed ? SE_CORRIGE.has(active.mode) ? 'Level complete.' : 'Ready to compare.' : 'Revise this attempt.'}</strong><p>{active.mode === 'mcq' ? (mcq.why.get(selected) ?? mcq.why.get(mcq.correct)) : active.mode === 'assemble' ? `For this ${lesson.shortLabel} task, the study sequence is ${exercise.blocks.map((block) => block.label).join(' → ')}.` : active.mode === 'write' ? `Compare the function of your sentence with the model ${exercise.blocks[2].label.toLowerCase()} block.` : active.mode === 'paragraph' ? 'Read the blocks as one continuous paragraph. Remove repetition and verify that every sentence develops the same controlling idea.' : 'The transfer point is ready. Complete Essay Practice handles timing and the full 250-word response; this engine does not award a band score.'}</p>{active.mode !== 'transfer' && <p><strong>Model:</strong> {bodyParagraph(exercise)}</p>}</div></div>}
      </div>
      <div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(LEVELS.length - 1, level + 1))} disabled={level === LEVELS.length - 1}>Next <ArrowRight size={16} /></button></div>
    </div>
  </section>;
}
