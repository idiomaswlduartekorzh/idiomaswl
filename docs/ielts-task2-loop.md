# Loop de cierre — IELTS Academic Writing Task 2

Prompt para `/loop`. Cada iteración toma **una unidad**, le pasa **las cuatro auditorías**, y
solo la da por cerrada cuando pasan las cuatro. El loop termina cuando las nueve unidades
están cerradas.

---

## Cómo usarlo

```bash
/loop Continúa el cierre de IELTS Task 2 siguiendo docs/ielts-task2-loop.md. Toma la
siguiente unidad abierta del tablero, pásale las cuatro auditorías, arregla lo que falle y
actualiza el tablero. No commitees ni publiques sin aprobación.
```

---

## Tablero

Marca cada casilla solo cuando la auditoría pase entera. `—` = no evaluado todavía.

| Unidad | Código | Pedagógica | Usuario | Playwright |
|---|:-:|:-:|:-:|:-:|
| analisis-pregunta | ✅ | ✅ | ✅ | ✅ 6/6 |
| introduccion | ✅ | ✅ | ✅ | ✅ 2/2 |
| body-1 | ✅ | ✅ | ✅ | ✅ 3/3 |
| body-2 | ✅ | ✅ | ✅ | ✅ 3/3 |
| conclusion | ✅ | ✅ | ✅ | ✅ 7/7 |
| revision-final | ✅ | ✅ | ✅ | ✅ 7/7 |
| **tarea-completa** | ✅ | ✅ | ✅ | ✅ 8/8 |
| **linking-language** (hub + 9 familias + motor) | ✅ | ✅ | ✅ | ✅ 19/19 |
| **tipo-ensayo** | ✅ | ✅ | ✅ | ✅ 10/10 |
| **parrafos-cuerpo** | ✅ | ✅ | ✅ | ✅ 11/11 |
| **5 rutas por tipo** (opinion · discussion · problem-solution · advantages-disadvantages · direct-question) | ✅ | ✅ | ✅ | ✅ 35/35 |
| **model-answers** | ✅ | ✅ | ✅ | ✅ 6/6 |

---

## Las cuatro auditorías

### 1 · Código

Falla si encuentra cualquiera de esto:

- **Emparejamiento por posición.** `lista[i]` cruzando dos colecciones paralelas,
  `examples[(level + n) % length]`, `.map((x, i) => otra[i])`. El enunciado, el modelo y el
  feedback tienen que salir de la MISMA fuente.
- **Campos muertos.** Declarados en el tipo, nunca renderizados, o copiados de otro campo.
- **La respuesta a la vista.** El contexto impreso encima de las opciones no puede ser la
  respuesta, ni el ejercicio puede usar un ejemplo que ya está resuelto más arriba.
- **Distractores excluidos por construcción.** `filter(...).slice(0, 3)` deja siempre fuera
  a los últimos: esa opción solo aparece cuando es la correcta.
- **Rotación cíclica** en vez de `placeFirstAsCorrect` de `@/lib/practica/shuffle-options`.

Cierre: `npx tsc --noEmit`, `npm run check:exam-practice-content`, `npm run check:ielts-task2`,
`npm run build`, y `npx eslint` sobre los ficheros tocados con **0 errores**.

### 2 · Pedagógica

- **Ejemplo trabajado antes de practicar.** Watch one, then you try. Si el alumno produce
  antes de haber visto uno resuelto, la unidad no pasa.
- **Cero evaluación falsa.** Ningún mensaje afirma corrección de un texto libre. Comprobar
  además que la rama de fallo sea ALCANZABLE: si el botón está bloqueado bajo el umbral y
  pulsarlo es la única forma de evaluar, el veredicto negativo es código muerto.
- **Feedback por opción.** Cada distractor explica por qué falla ÉL, no una frase común.
- **Sin atajos.** Medir, no estimar: reparto de la letra correcta por tipo de ensayo,
  porcentaje de acierto de «marcar la más larga», distractores reciclados entre ejercicios,
  y delatores de forma (verbo en otra persona, registro más académico).
- **Arquitectura propia por tipo.** Los cinco tipos no comparten bloques.
- **Se produce todo.** Si la arquitectura tiene cinco bloques, el alumno escribe los cinco.

### 3 · Usuario

La prueba: **¿lo entiende un estudiante, no un experto?**

- Ninguna instrucción con jerga interna. Fuera «Which planning decision will control the
  essay?», «Position or controlling decision», «Follow the exact route», «Recheck the
  requested route», «Identify the layer». Se sustituyen por preguntas directas: «Choose the
  answer your essay will defend», «What must Body 1 explain?», «Does your plan answer every
  instruction?»
