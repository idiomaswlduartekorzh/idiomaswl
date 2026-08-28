# Habla acompañada — blueprint de presentación v2

> **Estado:** propuesta para revisión de David. No implementada ni publicada.
> **Decisión de producto:** 27 de agosto de 2026.
> **Primer alcance:** las 60 prácticas de inglés A1, A2 y B1.

Este documento redefine **cómo se presenta** una práctica de Habla acompañada. No reemplaza
las reglas de asimetría, tensión, nivel, cartas y simulación de
[`habla-acompanado-blueprint.md`](habla-acompanado-blueprint.md). Resuelve un problema distinto,
observado con estudiantes reales: las fichas contienen información suficiente, pero la
experiencia no deja claro, antes de repartir los roles, **qué pasó, qué deben hacer y cómo saben
que terminaron**.

No se toca código ni producción hasta aprobar este blueprint y probar un prototipo con
estudiantes.

---

## 1. Hallazgo de aula

La presentación actual pide esta secuencia:

1. elegir un escenario;
2. repartir los roles;
3. abrir una ficha privada;
4. descubrir allí la situación, el objetivo, las restricciones y los datos;
5. intentar empezar a hablar.

Eso produce cuatro problemas:

- el estudiante conoce el **título**, pero no construye una imagen común de lo ocurrido;
- cada persona entiende una historia parcialmente distinta antes de saber cuál es la misión
  conjunta;
- “repartan las fichas” es una instrucción operativa, no una explicación de la actividad;
- la cantidad de información privada compite con la pregunta más básica: “¿qué tenemos que
  hacer?”.

La solución no es añadir más texto a la ficha privada. Es cambiar el orden de la información.

## 2. Objetivo de la nueva experiencia

Antes de elegir un rol, los dos estudiantes deben poder responder sin ayuda del profesor:

1. **Where are we and why are we here?**
2. **What happened?**
3. **What do we need to achieve together?**
4. **Who will start?**
5. **How will we know the conversation is finished?**

La página tiene un solo trabajo: llevar a dos estudiantes desde “no conozco el caso” hasta su
primer turno en inglés sin explicación adicional del profesor.

## 3. Decisiones de idioma

### 3.1 Inglés significa inglés completo

En las rutas de Speaking de inglés, **toda la superficie del ejercicio va en inglés**, también
en A1:

- títulos y descripciones de escenarios;
- instrucciones y botones;
- Situation, What happened y Shared task;
- elección y nombres de roles;
- fichas privadas;
- datos, vocabulario y expresiones;
- carta de complicación;
- criterio de cierre y debrief;
- caja de herramientas;
- mensajes de ayuda, error y estado.

No se muestra una traducción paralela al español dentro del ejercicio. A1 no recibe español:
recibe **inglés más corto, frecuente y concreto**.

La navegación global del sitio puede seguir en español mientras el sitio completo no tenga
localización. Desde el encabezado propio de Speaking hasta el final de la práctica, el alumno
solo ve inglés.

### 3.2 No existe una versión maestra en español

Los textos no se redactan en español para traducirlos. Se escriben directamente en inglés
americano, calibrados para lectura A1, A2 o B1. La versión editorial en español, si existe para
el equipo, no se renderiza.

### 3.3 Regla de sencillez

Una instrucción que no cabe en el nivel se simplifica; no se traduce. Ejemplos:

| Función | A1 | A2 | B1 |
|---|---|---|---|
| Presentar la misión | `Get two different seats on the same bus.` | `Ask the company to correct the booking and keep both passengers on the same bus.` | `Negotiate a workable correction without missing the appointment or paying an unfair fee.` |
| Pedir que empiece | `You start. Explain the ticket problem.` | `You start. Explain what is wrong with the booking.` | `You start. Summarize the booking error and state your priority.` |
| Cerrar | `Finish when you both know the bus time and the two seat numbers.` | `Finish when you agree on the bus, seats, price and next step.` | `Finish when both people can restate the decision, conditions and person responsible.` |

---

## 4. Nuevo modelo mental

La experiencia completa usa siempre cinco verbos y el mismo orden:

```text
UNDERSTAND  →  CHOOSE ROLES  →  PREPARE  →  SPEAK  →  REVIEW
```

