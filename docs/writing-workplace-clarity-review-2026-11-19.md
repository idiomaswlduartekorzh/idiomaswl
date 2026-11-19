# Revisión editorial de Writing laboral · 19 de noviembre de 2026

Estado: **publicado en `main` y producción**. Esta revisión responde a dos
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

## Implementación y resultado

El preview inicial cubrió tres casos ingleses B2 de marketing, software y
administración sanitaria: `form-never-opened`, `saved-filter` y
`referral-received`. Tras su aprobación se revisaron las opciones de los 24 bancos
de inglés, francés, alemán, italiano, portugués, ruso, japonés y coreano, en B2,
C1 y C2. Se reescribieron las tres preguntas, sus ayudas y la consigna de análisis
de cada nivel en cada idioma estudiado.

| Eje | Clave únicamente más larga antes | Después |
|---|---:|---:|
| Evidence | 314/480 (65,4 %) | 189/480 (39,4 %) |
| Scope | 350/480 (72,9 %) | 219/480 (45,6 %) |
| Intent | 449/480 (93,5 %) | 101/480 (21,0 %) |
| Purpose | 450/480 (93,8 %) | 96/480 (20,0 %) |
| **Total** | **1.563/1.920 (81,4 %)** | **605/1.920 (31,5 %)** |

La clave es ahora la única más corta en **545/1.920 (28,4 %)**, frente a 48
antes de la revisión. El cociente medio entre longitud de la clave y la media de
los distractores bajó de **1,69× a 1,11×**. El auditor comprueba tanto palabras
o caracteres de la lengua como longitud visual, y los 24 bancos pasan sus límites
individuales. En portugués B2/C2, ruso B2/C2 y japonés C1/C2, la proporción de
claves más largas quedó exactamente en el máximo de 32/80: una edición futura
debe volver a ejecutar el control.

La revisión mantuvo identificadores, orden, claves y referencias de evidencia.
Los editores revisaron matices eliminados al acortar claves y casos donde un
distractor exponía su propio error; se corrigieron también las explicaciones que
dejaron de corresponder a la nueva redacción. El harness de 480 casos, sus 13
pruebas y el auditor de longitud pasaron tras esos ajustes. Una prueba de
estructura contra la versión de la rama confirmó que no cambiaron datos ajenos
a las opciones y su feedback.

## Umbral de aceptación para escalar

Antes de publicar cada banco de 80 preguntas:

1. Reducir «la clave es únicamente la más larga» a **como máximo 40 %** por banco.
   La clave debe ser únicamente la más corta en **al menos 15 % y como máximo 40 %**:
   así tampoco se aprende a descartar siempre la opción breve. Revisar la opción
   intermedia, los empates, la razón de longitud y cada trío con una diferencia
   marcada; una media global por sí sola oculta fallos. En idiomas con espacios,
   medir también la longitud visual por caracteres: la clave no debe ser la más
   larga en más del 50 % ni la más corta en menos del 10 % de cada banco.
2. Leer las tres opciones sin mirar la clave: las tres deben sonar como decisiones
   que una persona podría tomar en esa situación, y solo una debe respetar todos
   los hechos, límites y responsabilidades.
3. Verificar que la versión más breve sigue enseñando la misma distinción de
   Evidence, Scope, Intent o Purpose. Mantener feedback específico por opción.
4. Revisar las casillas en el idioma estudiado con un lector humano; adaptar la
   expresión natural de cada lengua, sin traducir literalmente las frases inglesas.
5. Correr el harness de 480 casos, catálogo, TypeScript, build y recorrido visual
   antes de integrar. El auditor de longitud ya es una puerta de release en
   `prebuild`; una regresión de cualquier banco detiene el build.

La revisión corrigió el sesgo de longitud en las 1.920 preguntas y la redacción de
las tres casillas en los 24 recorridos. El auditor mide pistas de longitud; la
plausibilidad de cada distractor y la naturalidad de la lengua requieren lectura
editorial al ampliar o modificar casos.
