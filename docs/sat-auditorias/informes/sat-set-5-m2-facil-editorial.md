# Auditoría editorial · SAT Set 5 M2 estándar

Fecha: 25 de agosto de 2026. Veredicto editorial: **APTO CON LÍMITES DECLARADOS**.
Veredicto de producto: **NO PUBLICABLE**; faltan M2 exigente, composición adaptativa y
QA del set completo.

## Alcance y evidencia reproducible

Se revisaron los 27 ítems de
`src/data/mocks/sat/drafts/set-5/sat-set-5-m2-facil.ts` sobre la forma identificada por
las huellas del acta. El candidato permanece fuera del catálogo ejecutable.

```text
ítems / metadatos       27 / 27
claves                  A7 · B6 · C7 · D7
dificultad prevista     fácil 10 · media 12 · difícil 5 · media 1,81
materias                ciencia 10 · historia 7 · humanidades 6 · literatura 4
clave más larga         11,1 %
clave más corta         14,8 %
solape alto / bajo      11,1 % / 25,9 %
prueba ciega            24,3 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 14 módulos · 378 ítems · cero secuencias de 8+ palabras
```

El primer pase completo rechazó q24 por exceso de solape léxico y q17–q19 por quedar
debajo del mínimo de longitud. Se parafraseó q24 y se añadió contexto funcional a los
otros tres; el segundo pase superó las ocho puertas sin reducir umbrales. Antes, la
auditoría incremental había detectado y eliminado una pista de longitud en CS y una
duplicación `however, however` al montar q16 con sus opciones.

## Clave única

| ID | Clave | Decisión editorial |
| --- | :---: | --- |
| q01 | B | *maintains* significa conservar disponible el aire que el pez repone |
| q02 | D | preservar las marcas es mantenerlas sin cambio, no exhibirlas ni copiarlas |
| q03 | A | *impressions* son huellas físicas dejadas por presión sobre arcilla |
| q04 | C | la segunda oración ejemplifica la técnica cuyo efecto explican las siguientes |
| q05 | B | presenta una característica, la comparación controlada y una conclusión limitada |
| q06 | A | comparar ediciones muestra un uso histórico posterior de la codificación original |
| q07 | D | ambas voces exigen identificar reparaciones, pero discrepan sobre el contraste fuerte |
| q08 | C | un sistema abierto movido por viento es compatible con el hallazgo térmico en uno cerrado |
| q09 | D | el número estable identifica el objeto y enlaza sus registros a través del tiempo |
| q10 | B | los lóbulos desvían partículas de los poros y no dependen de un tamiz simple |
| q11 | C | la flecha oculta indica a un reparador futuro por dónde liberar la unión |
| q12 | A | dos direcciones, fechas y fallos prueban dos intentos sucesivos de reenvío |
| q13 | D | 51 g frente a 18 g compara directamente los extremos de profundidad controlados |
| q14 | C | cambia el orden de imágenes pero conserva deliberadamente el final de cada grupo |
| q15 | A | la banda sola sostiene orientación que las estrellas brillantes aisladas no sostienen |
| q16 | C | punto entre independientes y coma después de *However* |
| q17 | A | coma tras subordinada temporal inicial |
| q18 | D | guiones largos emparejados delimitan la aposición no esencial |
| q19 | B | dos puntos introducen la lista después de una oración completa |
| q20 | C | *records* concuerda con el núcleo singular *series* |
| q21 | B | *linking* conserva paralelismo con *photographing* y *recording* |
| q22 | D | pasado perfecto para catalogación completada antes de una exhibición pasada |
| q23 | A | compara 25/30 con 16/30 y conserva el límite de dos minutos |
| q24 | B | conserva fuente, preparación, 94 %, aceite usado y condiciones optimizadas |
| q25 | D | compara codificación física y distingue salida textil de musical sin afirmar influencia |
| q26 | C | *Therefore* introduce una conclusión limitada derivada del contraste experimental |
| q27 | A | *However* contrapone el marco verbal repetido con la pérdida material progresiva |

La resolución produjo exactamente `BDACBADCDBCADCACADBCBDABDCA`, la secuencia reservada
antes de redactar. No se detectó una segunda clave defendible. Cada distractor tiene una
razón de error específica y toda la evidencia requerida está dentro del ítem.

## Equidad, lengua y dificultad

- Los nombres, instituciones y especies aportan contexto; ninguna clave exige haberlos
  conocido antes de leer.
- q07 presenta dos estrategias legítimas de conservación sin convertir una preferencia
  estética en falta de rigor. q08 limita cada mecanismo de ventilación a la arquitectura
  y condiciones descritas.
- q12 declara su etiqueta postal como facsímil pedagógica; q13 y q23 declaran sus datos
  como originales. No se presentan cifras inventadas como hallazgos históricos o
  científicos reales.
- No hay inferencias sobre capacidad a partir de origen, género, discapacidad, clase o
  nacionalidad. El registro es inglés estadounidense y los siete ítems SEC miden una
  sola regla comprobable cada uno.
- La curva 10/12/5 es una estimación editorial deliberadamente más accesible que M1. No
  es calibración psicométrica y deberá revisarse con datos de uso real.

## Hechos y originalidad

Se abrieron artículos primarios o fuentes institucionales para gobios, sellos de arcilla,
vuelo de lechuza, mapas Sanborn, ventilación de termiteros, números de acceso, filtración
de mantas, Vía Láctea y escarabajos, catalizadores de cáscara, tarjetas Jacquard, cajas
musicales y asentamiento de ostras. La ficción, facsímil, tabla de musgo y cifras de
transcripción se declararon originales.

Además del guardián local, se buscaron entre comillas frases distintivas de CS, II y EOI.
No apareció ninguna coincidencia exacta; los resultados relacionados confirmaron hechos,
no prosa. La búsqueda fue representativa y no equivale a rastreo exhaustivo de toda la web.

## Límite declarado y siguiente puerta

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. El contenido de M2 estándar es apto, pero el Set 5 no puede
publicarse hasta escribir y auditar M2 exigente, componer las rutas adaptativas y superar
QA de producto desde una base actualizada de `main`.
