/**
 * Gemini Flash — free tier: 1.500 req/día, 10 req/min.
 * Sin SDK: una sola llamada REST. Motor de la CAPA GRATIS (costo $0).
 *
 * Docs de límites: https://ai.google.dev/gemini-api/docs/rate-limits
 */

import { providers, isConfigured } from '../config';
import type { FreeAssessment, IeltsTask, LabsError } from '../types';
import { buildSystemPrompt } from '../rubrics/ielts-writing';

/** Fuerza a Gemini a devolver exactamente la forma que espera la UI. */
const RESPONSE_SCHEMA = {
  type: 'OBJECT',
  properties: {
    overallBand: { type: 'NUMBER' },
    criteria: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          criterion: {
            type: 'STRING',
            enum: ['taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'],
          },
          band:   { type: 'NUMBER' },
          reason: { type: 'STRING' },
        },
        required: ['criterion', 'band', 'reason'],
      },
    },
    allIssues: {
      type: 'ARRAY',
      items: {
        type: 'OBJECT',
        properties: {
          quote:       { type: 'STRING' },
          suggestion:  { type: 'STRING' },
          explanation: { type: 'STRING' },
          severity:    { type: 'STRING', enum: ['critica', 'moderada', 'menor'] },
          criterion:   {
            type: 'STRING',
            enum: ['taskResponse', 'coherenceCohesion', 'lexicalResource', 'grammaticalRange'],
          },
        },
        required: ['quote', 'suggestion', 'explanation', 'severity', 'criterion'],
      },
    },
  },
  required: ['overallBand', 'criteria', 'allIssues'],
} as const;

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

export async function assessWritingFree(
  essay: string,
  prompt: string,
  task: IeltsTask,
): Promise<FreeAssessment | LabsError> {
  if (!isConfigured('gemini')) {
    return { code: 'not_configured', message: 'Falta GEMINI_API_KEY' };
  }

  const { key, model, endpoint } = providers.gemini;
  const url = `${endpoint}/${model}:generateContent?key=${key}`;

  const body = {
    systemInstruction: { parts: [{ text: buildSystemPrompt(task) }] },
    contents: [{
      role: 'user',
      parts: [{
        text: `PREGUNTA DEL EXAMEN:\n${prompt}\n\nENSAYO DEL ESTUDIANTE:\n${essay}`,
      }],
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema:   RESPONSE_SCHEMA,
      // Determinismo: el mismo ensayo debe dar el mismo band.
      temperature: 0,
    },
  };

  let raw: string;
  try {
    const res = await fetch(url, {
      method:  'POST',
      headers: { 'content-type': 'application/json' },
      body:    JSON.stringify(body),
      signal:  AbortSignal.timeout(45_000),
    });

    if (res.status === 429) {
      return { code: 'rate_limited', message: 'Cuota diaria del free tier agotada.' };
    }
    if (!res.ok) {
      console.error('[labs/gemini]', res.status, await res.text().catch(() => ''));
      return { code: 'provider_error', message: 'El evaluador no respondió.' };
    }

    const json = await res.json();
    raw = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
  } catch (err) {
    console.error('[labs/gemini] fetch', err);
    return { code: 'provider_error', message: 'El evaluador no respondió.' };
  }

  let parsed: { overallBand: number; criteria: FreeAssessment['criteria']; allIssues: FreeAssessment['topIssues'] };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('[labs/gemini] JSON inválido:', raw.slice(0, 200));
    return { code: 'provider_error', message: 'Respuesta ilegible del evaluador.' };
  }

  // Descarta citas que el modelo no copió literalmente: sin match exacto la UI
  // no puede resaltar el fragmento, y un highlight fantasma es peor que ninguno.
  const grounded = (parsed.allIssues ?? []).filter((i) => essay.includes(i.quote));

  const sorted = [...grounded].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity],
  );

  return {
    overallBand: parsed.overallBand,
    criteria:    parsed.criteria ?? [],
    topIssues:   sorted.slice(0, 3),
    hiddenIssueCount: Math.max(0, sorted.length - 3),
    wordCount:   essay.trim().split(/\s+/).filter(Boolean).length,
  };
}
