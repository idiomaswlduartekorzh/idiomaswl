export default function OfficialStrategyCard({
  accent,
  official,
  strategy,
}: {
  accent: string;
  official: string;
  strategy: string;
}) {
  return (
    <section className="wl-card" style={{ padding: '1rem', borderRadius: 16, marginBottom: '1rem', borderLeft: `4px solid ${accent}` }}>
      <p className="eyebrow" style={{ margin: '0 0 0.35rem' }}>Formato oficial vs estrategia WeLearn</p>
      <p style={{ margin: 0, color: 'var(--ink-2)', lineHeight: 1.68 }}>
        <strong>Formato oficial:</strong> {official} <strong>Estrategia WeLearn:</strong> {strategy}
      </p>
    </section>
  );
}
