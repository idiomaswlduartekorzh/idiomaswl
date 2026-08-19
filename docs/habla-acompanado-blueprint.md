# Habla acompañada — blueprint y puertas de calidad

Fuente de verdad de los juegos de rol para dos personas de `/practica/<idioma>/<nivel>/habla`.
Si un agente y este documento se contradicen, manda este documento. Si este documento y lo
que David decida se contradicen, manda David **y hay que corregir este documento**.

Estado: **decisiones de producto cerradas el 19 de agosto de 2026.** Contenido: cero
escenarios escritos todavía. Ver [[project-speaking-blueprint]] para el histórico.

---

## 1. Qué es esto, y qué no es

Al entrar en la destreza de habla el estudiante elige entre dos modos:

| Modo | Con quién | Estado |
|---|---|---|
| **Habla solo** | Nadie. Es lo que hay hoy: 20 frases con fonética y checkbox. | En producción, no se toca en este bloque |
| **Habla acompañada** | **Otra persona real**: un compañero, el profesor, un amigo, la pareja. | Lo que se construye ahora |

Cerrado y no se rediscute salvo que David lo reabra:

- **No hay personaje de IA.** El interlocutor es humano.
- **No hay micrófono ni reconocimiento de voz.** `SpeechRecognition` no existe en Firefox y
  es irregular en iOS Safari; el modo acompañado no depende de él.
- **No hay servidor ni sala sincronizada.** Cada rol tiene **su propia URL**. Dos móviles, o
  un móvil y un portátil, o una pantalla que se pasa. Nada que sincronizar, nada que caerse,
  y cada URL es una página indexable más.
- **Piloto: inglés A2.** 6 a 8 escenarios. Los otros 7 idiomas y los otros 2 niveles esperan
  a que el piloto convenza.

**Lo que hace interesante un juego de rol no es el tema, es la asimetría.** Dos personas que
quieren lo mismo terminan en dos turnos. La gracia está en que cada uno sabe algo que el
otro no y quiere algo que el otro no quiere dar.

## 2. Anatomía de un escenario

Nueve piezas. Falta una y el escenario se muere de una de las seis maneras de §3.

| Pieza | Qué es | Si falta |
|---|---|---|
| **Situación** | Dónde, cuándo, qué acaba de pasar. Una frase. | Nadie sabe qué tono usar |
| **Objetivo propio** | Qué tiene que conseguir *este* rol. Concreto y verificable. | Se conversa sin rumbo |
| **Restricciones** | Lo que este rol **no** puede hacer o decir. 2 o 3. | Se resuelve por la vía fácil y no se produce lengua |
| **Dato oculto** | Algo que este rol sabe y el otro no | No hay razón para preguntar |
| **Datos duros** | Fecha, hora, precio, nombre, número. **Nunca frases en español.** | El A2 traduce literal y sale spanglish |
| **Andamiaje** | 6 a 10 expresiones en el idioma meta, con su uso y su registro. Opcionales. | El flojo se bloquea y se pasa al español |
| **Complicación** | Una carta que entra a mitad y va **a un solo rol** | La conversación se aplana |
| **Criterio de cierre** | Cómo saben los dos que terminó y con qué | Se apaga sin final |
| **Debrief** | 3 preguntas para después, en español | Se habla y no se aprende |

**La ficha del rol A no contiene nunca la ficha del rol B.** Ni resumida. Si el estudiante ve
lo que el otro quiere, deja de escuchar y empieza a esperar su turno.

## 3. Las seis maneras de morir

Ninguna se ve leyendo la ficha de un rol por separado. Todas se ven al simular la pareja.

