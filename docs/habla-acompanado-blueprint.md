# Habla acompañada — blueprint y puertas de calidad

Fuente de verdad de las decisiones pedagógicas de los juegos de rol para dos personas de
`/practica/<idioma>/<nivel>/habla`. La fuente ejecutable del contenido publicado es
`src/data/practica/habla-acompanado/`; las auditorías intermedias son evidencia, no runtime.
Si un agente y este documento se contradicen, manda este documento. Si este documento y lo
que David decida se contradicen, manda David **y hay que corregir este documento**.

Estado: **motor, Inglés completo, Coreano A2, Francés A2 e Italiano A2 integrados el 24 de agosto de 2026.**
El registro vivo sirve 120 escenarios, 240 fichas separadas, seis cajas propias, rutas
estáticas por rol y guardián estructural. La fase 2 continúa con los otros cinco conjuntos A2.
La decisión de producto vigente es llegar a **20 prácticas por nivel, 60 por idioma y 480 en
total**. El piloto ya no es una puerta para decidir si se expande: es la primera cohorte de la
expansión descrita en §13.

---

## 1. Qué es esto, y qué no es

Al entrar en la destreza de habla el estudiante elige entre dos modos:

| Modo | Con quién | Estado |
|---|---|---|
| **Habla solo** | Nadie. 20 frases con fonética y seguimiento local. | Conservado en `/habla/solo` |
| **Habla acompañada** | **Otra persona real**: un compañero, el profesor, un amigo, la pareja. | 120 de 480 escenarios publicados; meta cerrada en §1.1 |

Cerrado y no se rediscute salvo que David lo reabra:

- **No hay personaje de IA.** El interlocutor es humano.
- **No hay micrófono ni reconocimiento de voz.** `SpeechRecognition` no existe en Firefox y
  es irregular en iOS Safari; el modo acompañado no depende de él.
- **No hay servidor ni sala sincronizada.** Cada rol tiene **su propia URL**. Dos móviles, o
  un móvil y un portátil, o una pantalla que se pasa. Nada que sincronizar, nada que caerse,
  y cada URL es una página indexable más.
- **Cobertura cerrada:** inglés, coreano, francés, italiano, portugués, alemán, ruso y japonés;
  niveles A1, A2 y B1; 20 escenarios en cada combinación.

**Lo que hace interesante un juego de rol no es el tema, es la asimetría.** Dos personas que
quieren lo mismo terminan en dos turnos. La gracia está en que cada uno sabe algo que el
otro no y quiere algo que el otro no quiere dar.

## 1.1. Decisión de escala: 20 × 3 × 8

Una **práctica** es un escenario completo para dos personas. No es una ficha de rol, una frase
del modo solo ni una variante de la misma conversación. Cada práctica produce una página de
elección y dos fichas privadas —A y B—, pero cuenta una sola vez en el catálogo.

| Idioma | Slug | A1 | A2 | B1 | Total | Publicado hoy | Pendiente |
|---|---|---:|---:|---:|---:|---:|---:|
| Inglés | `ingles` | 20 | 20 | 20 | 60 | 60 | 0 |
| Coreano | `coreano` | 20 | 20 | 20 | 60 | 20 | 40 |
| Francés | `frances` | 20 | 20 | 20 | 60 | 20 | 40 |
| Italiano | `italiano` | 20 | 20 | 20 | 60 | 20 | 40 |
| Portugués | `portugues` | 20 | 20 | 20 | 60 | 0 | 60 |
| Alemán | `aleman` | 20 | 20 | 20 | 60 | 0 | 60 |
| Ruso | `ruso` | 20 | 20 | 20 | 60 | 0 | 60 |
| Japonés | `japones` | 20 | 20 | 20 | 60 | 0 | 60 |
| **Total** | — | **160** | **160** | **160** | **480** | **120** | **360** |

La meta ejecutable incluye además:

- **960 fichas privadas de rol**: dos por escenario.
- **24 cajas de herramientas**: una por idioma y nivel, nunca una caja genérica traducida.
- Secuencias completas `1..20` en cada conjunto, sin huecos ni duplicados.
- Las 20 prácticas del modo **solo** que ya existen se conservan, pero no cuentan dentro de
  estas 480: son otro modo y otra experiencia.

