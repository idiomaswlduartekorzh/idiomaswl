'use client';

import Link from 'next/link';
import { Task2EssayArchitectureVisual } from './Task2VisualLab';

export const TASK2_ESSAY_TYPES = [
  {
    name: 'Opinion',
    route: '/practica/ielts/academic/writing/task2/opinion',
    signal: 'To what extent do you agree or disagree? / Do you agree or disagree?',
    task: 'Take a clear position and defend it throughout the essay.',
    lego: ['Paraphrase the topic', 'Thesis with a position', 'Body 1: main reason', 'Body 2: second reason or refuted concession', 'Conclusion with your position'],
    body1: 'Use a topic sentence with your strongest reason, explain the mechanism and add an example.',
    body2: 'Add a compatible reason or a brief concession followed by a rebuttal.',
    trap: 'Treating both sides equally as if this were a Discussion essay.',
  },
  {
    name: 'Discussion',
    route: '/practica/ielts/academic/writing/task2/discussion',
    signal: 'Discuss both views and give your own opinion.',
    task: 'Explain both positions and then evaluate which one is more convincing.',
    lego: ['Paraphrase the debate', 'Balanced thesis with a final opinion', 'Body 1: View A', 'Body 2: View B + your evaluation', 'Conclusion with your opinion'],
    body1: 'Present one position fairly, with a reason and an example.',
    body2: 'Present the other position and connect it to your own view.',
    trap: 'Forgetting your opinion or adding it only as a decorative sentence.',
  },
  {
    name: 'Problem–Solution',
    route: '/practica/ielts/academic/writing/task2/problem-solution',
    signal: 'What are the causes/problems? What measures/solutions can be taken?',
    task: 'Diagnose causes or problems and propose connected solutions.',
    lego: ['Paraphrase the problem', 'Diagnostic thesis + response', 'Body 1: causes/problems', 'Body 2: solutions that address those causes', 'Conclusion'],
    body1: 'Name one or two concrete causes and show their consequences.',
    body2: 'Propose solutions that address those exact causes.',
    trap: 'Offering generic solutions that do not answer the diagnosis.',
  },
  {
    name: 'Advantages–Disadvantages',
    route: '/practica/ielts/academic/writing/task2/advantages-disadvantages',
    signal: 'Discuss the advantages and disadvantages. / Do the advantages outweigh the disadvantages?',
    task: 'Evaluate the pros and cons of a trend or development.',
    lego: ['Paraphrase the development', 'Thesis with a balance or outweigh judgement', 'Body 1: advantages', 'Body 2: disadvantages + evaluation', 'Balanced conclusion'],
    body1: 'Explain real benefits instead of listing positive words.',
    body2: 'Explain costs or risks and decide which side is stronger if the prompt asks you to.',
    trap: 'Listing pros and cons without answering whether one side outweighs the other.',
  },
  {
    name: 'Direct Questions',
    route: '/practica/ielts/academic/writing/task2/direct-question',
    signal: 'Why is this happening? Is this positive or negative? / What are the reasons? What effects does this have?',
    task: 'Answer two explicit questions without leaving either one incomplete.',
    lego: ['Paraphrase the topic', 'Thesis that announces Q1 + Q2', 'Body 1: answer Q1', 'Body 2: answer Q2', 'Conclusion joining both answers'],
    body1: 'The topic sentence should show that you are answering the first question.',
    body2: 'The topic sentence should show that you are answering the second question.',
    trap: 'Turning the second question into solutions when it asks for an evaluation.',
  },
];

export default function Task2EssayTypeGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />IELTS Writing Task 2 question types
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(15,61,140,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Task 2 is a 250+ word essay written in 40 minutes, but prompts do not all require the same skeleton.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            The final instruction determines the structure. If you misidentify the type, you can write fluent English and still lose
            Task Response. WeLearn trains this as Lego blocks: each question type changes the thesis, body paragraphs and conclusion.
          </p>
        </div>
        <div style={{ padding: '1rem 1.15rem', borderBottom: '1px solid var(--line-soft)', background: 'var(--bg-2)' }}>
          <p style={{ margin: '0 0 0.7rem', color: '#0f3d8c', fontFamily: 'var(--mono)', fontSize: '0.7rem', fontWeight: 900, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Visual architecture: choose the right essay skeleton</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0.75rem' }}>
            {TASK2_ESSAY_TYPES.map((type) => (
              <div key={type.name} style={{ padding: '0.65rem', border: '1px solid var(--line-soft)', borderRadius: 8, background: 'var(--bg)' }}>
                <Task2EssayArchitectureVisual type={type.name as Parameters<typeof Task2EssayArchitectureVisual>[0]['type']} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))' }}>
          {TASK2_ESSAY_TYPES.map((type) => (
            <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem' }}>{type.name}</h3>
              <p style={{ margin: '0 0 0.45rem', color: '#0f3d8c', fontWeight: 800, fontSize: '0.76rem', fontFamily: 'var(--mono)', lineHeight: 1.45 }}>
                {type.signal}
              </p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong>Task:</strong> {type.task}
              </p>
              <ol style={{ margin: '0 0 0.6rem', paddingLeft: '1.05rem', color: 'var(--ink-2)', fontSize: '0.78rem', lineHeight: 1.5 }}>
                {type.lego.map((block) => <li key={block}>{block}</li>)}
              </ol>
              <p style={{ margin: '0 0 0.55rem', color: '#dc2626', lineHeight: 1.45, fontSize: '0.78rem' }}>
                <strong>Common trap:</strong> {type.trap}
              </p>
              <Link href={type.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>
                Practise this question type →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
