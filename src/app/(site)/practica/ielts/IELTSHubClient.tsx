import Link from 'next/link';

const COLOR = '#0f3d8c';

const MODALITIES = [
  {
    id: 'academic',
    name: 'IELTS Academic',
    desc: 'Available route for Academic Reading, visual-data Writing Task 1 and argumentative Writing Task 2.',
    href: '/practica/ielts/academic',
    status: 'Available',
  },
  {
    id: 'general-training',
    name: 'IELTS General Training',
    desc: 'A focused hub for official differences, practical Reading and letter-based Writing Task 1 with explained practice.',
    href: '/practica/ielts/general-training',
    status: 'New',
  },
];

const SKILLS = [
  {
    id: 'reading',
    emoji: '📖',
    name: 'Reading',
    eng: 'Reading comprehension',
    desc: 'True/False/Not Given · Matching Headings · Multiple Choice. 60 minutes, 40 questions and 3 academic passages.',
    count: '14 question types · 6 skills',
    href: '/practica/ielts/reading',
    available: true,
  },
  {
    id: 'writing',
    emoji: '✏️',
    name: 'Writing',
    eng: 'Academic writing',
    desc: 'Task 1 (visual data) and Task 2 (argumentative essay). 60 minutes in total and 7 sub-skills per task.',
    count: 'Task 1 · Task 2 · 14+ exercises',
    href: '/practica/ielts/academic/writing',
    available: true,
  },
  {
    id: 'listening',
    emoji: '🎧',
    name: 'Listening',
    eng: 'Listening comprehension',
    desc: 'Four sections with native speakers. 30 minutes of audio plus 10 minutes to transfer answers.',
    count: 'Coming soon',
    href: '#',
    available: false,
  },
  {
    id: 'speaking',
    emoji: '🗣️',
    name: 'Speaking',
    eng: 'Speaking production',
    desc: 'Part 1 (personal questions), Part 2 (a two-minute cue-card talk) and Part 3 (academic discussion).',
    count: 'Coming soon',
    href: '#',
    available: false,
  },
];

const SKILL_COLORS: Record<string, string> = {
  reading: '#0369a1',
  writing: '#0f3d8c',
  listening: '#7c3aed',
  speaking: '#059669',
};

export default function IELTSHubClient() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 900 }}>

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Practice</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>🇬🇧 IELTS</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: COLOR, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 900, flexShrink: 0,
          }}>
            🇬🇧
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.2rem' }}>
              <span className="ink-line" />IELTS — International English Language Testing System
            </p>
            <h1 style={{ fontSize: '2rem', letterSpacing: 0, margin: 0, fontWeight: 700 }}>
              IELTS practice by format and skill
            </h1>
          </div>
        </div>

        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0.5rem 0 1.25rem' }}>
          IELTS has Academic and General Training routes. Reading and Writing include indexable content, original practice and exercises with explained answers.
        </p>

        {/* Band scale */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
          {[
            ['1–4', 'Basic', '#dc2626'],
            ['5', 'Modest', '#f59e0b'],
            ['6', 'Competent', '#0369a1'],
            ['7', 'Good', '#0f3d8c'],
            ['8–9', 'Expert', '#059669'],
          ].map(([band, label, color]) => (
            <span key={band} style={{
              fontSize: '0.72rem', padding: '0.2rem 0.65rem', borderRadius: 20,
              background: `${color}15`, color, border: `1px solid ${color}40`,
              fontFamily: 'var(--mono)', fontWeight: 700,
            }}>
              Band {band} — {label}
            </span>
          ))}
        </div>

        {/* Modality pathways */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {MODALITIES.map(modality => (
            <Link key={modality.id} href={modality.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
              <div style={{
                padding: '1rem',
                borderRadius: 8,
                border: `1px solid ${COLOR}28`,
                background: '#fff',
                height: '100%',
                boxSizing: 'border-box' as const,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <h2 style={{ margin: 0, fontSize: '1rem' }}>{modality.name}</h2>
                  <span style={{ fontSize: '0.68rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)' }}>
                    {modality.status}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55 }}>{modality.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Skills grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
          {SKILLS.map(sk => {
            const c = SKILL_COLORS[sk.id] ?? COLOR;
            const inner = (
              <div style={{
                padding: '1.4rem 1.5rem',
                border: `1.5px solid ${c}33`,
                borderRadius: 18,
                background: `linear-gradient(135deg, ${c}0a 0%, transparent 100%)`,
                borderTop: `3px solid ${sk.available ? c : 'var(--line-soft)'}`,
                height: '100%',
                boxSizing: 'border-box' as const,
                display: 'flex', flexDirection: 'column' as const, gap: '0.6rem',
                opacity: sk.available ? 1 : 0.55,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <span style={{ fontSize: '1.8rem' }}>{sk.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--ink)' }}>{sk.name}</div>
                    <div style={{ fontSize: '0.72rem', color: c, fontFamily: 'var(--mono)', fontWeight: 700, textTransform: 'uppercase' as const, letterSpacing: 0 }}>{sk.eng}</div>
                  </div>
                  {!sk.available && (
                    <span style={{ fontSize: '0.58rem', fontWeight: 800, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)', whiteSpace: 'nowrap' as const }}>
                      COMING SOON
                    </span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.55, flex: 1 }}>{sk.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: sk.available ? c : 'var(--muted)', fontFamily: 'var(--mono)', fontWeight: 700 }}>{sk.count}</span>
                  {sk.available && <span style={{ fontSize: '1rem', color: c, fontWeight: 700 }}>→</span>}
                </div>
              </div>
            );

            return sk.available
              ? <Link key={sk.id} href={sk.href} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>{inner}</Link>
              : <div key={sk.id}>{inner}</div>;
          })}
        </div>

      </div>
    </section>
  );
}
