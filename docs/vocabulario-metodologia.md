# Metodología de vocabulario — 8 idiomas × A1–B1

Documento de método, previo al código. Define **cómo se estudia, se repasa y se afianza** el
vocabulario de un nivel, qué se considera "saber una palabra", cuántas palabras entran, cómo se
eligen, y qué cambia en cada idioma. El código que venga después implementa esto; no al revés.

Medido el 7 de agosto de 2026 sobre `main` + rama actual.

> **Decisiones tomadas (7 ago 2026).** Tres quedan cerradas y mandan sobre el resto del documento:
> 1. **Núcleo productivo de 300 / 350 / 400** por nivel — 1.050 palabras activas al terminar B1.
> 2. **B1 se re-tematiza por función discursiva**, no repite las situaciones de A2 (§5b).
> 3. **El audio va al final.** Se generará con **ElevenLabs** (API ya instalada) en la última fase,
>    cuando el catálogo esté cerrado. Hasta entonces el ejercicio de audio se apoya en el corpus de
>    escucha, que ya está grabado.

---

## 0. Qué hay hoy

Las 24 rutas `/practica/<idioma>/<nivel>/vocabulario` **ya existen y ya tienen contenido**. No
partimos de cero: partimos de algo que funciona a medias y no enseña de forma acumulativa.

| Idioma | A1 | A2 | B1 | total |
|---|---:|---:|---:|---:|
| Inglés | 60 | 80 | 80 | 220 |
| Alemán | 60 | 80 | 80 | 220 |
| Francés | 60 | 80 | 80 | 220 |
| Portugués | 60 | 80 | 80 | 220 |
| Italiano | 80 | 80 | 80 | 240 |
| Coreano | 80 | 80 | 80 | 240 |
| Japonés | 80 | 80 | 80 | 240 |
| Ruso | 80 | 80 | 80 | 240 |
| **Total** | **560** | **640** | **640** | **1.840** |

### Los cinco defectos reales

1. **No hay método, hay listas.** Se ve una tarjeta, se voltea, se pasa a la siguiente. No hay
   calendario de repaso, no hay dificultad creciente, no hay noción de "esta palabra ya la
   dominas". Mañana el estudiante empieza de cero en la misma pantalla.

2. **El motor de repaso espaciado ya está escrito y nadie lo usa.**
   [`src/lib/icfes/srs.ts`](src/lib/icfes/srs.ts) implementa Leitner de 6 cajas con intervalos
   `[0, 1, 3, 7, 16, 45]` días, grados `again/good/easy` y estado `mastered`.
   [`src/lib/actions/vocabulary.ts`](src/lib/actions/vocabulary.ts) lo persiste en Supabase
   (`icfes_vocabulary_progress`) y arma sesiones de 10 palabras nuevas + vencidas, tope 20.
   Está atado a las 48 palabras de ICFES. **Ninguna de las 24 rutas A1–B1 lo toca.**

3. **Ocho formas de datos distintas y tres interfaces distintas.** Cada `Content.tsx` (268–435
   líneas) inventó su propio esquema: `VocabWord` con `word/es/emoji/example/pronunciation` en
   inglés A1, `Word` con `id/en/phonetic/es` en inglés B1 —que perdió el ejemplo por el camino—,
   `romanization` en coreano, `romaji` en japonés, `translit` en ruso, `gender` solo en alemán.
   Los modos también divergen: inglés no tiene ninguno, cuatro idiomas en A1 usan
   `browse|flashcard|quiz`, el resto `flashcard|mcq|fillblank`. Todo hardcodeado dentro del
   componente, sin capa de datos.

4. **B1 no se distingue de A2.** Los ocho títulos temáticos de B1 son los de A2 con otro adjetivo:
   Trabajo, Tecnología, Salud, Medio ambiente, Viajes, Sociedad, Educación, Emociones. Mismo eje,
   mismo tamaño (80). Un estudiante que suba de nivel ve la misma pantalla con otras palabras.

5. **`mi-vocabulario` no repasa.** Guarda palabras en `localStorage`
   ([`src/lib/progress.ts`](src/lib/progress.ts) → `saveWord`/`getSavedWords`) y las muestra como
   tarjetas planas. Es una lista de favoritos, no un cuaderno de estudio.

### El activo que ya está pagado y no se está cobrando

El corpus de escucha —480 episodios— **ya contiene el vocabulario receptivo del nivel, ya
grabado**. Formas ortográficas distintas por serie, según `scripts/audit-listening-content.mjs`:

