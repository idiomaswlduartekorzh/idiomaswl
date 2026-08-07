'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import ColoredBodyParagraph from '../body-1/ColoredBodyParagraph';
import type { ConclusionExample } from './conclusion-data';
import styles from '../introduccion/page.module.css';

function rotate<T>(items: T[], amount: number) {
  const shift = amount % items.length;
  return [...items.slice(shift), ...items.slice(0, shift)];
}

export default function ConclusionWorkshop({ example, seed }: { example: ConclusionExample; seed: number }) {
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState(() => example.blocks.map(() => ''));
  const [showModel, setShowModel] = useState(false);
  const correct = example.blocks[0].text;
  const options = useMemo(() => rotate([
    correct,
    'In conclusion, this essay has discussed several interesting points and both sides have advantages.',
    'In the future, governments will probably discover a completely new way to solve this issue.',
  ], seed), [correct, seed]);
  const ready = writing.every((value) => value.trim().split(/\s+/).filter(Boolean).length >= 8);

  function reset() { setSelected(''); setChecked(false); setWriting(example.blocks.map(() => '')); setShowModel(false); }

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}><div><span>Guided conclusion workshop</span><h3>You close it before WeLearn reveals it</h3></div><button type="button" className={styles.iconButton} onClick={reset} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button></div>
    <div className={styles.workshopStep}>
      <div className={styles.stepLabel}><strong>Step 1</strong><span>Choose the opening block that preserves the essay answer</span></div>
      <p className={styles.paragraphJob}><strong>Conclusion job:</strong> {example.conclusionJob}</p>
      <div className={styles.optionGrid}>{options.map((option, index) => <button key={option} type="button" className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === correct ? styles.correct : ''} ${checked && selected === option && option !== correct ? styles.incorrect : ''}`} onClick={() => { setSelected(option); setChecked(false); setShowModel(false); }}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>
      <div className={styles.workshopActions}><button type="button" onClick={() => setChecked(true)} disabled={!selected}><Eye size={17} /> Check the closing decision</button></div>
      {checked && <div className={`${styles.feedback} ${selected === correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite"><CheckCircle2 size={20} /><div><strong>{selected === correct ? 'Position preserved.' : 'The conclusion has drifted.'}</strong><p>{selected === correct ? 'This block restates the existing answer without copying the thesis.' : 'The alternative is vague, changes the answer or introduces a new prediction.'}</p></div></div>}
    </div>
    <div className={`${styles.workshopStep} ${selected !== correct || !checked ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}>{selected === correct && checked ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}<strong>Step 2</strong><span>Write the complete closing sequence</span></div>
      {selected === correct && checked && <><div className={styles.planGrid}>{example.blocks.map((block, index) => <label key={block.label} className={styles.guidedField}><strong>{block.label}</strong><span>{block.purpose}</span><textarea rows={4} value={writing[index]} onChange={(event) => { setWriting((current) => current.map((value, itemIndex) => itemIndex === index ? event.target.value : value)); setShowModel(false); }} placeholder={`Write your ${block.label.toLowerCase()} here.`} /></label>)}</div><div className={styles.workshopActions}><button type="button" onClick={() => setShowModel(true)} disabled={!ready}><Eye size={17} /> Compare with the expert model</button></div>{showModel && <div className={styles.bodyModelReveal}><span>Expert comparison</span><div className={styles.modelBlockGrid}>{example.blocks.map((block) => <article key={block.label} className={styles[block.tone]}><strong>{block.label}</strong><p>{block.text}</p><small>{block.purpose}</small></article>)}</div><div className={styles.completeParagraph}><strong>Complete model conclusion</strong><ColoredBodyParagraph blocks={example.blocks} /></div><p className={styles.comparisonNote}>Compare functions, not identical wording. The model introduces no new argument and does not claim an automated band score.</p></div>}</>}
    </div>
  </div>;
}
