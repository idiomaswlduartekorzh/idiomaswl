# Auditoría de bloque · SAT Set 3 M2 estándar · Expression of Ideas

Fecha: 24 de agosto de 2026. Veredicto del bloque: **APTO**. El módulo llegó a 27/27 y
su veredicto editorial separado está en `sat-set-3-m2-facil-editorial.md`.

## Alcance y resultados

Se revisaron q23–q27 en
`src/data/mocks/sat/drafts/set-3/blocks/sat-set-3-m2-facil-eoi.ts`.

```text
ítems / metadatos       5 / 5
claves                  A1 · B1 · C1 · D2
clave más larga         0,0 %
clave más corta         0,0 %
solape alto             40,0 %
solape bajo             20,0 %
longitud de estímulo    58,2–105,3 palabras de seis caracteres
prueba ciega del módulo 23,7 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
```

q23 y q24 se acortaron después de la primera medición porque ambas claves eran extremos
largos únicos. q24 además se parafraseó al fallar inicialmente la puerta de solape del
módulo: la versión final repite seis palabras de contenido frente a once del distractor
más cercano al lenguaje de las notas. El bloque termina sin claves extremas de longitud.

## Clave única

| ID | Clave | Decisión |
| --- | :---: | --- |
| q23 | D | explica la función de acceso al convertir audio en texto visible para la audiencia nombrada |
| q24 | A | resume prueba, modelado y límite pendiente sin convertir el proyecto en aprobación universal |
| q25 | C | contrasta reflexión metálica y refracción con prismas, que es la meta exacta del estudiante |
| q26 | B | la fluorescencia es consecuencia esperada de activar el gen reportero con arsenito |
| q27 | D | contrapone final abierto y final resuelto; no ejemplifica, causa ni equipara |

No se detectó una segunda clave defendible. En las síntesis, cada distractor satisface una
parte de las notas, pero falla el objetivo retórico, altera un hecho o amplía el alcance.

## Fuentes y originalidad externa

- q23: Smithsonian, subtítulos y accesibilidad de medios en exposiciones.
  <https://www.si.edu/visit/accessibility>
- q24: US Department of Energy/ORNL, aislamiento de cáñamo, cámara HAM, humedad y trabajo
  futuro.
  <https://www.energy.gov/sites/default/files/2023-05/bto-peer-2023-hempitecture-ornl.pdf>
- q25: National Park Service, reflectores Lewis y lentes Fresnel.
  <https://www.nps.gov/slbe/learn/historyculture/lighthousehistory.htm>
- q26: Zhang et al., biosensor celular de arsenito con GFP.
  <https://pmc.ncbi.nlm.nih.gov/articles/PMC9488089/>

q27 es ficción original. Cinco búsquedas literales, una por estímulo, no devolvieron una
coincidencia exacta; los resultados compartían solo el tema.

## Límite

Revisión de Codex con controles reproducibles, sin panel humano ni multi-modelo. El bloque
y el contenido del módulo son APTOS, pero Set 3 sigue sin M2 exigente ni QA de producto.
