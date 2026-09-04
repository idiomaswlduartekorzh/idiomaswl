'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import {
  ATTRIBUTION_TTL_MS, captureSource, contactUrl, decorateContactUrl, parseIntent, publicPath,
  type ContactIntent, type ContactSource,
} from '@/lib/whatsapp/attribution';

const SOURCE_KEY = 'wl-contact-source-v1';
const QUEUE_KEY = 'wl-contact-pending-v1';
const RETRY_TTL = 24 * 60 * 60 * 1000;
type Pending = { intent: ContactIntent; at: number };
// Shared across SPA effect lifetimes: an older request must not overwrite a newer queue.
let pending: Pending[] | undefined;
const sending = new Set<string>();
function saveQueue() {
  try { sessionStorage.setItem(QUEUE_KEY, JSON.stringify(pending ?? [])); } catch { /* Storage blocked. */ }
}
function flushQueue() {
  pending = (pending ?? []).filter(entry => Date.now() - entry.at < RETRY_TTL);
  for (const entry of pending) {
    if (sending.has(entry.intent.reference)) continue;
    sending.add(entry.intent.reference);
    void fetch('/api/whatsapp/attribution', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry.intent), keepalive: true,
    }).then(response => {
      if (response.ok || [400, 403, 413].includes(response.status)) {
        pending = (pending ?? []).filter(p => p.intent.reference !== entry.intent.reference);
        saveQueue();
      }
    }).catch(() => { /* Retry on reconnect or next page, never block the contact. */ })
      .finally(() => sending.delete(entry.intent.reference));
  }
}

/** No popup, preventDefault or awaited request: opening WhatsApp stays immediate. */
export default function WhatsAppAttribution() {
  const pathname = usePathname();
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED !== 'true' || !publicPath(pathname)) return;
    let source: ContactSource = captureSource(new URL(location.href), document.referrer);
    try {
      const saved = JSON.parse(sessionStorage.getItem(SOURCE_KEY) ?? 'null');
      // Explicit new campaigns start a new touch; internal navigation preserves landing/referrer.
      const hasCampaign = new URL(location.href).searchParams.has('utm_source');
      if (saved && Date.now() - saved.at < ATTRIBUTION_TTL_MS && !hasCampaign) source = saved.source;
      else sessionStorage.setItem(SOURCE_KEY, JSON.stringify({ source, at: Date.now() }));
    } catch { /* Storage may be blocked. Current-page attribution still works. */ }

    if (!pending) {
      pending = [];
      try {
        const saved = JSON.parse(sessionStorage.getItem(QUEUE_KEY) ?? '[]');
        if (Array.isArray(saved)) pending = saved.filter(p => p && Date.now() - p.at < RETRY_TTL && parseIntent(p.intent)).slice(-20);
      } catch { /* In-memory queue only. */ }
    }
    flushQueue();
    window.addEventListener('online', flushQueue);
    const prepared = new Map<HTMLAnchorElement, { original: string; decorated: string; intent: ContactIntent; sent: boolean }>();
    const handle = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || !contactUrl(anchor.href)) return;
      if (event instanceof MouseEvent && event.type === 'auxclick' && event.button !== 1) return;
      try {
        let item = prepared.get(anchor);
        if (!item || anchor.href !== item.decorated || (item.sent && ['pointerdown', 'keydown'].includes(event.type))) {
          const original = item && anchor.href === item.decorated ? item.original : anchor.href;
          const intent: ContactIntent = {
            ...source, source_page: pathname,
            reference: `WL-${Array.from(crypto.getRandomValues(new Uint8Array(12)), byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase()}`,
            interaction: event.type === 'contextmenu' ? 'context_menu' : 'click',
          };
          const decorated = decorateContactUrl(original, intent);
          if (!decorated) return;
          item = { original, decorated, intent, sent: false };
          prepared.set(anchor, item);
          anchor.href = decorated;
        }
        if (!['click', 'auxclick', 'contextmenu'].includes(event.type) || item.sent) return;
        item.intent.interaction = event.type === 'contextmenu' ? 'context_menu' : 'click';
        item.sent = true;
        pending = [...(pending ?? []), { intent: item.intent, at: Date.now() }].slice(-20);
        saveQueue();
        flushQueue();
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({ event: event.type === 'contextmenu' ? 'whatsapp_context_menu' : 'click_whatsapp',
          source_page: pathname, landing_page: source.landing_page, contact_ref: item.intent.reference,
          utm_source: source.utm_source, utm_medium: source.utm_medium, utm_campaign: source.utm_campaign });
      } catch { /* Even if crypto or tracking fails, the original contact link remains usable. */ }
    };
    const events = ['pointerdown', 'keydown', 'click', 'auxclick', 'contextmenu'];
    for (const event of events) document.addEventListener(event, handle, true);
    return () => {
      for (const event of events) document.removeEventListener(event, handle, true);
      window.removeEventListener('online', flushQueue);
      for (const [anchor, item] of prepared) if (anchor.href === item.decorated) anchor.href = item.original;
    };
  }, [pathname]);
  return null;
}
