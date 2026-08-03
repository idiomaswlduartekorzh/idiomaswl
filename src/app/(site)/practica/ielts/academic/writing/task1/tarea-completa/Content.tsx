'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Task1ApprovedMapVisual from '../Task1ApprovedMapVisual';
import Task1ApprovedProcessVisual from '../Task1ApprovedProcessVisual';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';
type Phase = 'intro' | 'writing' | 'review';

type ContentProps = {
  initialPhase?: Phase;
  initialTaskId?: string;
};

type FullTask = {
  id: string;
  label: string;
  type: VisualType;
  variant: number;
  prompt: string;
  dataNotes: string;
  overview: string;
  model: string;
};

const SUPPORTED_FULL_TASKS: FullTask[] = [
  {
    id: 'internet-access', label: 'Line graph: internet access', type: 'line', variant: 0,
    prompt: 'The line graph below shows the percentage of the population with internet access in three regions between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Region A: 30%, 48%, 61%, 77%, 88%. Region B: 12%, 26%, 45%, 63%, 79%. Region C: 6%, 10%, 22%, 38%, 57%.',
    overview: 'Overall, access rose in all three regions. Region A remained the highest throughout, while Region C stayed lowest despite a substantial increase.',
    model: `The line graph illustrates the proportion of people with internet access in three regions from 2000 to 2020.

Overall, internet use increased markedly in every region. Region A consistently recorded the highest figures, whereas Region C remained the least connected area throughout the period.

In Region A, access rose from 30% in 2000 to 48% five years later and then continued to climb, reaching 88% in 2020. Region B followed a similar upward pattern, although its figures were lower at every point. Its rate grew from 12% to 45% during the first decade before reaching 79% at the end.

Region C started from only 6%, and growth was initially modest, with the figure standing at 10% in 2005. However, access then increased more rapidly, rising to 22% in 2010 and 57% by 2020. Despite this considerable progress, Region C finished 31 percentage points below Region A.`
  },
  {
    id: 'household-expenditure', label: 'Bar chart: household expenditure', type: 'bar', variant: 0,
    prompt: 'The bar chart below shows the percentage of household expenditure spent on five categories in 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Housing 32%; Leisure 21%; Food 18%; Transport 16%; Health 13%.',
    overview: 'Overall, housing accounted for the greatest share of expenditure, while health represented the smallest proportion.',
    model: `The bar chart compares the proportions of household expenditure allocated to five categories in 2024.

Overall, housing was by far the largest expense, whereas health received the smallest share. The other three categories accounted for broadly similar proportions.

At 32%, spending on housing was substantially higher than the figure for any other item. Leisure was the second-largest category, representing 21% of total expenditure. Food followed at 18%, only three percentage points lower than leisure.

Transport accounted for a slightly smaller proportion, at 16%. By contrast, households spent the least on health, which made up 13% of expenditure. The gap between the two smallest categories was therefore modest, at just three percentage points, while the difference between housing and health was much more pronounced, at 19 points.`
  },
  {
    id: 'household-spending', label: 'Pie charts: household spending', type: 'pie', variant: 1,
    prompt: 'The pie charts below show household spending by category in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: '2000: Housing 22%, Food 31%, Transport 17%, Other 30%. 2020: Housing 31%, Food 24%, Transport 19%, Other 26%.',
    overview: 'Overall, food and other spending fell, while housing became the largest category by 2020. Transport changed only slightly.',
    model: `The pie charts compare the distribution of household spending among four categories in 2000 and 2020.

Overall, the share devoted to housing increased considerably and became the largest category in 2020. In contrast, food and other expenditure declined, while transport changed very little.

In 2000, food represented the biggest proportion of the budget, at 31%, closely followed by other items at 30%. Housing accounted for 22%, while transport was the smallest category, at 17%.

By 2020, housing had risen by nine percentage points to 31%, overtaking all other categories. Food fell to 24%, a decrease of seven points, and the proportion spent on other items also declined, from 30% to 26%. Transport was the only relatively stable category: its share edged up from 17% to 19% over the period.`
  },
  {
    id: 'recycling-rates', label: 'Table: recycling rates', type: 'table', variant: 4,
    prompt: 'The table below shows household recycling rates for four materials in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Paper: 52%, 64%, 73%. Glass: 38%, 49%, 61%. Plastic: 18%, 31%, 46%. Metal: 44%, 55%, 67%.',
    overview: 'Overall, recycling rose for every material. Paper had the highest rate in all years, while plastic remained lowest despite the fastest proportional growth.',
    model: `The table compares the percentages of four household materials recycled in 2010, 2015 and 2020.

Overall, recycling rates rose for all materials over the period. Paper was recycled most widely in every year, whereas plastic consistently had the lowest figure.

Paper recycling increased from 52% in 2010 to 64% in 2015, before reaching 73% in 2020. Metal followed a similar pattern, climbing from 44% to 67%. Glass also rose steadily, from 38% at the beginning to 61% ten years later.

Plastic recorded the lowest rates throughout, although it showed a notable improvement. Its figure grew from only 18% in 2010 to 31% in 2015 and then to 46% in 2020. This was a rise of 28 percentage points, which was larger than the increases for paper and metal, but plastic still finished well below the other materials.`
  },
  {
    id: 'bottle-recycling', label: 'Process diagram: bottle recycling', type: 'process', variant: 0,
    prompt: 'The diagram below shows how used plastic bottles are recycled into new products. Summarise the information by selecting and reporting the main features.',
    dataNotes: 'Collection → sorting → washing → melting into pellets → manufacturing new products. The process is linear and contains five main stages.',
    overview: 'Overall, used bottles pass through a linear five-stage process, beginning with collection and ending with the manufacture of new products.',
    model: `The diagram illustrates the process used to recycle plastic bottles into new products.

Overall, this is a linear, five-stage procedure. Used bottles are collected and prepared before the material is melted and transformed into new items.

First, discarded bottles are placed in public recycling bins and taken to a recycling centre. There, they are sorted so that plastic can be separated from unsuitable materials. The selected bottles are then washed thoroughly.

After cleaning, the plastic is broken into small pieces and heated. This melting stage produces plastic pellets, which form the raw material for the final stage. Finally, the pellets are manufactured into new products, including bottles, containers and furniture. Thus, waste plastic is converted into usable goods through a sequence of collection, treatment and remanufacture.`
  },
  {
    id: 'town-centre', label: 'Maps: town-centre changes', type: 'map', variant: 0,
    prompt: 'The maps below show changes in a town centre between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: '1990: park, factory, small road and car park. 2020: housing estate replaces the park; school replaces the factory; a dual carriageway replaces the small road; a shopping centre replaces the car park.',
    overview: 'Overall, the town centre was comprehensively redeveloped: its original park, factory and car park were replaced by residential, educational and commercial facilities, while the road system was enlarged.',
    model: `The maps compare the layout of a town centre in 1990 and 2020.

Overall, the area underwent substantial redevelopment. Open land and industrial facilities were replaced by housing, a school and a shopping centre, while the road network was upgraded.

In 1990, a park occupied the north-west section of the town centre, whereas a factory stood opposite it on the north-east side. A small road ran across the southern half of the area, with a car park located to its south-east.

By 2020, the park had been converted into a housing estate and the former factory site had become a school. The small road was widened into a dual carriageway, improving access across the centre. In addition, the car park was removed and replaced by a shopping centre. These changes indicate a clear shift from a relatively open and industrial area towards residential, educational and commercial uses.`
  },
];

