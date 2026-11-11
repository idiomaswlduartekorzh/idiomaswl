# Writing laboral B2–C2 · agentes, subagentes y harness

## Estado de la entrega B2–C2

El propietario aprobó los tres casos iniciales con una corrección transversal: **todo el texto visible debe estar en el idioma estudiado**. Inglés, francés, alemán, italiano, portugués, ruso, japonés y coreano contienen **20 casos jugables por nivel B2, C1 y C2**: 480 casos en 24 bancos. No se alteraron los 480 ejercicios A1–B1.

Las 24 rutas se enlazan desde sus niveles B2–C2 y están incluidas en el sitemap. Se retiró el `noindex` de la fase de preview. La integración en `main` y el despliegue siguen el protocolo de `docs/OPERACION-REPOSITORIO.md`.

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

Los roles 2–5 pueden operar como subagentes del coordinador; los auditores no deben recibir la clave como verdad antes de resolver el caso. Tres subagentes leyeron los 480 casos individualmente: correo, hechos, cuatro preguntas y distractores, tarea y modelo. Los informes registran los 20 IDs por banco y distinguen autorrevisión de revisión independiente: [inglés, francés y alemán](writing-workplace-audit-en-fr-de.md), [italiano, portugués y ruso](writing-workplace-audit-it-pt-ru.md), [japonés y coreano](writing-workplace-audit-ja-ko.md). Se cruzaron además 157 casos cuya primera revisión era de su autor; los hallazgos se corrigieron y verificaron. Los prompts están en `.claude/agents/writing-workplace-*.md` y sirven como contratos legibles para otras herramientas de agentes.

## Contrato de un caso

Cada JSON `src/data/practica/writing-workplace-<idioma>-<nivel>.json` (inglés conserva el nombre corto `writing-workplace-<nivel>.json`) es la fuente única de su banco. Cada caso incluye:

- `misunderstanding`: la discrepancia central, expresada en una frase;
- `email`: remitente, destinatario, momento, asunto y cuerpo;
- `document.facts`: 4–8 hechos con ID estable y referencia temporal;
- `questions`: cuatro ejes internos (Evidence, Scope, Intent, Purpose), tres opciones y feedback específico por opción, con IDs de evidencia; la interfaz traduce los ejes;
- `task`: consigna, extensión orientativa y cuatro criterios concretos;
- `model`: respuesta posible y cuatro decisiones anotadas con evidencia.

El campo interno `area` conserva cinco grupos canónicos para el harness; `areaLabel` muestra el dominio en el idioma estudiado. Correo, hechos, preguntas, feedback, consigna, modelo, botones, navegación y metadatos deben estar en la lengua meta. Las referencias a hechos permiten detectar claves sin sustento estructural. Un auditor humano sigue siendo necesario para juzgar realismo, intención implícita, naturalidad y afirmaciones inventadas; el script no puntúa semánticamente el texto del estudiante.

En japonés y coreano, la guía y el contador usan caracteres sin espacios; el harness acepta correos de 100–600 caracteres y modelos de 250–900, además de comprobar el intervalo publicado en cada caso. En las otras lenguas usa palabras separadas por espacios.

## Puertas ejecutables

```bash
npm run check:writing-workplace-b2
npm run check:writing-workplace-english
node scripts/check-writing-workplace-locale.mjs frances
npm run check:writing-workplace-release  # exige los 480 casos y las 24 rutas
npm run test:writing-workplace-b2
npx tsc --noEmit
npm run check:practica-catalog
npm run build
```

El checker exige 20 casos por nivel, cuatro por cada una de cinco áreas, variedad de posiciones correctas, hechos, cuatro ejes, tres opciones, claves, referencias y anotaciones. Las pruebas mutan evidencia, claves y distribución para comprobar que el propio guardián detecta defectos. Antes de integrar se recorre en navegador el camino completo, una opción errónea, un borrador revisado y el ancho móvil.

`prebuild` ejecuta el guardián de los 480 casos, 24 rutas, enlaces desde el nivel, sitemap y metadatos e imágenes sociales en la lengua meta. El guardián histórico y su baseline de 480 prácticas siguen midiendo A1–B1, sin reducir umbrales. La vista previa remota de Vercel compiló el commit `82be95f0`, y las 24 rutas respondieron HTTP 200 con contenido y metadatos nativos. Ese build es anterior a las últimas correcciones editoriales y la apertura de los enlaces; un nuevo build del commit final es obligatorio. El build local con Webpack superó el límite predeterminado de 2 GB de Node; la repetición con 4 GB se detuvo por presión de disco. La ausencia de un build local completo se registra, sin confundirla con un fallo de compilación remota.

## Progresión y escalado

La progresión toma como referencia la sección de [interacción escrita y correspondencia del Companion Volume del Consejo de Europa](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4): B2 resuelve correspondencia profesional no rutinaria con hechos claros y registro adecuado; C1 pondera versiones e implicaciones con precisión; C2 controla atribución y tono en correspondencia profesional compleja. La carga no aumenta solo por extensión.

1. Los ocho idiomas tienen 60 casos cada uno, interfaz en la lengua meta y 20 casos por nivel. Se probaron recorridos en navegador de inglés B2–C2 y varios B2 de otras lenguas.
2. La lectura editorial de los 480 y el cruce independiente de 157 están registrados. Los controles del commit final siguen en curso.
3. Integrar mediante PR después de los controles; registrar SHA de `main`, deployment y smoke antes de llamar a un banco «desplegado».
