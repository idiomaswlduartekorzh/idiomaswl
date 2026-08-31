# HR-02 v2 — UI del hub TOEFL y catálogo de Ejercicios

**Estado:** revisión solicitada tras `changes_requested`

**Enmienda vigente:** `docs/toefl-sectional-hr01a-information-architecture.md`

**Referencia visual auditada:** `https://www.idiomaswl.com/practica/ielts`

## 1. Corrección de enfoque

La primera propuesta resolvía una página de Listening. Era una pantalla razonable para una etapa posterior, pero no respondía al modelo mental del hub TOEFL.

La nueva propuesta empieza por la pregunta real del usuario:

> ¿Quiero hacer un ejercicio específico, seguir una práctica guiada o presentar un simulacro completo?

Reading, Listening, Writing y Speaking aparecen después de elegir **Ejercicios**, donde organizan los 12 tipos vigentes del TOEFL 2026.

## 2. Qué reutilizamos de la UI de IELTS

- fondo editorial claro y contenedor amplio;
- breadcrumb breve;
- H1 grande que explica la decisión principal;
- franja factual que resume lo que existe;
- tarjetas de ruta grandes con estado visible;
- separación explícita entre contenido disponible y contenido en desarrollo;
- copy que dice qué encontrará el usuario antes de hacer clic;
- pocos acentos visuales y ausencia de decoración que compita con la arquitectura.

No se copia el contenido de IELTS. Se reutiliza el sistema de jerarquía y estados porque ya pertenece a WeLearn.

## 3. Dirección visual

### Paleta

| Rol | Color |
|---|---|
| Navy WeLearn | `#102E6F` |
| Rojo WeLearn | `#B42332` |
| Teal informativo | `#176B87` |
| Verde disponible | `#18794E` |
| Fondo editorial | `#F7F8FC` |
| Texto secundario | `#5C6680` |

### Tipografía

- Geist para títulos y cuerpo, igual que el producto actual.
- Geist Mono o fallback monoespaciado para estados, cantidades y etiquetas.
- H1 entre 40 y 76 px según viewport; cuerpo entre 16 y 18 px.

### Firma funcional

La firma de esta página no es una ilustración: son **tres puertas de producto** con el mismo peso visual y estados inequívocos. El riesgo deliberado es no usar un hero promocional ni una CTA única; la elección de producto es el hero.

## 4. Pantalla 1 — `/practica/toefl`

### Hero

- Eyebrow: `Práctica TOEFL · Ejercicios, práctica y simulacros`.
- H1: **“Elige cómo quieres preparar el TOEFL.”**
- Lead: “Entrena un tipo de ejercicio, sigue una ruta guiada o entra a uno de los 20 simulacros completos. Cada opción te dice exactamente qué encontrarás.”

### Franja factual

- `3 rutas` — ejercicios, práctica guiada y simulacros.
- `12 tipos` — tareas vigentes agrupadas por sección.
- `20 simulacros` — mocks completos ya disponibles.
- `4 secciones` — Reading, Listening, Writing y Speaking.

### Tres rutas

#### Ejercicios — Disponible

**Qué encuentra:** catálogo de los 12 tipos de tarea TOEFL 2026 agrupados en cuatro secciones.

**Acción:** `Ver todos los ejercicios` → `/practica/toefl/ejercicios`.

#### Práctica — Próximamente

**Qué encontrará:** recorridos guiados que combinan explicación, intento, revisión y repetición.

**Acción:** no es un enlace. La tarjeta explica que todavía está en desarrollo.

#### Simulacros — 20 disponibles

**Qué encuentra:** mocks completos con las cuatro secciones.

**Acción:** `Abrir los 20 simulacros` → `/examenes/toefl#simulacros`.

### Vista previa de Ejercicios

Debajo de las tres rutas se muestra una línea compacta:

- Reading · 3 tipos
- Listening · 4 tipos
- Writing · 3 tipos
- Speaking · 2 tipos

Sirve para anticipar la organización sin duplicar el catálogo completo.

## 5. Pantalla 2 — `/practica/toefl/ejercicios`

### Hero

- Eyebrow: `TOEFL 2026 · Catálogo de ejercicios`.
- H1: **“Todos los ejercicios TOEFL, organizados por sección.”**
- Lead: “Elige una tarea concreta. Verás qué ejercicios ya tienen práctica individual y cuáles están disponibles dentro de los simulacros mientras construimos su recorrido propio.”

### Navegación por clúster

Una fila de enlaces internos permite saltar a Reading, Listening, Writing o Speaking. No se utiliza un filtro que oculte HTML: los cuatro clústeres permanecen visibles e indexables.

