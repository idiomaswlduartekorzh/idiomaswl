'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import type { BodyOneExample } from './body-one-data';
import ColoredBodyParagraph from './ColoredBodyParagraph';
import styles from '../introduccion/page.module.css';

function rotate<T>(items: T[], amount: number) {
  const shift = amount % items.length;
  return [...items.slice(shift), ...items.slice(0, shift)];
}

export default function BodyOneWorkshop({ example, seed }: { example: BodyOneExample; seed: number }) {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [topicChecked, setTopicChecked] = useState(false);
  const [answers, setAnswers] = useState(() => example.blocks.slice(1).map(() => ''));
  const [modelVisible, setModelVisible] = useState(false);
  const correctTopic = example.blocks[0].text;
  const topicOptions = useMemo(() => rotate([
    correctTopic,
    'There are many different opinions about this issue, and both sides will be discussed in this essay.',
    'This topic has several causes, effects, advantages and disadvantages for modern society.',
  ], seed), [correctTopic, seed]);
  const writingReady = Object.values(answers).every((value) => value.trim().length >= 12);

  function reset() {
    setSelectedTopic('');
    setTopicChecked(false);
    setAnswers(example.blocks.slice(1).map(() => ''));
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
        <CheckCircle2 size={20} /><div><strong>{selectedTopic === correctTopic ? 'Aligned.' : 'Review the paragraph job.'}</strong><p>{selectedTopic === correctTopic ? 'This sentence gives Body 1 one precise claim to develop.' : 'The other sentence is generic or announces the essay instead of answering this paragraph\'s exact job.'}</p></div>
      </div>}
    </div>

    <div className={`${styles.workshopStep} ${selectedTopic !== correctTopic || !topicChecked ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}>{selectedTopic === correctTopic && topicChecked ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}<strong>Step 2</strong><span>Develop the claim with four purposeful blocks</span></div>
      {selectedTopic === correctTopic && topicChecked && <>
        <div className={styles.planGrid}>{example.blocks.slice(1).map((item, index) => <label key={item.label} className={styles.guidedField}><strong>{item.label}</strong><span>{item.purpose}</span><textarea rows={4} value={answers[index]} onChange={(event) => { setAnswers((current) => current.map((value, answerIndex) => answerIndex === index ? event.target.value : value)); setModelVisible(false); }} placeholder={`Write your ${item.label.toLowerCase()} here.`} /></label>)}</div>
        <div className={styles.workshopActions}><button type="button" onClick={() => setModelVisible(true)} disabled={!writingReady}><Eye size={17} /> Compare with the expert model</button></div>
        {modelVisible && <div className={styles.bodyModelReveal} aria-live="polite">
          <span>Expert comparison</span>
          <div className={styles.modelBlockGrid}>{example.blocks.slice(1).map((item) => <article key={item.label} className={styles[item.tone]}><strong>{item.label}</strong><p>{item.text}</p><small>{item.purpose}</small></article>)}</div>
          <div className={styles.completeParagraph}><strong>Complete model paragraph</strong><ColoredBodyParagraph blocks={example.blocks} /></div>
          <p className={styles.comparisonNote}>Your wording does not need to match the model. Check whether each sentence performs its labelled function and whether the full paragraph proves one controlling idea. This is explained feedback, not automated band scoring.</p>
        </div>}
      </>}
    </div>
  </div>;
}
