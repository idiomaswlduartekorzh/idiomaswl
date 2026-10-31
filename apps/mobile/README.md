# WeLearn móvil · MVP

App Expo/React Native para iOS y Android, dentro del repositorio canónico de IdiomasWL.
La app usa las mismas cuentas de Supabase que idiomaswl.com.

## Funciona ahora

- Inicio y cierre de sesión con correo y contraseña de WeLearn.
- Vista nativa del estudiante: pasos completados, días de actividad, tareas y resultados recientes.
- Práctica rápida A1 nativa: cinco preguntas con respuesta explicada en cada uno de los ocho idiomas.
- Historial de hasta 30 resultados guardado en el dispositivo, separado por cuenta. Al terminar,
  registra el día de actividad en la cuenta si hay conexión.
- Entrega de tareas desde la app y lectura de comentarios del profesor mediante las operaciones existentes.
- Catálogo completo de ocho idiomas y tres exámenes que abre las rutas de práctica ya publicadas.
- Perfil básico y acceso al perfil web.

Las consultas del estudiante usan la clave **publishable** y las políticas RLS existentes.
No usa `service_role`, tablas nuevas ni migraciones.

## Ejecutar

1. Instala Node.js y pnpm.
2. Desde `apps/mobile`, ejecuta `pnpm install`.
3. Copia `.env.example` a `.env` y pon la URL del proyecto Supabase y su clave **publishable**.
4. Ejecuta `pnpm start`. Abre con Expo Go o con un simulador iOS/Android.
5. Ejecuta `pnpm typecheck` antes de enviar cambios.
6. Ejecuta `pnpm check:practice-bank` para validar las 40 preguntas y
   `pnpm exec expo export --platform all` para generar bundles iOS y Android.

La app se creó con Expo SDK 57, compatible con Expo Go durante la transición a SDK 58.
Los identificadores `com.idiomaswl.welearn` de iOS y Android son provisionales hasta confirmar
la identidad final de publicación en las tiendas.

## Límites del MVP

El historial A1 es local: no se sincroniza entre dispositivos ni sustituye los resultados
de cursos o exámenes del sitio. El catálogo completo, el registro, la recuperación de
contraseña y la gestión del perfil usan idiomaswl.com y pueden pedir otra sesión allí.
Faltan pruebas de extremo a extremo con una cuenta estudiante en teléfonos reales y
builds firmadas para TestFlight/Google Play.
