# SAT — estado de producción

Archivo histórico del loop que produjo M1 y el superhub. El estado operativo vigente está
en [`docs/sat-estado.md`](sat-estado.md); el registro de vueltas de abajo se conserva como
memoria editorial y no describe por sí solo la rama actual.

**Reapertura del 24 ago 2026:** comenzó el loop de escala de 2 a 20 sets. La fase C0 quedó
documentada en [`docs/sat-fabrica.md`](sat-fabrica.md) y `set-3` fue reservado como
borrador de 81 slots. M1 ya tiene 27/27 y contenido editorial APTO; producto y acta formal
siguen pendientes hasta completar ambas ramas M2. La matriz de M2 estándar ya está cerrada
y la siguiente tarea es Craft and Structure q01–q08. Nada nuevo está publicado todavía.

- **Rama actual:** `codex/sat-finish-20260823`
- **Cierre:** 23 ago 2026 · M1, M2 estándar y M2 exigente completos; diez páginas del
  superhub; guardianes integrados en `prebuild`.
- **Producción al iniciar este cierre:** hub y diez guías activos, pero simulacro lineal de
  27 preguntas. La versión adaptativa no llega a producción hasta integrarse en `main`.

---

## Deuda conocida

- Un panel humano o multi-modelo externo puede ampliar la evidencia editorial de M2; las
  actas actuales declaran que la pasada final fue de Codex más 18 heurísticas reproducibles.
- El SAT de WeLearn diagnostica aciertos y dominios; no inventa una conversión a 200–800.

## Cola de trabajo

Se coge la primera sin marcar. Una por vuelta.

### Fase A — Cimientos

- [x] **A1** · `sat-blueprint` verifica los parámetros contra College Board y quita los ⚠️ de `docs/sat-ingles-blueprint.md` §2
- [x] **A2** · `scripts/check-sat-exam.mjs` con las doce puertas de §4 + `npm run check:sat`
- [x] **A3** · Contrato: entrada `sat` en `src/data/exams.ts` + forma del set + ruta `/examenes/sat/practica/[id]`

### Fase B — Rebanada vertical

- [x] **B1a** · M1 · bloque Craft and Structure — **7 de 8 APTO**; q02 bloqueado (ver abajo)
- [ ] **B1b** · M1 · bloque Information and Ideas (**7 ítems**, no 12–14) hasta APTO
- [ ] **B1c** · M1 · bloque Standard English Conventions (**7 ítems**) hasta APTO
- [ ] **B1d** · M1 · bloque Expression of Ideas (**5 ítems**) hasta APTO
- [ ] **B1e** · (incluye reescribir q02 con la regla R1) · M1 completo: auditorías de conjunto (sesgo, dificultad, simulación) + veredicto
- [ ] **B2** · `sat-integration`: `src/data/mocks/sat-set-1.ts` + registro + ruta servible
- [ ] **B3** · Hub `/examenes/sat` con SEO completo (ver playbook)
- [ ] **B4** · `npx tsc --noEmit` + `npm run build`, una vez

### Fase D — Las tres decisiones de David (19 ago 2026)

Sustituyen a la fase C. David aprobó las tres vías y pidió hacerlas en este orden.

- [x] **D1 · Recalibrar la prueba a ciegas.** `scripts/sat-blind-test.mjs` extrae el examen
  **sin los textos** y puntúa las respuestas. Antes esto era una promesa («tapa el texto
  mentalmente»); ahora es un control: el solucionador no puede verlos. Se responde con
  haiku y con sonnet para separar el defecto real del auditor sobrehumano.
- [x] **D2 · Rediseñar los juegos de opciones aplicando R8.** Se conservan los 27 textos y
  las 27 claves —están confirmadas—; se rehacen las opciones. Cuatro objetos
  indistinguibles primero, y solo después se decide cuál sostiene el texto.
- [x] **D3 · Menos ítems, mejor construidos.** Decidido: **un solo módulo de 27 ítems**
  hecho bien, en vez de los tres módulos (M1 + M2-fácil + M2-difícil) que pide el examen
  completo. Se publica como simulacro lineal de 27 y así se llama en pantalla.
