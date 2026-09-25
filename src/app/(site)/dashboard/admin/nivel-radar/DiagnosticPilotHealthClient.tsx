'use client';

import { useState } from 'react';

type GateMap = Readonly<Record<string, boolean>>;

type PilotReport = {
  reportVersion: string;
  generatedAt: string;
  decision: 'HOLD' | 'ELIGIBLE_FOR_VALIDATION_REVIEW';
  criteria: { version: string; status: string };
  bankSnapshot: {
    sha256: string;
    objectiveItems: number;
    retiredObjectiveItems: number;
    writingPrompts: number;
    retiredWritingPrompts: number;
  };
  gates: GateMap;
  attempts: {
    started: number;
    completed: number;
    completionRate: number | null;
    medianCompletionMs: number | null;
    p90CompletionMs: number | null;
    statusCounts: Readonly<Record<string, number>>;
    completedRouteCounts: Readonly<Record<string, number>>;
  };
  operations: {
    activeAttempts: number;
    overdueActiveAttempts: number;
    abandonedAttempts: number;
    expiredAttempts: number;
    objectiveMedianResponseMs: number | null;
    objectiveP90ResponseMs: number | null;
    listeningResponses: number;
    listeningStartedRate: number | null;
    listeningResponsesWithoutPlayback: number;
    writingQueueOpen: number;
    writingQueueOldestMs: number | null;
    writingFailed: number;
    writingMedianTurnaroundMs: number | null;
    writingP90TurnaroundMs: number | null;
    monitoringCoverage: {
      applicationErrorRate: 'structured-runtime-logs';
      audioDeliveryFailureRate: 'structured-runtime-logs';
      forwardingAndAlerts: 'deployment-verification-required';
    };
  };
  flagCounts: readonly { flag: string; count: number }[];
  writingAgreement: { comparablePairs: number; exactAgreement: number | null };
  independentReference: { pairs: number; withinOneLevel: number | null; referenceLevelCounts: Readonly<Record<string, number>> };
  measurementEvidence: {
    bindingValid: boolean;
    provenanceBound: boolean;
    approvalBound: boolean;
    status: string | null;
  };
  warnings: readonly string[];
};

const GATE_LABELS: Readonly<Record<string, string>> = {
  criteriaApproved: 'Criterios aprobados',
  attemptVolume: 'Volumen de intentos',
  completion: 'Finalización',
  routeCoverage: 'Cobertura de rutas',
  itemSamples: 'Muestra por ítem',
  itemQuality: 'Calidad de ítems',
  distractorFunctioning: 'Distractores',
  writingAgreement: 'Acuerdo de escritura',
  independentReference: 'Referencia independiente',
  referenceLevelCoverage: 'Cobertura A1–C2',
  adaptiveReliability: 'Fiabilidad adaptativa',
  classificationConsistency: 'Consistencia de nivel',
  stability: 'Estabilidad',
  fairnessReview: 'Equidad / DIF',
  standardSettingReview: 'Cortes MCER',
};

const ROUTE_LABELS: Readonly<Record<string, string>> = {
  'low-a1-a2': 'Ruta A1–A2',
  'mid-b1-b2': 'Ruta B1–B2',
  'high-c1-c2': 'Ruta C1–C2',
};

function percent(value: number | null): string {
  return value === null ? 'Sin datos' : `${Math.round(value * 100)}%`;
}

function duration(value: number | null): string {
  if (value === null) return 'Sin datos';
  return `${Math.round(value / 60_000)} min`;
}

function latency(value: number | null): string {
  if (value === null) return 'Sin datos';
  return value < 60_000 ? `${(value / 1_000).toFixed(1)} s` : duration(value);
}

