// ─── Propuesta de reparto de las Historias ────────────────────────────────────
//
// No gasta créditos: solo lee /v1/voices (consulta de lectura) y escribe dos
// archivos locales.
//
//   node scripts/propose-historias-casting.mjs          # propone y monta la hoja
//   node scripts/propose-historias-casting.mjs --write  # además rellena el casting
//
// De dónde sale la propuesta: de las voces que ya existen en la cuenta por las
// series de escucha, con el prefijo «WL <idioma>». No hace falta añadir ninguna.
//
// Criterio, en este orden:
//   1. Lengua nativa de la voz (una voz inglesa hablando coreano suena a turista).
//   2. Sexo que coincide con el personaje — la regla que se saltó el Ledger.
//   3. Edad: las historias del celular son parejas jóvenes; las del libro de
//      cuentas, una nuera de treinta y muchos y un abuelo.
//   4. Que la voz no se repita dentro del mismo ejercicio.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(scriptDir, '..')
const castingPath = path.join(scriptDir, 'historias-voice-casting.json')
const sheetDir = path.join(repoRoot, 'tmp-catas-historias')

const apiKey = process.env.ELEVENLABS_API_KEY ?? Object.fromEntries(
  fs.readFileSync(path.join(repoRoot, '.env.local'), 'utf8').split('\n')
    .filter(l => l.includes('=') && !l.trim().startsWith('#'))
    .map(l => { const i = l.indexOf('='); return [l.slice(0, i).trim(), l.slice(i + 1).trim()] }),
).ELEVENLABS_API_KEY

