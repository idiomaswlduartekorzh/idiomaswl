// ─── ¿Se ha movido alguna respuesta correcta? ─────────────────────────────────
//
//   node scripts/diff-historia-correctas.mjs ingles/the-locked-phone
//   node scripts/diff-historia-correctas.mjs --todas
//
// Compara el texto de la opción correcta de cada pregunta con el que había en el
// último commit. Falla si alguna cambió.
//
// POR QUÉ. Reescribir distractores es una operación de un solo sentido: la
// respuesta correcta NO se toca. Un reemplazo por bloques durante el arreglo de
// `the-tip-screen` metió los distractores de una pregunta en otra; el índice
// `correct` seguía donde estaba, así que compilaba, pasaba el guardián de
// estructura, y en pantalla la respuesta marcada como buena no respondía a la
// pregunta. Esto es lo único que lo ve.
//
// Compara por TEXTO, no por índice, y empareja las preguntas por su enunciado:
// así sigue valiendo aunque el reparto de posiciones mueva las opciones de sitio.

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) {
        return nextResolve(`${specifier}.ts`, context);
      }
      throw error;
    }
  },
});

const repoRoot = path.resolve(import.meta.dirname, '..');
const ref = process.argv.includes('--ref') ? process.argv[process.argv.indexOf('--ref') + 1] : 'HEAD';

/** { pregunta -> texto de la correcta } de una historia ya balanceada. */
function firma(h) {
  const qs = [
    ...h.narrator.questions,
    ...h.voices.flatMap(v => v.questions),
    ...h.finalQuestions,
  ];
  return new Map(qs.map(q => [q.q, q.opts[q.correct]]));
}

const mod = await import('../src/data/practica/historias/index.ts');
const objetivos = process.argv.includes('--todas')
  ? mod.HISTORIA_LANG_KEYS.flatMap(l => mod.HISTORIAS_BY_LANG[l].map(h => `${l}/${h.slug}`))
  : [process.argv[2]].filter(Boolean);

if (!objetivos.length) {
  console.error('Uso: node scripts/diff-historia-correctas.mjs <idioma>/<slug>   (o --todas)');
  process.exit(1);
}

// El árbol de referencia se materializa en un directorio temporal y se importa
// desde ahí: es la única forma de ejecutar la versión antigua del archivo sin
// tocar el árbol de trabajo, donde puede haber otras sesiones editando.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'historias-ref-'));
const relBase = 'src/data/practica/historias';
const ficheros = execFileSync('git', ['ls-tree', '-r', '--name-only', ref, relBase], { cwd: repoRoot, encoding: 'utf8' })
  .split('\n').filter(Boolean);
for (const f of ficheros) {
  const destino = path.join(tmp, f);
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, execFileSync('git', ['show', `${ref}:${f}`], { cwd: repoRoot }));
}
const antes = await import(path.join(tmp, relBase, 'index.ts'));

let fallos = 0, revisadas = 0;
for (const id of objetivos) {
  const [lang, slug] = id.split('/');
  const nueva = (mod.HISTORIAS_BY_LANG[lang] ?? []).find(h => h.slug === slug);
  const vieja = (antes.HISTORIAS_BY_LANG[lang] ?? []).find(h => h.slug === slug);
  if (!nueva) { console.error(`✗ ${id}: no existe en el árbol de trabajo`); fallos++; continue; }
  if (!vieja) { console.log(`· ${id}: nueva en este árbol, nada que comparar`); continue; }

  const a = firma(vieja), b = firma(nueva);
  const problemas = [];
  for (const [preg, correcta] of a) {
    if (!b.has(preg)) { problemas.push(`enunciado desaparecido: «${preg.slice(0, 70)}»`); continue; }
    if (b.get(preg) !== correcta) {
      problemas.push(`«${preg.slice(0, 60)}»\n      antes: ${correcta}\n      ahora: ${b.get(preg)}`);
    }
  }
  for (const preg of b.keys()) if (!a.has(preg)) problemas.push(`enunciado nuevo: «${preg.slice(0, 70)}»`);

  revisadas += a.size;
  if (problemas.length) {
    fallos += problemas.length;
    console.error(`\n✗ ${id} — ${problemas.length} respuesta(s) correcta(s) alterada(s):`);
    for (const p of problemas) console.error(`   · ${p}`);
  } else {
    console.log(`✓ ${id.padEnd(42)} ${a.size} respuestas correctas intactas`);
  }
}

fs.rmSync(tmp, { recursive: true, force: true });

if (fallos) {
  console.error(`\n✗ ${fallos} problema(s). Al reescribir distractores la respuesta correcta NO se toca.`);
  process.exit(1);
}
console.log(`\n✓ ${revisadas} respuestas correctas intactas respecto a ${ref}.`);
