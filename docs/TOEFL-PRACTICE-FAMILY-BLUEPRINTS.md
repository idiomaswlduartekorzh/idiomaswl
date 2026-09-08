# Blueprints especializados de las familias TOEFL

**Estado:** contrato operativo v1

**Fecha:** 8 de septiembre de 2026

**Cobertura:** 12 de 12 familias públicas de TOEFL Practice 2026

**Contrato general:**
[EXAM-PRACTICE-EXPANSION-BLUEPRINT.md](./EXAM-PRACTICE-EXPANSION-BLUEPRINT.md)

**Plantilla visual:** [PRACTICE-UI-TEMPLATE.md](./PRACTICE-UI-TEMPLATE.md)

Este documento define el comportamiento que distingue a cada familia TOEFL. Sirve para
crear sets, trasladar una familia a otro examen o implementar una versión en otro idioma
sin rediseñar la interacción desde cero.

La fuente pública de nombres y rutas es
`src/data/practica/toefl-exercise-catalog.ts`. Este documento añade el contrato académico,
interactivo y de validación que el catálogo no necesita cargar en producción.

## 1. Reglas comunes a las 12 familias

Todas las rutas son práctica abierta y deben cumplir estas reglas:

- mostrar el catálogo antes de abrir una sesión cuando existan varios sets;
- usar `PracticeRouteShell`, `PracticeSetCatalog` y `PracticeSessionHeader`;
- permitir avanzar, retroceder, saltar y salir sin responder;
- conservar el intento local cuando el motor actual permita restaurarlo con seguridad;
- permitir reproducción, pausa y repetición ilimitadas de cualquier audio disponible;
- mantener habilitado el reproductor y usar un cursor que comunique interacción;
- mostrar un estado explícito cuando falte un audio, sin bloquear la navegación;
- distinguir resultado de práctica, autoevaluación y puntaje oficial;
- mantener claves y reglas privadas de scoring fuera del bundle del navegador;
- usar interfaz y contenido en inglés en las rutas TOEFL actuales;
- conservar IDs estables y versionar cualquier cambio académico.

Un simulacro puede imponer tiempo, orden o reproducción limitada únicamente en una ruta
y un modo identificados como `simulation`. Esas restricciones no se heredan al motor de
práctica.

## 2. Inventario vinculante

| `familyId` | Familia pública | Motor | Unidad actual | Audio |
|---|---|---|---|---|
| `reading-complete-words` | Complete the Words | `text-completion` | set | No aplica |
| `reading-daily-life` | Read in Daily Life | `reading-choice` | set | No aplica |
| `reading-academic-passage` | Read an Academic Passage | `reading-choice` | set | No aplica |
| `listening-choose-response` | Listen and Choose a Response | `listening-choice` | grupo | Ilimitado |
| `listening-conversation` | Listen to a Conversation | `listening-choice` | grupo | Ilimitado |
| `listening-announcement` | Listen to an Announcement | `listening-choice` | grupo | Ilimitado |
| `listening-academic-talk` | Listen to an Academic Talk | `listening-choice` | grupo | Ilimitado |
| `writing-build-sentence` | Build a Sentence | `sequence-builder` | set | No aplica |
| `writing-email` | Write an Email | `timed-writing` | set | No aplica |
| `writing-academic-discussion` | Write for an Academic Discussion | `timed-writing` | set | No aplica |
| `speaking-repeat` | Listen and Repeat | `speaking-recorder` | grupo | Ilimitado |
| `speaking-interview` | Take an Interview | `speaking-recorder` | grupo | Ilimitado |

## 3. Reading · Complete the Words

### Contrato de la familia

- **Objetivo:** reconstruir palabras parcialmente ocultas mediante gramática, vocabulario
  y contexto.
- **Estímulo:** un pasaje continuo con marcadores de hueco; cada hueco conserva el prefijo
  visible y declara cuántas letras faltan.
- **Respuesta:** texto corto por hueco, limitado a letras A–Z y a la longitud declarada.
- **Motor:** `text-completion`.
- **Navegación:** libre entre campos; se puede enviar con huecos vacíos.
- **Feedback:** resultado por hueco y total del set. Un campo vacío se informa como
  `unanswered`; una entrada inválida no se confunde con una respuesta incorrecta.
- **Persistencia:** intento, valores, último foco y resultado en el navegador.
- **Scoring:** automático en servidor, con clave privada y denominador estable.

### Invariantes de expansión

- El texto completo, los prefijos y las respuestas reconstruidas deben tener paridad.
- Cada `missingLength` coincide con la respuesta aprobada.
- Los huecos conservan IDs únicos y orden explícito.
- El input anuncia prefijo, número de hueco y cantidad de letras a tecnologías de apoyo.
- Deben probarse caracteres inválidos, huecos vacíos, recarga, reintento y fallo técnico.

