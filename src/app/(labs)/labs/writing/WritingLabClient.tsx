'use client';

import { useState } from 'react';
import { LIMITS } from '@/lib/labs/config';
import { SAMPLE_PROMPTS, WORD_TARGETS } from '@/lib/labs/rubrics/ielts-writing';
import type { FreeAssessment, IeltsTask, TextIssue } from '@/lib/labs/types';

const CRITERION_LABEL: Record<string, string> = {
  taskAchievement:   'Task Achievement',   // Task 1
  taskResponse:      'Task Response',      // Task 2
  coherenceCohesion: 'Coherence & Cohesion',
  lexicalResource:   'Lexical Resource',
  grammaticalRange:  'Grammar',
};

const SEVERITY_STYLE: Record<TextIssue['severity'], string> = {
  critica:  'border-red-400/40 bg-red-400/5',
  moderada: 'border-amber-400/40 bg-amber-400/5',
  menor:    'border-white/15 bg-white/[0.02]',
};

function bandColor(band: number): string {
  if (band >= 7) return 'text-emerald-300';
  if (band >= 6) return 'text-amber-300';
  return 'text-red-300';
}

export function WritingLabClient() {
  const [task, setTask]       = useState<IeltsTask>('task2');
  const [prompt, setPrompt]   = useState(SAMPLE_PROMPTS.task2[0]);
  const [essay, setEssay]     = useState('');
  const [result, setResult]   = useState<FreeAssessment | null>(null);
  const [status, setStatus]   = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const words  = essay.trim().split(/\s+/).filter(Boolean).length;
  const target = WORD_TARGETS[task];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    setResult(null);

    try {
      const res = await fetch('/api/labs/writing-assess', {
        method:  'POST',
        headers: { 'content-type': 'application/json' },
        body:    JSON.stringify({ essay, prompt, task }),
      });
      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.message ?? 'Algo falló.');
        setStatus('error');
        return;
      }
      setResult(data);
      setStatus('idle');
    } catch {
      setErrorMsg('No se pudo conectar con el evaluador.');
      setStatus('error');
    }
  }

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(SAMPLE_PROMPTS) as IeltsTask[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => { setTask(t); setPrompt(SAMPLE_PROMPTS[t][0]); }}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                task === t
                  ? 'bg-white text-[#0a0e27]'
                  : 'border border-white/15 text-white/60 hover:text-white'
              }`}
            >
              {t === 'task2' ? 'Task 2' : t === 'task1-academic' ? 'Task 1 Academic' : 'Task 1 General'}
            </button>
          ))}
        </div>

        <label className="block">
          <span className="text-xs uppercase tracking-wide text-white/40">Pregunta del examen</span>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm outline-none focus:border-blue-400/50"
          />
        </label>

        <label className="block">
          <div className="flex items-baseline justify-between">
            <span className="text-xs uppercase tracking-wide text-white/40">Tu ensayo</span>
            <span className={`text-xs ${words < target.min ? 'text-red-300' : 'text-emerald-300'}`}>
              {words} / {target.min} palabras mín.
            </span>
          </div>
          <textarea
            value={essay}
            onChange={(e) => setEssay(e.target.value)}
            rows={14}
            maxLength={LIMITS.maxEssayChars}
            placeholder="Pega aquí tu ensayo en inglés…"
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 font-mono text-sm leading-relaxed outline-none focus:border-blue-400/50"
          />
        </label>

        <button
          type="submit"
          disabled={status === 'loading' || essay.trim().length < LIMITS.minEssayChars}
          className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-semibold transition hover:bg-blue-400 disabled:opacity-40"
        >
          {status === 'loading' ? 'Evaluando…' : 'Evaluar mi ensayo'}
        </button>

        {errorMsg && <p className="text-sm text-red-300">{errorMsg}</p>}
      </form>

      {result && (
        <section className="space-y-6 border-t border-white/10 pt-8">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/40">Band estimado</p>
              <p className={`text-5xl font-bold ${bandColor(result.overallBand)}`}>
                {result.overallBand.toFixed(1)}
              </p>
            </div>
            <p className="max-w-sm text-sm text-white/50">
              Estimación contra los descriptores oficiales. No sustituye a un examinador
              certificado.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {result.criteria.map((c) => (
              <div key={c.criterion} className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">{CRITERION_LABEL[c.criterion]}</span>
                  <span className={`font-bold ${bandColor(c.band)}`}>{c.band.toFixed(1)}</span>
                </div>
                <p className="mt-2 text-sm text-white/55">{c.reason}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-sm font-semibold">Tus errores más graves</h3>
            <div className="mt-3 space-y-3">
              {result.topIssues.map((issue, i) => (
                <div key={i} className={`rounded-lg border p-4 ${SEVERITY_STYLE[issue.severity]}`}>
                  <p className="font-mono text-sm text-red-200/90 line-through decoration-red-400/40">
                    {issue.quote}
                  </p>
                  <p className="mt-1 font-mono text-sm text-emerald-200/90">{issue.suggestion}</p>
                  <p className="mt-2 text-sm text-white/55">{issue.explanation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* EL GANCHO. Aquí va el LeadCaptureModal cuando se valide el embudo. */}
          {result.hiddenIssueCount > 0 && (
            <div className="rounded-xl border border-blue-400/30 bg-blue-400/5 p-5">
              <p className="font-semibold">
                Encontramos {result.hiddenIssueCount} error
                {result.hiddenIssueCount === 1 ? '' : 'es'} más en tu ensayo.
              </p>
              <p className="mt-1 text-sm text-white/55">
                El reporte completo incluye cada error señalado, tu ensayo reescrito a band 7
                y tu plan de mejora semana por semana.
              </p>
              <button
                type="button"
                disabled
                className="mt-4 rounded-lg border border-white/20 px-4 py-2 text-sm text-white/40"
              >
                [ fase 2 · aquí entra LeadCaptureModal ]
              </button>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
