'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, Layers3, RotateCcw, XCircle } from 'lucide-react';
import {
  ALIGNMENT_ITEMS,
  ESSAY_TYPES,
  MISSING_BLOCK_ITEMS,
  ORDER_ITEM,
  RECOGNITION_ITEMS,
  REPAIR_ITEMS,
  type Choice,
  type ChoicePracticeItem,
  type EssayTypeId,
} from './introduction-data';
import styles from './page.module.css';

const LEVELS = [
  { title: 'Identify the function', mode: 'choice' },
  { title: 'Choose an aligned thesis', mode: 'choice' },
  { title: 'Repair the mismatch', mode: 'choice' },
  { title: 'Assemble the blocks', mode: 'order' },
  { title: 'Complete the introduction', mode: 'choice' },
  { title: 'Write one block', mode: 'sentence' },
  { title: 'Build an introduction', mode: 'introduction' },
  { title: 'Transfer to a timed essay', mode: 'essay' },
] as const;

const CHOICE_BANKS: ChoicePracticeItem[][] = [RECOGNITION_ITEMS, ALIGNMENT_ITEMS, REPAIR_ITEMS, [], MISSING_BLOCK_ITEMS];

function rotateOptions(options: Choice[], seed: number) {
  const shift = seed % options.length;
  return [...options.slice(shift), ...options.slice(0, shift)];
}

function countWords(value: string) {
  return value.trim() ? value.trim().split(/\s+/).length : 0;
}

function typeLabel(id: EssayTypeId) {
  return ESSAY_TYPES.find((item) => item.id === id)?.shortLabel ?? id;
}

