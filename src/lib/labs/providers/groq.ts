/**
 * Groq — free tier de respaldo cuando Gemini se satura.
 *
 * API compatible con OpenAI (chat completions). Texto puro: Llama 3.3 70B,
 * estable. Hasta el 18 jul 2026 usábamos Llama 4 Scout (visión + JSON) para
 * todo, pero Groq lo deprecó (17 jun 2026) sin que nos enteráramos —
 * devolvía model_not_found en silencio.
 *
 * SIN visión: probamos qwen/qwen3.6-27b (el único modelo con visión que le
 * queda a Groq, marcado "preview") y sí lee gráficos reales correctamente,
 * pero Groq limita ese modelo a 8.000 tokens/min EN TOTAL (prompt +
 * respuesta) — nuestro esquema completo (rúbrica + imagen + ensayo + todos
 * los errores + reescritura) pide ~5.000 tokens solo de entrada, y no
 * queda presupuesto para que el modelo termine el JSON (probado: incluso
 * al límite exacto de tokens permitido, se queda sin terminar). No vale la
 * pena recortar el esquema para un respaldo terciario que casi nunca se
 * activa — IELTS Task 1 (el único caso con imagen) se queda solo con
 * Gemini, sin respaldo, ver exam-writing-assess/route.ts.
 *
 * Free tier: ~30 req/min, hasta 14.400 req/día (vs. 10 req/min de Gemini) y
 * corre en hardware LPU propio — mucho más rápido, sin los timeouts de 90s
 * que veníamos viendo con Gemini saturado.
 *
 * Docs: https://console.groq.com/docs/rate-limits
 */

import { providers, isConfigured } from '../config';
import type { FreeAssessment, FullAssessment, LabsError, WritingRubric } from '../types';

/**
 * Ninguno de los dos modelos que quedan en el free tier de Groq soporta
 * response_format:json_schema (probado — llama-3.3 lo rechaza con 400; qwen
 * sin probar pero no vale la pena arriesgar otro 400 silencioso). Con
 * json_object suelto el modelo inventa su propia forma si no se la
 * describimos explícitamente — probado: devolvió {content, organization,
 * language, feedback} en vez de {overallBand, criteria, allIssues,
 * rewritten}. Mismo patrón que providers/nvidia.ts.
 */
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

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

export async function assessWritingGroq<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
): Promise<FullAssessment | LabsError> {
  if (!isConfigured('groq')) {
    return { code: 'not_configured', message: 'Falta GROQ_API_KEY' };
  }

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const { key, model, endpoint } = providers.groq;

  const userContent = `PREGUNTA DEL EXAMEN:\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`;

  const systemPrompt = rubric.buildSystemPrompt(task) + buildJsonInstruction(rubric.criteria.map((c) => c.key));

  let raw = '';
  let lastError: LabsError = { code: 'provider_error', message: 'El evaluador no respondió.' };

  try {
    const res = await fetch(endpoint, {
      method:  'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0,
        max_tokens: 2000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContent },
        ],
        response_format: { type: 'json_object' },
      }),
      signal: AbortSignal.timeout(60_000),
    });

    if (res.status === 429) {
      return { code: 'rate_limited', message: 'Cuota del free tier de Groq agotada por ahora.' };
    }
    if (!res.ok) {
      console.error('[labs/groq]', res.status, await res.text().catch(() => ''));
      lastError = { code: 'provider_error', message: 'El evaluador rechazó la solicitud.' };
    } else {
      const json = await res.json();
      raw = json?.choices?.[0]?.message?.content ?? '';
    }
  } catch (err) {
    console.error('[labs/groq] fetch', err);
    lastError = { code: 'provider_error', message: 'El evaluador tardó demasiado. Intenta de nuevo.' };
  }

  if (!raw) return lastError;

  let parsed: {
    overallBand: number;
    criteria:    FreeAssessment['criteria'];
    allIssues:   FreeAssessment['topIssues'];
    rewritten?:  string;
  };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('[labs/groq] JSON inválido:', raw.slice(0, 200));
    return { code: 'provider_error', message: 'Respuesta ilegible del evaluador.' };
  }

  // json_object (fallback sin schema) no garantiza NADA de forma — el modelo
  // puede devolver "criteria"/"allIssues" con cualquier forma, o ninguna. Sin
  // esta validación, un objeto/string en vez de array tumbaba el request con
  // un 500 crudo en vez de degradar con gracia (nos pasó en producción).
  if (!Array.isArray(parsed.criteria) || !Array.isArray(parsed.allIssues) || typeof parsed.overallBand !== 'number') {
    console.error('[labs/groq] forma inesperada en json_object:', JSON.stringify(parsed).slice(0, 300));
    return { code: 'provider_error', message: 'Respuesta con formato inesperado del evaluador.' };
  }

  // json_object no fuerza enum en servidor — descarta cualquier criterio
  // que no exista en la rúbrica activa.
  const validKeys = new Set(rubric.criteria.map((c) => c.key));
  const criteria = parsed.criteria.filter((c) => c && validKeys.has(c.criterion));

  // Descarta citas que el modelo no copió literalmente — mismo criterio que
  // los demás proveedores.
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
    // Sin schema forzado el modelo puede omitir rewritten — degradar al original.
    rewritten:   parsed.rewritten ?? essay,
    wordCount,
  };
}
