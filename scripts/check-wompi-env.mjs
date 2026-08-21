import nextEnv from '@next/env';

import { parseWompiConfig } from '../src/lib/wompi/validation.ts';

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

try {
  const config = parseWompiConfig({
    publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
    privateKey: process.env.WOMPI_PRIVATE_KEY,
    integritySecret: process.env.WOMPI_INTEGRITY_SECRET,
    eventsSecret: process.env.WOMPI_EVENTS_SECRET,
  });

  const environmentLabel = config.environment === 'sandbox' ? 'Sandbox' : 'Produccion';
  console.log(`✓ Wompi ${environmentLabel}: las 4 credenciales son validas y compatibles.`);
  console.log(`  API: ${config.apiBaseUrl}`);
} catch (error) {
  const message = error instanceof Error ? error.message : 'Configuracion desconocida invalida.';
  console.error(`✗ ${message}`);
  process.exitCode = 1;
}
