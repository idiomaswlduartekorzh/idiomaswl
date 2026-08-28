# IELTS Academic 2026 — dictamen integral de Sets 1–20

Fecha de cierre de la microfase no-audio: 28 de agosto de 2026  
Rama aislada: `codex/ielts-academic-2026-audit`  
Dictamen: **APROBADO en contenido, UI/UX y full-stack; BLOQUEADO para release IELTS completo por 23 gates de audio**

## Qué significa este dictamen

Los 20 simulacros son material original de WeLearn alineado con la estructura pública,
familias de tarea, tiempos y dificultad observable de IELTS Academic. No son preguntas,
gráficos ni grabaciones oficiales; tampoco existe evidencia de equivalencia psicométrica.
Por eso el producto y cada Set 1–20 muestran una declaración explícita de no oficialidad.

“Aprobado no-audio” significa que Reading, Writing, Speaking, las respuestas y estructura
de los guiones Listening, las claves privadas, la corrección, la privacidad y la experiencia
de uso pasaron sus guardianes. Los 20 guiones también superan ya el proxy temporal previo
a síntesis; ese proxy no sustituye la medición del audio final. No autoriza a afirmar que los
20 mocks ya simulan Listening de punta a punta.

## Inventario verificado

| Alcance | Resultado |
|---|---:|
| Sets visibles y accesibles desde el hub | 20/20 |
| Candados de suscripción en IELTS | 0 |
| Respuestas Listening por set | 40/40 |
| Respuestas Reading por set | 40/40 |
| Palabras por Reading | 2.150–2.468 |
| Palabras por guion Listening | 2.869–2.967 |
| Guiones que superan el proxy temporal de 2.800 palabras | 20/20 |
| Writing | Task 1 + Task 2 en 20/20 |
| Speaking | Parts 1–3 en 20/20 |
| Claves objetivas expuestas al cliente | 0 |
| Sets con audio integral apto bajo el gate actual | 0/20 |

Estado real del audio:

- Sets 1–3: los guiones ya pasan el proxy temporal con 2.901–2.937 palabras; sus archivos
  heredados duran 22,9–26,0 minutos y no están liberados. Reensamblado y QA pendientes.
- Set 4: master históricamente aceptado y publicado, pero reclasificado como heredado:
  su guion vigente ya tiene 2.870 palabras, pero el MP3 de 27:05 sólo conserva 902,119 s
  audibles y una cola muda de 141,545 s.
- Set 5: el guion de referencia ya tiene 2.909 palabras (729/721/737/722 por parte),
  pero su candidato v2 de 29:00 quedó obsoleto frente a ese texto y además fue rechazado:
  sólo 737,066 s audibles y una cola muda de 242,318 s.
- Sets 6–10: los guiones ya pasan el proxy temporal con 2.869–2.967 palabras; sus MP3
  heredados de 24:00 siguen siendo reemplazo obligatorio.
- Sets 11–12: guiones en rango; sus MP3 heredados de 24:00 requieren reemplazo.
- Sets 13–20: guiones en rango y MP3 integral inexistente; la interfaz excluye Listening.

El auditor global termina deliberadamente `BLOCKED (23)`: dos gates por cada Set 1–3,
uno de fidelidad temporal por cada Set 4–12 y uno por cada Set 13–20. No existe otro bloqueo editorial,
estructural, de claves o de aplicación en su salida.

## Auditoría por perspectiva

