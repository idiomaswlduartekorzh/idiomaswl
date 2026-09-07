'use client';

import { Fragment, useRef, useState } from 'react';
import { selectionPath, type Selection } from '@/lib/course-pricing/catalog';
import { TERMS_VERSION, PRIVACY_VERSION, PRIVACY_NOTICE, COURSE_TERMS, COURSE_LEGAL_READY } from '@/lib/course-pricing/terms';
import styles from './course-pricing.module.css';

function emphasizedText(text: string, highlights: readonly string[]) {
  const positions = highlights.map(value => ({ value, index: text.indexOf(value) })).filter(item => item.index >= 0).sort((a, b) => a.index - b.index);
  const result: React.ReactNode[] = [];
  let cursor = 0;
  for (const item of positions) {
    if (item.index < cursor) continue;
    result.push(text.slice(cursor, item.index));
    result.push(<strong key={`${item.index}-${item.value}`}>{item.value}</strong>);
    cursor = item.index + item.value.length;
  }
  result.push(text.slice(cursor));
  return result.map((part, index) => <Fragment key={index}>{part}</Fragment>);
}

export default function CourseEnrollmentForm({ selection }: { selection: Selection }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [acceptedRules, setAcceptedRules] = useState(false);
  const key = useRef<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !acceptedRules) return;
    const form = new FormData(event.currentTarget);
    setBusy(true);
    setMessage('');
    try {
      const storageKey = `wl-course-order:${selectionPath(selection)}`;
      if (!key.current) {
        try { key.current = localStorage.getItem(storageKey); } catch {}
      }
      key.current ??= crypto.randomUUID();
      try { localStorage.setItem(storageKey, key.current); } catch {}
      const response = await fetch('/api/course-orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idempotencyKey: key.current,
          selection,
          contact: {
            studentName: form.get('studentName'),
            studentEmail: form.get('studentEmail'),
            payerName: form.get('payerName'),
            phone: form.get('phone'),
          },
          acceptedTerms: TERMS_VERSION,
          reviewedTerms: TERMS_VERSION,
          acceptedPrivacy: form.get('privacy') === 'on' ? PRIVACY_VERSION : null,
          acceptedAdult: form.get('adult') === 'on',
        }),
      });
      const data = await response.json();
      if (!response.ok || !data.orderId) throw new Error(data.message || 'No pudimos guardar la inscripción.');
      try { localStorage.removeItem(storageKey); } catch {}
      window.location.assign(`/inscripcion?orden=${encodeURIComponent(data.orderId)}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Revisa tu conexión e inténtalo de nuevo.');
    } finally {
      setBusy(false);
    }
  }

  return <form onSubmit={submit} className={styles.enrollment}>
    <div className={styles.rulesIntro}>
      <p className={styles.eyebrow}>04 / REGLAS DEL CURSO</p>
      <h3>Lo importante, antes de inscribirte</h3>
      <p>Lee estas condiciones con calma. Los puntos que más afectan la programación y el pago están resaltados.</p>
    </div>
    <div className={styles.rulesGrid}>
      {COURSE_TERMS.map((section, index) => <article className={styles.ruleCard} key={section.title}>
        <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h4>{section.title}</h4>
        <p>{emphasizedText(section.text, section.highlights)}</p>
      </article>)}
    </div>
    <a className={styles.rulesLink} href="/reglamento" target="_blank" rel="noopener">Abrir la versión completa para guardar o imprimir ↗</a>
    <label className={styles.readConfirmation}>
      <input type="checkbox" checked={acceptedRules} onChange={event => setAcceptedRules(event.target.checked)} />
      <span><strong>Confirmo que leí y acepto el reglamento.</strong> Revisé especialmente la vigencia de cuatro semanas, la programación, las ausencias y las devoluciones.</span>
    </label>

    {!acceptedRules ? <div className={styles.formLocked} aria-live="polite">
      <span aria-hidden="true">🔒</span>
      <p><strong>El formulario se desbloquea al confirmar la lectura.</strong><br />Después podrás ingresar los datos del estudiante y continuar al pago.</p>
    </div> : <div className={styles.formUnlocked}>
      <p className={styles.eyebrow}>05 / DATOS DEL ESTUDIANTE</p>
      <h3>¿A quién le damos la bienvenida?</h3>
      <p className={styles.small}>Después de confirmar el pago crearemos la cuenta del estudiante y enviaremos el acceso a este correo.</p>
      <div className={styles.fields}>
        <label>Nombre del estudiante<input name="studentName" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>Correo del estudiante<input name="studentEmail" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Nombre de quien paga<input name="payerName" autoComplete="cc-name" required minLength={2} maxLength={100} /></label>
        <label>WhatsApp con código de país<input name="phone" type="tel" autoComplete="tel" placeholder="+573001234567" pattern="\+[1-9][0-9]{7,14}" required aria-describedby="phone-help" /></label>
      </div>
      <p id="phone-help" className={styles.small}>Usa + y el código de país, sin espacios. Si el estudiante es menor, continúa su madre, padre o representante.</p>
      <div className={styles.agreements}>
        <label><input name="privacy" type="checkbox" required /> {PRIVACY_NOTICE}</label>
        <label><input name="adult" type="checkbox" required /> Soy mayor de edad y tengo autorización para inscribirme o representar al estudiante y proporcionar sus datos.</label>
      </div>
      {!COURSE_LEGAL_READY && <p className={styles.pendingLaunch}>Vista de preparación: el pago permanece desactivado hasta completar los datos legales y las pruebas de Wompi.</p>}
      <button className={styles.primary} disabled={busy || !COURSE_LEGAL_READY}>{busy ? 'Preparando pago…' : 'Continuar al pago seguro'}</button>
      <p className={styles.small}>La cuenta se crea solamente cuando Wompi confirme el pago. No almacenamos los datos de tu tarjeta.</p>
    </div>}
    <p role="status" className={styles.small}>{message}</p>
    <a className={styles.small} href="/inscripcion">Consultar una inscripción o pago</a>
  </form>;
}
