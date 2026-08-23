# Fase 13 · VEREDICTO DEL GUARDIÁN — juegos de rol de inglés A2

# NO APTO

Medido sobre el disco del **23 de agosto de 2026**, árbol en `e017df4c`. Ocho escenarios vivos
(`fase7-fichas-4-a-charge-i-did-not-make.md` está retirado y no entra en ninguna cuenta).

**No se publica por dos motivos independientes, y cualquiera de los dos basta:**

1. **Auditorías ausentes o caducadas.** El blueprint exige seis informes por escenario. La lente
   de **tensión** no se ha corrido nunca sobre este set —la última es del 19 de agosto, anterior
   a que las fichas pasaran al inglés y anterior a que existiera el escenario 4 de hoy—. Y las
   ocho fichas se han editado **después** de la última auditoría de cada lente, incluidas las seis
   editadas después del informe de conjunto. §Guardián: *un informe anterior a la última edición
   de la ficha que audita no sostiene nada*.
2. **Dos puertas de §6 fallan con la cifra delante.** La **11 (simulación)** y la **5 (carga)**.
   No son formalismos: en el escenario 7 la pareja floja **no llega al cierre** y aun así manda el
   mensaje, y en el escenario 4 el atajista cierra en **4 turnos globales** contra un suelo de 6.

---

## 0 · ¿Están todas? No.

| lente que exige el blueprint | último informe | ¿cubre el disco de hoy? |
|---|---|---|
| `habla-calibrador-nivel` ×8 | `fase13-nivel-{1..8}.md` · 22 ago 18:47–18:52 | **NO** · las 8 fichas se editaron después |
| `habla-auditor-naturalidad` ×8 | `fase11-naturalidad.md` · 22 ago 14:55 | **NO** · las 8 fichas se editaron después |
| `habla-auditor-tension` ×8 | `fase3-tension-*.md` / `fase5-tension-*.md` · **19 ago** | **NO EXISTE** para este set |
| `habla-auditor-equidad` ×8 + conjunto | `fase11-equidad.md` 14:55 · `fase12-equidad-aplicada.md` 15:46 | **NO** · las 8 fichas se editaron después |
| `habla-simulador-parejas` ×8, cinco parejas | `fase11-simulacion-{1,2,3,5,8}` 22 ago ~14:5x · `fase13-simulacion-{4,6,7}` 19:10 / 19:10 / 23:52 | **NO** · ninguna cubre su texto de hoy |
| `habla-auditor-conjunto` | `fase13-conjunto.md` · **23 ago 00:18** | **NO** · seis fichas se editaron después |

### Fechas medidas, no declaradas

Última modificación de cada ficha (`stat` + `git log -1`):

| esc | archivo | última edición | commit |
|---|---|---|---|
| 1 | `fase7-fichas-1-the-bike-in-the-parking-lot.md` | 23 ago **00:21:38** | `ad188133` |
| 2 | `fase7-fichas-2-no-appointment-until-thursday.md` | 23 ago **00:35:02** | `e017df4c` |
| 3 | `fase7-modelo-ficha-en.md` | 23 ago **00:21:49** | `ad188133` |
| 4 | `fase8-fichas-4nuevo.md` | 23 ago **00:28:43** | `a67eff15` |
| 5 | `fase7-fichas-5-late-again-on-monday.md` | 22 ago **18:58:16** | `0d285409` |
| 6 | `fase7-fichas-6-the-cousin-on-the-sofa.md` | 23 ago **00:33:00** | `e017df4c` |
| 7 | `fase7-fichas-7-two-more-people-for-the-trip.md` | 23 ago **00:21:38** | `ad188133` |
| 8 | `fase7-fichas-8-cancel-the-gym-i-am-leaving.md` | 22 ago **18:51:34** | `68a61b7f` |

