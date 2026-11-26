'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WritingFeedbackReview } from '@/components/writing/WritingFeedbackReview';
import Task1ApprovedMapVisual from '../Task1ApprovedMapVisual';
import Task1ApprovedProcessVisual from '../Task1ApprovedProcessVisual';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import { task1Visual } from '../task1-visual-bank';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map' | 'mixed';
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
  reviewHint: string;
  model: string;
};

/** En el examen se escribe a mano: ni corrector, ni autocompletado, ni mayúsculas automáticas. */
const noAssist = { spellCheck: false, autoCorrect: 'off', autoCapitalize: 'off', autoComplete: 'off' } as const;

const SUPPORTED_FULL_TASKS: FullTask[] = [
  {
    id: 'internet-access', label: 'Line graph: internet access', type: 'line', variant: 0,
    prompt: 'The line graph below shows the percentage of the population with internet access in three regions between 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Region A: 30%, 48%, 61%, 77%, 88%. Region B: 12%, 26%, 45%, 63%, 79%. Region C: 6%, 10%, 22%, 38%, 57%.',
    overview: 'Overall, access rose in all three regions. Region A remained the highest throughout, while Region C stayed lowest despite a substantial increase.',
    reviewHint: 'If you called A the fastest-growing region because it ended highest, check the starting points. A gained 58 percentage points and B gained 67. You can keep the sentence about A leading throughout and use a separate sentence for the size of the increase.',
    model: `The line graph illustrates the proportion of people with internet access in three regions from 2000 to 2020.

Overall, internet access increased markedly in every region. Region A consistently recorded the highest figures, whereas Region C remained the least connected area throughout the period.

In Region A, access rose from 30% in 2000 to 48% five years later and then continued to climb, reaching 88% in 2020. Region B followed a similar upward pattern, although its figures were lower at every point. Its rate grew from 12% to 45% during the first decade before reaching 79% at the end. The gap between the two regions therefore narrowed from 18 percentage points to nine.

Region C started from only 6%, and growth was initially modest, with the figure standing at 10% in 2005. However, access then increased more rapidly, rising to 22% in 2010 and 57% by 2020. Despite this considerable progress, Region C finished 31 percentage points below Region A.`
  },
  {
    id: 'household-expenditure', label: 'Bar chart: household expenditure', type: 'bar', variant: 0,
    prompt: 'The bar chart below shows the percentage of household expenditure spent on five categories in 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Housing 32%; Leisure 21%; Food 18%; Transport 16%; Health 13%.',
    overview: 'Overall, housing accounted for the greatest share of expenditure, while health represented the smallest proportion.',
    reviewHint: 'Read the date above the bars. This is one year, so “housing rose to 32%” introduces a change we cannot see. Try “housing accounted for 32% in 2024”. A word about change needs a second point in time.',
    model: `The bar chart compares the proportions of household expenditure allocated to five categories in 2024.

Overall, housing was by far the largest expense, whereas health received the smallest share. The other three categories accounted for broadly similar proportions.

At 32%, spending on housing was substantially higher than the figure for any other item. Leisure was the second-largest category, representing 21% of total expenditure. Together these two items made up just over half of the household budget. Food followed at 18%, only three percentage points lower than leisure. Taken together, the shares for food and transport were only two points higher than the share for housing alone.

Transport accounted for a slightly smaller proportion, at 16%. By contrast, households spent the least on health, which made up 13% of expenditure. The gap between the two smallest categories was therefore modest, at just three percentage points, while the difference between housing and health was much more pronounced, at 19 points.`
  },
  {
    id: 'household-spending', label: 'Pie charts: household spending', type: 'pie', variant: 1,
    prompt: 'The pie charts below show household spending by category in 2000 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: '2000: Housing 22%, Food 31%, Transport 17%, Other 30%. 2020: Housing 31%, Food 24%, Transport 19%, Other 26%.',
    overview: 'Overall, the shares for food and other items fell, while housing became the largest category by 2020. The share for transport changed only slightly.',
    reviewHint: 'If you wrote that households spent less money on food, look at the units. The slice fell from 31% to 24% of the budget. We would need the size of each budget to compare the amounts of money.',
    model: `The pie charts compare the distribution of household spending among four categories in 2000 and 2020.

Overall, the share devoted to housing increased considerably and became the largest category in 2020. In contrast, food and other expenditure declined, while transport changed very little.

In 2000, food represented the biggest proportion of the budget, at 31%, closely followed by other items at 30%. Housing accounted for 22%, while transport was the smallest category, at 17%. There was a gap of nine percentage points between the shares for food and housing. Two decades later that relationship had reversed, with housing seven points ahead of food.

By 2020, housing had risen by nine percentage points to 31%, overtaking all other categories. Food fell to 24%, a decrease of seven points, and the proportion spent on other items also declined, from 30% to 26%. Transport was the only relatively stable category: its share edged up from 17% to 19% over the period.`
  },
  {
    id: 'recycling-rates', label: 'Table: recycling rates', type: 'table', variant: 4,
    prompt: 'The table below shows household recycling rates for four materials in 2010, 2015 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'Paper: 52%, 64%, 73%. Glass: 38%, 49%, 61%. Plastic: 18%, 31%, 46%. Metal: 44%, 55%, 67%.',
    overview: 'Overall, recycling rose for every material. Paper had the highest rate in all years, while plastic remained lowest despite the fastest proportional growth.',
    reviewHint: 'Trace the plastic row before you describe it as the least successful. Its rate was lowest in every year, yet it rose by 28 percentage points, more than any other material. Choose a word that makes clear whether you mean the level or the gain.',
    model: `The table compares the percentages of four household materials recycled in 2010, 2015 and 2020.

Overall, recycling rates rose for all materials over the period. Paper was recycled most widely in every year, whereas plastic consistently had the lowest figure.

Paper recycling increased from 52% in 2010 to 64% in 2015, before reaching 73% in 2020. Metal followed a similar pattern, climbing from 44% to 67%. Glass also rose steadily, from 38% at the beginning to 61% ten years later. The gap between metal and glass was six percentage points at each of the three dates, even as both rates increased.

Plastic recorded the lowest rates throughout, although it showed a notable improvement. Its figure grew from only 18% in 2010 to 31% in 2015 and then to 46% in 2020. This was a rise of 28 percentage points, which was larger than the increases for paper and metal, but plastic still finished well below the other materials.`
  },
  {
    id: 'bottle-recycling', label: 'Process diagram: bottle recycling', type: 'process', variant: 0,
    prompt: 'The diagram below shows how used plastic bottles are recycled into new products. Summarise the information by selecting and reporting the main features.',
    dataNotes: 'Collection → sorting → washing → melting into pellets → manufacturing new products. The process is linear and contains five main stages.',
    overview: 'Overall, used bottles pass through a linear five-stage process, beginning with collection and ending with the manufacture of new products.',
    reviewHint: 'A new bottle is one possible product. A shirt and containers also appear at the end, and no arrow runs back to the bin. If your overview called this a cycle, follow the arrows again and name the input and the range of outputs.',
    model: `The diagram illustrates the process used to recycle plastic bottles into new products.

Overall, this is a linear, five-stage procedure. Used bottles are collected and prepared before the material is melted and transformed into new items.

First, discarded bottles are placed in a recycling bin. At the sorting stage workers stand beside a moving belt carrying the collected material. The next panel shows small pieces of plastic passing under a row of water jets. By the end of washing, the material is in fragments rather than in the shape of the bottles seen at the start.

After washing, the pieces enter a machine where the plastic is heated. Small pellets emerge at the outlet. These provide the material for the final manufacturing stage. Some of the finished items resemble the original bottles, while others have different uses. The examples in the last panel include a shirt and storage containers as well as new bottles.`
  },
  {
    id: 'town-centre', label: 'Maps: town-centre changes', type: 'map', variant: 0,
    prompt: 'The maps below show changes in a town centre between 1990 and 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: '1990: park, factory, small road and car park. 2020: housing estate replaces the park; school replaces the factory; a dual carriageway replaces the small road; a shopping centre replaces the car park.',
    overview: 'Overall, the town centre was comprehensively redeveloped: its original park, factory and car park were replaced by residential, educational and commercial facilities, while the road system was enlarged.',
    reviewHint: 'The park and the housing estate occupy the same north-west site. You can report that one replaced the other. If you added “to house a growing population”, ask where the map gives a population figure or a reason for building.',
    model: `The maps compare the layout of a town centre in 1990 and 2020.

Overall, the area underwent substantial redevelopment. Open land and industrial facilities were replaced by housing, a school and a shopping centre, while the road network was upgraded.

In 1990, a park occupied the north-west section of the town centre, whereas a factory stood opposite it on the north-east side. A small road ran across the southern half of the area, with a car park located to its south-east.

By 2020, the park had been converted into a housing estate and the former factory site had become a school. The small road running from west to east had been widened into a dual carriageway. In addition, the car park was removed and replaced by a shopping centre. The buildings on the south-west side of the junction, however, appear in the same positions on both maps. These changes indicate a shift from open and industrial land towards residential, educational and commercial uses.`
  },
  {
    id: 'internet-screen-time', label: 'Mixed chart: internet access and screen time', type: 'mixed', variant: 0,
    prompt: 'The line graph shows the percentage of households with internet access, and the table shows average daily screen time, from 2010 to 2025. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    dataNotes: 'In 2010, 2015, 2020 and 2025, internet access reached 52%, 68%, 81% and 94% of households. Daily screen time averaged 2.1, 2.8, 3.6 and 4.3 hours respectively.',
    overview: 'Both measures rose at each date. By the end, internet access was close to universal and average daily screen time was just over twice its initial level.',
    reviewHint: 'Check the labels on both panels. One counts households with access and the other measures hours per day. A sentence about the two rising together can be supported. A claim about how much extra time each newly connected household spent would need different data.',
    model: `The line graph gives the proportion of households with an internet connection, while the accompanying table records average daily screen time. Both cover the same four dates between 2010 and 2025.

Overall, internet access became much more widespread over the period and screen time increased at each of the intervals shown. By the final year, nearly all households had access, while the average time spent on screens was a little more than double its initial level.

In 2010, just over half of households had an internet connection, at 52%. This figure reached 68% in 2015, a gain of 16 percentage points over five years. The next two increases were slightly smaller, at 13 points each, taking the figure to 81% in 2020 and 94% in 2025.

Daily screen time rose from 2.1 hours in 2010 to 2.8 hours in 2015. It then reached 3.6 hours in 2020, when about four in five households had access. By 2025 the average stood at 4.3 hours a day, an increase of 2.2 hours across the full period.`
  },
];

