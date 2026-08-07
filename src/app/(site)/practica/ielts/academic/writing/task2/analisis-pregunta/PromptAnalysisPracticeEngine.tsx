'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import { PROMPT_ANALYSIS_LESSONS } from './prompt-analysis-data';
import styles from '../introduccion/page.module.css';

const LEVELS = [
  { title: 'Identify the instruction', instruction: 'Choose the action that the prompt requires.' },
  { title: 'Select the complete checklist', instruction: 'Choose the checklist that covers every required part.' },
  { title: 'Detect the missing part', instruction: 'Find what the proposed plan fails to answer.' },
  { title: 'Assemble the prompt map', instruction: 'Put topic, instruction, scope, position and body route in order.' },
  { title: 'Choose the body route', instruction: 'Select the two paragraph jobs that match the prompt.' },
  { title: 'Write a one-sentence plan', instruction: 'Write one sentence that records your position and two paragraph jobs.' },
  { title: 'Build the complete plan', instruction: 'Write a compact introduction, Body 1, Body 2 and conclusion plan.' },
  { title: 'Transfer to a timed essay', instruction: 'Use five minutes to analyse and plan, then transfer the plan to a complete 250+ word response.' },
] as const;

function rotateOptions(items: string[], seed: number) {
  const shift = seed % items.length;
  return [...items.slice(shift), ...items.slice(0, shift)];
}

export default function PromptAnalysisPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0);
  const [selected, setSelected] = useState('');
  const [checked, setChecked] = useState(false);
  const [writing, setWriting] = useState('');
  const lesson = PROMPT_ANALYSIS_LESSONS.find((item) => item.id === essayType) ?? PROMPT_ANALYSIS_LESSONS[0];
  const example = lesson.examples[level % lesson.examples.length];
  const correct = level === 0 ? lesson.signal : level === 1 ? example.map.checklist.join(' ') : level === 2 ? example.map.scope : level === 4 ? example.map.bodyRoute.join(' ') : '';
  const options = useMemo(() => rotateOptions([
    correct,
    lesson.trap,
    'Describe the topic generally without answering the instruction.',
    'Use one memorised plan for every question family.',
  ].filter(Boolean), level + lesson.shortLabel.length), [correct, level, lesson.shortLabel.length, lesson.trap]);
  const writingLevel = level === 3 || level >= 5;
  const wordCount = writing.trim() ? writing.trim().split(/\s+/).length : 0;
  const requiredWords = level === 3 ? 20 : level === 5 ? 18 : level === 6 ? 45 : level === 7 ? 250 : 0;

  function reset(next = level) { setLevel(next); setSelected(''); setChecked(false); setWriting(''); }
  const isCorrect = writingLevel ? wordCount >= requiredWords : selected === correct;

  return <section className={styles.practiceSection} aria-labelledby="analysis-engine-heading">
    <div className={styles.sectionHeading}><p className={styles.kicker}>WeLearn progressive engine</p><h2 id="analysis-engine-heading">Practise prompt analysis by level</h2><p>Move from recognition to a complete plan. Feedback checks alignment and completion, not an automated IELTS band.</p></div>
    <div className={styles.levelTabs} aria-label="Practice levels">{LEVELS.map((item, index) => <button key={item.title} type="button" className={index === level ? styles.levelActive : ''} onClick={() => reset(index)}>{index + 1} · {item.title}</button>)}</div>
    <div className={styles.enginePanel}>
      <div className={styles.engineHeader}><div><h3>{LEVELS[level].title}</h3><p>{lesson.shortLabel} · Level {level + 1} of 8</p></div><span>{level + 1}/8</span></div>
      <div className={styles.exerciseBody}>
        <span className={styles.typeTag}>{lesson.shortLabel}</span>
        <p className={styles.exercisePrompt}>{example.prompt}</p>
        <p className={styles.exerciseInstruction}>{LEVELS[level].instruction}</p>
        {writingLevel ? <><textarea className={level === 7 ? styles.essayWriter : styles.writer} value={writing} onChange={(event) => setWriting(event.target.value)} placeholder={level === 3 ? 'Topic → Instruction → Scope → Position → Body route' : level === 7 ? 'Start with a five-minute plan, then write your complete essay here…' : 'Write your plan here…'} /><div className={styles.writerMeta}><span>{wordCount} words</span><span>{requiredWords}+ words required at this level</span></div></> : <div className={styles.optionGrid}>{options.map((option, index) => <button key={option} type="button" onClick={() => !checked && setSelected(option)} className={`${styles.option} ${selected === option ? styles.selected : ''} ${checked && option === correct ? styles.correct : ''} ${checked && selected === option && option !== correct ? styles.incorrect : ''}`}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>}
        {checked && <div className={`${styles.feedback} ${isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect}`}><Check size={20} /><div><strong>{isCorrect ? 'Aligned with the prompt' : 'Revise the missing block'}</strong><p>{isCorrect ? `The plan keeps the ${lesson.shortLabel.toLowerCase()} instruction, scope and paragraph route visible.` : `Check this requirement: ${example.map.checklist[0]}`}</p></div></div>}
        <div className={styles.exerciseActions}><button type="button" className="btn btn-ghost" onClick={() => reset()}><RotateCcw size={16} /> Reset</button><button type="button" className="btn btn-primary" disabled={writingLevel ? wordCount < requiredWords : !selected} onClick={() => checked ? reset(Math.min(7, level + 1)) : setChecked(true)}>{checked ? <>Next level <ArrowRight size={16} /></> : 'Check analysis'}</button></div>
      </div>
    </div>
  </section>;
}
