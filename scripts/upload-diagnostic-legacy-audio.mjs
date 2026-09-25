import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const audit = JSON.parse(await readFile(resolve(root, 'config/diagnostic/recovered-listening-content-audit.json'), 'utf8'));
const execute = process.argv.includes('--execute');
const bucket = 'diagnostic-audio';

const files = await Promise.all(audit.items.map(async (item) => {
  const localPath = resolve(root, item.audio.privatePath);
  const bytes = await readFile(localPath);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  if (sha256 !== item.audio.sha256) throw new Error(`${item.id}: recovered audio hash mismatch`);
  const match = /^en-(a1|a2|b1)-legacy-listening-(\d{2})$/.exec(item.id);
  if (!match) throw new Error(`${item.id}: unsupported legacy media id`);
  return { id: item.id, bytes, sha256, objectPath: `legacy/en/${match[1]}/listening-${match[2]}.mp3` };
}));

if (!execute) {
  process.stdout.write(`Verified ${files.length} recovered MP3 files (${files.reduce((sum, file) => sum + file.bytes.length, 0)} bytes).\n`);
  process.stdout.write('Dry run only. Add --execute with server credentials to upload to the private diagnostic-audio bucket.\n');
  process.exit(0);
}

const endpoint = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!endpoint || !serviceKey) throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required');

for (const file of files) {
  const encodedPath = file.objectPath.split('/').map(encodeURIComponent).join('/');
  const response = await fetch(`${endpoint}/storage/v1/object/${bucket}/${encodedPath}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      'Content-Type': 'audio/mpeg',
      'x-upsert': 'false',
      'x-metadata': JSON.stringify({ sha256: file.sha256, source: 'welearn-legacy-recovered' }),
    },
    body: file.bytes,
  });
  if (!response.ok) throw new Error(`${file.id}: upload failed (${response.status}) ${await response.text()}`);
}
process.stdout.write(`Uploaded ${files.length} verified MP3 files to ${bucket}.\n`);
