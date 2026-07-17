/**
 * Claude Opus — capa de CALIDAD (de pago).
 *
 * Mismo contrato que providers/gemini.ts: recibe ensayo + prompt + task y
 * devuelve FreeAssessment. La rúbrica (rubrics/ielts-writing.ts) es la misma
 * para ambos motores — lo único que cambia es quién la aplica.
 *
 * Precio: ~$5/1M tokens de entrada. Un Task 2 ronda los 2.000 tokens de
 * entrada + 1.500 de salida ≈ $0,05 por evaluación. No es free tier: se activa
 * solo si ANTHROPIC_API_KEY está definida.
 */

import Anthropic from '@anthropic-ai/sdk';
import { providers, isConfigured } from '../config';
import type { FreeAssessment, LabsError, WritingRubric } from '../types';

/** JSON Schema estándar. Equivalente al buildResponseSchema de Gemini. */
function buildResponseSchema(criterionKeys: string[]) {
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

export async function assessWritingOpus<TaskId extends string>(
  essay: string,
  prompt: string,
  task: TaskId,
  rubric: WritingRubric<TaskId>,
): Promise<FreeAssessment | LabsError> {
  if (!isConfigured('anthropic')) {
    return { code: 'not_configured', message: 'Falta ANTHROPIC_API_KEY' };
  }

  const client = new Anthropic({ apiKey: providers.anthropic.key });
  const wordCount = essay.trim().split(/\s+/).filter(Boolean).length;

  let raw: string;
  try {
    // Streaming: evalúa un ensayo completo con thinking, y una respuesta
    // no-streamed de este tamaño se arriesga al timeout del request.
    const message = await client.messages
      .stream({
        model:      providers.anthropic.model,
        max_tokens: 8000,
        system:     rubric.buildSystemPrompt(task),
        thinking:   { type: 'adaptive' },
        output_config: {
          format: { type: 'json_schema', schema: buildResponseSchema(rubric.criteria.map((c) => c.key)) },
          effort: 'medium',
        },
        messages: [{
          role: 'user',
          // El conteo va calculado: pedirle al modelo que cuente palabras da
          // cifras erradas, y la penalización por extensión depende de ese número.
          content: `PREGUNTA DEL EXAMEN:\n${prompt}\n\nEXTENSIÓN (ya contada, úsala tal cual): ${wordCount} palabras\n\nENSAYO DEL ESTUDIANTE:\n${essay}`,
        }],
      })
      .finalMessage();

    const textBlock = message.content.find((b) => b.type === 'text');
    raw = textBlock?.type === 'text' ? textBlock.text : '';
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return { code: 'rate_limited', message: 'Demasiadas evaluaciones seguidas. Espera un minuto.' };
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return { code: 'not_configured', message: 'ANTHROPIC_API_KEY inválida.' };
    }
    console.error('[labs/anthropic]', err);
    return { code: 'provider_error', message: 'El evaluador no respondió.' };
  }

  let parsed: {
    overallBand: number;
    criteria:    FreeAssessment['criteria'];
    allIssues:   FreeAssessment['topIssues'];
  };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error('[labs/anthropic] JSON inválido:', raw.slice(0, 200));
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
