import { persistVerifiedWompiTransaction } from '@/lib/wompi/persistence';
import { persistVerifiedToeflReportTransaction } from '@/lib/toefl/report-payment-events.server';
import { persistVerifiedRegistrationTransaction } from '@/lib/registration/payment-events.server';
import { parseWompiWebhookEvent, verifyWompiEventChecksum } from '@/lib/wompi/security';
import { getWompiServerConfig } from '@/lib/wompi/server';
import { parseAndVerifyWompiTransaction } from '@/lib/wompi/transactions';
import { WompiConfigurationError } from '@/lib/wompi/validation';

export const runtime = 'nodejs';

const NO_STORE_HEADERS = { 'Cache-Control': 'no-store, max-age=0' } as const;

function json(body: unknown, status: number): Response {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

export async function POST(request: Request): Promise<Response> {
  const contentLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(contentLength) && contentLength > 128_000) {
    return json({ received: false, code: 'payload_too_large' }, 413);
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ received: false, code: 'invalid_json' }, 400);
  }
  if (raw.length > 128_000) return json({ received: false, code: 'payload_too_large' }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ received: false, code: 'invalid_json' }, 400);
  }

  const event = parseWompiWebhookEvent(body);
  if (!event) return json({ received: false, code: 'invalid_event' }, 400);

  try {
    const config = getWompiServerConfig();
    const expectedEnvironment = config.environment === 'sandbox' ? 'test' : 'prod';

    if (event.environment !== expectedEnvironment) {
      return json({ received: false, code: 'environment_mismatch' }, 409);
    }

    const headerChecksum = request.headers.get('x-event-checksum');
    if (!verifyWompiEventChecksum(event, config.eventsSecret, headerChecksum)) {
      return json({ received: false, code: 'invalid_signature' }, 401);
    }

    if (event.event !== 'transaction.updated') {
      return json({ received: true, ignored: true }, 200);
    }

    const transaction = parseAndVerifyWompiTransaction(event.data.transaction);
    if (!transaction) {
      const toeflPersistence = await persistVerifiedToeflReportTransaction({
        transaction: event.data.transaction,
        environment: config.environment,
      });
      if (toeflPersistence === 'failed') {
        return json({ received: false, code: 'persistence_unavailable' }, 503);
      }
      if (toeflPersistence === 'saved') {
        return json({ received: true, ignored: false }, 200);
      }

      const registrationPersistence = await persistVerifiedRegistrationTransaction({
        transaction: event.data.transaction,
        environment: config.environment,
      });
      if (registrationPersistence === 'failed') {
        return json({ received: false, code: 'persistence_unavailable' }, 503);
      }
      return json({ received: true, ignored: registrationPersistence === 'ignored' }, 200);
    }

    const persistence = await persistVerifiedWompiTransaction({
      transaction,
      environment: config.environment,
      eventSentAt: event.sentAt,
    });

    if (persistence === 'failed' || (config.environment === 'production' && persistence !== 'saved')) {
      return json({ received: false, code: 'persistence_unavailable' }, 503);
    }

    return json({ received: true }, 200);
  } catch (error) {
    if (error instanceof WompiConfigurationError) {
      return json({ received: false, code: 'wompi_not_configured' }, 503);
    }

    return json({ received: false, code: 'event_processing_failed' }, 500);
  }
}
