# Quiz de pronombres — blueprint de implementación y expansión

Fuente de verdad de la familia `/herramientas/quizes/pronombres`. Complementa el contrato
operativo general de [`quizzes-blueprint-operativo.md`](quizzes-blueprint-operativo.md). Piloto
verificado: italiano A1–A2+, 23 de agosto de 2026.

## 1. Resultado pedagógico

El estudiante no memoriza listas aisladas: reconstruye la cadena
`referente → función → pronombre`. Puede seleccionar una o varias familias y completa seis
niveles sin recibir pistas de corrección hasta cerrar cada nivel. Todas las respuestas se eligen
entre opciones editoriales; no hay texto libre, IA, similitud ni corrección aproximada.

El piloto italiano cubre:

- pronombres sujeto y tratamiento formal `Lei`;
- demostrativos;
- posesivos y concordancia con lo poseído;
- objetos directos;
- objetos indirectos;
- reflexivos y recíprocos;
- combinaciones de clíticos.

## 2. Arquitectura

| Archivo | Responsabilidad |
|---|---|
| `src/components/practica/PronounQuestEngine.tsx` | Sesión, URL, persistencia, navegación, corrección diferida y accesibilidad |
| `src/components/practica/PronounQuestEngine.module.css` | Firma visual de la cadena y el banco final |
| `src/data/practica/pronoun-quest-types.ts` | Contrato independiente del idioma |
| `src/data/practica/create-pronoun-quest.ts` | Factoría determinista de los seis niveles |
| `src/data/practica/italian-pronoun-quest.ts` | Mapa y contenido editorial italiano |
| `scripts/check-pronoun-quests.mjs` | Guardián estructural, pedagógico y de cobertura |
| `tests/pronoun-quests.test.mjs` | Regresiones de dominio y formas sensibles |
| `tests/e2e/pronoun-quests.spec.ts` | Flujo real, móvil, persistencia y estado corrupto |

El motor comparte las primitivas `wlp-*`, el módulo visual estable del quiz de tiempos y el
contrato de experiencia de Práctica. Mantiene tipos y estado propios porque una respuesta por
tarjeta no tiene el mismo modelo que huecos escritos, selección de errores o conjugación. No se
debe forzar una abstracción de estado que mezcle ambos dominios.

## 3. Los seis niveles

| Nivel | Decisión | Forma de respuesta |
|---|---|---|
| 1 · El referente | escoger la forma que retoma el referente | cuatro opciones |
| 2 · La función | identificar el trabajo del pronombre en contexto | cuatro funciones |
| 3 · La posición | reconocer forma y orden natural | cuatro oraciones completas |
| 4 · La reparación | reemplazar una forma problemática | cuatro cambios completos `error → corrección` |
| 5 · La transformación | sustituir sin perder significado o concordancia | cuatro oraciones completas |
| 6 · La cadena final | mantener varios referentes a través de una escena | banco cerrado con distractores |

Cada familia aporta exactamente tres contextos a los niveles 1–5 y un hueco al nivel 6. Una
selección de una sola familia sigue mostrando cuatro tarjetas en el banco final. La selección de
todas las familias conserva distractores editoriales explícitos.

## 4. Contrato editorial por familia

Cada `PronounSeed` declara:

- `id` ASCII estable;
- explicación que aparece solo después de cerrar el nivel;
- tres ejemplos con exactamente un marcador `___`;
- forma correcta y tres distractores diferentes;
- pista contextual que no revela la respuesta;
- función correcta y tres funciones distractoras;
- forma incorrecta real para reparación;
- consigna de transformación, solución completa y tres distractores completos;
- fragmentos `before`, `answer`, `after` para la cadena final.

Los distractores no son ruido aleatorio. Deben representar confusiones plausibles del nivel:
persona, género, número, función, posición, registro o combinación. Ninguno puede ser también
válido dentro del mismo contexto y registro.

## 5. Reglas lingüísticas no negociables

1. El antecedente y la función deben ser recuperables sin adivinar intención.
2. Si el idioma permite omitir el sujeto, el contexto debe justificar por qué el pronombre se
   expresa: contraste, énfasis, desambiguación o cortesía.
3. Concordancia, elisión y contracción forman parte de la respuesta cuando distinguen la forma.
4. No se fija fuera del hueco una partícula que el estudiante necesite mover o reemplazar.
5. Las formas de tratamiento mantienen persona verbal y registro durante todo el contexto.
6. Una transformación conserva significado, referente y número; no basta con ser gramatical.
7. Los clíticos combinados se evalúan como unidad si su orden es el objetivo.
8. Un distractor deliberadamente agramatical solo se usa para representar un error frecuente
   claro; los demás deben seguir siendo plausibles.
9. La explicación enseña la regla que resuelve el caso, no repite simplemente la solución.
10. Las decisiones dudosas se resuelven con fuentes normativas primarias y se convierten en una
    regresión automatizada si son fáciles de perder.

## 6. Estado, URL y corrección