| Perspectiva | Evidencia reproducible | Dictamen |
|---|---|---|
| IELTS experto | 20× L40/R40; Reading en rango; scripts densos y con evidencia ordenada; Task 1/2; Speaking 1–3; tiempos 30/60/60/14 en Sets 4–20 | APROBADO no-audio |
| Modelo Golden | 20 auditorías individuales, 4.800 controles; la aceptación histórica de Set 4 se conserva sin presentarla como release vigente | APROBADO no-audio |
| Full-stack | 14 contratos Academic 2026, 12 de scoring/review y 12 de entrega/privacidad | 38/38 |
| Seguridad y privacidad | proyección pública con 0 claves; scoring privado; consulta de resultados ligada a `user_id`; Overall sólo con L/R/W/S | APROBADO |
| Usuario promedio | 20 enlaces, 0 locks; estados `Audio pendiente`/`Audio en revisión`; errores de reproducción con explicación y reintento | APROBADO |
| UI/UX | un solo `main`; cards Listening distinguibles; singular/plural correcto; Reading sticky sin ocultarse; móvil sin sticky ni overflow | APROBADO |
| Accesibilidad | skip link, nombres accesibles, `role=alert`, foco visible de 3 px, reduced motion y navegación por teclado | APROBADO |
| Integridad del producto | hub compartido y catálogo protegido de 465 temas | APROBADO |
| Audio integral | 0/20 bajo el gate temporal calibrado | BLOQUEADO |

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
- Revisión Web Interface Guidelines: MCQ usa `fieldset`/`legend` y radios nativos; los
  multiselectores anuncian grupo y conteo; nombre, correo y consentimiento reciben foco
  cuando fallan; la entrega expone su estado asíncrono con `aria-busy` y regiones live.
- Interacción accesible real: en Reading Set 20, `ArrowDown` movió la selección del radio C
  al D dentro del grupo de la pregunta 27; en Listening Set 4, las casillas A y B dejaron el
  contador en `Selected: 2/2` y deshabilitaron C; al intentar enviar el formulario vacío,
  el foco regresó al campo `Nombre completo` mientras el error se anunció como `alert`.
- Set 4: MP3 histórico cargado con `readyState=4`, duración 1.625 segundos (27:05), reproducción
  iniciada y tiempo avanzando; la UI lo identifica ahora como audio heredado en revisión.
- Reproducción única: después de iniciar Set 4 se persiste `consumed=1`; tras recargar,
  no existe `<audio>` ni botón de play y el estado anuncia que la reproducción terminó.
- Consola de las rutas verificadas: cero errores. Sólo apareció el warning no bloqueante
  de preload de una fuente durante `next dev`.

## Gates ejecutados

```text
audit:ielts-academic-2026   BLOCKED (23), exclusivamente audio
test:ielts-academic-2026    14/14
test:ielts-review           12/12
test:ielts-fullstack        12/12
test:ielts-audio-pipeline    4/4
test:ielts-audio-timing      3/3
check:ielts-review-blueprint 20/20 sets
check:ielts-golden-standard PASS
check:ielts-non-audio-closure 20/20 sets, 4.800 live controls
check:exam-hub-ui           PASS
check:practica-catalog      465 temas protegidos
TypeScript                  PASS
Set 1 pinned blueprint      BLUEPRINT_APPROVED, Q1–Q40 por skill
```

Las 20 auditorías Golden individuales pasaron 4.800 controles. La auditoría tardía de
Set 4 añadió 267 controles y encontró una deuda real que los guardianes globales no
detectaban: su Writing heredado coincidía con dos materiales IELTS ampliamente
publicados. Se sustituyeron el gráfico de consumo de carne y la consigna sobre transporte
público gratuito por un SVG y una consigna originales de WeLearn. También se ampliaron
Speaking Parts 1 y 3, se corrigieron afirmaciones factuales de Reading y se eliminaron
variantes de respuesta que no aparecían literalmente en la fuente. Sus cuatro partes,
preguntas, evidencias y reparto permanecieron intactos. El archivo aceptado se conserva
por trazabilidad, pero dejó de ser referencia de release al fallar el nuevo gate temporal.

