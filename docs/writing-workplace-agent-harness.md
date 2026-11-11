# Writing laboral B2 · agentes, subagentes y harness

## Alcance actual

Este primer corte contiene **tres casos jugables de inglés B2** en `/practica/ingles/b2/escritura`. Es un preview para revisión del usuario. No habilita C1, C2 ni otros idiomas, y no modifica los 480 ejercicios A1–B1. La ruta declara `noindex` y el hub B2 conserva Writing como pendiente hasta aprobación.

La unidad editorial es un malentendido laboral concreto: correo recibido → documento de hechos → análisis de alcance, intención, propósito y evidencia → respuesta al correo → revisión y segunda versión. El estudiante debe poder señalar qué sabe, qué supone otra persona, qué falta por comprobar y qué acción está bajo su control.

## Agente principal y subagentes

| Orden | Rol versionado | Entrega y límite |
|---|---|---|
| 1 | `writing-workplace-coordinator` | Orden de caso y reparto del set; no edita runtime. |
| 2 | `writing-workplace-author` | Correo, hechos, preguntas, consigna y modelo en candidato aislado. |
| 3 | `writing-workplace-evidence-auditor` | Revisión independiente de cronología, claves y afirmaciones. |
| 4 | `writing-workplace-language-auditor` | Revisión de nivel B2, naturalidad y registro. |
| 5 | `writing-workplace-student-simulator` | Tres lecturas plausibles y prueba de opciones y feedback. |
| 6 | `writing-workplace-integrator` | Único editor de datos y runtime; ejecuta verificaciones. |
| 7 | `writing-workplace-release-warden` | PASS/FAIL final sin corregir ni publicar. |

Los cuatro roles 2–5 son subagentes del coordinador; los auditores no reciben una clave como verdad antes de resolver el caso. Se puede trabajar en paralelo hasta cuatro agentes activos, pero solo el integrador escribe código compartido. Los prompts están en `.claude/agents/writing-workplace-*.md` y también sirven como contratos legibles para otras herramientas de agentes.

## Contrato de un caso

`src/data/practica/writing-workplace-b2.json` es la fuente única del preview. Cada caso incluye:

- `misunderstanding`: la discrepancia central, expresada en una frase;
- `email`: remitente, destinatario, momento, asunto y cuerpo;
- `document.facts`: 4–8 hechos con ID estable y referencia temporal;
- `questions`: cuatro ejes (Evidence, Scope, Intent, Purpose), tres opciones y feedback específico por opción, con IDs de evidencia;
- `task`: consigna, extensión orientativa y cuatro criterios concretos;
- `model`: respuesta posible y cuatro decisiones anotadas con evidencia.

Las referencias a hechos permiten detectar una clave sin sustento. Un auditor humano sigue siendo necesario para juzgar realismo, intención implícita, naturalidad y afirmaciones inventadas; el script no pretende puntuar semánticamente el texto del estudiante.

## Puertas ejecutables

```bash
npm run check:writing-workplace-b2
npm run test:writing-workplace-b2
npx tsc --noEmit
npm run check:practica-catalog
npm run build
```

El checker valida cantidad de casos, identidad, variedad de áreas, documentos, cuatro ejes de preguntas, opciones, claves, referencias y anotaciones del modelo. Las pruebas mutan evidencia y claves para comprobar que el propio guardián detecta defectos. Antes de integrar se recorre en navegador el camino completo, una opción errónea, un borrador revisado y el ancho móvil.

El preview no se añade a `prebuild`: el guardián histórico y su baseline de 480 prácticas siguen midiendo A1–B1. Al aprobar B2 se define una puerta de publicación nueva para 20 casos, con revisión editorial de todo el conjunto.

## Escalado tras revisión

1. Aprobar o corregir estos tres casos y el recorrido.
2. Revisar y congelar [`writing-workplace-b2-case-map.md`](writing-workplace-b2-case-map.md), la parrilla de 20 casos B2 inglés: áreas variadas, malentendidos distintos y productos escritos diversos sin perder el correo como entrada.
3. Producir y auditar los 17 restantes; entonces habilitar el hub y el gate de 20.
4. Adaptar el contrato a C1 y C2 con fuentes y decisiones más complejas, sin alargar artificialmente cada caso.
5. Adaptar a otros idiomas con autores y auditores de cada lengua; no traducir literalmente correos, cortesía ni situaciones laborales.

La aprobación del usuario es la frontera entre el preview y la producción de C1, C2 y otros idiomas.
