# Auditoría de bloque · SAT Set 4 M1 · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. Veredicto editorial del
módulo ensamblado: **APTO COMO CONTENIDO, NO PUBLICABLE COMO PRODUCTO**.

## Alcance y métricas finales

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-4/blocks/sat-set-4-m1-eoi.ts` y después se ejecutaron las
ocho puertas sobre los 27 ítems ensamblados.

```text
ítems / metadatos       27 / 27
claves                  A7 · B6 · C7 · D7
clave más larga         18,5 %
clave más corta          7,4 %
solape alto             25,9 %
solape bajo             18,5 %
dominios                CS8 · II7 · SEC7 · EOI5
temas                   ciencia10 · historia7 · humanidades6 · literatura4
prueba ciega            24,7 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 10 módulos · 270 ítems · cero secuencias de 8+ palabras
```

La primera ejecución completa detectó en q23 una ventaja por solape léxico: la clave
repetía 13 palabras de las notas y el mejor distractor, 10. La clave se convirtió en una
síntesis que calcula la diferencia de 18 puntos y declara el límite temporal. Al repetir,
el solape alto bajó de 29,6 % a 25,9 % y las ocho puertas pasaron.

## Clave única del bloque

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | A | compara 76 %/58 % como ventaja de 18 puntos y no convierte una prueba inmediata en memoria duradera |
| q24 | B | mantiene enfriamiento en ambas humedades y compara correctamente 4,8 °C con 1,6 °C |
| q25 | D | distingue señal direccional discreta de un trazo continuo de movimiento en el tiempo |
| q26 | C | *Consequently* conecta poros y reparto de carga con menor absorción y mayor resistencia |
| q27 | A | *Nevertheless* marca que los lectores ordenaron los hechos pese a la preocupación previa |

No se detectó una segunda clave defendible. q23 y q24 declaran originales sus cifras y
limitan el alcance de las conclusiones. q25 compara información producida, no solo fechas.

## Fuentes y originalidad

- q23: Graven et al., uso conjunto de imágenes táctiles y audio en museos.
  <https://doi.org/10.1177/0264619619874833>
- q24: Fan, Fu y Fu, desempeño de enfriamiento radiativo bajo humedad cambiante.
  <https://doi.org/10.1016/j.applthermaleng.2019.114585>
- q25: USGS, seismoscopio de Zhang Heng y principio de registro de un seismógrafo.
  <https://www.usgs.gov/faqs/what-was-first-instrument-actually-recorded-earthquake>
- q26: *Materials Today Communications*, recubrimiento de cera en compuestos de micelio.
  <https://doi.org/10.1016/j.mtcomm.2026.115589>

q27 es ficción original. Los formatos y números de q23, así como las diferencias térmicas
de q24, son originales. Se buscaron entre comillas los cinco inicios; no hubo coincidencia
exacta. Los resultados temáticos no reprodujeron la prosa.

## Límite y siguiente puerta

La revisión fue realizada por Codex con controles reproducibles, sin panel humano ni
multi-modelo independiente. El bloque y el contenido de M1 quedan APTOS. No se crea todavía
un acta JSON publicable: Set 4 necesita M2 estándar, M2 exigente y QA de producto.
