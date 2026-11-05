'use client';

import { useState } from 'react';
import { COURSE_TERMS, PRIVACY_NOTICE, PRIVACY_VERSION, TERMS_VERSION } from '@/lib/course-pricing/terms';
import styles from './manual-enrollment.module.css';

export default function ManualEnrollmentForm({ token, email, schedule, alreadySigned }: { token: string; email: string; schedule: string; alreadySigned: boolean }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState('');
  const [read, setRead] = useState(false);

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

  if (done) return <div role="status" className={styles.result}><span className={styles.resultIcon}>✓</span><p className={styles.kicker}>INSCRIPCIÓN GUARDADA</p><h2>Tu cuenta está lista para activar</h2><p>{message}</p><p>Revisa <strong>{email}</strong> para activar tu acceso y conservar el PDF firmado.</p></div>;

  if (alreadySigned) return <div className={styles.result}><span className={styles.resultIcon}>↗</span><p className={styles.kicker}>FIRMA GUARDADA</p><h2>Termina de activar tu acceso</h2><p>Tu firma y tus datos ya están guardados. Falta completar el acceso o el envío del correo.</p><button type="button" className={styles.primary} onClick={async () => { setBusy(true); try { const response = await fetch(`/api/manual-enrollments/${token}`, { method: 'POST' }); const result = await response.json(); if (!response.ok) throw new Error(result.message); setDone(true); setMessage(result.message); } catch (error) { setMessage(error instanceof Error ? error.message : 'Inténtalo de nuevo.'); } finally { setBusy(false); } }} disabled={busy}>{busy ? 'Terminando…' : 'Terminar inscripción'}</button><p role="status" aria-live="polite">{message}</p></div>;

  return <form onSubmit={submit} className={styles.form}>
    <section className={styles.summary} aria-label="Resumen de tu inscripción">
      <div className={styles.summaryHeader}><span className={styles.step}>01</span><div><p className={styles.kicker}>TU INSCRIPCIÓN</p><h2>Inglés general</h2></div></div>
      <dl><div><dt>Ritmo</dt><dd>4 clases por semana</dd></div><div><dt>Horario preferido</dt><dd>{schedule}</dd></div><div><dt>Pago</dt><dd>Consignación reportada · sin nuevo cobro</dd></div></dl>
      <p className={styles.summaryFoot}>Acordaremos contigo los cuatro días de clase antes de confirmarlos.</p>
    </section>

    <section className={styles.legalPanel} aria-labelledby="reglas-title">
      <div className={styles.sectionHeading}><span className={styles.step}>02</span><div><p className={styles.kicker}>ANTES DE FIRMAR</p><h2 id="reglas-title">Lee las reglas de tus clases</h2></div></div>
      <p className={styles.intro}>Revisa los ocho apartados. La versión que aceptes quedará guardada con la fecha y tu firma electrónica. Recibirás una copia firmada por correo.</p>
      <div className={styles.legalLinks}><a href="/reglamento" target="_blank" rel="noopener noreferrer">Leer en una página cómoda <span aria-hidden="true">↗</span></a><a href="/reglamento/archivo" target="_blank" rel="noopener noreferrer">Descargar PDF <span aria-hidden="true">↓</span></a></div>
      <div className={styles.termsList}>{COURSE_TERMS.map((section, index) => <details className={styles.term} key={section.title}><summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><i aria-hidden="true">+</i></summary><p>{section.text}</p></details>)}</div>
      <label className={styles.acceptCard}><input type="checkbox" checked={read} onChange={event => setRead(event.target.checked)} required /><span><strong>Leí y acepto el reglamento completo.</strong><small>Incluye programación, ausencias, vigencia y devoluciones. Puedo abrir cada punto o descargarlo en PDF.</small></span></label>
    </section>

    {read && <section id="datos-inscripcion" className={styles.dataPanel} aria-labelledby="datos-title">
      <div className={styles.sectionHeading}><span className={styles.step}>03</span><div><p className={styles.kicker}>DATOS Y FIRMA</p><h2 id="datos-title">Completa tu cuenta</h2></div></div>
      <p className={styles.intro}>Crearemos el acceso con <strong>{email}</strong>. Al guardar, recibirás por correo el PDF firmado y el enlace de activación.</p>
      <div className={styles.fields}>
        <label>Nombre completo del estudiante<input name="studentName" required minLength={2} maxLength={100} autoComplete="name" /></label>
        <label>WhatsApp<input name="phone" required type="tel" autoComplete="tel" placeholder="300 123 4567 o +57 300 123 4567" /><small>Escríbelo como lo usas normalmente.</small></label>
        <label>Ciudad y país<input name="city" required minLength={2} maxLength={100} autoComplete="address-level2" placeholder="Bucaramanga, Colombia" /></label>
        <label>Dirección de residencia<input name="address" required minLength={5} maxLength={180} autoComplete="street-address" /></label>
        <label className={styles.wide}><span>Propósito del curso <span className={styles.optional}>(opcional)</span></span><textarea name="purpose" maxLength={500} rows={3} placeholder="Si quieres, cuéntanos qué te gustaría lograr. También puedes dejarlo vacío." /><small>Podemos hablarlo juntos en la primera clase.</small></label>
        <label>Nombre de quien realizó la consignación<input name="payerName" required minLength={2} maxLength={100} /></label>
        <label>Firma electrónica<input name="signerName" required minLength={2} maxLength={100} aria-describedby="firma-ayuda" /><small id="firma-ayuda">Escribe el mismo nombre completo de quien realizó la consignación.</small></label>
      </div>
      <div className={styles.signatureNote}><strong>Tu firma queda respaldada.</strong> Guardaremos el nombre, la fecha, el texto aceptado y una copia PDF de la constancia.</div>
      <div className={styles.agreements}><label><input name="privacy" type="checkbox" required /><span>{PRIVACY_NOTICE}</span></label><label><input name="adult" type="checkbox" required /><span>Soy mayor de edad y puedo inscribir al estudiante y proporcionar sus datos.</span></label></div>
      <button type="submit" disabled={busy} className={styles.primary}>{busy ? 'Guardando tu inscripción…' : 'Guardar inscripción y crear mi cuenta'} <span aria-hidden="true">→</span></button>
      <p className={styles.noCharge}>No te pediremos ningún pago en este paso.</p>
    </section>}
    <p className={styles.status} role="status" aria-live="polite">{message}</p>
  </form>;
}