- `?topics=id-1,id-2` conserva la selección y `?level=1..6` el nivel.
- `localStorage` usa una clave única y versionada `wl-<idioma>-pronoun-quest-v1`.
- Se guardan intento, respuestas por nivel, banco final y mejores porcentajes.
- Recargar restaura el punto exacto si URL y selección guardada coinciden.
- Parámetros o estado corruptos vuelven a una configuración segura.
- Cambiar selección con progreso solicita confirmación y reinicia el intento.
- El estudiante no ve acierto, color de corrección ni solución antes del resumen.
- El resumen puntúa cada decisión y explica los errores.

## 7. Accesibilidad y visual

La familia pertenece a Práctica: usa `wlp-page`, `wlp-shell`, `wlp-card--path`, el acento de
Gramática y la tipografía editorial existente. Su única firma nueva es la cadena compacta
`referente → función → pronombre`.

- un solo `main`, aportado por el layout;
- tabs con flechas, Inicio y Fin;
- `aria-selected`, `aria-controls`, `tabpanel` y foco al cambiar de reto;
- resultados anunciados con `role="status"`;
- opciones y huecos son botones reales con foco visible;
- controles táctiles de al menos 44 px;
- cero `input` y `textarea`;
- sin banderas, emojis, degradados o un color propio por idioma;
- sin desborde horizontal a 390 px, en claro y oscuro.

## 8. Cómo añadir otro idioma

### Fase A — mapa contrastivo

Antes de programar, define inventario, nivel, variedad, registro y errores típicos del
hispanohablante. No traduzcas las siete categorías italianas literalmente. Por ejemplo, el
inglés necesita caso sujeto/objeto, demostrativos, posesivos determinantes/pronominales,
reflexivos y concordancia de referencia; no necesita un nivel centrado en orden de clíticos como
el italiano.

### Fase B — banco mínimo completo

Crea `<idioma>-pronoun-quest.ts` con todas las familias publicables. Cada familia debe cubrir los
seis niveles desde el primer commit. No publiques tarjetas “próximamente” dentro del motor.

### Fase C — montaje y descubrimiento

Crea la ruta `/herramientas/quizes/pronombres/<idioma>` como Server Component con metadata,
canonical, `GrammarLessonSchema` y `QuizSchema`. Registra el idioma en la página de familia y, si
cambia el catálogo principal, actualiza su prueba deliberadamente. Nunca copies el motor.

### Fase D — guardianes

Añade el banco a `scripts/check-pronoun-quests.mjs`, a `tests/pronoun-quests.test.mjs` y a las
rutas E2E. Incorpora regresiones para formas normativas sensibles del idioma.

### Orden de expansión recomendado

1. inglés, por valor de uso y menor complejidad de clíticos;
2. francés y portugués, después de validar el patrón de clíticos y tratamiento;
3. alemán, con caso explícito y referencias de género;
4. ruso, con caso, animacidad y ausencia de artículos;
5. japonés y coreano solo tras diseñar un mapa propio de omisión, demostrativos, partículas,
   honoríficos y niveles de habla. No se les impone la taxonomía romance.

Cada fase se publica por idioma completo; un fallo lingüístico detiene solo ese idioma, pero un
fallo del motor, catálogo o build detiene toda la publicación.

## 9. Puertas de calidad

Durante desarrollo:

```bash
npm run check:pronoun-quests
npx tsc --noEmit --pretty false
npx eslint <archivos tocados>
BASE_URL=http://localhost:<puerto> npx playwright test tests/e2e/pronoun-quests.spec.ts --project=chromium
```

Antes de integrar se ejecutan además, sobre `origin/main` actualizado:

```bash
git fetch origin
git rebase origin/main
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

La publicación termina solo cuando el deployment está `Ready` y el E2E pasa sobre
`https://www.idiomaswl.com`, no únicamente en local.

## 10. Definición de terminado

- mapa contrastivo revisado con fuentes normativas;
- tres contextos inequívocos por familia en niveles 1–5;
- cadena final completa y con distractores;
- corrección estrictamente diferida;
- ninguna respuesta abierta;
- selección, URL, restauración y estado corrupto verificados;
- navegación por teclado y móvil de 390 px verificados;
- catálogo, guardianes, unit tests, TypeScript, lint y build en verde;
- commit integrado en `main`, despliegue `Ready` y prueba productiva en verde.

## 11. Prompt para otro chat

```text
Implementa el siguiente idioma del quiz de pronombres siguiendo
docs/quizzes-blueprint-operativo.md y docs/quiz-pronombres-blueprint.md. Lee AGENTS.md y
docs/OPERACION-REPOSITORIO.md. Diseña primero el mapa contrastivo del idioma; no traduzcas las
categorías italianas si no existen. Reutiliza PronounQuestEngine y createPronounQuest, no añadas
texto libre ni corrección inmediata, registra el banco en catálogo/guardián/unit/E2E y completa
todas las puertas locales y de producción antes de declararlo terminado.
```
