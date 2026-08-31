# TOEFL por secciones: plan SEO, AEO/GEO y harness de curaduría

**Estado:** propuesta lista para revisión humana HR-01

**Rama:** `codex/toefl-sectional-seo-harness-20260831`

**Base:** `origin/main` en `063873b1ae9804e130e6d5819691a0d104f9dd99`

**Worktree:** `/Volumes/WELEARN_DEV/idiomaswl-toefl-sectional-seo-harness`

**Regla de avance:** ningún gate se presume aprobado. La ausencia de una decisión humana bloquea el gate siguiente.

## 1. Resultado que buscamos

Convertir la práctica TOEFL existente en un hub de autoridad que responda a búsquedas como “TOEFL Listening practice”, permita practicar cada sección sin iniciar un examen completo y sirva como blueprint repetible para Reading, Listening, Writing y Speaking.

No se crearán copias de los tests. Las páginas seccionales consumirán el mismo banco que alimenta los 20 simulacros completos. La separación será una vista o adaptador sobre una única fuente de verdad.

### Indicadores de éxito

- Cada intención principal tiene una página canónica clara y no compite con otra página propia.
- Google y otros motores pueden descubrir el hub, sus cuatro secciones y las páginas de tarea sin ejecutar una interacción.
- Los asistentes de IA encuentran respuestas breves, verificables y coherentes con el contenido visible.
- Una persona puede pasar de una consulta informativa a una práctica seccional en uno o dos clics.
- Los 20 simulacros completos, sus audios, preguntas, revisiones y rutas protegidas permanecen intactos.
- Toda aprobación humana queda vinculada a evidencia y a un digest; cambiar el artefacto aprobado invalida la aprobación.

## 2. Los dos problemas inmediatos

### P0-1. Promesa desactualizada en `/practica`

La tarjeta TOEFL todavía comunica “1 pasaje · 6 preguntas”, aunque el producto ya tiene cuatro secciones y 20 simulacros. Esto rompe la expectativa y oculta el valor real.

**Momento de solución:** inmediatamente después de aprobar HR-01, porque el nuevo texto y destino dependen de la arquitectura acordada. La corrección será pequeña, revisable y con prueba de regresión.

### P0-2. El banco existe, pero no hay recorridos seccionales completos

Los simulacros contienen el inventario necesario, pero el usuario que busca practicar solo Listening, Reading, Writing o Speaking no tiene una biblioteca seccional consistente que lo lleve desde la búsqueda hasta una sesión enfocada.

**Momento de solución:** en el piloto de Listening posterior a HR-03. Se implementará un adaptador seccional, no una duplicación del banco.

## 3. Decisiones arquitectónicas propuestas para HR-01

### 3.1 Árbol de páginas

```text
/practica/toefl                                      HUB maestro
├── /reading                                         HUB de sección
│   ├── /formato-2026/complete-the-words             página de tarea existente
│   ├── /formato-2026/read-in-daily-life             página de tarea existente
│   ├── /formato-2026/read-an-academic-passage       página de tarea existente
│   └── /simulacros                                  biblioteca seccional nueva
│       └── /practica/set-N                          runner seccional, noindex/follow
├── /listening                                       HUB de sección
│   ├── /listen-and-choose-a-response                página de tarea nueva
│   ├── /listen-to-a-conversation                    página de tarea nueva
│   ├── /listen-to-an-announcement                   página de tarea nueva
│   ├── /listen-to-an-academic-talk                  página de tarea nueva
│   └── /simulacros
│       └── /practica/set-N                          runner seccional, noindex/follow
├── /writing                                         HUB de sección
│   ├── /build-a-sentence                            página existente
│   ├── /write-an-email                              página existente
│   ├── /academic-discussion                         página existente
│   └── /simulacros
│       └── /practica/set-N                          runner seccional, noindex/follow
└── /speaking                                        HUB de sección
    ├── /listen-and-repeat                           página de tarea nueva
    ├── /take-an-interview                           página de tarea nueva
    └── /simulacros
        └── /practica/set-N                          runner seccional, noindex/follow

/examenes/toefl                                      intención “examen completo”
└── /practica/set-N                                  20 simulacros completos existentes
```

