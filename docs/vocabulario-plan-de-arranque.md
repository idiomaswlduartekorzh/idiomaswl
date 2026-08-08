# Plan de arranque — vocabulario, 8 idiomas × A1–B1

Cómo se construye, en qué orden, y dónde se para a revisar. El método está en
[`vocabulario-metodologia.md`](vocabulario-metodologia.md); de dónde sale cada pieza, en
[`vocabulario-blueprints.md`](vocabulario-blueprints.md). Este documento es el procedimiento.

---

## 1. La regla de avance

No se construyen ocho idiomas en paralelo. Se avanza **de uno en uno**, y cada idioma pasa por
dos puertas antes de que empiece el siguiente:

```
  Blueprint del idioma  →  PILOTO (1 bloque, 30 palabras)
                              │
                        ┌─────▼─────┐
                        │ PUERTA 1  │  ¿el blueprint aguanta?
                        └─────┬─────┘
                              │ sí
                    Escalar al nivel completo (A1 → A2 → B1)
                              │
                        ┌─────▼─────┐
                        │ PUERTA 2  │  ¿el nivel aguanta?
                        └─────┬─────┘
                              │ sí
                        Siguiente idioma
```

Si una puerta no se abre, **no se sigue**: se corrige el piloto o el nivel y se vuelve a pasar.
La gracia de fasear es descubrir que el formato está mal con 30 palabras encima de la mesa, no
con 2.400 repartidas en ocho idiomas.

Orden de idiomas (razonado en los blueprints, Parte 5):
**inglés → alemán → coreano → ruso → francés/italiano/portugués → japonés.**

Los dos primeros no son arbitrarios: validan los dos extremos del esquema. Inglés es el
`LangExtra` más simple, alemán el más exigente (artículo + plural + auxiliar + régimen con caso).
Si el esquema aguanta esos dos, aguanta los seis restantes.

---

## 2. Las dos puertas

Cada puerta tiene **dos mitades y las dos son obligatorias**. La automática mide lo que el ojo no
ve; la pedagógica juzga lo que un script no puede. Ninguna sustituye a la otra: en este repo ya
llegaron a producción cinco series con la respuesta correcta en la opción A el 100 % de las veces,
revisadas ítem por ítem por una persona.

### Puerta 1 — ¿aguanta el blueprint? (30 palabras)

**Mitad automática**

```bash
node scripts/check-vocabulario.mjs --lang ingles --level a1 --verbose
```

Ocho comprobaciones, y por qué está cada una:

| # | Comprueba | Por qué |
|---|---|---|
| 1 | `id` únicos y bien formados | Son la clave del SRS: repetido o cambiado = progreso del estudiante perdido |
| 2 | Lemas únicos entre niveles | Una palabra vive en un solo nivel |
| 3 | **Regla de veto**: el ejemplo aparece literal en el corpus de escucha del mismo nivel | Impide que el vocabulario vuelva a ser una isla, y evita el defecto de los mazos Core: frases inventadas que suenan artificiales |
| 4 | El episodio declarado es donde de verdad suena | Si miente, el enlace de la Fase 4 lleva a ninguna parte |
| 5 | Campos de la capa por idioma, no vacíos | El compilador exige que existan; esto exige que digan algo |
| 6 | Una frase no enseña más de 2 palabras | Si enseña seis, en la caja 4 el estudiante rellena el hueco por memoria del molde |
| 7 | Ningún episodio aporta más del 34 % del bloque | Un bloque sacado de dos escenas cubre dos escenas, no un tema |
| 8 | Volumen contra el núcleo objetivo | Aviso mientras es piloto; problema cuando se declara el nivel terminado |

**Mitad pedagógica — la revisa Zhanna**

1. ¿Las 30 palabras son de verdad las que un A1 necesita, o hay relleno?
2. ¿El ejemplo de cada una usa solo gramática del nivel?
3. ¿Las colocaciones son las que un nativo diría, o son traducciones del español?
4. ¿La traducción al español es la acepción correcta para ese ejemplo?
5. ¿El bloque cubre el tema, o se quedó en un rincón del tema?
6. ¿Falta alguna palabra sin la que el bloque no se sostiene?

**Se abre la puerta cuando:** el script pasa sin problemas y Zhanna firma las seis.

### Puerta 2 — ¿aguanta el nivel? (300 / 350 / 400 palabras)

**Mitad automática:** el mismo script, sin `--verbose`, con el nivel completo. Aquí las
comprobaciones 6, 7 y 8 dejan de ser tolerantes: el volumen debe estar al 100 % del núcleo y la
cuota por episodio se mide sobre los diez bloques, no sobre uno.

