# PROMPT GOAL — La sección de resultados tiene que salir de la animación

> Para quien implemente: lee `docs/OPERACION-REPOSITORIO.md` y `AGENTS.md` antes de tocar nada.
> Trabajo en el worktree `.claude/worktrees/codex-home-story-v1`, servidor en `:3107`.

---

## 1. Qué está mal ahora

La sección `#resultados` de la home hace **dos cosas separadas y sin relación**:

1. Un clip que se scrubbea con el scroll y termina con unas hojas abiertas.
2. Debajo, una fila de tarjetas con los certificados reales que **aparece de la nada**.

El resultado se lee como "un video, y después una galería". No es lo que la sección promete.
Lo único que sí funciona hoy es el hover: la hoja se levanta y muestra el recuadro del
puntaje ampliado. **Eso se conserva tal cual.**

## 2. Qué tiene que pasar

Un solo gesto continuo, guiado por el scroll:

1. Llegas a la sección. Está el documento con las barras rojas y el hilo, quieto.
2. Sigues bajando: **ese mismo documento se convierte en un reporte real**. No aparece al
   lado ni debajo: ocupa el mismo rectángulo en pantalla, del mismo tamaño.
3. Sigues bajando: **detrás de él salen los demás reportes** y se abren en abanico.
4. El abanico se queda. Pasas el cursor por cualquiera y se amplía su recuadro de puntaje.

La prueba de que quedó bien: si grabas la pantalla y la pasas cuadro a cuadro, **no hay un
solo cuadro donde algo aparezca de golpe**. Todo lo que está en pantalla al final ya estaba
llegando desde el cuadro anterior.

## 3. La técnica

**Una sola escena fijada.** Toda la secuencia vive dentro de un contenedor `sticky` que se
queda pegado mientras la sección hace scroll. Nada aparece "después" del video: el video y
los certificados son **capas de la misma escena**.

Progreso `p` de 0 a 1 a lo largo de la sección fijada (≈250 vh de recorrido):

| `p` | Qué pasa |
|---|---|
| 0 → 0.45 | El clip se scrubbea. El documento está quieto, el hilo baja. |
| 0.45 → 0.55 | **El relevo.** El documento del video se funde con el primer certificado real, colocado en el mismo rectángulo. Nada se mueve durante el fundido. |
| 0.55 → 1.00 | Los demás certificados salen de detrás del primero y se abren en abanico hasta su posición final. |
| suelta el pin | El abanico queda estático e interactivo. Hover y foco amplían el puntaje. |

**Por qué el relevo es invisible:** porque ocurre sobre un elemento **quieto** y en un
rectángulo **idéntico**. Un fundido entre dos cosas que están en el mismo sitio y del mismo
tamaño no se percibe. El fallo actual es que el video termina en un estado visual y las
tarjetas arrancan en otro completamente distinto.

### El clip hay que recortarlo más corto

El clip actual (`evidence-to-results-scroll-v1`, 125 cuadros) ya muestra las hojas
abriéndose. Eso ahora sobra: **el abanico lo hace el DOM**, no el video.

Recórtalo para que **termine con el documento todavía solo**, antes de que asome la primera
hoja. En el original (`hf_20260730_210745_aec99d40-...mp4`, 24 fps) eso es alrededor del
**cuadro 56**. Verifícalo a ojo: el último cuadro no puede tener ninguna hoja asomando.

Codifica igual que los otros tres de la cadena, que ya están afinados para hacer seek:

```
-c:v libx264 -profile:v high -pix_fmt yuv420p -g 4 -keyint_min 4 -sc_threshold 0
-crf 21 -preset slow -movflags +faststart -an   → 560x752
```

Más el `.webm` (vp9, `-g 4 -crf 32`) y el póster sacado **del mp4 ya codificado**, nunca del
original.

### Dónde va el primer certificado

Medido sobre el clip actual a 560×752. El bloque de texto rojo del documento ocupa:

```
x  0.300 – 0.695   del ancho del cuadro
y  0.254 – 0.699   del alto del cuadro
```

El documento (la tarjeta completa, con sus márgenes) es algo mayor que ese bloque. Mídelo
tú sobre el último cuadro del clip ya recortado y ajusta: el primer certificado tiene que
caer **exactamente** ahí.

