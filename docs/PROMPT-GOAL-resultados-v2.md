# PROMPT GOAL v2 — Arreglar el salto y el pixelado del relevo

> Continúa `docs/PROMPT-GOAL-resultados-continuo.md`. Lo de allí sigue vigente salvo
> lo que este documento corrige explícitamente.
> Worktree `.claude/worktrees/codex-home-story-v1`, servidor en `:3107`.

---

## 1. El pixelado: NO es la resolución

Medición sobre la página, a DPR 2:

| Clip | Escalado real | `mask-image` | Opacidad | `object-fit` |
|---|---|---|---|---|
| search-to-goal | **2.79×** | sí | 0.92 | contain |
| goal-to-method | **2.79×** | sí | 0.97 | contain |
| method-to-evidence | **2.79×** | sí | 0.98 | contain |
| evidence-to-results (el nuevo) | **1.91×** | **no** | **1** | **cover** |

Los tres clips que ya estaban **se escalan más** que el nuevo y se ven bien. Así que
subir la resolución no arregla nada: el problema es cómo se presenta.

Tres diferencias, y las tres importan:

1. **Sin máscara.** Los otros tres llevan un `mask-image` de degradados que difumina los
   cuatro bordes contra el fondo. El nuevo no lleva ninguna, así que se ve el rectángulo
   duro del video y el escalado queda a la vista en cada borde.
2. **Opacidad 1.** Los otros van entre 0.92 y 0.98, apenas fundidos con el fondo. Ese
   punto de mezcla perdona muchísimo.
3. **`cover` en vez de `contain`.** `cover` recorta y amplía todavía más el detalle.

Y hay una cuarta, que es la de fondo: **el contenido**. Los otros tres son escenas
oscuras, suaves y abstractas. El nuevo es un documento con líneas finas y texto, sobre
fondo claro. Es el peor contenido posible para escalar: en una escena suave el escalado
no se ve, en una línea de 1 px se ve siempre.

### Cómo se arregla, sin gastar una generación

- **Recodificar desde el original a `834 × 1112`** (su tamaño nativo). Es gratis, el
  archivo ya está, y baja el escalado de 1.91× a 1.28×. Mismos parámetros de scrub.
- **Copiar el tratamiento de los otros tres:** `mask-image` con degradados en los cuatro
  bordes, opacidad ~0.97, y `object-fit: contain`.
- Si aun así se nota, achicar la caja: a `556 px` de alto en CSS el escalado queda en 1.0.

Regenerar en 4K **no hace falta** y no era el diagnóstico correcto.

**Hojas:**

- La hoja sí está escalada 2.18× (fuente `280 × 358`, se muestra a `610 × 826` físicos) y
  aquí sí conviene subir a **640 px de ancho** en `scripts/certificados.py`.
- **Esto elimina una red de seguridad y hay que reponerla.** Los 280 px estaban puestos a
  propósito: a ese tamaño, aunque un bloque de tachado quedara corrido unos píxeles, no
  había nada legible. A 640 px eso deja de ser cierto.
  Por lo tanto: **revisar las 7 hojas a tamaño completo, una por una**, antes de publicar.
  No es opcional y no se puede automatizar. Son datos de personas reales.
- Servir con `srcset` para no mandar 640 px a un móvil que muestra 150.

## 2. El salto: cuál fue el error de fondo

La versión anterior asumió que **igualar el rectángulo bastaba** para que el relevo fuera
invisible. No basta.

El documento del video es abstracto: papel crema, barras rojas, sin contenido. Un reporte
TOEFL real tiene cabecera verde, un formulario denso y una tabla de puntajes. **No se
parecen en nada.** Un fundido entre dos imágenes que se ven distintas se percibe como un
cambio aunque estén en el mismo sitio y midan lo mismo. Siempre. No hay curva de
animación que lo arregle.

### La solución es quitar el fundido, no afinarlo

**El documento generado se queda siendo lo que es.** Los reportes reales **salen de detrás
de él** y lo van tapando a medida que se abren en abanico.

Así nunca hay un instante en que una cosa se convierta en otra. Hay una cosa que ya estaba,
y otras que salen de atrás. Eso es un hecho físico y no necesita ocultar nada: es
exactamente lo que el clip ya insinúa cuando aparecen los cantos de la pila.

Reparto nuevo del recorrido:

| `p` | Qué pasa |
|---|---|
| 0 → 0.40 | El clip se scrubbea hasta su último cuadro: documento quieto, cantos de la pila asomando. |
| 0.40 | El video se congela en su último cuadro. **No se desvanece.** Queda como imagen de fondo. |
| 0.40 → 0.85 | Los reportes reales salen de detrás del documento, uno tras otro, y se abren en abanico. Al abrirse tapan el documento generado. |
| 0.85 → 1.00 | Todo quieto. Tramo para pasar el cursor sin que nada se mueva. |

El documento generado puede irse al final con un movimiento propio (retroceder y bajar,
quedando como la última hoja del abanico) o simplemente quedar tapado. Lo que **no** puede
hacer es desvanecerse: un elemento que se desvanece sin motivo es exactamente el "aparecer
de la nada" al revés.

## 3. La barra de calidad

"Que se abran" no es una especificación. Esto sí:

- **Escalonado con criterio.** Cada hoja arranca con su propio retardo *y su propia
  duración*. Si todas usan la misma curva desplazada en el tiempo, se lee como un bucle
  de CSS, no como papel.
- **Curva de resorte, no `ease-in-out`.** El papel tiene masa: acelera rápido y frena
  largo, con un pelo de rebase al llegar. Nada de easing lineal ni del cúbico por defecto.
- **La sombra responde.** Una hoja que se levanta y se separa proyecta una sombra más
  grande, más difusa y más desplazada. Una sombra fija mientras la hoja se mueve es el
  tell número uno de que esto es una caja con `transform`.
- **Las hojas tienen canto.** Un borde claro de 1 px arriba y a la izquierda, más oscuro
  abajo y a la derecha. Sin eso son rectángulos, no papel.
- **Origen de rotación creíble.** Las hojas giran desde una esquina inferior, no desde su
  centro geométrico. El centro es lo que hace que se vea a "cartas de videojuego".
- **Nada viaja en línea recta.** Un arco leve entre el punto de salida y el de llegada.
- **El pie llega después.** El examen y el puntaje no aparecen hasta que la hoja está
  quieta en su sitio. Si el texto viaja con la hoja, se lee como una diapositiva.
- **Solo `transform` y `opacity`.** Sigue en pie.

## 4. Lo que ya funciona y no se toca

- El rectángulo de aterrizaje está medido y verificado al píxel: la primera hoja arranca
  en `x 560, y 206, 305 × 413` sobre un escenario de `1435 × 836`, que coincide
  exactamente con el documento del video. Esos números siguen valiendo; lo que cambia es
  que ahora las hojas **salen de detrás**, no se funden con él.
- El hover: la hoja se levanta y muestra el recuadro del puntaje ampliado. Al usuario le
  gusta. No se toca.
- El texto renderizado en servidor, los `alt`, y el camino de `prefers-reduced-motion`.

## 5. Criterios de aceptación

- [ ] El video lleva el mismo tratamiento de máscara, opacidad y `object-fit` que los
      otros tres clips de la cadena, y está recodificado a `834 × 1112`.
- [ ] Ninguna imagen de la escena se escala por encima de 1.3× a DPR 2. Se comprueba:
      `naturalWidth` contra `getBoundingClientRect().width * devicePixelRatio`.
- [ ] Las 7 hojas revisadas a tamaño completo, una por una, con el tachado verificado.
- [ ] En ningún punto del recorrido un elemento cambia de opacidad sin estar además
      moviéndose. Nada se desvanece "porque sí".
- [ ] Grabando la pantalla y pasándola cuadro a cuadro, no hay un solo cuadro donde algo
      aparezca o desaparezca de golpe.
- [ ] La sombra de cada hoja cambia mientras la hoja se mueve.
- [ ] Subiendo, la secuencia se deshace igual de limpia que bajando.
- [ ] `curl http://127.0.0.1:3107/home | grep "99 / 120"` sigue devolviendo resultado.
- [ ] Con `prefers-reduced-motion` no se descarga video y la sección se entiende completa.

## 6. Nota sobre cómo verificar

El panel de navegador del entorno de Claude Code **no sirve** para esto: es una pestaña
oculta (`document.visibilityState === 'hidden'`), no ejecuta `requestAnimationFrame` ni
recibe eventos de scroll, y las capturas salen en negro. Todo lo que sea movimiento hay que
mirarlo en un navegador real. Lo que sí se puede verificar desde ahí es geometría,
resolución, HTML del servidor y tipos.