| Idioma | A1 | A2 | B1 |
|---|---:|---:|---:|
| Alemán | 444 | 584 | 668 |
| Ruso | 437 | 578 | 790 |
| Italiano | 456 | 526 | 705 |
| Coreano | 389 | 542 | 761 |
| Portugués | 357 | 531 | 672 |
| Inglés | 353 | 569 | 600 |
| Francés | 346 | 505 | 621 |
| Japonés | 310 | 402 | 455 |

> Son **formas** (tipos ortográficos), no lemas: `habla`, `hablas` y `hablé` cuentan tres. En
> japonés el conteo es poco fiable porque el script separa por espacios y el japonés apenas los
> usa. Sirve como orden de magnitud, no como cifra de lemas.

Aun descontando flexión, cada idioma tiene ya del orden de **1.000–1.500 lemas distintos dichos en
voz alta y traducidos** repartidos por A1–B1. Ese es el cinturón receptivo del método: no hay que
producirlo, hay que **cosecharlo y enlazarlo**.

---

## 1. El principio: una palabra no se "sabe", se sube por grados

El error de fondo de todo el vocabulario actual es binario: la sabes o no la sabes. Nadie aprende
así. Definimos cinco grados, y el motor debe saber en cuál está cada palabra de cada estudiante.

| Grado | Nombre | Qué significa | Cómo se demuestra |
|---|---|---|---|
| **G0** | Sin ver | Nunca apareció | — |
| **G1** | La reconozco | La ve/oye en L2 y saca el significado | Opción múltiple L2 → español |
| **G2** | La produzco | Del español saca la palabra | Escribirla: español → L2 |
| **G3** | La uso bien | La produce **con su forma correcta**: género, plural, caso, partícula, contador, colocación | Rellenar hueco en una frase, forma flexionada exacta |
| **G4** | Es mía | Aparece sin buscarla en lo que escribe o dice | Frase propia evaluada / aparición en escritura |

**La riqueza lexical que el estudiante percibe es el ancho de su banda G3–G4, no el número de
tarjetas vistas.** Una persona con 300 palabras en G3 habla mejor que una con 1.500 en G1. Esto
manda sobre todas las decisiones de abajo.

### La regla que ata los grados al motor que ya existe

Hoy el SRS pregunta lo mismo siempre: la caja solo decide *cuándo* vuelve la palabra. La
metodología añade el segundo eje: **la caja también decide *qué se pregunta*.**

| Caja | Intervalo | Ejercicio que toca | Grado que verifica |
|---:|---:|---|---|
| 0 | mismo día | Ver forma + significado + ejemplo con audio | G0 → G1 |
| 1 | 1 día | Opción múltiple L2 → español | G1 |
| 2 | 3 días | Escribir: español → L2 (con inicial de ayuda) | G2 |
| 3 | 7 días | Escribir sin ayuda, **forma marcada exigida** (artículo, acento, partícula) | G3 |
| 4 | 16 días | Hueco en frase real tomada del corpus de escucha del nivel | G3 en contexto |
| 5 | 45 días | Frase propia (escrita o hablada) usando la palabra | G4 → `mastered` |

Los intervalos, los grados `again/good/easy` y el descenso a caja 0 al fallar **ya están
implementados** en `srs.ts`. Lo único que falta es esta tabla: ligar tipo de ejercicio a caja. Es
la pieza que convierte un mazo de tarjetas en un método.

Corolario: **`mastered` deja de significar "acertó una tarjeta"** y pasa a significar "la usó en
una frase propia 45 días después de conocerla". Eso sí es afianzar.

---

## 2. El ciclo de cinco momentos

Todo el vocabulario del sitio, en los 8 idiomas, pasa por la misma secuencia. Es el motor común.

**1. Encuentro — la palabra llega en contexto, nunca sola.**
Primera exposición dentro de una frase con audio, no como par `palabra = traducción`. El corpus de
escucha ya da esas frases. Si una palabra no puede presentarse en una frase del nivel, no entra al
catálogo (ver §5).

**2. Anclaje — se fija la forma completa, no el significado suelto.**
Aquí es donde los idiomas dejan de parecerse (§6). Anclar *der Schlüssel, die Schlüssel* no es lo
mismo que anclar *ключ (llave, gen. ключа́, acento móvil)* ni que anclar *열쇠 [yeolsoe] + 개 como
contador*. El anclaje incluye siempre la marca gramatical obligatoria del idioma.

