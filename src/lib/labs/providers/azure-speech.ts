/**
 * Azure Pronunciation Assessment — free tier F0: 5 horas de audio/mes.
 * Pasado el free tier: ~$1,32/hora ≈ $0,02 por grabación de 60s.
 *
 * Devuelve puntajes de precisión, fluidez y completitud desglosados por
 * palabra y fonema. Es la única pieza del blueprint que puede llegar a costar
 * dinero, y por eso va SIEMPRE detrás del muro de lead.
 *
 * Docs: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/how-to-pronunciation-assessment
 *
 * ─────────────────────────────────────────────────────────────────────────
 * ESTADO: esqueleto. Fase 2 del blueprint — NO implementado todavía.
 * Se activa cuando el evaluador de Writing valide la hipótesis del embudo.
 * Ver docs/blueprint-labs-ia.md § Fase 2.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * Notas de implementación para cuando toque:
 *  1. Azure evalúa pronunciación en clips de hasta 30s (LIMITS.maxAudioSeconds).
 *     Para audio más largo hay que usar modo continuo.
 *  2. El pipeline de audio YA EXISTE: src/app/api/practica/submit-audio/route.ts
 *     valida MIME, limita a 10MB y sube a Supabase Storage. Este provider
 *     debe leer de ahí, no reinventar la carga.
 *  3. La config va en el header Pronunciation-Assessment (JSON en base64):
 *     { ReferenceText, GradingSystem: 'HundredMark', Granularity: 'Phoneme' }
 *  4. `referenceText` vacío = evaluación sin guion (unscripted). Con guion da
 *     completeness; sin guion, no.
 */

import { providers, isConfigured } from '../config';
import type { PronunciationResult, LabsError } from '../types';

export interface PronunciationInput {
  audio:         ArrayBuffer;
  /** Lo que el estudiante debía decir. Vacío = evaluación libre. */
  referenceText: string;
  /** BCP-47: 'en-US', 'ko-KR', 'de-DE', 'fr-FR', 'pt-BR', 'it-IT'. */
  locale:        string;
}

export async function assessPronunciation(
  _input: PronunciationInput,
): Promise<PronunciationResult | LabsError> {
  if (!isConfigured('azureSpeech')) {
    return { code: 'not_configured', message: 'Falta AZURE_SPEECH_KEY' };
  }

  // TODO(fase-2): POST a
  // https://{region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1
  // con header Pronunciation-Assessment y el audio como body.
  return { code: 'provider_error', message: 'Azure Speech aún no implementado (fase 2).' };
}

/** Región del endpoint, para no repetir la construcción de la URL. */
export function sttEndpoint(): string {
  return `https://${providers.azureSpeech.region}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1`;
}
