import { defineConfig, devices } from '@playwright/test'

/**
 * Segunda auditoría del vocabulario, en navegador de verdad.
 *
 * La primera —`scripts/check-vocabulario.mjs`— ejecuta la lógica de los ejercicios en Node y
 * mide el conjunto: sesgo de posición, cobertura, callejones sin salida. Es rápida y ve cosas
 * que nadie vería jugando. Pero no ve la pantalla, y ahí ya se coló un fallo: la respuesta
 * correcta salía siempre en la segunda opción porque el barajado vivía dentro del JSX.
 *
 * Esta segunda pasada recorre la escalera de las cinco cajas haciendo clic como un estudiante,
 * y ataca: falla a propósito, copia el chunk de la ficha, escribe la palabra suelta. Lo que
 * comprueba no es que la página cargue, sino que **no haya manera de quedarse atascado**.
 *
 * No levanta servidor a propósito. Esta máquina tiene 8 GB y arrancar otro `next dev` desde el
 * test compite con el que ya está abierto. Arranca tú el servidor y luego:
 *
 *   npm run dev:safe                 # en otra terminal
 *   npm run test:e2e
 *   BASE_URL=http://localhost:3010 npm run test:e2e    # si usas otro puerto
 */
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 180_000,
  expect: { timeout: 10_000 },
  // Un navegador cada vez: con 8 GB, paralelizar es pedir que muera la máquina.
  fullyParallel: false,
  workers: 1,
  forbidOnly: !!process.env.CI,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3001',
    /**
     * Traza solo cuando algo falla.
     *
     * Estaba en `off` para no llenar el disco, y el precio se pagó el 11 de agosto: la suite
     * falló dos veces seguidas, cada vez en un test distinto y en un bloque distinto, y las dos
     * veces los mismos tests pasaron al relanzarlos solos. Sin traza no había nada que mirar,
     * así que las dos hipótesis —ambigüedad de datos, carrera de renderizado— se quedaron en
     * hipótesis. Una de ellas se descartó a mano; la otra no se pudo ni confirmar ni negar.
     *
     * Adivinar la causa de un fallo intermitente y «arreglarla» es la manera más rápida de
     * meter un cambio que no arregla nada y esconde el problema real. Con la traza, la próxima
     * vez hay qué mirar: `npx playwright show-trace test-results/<carpeta>/trace.zip`.
     *
     * `retain-on-failure` y no `on`: solo pesa cuando hay algo que investigar.
     */
    trace: 'retain-on-failure',
    video: 'off',
    screenshot: 'only-on-failure',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
})
