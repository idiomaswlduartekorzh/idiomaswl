# Blueprint de lectura multiidioma

Cómo se hace una lectura en los 8 idiomas para que sea parte de un curso y no un texto
suelto con preguntas colgadas debajo.

## De dónde venimos

Lectura tenía dos motores distintos:

- **Inglés** — 30 fichas JSON con esquema versionado, audio y campos SEO, una URL por
  lectura. Es el bueno, y es el que se toma como molde.
- **Los otros 7 idiomas** — 105 textos escritos a mano dentro de 21 archivos `Content.tsx`,
  5 por nivel, todos metidos en una sola página sin URL propia. Coreano B1 y japonés B1
  además se quedaron sin vocabulario glosado, sin pre-lectura y sin producción escrita.

El molde de inglés se adopta. Su contenido, no: al copiarlo salieron tres defectos que ya
están en producción y que el guardián ahora bloquea (ver más abajo).

## Lo que añade el esquema 1.1.0

El esquema de campos no cambia — el `1.0.0` ya estaba pensado para varios idiomas, con
gramática permitida, romanización y equivalencias JLPT/TOPIK. Lo que cambia son las reglas
que el guardián exige, y solo se aplican a las lecturas marcadas `"schemaVersion": "1.1.0"`.
Las 31 antiguas siguen validándose con las reglas de siempre y se cuentan como deuda en
cada corrida, para que no se olviden.

### 1. Acompasamiento con la gramática

`leveling.allowedGrammar` y `content.grammarFocus` dejan de ser prosa suelta
(`"modals for policy"`) y pasan a apuntar a temas reales del currículo
(`src/data/grammar/<idioma>/<nivel>/`). El guardián comprueba que:

- cada entrada existe de verdad, en ese idioma, en su nivel **o en uno anterior**;
- `grammarFocus` está contenido en `allowedGrammar`;
- al menos un tema del foco es **del nivel propio** — la lectura aporta algo nuevo.

El puente entre el currículo (TypeScript) y el guardián (JavaScript plano) es
`src/data/reading/grammar-index.json`, que se regenera con
`node scripts/build-reading-grammar-index.mjs --write`. No se edita a mano.

### 2. Refuerzo acumulado

En A2 y B1, al menos un tema del foco tiene que venir de un **nivel anterior**. Es la regla
que impide que cada nivel sea una isla: el alumno se reencuentra con lo que ya vio, dentro
de un texto nuevo. En A1 no aplica, porque no hay nivel previo.

### 3. Longitud

Los 30 textos de inglés se quedaron todos pegados al mínimo de su banda (A1 rondaba las 58
palabras cuando el rango permitía 140). El blueprint sube el suelo:

| Nivel | Blueprint 1.1.0 | Lo que hacía inglés 1.0.0 |
|---|---|---|
| A1 | 110–140 palabras | 58 de media |
| A2 | 200–240 | 132 |
| B1 | 380–450 | 227 |

`wordCount` y las métricas de frase **no se escriben a mano**: las calcula
`node scripts/normalize-reading-exercises.mjs --write` a partir del texto. Es la misma
lección que dejó Escucha con la duración de los mp3 — un número inventado hace que el
guardián valide una mentira.

> **Pendiente para japonés.** El japonés no separa palabras con espacios, así que contar
> tokens no significa nada. El normalizador se niega a procesarlo hasta que se decida su
> unidad de medida (caracteres, *bunsetsu* o morfemas). Hay que resolverlo antes de
> producir contenido japonés, no después.

### 4. Que no aburra

Un texto puede cumplir el nivel y aun así ser el cuarto correo de vecinos del mismo bloque.
El guardián exige, por lectura:

- 5 preguntas como mínimo, ejercitando al menos **3 destrezas distintas**
  (global, detalle, vocabulario, inferencia, organización…);
- 6 entradas de vocabulario glosado como mínimo;
- frases de largo desigual — si la más larga no supera en un 25 % a la media, el texto lee
  a plantilla y no a prosa;
- 2 pistas de producción escrita como mínimo.

Y por conjunto: **dos lecturas del mismo idioma y nivel no pueden repetir género y tema.**
Cuando un nivel llega a 10 lecturas, entre todas tienen que cubrir al menos la mitad del
currículo de gramática de ese nivel, o el build falla.

### 5. Los tres defectos que ya se colaron

Al auditar las 30 lecturas de inglés publicadas aparecieron tres fallos que el molde nuevo
no puede repetir, y que el guardián bloquea:

| Defecto | Casos en inglés |
|---|---|
| La glosa en español es la misma palabra en inglés (*shade* → *shade*) | 69 |
| El campo de estrategia en inglés contiene el texto en español | 121 |
| Verdadero/falso con enunciado genérico, sin afirmación que juzgar | 7 |

Están en producción. Migrarlas es parte del trabajo pendiente, no de este blueprint.

## Cómo se escribe una lectura

1. Escribe la ficha en `src/data/reading/exercises/<idioma>-<nivel>-<slug>.json`, con
   `"schemaVersion": "1.1.0"` y `"status": "draft"`. Deja `wordCount` y las métricas en 0.
2. Corre `node scripts/normalize-reading-exercises.mjs --write` — rellena los derivados.
3. Corre `node scripts/check-reading-content.mjs` — te dice qué falta.
4. El audio se genera al final, cuando el texto está cerrado, con el motor local
   (`~/Developer/chatterbox-tts`), que cubre los 8 idiomas y no cuesta nada. Hasta
   entonces, `"audio": null`.
5. `status` pasa a `published` solo cuando haya revisor de lengua y revisor pedagógico con
   nombre propio. El guardián no deja publicar con revisores en «Pendiente».

La pieza de referencia es `fr-a1-le-chat-du-troisieme-etage.json`.

## Estado

- Andamiaje: hecho y enganchado al `prebuild`.
- Piloto francés A1: 1 lectura de 30.
- Los otros 6 idiomas: sin empezar.
- Audio: aplazado a propósito hasta que el contenido esté cerrado.