**3. Recuperación — se saca de la memoria, con dificultad creciente.**
Reconocer → producir → producir con forma correcta → producir en contexto. La tabla de §1. Nunca
dos sesiones seguidas con el mismo tipo de pregunta para la misma palabra.

**4. Reencuentro — vuelve cuando está a punto de olvidarse.**
Leitner `[0, 1, 3, 7, 16, 45]`. Fallar la devuelve a caja 0: se vuelve a ganar el terreno, no se
"perdona". Una palabra necesita del orden de **8 a 12 encuentros con recuperación real** para
quedarse; las seis cajas más las apariciones en escucha/lectura cubren esa horquilla.

**5. Uso propio — la única puerta a G4.**
La palabra no se da por dominada hasta que el estudiante la mete en una frase suya. Este momento
conecta vocabulario con `escritura` y `habla`, y es lo que impide que el estudiante acumule
reconocimiento pasivo y siga sin poder hablar.

---

## 3. Cuánto: núcleo productivo y cinturón receptivo

No se persigue "2.500 palabras" como cifra de marketing. Se separan dos cosas que hoy están
mezcladas y que cuestan producir cosas muy distintas:

- **Núcleo productivo** — palabras curadas que **deben** llegar a G3. Llevan ficha completa:
  marca gramatical, ejemplo propio, colocaciones, audio. Son las que se drillean.
- **Cinturón receptivo** — palabras que basta con reconocer (G1–G2). **No se drillean**: se
  encuentran en escucha y lectura, y se pueden guardar a `mi-vocabulario` con un toque.

| Nivel | Núcleo nuevo | Núcleo acumulado | Cinturón nuevo | Expuesto acumulado |
|---|---:|---:|---:|---:|
| A1 | 300 | 300 | 250 | 550 |
| A2 | 350 | 650 | 400 | 1.300 |
| B1 | 400 | 1.050 | 700 | 2.400 |

**Estas cifras están calibradas contra los listados oficiales**, no inventadas (fuentes y detalle
por idioma en [`vocabulario-blueprints.md`](vocabulario-blueprints.md)):

| Referencia oficial | A1 | A2 | B1 |
|---|---:|---:|---:|
| Goethe-Zertifikat, Wortlisten (alemán) | ~650 | ~1.300 | ~2.400 |
| Лексический минимум ТРКИ (ruso) | 780 | ~1.300 | 2.300 |
| FLElex / referenciales FLE (francés) | 500 | 1.000 | 2.000 |
| **Nuestro expuesto acumulado** | **550** | **1.300** | **2.400** |

> El dato que más pesa viene del Goethe-Institut: de los ~650 lemas de su lista A1, **cerca de la
> mitad debe estar disponible como vocabulario activo**. Eso son ~325 palabras productivas en A1 —
> nuestro núcleo de 300 es exactamente esa figura, obtenida por otro camino. La separación entre
> núcleo productivo y cinturón receptivo no es un invento nuestro para abaratar el trabajo: es
> cómo está construida la lista oficial de examen más explícita que existe.

El núcleo productivo de 1.050 al terminar B1 es deliberadamente más pequeño que el total expuesto:
es lo que una persona puede tener realmente *activo*. La investigación de Laufer y Webb es dura en
esto — la brecha entre conocimiento receptivo y productivo **se ensancha** conforme sube el nivel,
y el vocabulario pasivo puede tardar muchísimo en activarse, o no activarse nunca. Por eso el
núcleo se drillea hasta G3 en vez de confiar en que la exposición lo active sola.

**Dónde estamos:** el núcleo productivo por idioma está hoy en 220–240 palabras frente a 1.050.
Alrededor del **22 %**. El cinturón receptivo, en cambio, ya está producido y grabado (§0); lo que
falta ahí no es contenido, es enlazado.

---

## 4. El calendario: cómo se ve una semana y cuánto dura un nivel

**Unidad = 10 palabras** de un mismo tema. Coincide con el tamaño de bloque actual y con
`NEW_PER_SESSION = 10`, ya codificado.

**Sesión diaria ≈ 12 minutos.** 10 palabras nuevas + todas las vencidas, tope 20 tarjetas
(`SESSION_MAX = 20`, ya codificado). Si hay más vencidas que cupo, **las vencidas ganan**: nunca se
introduce material nuevo dejando atrás una deuda de repaso.

