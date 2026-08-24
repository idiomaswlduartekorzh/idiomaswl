# Auditoría de bloque · SAT Set 3 M1 · Craft and Structure

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 19 preguntas y tres dominios.

## Alcance

Se revisaron q01–q08 en
`src/data/mocks/sat/drafts/set-3/blocks/sat-set-3-m1-cs.ts`. El bloque permanece fuera del
catálogo público y no autoriza por sí solo una ruta, un acta de módulo ni publicación.

## Resultados reproducibles

```text
ítems / metadatos       8 / 8
claves                  A2 · B2 · C2 · D2
clave más larga         25,0 %
clave más corta         12,5 %
solape alto             25,0 %
solape bajo             12,5 %
longitud de estímulo    78,2–131,0 palabras de seis caracteres
prueba ciega            25,0 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 7 módulos · 170 ítems · cero secuencias de 8+ palabras
```

La prueba ciega se ejecutó con las 18 heurísticas de `sat-blind-test.mjs`, sin estímulos.
Las cuatro reglas “siempre letra” dieron 25 %. Ninguna heurística individual superó 37,5 %.

## Clave única y distractores

| ID | Clave | Decisión |
| --- | :---: | --- |
| q01 | B | *held* conserva la geometría; las otras acepciones cambian la relación entre metal y forma |
| q02 | D | cada marca es evidencia sobreviviente; *route* queda vivo por la metáfora final, pero no define una marca individual |
| q03 | A | el objeto de *compressed* es el tiempo; codificar o resumir afectaría al mensaje |
| q04 | C | la última oración sintetiza complementariedad, sin imponer orden ni manipulación del original |
| q05 | B | el texto va de resultado a dos mecanismos y después al diseño de medición |
| q06 | A | 1918 separa reconocimiento jurídico de adopción ferroviaria y municipal previa |
| q07 | D | Text 2 admite decisiones de remoción, pero exige evaluar primero las capas posteriores |
| q08 | C | ambos aceptan el patrón; difieren en si la secuencia permite atribución causal principal |

No se detectó una segunda clave defendible. Las cuatro opciones de cada ítem tienen razón
de error escrita y ninguna depende de conocimiento regional o económico del estudiante.

## Hechos y fuentes

- q01: NASA, propiedades de aleaciones con memoria de forma.
  <https://www.nasa.gov/aeronautics/memory-metals-are-shaping-the-evolution-of-aviation/>
- q03: Science Museum Group, línea Portsmouth–Admiralty de 1822, 108 km y unos 15 min.
  <https://collection.sciencemuseumgroup.org.uk/documents/aa110108752>
- q04: Smithsonian, descripción audiovisual, dibujos elevados y oportunidades táctiles.
  <https://americanhistory.si.edu/visit/accessibility/tactile-elements-and-accessible-exhibition-features>
- q05: US EPA, enfriamiento por sombra y evapotranspiración.
  <https://www.epa.gov/heatislands/benefits-trees-and-vegetation>
- q06: NIST, adopción ferroviaria del 18 nov 1883, conferencia de 1884 y ley de 1918.
  <https://www.nist.gov/pml/time-and-frequency-division/popular-links/walk-through-time/walk-through-time-world-time-scales>
- q07: ICOMOS, Carta de Venecia y textos doctrinales de conservación.
  <https://www.icomos.org/charters-and-doctrinal-texts/>
- q08: National Park Service, evidencia y debate sobre cascadas tróficas en Yellowstone.
  <https://www.nps.gov/yell/learn/nature/cyclesprocesses.htm>

q02 es ficción original. En los demás ítems, las fuentes respaldan hechos; estímulos,
preguntas, opciones y explicaciones fueron redactados desde cero.

## Originalidad externa

Se buscaron entre comillas ocho inicios distintivos, uno por estímulo. No apareció ninguna
coincidencia exacta. En q08 aparecieron estudios sobre Yellowstone por compartir el tema,
pero no la frase buscada. Esta comprobación amplía, no sustituye, la revisión editorial de
fuentes ni el guardián local.

## Límite declarado

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. Esa evidencia adicional se puede añadir al cierre del módulo,
pero no se presume en esta acta de bloque.

## Siguiente tarea

Abrir Information and Ideas q09–q15 solo después de este checkpoint. El acta completa de
`sat-set-3-m1` permanece prohibida hasta 27/27 y las auditorías de conjunto.
