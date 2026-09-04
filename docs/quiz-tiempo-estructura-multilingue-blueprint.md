# Blueprint multilingüe — quizes de tiempo, aspecto y estructura

> Para implementar un banco nuevo, registrar todos sus puntos de integración y publicarlo, usa
> primero [`quizzes-blueprint-operativo.md`](quizzes-blueprint-operativo.md). Este documento se
> concentra en las decisiones curriculares por idioma.

Fuente de verdad para escalar el motor de `/herramientas/quizes` a los ocho idiomas de
Idiomas WeLearn. Versión 5: 4 de septiembre de 2026, endurecida tras auditoría funcional y
pedagógica.

Actualización del contrato de reconocimiento (4 de septiembre de 2026): el nivel 1 ya no
contrasta tiempos cuando el estudiante seleccionó una sola forma. Sus cuatro opciones son
realizaciones de esa misma forma y del mismo lema; tres fallan por persona, número, auxiliar,
concordancia o construcción. Nivel 1 y nivel 2 tienen bancos editoriales separados. En alemán,
un verbo separable muestra el prefijo en su posición real y el hueco evalúa la parte finita;
nunca se inserta una respuesta contigua que duplique el prefijo.

Estado de migración de este contrato: las diez formas alemanas son conformes y están protegidas
por regresiones morfológicas, de independencia entre niveles y de partículas separables. Los
demás idiomas conservan temporalmente la compatibilidad anterior del constructor; no se declaran
conformes hasta recibir distractores de su propio paradigma y escenas propias por nivel. La
migración se hace forma por forma porque ruso, japonés y coreano requieren guardianes de aspecto,
construcción y registro, no una copia de la flexión europea.

Actualización italiana (28 de agosto de 2026): las trece formas usan bancos editoriales
independientes en los niveles 2–5 y diez escenas finales distintas del nivel 1. El motor admite
varios retos finales y entrega un informe acumulado al cerrar el nivel 6. El banco fija un mínimo
verificable de diez retos por forma y nivel e incorpora `stare + gerundio` en presente e
imperfetto. El guardián `check:tense-quests` falla si reaparece un banco generado, baja la
cobertura, se repite una escena final o una respuesta escrita no conserva la morfología del
objetivo.

Actualización inglesa (28 de agosto de 2026): las diecinueve formas abandonaron la factoría
de ejemplos heredados. Cada forma dispone de diez retos editoriales por nivel, relatos
conectados, planos temporales explícitos para perfectos, contrastes condicionales verificables y
diez decisiones finales autónomas. Producción importa exclusivamente
`english-tense-quest-config.ts`; el guardián rechaza contenido generado, cobertura inferior a
diez o pistas temporales insuficientes.

Actualización francesa (28 de agosto de 2026): las diez formas cuentan con diez retos por nivel
y contenido independiente para reconocimiento, producción, relato, reparación, secuencia y
dossier final. El `plus-que-parfait` y el `futur antérieur` exigen dos planos temporales
explícitos; el `passé simple` declara siempre su registro literario; los compuestos verifican
auxiliar y concordancia. Las claves de opción, la posición del error y las tarjetas finales se
balancean globalmente y fallan el guardián si se degradan.

Actualización portuguesa (29 de agosto de 2026): las diez formas del portugués brasileño usan
diez bancos editoriales por nivel. `Estar + gerúndio` se separa del presente; el futuro sintético
declara su valor de registro frente a `ir + infinitivo`; el mais-que-perfeito y el futuro composto
exigen otro marco temporal; el condicional passado exige condición o resultado real visible. La
configuración activa no importa la factoría heredada.

Actualización alemana (4 de septiembre de 2026): las diez formas usan diez bancos editoriales por
nivel y la ruta pública importa `german-structure-quest-config.ts`. Los compuestos exigen la
unidad verbal completa, incluso cuando el orden alemán separaría sus piezas en una oración
principal. Los verbos separables son la excepción visual necesaria: el prefijo ya visible al
final no se repite dentro del hueco y la instrucción dice que se escriba exactamente la parte
ausente. Perfekt distingue `haben` y `sein`, Plusquamperfekt y Futur II exigen dos
planos temporales, Futur I se reserva para predicción o compromiso explícito y cada imperativo
muestra si la persona destinataria requiere `du`, `ihr` o `Sie`.

Actualización rusa (29 de agosto de 2026): los diez contrastes disponen de diez retos por nivel
y la ruta pública importa `russian-structure-quest-config.ts`. Pasado y futuro separan proceso
de resultado mediante límites discursivos visibles; los dos condicionales conservan la misma
morfología con `бы` y se distinguen solo por anclas actuales o pasadas; los imperativos declaran
la meta comunicativa del aspecto; y la selección de infinitivo contrasta fase con logro. El
guardián conserva variantes normativas con y sin `ё`, exige la construcción analítica futura
completa y rechaza escenas sin motivación aspectual.

