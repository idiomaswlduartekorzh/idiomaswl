# TOEFL 2026 — auditoría transversal de composición de los 20 sets

Fecha: 14 de agosto de 2026

Estado: brecha confirmada; 20/20 sets ya cierran Reading, ninguno es aún forma fija completa

## Respuesta corta

La intuición del owner era correcta. Los lotes W2–W7 alinearon bien un módulo escrito
por set, pero no completaron una forma fija de dos módulos. El alcance cerrado hasta
ahora se conserva íntegro y pasa a ser **Módulo 1**.

| Habilidad | Producto actual por set | Referencia fija elegida | Brecha por set |
| --- | ---: | ---: | ---: |
| Reading | 40 official-family | 40 | 0 |
| Listening | 17 | 34 | 17 |
| Writing | 12 | 12 | 0 |
| Speaking | 9 | 11 | 2 |
| Total | 78 official-family | 97 | 19 |

En la línea base, cada Set 2–20 mostraba una pregunta Academic suplementaria fuera del
conteo official-family y Set 1 mostraba además un CTW heredado de seis huecos. La capa
fija actual ya los excluye de la sesión evaluada sin borrar sus fuentes reutilizables.

## Referencia oficial usada

- La página vigente de ETS publica hasta 50 Reading, 47 Listening, 12 Writing y 11
  Speaking, con tiempos base aproximados 30/29/23/8 minutos. Reading y Listening
  varían porque son adaptativos.
- La especificación 2026 confirma dos etapas adaptativas en Reading y Listening,
  Writing/Speaking lineales, 10 Build a Sentence, 1 Email, 1 Discussion, 7 Repeat y
  4 Interview.
- El Practice Test 1 de ETS, que declara estar alineado desde el 21 de enero de 2026
  pero no ser réplica exacta, ofrece una forma reproducible de dos módulos:
  - Reading: 20 + 20 = 40;
  - Listening: 18 + 16 = 34;
  - Writing: 10 + 1 + 1 = 12;
  - Speaking: 7 + 4 = 11.

