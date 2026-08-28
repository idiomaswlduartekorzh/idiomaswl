# Arquitectura de producto — Qbank de residencias médicas Colombia

Última revisión: 2026-08-28
Estado: contrato base implementado; sin rutas públicas, migraciones ni contenido clínico.

## 1. Resultado de producto

El médico elige universidad y especialidad, recibe un diagnóstico, estudia casos originales con fuentes, practica bajo las reglas públicas de su convocatoria y convierte sus errores en un plan de repaso.

La promesa es:

> Preguntas médicas originales, revisadas y citadas; preparación alineada con la información pública de tu convocatoria y una explicación clara de qué debes mejorar.

No se promete material oficial, preguntas filtradas ni probabilidad de admisión sin calibración.

## 2. Arquitectura por universidad

| Perfil | Evidencia codificada | Producto habilitable | Producto bloqueado |
| --- | --- | --- | --- |
| UdeA 2026-2 | medicina general, corte 50 %, 150 min derivados del horario, lectura en inglés | práctica general cronometrada + módulo separado de inglés | simulacro de longitud completa y pesos temáticos |
| Univalle R. 374/2024 | básicas, clínicas, norma médica colombiana, cultura/interés nacional, posible inglés, aprobación 3.0 | rutas por dominio + inglés integrado + preparación de normativa | longitud, cronómetro y pesos oficiales |
| U. de Caldas 2027 | 60 ítems, 120 min, 40 general + 20 especialidad, Rasch, selección 60/30/10 | simulacro completo para las siete primeras especialidades cubiertas | aplicar 40+20 a Psiquiatría, Sexología o segundas especialidades |
| UNAL Bogotá 2027-1 | acuerdo separado por programa; pruebas iniciales, CV e entrevista | centro de admisión y perfil por programa después de extraer su acuerdo | “simulacro UNAL” genérico |
| Libre Barranquilla 2025 | 120 min; 80 % preguntas generales y 20 % específicas; casos PJS con tres enunciados y tres opciones; ejes de Interna, Pediatría, Cirugía, Gineco y Ortopedia; mínimo 60 | práctica cronometrada por ejes con fecha 2025 visible | longitud completa, ponderación final completa o actualidad 2026/2027 sin nueva verificación |
| Libre Cali 2025 | 120 min; 80 % preguntas generales y 20 % específicas; casos PJS con tres enunciados y tres opciones; ejes de Dermatología, Gineco, Interna, Pediatría y Psiquiatría; mínimo 60 | práctica cronometrada por ejes con fecha 2025 visible | longitud completa, ponderación final completa o actualidad 2026/2027 sin nueva verificación |
| U. de Cartagena 2027-1 | 80 preguntas generales, 180 min, selección 80/10/10 | simulacro general completo | distribución temática institucional no publicada |
| Uninorte | máximo 180 min y proceso posterior | práctica general cronometrada + preparación de entrevista | simulacro completo, dominios y ponderaciones no verificadas |
| U. del Atlántico | solo evidencia institucional SNIES; no una convocatoria | monitoreo interno | cualquier producto comercial con su nombre |

La representación ejecutable vive en `university-blueprints.ts`. Si la tabla y el contrato divergen, se corrige la documentación; no se relaja el guardián.

## 3. Taxonomía compartida

Una pregunta puede servir a varias universidades sin duplicarse.

```text
question_revision
├── dominio editorial
│   ├── ciencias básicas aplicadas
│   ├── medicina interna
│   ├── cirugía y trauma
│   ├── pediatría
│   ├── ginecología y obstetricia
│   ├── urgencias y cuidado crítico
│   ├── salud mental
│   ├── salud pública
│   ├── ética y regulación colombiana
│   ├── interés nacional
│   └── inglés médico
├── sistema / tema / subtema
├── tarea cognitiva
├── población / escenario
└── mappings[]
    ├── universidad
    ├── versión de blueprint
    └── dominio oficial
```

`officially-named` significa que una universidad publicó esa categoría. `product-proposed` significa que WeLearn la usa para organizar contenido; nunca se presenta como ponderación oficial.

## 4. Contrato de pregunta

`MedicalQuestionV1` obliga a conservar:

- identidad estable y revisión inmutable;
- opciones con IDs y explicación individual; la cantidad depende del formato oficial publicado;
- objetivo, perla y tarea cognitiva;
- mapeo a blueprints versionados;
- fuente, institución, año y localizador;
- autor, revisores y próxima revisión;
- licencia de medios;
- dificultad editorial y métricas observadas separadas.

Una edición clínica crea una nueva revisión; no reescribe el significado histórico de intentos ya calificados.

## 5. Arquitectura de información y UX

### Rutas previstas

```text
/residencias-medicas
/residencias-medicas/[universidad]
/residencias-medicas/[universidad]/diagnostico
/residencias-medicas/[universidad]/practica
/residencias-medicas/[universidad]/simulacro
/residencias-medicas/repaso
/residencias-medicas/plan
/dashboard/student/residencias
```

