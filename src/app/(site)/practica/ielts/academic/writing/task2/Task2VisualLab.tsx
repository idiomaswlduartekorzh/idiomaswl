'use client';

type EssayType = 'Opinion' | 'Discussion' | 'Problem–Solution' | 'Advantages–Disadvantages' | 'Direct Questions';

const TYPE_DATA: Record<EssayType, { thesis: string; body1: string; body2: string; conclusion: string }> = {
  Opinion: {
    thesis: 'clear position',
    body1: 'strongest reason',
    body2: 'second reason / concession',
    conclusion: 'restated position',
  },
  Discussion: {
    thesis: 'both views + opinion',
    body1: 'View A',
    body2: 'View B + evaluation',
    conclusion: 'balanced opinion',
  },
  'Problem–Solution': {
    thesis: 'diagnosis + response',
    body1: 'causes / effects',
    body2: 'targeted solutions',
    conclusion: 'solution summary',
  },
  'Advantages–Disadvantages': {
    thesis: 'balance / outweigh',
    body1: 'advantages',
    body2: 'disadvantages + judgement',
    conclusion: 'final balance',
  },
  'Direct Questions': {
    thesis: 'roadmap: Q1 + Q2',
    body1: 'answer Q1',
    body2: 'answer Q2',
    conclusion: 'both answers joined',
  },
};

const COLORS = ['#0f3d8c', '#059669', '#7c3aed', '#d97706', '#dc2626'];

export function Task2EssayArchitectureVisual({ type }: { type: EssayType }) {
  const data = TYPE_DATA[type];
  const markerId = `task2-arrow-${type.toLowerCase().replace(/[^a-z]+/g, '-')}`;
  const blocks = [
    ['1', 'Introduction', 'paraphrase', COLORS[0]],
    ['2', 'Thesis', data.thesis, COLORS[1]],
    ['3', 'Body 1', data.body1, COLORS[2]],
    ['4', 'Body 2', data.body2, COLORS[3]],
    ['5', 'Conclusion', data.conclusion, COLORS[4]],
  ] as const;

  return (
    <svg viewBox="0 0 760 238" style={{ width: '100%', display: 'block' }} role="img" aria-label={`${type} IELTS Writing Task 2 essay architecture`} focusable="false">
      <desc>{type} essay architecture: introduction, thesis, two body paragraphs and conclusion. This is an original WeLearn learning visual, not an official IELTS document.</desc>
      <rect x="8" y="8" width="744" height="222" rx="16" fill="var(--bg)" stroke="var(--line-soft)" />
      <text x="28" y="34" fontSize="13" fontWeight="900" fill="var(--ink)">{type} essay architecture</text>
      <text x="28" y="53" fontSize="10" fill="var(--muted)">Original WeLearn visual: each paragraph has one job.</text>
      {blocks.map(([number, label, detail, color], i) => {
        const x = 24 + i * 144;
        return (
          <g key={label}>
            {i < blocks.length - 1 && <path d={`M ${x + 126} 133 H ${x + 140}`} stroke="#0f3d8c" strokeWidth="2.5" markerEnd={`url(#${markerId})`} />}
            <rect x={x} y="78" width="122" height="110" rx="12" fill="var(--bg-2)" stroke="var(--line-soft)" />
            <rect x={x} y="78" width="122" height="8" rx="4" fill={color} />
            <circle cx={x + 22} cy="108" r="14" fill={color} />
            <text x={x + 22} y="113" textAnchor="middle" fontSize="11" fontWeight="900" fill="#fff">{number}</text>
            <text x={x + 12} y="142" fontSize="11" fontWeight="900" fill="var(--ink)">{label}</text>
            <foreignObject x={x + 12} y="150" width="100" height="30">
              <p style={{ margin: 0, color: 'var(--muted)', fontSize: 10, lineHeight: 1.25 }}>{detail}</p>
            </foreignObject>
          </g>
        );
      })}
      <defs>
        <marker id={markerId} markerWidth="9" markerHeight="9" refX="8" refY="3" orient="auto">
          <path d="M0,0 L0,6 L8,3 z" fill="#0f3d8c" />
        </marker>
      </defs>
    </svg>
  );
}

export const TASK2_VISUAL_TYPES = Object.keys(TYPE_DATA) as EssayType[];
