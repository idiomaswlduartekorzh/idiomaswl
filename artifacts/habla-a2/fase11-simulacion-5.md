# Escenario 5 · `late-again-on-monday` — las cinco parejas sobre el texto FINAL

Se juega contra **`artifacts/habla-a2/fase7-fichas-5-late-again-on-monday.md` tal como está hoy**
(22 ago 2026, después de la pasada quirúrgica y del cambio de la línea 30 que pidió
`fase10-calcable-5.md`: `You want your August bonus safe from that paper, and you want the second
set of keys.`). Caja común: `artifacts/habla-a2/caja-de-herramientas-a2.md`. Motor:
`fase4-escenarios-4-6.md` §5.

**No se arregla nada aquí.** Se entregan las conversaciones y los diagnósticos.

---

## Cómo se leen estas transcripciones

**Cada jugador ve SOLO su ficha.** La carta es pantalla aparte y **solo de B**. La pantalla de
cierre es común a los dos. Si un jugador usa un dato del otro lado sin que se lo hayan dicho en voz
alta, va marcado **⚠ FILTRACIÓN**.

### Marcas de turno

| Marca | Qué significa |
|---|---|
| `[F]` | tomó una forma de su tabla «Say it here» o de la caja y la dijo como suya — **eso es el ejercicio** |
| `[D]` | miró su tabla `Facts` |
| `[V]` | miró el bloque de vocabulario |
| `[L]` | **leyó en voz alta algo que no está escrito para decirse**: fila de datos, prosa, carta, pantalla de cierre |
| `[X]` | se atascó: pausa larga, reinicio, frase abandonada |
| `[ES]` | se pasó al español, entero o a medias |
| `[!]` | se salió del papel: rompió una restricción de su ficha o habló de meta |

`CAM` = rol **A**, Camilo (se disculpa, pide; **no arranca**). `AMP` = rol **B**, doña Amparo
(**arranca**, manda `b>a`, concede con condición, **suya es la carta**).

**Aviso de asimetría propio de este escenario, y hay que decirlo antes de nada:** aquí *el que
concede* y *el motor de la conversación* **son la misma persona**. Amparo arranca, tiene el poder,
tiene la carta, tiene los tres papeles y cinco de las palabras de oficio. Camilo tiene escrito en
su propia ficha `she called you in, so you only answer`. Esto cambia cómo se lee la regla 1.

### Los perfiles

El A2 **sólido** falla en tercera persona (`it arrive`), en preposición y en pregunta sin auxiliar
(`who read it?`). El A2 **flojo** produce `I no can`, `two persons`, `he go`, presente por pasado,
artículo ausente y frases abandonadas a la mitad. El **callado** contesta con una a tres palabras y
no inicia nada. El **atajista** habla más suelto de lo que le toca —va a cerrar, no a aprender— y
se salta lo que le estorbe. El **lector** no improvisa: recorre su pantalla de arriba abajo.

### REGLA 1 · El handicap, de qué lado cae, y por qué — declarado antes de jugar

Ronda anterior de este escenario (`fase7-simulacion-5.md`, §«Igual que en la ronda 1, y por la misma
razón»): **el flojo, el callado y el atajista cayeron los tres del lado A**, con este argumento
escrito: «el atajista y el callado *tienen que ser* A». Eso es exactamente lo que la regla 1
prohíbe seguir haciendo sin decidirlo. **Los tres se invierten esta ronda.**

| Pareja | Quién lleva el handicap | Qué lado es ése | Ronda anterior |
|---|---|---|---|
| 1 · sólido + sólido | ninguno | — | — |
| 2 · sólido + flojo | **flojo = B · Amparo** | el que concede **y** el motor: arranca, manda, 5 palabras de oficio | flojo = A → **invertido** |
| 3 · flojo + flojo | los dos | — | — |
| 4 · el callado | **callado = B · Amparo** | el que concede **y** el motor **y** el único dueño de la carta | callado = A → **invertido** |
| 5 · el atajista | **atajista = B · Amparo** | el que concede: intenta soltar las llaves sin el renglón | atajista = A → **invertido** |
| 5c · contraprueba | **atajista = A · Camilo** | el que pide: el atajo que **ganó** en la ronda 1 | igual que la ronda 1, a propósito |
| 6 · el lector | **lector = A · Camilo** | el que pide: es la ficha clavada en el techo de prosa (450) | lector = A → **igual, y explicado en §6** |

**Lo que la inversión NO compra aquí, y es el hallazgo de la regla 1 en este escenario.** El
contraejemplo que la regla busca —«el handicap del lado que concede sube el reparto»— **no se
produce en el 5**, porque el lado que concede es también el motor. Invertir el callado de A a B no
alivia: lo empeora, y por una razón que ninguna ronda anterior pudo ver, porque el callado nunca
había caído del lado que tiene la carta. Va medido en §D3.

### REGLA 2 · Un solo contador de palabras, y aquí está dicho cuál

**Se cuenta en bruto todo lo que sale por la boca**: inglés, español, muletillas, repeticiones, y
**también las palabras leídas en voz alta de la ficha (`[L]`)**. **No se cuenta**: la etiqueta del
turno (`CAM-1`), las marcas entre corchetes, las acotaciones entre corchetes largos, los segundos
entre paréntesis y cualquier línea que no sea un turno. **El mismo criterio en las seis
conversaciones y en las tres contrapruebas.** Contado con `fase11-scripts/carga-5.mjs` sobre este
mismo archivo, no a ojo.

El criterio contrario —descontar lo leído de la ficha— se declara en §D8 **y no se usa para
juzgar**. Está ahí solo para enseñar cuánto se mueve la cifra: en la conversación 6 es la
diferencia entre un **43,2 / 56,8** y un **6,4 / 93,6**. Es la misma conversación.

### REGLA 3 · La puerta del 40 % se juzga solo sobre perfil parejo

El 40 % se mide **únicamente** en la pareja 1 (sólido+sólido) y la 3 (flojo+flojo). En la 4 la cifra
no significa nada: el perfil del callado *es* producir tres palabras por turno. Al callado se le
mide otra cosa, en §D3: **si produjo las piezas que solo él tiene** —los tres papeles, la fecha de
revisión, la capacitación, su precio y la carta— o si consiguió su objetivo asintiendo.

### Modelo de minutos

