# Anexo HR-03 — auditoría de interconexión en el código

**Estado:** borrador técnico; no aprobado; no modifica producción

**Corte:** rama `codex/toefl-sectional-seo-harness-20260831` en `47c43174`

## Resumen

La arquitectura HR-03 es viable, pero la inspección del código encontró un enlace fragmentario inexistente, dos superficies de resultado sin retorno a ejercicios y una diferencia importante entre “ejercicio disponible” y la acción real de dos tareas Writing. Estos puntos deben incorporarse como criterios de aceptación antes de implementar.

## Hallazgos

### A1 — `#simulacros` no existe

- El hub TOEFL actual y los artefactos HR-01A/HR-02 v2 apuntan a `/examenes/toefl#simulacros`.
- `MockGrid.tsx` expone el listado con `id="practica"`.
- La navegación local del hub de exámenes también utiliza `#practica`.

**Impacto:** el enlace abre la página correcta, pero no desplaza al inventario de mocks.

**Decisión propuesta para HR-03:** usar `/examenes/toefl#practica`. No se renombra el anchor existente ni se introducen redirects innecesarios.

### A2 — el retorno desde resultados todavía no existe

Hay dos superficies de salida TOEFL que deben cubrirse:

1. resultado inmediato dentro de `Toefl2026PracticeClient.tsx`;
2. informe privado en `ToeflPaidReportClient.tsx`.

Ambas ofrecen reiniciar o volver a `/examenes/toefl`, pero ninguna enlaza a ejercicios específicos o al futuro catálogo.

**Criterio de aceptación:** ambas superficies incluyen `Reforzar por tipo de ejercicio` → `/practica/toefl/ejercicios`. No se promete un deep-link por error hasta que exista clasificación confiable.

### A3 — la página raíz actual no representa las tres puertas aprobadas

`/practica/toefl` enlaza directamente Reading, Listening, Writing y Speaking. La implementación de HR-02 v2 deberá sustituir esa jerarquía por Ejercicios, Práctica y Simulacros, conservando debajo una vista previa de las cuatro secciones.

### A4 — dos tareas Writing son puertas editoriales, no runners inmediatos

- `Build a Sentence` incorpora `BuildSentenceSet1Practice` en la propia página.
- `Write an Email` conduce desde su guía al banco de prompts.
- `Academic Discussion` conduce desde su guía al banco de prompts.

Las tres ofrecen práctica, pero no con el mismo número de clics.

**Criterio de copy:**

- Build a Sentence: `Practicar ahora`.
- Write an Email: `Abrir guía y banco de prompts`.
- Academic Discussion: `Abrir guía y banco de prompts`.

Esto conserva el estado “Disponible” aprobado sin sugerir que las tres tarjetas abren el mismo tipo de experiencia.

### A5 — 29 páginas indexables, 11 entradas explícitas en sitemap

El árbol TOEFL bajo `/practica/toefl` contiene 29 archivos `page.tsx`. Los 29 declaran canonical y no se encontró `noindex`. El sitemap enumera explícitamente 11 rutas de este árbol.

**Riesgo:** 18 páginas dependen únicamente de enlaces internos para descubrimiento. No es necesariamente un defecto para todas, pero impide tratar el sitemap actual como inventario completo de URLs indexables.

**Criterio de aceptación SEO:** antes de escalar, crear un registro de propiedad por URL con `INDEX + SITEMAP`, `INDEX + DISCOVERY` o `NOINDEX`. La nueva `/practica/toefl/ejercicios` debe entrar en sitemap y baseline en el mismo cambio que la crea.

### A6 — componente histórico sin referencias

`src/app/(site)/practica/toefl/TOEFLHubClient.tsx` no aparece importado por otro archivo. Contiene una experiencia anterior de pestañas y un ejercicio Reading embebido.

**Tratamiento:** `DELETE-CANDIDATE` para HR-08, nunca eliminación silenciosa durante HR-03/HR-05. Git conserva la recuperación, pero la limpieza requiere aprobación explícita.

### A7 — breadcrumbs requerirán una estrategia compartida

Los hubs y tareas actuales construyen breadcrumbs localmente. Insertar `Ejercicios` página por página eleva el riesgo de divergencia entre navegación visible y `BreadcrumbList`.

**Criterio de implementación:** definir una única función o constante de jerarquía TOEFL consumida por el markup visible y los datos estructurados, o demostrar con un guardián que ambos permanecen iguales.

## Matriz de aceptación añadida a HR-03

| Control | Debe ocurrir |
|---|---|
| Anchor de mocks | todos los nuevos CTAs usan `#practica` |
| Práctica futura | no existe href ni página stub |
| Writing | copy distingue runner inmediato de guía + banco |
| Resultado inmediato | retorna al catálogo |
| Informe privado | retorna al catálogo |
| Sitemap | catálogo incluido al crear la ruta |
| Baseline | nuevo hub protegido al crear la ruta |
| Breadcrumbs | paridad visible/JSON-LD comprobable |
| Limpieza | `TOEFLHubClient.tsx` queda intacto hasta HR-08 |

## Comandos de evidencia

```text
rg --files 'src/app/(site)/practica/toefl' | rg '/page\\.tsx$'
rg -n 'robots\\s*:|noindex|alternates\\s*:|canonical' 'src/app/(site)/practica/toefl' --glob '**/page.tsx'
rg -n 'practica/toefl|examenes/toefl' src/app/sitemap.ts config/production-baseline.json
rg -n 'id=.?simulacros|id=.?practica' 'src/app/(site)/examenes/[exam]'
rg -n 'TOEFLHubClient' src
```

Este anexo es preparación técnica dentro del gate pendiente. No constituye aprobación humana ni autorización de implementación.
