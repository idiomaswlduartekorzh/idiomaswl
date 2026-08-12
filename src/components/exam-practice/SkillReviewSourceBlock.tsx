type SourceItem = {
  label: string;
  href?: string;
  note: string;
};

export default function SkillReviewSourceBlock({
  accent,
  skillName,
  sources,
  reviewedFocus,
}: {
  accent: string;
  skillName: string;
  sources: SourceItem[];
  reviewedFocus: string[];
}) {
  return (
    <section className="wl-card" style={{ padding: '1.1rem', borderRadius: 8, marginTop: '1.2rem', borderTop: `3px solid ${accent}` }}>
      <p className="eyebrow" style={{ margin: '0 0 0.45rem' }}>Review and sources</p>
      <h2 style={{ margin: '0 0 0.55rem', fontSize: '1.18rem', letterSpacing: 0 }}>
        How this {skillName} lesson was reviewed
      </h2>
      <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', lineHeight: 1.65, fontSize: '0.9rem' }}>
        This material was reviewed in August 2026 to keep the official IELTS Reading format separate from the WeLearn learning strategy used on this page.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: '0.75rem' }}>
        <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--bg-2)' }}>
          <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '0.98rem' }}>Review focus</h3>
          <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.88rem' }}>
            {reviewedFocus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>

        <article style={{ border: '1px solid var(--line-soft)', borderRadius: 8, padding: '0.85rem', background: 'var(--bg-2)' }}>
          <h3 style={{ margin: '0 0 0.45rem', color: 'var(--ink)', fontSize: '0.98rem' }}>Sources used</h3>
          <div style={{ display: 'grid', gap: '0.55rem' }}>
            {sources.map((source) => (
              <p key={source.label} style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.88rem' }}>
                <strong style={{ color: 'var(--ink)' }}>
                  {source.href ? (
                    <a href={source.href} style={{ color: accent, fontWeight: 900 }}>
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                  :
                </strong>{' '}
                {source.note}
              </p>
            ))}
          </div>
        </article>
      </div>

      <p style={{ margin: '0.85rem 0 0', color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.86rem' }}>
        Scope: these WeLearn exercises support academic-reading practice. They are not official IELTS questions and do not predict a band score by themselves.
      </p>
    </section>
  );
}
