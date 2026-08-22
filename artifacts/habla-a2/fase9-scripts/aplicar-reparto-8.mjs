import { readFileSync, writeFileSync } from 'node:fs';
const DIR = new URL('../', import.meta.url).pathname;
const path = DIR + 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md';
let txt = readFileSync(path, 'utf8');
const edits = [
  ['Shouting buys nothing: she signs nothing.', 'Shouting buys nothing: he signs nothing.', 1],
  ['| ID | the card with your name and your number on it | what she asks for · and the number, out loud |',
   '| ID | the card with your name and your number on it | what he asks for · and the number, out loud |', 1],
  ['July 13 to October 13 · the reason she says no |', 'July 13 to October 13 · the reason he says no |', 1],
  ["With the screen face down: what she writes today and what she doesn't",
   "With the screen face down: what he writes today and what he doesn't", 1],
  ["1. **What Milena writes today, and what she doesn't.**", "1. **What Milena writes today, and what he doesn't.**", 1],
  ['Cuando las dos necesitan el mismo objeto,\ncada una lo lleva **desde su lado**',
   'Cuando los dos necesitan el mismo objeto,\ncada quien lo lleva **desde su lado**', 1],
  ['El acto va en su boca, que es donde lo pone el diseño: ella es la que\n   tiene las dos vías y la que decide',
   'El acto va en su boca, que es donde lo pone el diseño: es quien\n   tiene las dos vías y quien decide', 1],
  ['jerga que **ella produce** y que puede glosar', 'jerga que **produce él** y que puede glosar', 1],
  ['Es ella quien produce la palabra, así que es ella quien tiene', 'Es él quien produce la palabra, así que es él quien tiene', 1],
  ['Milena', 'Mauricio', 34],
];
for (const [from, to, n] of edits) {
  const parts = txt.split(from);
  if (parts.length - 1 !== n) { console.error(`ABORTA: "${from.slice(0,50)}" ${parts.length-1} veces, se esperaban ${n}`); process.exit(1); }
  txt = parts.join(to);
}
writeFileSync(path, txt);
console.log('ok escenario 8 —', edits.length, 'sustituciones');