No habrá páginas indexables por pregunta. Las páginas SEO entregarán contenido verificable, fecha, fuente, aviso de independencia y acceso a una práctica sustancial.

### Onboarding

1. universidad;
2. especialidad;
3. convocatoria o fecha objetivo;
4. horas disponibles por semana;
5. diagnóstico inicial;
6. plan recomendado.

Si un blueprint está incompleto, la interfaz lo dice: “La universidad no publica número o distribución; esta práctica cubre los dominios confirmados”. No se oculta la incertidumbre en un tooltip.

### Home del estudiante

- acción primaria única: “Continuar plan de hoy”;
- avance por dominio, no un porcentaje global engañoso;
- cola de errores y aciertos inseguros;
- cobertura del blueprint;
- próxima convocatoria y tareas de admisión;
- actividad reciente, sin ranking público por defecto.

### Modos

**Diagnóstico:** bloque estratificado, sin feedback hasta cerrar; produce un mapa inicial, no una probabilidad de pasar.

**Estudio:** una pregunta, respuesta, confianza, feedback, evidencia, distractores, perla y siguiente recomendación.

**Examen:** cronómetro, navegación, marcado, guardado y feedback al final. Solo usa etiqueta de simulacro completo cuando el blueprint lo permite.

**Repaso inteligente:** errores, aciertos con baja confianza y preguntas marcadas. FSRS se añade cuando exista persistencia real; no se implementa un algoritmo paralelo improvisado.

**Admisión integral:** inglés, CV, entrevista, calendario y checklist cuando la universidad los contemple.

### Lenguaje visual

- clínico, sobrio y legible; no estética infantil de rachas y energía;
- superficies existentes `wl-hub-panel` y jerarquía `wl-hub-heading` para integrarse al sistema de exámenes;
- un acento propio del producto, no colores o escudos institucionales;
- tipografía y contraste optimizados para lectura larga;
- tablas, ECG e imágenes con zoom accesible y texto alternativo;
- móvil primero, pero el modo examen aprovecha dos columnas en escritorio;
- animación solo para transición, guardado o feedback; respeta `prefers-reduced-motion`.

## 6. Arquitectura técnica

### Frontera Server/Client

- páginas de universidad, fuentes y estructura: Server Components y datos estáticos versionados;
- motor de pregunta, cronómetro, navegación y confianza: Client Components pequeños;
- sesión, autorización, selección de preguntas y calificación: servidor;
- no enviar claves de todo el bloque antes de cerrar el examen;
- el estado local mejora la respuesta inmediata, pero Supabase conserva la verdad persistida.

### Rendimiento

- ensamblar bloques en servidor y enviar solo la ventana necesaria;
- no cargar el banco completo ni analítica pesada en el cliente;
- importar gráficos bajo demanda;
- evitar TanStack Query hasta demostrar una necesidad de caché cliente compleja;
- usar los componentes y motor de exámenes existentes antes de crear abstracciones nuevas;
- official blueprints son deterministas y pueden formar parte del HTML estático;
- datos personalizados no usan caché compartida y se aíslan detrás de `Suspense`.

Estas decisiones siguen las convenciones instaladas de Next 16.2.6, no patrones heredados de versiones anteriores.

### Persistencia futura en Supabase

Tablas conceptuales:

- `medical_blueprint_versions` — snapshot publicado de cada perfil;
- `medical_questions` — identidad estable;
- `medical_question_revisions` — contenido inmutable por revisión;
- `medical_question_sources` — evidencia y localizador;
- `medical_question_blueprints` — relación muchos-a-muchos;
- `medical_editorial_reviews` — firmas y transiciones;
- `medical_exam_sessions` — configuración y estado;
- `medical_attempts` — respuesta, tiempo, confianza y revisión usada;
- `medical_review_queue` — programación espaciada;
- `medical_entitlements` — acceso por plan y vencimiento;
- `medical_item_reports` — alertas clínicas/editoriales.

RLS: el estudiante solo lee sus sesiones e intentos; las respuestas correctas no se consultan desde tablas públicas; publicación y revisión requieren rol editorial. Migraciones reversibles y sin ejecutar en producción desde esta rama.

### Integridad

- Server Actions y APIs validan entrada y autorización;
- `session_id + question_id + attempt_number` funciona como clave idempotente;
- una sesión guarda `blueprint_version` y `question_revision`;
- retirar una pregunta impide servirla de nuevo sin borrar intentos;
- los eventos analíticos no incluyen stems, notas clínicas libres ni datos de pacientes.

### Dependencias

Se conserva Next/React/Supabase/Recharts/Zustand/Lucide/Playwright. Próximas adiciones justificables:

- Zod al abrir la primera frontera de importación/editorial;
- `ts-fsrs` al implementar repaso persistente;
- Sentry u OpenTelemetry antes del piloto pagado.

No se añade una librería solo para montar la arquitectura estática actual.

## 7. Material médico confiable

Jerarquía de fuentes:

1. Minsalud, IETS, INS, legislación y reglamentación colombiana vigente;
2. guías colombianas de sociedades científicas con metodología y conflictos declarados;
3. OMS/OPS y guías internacionales vigentes cuando no haya fuente colombiana suficiente;
4. revisiones sistemáticas;
5. textos estándar para fundamentos estables.

