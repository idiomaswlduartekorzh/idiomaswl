# TOEFL iBT 2026 — documento maestro de alineación, expansión y cierre

> Estado: especificación operativa para ejecutar por iteraciones pequeñas.
>
> Alcance de esta primera versión: auditoría y plan. Crear este documento no
> autoriza cambios de código, edición de contenido, regeneración de audio,
> consumo de APIs, commits, despliegues ni publicaciones.
>
> Fecha de corte de la evidencia oficial: 9 de agosto de 2026.

---

## Prompt listo para `/loop`

```text
/loop Continúa la auditoría, expansión y cierre de TOEFL iBT 2026 siguiendo
docs/toefl-2026-alignment-loop.md. Lee primero AGENTS.md,
docs/OPERACION-REPOSITORIO.md y este documento completo, incluida la evidencia ya
registrada. Toma únicamente la primera unidad abierta y no bloqueada del tablero.
Mide su estado inicial y resuelve una rebanada vertical pequeña. Antes de crear o
regenerar contenido, reutiliza y audita el banco existente. Después audita la
rebanada, en este orden, como: 1) full-stack, datos y seguridad de repositorio,
2) experto en el TOEFL iBT vigente, 3) editor lingüístico y diseñador instruccional,
4) auditor técnico, lingüístico y humano de audio, 5) revisor multiperspectiva,
anti-sesgo y de derechos, 6) auditor UI/UX y accesibilidad y 7) auditor Playwright
de extremo a extremo. Corrige lo que falle y repite las siete auditorías. Registra
comandos, métricas, archivos, muestras, capturas y evidencia antes/después. No
marques una casilla por una comprobación parcial, no bajes umbrales, no copies
contenido protegido de ETS, no presentes práctica abreviada o fija como examen
completo/adaptativo, no otorgues puntuaciones oficiales a partir de reglas locales,
no sobrescribas los MP3 originales, no generes audio sin un manifiesto de brechas
aprobado y no leas, imprimas, copies ni commitees secretos. No commitees, publiques,
despliegues, cambies remotos ni mezcles cambios ajenos sin autorización explícita.
```

Este prompt es deliberadamente conservador. El costo principal del proyecto está
en el contenido y, en especial, en los audios; por eso el orden obligatorio es
**inventariar → auditar → reutilizar → reparar → generar sólo la brecha**.

---

## 0. Cómo usar este documento

Este archivo es a la vez:

1. contrato de verdad frente al TOEFL iBT vigente;
2. inventario del estado actual de WeLearn;
3. plan de preservación del material existente;
4. especificación editorial, técnica y de audio;
5. tablero de ejecución autónoma;
6. registro de evidencia y decisiones.

Cada iteración debe:

- leer el documento completo;
- escoger sólo la primera unidad abierta y no bloqueada;
- confirmar que sus dependencias estén cerradas;
- medir antes de modificar;
- trabajar una rebanada pequeña y recuperable;
- ejecutar las siete auditorías aplicables;
- dejar evidencia reproducible;
- actualizar este documento en la misma iteración;
- detenerse si el siguiente paso requiere costo, secreto, publicación o una
  decisión humana todavía no concedida.

Una casilla cerrada significa que pasó todos sus criterios de salida, no que se
completó una parte conveniente.

Estados del tablero: `[x]` significa cerrado, `[ ]` abierto y `[~]` diferido o
bloqueado por una decisión explícita. `[~]` nunca equivale a aprobación: la unidad se
omite temporalmente al elegir trabajo, conserva su gate completo y debe reabrirse
antes de cualquier dependencia que la requiera.

---

## 1. Misión y definición del resultado

La misión es transformar los 20 simulacros TOEFL actuales en un sistema de práctica
que se mantenga tan cerca como sea responsable del TOEFL iBT actualizado, sin perder
los textos, preguntas, transcripciones ni 260 audios ya producidos.

El resultado no es simplemente “tener más preguntas”. Debe cumplir simultáneamente:

- estructura y orden coherentes con el examen vigente;
- tipos de tarea, instrucciones e interacciones fieles;
- volumen y tiempos defendibles;
- comportamiento multietapa adaptativo donde se prometa adaptatividad;
- textos originales, naturales y calibrados;
- audios técnicamente limpios, lingüísticamente correctos y comprensibles;
- puntuación y mensajes que no se hagan pasar por resultados oficiales;
- accesibilidad y operación real en móvil y escritorio;
- trazabilidad de cada activo y cada decisión;
- preservación de todo material reutilizable.

La plataforma puede ofrecer varios productos. Lo que no puede hacer es etiquetarlos
de manera ambigua.

### 1.1 Niveles de fidelidad permitidos

| Nivel | Etiqueta visible requerida | Qué puede contener | Qué no puede afirmar |
|---|---|---|---|
| A | Práctica de habilidad | Una tarea o grupo corto | “Simulacro completo” o puntuación TOEFL |
| B | Práctica abreviada | Las cuatro habilidades con menos volumen | Equivalencia en longitud, adaptatividad o score |
| C | Simulacro alineado no adaptativo | Blueprint completo mediante módulos fijos | Que reproduce la selección adaptativa oficial |
| D | Simulacro adaptativo completo | Módulos, ramificación, tiempos y tareas validados | Equivalencia psicométrica u oficialidad ETS |

Hasta que una experiencia pase los gates del nivel C o D, debe permanecer en A o B.
La honestidad del rótulo es parte de la calidad del producto.

La tabla es un resumen. Los criterios verificables, el segundo eje de validación, las
reglas de downgrade y el copy aprobado viven en
`docs/toefl-2026-fidelity-and-disclosure-contract.md`.

---

## 2. Contrato de verdad oficial

### 2.1 Jerarquía de fuentes

Cuando dos referencias difieran, se usa este orden:

1. página operativa vigente de ETS;
2. especificaciones técnicas vigentes de ETS;
3. preguntas frecuentes y material docente vigente de ETS;
4. prácticas oficiales, entendidas como ejemplos y no como réplica exacta;
5. decisiones pedagógicas propias de WeLearn, siempre rotuladas como tales.

No se congelarán números en la aplicación sin guardar fuente, fecha de consulta y
tipo de evidencia. Antes de cerrar una fase de implementación se revalidan todas las
fuentes porque ETS puede actualizar el examen.

### 2.2 Base oficial publicada en la fecha de corte

La página vigente de ETS publica la siguiente estructura de referencia:

| Sección | Orden | Preguntas publicadas | Tiempo base publicado | Rasgo clave |
|---|---:|---:|---:|---|
| Reading | 1 | 50 | 30 min | Multietapa adaptativa |
| Listening | 2 | 47 | 29 min | Multietapa adaptativa |
| Writing | 3 | 12 | 23 min | Tres tipos de tarea |
| Speaking | 4 | 11 | 8 min | Dos tipos de tarea, sin preparación |

Reading y Listening pueden variar por la ruta adaptativa y por la operación del
examen. Esos valores no autorizan a convertir la suma de preguntas o minutos en una
regla local rígida sin revisar la especificación técnica.

La especificación técnica distribuye las tareas así:

| Sección | Tipo de tarea | Rango/volumen oficial de referencia |
|---|---|---:|
| Reading | Complete the Words | 30 |
| Reading | Read in Daily Life | 5–15 |
| Reading | Read an Academic Passage | 5–15 |
| Listening | Listen and Choose a Response | 15–19 |
| Listening | Listen to a Conversation | 10 |
| Listening | Listen to an Announcement | 6–10 |
| Listening | Listen to an Academic Talk | 8–16 |
| Writing | Build a Sentence | 10 |
| Writing | Write an Email | 1 |
| Writing | Write for an Academic Discussion | 1 |
| Speaking | Listen and Repeat | 7 |
| Speaking | Take an Interview | 4 |

Las prácticas oficiales en papel sirven para estudiar ejemplos, formulación e
instrucciones, pero ETS advierte que están adaptadas y no son réplicas exactas del
examen operacional. Por ejemplo, una práctica completa puede mostrar 40 preguntas
de Reading y 34 de Listening; esos números son un **proxy de comparación**, no un
blueprint universal que deba copiarse.

### 2.3 Reglas oficiales que la experiencia debe respetar

- orden: Reading → Listening → Writing → Speaking;
- Reading y Listening: selección multietapa adaptativa cuando el producto se rotule
  como adaptativo;
- no permitir volver de un módulo cerrado a uno anterior;
- en Listening, no exponer navegación hacia preguntas anteriores si la experiencia
  pretende fidelidad de examen;
- Write an Email: referencia de 7 minutos;
- Academic Discussion: referencia de 10 minutos;
- Speaking: no introducir tiempo de preparación cuando la tarea oficial no lo da;
- una simulación local no puede afirmar que su conversión de aciertos reproduce el
  modelo psicométrico de ETS;
- la similitud de formato no autoriza copiar textos, preguntas, audio ni marcas.

### 2.4 Registro obligatorio de divergencias

Toda desviación intencional debe documentar:

| Campo | Descripción |
|---|---|
| `official_rule` | Qué dice la fuente oficial y en qué fecha |
| `welearn_behavior` | Qué hace realmente la plataforma |
| `reason` | Razón pedagógica, técnica o de producto |
| `student_disclosure` | Texto visible que evita una promesa engañosa |
| `owner` | Responsable de resolver o aceptar la desviación |
| `review_date` | Próxima fecha de revisión |

No se admite una desviación implícita.

---

## 3. Línea base medida del repositorio

Estos datos son una fotografía diagnóstica previa. La unidad T00 debe volver a
medirlos antes de cualquier implementación porque el repositorio sigue activo.

### 3.1 Activos existentes que se deben preservar

| Activo | Estado medido |
|---|---:|
| Simulacros fuente | 20 (`toefl-set-1.ts` a `toefl-set-20.ts`) |
| Ítems declarados por set | 57 |
| Ítems visibles/calificables por set | 56 |
| MP3 TOEFL existentes | 260 |
| Audios por set | 13 |
| Listen and Choose | 100 audios |
| Conversation | 20 audios |
| Announcement | 20 audios |
| Academic Talk | 20 audios |
| Listen and Repeat | 100 audios |
| Duración media total de audio por set | 4,72 min |
| Rango de audio total por set | 4,02–5,42 min |

Los 260 MP3 son activos costosos. Su existencia no demuestra por sí sola que estén
alineados; sí obliga a auditar y reutilizar antes de volver a producir.

### 3.2 Composición actual por set

| Sección | Declarado en datos | Visible/calificable | Tiempo local actual |
|---|---:|---:|---:|
| Reading | 23 | 22 | parte de un reloj global |
| Listening | 17 | 17 | parte de un reloj global |
| Writing | 8 | 8 | parte de un reloj global |
| Speaking | 9 | 9 | parte de un reloj global |
| Total | 57 | 56 | 86 min globales |

Frente al proxy de una práctica oficial completa con 97 preguntas, 56 preguntas
visibles representan aproximadamente 42 % menos. Frente a los máximos publicados
de 120, representan aproximadamente 53 % menos. Estas comparaciones confirman la
intuición de que el simulacro actual es corto, pero no sustituyen el blueprint por
tareas ni la lógica adaptativa.

### 3.3 Brechas cuantitativas por tipo de tarea

| Tarea | WeLearn por set | Referencia oficial | Diagnóstico inicial |
|---|---:|---:|---|
| Complete the Words | 12 | 30 | Falta volumen y hay un defecto de scoring |
| Read in Daily Life | 5 | 5–15 | En el mínimo del rango |
| Academic Passage | 6 en datos / 5 visibles | 5–15 | Un ítem no se renderiza |
| Listen and Choose | 5 | 15–19 | Falta volumen importante |
| Conversation | 4 | 10 | Falta volumen |
| Announcement | 3 | 6–10 | Falta volumen |
| Academic Talk | 5 | 8–16 | Falta volumen |
| Build a Sentence | 6 | 10 | Falta volumen y contexto |
| Write an Email | 1 | 1 | Cantidad alineada; falta auditar calidad/tiempo |
| Academic Discussion | 1 | 1 | Cantidad alineada; falta auditar calidad/tiempo |
| Listen and Repeat | 5 | 7 | Falta volumen y grabación real |
| Interview | 4 | 4 | Cantidad alineada; interacción no fiel |

### 3.4 Hallazgos de fidelidad ya confirmados

1. Cada set incluye un `multiselect` de Reading que el cliente actual no renderiza ni
   califica. El producto declara 57 y opera 56.
2. Complete the Words muestra un prefijo y pide letras faltantes, pero compara la
   entrada contra la palabra completa. La interacción y la respuesta canónica no
   comparten contrato.
3. Los 120 ítems Build a Sentence no tienen prompt contextual; 20 ya aparecen en el
   orden correcto y por tanto no exigen realmente reconstrucción.
4. Listen and Repeat avanza o marca progreso sin demostrar captura y evaluación de
   una respuesta oral.
5. Speaking no dispone de una grabación de respuesta comparable con una simulación
   real; Interview introduce notas o preparación que no corresponden a la condición
   oficial sin preparación.
6. Existe un solo reloj global de 86 minutos y se puede cambiar libremente entre
   habilidades. No hay módulos, bloqueo por avance, tiempos específicos ni ruta
   adaptativa.
7. La puntuación se deriva de una conversión lineal local y Writing/Speaking incluyen
   autoevaluación. No es una puntuación ETS ni debe presentarse como equivalente.

### 3.5 Longitud de textos y audios: el problema no es sólo duración

Los 20 pasajes académicos medidos tienen una media aproximada de 310,5 palabras y un
rango de 263–342. La especificación vigente describe textos complejos que pueden
extenderse aproximadamente a 200 palabras. Por tanto, algunos estímulos actuales no
son cortos: son más largos o densos de lo necesario y tienen pocas preguntas.

Promedios medidos de transcripción:

| Tipo | Media aproximada |
|---|---:|
| Conversation | 217,9 palabras |
| Announcement | 142,4 palabras |
| Academic Talk | 308,6 palabras |

La expansión no debe consistir en alargar indiscriminadamente textos o audios. El
objetivo es ajustar número de estímulos, oportunidades de respuesta, densidad,
duración, naturalidad y carga cognitiva al tipo de tarea.

### 3.6 Estado de ElevenLabs

- Hay una variable compatible con ElevenLabs en `.env.local`; su valor no fue leído,
  copiado ni expuesto.
- No es necesario enviar la clave por chat.
- `scripts/generate-listening-audio.mjs` usa ElevenLabs para otras series de escucha,
  pero no es todavía un pipeline TOEFL basado en manifiesto.
- `scripts/rebuild-listening-audio.mjs` puede servir como referencia para recuperar
  generaciones desde historial.
- `scripts/audit-listening-audio.mjs` contiene controles técnicos reutilizables, pero
  debe adaptarse al inventario TOEFL antes de afirmar cobertura.

La disponibilidad de una credencial no autoriza gasto. Primero se cierra la auditoría
de brechas; después un humano aprueba lote, voces, estimación y presupuesto.

---

## 4. Principios no negociables de preservación

### 4.1 Banco existente primero

Todo activo se clasifica antes de editarlo:

| Clase | Acción |
|---|---|
| A — conservar | Pasa contrato editorial, técnico y de alineación |
| B — reparar | El activo sirve con una corrección pequeña y trazable |
| C — segmentar/derivar | Puede producir unidades válidas sin destruir el original |
| D — reemplazar | Falla de forma material y no es reparable responsablemente |
| E — generar brecha | El blueprint requiere un activo que no existe |

No se elimina ni sobrescribe el original al producir una variante. Cada derivado debe
apuntar a su fuente, transformación, fecha y responsable.

### 4.2 Inmutabilidad de audio fuente

- Los MP3 existentes se tratan como fuentes inmutables.
- Correcciones y recortes viven en rutas o versiones nuevas.
- El hash del original se guarda antes de procesar.
- No se normaliza, recorta o transcodifica en masa sin una muestra auditada.
- No se reemplaza un archivo válido sólo para homogeneizar voces.
- Una pieza larga puede segmentarse únicamente si cada segmento conserva sentido,
  entrada natural y suficiente contexto.

### 4.3 Cambios pequeños y recuperables

- Un set piloto antes de cualquier lote.
- Un tipo de tarea por rebanada cuando sea posible.
- Ninguna generación masiva antes de aprobar muestras representativas.
- Ningún cambio transversal mientras existan cambios ajenos superpuestos.
- Ninguna limpieza destructiva del worktree.

---

## 5. Arquitectura objetivo del producto

### 5.1 Capas que deben permanecer separadas

```text
Fuente oficial fechada
        ↓
Blueprint versionado
        ↓
Banco editorial de estímulos e ítems
        ↓
Manifiesto de medios y variantes
        ↓
Composición de módulos y rutas
        ↓
Runner de examen + modos de aprendizaje
        ↓
Intentos, respuestas, grabaciones y eventos
        ↓
Scoring local claramente rotulado
        ↓
QA, analítica y evidencia de cierre
```

El contenido no debe depender del componente que lo dibuja. La composición de un set
no debe destruir la identidad del ítem. El audio no debe depender de una duración
escrita a mano. El scoring no debe inferir fidelidad por la etiqueta del simulacro.

### 5.2 Tres productos técnicamente distintos

#### Práctica de habilidades

- permite pistas, explicación y reintento;
- puede usar una sola tarea;
- no pretende reproducir tiempos ni navegación de examen;
- mide dominio por objetivo y novedad, no “score TOEFL”.

#### Simulacro alineado no adaptativo

- respeta tareas, volumen, orden, tiempos e interacción;
- usa una ruta fija y declara que no adapta el segundo módulo;
- sirve como fase intermedia legítima y verificable.

#### Simulacro adaptativo completo

- separa Reading y Listening en etapas;
- usa rutas calibradas y reglas de selección versionadas;
- impide volver a módulos cerrados;
- conserva el contexto de cada decisión de ruta;
- explica que la puntuación sigue siendo una estimación WeLearn.

No se simula adaptatividad eligiendo preguntas al azar ni cambiando dificultad sólo
por porcentaje bruto sin calibración y evidencia.

### 5.3 Política de composición de sets

El mismo banco puede participar en varias composiciones, pero cada composición debe
tener:

- identificador y versión;
- blueprint oficial usado;
- nivel de fidelidad A/B/C/D;
- módulos y rutas posibles;
- exposición previa del estudiante;
- manifiesto de audio fijado;
- tiempo por tarea y sección;
- versión del scoring;
- evidencia editorial y técnica;
- fecha de expiración o próxima revisión oficial.

---

## 6. Contrato mínimo de un ítem

Cada ítem debe poder responder, de manera estructurada, a estas preguntas:

| Dimensión | Campos mínimos conceptuales |
|---|---|
| Identidad | ID estable, versión, estado, autoría |
| Alineación | Sección, tipo de tarea, regla oficial, nivel de fidelidad |
| Contenido | Estímulo, prompt, opciones/slots, respuesta/rúbrica |
| Pedagogía | Objetivo, dificultad, evidencia, error esperado |
| Editorial | Revisión lingüística, revisión experta, adjudicación |
| Derechos | Procedencia, licencia, similitud/independencia |
| Audio | Asset, transcripción, voz, duración, hash, QA |
| Accesibilidad | Etiquetas, teclado, alternativa apropiada, avisos |
| Operación | Tiempo, módulo, ruta, reglas de navegación |
| Analítica | Eventos permitidos, exposición, versión |

Un campo “correctAnswer” no basta para demostrar que una tarea está bien construida.

### 6.1 Estados editoriales permitidos

```text
draft → editorial_review → expert_review → audio_review → pilot → validated → retired
```

Nadie debe saltar directamente de borrador a validado. Los ítems defectuosos no se
borran si ya tienen intentos; se retiran y se conserva su versión.

### 6.2 Dificultad y adaptatividad

La etiqueta easy/medium/hard puede servir al inicio, pero no basta para un motor
adaptativo. Cada ruta futura necesita, como mínimo:

- regla explícita de enrutamiento;
- ítems ancla o comparabilidad documentada;
- cobertura equivalente de contenidos;
- prevención de rutas triviales o punitivas;
- análisis de exposición;
- revisión de funcionamiento diferencial;
- versión reproducible de la decisión.

Sin estos elementos, se rotula “ruta fija” o “práctica adaptativa experimental”, no
“simulacro adaptativo completo”.

---

## 7. Contrato editorial del contenido escrito

### 7.1 Auditoría de todos los textos e ítems

Cada uno de los 20 sets debe pasar una auditoría inventariable, no una lectura casual.
Por estímulo e ítem se revisa:

- tipo de tarea correcto;
- instrucción exacta y comprensible;
- suficiencia y relevancia del contexto;
- respuesta inequívoca o rúbrica defendible;
- distractores plausibles pero no ambiguos;
- gramática, ortografía, puntuación y naturalidad;
- nivel de vocabulario y sintaxis;
- longitud y densidad adecuadas;
- dependencia cultural o conocimiento externo;
- consistencia entre texto, audio, pregunta y explicación;
- ausencia de pistas por formato, longitud u orden;
- originalidad y derechos;
- similitud no indebida con material oficial o comercial;
- sensibilidad y representación.

### 7.2 Adjudicación independiente

Un ítem de alto impacto requiere al menos:

1. revisión editorial;
2. revisión por experto de TOEFL;
3. resolución documentada de desacuerdos;
4. pilotaje con datos antes de “validado”.

La persona o agente que genera un ítem no puede ser su única evidencia de calidad.

### 7.3 Criterios de rechazo inmediato

- más de una respuesta razonablemente correcta en una tarea cerrada;
- clave que contradice el estímulo;
- prompt sin información suficiente;
- explicación circular o que sólo repite la clave;
- respuesta revelada por formato;
- tarea que evalúa conocimiento externo no pretendido;
- contenido derivado demasiado de cerca de una fuente protegida;
- lenguaje artificial que un hablante competente no usaría;
- dificultad basada únicamente en rareza léxica;
- contexto estereotipado o daño evitable.

### 7.4 Política de autoría y derechos

- Usar las fuentes oficiales para estructura y calibración, no para replicar bancos.
- No copiar pasajes, prompts, distractores, transcripciones ni audio de ETS.
- Guardar procedencia de hechos cuando un texto sea informativo.
- Preferir temas de dominio público y redacción original.
- Ejecutar revisión de similitud antes de publicar un lote.
- Conservar licencia y atribución de cualquier fuente autorizada.

---

## 8. Contrato específico de audio

La auditoría de audio tiene tres capas obligatorias. Pasar una no implica pasar las
otras.

### 8.1 Capa 1 — Integridad técnica automatizable

Por archivo:

- existe y se puede decodificar;
- hash y tamaño no son sospechosos;
- duración medida desde el archivo;
- canales, sample rate, bitrate y codec documentados;
- ausencia de clipping;
- loudness y true peak en rango acordado;
- silencio inicial/final razonable;
- ausencia de clics, cortes y transitorios extraños;
- ausencia de duplicados exactos o casi duplicados no intencionales;
- ruta y referencia de datos coinciden;
- reproducción funciona en navegadores objetivo.

### 8.2 Capa 2 — Alineación lingüística y de contenido

Por archivo:

- transcripción canónica completa;
- alineación ASR como detector, nunca como única aprobación;
- concordancia entre texto pronunciado, pregunta y clave;
- nombres, cifras, negación y términos académicos correctos;
- velocidad y pausas naturales para la tarea;
- acento inteligible sin caricatura;
- turnos y voces coherentes;
- ausencia de instrucciones habladas contradictorias;
- duración y densidad propias del tipo de tarea.

Las 100 piezas de Listen and Choose necesitan especial atención: si la fuente actual
no conserva una transcripción canónica completa, se recupera una candidata mediante
ASR y después se adjudica humanamente. ASR no convierte automáticamente una hipótesis
en fuente de verdad.

### 8.3 Capa 3 — Escucha humana

Cada archivo nuevo o reparado y una muestra estratificada de los conservados debe ser
escuchada por una persona. La revisión humana registra:

- claridad;
- naturalidad;
- prosodia;
- pronunciación;
- consistencia de hablantes;
- artefactos sintéticos;
- cortes semánticos;
- dificultad lingüística;
- idoneidad para la tarea;
- decisión A/B/C/D/E y justificación.

Los fallos severos se revisan al 100 %. Un lote no se aprueba sólo porque FFmpeg o un
modelo de transcripción no reporten errores.

### 8.4 Manifiesto maestro de audio

Cada asset debe tener, como mínimo:

| Campo | Propósito |
|---|---|
| `asset_id` | Identidad estable |
| `source_asset_id` | Original si es variante |
| `set_id`, `item_id`, `task_type` | Trazabilidad pedagógica |
| `path`, `sha256`, `bytes` | Integridad |
| `duration_ms` | Duración medida |
| `codec`, `sample_rate`, `channels` | Perfil técnico |
| `loudness_lufs`, `true_peak_db` | Calidad y normalización |
| `canonical_transcript` | Verdad lingüística |
| `asr_transcript`, `wer_or_diff` | Ayuda diagnóstica |
| `voice_ids`, `voice_roles` | Consistencia y diversidad |
| `generator`, `model`, `settings` | Reproducibilidad |
| `license_and_provenance` | Derechos |
| `technical_status` | Resultado capa 1 |
| `linguistic_status` | Resultado capa 2 |
| `human_status` | Resultado capa 3 |
| `reuse_class` | A/B/C/D/E |
| `reviewed_at`, `reviewer` | Evidencia |