// ── La propuesta ───────────────────────────────────────────────────────────
// clave = id de la nota (idioma/historia/voz), valor = [voice_id, por qué]
const PROPUESTA = {
  // Inglés — solo el Ledger; The Locked Phone ya está grabado.
  'ingles/the-grandfathers-ledger/a': ['cgSgspJ2msm6clMCkdW9', 'Jessica · conversacional y cálida: es una nota de voz a una amiga, no una locución'],
  'ingles/the-grandfathers-ledger/b': ['y2Y5MeVPm6ZQXK64WUui', 'WL en · Grandpa Sam · la única voz masculina mayor del reparto inglés'],

  'aleman/das-gesperrte-handy/a': ['AnvlJBAqSLDzEevYr9Ap', 'WL de · Emma · joven, para la pareja de dos años'],
  'aleman/das-gesperrte-handy/b': ['SR5PqrZCNyNgSyTEWnLu', 'WL de · Lukas · joven'],
  'aleman/das-kassenbuch-des-grossvaters/a': ['uvysWDLbKpA4XvpD3GI6', 'WL de · Frau Schneider · edad media, madre de un niño de tres años'],
  'aleman/das-kassenbuch-des-grossvaters/b': ['NlRO8ABjJNJNYaRaLiPJ', 'WL de · Herr Becker · la voz masculina más mayor que hay en alemán'],

  'frances/le-telephone-verrouille/a': ['mNu8EQcIlFZdOJs7yfhe', 'WL fr · Léa · parisina joven'],
  'frances/le-telephone-verrouille/b': ['yG4Uc56cLYQyZFnWaYv2', 'WL fr · Hugo · parisino joven'],
  'frances/le-carnet-du-grand-pere/a': ['9UK7PgAsdvmlErBPenNb', 'WL fr · Madame Martin · edad media'],
  'frances/le-carnet-du-grand-pere/b': ['t2969wgUwHbBoVCZNHRU', 'WL fr · Monsieur Bertin · mayor — encaja exacto con el abuelo'],

  'italiano/il-telefono-capovolto/a': ['RZ9oBlQ97k7Ug7uU1Ij0', 'WL it · Giulia · joven, y además se llama igual que el personaje'],
  'italiano/il-telefono-capovolto/b': ['x3ahg1G07UwsY7z9siqh', 'WL it · Matteo · joven'],
  'italiano/il-quaderno-del-nonno/a': ['zORK9zlVk5JLkgvi02K9', 'WL it · Signora Lucia · edad media'],
  'italiano/il-quaderno-del-nonno/b': ['ipT4u0Omn6M1PjJcECNG', 'WL it · Bruno · mayor — encaja exacto con el nonno'],

  'portugues/o-celular-virado-para-baixo/a': ['3eGB8TCZcvWDO8AHnwlp', 'WL pt · Nina · brasileña joven'],
  'portugues/o-celular-virado-para-baixo/b': ['nuqSYpkCikIPhZElRSCJ', 'WL pt · Tiago · brasileño joven'],
  'portugues/o-caderno-do-avo/a': ['8EY2gK6oUxZCDZAlvUpZ', 'WL pt · Dona Célia · brasileña de edad media'],
  'portugues/o-caderno-do-avo/b': ['CPYJeGOY3LvpmBJRlYK9', 'WL pt · Seu Antônio · brasileño mayor — encaja exacto con el avô'],

  'coreano/jamgin-hyudaepon/a': ['1gYuTfEwELcoEo96wnGj', 'WL ko · 유나 · Seúl, joven'],
  'coreano/jamgin-hyudaepon/b': ['LKOcTG4J4tYTPR9DnLeM', 'Mr. K · Seúl, joven — no hay ninguna voz masculina con prefijo WL ko'],
  'coreano/harabeoji-ui-jangbu/a': ['qWofGdsKN4woEPGCzrdX', 'WL ko · 미나 · Seúl, edad media'],
  'coreano/harabeoji-ui-jangbu/b': ['Mx48CWClvl522or3Frvp', 'SEGU Calm Seoul · la masculina coreana de más edad que hay'],

  'japones/fuserareta-sumaho/a': ['6l0ObIy4mHn0XfeKlCgW', 'WL ja · 恵美 · joven'],
  'japones/fuserareta-sumaho/b': ['CtZRdCe4DGWkjR4gX6qK', 'WL ja · 春 · joven, acento de Kanto'],
  'japones/sofu-no-choubo/a': ['t3iNwCjYhE9IEQPVBlys', 'WL ja · 田中ゆき · edad media'],
  'japones/sofu-no-choubo/b': ['BTUNhQfNpOekzVjlvRHS', 'WL ja · 図書館員 · registro tranquilo, el que más suena a mayor en japonés'],

  'ruso/telefon-ekranom-vniz/a': ['ScaQ3utur72x93jqMMeU', 'WL ru · Анна · joven, y se llama igual que el personaje'],
  'ruso/telefon-ekranom-vniz/b': ['76rT6drChOHgGsscaHMJ', 'WL ru · Миша · joven'],
  'ruso/dedushkina-tetrad/a': ['ELWVgJ5Mo9lF5Tha9ahW', 'WL ru · Ирина · edad media'],
  'ruso/dedushkina-tetrad/b': ['0igyFIChAVV6GGARy9qg', 'WL ru · Виктор Петрович · es literalmente el nombre con el que la nuera le habla en el texto'],
}

const r = await fetch('https://api.elevenlabs.io/v1/voices', { headers: { 'xi-api-key': apiKey } })
if (!r.ok) throw new Error(`${r.status} ${await r.text()}`)
const { voices } = await r.json()
const byId = new Map(voices.map(v => [v.voice_id, v]))

const casting = JSON.parse(fs.readFileSync(castingPath, 'utf8'))
const filas = []
const avisos = []

for (const [lang, conf] of Object.entries(casting.languages)) {
  for (const [id, papel] of Object.entries(conf.cast)) {
    const prop = PROPUESTA[id]
    if (!prop) { filas.push({ lang, id, papel, ya: true }); continue }
    const [voiceId, motivo] = prop
    const voz = byId.get(voiceId)
    if (!voz) { avisos.push(`${id}: el voice_id ${voiceId} ya no está en la cuenta`); continue }
    const g = (voz.labels?.gender ?? '').toLowerCase()
    if (g && g !== papel.sexo) avisos.push(`${id}: ${papel.personaje} es ${papel.sexo} y ${voz.name} está etiquetada ${g}`)
    papel.voice_id = voiceId
    papel.voz = voz.name
    papel.motivo = motivo
    filas.push({ lang, id, papel, voz, motivo })
  }
}