Reglas:

- la aplicabilidad colombiana prevalece para conducta, notificación y regulación;
- una recomendación internacional no sustituye silenciosamente una norma nacional;
- blogs, clases comerciales y bancos de competidores no son fuentes clínicas;
- cada fuente tiene versión, fecha de consulta y localizador;
- si cambia una guía, se identifica qué revisiones dependen de ella y se suspenden hasta actualizar;
- el producto es educativo para profesionales, no consejo médico para pacientes.

## 8. Modelo de negocio

### Segmentos

- médico que prepara una primera especialidad en 2–6 meses;
- médico que necesita una extensión por especialidad;
- aspirante que además requiere inglés, CV o entrevista;
- institución o grupo de estudio que necesita cohortes y analítica agregada.

### Escalera de valor

**Gratis:** orientación por universidad, diagnóstico corto, muestra de explicaciones y plan inicial.

**Qbank Pro:** banco completo, estudio/examen, error bank, repaso inteligente y analítica. Hipótesis a validar: COP 49.900–69.900/mes.

**Pase Convocatoria:** acceso de 90 días a un perfil universitario, simulacros habilitados y calendario. El precio se prueba contra mensualidad y fecha objetivo; no se fija todavía.

**Preparación Integral:** banco + inglés + CV + entrevista humana. Servicio de mayor valor y capacidad limitada.

**Cohortes B2B:** licencias para academias, hospitales o grupos, solo después de probar el producto individual.

La bibliografía, el aviso de vigencia y la explicación esencial no son upsells. Cobrar por ocultar evidencia destruye la promesa de confianza.

### Conversión

```text
SEO / referencia / anuncio
→ página de universidad con respuesta útil
→ diagnóstico sin tarjeta
→ reporte y plan
→ muestra de repaso
→ Qbank Pro o Pase 90 días
→ integral humano si aplica
```

WhatsApp conserva el rol de asesoría y cierre para el plan integral; el Qbank debe poder comprarse en autoservicio con Wompi.

### Métricas de negocio

- activación: termina diagnóstico y abre su plan;
- conversión después de recibir valor;
- coste editorial por ítem publicado;
- margen después de revisión clínica y soporte;
- retención a 7, 21 y 45 días;
- reactivación al acercarse la convocatoria;
- CAC y recuperación por canal;
- conversión Qbank → integral;
- reembolsos y reportes clínicos críticos.

No se optimiza ingreso sacrificando revisión médica o mostrando predictores no calibrados.

## 9. Analítica de aprendizaje y psicometría

Por intento:

- respuesta y cambio de respuesta;
- tiempo activo, no solo tiempo de reloj;
- nivel de confianza;
- explicación abierta y tiempo de lectura;
- dispositivo y errores técnicos mínimos, sin invadir privacidad.

Por ítem:

- dificultad observada;
- discriminación;
- funcionamiento de distractores;
- tiempo mediano;
- reportes y concordancia de revisores;
- cobertura del blueprint;
- vigencia de fuentes.

Por estudiante:

- dominio por área con intervalo de incertidumbre;
- recurrencia de errores;
- consistencia entre precisión, tiempo y confianza;
- adherencia al plan.

No se muestra “probabilidad de admisión” hasta contar con resultados reales consentidos, tamaño de muestra, metodología pública y error de estimación.

## 10. Fases de entrega

### Fase 0 — completada en esta rama

- fuentes oficiales registradas;
- nueve perfiles universitarios/campus;
- contrato de pregunta;
- taxonomía compartida;
- guardián y pruebas;
- flujo editorial, negocio y UX documentados.

### Fase 1 — prototipo vertical

- wireframes de onboarding, estudio, examen y reporte;
- Caldas/Medicina Interna con contenido ficticio claramente marcado, solo para probar interacción;
- contrato de sesión e intentos;
- prueba móvil y accesibilidad.

### Fase 2 — piloto clínico

- primer lote real de 60 ítems Caldas;
- dos revisiones humanas;
- fuentes y actas;
- modo estudio y examen;
- piloto cerrado y observabilidad.

### Fase 3 — núcleo compartido

- 400–600 ítems revisados;
- Cartagena completo;
- UdeA y Univalle por dominios confirmados;
- inglés médico;
- repaso inteligente y error bank.

### Fase 4 — expansión

- acuerdos específicos UNAL;
- actualización Universidad Libre;
- nueva evidencia Uninorte;
- CV/entrevista;
- más especialidades y cohortes.

## 11. Decisiones explícitamente diferidas

- no hay migración de base de datos;
- no hay rutas públicas;
- no hay checkout nuevo;
- no hay instalación de Zod, FSRS u observabilidad;
- no hay contenido médico real;
- no hay simulacro UNAL, Uninorte, Libre, UdeA o Univalle de longitud “oficial”;
- no hay producto Universidad del Atlántico.

Estas decisiones requieren el siguiente vertical slice y sus pruebas, no más scaffolding.
