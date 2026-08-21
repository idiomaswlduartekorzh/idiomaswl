# Acta del guardián — inglés A2, habla acompañada · composición final (7 reescritos + el nº4 nuevo)

**Fecha:** 21 de agosto de 2026 · **Norma:** `docs/habla-acompanado-blueprint.md` §4, §5, §6, §10, §11,
con las **tres reglas nuevas** del 21 de agosto: puerta 5 sobre parejas de perfil parejo (y al callado
se le mide qué produjo), actos en **cuota de turnos** (techo 30 %, suelo 3 %), y prosa **≤ 450** medida
solo con `fase7-scripts/prosa-canonica.mjs`.

**Material dictaminado** — ocho escenarios, dieciséis fichas:
`fase7-fichas-1-the-bike-in-the-parking-lot.md` · `fase7-fichas-2-no-appointment-until-thursday.md` ·
`fase7-modelo-ficha-en.md` (el molde, escenario 3) · **`fase8-fichas-4nuevo.md`** (`the-pot-is-already-on`) ·
`fase7-fichas-5-late-again-on-monday.md` · `fase7-fichas-6-the-cousin-on-the-sofa.md` ·
`fase7-fichas-7-two-more-people-for-the-trip.md` · `fase7-fichas-8-cancel-the-gym-i-am-leaving.md`.
El nº4 viejo (`fase7-fichas-4-a-charge-i-did-not-make.md`) está **retirado y no se cuenta**.

---

# NO APTO

**Siete de las doce puertas de §6 fallan, y dos de las tres del formato de §11.** Las tres reglas nuevas
se aplicaron y **las tres favorecen al set**: la carga medida donde toca pasa en 14 de 14 celdas de los
siete viejos, los actos pasan techo y suelo, y la prosa pasa 16 de 16. Aun así no sale, y por dos motivos
distintos que conviene no mezclar:

1. **El escenario nuevo no ha pasado sus propias auditorías.** Las cinco de la fase 8 se corrieron a las
   17:55–17:57 del 21 de agosto sobre la ficha de las 14:07, y **ninguna volvió a la ficha**: calcabilidad
   dice *«NO PASA»* con 27 líneas decibles (18,5 %, la peor auditada del proyecto), naturalidad dice
   *«SUENA A LIBRO»*, nivel dice *«cabe con cambios»* con seis exponentes fuera de A2, equidad dice *«pasa
   con cambios»*, y su simulación declara **rotas las puertas 1, 4, 5 y 11**. El escenario que salva cinco
   repartos del conjunto es a la vez el único sin una sola auditoría limpia.
2. **Las siete fichas viejas se reescribieron después de auditarse.** Los archivos son de las 14:15–14:25;
   todas sus auditorías de calcabilidad, nivel, naturalidad y simulación son del 20 de agosto o de las
   08:00 del 21, y la de equidad en inglés, de las 13:14. **No hay una sola auditoría de escenario contra
   el texto que hoy va a producción.** El conjunto (18:13) sí es actual, porque sale de script.

Un guardián no certifica sobre evidencia anterior al texto. Eso, por sí solo, ya impide el APTO aunque
todo lo demás estuviera arreglado.

---

## Las doce puertas de §6

