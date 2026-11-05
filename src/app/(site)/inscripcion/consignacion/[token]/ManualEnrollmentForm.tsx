'use client';

import { useEffect, useRef, useState } from 'react';
import { COURSE_TERMS, PRIVACY_NOTICE, PRIVACY_VERSION, TERMS_VERSION } from '@/lib/course-pricing/terms';

const inputStyle: React.CSSProperties = { width: '100%', padding: '12px', border: '1px solid #aab3c8', borderRadius: 8, fontSize: 16, color: '#142457', background: '#fff' };
const labelStyle: React.CSSProperties = { display: 'block', fontWeight: 650, margin: '15px 0' };

export default function ManualEnrollmentForm({ token, email, schedule, alreadySigned }: { token: string; email: string; schedule: string; alreadySigned: boolean }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState('');
  const [read, setRead] = useState(false);
  const detailsForm = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!read) return;
    detailsForm.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [read]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    setBusy(true); setMessage('');
    try {
      const response = await fetch(`/api/manual-enrollments/${token}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: Object.fromEntries(['studentName', 'phone', 'city', 'address', 'purpose', 'payerName', 'signerName'].map(key => [key, form.get(key)])),
          acceptedTerms: TERMS_VERSION, reviewedTerms: read ? TERMS_VERSION : null,
          acceptedPrivacy: form.get('privacy') === 'on' ? PRIVACY_VERSION : null,
          acceptedAdult: form.get('adult') === 'on',
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'No se pudo guardar la inscripción.');
      setDone(true); setMessage(result.message);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Inténtalo de nuevo.'); }
    finally { setBusy(false); }
  }

  if (done) return <div role="status" style={{ padding: 28, borderRadius: 12, background: '#e8f6ec' }}><h2>Inscripción guardada</h2><p>{message}</p><p>Revisa {email} para activar tu acceso y conservar el PDF firmado.</p></div>;
  if (alreadySigned) return <div><p>Tu firma y tus datos ya están guardados. Falta completar el acceso o el envío del correo.</p><button onClick={async () => { setBusy(true); try { const response = await fetch(`/api/manual-enrollments/${token}`, { method: 'POST' }); const result = await response.json(); if (!response.ok) throw new Error(result.message); setDone(true); setMessage(result.message); } catch (error) { setMessage(error instanceof Error ? error.message : 'Inténtalo de nuevo.'); } finally { setBusy(false); } }} disabled={busy} style={inputStyle}>{busy ? 'Terminando…' : 'Terminar inscripción'}</button><p role="status">{message}</p></div>;

  return <form onSubmit={submit}>
    <section style={{ background: '#edf2fc', padding: 22, borderRadius: 12, margin: '26px 0' }}>
      <h2>Tu curso</h2><p><strong>Inglés general · 4 clases por semana</strong></p><p>Horario preferido: {schedule}. Los cuatro días se acordarán contigo.</p><p><strong>Pago:</strong> consignación ya reportada a WeLearn. Este formulario no genera un cobro.</p>
    </section>
    <h2>1. Lee el reglamento completo</h2>
    <p>Estas condiciones quedarán guardadas con su versión, la fecha y tu firma electrónica. También recibirás el PDF firmado por correo.</p>
    <p><a href="/reglamento/archivo" target="_blank" rel="noopener noreferrer">Abrir copia del reglamento en PDF</a></p>
    {COURSE_TERMS.map((section, index) => <section key={section.title} style={{ padding: '18px 0', borderBottom: '1px solid #d9dfec' }}><h3>{index + 1}. {section.title}</h3><p style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }}>{section.text}</p></section>)}
    <label style={{ ...labelStyle, background: '#fff3e8', padding: 16, borderRadius: 8 }}><input type="checkbox" checked={read} onChange={event => setRead(event.target.checked)} required /> <strong>Leí y acepto el reglamento completo.</strong> Entiendo las reglas sobre programación, ausencias y devoluciones.</label>
    {read && <section ref={detailsForm} style={{ scrollMarginTop: 24 }}><h2>2. Tus datos y firma</h2>
      <p>El correo de la cuenta será <strong>{email}</strong>.</p>
      <label style={labelStyle}>Nombre completo del estudiante<input name="studentName" required minLength={2} maxLength={100} autoComplete="name" style={inputStyle} /></label>
      <label style={labelStyle}>Número de WhatsApp<input name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="3001234567" maxLength={22} aria-describedby="manual-phone-help" style={inputStyle} /></label>
      <p id="manual-phone-help">En Colombia, escribe solo los 10 dígitos; agregamos +57 automáticamente. No necesitas conocer el código de país. Si tu número es de otro país, escribe + y su código.</p>
      <label style={labelStyle}>Ciudad y país<input name="city" required minLength={2} maxLength={100} style={inputStyle} /></label>
      <label style={labelStyle}>Dirección de residencia<input name="address" required minLength={5} maxLength={180} style={inputStyle} /></label>
      <label style={labelStyle}>Propósito del curso<textarea name="purpose" required minLength={10} maxLength={500} rows={3} style={inputStyle} /></label>
      <label style={labelStyle}>Nombre de quien realizó la consignación<input name="payerName" required minLength={2} maxLength={100} style={inputStyle} /></label>
      <label style={labelStyle}>Firma electrónica: escribe el mismo nombre completo<input name="signerName" required minLength={2} maxLength={100} style={inputStyle} /></label>
      <p>Al guardar, conservaremos tu nombre como firma electrónica, la fecha, el texto exacto aceptado y un PDF firmado.</p>
      <label style={labelStyle}><input name="privacy" type="checkbox" required /> {PRIVACY_NOTICE}</label>
      <label style={labelStyle}><input name="adult" type="checkbox" required /> Soy mayor de edad y puedo inscribir al estudiante y proporcionar sus datos.</label>
      <button type="submit" disabled={busy} style={{ ...inputStyle, background: '#142457', color: 'white', fontWeight: 700, cursor: 'pointer' }}>{busy ? 'Guardando…' : 'Guardar inscripción, firmar y crear mi cuenta'}</button>
    </section>}
    <p role="status" aria-live="polite">{message}</p>
  </form>;
}