### 8.5 Política para ElevenLabs y otros proveedores

Antes de generar:

1. cerrar el manifiesto de brechas;
2. demostrar que no existe un activo A/B/C reutilizable;
3. estimar caracteres, número de piezas y costo;
4. definir voces y roles para evitar deriva entre sets;
5. aprobar una muestra pequeña por tipo de tarea;
6. recibir autorización humana explícita del lote y presupuesto;
7. generar a rutas versionadas;
8. ejecutar las tres capas de QA;
9. conservar parámetros y procedencia sin guardar la clave.

Reglas de secreto:

- nunca pedir que se pegue la API key en el chat;
- leerla sólo desde el mecanismo local de secretos cuando el lote esté autorizado;
- nunca mostrar variables completas, volcados de entorno ni headers;
- nunca escribir la clave en código, docs, manifiestos, logs o commits;
- abortar con un mensaje sanitizado si la credencial falta o falla.

---

## 9. Contratos por sección y tarea

### 9.1 Reading

#### Complete the Words

- La interfaz, el modelo de respuesta y el scoring deben compartir exactamente la
  misma unidad: palabra completa o letras faltantes, según la regla oficial vigente.
- La máscara no puede revelar una respuesta de manera accidental.
- Mayúsculas, puntuación y espacios deben tener normalización documentada.
- Cada hueco debe ser resoluble mediante contexto lingüístico.
- El texto no se alarga para compensar falta de ítems.

#### Read in Daily Life

- Usar géneros funcionales plausibles: avisos, mensajes, formularios o información
  cotidiana original.
- La pregunta debe medir comprensión del texto, no familiaridad local.
- Revisar legibilidad visual además del contenido.

#### Read an Academic Passage

- La longitud debe calibrarse al formato vigente, no a la versión antigua del TOEFL.
- No concentrar demasiadas preguntas en un único pasaje para “llenar” el conteo.
- Corregir la pérdida actual del ítem multiselect antes de ampliar el banco.
- Las preguntas de selección múltiple deben tener contrato explícito de número de
  respuestas y scoring parcial o total.

### 9.2 Listening

#### Listen and Choose a Response

- Una interacción breve por pieza o unidad semántica coherente.
- Opciones auditivas/textuales según el formato vigente comprobado.
- Distractores naturales, no absurdos ni basados sólo en repetir palabras.
- Transcripción canónica para prompt y respuestas.

#### Conversation, Announcement y Academic Talk

- La tarea debe aportar el número adecuado de oportunidades de respuesta.
- Los audios actuales largos se evalúan para segmentación o reutilización; no se
  descartan automáticamente.
- No partir un audio en puntos que hagan depender la comprensión de contexto oculto.
- Preguntas en orden compatible con la experiencia oficial.
- No habilitar retroceso si el modo se rotula como simulacro fiel.

### 9.3 Writing

#### Build a Sentence

- Cada ítem debe incluir contexto comunicativo suficiente.
- El orden inicial no puede ser ya la respuesta.
- Debe existir una respuesta canónica y un criterio explícito para variantes.
- La interacción debe ser operable con teclado, táctil y lector de pantalla.

#### Write an Email

- Escenario, destinatario, propósito y puntos a cubrir deben ser claros.
- Reloj de referencia: 7 minutos en modo examen.
- La evaluación local se presenta como feedback/rúbrica WeLearn.
- Guardado y recuperación no pueden alterar el texto del estudiante.

#### Academic Discussion

- Debe existir una pregunta y contribuciones de otros participantes coherentes.
- Reloj de referencia: 10 minutos en modo examen.
- La respuesta no puede depender de conocimiento especializado externo.
- La rúbrica separa desarrollo, organización y uso del lenguaje sin afirmar score ETS.

### 9.4 Speaking

#### Listen and Repeat

- Debe capturar audio real o declarar que sólo es práctica receptiva.
- El progreso no se marca por reproducir el estímulo.
- La comparación automatizada, si se usa, es feedback orientativo y accesible.
- Debe haber alternativa clara cuando el micrófono sea denegado o no exista.

#### Take an Interview

- Cuatro preguntas por set alineado.
- Sin tiempo de preparación en modo examen si esa es la condición oficial vigente.
- Grabación, temporizador, transición y recuperación ante permisos deben probarse.
- La interfaz no debe mostrar notas o ayudas incompatibles con el rótulo de simulacro.

---

## 10. Modos de aprendizaje y examen

| Modo | Ayudas | Tiempo | Navegación | Resultado |
|---|---|---|---|---|
| Learn | Explicación, ejemplo, pista | Flexible | Libre | Dominio por objetivo |
| Practice | Feedback diferido o por bloque | Configurable | Según tarea | Progreso WeLearn |
| Exam fijo | Sin ayudas | Oficial/alineado | Restringida | Estimación local |
| Exam adaptativo | Sin ayudas | Oficial/alineado | Por módulos y rutas | Estimación local + ruta |
| Review | Explicaciones después del cierre | Sin efecto | Sólo intento cerrado | Diagnóstico |

Las ayudas de Learn no pueden filtrarse a Exam. Review no debe permitir editar un
intento cerrado. La configuración del modo debe persistir con el intento.

---

## 11. Tiempo, navegación y estado del intento

El reloj global actual debe reemplazarse conceptualmente por un modelo que pueda
representar:

- orden de secciones;
- tiempo por sección o tarea;
- módulo actual;
- ruta elegida;
- estado `not_started`, `active`, `submitted`, `expired`;
- transición irreversible de módulos cuando corresponda;
- respuesta y grabación persistidas;
- recuperación ante recarga o pérdida de red;
- tiempo de servidor o mecanismo resistente a manipulación;
- ajustes de accesibilidad autorizados sin contaminar intentos estándar.

Cada transición crítica debe ser idempotente. Un doble clic, recarga o reintento de
red no puede duplicar intentos ni cambiar de ruta dos veces.

---

## 12. Scoring y comunicación responsable

### 12.1 Lo permitido

- aciertos brutos por tarea;
- porcentaje local, claramente rotulado;
- feedback por objetivo;
- rúbricas formativas;
- bandas internas de dominio con metodología pública;
- estimaciones experimentales acompañadas de intervalo e incertidumbre.

### 12.2 Lo prohibido sin validación psicométrica

- afirmar equivalencia con una puntuación oficial TOEFL;
- convertir linealmente porcentaje a score y ocultar la fórmula;
- mezclar autoevaluación de Writing/Speaking con preguntas cerradas como si fueran
  medidas comparables;
- usar una práctica corta para predecir un resultado completo;
- entrenar o calibrar con el mismo contenido que luego demuestra dominio;
- ocultar cuántos ítems eran nuevos, ancla o previamente vistos.

### 12.3 Contrato de resultado

Cada pantalla de resultados debe mostrar:

- tipo y nivel de fidelidad del intento;
- número de preguntas respondidas y calificables;
- si hubo ruta adaptativa o fija;
- qué partes fueron autoevaluadas o evaluadas automáticamente;
- versión del scoring;
- texto explícito de que no es un resultado oficial de ETS;
- recomendaciones accionables basadas en errores reales.

---

## 13. Taxonomía de errores y pedagogía

El análisis no debe reducirse a correcto/incorrecto. Etiquetas iniciales:

### Reading

- significado contextual;
- referencia/pronombre;
- detalle explícito;
- propósito;
- inferencia;
- organización;
- gramática en contexto;
- selección múltiple incompleta.

### Listening

- función comunicativa;
- idea principal;
- detalle;
- actitud/tono;
- inferencia;
- pérdida por velocidad o segmentación;
- confusión fonológica;
- distractor por repetición superficial.

### Writing

- cumplimiento de tarea;
- construcción sintáctica;
- coherencia;
- desarrollo;
- precisión gramatical;
- elección léxica;
- registro;
- edición bajo tiempo.

### Speaking

- inteligibilidad;
- precisión de repetición;
- fluidez;
- completitud;
- pronunciación/prosodia;
- desarrollo de respuesta;
- pertinencia;
- fallo técnico de captura, que nunca se cuenta como fallo lingüístico.

La taxonomía debe alimentar recomendaciones y selección de práctica, no diagnósticos
clínicos ni afirmaciones de capacidad general.

---

## 14. Las siete auditorías obligatorias

Cada rebanada ejecuta las auditorías aplicables en este orden. Si una falla, se
corrige y se repiten las afectadas.

### Auditoría 1 — Full-stack, datos y repositorio

- estado del worktree y cambios ajenos;
- fuente única de verdad;
- schema y migración/versionado;
- paridad entre datos, render y scoring;
- persistencia e idempotencia;
- seguridad y privacidad;
- manejo de fallos;
- ausencia de secretos;
- pruebas unitarias/integración pertinentes;
- guardias existentes sin umbrales rebajados.

### Auditoría 2 — Experto en TOEFL vigente

- fuente oficial y fecha;
- tipo de tarea;
- volumen y orden;
- tiempos;
- instrucciones;
- navegación;
- adaptatividad;
- interacción real;
- diferencia entre práctica oficial y examen operacional;
- rótulo de fidelidad correcto.

### Auditoría 3 — Edición lingüística y diseño instruccional

- naturalidad;
- gramática y precisión;
- contexto suficiente;
- clave y distractores;
- dificultad auténtica;
- progresión;
- explicaciones;
- carga cognitiva;
- capacidad de aprender del error.

### Auditoría 4 — Audio técnico, lingüístico y humano

- manifiesto completo;
- integridad técnica;
- transcripción/alineación;
- voces, velocidad, pausas y prosodia;
- escucha humana registrada;
- compatibilidad de reproducción;
- clase de reutilización;
- costo sólo si existe brecha autorizada.

Para rebanadas sin audio se registra “no aplica” con justificación, no se omite en
silencio.

### Auditoría 5 — Multiperspectiva, anti-sesgo y derechos

- variedad de nombres, contextos y acentos;
- ausencia de estereotipos;
- conocimiento cultural no esencial;
- lenguaje respetuoso;
- análisis diferencial cuando haya datos;
- procedencia y licencia;
- revisión de similitud;
- límites de marca y no afiliación con ETS.

### Auditoría 6 — UI/UX y accesibilidad

- teclado completo;
- foco visible y orden lógico;
- lector de pantalla y nombres accesibles;
- contraste y zoom;
- touch targets y móvil;
- estados de carga/error;
- permisos de micrófono;
- temporizador anunciado sin ansiedad innecesaria;
- instrucciones disponibles sin revelar respuestas;
- modo reducido de movimiento cuando aplique.

### Auditoría 7 — Playwright de extremo a extremo

Validar como mínimo:

- entrada al producto con rótulo correcto;
- inicio y persistencia de intento;
- una tarea de cada familia afectada;
- teclado y viewport móvil;
- audio y controles;
- permisos de micrófono si aplica;
- expiración y envío;
- bloqueo de navegación;
- recarga/recuperación;
- resultado y disclosure;
- consola, requests fallidos y errores de hidratación;
- capturas antes/después en puntos críticos.

Una prueba que sólo carga la página no cierra una experiencia.

---

## 15. Métricas y criterios de evidencia

### 15.1 Métricas de alineación

- cobertura por tipo de tarea;
- conteo visible vs fuente;
- tiempos observados vs blueprint;
- rutas y módulos cubiertos;
- divergencias abiertas;
- porcentaje de sets por nivel A/B/C/D.

### 15.2 Métricas editoriales

- ítems por estado;
- tasa de rechazo y motivo;
- desacuerdos entre revisores;
- dificultad y discriminación cuando haya muestra suficiente;
- exposición previa;
- ítems retirados;
- similitud y procedencia resueltas.

### 15.3 Métricas de audio

- cobertura de manifiesto sobre 260 archivos;
- porcentaje que pasa cada capa;
- A/B/C/D/E por tipo de tarea;
- archivos sin transcripción canónica;
- duplicados;
- fallos de reproducción;
- duración y densidad por tarea;
- caracteres y costo evitado por reutilización;
- costo real de nueva producción.

### 15.4 Métricas de producto y aprendizaje

- finalización por sección;
- abandono por tipo de tarea;
- errores técnicos separados de errores académicos;
- mejora en ítems nuevos equivalentes;
- transferencia a una práctica no vista;
- funcionamiento por dispositivo;
- uso de accesibilidad;
- satisfacción y carga percibida.

No se registrarán respuestas de voz o texto más tiempo del necesario. Retención,
consentimiento, borrado y acceso deben definirse antes de pilotar con usuarios.

---

## 16. Tablero maestro de ejecución

Regla: tomar sólo la primera fila abierta cuyas dependencias estén cerradas. Una fila
puede dividirse en subrebanadas, pero no marcarse completa hasta cumplir su gate.

| ID | Unidad | Dependencia | Gate de salida | Estado |
|---|---|---|---|---|
| T00 | Congelar línea base | — | Inventario reproducible, estado Git y cambios ajenos documentados | [x] |
| T01 | Registro oficial versionado | T00 | Fuentes, fechas, reglas y divergencias reconciliadas | [x] |
| T02 | Taxonomía de niveles A/B/C/D y disclosures | T01 | Etiquetas y condiciones aprobadas | [x] |
| T03 | Inventario editorial de 20 sets | T00 | Todos los estímulos/ítems con ID, tarea y estado | [x] |
| T04 | Manifiesto maestro de 260 audios | T00 | 100 % con hash, duración, vínculo y transcripción/status | [x] |
| T05 | Auditoría editorial global inicial | T03 | Cada ítem clasificado A/B/C/D/E con hallazgos | [x] |
| T06 | Auditoría técnica global de audio | T04 | 100 % pasa o tiene fallo accionable registrado | [x] |
| T07 | Auditoría lingüística/ASR de audio | T04,T06 | Transcripciones y diferencias resueltas o en cola humana | [x] |
| T08 | Auditoría humana estratificada de audio | T07 | Muestra aprobada y severos al 100 %; reglas de lote fijadas | [~] |
| T09 | Contrato datos-render-scoring | T01,T03 | Cada tipo representable; visible = calificable = reportable | [x] |
| T10 | Contrato de tiempo, módulos y navegación | T01,T02 | State machine y excepciones documentadas | [x] |
| T11 | Contrato de intentos, privacidad y scoring | T02,T09,T10 | Persistencia, disclosure y retención aprobados | [x] |
| T12 | Piloto Complete the Words | T09 | Interacción/scoring fiel y muestra editorial aprobada | [x] |
| T13 | Piloto Reading Daily/Academic/multiselect | T09 | Todos los tipos visibles, calificables y accesibles | [x] |
| T14 | Piloto Listening de respuesta breve | T07,T08,T09 | Flujo, volumen y audio del Set 1 aprobados | [ ] |
| T15 | Piloto Listening largo | T08,T09 | Conversation/Announcement/Talk aprobados | [ ] |
| T16 | Piloto Build a Sentence | T09 | Contexto, orden, scoring y accesibilidad aprobados | [~] |
| T17 | Piloto Email y Discussion | T10,T11 | Tiempos, persistencia y rúbrica/disclosure aprobados | [~] |
| T18 | Piloto Listen and Repeat | T08,T10,T11 | Captura real, fallback y progreso veraz | [ ] |
| T19 | Piloto Interview | T08,T10,T11 | Cuatro respuestas, sin prep, captura y timing válidos | [ ] |
| T20 | Manifiesto de brechas del Set 1 | T12–T19 | Sólo faltantes/reemplazos D/E, con prioridad y costo | [ ] |
| T21 | Aprobación humana de generación del Set 1 | T20 | Muestras, voces, presupuesto y autorización explícita | [ ] |
| T22 | Producción/reparación de medios Set 1 | T21 | Nuevos assets versionados pasan las tres capas | [ ] |
| T23 | Composición Set 1 nivel C | T12–T22 | Blueprint completo fijo, siete auditorías verdes | [ ] |
| T24 | Diseño de rutas adaptativas Set 1 | T23 | Módulos, reglas, anclas y cobertura aprobados | [ ] |
| T25 | Implementación/validación Set 1 nivel D | T24 | Rutas reproducibles, UX y E2E completos | [ ] |
| T26 | Piloto controlado con estudiantes | T23 o T25 | Consentimiento, muestra y criterios definidos | [ ] |
| T27 | Adjudicación posterior al piloto | T26 | Ítems/audio/scoring revisados con datos | [ ] |
| T28 | Lote sets 2–5 | T27 | Cada set alcanza el nivel declarado | [ ] |
| T29 | Lote sets 6–10 | T28 | Cada set alcanza el nivel declarado | [ ] |
| T30 | Lote sets 11–15 | T29 | Cada set alcanza el nivel declarado | [ ] |
| T31 | Lote sets 16–20 | T30 | Cada set alcanza el nivel declarado | [ ] |
| T32 | Auditoría transversal de los 20 sets | T31 | Sin huecos, duplicados dañinos ni claims incorrectos | [ ] |
| T33 | Observabilidad y revalidación periódica | T32 | Alertas, caducidad de fuentes y runbook operativo | [ ] |
| T34 | Cierre final | T33 | Definiciones de terminado cumplidas y evidencia indexada | [ ] |

### 16.1 Por qué el Set 1 va primero

El Set 1 es el laboratorio de contrato, no una excepción artesanal. Todo lo aprendido
se convierte en schema, checklist, validador, plantilla o decisión registrada antes
de abrir el lote siguiente. Si la solución no escala sin perder calidad, T23 no está
cerrada.

### 16.2 Cuándo se puede generar audio

T21 es un gate humano real. Un loop puede llegar hasta T20 y detenerse. No debe
interpretar la existencia de una API key como aprobación de gasto ni saltarse la
decisión de voces, muestras y presupuesto.

### 16.3 Secuencia temporal de la fase humana de audio

Por decisión explícita del owner del 9 de agosto de 2026, T08 se difiere mientras se
completan las unidades no dependientes de escucha humana: T09–T13 y T16–T17. La
decisión cambia el orden operativo, no el gate ni la evidencia requerida.

Después de esas unidades se reabre T08. T14, T15, T18 y T19 no pueden cerrarse antes,
y T20–T22 tampoco pueden comenzar, porque el manifiesto de brechas y cualquier
producción necesitan saber qué originales fueron humanamente aprobados, reparados,
segmentados o reemplazados. Así, “audio al final” significa al final de la fase
no-audio, no después de fabricar medios ni de declarar un set completo.

---

## 17. Algoritmo de una iteración autónoma

### Paso 1 — Orientación

1. Leer `AGENTS.md`.
2. Leer `docs/OPERACION-REPOSITORIO.md`.
3. Leer este documento completo.
4. Revisar `git status --short --branch`.
5. Identificar cambios ajenos y rutas prohibidas.
6. Elegir la primera unidad abierta y no bloqueada.

### Paso 2 — Medición inicial

Registrar:

- archivos relevantes;
- métricas antes;
- prueba o muestra que falla;
- fuente oficial que gobierna;
- riesgo para contenido/audio existente;
- criterio de rollback;
- gate exacto.

### Paso 3 — Diseñar la rebanada

La rebanada debe ser:

- vertical;
- pequeña;
- verificable;
- reversible;
- independiente de cambios ajenos;
- útil aunque la siguiente fase no ocurra.

### Paso 4 — Preservar antes de modificar

- fijar IDs y hashes de activos afectados;
- clasificar A/B/C/D/E;
- conservar originales;
- demostrar por qué una reparación o generación es necesaria;
- no tocar lotes fuera de la unidad.

### Paso 5 — Ejecutar dentro del alcance autorizado

Si la unidad exige código, audio, costo, secreto o cambios de producto no autorizados
en la sesión, detenerse y pedir autorización. El loop no amplía permisos por sí solo.

### Paso 6 — Siete auditorías

Ejecutarlas en el orden de la sección 14. Corregir y repetir. Registrar “no aplica”
con razón explícita cuando corresponda.

### Paso 7 — Evidencia antes/después

- comandos y resultados;
- conteos;
- pruebas;
- capturas;
- archivos y hashes;
- muestras editoriales;
- manifest/audio QA;
- divergencias;
- riesgos residuales.

### Paso 8 — Actualizar el tablero

Marcar la fila sólo si el gate completo pasa. Añadir una entrada al registro de
evidencia. Si no pasa, dejarla abierta y explicar el siguiente bloqueo concreto.

### Paso 9 — Detenerse limpiamente

No comenzar una segunda unidad sólo porque sobra tiempo. Dejar el repositorio en un
estado comprobable y entregar un resumen autocontenido.

---

## 18. Gates y comandos de referencia

Los comandos exactos pueden evolucionar. Primero se inspeccionan los scripts que ya
existen; no se inventan nombres ni se bajan umbrales para obtener verde.

### 18.1 Siempre

```bash
git status --short --branch
git diff --check
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

### 18.2 En rebanadas TOEFL

Debe existir o crearse de forma explícita, cuando la implementación sea autorizada,
un gate que compruebe como mínimo:

- número de sets y unicidad de IDs;
- fuente = render = scoring;
- cobertura por tarea;
- archivos y referencias de audio;
- duración leída del archivo;
- manifiesto completo;
- transcripciones requeridas;
- tiempos y orden;
- nivel de fidelidad y disclosure;
- contenido duplicado o filtrado;
- rutas adaptativas completas cuando se anuncien.

### 18.3 Navegador

Las pruebas E2E deben usar un servidor controlado y registrar:

- URL y versión;
- viewport;
- ruta realizada;
- consola;
- requests fallidos;
- capturas;
- resultado del intento.

No se debe probar contra producción ni publicar una rama sucia para facilitar QA.

---

## 19. Límites de autonomía y seguridad

El agente puede, dentro de una unidad autorizada:

- inspeccionar archivos y activos;
- medir y comparar;
- redactar especificaciones y evidencia;
- ejecutar validaciones locales no destructivas;
- proponer clasificación y presupuesto;
- corregir sólo cuando el usuario haya autorizado implementación.

El agente debe detenerse antes de:

- consumir una API paga;
- generar o regenerar un lote de audio;
- mostrar o mover secretos;
- borrar o sobrescribir originales;
- publicar, desplegar o cambiar remotos;
- hacer commit, push, merge o rebase sin autorización;
- mezclar cambios ajenos;
- realizar migraciones destructivas;
- decidir por sí solo un claim comercial de equivalencia oficial;
- pilotar con datos personales sin política y consentimiento.

Si el worktree está sucio, se preserva. No se hace reset, checkout destructivo ni
limpieza. Si una ruta necesaria se superpone con trabajo ajeno, la unidad queda
bloqueada hasta coordinarla.

---

## 20. Plantilla de registro de evidencia

Copiar una entrada por unidad trabajada:

```markdown
### Evidencia TXX — título — AAAA-MM-DD

