# Revisión humana privada — Listening Parts 1–4

Paquete del 4 de septiembre de 2026, basado en el checkpoint `70648c0b`.
Estado de las cuatro revisiones: **PENDIENTE**. Este documento no concede aprobaciones,
no cambia manifests y no autoriza publicación. Está destinado al equipo revisor, no
a estudiantes; los enlaces a fuentes pueden mostrar claves y explicaciones privadas.

Audio acumulado: aproximadamente **15 minutos y 12 segundos**, sin contar repeticiones
ni revisión editorial. No es la duración de un simulacro IELTS completo: son cuatro
recursos guiados independientes, todavía no una prueba registrada de 40 preguntas.

## Material que debe revisarse

Los enlaces son locales y relativos a este documento; mantener la estructura del repositorio.
No subir la carpeta ni compartir estos recursos públicamente para realizar la revisión.

| Parte | Preguntas | Audio aproximado | Material |
|---|---|---|---|
| 1 | 1–10 | 2:14 | [Escuchar](../../public/audio/ielts/listening/welearn-listening-part-1-001.mp3) · [Guion, preguntas y claves](../../src/data/ielts/listening-part1-welearn-001.server.ts) · [Manifest](originality/welearn-listening-part-1-001.json) |
| 2 | 11–20 | 3:51 | [Escuchar](candidates/welearn-listening-part-2-001/welearn-listening-part-2-001.mp3) · [Guion, preguntas y claves](../../src/data/ielts/listening-part2-welearn-001.server.ts) · [Mapa SVG](candidates/welearn-listening-part-2-001/welearn-listening-part-2-001-map.svg) · [Manifest](originality/welearn-listening-part-2-001.json) |
| 3 | 21–30 | 4:53 | [Escuchar](candidates/welearn-listening-part-3-001/welearn-listening-part-3-001.mp3) · [Guion, preguntas y claves](../../src/data/ielts/listening-part3-welearn-001.server.ts) · [Manifest](originality/welearn-listening-part-3-001.json) |
| 4 | 31–40 | 4:13 | [Escuchar](candidates/welearn-listening-part-4-001/welearn-listening-part-4-001.mp3) · [Guion, preguntas y claves](../../src/data/ielts/listening-part4-welearn-001.server.ts) · [Manifest](originality/welearn-listening-part-4-001.json) |

Part 1 es un piloto cuyo MP3 está bajo `public/` en esta rama; eso **no acredita un
despliegue**. Parts 2–4 siguen fuera de rutas, registro, catálogo, sitemap y assets públicos.
Todos los audios son sintéticos; sus manifests documentan voces, licencia y atribución.

## Orden de trabajo

1. Confirmar parte, versión y huellas del bloque final. Si algo cambió, revisar de nuevo
   la versión exacta; no trasladar automáticamente una evaluación anterior.
2. Escuchar el audio completo a velocidad normal, primero sin apoyarse en el ASR.
   Anotar minuto/segundo de pausas extrañas, cortes, pronunciación dudosa o voces confusas.
3. Repetir con guion, preguntas y explicaciones. Resolver cada pregunta por lo que se
   oye, no por conocer la clave. Revisar límites de respuesta, distractores y ambigüedades.
4. Usar ASR sólo como diagnóstico secundario. Si discrepa, registrar lo que realmente
   se oye; ni la transcripción ni un test técnico pueden aprobar inteligibilidad humana.
5. Completar una ficha por parte. Una escucha parcial, un criterio sin evaluar o una
   duda sin resolver mantiene ese recurso pendiente o con correcciones requeridas.

## Checklist común, por cada parte

- [ ] Escuché el archivo completo identificado por su hash, a velocidad normal.
- [ ] Pronunciación y articulación permiten entender palabras, letras y números relevantes.
- [ ] Ritmo, pausas, volumen y transiciones son adecuados para esta práctica guiada.
- [ ] Las diez preguntas se pueden resolver con evidencia audible suficiente y en orden.
- [ ] Las claves y explicaciones concuerdan con el audio; los distractores son justos.
- [ ] Las instrucciones y límites de palabras/opciones son claros y consistentes.
- [ ] Registré con tiempo y criterio cualquier duda; no la di por cerrada por un ASR correcto.