Turno de sólido ≈ 8–20 s · turno de flojo con consulta ≈ 12–28 s · turno monosilábico ≈ 2–5 s ·
turno leído `[L]` ≈ 6–16 s · pausa entre turnos: 3 s con un sólido en la pareja, 5 s en la floja ·
lectura de la carta en silencio + salida al pasillo ≈ 30 s (lo dice la propia carta).
**Presupuesto declarado en la ficha: 8 minutos · 6-9 turnos por rol.**

### Las piezas del cierre, numeradas para el resto del informe

| # | de quién | qué es |
|---|---|---|
| **P1** | Amparo | **qué papel se escribe y dónde va**: memorando en la hoja de vida · nota en la carpeta del almacén · la hoja de compromiso y nada más |
| **P2a** | Camilo | **el mecanismo**: quién lleva a Matías, qué bus, a qué hora entra — no una promesa |
| **P2b** | Amparo | la **fecha de revisión** (14 de septiembre) |
| **P3a** | Camilo | **su precio**: los miércoles a las cinco, los dos niños de la vecina |
| **P3b** | Amparo | **su precio**: dos jueves de 6:30 a 8:30 que nadie le paga |
| **P4** | los dos | **la firma**, con el renglón escrito y legible antes de las siete |
| **S** | Camilo | dice **no** a los sábados por la mañana **sin dar la razón** |
| **C** | Amparo | usa la carta: lo de fuera ya no es secreto |

---

## 1 · SÓLIDO + SÓLIDO — la de referencia

**A = Camilo (A2 sólido) · B = doña Amparo (A2 sólida).** Handicap: ninguno.

**AMP-1** [pone el segundo juego de llaves y la hoja en blanco sobre el escritorio, después habla] *Have a seat, Camilo. Close the door, please.* (2 s) *I'm not angry.* `[F]` *Look — this is the second set of keys. And this is a paper, still empty. What happened this morning?* `[F]`

**CAM-1** *Good morning, doña Amparo. I'm sorry.* (2 s) *What are the keys for, doña Amparo? And what paper is that?* `[F]`

**AMP-2** *One thing at a time. First this morning, then the desk.* `[F]`

**CAM-2** *I'm sorry about today. It's the third Monday, I know that.* (3 s) *My bus used to arrive at ten to seven. Now it arrive at a quarter past seven.* `[D]` *The road work in carrera 15 started on August 1 — twenty-five minutes more, every day. And I have to leave Matías at the daycare at 6:40. Not before, not after. The daycare no open before.* `[F]`

**AMP-3** — **carta, turno global 5** [Alba toca la puerta; Amparo sale treinta segundos y vuelve] *Sorry. That was Alba.* (2 s) *Camilo, the four of them are talking about this morning out there, out loud. So nothing I give you today stays between us — they will see it.* `[F]` *I have to write something today. That's the rule, it's not my decision. And what can you do next Monday?* `[F]`

**CAM-3** *Which paper is that, and who read it?* `[F]`

**AMP-4** *Three papers, and there is no fourth one. One: a written warning, and it goes in your file. Two: a note in the store folder — that paper is about the store, not about you. Three: this commitment sheet, and nothing else.* `[V]` (2 s) *The sheet has a start time, a start date, a review date, and one line: WHAT CHANGES. You fill out this line, not me.* `[F]`

**CAM-4** *Not the first one, please. With a written warning in my file the August bonus goes — eighty thousand pesos. It's automatic, nobody decide it.* `[D]` (2 s) *And I want to say one thing today: I'd like that warehouse job.* `[F]`

**AMP-5** *That's why you are sitting here. You know this warehouse better than the front counter, and nobody is in that job from April.* `[F]` (2 s) *But I can't give you the keys with nothing in writing. Not with the other four watching. So — what changes next Monday?*

**CAM-5** *Hold on. Let me think for a second.* `[F]` (5 s) *My neighbor in 3 goes to the same daycare every morning, with her two boys. She can take Matías at 6:40.* (2 s) *I never asked her. But if she takes him, I don't go to Girón, I take the six o'clock bus, and I can start at five to seven.* `[F]`

**AMP-6** *Five to seven.* (2 s) *So you open with me, and the truck at ten past seven has two people.* `[D]` *Say that again — who takes Matías, which bus, and what time you get here?* `[F]`

**CAM-6** *The neighbor in 3 takes Matías at 6:40. I take the 6:00 bus. I'll start at five to seven, from next Monday, August 24.* (2 s) *And what does this cost me? I pick up her two boys on Wednesdays at five. The Wednesdays were mine.* `[F]`

**AMP-7** *That helps, but I need one more thing.* `[F]` *The keys are not a key ring. The person who opens signs the delivery note, and the boxes are checked against it — two people, always. What never came, what goes back. That's two mornings of training, and I teach them myself.* `[V]` (2 s) *The warehouse is quiet Saturdays, eight to twelve.* `[D]`

**CAM-7** *Not Saturday morning. I'm sorry.* (3 s) *I just can't do that day. It's personal. Can we leave it there?* `[F]`

**AMP-8** *Hmm. OK.* `[F]` (4 s) *What if we do it after closing? Two Thursdays, half past six to half past eight, here.* `[F]` (2 s) *Nobody pays me for those two nights. That's what this costs me.* `[F]`

**CAM-8** *Thanks — really.* `[F]` (2 s) *Two Thursdays after closing, yes. And the paper is the commitment sheet, and nothing in my file. Is that OK for you?* `[F]`

**AMP-9** *The commitment sheet and nothing else. Review date, Monday September 14. If the line is true on September 14, the keys are yours.* `[D]` (2 s) *Now fill out the line, and sign it.*

**CAM-9** [escribe y lee lo que escribió] *«From Monday August 24 the neighbor in 3 takes Matías at 6:40. I take the 6:00 bus. I open with doña Amparo at five to seven.»* (2 s) *That costs me my Wednesdays, and it costs you two nights. So, we're clear then.* `[F]` [firma]

**Cierre:** P1 ✓ · P2a ✓ · P2b ✓ · P3a ✓ · P3b ✓ · P4 ✓ · S ✓ · C ✓ — **las ocho**.
**Turnos:** A 9 · B 9 (banda declarada 6-9). **Minutos: 8:35** contra 8:00 declarados.
**Español:** cero. **Atascos:** uno, CAM-5, y es el que la caja compra con `Let me think for a second.`
**¿Saben que terminaron?** Sí, y no por el reloj: CAM-9 lee el renglón, dice los dos precios y firma.

