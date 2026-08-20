/**
 * Gemini Flash — free tier: 1.500 req/día, 10 req/min.
 * Sin SDK: una sola llamada REST. Motor de la CAPA GRATIS (costo $0).
 *
 * Docs de límites: https://ai.google.dev/gemini-api/docs/rate-limits
 */

import { providers, isConfigured } from '../config';
import type { FreeAssessment, FullAssessment, LabsError, WritingRubric } from '../types';

/**
 * OJO: la imagen llega YA descargada (mimeType + base64) desde el caller —
 * nunca leer con fs.readFileSync(path.join(process.cwd(), 'public', ...))
 * aquí. Ese patrón con ruta dinámica hace que el Node File Trace de Vercel
 * no pueda determinar qué archivo se necesita y empaquete TODO /public en la
 * función (nos pasó: 1.3GB, incluyendo videos de coreano sin relación
 * alguna, y tumbó el deploy — límite real 250MB). fetch() sobre la URL
 * pública, resuelta por el caller con el origin del request, evita el
 * problema por completo.
 */
export interface InlineImage {
  mimeType: string;
  data: string;
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
      rewritten: {
        type: 'STRING',
        description: 'El ensayo del estudiante reescrito corrigiendo todos los errores encontrados — sus ideas y estructura, no un ensayo genérico distinto.',
      },
    },
    required: ['overallBand', 'criteria', 'allIssues', 'rewritten'],
  } as const;
}

const SEVERITY_ORDER = { critica: 0, moderada: 1, menor: 2 } as const;

export async function assessWritingFree<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
  /** Ya descargada por el caller (fetch sobre la URL pública). Solo tareas con gráfico. */
  image?: InlineImage,
): Promise<FullAssessment | LabsError> {
  if (!isConfigured('gemini')) {
    return { code: 'not_configured', message: 'Falta GEMINI_API_KEY' };
  }

  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  const { key, model, fallbackModels, endpoint } = providers.gemini;

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
  // mayoría de los casos. La cuota diaria se aplica por modelo; si el principal
  // responde 429, pasamos a otro Flash con visión, nunca a un motor de texto que
  // no pueda verificar las cifras del gráfico.
  let raw = '';
  let lastError: LabsError = { code: 'provider_error', message: 'El evaluador no respondió.' };

  for (const candidateModel of [model, ...fallbackModels]) {
    const url = `${endpoint}/${candidateModel}:generateContent?key=${key}`;

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
          console.error('[labs/gemini] cuota agotada para', candidateModel);
          lastError = { code: 'rate_limited', message: 'Cuota diaria del free tier agotada.' };
          break;
        }
        if (res.status === 503) {
          console.error('[labs/gemini] 503 high demand en', candidateModel, 'intento', attempt + 1);
          lastError = {
            code: 'provider_error',
            message: 'El evaluador está saturado en este momento. Intenta de nuevo en un minuto.',
          };
          continue;
        }
        if (!res.ok) {
          console.error('[labs/gemini]', candidateModel, res.status, await res.text().catch(() => ''));
          lastError = { code: 'provider_error', message: 'El evaluador no respondió.' };
          break;
        }

        const json = await res.json();
        raw = json?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';
        if (!raw) {
          lastError = { code: 'provider_error', message: 'El evaluador no respondió.' };
        }
        break;
      } catch (err) {
        console.error('[labs/gemini] fetch', candidateModel, 'intento', attempt + 1, err);
        lastError = { code: 'provider_error', message: 'El evaluador tardó demasiado. Intenta de nuevo.' };
      }
    }

    if (raw) break;
  }

  if (!raw) return lastError;

  let parsed: {
    overallBand: number;
    criteria:    FreeAssessment['criteria'];
    allIssues:   FreeAssessment['topIssues'];
    rewritten:   string;
  };
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
    allIssues:   sorted,
    rewritten:   parsed.rewritten ?? essay,
    wordCount,
  };
}
