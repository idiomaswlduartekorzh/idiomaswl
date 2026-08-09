---
name: validar-vocabulario
description: Valida el motor y el contenido de vocabulario de práctica sin tener que probarlo a mano. Simula la escalera de cinco cajas palabra por palabra, comprueba las puertas de calidad (sesgo de posición, cobertura de corpus, colocaciones, ortografía, callejones sin salida) y verifica tipos y build. Úsala SIEMPRE después de tocar algo bajo src/data/practica/vocabulario/, src/components/practica/VocabularyJourney.tsx o las rutas /practica/<idioma>/<nivel>/vocabulario, y cuando el usuario diga "valida el vocabulario", "revisa el ejercicio", "está bien esto?", "compruébalo", o antes de dar por terminado un bloque o un nivel.
---

# Validador de vocabulario

Existe porque probar esto a mano no escala: 40 palabras × 5 cajas son 200 interacciones por
bloque, y el catálogo completo son 240 bloques. Los defectos que importan además **no se ven
jugando un poco** — se ven en el conjunto: la respuesta correcta siempre en la misma letra, un
bloque sacado de dos episodios, una frase que enseña seis palabras, un callejón sin salida en la
caja 5.

## Qué ejecutar

Los tres, en este orden. Si uno falla, arreglar antes de seguir.

```bash
node scripts/check-vocabulario.mjs --verbose
```

Y cuando se cierre un bloque o un nivel, además el cruce contra la lista oficial del idioma:

```bash
node scripts/check-vocabulario.mjs --lang ingles --level a1 --lista ~/Downloads/oxford3000.json
```

La lista **no vive en el repo** —la del Oxford 3000, la del Goethe y la de ТРКИ tienen derechos—
así que se descarga aparte. Formato: `{ "A1": ["about", ...], "A2": [...] }`. Una palabra fuera de
la lista es aviso, no problema: puede estar justificada, pero la justificación va escrita en
`listaBase.nota` del archivo del nivel, no en la cabeza de nadie.

```bash
npx tsc --noEmit
```

```bash
npm run build
```

`npm run build` solo si se han tocado rutas o componentes; para cambios de datos basta con los
dos primeros.

## Qué mira el script

Diez comprobaciones. Las cuatro últimas son las que sustituyen la prueba manual:

| # | Comprueba | Por qué |
|---|---|---|
| 1 | `id` únicos y bien formados | Son la clave del SRS: repetido o cambiado = progreso perdido |
| 2 | Lemas únicos entre niveles | Una palabra vive en un solo nivel |
| 3 | Regla de veto y procedencia declarada | El ejemplo se toma del corpus, o se declara `redactado` con motivo |
| 4 | Cobertura de corpus ≥ 60 % | Por debajo, el vocabulario se está escribiendo aparte de las lecciones |
| 5 | Campos de la capa por idioma, no vacíos | El compilador exige que existan; esto, que digan algo |
| 6 | Máximo 2 palabras por frase de ejemplo | Si una frase enseña seis, el hueco se rellena por memoria del molde |
| 7 | Máximo 34 % del bloque por episodio | Un bloque sacado de dos escenas cubre dos escenas, no un tema |
| 8 | Volumen contra el núcleo del nivel | 300 / 350 / 400 |
| 9 | **Posición de la correcta en pantalla** | Importa la misma función que pinta las opciones. Máximo 40 % en una letra |
| 10 | **Simulación de la sesión** | Recorre las cinco cajas de cada palabra: ¿existe respuesta aceptada? ¿rechaza una mala? ¿hay callejón sin salida? |

## Cómo informar

Corto y en este orden:

1. **Veredicto**: pasa o no pasa.
2. Si no pasa, **cada problema con la palabra concreta** y qué hay que cambiar. Nada de
   «hay errores de contenido».
3. Los números del `--verbose`: cobertura de corpus, reparto de la posición correcta, cuántas
   palabras llevan ortografía, cuántas tienen hueco en contexto. Son los que dicen si el bloque
   está sano aunque pase.
4. Los avisos, solo si son accionables.

## Reglas

**No bajar umbrales para pasar.** Cada uno está donde está por un defecto que ya llegó a
producción: cinco series publicadas con la respuesta correcta en la opción A el 100 % de las
veces, y la primera versión de este motor con la correcta siempre en la B. Si un umbral molesta,
el problema es el contenido.

**Lo que decide qué ve o qué acierta el estudiante va en un módulo, no en el componente.**
`opciones.ts` y `ejercicios.ts` existen para que el script pueda ejecutar exactamente lo que corre
en pantalla. Si al arreglar algo se mete lógica de ejercicio dentro del JSX, el validador deja de
ver ese trozo — que es justo cómo se coló el sesgo de la letra B.

**Un fallo de formato devuelve el idioma a la Puerta 1.** Uno de contenido se corrige y sigue.
La diferencia está en `docs/vocabulario-plan-de-arranque.md`.

## Contexto

- Método: `docs/vocabulario-metodologia.md`
- Qué copiamos y de quién, por idioma: `docs/vocabulario-blueprints.md`
- Fases y las dos puertas: `docs/vocabulario-plan-de-arranque.md`

Herramienta auxiliar, para comprobar si una palabra se oye en las lecciones antes de meterla:

```bash
node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --find "brother"
```
