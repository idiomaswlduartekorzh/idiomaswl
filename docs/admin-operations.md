# Centro operativo de administración

Estado: **implementado y pendiente de cierre de despliegue**.

## Fuente de verdad

- Ruta: `/dashboard/admin`.
- Acceso: sesión confirmada y correo presente en `ALL_ADMIN_EMAILS`.
- José y Zhanna reciben la misma interfaz, las mismas acciones y los mismos datos.
- La identidad visible (nombre e iniciales) puede variar; las capacidades no.

## Datos mostrados

- **Exámenes:** `exam_submissions` con `submission_status = 'submitted'`.
- **Leads:** capturas reales de `leads` para simulacros, complementadas en la vista con entregas históricas identificadas que anteceden la captura unificada.
- **Estudiantes:** perfiles con `role = 'user'`, junto con progreso, actividad y simulacros relacionados.
- **Revisiones:** colas independientes de IELTS, TOEFL y Goethe para que el tráfico general no oculte entregas pendientes.

No se permiten grupos, clases, tareas ni nombres de alumnos escritos como demostración dentro del panel. El panel anterior de Zhanna fue retirado precisamente porque contenía esa información ficticia.

## Señales para tomar decisiones

El resumen inicial prioriza:

1. correcciones académicas todavía abiertas;
2. leads nuevos con WhatsApp capturados durante los últimos siete días;
3. estudiantes sin actividad reciente o que aún no empiezan;
4. conteos exactos de simulacros totales, semana actual y semana anterior;
5. personas identificadas que han presentado exámenes y estudiantes registrados.

Los conteos generales se consultan directamente en Supabase. Las listas operativas se mantienen acotadas para no enviar datos innecesarios al navegador.

## Verificación obligatoria

```bash
npm run test:admin-access
npm run test:exam-leads
npm run check:admin-exam-copy
npm run check:practica-catalog
npx tsc --noEmit
npm run build
```

Antes de marcar este documento como desplegado deben registrarse el SHA de `main`, el deployment de Vercel en estado `READY` y el smoke de `/dashboard/admin` sin sesión (`307` hacia `/login`).
