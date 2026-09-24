# Goethe A2 · fábrica editorial, agentes y harness

Este sistema reemplaza los cinco scaffolds A2 históricos por simulacros originales de WeLearn alineados con la arquitectura pública de Goethe-Zertifikat A2 para adultos. Ningún material oficial se incorpora al banco: las fuentes se usan únicamente para fijar estructura, tiempos, tipos de tarea, scoring y dimensiones de rúbrica.

## Decisión tomada después de la auditoría

El catálogo anterior mostraba `a2-1` a `a2-5` como simulacros gratuitos. Cada archivo tenía 13 ítems de Hören, 9 de Lesen, dos tareas escritas y tres orales; además apuntaba a tres MP3 inexistentes y el runner genérico enseñaba la transcripción durante Hören. Tampoco existían scoring, submission, práctica seccional ni revisión A2 verificables.

Esos cinco archivos se conservan temporalmente solo como deuda histórica y están en `LEGACY_HOLD`. `getMock()` falla cerrado y el catálogo muestra el estado sin CTA. No se ampliarán ni se usarán como referencia textual.

## Contrato congelado

| Destreza | Partes | Respuestas/tareas | Tiempo | Resultado |
|---|---:|---:|---:|---:|
| Lesen | 4 | 20 | 30 min | 25 |
| Hören | 4 | 20 | ~30 min | 25 |
| Schreiben | 2 | 2 | 30 min | 25 |
| Sprechen | 3 | 3 | ~15 min por pareja | 25 |

La prueba completa tiene 13 partes y 45 respuestas o tareas. La aprobación exige 60/100, al menos 45/75 en el bloque escrito conjunto y 15/25 en el oral. No se exige aprobar Lesen, Hören y Schreiben de manera individual.

Hören usa una pista maestra continua. Las repeticiones forman parte del audio: Teil 1 dos veces, Teil 2 una, Teil 3 una y Teil 4 dos. La pista también contiene instrucciones, pausas y transferencia de respuestas; el candidato no controla pausa, búsqueda ni repetición en modo examen.

Fuentes oficiales cotejadas el 24 de septiembre de 2026:

- [Materiales A2 para adultos](https://www.goethe.de/ins/co/es/spr/prf/gzsd2/ueb.html)
- [Modelo oficial A2 para adultos](https://www.goethe.de/pro/relaunch/prf/materialien/A2/A2_Modellsatz_Erwachsene.pdf)
- [Disposiciones de aplicación A2 vigentes desde 1-09-2025](https://www.goethe.de/pro/relaunch/prf/es/Durchfuehrungsbestimmungen_A2.pdf)

## Qué se reutiliza de A1

- tipos base de examen y renderers generales;
- navegación intro → intento → entrega → resultado → oferta;
- captura de lead, códigos institucionales y `ExamResultOffers`;
- recalificación del servidor, snapshots versionados, rate limits y tokens;
- uploads firmados y almacenamiento privado para Sprechen;
- streaming administrativo con byte ranges;
- preflight de créditos, reserva, casting, seed, reanudación, ffmpeg, normalización, duración y manifiestos del pipeline de audio;
- controles de estructura, claves, longitudes, medios, originalidad y navegación por Teil.

No se reciclan la geometría 3/3/2/3 de A1, su formulario, su scoring de 60 puntos, sus nombres de imágenes, sus partes 9–11, sus tres pistas de Hören ni su PDF rotulado como A1.

## Topología de agentes

El coordinador abre una orden aislada y delega Listening, Reading y destrezas productivas a subagentes independientes. Después corren guardianes que no editan el contenido:

1. `goethe-a2-coordinator`: orden, commit base, reserva temática y huellas.
2. `goethe-a2-spec-guardian`: estructura oficial y frontera de copyright.
3. `goethe-a2-listening-author`: 4 partes, 20 ítems y plan de pista maestra.
4. `goethe-a2-reading-author`: 4 partes, 20 ítems y facsímiles funcionales.
5. `goethe-a2-productive-author`: Schreiben 2 + Sprechen 3.
6. `goethe-a2-key-auditor`: resolución a ciegas de los 40 ítems objetivos.
7. `goethe-a2-language-auditor`: alemán natural, registro, accesibilidad y CEFR A2.
8. `goethe-a2-originality-auditor`: similitud exacta y semántica entre sets, legado y referencias.
9. `goethe-a2-media-director`: manifiesto visual y accesibilidad.
10. `goethe-a2-audio-planner`: casting, caracteres, créditos y ensamblaje; nunca genera.
11. `goethe-a2-integrator`: único que mueve un candidato aprobado a `src/`.
12. `goethe-a2-ux-reviewer`: móvil/escritorio, práctica, PDF, entrega, resultados y comercio.
13. `goethe-a2-release-warden`: deriva el estado; no corrige ni publica.

Autor y auditor no pueden ser la misma identidad. Un cambio en contenido, blueprint, fuentes, ledger, prompts o núcleo del harness invalida todos los informes posteriores.

## Estética visual obligatoria

Las piezas deben parecer producidas dentro de un cuadernillo A2: paneles, horarios, directorios, correos, anuncios clasificados, calendarios y dibujos editoriales sencillos. SVG/HTML determinista es preferible cuando sea suficiente.

Una foto solo se usa si aporta contexto que un facsímil no puede dar; debe ser documental, modesta y secundaria. Quedan vetados el acabado publicitario, la iluminación cinematográfica, las caras sintéticas, la fotografía de stock pulida y cualquier imagen que “se vea muy IA”. Esta regla aplica especialmente a los anuncios y opciones visuales.

## Estados derivados

```text
LEGACY_HOLD
  → NEEDS_DRAFT
  → BLOCKED_STRUCTURE / BLOCKED_KEY / BLOCKED_LANGUAGE
  → BLOCKED_ORIGINALITY / BLOCKED_MEDIA / BLOCKED_RUNTIME
  → AUDIO_BLOCKED
  → READY_FOR_HUMAN_REVIEW
  → PUBLISHED
```

`AUDIO_BLOCKED` es el destino normal mientras ElevenLabs no tenga créditos. Contenido, imágenes, scripts, scoring, práctica, PDF y comercio pueden estar listos sin que el examen completo se abra. La generación futura no publica: después exige QA técnica, escucha humana independiente y un recibo final ligado a la huella exacta.

## Operación

Inventario y validación estática:

```bash
npm run goethe:a2:harness:inventory
npm run check:goethe-a2-harness
```

Abrir el golden set:

```bash
npm run goethe:a2:harness:scaffold -- --set=1 --run=golden-1
```

El comando crea una ejecución nueva bajo `artifacts/goethe-a2-harness/set-1/golden-1/` y se niega a sobrescribirla. La orden fija las huellas del blueprint, fuentes, ledger, prompts y núcleo del harness; el objetivo queda en `AUDIO_BLOCKED`.

El Set 1 debe completar todo el circuito antes de abrir Sets 2–10 en paralelo. Solo después del golden set se permite producción por lotes, con un archivo aislado por set y un único integrador para archivos compartidos.