- **Todo mínimo se anuncia antes de escribir**, con contador en vivo y cuántas palabras
  faltan: `Minimum 20 words · 7 to go`.
- **Ningún botón bloqueado sin decir por qué.**
- Todo el contenido de IELTS **en inglés**. Ni una palabra de español académico en pantalla.

### 4 · Playwright

`npm run test:e2e`. Por unidad y en los cinco tipos de ensayo:

- Pulsar **todos** los botones, recorrer **todos** los niveles, abrir **todos** los modelos.
- Fallar a propósito en tres opciones distintas y comprobar que las tres explicaciones son
  **distintas entre sí**.
- Comprobar que el contador sube y que el botón se desbloquea en el número anunciado.
- Móvil (375) y escritorio (1280).
- **Consola sin errores propios.**

---

## Trabajo pendiente por unidad

### tarea-completa — CERRADA

| | Antes | Ahora |
|---|---|---|
| Enunciados | **4**, de 5 familias | **25**, 5 por familia |
| Ventajas y desventajas | **no existía** | 5 enunciados |
| Modelo de respuesta | 4 pares Band 6/8, sin relación con el resto del curso | **25 ensayos completos**, compuestos de los párrafos que el alumno ya trabajó |
| Modelos por debajo de las 250 palabras que exige la tarea | — | **0** (el más corto, 251) |
| Corrector ortográfico | activo (subrayado rojo) | `spellCheck={false}` en las seis áreas |
| Temporizador | se recreaba en cada tic | un intervalo por arranque, contra hora límite |
| Aviso de tiempo | ninguno | a los 5 minutos, diciendo qué hacer |
| Botón de terminar por debajo de 200 palabras | **no existía**, sin explicación | siempre presente, y dice qué se pierde |
| Paso a la rúbrica | exigía marcar **las 8** casillas | nada bloquea |
| «Band estimado» | parecía una nota del ensayo | «tu propia estimación», y dice que la página no lee el texto |

**De dónde salen los 25 modelos.** Body 1, Body 2 y la conclusión comparten los **25**
enunciados (medido), así que el ensayo modelo se compone de párrafos que ya existen: el
enunciado sobre el que practicaste Body 1 es el que escribes entero aquí. Hubo que escribir
dos cosas: **9 introducciones** (ver el hallazgo de abajo) y **10 frases de preview**, porque
diez de los dieciséis componibles salían por debajo de 250 palabras.

**Se me colaron seis contradicciones y las cacé antes de cerrar.** Seis de mis nueve
introducciones defendían una posición y su conclusión defendía otra —«free entry» arriba,
«mixed system» abajo—, en una lección que enseña justamente a no contradecirse. Corregidas
contra la conclusión real de cada cadena.

Guardián: familias completas, 4 párrafos por modelo, mínimo de 250 palabras, y que el
enunciado siga existiendo en `body-1`. Playwright: 8 tests, incluido que el reloj pausa y
reanuda de verdad.

### HALLAZGO ABIERTO — la introducción enseña sobre otros enunciados

`introduction-data.ts` usa **9 enunciados que no existen en ningún otro módulo**: toda la
familia de discusión y cuatro de cinco de opinión. Escribes la introducción de «team sports»
y en Body 1 te encuentras «museums». «Build the essay · Step 1 a 6» no construye el mismo
ensayo en 9 de 25 casos.

No lo he tocado: alinearlo es reescribir 9 introducciones aprobadas, y esa es una decisión de
contenido, no una corrección. Mientras tanto, `task2-prompt-bank.ts` escribe esas 9
introducciones por su cuenta para que los 25 modelos estén completos.

### conclusion — CERRADA

El defecto que David nombró: «en la parte que dicen step two, write a complete conclusion,
¿cómo voy a colocar algo que yo no he visto?». Era literal — el taller mostraba el enunciado
y una línea con la función del párrafo, y pedía escribir la conclusión. Ni introducción, ni
Body 1, ni Body 2.

| | Antes | Ahora |
|---|---|---|
| Se ve el ensayo antes de cerrarlo | **no** | introducción + Body 1 + Body 2 completos |
| Distractores distintos (taller) | **2** para 40 ranuras | **46** para 150 |
| «Los 3 distractores ya vistos, la correcta no» | 15 de 19 | **4 de 50** |
| Explicación al fallar | 1 frase común | una por opción, nombrando el ensayo ajeno |
| Correctas impresas más arriba (motor) | **5 de 5** en el nivel 1 | **0** |
| Corrector ortográfico | activo | apagado en las 4 áreas |
| Mínimo para comparar | no anunciado, y el motor decía «30–50» abriendo a las 25 | anunciado con cuántas faltan |