---

## 2 · SÓLIDO (A) + FLOJO (B) — el handicap en el motor

**A = Camilo (A2 sólido) · B = doña Amparo (A2 floja).** Handicap: **B**, el lado que concede y
arranca. Ronda anterior estaba en A.

**AMP-1** [pone las llaves y la hoja sobre el escritorio; tarda] *Camilo... sit, please.* (5 s) `[X]` *I no angry. Look. This... keys. And this paper.* (3 s) *What happen this morning?* `[F]`

**CAM-1** *Good morning, doña Amparo. I'm sorry about today.* (2 s) *What are the keys for, doña Amparo? And what is this paper?* `[F]`

**AMP-2** *The paper is...* (7 s) `[X]` `[V]` *...for write. You write. No me.*

**CAM-2** *I write? OK. But write what?* `[F]`

**AMP-3** — **carta, turno global 5** [Alba toca; sale, vuelve] *Alba.* (4 s) *Outside they talk. All. Four persons. This morning.* `[X]` (3 s) *So... no secret today.* (4 s) *And Monday? What you can do Monday?*

**CAM-3** *Sorry, I didn't catch that. Can you say that again, please?* `[F]`

**AMP-4** *Next Monday. What you do next Monday?*

**CAM-4** *First the reason, please, and then Monday.* (2 s) *My bus used to arrive at ten to seven. Now it arrives at a quarter past seven, because of the road work in carrera 15. It started on August 1 — twenty-five minutes more.* `[D]` *And I have to leave Matías at the daycare at 6:40.* `[F]`

**AMP-5** *Ah.* (4 s) *Six forty.* (5 s) *And... bus? Other bus?*

**CAM-5** *There is the 5:50 bus. It is here at 6:45.* `[D]` *But the daycare never open before 6:40, so with that bus I no arrive to the daycare. It doesn't work.* (2 s) *My neighbor in 3 goes to the same daycare every morning with her two boys. She can take Matías. I never asked her. If she takes him, I can start at five to seven.* `[F]`

**AMP-6** *Five to seven. Good. Good.* (5 s) *Write. There. That line.* [señala]

**CAM-6** *Before I write — which paper is that, and who read it?* `[F]`

**AMP-7** (8 s) `[X]` *Es que... hay tres papeles.* `[ES]` (3 s) *Three. One is... bad. It go to your... papers of you. Your... file? Bad, bad. Two is store. Three is this one.* `[V]` `[X]`

**CAM-7** *So — one goes in my file, one goes in the store folder, and this one is the commitment sheet. Is that right?* `[F]`

**AMP-8** *Yes! That. This one. No your file.*

**CAM-8** *Thank you. That's important for me, because with a warning in my file the August bonus goes. Eighty thousand pesos, automatic.* `[D]` (2 s) *And the keys? Today?* `[F]`

**AMP-9** *No today.* (5 s) *First you learn. The truck. The... el papel de la mercancía.* `[ES]` *Two mornings. Saturday. Eight to twelve.*

**CAM-9** *The delivery note, yes.* `[V]` (2 s) *But not Saturday morning. I'm sorry. I just can't do that day. It's personal.* `[F]` (2 s) *Another day, maybe?*

**AMP-10** (9 s) `[X]` *Thursday... after we close. Six thirty. Two Thursday.* (4 s) *Nobody pay me.*

**CAM-10** *Thanks — really.* `[F]` (2 s) *Two Thursdays after closing, half past six. And what does this cost me? I pick up her two boys on Wednesdays at five, and the Wednesdays were mine.* (2 s) *One more thing: when do we look at this again?* `[F]`

**AMP-11** (8 s) `[D]` `[X]` *September... fourteen. Monday.* (3 s) *Write the line. And sign.*

**CAM-11** [escribe y lee] *«From Monday August 24 the neighbor in 3 takes Matías at 6:40. I take the 6:00 bus and I open with doña Amparo at five to seven. Review, September 14.»* (2 s) *Signed. So, we're clear then.* `[F]`

**AMP-12** *Clear. Thank you, Camilo.*

**Cierre:** P1 ✓ (pero la nombró A, no ella) · P2a ✓ · P2b ✓ · P3a ✓ · P3b ✓ (`Nobody pay me`, tres palabras) · P4 ✓ · S ✓ · C **✗** — la carta salió como `no secret today` y nadie la entendió.
**Turnos:** A 11 · B 12 — **los dos fuera de la banda 6-9**. **Minutos: 11:40** contra 8:00.
**Español:** dos fugas, las dos de B, las dos en la misma frontera: **el nombre de los papeles** (AMP-7) y **`el papel de la mercancía`** (AMP-9).

---

## 3 · FLOJO + FLOJO — el caso real de dos compañeros de clase

**A = Camilo (A2 flojo) · B = doña Amparo (A2 floja).** Handicap: los dos.

**AMP-1** [pone las llaves y la hoja; le cuesta arrancar] *Camilo. Sit.* (6 s) *Look. Keys. And paper.* (4 s) *What... happen?*

**CAM-1** *Sorry. Sorry, doña Amparo.* (5 s) *The bus.* `[X]`

**AMP-2** (5 s) *The bus.* (4 s) *Three Monday, Camilo. Three.* `[D]`

**CAM-2** *Yes. I know. I sorry.* (6 s) *My son... the... the school of small children.* `[V]` `[X]` (4 s) *Six forty.*

**AMP-3** — **carta, turno global 5** [Alba toca; sale, vuelve] (6 s) *Was Alba.* (5 s) *People outside... talk.* (5 s) *OK. Next Monday?*

**CAM-3** (7 s) *Next Monday I come seven. Seven o'clock. I promise.* `[!]` — *(su restricción 3 dice que no puede cerrar con una promesa; no la ha mirado)*

**AMP-4** *Seven.* (5 s) *Good.* (5 s) *Write. Here. This line.*

**CAM-4** [escribe] (12 s) *«I come seven o'clock.»* (3 s) *OK?*

**AMP-5** *OK.* — **⟵ AQUÍ SE MUERE.** El renglón queda en una promesa, que es exactamente lo que las dos fichas prohíben, y ninguno de los dos tiene aire para reabrirlo. Lo que sigue es mecánico.

