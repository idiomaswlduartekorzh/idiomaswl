# Goal: ecosistema de acceso por examen

Estado: `EN_IMPLEMENTACION`

Rama de trabajo: `codex/exam-access-ecosystem`

Base canónica: `origin/main` en `965b1784`

## Resultado esperado

Idiomas WeLearn debe permitir que cualquier visitante descubra públicamente los
exámenes, prácticas y materiales disponibles, pero debe exigir una cuenta antes de
iniciar una actividad privada, guardar un intento, consultar resultados o descargar
recursos protegidos.

La unidad comercial y de autorización es **un examen**, no la cuenta completa. Un
acceso a IELTS cubre el ecosistema IELTS disponible (práctica, mocks cronometrados,
explicaciones y guiado), pero no concede automáticamente TOEFL, Goethe, ICFES u
otro examen.

## Decisiones canónicas aprobadas

1. Los planes autónomos son `Gratis`, `$15.900`, `$49.900` y `$99.900` COP.
2. El antiguo pago único de `$12.900` queda retirado del flujo nuevo.
3. El primer examen de una cuenta autónoma puede usar el plan Gratis.
4. El plan Gratis permite realizar actividades del examen elegido y muestra el
   puntaje total, pero no el detalle pregunta por pregunta, descargas ni revisión
   humana.
5. Un examen adicional se agrega a la misma cuenta y al mismo dashboard, pero no
   puede usar Gratis. Debe contratar `$15.900`, `$49.900` o `$99.900` para ese
   examen.
6. Comprar un plan para un examen da acceso a todo el ecosistema disponible de ese
   examen. El plan limita capacidades, resultados, descargas y revisiones; no divide
   artificialmente el catálogo del examen.
7. Un estudiante WeLearn obtiene acceso completo al examen en el que está
   matriculado. No necesita comprar un plan autónomo para ese mismo examen.
8. Las páginas públicas de descubrimiento continúan indexables. Los intentos,
   resultados personales, answer keys, transcripciones y descargas protegidas no
   son indexables ni accesibles sin autorización del servidor.

## Matriz de capacidades

| Nivel | Iniciar | Guardar | Puntaje total | Pregunta por pregunta | Descargas | Feedback automático | Revisión humana | Plan de mejora |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Visitante | No | No | No | No | No | No | No | No |
| Gratis | Sí | Sí | Sí | No | No | No | No | No |
| $15.900 | Sí | Sí | Sí | Sí | Sí | Sí | No | No |
| $49.900 | Sí | Sí | Sí | Sí | Sí | Sí | 5 por periodo | No |
| $99.900 | Sí | Sí | Sí | Sí | Sí | Sí | Sí, cuota operativa | Sí |
| WeLearn completo | Sí | Sí | Sí | Sí | Sí | Sí | Según programa académico | Según programa académico |

La cantidad exacta de revisiones incluida en `$99.900` debe mantenerse configurable
y no se considera cerrada por este documento. El borrador anterior usaba diez, pero
el usuario solo confirmó revisiones humanas, retroalimentación y plan de mejora.

## Flujo de adquisición

```text
Visitante
  -> página pública del examen o práctica
  -> botón Iniciar
  -> inicio de sesión o registro
  -> elección: estudiante WeLearn / estudiante autónomo
     -> WeLearn: flujo académico existente y acceso completo al examen matriculado
     -> Autónomo: conserva el examen de origen y elige plan
        -> primer examen: Gratis / 15.900 / 49.900 / 99.900
        -> examen adicional: 15.900 / 49.900 / 99.900
  -> dashboard único
  -> autorización independiente para cada examen
```

El examen gratuito se consume de forma atómica cuando la persona inicia por primera
vez una actividad privada. Puede corregir una selección accidental antes de ese
momento, pero no rotar el examen gratuito después de comenzar.

## Modelo de autorización

La interfaz nunca es la autoridad. Cada operación privada debe resolver un acceso
para la pareja `(user_id, exam_slug)` en el servidor.

Fuentes válidas de acceso:

- reclamo gratuito único de una cuenta autónoma;
- membresía paga y vigente para el examen exacto;
- asignación WeLearn vigente para el examen exacto;
- acceso administrativo explícito y auditable, cuando aplique.

Orden de resolución recomendado:

1. WeLearn completo.
2. Plan pago vigente del examen.
3. Reclamo Gratis del examen.
4. Sin acceso.

No se utilizará `user_metadata` editable por el usuario como fuente de autorización.
La selección inicial sirve únicamente para el onboarding; el permiso efectivo se
registra y verifica en tablas privadas mediante código de servidor.

## Separación SEO y aplicación privada

