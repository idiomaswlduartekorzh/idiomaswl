# Revisión editorial de Writing laboral · 19 de noviembre de 2026

Estado: **preview en inglés; corrección global pendiente**. Esta revisión responde a dos
observaciones del propietario: la longitud de las opciones revela la clave y las tres
casillas de análisis resultan poco naturales. El texto de la experiencia sigue en el
idioma estudiado; este documento de trabajo está en español.

## Diagnóstico medido

`npm run audit:writing-workplace-length` lee los 24 bancos publicados y mide las
1.920 preguntas. Usa palabras para inglés, francés, alemán, italiano, portugués y ruso;
caracteres de letras/números para japonés y coreano. Una clave es «la más larga» solo
cuando supera estrictamente a ambos distractores.

| Grupo | Clave únicamente más larga | Media clave / media distractores |
|---|---:|---:|
| B2 | 434/640 (67,8 %) | Varía por idioma |
| C1 | 577/640 (90,2 %) | Varía por idioma |
| C2 | 552/640 (86,3 %) | Varía por idioma |
| Evidence | 314/480 (65,4 %) | 1,46× |
| Scope | 350/480 (72,9 %) | 1,52× |
| Intent | 449/480 (93,5 %) | 1,81× |
| Purpose | 450/480 (93,8 %) | 1,97× |
| **Total, con el preview aplicado** | **1.563/1.920 (81,4 %)** | **1,69×** |

El problema es especialmente fuerte en Intent y Purpose: la clave suele enumerar
varias acciones prudentes mientras que los distractores contienen una sola afirmación
breve y burda. Acortar a ciegas la clave borraría la distinción que el alumno debe
aprender; añadir palabras vacías a los distractores tampoco mejoraría el ejercicio.
La clave es únicamente la más corta en solo 48/1.920 preguntas; el auditor informa
ambos extremos para que la corrección no cree la pista inversa.

## Criterio de reescritura

Cada trío debe presentar opciones de **especificidad y extensión comparables**, sin
igualar mecánicamente el número de palabras. Un distractor puede ser plausible pero
omitir una condición, convertir una hipótesis en certeza o proponer una acción fuera
del alcance del remitente. El feedback debe explicar ese error concreto. Se conserva
una única clave respaldada por los hechos, la dificultad propia del nivel y la
variedad de posiciones de respuesta.

Ejemplo del caso de marketing «The form that wasn't broken»:

| | Antes | Preview |
|---|---|---|
| Nota 1 | “What is a confirmed fact?” | “What does the document confirm?” |
| Nota 2 | “What has someone assumed?” | “What does the sender assume?” |
| Nota 3 | “What can you take responsibility for?” | “What can you clarify or check next?” |
| Clave de Intent | “A reliable timeline and a plan for checking the impact.” | “A timeline and a plan to check the impact.” |
| Distractor de Intent | “Proof that Marketing caused the problem.” | “Proof that Marketing alone caused the launch delay.” |
| Otro distractor | “A promise that only three people were affected.” | “A guarantee that exactly three people were affected by the delay.” |

La tercera casilla ya no presupone que el estudiante causó el problema. Los
placeholders indican qué tipo de respuesta escribir y las instrucciones aclaran que
son notas breves para preparar el correo. C1 pide comparar versiones y reconocer
incertidumbre; C2 pide delimitar qué puede afirmarse y qué puede prometerse.

## Preview implementado

Se reescribieron las tres preguntas de las casillas para inglés B2, C1 y C2, y las
opciones de tres casos ingleses B2 en marketing, software y administración sanitaria:
`form-never-opened`, `saved-filter` y `referral-received`. En sus 12 preguntas, la
clave únicamente más larga pasó de **7/12 a 4/12**; solo en una es la más corta, y
ninguna clave supera al distractor más largo por más de dos palabras. Se mantuvieron
las mismas claves, referencias a evidencia y explicaciones.

## Umbral de aceptación para escalar

Antes de publicar cada banco de 80 preguntas:

1. Reducir «la clave es únicamente la más larga» a **como máximo 40 %**, sin crear
   una pista inversa por longitud corta. Revisar también la razón de longitud y
   cada caso con una diferencia marcada; una media global por sí sola oculta fallos.
2. Leer las tres opciones sin mirar la clave: las tres deben sonar como decisiones
   que una persona podría tomar en esa situación, y solo una debe respetar todos
   los hechos, límites y responsabilidades.
3. Verificar que la versión más breve sigue enseñando la misma distinción de
   Evidence, Scope, Intent o Purpose. Mantener feedback específico por opción.
4. Revisar las casillas en el idioma estudiado con un lector humano; adaptar la
   expresión natural de cada lengua, sin traducir literalmente las frases inglesas.
5. Correr el harness de 480 casos, catálogo, TypeScript, build y recorrido visual
   antes de integrar. El auditor de longitud será una puerta de release cuando
   los 24 bancos cumplan el umbral; hoy es solo un informe para evitar bloquear
   los bancos publicados durante la revisión.

La prioridad editorial es Intent y Purpose de C1/C2, donde la pista es casi
universal. Después siguen B2 y las otras dos dimensiones. Ningún cambio de este
preview debe presentarse como corrección de los 1.920 ítems.
