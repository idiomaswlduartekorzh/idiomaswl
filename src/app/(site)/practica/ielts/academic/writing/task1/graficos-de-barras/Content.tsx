'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Task1VisualPanel from '../Task1VisualPanel';
import Task1BrandedVisualGallery from '../Task1BrandedVisualGallery';

type Faq = {
  question: string;
  answer: string;
};

type Category = {
  label: string;
  campus: number;
  online: number;
};

type OverviewOption = {
  id: string;
  text: string;
  correct: boolean;
  explanation: string;
};

type GroupOption = {
  id: string;
  text: string;
  useful: boolean;
  explanation: string;
};

const CATEGORIES: Category[] = [
  { label: 'Business', campus: 74, online: 52 },
  { label: 'Engineering', campus: 68, online: 41 },
  { label: 'Design', campus: 46, online: 63 },
  { label: 'Health', campus: 58, online: 35 },
  { label: 'Languages', campus: 31, online: 70 },
];

const OVERVIEWS: OverviewOption[] = [
  {
    id: 'strong',
    text: 'Overall, campus students were more likely to choose Business, Engineering and Health, while online learners preferred Languages and Design, with Languages showing the highest online figure.',
    correct: true,
    explanation:
      'Correct. Summarise the central contrast between the two groups and mention the dominant category without listing every figure.',
  },
  {
    id: 'list',
    text: 'Overall, Business was 74% on campus and 52% online, Engineering was 68% and 41%, Design was 46% and 63%, Health was 58% and 35%, and Languages was 31% and 70%.',
    correct: false,
    explanation:
      'This is not an overview: it is a list of data. An overview should interpret the pattern rather than copy every bar.',
  },
  {
    id: 'wrong',
    text: 'Overall, online learners chose every subject more often than campus students, especially Business and Engineering.',
    correct: false,
    explanation:
      'Incorrect. Online is higher than campus only in Design and Languages; campus is higher in Business and Engineering.',
  },
];

const GROUPS: GroupOption[] = [
  {
    id: 'campus-high',
    text: 'Group Business and Engineering together because both are high on campus and lower online.',
    useful: true,
    explanation:
      'Strong. It groups categories with the same behaviour and supports a compact paragraph with direct comparison.',
  },
  {
    id: 'online-high',
    text: 'Group Languages and Design together because both are higher online than on campus.',
    useful: true,
    explanation:
      'Strong. This group clearly contrasts with Business and Engineering and helps build the second body paragraph.',
  },
  {
    id: 'health',
    text: 'Mention Health as a supporting campus-preferred category, but not as the headline trend.',
    useful: true,
    explanation:
      'Useful. Health reinforces the campus pattern, although it is not as high as Business or Engineering.',
  },
  {
    id: 'visual-order',
    text: 'Describe the bars in the exact left-to-right order shown in the chart.',
    useful: false,
    explanation:
      'Weak. Visual order is rarely the best structure; in IELTS Task 1, grouping by pattern is more effective.',
  },
  {
    id: 'cause',
    text: 'Explain that online learners preferred Languages because language apps are popular.',
    useful: false,
    explanation:
      'Not useful. The chart does not provide causes; Task 1 describes data rather than inventing external explanations.',
  },
];

const MODEL_ANSWER = [
  {
    label: 'Introduction',
    text: 'The bar chart compares the proportions of campus-based and online students who selected five subject areas in 2024.',
    note: 'Paraphrase the prompt and make the unit clear: student proportions.',
  },
  {
    label: 'Overview',
    text: 'Overall, campus students showed stronger preferences for Business, Engineering and Health, whereas online learners were more likely to choose Languages and Design. The highest figure was for Business among campus students, while Languages was the leading online subject.',
    note: 'Present the main contrast and the leader in each group without overloading the response with figures.',
  },
  {
    label: 'Body 1',
    text: 'Business was the most popular campus subject, at 74%, compared with 52% among online learners. A similar pattern can be seen in Engineering, where the campus figure stood at 68%, substantially above the online figure of 41%.',
    note: 'Group two categories with the same pattern: higher campus figures and lower online figures.',
  },
  {
    label: 'Body 2',
    text: 'By contrast, online students were more likely to choose Languages and Design, at 70% and 63% respectively, while the corresponding campus figures were 31% and 46%. Health also favored campus learners, with 58% choosing it compared with only 35% online.',
    note: 'Close with the opposite contrast and add Health as supporting evidence rather than the main idea.',
  },
];

