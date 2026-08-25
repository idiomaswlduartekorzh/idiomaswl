# Auditoría de bloque · SAT Set 4 M2 exigente · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto editorial del
módulo ensamblado: **APTO COMO CONTENIDO, NO PUBLICABLE COMO PRODUCTO**.

## Alcance y métricas finales

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m2-dificil-eoi.ts` y después se
ejecutaron las ocho puertas mecánicas sobre los 27 ítems ensamblados.

```text
ítems / metadatos       27 / 27
claves                  A7 · B6 · C7 · D7
clave más larga         14,8 %
clave más corta         11,1 %
solape alto             22,2 %
solape bajo             14,8 %
dominios                CS8 · II7 · SEC7 · EOI5
temas                   ciencia10 · historia7 · humanidades6 · literatura4
prueba ciega            22,4 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 12 módulos · 324 ítems · cero secuencias de 8+ palabras
```

La primera ejecución completa encontró solape léxico excesivo entre la clave y un
distractor de q12, una curva inválida en los dos ítems de transiciones y la ausencia
esperada del acta formal. Se parafraseó dos veces la clave de q12 hasta eliminar la
señal. q26 pasó a dificultad 2 y q27 a dificultad 3, conservando los totales cerrados de
la matriz. La última ejecución no reportó defectos mecánicos; únicamente rechazó la
ausencia deliberada del acta de producto.

## Clave única del bloque

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | A | compara una fecha aproximada con un intervalo más preciso sin atribuir preferencia al público |
| q24 | C | calcula 5,1 − 3,2 = 1,9 litros por metro cuadrado y noche |
| q25 | D | combina el inicio de uso de la marca en 1820 con la presencia documentada de la hoja en 1828 |
| q26 | B | *However* introduce la menor tasa de flujo pese a la alta eliminación del ion |
| q27 | C | *Nevertheless* contrapone la revisión amplia del poema con la imagen preservada |

No se detectó una segunda clave defendible. q23 distingue precisión de preferencia; q24
mantiene magnitud y unidades; q25 expresa un intervalo, no una fecha exacta; q26 no
convierte correlación en mecanismo; q27 exige concesión, no consecuencia.

## Originalidad y límites

Los cinco escenarios y sus datos son originales y autosuficientes. Se buscaron entre
comillas los cinco inicios; no apareció ninguna coincidencia exacta. Los resultados
recuperados fueron ajenos o temáticos: catálogos de recipientes que también contienen
3,2 y 5,1 litros, referencias generales a marcas de agua y literatura sobre membranas
con remoción superior al 90 %. Ninguno reproduce la combinación de hechos, la tarea ni
la prosa de los ítems. El detector local tampoco encontró secuencias compartidas de ocho
palabras.

La revisión fue realizada por Codex con controles reproducibles, sin panel humano ni
multi-modelo independiente. El módulo queda apto como contenido dentro de `drafts`.
Componer las dos rutas adaptativas y probar el producto completo sigue siendo obligatorio
antes de crear un acta JSON o promover Set 4.
