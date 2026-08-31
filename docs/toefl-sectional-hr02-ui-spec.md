# HR-02 — Diseño UI del hub TOEFL por secciones

**Estado:** listo para revisión humana; no implementado en producción

**Gate anterior:** HR-01 aprobado en `docs/toefl-sectional-review-log.json`

**Piloto visual:** TOEFL Listening

## 1. Brief de diseño

**Persona:** estudiante hispanohablante que llega desde una búsqueda como “TOEFL Listening practice” y puede no conocer WeLearn.

**Trabajo único de la página:** ayudarle a elegir en menos de diez segundos entre aprender una tarea, practicar Listening por set o hacer el TOEFL completo.

**Tensión que debe resolver:** ser una página suficientemente clara y verificable para buscadores y asistentes de IA, sin convertirse en un artículo que retrasa la práctica.

## 2. Auditoría del estado actual

El producto contiene tres lenguajes visuales dentro de la misma familia TOEFL:

- el hub maestro usa vidrio, sombras y una composición inspirada en iOS;
- Listening y Speaking usan un hero editorial azul oscuro y tarjetas rectangulares;
- Reading y Writing usan tarjetas globales e importantes cantidades de estilos inline.

El rediseño no agrega otra estética. Define una familia TOEFL común, compatible con los tokens globales de WeLearn, y permite que cada sección tenga un color funcional secundario.

## 3. Dirección elegida: “mesa de señal”

Listening se representa como una mesa de trabajo donde cada señal de audio tiene un propósito. La firma visual es un **rail de cuatro señales**, una por familia de tarea. No es una onda decorativa: codifica la estructura que el estudiante va a practicar.

El riesgo estético deliberado es usar ese rail como pieza dominante del hero en lugar de una ilustración genérica, una foto de audífonos o un panel de estadísticas. La interfaz sigue siendo sobria alrededor de esa pieza.

### Tokens

| Rol | Token | Uso |
|---|---|---|
| WeLearn navy | `#14215C` | títulos, navegación y estructura común |
| WeLearn red | `#C8202E` | acción primaria y estado de grabación/reproducción |
| Listening teal | `#087F8C` | identificación de sección y estados activos |
| Signal mint | `#65D6CC` | progreso de audio y énfasis técnico |
| Canvas | `#F5F7FC` | fondo editorial |
| Deep ink | `#101938` | texto de máximo contraste |

### Tipografía

- **Display:** Geist, 700–780, tracking negativo moderado. Se conserva la fuente instalada y se evita sumar descarga o dependencia.
- **Cuerpo:** Geist, 430–550, ancho de lectura máximo de 68 caracteres.
- **Utilidad:** Geist Mono o fallback monoespaciado, solo para set, progreso, duración y etiquetas de formato.

### Geometría

- Radio de superficie: 16 px; controles: 10–12 px; pills solo para estados breves.
- Bordes visibles de 1 px y sombras bajas. La jerarquía depende más de espaciado y contraste que del vidrio.
- Contenedor máximo: 1180 px para hubs; runner: 1280 px.
- Escala base de espaciado: 4, 8, 12, 16, 24, 32, 48, 72 px.

## 4. Wireframe — hub Listening

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ WeLearn        Práctica  Exámenes  Idiomas                       Acceder     │
├──────────────────────────────────────────────────────────────────────────────┤
│ Práctica / TOEFL / Listening                                                │
│                                                                              │
│ TOEFL LISTENING PRACTICE              ┌─ Mapa de señales ──────────────────┐ │
│ Practica Listening por tarea          │ 01  Choose a Response    ▂▅▇▃       │ │
│ o completa una sección                │ 02  Conversation         ▃▆▂▇       │ │
│                                      │ 03  Announcement         ▅▃▇▂       │ │
│ Texto breve + disclosure             │ 04  Academic Talk        ▂▇▅▃       │ │
│ [Practicar Listening] [Ver tareas]   └─────────────────────────────────────┘ │
│ Práctica WeLearn · fija · no oficial                                        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Elige cómo practicar                                                        │
│ [Response] [Conversation] [Announcement] [Academic Talk] [20 sets →]        │
├──────────────────────────────────────────────────────────────────────────────┤
│ Cómo usar la práctica: aprende → practica → revisa → confirma                │
├──────────────────────────────────────────────────────────────────────────────┤
│ Formato y límites         Fuente oficial          Preguntas frecuentes       │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Jerarquía de acciones

1. **Primaria:** “Practicar Listening” abre la biblioteca seccional.
2. **Secundaria:** “Ver las 4 tareas” desplaza a las familias de tarea.
3. **Terciaria:** “Hacer un TOEFL completo” permanece visible, pero no compite con la intención seccional.

### Copy propuesto

- H1: **“Practica TOEFL Listening por tarea o por simulacro”**.
- Lead: “Entrena las cuatro tareas vigentes con audio original de WeLearn. Empieza por una habilidad concreta o completa solo la sección de Listening.”
- Disclosure: “Práctica WeLearn · recorrido fijo · no es una prueba oficial de ETS”.

