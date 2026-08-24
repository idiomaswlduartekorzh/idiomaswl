# Auditoría de bloque · SAT Set 4 M2 exigente · Information and Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 12 preguntas y dos dominios.

## Alcance

Se revisaron q09–q15 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m2-dificil-ii.ts`. El bloque y su módulo
incremental permanecen fuera del catálogo público.

## Resultados reproducibles

```text
ítems / metadatos       7 / 7
claves                  A2 · B1 · C2 · D2
secuencia               C · A · D · B · C · D · A
longitud de estímulo    32,5–94,7 palabras-SAT
prueba ciega (15/27)    22,6 % de media · techo 35 %
clave más larga         13,3 % acumulado
clave más corta         13,3 % acumulado
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 12 módulos · 312 ítems · cero secuencias de 8+ palabras
estructura del módulo   rechazo esperado · 15 ítems, deben ser 27
```

La primera medición acumulada marcó 40 % para “más larga” y 46,7 % para “más palabras”.
Se compactaron q09, q10 y q13; q11, q14 y q15 recibieron distractores comparables sin
agregar hechos. La repetición dejó “más larga” en 13,3 % y la media bajó de 25,6 % a
22,6 %.

## Clave única y distractores

| ID | Clave | Decisión |
| --- | :---: | --- |
| q09 | C | prioriza detalles y relaciones espaciales necesarios para seguir la acción |
| q10 | A | integra variación de densidad y composición según severidad del incendio |
| q11 | D | tres residencias portuarias apoyan directamente procedencias diversas |
| q12 | B | agujeros a través de parche y hoja sitúan la reparación antes de encuadernar |
| q13 | C | 47 U/mL es el máximo y 47 − 19 produce la caída de 28 U/mL |
| q14 | D | nueva numeración y nota colocan el descubrimiento de Lio antes del anuncio |
| q15 | A | con frecuencia y duración constantes, más amplitud acompaña 6 → 14 → 27 mg |

Antes del control automático se corrigió q14: la primera numeración invertía por error el
orden que la nota editorial exigía. También se cambió la variable planificada de q15 de
frecuencia a amplitud porque la evidencia primaria apoya con mayor claridad la relación
entre amplitud floral y cantidad de polen. No se detectó otra clave defendible.

## Hechos y fuentes

- q09: AccessibleEU, descripción hablada de acciones y otros elementos visuales.
  <https://accessible-eu-centre.ec.europa.eu/document/download/d9efa4a6-8131-455f-a47c-70f25d48fd9b_en?filename=05.Improving+accessibility+in+audiovisual+materials.pdf>
- q10: Maia et al., densidad y composición del banco de semillas según severidad del
  incendio.
  <https://doi.org/10.1016/j.geoderma.2012.02.001>
- q15: Jankauski et al., amplitud de vibración floral y liberación de polen.
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC9355986/>

q11, q12 y q14 son escenarios originales; q13 y q15 usan datos originales. La fuente de
q15 sustenta la relación cualitativa, no las cifras inventadas para el ítem.

## Originalidad externa y límite

Se buscaron entre comillas los siete inicios. No apareció ninguna coincidencia exacta;
los resultados sobre audio descripción, enzimas y flores fueron temáticos o ajenos a la
redacción.

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. Standard English Conventions q16–q22 es el siguiente bloque;
M2 exigente no será contenido apto hasta 27/27.