Un conjunto nuevo no se publica con 3, 8 o 15 escenarios «para ir llenando». Se prepara fuera
del registro vivo y entra cuando tiene 20 y pasa todas las puertas. La excepción histórica fue
Inglés A2, que nació con ocho escenarios; quedó cerrada al publicar los veinte el 23 de agosto
de 2026. Desde entonces no existe ningún conjunto parcial en el registro vivo.

## 2. Anatomía de un escenario

Nueve piezas. Falta una y el escenario se muere de una de las seis maneras de §3.

| Pieza | Qué es | Si falta |
|---|---|---|
| **Situación** | Dónde, cuándo, qué acaba de pasar. Una frase. | Nadie sabe qué tono usar |
| **Objetivo propio** | Qué tiene que conseguir *este* rol. Concreto y verificable. | Se conversa sin rumbo |
| **Restricciones** | Lo que este rol **no** puede hacer o decir. 2 o 3. | Se resuelve por la vía fácil y no se produce lengua |
| **Dato oculto** | Algo que este rol sabe y el otro no | No hay razón para preguntar |
| **Datos duros** | Fecha, hora, precio, nombre, número, en forma de nota. **Nunca una frase decible.** | O traduce literal, o lee la ficha en voz alta |
| **Vocabulario** | 8 a 10 palabras que este rol necesita **aquí** y que un estudiante del nivel probablemente no tiene, con su definición en el idioma meta a nivel legible | Se sabe qué decir y no con qué palabra |
| **Andamiaje** | 6 a 10 expresiones en el idioma meta, con su uso y su registro. Opcionales. | El flojo se bloquea y se pasa al español |
| **Complicación** | Una carta que entra a mitad y va **a un solo rol** | La conversación se aplana |
| **Criterio de cierre** | Cómo saben los dos que terminó y con qué | Se apaga sin final |
| **Debrief** | 3–4 preguntas para después, en español | Se habla y no se aprende |

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

Un set de 20 escenarios puede tener 20 escenarios buenos y ser malo. Los repartos se miden
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
| **Poder** | `a>b` aparece al menos 6 veces y `b>a` al menos 6; `igual` completa el resto. Ningún nombre o género concentra el poder |
| **Quién arranca** | Cada rol inicia entre 8 y 12 de las 20 conversaciones |
| **Desenlace** | Mínimo 3 «acuerdo parcial», 2 «sin acuerdo» y 2 «aplazado»; «acuerdo» no supera 13 de 20 |
| **Carta** | La complicación va al rol A entre 8 y 12 veces y al B en el resto |
| **Culpa** | Ningún rol, nombre o género causa el problema en más de 10 de 20 |
| **Género** | Ni el poder ni la culpa se concentran en un género. Se cuenta quién manda en escena, quién decide fuera, quién gana y quién causa el problema. Ojo con arreglarlo del revés: en la primera corrección el sesgo se espejó —4 de 4 mandando mujeres, y los 2 hombres nombrados eran los culpables— y eso no es equilibrio |
| **Escenografía** | Máximo 5 de 20 en aula y mínimo 5 familias de contexto distintas. La vida pasa en otros sitios |

### La parrilla de veinte

Cada conjunto cubre cinco familias con cuatro prácticas cada una. La familia fija cobertura;
no obliga a repetir los mismos argumentos entre idiomas.

| Secuencias | Familia | Ejemplos de terreno, no títulos obligatorios |
|---|---|---|
| 1–4 | **Transacciones cotidianas** | comprar, reservar, devolver, pedir un servicio |
| 5–8 | **Estudio y trabajo** | horarios, tareas, turnos, prioridades, desacuerdos |
| 9–12 | **Casa y comunidad** | convivencia, vecinos, favores, eventos, normas comunes |
| 13–16 | **Movilidad y servicios** | transporte, salud no clínica, viajes, trámites sencillos |
| 17–20 | **Planes y problemas** | cambios, tecnología cotidiana, decisiones compartidas, imprevistos |

La progresión vive dentro de cada familia: A1 intercambia datos y necesidades directas; A2
explica, propone y condiciona; B1 negocia prioridades, límites y consecuencias. Un título
parecido en dos niveles no autoriza a reciclar la conversación cambiando cuatro palabras.

## 6. Las doce puertas

El guardián no publica un set que falle una sola.

