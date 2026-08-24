# Auditoría de bloque · SAT Set 4 M1 · Craft and Structure

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 19 preguntas y tres dominios.

## Alcance

Se revisaron q01–q08 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m1-cs.ts`. El bloque permanece fuera del
catálogo público y no autoriza por sí solo una ruta, un acta de módulo ni publicación.

## Resultados reproducibles

```text
ítems / metadatos       8 / 8
claves                  A2 · B2 · C2 · D2
clave más larga         12,5 %
clave más corta         25,0 %
opción con más palabras 12,5 %
opción con menos        25,0 %
longitud de estímulo    75,7–116,0 palabras de seis caracteres
prueba ciega            22,9 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 10 módulos · 251 ítems · cero secuencias de 8+ palabras
```

La prueba ciega se ejecutó con las 18 heurísticas de `sat-blind-test.mjs`, sin estímulos.
Las cuatro reglas “siempre letra” dieron 25 %. Ninguna heurística ligada a longitud llegó
a 30 %; el máximo global fue 50 % en un ciclo posicional, que no usa rasgos del contenido.

El validador de examen completo informa exclusivamente `8 ítems, deben ser 27`. Ese fallo
es deliberado y se conserva: no se rebajó el contrato para declarar completo un módulo
parcial. En esta etapa sí pasaron `check:sat-catalog`, los diez tests de fábrica y el
guardián de originalidad.

## Clave única y distractores

| ID | Clave | Decisión |
| --- | :---: | --- |
| q01 | D | *resumed* contrasta suspensión y retorno: la fotosíntesis comenzó de nuevo |
| q02 | B | la hoja ausente deja un registro incompleto; no sesgado, favorable ni matemáticamente fraccionario |
| q03 | A | la imagen revela escritura existente sin recuperarla como propiedad, repetirla ni repararla |
| q04 | C | la tercera oración introduce la revisión que corrige la sustitución de expresiones locales |
| q05 | D | el texto pasa de órgano biológico a arreglo técnico y luego a la inferencia que habilita |
| q06 | A | la conclusión eleva inventarios de intercambio a evidencia sobre circulación histórica |
| q07 | C | ambos piden contexto; Text 2 añade que la ausencia también puede hacerse físicamente visible |
| q08 | B | Text 1 mide la función hídrica; Text 2 la conserva y amplía la evaluación al hábitat |

No se detectó una segunda clave defendible. Las cuatro opciones de cada ítem tienen razón
de error escrita. La revisión de longitud redujo la heurística “elegir la más larga” de
50 % a 12,5 % sin volver vagos los distractores.

## Hechos y fuentes

- q01: Wu et al., recuperación de la fotosíntesis en costras de líquenes rehidratadas.
  <https://doi.org/10.1371/journal.pone.0172537>
- q03: Library of Congress, imagen hiperespectral no destructiva y escritura oculta.
  <https://www.loc.gov/preservation/scientists/projects/hyperspec_imaging.html>
- q04: Smithsonian, audio, transcripción y patrones dialectales en historias orales.
  <https://americanhistory.si.edu/sites/default/files/PrimarySources.pdf>
- q05: Yang et al., arreglo de presión inspirado en la línea lateral para un robot submarino.
  <https://doi.org/10.3390/s18092912>
- q06: Biodiversity Heritage Library, listas de semillas intercambiadas por jardines y su
  valor como registro histórico.
  <https://blog.biodiversitylibrary.org/2015/03/whats-up-with-seed-catalogs-in-bhl>
- q08: US EPA, diseño de humedales de tratamiento para calidad de agua y hábitat silvestre.
  <https://www.epa.gov/wetlands/guiding-principles-constructed-treatment-wetlands-providing-water-quality-and-wildlife>

q02 es ficción original. q07 y el escenario concreto de q04 son textos originales; sus
principios generales no contienen datos numéricos ni atribuciones que el alumno deba
conocer. En los demás ítems, las fuentes respaldan hechos; estímulos, preguntas, opciones
y explicaciones fueron redactados desde cero.

## Originalidad externa

Se buscaron entre comillas ocho inicios distintivos, uno por estímulo. No apareció ninguna
coincidencia exacta. Los resultados temáticamente relacionados no reprodujeron la prosa
del examen. Esta comprobación amplía, no sustituye, la revisión editorial de fuentes ni el
guardián local.

## Límite declarado

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. Esa evidencia adicional se puede añadir al cierre del módulo,
pero no se presume en esta acta de bloque.

## Siguiente tarea

Abrir Information and Ideas q09–q15 solo después de este checkpoint. El acta completa de
`sat-set-4-m1` permanece prohibida hasta 27/27 y las auditorías de conjunto.
