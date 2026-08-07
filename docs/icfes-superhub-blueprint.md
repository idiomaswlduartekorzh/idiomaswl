# Blueprint de producto: superhub ICFES Saber 11 — Inglés

Estado editorial: implementado y auditado en el worktree ICFES; pendiente de revisión para integración, sin despliegue
Última revisión: 2026-08-04
Fuente normativa principal: Guía de orientación Saber 11 2026-2, ICFES.

## 1. Decisión de arquitectura

El producto se construye como un clúster pedagógico único, no como siete aplicaciones aisladas. Una taxonomía oficial, un contrato de pregunta y un motor de práctica compartido alimentan las páginas por parte, el diagnóstico, los simulacros guiados, el repaso de errores y las recomendaciones.

La separación de intención queda así:

- `/practica/icfes-saber-11`: aprender, diagnosticar y practicar por habilidad o parte.
- `/examenes/icfes`: descubrir simulacros y entrar en modo examen.
- `/preparacion-icfes`: servicio de preparación con profesor y captación comercial.

## 2. Verdad editorial que debe gobernar el clúster

- La aplicación estándar 2026-2 contiene 55 preguntas de Inglés en la segunda sesión.
- El reporte de desempeño usa cuatro niveles: Pre A1, A1, A2 y B1. B1 es el nivel máximo reportado; no se promete B2.
- La prueba se organiza en siete partes oficiales:

| Parte | Habilidad principal | Peso aproximado | Tratamiento visual |
| --- | --- | ---: | --- |
| 1 | Relacionar descripciones y palabras | 11% | Banco de palabras |
| 2 | Comprender avisos, propósito y lugar | 11% | Avisos y señales |
| 3 | Completar conversaciones breves | 11% | Burbujas de diálogo |
| 4 | Completar textos con gramática | 18% | Cloze gramatical |
| 5 | Comprensión literal de textos | 16% | Lectura dividida y evidencia |
| 6 | Inferencia, propósito e intención | 11% | Evidencia y eliminación de distractores |
| 7 | Completar textos con léxico y gramática | 22% | Cloze contextual |

Los porcentajes son orientativos y deben presentarse como aproximados, no como una promesa de distribución exacta para cada aplicación.

## 3. Rutas objetivo

- Hub: `/practica/icfes-saber-11`
- Diagnóstico: `/practica/icfes-saber-11/diagnostico`
- Partes: `/practica/icfes-saber-11/parte-1` a `/parte-7`
- Refuerzos: `/vocabulario`, `/gramatica-conjunciones`, `/sinonimos-inferencia`
- Simulacros: `/examenes`, `/examenes/[examId]` y modo guiado explícito
- Continuidad: `/repaso-errores`, `/plan-de-estudio` y `/pregunta-del-dia`

No se crearán páginas indexables por pregunta. Las páginas indexables serán recursos completos con respuesta directa, demostración visual, estrategia, práctica, continuidad y fuentes.

## 4. Contrato único de pregunta

Cada registro enriquecido debe poder funcionar en más de un contexto y contener, como mínimo:

- Identidad: `id`, parte oficial, habilidad, subhabilidad y tipo.
- Contenido: estímulo, opciones, respuesta y, cuando corresponda, pasaje o banco de palabras.
- Pedagogía: explicación, evidencia, análisis de cada distractor, estrategia, microlección y refuerzo recomendado.
- Medición: dificultad, tiempo objetivo y etiquetas.
- Trazabilidad: tipo de fuente, referencia, fecha de revisión y estado editorial.

Los cuadernillos existentes siguen siendo la fuente del modo examen. El adaptador debe dejar de inferir la parte por la posición de grupos y usar metadatos explícitos. Solo se marcará un cuadernillo como “explicaciones revisadas” cuando todas sus preguntas tengan revisión humana.

## 5. Motor compartido

`IcfesPartPracticeEngine` compone piezas reutilizables:

- `ProgressRail`
- `GuidedQuestion`
- `EvidenceHighlighter`
- `DistractorAnalysis`
- `MiniLesson`
- `PracticeResult`
- `ErrorReview`
- `NextRecommendedPractice`

Flujo guiado: pregunta → selección → confirmar → feedback inmediato → evidencia → distractores → microlección/refuerzo → siguiente pregunta → reporte. El modo examen conserva navegación libre, temporizador y corrección al final.

## 6. Progreso y persistencia

Sin cuenta se habilita todo el valor inicial: preguntas, feedback, resultado y progreso local versionado. Para usuarios autenticados se agregan tablas con RLS para sesiones, intentos, errores, dominio por habilidad y planes. La sincronización anónimo→cuenta debe ser idempotente y nunca sobrescribir un historial más reciente.

Los errores se guardan por `question_id`, parte y subhabilidad para alimentar una cola de repaso espaciado. La recomendación siguiente se calcula a partir de precisión, dificultad, tiempo y recurrencia del error.

## 7. Sistema visual y accesibilidad

Tokens base: azul noche `#14215C`, azul CTA `#0F3D8C`, rojo ICFES `#DC2626`, verde `#047857`, ámbar `#D97706`, violeta `#7C3AED` y fondo `#F8FAFC`.

Las siete partes conservan una identidad cromática consistente: índigo, ámbar, teal, verde, azul, violeta y rojo. Las animaciones comunican avance, confirmación, evidencia o dominio; todas respetan `prefers-reduced-motion`. Color nunca será la única señal de correcto, error o estado.

## 8. SEO e interconexión

Cada ruta indexable debe entregar HTML útil desde servidor, H1 único, metadatos y canonical propios, Open Graph, breadcrumbs visibles y estructurados, fuente y fecha de revisión, enlaces internos relevantes y CTA contextual. El sitemap incluirá solamente rutas publicadas y sustanciales.

La malla principal será: hub ↔ partes ↔ refuerzos ↔ simulacros ↔ diagnóstico ↔ repaso ↔ plan. La página comercial recibe tráfico contextual después de entregar valor, no antes de la primera práctica.

## 9. Entrega por fases y puertas de calidad

1. Auditoría, verdad editorial, contrato y blueprint.
2. Sistema visual, contrato de datos y motor compartido.
3. Piloto vertical: hub, Partes 1–2, práctica guiada, resultado, SEO y medición.
4. Simulacro guiado, modo examen preservado y repaso de errores.
5. Partes 3, 4 y 7.
6. Partes 5 y 6, diagnóstico, planes y persistencia autenticada.
7. Interconexión completa, accesibilidad, pruebas, build, documentación y revisión editorial.

Una fase no escala contenido nuevo si falla TypeScript, el catálogo protegido, la navegación móvil o el viaje real de práctica. No se desplegará desde esta rama ni desde un árbol sin commit.

## 10. Métricas de producto

Eventos mínimos: inicio y final de práctica, inicio y final de simulacro guiado, consulta de reporte, generación de plan, lead y WhatsApp contextual. Indicadores: CTR orgánico hacia práctica, tasa de inicio, tasa de finalización, preguntas por sesión, retorno a repaso, mejora por parte y conversión posterior a valor.
