'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { CONCLUSION_LESSONS, conclusionText } from './conclusion-data';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

const LEVELS = [
  ['Match it to its prompt', 'mcq'], ['Choose the aligned restatement', 'mcq'], ['Detect conclusion drift', 'mcq'],
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

/** Los 25 enunciados, con su tema, para que el nivel 1 tenga distractores reales. */
const PROMPT_POOL = CONCLUSION_LESSONS.flatMap((lesson) =>
  lesson.examples.map((example) => ({
    text: example.prompt,
    title: example.title,
    type: lesson.id,
    // El tema en minúscula, para poder decir «nunca menciona X» en el feedback.
    subject: example.title.charAt(0).toLowerCase() + example.title.slice(1),
  })));

/**
 * Tres enunciados ajenos, los de longitud más parecida: uno de la misma familia —el difícil,
 * porque comparte instrucción— y dos de fuera.
 *
 * No `slice(0, 3)` sobre la lista tal cual: eso devuelve siempre los tres primeros del banco
 * y los últimos no saldrían nunca de distractor, así que solo aparecerían cuando les tocase
 * ser la respuesta. Es el defecto que ya se cazó en la revisión final.
 */
function nearestPrompts(correct: string, ownType: string) {
  const target = words(correct);
  const sorted = PROMPT_POOL
    .filter((item) => item.text !== correct)
    .sort((a, b) => {
      const difference = Math.abs(words(a.text) - target) - Math.abs(words(b.text) - target);
      return difference !== 0 ? difference : a.text.localeCompare(b.text);
    });
  const same = sorted.filter((item) => item.type === ownType).slice(0, 1);
  return [...same, ...sorted.filter((item) => item.type !== ownType).slice(0, 3 - same.length)].slice(0, 3);
}

export default function ConclusionPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0); const [selected, setSelected] = useState(''); const [checked, setChecked] = useState(false);
  const [assembled, setAssembled] = useState<string[]>([]); const [writing, setWriting] = useState(''); const [fields, setFields] = useState<string[]>([]); const [completed, setCompleted] = useState<number[]>([]);
  const lesson = CONCLUSION_LESSONS.find((item) => item.id === essayType) ?? CONCLUSION_LESSONS[0];
  const example = lesson.examples[1 + (level % (lesson.examples.length - 1))]; const active = LEVELS[level];
  /**
   * Vaciar las cajas al cambiar de ejemplo, ajustando el estado en el render.
   *
   * Estaba en un `useEffect` con `[example]`: React pintaba las cajas del ejemplo anterior y
   * las borraba en un segundo render. Con el ajuste en render no llega a pintarse el estado
   * viejo, y es el patrón que la propia documentación de React recomienda para «reiniciar
   * estado cuando cambia una prop».
   */
  const [fieldsBelongTo, setFieldsBelongTo] = useState(example.title);
  if (fieldsBelongTo !== example.title) {
    setFieldsBelongTo(example.title);
    setFields(example.blocks.map(() => ''));
  }
  // El progreso guardado solo existe en el navegador, así que se lee después de montar.
  useEffect(() => { const saved = window.localStorage.getItem(`welearn-task2-conclusion-${essayType}`); if (saved) setCompleted(JSON.parse(saved)); }, [essayType]);
  /**
   * Explicación por OPCIÓN. Los distractores de este motor siguen siendo fijos —son errores
   * de conclusión, no frases de otro párrafo—, así que cada uno lleva su texto: dice qué
   * error concreto comete esa opción, no una frase común para las cuatro.
   */
  const mcq = useMemo(() => {
    if (level === 0) {
      /**
       * Se da la conclusión y se pregunta a qué enunciado responde.
       *
       * Dos intentos anteriores fallaron por lo mismo, y merece quedar escrito. La respuesta
       * era `lesson.function`, que la página imprime más arriba como «Conclusion function: …».
       * Cambiarla por `example.conclusionJob` no arregló nada: `conclusion-data.ts` lo define
       * como `conclusionJob: lessonMeta[source.id].function`, la misma cadena. Y cambiarla
       * por `example.commonMistake` tampoco: es `commonMistake: lessonMeta[source.id].trap`,
       * y `trap` también se imprime, como «Common trap». Medido las dos veces: 5 de 5 seguían
       * filtradas.
       *
       * Los dos campos son constantes de FAMILIA disfrazadas de campos del ejemplo —los
       * cinco ejemplos de un tipo comparten job y trap—, así que en este módulo no existe
       * ninguna respuesta propia del ejemplo salvo el enunciado y los dos bloques.
       *
       * Entonces se invierte la pregunta: aquí está la conclusión, ¿de qué pregunta es? La
       * respuesta es el enunciado, que es del ejemplo y no se imprime como respuesta en
       * ninguna parte, y la destreza es la primera que hace falta: notar si un cierre
       * contesta la pregunta que tiene delante.
       */
      const a = example.prompt;
      const otros = nearestPrompts(a, lesson.id);
      return { q: 'This is the conclusion. Which prompt does it close?', c: `“${conclusionText(example)}”`, a, o: rotate([a, ...otros.map((item) => item.text)], `conclusion|${lesson.id}`, level), why: new Map([
        [a, 'Correct. The closing sentences answer this question and no other.'],
        ...otros.map((item) => [item.text, `The conclusion above never mentions ${item.subject}. It closes a different question from the “${item.title}” one.`] as const),
      ]) };
    }
    if (level === 1) {
      const a = example.blocks[0].text;
      return { q: 'Which opening preserves the established answer?', c: example.prompt, a, o: rotate([a, 'This essay has looked at several different ideas about this important topic and has explained what a number of people think about it.', 'There are convincing arguments on every side of this debate, so no clear judgement is possible and each reader must decide alone.', 'A new policy will certainly solve this problem within a few years, helped by technology that this essay has not discussed.'], `conclusion|${lesson.id}`, level), why: new Map([
        [a, 'Correct. It restates the same answer in fresh wording, which is what the first conclusion sentence is for.'],
        ['This essay has looked at several different ideas about this important topic and has explained what a number of people think about it.', 'This describes the essay instead of restating its answer. After reading it, the examiner still does not know your position.'],
        ['There are convincing arguments on every side of this debate, so no clear judgement is possible and each reader must decide alone.', 'This abandons the position the essay spent four paragraphs building. Refusing to judge at the end costs Task Response.'],
        ['A new policy will certainly solve this problem within a few years, helped by technology that this essay has not discussed.', 'This adds a prediction and a topic the body never covered. A conclusion cannot introduce what it has no space to support.'],
      ]) };
    }
    if (level === 2) {
      const a = 'The draft loses the required answer and introduces new speculation.';
      return { q: 'Which diagnosis identifies the most serious conclusion error?', c: 'Draft: “In conclusion, both sides are interesting. A future study may discover a better answer.”', a, o: rotate([a, 'The draft needs an invented statistic.', 'The draft is wrong because every conclusion needs three sentences.', 'The draft should copy the thesis word for word.'], `conclusion|${lesson.id}`, level), why: new Map([
        [a, 'Correct. It drops the position and replaces it with speculation, which damages Task Response twice over.'],
        ['The draft needs an invented statistic.', 'No conclusion needs a statistic, and inventing one would add a second fault. What is missing is the answer.'],
        ['The draft is wrong because every conclusion needs three sentences.', 'There is no required sentence count. A two-sentence conclusion that keeps its position beats a three-sentence one that loses it.'],
        ['The draft should copy the thesis word for word.', 'Copying the thesis repeats rather than closes, and it wastes the chance to synthesise. Restate the same answer in different words.'],
      ]) };
    }
    const a = example.blocks[1].text;
    return { q: `Which sentence best completes the ${example.blocks[1].label.toLowerCase()}?`, c: `${example.blocks[0].text} [SECOND BLOCK MISSING]`, a, o: rotate([a, 'This issue has many causes, effects, benefits and disadvantages that different groups of people will weigh in different ways.', 'A famous study carried out by leading international researchers proves beyond doubt that this answer is the correct one.', 'Governments should also consider taxation, housing reform and international agreements, none of which was discussed anywhere in the body paragraphs.'], `conclusion|${lesson.id}`, level), why: new Map([
      [a, 'Correct. It synthesises reasoning the essay already developed, without adding anything new.'],
      ['This issue has many causes, effects, benefits and disadvantages that different groups of people will weigh in different ways.', 'This is a list of categories, not a synthesis. It could close any essay on any topic, which is exactly why it closes none of them well.'],
      ['A famous study carried out by leading international researchers proves beyond doubt that this answer is the correct one.', 'An unnamed study is invented evidence. Task 2 rewards your reasoning, not an authority you cannot cite.'],
      ['Governments should also consider taxation, housing reform and international agreements, none of which was discussed anywhere in the body paragraphs.', 'Three new recommendations in the final sentence have no support behind them. Recommend only what the essay argued for.'],
    ]) };
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
      {active[1] === 'write' && <><p className={styles.exercisePrompt}>Write one original {example.blocks[1].label.toLowerCase()}.</p><p className={styles.exerciseInstruction}>{example.prompt}</p><textarea className={styles.engineTextarea} rows={5} value={writing} onChange={(event) => { setWriting(event.target.value); setChecked(false); }} spellCheck={false} autoCorrect="off" autoCapitalize="off" /><p className={styles.wordMeter}>{words(writing)} words · {words(writing) >= 10 ? 'minimum 10 reached — you can compare now' : `minimum 10 words · ${10 - words(writing)} to go before you can compare`}</p></>}
      {active[1] === 'paragraph' && <><p className={styles.exercisePrompt}>Build the complete conclusion.</p><p className={styles.exerciseInstruction}>{example.prompt}</p><div className={styles.paragraphBuilder}>{example.blocks.map((block, index) => <label key={block.label}><strong>{block.label}</strong><span>{block.purpose}</span><textarea rows={4} value={fields[index] ?? ''} onChange={(event) => { setFields((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value)); setChecked(false); }} spellCheck={false} autoCorrect="off" autoCapitalize="off" /></label>)}</div>{/* El umbral que abre el botón son 25 palabras. Antes el texto anunciaba «30–50», que
        es el objetivo de estudio, no el mínimo: el botón se abría antes de lo que decía. */}
      <p className={styles.wordMeter}>{totalWords} words · {totalWords >= 25 ? 'minimum 25 reached — WeLearn aims for about 30–50 in the finished essay' : `minimum 25 words · ${25 - totalWords} to go before you can compare`}</p></>}
      {active[1] === 'transfer' && <div className={styles.transferBridge}><span>Conclusion-to-essay bridge</span><h4>Your closing blocks are ready to transfer</h4><p>Complete Essay Practice is where timing and the full 250-word response belong.</p><ul><li>Keep the same answer from the thesis.</li><li>Synthesise only ideas developed in the body.</li><li>Run Final Review before submitting the complete response.</li></ul><Link href="/practica/ielts/academic/writing/task2/tarea-completa">Open Complete Essay Practice <ExternalLink size={16} /></Link></div>}
      <div className={styles.exerciseActions}><button type="button" className={styles.secondaryButton} onClick={reset}><RotateCcw size={16} /> Reset</button><button type="button" onClick={check} disabled={(active[1] === 'mcq' && !selected) || (active[1] === 'assemble' && assembled.length !== order.length) || (active[1] === 'write' && words(writing) < 10) || (active[1] === 'paragraph' && totalWords < 25)}><CheckCircle2 size={17} /> {active[1] === 'transfer' ? 'Mark transfer ready' : 'Check this level'}</button></div>
      {checked && <div className={`${styles.feedback} ${passed ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><CheckCircle2 size={20} /><div><strong>{passed ? SE_CORRIGE.has(active[1]) ? 'Level complete.' : 'Ready to compare.' : 'Revise this attempt.'}</strong><p>{active[1] === 'mcq' ? (mcq.why.get(selected) ?? mcq.why.get(mcq.a)) : active[1] === 'assemble' ? `Use ${order.join(' → ')} for this task.` : active[1] === 'transfer' ? 'Transfer is ready; this engine does not award a band score.' : `Compare the function of each sentence with this model: ${conclusionText(example)}`}</p></div></div>}
    </div><div className={styles.engineNav}><button type="button" onClick={() => go(Math.max(0, level - 1))} disabled={level === 0}><ArrowLeft size={16} /> Previous</button><button type="button" onClick={() => go(Math.min(7, level + 1))} disabled={level === 7}>Next <ArrowRight size={16} /></button></div></div>
  </section>;
}
