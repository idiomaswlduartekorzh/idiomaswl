'use client';

import { useState } from 'react';
import { LIMITS } from '@/lib/labs/config';
import { useIELTSAssessment } from '@/lib/labs/hooks/useIELTSAssessment';
import { AssessmentLoader } from '../writing/AssessmentLoader';
import { WritingReportDisplay } from '../writing/WritingReportDisplay';

export function IELTSPrototypeClient() {
  const [task1, setTask1] = useState('');
  const [task2, setTask2] = useState('');
  const [task1Prompt, setTask1Prompt] = useState(
    'The chart below shows the percentage of households with internet access in four countries between 2000 and 2020. Summarise the information.'
  );
  const [task2Prompt, setTask2Prompt] = useState(
    'Some people think that governments should invest in public transport rather than building new roads. To what extent do you agree or disagree?'
  );

  const { assess, loading, error, result } = useIELTSAssessment();

  const words1 = task1.trim().split(/\s+/).filter(Boolean).length;
  const words2 = task2.trim().split(/\s+/).filter(Boolean).length;

  const tooLong1 = words1 > LIMITS.maxEssayChars;
  const tooLong2 = words2 > LIMITS.maxEssayChars;

  const canSubmit = (task1 || task2) && !tooLong1 && !tooLong2;

  function handleSubmit() {
    assess({
      task1: task1 || undefined,
      task2: task2 || undefined,
      task1Prompt,
      task2Prompt,
    });
  }

  return (
    <div className="space-y-8">
      <AssessmentLoader isVisible={loading} />

      {/* Task 1 */}
      <div className="border border-white/15 rounded-lg p-6 bg-white/[0.02]">
        <h2 className="text-lg font-semibold mb-4">Task 1 — Descripción de gráfico</h2>

        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wide text-white/40">Pregunta</span>
          <textarea
            value={task1Prompt}
            onChange={(e) => setTask1Prompt(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm outline-none focus:border-blue-400/50"
          />
        </label>

        <label className="block">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-white/40">Tu respuesta</span>
            <span
              className={`text-xs font-medium ${
                words1 < 150 ? 'text-red-300' : tooLong1 ? 'text-red-300' : 'text-emerald-300'
              }`}
            >
              {words1} / 150–180 palabras
              {tooLong1 && ' (DEMASIADO LARGO)'}
            </span>
          </div>
          <textarea
            value={task1}
            onChange={(e) => setTask1(e.target.value)}
            rows={8}
            maxLength={LIMITS.maxEssayChars}
            placeholder="Escribe tu descripción del gráfico…"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm font-mono outline-none focus:border-blue-400/50"
          />
        </label>
      </div>

      {/* Task 2 */}
      <div className="border border-white/15 rounded-lg p-6 bg-white/[0.02]">
        <h2 className="text-lg font-semibold mb-4">Task 2 — Ensayo argumentativo</h2>

        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wide text-white/40">Pregunta</span>
          <textarea
            value={task2Prompt}
            onChange={(e) => setTask2Prompt(e.target.value)}
            rows={2}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm outline-none focus:border-blue-400/50"
          />
        </label>

        <label className="block">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-xs uppercase tracking-wide text-white/40">Tu respuesta</span>
            <span
              className={`text-xs font-medium ${
                words2 < 250 ? 'text-red-300' : tooLong2 ? 'text-red-300' : 'text-emerald-300'
              }`}
            >
              {words2} / 250–280 palabras
              {tooLong2 && ' (DEMASIADO LARGO)'}
            </span>
          </div>
          <textarea
            value={task2}
            onChange={(e) => setTask2(e.target.value)}
            rows={12}
            maxLength={LIMITS.maxEssayChars}
            placeholder="Escribe tu ensayo argumentativo…"
            className="w-full rounded-lg border border-white/10 bg-white/[0.03] p-3 text-sm font-mono outline-none focus:border-blue-400/50"
          />
        </label>
      </div>

      {/* Warnings */}
      {(tooLong1 || tooLong2) && (
        <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm text-red-200">
            ⚠️ Uno o más textos superan el límite. Recorta antes de evaluar.
          </p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-400/30 bg-red-400/10 p-4">
          <p className="text-sm text-red-200">Error: {error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={!canSubmit || loading}
        className="w-full rounded-lg bg-blue-500 px-6 py-3 font-semibold transition hover:bg-blue-400 disabled:opacity-40"
      >
        {loading ? 'Evaluando…' : 'Evaluar ambas tareas'}
      </button>

      {/* Results */}
      {result && (
        <div className="space-y-12 border-t border-white/10 pt-8">
          <div>
            <div className="mb-6">
              <p className="text-xs uppercase tracking-wide text-white/40 mb-2">
                Overall IELTS Writing
              </p>
              <p className="text-6xl font-bold text-emerald-300">
                {result.overallBand?.toFixed(1) || '—'}
              </p>
            </div>
          </div>

          {result.task1 && (
            <div>
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">
                Task 1 — Reporte detallado
              </h3>
              <WritingReportDisplay
                task="task1-academic"
                assessment={result.task1}
                essay={task1}
              />
            </div>
          )}

          {result.task2 && (
            <div>
              <h3 className="text-xl font-bold mb-6 pb-4 border-b border-white/10">
                Task 2 — Reporte detallado
              </h3>
              <WritingReportDisplay task="task2" assessment={result.task2} essay={task2} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
