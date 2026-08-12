'use client';

import { useState } from 'react';
import styles from './InternationalReadingSkillLesson.module.css';

type Item = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation: string;
};

export default function InternationalQuestionTypePractice({
  name,
  accent,
  target,
  evidence,
  risk,
  weak,
  strong,
}: {
  name: string;
  accent: string;
  target: string;
  evidence: string;
  risk: string;
  weak: string;
  strong: string;
}) {
  const items: Item[] = [
    {
      id: 'target',
      question: `What should control your first decision in ${name}?`,
      options: [target, 'The longest option on the screen', 'The topic you know most about'],
      answer: 0,
      explanation: `The task target is ${target.toLowerCase()}. Naming that target prevents a familiar word from controlling the answer.`,
    },
    {
      id: 'evidence',
      question: 'Which evidence plan is the most reliable?',
      options: [evidence, 'Choose by memory after reading once', 'Use outside knowledge when the passage feels unclear'],
      answer: 0,
      explanation: `${evidence} gives you a repeatable passage-based check. IELTS Reading decisions must be supported by the text.`,
    },
    {
      id: 'contrast',
      question: 'Which move demonstrates stronger control?',
      options: [weak, strong, `Ignore the main risk: ${risk.toLowerCase()}.`],
      answer: 1,
      explanation: `The strong move connects the task target to evidence and directly controls ${risk.toLowerCase()}.`,
    },
  ];
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const completed = Object.keys(answers).length;
  const correct = items.filter((item) => answers[item.id] === item.answer).length;

  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 18, borderTop: `4px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.8rem', alignItems: 'start', flexWrap: 'wrap', marginBottom: '1rem' }}>
        <div>
          <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Evidence clinic</p>
          <h3 style={{ margin: 0, color: 'var(--ink)', fontSize: '1.25rem' }}>Three decisions before the full bank</h3>
          <p style={{ margin: '0.4rem 0 0', color: 'var(--muted)', lineHeight: 1.6 }}>Choose once, read the explanation, then state the rule in your own words.</p>
        </div>
        <span aria-live="polite" style={{ color: accent, fontFamily: 'var(--mono)', fontWeight: 900, fontSize: '0.78rem' }}>
          {completed}/3 complete · {correct} correct
        </span>
      </div>
      <div style={{ display: 'grid', gap: '0.9rem' }}>
        {items.map((item, itemIndex) => {
          const selected = answers[item.id];
          return (
            <fieldset key={item.id} style={{ border: '1px solid var(--line-soft)', borderRadius: 14, padding: '0.9rem', margin: 0 }}>
              <legend style={{ padding: '0 0.3rem', color: 'var(--ink)', fontWeight: 900 }}>{itemIndex + 1}. {item.question}</legend>
              <div style={{ display: 'grid', gap: '0.55rem', marginTop: '0.4rem' }}>
                {item.options.map((option, optionIndex) => {
                  const isSelected = selected === optionIndex;
                  const isCorrect = selected !== undefined && optionIndex === item.answer;
                  return (
                    <button
                      key={option}
                      type="button"
                      disabled={selected !== undefined}
                      aria-pressed={isSelected}
                      onClick={() => setAnswers((current) => ({ ...current, [item.id]: optionIndex }))}
                      className={styles.choiceButton}
                      style={{
                        minHeight: 48, padding: '0.75rem', borderRadius: 12, textAlign: 'left', cursor: selected === undefined ? 'pointer' : 'default',
                        border: `1px solid ${isCorrect ? '#059669' : isSelected ? '#dc2626' : 'var(--line-soft)'}`,
                        background: isCorrect ? 'rgba(5,150,105,.09)' : isSelected ? 'rgba(220,38,38,.08)' : 'var(--bg-2)', color: 'var(--ink-2)',
                      }}
                    >
                      <strong style={{ color: accent, marginRight: '0.45rem' }}>{String.fromCharCode(65 + optionIndex)}.</strong>{option}
                    </button>
                  );
                })}
              </div>
              {selected !== undefined && (
                <p role="status" style={{ margin: '0.75rem 0 0', color: 'var(--muted)', lineHeight: 1.65 }}>
                  <strong style={{ color: selected === item.answer ? '#047857' : '#b91c1c' }}>{selected === item.answer ? 'Correct.' : `Best answer: ${String.fromCharCode(65 + item.answer)}.`}</strong>{' '}
                  {item.explanation}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>
      {completed === items.length && (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: '0.9rem' }} onClick={() => setAnswers({})}>Try the clinic again</button>
      )}
    </section>
  );
}