**Semana tipo:**

| Día | Qué pasa |
|---|---|
| 1–5 | Una unidad nueva al día (10 palabras) + repasos vencidos |
| 6 | Cierre: sin palabras nuevas. Solo recuperación mezclada de la semana + **una tarea productiva** (escribir o grabar 5 frases con palabras en caja 4–5) |
| 7 | Sin drill. Un episodio de escucha del nivel, con las palabras de la semana marcadas al aparecer |

50 palabras nuevas por semana. Duración del núcleo:

| Nivel | Núcleo | Semanas |
|---|---:|---:|
| A1 | 300 | 6 |
| A2 | 350 | 7 |
| B1 | 400 | 8 |

**A1 → B1 de núcleo productivo: 21 semanas** (~5 meses a 12 min/día). Es una promesa concreta y
defendible, y es lo que debe decir la página.

**Cierre de nivel.** Al terminar, una **prueba de riqueza léxica** que mide producción, no
reconocimiento: N huecos en contexto + una tarea escrita corta puntuada por cuántas palabras del
núcleo aparecen bien usadas. Se aprueba el nivel con **≥ 80 % del núcleo en G3 o superior**. El
porcentaje es lo que ve el estudiante en su panel, no "palabras vistas".

---

## 5. Cómo se elige una palabra

Cinco criterios, en orden. Una palabra entra al núcleo si gana en varios, no solo en uno.

1. **Frecuencia.** Banda alta del corpus de referencia del idioma. Una palabra fuera de las ~3.000
   más frecuentes no pertenece al núcleo de B1, por bonita que sea.
2. **Rendimiento.** Cuánto abre: familias derivadas, compuestos, colocaciones. En alemán y en
   coreano/japonés este criterio pesa más que la frecuencia bruta (§6).
3. **Cobertura de situaciones del nivel.** Debe servir a un descriptor "puedo hacer X" del nivel,
   no a un tema decorativo.
4. **Relevancia de examen.** Goethe (A1–B1), DELF, CILS, CELPE-Bras, TOPIK I–II, JLPT N5–N4,
   TORFL, IELTS/ICFES en inglés. WeLearn vende preparación de exámenes: el núcleo debe pagarlos.
5. **Enseñabilidad.** A1 concreto y representable; B1 admite abstracto y valorativo.

### Vetos — reglas que rechazan una palabra

- **Sin ejemplo propio del nivel, no entra.** Nada de ejemplos que usan gramática de dos niveles
  más arriba.
- **Sin su marca gramatical obligatoria, no entra.** Un sustantivo alemán sin artículo y plural es
  un dato incompleto, no una palabra. Igual el acento en ruso, el contador en coreano y japonés,
  el género en las románicas.
- **Si no aparece en el corpus de escucha o lectura del mismo nivel, o no se puede añadir ahí, no
  entra.** Esta regla es la que impide que el vocabulario vuelva a ser una isla.
- **Una palabra vive en un solo nivel.** Nada de repetir entre A1, A2 y B1. Lo que se repite son
  los repasos, no el catálogo.
- **B1 no puede reusar el eje temático de A2.** A2 organiza por *situaciones* (viajar, comprar,
  ir al médico); B1 organiza por *función discursiva*: opinar y matizar, comparar y contrastar,
  causa y consecuencia, narrar experiencia, hipótesis, valoración. Ese cambio de eje es lo que hace
  que B1 se sienta un nivel distinto y no una lista más larga.

---

## 5b. El mapa de bloques — los tres niveles, decididos

Cada nivel cambia de **eje organizador**. Ese es el motivo por el que subir de nivel se siente
como subir de nivel, y no como recibir una lista más larga.

| Nivel | Eje | Palabras | Unidades de 10 | Bloques |
|---|---|---:|---:|---:|
| A1 | **Entorno inmediato** — lo concreto y representable | 300 | 30 | 10 × 3 unidades |
| A2 | **Situaciones** — transacciones y relatos cotidianos | 350 | 35 | 10 (5 de 4 unidades + 5 de 3) |
| B1 | **Función discursiva** — lo que quieres *hacer* al hablar | 400 | 40 | 8 × 5 unidades |

> A2 reparte 35 unidades entre 10 bloques: cinco bloques de 4 unidades y cinco de 3. El reparto
> exacto lo fija Zhanna por peso de examen.

