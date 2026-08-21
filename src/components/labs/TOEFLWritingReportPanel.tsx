'use client';

import type { AssessmentState } from '@/lib/labs/hooks/useWritingAssessment';
import type { FullAssessment } from '@/lib/labs/types';

interface Props {
  taskLabel: string;
  state: AssessmentState;
  result: FullAssessment | null;
}

export function TOEFLWritingReportPanel({ taskLabel, state, result }: Props) {
  if (state === 'loading') return (
    <section className="t26-writing-report" aria-live="polite">
      <h3>{taskLabel}</h3><p>Generando corrección pedagógica y guardándola en tu entrega…</p>
    </section>
  );
  if (state === 'saturated') return (
    <section className="t26-writing-report"><h3>{taskLabel}</h3><p>El corrector automático está ocupado. Tu texto quedó guardado para revisión del profesor.</p></section>
  );
  if (state === 'unavailable' || !result) return (
    <section className="t26-writing-report"><h3>{taskLabel}</h3><p>Texto guardado; reporte automático pendiente de revisión.</p></section>
  );

  return (
    <section className="t26-writing-report">
      <div className="t26-writing-report__head">
        <div><h3>{taskLabel}</h3><p>{result.wordCount} palabras · estimación pedagógica</p></div>
        <strong>{result.overallBand}/5</strong>
      </div>
      <p className="t26-writing-report__notice">Puntaje de esta tarea según nuestra interpretación operativa de la guía pública; no es un score oficial de ETS ni una conversión a 1–6.</p>
      <div className="t26-writing-report__criteria">
        {result.criteria.map(criterion => (
          <div key={criterion.criterion}><strong>{criterion.criterion} · {criterion.band}</strong><p>{criterion.reason}</p></div>
        ))}
      </div>
      {result.allIssues.length > 0 && (
        <details><summary>Oportunidades de mejora ({result.allIssues.length})</summary>
          <ul>{result.allIssues.map((issue, index) => <li key={`${issue.quote}-${index}`}><strong>“{issue.quote}”</strong> → {issue.suggestion}. {issue.explanation}</li>)}</ul>
        </details>
      )}
      {result.rewritten && <details><summary>Versión corregida</summary><p className="t26-writing-report__rewrite">{result.rewritten}</p></details>}
    </section>
  );
}
