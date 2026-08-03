Relevo del video al abanico

Worktree `.claude/worktrees/codex-home-story-v1`, `:3107`. Sección `#resultados`.
Archivos: `ResultsStage.tsx`, `Home.module.css`, `scripts/certificados.py`.

## Problema 1: el salto se ve

El relevo funde el documento del video con el primer certificado en el mismo rectángulo.
No funciona: el documento es abstracto (crema, barras rojas) y un reporte TOEFL tiene
cabecera verde y formulario denso. **No se parecen.** Un fundido entre dos imágenes
distintas se percibe siempre, aunque coincidan sitio y tamaño.

**Arreglo: quitar el fundido.** El documento generado se queda siendo lo que es. Los
reportes reales **salen de detrás de él** y lo tapan al abrirse. Nunca una cosa se
convierte en otra: hay una que ya estaba y otras que salen de atrás. Es lo que el clip
ya insinúa cuando asoman los cantos de la pila.

Recorrido (progreso `p` de la sección fijada):

- `0 → 0.40` el clip se scrubbea hasta su último cuadro
- `0.40` el video se **congela**, no se desvanece; queda de fondo
- `0.40 → 0.85` los reportes salen de detrás, uno tras otro, y se abren
- `0.85 → 1.00` todo quieto, tramo para pasar el cursor

Nada puede desvanecerse sin moverse: es "aparecer de la nada" al revés.

## Problema 2: el pixelado NO es la resolución

A DPR 2 los tres clips que ya estaban se escalan **2.79×** y se ven bien; el nuevo se
escala **1.91×** y se ve mal. Cambia el tratamiento: los otros llevan `mask-image`,
opacidad 0.92–0.98 y `object-fit: contain`; el nuevo no lleva máscara, va a opacidad 1
y usa `cover`. Sin máscara se ve el rectángulo duro y el escalado salta en los bordes.
Y el contenido es lo peor para escalar: líneas de 1 px sobre fondo claro.

Arreglo, sin gastar generación:

- Recodificar desde el original (`hf_20260730_210745_...mp4`) a su tamaño nativo
  `834 × 1112`, no a 560: baja a 1.28×. Mismo scrub: `-g 4 -keyint_min 4
  -sc_threshold 0 -crf 21`. Póster del mp4 ya codificado.
- Copiar máscara, opacidad ~0.97 y `contain` de los otros tres clips.
- Si aún se nota, caja a ~556 px de alto: escalado 1.0.

Hojas: suben a 640 px (`ANCHO_ABANICO`) con `srcset`. Ojo, los 280 px eran una red de
seguridad: a ese tamaño un tachado corrido no era legible, a 640 sí. Hay que **revisar
las 7 a tamaño completo, una por una**. Son datos de personas reales.

## Barra de calidad

- Cada hoja con su propio retardo **y su propia duración**. Misma curva desplazada se
  lee como bucle de CSS.
- Curva de resorte, no `ease-in-out`. El papel tiene masa.
- **La sombra responde**: al levantarse, más grande, difusa y desplazada. Sombra fija
  mientras la hoja se mueve delata que es una caja con `transform`.
- Canto de papel: borde claro arriba e izquierda, oscuro abajo y derecha.
- Rotación desde una esquina inferior, no del centro (centro = cartas de videojuego).
- Nada viaja en línea recta: arco leve.
- El pie (examen + puntaje) aparece cuando la hoja ya está quieta.
- Solo `transform` y `opacity`. Nada de `addEventListener('scroll')`.

## No tocar

Rectángulo de aterrizaje ya verificado al píxel: primera hoja en `x 560, y 206,
305 × 413` sobre escenario `1435 × 836`. El hover. El texto en servidor y el camino de
`prefers-reduced-motion`.

## Aceptación

- [ ] Cuadro a cuadro, nada aparece ni desaparece de golpe
- [ ] Ninguna imagen escala más de 1.3× a DPR 2
- [ ] Las 7 hojas revisadas a tamaño completo con el tachado verificado
- [ ] Ningún elemento cambia de opacidad sin moverse
- [ ] La sombra cambia mientras la hoja se mueve
- [ ] Subiendo se deshace igual de limpio que bajando
- [ ] `curl :3107/home | grep "99 / 120"` devuelve resultado
- [ ] Con `prefers-reduced-motion` no se descarga video

## Cómo verificar

El panel de Claude Code no sirve para movimiento: pestaña oculta, cero `rAF`, cero
eventos de scroll, capturas negras. Eso se mira en un navegador real; desde ahí solo
geometría, resolución, HTML del servidor y tipos.
