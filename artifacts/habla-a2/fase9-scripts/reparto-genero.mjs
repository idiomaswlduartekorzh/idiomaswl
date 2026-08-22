#!/usr/bin/env node
// Reparto de género y trabajo de cuidado — set de habla A2, los OCHO escenarios de una vez.
// La ESTRUCTURA (quién manda, quién gana, quién causa, quién cuida) es curada: no cambia
// con un cambio de nombre. El GÉNERO se MIDE sobre el archivo: nombre declarado + léxico +
// recuento de pronombres. Así la tabla "después" sale de las fichas, no de la memoria.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const DIR = process.env.HABLA_DIR ? (process.env.HABLA_DIR.replace(/\/?$/, '/')) : new URL('../', import.meta.url).pathname;

const F = {
  1: 'fase7-fichas-1-the-bike-in-the-parking-lot.md',
  2: 'fase7-fichas-2-no-appointment-until-thursday.md',
  3: 'fase7-modelo-ficha-en.md',
  4: 'fase8-fichas-4nuevo.md',
  5: 'fase7-fichas-5-late-again-on-monday.md',
  6: 'fase7-fichas-6-the-cousin-on-the-sofa.md',
  7: 'fase7-fichas-7-two-more-people-for-the-trip.md',
  8: 'fase7-fichas-8-cancel-the-gym-i-am-leaving.md',
};

// Léxico de género. neutro = elegido a propósito para no llevar marca.
const GEN = {
  'Fabián':'H','Duván':'H','Camilo':'H','Kevin':'H','Iván':'H','Nelson':'H','Elkin':'H',
  'Hernán':'H','Sebastián':'H','Édgar':'H','Édison':'H','Wilmer':'H','Matías':'H','Mauricio':'H',
  'doña Amparo':'M','Valentina':'M','Tatiana':'M','Milena':'M','Astrid':'M','Alba':'M','Andrea':'M',
  'Marcela':'M','doña Nubia':'M','Nayibe':'M','Katherine':'M','Yurany':'M','Dr. Restrepo':'M',
  'Dani':'N','Cris':'N',
};
const gen = (n) => GEN[n] ?? (n === '—' ? '—' : '?');

// Estructura curada: qué hace cada rol en su escenario. Fuente: la propia ficha
// (banda del diseñador: poder, desenlace, restricciones, "You did it if").
const ROLES = [
  { e:1, r:'A', papel:'vende la bici',                manda:1, fuera:0, gana:0, causa:0, cuida:0 },
  { e:1, r:'B', papel:'compra la bici',               manda:0, fuera:0, gana:0, causa:0, cuida:0 },
  { e:2, r:'A', papel:'mostrador de la clínica',      manda:1, fuera:0, gana:0, causa:0, cuida:1 },
  { e:2, r:'B', papel:'paciente con dolor',           manda:0, fuera:0, gana:0, causa:0, cuida:0 },
  { e:3, r:'A', papel:'pide cubrir el sábado',        manda:0, fuera:0, gana:0, causa:1, cuida:0 },
  { e:3, r:'B', papel:'tiene el cierre',              manda:0, fuera:0, gana:0, causa:0, cuida:0 },
  { e:4, r:'A', papel:'la casa, el fuego, la olla',   manda:1, fuera:0, gana:1, causa:0, cuida:1 },
  { e:4, r:'B', papel:'la moto sale a las 11:40',     manda:0, fuera:0, gana:0, causa:1, cuida:1 },
  { e:5, r:'A', papel:'auxiliar de bodega',           manda:0, fuera:0, gana:0, causa:1, cuida:1 },
  { e:5, r:'B', papel:'supervisora/or de la tienda',  manda:1, fuera:0, gana:1, causa:0, cuida:0 },
  { e:6, r:'A', papel:'llega el primo el jueves',     manda:0, fuera:0, gana:0, causa:1, cuida:1 },
  { e:6, r:'B', papel:'el lunes en la sala',          manda:0, fuera:0, gana:0, causa:0, cuida:0 },
  { e:7, r:'A', papel:'la reserva está a su nombre',  manda:1, fuera:0, gana:1, causa:1, cuida:0 },
  { e:7, r:'B', papel:'dos cupos y plata ajena',      manda:0, fuera:0, gana:0, causa:1, cuida:0 },
  { e:8, r:'A', papel:'se va del país y sigue pagando', manda:0, fuera:0, gana:0, causa:0, cuida:0 },
  { e:8, r:'B', papel:'mostrador del gimnasio',       manda:1, fuera:0, gana:1, causa:0, cuida:0 },
];