La barra de recorrido permanece visible. No mide progreso guardado ni sincroniza dispositivos;
solo dice dónde está el estudiante y qué viene después.

| Paso | Pregunta del estudiante | Respuesta de la interfaz |
|---|---|---|
| **1. Understand** | What is happening? | Situation + What happened + Shared task |
| **2. Choose roles** | Who am I? | Dos identidades públicas, sin datos secretos |
| **3. Prepare** | What do I need to do? | Una mission card privada y escaneable |
| **4. Speak** | What should we produce? | First move, prompts opcionales y finish line |
| **5. Review** | Did we solve it? | Resultado, reconstrucción y debrief |

## 5. Arquitectura de pantallas

### 5.1 Catálogo de escenarios

Cada tarjeta deja de ser solo un título y un lugar. Debe anticipar el conflicto en inglés:

```text
01 · TRAVEL
Two passengers, one seat
You bought two bus tickets, but both passengers were assigned seat 12.
5 min · 2 people · A1

[Open the situation]
```

Reglas:

- título concreto, no abstracto;
- una sola oración con el problema observable;
- no muestra información privada ni una solución;
- el CTA siempre dice `Open the situation`, no “prepare the conversation”.

### 5.2 Shared briefing — antes de los roles

Es la pieza central del rediseño. Ambos estudiantes leen exactamente el mismo texto en una sola
pantalla antes de elegir A o B.

Orden obligatorio:

1. **Situation** — personas, lugar, momento y motivo.
2. **What happened** — el contexto inmediato y el hecho que impide continuar normalmente.
3. **Your shared task** — el resultado que deben construir hablando.
4. **Finish when** — una versión corta y no secreta del criterio de cierre.
5. **Say it together** — comprobación oral de 20–30 segundos.

No contiene:

- datos que solo conoce un rol;
- condiciones de aceptación;
- restricciones privadas;
- la solución;
- frases que resuelven la conversación.

El botón para continuar aparece después del briefing:

`We understand — choose roles`

### 5.3 Comprobación de comprensión

No será un quiz escolar ni una pantalla adicional. Será una microtarea oral:

```text
SAY IT TOGETHER

Before you choose roles, tell your partner:
• Where are the passengers going?
• What is wrong with the tickets?
• What do they need to get?
```

Si la pareja no puede responder, todavía no debe abrir las fichas. Esto convierte la claridad en
una conducta observable y da al profesor un punto de diagnóstico inmediato.

### 5.4 Elección de roles

Solo muestra información pública:

```text
ROLE A · PASSENGER          ROLE B · BUS COMPANY AGENT
You start                   You respond

[Open role A]               [Open role B]
[Share role A]              [Share role B]
```

No se muestran objetivos, límites ni hechos privados en esta pantalla.

### 5.5 Private mission card

La ficha privada ya no empieza con metadatos, prosa y tablas. El primer viewport debe poder
escanearse en menos de veinte segundos:

1. **You are** — identidad del rol.
2. **Your goal** — un resultado concreto.
3. **You know** — 3–5 datos privados que debe aportar.
4. **You need to find out** — 2–4 piezas que solo puede obtener preguntando.
5. **You cannot accept** — límites del rol.
6. **Your first move** — función comunicativa, nunca una frase completa lista para leer.

El shared briefing aparece arriba como una franja resumida y plegable. Así el estudiante no
pierde la historia común al entrar en su información privada.

Ejemplo válido de first move:

`Start. Explain the booking problem and give the booking number.`

Ejemplo inválido:

`Hello, I have booking SG-482 and both passengers were assigned seat 12.`

El primero orienta. El segundo escribe el turno por el estudiante.

### 5.6 Help when needed

Datos ampliados, vocabulario, expresiones y caja de herramientas siguen existiendo, pero dejan de
competir con la misión principal.

Se presentan después de la mission card, plegados por defecto:

- `Words you may need`
- `Useful language`
- `Conversation tools`
- `Full case details`

En la mission card pueden aparecer hasta tres “conversation moves” recomendados. El banco
completo conserva los límites del blueprint pedagógico y nunca queda ordenado como un guion.

### 5.7 Speak

No se añade servidor, sala, grabación ni sincronía. La pantalla solo sostiene la conversación:

