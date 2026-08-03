/**
 * Comprueba los criterios de aceptación del relevo del video al abanico.
 *
 * Tres de esos criterios parecen exigir mirar la pantalla ("cuadro a cuadro
 * nada aparece de golpe", "la sombra cambia mientras la hoja se mueve",
 * "subiendo se deshace igual de limpio"). No es así: son propiedades de la
 * función de pintado, que es pura. Aquí se muestrea el recorrido entero y se
 * afirman.
 *
 *   node scripts/verificar-relevo.ts
 */

import {
  FIN_ABANICO,
  FIN_VIDEO,
  estadoEn,
  medirEscena,
  type Estado,
} from '../.claude/worktrees/codex-home-story-v1/src/app/(site)/home/resultsStageMotion.ts';

const PANTALLAS: [string, number, number][] = [
  ['escritorio 1440', 1435, 836],
  ['portátil 1280', 1275, 700],
  ['tableta 1024', 1019, 720],
  ['móvil 390', 385, 620],
];
const HOJAS = 7;
const PASOS = 2000; // ~0.05% de progreso por muestra

let fallos = 0;
const fallo = (m: string) => {
  console.log(`  ✗ ${m}`);
  fallos += 1;
};
const bien = (m: string) => console.log(`  ✓ ${m}`);

