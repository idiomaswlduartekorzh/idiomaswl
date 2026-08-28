# Auditoría del MVP de residencias médicas

Fecha de corte: 2026-08-28

Rama: `codex/investigacion-qbanks-medicina-colombia`

Estado: fases MR-MVP-1 a MR-MVP-3 completadas; MR-MVP-4 bloqueada.

## 1. Alcance auditado

El corte permite completar este recorrido sin cuenta ni escritura externa:

1. abrir el navegador de universidades;
2. distinguir datos publicados, calculados y no publicados;
3. abrir la ficha de Universidad de Caldas;
4. llegar a la fuente institucional;
5. generar un plan mediante parámetros GET;
6. reproducir el mismo resultado desde la URL;
7. recibir un error accesible si se manipulan los parámetros.

No se audita ni se declara listo:

- contenido clínico;
- persistencia de usuarios, sesiones o intentos;
- autorización por roles;
- pagos;
- predictor de admisión;
- despliegue o comportamiento en producción.

## 2. Trazabilidad de afirmaciones

La UI no mantiene una segunda copia de datos universitarios. Consume directamente:

- `official-sources.ts` para institución, documento, URL y limitaciones;
- `university-blueprints.ts` para cada afirmación y su estado de evidencia;
- `mvp-plan.ts` para el cálculo determinista de Caldas;
- `mvp-audit.ts` para el estado append-only de cada fase.

Los campos ausentes siguen el contrato `value: null` + `status: not-published`. El guardián falla si un simulacro completo carece de cantidad, duración o composición oficial.

## 3. Auditoría mecánica

| Puerta | Resultado | Evidencia |
| --- | --- | --- |
| Contrato de blueprints | Aprobada | 9 perfiles, 10 fuentes, 2 simulacros completos habilitables |
| Pruebas unitarias | Aprobada | 7 pruebas: evidencia, Atlántico, Libre, plan válido, entrada inválida y log MVP |
| TypeScript | Aprobada | `npx tsc --noEmit` |
| ESLint focalizado | Aprobada | rutas, datos, guardián y pruebas del subsistema |
| Catálogo protegido | Pendiente de cierre final | se ejecuta otra vez antes del commit |
| Build completo | Diferido | el corte sigue en `noindex`; se evita gastar recursos del equipo hasta preparar una integración o preview |

## 4. Auditoría de navegador

Playwright, Chromium y servidor local Next 16.2.6 con Webpack:

| Caso | Resultado observado |
| --- | --- |
| Hub de nueve perfiles | Los nueve perfiles aparecen con estado, ciclo y conteo de evidencia |
| Universidad del Atlántico | Se presenta como “Solo monitoreo” y no ofrece producto |
| Ficha Caldas | Muestra 60 preguntas, 120 minutos, 40+20, Rasch, 60/30/10 y dos vacíos explícitos |
| Enlace institucional | Apunta al PDF oficial de la convocatoria 2027 |
| Plan válido | Medicina Interna, 12 semanas y 6 h/semana produce 72 h, distribuidas 4+2 |
| Reproducibilidad | La URL conserva `especialidad=medicina-interna&semanas=12&horas=6` |
| Parámetros manipulados | `neurocirugia`, `999` y `-3` no generan plan y muestran un `role=alert` |
| Móvil 390 px | Hub, evidencia y plan conservan lectura en una columna sin corte visual observado |
| Semántica | Un `main`, un `h1`, regiones etiquetadas, formulario asociado y enlace de salto existente |

Las capturas se generaron bajo `output/playwright/medical-residency-mvp/`, se inspeccionaron y se eliminaron al cerrar la auditoría. No son fuentes de producto y el directorio permanece ignorado para evitar ensuciar futuras ramas.

### Hallazgos de entorno

- Turbopack no acepta el enlace simbólico de `node_modules` del worktree temporal; la auditoría local usó el script `dev:audit` con Webpack.
- La consola de desarrollo reportó reconexiones fallidas de WebSocket HMR y un aviso de precarga de fuente. No hubo error de render, datos o interacción del MVP.

## 5. Privacidad y seguridad del corte

- El generador usa una petición GET y no persiste información.
- Las entradas aceptan únicamente especialidades, semanas y horas incluidas en listas cerradas.
- No se envían preguntas, claves, historiales ni datos clínicos.
- No se añadieron dependencias ni secretos.
- Las rutas mantienen `robots: noindex, nofollow` durante el MVP.

## 6. Condiciones para abrir MR-MVP-4

La primera producción de preguntas continúa bloqueada hasta registrar:

1. médico autor responsable;
2. médico revisor independiente;
3. política y presupuesto por ítem;
4. persistencia append-only de revisiones y transiciones;
5. canal de suspensión clínica;
6. prototipo de pregunta, explicación y reporte aprobado en móvil.

Ningún lote clínico se genera, importa o publica antes de cumplir esas seis condiciones.