1. **Asimetría** — cada ficha tiene al menos un dato que la otra no.
2. **Zona de acuerdo** — existe una salida que los dos aceptarían, y no es obvia.
3. **Cero frase calcable** — ninguna ficha trae la frase que hay que decir, ni en la lengua de apoyo ni en el idioma meta (ver §11).
4. **Andamiaje** — en **dos piezas separadas**, y esto no es organización, es lo que impide
   que se convierta en un guion (ver §10): la **caja de herramientas del idioma y nivel**,
   común a sus veinte escenarios, y **6 a 10 exponentes propios** de este rol en este escenario. Ninguna
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
12. **Conjunto** — el set pasa todos los repartos de §5.

## 7. Forma de los datos

El contrato ejecutable vive en `src/data/practica/habla-acompanado/types.ts`. Esta es la forma
objetivo para la expansión; cualquier diferencia descubierta al implementarla se corrige en el
tipo y en este documento en el mismo commit:

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
  vocab: { word: string; reading?: string; whatItIs: string; here: string }[]
  exponents: { form: string; reading?: string; use: string; register: 'formal' | 'neutro' | 'informal' }[]
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

`reading` es opcional y solo existe para apoyo de escritura no latina (§11). No contiene una
traducción ni una respuesta lista. El registro de conjuntos añade `language`, `level`, etiqueta,
20 escenarios y una caja; las rutas leen ese registro, nunca importan un archivo concreto por
nombre.

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

## 11. La ficha está en el idioma meta, y por eso hay que escribirla distinto

**Decisión de David, 20 de agosto de 2026; generalizada a los ocho idiomas el 23 de agosto.**
La ficha entera va en el idioma que se estudia. No es una traducción de una versión maestra en
español o inglés: es lo que convierte el ejercicio en circular —se lee en el idioma meta y
después se habla en él, y la lectura deja de ser un trámite para ser la mitad del ejercicio.

**El riesgo que introduce, y cómo se cierra.** Con la ficha en español era físicamente imposible
leerla en voz alta. En inglés, se puede — y si se puede, se hace. Por eso:

> **En las tablas** —datos duros, vocabulario, la carta— se escribe en notas, no en frases.
> `Exam: Saturday 12, 8:00 a.m.` sí. `I'm taking the exam on Saturday at eight.` no, jamás.
> Las frases decibles viven **solo** en la tabla de exponentes, que es donde el estudiante sabe
> que va a buscarlas.
>
> **En la prosa** —situación, objetivo, restricciones, dato oculto, lo que se pierde— se escribe
> al **nivel legible del conjunto**: oraciones cortas y completas, no telegramas. Y ninguna de esas
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

**Y la tabla de exponentes entra en la prueba, aunque sus frases sean decibles a propósito.**
Durante cinco rondas se declaró «fuera de alcance» —yo la dejé fuera— y por eso nadie la miró
nunca. Ahí estaba escondido el defecto que se perseguía: en un escenario, **la cola de la tabla
era el cierre entero, en orden**. Con leerla de arriba abajo se resolvía la conversación.

Lo que se audita en ella no es si sus frases se pueden decir —claro que sí—, sino **si la tabla
leída en orden es la conversación**: que esté agrupada por función y ordenada alfabéticamente
por función, que no haya más filas que turnos, y que ninguna secuencia de filas reproduzca el
cierre ni el arranque. Una tabla que se puede seguir como un guion no es andamiaje: es el
ejercicio ya hecho.

**Contra qué extremo de la banda se cuentan las filas.** Casi todas las fichas declaran una banda
(`6-9 turnos por rol`), así que «no más filas que turnos» era ambiguo, y en un escenario esa
ambigüedad tapó nueve filas para ocho turnos. Se mide **contra el número que la ficha declara**, y
si declara banda, **contra su techo**. No contra el suelo: una pareja que resuelva en seis turnos
usa un subconjunto de la tabla, que es exactamente lo que `use it or don't` autoriza. Quien impide
que la tabla sea un guion no es el recuento de filas, son las otras tres pruebas — y la cuarta que
falta:

**La fila que concede se mira aparte.** Medir solo secuencias deja pasar el caso peor: la fila del
otorgamiento —`granting it`— sola, en la última posición, le dice al estudiante *cuándo* soltar la
condición que decide el desenlace. Apareció en cinco de los ocho escenarios y en ninguno lo cazó la
prueba de secuencia. Etiquétese por función (`granting it`, nunca `yes, with a condition` ni
`your condition`) y compruébese que el alfabético no la deja ni primera ni última.

