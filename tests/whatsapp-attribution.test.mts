import assert from 'node:assert/strict';
import test from 'node:test';
import { captureSource, contactUrl, decorateContactUrl, parseIntent, publicPath, referenceFromText, reportWindow } from '../src/lib/whatsapp/attribution.ts';

const reference = 'WL-0123456789ABCDEF01234567';
const source = captureSource(new URL('https://www.idiomaswl.com/blog/ielts?utm_source=Instagram&utm_medium=social&utm_campaign=ielts_sep&email=private@example.com&fbclid=secret'), 'https://l.instagram.com/path?secret=1');
const intent = { ...source, reference, source_page: '/examenes/ielts', interaction: 'click' as const };
test('captures only allowed campaign data and distinguishes landing from contact', () => {
  assert.equal(source.utm_source, 'instagram');
  assert.equal(source.landing_page, '/blog/ielts');
  assert.equal(source.referrer_host, 'l.instagram.com');
  assert.equal(source.channel, 'Campaña etiquetada');
  assert.equal(JSON.stringify(source).includes('secret'), false);
  assert.equal(JSON.stringify(source).includes('private@'), false);
  assert.equal(parseIntent(intent)?.source_page, '/examenes/ielts');
});
test('does not claim untagged search as proven SEO or no referrer as proven direct', () => {
  assert.equal(captureSource(new URL('https://idiomaswl.com/'), 'https://www.google.com/search?q=x').channel, 'Buscador (inferido)');
  assert.equal(captureSource(new URL('https://idiomaswl.com/'), '').channel, 'Directo / desconocido');
  assert.equal(captureSource(new URL('https://idiomaswl.com/'), 'https://www.idiomaswl.com/blog').referrer_host, null);
  assert.equal(captureSource(new URL('https://idiomaswl.com/'), 'https://google.com.evil.test').channel, 'Sitio referido');
});
test('rejects private pages, arbitrary URLs and sensitive encoded paths', () => {
  for (const path of ['/dashboard/admin', '/auth/callback?token=x', '//evil.test', '/x%40example.com', '/x%2fadmin', '/bad path']) assert.equal(publicPath(path), null);
  assert.equal(publicPath('/blog/a?email=secret#token'), '/blog/a');
  assert.equal(parseIntent({ ...intent, reference: 'WL-forged' }), null);
  assert.equal(parseIntent({ ...intent, interaction: 'message_received' }), null);
  assert.equal(parseIntent({ ...intent, channel: 'Confirmed Google Ads', utm_source: '<script>', utm_medium: null })?.channel, 'Red social (inferido)');
});
test('tracks only the academy number, preserving the original message', () => {
  for (const url of ['https://wa.me/123456789', 'http://wa.me/573005004253', 'https://wa.me.evil.test/573005004253', 'https://evil@wa.me/573005004253', 'https://web.whatsapp.com/other?phone=573005004253']) assert.equal(contactUrl(url), null);
  for (const url of ['https://wa.me/573005004253?text=Hola%20IELTS', 'https://api.whatsapp.com/send?phone=573005004253&text=Hola%20IELTS']) {
    const result = new URL(decorateContactUrl(url, intent)!);
    assert.match(result.searchParams.get('text')!, /^Hola IELTS\n/);
    assert.match(result.searchParams.get('text')!, /\/examenes\/ielts · instagram/);
    assert.equal(referenceFromText(result.searchParams.get('text')), reference);
  }
});
test('reference parsing rejects ambiguity and malformed values', () => {
  assert.equal(referenceFromText(`Ref: ${reference.toLowerCase()}`), reference);
  assert.equal(referenceFromText(`${reference} ${reference}`), reference);
  assert.equal(referenceFromText(`${reference} WL-AAAAAAAAAAAAAAAAAAAAAAAA`), null);
  assert.equal(referenceFromText(`${reference}FF`), null);
  assert.equal(referenceFromText(null), null);
});
test('Colombia calendar day boundary (not rolling UTC days)', () => {
  assert.equal(reportWindow(1, new Date('2026-09-04T04:30:00Z')).start, '2026-09-03T05:00:00.000Z');
  assert.equal(reportWindow(7, new Date('2026-09-04T15:00:00Z')).start, '2026-08-29T05:00:00.000Z');
});
