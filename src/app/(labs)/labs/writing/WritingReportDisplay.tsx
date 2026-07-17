'use client';

import type { FreeAssessment, IeltsTask, TextIssue } from '@/lib/labs/types';

const CRITERION_LABEL: Record<string, string> = {
  taskAchievement:   'Task Achievement',
  taskResponse:      'Task Response',
  coherenceCohesion: 'Coherence & Cohesion',
  lexicalResource:   'Lexical Resource',
  grammaticalRange:  'Grammar',
};

const ISSUE_TYPE_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  vocabulary: {
    bg: 'bg-purple-400/20',
    text: 'text-purple-200',
    border: 'border-purple-400/40',
  },
  grammar: {
    bg: 'bg-red-400/20',
    text: 'text-red-200',
    border: 'border-red-400/40',
  },
  style: {
    bg: 'bg-amber-400/20',
    text: 'text-amber-200',
    border: 'border-amber-400/40',
  },
  unclear: {
    bg: 'bg-blue-400/20',
    text: 'text-blue-200',
    border: 'border-blue-400/40',
  },
};

function bandColor(band: number): string {
  if (band >= 7) return 'text-emerald-300';
  if (band >= 6) return 'text-amber-300';
  return 'text-red-300';
}

function HighlightedText({ text, issues }: { text: string; issues: TextIssue[] }) {
  if (!issues.length) return <p className="text-white/70">{text}</p>;

  const parts: Array<{ text: string; issue?: TextIssue }> = [];
  let lastIdx = 0;

  // Sort by position en el texto (aproximado, basado en indexOf)
  const sortedIssues = [...issues].sort((a, b) => {
    const aIdx = text.indexOf(a.quote);
    const bIdx = text.indexOf(b.quote);
    return aIdx - bIdx;
  });

  for (const issue of sortedIssues) {
    const idx = text.indexOf(issue.quote, lastIdx);
    if (idx > -1) {
      if (idx > lastIdx) {
        parts.push({ text: text.slice(lastIdx, idx) });
      }
      parts.push({ text: issue.quote, issue });
      lastIdx = idx + issue.quote.length;
    }
  }

  if (lastIdx < text.length) {
    parts.push({ text: text.slice(lastIdx) });
  }

  return (
    <p className="text-white/70 leading-relaxed">
      {parts.map((part, i) => {
        if (!part.issue) return <span key={i}>{part.text}</span>;

        const colors = ISSUE_TYPE_COLOR[part.issue.issueType || 'grammar'];
        return (
          <span
            key={i}
            className={`${colors.bg} border-b-2 ${colors.border} cursor-help`}
            title={part.issue.explanation}
          >
            {part.text}
          </span>
        );
      })}
    </p>
  );
}

interface WritingReportDisplayProps {
  task: IeltsTask;
  assessment: FreeAssessment;
  essay: string;
}

export function WritingReportDisplay({
  task,
  assessment,
  essay,
}: WritingReportDisplayProps) {
  return (
    <div className="space-y-6 border-t border-white/10 pt-8">
      {/* Overall band */}
      <div className="flex items-center gap-6">
        <div>
          <p className="text-xs uppercase tracking-wide text-white/40">Band estimado</p>
          <p className={`text-5xl font-bold ${bandColor(assessment.overallBand)}`}>
            {assessment.overallBand.toFixed(1)}
          </p>
        </div>
        <div>
          <p className="text-sm text-white/50">
            Ensayo: <span className="text-white">{assessment.wordCount} palabras</span>
          </p>
        </div>
      </div>

      {/* Criteria grid */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Desempeño por criterio</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {assessment.criteria.map((c) => (
            <div
              key={c.criterion}
              className="rounded-lg border border-white/10 bg-white/[0.02] p-4"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-medium">
                  {CRITERION_LABEL[c.criterion]}
                </span>
                <span className={`font-bold text-lg ${bandColor(c.band)}`}>
                  {c.band.toFixed(1)}
                </span>
              </div>
              <p className="mt-2 text-sm text-white/55">{c.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlighted essay */}
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">Tu ensayo (con errores marcados)</h3>
        <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <HighlightedText text={essay} issues={assessment.topIssues} />
        </div>
      </div>

      {/* Top issues with explanations */}
      {assessment.topIssues.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Tus {assessment.topIssues.length} errores más importantes
          </h3>
          <div className="space-y-3">
            {assessment.topIssues.map((issue, i) => {
              const colors = ISSUE_TYPE_COLOR[issue.issueType || 'grammar'];
              return (
                <div key={i} className={`rounded-lg border ${colors.border} ${colors.bg} p-4`}>
                  <p className="text-sm font-mono text-red-200/90 line-through decoration-red-400/40">
                    {issue.quote}
                  </p>
                  <p className="mt-1 text-sm font-mono text-emerald-200/90">
                    → {issue.suggestion}
                  </p>
                  <p className="mt-2 text-sm text-white/55">{issue.explanation}</p>
                  <p className="mt-1 text-xs text-white/40">
                    Criterio: {CRITERION_LABEL[issue.criterion]}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Hidden issues teaser */}
      {assessment.hiddenIssueCount > 0 && (
        <div className="rounded-xl border border-blue-400/30 bg-blue-400/5 p-5">
          <p className="font-semibold text-white">
            +{assessment.hiddenIssueCount} error{assessment.hiddenIssueCount === 1 ? '' : 'es'} más detectado{assessment.hiddenIssueCount === 1 ? '' : 's'}
          </p>
          <p className="mt-1 text-sm text-white/55">
            El análisis completo incluye todos los errores, tu ensayo reescrito y plan de mejora.
          </p>
        </div>
      )}
    </div>
  );
}
