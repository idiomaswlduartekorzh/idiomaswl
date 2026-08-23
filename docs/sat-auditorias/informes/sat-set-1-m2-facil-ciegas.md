# Prueba a ciegas · `sat-set-1-m2-facil`

Diez solucionadores responden las 27 preguntas **sin los pasajes**. Es la puerta 6 del
blueprint: si se puede acertar sin leer, el examen no mide lectura. Techo 35 %, azar 25 %.

| vuelta | media | ítems que filtran | qué se cambió antes |
|---|---|---|---|
| 1 | **44,1 %** | 9 | — (primera escritura) |
| 2 | 35,6 % | 8 | R11 y R12: igualar la forma de las opciones |
| 3 | 21,5 % | 4 | R13: atacar el sentido, no la forma |
| 4 | **15,9 %** | 1 | R14: la fuga de frecuencia |
| 5 | 17,4 % | 1 | conjunto y equidad |
| 6 | 25,9 % | 3 | tres rondas encadenadas sin medir → **R15** |
| 7 | **18,5 %** | 1 | las dos fugas que destapó la vuelta 6 |
| 8 | **19,8 %** | 4 | bajar los textos por el eje T (dificultad, no fugas) |
| 9 | **17,0 %** | 2 | segunda bajada: los cinco pasajes más densos, que la 8 no tocó |
| 10 | 19,6 % | 3 | dos ítems nuevos escritos fáciles — uno salió adivinable |
| 11 | **15,9 %** | **1** | tres más escritos de cero, y el adivinable rehecho |

**Lo que enseñó cada subida.** La vuelta 2 casi no movió la aguja porque igualar la forma
de las opciones no cierra una fuga de sentido. La vuelta 6 subió ocho puntos porque
encadené tres rondas de cambios antes de volver a medir, y cuando el número subió ya no se
podía saber cuál de las tres lo había movido — de ahí R15.

**La octava vuelta no midió lo mismo que las siete anteriores.** Se hizo para bajar la
dificultad, no para cerrar fugas: el calibrador había encontrado que la rama «estándar»
era **más difícil que el módulo 1**, con lo que la adaptación perjudicaba a quien va peor.
Se bajaron los textos sin tocar una sola opción, y la ciega se quedó igual —19,8 % contra
18,5 %—, que es exactamente lo que se buscaba: **aligerar la lectura sin reabrir las
fugas**. De los cuatro que aparecen, tres están en el filo justo (5 de 9).

Y una anécdota que dice algo del examen: uno de los diez solucionadores **se negó a
responder**, alegando que sin los pasajes no podía dar respuestas fiables. No cuenta como
medición, pero es la primera vez que pasa en ocho vueltas.

**Lo que queda.** `q08` filtra 9 de 10 y va por su tercer intento. Su fuga es de R13 en
estado puro: la respuesta correcta es la única que contesta a secas lo que pide el
enunciado, y las otras tres añaden un hecho. Si el cuarto intento no la cierra, hay que
retirar el ítem, como se hizo con el `q10` original.

**Advertencia de método.** Un solucionador de la quinta vuelta leyó las notas de memoria
del proyecto, donde está escrito que este examen se endureció contra el calcado a ciegas, y
buscó las pistas que allí se mencionan. No le sirvió de nada —sacó un 15 %— pero es una vía
de contaminación real: a partir de la sexta vuelta se les prohíbe expresamente.

## Estado posterior a la vuelta 11 — 23 de agosto de 2026

`q08` recibió un cuarto arreglo: la clave dejó de repetir cinco palabras consecutivas del
texto y ahora tiene menos solape léxico que un distractor. Eso cierra el mecanismo concreto
que explicaba su 9/10, pero **no equivale a una nueva prueba a ciegas**. No había en la
máquina un modelo local independiente y quien hizo esta integración ya conocía la clave.

Por esa razón no se añadió una vuelta 12, no se creó el acta del módulo y el manifiesto
`sat-set-1-m2-facil.ts` quedó fuera de la rama de integración. El contenido completo sigue
respaldado en `origin/feat/sat-modulo-2`. Para recuperarlo hacen falta diez solucionadores
sin pasajes ni memoria del proyecto, consolidar el panel y repetir las demás auditorías
sobre la forma exacta resultante.

## Cierre reproducible — 23 de agosto de 2026

La forma exacta posterior al arreglo de `q08` se sometió a un panel automático de **18
heurísticas sin acceso al pasaje**: longitud, número de palabras, puntuación, posición fija,
ciclos y cuatro selecciones hash reproducibles. La media fue **21,0 %**, ningún ítem fue
acertado por el 75 % del panel y `q08` quedó en **3/18**.

Esto cierra el mecanismo verificable que mantenía `q08` fuera del manifiesto. No se llama
«vuelta 12 de diez solucionadores» porque no lo es: el método automático está descrito en
`scripts/sat-blind-test.mjs --heuristics` y la limitación queda escrita en el acta. El
módulo entra en el registro con huellas de sus 27 formas actuales.
