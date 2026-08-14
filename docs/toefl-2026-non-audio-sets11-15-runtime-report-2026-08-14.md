# TOEFL 2026 — cierre no-audio Sets 11–15

Fecha: 14 de agosto de 2026

Lote: W6

Estado: validación automática, build completo y navegador representativo cerrados

| Set | CTW palabras/objetivos | Academic palabras | Official-family + suplemento | Build | Chromium |
| --- | ---: | ---: | ---: | ---: | --- |
| 11 | 79 / 10 | 182 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |
| 12 | 81 / 10 | 190 | 5 + 1 | 10 | unit |
| 13 | 84 / 10 | 193 | 5 + 1 | 10 | unit |
| 14 | 83 / 10 | 202 | 5 + 1 | 10 | unit |
| 15 | 87 / 10 | 202 | 5 + 1 | 10 | 10/10 · 6/6 · 10/10 |

## Resultado

- CTW: un objeto por set, primera oración intacta, exactamente diez objetivos alternos
  y entrada de sólo letras faltantes.
- Academic: cinco preguntas single-select de familia oficial y un multiselect rotulado
  como suplemento WeLearn; todos los pasajes quedan dentro de 180–220 palabras.
- Build: diez intercambios contextualizados por set, cuatro fragmentos correctos y un
  distractor inequívocamente incorrecto; contexto y texto fijo de respuesta visibles.
- Seguridad: IDs independientes por set. Las claves CTW/Reading y los órdenes Build
  viven sólo en servidor; la deriva entre fuente pública y privada falla cerrada.
- Preservación: diez bloques CTW, cinco pasajes Academic y treinta actividades Build
  anteriores permanecen como fuentes server-only reutilizables.
- Auditoría factual/editorial: decisiones y fuentes en
  `docs/toefl-2026-written-sets11-15-factual-audit-2026-08-14.md`.

## Evidencia ejecutada

- `npm run check:toefl-ctw`: PASS; unit 8/8 y 10/10 por Set 2–15.
- `npm run check:toefl-reading`: PASS; unit 8/8 y 6/6 por Set 2–15.
- `npm run check:toefl-build-sentence`: PASS sobre 150 ítems Sets 1–15; unit
  9/9 y 10/10 por set.
- `npm run check:toefl-writing`: PASS; unit 8/8 sobre las políticas de 20 sets.
- `npx tsc --noEmit`: PASS.
- ESLint dirigido sobre todos los cambios W6: PASS.
- `npm run build`: PASS con guardianes completos y 1.364/1.364 rutas.
- Chromium de producción Sets 11 y 15: PASS 2/2. Ambos cerraron CTW 10/10,
  Academic 6/6 y Build 10/10 contra los tres endpoints server-only.

La primera apertura de Chromium fue impedida por el sandbox de macOS antes de cargar
una página (`MachPortRendezvousServer: Permission denied`). La misma prueba se repitió
con permiso local ampliado y pasó 2/2 en seis segundos. Se registra como infraestructura,
no como fallo académico o de producto.

## Límites honestos

- Sets 11–15 quedan completos dentro del alcance no-audio actual: CTW, Daily Life,
  Academic, Build, Email y Academic Discussion.
- Sets 16–20 siguen pendientes del mismo tratamiento.
- VoiceOver T16/T17 continúa como gate humano documentado.
- No se abrió, reprodujo, transcribió, generó ni modificó audio. Esto todavía no
  declara los 20 simulacros completos ni autoriza producción.
