# IELTS Academic 2026 — dictamen integral de Sets 1–20

Fecha de cierre de la microfase no-audio: 28 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen: **APROBADO en contenido, UI/UX y full-stack; BLOQUEADO para release IELTS completo por 22 gates de audio**

## Qué significa este dictamen

Los 20 simulacros son material original de WeLearn alineado con la estructura pública,
familias de tarea, tiempos y dificultad observable de IELTS Academic. No son preguntas,
gráficos ni grabaciones oficiales; tampoco existe evidencia de equivalencia psicométrica.
Por eso el producto y cada Set 4–20 muestran una declaración explícita de no oficialidad.

“Aprobado no-audio” significa que Reading, Writing, Speaking, los guiones de Listening,
las claves privadas, la corrección, la privacidad y la experiencia de uso pasaron sus
guardianes. No autoriza a afirmar que los 20 mocks ya simulan Listening de punta a punta.

## Inventario verificado

| Alcance | Resultado |
|---|---:|
| Sets visibles y accesibles desde el hub | 20/20 |
| Candados de suscripción en IELTS | 0 |
| Respuestas Listening por set | 40/40 |
| Respuestas Reading por set | 40/40 |
| Palabras por Reading | 2.150–2.468 |
| Palabras por guion Listening | 2.204–2.467 |
| Writing | Task 1 + Task 2 en 20/20 |
| Speaking | Parts 1–3 en 20/20 |
| Claves objetivas expuestas al cliente | 0 |
| Sets con audio integral aceptado | 1/20: Set 4 |

Estado real del audio:

- Sets 1–3: el archivo heredado dura 22,9–26,0 minutos y no está liberado; generación y
  QA pendientes.
- Set 4: master aceptado, publicado y reproducible; 27:05.
- Set 5: candidato v2 de 29:00 completo fuera de `public/`; sigue pendiente de escucha y
  aprobación humana antes de reemplazar el heredado de 24:00.
- Sets 6–12: MP3 heredados de 24:00; reemplazo obligatorio.
- Sets 13–20: MP3 integral inexistente; la interfaz excluye Listening de forma explícita.

El auditor global termina deliberadamente `BLOCKED (22)`: dos gates por cada Set 1–3,
uno por cada Set 5–12 y uno por cada Set 13–20. No existe otro bloqueo editorial,
estructural, de claves o de aplicación en su salida.

## Auditoría por perspectiva

| Perspectiva | Evidencia reproducible | Dictamen |
|---|---|---|
| IELTS experto | 20× L40/R40; Reading en rango; scripts densos y con evidencia ordenada; Task 1/2; Speaking 1–3; tiempos 30/60/60/14 en Sets 4–20 | APROBADO no-audio |
| Modelo Golden | 19 auditorías individuales, 4.517 controles; Set 4 cubierto por contrato global y QA del piloto | APROBADO no-audio |
| Full-stack | 14 contratos Academic 2026, 12 de scoring/review y 11 de entrega/privacidad | 37/37 |
| Seguridad y privacidad | proyección pública con 0 claves; scoring privado; consulta de resultados ligada a `user_id`; Overall sólo con L/R/W/S | APROBADO |
| Usuario promedio | 20 enlaces, 0 locks; estados `Audio pendiente`/`Audio en revisión`; errores de reproducción con explicación y reintento | APROBADO |
| UI/UX | un solo `main`; cards Listening distinguibles; singular/plural correcto; Reading sticky sin ocultarse; móvil sin sticky ni overflow | APROBADO |
| Accesibilidad | skip link, nombres accesibles, `role=alert`, foco visible de 3 px, reduced motion y navegación por teclado | APROBADO |
| Integridad del producto | hub compartido y catálogo protegido de 465 temas | APROBADO |
| Audio integral | Set 4 únicamente; 19 sets aún no liberables en Listening | BLOQUEADO |

## Prueba real de navegador

Validación local con Next.js 16.2.6 y Playwright:

- Desktop 1440×1000: 20 enlaces de simulacro, cero controles “Suscríbete”, un landmark
  `main`, cero overflow horizontal.
- Set 20: 3 skills activas, 45 respuestas y 164 minutos; sus cuatro partes Listening
  muestran nombres distintos y `Audio pendiente`; Reading inicia con 40 respuestas.
- Reading desktop: barra del examen termina en `y=116`; el pasaje sticky se fija en
  `y=132`, sin superposición.
- Móvil 390×844: grid de una columna, pasaje `position: static`, pestañas con scroll
  interno y documento sin overflow horizontal.
- Teclado: el tab activo presenta outline sólido de 3 px y halo adicional.
- Set 4: MP3 cargado con `readyState=4`, duración 1.625 segundos (27:05), reproducción iniciada y
  tiempo avanzando, sin error de audio.
- Reproducción única: después de iniciar Set 4 se persiste `consumed=1`; tras recargar,
  no existe `<audio>` ni botón de play y el estado anuncia que la reproducción terminó.
- Consola de las rutas verificadas: cero errores. Sólo apareció el warning no bloqueante
  de preload de una fuente durante `next dev`.

## Gates ejecutados

```text
audit:ielts-academic-2026   BLOCKED (22), exclusivamente audio
test:ielts-academic-2026    14/14
test:ielts-review           12/12
test:ielts-fullstack        11/11
test:ielts-audio-pipeline    3/3
check:ielts-review-blueprint 20/20 sets
check:ielts-golden-standard PASS
check:exam-hub-ui           PASS
check:practica-catalog      465 temas protegidos
TypeScript                  PASS
Set 1 pinned blueprint      BLUEPRINT_APPROVED, Q1–Q40 por skill
```

Las 19 auditorías Golden individuales disponibles (Sets 1–3 y 5–20) pasaron 4.517
controles. Set 4 se valida además en el contrato de la colección, el auditor global y su
manifiesto técnico/audio aceptado.

## Plan de audio y criterio de salida

El manifiesto de planificación vigente tiene SHA-256
`5d5b2495f79ec8d1860eaeefd7c73c505756132025ab6116b8b28fa1831b2799`, 40.269
palabras fuente y cero palabras adicionales requeridas. Su proyección completa es
243.231 caracteres, 121.616 créditos y USD 12,1616 antes de impuestos y reintentos.
`generationAuthorized=false`: es una estimación conservadora, no una orden de gasto.

Antes de cualquier nueva llamada a ElevenLabs se debe recalcular la factura incremental
excluyendo bytes aceptados de Set 4 y caché verificable de Set 5. Después, cada Set debe
pasar, en una microfase independiente:

1. manifiesto inmutable de texto, casting y coste máximo autorizado;
2. generación sin exceder el techo del propietario;
3. ensamblado mono 44,1 kHz/64 kbps, objetivo 29–31 min, loudness y pico validados;
4. transcript↔ASR, 40 evidencias en orden y revisión humana de las cuatro partes;
5. autorización explícita antes de reemplazar `public/`;
6. smoke desktop/móvil/teclado y auditor global sin el bloqueo de ese Set.

El release integral sólo puede declararse listo cuando `audit:ielts-academic-2026`
termine sin bloqueos y los 20 MP3 estén ligados a hash, QA técnico, alineación y
aceptación humana. Hasta entonces, WeLearn debe mantener los estados de audio visibles.
