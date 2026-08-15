# TOEFL 2026 — auditoría del runtime de sesión fija

Fecha: 14 de agosto de 2026

Estado: implementación integrada en rama; preview local automático PASS; gates humanos y audio pendientes

## Resultado

Los veinte simulacros comparten ahora un runner de práctica fija con ocho bloques en
orden irreversible:

1. Reading Módulo 1 — 20 interacciones;
2. Reading Módulo 2 — 20;
3. Listening Módulo 1 — 18;
4. Listening Módulo 2 — 16;
5. Writing Build a Sentence — 10;
6. Writing Write an Email — 1;
7. Writing Academic Discussion — 1;
8. Speaking — 11.

Total: 97 interacciones por set. Esta es una **forma fija reproducible basada en la
práctica publicada**, no una afirmación de replicar el enrutamiento adaptativo de ETS.

## Navegación y cierre

- desaparecieron las pestañas que permitían saltar libremente entre skills;
- cada bloque se cierra con una advertencia explícita y no tiene botón Back;
- Reading conserva edición y revisión dentro del módulo activo;
- Listening y Speaking muestran un solo ítem a la vez y avanzan únicamente hacia
  adelante;
- el bloque, el ítem forward-only, el deadline y el consumo de medios se restauran
  desde un estado local versión 4;
- la persistencia es de práctica anónima en ese navegador, no autoridad de servidor ni
  modo proctoring.

## Relojes

| Bloque | Runtime | Rotulado |
|---|---:|---|
| Reading M1 | 21 min | forma fija de práctica publicada |
| Reading M2 | 9 min | forma fija de práctica publicada |
| Listening M1/M2 | sin reloj inventado por ítem | ETS no publica los segundos exactos por pregunta |
| Build a Sentence | 6 min | derivación WeLearn de 23−7−10, no reloj oficial independiente |
| Write an Email | 7 min | límite publicado de tarea |
| Academic Discussion | 10 min | límite publicado de tarea |
| Speaking | sin reloj inventado por respuesta | sin preparación; ETS publica duración aproximada de sección |

Los deadlines aplicables son absolutos y sobreviven recarga. El manifiesto de blueprint
ya no almacena 18/11 minutos estimados como si fueran relojes oficiales de Listening ni
480 segundos como reloj exacto de Speaking.

## Audio y Speaking

- cada estímulo listo se puede iniciar una sola vez;
- el inicio y finalización quedan registrados; después de recargar no aparece una
  reproducción adicional;
- respuestas de Listening permanecen deshabilitadas hasta terminar el estímulo;
- los 25 ítems afectados por medios faltantes en cada set se muestran bloqueados y no
  entran al denominador: 19 Listening, 2 Repeat y 4 Interview;
- esos 25 ítems corresponden a 20 archivos TTS nuevos por set: 14 Listening, 2 Repeat y
  4 Interview; total del conjunto: 400 archivos, antes de posibles cortes reutilizables;
- Speaking usa una captura real con `MediaRecorder` cuando el prompt está listo;
- la captura permanece temporalmente en la pestaña, no se sube, desaparece al recargar
  y queda `not_evaluated`;
- si el navegador niega el micrófono, existe reintento y fallback explícito sin nota;
- no se reproducirá ni generará el lote de audio faltante antes del gate del owner.

## Resultados

Se retiraron:

- autoevaluación 1–6 de Speaking;
- banda estimada por porcentaje;
- overall parcial;
- conversión aproximada `/120`.

El cierre muestra únicamente Reading y Listening brutos corregidos por servidor,
Build a Sentence bruto, Writing construido `not_evaluated` y Speaking
`not_evaluated`. Los ítems bloqueados no se convierten en errores académicos.

## Evidencia

- `test:toefl-fixed-session`: 3/3 PASS;
- `check:toefl-fixed-session`: PASS;
- TypeScript: PASS;
- ESLint dirigido: PASS sin errores;
- build de producción Webpack: PASS, 1.365/1.365 páginas;
- smoke de producción local: Sets 1–20 devolvieron HTTP 200 y mostraron de forma
  independiente 97 interacciones, 8 etapas, 25 ítems bloqueados y el disclosure de
  ruta fija;
- guardianes globales: catálogo 465, escritura 480, 24 series y 480 MP3 de escucha
  ajenos a TOEFL preservados;
- prueba real Chromium Set 1: intro 97/8/25, Reading M1→M2 con cierre, relojes 21→9,
  Listening M1 en ítem 1/18, opciones y avance bloqueados antes del audio, restauración
  en el mismo ítem tras recarga;
- inspección visual 320×900: sin desbordamiento horizontal de página;
- cero audio abierto, reproducido, transcrito, generado o modificado durante esta
  verificación.

## Gates todavía abiertos

- acta consolidada de contenido, scoring y release de Sets 1–20: cerrada en
  `docs/toefl-2026-sets1-20-release-audit-2026-08-14.md`;
- VoiceOver humano T16 y T17;
- actualización de la rama contra `origin/main` y repetición de guardianes;
- preview Vercel editorial;
- aprobación explícita de voces, muestra, costo y manifiesto de audio;
- generación y QA únicamente del lote aprobado.

Por tanto, este cambio cierra la brecha principal del runner, pero **no convierte aún el
producto en terminado ni autoriza producción**.