- Alcance:
- Dependencias verificadas:
- Estado Git y cambios ajenos:
- Fuente oficial y fecha:
- Línea base:
- Archivos inspeccionados/modificados:
- Activos preservados y hashes:
- Clasificación A/B/C/D/E:
- Cambio o decisión:
- Auditoría 1 — full-stack/datos/repositorio:
- Auditoría 2 — TOEFL:
- Auditoría 3 — editorial/pedagógica:
- Auditoría 4 — audio:
- Auditoría 5 — anti-sesgo/derechos:
- Auditoría 6 — UI/UX/accesibilidad:
- Auditoría 7 — Playwright:
- Comandos y resultados:
- Métricas antes/después:
- Capturas/muestras/manifiestos:
- Fallos corregidos:
- Riesgos residuales:
- Gate de salida:
- Estado final: abierto/cerrado/bloqueado
- Próxima primera unidad elegible:
```

---

## 21. Definiciones de terminado

### 21.1 Un ítem está terminado cuando

- su tipo de tarea y contrato son correctos;
- se renderiza, responde, califica y reporta de forma consistente;
- tiene revisión editorial y experta;
- su dificultad tiene evidencia apropiada al estado;
- su procedencia y derechos están claros;
- es accesible;
- tiene pruebas aplicables;
- no depende de una exposición previa no declarada.

### 21.2 Un audio está terminado cuando

- original y variantes son trazables;
- hash, duración y perfil técnico están medidos;
- existe transcripción canónica;
- pasó integridad técnica;
- pasó alineación lingüística;
- pasó escucha humana según la política de lote;
- reproduce en navegadores objetivo;
- voz, velocidad y prosodia son adecuadas;
- su costo/procedencia están registrados;
- no contiene secretos ni metadatos indebidos.

### 21.3 Un set nivel C está terminado cuando

- cumple el blueprint fijo declarado;
- incluye todas las tareas y volumen defendible;
- respeta orden, tiempos e interacción;
- no tiene pérdidas entre fuente, UI y scoring;
- todos los audios pasan su contrato;
- Writing y Speaking capturan respuestas reales;
- scoring y disclosure son responsables;
- las siete auditorías están verdes;
- las pruebas E2E cubren el recorrido completo;
- se muestra “no adaptativo”.

### 21.4 Un set nivel D está terminado cuando

- primero cumple todo el nivel C;
- Reading y Listening tienen módulos y rutas válidas;
- las reglas de selección son versionadas y reproducibles;
- no se puede volver a módulos cerrados;
- cobertura y dificultad son comparables entre rutas;
- el funcionamiento diferencial y la exposición se monitorean;
- la UX completa pasó E2E por cada ruta importante;
- aun así, no se presenta como examen oficial ni score ETS.

### 21.5 El programa de 20 sets está terminado cuando

- cada set tiene un nivel de fidelidad explícito y verdadero;
- los 260 audios originales y todos los derivados están inventariados;
- cada ítem y asset tiene estado editorial;
- no quedan divergencias severas sin disclosure;
- no hay claims de equivalencia no sustentados;
- guardias automáticas evitan regresiones;
- fuentes oficiales tienen fecha de revalidación;
- privacidad, retención y borrado están operativos;
- existe evidencia consolidada y un runbook de mantenimiento.

---

## 22. Fuentes oficiales y documentos internos

### Fuentes oficiales consultadas

- [ETS — TOEFL iBT Test Content](https://www.ets.org/toefl/test-takers/ibt/about/content.html)
- [ETS — TOEFL iBT Test Specifications 2026](https://www.ets.org/content/dam/ets-india/pdfs/toefl/toefl-ibt-test-specifications-2026.pdf)
- [ETS — Teacher Resources Practice Test 1](https://www.ets.org/content/dam/ets-org/pdfs/toefl/toefl-ibt-teachers-resources-practice-test-1.pdf)
- [ETS — Full-length Practice Test 2](https://www.ets.org/pdfs/toefl/toefl-ibt-full-length-practice-test-2.pdf)
- [ETS — Teacher FAQ](https://www.ets.org/content/dam/ets-org/pdfs/toefl/teacher-faq.pdf)

### Documentos internos que deben leerse por alcance

- `AGENTS.md`
- `docs/OPERACION-REPOSITORIO.md`
- `docs/ielts-reading-loop.md` — patrón de ejecución y auditoría
- `docs/toefl-ibt-2026-official-format.md` — registro oficial versionado y
  divergencias vigentes
- `docs/toefl-2026-fidelity-and-disclosure-contract.md` — niveles A/B/C/D,
  validación, downgrade y copy canónico
- `docs/ielts-toefl-audit.md` — hallazgos previos; validar antes de reutilizar
- `docs/ielts-toefl-migration-plan.md` — secuencia histórica del programa
- `docs/COWORK-audio-batch-runbook.md` — referencia de producción; contiene supuestos
  antiguos que no deben tratarse como inventario actual
- `docs/exam-media-production-checklist.md` — checklist previo; revalidar estados
- `docs/exam-media-batch-manifest.md`
- `src/data/mocks/types.ts`
- `src/data/mocks/toefl-set-1.ts` a `toefl-set-20.ts`
- `src/app/(site)/examenes/[exam]/practica/[mockId]/Toefl2026PracticeClient.tsx`
- `src/components/exam-runner/primitives.tsx`
- `scripts/audit-listening-audio.mjs`
- `scripts/generate-listening-audio.mjs`
- `scripts/rebuild-listening-audio.mjs`

### Advertencia sobre documentación histórica

Algunos documentos internos describen los 260 audios como pendientes aunque ya
existen en el filesystem, o llaman “TOEFL completo” a la mera presencia de archivos.
Este documento reemplaza esas inferencias como criterio operativo: **existencia no es
alineación, y cantidad de archivos no es fidelidad de examen**.

---

## 23. Registro inicial de decisiones

### 2026-08-09 — Decisiones de arranque

- Se confirma que la intuición de simulacros cortos es real al comparar el volumen
  visible actual con las referencias oficiales.
- Se conservarán los 20 sets y 260 MP3 como banco de partida.
- No se realizará una regeneración masiva de audio.
- La primera implementación futura será un Set 1 piloto y no un cambio transversal.
- Todo contenido escrito y todo audio entran en inventario/auditoría.
- La práctica fija puede existir, pero debe declararse no adaptativa.
- ElevenLabs se usará únicamente después del manifiesto de brechas y autorización de
  costo; la clave local no se expone ni se comparte por chat.
- Este documento no autoriza todavía implementación ni generación.

### 2026-08-09 — Diferir la escucha humana

- El owner decide dejar la revisión humana de audio para el final de la fase no-audio.
- T08 pasa a `[~]`: diferida, no cerrada ni aprobada.
- La siguiente unidad elegible es T09; se permite avanzar T09–T13 y T16–T17.
- T08 debe reabrirse antes de T14, T15, T18, T19 y T20–T22.
- Los 260 MP3, el libro, la muestra CAL-01 y todos los umbrales permanecen intactos.

---

## 24. Registro de evidencia

### Evidencia T00 — congelar línea base — 2026-08-09

- Alcance: inventario reproducible de los 20 sets, sus unidades y los 260 MP3; no se
  modificó código, contenido TOEFL ni medios.
- Dependencias verificadas: ninguna; T00 es la raíz del tablero.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 0 behind/7 ahead; se preservaron 6 rutas
  tracked modificadas y 7 untracked presentes antes del artefacto T00.
- Fuente oficial y fecha: página operativa y especificación ETS 2026 reabiertas el
  9 de agosto de 2026; la práctica oficial se mantuvo como ejemplo adaptado.
- Línea base: 20 sets; 940 objetos/IDs únicos; 1.140 unidades fuente; 1.120 incluidas
  por el renderer/progreso; 20 `multiselect` omitidos; 260 referencias únicas = 260
  MP3 reales, sin faltantes ni huérfanos; 94,354 minutos de audio.
- Activos preservados y hashes: fingerprint agregado de MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  fingerprint agregado de fuentes
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`.
- Clasificación A/B/C/D/E: no asignada; T00 no sustituye las auditorías editorial y
  humana posteriores.
- Cambio o decisión: se cerró únicamente la línea base y se mantuvo todo el banco.
- Auditoría 1: pasa para inventario; Git, IDs, referencias y disparidad de renderer
  quedaron documentados.
- Auditoría 2: pasa para comparación; evidencia oficial revalidada y prácticas en
  papel no tratadas como blueprint universal.
- Auditoría 3: no aplica a aprobación editorial; T05 permanece abierta.
- Auditoría 4: pasa sólo integridad de inventario; T04/T06/T07/T08 permanecen abiertas
  para manifiesto, técnica, ASR y escucha humana.
- Auditoría 5: no aplica; no se creó ni copió contenido.
- Auditoría 6: no aplica a certificación de UI; sólo se leyó el renderer para medir
  cobertura.
- Auditoría 7: no aplica; no hubo cambio de runtime y una carga de página no añadiría
  evidencia al gate T00.
- Comandos, métricas y reproducción: documentados en
  `docs/toefl-2026-baseline-2026-08-09.md`; `git diff --check`, catálogo protegido,
  TypeScript y build completo pasaron.
- Fallos corregidos: ninguno; los hallazgos se congelaron, no se corrigieron en T00.
- Riesgos residuales: worktree concurrente; falta manifest individual y auditoría de
  contenido/audio.
- Gate de salida: satisfecho.
- Estado final: cerrado.
- Próxima primera unidad elegible: T01 — Registro oficial versionado.

### Evidencia T01 — registro oficial versionado — 2026-08-09

- Alcance: reconciliación documental del formato TOEFL iBT vigente con el producto
  actual; no se modificó runtime, banco de preguntas, scoring ni ningún medio.
- Dependencia verificada: T00 cerrada con inventario y fingerprints reproducibles.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 0 behind/7 ahead; se preservaron las 6 rutas
  tracked modificadas y todos los untracked concurrentes. `output/` apareció durante
  T01 y no se inspeccionó, editó ni eliminó.
- Fuentes oficiales: página operativa, especificaciones 2026, Teacher FAQ y dos
  prácticas oficiales ETS reabiertas el 9 de agosto de 2026; la próxima revisión se
  fijó para el 9 de septiembre de 2026 o antes de cualquier release TOEFL.
- Artefacto: `docs/toefl-ibt-2026-official-format.md`, versión
  `2026-08-09.v1`, ahora resuelve la referencia antes inexistente de los 20 sets y el
  cliente.
- Resultado: 5 fuentes con jerarquía explícita, 48 reglas verificadas con `rule_id`,
  blueprint por familia, matriz de alineación y 20 divergencias con severidad, regla,
  comportamiento, evidencia, motivo, disclosure, responsable, revisión, unidades y
  estado.
- Reconciliación principal: el banco conserva las doce familias y varios activos
  reutilizables, pero el producto actual es una práctica abreviada, fija y con scoring
  local; no puede rotularse responsablemente como examen oficial, completo o
  adaptativo.
- Auditoría 1: pasa para alcance documental; se contrastaron datos, renderer, scoring,
  metadata y seguridad de repositorio sin tocar código.
- Auditoría 2: pasa; los números operativos se tomaron de la página vigente, los
  rangos/constructos de la especificación, las aclaraciones del FAQ y las prácticas
  sólo como ejemplos adaptados.
- Auditoría 3: pasa para precisión de reglas; hechos oficiales, decisiones locales y
  asuntos no verificados quedaron separados. T05 sigue siendo la adjudicación de los
  940 objetos.
- Auditoría 4: no aplica a aprobar audio; ningún MP3 cambió. El registro fija las
  restricciones que T04/T06/T07/T08 deben comprobar técnica, lingüística y humanamente.
- Auditoría 5: pasa; se resumieron fuentes oficiales sin copiar preguntas, pasajes,
  transcripciones ni audio, y se separó alineación de afiliación u oficialidad.
- Auditoría 6: no certifica UI; las divergencias registran claims, navegación, relojes,
  captura y ausencias visuales que deben resolverse en unidades posteriores.
- Auditoría 7: no aplica; T01 no cambia runtime y Playwright no demostraría el gate de
  fuentes, fechas, reglas y divergencias.
- Validación documental: 5 filas de fuente, 48 reglas únicas, 20 divergencias y 140/140
  campos básicos de trazabilidad presentes; Markdown sin fences desbalanceados y
  `git diff --check` verde.
- Activos preservados: los fingerprints agregados de 260 MP3 y 20 fuentes TOEFL se
  revalidaron contra T00 sin cambios.
- Guardias: catálogo protegido, TypeScript y build completo ejecutados al cerrar esta
  unidad; sus resultados forman parte de la entrega T01.
- Fallos corregidos: se creó el registro interno ausente y se reconciliaron las
  contradicciones como divergencias; ningún fallo de producto se corrigió antes de su
  unidad autorizada.
- Riesgos residuales: los claims públicos y el runner continúan divergentes; T02 debe
  definir etiquetas/disclosures antes de cualquier implementación. Calidad editorial,
  audio, accesibilidad, scoring y adaptatividad permanecen abiertos en sus gates.
- Gate de salida: satisfecho — fuentes, fechas, reglas y divergencias reconciliadas.
- Estado final: cerrado.
- Próxima primera unidad elegible: T02 — Taxonomía de niveles A/B/C/D y disclosures.

### Evidencia T02 — taxonomía A/B/C/D y disclosures — 2026-08-09

- Alcance: decisión documental de niveles, condiciones, estados de validación,
  downgrade, claims y disclosures; no se modificó runtime, contenido, scoring ni audio.
- Dependencia verificada: T01 cerrada; registro oficial actualizado a
  `toefl-ibt-2026@2026-08-09.v2` sólo para enlazar el contrato T02, sin cambiar sus 48
  reglas oficiales.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 0 behind/7 ahead; se preservaron las 6 rutas
  tracked modificadas y todos los untracked concurrentes, incluido `output/`.
- Fuente oficial y fecha: reglas S1–S5 verificadas el 9 de agosto de 2026 en T01;
  próxima revisión el 9 de septiembre de 2026 o antes de release.
- Línea base de claims: 20/20 fuentes comentan “formato oficial vigente”; 20 títulos de
  fuente, 20 títulos de catálogo y 20 badges dicen “Formato 2026”; los 20 cards dicen
  42 preguntas; una plantilla de metadata afirma “simulacro completo/preguntas reales”;
  16/35 archivos de práctica ya separan formato oficial de estrategia WeLearn, 9/35
  incluyen no oficialidad explícita y el hub legacy conserva 4 claims de score/tiempo.
- Archivos inspeccionados: datos de examen y sets, catálogo, guía, metadata, runner,
  `ExamReport` y 35 archivos bajo `/practica/toefl`.
- Artefacto: `docs/toefl-2026-fidelity-and-disclosure-contract.md`, versión
  `2026-08-09.v1`, aprobado internamente para implementación y QA.
- Activos preservados y hashes: los fingerprints agregados de los 260 MP3 y 20 fuentes
  TOEFL se revalidaron contra T00 sin cambios.
- Clasificación A/B/C/D: los 20 sets actuales son B por alcance con
  `audited_with_blockers`; las prácticas de habilidad son A por defecto; ningún activo
  actual se declara C o D.
- Cambio o decisión: fidelidad y validación son ejes separados; el nivel se calcula por
  el mínimo demostrado y un disclosure no corrige un defecto. Se aprobaron 4 niveles,
  7 estados de validación, 11 dimensiones de clasificación, reglas de downgrade, 15
  disclosures canónicos, colocación por 10 superficies y un mapeo DIV-001–020.
- Resultado permitido para los sets B actuales: sólo métricas separadas de unidades
  objetivas válidas. Overall, Band 1–6, conversión aproximada /120 y claims de admisión
  quedan prohibidos hasta T11 y los pilotos correspondientes.
- Auditoría 1 — full-stack/datos/repositorio: pasa para contrato; se mapearon fuente,
  catálogo, metadata, intro, intento, reporte y persistencia conceptual sin tocar código
  ni cambios ajenos.
- Auditoría 2 — TOEFL: pasa; A/B no pueden prometer completitud/adaptación, C exige el
  blueprint fijo completo y D añade multietapa/enrutamiento validado, siempre sin
  equivalencia ETS.
- Auditoría 3 — editorial/pedagógica: pasa; las etiquetas describen alcance, el copy
  separa práctica/diagnóstico/examen y las reglas locales quedan identificadas.
- Auditoría 4 — audio: no aplica a aprobar assets; ningún MP3 cambió. Sin manifiesto y
  QA humano no se permite C/D, y ningún disclosure autoriza regeneración.
- Auditoría 5 — anti-sesgo/derechos: pasa; se prohíbe “preguntas reales” para contenido
  propio y DS-000 declara no afiliación sin asumir universidad, nacionalidad o acceso a
  micrófono.
- Auditoría 6 — UI/UX/accesibilidad: pasa como contrato; define proximidad desde card
  hasta historial, texto directo, no dependencia del color y lectura asistiva. No
  certifica la interfaz todavía no modificada.
- Auditoría 7 — Playwright: no aplica; T02 no cambia UI. La implementación futura debe
  probar card→intro→intento→resultado, persistencia del nivel y todos los disclosures.
- Validación documental: 4 niveles detallados, 15 IDs de disclosure únicos, 20/20
  divergencias mapeadas, matriz de superficies y reglas de claims completas; sin
  trailing whitespace ni fences desbalanceados.
- Comandos: búsquedas `rg` reproducibles de claims, conteos documentales,
  `git diff --check`, catálogo protegido, TypeScript y build completo al cierre.
- Métricas antes/después: antes existía una tabla resumen sin gate operativo; después
  existe un contrato versionado y el registro oficial enlaza su fuente canónica. El
  runtime permanece sin implementar deliberadamente.
- Capturas/muestras/manifiestos: no aplica; no cambió una superficie renderizada ni un
  medio.
- Fallos corregidos: se eliminó la ambigüedad conceptual entre “Formato 2026” y nivel de
  fidelidad; los claims actuales permanecen registrados para su unidad de implementación.
- Riesgos residuales: los usuarios todavía ven copy y scores divergentes; el contrato
  no debe confundirse con implementación. T03 inventariará cada objeto antes de T09–T19.
- Gate de salida: satisfecho — etiquetas y condiciones aprobadas, con clasificación
  actual y copy canónico.
- Estado final: cerrado.
- Próxima primera unidad elegible: T03 — Inventario editorial de 20 sets.

### Evidencia T03 — inventario editorial de 20 sets — 2026-08-09

- Alcance: inventario documental y normalizado de composiciones, secciones, estímulos,
  objetos fuente y unidades respondibles; no se modificó runtime, contenido, scoring,
  catálogo ni audio.
- Dependencias verificadas: T00 cerrada; se conservaron su snapshot, conteos y
  fingerprints. T01 y T02 se usaron para enlazar reglas de tarea y estados sin ampliar
  el gate de T03.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 0 behind/7 ahead; se preservaron las 6 rutas
  tracked modificadas, los untracked concurrentes y `output/`.
- Fuente oficial y fecha: registro `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de
  agosto de 2026; las partes se enlazaron a R-001–S-002 sin afirmar volumen completo.
- Línea base: 20 sets, 260 secciones, 940 objetos, 1.140 unidades fuente y 260
  referencias de audio; no existía un registro estable fila por fila de estímulos,
  blanks, tarea y estado.
- Archivos inspeccionados/modificados: se inspeccionaron `types.ts` y los 20
  `toefl-set-*.ts`. Se crearon
  `docs/toefl-2026-editorial-inventory-2026-08-09.md` y
  `docs/toefl-2026-editorial-inventory-2026-08-09.tsv`; sólo se actualizó este tablero
  en el documento maestro.
- Activos preservados y hashes: fuentes
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`; MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  inventario TSV
  `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`.
- Clasificación A/B/C/D/E: no asignada deliberadamente. Los 2.840 registros dicen
  `pending_T05`; los hijos son `draft + legacy_unverified` y los 20 sets conservan
  `draft + audited_with_blockers` según T02.
- Cambio o decisión: se fijaron cinco entidades y una gramática de IDs. Cada audio con
  su transcripción o script candidato cuenta como un estímulo multimodal; cada blank de
  Complete the Words cuenta como unidad propia; una pregunta conserva además su objeto
  fuente para no perder trazabilidad.
- Resultado: 20 sets + 260 secciones + 480 estímulos + 940 objetos + 1.140 unidades =
  2.840 registros. Cada set aporta 142; todos tienen ID, tarea oficial, estado, padre,
  estado de reutilización y visibilidad estructural.
- Auditoría 1 — full-stack/datos/repositorio: pasa para inventario; la regeneración
  exacta desde los 20 módulos coincidió byte por byte con el TSV, 2.840 IDs son únicos y
  2.820/2.820 padres resuelven sin tocar cambios ajenos.
- Auditoría 2 — TOEFL: pasa para clasificación de tarea; las 13 partes cubren las doce
  familias del registro, Build a Sentence enlaza W-001 y W-004, y los sets permanecen
  como práctica abreviada B, no blueprint completo.
- Auditoría 3 — editorial/pedagógica: pasa para formar la cola; no se fingió revisión,
  autoría, procedencia ni validación. T05 conserva la lectura, hallazgos y adjudicación
  A/B/C/D/E de cada contenido.
- Auditoría 4 — audio: pasa sólo para cobertura referencial; 100 Choose Response, 60
  audios largos y 100 Repeat forman 260 estímulos. No se escuchó, transcribió, generó,
  regeneró ni aprobó ningún MP3.
- Auditoría 5 — anti-sesgo/derechos: pasa para trazabilidad; el inventario no copia
  textos ni atribuye autoría inexistente. Hechos, sensibilidad, representación,
  similitud y licencia siguen abiertos en T05.
- Auditoría 6 — UI/UX/accesibilidad: no certifica UI; marca 20 objetos y 20 unidades
  `multiselect` como `unhandled` y sus 20 secciones/20 sets como `mixed`. T09/T13
  resolverán interacción y accesibilidad.
- Auditoría 7 — Playwright: no aplica; ninguna superficie renderizada cambió y una
  prueba E2E no demostraría cobertura documental.
- Comandos y resultados: importación Node con TypeScript stripping; comparación exacta
  fuente↔TSV; `wc`, `shasum -a 256`, `awk`, búsquedas `rg`, `git diff --check`,
  guardián de catálogo, TypeScript y build de producción al cierre.
- Métricas antes/después: de 0 registros editoriales normalizados a 2.840; 0 IDs
  duplicados, 0 campos obligatorios vacíos, 0 padres huérfanos y 20/20 sets con 142
  registros.
- Capturas/muestras/manifiestos: no aplica a UI. El TSV es el manifiesto editorial;
  el manifiesto técnico de 260 audios comienza en T04.
- Fallos corregidos: se eliminó la ambigüedad de contar 40 bloques Complete the Words
  como 40 respuestas y se dio identidad estable a estímulos que antes sólo vivían
  implícitos en secciones/objetos.
- Riesgos residuales: los contenidos siguen sin auditoría sustantiva; 20
  `multiselect` continúan omitidos; autoría/procedencia no están modeladas; 100 audios
  breves carecen de transcripción canónica en fuente; ningún estado `draft` permite
  release como validado.
- Gate de salida: satisfecho — todos los estímulos e ítems tienen ID, tarea y estado,
  con objetos fuente y secciones también trazados.
- Estado final: cerrado.
- Próxima primera unidad elegible: T04 — Manifiesto maestro de 260 audios.

### Evidencia T04 — manifiesto maestro de 260 audios — 2026-08-09

- Alcance: inventario individual de los 260 MP3 con identidad, vínculo editorial,
  integridad, duración, perfil y estado de transcripción/QA; no se modificó runtime,
  contenido, scoring ni ningún medio.
- Dependencias verificadas: T00 cerrada con 260 referencias = 260 archivos y
  fingerprints; T03 se usó como contrato de `stimulus_id`, `section_id` e `item_id`,
  sin ampliar el gate de T04.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 0 behind/7 ahead; se preservaron las 6 rutas
  tracked modificadas al iniciar T04. Durante las validaciones apareció una séptima
  ruta IELTS ajena; también se preservaron todos los untracked concurrentes y `output/`.
- Fuente oficial y fecha: `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de agosto de
  2026; los assets se enlazan a L-001–L-004 o S-001 sin inferir fidelidad completa,
  calidad ni adaptatividad.
- Línea base: 260 MP3, 45.440.352 bytes, 5.661.271 ms, 13 por set y fingerprint
  agregado conocido; no existía un manifiesto individual que reconciliara fuente,
  archivo, tarea, ítems, transcripción y estados de las tres capas.
- Archivos inspeccionados/modificados: se inspeccionaron los 20 `toefl-set-*.ts`, los
  260 MP3, FFprobe 8.1.1, el inventario T03, los tres documentos históricos de medios y
  los scripts existentes de auditoría/generación/reconstrucción. Se crearon
  `docs/toefl-2026-audio-manifest-2026-08-09.md` y
  `docs/toefl-2026-audio-manifest-2026-08-09.tsv`; sólo se actualizó este tablero.
- Activos preservados y hashes: fuentes
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`; MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  manifiesto TSV
  `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`.
- Clasificación A/B/C/D/E: no asignada. Los 260 assets son
  `draft + legacy_unverified` con `reuse_status=pending_T06_T07_T08`; un hash o un
  perfil uniforme no sustituye la decisión técnica, lingüística y humana.
- Cambio o decisión: cada original recibió `asset_id` estable y
  `source_asset_id` vacío por ser raíz. Futuras variantes deben tener ID/ruta nuevos y
  apuntar al original; nunca sobrescribirlo.
- Resultado: 260 filas × 49 columnas; 260 IDs, URLs, rutas y hashes únicos; 0 faltantes,
  0 huérfanos, 260 vínculos a estímulos y 440 asociaciones a ítems. Los 260 streams son
  MP3 mono, 44,1 kHz y 64 kbps.
- Transcripciones: 60 `section.transcript` y 100 `targetSentence` quedaron enlazados y
  hasheados como candidatos no adjudicados; 100 Choose Response quedaron
  `missing_source_pending_T07`. No existe todavía una transcripción canónica aprobada.
- Auditoría 1 — full-stack/datos/repositorio: pasa para manifiesto; fuente, T03,
  filesystem y TSV tienen paridad 260/260, los metadatos se recalcularon por archivo y
  no se tocó trabajo ajeno.
- Auditoría 2 — TOEFL: pasa para trazabilidad; cada asset tiene tarea/regla vigente. La
  mera presencia del audio no promete volumen, representación visual, navegación,
  naturalidad ni simulacro completo.
- Auditoría 3 — editorial/pedagógica: pasa para estado de guion; se separan candidato,
  ausencia y canon. No se infirió lo oído desde opciones ni se aprobó un guion sin
  contraste.
- Auditoría 4 — audio: pasa exclusivamente el gate T04; hash, bytes, duración, perfil,
  vínculo y transcripción/status están completos. `loudness_lufs`, `true_peak_db`,
  ASR, escucha humana y clase de reutilización permanecen abiertos en T06–T08.
- Auditoría 5 — anti-sesgo/derechos: pasa para trazabilidad; voces, roles, generador,
  modelo, settings y licencia/procedencia se registran como no documentados. No se
  atribuyeron proveedor o derechos por inferencia.
- Auditoría 6 — UI/UX/accesibilidad: no certifica UI; se inventariaron URLs, pero no se
  cambió ni aprobó reproducción, controles, un solo play, lector de pantalla o errores.
- Auditoría 7 — Playwright: no aplica; ninguna superficie renderizada cambió y E2E no
  demostraría la cobertura individual del manifiesto.
- Comandos y resultados: importación Node con TypeScript stripping, lectura/hash con
  `fs`/SHA-256, FFprobe individual, comparación contra T03 y filesystem, `wc`,
  `shasum -a 256`, `git diff --check`, catálogo protegido, TypeScript y build completo
  al cierre.
- Métricas antes/después: de una lista histórica de rutas sin estado individual a 260
  registros completos para T04; 0 IDs/rutas/hashes duplicados, 0 campos aplicables
  vacíos, 0 vínculos editoriales rotos y 20/20 sets con 13 assets.
