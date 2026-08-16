# Sistema visual de Práctica — objetivo de trabajo

> **Estado:** especificación aprobada, sin ejecutar. Escrita el 16 de agosto de 2026.
> **Decisión de producto (David):** adaptación **seria**, sin excepciones. Práctica entera
> adopta el tono editorial de Task 2 Writing, incluidos los hubs de nivel.

Este documento es el encargo completo. Una sesión o un agente debe poder ejecutarlo sin
volver a la conversación que lo originó. Si algo aquí contradice lo que ves en el código,
gana el código: vuelve a medir y corrige este documento antes de seguir.

---

## 1. El objetivo en una frase

Que las seis habilidades de práctica —lectura, escucha, gramática, escritura, habla,
vocabulario— se vean como **un solo producto**, heredando el lenguaje visual de
`/practica/ielts/academic/writing/task2/introduccion`, pero enchufado a los tokens
semánticos reales del sitio y no al puente heredado que hoy usa esa página.

---

## 2. Estado medido hoy (16 ago 2026)

No es una impresión. Son las cifras que motivan el encargo:

| Habilidad | Cómo está construida hoy |
|---|---|
| Lectura | `src/components/reading/reading.module.css` — módulo propio con **33 colores fijos** |
| Escucha | Clases globales `listen-*` en `globals.css` (ya tokenizada, ya con modo oscuro) |
| Gramática | `src/styles/grammar.css`, 1.198 líneas, clases `quest-*` / `gram-*` |
| Escritura | Clases globales `writing-integrated__*` en `globals.css` |
| Vocabulario | `VocabularyJourney.tsx` — 96 estilos en línea |
| Historias | `StoryEngine.tsx` — 132 estilos en línea, con hex crudos |
| Habla | **831 estilos en línea repartidos en 24 archivos `Content.tsx`** — la misma pantalla copiada 24 veces |

Además:

- **Trece redondeos de esquina distintos** conviven en la sección: 6, 7, 8, 9, 10, 11, 12,
  13, 14, 16, 18, 20 px y píldora.
- **Siete anchos de contenedor distintos**: hub 900, escucha 1180, lectura 1280 (sin límite
  propio), habla 780, vocabulario 640, historias 720, gramática entre 700 y 900.
- **El color prometido no sobrevive al clic.** Los 26 hubs de nivel anuncian Gramática en
  morado `#7c3aed`; las páginas de gramática usan seis acentos distintos según el idioma
  (`#1a2ecc`, `#dc2626`, `#166534`, `#009246`, `#c60c30`, `#c9a900`) y ninguno es morado.
  Escucha se anuncia `#0369a1` y por dentro siempre es `#0066cc`. Lectura se anuncia con el
  color de la bandera de cada idioma y por dentro siempre es azul.

**Código muerto detectado de paso:** `ReadingLocaleShell.tsx` (cabecera de sitio propia,
marca «W», pie de página) no se importa desde ninguna ruta. Con él muere el bloque `.shell`
de `reading.module.css`. Bórralos en la fase 5.

---

## 3. De dónde salen los colores — la trampa que hay que evitar

`globals.css` tiene **dos** capas de variables. Hay que saber cuál es cuál.

**La buena — tokens semánticos.** Definidos en claro (`globals.css:7998`) y en oscuro
(`globals.css:8024`). Es el sistema del sitio:

```
--wl-canvas  --wl-surface  --wl-surface-raised  --wl-border
--wl-text    --wl-text-soft  --wl-inverse  --wl-on-inverse
--wl-accent  --wl-accent-action
```

**El puente — `--wl-panel-*` y `--wl-on-panel-*`.** Existe **solo dentro del ámbito
oscuro** (`globals.css:8281`). Se creó para tapar las páginas viejas de IELTS/ICFES sin
reescribirlas. El propio archivo dice, textualmente:

> «Retire a role by migrating its module to the semantic tokens.»

Task 2 está construida sobre el puente: 130 de sus 163 menciones de color son
`var(--wl-panel-…, #hex)`. **Eso es exactamente lo que no se propaga.** El sistema nuevo lee
de los tokens buenos. El puente se queda donde está, muriendo despacio.

