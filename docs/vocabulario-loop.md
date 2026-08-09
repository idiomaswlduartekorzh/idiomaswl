# Loop de vocabulario — 8 idiomas × A1–B1

Este documento **es el trabajo**. El loop lo lee al empezar cada vuelta, hace lo que dice el
apartado «Qué toca ahora», y lo actualiza antes de terminar. Si se lee entero y no se entiende
qué hacer a continuación, el documento está mal y arreglarlo es la tarea de esa vuelta.

Método: [`vocabulario-metodologia.md`](vocabulario-metodologia.md) ·
Por idioma: [`vocabulario-blueprints.md`](vocabulario-blueprints.md) ·
Procedimiento y puertas: [`vocabulario-plan-de-arranque.md`](vocabulario-plan-de-arranque.md)

---

## 0. Prohibiciones — se leen antes que nada

### 🔇 NO SE GENERA AUDIO. NINGUNO.

Ni con ElevenLabs, ni con TTS, ni con `scripts/generate-listening-audio.mjs`, ni «solo una
prueba». El campo `audio` de las fichas **se queda vacío**. El dictado usa la voz del navegador,
que no produce archivos.

El audio se hace **solo cuando el usuario haya revisado personalmente todo el contenido**, y lo
dirá él. Hasta entonces, cualquier vuelta del loop que genere un archivo de audio ha hecho algo
que no debía. Si el trabajo parece pedir audio, la respuesta es que no le toca todavía.

### Lo demás que no se toca

| No | Por qué |
|---|---|
| `git add -A` o `git add .` | Hay otra sesión trabajando en el mismo árbol. Rutas escritas una a una, siempre |
| Empujar a `main` | `main` autodespliega a producción. Se pide antes, cada vez |
| Quitar el `noindex` de las rutas de bloque | Sale cuando el usuario apruebe el nivel, no cuando el loop lo crea listo |
| Bajar un umbral de una puerta para que pase | El umbral está donde está por un defecto que ya llegó a producción |
| Tocar rutas de otras sesiones | Ver `vocabulario-plan-de-arranque.md`. Si aparecen cambios ajenos sin commitear, se dejan |
| Editar las series de escucha o los textos de lectura | Son contenido publicado con audio grabado. El vocabulario se adapta a ellos, no al revés |

---

## 1. El objetivo

Crear **todo** el vocabulario de práctica: 8 idiomas × 3 niveles × 10 bloques.

| | A1 | A2 | B1 | por idioma |
|---|---:|---:|---:|---:|
| Núcleo productivo | 300 | 350 | 400 | 1.050 |
| **Los ocho** | 2.400 | 2.800 | 3.200 | **8.400** |

No es una lista de palabras. Cada entrada lleva ficha completa —marca gramatical propia del
idioma, colocaciones traducidas, ejemplo tomado del material del nivel— y cada bloque tiene que
funcionar dentro del motor de cinco cajas, con su cierre de dictado y escritura.

Y tiene que **acompasar con lo que ya existe**: las 480 lecciones de escucha, los 465 temas de
gramática, los textos de lectura y los ejercicios de escritura. El vocabulario no es una isla;
es el tejido que une lo demás.

---

## 2. Las fases

**Una fase = un idioma en un nivel.** Veinticuatro fases. Dentro de cada una, la unidad de
trabajo es **un bloque de 30 palabras** (tres unidades de diez).

Orden, razonado en los blueprints (Parte 5): los dos primeros idiomas validan los dos extremos
del esquema —inglés es el `LangExtra` más simple, alemán el más exigente—, y coreano y ruso
traen las capas de raíz y de acento.

| # | Fase | Estado |
|---|---|---|
| 1 | **inglés A1** | 🔨 en curso — 100/300, bloques 1-3 hechos |
| 2 | inglés A2 | pendiente |
| 3 | inglés B1 | pendiente |
| 4 | alemán A1 | pendiente |
| 5 | alemán A2 | pendiente |
| 6 | alemán B1 | pendiente |
| 7 | coreano A1 | pendiente |
| 8 | coreano A2 | pendiente |
| 9 | coreano B1 | pendiente |
| 10 | ruso A1 | pendiente |
| 11 | ruso A2 | pendiente |
| 12 | ruso B1 | pendiente |
| 13-15 | francés A1 · A2 · B1 | pendiente |
| 16-18 | italiano A1 · A2 · B1 | pendiente |
| 19-21 | portugués A1 · A2 · B1 | pendiente |
| 22-24 | japonés A1 · A2 · B1 | pendiente |

