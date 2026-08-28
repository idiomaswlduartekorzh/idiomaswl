# IELTS Academic 2026 — auditoría de Sets 4–20

Fecha de contraste: 25 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen actual: **APROBADO excepto Listening — los 17 sets requieren audio v2**

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
| 4 | 40/40 | 2.255 | 2.184 | OK · 27,1 min | 0 |
| 5 | 40/40 | 2.215 | 2.180 | CANDIDATO QA · 29,0 min | 0 |
| 6 | 40/40 | 2.333 | 2.225 | REEMPLAZAR · 24,0 min | 0 |
| 7 | 40/40 | 2.311 | 2.176 | REEMPLAZAR · 24,0 min | 0 |
| 8 | 40/40 | 2.358 | 2.151 | REEMPLAZAR · 24,0 min | 0 |
| 9 | 40/40 | 2.254 | 2.187 | REEMPLAZAR · 24,0 min | 0 |
| 10 | 40/40 | 2.342 | 2.171 | REEMPLAZAR · 24,0 min | 0 |
| 11 | 40/40 | 2.364 | 2.151 | REEMPLAZAR · 24,0 min | 0 |
| 12 | 40/40 | 2.376 | 2.150 | REEMPLAZAR · 24,0 min | 0 |
| 13 | 40/40 | 2.344 | 2.155 | FALTA | 0 |
| 14 | 40/40 | 2.345 | 2.179 | FALTA | 0 |
| 15 | 40/40 | 2.362 | 2.150 | FALTA | 0 |
| 16 | 40/40 | 2.312 | 2.154 | FALTA | 0 |
| 17 | 40/40 | 2.271 | 2.151 | FALTA | 0 |
| 18 | 40/40 | 2.338 | 2.172 | FALTA | 0 |
| 19 | 40/40 | 2.301 | 2.151 | FALTA | 0 |
| 20 | 40/40 | 2.339 | 2.192 | FALTA | 0 |

Los 17 Readings ya quedan dentro del rango oficial de 2.150–2.750 palabras. En cambio,
los tapescripts oficiales de ocho familias de muestra suman aproximadamente 3.168
palabras para 44 posiciones de respuesta, cerca de 72 por respuesta. IELTS no publica
un mínimo de palabras; el auditor usa deliberadamente un gate WeLearn más conservador
de 55 por respuesta, 2.200 por set. La expansión editorial local conserva literalmente
cada bloque original y deja los guiones en 2.254–2.404 palabras; cada parte queda entre
555 y 620 palabras. No hay bloques largos duplicados ni coincidencias exactas de 50
palabras entre dos sets.

El master v2 del Set 4 fue aceptado y publicado con 27:05. El candidato v2 del Set 5 ya
está ensamblado y auditado con 29:00, pero permanece fuera de `public/` hasta la escucha
y autorización del propietario. Los siete MP3 heredados 6–12 duran 24,0 minutos y
contienen pausas extensas; quedan marcados para reemplazo por una simulación de 29–31
minutos. Los ocho MP3 13–20 no existen. Los 17 guiones ya superan el gate.

El Set 5 recibió una revisión editorial específica, no relleno genérico: conversación
social de dos personas, monólogo social, discusión educativa de tres participantes y
monólogo académico. Sus cuatro partes contienen 553/551/560/551 palabras y conservan
la evidencia de las 40 respuestas en orden. El plan empaqueta turnos consecutivos de un
mismo hablante para bajar de 88 a 71 solicitudes, reutiliza 12 anuncios ya aceptados del
Set 4 (583 caracteres, coste cero) y deja sólo 12.475 caracteres nuevos facturables.

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
- Cada parte Listening contiene exactamente diez respuestas en su rango propio. El Set 4,
  que antes repartía 7 en Part 3 y 13 en Part 4, ahora respeta 21–30 y 31–40.
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
- Los 68 tapescripts se ampliaron localmente con discurso original de WeLearn: contexto,
  clarificación, recap, cautela académica y autocorrección. Ningún texto ni clave se envió
  a un proveedor externo, y todos los bloques fuente se preservan de forma literal.
- Una segunda auditoría encontró 44 bloques largos de plantilla repetidos en 363 posiciones.
  Se sustituyeron por andamiajes ligados al tema de cada parte; el contrato ahora rechaza
  tanto una transcripción duplicada como cualquier coincidencia exacta de 50 palabras entre sets.
- La auditoría de orden encontró que la evidencia de la pregunta 30 del Set 20 aparecía
  antes de las preguntas 26–29. Se movió al cierre de la secuencia sin cambiar la clave y
  un nuevo contrato verifica el orden de toda evidencia literal de completion en los 68 guiones.
- El intento persiste borradores sólo después de hidratar el navegador; una sesión guardada
  ya no puede alterar ni ser sobrescrita durante el primer render del servidor.
- El resultado privado separa con claridad bandas parciales, `Overall pendiente` y resultado
  final, y verifica `user_id` antes de mostrar textos, notas o grabaciones.