### Clústeres

Los clústeres forman una cuadrícula 2 × 2 en escritorio y una sola columna en móvil. Cada panel incluye:

- nombre de sección;
- cantidad de tipos;
- explicación de una línea;
- lista completa de tareas;
- estado y acción por tarea.

#### Reading — 3

- Complete the Words — ejercicio disponible.
- Read in Daily Life — ejercicio disponible.
- Read an Academic Passage — ejercicio disponible.

#### Listening — 4

- Listen and Choose a Response — disponible en simulacros; individual próximamente.
- Listen to a Conversation — disponible en simulacros; individual próximamente.
- Listen to an Announcement — disponible en simulacros; individual próximamente.
- Listen to an Academic Talk — disponible en simulacros; individual próximamente.

#### Writing — 3

- Build a Sentence — ejercicio disponible.
- Write an Email — ejercicio disponible.
- Write for an Academic Discussion — ejercicio disponible.

#### Speaking — 2

- Listen and Repeat — disponible en simulacros; individual próximamente.
- Take an Interview — disponible en simulacros; individual próximamente.

### Estados

- **Disponible:** tarjeta/fila enlazada al ejercicio individual.
- **En simulacros:** el tipo existe en el banco y puede practicarse mediante los mocks.
- **Próximamente:** no se finge una interacción que todavía no existe.

Los estados siempre aparecen escritos; el color es redundante.

## 6. Wireframes

### Hub

```text
Práctica / TOEFL

PRÁCTICA TOEFL · EJERCICIOS, PRÁCTICA Y SIMULACROS
Elige cómo quieres preparar el TOEFL.
Texto que explica las tres opciones.

[3 rutas] [12 tipos] [20 simulacros] [4 secciones]

¿Qué quieres hacer hoy?

[ EJERCICIOS         ] [ PRÁCTICA            ] [ SIMULACROS          ]
[ Disponible         ] [ Próximamente        ] [ 20 disponibles      ]
[ Ver ejercicios  →  ] [ En desarrollo       ] [ Abrir simulacros →  ]

Dentro de Ejercicios
[Reading · 3] [Listening · 4] [Writing · 3] [Speaking · 2]
```

### Catálogo

```text
TOEFL / Ejercicios

Todos los ejercicios TOEFL, organizados por sección.
[Reading] [Listening] [Writing] [Speaking]

┌ Reading · 3 ──────────────┐  ┌ Listening · 4 ───────────────┐
│ Complete the Words      → │  │ Choose a Response  En mocks  │
│ Read in Daily Life      → │  │ Conversation       En mocks  │
│ Academic Passage        → │  │ Announcement       En mocks  │
└───────────────────────────┘  │ Academic Talk      En mocks  │
                               └───────────────────────────────┘
┌ Writing · 3 ──────────────┐  ┌ Speaking · 2 ─────────────────┐
│ Build a Sentence        → │  │ Listen and Repeat   En mocks  │
│ Write an Email          → │  │ Take an Interview   En mocks  │
│ Academic Discussion     → │  └────────────────────────────────┘
└───────────────────────────┘
```

## 7. Responsive y accesibilidad

- Las tres rutas se apilan en móvil conservando este orden: Ejercicios, Práctica, Simulacros.
- Práctica mantiene `aria-disabled` o se renderiza como artículo, no como enlace falso.
- Los clústeres pasan de 2 × 2 a una columna.
- Cada fila enlazada tiene al menos 48 px de alto y foco visible.
- Los enlaces de salto apuntan a headings reales y no ocultan contenido.
- “Disponible”, “En simulacros” y “Próximamente” se comunican por texto y no solo color.
- El catálogo evita carruseles horizontales y acordeones cerrados: la estructura completa permanece legible y rastreable.

## 8. Lo que deliberadamente no diseñamos todavía

- runner seccional;
- biblioteca de práctica guiada;
- progreso entre ejercicios;
- resultados o puntuación;
- nuevas páginas individuales de Listening y Speaking.

Esos flujos pertenecen a gates posteriores. HR-02 solo debe aprobar la puerta de entrada y la comprensión del catálogo.

## 9. Decisión solicitada

- [ ] El hub explica con claridad Ejercicios, Práctica y Simulacros.
- [ ] Ejercicios conduce a los 12 tipos agrupados en cuatro clústeres.
- [ ] Práctica se muestra como Próximamente sin enlace engañoso.
- [ ] Simulacros conduce a los 20 mocks existentes.
- [ ] La UI se siente parte de la misma familia que `/practica/ielts`.
- [ ] Se autoriza pasar a HR-03 para bocetar la interconexión entre estas páginas.
