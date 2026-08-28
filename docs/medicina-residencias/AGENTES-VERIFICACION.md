# Consejo de preauditoría médica automatizada

Estado: contratos y prompts listos; runtime remoto y persistencia todavía no instalados.

## Límite de autoridad

Los agentes reducen errores y producen un expediente trazable. No son médicos, no pueden
declararse independientes en sentido profesional y no emiten una aprobación clínica. Dos
prompts o dos modelos que coinciden tampoco equivalen a dos médicos.

El máximo resultado sin personas acreditadas es:

```text
preauditoría automatizada superada
→ blocked-human-clinical-signoff
```

Para llegar a piloto se exigen dos atestaciones humanas verificadas sobre los mismos hashes:
un médico autor responsable y un médico revisor distinto. La publicación requiere además el
piloto y las puertas editoriales ya descritas en `FLUJO-DE-TRABAJO.md`.

## Integrantes

| ID | Función | Ejecución |
| --- | --- | --- |
| `source-provenance` | Fuente, vigencia, localizador y soporte de cada afirmación | Siempre |
| `clinical-solver-a` | Resuelve el caso desde cero, sin ver otros dictámenes | Siempre |
| `clinical-adversary-b` | Busca segunda respuesta, supuestos y daño potencial | Siempre |
| `colombia-safety` | Contrasta regulación y aplicabilidad colombiana | Siempre |
| `psychometric-item` | Pistas, ambigüedad y distractores | Siempre |
| `originality-privacy` | Copia, filtraciones, privacidad y falsa afiliación | Siempre |
| `safety-specialist` | Dosis, poblaciones especiales y decisiones de alto daño | Solo por bandera o desacuerdo |
| controlador determinista | Agrega resultados y aplica bloqueos; no usa LLM ni tiene voto | Siempre |

Los dos revisores clínicos reciben el mismo snapshot y paquete de evidencia, pero la proyección
por rol les oculta la clave, los racionales del autor y las respuestas del otro. El controlador
compara sus opciones solo al final. Una objeción crítica no se levanta mediante mayoría.

## Orden de ejecución de bajo consumo

1. Esquema, blueprint, originalidad mecánica y hashes.
2. Recuperación única del paquete de fuentes y creación de snapshots.
3. `source-provenance`, `clinical-solver-a` y `colombia-safety`.
4. `clinical-adversary-b` solo si no existe un fallo inmediato.
5. `psychometric-item` y `originality-privacy` después del pase provisional.
6. `safety-specialist` únicamente ante una bandera de riesgo o desacuerdo.
7. Controlador determinista y registro append-only.

El primer lote operativo será de 5 ítems, concurrencia 1 y caché por `questionDigest +
sourceBundleDigest + promptVersion`. Solo subirá a 20 después de medir coste, latencia y tasa
de bloqueos. No habrá procesos residentes ni agentes con permiso para escribir o publicar.

## Evidencia aceptable

Prioridad: regulación colombiana vigente; Minsalud, IETS e INS; guías colombianas; OMS/OPS y
guías internacionales vigentes; revisiones sistemáticas; textos estándar para ciencias
básicas estables. Un resumen comercial, banco competidor, recuerdo de examen, diapositiva sin
bibliografía, abstract aislado o salida de otro agente no fundamentan una afirmación clínica.

Cada claim conserva fuente, versión/año, localizador y hash del snapshot. No se almacenan
documentos protegidos completos ni datos de pacientes.

## Fallo cerrado

Bloquean el flujo: agente ausente o con timeout, salida inválida, falta de traza, hashes
distintos, fuente inaccesible, cita no localizada, contradicción vigente, dos respuestas
defendibles, hallazgo mayor/crítico o intento de un agente de emitir aprobación clínica.

Siempre se escala dosis y unidades, ajustes renal/hepático, embarazo, pediatría, fragilidad,
inmunosupresión, urgencias/UCI, anticoagulación, toxicología, antimicrobianos, puntos de corte,
normativa colombiana, imágenes diagnósticas y cualquier decisión de alto daño.

## Auditoría

Se conserva salida estructurada y justificación breve, no cadena de pensamiento. Cada corrida
registra agente/prompt/modelo versionados, hashes, tiempos, tokens, coste si existe, trace IDs,
hallazgos, disensos y decisión. Un cambio del ítem o las fuentes invalida todos los dictámenes.

La persistencia futura será append-only: revisiones, snapshots, runs y eventos no se actualizan
ni eliminan; una corrección crea una revisión nueva. La base de datos debe rechazar una firma
clínica cuyo actor no sea `verified-human`.

## Base oficial para la implementación

- [Inicio rápido para agentes](https://developers.openai.com/api/docs/guides/agents/quickstart/)
- [Orquestación de agentes](https://developers.openai.com/api/docs/guides/agents/orchestration/)
- [Guardrails y revisión humana](https://developers.openai.com/api/docs/guides/agents/guardrails-approvals/)
- [Evaluaciones de agentes](https://developers.openai.com/api/docs/guides/agent-evals/)

El runtime futuro usará salidas estructuradas y trazas. Los graders deterministas, no un juez
LLM, controlarán cualquier transición editorial.
