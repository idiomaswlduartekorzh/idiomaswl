# App móvil de Idiomas WeLearn

Estado: **MVP IMPLEMENTADO · PENDIENTE QA EN DISPOSITIVOS**. Rama
`codex/mobile-app-mvp-20261031`, actualizada sobre `origin/main`.
Borrador de integración: [PR #52](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/52).

## Alcance del MVP

- Proyecto Expo SDK 57 / React Native en `apps/mobile`, compartido por iOS y Android.
- Login y logout con el mismo proyecto Supabase de idiomaswl.com.
- Inicio nativo con perfil, pasos completados, días de actividad, tareas y resultados.
- Práctica nativa A1 en 8 idiomas con 40 preguntas originales, corrección inmediata,
  explicación y resultado final.
- Hasta 30 resultados de práctica guardados localmente por usuario; registro de día activo
  en `daily_activity` cuando la red está disponible.
- Entrega de tareas por el RPC existente `submit_student_assignment` y lectura de feedback.
- Catálogo completo que abre las rutas web de 8 idiomas, IELTS, TOEFL e ICFES.
- Clave publishable en `.env` local ignorado por Git; nunca usa la clave de servicio.

No hay migraciones ni cambios de producto en el sitio web. La app usa el JWT del
estudiante y las políticas RLS existentes. Los intentos A1 se guardan solo en el
dispositivo y no se presentan como avance del curso. Los enlaces web pueden requerir
otra sesión. Registro, recuperación de contraseña, notificaciones y distribución en
tiendas quedan para fases posteriores.

## Validación

- `pnpm typecheck` en `apps/mobile`: aprobado.
- `pnpm check:practice-bank`: 8 idiomas y 40 preguntas válidas.
- `pnpm exec expo config --type public --json`: iOS y Android configurados.
- `pnpm exec expo export --platform all`: bundles iOS y Android generados.
- Consultas de solo lectura a la base de producción: columnas requeridas presentes;
  RLS activo en las cinco tablas consultadas.
- Pendiente: prueba de login, entrega y práctica con una cuenta estudiante en dispositivos
  reales, revisión visual iOS/Android y builds de distribución.

La carpeta `apps/mobile/dist` y el `.env` local están ignorados por Git.