if (process.argv.includes('--write')) {
  fs.writeFileSync(castingPath, `${JSON.stringify(casting, null, 2)}\n`)
  console.log(`✓ ${path.relative(repoRoot, castingPath)} rellenado.`)
}

// ── Hoja para oírlas ───────────────────────────────────────────────────────
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]))
const LANGS = { ingles: '🇬🇧 Inglés', aleman: '🇩🇪 Alemán', frances: '🇫🇷 Francés', italiano: '🇮🇹 Italiano', portugues: '🇧🇷 Portugués', coreano: '🇰🇷 Coreano', japones: '🇯🇵 Japonés', ruso: '🇷🇺 Ruso' }

let html = `<!doctype html><meta charset="utf-8"><title>Reparto de las Historias</title>
<style>
 body{font:16px/1.6 system-ui,sans-serif;max-width:900px;margin:2rem auto;padding:0 1.25rem;color:#1a1a1a}
 h1{font-size:1.6rem;margin:0 0 .3rem} h2{font-size:1.05rem;margin:2rem 0 .6rem;border-bottom:2px solid #eee;padding-bottom:.3rem}
 .n{color:#666;font-size:.9rem;margin:0 0 1.5rem}
 .r{display:grid;grid-template-columns:1fr auto;gap:.6rem 1rem;align-items:center;padding:.7rem 0;border-bottom:1px solid #f0f0f0}
 .p{font-weight:700} .m{color:#666;font-size:.85rem} .v{font-family:ui-monospace,monospace;font-size:.8rem;color:#0f3d8c}
 audio{height:34px} .w{background:#fff8e6;border:1px solid #f0c14b;border-radius:8px;padding:.8rem 1rem;margin:1rem 0;font-size:.9rem}
 code{background:#f4f4f4;padding:.1rem .35rem;border-radius:4px;font-size:.85em}
</style>
<h1>Reparto propuesto de las Historias</h1>
<p class="n">Estas son muestras ya grabadas por ElevenLabs: oírlas <strong>no gasta créditos</strong>.
No son tus textos — sirven para juzgar el timbre, el acento y la edad de la voz.
Si alguna no te convence, cámbiala en <code>scripts/historias-voice-casting.json</code>.</p>
<div class="w"><strong>Lo que no puedes juzgar aquí:</strong> el ritmo de tu guion concreto.
Para eso está la prueba de 30 céntimos (<code>--sample --generate</code>), que te lee de verdad las primeras líneas de cada nota.</div>
`

for (const lang of Object.keys(LANGS)) {
  const grupo = filas.filter(f => f.lang === lang)
  if (!grupo.length) continue
  html += `<h2>${LANGS[lang]}</h2>`
  for (const f of grupo) {
    if (f.ya) {
      html += `<div class="r"><div><span class="p">${esc(f.papel.personaje)}</span> · ${esc(f.papel.papel)}<div class="m">Ya grabada — no se toca.</div></div><div></div></div>`
      continue
    }
    html += `<div class="r"><div><span class="p">${esc(f.papel.personaje)}</span> · ${esc(f.papel.papel)} · ${esc(f.papel.sexo)}
      <div class="m">${esc(f.motivo)}</div><div class="v">${esc(f.voz.voice_id)}</div></div>
      <div>${f.voz.preview_url ? `<audio controls preload="none" src="${esc(f.voz.preview_url)}"></audio>` : '<span class="m">sin muestra</span>'}</div></div>`
  }
}
html += `<p class="n" style="margin-top:2rem">Generado sin gastar créditos. Esta carpeta es temporal y está fuera de git.</p>`

fs.mkdirSync(sheetDir, { recursive: true })
const sheet = path.join(sheetDir, 'reparto.html')
fs.writeFileSync(sheet, html)

console.log(`\n${filas.filter(f => !f.ya).length} papeles con voz propuesta, 0 voces nuevas necesarias.`)
if (avisos.length) { console.log('\n⚠ Avisos:'); for (const a of avisos) console.log(`  · ${a}`) }
else console.log('✓ Todas las voces coinciden en sexo con su personaje.')
console.log(`\nHoja para oírlas: ${path.relative(repoRoot, sheet)}`)
