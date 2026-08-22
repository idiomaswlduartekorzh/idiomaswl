# Quiz de tiempos verbales en inglés — blueprint y puertas de calidad

Fuente de verdad para construir `/herramientas/quizes/ingles` a partir de la experiencia del
quiz italiano, sin copiar sus defectos de cobertura, puntuación ni accesibilidad.

Estado: **blueprint cerrado el 21 de agosto de 2026 a partir de una auditoría del motor
italiano en `7d6001c0`.** Todavía no existe contenido inglés ni ruta pública.

Si este documento contradice una decisión posterior de David, manda David y se actualiza este
documento antes de implementar.

---

## 1. Decisión de producto

El estudiante llega, elige las formas que quiere practicar y recibe un recorrido de seis
niveles construido solo con esas formas. No ve aciertos, errores ni soluciones hasta terminar
el nivel activo.

Se conserva del italiano:

- selector inicial y presets por familia;
- seis mecánicas progresivas;
- textos mixtos donde las formas no seleccionadas aparecen resueltas;
- corrección determinista, sin IA;
- mejor puntaje local por selección y nivel;
- estilo visual de `/herramientas` y funcionamiento móvil.

Se corrige antes de reutilizar:

- cada forma elegible debe tener profundidad real en todos los niveles;
- los bancos se presentan mezclados y se modelan por identificador, no por texto;
- los textos puntúan cada hueco, no toda la historia como un único acierto;
- cambiar de nivel no borra respuestas silenciosamente;
- pestañas, foco y anuncios de resultados cumplen semántica accesible;
- la selección puede compartirse y recuperarse desde la URL.

## 2. Alcance lingüístico

Variedad editorial: **inglés estadounidense**. Se aceptan variantes británicas cuando el objetivo
es el tiempo verbal y la diferencia es únicamente ortográfica (`traveled` / `travelled`).

No se llama “tiempo” a todo dentro del código. La interfaz puede usar “tiempos y estructuras”;
los datos distinguen `tense`, `future-form`, `conditional` e `imperative`.

| Grupo | Formas seleccionables |
|---|---|
| Present | Present simple, present continuous, present perfect, present perfect continuous |
| Past | Past simple, past continuous, past perfect, past perfect continuous |
| Future | Future with *will*, *be going to*, future continuous, future perfect, future perfect continuous |
| Conditionals | Zero, first, second, third, mixed conditional |
| Instructions | Imperative |

Total inicial: **19 formas**. El selector usa estos identificadores estables:

```ts
type EnglishFormId =
  | 'present-simple' | 'present-continuous'
  | 'present-perfect' | 'present-perfect-continuous'
  | 'past-simple' | 'past-continuous'
  | 'past-perfect' | 'past-perfect-continuous'
  | 'future-will' | 'future-going-to' | 'future-continuous'
  | 'future-perfect' | 'future-perfect-continuous'
  | 'conditional-zero' | 'conditional-first' | 'conditional-second'
  | 'conditional-third' | 'conditional-mixed'
  | 'imperative'
```

Presets mínimos: `Todos`, `Present`, `Past`, `Future`, `Conditionals`. *Be going to* se incluye
porque el contraste con *will* es una decisión temporal central, aunque no sea un tiempo
morfológico independiente.

## 3. Los seis niveles

### Nivel 1 — Quick choice

Opción múltiple contextual. El estudiante reconoce forma, auxiliar, aspecto y concordancia.

- mínimo **3 ítems por forma**;
- cuatro opciones, una sola inequívocamente correcta;
- el contexto contiene el ancla temporal necesaria;
- ningún distractor se elimina solo por longitud, mayúscula o puntuación;
- al seleccionar una opción no aparece color de correcto/incorrecto.

### Nivel 2 — Micro stories

Textos de una o dos frases con el infinitivo junto al hueco. El estudiante escribe la forma
exacta.

- mínimo **3 microtextos por forma**;
- una unidad evaluable por texto salvo que dos huecos formen un contraste necesario;
- todas las variantes aceptadas se declaran en `answers[]`;
- contracciones y formas completas válidas se aceptan: `hasn't arrived` y `has not arrived`;
- si una partícula o adverbio cambia de posición, entra dentro de la respuesta completa. Nunca
  se deja fijo un `already`, `just`, `yet`, `still`, `never`, `not` o partícula verbal que pueda
  duplicarse o forzar un orden incorrecto.