### A1 — 10 bloques (identidad y entorno)

1. Yo y mi gente — identidad, familia
2. Números, hora y calendario
3. Casa y objetos cotidianos
4. Comida y bebida
5. Cuerpo, salud básica y sensaciones
6. Ropa, colores y descripción física
7. Ciudad, lugares y direcciones
8. Rutina diaria y verbos de acción básicos
9. Estudio y trabajo
10. Cortesía y supervivencia — saludar, pedir, disculparse, «no entiendo»

El bloque 10 es innegociable en A1: es el que permite sobrevivir a una conversación real y hoy no
existe en ninguno de los ocho idiomas.

### A2 — 10 bloques (situaciones)

1. Viajes y transporte
2. Trabajo y empleo
3. Compras, dinero y trámites
4. Salud y consulta médica
5. Describir personas y carácter
6. Comer fuera y restaurante
7. Casa, barrio y convivencia
8. Tecnología y comunicación
9. Ocio, planes y tiempo libre
10. Clima, naturaleza y entorno

Es en esencia el mapa que ya existe hoy en A2, que está bien planteado. Lo que cambia es el
tamaño (de 80 a 350) y la ficha de cada palabra.

### B1 — 8 bloques (función discursiva) — **reescritura completa**

| # | Bloque | Qué léxico agrupa |
|---|---|---|
| 1 | **Opinar y matizar** | Verbos de opinión, adverbios de grado, atenuadores, «hasta cierto punto» |
| 2 | **Comparar y contrastar** | Comparativos, léxico de semejanza/diferencia, conectores adversativos |
| 3 | **Causa y consecuencia** | Explicar por qué, léxico de motivo, efecto, resultado, factor |
| 4 | **Narrar experiencia** | Secuencia temporal, anécdota, reacción, léxico de relato en pasado |
| 5 | **Hipótesis y consejo** | Imaginar, especular, sugerir, advertir, condicionales |
| 6 | **Acuerdo, desacuerdo y negociación** | Aceptar, objetar, ceder, proponer, quedar en algo |
| 7 | **Procesos, cambios y tendencias** | Aumentar, descender, estabilizarse, fases, evolución |
| 8 | **Sociedad y abstracción** | Educación, medio ambiente, tecnología y trabajo tratados como campos léxicos abstractos, no como situaciones |

Los ocho bloques están elegidos para pagar dos cosas a la vez: la producción oral y escrita de B1
(Goethe B1 *Sprechen*, DELF B1 *production orale*, CILS, CELPE-Bras, TOPIK II 쓰기) y el examen de
inglés que ya vendemos —el bloque 7 es directamente el léxico de IELTS Writing Task 1.

**Consecuencia de obra:** B1 se reescribe entero en los ocho idiomas. Las 640 palabras actuales de
B1 no se tiran: las que sigan siendo válidas se reubican en el bloque que les corresponda, y las
que sean duplicado de A2 se eliminan (regla de veto: una palabra vive en un solo nivel).

---

## 6. La capa por idioma

Aquí está la parte que **no** se puede compartir. El ciclo de §2 es el mismo para los ocho; lo que
cambia es **qué hay que anclar**, **qué ejercicio no puede faltar** y **qué campos obligatorios**
lleva la ficha. Para un hispanohablante los ocho caen en tres familias con problemas distintos.

### Grupo A — Transparentes: portugués, italiano, francés

El hispanohablante entiende mucho desde el día uno. El cuello de botella **no es la cantidad**: es
la precisión y los falsos amigos. Si tratamos estos tres como los demás, el estudiante se aburre
con palabras que ya sabe y luego se estrella con las trampas.

Inversión del método: **menos tarjetas de significado, más tarjetas de discriminación.** El
ejercicio característico es "¿cuál de estas dos?" con el falso amigo como distractor fijo.

