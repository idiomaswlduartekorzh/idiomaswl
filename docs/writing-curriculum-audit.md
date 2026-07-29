# Auditoría del currículo de escritura integrada

Fecha de auditoría: 2026-07-29.

## Cobertura

- Idiomas: inglés, francés, portugués, italiano, alemán, ruso, japonés y coreano.
- Niveles: A1, A2 y B1.
- Catálogo: 20 prácticas por combinación idioma/nivel, 480 en total.
- Flujo de cada práctica: lectura contextual, apuntes desde Leer, preparación de vocabulario, escritura con bloqueo por extensión y términos, y comparación con un modelo.

## Criterio MCER

La progresión se revisa contra los descriptores de producción, interacción y mediación escrita del [CEFR Companion Volume del Council of Europe](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4):

- A1: información personal y necesidades inmediatas en frases breves y previsibles.
- A2: mensajes funcionales, experiencias, planes y detalles cotidianos conectados con recursos frecuentes.
- B1: textos conectados sobre temas familiares, opinión justificada, solicitudes y soluciones prácticas con registro apropiado.

Las lecturas son cortas y concretas; las consignas exigen recuperar información relevante sin elevar el registro por encima del nivel. Los modelos contienen el vocabulario obligatorio publicado para que el bloqueo nunca pida una forma ausente del ejemplo.

## Gramática

Cada actividad declara una referencia primaria del catálogo de gramática de su idioma y nivel. La referencia se usa como transferencia comunicativa, no como una equivalencia automática entre idiomas. Los componentes que no tienen una salida escrita directa en la secuencia de 20 actividades no muestran un enlace forzado.

Las páginas de gramática presentan las prácticas compatibles y enlazan a la actividad concreta mediante `?ejercicio=<id>`.

## Validaciones ejecutadas

- `npx tsc --noEmit`
- `npm run check:practica-catalog` (465 temas de gramática protegidos)
- `npm run check:reading-content`
- `npm run audit:writing-curriculum` (480 ejercicios, modelos distintos, vocabulario mínimo y 480 enlaces gramaticales existentes)
- `npm run build` (build de producción correcto)

La comprobación visual de la instancia ya existente confirma la interacción de apuntes desde Leer, el bloqueo de la etapa de escritura y el diseño responsive del flujo. La revisión final de producción debe repetirse sobre el despliegue del commit integrado en `main`.
