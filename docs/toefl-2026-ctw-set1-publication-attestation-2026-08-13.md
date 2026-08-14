# TOEFL iBT 2026 — attestation de publicación para `t1-r-cw2-v3`

> `artifact_id`: `toefl-2026-ctw-set1-publication-attestation`
>
> `artifact_version`: `2026-08-14.v4`
>
> `candidate_object_id`: `object:t1-r-cw2-v3`
>
> `source_object_id`: `object:t1-r-cw2`
>
> `status`: `owner_approved_gate_complete`
>
> Este documento registra la declaración de derechos y las decisiones de riesgo del
> owner. No presenta una revisión independiente inexistente ni convierte la práctica
> en un producto oficial de ETS.

## Identidad fijada

| Campo | Valor |
|---|---|
| Fuente en repositorio | `src/data/mocks/toefl-set-1.ts` |
| Commit de procedencia recuperado | `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43` |
| SHA-256 del texto fuente reconstruido | `591e04ee445b2367e1fdfc13373d6a727e42f305cebc1f8d777b58d88d220ada` |
| SHA-256 del texto candidato | `cebce2395c03dc360098a045f97ec560d865ca2aee49bf20da504221380a8a3e` |
| SHA-256 de la primera oración candidata | `484adf235348ca922d025eb1813bd6e156e9de4081b60e22736ab8f49d76cf79` |
| Palabras candidatas | 76 |
| Respuestas candidatas | 10 |
| Regla | `CTW-OF-001` |

Texto candidato fijado:

> The sun is a giant ball of plasma at the center of our solar system. It provides
> the light and heat that make life on Earth possible. Deep inside the sun, a process
> called nuclear fusion releases enormous amounts of energy. This energy travels
> through space and reaches Earth in about eight minutes. Without the sun, most forms
> of life on Earth could not survive. Scientists study the sun to understand how it
> affects our climate.

Cambios documentados frente a la fuente:

1. `a giant ball of hot gas` → `a giant ball of plasma`;
2. `our planet would be far too cold for anything to live` →
   `most forms of life on Earth could not survive`.

## Declaración requerida del owner

La persona firmante debe marcar cada afirmación sólo si puede sostenerla con evidencia:

- [x] Tengo autoridad para declarar la cadena de creación y los derechos de uso del
  texto fuente y de esta variante.
- [x] Confirmo que el texto fuente fue creado para WeLearn y no copiado de ETS ni de
  otro banco protegido.
- [x] Confirmo la participación de herramientas de IA indicada en el historial y que
  una persona revisó y asumió responsabilidad editorial por el resultado.
- [x] Autorizo a WeLearn a almacenar, modificar, presentar y publicar la variante
  identificada por el SHA-256 anterior.
- [x] Entiendo que esta declaración no autoriza el uso de marcas ETS ni permite
  presentar la práctica como oficial, completa, adaptativa o psicométricamente
  equivalente.
- [x] Confirmo que cualquier fuente factual se usa para verificar hechos y no como
  fuente textual para copiar redacción.

Nombre legal del owner: **José David Duarte Silva**

Rol y relación con WeLearn: **Owner de WeLearn; declaración directa en esta tarea**

Fecha ISO: **2026-08-13T20:33:36-05:00**

Firma o mecanismo verificable: **Declaración escrita del usuario: “el informe del
acta de pendientes lo firmo yo Jose David Duarte Silva y tienes vía libre para
seguir”.**

Referencia de la evidencia archivada: **Tarea Codex
`019fe4a5-a196-7372-9dec-3ea999117705`, mensaje del owner del 13 de agosto de 2026.**

## Implementación y comprobaciones posteriores a la firma

La autorización del owner se usó únicamente para implementar T12. Al corte del 14 de
agosto de 2026:

- el hash candidato, sus 76 palabras, primera oración y diez reconstrucciones coinciden;
- la ruta pública y el Set 1 presentan diez inputs de letras faltantes;
- las claves canónicas permanecen server-only y no aparecen en `.next/static`;
- 7/7 tests de scoring y 6/6 escenarios Chromium pasan también después de actualizar
  la rama desde `main`;
