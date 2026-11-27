# Estado del entrenador de ajedrez

Fecha: 25 de noviembre de 2026. Ruta: `/kids/ingles-ajedrez/practica`.

## Experiencia

- El menú, las pistas y las explicaciones aparecen en inglés, como la práctica
  de Matecraft que ya está en `main`. Ofrece mates, nueve familias de tácticas,
  aperturas y finales.
- Los ejercicios de mates, tácticas y finales conservan los datos locales de
  Lichess, validación con chess.js, dificultad por ELO y progreso en el navegador.
- Aperturas contiene siete líneas de la Italiana jugando con blancas y ocho de
  la Caro-Kann jugando con negras. Cada tarjeta relaciona una respuesta rival
  con la jugada recomendada. Los selectores de apertura y variante aparecen
  encima del tablero, también en móvil. El rival reproduce sus movimientos; el
  estudiante mueve sus piezas, recibe una explicación y puede reiniciar o
  cambiar de línea.
- El tablero admite arrastre, clic y un selector de jugadas legales para teclado
  o pantalla táctil. Si el almacenamiento local está bloqueado, la sesión sigue
  funcionando sin persistencia. Se conservan el resaltado de la pieza elegida,
  los indicadores distintos para avances y capturas y el respaldo visual de
  piezas si un navegador no carga el sprite.

## Alcance del repertorio

La Italiana cubre Giuoco Piano tranquilo y central, Dos Caballos tranquilo y
agresivo, Defensa Húngara, `3...d6` y una respuesta a la Petroff cuando la
Italiana ya no puede alcanzarse. La Caro-Kann cubre Avance, Clásica con `3.Nc3`
y `3.Nd2`, Cambio, Panov, Fantasía, Dos Caballos y el sistema con `2.d3`.
No se presenta como repertorio universal frente a todas las primeras jugadas.

## Fuente y verificación

- La página está en `public/kids/ingles-ajedrez/practica/index.html`; su lógica
  está en `app.js` y las líneas pedagógicas en `openings.js`.
- chess.js 1.4.0 (BSD-2-Clause) y cm-chessboard 8.15.8 (MIT) se sirven como
  archivos locales con sus licencias. El sprite usado conserva su atribución a
  Wikimedia Commons (CC BY-SA 3.0); se excluyó un sprite alternativo con
  restricción no comercial. El service worker usa una caché versionada.
- Next.js quedó fijado en 16.4.5, versión que permite completar el build sin
  el bloqueo de seguridad de 16.4.3. El catálogo protegido, TypeScript y la
  compilación completa pasaron tras la actualización.
- `tests/chess-opening-lines.test.mjs` valida legalidad, unicidad y turno final
  de las 15 líneas. `tests/e2e/chess-practice.spec.ts` recorre una línea completa
  de cada apertura, cambia a tácticas y comprueba el ancho móvil.
- Validación manual automatizada con Playwright: Chrome, Firefox y WebKit
  terminaron las dos líneas, resolvieron un mate, conservaron el progreso al
  recargar y no produjeron errores de página ni desbordamiento a 390 px. El
  arrastre de `e2` a `e4` también avanzó en los tres motores.
- La ruta real de Next.js adapta la altura del iframe al contenido para que
  las variantes finales sean accesibles con el desplazamiento normal de la
  página. Se comprobó en Chrome, Firefox y WebKit a 390 px. Para Firefox y
  WebKit locales se usó un proxy HTTPS de prueba porque la política CSP del
  sitio actualiza las solicitudes HTTP a HTTPS; producción ya usa HTTPS.
  El toque de dos casillas para mover una pieza pasó en Chrome y WebKit móvil.

La validación se hizo con el servidor de archivos estáticos y con la ruta real
de Next.js. El [PR #73](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/73)
se integró en `main@25873b981e5cdda924faac71ed3407ac7a4215ff` el 26 de
noviembre de 2026. Vercel publicó ese commit y la ruta pública respondió HTTP
200. Chrome, Firefox y WebKit completaron en producción una línea de cada
apertura y un mate, conservaron el progreso tras recargar y no mostraron
errores ni desbordamiento a 390 px. La evidencia de despliegue está en el plan
operativo.

## Revisión visual del 27 de noviembre de 2026

- La auditoría adicional encontró que, a 320 px, la tarjeta de mates invadía la
  de tácticas y el selector de jugadas quedaba demasiado estrecho. El menú ahora
  coloca icono y texto en dos filas y apila el selector y el botón en ese ancho.
- Dentro de la ruta de Next.js, el desplazamiento vertical queda en la página
  principal. Así el ancho del contenido no cambia al aparecer una barra de
  desplazamiento en el iframe, que hacía oscilar su altura en WebKit.
- La ruta integrada pasó el recorrido de mates y aperturas y la revisión de
  320, 390, 768 y 1440 px en Chrome, Firefox y WebKit: las cuatro tarjetas, los
  controles, el tablero y la variante Fantasía de la Caro-Kann permanecen
  accesibles, sin desbordamiento horizontal ni recorte vertical después de
  estabilizarse el contenido. La prueba E2E dirigida pasó con tres casos.
- El [PR #80](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/80) quedó
  en `main@61bdfcdde4c7d475209811c55abfa5d6db2b962a`. El despliegue de
  Vercel terminó en verde. En producción se repitieron las doce combinaciones
  de cuatro anchos y tres motores; a 320 px se comprobó además el primer
  movimiento de la Caro-Kann con toque en Android Chrome y WebKit móvil.
