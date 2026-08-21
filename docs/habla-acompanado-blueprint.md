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
| **Datos duros** | Fecha, hora, precio, nombre, número, en forma de nota. **Nunca una frase decible.** | O traduce literal, o lee la ficha en voz alta |
| **Vocabulario** | 8 a 10 palabras que este rol necesita **aquí** y que un A2 probablemente no tiene, con su definición en inglés sencillo | Se sabe qué decir y no con qué palabra |
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
| **A2** | 5–8 | 6–9 | pedir un favor, dar una razón, disculparse, proponer alternativa, quejarse con educación, conceder poniendo una condición simple | ironía, concesión larga («aunque… lo cierto es que…»), discurso indirecto extenso |
| **B1** | 6–9 | 8–12 | negociar, poner un límite, rechazar sin ofender, insistir, resumir el acuerdo | registro jurídico o técnico, humor que dependa de la cultura |

Los minutos salen de la simulación, no del deseo. La primera versión de esta tabla daba 4-6
minutos al A2 y a la vez le permitía 9 turnos por rol: dieciocho turnos no caben en cuatro
minutos, y las simulaciones se pasaron entre un 17 % y un 53 % en los ocho escenarios. Si un
escenario dura más de lo que dice, se corrige el número —no se apura al estudiante.

Cada exponente del andamiaje se ancla al registro de gramática del nivel
(`src/data/grammar/registry`). Si el acto exigido necesita una estructura que ese nivel no ha
visto, el escenario baja de nivel o se reescribe el acto. No se sube el listón «porque se
entiende».

## 5. Reparto del conjunto — lo que no se ve escenario a escenario

Un set de 8 escenarios puede tener 8 escenarios buenos y ser malo. Los repartos se miden
sobre el set completo, con script, no a ojo. Es la misma lección de [[pedagogy-defectos-de-conjunto]].

**Se mide lo que se produce, no lo que se declara.** Un escenario etiquetado `pedir-favor`
puede obligar a rechazar, proponer una alternativa y pedir aclaración por el camino: contado
por etiquetas, el set salió variado; contado por turnos escritos, `rechazar` y
`proponer-alternativa` aparecían en **8 de 8**. La etiqueta dice de qué va el escenario; el
reparto se calcula sobre los turnos que la pareja tiene que producir para llegar al cierre.

**Y se mide en cuota de turnos, no en «en cuántos escenarios aparece».** Esto lo corrige la
auditoría del 21 de agosto de 2026, que encontró la frase anterior contradiciéndose consigo
misma: pedir que ningún acto salga en más del 40 % de los escenarios es inalcanzable en cuanto
cuentas turnos, porque toda conversación de adultos contiene una negativa y una alternativa —el
umbral exigía menos de cinco actos distintos por escenario y el molde tiene cinco—. Lo que sí
dice algo es **qué porcentaje de los turnos del set entero pide cada acto**.

| Reparto | Regla |
|---|---|
| **Actos de habla** | Ningún acto por encima del **30 % de los turnos** del set, y **ninguno de los declarados por debajo del 3 %**. Lo primero evita el nivel monotema; lo segundo caza el acto de adorno —medido: `insistir` salía en 1 turno de 145 y `recomendar` en 4, los cuatro del mismo escenario— |
| **Poder** | El estudiante manda en al menos 3 de cada 8. Si siempre pide permiso, nunca aprende a concederlo |
| **Quién arranca** | Entre 40 % y 60 % para cada rol a lo largo del set |
| **Desenlace** | Al menos un «sin acuerdo» y un «acuerdo parcial» por cada 8. No todo termina bien |
| **Culpa** | El problema no lo causa el estudiante en más de la mitad de los casos |
| **Género** | Ni el poder ni la culpa se concentran en un género. Se cuenta quién manda en escena, quién decide fuera, quién gana y quién causa el problema. Ojo con arreglarlo del revés: en la primera corrección el sesgo se espejó —4 de 4 mandando mujeres, y los 2 hombres nombrados eran los culpables— y eso no es equilibrio |
| **Escenografía** | Máximo 2 de 8 en aula. La vida pasa en otros sitios |

## 6. Las doce puertas

El guardián no publica un set que falle una sola.

1. **Asimetría** — cada ficha tiene al menos un dato que la otra no.
2. **Zona de acuerdo** — existe una salida que los dos aceptarían, y no es obvia.
3. **Cero frase calcable** — ninguna ficha trae la frase que hay que decir, ni en español ni en inglés (ver §11).
4. **Andamiaje** — en **dos piezas separadas**, y esto no es organización, es lo que impide
   que se convierta en un guion (ver §10): la **caja de herramientas del nivel**, común a los
   ocho escenarios, y **6 a 10 exponentes propios** de este rol en este escenario. Ninguna
   fila resuelve la conversación, y **la tabla leída en orden tampoco puede ser la
   conversación**.
