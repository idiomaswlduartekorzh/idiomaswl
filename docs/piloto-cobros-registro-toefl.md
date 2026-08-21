# Piloto de cobros: registro, planes y reporte TOEFL

Estado: lógica implementada en una rama aislada. Los dos interruptores quedan apagados por defecto y esta rama no debe desplegarse ni integrarse a `main` sin aprobación.

## Decisiones de producto

### Registro

La persona elige una de dos rutas antes de crear su cuenta:

1. **Autodidacta ilimitado:** acceso a la plataforma durante 30 días. Precio provisional: **COP 49.900**. Es un pago único con renovación manual, no una suscripción recurrente.
2. **Estudiante con profesor:** curso de inglés de cuatro semanas. Los paquetes conservan los precios entregados por el equipo:
   - 8 horas: COP 320.000
   - 16 horas: COP 580.000
   - 24 horas: COP 820.000
   - 32 horas: COP 1.040.000
   - 40 horas: COP 1.270.000
   - 80 horas: COP 2.540.000

Crear una cuenta nunca cobra. Después de confirmar el correo, la persona llega a `/dashboard/planes`, revisa su elección y, únicamente si el piloto está encendido, abre Wompi.

### TOEFL

- El simulacro permanece gratis.
- Reading y Listening muestran el puntaje bruto automatizado inmediatamente.
- Writing y Speaking quedan guardados; el informe detallado se ofrece por **COP 10.000** (aproximadamente USD 3).
- Writing recibe retroalimentación pedagógica dentro del informe.
- Speaking se presenta expresamente como revisión humana y conserva un SLA configurable (48 horas por defecto).
- El pago no se confirma por la pantalla de regreso: solo un evento firmado de Wompi cambia la orden a `APPROVED`.
- El piloto se limita a TOEFL propio de WeLearn. No se aplica a exámenes de terceros fuera de este flujo.

## Fuentes de verdad y seguridad

- El navegador solo envía `accountType` y `productId`.
- El servidor valida esa pareja contra `src/lib/registration/catalog.ts` y calcula el monto en centavos.
- La intención guardada en el perfil no concede acceso. `raw_user_meta_data` es editable y no participa en autorización.
- Las órdenes viven en `registration_orders`, con RLS habilitado y sin privilegios para `anon` ni `authenticated`.
- El webhook comprueba firma, ambiente, referencia, monto, moneda y transacción antes de activar acceso o marcar un curso como pendiente de horario.
- Una aprobación es monotónica: un evento posterior no puede degradarla.

## Interruptores

```dotenv
REGISTRATION_CHECKOUT_ENABLED=false
TOEFL_REPORT_PAYWALL_ENABLED=false
TOEFL_REPORT_PRICE_COP=10000
TOEFL_SPEAKING_REVIEW_SLA_HOURS=48
```

Para una prueba Sandbox se deben aplicar primero las migraciones en un entorno de prueba, usar las cuatro credenciales Wompi `test`, encender solo los interruptores de Preview/Sandbox y verificar el webhook. Las credenciales privadas nunca se copian a variables `NEXT_PUBLIC_*`.

## Secuencia de activación futura

1. Revisar y aprobar el precio provisional de Autodidacta.
2. Aplicar la migración en una rama de Supabase o entorno de prueba.
3. Encender ambos interruptores solo en Preview con llaves Wompi Sandbox.
4. Probar pago aprobado, rechazado, repetido y webhook retrasado.
5. Confirmar que el dashboard muestra acceso activo o “horario pendiente”.
6. Confirmar que el reporte TOEFL no abre antes del evento firmado y sí abre después.
7. Revisar textos legales, política de reembolso, tratamiento de datos y capacidad real de revisión humana.
8. Solo después de la aprobación comercial y operativa, preparar una integración separada a `main`.
