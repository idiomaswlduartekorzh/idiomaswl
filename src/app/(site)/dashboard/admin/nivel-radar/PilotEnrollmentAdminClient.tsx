'use client';

import { useState, type FormEvent } from 'react';

type EnrollmentAction = 'invited' | 'consented' | 'revoked' | 'completed';

const ACTION_LABELS: Record<EnrollmentAction, string> = {
  invited: 'Registrar invitación',
  consented: 'Confirmar consentimiento',
  revoked: 'Revocar acceso',
  completed: 'Cerrar participación',
};

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{12}$/iu;
const COHORT = /^[a-z0-9][a-z0-9._-]{2,99}$/u;
const CONSENT_REFERENCE = /^[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}$/u;

function localDateTimeNow(): string {
  const now = new Date();
  return new Date(now.getTime() - now.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

export default function PilotEnrollmentAdminClient({ consentVersion }: {
  consentVersion: string | null;
}) {
  const [userId, setUserId] = useState('');
  const [cohortId, setCohortId] = useState('');
  const [action, setAction] = useState<EnrollmentAction>('invited');
  const [consentedAt, setConsentedAt] = useState('');
  const [consentReference, setConsentReference] = useState('');
  const [consentConfirmed, setConsentConfirmed] = useState(false);
  const [reason, setReason] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);

  const needsConsent = action === 'consented';
  const needsReason = action === 'revoked' || action === 'completed';
  const needsConfiguredConsent = action === 'invited' || needsConsent;
  const configurationBlocked = needsConfiguredConsent && !consentVersion;

  function changeAction(nextAction: EnrollmentAction) {
    setAction(nextAction);
    setMessage(null);
    setReason('');
    setConsentReference('');
    setConsentConfirmed(false);
    setConsentedAt(nextAction === 'consented' ? localDateTimeNow() : '');
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    const normalizedUserId = userId.trim();
    const normalizedCohortId = cohortId.trim();
    if (!UUID.test(normalizedUserId) || !COHORT.test(normalizedCohortId)) {
      setMessage({ kind: 'error', text: 'Revisa el UUID del usuario y el identificador de cohorte.' });
      return;
    }
    const consentDate = needsConsent ? new Date(consentedAt) : null;
    if (needsConsent && (!consentConfirmed
      || !CONSENT_REFERENCE.test(consentReference.trim())
      || !consentDate
      || Number.isNaN(consentDate.getTime())
      || consentDate.getTime() > Date.now() + 300_000)) {
      setMessage({ kind: 'error', text: 'Confirma la evidencia, su referencia opaca y la fecha de aceptación.' });
      return;
    }
    if (needsReason && (reason.trim().length < 3 || reason.trim().length > 500)) {
      setMessage({ kind: 'error', text: 'La razón auditable debe tener entre 3 y 500 caracteres.' });
      return;
    }
    if (needsReason && !window.confirm(`¿Confirmas la transición “${ACTION_LABELS[action]}”?`)) return;

    const consentIso = consentDate?.toISOString() ?? null;
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch('/api/admin/diagnostic/pilot-enrollments', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          userId: normalizedUserId,
          cohortId: normalizedCohortId,
          action,
          ...(needsConsent ? {
            consentConfirmed: true,
            consentedAt: consentIso,
            consentReference: consentReference.trim(),
          } : {}),
          ...(needsReason ? { reason: reason.trim() } : {}),
        }),
      });
      const payload = await response.json().catch(() => null) as {
        error?: string;
        receipt?: { status?: string; cohortId?: string };
      } | null;
      if (!response.ok) {
        setMessage({ kind: 'error', text: payload?.error ?? 'No fue posible registrar la transición.' });
        return;
      }
      setMessage({
        kind: 'success',
        text: `Transición ${payload?.receipt?.status ?? action} registrada para la cohorte ${payload?.receipt?.cohortId ?? normalizedCohortId}.`,
      });
      setUserId('');
      setConsentReference('');
      setConsentConfirmed(false);
      setConsentedAt('');
      setReason('');
    } catch {
      setMessage({ kind: 'error', text: 'No fue posible conectar con el servidor.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <section aria-labelledby="pilot-enrollment-title" style={{ marginBottom: 28, border: '1px solid #d8cabe', borderRadius: 14, padding: 18, background: '#fff' }}>
      <h2 id="pilot-enrollment-title" style={{ margin: '0 0 6px', fontSize: 20 }}>Cohorte privada del piloto</h2>
      <p style={{ margin: '0 0 14px', color: '#6b7280', fontSize: 13, maxWidth: 860 }}>
        Registra una transición por participante. La versión normativa la fija el servidor y la referencia debe ser solo un ID opaco del comprobante, nunca un nombre, correo ni contenido del documento.
      </p>
      <p style={{ margin: '0 0 14px', color: consentVersion ? '#166534' : '#991b1b', fontSize: 12, fontWeight: 700 }}>
        {consentVersion ? `Consentimiento vigente: ${consentVersion}` : 'Bloqueado: falta DIAGNOSTIC_PILOT_CONSENT_VERSION.'}
      </p>
      <form onSubmit={event => void submit(event)} style={{ display: 'grid', gap: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: 10 }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>
            UUID del usuario
            <input required autoComplete="off" value={userId} onChange={event => setUserId(event.target.value)} placeholder="00000000-0000-4000-8000-000000000000" style={{ boxSizing: 'border-box', display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8 }} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 700 }}>
            Cohorte
            <input required autoComplete="off" value={cohortId} onChange={event => setCohortId(event.target.value.toLowerCase())} placeholder="pilot-2026-01" pattern="[a-z0-9][a-z0-9._-]{2,99}" style={{ boxSizing: 'border-box', display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8 }} />
          </label>
          <label style={{ fontSize: 12, fontWeight: 700 }}>
            Transición
            <select value={action} onChange={event => changeAction(event.target.value as EnrollmentAction)} style={{ display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8, background: '#fff' }}>
              {Object.entries(ACTION_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
        </div>
        {needsConsent ? (
          <fieldset style={{ display: 'grid', gap: 10, margin: 0, border: '1px solid #e8ddd4', borderRadius: 10, padding: 12 }}>
            <legend style={{ padding: '0 5px', fontSize: 12, fontWeight: 800 }}>Evidencia de consentimiento</legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 10 }}>
              <label style={{ fontSize: 12, fontWeight: 700 }}>
                Fecha y hora de aceptación
                <input required type="datetime-local" value={consentedAt} onChange={event => setConsentedAt(event.target.value)} style={{ boxSizing: 'border-box', display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8 }} />
              </label>
              <label style={{ fontSize: 12, fontWeight: 700 }}>
                Referencia opaca
                <input required autoComplete="off" value={consentReference} onChange={event => setConsentReference(event.target.value)} placeholder="form:pilot-2026:receipt-001" pattern="[A-Za-z0-9][A-Za-z0-9._:/-]{2,199}" style={{ boxSizing: 'border-box', display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8 }} />
              </label>
            </div>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 12 }}>
              <input required type="checkbox" checked={consentConfirmed} onChange={event => setConsentConfirmed(event.target.checked)} />
              Verifiqué que esta persona aceptó la versión vigente y que la referencia identifica el comprobante correspondiente.
            </label>
          </fieldset>
        ) : null}
        {needsReason ? (
          <label style={{ fontSize: 12, fontWeight: 700 }}>
            Razón auditable
            <textarea required minLength={3} maxLength={500} rows={3} value={reason} onChange={event => setReason(event.target.value)} style={{ boxSizing: 'border-box', display: 'block', width: '100%', marginTop: 5, padding: 10, border: '1px solid #d8cabe', borderRadius: 8, resize: 'vertical' }} />
          </label>
        ) : null}
        {message ? <p role="status" aria-live="polite" style={{ margin: 0, color: message.kind === 'success' ? '#166534' : '#991b1b', fontSize: 12 }}>{message.text}</p> : null}
        <button type="submit" disabled={saving || configurationBlocked} style={{ justifySelf: 'start', minHeight: 44, border: 0, borderRadius: 9, padding: '10px 16px', background: '#8f461f', color: '#fff', fontWeight: 800, cursor: saving || configurationBlocked ? 'not-allowed' : 'pointer', opacity: saving || configurationBlocked ? 0.5 : 1 }}>
          {saving ? 'Registrando…' : ACTION_LABELS[action]}
        </button>
      </form>
    </section>
  );
}
