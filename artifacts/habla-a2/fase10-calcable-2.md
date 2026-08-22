# Fase 10 · Verificación tras la pasada quirúrgica — escenario 2, `no-appointment-until-thursday`

**Auditado:** `artifacts/habla-a2/fase7-fichas-2-no-appointment-until-thursday.md` en disco hoy
(22 ago 2026), contra `artifacts/habla-a2/fase9-calcable-2.md` y contra el diff real de la pasada
(`git diff HEAD -- …fichas-2…`, sin commitear).

**Prueba única, la misma:** *si la línea se puede decir tal cual y el turno avanza, está mal escrita.*
**Fuera de alcance:** las dos tablas `Say it here` (son los exponentes) y el bloque final en español.

---

## Veredicto

**PASA · 0 líneas decibles sobre 91 unidades.** Ninguna nueva.

Unidades: **51 oraciones de prosa** (26 en A —una más que en fase 9, ver abajo— y 25 en B) +
**40 filas de tabla** (10 de datos y 10 de vocabulario por rol). No cuentan las 18 filas de
exponentes ni las cabeceras.

**La pasada se respetó.** El diff toca **exactamente** las líneas citadas por `fase9-calcable-2.md`
y las nombradas por `fase9-nivel-2.md`, y ninguna más: cero secciones reordenadas, cero filas de
`Facts` tocadas, cero cambios de motor, cero reescrituras de párrafos no citados. Las 20 filas de
datos y las 18 de exponentes están **byte a byte** como en fase 9, salvo las dos glosas declaradas.

---

## 1 · Hallazgo por hallazgo

### 1 — GRAVE, ROLE A vocab `to cover`, columna `what it is` → **ARREGLADO**

Línea nueva (75):

> `| to cover | when the plan pays and the patient pays nothing | your best argument — here, and nowhere else |`

Se aplicó la reescritura literal. Es subordinada con `when`, sin sujeto pronominal ni verbo
principal: «When the plan pays and the patient pays nothing» no se levanta como turno y el `you`
genérico —que al pronunciarse se convertía en el destinatario correcto— ha desaparecido. El
argumento `money` vuelve a existir solo en la tabla de exponentes, que es su sitio.

### 2 — MEDIA, ROLE B vocab `to cover` → **ARREGLADO**

Línea nueva (145):

> `| to cover | when the plan pays and the patient pays nothing | their word for your plan — ask where it works |`

Misma cadena en las dos fichas, como pedía el informe. La pasada explica además por qué descartó la
variante de `fase9-nivel-2.md` (`when the plan pays and you pay nothing`): conservaba el `you pay
nothing` señalado aquí. Descarte correcto.

### 3 — MEDIA, ROLE A `Only you know` viñeta 1 → **ARREGLADO**

Línea nueva (42):

> `- You have an appointment at 5:20 today, with a patient who missed twice already. You can leave that door open, but never with a name or a reason.`

La oración autónoma en tercera persona —«That patient has missed twice already.»— ya no existe: es
una cláusula relativa colgada de un `You have…`. Dicha a B, el `You` la rompe. El dato oculto que la
restricción 2 prohíbe decir ya no está servido en forma de línea.

**Matiz de coste:** no se aplicó mi redacción (`You have a 5:20 today, …`, coste cero) sino la de
`fase9-nivel-2.md` A-3, que cuesta **+2 palabras**. El defecto se cierra igual; la factura aparece
en el punto 4.

### 4 — MEDIA, ROLE B `Only you know` viñeta 1 → **ARREGLADO**

Línea nueva (115):

> `You are not hiding it — the pain worries you more than the piece.`

La cláusula sin deixis se sustituyó por la propuesta literal. El `you` objeto la rompe al
pronunciarla: «the pain worries you more than the piece» dicho a A haría de A el que sufre.

### Cifras declaradas → **ARREGLADO, con un número distinto al que pedí (y bien)**

Contador canónico, ejecutado hoy: **ROLE A 450 · ROLE B 448**. El archivo declara ahora lo mismo en
los dos sitios (línea 250 de la tabla y punto 7 de la pasada del 21). Ya no hay tres números para
una misma ficha.

Pedí 449/448 porque medí **antes** de la pasada; la pasada añadió una palabra neta a A al aplicar la
etiqueta `the sign for the hospital` (5 palabras) en lugar de `when not to wait` (4). El declarado
coincide con el medido, que es lo que se auditaba.