**Una fase no se da por cerrada sin sus cuatro auditorías (§4).** Y ninguna fase nueva empieza
con la anterior sin cerrar.

---

## 3. Qué toca ahora

> **Este apartado se actualiza al final de cada vuelta.** Es el único estado que el loop
> necesita para saber por dónde va.

**Fase 1 · inglés A1 — 130 de 300**

| Bloque | Palabras | Estado |
|---|---|---|
| 1 · Yo y mi gente | 40 | ✅ |
| 2 · Números, hora y calendario | 30 | ✅ |
| 3 · Casa y objetos cotidianos | 30 | ✅ |
| 4 · Comida y bebida | 30 | ✅ |
| 5 · Cuerpo, salud y sensaciones | 30 | ⬜ **siguiente** |
| 6 · Ropa, colores y describir | 30 | ⬜ |
| 7 · Ciudad, lugares y direcciones | 30 | ⬜ |
| 8 · Rutina diaria y acciones | 30 | ⬜ |
| 9 · Estudio y trabajo | 30 | ⬜ |
| 10 · Cortesía y supervivencia | 30 | ⬜ |

El bloque 10 no existe hoy en ningún idioma y es el que permite sobrevivir a una conversación:
saludar, pedir, disculparse, decir «no entiendo».

**Apuntes que deja el bloque 4 para los siguientes:**

- `smell` (ep09), `hungry` y `thirsty` van al bloque 5, que es su sitio.
- `money` y `list` están en el episodio 11 y se guardaron para los bloques 7 y 9. No son comida.
- `vegetable` y `salad` se quedaron fuera de A1: solo viven en la frase del menú del comedor,
  que ya enseña dos palabras.

### ⚠️ Deuda que hay que saldar antes de cerrar la fase 1

**El bloque 4 no se cruzó contra el Oxford 3000.** El archivo de la lista no está en esta
máquina y no vive en el repo por derechos. Las 30 entradas se eligieron por criterio, y hay
cuatro que conviene mirar primero porque podrían ir una banda por encima: `menu`, `order`,
`soup` y `sandwich`. En cuanto haya lista:

```bash
node scripts/check-vocabulario.mjs --lang ingles --level a1 --lista <ruta al oxford3000.json>
```

Formato: `{ "A1": ["about", …], "A2": [...] }`. Lo que quede fuera de banda se justifica por
escrito en `listaBase.nota` o se cambia — no se deja pasar en silencio. Fue justo ese cruce el
que descubrió que tres palabras del bloque 3 eran decorado de la trama.

---

## 4. La vuelta del loop

Cada vuelta hace **un bloque**. Ni más —el contexto no da y la calidad cae— ni menos.

### Paso 1 · Elegir las 30 palabras

Criterios y vetos en la metodología §5. En corto:

1. Sacar del **listado oficial del idioma** (blueprints, Parte 2) las candidatas del tema y del
   nivel. Descargar la lista aparte; **no se guarda en el repo**, tiene derechos.
2. Comprobar cada una contra el material del nivel:
   ```bash
   node scripts/vocab-corpus-index.mjs --lang <idioma> --level <nivel> --find "<palabra>"
   ```
   Y **abrir la frase**, no fiarse del ✓: buscar `clock` daba positivo por estar dentro de
   `o’clock`, y no hay ningún `clock` suelto.
3. Preferir siempre la palabra que **está en el material** sobre la que hay que redactar.

### Paso 2 · Escribir la ficha

Formato en `src/data/practica/vocabulario/<idioma>-<nivel>.ts`, con el esquema de `schema.ts`.
Lo que cambia de un idioma a otro está en los blueprints (Parte 3) y el compilador lo exige:
artículo y plural en alemán, acento y par aspectual en ruso, partícula y nivel de habla en
coreano, lectura on/kun en japonés, falso amigo en las románicas.

Reglas que la puerta va a comprobar, así que mejor cumplirlas de entrada:

- Colocaciones **con traducción**, y que enseñen una combinación. `my room` no es una
  colocación: es posesivo + sustantivo. *(Se ha caído tres veces en esto.)*
- **Máximo dos entradas por frase de ejemplo.** Si una frase enseña seis palabras, en la caja 4
  el hueco se rellena por memoria del molde.