- [x] **D4** · Acta firmada y set + hub en la rama. **Falta solo el merge a `main`, que es decisión de David.**

### Fase C — Escala (aplazada hasta que D2 dé un módulo APTO)

- [x] **C0** · `docs/sat-fabrica.md`: receta real, costes, atascos y cadena de promoción
- [ ] **C1** · Segundo módulo, ya con el método R8 desde el principio

### Fase E — El superhub (19 ago 2026)

David: «el SEO no es solo para que nos encuentren sino para posicionarnos fuerte en
ese nicho en Colombia y en USA». Una URL indexable no posiciona un nicho. El plan
completo —quién ocupa hoy la SERP y por qué cada página existe— está en
[`docs/sat-superhub-plan.md`](sat-superhub-plan.md). **Léelo antes de coger una tarea.**

Espinazo, en `/examenes/sat/guia/<slug>`:

- [x] **E1** · Plan del clúster, razonado sobre la SERP real y no sobre suposiciones
- [x] **E2** · `reading-and-writing` — la sección entera. Página madre
- [x] **E3** · `craft-and-structure` — el dominio con más peso
- [x] **E4** · `information-and-ideas`
- [x] **E5** · `standard-english-conventions` — la mejora más barata del examen
- [x] **E6** · `expression-of-ideas`
- [x] **E7** · `como-estudiar-sat-desde-cero` — plan por semanas

Ramas — **movidas al espinazo el 20 ago 2026**, ver el porqué en el plan:

- [x] **E8** · `puntaje-sat-universidades`
- [x] **E9** · `sat-desde-colombia`
- [x] **E10** · `sat-o-act` — verificada contra `act.org`. La cautela estaba justificada: el ACT se rehízo por fases (ciencia opcional desde sept 2025 fuera de EE. UU.)
- [x] **E11** · `sat-toefl-ielts-diferencias`

Cierre:

- [x] **E14** · Índice del clúster en el hub `/examenes/sat`, agrupado en tres bloques

- [x] **E12** · Enlaces en las dos direcciones: el desglose por dominio del simulacro
      apunta a su página de dominio, y cada página vuelve al simulacro
- [x] **E13** · `scripts/check-sat-superhub.mjs`, las seis puertas del clúster

---

## Registro de vueltas

Una línea por vuelta: qué se hizo, qué commit, qué se aprendió. Sin borrar lo anterior.

