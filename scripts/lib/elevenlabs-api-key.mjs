import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export function elevenLabsApiKey(root) {
  if (process.env.ELEVENLABS_API_KEY) return process.env.ELEVENLABS_API_KEY;
  const envPath = path.join(root, '.env.local');
  assert.ok(existsSync(envPath), 'ELEVENLABS_API_KEY is missing and .env.local does not exist');
  const line = readFileSync(envPath, 'utf8').split(/\r?\n/u).find(candidate => candidate.startsWith('ELEVENLABS_API_KEY='));
  assert.ok(line, '.env.local does not define ELEVENLABS_API_KEY');
  const key = line.slice('ELEVENLABS_API_KEY='.length).trim().replace(/^['"]|['"]$/gu, '');
  assert.match(key, /^sk_[A-Za-z0-9_-]{20,}$/u, '.env.local contains an invalid ElevenLabs API key');
  return key;
}