## 4. Reading · Read in Daily Life

### Contrato de la familia

- **Objetivo:** comprender avisos, mensajes y textos informativos de situaciones cotidianas.
- **Estímulo:** uno o varios textos funcionales breves con título, género e instrucciones.
- **Respuesta:** selección única por pregunta.
- **Motor:** `reading-choice`.
- **Navegación:** libre entre textos y preguntas; el envío acepta respuestas en blanco.
- **Feedback:** correcto, incorrecto o sin respuesta por ítem, más un total del set.
- **Persistencia:** respuestas y resultado en el navegador.
- **Scoring:** automático en servidor.

### Invariantes de expansión

- El propósito comunicativo del texto debe ser reconocible sin conocimiento externo.
- Cada pregunta se responde con evidencia del estímulo.
- Los distractores deben ser plausibles, distintos y de longitud razonablemente balanceada.
- Deben revisarse propósito, detalle, inferencia, vocabulario y referencia según lo que el
  set declare, sin inventar una destreza ausente.
- Deben probarse selección por teclado, envío parcial, recarga y reintento.

## 5. Reading · Read an Academic Passage

### Contrato de la familia

- **Objetivo:** localizar ideas, relaciones, inferencias y vocabulario en prosa académica.
- **Estímulo:** pasaje académico con estructura suficiente para sostener todas las preguntas.
- **Respuesta:** selección única por pregunta.
- **Motor:** `reading-choice`.
- **Navegación:** libre; el pasaje permanece disponible mientras se responden los ítems.
- **Feedback:** por ítem y total de práctica, sin convertirlo en escala oficial TOEFL.
- **Persistencia:** respuestas y resultado en el navegador.
- **Scoring:** automático en servidor.

### Invariantes de expansión

- Toda clave debe tener evidencia inequívoca en el pasaje o en una inferencia necesaria.
- Los distractores no pueden depender de ambigüedades ajenas al constructo evaluado.
- Deben revisarse distribución de claves, sesgo de longitud y repetición de distractores.
- El pasaje debe conservar legibilidad, jerarquía semántica y acceso durante el feedback.
- Deben probarse sets largos en móvil, envío parcial, recarga y respuesta del servidor.

## 6. Listening · Listen and Choose a Response

### Contrato de la familia

- **Objetivo:** elegir la respuesta pragmáticamente adecuada para un intercambio breve.
- **Estímulo:** audio corto por ítem o bloque, con `mediaId`, URL, guion aprobado y estado.
- **Respuesta:** selección única entre respuestas posibles.
- **Motor:** `listening-choice`.
- **Navegación:** libre entre bloques; puede continuar sin reproducir ni responder.
- **Audio:** reproducible, pausable y repetible sin límite antes y después de responder.
- **Feedback:** por ítem y total; la clave permanece privada hasta cerrar el intento.
- **Persistencia:** respuestas y orden presentado; la reproducción no es requisito guardado.

### Invariantes de expansión

- Solo una opción debe completar naturalmente el acto comunicativo.
- El audio, el guion, la voz y el `mediaId` deben corresponder al mismo ítem.
- La ausencia de audio muestra un estado de medio faltante y conserva navegación y respuesta.
- Deben revisarse intención, registro, longitud de opciones, inteligibilidad y nivel de volumen.
- Deben probarse replay, pausa, cambio de bloque, respuesta en blanco y retorno al bloque.

## 7. Listening · Listen to a Conversation

### Contrato de la familia

- **Objetivo:** reconocer ideas, detalles, relación entre hablantes e intención en una
  conversación de contexto académico o de campus.
- **Estímulo:** audio conversacional con dos o más voces y un grupo de preguntas asociado.
- **Respuesta:** selección única por pregunta.
- **Motor:** `listening-choice`.
- **Navegación:** libre por bloques, con el audio disponible durante toda la práctica.
- **Audio:** repetición ilimitada y controles siempre habilitados cuando existe el archivo.
- **Feedback:** por ítem y total del grupo.
- **Persistencia:** respuestas y estado del intento en el navegador.

### Invariantes de expansión

- Las voces deben ser distinguibles y coherentes con el guion.
- Cada pregunta debe apuntar al bloque correcto y a información audible.
- Guion, archivo, duración y hash deben conservar paridad.
- Deben revisarse propósito, actitud, detalle e inferencia sin duplicar la misma pregunta.
- Deben probarse cambio de pregunta durante reproducción, replay y medio faltante.

## 8. Listening · Listen to an Announcement

### Contrato de la familia

