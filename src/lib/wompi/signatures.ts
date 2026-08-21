import { createHash, timingSafeEqual } from 'node:crypto';

export function sha256Hex(value: string): string {
  return createHash('sha256').update(value, 'utf8').digest('hex');
}

export function buildWompiCheckoutIntegrity(input: {
  reference: string;
  amountInCents: number;
  currency: string;
  integritySecret: string;
}): string {
  return sha256Hex(`${input.reference}${input.amountInCents}${input.currency}${input.integritySecret}`);
}

function readPath(root: unknown, path: string): unknown {
  if (!root || typeof root !== 'object' || !path || path.split('.').some(part => !part)) return undefined;
  let current: unknown = root;
  for (const part of path.split('.')) {
    if (!current || typeof current !== 'object' || Array.isArray(current)) return undefined;
    if (!Object.hasOwn(current, part)) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function signedValue(value: unknown): string | null {
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value);
  return null;
}

export function buildWompiEventChecksum(input: {
  data: unknown;
  properties: string[];
  timestamp: number;
  eventsSecret: string;
}): string | null {
  if (!Number.isInteger(input.timestamp) || input.timestamp <= 0 || input.properties.length === 0 || input.properties.length > 20) {
    return null;
  }
  const values: string[] = [];
  for (const property of input.properties) {
    if (!/^[a-zA-Z0-9_.]+$/.test(property)) return null;
    const value = signedValue(readPath(input.data, property));
    if (value === null) return null;
    values.push(value);
  }
  return sha256Hex(`${values.join('')}${input.timestamp}${input.eventsSecret}`);
}

export function safeHexEqual(actual: unknown, expected: string): boolean {
  if (typeof actual !== 'string' || !/^[0-9a-f]{64}$/i.test(actual) || !/^[0-9a-f]{64}$/i.test(expected)) return false;
  const actualBuffer = Buffer.from(actual.toLowerCase(), 'hex');
  const expectedBuffer = Buffer.from(expected.toLowerCase(), 'hex');
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}