**CAM-5** (8 s) *And the keys?* `[X]`

**AMP-6** (7 s) *No. First... you learn.* (6 s) *Saturday. Eight, twelve.* `[D]`

**CAM-6** *No! No Saturday.* (8 s) `[X]` *I no can Saturday. I...* (5 s) *no can.* `[F]` — *(cierra la puerta, no da la razón: la pieza S sale, pero por falta de palabras, no por la caja)*

**AMP-7** (10 s) `[X]` (5 s) *Then... no keys.*

**CAM-7** (9 s) *Pero es que los sábados yo no puedo, doña Amparo, de verdad.* `[ES]` — **⟵ primera fuga al español, turno global 13**

**AMP-8** *Ya, pero es que yo la capacitación no la puedo dar entre semana.* `[ES]` `[!]` — *(falso: sí puede, dos jueves de 6:30 a 8:30; está en su propia ficha y no la miró)*

**CAM-8** *¿Y el papel entonces qué? ¿Va a mi hoja de vida?* `[ES]`

**AMP-9** *No sé. Este.* (4 s) *This paper.* (5 s) *Sign.*

**CAM-9** [firma] *OK.* (5 s) *Thank you.*

**AMP-10** *Thank you.* (6 s) *Bye.*

**Cierre:** P1 **✗** (nadie nombró los tres papeles; ninguno de los dos sabe adónde va el que firmaron) · P2a **✗** (`I come seven o'clock` es una promesa, no un mecanismo: nadie puede comprobarla el lunes) · P2b **✗** (la fecha de revisión no se dijo nunca) · P3a **✗** · P3b **✗** · P4 ✓ *de forma* — hay firma, y es lo único que hay · S ✓ · C **✗**.
**Turno donde se muere: global 9-10 (`CAM-4` / `AMP-5`)**, cuando el renglón se llena con una promesa y se acepta. Los siete turnos siguientes no producen ninguna pieza nueva.
**Turnos:** A 9 · B 10. **Minutos: 9:50** contra 8:00 — y **la mitad de ese tiempo es silencio**, no habla.
**Español:** desde el turno global 13 hasta el 16, cuatro turnos seguidos. Frontera exacta: **el precio del sábado** — el bloque 5 de la caja (`It's important for me because…`) es el que faltaba y ninguno de los dos lo abrió.
**¿Saben que terminaron?** **Creen que sí.** Hay firma, hay `thank you` y hay `bye`. Faltan cinco de las ocho piezas y **ninguno de los dos lo nota**, porque la pantalla de cierre —que sí dice «Three, or it isn't closed»— es prosa larga y **ninguno de los dos flojos la leyó**.

---

## 4 · EL CALLADO (B) + SÓLIDO (A) — el handicap en el dueño de la carta

**A = Camilo (A2 sólido) · B = doña Amparo (callada: una a tres palabras, no inicia nada).**
Handicap: **B**. Ronda anterior estaba en A. **B es aquí el motor, el que concede y la única dueña
de la carta**: es el caso duro que la ronda anterior no pudo ver.

**AMP-1** [pone las llaves y la hoja sobre el escritorio] *Sit, Camilo.* (3 s) *This morning?*

**CAM-1** *Good morning, doña Amparo. I'm sorry about today.* (2 s) *What are the keys for, doña Amparo? And what is this paper?* `[F]`

**AMP-2** [señala la hoja] *For you.*

**CAM-2** *For me to write? OK.* (2 s) *But first — I want to say the whole thing. My bus used to arrive at ten to seven. Now it arrive at a quarter past seven. The road work in carrera 15 started on August 1, twenty-five minutes more. And I have to leave Matías at the daycare at 6:40, not before.* `[D]` `[F]`

**AMP-3** — **carta, turno global 5** [Alba toca; sale treinta segundos; vuelve; se sienta] *Sorry.* (3 s) *Go on.* — **la carta entra y sale sin producir una palabra.**

**CAM-3** *And next Monday? I can do something, but I want to know the paper first.* (2 s) *Which paper is that, and who read it?* `[F]`

**AMP-4** *Three papers.* (3 s) *This one.*

**CAM-4** *Three? Sorry — was that three papers?* `[F]` *Which three? Does one of them go in my file?*

**AMP-5** *Not your file.* (2 s) *This one.*

**CAM-5** *Good. That's important for me, because with a warning in my file the August bonus goes. Eighty thousand, automatic.* `[D]` (2 s) *So what is this one called, and what do I write?*

**AMP-6** *Commitment sheet.* (3 s) *That line.* `[V]`

**CAM-6** *OK. What changes.* (4 s) *My neighbor in 3 goes to the same daycare every morning with her two boys. She can take Matías at 6:40. I never asked her, but I can ask her today.* (2 s) *Then I take the 6:00 bus and I can start at five to seven. Is that enough?* `[F]`

**AMP-7** *Not enough.* (3 s) *Training.*

**CAM-7** *Training for what? The truck?* `[F]`

**AMP-8** *Two mornings.* (3 s) *Saturday.*

**CAM-8** *Not Saturday morning. I'm sorry, I just can't do that day. It's personal. Can we leave it there?* `[F]` (3 s) *What if we do it another day? After closing, maybe?*

**AMP-9** (4 s) *Thursday.* (3 s) *Six thirty.*

**CAM-9** *Two Thursdays, half past six. Thank you — really.* `[F]` (2 s) *And what does this cost you, doña Amparo?*

**AMP-10** *Nothing.* `[!]` — **la pieza P3b se cae aquí, y con una sola palabra falsa**: son dos noches suyas que nadie le paga, está en su ficha, y `Nothing` además incumple el renglón del cierre `If it costs you nothing, say why`.

**CAM-10** *It costs me my Wednesdays — I pick up her two boys on Wednesdays at five.* (2 s) *And when do we look at this again?*

**AMP-11** *September 14.* `[D]`

**CAM-11** [escribe y lee] *«From Monday August 24 the neighbor in 3 takes Matías at 6:40. I take the 6:00 bus and I open at five to seven. Review September 14.»* (2 s) *I sign here?*

**AMP-12** *Sign.* (3 s) *Thank you, Camilo.*

