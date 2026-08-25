# IELTS Academic 2026 — auditoría de Sets 4–20

Fecha de contraste: 25 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen actual: **APROBADO excepto Listening — los 17 sets requieren guion y audio v2**

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
- [PDF oficial de tareas y tapescripts de muestra Listening](https://ielts.org/cdn/ielts-sample-tests/ielts-listening-sample-tasks-2023.pdf)
- [Reading: tres secciones, 40 preguntas y 2.150–2.750 palabras](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-reading)
- [Speaking: tres partes y 11–14 minutos](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking)
- [Actualización de entrega en computador desde mediados de 2026](https://ielts.org/news-and-insights/updates-to-ielts-test-delivery)

## Resultado cuantitativo

Los 17 sets sí contienen cuatro partes y 40 respuestas de Listening, tres pasajes y 40
respuestas de Reading, Writing Task 1 + Task 2 y Speaking Parts 1–3. No se encontraron
pasajes ni transcripciones duplicados de forma exacta entre los sets auditados.

| Set | Resp. L/R | Palabras Listening | Palabras Reading | MP3 integral | Claves cliente |
|---:|---:|---:|---:|---|---:|
| 4 | 40/40 | 1.398 | 2.184 | REEMPLAZAR · 24,3 min | 0 |
| 5 | 40/40 | 1.348 | 2.180 | REEMPLAZAR · 24,0 min | 0 |
| 6 | 40/40 | 1.349 | 2.225 | REEMPLAZAR · 24,0 min | 0 |
| 7 | 40/40 | 1.332 | 2.225 | REEMPLAZAR · 24,0 min | 0 |
| 8 | 40/40 | 1.357 | 2.165 | REEMPLAZAR · 24,0 min | 0 |
| 9 | 40/40 | 1.343 | 2.187 | REEMPLAZAR · 24,0 min | 0 |
| 10 | 40/40 | 1.358 | 2.171 | REEMPLAZAR · 24,0 min | 0 |
| 11 | 40/40 | 1.305 | 2.151 | REEMPLAZAR · 24,0 min | 0 |
| 12 | 40/40 | 1.299 | 2.150 | REEMPLAZAR · 24,0 min | 0 |
| 13 | 40/40 | 1.302 | 2.155 | FALTA | 0 |
| 14 | 40/40 | 1.290 | 2.179 | FALTA | 0 |
| 15 | 40/40 | 1.303 | 2.150 | FALTA | 0 |
| 16 | 40/40 | 1.329 | 2.154 | FALTA | 0 |
| 17 | 40/40 | 1.360 | 2.151 | FALTA | 0 |
| 18 | 40/40 | 1.354 | 2.172 | FALTA | 0 |
| 19 | 40/40 | 1.383 | 2.151 | FALTA | 0 |
| 20 | 40/40 | 1.297 | 2.192 | FALTA | 0 |

Los 17 Readings ya quedan dentro del rango oficial de 2.150–2.750 palabras. En cambio,
los tapescripts oficiales de ocho familias de muestra suman aproximadamente 3.168
palabras para 44 posiciones de respuesta, cerca de 72 por respuesta. IELTS no publica
un mínimo de palabras; el auditor usa deliberadamente un gate WeLearn más conservador
de 55 por respuesta, 2.200 por set. Los guiones actuales sólo tienen 1.290–1.398.

Los nueve MP3 existentes duran 24,0–24,3 minutos y contienen pausas extensas; quedan
marcados para reemplazo por una simulación de 27–33 minutos. Los ocho MP3 13–20 no
existen. No basta con sintetizar esos ocho guiones cortos: primero deben ampliarse los
17 guiones y después reemplazarse nueve audios y generarse ocho.

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
- La revisión inicial trató erróneamente los nueve MP3 de 24 minutos como material listo.
  El contraste posterior con los tapescripts oficiales detectó que el silencio añadido
  ocultaba una densidad verbal demasiado baja; el auditor ya impide esa falsa liberación.

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
- El intento persiste borradores sólo después de hidratar el navegador; una sesión guardada
  ya no puede alterar ni ser sobrescrita durante el primer render del servidor.
- El resultado privado separa con claridad bandas parciales, `Overall pendiente` y resultado
  final, y verifica `user_id` antes de mostrar textos, notas o grabaciones.
- La navegación global usa un estado inicial de sesión determinista. La build de producción
  ya no presenta deriva de hidratación cuando Supabase se inyecta en runtime.
- El soporte flotante usa CSS global, reconoce las rutas reales de IELTS y respeta
  `prefers-reduced-motion`; el documento evita landmarks `main` anidados.

## Auditoría final no-audio

| Perspectiva | Evidencia | Resultado |
|---|---|---|
| IELTS experto | 17× contratos L/R/W/S, 40/40 L/R, tiempos por etapa, familias, claves y rúbricas | APROBADO |
| Fullstack | privacidad por usuario, scoring inmutable, Task 2 doble, Overall sólo con L/R/W/S | 7/7 + 12/12 |
| Usuario promedio | catálogo libre, disclosure honesto, borrador persistente, estados pendientes legibles | APROBADO |
| UI/UX | desktop 1440, móvil 390, sin overflow, locks ni errores de navegador | APROBADO |
| Accesibilidad | skip link IELTS, alerts vivos, controles con nombre, reduced motion, landmarks válidos | APROBADO |
| Integración | guardián de práctica y build Webpack de 2.369 rutas | APROBADO |

Smoke de producción reproducible: catálogo `200`; Sets 5 y 13 en desktop/móvil; cero
bloqueos de suscripción; ruta de resultado ajena redirigida a login; cero errores de
consola o hidratación. El runner también se contrastó contra TOEFL para localizar y
eliminar la antigua deriva en la navegación compartida.

## Gates pendientes para cerrar el dictamen

1. Expandir editorialmente los 17 guiones Listening hasta al menos 2.200 palabras por
   set, añadiendo contexto, autocorrecciones y distractores naturales alrededor de las
   40 evidencias; faltan como mínimo 14.693 palabras.
2. Aprobar reparto de voces y acentos British, Australian, New Zealand y North American,
   proveedor, modelo y techo de gasto. No se ha llamado ninguna API de voz.
3. Reemplazar los nueve MP3 4–12 y generar los ocho MP3 13–20 con duración 27–33 min,
   reproducción única, mono 44,1 kHz/64 kbps, -18 LUFS y pico máximo -1,5 dBFS.
4. Contrastar los 17 audios transcript↔Whisper, revisar muestras humanas y registrar
   tamaño, hash, duración, loudness, pico y silencios. El plan mínimo proyecta 207.647
   caracteres y USD 10,3824 antes de impuestos y reintentos; no es una autorización.
5. Convertir el plan en manifiesto inmutable de release y la auditoría en guardián de `prebuild`
   sólo cuando todos los bloqueos estén cerrados.
6. Tras generar audio, repetir smoke de las 17 rutas Listening, móvil 320/390, teclado,
   lector de pantalla y verificación humana de las cuatro partes de cada MP3.

## Evidencia reproducible

```bash
npm run audit:ielts-academic-2026  # hoy debe terminar BLOCKED en guion/audio
npm run plan:ielts-audio-2026      # valida plan, hashes y factura mínima; no genera
npm run test:ielts-academic-2026   # contrato, claves privadas y audio bloqueado
npm run test:ielts-review          # scoring/review pipeline
npm run test:ielts-fullstack       # privacidad, presentación, SSR y navegación
npm run check:practica-catalog     # no-regresión del producto completo
npx tsc --noEmit
npx next build --webpack
```

La salida `BLOCKED` sigue siendo intencional: impide presentar Sets 4–20 como equivalentes
en Listening hasta que los 17 guiones y audios v2 pasen el mismo gate técnico y editorial
usado en TOEFL.