Se añaden dos que solo tienen sentido con el nivel entero:

| # | Comprueba | Por qué |
|---|---|---|
| 9 | Cobertura de corpus ≥ 60 % del núcleo | Si baja de ahí, el nivel se está llenando con palabras que no se oyen en ninguna lección |
| 10 | Los bloques de B1 no repiten los títulos de A2 | Es el defecto que arrastraba el vocabulario viejo: B1 era A2 con otro adjetivo |

**Mitad pedagógica:** muestreo aleatorio de 30 entradas de los diez bloques —no las 300, que no es
realista— con las mismas seis preguntas, más una séptima: *¿un estudiante que domine estas 300
puede sostener las conversaciones del nivel?*

**Se abre la puerta cuando:** el script pasa y el muestreo no produce ningún hallazgo que obligue a
tocar el formato. Un hallazgo de contenido se corrige y sigue; un hallazgo de **formato** devuelve
el idioma a la Puerta 1, porque significa que el blueprint estaba mal.

---

## 3. Estado — 8 de agosto de 2026

### Hecho

| Pieza | Dónde | Qué es |
|---|---|---|
| Esquema de datos | [`src/data/practica/vocabulario/schema.ts`](../src/data/practica/vocabulario/schema.ts) | `VocabEntry` común + `LangExtra` como unión discriminada. El compilador ya rechaza un sustantivo alemán sin artículo o uno ruso sin acento |
| Índice de corpus | [`scripts/vocab-corpus-index.mjs`](../scripts/vocab-corpus-index.mjs) | Hace comprobable la regla de veto: palabra → frases reales del corpus, con episodio |
| Piloto inglés A1 | [`src/data/practica/vocabulario/ingles-a1.ts`](../src/data/practica/vocabulario/ingles-a1.ts) | Bloque 1 «Yo y mi gente», 30 entradas en 3 unidades, ejemplos tomados del corpus |
| Puerta automática | [`scripts/check-vocabulario.mjs`](../scripts/check-vocabulario.mjs) | Las ocho comprobaciones de la Puerta 1 |
| Registro | [`registry.ts`](../src/data/practica/vocabulario/registry.ts) | `getVocabBlock(lang, nivel, slug)`, igual que el registro de gramática |
| Motor | [`VocabularyJourney.tsx`](../src/components/practica/VocabularyJourney.tsx) | Implementa la escalera caja → ejercicio. Sustituirá a los 24 `Content.tsx` |
| Página por bloque | [`vocabulario/[slug]/page.tsx`](<../src/app/(site)/practica/ingles/a1/vocabulario/[slug]/page.tsx>) | Una URL por bloque, con JSON-LD y breadcrumb |

### Decisión de arquitectura: una URL por bloque

Tomada el 8 de agosto de 2026 a partir de la revisión: *«cada bloque representa una skill —
tiempo, clima, presentarse»*. El vocabulario copia el patrón que ya usa gramática, que tiene una
URL por tema:

```
/practica/ingles/a1/vocabulario                    ← índice del nivel
/practica/ingles/a1/vocabulario/yo-y-mi-gente      ← bloque, con su propia URL
```

Es como la gente lo busca —«vocabulario de la familia en inglés», «palabras del clima en alemán»—
y es lo que hace el bloque indexable por separado. Con el catálogo completo son **10 bloques × 24
combinaciones de idioma y nivel = 240 páginas nuevas**, del mismo tipo que las 465 de gramática.

El índice actual de cada nivel **no se toca** mientras dure la Puerta 1: el bloque nuevo vive en su
subruta y la página vieja sigue sirviendo sus 60 palabras hasta que la Fase 1 la sustituya.

`npx tsc --noEmit` pasa. `node scripts/check-vocabulario.mjs` pasa.

### Lo que encontró la puerta en su primer uso

Vale la pena dejarlo escrito, porque es la prueba de que la mitad automática hace falta. El piloto
lo escribí yo con cuidado, y aun así la primera pasada lo rechazó por **dos defectos de conjunto
que no se ven leyendo las fichas una a una**:

1. **Tres frases enseñaban tres palabras cada una.** *«My father is a bus driver. My mother is a
   nurse.»* servía de ejemplo a *father*, *driver* y *nurse* a la vez. Leído entrada por entrada,
   cada una parecía correcta. Puestas juntas, en la caja 4 el estudiante habría rellenado tres
   huecos distintos del mismo molde memorizado.
2. **El episodio 1 aportaba 11 de las 30 entradas** (37 %). El bloque decía cubrir «Yo y mi gente»
   y en realidad cubría la primera escena de la serie.