### Público e indexable

- hubs y páginas informativas de cada examen;
- catálogo, beneficios, estructura y muestras;
- guías, artículos, explicaciones y preguntas frecuentes públicas;
- precios y comparación de planes;
- enlaces internos y datos estructurados pertinentes.

### Privado y no indexable

- inicio o reanudación de intentos;
- payloads privados de respuestas correctas;
- resultados personales y detalle por pregunta;
- dashboard y administración;
- answer keys, transcripciones y archivos descargables protegidos;
- checkout y gestión de suscripciones.

Las rutas públicas deben devolver HTML útil y `200`. El botón `Iniciar` aplica el
gate; no se convierte toda la página de descubrimiento en una redirección al login.
`robots.txt` no es un control de seguridad: el acceso se protege con autenticación,
autorización en servidor y enlaces de descarga temporales o rutas privadas.

## Hallazgos de la base actual

- El catálogo Xpress en `main` conserva el pago único `$12.900` y solo dos planes
  recurrentes.
- La rama histórica `codex/autodidacta-plans` contiene piezas reutilizables para los
  cuatro niveles, permisos de materiales y cuotas, pero define acceso al catálogo
  completo y no por examen.
- La restricción actual permite una sola suscripción abierta por usuario; debe pasar
  a una suscripción abierta por `(usuario, examen, entorno)`.
- El selector actual de membresía busca el último acceso global y puede conceder o
  bloquear el examen equivocado.
- El onboarding actual comienza por idioma y conserva supuestos comerciales
  anteriores.
- El flujo de clases con docente pierde el examen seleccionado al construir la compra
  académica; debe preservar esa asignación para conceder WeLearn completo.
- Los PDF de answer keys y transcripciones están visibles desde `public/` en el
  `main` actual. Deben quedar detrás de autorización sin revertir el trabajo reciente
  de catálogo y presentación.
- Algunas prácticas siguen usando captura de lead o acceso público inconsistente en
  vez del gate de cuenta unificado.

## Fases de implementación

### Fase 1 — Contrato y motor de permisos

- catálogo de cuatro planes sin `$12.900`;
- matriz de capacidades pura y comprobable;
- resolución de permisos por examen;
- pruebas de aislamiento entre exámenes y de segundo examen sin Gratis.

### Fase 2 — Persistencia y seguridad

- reclamo gratuito único y atómico;
- asignaciones WeLearn por examen;
- suscripciones simultáneas para exámenes diferentes;
- migración con RLS, privilegios mínimos y funciones exclusivas de servidor;
- pruebas de concurrencia, propiedad e intento de acceso cruzado.

### Fase 3 — Registro y adquisición

- gate al pulsar `Iniciar`;
- elección WeLearn / autónomo;
- examen de origen conservado durante registro, OAuth y correo;
- Gratis solo para el primer examen;
- checkout pago para exámenes adicionales.

### Fase 4 — Aplicación transversal

- prácticas, mocks y guiado;
- puntaje total frente a detalle por pregunta;
- dashboard multi-examen;
- descargas privadas, audios, transcripciones y answer keys;
- Writing y Speaking según capacidad y cuota.

### Fase 5 — UI, SEO y conversión

- pricing y mensajes consistentes;
- páginas públicas indexables y accesibles;
- estados de bloqueo y upgrade por contexto;
- analítica del embudo sin exponer información privada.

### Fase 6 — Verificación y publicación

- pruebas focalizadas y de seguridad;
- `npm run check:practica-catalog`;
- `npx tsc --noEmit`;
- build de producción;
- aplicación y verificación de migraciones;
- integración en `main` y smoke de producción por rutas y roles.

## Condiciones de aceptación

1. Una URL directa no permite iniciar, descargar ni ver resultados sin acceso.
2. Gratis para IELTS no concede TOEFL ni otro examen.
3. Una cuenta que ya reclamó Gratis no puede reclamar otro examen Gratis, incluso
   con solicitudes simultáneas.
4. La misma cuenta puede tener planes pagos diferentes para exámenes diferentes.
5. Un estudiante WeLearn asignado a IELTS recibe IELTS completo sin checkout
   autónomo y no recibe automáticamente otros exámenes.
6. Gratis recibe solo el puntaje total desde el servidor; el detalle no viaja oculto
   en el HTML o JSON del cliente.
7. Las descargas protegidas no existen bajo una URL pública estática.
8. Las páginas públicas siguen siendo rastreables y no se sirven contenidos
   diferentes a bots y personas.
9. Los cobros y renovaciones continúan siendo idempotentes por examen.
10. La publicación se realiza únicamente desde un commit validado de `main`.

