# TOEFL iBT 2026 — informe runtime T12 Complete the Words

Fecha de corte: **2026-08-14**
Objeto: **`object:t1-r-cw2-v3`**
Estado: **T12 completo; 68/68 controles cerrados; T13 habilitado**

## Resultado ejecutivo

La intuición original era correcta. El producto anterior no presentaba una interacción
Complete the Words alineada: la ruta pública era un banco de 16 opciones múltiples con
respuestas visibles y el Set 1 pedía seis huecos mientras comparaba contra palabras
completas. T12 ahora implementa una rebanada vertical de diez letras faltantes dentro de
un texto de 76 palabras, conserva la primera oración intacta y puntúa la unidad exacta que
el alumno escribe.

José David Duarte Silva firmó la declaración del owner, confirmó que WeLearn creó el
documento y posee sus derechos, y dispensó el requisito interno de una segunda revisión
TOEFL/editorial y de derechos. La búsqueda pública limitada no encontró el pasaje
completo ni los cuatro fragmentos exactos consultados; sí encontró redacción cercana
sobre hechos científicos comunes. No se afirma que exista una revisión independiente.
José David Duarte Silva completó la comprobación manual y declaró
**“VoiceOver aprobado”** el 14 de agosto de 2026.

## Lo implementado

- candidato v3 en el Set 1 y en la ruta pública;
- diez IDs estables, prefijos y longitudes sin claves en el payload inicial;
- corrección server-only y resultado local `x/10`, sin escala oficial;
- outcomes reconciliados: scored, mismatch, unanswered, invalid input, not presented,
  technical failure e invalidated;
- validación NFC, trim exterior, ASCII, longitud exacta y rechazo fail-closed;
- persistencia local de respuesta, sección, intento y foco; cierre idempotente y segundo
  intento sin sobrescribir el primero;
- los 16 MCQ anteriores se preservan en
  `/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto` con etiqueta honesta;
- metadata, FAQ, JSON-LD, título, descripción y copy visibles alineados;
- fuente v2 preservada server-only con su hash histórico;
- cero cambios de MP3, transcripciones, TTS, ElevenLabs, Whisper o pipeline de audio.

## Evidencia automática

| Control | Resultado |
|---|---|
| `npm run check:toefl-ctw` | PASS — identidad, hashes, límite de seguridad y superficies |
| `npm run test:toefl-ctw` | PASS — 7/7 tests de normalización, scoring, outcomes e idempotencia |
| ESLint dirigido | PASS — 0 errores, 0 warnings |
| `npx tsc --noEmit` | PASS |
| `npm run build` | PASS tras actualizar `main` — prebuild completo y 1.359/1.359 rutas |
| Chromium T12 | PASS tras actualizar `main` — 6/6 escenarios, 5,9 s |
| clave en `.next/static` | PASS — 0 chunks cliente; clave sólo en chunk server |

Chromium verificó los diez controles y su orden de teclado, atributos de ayuda del
navegador, ausencia de feedback previo, restauración tras recarga, foco, resultado 10/10,
fallo técnico sin castigo académico, viewport 320 px, zoom equivalente a 200 %, modo
oscuro, movimiento reducido, el banco de 16 ítems y la navegación del Set 1.

## Siete auditorías

1. **Full-stack/datos/repositorio — PASS.** La rama avanzó limpiamente al `main`
   canónico `6219b375`; datos, renderer, endpoint, scoring, persistencia, hashes,
   guardianes y build pasan.
2. **TOEFL — PASS técnico con dispensa del owner.** La mecánica satisface el contrato
   T12 revalidado. La segunda revisión interna fue dispensada; no se afirma independencia.
3. **Editorial/factual — PASS aceptado por el owner.** Texto y hechos mantienen la
   evidencia NASA/NOAA; el owner acepta el alcance editorial y el riesgo residual.
4. **Audio — DIFERIDA/no aplicable a CTW.** No se abrió, reprodujo, transcribió, generó o
   modificó audio de producto.
5. **Derechos/sesgo/leakage — PASS aceptado por el owner.** La clave no filtra al
   cliente; el owner declara creación y derechos WeLearn, acepta la búsqueda pública
   limitada y dispensa la segunda firma.
6. **UI/UX/accesibilidad — PASS automático, pendiente lector de pantalla humano.** Los
   controles de teclado, foco, reflow, zoom, preferencias y live regions pasan.
7. **Playwright — PASS.** Corrida posterior al fast-forward: 6/6 sin contaminación
   entre escenarios. El primer lanzamiento quedó bloqueado por el sandbox de macOS
   antes de abrir Chromium; la repetición autorizada pasó completa.

## Checklist manual de VoiceOver

Ruta: `/practica/toefl/reading/formato-2026/complete-the-words`.

1. Activar VoiceOver con `Command + F5` o `Fn + Command + F5`.
2. Recorrer con `Tab` los diez campos. El primero debe anunciar aproximadamente:
   “Passage 1, blank 1 of 10, prefix prov, enter 4 missing letters, edit text”.
3. Confirmar la secuencia de prefijo/longitud:
   `prov/4`, `li/3`, `he/2`, `ma/2`, `o/1`, `poss/4`, `ins/3`, `s/2`,
   `pro/4`, `nuc/4`.
4. Escribir `ides`, `ght`, `at`, `ke`, `n`, `ible`, `ide`, `un`, `cess`, `lear` y
   activar “Cerrar bloque y comprobar”.
5. Escuchar “Resultado de esta práctica” y `10/10`; el disclosure debe indicar que
   es una práctica WeLearn y no una puntuación oficial.
6. Empezar otro intento, escribir un dígito o una longitud incorrecta y comprobar que
   el error se anuncia sin borrar silenciosamente lo escrito.

Para cerrar el control basta registrar `VoiceOver aprobado`, navegador y fecha, o el
primer campo/anuncio que no coincida.

## Pendientes exactos

La sobrecapa de evidencia contiene 68/68 IDs de la matriz original: **68
verificados/aceptados y 0 bloqueantes**.

No quedan pendientes dentro del gate T12.

T12 pasa a `[x]` y T13 queda habilitado. Audio continúa al final, por decisión expresa
del owner.
