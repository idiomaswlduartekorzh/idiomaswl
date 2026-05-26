// Streaming skeleton shown while the lesson page fetches from the DB
export default function LessonLoading() {
  return (
    <div className="wl-korean-runtime" aria-busy="true" aria-label="Cargando lección…">
      {/* Header skeleton */}
      <header className="wl-korean-runtime__header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="wl-skeleton" style={{ width: 36, height: 36, borderRadius: '50%' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div className="wl-skeleton" style={{ width: 120, height: 14, borderRadius: 4 }} />
            <div className="wl-skeleton" style={{ width: 80, height: 12, borderRadius: 4 }} />
          </div>
        </div>
        <div className="wl-skeleton" style={{ width: 220, height: 8, borderRadius: 8 }} />
      </header>

      {/* Stage list skeleton */}
      <aside className="wl-korean-runtime__sidebar">
        {Array.from({ length: 11 }).map((_, i) => (
          <div
            key={i}
            className="wl-skeleton"
            style={{ height: 40, borderRadius: 8, marginBottom: 6 }}
          />
        ))}
      </aside>

      {/* Stage panel skeleton */}
      <section className="wl-korean-runtime__stage">
        <div className="wl-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="wl-skeleton" style={{ width: '60%', height: 24, borderRadius: 6 }} />
          <div className="wl-skeleton" style={{ width: '100%', height: 200, borderRadius: 12 }} />
          <div className="wl-skeleton" style={{ width: '80%', height: 16, borderRadius: 4 }} />
          <div className="wl-skeleton" style={{ width: '70%', height: 16, borderRadius: 4 }} />
        </div>
      </section>
    </div>
  );
}