**Ninguna de las 40 auditorías de esta ronda es posterior a la ficha que audita.** Las de nivel y
calcabilidad de los escenarios 5 y 8 caducan por minutos (18:32 → 18:58; 18:29 → 18:51), porque la
edición que las siguió *fue* la aplicación de sus hallazgos: caducan igual, pero lo que falta ahí es
una pasada de confirmación, no una auditoría entera. Las de los escenarios 2, 4 y 6 caducan de
verdad, porque después del informe entraron **datos y vocabulario nuevos**; la propia ficha 4 lo
escribe: *«Lo que esta pasada invalida: la calcabilidad y el nivel de este escenario»*.

### Y el conjunto se repite entero, por regla

`fase13-conjunto.md` (00:18) devolvió NO APTO con 4 graves, 4 medios y 4 menores. Verificado sobre
el disco, **once están aplicados y uno no**:

| defecto | ¿en el disco? | prueba |
|---|---|---|
| GRAVE 1 · el molde reparte su cierre | **sí** | `fase7-modelo-ficha-en.md:211-228`, cierre en `A's screen / B's screen / Together` |
| GRAVE 2 · escenario 4 al molde | **sí** | `a67eff15`, +164/−65; prosa 448→436 y 450→440 |
| GRAVE 3 · `the lease, last` → `the name on the lease` | **sí** | `00ee093a`, ficha 6 |
| GRAVE 4 · que quien manda se equivoque | **sí** | ficha 2: `…310 218 44 71, taken here by phone in March` |
| MEDIO 5 · `Nayibe` → `Aníbal` | **sí** | 0 apariciones de `Nayibe` en el molde |
| **MEDIO 6 · un solo protocolo de cierre** | **NO — rechazado por escrito** | molde: *«No se le pone el protocolo de tres cada uno: cuesta +190 palabras y no hace falta»* |
| MEDIO 7 · actos en un solo asiento (esc 2 y 7) | **sí** | `ad188133`: `how to reach you` en 2B, `hearing it from someone else` en 7B |
| MEDIO 8 · solape de vocabulario A↔B | **sí** | `e017df4c`; medido hoy: esc 2 **30 %**, esc 6 **10 %** |
| MENOR 9 · carta del esc 2 al inglés | **sí** | `ad188133` |
| MENOR 10 · `use it or don't` | **sí** | 16/16 cabeceras de exponentes |
| MENOR 11 · `moving the deal` en 1B | **sí** | 1B → `asking for more in the deal` |
| MENOR 12 · retirar `actos-cuota.mjs` | **sí** | `e31cbc5f`; el viejo se para solo |

El encargo decía «los doce están aplicados». **Son once.** MEDIO 6 está declinado con su coste, que
es una decisión legítima de autor —y no es puerta de §6—, pero no es lo mismo que aplicado.

### Dos de los seis scripts del conjunto miden un set que ya no existe

El propio `fase13-conjunto.md` abre con *«un script canónico está midiendo un set que ya no existe»*.
La trampa se volvió a armar en menos de seis horas:

- **`fase13-scripts/genero-13.mjs:22`** sigue codificando a mano `fuera: ['Nayibe','M', …]` en el
  escenario 3. El disco dice `Aníbal` desde las 00:21. Corrido hoy, el script imprime
  `decide FUERA: H 2 · M 5 → **DESEQUILIBRIO**` — que es el defecto **ya arreglado**.
- **`fase13-scripts/reparto-conjunto.mjs:44`** sigue codificando `2: { quien: 'nadie', … }`. El
  disco ya dice que el número lo apuntó el mostrador. Corrido hoy, imprime
  `el que MANDA causa el problema en 0 de los 8` — que es el GRAVE 4 **ya arreglado**.

Corregidas las dos entradas a mano, los seis repartos de §5 pasan (§12, abajo). Pero eso lo he
calculado yo sobre una salida errónea: **el informe de conjunto que hay que citar todavía no
existe**.

---

## 1 · Las doce puertas, una a una