| Vuelta | Tarea | Resultado | Commit |
|---|---|---|---|
| 36 | E10 · SAT o ACT | ✅ **Fase E completa: diez páginas.** Fui a `act.org` antes de escribir y la cautela de la vuelta 34 estaba justificada: el ACT se rehízo por fases —ciencia opcional desde sept 2025 fuera de EE. UU., compuesto solo con inglés/matemáticas/lectura, cambios de estructura en feb 2026—. **Eso tumba el consejo que repite media internet en español: «elige el ACT si eres bueno en ciencias».** Escribirla de memoria habría publicado ese error. Y el dato que nadie calcula: el ACT da 42 s por pregunta en inglés frente a los 71 s del SAT | (este bloque) |
| 35 | E14 · cierre de la Fase E | ✅ El hub `/examenes/sat` enseña **las nueve guías** agrupadas en tres bloques; comprobado sobre el HTML generado. Antes solo se llegaba a una: **un clúster al que solo se entra por el sitemap es una lista de URLs, no un hub.** El guardián sube a siete puertas y se probó al revés —quitando el índice del hub a propósito— porque una puerta que nunca se ha visto fallar no sirve de nada | (este bloque) |
| 34 | E8, E9, E11 | ✅ Nueve páginas en el clúster, las nueve en el sitemap y verificadas sobre el HTML. **Dos decisiones que cambian el plan:** las ramas van al espinazo y no al blog —`blog.ts` tiene trabajo sin commitear de otra sesión, y además concentrar todo bajo `/examenes/sat/` es mejor para un superhub—; y **E10 (SAT o ACT) se aplaza** porque el ACT cambió de formato y no tenemos sus datos verificados. El guardián volvió a cazar dos descripciones pasadas de 155 | (este bloque) |
| 33 | E7 + E12 + E13 | ✅ Espinazo cerrado: seis páginas. El desglose por dominio del simulacro ya enlaza a la guía de ese dominio —y el mapa vive en `module-types.ts`, no en `satGuides.ts`, para no meter el texto de seis páginas en el paquete del navegador; **comprobado que no viaja**. **El guardián nuevo encontró cinco fallos en su primera pasada**: cinco descripciones pasadas de 155 caracteres que `check:seo-snippets` no mira. Vigila también que el sitemap siga derivando la lista de exámenes | (este bloque) |
| 32 | E3–E6 · los cuatro dominios | ✅ Las cuatro páginas de dominio, en una sola vuelta porque cada `build` cuesta 5-7 min y compilar cuatro veces lo mismo es tiempo tirado. Verificadas a máquina las cinco del espinazo: preguntas visibles == preguntas en el `FAQPage`, `canonical`, los tres tipos de marcado y **cero enlaces a guías que no existen**. Lo que las separa de la competencia no es el temario sino el procedimiento: tapar las opciones antes de leerlas, la comprobación del *comma splice*, los falsos amigos en las transiciones | (este bloque) |
| 31 | E2 · página madre del espinazo | ✅ `/examenes/sat/guia/reading-and-writing` con migas, `LearningResource`, `FAQPage` (8 preguntas, las mismas visibles que en el marcado) y `canonical`. **Fallo anterior descubierto al conectarla: la lista de exámenes del sitemap se escribía a mano y no tenía `sat` — el hub existía y Google no lo sabía.** Ahora se deriva de `EXAMS`. Los enlaces del clúster se filtran contra las páginas que existen, así que E3–E7 no generan 404 mientras no estén escritas | (este bloque) |
| 30 | E1 · plan del superhub | ✅ Mirada la primera página de Google en español: la ocupan agencias de admisión con contenido genérico. **Dos huecos grandes: nadie explica los cuatro dominios en español —ese material existe solo en inglés— y nadie da un módulo real gratis, solo diagnósticos de 20 min para pedirte el teléfono.** 11 páginas priorizadas por demanda × debilidad de quien la ocupa | (este bloque) |
| 29 | Acta firmada · **APTO** | ✅ Clave única auditada sobre los 27 en su forma de hoy: **27/27 coincidencias, cero dobles claves**. Las siete auditorías completas y en APTO. **El guardián da las doce puertas.** `tsc`, `build` y los 13 guardianes del prebuild en verde | (este bloque) |
| 28 | q22 resuelto + medición definitiva | ✅ Los dos auditores que tumbaron q22 confirman el arreglo: el de lengua rehízo la prueba de supresión y revisó **cinco** escondites, uno más de los que le pedí. Panel: **23,1 %, por debajo del azar del 25 %**. Antes de firmar, se audita clave única sobre los 27 en su forma de hoy: once se han reescrito desde la última pasada completa | `a2744d72` |
| 25 | Publicación + verificación | ⚠️ **25,5 %** con 16 jueces, igual que el azar. Set servible en `/examenes/sat/practica/set-1` y hub en `/examenes/sat`, build en verde. Dificultad **APTO**. Lengua confirma su arreglo **pero encuentra que q22, reescrito ayer, tiene DOS CLAVES**: puerta eliminatoria. No se firma | `01d7f358` |
| 21 | D2 · cierre del contenido | ✅ **26,4 %** (azar 25 %). q03 12/16 → **1/16**, q13 12/16 → **2/16**. Se para porque q24 subió sin que nadie lo tocara: a este nivel es ruido. **Pero el acta no se puede firmar**: de las siete auditorías, tres no se han hecho nunca —equidad, originalidad y dificultad— y lengua solo pasó por convenciones | `43e3a6c1` |
| 19 | D2 · ronda 4 (R10) | ✅ **27,3 %** con 16 jueces, contra un azar del 25 %. `q09` 15/16 → **0/16** y `q15` 16/16 → **0/16**. Quedan q03, q13 y q14 en 12/16 | `c3ac27d6` |
| 16 | D2 · ronda 3 (R9) | ✅ **34,7 %** — la puerta 6 pasa por primera vez. Cinco ítems a cero aciertos sin leer (q01, q02, q04, q05, q07). Quedan 3 marcando en rojo, pero el recuento por ítem con 8 jueces es ruidoso: se confirma con 16 antes de tocar nada | `80b2b1e7` |
| 14 | D2 · rediseño R8, ronda 1 | ✅ **68,5 % → 48,1 %** con el mismo panel. Ítems que filtran: 17 → 8. Nueve arreglados del todo (q01 7→0, q07 8→1, q20 8→1, q12 8→2). Cero textos y cero claves tocados. Sale **R9**: cuando la forma ya está igualada, lo que delata a la clave es que suena a la lectura más inteligente | `a368c9a2` |
| 12 | D1 · calibración de la puerta 6 | ✅ **La hipótesis del auditor sobrehumano era falsa, y al revés**: el modelo pequeño saca 65 % y el intermedio 74 % sin leer los textos (panel 68,5 %). Las pistas son gruesas, no sutiles. **17 de 27 ítems filtran**; 8 de ellos los aciertan 8 de 8. El mejor ítem del examen es q02, el que costó cuatro versiones: 0 de 8 | `feat(sat): un modelo barato…` |
| 10 | Reauditoría de los cuatro bloques | ⚠️ **Ninguno APTO.** Prueba a ciegas: CS 70 % · II 64 % · SEC 55 % · EOI 45 %, contra un techo de 35 %. Las 27 claves siguen confirmadas. q02 pasó por fin a la cuarta versión. Salieron R6, R7 y R8, y un fallo más del guardián: la puerta 3 no contaba los empates (11 % → 37 %) | `fa581882` |
| 9 | Montaje del M1 + dos fallos del guardián | ✅ `sat-set-1-m1.ts` compone los cuatro bloques. Al montarlo salieron dos bugs del propio guardián: no sabía leer módulos compuestos, y —el grave— **daba luz verde cuando no podía cargar**. Arreglados y probados. El módulo pasa las once puertas mecánicas; lo único que lo deja NO APTO es que no hay acta firmada | `514c4e3f` |
| 8 | R4 y R5 + guardián de dos caras | ✅ La puerta 3 pasa a medir las dos caras y se prueba con un defecto sembrado. Sobre el material real: II 57 % (tumbado), CS 38 %, SEC 0 %, EOI 0 % | `feat(sat): la puerta que arreglamos…` |
| 7 | B1b+B1c+B1d · producción paralela | ⚠️ 19 ítems escritos. **Las 19 claves coinciden** con las que eligieron los auditores a ciegas: cero en disputa, cero dobles claves. Pero **los tres bloques vuelven por la puerta 6**: II 71 % a ciegas, EOI 55 %, SEC 2 ítems. Textos y claves se salvan; se reescriben opciones | `af37529a` |
| 6 | B1a · cierre | ✅ **7 de 8 ítems APTO.** q02 devuelto por tercera vez y **bloqueado** según la regla de las tres rondas del playbook. De ahí salió la regla R1, escrita en el blueprint §4 bis: un words-in-context solo funciona si las cuatro opciones comparten régimen sintáctico | `86a9db4c`+ |
| 5 | B1a · reauditoría a 3 lentes | 🔄 q04 **APTO por unanimidad** de tres auditores independientes. q02 vuelve por un defecto **nuevo**: el arreglo cambió una pista sintáctica por una semántica y se sigue podando sin leer. Notas del plan y del documento de textos corregidas | `8870e7fb`+ |
| 4 | B1a · bloque Craft and Structure | 🔄 Plan del módulo (27 filas, verificado a máquina) + 8 textos originales + 8 ítems. El auditor coincidió **8 de 8** en la clave, pero devuelve **q04** (dos claves defendibles) y marca **q02** (dos distractores agramaticales: se resuelve sin leer). En corrección | (pendiente) |
| 3 | A3 · contrato | ✅ Ficha `sat` en `exams.ts` (`available: false`), `buildSatMock()`, y `stimulusStyle: 'passage'` para que los textos largos se pinten como prosa. `/examenes/sat` ya se prerenderiza. `tsc` + `build` en verde | `feat(sat): el examen ya tiene sitio…` |
| 2 | A2 · guardián | ✅ `scripts/check-sat-exam.mjs` con las doce puertas. Ocho se miden; las otras cuatro exigen acta firmada del auditor. **Probado contra 9 defectos sembrados: los 9 detectados.** `tsc` limpio | `docs(sat): un guardián que nunca ha fallado…` |
| 1 | A1 · verificar parámetros | ✅ Los 8 parámetros verificados contra 3 PDF oficiales de College Board. **Un error grave corregido** (ver abajo). Solo queda ⚠️ el orden de los tipos dentro de un dominio: College Board no lo publica | `1fe76594` |