| | **Portugués (BR)** | **Italiano** | **Francés** |
|---|---|---|---|
| Regalo | Cognados masivos; comprensión lectora casi inmediata | Cognados altos; sintaxis cercana | Cognados altos **por escrito** |
| Trampa central | **Falsos amigos de altísima frecuencia**: *esquisito* (raro), *borracha* (goma), *rato* (rato/ratón), *ligar* (llamar), *pelado* (desnudo), *oficina* (taller), *propina* (soborno), *apelido* (apodo), *aula* (clase), *copo* (vaso) | **Consonante doble que cambia el significado**: *nonno/nono*, *casa/cassa*, *pena/penna*; y **género divergente**: *il fiore*, *il latte*, *il sale*, *il miele* | **Brecha grafía ↔ sonido**: reconoce la palabra escrita y no la reconoce al oírla. Liaison y letras mudas |
| Segunda trampa | Nasales (*ão, ãe, õe*) y apertura vocálica (*avô / avó*) | Plurales irregulares: *l'uovo → le uova*, *il braccio → le braccia* | Falsos amigos: *salir* (ensuciar), *embrasser* (besar), *quitter* (dejar), *rester* (quedarse), *attendre* (esperar), *demander* (pedir) |
| Campos obligatorios | `falsoAmigo` (con el par español), `registro` BR/PT, `nasal` | `articulo`, `dobleConsonante`, `falsoAmigo`, `pluralIrregular` | `fonetica`, `liaison`, `genero`, `falsoAmigo`, **audio obligatorio** |
| Ejercicio que no puede faltar | Discriminación de falsos amigos en frase | Par mínimo de consonante doble (audio) | **Dictado corto**: oír → escribir |
| Dominio (G3) | Usa el falso amigo correctamente en frase | Escribe la doble consonante y el artículo bien | Escribe la palabra tras oírla, sin verla |

> En francés, **el audio no es un extra: es el ejercicio**. Un francés A2 que solo lee tarjetas
> desarrolla un vocabulario que no le sirve para entender a nadie. Como el audio por palabra se
> genera al final (decisión 3), en francés el dictado se apoya mientras tanto en **las frases ya
> grabadas del corpus de escucha**: la regla de veto de §5 exige que toda palabra del núcleo
> aparezca en ese corpus, así que hay frase con voz para casi todas desde el primer día. El campo
> `audio` de la ficha se reserva vacío y se llena en la Fase 5.

### Grupo B — Germánicos: inglés, alemán

Cognados útiles en registro académico (regalo para IELTS y para lectura B1), pero el núcleo
cotidiano es opaco. El problema no es el significado: es **la combinación y la forma**.

| | **Inglés** | **Alemán** |
|---|---|---|
| Regalo | Cognados latinos en registro formal | Cognados en registro técnico; ortografía fonética estable |
| Trampa central | **Phrasal verbs y colocaciones.** *make* vs *do*, *take* vs *get*. Saber las 20 palabras sueltas no da las 200 combinaciones | **El género y el plural son parte de la palabra.** *der/die/das* + plural no son metadatos: son la palabra |
| Segunda trampa | Registro: *get* vs *obtain*, *kids* vs *children*. Escribir informal en un examen cuesta banda | **Régimen preposicional con caso**: *warten **auf** + Ak.*, *helfen* + Dat. Aprender el verbo sin su preposición es aprenderlo mal |
| Multiplicador | Familias de palabra: *decide / decision / decisive* | **Compuestos y verbos separables**: *Hand + Schuh*, *auf‑stehen*, *an‑kommen*. Enseñar la pieza multiplica el léxico |
| Campos obligatorios | `colocaciones[]`, `phrasal`, `registro`, `acento` (sílaba tónica), `familia[]` | `articulo`, `plural`, `separable`, `auxiliar` (haben/sein), `participio`, `regimen` (prep. + caso) |
| Ejercicio que no puede faltar | Elegir el colocado (*___ a decision* → make) | **Tarjeta de género** en caja 3: no vale *Schlüssel*, vale *der Schlüssel, die Schlüssel* |
| Dominio (G3) | Produce la colocación completa, no la palabra suelta | Produce artículo + palabra + plural correctos |

> El caso alemán es el argumento más claro de por qué esto no puede ser un catálogo único: hoy
> alemán es **el único** de los ocho archivos que tiene campo `gender`, y aun así es opcional
> (`gender?: string`) y no se pregunta nunca. Un estudiante puede "dominar" *Brot* sin saber que es
> *das*.

### Grupo C — Distantes: ruso, coreano, japonés

Cero cognados, escritura propia. Aquí sí manda el volumen y la recuperación pura, pero hay un
multiplicador que cambia la economía del esfuerzo: **la raíz**.

