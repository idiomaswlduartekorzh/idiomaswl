# Auditoría de bloque · SAT Set 3 M2 exigente · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. El módulo llegó a 27/27 y
su veredicto editorial separado está en `sat-set-3-m2-dificil-editorial.md`.

## Alcance y resultados

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-3/blocks/sat-set-3-m2-dificil-eoi.ts`. El contenido sigue
fuera del catálogo y no autoriza acta formal ni publicación.

```text
ítems / metadatos       5 / 5
claves                  A1 · B1 · C2 · D1
clave más larga         20,0 %
clave más corta         40,0 %
solape alto             40,0 %
solape bajo             0,0 %
longitud de estímulo    47,7–104,2 palabras de seis caracteres
módulo completo         PASS · ocho puertas · 27 ítems
prueba ciega completa   24,3 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 9 módulos · 243 ítems · cero secuencias de 8+ palabras
```

La primera pasada superó el guardián, pero las tres síntesis q23–q25 tenían la clave como
opción más larga y q24 excedía el margen de solape. Se compactaron las tres respuestas
correctas sin retirar ninguna condición del objetivo. Tras el ajuste, el módulo completo
queda en 11,1 % para cada extremo de longitud, 22,2 % de solape alto y 7,4 % de solape
bajo.

## Clave única

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | C | aplica el principio contextual a historia del puente frente a cierre y desvío |
| q24 | A | compara separación en solución con conservación de cátodo y mantiene límites de diseño y calidad |
| q25 | D | combina límite inferior por marca y superior por inventario sin fingir fecha exacta |
| q26 | B | *For example* introduce un caso particular que demuestra la utilidad general de los índices |
| q27 | C | *Even so* contrapone la revisión extensa con la imagen deliberadamente conservada |

No se detectó una segunda clave defendible. Los distractores de síntesis omiten el
objetivo, invierten procesos o convierten límites en certezas; las transiciones restantes
marcan causalidad, semejanza u oposición incompatibles con la relación lógica.

## Fuentes y originalidad externa

- q23: W3C WAI, sustitutos textuales definidos por función y contexto.
  <https://www.w3.org/WAI/tutorials/images/>
- q24: US Department of Energy, métodos de reciclaje de baterías y madurez del reciclaje
  directo.
  <https://cleancities.energy.gov/files/u/publication_orders/publication/119/attachment/EV_Batteries_Recycling_FINAL%2012-14-22_Optimized.pdf>
- q25: Library of Congress y Founders Online, marcas de agua y procedencia como
  evidencias; el caso y sus fechas son hipotéticos.
  <https://blogs.loc.gov/law/2017/01/fabriano-paper-in-library-of-congress-collections/>

q26 y q27 son originales. Las búsquedas literales de los tres estímulos factuales finales
no devolvieron coincidencias exactas.

## Límite

Revisión de Codex con controles reproducibles, sin panel humano ni multi-modelo. El
veredicto del producto se emite por separado tras componer Set 3 y probar ambas rutas.