**Una etiqueta no puede nombrar un momento.** `how you walk in`, `the two questions before you
leave`, `the message you send`: el alfabético baraja las filas y una etiqueta que dice *cuándo*
—o que lleva dentro las palabras literales del cierre— le devuelve el orden al estudiante. Las
etiquetas nombran función, no posición.

La lengua de la ficha se calibra como **nivel leído**, que aguanta un poco más que el nivel
hablado, pero no autoriza instrucciones por encima del MCER declarado. Si una instrucción no
cabe en el nivel, es que la instrucción es demasiado complicada.

### Convenciones por idioma

- **Inglés:** variedad americana en los 60 escenarios: `road work`, no `roadworks`; `gas`,
  no `petrol`.
- **Francés, italiano, portugués, alemán y ruso:** cada escenario declara trato formal o
  informal y no cambia de pronombre o tratamiento a mitad de ficha sin que sea parte explícita
  del conflicto.
- **Coreano y japonés:** cada escenario declara relación, jerarquía y grado de cortesía. No se
  presenta una forma neutra como si sirviera con cualquier interlocutor.
- **Coreano, japonés y ruso:** `reading` puede acompañar vocabulario y exponentes en A1, aparece
  solo donde sea pedagógicamente necesario en A2 y se retira por defecto en B1. La escritura
  original siempre es primaria; romanización o lectura nunca la sustituye.
- **Todos:** la interfaz, el reparto de roles y el debrief pueden orientar en español; la ficha
  privada, los datos, el vocabulario, los exponentes, la carta y el cierre viven en el idioma meta.

No se traduce una misma parrilla de veinte. Se pueden compartir actos de habla y dificultad,
pero cada idioma recibe situaciones naturales para su uso, sus tratamientos y su vida cotidiana.
Una revisión lingüística debe poder decir «esto fue escrito en este idioma», no «esto vino del inglés».

### El bloque de vocabulario

Es pieza obligatoria y va **antes** de los exponentes, porque saber qué decir no sirve de nada
sin la palabra. De 8 a 10 entradas por rol, y solo las de **este** rol en **este** escenario: la
palabra que necesita quien está detrás del mostrador no es la que necesita quien está delante.

| Columna | Qué lleva |
|---|---|
| `word` | La palabra o el trozo, tal como se dice |
| `what it is` | Definición sencilla **en el idioma meta**, no traducción. En inglés: `shift — the hours you work in one day` |
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

El molde histórico que produjo el piloto está en
`artifacts/habla-a2/fase7-modelo-ficha-en.md` dentro de la rama de auditoría. Los escenarios
nuevos se escriben contra las reglas de este documento y se incorporan al registro runtime.

## 12. Integración publicada por el código

El contrato de rutas es el mismo para las 24 combinaciones y ninguna se mantiene como lista
de contenido paralela:

1. `/practica/<idioma>/<nivel>/habla` — elige entre práctica individual y en pareja.
2. `/habla/solo` — conserva las veinte frases existentes de ese idioma y nivel.
3. `/habla/acompanada` — deriva los veinte escenarios del conjunto publicado.
4. `/habla/acompanada/<slug>` — reparte roles sin mostrar información secreta.
5. `/habla/acompanada/<slug>/<a|b>` — ficha privada; la carta sustituye la pantalla cuando
   se abre y puede volver a cerrarse.
6. `/habla/acompanada/herramientas` — caja del idioma y nivel actuales.

Los 24 árboles de ruta ya tienen una página de habla propia. La expansión conserva esos puntos
de entrada y extrae adaptadores delgados compartidos; no copia el motor 24 veces. Todo enlace de
`RoleplayExperience` se construye desde `scenario.language` y `scenario.level`: después de la
migración no queda ningún `ingles/a2` clavado dentro del componente compartido.

### Fuente de verdad y tamaño de los archivos

`ROLEPLAY_SETS` sigue siendo el catálogo vivo. Cada entrada apunta a un conjunto completo y a
su caja. Para que 480 escenarios no conviertan un archivo en zona de conflicto, la estructura
objetivo es:

```text
src/data/practica/habla-acompanado/
  types.ts
  index.ts                         # registro de los 24 conjuntos publicados
  <idioma>/<nivel>/
    scenarios-01-05.ts
    scenarios-06-10.ts
    scenarios-11-15.ts
    scenarios-16-20.ts
    toolkit.ts
    index.ts                       # ensambla y exporta este conjunto
```

