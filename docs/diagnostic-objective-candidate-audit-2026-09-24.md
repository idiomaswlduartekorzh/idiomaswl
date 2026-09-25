# Auditoría de candidatos objetivos para Nivel Radar

Fecha de corte: **24 de septiembre de 2026**  
Inventario reproducible: `config/diagnostic/objective-candidate-inventory.json`

## Decisión

Los motores y bancos actuales sí aportan una base técnica importante, pero **ninguna de las
965 interacciones auditadas puede entrar sin cambios al banco diagnóstico reservado**. Se
pueden reutilizar contratos de respuesta, formatos, taxonomías, scoring de servidor y 40
archivos de audio; los enunciados públicos necesitan una forma paralela nueva y posterior
revisión lingüística.

| Fuente | Interacciones | Valor reutilizable | Restricción principal |
|---|---:|---|---|
| Cambridge B2 | 820 | formatos de lectura, Use of English y escucha; 40 MP3 presentes | solo B2, claves en payload público y audios por sección sin timecodes por ítem |
| TOEFL Reading 2026 | 125 | contenido sin clave y scoring ya separado en servidor | enunciados y opciones ya públicos; cobertura B1–C1 y solo lectura |
| Diagnóstico ICFES | 20 | formatos breves y subdominios iniciales | clave y explicación públicas; dificultad 1–5 no equivale a MCER |

## Distribución observada

- Lectura: **357** interacciones.
- Escucha: **300** interacciones.
- Gramática: **144** interacciones.
- Vocabulario: **164** interacciones.
- Claves separadas en servidor: **125**; claves incluidas en material público: **840**.
- Audios Cambridge: **40/40 presentes**, todos con SHA-256 y duración verificable; los 40
  requieren segmentación y revisión auditiva antes de usarse como testlets diagnósticos.
- Concentración: **820/965 (85,0 %) están etiquetadas únicamente como B2**.

## Qué se reutiliza

1. El registro de scoring de TOEFL como patrón para mantener claves fuera del navegador.
2. Los formatos Cambridge por parte, corrigiendo la clasificación antigua:
   - Parte 1 → vocabulario y colocación;
   - Partes 2 y 4 → gramática;
   - Parte 3 → formación de palabras/vocabulario;
   - Partes 5–7 → lectura;
   - Listening → escucha, solo después de crear timecodes y testlets cerrados.
3. Las taxonomías ICFES de idea principal, detalle, inferencia, referencia, paráfrasis y
   propósito como insumo editorial, no como evidencia de nivel MCER.
4. Los motores existentes de MCQ, cloze y matching, siempre con contenido reservado nuevo.

### Resultado de los 60 audios retirados de inglés

La segunda auditoría enlazó cada MP3 recuperado con el objeto editorial exacto guardado en Git:

- **A1: 20/20** tienen transcripción y al menos tres preguntas con una sola clave; pueden pasar
  a reescritura de preguntas y opciones en inglés.
- **A2: 0/20** tienen transcripción en la fuente recuperada; conservan audio y metadatos, pero
  requieren transcripción verificada antes de escribir un testlet.
- **B1: 20/20** tienen transcripción y preguntas suficientes; pueden pasar a reescritura en
  inglés.

Los prompts y opciones heredados están en español. No se reutilizarán porque añadirían
comprensión lectora en la lengua materna al constructo de escucha. Los 60 audios miden entre
menos de tres minutos y ya son fragmentos cerrados; no necesitan el recorte de los masters
Cambridge, aunque sí alineación auditiva humana.

Como primera tanda editorial se escribieron **12 decisiones A1 y 12 B1** en inglés, distribuidas
en seis audios por nivel. Permanecen como borradores `previously-public`: sirven para revisión y
piloto, pero el selector productivo solo admite exposición `reserved`. Una decisión académica
posterior deberá escoger entre regenerar formas de audio equivalentes y reservadas o aceptar de
manera explícita el riesgo de exposición para un piloto de bajo impacto.

## Qué no se reutiliza directamente

- enunciados u opciones ya visibles en páginas de práctica;
- explicaciones o claves incluidas en módulos importables por cliente;
- la etiqueta `difficulty` de ICFES como nivel MCER;
- un MP3 completo de sección para puntuar una sola decisión;
- preguntas de escucha en español para un diagnóstico de comprensión auditiva en inglés;
- la etiqueta genérica `Reading & Use of English` para asignar todos sus ítems a gramática;
- una puntuación o nivel producido antes de revisión y pilotaje.

## Brecha real para el banco v1

El piso operativo sigue siendo **288 decisiones reservadas**: 12 por cada combinación de las
cuatro habilidades objetivas y los seis niveles A1–C2. Además, lectura y escucha necesitan al
menos seis estímulos distintos por nivel. El inventario público no reduce ese piso: sirve para
no empezar de cero en formatos y procesos, no para simular que ya existe un banco reservado.

Cada promoción futura exigirá contenido nuevo, clave y racional en servidor, huella del
contenido revisado, aprobación lingüística independiente y estado explícito de piloto. El paso
de piloto a operativo exigirá parámetros empíricos y no ocurrirá por una edición manual del
estado.
