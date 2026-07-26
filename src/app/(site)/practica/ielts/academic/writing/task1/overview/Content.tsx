'use client';

import { useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import OverviewPracticeEngine from './OverviewPracticeEngine';
import Task1ApprovedMapVisual from '../Task1ApprovedMapVisual';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSProcessDiagramVisual,
  IELTSTableVisual,
} from '../Task1VisualLab';

type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';

interface OverviewOption {
  text: string;
  correct: boolean;
  reason: string;
}

interface VisualLesson {
  id: VisualType;
  label: string;
  examPrompt: string;
  question: string;
  whatToLookFor: string[];
  examples: { title: string; insight: string; overview: string; variant: number }[];
  options: OverviewOption[];
  Chart: ComponentType<{ variant?: number }>;
}

const LESSONS: VisualLesson[] = [
  {
    id: 'line',
    label: 'Line graph',
    Chart: IELTSLineGraphVisual,
    examPrompt: 'The line graph below shows the percentage of people with internet access in three regions between 2000 and 2020.',
    question: 'What story changes over time?',
    whatToLookFor: ['overall direction of each line', 'leading line', 'crossover or convergence', 'fastest change'],
    examples: [
      { title: 'Example 1', insight: 'All three regions rise.', overview: 'Overall, internet access increased in all three regions, although Region A remained the most connected throughout the period.', variant: 0 },
      { title: 'Example 2', insight: 'Metro and tram rise while bus use falls.', overview: 'Overall, metro and tram trips increased, whereas bus use declined; metro became the most popular mode by the end of the period.', variant: 1 },
      { title: 'Example 3', insight: 'North overtakes Central.', overview: 'Overall, cycling increased substantially in the North and South districts, while the Central district declined and lost its initial lead.', variant: 2 },
      { title: 'Example 4', insight: 'Families become the leading group.', overview: 'Overall, family visits rose steadily, whereas visits by students and retirees decreased; families became the largest group in the later years.', variant: 3 },
      { title: 'Example 5', insight: 'The original leader falls behind.', overview: 'Overall, Region A and Region C increased, while Region B declined; Region A replaced Region B as the leading region by 2025.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, internet access rose in all three regions, with Region A remaining highest and the gap between regions becoming narrower.', reason: 'Correct: it summarises the global trend, leadership and convergence without figures.' },
      { correct: false, text: 'Overall, Region A increased from 30% to 88%, while Region B rose from 12% to 79%.', reason: 'Too many exact figures; these belong in the detail paragraphs, not the overview.' },
      { correct: false, text: 'Overall, the graph shows internet access in three regions between 2000 and 2020.', reason: 'It only repeats the prompt and does not identify the main story.' },
    ],
  },
  {
    id: 'bar',
    label: 'Bar chart',
    Chart: IELTSBarChartVisual,
    examPrompt: 'The bar chart below shows household expenditure by category in one country in 2024.',
    question: 'Which categories dominate and which are lowest?',
    whatToLookFor: ['highest bar', 'lowest bar', 'similar groups', 'notable differences'],
    examples: [
      { title: 'Example 1', insight: 'Housing dominates.', overview: 'Overall, housing accounted for the largest share of spending, while health represented the smallest category.', variant: 0 },
      { title: 'Example 2', insight: 'The library leads.', overview: 'Overall, the library was the most popular facility, while clubs were the least selected; the remaining facilities occupied intermediate positions.', variant: 1 },
      { title: 'Example 3', insight: 'Screen time falls with age.', overview: 'Overall, average screen time declined consistently across successive age groups, with the youngest adults recording the highest figure.', variant: 2 },
      { title: 'Example 4', insight: 'Museum A is the clear leader.', overview: 'Overall, Museum A received the most visitors by a substantial margin, whereas Museum D attracted the fewest.', variant: 3 },
      { title: 'Example 5', insight: 'Agriculture dominates water use.', overview: 'Overall, agriculture used by far the most water, while energy and other sectors accounted for comparatively small amounts.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, housing took up the largest share of household spending, while health was the smallest category.', reason: 'Correct: it selects relevant extremes without listing every bar.' },
      { correct: false, text: 'Overall, housing was 32%, food was 18%, transport was 16%, leisure was 21% and health was 13%.', reason: 'This is a list of figures, not an overview.' },
      { correct: false, text: 'Overall, household expenditure changed significantly during the period.', reason: 'Incorrect: there is no visible time period.' },
    ],
  },
  {
    id: 'pie',
    label: 'Pie charts',
    Chart: IELTSPieChartVisual,
    examPrompt: 'The pie chart below shows the proportion of energy produced from four sources in a country in 2025.',
    question: 'Which share is largest and which shares are smaller?',
    whatToLookFor: ['largest segment', 'smallest segment', 'groupings', 'overall distribution'],
    examples: [
      { title: 'Example 1', insight: 'Solar leads.', overview: 'Overall, solar energy made up the largest share of production, while other sources contributed the smallest proportion.', variant: 0 },
      { title: 'Example 2', insight: 'Housing becomes the largest share.', overview: 'Overall, housing increased to become the largest household expense, while food declined and the other categories changed more modestly.', variant: 1 },
      { title: 'Example 3', insight: 'Flexibility is the main reason.', overview: 'Overall, flexibility was the main reason for choosing online courses, while cost was the second most common factor and other reasons were less significant.', variant: 2 },
      { title: 'Example 4', insight: 'The four seasons are closely balanced.', overview: 'Overall, visitor numbers were distributed relatively evenly across the seasons, although summer was marginally the most popular.', variant: 3 },
      { title: 'Example 5', insight: 'The leading source differs by country.', overview: 'Overall, gas was the largest source in Country A, whereas coal dominated electricity generation in Country B.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, solar and wind accounted for the majority of energy production, while other sources made up the smallest share.', reason: 'Correct: it groups segments and avoids exact percentages.' },
      { correct: false, text: 'Overall, solar was 34%, wind was 28%, hydro was 22% and other sources were 16%.', reason: 'This includes too many exact figures for an overview.' },
      { correct: false, text: 'Overall, energy production increased steadily over the period.', reason: 'Incorrect: a one-year pie chart does not show change over time.' },
    ],
  },
  {
    id: 'table',
    label: 'Table',
    Chart: IELTSTableVisual,
    examPrompt: 'The table below shows daily social media use by age group in three countries in 2023.',
    question: 'What pattern is repeated across rows and columns?',
    whatToLookFor: ['highest group', 'lowest group', 'age pattern', 'leading country'],
    examples: [
      { title: 'Example 1', insight: 'Use falls with age.', overview: 'Overall, daily social media use declined with age in all three countries.', variant: 0 },
      { title: 'Example 2', insight: 'Business stays largest; Science grows fastest.', overview: 'Overall, Business attracted the most international students throughout, while Science experienced the fastest growth over the period.', variant: 1 },
      { title: 'Example 3', insight: 'Car is consistently quickest.', overview: 'Overall, travelling by car took the least time in every city, whereas bus journeys were consistently the longest.', variant: 2 },
      { title: 'Example 4', insight: 'Guides outperform the other facilities.', overview: 'Overall, guides received the strongest satisfaction ratings, while transport had the weakest results and the largest share of poor ratings.', variant: 3 },
      { title: 'Example 5', insight: 'All recycling rates rise.', overview: 'Overall, recycling increased for all four materials, with paper remaining the most recycled and plastic the least recycled throughout.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, daily social media use fell as age increased, and the USA recorded the highest figures in every age group.', reason: 'Correct: it identifies a cross-table pattern across rows and columns.' },
      { correct: false, text: 'Overall, the 18-24 group in the USA was 92%, and the 45+ group in Australia was 32%.', reason: 'It only selects two cells and does not summarise the complete table.' },
      { correct: false, text: 'Overall, the table shows daily social media use by age group.', reason: 'It repeats the prompt instead of giving an overview.' },
    ],
  },
  {
    id: 'process',
    label: 'Process diagram',
    Chart: IELTSProcessDiagramVisual,
    examPrompt: 'The diagram below shows how plastic bottles are recycled into new products.',
    question: 'Is the process linear or cyclical, and what are its broad phases?',
    whatToLookFor: ['start and end', 'number of stages', 'groupable phases', 'cycle or linear sequence'],
    examples: [
      { title: 'Example 1', insight: 'A linear process.', overview: 'Overall, the process is linear, beginning with the collection of used bottles and ending with the manufacture of new products.', variant: 0 },
      { title: 'Example 2', insight: 'Coffee follows a linear production sequence.', overview: 'Overall, coffee preparation is a linear process that begins with harvesting cherries and ends with roasted beans being ground and packaged for sale.', variant: 1 },
      { title: 'Example 3', insight: 'Water is extracted, treated and distributed.', overview: 'Overall, bottled water production starts with extraction and filtration, followed by purification, bottling and delivery to shops.', variant: 2 },
      { title: 'Example 4', insight: 'Bricks pass through five industrial stages.', overview: 'Overall, brick manufacture is a linear process in which clay is prepared, moulded, dried and fired before delivery.', variant: 3 },
      { title: 'Example 5', insight: 'The bee diagram is cyclical.', overview: 'Overall, the honey bee life cycle is cyclical, progressing from egg to adult before the adult stage supports the next generation.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, this is a linear process in which used plastic bottles are collected, processed and finally turned into new products.', reason: 'Correct: it captures the overall structure without narrating every stage.' },
      { correct: false, text: 'Overall, the bottles are collected, sorted, washed, melted and manufactured into new products.', reason: 'It is too sequential and reads like a body paragraph, not an overview.' },
      { correct: false, text: 'Overall, plastic recycling increased significantly over the period.', reason: 'Incorrect: the diagram shows no figures or change over time.' },
    ],
  },
  {
    id: 'map',
    label: 'Map',
    Chart: Task1ApprovedMapVisual,
    examPrompt: 'The maps below show changes in a town centre between 1990 and 2020.',
    question: 'What is the dominant spatial transformation?',
    whatToLookFor: ['more urban or rural', 'what disappears', 'what appears', 'infrastructure changes'],
    examples: [
      { title: 'Example 1', insight: 'Urbanisation.', overview: 'Overall, the town centre became more urbanised, with open and industrial areas replaced by residential, educational and commercial facilities.', variant: 0 },
      { title: 'Example 2', insight: 'The campus gains residential and academic facilities.', overview: 'Overall, the campus was extensively redeveloped, with the garden and lecture hall replaced by student flats and a library, while the southern facilities were modernised.', variant: 1 },
      { title: 'Example 3', insight: 'The village shifts toward tourism.', overview: 'Overall, the coastal village became more tourist-oriented, with farmland and a fishing harbour replaced by a holiday resort and marina.', variant: 2 },
      { title: 'Example 4', insight: 'The park adds new leisure facilities.', overview: 'Overall, the park retained much of its green space but gained new recreational facilities, including a playground, cafe and open-air stage.', variant: 3 },
      { title: 'Example 5', insight: 'Retail functions are modernised.', overview: 'Overall, the shopping centre was modernised through the replacement of small-scale retail and transport facilities with larger commercial and parking infrastructure.', variant: 4 },
    ],
    options: [
      { correct: true, text: 'Overall, the town centre became more developed, with industrial and open areas replaced by housing, education and commercial facilities.', reason: 'Correct: it summarises the spatial transformation and change categories.' },
      { correct: false, text: 'Overall, the factory was in the top right in 1990, while the school was in the top right in 2020.', reason: 'Too localised; this belongs in the detail paragraphs.' },
      { correct: false, text: 'Overall, the number of residents increased dramatically.', reason: 'The map contains no population data.' },
    ],
  },
];