- TypeScript, lint y el build integral de 1.359 rutas pasan;
- los 16 MCQ anteriores se conservaron bajo una etiqueta complementaria honesta;
- no se modificó audio de producto ni se llamó ElevenLabs, Whisper u otra API de audio.

Evidencia detallada:

- `docs/toefl-2026-ctw-set1-runtime-report-2026-08-14.md`;
- `docs/toefl-2026-ctw-set1-runtime-evidence-2026-08-14.tsv`.

Estas comprobaciones sustentan la decisión del owner que sigue a continuación.

## Decisión del owner sobre la segunda revisión

El 14 de agosto de 2026, José David Duarte Silva instruyó: **“Revisión
TOEFL/editorial de una segunda persona. override esto y prosigue”**. Esta decisión se
registra como dispensa expresa del requisito interno de una segunda persona para T12.
No se interpreta como una revisión ni una firma independiente.

- [x] El owner acepta las comprobaciones automáticas del contrato TOEFL T12.
- [x] El owner declara que WeLearn creó el documento y posee sus derechos.
- [x] El owner dispensa la segunda firma editorial y de derechos para este gate.
- [x] El owner acepta los límites de la búsqueda pública de similitud documentada
  abajo.
- [x] El owner completó la sesión manual con VoiceOver y declaró
  **“VoiceOver aprobado”** el 14 de agosto de 2026.

Nombre del decisor: **José David Duarte Silva**

Rol: **Owner de WeLearn**

Fecha: **2026-08-14**

Decisión: **`approve_owner_waiver_and_continue`**

Evidencia: **mensaje directo del owner en la tarea Codex
`019fe4a5-a196-7372-9dec-3ea999117705`**

Firma o mecanismo verificable: **declaración escrita del owner en esta tarea**

## Evidencia factual y de similitud que acompaña la firma

- [NASA Sun Facts](https://science.nasa.gov/sun/facts/): composición como plasma y
  contexto científico del Sol.
- [NASA Scientific Visualization Studio](https://svs.gsfc.nasa.gov/11084/): fusión y
  viaje de la luz hasta la Tierra en aproximadamente ocho minutos.
- [NOAA Ocean Exploration — photosynthesis and chemosynthesis](https://oceanexplorer.noaa.gov/ocean-fact/photochemo/):
  evidencia para retirar el absoluto sobre toda forma de vida.
- `docs/toefl-2026-complete-the-words-factual-rights-audit-2026-08-09.md`:
  auditoría de 20 textos y límites de la búsqueda externa.

### Adjudicación de similitud/procedencia aceptada por el owner

El 14 de agosto de 2026 se buscaron entre comillas cuatro fragmentos distintivos del
texto candidato. Ningún resultado indexado reprodujo el pasaje completo de 76 palabras
ni uno de los cuatro fragmentos completos. Sí aparecieron formulaciones cercanas sobre
hechos científicos comunes: el Sol como plasma en el centro del sistema, la fusión, la
dependencia de la vida y el viaje de la luz en aproximadamente ocho minutos.

Decisión registrada: **redacción interna WeLearn sobre hechos comunes; sin coincidencia
literal completa encontrada en el alcance público consultado**. El owner confirma la
cadena de creación y acepta el riesgo residual. Esta comprobación no cubre bases
cerradas, contratos de terceros ni una opinión jurídica, y no se etiqueta como
adjudicación independiente.

## Regla de liberación

La variante continúa `blocked` para cerrar T12 si falta cualquiera de estos elementos:

1. declaración del owner completa y verificable;
2. coincidencia exacta entre el hash firmado y el contenido implementado;
3. pruebas de interacción/scoring/accesibilidad de la matriz T12;
4. sesión manual con VoiceOver o lector equivalente;
5. disclosure visible de práctica parcial WeLearn no oficial;
6. ausencia de cambios no adjudicados en fuente, máscara o hechos.

Estado al 14 de agosto de 2026: **gate T12 completo**. Owner firmado; segunda revisión
y firma dispensadas por el owner; implementación y base Git verificadas; VoiceOver
aprobado manualmente por el owner. Ningún agente afirma que existió una revisión
independiente.
