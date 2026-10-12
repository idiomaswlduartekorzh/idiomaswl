import { createHmac, timingSafeEqual } from 'node:crypto';

export function createExamLeadReceipt(id: string, examSlug: string, mockId: string): string {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) throw new Error('Lead receipt key missing');
  return `${id}.${createHmac('sha256', key).update(`exam-review-v1:${id}:${examSlug}:${mockId}`).digest('hex')}`;
}

export function verifyExamLeadReceipt(receipt: unknown, examSlug: string, mockId: string): boolean {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const match = typeof receipt === 'string' ? /^([0-9a-f-]{36})\.([0-9a-f]{64})$/i.exec(receipt) : null;
  if (!key || !match || !/^[a-z0-9-]{2,40}$/.test(examSlug) || !/^[a-z0-9-]{2,40}$/.test(mockId)) return false;
  const expected = createHmac('sha256', key).update(`exam-review-v1:${match[1]}:${examSlug}:${mockId}`).digest();
  const provided = Buffer.from(match[2], 'hex');
  return provided.length === expected.length && timingSafeEqual(provided, expected);
}
