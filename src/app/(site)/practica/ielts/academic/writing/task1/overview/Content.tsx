'use client';

import { useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import Link from 'next/link';
import { placeOption } from '@/lib/practica/shuffle-options';
import Task1OfficialReviewBlock from '../Task1OfficialReviewBlock';
import Task1ChartTypeGuide from '../Task1ChartTypeGuide';
import OverviewPracticeEngine from './OverviewPracticeEngine';
import { WORKED } from './overview-data';
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

const LESSON_SOURCE: Omit<VisualLesson, 'examples'>[] = [
  {
    id: 'line',
    label: 'Line graph',
    Chart: IELTSLineGraphVisual,
    examPrompt: 'The line graph below shows the percentage of people with internet access in three regions between 2000 and 2020.',
    question: 'What story changes over time?',
    whatToLookFor: ['overall direction of each line', 'leading line', 'crossover or convergence', 'fastest change'],
    options: [
      { correct: true, text: 'Overall, internet access rose in all three regions, with Region A remaining highest and the gap between regions becoming narrower.', reason: 'Correct: it summarises the global trend, leadership and convergence without figures.' },
      { correct: false, text: 'Overall, Region A increased from 30% to 88%, Region B rose from 12% to 79% and Region C from 6% to 57%.', reason: 'Too many exact figures; these belong in the detail paragraphs, not the overview.' },
      { correct: false, text: 'Overall, the graph shows the level of internet access in three regions between 2000 and 2020.', reason: 'It only repeats the prompt and does not identify the main story.' },
    ],
  },
  {
    id: 'bar',
    label: 'Bar chart',
    Chart: IELTSBarChartVisual,
    examPrompt: 'The bar chart below shows household expenditure by category in one country in 2024.',
    question: 'Which categories dominate and which are lowest?',
    whatToLookFor: ['highest bar', 'lowest bar', 'similar groups', 'notable differences'],
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
    options: [
      { correct: true, text: 'Overall, solar and wind accounted for the majority of energy production, while other sources made up the smallest share.', reason: 'Correct: it groups segments and avoids exact percentages.' },
      { correct: false, text: 'Overall, solar was 34%, wind was 28%, hydro was 22% and other sources were 16% of the total.', reason: 'This includes too many exact figures for an overview.' },
      { correct: false, text: 'Overall, energy production increased steadily over the period shown in the chart.', reason: 'Incorrect: a one-year pie chart does not show change over time.' },
    ],
  },
  {
    id: 'table',
    label: 'Table',
    Chart: IELTSTableVisual,
    examPrompt: 'The table below shows daily social media use by age group in three countries in 2023.',
    question: 'What pattern is repeated across rows and columns?',
    whatToLookFor: ['highest group', 'lowest group', 'age pattern', 'leading country'],
    options: [
      { correct: true, text: 'Overall, daily social media use fell as age increased, and the USA recorded the highest figures in every age group.', reason: 'Correct: it identifies a cross-table pattern across rows and columns.' },
      { correct: false, text: 'Overall, the 18-24 group in the USA recorded 92%, while the 45+ group in Australia recorded only 32%.', reason: 'It only selects two cells and does not summarise the complete table.' },
      { correct: false, text: 'Overall, the table shows daily social media use by age group and by country.', reason: 'It repeats the prompt instead of giving an overview.' },
    ],
  },
  {
    id: 'process',
    label: 'Process diagram',
    Chart: IELTSProcessDiagramVisual,
    examPrompt: 'The diagram below shows how plastic bottles are recycled into new products.',
    question: 'Is the process linear or cyclical, and what are its broad phases?',
    whatToLookFor: ['start and end', 'number of stages', 'groupable phases', 'cycle or linear sequence'],
    options: [
      { correct: true, text: 'Overall, this is a linear process in which used plastic bottles are collected, processed and finally turned into new products.', reason: 'Correct: it captures the overall structure without narrating every stage.' },
      { correct: false, text: 'Overall, the bottles are first collected, then sorted, then washed, then cut into flakes, then melted and finally manufactured into new products.', reason: 'It is too sequential and reads like a body paragraph, not an overview.' },
      { correct: false, text: 'Overall, plastic recycling increased significantly over the period covered by the diagram.', reason: 'Incorrect: the diagram shows no figures or change over time.' },
    ],
  },
  {
    id: 'map',
    label: 'Map',
    Chart: Task1ApprovedMapVisual,
    examPrompt: 'The maps below show changes in a town centre between 1990 and 2020.',
    question: 'What is the dominant spatial transformation?',
    whatToLookFor: ['more urban or rural', 'what disappears', 'what appears', 'infrastructure changes'],
    options: [
      { correct: true, text: 'Overall, the town centre became more developed, with industrial and open areas replaced by housing, education and commercial facilities.', reason: 'Correct: it summarises the spatial transformation and change categories.' },
      { correct: false, text: 'Overall, the factory was in the top right in 1990, while the school was in the top right in 2020.', reason: 'Too localised; this belongs in the detail paragraphs.' },
      { correct: false, text: 'Overall, the number of residents increased dramatically.', reason: 'The map contains no population data.' },
    ],
  },
];

/**
 * Los ejemplos resueltos salen de `overview-data.ts`, no de una segunda lista escrita aquí.
 *
 * Y son TRES por tipo, no cinco. Los otros dos son sobre los que practica el motor de abajo:
 * cuando la lección los enseñaba todos, seis de sus quince respuestas quedaban impresas
 * encima del ejercicio y se resolvía copiando.
 */
const LESSONS: VisualLesson[] = LESSON_SOURCE.map((lesson) => ({
  ...lesson,
  examples: WORKED.filter((item) => item.kind === lesson.id).map((item, index) => ({
    title: `Example ${index + 1}`,
    insight: item.insight,
    overview: item.model,
    variant: item.variant,
  })),
}));


export default function OverviewPage() {
  const [activeType, setActiveType] = useState<VisualType>('line');
  const [activeExample, setActiveExample] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [locked, setLocked] = useState(false);

  const lesson = LESSONS.find((item) => item.id === activeType) ?? LESSONS[0];
  const Chart = lesson.Chart;

  /**
   * La correcta la escribe el redactor primera, y aquí se pintaba en ese mismo orden: era
   * la opción 1 en las seis lecciones. Se acertaba sin mirar el gráfico. `placeOption`
   * reparte por bloques a partir del identificador de la lección, así que el reparto es
   * estable entre servidor y navegador y no hay letra que memorizar.
   */
  const options = useMemo(() => {
    const source = LESSONS.findIndex((item) => item.id === lesson.id);
    return placeOption(lesson.options, lesson.options.findIndex((item) => item.correct), 'task1-overview-lesson', source).options;
  }, [lesson]);

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
            <h2 style={{ margin: '0 0 0.7rem', fontSize: '1.12rem', letterSpacing: 0 }}>Three worked examples for this visual</h2>
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
              {options.map((option, index) => {
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
