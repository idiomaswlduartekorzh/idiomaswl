# Auditoría de bloque · SAT Set 3 M2 estándar · Standard English Conventions

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 5 preguntas.

## Alcance y resultados

Se revisaron q16–q22 en
`src/data/mocks/sat/drafts/set-3/blocks/sat-set-3-m2-facil-sec.ts`. Cada opción se montó
en su hueco antes de comparar la clave. El bloque permanece fuera del catálogo y no
autoriza un acta formal ni publicación.

```text
ítems / metadatos       7 / 7
claves                  A2 · B2 · C2 · D1
dificultad              3 fáciles · 3 medias · 1 difícil
clave más larga         0,0 %
clave más corta         0,0 %
solape alto             14,3 %
solape bajo             0,0 %
longitud de estímulo    50,5–62,3 palabras de seis caracteres
prueba ciega acumulada  23,5 % de media · techo 35 % · 22 ítems
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 8 módulos · 211 ítems · cero secuencias de 8+ palabras
```

El primer lema de q19 era un imperativo completo y permitía defender el punto y coma como
separador entre dos independientes. Se sustituyó por un eslogan nominal; además, una
búsqueda literal mostró que el primer texto ya aparecía en la web y el lema final no. La
versión auditada deja los dos puntos como única respuesta.

Al sumar los tres bloques del candidato, las claves quedan A6/B6/C5/D5; la correcta es
extremo largo único en 9,1 %, corto en 4,5 %, solape alto en 18,2 % y bajo en 13,6 %.

## Clave única y montaje

| ID | Clave | Regla y descarte |
| --- | :---: | --- |
| q16 | C | dos independientes admiten punto y coma; coma, fusión y subordinada tras punto y coma fallan |
| q17 | B | la subordinada inicial con *Although* exige coma antes de la principal |
| q18 | A | la coma cierra la aposición entre `Labanotation` y su verbo `can preserve` |
| q19 | D | la oración completa presenta con dos puntos un eslogan nominal sin verbo |
| q20 | C | `network`, no `sensors` ni `sites`, gobierna el singular `records` |
| q21 | B | solo `the textile` puede ser el objeto teñido descrito por el modificador inicial |
| q22 | A | `had already separated` sitúa la acción terminada antes de `began`; los demás tiempos no |

No se detectó una segunda clave defendible tras insertar literalmente cada alternativa.
El bloque evalúa una sola decisión por ítem: frontera, concordancia, modificador o tiempo.

## Fuentes y originalidad externa

- q17: NOAA AOML, bandas anuales de alta densidad en esqueletos coralinos.
  <https://www.aoml.noaa.gov/digital-coral-morphology/>
- q18: Library of Congress, sistemas y colecciones de notación de danza.
  <https://findingaids.loc.gov/repositories/15/resources/1039>
- q19: National Library of Medicine, historia de carteles sanitarios; campaña y lema son
  originales.
  <https://www.nlm.nih.gov/exhibition/iconographyofcontagion/index.html>
- q20: USGS, registradores de nivel y otras mediciones en humedales.
  <https://www.usgs.gov/data/water-level-and-soil-pore-water-salinity-temperature-and-conductivity-data-tidally-influenced>
- q21: Smithsonian Museum Conservation Institute, sensibilidad de colorantes naturales
  a la luz.
  <https://mci.si.edu/node/1225657>
- q22: National Archives, catálogos en tarjeta como tipo de ayuda de búsqueda.
  <https://www.archives.gov/research/catalog/lcdrg/authority-lists/finding-aid-type>

q16 y todos los nombres, fechas y flujos de trabajo no atribuidos son originales o
hipotéticos. Siete búsquedas literales sobre los estímulos finales no devolvieron
coincidencias exactas; los resultados encontrados compartían solo materia.

## Límite y siguiente tarea

Revisión de Codex con controles reproducibles, sin panel humano ni multi-modelo. Abrir
Expression of Ideas q23–q27 y después ejecutar las ocho puertas sobre 27/27.
