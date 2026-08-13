# GOAL — Escalar el blueprint a las diez sub-habilidades de IELTS Writing

> Documento autocontenido. Pégalo entero en una sesión nueva y se puede trabajar sin más contexto.
> Estado medido el 12 de agosto de 2026.

---

## 1. El objetivo

Toda sub-habilidad de IELTS Writing tiene que ofrecer **cuatro bloques, en este orden y sin
saltarse ninguno**:

| # | Bloque | Qué es |
|---|---|---|
| 1 | **Explicación larga** | Qué es · por qué existe · **qué cuesta no hacerlo** · **dónde deja de aplicar**. Mínimo 250 palabras. |
| 2 | **Ejemplos** | El comparador vago→preciso, el banco agrupado por trabajo, resueltos y errores típicos. |
| 3 | **Ejercicio guiado** | El alumno escribe por pasos. El modelo detrás de un botón bloqueado hasta que escribe. |
| 4 | **Motor** | Reconocer primero, producir después. Cuatro opciones, cada una con su motivo. |

Las dos que casi ningún material de IELTS trae son `cost` y `limits`, y son obligatorias por el
tipo. Sin ellas alguien aplica una técnica correcta en el sitio equivocado.

**El blueprint ya existe.** No hay que diseñarlo:

```
src/app/(site)/practica/ielts/academic/writing/_shared/
  ├── skill-blueprint.ts     tipos: Explainer, GuidedExercise, countWords
  ├── SkillExplainer.tsx     bloque 1
  └── GuidedPractice.tsx     bloque 3
```

Ejemplo terminado y verificado: `task2/paraphrasing/` (datos en `paraphrasing-explainers.ts`,
montaje en `ParaphrasingTechniqueClient.tsx`).

---

## 2. Estado actual, medido

### Las diez habilidades transversales de Task 2

| # | Habilidad | Página propia | Blueprint |
|---|---|:-:|:-:|
| 1 | **Paraphrasing** | ✅ 5 técnicas | ✅ completo |
| 2 | Thesis and position | ❌ ficha → `introduccion` | ❌ |
| 3 | Topic sentences | ❌ ficha → `body-1` | ❌ |
| 4 | Explanation and development | ❌ ficha → `parrafos-cuerpo` | ❌ |
| 5 | Examples and evidence | ❌ ficha → `parrafos-cuerpo` | ❌ |
| 6 | **Cohesion and linking** | ✅ 7 familias | ⚠️ **solo falta 1 y 3** |
| 7 | Contrast and concession | ❌ ficha → `body-2` | ❌ |
| 8 | Sentence types | ❌ ficha → `introduccion` | ❌ |
| 9 | **Academic vocabulary** | ✅ 8 funciones | ❌ |
| 10 | Critical final review | ❌ ficha → `revision-final` | ❌ |

### El superhub de vocabulario

`/practica/ielts/academic/writing/vocabulario` — **3 unidades de 19**, 72 entradas de 400-600.

| Familia | Hecho | Falta |
|---|---|---|
| Task 1 por subparte | introducción, overview, tendencias | **comparaciones, procesos, mapas** |
| Task 2 por subparte | — | **introducción, body, conclusión, revisión** |
| Funciones transversales | (viven aún en `task2/academic-vocabulary`) | **mover aquí y subir de 6 a ~20 entradas cada una** |

---

## 3. El trabajo, en orden

### Fase A — Terminar el superhub de vocabulario (16 unidades)

1. Task 1: `comparaciones`, `procesos`, `mapas`
2. Task 2: `introduccion`, `body`, `conclusion`, `revision`
3. Mover las 8 funciones desde `task2/academic-vocabulary` a `/writing/vocabulario/`, subirlas
   a ~20 entradas cada una, y dejar **redirect permanente** desde la URL vieja (ya está
   publicada, no se puede romper).

Cada unidad: ≥15 entradas agrupadas por trabajo, ≥1 marcada `avoid`, explicación ≥250 palabras
con `cost` y `limits`, guiado de ≥3 pasos con `minWords > 0`, y drills de 4 opciones con motivo
propio cada una.