### Defecto real que el puente introduce y que NO se replica

En `page.module.css` de Task 2:

```css
.feedbackCorrect   { background: var(--wl-panel-raised, #effaf4); … }
.feedbackIncorrect { background: var(--wl-panel-raised, #fff2f2); … }
.feedbackNeutral   { background: var(--wl-panel-raised, #f2f6ff); … }
```

En claro son verde, rosa y azul. **En oscuro los tres resuelven al mismo gris**
(`--wl-surface-raised`), así que la caja de acierto y la de error quedan idénticas y solo
las distingue el color del texto. Lo mismo le pasa a `.option > span` (la bolita del número
se funde con la tarjeta) y a `.levelButtonDone span` (pierde el verde de «hecho»).

Los tonos correctos **ya existen** y no se usan: `--wl-panel-tint-ok`,
`--wl-panel-tint-alert`, `--wl-panel-tint-info`, `--wl-panel-tint-warn`,
`--wl-panel-tint-purple`. El sistema nuevo define sus propios equivalentes sobre los tokens
buenos, con `color-mix`, y **la caja de acierto y la de error tienen que seguir siendo
distinguibles en oscuro sin leer el texto**. Es criterio de aceptación, no un detalle.

---

## 4. El sistema

Archivo nuevo: **`src/styles/practica-ui.css`**, importado desde `globals.css`. Prefijo de
clase **`wlp-`** (WeLearn Práctica). Ninguna clase existente se renombra.

### 4.1 Escala — cerrada, no negociable

```css
:root {
  /* Radios: cuatro valores. Nada de 7, 9, 11, 13, 14, 16, 18, 20. */
  --wlp-r-sm: 4px;
  --wlp-r:    6px;   /* por defecto: tarjetas, opciones, botones, campos */
  --wlp-r-lg: 8px;
  --wlp-r-pill: 999px;

  /* Ancho: uno solo, en toda la sección */
  --wlp-shell: 1180px;

  /* Tipografía */
  --wlp-h1:         clamp(2.25rem, 6vw, 4.6rem);   /* hub de idioma y de nivel */
  --wlp-h1-compact: clamp(1.9rem, 4.5vw, 3rem);    /* páginas de ejercicio */
  --wlp-h2:         clamp(1.7rem, 4vw, 2.65rem);
  --wlp-lead:       1.1rem / 1.75;
}
```

Los valores salen de Task 2 medida, no inventados: de sus 45 redondeos, 29 son de 6 px y el
resto 4, 5 y 8. El 5 px se absorbe en 4.

### 4.2 Superficies y texto

Todo se pide prestado. **Ni un hex suelto en el archivo nuevo.**

```css
.wlp-page {
  --wlp-ink:     var(--wl-text);
  --wlp-muted:   var(--wl-text-soft);
  --wlp-line:    var(--wl-border);
  --wlp-surface: var(--wl-surface);
  --wlp-raised:  var(--wl-surface-raised);
  --wlp-accent:  var(--wl-accent);          /* por defecto; lo pisa la habilidad */

  --wlp-tint-ok:    color-mix(in srgb, var(--wlp-ok) 12%, var(--wl-surface));
  --wlp-tint-alert: color-mix(in srgb, var(--wlp-alert) 12%, var(--wl-surface));
  --wlp-tint-info:  color-mix(in srgb, var(--wlp-info) 12%, var(--wl-surface));
}
```

`color-mix` sobre `--wl-surface` resuelve el defecto de la sección 3 solo: en claro da un
tinte pálido, en oscuro un tinte oscuro con el mismo matiz, y acierto y error nunca colapsan
en el mismo color.

**Modo oscuro: un solo bloque, y solo para los acentos.**

