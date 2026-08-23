# SAT — estado de publicación

Actualizado el **23 de agosto de 2026**.

## Publicado y protegido

- `/examenes/sat`: hub público con diez guías enlazadas.
- `set-1`: Módulo 1 de Reading and Writing, 27 preguntas y 32 minutos.
- Acta vigente: `docs/sat-auditorias/sat-set-1-m1.json`.
- Guardianes obligatorios: `npm run check:sat`, `npm run check:sat-superhub` y
  `npm run check:sat-adaptive`, todos en `prebuild`.

## Motor adaptativo

La maquinaria está implementada pero no activada en `sat-set-1.ts`. El constructor exige
M1, M2 estándar y M2 exigente juntos; sirve M1 y exactamente una rama. La interfaz cierra
M1 antes del enrutado, reinicia el cronómetro, oculta la identidad interna de la rama y
guarda esa rama en los rótulos visibles de resultados y leads.

El guardián prueba los 28 resultados posibles de M1 y rechaza ramas intercambiadas,
vacías, de distinta longitud, con distinto reparto por dominio o con ids repetidos.

## Contenido pendiente

- **M2 estándar:** sus cuatro bloques y su plan existen, pero la última forma de `q08` no
  tiene una nueva prueba a ciegas independiente ni acta. Sin manifiesto no puede entrar al
  registro ni bloquear la publicación del M1 ya aprobado.
- **M2 exigente:** solo existe el plan. No se debe activar el motor con una sola rama.
- Copia íntegra del trabajo editorial de Claude: `origin/feat/sat-modulo-2`.

## Condición para activar la sección completa

1. Repetir la prueba a ciegas del M2 estándar sobre la forma exacta actual.
2. Ejecutar clave, sesgo, equidad, lengua, dificultad y originalidad; firmar su acta.
3. Escribir y auditar el M2 exigente con las mismas puertas.
4. Pasar ambos módulos a `buildSatMock`, ejecutar build completo y recorrer en navegador
   las rutas estándar y exigente, el corte, el reintento, el guardado y la revisión.

No se baja ningún umbral ni se publica una rama sin acta para acelerar ese proceso.
