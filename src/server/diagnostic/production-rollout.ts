import { createHmac } from 'node:crypto';

const ROLLOUT_ID = /^[A-Za-z0-9][A-Za-z0-9._:-]{2,127}$/u;
const PERCENT = /^(?:0|[1-9]\d?|100)$/u;
const MINIMUM_SECRET_BYTES = 32;

export interface DiagnosticProductionRolloutConfiguration {
  rolloutId: string | null;
  percentage: number | null;
  valid: boolean;
  blockers: readonly string[];
}

export interface DiagnosticProductionRolloutDecision {
  eligible: boolean;
  configurationValid: boolean;
  blockers: readonly string[];
}

interface ParsedDiagnosticProductionRolloutConfiguration
  extends DiagnosticProductionRolloutConfiguration {
  secret: string | null;
}

function parseDiagnosticProductionRolloutConfiguration(
  env: Readonly<Record<string, string | undefined>>,
): ParsedDiagnosticProductionRolloutConfiguration {
  const rolloutId = env.DIAGNOSTIC_PRODUCTION_ROLLOUT_ID?.trim() ?? '';
  const percentageValue = env.DIAGNOSTIC_PRODUCTION_ROLLOUT_PERCENT?.trim() ?? '';
  const secret = env.DIAGNOSTIC_PRODUCTION_ROLLOUT_SECRET ?? '';
  const blockers: string[] = [];

  if (!ROLLOUT_ID.test(rolloutId)) blockers.push('rollout-id-invalid');
  if (!PERCENT.test(percentageValue)) blockers.push('rollout-percent-invalid');
  if (secret !== secret.trim() || Buffer.byteLength(secret, 'utf8') < MINIMUM_SECRET_BYTES) {
    blockers.push('rollout-secret-invalid');
  }

  return {
    rolloutId: rolloutId || null,
    percentage: PERCENT.test(percentageValue) ? Number(percentageValue) : null,
    secret: secret || null,
    valid: blockers.length === 0,
    blockers,
  };
}

/**
 * Validates production rollout configuration without returning secret material.
 */
export function validateDiagnosticProductionRolloutConfiguration(
  env: Readonly<Record<string, string | undefined>>,
): DiagnosticProductionRolloutConfiguration {
  const { secret: _secret, ...publicConfiguration } =
    parseDiagnosticProductionRolloutConfiguration(env);
  return publicConfiguration;
}

/**
 * Assigns an authenticated user to a stable, monotonic basis-point cohort.
 * No bucket, identifier or secret is returned to the caller.
 */
export function evaluateDiagnosticProductionRollout(input: {
  env: Readonly<Record<string, string | undefined>>;
  userId: string;
}): DiagnosticProductionRolloutDecision {
  const configuration = parseDiagnosticProductionRolloutConfiguration(input.env);
  if (!configuration.valid || configuration.percentage === null
    || !configuration.rolloutId || !configuration.secret || !input.userId) {
    return {
      eligible: false,
      configurationValid: false,
      blockers: configuration.blockers.length > 0
        ? configuration.blockers : ['rollout-user-invalid'],
    };
  }

  const digest = createHmac('sha256', configuration.secret)
    .update(configuration.rolloutId)
    .update('\0')
    .update(input.userId)
    .digest();
  const bucket = Math.floor((digest.readUInt32BE(0) / 0x1_0000_0000) * 10_000);

  return {
    eligible: bucket < configuration.percentage * 100,
    configurationValid: true,
    blockers: [],
  };
}
