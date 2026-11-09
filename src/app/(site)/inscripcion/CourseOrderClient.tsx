'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { formatCOP, objectiveLabel, LANGUAGES, PLANS, type Selection } from '@/lib/course-pricing/catalog';
import styles from './course-order.module.css';

type Order = {
  id: string;
  reference: string;
  selection: Selection;
  amountInCents: number;
  enrollmentFeeInCents: number;
  platformFeeInCents: number;
  feeReason: string | null;
  platformFeeReason: string | null;
  classes: number;
  sessions: number;
  acceptedAt: string;
  signedBy: string | null;
  termsVersion: string;
  legalSnapshot: string | null;
};
type Result = { order?: Order; status?: string };
type LegalSection = { title: string; text: string };

function acceptedSections(snapshot: string | null): LegalSection[] {
  if (!snapshot) return [];
  try {
    const parsed: unknown = JSON.parse(snapshot);
    if (!parsed || typeof parsed !== 'object' || !('sections' in parsed) || !Array.isArray(parsed.sections)) return [];
    return parsed.sections.filter(
      (section: unknown): section is LegalSection =>
        !!section && typeof section === 'object' && 'title' in section && 'text' in section &&
        typeof section.title === 'string' && typeof section.text === 'string'
    );
  } catch {
    return [];
  }
}