| # | Puerta | Veredicto | Respaldo |
|---|---|---|---|
| 1 | **Asimetría** | **FALLA** | `fase8-simulacion-4nuevo` §D0: la pantalla de cierre del nº4, **idéntica en las dos fichas por exigencia de la puerta 7**, nombra *«how they get here without Marcela's car»* y le entrega a A el titular del dato oculto nº 1 de B antes del turno 1. Se ve morder en la pareja 4, turno F11. Un cierre idéntico con nombres propios dentro rompe la puerta 1 por construcción. En los otros siete, `fase7-veredicto` la daba «pasa, con reserva» — sin reauditar |
| 2 | **Zona de acuerdo** | **pasa** | `fase8-simulacion-4nuevo` §E: *«aguanta»* — las tres salidas aparecen solas en la pareja sólida y la salida obvia la tumba la física en el turno 3 de las seis conversaciones. `fase7-naturalidad-1…8`: los siete dan el motor intacto |
| 3 | **Cero frase calcable** | **FALLA** | `fase8-calcable-4nuevo`: **27 decibles en 146 unidades = 18,5 %** (A 13 · B 8 · la carta 6), y **tres entregan ya montada una de las seis frases obligatorias del cierre**. Verificado por el guardián sobre la ficha: sigue sin tocarse. Más dos celdas `here` que §11 prohíbe expresamente, comprobadas literales hoy: `1A the doorman → he told you twice…` (línea 80) y `5A commitment sheet → it is blank…` (línea 64). Y los siete reescritos **no tienen reauditoría de calcabilidad** |
| 4 | **Andamiaje en dos piezas** | **FALLA** | `fase8-simulacion-4nuevo` §D5: la tabla de A leída de arriba abajo produce **quince turnos seguidos** que suenan bien (filas 1·2·3·4·5·6·7·8·9 → turnos 1·3·3·5·9·13·7·15·17, un solo salto); lo que la detiene es el cierre, no la tabla. Y `fase8-conjunto` §5, verificado por el guardián: **6B con 10 filas de exponentes** contra el 6-9 de §11 |
| 5 | **Carga ≥ 40 %, en palabras, sobre parejas parejas** | **FALLA por el nº4** | Regla nueva aplicada. Los siete viejos **pasan 14 de 14** celdas de perfil parejo, peor caso 62/38 (`fase8-diagnostico-carga` §2). El nuevo, no: `fase8-simulacion-4nuevo` §D1 — sólido+sólido **57,0/43,0 pasa**; flojo+flojo **62,3/37,7 falla**, con contador único y bruto declarado. Causa nombrada: las tres líneas de B son datos de tres palabras y las tres de A son explicaciones de quince |
| 5b | **El callado produce lo que solo él tiene** | **FALLA por el nº4** | `fase8-simulacion-4nuevo` §D3: sale a las 11:40 con el tarro tras **doce palabras**; B1 y B2 «a medias», el dato oculto 3 nunca se juega, y la condición que protege la nevera —*«a number and a name»*— se satisface con `Six` + `Wilmer`, **un nombre que no existe en ninguna de las dos fichas** y por tanto incomprobable |
| 6 | **Complicación entre el turno global 3 y 6** | **pasa** | Leído por el guardián en las ocho fichas: 1 → global 5 · 2 → global 5 · 3 (molde) → global 6 · **4 nuevo → turno 5** (`fase8-simulacion-4nuevo` §E: entra al terminar el global 4, a un solo rol, en las seis conversaciones) · 5 → global 5 · 6 → global 6 · 7 → global 3 · 8 → global 3. Todas dentro de la ventana y a un solo rol. Dos avisos de forma: la nº1 lo enuncia como *«after your third turn»* con el global entre paréntesis, y el nº4 dice *«Turn 5»* sin la palabra «global» —§6 pide el disparador escrito en turnos globales— |
| 7 | **Cierre escrito, idéntico** | **pasa, y es la causa de la puerta 1** | `Both screens — how it ends` presente en 8 de 8 archivos, sección compartida, idéntica por construcción (verificado). El choque con la puerta 1 en el nº4 está en §D0 y se resuelve en el redactado del cierre, no quitando la puerta |
| 8 | **Nivel** | **FALLA** | `fase8-nivel-4nuevo`: *«CABE CON CAMBIOS»* — **seis exponentes hay que tocar**, dos turnos del rol B no los produce un A2, y `insistir` está en la fila **B1** de §4 (la versión A2 del acto está defendida pero **no escrita en el blueprint**). Y §4 en turnos: `fase8-conjunto` §2, verificado en las cabeceras — **el nº5 declara «About 17 turns each»** (techo A2 = 9, techo B1 = 12) y el **nº6, 12** |
| 9 | **Registro** | **pasa** | Verificado en las 16 cabeceras: fórmula de registro + quién arranca, en las dos direcciones y en las dos pantallas (`Polite, two strangers` · `Formal` · `Informal` · `No boss here` · `Counter, formal`). `fase8-conjunto` §6: 3 formales, 4 informales y uno «polite» |
| 10 | **Equidad** | **FALLA** | `fase8-equidad-4nuevo`: *«pasa con cambios»* — **`cassava` no tiene fila de vocabulario** y A tiene que decirla en voz alta (sale 5 veces en su ficha; verificado): el escenario mide si ya sabías cómo se dice yuca. `fase8-equidad-en`: **7 de 8 «pasa con cambios»**, y del nº8 dice *«sin ellas, se retira»*. Y `fase8-conjunto` §3.4, comprobado por el guardián en la línea 181 de la ficha 5: el cierre obliga a decir en voz alta **«You said why him, and not Alba»** — una supervisora explicando por qué el ascenso es del que llega tarde tres lunes y no de la compañera que «nunca llega tarde». Lo creó el renombrado, no el diseño |
| 11 | **Simulación** | **FALLA** | `fase8-simulacion-4nuevo` §D2 y §D4: la pareja floja **muere en el turno global 12 con 2 piezas de 8** y sigue cuarenta segundos en español; **el atajista gana obedeciendo la ficha** —6 turnos por rol, 2:39 de habla, sale con el tarro, 3 piezas de 8, 1 exponente de 9— y **pasa el suelo literal de la puerta**. Los siete viejos no tienen simulación contra el texto de hoy |
| 12 | **Conjunto** | **FALLA** | `fase8-conjunto`: **seis de los siete repartos pasan** —actos máx. 15,9 % y mínimo declarado 3,0 %; poder 4/8; arranque 50/50; desenlace con 1 sin-acuerdo y 3 parciales; culpa de A 37,5 %; aula 0/8— y **falla el género**: 75 % de los mandos con nombre son mujeres (idéntico a la ronda anterior: se cambió Liliana por Camilo, que es el subordinado), **2 de 2 culpables son hombres**, y **3 de 3 cuidadores son hombres con 0 de 4 mujeres cuidando** — el cuidado no se añadió, se **mudó** palabra por palabra. Aviso: `insistir` está en **3,0 % exacto** y sus 4 turnos son todos del nº4 — una fila menos y el suelo también cae |

