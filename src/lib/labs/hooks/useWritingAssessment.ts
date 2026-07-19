'use client';

/**
 * Fetch reutilizable de /api/labs/exam-writing-assess. Extraído de
 * IELTSWritingReportPanel para que el resumen (banda de Writing) y el
 * detalle (errores + reescritura) compartan UNA sola llamada por tarea —
 * evaluar dos veces el mismo ensayo desperdicia cuota del free tier.
 */

import { useEffect, useState } from 'react';
import type { FullAssessment } from '../types';

export type AssessmentState = 'loading' | 'success' | 'saturated' | 'unavailable';

export interface UseWritingAssessmentResult {
  state:  AssessmentState;
  result: FullAssessment | null;
}

export type ExamSlug = 'ielts' | 'toefl' | 'cambridge-b2' | 'goethe' | 'cils-celi' | 'delf-dalf' | 'celpe-bras';

export function useWritingAssessment(
  examSlug:   ExamSlug,
  mockId:     string,
  taskNumber: 1 | 2 | 3 | 4,
  essay:      string,
): UseWritingAssessmentResult {
  const [state, setState] = useState<AssessmentState>(() => (essay.trim() ? 'loading' : 'unavailable'));
  const [result, setResult] = useState<FullAssessment | null>(null);

  useEffect(() => {
    if (!essay.trim()) return;

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
          setState('unavailable');
        }
      })
      .catch(() => { if (!cancelled) setState('unavailable'); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { state, result };
}
