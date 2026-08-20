# Habla acompañada — inglés A2 · Fase 0: plan del set

Piloto de `/practica/ingles/a2/habla/acompanado/<slug>`. 8 escenarios.
Fuente de verdad: `docs/habla-acompanado-blueprint.md` (§4 nivel, §5 repartos, §7 catálogo).

**Convención de roles.** En todos los escenarios, **A es el rol del estudiante protagonista**
(el que tiene el objetivo principal) y **B es la contraparte**. Los dos roles los juegan
aprendices; los repartos de §5 se miden sobre A. `poder: a>b` significa *el estudiante manda*.

---

## La tabla

| nº | slug | situación (una línea) | actos de habla | poder | arranca | desenlace | min | turnos/rol |
|---|---|---|---|---|---|---|---|---|
| 1 | `the-bike-in-the-parking-lot` | A vende su bicicleta por Marketplace y espera al comprador en la portería; B la quiere por menos plata y con entrega en Floridablanca. | `rechazar`, `conceder-con-condicion` | a>b | B | acuerdo | 4 | A 6 · B 6 |
| 2 | `no-appointment-until-thursday` | A está en la recepción de una clínica odontológica y tiene que decirle a B, que llega con dolor de muela, que no hay cita hasta el jueves. | `dar-mala-noticia`, `recomendar` | a>b | B | acuerdo | 4 | A 6 · B 6 |
| 3 | `swap-the-saturday-shift` | Dos meseros del mismo rango en la trastienda del café: A necesita que B le cubra el sábado 12 porque ese día presenta el IELTS a las 8 a. m. | `pedir-favor`, `conceder-con-condicion` | igual | A | acuerdo-parcial | 5 | A 7 · B 7 |
| 4 | `a-charge-i-did-not-make` | A reclama en la tienda de telefonía por un cobro de datos de $42.000 que no reconoce; B, el asesor, solo tiene permiso para devolver una parte. | `quejarse`, `pedir-aclaracion` | b>a | A | acuerdo-parcial | 6 | A 8 · B 7 |
| 5 | `late-again-on-monday` | A llegó tarde por tercera vez al almacén de repuestos y B, el supervisor, lo llama aparte antes de abrir. | `disculparse`, `conceder-con-condicion` | b>a | B | acuerdo | 5 | A 7 · B 7 |
| 6 | `the-cousin-on-the-sofa` | A le avisa a B, su compañera de piso, que su primo llega de Cúcuta el jueves y va a dormir en la sala diez días. | `dar-mala-noticia`, `proponer-alternativa` | igual | A | acuerdo-parcial | 5 | A 7 · B 7 |
| 7 | `two-more-people-for-the-trip` | A pagó la casa de Mesa de los Santos y tiene las camas contadas; B, que aún le debe su parte, aparece diciendo que lleva a dos amigos. | `quejarse`, `rechazar` | a>b | B | aplazado | 5 | A 7 · B 7 |
| 8 | `cancel-the-gym-i-am-leaving` | La embajada le adelantó a A la cita del visado y quiere cancelar el gimnasio ya; B, en recepción, tiene una permanencia de tres meses firmada. | `pedir-favor`, `rechazar`, `proponer-alternativa` | b>a | A | sin-acuerdo | 6 | A 8 · B 8 |

Orden = rampa de dificultad: 1–2 son de 4 minutos y 6 turnos (el mínimo de A2), 8 es el más
largo y el único que termina mal. La secuencia es la del `sequence` de §7.

---

## Comprobación de los seis repartos (§5)

### 1. Actos de habla — ninguno por encima del 40 %

17 asignaciones sobre 8 escenarios. El porcentaje es *escenarios que contienen el acto / 8*.

| acto | escenarios | nº | % | umbral ≤40 % |
|---|---|---|---|---|
| `rechazar` | 1, 7, 8 | 3 | 37,5 % | cumple |
| `conceder-con-condicion` | 1, 3, 5 | 3 | 37,5 % | cumple |
| `pedir-favor` | 3, 8 | 2 | 25,0 % | cumple |
| `dar-mala-noticia` | 2, 6 | 2 | 25,0 % | cumple |
| `quejarse` | 4, 7 | 2 | 25,0 % | cumple |
| `proponer-alternativa` | 6, 8 | 2 | 25,0 % | cumple |
| `pedir-aclaracion` | 4 | 1 | 12,5 % | cumple |
| `recomendar` | 2 | 1 | 12,5 % | cumple |
| `disculparse` | 5 | 1 | 12,5 % | cumple |

Máximo del set: **37,5 %**. **CUMPLE.**
Nueve de los doce actos del catálogo aparecen; los tres que faltan son los tres de B1 (abajo).

### 2. Poder — el estudiante manda en ≥3 de 8

| valor | escenarios | nº | % |
|---|---|---|---|
| `a>b` (manda el estudiante) | 1, 2, 7 | **3** | 37,5 % |
| `b>a` | 4, 5, 8 | 3 | 37,5 % |
| `igual` | 3, 6 | 2 | 25,0 % |

