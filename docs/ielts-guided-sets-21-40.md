# IELTS guiado · Sets 21–40

Estado: **STAGED / NO PUBLICADO**.

Los mocks estándar 21–40 y sus MP3 públicos existen. Esta ampliación prepara la capa pedagógica sin añadir todavía esos sets a las rutas guiadas públicas.

## Regla de elegibilidad

`config/ielts-guided-eligibility.json` es la fuente explícita de elegibilidad. Un set sólo puede pasar de `stagedSets` a `eligibleSets` cuando cumple conjuntamente:

1. mock canónico presente;
2. 40 evidencias Listening revisadas, con ventanas exactas de máximo 60 segundos;
3. 40 evidencias Reading revisadas y ligadas a la clave canónica;
4. dos referencias Writing Task 2 completas (5.5 y 9);
5. dos referencias Speaking Part 2 completas (5.5 y 9).

La elegibilidad es fail-closed. Tener el mock, el MP3 o borradores pedagógicos no crea una ruta estática.

## Material preparado

- `src/data/ielts/guided-writing-samples-21-40.draft.ts`: 40 ensayos pedagógicos. La revisión editorial independiente terminó en PASS.
- `src/data/ielts/guided-speaking-references-21-40.ts`: 40 respuestas largas pedagógicas con revisión editorial independiente PASS. El audio permanece explícitamente oculto (`ready: false`).
- `scripts/stage-ielts-guided-evidence-21-40.mjs`: generador reproducible y fail-closed.
- `staging/ielts-guided-evidence-21-40/`: 20 artefactos con 800 filas Reading y 800 bindings Listening. Reading obtuvo PASS independiente 800/800; el estado de publicación sigue cerrado.
- `staging/ielts-guided-listening-alignment-23-40/`: 18 artefactos con 720 ventanas Listening por respuesta, todas positivas, cronológicas y de máximo 60 segundos.

## Gate Listening

Set 21 conserva ventanas por pregunta. Set 22 se reconstruye desde el ensamblado Chatterbox. Para Sets 23–40, las ventanas se estrecharon mediante alineación local timestamped sobre los WAV exactos usados en el master ElevenLabs v4; cada artefacto queda ligado por hash al MP3 público, al plan, al manifiesto, al QA, al ASR y al generador.

La revisión detectó que el Set 32 tenía Q39/Q40 invertidas respecto del orden real del audio. La fuente canónica quedó corregida a Q39 = `new growth` y Q40 = `water transport`; las dos filas históricas del ledger se conservan por hash y se proyectan explícitamente 40→39 y 39→40. El clip de Q39 ya no contiene ni revela la respuesta de Q40.

La revisión independiente final del lote regenerado obtuvo PASS: 18/18 sets, 720/720 ventanas, 702/702 transiciones cronológicas y 108/108 bindings de fuente verificados. La escucha humana y el release siguen pendientes y no se infieren de ese PASS técnico/editorial.

## Promoción a runtime

No se deben copiar los JSON de `staging/` a `config/ielts-harness/evidence/` ni ampliar `eligibleSets` hasta que los reportes independientes estén en PASS y ligados a los hashes actuales. Una promoción posterior debe:

- convertir el esquema staged al contrato runtime `IeltsGuidedEvidenceArtifact`;
- añadir importaciones explícitas en `guided-evidence.ts`;
- demostrar 40+40 bindings por set;
- validar cronología, no solapamiento y duración máxima de 60 segundos;
- ejecutar `test:ielts-guided` completo;
- conservar `robots: noindex` y el límite de acceso vigente.

La aprobación humana de publicación sigue siendo una decisión separada.