- Capturas/muestras/manifiestos: no aplica a UI. El TSV es el manifiesto maestro; no se
  produjo muestra auditiva ni se generó material.
- Fallos corregidos: el primer lector de validación usó `trimEnd()` y eliminó tabs
  vacíos del último registro, causando un falso 47/49; se corrigió el validador para
  retirar sólo el salto final. Después, el guardián de whitespace detectó tabs finales
  reales en las 260 filas; se regeneró el TSV con `reviewer=not_assigned`, sin tocar
  los MP3. También se reconciliaron como históricos los documentos que aún llaman
  “pendientes” a archivos existentes.
- Seguridad: no se leyó `.env.local`, no se consultaron variables, no se llamó
  ElevenLabs, no se consumieron créditos y no se ejecutó `--generate`, `--write` ni
  ningún comando equivalente.
- Riesgos residuales: 0/260 transcripciones canónicas; 100 sin candidato fuente; 260
  sin loudness/true peak, ASR, escucha humana, voces, proveedor o licencia documentada;
  260 sin clase A/B/C/D/E. T04 no hace publicable ningún audio.
- Gate de salida: satisfecho — 100 % de los assets tienen hash, duración, vínculo y
  transcripción o status explícito.
- Estado final: cerrado.
- Próxima primera unidad elegible: T05 — Auditoría editorial global inicial.

### Evidencia T05 — auditoría editorial global inicial — 2026-08-09

- Alcance: lectura y clasificación inicial de las 1.140 unidades de respuesta de T03,
  con hallazgos, severidad, acción y ruta posterior. No se modificaron contenido
  fuente, runtime, scoring, UI ni medios.
- Dependencias verificadas: T03 cerrada con 2.840 registros y 1.140 `item_unit`; T01 y
  T02 se usaron como registro oficial y contrato de claims sin ampliar el gate de T05.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`. Se preservaron siete rutas tracked IELTS
  modificadas al iniciar T05; durante el trabajo concurrente el total tracked ajeno
  pasó a trece. También se preservaron todos los untracked ajenos y `output/`.
- Fuente oficial y fecha: `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de agosto de
  2026. Las reglas “generally” no se convirtieron en límites absolutos y la auditoría
  no atribuye autoría, oficialidad ni equivalencia psicométrica.
- Línea base: 940 objetos fuente y 1.140 unidades; ningún ítem tenía clase A/B/C/D/E,
  decisión editorial trazable, autoría/procedencia o estado de release individual.
- Archivos inspeccionados/modificados: se inspeccionaron los 20
  `src/data/mocks/toefl-set-*.ts`, tipos, renderer, T01–T04, documentos históricos y
  métricas reproducibles. Se crearon
  `docs/toefl-2026-editorial-audit-2026-08-09.md` y
  `docs/toefl-2026-editorial-audit-2026-08-09.tsv`; sólo se actualizó este tablero.
- Activos preservados y hashes: fuentes
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`; MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  inventario T03
  `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`;
  auditoría TSV
  `0b670a0b2178c185ef00c969d405ffb726413024d0aed7af227bdbc178d09ee3`.
- Clasificación A/B/C/D/E: 53 A candidatos editoriales a conservar, 857 B a reparar,
  228 C a segmentar/derivar preservando original, 2 D a reemplazar y 0 E existentes.
  A no significa release aprobado; las 1.140 filas siguen
  `blocked_not_validated`, con derechos no registrados y adjudicación independiente
  pendiente. E=0 no niega brechas futuras: T20 las medirá sin crear placeholders aquí.
- Resultado: 1.140 filas × 21 columnas; 1.140 IDs únicos; 1.140/1.140 en paridad con
  T03; 0 faltantes, extras, duplicados, acciones incoherentes o estados de release
  indebidamente abiertos.
- Hallazgos principales: 476 MCQ revelan la clave como única opción más larga; 120
  Academic Reading y 100 Academic Talk son C por longitud/densidad; 20 multiselect no
  están representados; 240 blanks carecen de contrato unitario de interacción/scoring;
  100 Choose Response no tienen transcripción fuente y presentan distractores débiles;
  120 Build a Sentence carecen de contexto/variantes; Speaking no captura producción.
- Reemplazos D: `item:t6-w-bs6` y `item:t10-w-bs6`, ambos incapaces de formar una
  respuesta gramatical/semántica responsable con los tiles fuente. No se reescribieron
  ni eliminaron.
- Fallos puntuales reparables registrados: `item:t20-r-cw1:blank-1` expone `bag` como
  prefix y respuesta completa; `t4-r-cw1` y `t6-r-cw1` son casi duplicados; el talk
  del set 17 contiene `fungthreads`; un Build a Sentence por set presenta tiles ya
  ordenados.
- Auditoría 1 — full-stack/datos/repositorio: pasa para el gate documental; TSV y T03
  tienen paridad exacta, padres/rutas resuelven, los hashes fuente permanecen estables
  y no se tocó trabajo ajeno.
- Auditoría 2 — TOEFL: pasa para diagnóstico inicial; se contrastaron doce familias,
  longitud, densidad e interacción contra T01. Los 20 sets siguen siendo práctica B
  abreviada, fija y no validada, no simulacros completos.
- Auditoría 3 — editorial/pedagógica: pasa T05; cada ítem tiene clase, hallazgo y
  acción. La matriz separa defecto editorial de derechos, audio, runtime y revisión
  experta para no transformar ausencia de evidencia en aprobación.
- Auditoría 4 — audio: no aplica como aprobación auditiva; 440 ítems dependientes
  conservan `pending_T06_T07_T08`. No se escuchó, transcribió, normalizó, recortó,
  regeneró ni sobrescribió ningún MP3.
- Auditoría 5 — anti-sesgo/derechos: pasa sólo para registro de riesgos; se midieron
  repetición, campus-centrismo y similitud interna, sin detectar contenido dañino
  manifiesto. Derechos/procedencia, similitud externa y revisión especializada siguen
  abiertos en las 1.140 filas. Un control factual puntual sobre la Gran Barrera de
  Coral se contrastó con NOAA/NASA y no produjo hallazgo.
- Auditoría 6 — UI/UX/accesibilidad: no certifica UI; no hubo cambio visual. Se
  conservaron 20 multiselect `unhandled` y los fallos de captura oral como bloqueos de
  T09/T13/T18/T19.
- Auditoría 7 — Playwright: no aplica; ninguna superficie renderizada cambió y E2E no
  demuestra calidad editorial. La cobertura se comprobó por paridad fuente↔T03↔TSV.
- Comandos y resultados: importación Node con TypeScript stripping; validadores de
  cobertura, clases, hallazgos y hashes; búsquedas `rg`; `git diff --check`;
  `npm run check:practica-catalog`; `npx tsc --noEmit`; `npm run build`. Todos pasaron.
- Métricas antes/después: de 0 a 1.140 ítems clasificados; 53 A, 857 B, 228 C, 2 D y
  0 E; 0 IDs duplicados o huérfanos; 1.140 bloqueos de derechos/release explícitos;
  440 dependencias de audio enrutadas.
- Capturas/muestras/manifiestos: no aplica a UI. El TSV es la matriz ítem por ítem y el
  Markdown contiene catálogo de 23 hallazgos, cruces por tarea, métricas y rutas.
- Fallos corregidos durante T05: el primer importador esperaba export nominal pero los
  módulos usan `export default`; se ajustó el lector temporal sin tocar fuente. Un
  primer validador tuvo un paréntesis incorrecto; se corrigió y la segunda ejecución
  pasó. La comprobación final detectó que el hallazgo de 20 tiles preordenados no se
  había propagado al TSV por usar un discriminante temporal incorrecto; se corrigieron
  exactamente esas 20 filas y se renovó el hash. Ninguno de esos fallos alteró el
  banco fuente.
- Seguridad: no se leyó `.env.local`, no se consultaron variables, no se llamó
  ElevenLabs, no se consumieron créditos y no se ejecutó generación o escritura de
  audio.
- Riesgos residuales: 1.140 sin derechos/procedencia documentados; 440 pendientes de
  T06–T08; 20 multiselect invisibles; Writing/Speaking sin contratos/captura completos;
  476 pistas de longitud; 2 D; sin búsqueda externa exhaustiva de similitud ni revisión
  humana independiente.
- Gate de salida: satisfecho — cada uno de los 1.140 ítems está clasificado A/B/C/D/E
  con hallazgos trazables, sin confundir clasificación inicial con validación o release.
- Estado final: cerrado.
- Próxima primera unidad elegible: T06 — Auditoría técnica global de audio.

### Evidencia T06 — auditoría técnica global de audio — 2026-08-09

- Alcance: medición técnica individual, comprobación de integridad, decodificación,
  silencios, loudness, true peak, clipping, bordes, duplicados y reproducción Chromium
  de los 260 MP3 existentes. No se regeneró, procesó ni sobrescribió ningún audio.
- Dependencias verificadas: T04 cerrada con 260 assets, hashes, duraciones, perfiles,
  vínculos y estados; su TSV SHA-256
  `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`
  fue la autoridad de identidad para T06.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 7 commits delante de su upstream y 0
  behind/5 ahead respecto de `origin/main`. Se preservaron las trece rutas tracked
  IELTS modificadas y todos los untracked concurrentes, incluido `output/`.
- Fuente oficial y fecha: `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de agosto de
  2026. La especificación ETS revisada no publica un objetivo numérico de LUFS/dBTP;
  el objetivo −16 LUFS ±2,5 y los umbrales de pico/silencio son contrato interno
  WeLearn basado en el auditor histórico, no requisito atribuido a ETS.
- Línea base: 260 MP3 presentes y perfilados, pero sin loudness, true peak,
  decodificación completa, PCM hash, clipping, DC, silencios, bordes, casi duplicados
  ni reproducción real en navegador registrados por asset.
- Archivos inspeccionados/modificados: se inspeccionaron el manifiesto T04, los 260
  MP3, `scripts/audit-listening-audio.mjs`, los documentos históricos de producción de
  medios y fuentes técnicas primarias. Se crearon
  `docs/toefl-2026-audio-technical-audit-2026-08-09.md` y
  `docs/toefl-2026-audio-technical-audit-2026-08-09.tsv`; sólo se actualizó este
  tablero.
- Activos preservados y hashes: fingerprint MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  informe Markdown
  `6633a76bbb6ae1b094fbe9afe221595833c2d3dca5bddab22a22fb92abef62d2`;
  matriz TSV
  `21c15c0f8eaa63b17ab5d17f74e9aa8678da51ca00624bae6887ab922419653f`.
- Clasificación A/B/C/D/E: no se asignó una clase global. La matriz usa únicamente
  `A_technical_conserve_candidate` o `B_technical_repair_candidate`; los 260 assets
  conservan `overall_reuse_status=pending_T07_T08` y
  `release_status=blocked_not_validated`.
- Resultado: 142 `pass_automated_T06`, 61
  `pass_with_actionable_warning` y 57 `fail_actionable`; 260/260 tienen resultado,
  valores medidos y acción/owner cuando fallan. La cobertura T04↔T06 es exacta, sin
  faltantes, extras o divergencias de hash, bytes o duración.
- Hallazgos: 37 ocurrencias `TECH-LDN-002` fuera de −18,5..−13,5 LUFS; 21
  `TECH-SIL-002` por colas de 610–790 ms; una `TECH-PEAK-001` y una
  `TECH-PEAK-002` en el mismo `set-5/repeat-5`, medido en +0,29 dBTP y cinco muestras
  recortadas. Advertencias: 61 de headroom, 27 de margen de loudness y una de borde.
- Familias: Academic Talk concentra 16 fallos y cuatro warnings, todos bajos respecto
  del contrato; Repeat tiene 27 fallos y Choose Response 13; Announcement tiene cero
  fallos. Esto es diagnóstico técnico, no una decisión de reemplazo de guion o voz.
- Integridad y duplicados: FFmpeg decodificó 260/260; hay 260 hashes MP3 y 260 hashes
  PCM únicos; no apareció candidato casi duplicado bajo el umbral conjunto versionado.
- Auditoría 1 — full-stack/datos/repositorio: pasa T06; identidad, rutas y métricas
  tienen paridad 260/260 y el trabajo ajeno permaneció intacto.
- Auditoría 2 — TOEFL: pasa como capa técnica; cada asset conserva su vínculo L-001–004
  o S-001 y no se presenta el threshold interno como regla ETS. Volumen, visuales,
  adaptatividad, tiempos y fidelidad total siguen fuera de este gate.
- Auditoría 3 — editorial/pedagógica: no adjudica calidad lingüística; guion,
  concordancia, prosodia, naturalidad, dificultad y voces continúan en T07–T08.
- Auditoría 4 — audio: pasa T06; 100 % medido y 100 % con pase o fallo accionable. Los
  57 fallos apuntan a variantes versionadas futuras, nunca a overwrite del original.
- Auditoría 5 — anti-sesgo/derechos: no certifica acentos, identidades, proveedor,
  licencia o consentimiento; no se infirieron esos datos desde la señal.
- Auditoría 6 — UI/UX/accesibilidad: no certifica la interfaz porque no cambió. El
  playback técnico pasa, mientras single-play, teclado, lector de pantalla y manejo de
  error permanecen para las unidades de runtime/UI.
- Auditoría 7 — Playwright/Chromium: pasa; una sesión limpia hizo fetch, decode completo
  y reproducción HTMLAudio silenciada de 260/260, con delta máximo de duración 0 ms,
  un canal y cero errores/warnings de consola.
- Comandos y resultados: FFmpeg/FFprobe 8.1.1; SHA-256; análisis PCM y correlaciones;
  validadores Node de cobertura/estado/acciones; servidor local en `127.0.0.1`;
  Playwright CLI/Chromium; verificación independiente de loudness/true peak y cola;
  `git diff --check`, catálogo protegido, TypeScript y build completo al cierre.
- Métricas antes/después: de 0 a 260 auditorías técnicas de 46 campos; 260/260 hashes,
  bytes, duraciones, perfil y decode correctos; 260/260 playback Chromium; 0 decoder
  warnings, 0 metadatos divergentes, 0 duplicados, 0 silencios iniciales fallidos y 0
  pausas internas largas.
- Capturas/muestras/manifiestos: el TSV es la matriz completa. No se tomó captura porque
  no hubo UI; el resultado estructurado de decode/playback es la evidencia aplicable.
- Fallos corregidos durante T06: el primer arnés estático pidió `/audio/...` desde la
  raíz del repo y produjo falsos 404; se corrigió a `/public/audio/...`, se abrió una
  sesión Chromium nueva y el segundo recorrido pasó 260/260. La primera forma de
  `run-code` no respetó la firma funcional de la CLI instalada y se corrigió sin tocar
  producto. Un validador de colas tuvo un paréntesis incompleto; la ejecución corregida
  confirmó 21 casos, mínimo 610 y máximo 790 ms.
- Seguridad: no se leyó `.env.local`, no se consultaron variables ni secretos, no se
  llamó ElevenLabs, no se consumieron créditos y no se ejecutó generación, trim,
  normalización, limiting o overwrite.
- Riesgos residuales: 57 reparaciones técnicas no ejecutadas; 61 warnings pendientes
  de escucha; 260 transcripciones/guiones aún no adjudicados lingüísticamente; voces,
  acentos, naturalidad, proveedor, derechos y escucha humana siguen abiertos. Un pase
  técnico no convierte un asset en publicable.
- Gate de salida: satisfecho — el 100 % pasa o tiene fallo accionable registrado; cada
  fallo incluye finding, métrica, acción versionada y owner.
- Estado final: cerrado.
- Próxima primera unidad elegible: T07 — Auditoría lingüística/ASR de audio.

### Evidencia T07 — auditoría lingüística/ASR de audio — 2026-08-09

- Alcance: transcripción diagnóstica local de los 260 MP3, reconciliación de 160 textos
  fuente, recuperación candidata para 100 Choose Response sin fuente, diferencias,
  tokens críticos, señales de confianza, longitud/densidad, duplicidad textual y
  concordancia preliminar prompt↔clave. No se adjudicó texto canónico ni se escuchó
  humanamente el lote.
- Dependencias verificadas: T04 y T06 cerradas. El manifiesto T04 SHA-256
  `4982abc724898d1b85b60f9605e981c25abcd390839ca9c80630a8c6b37d9913`
  y la auditoría T06 SHA-256
  `21c15c0f8eaa63b17ab5d17f74e9aa8678da51ca00624bae6887ab922419653f`
  fueron las autoridades de identidad y estado técnico.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 7 commits delante de su upstream y 0
  behind/5 ahead respecto de `origin/main`. Se preservaron las trece rutas tracked
  IELTS modificadas y todos los untracked concurrentes, incluido `output/`.
- Fuente oficial y fecha: `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de agosto de
  2026. Se aplicaron L-001–L-005; WER, confianza ASR, similitud textual y WPM
  descriptivo son guardas internas WeLearn, no criterios ETS ni scoring oficial.
- Línea base: 160/260 candidatos fuente, 100 Choose Response sin fuente, 0/260
  transcripciones canónicas y 0 auditorías lingüísticas estructuradas por asset.
- Archivos inspeccionados/modificados: se inspeccionaron el manifiesto T04, la matriz
  T06, las fuentes `src/data/mocks/toefl-2026/set-*` y los 260 MP3. Se crearon
  `docs/toefl-2026-audio-linguistic-audit-2026-08-09.md` y
  `docs/toefl-2026-audio-linguistic-audit-2026-08-09.tsv`; sólo se actualizó este
  tablero. No se modificó código de producto ni audio.
- Integridad y hashes: fingerprint de fuentes
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`;
  fingerprint MP3
  `dab2fdb8340d2dc72df4d70923985bdfd876174a922d646a3795bb39a5619842`;
  modelo Whisper small
  `9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794`;
  resultados ASR
  `11e9a1bbc787c8b434b15958969e81f71325a231c10df82957d44d4e1df79c0e`;
  transcripciones
  `ff7a24687edbbccd7b26da98bbc00ffc36bd5a33026bbae69628955af8fc6242`;
  informe Markdown
  `ded4620e2354e1d686e7a1549b6e27079a2d5366eb410f72036b3e52c0ac3f70`;
  matriz TSV
  `be14fa0baa96a8fc6fc25cd07198913f4035e88c26945647f1e950c17330eaaf`.
- Ejecución ASR: `openai-whisper` release `20250625`, modelo local `small`, CPU,
  `language=en`, `temperature=0`, `beam_size=5`, sin contexto previo ni timestamps de
  palabra. La corrida uniforme duró 3.002,1 s y produjo 260/260 textos y segmentos no
  vacíos, idioma/modelo/release correctos y 0 divergencias de ruta relativa.
- Reconciliación: 114 coincidencias normalizadas respaldadas, una coincidencia exacta
  con señal ASR baja, 11 diferencias menores y 34 materiales sobre 14.548 palabras
  fuente/122 operaciones, WER micro 0,008386. Los 100 faltantes recibieron hipótesis
  ASR, nunca estado canónico.
- Hallazgos automáticos: 21 assets con token crítico conservador; tres señales de
  confianza accionables; cero repeticiones novel detectadas; cinco pares textuales
  cercanos que abarcan nueve Choose Response. T06 mantiene 260 hashes MP3/PCM únicos,
  así que la similitud lingüística no se rotuló como duplicado de señal.
- Longitud: 20/20 Conversations (178–270 palabras) y 20/20 Announcements (117–164)
  superan la referencia intermedia de 100; 20/20 Academic Talks (271–343) superan la
  referencia extendida de 250. Los 60 se conservan como candidatos de segmentación o
  reencuadre para T08/T15; no se ordenó reemplazo ni generación.
- Choose Response: revisión preliminar ASR prompt↔clave en 100/100; 93 sin
  contradicción semántica visible, cuatro respuestas poco naturales con “Yes” ante
  “How” (`LING-EXCHANGE-001`), una discordancia plural/singular
  (`LING-EXCHANGE-002`) y dos hipótesis ASR inciertas
  (`LING-ASR-UNCERTAIN-001`). Texto canónico, sílabas tónicas, distractores,
  naturalidad y voz siguen en T08.
- Cola humana: 170 P1, 24 P2 y 66 P3. Son 194 revisiones obligatorias al 100 % y 66
  conservados para muestra estratificada. Las 260 filas tienen owner T08, razón,
  alcance, `canonical_transcript_status=pending_human_adjudication_T08`,
  `overall_reuse_status=pending_T08` y `release_status=blocked_not_validated`.
- Clasificación A/B/C/D/E: no se asignó una clase global. Los candidatos exclusivamente
  lingüísticos son 90 A-conservar, 100 B-adjudicar transcripción, 10 B-adjudicar o
  reparar y 60 C-segmentar/reencuadrar; T08 debe cruzarlos con T06 y decidir escuchando.
- Auditoría 1 — full-stack/datos/repositorio: pasa T07; cobertura T04↔T06↔T07 exacta
  260/260, 57 campos por fila, ids únicos y hashes/estados técnicos sin divergencia.
- Auditoría 2 — TOEFL: pasa como diagnóstico; reglas L-001–L-004 conservadas y los 60
  excesos de longitud quedan accionables. Volumen, adaptatividad, navegación y
  fidelidad integral siguen fuera del gate.
- Auditoría 3 — editorial/pedagógica: pasa el gate de cola; cada diferencia o ausencia
  tiene prioridad y owner, y siete Choose tienen hallazgo específico. Naturalidad y
  dificultad no quedan aprobadas sin T08.
- Auditoría 4 — audio: pasa T07 como capa ASR; 260/260 transcritos, 160 comparados, 100
  recuperados y 0 aprobaciones canónicas automáticas. Los MP3 originales quedaron
  intactos.
- Auditoría 5 — anti-sesgo/derechos: no certifica acentos, identidad/continuidad de
  voz, licencia, consentimiento, proveedor o procedencia; permanecen pendientes.
- Auditoría 6 — UI/UX/accesibilidad: no aplicable; no cambió UI, runtime, teclado,
  lector de pantalla ni reproducción.
- Auditoría 7 — Playwright/Chromium: no aplicable a T07 sin cambio de UI/runtime; se
  conserva el playback 260/260 de T06 sin presentarlo como evidencia lingüística.
- Comandos y resultados: extracción dinámica de las 20 fuentes; Whisper local;
  normalización/alineación con backtrace; validadores Python/Node de cobertura,
  joins, hashes, cola y estados; `git diff --check`; guardián de catálogo; TypeScript y
  build completo, todos aprobados.
- Métricas antes/después: de 0 a 260 auditorías lingüísticas de 57 campos; de 0 a 260
  hipótesis ASR; de 0 a 100 candidatos recuperados para Choose; 0/260 textos canónicos
  antes y después porque su aprobación pertenece a T08.
- Fallos corregidos durante T07: una prueba con timestamps por palabra se descartó tras
  dos assets por costo y la corrida completa se reinició uniformemente sin timestamps;
  un validador comparó ruta relativa contra absoluta y produjo 260 falsos mismatches,
  corregidos a 0/260; la comprobación de sintaxis se hizo en memoria después de que
  `py_compile` intentara crear caché fuera del sandbox. No se mezclaron resultados.
- Seguridad: no se leyó `.env.local`, no se consultaron variables ni secretos, no se
  llamó ElevenLabs ni otra API, no se consumieron créditos y no hubo generación,
  trim, normalización, limiting o overwrite.
- Riesgos residuales: 0/260 textos canónicos; 194 escuchas obligatorias y 66 muestreadas;
  57 fallos técnicos T06; 60 candidatos de segmentación/reencuadre; siete intercambios
  Choose específicos; voces, acentos, prosodia, pronunciación, naturalidad, artefactos,
  dificultad y derechos sin adjudicar. Un pase ASR no vuelve publicable un asset.
- Gate de salida: satisfecho — cada asset tiene hipótesis no vacía; las 160 fuentes están
  reconciliadas; los 100 faltantes tienen candidata; y toda diferencia o decisión está
  resuelta como evidencia o en una cola humana trazable.
- Estado final: cerrado.
- Próxima primera unidad elegible: T08 — Auditoría humana estratificada de audio.

### Evidencia T08 — preparación y calibración de escucha humana — 2026-08-09

- Alcance de la rebanada: convertir la cola T07 en un protocolo humano ejecutable,
  fijar cobertura, severidad, stop rules, segunda revisión y un lote de calibración. No
  se sustituyó la escucha por ASR ni se adjudicó ningún asset sin una persona.
- Dependencia verificada: T07 cerrada con 260 hipótesis ASR, 170 P1, 24 P2, 66 P3,
  0 canones y release bloqueado. T08 continúa siendo la primera unidad abierta; T09 no
  es elegible.
- Estado Git y cambios ajenos: HEAD
  `cf037bf68d766b8bc2cb81f930a4b5a42ffbeb78`, rama
  `codex/ielts-task2-introduction-pilot`, 7 commits delante de su upstream. Se
  preservaron las trece rutas tracked IELTS modificadas y todos los untracked
  concurrentes, incluido `output/`.
- Fuente oficial y fecha: `toefl-ibt-2026@2026-08-09.v2`, verificado el 9 de agosto de
  2026. El protocolo evalúa idoneidad para L-001–L-004/S-001; ratings, WER y clases
  internas no se atribuyen a ETS ni se convierten en scoring.
- Línea base: 0/260 escuchas humanas registradas, 0/260 canones adjudicados, 0 clases
  finales y 260 `blocked_not_validated`. La señal completa dura 94,355 minutos.
