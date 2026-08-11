'use client';

import { useMemo, useState } from 'react';
import { CheckCircle2, Eye, LockKeyhole, RotateCcw } from 'lucide-react';
import type { EssayTypeId } from '../introduccion/introduction-data';
import type { PromptAnalysisExample } from './prompt-analysis-data';
import styles from '../introduccion/page.module.css';

type MapField = 'topic' | 'instruction' | 'scope';
type PlanField = { id: string; label: string; hint: string };

const STOP_WORDS = new Set([
  'a', 'an', 'and', 'are', 'be', 'do', 'does', 'for', 'i', 'in', 'is', 'it', 'make', 'of', 'on', 'or', 'the', 'this', 'to', 'what', 'you',
]);

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
}

function meaningfulTokens(value: string) {
  return normalise(value).split(' ').filter((token) => token.length > 2 && !STOP_WORDS.has(token));
}

function isCloseMatch(answer: string, expected: string, field: MapField) {
  const cleanAnswer = normalise(answer);
  if (!cleanAnswer) return false;
  if (field === 'topic') return meaningfulTokens(expected).every((token) => cleanAnswer.includes(token));

  const alternatives = expected.split('/').map((item) => meaningfulTokens(item));
  return alternatives.some((tokens) => {
    if (tokens.length === 0) return false;
    const matches = tokens.filter((token) => cleanAnswer.includes(token)).length;
    return matches >= Math.max(1, Math.ceil(tokens.length * 0.45));
  });
}

/**
 * La pregunta que abre el paso 2, en inglés llano y distinta para cada familia.
 *
 * Decía «Which planning decision will control the essay?» para las cuatro familias que no
 * son opinión. Nadie sabe qué es una controlling planning decision, y las opciones eran
 * peores: en problema-solución salían «Follow the exact route: …» y «Recheck the requested
 * route», que no son dos planes entre los que elegir sino una orden y un regaño.
 */
function getDecisionQuestion(type: EssayTypeId) {
  if (type === 'opinion') return 'What is your position?';
  if (type === 'discussion') return 'Which view will you support?';
  if (type === 'problem-solution') return 'How will you split the two body paragraphs?';
  if (type === 'advantages-disadvantages') return 'Which side carries more weight?';
  return 'How will you answer the two questions?';
}

function getPositionOptions(type: EssayTypeId) {
  if (type === 'opinion') return ['Agree', 'Mostly agree', 'Mostly disagree', 'Disagree'];
  if (type === 'discussion') return ['View 1 is stronger', 'View 2 is stronger', 'Both matter, and I say why'];
  if (type === 'problem-solution') return ['Body 1 = the causes, Body 2 = the solutions', 'Body 1 = one problem and its solution, Body 2 = a second problem and its solution'];
  if (type === 'advantages-disadvantages') return ['The advantages weigh more', 'The disadvantages weigh more', 'They are evenly balanced, and I say why'];
  return ['Body 1 answers Question 1, Body 2 answers Question 2', 'Both paragraphs answer both questions through one shared idea'];
}

