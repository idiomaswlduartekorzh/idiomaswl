# IELTS Academic 2026 — auditoría de Sets 4–20

Fecha de contraste: 25 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen actual: **BLOCKED sólo por audio — Sets 13–20 no se liberan todavía**

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
| 4 | 40 | 40 | 2.184 | OK | 0 |
| 5 | 40 | 40 | 2.180 | OK | 0 |
| 6 | 40 | 40 | 2.225 | OK | 0 |
| 7 | 40 | 40 | 2.225 | OK | 0 |
| 8 | 40 | 40 | 2.165 | OK | 0 |
| 9 | 40 | 40 | 2.187 | OK | 0 |
| 10 | 40 | 40 | 2.171 | OK | 0 |
| 11 | 40 | 40 | 2.151 | OK | 0 |
| 12 | 40 | 40 | 2.150 | OK | 0 |
| 13 | 40 | 40 | 2.155 | FALTA | 0 |
| 14 | 40 | 40 | 2.179 | FALTA | 0 |
| 15 | 40 | 40 | 2.150 | FALTA | 0 |
| 16 | 40 | 40 | 2.154 | FALTA | 0 |
| 17 | 40 | 40 | 2.151 | FALTA | 0 |
| 18 | 40 | 40 | 2.172 | FALTA | 0 |
| 19 | 40 | 40 | 2.151 | FALTA | 0 |
| 20 | 40 | 40 | 2.192 | FALTA | 0 |

Los 17 Readings ya quedan dentro del rango oficial de 2.150–2.750 palabras. Los MP3 de
Sets 13–20 todavía no existen en `public/audio/ielts/`; por eso esas cuatro partes de
Listening permanecen bloqueadas de forma explícita.

## Hallazgos editoriales

- La colección original no tenía matching ni plan/map/diagram labelling en Listening;
  la rama incorpora matching en Set 14 y un plano SVG original en Set 7 sin cambiar los
  guiones de los MP3 existentes.
- Tras la revisión, los MCQ de Listening se distribuyen A/B/C/D como 28/28/28/2 (sólo
  los ítems de cuatro opciones pueden usar D); 30/86 conservan la correcta como única
  opción más larga, por debajo del gate máximo de 35 %.
- Los 89 MCQ de Reading se distribuyen A/B/C/D como 23/22/24/20; 31/89 conservan la
  correcta como única opción más larga, también por debajo del 35 %.
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
- Los 17 Readings se ampliaron con 5.600+ palabras originales de WeLearn y ahora suman
  entre 2.150 y 2.225 palabras por set, sin cambiar ninguna frase portadora de respuesta.
- Set 7 incorpora plan labelling con un plano propio del museo y Set 14 incorpora una
  tarea matching basada en detalles ya presentes en su grabación.
- Las posiciones correctas se equilibran de forma determinista antes de cruzar al
  cliente y el servidor puntúa exactamente el mismo orden privado.
- Catorce distractores se revisaron editorialmente para retirar la pista de longitud sin
  debilitar su plausibilidad.

## Gates pendientes para cerrar el dictamen

1. Generar los ocho MP3 integrales pendientes con reparto de voces/acento, pausas y
   normalización; después registrar tamaño, hash, duración, loudness y contraste
   transcript↔audio. La generación con proveedor de pago requiere aprobación separada.
2. Crear manifiesto de audio inmutable y convertir la auditoría en guardián de `prebuild`
   sólo cuando todos los bloqueos estén cerrados.
3. Repetir build completo, smoke de las 17 rutas, móvil 320/390, teclado, lector de
   pantalla y el recorrido de entrega privada con Writing y las tres muestras de Speaking.

## Evidencia reproducible

```bash
npm run audit:ielts-academic-2026  # hoy debe terminar BLOCKED y enumerar sólo 8 audios
npm run test:ielts-academic-2026   # contrato, claves privadas y audio bloqueado
npm run test:ielts-review          # scoring/review pipeline
npx tsc --noEmit
```

La salida `BLOCKED` sigue siendo intencional: impide presentar Sets 13–20 como completos
hasta que sus ocho audios integrales pasen el mismo gate técnico y editorial usado en TOEFL.