### Nivel 3 — Connected stories

Relatos de cuatro a siete huecos. Las formas no seleccionadas se muestran resueltas para
conservar el texto; las seleccionadas siguen siendo editables.

- mínimo **2 relatos que contengan cada forma**;
- cada hueco vale un punto independiente;
- el resumen agrupa por relato, pero muestra el resultado de cada hueco;
- ninguna frase admite dos tiempos razonables por falta de contexto;
- los segmentos fijos se prueban junto con cada variante aceptada para evitar duplicaciones.

### Nivel 4 — Error lab

El estudiante selecciona la forma defectuosa y escribe su corrección.

- mínimo **2 retos por forma**: uno de elección temporal y otro de forma/ortografía;
- exactamente un token defectuoso por reto;
- seleccionar el token y corregirlo son ambas condiciones de acierto;
- los demás verbos deben ser indiscutiblemente correctos;
- la solución no aparece hasta cerrar el nivel.

### Nivel 5 — Time director

Cláusulas cerradas que se asignan a funciones temporales: background, interrupted event,
earlier event, duration, prediction, prior future result, hypothetical result, entre otras.

- mínimo **2 apariciones por forma** en el banco total;
- cada ranura vale un punto;
- las opciones se mezclan con semilla de intento;
- elegir una sola forma sigue produciendo al menos cinco ranuras, no un nivel de una pregunta.

### Nivel 6 — Final reconstruction

Texto completo con banco cerrado. No hay escritura libre: se selecciona un espacio y luego una
tarjeta.

- mínimo 12 huecos y al menos 2 por cada familia elegida cuando la selección lo permita;
- las formas no seleccionadas se muestran resueltas;
- el banco usa el orden editorial mezclado, nunca el orden de los huecos;
- dos tarjetas con el mismo texto siguen siendo dos entidades distintas;
- cada hueco vale un punto;
- se puede vaciar o reemplazar cualquier asignación antes de terminar.

## 4. Corrección sin IA

La corrección es cerrada y auditable. No se aceptan respuestas por similitud.

```ts
type AcceptedAnswer = {
  value: string
  variety?: 'us' | 'uk' | 'both'
  note?: string
}

type Gap = {
  id: string
  formId: EnglishFormId
  lemma: string
  answers: AcceptedAnswer[]
}
```

La normalización puede:

1. aplicar Unicode NFKC;
2. unificar apóstrofos tipográficos y rectos;
3. ignorar mayúsculas no significativas;
4. colapsar espacios repetidos;
5. recortar espacios exteriores.

No puede:

- eliminar palabras, auxiliares o negaciones;
- corregir ortografía automáticamente;
- aceptar distancia de Levenshtein;
- convertir una forma en otra;
- ignorar puntuación cuando esta sea el objetivo explícito.

Las contracciones se enumeran, no se adivinan. Si el contexto permite `I had` y `I'd`, ambas van
en `answers[]`; si `I'd` sería ambiguo con `I would`, se evita ese contexto o se acepta solo la
forma completa.

## 5. Puntuación y resultados diferidos

La unidad de puntaje es una **decisión lingüística**, no necesariamente una tarjeta visual.

| Nivel | Unidad de puntaje |
|---|---|
| 1 | opción elegida |
| 2 | hueco |
| 3 | hueco |
| 4 | reto completo: token + corrección |
| 5 | ranura temporal |
| 6 | hueco reconstruido |

Durante el nivel se permite guardar, retroceder y modificar. No se renderizan clases, iconos,
mensajes ni atributos que delaten el acierto. Al terminar:

- resultado total y porcentaje;
- respuesta del estudiante por unidad;
- solución solo donde hubo error;
- explicación breve ligada al contexto;
- repetir nivel o pasar al siguiente disponible.

El mejor puntaje se guarda por `language + schemaVersion + selectionSignature + levelId`.
Las respuestas en curso se conservan al cambiar de pestaña; si se decide descartarlas, debe existir
confirmación explícita.

## 6. Motor compartido, contenido separado

