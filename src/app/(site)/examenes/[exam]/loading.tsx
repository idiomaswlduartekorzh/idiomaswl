export default function ExamLoading() {
  return (
    <div aria-busy="true" aria-label="Cargando examen…">
      {/* Breadcrumb skeleton */}
      <div style={{ background: 'var(--bg-2)', borderBottom: '1px solid var(--line-soft)', padding: '0.6rem 0' }}>
        <div className="wrap">
          <div className="wl-skeleton" style={{ width: 180, height: 12, borderRadius: 4 }} />
        </div>
      </div>

      {/* Hero infographic skeleton */}
      <div style={{ background: 'var(--bg-2)', padding: '3rem 0 2.5rem' }}>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 700 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div className="wl-skeleton" style={{ width: 56, height: 56, borderRadius: '50%' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="wl-skeleton" style={{ width: 240, height: 28, borderRadius: 6 }} />
              <div className="wl-skeleton" style={{ width: 160, height: 16, borderRadius: 4 }} />
            </div>
          </div>
          <div className="wl-skeleton" style={{ width: '100%', height: 80, borderRadius: 12 }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="wl-skeleton" style={{ height: 64, borderRadius: 10 }} />
            ))}
          </div>
        </div>
      </div>

      {/* Mock grid skeleton */}
      <div className="wrap" style={{ padding: '2.5rem 0' }}>
        <div className="wl-skeleton" style={{ width: 200, height: 22, borderRadius: 5, marginBottom: 20 }} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="wl-skeleton" style={{ height: 110, borderRadius: 12 }} />
          ))}
        </div>
      </div>
    </div>
  );
}
