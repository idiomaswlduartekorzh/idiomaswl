// Streaming skeleton shown while the dashboard fetches the user's profile and data
export default function DashboardLoading() {
  return (
    <div
      className="dash-shell"
      aria-busy="true"
      aria-label="Cargando panel…"
      style={{ padding: '2rem 1rem', maxWidth: 960, margin: '0 auto' }}
    >
      {/* Greeting skeleton */}
      <div style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="wl-skeleton" style={{ width: 280, height: 28, borderRadius: 6 }} />
        <div className="wl-skeleton" style={{ width: 180, height: 16, borderRadius: 4 }} />
      </div>

      {/* Stat cards row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="wl-skeleton" style={{ height: 90, borderRadius: 12 }} />
        ))}
      </div>

      {/* Main content area */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="wl-skeleton" style={{ height: 56, borderRadius: 10 }} />
          ))}
        </div>
        <div className="wl-skeleton" style={{ height: 280, borderRadius: 12 }} />
      </div>
    </div>
  );
}
