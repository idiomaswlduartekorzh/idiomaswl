import { DIAGNOSTIC_CONSENT_VERSION } from '../../lib/diagnostic/delivery.ts';
import type { DiagnosticWritingPrompt } from '../../lib/diagnostic/writing.ts';
import {
  buildDiagnosticAutomatedWritingEvaluation,
  buildDiagnosticWritingAutomationRequest,
} from './writing-automation.ts';
import type { DiagnosticAutomatedWritingEvaluation } from './writing.ts';

export type DiagnosticWritingProvider = 'gemini' | 'groq';

export type DiagnosticWritingProviderBlocker =
  | 'automation-disabled'
  | 'external-processing-not-approved'
  | 'provider-policy-not-approved'
  | 'provider-missing'
  | 'model-missing'
  | 'provider-model-not-supported'
  | 'api-key-missing'
  | 'external-consent-version-missing'
  | 'external-consent-version-not-distinct'
  | 'provider-policy-version-missing';

export interface DiagnosticWritingProviderReadiness {
  ready: boolean;
  provider: DiagnosticWritingProvider | null;
  model: string | null;
  blockers: readonly DiagnosticWritingProviderBlocker[];
}

export interface DiagnosticExternalWritingAuthorization {
  /** Must be persisted with the attempt by a trusted server workflow before this adapter is connected. */
  externalProcessingConsent: true;
  consentVersion: string;
  providerPolicyVersion: string;
  consentedAt: string;
}

export type DiagnosticWritingProviderErrorCode =
  | 'PROVIDER_NOT_READY'
  | 'PROCESSING_NOT_AUTHORIZED'
  | 'REQUEST_INVALID'
  | 'RATE_LIMITED'
  | 'PROVIDER_UNAVAILABLE'
  | 'PROVIDER_RESPONSE_INVALID';

export class DiagnosticWritingProviderError extends Error {
  readonly code: DiagnosticWritingProviderErrorCode;

  constructor(code: DiagnosticWritingProviderErrorCode, message: string) {
    super(message);
    this.code = code;
    this.name = 'DiagnosticWritingProviderError';
  }
}

type DiagnosticProviderEnvironment = Readonly<Record<string, string | undefined>>;
type DiagnosticProviderFetch = (input: string | URL | Request, init?: RequestInit) => Promise<Response>;

const GROQ_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models';
const REQUEST_TIMEOUT_MS = 60_000;
const GROQ_STRICT_MODELS = new Set([
  'openai/gpt-oss-20b',
  'openai/gpt-oss-120b',
  'qwen/qwen3.8-27b',
]);

function configuredProvider(env: DiagnosticProviderEnvironment): DiagnosticWritingProvider | null {
  return env.DIAGNOSTIC_WRITING_PROVIDER === 'gemini' || env.DIAGNOSTIC_WRITING_PROVIDER === 'groq'
    ? env.DIAGNOSTIC_WRITING_PROVIDER
    : null;
}

function providerApiKey(
  provider: DiagnosticWritingProvider | null,
  env: DiagnosticProviderEnvironment,
): string {
  if (provider === 'gemini') return env.GEMINI_API_KEY?.trim() ?? '';
  if (provider === 'groq') return env.GROQ_API_KEY?.trim() ?? '';
  return '';
}

/**
 * Reports only blocker names. It never returns credentials and never probes a provider.
 * Readiness is intentionally stricter than the existing Labs writing tools because a
 * diagnostic response is assessment data, not an optional practice submission.
 */