**El recorrido nuevo:** ensayo delante → ¿qué retoma la respuesta? → ¿qué sintetiza los dos
cuerpos? → escríbelo → compara. Al acertar cada paso se subrayan en el ensayo **la tesis** y
**los dos cierres parciales**, que es justo lo que la conclusión tenía que recoger. Antes no:
antes sería la respuesta.

**Dos intentos fallidos, anotados en el código.** Cambié la respuesta del nivel 1 de
`lesson.function` a `example.conclusionJob`, y seguía filtrada; luego a
`example.commonMistake`, y seguía filtrada. La causa está en `conclusion-data.ts`:

```
conclusionJob:  lessonMeta[source.id].function
commonMistake:  lessonMeta[source.id].trap
```

**Los dos son constantes de FAMILIA disfrazadas de campos del ejemplo** —los cinco ejemplos
de un tipo comparten job y trap— y la página imprime `function` y `trap`. Solo lo vi porque
lo medí después de cada cambio. El nivel 1 pasó a invertir la pregunta: aquí está la
conclusión, ¿de qué enunciado es.

Playwright: `tests/e2e/ielts-task2-conclusion.spec.ts`, 7 en verde. Probado que muerde:
sacando el subrayado antes de acertar, el test 2 falla.

**Aviso sobre el localizador de los tests.** El primer intento usaba
`page.locator('div').filter({ has: heading }).last()` y fallaron los siete: `.last()` de los
divs que contienen el título devuelve el más interno, que es la cabecera, y ahí no hay
opciones. Los módulos CSS conservan el nombre como sufijo
(`page-module__x86vhW__guidedWorkshop`), así que `[class*="guidedWorkshop"]` es el ancla
buena. Vale para las unidades que queden.

### revision-final — CERRADA

| | Antes | Ahora |
|---|---|---|
| Qué se lee antes de juzgar | un fragmento de **2 frases** | el **ensayo completo** de ese enunciado, coloreado por párrafo |
| Casos con fallo indetectable leyendo | **6 de 25** (los de Task Response) | 0 |
| El ejemplo resuelto enseña su borrador | **no**, solo la descripción del fallo | sí |
| Explicación al fallar | 1 frase común a las 4 opciones | una por opción, con la pregunta de ese control |
| Correctas impresas más arriba (motor) | **5** (`lesson.decisiveCheck`) | 0 |
| La palabra «layer» en pantalla | 6 sitios | **0**, con un test que lo vigila |
| Corrector ortográfico | activo | apagado |

**Por qué el fragmento no servía.** El fallo de «Task Response» es una AUSENCIA —no se
contesta la segunda pregunta, no se da la opinión, no se compara— y una ausencia no se ve en
dos frases. Se acertaba emparejando la etiqueta con la descripción del problema, que es lo
contrario de revisar. Ahora arriba está el ensayo entero y correcto del mismo enunciado
—sale del banco de Tarea Completa, no es material nuevo— y debajo el borrador. Comparar los
dos es lo que hace visible lo que falta.

**Tercera aparición del mismo patrón:** `lesson.decisiveCheck` como respuesta, impreso en el
panel de la familia. Ya van tres módulos. Vale la pena una comprobación general.

### analisis-pregunta — CERRADA (falta correr Playwright)

El ✅ de código que tenía era falso: cubría `prompt-analysis-data.ts`, no el motor. Medido
sobre sus 20 preguntas de opción antes de tocarlo:

| | Antes | Ahora |
|---|---|---|
| Distractores distintos para 60 ranuras | **7** (dos frases genéricas, 20× cada una) | **47** |
| «Los 3 distractores ya vistos y la correcta no» | **15/15** — se acertaba eligiendo el texto nuevo | **0/15** |
| Ventaja de longitud de la correcta | hasta **+44 palabras**, en los 5 tipos | **+1** máximo |
| Secuencia de letras | C-B-A-C **idéntica en 3 de 5 tipos** | 4 secuencias, cada letra 1 vez por pestaña |
| Explicaciones por pregunta | **1** para los 3 errores | **4**, una por opción |
| Correctas impresas más arriba en la página | **20/20** (eran campos del tipo) | **0** |
| Ejercicios sobre el ejemplo ya resuelto | nivel 1 de los 5 tipos | **0** |