5. **Carga** — ningún rol por debajo del 40 % de la conversación, medido en **palabras**, no
   en turnos. Un «Mm» cuenta como turno: hubo simulaciones con el 50 % de los turnos y el
   10 % de las palabras que pasaban esta puerta con las dos manos atadas.

   **Se mide sobre las parejas de perfil parejo** —sólido+sólido y flojo+flojo—, y solo sobre
   ellas. Esto lo corrige el diagnóstico del 21 de agosto de 2026: la puerta se estaba midiendo
   sobre la pareja del **callado**, cuyo perfil dice literalmente «responde con una a tres
   palabras». Ahí el 80/20 no es un resultado, es el enunciado, y la puerta es insatisfacible:
   para que el otro no pasara del 60 % tendría que ser mudo también. Medido donde toca, el
   mismo set pasaba 14 de 14 con un peor caso de 62/38.

   **Al callado se le mide otra cosa**, porque medirle palabras no dice nada: **¿produjo las
   piezas que solo él tiene?** El dato oculto, la condición, su parte del cierre. Un callado que
   consigue su objetivo asintiendo es un defecto del escenario —el objetivo tiene que exigir
   producir algo—, y ese sí va a `habla-escenarios`.

   Y una condición de la medida: **un solo contador, y declarado**. En la ronda que destapó
   esto, dos escenarios contaban «palabras propias» descontando lo leído, cuatro contaban en
   bruto y uno midió una sola de sus cinco parejas: el 79/21 de uno de ellos era 64/36 con el
   otro criterio, y pasaba.
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
  data: { label: string; value: string }[]   // datos duros en nota, jamás una frase decible
  vocab: { word: string; whatItIs: string; here: string }[]  // 8-10, definición en inglés (§11)
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

Y hay una regla de diseño que se deduce de aquello, porque ninguna pantalla arregla una
carta mal pensada: **una carta que quita una palanca premia mirarla antes** —si sabes que
vas a perder el argumento, no lo usas y no pierdes nada—; **una carta que asigna una tarea
nueva, o que rompe un hecho que ya dijiste en voz alta, no se puede aprovechar mirándola**.
Escribe siempre las del segundo tipo. Cada escenario dice por escrito qué pasa si se mira
antes de tiempo, y la respuesta tiene que ser «nada bueno».

## 10. Las dos piezas del andamiaje

Medido sobre las doce fichas de la primera versión: **seis de cada diez filas eran la misma
función en los doce roles** —saludar, despedirse, pedir que te repitan, reformular, decir por
qué algo importa—, y a cada rol le quedaban 4,6 filas para lo que solo se dice en su
escenario. Peor: con saludo en la fila 1 y despedida en la fila 10, y más filas que turnos,
**la tabla leída de arriba abajo era la conversación entera**. La puerta 4 se cumplía fila a
fila y se rompía en el conjunto de la tabla.

Y no se arregla subiendo el tope. Cada ronda de auditoría pide media docena de funciones
nuevas; con un tope fijo, cada ronda echa fuera algo que hacía falta —así se quedó un
escenario cuyo tercer acto es proponer alternativas sin ninguna forma de proponer una—.

Se separan:

| | Qué lleva | Dónde vive |
|---|---|---|
| **Caja de herramientas del nivel** | Lo que sirve en cualquier conversación: abrir, cerrar, agradecer, pedir que repitan, **reformular lo propio**, decir por qué algo te importa, callar sin mentir | Una sola vez por nivel, visible desde cualquier ficha |
| **Exponentes del escenario** | 6 a 10. Solo lo que se dice **aquí**: el acto que toca, la pieza del regateo, el término técnico y su glosa | En la ficha del rol |

La caja es común pero **no es plana**: el que manda y el que pide no abren igual, y quien
suelta jerga necesita reformular mientras el otro necesita preguntar. La caja trae las dos
mitades y cada ficha señala cuáles le tocan.

Regla de reparto: si una forma sirve igual en cinco escenarios, es de la caja. Si solo se
entiende sabiendo de qué va este escenario, es de la ficha.

## 11. La ficha está en inglés, y por eso hay que escribirla distinto

**Decisión de David, 20 de agosto de 2026.** La ficha entera va en el idioma que se estudia. No
es una traducción de la versión en español: es lo que convierte el ejercicio en circular —se
lee en inglés y después se habla en inglés, y la lectura deja de ser un trámite para ser la
mitad del ejercicio.

**El riesgo que introduce, y cómo se cierra.** Con la ficha en español era físicamente imposible
leerla en voz alta. En inglés, se puede — y si se puede, se hace. Por eso:

> **En las tablas** —datos duros, vocabulario, la carta— se escribe en notas, no en frases.
> `Exam: Saturday 12, 8:00 a.m.` sí. `I'm taking the exam on Saturday at eight.` no, jamás.
> Las frases decibles viven **solo** en la tabla de exponentes, que es donde el estudiante sabe
> que va a buscarlas.
>
> **En la prosa** —situación, objetivo, restricciones, dato oculto, lo que se pierde— se escribe
> en **inglés A2 legible**: oraciones cortas y completas, no telegramas. Y ninguna de esas
> oraciones puede ser algo que el jugador diría: se escriben *sobre* él, no *por* él.

