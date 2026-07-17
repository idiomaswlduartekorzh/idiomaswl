import { useState } from 'react';
import type { FreeAssessment, IeltsTask, LabsError, IELTSWritingReport } from '../types';
import { LIMITS } from '../config';

export interface UseIELTSAssessmentOptions {
  task1?: string;   // Task 1 essay
  task2?: string;   // Task 2 essay
  task1Prompt?: string;
  task2Prompt?: string;
}

export function useIELTSAssessment() {
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<IELTSWritingReport | null>(null);

  async function assess(options: UseIELTSAssessmentOptions) {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Validar extensión
      const essays: Array<{ text: string; task: IeltsTask; prompt: string }> = [];

      if (options.task1) {
        const words = options.task1.trim().split(/\s+/).length;
        if (words > LIMITS.maxEssayChars) {
          throw { code: 'text_too_long', message: 'Task 1: Texto muy largo' };
        }
        essays.push({
          text: options.task1,
          task: 'task1-academic',
          prompt: options.task1Prompt || '',
        });
      }

      if (options.task2) {
        const words = options.task2.trim().split(/\s+/).length;
        if (words > LIMITS.maxEssayChars) {
          throw { code: 'text_too_long', message: 'Task 2: Texto muy largo' };
        }
        essays.push({
          text: options.task2,
          task: 'task2',
          prompt: options.task2Prompt || '',
        });
      }

      if (!essays.length) {
        throw { code: 'invalid_input', message: 'No hay texto para evaluar' };
      }

      // Request por separado para cada task
      const assessments: Partial<Record<IeltsTask, FreeAssessment>> = {};

      for (const essay of essays) {
        setLoadingStep(`Evaluando ${essay.task === 'task2' ? 'Task 2' : 'Task 1'}…`);

        const res = await fetch('/api/labs/writing-assess', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            essay: essay.text,
            prompt: essay.prompt,
            task: essay.task,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw data;
        }

        assessments[essay.task] = data;
      }

      // Calcular overall (promedio de ambas tareas si existen)
      const bands = Object.values(assessments).map((a) => a.overallBand);
      const overall =
        bands.length > 0 ? Math.round((bands.reduce((a, b) => a + b, 0) / bands.length) * 2) / 2 : 0;

      setResult({
        task1: assessments['task1-academic'],
        task2: assessments['task2'],
        overallBand: overall,
        generatedAt: Date.now(),
      });
    } catch (err: any) {
      setError(err.message || 'Error en la evaluación');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  }

  return { assess, loading, loadingStep, error, result };
}
