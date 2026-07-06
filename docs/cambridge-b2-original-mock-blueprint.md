# Cambridge B2 First - Original Mock Blueprint

Fecha de auditoria: 2026-07-03

## Objetivo

Crear mocks originales para Cambridge B2 First (FCE) en idiomaswl.com, usando la estructura oficial del examen y una auditoria de formato de Test-English como referencia de organizacion, no como fuente de contenido.

Regla legal y editorial: no copiar textos, preguntas, opciones, audios, imagenes, scripts ni prompts de Test-English ni de materiales oficiales Cambridge. Todo mock publicado debe ser contenido propio de WeLearn, con fuentes visuales/audios propios, licenciados o generados internamente.

## Fuentes Revisadas

- Cambridge English - B2 First exam format: https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/format/
- Cambridge English - B2 First preparation resources: https://www.cambridgeenglish.org/exams-and-tests/qualifications/first/preparation/
- Cambridge English - B2 First Handbook for teachers: https://www.cambridgeenglish.org/Images/167791-b2-first-handbook.pdf
- Test-English - B2 First landing: https://test-english.com/exams/b2-first/
- Test-English - Exam 1 Reading and Use of English: https://test-english.com/exams/b2-first/b2-first-fce-exam-1-reading-and-use-of-english/
- Test-English - Exam 1 Writing: https://test-english.com/exams/b2-first/b2-first-fce-exam-1-writing/
- Test-English - Exam 1 Speaking: https://test-english.com/exams/b2-first/b2-first-fce-exam-1-speaking/

## Base Oficial B2 First

| Paper | Tiempo | Partes | Items | Peso |
|---|---:|---:|---:|---:|
| Reading and Use of English | 75 min | 7 | 52 | 40% |
| Writing | 80 min | 2 | 2 tareas | 20% |
| Listening | aprox. 40 min | 4 | 30 | 20% |
| Speaking | 14 min por pareja | 4 | evaluacion oral | 20% |

Para esta fase trabajaremos Reading and Use of English, Writing y Speaking. Listening queda fuera salvo que creemos scripts y audios propios.

## Reading and Use of English - Especificacion

Raw marks totales: 70.

| Parte | Items | Marks | Tipo | Enfoque |
|---|---:|---:|---|---|
| 1 | 8 | 8 | Multiple-choice cloze | lexico, collocations, fixed phrases, phrasal verbs, precision semantica |
| 2 | 8 | 8 | Open cloze | gramatica funcional y vocabulario gramatical |
| 3 | 8 | 8 | Word formation | familias de palabras, prefijos/sufijos, cambios internos, compuestos |
| 4 | 6 | 12 | Key word transformations | gramatica, vocabulario, collocation, equivalencia de significado |
| 5 | 6 | 12 | Multiple-choice reading | detalle, opinion, actitud, tono, proposito, idea principal, implicacion |
| 6 | 6 | 12 | Gapped text | cohesion, desarrollo textual, referencia anaforica, conectores |
| 7 | 10 | 10 | Multiple matching | informacion especifica, detalle, opinion, actitud |

Texto total recomendado por Cambridge: 2,200-2,500 palabras de lectura en el paper completo. Para nuestro generador, usar esta distribucion aproximada:

- Partes 1-3: textos breves de 150-230 palabras cada uno.
- Parte 5: texto largo de 550-700 palabras.
- Parte 6: texto de 500-650 palabras con 6 espacios y 7 opciones.
- Parte 7: texto seccionado o varios textos cortos, 500-750 palabras en total.

## Auditoria Test-English

Test-English sigue el esqueleto oficial: 7 paginas para Reading and Use of English, numeracion 1-52, Writing en dos paginas y Speaking en tres paginas que agrupan Part 3 y Part 4. La estructura es util como referencia de UX: cada parte vive en una pagina separada, con instrucciones visibles, navegacion por numero de ejercicio y explicacion debajo.

Hallazgos utiles para nuestro mock original:

- Reading Part 1 usa un texto divulgativo con 8 huecos y 4 opciones por hueco. Conviene imitar el tipo de decision lexical, no el tema ni las opciones.
- Reading Part 2 usa un texto informativo corto con huecos de una palabra. Hay que cuidar que las respuestas sean mayormente palabras gramaticales, no vocabulario abierto ambiguo.
- Reading Part 3 usa un texto corto con stems en mayusculas. Buen patron: mezclar sustantivos, adjetivos, adverbios, negativos y pluralizacion.
- Reading Part 4 mantiene las 6 transformaciones con palabra clave y limite de 2-5 palabras. En nuestra plataforma deberia renderizarse como input abierto, no como MCQ, para mayor fidelidad.
- Reading Part 5 usa una narracion con 6 preguntas A-D. Esto encaja con el formato oficial, pero nuestros textos deberian tener mas densidad inferencial y menos respuestas demasiado literales.
- Reading Part 6 usa un articulo con 6 huecos y 7 frases. Debemos asegurar que cada opcion tenga anclajes de cohesion claros: pronombres, conectores, progresion logica y referencias temporales.
- Reading Part 7 usa secciones A-E y 10 enunciados. En nuestra plataforma es mejor usar `matching` o un select por item, no MCQ repetido, para que visualmente se parezca al examen.
- Writing Part 1 depende de una imagen para parte del prompt en Test-English. Nosotros debemos codificar el prompt completo como texto accesible.
- Writing Part 2 ofrece tres opciones de produccion. Esto encaja con el handbook de B2 First; si mas adelante queremos cubrir variante con set text, la agregamos como opcion editorial separada.
- Speaking Part 1 tiene categorias personales y follow-ups. Nuestro banco debe evitar preguntas demasiado B1; cada categoria debe pedir opiniones, razones, comparaciones o experiencias.
- Speaking Part 2 usa dos pares de imagenes, una pregunta comparativa para cada candidato y una pregunta breve para el partner. Las imagenes deben ser propias/licenciadas/generadas.
- Speaking Part 3 usa una pregunta central con cinco prompts y luego una decision. Esto debe quedar como mind map o lista visual.
- Speaking Part 4 enlaza preguntas de discusion al tema de Part 3. Deben escalar hacia opinion abstracta y justificacion, no quedarse en preferencias personales.

## Blueprint Para Crear Mocks Originales

### Reading and Use of English

Cada mock debe tener 7 secciones independientes:

1. Part 1 - Multiple-choice cloze
   - Tema sugerido: ciencia cotidiana, cultura, tecnologia, medio ambiente, educacion o trabajo.
   - 8 huecos, 4 opciones A-D.
   - Distractores plausibles por collocation o significado cercano.
   - Evitar que todas las respuestas sean la opcion A/B/C/D en patron reconocible.

2. Part 2 - Open cloze
   - 8 huecos de una palabra.
   - Mezclar articulos, auxiliares, relativos, preposiciones, cuantificadores, linking words y estructuras fijas.
   - Cada hueco debe tener una respuesta principal y variantes aceptables solo si no cambian registro ni significado.

3. Part 3 - Word formation
   - 8 stems en mayusculas.
   - Incluir al menos: 2 sustantivos, 2 adjetivos, 1 adverbio, 1 negativo, 1 plural o forma derivada compleja.
   - Evitar stems con demasiadas soluciones naturales.

4. Part 4 - Key word transformations
   - 6 items, 2 marks cada uno.
   - Palabra clave no modificable.
   - Respuesta de 2-5 palabras incluyendo la palabra clave.
   - Areas a rotar: reported speech, passive/causative, conditionals, comparatives, modal deduction, inversions suaves, phrasal verbs, fixed expressions, despite/although, used to/be used to.
   - Recomendacion tecnica: migrar de MCQ a `fill` o `formgroup` para aceptar texto abierto.

5. Part 5 - Multiple-choice reading
   - Texto de 550-700 palabras.
   - 6 preguntas con 4 opciones.
   - Debe incluir preguntas de purpose, implication, attitude, reference, detail y global meaning.
   - Distractores: parcialmente verdaderos, demasiado generales, contradiccion sutil o idea de otro parrafo.

6. Part 6 - Gapped text
   - Texto de 500-650 palabras.
   - 6 huecos y 7 frases A-G.
   - Cada frase removida debe tener anclaje antes y despues.
   - Incluir una opcion extra plausible pero descartable por referencia/logica.

7. Part 7 - Multiple matching
   - 4-5 secciones o varios textos breves.
   - 10 statements.
   - Reutilizar secciones de forma equilibrada.
   - Recomendacion tecnica: usar `MatchingGroupQuestion` cuando sea posible.

### Writing

Crear una seccion con dos tareas:

1. Part 1 - Essay obligatorio
   - 140-190 palabras.
   - Contexto: "In your English class..."
   - Una afirmacion o pregunta de interes general.
   - Dos notas obligatorias + tercera idea propia.
   - El candidato debe dar opinion, razones y ejemplos.