Cómo se arregló: `analysis-drills.ts`. Cada opción es **la respuesta real de otro enunciado
de esta misma práctica** —mismo campo, longitud parecida a propósito— y el feedback nombra
de cuál era. Equivocarse dejó de ser caer en relleno y pasó a ser confundir dos enunciados
concretos. Todas las correctas son de nivel ejemplo, nunca del tipo, que es lo que la página
imprime en el panel de familia.

Jerga fuera: «Which planning decision will control the essay?», «Position or controlling
decision», «Follow the exact route», «Recheck the requested route», «Expert comparison»,
«Identify the instruction», «Detect the missing part». Y el nivel que decía «put them in
order» encima de un cuadro de texto vacío ahora dice qué escribir.

También: `key={activeType}` en el motor —cambiar de familia dejaba el veredicto anterior
pintado sobre las opciones nuevas—, `spellCheck={false}` en las áreas de escritura, y los
dos botones del taller que estaban apagados sin decir por qué ahora lo dicen.

Guardián: `scripts/check-ielts-task2-alignment.mjs` mide las siete cosas de la tabla y para
el build. Probado que muerde con dos fallos provocados.

Playwright: `tests/e2e/ielts-task2-analisis.spec.ts`, 6 tests en verde. Recorre las 20
preguntas de los cinco tipos, falla a propósito en las tres opciones malas y exige tres
explicaciones distintas, escribe hasta el mínimo anunciado y exige que el botón se abra
exactamente ahí, y comprueba móvil 375 con la consola limpia. Probado que muerde:
reintroducido el defecto del feedback común, el test 2 falla.

Build: `npm run build` en verde, y el HTML prerenderizado ya no contiene ninguna de las seis
frases de jerga ni las dos de relleno.

### introduccion · body-1 · body-2 — CERRADAS

Código y pedagogía ya estaban ✅. La auditoría de Usuario encontró lo mismo en las tres:

| | Antes | Ahora |
|---|---|---|
| Áreas de escritura con corrector | **12** | 0 |
| Mínimos anunciados | **ninguno** — el botón se apagaba en silencio | dice cuántas palabras faltan, y el número baja al escribir |
| «Expert comparison» | 3 sitios | 0 |

**El corrector se vigila en el guardián, no en Playwright.** Es deliberado: la mitad de esas
doce áreas viven detrás de un paso bloqueado, así que un test de navegador solo comprueba
las que consiga desbloquear. El guardián lee el fuente y las ve todas, incluidas las que
alguien añada mañana. Escribirlo costó dos intentos: un regex que paraba en el primer
«mayor que» marcaba como rotas siete áreas ya corregidas, porque la flecha de `onChange`
lleva uno dentro; y luego había que aceptar también el spread `{...noAssist}`, que es mejor
código que repetir cuatro atributos seis veces.

De paso apareció una decimotercera área sin corrector en `parrafos-cuerpo`. Corregida.

### linking-language — CERRADA

El reparto de la letra ya estaba bien (usa `placeOption`; medido: A2 B1 C2 D3 en ocho
preguntas, y **7 de las 8 correctas aparecen también de distractor** en otras, así que no se
puede acertar por novedad). Lo que fallaba era otra cosa:

| | Antes | Ahora |
|---|---|---|
| Explicaciones | **9 para 32 opciones** | una por opción, nombrando qué señala cada conector |
| Pantalla final | «Dominio excelente — **nivel Band 8**» por 14/16 | dice que ocho conectores no son una banda |
| «Band 8 technique» en una explicación | sí | fuera |
| Idioma | mezclado | inglés entero, con un test que lo vigila |

**Una sospecha mía que resultó infundada, y conviene dejarla escrita.** Creí que la rama de
fallo era inalcanzable porque el primer error no revela nada. No es así: el primer error da
una pista y ofrece reintentar, y el segundo bloquea la pregunta y enseña el análisis. Estaba
bien construido; el fallo era de mi test, que hacía un solo clic.

#### Segunda vuelta — reconstruida entera (aprobada por David)

Con las cuatro auditorías pasadas, la unidad seguía siendo **una sola página que asumía que
ya sabías**: «la estructura no es como la de los demás, deberíamos acá explicar cómo se usan,
mostrar ejemplos, y dar ejercicios y luego el motor». Se rehízo con la forma de las familias
de tipos de pregunta.

| | Antes | Ahora |
|---|---|---|
| URLs | 1 | **hub + 9 familias**, cada una crawleable, en el `sitemap` |
| Familias | 7 | **9** — se añadieron `condition` y `correlative` (`either … or`, `neither … nor`, `both … and`) |
| Orden de cada familia | ejercicio directo | qué hace → cómo se usa → conectores uno a uno → ejemplos → errores típicos → ejercicios → motor |
| Motor progresivo | no existía | **6 niveles**, de elegir un conector a construir el párrafo |