**Truco que evita una clase entera de bugs:** el video hoy usa `object-fit: contain`, así
que el cuadro no llena el escenario y los porcentajes no corresponden. Dale al escenario la
misma proporción del clip (`aspect-ratio: 560 / 752`) o calcula la caja contenida. Si no,
vas a estar peleando con un desfase que cambia con cada tamaño de ventana.

## 4. Reglas que no se negocian

Estas vienen del piso de calidad del proyecto y de que la página tiene que existir para
Google y para los crawlers de IA.

**Movimiento**

- **`window.addEventListener('scroll', ...)` está prohibido.** El componente actual
  `SearchScrollVideo.tsx` lo usa: hay que reemplazarlo por `useScroll` de Framer Motion
  (ya está en el proyecto), `IntersectionObserver`, o `animation-timeline` de CSS.
- Solo `transform` y `opacity` en el camino caliente. Nunca `top`, `left`, `width`, `height`.
- **Ningún valor por fotograma pasa por estado de React.** Re-renderiza el árbol entero en
  cada scroll y colapsa en móvil. `useMotionValue` / `useTransform`, o escritura directa al
  estilo dentro de un `requestAnimationFrame`.
- El scroll **hacia arriba** es camino de primera clase. Una costura que solo funciona
  bajando está rota.
- `prefers-reduced-motion`: cero descargas de video, el abanico se dibuja estático y la
  historia completa se puede leer.
- Nada de fundido de entrada en el elemento LCP.

**Contenido**

- Todo el texto se renderiza en el servidor, en flujo normal. El controlador de cliente solo
  posee el tiempo del medio y las transformaciones.
- El examen y el puntaje siguen yendo **como texto**, no solo dentro de la imagen. Verifícalo
  con `curl` y con JS desactivado: si no está en el HTML crudo, no existe.
- Los `alt` describen el documento; el recorte del puntaje va `alt=""` + `aria-hidden` porque
  duplica lo que ya dice el pie.

**Diseño**

- Un solo acento en la página, una sola escala de radios de esquina.
- Cero guiones largos en texto visible.
- El abanico no puede quedar como tres tarjetas iguales en fila: las hojas se solapan, con
  rotaciones distintas, como documentos dejados sobre una mesa.

**Privacidad**

- Las hojas del abanico salen a 280 px de ancho **a propósito**. A ese tamaño un nombre en
  cuerpo 8 mide dos píxeles y no hay reescalado que lo recupere. No las agrandes.
- Los bloques negros están quemados en el píxel por `scripts/certificados.py`. No son una
  capa de CSS y no se pueden quitar desde el navegador. Si regeneras imágenes, usa ese
  script y revisa cada pieza a ojo antes de publicar.

## 5. Criterios de aceptación

Se marca cada casilla o no está terminado.

- [ ] Bajando despacio, no hay ningún cuadro donde algo aparezca de golpe.
- [ ] El primer certificado ocupa el mismo rectángulo que el documento del video, con menos
      de 1% de desfase, a 1440 px, a 1024 px y a 390 px de ancho.
- [ ] Subiendo, la secuencia se deshace igual de limpia que bajando.
- [ ] Un flick rápido en móvil no congela el video ni acumula seeks pendientes.
- [ ] Con `prefers-reduced-motion` no se descarga ni un byte de video y la sección se
      entiende completa.
- [ ] `curl http://127.0.0.1:3107/home | grep "99 / 120"` devuelve resultado.
- [ ] No queda ningún `addEventListener('scroll')` en la home.
- [ ] Hover y foco por teclado amplían el puntaje; en táctil el puntaje se lee sin hover.
- [ ] Desmontar y volver a montar la sección no deja listeners, rAF vivos ni nodos huérfanos.
- [ ] Lighthouse móvil: LCP ≤2.5 s, CLS ≤0.1.

## 6. Lo que ya está hecho y no hay que rehacer

- `scripts/certificados.py` convierte los escaneos en piezas publicables. Ya calibrado y
  verificado para TOEFL 2015 e IELTS. Faltan las plantillas de Goethe y Celpe-Bras.
- 10 piezas listas en `public/images/resultados/{hoja,puntaje}/`.
- El contenido vive en `src/app/(site)/home/home-content.ts`: `CERTIFICATES` y `PROGRESSIONS`.
- Las dos progresiones (Germán 73→87→92 y Lina 5.0→6.0) ya están montadas debajo del
  abanico. Esa parte no la toques: el problema es solo el relevo del video al DOM.
- El hover ya funciona y gusta. Consérvalo.
