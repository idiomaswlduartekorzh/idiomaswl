import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import test from 'node:test';

// Resolve the app alias in Node; execute the real handler, never call a live service.
registerHooks({ resolve(specifier, context, nextResolve) {
  return nextResolve(specifier.startsWith('@/')
    ? new URL(`../src/${specifier.slice(2)}.ts`, import.meta.url).href : specifier, context);
} });
const { POST } = await import('../src/app/api/whatsapp/attribution/route.ts');
const body = { reference: 'WL-111111111111111111111111', source_page: '/links', landing_page: '/blog/ielts',
  interaction: 'click', utm_source: 'instagram', channel: 'Untrusted client label' };
const request = (value = body, origin = 'https://www.idiomaswl.com') => new Request('https://www.idiomaswl.com/api/whatsapp/attribution', {
  method: 'POST', headers: { Origin: origin, Host: 'www.idiomaswl.com', 'Content-Type': 'application/json' }, body: JSON.stringify(value),
});

test('real HTTP handler rejects hostile/large data and surfaces persistence failures without redirects', async () => {
  const keys = ['NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY'];
  const saved = keys.map(key => process.env[key]);
  const originalFetch = globalThis.fetch;
  let calls = 0;
  try {
    Object.assign(process.env, { NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED: 'true',
      NEXT_PUBLIC_SUPABASE_URL: 'https://local-fixture.invalid', SUPABASE_SERVICE_ROLE_KEY: 'local-fixture-only' });
    globalThis.fetch = async (_input, init) => {
      calls++;
      const data = JSON.parse(String(init?.body));
      assert.equal(data.p_intent.channel, 'Campaña etiquetada');
      assert.match(data.p_rate_key, /^[a-f0-9]{64}$/);
      return Response.json(true);
    };
    assert.equal((await POST(request())).status, 204);
    assert.equal(calls, 1);
    assert.equal((await POST(request(body, 'https://evil.example'))).status, 403);
    assert.equal((await POST(request(body, ''))).status, 403);
    assert.equal((await POST(request({ ...body, source_page: '/dashboard/admin' }))).status, 400);
    assert.equal((await POST(request({ ...body, reference: 'invalid' }))).status, 400);
    assert.equal((await POST(request({ ...body, extra: 'x'.repeat(5000) }))).status, 413);
    assert.equal(calls, 1);
    globalThis.fetch = async () => Response.json(false);
    assert.equal((await POST(request())).status, 429);
    globalThis.fetch = async () => { throw new Error('Synthetic network failure'); };
    assert.equal((await POST(request())).status, 503);
    process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED = 'false';
    assert.equal((await POST(request())).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    keys.forEach((key, index) => { if (saved[index] === undefined) delete process.env[key]; else process.env[key] = saved[index]; });
  }
});