function getPlanFields(type: EssayTypeId, decision: string): PlanField[] {
  if (type === 'opinion') {
    const supportsAgreement = decision === 'Agree' || decision === 'Mostly agree';
    return [
      { id: 'reason-one', label: `Why do you ${supportsAgreement ? 'agree' : 'disagree'}?`, hint: 'Write one specific, developable reason.' },
      { id: 'other-side', label: `Why might reasonable people ${supportsAgreement ? 'disagree' : 'agree'}?`, hint: 'Identify the strongest opposing point, not a weak one.' },
      { id: 'response', label: 'How will you answer or limit that opposing point?', hint: 'Concede, rebut or define the condition that protects your position.' },
      { id: 'body-one', label: 'Body 1 controlling idea', hint: 'Give this paragraph one clear job.' },
      { id: 'body-two', label: 'Body 2 controlling idea', hint: 'Use a distinct second reason or a concession-and-rebuttal route.' },
    ];
  }
  if (type === 'discussion') return [
    { id: 'view-one', label: 'Why do people hold View 1?', hint: 'Represent this view fairly before evaluating it.' },
    { id: 'view-two', label: 'Why do people hold View 2?', hint: 'Give the second view equal analytical care.' },
    { id: 'judgement', label: 'What is your own judgement?', hint: 'State which view is stronger or explain your synthesis.' },
    { id: 'body-one', label: 'Body 1 route', hint: 'Plan the first view and its reasoning.' },
    { id: 'body-two', label: 'Body 2 route', hint: 'Plan the second view and connect it to your judgement.' },
  ];
  if (type === 'problem-solution') return [
    { id: 'diagnosis-one', label: 'First requested cause, problem or effect', hint: 'Follow the exact noun used in the prompt.' },
    { id: 'response-one', label: 'First corresponding response', hint: 'Show how this measure addresses the diagnosis.' },
    { id: 'diagnosis-two', label: 'Second requested cause, problem or effect', hint: 'Keep it distinct from the first.' },
    { id: 'response-two', label: 'Second corresponding response', hint: 'Name the responsible actor when the prompt specifies one.' },
    { id: 'body-route', label: 'Body 1 and Body 2 route', hint: 'Assign every requested action to a paragraph.' },
  ];
  if (type === 'advantages-disadvantages') return [
    { id: 'advantage', label: 'Strongest relevant advantage', hint: 'Choose one benefit that can be explained and exemplified.' },
    { id: 'disadvantage', label: 'Strongest relevant disadvantage', hint: 'Choose a comparable cost, not an unrelated list item.' },
    { id: 'comparison', label: 'Why does one side carry more weight?', hint: 'Compare significance, scale or long-term effect.' },
    { id: 'body-one', label: 'Body 1 route', hint: 'Plan the benefit side.' },
    { id: 'body-two', label: 'Body 2 route', hint: 'Plan the cost side and the final evaluation.' },
  ];
  return [
    { id: 'answer-one', label: 'Direct answer to Question 1', hint: 'Write the answer before adding reasons.' },
    { id: 'support-one', label: 'Reason or evidence for Answer 1', hint: 'Plan how Body 1 will develop it.' },
    { id: 'answer-two', label: 'Direct answer to Question 2', hint: 'Do not let the first question consume the essay.' },
    { id: 'support-two', label: 'Reason or evidence for Answer 2', hint: 'Plan how Body 2 will develop it.' },
    { id: 'connection', label: 'How are the two answers connected?', hint: 'Use a shared theme only if it keeps both answers explicit.' },
  ];
}

