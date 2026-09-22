# Códigos de acceso a resultados

## Flujo publicado por el código

- ICFES, IELTS, TOEFL y Goethe capturan nombre, correo y WhatsApp antes de mostrar el resultado.
- Sin código, el estudiante ve únicamente el marcador básico y las ofertas vigentes de COP 12.900, COP 49.900 y COP 99.900.
- Con un código válido, el intento recibe un acceso institucional y muestra el informe completo sin interfaz de pago.
- Los códigos se generan en `/dashboard/admin/codigos-examen`, protegida por la misma allowlist y sesión verificada del panel administrativo.

## Tipos

- `single_use`: una redención atómica crea el acceso del intento y elimina el código.
- `classroom_5h`: el primer uso fija `activated_at`; `expires_at` queda exactamente cinco horas después. Durante esa ventana puede usarse en distintos intentos del mismo examen. Al vencer deja de ser válido y una tarea de base de datos lo elimina en un máximo de 15 minutos.

## Seguridad

- Supabase guarda únicamente SHA-256 del código normalizado y una pista de cuatro caracteres; el texto completo se entrega una sola vez al administrador.
- Las tablas tienen RLS y no conceden permisos a `anon` ni `authenticated`.
- Solo el servidor con `service_role` ejecuta generación, listado, revocación y redención.
- La ruta pública de redención tiene límite durable por IP/agente y no permite elegir un examen fuera de ICFES, IELTS, TOEFL o Goethe.
- Cada acceso queda ligado a `exam_slug + attempt_ref`, evitando consumir dos códigos para el mismo intento.

## Activación

Aplicar, en orden, las migraciones:

1. `20260921160000_icfes_single_report_offer.sql`
2. `20260922004219_exam_access_codes.sql`

Después del despliegue, entrar al panel administrativo, generar un código de prueba de cada tipo y verificarlo con un intento real. El código de un uso debe desaparecer de la lista tras redimirlo; el grupal debe mostrar su hora de vencimiento y el contador de usos.
