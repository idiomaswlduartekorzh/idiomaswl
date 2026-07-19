# Medición del piloto de lectura

La instrumentación usa el `dataLayer` ya instalado en Idiomas WeLearn. No envía el texto escrito por el estudiante ni datos personales.

## Eventos implementados

| Evento | Cuándo ocurre | Uso principal |
| --- | --- | --- |
| `reading_view` | Una vez al cargar la lectura | Denominador de finalización |
| `reading_text_marked_read` | El estudiante marca el texto como leído | Progreso dentro de la tarea |
| `reading_gloss_open` | Abre una glosa, tanto en vocabulario como dentro del texto | Uso total y vocabulario consultado |
| `reading_question_answer` | Responde una pregunta | Exactitud por pregunta y habilidad |
| `reading_error` | La respuesta es incorrecta | Errores por pregunta y habilidad |
| `reading_complete` | Contesta todas las preguntas | Finalización, puntaje, errores y glosas por sesión |
| `reading_retry` | Reinicia el ejercicio | Reintentos |

Todos incluyen identificador anónimo de sesión, ejercicio, idioma, nivel, locale de tutor, estado editorial, indicador de preview y segundos transcurridos. `reading_complete` añade puntaje, porcentaje, número de errores, número de preguntas, aperturas de glosa, glosas únicas y si el texto fue marcado como leído.

## Métricas de decisión

- **Tasa de finalización:** sesiones únicas con `reading_complete` / sesiones únicas con `reading_view`.
- **Tasa de error por pregunta:** `reading_error` / `reading_question_answer`, segmentado por `reading_question_id`.
- **Uso de glosas:** sesiones con al menos un `reading_gloss_open` / sesiones con `reading_view`.
- **Intensidad de glosas:** promedio de `reading_gloss_open_count` en `reading_complete`.
- **Cobertura de glosas:** promedio de `reading_unique_gloss_count` en `reading_complete`.
- **Tiempo de finalización:** mediana de `reading_elapsed_seconds` en `reading_complete`.

## Configuración necesaria en GTM/GA4 antes de publicar

Crear activadores de evento personalizado para los siete nombres anteriores y un tag GA4 por evento, o un único tag parametrizado. Registrar como dimensiones personalizadas al menos `reading_exercise_id`, `reading_language`, `reading_level`, `reading_question_id`, `reading_skill` y `reading_is_preview`; registrar como métricas `reading_score_percent`, `reading_error_count`, `reading_gloss_open_count`, `reading_unique_gloss_count` y `reading_elapsed_seconds`.

Para datos de estudiantes reales, filtrar `reading_is_preview = false`. Las pruebas editoriales quedan identificadas y no contaminan el informe de publicación.

## Lectura de resultados del primer piloto

No tomar decisiones con menos de 30 sesiones completas. Como señal inicial, investigar si la finalización es menor a 55 %, si una pregunta supera 40 % de error o si una glosa es abierta por más de 60 % de las sesiones: puede indicar fricción, ambigüedad o vocabulario fuera de nivel. Estos umbrales son hipótesis de producto, no estándares pedagógicos.