export default function PromptAnalysisWorkshop({ type, example }: { type: EssayTypeId; example: PromptAnalysisExample }) {
  const [mapAnswers, setMapAnswers] = useState<Record<MapField, string>>({ topic: '', instruction: '', scope: '' });
  const [mapChecked, setMapChecked] = useState(false);
  const [decision, setDecision] = useState('');
  const [planAnswers, setPlanAnswers] = useState<Record<string, string>>({});
  const [planChecked, setPlanChecked] = useState(false);

  const expected = { topic: example.map.topic, instruction: example.map.instruction, scope: example.map.scope };
  const mapReady = Object.values(mapAnswers).every((answer) => answer.trim().length > 0);
  const mapResults = useMemo(() => ({
    topic: isCloseMatch(mapAnswers.topic, expected.topic, 'topic'),
    instruction: isCloseMatch(mapAnswers.instruction, expected.instruction, 'instruction'),
    scope: isCloseMatch(mapAnswers.scope, expected.scope, 'scope'),
  }), [mapAnswers, expected.instruction, expected.scope, expected.topic]);
  const planFields = useMemo(() => getPlanFields(type, decision), [decision, type]);
  const planReady = decision.length > 0 && planFields.every((field) => (planAnswers[field.id] ?? '').trim().length >= 8);

  function updateMap(field: MapField, value: string) {
    setMapAnswers((current) => ({ ...current, [field]: value }));
    setMapChecked(false);
    setPlanChecked(false);
  }

  function reset() {
    setMapAnswers({ topic: '', instruction: '', scope: '' });
    setMapChecked(false);
    setDecision('');
    setPlanAnswers({});
    setPlanChecked(false);
  }

  return <div className={styles.guidedWorkshop}>
    <div className={styles.workshopHeader}>
      <div><span>Guided analysis workshop</span><h3>You decode it before WeLearn reveals it</h3></div>
      <button type="button" className={styles.iconButton} onClick={reset} title="Reset this workshop" aria-label="Reset this workshop"><RotateCcw size={18} /></button>
    </div>

    <div className={styles.workshopStep}>
      <div className={styles.stepLabel}><strong>Step 1</strong><span>Separate the prompt into three parts</span></div>
      <div className={styles.decodeGrid}>
        {([
          ['topic', 'Topic', 'What is the central issue?', 'Write the issue in 2–6 words.'],
          ['instruction', 'Instruction', 'Copy or paraphrase the action words.', 'Write the action the examiner requires.'],
          ['scope', 'Scope', 'What must your answer make visible?', 'Explain what the complete response must cover.'],
        ] as const).map(([field, label, help, placeholder]) => <label key={field} className={styles.guidedField}>
          <strong>{label}</strong><span>{help}</span>
          <textarea value={mapAnswers[field]} onChange={(event) => updateMap(field, event.target.value)} placeholder={placeholder} rows={3} spellCheck={false} autoCorrect="off" autoCapitalize="off" />
          {/* Esto compara palabras, no significado, así que dice exactamente eso. Antes
              ponía «Close match» y «Review the model wording», que suenan a veredicto sobre
              un texto libre: aquí no se puede dar ninguno. */}
          {mapChecked && <small className={mapResults[field] ? styles.matchGood : styles.matchReview}>{mapResults[field] ? 'Your wording overlaps the model. Read both and check the meaning is the same.' : 'Your wording is different from the model. Read both and decide whether you left something out.'}</small>}
        </label>)}
      </div>
      <div className={styles.workshopActions}><button type="button" onClick={() => setMapChecked(true)} disabled={!mapReady}><Eye size={17} /> Show me the model map</button></div>
      {!mapReady && <p className={styles.unlockHint}>Fill in all three boxes to see the model.</p>}
      {mapChecked && <div className={styles.modelMap} aria-live="polite">
        <div><span>Model topic</span><p>{expected.topic}</p></div>
        <div><span>Model instruction</span><p>{expected.instruction}</p></div>
        <div><span>Model scope</span><p>{expected.scope}</p></div>
        <p className={styles.comparisonNote}>Different wording is acceptable when it preserves the same meaning. This comparison checks alignment; it does not calculate an IELTS band.</p>
      </div>}
    </div>

    <div className={`${styles.workshopStep} ${!mapChecked ? styles.stepLocked : ''}`}>
      <div className={styles.stepLabel}>{mapChecked ? <CheckCircle2 size={20} /> : <LockKeyhole size={20} />}<strong>Step 2</strong><span>Decide your answer, then give each paragraph one job</span></div>
      {mapChecked && <>
        <fieldset className={styles.decisionFieldset}>
          <legend>{getDecisionQuestion(type)}</legend>
          <div className={styles.decisionOptions}>{getPositionOptions(type).map((option) => <label key={option} className={decision === option ? styles.decisionSelected : ''}><input type="radio" name={`decision-${example.title}`} value={option} checked={decision === option} onChange={() => { setDecision(option); setPlanAnswers({}); setPlanChecked(false); }} /><span>{option}</span></label>)}</div>
        </fieldset>
        {decision ? <div className={styles.planGrid}>{planFields.map((field) => <label key={field.id} className={styles.guidedField}><strong>{field.label}</strong><span>{field.hint}</span><textarea rows={3} value={planAnswers[field.id] ?? ''} onChange={(event) => { setPlanAnswers((current) => ({ ...current, [field.id]: event.target.value })); setPlanChecked(false); }} spellCheck={false} autoCorrect="off" autoCapitalize="off" /></label>)}</div> : <p className={styles.unlockHint}>Pick one of the answers above to open the boxes.</p>}
        <div className={styles.workshopActions}><button type="button" onClick={() => setPlanChecked(true)} disabled={!planReady}><CheckCircle2 size={17} /> Show me the model plan</button></div>
        {decision && !planReady && <p className={styles.unlockHint}>Write a few words in all {planFields.length} boxes to see the model plan.</p>}
        {planChecked && <div className={styles.planReveal} aria-live="polite"><span>Compare with the WeLearn model</span><div><strong>The thesis this prompt needs</strong><p>{example.map.position}</p></div><div><strong>What Body 1 does</strong><p>{example.map.bodyRoute[0]}</p></div><div><strong>What Body 2 does</strong><p>{example.map.bodyRoute[1]}</p></div><p>Keep your own ideas when they answer the same question clearly. Change only the boxes that drift away from the topic, from what the prompt requires, or from the answer you chose.</p></div>}
      </>}
    </div>
  </div>;
}
