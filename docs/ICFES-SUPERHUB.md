# Superhub de Inglés ICFES Saber 11

Última revisión editorial y técnica: 3 de agosto de 2026.

## Alcance construido

El clúster separa tres intenciones:

- `/practica/icfes-saber-11`: aprender, diagnosticar y practicar.
- `/practica/icfes-saber-11/examenes`: usar cuadernillos divulgados en modo examen o guiado.
- `/preparacion-icfes`: contratar preparación del componente de inglés.

El superhub enlaza siete páginas de parte, diagnóstico, vocabulario, plan de 30/60/90 días (más una opción urgente), pregunta diaria, repaso de errores, progreso y cuadernillos. Las páginas educativas indexables renderizan explicación sustancial en servidor; solo los motores interactivos son Client Components.

## Verdad editorial

Fuente principal: [Guía de orientación Saber 11 2026-2 del ICFES](https://www.icfes.gov.co/wp-content/uploads/2026/03/17-marzo-guia-de-orientacion-saber-11-2026-2.pdf).

- Cuadernillo estándar: 55 preguntas de inglés en la segunda sesión.
- Siete partes con pesos aproximados 11%, 11%, 11%, 18%, 16%, 11% y 22%.
- La prueba evalúa lectura y uso de la lengua; no incluye listening, speaking ni writing.
- Niveles reportados: Pre A1, A1, A2 y B1. B2 no es un resultado de Saber 11.

Los cuadernillos históricos del banco conservan el número de preguntas de la muestra publicada. No se presentan como reproducciones de las 55 preguntas de una aplicación actual.

## Banco y estados editoriales

- `src/data/icfes/questions.ts`: preguntas propias tipo ICFES, con habilidad, subhabilidad, fuente, estado, fecha de revisión, evidencia, explicación y distractores.
- `src/data/icfes/guided-workbooks.ts`: adaptación pedagógica del cuadernillo 2023. Sus 25 preguntas tienen explicación editorial completa.
- `src/data/mocks/icfes-simulacros.ts`: preguntas de cuadernillos divulgados y rangos explícitos por parte; nunca se infiere la parte solo por posición.

El cuadernillo `icfes-2023-g11` tiene modo guiado completo. Los demás conservan modo examen, clave y corrección final, y muestran honestamente que su explicación guiada aún no está publicada.

Para ampliar un cuadernillo guiado:

1. Confirmar fuente y clave del material divulgado.
2. Añadir o verificar `partRanges` explícitos.
3. Crear para cada pregunta evidencia, explicación, estrategia, microlección y una justificación específica por opción.
4. Marcar `reviewedAt` y `editorialStatus` solo después de revisión humana.
5. Incorporar el id a `GUIDED_WORKBOOK_IDS` únicamente cuando todas las preguntas estén completas.
6. Añadir la URL canónica al sitemap y verificarla en navegador.

## Progreso y persistencia

El visitante anónimo guarda hasta 200 intentos por alcance en `localStorage`. La primera práctica nunca depende de registro ni de red.

La migración `20260803_icfes_practice_engine.sql` agrega, sin modificar tablas existentes:

- `icfes_practice_sessions`
- `icfes_practice_attempts`
- `icfes_skill_mastery`
- `icfes_error_queue`

Todas tienen RLS por `auth.uid()`. La función `record_icfes_practice_attempt` registra cada intento de forma idempotente y actualiza dominio y cola de errores dentro de una operación. Los ids de cliente permiten reenviar progreso local al iniciar sesión sin duplicarlo. El plan autenticado reutiliza `icfes_learning_path`.

Endpoints:

- `POST /api/icfes/practice-progress`: sincroniza intentos, sesiones o resuelve un error.
- `GET /api/icfes/practice-progress`: devuelve dominio, errores e historial del usuario actual.
- `POST /api/icfes/study-plan`: guarda el plan en la tabla fundacional existente.

Los errores de red y las respuestas 401 nunca interrumpen la práctica local.

## Medición

El motor envía eventos a la infraestructura `dataLayer` existente:

- `icfes_practice_start`
- `icfes_question_answered`
- `icfes_practice_complete`
- `icfes_guided_simulator_start`
- `icfes_guided_simulator_complete`
- `icfes_practice_restart`
- `icfes_error_review_complete`
- `icfes_study_plan_generated`

Los campos incluyen parte, alcance, pregunta, precisión y tiempo cuando corresponde.

## SEO y accesibilidad

Las rutas indexables tienen metadata única, canonical, Open Graph heredable, H1 único, breadcrumbs visibles, contenido inicial en servidor, enlaces internos y datos estructurados `LearningResource`, `Quiz` o `BreadcrumbList` según corresponda. Las vistas personales `/progreso` y `/repaso-errores` son `noindex,follow`.

El sistema visual usa colores de parte dentro del azul WeLearn, estados de foco, `aria-live`, radiogroups, feedback enfocable y `prefers-reduced-motion`. Las lecturas largas tienen panel desplazable y el layout colapsa en móvil.

## Validación local

```bash
npx tsc --noEmit
npm run lint -- <archivos modificados>
npm run test:icfes
npm run check:practica-catalog
npm run check:reading-content
npm run audit:writing-curriculum
./node_modules/.bin/next build --webpack
```

En este worktree aislado se usa `--webpack` porque `node_modules` es un enlace al runtime del repositorio principal y Turbopack rechaza enlaces externos al root. Esto no cambia la configuración del repositorio canónico.

La migración debe aplicarse y verificarse en un entorno Supabase controlado antes de producción. No desplegar desde un árbol sin commit: producción sale únicamente de `main`, según `docs/OPERACION-REPOSITORIO.md`.