**SEO.** Las nueve rutas apuntan a quien busca conectores en general, no solo a quien prepara
IELTS: es el tráfico que pedía David («que aporte mucho valor... en SEO también para la gente
que necesite conjunciones en general»).

**Tres correcciones de David sobre el motor, y lo que enseñaron.** Las tres eran el mismo
error de fondo: yo sacaba el trabajo fuera del texto.

1. **El nivel 5 delataba la respuesta.** Los conectores rotos salían en amarillo y el correcto
   en azul: «ya me estás diciendo cuáles están mal, no tiene sentido». Ahora los cuatro se ven
   idénticos —hay un test que compara sus clases CSS— y hay que leer el párrafo.
2. **Los huecos vivían en tarjetas «Gap 1 / Gap 2» debajo.** «No hay necesidad de las tarjetas,
   se debe escribir sobre el mismo blank space.» Elegir un conector es una decisión sobre un
   punto concreto de un texto; sacarla a un formulario aparte rompe lo que se está enseñando.
3. **Escribir abría un cuadrito con una caja de texto dentro.** «No despliegas nada al hacer
   click, se escribe ahí directamente.» El hueco de escribir es ahora un `input` en el propio
   párrafo.

De la tercera salió además un fallo que no era mío pero sí real: el panel llevaba
`overflow: hidden` y **recortaba la lista de opciones** contra su borde («queda cortado»). El
test que lo vigila pulsa la última opción, que era justo la que desaparecía.

**Lo que se acepta como acierto.** Cualquier conector de la familia correcta, no solo el que
escribió el redactor. Lo pidió David y tiene razón pedagógica: exigir la palabra exacta enseña
a adivinar la palabra, no a entender la relación. Cuatro de los seis niveles aceptan texto
escrito y aun así se corrigen de verdad — no choca con la regla de no evaluar texto libre,
porque la respuesta es **una palabra de un conjunto cerrado**, no una redacción.

---

### tipo-ensayo — CERRADA

La unidad que el propio inventario marcaba como prioritaria. Nada de lo que fallaba se veía
leyendo el fichero; salió todo de medirlo.

| | Antes | Ahora |
|---|---|---|
| Posición de la respuesta correcta | **`0 1 2 3 4`** en las cinco primeras — se acertaban sin leer el enunciado | `2 0 4 1 3 0 2 4 3 1`, dos por categoría, sin escalera |
| Pistas que imprimían el nombre del tipo | **5 de 9** | **0 de 10** |
| Feedback por opción | ninguno: el mismo párrafo para las cinco | **40 mensajes**, uno por opción equivocada y enunciado |
| Insignia de dificultad | salía de `qIdx < 4`; **2 preguntas mal pintadas** | sale del dato |
| Menciones de banda | **20** | 0 |
| Guías de los cinco tipos en la página | **2** —la compartida en inglés y una copia en español que decía otra cosa— | 1 |
| Enunciados · casos de análisis | 9 · 2 | **10 · 3** |
| Idioma | 65 líneas de español en pantalla | inglés entero, con un test que lo vigila |

**Por qué los cinco botones NO se barajan, y por qué eso no es una excepción a la regla.** En
el resto del curso las opciones son textos distintos en cada ejercicio: hay que barajarlas o
la posición delata. Aquí las opciones son siempre las mismas cinco categorías, así que moverlas
obliga a releer cinco etiquetas conocidas sin enseñar nada. Lo que delataba no era el orden de
los botones sino **el de las preguntas**, y eso es lo que se rompió. La compuerta mide las dos
cosas: que la correcta no recorra la rejilla en escalera y que las cinco posiciones salgan
igual de veces.

**El segundo intento tiene que ser un intento.** Cinco pistas de nueve decían el nombre del
tipo correcto y aun así el acierto sumaba un punto. Ahora una pista dice **dónde mirar** —«lee
solo las dos preguntas del final y di qué te pide producir cada una»— y el guardián falla si
alguna contiene el nombre de su respuesta.

**Los dos mordiscos.** Se reintrodujeron los dos defectos a propósito y la compuerta los cazó:
la escalera («recorre la rejilla en escalera durante 5 preguntas seguidas») y la pista
delatora («la pista imprime “Problem & solution”»). También cazó dos defectos míos mientras
escribía: dos opciones con mensaje demasiado corto para explicar nada, y dos promesas de banda
que se me colaron en los comentarios.