const RUBRIC = [
  ['Task achievement', 'Read your overview aloud. Point to two places in the figure that support the main features you chose. Check any claim you could only know from outside the figure.'],
  ['Coherence and cohesion', 'Give each detail paragraph a short title. If the titles are identical, move one comparison next to the evidence it belongs with.'],
  ['Lexical resource', 'Check a word that carries the meaning. Does “rose” have two dates behind it? Can you see the site that “replaced” refers to?'],
  ['Grammatical range and accuracy', 'Read the subject and verb of your longest sentence together. Then check that its tense matches the dates or stages on the figure.'],
] as const;

const LEGO_STEPS = [
  ['Introduction', 'Paraphrase the input without adding data.'],
  ['Overview', 'State the big picture before detailed figures.'],
  ['Body 1', 'Group the first meaningful pattern or area.'],
  ['Body 2', 'Add the second group, contrast or remaining change.'],
  ['Final check', 'Verify every figure, connection and sentence.'],
] as const;

function TaskVisual({ task }: { task: FullTask }) {
  if (task.type === 'mixed') {
    const visual = task1Visual('mixed', task.variant);
    return <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} sizes="(max-width: 768px) 100vw, 1080px" style={{ width: '100%', height: 'auto', display: 'block' }} />;
  }
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
              <span style={{ fontFamily: 'var(--mono)', fontWeight: 800, color: 'var(--wl-on-panel-link, #0f3d8c)', fontSize: '0.76rem' }}>TASK {String(index + 1).padStart(2, '0')} · {item.type.toUpperCase()}</span>
              <strong style={{ lineHeight: 1.35 }}>{item.label.replace(/^.*?: /, '')}</strong>
              <Link href={`/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=${item.id}`} className="btn btn-sm" style={{ justifySelf: 'start' }}>Choose task →</Link>
            </article>
          ))}
        </div>
      </section>
      <div style={{ padding: '1.1rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)', marginBottom: '1.25rem' }}>
        <label htmlFor="full-task-select" style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: '0.75rem', fontWeight: 800, color: 'var(--wl-on-panel-link, #0f3d8c)', marginBottom: '0.5rem' }}>PREVIEW A SUPPORTED VISUAL TASK</label>
        <select id="full-task-select" value={taskIndex} onChange={(event) => chooseTask(Number(event.target.value))} style={{ width: '100%', padding: '0.7rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)' }}>
          {SUPPORTED_FULL_TASKS.map((item, index) => <option key={item.id} value={index}>{index + 1}. {item.label}</option>)}
        </select>
      </div>
      <div style={{ padding: '0.75rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)', marginBottom: '1rem' }}><TaskVisual task={task} /></div>
      <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '4px solid #0f3d8c', marginBottom: '1rem' }}><p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Task prompt</p><p style={{ margin: 0, lineHeight: 1.7 }}>{task.prompt}</p></div>
      <div style={{ padding: '0.9rem 1rem', borderRadius: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.24)', marginBottom: '1rem' }}><strong style={{ color: 'var(--wl-on-panel-warn, #b45309)' }}>Data check:</strong> <span style={{ lineHeight: 1.6 }}>{task.dataNotes}</span></div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: '0.65rem', marginBottom: '1.25rem' }}>{LEGO_STEPS.map(([part, action]) => <article key={part} style={{ padding: '0.8rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)' }}><strong style={{ display: 'block', fontSize: '0.86rem' }}>{part}</strong><span style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', marginTop: '0.3rem', lineHeight: 1.45 }}>{action}</span></article>)}</div>
      <details style={{ padding: '0.9rem 1rem', borderRadius: 8, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.22)', marginBottom: '1.35rem' }}><summary style={{ cursor: 'pointer', fontWeight: 700 }}>Compare your overview with a model</summary><p style={{ lineHeight: 1.6 }}>{task.overview}</p></details>
      <Link className="btn" style={{ width: '100%', fontSize: '1rem', padding: '0.9rem', textAlign: 'center' }} href={`/practica/ielts/academic/writing/task1/tarea-completa/sesion?task=${task.id}`}>Open this writing task →</Link>
    </div></div></section>;
  }

  if (phase === 'writing') {
    return <section className="wl-section"><div className="wrap"><div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
      <Link href="/practica/ielts/academic/writing/task1/tarea-completa" className="btn btn-ghost btn-sm" style={{ marginBottom: '0.75rem' }}>← Practice bank</Link>
      <h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0 1rem' }}>{task.label}</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', position: 'sticky', top: '4.5rem', zIndex: 10 }}><strong style={{ fontFamily: 'var(--mono)', fontSize: '1.2rem', color: timerColor }}>⏱ {formatTime(timeLeft)}</strong><span style={{ fontFamily: 'var(--mono)', color: wordCount >= 150 ? '#047857' : '#b45309' }}>{wordCount} / 150+ words</span><button className="btn btn-sm" onClick={submit}>Review response →</button></div>
      <div style={{ padding: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)', marginBottom: '0.75rem' }}><TaskVisual task={task} /></div>
      <div className="wl-card" style={{ padding: '1rem', borderLeft: '3px solid #0f3d8c', marginBottom: '0.75rem', lineHeight: 1.65 }}>{task.prompt}</div>
      <div style={{ padding: '0.7rem 0.9rem', borderRadius: 8, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.24)', marginBottom: '0.75rem', fontSize: '0.83rem', lineHeight: 1.55 }}><strong>Data reminder:</strong> {task.dataNotes}</div>
      <textarea aria-label="Your Task 1 report" value={text} onChange={(event) => { setText(event.target.value); setChecks({}); }} placeholder={'Introduction: paraphrase the task.\n\nOverview: state the big picture.\n\nBody 1 and Body 2: group the most meaningful details.'} rows={20} {...noAssist} style={{ width: '100%', boxSizing: 'border-box', padding: '1rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', font: 'inherit', lineHeight: 1.75, resize: 'vertical' }} />
      <WritingFeedbackReview locale="en" text={text} assignment={{ title: task.label, language: 'English', level: 'IELTS Academic', prompt: task.prompt, sourceText: task.dataNotes, focus: ['Write an introduction, an overview and comparisons supported by the visual.'] }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.6rem', alignItems: 'center' }}><span style={{ color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem' }}>{wordCount < 150 ? `${150 - wordCount} words to the official minimum` : 'Official minimum reached'}</span><button className="btn btn-sm" onClick={submit}>Submit for review →</button></div>
    </div></div></section>;
  }

  return <section className="wl-section"><div className="wrap"><div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
    <p className="eyebrow"><span className="ink-line" />Final review</p><h1 style={{ fontSize: '1.75rem', margin: '0.35rem 0 0.55rem' }}>Review your complete response</h1>
    <p style={{ color: 'var(--muted)', lineHeight: 1.65 }}>Read your own report alongside the figure. Choose one sentence you would keep and one you want to change before opening the model.</p>
    <div className="wl-card" style={{ padding: '1rem', margin: '1rem 0', maxHeight: 220, overflowY: 'auto' }}><strong>Your response ({wordCount} words)</strong><p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.75 }}>{text || 'No response yet.'}</p></div>
    <details className="wl-card" style={{ padding: '1rem', margin: '1rem 0' }}>
      <summary style={{ cursor: 'pointer', fontWeight: 700 }}>Check the figure for this report</summary>
      <TaskVisual task={task} />
      <p style={{ lineHeight: 1.65 }}>{task.reviewHint}</p>
    </details>
    {RUBRIC.map(([criterion, question]) => <label key={criterion} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', padding: '0.9rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: checks[criterion] ? 'rgba(5,150,105,0.07)' : 'var(--bg-2)', marginBottom: '0.65rem', cursor: 'pointer' }}><input type="checkbox" checked={Boolean(checks[criterion])} onChange={(event) => setChecks((value) => ({ ...value, [criterion]: event.target.checked }))} style={{ marginTop: 4 }} /><span><strong>{criterion}</strong><span style={{ display: 'block', marginTop: '0.2rem', color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.88rem' }}>{question}</span></span></label>)}
    {completeReview && <div style={{ padding: '1rem', borderRadius: 8, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.22)', margin: '1rem 0' }}><strong style={{ color: 'var(--wl-on-panel-ok, #047857)' }}>Review complete.</strong><p style={{ margin: '0.35rem 0 0', lineHeight: 1.55 }}>Compare your choices with the original model response, then return to the specific sub-skill that needs more work.</p></div>}
    <button className="btn btn-sm" onClick={() => setShowModel((value) => !value)}>{showModel ? 'Hide WeLearn model response' : 'View WeLearn model response'}</button>
    {showModel && <div className="wl-card" style={{ padding: '1.2rem', borderLeft: '3px solid #047857', marginTop: '1rem' }}><p className="eyebrow" style={{ margin: '0 0 0.5rem', color: 'var(--wl-on-panel-ok, #047857)' }}>WeLearn model response</p><p style={{ whiteSpace: 'pre-wrap', lineHeight: 1.8, margin: 0 }}>{task.model}</p></div>}
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '1.25rem' }}>
      <button className="btn btn-sm" onClick={() => setPhase('writing')}>Revise my draft without the timer</button>
      <button className="btn btn-ghost btn-sm" onClick={reset}>Try another task</button>
      <Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/rubrica">Explore the four criteria</Link>
      <Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/overview">Review overview</Link>
      <Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/body-1">Review Body 1</Link>
      <Link className="btn btn-ghost btn-sm" href="/practica/ielts/academic/writing/task1/body-2">Review Body 2</Link>
    </div>
  </div></div></section>;
}