Umbral: ≥3 con `a>b`. Tenemos 3. **CUMPLE.**
Añadido del encargo: **≥2 entre iguales** → 2 (nº 3, dos meseros del mismo rango; nº 6, dos
compañeras de piso). **CUMPLE.**

### 3. Quién arranca — entre 40 % y 60 % cada rol

| arranca | escenarios | nº | % |
|---|---|---|---|
| A | 3, 4, 6, 8 | 4 | **50,0 %** |
| B | 1, 2, 5, 7 | 4 | **50,0 %** |

Con 8 escenarios, 4/4 es el único reparto que cabe: 3/5 daría 37,5 % y ya estaría fuera del
suelo del 40 %. **CUMPLE.**

### 4. Desenlace — al menos un «sin acuerdo» y un «acuerdo parcial»

| desenlace | escenarios | nº | % |
|---|---|---|---|
| `acuerdo` | 1, 2, 5 | 3 | 37,5 % |
| `acuerdo-parcial` | 3, 4, 6 | **3** | 37,5 % |
| `sin-acuerdo` | 8 | **1** | 12,5 % |
| `aplazado` | 7 | 1 | 12,5 % |

Umbral: ≥1 `sin-acuerdo` y ≥1 `acuerdo-parcial`. **CUMPLE.**
Solo 3 de 8 terminan con lo que se pedía tal como se pedía: 37,5 %.

### 5. Culpa — el estudiante no causa el problema en más de la mitad

| ¿lo causa A? | escenarios | nº | % |
|---|---|---|---|
| Sí | 3 (se inscribió al examen sabiendo el turno), 5 (llegó tarde tres veces), 6 (invita al primo) | **3** | 37,5 % |
| No | 1 (el comprador regatea), 2 (agenda llena), 4 (cobro de la operadora), 7 (B debe plata y suma gente), 8 (la embajada adelantó la cita) | 5 | 62,5 % |

Umbral: ≤4 de 8 (≤50 %). Tenemos 3 (37,5 %). **CUMPLE.**
En el nº 8 la causa es externa a propósito: si A hubiera firmado a la ligera, el escenario
enseñaría a disculparse, no a reclamar frente a una política.

### 6. Escenografía — máximo 2 de 8 en aula

| escenario | dónde |
|---|---|
| 1 | portería de un edificio |
| 2 | recepción de una clínica odontológica |
| 3 | trastienda de un café |
| 4 | tienda de telefonía en un centro comercial |
| 5 | oficina de un almacén de repuestos |
| 6 | cocina de un apartamento compartido |
| 7 | parqueadero, viernes por la tarde |
| 8 | recepción de un gimnasio |

En aula: **0 de 8 (0 %)**. Umbral ≤2. **CUMPLE.**
Es cero a propósito, no por descuido: el aula es el sitio donde se practica, no el que hay que
ensayar. Los candidatos de aula que descarté están abajo.

### Resumen

| reparto | medida | umbral | veredicto |
|---|---|---|---|
| Actos de habla | máx. 37,5 % | ≤40 % | cumple |
| Poder (estudiante manda) | 3 de 8 | ≥3 | cumple |
| Quién arranca | 50 % / 50 % | 40–60 % | cumple |
| Desenlace | 1 sin acuerdo, 3 parciales | ≥1 y ≥1 | cumple |
| Culpa del estudiante | 3 de 8 (37,5 %) | ≤50 % | cumple |
| Aula | 0 de 8 | ≤2 | cumple |

Los seis, sin nota al pie.

---

## Los dos encargos explícitos

**1. Al menos 2 entre iguales.** Nº 3 (dos meseros del mismo rango) y nº 6 (dos compañeras de
piso). Son los dos donde nadie puede apoyarse en el cargo: A no puede ordenar y B no puede
escudarse en una política, así que la lengua tiene que hacer todo el trabajo. Los dos duran 5
minutos y 7 turnos, el centro de la horquilla A2, no el suelo.

**2. Al menos uno donde el estudiante dé mala noticia o ponga un límite.** Tres, en tres
formas distintas:

- **Nº 2** — A da la mala noticia desde el mostrador: no hay cita hasta el jueves. Mala noticia
  institucional, con el poder de su lado y la obligación de ofrecer algo.
- **Nº 6** — A da la mala noticia en su propia casa y sin poder ninguno: el primo llega igual,
  y B tiene derecho a molestarse. Es la más difícil del set.
- **Nº 7** — A pone un límite: no caben dos personas más, y de paso B todavía le debe su parte.

Sobre el nº 7: la **función** es poner un límite, pero el acto **no se etiqueta** `poner-limite`
porque §4 lo sitúa en B1. Se ejecuta con lo que sí es A2: queja educada con un dato duro
(«you still owe me 60,000») + rechazo directo con razón («sorry, there are only six beds»). La
ficha prohibirá el atenuador largo. Si el redactor necesita «I'd rather you didn't, to be
honest», el escenario no es A2 y se sube de nivel, no de listón.

---

## Anclaje de nivel (§4) — por qué cada acto cabe en A2

La fila A2 autoriza: pedir un favor, dar una razón, disculparse, proponer alternativa,
quejarse con educación, conceder poniendo una condición simple.

