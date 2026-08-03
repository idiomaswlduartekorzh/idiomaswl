# Auditoría funcional y capturas del producto

**Idiomas WeLearn**  
**Fecha de comprobación:** 26 de julio de 2026  
**Entorno comprobado:** sitio público de producción  
**Alcance:** muestra representativa de Práctica, Nivel Radar y Exámenes. No constituye todavía una certificación exhaustiva de las 178 entradas del catálogo.

---

# 1. Resultado ejecutivo

WeLearn ya tiene producto real suficiente para sostener una historia mucho más fuerte que una lista genérica de beneficios:

- un diagnóstico adaptativo que puede completarse sin registro;
- un resultado orientativo por habilidades y una prioridad de trabajo;
- práctica guiada con retroalimentación pedagógica inmediata;
- ocho accesos de práctica por idioma;
- nueve familias de preparación de exámenes;
- motores de simulacro navegables para IELTS, TOEFL e ICFES;
- práctica por niveles, como el recorrido A1–B1 actualmente visible en alemán.

La conclusión estratégica es clara:

> El Home no necesita inventar paneles decorativos. Puede contar la transformación mediante pantallas auténticas: reconocer, practicar, recibir feedback y prepararse para una meta.

También aparecieron inconsistencias de inventario y promesas que deben corregirse antes de llevar cifras o afirmaciones fuertes al nuevo Home.

# 2. Rutas comprobadas

| Área | Ruta comprobada | Estado observado | Uso seguro en el Home |
|---|---|---|---|
| Catálogo de práctica | `/practica` | Carga correctamente. Muestra 3 accesos de examen y 8 idiomas. | Sí: “práctica en ocho idiomas” y navegación hacia cada hub. |
| Nivel Radar | `/nivel-radar` | Flujo funcional sin registro. La sesión de prueba cerró tras 8 ítems. | Sí: diagnóstico adaptativo y resultado orientativo. |
| Resultado del Radar | sesión técnica anónima | Mostró A1, prioridad y porcentajes para uso de la lengua, vocabulario y lectura; ofrece reporte PDF. | Sí, etiquetado como demostración o prueba interna, nunca como resultado de un estudiante. |
| Catálogo de exámenes | `/examenes` | Carga 9 familias y 178 entradas declaradas. | Sí para las 9 familias; no usar todavía “178 simulacros completos”. |
| IELTS | `/examenes/ielts` y `set-1` | El simulacro abre y presenta Listening, Reading, Writing y Speaking. | Sí como muestra de motor real; no publicar cantidad de preguntas sin reconciliar cifras. |
| TOEFL | `/examenes/toefl` y `set-1` | El simulacro abre y presenta las cuatro habilidades. | Sí como muestra de motor real; no publicar cantidad de ítems sin reconciliar cifras. |
| ICFES | `/examenes/icfes` y `mock-01` | El mock abre con 7 partes, 45 preguntas, navegación y temporizador. | Sí: es la muestra más consistente de la auditoría. |
| Writing guiado | `/practica/ielts/academic/writing/task2/opinion` | La selección de tesis activa feedback específico y explica por qué una respuesta funciona o falla. | Sí: “retroalimentación pedagógica inmediata”. No llamarla IA sin verificar el motor. |
| Alemán | `/practica/aleman` | A1, A2 y B1 aparecen disponibles; B2 y C1 aparecen como próximos. | Sí, indicando niveles reales. No sugerir que todos los niveles están activos. |
| Cambridge B2 | `set-1`, `set-2` y hub | Los motores abren, pero el catálogo y el contenido activo no coinciden. | Solo como familia disponible; cifras y completitud quedan en revisión. |
| Progreso | `/dashboard` | Redirige a inicio de sesión. No existe una vista pública verificable de progreso. | No mostrar un panel inventado. Hace falta una cuenta demo o captura autenticada autorizada. |

# 3. Hallazgos que deben corregirse antes del Home

## 3.1 “Simulacros oficiales”

La portada pública de Exámenes afirma:

> Simulacros oficiales, estrategia de examen y feedback con IA para cada certificación.

Esta redacción es demasiado fuerte. A menos que exista autorización o relación contractual con cada organismo examinador, debe cambiarse por:

> Simulacros de práctica, estrategia de examen y retroalimentación para las certificaciones disponibles.

“Oficial” puede describir el formato o una fuente cuando sea exacto y esté documentado; no debe calificar globalmente materiales propios de WeLearn.

## 3.2 Cantidades inconsistentes

### IELTS Set 1

- el hub declara `80 preguntas`;
- la portada del set declara `36 preguntas`;
- el motor activo muestra `83` espacios de respuesta: 39 Listening, 39 Reading, 2 Writing y 3 Speaking;
- el motor inició mostrando `3/83 answered`, aunque no se habían contestado ítems en esa sesión.

### TOEFL Set 1

- el hub declara `42 preguntas`;
- la portada del set declara `56 ítems`;
- el motor activo muestra `56`;
- el motor inició mostrando `5/56`, aunque no se habían contestado ítems en esa sesión.

### Cambridge B2