- muestra `You start` o `Wait for role A/B`;
- mantiene visible `Your goal` y `Finish when`;
- deja la ayuda accesible sin desplazar la misión;
- muestra la carta detrás del botón existente y en el turno global indicado;
- permite volver de la carta sin perder la posición de lectura.

El CTA no dice `Start` si no inicia nada técnicamente. Dice `I am ready to speak` y lleva la
pantalla a la zona de conversación.

### 5.8 Review

El debrief también va en inglés y empieza por el resultado, no por gramática:

1. `What did you decide?`
2. `Which fact changed the conversation?`
3. `What did your partner need from you?`
4. `Say the final agreement again without reading.`

Los enlaces de gramática quedan después del debrief, fuera del flujo activo.

---

## 6. Ejemplo completo A1 — San Gil a Bucaramanga

Este ejemplo fija la forma, no obliga a que este sea el primer escenario publicado.

### 6.1 Tarjeta del catálogo

```text
TRAVEL · A1
Two passengers, one seat

You bought two bus tickets, but both passengers were assigned the same seat.

4 min · 2 people
[Open the situation]
```

### 6.2 Shared briefing

```text
SITUATION

Yesterday, you bought two bus tickets from San Gil to Bucaramanga. You are
traveling with your mother. She has a medical appointment in Bucaramanga at
10:00 a.m. Your bus leaves San Gil at 7:00 a.m.

WHAT HAPPENED

You received the confirmation email, but both passengers were assigned seat 12.
Two people cannot use the same seat.

YOUR SHARED TASK

Talk to the bus company. Get two different seats. Try to keep both passengers
on the same bus and close to each other.

FINISH WHEN

You both know the bus time, the two seat numbers and the final price.
```

### 6.3 Say it together

```text
Before you choose roles, tell your partner:

1. Where are the passengers going?
2. Why do they need to travel?
3. What is wrong with the tickets?
4. What do they need from the bus company?
```

### 6.4 Role A — passenger

```text
YOU ARE
The passenger who bought the tickets. You start.

YOUR GOAL
Get two different seats on a bus that arrives before the appointment.

YOU KNOW
• Booking number: SG-482
• Bus: 7:00 a.m.
• Passenger names: Laura Gómez and Ana Gómez
• Both tickets show seat 12
• The appointment is at 10:00 a.m.

YOU NEED TO FIND OUT
• Which two seats are available
• If the seats are on the same bus
• If there is an extra cost

YOU CANNOT ACCEPT
• A bus that arrives after 9:30 a.m.
• One seat for two passengers

YOUR FIRST MOVE
Explain the ticket problem. Give the booking number.
```

### 6.5 Role B — bus company agent

```text
YOU ARE
The bus company agent. Role A starts.

YOUR GOAL
Correct the booking without putting two people in one seat.

YOU KNOW
• The 7:00 a.m. bus has seats 3 and 18
• Those seats are not together
• The 6:30 a.m. bus has seats 10 and 11 together
• Changing to the 6:30 a.m. bus is free
• You need the booking number and both passenger names

YOU NEED TO FIND OUT
• The booking number
• The passenger names
• The latest acceptable arrival time

YOU CANNOT ACCEPT
• Two passengers in seat 12
• A seat change without checking the names

YOUR FIRST MOVE
Ask for the booking number and the passenger names.
```

### 6.6 Zona de acuerdo

Hay al menos dos resultados posibles:

- conservar el bus de las 7:00 a.m. con asientos 3 y 18;
- cambiar gratis al bus de las 6:30 a.m. con asientos 10 y 11.

La pareja necesita intercambiar la hora de la cita, el límite de llegada, los nombres y la
disponibilidad. Ninguna ficha puede decidir sola.

### 6.7 Complicación A1

La carta va al rol B en el turno global 4:

```text
NEW INFORMATION

The 6:30 a.m. bus will arrive in Bucaramanga at 9:05 a.m., not 8:45 a.m.
Tell the passenger. Check if this still works.
```

La carta cambia un hecho que ya pudo entrar en la conversación y obliga a confirmar de nuevo. No
entrega una solución preparada.

### 6.8 Cierre común

```text
FINISH WHEN BOTH PEOPLE CAN SAY:

• the booking number;
• the bus time;
• the two final seat numbers;
• the arrival time;
• the extra cost, if any.
```