| acto | por qué es A2 | anclaje en `src/data/grammar/ingles/a2` |
|---|---|---|
| `pedir-favor` | literal en la fila A2 | `have-to-must`, `connectors-a2` (because / so) |
| `disculparse` | literal en la fila A2 | `past-simple-regular`, `past-simple-irregular` (dar la razón de lo que pasó) |
| `proponer-alternativa` | literal en la fila A2 | `will-future`, `present-continuous-future-a2` |
| `quejarse` | literal en la fila A2 («con educación») | `present-perfect-basic`, `quantifiers` |
| `conceder-con-condicion` | literal en la fila A2 («condición simple») | `first-conditional` — existe en A2, sin él el acto no se sostiene |
| `rechazar` | A1 ya exige «aceptar o rechazar **de frente**». En A2 se pide rechazo directo + razón | `have-to-must`, `connectors-a2` |
| `pedir-aclaracion` | operación básica de A1/A2; no exige discurso indirecto | `past-simple-questions`, `quantifiers` |
| `dar-mala-noticia` | se ejecuta como disculparse + dar una razón, ambos A2 | `will-future`, `connectors-a2` |
| `recomendar` | consejo simple, no persuasión | `should-advice`, `comparatives` |

Prohibido en las fichas de este set, aunque «se entienda igual»: ironía, concesión larga
(«aunque… lo cierto es que…»), discurso indirecto extenso, y el condicional de cortesía
compuesto («I would have preferred if you had…»). Son el «todavía no» de A2.

**Minutos y turnos.** §4 fija A2 en 4–6 minutos y 6–9 turnos por rol. El set va de 4 a 6
minutos y de 6 a 8 turnos: dentro, con margen arriba. La asimetría máxima es la del nº 4
(A 8 · B 7): B se queda con el 46,7 % de los turnos, por encima del 40 % que exige la puerta 5.
Con 6 turnos como mínimo, la carta de complicación (puerta 6) cabe entre el turno 3 y el 5 en
todos los escenarios.

---

## Lo que quedó fuera, y por qué

### Actos del catálogo que no se usan

| acto | motivo |
|---|---|
| `negociar` | §4 lo sitúa en B1. Excluido de entrada por el encargo y por el blueprint |
| `insistir` | §4 lo sitúa en B1. Insistir sin sonar grosero exige atenuadores que A2 no tiene |
| `poner-limite` | §4 lo sitúa en B1. Su función se cubre en el nº 7 con `quejarse` + `rechazar` |

### Escenarios descartados

| candidato | por qué no |
|---|---|
| Quejarse por un plato en un restaurante | Es el escenario por defecto de todos los manuales, y el que produce el set de «ocho quejas» que §5 prohíbe. La queja de consumo ya vive en el nº 4, donde el mostrador tiene una política que la bloquea |
| Vuelo cancelado en el aeropuerto | Ritmo y léxico de B1, y el rol de agente pide registro formal sostenido. Puerta 8 |
| Entrevista de trabajo | Los dos quieren lo mismo: no hay asimetría (§1) y muere en el monólogo (§3.2) |
| Entrevista de visado en el consulado | Puerta 10. Es dolor real para el público migrante, y un rol es puro interrogatorio: el otro no tiene objetivo |
| Discutir una nota con el profesor | Aula, y el poder va contra el estudiante otra vez. El set ya tiene tres `b>a` |
| Pedir prórroga de una tarea | Aula, y es el nº 3 con menos en juego |
| Regatear el depósito con el arrendador | Regatear un monto es `negociar`: B1 |
| Regatear precio en San Andresito | Igual: `negociar`, B1. Lo que sí sobrevive es el nº 1, donde A **rechaza** la rebaja y concede otra cosa |
| Devolver ropa sin factura | Se solapa con el nº 4 (reclamo con política que bloquea) y con el nº 8 (cláusula firmada) |
| Urgencias médicas con síntomas | Léxico clínico fuera de A2 y riesgo emocional. Sobrevive la versión suave: recepción odontológica, nº 2 |
| Conflicto de pareja / ruptura | Puerta 10: escenario que duele |
| Reclamar al vecino por una gotera | Buen escenario, pero el tercer `igual` habría dejado el set en 2 `b>a` o forzado a sacar el nº 5, que es el único `disculparse`. Primer candidato si el set crece a 10 |

### Decisiones de conjunto que conviene no deshacer

- **Cero escenarios en aula.** El techo es 2; usar 0 es una decisión. Estos estudiantes ya
  viven el aula: lo que no ensayan es el mostrador, la portería y la cocina del piso.
- **El nº 8 termina sin acuerdo y no se arregla.** Es el escenario que enseña a cerrar cuando
  no se consigue lo que se pide. Si alguien lo «mejora» dándole la cancelación a A, el reparto
  de desenlaces se cae y el set vuelve a enseñar que pedir siempre funciona.
- **Los actos y el `outcome` de cada fila son del set, no del escenario.** Si al escribir la
  ficha un escenario «pide» otro desenlace, se mueve el escenario a otro hueco de la tabla —
  no se toca el reparto.
