# Mapa de conocimiento de `main`

Snapshot trazable del repositorio canónico, levantado el **26 de agosto de 2026** desde
`origin/main@68ad57e414462b29b76d9504179f42338940f369`. Describe qué está versionado en `main`;
no afirma que un deployment anterior ya sirva cada commit.

```mermaid
flowchart TD
  M[origin/main<br/>fuente canónica] --> APP[Next.js 16<br/>src/app]
  M --> DATA[Contenido vivo<br/>src/data]
  M --> GUARDS[Guardianes<br/>scripts + baseline]
  M --> DOCS[Estado y método<br/>docs + AGENTS]

  APP --> HOME[Home · precios · dashboard]
  APP --> PRACTICA[Práctica por idioma y nivel]
  APP --> EXAMS[Hubs de exámenes]
  APP --> POD[Podcasts]

  PRACTICA --> LISTEN[Escucha<br/>24 series · 480 episodios]
  PRACTICA --> SPEAK[Habla]
  PRACTICA --> GRAM[Gramática<br/>piso protegido: 465 temas]
  PRACTICA --> PDF[PDF descargables<br/>5 destrezas × 8 idiomas]
  PRACTICA --> IDEAS[Ideas avanzadas]

  SPEAK --> SOLO[Habla solo]
  SPEAK --> PAIR[Habla acompañada<br/>10 conjuntos · 200 escenarios]
  PAIR --> ROLES[400 fichas privadas A/B]
  PAIR --> TOOLKITS[10 cajas de herramientas]

  EXAMS --> IELTS[IELTS]
  EXAMS --> TOEFL[TOEFL]
  EXAMS --> SAT[SAT]
  EXAMS --> ICFES[ICFES Saber 11]
  EXAMS --> TOPIK[TOPIK y otros hubs]

  DATA --> LISTEN
  DATA --> PAIR
  DATA --> GRAM
  DATA --> EXAMS

  GUARDS --> BASE[check:production-baseline]
  GUARDS --> CAT[check:practica-catalog]
  GUARDS --> HG[check:habla-acompanada]
  GUARDS --> HR[check:habla-release:*]
  GUARDS --> BUILD[npx tsc + npm run build]

  M --> GH[GitHub canonical]
  GH --> V[Vercel]
  V --> PROD[idiomaswl.com]
```

## Inventario operativo

| Área | Fuente viva | Guardia principal | Estado en este snapshot |
|---|---|---|---|
| Gramática y catálogo de práctica | `src/data/grammar/`, `src/data/practica/` | `check:practica-catalog` | Piso de 465 temas protegido |
| Escucha | `src/data/practica/series/`, `public/audio/` | `check:listening-series` + catálogo | 24 series, 480 mp3 |
| Habla acompañada | `src/data/practica/habla-acompanado/` | `check:habla-acompanada` + release por set | 10/24 conjuntos, 200/480 escenarios |
| PDF descargables | `src/lib/pdf/`, componentes de práctica | baseline + `check:pdf-fonts` | 5 destrezas en 8 idiomas |
| Ideas avanzadas | `src/data/practica/advanced-topics.ts` | `check:advanced-ideas` | Hub y lecciones dinámicas protegidas |
| IELTS | rutas y datos IELTS | guardianes `check:ielts-*` | Hub, Task 1/2 y revisión protegidos |
| TOEFL | rutas y datos TOEFL | guardianes `check:toefl-*` | Hub, audio, editorial y pagos protegidos |
| SAT | rutas y datos SAT | `check:sat*` + factory tests | Superhub y flujo adaptativo protegidos |
| ICFES | rutas y datos ICFES | baseline + auditorías ICFES | Juego adaptativo y banco inteligente protegidos |
| Navegación/SEO | `src/app`, sitemap y componentes compartidos | baseline, navegación, SEO | Rutas críticas y marcadores protegidos |

## Cómo leer este mapa

- **Versionado en `main`** significa que existe en el commit indicado.
- **Desplegado** solo se declara después de comprobar que Vercel construyó ese mismo SHA y que el
  smoke de producción pasó.
- Un archivo en `artifacts/`, `outputs/`, otro repositorio o una rama `archive/*` no forma parte de
  este mapa aunque conserve información útil.
- Antes de actualizar el mapa, ejecutar los guardianes; no cambiar cifras a mano para reflejar una
  intención futura.

Documentos relacionados:

- [`OPERACION-REPOSITORIO.md`](OPERACION-REPOSITORIO.md)
- [`PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md`](PLAN-COMUNICACION-RAMAS-Y-PRODUCCION.md)
- [`METODOLOGIA-HABLA-ACOMPANADA.md`](METODOLOGIA-HABLA-ACOMPANADA.md)
- [`escucha-estado.md`](escucha-estado.md)
- [`sat-estado.md`](sat-estado.md)
- [`pdf-descargables-estado.md`](pdf-descargables-estado.md)
