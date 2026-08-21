import assert from 'node:assert/strict';
import test from 'node:test';

import {
  WompiConfigurationError,
  parseWompiConfig,
  parseWompiPublicKey,
} from '../src/lib/wompi/validation.ts';

const sandboxCredentials = {
  publicKey: 'pub_test_idiomaswl',
  privateKey: 'prv_test_idiomaswl',
  integritySecret: 'test_integrity_idiomaswl',
  eventsSecret: 'test_events_idiomaswl',
};

test('acepta un juego completo de credenciales Sandbox', () => {
  const config = parseWompiConfig(sandboxCredentials);

  assert.equal(config.environment, 'sandbox');
  assert.equal(config.apiBaseUrl, 'https://sandbox.wompi.co/v1');
});

test('reconoce la llave publica de Produccion para el cliente', () => {
  const config = parseWompiPublicKey('pub_prod_idiomaswl');

  assert.equal(config.environment, 'production');
  assert.equal(config.apiBaseUrl, 'https://production.wompi.co/v1');
});

test('enumera las variables faltantes sin imprimir secretos', () => {
  assert.throws(
    () => parseWompiConfig({ publicKey: sandboxCredentials.publicKey }),
    (error) =>
      error instanceof WompiConfigurationError &&
      error.message.includes('WOMPI_PRIVATE_KEY') &&
      error.message.includes('WOMPI_INTEGRITY_SECRET') &&
      error.message.includes('WOMPI_EVENTS_SECRET'),
  );
});

test('rechaza credenciales mezcladas entre Sandbox y Produccion', () => {
  assert.throws(
    () =>
      parseWompiConfig({
        ...sandboxCredentials,
        privateKey: 'prv_prod_idiomaswl',
      }),
    /WOMPI_PRIVATE_KEY no corresponde al ambiente sandbox/,
  );
});