## Las tres del formato (§11)

| | Puerta | Veredicto | Respaldo |
|---|---|---|---|
| **A** | Cero líneas decibles fuera de la tabla de exponentes | **FALLA** | Las 27 de `fase8-calcable-4nuevo` más las dos celdas `here` de 1A y 5A, verificadas literales (`vocab8.mjs`: 2 de 157). La del molde está arreglada; estas dos son nuevas y están en fichas reescritas ayer por la tarde |
| **B** | Vocabulario completo, específico y con glosas más simples que la palabra | **FALLA** | Lo que cumple: 9-10 entradas en 16 de 16, **89,8 % exclusivas**, papel+dinero baja de 52,5 % a 41,4 % (unión 38,2 %) y las cinco glosas malas de la ficha 7 están reescritas (verificado). Lo que falla: **`cassava` sin fila** en el rol que la dice (`fase8-equidad-4nuevo` §A), **ocio 0 de 157** con el río en la prosa de las dos fichas del nº4, y un **bloque genérico del 17,8 %** al que el escenario nuevo no aporta nada |
| **C** | Prosa ≤ 450, contador canónico | **pasa** | Corrido por el guardián sobre la composición real: **16 de 16 dentro, media 443, peor 450**. Salvedad de método: `fase7-scripts/prosa-canonica.mjs` **mide todavía el nº4 retirado** —cuyo 457 es el único que se pasa— y **no mide el nuevo**, porque su glob solo mira `fase7-*`. La cifra buena sale del mismo contador, función por función, en `fase8-scripts/prosa-canonica-8.mjs`. Aviso: **7 de 16 fichas están a 0-2 palabras del techo** y la media está 43 por encima del «apuntando a 400» de §11 |

---

## Lo que falta, y a quién vuelve