---

## 7. Presupuesto de lectura por nivel

La experiencia conserva profundidad, pero la primera pantalla reduce carga y usa revelado
progresivo.

| Pieza | A1 | A2 | B1 |
|---|---:|---:|---:|
| Shared briefing completo | 60–90 palabras | 80–120 | 120–170 |
| Oraciones del briefing | 7–12 palabras en promedio | 9–15 | 12–20 |
| Mission card inicial | 90–140 palabras | 120–180 | 160–230 |
| Datos privados visibles | 3–5 | 4–6 | 5–8 |
| Piezas que debe averiguar | 2–3 | 2–4 | 3–5 |
| Límites | 1–2 | 2–3 | 2–4 |
| Conversation moves visibles | 2–3 | 3–4 | 3–5 |

El vocabulario, los exponentes y los detalles ampliados se cuentan aparte porque se consultan, no
se leen de corrido. Los topes editoriales vigentes siguen aplicando al contenido total.

### A1

- presente, pasado frecuente con marcadores claros y futuro con `will` cuando haga falta;
- una idea por oración;
- nombres concretos, horas, lugares y números;
- instrucciones con verbos frecuentes: `read`, `ask`, `tell`, `choose`, `finish`;
- nada de negociación implícita o condiciones largas.

### A2

- razones simples, contraste y consecuencias inmediatas;
- dos alternativas visibles, pero no resueltas;
- instrucciones con `explain`, `compare`, `offer`, `check`, `agree`;
- una condición sencilla por movimiento.

### B1

- prioridades en conflicto, consecuencias y resultados parciales;
- información que requiere resumir y reformular;
- más de una condición aceptable;
- registro y relación entre participantes explícitos.

## 8. Dirección visual

### 8.1 Concepto

**Una hoja de briefing para una conversación real**, no un tablero de estadísticas ni un juego de
preguntas. La referencia material es la cue card que un profesor entrega a una pareja: clara,
numerada y hecha para mirar mientras se habla.

La decisión distintiva es eliminar la cuadrícula de tarjetas de la preparación. Situation,
What happened y Shared task forman una sola columna continua con grandes rótulos laterales. La
asimetría aparece solo al abrir los dos sobres de rol.

### 8.2 Sistema visual existente

No se crea otra identidad. Se reutiliza el sistema de Práctica:

| Token | Claro | Uso |
|---|---|---|
| Canvas | `#ffffff` | fondo de lectura |
| Raised | `#f4f4f6` | ayuda y datos secundarios |
| Ink | `#14215c` | texto principal |
| Soft ink | `#4d5878` | apoyo y metadatos |
| Speaking accent | `#a84f08` | progreso, rótulos y acciones |
| Speaking accent dark | `#f2b65a` | equivalente accesible en modo oscuro |

Tipografía:

- **Geist** para títulos, instrucciones y prosa;
- **Geist Mono** para `SITUATION`, `WHAT HAPPENED`, `YOUR TASK`, números, tiempos y códigos;
- cifras tabulares para asientos, horas, precios y reservas.

### 8.3 Firma visual

Una franja llamada **The brief** resume durante toda la experiencia:

```text
SAN GIL → BUCARAMANGA
What happened: both passengers were assigned seat 12
Task: get two valid seats before the appointment
```

En la pantalla compartida está abierta. En las fichas privadas se pliega a una línea. Es la única
pieza visual enfática; el resto permanece sobrio.

### 8.4 Wireframe — pantalla compartida

```text
┌─────────────────────────────────────────────────────────────┐
│ 1 UNDERSTAND  ·  2 CHOOSE  ·  3 PREPARE  ·  4 SPEAK  ·  5 REVIEW
├─────────────────────────────────────────────────────────────┤
│ TRAVEL · A1                                                 │
│ Two passengers, one seat                                    │
│                                                             │
│ SITUATION     Yesterday, you bought two bus tickets...       │
│ WHAT HAPPENED Both passengers were assigned seat 12.         │
│ YOUR TASK     Get two different seats on a suitable bus.     │
│ FINISH WHEN   You know the bus, seats and price.              │
│                                                             │
│ SAY IT TOGETHER                                              │
│ Where are they going? · What is wrong? · What do they need?  │
│                                                             │
│                       [We understand — choose roles]          │
└─────────────────────────────────────────────────────────────┘
```

