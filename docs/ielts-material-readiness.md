# IELTS: inventario y puertas de calidad

Fecha de revisión: 4 de septiembre de 2026. Base canónica: `96e817fcee534d70ef3039d8d2e68aa5b9a735d9`.
Estado de esta entrega: EN_VALIDACION. No equivale a aprobación académica de los 20 sets.
Rama: `codex/ielts-material-readiness-20260904`. Sin migraciones ni cambios de claves, bandas o resultados históricos.
Archivos compartidos reservados: `package.json` (comandos de auditoría/guardián) y cliente IELTS.
El registro de publicación debe incluir SHA de main, deployment READY y comprobación pública.

## Inventario verificado

| Sets | MP3 local/público | Textos Reading / imagen Writing 1 | Correspondencia del audio | Decisión académica |
|---|---|---|---|---|
| 1 | Sí / 200 | 3 / sí | Muestra inicial coherente; clave objetiva fijada por auditoría anterior | Primera prioridad de pulido; no certificación integral |
| 2–4 | Sí / 200 | 3 por set / sí | **Desajuste confirmado en la primera conversación** | No recomendar sus bandas como diagnóstico válido |
| 5–12 | Sí / 200 | 3 por set / sí | Fragmento 02:00–04:00 coherente con el guion | Candidatos siguientes, NO aprobados |
| 13–20 | No / 404 | 3 por set / sí | No evaluable sin audio | Incompletos |

Los 20 tienen 40 puntos Listening y 40 Reading, cuatro guiones de Listening y ambas tareas Writing.
Los 12 MP3 existentes se decodificaron completos sin error. Esto prueba integridad técnica, no correspondencia de todas las preguntas.
Las claves objetivas publicadas coinciden con las locales en los 20 sets: coincidencia no significa que sean correctas.
Solo Set 1 tiene una referencia independiente aprobada. Los otros 19 siguen `NOT_AUDITED`.

Conteo orientativo de Reading (separación por espacios; incluye títulos incrustados):

| Set | Palabras | Set | Palabras |
|---:|---:|---:|---:|
| 1 | 2618 | 11 | 1933 |
| 2 | 1551 | 12 | 1880 |
| 3 | 1406 | 13 | 1859 |
| 4 | 1613 | 14 | 1901 |
| 5 | 1933 | 15 | 1860 |
| 6 | 1842 | 16 | 1918 |
| 7 | 1724 | 17 | 1973 |
| 8 | 1667 | 18 | 2003 |
| 9 | 1688 | 19 | 1942 |
| 10 | 1611 | 20 | 1985 |

Solo Set 1 entra en el rango de 2150–2750 palabras del [formato Academic Reading](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading).
No basta con alargar textos: cambia la dificultad y obliga a revisar de nuevo sus preguntas y clave.

## Hallazgos con trazabilidad

- Set 2: audio de encuesta de transporte (Louisa Hardie); pantalla y guion de reserva de cancha (Daniel Harris).
- Set 3: audio de inscripción en guardería (Carol Smith / Kate); pantalla y guion de afiliación a biblioteca (Sophie Marsh).
- Set 4: audio de una llamada a un constructor (Edith Pargetter); pantalla y guion de alojamiento universitario (Greenfield University).
- Set 7, Reading 21: admite `formal`, `organised`, `structured`, pero ninguna aparece en el pasaje aunque exige palabras del texto.
- Set 7, Reading 23: admite `hara hachi bu` (tres palabras) pero la consigna limita a dos. Debe revisarse junto con todo el grupo, no cambiar una banda a ciegas.
- Set 1, Listening 40: la clave aprobada es `expansion`; el guion abreviado dice `expand`. Es una limitación del guion, NO evidencia para reemplazar la clave. Queda pendiente transcripción íntegra fiel al audio.
- El filtro léxico también señala Set 2 L6 y R30. L6 es un falso positivo por la expresión `two pounds fifty` frente a `2.50`; R30 requiere revisión contextual.
- La UI numeraba MCQ por posición en la sección, no por el número global. Se corrige usando el mismo número del identificador que emplea el contrato de calificación.

