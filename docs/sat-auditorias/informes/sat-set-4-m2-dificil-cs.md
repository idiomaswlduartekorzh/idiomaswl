# Auditoría de bloque · SAT Set 4 M2 exigente · Craft and Structure

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 19 preguntas y tres dominios.

## Alcance

Se revisaron q01–q08 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m2-dificil-cs.ts`. El bloque y su módulo
incremental permanecen fuera del catálogo público.

## Resultados reproducibles

```text
ítems / metadatos       8 / 8
claves                  A2 · B2 · C2 · D2
clave más larga          0,0 %
clave más corta         25,0 %
opción con más palabras 25,0 %
opción con menos        25,0 %
longitud de estímulo    64,7–115,7 palabras-SAT
prueba ciega            22,2 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 12 módulos · 305 ítems · cero secuencias de 8+ palabras
```

La primera medición dio 50 % a la regla “elegir la más larga”. Se compactaron las claves
de q05–q08 sin cambiar evidencia, respuesta ni dificultad. La repetición dejó esa
heurística en 0 % y bajó la media ciega de 24,3 % a 22,2 %.

El validador completo rechaza correctamente el candidato por tener 8 en vez de 27 ítems.
Ese umbral no se modifica y no se emite acta de módulo parcial.

## Clave única y distractores

| ID | Clave | Decisión |
| --- | :---: | --- |
| q01 | B | las hifas permiten recoger fósforo más allá del suelo agotado junto a la raíz |
| q02 | D | la segunda pregunta hace surgir un detalle que la primera no obtuvo |
| q03 | A | el ajuste controla el ritmo de impulsos, no autorización, fabricante ni apariencia |
| q04 | C | introduce un proxy, lo contrasta con otros y calibra la confianza del acuerdo |
| q05 | D | delimita lo que la secuencia tinta/pliegue apoya y lo que no puede atribuir |
| q06 | B | presenta la respuesta editorial a dos matices de traducción |
| q07 | C | conserva cortes seriales fuera del texto principal y prioriza la revisión continua |
| q08 | A | contrasta utilidad del proxy de clorofila con interferencias ópticas costeras |

No se detectó una segunda clave defendible. Cada distractor contradice una relación,
alcance, cronología o función expresada en el texto.

## Hechos y fuentes

- q01: USDA ARS, hifas externas de micorriza que amplían el acceso al fósforo más allá de
  la zona inmediata de la raíz.
  <https://www.ars.usda.gov/ARSUserFiles/37108/PDF/2012/2012-Hortscience-47-5-660-671.pdf>
- q03: Royal Museums Greenwich, reloj maestro Shepherd e impulsos eléctricos hacia
  relojes dependientes y señales públicas.
  <https://www.rmg.co.uk/royal-observatory/attractions/shepherd-gate-clock>
- q04: NOAA NCEI, anillos de árbol y sedimentos lacustres como archivos proxy distintos.
  <https://www.ncei.noaa.gov/products/paleoclimatology>
- q08: NASA Ocean Color, CDOM y sedimento suspendido como componentes ópticamente
  activos que complican algoritmos costeros.
  <https://oceancolor.gsfc.nasa.gov/docs/technical/simbios99tm.pdf>

q02 y q05–q07 son escenarios o argumentos originales. En q04 la correspondencia entre
los indicadores es hipotética y no se atribuye a un estudio real. Las fuentes sustentan
hechos, no prosa adaptada.

## Originalidad externa y límite

Se buscaron entre comillas los ocho inicios. No apareció ninguna coincidencia exacta; los
resultados sobre suelos, cartas y oceanografía fueron temáticos o ajenos a la redacción.

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. Information and Ideas q09–q15 es el siguiente bloque; M2
exigente no será contenido apto hasta 27/27.