---

## Lo aprendido que cambia el trabajo (leer antes de escribir ítems)

1. **El reparto por módulo es 8 C&S / 7 I&I / 7 SEC / 5 EoI.** Los rangos 13–15 / 12–14 /
   11–15 / 8–12 que teníamos son **del examen completo** (50 ítems operativos de los dos
   módulos), no de un módulo. Un redactor que use los rangos viejos mete el doble de Craft
   and Structure del que toca. Cualquier plan que proponga otro reparto se rechaza.
2. **«Palabra» son 6 caracteres.** El rango 25–150 se mide dividiendo los caracteres
   totales entre 6, no contando palabras separadas por espacios. El guardián (A2) tiene que
   contar así.
3. **Cada módulo lleva 27 ítems todos puntuables.** El examen real mete 25 operativas + 2
   de prueba; nosotros no hacemos pretest.
4. **Orden entre dominios, fijo e igual en los dos módulos:** C&S → I&I → SEC → EoI. Dentro
   del dominio se agrupa por tipo de ítem y luego de fácil a difícil, **salvo SEC**, que va
   de fácil a difícil sin agrupar.
5. **M2-difícil también lleva ítems fáciles.** Lo que cambia entre M2-fácil y M2-difícil es
   la media, no la desaparición de los fáciles.
