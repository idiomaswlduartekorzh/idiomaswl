import 'server-only';

import { parseWompiConfig, type WompiServerConfig } from './validation';

let cachedConfig: WompiServerConfig | undefined;

/**
 * Punto unico de acceso a las credenciales privadas de Wompi.
 * Importar este modulo solo desde Route Handlers, Server Actions o Server Components.
 */
export function getWompiServerConfig(): WompiServerConfig {
  cachedConfig ??= parseWompiConfig({
    publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY,
    privateKey: process.env.WOMPI_PRIVATE_KEY,
    integritySecret: process.env.WOMPI_INTEGRITY_SECRET,
    eventsSecret: process.env.WOMPI_EVENTS_SECRET,
  });

  return cachedConfig;
}