1. **Colapso en tres turnos.** B puede decir «sí» a la primera. *Cura:* B tiene una razón
   concreta para negarse, y **una condición** bajo la cual acepta. Esa condición es el juego.
   **Y el reverso, que se olvida siempre:** blindar el «sí» no basta. Si decir «no» —o
   levantarse e irse— cierra la conversación sin coste, el que quiere salir del paso gana en
   dos turnos sin romper una sola regla. Los dos jugadores tienen que perder algo si se van
   sin acuerdo. Medido en la simulación de agosto de 2026: el atajista ganaba 4 de 8
   escenarios, y todos por esta puerta.
2. **El monólogo.** Un rol pide y el otro solo juzga. *Cura:* el que tiene el poder también
   necesita algo del otro (una fecha, un compromiso, una explicación que le sirva).
3. **El ping-pong.** Preguntas cerradas y respuestas de una palabra. *Cura:* al menos dos
   datos que solo salen preguntando abierto.
4. **La traducción literal.** La ficha trae la frase hecha en español y el alumno la calca.
   *Cura:* datos, no frases. «Examen: viernes 14, 7 a.m.», no «Dile que no puedes el viernes».
5. **El final sin final.** Nadie sabe cuándo parar. *Cura:* criterio de cierre escrito en
   **las dos** fichas, con las mismas palabras.
6. **La vía única.** Solo hay un desenlace posible. *Cura:* dos salidas aceptables como
   mínimo, y que la pareja elija cuál.

## 4. Qué se le puede pedir a cada nivel

| Nivel | Minutos | Turnos por rol | Actos que se pueden exigir | Lo que todavía no |
|---|---|---|---|---|
| **A1** | 3–4 | 4–6 | pedir algo, dar datos personales, decir precio y hora, aceptar o rechazar de frente | negociar, matizar, rechazar de forma indirecta |
| **A2** | 4–6 | 6–9 | pedir un favor, dar una razón, disculparse, proponer alternativa, quejarse con educación, conceder poniendo una condición simple | ironía, concesión larga («aunque… lo cierto es que…»), discurso indirecto extenso |
| **B1** | 6–9 | 8–12 | negociar, poner un límite, rechazar sin ofender, insistir, resumir el acuerdo | registro jurídico o técnico, humor que dependa de la cultura |

Cada exponente del andamiaje se ancla al registro de gramática del nivel
(`src/data/grammar/registry`). Si el acto exigido necesita una estructura que ese nivel no ha
visto, el escenario baja de nivel o se reescribe el acto. No se sube el listón «porque se
entiende».

## 5. Reparto del conjunto — lo que no se ve escenario a escenario

Un set de 8 escenarios puede tener 8 escenarios buenos y ser malo. Los repartos se miden
sobre el set completo, con script, no a ojo. Es la misma lección de [[pedagogy-defectos-de-conjunto]].

| Reparto | Regla |
|---|---|
| **Actos de habla** | Ningún acto en más del 40 % de los escenarios. Nada de ocho quejas seguidas |
| **Poder** | El estudiante manda en al menos 3 de cada 8. Si siempre pide permiso, nunca aprende a concederlo |
| **Quién arranca** | Entre 40 % y 60 % para cada rol a lo largo del set |
| **Desenlace** | Al menos un «sin acuerdo» y un «acuerdo parcial» por cada 8. No todo termina bien |
| **Culpa** | El problema no lo causa el estudiante en más de la mitad de los casos |
| **Escenografía** | Máximo 2 de 8 en aula. La vida pasa en otros sitios |

## 6. Las doce puertas

El guardián no publica un set que falle una sola.

1. **Asimetría** — cada ficha tiene al menos un dato que la otra no.
2. **Zona de acuerdo** — existe una salida que los dos aceptarían, y no es obvia.
3. **Cero español calcable** — ninguna ficha trae la frase que hay que decir.
4. **Andamiaje** — 6 a 10 exponentes por rol, en el idioma meta, con uso y registro; ninguno resuelve la conversación entero.
5. **Carga** — ningún rol por debajo del 40 % de la conversación, medido en **palabras**, no
   en turnos. Un «Mm» cuenta como turno: hubo simulaciones con el 50 % de los turnos y el
   10 % de las palabras que pasaban esta puerta con las dos manos atadas. Se cuenta sobre la
   simulación, no sobre el previsto.