export function getDiagnosticWritingProviderReadiness(
  env: DiagnosticProviderEnvironment = process.env,
): DiagnosticWritingProviderReadiness {
  const provider = configuredProvider(env);
  const model = env.DIAGNOSTIC_WRITING_MODEL?.trim() || null;
  const externalConsentVersion = env.DIAGNOSTIC_EXTERNAL_WRITING_CONSENT_VERSION?.trim() ?? '';
  const blockers: DiagnosticWritingProviderBlocker[] = [];

  if (env.DIAGNOSTIC_WRITING_AUTOMATION_ENABLED !== 'true') blockers.push('automation-disabled');
  if (env.DIAGNOSTIC_EXTERNAL_WRITING_PROCESSING_APPROVED !== 'true') {
    blockers.push('external-processing-not-approved');
  }
  if (env.DIAGNOSTIC_WRITING_PROVIDER_POLICY_APPROVED !== 'true') {
    blockers.push('provider-policy-not-approved');
  }
  if (!provider) blockers.push('provider-missing');
  if (!model || model.length > 160) blockers.push('model-missing');
  if (provider === 'groq' && model && !GROQ_STRICT_MODELS.has(model)) {
    blockers.push('provider-model-not-supported');
  }
  if (!providerApiKey(provider, env)) blockers.push('api-key-missing');
  if (!externalConsentVersion) blockers.push('external-consent-version-missing');
  if (externalConsentVersion === DIAGNOSTIC_CONSENT_VERSION) {
    blockers.push('external-consent-version-not-distinct');
  }
  if (!env.DIAGNOSTIC_WRITING_PROVIDER_POLICY_VERSION?.trim()) {
    blockers.push('provider-policy-version-missing');
  }

  return { ready: blockers.length === 0, provider, model, blockers };
}

function assertAuthorization(
  authorization: DiagnosticExternalWritingAuthorization,
  env: DiagnosticProviderEnvironment,
  evaluatedAt: Date,
): void {
  const consentedAt = Date.parse(authorization.consentedAt);
  if (authorization.externalProcessingConsent !== true
    || !Number.isFinite(consentedAt)
    || new Date(consentedAt).toISOString() !== authorization.consentedAt
    || consentedAt > evaluatedAt.getTime()
    || authorization.consentVersion !== env.DIAGNOSTIC_EXTERNAL_WRITING_CONSENT_VERSION
    || authorization.providerPolicyVersion !== env.DIAGNOSTIC_WRITING_PROVIDER_POLICY_VERSION) {
    throw new DiagnosticWritingProviderError(
      'PROCESSING_NOT_AUTHORIZED',
      'External writing processing is not authorized for this attempt.',
    );
  }
}

/** Keep only the JSON Schema subset shared by both provider transports. */
function providerSchema(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(providerSchema);
  if (!value || typeof value !== 'object') return value;
  const source = value as Record<string, unknown>;
  const supported = new Set(['type', 'properties', 'required', 'additionalProperties', 'items', 'enum', 'description']);
  return Object.fromEntries(Object.entries(source)
    .filter(([key]) => supported.has(key))
    .map(([key, child]) => [key, providerSchema(child)]));
}