| # | Qué | Dónde | Agente |
|---|---|---|---|
| 1 | Las **27 líneas decibles**, empezando por las **tres que entregan una frase del cierre** | `fase8-fichas-4nuevo.md` | `habla-fichas-de-rol` |
| 2 | Las **dos celdas `here`** que empiezan por pronombre + verbo conjugado | ficha 1 línea 80, ficha 5 línea 64 | `habla-fichas-de-rol` |
| 3 | Los **seis exponentes fuera de A2** del nº4 (A7, A8 y los cuatro de B) | `fase8-fichas-4nuevo.md` | `habla-fichas-de-rol` |
| 4 | **`cassava` con fila propia** en el vocabulario de A (sale `a lid`, que además es palabra de B) | `fase8-fichas-4nuevo.md` | `habla-fichas-de-rol` |
| 5 | La ficha nueva **suena a libro**: falta apertura propia, duda, autocorrección y la forma con que Duván se desdice de lo de las diez | `fase8-fichas-4nuevo.md` | `habla-fichas-de-rol` |
| 6 | **Reparto de contenido del nº4**: las tres líneas de B son datos de tres palabras. Arregla a la vez el 37,7 % de la puerta 5, el callado que gana asintiendo y el atajista que gana obedeciendo | escenario 4 | `habla-escenarios` |
| 7 | **La filtración del cierre** (Marcela) y el `Wilmer` inventado que hace incomprobable la condición | escenario 4 + su cierre | `habla-escenarios` (+ `habla-integracion` para la pantalla) |
| 8 | **Género · mando:** hacer masculino el mando del nº8. Deja los mandos en 2 de 4 y no toca el `sin-acuerdo` ni el `b>a`, que el nº8 sostiene solo | ficha 8 | `habla-auditor-equidad` → `habla-fichas-de-rol` |
| 9 | **Género · cuidado y culpa:** dar a una mujer con nombre algo que cuidar (7 u 8) o devolverle la causa del problema (3 o 6) | 1 ficha | `habla-auditor-equidad` → `habla-fichas-de-rol` |
| 10 | **«why him, and not Alba»**: releer el nº5 entero después del renombrado | ficha 5, línea 181 | `habla-escenarios` |
| 11 | **Turnos por rol fuera de §4:** nº5 con 17 y nº6 con 12 | fichas 5 y 6 | `habla-fichas-de-rol` |
| 12 | **6B con 10 exponentes**, y cerrar la contradicción 6-9 (§11) / 6-10 (§10) | ficha 6 · blueprint | `habla-fichas-de-rol` · `habla-blueprint` |
| 13 | **Declarar la excepción de tablas del nº4** (15 filas de dato duro por rol contra un techo de 10) o quitarle una de las dos tablas de reloj | §11 · ficha 4 | `habla-blueprint` |
| 14 | **Bandas declaradas que mienten:** el 1 declara `conceder-con-condicion` y no lo pide, el 8 declara `proponer-alternativa` y no lo pide; `pedir-aclaración` (15,9 %) y `poner-límite` (11,4 %) no los declara nadie | escenarios 1 y 8 + los ocho `speechActs` | `habla-escenarios` |
| 15 | **Ocio: 0 de 157 entradas.** 8-10 palabras de río, fin de semana o pasarlo bien | cualquiera de los ocho | `habla-fichas-de-rol` |
| 16 | **Actualizar el glob de `prosa-canonica.mjs`** para que mida la composición que va a producción | `fase7-scripts/prosa-canonica.mjs` | `habla-integracion` |
| 17 | **Reauditar las siete reescritas** —calcabilidad, nivel, naturalidad, simulación y equidad— contra el texto de las 14:15-14:25. Hoy **ninguna** auditoría de escenario es posterior a la reescritura | los 7 | los cuatro auditores + `habla-simulador-parejas` |
| 18 | **`insistir` al 3,0 % exacto**, con sus cuatro turnos en el nº4: repartirlo a un segundo escenario | conjunto | `habla-escenarios` |

Del 1 al 5 son de una pasada sobre una sola ficha. El 6, el 7 y el 10 tocan diseño. El 8, el 9, el 11 y
el 15 son una pasada corta. El 12, el 13 y el 16 son decisiones o minutos. **El 17 no es opcional: sin
él no hay evidencia sobre la que dictar APTO**, por bien que salgan los scripts de conjunto.

---

## Lo que queda abierto aunque esto llegue a APTO

Es §8 del blueprint, y no se disimula:

- **No hay sincronía entre las dos pantallas.** El temporizador y la carta los abre cada uno en su URL.
  Si hace falta que la carta salte a la vez, es producto nuevo.
- **No se graba nada.** Ninguna evidencia de que la conversación ocurrió.
- **No hay evaluación automática.** El «You did it if» lo comprueba la pareja, a ojo — y la simulación
  del nº4 muestra lo que eso permite: un cierre de 8 piezas dado por bueno con 3.
- **No hay emparejador.** El estudiante que no tiene con quién se va a «habla solo».

Y una que ya salió en el acta anterior y esta ronda confirma: **la trazabilidad entre informe y ficha
sigue sin cerrarse.** Mientras cada informe no diga contra qué versión exacta se jugó —y mientras
reescribir una ficha no invalide automáticamente sus auditorías—, el guardián tiene que deducirlo de
las marcas de tiempo del sistema de archivos, que es lo que ha tenido que hacer hoy.