| # | puerta | veredicto | cifra medida hoy | respaldo |
|---|---|---|---|---|
| 1 | Asimetría | **PASA** | 16/16 roles con bloque de dato oculto (2–4 entradas) | medido por el guardián sobre las 8 fichas |
| 2 | Zona de acuerdo | **PASA** | 8/8 con salida nombrada: 5 «ofrecer alternativa», 2 «intercambio condicionado», 1 «sustituto de 2.º orden» | `motor-conjunto.mjs` §7 |
| 3 | Cero español calcable | **PASA en lo mecánico · SIN RESPALDO VIGENTE** | 0/158 celdas `here` con comillas o pronombre+verbo · 0/158 filas de datos decibles · 0/566 oraciones de prosa que empiecen por I/We/My/Our · 0 líneas de español en la zona de pantalla | `here-calcable.mjs`, `prosa-decible.mjs`, verificación propia · **`fase13-calcable-{1..8}` caducados los 8** |
| 4 | Andamiaje en dos piezas | **PASA** | caja de 8 bloques, referenciada por 16/16 roles · 16/16 tablas de 6–9 filas, ≤ techo declarado · 16/16 alfabéticas · R2 16/16 · R3 1 fallo real, corregido | `tablas-16.mjs`, `caja-de-herramientas-a2.md` |
| 5 | **Carga por rol ≥ 40 %** | **FALLA** | esc 3 sól+sól **35,8 %** y esc 6 flojo+flojo **35,3 %** sin volver a medir · y **tres contadores distintos** en fase 13 | `carga-unica.mjs`, `fase13-scripts/carga-4.mjs`, `contar-palabras-{6,7}.py` |
| 6 | Complicación colocada | **PASA** | disparadores en turno global **5, 5, 6, 5, 5, 6, 3, 3** — los 8 dentro de 3–6 · dueño A 4/8, B 4/8 · 8/8 en pantalla propia | medido por el guardián · `reparto-conjunto.mjs` |
| 7 | Cierre idéntico en las dos fichas | **PASA** | 8/8 con un solo bloque `## Both screens — how it ends`, 0 copias dentro de un rol | medido por el guardián · `cierres-conjunto.mjs` |
| 8 | Nivel anclado al registro | **PASA** | **116 referencias · 116/116 slugs existen** en `src/data/grammar/ingles/` · 0 de B1 (a2 y a1) | verificación propia contra `grep "^  slug: '" src/data/grammar/ingles/` |
| 9 | Registro de cortesía explícito | **PASA** | 16/16 cabeceras con línea de registro; 2 de ellas explican que el inglés no tiene *usted* y dónde vive la distancia | medido por el guardián |
| 10 | Equidad | **SIN RESPALDO VIGENTE** | último informe 22 ago 14:55 / 15:46; las 8 fichas editadas después; GRAVE 4 exigió por escrito rehacerla sobre el esc 2 | `fase11-equidad.md`, `fase12-equidad-aplicada.md`, `fase13-conjunto.md` |
| 11 | **Simulación** | **FALLA** | esc 7: **1 de 5 parejas** llega a las 6 líneas; la floja **muere en el global 12** y cierra **1,0/6** · esc 4: flojo+flojo **1 de 8 piezas**; atajista en B cierra en **4 turnos globales** (suelo: 6) | `fase13-simulacion-7.md` §13/§15 · `fase13-simulacion-4.md` §3, §5b |
| 12 | Repartos del conjunto | **CADUCADO** | los seis pasan con los mapas corregidos a mano, pero el informe es anterior a seis de las ocho fichas | `actos-conjunto.mjs`, `reparto-conjunto.mjs`, `genero-13.mjs`, `vocab-13.mjs`, `motor-conjunto.mjs`, `cierres-conjunto.mjs` |

**Resultado: 8 pasan, 2 fallan, 2 sin respaldo. Un set que falla una puerta no se publica.**

### Las tres que más caen — miradas primero, como manda el encargo

**1 · Cero español calcable — no se coló ninguna frase modelo.** Las cuatro pruebas mecánicas dan
cero sobre 158 celdas de vocabulario, 158 filas de datos duros y 566 oraciones de prosa. Las seis
líneas en español que encontré en los archivos están todas dentro de bloques
`**Si se lee antes de tiempo** (nota de diseño, no va en pantalla)` o `**Nota de integración**`,
fuera de la zona jugable. La puerta está limpia **en lo que se puede medir con un script**; lo que
falta es la lente, que es la que ve la semántica —y los escenarios 2, 4 y 6 tienen datos y
vocabulario que ninguna lente ha visto—.