export default function OverviewPage() {
  const [activeType, setActiveType] = useState<VisualType>('line');
  const [activeExample, setActiveExample] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const lesson = LESSONS.find((item) => item.id === activeType) ?? LESSONS[0];
  const Chart = lesson.Chart;

  function chooseType(id: VisualType) {
    setActiveType(id);
    setActiveExample(0);
    setSelected(null);
    setLocked(false);
  }

  function chooseOption(index: number) {
    if (locked) return;
    setSelected(index);
    setLocked(true);
  }

  return (
    <section className="wl-section" lang="en">
      <div className="wrap">
        <div className="ielts-task1-shell" style={{ maxWidth: 1080, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Task 1</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Task 1 / Overview</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Sub-skill 2 — Overview</p>
          <h1 style={{ fontSize: '1.9rem', letterSpacing: 0, margin: '0 0 0.4rem', fontWeight: 700 }}>The Overview Paragraph</h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.98rem', margin: '0 0 0.75rem', lineHeight: 1.65 }}>
            An overview is not an introduction or a list of figures. It tells the examiner the complete story of the visual.
            Its focus changes with the input: lines, bars, pie charts, tables, processes or maps.
          </p>

          <Task1OfficialReviewBlock
            focus="Select the main features of the visual without copying exact figures."
            officialFormat="IELTS Academic Writing Task 1 assesses how well you describe the main features of visual information. An overview is a response strategy, not a separate official section."
            welearnStrategy="We train the overview by input type: first identify the visual story, then choose the sentence that summarises it most effectively."
            answerCheck="A strong answer mentions the dominant trend, main contrast, overall distribution, process phases or map transformation without filling the paragraph with figures."
            relatedLinks={[
              { href: '/practica/ielts/academic/writing/task1/introduccion', label: 'Introduction' },
              { href: '/practica/ielts/academic/writing/task1/body-1', label: 'Body 1' },
              { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Body 2' },
              { href: '/practica/ielts/academic/writing/task1/tendencias', label: 'Relevant trends' },
            ]}
          />

          <Task1ChartTypeGuide />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(128px, 1fr))', gap: '0.65rem', margin: '1.5rem 0' }}>
            {LESSONS.map((item) => (
              <button
                key={item.id}
                onClick={() => chooseType(item.id)}
                style={{
                  padding: '0.85rem 0.7rem',
                  borderRadius: 8,
                  border: activeType === item.id ? '2px solid #0f3d8c' : '1px solid var(--line-soft)',
                  background: activeType === item.id ? 'rgba(15,61,140,0.07)' : 'var(--bg)',
                  color: activeType === item.id ? '#0f3d8c' : 'var(--ink-2)',
                  fontWeight: 900,
                  fontFamily: 'var(--mono)',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.25rem', borderTop: '3px solid #0f3d8c' }}>
            <p style={{ margin: '0 0 0.5rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>
              IELTS Academic — {lesson.label}
            </p>
            <p style={{ margin: '0 0 1rem', color: 'var(--ink)', fontStyle: 'italic', lineHeight: 1.6 }}>
              “{lesson.examPrompt}”
            </p>
            <div style={{ padding: '1rem', borderRadius: 8, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
              <Chart />
            </div>
            <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.08rem', letterSpacing: 0 }}>{lesson.question}</h2>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {lesson.whatToLookFor.map((item) => (
                <span key={item} style={{ padding: '0.2rem 0.55rem', borderRadius: 999, background: 'rgba(15,61,140,0.07)', color: '#0f3d8c', border: '1px solid rgba(15,61,140,0.16)', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 800 }}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.12rem', letterSpacing: 0 }}>Five guided examples for this visual</h2>
            <div role="tablist" aria-label={`Examples of ${lesson.label}`} style={{ display: 'flex', gap: '0.55rem', overflowX: 'auto', paddingBottom: '0.45rem' }}>
              {lesson.examples.map((example, index) => (
                <button
                  key={example.title}
                  type="button"
                  role="tab"
                  aria-selected={activeExample === index}
                  onClick={() => { setActiveExample(index); setSelected(null); setLocked(false); }}
                  style={{ flex: '0 0 auto', minWidth: 124, padding: '0.72rem 0.8rem', borderRadius: 8, border: activeExample === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', background: activeExample === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: activeExample === index ? '#0f3d8c' : 'var(--ink-2)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, cursor: 'pointer' }}
                >{String(index + 1).padStart(2, '0')} · {example.insight}</button>
              ))}
            </div>
            {(() => {
              const example = lesson.examples[activeExample];
              const ExampleChart = lesson.Chart;
              return (
                <article role="tabpanel" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', alignItems: 'start', marginTop: '0.85rem', padding: '1rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg-2)' }}>
                  <div style={{ padding: '0.7rem', borderRadius: 8, background: 'var(--bg)', border: '1px solid var(--line-soft)', overflow: 'hidden' }}><ExampleChart variant={example.variant} /></div>
                  <div>
                    <p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900 }}>{example.title}</p>
                    <p style={{ margin: '0 0 0.7rem', color: 'var(--ink)', fontWeight: 800 }}>{example.insight}</p>
                    <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.65, fontStyle: 'italic' }}>“{example.overview}”</p>
                    <p style={{ margin: '0.8rem 0 0', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>Study the visual first: the overview summarises this story, not every figure.</p>
                  </div>
                </article>
              );
            })()}
          </div>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
            <p style={{ margin: '0 0 0.35rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.72rem', fontWeight: 900, textTransform: 'uppercase' }}>Practice engine</p>
            <h2 style={{ margin: '0 0 0.45rem', fontSize: '1.12rem', letterSpacing: 0 }}>Choose the correct overview</h2>
            <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.9rem' }}>
              Level 1: select the sentence that best summarises the visual story. A correct overview avoids exact figures, does not repeat the prompt and does not invent information.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {lesson.options.map((option, index) => {
                const isSelected = selected === index;
                const show = locked && isSelected;
                const border = show ? (option.correct ? '2px solid #059669' : '2px solid #dc2626') : isSelected ? '2px solid #0f3d8c' : '1.5px solid var(--line-soft)';
                const bg = show ? (option.correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.07)') : 'var(--bg)';
                return (
                  <button
                    key={option.text}
                    onClick={() => chooseOption(index)}
                    style={{ textAlign: 'left', padding: '0.9rem 1rem', borderRadius: 8, border, background: bg, cursor: locked ? 'default' : 'pointer', color: 'var(--ink)', lineHeight: 1.55 }}
                  >
                    <span style={{ fontWeight: 800, color: show ? (option.correct ? '#059669' : '#dc2626') : '#0f3d8c', marginRight: '0.35rem' }}>
                      {show ? (option.correct ? 'Correct' : 'Review') : `Option ${index + 1}`}
                    </span>
                    {option.text}
                    {show && <p style={{ margin: '0.55rem 0 0', color: option.correct ? '#059669' : '#dc2626', fontSize: '0.84rem' }}>{option.reason}</p>}
                  </button>
                );
              })}
            </div>
            {locked && (
              <button className="btn btn-sm" onClick={() => { setSelected(null); setLocked(false); }} style={{ marginTop: '0.9rem' }}>
                Practice again
              </button>
            )}
          </div>

          <OverviewPracticeEngine />
        </div>
      </div>
    </section>
  );
}
