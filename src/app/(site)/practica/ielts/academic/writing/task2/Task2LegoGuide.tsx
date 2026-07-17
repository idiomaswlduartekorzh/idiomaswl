'use client';

import Link from 'next/link';

const LEGO_BLOCKS = [
  {
    n: 1,
    name: 'Read the prompt',
    route: '/practica/ielts/academic/writing/task2/tipo-ensayo',
    skill: 'Detect the question type and final instruction.',
    output: 'Know whether to give an opinion, discuss, diagnose, evaluate pros and cons or answer two questions.',
  },
  {
    n: 2,
    name: 'Paraphrasing',
    route: '/practica/ielts/academic/writing/task2/introduccion',
    skill: 'Rewrite the topic without copying long phrases.',
    output: 'The first sentence of the introduction.',
  },
  {
    n: 3,
    name: 'Take a position',
    route: '/practica/ielts/academic/writing/task2/introduccion',
    skill: 'Choose a stance, balance or roadmap according to the type.',
    output: 'A clear thesis that matches the question.',
  },
  {
    n: 4,
    name: 'Body 1',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'Topic sentence + explanation + example + closing link.',
    output: 'The first argument or first question answered.',
  },
  {
    n: 5,
    name: 'Body 2',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'Second argument, opposing view, solution or Q2.',
    output: 'The second development block without losing coherence.',
  },
  {
    n: 6,
    name: 'Linking words',
    route: '/practica/ielts/academic/writing/task2/linking-language',
    skill: 'Connect logical functions: contrast, cause, example, result and conclusion.',
    output: 'Natural cohesion instead of a memorised chain of linkers.',
  },
  {
    n: 7,
    name: 'Syllogism',
    route: '/practica/ielts/academic/writing/task2/parrafos-cuerpo',
    skill: 'General premise + specific case + controlled conclusion.',
    output: 'Arguments that move logically from one idea to the next.',
  },
  {
    n: 8,
    name: 'Conclusion',
    route: '/practica/ielts/academic/writing/task2/conclusion',
    skill: 'Restate the thesis and close without new information.',
    output: 'A brief, evaluative final paragraph.',
  },
  {
    n: 9,
    name: 'Final critical reading',
    route: '/practica/ielts/academic/writing/task2/tarea-completa',
    skill: 'Read like an examiner: instruction, position, development, cohesion and errors.',
    output: 'A quick correction pass before submitting.',
  },
  {
    n: 10,
    name: 'Complete task',
    route: '/practica/ielts/academic/writing/task2/tarea-completa',
    skill: '40 minutes, 250+ words and a global review.',
    output: 'A complete essay with a checklist and model answer.',
  },
];

const LINKING_FUNCTIONS = [
  ['Addition', 'moreover, furthermore, in addition, likewise'],
  ['Contrast', 'however, nevertheless, whereas, by contrast'],
  ['Cause', 'because, since, as a result of, due to'],
  ['Result', 'therefore, consequently, hence, as a result'],
  ['Example', 'for example, for instance, such as, this can be seen in'],
  ['Concession', 'although, even though, despite this, admittedly'],
  ['Conclusion', 'overall, in conclusion, ultimately, for these reasons'],
];

const SYLLOGISM_MOVES = [
  {
    label: 'General premise',
    example: 'When children spend most of their free time online, they have fewer opportunities to practise face-to-face communication.',
  },
  {
    label: 'Specific case',
    example: 'For example, a teenager who studies and socialises mainly through a screen may avoid group activities at school.',
  },
  {
    label: 'Logical conclusion',
    example: 'As a result, excessive screen time can weaken social confidence rather than simply change the medium of interaction.',
  },
];

const SENTENCE_TYPES = [
  {
    label: 'Claim sentence',
    function: 'Presents the central point of the paragraph.',
    example: 'Public transport is a more efficient use of urban space than private cars.',
  },
  {
    label: 'Complex cause sentence',
    function: 'Explains why something happens using because, since, as or due to.',
    example: 'Because buses carry many passengers in limited space, they reduce congestion more effectively than road expansion.',
  },
  {
    label: 'Concession sentence',
    function: 'Acknowledges an objection without abandoning your position.',
    example: 'Although road construction may relieve traffic temporarily, it often encourages more car use in the long term.',
  },
  {
    label: 'Result sentence',
    function: 'Closes a logical chain with therefore, as a result or consequently.',
    example: 'Consequently, governments should prioritise mass transit when planning urban infrastructure.',
  },
];

export default function Task2LegoGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Writing Task 2 Lego system
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(5,150,105,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            An essay becomes manageable when every sentence has a function.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            Treat each part as a block: if a block has no function, remove it. If a block is missing, the essay loses its structure.
            This flow connects writing, conjunctions and syllogism resources with real IELTS practice.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
          {LEGO_BLOCKS.map((block) => (
            <article key={block.name} style={{ padding: '0.95rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <p style={{ margin: '0 0 0.3rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.72rem' }}>
                BLOCK {block.n}
              </p>
              <h3 style={{ margin: '0 0 0.35rem', fontSize: '0.96rem' }}>{block.name}</h3>
              <p style={{ margin: '0 0 0.45rem', color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{block.skill}</p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--muted)', lineHeight: 1.45, fontSize: '0.76rem' }}>
                <strong>Output:</strong> {block.output}
              </p>
              <Link href={block.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.8rem', textDecoration: 'none' }}>
                Practise →
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.85rem', marginTop: '1rem' }}>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(15,61,140,0.18)', background: 'rgba(15,61,140,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Conjunctions and linking phrases by function</h3>
          {LINKING_FUNCTIONS.map(([fn, words]) => (
            <p key={fn} style={{ margin: '0 0 0.35rem', color: 'var(--ink-2)', fontSize: '0.82rem', lineHeight: 1.45 }}>
              <strong>{fn}:</strong> <span style={{ fontFamily: 'var(--mono)', color: '#0f3d8c' }}>{words}</span>
            </p>
          ))}
        </article>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(124,58,237,0.18)', background: 'rgba(124,58,237,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Syllogism applied to a body paragraph</h3>
          {SYLLOGISM_MOVES.map((move) => (
            <div key={move.label} style={{ marginBottom: '0.55rem' }}>
              <p style={{ margin: '0 0 0.2rem', color: '#7c3aed', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.76rem' }}>{move.label}</p>
              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{move.example}</p>
            </div>
          ))}
        </article>
        <article style={{ padding: '1rem', borderRadius: 8, border: '1px solid rgba(217,119,6,0.2)', background: 'rgba(217,119,6,0.05)' }}>
          <h3 style={{ margin: '0 0 0.55rem', fontSize: '0.98rem' }}>Sentence types for building arguments</h3>
          {SENTENCE_TYPES.map((sentence) => (
            <div key={sentence.label} style={{ marginBottom: '0.55rem' }}>
              <p style={{ margin: '0 0 0.2rem', color: '#d97706', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.76rem' }}>{sentence.label}</p>
              <p style={{ margin: '0 0 0.18rem', color: 'var(--muted)', lineHeight: 1.45, fontSize: '0.78rem' }}>{sentence.function}</p>
              <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.5, fontSize: '0.82rem' }}>{sentence.example}</p>
            </div>
          ))}
        </article>
      </div>
    </section>
  );
}