## 5. Wireframe — biblioteca de 20 sets

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ TOEFL / Listening / Simulacros                                              │
│                                                                              │
│ 20 prácticas de TOEFL Listening                 Tu progreso: 0 de 20         │
│ Cada set usa 14 audios y 34 preguntas del banco existente.                  │
│                                                                              │
│ [Todos] [Sin empezar] [En curso] [Completados]            Orden: recomendado │
├──────────────────────────────────────────────────────────────────────────────┤
│ SET 01  14 audios · 34 preguntas  [Empezar]  │ SET 02 ...                   │
│ SET 03  ...                                 │ SET 04 ...                   │
│ ...                                                                         │
│ SET 20                                                                      │
├──────────────────────────────────────────────────────────────────────────────┤
│ ¿Quieres practicar una tarea? [Ver las cuatro tareas de Listening]           │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Reglas

- El conteo se lee del adaptador; nunca se escribe manualmente en producción.
- Sin sesión iniciada se ocultan filtros de progreso y se usa el estado “Disponible”.
- Un set conserva siempre su ID visible. No se presenta como “nivel” si el banco no tiene dificultad auditada.
- El primer set es recomendado para usuarios nuevos; no se ordena por popularidad sin datos.

## 6. Wireframe — runner Listening

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ ← Salir a los sets        LISTENING · SET 01        Audio 03 de 14    21%    │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  │
├────────────────────────────────────┬─────────────────────────────────────────┤
│ Señal 03                           │ Pregunta 07 de 34                       │
│ Listen to a Conversation           │                                         │
│                                    │ What does the student imply?            │
│            [▶ Reproducir]          │ ○ Opción A                              │
│            00:00 / 00:38           │ ○ Opción B                              │
│                                    │ ○ Opción C                              │
│ No cierres esta pestaña mientras   │ ○ Opción D                              │
│ se reproduce el audio.             │                                         │
│                                    │ [Marcar para revisar] [Guardar y seguir]│
└────────────────────────────────────┴─────────────────────────────────────────┘
```

### Principios del runner

- Una tarea por pantalla y un solo botón primario.
- Progreso doble: estímulo actual y total de preguntas.
- El audio y la pregunta comparten contexto, pero se apilan en móvil.
- “Salir” confirma si existe respuesta sin guardar; no se atrapa al usuario.
- El resultado usa “aciertos de esta práctica”, nunca “puntuación TOEFL oficial”.

## 7. Estados obligatorios

| Estado | Mensaje/acción |
|---|---|
| Carga | skeleton solo en el bloque pendiente; título y navegación permanecen estables |
| Audio listo | botón “Reproducir audio” con duración real |
| Reproduciendo | tiempo transcurrido, estado textual y control accesible |
| Audio falló | “No pudimos cargar este audio. Comprueba tu conexión o inténtalo de nuevo.” + “Reintentar” + “Marcar y seguir” |
| Sin respuesta | al continuar, foco en el grupo y mensaje “Elige una respuesta o marca la pregunta para revisarla.” |
| Sesión recuperada | “Retomamos tu práctica en la pregunta N.” |
| Set terminado | aciertos, errores por familia y acciones “Revisar errores” / “Volver a los sets” |
| Sin progreso | “Aún no has empezado un set. Comienza por el Set 01.” |

## 8. Responsive

### Escritorio, ≥ 1024 px

- Hero 7/5 columnas: copy y rail de señales.
- Biblioteca a dos columnas; runner dividido 5/7.
- Navegación del sitio completa.

### Tableta, 680–1023 px

- Hero apilado; rail de cuatro señales en dos columnas.
- Biblioteca a dos columnas cuando cada tarjeta conserve 280 px.
- Runner apilado y controles de avance pegados al borde inferior del viewport.

### Móvil, 320–679 px

- H1 entre 36 y 44 px, sin cortar “Listening”.
- CTA primaria a ancho completo; secundaria debajo.
- Tarjetas en una columna; información secundaria colapsable después de lo esencial.
- Runner: audio primero, pregunta después; barra de acción sticky sin cubrir opciones.

## 9. Accesibilidad

- Contraste WCAG AA para texto y controles; el teal nunca es el único indicador de estado.
- Foco visible de 3 px con separación mínima de 2 px.
- Targets táctiles de al menos 44 × 44 px.
- Las “ondas” del rail son decorativas para lector de pantalla; cada fila conserva nombre textual de tarea.
- Estado de reproducción comunicado mediante texto y `aria-live` moderado, no solo animación.
- `prefers-reduced-motion` elimina movimiento del indicador y conserva el cambio de estado.
- El orden de tabulación sigue audio → respuestas → revisar → continuar.
- Los errores se vinculan mediante `aria-describedby` y reciben foco solo cuando bloquean el avance.

## 10. Autocrítica y recorte

La primera exploración consideró vidrio, grandes cifras y gradientes porque el hub actual ya los usa. Se descartó: repetía un patrón genérico y competía con la tarea. También se descartó asignar un color fuerte distinto a cada una de las cuatro tareas; generaba ruido y dificultaba escalar el sistema a las demás secciones.

La versión sometida a revisión concentra la personalidad en un solo elemento —el rail de señales— y mantiene el resto quieto. Se conserva la marca WeLearn, se reduce la decoración y se separan con claridad práctica seccional y examen completo.

## 11. Decisión solicitada en HR-02

- [ ] Apruebo la dirección “mesa de señal”.
- [ ] Apruebo la jerarquía: práctica seccional primero, examen completo como acción terciaria.
- [ ] Apruebo el patrón visual compartido para hub, biblioteca y runner.
- [ ] Apruebo el comportamiento responsive y los estados obligatorios.
- [ ] Apruebo continuar a HR-03 para diseñar la interconexión real entre páginas.

Hasta esa aprobación, estos artefactos son de diseño y no autorizan cambios de UI en producción.
