/**
 * Groq — free tier de respaldo cuando Gemini se satura.
 *
 * API compatible con OpenAI (chat completions). Modelo: Llama 4 Scout, el
 * único del free tier de Groq con visión + JSON mode a la vez — necesario
 * para Task 1 de IELTS (el gráfico).
 *
 * Free tier: ~30 req/min, hasta 14.400 req/día (vs. 10 req/min de Gemini) y
 * corre en hardware LPU propio — mucho más rápido, sin los timeouts de 90s
 * que veníamos viendo con Gemini saturado.
 *
 * Docs: https://console.groq.com/docs/rate-limits · /docs/vision
 *
 * OJO — sin verificar en producción: el modo JSON estricto (response_format
 * json_schema, con enums) combinado con imagen no está 100% confirmado en la
 * documentación de Groq (solo confirma json_object + imagen). Por eso
 * intentamos json_schema primero y caemos a json_object si Groq lo rechaza —
 * en json_object perdemos la validación de enum en el servidor, por lo que
 * igual filtramos los criterios contra rubric.criteria antes de devolver.
 */

import { providers, isConfigured } from '../config';
import type { FreeAssessment, LabsError, WritingRubric } from '../types';
import type { InlineImage } from './gemini';

/**
 * La imagen llega YA descargada (mimeType + base64) desde el caller — nunca
 * fs.readFileSync(path.join(process.cwd(), 'public', ...)) aquí. Ver el
 * comentario largo en providers/gemini.ts: esa ruta dinámica hacía que el
 * Node File Trace de Vercel empaquetara TODO /public (1.3GB) en la función.
 */

function buildJsonSchema(criterionKeys: string[]) {
  const criterionEnum = { type: 'string', enum: criterionKeys } as const;
  return {
    type: 'object',
    properties: {
      overallBand: { type: 'number' },
      criteria: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            criterion: criterionEnum,
            band:      { type: 'number' },
            reason:    { type: 'string' },
          },
          required: ['criterion', 'band', 'reason'],
          additionalProperties: false,
        },
      },
      allIssues: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            quote:       { type: 'string' },
            suggestion:  { type: 'string' },
            explanation: { type: 'string' },
            severity:    { type: 'string', enum: ['critica', 'moderada', 'menor'] },
            criterion:   criterionEnum,
            issueType:   { type: 'string', enum: ['vocabulary', 'grammar', 'style', 'unclear'] },
          },
          required: ['quote', 'suggestion', 'explanation', 'severity', 'criterion', 'issueType'],
          additionalProperties: false,
        },
      },
    },
    required: ['overallBand', 'criteria', 'allIssues'],
    additionalProperties: false,
  } as const;
}

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

export async function assessWritingGroq<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
  image?: InlineImage,
): Promise<FreeAssessment | LabsError> {
  if (!isConfigured('groq')) {
    return { code: 'not_configured', message: 'Falta GROQ_API_KEY' };
  }

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;
  const { key, model, endpoint } = providers.groq;

  const dataUri = image ? `data:${image.mimeType};base64,${image.data}` : null;
  const promptText = dataUri
    ? `PREGUNTA DEL EXAMEN (el gráfico/tabla referido está en la imagen adjunta — obsérvalo con atención antes de evaluar):\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`
    : `PREGUNTA DEL EXAMEN:\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`;

  const userContent = dataUri
    ? [{ type: 'text', text: promptText }, { type: 'image_url', image_url: { url: dataUri } }]
    : promptText;

  const schema = buildJsonSchema(rubric.criteria.map((c) => c.key));

  async function callGroq(responseFormat: unknown) {
    return fetch(endpoint, {
      method:  'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model,
        temperature: 0,
        messages: [
          { role: 'system', content: rubric.buildSystemPrompt(task) },
          { role: 'user', content: userContent },
        ],
        response_format: responseFormat,
      }),
      signal: AbortSignal.timeout(60_000),
    });
  }

  let raw = '';
  let lastError: LabsError = { code: 'provider_error', message: 'El evaluador no respondió.' };

  // Intento 1: JSON schema estricto (con enums). Intento 2 (solo si el 1 da
  // 400): JSON mode suelto — Groq podría no aceptar schema+imagen a la vez.
  const attempts: unknown[] = [
    { type: 'json_schema', json_schema: { name: 'writing_assessment', strict: true, schema } },
  ];
  if (dataUri) attempts.push({ type: 'json_object' });

  for (const responseFormat of attempts) {
    try {
      const res = await callGroq(responseFormat);

      if (res.status === 429) {
        return { code: 'rate_limited', message: 'Cuota del free tier de Groq agotada por ahora.' };
      }
      if (res.status === 400) {
        const bodyText = await res.text().catch(() => '');
        console.error('[labs/groq] 400, probando siguiente response_format', bodyText.slice(0, 300));
        lastError = { code: 'provider_error', message: 'El evaluador rechazó la solicitud.' };
        continue;
      }
      if (!res.ok) {
        console.error('[labs/groq]', res.status, await res.text().catch(() => ''));
        lastError = { code: 'provider_error', message: 'El evaluador no respondió.' };
        continue;
      }

      const json = await res.json();
      raw = json?.choices?.[0]?.message?.content ?? '';
      break;
    } catch (err) {
      console.error('[labs/groq] fetch', err);
      lastError = { code: 'provider_error', message: 'El evaluador tardó demasiado. Intenta de nuevo.' };
    }
  }

  if (!raw) return lastError;

  let parsed: { overallBand: number; criteria: FreeAssessment['criteria']; allIssues: FreeAssessment['topIssues'] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('[labs/groq] JSON inválido:', raw.slice(0, 200));
    return { code: 'provider_error', message: 'Respuesta ilegible del evaluador.' };
  }

  // Salvavidas para cuando cayó a json_object (sin enum forzado en servidor):
  // descarta cualquier criterio que no exista en la rúbrica activa.
  const validKeys = new Set(rubric.criteria.map((c) => c.key));
  const criteria = (parsed.criteria ?? []).filter((c) => validKeys.has(c.criterion));

  // Descarta citas que el modelo no copió literalmente — mismo criterio que
  // los demás proveedores.
  const grounded = (parsed.allIssues ?? []).filter(
    (i) => essay.includes(i.quote) && validKeys.has(i.criterion),
  );
  const sorted = [...grounded].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return {
    overallBand: parsed.overallBand,
    criteria,
    topIssues:   sorted.slice(0, 3),
    hiddenIssueCount: Math.max(0, sorted.length - 3),
    wordCount,
  };
}
