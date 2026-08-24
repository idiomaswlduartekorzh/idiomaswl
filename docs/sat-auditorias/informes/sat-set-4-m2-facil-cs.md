# Auditoría de bloque · SAT Set 4 M2 estándar · Craft and Structure

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto del módulo: **NO
EMITIDO**; quedan 19 preguntas y tres dominios.

## Alcance

Se revisaron q01–q08 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m2-facil-cs.ts`. El bloque y su módulo
incremental permanecen fuera del catálogo público.

## Resultados reproducibles

```text
ítems / metadatos       8 / 8
claves                  A2 · B2 · C2 · D2
clave más larga          0,0 %
clave más corta         12,5 %
opción con más palabras 37,5 %
opción con menos        12,5 %
longitud de estímulo    71,0–114,0 palabras de seis caracteres
prueba ciega            24,3 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 11 módulos · 278 ítems · cero secuencias de 8+ palabras
```

La primera medición dio 62,5 % a la regla “elegir la más larga”. Se equilibraron q01,
q02 y q06–q08 sin cambiar claves ni agregar hechos. La repetición dejó esa heurística en
0 % y redujo la media ciega de 27,1 % a 24,3 %.

El validador completo rechaza correctamente el candidato por tener 8 en vez de 27 ítems.
Ese umbral no se modifica y no se emite acta de módulo parcial.

## Clave única y distractores

| ID | Clave | Decisión |
| --- | :---: | --- |
| q01 | A | las larvas se fijan al sustrato; no se calman, concluyen ni compensan |
| q02 | C | la mesa se aparta para Tomas; las otras acepciones describen carácter o formalidad |
| q03 | B | el objeto *more flour* fija *yielded* como producir |
| q04 | D | pasa de estructura natural a mecanismo óptico y réplica técnica |
| q05 | A | la conclusión explica por qué preservar borrador y copia permite estudiar omisiones |
| q06 | D | el caso del narrador demuestra una conexión entre programas habilitada por nuevos campos |
| q07 | C | Text 2 conserva acceso mediante facsímil y apéndice sin saturar la lectura principal |
| q08 | B | Text 1 establece presencia; Text 2 limita la inferencia sobre abundancia |

No se detectó una segunda clave defendible. Cada distractor tiene explicación específica.

## Hechos y fuentes

- q01: NOAA, baldosas para observar asentamiento y reclutamiento de coral.
  <https://repository.library.noaa.gov/view/noaa/439/noaa_439_DS2.pdf>
- q04: Ko et al., réplica antirreflectante de la nanoestructura del ojo de polilla.
  <https://doi.org/10.1039/C1SM05302G>
- q05: Climate Research Unit, borradores y copias limpias de bitácoras con omisiones.
  <https://a.storyblok.com/f/185167/x/e65753818a/cru-research-paper-17.pdf>
- q08: US Forest Service, modelos de abundancia que corrigen detección imperfecta y
  falsos positivos en grabaciones acústicas.
  <https://research.fs.usda.gov/treesearch/68049>

q02 y q07 son ficción editorial original. q03 y q06 son escenarios originales que no
atribuyen cifras ni instituciones reales. Las fuentes sustentan hechos, no prosa adaptada.

## Originalidad externa y límite

Se buscaron entre comillas los ocho inicios; no apareció ninguna coincidencia exacta. Los
resultados temáticos sobre coral, óptica, bitácoras y murciélagos no reprodujeron la prosa.

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. Information and Ideas q09–q15 es el siguiente bloque; M2
estándar no será contenido apto hasta 27/27.
