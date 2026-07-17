/**
 * Gemini Flash — free tier: 1.500 req/día, 10 req/min.
 * Sin SDK: una sola llamada REST. Motor de la CAPA GRATIS (costo $0).
 *
 * Docs de límites: https://ai.google.dev/gemini-api/docs/rate-limits
 */

import fs from 'node:fs';
import path from 'node:path';
import { providers, isConfigured } from '../config';
import type { FreeAssessment, LabsError, WritingRubric } from '../types';

const IMAGE_MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
};

/**
 * Lee una imagen de /public y la codifica para Gemini. Solo Task 1 Academic
 * la usa (el gráfico) — sin esto el motor califica Task Achievement a ciegas
 * de si el estudiante transcribió bien los datos reales.
 */
function readPublicImage(publicPath: string): { mimeType: string; data: string } | null {
  const ext = path.extname(publicPath).toLowerCase();
  const mimeType = IMAGE_MIME[ext];
  if (!mimeType) return null;

  try {
    const abs = path.join(process.cwd(), 'public', publicPath);
    const buf = fs.readFileSync(abs);
    return { mimeType, data: buf.toString('base64') };
  } catch (err) {
    console.error('[labs/gemini] no se pudo leer la imagen', publicPath, err);
    return null;
  }
}

/**
 * Arma el responseSchema a partir de los criterios de LA RÚBRICA ACTIVA — no
 * hay nada de IELTS hardcodeado aquí. Cada familia de examen (IELTS/TOEFL/
 * Cambridge) aporta su propia lista de criterios vía WritingRubric.criteria.
 */
function buildResponseSchema(criterionKeys: string[]) {
  const criterionEnum = { type: 'STRING', enum: criterionKeys } as const;
  return {
    type: 'OBJECT',
    properties: {
      overallBand: { type: 'NUMBER' },
      criteria: {
        type: 'ARRAY',
        items: {
          type: 'OBJECT',
          properties: {
            criterion: criterionEnum,
            band:      { type: 'NUMBER' },
            reason:    { type: 'STRING' },
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
            criterion:   criterionEnum,
            issueType:   { type: 'STRING', enum: ['vocabulary', 'grammar', 'style', 'unclear'] },
          },
          required: ['quote', 'suggestion', 'explanation', 'severity', 'criterion', 'issueType'],
        },
      },
    },
    required: ['overallBand', 'criteria', 'allIssues'],
  } as const;
}

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

export async function assessWritingFree<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
  /** Ruta pública del gráfico (p.ej. '/ielts/images/writing-set1-task1-chester.png'). Solo tareas con gráfico. */
  imageUrl?: string,
): Promise<FreeAssessment | LabsError> {
  if (!isConfigured('gemini')) {
    return { code: 'not_configured', message: 'Falta GEMINI_API_KEY' };
  }

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  const { key, model, endpoint } = providers.gemini;
  const url = `${endpoint}/${model}:generateContent?key=${key}`;

  const image = imageUrl ? readPublicImage(imageUrl) : null;
  const promptText = image
    ? `PREGUNTA DEL EXAMEN (el gráfico/tabla referido está en la imagen adjunta — obsérvalo con atención antes de evaluar):\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`
    : `PREGUNTA DEL EXAMEN:\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`;

  const body = {
    systemInstruction: { parts: [{ text: rubric.buildSystemPrompt(task) }] },
    contents: [{
      role: 'user',
      parts: image
        ? [{ inlineData: image }, { text: promptText }]
        : [{ text: promptText }],
    }],
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema:   buildResponseSchema(rubric.criteria.map((c) => c.key)),
      // Determinismo: el mismo ensayo debe dar el mismo band.
      temperature: 0,
      // Sin esto, gemini-flash-latest razona antes de responder y un ensayo de
      // Task 2 se pasa del timeout. El esquema ya fuerza la forma de salida.
      thinkingConfig: { thinkingBudget: 0 },
    },
  };

  // El free tier está sobresuscrito y devuelve 503 ("high demand") de forma
  // intermitente. Google recomienda reintentar: un segundo intento recupera la
  // mayoría de los casos y es más barato que perder al estudiante.
  let raw = '';
  let lastError: LabsError = { code: 'provider_error', message: 'El evaluador no respondió.' };

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        method:  'POST',
        headers: { 'content-type': 'application/json' },
        body:    JSON.stringify(body),
        // 45s se quedaba corto: un Task 2 completo ronda los 40–50s contra el
        // free tier, y el corte caía justo encima. Ver docs/blueprint-labs-ia.md
        signal:  AbortSignal.timeout(90_000),
      });

      if (res.status === 429) {
        return { code: 'rate_limited', message: 'Cuota diaria del free tier agotada.' };
      }
      if (res.status === 503) {
        console.error('[labs/gemini] 503 high demand, intento', attempt + 1);
        lastError = {
          code: 'provider_error',
          message: 'El evaluador está saturado en este momento. Intenta de nuevo en un minuto.',
        };
        continue;
      }
      if (!res.ok) {
        console.error('[labs/gemini]', res.status, await res.text().catch(() => ''));
        return { code: 'provider_error', message: 'El evaluador no respondió.' };
      }

      const json = await res.json();
      raw = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
      break;
    } catch (err) {
      console.error('[labs/gemini] fetch intento', attempt + 1, err);
      lastError = { code: 'provider_error', message: 'El evaluador tardó demasiado. Intenta de nuevo.' };
    }
  }

  if (!raw) return lastError;

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
    wordCount,
  };
}
