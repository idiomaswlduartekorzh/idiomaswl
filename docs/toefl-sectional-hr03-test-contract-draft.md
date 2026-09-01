# Anexo HR-03 — contrato de pruebas y guardianes

**Estado:** borrador técnico; requiere aprobación HR-03; no modifica código de producto

**Corte:** `9a9c50cf`

## 1. Resultado esperado

La interconexión no se considerará implementada porque “se ve bien”. Debe existir una compuerta reproducible que pruebe jerarquía, enlaces, estados, metadata y regresión del catálogo protegido.

## 2. Fuentes existentes que se deben extender, no duplicar

El repositorio ya tiene un sistema de curaduría IELTS/TOEFL:

- `docs/ielts-toefl-route-map.md` — mapa humano de rutas;
- `docs/ielts-toefl-content-inventory.json` — inventario y gaps;
- `docs/ielts-toefl-keyword-map.csv` — intención y ownership;
- `src/data/practica-exams/seo-catalog.ts` — catálogo de contenido y práctica;
- `scripts/check-exam-practice-content.mjs` — guardián que relaciona rutas, contenido y fuentes.

Después de aprobar HR-03, `/practica/toefl/ejercicios` debe incorporarse a este sistema. No se crea un segundo registro permanente para el nuevo hub.

## 3. Hallazgos de reconciliación

### G1 — el guardián existente está fuera de `prebuild`

`package.json` declara `check:exam-practice-content`, pero `prebuild` no lo ejecuta. Por tanto, un build puede quedar verde aunque este guardián esté rojo.

**Regla:** no se añade a `prebuild` hasta reparar sus fallos actuales; añadir un check rojo solo bloquearía el pipeline sin resolver la causa.

### G2 — baseline actual del guardián: rojo

Ejecutado el 1 de septiembre de 2026 reutilizando mediante symlink temporal los `node_modules` existentes del checkout canónico. No se instalaron ni copiaron dependencias. El symlink fue retirado después.

Resultado: **12 fallos existentes**.

- 5 en hubs IELTS.
- 2 en disclosures de bancos Writing TOEFL.
- 5 en la página Complete the Words TOEFL.

No se silenció ningún control ni se redujo ningún umbral. Este gate preexistente debe volver a verde antes de convertirlo en requisito de integración para la nueva arquitectura.

### G3 — deriva entre registros existentes

`/practica/toefl/reading/habilidades/seleccion-de-palabras-contexto` aparece en el route map y en `seo-catalog.ts`, pero no aparece en el clúster Reading del inventario JSON ni en el keyword map CSV.

**Regla:** resolver la clasificación durante la reconciliación SEO; no copiar esta omisión al nuevo catálogo.

## 4. Guardián propuesto para el hub seccional

Nombre de trabajo: `check:toefl-sectional-hub`.

Debe derivar expectativas de un registro compartido; no debe comprobar grandes bloques de copy literal. Controles mínimos:

| ID | Control | Severidad |
|---|---|---|
| T01 | existen `/practica/toefl` y `/practica/toefl/ejercicios` | crítica |
| T02 | el hub presenta exactamente Ejercicios, Práctica y Simulacros | crítica |
| T03 | Práctica se renderiza sin `href`, como `Próximamente` | crítica |
| T04 | Simulacros apunta a `/examenes/toefl#practica` | alta |
| T05 | el catálogo contiene 12 tipos en distribución 3/4/3/2 | crítica |
| T06 | los cuatro clústeres existen en HTML simultáneamente | alta |
| T07 | los chips de sección apuntan a anchors reales | alta |
| T08 | las seis tareas con práctica enlazan a destinos existentes | crítica |
| T09 | Listening/Speaking no enlazan a páginas individuales inexistentes | crítica |
| T10 | cada clúster Listening/Speaking ofrece un solo CTA a mocks | media |
| T11 | el catálogo tiene canonical autorreferente y entrada sitemap | crítica |
| T12 | el nuevo hub figura en route map, inventario y keyword map | alta |
| T13 | `BreadcrumbList` y breadcrumb visible comparten la misma jerarquía | alta |
| T14 | las dos superficies de resultado TOEFL retornan al catálogo | alta |
| T15 | el hub y catálogo no importan bancos completos ni precargan audio | alta |
| T16 | `TOEFLHubClient.tsx` no se elimina antes de HR-08 | media |

## 5. Pruebas de interacción

En preview, cubrir al menos estos recorridos:

1. `/practica` → TOEFL → Ejercicios → Reading → Complete the Words → catálogo.
2. Hub TOEFL → Simulacros → set 1 → resultado → Reforzar por tipo.
3. Catálogo → Listening → `Practicar Listening en simulacros` → anchor visible.
4. Catálogo → Write an Email → guía → banco de prompts → Writing/catálogo.
5. Teclado móvil: saltos por clúster, foco visible y ausencia de scroll horizontal.
6. Lectura asistida: headings secuenciales, estado “Próximamente” comunicado por texto y ningún control deshabilitado engañoso.

## 6. Orden de ejecución por gate

### Antes de implementar

- HR-03 aprobado.
- Decisiones académicas históricas registradas o explícitamente diferidas.
- Fallos existentes de `check:exam-practice-content` inventariados por dueño.

### Durante el piloto

1. guardián seccional rápido;
2. `npm run check:exam-practice-content` cuando su baseline esté reparado;
3. `npm run check:practica-catalog`;
4. `npm run check:production-baseline`;
5. `npx tsc --noEmit --pretty false`;
6. pruebas de interacción en preview;
7. `npm run build` antes de integrar.

### Prohibiciones

- no bajar umbrales para obtener verde;
- no retirar checks de `prebuild`;
- no añadir `check:exam-practice-content` a `prebuild` mientras esté rojo;
- no instalar otro `node_modules` en la USB;
- no considerar screenshots como sustituto de pruebas semánticas.

## 7. Evidencia del ciclo

```text
npm run check:exam-practice-content
→ 12 fallos existentes; exit 1

Dependencias:
→ symlink temporal hacia /Users/josedavidduartesilva/Developer/idiomaswl/node_modules
→ symlink eliminado al terminar
→ 0 bytes de dependencias duplicadas en la USB
```

Este contrato prepara el trabajo posterior al gate; no autoriza implementar ni reparar los 12 fallos fuera del alcance aprobado.