function ChoiceLevel({
  level,
  item,
  itemIndex,
  onNext,
}: {
  level: number;
  item: ChoicePracticeItem;
  itemIndex: number;
  onNext: () => void;
}) {
  const options = useMemo(() => rotateOptions(item.options, level * 3 + itemIndex + 1), [item.options, itemIndex, level]);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const selectedOption = selected === null ? null : options[selected];

  useEffect(() => {
    setSelected(null);
    setChecked(false);
  }, [item]);

  return (
    <div className={styles.exerciseBody}>
      <span className={styles.typeTag}>{typeLabel(item.essayType)}</span>
      <p className={styles.exercisePrompt}>{item.prompt}</p>
      <p className={styles.exerciseInstruction}>{item.instruction}</p>
      <div className={styles.optionGrid} role="radiogroup" aria-label="Answer choices">
        {options.map((option, index) => {
          const state = checked && selected === index ? (option.correct ? 'correct' : 'incorrect') : selected === index ? 'selected' : '';
          return (
            <button
              key={option.text}
              type="button"
              role="radio"
              aria-checked={selected === index}
              className={`${styles.option} ${state ? styles[state] : ''}`}
              onClick={() => !checked && setSelected(index)}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {option.text}
            </button>
          );
        })}
      </div>
      {checked && selectedOption && (
        <div className={`${styles.feedback} ${selectedOption.correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
          {selectedOption.correct ? <CheckCircle2 size={20} aria-hidden="true" /> : <XCircle size={20} aria-hidden="true" />}
          <div>
            <strong>{selectedOption.correct ? 'Correct reasoning' : `Review the ${selectedOption.issue} issue`}</strong>
            <p>{selectedOption.feedback}</p>
            {!selectedOption.correct && <p>Compare your choice with the option that answers every instruction in the prompt.</p>}
          </div>
        </div>
      )}
      <div className={styles.exerciseActions}>
        {!checked ? (
          <button type="button" className="btn btn-sm" disabled={selected === null} onClick={() => setChecked(true)}>
            Check answer
          </button>
        ) : (
          <button type="button" className="btn btn-sm" onClick={onNext}>
            Continue <ArrowRight size={16} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}

function OrderLevel({ onNext }: { onNext: () => void }) {
  const shuffled = useMemo(() => [ORDER_ITEM.blocks[2], ORDER_ITEM.blocks[0], ORDER_ITEM.blocks[1]], []);
  const [chosen, setChosen] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const correct = chosen.join('|') === ORDER_ITEM.correctOrder.map((index) => ORDER_ITEM.blocks[index]).join('|');

  function addBlock(block: string) {
    if (!chosen.includes(block) && !checked) setChosen((current) => [...current, block]);
  }

  return (
    <div className={styles.exerciseBody}>
      <span className={styles.typeTag}>{typeLabel(ORDER_ITEM.essayType)}</span>
      <p className={styles.exercisePrompt}>{ORDER_ITEM.prompt}</p>
      <p className={styles.exerciseInstruction}>{ORDER_ITEM.instruction}</p>
      <div className={styles.assembly} aria-label="Your introduction order">
        {chosen.length === 0 && <p>Select the three blocks in writing order.</p>}
        {chosen.map((block, index) => (
          <div key={block} className={styles.assemblyBlock}><span>{index + 1}</span>{block}</div>
        ))}
      </div>
      <div className={styles.blockChoices}>
        {shuffled.map((block) => (
          <button key={block} type="button" disabled={chosen.includes(block) || checked} onClick={() => addBlock(block)}>
            {block}
          </button>
        ))}
      </div>
      {checked && (
        <div className={`${styles.feedback} ${correct ? styles.feedbackCorrect : styles.feedbackIncorrect}`} aria-live="polite">
          {correct ? <CheckCircle2 size={20} aria-hidden="true" /> : <XCircle size={20} aria-hidden="true" />}
          <div><strong>{correct ? 'The logic is complete' : 'The blocks need a different sequence'}</strong><p>{ORDER_ITEM.explanation}</p></div>
        </div>
      )}
      <div className={styles.exerciseActions}>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setChosen([]); setChecked(false); }}>
          <RotateCcw size={15} aria-hidden="true" /> Reset
        </button>
        {!checked ? (
          <button type="button" className="btn btn-sm" disabled={chosen.length !== 3} onClick={() => setChecked(true)}>Check order</button>
        ) : (
          <button type="button" className="btn btn-sm" onClick={onNext}>Continue <ArrowRight size={16} aria-hidden="true" /></button>
        )}
      </div>
    </div>
  );
}

function ProductionLevel({ kind, essayType, onNext }: { kind: 'sentence' | 'introduction'; essayType: EssayTypeId; onNext: () => void }) {
  const lesson = ESSAY_TYPES.find((item) => item.id === essayType) ?? ESSAY_TYPES[0];
  const example = lesson.examples[kind === 'sentence' ? 1 : 2];
  const [value, setValue] = useState('');
  const [reviewed, setReviewed] = useState(false);
  const words = countWords(value);
  const checks = kind === 'sentence'
    ? [
        { label: 'The sentence answers the instruction rather than announcing the essay.', pass: words >= 12 },
        { label: 'It avoids memorised openings such as “Nowadays” and “In today’s world”.', pass: !/^\s*(nowadays|in today'?s world)/i.test(value) },
        { label: 'It contains a controlling verb or stance marker.', pass: /\b(agree|disagree|believe|argue|results?|causes?|requires?|outweigh|driven|should|can)\b/i.test(value) },
      ]
    : [
        { label: 'The introduction has enough substance to establish topic and thesis.', pass: words >= 28 },
        { label: 'It stays within the WeLearn practice target of about 40–70 words.', pass: words >= 40 && words <= 70 },
        { label: 'It avoids a memorised opening.', pass: !/^\s*(nowadays|in today'?s world|it is a fact)/i.test(value) },
        { label: 'It does not merely say “this essay will discuss”.', pass: !/this essay will discuss/i.test(value) },
      ];

  return (
    <div className={styles.exerciseBody}>
      <span className={styles.typeTag}>{lesson.shortLabel}</span>
      <p className={styles.exercisePrompt}>{example.prompt}</p>
      <p className={styles.exerciseInstruction}>
        {kind === 'sentence' ? 'Write one thesis sentence that gives the essay a clear route.' : 'Write a complete introduction using only the blocks this prompt needs.'}
      </p>
      <textarea
        className={styles.writer}
        value={value}
        onChange={(event) => { setValue(event.target.value); setReviewed(false); }}
        rows={kind === 'sentence' ? 4 : 6}
        placeholder={kind === 'sentence' ? 'Write one controlling sentence...' : 'Paraphrase the topic, then write the thesis...'}
      />
      <div className={styles.writerMeta}><span>{words} words</span><span>WeLearn self-review, not automated band scoring</span></div>
      {reviewed && (
        <div className={styles.checkList} aria-live="polite">
          {checks.map((check) => (
            <p key={check.label} className={check.pass ? styles.pass : styles.fail}>
              {check.pass ? <CheckCircle2 size={17} aria-hidden="true" /> : <XCircle size={17} aria-hidden="true" />}{check.label}
            </p>
          ))}
          <div className={styles.modelReveal}>
            <strong>Compare the logic, not the wording</strong>
            <p>{example.blocks.map((block) => block.text).join(' ')}</p>
            <p>{example.whyItWorks.join(' ')}</p>
          </div>
        </div>
      )}
      <div className={styles.exerciseActions}>
        <button type="button" className="btn btn-sm" disabled={words < 8} onClick={() => setReviewed(true)}>Run self-review</button>
        {reviewed && <button type="button" className="btn btn-sm" onClick={onNext}>Continue <ArrowRight size={16} aria-hidden="true" /></button>}
      </div>
    </div>
  );
}

function TimedEssayLevel({ essayType }: { essayType: EssayTypeId }) {
  const lesson = ESSAY_TYPES.find((item) => item.id === essayType) ?? ESSAY_TYPES[0];
  const prompt = lesson.examples[4].prompt;
  const [seconds, setSeconds] = useState(40 * 60);
  const [running, setRunning] = useState(false);
  const [essay, setEssay] = useState('');
  const [checks, setChecks] = useState<string[]>([]);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const timer = window.setInterval(() => setSeconds((current) => current - 1), 1000);
    return () => window.clearInterval(timer);
  }, [running, seconds]);

  const words = countWords(essay);
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainder = (seconds % 60).toString().padStart(2, '0');
  const reviewItems = ['I answered every instruction.', 'My introduction contains an aligned thesis.', 'Each body paragraph develops one controlling idea.', 'My conclusion matches the position.', 'I checked grammar, spelling and references.'];

  return (
    <div className={styles.exerciseBody}>
      <div className={styles.timerRow}>
        <span className={styles.typeTag}>{lesson.shortLabel}</span>
        <strong><Clock3 size={18} aria-hidden="true" /> {minutes}:{remainder}</strong>
      </div>
      <p className={styles.exercisePrompt}>{prompt}</p>
      <p className={styles.exerciseInstruction}>Write a complete connected essay of at least 250 words. The 40-minute timer is a practice aid based on IELTS guidance.</p>
      <textarea className={`${styles.writer} ${styles.essayWriter}`} value={essay} onChange={(event) => setEssay(event.target.value)} rows={16} placeholder="Plan briefly, then write your complete response..." />
      <div className={styles.writerMeta}><span className={words >= 250 ? styles.wordReady : ''}>{words} / 250 minimum words</span><span>Task 2 practice</span></div>
      <div className={styles.reviewGrid}>
        {reviewItems.map((item) => (
          <label key={item} className={styles.reviewCheck}>
            <input type="checkbox" checked={checks.includes(item)} onChange={() => setChecks((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item])} />
            <span>{item}</span>
          </label>
        ))}
      </div>
      <div className={styles.exerciseActions}>
        <button type="button" className="btn btn-sm" onClick={() => setRunning((current) => !current)}>{running ? 'Pause timer' : seconds === 40 * 60 ? 'Start timer' : 'Resume timer'}</button>
        <button type="button" className="btn btn-ghost btn-sm" onClick={() => { setRunning(false); setSeconds(40 * 60); }}>Reset timer</button>
      </div>
      <p className={styles.orientationNote}>This tool supports practice and self-review. It does not estimate an official IELTS band score.</p>
    </div>
  );
}

export default function IntroductionPracticeEngine({ essayType }: { essayType: EssayTypeId }) {
  const [level, setLevel] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [scores, setScores] = useState<number[]>(() => LEVELS.map(() => 0));
  const bank = CHOICE_BANKS[level] ?? [];
  const item = bank[itemIndex];

  function advance() {
    setScores((current) => current.map((score, index) => index === level ? Math.max(score, 1) : score));
    if (bank.length > 0 && itemIndex < bank.length - 1) {
      setItemIndex((current) => current + 1);
      return;
    }
    setLevel((current) => Math.min(current + 1, LEVELS.length - 1));
    setItemIndex(0);
  }

  return (
    <section className={styles.practiceSection} aria-labelledby="progressive-practice-heading">
      <div className={styles.sectionHeading}>
        <span className={styles.kicker}>WeLearn progressive engine</span>
        <h2 id="progressive-practice-heading">Practise the introduction by level</h2>
        <p>Move from recognising sentence functions to transferring the introduction into a complete timed response.</p>
      </div>
      <div className={styles.levelTabs} role="tablist" aria-label="Practice levels">
        {LEVELS.map((entry, index) => (
          <button
            key={entry.title}
            type="button"
            role="tab"
            aria-selected={level === index}
            className={level === index ? styles.levelActive : ''}
            onClick={() => { setLevel(index); setItemIndex(0); }}
          >
            <span>{index + 1}</span>
            <strong>{entry.title}</strong>
            <small>{scores[index] ? 'Started' : 'Ready'}</small>
          </button>
        ))}
      </div>
      <div className={styles.enginePanel} role="tabpanel">
        <div className={styles.engineHeader}>
          <div><Layers3 size={19} aria-hidden="true" /><span>Level {level + 1}</span></div>
          <span>{bank.length > 0 ? `Exercise ${itemIndex + 1} of ${bank.length}` : LEVELS[level].title}</span>
        </div>
        {level <= 2 && item && <ChoiceLevel key={`${level}-${itemIndex}`} level={level} item={item} itemIndex={itemIndex} onNext={advance} />}
        {level === 3 && <OrderLevel onNext={advance} />}
        {level === 4 && item && <ChoiceLevel key={`${level}-${itemIndex}`} level={level} item={item} itemIndex={itemIndex} onNext={advance} />}
        {level === 5 && <ProductionLevel kind="sentence" essayType={essayType} onNext={advance} />}
        {level === 6 && <ProductionLevel kind="introduction" essayType={essayType} onNext={advance} />}
        {level === 7 && <TimedEssayLevel essayType={essayType} />}
      </div>
    </section>
  );
}