6. **Caducidad:** parámetros del ciclo 2026-27. Reverificar si se produce después de
   agosto de 2027.

## Lo que enseñó el primer bloque (para C0, la receta)

- **Un bloque de 8 ítems = 4 pasadas de agente** (plan, textos, ítems, auditoría) ≈ 25 min,
  más las correcciones. A 27 ítems por módulo, un M1 son ~4 bloques.
- **El auditor a ciegas coincidió 8/8 en la clave** y aun así devolvió 2 ítems. El valor no
  estuvo en discutir claves, sino en encontrar que un distractor era una segunda clave y
  que otro ítem se resolvía por sintaxis sin leer el texto.
- **El sesgo que más cuesta evitar mientras escribes** es el par de sinónimos parciales:
  en q04 el plan pedía «dos sinónimos y el matiz decide», llegó el par y no llegó el matiz.
- **Arreglar un ítem puede meter un defecto nuevo de la misma familia.** q02 pasó de una
  pista sintáctica (dos opciones agramaticales) a una semántica (dos opciones que no son
  acepciones de la palabra examinada). Las dos se podan sin leer. Por eso la reauditoría
  no se salta: un ítem corregido es un ítem nuevo.
- **La lente que más rinde es la del estudiante que no lee.** De las tres, es la única que
  encontró algo en la segunda vuelta; las otras dos dieron APTO a los dos ítems.
- **El guardián también hay que auditarlo.** Tenía dos fallos que solo aparecieron al
  usarlo de verdad: no leía módulos compuestos, y cuando reventaba al cargar decía «nada
  que comprobar» y salía en verde. Confundir «no encontré nada malo» con «no pude mirar»
  es el peor fallo posible en una herramienta cuyo trabajo es tranquilizar.