6. **Complicación colocada** — entra entre el turno **global** 3 y 6, y va a un solo rol.
   Cuidado con el enunciado: «ábrela al terminar tu cuarto turno» suena a lo mismo y no lo
   es —el cuarto turno de un rol es el turno global 7 u 8, o sea después del final útil—.
   El disparador se escribe siempre en turnos globales.
7. **Cierre** — escrito, idéntico en las dos fichas.
8. **Nivel** — cada acto y cada exponente existen en el nivel, anclados al registro de gramática.
9. **Registro** — está dicho quién trata a quién de usted, y el idioma lo soporta.
10. **Equidad** — sin conocimiento cultural que la ficha no dé, sin escenario que duela, sin rol humillante.
11. **Simulación** — la pareja sólida llega al cierre; la floja llega con el andamiaje; nadie lo resuelve en menos de 6 turnos.
12. **Conjunto** — el set pasa los seis repartos de §5.

## 7. Forma de los datos

Propuesta, a confirmar por `habla-integracion` contra el repo:

```ts
type SpeechAct =
  | 'pedir-favor' | 'rechazar' | 'negociar' | 'disculparse' | 'quejarse'
  | 'proponer-alternativa' | 'dar-mala-noticia' | 'insistir' | 'poner-limite'
  | 'pedir-aclaracion' | 'conceder-con-condicion' | 'recomendar'

type RoleplayRole = {
  id: string; label: string; labelTarget: string
  situation: string          // solo lo ve este rol
  goal: string
  constraints: string[]
  secret?: string
  data: { label: string; value: string }[]   // datos duros, jamás frases en español
  exponents: { form: string; use: string; register: 'formal' | 'neutro' | 'informal' }[]
  successCriteria: string[]
}

type RoleplayScenario = {
  id: string; slug: string; sequence: number
  level: 'a1' | 'a2' | 'b1'; language: string
  title: string; titleTarget: string
  setting: string
  speechActs: SpeechAct[]
  power: 'a>b' | 'b>a' | 'igual'
  initiator: 'a' | 'b'
  outcome: 'acuerdo' | 'acuerdo-parcial' | 'sin-acuerdo' | 'aplazado'
  minutes: number; turnsTarget: number
  roles: [RoleplayRole, RoleplayRole]
  twist: { afterTurn: number; toRole: 'a' | 'b'; card: string }
  closing: string
  grammarReferences: { slug: string; title: string; rationale: string }[]
  debrief: string[]
}
```

Los campos `speechActs`, `power`, `initiator` y `outcome` no son adorno: son lo que hace
medible el §5. Sin ellos el reparto se juzga a ojo, y a ojo no se ve.

## 8. Lo que el motor no hace hoy

Se dice, no se disimula:

- **No hay sincronía entre las dos pantallas.** El temporizador y la carta de complicación
  los abre cada uno en su URL. Si hace falta que la carta salte a la vez, es producto nuevo.
- **No se graba nada.** No hay evidencia de que la conversación ocurrió, ni evaluación
  automática, ni progreso guardado.
- **No hay emparejador.** Si el estudiante no tiene con quién, este modo no le sirve: se va
  a «habla solo».

## 9. La carta va en su propia pantalla

No es un detalle de maquetación. En las simulaciones, la carta impresa debajo del andamiaje
se leyó sola: es justo la zona que el estudiante flojo consulta cada dos turnos. Y verla
antes no solo estropea la sorpresa —en un escenario **hacía salir mejor**, porque se cumplía
el objetivo antes y más limpio. Un incentivo que premia mirar antes enseña a mirar antes.

La carta vive detrás de un botón, en su propia vista, con el turno global escrito encima.
Nunca en la misma página que el andamiaje. Va en el encargo de `habla-integracion`.