**2 · Carga por rol — el problema no es el que manda, es el molde y la pareja floja.** El contador
único de referencia (`fase11-scripts/carga-unica.mjs`, criterio bruto declarado) da hoy:

```
esc 3 SÓLIDO+SÓLIDO   64/36 → lado menor 35,8 %   NO PASA
esc 4 FLOJO+FLOJO     63/37 → lado menor 36,5 %   NO PASA
esc 6 FLOJO+FLOJO     65/35 → lado menor 35,3 %   NO PASA
esc 7 FLOJO+FLOJO     36/64 → lado menor 35,6 %   NO PASA
                      12 de 16 parejas parejas pasan · peor caso 35,3 %
```

De los cuatro, **dos están resueltos y medidos**: esc 4 con `fase13-scripts/carga-4.mjs` da
**44,5 %** y **42,7 %**; esc 7 con `fase13-scripts/contar-palabras-7.py` da **45 %** y **47 %**.
Los otros dos **no**:

- **esc 3** — el arreglo (GRAVE 1, cierre repartido) está en el disco desde las 00:21, y **no se ha
  vuelto a simular**. El propio informe de conjunto lo ordenó: *«hay que rejugar la simulación del
  escenario 3 con pareja sólido+sólido. Las cifras de `fase11-simulacion-3` caducan»*. La única
  cifra que existe es **35,8 %**. Y es el molde: el archivo contra el que se escriben los otros
  siete.
- **esc 6** — `fase13-simulacion-6.md` **no tiene pareja flojo+flojo**. Sus cinco son
  sólido+sólido, sólido+flojo, el callado, el del español y el atajista. El informe lo dice de su
  puño: *«El único reparto medible en perfiles parejos es el de la pareja 1: 51/49»*. La pareja que
  falló con **35,3 %** no se ha vuelto a jugar.

Y hay una condición de §6.5 que se ha vuelto a romper: **«un solo contador, y declarado»**. En
fase 13 conviven `carga-4.mjs` (bruto: cuenta español, muletillas y lo leído en voz alta) y
`contar-palabras-{6,7}.py` (descarta español entre «…», muletillas y todo token que no empiece por
letra latina). Son criterios distintos sobre la misma puerta. Es exactamente el defecto que el
blueprint dejó escrito el 21 de agosto —«un 79/21 era 64/36 con el otro criterio»— reaparecido.

**3 · Repartos del conjunto — se cumplían, se corrigieron seis escenarios, y el informe es de
antes.** `fase13-conjunto.md` lleva la hora 00:18. Las ediciones de las fichas 1, 3 y 7 son de
00:21; la 4 de 00:28; las 2 y 6 de 00:35. La regla no admite matices: *corregir un escenario mueve
el reparto del set; `habla-auditor-conjunto` se repite entero, siempre*. Con los mapas a mano
corregidos, los seis repartos pasarían —actos ninguno por encima del 30 % ni por debajo del 3 %
sobre **133 filas** (`pedir-aclaracion` 15,8 % arriba, `disculparse` y `negociar` 3,0 % abajo);
poder 8/8; arranque **50/50**; desenlace 1 «sin acuerdo» + 3 «parcial»; culpa A 38 % / B 25 %;
género en las cuatro columnas de §5 (manda en escena H2/M2, decide fuera H3/M4 **tras Aníbal**,
gana H1/M1, culpa H3/M1/N1); escenografía **0 aulas de 8**— pero eso es aritmética mía sobre una
salida errónea, no un informe.

---

## 2 · Lo que falla, ordenado por lo que decide si sale el piloto

### A · LO QUE ROMPE EL EJERCICIO — bloquea el piloto

