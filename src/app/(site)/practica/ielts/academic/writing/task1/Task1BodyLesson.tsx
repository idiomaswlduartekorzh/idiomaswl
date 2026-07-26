'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ComponentType } from 'react';
import Task1OfficialReviewBlock from './Task1OfficialReviewBlock';
import Task1BodyPracticeEngine from './Task1BodyPracticeEngine';
import Task1ApprovedMapVisual from './Task1ApprovedMapVisual';
import Task1ApprovedProcessVisual from './Task1ApprovedProcessVisual';
import {
  IELTSBarChartVisual,
  IELTSLineGraphVisual,
  IELTSPieChartVisual,
  IELTSTableVisual,
} from './Task1VisualLab';

type Body = 1 | 2;
type VisualType = 'line' | 'bar' | 'pie' | 'table' | 'process' | 'map';
type Lesson = {
  id: VisualType;
  label: string;
  prompt: string;
  job: string;
  grouping: string;
  lego: string[];
  model: string;
  chart: ComponentType<{ variant?: number }>;
  variant: number;
};

const LESSONS: Record<Body, Lesson[]> = {
  1: [
    { id: 'line', label: 'Line graph', chart: IELTSLineGraphVisual, variant: 0, prompt: 'The line graph shows internet access in three regions between 2000 and 2020.', job: 'Establish the dominant direction and the leading series before moving to a secondary pattern.', grouping: 'Group Region A with the shared upward trend; use the lower lines as a second group only when they add a contrast.', lego: ['Topic: Region A and the general trend', 'Evidence: selected start/end or turning-point figures', 'Link: while / although / by contrast'], model: 'Region A remained the most connected area throughout the period, rising from 30% in 2000 to almost 90% in 2020. The other two regions also increased, although both began from considerably lower levels.' },
    { id: 'bar', label: 'Bar chart', chart: IELTSBarChartVisual, variant: 0, prompt: 'The bar chart compares household spending across five categories in 2024.', job: 'Open with the strongest hierarchy or a meaningful cluster, not the first bar from left to right.', grouping: 'Pair the largest category with the closest meaningful group; leave the remaining contrast for Body 2.', lego: ['Topic: highest category or clear cluster', 'Evidence: one or two decisive figures', 'Link: followed by / compared with / at'], model: 'Housing was by far the largest item of expenditure, at just over one third of the total. Leisure ranked second, whereas food and transport formed a noticeably lower middle group.' },
    { id: 'pie', label: 'Pie charts', chart: IELTSPieChartVisual, variant: 1, prompt: 'The pie charts compare household spending by category in 2000 and 2020.', job: 'Use the first detail paragraph to identify the dominant share or the most meaningful composition group.', grouping: 'Group the leading segments together rather than giving every percentage one sentence.', lego: ['Topic: dominant sources', 'Evidence: combined share or largest segment', 'Link: together / accounted for / respectively'], model: 'In 2000, food was the largest household expense at 31%, closely followed by other items at 30%. Together, these two categories accounted for just over three fifths of total spending.' },
    { id: 'table', label: 'Table', chart: IELTSTableVisual, variant: 0, prompt: 'The table compares daily social-media use by age group in three countries.', job: 'Lead with the repeated row or column pattern that gives the table a clear story.', grouping: 'Organise by a repeated age pattern or a stable country ranking, never by isolated cells.', lego: ['Topic: repeated pattern', 'Evidence: two representative cells', 'Link: across / in each case / respectively'], model: 'Across all three countries, daily use was highest among the youngest adults and then declined with age. For example, the 18-24 group recorded the leading figure in every market, whereas the oldest group was consistently lowest.' },
    { id: 'process', label: 'Process diagram', chart: Task1ApprovedProcessVisual, variant: 0, prompt: 'The diagram shows how plastic bottles are recycled into new products.', job: 'Describe the first coherent phase of the sequence, normally collection and preparation.', grouping: 'Group consecutive stages by function rather than treating every arrow as a separate paragraph.', lego: ['Sequence: initially / first', 'Passive verb: are collected / are sorted', 'Bridge: after which / before'], model: 'Initially, used bottles are collected from public recycling bins and then sorted at a recycling centre. They are subsequently washed before the material is broken into small flakes.' },
    { id: 'map', label: 'Map', chart: Task1ApprovedMapVisual, variant: 0, prompt: 'The maps show changes in a town centre between 1990 and 2020.', job: 'Group the first spatial area and describe visible land-use changes precisely.', grouping: 'Use one side or one zone of the map as a paragraph unit, then leave the second area for Body 2.', lego: ['Location: in the northern area', 'Change: was replaced by / was converted into', 'Link: while / whereas'], model: 'In the northern part of the town, the former park was replaced by a housing estate. At the same time, the factory site on the opposite side of the main road was converted into a school.' },
  ],
  2: [
    { id: 'line', label: 'Line graph', chart: IELTSLineGraphVisual, variant: 0, prompt: 'The line graph shows internet access in three regions between 2000 and 2020.', job: 'Complete the story with a lower group, a gap, a crossover or a later development not already used in Body 1.', grouping: 'Use Body 2 to make the contrast meaningful: lower starting points, faster growth or a narrowing gap.', lego: ['Shift: meanwhile / by contrast', 'Evidence: second pattern and precise gap', 'Close: final comparison'], model: 'Meanwhile, Region B and Region C expanded more rapidly from lower starting points. By 2020, the former had reached around 80%, while the latter rose to just under 60%, narrowing the initial gap with Region A.' },
    { id: 'bar', label: 'Bar chart', chart: IELTSBarChartVisual, variant: 0, prompt: 'The bar chart compares household spending across five categories in 2024.', job: 'Finish the hierarchy with the remaining lowest category or a meaningful contrast to Body 1.', grouping: 'Keep the second group distinct; do not restate the top category without a new relationship.', lego: ['Shift: by contrast / at the other end', 'Evidence: remaining group', 'Close: relative relationship'], model: 'At the other end of the scale, health accounted for the smallest proportion of spending. Its figure was well below that for leisure and only around half the level recorded for housing.' },
    { id: 'pie', label: 'Pie charts', chart: IELTSPieChartVisual, variant: 1, prompt: 'The pie charts compare household spending by category in 2000 and 2020.', job: 'Use the second paragraph to report the composition change or the smaller shares that complete the comparison.', grouping: 'Contrast what gained share with what lost share; use percentage points accurately when needed.', lego: ['Shift: by 2020 / whereas', 'Evidence: change in share', 'Close: resulting composition'], model: 'By 2020, housing had become the largest category, rising from 22% to 31%. In contrast, food declined from 31% to 24%, while transport increased slightly to 19%.' },
    { id: 'table', label: 'Table', chart: IELTSTableVisual, variant: 0, prompt: 'The table compares daily social-media use by age group in three countries.', job: 'Add the country ranking, exception or remaining column pattern after the first age-based group.', grouping: 'Move to a different dimension of the table so the second paragraph adds evidence rather than repeating it.', lego: ['Shift: in terms of country', 'Evidence: leading and lowest cases', 'Close: exception or stable ranking'], model: 'In terms of country, the USA recorded the highest levels in each age band, while Australia had the lowest figures. The gap was widest among 18-24 year olds, at 19 percentage points.' },
    { id: 'process', label: 'Process diagram', chart: Task1ApprovedProcessVisual, variant: 0, prompt: 'The diagram shows how plastic bottles are recycled into new products.', job: 'Complete the later production phase after Body 1 has covered collection and preparation.', grouping: 'Continue from the previous phase; do not restart from collection or repeat the overview.', lego: ['Sequence: next / thereafter', 'Passive verb: are melted / are moulded', 'Outcome: to form / before becoming'], model: 'Next, the cleaned flakes are heated and melted to produce plastic pellets. These are then moulded into new bottles, containers or other reusable products.' },
    { id: 'map', label: 'Map', chart: Task1ApprovedMapVisual, variant: 0, prompt: 'The maps show changes in a town centre between 1990 and 2020.', job: 'Move to a second area or the transport network so the map response covers the remaining major changes.', grouping: 'Signal the spatial move clearly with meanwhile, in the southern area or along the road.', lego: ['Location: in the southern area', 'Change: was widened / gave way to', 'Link: meanwhile / in addition'], model: 'Meanwhile, the small road in the southern area was widened into a dual carriageway. The former car park was also removed to make way for a shopping centre.' },
  ],
};

