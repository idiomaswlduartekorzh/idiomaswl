import 'server-only';

import { sign } from 'node:crypto';
import { BOGOTA, type Lesson } from './agenda';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const EVENTS_SCOPE = 'https://www.googleapis.com/auth/calendar.events';

export const GOOGLE_LESSON_FIELDS = 'id,starts_at,ends_at,status,updated_at';
export type GoogleCalendarLesson = Pick<Lesson, 'id' | 'starts_at' | 'ends_at' | 'status' | 'updated_at'>;

type GoogleEvent = {
  etag?: string;
  summary?: string;
  start?: { dateTime?: string };
  end?: { dateTime?: string };
  transparency?: string;
  visibility?: string;
  extendedProperties?: { private?: { welearnLesson?: string; welearnRevision?: string } };
};

const LABELS = {
  scheduled: 'Clase · Idiomas WeLearn',
  completed: 'Clase realizada · Idiomas WeLearn',
  cancelled: 'Clase cancelada · Idiomas WeLearn',
};

function googleCalendarConfiguration() {
  const calendar = process.env.WELEARN_GOOGLE_CALENDAR_ID?.trim();
  const rawAccount = process.env.WELEARN_GOOGLE_CALENDAR_SERVICE_ACCOUNT?.trim();
  if (!calendar || !/^[a-z0-9._+-]+@group\.calendar\.google\.com$/i.test(calendar) || !rawAccount) return null;

  try {
    const account = JSON.parse(rawAccount) as { type?: unknown; client_email?: unknown; private_key?: unknown } | null;
    if (account?.type !== 'service_account' || typeof account.client_email !== 'string'
      || !account.client_email.endsWith('.iam.gserviceaccount.com') || typeof account.private_key !== 'string'
      || !account.private_key.startsWith('-----BEGIN PRIVATE KEY-----')) return null;
    return { calendar, email: account.client_email, key: account.private_key };
  } catch {
    return null;
  }
}

export function isGoogleCalendarConfigured(): boolean {
  return googleCalendarConfiguration() !== null;
}

async function openGoogleCalendar(signal: AbortSignal) {
  const config = googleCalendarConfiguration();
  if (!config) throw new Error('Invalid Google Calendar configuration');

  const issuedAt = Math.floor(Date.now() / 1000);
  const encode = (value: object) => Buffer.from(JSON.stringify(value)).toString('base64url');
  const claims = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({
    iss: config.email,
    scope: EVENTS_SCOPE,
    aud: TOKEN_URL,
    iat: issuedAt,
    exp: issuedAt + 3600,
  })}`;
  const assertion = `${claims}.${sign('RSA-SHA256', Buffer.from(claims), config.key).toString('base64url')}`;
  const tokenResponse = await fetch(TOKEN_URL, {
    method: 'POST',
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
    cache: 'no-store',
    redirect: 'error',
    signal,
  });
  if (!tokenResponse.ok) throw new Error('Could not authenticate to Google Calendar');
  const token = await tokenResponse.json() as { access_token?: unknown };
  if (typeof token.access_token !== 'string' || !token.access_token) throw new Error('Invalid Google token');

  const base = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(config.calendar)}/events`;
  return (path: string, init?: RequestInit) => fetch(`${base}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token.access_token}`, ...init?.headers },
    cache: 'no-store',
    redirect: 'error',
    signal,
  });
}

async function mirrorLesson(request: Awaited<ReturnType<typeof openGoogleCalendar>>, lesson: GoogleCalendarLesson) {
  // Calendar accepts base32hex IDs. Use the lesson UUID to recover safely after a timed-out insert.
  const id = `c${lesson.id.toLowerCase().replace(/-/g, '')}`;
  const revision = Date.parse(lesson.updated_at);
  const event = {
    summary: LABELS[lesson.status],
    start: { dateTime: new Date(lesson.starts_at).toISOString(), timeZone: BOGOTA },
    end: { dateTime: new Date(lesson.ends_at).toISOString(), timeZone: BOGOTA },
    visibility: 'private',
    transparency: lesson.status === 'cancelled' ? 'transparent' : 'opaque',
    reminders: { useDefault: false },
    extendedProperties: { private: { welearnLesson: lesson.id, welearnRevision: String(revision) } },
  };

  for (let attempt = 0; attempt < 3; attempt++) {
    const existing = await request(`/${id}?fields=etag,extendedProperties,summary,start,end,transparency,visibility`);
    if (existing.status === 404) {
      const created = await request('?sendUpdates=none', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...event }),
      });
      if (created.ok) return;
      if (created.status === 409) continue;
      throw new Error('Google Calendar rejected event creation');
    }

    if (!existing.ok) throw new Error('Google Calendar could not read the event');
    const current = await existing.json() as GoogleEvent;
    if (current.extendedProperties?.private?.welearnLesson !== lesson.id || !current.etag) {
      throw new Error('Unexpected Google Calendar event');
    }
    const remoteRevision = Number(current.extendedProperties.private.welearnRevision);
    if (remoteRevision > revision) return;
    if (remoteRevision === revision && current.summary === event.summary
      && Date.parse(current.start?.dateTime ?? '') === Date.parse(event.start.dateTime)
      && Date.parse(current.end?.dateTime ?? '') === Date.parse(event.end.dateTime)
      && (current.transparency ?? 'opaque') === event.transparency && current.visibility === event.visibility) return;
    const updated = await request(`/${id}?sendUpdates=none`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'If-Match': current.etag },
      body: JSON.stringify(event),
    });
    if (updated.ok) return;
    if (updated.status !== 412) throw new Error('Google Calendar rejected the update');
  }
  throw new Error('Google Calendar changed concurrently');
}

export async function mirrorGoogleCalendar(lessons: GoogleCalendarLesson[]): Promise<number> {
  if (!lessons.length) return 0;
  const signal = AbortSignal.timeout(12_000);
  let request;
  try {
    request = await openGoogleCalendar(signal);
  } catch {
    return lessons.length;
  }
  let failed = 0;
  const batchSize = 5;
  for (let offset = 0; offset < lessons.length; offset += batchSize) {
    if (signal.aborted) return failed + lessons.length - offset;
    const result = await Promise.allSettled(lessons.slice(offset, offset + batchSize).map(lesson => mirrorLesson(request, lesson)));
    failed += result.filter(item => item.status === 'rejected').length;
  }
  return failed;
}