Ese reparto lo corrige la auditoría de equidad del 21 de agosto de 2026, y corrige una regla
mía. Aplicar el telegrama a la prosa hizo aparecer líneas como `if nobody goes: her news,
tonight` o `then the boy: thirty minutes alone at the daycare door`. Un lector A2 **no
reconstruye** esa oración: en su lengua la adivinaría, en L2 no. La regla existía para que no se
pudiera calcar la ficha, y al llevarla a la prosa consiguió que no se pudiera leer, que es peor.

La prueba de calcabilidad sigue en pie y no se relaja: `You need someone to open on Saturday`
es prosa legible y no se puede decir tal cual —habla de él en segunda persona—; `I need someone
to open on Saturday` sí se podría, y por eso no se escribe.

Prueba para el redactor: si una línea de tu ficha se puede decir tal cual en la conversación y
el turno avanza, esa línea está mal escrita. Reescríbela como dato.

El inglés de la ficha es **A2 leído**, que aguanta un poco más que el A2 hablado: frases cortas,
presente y pasado simple, cero subordinación larga. Si una instrucción no cabe en A2, es que la
instrucción es demasiado complicada.

**Variedad: americana.** `road work`, no `roadworks`. `gas`, no `petrol`. Vale para los ocho
escenarios y para los 23 niveles que vengan detrás.

### El bloque de vocabulario

Es pieza obligatoria y va **antes** de los exponentes, porque saber qué decir no sirve de nada
sin la palabra. De 8 a 10 entradas por rol, y solo las de **este** rol en **este** escenario: la
palabra que necesita quien está detrás del mostrador no es la que necesita quien está delante.

| Columna | Qué lleva |
|---|---|
| `word` | La palabra o el trozo, tal como se dice |
| `what it is` | Definición **en inglés sencillo**, no traducción. `shift — the hours you work in one day` |
| `here` | Para qué le sirve en esta conversación concreta |

**Cuidado con la columna `here`: es la más calcable de la ficha entera.** Medido en la primera
tanda del formato nuevo, es donde se concentran los fallos —explicar para qué sirve una palabra
empuja sola hacia la frase que se dice con ella—. Y en un escenario llegó a entregar el dato
oculto ya convertido en frase lista para pronunciar, que es exactamente lo que la ficha no puede
hacer.

Se escribe como **nota de propósito, no como ejemplo**: `your way out — you must offer two ways`
sí; `you can say "we can split it"` no. Si la celda contiene algo entrecomillado o algo que
empiece por un pronombre y un verbo conjugado, reescríbela.

Se eligen por una prueba, no por intuición: **¿puede este rol llegar al cierre sin esta
palabra?** Si sí, fuera. Entran las que aparecen en los datos duros del propio rol, las que le
va a soltar el otro, y las del oficio de la escena.

### Cuánto ocupa una ficha

Se mide **la prosa aparte de las tablas**, porque no cuestan lo mismo de leer: una tabla se
consulta, un párrafo se lee entero. Contar las dos juntas es lo que hace que un presupuesto
parezca incumplido cuando no lo está.

| Nivel | Prosa | Tablas |
|---|---|---|
| **A1-A2** | **≤ 450 palabras**, apuntando a 400 | datos ≤ 10 filas · vocabulario 8-10 · exponentes 6-9 |
| **B1-B2** | ≤ 600 | datos ≤ 14 · vocabulario 10-12 · exponentes 8-10 |
| **C1-C2** | sin tope fijo | ahí la ficha puede ser un documento de verdad — un contrato, un informe |

Medido sobre el escenario 3: la ficha en español gastaba **798 palabras de prosa**; la misma
ficha en inglés, con el bloque de vocabulario añadido, gasta **346**. El corte es real y es lo
que se buscaba.

**El techo de 450 sale de medir, no de desear.** La primera versión de esta tabla puso 350, y
ese número salió de contar a mano una sola ficha —la del molde— con un contador improvisado.
Medidas las dieciséis con el contador canónico
(`artifacts/habla-a2/fase7-scripts/prosa-canonica.mjs`), la media es **425** y solo una baja de
350: la ficha B del propio molde se va a 376. Cuando el molde no cumple su propio techo, el
techo está mal, no el molde. El juego de piezas obligatorio —situación, objetivo, dos o tres
restricciones, el dato oculto, lo que se pierde, la caja, los criterios y el cierre— cuesta unas
425 palabras, y bajar de ahí obliga a quitar una pieza. **Se corta prosa, nunca una pieza.**

El contador es uno y está en el repo por un motivo: las ocho fichas de esa ronda declaraban
cumplir con **seis contadores distintos**, y dos auditorías dieron 9 y 15 fichas fuera de techo
sobre el mismo contenido. Un umbral sin un contador único no es un umbral. Se corta prosa, no piezas:
la situación pasa de párrafo a dos líneas, el objetivo de explicación a frase, y lo que cabe en
una tabla no se cuenta en un texto.

El molde vivo está en `artifacts/habla-a2/fase7-modelo-ficha-en.md`. Los escenarios nuevos se
escriben contra él, no contra esta descripción.