> *Corregido al ejecutar la fase 0.* La regla original decía «cero bloques», copiando a
> Task 2. Al construirlo se vio que no se sostiene: superficies, texto y filetes sí derivan
> solos de `--wl-*`, pero **los acentos son color nuevo** —no existen en la capa de tokens—
> y un navy legible sobre blanco no lo es sobre `#131a24`. No hay `color-mix` que aclare
> solo lo que hace falta aclarar.
>
> Queda así: **el bloque de acentos es el único sitio del archivo donde puede aparecer un
> `[data-theme="dark"]`, y el único donde puede aparecer un hex.** Si cualquier otra regla
> llega a necesitar uno, está mal construida: quiere decir que escribió un color en vez de
> pedirlo. Eso sigue siendo criterio de aceptación.

El ámbito es `:root[data-wl-surface="editorial"][data-theme="dark"]`, el mismo que usa la
capa de tokens. No hace falta variante de `prefers-color-scheme`: en las rutas editoriales
el oscuro es explícito —lo enciende el interruptor, no el sistema operativo— porque el
bloque editorial de `globals.css` va después y gana por orden de origen.

### 4.3 Las primitivas — quince, y solo quince

Portadas de Task 2, reconectadas a los tokens buenos:

| Clase | Qué es | Salida de |
|---|---|---|
| `.wlp-page` | Lienzo de la página + declaración de tokens | `.page` |
| `.wlp-shell` | Contenedor centrado de 1180 px | `.shell` |
| `.wlp-breadcrumb` | Migajero (soporta `<a>` y `<button>`) | `.breadcrumb` |
| `.wlp-hero`, `.wlp-hero-lead` | Encabezado de página con filete inferior | `.hero`, `.heroLead` |
| `.wlp-eyebrow` | Antetítulo mono, mayúsculas, en el acento | `.eyebrow` |
| `.wlp-section`, `.wlp-section-heading` | Ritmo vertical de sección | `.section`, `.sectionHeading` |
| `.wlp-card` | Tarjeta base, radio 6, borde de 1 px | `.studyCard` |
| `.wlp-card--path` | Variante con filete superior de 4 px en el acento | `.pathCard` |
| `.wlp-option`, `.wlp-option-grid` | Opción de respuesta con bolita numerada | `.option` |
| `.wlp-feedback` + `--ok/--alert/--neutral` | Recuadro de corrección | `.feedback*` **(corregido)** |
| `.wlp-btn`, `.wlp-btn--secondary`, `.wlp-btn--icon` | Botones (icono: 42×42) | `.secondaryButton`, `.iconButton` |
| `.wlp-tabs` | Pestañas horizontales con desplazamiento | `.levelTabs` |
| `.wlp-level-btn` + `--active/--done` | Selector de nivel, alto mínimo 62 px | `.levelButton*` |
| `.wlp-next` | Rejilla de enlaces salientes al pie | `.nextLinks` |
| `.wlp-meter` | Barra de progreso | `.wordMeter` |

Lo demás de Task 2 (`gapPopover`, `essayWriter`, `bandButton`, `assemblyWorkspace`…) es de
esa lección y **no sube al sistema**. De sus 1.926 líneas, unas 300 son sistema.

### 4.4 Contrato de acento — una sola fuente de verdad

Archivo nuevo: **`src/data/practica/skill-accents.ts`**.

Regla dura: **el color de la tarjeta en el hub y el color de la página a la que lleva salen
de la misma línea de este archivo.** Ambos lados lo importan. Ninguno lo escribe a mano.

Valores fijados en la fase 0:

| Habilidad | Claro | Oscuro | De dónde sale |
|---|---|---|---|
| Lectura | `#1c4b9c` | `#86b4ff` | Azul tinta |
| Gramática | `#6941a5` | `#b79bea` | `--intro-purple` de Task 2 |
| Escritura | `#18794e` | `#45c88a` | `--intro-green` de Task 2 |
| Habla | `#a84f08` | `#f2b65a` | `--intro-orange` de Task 2 |
| Vocabulario | `#b42332` | `#ff8f99` | `--intro-red` de Task 2 |
| Escucha | `#176b87` | `#6fd0e8` | `--intro-link` de Task 2 |

Cuatro de los seis vienen literalmente de la paleta de Task 2, que es la referencia. Los
oscuros son los que el arreglo de modo oscuro ya había calibrado para estos fondos.

