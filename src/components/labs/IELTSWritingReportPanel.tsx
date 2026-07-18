'use client';

/**
 * Reporte de Writing para IELTS — versión rica: texto original con errores
 * marcados al lado de la reescritura corregida, banda por criterio,
 * oportunidades de mejora. Componente NUEVO, separado de
 * WritingAssessmentPanel.tsx (que sigue sirviendo TOEFL/Cambridge sin
 * cambios — "primero IELTS, luego revisamos el resto").
 *
 * PRESENTACIONAL: no fetchea — recibe `state`+`result` de
 * useWritingAssessment(). El caller (IELTSResults) ya llamó ese hook para
 * calcular la banda del resumen, así que este panel reusa el MISMO
 * resultado en vez de evaluar el ensayo dos veces.
 */

import { useEffect, useState } from 'react';
import type { AssessmentState } from '@/lib/labs/hooks/useWritingAssessment';
import type { FullAssessment } from '@/lib/labs/types';

const WA_NUMBER = '573005004253';
const waLink = (msg: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;

type TextIssue = FullAssessment['allIssues'][number];

const CRITERION_LABEL: Record<string, string> = {
  taskAchievement:   'Task Achievement',
  taskResponse:      'Task Response',
  coherenceCohesion: 'Coherence & Cohesion',
  lexicalResource:   'Lexical Resource',
  grammaticalRange:  'Grammatical Range',
};

const SEVERITY_MARK: Record<TextIssue['severity'], string> = {
  critica:  'bg-red-500/40 text-red-100',
  moderada: 'bg-red-400/25 text-red-200',
  menor:    'bg-red-300/15 text-red-200',
};

const LOADING_MESSAGES = [
  'Leyendo tu respuesta…',
  'Revisando gramática y vocabulario…',
  'Escribiendo la versión corregida…',
  'Calculando tu banda…',
];

function bandColor(band: number) {
  if (band >= 7) return 'text-emerald-400';
  if (band >= 5.5) return 'text-amber-400';
  return 'text-red-400';
}

/** Resalta en el texto original cada quote de allIssues, sin solapes. */
function renderHighlighted(text: string, issues: TextIssue[]) {
  const matches = issues
    .map((issue) => {
      const start = text.indexOf(issue.quote);
      return start === -1 ? null : { start, end: start + issue.quote.length, issue };
    })
    .filter((m): m is { start: number; end: number; issue: TextIssue } => m !== null)
    .sort((a, b) => a.start - b.start);

  const clean: typeof matches = [];
  let lastEnd = -1;
  for (const m of matches) {
    if (m.start >= lastEnd) { clean.push(m); lastEnd = m.end; }
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;
  clean.forEach((m, i) => {
    if (m.start > cursor) parts.push(text.slice(cursor, m.start));
    parts.push(
      <mark key={i} className={`rounded px-0.5 ${SEVERITY_MARK[m.issue.severity]}`} title={m.issue.explanation}>
        {text.slice(m.start, m.end)}
      </mark>,
    );
    cursor = m.end;
  });
  if (cursor < text.length) parts.push(text.slice(cursor));
  return parts;
}

interface Props {
  examSlug:   'ielts';
  mockId:     string;
  taskNumber: 1 | 2;
  taskLabel:  string;
  essay:      string;
  fallbackNotice: string;
  state:      AssessmentState;
  result:     FullAssessment | null;
}

export function IELTSWritingReportPanel({ examSlug, mockId, taskNumber, taskLabel, essay, fallbackNotice, state, result }: Props) {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    if (state !== 'loading') return;
    const timer = setInterval(() => setMessageIndex((i) => (i + 1) % LOADING_MESSAGES.length), 2500);
    return () => clearInterval(timer);
  }, [state]);

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
          Los dos motores de corrección están saturados en este momento. Tu profesor la revisará
          igual, pero si quieres el resultado ya mismo, escríbenos.
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

  // Task 1 depende de leer el gráfico con precisión — si el respaldo (Groq)
  // tuvo que responder en vez de Gemini, la lectura del gráfico no está
  // garantizada con la misma precisión. Ver memoria de la sesión: Groq falló
  // ese caso en pruebas.
  const showBackupCaveat = taskNumber === 1 && result.engineUsed && result.engineUsed !== 'gemini';

  return (
    <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="flex items-baseline justify-between mb-1">
        <p className="text-sm font-semibold text-[var(--fg)]">{taskLabel}</p>
        <p className={`text-3xl font-bold ${bandColor(result.overallBand)}`}>{result.overallBand.toFixed(1)}</p>
      </div>
      <p className="text-[11px] text-[var(--muted)] mb-4">{result.wordCount} palabras</p>

      {showBackupCaveat && (
        <div className="mb-4 rounded-lg border border-amber-400/30 bg-amber-400/10 p-2 text-[11px] text-amber-200">
          Evaluado con el motor de respaldo — la lectura del gráfico no tiene la misma precisión
          garantizada que con el motor principal. Tu profesor puede revisarla si tienes dudas.
        </div>
      )}

      {/* Banda por criterio */}
      <div className="grid grid-cols-2 gap-2 mb-5 sm:grid-cols-4">
        {result.criteria.map((c) => (
          <div key={c.criterion} className="rounded-lg border border-[var(--border)] p-2">
            <p className="text-[10px] uppercase tracking-wide text-[var(--muted)]">
              {CRITERION_LABEL[c.criterion] ?? c.criterion}
            </p>
            <p className={`text-lg font-bold ${bandColor(c.band)}`}>{c.band}</p>
          </div>
        ))}
      </div>

      {/* Texto original (errores en rojo) al lado de la corrección */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 mb-5">
        <div>
          <p className="text-xs font-semibold text-[var(--muted)] mb-2">Tu ensayo</p>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--bg)] p-3 text-sm leading-relaxed whitespace-pre-wrap">
            {renderHighlighted(essay, result.allIssues)}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-400 mb-2">Versión corregida</p>
          <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.03] p-3 text-sm leading-relaxed whitespace-pre-wrap">
            {result.rewritten}
          </div>
        </div>
      </div>

      {/* Oportunidades de mejora */}
      {result.allIssues.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-[var(--muted)] mb-2">
            Oportunidades de mejora ({result.allIssues.length})
          </p>
          <div className="space-y-2">
            {result.allIssues.map((issue, i) => (
              <div key={i} className="rounded-lg border border-[var(--border)] p-2 text-xs">
                <p className="font-mono text-red-300">&ldquo;{issue.quote}&rdquo; → {issue.suggestion}</p>
                <p className="mt-1 text-[var(--muted)]">{issue.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