La secuencia, slug y metadatos viven dentro del escenario. Los cuatro archivos por conjunto son
unidades editoriales, no cuatro catálogos: el `index.ts` solo los concatena y el guardián exige
la secuencia exacta `1..20`.

### Guardián monotónico

`npm run check:habla-acompanada` deja de importar `ROLEPLAY_INGLES_A2` y recorre el registro.
Mantiene dos mapas explícitos:

- **Piso publicado:** cuenta mínima por conjunto que nunca puede bajar. Nació con
  `ingles-a2: 8`; los tres conjuntos ingleses están ahora en 20. Añadir un conjunto nuevo lo
  incorpora directamente con 20.
- **Meta:** las 24 combinaciones, todas con 20. Permite medir avance sin fingir que un borrador
  ya está publicado.

El piso solo sube. Bajar un número para hacer pasar CI equivale a borrar contenido y está
prohibido. Los conjuntos en redacción no entran en `ROLEPLAY_SETS`; se validan con el mismo
script en modo borrador y se integran cuando llegan completos.

Por cada conjunto el guardián verifica, como mínimo:

- 20 escenarios, secuencia `1..20`, ids y slugs únicos y dos roles distintos.
- Nivel e idioma iguales a los de su entrada de catálogo.
- Rangos de minutos, turnos, vocabulario, exponentes y prosa del §4 y §11.
- Carta en turno global 3–6, cierre común, debrief y referencias gramaticales que existen.
- Las doce puertas y los repartos de §5 calculados sobre el conjunto completo.
- Caja propia del idioma y nivel, rutas, metadatos, sitemap y `generateStaticParams`.
- Ausencia de enlaces o textos clavados a otro idioma o nivel.

El guardián transversal `check:practica-catalog` protege el registro, el motor y el piso
publicado contra una integración que los borre en silencio. La meta final queda cerrada cuando
ambos guardianes cuentan **24 conjuntos, 480 escenarios y 960 roles**.

## 13. Plan de expansión

La unidad de producción es **un conjunto de veinte**, pero la unidad de trabajo es una tanda de
cinco. Se pueden revisar cuatro tandas en paralelo sin publicar una colección incompleta.

| Fase | Entrega | Escenarios nuevos | Acumulado publicado |
|---|---|---:|---:|
| 0 | Generalizar tipos, rutas, enlaces, registro y guardián | 0 | 8 |
| 1 | Inglés: completar A2 (+12), crear A1 (20) y B1 (20) | 52 | 60 |
| 2 | A2 de los otros siete idiomas | 140 | 200 |
| 3 | A1 de los otros siete idiomas | 140 | 340 |
| 4 | B1 de los otros siete idiomas | 140 | 480 |

El orden A2 → A1 → B1 para los otros idiomas permite probar primero el molde más maduro sin
confundir eso con traducción. Dentro de una fase, cada conjunto puede publicarse cuando complete
sus veinte; no necesita esperar a los otros seis idiomas de la misma fase.

### Pipeline editorial de cada conjunto

1. **Matriz:** asignar las veinte secuencias a la parrilla del §5, actos, poder, iniciador,
   desenlace, carta y puntos gramaticales antes de escribir prosa.
2. **Autoría en cuatro tandas:** escribir 1–5, 6–10, 11–15 y 16–20 directamente en el idioma
   meta, con fichas A/B y caja propia.
3. **Revisión lingüística:** nivel, naturalidad, tratamiento, cultura, escritura y lecturas.
4. **Auditoría adversarial:** buscar frase calcable, dato filtrado, salida en tres turnos,
   monólogo, ping-pong, vía única y carta aprovechable antes de tiempo.
5. **Simulación:** parejas sólida+sólida y floja+floja para carga; perfil callado para comprobar
   que produce su dato oculto, condición y parte del cierre.
6. **Integración:** registrar las veinte juntas, generar rutas, ejecutar guardianes, TypeScript
   y build; publicar únicamente desde `main` del repositorio canónico.

### Definición de terminado

Un idioma está terminado cuando sus tres niveles muestran 20 tarjetas cada uno —60 prácticas—,
las 120 fichas de rol responden en sus URLs, las tres cajas son propias y los tres conjuntos
pasan calidad sin excepciones. El programa entero está terminado cuando eso se cumple en los
ocho idiomas y producción sirve la matriz **8 × 3 × 20**, conservando intacto el modo solo.