- La navegación global usa un estado inicial de sesión determinista. La build de producción
  ya no presenta deriva de hidratación cuando Supabase se inyecta en runtime.
- El soporte flotante usa CSS global, reconoce las rutas reales de IELTS y respeta
  `prefers-reduced-motion`; el documento evita landmarks `main` anidados.
- El Set 7 superó una auditoría Golden individual de 235 controles. Se corrigieron
  afirmaciones sobre sueño, biomimética, Blue Zones y relatividad lingüística; también
  se reemplazaron el gráfico Task 1 defectuoso y un Task 2 de alto riesgo de coincidencia.
  El nuevo gráfico original de residuos Alderwick/Brenton pasó inspección renderizada y
  conserva título y descripción accesibles. Sólo queda diferido su audio Listening.
- El Set 8 superó 236 controles Golden. Sus cuatro guiones fueron reconstruidos con
  discurso propio de cada escenario; las lecturas incorporan evidencia genómica canina
  de 2026, comparaciones de ciclo de vida para cultivo vertical y límites empíricos de
  la aversión a la pérdida. Se sustituyó el prompt público de financiación artística,
  y el proceso solar pasó inspección visual y semántica accesible. Su audio sigue diferido.
- El Set 9 superó 237 controles Golden. Sus guiones Listening conservan el orden de
  evidencia y añaden discurso natural específico; Reading fue actualizado con fuentes
  WHO, ONU/Seabed 2030, ILO y OECD de 2025–2026. Se reemplazó el Task 2 público sobre
  zoológicos por uno original de ciencia ciudadana. El gráfico de cinco áreas quedó
  alineado en categorías, años y miles, y pasó inspección renderizada y semántica.
  Sólo queda diferido su audio Listening.
- El Set 10 superó 235 controles Golden. Se eliminaron afirmaciones obsoletas o no
  sustentadas sobre el tratado de plásticos, valor de la economía de plataformas,
  lesión de H.M. y memoria digital. Listening quedó completo en fuente, el Task 2
  público de migración rural fue sustituido por una política original de reparación
  y uso compartido, y el gráfico de desempleo pasó QA visual y accesible. Sólo queda
  diferido su audio Listening.
- El Set 11 superó 235 controles Golden. Se reconstruyeron sus cuatro guiones y se
  corrigieron la falsa precisión del caudal romano, un modelo universal de distribución,
  afirmaciones térmicas sin contexto y generalizaciones sobre sesgos y efecto rebote.
  El Task 2 ahora usa una política original de mapas de calor; la gráfica de consumo
  hídrico pasó QA visual y accesible. Sólo queda diferido su audio Listening.
- El Set 12 superó 235 controles Golden. Sus cuatro guiones quedaron en densidad y orden
  de evidencia; Reading incorporó el cierre NOAA 2026 del cuarto evento global de
  blanqueamiento, corrigió la cronología soviética del ajedrez y separó uso frecuente,
  uso problemático y causalidad en salud mental. El Task 2 ahora plantea un conflicto
  original entre apoyo escolar y privacidad; el gráfico delimitado a una estación costera
  pasó QA visual y semántica accesible. Sólo queda diferido su audio Listening.
- El Set 13 superó 239 controles Golden. Se sustituyó el relleno genérico de Listening
  por cuatro guiones específicos y se actualizaron las categorías IOM/UNHCR a junio de
  2026. Reading ahora separa promesa y ventaja cuántica demostrada, y distingue respuesta
  placebo, efecto específico, historia natural y nocebo. El Task 2 regional es original;
  la gráfica turística pasó QA visual y accesible. Su audio continúa bloqueado hasta
  generación, mastering y QA.
- El Set 14 superó 236 controles Golden. Listening quedó compuesto por cuatro guiones
  específicos sin relleno automático y la historia del dinero separa remesas Tang,
  billetes Song, emisión sueca, convertibilidad, fiat y polímero. Reading corrigió el
  alcance del GDPR/AI Act, las relaciones del árbol de nuez de Brasil, carbono, humedad
  y tipping points. El proceso de aguas residuales pasó QA visual y accesible, y el Task
  2 sobre IA en evaluación universitaria es original. Sólo queda diferido su audio.
- El Set 15 superó 245 controles Golden. Listening conserva sus cuatro escenarios sin
  expansión genérica e incorpora la evaluación NOAA 2026 del cuarto blanqueamiento
  global. Reading actualiza sueño con NIH, urbanización con WUP 2025 y hambre/pérdida/
  desperdicio con SOFI 2025, FAO y UNEP. La gráfica eléctrica corrige los datos oficiales
  de Reino Unido y Australia, pasó QA visual y accesible; el Task 2 de donación de
  excedentes es original. Sólo queda diferido su audio.