### 3.2 Decisiones recomendadas

1. **Listening será el piloto.** Tiene una intención de búsqueda muy clara y permite probar audio, tareas, biblioteca y runner antes de replicar el patrón.
2. **No habrá migración masiva de URLs.** Las rutas de Reading y Writing que ya existen se conservan inicialmente. Solo se plantearán redirecciones después de revisar datos de Search Console y backlinks.
3. **Los hubs y páginas de tarea serán indexables.** Deben tener contenido sustancial, canonical propio, enlaces internos y presencia en sitemap.
4. **Los runners `set-N` serán `noindex,follow`.** Serán URLs estables, quedarán fuera del sitemap y podrán recibir enlaces desde la biblioteca. No se canonicalizarán hacia una página que no sea equivalente.
5. **Los simulacros completos conservarán su recorrido actual.** El nuevo producto seccional no sustituye `/examenes/toefl`.
6. **No se prometerá puntuación oficial ni equivalencia ETS.** La interfaz distinguirá con claridad práctica WeLearn, formato de referencia y evaluación oficial.
7. **Una sola fuente de verdad.** Un selector seccional filtra el mock existente y conserva IDs de pregunta, estímulo y audio.

## 4. Estrategia SEO internacional

### 4.1 Investigación antes de escribir páginas

No se elegirá una keyword porque “suena común”. El mapa de intención se aprobará con evidencia fechada de:

- Google Search Console del dominio: consultas, páginas, países, impresiones y canibalización.
- Google Trends y Keyword Planner: demanda relativa y variantes regionales.
- SERP real en una muestra de mercados anglófonos e hispanohablantes.
- Autocomplete, People Also Ask y búsquedas relacionadas.
- Una herramienta de volumen externa, si existe acceso, tratada como estimación y no como verdad única.
- Terminología oficial vigente del TOEFL, separada de la terminología editorial propia.

El entregable será `docs/toefl-sectional-keyword-map.csv`, con una fila por URL: consulta principal, variantes, intención, país/idioma, etapa del recorrido, URL dueña, competencia interna, fuente, fecha y confianza.

### 4.2 Clústeres e intención

- **Hub maestro:** TOEFL practice, preparación y navegación entre secciones.
- **Hub seccional:** “TOEFL Listening practice”, “TOEFL Reading practice”, etc.
- **Página de tarea:** explicación del tipo, estrategia, ejemplo y entrada a práctica específica.
- **Biblioteca seccional:** “TOEFL Listening practice tests” y variantes transaccionales de práctica.
- **Examen completo:** “full TOEFL practice test”; permanece en `/examenes/toefl`.

Cada consulta principal tendrá una sola URL dueña. Las variantes semánticas se resolverán dentro de esa página, no creando páginas delgadas.

### 4.3 Guardrails técnicos SEO

- HTML útil renderizado en servidor, sin depender de abrir el runner.
- Un `h1`, title y description únicos por URL indexable.
- Canonical absoluto y coherente con la URL pública.
- Breadcrumbs visibles y `BreadcrumbList` equivalente.
- Datos estructurados solo cuando coincidan con contenido visible; no usar schema para fabricar autoridad.
- Sitemap generado desde el mismo registro de rutas; runners `noindex` excluidos.
- Enlaces HTML rastreables; cero páginas huérfanas.
- Redirects solo con mapa previo, prueba de cadena y evidencia de equivalencia.
- Preservar Core Web Vitals: el hub no descargará audios ni el banco completo al cargar.

## 5. Estrategia AEO/EAO, GEO e IA

Aquí “AEO/EAO” significa optimización para motores de respuesta y “GEO” optimización para motores generativos. No son sustitutos del SEO técnico: dependen de contenido accesible, consistente y demostrable.

### Patrón de contenido citable

Cada hub de sección tendrá:

1. una respuesta breve y directa a “qué incluye esta sección”;
2. tabla o lista factual de tareas vigentes;
3. instrucciones de uso del material;
4. límites explícitos: práctica fija/no adaptativa cuando aplique y ausencia de puntuación oficial;
5. fecha de última revisión académica;
6. fuentes oficiales enlazadas cerca de las afirmaciones sensibles;
7. FAQ editorial basada en preguntas reales, con paridad exacta entre texto visible y schema cuando se use.

### Legibilidad para agentes y motores

- Contenido principal disponible en HTML y con jerarquía semántica.
- Entidades sin ambigüedad: TOEFL iBT, sección, tarea, duración de práctica y proveedor.
- Respuestas independientes que siguen teniendo sentido fuera del contexto de la página.
- Autoría y revisión humana identificables cuando estén definidas por el negocio.
- Nada de texto oculto para crawlers ni contenido distinto por user-agent.
- Permisos de robots revisados de forma consciente para buscadores y asistentes; cualquier bloqueo será una decisión documentada.

### Pruebas GEO/AEO

- Paridad entre afirmaciones visibles, metadata y JSON-LD.
- Preguntas de evaluación reproducibles: “¿Dónde practicar TOEFL Listening por secciones?”, “¿Es adaptativo?”, “¿Es una prueba oficial?”.
- Registro de respuesta, fuente citada, fecha y errores por motor; no se considera garantía de inclusión.
- Muestreo humano para detectar afirmaciones exageradas, datos sin fuente o confusión entre WeLearn y ETS.

## 6. Estrategia de implementación en `/practica`

### Capa 1: registro único de arquitectura

Se propone `src/data/toefl/sectional-route-registry.ts` como fuente de verdad para ruta, sección, intención, indexabilidad, padre, breadcrumb y estado editorial. Sitemap, navegación y pruebas deben leer o contrastarse con este registro.

### Capa 2: adaptador seccional

Una función pura recibe `setId` y `section`, selecciona la parte correspondiente del mock y devuelve una estructura normalizada. No modifica ni copia los datos originales. Las pruebas compararán IDs, conteos y referencias de audio contra el simulacro completo.

### Capa 3: plantillas compartidas

- `ToeflSectionHub`: orientación, tareas, biblioteca y enlaces.
- `ToeflTaskGuide`: explicación citable y acceso a ejercicios.
- `ToeflSectionLibrary`: los 20 sets, progreso y filtros mínimos.
- `ToeflSectionRunner`: sesión enfocada y retorno claro al hub.

Las páginas conservan Server Components por defecto. Solo el runner y controles interactivos cruzan la frontera cliente.

### Capa 4: conexión con `/practica`

Tras HR-01 se actualiza la tarjeta TOEFL para que comunique las cuatro secciones, los 20 sets y enlace al hub maestro. No se introducen nuevas tarjetas por cada keyword; el detalle vive dentro de la arquitectura TOEFL.

## 7. Harness de curaduría

### 7.1 Artefactos controlados

| Artefacto | Propósito | Se crea en |
|---|---|---|
| `docs/toefl-sectional-keyword-map.csv` | una intención y una URL dueña | investigación SEO |
| `docs/toefl-sectional-content-inventory.json` | KEEP/MIGRATE/ARCHIVE/DELETE-CANDIDATE | auditoría previa al piloto |
| `docs/toefl-sectional-review-log.json` | decisiones humanas y digests | HR-01 |
| `src/data/toefl/sectional-route-registry.ts` | rutas e indexabilidad | piloto técnico |
| `scripts/check-toefl-sectional-harness.mjs` | auditoría agregada | piloto técnico |
| `tests/toefl-sectional-*.test.mjs` | contratos de datos, SEO y enlaces | piloto técnico |

### 7.2 Registro de aprobación

Cada decisión debe registrar como mínimo:

```json
{
  "gateId": "HR-01",
  "reviewer": "nombre humano",
  "role": "producto|academico|seo|ux|ingenieria",
  "decision": "approved|approved_with_notes|changes_requested|rejected",
  "reviewedAtUtc": "ISO-8601",
  "commitSha": "git SHA",
  "contentDigest": "sha256 de los archivos revisados",
  "evidencePaths": ["ruta/a/evidencia"],
  "notes": "observaciones"
}
```

`approved_with_notes` solo permite observaciones no bloqueantes. Una modificación a un archivo cubierto por el digest invalida automáticamente la aprobación. Una firma inexistente nunca se simula.

### 7.3 Matriz mínima de controles automáticos

- **Integridad:** no desaparecen mocks, preguntas, estímulos, audios ni IDs.
- **Paridad:** el runner seccional contiene exactamente el subconjunto del mock completo.
- **Rutas:** registro, archivos, enlaces y sitemap coinciden.
- **Indexación:** hubs/tareas indexables; runners noindex y ausentes del sitemap.
- **Metadata:** titles, descriptions, H1 y canonical únicos.
- **Interconexión:** ninguna URL indexable queda huérfana; breadcrumbs y retornos funcionan.
- **Contenido:** sin claims de puntuación oficial, adaptatividad o afiliación no demostrados.
- **Schema:** igualdad factual con el contenido visible.
- **Accesibilidad:** teclado, foco, labels, contraste, reduced motion y transcripción/alternativa cuando corresponda.
- **Rendimiento:** el hub no precarga audios ni bancos completos; se revisan LCP, CLS e INP en muestra móvil.
- **Regresión:** `npm run check:practica-catalog`, `npx tsc --noEmit` y `npm run build` antes de integrar.

## 8. Gates y revisiones humanas

| Gate | Entregable visible | Revisión humana requerida | Condición para avanzar |
|---|---|---|---|
| **HR-01 Ruta clara** | este plan, árbol de URLs, index/noindex, piloto | dueño de producto + SEO + ingeniería | arquitectura aprobada y dudas resueltas |
| **HR-02 Diseño UI** | wireframes móvil/escritorio y estados del hub, biblioteca y runner | producto + UX/accesibilidad + académico | jerarquía, copy y acciones aprobadas |
| **HR-03 Interconexión** | prototipo navegable o boceto de enlaces, breadcrumbs y CTAs | producto + SEO + UX | ningún callejón sin salida ni canibalización |
| **HR-04 Plantilla editorial** | un hub/tarea Listening con fuentes, FAQ y disclaimers | académico + SEO/editorial | exactitud, utilidad y tono aprobados |
| **HR-05 Piloto funcional** | Listening Set 1 end-to-end en preview + evidencia automática | QA humano + ingeniería + académico | datos/audio íntegros, móvil y teclado correctos |
| **HR-06 Escala Listening** | 20 sets seccionales + reporte de paridad | académico + producto | muestra fija 1/5/10/15/20 y muestra aleatoria aprobadas |
| **HR-07 Por sección** | Reading, Writing y Speaking, una sección por vez | mismos roles | cada sección repite HR-04 a HR-06; no aprobación en bloque |
| **HR-08 Limpieza** | inventario KEEP/MIGRATE/ARCHIVE/DELETE-CANDIDATE y diff exacto | dueño + ingeniería | eliminación explícitamente aprobada y recuperable por Git |
| **HR-09 Release** | preview final, checklist, métricas base y rollback | producto + ingeniería/release | checks verdes y autorización de integrar en `main` |
| **HR-10 Poslanzamiento** | Search Console, analítica, errores y rendimiento | producto + SEO + ingeniería | continuar, ajustar o revertir según umbrales acordados |

Si una persona cubre varios roles se registra esa falta de independencia. Para claims académicos o cambios de formato TOEFL, el revisor académico es obligatorio.

## 9. Secuencia de trabajo

### Fase A — ahora: HR-01

1. Aprobar o corregir el árbol propuesto.
2. Confirmar Listening como piloto.
3. Confirmar hubs/tareas indexables y runners noindex.
4. Confirmar que no se migran URLs existentes durante el piloto.
5. Nombrar revisores humanos por rol.