- Archivos inspeccionados/modificados: se inspeccionaron T06/T07 y sus 260 filas. Se
  creó `docs/toefl-2026-audio-human-audit-plan-2026-08-09.md`, el libro
  `outputs/toefl-t08-human-review-2026-08-09/toefl-2026-audio-human-review.xlsx` y sus
  previews de QA; sólo se actualizó este tablero. No se modificó producto ni audio.
- Integridad y hashes: libro XLSX
  `b78c9ddb73a9f77b1abc78b5fbb2525108bc262bc124d1b90d79018023c5e9c6`;
  plan Markdown
  `964117478447893247311a06fe8ed37b2cdfb5cede082e1ca12a916d794bce29`;
  el libro fija T07
  `be14fa0baa96a8fc6fc25cd07198913f4035e88c26945647f1e950c17330eaaf`
  y T06
  `21c15c0f8eaa63b17ab5d17f74e9aa8678da51ca00624bae6887ab922419653f`.
- Paquete: cinco hojas (`Resumen`, `Calibración`, `Cola humana`, `Reglas`, `Listas`),
  260 filas × 53 columnas, IDs únicos, valores validados y fórmulas visibles de
  segunda revisión, completitud, errores y gate. Parte en 0 escuchas, 0 filas
  completas, 0 canones y `PENDIENTE_HUMANO`.
- Revalidación operativa: tres comprobaciones consecutivas del libro no encontraron
  edición humana. La tercera reimportó el mismo hash y contó directamente las 260
  filas: 0 `reviewed`, 0 conteos de escucha, 0 canones, 0 ratings, 0 findings, 0
  clases, 0 decisiones, 0 revisores/roles/attestations/fechas, 0 segundas revisiones y
  0 adjudicaciones. La instrucción Finder (`⌘⇧G`) permanece disponible sin macros ni
  cambios al MP3.
- Cobertura fijada sin bajar umbrales: P1 170/170, P2 24/24 y P3 66/66 deben
  escucharse. Son 94,355 minutos de señal primaria. CAL-01 exige doble revisión y
  añade como mínimo 8,411 minutos; piso auditivo 102,766 minutos, sin replays ni
  adjudicación.
- CAL-01: 20 assets, 14 P1, 1 P2 y 5 P3; ocho Choose Response, dos Conversations, un
  Announcement, dos Academic Talks y siete Repeat. Incluye los 13 audios del Set 1 y
  siete riesgos dirigidos: clipping, dos hipótesis ASR inciertas, discordancia
  singular/plural, dos señales largas de baja confianza y un Repeat exacto con señal
  ASR baja.
- Reglas de lote: 20 reglas HUM-001–020. CAL-01 tiene dos revisores; cualquier canon
  corregido, major/blocker o decisión B/C/D exige segunda revisión; tres fallos del
  mismo patrón detienen la familia; E no se asigna a un original y no hay generación
  antes de T20/T21.
- Campos humanos: escucha a 1×, número de escuchas, decisión de canon, canon,
  claridad, naturalidad, prosodia, pronunciación, velocidad/pausas, voces, artefactos,
  corte semántico, dificultad, idoneidad, acento, sesgo, derechos, findings, clase,
  decisión, justificación, identidad/rol, attestation, fecha y adjudicación.
- Clasificación A/B/C/D/E: no se asignó. El libro permite A–D con reglas conservadoras,
  pero todas las filas están vacías y bloqueadas. T08 sólo puede clasificar después de
  escucha y no publica ni libera assets.
- Auditoría 1 — full-stack/datos/repositorio: pasa esta preparación; T06↔T07↔libro
  tienen paridad 260/260, prioridades 170/24/66 y 20 CAL-01 exactos. No se tocó
  trabajo ajeno.
- Auditoría 2 — TOEFL: pasa como protocolo; separa tarea, idoneidad, longitud y
  dificultad sin prometer examen completo, adaptatividad ni score oficial.
- Auditoría 3 — editorial/pedagógica: pasa como rúbrica; canon, pregunta/clave,
  naturalidad, dificultad y fit están separados. La evaluación sustantiva sigue en 0.
- Auditoría 4 — audio técnico/lingüístico/humano: abierta; el paquete y las reglas
  existen, pero 0/260 han sido escuchados por una persona. No se finge el gate.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: pasa como contrato de observación
  y stop; acentos, estereotipos y derechos siguen pendientes de evidencia.
- Auditoría 6 — UI/UX/accesibilidad: pasa para el libro de revisión; tiene resumen,
  filtros, panes congelados, validaciones, texto redundante al color y campos editables
  diferenciados. No certifica el runner web.
- Auditoría 7 — Playwright: no aplica; no cambió UI/runtime. El XLSX se verificó por
  render de sus cinco hojas y reimportación posterior.
- Comandos y resultados: builder `@oai/artifact-tool`; inspección de rangos y fórmulas;
  búsqueda de errores; seis renders; importación post-export; `unzip -t`; validadores
  de filas, IDs, prioridades, muestra y hashes; `git diff --check`; guardián de
  catálogo; TypeScript y build completo. El XLSX abrió con cinco hojas, 260 filas, 53
  campos y 0 errores de fórmula; la tercera importación confirmó 0 en todos los campos
  humanos y todos los guardianes finales pasaron.
- Fallos corregidos: el primer libro contaba celdas de texto vacío como 260 canones y
  260 segundas revisiones; se cambiaron a celdas realmente vacías y el resumen volvió
  a 0/0. La primera regla de color hacía match de `complete` dentro de `incomplete`;
  se reemplazó por expresión exacta y los pendientes quedaron rojos. Un primer build
  encontró otro `next build` concurrente; no se mató el proceso ni se borró su lock.
  Al terminar éste, el reintento seguro compiló y generó 1.263 páginas sin error. En
  la revalidación se probó `HYPERLINK`, pero el exportador guardó un valor de caché no
  implementado; se retiró antes de entregar y el libro final conserva las rutas
  originales, sin fórmulas rotas.
- Seguridad: no se leyó `.env.local`, no se consultaron secretos, no se llamó
  ElevenLabs ni otra API, no se consumieron créditos y no hubo generación, trim,
  normalización, limiting, overwrite, commit, push, deploy, merge, rebase o cambio de
  remotos.
- Riesgos residuales: faltan 260 escuchas primarias, 20 segundas de calibración y toda
  segunda revisión adicional disparada por hallazgos; 0 canones y 0 clases humanas.
  El libro facilita la tarea, pero no sustituye a los revisores.
- Gate de salida: no satisfecho — la muestra todavía no está escuchada/aprobada y los
  severos no tienen revisión humana al 100 %.
- Decisión de secuencia: el owner difiere T08 hasta completar T09–T13 y T16–T17. La
  unidad pasa a `[~]`; el libro, CAL-01, la cobertura 170/24/66 y las reglas
  HUM-001–020 no cambian.
- Estado final: diferido por decisión del owner, no cerrado ni aprobado. La ausencia
  de escucha humana permanece explícita y ningún asset cambia de release.
- Próxima primera unidad elegible: T09 — Contrato datos-render-scoring. T08 debe
  reabrirse antes de T14, T15, T18, T19 y T20–T22.

### Evidencia T09 — contrato datos → render → respuesta → scoring → reporte — 2026-08-09

- Alcance: definición normativa y medible de identidad, presentación, respuesta,
  evaluación, outcome, conteos y reporte para las doce familias TOEFL y la variante
  local `multiselect`. No se modificó runtime, banco, scoring, persistencia ni audio.
- Dependencias verificadas: T01 cerrada con 48 reglas y registro
  `toefl-ibt-2026@2026-08-09.v2`; T03 cerrada con 940 objetos y 1.140 unidades. T08
  permanece diferida, no aprobada, y no bloquea el contrato no-audio T09.
- Estado Git y cambios ajenos: HEAD
  `9a2a6be2d43439adec283c937d9eca3f2f21226f`, rama
  `codex/ielts-task2-introduction-pilot`, ocho commits delante de su upstream. Se
  preservaron todas las rutas IELTS tracked y untracked concurrentes, `output/` y
  `outputs/`; no se mezcló ni editó ninguna de ellas.
- Fuente oficial y fecha: página operativa, especificaciones 2026, Teacher FAQ y
  Teacher Resources Practice Test 1 de ETS reabiertos el 9 de agosto de 2026. Se
  reconfirmaron 50/47/12/11, un punto máximo por ítem puntuado de R/L, Build 1,
  Email/Discussion 5 y Speaking 5; la práctica en papel sólo confirmó interacción.
- Línea base: 1.140 unidades fuente, 1.120 atendidas por el runner, 20 multiselect
  omitidas, 900 incluidas en denominadores automáticos, 240 Complete the Words con
  unidad input/scoring incompatible, 40 textos autoevaluados, 180 tareas orales sin
  captura y 0 outcomes trazables por `item_id` en el reporte.
- Archivos inspeccionados: 20 `toefl-set-*.ts`, `types.ts`, cliente TOEFL 2026,
  `ExamReport`, `saveExamResult`, T01, T02, T03 y T05. Los hashes iniciales de las
  cuatro rutas de runtime quedaron fijados en el artefacto para detectar superposición.
- Archivos creados:
  `docs/toefl-2026-data-render-scoring-contract-2026-08-09.md` y
  `docs/toefl-2026-data-render-scoring-contract-2026-08-09.tsv`; sólo se actualizó
  este tablero adicionalmente.
- Integridad y hashes: contrato Markdown
  `30a2aa732cf94b150caea27586695f4c1906c33e4ffd3290d87c0c907acf00a3`;
  matriz TSV
  `8089bba71e6a63017651d033d6e2b250eb41c208be00b0820a8caba392cf696f`;
  inventario T03
  `fbeb7d5d7580f12accc526266e11f46e598d7c1d4010c331b8323af96dbd69e6`;
  fuentes TOEFL
  `50b3b8d7dd04826cf625052e7910b844c305894d43b2eae5fda01f881d3d512d`.
- Cambio o decisión: cada unidad incluida debe tener ID, renderer exhaustivo,
  `response_kind`, outcome total y fila reportable. Se aprobaron seis formas de
  respuesta, siete estados de outcome —incluido `not_presented`—, diez invariantes,
  conteos reconciliables y fallo cerrado ante tipo/clave/evaluador/versionado ausente.
- Resultado: 13 filas × 20 columnas, 13 IDs únicos, 940 objetos, 1.140 unidades
  fuente, 1.120 visibles y 900 en el denominador automático actual; 13/13 filas tienen
  renderer, respuesta, cardinalidad, máximo, evaluación, outcome, agregación,
  bloqueos y unidad piloto propietaria.
- Complete the Words: el contrato canónico es letras faltantes; la palabra completa se
  conserva para validar reconstrucción, no como unidad que el estudiante deba repetir.
- Multiselect: se conserva como variante local explícita de R-003, con cardinalidad y
  conjunto exactos; T13 decide alineación, pero ningún renderer puede volver a
  omitirla o convertirla silenciosamente en selección única.
- Respuestas construidas: Email, Discussion, Repeat e Interview quedan
  `pending_evaluation`/`not_evaluated` hasta captura y evaluador válidos. No pueden
  alimentar overall, banda ni aproximación `/120` por autoevaluación.
- Clasificación A/B/C/D/E: no se alteró T05. El contrato conserva todo el banco y sus
  bloqueos; no convierte una unidad reparable o derivable en validada.
- Auditoría 1 — full-stack/datos/repositorio: pasa T09. Importación directa de los 20
  módulos reprodujo 940/1.140/1.120/900; TSV tiene 20 columnas uniformes y 0 IDs
  duplicados. Datos, renderer, progreso, scoring, reporte y guardado quedaron
  reconciliados sin tocar código ni trabajo ajeno.
- Auditoría 2 — TOEFL: pasa para contrato. La unidad y máximos derivan de S1–S4; no se
  atribuyen a ETS la normalización, el score local o la variante multiselect.
- Auditoría 3 — editorial/pedagógica: pasa como frontera. Estímulo, respuesta,
  evaluación y reporte están separados; variantes aceptables requieren adjudicación y
  los hallazgos T05 siguen bloqueando pilotos.
- Auditoría 4 — audio: no aplica a aprobar medios. Ningún MP3/manifiesto/transcripción
  cambió; fallos técnicos y respuestas orales se modelan sin fingir que T08 pasó.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: pasa para trazabilidad. Fallo
  técnico, permiso denegado o accesibilidad no se convierten en bajo desempeño;
  `GOV-001` y derechos siguen abiertos para las 1.140 unidades.
- Auditoría 6 — UI/UX/accesibilidad: pasa como contrato, no como certificación del
  runner. Fija cardinalidad anunciada, IDs estables, teclado, nombres accesibles,
  fallback oral y reporte textual; cada piloto debe probar su UI real.
- Auditoría 7 — Playwright: no aplica a la decisión documental porque no cambió
  runtime. T12–T19 reciben asserts obligatorios de respuesta, recarga, cierre,
  reconciliación y reporte para sus E2E.
- Correcciones tras la primera ronda: el resumen decía 520 MCQ preservables donde el
  inventario prueba 540; se corrigió a 540. También se añadió `not_presented` después
  de detectar que un intento abandonado no cabía en la primera partición de outcomes.
  La segunda auditoría confirmó sumas y fórmulas de reconciliación.
- Comandos y resultados: importación Node de 20 módulos; `awk` para columnas, filas,
  sumas e IDs; `rg` de ramas renderer/progreso/scoring/reporte; SHA-256; balance de
  fences; `git diff --check`; guardián de catálogo, TypeScript y build completo al
  cierre de la unidad.
- Métricas antes/después: de 0 a 13 perfiles normativos; de una respuesta implícita
  por estado React a seis `response_kind`; de 0 outcomes trazables a un contrato total
  de siete estados. El runtime conserva deliberadamente sus métricas iniciales hasta
  que los pilotos autorizados implementen cada familia.
- Seguridad: no se leyó `.env.local`, no se consultaron secretos, no se llamó ninguna
  API paga, no hubo generación de contenido/audio, commit, push, deploy, merge, rebase
  ni cambio de remotos.
- Riesgos residuales: el producto actual sigue omitiendo 20 unidades, calificando mal
  240 blanks y mostrando scoring compuesto inválido; T09 define la frontera pero no
  corrige esos fallos. Persistencia/privacidad pertenecen a T11, tiempos/navegación a
  T10 y las interacciones reales a T12–T19.
- Gate de salida: satisfecho para contrato — cada tipo es representable y toda unidad
  incluida debe llegar a un outcome reportable sin pérdida silenciosa.
- Estado final: cerrado.
- Próxima primera unidad elegible: T10 — contrato de tiempo, módulos y navegación.

### Evidencia T10 — contrato de tiempo, módulos y navegación — 2026-08-09

- Alcance: contrato normativo de estados, relojes, orden, módulos, rutas,
  irreversibilidad, recuperación y excepciones para `learn`, `practice`,
  `exam_fixed`, `exam_adaptive` y `review`. No se modificó runner, schema físico,
  scoring, banco, contenido ni audio.
- Dependencias verificadas: T01 permanece cerrada con 48 reglas y registro
  `toefl-ibt-2026@2026-08-09.v2`; T02 permanece cerrada con niveles A/B/C/D y
  disclosures; T09 se usó para outcomes y `not_presented`. T08 continúa `[~]`,
  diferida por decisión del owner y sin aprobación humana; no bloquea T10.
- Estado Git y cambios ajenos: HEAD
  `9a2a6be2d43439adec283c937d9eca3f2f21226f`, rama
  `codex/ielts-task2-introduction-pilot`, ocho commits delante del upstream. Se
  preservaron todas las rutas IELTS tracked/untracked concurrentes, `output/` y
  `outputs/`; ninguna se editó para esta unidad.
- Fuente oficial y fecha: página operativa TOEFL iBT Test Content, especificaciones
  2026, Teacher FAQ y Teacher Resources Practice Test 1 de ETS reabiertos el 9 de
  agosto de 2026. Se reconfirmaron R→L→W→S, 30/29/23/8 minutos base aproximados,
  directions excluidas, dos etapas en R/L, no retorno entre etapas, Back sólo dentro
  del módulo Reading, Listening por pregunta y forward-only, Email 7, Discussion 10
  y Speaking sin preparación/con reloj por respuesta.
- Línea base: los 20 sets declaran `timeMinutes: 86`; el cliente tiene un solo timer
  React de 5.160 segundos, cinco fases de alto nivel, cuatro skill tabs libres, todos
  los ítems de la habilidad montados juntos y 0 campos de módulo, ruta o deadline
  durable. Recargar pierde respuestas/posición; cambiar de skill puede remontar el
  reproductor de un play. No existe reloj de módulo, pregunta, tarea o respuesta.
- Lectura temporal: la suma pública 30+29+23+8 es 90 minutos, cuatro más que el valor
  local. S2 permite rutas estimadas de 83–90 minutos —Reading 27–30 y Listening
  25/29—, por lo que 86 aislado no identifica una ruta. La divergencia concluyente es
  usar el mismo 86 en todos los sets sin composición, módulos, ruta ni clocks por
  alcance.
- Archivos inspeccionados: 20 `toefl-set-*.ts`, `types.ts`, cliente TOEFL 2026,
  `primitives.tsx`, T01, T02, T09 y este loop. Archivos creados:
  `docs/toefl-2026-time-modules-navigation-contract-2026-08-09.md` y su matriz
  `.tsv`; sólo se actualizó este tablero adicionalmente.
- Activos preservados y hashes: cliente TOEFL
  `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b`, primitives
  `38fc4e1f7c8a22d149887ace477cde8f16ad15a575627de8976072632522bf93`, types
  `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13`;
  sus hashes no cambiaron durante T10. Contrato Markdown
  `42195f96a59d78ac5f4c8aa10055057222de6f972819772ee0ac909eebf478c6` y TSV
  `37a6aca9fba80edea5740f1543f0ecd0527deb30ba24923aa62b3a2212a11802`.
- Clasificación A/B/C/D/E: no se alteró la auditoría editorial T05. Los 20 sets siguen
  nivel B, `audited_with_blockers`, ruta fija no adaptativa y navegación de práctica;
  86 minutos sólo puede conservarse con `DS-B-002`. C exige módulos fijos y D rutas
  adaptativas validadas; ninguno hereda aprobación de este contrato.
- Cambio o decisión: se aprobaron diez principios TMN, seis entidades de estado lógico,
  cinco perfiles de modo, un registro de clocks, contrato de ruta y 19 invariantes.
  Las instrucciones no consumen base time; C/D no ofrecen pausa; cierres de ítem,
  tarea, módulo y sección son idempotentes/irreversibles; deadlines durables gobiernan
  recarga, background y concurrencia.
- Matriz: 44 transiciones × 20 columnas, 44 IDs únicos y secuenciales, 0 filas
  deformes y 0 duplicadas; 31 transiciones irreversibles y 13 reversibles/no finales.
  Incluye inicio, Reading Back/Next, cierre/ruta de R/L, Listening forward-only,
  Writing, 11 respuestas de Speaking, cierre, reload, tabs, technical hold, lease,
  respuesta tardía, abandono e invalidación.
- Relojes: Reading stage 1 1.080–1.260 s y stage 2 540; Listening stage 1 1.080 y
  stage 2 lower/upper 420/660; Writing 1.380, Email 420 y Discussion 600; Speaking
  480 total. Los clocks de pregunta/tarea/respuesta particionan el presupuesto, no se
  suman encima.
- Valores no inventados: los 360 s de Build se rotulan `derived_local` por
  23−7−10 y T17 debe adjudicarlos. Los segundos exactos de cada respuesta oral y de
  cada pregunta de Listening quedan `unverified_blocker` hasta T14/T15/T18/T19. Su
  ausencia bloquea C/D en vez de repartir tiempo uniformemente.
- Auditoría 1 — full-stack/datos/repositorio: pasa T10 como contrato. Fuente, timer,
  UI, navegación, state/outcomes y eventos que recibe T11 quedaron trazados; la forma
  TSV es válida y los hashes de runtime se conservaron. No se leyó ningún secreto ni
  se tocó trabajo ajeno.
- Auditoría 2 — TOEFL: pasa para contrato. Las reglas se trazaron a S1–S4 y a IDs
  `GEN`, `ADP`, `L`, `W` y `S`; ninguna decisión local o inferida se atribuye a ETS.
  C es fijo/no adaptativo y D delega umbrales/calibración a T24.
- Auditoría 3 — editorial/pedagógica: pasa. Ayudas, pausa y navegación flexible se
  limitan a learn/practice; directions no se convierten en preparación oral; Back,
  expiry e incompletitud tienen mensajes comprensibles y no revelan scoring.
- Auditoría 4 — audio: no aplica a aprobar activos. El diff dirigido de MP3 y
  manifiestos fue vacío. Sólo se modeló reproducción consumida/fallo técnico; T08
  queda para el final de la fase no-audio como pidió el owner.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: pasa para contrato.
  Acomodaciones versionadas no bajan fidelidad; fallos de red, audio o micrófono no se
  convierten en desempeño; review y reproducción siguen sujetos a retención/derechos.
- Auditoría 6 — UI/UX/accesibilidad: pasa como requisitos, no para el runner actual.
  El contrato exige foco canónico, teclado, anuncios de reloj/frontera, redundancia al
  color, errores accesibles, writer lease, recuperación y preflight de captura.
- Auditoría 7 — Playwright: no aplica porque no cambió UI/runtime. Se dejaron asserts
  E2E explícitos para T12–T25; una simple carga de página no retirará los blockers.
- Excepciones cubiertas: doble click, recarga/reconexión, pestaña oculta, device sleep,
  varias pestañas, reloj local, carrera autosave/expiry, respuesta tardía,
  browser history, abandono, configuración o ruta inválida, contenido retirado,
  audio/micrófono/red, acomodación y pausa técnica auditada.
- Correcciones tras la primera ronda: los IDs de T02/T09 se alinearon con sus
  metadatos canónicos; se aclaró que clocks de pregunta/respuesta son particiones y no
  tiempo adicional; se añadió `GEN-003` a la transición inicial de Listening; se
  corrigió “alcance incompleto” para distinguir práctica abreviada de intento realmente
  incompleto; y se explicitó que la diferencia 86↔90 no basta para inferir una ruta.
- Comandos y resultados: `rg` de tiempos/schema/navegación; inspección completa de
  reglas y contratos; revalidación web ETS; `awk` para forma, IDs, modos, reglas y
  aritmética temporal; SHA-256; balance de fences; diff dirigido de audio; guardián de
  catálogo; TypeScript; build y diff check final.
- Guardianes: `npm run check:practica-catalog` pasó con 465 temas/módulos protegidos;
  `npx tsc --noEmit` pasó; `npm run build` pasó con compilación, TypeScript y
  1.264/1.264 páginas estáticas generadas. El único aviso de vocabulario preexistente
  fue 220/300 entradas del núcleo inglés A1 y el gate lo marcó “superado”.
- Métricas antes/después: de un único estado React implícito a seis entidades de
  estado; de 0 transiciones normativas a 44; de 0 perfiles temporales versionados a un
  registro que cubre scopes global, módulo, tarea, pregunta y respuesta; de 0 política
  de recuperación a 18 familias de excepción. El runtime conserva deliberadamente
  sus métricas iniciales hasta una implementación autorizada.
- Seguridad: no se leyó `.env.local`, no se consultaron secretos, no se llamó
  ElevenLabs, Whisper ni otra API, no hubo generación/edición de audio, consumo de
  créditos, código de producto, commit, push, deploy, merge, rebase ni remotos.
- Riesgos residuales: el runner real todavía contradice el contrato. T11 debe decidir
  persistencia, privacidad, leases e idempotencia; T17 el clock de Build; T18/T19 los
  segundos orales; T24 el enrutamiento. Los pilotos deberán implementar y probar cada
  frontera antes de retirar blockers.
- Gate de salida: satisfecho para T10 documental — state machine y excepciones están
  documentadas, versionadas, medibles y separan hechos ETS de decisiones WeLearn.
- Estado final: cerrado. No implica implementación ni validación de los 20 sets.
- Próxima primera unidad elegible: T11 — contrato de intentos, privacidad y scoring.

### Evidencia T11 — contrato de intentos, privacidad y scoring — 2026-08-09

- Alcance: contrato normativo de persistencia, finalidades, autorización, acceso,
  derechos, retención, borrado, proveedores y scoring local. No se modificó código,
  migración, base, contenido, audio ni runtime.
- Dependencias verificadas: T02 mantiene niveles A/B/C/D y disclosures; T09 aporta
  identidad, siete outcomes y reconciliación visible/calificable/reportable; T10
  aporta estado, eventos, clocks, cierres, lease y recovery. T08 sigue `[~]`, diferida
  por decisión del owner; no se trató como aprobada ni se usó para cerrar T11.
- Estado Git y cambios ajenos: HEAD
  `9a2a6be2d43439adec283c937d9eca3f2f21226f`, rama
  `codex/ielts-task2-introduction-pilot`, ocho commits delante del upstream. Se
  preservaron todas las modificaciones IELTS concurrentes, `output/` y `outputs/`.
- Fuentes TOEFL revalidadas el 9 de agosto de 2026: Understanding TOEFL Scores,
  Test Content, especificaciones 2026, Information Bulletin y Content/Structure para
  instituciones. Se confirmó escala oficial 1–6 en medios puntos, comparable 0–120
  transitorio, requisito mínimo de responder en las cuatro secciones y combinación
  ETS de AI/raters para respuestas construidas. Ningún método se copió como algoritmo
  local.