---

### parrafos-cuerpo — CERRADA

El defecto principal no era ninguno de los tres que decía el inventario.

| | Antes | Ahora |
|---|---|---|
| Diagnóstico | **4 observaciones, las 4 verdaderas**; el campo `correct` no lo leía nadie | **7 observaciones, 3 señuelos**; marcarlo todo ya no aprueba |
| Botón de ensamblar | bloqueado en silencio bajo 15 caracteres | mínimo anunciado antes de escribir y **cuántas palabras faltan**, caja por caja |
| Menciones de banda | **11** | 0 |
| Etiquetas T/E/E/L del diagnóstico | de un array indexado por posición | del propio dato |
| Tabla Body 1 / Body 2 | copia en español de lo que ya dice `ESSAY_TYPES` | derivada de `ESSAY_TYPES` |
| Ejemplo resuelto | una comparación plegada tras un clic | **watch one**: párrafo flojo y bueno del mismo enunciado, bloque a bloque, con lo que cambió |
| Título y descripción SEO | prometían **PEEL**; la página enseña **TEEL** | TEEL |
| Idioma | 41 líneas de español en pantalla | inglés entero, con un test que lo vigila |

**Un ejercicio de detectar defectos donde todo lo que se ofrece ES un defecto no detecta
nada.** Las cuatro observaciones eran las cuatro correctas y pulsarlas todas era la solución;
la página respondía «¡Excelente, identificaste los 4 problemas!». Ahora hay tres señuelos, y
no son cualquier cosa: son exactamente lo que dice un estudiante cuando ve un párrafo flojo y
no sabe qué mirar —que es corto, que no toma partido, que le faltan conectores—. Descartarlos
es la mitad del ejercicio.

**Los tres mordiscos.** La compuerta cazó los tres defectos reintroducidos a propósito:
diagnóstico sin señuelos, caja sin mínimo declarado, y dos observaciones compartiendo
explicación. También cazó dos promesas de banda que se me habían colado en los comentarios.

---

### Las 5 rutas por tipo — RECONSTRUIDAS COMO RECORRIDO

Idea de David, mirando el inventario: «cojamos las partes que ya tenemos ahí, de opinión, y
las ponemos en opinión como bloques de lego… para no tener que volver a construir». Se puede,
y se comprobó antes de mover nada: **los cinco módulos están indexados por los mismos cinco
identificadores**, así que la rebanada vertical de un tipo existe entera y ya está auditada.

| | Antes | Ahora |
|---|---|---|
| Código | **5 clientes de ~362 líneas casi idénticos** (1.815 en total) | **1 componente compartido** + los datos de su ejercicio |
| Qué enseñaba la página | una lección corta que repetía por su cuenta lo que el curso ya explica | el **camino entero** filtrado a ese tipo: leer el enunciado → introducción → Body 1 → Body 2 → conclusión → conectores → ensayo terminado |
| De dónde sale el contenido | escrito aparte | **de la fuente, en tiempo de render** |
| Español en pantalla | 21-31 líneas por ruta | 0 en el contenido de IELTS |
| Promesas de banda | 2-3 por ruta | 0 |

**El defecto que solo se vio abriendo la página.** David: «el usuario va a llegar de una vez,
va a haber una respuesta y no sabe cómo llegamos a esa respuesta… no entiendo cuál es la
transición». Tenía razón y la causa era peor de lo que parecía: **cada paso enseñaba SU primer
ejemplo, y esos ejemplos son enunciados distintos**. Se leía el enunciado A y justo debajo la
introducción del B. No había transición porque no había nada que conectar.

Ahora la página **hila un solo enunciado**, elegido midiendo cuál comparten más módulos:

| Tipo | Cobertura del hilo |
|---|---|
| opinion · problem-solution · advantages-disadvantages · direct-questions | **5 de 5 módulos** |
| discussion | **3 de 5** — y la página lo dice en los dos pasos que se salen |

Y antes de cada párrafo va la cadena: **qué obliga el enunciado → qué decides → qué sale de
ahí**. Los tres campos ya existían en los módulos (`instruction`, `plan`, `paragraphJob`,
`map.bodyRoute`) y nadie los estaba pintando.

**Dos arreglos de forma que salieron del mismo repaso.** El enunciado se muestra con su
**instrucción marcada** —«podríamos nosotros apoyar, subrayando cosas»—, porque las últimas
palabras deciden la forma del ensayo y son las que todo el mundo se salta. Y los enlaces de
«ir a practicarlo entero» se veían como texto suelto: `.workshopActions button` no alcanzaba a
los `<a>`. Corregido en el módulo CSS compartido, así que se corrigió en todas las unidades.