for (const [nombre, W, H] of PANTALLAS) {
  console.log(`\n${nombre}  (${W}×${H})`);
  const escena = medirEscena(W, H, HOJAS);

  const muestras: Estado[] = [];
  for (let k = 0; k <= PASOS; k += 1) muestras.push(estadoEn(k / PASOS, escena));

  // ── 1. Continuidad: nada aparece ni desaparece de golpe ──────────────────
  // Medir el desplazamiento por muestra sería medir mal: la velocidad de pico
  // de un resorte ES alta, y eso es justo lo que le da vida. Lo que delata un
  // salto es que la VELOCIDAD cambie de golpe (un pico de aceleración), o que
  // la hoja arranque o frene con velocidad distinta de cero.
  const vel = (k: number, i: number, eje: 'x' | 'y') =>
    muestras[k].tarjetas[i][eje] - muestras[k - 1].tarjetas[i][eje];

  let picoAcel = 0;
  let dondeAcel = 0;
  for (let k = 2; k < muestras.length; k += 1) {
    for (let i = 0; i < HOJAS; i += 1) {
      const d = Math.max(
        Math.abs(vel(k, i, 'x') - vel(k - 1, i, 'x')),
        Math.abs(vel(k, i, 'y') - vel(k - 1, i, 'y')),
      );
      if (d > picoAcel) {
        picoAcel = d;
        dondeAcel = k / PASOS;
      }
    }
  }
  if (picoAcel > 0.25)
    fallo(`pico de aceleración de ${picoAcel.toFixed(3)} px/muestra² en p=${dondeAcel.toFixed(3)}`);
  else bien(`sin picos de aceleración (máximo ${picoAcel.toFixed(3)} px/muestra²)`);

  // Arranque y frenada desde el reposo, hoja por hoja. El umbral va relativo a
  // la velocidad media de CADA hoja, no absoluto: la 0 recorre 48 px y la 6
  // recorre 626, así que un mismo px/muestra significa cosas distintas.
  // Con el resorte exponencial anterior esta razón salía en 6,2 (arrancaba a
  // seis veces su velocidad media, de ahí el tirón); con la respuesta
  // amortiguada baja a 0,3.
  let arranqueBrusco = 0;
  const razones: number[] = [];
  for (let i = 0; i < HOJAS; i += 1) {
    const { desde, hasta } = escena.ritmo[i];
    const aP = (av: number) => FIN_VIDEO + av * (FIN_ABANICO - FIN_VIDEO);
    const dp = 1 / PASOS;
    const velEn = (pp: number) => {
      const a = estadoEn(pp - dp, escena).tarjetas[i];
      const b = estadoEn(pp + dp, escena).tarjetas[i];
      return Math.hypot(b.x - a.x, b.y - a.y) / 2;
    };
    const viaje = Math.hypot(
      escena.final[i].x - escena.inicio[i].x,
      escena.final[i].y - escena.inicio[i].y,
    );
    const muestrasVentana = (hasta - desde) * (FIN_ABANICO - FIN_VIDEO) * PASOS;
    const media = viaje / muestrasVentana;
    const razon = Math.max(velEn(aP(desde) + dp * 2), velEn(aP(hasta) - dp * 2)) / media;
    razones.push(razon);
    if (razon > 0.5) arranqueBrusco += 1;
  }
  if (arranqueBrusco)
    fallo(`${arranqueBrusco} hojas arrancan o frenan con tirón (razón máx ${Math.max(...razones).toFixed(2)} de su velocidad media)`);
  else
    bien(`arrancan y frenan desde el reposo (razón máx ${Math.max(...razones).toFixed(2)} de su media)`);

  // ── 2. Ningún elemento cambia de opacidad sin moverse ────────────────────
  // La única opacidad animada es el pie. Cada vez que cambia, la hoja tiene
  // que estar desplazándose.
  let opacidadQuieta = 0;
  for (let k = 1; k < muestras.length; k += 1) {
    for (let i = 0; i < HOJAS; i += 1) {
      const a = muestras[k - 1].tarjetas[i];
      const b = muestras[k].tarjetas[i];
      const cambiaPie = Math.abs(b.pie - a.pie) > 1e-9;
      const seMueve = Math.abs(b.x - a.x) + Math.abs(b.y - a.y) + Math.abs(b.w - a.w) > 1e-6;
      if (cambiaPie && !seMueve) opacidadQuieta += 1;
    }
  }
  if (opacidadQuieta) fallo(`${opacidadQuieta} muestras con el pie cambiando sin que la hoja se mueva`);
  else bien('ninguna opacidad cambia con la hoja quieta');

  // ── 3. La sombra cambia mientras la hoja se mueve ────────────────────────
  let sombraFija = 0;
  for (let k = 1; k < muestras.length; k += 1) {
    for (let i = 0; i < HOJAS; i += 1) {
      const a = muestras[k - 1].tarjetas[i];
      const b = muestras[k].tarjetas[i];
      const seMueve = Math.abs(b.x - a.x) + Math.abs(b.y - a.y) > 0.02;
      const cambiaSombra = Math.abs(b.elevacion - a.elevacion) > 1e-9;
      if (seMueve && !cambiaSombra) sombraFija += 1;
    }
  }
  if (sombraFija) fallo(`${sombraFija} muestras con la hoja moviéndose y la sombra fija`);
  else bien('la sombra cambia siempre que la hoja se mueve');

  // ── 4. Subiendo se deshace igual de limpio que bajando ───────────────────
  // estadoEn es pura en p: el mismo progreso da el mismo estado venga de donde
  // venga. Se comprueba de verdad, no por confianza.
  let asimetria = 0;
  for (let k = PASOS; k >= 0; k -= 7) {
    const ida = muestras[k];
    const vuelta = estadoEn(k / PASOS, escena);
    for (let i = 0; i < HOJAS; i += 1) {
      asimetria = Math.max(
        asimetria,
        Math.abs(ida.tarjetas[i].x - vuelta.tarjetas[i].x),
        Math.abs(ida.tarjetas[i].y - vuelta.tarjetas[i].y),
      );
    }
  }
  if (asimetria > 1e-9) fallo(`la ida y la vuelta difieren en ${asimetria}`);
  else bien('ida y vuelta idénticas: el recorrido se deshace igual');

  // ── 5. Estado inicial y final coherentes ─────────────────────────────────
  const alPrincipio = muestras[0];
  const alFinal = muestras[PASOS];
  if (alPrincipio.panelX !== 0) fallo('el panel no arranca en su sitio');
  else bien('el panel arranca sin desplazar');

  if (alPrincipio.tarjetas.some((t) => t.elevacion !== 0))
    fallo('alguna hoja arranca ya elevada');
  else bien('todas las hojas arrancan planas sobre el documento');

  const fuera = alFinal.tarjetas.filter((t) => t.x < 0 || t.x + t.w > W || t.y + t.h > H);
  if (fuera.length) fallo(`${fuera.length} hojas terminan fuera del escenario`);
  else bien('el abanico final cabe entero en el escenario');

  const sinLlegar = alFinal.tarjetas.filter((t) => t.elevacion < 0.999);
  if (sinLlegar.length) fallo(`${sinLlegar.length} hojas no completan su recorrido`);
  else bien('todas las hojas completan su recorrido antes del final');

  // ── 6. Cada hoja con su propio ritmo ─────────────────────────────────────
  const duraciones = escena.ritmo.map((r) => +(r.hasta - r.desde).toFixed(4));
  const distintas = new Set(duraciones).size;
  if (distintas < 2) fallo('todas las hojas comparten duración: se leerá como bucle de CSS');
  else bien(`${distintas} duraciones distintas entre las ${HOJAS} hojas`);

  // ── 7. El video se congela, no se desvanece ──────────────────────────────
  const trasCongelar = estadoEn(FIN_VIDEO + 0.001, escena).tiempoVideo;
  const alCongelar = estadoEn(FIN_VIDEO, escena).tiempoVideo;
  if (alCongelar !== 1 || trasCongelar !== 1)
    fallo('el video no llega a su último cuadro justo al congelarse');
  else bien('el video llega al último cuadro y se queda ahí');
}

console.log(
  `\n${fallos === 0 ? 'TODO EN ORDEN' : `${fallos} FALLO(S)`}  ` +
    `· ${PANTALLAS.length} pantallas × ${PASOS} muestras del recorrido ` +
    `(fases: video 0→${FIN_VIDEO}, abanico →${FIN_ABANICO})`,
);
process.exit(fallos === 0 ? 0 : 1);
