# Revisión de avisos PHP y Next.js — 26 de octubre de 2026

## Alcance y evidencia

- Fuente canónica: `idiomaswlduartekorzh/idiomaswl`, `main` en `8819ccfad2d9dde9084fd941cb8bfc6e1e14648e`. Vercel señaló ese mismo SHA en el despliegue de producción `dpl_4ud6qoTXrhuS8qj8GHqUhCkysGaN` antes del parche.
- La aplicación usa Next.js en Vercel y Supabase. El repositorio no contiene archivos PHP ni `composer.json`/`composer.lock`; no se identificó un runtime PHP en este despliegue. Los [avisos de PHP del 21 y 23 de octubre](https://www.php.net/) afectan instalaciones que ejecutan PHP y, por tanto, no requieren un parche PHP en este repositorio. Esta conclusión no cubre otros servidores que no pertenezcan a este proyecto.
- `main` fijaba `next@16.3.5`. Esa versión está dentro de los rangos afectados por los [avisos de Next.js del 14 de octubre](https://nextjs.org/blog/nextjs-security-update-october-14-2026), que incluyen ejecución remota en Cache Components y optimización SVG, y denegación de servicio por Server Actions. También precede a los [parches del 30 de septiembre](https://nextjs.org/blog/september-2026-security-release) y al [parche de `next/og`](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j). El sitio usa App Router y Server Actions, optimiza imágenes remotas y genera imágenes con `next/og`; no se puede descartar la exposición por mera ausencia de una prueba de explotación.

## Corrección preparada

- `next` y su lockfile pasan a **16.4.3**, posterior a la versión corregida 16.4.1 indicada por los avisos. El lockfile resuelve `sharp@0.35.5` para la ruta de optimización de imágenes.
- `npm audit fix --package-lock-only` actualizó dependencias transitivas vulnerables: `dompurify` 3.4.15 → 3.4.17, `source-map-js` 1.2.1 → 1.2.2 y `zod` 4.4.3 → 4.6.7. No se modificó la lógica de cobros ni de inscripción.
- `npm audit` y `npm audit --omit=dev`: **0 vulnerabilidades** en la base de avisos consultada. Esto no equivale a una prueba de que no existan fallos desconocidos.
- `npm ci`, TypeScript, `npm run check:practica-catalog`, `npm run build` (3.663 páginas estáticas), 10 pruebas Wompi y 4 de registro: aprobados.
- La revisión de Supabase Security Advisors mostró 44 tablas con RLS activado y sin políticas (regla de denegación por defecto para el cliente; las rutas administrativas usan el servidor), y una advertencia operativa: **protección de contraseñas filtradas desactivada** en Supabase Auth. Activarla en la configuración del proyecto sigue pendiente; este parche de dependencias no cambia la configuración de Auth.

## Límite de la comprobación

Una actualización y una auditoría de dependencias reducen los riesgos descritos, pero no garantizan inmunidad frente a ataques. Falta verificar el SHA del nuevo despliegue en Vercel, sus rutas esenciales y la configuración de Auth tras publicarlo. No se ejecutó una prueba de penetración ni se inspeccionaron servidores ajenos a `idiomaswl`.