**Gramática se queda morada**, que es lo que los 26 hubs ya prometen. Así el contrato se
cierra moviendo solo el lado de dentro, y las tarjetas no cambian de color.

Los acentos por idioma que hoy tiene lectura (banderas) **se retiran**: un acento por
habilidad, igual en los ocho idiomas.

Para pintar se usa `.var`, no `.light`. Los literales están en el archivo para las imágenes
OG, que se generan en servidor y no ven el CSS.

---

## 5. Lo que cambia a la vista y hay que asumir

La decisión es «seria», así que:

- **Fuera los emoji de las tarjetas de habilidad** (📖 📐 ✍️ 🗣️ 📚 🎧). Los sustituye el
  tratamiento de Task 2: antetítulo mono en mayúsculas + filete superior de 4 px en el
  acento (`.wlp-card--path`).
- **Fuera los degradados** `linear-gradient(135deg, ${c}0a …)` de las tarjetas de los hubs.
  Superficie plana con borde de 1 px.
- **Esquinas de 18 px → 6 px.** Es el cambio que más se nota. Práctica pasará a verse
  notablemente más severa, y eso es lo pedido.

---

## 6. Plan de ejecución

Aditivo y reversible. **Un commit por fase.** Nada de fases combinadas: el valor está en
poder mirar cada habilidad por separado y revertirla sola.

### Fase 0 — El sistema, sin adoptarlo `[HECHA — 16 ago 2026]`

Tres archivos nuevos, ninguno existente modificado:

- `src/styles/practica-ui.css` — la escala, los acentos y las quince primitivas.
- `src/data/practica/skill-accents.ts` — el contrato de color.
- `src/app/(site)/practica/layout.tsx` — carga el CSS. No envuelve nada ni añade marcado.

El CSS **no** se importa desde `globals.css`, como decía el plan original. Va en un layout
de tramo, que es la convención que ya sigue `grammar.css`, y así no se le envía a home —que
conserva a propósito el sistema visual antiguo. Comprobado sobre el build: lo cargan las
rutas de `/practica` y ninguna otra.

Verificado: `tsc`, `check:practica-catalog` (465 temas íntegros) y `build` en verde; el
bloque oscuro y los `color-mix` sobreviven a la minificación; cero clases `wlp-` en uso, así
que no cambia un píxel de nada.

### Fase 1 — Habla `[HECHA — 16 ago 2026]`

Dos archivos nuevos —`src/components/practica/SpeakingPractice.tsx` y su módulo CSS— y los
24 `Content.tsx` reescritos para llamarlos. **Los datos no se tocaron:** `interface Phrase`,
`PHRASES`, `CATEGORIES` y `CAT_ES` se copiaron byte a byte, y hay un verificador que lo
comprueba archivo por archivo.

> *Corregido al ejecutar.* El plan decía «la misma pantalla copiada 24 veces». Medido, eran
> **tres interfaces distintas**:
>
> - **13 archivos** — numerito, botón «▼ nota» y botón de marcar en la fila.
> - **4 archivos** (coreano, italiano, japonés y ruso A1) — tarjeta que se despliega al
>   pulsarla entera, categoría como chip arriba y el botón de marcar escondido dentro.
> - **7 archivos** (los B1 menos inglés) — casilla de verificación a la izquierda, chip de
>   categoría a la derecha, sin aviso de completado y con un cajón de enlaces al cerrar.
>
> Se unificaron a la primera, que es la mayoritaria y la más completa. **Once páginas
> cambian de interacción, no solo de piel**: las 4 del grupo A1 ganan botón de nota y botón
> de marcar siempre visible; las 7 B1 ganan el numerito y pierden la casilla.

Los ocho idiomas no guardan la frase igual y **no se les obligó a hacerlo**. Hay cuatro
nombres para la romanización —`romanization`, `romaja`, `romaji`, `translit`— y cada archivo
traduce su forma al llamar al componente. Renombrarlos habría tocado 3.436 líneas de datos
para nada.