- **Máximo 34 % del bloque de un mismo episodio.** Un bloque sacado de dos escenas cubre dos
  escenas, no un tema.
- Ejemplo `redactado` solo si el material no tiene la palabra, **con motivo escrito**. Y la
  cobertura del bloque no baja del 60 %.
- Una palabra vive en **un solo nivel**. Nada de repetir entre A1, A2 y B1.

### Paso 3 · Validar

```bash
node scripts/check-vocabulario.mjs --verbose --lang <idioma> --level <nivel>
```

```bash
npm run test:e2e
```

Si la puerta rechaza algo, **se arregla el contenido**. Nunca el umbral.

### Paso 4 · Commitear y actualizar este documento

Rutas explícitas, un commit por bloque, mensaje que diga qué se decidió y por qué. Después,
marcar el bloque en §3 y dejar apuntado el siguiente.

---

## 5. Las cuatro auditorías de fin de fase

Se lanzan **al cerrar cada fase**, no al cerrar cada bloque. Las cuatro, y en este orden. Si una
falla, se arregla y se repite **esa** auditoría antes de seguir con las demás.

### 5.1 · Auditoría de código y seguridad

```bash
npx tsc --noEmit && npm run prebuild && npm run build
```

Y a mano, mirando el diff de la fase entera:

- ¿Hay alguna clave, token o dato personal en el contenido nuevo? No debe haberlo: el
  vocabulario es texto público, pero los ejemplos no pueden traer datos reales de nadie.
- ¿Se añadió alguna dependencia? ¿Hacía falta? `npm audit` sin vulnerabilidades nuevas.
- ¿Alguna ruta nueva quedó indexable? **Todas las rutas de bloque llevan `noindex` hasta que el
  usuario apruebe** (§0).
- ¿La lógica de ejercicios sigue fuera del componente? Si algo volvió al JSX, el validador
  dejó de verlo — así se coló el sesgo de la respuesta siempre en la misma opción.
- ¿El guardián de catálogo protege las rutas nuevas? `npm run check:practica-catalog`.

### 5.2 · Auditoría pedagógica

La revisa Zhanna, o un agente con este guion si ella no está disponible — y en ese caso se dice
que fue un agente, no ella.

Sobre **una muestra de 30 entradas al azar** de toda la fase, no sobre las 300:

1. ¿Son las palabras que ese nivel necesita, o hay relleno?
2. ¿El ejemplo usa **solo gramática ya enseñada** en ese nivel? Contrastar con
   `src/data/grammar/<idioma>/<nivel>/index.ts`.
3. ¿Las colocaciones son las que diría un nativo, o traducciones del español?
4. ¿La traducción es la acepción correcta **para ese ejemplo**?
5. ¿Cada bloque cubre su tema, o se quedó en un rincón?
6. ¿Falta alguna palabra sin la que el bloque no se sostiene?
7. ¿La capa del idioma está bien resuelta? (el género alemán, el acento ruso, la partícula
   coreana, el falso amigo en las románicas)
8. ¿Un estudiante que domine estas 300 sostiene las conversaciones del nivel?

Un hallazgo de **contenido** se corrige y se sigue. Uno de **formato** devuelve la fase a la
Puerta 1, porque significa que el blueprint estaba mal.

### 5.3 · Auditoría de usuario promedio

La que responde a la única pregunta que importa: **¿esto enseña?**

Un agente hace de estudiante colombiano real —adulto, poco tiempo, cero conocimiento previo del
idioma— y recorre una unidad entera. No busca defectos técnicos; busca los momentos en que una
persona lo dejaría. Informa de:

- **Dónde se atascaría.** Cualquier punto donde no sepa qué se le pide. El atasco de la caja 5
  —copiar el chunk que la ficha imprime y ser suspendido sin explicación— no lo encontró ningún
  script: lo encontró una persona encallada ahí.
- **Dónde se aburriría.** Doce minutos es la promesa. ¿Se cumple, o la unidad se hace larga?
- **Qué no entendería.** Todo lo que se le pide está en español; si aparece metalenguaje en
  inglés o una instrucción ambigua, es un fallo.
- **Si al terminar puede producir.** Después del cierre escrito, ¿sabría decir cinco frases
  suyas con esas palabras? Si solo sabría reconocerlas, la unidad no cumplió.