No se copia `ItalianTenseQuest.tsx` para cambiar textos. Se extrae un motor genérico y cada idioma
aporta configuración y datos.

```text
src/components/practica/tense-quest/
  TenseQuestEngine.tsx
  TenseQuestEngine.module.css
  scoring.ts
  normalization.ts
  types.ts

src/data/practica/tense-quests/
  italian.ts
  english.ts
```

```ts
type TenseQuestConfig<FormId extends string> = {
  language: 'it' | 'en'
  locale: string
  storageKey: string
  forms: readonly FormOption<FormId>[]
  presets: readonly Preset<FormId>[]
  levels: readonly LevelDefinition<FormId>[]
  finalChallenges: readonly BankChallenge<FormId>[]
  copy: QuestCopy
}
```

El motor es responsable de selección, navegación, persistencia, puntuación y accesibilidad. Los
archivos de idioma son responsables de formas aceptadas, contexto, explicaciones y cobertura.

## 7. Estado, URL y accesibilidad

Flujo explícito:

```text
configure → level-in-progress → level-summary
              ↑      ↓              |
              └── edit previous ────┘
```

Requisitos:

- `?forms=past-simple,past-perfect` refleja la selección y permite compartirla;
- la URL no incluye respuestas ni puntajes;
- cada `tab` tiene `id`, `aria-controls` y un `tabpanel` asociado;
- solo la pestaña activa tiene `tabIndex=0`; flechas izquierda/derecha cambian de pestaña;
- el resumen usa un nodo `role="status"` o `aria-live="polite"` dedicado; el formulario entero
  no es una región viva;
- al avanzar se enfoca el título del nuevo reto; al terminar, el título del resultado;
- todos los controles tienen nombre accesible y foco visible;
- el progreso expone `role="progressbar"`, `aria-valuemin`, `aria-valuemax` y `aria-valuenow`;
- se respeta `prefers-reduced-motion` al desplazar o animar;
- los botones táctiles tienen al menos 44 × 44 px.

## 8. Esquema de banco robusto

Las tarjetas no se identifican por su texto. En inglés habrá duplicados frecuentes.

```ts
type BankCard = {
  id: string
  text: string
}

type BankGap<FormId extends string> = {
  id: string
  formId: FormId
  answerCardId: string
}

type BankChallenge<FormId extends string> = {
  id: string
  segments: string[]
  gaps: BankGap<FormId>[]
  cards: BankCard[]
}
```

La UI renderiza `cards` en orden mezclado. El puntaje compara `cardId`; nunca usa
`Object.values(assignments).includes(text)` porque eso inutiliza tarjetas duplicadas y revela el
orden cuando las tarjetas se derivan de `gaps`.

## 9. Volumen editorial mínimo

El primer release no sale con una muestra de una pregunta por forma.

| Banco | Mínimo |
|---|---:|
| Nivel 1 | 57 ítems: 3 × 19 formas |
| Nivel 2 | 57 microtextos: 3 × 19 formas |
| Nivel 3 | 12 relatos, con 2 apariciones mínimas por forma |
| Nivel 4 | 38 errores: 2 × 19 formas |
| Nivel 5 | 12 mapas, con 2 apariciones mínimas por forma |
| Nivel 6 | 6 reconstrucciones finales |

Para que una selección pequeña no produzca niveles vacíos o de un solo reto, el motor elige de
cada banco hasta completar un objetivo de sesión:

- niveles 1, 2 y 4: 6–10 retos;
- nivel 3: 2–4 relatos;
- nivel 5: 5–8 ranuras;
- nivel 6: una reconstrucción de 12–18 huecos.

Si el banco todavía no cumple, la forma no aparece seleccionable en producción.

## 10. Guardián obligatorio

Crear `scripts/check-tense-quests.mjs` y ejecutarlo en `prebuild`. Debe fallar si:

1. hay identificadores duplicados;
2. `segments.length !== gaps.length + 1`;
3. una respuesta de opción múltiple no está entre sus opciones;
4. una ranura temporal no tiene su respuesta entre las opciones;
5. el multiconjunto de `answerCardId` no coincide con las tarjetas requeridas;
6. alguna forma seleccionable incumple la cobertura mínima de §9;
7. un reto queda sin explicación o sin ancla contextual;
8. una forma declarada no existe en el catálogo;
9. el mismo distractor aparece dos veces en una pregunta;
10. una respuesta contiene una partícula móvil repetida en el segmento adyacente;
11. una historia puede quedar sin huecos activos para la selección que la incluye;
12. el orden del banco coincide con el orden de respuestas de los huecos;
13. una tarjeta duplicada comparte identificador con otra;
14. la copia pública promete un número de niveles que una forma no puede completar.

El guardián imprime una matriz `forma × nivel × número de unidades`, no solo un “pasó”.

## 11. Auditoría que originó este blueprint

Hallazgos sobre el italiano en `7d6001c0`:

| Prioridad | Hallazgo | Evidencia |
|---|---|---|
| P0 | La ruta pública quedó en 404 después de que un despliegue directo posterior reemplazara el artefacto de `main`; Git todavía contiene el quiz | `https://www.idiomaswl.com/herramientas/quizes/italiano` y despliegue `dpl_AUkp7SJvjVYSBdgRqn5mSjbA5eaH` |
| P1 | El nivel 6 declara un banco mezclado, pero la UI ignora `FINAL_CHALLENGE.bank` y renderiza `finalGaps` en orden de huecos | `ItalianTenseQuest.tsx:560-571` |
| P1 | Passato prossimo, futuro semplice y condizionale presente no tienen reto de nivel 4 | matriz de cobertura del banco |
| P1 | Una selección de un solo tiempo suele dejar un solo reto por nivel; mide reconocimiento puntual, no práctica | bancos actuales y `levelCounts` |
| P2 | Un relato con varios huecos vale cero completo si falla uno | `ItalianTenseQuest.tsx:230-233` |
| P2 | Cambiar de nivel descarta las respuestas del nivel activo sin aviso | `ItalianTenseQuest.tsx:310-317` |
| P2 | El banco bloquea por texto, por lo que no admite dos tarjetas iguales | `ItalianTenseQuest.tsx:357-365` y `523-565` |
| P2 | Hay `tablist` y `tab`, pero no `tabpanel`, relaciones ni navegación con flechas | `ItalianTenseQuest.tsx:703-727` |
| P2 | Toda la tarjeta es `aria-live`, demasiado amplia para inputs controlados | `ItalianTenseQuest.tsx:727` |

Pasaron la auditoría:

- todos los identificadores actuales son únicos;
- todos los textos cumplen `segments = gaps + 1`;
- respuestas de opción múltiple y línea temporal pertenecen a sus bancos;
- el caso de `già` ya no duplica ni fija la posición;
- normalización de espacios, mayúsculas y apóstrofos correcta para italiano;
- resultados realmente diferidos hasta el cierre del nivel;
- flujo móvil sin desbordamiento en la prueba anterior al reemplazo del despliegue.

## 12. Orden de implementación

1. Restaurar producción desde un commit de `main`, no promoviendo a ciegas un artefacto anterior.
2. Extraer el motor compartido y corregir banco, puntaje, persistencia y semántica de pestañas.
3. Añadir el guardián y hacer pasar primero al italiano.
4. Construir el catálogo inglés completo y revisar lingüísticamente cada respuesta.
5. Crear `/herramientas/quizes/ingles`, metadata, schema y tarjeta en el hub.
6. Ejecutar guardián, ESLint, TypeScript, build y pruebas de navegador en escritorio/móvil.
7. Publicar solo desde `main` y verificar la ruta pública, selección individual, preset `Todos`,
   resultados diferidos, duplicados de banco y navegación por teclado.

## 13. Definición de terminado

El quiz de inglés está listo cuando:

- las 19 formas pasan la matriz de cobertura;
- ninguna selección produce un nivel vacío o trivial;
- los seis niveles corrigen sin IA y sin ambigüedad;
- ninguna pista visual o de orden revela respuestas antes del resumen;
- el motor compartido sigue haciendo pasar el italiano;
- teclado, lector de pantalla, 390 px y escritorio pasan la prueba;
- `npm run check:practica-catalog`, `npx tsc --noEmit` y `npm run build` pasan;
- el commit está en `main` y la URL pública responde 200 con el flujo completo.
