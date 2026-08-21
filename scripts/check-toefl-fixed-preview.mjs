import assert from 'node:assert/strict';

const baseUrl = (process.argv[2] ?? '').replace(/\/$/, '');
assert.ok(/^https?:\/\//.test(baseUrl), 'usage: check-toefl-fixed-preview.mjs <base-url>');

for (let setNumber = 1; setNumber <= 20; setNumber += 1) {
  const url = `${baseUrl}/examenes/toefl/practica/set-${setNumber}`;
  const response = await fetch(url, { redirect: 'follow' });
  assert.equal(response.status, 200, `Set ${setNumber} route must return 200`);
  const html = await response.text();
  assert.match(html, new RegExp(`TOEFL iBT Set ${setNumber} \\(Formato 2026\\)`), `Set ${setNumber} title must render`);
  assert.match(html, />97<\//, `Set ${setNumber} must render 97 blueprint interactions`);
  assert.match(html, />8<\//, `Set ${setNumber} must render eight sequential blocks`);
  assert.match(html, />25<\//, `Set ${setNumber} must render 25 blocked interactions`);
  assert.match(html, /No afirma replicar el enrutamiento adaptativo de ETS/, `Set ${setNumber} must disclose the fixed route`);
}

console.log(`✓ TOEFL fixed preview: Sets 1–20 return 200 with 97 interactions, 8 stages, 25 blocked items and fixed-route disclosure at ${baseUrl}`);
