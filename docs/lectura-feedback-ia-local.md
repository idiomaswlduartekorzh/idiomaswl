# Prueba local: feedback IA para una lectura de alemán A1

Estado: solo rama `codex/aleman-a1-ai-feedback`. No se ha integrado ni desplegado.

El botón aparece únicamente en `/practica/aleman/a1/lectura/der-weg-zur-arbeit`
cuando se inicia el servidor en modo desarrollo con
`OPENAI_READING_FEEDBACK_ENABLED=1`. Se activa después de escribir 5–7 frases,
25–60 palabras y como máximo 700 caracteres. Solo el clic envía el texto a
OpenAI. El servidor añade la consigna, los objetivos, el foco gramatical y el
texto de lectura desde el catálogo versionado; el navegador no puede sustituir
ese contexto. La grabadora sigue guardando audio en IndexedDB local.

## Probar

La clave `OPENAI_API_KEY` está en el archivo `.env.local` ignorado por Git del
checkout principal. El worktree enlaza ese archivo sin copiar su contenido.
La clave creada para esta prueba vence 24 horas después de su creación el
31 de octubre de 2026; si ya venció, habrá que configurarla de nuevo con el
flujo seguro.

```bash
cd /Users/josedavidduartesilva/Developer/idiomaswl/.worktrees/aleman-a1-ai-feedback
OPENAI_READING_FEEDBACK_ENABLED=1 npm run dev:audit -- --hostname 127.0.0.1 --port 3123
```

Abrir `http://127.0.0.1:3123/practica/aleman/a1/lectura/der-weg-zur-arbeit`.
Avanzar hasta «Producir», escribir las frases y pulsar el botón si se desea
enviar el texto. Para repetir las pruebas simuladas sin gasto:

```bash
node --test tests/reading-ai-feedback.test.mjs
```

## Límites de esta prueba

- Endpoint solo en desarrollo; apagado por defecto.
- Máximo de 1.500 bytes por solicitud, 700 caracteres de texto y 480 tokens de
  salida del modelo. La respuesta se valida antes de mostrarse.
- Tres solicitudes por IP y hora y 20 por proceso y día. Son contadores en
  memoria para la prueba local; reiniciar el proceso los reinicia.
- Las fallas de red, cuotas o formato conservan el texto y muestran un mensaje
  sin detalles de la API. No se registra el texto ni la clave.
- La respuesta es orientación automática A1, no una calificación oficial.

La llamada de comprobación, anterior a la adición del contexto editorial,
usó 295 tokens de entrada y 85 de salida. A la
[tarifa estándar publicada para GPT-6 Luna](https://developers.openai.com/api/docs/models/gpt-6-luna)
el 31 de octubre de 2026 (USD 0,10 y USD 0,50 por millón, respectivamente),
eso equivale aproximadamente a USD 0,000072 por corrección. Un texto distinto
puede consumir más o menos tokens.

## Extensión propuesta; no implementada

Este endpoint sigue limitado a una lectura. Para corregir otras tareas, un
registro de consignas del lado del servidor debe resolver el identificador
de ejercicio a idioma, nivel, objetivo, rúbrica, límites y tipo de respuesta.
El cliente solo debe enviar el identificador y la respuesta del estudiante.
La elegibilidad y cuota deben verificarse contra el plan del usuario en el
servidor, separando comentarios automáticos de revisiones docentes.

Para speaking, un flujo optativo distinto puede enviar una grabación terminada
para transcribirla, mostrar la transcripción y comentar contenido, gramática y
cumplimiento de la consigna. Una transcripción no basta para juzgar
pronunciación, entonación o fluidez: eso requiere evaluación del audio y
validación pedagógica separadas. La grabadora de esta lectura continúa local.
Ningún audio se envía con el botón de revisión de texto.

Antes de cualquier publicación, acordar el presupuesto máximo y reemplazar la
cuota en memoria por una cuota duradera ligada a una identidad fiable. También
revisar ejemplos de corrección con un docente, la información de privacidad y
el consentimiento. Cambiar el bloqueo de desarrollo solo después de esa decisión.