- El Set 16 superó 244 controles Golden. Listening conserva los cuatro escenarios y
  corrige seguridad del prototipo de agua y la evidencia científica de navegación aviar.
  Reading actualiza costes e integración renovable, desarrollo infantil y pobreza/comercio
  con IRENA, IEA, WHO, UNICEF y World Bank. La gráfica de capacidad renovable usa dos
  años IRENA consistentes y pasó QA visual y accesible; el Task 2 de inversión pública en
  eficiencia frente a nueva generación es original. Sólo queda diferido su audio.

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

1. El propietario aprobó el casting de 33 perfiles/12 voces, el piloto Set 4 y la
   generación del Set 5 con techo USD 0,75. El 26 de agosto retiró explícitamente la
   reserva de 3.500 créditos para terminar este set aunque el saldo se agote.
2. El piloto Set 4 pasó QA técnica (27:05, mono 44,1 kHz/64 kbps, -18,48 LUFS,
   pico -1,64 dBFS) y transcript↔Whisper (`small.en`, WER 2,36 %, completion 27/27).
   El propietario lo escuchó, aprobó y autorizó explícitamente su publicación; el MP3 público
   coincide con el hash aceptado `4fef56f5678bce1405bfa58cfc4619bf9e81c77a57132ad64173998b37c72ed2`.
3. Escuchar y autorizar el candidato Set 5; después reemplazar los siete MP3 6–12 y
   generar los ocho MP3 13–20 con duración 29–31 min, reproducción única, mono 44,1
   kHz/64 kbps, -18 LUFS y pico máximo -1,5 dBFS.
4. Contrastar los 15 audios restantes transcript↔Whisper, revisar muestras humanas y registrar
   tamaño, hash, duración, loudness, pico y silencios. El plan actualizado proyecta
   241.654 caracteres, 120.827 créditos y USD 12,0827 antes de impuestos y reintentos;
   no es una autorización.
5. Convertir el plan en manifiesto inmutable de release y la auditoría en guardián de `prebuild`
   sólo cuando todos los bloqueos estén cerrados.
6. Tras generar audio, repetir smoke de las 17 rutas Listening, móvil 320/390, teclado,
   lector de pantalla y verificación humana de las cuatro partes de cada MP3.

Estado Set 5 al 26 de agosto: los 71/71 segmentos y el máster están completos fuera de
`public/`. La autorización de reserva cero permitió terminarlo sin exceder el techo de
USD 0,75. De 13.058 caracteres fuente, 12 anuncios/583 caracteres son reutilización
gratuita byte por byte del piloto aceptado; seis segmentos/7.215 caracteres proceden de
una síntesis ya pagada en el caché anterior; en total la factura histórica atribuible al
Set 5 es de 12.475 caracteres, 6.238 créditos conservadores y USD 0,6238 antes de
impuestos. El saldo final consultado al proveedor es 1.870 créditos.

El máster pesa 13.920.592 bytes y conserva SHA-256
`17f598cb7d5943f35bbad590ecc4d986dabc5b89703b8e2a17de2b5d098db14c`. La QA técnica
pasó: 29:00, MP3 mono 44,1 kHz/64 kbps, -18,48 LUFS y pico -1,86 dBFS. La alineación
`small.en` pasó con WER 5,28 % y 33/33 evidencias de completion presentes y en orden.
Queda sólo la escucha y aprobación humana antes de reemplazar el audio heredado público.

La caché verificable se preserva fuera del worktree en
`/Users/josedavidduartesilva/Developer/idiomaswl-ielts-audio-cache/`; ocupa 63 MB. El
manifiesto vigente `a3b8302fb89f491ba00388c845346cc08ed40a283963d446e3b5148b9c0bccea`
conserva los 71 segmentos del Set 5, el máster, los dos reportes QA y la transcripción
ASR. Los 18 segmentos reutilizados están ligados por perfil, hash de texto y bytes de
audio; el registro distingue correctamente la reutilización gratuita del piloto de la
síntesis pagada en el caché anterior.

## Evidencia reproducible

```bash
npm run audit:ielts-academic-2026  # hoy debe terminar BLOCKED sólo en audio
npm run plan:ielts-audio-2026      # valida plan, hashes y factura mínima; no genera
npm run audio:ielts-2026 -- --verify-source # valida fuente/casting sin API ni gasto
npm run audit:ielts-generated-audio -- <dir> # QA del piloto/lote fuera de public/
npm run audit:ielts-transcript-alignment -- <dir> <set> <whisper.txt>
npm run test:ielts-academic-2026   # contrato, claves privadas y audio bloqueado
npm run test:ielts-review          # scoring/review pipeline
npm run test:ielts-fullstack       # privacidad, presentación, SSR y navegación
npm run check:practica-catalog     # no-regresión del producto completo
npx tsc --noEmit
npx next build --webpack
```

La salida `BLOCKED (16)` sigue siendo intencional: Set 4 está liberado, pero impide presentar
Sets 5–20 como equivalentes en Listening hasta que sus 16 audios v2 pasen el mismo gate técnico,
transcript↔audio y editorial usado en el piloto.
