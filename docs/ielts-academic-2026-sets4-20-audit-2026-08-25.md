# IELTS Academic 2026 — auditoría de Sets 4–20

Fecha de contraste: 25 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen actual: **BLOCKED — no declarar los 17 sets como réplica completa todavía**

## Alcance responsable

El objetivo del producto es reproducir la estructura, las familias de tarea, los límites
de tiempo, la navegación y la dificultad observable de IELTS Academic con textos,
preguntas, visuales y audios 100 % originales de WeLearn. No se copian preguntas,
grabaciones ni gráficos oficiales. El producto debe presentarse como simulacro alineado,
no como examen oficial ni equivalencia psicométrica.

Fuentes oficiales revalidadas:

- [IELTS Academic: estructura y duración](https://ielts.org/take-a-test/test-types/ielts-academic-test)
- [IELTS Academic: preguntas de muestra y familias de tarea](https://www.ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test)
- [Listening: cuatro partes, 40 preguntas y una reproducción](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening)
- [Reading: tres secciones, 40 preguntas y 2.150–2.750 palabras](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- [Speaking: tres partes y 11–14 minutos](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking)
- [Actualización de entrega en computador desde mediados de 2026](https://ielts.org/news-and-insights/updates-to-ielts-test-delivery)

## Resultado cuantitativo

Los 17 sets sí contienen cuatro partes y 40 respuestas de Listening, tres pasajes y 40
respuestas de Reading, Writing Task 1 + Task 2 y Speaking Parts 1–3. No se encontraron
pasajes ni transcripciones duplicados de forma exacta entre los sets auditados.

| Set | Listening | Reading | Palabras Reading | MP3 integral | Claves en cliente |
|---:|---:|---:|---:|---|---:|
| 4 | 40 | 40 | 1.613 | OK | 0 |
| 5 | 40 | 40 | 1.933 | OK | 0 |
| 6 | 40 | 40 | 1.842 | OK | 0 |
| 7 | 40 | 40 | 1.724 | OK | 0 |
| 8 | 40 | 40 | 1.667 | OK | 0 |
| 9 | 40 | 40 | 1.688 | OK | 0 |
| 10 | 40 | 40 | 1.611 | OK | 0 |
| 11 | 40 | 40 | 1.933 | OK | 0 |
| 12 | 40 | 40 | 1.880 | OK | 0 |
| 13 | 40 | 40 | 1.859 | FALTA | 0 |
| 14 | 40 | 40 | 1.901 | FALTA | 0 |
| 15 | 40 | 40 | 1.860 | FALTA | 0 |
| 16 | 40 | 40 | 1.918 | FALTA | 0 |
| 17 | 40 | 40 | 1.973 | FALTA | 0 |
| 18 | 40 | 40 | 2.003 | FALTA | 0 |
| 19 | 40 | 40 | 1.942 | FALTA | 0 |
| 20 | 40 | 40 | 1.985 | FALTA | 0 |

El rango oficial de Reading es 2.150–2.750 palabras: los 17 sets están por debajo. Los
MP3 de Sets 13–20 están referenciados por el contenido, pero no existen en
`public/audio/ielts/`.

## Hallazgos editoriales

- Listening 4–20 sólo usa `formgroup`, `tablegroup`, `multiselect` y MCQ. No existe
  matching ni plan/map/diagram labelling en la colección.
- Las respuestas correctas de los 91 MCQ de Listening se distribuyen A/B/C/D como
  22/50/18/1; en 43/91 la correcta es la única opción más larga.
- Las respuestas correctas de los 89 MCQ de Reading se distribuyen A/B/C/D como
  6/57/26/0; en 35/89 la correcta es la única opción más larga.
- Sets 5–20 repiten una composición de tipos demasiado uniforme. Tener temas distintos
  no compensa una huella de formulario casi idéntica.
- Las claves objetivas vivían en el mismo objeto serializado al navegador. La proyección
  pública nueva deja cero claves; el servidor conserva el banco privado y recalcula el
  resultado recibido.

## Correcciones cerradas en esta rama

- Los huecos de note completion quedan en la misma línea que la frase cuando hay ancho;
  ya no se fuerza un bloque antes de cada respuesta.
- La numeración MCQ es global por skill: el primer MCQ de Listening Part 3 se presenta
  como 21, no vuelve a 1.
- Un multiselect de dos letras cuenta como dos respuestas en el progreso.
- Los Sets 4–20 tienen contrato explícito `ielts-academic-2026`, disclosure original de
  WeLearn y tiempos por etapa 30/60/60/14.
- Reading, Writing y Speaking quedan bloqueados hasta cerrar la etapa vigente; no hay
  regreso a una sección cerrada.
- Listening conserva reproducción única dentro del intento.
- Speaking ofrece preparación cronometrada de un minuto sólo en Part 2, hasta dos minutos
  de long turn y ventanas de hasta cinco minutos para Parts 1 y 3. Las notas sólo aparecen
  en Part 2.
- Los Sets 13–20 excluyen Listening de forma visible hasta liberar el MP3; ya no muestran
  un reproductor que falla silenciosamente.
- Las claves objetivas se eliminan en el límite Server Component → Client Component y el
  recibo conserva exclusivamente los resultados recalculados por el servidor.

## Gates pendientes para cerrar el dictamen

1. Expandir y revalidar cada pasaje de Reading hasta que cada set alcance 2.150–2.750
   palabras sin añadir relleno ni romper la evidencia de las 40 respuestas.
2. Rediseñar la composición de tareas entre sets e incorporar matching y
   plan/map/diagram labelling en Listening con activos propios.
3. Reequilibrar posiciones y longitudes de distractores; repetir revisión lingüística y
   factual pregunta por pregunta.
4. Generar los ocho MP3 integrales pendientes con reparto de voces/acento, pausas y
   normalización; después registrar tamaño, hash, duración, loudness y contraste
   transcript↔audio. La generación con proveedor de pago requiere aprobación separada.
5. Crear manifiesto de audio inmutable y convertir la auditoría en guardián de `prebuild`
   sólo cuando todos los bloqueos estén cerrados.
6. Repetir build completo, smoke de las 17 rutas, móvil 320/390, teclado, lector de
   pantalla y el recorrido de entrega privada con Writing y las tres muestras de Speaking.

## Evidencia reproducible

```bash
npm run audit:ielts-academic-2026  # hoy debe terminar BLOCKED y enumerar 30 bloqueos
npm run test:ielts-academic-2026   # contrato, claves privadas y audio bloqueado
npm run test:ielts-review          # scoring/review pipeline
npx tsc --noEmit
```

La salida `BLOCKED` es intencional: evita que una mejora visual sea confundida con la
liberación editorial y multimedia de los 17 exámenes.
