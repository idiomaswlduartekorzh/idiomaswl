'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import type { BodyOneExample } from './body-one-data';
import ColoredBodyParagraph from './ColoredBodyParagraph';
import { placeFirstAsCorrect } from '@/lib/practica/shuffle-options';
import styles from '../introduccion/page.module.css';

/**
 * Reparte las opciones; la correcta se escribe siempre primera.
 *
 * Era una rotación cíclica —`shift = amount % items.length`— sembrada con un número que no
 * distinguía un tipo de ensayo de otro. Resultado medido: los cinco tipos compartían solo
 * tres secuencias, y las cinco eran rotaciones de un mismo ciclo descendente. La letra
 * correcta bajaba una posición en cada ejemplo, con vuelta: una regla memorizable en una
 * frase, sin leer nada.
 *
 * Ahora la semilla es el título del ejemplo, que es único en toda la serie, y el reparto es
 * el barajado por bloques de @/lib/practica/shuffle-options.
 */
function rotate<T>(items: T[], seed: string, index: number) {
  return placeFirstAsCorrect(items, seed, index).options;
}

export default function BodyOneWorkshop({ example, seed }: { example: BodyOneExample; seed: number }) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicChecked, setTopicChecked] = useState(false);
  const [answers, setAnswers] = useState(() => example.blocks.map(() => ''));
  const [modelVisible, setModelVisible] = useState(false);
  const correctTopic = example.blocks[0].text;
  /**
 * Los distractores son OTRAS FRASES DEL MISMO PÁRRAFO, no rellenos escritos aparte.
 *
 * Antes eran dos cadenas fijas, idénticas en los cinco tipos de ensayo y en los cuatro
 * ejemplos: aparecían veinte veces cada una. Bastaba hacer dos ejercicios para reconocerlas
 * y acertar por descarte, sin leer el enunciado.
 *
 * Ahora se toman del propio ejemplo. Las tres opciones son frases reales de este párrafo, y
 * lo que se pide es distinguir cuál de ellas hace de topic sentence: elegir el mecanismo o
 * el enlace final enseña la diferencia concreta que falló, en vez de castigar por no
 * reconocer un relleno. Es el criterio que ya usa IntroductionWorkshop.
 *
 * No pueden repetirse entre ejercicios porque cada párrafo tiene sus propias frases.
 */
  const topicOptions = useMemo(() => rotate([
    correctTopic,
    example.blocks[2].text,
    example.blocks[4].text,
  ], `taller-body1|${example.title}`, seed), [correctTopic, seed]);
  // Palabras, no caracteres. Con `.length >= 12` bastaba escribir «aaaa bbbb cc» en cada
  // caja para desbloquear el modelo; los demás talleres ya contaban palabras.
  const writingReady = Object.values(answers).every((value) => value.trim().split(/\s+/).filter(Boolean).length >= 8);

  function reset() {
    setSelectedTopic('');
    setTopicChecked(false);
    setAnswers(example.blocks.map(() => ''));
    setModelVisible(false);
  }

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Guided Body 1 workshop</span><h3>You build it before WeLearn reveals it</h3></div>
      <button type="button" className={styles.iconButton} onClick={reset} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button>
    </div>

    <div className={styles.workshopStep}>
      <div className={styles.stepLabel}><strong>Step 1</strong><span>Choose the topic sentence that matches the paragraph job</span></div>
      <p className={styles.paragraphJob}><strong>Body 1 job:</strong> {example.paragraphJob}</p>
      <div className={styles.optionGrid}>{topicOptions.map((option, index) => {
        const chosen = selectedTopic === option;
        const correct = topicChecked && option === correctTopic;
        const incorrect = topicChecked && chosen && option !== correctTopic;
        return <button key={option} type="button" className={`${styles.option} ${chosen ? styles.selected : ''} ${correct ? styles.correct : ''} ${incorrect ? styles.incorrect : ''}`} onClick={() => { setSelectedTopic(option); setTopicChecked(false); setModelVisible(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>;
      })}</div>
      <div className={styles.workshopActions}><button type="button" onClick={() => setTopicChecked(true)} disabled={!selectedTopic}><Eye size={17} /> Check the topic sentence</button></div>
      {topicChecked && <div className={`${styles.feedback} ${selectedTopic === correctTopic ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
        <CheckCircle2 size={20} /><div><strong>{selectedTopic === correctTopic ? 'Aligned.' : 'Review the paragraph job.'}</strong><p>{selectedTopic === correctTopic ? 'This sentence gives Body 1 one precise claim to develop.' : 'That sentence belongs to this paragraph, but it is not its topic sentence: it develops or closes the claim instead of making it. The topic sentence is the one that states the job the other four then carry out.'}</p></div>
      </div>}
    </div>

    <div className={`${styles.workshopStep} ${selectedTopic !== correctTopic || !topicChecked ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}>{selectedTopic === correctTopic && topicChecked ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}<strong>Step 2</strong><span>Develop the claim with four purposeful blocks</span></div>
      {selectedTopic === correctTopic && topicChecked && <>
        <div className={styles.planGrid}>{example.blocks.map((item, index) => <label key={item.label} className={styles.guidedField}><strong>{item.label}</strong><span>{item.purpose}</span><textarea rows={4} value={answers[index]} onChange={(event) => { setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? event.target.value : value)); setModelVisible(false); }} placeholder={`Write your ${item.label.toLowerCase()} here.`} /></label>)}</div>
        <div className={styles.workshopActions}><button type="button" onClick={() => setModelVisible(true)} disabled={!writingReady}><Eye size={17} /> Compare with the expert model</button></div>
        {modelVisible && <div className={styles.bodyModelReveal} aria-live="polite">
          <span>Expert comparison</span>
          <div className={styles.modelBlockGrid}>{example.blocks.map((item) => <article key={item.label} className={styles[item.tone]}><strong>{item.label}</strong><p>{item.text}</p><small>{item.purpose}</small></article>)}</div>
          <div className={styles.completeParagraph}><strong>Complete model paragraph</strong><ColoredBodyParagraph blocks={example.blocks} /></div>
          <p className={styles.comparisonNote}>Your wording does not need to match the model. Check whether each sentence performs its labelled function and whether the full paragraph proves one controlling idea. This is explained feedback, not automated band scoring.</p>
        </div>}
      </>}
    </div>
  </div>;
}
