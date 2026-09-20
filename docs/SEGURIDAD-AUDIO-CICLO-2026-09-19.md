# Cierre de exposición pública: audio del ciclo coreano

Estado: `EN_VALIDACION` en la rama `codex/private-cycle-audio-20260919`.
Base de trabajo: `origin/main` en `9cc951a8`.

## Alcance

El bucket `cycle-audio` contiene nueve audios de lección bajo `textos/` y una
grabación de estudiante. La comprobación solo contó metadatos; no abrió el
contenido de la grabación. La ruta de lecciones sigue siendo pública mediante
URLs firmadas de un minuto para IDs del catálogo. La grabación se entrega
solo después de verificar una cuenta administradora, también con URL firmada
de un minuto. Las futuras subidas usan un UUID y no incluyen el nombre del
estudiante en el nombre del objeto.

## Orden de publicación

1. Integrar el código en `main` y esperar a que Vercel sirva ese SHA.
2. Verificar que `/api/practica/lesson-audio/a1-1.mp3` redirige a un audio
   válido, que un ID no publicado devuelve 404 y que
   `/api/admin/cycle-audio/00000000-0000-4000-8000-000000000000` devuelve
   403 sin sesión.
3. Aplicar `20260920032155_private_cycle_audio.sql` al proyecto Supabase
   `ivqeokuxgxemhydvopdd`. Cierra el bucket y elimina lectura/subida pública
   directa; la ruta de envío existente usa el rol de servicio y sigue activa.
4. Comprobar que el enlace público directo anterior del audio de lección ya
   no funciona, mientras la nueva ruta sí. En el panel, un administrador debe
   poder reproducir y descargar la grabación; un usuario no administrador no.
5. Registrar el SHA de `main`, deployment de Vercel y resultados de humo.

No se requieren nuevas variables de entorno. El servidor ya usa
`SUPABASE_SERVICE_ROLE_KEY`.

## Reversión

Si falla la ruta de lección tras el cambio de base de datos, restaurar
temporalmente `public=true` y la política de lectura del bucket con una
migración correctiva. Eso reabre también la grabación, así que debe ser una
medida breve y registrada. Preferir corregir la ruta firmada y volver a cerrar
el bucket. No restablecer la política de subida pública ni el permiso de
inserción directa de `cycle_submissions`: el endpoint del servidor no los
necesita.