// Terceros fuera de escena que DECIDEN, CAUSAN o CUIDAN. No son jugables.
const FUERA = [
  { e:1, quien:'the doorman',        fuera:1, causa:0, cuida:0 },
  { e:1, quien:'brother-in-law (B)', fuera:0, causa:1, cuida:0 },
  { e:2, quien:'Dr. Restrepo',       fuera:1, causa:0, cuida:1 },
  { e:3, quien:'Nayibe',             fuera:1, causa:0, cuida:0 },
  { e:4, quien:'MOTO11:40',          fuera:0, causa:0, cuida:0 },
  { e:4, quien:'CARRO4:00',          fuera:0, causa:1, cuida:0 },
  { e:5, quien:'NEIGHBOR3',          fuera:0, causa:0, cuida:1 },
  { e:5, quien:'Alba',               fuera:0, causa:0, cuida:0 },
  { e:6, quien:'Nelson',             fuera:0, causa:0, cuida:0 },
  { e:7, quien:'doña Nubia',         fuera:1, causa:0, cuida:0 },
  { e:7, quien:'the building manager',fuera:1, causa:0, cuida:0 },
  { e:8, quien:'Édison',             fuera:1, causa:0, cuida:0 },
  { e:8, quien:'Wilmer',             fuera:0, causa:1, cuida:0 },
];

function leer(e) {
  const txt = readFileSync(DIR + F[e], 'utf8');
  const nom = (r) => {
    const m = txt.match(new RegExp('\\*\\*' + r + ' = ([^*]+)\\*\\*'));
    return m ? m[1].trim() : '— sin nombre —';
  };
  const secs = {};
  const iA = txt.indexOf('## ROLE A');
  const iB = txt.indexOf('## ROLE B');
  const iC = txt.indexOf('\n## ', iB + 1);
  secs.A = txt.slice(iA, iB);
  secs.B = txt.slice(iB, iC < 0 ? txt.length : iC);
  const cnt = (s, re) => (s.match(re) || []).length;
  return {
    txt,
    A: nom('A'), B: nom('B'),
    pron: {
      A: { h: cnt(secs.A, /\b(he|him|his)\b/gi), m: cnt(secs.A, /\b(she|her|hers)\b/gi) },
      B: { h: cnt(secs.B, /\b(he|him|his)\b/gi), m: cnt(secs.B, /\b(she|her|hers)\b/gi) },
    },
    // vecino del 3 (esc. 5): se mide por el pronombre que lleva en la ficha
    vecino: String(e) !== '5' ? null
      : (/neighbor in apartment 3[^.]*\.\s*(He|She)\b/.test(txt)
          ? (txt.match(/neighbor in apartment 3[^.]*\.\s*(He|She)\b/)[1] === 'He' ? 'H' : 'M') : '?'),
  };
}

const datos = {};
for (const e of Object.keys(F)) datos[e] = leer(e);

const X = (v) => (v ? '**sí**' : '·');
const out = [];
out.push('| esc | rol | nombre | género | manda en escena | decide desde fuera | gana | causa el problema | cuida de alguien |');
out.push('|---|---|---|---|---|---|---|---|---|');
for (const R of ROLES) {
  const n = datos[R.e][R.r];
  out.push(`| ${R.e} | ${R.r} · ${R.papel} | ${n} | ${gen(n)} | ${X(R.manda)} | ${X(R.fuera)} | ${X(R.gana)} | ${X(R.causa)} | ${X(R.cuida)} |`);
}
console.log(out.join('\n'));

