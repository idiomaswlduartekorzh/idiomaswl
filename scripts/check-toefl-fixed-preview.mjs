import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const baseUrl = (process.argv[2] ?? '').replace(/\/$/, '');
assert.ok(/^https?:\/\//.test(baseUrl), 'usage: check-toefl-fixed-preview.mjs <base-url>');
const release = JSON.parse(await readFile(
  new URL('../docs/toefl-2026-audio-release-2026-08-21.json', import.meta.url),
  'utf8',
));

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const url = `${baseUrl}/examenes/toefl/practica/set-${setNumber}`;
  const response = await fetch(url, { redirect: 'follow' });
  assert.equal(response.status, 200, `Set ${setNumber} route must return 200`);
  const html = await response.text();
  assert.match(html, new RegExp(`TOEFL iBT Set ${setNumber} \\(Formato 2026\\)`), `Set ${setNumber} title must render`);
  assert.match(html, />97<\//, `Set ${setNumber} must render 97 blueprint interactions`);
  assert.match(html, />8<\//, `Set ${setNumber} must render eight sequential blocks`);
  assert.doesNotMatch(html, /Ítems con audio pendiente/, `Set ${setNumber} must not advertise blocked audio`);
  assert.match(html, /No afirma replicar el enrutamiento adaptativo de ETS/, `Set ${setNumber} must disclose the fixed route`);
}

for (let offset = 0; offset < release.filesByMediaId.length; offset += 20) {
  await Promise.all(release.filesByMediaId.slice(offset, offset + 20).map(async (file) => {
    const response = await fetch(`${baseUrl}${file.url}`, { method: 'HEAD', redirect: 'follow' });
    assert.equal(response.status, 200, `${file.url} must return 200`);
    assert.equal(Number(response.headers.get('content-length')), file.bytes, `${file.url} byte count must match the audited release`);
    assert.match(response.headers.get('content-type') ?? '', /^audio\/mpeg(?:;|$)/, `${file.url} must be served as audio/mpeg`);
  }));
}

console.log(`✓ TOEFL fixed preview: Sets 1–20 and 400/400 audited audio URLs return correctly at ${baseUrl}`);
