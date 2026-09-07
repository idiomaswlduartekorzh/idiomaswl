# Harness editorial de tiempos y estructuras

Este harness aplica el mismo contrato a italiano, inglés, francés, portugués, alemán, ruso, japonés y coreano sin borrar las diferencias gramaticales de cada idioma.

## Loop de trabajo

1. **Coordinator** inventaría las formas y asigna autor y revisores distintos.
2. **Author** escribe diez retos independientes para cada nivel y forma.
3. **Linguist** renderiza cada respuesta y revisa morfología, sintaxis, valencia, registro y variantes.
4. **Pedagogy** revisa progresión, carga cognitiva, diversidad y autonomía entre niveles.
5. **Adversary** intenta resolver por longitud, posición, repetición, pseudoformas o texto filtrado.
6. **Integrator** materializa el runtime y ejecuta contratos, TypeScript, lint y E2E.
7. **Warden** habilita `READY_FOR_HUMAN_REVIEW` solo con las revisiones independientes vigentes.

Una modificación posterior a una revisión obliga a repetir las puertas afectadas. El agente que escribió contenido no puede aprobarlo.

## Contratos automáticos

`npm run check:tense-quests` comprueba cobertura de seis niveles, IDs, morfología estructural, independencia exacta y aproximada entre niveles, diversidad de aperturas y conectores, posiciones de respuesta no predecibles, ausencia de respuestas filtradas, identificación escrita del error y un dossier final con diez respuestas y lemas reales.

El preview editorial usa `review=1`: desbloquea los seis niveles y completa las respuestas correctas para acelerar la revisión humana.

Cuando se seleccionan varias formas, el runtime usa un recorrido estable y equilibrado: entre 12 y 20 retos por nivel, cobertura de todas las formas elegidas y un máximo de dos retos consecutivos de la misma forma. Los encabezados y las instrucciones activas son neutrales para que el estudiante tenga que inferir la forma a partir del contexto. El nombre de la forma solo puede aparecer después de responder o dentro del modo editorial `review=1`.

Las reglas ejecutables viven en `policy.json`; los perfiles lingüísticos de esa política son requisitos adicionales y no plantillas para traducir literalmente.