### 8.5 Wireframe — ficha privada móvil

```text
┌──────────────────────────────┐
│ 3 PREPARE                    │
│ THE BRIEF ▸ SG → BGA         │
├──────────────────────────────┤
│ ROLE A · YOU START           │
│ You are the passenger        │
│                              │
│ YOUR GOAL                    │
│ Get two valid seats...       │
│                              │
│ YOU KNOW                     │
│ • SG-482                     │
│ • 7:00 a.m.                 │
│ • both tickets: seat 12      │
│                              │
│ FIND OUT                     │
│ □ two available seats        │
│ □ extra cost                 │
│                              │
│ CANNOT ACCEPT                │
│ • arrival after 9:30 a.m.   │
│                              │
│ FIRST MOVE                   │
│ Explain the problem.         │
│                              │
│ [I am ready to speak]        │
│ Words ▾  Useful language ▾   │
└──────────────────────────────┘
```

## 9. Contrato de contenido propuesto

La estructura compartida debe ser datos, no párrafos inferidos por el componente:

```ts
type RoleplaySharedBrief = {
  situation: string
  context: string
  sharedTask: string
  finishWhen: string
  checkPrompts: [string, string, string]
}

type RoleplayRoleMission = {
  identity: string
  goal: string
  mustShare: string[]
  findOut: string[]
  limits: string[]
  firstMove: string
}

type RoleplayScenarioPresentationV2 = {
  presentationVersion: 2
  sharedBrief: RoleplaySharedBrief
  roles: [
    RoleplayRole & { mission: RoleplayRoleMission },
    RoleplayRole & { mission: RoleplayRoleMission },
  ]
}
```

### Mapeo desde el modelo actual

| Estado actual | Presentación v2 |
|---|---|
| `titleTarget` secundario | título principal en la ruta de inglés |
| `settingEs` visible | no se renderiza; se reemplaza por `sharedBrief.situation` en inglés |
| situación descubierta dentro de `role.prose` | historia común antes de elegir rol |
| objetivo enterrado en la prosa | `mission.goal` en el primer viewport |
| datos que faltan implícitos | `mission.findOut` explícito |
| límites dentro de varios paneles | `mission.limits` visible |
| etiquetas fijas en español | copy inglesa consistente por todo el flujo |
| gramática dentro de la ficha activa | después del debrief |

La migración no concatena campos existentes automáticamente. Cada escenario necesita revisión
editorial: separar lo verdaderamente común de lo privado es una decisión pedagógica.

## 10. Reglas de seguridad pedagógica

El rediseño no puede ganar claridad destruyendo el juego:

1. el shared briefing nunca filtra la condición privada de un rol;
2. la shared task nombra el problema, no la solución;
3. `firstMove` nombra una función, no entrega una frase completa;
4. `findOut` exige preguntas y no repite datos que ya están en la parte común;
5. el resumen persistente nunca cambia cuando se abre un rol;
6. las dos fichas conservan objetivos incompatibles o parcialmente compatibles;
7. el cierre común sigue siendo idéntico;
8. cualquier edición de contenido invalida la simulación anterior, según
   [`METODOLOGIA-HABLA-ACOMPANADA.md`](METODOLOGIA-HABLA-ACOMPANADA.md).

## 11. Validación con estudiantes

### 11.1 Piloto mínimo

Primero se construye **un prototipo A1 no conectado al catálogo vivo**, usando el caso de
San Gil–Bucaramanga. Se prueba con los mismos estudiantes que reportaron el problema y, si es
posible, con 6–10 parejas nuevas.

El profesor no explica el ejercicio. Solo observa.

### 11.2 Medidas

| Señal | Objetivo de aprobación |
|---|---:|
| Parejas que pueden decir Situation + What happened + Task antes de elegir rol | ≥ 90 % |
| Parejas que producen el primer turno sin pregunta al profesor | ≥ 80 % |
| Tiempo mediano desde abrir el rol hasta el primer turno | ≤ 45 s |
| Parejas que llegan al finish line | ≥ 80 % |
| Aclaraciones del profesor sobre “qué hay que hacer” | máximo 1 por cada 5 parejas |
| Parejas que leen la ficha del otro | 0 |