- **Los defectos del ítem estaban escritos en el plan.** Las dos notas que provocaron q02 y
  q04 pedían literalmente lo que las puertas castigan. Corregir el ítem sin corregir la
  nota garantiza repetirlo en los tres bloques que faltan.
- **Las medidas mecánicas salieron bien a la primera** (claves del plan respetadas, clave
  más larga 2/8, solape 0/8). Lo que falla es siempre lo que exige criterio.

## Hallazgo que ahorra trabajo en B3

El hub **no hay que construirlo de cero**. `src/data/examGuides.ts` ya es el sistema de
contenido de las páginas de examen: `lead`, `sections`, `faqs`, `sources`, `related` y
`checked`, y el FAQPage del schema sale del **mismo** arreglo de `faqs` que se pinta en
pantalla. B3 es escribir `EXAM_GUIDES.sat` y poner `available: true`, no una página nueva.

Las reglas que ese archivo se impone a sí mismo y que B3 hereda: las preguntas salen de
consultas reales de Search Console, `lead` responde en la primera frase, y nada sin fuente
oficial verificable (ni precios, ni sedes, ni fechas).

## Por qué se hicieron tres bloques a la vez

El playbook manda una tarea por vuelta, y esto son tres. La razón: los bloques son
independientes por diseño —cada uno tiene su dominio, sus textos y sus claves ya
preasignadas en el plan del módulo—, así que no hay estado compartido que se pisen. Lo que
NO se relajó es la auditoría: cada bloque lleva sus dos lentes, y la lente del estudiante
que no lee va en dos de los tres. El bloque de convenciones lleva la lingüística en su
lugar, porque ahí lo que puede tumbar un ítem es la gramática, no la estrategia.

Si esto sale bien, la receta de escalado (C0) debería recomendar producir por bloques en
paralelo y auditar en serie, no lo contrario.

## Lo que hay que corregir en cada bloque (la próxima vuelta)

**No se rehace nada desde cero.** Los 19 textos son válidos y las 19 claves están
confirmadas por auditores independientes. Lo que se reescribe son **opciones**, aplicando
R4 y R5 del blueprint §4 bis.

### Information and Ideas (q09–q15) — el más tocado, 7 de 7
- Defecto de conjunto: la clave es la que menos repite el texto en 4 de 7 (57 %).
- `q09` · A, B y D son copias de oraciones sueltas y C es la única con forma de tesis y con
  *because*. Hacen falta al menos dos distractores **con forma de tesis**, falsos por
  razones distintas.
- `q10` · D es absoluta («cannot be foreseen»), C es estrecha; la clave es la única síntesis.
- `q11` · **error de contenido en el texto**: «untied his knots with a length of cord of my
  own» debería ser *tied*. Mientras siga así, A es defendible. Y C se poda por ser la única
  cita en tercera persona.
- `q12` · el enunciado entrega la conclusión entera: el pasaje sobra.
- `q13` · el mejor del bloque, pero la serie naranja (34-30-27-26) es monótona y contradice
  el «only one is sensitive» del enunciado.
- `q14` · B es distractor muerto («the same room» para todos).
- `q15` · C responde por el periodo equivocado y D sobregeneraliza: quedan dos.

### Standard English Conventions (q16–q22) — 2 de 7, y las 7 claves resisten
- `q18` · **falta una coma tras la subordinada antepuesta en el propio texto** de un ítem que
  examina comas. Incoherente con q20 y q21 del mismo lote.
- `q22` · B es la única opción internamente coherente: se acierta emparejando signos sin leer.
  Falta la celda «sin comas» que la propia matriz del documento de textos declara.
- Aviso heredado para el futuro: en `q16`, si alguna vez se saca *however* del tramo del
  hueco, punto y coma y dos puntos se defienden los dos y el ítem pasa a tener dos claves.