const RUBRIC = [
  ['Task achievement', 'Have you selected key features and supported them with accurate evidence?'],
  ['Coherence and cohesion', 'Does the response move clearly from introduction to overview and grouped detail?'],
  ['Lexical resource', 'Is your visual-specific vocabulary accurate rather than exaggerated or repetitive?'],
  ['Grammatical range and accuracy', 'Are comparisons, tense and sentence structures controlled?'],
] as const;

const LEGO_STEPS = [
  ['Introduction', 'Paraphrase the input without adding data.'],
  ['Overview', 'State the big picture before detailed figures.'],
  ['Body 1', 'Group the first meaningful pattern or area.'],
  ['Body 2', 'Add the second group, contrast or remaining change.'],
  ['Final check', 'Verify every figure, connection and sentence.'],
] as const;

function TaskVisual({ task }: { task: FullTask }) {
  if (task.type === 'bar') return <IELTSBarChartVisual variant={task.variant} />;
  if (task.type === 'pie') return <IELTSPieChartVisual variant={task.variant} />;
  if (task.type === 'table') return <IELTSTableVisual variant={task.variant} />;
  if (task.type === 'process') return <Task1ApprovedProcessVisual variant={task.variant} />;
  if (task.type === 'map') return <Task1ApprovedMapVisual variant={task.variant} />;
  return <IELTSLineGraphVisual variant={task.variant} />;
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
}

