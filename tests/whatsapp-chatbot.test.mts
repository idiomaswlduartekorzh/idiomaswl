import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import test from 'node:test';

import {
  decideBotReply,
  INITIAL_CONVERSATION,
  type ConversationSnapshot,
} from '../src/lib/whatsapp/chatbot.ts';
import { extractInboundMessages } from '../src/lib/whatsapp/payload.ts';
import { verifyMetaSignature, verifyWebhookChallenge } from '../src/lib/whatsapp/security.server.ts';

test('qualifies a contact through language, goal, and level', () => {
  const languageDecision = decideBotReply('Quiero aprender inglés', INITIAL_CONVERSATION);
  assert.deepEqual(languageDecision.updates, {
    language: 'Inglés',
    stage: 'awaiting_goal',
  });

  const goalConversation: ConversationSnapshot = {
    ...INITIAL_CONVERSATION,
    ...languageDecision.updates,
  };
  const goalDecision = decideBotReply('IELTS', goalConversation);
  assert.deepEqual(goalDecision.updates, {
    goal: 'Preparar un examen',
    stage: 'awaiting_level',
  });

  const levelConversation: ConversationSnapshot = {
    ...goalConversation,
    ...goalDecision.updates,
  };
  const levelDecision = decideBotReply('3', levelConversation);
  assert.deepEqual(levelDecision.updates, {
    level: 'Intermedio',
    stage: 'qualified',
    status: 'qualified',
  });
  assert.match(levelDecision.reply, /Idioma: Inglés/);
  assert.match(levelDecision.reply, /Objetivo: Preparar un examen/);
  assert.match(levelDecision.reply, /Nivel: Intermedio/);
});

test('keeps the current stage when an option is invalid', () => {
  const decision = decideBotReply('no entendí las opciones', INITIAL_CONVERSATION);
  assert.deepEqual(decision.updates, {});
  assert.match(decision.reply, /No alcancé a identificar el idioma/);
});

test('hands the conversation to a person from any stage', () => {
  const decision = decideBotReply('Quiero hablar con un asesor', INITIAL_CONVERSATION);
  assert.deepEqual(decision.updates, {
    stage: 'handoff_requested',
    status: 'handoff_requested',
  });
  assert.match(decision.reply, /persona del equipo/);
});

test('resets the captured fields when the contact requests the menu', () => {
  const qualified: ConversationSnapshot = {
    stage: 'qualified',
    status: 'qualified',
    language: 'Coreano',
    goal: 'Trabajo o estudios',
    level: 'Básico',
  };
  const decision = decideBotReply('MENÚ', qualified);
  assert.deepEqual(decision.updates, {
    stage: 'awaiting_language',
    status: 'active',
    language: null,
    goal: null,
    level: null,
  });
});

test('answers a pricing FAQ after qualification', () => {
  const qualified: ConversationSnapshot = {
    stage: 'qualified',
    status: 'qualified',
    language: 'Francés',
    goal: 'Conversación y fluidez',
    level: 'Desde cero',
  };
  const decision = decideBotReply('¿Cuánto cuestan los planes?', qualified);
  assert.match(decision.reply, /idiomaswl\.com\/precios/);
  assert.deepEqual(decision.updates, {});
});

test('extracts text and contact data from a Meta webhook', () => {
  const messages = extractInboundMessages({
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        value: {
          contacts: [{ wa_id: '573001234567', profile: { name: 'Ada' } }],
          messages: [{
            id: 'wamid.example',
            from: '573001234567',
            timestamp: '1787328000',
            type: 'text',
            text: { body: 'Hola' },
          }],
        },
      }],
    }],
  });

  assert.deepEqual(messages, [{
    id: 'wamid.example',
    from: '573001234567',
    profileName: 'Ada',
    text: 'Hola',
    type: 'text',
    timestamp: '2026-08-21T16:00:00.000Z',
  }]);
});

test('extracts an interactive list reply and ignores status-only webhooks', () => {
  const interactive = extractInboundMessages({
    object: 'whatsapp_business_account',
    entry: [{
      changes: [{
        value: {
          messages: [{
            id: 'wamid.interactive',
            from: '573001234567',
            type: 'interactive',
            interactive: { list_reply: { id: 'english', title: 'Inglés' } },
          }],
        },
      }],
    }],
  });
  assert.equal(interactive[0]?.text, 'Inglés');

  const statuses = extractInboundMessages({
    object: 'whatsapp_business_account',
    entry: [{ changes: [{ value: { statuses: [{ id: 'wamid.sent' }] } }] }],
  });
  assert.deepEqual(statuses, []);
});

test('verifies the webhook challenge token', () => {
  const params = new URLSearchParams({
    'hub.mode': 'subscribe',
    'hub.verify_token': 'expected-token',
    'hub.challenge': '123456',
  });
  assert.equal(verifyWebhookChallenge(params, 'expected-token'), '123456');
  assert.equal(verifyWebhookChallenge(params, 'wrong-token'), null);
});

test('verifies the raw webhook signature', () => {
  const body = JSON.stringify({ object: 'whatsapp_business_account' });
  const secret = 'test-app-secret';
  const digest = createHmac('sha256', secret).update(body).digest('hex');

  assert.equal(verifyMetaSignature(body, `sha256=${digest}`, secret), true);
  assert.equal(verifyMetaSignature(`${body} `, `sha256=${digest}`, secret), false);
  assert.equal(verifyMetaSignature(body, 'sha256=invalid', secret), false);
});
