# Tablero inteligente de clase

## Estado

Ruta: `/dashboard/admin/tablero`. Solo la pueden abrir cuentas administrativas verificadas. El centro operativo enlaza la herramienta.

El docente activa el micrófono, el navegador transcribe y la API `/api/admin/class-board` convierte fragmentos completos en un máximo de tres bloques editables: apunte, destacado, tabla o diagrama. Se pueden añadir y mover bloques a mano, escribir en ellos y dibujar trazos sobre el tablero. Al apagar el micrófono o salir de la pestaña, se aborta el reconocimiento y se descartan las respuestas pendientes de IA.

El tablero y la transcripción se guardan en `localStorage` por cuenta administrativa en ese navegador. **Exportar** crea un JSON que **Importar** puede volver a abrir, incluso en otro equipo. No hay sincronización entre equipos ni almacenamiento en Supabase. **Nuevo tablero** reemplaza el tablero local después de confirmación.

## Dependencias y límites

- La transcripción usa `SpeechRecognition` / `webkitSpeechRecognition`; su disponibilidad depende del navegador. En algunos navegadores el audio se procesa en un servicio de voz del propio navegador. Si no está disponible, el docente puede escribir ideas y generar bloques manualmente.
- La organización de apuntes usa `GROQ_API_KEY` en el servidor y el modelo de texto `openai/gpt-oss-120b`, ya usado por el proyecto. La API verifica de nuevo la cuenta administrativa, valida la entrada y limita las peticiones. Si falla, el fragmento queda como apunte sin procesar.
- La IA crea relaciones y secuencias como bloques editables. No genera ilustraciones libres; el dibujo libre corresponde al docente.
- La transcripción no distingue automáticamente la voz del docente de la de estudiantes u otros sonidos captados por el micrófono.

## Verificación

Se comprobaron el guardián de práctica, los tipos, el build de Next.js, la respuesta 403 de la API sin sesión y la redirección del tablero a login sin sesión. En Playwright se comprobó la edición, guardado tras recarga, dibujo/deshacer, exportación/importación y que una respuesta tardía no aparece tras apagar el micrófono. Una llamada breve al proveedor devolvió bloques JSON válidos.