- Fuentes de privacidad revalidadas: Ley 1581 de 2012, Decreto 1377 de 2013 compilado
  en Decreto 1074 de 2015 y conceptos oficiales SIC sobre política, aviso, manual
  interno, marketing y supresión. Se separaron hechos normativos de máximos operativos
  propios; el artefacto no se presenta como dictamen jurídico.
- Línea base full-stack: `ExamReport` guarda al montar y silencia fallos;
  `saveExamResult` carece de attempt/idempotencia/versiones/outcomes/retención; la
  tabla mezcla PII y agregados; la policy denominada `Admins read all` contiene
  `USING (true)` sin predicado admin; borrar auth deja filas con PII por `SET NULL`;
  perfil sólo remite a WhatsApp; lead comercial no tiene consentimiento separado.
- Scoring actual: banda 1–6 y aproximación `/120` se derivan linealmente y mezclan
  respuestas objetivas con autoevaluación W/S. `Math.round` elimina medios puntos y
  el reporte hace claims de admisión. Se clasificaron como blockers; no se cambiaron
  en esta unidad documental.
- Riesgo SQL: `critical_unverified`, no incidente demostrado. No se consultó la base
  productiva, grants, usuarios ni filas. La policy debe corregirse y probarse
  negativamente antes de persistir intentos TOEFL.
- Patrón de audio existente: la ruta de `practica` usa bucket público, envío anónimo
  y username en object path; se prohíbe reutilizarla para TOEFL. No se abrió,
  reprodujo, transcribió, editó ni generó ningún audio.
- Archivos inspeccionados y fijados por hash: `saveExamResult`, `ExamReport`, dos
  migraciones de submissions/review, `scoreSubmission`, `LeadCaptureModal`,
  `saveLead`, migración de leads, ruta/migración de audio de práctica, perfil y
  registro. Las doce huellas están en el contrato.
- Archivos creados:
  `docs/toefl-2026-attempt-privacy-scoring-contract-2026-08-09.md` y su matriz
  `.tsv`; sólo se actualizó este tablero adicionalmente.
- Integridad y hashes: contrato Markdown
  `354643e78f74ea2be674fbf10a2d8475a29073739c7615aa30af8e8ba6fcd3ec`;
  matriz TSV
  `8085f5101092c9780cc1442c4f9c7a4db0b02fed8b991262cf8b8a387717d1ea`.
- Cambio o decisión: se aprobaron 12 invariantes APS, 12 entidades lógicas, cinco
  perfiles de modo, seis finalidades separadas, diez disclosures y reglas de menor
  privilegio, idempotencia, inmutabilidad, exportación, supresión y proveedor.
- Persistencia: A/B anónimo es local/efímero; guardar progreso requiere acción
  inequívoca y recibo. C/D requieren preflight, versiones y estado durable. Montar el
  reporte no puede crear una submission y ver resultados no depende de aceptar
  marketing.
- Retención: 17 clases. Intento/estado 24 meses; selected responses 12 meses; texto
  180 días; voz futura 30 días después de feedback y máximo 90 desde captura;
  telemetría técnica 30 días; seguridad 90; prueba de autorización y casos 36 meses;
  leads 12 meses; huérfanos 24 horas; backups 30 días. Analítica indefinida sólo si
  es irreversiblemente desidentificada y con celdas mínimas de diez.
- Derechos: consulta/exportación con objetivo de 10 días hábiles y extensión hasta
  cinco; reclamo/corrección/revocación/supresión con objetivo de 15 y extensión hasta
  ocho, alineados con los artículos 14–15 de Ley 1581. El canal debe producir caso,
  estado, vencimiento y resolución; WhatsApp no basta como único mecanismo.
- Menores: el primer piloto persistente se restringe a 18+ hasta aprobar flujo de
  representante, interés superior, lenguaje apropiado, revocación y derechos. No se
  infiere edad a partir del desempeño.
- Matriz: 25 clases × 20 columnas, 25 IDs únicos/secuenciales, 0 filas deformes, 17
  retention classes, siete purpose IDs y 25 release gates explícitos.
- Scoring permitido ahora: raw correctos/posibles y porcentaje local sólo sobre
  outcomes `scored`, más feedback formativo y estados W/S. Pendientes, fallos,
  invalidados y no presentados se excluyen y muestran; sin cuatro habilidades válidas
  no hay total.
- Scoring prohibido ahora: banda 1–6, `/120`, CEFR, score oficial, admisión,
  equivalencia lineal y autoevaluación puntuada. C/D sólo podrán emitir estimación
  diagnóstica WeLearn tras validación de forma/población, coverage, ruta,
  incertidumbre y versión; nunca como score ETS.
- Proveedores: antes de ElevenLabs, Whisper, OpenAI u otro se exigen encargado,
  región/transferencia, subencargados, retención, borrado, entrenamiento, incidentes,
  modelo, costo y fallback. Una API key no autoriza procesamiento o gasto. No se
  buscaron ni usaron claves.
- Auditoría 1 — full-stack/datos/repositorio: pasa T11 como contrato; UI, server
  action, tablas, policies, storage, leads, rating y derechos quedaron trazados. El
  runtime actual no pasa.
- Auditoría 2 — TOEFL: pasa para contrato; las restricciones de scoring/completitud
  se trazaron a fuentes ETS y ningún score local se presentó como oficial.
- Auditoría 3 — editorial/pedagógica: pasa; feedback, score y autoevaluación se
  separan, exposición limita interpretación y fallos técnicos no castigan.
- Auditoría 4 — audio: no ejecutada por decisión del owner. Sólo se definió el futuro
  contrato de privacidad/retención exigido por T11; T08 sigue para el cierre de la
  fase no-audio.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: pasa para contrato; cubre
  titular, anónimo, menor, rater, soporte, admin y proveedor, y prohíbe voiceprints,
  emoción, mezcla comercial y entrenamiento por defecto.
- Auditoría 6 — UI/UX/accesibilidad: pasa como requisitos; rechazo sin penalidad,
  checkbox no preseleccionado, acuse, export/delete, teclado/foco y errores accesibles
  quedaron especificados, no implementados.
- Auditoría 7 — Playwright: no aplica a una unidad sin runtime. Se fijaron casos E2E
  de consentimiento, rechazo/revocación, doble submit, acceso cruzado, fallo de
  guardado, export, delete, retención y resultado incompleto.
- Comandos y resultados: `rg` de flujo/policies/scoring/derechos, inspección de doce
  rutas, revalidación web oficial, SHA-256 antes/después, `awk` de forma/IDs/clases,
  control de whitespace y estado Git. Las doce huellas de runtime conservaron su
  valor; la matriz cerró 25 × 20 sin duplicados ni secuencias rotas.
- Guardianes: `npm run check:practica-catalog` pasó con 465 temas/módulos;
  `npx tsc --noEmit` pasó; `npm run build` pasó con compilación, TypeScript y
  1.264/1.264 páginas estáticas. El primer intento encontró un `next build` ajeno con
  el lock activo; se esperó sin matarlo y el reintento pasó. El aviso de vocabulario
  220/300 del núcleo inglés A1 fue preexistente y su propia puerta quedó superada.
- Seguridad: no se leyó `.env.local`, no se accedió a datos reales, no se llamó una
  API, no hubo audio, código de producto, commit, push, deploy, merge, rebase ni
  cambio de remotos.
- Riesgos residuales: faltan política/aviso públicos y responsable/canales reales,
  revisión jurídica, schema/RLS/storage, consent receipts, jobs de retención,
  export/delete, desacople de leads y corrección del reporte. Todos son blockers de
  piloto/release, no condiciones ocultas del cierre documental.
- Gate de salida: satisfecho para T11 documental — persistencia, disclosures y
  retención están aprobados y medibles. No aprueba implementación, proveedor, datos
  reales, score local equivalente a ETS ni piloto con estudiantes.
- Estado final: cerrado.
- Próxima primera unidad elegible por la secuencia no-audio del owner: T12 — piloto
  Complete the Words. Requiere implementación y, por tanto, autorización explícita
  antes de escribir código.

### Evidencia T12 — piloto Complete the Words, fase documental — 2026-08-09

- Alcance: contraste oficial, medición completa del banco, inspección estática y
  Playwright del runner, adjudicación editorial del Set 1 y contrato del futuro
  piloto. No se modificó código, banco, tipos, scoring, persistencia ni audio.
- Estado del gate: T12 permanece `[ ]`. La variante factual `t1-r-cw2-v3` está
  documentada como candidata interna, pero interacción/scoring fieles no existen
  todavía y los derechos/revisión independiente bloquean release. La instrucción
  vigente del owner prohíbe escribir código en esta fase.
- Fuentes oficiales revalidadas el 9 de agosto de 2026: Updated TOEFL iBT Test
  Overview, Reading Content, publicación ETS `Validity by Design`, Teacher Resources
  Practice Test 1 y Test Specifications 2026. Se confirmó texto académico de unas
  70–100 palabras, primera oración intacta, segunda mitad de cada segunda palabra,
  diez huecos por texto y respuesta formada por letras faltantes.
- Aclaración de evidencia: el Test Overview es un PDF de unos 20 MB que el visor no
  abrió completo, pero su índice oficial devolvió la sección y ejemplo. La regla de
  alternancia quedó corroborada por la publicación de investigación ETS y las claves
  de letras faltantes por el Practice Test. No se copió ningún pasaje ETS.
- Línea base global: 40 bloques, 240 huecos, seis huecos en 40/40, cero bloques con
  diez, 23/40 textos de 70–100 palabras, 20/40 académicos, 17/20 académicos dentro
  del rango y sólo 3/40 con primera oración intacta; dentro de la población académica
  son 2/20. Tras reconstruir huecos y contar tokens separados por espacios, el rango
  es 56–84 y la media 70,5 palabras. La cifra anterior de 5/40 era un error del
  detector, que había tratado `Ms.` y `Mr.` como finales de oración; se corrigió antes
  de cualquier implementación.
- Más línea base: 136/240 huecos sólo coinciden por longitud con una división por
  mitades, sin probar alternancia; existe un `bag → bag` con cero letras ausentes.
  Las 240 claves guardan palabra completa, no letras faltantes. Procedencia/derechos
  por ítem continúan 0/240.
- Estrategia de preservación: los 20 textos académicos se conservan. Diecisiete están
  dentro del rango y aportan 170 posiciones candidatas, pero sólo catorce permiten
  derivación mecánica conservadora; tres necesitan adjudicar `a` o `water's`. Los
  Sets 9, 16 y 20 necesitan una versión extendida. Los 20 mensajes personales se
  preservan fuera del formato CTW oficial, con disclosure, en vez de borrarlos o
  disfrazarlos.
- Auditoría de calidad del banco: la matriz de 40 filas × 34 columnas concilia contra
  40/40 objetos fuente y conserva hash por texto. Señala gramática no natural en
  `t8-r-cw2`, claim contradictorio en `t19-r-cw1`, el hueco `bag → bag` en
  `t20-r-cw1`, 14/20 académicos con reparación factual/editorial, y un único par de
  780 con similitud interna alta (`t4-r-cw1`/`t6-r-cw1`, Jaccard 0,2427 y coseno
  0,8080). Ninguno se sobrescribe.
- Muestra Set 1: `t1-r-cw2`, fuente académica sobre el Sol de 79 palabras, se preserva
  y origina `t1-r-cw2-v3`. La variante cambia `hot gas` por `plasma` y limita
  `anything to live` a `most forms of life on Earth could not survive`; queda en 76
  palabras. La máscara no
  cambia: `provides/light/heat/make/on/possible/inside/sun/process/nuclear`, con
  claves `ides/ght/at/ke/n/ible/ide/un/cess/lear` en posiciones pares 2–20. La `v2`
  queda registrada como candidata documental supersedida.
- Auditoría factual/editorial: se revisaron 95 oraciones de 20 académicos contra
  fuentes primarias. Seis pasan en alcance general y 14 requieren reparación. NASA
  sustenta la corrección del Sol y NOAA demuestra por qué el absoluto sobre toda vida
  era impropio. El pase documental de v3 no se convierte en prueba de derechos,
  dificultad o calibración.
- Derechos/procedencia: los objetos todavía carecen de campos por ítem, pero Git
  identifica instrucción y template de 40/40 bloques en
  `58c2fb0c84f955b1c249708b0fbd1bf0dbb14e43` (José David Duarte Silva, 23 de julio
  de 2026), cuyo mensaje declara contenido original WeLearn y coautoría de Claude
  Opus 4.8. Los 16 ejercicios de la lección proceden de
  `07a0fe768866dd18f2bb70c59c22ebdd0b5c074d` (José David Duarte Silva, 14 de julio
  de 2026). Una consulta distintiva por cada académico no devolvió un bloque completo
  idéntico, pero encontró una oración exacta preexistente en hormigas y otra en
  glaciares, además de redacción stock/cercana en rainforests, arañas y renovables.
  No prueba copia, pero exige reescritura y revisión ampliada. El estado pasa a origen
  interno identificado para 40/40, pendiente de attestation del owner, revisión
  exhaustiva de similitud y revisión independiente; release continúa bloqueado.
- Runtime estático: `WordCompleteView` pide letras ausentes, pero
  `computeReadingListening` compara contra la palabra completa. La normalización
  además elimina puntuación globalmente; no hay outcomes por hueco y el reporte
  agrega CTW a una banda local no validada.
- Playwright: en el Set 1 se observaron 12 textboxes, labels `Blank 1`–`Blank 6`
  repetidos entre dos pasajes, `maxLength = -1`, `spellcheck = true`, aceptación de
  `endextra`, captura de `end`, Tab correcto del primer al segundo hueco y reflow sin
  scroll horizontal visible a 390 px. No se entró a Listening.
- Consola: un único error de CSP bloqueó `unpkg.com` cargado por Google Tag Manager;
  se registró como ruido técnico separado, no como fallo CTW.
- Evidencia visual:
  `output/playwright/toefl-t12-current-complete-the-words-2026-08-09.png`
  (`145363b9912f37a1038b912789dc519c15fadb2fc581abd066543291db0ab029`)
  y su variante móvil
  (`261380217231071b39a5b2ba735c47d20463d435007319ce8cbfe870493071f2`);
  `output/playwright/toefl-t12-current-learning-page-item-2026-08-09.png`
  (`5b61e292aecec982c179b8b76ecd21f2a6314db21bd1bdb7592983140f8a0716`)
  y su variante móvil
  (`472f991a9cc6e973813dbd343b32e5d8a5ffcee39cd0fbfa2ab1180cbbe24a57`).
- Archivos creados:
  `docs/toefl-2026-complete-the-words-pilot-audit-2026-08-09.md` y
  `docs/toefl-2026-complete-the-words-pilot-audit-2026-08-09.tsv`, más el inventario
  `docs/toefl-2026-complete-the-words-learning-surface-audit-2026-08-09.tsv` y la
  auditoría completa del banco
  `docs/toefl-2026-complete-the-words-bank-quality-audit-2026-08-09.md`/`.tsv`, más la
  auditoría factual/derechos de 20 filas × 20 columnas
  `docs/toefl-2026-complete-the-words-factual-rights-audit-2026-08-09.md`/`.tsv`;
  sólo se actualizó este tablero adicionalmente.
- Integridad: Markdown
  `1635cf378e62dbcf6d73769eab4ffca0720298d7d0c59aec0912e28057fc3dbe`;
  matriz piloto
  `622dfebc047ff946f4fb5a1aaa2696e1105b01a237780181e0cc82d092076d4a`;
  inventario de la lección
  `f774a732ec02fc4b3c727e4308656f43cf9bb85cbfaa705bf23d2296425f05e1`;
  informe completo
  `b601bed1ae04539aec883d37e249e571b074ae842a97428bf501abdb2478e3b8`;
  matriz de 40 bloques
  `d488649a451f932984ef133d446abc3e8f6954fb0ce6b381596d8580f9884bfa`;
  informe factual/derechos
  `46945fd47924a1702c5d779cda97eed094f789684ecceee462c0bb99ca93f2b3`;
  matriz factual/derechos
  `3ecd5ecaacecd213aaca76c56912077af7a462b6b28b655c544134e306983936`.
  La matriz tiene 10 filas × 20 columnas, 10 IDs únicos, posiciones pares 2–20,
  10/10 reconstrucciones exactas y 10/10 longitudes reconciliadas. La auditoría del
  banco tiene 40 filas × 34 columnas, 40 IDs únicos y paridad 40/40 con fuente. La
  matriz factual tiene 20 filas × 20 columnas, 95 oraciones, 6 pases, 14 reparaciones,
  2 coincidencias exactas, 3 familias stock/cercanas y 20 bloqueos de release.
- Activos preservados: cliente TOEFL
  `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b`, Set 1
  `f6213c5a1c8638e7fa6a4940196bef91ede57c61f0d7695e2640304e475625db`
  y tipos
  `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13`;
  página publicada
  `29afdf3bed6cc259575322f09adc2e40b89297c39e06ab74f78c1322720be4a3`
  y catálogo compartido
  `aebd26a1aa6a9cdae60f7b0208c3f5f6c3138889f8aeb4f3ae15efbe888734de`.
- Auditoría 1 — full-stack/datos/repositorio: el contrato pasa y el runtime falla.
  Fuente, derivación, renderer, response kind, scoring, outcomes y reporte quedaron
  trazados; la matriz de calidad volvió a importar los 40 bloques y obtuvo paridad
  exacta de IDs, conteos, hashes y campos derivados. No se tocó trabajo IELTS ni se
  leyó un secreto.
- Auditoría 2 — TOEFL: la candidata pasa la especificación; el banco/runtime actual
  falla. Catorce académicos admiten máscara mecánica, tres elegibles requieren
  adjudicar tokenización y tres son cortos; “mecánica” no significa aprobado. El
  bloque se rotula práctica parcial fija, no examen completo/adaptativo.
- Auditoría 3 — editorial/pedagógica: v3 pasa documentalmente como candidata; los 16 MCQ
  publicados tienen claves lingüísticamente válidas, pero sufren baja discriminación
  y distribución A/B/C/D de 13/2/1/0. Deben preservarse, repararse y reclasificarse
  como práctica A de selección léxica. La revisión de los 40 bloques añadió una
  reparación gramatical, una contradicción de voz/instrucción, un hueco nulo y 14
  reparaciones factuales/editoriales entre 20 académicos. Balance entre bloques y
  validación empírica quedan T20/T26.
- Auditoría 4 — audio: diferida por decisión explícita del owner. CTW no usa audio y
  no se abrió, reprodujo, transcribió, generó ni modificó ningún MP3.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: tema y demanda cultural de v3
  pasan; Git estrecha la procedencia de 40/40 a “origen interno identificado”. No hay
  datos de estudiantes para DIF; dos coincidencias exactas y tres familias stock
  requieren reescritura/revisión. Attestation, similitud exhaustiva y revisión
  independiente todavía bloquean release.
- Auditoría 6 — UI/UX/accesibilidad: Tab y reflow básico pasan; labels únicos,
  contexto audible, longitud y ayudas del navegador fallan. Los criterios correctivos
  quedaron fijados sin implementarlos. En la lección, el reflow pasa, pero las
  opciones son `span` estáticos: no existe control enfocable, respuesta ni estado
  accesible de selección.
- Auditoría 7 — Playwright: la línea base real se reprodujo y dejó capturas; el gate
  falla porque una entrada fiel no puede obtener scoring fiel y sólo hay seis huecos
  por bloque. La segunda ruta mostró 16 ítems y 32 artículos —banco más respuestas—,
  cero inputs, botones de tarea, radios o formularios y corrección visible desde la
  primera pintura. No se repitió Playwright tras ampliar el informe porque no cambió
  UI, datos de runtime ni código; las capturas siguen siendo la línea base vigente,
  no evidencia de gate aprobado.
- Corrección tras la primera ronda: inicialmente se interpretó que el primer término
  tras la oración se enmascaraba. El ejemplo oficial muestra que queda intacto y se
  enmascara el segundo; se recalculó la matriz completa antes de registrarla. Las diez
  reconstrucciones finales pasaron control automático.
- Comandos y resultados: inventario/importación de los 20 sets; búsquedas `rg` de
  renderer/scoring/tipos y superficie pública; historial/blame Git; una consulta
  distintiva por cada texto académico; Playwright
  open/snapshot/fill/Tab/eval/resize/screenshot;
  validación automática confirmó la matriz piloto 10 × 20 y el inventario de lección
  16 × 20 contra sus fuentes; una segunda validación reconcilió la matriz de calidad
  40 × 34 con los 40 objetos fuente; SHA-256 fijó fuentes, contratos, matrices y
  capturas.
- Guardianes: `npm run check:practica-catalog` pasó con 465 temas/módulos;
  `npx tsc --noEmit` pasó; `npm run build` pasó con prebuild completo, TypeScript y
  1.264/1.264 páginas estáticas. El único aviso de contenido fue el preexistente
  220/300 del núcleo inglés A1 y su propia puerta quedó superada.
- Seguridad: no se inspeccionó ni imprimió `.env.local`, no se buscaron ni usaron
  claves, no se llamó ElevenLabs, Whisper ni otra API, no hubo costo, audio, código
  de producto, commit, push, deploy, merge, rebase o cambio de remotos.
- Próximo paso de esta misma unidad: esperar autorización explícita de código e
  implementar sólo `t1-r-cw2-v3` como rebanada vertical. Esa rebanada debe hacer que
  la ruta pública entregue CTW real y preservar sus 16 MCQ en una práctica A honesta,
  sin borrarlos. Hasta entonces T12 sigue siendo la primera unidad abierta/no
  bloqueada; T13 no es elegible.

### Evidencia T12 — readiness de implementación y publicación — 2026-08-13

- Decisión de alcance: por instrucción reiterada del owner no se escribió código y la
  auditoría de audio queda para el final. No se abrió, reprodujo, transcribió,
  regeneró ni modificó ningún audio; no se llamó Whisper, ElevenLabs ni otra API.
- Aislamiento del trabajo: esta rebanada documental se preparó en el worktree
  `/private/tmp/idiomaswl-toefl-audit`, rama local
  `codex/toefl-t12-readiness-20260813`, basada en el archivo preservado de TOEFL. El
  worktree visible siguió en su rama IELTS con sus cambios sin tocar. No hubo commit,
  push, deploy, merge, rebase ni cambio de remotos.
- Primera unidad: T12 continúa siendo la primera unidad abierta/no bloqueada. Su
  checkbox permanece `[ ]`; T13 no es elegible.
- Revalidación oficial puntual del 13 de agosto de 2026: ETS sigue describiendo
  Complete the Words como un texto breve de uso académico en el que se recuperan
  palabras parcialmente borradas mediante vocabulario y contexto. Las
  especificaciones 2026 mantienen el target de 30 ítems, B1–C1+, corrección
  automática y máximo de un punto por ítem de Reading. La explicación de validez de
  ETS mantiene la segunda mitad de cada segunda palabra y la reconstrucción de las
  palabras originales. Esta revalidación se limita a T12 y no cambia el corte global
  del registro oficial.
- Identidad fijada: `object:t1-r-cw2-v3`, 76 palabras, primera oración intacta, diez
  huecos y SHA-256 del texto candidato
  `cebce2395c03dc360098a045f97ec560d865ca2aee49bf20da504221380a8a3e`.
  La primera oración tiene SHA-256
  `484adf235348ca922d025eb1813bd6e156e9de4081b60e22736ab8f49d76cf79`.
- Contrato exacto: `prov+ides`, `li+ght`, `he+at`, `ma+ke`, `o+n`, `poss+ible`,
  `ins+ide`, `s+un`, `pro+cess`, `nuc+lear`. La matriz automática confirmó 10/10
  reconstrucciones exactas, IDs únicos y longitudes de letras faltantes conciliadas.
- Matriz de readiness: 47 filas × 15 columnas, diez carriles y cero filas de ancho
  incorrecto, IDs duplicados o whitespace terminal. Hay 10 controles documentales no
  bloqueantes y 37 bloqueantes: 32 `pending_runtime`, 11
  `verified_2026-08-13`, uno `verified_limited_scope_2026-08-09`, una revisión
  independiente pendiente y dos firmas pendientes.
- Acta fail-closed: la declaración de publicación registra 0/2 firmas. Ningún agente
  puede firmar, inferir una firma ni convertir apoyo factual en autorización de
  derechos. La revisión de similitud previa es dirigida y no exhaustiva.
- Auditoría 1 — full-stack/datos/repositorio: PASS documental. La matriz 47 × 15,
  hashes, IDs y diez reconstrucciones son reproducibles; el único delta es
  documental. El bloqueo de implementación y el runtime actual no conforme se
  conservan.
- Auditoría 2 — TOEFL: PASS de especificación, no del producto. La candidata de 76
  palabras, primera oración intacta y diez huecos concuerda con las fuentes
  revalidadas; falta revisión TOEFL independiente y el runtime actual sigue usando
  seis huecos con claves de palabra completa.
- Auditoría 3 — editorial/factual: PASS limitado de la candidata. NASA y NOAA
  respaldan los cambios `plasma` y supervivencia limitada; falta firma editorial
  humana y no se certifican dificultad, calibración ni transferencia.
