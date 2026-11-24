import assert from 'node:assert/strict';
import { generateKeyPairSync, verify } from 'node:crypto';
import test from 'node:test';
import { isGoogleCalendarConfigured, mirrorGoogleCalendar } from '../src/lib/admin-operations/google-calendar.server.ts';

const calendarId = 'idiomas-welearn-test@group.calendar.google.com';
const keys = generateKeyPairSync('rsa', { modulusLength: 2048 });
const account = {
  type: 'service_account',
  client_email: 'calendar@example.iam.gserviceaccount.com',
  private_key: keys.privateKey.export({ type: 'pkcs8', format: 'pem' }),
};
const names = ['WELEARN_GOOGLE_CALENDAR_ID', 'WELEARN_GOOGLE_CALENDAR_SERVICE_ACCOUNT'];

const lesson = {
  id: '12345678-1234-4234-8234-123456789012',
  title: 'Título interno',
  participant: 'Nombre interno',
  starts_at: '2026-11-24T14:00:00-05:00',
  ends_at: '2026-11-24T15:00:00-05:00',
  status: 'scheduled',
  updated_at: '2026-11-24T14:00:00Z',
};
const eventId = 'c12345678123442348234123456789012';
const url = (suffix = '') => `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events${suffix}`;

function setCalendarConfig(t, id = calendarId) {
  const prior = names.map(name => process.env[name]);
  process.env[names[0]] = id;
  process.env[names[1]] = JSON.stringify(account);
  t.after(() => names.forEach((name, index) => {
    if (prior[index] === undefined) delete process.env[name];
    else process.env[name] = prior[index];
  }));
}

function token(input, init) {
  assert.equal(input, 'https://oauth2.googleapis.com/token');
  assert.equal(init.method, 'POST');
  assert.equal(init.body.get('grant_type'), 'urn:ietf:params:oauth:grant-type:jwt-bearer');
  const [header, claim, signature] = init.body.get('assertion').split('.');
  assert.equal(JSON.parse(Buffer.from(claim, 'base64url')).scope, 'https://www.googleapis.com/auth/calendar.events');
  assert.ok(verify('RSA-SHA256', Buffer.from(`${header}.${claim}`), keys.publicKey, Buffer.from(signature, 'base64url')));
  return Response.json({ access_token: 'test-token' });
}

test('mirrors time and status, replaces conflicting writes safely and keeps student and payment data private', async t => {
  setCalendarConfig(t);
  assert.equal(isGoogleCalendarConfigured(), true);
  let remote = null;
  let firstWrite = true;
  let writes = 0;
  t.mock.method(globalThis, 'fetch', async (input, init) => {
    if (input === 'https://oauth2.googleapis.com/token') return token(input, init);
    assert.equal(init.headers.Authorization, 'Bearer test-token');
    if (!init.method) {
      assert.ok(input.startsWith(url(`/${eventId}?fields=`)));
      return remote ? Response.json(remote) : new Response(null, { status: 404 });
    }
    const payload = JSON.parse(init.body);
    assert.equal(payload.visibility, 'private');
    assert.equal(payload.start.timeZone, 'America/Bogota');
    assert.doesNotMatch(init.body, /interno|attendees|payment/);
    if (init.method === 'POST') {
      assert.equal(payload.id, eventId);
      assert.equal(input, url('?sendUpdates=none'));
      assert.equal(payload.start.dateTime, '2026-11-24T19:00:00.000Z');
      assert.equal(payload.transparency, 'opaque');
    } else {
      assert.equal(init.method, 'PATCH');
      assert.equal(init.headers['If-Match'], remote.etag);
      if (firstWrite) {
        firstWrite = false;
        remote.etag = '"new-etag"';
        return new Response(null, { status: 412 });
      }
      assert.equal(payload.transparency, 'transparent');
      assert.match(payload.summary, /cancelada/);
    }
    writes++;
    remote = { ...payload, etag: '"fixture-etag"' };
    return Response.json(remote);
  });

  assert.equal(await mirrorGoogleCalendar([lesson]), 0);
  assert.equal(await mirrorGoogleCalendar([lesson]), 0);
  assert.equal(writes, 1);
  assert.equal(await mirrorGoogleCalendar([{ ...lesson, status: 'cancelled', updated_at: '2026-11-24T14:15:00Z' }]), 0);
  assert.equal(await mirrorGoogleCalendar([lesson]), 0);
  assert.equal(writes, 2);
});

test('a failed calendar leaves only the unconfirmed events for retry and never uses a primary calendar', async t => {
  setCalendarConfig(t);
  const other = { ...lesson, id: '42345678-1234-4234-8234-123456789012' };
  const transport = t.mock.method(globalThis, 'fetch', async (input, init) => {
    if (input === 'https://oauth2.googleapis.com/token') return token(input, init);
    if (!init.method) return new Response(null, { status: 404 });
    return new Response(null, { status: JSON.parse(init.body).id === eventId ? 200 : 503 });
  });
  assert.equal(await mirrorGoogleCalendar([lesson, other]), 1);
  const calls = transport.mock.callCount();
  process.env[names[0]] = 'primary';
  assert.equal(isGoogleCalendarConfigured(), false);
  assert.equal(await mirrorGoogleCalendar([lesson]), 1);
  assert.equal(transport.mock.callCount(), calls);
});
