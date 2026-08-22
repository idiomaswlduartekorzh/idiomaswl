#!/usr/bin/env node
// Aplica la lista mínima de cambios de reparto de género. Cada sustitución es exacta y
// se exige que aparezca EXACTAMENTE el número de veces declarado: si no, se aborta sin escribir.
import { readFileSync, writeFileSync } from 'node:fs';
const DIR = new URL('../', import.meta.url).pathname;

function patch(file, edits, { limit } = {}) {
  const path = DIR + file;
  let txt = readFileSync(path, 'utf8');
  let head = txt, tail = '';
  if (limit) { const i = txt.indexOf(limit); head = txt.slice(0, i); tail = txt.slice(i); }
  for (const [from, to, n = 1] of edits) {
    const parts = head.split(from);
    if (parts.length - 1 !== n) {
      console.error(`ABORTA ${file}: "${from.slice(0, 60)}" aparece ${parts.length - 1} veces, se esperaban ${n}`);
      process.exit(1);
    }
    head = parts.join(to);
  }
  writeFileSync(path, head + tail);
  console.log(`ok ${file} — ${edits.length} sustituciones`);
}

// ─── ESCENARIO 4 · Duván (H) → Astrid (M) ─────────────────────────────────────
patch('fase8-fichas-4nuevo.md', [
  ['**A = Fabián**, **B = Duván**.', '**A = Fabián**, **B = Astrid**.'],
  ['## ROLE B — Duván, and the bike leaves at 11:40', '## ROLE B — Astrid, and the bike leaves at 11:40'],
  ['1. Duván dijo a las diez', '1. Astrid dijo a las diez'],
  // ficha A: toda tercera persona es el rol B
  ['You cook. He came at nine to help.', 'You cook. She came at nine to help.'],
  ['You need them here at one, and he is the one who asks them.', 'You need them here at one, and she is the one who asks them.'],
  ['You don\'t open the fridge until he gives you three things', 'You don\'t open the fridge until she gives you three things'],
  ['You put two ways on the table before he says yes.', 'You put two ways on the table before she says yes.'],
  ['**If he rides off and you have no answer**', '**If she rides off and you have no answer**'],
  ['| advice, about his side | `You should tell them: get out of the water at …` | advise about his side of this, never about yours |',
   '| advice, about her side | `You should tell them: get out of the water at …` | advise about her side of this, never about yours |'],
  ['| asking how they get back | `And how do you all get back from …?` | the one question he can\'t answer with yes or no |',
   '| asking how they get back | `And how do you all get back from …?` | the one question she can\'t answer with yes or no |'],
  ['a physical no, not a no to him |', 'a physical no, not a no to her |'],
  ['He told you how many come back, before what hour', 'She told you how many come back, before what hour'],
  ['**When his fourth turn ends — global turn 5', '**When her fourth turn ends — global turn 5'],
  // cierre común: sin género, vale para las ocho parejas
  ['Say his line for him and it doesn\'t count — he says it again.', 'Say the other one\'s line and it doesn\'t count — they say it again.'],
  ['- Nobody nods his way through.', '- Nobody nods their way through.'],
  // Édgar ↔ Marcela: la moto (el recurso) pasa a ella, el carro que falla (el estorbo) a él
  ['| Édgar\'s bike | out 11:40', '| @@BIKE@@\'s bike | out 11:40'],
  ['To be on Édgar\'s bike at eleven forty', 'To be on @@BIKE@@\'s bike at eleven forty'],
  ['| 11:40 | Édgar passes · one passenger |', '| 11:40 | @@BIKE@@ passes · one passenger |'],
  ['| ~12:40 | Édgar back this way |', '| ~12:40 | @@BIKE@@ back this way |'],
  ['`Édgar can take …, and the rest walk from …`', '`@@BIKE@@ can take …, and the rest walk from …`'],
  ['You know Marcela\'s car is not coming back. You have her eleven eleven message on your phone, and you haven\'t shown it to him.',
   'You know Édgar\'s car is not coming back. You have his eleven eleven message on your phone, and you haven\'t shown it to him.'],
  ['| 4:00 | Marcela\'s car, finally out |', '| 4:00 | Édgar\'s car, finally out |'],
  ['@@BIKE@@', 'Marcela', 5],
], { limit: '## El recuento de prosa' });

// la etiqueta de la tabla de prosa vive en la zona de notas
patch('fase8-fichas-4nuevo.md', [['| **ROLE B — Duván** |', '| **ROLE B — Astrid** |']]);

// ─── ESCENARIO 5 · el vecino del 3 (H) → la vecina del 3 (M) ──────────────────
patch('fase7-fichas-5-late-again-on-monday.md', [
  ['- Your neighbor in apartment 3 goes to the same daycare every morning. He is the only reason your mornings can change. You have never asked him.',
   '- Your neighbor in apartment 3 goes to the same daycare every morning. She is the only reason your mornings can change. You have never asked her.'],
  ['| The neighbor in 3 | same daycare, every morning · never asked · his price: his two boys, Wednesdays at five |',
   '| The neighbor in 3 | same daycare, every morning · never asked · her price: her two boys, Wednesdays at five |'],
  ['| to pick up | to go and get somebody and take them home | his two boys, Wednesdays at five · the price of your mornings |',
   '| to pick up | to go and get somebody and take them home | her two boys, Wednesdays at five · the price of your mornings |'],
  ['`Then I pick up his two boys on…`', '`Then I pick up her two boys on…`'],
], { limit: '## The card' });

// ─── ESCENARIO 8 · Milena (M) → Mauricio (H) ──────────────────────────────────
patch('fase7-fichas-8-cancel-the-gym-i-am-leaving.md', [
  // ficha A: toda tercera persona es el rol B, menos Yurany
  ['Shouting buys nothing: she signs nothing.', 'Shouting buys nothing: he signs nothing.'],
  ['| ID | the card with your name and your number on it | what she asks for · and the number, out loud |',
   '| ID | the card with your name and your number on it | what he asks for · and the number, out loud |'],
  ['July 13 to October 13 · the reason she says no |', 'July 13 to October 13 · the reason he says no |'],
  ['With the screen face down: what she writes today and what she doesn\'t',
   'With the screen face down: what he writes today and what he doesn\'t'],
  ['1. **What Milena writes today, and what she doesn\'t.**', '1. **What Mauricio writes today, and what he doesn\'t.**'],
  // concordancias en español que daban por hecho que los dos roles eran mujeres
  ['Cuando las dos necesitan el mismo objeto,\ncada una lo lleva **desde su lado**',
   'Cuando los dos necesitan el mismo objeto,\ncada quien lo lleva **desde su lado**'],
  ['El acto va en su boca, que es donde lo pone el diseño: ella es la que\n   tiene las dos vías y la que decide',
   'El acto va en su boca, que es donde lo pone el diseño: es quien\n   tiene las dos vías y quien decide'],
  ['jerga que **ella produce** y que puede glosar', 'jerga que **produce él** y que puede glosar'],
  ['Es ella quien produce la palabra, así que es ella quien tiene', 'Es él quien produce la palabra, así que es él quien tiene'],
  // el nombre, en todo el archivo
  ['Milena', 'Mauricio', 24],
]);