export default function TareaCompletaPage({ initialPhase = 'intro', initialTaskId }: ContentProps) {
  const initialTaskIndex = Math.max(0, SUPPORTED_FULL_TASKS.findIndex((item) => item.id === initialTaskId));
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [taskIndex, setTaskIndex] = useState(initialTaskIndex);
  const [text, setText] = useState('');
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [timerActive, setTimerActive] = useState(initialPhase === 'writing');
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [showModel, setShowModel] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const task = SUPPORTED_FULL_TASKS[taskIndex];
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const completeReview = RUBRIC.every(([criterion]) => checks[criterion]);

  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((value) => {
        if (value <= 1) {
          setTimerActive(false);
          setPhase('review');
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerActive]);

  function chooseTask(index: number) {
    setTaskIndex(index);
    setText('');
    setChecks({});
    setShowModel(false);
    setTimeLeft(20 * 60);
  }

  function start() {
    setTimerActive(true);
    setPhase('writing');
  }

  function submit() {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimerActive(false);
    setPhase('review');
  }

  function reset() {
    setPhase('intro');
    setText('');
    setChecks({});
    setShowModel(false);
    setTimeLeft(20 * 60);
  }

  const timerColor = timeLeft < 120 ? '#dc2626' : timeLeft < 300 ? '#d97706' : '#059669';

  if (phase === 'intro') {
    return <section className="wl-section"><div className="wrap"><div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm">← Task 1</Link>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Complete task</span>
      </div>
      <p className="eyebrow"><span className="ink-line" />Complete task and final review</p>
      <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0 0.55rem' }}>Timed IELTS Academic Task 1 practice</h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.65, marginBottom: '1.25rem' }}>Choose one fully paired visual task. Every prompt, visual, data reminder, overview and model response belongs to the same task.</p>
      <Task1OfficialReviewBlock focus="Integrate an introduction, overview, selected data, comparisons and a final review under time pressure." officialFormat="IELTS Academic Writing Task 1 requires at least 150 words in about 20 minutes. IELTS does not prescribe paragraph labels or fixed paragraph lengths." welearnStrategy="Use a four-paragraph WeLearn plan: a concise introduction, an overview, and two grouped detail paragraphs. Add a third detail paragraph only when the visual genuinely needs it." answerCheck="This teaching experience does not produce an official IELTS score; use its checklist and model response for learning." />
      <Task1ChartTypeGuide />
      <section aria-labelledby="timed-task-bank" style={{ margin: '1.5rem 0' }}>
        <p className="eyebrow" style={{ marginBottom: '0.35rem' }}>Practice bank</p>
        <h2 id="timed-task-bank" style={{ fontSize: '1.2rem', margin: '0 0 0.8rem' }}>Choose a complete timed task</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 1fr))', gap: '0.7rem' }}>
          {SUPPORTED_FULL_TASKS.map((item, index) => (
            <article key={item.id} style={{ padding: '0.9rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)', display: 'grid', gap: '0.55rem' }}>
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: '#0f3d8c', fontSize: '0.76rem' }}>TASK {String(index + 1).padStart(2, '0')} · {item.type.toUpperCase()}</span>
              <strong style={{ lineHeight: 1.35 }}>{item.label.replace(/^.*?: /, '')}</strong>
              <Link href={`/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=${item.id}`} className="btn btn-sm" style={{ justifySelf: 'start' }}>Choose task →</Link>
            </article>
          ))}
        </div>
      </section>
      <div style={{ padding: '1.1rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)', marginBottom: '1.25rem' }}>
        <label htmlFor="full-task-select" style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, color: '#0f3d8c', marginBottom: '0.5rem' }}>PREVIEW A SUPPORTED VISUAL TASK</label>
        <select id="full-task-select" value={taskIndex} onChange={(event) => chooseTask(Number(event.target.value))} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)' }}>
          {SUPPORTED_FULL_TASKS.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.label}</option>)}
        </select>
      </div>
      <div style={{ padding: '0.75rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)', marginBottom: '1rem' }}><TaskVisual task={task} /></div>
      <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}><p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Task prompt</p><p style={{ margin: 0, lineHeight: 1.7 }}>{task.prompt}</p></div>
      <div style={{ padding: '0.9rem 1rem', borderRadius: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.24)', marginBottom: '1rem' }}><strong style={{ color: '#b45309' }}>Data check:</strong> <span style={{ lineHeight: 1.6 }}>{task.dataNotes}</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>{LEGO_STEPS.map(([part, action]) => <article key={part} style={{ padding: '0.8rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)' }}><strong style={{ display: 'block', fontSize: '0.86rem' }}>{part}</strong><span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.3rem', lineHeight: 1.45 }}>{action}</span></article>)}</div>
      <div style={{ padding: '0.9rem 1rem', borderRadius: 8, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.22)', marginBottom: '1.35rem' }}><strong style={{ color: '#047857' }}>Model overview:</strong> <span style={{ lineHeight: 1.6 }}>{task.overview}</span></div>
      <Link className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem', textAlign: 'center' }} href={`/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=${task.id}`}>Open this writing task →</Link>
    </div></div></section>;
  }

  if (phase === 'writing') {
    return <section className="wl-section"><div className="wrap"><div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <Link href="/practica/ielts/academic/writing/task1/tarea-completa" className="btn btn-ghost btn-sm" style={{ marginBottom: '0.75rem' }}>← Practice bank</Link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', position: 'sticky', top: '4.5rem', zIndex: 10 }}><strong style={{ fontFamily: 'var(--mono)', fontSize: '1.2rem', color: timerColor }}>⏱ {formatTime(timeLeft)}</strong><span style={{ fontFamily: 'var(--mono)', color: wordCount >= 150 ? '#047857' : '#b45309' }}>{wordCount} / 150+ words</span><button className="btn btn-sm" onClick={submit}>Review response →</button></div>
      <div style={{ padding: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)', marginBottom: '0.75rem' }}><TaskVisual task={task} /></div>
      <div className="wl-card" style={{ padding: '1rem', borderLeft: '3px solid #0f3d8c', marginBottom: '0.75rem', lineHeight: 1.65 }}>{task.prompt}</div>
      <div style={{ padding: '0.7rem 0.9rem', borderRadius: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.24)', marginBottom: '0.75rem', fontSize: '0.83rem', lineHeight: 1.55 }}><strong>Data reminder:</strong> {task.dataNotes}</div>
      <textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={'Introduction: paraphrase the task.\n\nOverview: state the big picture.\n\nBody 1 and Body 2: group the most meaningful details.'} rows={20} style={{ width: '100%', boxSizing: 'border-box', padding: '1rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit', lineHeight: 1.75, resize: 'vertical' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>{wordCount < 150 ? `${150 - wordCount} words to the official minimum` : 'Official minimum reached'}</span><button className="btn btn-sm" onClick={submit}>Submit for review →</button></div>
    </div></div></section>;
  }

  return <section className="wl-section"><div className="wrap"><div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
    <p className="eyebrow"><span className="ink-line" />Final review</p><h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0 0.55rem' }}>Review your complete response</h1>
    <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>Use this as a self-review, not an official score. Writing and speaking require qualified human assessment for formal feedback.</p>
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0', maxHeight: 220, overflowY: 'auto' }}><strong>Your response ({wordCount} words)</strong><p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>{text || 'No response yet.'}</p></div>
    {RUBRIC.map(([criterion, question]) => <label key={criterion} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.9rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: checks[criterion] ? 'rgba(5,150,105,0.07)' : 'var(--bg-2)', marginBottom: '0.65rem', cursor: 'pointer' }}><input type="checkbox" checked={Boolean(checks[criterion])} onChange={(event) => setChecks((value) => ({ ...value, [criterion]: event.target.checked }))} style={{ marginTop: 4 }} /><span><strong>{criterion}</strong><span style={{ display: 'block', marginTop: '0.2rem', color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.88rem' }}>{question}</span></span></label>)}
    {completeReview && <div style={{ padding: '1rem', borderRadius: 8, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.22)', margin: '1rem 0' }}><strong style={{ color: '#047857' }}>Review complete.</strong><p style={{ margin: '0.35rem 0 0', lineHeight: 1.55 }}>Compare your choices with the original model response, then return to the specific sub-skill that needs more work.</p></div>}
    <button className="btn btn-sm" onClick={() => setShowModel((value) => !value)}>{showModel ? 'Hide WeLearn model response' : 'View WeLearn model response'}</button>
    {showModel && <div className="wl-card" style={{ padding: '1.2rem', borderLeft: '3px solid #047857', marginTop: '1rem' }}><p className="eyebrow" style={{ margin: '0 0 0.5rem', color: '#047857' }}>WeLearn model response</p><p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>{task.model}</p></div>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1.25rem' }}><button className="btn btn-sm" onClick={reset}>Try another task</button><Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/overview">Review overview</Link><Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/body-1">Review Body 1</Link><Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/body-2">Review Body 2</Link></div>
  </div></div></section>;
}
