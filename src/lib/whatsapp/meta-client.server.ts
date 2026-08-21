interface WhatsAppMessageConfig {
  accessToken: string;
  phoneNumberId: string;
  apiVersion: string;
}

interface MetaSendResponse {
  messages?: Array<{ id?: unknown }>;
}

export class WhatsAppConfigurationError extends Error {
  constructor(variable: string) {
    super(`Missing or invalid server environment variable: ${variable}`);
    this.name = 'WhatsAppConfigurationError';
  }
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new WhatsAppConfigurationError(name);
  return value;
}

export function getWhatsAppVerifyToken(): string {
  return requiredEnvironmentVariable('WHATSAPP_VERIFY_TOKEN');
}

export function getWhatsAppAppSecret(): string {
  return requiredEnvironmentVariable('WHATSAPP_APP_SECRET');
}

function getMessageConfig(): WhatsAppMessageConfig {
  const accessToken = requiredEnvironmentVariable('WHATSAPP_ACCESS_TOKEN');
  const phoneNumberId = requiredEnvironmentVariable('WHATSAPP_PHONE_NUMBER_ID');
  const apiVersion = requiredEnvironmentVariable('WHATSAPP_API_VERSION');

  if (!/^\d+$/.test(phoneNumberId)) {
    throw new WhatsAppConfigurationError('WHATSAPP_PHONE_NUMBER_ID');
  }
  if (!/^v\d+\.\d+$/.test(apiVersion)) {
    throw new WhatsAppConfigurationError('WHATSAPP_API_VERSION');
  }

  return { accessToken, phoneNumberId, apiVersion };
}

export async function sendWhatsAppText(to: string, body: string): Promise<string> {
  if (!/^\d{7,32}$/.test(to)) throw new Error('Invalid WhatsApp recipient');
  if (!body.trim() || body.length > 4096) throw new Error('Invalid WhatsApp message body');

  const config = getMessageConfig();
  const endpoint = `https://graph.facebook.com/${config.apiVersion}/${config.phoneNumberId}/messages`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { preview_url: false, body },
    }),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  });

  const responseText = await response.text();
  if (!response.ok) {
    throw new Error(`Meta WhatsApp API returned ${response.status}: ${responseText.slice(0, 500)}`);
  }

  let payload: MetaSendResponse;
  try {
    payload = JSON.parse(responseText) as MetaSendResponse;
  } catch {
    throw new Error('Meta WhatsApp API returned invalid JSON');
  }

  const messageId = payload.messages?.[0]?.id;
  if (typeof messageId !== 'string' || !messageId) {
    throw new Error('Meta WhatsApp API response did not include a message id');
  }

  return messageId;
}