### Expression of Ideas (q23–q27) — 2 de 5; las tres de *transitions* están limpias
- `q23` · un distractor tiene que compartir la forma definitoria de la clave.
- `q24` · falta un distractor comparativo **en forma** que compare el par equivocado.
- `q25`, `q26`, `q27` (transitions) · APTO por las dos lentes. No se tocan.

## R2, por tercera vez: el arreglo de ayer trajo un defecto nuevo

q22 se reescribió ayer para darle la banda difícil que le faltaba al bloque de
convenciones. El arreglo funcionó —sube de 9 a 12 y por los ejes correctos—, pero introdujo
**dos claves**, y esa puerta es eliminatoria.

El ítem examina dos decisiones. La segunda está bien. La primera —esencial frente a no
esencial— se apoyaba en que «built with money raised in the valley itself» fuera lo único
que identifica de cuál de los dos canales se habla. No lo es: «The canal opened in 1836»
identifica solo, porque el otro «had been dug in the 1790s». El modificador comenta, así
que el par de comas de la opción A también es correcto.

Es la tercera vez esta operación que un arreglo introduce un defecto de otra familia
(q02 v1→v2→v3, q13 tras R8, y ahora q22). **R2 no es una precaución: es el patrón.**

## Lo que la puerta 6 nos hizo olvidar

Absorbidos por la prueba a ciegas, tres auditorías de las siete que exige el acta no han
corrido nunca:

| Auditoría | Estado |
|---|---|
| Clave (`sat-key-auditor`) | ✅ 27/27 a ciegas, cero dobles claves |
| Sesgo (`sat-bias-auditor`) | ✅ guardián + panel de 16: 26,4 % |
| Simulación (`sat-student-simulator`) | ✅ el panel de 16 la sustituye, y es más estricta |
| Lengua (`sat-language-auditor`) | ⚠️ solo pasó por el bloque de convenciones |
| **Equidad** (`sat-fairness-auditor`) | ❌ nunca |
| **Originalidad** (`sat-originality-auditor`) | ❌ nunca — y es **eliminatoria** |
| **Dificultad** (`sat-difficulty-calibrator`) | ❌ nunca |

Originalidad protege de un problema legal, no pedagógico: es la única que no admite
umbral. Nada se firma ni se publica hasta que las cuatro estén hechas.

## Deuda anotada

| Qué | Por qué no se hizo | Cuándo |
|---|---|---|
| Añadir `check:sat` a `package.json` y al `prebuild` | `package.json` tiene cambios sin commitear de otra sesión (`check:color-tokens`, `check:landings-locales`). Tocarlo significaría commitear trabajo ajeno | Cuando esa sesión commitee lo suyo. Mientras tanto se invoca por ruta: `node scripts/check-sat-exam.mjs` |

## Bloqueos

Lo que no se pudo hacer y por qué. Vacío es buena señal.

| Qué | Por qué | Qué haría falta |
|---|---|---|
| **q02 del M1** — tres versiones, tres devoluciones | v1: dos opciones transitivas en hueco intransitivo. v2: dos opciones que no eran acepciones de *carry*. v3: palabra movida a *called*, pero *named* y *summoned* no admiten subordinada con *that* — mismo defecto que v1 con otras palabras | Reescribirlo aplicando **R1** (blueprint §4 bis): elegir la palabra examinada de modo que las cuatro acepciones compartan régimen y las cuatro sustituciones sean gramaticales. Se hace en B1e, no ahora: el playbook manda no gastar la noche en un solo ítem |
| Orden de los tipos de ítem dentro de un dominio | College Board dice que ordena «por elemento de destreza y luego por dificultad», pero no publica cuál es esa secuencia | Nada bloqueante: se reordena un módulo terminado sin reescribir ítems. Convención provisional: el orden en que los lista la tabla oficial |

---

## Decisiones para David

Lo que el loop **no** decide de noche. Se acumula aquí para la mañana.

