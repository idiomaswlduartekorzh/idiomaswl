# Nivel Radar — transporte de evaluación automática de escritura

Estado: **implementado, probado y desconectado**.

Este componente puede enviar una producción escrita a Gemini o Groq y convertir la respuesta
en evidencia MCER sellada por el servidor. No existe todavía una ruta, tarea o evento que lo
invoque en producción. Esa desconexión es deliberada: el consentimiento piloto vigente no
cubre procesamiento por un tercero y el intento aún no guarda una autorización externa.

## Qué reutiliza y qué no

Se reutilizan los patrones de transporte ya empleados por los motores de escritura de exámenes:

- REST directo, sin SDK adicional;
- temperatura cero y salida JSON estructurada;
- timeout, tratamiento de cuota y errores sin degradar a una puntuación inventada;
- Gemini y Groq como proveedores intercambiables.

No se reutilizan bandas, criterios ni prompts de IELTS, TOEFL o Cambridge. El payload usa la
rúbrica MCER WeLearn A1–C2 completa, cuatro criterios independientes, citas literales y una
confianza máxima provisional de 0,8. El modelo no decide el nivel global.

## Puertas obligatorias

El transporte hace cero solicitudes si falla cualquiera de estas condiciones:

1. `DIAGNOSTIC_WRITING_AUTOMATION_ENABLED=true`;
2. `DIAGNOSTIC_EXTERNAL_WRITING_PROCESSING_APPROVED=true`;
3. `DIAGNOSTIC_WRITING_PROVIDER_POLICY_APPROVED=true`;
4. proveedor, modelo fijado y API key presentes;
5. versión aprobada de política del proveedor;
6. versión de consentimiento externo distinta del consentimiento piloto general;
7. autorización positiva, fechada y versionada del intento, cargada por servidor.

La futura integración no puede aceptar la autorización desde el cuerpo del navegador. Debe
leerla de una columna inmutable asociada al intento. Hasta que exista esa persistencia, el
adaptador debe permanecer sin caller.

## Configuración compatible

Groq usa `response_format.type=json_schema` en modo estricto y queda limitado a modelos que la
documentación del proveedor declara compatibles. Gemini usa el contrato REST vigente
`generationConfig.responseFormat`. En ambos casos el servidor vuelve a validar cardinalidad,
criterios, niveles, confianza y citas exactas antes de persistir evidencia.

Referencias oficiales verificadas el 24 de septiembre de 2026:

- https://console.groq.com/docs/structured-outputs
- https://ai.google.dev/gemini-api/docs/generate-content/structured-output

## Activación futura

Antes de conectar el adaptador se requiere:

- aprobar proveedor, región, retención, uso para entrenamiento, subprocesadores y borrado;
- aprobar el texto de consentimiento y su versión;
- persistir consentimiento, fecha y versión de política en `diagnostic_attempts`;
- ofrecer una ruta humana funcional a quien no autorice el procesamiento externo;
- añadir una mutación servidor-servidor idempotente que cargue texto y autorización desde DB;
- probar 429, timeout, reintentos, doble ejecución y ausencia de texto en logs;
- ejecutar una muestra ancla doblemente calificada antes de usar el resultado automatizado.

La pantalla administrativa muestra únicamente el estado de configuración y nombres de
bloqueos; nunca expone credenciales ni habilita la llamada.
