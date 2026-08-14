# TOEFL iBT 2026 — informe runtime T16 Build a Sentence Set 1

Fecha de corte: **2026-08-14**
Objeto: **`object:toefl-build-sentence-set1-v2`**
Estado: **implementación completa; VoiceOver humano pendiente; T16 `[~]`**

## Resultado

La intuición original se confirma en Writing: el Set 1 tenía 6 Build a Sentence,
mientras la especificación TOEFL iBT 2026 fija 10. Además, los seis carecían del
intercambio contextual que define la tarea y uno ya estaba ordenado correctamente.

El piloto ahora presenta 10 intercambios originales. Cada uno contiene una frase
intacta, una respuesta con texto fijo, 3–4 posiciones, fragmentos desordenados y un
distractor. La clave exacta vive sólo en servidor. El resultado es práctica fija
WeLearn y no se presenta como score oficial ni como examen adaptativo.

Fuentes oficiales revalidadas:

- `https://www.ets.org/toefl/test-takers/ibt/about/content/writing.html`
- `https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf`
- `https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-lesson-plan-writing.pdf`

## Evidencia

| Control | Resultado |
|---|---|
| Checker T16 | PASS |
| Unit T16 | PASS 7/7 |
| Regresión T12 + T13 | PASS 14/14 unit |
| TypeScript | PASS |
| Build producción | PASS, guardianes + 1.361/1.361 páginas |
| Chromium T16 | PASS 4/4 |
| Chromium producción T12 + T13 + T16 | PASS 15/15 en 1,1 min |
| Audio | Cero cambios |
| VoiceOver T16 | Pendiente humano |

Chromium cubrió construcción completa 10/10, teclado, persistencia de orden y foco,
cierre único, resultado 10/10, fallo de endpoint sin penalidad, integración en el
simulacro y reflow a 320 px. Durante la prueba apareció un defecto real: el foco podía
quedar apuntando al botón del banco después de deshabilitarlo. Se corrigió moviendo el
foco al fragmento colocado y devolviéndolo al banco al retirar; la suite completa pasó
después del arreglo.

## Checklist corto de VoiceOver T16

1. Abrir `/practica/toefl/writing/build-a-sentence` y activar VoiceOver.
2. Llegar a “Item 1 of 10”. Debe oírse el contexto y la instrucción de añadir 4
   fragmentos, con uno sin usar.
3. Activar `is`. Debe anunciar que fue añadido a la posición 1 de 4 y el foco debe
   quedar en “Position 1 of 4: is. Remove fragment”.
4. Activarlo otra vez. Debe anunciar que se retiró y el foco debe volver al botón
   `is` del banco.
5. Formar el primero con `is` → `meeting us` → `outside` → `the library`, finalizar y
   comprobar que se anuncia “Correct order” y el resumen de resultado.

Para cerrar el gate basta registrar **“VoiceOver T16 aprobado”** o indicar el primer
anuncio/control que no coincida. T17 puede avanzar mientras tanto porque depende de
T10/T11, no de T16. Audio continúa diferido.