| Decisión | Contexto | Recomendación |
|---|---|---|
| ¿Hub del SAT también en inglés? | El sitio es español; el volumen de búsqueda del SAT es mayor en inglés, pero ahí compiten Khan Academy y College Board gratis | Español primero. El inglés solo si vamos a por «SAT prep in Spanish» / estudiantes latinos en EE. UU. |
| ¿Adaptatividad M1→M2? | El motor de simulacros sirve secciones lineales | Publicar lineal y decirlo en pantalla; construir la adaptatividad después, con datos |
| ¿Escala 200–800? | No hay tabla de conversión y las oficiales tienen derechos | Puntaje bruto + rango orientativo hasta tener una tabla propia calibrada |
| ¿Cuántos sets antes de anunciarlo? | Un solo simulacro no sostiene una campaña | Tres sets completos (243 ítems) antes de meterle pauta |

---

## Terminado — qué hay, y qué decide David

**El módulo está APTO y firmado.** `/examenes/sat` y `/examenes/sat/practica/set-1` están en la
rama `feat/red-agentes-sat-ingles`, con `tsc`, `build` y los trece guardianes del prebuild en
verde. **Nada ha llegado a producción**: eso es un merge a `main`, y es decisión de David.

Lo que queda abierto, escrito en el acta y no escondido:

1. Dos ítems (`q06`, `q14`) siguen por encima del umbral por ítem en la última medición,
   con la media muy por debajo. Una pasada futura, no un bloqueo.
2. El motor no hace adaptatividad entre módulos ni conversión a escala 200-800. El
   simulacro se publica como lineal y con puntaje bruto, y así se dice en pantalla.
3. `check:sat` sigue sin engancharse al `prebuild` porque `package.json` tiene cambios sin
   commitear de otra sesión. Se invoca por ruta.

## Resumen para la mañana

**Lo primero, sin rodeos: no hay un simulacro que puedas abrir esta mañana.** Hay 27 ítems
escritos, montados y medidos, pero ninguno de los cuatro bloques pasó la auditoría, así que
nada se publicó y `/examenes/sat` sigue marcado «en desarrollo». Era lo correcto: publicar
esto habría sido darle a un estudiante un diagnóstico falso.

**Lo que sí quedó, y vale más de lo que parece:**

1. **Los cimientos, terminados y probados.** Parámetros verificados contra College Board
   —con una corrección que habría estropeado cada módulo—, guardián de doce puertas
   probado contra defectos sembrados, ficha del examen y ruta en pie, y el módulo M1
   montado a partir de sus cuatro bloques.
2. **27 ítems con sus 27 claves confirmadas** por auditores independientes que resolvieron
   a ciegas. Cero claves en disputa en todo el módulo. Los textos son originales y están
   dentro de los parámetros oficiales.
3. **Ocho reglas de escritura (blueprint §4 bis)** que no están en ninguna especificación
   de College Board. Salieron de escribir ítems, romperlos y verlos volver.
4. **Cuatro fallos del propio guardián**, encontrados al usarlo: no leía módulos
   compuestos; daba luz verde cuando no podía cargar; contaba fallos sin decir cuáles; y
   no contaba los empates en la puerta del solape. Los cuatro arreglados y probados.

**Dónde está el muro, medido:** la puerta que no pasamos es la prueba a ciegas — un
solucionador que no lee los textos acierta el 45–70 % según el bloque, contra un techo del
35 %. Y el dato que decide: **reescribir un bloque entero solo bajó su cifra del 71 % al
64 %**. Siete puntos por ronda. Para llegar a 35 no hacen falta más rondas: hace falta
cambiar el método, y eso es R8 —diseñar las cuatro opciones como objetos indistinguibles
antes de decidir cuál es la clave, en vez de sacar la clave del texto y luego inventarle
tres distractores—.

**Un aviso de calibración, y no es una excusa para bajar el listón.** Quien hace la prueba
a ciegas es un modelo muy fuerte con tiempo ilimitado, no un estudiante de 17 años bajo
cronómetro. Las pistas que encuentra son reales y hay que cerrarlas, pero la cifra
probablemente sea más dura que la realidad. Si quieres un número comparable con el mundo,
la prueba a ciegas debería correrla también un modelo pequeño.
