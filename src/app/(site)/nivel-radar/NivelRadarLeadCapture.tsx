'use client';

import { useState } from 'react';
import { saveLead } from '@/lib/actions/saveLead';
import { isPlausibleEmail, isPlausibleWhatsapp } from '@/lib/leads/contact';
import s from './page.module.css';

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

interface Props {
  level: string | null;
  scoreLabel: string;
  profileData: Record<string, unknown>;
}

export default function NivelRadarLeadCapture({ level, scoreLabel, profileData }: Props) {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [contactConsent, setContactConsent] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [company, setCompany] = useState('');
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [error, setError] = useState('');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (name.trim().length < 2) return setError('Escribe tu nombre.');
    if (!isPlausibleWhatsapp(whatsapp)) return setError('Ingresa un WhatsApp válido de 10 a 15 dígitos.');
    if (email.trim() && !isPlausibleEmail(email)) return setError('Ingresa un correo electrónico válido.');
    if (!contactConsent) return setError('Autoriza el contacto para enviarte una ruta basada en tu resultado.');

    setStatus('saving');
    setError('');
    const params = new URLSearchParams(window.location.search);
    const result = await saveLead({
      name,
      whatsapp,
      email: email || undefined,
      examSlug: 'nivel-radar',
      examScore: scoreLabel,
      source: 'nivel-radar',
      utmSource: params.get('utm_source') ?? undefined,
      utmMedium: params.get('utm_medium') ?? undefined,
      utmCampaign: params.get('utm_campaign') ?? undefined,
      utmContent: params.get('utm_content') ?? undefined,
      utmTerm: params.get('utm_term') ?? undefined,
      landingPage: `${window.location.pathname}${window.location.search}`,
      referrer: document.referrer || undefined,
      contactConsent,
      marketingConsent,
      consentVersion: 'nivel-radar-contact-v1-2026-09',
      profileData,
      company,
    });

    if (!result.ok) {
      setStatus('idle');
      setError(result.error ?? 'No pudimos guardar tus datos. Intenta de nuevo.');
      return;
    }

    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({
      event: 'nivel_radar_lead_captured',
      diagnostic_level: level,
      marketing_consent: marketingConsent,
    });
    setStatus('saved');
  }

  if (status === 'saved') {
    return <aside className={s.leadCapture} aria-live="polite">
      <p className={s.leadCaptureEyebrow}>Resultado guardado</p>
      <h2>Tu ruta ya tiene punto de partida.</h2>
      <p>Recibimos tu perfil de Nivel Radar. El equipo de WeLearn podrá orientarte con base en estas habilidades, no con una recomendación genérica.</p>
    </aside>;
  }

  return <aside className={s.leadCapture} aria-labelledby="nivel-radar-lead-title">
    <p className={s.leadCaptureEyebrow}>Siguiente paso opcional</p>
    <h2 id="nivel-radar-lead-title">Recibe una ruta para cerrar tu brecha</h2>
    <p>Tu resultado ya es visible y descargable. Si quieres orientación, comparte tus datos y guardaremos también el perfil por habilidad para que la conversación empiece donde la necesitas.</p>
    <form className={s.leadForm} onSubmit={submit} noValidate>
      <label>Nombre
        <input value={name} onChange={event => setName(event.target.value)} autoComplete="name" maxLength={100} placeholder="Tu nombre" required />
      </label>
      <label>WhatsApp
        <input value={whatsapp} onChange={event => setWhatsapp(event.target.value)} autoComplete="tel" inputMode="tel" maxLength={20} placeholder="+57 300 123 4567" required />
      </label>
      <label>Correo <span>(opcional)</span>
        <input value={email} onChange={event => setEmail(event.target.value)} autoComplete="email" inputMode="email" maxLength={254} placeholder="tu@correo.com" />
      </label>
      <label className={s.honeypot} aria-hidden="true">Empresa
        <input value={company} onChange={event => setCompany(event.target.value)} tabIndex={-1} autoComplete="off" />
      </label>
      <label className={s.consentRow}>
        <input type="checkbox" checked={contactConsent} onChange={event => setContactConsent(event.target.checked)} required />
        <span>Autorizo a WeLearn a contactarme por WhatsApp o correo sobre este resultado. *</span>
      </label>
      <label className={s.consentRow}>
        <input type="checkbox" checked={marketingConsent} onChange={event => setMarketingConsent(event.target.checked)} />
        <span>Quiero recibir recursos y ofertas educativas. Es opcional.</span>
      </label>
      {error && <p className={s.leadError} role="alert">{error}</p>}
      <button className={s.primary} disabled={status === 'saving'} type="submit">
        {status === 'saving' ? 'Guardando…' : 'Quiero mi ruta personalizada'} <span>→</span>
      </button>
      <small>No vendemos tus datos. Puedes pedir que dejemos de contactarte en cualquier momento.</small>
    </form>
  </aside>;
}
