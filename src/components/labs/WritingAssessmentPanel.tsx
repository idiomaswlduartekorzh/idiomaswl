'use client';

/**
 * Panel de corrección de Writing para las páginas de examen REALES
 * (IELTS/TOEFL/Cambridge). Llama a /api/labs/exam-writing-assess con el
 * ensayo que ya escribió el estudiante — la consigna la resuelve el
 * servidor, este componente no la conoce.
 *
 * Diseño defensivo por si LABS_ENABLED o las API keys no están configuradas
 * en producción todavía: cualquier fallo que no sea "saturación" (rate
 * limit / proveedor caído) degrada silenciosamente al mismo mensaje que
 * ya existía ("pendiente de corrección") — nunca rompe la página del
 * estudiante ni asusta con un error técnico.
 */

import { useEffect, useState } from 'react';

const WA_NUMBER = '573005004253';
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

interface CriterionScore {
  criterion: string;
  band:      number;
  reason:    string;
}
interface TextIssue {
  quote:       string;
  suggestion:  string;
  explanation: string;
  severity:    'critica' | 'moderada' | 'menor';
  issueType?:  'vocabulary' | 'grammar' | 'style' | 'unclear';
}
interface AssessmentResult {
  overallBand: number;
  criteria:    CriterionScore[];
  topIssues:   TextIssue[];
  hiddenIssueCount: number;
  wordCount:   number;
}

const ISSUE_COLOR: Record<string, string> = {
  vocabulary: 'text-purple-300 bg-purple-400/10 border-purple-400/30',
  grammar:    'text-red-300 bg-red-400/10 border-red-400/30',
  style:      'text-amber-300 bg-amber-400/10 border-amber-400/30',
  unclear:    'text-blue-300 bg-blue-400/10 border-blue-400/30',
};

const LOADING_MESSAGES = [
  'Leyendo tu respuesta…',
  'Revisando gramática y vocabulario…',
  'Calculando tu puntaje…',
];

function bandColor(band: number, max: number) {
  const pct = band / max;
  if (pct >= 0.75) return 'text-emerald-400';
  if (pct >= 0.55) return 'text-amber-400';
  return 'text-red-400';
}

interface Props {
  examSlug:   'ielts' | 'toefl' | 'cambridge-b2' | 'goethe' | 'cils-celi' | 'delf-dalf' | 'celpe-bras';
  mockId:     string;
  taskNumber: 1 | 2 | 3 | 4;
  taskLabel:  string;
  essay:      string;
  /** Máximo real de la escala de esa rúbrica (9 IELTS, 5 TOEFL/Cambridge/CELPE-Bras,
   *  20 CILS, 25 DELF/DALF, 100 Goethe) — sin esto el color de la banda salía mal
   *  para cualquier examen que no fuera /9. */
  maxScore:   number;
  /** Texto de respaldo si el motor no está disponible (mantiene el mensaje original). */
  fallbackNotice: string;
}

export function WritingAssessmentPanel({ examSlug, mockId, taskNumber, taskLabel, essay, maxScore, fallbackNotice }: Props) {
  // Estado inicial ya resuelve el caso "sin ensayo" — evita setState síncrono
  // dentro del effect para esa rama.
  const [state, setState] = useState<'loading' | 'success' | 'saturated' | 'unavailable'>(
    () => (essay.trim() ? 'loading' : 'unavailable'),
  );
  const [result, setResult] = useState<AssessmentResult | null>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (!essay.trim()) return;

    const timer = setInterval(() => setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length), 2500);

    let cancelled = false;
    fetch('/api/labs/exam-writing-assess', {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify({ examSlug, mockId, taskNumber, essay }),
    })
      .then(async (res) => {
        if (cancelled) return;
        const data = await res.json().catch(() => null);
        if (res.ok && data) {
          setResult(data);
          setState('success');
        } else if (res.status === 429 || res.status === 502) {
          setState('saturated');
        } else {
          // 404 (LABS_ENABLED off), 503 (falta key), 400 (edge case) → degradar sin asustar.
          setState('unavailable');
        }
      })
      .catch(() => { if (!cancelled) setState('unavailable'); })
      .finally(() => clearInterval(timer));

    return () => { cancelled = true; clearInterval(timer); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state === 'unavailable') {
    return (
      <div className="ielts-pending-notice">
        <div className="ielts-pending-notice__icon">📝</div>
        <div>
          <p className="ielts-pending-notice__title">{taskLabel} — Pendiente de corrección</p>
          <p className="ielts-pending-notice__sub">{fallbackNotice}</p>
        </div>
      </div>
    );
  }

  if (state === 'loading') {
    return (
      <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <p className="text-sm font-semibold text-[var(--fg)] mb-1">{taskLabel}</p>
        <p className="text-xs text-[var(--muted)]">{LOADING_MESSAGES[messageIndex]}</p>
        <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-[var(--border)]">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[var(--accent)]" />
        </div>
      </div>
    );
  }

  if (state === 'saturated') {
    return (
      <div className="mt-4 rounded-xl border border-[var(--accent)]/30 bg-[var(--accent)]/[0.06] p-5">
        <p className="text-sm font-semibold text-[var(--fg)] mb-1">{taskLabel} — Evaluador muy solicitado</p>
        <p className="text-xs text-[var(--muted)] mb-3 leading-relaxed">
          En este momento hay mucha demanda en el corrector automático y no pudimos generar tu banda al
          instante. Tu profesor la revisará igual, pero si quieres el resultado ya mismo, escríbenos.
        </p>
        <a
          href={waLink(`Hola, quiero corrección prioritaria de mi ${taskLabel} (${examSlug} ${mockId}) — el evaluador estaba saturado.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:opacity-90"
        >
          Pedir corrección prioritaria por WhatsApp
        </a>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-baseline justify-between mb-4">
        <p className="text-sm font-semibold text-[var(--fg)]">{taskLabel}</p>
        <p className={`text-2xl font-bold ${bandColor(result.overallBand, maxScore)}`}>{result.overallBand.toFixed(1)}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
        {result.criteria.map((c) => (
          <div key={c.criterion} className="rounded-lg border border-[var(--border)] p-2">
            <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">{c.criterion}</p>
            <p className={`text-lg font-bold ${bandColor(c.band, maxScore)}`}>{c.band}</p>
          </div>
        ))}
      </div>

      {result.topIssues.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[var(--muted)]">Tus errores más importantes</p>
          {result.topIssues.map((issue, i) => (
            <div key={i} className={`rounded-lg border p-2 text-xs ${ISSUE_COLOR[issue.issueType ?? 'unclear']}`}>
              <p className="font-mono">&ldquo;{issue.quote}&rdquo; → {issue.suggestion}</p>
              <p className="mt-1 text-[var(--muted)]">{issue.explanation}</p>
            </div>
          ))}
          {result.hiddenIssueCount > 0 && (
            <p className="text-[11px] text-[var(--muted)]">+{result.hiddenIssueCount} errores más detectados.</p>
          )}
        </div>
      )}
    </div>
  );
}
