# Ideas avanzadas — blueprint editorial y pedagógico

Estado: **propuesta para revisión**  
Versión: `0.2.0`  
Ruta del producto: `/practica/ideas-avanzadas`  
Nivel de lengua: **B2–C1**  

## 1. Qué existe y qué faltaba

Ya existe un motor funcional de seis movimientos, un catálogo, progreso local por lección y dos
ciclos completos:

1. **The framing effect**.
2. **Calibration and competence** — Dunning–Kruger sin la curva viral.

El tipo `AdvancedLesson` ya permite definir orientación, escucha, lectura, vocabulario, práctica y
producción. Eso es un **contrato técnico inicial**, no un blueprint editorial completo.

Antes de este documento faltaban:

- una taxonomía amplia y un orden de producción;
- reglas distintas para hechos empíricos, hipótesis sociales y marcos éticos;
- cantidades y criterios de calidad por movimiento;
- trazabilidad entre afirmaciones, fuentes y ejercicios;
- un protocolo para temas sensibles;
- una ficha editorial previa a la implementación;
- puertas automáticas que impidan publicar una lección incompleta.

## 2. Tesis pedagógica

Una lección no debe transmitir una opinión para memorizar. Debe hacer visible cómo cambia el juicio
del estudiante cuando incorpora lenguaje, evidencia, límites y contraargumentos.

La circularidad se comprueba así:

```text
intuición inicial
      ↓
escucha sin apoyo escrito
      ↓
lectura larga con evidencia y objeciones
      ↓
vocabulario para distinguir conceptos
      ↓
ejercicios de discriminación y transferencia
      ↓
producción propia
      ↓
respuesta de nuevo a la intuición inicial
```

El último movimiento no pregunta únicamente si el estudiante cambió de opinión. Pregunta si ahora
puede justificarla con mayor precisión y declarar qué evidencia podría hacerle cambiar de nuevo.

## 3. Tres estatutos editoriales

Cada tema debe declarar uno —y solo uno— de estos estatutos. La interfaz futura debe mostrarlo.

### A. Constructo empírico

Patrón definido y estudiado mediante observación o experimento: efecto de encuadre, heurística del
afecto, anclaje. Se enseñan diseño, resultados, tamaño, replicaciones y límites.

No se permite convertir una tendencia promedio en diagnóstico individual.

### B. Hipótesis social discutida

Proposición que depende de definiciones, población, periodo histórico o método: hipergamia,
movilidad social, preferencias de pareja. Debe presentar definiciones competidoras, datos,
heterogeneidad, mecanismos alternativos y contraejemplos.

No se permite presentar una etiqueta de internet como una ley universal.

### C. Marco normativo o filosófico

Propuesta para evaluar acciones o carácter: firmeza–fuerza–generosidad, lealtad frente a integridad,
igualdad frente a equidad. Debe identificar autoría o tradición, premisas, tensiones internas,
objeciones y casos límite.

No se permite describir una conclusión moral como si fuera un hallazgo experimental.

## 4. Contrato de una lección

Duración objetivo: **35–50 minutos**. La lección se puede abandonar y retomar por `slug`.

### Movimiento 1 — Orientar

- Un dilema, comparación o predicción en inglés.
- Dos o tres opciones plausibles; ninguna puede ser una caricatura obvia.
- El estudiante registra una opción y confianza de `0–100`.
- La revelación abre la pregunta; no adelanta toda la lectura.
- Tiempo objetivo: 2–4 minutos.

### Movimiento 2 — Escuchar

- Audio original de 180–280 palabras; 75–120 segundos.
- No es la lectura larga narrada ni un resumen que revele todas las respuestas.
- Primera escucha: idea principal.
- Segunda escucha: mecanismo, contraste o límite.
- Dos preguntas: una global y una de detalle/inferencia.
- Transcripción disponible después del primer intento.
- Tiempo objetivo: 5–7 minutos.

### Movimiento 3 — Leer con matices

