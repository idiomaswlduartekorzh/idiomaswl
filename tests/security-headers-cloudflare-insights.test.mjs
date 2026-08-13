import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const nextConfig = await readFile(new URL('../next.config.ts', import.meta.url), 'utf8');

const directive = (name) => {
  const match = nextConfig.match(new RegExp(`"${name} ([^"]+)"`));
  assert.ok(match, `${name} directive must exist`);
  return match[1];
};

test('Cloudflare Web Analytics uses only its two required CSP origins', () => {
  const scripts = directive('script-src');
  const connections = directive('connect-src');

  assert.match(scripts, /(?:^| )https:\/\/static\.cloudflareinsights\.com(?: |$)/);
  assert.match(connections, /(?:^| )https:\/\/cloudflareinsights\.com(?: |$)/);
  assert.doesNotMatch(scripts, /(?:^| )https:(?: |$)/);
  assert.doesNotMatch(connections, /(?:^| )https:(?: |$)/);
  assert.doesNotMatch(nextConfig, /\*\.cloudflareinsights\.com/);
});

test('adding analytics does not weaken the surrounding CSP guardrails', () => {
  assert.equal(directive('object-src'), "'none'");
  assert.equal(directive('form-action'), "'self'");
  assert.equal(directive('frame-ancestors'), "'self'");
  assert.match(nextConfig, /X-Content-Type-Options/);
  assert.match(nextConfig, /Strict-Transport-Security/);
});