**Cierre:** P1 **✓ a medias** (dijo `Three papers` y `Not your file` y nombró `Commitment sheet` — las tres piezas mínimas — pero **nunca dijo qué son las otras dos**, así que Camilo firma sin saber qué había en la mesa) · P2a ✓ · P2b ✓ (`September 14`) · P3a ✓ · P3b **✗** · P4 ✓ · S ✓ · C **✗ del todo**.
**Turnos:** A 11 · B 12. **Minutos: 7:55** contra 8:00 — **la única pareja que cabe en el presupuesto, y cabe porque uno de los dos casi no habla.**
**Español:** cero. El callado no se pasa al español: se calla, que es otra cosa y sale más barata en el papel.
**¿Saben que terminaron?** Sí, los dos. **Y les falta P3b y la carta entera.**

---

## 5 · EL ATAJISTA (B) + SÓLIDO (A) — cerrar sin el renglón

**A = Camilo (A2 sólido) · B = doña Amparo (atajista: viene a soltar las llaves y salir).**
Handicap: **B**. Ronda anterior el atajista era A.

**AMP-1** [pone las llaves y la hoja de un golpe] *Camilo, sit down. Look — the keys. Third Monday, so we do this fast: you sign this paper, you take the keys, and next Monday you are here at seven. Yes?*

**CAM-1** *Wait. Which paper is that, and who read it?* `[F]`

**AMP-2** *It's just a paper. Sign at the bottom, here. Then the keys are yours and we open together.*

**CAM-2** *Sorry — was that a warning? Does it go in my file?* `[F]` (2 s) *That's important for me, because with a warning in my file my August bonus goes.*

**AMP-3** *No, no, it's the commitment sheet. It's nothing. Sign.* `[V]`

**CAM-3** *OK, but this line is empty. It says WHAT CHANGES and there is nothing on it.* `[D]`

**AMP-4** *Write «I will not be late again». That's enough for me.* `[!]` — **rompe su restricción 3**: el renglón tiene que ser en palabras de él, y ella se lo está dictando.

**CAM-4** *I can't do that, doña Amparo. I'm sorry.* (3 s) *I promised the same thing two Mondays and nothing changed. This time it has to say how it works.* `[F]` (2 s) *And it works only if somebody takes Matías at 6:40. My neighbor in 3 goes to the same daycare — I never asked her, but I can ask her today. Then I take the 6:00 bus and I can start at five to seven.*

**AMP-5** (4 s) *Five to seven. Fine. Write that, sign, and take the keys.*

**CAM-5** *And the training? You open with the truck at ten past seven — I don't know how to check the boxes.* `[!]` ⚠ **FILTRACIÓN** — *el camión de las 7:10 no está en la ficha de A y Amparo no lo ha dicho. Es el hueco que abre correr: A rellena con lo que no sabe.*

**AMP-6** *...Two mornings. Saturdays, eight to twelve. Then the keys.*

**CAM-6** *Not Saturday morning. I just can't do that day. It's personal.* `[F]`

**AMP-7** (5 s) *Then two Thursdays after closing, six thirty. Fine. Sign.*

**CAM-7** *Thank you. And what does this cost you?* `[F]`

**AMP-8** *Nothing, it's my job. Sign.* `[!]` — segunda vez que P3b se cae por atajo.

**CAM-8** *It costs me my Wednesdays — her two boys, Wednesdays at five.* (2 s) *And the review date?*

**AMP-9** *September 14. Now sign.*

**CAM-9** [escribe y firma] *«From Monday August 24 the neighbor in 3 takes Matías at 6:40, I take the 6:00 bus, and I open at five to seven.»* (2 s) *We're clear then.* `[F]`

**¿Gana el atajista?** **No — y tardó nueve turnos en no ganar, no tres.** El freno físico es uno solo:
**el renglón en blanco**, que ella no puede llenar (restricción 3 suya) y que el cierre obliga a que
diga qué pasa el lunes antes de las siete. Lo intentó dictar en AMP-4 y **quien lo paró fue la
restricción 3 de la ficha de Camilo**, no la suya.
**Turnos:** A 9 · B 9. **Minutos: 6:10** contra 8:00 — el atajo sí acorta, aunque no gane.
**Piezas:** P1 ✗ (nunca dijo los tres papeles: dijo `it's nothing`) · P2a ✓ · P2b ✓ · P3a ✓ · P3b ✗ · P4 ✓ · S ✓ · C ✗ (**se saltó la carta entera**).

### 5b · Contraprueba — el mismo atajo contra un A **flojo**, cuatro turnos

**AMP-1** *Camilo, sit. The keys. Sign this and next Monday seven o'clock. Yes?*
**CAM-1** *Yes. Yes, doña Amparo. Sorry.*
**AMP-2** *Write here: «I will not be late again». And sign.*
**CAM-2** [escribe] *«I no come late again.»* (3 s) *OK?*
**AMP-3** *OK. Keys are yours. Saturday you come eight o'clock, I teach you the truck.*
**CAM-3** (6 s) *Saturday...* (5 s) *Yes.* `[!]` — **cede el sábado, que es la única cosa que su ficha le prohíbe dar**
**AMP-4** *Good. Bye.*
**CAM-4** *Bye. Thank you.*

**Aquí el atajista GANA, en 4 turnos y 1:35.** Y hay que decir la conclusión exacta: **el escenario
no para al atajista B; lo para el otro jugador.** El freno del renglón está escrito en las dos
pantallas (restricción 3 de A, restricción 3 de B), pero **solo funciona si alguien lo lee**, y el
único que tiene motivo para leerlo es A. Un A que no lo lee entrega el sábado y firma una promesa.

### 5c · Contraprueba de lado — el atajista en **A**, el que ganó la ronda 1

**AMP-1** [pone llaves y hoja] *Have a seat, Camilo. I'm not angry. What happened this morning?*
**CAM-1** *I'm very sorry, doña Amparo. It won't happen again — from next Monday I start at seven o'clock. Can I have the keys now?*
**AMP-2** *Seven o'clock is late. The truck is here at ten past seven and I need two people. And I can't give you the keys with nothing in writing, not with the other four watching.*
**CAM-2** *Then the 5:50 bus. I take the 5:50 and I'm here at 6:45.* `[D]` (3 s) *...no. The daycare never open before 6:40. With the 5:50 I don't leave Matías anywhere.* `[X]`
**AMP-3** *So what changes? Write it on that line — the line, not a promise.*
**CAM-3** (5 s) *My neighbor in 3 goes to the same daycare. She can take Matías.* (2 s) *I never asked her.*

