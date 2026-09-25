'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import type { DiagnosticWritingReviewView } from '@/lib/diagnostic/admin-review';
import { CEFR_LEVELS, type CefrLevel } from '@/lib/diagnostic/types';
import { DIAGNOSTIC_WRITING_CRITERIA, type DiagnosticWritingCriterion } from '@/lib/diagnostic/writing';

const LABELS: Record<DiagnosticWritingCriterion, string> = {
  'task-fulfilment': 'Cumplimiento de tarea', organisation: 'Organización',
  'grammar-control': 'Control gramatical', 'vocabulary-control': 'Control léxico',
};

interface DraftCriterion {
  level: CefrLevel;
  confidence: number;
  evidence: string;
  rationale: string;
}

const freshCriteria = (): Record<DiagnosticWritingCriterion, DraftCriterion> => Object.fromEntries(
  DIAGNOSTIC_WRITING_CRITERIA.map(criterion => [criterion, {
    level: 'B1', confidence: 0.6, evidence: '', rationale: '',
  }]),
) as Record<DiagnosticWritingCriterion, DraftCriterion>;

function EvidenceCard({ title, evaluation }: {
  title: string;
  evaluation: NonNullable<DiagnosticWritingReviewView['automated']>;
}) {
  return <section style={{ border: '1px solid #e8ddd4', borderRadius: 12, padding: 12, background: '#fff' }}>
    <h3 style={{ margin: '0 0 8px', fontSize: 13 }}>{title}</h3>
    {evaluation.criteria.map(criterion => <div key={criterion.criterion} style={{ padding: '8px 0', borderTop: '1px solid #f0ebe4' }}>
      <strong style={{ fontSize: 12 }}>{LABELS[criterion.criterion]} · {criterion.level} · {Math.round(criterion.confidence * 100)}%</strong>
      <p style={{ margin: '3px 0', fontSize: 11, color: '#6b7280' }}>{criterion.rationale}</p>
      <p style={{ margin: 0, fontSize: 11 }}>“{criterion.evidence.join('” · “')}”</p>
    </div>)}
  </section>;
}