La verificación factual de Set 4 se apoyó en la estructura pública de
[IELTS Speaking](https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking),
el total de registros de vehículos eléctricos de la
[IEA](https://www.iea.org/reports/global-ev-outlook-2024/trends-in-electric-cars), el
análisis de ciclo de vida del
[ICCT](https://theicct.org/wp-content/uploads/2025/07/ID-392-%E2%80%93-Life-cycle-GHG_report_final.pdf)
y el [Reglamento europeo de baterías](https://eur-lex.europa.eu/eli/reg/2023/1542/oj).
Las coincidencias públicas de las consignas antiguas se documentaron sólo como
proveniencia y ya no se sirven en el simulacro.

El cierre no-audio está fijado además por el manifiesto
`docs/ielts-non-audio-closure-2026-08-28.json`, con SHA-256 de cierre
`49d433b6816fd5aa4e33e127eb0d03c718c00835accdc5d8ed1eac67df692ea3`. El guardián
repite las 20 auditorías en vivo y liga cada resultado al mock actual, su auditor, las
transformaciones compartidas, la proyección pública y el gráfico Task 1. Cualquier cambio
sin una nueva revisión explícita invalida la huella y detiene el prebuild. Los registros
`deferred` individuales ya contienen exclusivamente trabajo de audio.

## Plan de audio y criterio de salida

El manifiesto de planificación vigente tiene SHA-256
`c1faeb57ba9fe3bf9aa3b13ea1adad174e824c3831a1759c00a63e9bea5c6fff`, 58.322
palabras fuente y déficit temporal cero: los 20 guiones pasan el proxy previo a síntesis.
El manifiesto suma 358.016 caracteres, 179.008 créditos y USD 17,9008 antes de impuestos
y reintentos. `generationAuthorized=false`: aunque el gate de guion ya está aprobado, el
generador rechaza llamadas al proveedor porque el manifiesto no tiene autorización vigente.

La auditoría física `docs/ielts-audio-cache-reuse-2026-08-28.json` verificó 154 archivos
de segmento (29.044.006 bytes), todos legibles como audio. Al deduplicarlos quedan 142
segmentos fuente únicos; la coincidencia estricta `perfil de voz + SHA-256 del texto`
cubre 351 apariciones y 29.028 caracteres del manifiesto vigente. Esto reduce la factura
incremental a 328.988 caracteres, 164.494 créditos equivalentes por volumen y un techo
conservador de 164.934 tras redondear cada solicitud, o USD 16,4494 antes de impuestos y
reintentos. Set 4 puede reciclar 82 de 98 segmentos (14.014 caracteres) y Set 5, 51 de 78
(4.448 caracteres). Los anuncios comunes también se reciclan en los demás Sets.

Ambos masters completos siguen siendo incompatibles con el nuevo manifiesto y están
marcados como superados; ninguno es liberable bajo el gate actual. El MP3 histórico de Set 5 permanece en el caché estable
`/Users/josedavidduartesilva/Developer/idiomaswl-ielts-audio-cache/a3b8302fb89f491ba00388c845346cc08ed40a283963d446e3b5148b9c0bccea/sets-5/set-5/ielts-listening-set-5.mp3`.
La consulta de sólo lectura del 28 de agosto registró 964 créditos disponibles y renovación
el 5 de septiembre de 2026 a las 18:13:51 (Bogotá); la consulta no consumió créditos.

El presupuesto anterior dejó de ser válido porque dependía de guiones demasiado breves.
Los 964 créditos observados no cubren los 164.934 créditos incrementales conservadores y no se gastarán
sin una nueva autorización. Incluso el límite de una renovación completa (121.031) queda
43.903 créditos por debajo del techo incremental; será necesario dividir la producción
entre ciclos o ampliar capacidad. La ola recomendada 1 cubre Sets 4–17 con 112.473 créditos
conservadores y deja 8.558 de margen dentro de una renovación; la ola 2 cubre Sets 18–20
y 1–3 con 52.461. Este orden es sólo un plan técnico y no autoriza gasto. La expansión y auditoría de los 20 guiones ya terminó y
la factura incremental está congelada por hash. Después, cada Set debe
pasar, en una microfase independiente:

1. manifiesto inmutable de texto, casting y coste máximo autorizado;
2. generación sin exceder el techo del propietario;
3. ensamblado sin relleno ciego, mono 44,1 kHz/64 kbps, objetivo 29–30 min, al menos
   990 s audibles, ≤45 % silencio, ninguna pausa >75 s y cola muda ≤5 s;
4. transcript↔ASR, 40 evidencias en orden y revisión humana de las cuatro partes;
5. autorización explícita antes de reemplazar `public/`;
6. smoke desktop/móvil/teclado y auditor global sin el bloqueo de ese Set.

El release integral sólo puede declararse listo cuando `audit:ielts-academic-2026`
termine sin bloqueos y los 20 MP3 estén ligados a hash, QA técnico, alineación y
aceptación humana. Hasta entonces, WeLearn debe mantener los estados de audio visibles.
