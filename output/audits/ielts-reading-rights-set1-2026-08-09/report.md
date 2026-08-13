# IELTS Academic Reading — F0.2a rights gate for `set-1`

Fecha de corte: 2026-08-09  
Unidad: F0.2a — contrato deny-by-default y expediente del mock `set-1`  
Estado: **PASS del control técnico; 3/3 activos reales siguen en cuarentena**

## Resultado

F0.2a fija identidad, evidencia revisada y una decisión ejecutable para las tres
secciones Reading de `set-1`. Ninguna puede entrar al pipeline editorial: las tres
conservan `rightsBasis: unknown-quarantined`, módulo solo inferido, autoría desconocida,
revisión factual incompleta y revisión humana pendiente.

`status: pass` describe el contrato y sus controles. No valida pasajes, preguntas,
respuestas, dificultad, calidad IELTS, accesibilidad, licencia ni autorización de
publicación. El mock continúa visible hasta que F0.4 implemente enforcement runtime.

## Qué cambió

- Contrato versionado en `src/lib/ielts/academic-reading-rights.ts`.
- Registro de evidencia y tres expedientes en
  `src/data/practica-exams/ielts-reading-rights-registry.ts`.
- Validador determinista y fail-closed en
  `scripts/check-ielts-reading-rights.mjs`.
- Ocho pruebas directas en `tests/ielts-reading-rights-contract.test.mjs`.
- Packet ciego sin pasajes, preguntas, opciones, claves ni PII del estudiante/contacto.
- Informe portable con gráfico, ledger por activo, fuentes y dictámenes del panel.

## Controles ejecutables

El gate exige simultáneamente:

1. schema, módulo Academic y política default válidos;
2. identidad de contenido fijada por hash;
3. módulo declarado con evidencia del tipo correcto;
4. autoría identificada;
5. procedencia verificada y con referencias;
6. base de derechos permitida y evidencia específica;
7. revisión factual completa o N/A justificado con fecha real;
8. aprobación humana independiente y atestación;
9. triage automático explícitamente incapaz de aprobar.

Las 18 transiciones sintéticas cubren casos positivos controlados y adversariales:
registro ausente, drift de hash, auto-revisión normalizada, licencia sin autorización,
evidencia incorrecta o vacía, estados desconocidos, whitespace, falsa aprobación
automática, basis/schema/módulo inválidos, fechas imposibles y entradas duplicadas.

## Evidencia de procedencia y límite legal

El catálogo oficial de Cambridge identifica *Cambridge IELTS 5 Student’s Book with
answers*, ISBN 978-0-521-67701-1. Dos páginas externas apoyan un cotejo dirigido de la
secuencia *Bakelite / What’s so funny? / The Birth of Scientific English*. Esas fuentes
permiten priorizar revisión, pero no demuestran licencia o autorización de WeLearn.

La búsqueda fue dirigida y no exhaustiva. “No localizada en las fuentes revisadas” no
significa ausencia universal y este informe no emite conclusión legal.

Fuentes externas revisadas:

- https://ielts.org/legal/ielts-copyright-and-trade-mark-statement
- https://www.cambridge.org/elt/order/catalogue/Exams.pdf
- https://www.babarenglish.com/post/cambridge-ielts-academic-5-reading-test-1-answers-with-explanation
- https://ieltsdeal.com/ielts-academic-reading-cambridge-5-test-2-reading-passage-3-the-birth-of-scientific-english-with-best-solutions-and-best-explanations/

## Panel independiente

- Derechos/procedencia: PASS del control conservador, no clearance.
- Full-stack/datos: PASS después de reproducir y cerrar dos rondas de bypasses runtime.
- IELTS/revisión ciega: PASS para identidad, scope y separación Academic inferido;
  no aplica a calidad de preguntas.
- Anti-sesgo/independencia: PASS; automatización, autor y revisor están separados.
- Walkthrough cognitivo, UI/UX y Playwright: `➖`; no hubo superficie learner-facing ni
  comportamiento de navegador nuevo.

## Guardianes

- `node --test tests/ielts-reading-rights-contract.test.mjs`: 8/8 PASS.
- `node scripts/check-ielts-reading-rights.mjs --check`: PASS dos veces consecutivas.
- 18/18 controles de transición: `true`.
- ESLint focalizado: PASS.
- `npx tsc --noEmit`: PASS.
- `npm run check:practica-catalog`: 465 temas protegidos, PASS.
- `npm run build`: 1.263/1.263 páginas, PASS.
- `npm run check:exam-practice-content`: conserva ocho fallos preexistentes de Writing
  Task 2 y cero de Reading; no se silenciaron ni se corrigieron en esta unidad.
- Informe HTML: validation/package/Chromium verification PASS en 1440 y 390 px.

## Artefactos y hashes SHA-256

| Artefacto | SHA-256 |
|---|---|
| `validation.json` | `3c01f5974b27f53c1e0d889b93f4f4a8fab28c2ad2b3ce0cf15aac9eeabc8fd1` |
| `blind-review.json` | `e9be08161425180c9fbcde04bf7497fa52ce9d0271836d7dd8a9c10115fabb1e` |
| `audit-verdicts.json` | `ad4e31a920288c019514f0a402a7368b58fb6537fe00aee22fc73015923ce802` |
| `artifact.json` | `cc2a72f951c7a301228e656d9fbaa9affb599011c7db67d8d110c646717cc6ba` |
| `report.html` | `ea8abd88c1d4f93db57dfc8f44182d545eeb6f942c4537127b355181d31868cb` |
| contrato TS | `cabd4adf35c75a14a3537bb07e5db4ef9ce8bc0c1a6f4a276d25518732923643` |
| registry TS | `d3de9bdd09c14c9360b35ff7548894f25ef0044c9fe40c1d459b4ac02bcf777b` |
| validator MJS | `cef1932ebb66faf5dd094806b2d395f2f0de9b75340aaeeccdd9fe98f541c7de` |
| test MJS | `11f6a8786a5bb413f22ab352c3446a3a7e3d062af4687b8b59cc067b468a1372` |

## Siguiente frontera

F0.2 padre permanece abierto. La siguiente unidad es F0.2b, adjudicación de bancos
formativos. No se inició en esta iteración. Derechos/licencias humanas y enforcement del
mock se mantienen como trabajo posterior explícito.
