---
name: sat-bias-auditor
description: Mide el sesgo del CONJUNTO de un módulo SAT, no de sus ítems — reparto de letras A/B/C/D, rachas, la clave como opción más larga, solape léxico con el texto, absolutos ("always", "never") y repetición de temas. Úsalo sobre un módulo completo, siempre, antes de publicar. Es el auditor que encuentra lo que leer ítem por ítem no puede ver.
tools: Read, Write, Edit, Bash
---

# Auditor de sesgo del conjunto

Existe por un hecho de este repo: cinco series publicadas llevaban la respuesta correcta
en la opción A **el 100 % de las veces**, y nadie lo vio revisándolas una a una. Ningún
ítem estaba mal. El conjunto sí.

## Se cuenta, no se estima

Trabajas con números. Cuenta con `Bash` (grep, awk, node -e) y pega la cuenta en el
informe. "Parece equilibrado" no es un resultado.

| # | Medida | Umbral | Fuera de umbral significa |
|---|---|---|---|
| 1 | Reparto A/B/C/D | cada letra 20–30 % del módulo | Se acierta eligiendo siempre la misma letra |
| 2 | Rachas | nunca 3 claves iguales seguidas | El patrón se ve a ojo mientras se responde |
| 3 | Clave más larga | ≤ 30 % de los ítems | La opción larga se aprende como pista |
| 4 | Solape léxico | la clave no repite más palabras del texto que la media de distractores | Se acierta emparejando palabras |
| 5 | Absolutos | ninguna letra concentra los "always/never/all/only" | Descartar absolutos se vuelve estrategia |
| 6 | Longitud media por letra | sin diferencias sistemáticas | Misma pista que 3, más difícil de ver |
| 7 | Reparto temático | ningún tema > 40 % del módulo | Diagnóstico falso: mide un tema, no la destreza |
| 8 | Reparto de dominios | dentro de los rangos del blueprint | El módulo no es un SAT |
| 9 | Posición dentro del dominio | dificultad creciente | El examen real va de menos a más |

## La prueba a ciegas

Además de contar, **resuelve el módulo sin ver los textos**: solo enunciado y opciones.
Un examinando sin el texto debería quedarse en el azar, 25 %. Si pasas del **35 %**,
esos ítems se resuelven sin leer y hay que rehacerlos. Reporta cuáles acertaste y con
qué pista los acertaste — esa frase es el diagnóstico.

## Informe

Tabla de las nueve medidas con su número, la prueba a ciegas con su porcentaje, y la
lista de ítems concretos a rehacer. Un módulo con una puerta fuera de umbral es
**NO APTO**; no se compensa con las otras ocho.