**Lo que NO se traduce.** El FAQ de cada ruta se queda en español, decidido con David: responde
a lo que un estudiante colombiano escribe en Google y alimenta el resultado enriquecido. El
contenido de IELTS va entero en inglés, y hay un test que separa las dos cosas.

**Una nota para el punto abierto de los motores.** `map.bodyRoute` guarda notas de redacción
—«wellbeing.», «depth of learning.»—, no frases. Aquí se envuelven en la oración que las
explica. Es el mismo defecto que arrastra `analisis-pregunta` en sus opciones, el que David
señaló con «no entiendo las opciones».

---

### model-answers — CERRADA

| | Antes | Ahora |
|---|---|---|
| Ensayos modelo | **5 escritos a mano, y ninguno existe en el banco de 25** | los **25 del banco**, con pestañas por familia |
| Relación con el curso | ninguna: no salían de ningún módulo ni llevaban a ninguno | cada ensayo es el del enunciado que trabajaste en Body 1 |
| Comparación flojo/fuerte | 2 pares, explicación en español | **3 pares** en inglés, con el criterio que faltaba |
| Lista de comprobación | 6 consejos | **5 preguntas** con respuesta sí/no y su motivo |
| Promesas de banda | 3 | 0 |
| Idioma | 49 líneas en español | inglés entero |

**Dos juegos de modelos en el mismo curso.** Los del banco están compuestos con los párrafos
que el alumno trabaja en `body-1`, `body-2` y `conclusion`; los cinco de esta página no salían
de ninguna parte. Se quedan los 25 y se conserva lo que esta página sí aportaba —la comparación
de frases y la lista final—, que no está en ningún otro módulo.

**El criterio que faltaba en la comparación.** Se añadió el que decide de verdad: *si cambias
el sustantivo de la frase y sigue funcionando, no está respondiendo a este enunciado*. Es la
comprobación más rápida que hay contra el ensayo memorizado.

**La lista son preguntas, no consejos.** «¿Responde la introducción a la instrucción exacta, y
no al tema?» se puede contestar sí o no mirando tu propia hoja; «sé específico» no. Hay un test
que falla si alguna deja de acabar en interrogante.

**Un defecto que solo salió al probarlo.** `watchFor` son TRES avisos, y pintados como
`{essay.watchFor}` React los pega sin separación: «…not against standards or feedback.Repeating
the durable-learning argument…». Cada uno va ahora en su línea.

---

## Inventario de las subhabilidades restantes

Medido, no estimado. Ninguna se ha reconstruido: esto es el diagnóstico que pedía el tablero.

| Unidad | Estado | Qué le falta |
|---|---|---|
| ~~`tipo-ensayo`~~ | **reconstruida** | cerrada arriba: 10 enunciados, 3 casos, 40 mensajes por opción, 0 promesas de banda |
| ~~`parrafos-cuerpo`~~ | **reconstruida** | cerrada arriba: diagnóstico con señuelos, mínimos anunciados, 0 promesas de banda |
| ~~`model-answers`~~ | **reconstruida** | cerrada arriba: los 25 del banco, 0 promesas de banda |
| ~~las 5 rutas por tipo~~ | **reconstruidas** | cerradas arriba: un solo componente, el camino entero armado con la fuente |

**Duplicadas:** ninguna. Las cinco rutas por tipo no repiten los talleres; son la vista por
familia.

**Pendientes de integración:** las cinco por tipo no enlazan con el banco de 25 enunciados
que ahora existe en `tarea-completa`, así que enseñan sus propios ejemplos sueltos.

**Prioridad si se sigue:** nada. Las once unidades están cerradas.

---

## El patrón que apareció tres veces

En tres módulos distintos la respuesta correcta era **un campo del TIPO que la propia página
imprime unos centímetros más arriba**:

| Módulo | Campo usado de respuesta | Dónde se imprime |
|---|---|---|
| `analisis-pregunta` | `lesson.signal`, y el checklist entero | «Instruction signal», «Must answer / Body 1 / Body 2» |
| `conclusion` | `lesson.function` (vía `conclusionJob`) y `lesson.trap` (vía `commonMistake`) | «Conclusion function», «Common trap» |
| `revision-final` | `lesson.decisiveCheck` | «Decisive check» |

Y en `conclusion-data.ts`, dos campos declarados por ejemplo son constantes de familia:

```
conclusionJob:  lessonMeta[source.id].function
commonMistake:  lessonMeta[source.id].trap
```

