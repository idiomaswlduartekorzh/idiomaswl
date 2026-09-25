import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from '../src/server/diagnostic/bank/listening.en.ts';
import {
  DIAGNOSTIC_AUDIO_BUCKET,
  resolveDiagnosticMediaObject,
} from '../src/server/diagnostic/media.ts';

test('resolves every drafted legacy testlet to one private immutable media object', () => {
  const mediaIds = [...new Set(ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES.map(record => record.publicItem.stimulus.mediaId))];
  assert.equal(mediaIds.length, 12);
  for (const mediaId of mediaIds) {
    const media = resolveDiagnosticMediaObject(ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES, mediaId);
    assert.ok(media);
    assert.equal(media.bucket, DIAGNOSTIC_AUDIO_BUCKET);
    assert.match(media.objectPath, /^legacy\/en\/(a1|b1)\/listening-\d{2}\.mp3$/);
    assert.match(media.sha256, /^[a-f0-9]{64}$/);
    assert.equal(media.itemIds.length, 2);
  }
  assert.equal(resolveDiagnosticMediaObject(ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES, 'en-a1-legacy-listening-99'), null);
});

test('refuses ambiguous source hashes for one media id', () => {
  const first = ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[0];
  const second = {
    ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[1],
    publicItem: {
      ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[1].publicItem,
      stimulus: {
        ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[1].publicItem.stimulus,
        mediaId: first.publicItem.stimulus.mediaId,
      },
    },
    source: { ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[1].source, reference: `${ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES[1].source.reference.slice(0, -64)}${'0'.repeat(64)}` },
  };
  assert.throws(() => resolveDiagnosticMediaObject([first, second], first.publicItem.stimulus.mediaId), /inconsistent source hashes/);
});

test('media route authenticates, authorizes the active stage and streams only private storage', async () => {
  const route = await readFile(new URL('../src/app/api/diagnostic/media/[mediaId]/route.ts', import.meta.url), 'utf8');
  assert.match(route, /auth\.getUser\(\)/);
  assert.match(route, /authorizeDiagnosticMediaAccess/);
  assert.match(route, /storage\.from\(media\.bucket\)\.download\(media\.objectPath\)/);
  assert.match(route, /resolveAudioByteRange/);
  assert.match(route, /'Cache-Control': 'private, no-store, max-age=0'/);
  assert.doesNotMatch(route, /createSignedUrl|getPublicUrl/);
});

test('storage migration creates a private bucket without browser read policies', async () => {
  const sql = (await readFile(new URL('../supabase/migrations/20260925020000_diagnostic_private_audio.sql', import.meta.url), 'utf8')).toLowerCase();
  assert.match(sql, /'diagnostic-audio', 'diagnostic-audio', false/);
  assert.match(sql, /set public = false/);
  assert.match(sql, /drop policy if exists "public read diagnostic audio"/);
  assert.match(sql, /drop policy if exists "authenticated read diagnostic audio"/);
  assert.doesNotMatch(sql, /create policy/);
});

test('upload utility verifies hashes and requires an explicit execute flag', async () => {
  const script = await readFile(new URL('../scripts/upload-diagnostic-legacy-audio.mjs', import.meta.url), 'utf8');
  assert.match(script, /createHash\('sha256'\)/);
  assert.match(script, /process\.argv\.includes\('--execute'\)/);
  assert.match(script, /SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(script, /'x-upsert': 'false'/);
});
