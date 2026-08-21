import { createHmac, timingSafeEqual } from 'node:crypto';

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left, 'utf8');
  const rightBuffer = Buffer.from(right, 'utf8');
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyWebhookChallenge(
  searchParams: URLSearchParams,
  expectedToken: string,
): string | null {
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode !== 'subscribe' || !token || !challenge) return null;
  return safeEqual(token, expectedToken) ? challenge : null;
}

export function verifyMetaSignature(
  rawBody: string,
  signatureHeader: string | null,
  appSecret: string,
): boolean {
  if (!signatureHeader?.startsWith('sha256=')) return false;

  const provided = signatureHeader.slice('sha256='.length);
  if (!/^[a-f0-9]{64}$/i.test(provided)) return false;

  const expected = createHmac('sha256', appSecret).update(rawBody, 'utf8').digest('hex');
  return safeEqual(provided.toLowerCase(), expected);
}
