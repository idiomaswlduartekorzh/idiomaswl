# TOEFL 2026 — auditoría transversal de composición de los 20 sets

Fecha: 14 de agosto de 2026

Estado: brecha confirmada; 10/20 sets ya cierran Reading, ninguno es aún forma fija completa

## Respuesta corta

La intuición del owner era correcta. Los lotes W2–W7 alinearon bien un módulo escrito
por set, pero no completaron una forma fija de dos módulos. El alcance cerrado hasta
ahora se conserva íntegro y pasa a ser **Módulo 1**.

| Habilidad | Producto actual por set | Referencia fija elegida | Brecha por set |
| --- | ---: | ---: | ---: |
| Reading | 20 official-family | 40 | 20 |
| Listening | 17 | 34 | 17 |
| Writing | 12 | 12 | 0 |
| Speaking | 9 | 11 | 2 |
| Total | 58 official-family | 97 | 39 |

Además, cada Set 2–20 muestra una pregunta Academic suplementaria fuera del conteo
official-family. Set 1 también muestra un bloque CTW heredado de seis huecos. Por eso
la portada hoy informa 59 interacciones en Sets 2–20 y 65 en Set 1, no 58. Esos
suplementos deben salir de la sesión fija y conservarse como práctica reutilizable.

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