Estas casillas empiezan vacías. Marcar una no escribe `approvedBy` ni `approvedAt` en el
sistema. La comprobación de accesibilidad del reproductor/formulario debe hacerse también
en la interfaz correspondiente; escuchar un MP3 no certifica la interfaz.

## Part 1 — conversación de reserva

Versión `2026-09-01.1`. Dos voces; formulario y tabla de comparación.

- Revisar diferenciación de anfitrión y cliente, deletreo del apellido y corrección de calle.
- Contrastar elección de fecha, duración frente a horarios, precio actual frente al anterior
  e inclusión del trayecto. Son puntos de escucha, no errores acústicos ya confirmados.
- Verificar que las pausas permiten seguir formulario y tabla sin fingir condiciones de
  un examen completo. El modo permite repetir el audio como práctica WeLearn.
- Bloqueo humano del piloto: pronunciación, ritmo e inteligibilidad del MP3 completo.
  Las etiquetas de piloto sólo se cambian junto con la aprobación revisada y sus pruebas.

No hay un ASR de Part 1 declarado en este manifest: no inventar esa evidencia ni usar
la de un set histórico como sustituto.

## Part 2 — orientación y mapa

Versión `2026-09-01.draft.2`. Una voz; opción única 11–15 y mapa 16–20.

- Escuchar con especial atención precio y orientaciones. El ASR nuevo deforma algunas
  palabras; eso exige verificación acústica, no permite afirmar que el audio está mal.
- Revisar las referencias a la esquina superior izquierda, sala acristalada, acceso,
  pasillos y salida. Cada indicación debe conducir a una única letra del mapa.
- Abrir el SVG renderizado: comprobar norte, contraste, etiquetas A–H, tamaño, descripción
  alternativa y que la posición de las salas coincide con lo oído.
- Separar revisión visual/semántica del SVG de navegación por teclado y lector de pantalla
  en la futura interfaz. Esa interfaz todavía no está registrada; su validación queda pendiente.
- Bloqueos humanos: escucha completa y revisión visual/accesible del mapa.

[ASR actual](candidates/welearn-listening-part-2-001/asr/welearn-listening-part-2-001.json)
y [reconciliación de cautelas](ASR-RECONCILIATION-2026-09-04.md). La evidencia automática
respalda diez claves, pero no reemplaza ninguna de las revisiones anteriores.

## Part 3 — conversación académica de tres voces

Versión `2026-09-01.draft.1`. Opción única 21–25 y asignación de tareas 26–30.

- Distinguir de oído tutor, Lara y Jonah, también durante cambios rápidos de turno.
- Revisar naturalidad del contexto musical, significado de categorías, contraste entre
  propuesta inicial y decisión final, y justicia de los distractores.
- Confirmar de oído las responsabilidades 26–30; no deducir una voz sólo por el guion.
- Repetir **274–287 segundos (4:34–4:47)**: en Q30 el ASR reconoce el nombre final de
  forma truncada. Hay apoyo contextual, no reconocimiento completo ni diarización.
- Bloqueos humanos: pronunciación, ritmo, inteligibilidad, diferenciación de las tres
  voces y revisión editorial de naturalidad musical/distractores.

[ASR actual](candidates/welearn-listening-part-3-001/asr/welearn-listening-part-3-001.json)
y [reconciliación](ASR-RECONCILIATION-2026-09-04.md). Nueve evidencias directas y una
contextual no equivalen a diez atribuciones de voz verificadas por una persona.

## Part 4 — monólogo académico

Versión `2026-09-01.draft.1`. Una voz; completar notas 31–40, una palabra por respuesta.

- Revisar pronunciación de vocabulario textil, transiciones y ritmo de toma de notas.
- Comprobar que cada hueco tiene una respuesta inequívoca audible, respeta el límite de
  una palabra y no exige conocimientos textiles previos para resolverlo.