- **Objetivo:** identificar propósito, información clave, condiciones y próximos pasos.
- **Estímulo:** anuncio breve con una sola situación comunicativa y preguntas asociadas.
- **Respuesta:** selección única por pregunta.
- **Motor:** `listening-choice`.
- **Navegación:** libre; escuchar y responder son acciones independientes.
- **Audio:** repetición ilimitada.
- **Feedback:** automático por ítem y total de práctica.
- **Persistencia:** respuestas locales y estado del intento.

### Invariantes de expansión

- Fechas, horas, lugares y acciones deben oírse con claridad y coincidir con el guion.
- Los distractores numéricos o temporales no deben depender de audio confuso.
- Deben revisarse propósito, detalle y acción esperada.
- La duración se toma del archivo final y nunca de una estimación editorial.
- Deben probarse pausa, replay, salto, envío parcial y ausencia de audio.

## 9. Listening · Listen to an Academic Talk

### Contrato de la familia

- **Objetivo:** seguir organización, ideas, ejemplos y relaciones en una exposición académica.
- **Estímulo:** audio monológico o de clase con estructura discursiva y preguntas asociadas.
- **Respuesta:** selección única por pregunta.
- **Motor:** `listening-choice`.
- **Navegación:** libre entre bloques y preguntas.
- **Audio:** repetición ilimitada con pausa y reinicio.
- **Feedback:** por ítem y total, descrito como práctica local.
- **Persistencia:** respuestas y orden de opciones presentadas.

### Invariantes de expansión

- La exposición debe contener señales de organización y ejemplos suficientes.
- Las claves se sostienen en el audio aprobado, no en conocimiento especializado externo.
- Deben revisarse idea principal, estructura, detalle, inferencia y función de ejemplos.
- Se controlan guion, archivo, duración, hash, inteligibilidad y consistencia de voz.
- Deben probarse audios largos, navegación durante reproducción y restauración del intento.

## 10. Writing · Build a Sentence

### Contrato de la familia

- **Objetivo:** construir una respuesta gramatical y semánticamente completa a partir de
  fragmentos.
- **Estímulo:** contexto o prompt, fragmentos utilizables, cantidad de espacios y, cuando
  corresponda, un fragmento distractor.
- **Respuesta:** secuencia ordenada de IDs de fragmento.
- **Motor:** `sequence-builder`.
- **Navegación:** libre entre ítems; se puede enviar un set incompleto.
- **Feedback:** correcto, incorrecto o sin responder por ítem y total del set.
- **Persistencia:** orden de fragmentos, foco y resultado en el navegador.
- **Scoring:** automático en servidor con secuencia aprobada privada.

### Invariantes de expansión

- La secuencia clave debe producir una oración inequívoca y natural.
- Ningún fragmento se pierde, duplica o cambia de ID al reordenar.
- Si existe fragmento sobrante, su descarte debe ser intencional y no ambiguo.
- La interacción debe ser completa por teclado además de puntero o toque.
- Deben probarse orden parcial, fragmentos repetidos, recarga, reintento y fallo de scoring.

## 11. Writing · Write an Email

### Contrato de la familia

- **Objetivo:** responder una situación mediante un correo claro, suficiente y adecuado al
  destinatario.
- **Estímulo:** situación, destinatario, propósito y puntos que la respuesta debe cubrir.
- **Respuesta:** texto largo editable.
- **Motor:** `timed-writing`.
- **Navegación:** puede abandonar o volver al catálogo sin entregar; no exige texto para salir.
- **Tiempo:** comienza por acción del estudiante, persiste al recargar y puede cerrar ese
  intento al llegar a cero; siempre permite iniciar otro intento.
- **Feedback:** lista de autoevaluación específica para propósito, cobertura, organización,
  tono y claridad. No produce puntaje oficial automático.
- **Persistencia:** borrador, plazo, estado y autoevaluación en el navegador.

### Invariantes de expansión

- La consigna identifica con claridad relación, necesidad y resultado esperado.
- Los puntos obligatorios pueden evaluarse sin imponer contenido personal sensible.
- El contador de palabras describe; no inventa un mínimo oficial cuando no existe.
- El cierre por tiempo y el envío manual conservan el borrador para revisión.
- Deben probarse recarga con reloj activo, expiración, borrador vacío y nuevo intento.

## 12. Writing · Write for an Academic Discussion

### Contrato de la familia

- **Objetivo:** formular y respaldar una posición pertinente dentro de una discusión académica.
- **Estímulo:** pregunta del profesor y aportes de participantes que delimitan el diálogo.
- **Respuesta:** texto largo editable que añade una contribución propia.
- **Motor:** `timed-writing`.
- **Navegación:** libre fuera del intento; el envío puede realizarse con cualquier longitud.
- **Tiempo:** persistente desde el inicio voluntario del intento.
- **Feedback:** autoevaluación de posición, desarrollo, relación con la discusión, cohesión y
  control lingüístico.
- **Persistencia:** borrador, tiempo y checks de autoevaluación en el navegador.