- Auditoría 4 — audio: DIFERIDA explícitamente. CTW no usa audio y todos los activos
  de audio quedaron fuera de alcance y sin cambios.
- Auditoría 5 — derechos/sesgo/leakage: BLOCKED. Hay origen interno acotado y una
  búsqueda previa limitada, no derechos autorizados. No hay datos de estudiantes para
  DIF y las firmas permanecen 0/2.
- Auditoría 6 — UI/UX/accesibilidad: no aplicable al delta documental. Siete controles
  futuros fijan labels, contexto audible, `maxLength`, `spellcheck`, foco y anuncios;
  ninguno se declara implementado.
- Auditoría 7 — Playwright: no se reejecutó el runner porque no hubo cambio de DOM,
  CSS, datos, navegación o interacción. Las capturas del 9 de agosto siguen siendo la
  línea base del producto. La verificación Chromium del informe portable —1440 y 390
  px, fuentes y diálogos— pasó, pero sólo valida el empaquetado del informe.
- Informe técnico: `output/audits/toefl-ctw-set1-readiness-2026-08-13/report.html`
  pasó validación, empaquetado, fuentes, interacción por teclado y verificación
  responsive. Sus datos canónicos están en `artifact.json`; el gráfico resume estados
  nominales y las tablas conservan los responsables e impactos exactos.
- Integridad: matriz
  `5344d8af118eebf930ba1e0117f873d386760196f17f9c7c0b118f07813192b9`;
  acta
  `9e0190e66e71e7177de7766aaf6b67ccdd03a574c300d56d279fa37bbd0505c1`;
  artifact
  `d12331ee69000064f492df9e7895fdf7d2b4483df66808773aa71d92f45cb25f`;
  HTML
  `c237c92f278652980c29e8994b1678da37bf5ae02ff86e1c28f98bd800f60e8a`.
- Próximo paso de T12: mantener código y audio congelados hasta una autorización
  explícita. Después, implementar sólo el contrato v3, ejecutar los 32 controles de
  runtime, obtener revisión TOEFL independiente y 2/2 firmas, repetir las siete
  auditorías y cerrar únicamente con cero bloqueantes.

### Addendum T12 — cobertura completa del gate de implementación — 2026-08-13

- Alcance: segunda pasada documental sobre la misma rebanada `t1-r-cw2-v3`. No se
  modificó producto, banco, renderer, scorer, persistencia, metadata, audio ni
  secretos. T12 sigue `[ ]`; T13 no es elegible.
- Hallazgo corregido: la primera matriz de 47 controles no hacía explícitos todos los
  requisitos que el propio contrato del piloto ya exigía. Faltaban como familias
  verificables persistencia/idempotencia, corrección y reclasificación de la ruta
  pública/metadata, protección frente a filtrado de claves y preferencias de
  accesibilidad posteriores a navegación.
- Matriz vigente: `docs/toefl-2026-ctw-set1-readiness-2026-08-13.tsv` queda ampliada
  a 68 filas × 15 columnas, 68 IDs únicos y 13 carriles. Hay 11 controles no
  bloqueantes y 57 bloqueantes: 52 `pending_runtime`, 12
  `verified_2026-08-13`, uno `verified_limited_scope_2026-08-09`, una revisión
  independiente y dos firmas pendientes.
- Cobertura del gate: se añadió
  `docs/toefl-2026-ctw-set1-gate-coverage-2026-08-13.tsv`, 12 filas × 10 columnas,
  que enlaza cada requisito numerado del capítulo 6 del contrato piloto con sus
  checks, evidencia actual, evidencia faltante, responsable y estado. Los 12/12
  requisitos están cubiertos documentalmente; 0/12 se declaran cerrados en producto.
- Nuevas familias explícitas: 5 controles de persistencia, 2 de seguridad/leakage,
  5 de claim/superficie pública, 3 adicionales de accesibilidad, 2 outcomes de
  scoring, una conciliación del hash implementado y 3 controles de repositorio. El
  último impide usar este snapshot archivado como base de integración y exige una
  rama futura desde `main` canónico actualizado.
- Corrección de línea base: cuatro fuentes TOEFL dirigidas conservan exactamente las
  huellas del 9 de agosto: cliente
  `ed33cfe60ea8e2922db55111a7209defbae9cf9215bb686a2761e78b6a1ac21b`, Set 1
  `f6213c5a1c8638e7fa6a4940196bef91ede57c61f0d7695e2640304e475625db`, tipos
  `c8fca69d7a73f92dfaed6c9095f250e6bdd088a33e6393acac06c4bbc8f7bd13` y página
  `29afdf3bed6cc259575322f09adc2e40b89297c39e06ab74f78c1322720be4a3`.
  La huella antigua `aebd26…` del catálogo SEO completo compartido no se puede
  reproducir en el estado Git actual; el archivo actual limpio es `8f19d752…36d`.
  El contenido observado conserva el mismo defecto semántico descrito por T12. Para
  no hacer depender el gate de cambios IELTS ajenos, se fija desde ahora la huella
  dirigida del objeto SEO `complete-the-words`:
  `109ff1a05cbffc74c6925f089ff95a9146c0530abf889ebc87499a49de3454e6`.
  El registro histórico no se reescribe; este addendum documenta la divergencia y la
  unidad de comparación correcta.
- Auditoría 1 — full-stack/datos/repositorio: PASS documental tras corrección. Las
  matrices 68 × 15 y 12 × 10 pasan ancho, unicidad, whitespace, conteos y suma de
  estados/carriles. La huella dirigida evita falsos fallos por el catálogo IELTS
  compartido. Runtime, persistencia y diff postimplementación siguen bloqueados.
- Auditoría 2 — TOEFL: sin cambio de dictamen. El contrato oficial y la candidata
  v3 pasan como especificación; el producto continúa con seis huecos y unidad de
  scoring incorrecta. La ampliación no inventa contenido ETS ni copia muestras.
- Auditoría 3 — editorial/pedagógica: PASS limitado. El texto, diez reconstrucciones
  y dos reparaciones factuales no cambian. Ahora se exige además preservar los 16 MCQ
  y reclasificarlos con etiqueta honesta A, sin borrarlos ni mantenerlos como CTW.
- Auditoría 4 — audio: DIFERIDA por instrucción del owner. El diff dirigido contiene
  cero MP3, manifiestos, transcripciones o pipelines; no se reprodujo ni generó audio.
- Auditoría 5 — multiperspectiva/anti-sesgo/derechos: BLOCKED. Se mantienen 0/2
  firmas, revisión independiente pendiente y búsqueda de similitud no exhaustiva.
  Los nuevos controles impiden exponer claves en payload de evaluación o respuestas,
  prompts, PII y secretos en logs.
- Auditoría 6 — UI/UX/accesibilidad: no aplicable al delta, pero el futuro gate ya
  cubre 10 controles: nombres, longitudes, ayudas del navegador, orden, 320 px/200 %,
  anuncios, separación de feedback, foco de retorno, lector de pantalla, dark mode y
  reduced motion.
- Auditoría 7 — Playwright: no se reejecutó el producto porque no cambió UI ni
  runtime. El informe portable actualizado sí pasó verificación de empaquetado,
  diálogo de fuentes, interacción semántica por teclado y viewports 1440/390 px; no
  se usa como evidencia E2E del simulacro.
- Fallos corregidos durante la repetición: el primer comando integral referenció
  `lanes` en vez de `lane`; el segundo comparó mapas JSON por orden de propiedades y
  produjo un falso negativo con conteos idénticos. Se corrigieron ambos defectos del
  verificador y la tercera ejecución pasó matrices, snapshot, hashes, scope y ausencia
  de audio. Ninguno de los dos fallos se atribuyó al producto ni se silenció.
- Guardianes: `npm run check:practica-catalog` pasó en el worktree aislado con 465
  temas/módulos. `npx tsc --noEmit` aislado encontró un `@ts-expect-error` IELTS sin
  uso en un archivo que existe sólo en el snapshot archivado. El prebuild aislado
  pasó todos sus guardianes, pero Turbopack rechazó el symlink externo de
  `node_modules`; no fue un fallo de fuente. Para separar entorno de código, en el
  worktree visible actual —sin modificarlo— TypeScript pasó y `npm run build` pasó
  compilación, TypeScript y 1.357/1.357 páginas estáticas. Esto prueba la salud del
  producto actual, no convierte el snapshot archivado en rama integrable.
- Informe actualizado:
  `output/audits/toefl-ctw-set1-readiness-2026-08-13/report.html`, con 19 bloques
  renderizados, un gráfico, cuatro métricas y cinco tablas. Integridad: matriz
  `89b85db154101a3a0358f79ca54f6f2d9bf5a93e0b3ed526eebaffff433907cd`;
  cobertura
  `ce7e3dbf2dc9e5b8fead925fbf925ef3c7cb542aabf2f0cb7462c39084c95a75`;
  artifact
  `0d2c47e9361afcd5a7fc74aeb7648544a673a8e6f861b0f8f066a9d7b1916e2a`;
  HTML
  `7aaa4ad35a2e68f8c1c27903c9dbd4deb97b02806760fc84a3ede4db9f94c48a`.
- Gate de salida: no satisfecho. La especificación de aceptación está completa, pero
  el producto aporta 0/52 verificaciones de runtime/preparación, 0/2 firmas y ninguna revisión
  TOEFL independiente. El siguiente paso seguro exige autorización explícita para
  código de T12; audio permanece al final.

### Evidencia T12 — implementación vertical y auditoría runtime — 2026-08-14

- Autorización y firma: José David Duarte Silva completó las seis declaraciones del
  owner, confirmó que WeLearn creó el documento y posee sus derechos, y autorizó
  continuar. El 14 de agosto dispensó expresamente la segunda revisión y firma para
  este gate; no se interpreta ni se registra como una revisión independiente.
- Rama de implementación: `codex/toefl-t12-implementation-20260813`, creada desde el
  `main` canónico `9efd554531d655532a1f51ff449e923d8cee6bd5`. Durante el trabajo
  `origin/main` avanzó a `6219b375542e835acf843d61b7e083f2798b3230` mediante dos cambios
  SEO ajenos. Con autorización del owner, la rama hizo fast-forward limpio a ese
  commit; no hubo conflicto con TOEFL.
- Rebanada entregada: `object:t1-r-cw2-v3` se renderiza tanto en el Set 1 como en la
  ruta pública. Reconstruye exactamente 76 palabras, conserva la primera oración y
  presenta diez controles para `ides`, `ght`, `at`, `ke`, `n`, `ible`, `ide`, `un`,
  `cess` y `lear`.
- Provenance: la fuente v2 no se perdió. Se conserva dentro del módulo server-only y
  reproduce SHA-256 `591e04ee445b2367e1fdfc13373d6a727e42f305cebc1f8d777b58d88d220ada`.
  La candidata implementada reproduce
  `cebce2395c03dc360098a045f97ec560d865ca2aee49bf20da504221380a8a3e` y su primera
  oración `484adf235348ca922d025eb1813bd6e156e9de4081b60e22736ab8f49d76cf79`.
- Seguridad/scoring: el cliente recibe prefijo, longitud e identidad, no la clave. La
  clave aparece sólo en un chunk server y en cero chunks de `.next/static`. El cierre
  reconcilia todos los outcomes, es determinista/idempotente y reporta una fracción
  local WeLearn sin escala ni equivalencia TOEFL.
- Persistencia y privacidad: el intento anónimo vive sólo en `localStorage`, restaura
  respuestas, habilidad y foco, y no escribe al servidor. Un segundo intento recibe
  otro ID y archiva el snapshot cerrado anterior sin mutarlo.
- Superficie pública: los 16 MCQ previos no se borraron. Se trasladaron completos a
  `/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto` bajo una etiqueta
  de habilidad complementaria que declara que no es Complete the Words. La ruta CTW,
  metadata, FAQ, JSON-LD y catálogo ahora describen letras faltantes.
- Evidencia automática: después del fast-forward, `npm run check:practica-catalog`
  PASS; `npm run check:toefl-ctw` PASS; `npm run test:toefl-ctw` 7/7;
  `npx tsc --noEmit` PASS; `npm run build` PASS con todos los guardianes y
  1.359/1.359 rutas; la corrida Playwright Chromium posterior al fast-forward pasó
  6/6 en 5,9 s. Un intento previo no abrió Chromium por el sandbox de macOS y no se
  clasificó como fallo del producto.
- Matriz runtime: `docs/toefl-2026-ctw-set1-runtime-evidence-2026-08-14.tsv` cubre
  exactamente los 68 IDs históricos. Los 68 quedaron verificados/aceptados y no quedan
  bloqueantes.
- Auditoría 1 — full-stack/datos/repositorio: **PASS**. Implementación, contratos,
  hashes, tests, base canónica y build pasan.
- Auditoría 2 — TOEFL: **PASS técnico con dispensa del owner**. La interacción cumple
  el contrato T12 revalidado; no se afirma revisión independiente.
- Auditoría 3 — editorial/factual: **PASS aceptado por el owner**. Hechos y texto
  conservan evidencia; el owner acepta la muestra y el riesgo editorial residual.
- Auditoría 4 — audio: **DIFERIDA/no aplicable a CTW**. Cero cambios de MP3,
  transcripciones, TTS, ElevenLabs, Whisper o pipeline de audio de producto.
- Auditoría 5 — derechos/sesgo/leakage: **PASS aceptado por el owner**. El leakage
  técnico está cerrado; el owner declara creación/derechos WeLearn, dispensa la
  segunda firma y acepta la búsqueda pública limitada. No se afirma revisión jurídica.
- Auditoría 6 — UI/UX/accesibilidad: **PASS automático / pendiente humano**. Teclado,
  nombres, live regions, 320 px, zoom 200 %, dark mode, reduced motion y foco pasan;
  queda sesión independiente con lector de pantalla.
- Auditoría 7 — Playwright: **PASS**, 6/6 en corrida conjunta.
- VoiceOver: José David Duarte Silva completó el checklist manual y declaró
  **“VoiceOver aprobado”** el 14 de agosto de 2026.
- Gate: **T12 cerrado `[x]`** con 68/68 controles y cero bloqueantes. T13 pasa a ser la
  primera unidad abierta/no bloqueada. El trabajo de audio sigue al final, conforme a
  la decisión del owner. No hubo commit, push, deploy, publicación, cambio de remotos
  ni uso de secretos/API externas.

### Evidencia T13 — Reading Daily Life, Academic Passage y multiselect — 2026-08-14

- Primera unidad: T13 fue la primera abierta y no bloqueada después del cierre T12.
- Revalidación oficial: ETS mantiene `Read in Daily Life` y `Read an Academic
  Passage`. El overview vigente describe textos funcionales de aproximadamente
  15–150 palabras con 2 o 3 preguntas y un pasaje académico de aproximadamente 200
  palabras con 5 preguntas.
- Línea base: Daily Life ya tenía dos textos de 68/80 palabras y 3+2 MCQ. Academic
  tenía 325 palabras, cinco MCQ visibles y un `multiselect` omitido por el cliente.
- Implementación: el objeto `object:toefl-reading-set1-v2` conserva Daily Life,
  presenta Academic v2 en 187 palabras con cinco preguntas single-select y conserva
  el multi como práctica complementaria WeLearn claramente separada. La fuente v1
  sigue server-only con hash `276ee66e...`.
- Datos/scoring: once ítems y 44 opciones tienen IDs estables. La clave sólo existe en
  servidor. Single-select usa ID de opción; multi usa conjunto exacto sin crédito
  parcial; todos los outcomes reconcilian o fallan cerrados.
- Superficies: las dos rutas públicas tienen práctica interactiva y conservan sus
  bancos guiados. El Set 1 usa el contrato nuevo. El cliente compartido ahora renderiza
  también el `multiselect` heredado de los sets 2–20, eliminando su omisión silenciosa.
- Evidencia: `check:toefl-reading` PASS; `test:toefl-reading` 7/7; regresión T12
  checker + unit 7/7; ESLint dirigido PASS; TypeScript PASS; Chromium T13 5/5. La
  corrida conjunta T12 tuvo un único timeout mientras Next compilaba por primera vez
  el endpoint durante 22,7 s; el mismo caso pasó 1/1 al repetirlo precalentado.
- Actualización de repositorio: `origin/main` avanzó cinco commits durante T13. La
  rama guardó temporalmente la rebanada, hizo fast-forward limpio a
  `f9296ce2401510ccdcb3f174f1afc7daccae8a21` y restauró sin conflictos. Una primera
  comprobación mezcló tipos `.next/dev` obsoletos con los layouts IELTS nuevos; tras
  limpiar sólo la caché generada, TypeScript pasó, el build completó 1.360/1.360 rutas
  y Chromium de producción pasó T12 + T13 11/11 en 13,6 s.
- Editorial/factual/derechos: cinco fuentes primarias/oficiales están fijadas. Cuatro
  búsquedas de frases exactas no encontraron el pasaje ni frases completas. José David
  Duarte Silva declara creación/derechos WeLearn y dispensa segunda revisión; no se
  afirma adjudicación independiente ni opinión jurídica.
- Audio: no se abrió, reprodujo, transcribió, generó ni modificó audio. Sigue diferido
  al final por decisión del owner.
- VoiceOver: José David Duarte Silva completó el checklist manual y declaró
  **“VoiceOver T13 aprobado”** el 14 de agosto de 2026.
- Matriz: `docs/toefl-2026-reading-set1-runtime-evidence-2026-08-14.tsv` registra
  51/51 controles verificados/aceptados y cero bloqueantes.
- Gate: **T13 cerrado `[x]`**. T16 pasa a ser la primera unidad abierta/no bloqueada
  dentro de la secuencia no-audio del owner.
- No hubo commit, push, deploy, publicación, cambio de remotos ni uso de secretos/API.

### Evidencia T16 — Build a Sentence Set 1 — 2026-08-14

- Revalidación oficial: la especificación ETS vigente asigna 10 ítems machine-scored
  a Build a Sentence y 2 tareas construidas, para 12 unidades Writing en 23 minutos.
  El overview define un intercambio: una frase intacta aporta contexto y la respuesta
  combina partes fijas, fragmentos desordenados y un distractor.
- Línea base: el Set 1 tenía 6 ítems sin frase contextual; el primero ya aparecía en
  orden correcto. La clave y respuesta canónica viajaban en el payload del cliente.
- Implementación: `object:toefl-build-sentence-set1-v2` contiene 10 intercambios
  originales, cada uno con contexto, respuesta fija, 3–4 posiciones, fragmentos
  desordenados y exactamente un distractor. Los seis ítems anteriores se conservan
  en un módulo `server-only`; no se borraron como fuente de procedencia.
- Interacción: botones nativos ofrecen equivalencia accesible al movimiento de
  fragmentos. Tab/Enter, tacto y mouse pueden añadir o retirar. Un live region anuncia
  posición y acción; el foco pasa al fragmento colocado y vuelve al banco al retirarlo.
- Scoring/seguridad: IDs estables de ítem y tile; clave exacta sólo en servidor; 1
  punto por orden completo aceptado; cero para orden incorrecto/incompleto; identidad
  desconocida, duplicada o configuración imposible falla cerrada y sale del
  denominador. El endpoint valida objeto, intento, cierre, responses y presented IDs.
- Persistencia: la ruta pública y el simulacro preservan respuestas, foco y resultado
  en `localStorage`. Una caída del endpoint conserva el intento y no produce penalidad
  académica.
- Superficies: el piloto de 10 ítems aparece en la ruta pública y en el Set 1. El
  workbench escrito previo se mantiene como suplemento pedagógico WeLearn y no se
  cuenta dentro de las 10 unidades del simulacro.
- Evidencia automática: checker T16 PASS; unit T16 7/7; regresiones T12 7/7 y T13
  7/7; TypeScript PASS; Chromium T16 4/4; build completo PASS con guardianes y
  1.361/1.361 páginas; Chromium contra producción T12+T13+T16 15/15 en 1,1 min.
- Editorial/procedencia: los diez intercambios son redacción WeLearn. Cuatro búsquedas
  públicas de frases completas no encontraron coincidencia exacta; los resultados
  ajenos sólo compartieron vocabulario común. Es una búsqueda limitada, no una
  adjudicación independiente ni opinión jurídica. Se aplica la declaración de
  creación/derechos y dispensa de segunda revisión de José David Duarte Silva.
- Audio: cero cambios, reproducción, transcripción, generación, Whisper, ElevenLabs o
  pipeline de audio. Continúa al final por decisión del owner.
- Matriz: `docs/toefl-2026-build-sentence-set1-runtime-evidence-2026-08-14.tsv`
  registra 42/43 controles cerrados y un único control humano pendiente.
- VoiceOver T16 pendiente: abrir
  `/practica/toefl/writing/build-a-sentence`, escuchar el primer fieldset, colocar
  `is` y confirmar que se anuncia posición 1/4 y el foco queda sobre el fragmento;
  retirarlo y confirmar retorno al banco. Completar el primer ítem y escuchar el
  resultado después de cerrar.
- Gate: **T16 permanece `[~]`**. Implementación, TOEFL, scoring, persistencia,
  seguridad, build y Playwright pasan; sólo falta aprobación manual de VoiceOver T16.
  T17 es independiente (depende de T10/T11) y queda habilitado para continuar sin
  audio. No hubo commit, push, deploy, publicación, cambio de remotos ni secretos.

### Evidencia T17 — Write an Email y Academic Discussion Set 1 — 2026-08-14

- Revalidación oficial: Writing mantiene 10 Build a Sentence, 1 Email y 1 Academic
  Discussion dentro de 23 minutos. Email tiene 7 minutos sin mínimo oficial publicado;
  Discussion tiene 10 minutos y recomendación de al menos 100 palabras. El corrector
  ortográfico no está disponible en la experiencia oficial.
- Línea base: las cantidades ya eran 1+1, pero Email inventaba 80–120 palabras, ninguna
  tarea tenía intento cronometrado y el simulacro pedía una banda numérica 1–6 al
  estudiante para usarla como resultado Writing.
- Implementación: `object:toefl-writing-constructed-set1-v2` conserva los dos escenarios
  originales y fija 420/600 s. El piloto usa estados ready/active/closed y deadline de
  pared persistente; recargar no reinicia el tiempo. Enviar o expirar sella el textarea.
- Persistencia/privacidad: texto, identidad, deadline, foco, cierre y checklist viven
  sólo en `localStorage`. La UI declara que no envía el texto a servidor ni IA; el
  componente no hace `fetch`.
- Evaluación honesta: las seis comprobaciones por tarea son feedback WeLearn. El piloto
  y el Set 1 guardan Email/Discussion como `not_evaluated`; el simulacro ya no pide la
  auto-banda 1–6 ni mezcla esos textos en un total local.
- Alcance: el piloto standalone aplica 7/10 minutos. El Set 1 muestra esos límites como
  referencia, pero la composición dentro de la sesión completa corresponde a T23; T17
  no se usa para afirmar que el runner completo ya reproduce el reloj oficial.
- Evidencia automática: checker T17 PASS; unit T17 7/7; regresiones T12/T13/T16
  checker PASS y unit 21/21; ESLint dirigido PASS; TypeScript PASS sobre el `main`
  actual; Chromium T17 4/4 en 3,8 min; build oficial Turbopack PASS con guardianes y
  1.363/1.363 páginas; Chromium contra producción T12+T13+T16+T17 PASS 19/19 en
  16,5 s.
- Diagnóstico de build: los intentos iniciales dentro del sandbox no podían resolver
  `fonts.googleapis.com`; Webpack expuso `ENOTFOUND`. El mismo `npm run build` con red
  autorizada compiló Turbopack en 95 s y TypeScript interno en 70 s. No se cambió el
  script ni se rebajó ningún guardián.
- Repositorio: la rama hizo fast-forward limpio desde `f9296ce2` hasta el `main`
  canónico `f1c58658` y restauró la rebanada sin conflictos. Los nuevos activos de
  Historias que llegaron desde main quedaron preservados.
- Audio TOEFL: cero cambios, reproducción, transcripción, generación, Whisper,
  ElevenLabs o consumo de API. Continúa diferido por decisión del owner.
- Matriz: `docs/toefl-2026-writing-constructed-set1-runtime-evidence-2026-08-14.tsv`
  registra 45/46 controles cerrados y un único pendiente humano.
- Gate: **T17 permanece `[~]`** únicamente hasta la aprobación manual de VoiceOver
  T17. T16 conserva su VoiceOver propio pendiente. No hubo commit, push, deploy,
  publicación, cambio de remotos ni uso de secretos/API.

### Expansión no-audio Sets 2–20 — inventario y lote W1 — 2026-08-14

- Decisión de secuencia: por instrucción del owner, audio continúa al final. Mientras
  T16/T17 esperan VoiceOver humano, la expansión avanza sólo sobre contenido no-audio
  sin declarar cerradas T14/T15/T18/T19 ni T26.
- Inventario reproducible: `docs/toefl-2026-non-audio-sets-2-20-inventory-2026-08-14.tsv`
  registra los 19 sets y confirma un patrón común anterior al lote W1:
  - 12 huecos CTW frente a 10 por texto oficial; dos textos, incluido uno personal;
  - Daily Life ya tiene 3+2 preguntas y cada texto está dentro de 15–150 palabras;
  - Academic tiene cinco MCQ útiles más un multiselect complementario, pero los
    pasajes miden 263–342 palabras frente a aproximadamente 200;
  - Build a Sentence tiene 6 unidades sin intercambio contextual y una ya ordenada;
  - Email tenía 80–120 palabras inventadas y carecía de 420 s;
  - Discussion conservaba 100 palabras, pero carecía de 600 s.