export default function CourseOrderClient({ orderId, transactionId }: { orderId: string | null; transactionId: string | null }) {
  const [result, setResult] = useState<Result>({});
  const [message, setMessage] = useState('Consultando…');
  const [busy, setBusy] = useState(true);
  const [login, setLogin] = useState(false);
  const [orders, setOrders] = useState<{ id: string; created_at: string; amount_in_cents: number }[]>([]);
  const verified = useRef(false);

  const load = useCallback(async () => {
    try {
      if (orderId && transactionId && !verified.current) {
        const check = await fetch(`/api/course-orders/${encodeURIComponent(orderId)}/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ transactionId }),
        });
        if (check.ok) verified.current = true;
        else if (check.status !== 401) {
          const data = await check.json();
          setMessage(data.message);
          return;
        }
      }
      const response = await fetch(orderId ? `/api/course-orders/${encodeURIComponent(orderId)}` : '/api/course-orders', { cache: 'no-store' });
      const data = await response.json();
      setLogin(response.status === 401);
      if (!response.ok) throw new Error(data.message || 'No podemos consultar ahora.');
      if (orderId) setResult(data);
      else setOrders(data.orders);
      setMessage('');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No podemos consultar el pago. No pagues de nuevo.');
    } finally {
      setBusy(false);
    }
  }, [orderId, transactionId]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);

  async function pay() {
    setBusy(true);
    setMessage('Preparando Wompi…');
    try {
      const response = await fetch(`/api/course-orders/${encodeURIComponent(orderId!)}/checkout`, { method: 'POST' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      if (data.checkoutUrl) {
        window.location.assign(data.checkoutUrl);
        return;
      }
      setResult(current => ({ ...current, status: data.status }));
      setMessage(data.status === 'expired'
        ? 'La ventana de pago venció. Contacta a WeLearn para revisar la inscripción antes de crear otra.'
        : 'Consulta el estado de tu inscripción antes de continuar.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'No pudimos preparar Wompi.');
    } finally {
      setBusy(false);
    }
  }

  const labels: Record<string, string> = {
    created: 'Tu inscripción está lista',
    paid: 'Tu pago está confirmado',
    pending: 'Estamos confirmando tu pago',
    not_completed: 'El pago no se completó',
    review: 'Estamos revisando tu pago',
    expired: 'La ventana de pago venció',
  };
  const order = result.order;
  const status = result.status ?? 'created';
  const sections = acceptedSections(order?.legalSnapshot ?? null);
  const coursePrice = order ? (order.amountInCents - order.enrollmentFeeInCents - order.platformFeeInCents) / 100 : 0;
  const examFeeApplies = order?.selection.objective !== 'general' && order?.platformFeeReason !== 'legacy';
  const supportUrl = order
    ? 'https://wa.me/573005004253?text=' + encodeURIComponent('Hola, quiero consultar mi inscripción ' + order.reference)
    : null;

  return <div className={styles.page}>
    <div className={styles.shell}>
      <header className={styles.heading}>
        <p className={styles.kicker}>WELEARN / INSCRIPCIONES</p>
        <h1>{order ? labels[status] ?? labels.created : 'Mis inscripciones'}</h1>
        {order && <p className={styles.courseName}>
          {LANGUAGES.find(item => item.id === order.selection.language)?.name} · {objectiveLabel(order.selection.objective)} · {PLANS.find(item => item.id === order.selection.plan)?.name ?? order.selection.plan}
        </p>}
      </header>

      {order && <>
        <section className={styles.receipt} aria-label="Resumen de tu inscripción">
          <div className={styles.amount}>
            <span>Total de la orden</span>
            <strong>{formatCOP(order.amountInCents / 100)} <small>COP</small></strong>
          </div>
          <dl className={styles.breakdown}>
            <div><dt>Clases</dt><dd>{formatCOP(coursePrice)} COP</dd></div>
            <div><dt>Inscripción{order.feeReason === 'continuous_cycle' ? ' · continuidad' : ''}</dt><dd>{formatCOP(order.enrollmentFeeInCents / 100)} COP</dd></div>
            {examFeeApplies && <div><dt>Plataforma para exámenes{order.platformFeeReason === 'previous_exam_course' || order.platformFeeReason === 'existing_welearn_access' ? ' · ya cubierta' : ''}</dt><dd>{formatCOP(order.platformFeeInCents / 100)} COP</dd></div>}
          </dl>
          <div className={styles.facts}>
            <span><strong>{order.classes}</strong> clases de 100 minutos</span>
            <span><strong>{order.sessions}</strong> sesiones</span>
            <span><strong>4</strong> semanas</span>
          </div>
          <p className={styles.reference}>Referencia <span>{order.reference}</span></p>
        </section>

        <section className={styles.nextStep} aria-label="Siguiente paso">
          {status === 'paid' && <p>Ahora coordinaremos contigo el horario de las clases. El pago está registrado; no necesitas volver a pagar.</p>}
          {(status === 'pending' || status === 'review') && <p>Conservamos tu inscripción. No hagas otro pago mientras revisamos el actual.</p>}
          {['created', 'not_completed'].includes(status) && <button type="button" className={styles.primary} disabled={busy} onClick={pay}>Pagar con Wompi <span aria-hidden="true">→</span></button>}
          {supportUrl && <a className={styles.support} href={supportUrl} target="_blank" rel="noopener noreferrer">¿Necesitas ayuda? Escríbenos</a>}
        </section>

        {sections.length > 0 && <details className={styles.terms}>
          <summary><span>Condiciones que aceptaste</span><span className={styles.chevron} aria-hidden="true">⌄</span></summary>
          <div className={styles.termsBody}>
            <p className={styles.acceptance}>Aceptadas el {new Date(order.acceptedAt).toLocaleString('es-CO')}{order.signedBy ? <> por <strong>{order.signedBy}</strong></> : null}<br />Versión {order.termsVersion}</p>
            <p className={styles.termsHint}>Abre cada apartado para consultar el texto que aceptaste.</p>
            {sections.map((section, index) => <details className={styles.term} key={section.title}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{section.title}</strong><span aria-hidden="true">+</span></summary>
              <p>{section.text}</p>
            </details>)}
          </div>
        </details>}
      </>}

      {!orderId && orders.length > 0 && <ul className={styles.orderList}>{orders.map(item =>
        <li key={item.id}><a href={`/inscripcion?orden=${encodeURIComponent(item.id)}`}><span>{new Date(item.created_at).toLocaleDateString('es-CO')}</span><strong>{formatCOP(item.amount_in_cents / 100)} COP</strong></a></li>
      )}</ul>}
      {!orderId && !orders.length && !message && !login && <p className={styles.empty}>Aún no tienes inscripciones guardadas.</p>}
      {message && <p className={styles.message} role="status" aria-live="polite">{message}</p>}
      <nav className={styles.footerActions} aria-label="Opciones de inscripción">
        {login
          ? <a className={styles.primary} href={'/login?next=' + encodeURIComponent(orderId ? '/inscripcion?orden=' + orderId + (transactionId ? '&id=' + encodeURIComponent(transactionId) : '') : '/inscripcion')}>Iniciar sesión</a>
          : <button type="button" disabled={busy} onClick={() => { setBusy(true); setMessage('Consultando…'); void load(); }}>Actualizar estado</button>}
        <a href="/precios">Ver planes</a>
      </nav>
    </div>
  </div>;
}
