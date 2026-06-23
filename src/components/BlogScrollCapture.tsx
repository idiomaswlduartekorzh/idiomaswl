'use client';

import { useEffect, useState, useRef } from 'react';
import { saveLead } from '@/lib/actions/saveLead';

const WA = '573005004253';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

interface Props {
  slug: string;
  category: string;
  waMsg: string;
}

export function BlogScrollCapture({ slug, category, waMsg }: Props) {
  const [visible, setVisible] = useState(false);
  const [gone, setGone] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [err, setErr] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem('wl_blog_lead_captured')) { setGone(true); return; }
    } catch {}
    const onScroll = () => {
      const pct = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (pct >= 0.70) setVisible(true);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (visible && !gone && status === 'idle') inputRef.current?.focus();
  }, [visible, gone, status]);

  function dismiss() {
    setGone(true);
    try { localStorage.setItem('wl_blog_lead_captured', '1'); } catch {}
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) { setErr('El WhatsApp es requerido.'); return; }
    setStatus('loading'); setErr('');
    const params = new URLSearchParams(window.location.search);
    await saveLead({
      name,
      whatsapp: phone,
      source: 'blog',
      examSlug: slug,
      examScore: category,
      utmSource:   params.get('utm_source') ?? undefined,
      utmMedium:   params.get('utm_medium') ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
    });
    try { localStorage.setItem('wl_blog_lead_captured', '1'); } catch {}
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ event: 'lead_blog', blog_slug: slug, blog_category: category });
    setStatus('success');
  }

  if (gone || !visible) return null;

  const waLink = `https://wa.me/${WA}?text=${encodeURIComponent(waMsg)}`;

  return (
    <>
      <style>{`
        .wl-bsc-wrap {
          position: fixed; bottom: 1.25rem; right: 1.25rem; z-index: 9900;
          width: min(380px, calc(100vw - 2rem));
          background: #0d1b4b;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 18px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.45);
          padding: 1.35rem 1.4rem 1.25rem;
          animation: wl-bsc-up 0.35s cubic-bezier(0.22,1,0.36,1);
        }
        @keyframes wl-bsc-up {
          from { transform: translateY(32px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .wl-bsc-close {
          position: absolute; top: 0.8rem; right: 0.9rem;
          background: rgba(255,255,255,0.08); border: none; border-radius: 50%;
          width: 28px; height: 28px; display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.5); font-size: 0.85rem; cursor: pointer;
        }
        .wl-bsc-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
        .wl-bsc-eyebrow {
          font-size: 0.68rem; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase;
          color: #f87171; font-family: var(--mono); margin: 0 0 0.35rem;
        }
        .wl-bsc-title {
          font-size: 1.05rem; font-weight: 800; color: #fff; line-height: 1.25; margin: 0 0 0.9rem;
        }
        .wl-bsc-row { display: flex; gap: 0.5rem; margin-bottom: 0.6rem; }
        .wl-bsc-input {
          flex: 1; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.14);
          border-radius: 9px; padding: 0.55rem 0.8rem; font-size: 0.9rem; color: #fff;
          font-family: inherit; outline: none;
        }
        .wl-bsc-input::placeholder { color: rgba(255,255,255,0.3); }
        .wl-bsc-input:focus { border-color: rgba(200,32,46,0.6); background: rgba(255,255,255,0.11); }
        .wl-bsc-btn {
          padding: 0.55rem 1rem; background: #c8202e; color: #fff;
          border: none; border-radius: 9px; font-size: 0.9rem; font-weight: 700;
          font-family: inherit; cursor: pointer; white-space: nowrap;
        }
        .wl-bsc-btn:hover:not(:disabled) { background: #a51724; }
        .wl-bsc-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .wl-bsc-err { font-size: 0.78rem; color: #f87171; margin: -0.25rem 0 0.5rem; }
        .wl-bsc-skip {
          font-size: 0.75rem; color: rgba(255,255,255,0.3); background: none; border: none;
          cursor: pointer; font-family: inherit; margin-top: 0.15rem;
        }
        .wl-bsc-skip:hover { color: rgba(255,255,255,0.55); }
        .wl-bsc-success { text-align: center; padding: 0.25rem 0; }
        .wl-bsc-success-title { font-size: 1rem; font-weight: 800; color: #fff; margin: 0 0 0.35rem; }
        .wl-bsc-success-desc { font-size: 0.82rem; color: rgba(255,255,255,0.6); margin: 0 0 1rem; line-height: 1.5; }
        .wl-bsc-wa {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: #25D366; color: #fff; padding: 0.6rem 1.25rem; border-radius: 10px;
          font-weight: 700; font-size: 0.9rem; text-decoration: none;
        }
        .wl-bsc-wa:hover { background: #1da851; }
      `}</style>

      <div className="wl-bsc-wrap" role="complementary" aria-label="Clase de diagnóstico gratis">
        <button className="wl-bsc-close" onClick={dismiss} aria-label="Cerrar">✕</button>

        {status === 'success' ? (
          <div className="wl-bsc-success">
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
            <p className="wl-bsc-success-title">¡Listo, {name.split(' ')[0] || 'gracias'}!</p>
            <p className="wl-bsc-success-desc">Te contactaremos pronto para coordinar tu clase diagnóstico.</p>
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="wl-bsc-wa">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
              </svg>
              Escribir por WhatsApp
            </a>
            <br />
            <button className="wl-bsc-skip" onClick={dismiss} style={{ marginTop: '0.6rem' }}>Cerrar</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <p className="wl-bsc-eyebrow">WeLearn · Gratis</p>
            <h2 className="wl-bsc-title">¿Te gustaría una clase de diagnóstico gratis?</h2>
            <div className="wl-bsc-row">
              <input
                ref={inputRef}
                className="wl-bsc-input"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={100}
                autoComplete="name"
                style={{ minWidth: 0 }}
              />
            </div>
            <div className="wl-bsc-row">
              <input
                className="wl-bsc-input"
                type="tel"
                placeholder="WhatsApp *"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                maxLength={20}
                required
                autoComplete="tel"
                style={{ minWidth: 0 }}
              />
              <button type="submit" className="wl-bsc-btn" disabled={status === 'loading'}>
                {status === 'loading' ? '…' : 'Enviar'}
              </button>
            </div>
            {err && <p className="wl-bsc-err">{err}</p>}
            <button type="button" className="wl-bsc-skip" onClick={dismiss}>
              Omitir por ahora
            </button>
          </form>
        )}
      </div>
    </>
  );
}