**A1 · Escenario 7: la pareja floja no llega al cierre, y no se entera.**
Medido en `fase13-simulacion-7.md` (22 ago 23:52, la simulación más reciente de todo el set):
*parejas que llegan a las 6 líneas: **1 de 5***. La pareja de perfil parejo flojo **muere en el
turno global 12** —`OK.`, un turno de una palabra encima de la única pieza cara que produjo el
otro— cierra **1,0 de 6** y *«manda el mensaje igual»*. Los seis turnos siguientes son
administrativos. El propio informe cierra con **«Aquí no se ha arreglado nada y no se ha tocado la
ficha»**, y desde entonces la ficha solo ha cambiado una fila de exponentes (`ad188133`).
Se le suma que la carta *«se puede guardar en el bolsillo ocho turnos»*: sale en el global 12 y solo
porque el otro pregunta por el gesto; **con un Kevin flojo o callado la carta no sale y el mensaje
se manda en el turno 4 con tres de las seis líneas**.
§6.11 pide que **la floja llegue con el andamiaje**. No llega.
→ vuelve a **`habla-escenarios`** (el escenario necesita un freno que no dependa de que el otro sea
sólido) y después a **`habla-simulador-parejas`**.

**A2 · Escenario 4: el atajista cierra en 4 turnos globales, y flojo+flojo produce 1 de 8 piezas.**
`fase13-simulacion-4.md` §5b: *«Sigue ganando, y esta ronda gana más rápido… Cuatro turnos, contra
los diez de la ronda anterior»*, con **dos datos falsos** que satisfacen la restricción del otro.
Por el lado A, §5: ocho turnos globales y **0 de 8 piezas del cierre** —no gana, pero apaga la
escena—. Y la pareja flojo+flojo cierra **1 de 8 piezas enteras, dos a medias**.
§6.11 pone el suelo en **6 turnos**. Se escribieron dos parches el 23 de agosto (`Nothing here is
free.` en la restricción 3 de A; `Same number to him and to the six.` en la restricción 2 de B) y
**no se ha vuelto a simular ni una vez**.
→ **`habla-simulador-parejas`**, sobre el texto de hoy, las cinco parejas.

**A3 · Escenario 3 (el molde): la puerta 5 falla con 35,8 % y su arreglo no se ha medido.**
El cierre repartido está en el disco; la simulación que lo juzgue, no. Que falle **el archivo que
sirve de molde a los otros siete** es lo que lo pone aquí y no en el cajón de acabado.
→ **`habla-simulador-parejas`**, pareja sólido+sólido como mínimo.

**A4 · Escenario 6: la pareja que falló la puerta 5 no se ha vuelto a jugar.**
`fase13-simulacion-6.md` sustituyó flojo+flojo por «el que se pasa al español». Las cinco parejas
que exige el encargo **no son las cinco**. Última cifra de esa pareja: **35,3 %**.
→ **`habla-simulador-parejas`**.

**A5 · La puerta 5 se está midiendo con tres contadores.**
`carga-unica.mjs` (bruto), `fase13-scripts/carga-4.mjs` (bruto, otra implementación) y
`contar-palabras-{6,7}.py` (descarta español y muletillas). §6.5 exige uno solo, declarado.
Mientras haya tres, las cifras de la puerta 5 no son comparables entre escenarios.
→ **`habla-simulador-parejas`**: declarar uno, reescribir los otros como alias, y volver a publicar
las dieciséis cifras con él.

**A6 · Faltan auditorías enteras.**
- **Tensión: cero informes sobre este set.** Los únicos son del 19 de agosto, sobre las fichas en
  español y sin el escenario 4 de hoy. → **`habla-auditor-tension`**, los 8.
- **Naturalidad: caducada en los 8** (22 ago 14:55). → **`habla-auditor-naturalidad`**, los 8.
- **Equidad: caducada en los 8**, y el esc 2 tiene un acto nuevo —la disculpa institucional— que
  ninguna lente de equidad ha visto. → **`habla-auditor-equidad`**, los 8 + conjunto.
- **Calcabilidad y nivel: caducadas en los 8.** Materialmente en 2, 4 y 6 (datos y vocabulario
  nuevos); formalmente en 1, 3, 5, 7 y 8. → **`habla-calibrador-nivel`** y la lente de calcabilidad.
- **Conjunto: se repite entero**, y antes hay que arreglar los mapas a mano de
  `reparto-conjunto.mjs:44` y `genero-13.mjs:22`. → **`habla-auditor-conjunto`**.