- Texto original de 900–1.400 palabras.
- Cinco a siete secciones con subtítulos informativos.
- Estructura mínima:
  1. intuición popular;
  2. definición operativa;
  3. evidencia o argumento central;
  4. explicación alternativa o contraargumento;
  5. límites de generalización;
  6. protocolo de aplicación.
- Entre tres y seis fuentes; al menos dos primarias para constructos empíricos.
- Las fuentes sostienen afirmaciones concretas, no sirven como decoración al final.
- Tiempo objetivo: 12–18 minutos.

### Movimiento 4 — Vocabulario

- Entre ocho y doce entradas.
- Cada entrada incluye categoría gramatical, significado contextual, colocación y ejemplo original.
- Al menos cuatro términos deben ser reutilizables fuera del tema.
- Debe existir un contraste léxico: por ejemplo, `confidence` frente a `calibration`.
- Tiempo objetivo: 5–7 minutos.

### Movimiento 5 — Practicar

- Seis ejercicios como mínimo, además de las dos preguntas de escucha.
- Cobertura obligatoria:
  - definición;
  - evidencia;
  - límite;
  - caso nuevo;
  - formulación lingüística;
  - mejor conclusión disponible.
- Los distractores representan confusiones naturales; no se podan por longitud, gramática o tono.
- Cada respuesta tiene explicación específica.
- Tiempo objetivo: 7–10 minutos.

### Movimiento 6 — Producir y cerrar la órbita

- Producción de 100–180 palabras o audio de 60–90 segundos.
- Lista de cuatro criterios observables.
- Modelo comentado, no presentado antes del primer borrador.
- El estudiante responde de nuevo al dilema inicial y registra nueva confianza.
- El cierre compara `opción inicial`, `opción final`, `confianza inicial` y `confianza final`.
- Debe completar: “I would update this conclusion if…”.
- Tiempo objetivo: 7–10 minutos.

## 5. Arquitectura de evidencia

### Jerarquía de fuentes

1. Artículo original o fuente filosófica primaria.
2. Replicación, revisión sistemática o metaanálisis.
3. Crítica metodológica o interpretación competidora.
4. Fuente pedagógica secundaria para contexto, nunca como único sustento.

### Registro por afirmación

La ficha editorial debe asociar cada afirmación importante con:

- `claimId`;
- texto breve de la afirmación;
- estatuto: `supported`, `contested`, `normative` o `illustrative`;
- fuente;
- sección donde aparece;
- nivel de certeza que debe conservar el lenguaje.

### Lenguaje de calibración

- `shows` solo para un resultado directamente observado en el estudio citado;
- `suggests` para interpretaciones compatibles con la evidencia;
- `may` para mecanismos posibles;
- `is debated` cuando existe disputa relevante;
- evitar `proves`, `always`, `everyone`, `men are` y `women are` salvo que se analicen como
  afirmaciones problemáticas.

## 6. Protocolo de temas sensibles

Se activa para sexo, pareja, género, salud mental, raza, clase, violencia, religión, política y
moralidad aplicada.

La lección debe:

1. definir población, periodo, unidad de análisis y variable;
2. separar promedio grupal de predicción individual;
3. presentar al menos una explicación alternativa seria;
4. evitar ejemplos que humillen a una identidad real;
5. mostrar cuándo la etiqueta deja de ser medible;
6. distinguir descripción de prescripción;
7. pasar revisión de tono y posible daño;
8. incluir una pregunta de falsabilidad: “¿Qué dato debilitaría esta conclusión?”.

## 7. Biblioteca ampliada: 36 temas

Los dos primeros ya están construidos. El resto es inventario editorial; “estar en la lista” no
equivale a estar publicado.

### Colección I — Juicio y decisión

1. **Efecto de encuadre** — disponible.
2. **Dunning–Kruger: calibración, no montaña** — disponible.
3. **Heurística del afecto** — cómo el sentimiento altera riesgo y beneficio percibidos.
4. **Sesgo de confirmación** — buscar, interpretar y recordar a favor de una creencia.
5. **Heurística de disponibilidad** — confundir facilidad de recuerdo con frecuencia.
6. **Anclaje** — cuánto arrastra una cifra inicial incluso cuando es débil.
7. **Coste hundido** — persistir porque ya invertimos, no porque convenga continuar.
8. **Aversión a la pérdida y efecto dotación** — perder, poseer y valorar.

