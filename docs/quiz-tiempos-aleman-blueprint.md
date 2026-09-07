# Quiz de tiempos y estructuras en alemán — blueprint editorial

Fuente de verdad para ampliar el quiz alemán con nuevas formas sin degradar los seis niveles.
Este contrato complementa `quizzes-blueprint-operativo.md` y describe las excepciones alemanas
que el motor común activa mediante configuración.

La operación multiagente, las huellas y los estados de aceptación están en
[`german-tense-agent-harness.md`](german-tense-agent-harness.md).

## Objetivo y cobertura

Cada forma seleccionable aporta contenido propio a los seis niveles. La cobertura mínima actual
es:

| Nivel | Mecánica alemana | Cobertura por forma | Puntaje |
|---|---|---:|---:|
| 1 | Elegir una conjugación dentro de la misma forma | 10 retos | 10 |
| 2 | Escribir la unidad verbal en un microtexto | 10 retos | 10 |
| 3 | Resolver tres decisiones en una escena conectada | 10 escenas | 30 |
| 4 | Encontrar y corregir un error en cinco oraciones sin marcas | 10 textos | 10 |
| 5 | Clasificar separación y escribir la oración completa | 10 retos | 20 |
| 6 | Completar una historia larga | 1 historia, 10+ huecos | 10+ |

Una forma no está lista si solo existe en los cuatro bancos editoriales históricos. También debe
tener diez retos de separación y una historia final en `german-advanced-editorial.ts`.

## Contrato del nivel 5

Cada forma declara exactamente cinco verbos separables y cinco inseparables. La interfaz muestra:

1. el infinitivo unido;
2. la elección `Trennbar` o `Untrennbar`;
3. un `Satzgerüst` con un único `___`;
4. un campo para escribir la oración alemana completa.

El `Satzgerüst` nunca deja visible una partícula separada. Por ejemplo:

```text
Infinitiv: aufstehen
Satzgerüst: Mara ___ jeden Werktag um sechs Uhr.
Antwort: Mara steht jeden Werktag um sechs Uhr auf.
```

Los diez retos se mezclan de forma determinista. Deben cambiar de clase al menos seis veces y no
puede haber más de dos respuestas consecutivas de la misma clase. No se usa un bloque de cinco y
cinco ni una mezcla aleatoria que cambie entre recargas.

La respuesta principal de `answers[]` conserva mayúscula inicial, orden y puntuación. Puede
declararse como segunda variante la misma oración sin signo final; no se aceptan frases parciales.

## Contrato de los niveles 4 y 6

El nivel 4 presenta cinco oraciones como texto continuo, exactamente una forma incorrecta y cero
tokens resaltados o seleccionables. El estudiante copia la forma errónea y escribe la corrección.
La posición del error se distribuye entre las cinco oraciones.

El nivel 6 usa una historia propia por forma. Sus segmentos y huecos se alternan, contiene al menos
diez decisiones y pide la unidad verbal completa. La historia no se construye pegando escenas de
otros niveles.

## Modo de revisión

`review=1` es una herramienta editorial. Ignora intentos guardados, abre el nivel indicado por la
URL, identifica los seis niveles como «Revisión» y coloca la respuesta correcta dentro de cada control. También
muestra la explicación y permite avanzar sin editar ni enviar respuestas.

Ejemplo:

```text
/herramientas/quizes/aleman?forms=praesens&level=5&review=1
```

El modo normal conserva corrección diferida. Ninguna selección, clase visual o explicación puede
revelar el resultado antes de terminar el nivel.

## Cómo añadir una forma alemana

1. Añadir un identificador estable a `GERMAN_FORMS` y subir la versión de `storageKey`.
2. Crear un paquete editorial con 10 opciones, 10 microtextos, 10 escenas de tres huecos,
   10 bancos de corrección base, 10 secuencias y 10 decisiones finales.
3. Añadir 10 líneas de corrección independientes para que el nivel 4 produzca textos de cinco
   oraciones y distribuya el error.
4. Añadir 10 semillas del nivel 5: cinco separables y cinco inseparables. El mezclador se ocupa del
   orden visible; el autor no debe ordenarlas para simular variedad.
5. Añadir una historia final con al menos 10 huecos y una respuesta completa por hueco.
6. Ejecutar el guardián, las pruebas de datos, TypeScript, lint y el recorrido E2E de las seis
   mecánicas para esa forma.

## Puertas automáticas

`scripts/check-tense-quests.mjs` valida la mecánica que realmente renderiza el alemán:

- IDs únicos, incluidos separación e historias finales;
- diez retos por nivel y forma;
- cinco verbos de cada clase en el nivel 5;
- orden mezclado y rachas máximas de dos;
- infinitivos y `Satzgerüste` no repetidos;
- partícula separada ausente del prompt;
- respuesta del nivel 5 con forma de oración completa;
- una historia final propia de al menos diez huecos;
- versión explícita y única de `storageKey`.

`tests/tense-quests.test.mjs` conserva las regresiones editoriales. El E2E alemán completa las seis
mecánicas para cada forma y comprueba que el modo de revisión muestre todos los controles con las
respuestas precargadas, sin registrarlas como progreso real.

Comandos requeridos antes de integrar:

```bash
npm run check:tense-quests
npx tsc --noEmit
npx eslint src/components/practica/TenseQuestEngine.tsx src/data/practica/german-*.ts
npx playwright test tests/e2e/german-tense-all-forms.spec.ts
```
