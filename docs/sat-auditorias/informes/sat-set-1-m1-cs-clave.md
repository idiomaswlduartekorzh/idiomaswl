# Auditoría de clave — `sat-set-1-m1-cs` (q01–q08, dominio Craft and Structure)

- **Archivo auditado:** `src/data/mocks/sat/blocks/sat-set-1-m1-cs.ts`
- **Auditor:** auditor de clave (pasada a ciegas)
- **Fecha:** 18 ago 2026
- **Método:** se leyó `stimulus`, `text` y `options` de los ocho ítems y se fijó una
  respuesta propia con su cita **antes** de mirar `answer` y `meta[].razones`. Después se
  comparó. El auditor no ha tocado el `.ts`.

---

## 1. Tabla de veredictos

| id | mi respuesta (a ciegas) | clave declarada | veredicto | qué hay que arreglar |
|---|---|---|---|---|
| q01 | **B** — Sustains | B (1) | **APTO** | Nada. `D — Tolerates` es el distractor más flojo; su razón lo describe como «rebajar el verbo», cuando el camino real es la acepción literaria *bear / endure* de *support*. Retoque de la razón, no del ítem. |
| q02 | **D** — Traveled | D (3) | **APTO** | Nada bloqueante. Observación: tres opciones caen también por sintaxis (*lingered farther*, *outweighed farther* son agramaticales en el hueco), así que el ítem se puede resolver sin leer. Es dificultad 1 y el plan lo pide así («la estructura de la frase debe descartar dos opciones»), pero el que descarta dos es el enunciado, no el contexto. |
| q03 | **A** — Conditional | A (0) | **APTO** | Nada. Señalar en la razón de `D — Unanimous` que la proposición «los tres coincidían» **es verdadera en el texto**: el distractor no es falso como hecho, es falso como glosa de *qualified*. Conviene que la razón lo diga con esas palabras. |
| q04 | **C** — Restraint | C (2) | **DOS CLAVES** | `B — Efficiency` no queda excluida por ninguna línea del texto. Argumento completo en §3. O el texto excluye *efficiency* con una frase que se pueda señalar, o *efficiency* sale de las opciones. |
| q05 | **A** — marca el punto en que la planificación deja de servir | A (0) | **APTO** | Nada bloqueante. `B — explains why she set out so early` es el distractor más delgado del bloque: no tiene anclaje en la oración señalada. Vive, pero apenas. |
| q06 | **B** — patrón inesperado → causa → prueba | B (1) | **APTO** | Nada. El aviso del redactor sobre la opción A se resuelve a favor del redactor (§4). |
| q07 | **D** — acepta el reto y limita dónde aplica | D (3) | **APTO** | Nada. La operación «conceder y acotar» está literal en el texto (§4). |
| q08 | **C** — acepta el patrón, lo atribuye a un efecto colateral | C (2) | **APTO** | Nada. `B` contiene una cláusula verdadera («traffic noise also raises how loudly birds sing»), pero el verbo rector («By agreeing with it») es falso: es media verdad, no segunda clave. |

**Coincidencia con la clave: 8 de 8.** Ninguna **CLAVE EN DISPUTA**.

---

## 2. Recuento

| Categoría | Nº |
|---|---|
| **APTO** | **7** (q01, q02, q03, q05, q06, q07, q08) |
| **DOS CLAVES** | **1** (q04) |
| **CLAVE EN DISPUTA** | **0** |
| Ítems con **distractor muerto** | **0** |
| Distractores auditados | 24 (8 × 3) |
| Distractores con razón de relleno | 0 |
| Distractores señalados como **flojos pero vivos** | 3 (q01 D, q05 B, q06 C) |
| Distractores con **camino repetido** | 2 (q04 A y q04 B, ver §3) |

---

## 3. El único ítem que vuelve: q04 (*economy*)

Mi respuesta a ciegas fue **C — Restraint**, la misma que la clave, y sigo pensando que
*restraint* es la mejor opción. El problema no es cuál gana: es que **`B — Efficiency` no
pierde por nada que se pueda señalar con el dedo**.

Lo que el texto sí hace:

- Mata `A — Swiftness` con todas las letras: «This was not a matter of working faster».
- Mata `D — Affordability`: no se menciona dinero en ninguna parte.