Actualización japonesa (29 de agosto de 2026): los diez contrastes usan diez bancos editoriales
por nivel y la ruta pública importa `japanese-structure-quest-config.ts`. Se conserva la categoría
honesta de no-pasado; `〜ています` progresivo exige actividad en curso y el valor resultativo
exige evidencia posterior al cambio. Experiencia acepta las variantes normativas con y sin `が`,
pero siempre solicita la construcción completa. `つもり` y `予定`, `たら`, petición y prohibición
se validan por su función comunicativa y no por una sílaba fija fuera del hueco.

## Principio de producto

No se traduce una lista inglesa de “tiempos”. Cada idioma selecciona las oposiciones que un
estudiante necesita para interpretar y producir significado: tiempo, aspecto, modalidad,
orden verbal, condición o nivel de habla. La interfaz conserva seis mecánicas y corrección
cerrada; el currículo cambia por idioma.

El estudiante:

1. escoge las formas o contrastes que quiere practicar;
2. completa un nivel sin recibir señales de acierto;
3. puede revisar y cambiar sus respuestas antes de finalizar;
4. recibe puntaje por decisión lingüística, solución y explicación al cerrar el nivel;
5. conserva localmente su intento activo y su mejor resultado por selección y nivel;
6. al terminar el nivel final, ve el resultado de los seis niveles y recomendaciones basadas en
   sus tres áreas más débiles.

## Fases y puertas de salida

| Fase | Idiomas | Riesgo pedagógico principal | Puerta de salida |
|---|---|---|---|
| 0 · Plataforma | Todos | duplicar lógica o filtrar respuestas | factoría tipada, IDs estables, guardián y motor único |
| 1 · Flexión europea | Francés, portugués BR, alemán | falsas equivalencias con español; orden verbal alemán | 10 retos editoriales por forma y nivel, registro etiquetado y unidades evaluables completas |
| 2 · Aspecto eslavo | Ruso | llamar “tiempo” a la oposición perfectivo/imperfectivo | proceso/resultado separados en pasado, futuro, imperativo e infinitivo |
| 3 · Tiempo, aspecto y registro | Japonés, coreano | imponer categorías europeas; confundir progreso y estado | no-pasado y pasado honestos; estado resultante separado; registro visible |
| 4 · Operación | Ocho idiomas | rutas bonitas sin funcionamiento real | build, navegación móvil, intento completo y verificación en producción |

Ninguna fase se publica si el guardián de catálogo o el de quizes pierde cobertura previa.

## Inventarios iniciales

### Francés · A2–B2

Présent, passé composé, imparfait, plus-que-parfait, passé simple —marcado como literario—,
futur proche, futur simple, futur antérieur, conditionnel présent y conditionnel passé.

### Portugués brasileño · A2–B2

Presente, estar + gerúndio, pretérito perfeito, pretérito imperfeito, mais-que-perfeito
composto, ir + infinitivo, futuro do presente, futuro composto, futuro do pretérito y
condicional passado. El futuro sintético se presenta con su valor de registro, no como la
única forma natural de hablar del futuro.

### Alemán · A2–B2

Präsens, Perfekt con haben, Perfekt con sein, Präteritum, Plusquamperfekt, Futur I, Futur II,
würde + infinitivo, irrealidad pasada e Imperativ. En las formas compuestas se evalúa la
unidad verbal y el orden, no un auxiliar aislado con una respuesta congelada fuera del hueco.

### Ruso · A2–B1

Presente imperfectivo; pasado como proceso y como resultado; futuro compuesto imperfectivo y
futuro perfectivo; condicional actual y contrafactual pasado; imperativo imperfectivo y
perfectivo; elección de aspecto tras verbos de fase. El contexto decide el tiempo de бы: la
morfología por sí sola no inventa una diferencia que el ruso no tiene.

Puerta editorial rusa: cada banco debe nombrar la oposición aspectual que realmente decide la
respuesta. El guardián rechazará pasados perfectivos sin resultado visible, imperfectivos sin
proceso/fondo/repetición, futuros perfectivos sin límite de resultado, condicionales sin ancla
que distinga presente de pasado e imperativos cuya elección de aspecto no esté motivada.

### Japonés · A2–B1

No-pasado afirmativo y negativo; pasado afirmativo y negativo; ています progresivo;
ています como estado resultante; experiencia con たことがある; plan/intención; condición
たら; petición y prohibición. Se evita llamar “presente” al no-pasado.

### Coreano · A2–B1

