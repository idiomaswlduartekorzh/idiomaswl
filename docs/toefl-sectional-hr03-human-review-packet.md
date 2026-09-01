# HR-03 — paquete breve para decisión humana

**Estado:** pendiente de revisión humana

**Gate:** interconexión, breadcrumbs, CTAs y ownership SEO

**No incluido:** implementación, cambios de producción, aprobación académica de claims o limpieza de archivos

## Resultado que se propone aprobar

```text
/practica
  → /practica/toefl
      → Ejercicios
          → /practica/toefl/ejercicios
              → Reading / Listening / Writing / Speaking
                  → guía o práctica individual existente
                  → simulacros cuando no existe práctica individual
      → Práctica · Próximamente, sin enlace
      → Simulacros
          → /examenes/toefl#practica
              → set → resultado → volver a Ejercicios
```

## Decisiones concretas

### D1 — Jerarquía

**Recomendación:** aprobar.

El hub decide el modo —Ejercicios, Práctica o Simulacros— y el catálogo decide sección/tarea. Las cuatro secciones no compiten con las tres puertas principales.

### D2 — Tareas todavía sin runner individual

**Recomendación:** aprobar.

Listening y Speaking muestran sus seis nombres y el estado `Disponible en simulacros`. Los títulos no son enlaces; cada clúster tiene un CTA a `/examenes/toefl#practica`. No se crean páginas vacías.

### D3 — Writing con profundidad real

**Recomendación:** aprobar.

- Build a Sentence: `Practicar ahora`.
- Write an Email: `Abrir guía y banco de prompts`.
- Academic Discussion: `Abrir guía y banco de prompts`.

Las tres siguen disponibles, pero el copy no finge que abren la misma experiencia.

### D4 — Breadcrumb editorial

**Recomendación:** aprobar sin migrar URLs.

`Práctica / TOEFL / Ejercicios / Sección / Tarea` será la jerarquía visible y estructurada. Las rutas actuales se conservan; Ejercicios funciona como padre editorial.

### D5 — Retorno desde simulacros

**Recomendación:** aprobar.

El resultado inmediato y el informe privado añaden `Reforzar por tipo de ejercicio` hacia el catálogo. No se implementa un deep-link por error hasta tener clasificación confiable.

### D6 — Fuente técnica única para el catálogo

**Recomendación:** aprobar.

Un registro liviano contiene 12 IDs, sección, nombre, explicación, disponibilidad, destino y regla fuente. El hub no recorre los 20 mocks, no importa scoring privado y no carga bancos completos.

## Decisiones que no deben ocultarse dentro de HR-03

### D7 — URLs históricas

Requieren revisión SEO y académica separada:

- cinco páginas Reading bajo `tipos-de-preguntas/*`;
- el hub `tipos-de-preguntas`;
- `writing/integrated-writing`.

Mientras se decide, permanecen explícitas como habilidades compatibles/legacy y fuera del catálogo de 12 tipos. No hay redirect, noindex ni eliminación automática.

### D8 — registro oficial versionado ausente

`docs/toefl-ibt-2026-official-format.md` no está en el árbol actual, aunque 20 mocks y dos documentos lo citan. Existe una versión archivada en Git, pero no se restaura sin revalidación académica.

**Consecuencia:** HR-03 puede aprobar la arquitectura, pero HR-04 no debe aprobar claims de formato hasta resolver esta fuente normativa.

### D9 — guardián existente rojo

`check:exam-practice-content` tiene 12 fallos preexistentes y no corre en `prebuild`. No se bajan controles. La implementación deberá reparar o aislar con dueño esos fallos antes de convertir el check en requisito obligatorio.

## Evidencia disponible

- `docs/toefl-sectional-hr03-interconnection.md`
- `docs/toefl-sectional-hr03-code-audit-draft.md`
- `docs/toefl-sectional-hr03-seo-ownership-draft.md`
- `docs/toefl-sectional-hr03-test-contract-draft.md`
- `docs/toefl-sectional-hr03-catalog-data-contract-draft.md`
- `docs/toefl-sectional-hr03-evidence.json`

## Registro sugerido de la decisión

Una aprobación inequívoca puede expresarse así:

> Apruebo HR-03: D1–D6. D7 queda para revisión SEO/académica; D8 bloquea claims de HR-04 hasta revalidación; D9 se conserva como deuda visible sin bajar controles.

La aprobación del dueño de producto no sustituye revisiones independientes de SEO, UX o academia. Si una persona cubre varios roles, el review log debe conservar esa falta de independencia.
