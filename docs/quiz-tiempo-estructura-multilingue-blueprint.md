# Blueprint multilingüe — quizes de tiempo, aspecto y estructura

> Para implementar un banco nuevo, registrar todos sus puntos de integración y publicarlo, usa
> primero [`quizzes-blueprint-operativo.md`](quizzes-blueprint-operativo.md). Este documento se
> concentra en las decisiones curriculares por idioma.

Fuente de verdad para escalar el motor de `/herramientas/quizes` a los ocho idiomas de
Idiomas WeLearn. Versión 2: 23 de agosto de 2026, endurecida tras auditoría funcional y
pedagógica.

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
5. conserva localmente su intento activo y su mejor resultado por selección y nivel.

## Fases y puertas de salida

| Fase | Idiomas | Riesgo pedagógico principal | Puerta de salida |
|---|---|---|---|
| 0 · Plataforma | Todos | duplicar lógica o filtrar respuestas | factoría tipada, IDs estables, guardián y motor único |
| 1 · Flexión europea | Francés, portugués BR, alemán | falsas equivalencias con español; orden verbal alemán | 3 ejemplos por forma, registro etiquetado y unidades evaluables completas |
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

### Japonés · A2–B1

No-pasado afirmativo y negativo; pasado afirmativo y negativo; ています progresivo;
ています como estado resultante; experiencia con たことがある; plan/intención; condición
たら; petición y prohibición. Se evita llamar “presente” al no-pasado.

### Coreano · A2–B1

Presente cortés 해요체 y formal 합니다체; pasado cortés; futuro/intención -(으)ㄹ 거예요;
progresivo -고 있어요; estado resultante -아/어 있어요; experiencia; condición; intención
-(으)려고 해요; petición y prohibición. El nivel de habla es parte de la respuesta correcta.

## Contrato de contenido

Cada forma seleccionable nueva declara:

- tres contextos con una sola respuesta inequívoca;
- un lema, una pista funcional y una explicación;
- tres distractores únicos por contexto, todos plausibles a primera vista;
- una forma errónea explícita para el laboratorio de reparación;
- variantes aceptadas solo cuando son normativas para el mismo significado y registro;
- una aparición en la reconstrucción final.

La factoría deriva de ese núcleo 3 opciones múltiples, 3 microtextos, 2 bloques de recuperación
acumulativa, 2 reparaciones y un mapa de 3 funciones. Los bloques acumulativos reutilizan los
casos de forma deliberada para pasar de reconocimiento a producción; no se anuncian como relatos
nuevos. El texto final se escribe aparte porque la coherencia discursiva no debe generarse
combinando frases al azar.

## Reglas contra falsos positivos

- Un ejemplo contiene exactamente un marcador `___`.
- Partículas, negación, auxiliares o componentes móviles pertenecen a la respuesta cuando su
  posición es parte del objetivo.
- No se acepta similitud, autocorrección ni distancia de edición.
- Mayúsculas no significativas, Unicode, apóstrofos y espacios se normalizan; las palabras no.
- Japonés y coreano no dependen de espacios artificiales para validar una forma.
- Tarjetas idénticas siguen necesitando IDs distintos; en el banco editorial inicial no se
  repiten textos para evitar pistas ambiguas.
- Un distractor no puede ser una variante correcta en otro registro sin que el contexto marque
  claramente el registro objetivo.
- La posición correcta se distribuye de forma equilibrada entre A, B, C y D.
- El token erróneo ocupa de forma equilibrada las tres posiciones seleccionables.
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
   opciones, distribución de errores, variantes normativas y ausencia de pistas literales.
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