2. Part 2 - Elegir una opcion
   - 140-190 palabras.
   - Tres prompts originales por mock.
   - Rotar generos: article, email/letter, review, report.
   - Cada prompt debe especificar audiencia, proposito y puntos de contenido.

Criterios de evaluacion que debe mostrar/guardar la plataforma:

- Content: responde a todos los puntos y el lector queda informado.
- Communicative Achievement: registro, genero, tono y proposito adecuados.
- Organisation: parrafos, cohesion, progresion logica.
- Language: rango y control de vocabulario/gramatica.

### Speaking

Crear 4 partes en una seccion o varias subsecciones:

1. Part 1 - Interview
   - 2 minutos por pareja.
   - 3-4 categorias por mock.
   - 4-5 preguntas por categoria.
   - Follow-ups con why/why not, examples, past/future, comparison.

2. Part 2 - Long turn
   - Dos pares de imagenes.
   - Candidate A: compare + pregunta especulativa/opinion.
   - Candidate B: respuesta breve de 30 segundos sobre las imagenes de A.
   - Candidate B repite con otro par.
   - Usar imagenes propias/licenciadas/generadas; nunca hotlinking ni imagenes de Test-English.

3. Part 3 - Collaborative task
   - Pregunta central + 5 prompts.
   - 15 segundos de preparacion.
   - 2 minutos de discusion.
   - 1 minuto para decision/conclusion.

4. Part 4 - Discussion
   - 5-7 preguntas conectadas al tema de Part 3.
   - Escalar desde experiencia/opinion hacia temas sociales, educativos, laborales o culturales.
   - Incluir prompts del interlocutor: "What do you think?", "Do you agree?", "And you?"

Criterios de Speaking:

- Grammar and Vocabulary.
- Discourse Management.
- Pronunciation.
- Interactive Communication.
- Global Achievement.

## Checklist De Calidad Antes De Publicar

- [ ] No hay contenido copiado de Test-English, Cambridge ni otra fuente protegida.
- [ ] Reading and Use of English tiene exactamente 52 preguntas numeradas 1-52.
- [ ] Distribucion correcta: 8, 8, 8, 6, 6, 6, 10.
- [ ] Raw marks de Reading and Use of English suman 70.
- [ ] Writing tiene 2 tareas, 140-190 palabras cada una.
- [ ] Speaking tiene 4 partes y simula pareja de candidatos.
- [ ] Los distractores son plausibles y no dependen de conocimiento externo.
- [ ] Las respuestas correctas no forman patrones visibles.
- [ ] Las instrucciones son equivalentes al examen oficial, redactadas por nosotros.
- [ ] Las imagenes de Speaking tienen licencia limpia o fueron generadas internamente.
- [ ] Si hay audio futuro, el script, voces y archivos son propios o licenciados.
- [ ] La implementacion usa tipos existentes de `src/data/mocks/types.ts` siempre que sea posible.

## Ajustes Recomendados Al Mock Actual

El archivo existente `src/data/mocks/cambridge-b2-set-1.ts` ya contiene un mock original y cubre las habilidades principales. Para subir fidelidad FCE:

- Cambiar Reading Part 4 de MCQ a input abierto (`fill` o `formgroup`) para respetar key word transformations.
- Cambiar Reading Part 6 a un grupo visual de matching/gapped text si la UI lo permite.
- Cambiar Reading Part 7 a `matching` para no repetir opciones A-D/E como MCQ.
- Separar Writing Part 2 en tres opciones visibles, no una sola opcion.
- Representar Speaking Part 2 con pares de imagenes reales/generadas y preguntas de follow-up por candidato.
- Agregar rubricas visibles para Writing y Speaking en el contenido del mock o en la pantalla de revision.

## Temas Originales Sugeridos Para Set 2

- Reading Part 1: repair cafes and sustainable habits.
- Reading Part 2: the rise of micro-libraries in neighbourhoods.
- Reading Part 3: urban wildlife photography.
- Reading Part 5: a young professional changing careers after a volunteer project.
- Reading Part 6: how cities adapt unused buildings for community use.
- Reading Part 7: four people describing unusual learning experiences.
- Writing Part 1: whether schools should teach practical life skills.
- Writing Part 2 options: article about a memorable local event, formal email suggesting improvements to a course, review of a documentary or exhibition.
- Speaking Part 3/4: how communities can help teenagers feel more connected.

Estos temas son solo semillas. Los textos, preguntas, opciones, respuestas e imagenes deben generarse desde cero.