- el hub declara `Listening pendiente` en los sets 2–10 y `58 preguntas`;
- la portada del Set 2 muestra 13 partes, incluidas cuatro de Listening;
- el motor del Set 2 abre Listening con audios y muestra `88` respuestas.

Esto puede significar que el contenido fue completado y el catálogo quedó desactualizado. Hasta reconciliar catálogo, portada y motor, las cifras no deben convertirse en copy comercial.

## 3.3 Corrección humana, feedback pedagógico e IA

En IELTS Set 1 se indica que Writing y Speaking se envían al profesor para corrección. En la práctica guiada de Writing sí se comprobó feedback automático inmediato sobre una selección. No se comprobó, en el flujo público anónimo, una corrección completa de ensayo generada por IA.

Por ahora son seguras estas formulaciones:

- `feedback pedagógico inmediato en ejercicios guiados`;
- `corrección docente según la modalidad`;
- `ejemplos explicados y criterios de respuesta`.

No es todavía segura como promesa general:

- `corrección con IA para cada examen`.

## 3.4 Progreso

El panel de progreso requiere autenticación. No se fabricó actividad ni se alteró almacenamiento del navegador para obtener una captura. Para producir esa evidencia hace falta:

1. una cuenta demo autorizada;
2. datos ficticios claramente identificados como demostración; o
3. una captura real anonimizada y autorizada.

# 4. Banco de capturas auténticas

Las capturas se guardaron en `docs/estrategia-home/capturas-producto/`. Son evidencia de auditoría, no recursos finales de producción.

| Archivo | Qué demuestra | Estado para diseño |
|---|---|---|
| `01-practica-catalogo.png` | Tres accesos de examen y ocho idiomas de práctica. | Candidata para sección de producto. |
| `02-nivel-radar.png` | Propuesta y funcionamiento declarado del diagnóstico. | Candidata para introducción de reconocimiento. |
| `03-reconocimiento-en-curso.png` | Pregunta real dentro del diagnóstico adaptativo. | Candidata para transición o microanimación. |
| `04-resultado-nivel-radar-prueba-interna.png` | Resultado real de una sesión técnica anónima. | Útil como evidencia; necesita encuadre final. |
| `04-resultado-nivel-radar-recorte.png` | Detalle de habilidades y reporte. | Candidata para sección de reconocimiento. |
| `05-catalogo-examenes.png` | Las nueve familias publicadas. | Útil para arquitectura; no para una franja de logos. |
| `06-ielts-set-1-portada.png` | Estructura de un simulacro IELTS. | Útil después de corregir cifras. |
| `07-simulacro-ielts-activo.png` | Motor de Listening activo. | Candidata para sección de preparación. |
| `08-practica-writing-ielts.png` | Campo real para responder Writing. | Candidata para explicar práctica productiva. |
| `09-feedback-autentico-writing.png` | Feedback pedagógico inmediato sobre una tesis. | Candidata prioritaria para sección de corrección. |
| `09-feedback-autentico-writing-full.png` | Página completa de la actividad guiada. | Archivo de auditoría. |
| `10-practica-aleman-niveles.png` | Niveles disponibles y próximos de alemán. | Candidata para navegación por idioma. |

Ninguna captura contiene datos de estudiantes.

# 5. Las seis vistas recomendadas para la historia

Para la maqueta del Home se recomienda trabajar inicialmente con:

1. **Universo de práctica:** `01-practica-catalogo.png`.
2. **Reconocimiento en acción:** `03-reconocimiento-en-curso.png`.
3. **Mapa del resultado:** `04-resultado-nivel-radar-recorte.png`.
4. **Simulacro real:** `07-simulacro-ielts-activo.png`.
5. **Corrección que enseña:** `09-feedback-autentico-writing.png`.
6. **Profundidad por idioma:** `10-practica-aleman-niveles.png`.

La vista de progreso queda fuera hasta conseguir evidencia autorizada.

# 6. Consecuencia para la narrativa del Home

La secuencia puede apoyarse ya en producto real:

> Llegas con una meta → reconoces tu punto de partida → ves la brecha por habilidad → practicas con una tarea real → recibes una explicación útil → entrenas para usar o certificar el idioma.

Zhanna y José David deben conectar esas piezas:

- presentan la promesa en el Hero;
- explican por qué el diagnóstico importa;
- convierten el resultado en criterio;
- aparecen de nuevo para explicar cómo elegir práctica y acompañamiento;
- cierran con evidencia documental y una invitación concreta.

La tecnología demuestra el proceso. Los fundadores explican el porqué.

# 7. Siguiente paso recomendado

Antes de crear recursos en Higgsfield:

1. corregir las promesas `oficial` e `IA` que no están demostradas de extremo a extremo;
2. reconciliar las cantidades de IELTS, TOEFL y Cambridge;
3. decidir qué cuenta demo producirá la captura de progreso;
4. crear derivados visuales limpios de las seis capturas seleccionadas;
5. convertir la arquitectura narrativa en wireframe de contenido;
6. producir después el guion visual y los prompts de Higgsfield.

No se cambió ni se publicó el Home durante esta auditoría.
