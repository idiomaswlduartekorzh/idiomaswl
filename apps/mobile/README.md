# WeLearn móvil · primera versión

App Expo/React Native para iOS y Android, dentro del repositorio canónico de IdiomasWL.
La app usa las mismas cuentas de Supabase que idiomaswl.com.

## Funciona ahora

- Inicio y cierre de sesión con correo y contraseña de WeLearn.
- Vista nativa del estudiante: pasos completados, días de actividad, tareas y resultados recientes.
- Catálogo de ocho idiomas y tres exámenes que abre las rutas de práctica ya publicadas.
- Perfil básico y acceso al perfil web.

Las consultas del estudiante usan la clave **publishable** y las políticas RLS existentes.
No usa `service_role`, tablas nuevas ni migraciones.

## Ejecutar

1. Instala Node.js y pnpm.
2. Desde `apps/mobile`, ejecuta `pnpm install`.
3. Copia `.env.example` a `.env` y pon la URL del proyecto Supabase y su clave **publishable**.
4. Ejecuta `pnpm start`. Abre con Expo Go o con un simulador iOS/Android.
5. Ejecuta `pnpm typecheck` antes de enviar cambios.

La app se creó con Expo SDK 57, compatible con Expo Go durante la transición a SDK 58.
Los identificadores `com.idiomaswl.welearn` de iOS y Android son provisionales hasta confirmar
la identidad final de publicación en las tiendas.

## Siguiente fase

Las actividades todavía se abren en el navegador y pueden pedir una segunda sesión allí.
Para la siguiente versión, llevar las actividades prioritarias a pantallas nativas o añadir
un puente de sesión seguro y revisado. También faltan registro y recuperación de contraseña
nativos, notificaciones, pruebas en dispositivos y builds para TestFlight/Google Play.
