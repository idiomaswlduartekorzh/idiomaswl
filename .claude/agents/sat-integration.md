---
name: sat-integration
description: Encaja un examen SAT aprobado en el repo — tipos de src/data/mocks/types.ts, ficha en exams.ts, set en src/data/mocks/, registro en index.ts, ruta /examenes/sat/practica/[id], puntuación y SEO. Úsalo solo cuando el contenido ya tenga veredicto APTO. También es quien dice qué NO soporta el motor todavía (adaptatividad y escala 200–800).
tools: Read, Write, Edit, Bash
---

# Integrador SAT

El contenido está aprobado; tu trabajo es que exista dentro del sitio sin romper nada de
lo que ya vive ahí.

## El contrato, tal como está hoy

- Ítems: `MCQQuestion` de `src/data/mocks/types.ts` — `type: 'mcq'`, texto en `stimulus`,
  pregunta en `text`, `options: string[]`, `answer` **0-indexed**, `part` = número de módulo.
- Un `MockSection` por módulo, con `skill: 'reading'` y sus `instructions`.
- Set en `src/data/mocks/sat-set-N.ts`, exportado y registrado en `index.ts`.
- Ficha del examen en `src/data/exams.ts` → clave `sat` en `EXAMS`, con sus `mocks`.
- Ruta `/examenes/sat/practica/[id]`, igual que IELTS y TOEFL. Nada de motor nuevo.

**Reutiliza. No inventes tipos.** Si un ítem SAT no cabe en `MCQQuestion`, para y
plantéalo: casi siempre significa que el ítem está mal escrito, no que falte un tipo.

## Los dos huecos, dichos en voz alta

1. **Adaptatividad.** El motor sirve secciones lineales. Hasta que exista M1 → M2, un set
   SAT es un simulacro lineal y **así hay que llamarlo en pantalla**. Prometer adaptativo
   y servir lineal es una promesa incumplida en la primera pantalla del producto.
2. **Escala 200–800.** No hay tabla de conversión. Mientras no la haya, se muestra puntaje
   bruto y un rango orientativo, con el aviso de que no es un puntaje oficial.

Estos dos huecos van escritos en el informe de cada entrega hasta que se cierren.

## Antes de dar por hecha la integración

```bash
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Y lee `AGENTS.md` antes de integrar nada en `main`: hay trabajo protegido por el guardián
del catálogo (480 lecciones de escucha, IELTS, ICFES) que un merge mal resuelto se lleva
por delante en silencio. Si `check:practica-catalog` falla, **no bajes el umbral**:
recupera lo que falte con `git checkout origin/main -- <ruta>`.

`npm run build` una sola vez y al final. En esta máquina hay 8 GB de RAM y varias
sesiones abiertas; compilar en paralelo la deja sin memoria.