**Stop obligatorio:** no se modifica UI ni comportamiento antes de esta decisión.

### Fase B — inventario y diseño: HR-02

1. Medir baseline de rutas, contenido, consultas y tráfico.
2. Clasificar componentes y páginas existentes.
3. Diseñar wireframes móvil/escritorio con contenido realista.
4. Modelar carga, vacío, error, audio no disponible y sesión terminada.
5. Ejecutar revisión UI/accesibilidad y registrar digest.

### Fase C — enlace entre páginas: HR-03

1. Construir el mapa hub → sección → tarea/biblioteca → runner → resultados/retorno.
2. Definir breadcrumbs y enlaces contextuales.
3. Probar en prototipo los recorridos de búsqueda, exploración y repetición.
4. Auditar páginas huérfanas y profundidad de clic.

### Fase D — slice vertical Listening: HR-04 y HR-05

1. Crear registro mínimo y adaptador para Listening Set 1.
2. Implementar un hub/tarea, biblioteca y runner usando datos existentes.
3. Añadir metadata, sitemap/noindex y structured data con paridad visible.
4. Ejecutar controles automáticos y revisión humana en preview.
5. Corregir hasta aprobación; no escalar un defecto.

### Fase E — escala controlada: HR-06 y HR-07

1. Extender Listening a 20 sets mediante datos, no páginas copiadas.
2. Auditar todos los conteos y muestrear experiencia humana.
3. Repetir el patrón, una sección por vez, con gate académico propio.
4. Mantener cambios pequeños y commits por artefacto aprobado.

### Fase F — limpieza y release: HR-08 a HR-10

1. Presentar inventario y razones antes de borrar.
2. Conservar historial y eliminar solo rutas/archivos exactos aprobados.
3. Actualizar la rama contra `origin/main` antes de integrar.
4. Ejecutar guardián de catálogo, TypeScript, build y suite TOEFL.
5. Publicar únicamente desde `main`; observar y revertir si se cruzan umbrales.

## 10. Política de limpieza

No se interpretará “eliminar lo que no necesitamos” como permiso abierto para borrar. El procedimiento será:

1. **KEEP:** fuente de verdad o activo consumido.
2. **MIGRATE:** todavía usado; se reemplaza con paridad comprobada.
3. **ARCHIVE:** evidencia o prototipo útil fuera del runtime.
4. **DELETE-CANDIDATE:** huérfano demostrado por imports, rutas, build y búsqueda.

Un candidato se elimina solo en HR-08, con diff exacto, razón, responsable y recuperación posible mediante Git. Nunca se borran por limpieza genérica los 20 mocks, audios TOEFL, flujos de revisión, rutas de examen completo ni los activos protegidos de Escucha, IELTS o ICFES.

## 11. Operación en la unidad externa

- Todo el trabajo de esta iniciativa vive en `/Volumes/WELEARN_DEV/idiomaswl-toefl-sectional-seo-harness`.
- `node_modules`, `.next`, reportes visuales y cachés del proyecto se mantendrán en esa unidad cuando sean necesarios.
- No se instalarán dependencias durante planificación y diseño.
- Se harán commits pequeños después de cada artefacto aprobado.
- La rama se empujará a `origin` como respaldo; la USB no será la única copia.
- Si la unidad se desconecta, se detiene el trabajo antes de ejecutar Git o builds.

## 12. Decisión solicitada en HR-01

Para aprobar este gate, el revisor humano debe dejar decisión explícita sobre estos cinco puntos:

- [ ] Apruebo el árbol de rutas propuesto o adjunto correcciones.
- [ ] Apruebo Listening como primer slice vertical.
- [ ] Apruebo indexar hubs/tareas y usar `noindex,follow` en runners seccionales.
- [ ] Apruebo conservar las URLs actuales de Reading/Writing durante el piloto.
- [ ] Confirmo quién revisa producto, TOEFL académico, SEO, UX/accesibilidad e ingeniería.

Hasta entonces, el estado correcto del proyecto es **planificado, no implementado**.