### Fase B — Linking words: solo lo que falta

**Ya está muy completo** (7 familias, motor, test mixto, reparación de párrafo). **No rehacer
nada.** Solo añadirle el bloque 1 (explicación larga por familia) y el bloque 3 (guiado).

### Fase C — Las 7 sub-habilidades sin página

Crear recorrido propio con los cuatro bloques para: thesis-and-position, topic-sentences,
explanation-development, examples-evidence, contrast-concession, sentence-types,
critical-final-review.

---

## 4. Reglas que no se negocian

**Del proyecto:**
- Leer `AGENTS.md` y `docs/OPERACION-REPOSITORIO.md` antes de tocar nada.
- **Nunca `git add -A` ni `git add .`** — el árbol lo comparten varias sesiones. Añadir solo
  rutas propias explícitas.
- **No tocar**: `src/data/practica/vocabulario/`, `components/practica/VocabularyJourney.tsx`,
  `practica/*/vocabulario/`, `scripts/check-vocabulario.mjs`, `docs/vocabulario-*.md`, ni nada
  bajo `practica/ielts/reading/`.
- **No commitear ni publicar sin aprobación explícita.**
- Máquina de 8 GB: **nunca abrir el preview del navegador**, crashea. Verificar con Playwright
  y `curl`.
- Matar servidores **por puerto**: `lsof -ti:3011 | xargs -r kill`. Nunca `pkill -f "next dev"`.

**De contenido:**
- **Ninguna página promete una banda.** Prohibido `Band \d`. Se habla del criterio, no del número.
- **Cada opción lleva SU motivo.** Una explicación para las cuatro no enseña a nadie.
- **El motor no pregunta por lo que la lección imprime.** Se mide por solapamiento de palabras.
- **Alargar distractores, nunca acortar la correcta.** Recortar la buena le quita la precisión
  que se está enseñando.
- **Cada entrada de vocabulario con su patrón.** Una palabra sin su construcción produce
  «peaked to 40%» y «detrimental for».
- Contenido en inglés; metadatos en español (así busca esta audiencia).
- `textarea` siempre con `spellCheck={false} autoCorrect="off" autoCapitalize="off"`.

**De método — esto es lo que más valor ha dado:**
- **Medir, no estimar.** Toda afirmación va respaldada por un script.
- **Morder todo.** Un test o una regla que nunca se ha visto fallar no prueba nada:
  reintroducir el defecto a propósito y comprobar que salta. En esta sesión las compuertas
  cazaron **seis defectos propios** que no se veían a ojo.
- **Guardar antes de confiar en un recorrido.** Un localizador vacío pasa sin mirar nada:
  afirmar el número de elementos antes de iterar.
- `innerText` devuelve el texto **ya transformado por el CSS**. `text-transform: uppercase`
  hace que una comparación sensible a mayúsculas no encuentre nada. Ya mordió dos veces.

---

## 5. Cómo verificar (obligatorio antes de dar nada por hecho)

```bash
npx tsc --noEmit
node scripts/check-ielts-task2-alignment.mjs
lsof -ti:3011 | xargs -r kill; npx next dev -p 3011 &
BASE_URL=http://localhost:3011 npx playwright test tests/e2e/ielts-task2-*.spec.ts --reporter=line
```

Referencia del estado verde a 12 de agosto de 2026: **173 tests pasan**, compuerta limpia,
`tsc` sin errores.

---

## 6. Aviso sobre la rama

La rama de trabajo va **por detrás de `origin/main`**, que ya recibió el lote anterior. Antes de
integrar:

```bash
git fetch origin && git rebase origin/main
```

Si el árbol tiene cambios sin commitear de otras sesiones, hacer el rebase **en un worktree
aparte** para no tocarlos:

```bash
git worktree add ~/Developer/idiomaswl-integracion -b integracion/<nombre> HEAD
```

Y avisar a las otras sesiones (Reading, TOEFL, vocabulario) de que `main` avanzó.