const INTERNAL_LINKS = [
  { href: '/practica/ielts/academic/writing/task1', label: 'Task 1 hub' },
  { href: '/practica/ielts/academic/writing/task1/graficos-lineales', label: 'Line graphs' },
  { href: '/practica/ielts/academic/writing/task1/overview', label: 'Overview' },
  { href: '/practica/ielts/academic/writing/task1/comparaciones', label: 'Comparisons' },
  { href: '/practica/ielts/academic/writing/task1/vocabulario', label: 'Data vocabulary' },
  { href: '/practica/ielts/academic/writing/task1/tarea-completa', label: 'Full task' },
];

function BarChart() {
  const width = 680;
  const height = 330;
  const pad = { top: 24, right: 28, bottom: 58, left: 72 };
  const chartWidth = width - pad.left - pad.right;
  const chartHeight = height - pad.top - pad.bottom;
  const max = 80;
  const groupWidth = chartWidth / CATEGORIES.length;
  const barWidth = Math.min(28, groupWidth * 0.28);
  const y = (value: number) => pad.top + chartHeight - (value / max) * chartHeight;
  const ticks = [0, 20, 40, 60, 80];

  return (
    <Task1VisualPanel
      eyebrow="Original WeLearn practice data"
      title="Subject choices by study mode in 2024"
      caption="Figures show the percentage of students selecting each subject area. Compare category rank and the gap between modes before selecting details."
      kind="Bar chart"
    >
      <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="Bar chart comparing campus and online students by subject choice in 2024" style={{ width: '100%', display: 'block' }}>
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.left} y1={y(tick)} x2={width - pad.right} y2={y(tick)} stroke="var(--line-soft)" />
            <text x={pad.left - 10} y={y(tick) + 4} textAnchor="end" fontSize="11" fill="var(--muted)">
              {tick}%
            </text>
          </g>
        ))}
        {CATEGORIES.map((category, index) => {
          const groupX = pad.left + index * groupWidth + groupWidth / 2;
          const campusHeight = chartHeight - (y(category.campus) - pad.top);
          const onlineHeight = chartHeight - (y(category.online) - pad.top);
          return (
            <g key={category.label}>
              <rect x={groupX - barWidth - 3} y={y(category.campus)} width={barWidth} height={campusHeight} rx="4" fill="#0f3d8c" />
              <rect x={groupX + 3} y={y(category.online)} width={barWidth} height={onlineHeight} rx="4" fill="#047857" />
              <text x={groupX} y={height - 27} textAnchor="middle" fontSize="11" fill="var(--muted)">
                {category.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.65rem' }}>
        {[
          ['#0f3d8c', 'Campus'],
          ['#047857', 'Online'],
        ].map(([color, label]) => (
          <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.78rem' }}>
            <span style={{ width: 18, height: 10, borderRadius: 3, background: color }} />
            {label}
          </span>
        ))}
      </div>
    </Task1VisualPanel>
  );
}

function OptionCard({
  selected,
  revealed,
  positive,
  text,
  explanation,
  onClick,
}: {
  selected: boolean;
  revealed: boolean;
  positive: boolean;
  text: string;
  explanation: string;
  onClick: () => void;
}) {
  let border = selected ? '2px solid #0f3d8c' : '1px solid var(--line-soft)';
  let background = selected ? 'rgba(15,61,140,0.06)' : 'var(--bg-2)';

  if (revealed && selected && positive) {
    border = '2px solid rgba(4,120,87,0.55)';
    background = 'rgba(4,120,87,0.08)';
  } else if (revealed && selected && !positive) {
    border = '2px solid rgba(185,28,28,0.45)';
    background = 'rgba(185,28,28,0.06)';
  } else if (revealed && !selected && positive) {
    border = '1.5px solid rgba(180,83,9,0.45)';
    background = 'rgba(180,83,9,0.06)';
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={revealed}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '0.9rem 1rem',
        borderRadius: 8,
        border,
        background,
        color: 'var(--ink)',
        cursor: revealed ? 'default' : 'pointer',
      }}
    >
      <span style={{ display: 'block', fontSize: '0.9rem', lineHeight: 1.55 }}>{text}</span>
      {revealed && (
        <span style={{ display: 'block', marginTop: '0.55rem', color: 'var(--muted)', fontSize: '0.82rem', lineHeight: 1.55 }}>
          <strong style={{ color: positive ? '#047857' : '#991b1b' }}>{positive ? 'Strong choice: ' : 'Caution: '}</strong>
          {explanation}
        </span>
      )}
    </button>
  );
}

export default function GraficosDeBarrasContent({ faqs }: { faqs: Faq[] }) {
  const [overviewId, setOverviewId] = useState<string | null>(null);
  const [overviewRevealed, setOverviewRevealed] = useState(false);
  const [groupIds, setGroupIds] = useState<Set<string>>(new Set());
  const [groupsRevealed, setGroupsRevealed] = useState(false);

  const groupScore = useMemo(
    () => [...groupIds].filter((id) => GROUPS.find((group) => group.id === id)?.useful).length,
    [groupIds],
  );

  function toggleGroup(id: string) {
    if (groupsRevealed) return;
    setGroupIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 820, margin: '0 auto' }}>
          <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts/academic/writing/task1" className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
              Task 1
            </Link>
            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>IELTS / Academic Writing / Bar charts</span>
          </nav>

          <p className="eyebrow" style={{ marginBottom: '0.55rem' }}>
            <span className="ink-line" />
            IELTS Academic Writing Task 1
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 0.85rem', fontWeight: 800 }}>
            Bar charts in IELTS Writing Task 1
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1rem', maxWidth: 720 }}>
            Practise how to transform a bar chart into an organised response: read categories, identify rankings, group bars and compare differences without describing every item.
          </p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, margin: '0 0 1rem', maxWidth: 720 }}>
            The practice includes explained answers for overviews and grouping, plus an annotated Task 1 model response.
          </p>

          <div className="wl-card" style={{ padding: '1rem 1.1rem', marginBottom: '1.35rem', borderRadius: 8 }}>
            <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Official format versus WeLearn strategy</h2>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>Official format:</strong> IELTS Academic Writing Task 1 asks you to describe visual information. A bar chart belongs to this family of visuals, but we do not present it as a separate official task.
            </p>
            <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65 }}>
              <strong style={{ color: 'var(--ink)' }}>WeLearn strategy:</strong> we practise bar charts separately because they reward selective comparison: leaders, lows, large gaps, group patterns and exceptions.
            </p>
          </div>

          <section aria-labelledby="workflow-heading">
            <h2 id="workflow-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.65rem' }}>
              Workflow for a bar chart
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', marginBottom: '1.25rem' }}>
              {[
                ['1', 'Define the categories', 'Identify what each bar compares and the unit: percentage, number, money or frequency.'],
                ['2', 'Find the rankings', 'Look for the highest and lowest bars and whether one group dominates several categories.'],
                ['3', 'Group by pattern', 'Combine similar or contrasting categories; do not follow visual order if it does not help.'],
                ['4', 'Select meaningful gaps', 'Use figures where the difference matters rather than repeating every value.'],
              ].map(([step, title, copy]) => (
                <article key={step} className="wl-card" style={{ padding: '0.95rem', borderRadius: 8 }}>
                  <span style={{ display: 'inline-flex', width: 28, height: 28, alignItems: 'center', justifyContent: 'center', borderRadius: 6, background: 'rgba(15,61,140,0.09)', color: 'var(--wl-on-panel-link, #0f3d8c)', fontWeight: 800, fontFamily: 'var(--mono)', marginBottom: '0.55rem' }}>
                    {step}
                  </span>
                  <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.98rem' }}>{title}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.55 }}>{copy}</p>
                </article>
              ))}
            </div>
          </section>

          <Task1BrandedVisualGallery kind="bar" />

          <section aria-labelledby="practice-heading">
            <h2 id="practice-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '1.5rem 0 0.45rem' }}>
              Guided exercise: overview and bar grouping
            </h2>
            <p style={{ margin: '0 0 0.8rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.92rem' }}>
              The bar chart below compares the percentages of campus-based and online students who selected five subject areas in 2024.
            </p>

            <BarChart />

            <h3 style={{ margin: '0 0 0.65rem', fontSize: '1.05rem' }}>Step 1: choose the strongest overview</h3>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {OVERVIEWS.map((option) => (
                <OptionCard
                  key={option.id}
                  selected={overviewId === option.id}
                  revealed={overviewRevealed}
                  positive={option.correct}
                  text={option.text}
                  explanation={option.explanation}
                  onClick={() => setOverviewId(option.id)}
                />
              ))}
            </div>
            {!overviewRevealed && (
              <button className="btn btn-sm" type="button" disabled={!overviewId} onClick={() => setOverviewRevealed(true)} style={{ opacity: overviewId ? 1 : 0.5, marginBottom: '1.25rem' }}>
                Check overview
              </button>
            )}

            <h3 style={{ margin: '1.15rem 0 0.65rem', fontSize: '1.05rem' }}>Step 2: decide how to group the data</h3>
            <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
              Select the structural decisions that would produce a clearer response.
            </p>
            <div style={{ display: 'grid', gap: '0.65rem', marginBottom: '0.85rem' }}>
              {GROUPS.map((group) => (
                <OptionCard
                  key={group.id}
                  selected={groupIds.has(group.id)}
                  revealed={groupsRevealed}
                  positive={group.useful}
                  text={group.text}
                  explanation={group.explanation}
                  onClick={() => toggleGroup(group.id)}
                />
              ))}
            </div>
            {!groupsRevealed ? (
              <button className="btn btn-sm" type="button" disabled={groupIds.size === 0} onClick={() => setGroupsRevealed(true)} style={{ opacity: groupIds.size ? 1 : 0.5, marginBottom: '1rem' }}>
                Review the grouping
              </button>
            ) : (
              <div className="wl-card" style={{ padding: '0.9rem 1rem', borderRadius: 8, marginBottom: '1rem', background: 'rgba(15,61,140,0.05)' }}>
                <p style={{ margin: 0, color: 'var(--ink)', fontWeight: 700 }}>
                  Result: {groupScore} of {GROUPS.filter((group) => group.useful).length} strong decisions selected.
                </p>
              </div>
            )}
          </section>

          <section aria-labelledby="model-heading" style={{ marginTop: '1.5rem' }}>
            <h2 id="model-heading" style={{ fontSize: '1.35rem', letterSpacing: '-0.02em', margin: '0 0 0.8rem' }}>
              Explained model response
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {MODEL_ANSWER.map((part) => (
                <article key={part.label} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.95rem', color: 'var(--wl-on-panel-link, #0f3d8c)' }}>{part.label}</h3>
                  <p style={{ margin: '0 0 0.6rem', color: 'var(--ink)', lineHeight: 1.65, fontSize: '0.92rem' }}>{part.text}</p>
                  <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.82rem' }}>
                    <strong style={{ color: 'var(--ink)' }}>Why it works:</strong> {part.note}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section aria-labelledby="links-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="links-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Keep practising Task 1
            </h2>
            <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
              {INTERNAL_LINKS.map((item) => (
                <Link key={item.href} href={item.href} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </section>

          <section aria-labelledby="faq-heading" style={{ marginTop: '1.6rem' }}>
            <h2 id="faq-heading" style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', margin: '0 0 0.75rem' }}>
              Frequently asked questions
            </h2>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {faqs.map((faq) => (
                <article key={faq.question} className="wl-card" style={{ padding: '1rem', borderRadius: 8 }}>
                  <h3 style={{ margin: '0 0 0.45rem', fontSize: '0.96rem' }}>{faq.question}</h3>
                  <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>{faq.answer}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