**El atajo del rol A ya no gana, y se ve dónde se cae: en su propia tabla de datos.** El bus de las
5:50 —con el que el atajista ganó en la ronda 1— hoy está escrito así:
`| The 5:50 bus | at the store 6:45 · daycare, never before 6:40 |`. **La fila se contradice sola**,
así que el atajista se mata solo en CAM-2 sin que B tenga que hacer nada. Es el único freno del
escenario que vive **en la ficha del que va rápido** y no en la del otro.

---

## 6 · EL LECTOR — el que sale del paso leyendo su ficha en voz alta

**A = Camilo (lector: no improvisa, recorre su pantalla) · B = doña Amparo (A2 sólida).**
Handicap: **A**, el que pide. Se deja de ese lado a propósito: es la ficha **clavada en el techo de
prosa (450)** y la que tiene las diez filas de `Facts` con todos los números del escenario.

**AMP-1** [pone llaves y hoja] *Have a seat, Camilo. I'm not angry. What happened this morning?*

**CAM-1** *«I'm sorry about…»* `[L]` (3 s) `[X]` *...about today.* — *(leyó el tronco con los puntos suspensivos y tuvo que completarlo él; **el exponente troncado obliga a producir**)*

**AMP-2** *About today, and about the two Mondays before. Tell me what happened.*

**CAM-2** *«Carrera 15. Start date August 1. Twenty-five minutes more.»* `[L]` (2 s) *«Daycare in Girón. In at 6:40, not before and not after.»* `[L]`

**AMP-3** — carta [Alba toca; sale; vuelve] *Sorry, that was Alba. The four of them are talking about this out there, so nothing here stays between us.* (2 s) *OK — August 1, the road work, the daycare at 6:40. And your bus?*

**CAM-3** *«Before: ten to seven. Now: a quarter past seven. Without the daycare: the 6:00, here at five to seven.»* `[L]`

**AMP-4** *So without the daycare you are here at five to seven. Who takes Matías, then?*

**CAM-4** *«The neighbor in 3. Same daycare, every morning. Never asked. Her price: her two boys, Wednesdays at five.»* `[L]`

**AMP-5** *Good. Write that on the line — in your words, not mine. And I need two mornings of training. The warehouse is quiet Saturdays, eight to twelve.*

**CAM-5** *«You coach a kids' football school on Saturdays, from 8:00 to 12:00.»* `[L]` `[!]` — **se le escapa el secreto entero por leerlo**. Es su restricción 1, y la rompe **sin decir una sola palabra propia**.

**AMP-6** *A football school? Camilo, forty children — say that, then. Fine, not Saturdays. Two Thursdays after closing, six thirty to half past eight. Nobody pays me for those two nights.*

**CAM-6** *«The commitment sheet: start time · start date · review date · and one line: WHAT CHANGES.»* `[L]` (2 s) *«80,000 pesos. Gone with a written warning in my file. Automatic. Nobody's decision.»* `[L]`

**AMP-7** *Nothing goes in your file. The commitment sheet and nothing else, review Monday September 14. Now write the line.*

**CAM-7** [escribe] *«The neighbor in 3. The 6:00 bus. Five to seven.»* (2 s) [firma]

### ¿Le funciona leer? **Sí, y hay que citar exactamente dónde**

**Funciona en la tabla `Facts`, y solo ahí.** Dos filas, leídas literales, avanzan el turno sin
ninguna corrección — y son las dos que llevan el peso causal del escenario:

> `| The road work | carrera 15 · start date August 1 · twenty-five minutes more |`
> `| Your bus | before: ten to seven · now: a quarter past seven · without the daycare: the 6:00, here at five to seven |`

Leídas en voz alta salen como telegrama, pero **son verdad en su boca, no llevan marca de persona y
Amparo las entiende a la primera**. Lo que se pierde no es la información: es **la gramática entera
que la ficha venía a producir** —`used to`, el `past simple` de `started`, `have to`—. Camilo llega
al cierre habiendo dicho los cinco datos y **ni una sola estructura A2**.

**No le funciona en tres sitios, y conviene saber por qué en cada uno:**

1. **La prosa está blindada por la segunda persona.** `You want your August bonus safe from that
   paper` dicho a Amparo es falso sobre ella; `You can't invent an excuse` suena a acusación. Es lo
   que `fase10-calcable-5.md` verificó, y aguanta.
2. **Los exponentes troncados obligan a producir.** `I'm sorry about…`, `The neighbor in 3 can
   take…`, `I have to leave Matías at the daycare at…` no se pueden leer enteros: el hueco es
   justo el dato. **La decisión de la ronda anterior de convertirlos en troncos es lo que impide
   que la tabla `Say it here` se lea de arriba abajo como la conversación.**
3. **Leer «Only you know» se castiga solo.** CAM-5 es el turno del informe: el lector entrega el
   secreto que la ficha le prohíbe dar, y lo entrega **entero y en voz alta**. El escenario no
   necesita defenderse de eso; el jugador se autolesiona.

**Turnos:** A 7 · B 7. **Minutos: 5:20** contra 8:00. **Español:** cero — el lector nunca se pasa al
español, porque no tiene que producir nada.

---

## D · Los cinco diagnósticos

### D0 · Palabras por rol — contador único, bruto, `fase11-scripts/carga-5.mjs`

| # | conversación | turnos A/B | palabras CAM (A) | palabras AMP (B) | total | reparto A/B |
|---|---|---|---|---|---|---|
| 1 | sólido + sólido | 9/9 | 310 | 357 | 667 | **46,5 / 53,5** |
| 2 | sólido (A) + flojo (B) | 11/12 | 306 | 148 | 454 | 67,4 / 32,6 |
| 3 | flojo + flojo | 9/10 | 74 | 65 | 139 | **53,2 / 46,8** |
| 4 | callado (B) + sólido (A) | 11/12 | 299 | 42 | 341 | 87,7 / 12,3 |
| 5 | atajista (B) + sólido (A) | 9/9 | 202 | 114 | 316 | 63,9 / 36,1 |
| 5b | atajista (B) + flojo (A) | 4/4 | 16 | 38 | 54 | 29,6 / 70,4 |
| 5c | atajista (A) + sólida (B) | 3/3 | 68 | 58 | 126 | 54,0 / 46,0 |
| 6 | lector (A) + sólida (B) | 7/7 | 111 | 146 | 257 | 43,2 / 56,8 |

