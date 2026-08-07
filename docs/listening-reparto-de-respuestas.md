# Reparto de la respuesta correcta entre las tres opciones

**Fecha:** 6 de agosto de 2026
**Alcance:** las 24 series de escucha del área de práctica (17 nuevas + 7 ya publicadas).

## Qué se encontró

Al medir la posición de la respuesta correcta en las 340 preguntas por serie —no episodio a
episodio, sino sobre el conjunto— apareció esto en las series **que ya estaban en producción**:

| Serie | Idea general | Detalles | Consolidación |
|---|---|---|---|
| inglés A1 | 20 / 0 / 0 | 60 / 0 / 0 | 20 / 0 / 0 |
| alemán A1 | 20 / 0 / 0 | 60 / 0 / 0 | 20 / 0 / 0 |
| alemán A2 | 20 / 0 / 0 | 60 / 0 / 0 | 20 / 0 / 0 |
| alemán B1 | 12 / 0 / 0 | 36 / 0 / 0 | 12 / 0 / 0 |
| italiano A1 | 20 / 0 / 0 | 60 / 0 / 0 | 20 / 0 / 0 |
| inglés A2 | 6 / 6 / 8 | 8 / 4 / 8 | 20 / 0 / 0 |
| inglés B1 | 10 / 6 / 4 | 13 / 13 / 14 | 20 / 0 / 0 |

En cinco series completas la respuesta correcta era **siempre la opción A**. Pulsando la primera
opción en cada pregunta se terminaba el ejercicio con el 100 % sin escuchar nada, sin leer el
guion y sin saber una palabra del idioma.

Las series nuevas no llegaban a ese extremo, pero varias se acercaban: francés A1 tenía 17 de 20
ideas generales en la A y la C no era correcta ni una sola vez; francés A2 tenía 16 de 20
consolidaciones en la B.

Nadie lo vio en las revisiones lingüísticas —tres rondas, con hablantes nativos— porque **el
defecto no existe dentro de un episodio**. Cada pregunta, mirada sola, está bien escrita. El
sesgo solo aparece al contar las veinte.

## Qué se hizo

`src/data/practica/listening-shuffle.ts` reparte las opciones antes de pintarlas:

- Se aplica **en el runner**, no en los ficheros, así que cubre las 24 series de una vez y también
  las que se escriban después. No cambia ni una palabra de lo que escribieron los redactores:
  `label`, `correct` y `feedback` viajan pegados a su opción.
- El reparto va **por bloques de tres preguntas del mismo tipo**, y dentro de cada bloque cada
  letra sale exactamente una vez. Barajar al azar no bastaba: con veinte episodios dejaba colas
  de hasta el 70 % en una sola letra.
- Es **determinista**, derivado del id del ejercicio. El servidor y el navegador pintan lo mismo
  (nada de errores de hidratación) y quien vuelve al día siguiente encuentra el ejercicio igual.

Resultado en las 24 series: ninguna letra pasa del 35 %.

## Qué lo impide en el futuro

`scripts/validate-listening-series.mjs` mide el reparto **sobre la salida del runner**, no sobre
el orden del fichero, y falla el build si en algún bloque una letra supera el 45 % o si alguna
letra no es correcta nunca. Cubre también las siete series publicadas, que no pasan por el
adaptador y que el validador no miraba hasta ahora.

Comprobado en negativo: al desactivar el reparto, el validador falla con código 1 y nombra las
series y los bloques afectados.

## Lo que NO es este problema

Antes se dijo que había episodios «que se aciertan sin escuchar» porque una palabra clave de la
fase 1 contenía la respuesta de la consolidación. Revisado el recorrido, eso no se sostiene: la
consolidación es la fase 6 y llega **después** de la fase 4 («Descubrir el texto») y la fase 5
(«Escucha guiada»), que muestran la transcripción completa. El estudiante ya ha leído la
respuesta en el guion, coincida o no con la ficha de vocabulario. El solapamiento entre palabra
clave y respuesta existe —74 de 340 consolidaciones— pero es una decisión de estilo discutible,
no un agujero: la fase 6 nunca fue una prueba de escucha, sino de retención.
