# Auditoría de bloque · SAT Set 3 M1 · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto editorial del
módulo ensamblado: **APTO COMO CONTENIDO, NO PUBLICABLE COMO PRODUCTO**.

## Alcance y métricas finales

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-3/blocks/sat-set-3-m1-eoi.ts` y después se ejecutaron las
puertas sobre los 27 ítems ensamblados.

```text
ítems / metadatos       27 / 27
claves                  A7 · B7 · C7 · D6
clave más larga         18,5 %
clave más corta          7,4 %
solape alto             25,9 %
solape bajo             18,5 %
dominios                CS8 · II7 · SEC7 · EOI5
temas                   ciencia10 · historia7 · humanidades6 · literatura4
prueba ciega            23,0 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 7 módulos · 189 ítems · cero secuencias de 8+ palabras
```

## Clave única del bloque

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | C | vincula tamaño, contraste y repetición en cruces con la selección de ruta; las demás notas no cumplen el objetivo completo |
| q24 | A | compara 42 %/18 % y 43 °C/54 °C bajo iguales condiciones sin universalizar una prueba de dos piezas |
| q25 | D | contrasta medición angular y tiempo de referencia y explica cómo se complementan para longitud |
| q26 | B | el monitoreo acústico es consecuencia de baja detectabilidad visual más vocalizaciones identificables |
| q27 | C | *Nevertheless* marca el resultado contrario al riesgo que Mara anticipaba para la ambigüedad |

No se detectó una segunda clave defendible. q24 declara que sus cifras son inventadas y
formula asociación, no causalidad universal. q25 compara funciones sin afirmar que uno de
los instrumentos sustituya al otro. q26 no presenta la grabación como detección de animales
silenciosos: depende explícitamente de sus llamadas.

## Fuentes y originalidad

- q24: US EPA, reflectancia y temperatura de pavimentos.
  <https://www.epa.gov/heatislands/using-cool-pavements-reduce-heat-islands>
- q25: Smithsonian, instrumentos de *Time and Navigation*.
  <https://www.si.edu/newsdesk/factsheets/time-and-navigation>
- q26: USGS, grabadores automáticos para ranas que pasan gran parte de su vida bajo tierra.
  <https://www.usgs.gov/centers/wetland-and-aquatic-research-center/science/acoustic-monitoring-two-rare-frog-species>

q23 y q27 son escenarios originales. Se buscaron entre comillas los cinco inicios; no hubo
coincidencia exacta. La búsqueda de q25 devolvió explicaciones temáticas del sextante y la
de q26 páginas sobre la especie, pero no la redacción usada aquí. El nombre completo que
primero tenía q27 coincidía por azar con un personaje web ajeno; se sustituyó por “Mara” y
la frase final dio cero resultados.

## Límite y siguiente puerta

La revisión fue realizada por Codex con controles reproducibles, sin panel humano ni
multi-modelo independiente. El bloque y el contenido de M1 quedan APTOS. No se crea todavía
`docs/sat-auditorias/sat-set-3-m1.json`: las actas formales declaran producto publicable y
Set 3 no lo será hasta tener M2 estándar, M2 exigente y QA de navegación.