Verificado: `tsc`, `check:practica-catalog` (465 temas) y `build` en verde, más el
verificador de datos sobre los 24 archivos.

### Fase 2 — Los 28 hubs de nivel
Aquí se aplica la sección 5 (fuera emoji, fuera degradados, esquinas a 6 px) y se conecta el
contrato de acento. Es la fase que hace visible el cambio de tono.

### Fase 3 — Escritura y escucha
Baratas: ya usan clases globales con tokens. Sustituir sus primitivas propias por las
compartidas, conservando su comportamiento. **Escucha ya tiene modo oscuro resuelto — no
regresarlo.**

### Fase 4 — Vocabulario e historias
96 y 132 estilos en línea a clases. Ojo: `StoryEngine.tsx` tiene hex crudos
(`#059669`, `#d97706`, `#dc2626`, `#0f3d8c`); van al contrato de acento o a los tokens.

### Fase 5 — Gramática y lectura
Las caras. Gramática: `grammar.css` (1.198 líneas) mantiene `--topic-color` pero lo recibe
del contrato. Lectura: retirar la paleta propia de 33 colores y borrar el código muerto
(`ReadingLocaleShell.tsx` y el bloque `.shell`).

---

## 7. Criterios de aceptación

Cada fase se cierra solo si:

1. `npm run check:practica-catalog` pasa. **No se baja ningún umbral ni se silencia.** Si se
   queja, la rama se llevó algo publicado por delante; recupéralo con
   `git checkout origin/main -- <ruta>`.
2. `npx tsc --noEmit` y `npm run build` pasan.
3. **Modo oscuro:** la caja de acierto y la de error se distinguen sin leer el texto. Ningún
   texto sobre fondo del mismo color. Ver `project_dark_mode` — práctica e ICFES ya se
   arreglaron el 16 de agosto (`f5504e13`); esta obra no puede regresarlo.
4. **Contrato de acento:** el color de la tarjeta del hub coincide con el de la página
   destino. Verificable a ojo en tres habilidades al azar.
5. `practica-ui.css` sigue sin un solo hex suelto y sin bloques de modo oscuro.
6. Las rutas de escucha, IELTS e ICFES protegidas por el guardián siguen en pie
   (ver `AGENTS.md`).

---

## 8. Lo que no se toca

- **Task 2 Writing.** Es la referencia, no la víctima. No se refactoriza en esta obra.
- **`/examenes`, `src/data/exams.ts`, `src/data/mocks/` y su CSS.** Diseño aprobado por
  David; fuera de alcance.
- **Home.** `globals.css:7995` lo dice: «Home intentionally keeps the legacy visual system.»
- **Las 480 lecciones de escucha, sus 24 rutas y sus mp3.** Cambia su piel, nunca su
  contenido ni su estructura de datos. Ver `docs/escucha-estado.md`.
- **El puente `--wl-panel-*`.** No se amplía ni se borra. Muere cuando su último módulo
  migre.

---

## 9. El árbol de trabajo es compartido — commitea pronto

Durante la fase 1, otra sesión cambió la rama del árbol de `fix/dark-mode-icfes-20260816` a
`refactor/jubilar-puente-colores-20260816` mientras se trabajaba. Los 24 archivos ya
reescritos volvieron a su estado anterior sin aviso: eran archivos versionados, y un cambio
de rama se los lleva. Los archivos nuevos sin versionar sobrevivieron.

De ahí dos costumbres para el resto de fases:

1. **Commitea en cuanto una fase pase las comprobaciones**, no al final de la jornada.
2. **Antes de dar por buena una comprobación, confirma que los cambios siguen ahí.** Un
   `tsc` en verde sobre archivos que ya se revirtieron es un verde que no significa nada.

Y la de siempre: **nunca `git add -A`**, solo las rutas propias explícitas.

## 10. Antes de integrar en `main`

Lo de siempre, y en este orden (`AGENTS.md`):

```bash
git fetch origin
git rebase origin/main
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Hay sesiones en paralelo sobre el mismo árbol: **nunca `git add -A`**, solo las rutas
propias explícitas.
