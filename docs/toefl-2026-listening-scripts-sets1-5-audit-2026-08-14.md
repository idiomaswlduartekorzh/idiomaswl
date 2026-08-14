# TOEFL 2026 — auditoría de guiones Listening Sets 1–5

Fecha: 14 de agosto de 2026

Estado: guiones aprobados internamente; no integrados al examen ni autorizados para TTS

## Resultado del lote

Cada set incorpora en datos editoriales:

- tres Choose a Response destinados a completar Módulo 1;
- ocho Choose, una Conversation de dos preguntas, un Announcement de dos y un
  Academic Talk de cuatro para Módulo 2;
- 19 interacciones escritas nuevas y 14 medios TTS planificados;
- claves correctas únicamente en un módulo `server-only`;
- estado explícito `script-ready-audio-blocked` en los 70 medios.

La ganancia neta futura será 17 por set porque dos preguntas heredadas —la tercera de
Announcement y la quinta de Academic Talk— se conservarán fuera de la sesión fija.
Este lote todavía no cambia el inventario operativo 17/34: no se ha conectado a la
experiencia y no hay audio para los estímulos nuevos.

## Auditoría editorial

- 55 Choose distintos, entre 4 y 18 palabras;
- Conversations entre 73 y 91 palabras;
- Announcements entre 59 y 72 palabras;
- Academic Talks entre 181 y 205 palabras;
- 95 IDs de ítem y 70 IDs/URLs de medio únicos;
- cuatro opciones A–D por pregunta y una clave privada que resuelve a una opción pública;
- ningún guion ni archivo de audio duplicado;
- ocho respuestas correctas tenían una ventaja grande de longitud frente a sus
  distractores; se reescribieron los distractores y el guardián quedó en cero casos.

## Contraste factual de Academic Talk

| Set | Tema | Fuentes institucionales | Veredicto |
| --- | --- | --- | --- |
| 1 | Mutualismo coral–algas y blanqueamiento | [NOAA — coral reef ecosystems](https://prod-01-alb-www-noaa.woc.noaa.gov/education/resource-collections/marine-life/coral-reef-ecosystems), [NOAA — zooxanthellae](https://oceanservice.noaa.gov/education/tutorial_corals/coral02_zooxanthellae.html) | Coral como animal, intercambio mutualista, pérdida de algas bajo estrés, recuperación posible y excepción de corales profundos se presentan con los calificadores correctos. |
| 2 | Sueño y consolidación de memoria | [NIMH — nuevas y antiguas memorias durante el sueño](https://www.nimh.nih.gov/news/science-updates/2025/how-the-brain-creates-new-memories-while-maintaining-old-ones), [NIH — dreams and memory](https://www.nih.gov/common-fund/news-media/science-highlights/exploring-dreams-memory) | Se habla de reactivación y consolidación, no de grabación perfecta. Targeted Memory Reactivation se limita a influir sobre aprendizaje previo y no a insertar recuerdos. |
| 3 | Isla de calor urbana y vegetación | [EPA — heat island effect](https://www.epa.gov/heatislands), [EPA — benefits of trees and vegetation](https://www.epa.gov/heatislands/benefits-trees-and-vegetation) | Superficies, calor antropogénico, sombra y evapotranspiración están diferenciados. Se incluyen mantenimiento, distribución y vulnerabilidad; no se promete un enfriamiento uniforme. |
| 4 | Navegación de aves migratorias | [NPS — what is migration](https://home.nps.gov/grte/learn/nature/what-is-migration.htm), [NPS — safe flight, dark night](https://www.nps.gov/articles/safeflight.htm) | Sol, estrellas, campo magnético, experiencia y posibles señales adicionales se presentan como sistema de múltiples pistas. Luz nocturna se describe como perturbación, no como única amenaza. |
| 5 | Expansión del fondo oceánico | [USGS — developing plate tectonic theory](https://pubs.usgs.gov/gip/dynamic/developing.html), [NOAA PMEL — seafloor spreading](https://pmel.noaa.gov/eoi/nemo/explorer/concepts/spreading.html) | Edad de rocas, bandas magnéticas, simetría, perforación y reciclaje en límites convergentes respaldan el relato; ningún indicador se trata como prueba aislada autosuficiente. |

## Reutilización de Conversation existente

Se auditó el texto —sin abrir ni reproducir MP3— para evaluar dos clips de dos preguntas:

| Set | Corte por guion | Decisión provisional |
| --- | --- | --- |
| 1 | Después de la comparación entre Psychology y Public Speaking | Candidato natural: preguntas 1–2 antes; 3–4 después. |
| 2 | La segunda mitad depende de la queja y de la primera recomendación | No cortar por ahora; conservar un estímulo de cuatro preguntas es más honesto que ocultar contexto. |
| 3 | La segunda mitad depende de la vacilación y requisitos explicados antes | No cortar por ahora; conservar un estímulo de cuatro preguntas salvo aprobación de una variante nueva. |
| 4 | Después de que la biblioteca perdona la multa | Candidato natural: problema/multa antes; renovación futura después. |
| 5 | Después de explicar el valor académico de la visita | Candidato natural: decisión/beneficio antes; alternativa y transporte después. |

El contrato final admite esta divergencia de preservación: la sección completa sí
mantendrá 16/6/4/8 interacciones, pero algunos Módulo 1 pueden usar una Conversation
larga con cuatro preguntas en vez de dos conversaciones cortas. La interfaz lo declarará
como forma fija WeLearn y no como réplica exacta ETS.

## Evidencia automática

- `npm run check:toefl-fixed-listening`: PASS;
- `npm run test:toefl-fixed-listening`: PASS 3/3;
- `npx tsc --noEmit`: PASS;
- el checker prueba límites de longitud, composición, IDs, claves privadas, ausencia de
  pista sistemática por longitud y cero cambios en `public/audio`.

## Pendientes antes de integrar el lote al simulacro

1. Completar guiones Sets 6–20 y la auditoría factual total.
2. Adaptar las 15 preguntas heredadas conservadas a payload sin respuestas.
3. Cerrar API/registro server-only para los 34 ítems.
4. Construir preview editorial de guiones y plan de voces/costo.
5. Recibir aprobación del owner; sólo entonces producir medios y probar el runtime.

No se abrió, reprodujo, transcribió, generó, normalizó ni modificó ningún audio.