Las comprobaciones de audio usaron transcripción automática LOCAL de fragmentos, contrastada con guiones y preguntas. No se tomó ASR como clave oficial ni se aprobó todo un audio por una muestra. Las repeticiones de ASR durante pausas silenciosas se descartaron como artefactos de transcripción.

## Corrección visual Set 1

Se preservan las imágenes originales. Los campos 4–8 y 21–23 se anclan a las líneas numeradas en coordenadas de la imagen original, con ampliación y vista textual alternativa. Una sola instancia de cada campo; ambas vistas conservan la misma clave de respuesta persistida.

`npm run check:ielts-diagrams` valida los hashes/dimensiones de ambas imágenes, numeración exacta, límites, no solapamiento y aislamiento por URL. También comprueba los identificadores de numeración global de MCQ de los 20 sets. Está incluido en el guardián previo al build.

QA visual exigida: desktop y móvil, imagen completamente cargada, los ocho campos alineados, texto/diagrama/ampliación conservan respuestas, Escape cierra el diálogo, teclado y foco visibles. Nunca actualizar un hash esperado para silenciar una imagen no revisada.

## Blueprint por fases y guardianes

Cada set avanza por separado. Ningún contador de archivos aprueba contenido.

1. **Inventario**: congelar commit y hashes; audio decodificable y HTTP 200, tres pasajes, tareas e imágenes. Guardián: `npm run audit:ielts-materials -- --media=true --public=https://www.idiomaswl.com --output=/ruta/inventory.json`.
2. **Correspondencia completa**: escuchar las cuatro partes de principio a fin; guardar evidencia por Q1–40 (tiempo y frase audible). Corregir guion/audio/pregunta como conjunto. Si falta audio o no corresponde, detener aprobación.
3. **Reading y Writing**: evidencia de párrafo por respuesta; límite de palabras, singular/plural, distractores defendibles, TFNG vs ausencia de información; extensión adecuada. En Task 1 comprobar imagen, título, unidades, fechas, leyenda y consigna, no solo existencia del PNG.
4. **Revisión editorial y de sesgos**: registrar por pregunta si depende de conocimientos externos, estereotipos, ambigüedad cultural, datos falsos o formulaciones artificiales. Una búsqueda de palabras no certifica ausencia de sesgos. Verificar fuentes y derechos de uso del material; no presentar material propio como examen oficial.
5. **Clave independiente**: dos pasadas separadas contra evidencia, no contra la clave que se prueba; manifiesto aprobado con identidad y versión. Cubrir 1–40 exactamente, alternativas, grupos en cualquier orden y bandas diagnósticas. Seguir `docs/ielts-answer-key-validation-blueprint.md`; no convertir automáticamente los sets 2–20 en aprobados.
6. **Producto y reporte**: resolver un intento controlado con respuestas conocidas, vacío, parciales y variantes; comparar navegador, persistencia, dashboard y reporte respuesta a respuesta. Probar tabs antiguas y versión de contenido. No alterar intentos históricos sin autorización y trazabilidad.
7. **Release**: fetch/rebase main, catálogo, TypeScript, build, fixture independiente, pruebas visuales, commit de main, Vercel READY y verificación de la ruta pública. Una preview no cuenta como publicación.

Orden sugerido: cerrar Set 1, luego auditar 5, después 6–12 uno por uno; reconstruir 2–4 y completar 13–20 antes de usarlos como simulacros completos.
Pendiente de decisión: bloqueo temporal o advertencia para los 11 sets con audio ausente/desalineado. No se ha modificado el acceso a los sets en esta entrega.

## Límites de esta entrega

La fase de inventario queda documentada; la revisión académica exhaustiva de todos los sets NO se declara terminada. No se han certificado sesgos, dificultad, licencias ni todas las preguntas. No se han enviado informes de estudiantes ni correos.