**En las conversaciones 1 a 5 nadie leyó nada en voz alta: `[L]` = 0 palabras en las cinco.** Los
dos criterios de conteo —bruto y descontando lo leído— **dan exactamente la misma cifra en las
cinco parejas**. Solo divergen en la 6, que es donde alguien lee a propósito. Eso no es suerte del
guion: es lo que mide §6, y es la prueba de conducta de lo que `fase10-calcable-5.md` verificó
leyendo.

### D1 · La puerta del 40 %, **solo sobre perfil parejo**

| pareja | lado menor | veredicto |
|---|---|---|
| 1 · sólido + sólido | **46,5 %** (Camilo) | **PASA** |
| 3 · flojo + flojo | **46,8 %** (Amparo) | **PASA** |

**La puerta 5 pasa, y pasa con margen en las dos.** Y pasa por un motivo que se puede señalar: el
reparto no lo produce la simpatía de los jugadores, lo produce **el cierre repartido**. De las ocho
piezas, tres son suyas (P2a, P3a, S), tres son de ella (P1, P2b, P3b) y dos son de los dos (P4, C).
Nadie puede cerrar sin que el otro produzca.

Las cifras de las parejas 2, 4 y 5 **no se usan para juzgar la puerta**, y se dicen para que no se
lean como defecto del escenario: en la 2 y la 4 el handicap está del lado B, así que el
desequilibrio es del perfil, no del texto.

### D2 · Turno donde se muere, y por qué

**Se muere una sola pareja: la 3 (flojo + flojo), en el turno global 9-10.**

> **CAM-4** [escribe] *«I come seven o'clock.»* — **AMP-5** *OK.*

Ahí el renglón WHAT CHANGES queda relleno con **una promesa**, que es lo que las dos fichas
prohíben por separado (restricción 3 de A: `You can't close this with a promise`; restricción 3 de
B: la línea tiene que ser en palabras de él y comprobable el lunes). **La prohibición está escrita
dos veces y en prosa, y ninguno de los dos flojos lee prosa.** Los siete turnos siguientes no
producen ninguna pieza: son la inercia de una conversación que ya terminó sin que nadie lo note.

La 5b **no se muere: la gana el atajista** (§5b). No es lo mismo y no se cuenta aquí.

### D3 · El callado — lo que hay que medirle, que no es el reparto

El 12,3 % de la pareja 4 no dice nada. Lo que dice algo es esta lista.

| pieza que **solo B** tiene | ¿la produjo? | con qué |
|---|---|---|
| los tres papeles y dónde va cada uno (P1) | **a medias** | `Three papers.` · `Not your file.` · `Commitment sheet.` — siete palabras. Nombró el que se firma y descartó el peor; **nunca dijo qué eran los otros dos** |
| la fecha de revisión (P2b) | **sí** | `September 14.` |
| la capacitación (dos mañanas, el camión) | **sí, mínima** | `Not enough.` · `Training.` · `Two mornings.` · `Saturday.` · `Thursday.` `Six thirty.` |
| **su precio: dos jueves que nadie le paga (P3b)** | **NO** | `Nothing.` — y encima falso |
| **la carta (C)** | **NO, ni una palabra** | salió al pasillo, volvió, dijo `Sorry.` `Go on.` |
| que tapó los dos primeros lunes | no procede | nadie preguntó |

**¿Consigue su objetivo asintiendo? SÍ, y esto va nombrado como defecto.** El objetivo de Amparo es
llevarse el renglón lleno en palabras de él y dos mañanas de capacitación. **Las dos cosas las
produce Camilo**, y ella se las lleva con `Not enough.`, `Training.`, `Saturday.` y `Thursday.`:
**doce palabras para todo su objetivo.** El escenario le exige producción real solo en dos sitios —
P1 y P3b— y **falla el segundo con una sola palabra**, `Nothing`, sin que nada la pare.

**Lo que la inversión del handicap descubrió, y la ronda anterior no podía ver.** La carta es
**exclusiva de B**. Con el callado en A —las dos rondas anteriores— la carta siempre entraba entera,
porque quien la abría era el jugador sólido. **Con el callado en B, la carta entra y no sale nada**:
el jugador sale al pasillo, vuelve y dice `Sorry. Go on.` Las tres líneas de la carta —«ya no es
secreto», «lo que le des lo verán», «tú decides cuánto le cuentas»— **no producen ni un turno**. Es
el defecto más caro de este informe y **no es del perfil, es del reparto**: el escenario 5 pone el
único dispositivo dramático del guion en manos de uno solo de los dos jugadores.

### D4 · ¿Gana el atajista?

**Depende de quién esté enfrente, y esa dependencia es el hallazgo.**

| variante | ¿gana? | turnos | qué lo para |
|---|---|---|---|
| 5 · atajista **B** + sólido A | **no** | 9 | el renglón en blanco — y lo invoca **la restricción 3 de A**, no la de ella |
| 5b · atajista **B** + flojo A | **SÍ, en 4 turnos y 1:35** | 4 | nada |
| 5c · atajista **A** + sólida B | **no**, y se cae solo en su turno 2 | 3 | **su propia fila de datos**: `| The 5:50 bus | at the store 6:45 · daycare, never before 6:40 |` |

**El resultado, dicho sin adorno: contra el rol A el escenario tiene un freno propio; contra el rol
B no lo tiene.** El atajo de A —el bus de las 5:50, que ganó la ronda 1— hoy está muerto **dentro de
la ficha de A**: la fila se contradice sola y el atajista se estrella con ella sin que B intervenga.
Ése es el arreglo de la pasada quirúrgica funcionando. El atajo de B —soltar las llaves contra una
firma en un renglón vacío— **solo lo para el otro jugador**, y en cuanto el otro jugador es flojo,
pasa: se firma `I no come late again`, se entrega el sábado que la ficha de A prohíbe entregar, y
los dos salen convencidos de que cerraron.

Y hay un segundo dato del mismo signo: **`Nothing, it's my job` funciona dos veces** (AMP-10 en la
pareja 4 y AMP-8 en la 5). El cierre dice `If it costs you nothing, say why`, pero **la que tiene
que decir por qué es la misma que quiere no decirlo**, así que nadie la obliga.

