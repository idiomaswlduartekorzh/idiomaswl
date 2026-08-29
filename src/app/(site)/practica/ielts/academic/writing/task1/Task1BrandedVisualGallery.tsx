'use client';

import { useState } from 'react';
import Image from 'next/image';
import { TASK1_VISUAL_BANK, type Task1VisualBankKind } from './task1-visual-bank';

export default function Task1BrandedVisualGallery({ kind }: { kind: Exclude<Task1VisualBankKind, 'process' | 'map' | 'mixed'> }) {
  const [active, setActive] = useState(0);
  const visuals = TASK1_VISUAL_BANK[kind];
  const visual = visuals[active];

  return (
    <section aria-labelledby={`${kind}-visual-bank-heading`} style={{ margin: '1.5rem 0' }}>
      <div className="wl-card" style={{ padding: '1rem', overflow: 'hidden' }}>
        <p className="eyebrow" style={{ marginBottom: '0.45rem' }}><span className="ink-line" />WeLearn original visual bank</p>
        <h2 id={`${kind}-visual-bank-heading`} style={{ margin: '0 0 0.45rem', fontSize: '1.2rem' }}>Five branded references for visual reading</h2>
        <p style={{ margin: '0 0 0.85rem', color: 'var(--muted)', fontSize: '0.86rem', lineHeight: 1.6 }}>
          Use these separate references to practise identifying the visual story. The guided exercise below keeps its own matched data and answer key.
        </p>
        <div role="tablist" aria-label="Choose a WeLearn visual reference" style={{ display: 'flex', gap: '0.45rem', overflowX: 'auto', paddingBottom: '0.6rem' }}>
          {visuals.map((item, index) => (
            <button
              key={item.src}
              type="button"
              role="tab"
              aria-selected={active === index}
              aria-controls={`${kind}-visual-bank-panel`}
              onClick={() => setActive(index)}
              style={{ flex: '0 0 auto', border: active === index ? '2px solid #0f3d8c' : '1px solid var(--line-soft)', borderRadius: 8, padding: '0.55rem 0.7rem', background: active === index ? 'rgba(15,61,140,0.07)' : 'var(--bg)', color: active === index ? '#0f3d8c' : 'var(--ink-2)', fontSize: '0.74rem', fontWeight: 800, cursor: 'pointer' }}
            >
              {String(index + 1).padStart(2, '0')} · {item.title}
            </button>
          ))}
        </div>
        <div id={`${kind}-visual-bank-panel`} role="tabpanel" style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
          <Image
            key={visual.src}
            src={visual.src}
            alt={visual.alt}
            width={visual.width}
            height={visual.height}
            sizes="(max-width: 768px) 100vw, 820px"
            loading="lazy"
            style={{ display: 'block', width: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </section>
  );
}
