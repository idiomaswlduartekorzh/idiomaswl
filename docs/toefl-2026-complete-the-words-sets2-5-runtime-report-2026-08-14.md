# TOEFL 2026 — Complete the Words Sets 2–5

Fecha: 14 de agosto de 2026  
Alcance: expansión no-audio W2  
Estado: automático cerrado; audio no aplicable y diferido

## Resultado

Los Sets 2–5 tienen ahora un solo texto académico Complete the Words con 10 objetivos
cada uno. Los objetos cumplen el contrato oficial-family auditado para T12 y usan clave
server-only independiente.

| Set | Tema | Palabras | Objetivos | Primera oración | Alternancia | Resultado runtime |
| --- | --- | ---: | ---: | --- | --- | --- |
| 2 | Penguins | 84 | 10 | intacta | 2, 4, …, 20 | 10/10 |
| 3 | The Human Brain | 79 | 10 | intacta | 2, 4, …, 20 | 10/10 unit |
| 4 | Ant Colonies | 76 | 10 | intacta | 2, 4, …, 20 | 10/10 unit |
| 5 | Sleep | 79 | 10 | intacta | 2, 4, …, 20 | 10/10 |

## Evidencia ejecutada

- `npm run check:toefl-ctw`: PASS.
- `npm run test:toefl-ctw`: PASS, 8/8.
- `npx tsc --noEmit`: PASS.
- ESLint dirigido sobre runner, API, datos, servidor, mocks, checker y tests: PASS.
- Playwright Chromium sobre Sets 2 y 5: PASS, 2/2. Cada caso comprobó diez campos,
  nombres accesibles, `objectId`, diez IDs presentados y resultado de servidor 10/10.

## Límites honestos

- No cierra Academic ni Build a Sentence de estos sets.
- No afirma que Sets 2–5 completos estén listos para producción.
- No modifica ni evalúa audio.
- La revisión factual aplica el acta ya firmada por José David Duarte Silva y su dispensa
  de segunda revisión; no se presenta como adjudicación jurídica o editorial independiente.
