# App móvil de Idiomas WeLearn

Estado: **EN_VALIDACION**. Rama `codex/mobile-app-mvp-20261031`, creada desde
`origin/main` en `e6c9a144840d1c67efd26731611f9cca6f9f3169`.
Borrador de integración: [PR #52](https://github.com/idiomaswlduartekorzh/idiomaswl/pull/52).

## Alcance de la primera versión

- Proyecto Expo SDK 57 / React Native en `apps/mobile`, compartido por iOS y Android.
- Login y logout con el mismo proyecto Supabase de idiomaswl.com.
- Inicio nativo con perfil, pasos completados, días de actividad, tareas y resultados.
- Catálogo de práctica que abre las rutas web existentes de 8 idiomas, IELTS, TOEFL e ICFES.
- Clave publishable en `.env` local ignorado por Git; nunca usa la clave de servicio.

No hay migraciones ni cambios en el sitio web. La app consulta cinco tablas existentes
con el JWT del estudiante y sus políticas RLS. Los enlaces de práctica y de perfil
pueden requerir iniciar sesión otra vez en el navegador. Registro, recuperación de
contraseña, actividades nativas, notificaciones y distribución en tiendas quedan para
las siguientes fases.

## Validación

- `pnpm typecheck` en `apps/mobile`: aprobado.
- `pnpm exec expo config --type public --json`: iOS y Android configurados.
- `pnpm exec expo export --platform all`: bundles iOS y Android generados.
- Consultas de solo lectura a la base de producción: columnas requeridas presentes;
  RLS activo en las cinco tablas consultadas.
- Pendiente: prueba de login con una cuenta estudiante en dispositivos reales,
  revisión visual iOS/Android, actualización desde el `main` vigente y builds de distribución.

La carpeta `apps/mobile/dist` y el `.env` local están ignorados por Git.