### Colección II — Evidencia e incertidumbre

9. **Tasas base y representatividad** — historias convincentes frente a probabilidades previas.
10. **Riesgo relativo y riesgo absoluto** — cuándo “duplicar” sigue siendo pequeño.
11. **Correlación, causalidad y variables ocultas**.
12. **Regresión hacia la media** — por qué un extremo suele moderarse.
13. **Sesgo de supervivencia** — aprender solo de quienes quedaron visibles.
14. **Sesgo retrospectivo y sesgo de resultado** — juzgar decisiones con información posterior.

### Colección III — Percepción social y grupos

15. **Error fundamental de atribución** — persona, contexto y explicación.
16. **Efecto halo y efecto cuerno** — una impresión que colorea el conjunto.
17. **Prueba social y conformidad** — cuándo seguir a otros informa y cuándo deforma.
18. **Ignorancia pluralista** — muchos dudan mientras cada uno cree estar solo.
19. **Polarización de grupo** — por qué la deliberación puede volver más extrema una postura.
20. **Pensamiento de suma cero** — reparto fijo frente a cooperación y creación de valor.
21. **Identidad de grupo y favoritismo endogrupal**.
22. **Indignación moral, reputación y grandstanding**.

### Colección IV — Pareja, vínculo y estatus

23. **Hipergamia: ¿dato, patrón o relato?**
24. **Emparejamiento selectivo** — educación, ingresos, edad, valores y semejanza.
25. **Preferencias frente a oportunidades reales** — lo deseado, lo disponible y lo elegido.
26. **Homofilia y proximidad** — por qué los vínculos no nacen en un mercado abstracto.
27. **Prestigio, dominancia y estatus** — tres rutas que suelen confundirse.
28. **Reciprocidad, deuda social y asimetría**.
29. **Simping, complacencia y pérdida de límites** — analizar conductas sin usar la etiqueta como
    insulto.
30. **Celos, exclusividad y normas culturales**.

### Colección V — Carácter y ética práctica

31. **Firmeza, fuerza y generosidad** — capacidad propia y ayuda efectiva.
32. **Asertividad, agresión y pasividad** — límites sin dominación.
33. **Compasión con límites** — ayudar sin borrar agencia ni capacidad.
34. **Igualdad, equidad y necesidad** — criterios distintos para distribuir.
35. **Lealtad frente a integridad** — qué hacer cuando pertenecer exige callar.
36. **Perdón, reconciliación y confianza** — tres actos que no son equivalentes.

## 8. Oleadas de producción

### Oleada 0 — motor probado

- Efecto de encuadre.
- Dunning–Kruger.

### Oleada 1 — validar variedad de estatutos

1. Heurística del afecto — constructo empírico.
2. Firmeza, fuerza y generosidad — marco normativo.
3. Hipergamia — hipótesis social sensible.
4. Sesgo de confirmación — constructo empírico.
5. Pensamiento de suma cero — constructo social.
6. Asertividad, agresión y pasividad — transferencia práctica.

La Oleada 1 prueba si el mismo motor puede enseñar honestamente los tres estatutos. No se escala a
los 36 hasta revisar esos seis ciclos.

### Oleada 2 — fundamentos de evidencia

Tasas base, riesgo relativo/absoluto, correlación/causalidad, regresión hacia la media, supervivencia
y sesgo de resultado.

### Oleadas 3 y 4

Percepción social, grupos, pareja, estatus y ética práctica. Los temas sensibles pasan por una ronda
editorial adicional.

## 9. Ficha editorial obligatoria

Antes de escribir código, cada tema debe completar:

```yaml
slug:
titleEs:
titleEn:
collection:
evidenceClass: empirical | contested-social | normative
editorialRisk: low | medium | high
centralQuestion:
popularClaim:
defensibleClaim:
learningObjectives:
  -
misconceptions:
  -
claimLedger:
  - claimId:
    status: supported | contested | normative | illustrative
    source:
counterposition:
scopeLimits:
openingDilemma:
listeningAngle:
readingSections:
vocabularyTargets:
practiceTargets:
productionPrompt:
updateCondition:
sources:
  - type: primary | replication | review | critique | philosophical-source
    citation:
    url:
```

## 10. Contrato de datos v2 propuesto

El contrato actual se conserva mientras se validan los pilotos. La siguiente versión debe añadir:

```ts
type EvidenceClass = 'empirical' | 'contested-social' | 'normative'
type EditorialRisk = 'low' | 'medium' | 'high'

interface AdvancedLessonV2 extends AdvancedLesson {
  evidenceClass: EvidenceClass
  editorialRisk: EditorialRisk
  centralQuestion: string
  claims: Array<{
    id: string
    status: 'supported' | 'contested' | 'normative' | 'illustrative'
    summary: string
    sourceIds: string[]
  }>
  sources: Array<{
    id: string
    type: 'primary' | 'replication' | 'review' | 'critique' | 'philosophical-source'
    citation: string
    href: string
  }>
  opening: AdvancedLesson['opening'] & {
    confidencePrompt: boolean
  }
  production: AdvancedLesson['production'] & {
    updateConditionPrompt: string
  }
}
```

## 11. Puertas de calidad

Una lección no se marca `available` si falla cualquiera de estas puertas:

1. **Completitud:** seis movimientos, ocho preguntas totales y cierre circular.
2. **Fuentes:** URLs válidas y ledger de afirmaciones completo.
3. **Estatuto:** el lenguaje coincide con `evidenceClass`.
4. **Escucha real:** las preguntas exigen escuchar y no se responden solo con el título.
5. **Distractores:** todos plausibles y formalmente equivalentes.
6. **Lectura:** longitud, contraargumento, alcance y protocolo de aplicación presentes.
7. **Vocabulario:** ocho entradas como mínimo y ejemplos originales.
8. **Producción:** criterios observables, modelo y condición de actualización.
9. **Sensibilidad:** revisión adicional cuando `editorialRisk = high`.
10. **Accesibilidad:** teclado, foco, contraste, etiquetas y móvil sin desbordamiento.
11. **Persistencia:** progreso independiente por `slug`.
12. **Compilación:** guardián del catálogo, TypeScript y build pasan sin reducir umbrales.

## 12. Fuentes aportadas por el usuario

### `Bias: Affect Heuristic.pages`

Es un buen documento semilla porque ya contiene definición, caso, efectos individuales y
sistémicos, mecanismo, estrategias y ejemplos. El contenido se reescribe como síntesis original y
sus afirmaciones se conectan directamente con fuentes primarias.

### `Firmness and Generosity.pages`

El fragmento propone que la fuerza se manifiesta como firmeza en la preservación de la propia
capacidad y como generosidad en la ayuda efectiva a otros. También contiene afirmaciones
filosóficas y aplicaciones morales específicas.

Antes de convertirlo en lección se requiere:

- confirmar autor, obra y traducción del fragmento;
- separar la tesis central de sus aplicaciones particulares;
- elegir contraargumentos filosóficos;
- no incorporar automáticamente el pasaje sobre aborto: pertenece al documento fuente, no a la
  solicitud de producto, y exigiría una decisión editorial separada.

## 13. Decisiones que debe revisar el usuario

1. ¿Aprobamos 36 temas como horizonte o reducimos la primera biblioteca visible a 18?
2. ¿La Oleada 1 debe publicar en el orden propuesto?
3. ¿Mostramos en pantalla las etiquetas `empírico`, `discutido` y `normativo`?
4. ¿La confianza inicial/final se expresa como porcentaje o escala de cinco puntos?
5. ¿“Firmeza, fuerza y generosidad” conserva ese título o se formula como pregunta?