| | **Ruso** | **Coreano** | **Japonés** |
|---|---|---|---|
| Prerrequisito | Cirílico (~1 semana) | Hangul (~2 semanas) | Kana (~3 semanas) + kanji progresivo |
| Trampa central | **Acento móvil que no se escribe** y cambia el sonido de toda la palabra —y a veces el significado (*за́мок* castillo / *замо́к* candado) | **Niveles de habla**: la misma idea cambia de forma según a quién le hablas (해요체 / 합쇼체 / 반말) | **Registro** (です・ます / 常体 / 敬語) y lecturas múltiples del mismo kanji (音読み / 訓読み) |
| Segunda trampa | **Pares aspectuales**: *делать / сделать* son dos entradas de una idea. Y 6 casos | **Partículas** (은/는, 이/가, 을/를): un sustantivo suelto no es usable | **Pares transitivo/intransitivo**: 開ける / 開く |
| Tercera trampa | Declinación: la forma de diccionario casi nunca es la que se oye | **Contadores** (개, 명, 마리, 권) | **Contadores** (個、人、匹、冊) |
| Multiplicador | Raíces + prefijos: *-ход-* → *входить, выходить, приходить* | **Raíces sino-coreanas (한자어)**: 학(學) → 학교, 학생, 대학, 학기. Una raíz abre decenas | **Kanji y radicales**: 学 → 学校、学生、大学。Igual que coreano |
| Campos obligatorios | `acento` (marcado), `genero`, `parAspectual`, `caso` que rige | `hangul`, `romanizacion`, `raizHanja?`, `formalidad`, `contador?`, `particula` | `kanji`, `furigana`, `romaji`, `lectura` (on/kun), `contador?`, `parTransitivo?`, `jlpt` |
| Ejercicio que no puede faltar | Marcar la sílaba tónica **al oír** | Elegir la forma según el interlocutor (a tu jefe / a tu amigo) | Escribir la lectura correcta del kanji en contexto |
| Dominio (G3) | Produce la palabra con acento y aspecto correctos | Produce la palabra con partícula y nivel de habla correctos | Produce la palabra con la lectura correcta en la frase |

> **La raíz es la palanca de estos tres idiomas.** Enseñar 학 antes que 학교 y 학생 por separado
> cambia la curva: el estudiante deja de memorizar ítems y empieza a descomponer. Para coreano y
> japonés, propongo que **una de las cinco unidades semanales sea siempre una unidad de raíz** (una
> raíz + las 9 palabras que abre) en lugar de una unidad temática.

### Lo que esto significa para el esquema de datos

Un núcleo común y una extensión por idioma, en vez de las ocho formas actuales:

```ts
// Común a los 8 — src/data/practica/vocabulario/schema.ts
interface VocabEntry {
  id: string                 // estable: la clave del SRS depende de él
  lemma: string              // forma de diccionario, en la escritura del idioma
  es: string                 // significado
  pos: 'sust' | 'verbo' | 'adj' | 'adv' | 'expr' | ...
  nivel: 'a1' | 'a2' | 'b1'
  tema: string
  ejemplo: { target: string; es: string }
  audio?: string
  fuente?: { serie: string; episodio: number }  // dónde se oye — enlaza con escucha
  lang: LangExtra            // ← la capa de §6
}
```

`LangExtra` es una unión discriminada: `DeExtra` exige `articulo` y `plural`, `RuExtra` exige
`acento` y `parAspectual`, `KoExtra` exige `formalidad` y `particula`, y así. **El compilador
impide publicar un sustantivo alemán sin artículo.** Hoy eso solo lo impediría un revisor humano,
y la memoria del proyecto ya dice que los revisores humanos no ven los defectos de conjunto.

---

## 7. Puertas de calidad — se miden con script, no a ojo

Precedente conocido: cinco series publicadas tenían la respuesta correcta en la opción A el 100 %
de las veces, y nadie lo vio revisando ítem por ítem. El vocabulario tiene los mismos riesgos.
`scripts/check-vocabulario.mjs` debe fallar el build ante:

| Puerta | Qué comprueba | Umbral |
|---|---|---|
| **Volumen** | Palabras por idioma/nivel | ≥ núcleo de §3 |
| **Campos obligatorios** | La extensión por idioma está completa | 100 % |
| **Solapamiento** | Una palabra en dos niveles | 0 |
| **Posición de la respuesta** | Distribución de la opción correcta en los MCQ | ninguna posición > 35 % |
| **Distractores** | Misma clase de palabra, longitud parecida, sin repetir | 100 % |
| **Cobertura de corpus** | % del núcleo que aparece en la serie de escucha del nivel | ≥ 60 % |
| **Ejemplos** | Uno por palabra, con traducción, sin gramática de nivel superior | 100 % |
| **Eje temático** | B1 no reusa los títulos de A2 | 0 colisiones |
| **Catálogo** | Las 24 rutas existen y renderizan el motor común | 24/24 |

