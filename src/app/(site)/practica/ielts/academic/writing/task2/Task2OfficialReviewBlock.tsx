'use client';

import Link from 'next/link';

type RelatedLink = {
  href: string;
  label: string;
};

type Task2OfficialReviewBlockProps = {
  focus: string;
  officialFormat: string;
  welearnStrategy: string;
  answerCheck: string;
  relatedLinks?: RelatedLink[];
};

const IELTS_ACADEMIC_URL = 'https://ielts.org/take-a-test/test-types/ielts-academic-test';
const IELTS_ACADEMIC_SAMPLE_URL = 'https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test';

const DEFAULT_LINKS: RelatedLink[] = [
  { href: '/practica/ielts/academic/writing/rubrica', label: 'Writing rubric' },
  { href: '/practica/ielts/academic/writing/task2', label: 'Task 2 hub' },
  { href: '/practica/ielts/academic/writing/task2/model-answers', label: 'Model answers' },
  { href: '/practica/ielts/general-training', label: 'Compare General Training' },
];

export default function Task2OfficialReviewBlock({
  focus,
  officialFormat,
  welearnStrategy,
  answerCheck,
  relatedLinks = DEFAULT_LINKS,
}: Task2OfficialReviewBlockProps) {
  return (
    <section
      aria-label="Official format versus WeLearn strategy"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '0.85rem',
        margin: '0 0 1.5rem',
      }}
    >
      <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-surface-card)' }}>
        <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Official format versus WeLearn strategy</h2>
        <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
          <strong style={{ color: 'var(--ink)' }}>Official format:</strong> {officialFormat}
        </p>
        <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
          <strong style={{ color: 'var(--ink)' }}>WeLearn strategy:</strong> {welearnStrategy}
        </p>
      </article>
      <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '1rem', background: 'var(--wl-panel-raised, #f8fafc)' }}>
        <h2 style={{ margin: '0 0 0.55rem', fontSize: '1rem' }}>Answer review</h2>
        <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
          <strong style={{ color: 'var(--ink)' }}>Review focus:</strong> {focus}
        </p>
        <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
          <strong style={{ color: 'var(--ink)' }}>Explained answer:</strong> {answerCheck}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          <a
            href={IELTS_ACADEMIC_URL}
            rel="noreferrer"
            target="_blank"
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 999,
              color: 'var(--wl-on-panel-link, #0f3d8c)',
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.25rem 0.55rem',
              textDecoration: 'none',
            }}
          >
            IELTS Academic source
          </a>
          <a
            href={IELTS_ACADEMIC_SAMPLE_URL}
            rel="noreferrer"
            target="_blank"
            style={{
              border: '1px solid var(--line-soft)',
              borderRadius: 999,
              color: 'var(--wl-on-panel-link, #0f3d8c)',
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              fontWeight: 800,
              padding: '0.25rem 0.55rem',
              textDecoration: 'none',
            }}
          >
            IELTS samples
          </a>
          {relatedLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                border: '1px solid var(--line-soft)',
                borderRadius: 999,
                color: 'var(--wl-on-panel-link, #0f3d8c)',
                fontFamily: 'var(--mono)',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.25rem 0.55rem',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </article>
    </section>
  );
}