Presente cortés 해요체 y formal 합니다체; pasado cortés; futuro/intención -(으)ㄹ 거예요;
progresivo -고 있어요; estado resultante -아/어 있어요; experiencia; condición; intención
-(으)려고 해요; petición y prohibición. El nivel de habla es parte de la respuesta correcta.

## Contrato de contenido

Cada forma seleccionable nueva declara bancos separados por función pedagógica:

- diez contextos por forma y nivel, cada uno con una sola respuesta inequívoca;
- un lema, una pista funcional y una explicación;
- tres distractores únicos por contexto, todos plausibles a primera vista;
- una forma errónea explícita para el laboratorio de reparación;
- variantes aceptadas solo cuando son normativas para el mismo significado y registro;
- relatos y textos de edición escritos como unidades discursivas;
- una decisión final con contexto autónomo y cuatro formas plausibles del mismo lema.
- una escena final distinta de los contextos usados para reconocer la forma en el nivel 1.

La factoría puede derivar IDs, balance de claves y envoltorios de interfaz; no puede inventar
coherencia. Un relato y un texto de reparación se escriben aparte porque la coherencia discursiva
no se obtiene combinando frases al azar. Cuando una fase usa recuperación deliberada, se etiqueta
como recuperación y su huella no se presenta como material nuevo.

## Reglas contra falsos positivos

- Un ejemplo contiene exactamente un marcador `___`.
- Partículas, negación, auxiliares o componentes móviles pertenecen a la respuesta cuando ocupan
  el hueco. Si una partícula separable ya está visible en su posición sintáctica, se evalúa solo
  la parte finita y el guardián prohíbe duplicarla.
- En el nivel 1, los cuatro candidatos pertenecen a la forma seleccionada y al mismo lema; la
  decisión es morfológica, no una identificación encubierta de tiempos.
- Los contextos de los niveles 1 y 2 tienen huellas distintas y provienen de bancos separados.
- No se acepta similitud, autocorrección ni distancia de edición.
- Mayúsculas no significativas, Unicode, apóstrofos y espacios se normalizan; las palabras no.
- Japonés y coreano no dependen de espacios artificiales para validar una forma.
- Tarjetas idénticas siguen necesitando IDs distintos; en el banco editorial inicial no se
  repiten textos para evitar pistas ambiguas.
- Un distractor no puede ser una variante correcta en otro registro sin que el contexto marque
  claramente el registro objetivo.
- La posición correcta se distribuye de forma equilibrada entre A, B, C y D.
- El token erróneo ocupa de forma equilibrada las tres posiciones seleccionables.
- Una respuesta no incorpora un adverbio léxico que el contexto no obliga a producir.
- Cada candidato final pertenece al mismo lema y la clave rota entre las cuatro posiciones.
- Una estrategia ciega —primera opción, única forma del tiempo seleccionado o coincidencia de
  vocabulario— no alcanza el aprobado en los tests adversariales.
- Un mapa funcional muestra una cláusula y pide clasificar su función; la pista nunca reproduce
  literalmente la opción correcta.
- Una reconstrucción con una sola forma ofrece al menos tres distractores y nunca un banco 1:1.

## Arquitectura

```text
TenseQuestEngine.tsx               estado, accesibilidad y puntuación
create-structure-quest.ts          factoría pura de retos
*-structure-quest.ts               inventario y contenido por idioma
scripts/check-tense-quests.mjs     integridad, cobertura e IDs
app/(site)/herramientas/quizes/*   metadata y datos estructurados por ruta
```

Las páginas siguen siendo Server Components y entregan configuración serializable al único
Client Component interactivo. Cada ruta importa solo su banco, evitando un paquete cliente con
los ocho idiomas.

## QA por publicación

1. `npm run check:tense-quests` valida estructura, respuesta, unicidad, cobertura, distribución de
   opciones, distribución de errores, variantes normativas, morfología objetivo, independencia
   entre niveles y ausencia de pistas literales.
2. `npm run check:practica-catalog` protege escucha, IELTS, ICFES y catálogos previos.
3. `npx tsc --noEmit`, lint de archivos tocados y `npm run build` validan integración.
4. En navegador se prueba por idioma: selección única, preset, URL compartible, persistencia tras
   recarga, los seis niveles, edición hacia atrás, corrección diferida, distractores, resultado,
   teclado y móvil.
5. Después de desplegar se comprueban el hub y las ocho rutas con HTTP 200 y contenido propio.

## Evolución

La siguiente ampliación no consiste en sumar formas raras para inflar el selector. Se prioriza:

- contraste entre dos formas dentro del mismo relato;
- variantes normativas y regionales claramente marcadas;
- nuevos textos finales y rotación determinista;
- revisión por hablante experto antes de subir un banco de B2 a C1;
- analítica agregada de abandono por nivel sin almacenar respuestas personales.