### Invariantes de expansión

- Los aportes previos presentan posiciones distinguibles sin resolver la consigna.
- La pregunta admite más de una posición defendible.
- El feedback no confunde longitud o presencia de palabras clave con calidad académica.
- La respuesta permanece visible al cerrar el intento.
- Deben probarse expiración, recarga, texto vacío, caracteres extensos y reintento.

## 13. Speaking · Listen and Repeat

### Contrato de la familia

- **Objetivo:** practicar precisión segmental, ritmo e entonación mediante repetición.
- **Estímulo:** audio de una oración, `mediaId`, frase objetivo y estado del medio.
- **Respuesta:** grabación local del estudiante.
- **Motor:** `speaking-recorder`.
- **Navegación:** rail libre entre ítems; puede avanzar sin escuchar ni grabar.
- **Audio:** reproducción, pausa y repetición ilimitadas.
- **Apoyo:** la transcripción puede mostrarse u ocultarse sin cambiar el intento.
- **Feedback:** reproducción y autoevaluación de la grabación; no asigna puntaje oficial.
- **Persistencia:** grabación dentro de la pestaña durante la sesión; no se envía al servidor.

### Invariantes de expansión

- Audio y frase objetivo deben coincidir exactamente.
- La transcripción oculta no impide accesibilidad ni control del audio.
- La grabación puede reemplazarse o eliminarse por decisión del estudiante.
- Si falta audio, se informa y la navegación sigue disponible.
- Deben probarse replay, micrófono permitido/denegado, regrabación, salto y retorno.

## 14. Speaking · Take an Interview

### Contrato de la familia

- **Objetivo:** producir respuestas espontáneas y comprensibles sobre experiencias u opiniones.
- **Estímulo:** pregunta del entrevistador en audio y texto, con contexto suficiente.
- **Respuesta:** grabación local del estudiante.
- **Motor:** `speaking-recorder`.
- **Navegación:** libre entre preguntas; escuchar y grabar son opcionales para continuar.
- **Audio:** repetición ilimitada.
- **Feedback:** escucha de la propia grabación y criterios de claridad, desarrollo y ritmo;
  no produce puntaje oficial.
- **Persistencia:** grabaciones de la sesión en la pestaña, sin entrega remota automática.

### Invariantes de expansión

- La pregunta debe permitir una respuesta personal sin exigir información sensible.
- Audio, texto y número de pregunta deben coincidir.
- El límite de grabación se declara y no se confunde con una calificación.
- Permisos o fallos de micrófono no pueden bloquear el resto de la práctica.
- Deben probarse replay, regrabación, navegación libre, prompt sin audio y permiso denegado.

## 15. Matriz de aceptación transversal

| Control | Reading | Listening | Writing | Speaking |
|---|---:|---:|---:|---:|
| Catálogo antes de la sesión | Sí | Sí | Sí | Sí |
| Navegación libre | Sí | Sí | Sí | Sí |
| Puede continuar sin responder | Sí | Sí | Sí | Sí |
| Persistencia explícita | Sí | Sí | Sí | Sí |
| Scoring comunicado con precisión | Sí | Sí | Sí | Sí |
| Claves privadas fuera del cliente | Sí | Sí | Si aplica | No aplica |
| Audio ilimitado | No aplica | Sí | No aplica | Sí |
| Estado de medio faltante | No aplica | Sí | No aplica | Sí |
| Teclado, foco y labels | Sí | Sí | Sí | Sí |
| Vista móvil sin desbordamiento | Sí | Sí | Sí | Sí |

## 16. Cómo reutilizar una familia

Para llevar una de estas familias a otro examen o idioma:

1. Copiar el bloque especializado de la familia elegida al checklist de expansión.
2. Conservar motor, forma de respuesta e invariantes cuando la interacción sea la misma.
3. Cambiar manifiesto, textos, locale, fuentes, medios y scoring mediante datos o adaptador.
4. Declarar cualquier diferencia de política antes de implementar contenido en volumen.
5. Producir tres sets verticales, validarlos y obtener aprobación académica.
6. Crear volumen adicional solo después de comprobar catálogo, sesión, móvil y accesibilidad.

Si cambia la entrada, la respuesta o el ciclo de estado, se trata como una familia nueva y
se escribe un blueprint especializado antes de crear su motor.

## 17. Criterio de cobertura

La cobertura está completa cuando cada `familyId` del catálogo público aparece exactamente
una vez en el inventario de este documento y tiene:

- objetivo y estímulo definidos;
- forma de respuesta y motor identificados;
- reglas de navegación, audio, feedback y persistencia;
- invariantes académicos, técnicos y de accesibilidad;
- casos de verificación para una expansión.

Con la versión actual, la cobertura es **12/12**.