### B · DEUDA DECLARADA DEL FORMATO — **no bloquea el piloto**

Está escrita en §8 del blueprint y en los informes. Sale con el piloto, con la deuda a la vista.

1. **No hay sincronía entre las dos pantallas** (§8). Consecuencia medida en
   `fase13-simulacion-6.md` §3: *«Cada uno sabe cuándo ha terminado él. Ninguno sabe cuándo han
   terminado los dos»*, y en la pareja 5 *«la conversación se cierra en falso sin que ninguna de
   las dos pantallas se entere»*. Ninguna ficha arregla esto; lo arregla producto nuevo.
2. **No se graba nada** (§8). Sin evidencia, sin evaluación, sin progreso.
3. **No hay emparejador** (§8). Sin compañero, el estudiante se va a «habla solo».
4. **El jugador callado no se arregla con papel.** Medido en `fase13-simulacion-4.md`: produce las
   tres piezas que solo él tiene, *«sus dos datos ocultos, ninguno»*, y su restricción de
   desdecirse **no se cumple nunca** —aunque la forma esté entera en su tabla, sin huecos—.
   El informe lo declara sin arreglar y explica por qué: *«desdecirse no es una forma, es una
   decisión, y un callado no toma decisiones caras. Ninguna ficha arregla eso; lo arregla un
   profesor, o no se arregla»*. §6.5 ya dice que al callado se le mide otra cosa.

Estas cuatro **no cuentan contra el veredicto**. Lo que sí cuenta es que **estén escritas donde el
profesor las vea**, y hoy lo están.

### C · ACABADO — no bloquea, pero se arregla antes de la siguiente ronda

| qué | cifra medida | vuelve a |
|---|---|---|
| **13 referencias de gramática darían 404.** Los escenarios 2, 4 y 6 escriben sus 35 referencias **sin campo `level`**; de esas, 13 apuntan a temas **A1**. La ruta A2 clava `const NIVEL = 'a2'` y hace `if (!topic) notFound()` (`src/app/(site)/practica/ingles/a2/gramatica/[slug]/page.tsx:12,32`). Los escenarios 1, 3, 5, 7 y 8 sí lo llevan | 13 de 116 | `habla-integracion` |
| **`reparto-conjunto.mjs` y `genero-13.mjs` con mapas caducados** — reproducen defectos ya arreglados | 2 de 6 scripts | `habla-auditor-conjunto` |
| **Dos protocolos de cierre conviviendo**: lista compartida (esc 1, 2, 5, 8) y «tres cada uno» (esc 3, 4, 6, 7). MEDIO 6 pedía uno solo; el molde lo declina con su coste (+190 palabras) | 4 vs 4 | decisión de David, no del guardián |
| **El escenario 4 no usa los rótulos de prosa del molde** (`The patio, 11:20 a.m.` / `What you want` / `Three things you won't do` / `Nobody out there knows this` frente a `Where you are` / `You want` / `You can't` / `Only you know`). GRAVE 2a alineó los **cinco de tabla**, no los de prosa | 4 rótulos × 2 roles | `habla-escenarios` |
| **Solape de vocabulario A↔B en el escenario 5**: 5 formas compartidas de 9, **53 % del presupuesto**, las 5 con glosa idéntica. MEDIO 8 puso el listón en «media pantalla propia» y solo mandó tocar el 2 y el 6. Detrás, esc 1 y 4 al 40 % | 44 de 158 entradas (27,8 %) se gastan dos veces | `habla-escenarios` |
| **11 entradas de vocabulario sin sostén** en ninguna otra parte de las dos fichas (3 de ellas en 3B) | 11/158 = 7,0 % | `habla-escenarios` |
| **55 oraciones de prosa sin verbo finito** — el telegrama que §11 prohíbe **en prosa**. Hay falsos positivos (rótulos), pero nadie ha mirado la cifra desde el 21 de agosto | 55/469 = 11,7 % | `habla-auditor-equidad` |
| **`dar-mala-noticia` sigue en un solo asiento en el esc 2** y `rechazar` en el esc 7. MEDIO 7 prescribió **una fila por escenario** y eso se hizo; el residuo es del diseño del arreglo | 2 de 16 actos declarados | `habla-escenarios` |
| **El margen es cero.** Prosa: 16/16 dentro de 450, media **444**, peor **449**. Tablas: **13 de 16** exactamente en el techo de turnos. Cualquier arreglo que cueste una palabra de prosa **no cabe** | 1 palabra de holgura en todo el set | a tener en cuenta al encargar |