function buildProviderRequest(input: {
  provider: DiagnosticWritingProvider;
  model: string;
  apiKey: string;
  request: ReturnType<typeof buildDiagnosticWritingAutomationRequest>;
}): { url: string; init: RequestInit } {
  if (input.provider === 'groq') {
    return {
      url: GROQ_ENDPOINT,
      init: {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${input.apiKey}`,
        },
        body: JSON.stringify({
          model: input.model,
          temperature: 0,
          max_completion_tokens: 3_000,
          messages: [
            { role: 'system', content: input.request.systemInstruction },
            { role: 'user', content: input.request.input },
          ],
          response_format: {
            type: 'json_schema',
            json_schema: {
              name: 'welearn_cefr_writing_evaluation',
              strict: true,
              schema: providerSchema(input.request.responseSchema),
            },
          },
        }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    };
  }

  return {
    url: `${GEMINI_ENDPOINT}/${encodeURIComponent(input.model)}:generateContent`,
    init: {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': input.apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: input.request.systemInstruction }] },
        contents: [{ role: 'user', parts: [{ text: input.request.input }] }],
        generationConfig: {
          responseFormat: {
            text: {
              mimeType: 'application/json',
              schema: providerSchema(input.request.responseSchema),
            },
          },
          temperature: 0,
        },
      }),
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    },
  };
}

function extractProviderOutput(provider: DiagnosticWritingProvider, value: unknown): unknown {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const payload = value as Record<string, unknown>;
  const raw = provider === 'groq'
    ? (payload.choices as Array<{ message?: { content?: unknown } }> | undefined)?.[0]?.message?.content
    : (payload.candidates as Array<{ content?: { parts?: Array<{ text?: unknown }> } }> | undefined)?.[0]
      ?.content?.parts?.[0]?.text;
  if (typeof raw !== 'string' || raw.length < 2 || raw.length > 100_000) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/**
 * Provider transport only. It is deliberately not called by a route or job yet:
 * the future caller must load authorization from persisted attempt data, never
 * accept it from a browser payload.
 */
export async function requestDiagnosticWritingEvaluation(input: {
  prompt: DiagnosticWritingPrompt;
  responseText: string;
  authorization: DiagnosticExternalWritingAuthorization;
}, dependencies: {
  env?: DiagnosticProviderEnvironment;
  fetch?: DiagnosticProviderFetch;
  now?: () => Date;
} = {}): Promise<DiagnosticAutomatedWritingEvaluation> {
  const env = dependencies.env ?? process.env;
  const readiness = getDiagnosticWritingProviderReadiness(env);
  if (!readiness.ready || !readiness.provider || !readiness.model) {
    throw new DiagnosticWritingProviderError(
      'PROVIDER_NOT_READY',
      `Diagnostic writing provider is not ready: ${readiness.blockers.join(', ')}`,
    );
  }
  const evaluatedAt = (dependencies.now ?? (() => new Date()))();
  assertAuthorization(input.authorization, env, evaluatedAt);
  if (input.prompt.language !== 'en'
    || !input.prompt.id.trim()
    || !input.prompt.contentVersion.trim()
    || !input.responseText.trim()
    || input.responseText.length > 12_000) {
    throw new DiagnosticWritingProviderError('REQUEST_INVALID', 'Diagnostic writing request is invalid.');
  }

  const automationRequest = buildDiagnosticWritingAutomationRequest(input.prompt, input.responseText);
  const providerRequest = buildProviderRequest({
    provider: readiness.provider,
    model: readiness.model,
    apiKey: providerApiKey(readiness.provider, env),
    request: automationRequest,
  });

  let response: Response;
  try {
    response = await (dependencies.fetch ?? fetch)(providerRequest.url, providerRequest.init);
  } catch {
    throw new DiagnosticWritingProviderError('PROVIDER_UNAVAILABLE', 'Diagnostic writing provider is unavailable.');
  }
  if (response.status === 429) {
    throw new DiagnosticWritingProviderError('RATE_LIMITED', 'Diagnostic writing provider rate limit reached.');
  }
  if (!response.ok) {
    throw new DiagnosticWritingProviderError('PROVIDER_UNAVAILABLE', 'Diagnostic writing provider rejected the request.');
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch {
    throw new DiagnosticWritingProviderError('PROVIDER_RESPONSE_INVALID', 'Diagnostic writing provider returned invalid JSON.');
  }
  const rawOutput = extractProviderOutput(readiness.provider, payload);
  if (!rawOutput) {
    throw new DiagnosticWritingProviderError('PROVIDER_RESPONSE_INVALID', 'Diagnostic writing provider returned an invalid response.');
  }

  try {
    return buildDiagnosticAutomatedWritingEvaluation({
      rawOutput,
      prompt: input.prompt,
      responseText: input.responseText,
      model: `${readiness.provider}/${readiness.model}`,
      evaluatedAt,
    });
  } catch {
    throw new DiagnosticWritingProviderError('PROVIDER_RESPONSE_INVALID', 'Diagnostic writing evidence failed validation.');
  }
}