function Card({ label, value, detail }: { label: string; value: string | number; detail?: string }) {
  return (
    <div style={{ border: '1px solid #e8ddd4', borderRadius: 10, padding: 12, background: '#fff' }}>
      <div style={{ color: '#6b7280', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.04em' }}>{label}</div>
      <div style={{ marginTop: 4, fontSize: 22, fontWeight: 850 }}>{value}</div>
      {detail ? <div style={{ marginTop: 3, color: '#6b7280', fontSize: 11 }}>{detail}</div> : null}
    </div>
  );
}

export default function DiagnosticPilotHealthClient() {
  const [windowDays, setWindowDays] = useState(180);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<PilotReport | null>(null);
  const [error, setError] = useState('');

  async function load() {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const since = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1_000).toISOString();
      const response = await fetch(`/api/admin/diagnostic/pilot-report?scope=health&since=${encodeURIComponent(since)}`, {
        method: 'GET', credentials: 'same-origin', cache: 'no-store',
      });
      const payload = await response.json().catch(() => null) as { report?: PilotReport; error?: string } | null;
      if (!response.ok || !payload?.report) {
        setError(payload?.error ?? 'No fue posible generar el informe agregado.');
        return;
      }
      setReport(payload.report);
    } catch {
      setError('No fue posible conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section aria-labelledby="pilot-health-title" style={{ marginBottom: 28, border: '1px solid #d8cabe', borderRadius: 14, padding: 18, background: '#fff' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
        <div>
          <h2 id="pilot-health-title" style={{ margin: '0 0 6px', fontSize: 20 }}>Salud agregada del piloto</h2>
          <p style={{ margin: 0, color: '#6b7280', fontSize: 13, maxWidth: 780 }}>
            Solo métricas agregadas. Esta vista no solicita ni muestra identidades, respuestas, textos de escritura, claves o etiquetas de grupos.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'end', gap: 8, flexWrap: 'wrap' }}>
          <label style={{ fontSize: 12, fontWeight: 700 }}>
            Ventana
            <select value={windowDays} onChange={event => setWindowDays(Number(event.target.value))} style={{ display: 'block', marginTop: 5, padding: 9, border: '1px solid #d8cabe', borderRadius: 8, background: '#fff' }}>
              <option value={30}>30 días</option>
              <option value={90}>90 días</option>
              <option value={180}>180 días</option>
              <option value={365}>365 días</option>
            </select>
          </label>
          <button type="button" disabled={loading} onClick={() => void load()} style={{ minHeight: 40, border: 0, borderRadius: 9, padding: '9px 14px', background: '#1a1a2e', color: '#fff', fontWeight: 800, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Calculando…' : report ? 'Actualizar informe' : 'Cargar informe'}
          </button>
        </div>
      </div>

      {error ? <p role="alert" style={{ margin: '14px 0 0', color: '#991b1b', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 9, padding: 10 }}>{error}</p> : null}
      {!report && !error ? <p style={{ margin: '14px 0 0', color: '#6b7280', fontSize: 12 }}>La carga es manual para respetar el límite administrativo de informes.</p> : null}

      {report ? (
        <div aria-live="polite" style={{ marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            <strong style={{ color: report.decision === 'ELIGIBLE_FOR_VALIDATION_REVIEW' ? '#166534' : '#991b1b' }}>
              {report.decision === 'ELIGIBLE_FOR_VALIDATION_REVIEW' ? 'Elegible para revisión' : 'HOLD'}
            </strong>
            <span style={{ color: '#6b7280', fontSize: 12 }}>
              Generado {new Date(report.generatedAt).toLocaleString('es-CO')} · {report.criteria.version}
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))', gap: 9 }}>
            <Card label="Iniciados" value={report.attempts.started} />
            <Card label="Completados" value={report.attempts.completed} detail={percent(report.attempts.completionRate)} />
            <Card label="No completados" value={Math.max(0, report.attempts.started - report.attempts.completed)} />
            <Card label="Duración" value={duration(report.attempts.medianCompletionMs)} detail={`p90: ${duration(report.attempts.p90CompletionMs)}`} />
            <Card label="Escritura doble" value={report.writingAgreement.comparablePairs} detail={`Acuerdo exacto: ${percent(report.writingAgreement.exactAgreement)}`} />
            <Card label="Referencias" value={report.independentReference.pairs} detail={`±1 nivel: ${percent(report.independentReference.withinOneLevel)}`} />
            <Card label="Ítems activos" value={report.bankSnapshot.objectiveItems} detail={`${report.bankSnapshot.retiredObjectiveItems} retirados`} />
            <Card label="Consignas activas" value={report.bankSnapshot.writingPrompts} detail={`${report.bankSnapshot.retiredWritingPrompts} retiradas`} />
          </div>

          <h3 style={{ margin: '18px 0 8px', fontSize: 15 }}>Rutas completadas</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
            {Object.entries(ROUTE_LABELS).map(([route, label]) => <Card key={route} label={label} value={report.attempts.completedRouteCounts[route] ?? 0} />)}
          </div>

          <h3 style={{ margin: '18px 0 8px', fontSize: 15 }}>Operación para rollout</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(165px, 1fr))', gap: 8 }}>
            <Card label="Intentos activos" value={report.operations.activeAttempts} detail={`${report.operations.overdueActiveAttempts} vencidos sin cerrar`} />
            <Card label="Abandono / expiración" value={report.operations.abandonedAttempts + report.operations.expiredAttempts} detail={`${report.operations.abandonedAttempts} abandonados · ${report.operations.expiredAttempts} expirados`} />
            <Card label="Latencia por respuesta" value={latency(report.operations.objectiveMedianResponseMs)} detail={`p90: ${latency(report.operations.objectiveP90ResponseMs)}`} />
            <Card label="Escucha iniciada" value={percent(report.operations.listeningStartedRate)} detail={`${report.operations.listeningResponsesWithoutPlayback} respuestas intentadas sin reproducción`} />
            <Card label="Cola de escritura" value={report.operations.writingQueueOpen} detail={`más antigua: ${duration(report.operations.writingQueueOldestMs)}`} />
            <Card label="Turnaround escritura" value={duration(report.operations.writingMedianTurnaroundMs)} detail={`p90: ${duration(report.operations.writingP90TurnaroundMs)} · ${report.operations.writingFailed} fallidas`} />
          </div>
          <p role="note" style={{ margin: '9px 0 0', color: '#92400e', fontSize: 11 }}>
            Errores de aplicación y entrega de audio emiten logs estructurados sin datos personales. El forwarding, las alertas y su recepción deben verificarse en el despliegue; esta vista no infiere ceros.
          </p>

          <h3 style={{ margin: '18px 0 8px', fontSize: 15 }}>Estados de intento</h3>
          <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
            {Object.entries(report.attempts.statusCounts).map(([status, count]) => (
              <span key={status} style={{ border: '1px solid #e8ddd4', borderRadius: 999, padding: '6px 9px', fontSize: 12 }}>
                {status}: <strong>{count}</strong>
              </span>
            ))}
          </div>

          <h3 style={{ margin: '18px 0 8px', fontSize: 15 }}>Puertas del piloto</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 7 }}>
            {Object.entries(report.gates).map(([gate, passed]) => (
              <div key={gate} style={{ border: `1px solid ${passed ? '#bbf7d0' : '#fed7aa'}`, background: passed ? '#f0fdf4' : '#fff7ed', borderRadius: 8, padding: '8px 10px', fontSize: 12 }}>
                <span aria-hidden="true">{passed ? '✓' : '○'} </span>
                <strong>{GATE_LABELS[gate] ?? gate}</strong>
              </div>
            ))}
          </div>

          <h3 style={{ margin: '18px 0 8px', fontSize: 15 }}>Cadena psicométrica</h3>
          <p style={{ margin: 0, color: '#4b5563', fontSize: 12 }}>
            Estado: {report.measurementEvidence.status ?? 'sin evidencia'} · procedencia {report.measurementEvidence.provenanceBound ? 'ligada' : 'pendiente'} · aprobación {report.measurementEvidence.approvalBound ? 'ligada' : 'pendiente'} · banco/criterios {report.measurementEvidence.bindingValid ? 'vigentes' : 'sin validar'}.
          </p>

          {(report.flagCounts.length > 0 || report.warnings.length > 0) ? (
            <div style={{ marginTop: 16, border: '1px solid #fed7aa', background: '#fff7ed', borderRadius: 10, padding: 12 }}>
              <h3 style={{ margin: '0 0 7px', fontSize: 14 }}>Alertas agregadas</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: '#7c2d12', fontSize: 12 }}>
                {report.warnings.map(warning => <li key={`warning:${warning}`}>{warning}</li>)}
                {report.flagCounts.map(({ flag, count }) => <li key={`flag:${flag}`}>{flag}: {count} ítems</li>)}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
