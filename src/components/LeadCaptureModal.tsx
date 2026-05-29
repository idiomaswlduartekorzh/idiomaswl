'use client';

import { useState, useEffect, useRef } from 'react';
import { saveLead } from '@/lib/actions/saveLead';

const WA_NUMBER = '573005004253';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

interface Props {
  examSlug:  string;
  examScore: string;   // e.g. "Overall Band 6.0" or "Total 94/120"
  examName:  string;
  onClose:   () => void;
}

export function LeadCaptureModal({ examSlug, examScore, examName, onClose }: Props) {
  const [name, setName]       = useState('');
  const [phone, setPhone]     = useState('');
  const [email, setEmail]     = useState('');
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus first field on mount
  useEffect(() => { inputRef.current?.focus(); }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) { setErrorMsg('El WhatsApp es requerido.'); return; }

    setStatus('loading');
    setErrorMsg('');

    // Read UTM params from URL
    const params = new URLSearchParams(window.location.search);

    const result = await saveLead({
      name,
      whatsapp: phone,
      email:    email || undefined,
      examSlug,
      examScore,
      source:      'simulacro',
      utmSource:   params.get('utm_source')   ?? undefined,
      utmMedium:   params.get('utm_medium')   ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
    });

    if (!result.ok) {
      setStatus('error');
      setErrorMsg(result.error ?? 'Error al enviar. Intenta de nuevo.');
      return;
    }

    // Mark captured so modal doesn't show again this session
    try { localStorage.setItem('wl_lead_captured', '1'); } catch {}

    // GTM event
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event:      'lead_simulacro',
      exam_slug:  examSlug,
      exam_score: examScore,
    });

    setStatus('success');
  }

  const waMsg = encodeURIComponent(
    `Hola, acabo de hacer el simulacro de ${examName} en WeLearn y obtuve ${examScore}. Quiero saber cómo mejorar mi puntaje.`
  );
  const waHref = `https://wa.me/${WA_NUMBER}?text=${waMsg}`;

  return (
    <>
      <style>{`
        .wl-lead-overlay {
          position: fixed; inset: 0; z-index: 10000;
          background: rgba(10, 12, 26, 0.82);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          padding: 1rem;
          animation: wl-lead-fadein 0.25s ease;
        }
        @keyframes wl-lead-fadein {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .wl-lead-card {
          background: #14215c;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 20px;
          padding: 2rem;
          width: 100%;
          max-width: 440px;
          position: relative;
          animation: wl-lead-slidein 0.3s cubic-bezier(0.22,1,0.36,1);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5);
        }
        @keyframes wl-lead-slidein {
          from { transform: translateY(24px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        .wl-lead-close {
          position: absolute; top: 1rem; right: 1rem;
          background: rgba(255,255,255,0.08);
          border: none; border-radius: 50%;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55); font-size: 1rem;
          cursor: pointer; transition: background 0.15s;
        }
        .wl-lead-close:hover { background: rgba(255,255,255,0.16); color: #fff; }
        .wl-lead-score-badge {
          display: inline-flex; align-items: center; gap: 0.4rem;
          background: rgba(200,32,46,0.2);
          border: 1px solid rgba(200,32,46,0.4);
          color: #f87171;
          font-size: 0.78rem; font-weight: 700;
          padding: 0.3rem 0.8rem; border-radius: 20px;
          margin-bottom: 1rem;
          letter-spacing: 0.01em;
        }
        .wl-lead-title {
          font-size: 1.25rem; font-weight: 800;
          color: #fff; line-height: 1.2;
          margin: 0 0 0.5rem;
        }
        .wl-lead-subtitle {
          font-size: 0.875rem; color: rgba(255,255,255,0.6);
          line-height: 1.55; margin: 0 0 1.5rem;
        }
        .wl-lead-field {
          display: flex; flex-direction: column; gap: 0.3rem;
          margin-bottom: 0.875rem;
        }
        .wl-lead-label {
          font-size: 0.78rem; font-weight: 600;
          color: rgba(255,255,255,0.5);
          letter-spacing: 0.04em; text-transform: uppercase;
        }
        .wl-lead-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 10px;
          padding: 0.65rem 0.9rem;
          font-size: 0.95rem; color: #fff;
          font-family: inherit;
          transition: border-color 0.15s, background 0.15s;
          outline: none; width: 100%;
        }
        .wl-lead-input::placeholder { color: rgba(255,255,255,0.3); }
        .wl-lead-input:focus {
          border-color: rgba(200,32,46,0.6);
          background: rgba(255,255,255,0.1);
        }
        .wl-lead-error {
          font-size: 0.8rem; color: #f87171;
          margin: -0.25rem 0 0.75rem;
        }
        .wl-lead-submit {
          width: 100%; padding: 0.8rem;
          background: #c8202e; color: #fff;
          border: none; border-radius: 12px;
          font-size: 0.95rem; font-weight: 700;
          font-family: inherit;
          cursor: pointer; transition: background 0.15s, transform 0.1s;
          margin-top: 0.25rem;
        }
        .wl-lead-submit:hover:not(:disabled) { background: #a51724; }
        .wl-lead-submit:active { transform: scale(0.98); }
        .wl-lead-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .wl-lead-skip {
          display: block; text-align: center;
          margin-top: 0.875rem;
          font-size: 0.8rem; color: rgba(255,255,255,0.35);
          cursor: pointer; background: none; border: none;
          font-family: inherit;
          transition: color 0.15s;
        }
        .wl-lead-skip:hover { color: rgba(255,255,255,0.6); }
        /* Success state */
        .wl-lead-success {
          text-align: center; padding: 0.5rem 0;
        }
        .wl-lead-success-icon {
          font-size: 2.5rem; margin-bottom: 0.75rem;
        }
        .wl-lead-success-title {
          font-size: 1.15rem; font-weight: 800; color: #fff;
          margin: 0 0 0.5rem;
        }
        .wl-lead-success-desc {
          font-size: 0.875rem; color: rgba(255,255,255,0.6);
          line-height: 1.55; margin: 0 0 1.5rem;
        }
        .wl-lead-wa-btn {
          display: inline-flex; align-items: center; gap: 0.5rem;
          background: #25D366; color: #fff;
          padding: 0.75rem 1.5rem; border-radius: 12px;
          font-weight: 700; font-size: 0.95rem;
          text-decoration: none; transition: background 0.15s;
        }
        .wl-lead-wa-btn:hover { background: #1da851; }
        @media (max-width: 480px) {
          .wl-lead-card { padding: 1.5rem 1.25rem; }
          .wl-lead-title { font-size: 1.1rem; }
        }
      `}</style>

      {/* Overlay — click outside to close */}
      <div
        className="wl-lead-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Obtén tu plan de preparación"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="wl-lead-card">
          {/* Close */}
          <button className="wl-lead-close" onClick={onClose} aria-label="Cerrar">✕</button>

          {status === 'success' ? (
            <div className="wl-lead-success">
              <div className="wl-lead-success-icon">✅</div>
              <h2 className="wl-lead-success-title">¡Listo, {name.split(' ')[0] || 'gracias'}!</h2>
              <p className="wl-lead-success-desc">
                Te contactaremos por WhatsApp con tu plan de preparación personalizado
                basado en tu resultado de {examName}.
              </p>
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="wl-lead-wa-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.852L.057 23.273c-.083.311.202.596.513.513l5.421-1.471A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.663-.497-5.197-1.367l-.373-.216-3.216.873.873-3.216-.216-.373A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
                </svg>
                Escribir por WhatsApp
              </a>
              <button className="wl-lead-skip" onClick={onClose}>Cerrar</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Score badge */}
              <div className="wl-lead-score-badge">
                🎯 Tu resultado: {examScore}
              </div>

              <h2 className="wl-lead-title">
                ¿Quieres mejorar este puntaje?
              </h2>
              <p className="wl-lead-subtitle">
                Déjanos tus datos y te enviamos un plan de preparación personalizado
                basado en tu resultado de {examName}. Sin costo.
              </p>

              <div className="wl-lead-field">
                <label htmlFor="lead-name" className="wl-lead-label">Tu nombre</label>
                <input
                  id="lead-name"
                  ref={inputRef}
                  className="wl-lead-input"
                  type="text"
                  placeholder="María Fernanda"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  maxLength={100}
                  autoComplete="name"
                />
              </div>

              <div className="wl-lead-field">
                <label htmlFor="lead-phone" className="wl-lead-label">WhatsApp *</label>
                <input
                  id="lead-phone"
                  className="wl-lead-input"
                  type="tel"
                  placeholder="+57 300 123 4567"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  maxLength={20}
                  required
                  autoComplete="tel"
                />
              </div>

              <div className="wl-lead-field">
                <label htmlFor="lead-email" className="wl-lead-label">Email <span style={{ opacity: 0.5 }}>(opcional)</span></label>
                <input
                  id="lead-email"
                  className="wl-lead-input"
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  maxLength={120}
                  autoComplete="email"
                />
              </div>

              {errorMsg && <p className="wl-lead-error">{errorMsg}</p>}

              <button
                type="submit"
                className="wl-lead-submit"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Enviando…' : 'Quiero mi plan personalizado →'}
              </button>

              <button type="button" className="wl-lead-skip" onClick={onClose}>
                Omitir por ahora
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