Además se pregunta al final:

1. `What did you have to do?`
2. `Which part of the page helped you understand that?`

Si la respuesta depende de que el profesor haya explicado el caso, el prototipo falla aunque la
conversación haya ocurrido.

## 12. Criterios de aceptación del producto

### Idioma

- cero strings españolas dentro de la superficie de Speaking de inglés;
- `lang="en"` en briefing, ficha, toolkit, carta y debrief;
- lectura ajustada al nivel mediante los presupuestos de §7;
- inglés americano consistente.

### Comprensión

- Situation, What happened y Shared task aparecen antes de los roles;
- el estudiante no necesita abrir una ficha para entender el caso;
- existe la microtarea `Say it together`;
- cada rol explicita goal, know, find out, limits y first move.

### Privacidad y tensión

- la pantalla compartida no contiene datos privados;
- A y B siguen teniendo URLs separadas;
- un slug o rol inválido devuelve 404;
- la ayuda no forma un diálogo lineal;
- la carta sigue aislada y abre en el turno global correcto.

### Interfaz

- primer viewport de la ficha contiene toda la misión esencial en móvil;
- ayuda secundaria plegada y accesible con teclado;
- foco visible, encabezados en orden y reduced motion respetado;
- modo oscuro conserva contraste y jerarquía;
- la barra de recorrido no promete sincronía ni progreso guardado.

### Regresión

- se conservan 20 escenarios por conjunto, dos roles por escenario y las rutas actuales;
- el modo solo no cambia;
- guardianes de Habla y Práctica, TypeScript y build permanecen verdes;
- cualquier conjunto reescrito se recertifica con cinco perfiles por escenario.

## 13. Plan de implementación después de aprobar

### Fase 0 — Prototipo, fuera de producción

- construir el shared briefing y la mission card con un fixture A1;
- usar el caso San Gil–Bucaramanga;
- probar escritorio y móvil;
- pilotar con estudiantes y registrar las medidas de §11.

### Fase 1 — Motor v2

- añadir el contrato estructurado;
- crear componentes compartidos para brief, progress rail y mission card;
- traducir toda la copy fija del recorrido de inglés;
- mantener rutas, privacidad, carta y límites actuales;
- añadir un guardián contra strings españolas en las rutas inglesas.

### Fase 2 — Migrar las 60 prácticas de inglés

- A1, A2 y B1 se editan en ramas de contenido, veinte escenarios completos por nivel;
- cada escenario obtiene shared brief y mission cards nuevas;
- las ediciones se recertifican con los cinco perfiles;
- el registro vivo no muestra una mezcla de presentaciones dentro de un mismo nivel;
- el cambio se activa solo cuando el conjunto completo pasa todas las puertas.

### Fase 3 — Piloto de producción controlado

- publicar un nivel inglés completo desde `main`;
- verificar sus 20 briefings, 40 fichas, toolkit, cartas y 404;
- observar la clase real antes de migrar el siguiente nivel;
- corregir el motor compartido, no parches por escenario, cuando el problema sea de comprensión.

### Fase 4 — Generalización

Solo después de validar inglés se decide cómo aplicar el patrón a Coreano, Francés, Italiano,
Portugués, Alemán, Ruso y Japonés. La arquitectura será compartida; la redacción seguirá siendo
nativa de cada idioma y nivel.

## 14. Fuera de alcance

Este rediseño no añade:

- IA conversacional;
- micrófono o evaluación automática;
- emparejador;
- sala sincronizada;
- traducción al español durante el ejercicio;
- progreso persistente;
- reescritura inmediata de los otros siete idiomas;
- cambios en producción antes del piloto.

## 15. Decisión que debe aprobar David

La propuesta concreta es:

> En Speaking de inglés, los estudiantes primero leen juntos Situation, What happened y Shared task
> en inglés ajustado al nivel. Solo después eligen roles. Cada ficha privada abre con una mission
> card breve —goal, know, find out, limits, first move— y deja vocabulario, expresiones y detalles
> como ayuda progresiva. El primer prototipo será A1 con el caso San Gil–Bucaramanga; no se migra
> el catálogo hasta que estudiantes reales puedan explicar qué deben hacer sin ayuda del profesor.