Ambos corregidos moviendo seis ejemplos a otros episodios. El bloque toca ahora nueve episodios en
vez de concentrarse en dos.

### Hallazgo que cambia el coste del llenado

El corpus de escucha **ya declara 2.837 palabras clave** con traducción al español y episodio,
repartidas por las 24 series:

| | A1 | A2 | B1 | total |
|---|---:|---:|---:|---:|
| Inglés | 120 | 120 | 120 | 360 |
| Alemán | 120 | 120 | 120 | 360 |
| Italiano | 120 | 131 | 138 | 389 |
| Ruso | 100 | 126 | 140 | 366 |
| Japonés | 100 | 122 | 120 | 342 |
| Francés | 100 | 120 | 120 | 340 |
| Portugués | 100 | 120 | 120 | 340 |
| Coreano | 100 | 120 | 120 | 340 |

El núcleo objetivo es 1.050 por idioma (300 + 350 + 400). Estas palabras clave cubren en torno al
**33 %**, y vienen con lo más caro ya hecho: traducción revisada, nivel controlado por
construcción, frase de ejemplo y audio grabado. El llenado no arranca en cero: arranca en un
tercio.

```bash
node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --keywords
```

---

## 4. Puerta 1 de inglés — primera revisión pedagógica

Hecha el 8 de agosto de 2026. Resultado: **dos hallazgos, los dos corregidos**, y uno de ellos
apuntando más arriba de las 30 palabras.

| # | Pregunta | Respuesta | Consecuencia |
|---|---|---|---|
| 1 | ¿Son las que un A1 necesita? | Sí | — |
| 2 | ¿El ejemplo usa solo gramática del nivel? | Sí | — |
| 3 | ¿Las colocaciones son las de un nativo? | **No** | Las colocaciones llevan ahora traducción al español, y la puerta rechaza las que son la palabra sola o posesivo + sustantivo |
| 4 | ¿La traducción es la acepción del ejemplo? | Sí | — |
| 5 | ¿El bloque cubre el tema? | **No, se quedó en un rincón** | Se fueron *street*, *bakery*, *busy*, *start* y *cook* —relleno de otros bloques— y entraron *friend*, *people*, *children*, *brother*, *woman* y *young* |
| 6 | ¿Falta alguna palabra sin la que no se sostiene? | **Sí: *brother*** | Y la causa está en el corpus, no en la ficha |

### El hallazgo de fondo

El bloque se rellenó con palabras de otros temas porque **el corpus de inglés A1 no da para
treinta palabras de personas**. Contiene dieciséis: *family, father, mother, sister, grandfather,
grandmother, parents, man, student, waitress, driver, nurse, cook, people, friends, children*.

No dice *brother*. No dice *woman*, ni *young*, ni *husband*, ni *wife*, ni *country*, ni *city* —
comprobado también contra los diez ejercicios de lectura del nivel, que tampoco los traen.

Eso destapó una **contradicción en la propia metodología**: el §5 pedía veto absoluto («si no
aparece en el corpus, no entra») y el §7 pedía cobertura del 60 %. Las dos reglas no pueden ser
verdad a la vez. Corregido en el §5: el ejemplo **declara su procedencia** (`corpus` o
`redactado` con motivo), la puerta exige ≥ 60 % del corpus, comprueba que lo declarado como corpus
suene de verdad allí, y rechaza lo declarado redactado que sí estaba.

El bloque va hoy al **90 % de corpus**: 27 tomadas literal, 3 redactadas y declaradas.

### Decisión abierta

*brother*, *woman* y *young* llevan ejemplo redactado. La alternativa es **añadirlos al corpus**,
que significa tocar la serie de escucha —contenido protegido— y regenerar el audio de los episodios
afectados. Es una decisión de David y Zhanna, no mía. Mientras tanto quedan anotados en el propio
archivo, dentro del motivo de cada uno.

### Segunda revisión — sobre el preview, 8 de agosto

Revisar la pantalla encontró dos fallos que ninguna revisión del dato habría visto:

1. **La respuesta correcta caía siempre en la segunda opción.** El barajado vivía dentro del
   JSX y usaba `id.length`, que vale 9 para todas las entradas: la expresión no barajaba nada.
   El dato estaba bien y la pantalla mal, así que la puerta —que auditaba el dato— no podía
   verlo. Es el mismo defecto que llevó cinco series de escucha a producción con la correcta
   siempre en la A.

   **Arreglo de fondo, no de superficie:** el orden de las opciones se fue a
   [`opciones.ts`](../src/data/practica/vocabulario/opciones.ts), y **la puerta importa esa
   misma función** para medir el reparto. Auditar una copia no sirve: hay que medir lo que ve
   el estudiante. Reparto actual sobre 40 entradas: A:10 B:11 C:10 D:9.