Fuentes: [ETS — Test Content and Structure](https://www.ets.org/content/ets-org/language-master/in/home/toefl/institutions/ibt/about/content-structure.html),
[ETS — 2026 Test Blueprint and Specifications](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf),
[ETS — Full-length Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-full-length-practice-test-1.pdf).

## Brechas de runtime, además del volumen

1. Un solo reloj React de 86 minutos se reinicia al recargar y no representa clocks
   durables por módulo/tarea.
2. Todas las habilidades quedan abiertas mediante pestañas; no hay cierre irreversible
   Reading módulo 1 → módulo 2 ni Listening forward-only.
3. Email y Discussion muestran 7/10 minutos como referencia dentro del mock, pero el
   reloj completo no los aplica.
4. Speaking permite “notas de preparación”, aunque la práctica oficial dice que no hay
   preparación. Repeat se marca completo sólo por renderizarse y todavía faltan dos.
5. Speaking no captura voz, pero al cerrar pide una banda 1–6 autoasignada.
6. El reporte todavía puede mostrar “Overall Band” y conversión aproximada a 120 a
   partir de secciones parciales/no evaluadas. Eso no es publicable como resultado TOEFL.
7. Daily Life y Listening mantienen claves en el payload cliente. Los tres pilotos
   nuevos (CTW, Academic y Build) ya usan claves server-only y deben marcar el patrón.

## Decisión de implementación

Se construirá una **forma fija WeLearn de ruta declarada**, no una adaptación
psicométrica fingida:

- dos módulos de Reading de 20 interacciones cada uno;
- dos módulos de Listening con 18 + 16;
- Writing 12 y Speaking 11;
- composición, ruta, versión y clocks explícitos;
- navegación equivalente donde la fuente publica una regla;
- resultados locales honestos, sin overall/banda ETS cuando Writing o Speaking estén
  not_evaluated;
- audio diferido: primero guiones, manifiesto, voces de muestra y costo; MP3 sólo tras
  aprobación explícita del owner.

La matriz reproducible por set está en
docs/toefl-2026-full-composition-audit-2026-08-14.tsv.

## Qué se conserva

- Los 20 objetos CTW, 20 Academic y 20 Build ya aprobados pasan al Módulo 1.
- Daily Life, Writing, Listening y Speaking existentes no se borran.
- Las fuentes heredadas server-only siguen disponibles para derivar contenido sin
  contaminar el payload.
- No se toca ningún audio hasta el gate acordado.

## Estado de despliegue

**No apto aún para preview de aprobación final.** Primero deben cerrarse el segundo
módulo, los guiones de medios, la navegación/reloj, el scoring honesto y las pruebas.
VoiceOver T16/T17 sigue pendiente como gate humano separado.

## Avance posterior — Reading Módulo 2 Sets 1–5

Los Sets 1–5 ya cierran la brecha de Reading: 40/40 interacciones cada uno. La capa
de forma fija retira de la sesión el CTW heredado del Set 1 y los Academic
suplementarios, pero conserva sus fuentes. Los cinco sets quedan en 78/97 porque aún
faltan 17 Listening y 2 Repeat por set. El TSV asociado refleja este avance.

Evidencia editorial y fuentes:
`docs/toefl-2026-reading-module2-sets1-5-factual-audit-2026-08-14.md`.

## Avance posterior — Reading Módulo 2 Sets 6–10

Los Sets 6–10 también quedan en 40/40 Reading y 78/97 interacciones totales de la
forma fija. Se aplicó la misma capa reversible: Módulo 1 conservado, suplemento fuera
de la sesión fija, Módulo 2 de 10 CTW + 5 Daily Life + 5 Academic, y claves nuevas
únicamente del lado servidor. El TSV refleja ahora diez sets con brecha total 19.

Evidencia editorial y fuentes:
`docs/toefl-2026-reading-module2-sets6-10-factual-audit-2026-08-14.md`.

## Avance posterior — Reading Módulo 2 Sets 11–15

Los Sets 11–15 quedan también en 40/40 Reading y 78/97 interacciones totales. La
misma capa reversible conserva Módulo 1, retira sólo el suplemento de la sesión fija
y agrega 10 CTW + 5 Daily Life + 5 Academic con claves server-only. El TSV refleja
ahora quince sets con brecha total 19.

Evidencia editorial y fuentes:
`docs/toefl-2026-reading-module2-sets11-15-factual-audit-2026-08-14.md`.

## Avance posterior — Reading Módulo 2 Sets 16–20

Los Sets 16–20 cierran el último lote: los veinte simulacros tienen ahora 40/40
interacciones Reading y 78/97 interacciones totales. La capa fija conserva los objetos
anteriores, excluye sólo el suplemento del conteo y añade 10 CTW + 5 Daily Life + 5
Academic con claves server-only. La brecha restante en cada set es 17 Listening y dos
Repeat; esto todavía no constituye un producto terminado.

El lote cerró checker fijo y unit 3/3, regresiones CTW y Reading 8/8 cada una,
TypeScript, ESLint dirigido, build con guardianes y 1.364/1.364 rutas, y Chromium 5/5.

Evidencia editorial y fuentes:
`docs/toefl-2026-reading-module2-sets16-20-factual-audit-2026-08-14.md`.

## Avance posterior — Listening fijo Sets 1–20

Los veinte simulacros componen ahora Listening 18 + 16 = 34. Quince preguntas por set
reutilizan medios existentes y diecinueve permanecen explícitamente bloqueadas hasta
la aprobación de audio; ninguna bloqueada se presenta al scoring ni cuenta como error.
Las claves de los 34 ítems se resuelven en servidor y ya no viajan en el payload fijo.

El total compuesto por set queda en 95/97: Reading 40, Listening 34, Writing 12 y
Speaking 9. No es producto terminado: faltan dos Repeat, navegación, relojes, resultados
y gates de preview/audio. Evidencia y límites en
`docs/toefl-2026-listening-fixed-runtime-audit-2026-08-14.md`.
