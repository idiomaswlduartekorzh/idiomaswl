/**
 * Nemotron 3 (NVIDIA) — tercer respaldo cuando Gemini Y Groq se saturan el
 * mismo día (nos pasó — ver rate-limit del 17 jul 2026). API compatible con
 * OpenAI (chat completions), sin visión: solo sirve para tareas de solo
 * texto (Task 2 de IELTS, ambas de TOEFL/Cambridge). Task 1 de IELTS
 * necesita ver el gráfico — este motor nunca se usa ahí, ver route.ts.
 *
 * Es un modelo "razonador" (piensa antes de responder). Sin
 * chat_template_kwargs.enable_thinking=false mete su razonamiento en texto
 * plano antes del JSON y rompe el parseo — probado en curl.
 *
 * OJO: la cuota gratis de NVIDIA NO es diaria como Gemini/Groq — son 1.000
 * créditos de inferencia UNA SOLA VEZ al crear la cuenta. No hay retry por
 * saturación (rate_limited) tiene más sentido tratarlo como "se acabó" que
 * como "está saturado hoy, mañana vuelve".
 */

import { providers, isConfigured } from '../config';
import type { FreeAssessment, FullAssessment, LabsError, WritingRubric } from '../types';

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

function buildJsonInstruction(criterionKeys: string[]): string {
  return `

Responde SOLO con un objeto JSON válido, sin texto antes ni después, con exactamente esta forma:
{
  "overallBand": number,
  "criteria": [{ "criterion": ${criterionKeys.map((k) => `"${k}"`).join(' | ')}, "band": number, "reason": string }],
  "allIssues": [{ "quote": string (copiada LITERAL del ensayo del estudiante), "suggestion": string, "explanation": string, "severity": "critica" | "moderada" | "menor", "criterion": ${criterionKeys.map((k) => `"${k}"`).join(' | ')}, "issueType": "vocabulary" | "grammar" | "style" | "unclear" }],
  "rewritten": string (el ensayo del estudiante reescrito corrigiendo los errores — sus ideas y estructura, no uno genérico distinto)
}`;
}

export async function assessWritingNvidia<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
): Promise<FullAssessment | LabsError> {
  if (!isConfigured('nvidia')) {
    return { code: 'not_configured', message: 'Falta NVIDIA_API_KEY' };
  }

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const { key, model, endpoint } = providers.nvidia;
  const criterionKeys = rubric.criteria.map((c) => c.key);

  const systemPrompt = rubric.buildSystemPrompt(task) + buildJsonInstruction(criterionKeys);
  const userContent = `PREGUNTA DEL EXAMEN:\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens:  2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
        chat_template_kwargs: { enable_thinking: false },
      }),
      signal: AbortSignal.timeout(60_000),
    });
  } catch (err) {
    console.error('[labs/nvidia] fetch', err);
    return { code: 'provider_error', message: 'El evaluador tardó demasiado. Intenta de nuevo.' };
  }

  if (res.status === 429) {
    return { code: 'rate_limited', message: 'Créditos gratis de NVIDIA agotados por ahora.' };
  }
  if (!res.ok) {
    console.error('[labs/nvidia]', res.status, await res.text().catch(() => ''));
    return { code: 'provider_error', message: 'El evaluador no respondió.' };
  }

  const json = await res.json();
  const raw = json?.choices?.[0]?.message?.content ?? '';
  if (!raw) return { code: 'provider_error', message: 'El evaluador no respondió.' };

  let parsed: {
    overallBand: number;
    criteria:    FreeAssessment['criteria'];
    allIssues:   FreeAssessment['topIssues'];
    rewritten?:  string;
  };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('[labs/nvidia] JSON inválido:', raw.slice(0, 200));
    return { code: 'provider_error', message: 'Respuesta ilegible del evaluador.' };
  }

  // Sin schema forzado en servidor (solo json_object suelto) — misma guardia
  // que groq.ts: sin esto, una forma inesperada tumba el request con un 500
  // crudo en vez de degradar con gracia.
  if (!Array.isArray(parsed.criteria) || !Array.isArray(parsed.allIssues) || typeof parsed.overallBand !== 'number') {
    console.error('[labs/nvidia] forma inesperada:', JSON.stringify(parsed).slice(0, 300));
    return { code: 'provider_error', message: 'Respuesta con formato inesperado del evaluador.' };
  }

  const validKeys = new Set(criterionKeys);
  const criteria = parsed.criteria.filter((c) => c && validKeys.has(c.criterion));

  const grounded = parsed.allIssues.filter(
    (i) => i && essay.includes(i.quote) && validKeys.has(i.criterion),
  );
  const sorted = [...grounded].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return {
    overallBand: parsed.overallBand,
    criteria,
    topIssues:   sorted.slice(0, 3),
    hiddenIssueCount: Math.max(0, sorted.length - 3),
    allIssues:   sorted,
    rewritten:   parsed.rewritten ?? essay,
    wordCount,
  };
}