Lo que el texto **no** hace es matar `B`. La frase que debía hacerlo mata a `A`. Y la
única prueba contra `B` —los cuatro meses de trabajo— solo funciona si se lee *economy*
como propiedad del **proceso**. Pero el enunciado dice «the economy of Hanne Lindqvist's
late woodcuts»: es propiedad de **las estampas**, y como propiedad de las estampas,
«pocas líneas y aun así la escena se lee al instante» es la definición de manual de
*efficiency of means*. La última frase, «She would not state what the eye could be trusted
to supply», también admite lectura de eficiencia: no gastes marcas donde el ojo las pone.

Prueba de sustitución, que es lo que mide un words-in-context:

- «Critics who praise the **restraint** of her late woodcuts often mistake what they are
  praising» → coherente, y la última frase encaja como un guante.
- «Critics who praise the **efficiency** of her late woodcuts often mistake what they are
  praising» → **también coherente**: lo que confunden es eficiencia de la imagen con
  eficiencia del trabajo, que es justo lo que el párrafo desmiente.

El defecto es doble, y las dos mitades se contradicen entre sí, que es lo que lo delata:

1. Si `B` se lee como *rapidez de ejecución*, **cae por el mismo camino que `A`** y el
   ítem tiene dos distractores que son uno solo (rubro «¿fallan por caminos distintos?»).
2. Si `B` se lee como *eficiencia de medios*, **es una segunda clave defendible**.

El plan (`docs/sat-planes/sat-set-1-m1.md`, fila 4) pedía «dos opciones que son sinónimos
parciales entre sí; solo el matiz de la frase decide». El par se entregó; el matiz que
decide, no. La propia razón declarada lo admite —«el distractor más peligroso»— y lo
excluye por un criterio (rendimiento del trabajo) que el sintagma del enunciado no obliga
a aplicar. **Devuelto al redactor.** Que conteste él si el texto lo sostiene; yo no lo veo.

---

## 4. Los dos avisos del redactor

**q06 — «la opción A describe con exactitud las dos últimas oraciones».** Cierto, y es
distractor legítimo, no segunda clave. Tres de las cinco oraciones del texto (el patrón de
las plántulas, el descarte de la fruta a la deriva, la hipótesis de los peces) no son ni
método de campo ni resultado, de modo que A es **verdadera de un fragmento y falsa del
conjunto**, y el enunciado pregunta por el conjunto («overall structure»). Además `B`
subsume a `A`: «shows how that cause was tested» ya incluye redes, estómagos y siembra. Con
una opción que contiene a la otra y un enunciado que pide el todo, no hay empate posible.
Es el trampa-de-alcance canónico del SAT. **Aval al redactor.**

**q07 — «conceder y acotar el alcance».** Sostenido literalmente, no por inferencia: «The
objection is a fair one» (concede) «but narrower than its authors allow: it fits the market
towns their evidence comes from, and it says little about the upland parishes» (acota
dónde vale). Las otras tres se caen contra esa misma frase: `A` («too thin to weigh»)
choca con *a fair one*; `B` («merges... into a single explanation») choca con que el texto
**reparte territorios** en vez de fundir posturas; `C` («restates the schools explanation
in stronger terms») choca con que la frase no vuelve a afirmar que las escuelas causen la
alfabetización, solo dice que en las tierras altas llegaron antes que el comercio.
**Aval al redactor.**

---

## 5. Distractores, uno a uno

Criterio aplicado a los 24: ¿la razón describe un error concreto? ¿puedo describir al
estudiante que cae? ¿es falso de verdad? ¿los tres fallan por caminos distintos?