No es casualidad: es cómo están construidos estos datos. **Regla para lo que quede:** la
respuesta correcta de un ejercicio sale siempre del EJEMPLO, nunca del tipo, y hay que
comprobar que el campo del ejemplo no sea un alias de uno del tipo. Medirlo después de cada
cambio, porque las dos primeras veces el arreglo no arregló nada y solo se vio al medir.

---

## Reglas del loop

- **No commitear ni publicar sin aprobación explícita.** Entregar URLs locales.
- **Rutas explícitas al hacer `git add`.** Nunca `-A` ni `.`: hay otra sesión en el mismo
  árbol. No tocar `src/data/practica/vocabulario/`, `VocabularyJourney.tsx`,
  `practica/*/vocabulario/`, `check-vocabulario.mjs`, `vocab-corpus-index.mjs`,
  `docs/vocabulario-*.md` ni `.claude/skills/validar-vocabulario/`.
- **Avisar antes de tocar** `package.json` o `scripts/check-practica-catalog.mjs`.
- **Medir, no estimar.** Cada afirmación sobre sesgo o cobertura va con su número.
- **Una unidad por iteración.** Cerrar del todo antes de pasar a la siguiente.
- Al terminar cada iteración, **actualizar el tablero** de este documento.

## Condición de salida — CUMPLIDA

Las ocho unidades con taller o motor tienen las cuatro casillas en ✅. La novena fila
—subhabilidades— era de auditar, no de reconstruir, y su inventario está arriba.

- **90 tests de Playwright en verde** (6 ficheros), en móvil (375) y escritorio.
- La compuerta `check:ielts-task2` pasa suelta. `npm run build` está en rojo por
  `check:vocabulario` («o'clock» en inglés A1), que es de **otra sesión** y no se ha tocado.
- El guardián de Task 2 mide ahora: emparejamiento por posición, longitud, distractores
  reciclados, respuesta impresa arriba, un mensaje por opción, reparto de la letra correcta,
  25 enunciados con modelo de 4 párrafos y 250+ palabras, y ningún corrector ortográfico.

### Qué revisar a mano

| Ruta | Qué mirar |
|---|---|
| `/task2/tarea-completa` | Elige una familia, escribe cuatro palabras y pulsa terminar: el botón existe y dice qué pierdes. Mira el modelo completo al final |
| `/task2/conclusion` | El ensayo entero está arriba. Acierta los dos pasos y fíjate en qué se subraya |
| `/task2/revision-final` | El ensayo correcto arriba, el borrador debajo. Falla a propósito: cada opción explica lo suyo |
| `/task2/analisis-pregunta` | Falla tres veces distintas en el nivel 1 y compara las tres explicaciones |
| `/task2/linking-language` | El motor: nivel 5 (los cuatro conectores se ven iguales) y nivel 6 (ordena y sale el párrafo con su hueco dentro) |
| `/task2/linking-language/contrast` | Una familia entera: explicación → conectores → ejemplos → errores → ejercicios |

### Lo que queda, y es decisión tuya

1. **La introducción enseña sobre 9 enunciados que no existen en el resto del curso.** Es
   una decisión de contenido: alinearlo es reescribir 9 introducciones ya aprobadas.
2. **`tipo-ensayo`** tiene 4 promesas de banda y lógica de acierto sin barajado.
3. **El idioma de las 8 subhabilidades restantes**: ~25 líneas de español cada una.
4. **Repaso de comprensión de los nueve motores.** Lo pidió David con la unidad de análisis
   delante: «no entiendo las opciones, y si yo no entiendo probablemente la gente tampoco...
   los motores de cada sección no pueden confundir». El sospechoso conocido es
   `analisis-pregunta`, cuyas opciones salen de `example.instruction` — notas de redacción,
   no frases escritas para que las lea un estudiante.

### Fuera del alcance de Task 2, pero visto aquí

Un test cazó un error de consola que sale en **todas** las páginas del sitio (comprobado en
`/home`, `/practica` y el hub de Task 2, aunque es intermitente): el CSP bloquea
`unpkg.com/meta-capi-param-builder-clientjs`, un tag de Meta publicado en GTM.

**No añadir `unpkg.com` al `script-src`**: no es un dominio de Meta, es el CDN público de npm,
y autorizarlo abre el registro entero como origen de scripts en todo el sitio. La salida es
pausar el tag en GTM, o auto-hospedar el bundle en `/public` como se hizo con los vídeos de
Celpe-Bras. Queda en manos de David — el contenedor de GTM está fuera del repositorio.
