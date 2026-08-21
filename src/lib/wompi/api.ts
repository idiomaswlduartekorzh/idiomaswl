import 'server-only';

import type { WompiServerConfig } from './validation';
import {
  parseAndVerifyWompiTransaction,
  type VerifiedWompiTransaction,
} from './transactions';

export type WompiTransactionLookup =
  | Readonly<{ kind: 'success'; transaction: VerifiedWompiTransaction }>
  | Readonly<{ kind: 'not_found' }>
  | Readonly<{ kind: 'upstream_error' }>;

export async function fetchVerifiedWompiTransaction(
  transactionId: string,
  config: WompiServerConfig,
): Promise<WompiTransactionLookup> {
  if (!/^[A-Za-z0-9_-]{6,120}$/.test(transactionId)) {
    return { kind: 'not_found' };
  }

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/transactions/${encodeURIComponent(transactionId)}`,
      {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${config.publicKey}`,
        },
        cache: 'no-store',
        signal: AbortSignal.timeout(10_000),
      },
    );

    if (response.status === 404) return { kind: 'not_found' };
    if (!response.ok) return { kind: 'upstream_error' };

    const body: unknown = await response.json();
    if (typeof body !== 'object' || body === null || !Object.hasOwn(body, 'data')) {
      return { kind: 'upstream_error' };
    }

    const transaction = parseAndVerifyWompiTransaction(
      (body as Record<string, unknown>).data,
    );
    return transaction ? { kind: 'success', transaction } : { kind: 'not_found' };
  } catch {
    return { kind: 'upstream_error' };
  }
}