const LINKS = {
  1: [
    { href: '/practica/ielts/academic/writing/task1/tendencias', label: 'Select relevant trends' },
    { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Compare and group data' },
    { href: '/practica/ielts/academic/writing/task1/body-2', label: 'Continue to Body 2' },
  ],
  2: [
    { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Strengthen comparisons' },
    { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Build data language' },
    { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Build a complete response' },
  ],
};

export default function Task1BodyLesson({ body }: { body: Body }) {
  const [selected, setSelected] = useState<VisualType>('line');
  const lesson = LESSONS[body].find((item) => item.id === selected) ?? LESSONS[body][0];
  const Chart = lesson.chart;
  const isFirst = body === 1;

  return (
    <section className="wl-section" lang="en">
      <div className="wrap" style={{ maxWidth: 1120 }}>
        <div style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm">← Task 1 structure</Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>IELTS / Academic / Writing / Task 1 / Body {body}</span>
          </div>
          <p className="eyebrow"><span className="ink-line" />Paragraph {body + 2} of the WeLearn response plan</p>
          <h1 style={{ margin: '0.35rem 0 0.75rem', fontSize: 'clamp(2rem, 4vw, 3.2rem)', letterSpacing: 0 }}>IELTS Task 1 Body {body}: {isFirst ? 'group the first set of evidence' : 'complete the evidence without repeating yourself'}</h1>
          <p style={{ margin: 0, maxWidth: 760, color: 'var(--muted)', fontSize: '1.02rem', lineHeight: 1.7 }}>
            {isFirst
              ? 'Body 1 turns your overview into evidence. Choose one meaningful group, organise it logically and use figures only when they prove the pattern.'
              : 'Body 2 completes the data story. Add the second group, contrast, later phase or remaining area so the response feels complete rather than repetitive.'}
          </p>
        </div>

        <Task1OfficialReviewBlock
          focus={`Body ${body} organisation, selected evidence and accurate grouping.`}
          officialFormat="IELTS Academic Writing Task 1 requires a description of the visual information in at least 150 words. It does not prescribe fixed paragraph names or paragraph word counts."
          welearnStrategy={`Use four paragraphs as a study structure. Body ${body} is usually about 45-60 words and should add a distinct, evidence-based group to the response.`}
          answerCheck={isFirst ? 'Check that this paragraph develops one meaningful group rather than repeating the overview or listing every value.' : 'Check that this paragraph adds new evidence, a contrast or a second phase instead of repeating Body 1.'}
          relatedLinks={LINKS[body]}
        />

        <section aria-labelledby={`body-${body}-blueprint`} style={{ margin: '2rem 0' }}>
          <p className="eyebrow"><span className="ink-line" />The paragraph blueprint</p>
          <h2 id={`body-${body}-blueprint`} style={{ margin: '0 0 0.85rem', fontSize: '1.55rem' }}>{isFirst ? 'Body 1 answers: “Which evidence should I establish first?”' : 'Body 2 answers: “What essential evidence is still missing?”'}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '0.75rem' }}>
            {[
              ['Purpose', isFirst ? 'Develop the first meaningful group behind your overview.' : 'Complete the remaining group, contrast or later phase.'],
              ['Recommended length', 'About 45-60 words in the WeLearn study plan.'],
              ['Evidence rule', 'Select figures that prove a pattern; do not narrate every value.'],
              ['Do not do this', isFirst ? 'Do not repeat the overview or describe data in visual order.' : 'Do not restart Body 1 or add causes the visual does not show.'],
            ].map(([title, copy]) => <article key={title} className="wl-card" style={{ padding: '1rem', borderTop: '3px solid #0f3d8c' }}><h3 style={{ margin: '0 0 0.4rem', fontSize: '0.92rem' }}>{title}</h3><p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.58, fontSize: '0.86rem' }}>{copy}</p></article>)}
          </div>
        </section>

        <section aria-labelledby={`body-${body}-visual-lab`} style={{ marginTop: '2.4rem' }}>
          <p className="eyebrow"><span className="ink-line" />Choose the visual before building the paragraph</p>
          <h2 id={`body-${body}-visual-lab`} style={{ margin: '0 0 0.5rem', fontSize: '1.55rem' }}>Six guided examples for Body {body}</h2>
          <p style={{ margin: '0 0 1rem', color: 'var(--muted)', lineHeight: 1.65 }}>The paragraph job changes with the input. Choose a visual type to see the grouping decision, sentence blocks and an original model paragraph.</p>
          <div role="tablist" aria-label={`Body ${body} visual types`} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.5rem', marginBottom: '1rem' }}>
            {LESSONS[body].map((item) => <button key={item.id} role="tab" type="button" aria-selected={selected === item.id} onClick={() => setSelected(item.id)} className="btn btn-sm" style={{ justifyContent: 'center', opacity: selected === item.id ? 1 : 0.68, whiteSpace: 'normal' }}>{item.label}</button>)}
          </div>
          <article className="wl-card" style={{ padding: '1.1rem', borderTop: '4px solid #0f3d8c' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.15rem', alignItems: 'start' }}>
              <div style={{ padding: '0.65rem', borderRadius: 8, border: '1px solid var(--line-soft)', background: 'var(--bg-2)', overflow: 'hidden' }}><Chart variant={lesson.variant} /></div>
              <div>
                <p style={{ margin: '0 0 0.55rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.76rem', fontWeight: 900 }}>{lesson.label.toUpperCase()} · GUIDED EXAMPLE</p>
                <p style={{ margin: '0 0 0.75rem', color: 'var(--ink)', lineHeight: 1.55, fontStyle: 'italic' }}>&ldquo;{lesson.prompt}&rdquo;</p>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>Paragraph job</h3><p style={{ margin: '0 0 0.7rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{lesson.job}</p>
                <h3 style={{ margin: '0 0 0.35rem', fontSize: '1rem' }}>Grouping decision</h3><p style={{ margin: '0 0 0.7rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>{lesson.grouping}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.38rem', marginBottom: '0.8rem' }}>{lesson.lego.map((block) => <span key={block} style={{ padding: '0.28rem 0.5rem', borderRadius: 999, border: '1px solid rgba(15,61,140,0.22)', color: '#0f3d8c', background: 'rgba(15,61,140,0.05)', fontSize: '0.74rem', lineHeight: 1.35 }}>{block}</span>)}</div>
                <div style={{ padding: '0.8rem', borderRadius: 8, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.23)' }}><strong style={{ color: '#047857', fontSize: '0.76rem', fontFamily: 'var(--mono)' }}>MODEL BODY {body}</strong><p style={{ margin: '0.35rem 0 0', color: 'var(--ink)', lineHeight: 1.65 }}>{lesson.model}</p></div>
              </div>
            </div>
          </article>
        </section>

        <Task1BodyPracticeEngine body={body} />

        <section aria-label="Next Task 1 steps" className="wl-card" style={{ marginTop: '2rem', padding: '1.1rem', borderTop: '3px solid #059669', display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
          <div><p className="eyebrow" style={{ marginBottom: '0.25rem' }}><span className="ink-line" />Next step</p><h2 style={{ margin: 0, fontSize: '1.15rem' }}>{isFirst ? 'Use the second detail paragraph to finish the response.' : 'Put the full response together under timed conditions.'}</h2></div>
          <Link className="btn btn-primary" href={isFirst ? '/practica/ielts/academic/writing/task1/body-2' : '/practica/ielts/academic/writing/task1/tarea-completa'}>{isFirst ? 'Go to Body 2 →' : 'Go to Complete Task →'}</Link>
        </section>
      </div>
    </section>
  );
}
