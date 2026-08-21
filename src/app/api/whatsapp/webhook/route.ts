import { decideBotReply } from '@/lib/whatsapp/chatbot';
import {
  getWhatsAppAppSecret,
  getWhatsAppVerifyToken,
  sendWhatsAppText,
  WhatsAppConfigurationError,
} from '@/lib/whatsapp/meta-client.server';
import { extractInboundMessages, type InboundWhatsAppMessage } from '@/lib/whatsapp/payload';
import {
  applyConversationUpdates,
  claimInboundMessage,
  getOrCreateConversation,
  recordOutboundMessage,
  releaseInboundMessage,
} from '@/lib/whatsapp/repository.server';
import { verifyMetaSignature, verifyWebhookChallenge } from '@/lib/whatsapp/security.server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 30;

const MAX_WEBHOOK_BYTES = 1_000_000;

async function processInboundMessage(message: InboundWhatsAppMessage): Promise<void> {
  const conversation = await getOrCreateConversation(message);
  const claimed = await claimInboundMessage(message);
  if (!claimed) return;

  const decision = decideBotReply(message.text, conversation);
  let outboundMessageId: string;

  try {
    outboundMessageId = await sendWhatsAppText(message.from, decision.reply);
  } catch (error) {
    await releaseInboundMessage(message.id);
    throw error;
  }

  // At this point Meta accepted the reply. Keep the inbound claim even if a later
  // database write fails, otherwise a webhook retry could send the same reply twice.
  const persistenceResults = await Promise.allSettled([
    applyConversationUpdates(message.from, decision.updates),
    recordOutboundMessage(outboundMessageId, message.from, decision.reply),
  ]);

  for (const result of persistenceResults) {
    if (result.status === 'rejected') {
      console.error('[whatsapp] reply delivered but persistence failed', result.reason);
    }
  }
}

export async function GET(request: Request): Promise<Response> {
  try {
    const challenge = verifyWebhookChallenge(
      new URL(request.url).searchParams,
      getWhatsAppVerifyToken(),
    );

    if (!challenge) return new Response('Forbidden', { status: 403 });
    return new Response(challenge, {
      status: 200,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (error) {
    console.error('[whatsapp] webhook verification unavailable', error);
    return new Response('Service unavailable', { status: 503 });
  }
}

export async function POST(request: Request): Promise<Response> {
  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_WEBHOOK_BYTES) {
    return new Response('Payload too large', { status: 413 });
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return new Response('Invalid request body', { status: 400 });
  }

  if (Buffer.byteLength(rawBody, 'utf8') > MAX_WEBHOOK_BYTES) {
    return new Response('Payload too large', { status: 413 });
  }

  try {
    const signature = request.headers.get('x-hub-signature-256');
    if (!verifyMetaSignature(rawBody, signature, getWhatsAppAppSecret())) {
      return new Response('Unauthorized', { status: 401 });
    }

    let payload: unknown;
    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response('Invalid JSON', { status: 400 });
    }

    const messages = extractInboundMessages(payload);
    for (const message of messages) await processInboundMessage(message);

    return Response.json({ received: true });
  } catch (error) {
    const status = error instanceof WhatsAppConfigurationError ? 503 : 500;
    console.error('[whatsapp] webhook processing failed', error);
    return Response.json({ received: false }, { status });
  }
}
