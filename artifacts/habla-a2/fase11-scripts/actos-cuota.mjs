// RETIRADO el 23 ago 2026. No lo corras: medía un set que ya no existe.
//
// Su mapa declaraba 9 filas para 1A y 9 para 1B, y el commit 9cfc3dd0 —«nueve filas para
// ocho turnos es un guion»— las dejó en 8 y 8. Con eso contaba 135 turnos-materia sobre un
// set que tiene 133, y las dos filas fantasma sumaban actos que ya no están escritos en
// ninguna ficha.
//
// El sustituto valida el mapa contra el disco y se para si no cuadra:
//
//     node artifacts/habla-a2/fase13-scripts/actos-conjunto.mjs
//
// Se deja el archivo, y no se borra, porque hay informes que lo citan por su ruta.
console.error('`fase11-scripts/actos-cuota.mjs` está RETIRADO: su mapa mide 135 turnos sobre un set de 133.');
console.error('Usa: node artifacts/habla-a2/fase13-scripts/actos-conjunto.mjs');
process.exit(2);