⚠️ **Consecuencia a registrar, no defecto:** ROLE A queda en **450 sobre un techo de 450 · margen
cero**. La próxima corrección de prosa en esta ficha tiene que ser de coste negativo o compensada en
el mismo cambio. (Contexto: de las 16 fichas medidas hoy, 15 pasan; la 4 está en 457.)

---

## 2 · Cepillo entero — lo que hay ahora

### Prosa, 51 oraciones · 0 decibles

Todas las cláusulas llevan `you` / `your` y el referente las rompe al pronunciarlas. Las seis líneas
nuevas de la pasada se comprobaron una a una:

| nueva | por qué no es decible |
|---|---|
| A `not the name, and not the reason` | sintagma sin verbo |
| A `…but today you want to ask her: you think she will say yes.` | doble `you`; dicha a B, B sería quien dice sí |
| A `and the clinic counts them against you, like every patient…` | `you` objeto; dicha a B invierte el perjudicado |
| A `Both count against you.` | ídem |
| B `…and on Thursday you start even earlier.` | `you`; dicha a A pondría a A en el almacén |
| B `You never gave them that number, so their messages never reach you.` | `you` sujeto y objeto, `their` = el propio interlocutor |
| B toolkit `**7**: saying no to their offer is your job.` | reparto de trabajo, no turno |

**Una nueva al filo, señalada y no contada — A, `Where you are`:**

> `Somebody walks in with no appointment. That person has a hand on the face.`

Es la **única oración de toda la prosa de A sin ninguna deixis**, y la creó esta pasada al partir en
dos lo que antes era una sola oración con participio (`…with no appointment, a hand on the side of
the face.`). **No se cuenta como decible** porque el referente es el propio interlocutor: dicha a B
—que es esa persona— no avanza ningún turno, es narrar a alguien lo que él mismo está haciendo.
Pero lo único que la protege es la coincidencia del referente, no su forma. Si en otra ficha el
mismo movimiento —partir una oración para bajarla de nivel— cae sobre un tercero ausente, sale un
decible. Es el patrón a vigilar en las quince fichas restantes, no un fallo aquí.

Las ocho «al filo» de fase 9 siguen igual y siguen sin contar: `That is your key.`, `this is your
only free afternoon`, `Three chairs were empty this week…`, la línea de `Good afternoon`, `no
chewing on that side`, `the tooth is yours…`, `appointment and treatment can be in different ones`.

### Vocabulario, 20 filas · 0 decibles · las dos columnas revisadas

La fuga de fase 9 estaba en `what it is`, no en `here`. Hoy:

- **`what it is`**: las 10 de A son sintagmas de diccionario o subordinadas (`a tooth that lost a
  small piece`, `to keep a time for one person, so nobody else takes it`, `when the plan pays…`).
  En B, 9 iguales y la décima, `referral note`, es la casilla vacía a propósito
  (`— they'll say it; ask what it means`): instrucción al jugador cuyo `they` es el interlocutor, no
  turno. Ninguna oración independiente con verbo conjugado en ninguna de las 20.
- **`here`**: sigue limpia en las 20 celdas. Ninguna entrecomillada, ninguna empieza por pronombre +
  verbo conjugado, ninguna entrega el dato oculto en forma de frase. `give them the word` (A,
  `chipped`) es imperativa **al jugador**, no a B: dicha a B no significa nada.
- La asimetría se mantiene: las diez celdas `here` de B siguen siendo receptivas.

### Datos, 20 filas · 0 decibles · intactas

La pasada no tocó ninguna de las 20 filas de `Facts`. Siguen siendo listas con `·` sin verbo
principal conjugado. Sigue vigente el aviso de fase 9: la tabla de B está en primera persona y
`the edge sharp … on my tongue when I talk` está a un `is` de ser decible. **Margen intacto porque
no se gastó.**

### Fuera de las fichas

La carta de Dr. Restrepo (tres filas de notas, glosa nueva `= to make the sharp part flat`) y el
cierre común (`The front desk says the price, and who pays it`, tercera persona de instrucción) no
entregan ninguna forma decible. El bloque en español queda fuera de alcance por diseño.

---

## 3 · Para la siguiente ficha

1. Auditar **las dos columnas** del vocabulario, no solo `here`. Confirmado por segunda vez: la
   vigilancia puesta en un sitio empuja el defecto al de al lado.
2. Cuando una pasada **parta una oración** para bajarla de nivel, comprobar que la mitad que queda
   suelta tenga deixis o hable del propio interlocutor. Es lo que pasó en A `Where you are`.
3. Esta ficha ya no admite prosa nueva sin recorte simultáneo: **A 450/450**.