// --- recuento por columna, solo sobre roles CON MARCA de género (H/M) ---
const marcados = ROLES.map(R => ({ ...R, g: gen(datos[R.e][R.r]), nombre: datos[R.e][R.r] }));
const col = (k) => {
  const l = marcados.filter(r => r[k]);
  const h = l.filter(r => r.g === 'H').length, m = l.filter(r => r.g === 'M').length;
  const n = l.filter(r => r.g === 'N').length, s = l.filter(r => r.g === '?').length;
  return { h, m, n, s, tot: l.length, l };
};
console.log('\n| columna | hombres | mujeres | neutro/sin nombre | quiénes |');
console.log('|---|---|---|---|---|');
for (const [k, et] of [['manda','MANDA EN ESCENA'],['gana','GANA'],['causa','CAUSA EL PROBLEMA'],['cuida','CUIDA DE ALGUIEN']]) {
  const c = col(k);
  const q = c.l.map(r => `${r.nombre}(${r.g})`).join(' · ');
  console.log(`| ${et} | ${c.h} | ${c.m} | ${c.n + c.s} | ${q} |`);
}

// nombrados
const nombrados = marcados.filter(r => r.g === 'H' || r.g === 'M');
console.log(`\nRoles jugables con nombre y con marca de género: ${nombrados.length} — ` +
  `${nombrados.filter(r=>r.g==='H').length} hombres / ${nombrados.filter(r=>r.g==='M').length} mujeres`);
console.log(`Roles neutros a propósito: ${marcados.filter(r=>r.g==='N').map(r=>r.nombre).join(', ')}`);
console.log(`Roles sin nombre (sin marca): ${marcados.filter(r=>r.g==='—'||r.nombre.includes('sin nombre')).length}`);

// parejas del mismo género
console.log('\nParejas del mismo género (los dos jugables):');
let mismo = 0;
for (const e of Object.keys(F)) {
  const ga = gen(datos[e].A), gb = gen(datos[e].B);
  if ((ga === 'H' || ga === 'M') && ga === gb) { mismo++; console.log(`  esc ${e}: ${datos[e].A} + ${datos[e].B} — los dos ${ga}`); }
}
if (!mismo) console.log('  ninguna');

// fuera de escena
console.log('\n| esc | fuera de escena | género | decide desde fuera | causa | cuida |');
console.log('|---|---|---|---|---|---|');
for (const f of FUERA) {
  let nombre = f.quien, g;
  if (nombre === 'NEIGHBOR3') { nombre = 'el vecino/a del 3'; g = datos[5].vecino; }
  else if (nombre === 'the doorman') g = 'H';
  else if (nombre === 'brother-in-law (B)') g = 'H';
  else if (nombre === 'MOTO11:40') { const n = datos[4].txt.match(/\| (\S+)'s bike \| out 11:40/); nombre = `${n[1]} — la moto (recurso)`; g = gen(n[1]); }
  else if (nombre === 'CARRO4:00') { const n = datos[4].txt.match(/You know (\S+)'s car is not coming back/); nombre = `${n[1]} — el carro que no vuelve (estorbo)`; g = gen(n[1]); }
  else if (nombre === 'the building manager') g = /her question to him/.test(datos[7].txt) ? 'H' : '?';
  else g = gen(nombre.replace(/\s*\(.*\)/, ''));
  console.log(`| ${f.e} | ${nombre} | ${g} | ${X(f.fuera)} | ${X(f.causa)} | ${X(f.cuida)} |`);
}

// pronombres por ficha: en cada ficha la tercera persona es SIEMPRE el otro rol
console.log('\n| esc | ficha A: he/his/him · she/her | ficha B: he/his/him · she/her | el otro rol es |');
console.log('|---|---|---|---|');
for (const e of Object.keys(F)) {
  const d = datos[e];
  console.log(`| ${e} | ${d.pron.A.h} · ${d.pron.A.m} | ${d.pron.B.h} · ${d.pron.B.m} | A→${gen(d.B)} / B→${gen(d.A)} |`);
}
