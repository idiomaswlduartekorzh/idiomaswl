# Revisión independiente de formato ICFES

**Expediente:** `board-20260912-icfes-format-specialist-16c6469e`

**Rol:** especialista independiente en formato ICFES

**Commit revisado:** `16c6469e2c07ebb618e47e047a22def32b839ae0`

**Veredicto del revisor:** **BLOCKED**

**Aprobación de lanzamiento:** no emitida; este documento es un insumo del board, no la adjudicación final.

## Resultado ejecutivo

La forma abreviada interna sí es estructuralmente consistente: los 23 mocks cargan, cada uno contiene 45 preguntas, las partes aparecen de 1 a 7 y la distribución es siempre 5/5/5/8/7/5/10. Después de la normalización, los estilos también quedan en el orden esperado: correspondencia de palabras, avisos, diálogos, cloze gramatical, lectura literal, lectura inferencial y cloze léxico-gramatical.

El expediente queda **bloqueado** por cinco familias de riesgo:

1. Los hashes del manifiesto no ligan el contenido efectivo que ve el estudiante: el runtime intercambia las partes legadas 1/2 y sustituye las 230 preguntas de la Parte 7 desde archivos compartidos no incluidos en el candidato antiguo.
2. La correspondencia con el formato vigente falla en 77/115 preguntas de Parte 2 y en la cantidad de opciones de las 184 preguntas de Parte 4 y las 161 de Parte 5.
3. La posición de respuesta es explotable: las 23 Partes 7 repiten exactamente `A,B,C,D,A,B,C,D,A,B`; además, B/C concentra 90,1% de las claves de Parte 5 y 87,0% de Parte 6.
4. Hay un banco de ejemplo duplicado en `mock-21` y 27 casos concretos en los que más de una respuesta puede ser defendible desde el enunciado disponible.
5. Aunque el runner dice correctamente “práctica propia abreviada” y niega equivalencia oficial, varias superficies públicas aún prometen “simulacros completos de ICFES”.

Conteo final: **40 hallazgos** — 1 crítico, 9 altos, 29 medios y 1 bajo. **36 bloquean producción** y **28 requieren adjudicación**.

## Cobertura exacta

| Unidad | Revisado | Esperado | Estado |
|---|---:|---:|---|
| Mocks propios | 23 | 23 | PASS |
| Preguntas efectivas en runtime | 1.035 | 1.035 | PASS |
| Secciones | 161 | 161 | PASS |
| Preguntas por mock | 45 en 23/23 | 45 | PASS |
| Partes por mock | 1–7 en 23/23 | 1–7 | PASS |
| Distribución abreviada por mock | 5/5/5/8/7/5/10 | 5/5/5/8/7/5/10 | PASS |

Cobertura por parte: Parte 1, 115; Parte 2, 115; Parte 3, 115; Parte 4, 184; Parte 5, 161; Parte 6, 115; Parte 7, 230.

No se encontraron claves fuera de rango, opciones exactamente duplicadas dentro de un ítem, IDs de pregunta repetidos, pasajes/estímulos obligatorios ausentes ni numeración no secuencial de blancos en Partes 4 y 7.

## Línea base y alcance del claim

Fuentes primarias usadas:

- [Guía de orientación Saber 11 2026-2](https://www.icfes.gov.co/wp-content/uploads/2026/03/17-marzo-guia-de-orientacion-saber-11-2026-2.pdf): forma vigente de 55 preguntas, distribución 11/11/11/18/16/11/22 y definiciones/opciones por parte.
- [Infografía de la prueba de Inglés Saber 11](https://www.icfes.gov.co/wp-content/uploads/2025/09/17-septiembre-infografia-prueba-ingles-saber-11.pdf): resumen oficial de tareas de las partes 1–7.
- [Marco de referencia de la prueba de Inglés Saber 11](https://www.icfes.gov.co/evaluaciones-icfes/saber-11/marcos-de-referencia-examen-saber-11/): contexto del constructo.

La forma estándar vigente tiene 55 preguntas. La distribución porcentual oficial corresponde al perfil 6/6/6/10/9/6/12 que ya declara `src/data/exams.ts`. Los 23 mocks auditados son formas propias abreviadas de 45 preguntas; pueden presentarse así, con el disclaimer visible, pero esta revisión no valida el claim “simulacro completo”. La semejanza de estructura no implica afiliación, autorización ni oficialidad del ICFES.

Este expediente tampoco establece confiabilidad psicométrica, equivalencia de puntaje, dificultad calibrada o vinculación empírica con niveles MCER. Las etiquetas A2–B1 y los niveles estimados solo pueden ser orientativos mientras no exista evidencia de calibración.

## Metodología

- Se cargaron los 23 módulos ejecutables y se reprodujo la transformación real del registry: remapeo de Partes 1/2 por `sectionStyle` y sustitución de Parte 7 por `CURRENT_PART_SEVEN`.
- Se leyeron los 1.035 estímulos, instrucciones, pasajes, stems, opciones y claves efectivos. La lectura evaluó tarea/parte, carga lingüística para Saber 11, una sola respuesta defendible, consistencia entre mocks y alcance de claims.
- Se comparó cada tipo de tarea y cada cantidad de opciones con la documentación oficial vigente, manteniendo separados el perfil abreviado interno y la forma estándar de 55 preguntas.
- Se ejecutaron comprobaciones deterministas de estructura, claves, duplicados, distribución de respuestas, bancos de palabras, numeración de blancos y metadatos. Estas comprobaciones prueban cobertura, no validez semántica.
- Los casos dudosos se marcaron `needs-adjudication`. No se modificaron preguntas, respuestas, código, precios, manifiestos ni producción.

## Ligadura criptográfica

Los digests de este expediente usan SHA-256 sobre JSON canónico con claves ordenadas:

- `rawBundleDigest` = digest de la lista ordenada `{mockId, manifestContentHash}`: `7e970c3c32fa3ce8a3edba96f9d8eb59a3c09a553ffb6f61e29ae137a367b81b`.
- `runtimeBundleDigest` = digest de la lista ordenada `{mockId, runtimeEffectiveHash}`: `29f07e778b985659e21b604c6e90e68f9c5d25d217ebaa31b92da652a6cfef35`.
- `reviewedContentDigest` = digest del objeto canónico `{mockHashLedger, sharedFilesReviewed}`: `969e508e4905681916e4985d7b5a428f6132cd238cc216feb240dddecb84377c`.

Archivos compartidos que materialmente afectan el contenido:

| Archivo | SHA-256 |
|---|---|
| `src/data/mocks/icfes-current-part-seven.ts` | `03f5dc5783ff71ae76b1926f25b0e122097ca411eb33739354d7cb3fcd391537` |
| `src/data/mocks/normalize-icfes-mock.ts` | `88c6fcf5ff1422ee5423d3dd4c4c24581fa5348f2b997b4b65d15dca96cc3ecb` |
| `src/data/icfes/own-mock-expansion-manifest.json` | `445c435d3585e09521faf4a4caaa726660d01eaaa2b05002fb53fa3685cd9dac` |

Ledger por mock:

| Mock | SHA-256 archivo | `manifestContentHash` | SHA-256 efectivo en runtime |
|---|---|---|---|
| mock-01 | `8d27c215c91c377316b219dd0575cb2bd33b4654adc9dcc90bae468935b22eea` | `c1857f23967d967a15ea2b094f109f5ce0ca1bd906b269d6ab0e5712856ebd84` | `4fc6955d693f8feb8e8fcba1caa83541bd9be93045b8d945424ad9b3a308d577` |
| mock-02 | `b886a267b16e3195baf81fa4a31436a2aeee92037014d4cf4834b8a3eb42f7da` | `b7f0a3d14b3e75b851f67eaa469cbf88a7270cb504be25337e8ad9b9851238d9` | `102946edb4b1a582eb03943648642072eacfcaff3e71b137dc48560521e19945` |
| mock-03 | `5b688aa19a1d9c744d971b93da2633797598d248d8771dc87f2398e9d3ab53f8` | `18d3e5371123a78671b820d9401a795ea885b9ab0b13d3f846f4562655a8ae2b` | `f9528012dc758abd686f6c91346245398cc41206fa9d71f646751d5b39440204` |
| mock-04 | `92e30331c40db50c0d9a2ae95ff2f84e588f853f9df2d88a180fc7d174c7b791` | `aa73d0d337a3449c7ef263403b7793a0edf013b02d2dfb508181e6e4cfebf1fe` | `5a377cb4e46aae86c75a850da66b8d7a03c94dec0f92266f10a68364e716c90d` |
| mock-05 | `ccdd2ba5258a8912e3f9d3928f142e7d6cca64f37fe1dcd909eee05b7ab3c726` | `91775d4f4c3d8fd5a194b3582a366cef048637a4e91410e4648d9349756153c0` | `d91ab24a8044882ae873d44281bdea550e5c818e2f60772df80806c819d1f54c` |
| mock-06 | `5f356a7cc28c7881a76b6b8ecb5a47636027d24d295b858a7e0293f4b68a2ca8` | `e3cc10976fcfece46fdbb7aa9cf49e786b3bb019b90468bcd15410ac6d8a530d` | `f1c1894b0564f39e76653992db9dfd67a4f45e254db38c98f6d110a9a118823d` |
| mock-07 | `ffcb018776d88d0ea40c92ee9644cd76838d67c0fb141b484f7b2e83a36ed93b` | `4a46b4e68a25d8387278d390016a5ccd95986f6325d4f77e349446302b017504` | `512ba168fdd8388bcaecb1cb7223f80fd7c4ac8c977302246eb59588164cce66` |
| mock-08 | `c20b74c55ff9052d16bd797bbedd2601ac5bdda94c4fce9145a9a8481be00ccd` | `6fb6eee395cf60464d472c99c5ab9b0bbf16b6cd55e56ed21ea19ddc3557b23a` | `db8d02f91f9cadec8b1b4094abb2d04b7c9afa413da378d6966f2131eda8a315` |
| mock-09 | `0a0d2c1fedd3cd443bf707ba7df074c3ca71f7e51ca24e139f438a39ed3459b2` | `3b0b1dc3c8bb763d6561fa20621bde194868aab1e79c2e7727cde06b3e99b701` | `9aab33b781fd72a978925c94a228f836f478ed0a0aa14111e12236e458dd8f14` |
| mock-10 | `c57ac17eea29000bbf762cbbdf9f2df7d987e2cd4b8181db2842a05a79852390` | `e7d5f7b0fe03c507dfab28fa6709e91b780b1fa3312a554cbd77d9c1955e0c27` | `2faeed0ba21d3ed4246fb05ef4d86edc7c0ad6c477611f3496cda0b9a577a25a` |
| mock-11 | `c38181ab5cef6337d041db4ae4a5a0580adc4060131d58bc61e34ada77832b3e` | `485e3c5a3a3af9ca48898cc4d0de1bda052883de8ebedca7bda9cf3b1f5b7cd4` | `0fe3a3640b14c255b4a2e25a5cbe8685d1a0b04878da0fef5865f6749a059248` |
| mock-12 | `f8f8f923202917f9c92c4ee29a82c1bab2c9589469daf630f9fee474d68adc76` | `6f8c7efce09a1fe5f04216e2b07a2ea3a091d9405503528dcafa0f5e51ea3cf3` | `45dfaf9e56a0dc70e89a52a5f077d1488be0f8092032d4537c830f2d95ca0237` |
| mock-13 | `ab3da51261d99f7b8178b894cd05e74bc09247b1f4507f5cb49be87fb10cebe4` | `5a823a9f6fac1a6b56209403ce514537cf1b8f2f8e4c833a8772bfebe09515a7` | `58c27ff7c24e2b72d58f400b507c9d5a2927f8245d53433c469cdef64d070c73` |
| mock-14 | `eeb0ed7fcb005086f0a5838b0791a60242619f572e6c7d1a15904c298c87fdb1` | `6416901b91d4bb6d1cbccbfa17cebbf47ca0956223964f3c3923be609f8e7862` | `a8c2445d9927acef9d4e948b347efb677169890077392a40bd341e8f5b358029` |
| mock-15 | `7f4936dd7cff49e72740d53b4f57ef504a0d63fde511e0c88b279daafbcb73f4` | `4e07201757bb2f580dd5acfe2bf781c8bbe31f0aa29da58106ca1483ab3bb5d9` | `f9c84aa9fb1d9fa8d58c08b70375045ba68060e7175baec5325af07fca9005fb` |
| mock-16 | `c055323e74994c4e037054ad2b8b9e342253d06b0d00777ddfb28dee0aa2b277` | `607c5f57a14d63f584e589023e309f46019c606f574a74c887215bc2f5add3ec` | `1d349baea06372b47a596abbdab434baac3e2c7a3220e13bf359a9fc6bb2d0c8` |
| mock-17 | `d5d188541e6d164d1ee1c82a9c9f9a7bd115b9bbeaf3a5dd7420d00cae78579a` | `4d377a550a3404ce8b99939771142d7f5d2dc3d178f5f0c70f2b5d29bcf42482` | `64dfa924847de616fb1c742534b29164ef4a0288a87e9f89358b8fa3337f3292` |
| mock-18 | `88b51e8c9073c29ac9e8bd23ebef023a7fa72b0bccefc90cded368811d02b585` | `889486831bca54386fe64448459caede713561b489db7bd07191414486624dd5` | `88e8dce4aeaf2a1b306983c6b2b72198e31973b873a4e192205e11269652ca2a` |
| mock-19 | `e3ce13f64f2d10f45f31eb20ce42f8b42f9d0e5bbd486610105869a8872a352c` | `ce06b9a457a69650956e6b2d809d7692a0c68661261df1ab5571af1e3078d24d` | `6653cc7ef4a2c2004c99f38144869ffbedf47bc2553153560dcca55f5cd83fb2` |
| mock-20 | `3e35f6d75e2c323fb760b1d33a3a851f1806d0db90e20f3551dc96c846d8554e` | `6c20629a92c5447ce55a53066a21e4ef8bb00505dc0ce28edfaa300f10193b0c` | `81c5168f8b48f3c9ae727ec0c18c4f14fbfdbf5523e11db87fb39ab99e325cd1` |
| mock-21 | `92babac36e20958b7586795c49e782feeaa23fa38c4294f04b43b7af3c01ee70` | `7e8e5cbda8fa164046dfae443e72da2ee05ed7312e61f2b75873b4f724f53e9d` | `d31a69a65ffbe1cddc4586e94acff1963eecf4bacb9a771ba3fa08f492c11db8` |
| mock-22 | `4b9a8430118df42f22a3dc8a06281214eefcdf000c9d036fe7d4980728e4980a` | `9df53cbac3f04fb3493566f7f1c1f0dde9243b9fe3fe068dd366d7c5b48f22e1` | `446bc47ddff84f1d25501f160a3d0304a9cb4eb73d9967351225e7c7736e188d` |
| mock-23 | `33d0507db357912467f3aa4ed424dade9b567c3cfbe97ffca5fc76caab5f7845` | `45bb84638e7316cb425faaccc30a3ffad432312516469abf05a3e64f00983b6b` | `05ab51b19d5d389d67efcfce4e898e4a956577487839364996436cbedcd53a5b` |

## Hallazgos completos

La columna “clave” contiene la clave actual cuando aplica; “bloquea” se refiere a producción del producto/claim auditado, no a una decisión final del board.

### Hallazgos sistémicos

| ID | Recurso / mock / pregunta / parte | Clave actual | Cambio propuesto y evidencia | Severidad / confianza | Bloquea | Categoría |
|---|---|---|---|---|---|---|
| FMT-001 | `runtime-own-mock-bundle`; mock-01..23; all-1035; P1,2,7 | — | Hacer hash de cada mock efectivo y agregar normalizador/P7 al digest. El manifiesto solo liga módulos crudos; las 23 formas efectivas difieren. | crítica / alta | sí | hash-binding-runtime-content |
| FMT-002 | bundle; mock-01..23; all-1035; P1–7 | — | Conservar “práctica propia abreviada · 45 preguntas”. El perfil interno pasa, pero no reproduce la forma vigente de 55. | media / alta | no | scope-current-form |
| FMT-003 | bundle; mock-01..23; 77 ítems; P2 | — | Reescribir stem/opciones para escoger lugar o rotular como práctica pragmática suplementaria. Solo 38/115 preguntan por lugar. | alta / alta | sí | part-task-mismatch |
| FMT-004 | bundle; mock-01..23; p4q1–8; P4 | A–D | Reducir a tres opciones A–C y readjudicar, o rotular como cloze suplementario. Los 184 ítems usan cuatro; el formato vigente usa tres. | alta / alta | sí | part-option-count |
| FMT-005 | bundle; mock-01..23; p5q1–7; P5 | A–D | Reducir a tres opciones A–C y readjudicar, o rotular como lectura suplementaria. Los 161 ítems usan cuatro; el formato vigente usa tres. | alta / alta | sí | part-option-count |
| FMT-006 | bundle; mock-01..20; 35 ítems; P5 | — | Adjudicar literal/paráfrasis frente a inferencia/global y mover o reescribir donde corresponda. Hay 35 stems que cruzan explícitamente esa frontera. | media / media | sí | needs-adjudication |
| FMT-007 | `icfes-current-part-seven.ts`; mock-01..23; p7q1–10; P7 | A,B,C,D,A,B,C,D,A,B | Reordenar opciones por mock, readjudicar y rehashear. `answer=index%4` revela el mismo ciclo en las 23 formas. | alta / alta | sí | testwise-answer-pattern |
| FMT-008 | bundle; mock-01..23; P5–6 | P5 10/77/68/6; P6 9/55/45/6 | Rebalancear posiciones conservando el texto de cada clave. B/C contiene 90,1% de P5 y 87,0% de P6. | alta / alta | sí | testwise-answer-distribution |
| FMT-009 | `icfes-mock-21.ts`; mock-21; p1-example; P1 | H trophy = E trophy | Usar ejemplo distinto o reemplazar la palabra repetida. El renderer agrega el ejemplo como H y deja ocho posiciones pero siete palabras únicas. | alta / alta | sí | part-one-example-bank |
| FMT-010 | `icfes-mock-12.ts`; `icfes-mock-13.ts`; p3q1–5; P3 | — | Cambiar metadato a `type='dialog'`. Diez preguntas usan `mcq` aunque la sección es `dialogs-grid`; el render visible no falla. | baja / alta | no | metadata-consistency |
| FMT-011 | `src/data/exams.ts`; mock-01..20; título catálogo | — | Alinear títulos con temas ejecutables. Veinte títulos divergen; p. ej. mock-03 estudio/tecnología vs salud/cuerpo. | media / alta | no | catalog-content-consistency |
| FMT-012 | claims públicos; mock-01..23; copy | “simulacros completos de ICFES” | Usar “prácticas propias abreviadas para entrenar siete partes”. El runner declara 45 vs 55 correctamente, pero varias páginas prometen un simulacro completo. | alta / alta | sí | risky-format-claim |
| FMT-013 | 23 módulos y resultado; claim de nivel | A2–B1 / nivel estimado | Mantener como orientación hasta contar con calibración documentada; no equiparar con puntaje oficial. Este expediente no encontró evidencia psicométrica. | media / alta | no | calibration-claim-scope |

Ítems de FMT-003 (77):

`mock-01:p2q2`, `mock-01:p2q4`; `mock-02:p2q1`, `p2q3`, `p2q4`, `p2q5`; `mock-03:p2q2`, `p2q3`, `p2q5`; `mock-04:p2q2`, `p2q3`, `p2q5`; `mock-05:p2q1`, `p2q2`, `p2q4`, `p2q5`; `mock-06:p2q1`, `p2q2`, `p2q4`, `p2q5`; `mock-07:p2q1`, `p2q2`, `p2q3`, `p2q5`; `mock-08:p2q1`, `p2q2`, `p2q4`, `p2q5`; `mock-09:p2q1`, `p2q2`, `p2q3`, `p2q4`; `mock-10:p2q2`, `p2q4`; `mock-11:p2q2`, `p2q4`, `p2q5`; `mock-12:p2q2`, `p2q3`, `p2q4`; `mock-13:p2q2`, `p2q3`, `p2q5`; `mock-14:p2q1`, `p2q4`, `p2q5`; `mock-15:p2q2`, `p2q4`, `p2q5`; `mock-16:p2q2`, `p2q4`, `p2q5`; `mock-17:p2q1`, `p2q2`, `p2q4`, `p2q5`; `mock-18:p2q2`, `p2q3`, `p2q4`; `mock-19:p2q2`, `p2q3`, `p2q4`, `p2q5`; `mock-20:p2q1`, `p2q2`, `p2q3`, `p2q4`, `p2q5`; `mock-21:p2q2`, `p2q4`; `mock-22:p2q2`, `p2q4`, `p2q5`; `mock-23:p2q2`, `p2q3`, `p2q4`, `p2q5`.

Ítems de FMT-006 (35):

`mock-01:p5q1`, `p5q4`; `mock-02:p5q1`, `p5q4`; `mock-03:p5q1`, `p5q7`; `mock-04:p5q1`, `p5q3`; `mock-05:p5q1`, `p5q5`; `mock-06:p5q1`, `p5q3`; `mock-07:p5q5`; `mock-08:p5q1`, `p5q3`; `mock-09:p5q1`, `p5q3`, `p5q5`, `p5q7`; `mock-10:p5q1`, `p5q4`; `mock-12:p5q1`; `mock-13:p5q5`; `mock-14:p5q1`, `p5q4`; `mock-15:p5q4`; `mock-16:p5q4`; `mock-17:p5q1`, `p5q4`; `mock-18:p5q1`, `p5q5`; `mock-19:p5q4`, `p5q7`; `mock-20:p5q1`, `p5q5`.

Mapeo completo de FMT-011 (catálogo → contenido):

`mock-01` Vida cotidiana y ciudad → Lugares, personas y comunidad; `mock-02` Viajes y servicios → Viajes y transporte; `mock-03` Estudio y tecnología → Salud y cuerpo; `mock-04` Salud y ambiente → Escuela y educación; `mock-05` Comida y cultura → Comida y nutrición; `mock-06` Trabajo y carrera → Medio ambiente; `mock-07` Deporte y tiempo libre → Tecnología e internet; `mock-08` Ciencia y espacio → Familia y hogar; `mock-09` Arte y medios → Trabajo y carrera; `mock-10` Emergencias y seguridad → Compras y dinero; `mock-11` Tecnología y vida digital → Deportes y ejercicio; `mock-12` Medio ambiente → Animales y naturaleza; `mock-13` Salud y medicina → Arte y cultura; `mock-14` Trabajo y carreras → Clima y estaciones; `mock-15` Educación y aprendizaje → Redes sociales y comunicación; `mock-16` Cultura e identidad → Colombia y América Latina; `mock-17` Deporte y competencia → Ciencia y tecnología; `mock-18` Viajes y turismo → Rutinas y vida diaria; `mock-19` Ciencia y descubrimiento → Ropa y moda; `mock-20` Sociedad y juventud → Ciudad y comunidad.

### Ítems que requieren adjudicación

| ID | Recurso / ítem / parte | Clave actual | Cambio propuesto y evidencia | Severidad / confianza | Bloquea | Categoría |
|---|---|---|---|---|---|---|
| FMT-014 | mock-05 / p4q6 / P4 | D `cooked` | Acotar método o quitar `fried`: una masa en plancha/sartén puede ser cooked o fried. | alta / alta | sí | needs-adjudication |
| FMT-015 | mock-07 / p4q2 / P4 | C `communication` | Forzar la colocación o quitar `messages`: “voice communication/messages” es defendible. | media / media | sí | needs-adjudication |
| FMT-016 | mock-07 / p4q6 / P4 | A `social` | Nombrar redes o quitar `digital`/`online`: las tres combinan con “media”. | media / alta | sí | needs-adjudication |
| FMT-017 | mock-14 / p4q3 / P4 | C `regions` | Marcar el término convencional o quitar `zones`: ambos completan “natural ___”. | media / alta | sí | needs-adjudication |
| FMT-018 | mock-14 / p4q8 / P4 | C `agriculture` | Añadir pista de cultivos: periodos húmedos/secos afectan agricultura, turismo, transporte e industria. | media / alta | sí | needs-adjudication |
| FMT-019 | mock-15 / p4q1 / P4 | B `users` | Precisar personas o retirar `accounts/members/followers`: varias poblaciones pueden ser “active social media ___”. | media / alta | sí | needs-adjudication |
| FMT-020 | mock-15 / p4q4 / P4 | B `platform` | Precisar app/servicio: platform, website y channel permiten seguir posts/stories. | media / alta | sí | needs-adjudication |
| FMT-021 | mock-15 / p4q5 / P4 | C `share` | Añadir `reshare` o quitar send/post: las tres acciones admiten contenido “with friends”. | media / alta | sí | needs-adjudication |
| FMT-022 | mock-15 / p4q7 / P4 | D `day` | Añadir pista diaria o quitar hour/week: “several times a ___” acepta las tres. | media / alta | sí | needs-adjudication |
| FMT-023 | mock-15 / p4q8 / P4 | A `tool` | Escribir “marketing tool” o quitar network/system/service: las cuatro describen una plataforma para negocios. | media / alta | sí | needs-adjudication |
| FMT-024 | mock-16 / p4q1 / P4 | A `city` | Fijar city o usar distractores de otra clase: city, town y settlement son defendibles en la fundación de Cartagena. | media / media | sí | needs-adjudication |
| FMT-025 | mock-17 / p4q4 / P4 | A `attention` | Usar colocación única o quitar `focus`: memoria puede atraer atención o foco investigativo. | media / media | sí | needs-adjudication |
| FMT-026 | mock-17 / p4q6 / P4 | C `role` | Quitar `part`: “plays a critical role/part” son expresiones estándar. | media / alta | sí | needs-adjudication |
| FMT-027 | mock-17 / p4q8 / P4 | B `possible` | Contrastar viabilidad con facilidad o quitar `easy`: tecnología puede hacer observación posible o fácil. | media / alta | sí | needs-adjudication |
| FMT-028 | mock-18 / p4q2 / P4 | C `time` | Añadir pista de horario o quitar `energy`: ambas se pueden gestionar sabiamente al estudiar. | media / media | sí | needs-adjudication |
| FMT-029 | mock-18 / p4q3 / P4 | B `notes` | Usar “taking notes” o quitar `lists`: ambas permiten escribir información en palabras propias. | media / media | sí | needs-adjudication |
| FMT-030 | mock-18 / p4q5 / P4 | C `breaks` | Especificar “short breaks” o quitar walks/naps: las tres permiten descansar al cerebro. | media / alta | sí | needs-adjudication |
| FMT-031 | mock-18 / p4q6 / P4 | C `review` | Usar colocación única: review/check/repeat pueden encajar antes del examen. | media / alta | sí | needs-adjudication |
| FMT-032 | mock-22 / p4q8 / P4 | B `might` | Añadir incertidumbre o quitar should/would: las tres expresan modalidades plausibles en “choose a type you ___ enjoy”. | media / alta | sí | needs-adjudication |
| FMT-033 | mock-23 / p4q5 / P4 | B `because` | Usar `when` o crear causalidad inequívoca: la frase actual pide naturalmente un conector temporal. | media / alta | sí | needs-adjudication |
| FMT-034 | mock-23 / p4q7 / P4 | B `other` | Distinguir cantidad/clase o quitar `more`: “other/more beautiful paintings” es posible. | media / alta | sí | needs-adjudication |
| FMT-035 | mock-14 / p7q6 / P7 | B `signs` | Conservar signs o signals y retirar el otro: ambos forman “early warning ___”. | alta / alta | sí | needs-adjudication |
| FMT-036 | mock-15 / p3q5 / P3 | B `That's quite unusual nowadays.` | Añadir sorpresa o quitar la respuesta positiva: “You are very lucky then” también responde naturalmente. | media / alta | sí | needs-adjudication |
| FMT-037 | mock-16 / p3q2 / P3 | B `Yes, it is considered some of the best quality.` | Pedir acuerdo o quitar preferencia: “I prefer to drink tea” es una respuesta conversacional válida. | media / media | sí | needs-adjudication |
| FMT-038 | mock-16 / p3q5 / P3 | B `That's one of the biggest…` | Añadir entusiasmo o quitar opinión negativa: “Carnivals are far too noisy for me” también contesta. | media / alta | sí | needs-adjudication |
| FMT-039 | mock-19 / p3q4 / P3 | C `That's a great deal…` | Añadir pista de asequibilidad o quitar juicio negativo: “Half price is still far too expensive” también contesta. | media / alta | sí | needs-adjudication |
| FMT-040 | mock-20 / p3q3 / P3 | C `I'd love to sign up…` | Añadir invitación/interés o quitar rechazo: “I am too tired to go” es una respuesta coherente. | media / alta | sí | needs-adjudication |

## Distribución de claves

| Parte | A | B | C | D | E | F | G |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1 (índice en banco A–G) | 18 | 15 | 18 | 15 | 20 | 14 | 15 |
| 2 | 26 | 69 | 20 | — | — | — | — |
| 3 | 46 | 37 | 32 | — | — | — | — |
| 4 | 31 | 63 | 69 | 21 | — | — | — |
| 5 | 10 | 77 | 68 | 6 | — | — | — |
| 6 | 9 | 55 | 45 | 6 | — | — | — |
| 7 | 69 | 69 | 46 | 46 | — | — | — |

## Condición de reemisión

El `candidateDigest` heredado, `015255242a3f92a5ccc180148c5985f5178f85d589b9c5cba6ea993f8093410e`, pertenece al contrato comercial obsoleto de 12/49/99 y revisión humana. Este expediente solo liga la revisión de formato del contenido congelado.

El encabezado deberá reemitirse contra el `candidateDigest` reconciliado para COP 12.900 / 49.900 / 99.900 **únicamente si** todos los hashes de archivo, hashes compartidos y hashes efectivos en runtime aquí enumerados permanecen idénticos. Cualquier cambio de contenido o dependencia invalida la parte afectada y exige una revisión nueva. La reemisión del encabezado no convierte por sí sola este `BLOCKED` en `PASS`: primero deben remediarse y adjudicarse los hallazgos.

No se tocó ningún archivo de preguntas, respuestas, código, precios, manifiesto, producción ni de otros revisores.
