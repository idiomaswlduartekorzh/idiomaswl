export const ICFES_TEACHER_UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function parseIcfesTeacherIdempotencyKey(value: string | null): string | null {
  const candidate = value?.trim().toLowerCase() ?? '';
  return ICFES_TEACHER_UUID_PATTERN.test(candidate) ? candidate : null;
}

export async function readIcfesTeacherJson(request: Request, maxBytes = 65_536): Promise<unknown> {
  if (!request.headers.get('content-type')?.startsWith('application/json')) throw new Error('invalid_request');
  const text = await request.text();
  if (new TextEncoder().encode(text).length > maxBytes) throw new Error('invalid_request');
  return JSON.parse(text);
}