- Un revisor competente debe contrastar la explicación de pilling y la comparación de
  muestras con las fuentes editoriales del manifest. No convertirla en un estándar oficial.
- Revisar de oído las frases sobre fibras, cantidad de pills, persistencia, iluminación
  y vida de la prenda señaladas como cautelas ASR; no asumir que son fallos del MP3.
- Bloqueos humanos: escucha completa y revisión de ciencia textil/justicia editorial.

[ASR actual](candidates/welearn-listening-part-4-001/asr/welearn-listening-part-4-001.json).
La presencia automática de diez palabras clave no aprueba la calidad de la explicación.

## Ficha de observaciones — copiar una por recurso

```text
Parte / practiceId:
Versión de contenido:
SHA-256 de audio y source revisados:
SHA-256 del mapa revisado, sólo Part 2:
Nombre del revisor y rol/competencia:
Fecha y hora de revisión:
Escucha completa a velocidad normal: pendiente
Revisión editorial: pendiente
Mapa / accesibilidad / diferenciación de voces, cuando aplique: pendiente

Tiempo (mm:ss) | Pregunta o criterio | Lo que oigo/observo | Cambio solicitado

Dictamen humano: PENDIENTE
Pendientes o límites de la revisión:
Firma o confirmación explícita de la persona revisora:
```

El revisor puede documentar `REQUIERE CORRECCIONES` o `CONFORME PARA EL ALCANCE REVISADO`
cuando haya completado su trabajo. Una conformidad acústica no aprueba automáticamente
la interfaz, el mapa, la ciencia textil, derechos, SEO ni despliegue. No firmar por otra
persona ni rellenar nombres/fechas/valoraciones desde un agente.

Si hace falta corregir contenido o audio: registrar el problema, producir otra versión,
regenerar sus evidencias cuando corresponda y volver a revisar los criterios afectados.
No editar directamente manifests para hacer desaparecer un bloqueo.

## Identidad de los archivos de este paquete

Las huellas se comprobaron contra los archivos de la USB al preparar el paquete.
Cualquier cambio en audio o source deja desactualizada la ficha correspondiente.

| Parte | SHA-256 audio | SHA-256 source |
|---|---|---|
| 1 | `1c31df90a3a64751bd7842c03f4e778584e8fdec1119f114ee6ef7308ba4cb8a` | `0de0eac62a96e847895ea649fbd2f464844ab88b47540ee3df805700b46ae7b8` |
| 2 | `6ed0f9f1038a2ab6cf4f257b587e4d1ac6afc9213c2625fe9a4fb71b879f60a7` | `dd4a7f8dcae8532d0437b35cdcb9df72c203d4eaed6355c8ef36df00394c0024` |
| 3 | `1e39cc939b1bf95ef08762a432f44c3e69682e78aea45d9dfbe4890afca5db27` | `e2a372faf633182b1a74a4c4829ce7dc74621e46ed131726072f309066b02506` |
| 4 | `9b0dda211c013968c9c3d858176f96dbbdbb49ec582279ea6a1566467ed5f96c` | `cd26fbca696a59446af740c8d053bddd08d2120be3ffdef40be23d98cdb7ad59` |

Mapa de Part 2, SHA-256:
`eb50548a5df2c48d018c719c72dbef797e2b77d35da89cac3e5a18d9a4a633b3`.
Cualquier cambio en ese SVG deja desactualizada la revisión del mapa, aunque el audio
mantenga la misma huella.

## Después de recibir la revisión

El equipo reconcilia las observaciones con las versiones exactas, resuelve correcciones
y prepara el cambio de aprobación que corresponda. Parts 2–4 aún requieren metadata
final, interfaces y registro; su incorporación pública debe ser atómica y pasar sus gates.
Parts 3 y 4 necesitan también proyección pública sin claves y renderers accesibles para
sus tipos de pregunta. Part 4 debe conservar una canonical única, sin crear una ruta
alias «Section 4» que compita con ella.
La promoción se coordina aparte desde `main` del repositorio canónico. Este paquete no
cambia el alcance autorizado: sin merge, PR ni despliegue durante la continuación privada.
