import { parseWompiPublicKey, type WompiPublicConfig } from './validation';

/**
 * Configuracion segura para el Widget o Checkout Web de Wompi.
 * Esta funcion nunca expone llaves privadas ni secretos al navegador.
 */
export function getWompiPublicConfig(): WompiPublicConfig {
  return parseWompiPublicKey(process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY);
}