| ítem | caminos de los tres distractores | ¿distintos? | notas |
|---|---|---|---|
| q01 | sentido físico (*props up*) · sentido de opinión (*endorses*) · sentido de soportar/tolerar (*tolerates*) | Sí | Tres acepciones distintas de *support*. `D` está vivo por la acepción literaria *bear/endure*, que la razón no nombra; sería mejor razón que «rebaja el verbo». |
| q02 | sentido transitivo (*transported*) · modismo *carry weight* (*outweighed*) · distancia confundida con duración (*lingered*) | Sí | Todos con estudiante identificable. El que traduce *carry* = llevar, el que reconoce el modismo, el que imagina la voz suspendida en el aire. |
| q03 | acepción de diccionario (*credentialed*) · adivinanza por valencia positiva (*enthusiastic*) · captura del sustantivo del contexto (*unanimous*) | Sí | `C` es el más débil semánticamente —nadie cree que *qualified* signifique *enthusiastic*— pero el camino real existe: el que no lee la palabra y rellena «their support was ___» con algo positivo. `D` es verdadero como hecho y falso como glosa: la razón debería decirlo así. |
| q04 | rapidez (*swiftness*) · rendimiento (*efficiency*) · dinero (*affordability*) | **No** | `A` y `B` comparten camino si `B` se lee como eficiencia de ejecución. Ver §3. |
| q05 | función confundida con causa (`B`) · función confundida con descripción (`C`) · error trasladado al personaje (`D`) | Sí | `C` y `D` son fuertes: el arroyo es un accidente geográfico real y la tabla de mareas está en la mano de Amara dos líneas después. `B` no tiene anclaje en la oración señalada; sobrevive solo por el estudiante que responde desde el párrafo entero. |
| q06 | alcance truncado por el final (`A`) · alcance truncado por el principio (`C`) · género mal leído, polémica inexistente (`D`) | Sí, con matiz | `A` y `C` son la misma especie de error (parte por el todo) en extremos opuestos del texto; es práctica corriente del SAT y no lo tumbo. `C` es el más flojo: el texto no «lista animales», solo nombra peces. |
| q07 | desestimar por pruebas insuficientes (`A`) · fundir las dos posturas (`B`) · reforzar la tesis inicial (`C`) | Sí | Los tres tienen anclaje literal que los hace tentadores: *narrower*, el reparto por zonas, la cláusula de las tierras altas. Bloque de distractores más limpio del set. |
| q08 | negar el hecho (`A`) · leer el texto 2 como complemento (`B`) · importar un argumento que el texto 2 no usa (`D`) | Sí | `B` contiene una cláusula verdadera; queda falsa por el verbo rector. `D` está vivo por el número «thirty years», que es lo único memorable del texto 1. |

**Ninguna razón declarada es del tipo «el estudiante se confunde».** Las 24 nombran una
operación concreta (acepción, modismo, sintagma, alcance, valencia). Es el punto más
sólido del bloque.

---

## 6. Comprobaciones de coherencia (objetivas)

- **`answer` ↔ letra marcada «Correcta» en `meta[].razones`:** cuadra en los 8 ítems
  (q01 B, q02 D, q03 A, q04 C, q05 A, q06 B, q07 D, q08 C).
- **Reparto de letras del bloque:** A×2, B×2, C×2, D×2. Coincide con el plan y con el
  comentario de cabecera del archivo. Al devolver q04, **no se debe mover la letra**: la
  clave sigue siendo C y lo que se toca es el distractor B o el texto.
- **`id` de `items` ↔ `id` de `meta`:** mismo orden, sin huecos.
- **Clave = opción más larga:** 2 de 8 (q05 y q08). La puerta 2 del plan permite ≤ 8 de 27
  en todo el módulo; este bloque consume 2 de esos 8, proporción normal para 8 ítems.
- **Longitud de textos (caracteres ÷ 6, rango 25–150):** 74,0 · 69,2 · 93,2 · 89,8 · 84,2 ·
  104,7 · 135,2 · 139,5. Los ocho dentro de rango; q08 se mide sumando los dos textos, como
  pide el plan, y entra con 139,5.

*(Las tres últimas comprobaciones son de otros auditores; se dejan aquí porque salieron
gratis y porque ninguna contradice la clave.)*

---

## 7. Veredicto

**El bloque no puede pasar entero.** Siete ítems (q01, q02, q03, q05, q06, q07, q08) están
**APTO** y pueden seguir adelante tal como están. **q04 vuelve al redactor** por dos
claves: `B — Efficiency` no está excluida por ninguna frase del texto y, en la lectura que
sí la excluiría, duplica el camino de `A — Swiftness`. Los dos avisos del redactor (q06 y
q07) se resuelven **a su favor**, verificados contra el texto.
