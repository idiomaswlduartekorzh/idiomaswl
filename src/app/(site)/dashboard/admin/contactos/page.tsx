import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin } from '@/lib/auth/require-admin.server';
import { createAdminClient } from '@/lib/supabase/admin';
import { CONTACT_REF_PATTERN, reportWindow, type ContactIntent } from '@/lib/whatsapp/attribution';
import ConfirmContact from './ConfirmContact';
import s from './contactos.module.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Origen de contactos · Administración', robots: { index: false, follow: false } };

type Contact = ContactIntent & { created_at: string; manually_confirmed: boolean; webhook_confirmed: boolean };
type Message = { message_id: string; wa_id: string; occurred_at: string; reference: string | null;
  method: 'message' | 'conversation' | 'unknown'; source_page: string | null; utm_source: string | null; referrer_host: string | null };
interface Report {
  total: number; clicks: number; context_menus: number; confirmed: number; messages: number; unattributed_messages: number;
  rows: Contact[]; sources: { source_page: string; source: string; intents: number; confirmed: number }[];
  source_groups: number; recent_messages: Message[];
}
const date = (iso: string) => new Date(iso).toLocaleString('es-CO', { timeZone: 'America/Bogota', dateStyle: 'short', timeStyle: 'short' });

export default async function ContactosPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  try { await requireAdmin(); } catch { redirect('/dashboard'); }
  const params = await searchParams;
  const days = [1, 7, 30, 90].includes(Number(params.days)) ? Number(params.days) : 7;
  const page = Math.max(1, Math.min(10000, Math.floor(Number(params.page) || 1)));
  const reference = typeof params.ref === 'string' ? params.ref.trim().toUpperCase() : '';
  const invalidRef = reference !== '' && !CONTACT_REF_PATTERN.test(reference);
  const window = reportWindow(days);
  const enabled = process.env.NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED === 'true';
  let report: Report | null = null;
  let error = '';
  if (enabled && !invalidRef) {
    try {
      const result = await createAdminClient().rpc('whatsapp_contact_report', {
        p_start: window.start, p_end: window.end, p_page: page, p_reference: reference || null,
      }).abortSignal(AbortSignal.timeout(8000));
      if (result.error || !result.data) error = 'No se pudieron consultar los registros. Revisa la migración y la conexión; esto no significa que haya cero contactos.';
      else report = result.data as Report;
    } catch { error = 'No hay conexión con el registro de contactos. Inténtalo de nuevo.'; }
  }
  const pageHref = (n: number) => `?${new URLSearchParams({ days: String(days), page: String(n), ...(reference ? { ref: reference } : {}) })}`;
  return <div className={s.root}>
    <div className={s.shell}>
      <Link href="/dashboard/admin" className={s.back}>← Volver a mi panel</Link>
      <header className={s.header}><div><p className={s.eyebrow}>WELEARN / CONTACTOS</p><h1>¿De dónde te escriben?</h1>
        <p>La página que despertó el interés, el canal de llegada y la evidencia del contacto.</p></div>
        <span className={s.private}>Solo administración</span></header>
      <form className={s.filters}>
        <label>Período<select name="days" defaultValue={days}><option value="1">Hoy</option><option value="7">Últimos 7 días</option><option value="30">Últimos 30 días</option><option value="90">Últimos 90 días</option></select></label>
        <label>Buscar referencia<input name="ref" defaultValue={reference} placeholder="WL-… (opcional)" maxLength={27} /></label>
        <button type="submit">Consultar / actualizar</button>
        <Link href="/dashboard/admin/contactos">Limpiar filtros</Link>
      </form>
      <p className={s.caption}>Hora de Colombia · {date(window.start)} — {date(window.end)}. Datos consultados al abrir o actualizar esta vista.</p>
      {!enabled && <section className={s.notice}><h2>Activación pendiente</h2><p>Esta vista está preparada, pero la captura aún está desactivada. Se requiere la migración y activar NEXT_PUBLIC_WHATSAPP_ATTRIBUTION_ENABLED en el despliegue. No se muestran cifras simuladas.</p></section>}
      {invalidRef && <p role="alert" className={s.notice}>La referencia debe empezar por WL- y contener los 24 caracteres que la acompañan.</p>}
      {error && <p role="alert" className={s.notice}>{error}</p>}
      {report && <>
        <section className={s.stats} aria-label="Resumen del período">
          <article><p>Clics hacia WhatsApp</p><strong>{report.clicks}</strong><small>{report.context_menus} aperturas de menú contextual, contadas aparte</small></article>
          <article><p>Referencias confirmadas</p><strong>{report.confirmed}</strong><small>De {report.total} intenciones del período. No son personas únicas.</small></article>
          <article><p>Mensajes recibidos vía API</p><strong>{report.messages}</strong><small>{report.unattributed_messages} sin origen enlazado · no incluye confirmaciones manuales</small></article>
        </section>
        <aside className={s.notice}><strong>Un clic no es un mensaje.</strong> Un origen puede venir de etiquetas UTM, del sitio referido o ser desconocido. “Buscador” es una inferencia, no prueba de SEO. La IA nativa de WhatsApp no confirma mensajes en este panel por sí sola: sin una integración receptora activa, usa la confirmación manual.</aside>
        <section className={s.section}><h2>Páginas que generan interés</h2><p className={s.caption}>Agrupado por página del clic y fuente. Primeros 50 de {report.source_groups} grupos; los totales superiores incluyen todos.</p>
          <div className={s.tableWrap}><table><thead><tr><th>Página</th><th>Fuente</th><th>Intenciones</th><th>Confirmadas</th></tr></thead><tbody>
            {report.sources.map(r => <tr key={`${r.source_page}:${r.source}`}><td>{r.source_page}</td><td>{r.source}</td><td>{r.intents}</td><td>{r.confirmed}</td></tr>)}
            {!report.sources.length && <tr><td colSpan={4}>Todavía no hay registros para este período y filtro.</td></tr>}
          </tbody></table></div>
        </section>
        <section className={s.section}><h2>Rastro de cada contacto</h2><p className={s.caption}>Entrada = primera página de esta visita (30 minutos). Página de contacto = donde abrió WhatsApp.</p>
          <div className={s.tableWrap}><table><thead><tr><th>Fecha / referencia</th><th>Recorrido</th><th>Canal / campaña</th><th>Evidencia</th></tr></thead><tbody>
            {report.rows.map(r => <tr key={r.reference}><td>{date(r.created_at)}<code>{r.reference}</code></td><td><small>Entrada</small>{r.landing_page}<small>Página de contacto</small>{r.source_page}</td><td>{r.channel}<small>Fuente: {r.utm_source ?? r.referrer_host ?? 'No identificada'}</small><small>Medio: {r.utm_medium ?? '—'} · Campaña: {r.utm_campaign ?? '—'}</small><small>Contenido: {r.utm_content ?? '—'}</small></td><td><span className={r.webhook_confirmed || r.manually_confirmed ? s.confirmed : s.pending}>{r.webhook_confirmed ? 'Mensaje con referencia' : r.manually_confirmed ? 'Confirmado por asesor' : r.interaction === 'click' ? 'Solo clic' : 'Solo menú contextual'}</span></td></tr>)}
            {!report.rows.length && <tr><td colSpan={4}>Sin registros en esta página. Cambia el período o elimina el filtro.</td></tr>}
          </tbody></table></div>
          <nav className={s.pagination} aria-label="Páginas de contactos">{page > 1 && <Link href={pageHref(page - 1)}>← Anterior</Link>}<span>Página {page} · {report.total} registros</span>{page * 50 < report.total && <Link href={pageHref(page + 1)}>Siguiente →</Link>}</nav>
        </section>
        <ConfirmContact />
        <section className={s.section}><h2>Mensajes entregados al sitio</h2><p className={s.caption}>Últimos 50 mensajes del período. “Conversación” hereda la última referencia anterior del mismo número; no prueba que ese mensaje concreto naciera en esa página. No se guarda aquí el texto del mensaje.</p>
          <div className={s.tableWrap}><table><thead><tr><th>Fecha / número</th><th>Origen enlazado</th><th>Cómo se atribuyó</th></tr></thead><tbody>
            {report.recent_messages.map(m => <tr key={m.message_id}><td>{date(m.occurred_at)}<small>+{m.wa_id}</small></td><td>{m.source_page ?? 'Sin origen identificado'}<code>{m.reference ?? 'Sin referencia'}</code></td><td>{!m.source_page ? 'Sin coincidencia registrada' : m.method === 'message' ? 'Referencia en el mensaje' : 'Conversación (inferido)'}</td></tr>)}
            {!report.recent_messages.length && <tr><td colSpan={3}>No hay mensajes entregados por la API en este período. Esto no significa que no hayas recibido mensajes en WhatsApp.</td></tr>}
          </tbody></table></div>
        </section>
      </>}
    </div>
  </div>;
}