La última se suma a `check-practica-catalog.mjs`, que hoy protege gramática, escucha, IELTS e
ICFES pero **no protege las 24 rutas de vocabulario**. Mientras no esté ahí, un merge se las puede
llevar en silencio, igual que se ha llevado cosas antes.

---

## 8. Qué implica en código

Cinco fases. Ninguna rompe lo que hay hasta que la siguiente está lista.

- **Fase 0 — Sacar los datos de los componentes.** Las 24 rutas mantienen su UI, pero sus palabras
  se mueven a `src/data/practica/vocabulario/<idioma>-<nivel>.ts` con el esquema de §6. Migración
  mecánica, sin pérdida: las 1.840 palabras actuales entran con los campos que ya tienen y se
  marcan los huecos que la capa por idioma exige.
- **Fase 1 — Un solo motor.** `<VocabularyJourney/>` sustituye a los 24 `Content.tsx`. Implementa
  la tabla caja → ejercicio de §1. Las tres interfaces distintas de hoy se unifican.
- **Fase 2 — Persistencia real.** Generalizar `icfes_vocabulary_progress` a una tabla con
  `(lang, level)`. Anónimo en `localStorage`, con sesión en Supabase. `mi-vocabulario` pasa a ser
  la vista del progreso, no una lista de favoritos.
- **Fase 3 — Llenar hasta el núcleo.** De 220–240 a 1.050 por idioma, por lotes, con las puertas de
  §7 activas desde el primer lote. Incluye la reescritura completa de B1 según §5b. Es la fase
  larga y la que necesita a Zhanna.
- **Fase 4 — Enlazar.** Palabra ↔ episodio de escucha donde se oye, y palabra ↔ tema de gramática
  que la usa. Aquí el vocabulario deja de ser una sección y pasa a ser el tejido del sitio.
- **Fase 5 — Audio, al final.** Con el catálogo cerrado, generar el audio por palabra con
  **ElevenLabs** (API ya instalada). Se hace de último a propósito: generar antes significa
  regenerar cada vez que una palabra cambie de bloque, de forma o de nivel. Orden de prioridad si
  se hace por tandas: francés (grafía↔sonido), ruso (acento), coreano y japonés (escritura), y
  después los cuatro restantes. El peso en repo se gestiona como los 480 mp3 de escucha —
  `.gitignore` + `.vercelignore` si hace falta, según `docs/escucha-estado.md`.

---

## 9. Estado de las decisiones

### Cerradas — 7 ago 2026

| # | Decisión | Consecuencia |
|---|---|---|
| 1 | **Núcleo 300 / 350 / 400** | 1.050 palabras activas al terminar B1. Promesa pública: 21 semanas a 12 min/día |
| 2 | **B1 por función discursiva** | Reescritura completa de B1 en los 8 idiomas, según los 8 bloques de §5b |
| 3 | **Audio al final, con ElevenLabs** | El campo `audio` nace vacío. Fase 5. Hasta entonces, el ejercicio de escucha usa el corpus de escucha ya grabado |

### Abiertas — bloquean la fase que se indica

| # | Decisión | Bloquea | Mi recomendación |
|---|---|---|---|
| 4 | **¿Progreso anónimo o con cuenta?** `localStorage` no pierde a nadie en la puerta; Supabase captura el lead pero pone fricción | Fase 2 | Híbrido: anónimo desde el primer día, y el muro aparece al querer *conservar* la racha o ver el progreso entre dispositivos — es decir, cuando ya hay algo que perder |
| 5 | **¿Orden de llenado de los 8 idiomas?** | Fase 3 | Inglés y coreano primero: son los dos que sostienen las landings de venta |
| 6 | **Coreano y japonés: ¿una de cada cinco unidades semanales es de raíz** (한자어 / kanji) en vez de temática? | Fase 3 | Sí. Cambia la curva —el estudiante descompone en vez de memorizar— pero también cambia cómo se ve la página, así que es decisión de Zhanna |

Las tres abiertas no frenan la **Fase 0** (sacar los datos de los componentes) ni la **Fase 1** (un
solo motor). Ese trabajo puede empezar en cuanto esta metodología quede aprobada.
