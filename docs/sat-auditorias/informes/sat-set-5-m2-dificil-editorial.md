# Auditoría editorial · SAT Set 5 M2 exigente

Fecha: 25 de agosto de 2026. Veredicto editorial: **APTO CON LÍMITES DECLARADOS**.
Veredicto de producto: **NO PUBLICABLE**; faltan composición adaptativa y QA del Set 5
completo.

## Alcance y evidencia reproducible

Se revisaron los 27 ítems de
`src/data/mocks/sat/drafts/set-5/sat-set-5-m2-dificil.ts` sobre la forma identificada por
las huellas del acta. El candidato permanece fuera del catálogo ejecutable.

```text
ítems / metadatos       27 / 27
claves                  A7 · B6 · C7 · D7
dificultad prevista     fácil 5 · media 9 · difícil 13 · media 2,30
materias                ciencia 10 · historia 7 · humanidades 6 · literatura 4
clave más larga         14,8 %
clave más corta         14,8 %
solape alto / bajo      22,2 % / 18,5 %
prueba ciega            24,3 % de media · techo 35 %
ítems ≥75 % heurísticas ninguno
originalidad local      PASS · 15 módulos · 405 ítems · cero secuencias de 8+ palabras
```

El primer pase completo rechazó q16, q18 y q19 porque el montaje repetía a ambos lados
del hueco una palabra incluida en cada opción; también rechazó q16 y q20 por quedar
ligeramente debajo del mínimo de longitud. Se corrigieron los cinco defectos y el segundo
pase superó las ocho puertas sin reducir umbrales. La revisión editorial también eliminó
una doble respuesta defendible en q27 y sustituyó la premisa prevista de q24: la fuente
directa no sostenía una reducción de permeabilidad, así que el ítem usa el trade-off
realmente reportado entre hidrofobicidad, elongación y resistencia.

## Clave única

| ID | Clave | Decisión editorial |
| --- | :---: | --- |
| q01 | D | *matched* significa correspondencia visual entre pelaje y fondo |
| q02 | A | *qualified* limita una afirmación absoluta mediante condiciones concretas |
| q03 | C | grano y muescas coincidentes confirman con evidencia independiente el importe |
| q04 | B | la segunda oración define manipulación y superficies del experimento de adhesión |
| q05 | D | las huellas sostienen un orden cronológico, pero no la causa de reutilización |
| q06 | C | el signo conserva una atribución posible y comunica su incertidumbre |
| q07 | A | Text 2 admite una reconstrucción separada, rotulada y basada en evidencia |
| q08 | B | Text 1 destaca el proxy regional y Text 2 limita su conversión a productividad |
| q09 | B | registros de comportamiento y guía del artista permiten evaluar una emulación |
| q10 | D | mucina, mezcla y madejas forman rápidamente una red que atrapa agua |
| q11 | A | la nota ordena borrar la primera digitación y declara el motivo técnico |
| q12 | C | tipos, páginas, título y fecha prueban físicamente una edición no catalogada |
| q13 | B | 94 % es el máximo; 7,8 s supera exactamente los 5,9 s de la canaleta ancha |
| q14 | D | flecha, caret y atribución posterior incorporan la frase al diálogo de Toma |
| q15 | C | 24 frente a 35 visitas apoya que la señal eléctrica complementa el color |
| q16 | C | coma tras una subordinada concesiva inicial |
| q17 | B | punto y coma entre independientes y coma después de *however* |
| q18 | D | guiones largos emparejados delimitan el inciso entre sujeto y verbo |
| q19 | A | dos puntos introducen una lista después de una oración completa |
| q20 | C | *are* concuerda con el sujeto plural pospuesto *organelles* |
| q21 | A | *supporting* conserva el paralelismo con *humidifying* y *aligning* |
| q22 | D | pasado perfecto para registros completados antes de una publicación pasada |
| q23 | A | compara 6 con 2 resultados irrelevantes y 29 con 41 terminaciones sin generalizar |
| q24 | C | combina mayor hidrofobicidad y elongación con menor resistencia a la tracción |
| q25 | D | compara función compartida y distingue superposición óptica de enlace mecánico |
| q26 | B | *However* contrapone un flujo incontrolable con una inversión de adhesión ajustable |
| q27 | A | *Nevertheless* contrapone puntuación estable con pausas alteradas por nuevos cortes |

La resolución produjo exactamente `DACBDCABBDACBDCCBDACADACDBA`, la secuencia reservada
antes de redactar. No se detectó una segunda clave defendible. Cada distractor tiene una
razón de error específica y toda la evidencia necesaria para contestar está dentro del ítem.

## Equidad, lengua y dificultad

- Las referencias científicas, históricas y de conservación funcionan como pasajes; la
  clave no exige conocer previamente especies, instrumentos, museos o períodos.
- q07 expone dos políticas archivísticas defendibles y localiza el desacuerdo. q08 y q15
  preservan límites de proxy y contribución multimodal sin presentar una señal como causa
  o sentido exclusivo.
- q13 y q23 declaran datos pedagógicos sintéticos. Las personas, obras y archivos
  ficticios se identifican como tales en metadatos y no se atribuyen a fuentes reales.
- No hay inferencias sobre capacidad a partir de origen, género, discapacidad, clase o
  nacionalidad. El registro es inglés estadounidense y cada ítem SEC mide una sola regla.
- La curva 5/9/13 eleva inferencia y densidad frente a M1 y M2 estándar. Es una estimación
  editorial, no calibración psicométrica; requiere datos de uso real.

## Hechos y originalidad

Se abrieron estudios primarios o fuentes institucionales para liebre de raquetas, rémora,
moneda sobreacuñada, SIF, slime de hagfish, fragmentos de encuadernación, campos eléctricos
florales, celulosa bacteriana con cera, camera lucida, pantógrafo y byssus de mejillones.
La comprobación de q24 evitó convertir una hipótesis de la matriz en un hecho no respaldado.

Además del guardián local, se buscaron entre comillas frases distintivas de los cuatro
dominios. No apareció ninguna coincidencia exacta; los resultados relacionados confirmaron
hechos, no prosa. La búsqueda fue representativa y no equivale a rastreo exhaustivo web.

## Límite declarado y siguiente puerta

La revisión fue realizada por Codex con controles reproducibles. No hubo panel humano ni
multi-modelo independiente. El contenido de M2 exigente es apto, pero el Set 5 no puede
publicarse hasta componer ambas rutas adaptativas y superar QA de producto desde una base
actualizada de `main`.