- Lote W1 implementado: Sets 2–20 eliminan `80–120`, usan `minWords: 0`, 420 s y
  policy `none-published` para Email; Discussion usa 600 s, recomendación 100 y policy
  `recommended-100`. Ambas tareas declaran `not_evaluated` y no producen banda ETS.
- Guardián: `check:toefl-writing` ahora inspecciona los 20 sets; PASS. Unit Writing
  añade recorrido dinámico de Sets 2–20; PASS 8/8.
- Pendientes no-audio por set: reparar/derivar un CTW académico de 70–100 palabras con
  diez mitades alternas y clave server-only; comprimir Academic preservando cinco
  respuestas; expandir Build a Sentence a diez intercambios con distractor y clave
  server-only. Se ejecutarán en lotes editoriales pequeños, empezando por Sets 2–5.
- Preservación: los textos personales, fuentes v1 y ejercicios anteriores no se borran;
  pasan a suplemento o fuente server-only cuando el reemplazo oficial-family esté
  aprobado. Cero cambios de MP3, transcripción, TTS o ElevenLabs.

### Expansión no-audio — lote W2 Complete the Words Sets 2–5 — 2026-08-14

- Alcance cerrado: los Sets 2, 3, 4 y 5 sustituyen sus dos bloques heredados de seis
  huecos por un único objeto académico de 10 objetivos. Los textos finales miden 84,
  79, 76 y 79 palabras, respectivamente.
- Contrato TOEFL: en los cuatro objetos la primera oración queda intacta; después se
  oculta exactamente cada segunda palabra hasta completar diez objetivos. Cada palabra
  muestra su primera mitad y el estudiante escribe sólo las letras restantes.
- Revisión editorial/factual: se aplicaron las reparaciones ya registradas en las
  auditorías de banco: huddling y efectos climáticos se califican por especie; se retiró
  “known universe”; la reproducción y comunicación de hormigas ya no se presentan como
  absolutos; el texto de sueño limita la afirmación de depuración cerebral a evidencia
  sugerente en personas. Se conserva la dispensa de segunda revisión del owner; no se
  afirma adjudicación independiente.
- Seguridad y scoring: cada simulacro tiene `objectId`, versión, IDs estables y clave
  independiente en un módulo `server-only`. El runner dejó de enviar el objeto fijo del
  Set 1 y ahora usa la identidad declarada por cada pregunta. El endpoint rechaza objetos,
  IDs, respuestas o presentaciones desconocidas y reconcilia 10/10 por objeto.
- Preservación: los ocho bloques anteriores de los Sets 2–5, incluidos los textos
  personales y sus respuestas, permanecen como fuentes server-only reutilizables; ya no
  contaminan el conteo official-family ni viajan al cliente.
- Guardianes automáticos: `check:toefl-ctw` inspecciona Sets 1–5 y verifica conteo,
  70–100 palabras, primera oración, alternancia, mitad visible, IDs, separación de clave,
  preservación y wiring por objeto. PASS. Unit scoring PASS 8/8; ESLint dirigido PASS;
  TypeScript PASS.
- Navegador real: Chromium recorrió los Sets 2 y 5 como extremos representativos,
  verificó diez inputs accesibles, envió la identidad correcta y recibió 10/10 desde el
  endpoint seguro. PASS 2/2. El primer intento no ejecutó casos porque macOS negó el
  arranque de Chromium dentro del sandbox; la repetición autorizada pasó y separa ese
  ruido de infraestructura del resultado de producto.
- Estado: CTW queda cerrado para Sets 2–5. El siguiente trabajo del mismo lote es
  comprimir Academic a aproximadamente 200 palabras preservando cinco respuestas y
  expandir Build a Sentence a diez intercambios con distractor y clave server-only.
  Sets 6–20 conservan pendiente CTW. Cero cambios, reproducción, transcripción,
  generación o consumo de audio/API.

### Expansión no-audio — lote W3 Academic Passage Sets 2–5 — 2026-08-14

- Alcance cerrado: los pasajes de Mirrors, Echolocation, Circadian Rhythm y Horse
  Domestication pasan de 323/330/342/268 a 188/202/212/212 palabras. Cada texto conserva
  evidencia explícita para sus cinco preguntas single-select.
- Conteo honesto: sólo esas cinco preguntas llevan `official-family-pilot`. El antiguo
  multiselect se conserva como una sexta práctica `welearn-supplementary`, con badge y
  nota de sección que lo mantienen fuera del conteo oficial-family.
- Scoring/seguridad: 24 ítems de los cuatro sets tienen IDs y opciones estables. Las
  respuestas correctas están exclusivamente en `server-only`; el endpoint selecciona
  una configuración por `objectId`, rechaza nombres desconocidos o heredados del
  prototipo y mantiene exact-set sin crédito parcial para el suplemento.
- Runner compartido: dejó de usar el objeto fijo del Reading Set 1. Exige que todas las
  preguntas server-scored del simulacro pertenezcan a una sola identidad y envía esa
  identidad al cierre. El informe deriva las cinco preguntas oficiales del mock activo,
  no del banco Set 1.
- Preservación: los cuatro pasajes largos y sus claves v1 continúan completos en el
  registro server-only. La edición es reversible y no borra material reutilizable.
- Auditoría factual: la afirmación heredada “domesticación en Asia Central hacia 3500
  a. C.” se corrigió. El texto distingue husbandry local en Botai, el linaje asociado a
  Przewalski y el origen/expansión posterior del linaje doméstico moderno, conforme a
  Nature 2021/2024. El supuesto bit wear se presenta como interpretación discutida. La
  precisión de murciélagos ahora usa el resultado experimental de alambres de 0,18 mm,
  no la comparación imprecisa con un cabello. Evidencia completa en
  `docs/toefl-2026-academic-reading-sets2-5-factual-audit-2026-08-14.md`.
- Evidencia automática: `check:toefl-reading` PASS; unit Reading PASS 8/8, incluidos
  6/6 por cada Set 2–5; TypeScript PASS. Chromium conjunto verificó CTW 10/10 y Academic
  6/6 en Sets 2 y 5, además de las cinco historias del Set 1: PASS 7/7.
- Ruido separado: la primera corrida conjunta tuvo un único fallo de overflow después
  de cambiar dinámicamente zoom y viewport; el caso aislado pasó. Se reemplazó la lectura
  instantánea por una espera de reflow y la suite conjunta completa pasó 7/7.
- Estado: Academic queda cerrado para Sets 2–5 dentro del alcance automático. Sólo falta
  Build a Sentence para terminar el paquete no-audio de esos cuatro sets. La dispensa
  editorial/derechos del owner sigue vigente; no se afirma revisión independiente. Cero
  cambios, reproducción, transcripción, generación o consumo de audio/API.

### Expansión no-audio — lote W4 Build a Sentence Sets 2–5 — 2026-08-14

- Alcance cerrado: cada Set 2–5 pasa de seis frases descontextualizadas a diez
  intercambios originales. Cada ítem contiene una primera intervención, partes fijas de
  la respuesta, cuatro fragmentos que forman la respuesta y exactamente un distractor.
- Revisión editorial: se revisaron los 40 intercambios completos. Los primeros ítems de
  los cuatro sets se ajustaron para retirar ordenamientos alternativos obvios de
  complementos y una respuesta redundante sobre duración. Los 40 distractores quedan
  fuera del orden canónico y ninguna respuesta depende de un hecho externo.
- Seguridad: el payload público sólo contiene contexto, fragmentos ya mezclados e IDs.
  Los órdenes aceptados y las fuentes canónicas permanecen en un módulo `server-only`.
  Al cargar la configuración, el servidor compara los fragmentos públicos contra la
  fuente privada y falla cerrado si divergen.
- Scoring: el runner identifica dinámicamente el único `objectId` Build del set activo.
  El endpoint resuelve la clave privada de Sets 1–5, rechaza objetos, ítems, tiles o
  presentaciones desconocidos/duplicados y aplica orden exacto sin inventar puntaje ETS.
- Preservación: las 24 actividades anteriores de Sets 2–5 y sus respuestas se conservan
  completas como fuentes server-only. Se enlazan los seis IDs heredados de cada set y
  no se borra material reutilizable.
- Evidencia automática: checker Build PASS sobre 50 ítems de Sets 1–5; unit PASS 9/9,
  incluido 10/10 en cada Set 2–5; TypeScript y ESLint dirigido PASS. Las regresiones
  CTW y Academic pasan 16/16; Writing pasa checker y unit 8/8. El build completo pasa
  todos los guardianes y genera 1.364/1.364 rutas.
- Navegador real: Chromium completó CTW 10/10, Academic 6/6 y Build 10/10 dentro de los
  Sets 2 y 5: PASS 2/2. La regresión completa de Build Set 1 pasó 4/4, incluido teclado,
  persistencia, fallo técnico y ancho de 320 px. Un primer fallo fue sólo una aserción
  del test que esperaba `objectId` en la respuesta aunque el contrato lo valida en la
  solicitud; el producto ya devolvía 10/10 y la aserción se alineó con el contrato.
- Estado: los Sets 2–5 quedan completos dentro del alcance no-audio actual: CTW,
  Daily Life, Academic, Build y Writing constructed. Sets 6–20 son el siguiente lote.
  T16/T17 mantienen pendiente únicamente la aprobación humana VoiceOver documentada.
  Cero cambios, reproducción, transcripción, generación o consumo de audio/API.

### Expansión no-audio — lote W5 Sets 6–10 — 2026-08-14

- Alcance cerrado: Sets 6–10 completan CTW, Academic Passage y Build a Sentence con el
  mismo contrato aprobado en Sets 2–5. Daily Life y las dos tareas constructed ya
  cumplían el inventario no-audio.
- CTW: cinco objetos de 79/86/82/84/83 palabras, primera oración intacta, diez mitades
  alternas y clave de letras faltantes server-only. Los diez bloques previos se
  preservan fuera del payload.
- Academic: cinco pasajes de 184/197/192/199/197 palabras. Cada uno expone cinco
  single-select official-family y un sexto exact-set claramente rotulado como
  suplemento WeLearn. Cinco fuentes largas y sus claves v1 quedan server-only.
- Revisión factual: se corrigieron independencia temprana de escritura, predicción
  absoluta sobre arrecifes, mecanismo simplificado de deriva, atribución global a
  Gutenberg y cronología/causalidad del Great Oxidation Event. CTW también se contrastó
  con USDA, EPA, USGS y NHLBI. Evidencia en
  `docs/toefl-2026-written-sets6-10-factual-audit-2026-08-14.md`.
- Build: 50 intercambios originales con contexto, respuesta fija, cuatro fragmentos y
  un distractor. La clave privada verifica que el contenido público mezclado no derive;
  las 30 actividades anteriores se conservan server-only.
- Seguridad/scoring: el registro Build se separó en un agregador server-only para
  Sets 1–10; los tres endpoints resuelven el `objectId` del set activo y fallan cerrado
  ante identidad o presentación inválida. Unit cierra CTW 10/10, Academic 6/6 y Build
  10/10 por set.
- Evidencia: checkers CTW/Reading/Build PASS; units 8/8, 8/8 y 9/9; TypeScript PASS;
  ESLint dirigido PASS; build completo PASS con guardianes y 1.364/1.364 rutas.
  Chromium en extremos representativos Sets 6 y 10 cerró 10/10 + 6/6 + 10/10: PASS
  2/2. El primer intento con host cruzado no hidrató; la repetición con `localhost`
  pasó y queda separada como infraestructura.
- Estado: Sets 2–10 están completos dentro del alcance no-audio actual. El siguiente
  lote es Sets 11–15, seguido de Sets 16–20. VoiceOver T16/T17 sigue pendiente como
  gate humano. Cero audio abierto, reproducido, transcrito, generado o modificado.

### Expansión no-audio — lote W6 Sets 11–15 — 2026-08-14

- Alcance cerrado: Sets 11–15 completan CTW, Academic Passage y Build a Sentence con
  el mismo contrato de los lotes anteriores. Daily Life, Email y Academic Discussion
  ya cumplían el inventario no-audio.
- CTW: cinco objetos de 79/81/84/83/87 palabras, primera oración intacta, diez mitades
  alternas y clave de letras faltantes server-only. Los diez bloques previos se
  preservan fuera del payload.
- Academic: cinco pasajes de 182/190/193/202/202 palabras. Cada uno expone cinco
  single-select official-family y un sexto exact-set rotulado como suplemento WeLearn.
  Las cinco fuentes largas y sus claves v1 quedan server-only.
- Revisión factual: se corrigieron simplificación de resistencia antimicrobiana,
  escala/edad del arrecife, cuarto satélite y doble efecto relativista de GPS,
  confusión entre CCD y todos los descensos de abejas, y una falsa resolución del
  debate sobre adquisición del lenguaje. Evidencia en
  `docs/toefl-2026-written-sets11-15-factual-audit-2026-08-14.md`.
- Build: 50 intercambios originales con contexto, texto fijo de respuesta, cuatro
  fragmentos y un distractor. La clave privada verifica que el contenido público
  mezclado no derive; las 30 actividades anteriores se conservan server-only.
- Evidencia: checkers CTW/Reading/Build/Writing PASS; units 8/8, 8/8, 9/9 y 8/8;
  TypeScript y ESLint dirigido PASS; build completo PASS con guardianes y
  1.364/1.364 rutas. Chromium de producción en Sets 11 y 15 cerró 10/10 + 6/6 +
  10/10: PASS 2/2. El primer lanzamiento fue bloqueado por el sandbox de macOS antes
  de abrir página; la repetición autorizada pasó en seis segundos.
- Estado: Sets 2–15 están completos dentro del alcance no-audio actual. El siguiente
  lote es Sets 16–20. VoiceOver T16/T17 sigue pendiente como gate humano. Cero audio
  abierto, reproducido, transcrito, generado o modificado.

### Expansión no-audio — lote W7 Sets 16–20 — 2026-08-14

- Alcance cerrado: Sets 16–20 completan CTW, Academic Passage y Build a Sentence con
  el contrato aplicado en los lotes W2–W6. Daily Life, Email y Academic Discussion ya
  cumplían el inventario no-audio.
- CTW: cinco objetos de 81/85/80/82/84 palabras, primera oración intacta, diez mitades
  alternas y clave de letras faltantes server-only. Los diez bloques previos se
  preservan fuera del payload.
- Academic: cinco pasajes de 190/208/204/206/202 palabras. Cada uno expone cinco
  single-select official-family y un sexto exact-set rotulado como suplemento WeLearn.
  Las cinco fuentes largas y sus claves v1 quedan server-only.
- Revisión factual: se calificó la afirmación sobre arañas que cazan sin red, se separó
  hielo terrestre de hielo flotante, se evitaron simplificaciones del ciclo del agua y
  la visión, y se conservaron impactos/variabilidad de renovables. Academic evita el
  mito del 10 % cerebral, determinismo sobre flow, promesas universales de vacunas,
  una teoría única de sueños y sustancias oscuras falsamente identificadas. Evidencia
  en `docs/toefl-2026-written-sets16-20-factual-audit-2026-08-14.md`.
- Build: 50 intercambios originales con contexto, texto fijo de respuesta, cuatro
  fragmentos y un distractor. La clave privada verifica que el contenido público
  mezclado no derive; las 30 actividades anteriores se conservan server-only.
- Evidencia: checkers CTW/Reading/Build/Writing PASS; units 8/8, 8/8, 9/9 y 8/8;
  TypeScript y ESLint dirigido PASS; build completo PASS con guardianes y
  1.364/1.364 rutas. Chromium de producción en Sets 16 y 20 cerró 10/10 + 6/6 +
  10/10: PASS 2/2. La primera corrida apuntó al puerto equivocado y falló antes de
  abrir página; la repetición con el puerto configurado pasó 2/2.
- Estado: Sets 2–20 quedan completos dentro del alcance no-audio actual. El siguiente
  paso es la auditoría transversal de composición, tiempos, scoring, navegación y
  accesibilidad de los 20 simulacros. VoiceOver T16/T17 sigue pendiente como gate
  humano. Cero audio abierto, reproducido, transcrito, generado o modificado.

### Auditoría transversal de composición — hallazgo que supersede “completo” — 2026-08-14

- Hallazgo: W2–W7 cerró correctamente un módulo escrito por set, no una forma fija
  completa. “Completo dentro del alcance no-audio” en los lotes anteriores debe leerse
  como “Módulo 1 no-audio completo”.
- Contraste: ETS publica hasta 50/47/12/11 y dos etapas adaptativas en Reading y
  Listening. Su Practice Test 1 alineado con 2026 contiene 40 Reading, 34 Listening,
  12 Writing y 11 Speaking en una forma de dos módulos.
- Inventario actual por Set 2–20: 20 official-family Reading, 17 Listening, 12 Writing
  y 9 Speaking; Set 1 tiene el mismo núcleo más un CTW heredado visible. La brecha fija
  elegida es +20 Reading, +17 Listening y +2 Repeat por set.
- Runtime pendiente: clocks por módulo/tarea, cierre de etapas, Listening forward-only,
  retirar notas de preparación oral, dejar Speaking not_evaluated, impedir overall
  parcial e incorporar claves Daily/Listening al límite server-only.
- Decisión: preservar el trabajo actual como Módulo 1 y construir Módulo 2 original.
  La experiencia se rotulará forma fija WeLearn; no fingirá adaptatividad ETS.
- Evidencia: docs/toefl-2026-full-composition-audit-2026-08-14.md y TSV asociado.
  Cero audio tocado; primero se preparan guiones/manifiesto y el owner aprueba voces,
  muestras y costo antes de generar.

### Expansión forma fija — Reading Módulo 2 Sets 1–5 — 2026-08-14

- Arquitectura: se añadió una capa central reversible que conserva cada mock base,
  marca Reading Módulo 1, retira sólo de la sesión fija los suplementos y agrega
  Reading Módulo 2. Los IDs y fuentes anteriores no se borran.
- Composición: cada Set 1–5 queda en 40 Reading: M1 10 CTW + 5 Daily + 5 Academic;
  M2 repite 10 + 5 + 5. El Set 1 ya no mezcla su CTW personal heredado en el conteo.
- Seguridad: los diez huecos y diez preguntas nuevos por set usan claves privadas.
  El mismo objeto Reading reconcilia ambos módulos; CTW conserva un objeto por pasaje.
- Editorial: CTW tiene 70–100 palabras, primera oración intacta y diez mitades
  alternas; Daily usa 2 + 3; Academic tiene 180–220 palabras y cinco preguntas.
  Auditoría factual completa en
  `docs/toefl-2026-reading-module2-sets1-5-factual-audit-2026-08-14.md`.
- Evidencia: checker fijo PASS; unit fijo 3/3; regresiones CTW 8/8 y Reading 8/8;
  TypeScript y ESLint dirigido PASS; build completo PASS con guardianes y
  1.364/1.364 rutas. Chromium: Módulo 2 2/2, Reading Set 1 5/5 y mocks
  representativos 8/8. Cero audio abierto, reproducido, generado o modificado.
- Estado: Reading Sets 1–5 40/40. Todavía no son producto terminado: faltan Reading
  Sets 6–20, Listening, Repeat, clocks/navegación y gates finales.

### Expansión forma fija — Reading Módulo 2 Sets 6–10 — 2026-08-14

- Se extendió la misma capa reversible a Sets 6–10: Módulo 1 se conserva; la pregunta
  Academic suplementaria sale sólo de la sesión fija; Módulo 2 añade 10 CTW, cinco
  Daily Life (2 + 3) y cinco Academic por set.
- Los cinco CTW reconstruyen 71–74 palabras, mantienen intacta la primera oración y
  ocultan cada segunda palabra de la secuencia objetivo. Las claves viven en un módulo
  `server-only`; no hay respuestas correctas en los datos públicos.
- Los Academic tienen 180–184 palabras. Se contrastaron bioluminiscencia/fotosíntesis,
  humedales/concreto romano, satélites/isla de calor, compostaje/fuentes hidrotermales
  y acústica/sueño con NOAA, NASA, EPA, OSHA, NIH y literatura primaria abierta.
  Evidencia: `docs/toefl-2026-reading-module2-sets6-10-factual-audit-2026-08-14.md`.
- La reconstrucción editorial detectó y corrigió una frase no gramatical en Set 10;
  la versión final dice “sound energy, thus reducing echoes”.
- Evidencia: checker fijo PASS para Sets 1–10, unit fijo 3/3, regresiones CTW 8/8 y
  Reading 8/8, TypeScript y ESLint dirigido PASS; build completo con guardianes y
  1.364/1.364 rutas; Chromium forma fija 3/3 y mocks representativos 8/8.
- Estado: Reading Sets 1–10 40/40 y 78/97 total. Faltan Reading Sets 11–20, Listening,
  Repeat, clocks/navegación y gates finales. Cero audio abierto, reproducido,
  transcrito, generado o modificado.

### Expansión forma fija — Reading Módulo 2 Sets 11–15 — 2026-08-14

- Se aplicó la capa reversible a Sets 11–15. Cada sesión fija conserva Módulo 1,
  excluye el suplemento del conteo y suma Módulo 2 con 10 CTW + 5 Daily + 5 Academic.
- Los CTW reconstruyen 72–79 palabras y los Academic 181–206. Los huecos mantienen
  la primera oración intacta, alternancia exacta y primera mitad visible.
- El checker encontró antes de integrar tres cortes incorrectos de mitad (`before`,
  `without`, `carry`); quedaron corregidos en contenido, claves privadas y pruebas.
- Auditoría factual: mareas/suelo, agua subterránea/glaciares, conservación preventiva,
  circulación oceánica y polinización se contrastaron con NOAA, USGS, USDA, NPS y
  Smithsonian. Evidencia en
  `docs/toefl-2026-reading-module2-sets11-15-factual-audit-2026-08-14.md`.
- Evidencia: checker fijo PASS Sets 1–15, unit 3/3, regresiones CTW 8/8 y Reading
  8/8, TypeScript y ESLint dirigido PASS; build con guardianes y 1.364/1.364 rutas;
  Chromium forma fija 4/4 y mocks representativos 8/8.
- Estado: Reading Sets 1–15 40/40 y 78/97 total. Faltan Reading Sets 16–20,
  Listening, Repeat, clocks/navegación y gates finales. Cero audio abierto,
  reproducido, transcrito, generado o modificado.

### Expansión forma fija — Reading Módulo 2 Sets 16–20 — 2026-08-14

- Se cerró el último lote Reading con la misma capa reversible: Módulo 1 y sus fuentes
  se conservan, el suplemento queda fuera de la sesión fija y Módulo 2 agrega 10 CTW,
  cinco Daily Life (2 + 3) y cinco Academic por set.
- Los CTW reconstruyen 74–79 palabras y los Academic 189–208. Los 50 huecos pasan
  alternancia exacta, primera mitad visible, longitud declarada y reconstrucción.
- Monitoreo sísmico/aerosoles, nubes/anillos, invasoras/fuego, deltas y red eléctrica se
  contrastaron con USGS, NASA, NOAA, NPS y DOE. Evidencia en
  `docs/toefl-2026-reading-module2-sets16-20-factual-audit-2026-08-14.md`.
- Evidencia: checker fijo PASS Sets 1–20, unit 3/3, regresiones CTW y Reading 8/8 cada
  una, TypeScript y ESLint dirigido PASS; build con guardianes y 1.364/1.364 rutas;
  Chromium forma fija 5/5, incluido el extremo Set 20.
- Estado de producto: Reading 40/40 en los 20 sets y 78/97 total. Siguen faltando 17
  Listening, dos Repeat, clocks/navegación y gates finales. VoiceOver T16/T17 sigue
  pendiente. Cero audio abierto, reproducido, transcrito, generado o modificado.

### Expansión Listening escrita — contrato y guiones Sets 1–5 — 2026-08-14

- Se fijó la composición reproducible de la práctica ETS: Listening M1 18 y M2 16;
  total por familias 16 Choose, 6 Conversation, 4 Announcement y 8 Academic Talk.
- Preservación: cinco Choose y los tres estímulos largos existentes por set se
  reutilizan. La pregunta 3 de Announcement y la 5 de Academic quedan como suplemento,
  no se borran. Las Conversations se evaluaron por guion antes de decidir cortes.
- Sets 1–5 ya tienen 19 interacciones nuevas escritas por set: tres Choose para M1 y
  un M2 completo 8 + 2 + 2 + 4. Son 95 ítems públicos sin claves y 70 medios marcados
  `script-ready-audio-blocked`; claves en módulo `server-only`.
- Editorial: 55 Choose de 4–18 palabras, Conversation 73–91, Announcement 59–72 y
  Academic 181–205. Ocho pistas de longitud se detectaron y corrigieron antes del
  cierre. Auditoría factual con NOAA, NIH, EPA, NPS y USGS en
  `docs/toefl-2026-listening-scripts-sets1-5-audit-2026-08-14.md`.
- Evidencia: checker Listening fijo PASS, unit 3/3 y TypeScript PASS.
- Estado de producto no cambia: estos guiones aún no se sirven en el examen y Listening
  sigue 17/34. Faltan Sets 6–20, privacidad/API del bloque completo, preview editorial,
  aprobación de voces/costo, medios y runtime forward-only. Cero audio tocado.