export default function DiagnosticWritingReviewClient({ items, currentReviewerId }: {
  items: readonly DiagnosticWritingReviewView[];
  currentReviewerId: string;
}) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(items[0]?.attemptId ?? '');
  const [criteria, setCriteria] = useState(freshCriteria);
  const [decision, setDecision] = useState<'accept' | 'revise' | 'exclude'>('accept');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const active = useMemo(() => items.find(item => item.attemptId === selectedId) ?? items[0], [items, selectedId]);

  function updateCriterion(criterion: DiagnosticWritingCriterion, patch: Partial<DraftCriterion>) {
    setCriteria(current => ({ ...current, [criterion]: { ...current[criterion], ...patch } }));
  }

  function selectAttempt(attemptId: string) {
    setSelectedId(attemptId);
    setCriteria(freshCriteria());
    setDecision('accept');
    setMessage('');
  }

  async function submit() {
    if (!active || saving) return;
    const adjudicating = active.status === 'adjudication';
    if (adjudicating && active.human?.reviewerId === currentReviewerId) {
      setMessage('La adjudicación debe hacerla otro administrador.');
      return;
    }
    const mapped = DIAGNOSTIC_WRITING_CRITERIA.map(criterion => ({
      criterion,
      level: criteria[criterion].level,
      confidence: criteria[criterion].confidence,
      evidence: [criteria[criterion].evidence.trim()],
      rationale: criteria[criterion].rationale.trim(),
    }));
    if (mapped.some(item => !item.evidence[0] || !active.responseText.includes(item.evidence[0]) || item.rationale.length < 20)) {
      setMessage('Cada criterio necesita una cita literal de la respuesta y una justificación de al menos 20 caracteres.');
      return;
    }
    const evaluation = {
      evaluator: 'human', reviewerId: 'server-bound-reviewer', rubricVersion: active.rubricVersion,
      promptId: active.prompt.id, promptContentVersion: active.prompt.contentVersion,
      responseSha256: active.responseSha256, criteria: mapped, decision,
      evaluatedAt: new Date().toISOString(),
    };
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`/api/admin/diagnostic/attempts/${encodeURIComponent(active.attemptId)}/finalize`, {
        method: 'POST', credentials: 'same-origin', headers: { 'content-type': 'application/json' },
        body: JSON.stringify(adjudicating ? { adjudicated: evaluation } : { human: evaluation }),
      });
      const payload = await response.json().catch(() => null) as { code?: string; error?: string } | null;
      if (!response.ok) {
        setMessage(payload?.code === 'ADJUDICATION_REQUIRED'
          ? 'La revisión quedó guardada y requiere una segunda persona para adjudicar.'
          : payload?.error ?? 'No fue posible guardar la revisión.');
        if (payload?.code === 'ADJUDICATION_REQUIRED') router.refresh();
        return;
      }
      setMessage('Resultado finalizado correctamente.');
      router.refresh();
    } catch {
      setMessage('No fue posible conectar con el servidor.');
    } finally {
      setSaving(false);
    }
  }

  if (!active) return <div style={{ background: '#fff', borderRadius: 14, padding: 20 }}>No hay escrituras listas para revisión.</div>;
  const adjudicating = active.status === 'adjudication';
  const blockedAdjudicator = adjudicating && active.human?.reviewerId === currentReviewerId;
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 16 }}>
    <aside style={{ background: '#fff', borderRadius: 14, padding: 10, alignSelf: 'start' }}>
      {items.map(item => <button key={item.attemptId} type="button" onClick={() => selectAttempt(item.attemptId)} style={{ width: '100%', textAlign: 'left', border: 0, borderRadius: 10, padding: 12, marginBottom: 6, cursor: 'pointer', background: item.attemptId === active.attemptId ? '#f3e7dc' : 'transparent' }}>
        <strong style={{ display: 'block', fontSize: 12 }}>{item.prompt.title}</strong>
        <span style={{ fontSize: 10, color: '#6b7280' }}>{item.status === 'adjudication' ? 'Adjudicación' : 'Revisión ciega'} · {item.wordCount} palabras</span>
      </button>)}
    </aside>
    <section style={{ minWidth: 0, display: 'grid', gap: 14 }}>
      <div style={{ background: '#fff', borderRadius: 14, padding: 18 }}>
        <span style={{ color: '#8f461f', fontSize: 11, fontWeight: 800 }}>{active.prompt.levelCandidate} candidato · {active.routeId ?? 'sin ruta'}</span>
        <h2 style={{ margin: '6px 0' }}>{active.prompt.title}</h2>
        <p style={{ margin: '0 0 8px', color: '#6b7280' }}>{active.prompt.situation}</p>
        <ul>{active.prompt.instructions.map(instruction => <li key={instruction}>{instruction}</li>)}</ul>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.65, background: '#f8f6f3', borderRadius: 10, padding: 14 }}>{active.responseText}</div>
      </div>
      {adjudicating && active.automated && active.human && <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10 }}>
        <EvidenceCard title={`Automático · ${active.automated.model ?? 'modelo'}`} evaluation={active.automated} />
        <EvidenceCard title="Primera revisión humana" evaluation={active.human} />
      </div>}
      <div style={{ background: '#fff', borderRadius: 14, padding: 18, display: 'grid', gap: 14 }}>
        <h2 style={{ margin: 0, fontSize: 18 }}>{adjudicating ? 'Adjudicación independiente' : 'Rúbrica MCER · revisión ciega'}</h2>
        {DIAGNOSTIC_WRITING_CRITERIA.map(criterion => <fieldset key={criterion} disabled={blockedAdjudicator || saving} style={{ border: '1px solid #e8ddd4', borderRadius: 10, padding: 12 }}>
          <legend style={{ fontWeight: 800, fontSize: 13 }}>{LABELS[criterion]}</legend>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 150px), 1fr))', gap: 8 }}>
            <label style={{ fontSize: 11 }}>Nivel<select value={criteria[criterion].level} onChange={event => updateCriterion(criterion, { level: event.target.value as CefrLevel })} style={{ display: 'block', width: '100%', padding: 8 }}><>{CEFR_LEVELS.map(level => <option key={level}>{level}</option>)}</></select></label>
            <label style={{ fontSize: 11 }}>Confianza<select value={criteria[criterion].confidence} onChange={event => updateCriterion(criterion, { confidence: Number(event.target.value) })} style={{ display: 'block', width: '100%', padding: 8 }}>{[0.4, 0.5, 0.6, 0.7, 0.8].map(value => <option key={value} value={value}>{Math.round(value * 100)}%</option>)}</select></label>
            <label style={{ fontSize: 11 }}>Cita literal<input value={criteria[criterion].evidence} onChange={event => updateCriterion(criterion, { evidence: event.target.value })} style={{ display: 'block', width: '100%', padding: 8 }} /></label>
          </div>
          <label style={{ display: 'block', marginTop: 8, fontSize: 11 }}>Justificación<textarea rows={3} value={criteria[criterion].rationale} onChange={event => updateCriterion(criterion, { rationale: event.target.value })} style={{ display: 'block', width: '100%', padding: 8 }} /></label>
        </fieldset>)}
        <label style={{ fontSize: 12 }}>Decisión <select value={decision} onChange={event => setDecision(event.target.value as typeof decision)} disabled={blockedAdjudicator || saving} style={{ marginLeft: 8, padding: 8 }}><option value="accept">Aceptar</option><option value="revise">Requiere revisión</option><option value="exclude">Excluir muestra</option></select></label>
        {blockedAdjudicator && <p role="alert" style={{ color: '#991b1b' }}>La persona que hizo la primera revisión no puede adjudicar este caso.</p>}
        {message && <p role="status" style={{ margin: 0, color: message.includes('correctamente') ? '#166534' : '#92400e' }}>{message}</p>}
        <button type="button" onClick={() => void submit()} disabled={blockedAdjudicator || saving} style={{ border: 0, borderRadius: 10, padding: 12, background: '#8f461f', color: '#fff', fontWeight: 800, cursor: 'pointer', opacity: blockedAdjudicator || saving ? 0.5 : 1 }}>{saving ? 'Guardando…' : adjudicating ? 'Cerrar adjudicación' : 'Guardar revisión'}</button>
      </div>
    </section>
  </div>;
}
