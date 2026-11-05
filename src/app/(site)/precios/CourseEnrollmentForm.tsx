'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import { selectionPath, type Selection } from '@/lib/course-pricing/catalog';
import { normalizeWhatsAppPhone } from '@/lib/course-pricing/phone';
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

export default function CourseEnrollmentForm({ selection, salesEnabled }: { selection: Selection; salesEnabled: boolean }) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [acceptedRules, setAcceptedRules] = useState(false);
  const key = useRef<string | null>(null);
  const unlockedForm = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!acceptedRules) return;
    unlockedForm.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });
  }, [acceptedRules]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy || !acceptedRules || !salesEnabled) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const phoneField = formElement.elements.namedItem('phone') as HTMLInputElement;
    const phone = normalizeWhatsAppPhone(form.get('phone'));
    if (!phone) {
      phoneField.setCustomValidity('Escribe los 10 dígitos de Colombia o, si tu número es de otro país, inclúyelo con + y su código.');
      phoneField.reportValidity();
      return;
    }
    phoneField.setCustomValidity('');
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
            phone,
            address: form.get('address'),
            city: form.get('city'),
            purpose: form.get('purpose'),
            signerName: form.get('signerName'),
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
      <p className={styles.eyebrow}>02 / REGLAMENTO</p>
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
    <aside className={styles.rulesNotice} aria-label="Aviso importante sobre el reglamento">
      <p className={styles.rulesNoticeTitle}>Antes de pagar: lee el reglamento completo</p>
      <p>La versión que aceptes quedará asociada a tu inscripción junto con la fecha y la firma de quien paga. Después del pago te enviaremos esta copia en PDF al correo del estudiante.</p>
      <div className={styles.rulesActions}>
        <a href="/reglamento" target="_blank" rel="noopener">Leer el reglamento</a>
        <a href="/reglamento/archivo" target="_blank" rel="noopener">Descargar copia en PDF</a>
      </div>
    </aside>
    <label className={styles.readConfirmation}>
      <input type="checkbox" checked={acceptedRules} onChange={event => setAcceptedRules(event.target.checked)} />
      <span><strong>Leí y acepto el reglamento completo.</strong><small>Revisé la vigencia, la programación, las ausencias y las devoluciones. Recibiré una copia en PDF por correo.</small></span>
    </label>

    {!acceptedRules ? <div className={styles.formLocked} aria-live="polite">
      <span aria-hidden="true">🔒</span>
      <p><strong>Marca la casilla de arriba para abrir el formulario.</strong><br />Te llevaremos directamente a los datos para que puedas continuar.</p>
    </div> : <div ref={unlockedForm} className={styles.formUnlocked} style={{ scrollMarginTop: 24 }}>
      <p className={styles.eyebrow}>03 / DATOS Y FIRMA</p>
      <h3>Completa la contratación</h3>
      <p className={styles.small}>Después de confirmar el pago crearemos la cuenta del estudiante y enviaremos el acceso a este correo.</p>
      <div className={styles.fields}>
        <label>Nombre del estudiante<input name="studentName" autoComplete="name" required minLength={2} maxLength={100} /></label>
        <label>Correo del estudiante<input name="studentEmail" type="email" autoComplete="email" required maxLength={254} /></label>
        <label>Número de WhatsApp<input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="3001234567" maxLength={22} required aria-describedby="phone-help" onChange={event => event.currentTarget.setCustomValidity('')} /></label>
        <label>Ciudad y país<input name="city" autoComplete="address-level2" placeholder="Bucaramanga, Colombia" required minLength={2} maxLength={100} /></label>
        <label className={styles.fieldWide}>Dirección de residencia<input name="address" autoComplete="street-address" required minLength={5} maxLength={180} /></label>
        <label className={styles.fieldWide}>Propósito del curso <span className={styles.optionalField}>(opcional)</span><textarea name="purpose" placeholder="Si quieres, cuéntanos qué te gustaría lograr. También puedes dejarlo vacío." maxLength={500} rows={4} /></label>
        <label>Nombre de quien paga<input name="payerName" autoComplete="cc-name" required minLength={2} maxLength={100} /></label>
        <label>Firma electrónica<input name="signerName" autoComplete="name" required minLength={2} maxLength={100} aria-describedby="signature-help" /></label>
      </div>
      <p id="phone-help" className={styles.small}>En Colombia, escribe solo los 10 dígitos; agregamos +57 automáticamente. No necesitas conocer el código de país. Si tu número es de otro país, escribe + y su código. Si el estudiante es menor, continúa su madre, padre o representante.</p>
      <p id="signature-help" className={styles.signatureHelp}><strong>Escribe exactamente el mismo nombre de quien paga.</strong> Este nombre será tu firma electrónica. Guardaremos la fecha, la versión y la huella del reglamento aceptado.</p>
      <div className={styles.agreements}>
        <label><input name="privacy" type="checkbox" required /> {PRIVACY_NOTICE}</label>
        <label><input name="adult" type="checkbox" required /> Soy mayor de edad y tengo autorización para inscribirme o representar al estudiante y proporcionar sus datos.</label>
      </div>
      {(!COURSE_LEGAL_READY || !salesEnabled) && <p className={styles.pendingLaunch}>Las inscripciones están temporalmente cerradas mientras terminamos la verificación del pago y los correos. Puedes revisar el plan y el reglamento; habilitaremos este botón cuando la prueba integral esté aprobada.</p>}
      <button className={styles.primary} disabled={busy || !COURSE_LEGAL_READY || !salesEnabled}>{busy ? 'Preparando pago…' : salesEnabled ? 'Continuar al pago seguro' : 'Inscripciones temporalmente cerradas'}</button>
      <p className={styles.small}>La cuenta se crea solamente cuando Wompi confirme el pago. No almacenamos los datos de tu tarjeta.</p>
    </div>}
    <p role="status" className={styles.small}>{message}</p>
    <a className={styles.small} href="/inscripcion">Consultar una inscripción o pago</a>
  </form>;
}
