// El contador de carga de las simulaciones. UNO, y este.
//
// Existe por la misma razón que `fase7-scripts/prosa-canonica.mjs`: en la ronda anterior dos
// escenarios descontaban lo leído de la ficha, cuatro contaban en bruto y uno midió una sola
// pareja. El 79/21 de uno era 64/36 con el otro criterio.
//
// CRITERIO ÚNICO, declarado: se cuenta EN BRUTO todo lo que sale por la boca del jugador.
//   - inglés, español, muletillas, repeticiones y nombres propios;
//   - TAMBIÉN lo que el jugador lee en voz alta de su ficha (marcado [L]): sale por la boca;
//   - NO se cuenta la etiqueta del turno (**F1**), NO las marcas entre corchetes ([F], [D],
//     [V], [L], [X], [ES], [!]), NO el cronómetro final **(14 s)**, NO las líneas de comentario
//     que empiezan por '>', NO las tablas ni los diagnósticos.
// El mismo criterio en las cinco parejas, en el lector y en la contraprueba.
//
// Uso: node artifacts/habla-a2/fase8-scripts/carga.mjs [archivo]
import { readFileSync } from 'node:fs';

const file = process.argv[2] || new URL('../fase8-simulacion-4nuevo.md', import.meta.url).pathname;
const texto = readFileSync(file, 'utf8');

const limpia = (s) =>
  s
    .replace(/^\*\*[FD]\d+\*\*/, '')          // etiqueta de turno
    .replace(/\*\*\(\s*[\d:]+\s*s\s*\)\*\*/g, '') // cronómetro
    .replace(/`\[[^\]]*\]`/g, '')             // marcas con backtick
    .replace(/\[[^\]]*\]/g, '')               // marcas sueltas
    .replace(/[`*_"“”…—·]/g, ' ')
    .trim();

const cuenta = (s) => limpia(s).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;

const secciones = [];
let actual = null;
for (const linea of texto.split('\n')) {
  const h = /^##\s+(.*)$/.exec(linea);
  if (h && !/^Cómo|^Diagn/i.test(h[1])) { actual = { titulo: h[1].trim(), A: 0, B: 0, tA: 0, tB: 0 }; secciones.push(actual); continue; }
  const t = /^\*\*([FD])(\d+)\*\*/.exec(linea);
  if (t && actual) {
    const n = cuenta(linea);
    if (t[1] === 'F') { actual.A += n; actual.tA++; } else { actual.B += n; actual.tB++; }
  }
}

console.log(`${'conversación'.padEnd(46)} ${'A pal'.padStart(6)} ${'B pal'.padStart(6)} ${'A%'.padStart(5)} ${'B%'.padStart(5)}  turnos`);
console.log('-'.repeat(86));
for (const s of secciones) {
  const tot = s.A + s.B;
  if (!tot) continue;
  const pa = ((s.A / tot) * 100).toFixed(1), pb = ((s.B / tot) * 100).toFixed(1);
  console.log(`  ${s.titulo.slice(0, 44).padEnd(44)} ${String(s.A).padStart(6)} ${String(s.B).padStart(6)} ${pa.padStart(5)} ${pb.padStart(5)}   ${s.tA}+${s.tB}`);
}