### D5 · Dónde se pasarían al español — los puntos exactos

| pareja | turno | qué estaba diciendo |
|---|---|---|
| 1 | — | cero |
| 2 | **AMP-7** | `Es que... hay tres papeles.` — **nombrar los tres papeles** |
| 2 | **AMP-9** | `el papel de la mercancía` — **`delivery note`** |
| 3 | **CAM-7 → AMP-8 → CAM-8** (global 13-16) | **el precio del sábado**, y de ahí ya no vuelven |
| 4 | — | cero. El callado no se pasa al español: se calla |
| 5 | — | cero |
| 6 | — | cero. El lector no se pasa al español porque no produce nada |

**Son dos fronteras, no seis.**

1. **Los nombres de los tres papeles y `delivery note`.** El vocabulario existe y está glosado en la
   pantalla de B (`incident form`, `store folder`, `written warning`, `commitment sheet`,
   `delivery note`), pero **es una columna de definiciones, no una forma que se pueda decir**: el
   flojo la lee, la entiende y **no sabe cómo se dice en una frase**. El andamiaje que falta no es
   más vocabulario: es un exponente de B para **nombrar los tres papeles seguidos** con hueco, del
   tipo `One goes in…, one goes in…, and this one is…`.
2. **Decir lo que la cosa te cuesta.** Es exactamente el punto que la caja se anuncia a sí misma:
   *«El bloque 5 — el punto exacto donde las parejas se pasaron al español en las ocho
   simulaciones.»* Y ahí hay un agujero comprobable en esta ficha: **`Your toolkit` de A cita los
   bloques 1, 3, 4 y 6; el de B cita los bloques 3, 4, 6 y 7. Ninguno de los dos nombra el
   bloque 5**, que es el único que la caja declara crítico. `Use all eight blocks.` no es un puntero:
   los cuatro que sí llevan puntero son los cuatro que se usaron.

### D6 · Minutos reales contra los 8 declarados

| # | pareja | minutos | contra 8:00 |
|---|---|---|---|
| 1 | sólido + sólido | **8:35** | +0:35 |
| 2 | sólido + flojo (B) | **11:40** | **+3:40** |
| 3 | flojo + flojo | **9:50** | +1:50, y la mitad es silencio |
| 4 | callado (B) + sólido | **7:55** | dentro — y cabe porque uno casi no habla |
| 5 | atajista (B) + sólido | **6:10** | −1:50 |
| 5b | atajista (B) + flojo | **1:35** | — |
| 5c | atajista (A) + sólida | **1:10** | — |
| 6 | lector (A) + sólida | **5:20** | −2:40 |

**La banda de 8 minutos aguanta en la pareja de referencia (8:35) y se rompe con el flojo en el
motor (11:40).** Es la consecuencia directa de la inversión del handicap: cuando el flojo estaba en
A —ronda anterior— el que arrancaba, mandaba y traía los papeles seguía siendo sólido y el reloj no
se disparaba. **El coste del handicap en este escenario no es simétrico: en B cuesta 3:40; el mismo
perfil en A costaba 1:20.**

Turnos: la banda declarada es **6-9 por rol**, y la cumplen 1 (9/9), 5 (9/9) y 6 (7/7). Se salen la
2 (11/12) y la 4 (11/12), las dos por lo mismo: **cada turno del handicap consume un turno de
reparación del otro** (`Sorry, I didn't catch that.`, `Was that three papers?`, `Is that right?`).
La banda es correcta para perfil parejo y **estrecha en un punto por cada turno de reparación**.

### D7 · ¿Sabe la pareja que terminó?

| # | ¿lo saben? | por qué |
|---|---|---|
| 1 | **sí, bien** | CAM-9 lee el renglón, dice los dos precios y firma. El final llega por las piezas, no por el reloj |
| 2 | **sí** | mismo mecanismo, tres minutos más tarde |
| 3 | **creen que sí, y no** | hay firma, `thank you` y `bye`. Faltan cinco piezas de ocho |
| 4 | **sí, y les falta P3b y la carta entera** | la firma tapa el hueco |
| 5 | **sí** | el atajista cierra en cuanto tiene firma |
| 5b | **creen que sí, y es lo contrario** | firmaron una promesa y entregaron el sábado |
| 6 | **sí** | el lector firma; nunca dijo una frase suya |

**La firma es lo que hace que una pareja sepa que terminó, y también lo que hace que dos parejas
crean que terminaron sin haber terminado.** El renglón «Three, or it isn't closed» está escrito
justo debajo de la firma, en prosa, y **las tres parejas que fallan piezas son las tres que no
leyeron esa prosa**.

### D8 · El criterio de conteo que NO se usó, declarado

Descontando lo leído en voz alta de la ficha:

| # | bruto (el que se usa) | descontando `[L]` |
|---|---|---|
| 1 a 5, 5b, 5c | idéntico | idéntico — `[L]` = 0 |
| 6 · el lector | 43,2 / 56,8 | **6,4 / 93,6** |

Es la misma conversación con dos números que no se parecen. Por eso el criterio se fija antes de
jugar y no después.

---

## E · Resumen en una tabla

| # | pareja | handicap en | ¿llega al cierre? | piezas 8 | reparto A/B | minutos |
|---|---|---|---|---|---|---|
| 1 | sólido + sólido | ninguno | **sí, entero** | 8/8 | 46,5 / 53,5 | 8:35 |
| 2 | sólido + flojo | **B** (motor) | sí, sin la carta | 7/8 | 67,4 / 32,6 | 11:40 |
| 3 | flojo + flojo | los dos | **no — muere en el turno global 9** | 2/8 | 53,2 / 46,8 | 9:50 |
| 4 | callado | **B** (motor + carta) | sí, sin precio ni carta | 6/8 | 87,7 / 12,3 | 7:55 |
| 5 | atajista | **B** | sí, y **no gana** | 5/8 | 63,9 / 36,1 | 6:10 |
| 5b | atajista + flojo | **B** y A | **el atajista GANA** | 2/8 | 29,6 / 70,4 | 1:35 |
| 5c | atajista | **A** | no gana; se cae solo | — | 54,0 / 46,0 | 1:10 |
| 6 | lector | **A** | sí, sin producir inglés | 7/8 | 43,2 / 56,8 | 5:20 |

**Puerta 5, sobre perfil parejo: PASA** — 46,5 % y 46,8 %.