---

## 3 · Lo que queda abierto pase lo que pase

Aunque mañana las doce puertas pasen y las seis lentes estén frescas, **estas tres siguen abiertas
y hay que decirlas en voz alta al publicar**, porque son del motor y no del contenido:

- **No hay sincronía entre pantallas.** El temporizador y la carta los abre cada uno en su URL.
- **No se graba nada.** No hay evidencia de que la conversación ocurrió.
- **No hay emparejador.** Si el estudiante no tiene con quién, este modo no le sirve.

---

## 4 · Cómo se llega a APTO, en orden

1. **`habla-simulador-parejas`** — cinco parejas sobre el texto de hoy, con **un contador único
   declarado**, en los escenarios **3, 4, 6 y 7**. Es lo que decide las puertas 5 y 11. Si el 7 y
   el 4 no se arreglan solos, vuelven antes a `habla-escenarios`.
2. **`habla-auditor-tension`** — los 8. Nunca se ha corrido sobre este set.
3. **`habla-auditor-naturalidad`** y **`habla-auditor-equidad`** — los 8.
4. **`habla-calibrador-nivel`** y calcabilidad — confirmación en 1, 5, 7 y 8; auditoría entera en
   2, 4 y 6.
5. **`habla-auditor-conjunto`** — **el último, y entero**, con `reparto-conjunto.mjs` y
   `genero-13.mjs` corregidos primero. Cualquier corrección de los pasos 1 a 4 lo obliga a repetirse.
6. Guardián otra vez.

**Nada de esto se toca aquí.** El guardián no arregla, no reescribe y no negocia el veredicto.

---

### Anexo · Qué se midió y con qué

| medida | script | resultado |
|---|---|---|
| prosa por ficha | `fase7-scripts/prosa-canonica.mjs` | 16/16 ≤ 450 · media 444 · peor 449 |
| cuota de actos | `fase13-scripts/actos-conjunto.mjs` | mapa 16/16 cuadra con el disco · 133 filas · ninguno >30 % ni <3 % |
| vocabulario | `fase13-scripts/vocab-13.mjs` | 158 entradas · 16/16 dentro de 8-10 · solape A↔B 27,8 % |
| tablas de exponentes | `fase13-scripts/tablas-16.mjs` | R1 16/16 · alfabéticas 16/16 · R2 16/16 · R3 3 falsos positivos |
| género | `fase13-scripts/genero-13.mjs` | ⚠ mapa caducado (Nayibe) · corregido a mano: pasa |
| repartos | `fase13-scripts/reparto-conjunto.mjs` | ⚠ mapa caducado (culpa esc 2) · corregido a mano: pasa |
| motor y cierres | `fase13-scripts/motor-conjunto.mjs`, `cierres-conjunto.mjs` | 8/8 con salida nombrada · 2 protocolos de cierre |
| carga | `fase11-scripts/carga-unica.mjs` + `fase13-scripts/carga-4.mjs` + `contar-palabras-{6,7}.py` | ⚠ tres contadores · 2 escenarios sin medir |
| calcabilidad mecánica | `fase11-scripts/here-calcable.mjs`, `prosa-decible.mjs` | 0/158 · 0/158 · 0/566 |
| anclaje de gramática | verificación propia contra `src/data/grammar/ingles/` | 116/116 slugs existen · 13 referencias sin `level` a temas A1 |
| asimetría, registro, carta, cierre | verificación propia sobre las 8 fichas | 16/16 · 16/16 · 8/8 en turnos 3-6 · 8/8 bloque único |

⚠ `fase11-scripts/actos-cuota.mjs` está retirado y se para solo. No se ha usado.