- **Si el fallo enseña.** Al equivocarse, ¿le dicen qué se esperaba y por qué, o solo que está
  mal?

Sale un informe corto con lo que dejaría a esa persona fuera. Cada punto se arregla o se
justifica por escrito.

### 5.4 · Auditoría Playwright

```bash
npm run test:e2e
```

Los tests **atacan**, no comprueban que la página cargue: fallan a propósito, copian el chunk de
la ficha, escriben la palabra suelta. Lo que se afirma es que no hay manera de quedarse atascado.

Al abrir una fase de un idioma nuevo hay que **extender el spec a ese idioma**:
`tests/e2e/vocabulario.spec.ts` está hoy fijado a `INGLES_A1`. Parametrizarlo por idioma y nivel
es parte del trabajo de la primera fase de cada idioma, no un extra.

Cada fase debe dejar cubierto:

- La escalera entera de una unidad, con las cinco cajas pisadas
- Las dos variantes de la caja 2 (inicial y ortografía)
- Que la correcta no cae siempre en la misma posición
- El cierre: dictado y escritura
- Los ataques a la caja 5
- **Lo propio del idioma**: que el género alemán se pida de verdad, que el acento ruso se
  marque, que la partícula coreana forme parte de la respuesta

---

## 6. Cuándo parar y preguntar

El loop se detiene y pregunta —no adivina— cuando:

- Una auditoría falla **dos veces** sobre lo mismo. Es señal de que el problema es de diseño.
- Haría falta **tocar contenido publicado** (una serie de escucha, un texto de lectura) para
  seguir. Eso es decisión del usuario.
- El material del nivel **no da** para el núcleo y la cobertura caería del 60 %.
- Se cierra una fase: el usuario decide si se empuja a `main` y si sale el `noindex`.
- Aparece cualquier cosa que huela a **generar audio**.

---

## 7. Decisiones ya tomadas — no volver a abrirlas

| Decisión | Cuándo |
|---|---|
| Núcleo 300 / 350 / 400 | 7 ago 2026 |
| B1 se organiza por función discursiva, no por situaciones | 7 ago 2026 |
| El audio va al final, con ElevenLabs, y **solo tras revisión del usuario** | 7 ago 2026 |
| Las once frases redactadas de inglés A1 se quedan como están | 8 ago 2026 |
| Una URL por bloque, como en gramática | 8 ago 2026 |
| El validador entra en el `prebuild` | 8 ago 2026 |
| Las dos sesiones comparten árbol, luego comparten rama | 8 ago 2026 |

---

## 8. Bitácora

Una línea por fase cerrada. Sirve para no repetir errores y para que el usuario vea el avance
sin leer commits.

| Fecha | Fase | Qué salió mal y se aprendió |
|---|---|---|
| 8 ago 2026 | inglés A1, bloques 1-3 | El barajado de opciones vivía en el JSX: la correcta caía siempre en la B y el validador no lo veía. La lógica que decide qué ve el estudiante vive ahora fuera del componente, y la puerta ejecuta esa misma función |
| 8 ago 2026 | inglés A1, bloque 1 | El corpus de escucha no da para 300 palabras. Se conectó la lectura: de 160 a 221 frases disponibles |
| 8 ago 2026 | inglés A1, bloque 3 | Tres palabras eran decorado de la historia (`balcony`, `blanket`, `tile`) y no estaban en el Oxford 3000. El corpus enseña lo que la trama necesita, no lo que el nivel necesita: hay que cruzar siempre con la lista oficial |
| 9 ago 2026 | inglés A1, bloque 4 | `tea` daba cuatro positivos y no era ninguno: eran `teaches`, `teach` y `team`. Segundo espejismo del mismo tipo que `clock` dentro de `o’clock`. Se abre la frase siempre; el ✓ del buscador no es una fuente |
| 9 ago 2026 | inglés A1, bloque 4 | El spec de Playwright estaba fijado a `bloques[0]`: los bloques 2, 3 y 4 pasaban el validador sin que nadie los hubiera jugado nunca. Ahora recorre todos los bloques del nivel, y comprueba antes que la unidad tenga con qué salir de la caja 5 |
| 9 ago 2026 | inglés A1, bloque 4 | Aparece un caso que la regla no preveía: una palabra que **sí** está en el material pero cuya única frase ya enseña dos. Se resolvió con ejemplo redactado y motivo explícito (`cheese`), en vez de meter una tercera en la misma frase |