2. **El feedback del fallo respondía a otra pregunta.** Al errar en la caja 1 decía
   *«Era «father»»* cuando la pregunta era el significado y la respuesta buena era *«padre»*.
   Ahora lo esperado se calcula por caja: significado en la 1, palabra en la 2 y la 3, forma
   flexionada en la 4.

Y una expansión pedida: el bloque pasa de 30 a **40 palabras en 4 unidades**, con *son*,
*daughter*, *husband*, *wife*, *boy*, *girl*, *country*, *city*, *nice* y *home*. Ocho de las
diez llevan ejemplo redactado, porque el corpus tampoco las dice. **La carencia queda
cuantificada: once de cuarenta**, y la cobertura baja del 90 % al 73 %. Sigue por encima del
mínimo, pero es el argumento de que ampliar el corpus no es opcional mucho más tiempo.

> Al escribir esa unidad volví a poner colocaciones tipo *«my son»* y la puerta las rechazó por
> posesivo + sustantivo — la regla que yo mismo había añadido media hora antes. Es exactamente
> para lo que sirve.

### Escritura reforzada — el cierre de unidad

Pedido en la segunda revisión: *«solo con esto no aprende la gente»*. La observación era justa a
medias. La escalera **ya era escritura** de la caja 2 en adelante —escribir con la inicial,
escribir sin ayuda, rellenar el hueco en la frase real, escribir una frase propia— pero terminaba
dentro de la ficha. Lo que faltaba era el final. Construido:

| Pieza | Qué hace |
|---|---|
| **Caja 5 evaluada** | Antes solo miraba que la palabra apareciera, así que «father.» pasaba por frase. Ahora exige la palabra y una frase de verdad, dice **qué falta** en concreto, y reconoce cuando el estudiante ha usado uno de los chunks de la ficha |
| **Dictado** | Oír la frase sin verla y escribirla. Corrige palabra por palabra y subraya las que se escaparon. Es el único ejercicio que va del sonido a la letra |
| **Cierre escrito** | Cinco frases propias usando cinco palabras de la unidad, con la lista marcándose sola mientras escribe |

El dictado usa **la voz del navegador**, no archivos. El audio con ElevenLabs sigue siendo la Fase 5:
así el ejercicio existe hoy, no pesa en el repo, y cuando llegue el audio de verdad se sustituye la
fuente sin cambiar la forma del ejercicio.

**Lección aplicada del fallo del barajado:** toda la lógica que decide qué ve o qué acierta el
estudiante vive ahora fuera del componente —[`opciones.ts`](../src/data/practica/vocabulario/opciones.ts)
y [`ejercicios.ts`](../src/data/practica/vocabulario/ejercicios.ts)— y **la puerta la ejecuta**. Ya no
audita una copia de la lógica: audita la misma función que corre en pantalla. Comprobaciones nuevas:
las 40 entradas tienen hueco en contexto, la frase se reconstruye entera al ahuecar, y la caja 5
rechaza la palabra suelta pero acepta una frase real.

### Lo que sigue faltando

**Cruzar las 30 entradas contra el Oxford 3000 descargado** y marcar las que no estén en la banda
A1. La lista base está declarada en el archivo pero no verificada contra el listado real.

Hasta que eso ocurra, **no se escriben los otros nueve bloques de inglés A1** ni se toca ningún
otro idioma. Es el punto del plan.

---

## 5. Después de la Puerta 1

Ni la Fase 1 (el motor) ni la Fase 2 (persistencia) están bloqueadas por las decisiones abiertas de
la metodología §9, así que pueden avanzar en paralelo al llenado en cuanto el formato quede fijado:

- **Fase 1 — un solo motor.** `<VocabularyJourney/>` sustituye a los 24 `Content.tsx`, con la
  tabla caja → ejercicio de la metodología §1. Los 1.840 datos actuales se migran al esquema.
- **Fase 2 — persistencia.** Generalizar `icfes_vocabulary_progress` a `(lang, level)`.
- **Fase 4 — enlazar** palabra ↔ episodio (el campo `fuente` ya lo lleva) y palabra ↔ gramática.
- **Fase 5 — audio** con ElevenLabs, al final, con el catálogo cerrado.

Y una tarea de guardián que no debe olvidarse: **añadir las 24 rutas de vocabulario a
`check-practica-catalog.mjs`**. Hoy ese guardián protege gramática, escucha, IELTS e ICFES pero no
el vocabulario, así que un merge se lo puede llevar sin que nada se ponga rojo.
