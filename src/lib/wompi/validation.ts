export const WOMPI_API_BASE_URLS = {
  sandbox: 'https://sandbox.wompi.co/v1',
  production: 'https://production.wompi.co/v1',
} as const;

export type WompiEnvironment = keyof typeof WOMPI_API_BASE_URLS;

export type WompiPublicConfig = Readonly<{
  environment: WompiEnvironment;
  apiBaseUrl: (typeof WOMPI_API_BASE_URLS)[WompiEnvironment];
  publicKey: string;
}>;

export type WompiServerConfig = WompiPublicConfig &
  Readonly<{
    privateKey: string;
    integritySecret: string;
    eventsSecret: string;
  }>;

export type WompiConfigInput = {
  publicKey?: string;
  privateKey?: string;
  integritySecret?: string;
  eventsSecret?: string;
};

const ENVIRONMENT_PREFIXES = {
  sandbox: {
    publicKey: 'pub_test_',
    privateKey: 'prv_test_',
    integritySecret: 'test_integrity_',
    eventsSecret: 'test_events_',
  },
  production: {
    publicKey: 'pub_prod_',
    privateKey: 'prv_prod_',
    integritySecret: 'prod_integrity_',
    eventsSecret: 'prod_events_',
  },
} as const satisfies Record<WompiEnvironment, Record<keyof WompiConfigInput, string>>;

const ENVIRONMENT_VARIABLES = {
  publicKey: 'NEXT_PUBLIC_WOMPI_PUBLIC_KEY',
  privateKey: 'WOMPI_PRIVATE_KEY',
  integritySecret: 'WOMPI_INTEGRITY_SECRET',
  eventsSecret: 'WOMPI_EVENTS_SECRET',
} as const satisfies Record<keyof WompiConfigInput, string>;

export class WompiConfigurationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WompiConfigurationError';
  }
}

function normalize(value: string | undefined): string {
  return value?.trim() ?? '';
}

function resolveEnvironment(publicKey: string): WompiEnvironment {
  if (publicKey.startsWith(ENVIRONMENT_PREFIXES.sandbox.publicKey)) {
    return 'sandbox';
  }

  if (publicKey.startsWith(ENVIRONMENT_PREFIXES.production.publicKey)) {
    return 'production';
  }

  throw new WompiConfigurationError(
    `${ENVIRONMENT_VARIABLES.publicKey} debe comenzar por pub_test_ o pub_prod_.`,
  );
}

export function parseWompiPublicKey(publicKeyValue: string | undefined): WompiPublicConfig {
  const publicKey = normalize(publicKeyValue);

  if (!publicKey) {
    throw new WompiConfigurationError(`Falta ${ENVIRONMENT_VARIABLES.publicKey}.`);
  }

  const environment = resolveEnvironment(publicKey);

  return Object.freeze({
    environment,
    apiBaseUrl: WOMPI_API_BASE_URLS[environment],
    publicKey,
  });
}

export function parseWompiConfig(input: WompiConfigInput): WompiServerConfig {
  const values = {
    publicKey: normalize(input.publicKey),
    privateKey: normalize(input.privateKey),
    integritySecret: normalize(input.integritySecret),
    eventsSecret: normalize(input.eventsSecret),
  };

  const missingVariables = (Object.keys(values) as Array<keyof typeof values>)
    .filter((key) => !values[key])
    .map((key) => ENVIRONMENT_VARIABLES[key]);

  if (missingVariables.length > 0) {
    throw new WompiConfigurationError(
      `Faltan variables de entorno de Wompi: ${missingVariables.join(', ')}.`,
    );
  }

  const publicConfig = parseWompiPublicKey(values.publicKey);
  const expectedPrefixes = ENVIRONMENT_PREFIXES[publicConfig.environment];

  for (const key of Object.keys(values) as Array<keyof typeof values>) {
    if (!values[key].startsWith(expectedPrefixes[key])) {
      throw new WompiConfigurationError(
        `${ENVIRONMENT_VARIABLES[key]} no corresponde al ambiente ${publicConfig.environment}; debe comenzar por ${expectedPrefixes[key]}.`,
      );
    }
  }

  return Object.freeze({
    ...publicConfig,
    privateKey: values.privateKey,
    integritySecret: values.integritySecret,
    eventsSecret: values.eventsSecret,
  });
}
