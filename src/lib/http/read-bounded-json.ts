export type BoundedJsonResult =
  | { ok: true; value: unknown }
  | { ok: false; code: 'invalid_json' | 'payload_too_large'; status: 400 | 413 };

export async function readBoundedJson(request: Request, maxBytes: number): Promise<BoundedJsonResult> {
  if (!Number.isInteger(maxBytes) || maxBytes <= 0) {
    throw new TypeError('maxBytes must be a positive integer.');
  }
  if (!request.body) return { ok: false, code: 'invalid_json', status: 400 };

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let byteLength = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      byteLength += value.byteLength;
      if (byteLength > maxBytes) {
        await reader.cancel().catch(() => undefined);
        return { ok: false, code: 'payload_too_large', status: 413 };
      }
      chunks.push(value);
    }

    const bytes = new Uint8Array(byteLength);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const text = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
    return { ok: true, value: JSON.parse(text) };
  } catch {
    return { ok: false, code: 'invalid_json', status: 400 };
  } finally {
    reader.releaseLock();
  }
}
