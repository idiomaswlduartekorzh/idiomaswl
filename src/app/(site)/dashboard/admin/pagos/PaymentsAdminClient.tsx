'use client';

import Link from 'next/link';
import { useActionState, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Clipboard,
  CreditCard,
  DollarSign,
  Download,
  ExternalLink,
  FilePlus2,
  Link2,
  RefreshCw,
  Search,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type {
  AdminPaymentLedgerRow,
  AdminPaymentLedgerStatus,
  AdminPaymentLinkRow,
  AdminPaymentsData,
} from '@/lib/admin-payments/server';
import { bogotaDay } from '@/lib/admin-operations/agenda';
import { createPaymentLinkAction } from './actions';
import { RecordedPaymentForms, VoidRecordedPayment } from './RecordedPaymentForms';
import { INITIAL_CREATE_PAYMENT_LINK_STATE } from './state';
import styles from './payments.module.css';

const SOURCE_LABELS: Record<AdminPaymentLedgerRow['source'], string> = {
  plans: 'Planes',
  courses: 'Clases',
  xpress: 'Xpress',
  icfes: 'ICFES',
  toefl: 'TOEFL',
  custom_link: 'Link personalizado',
  manual: 'Pago manual',
  historical: 'Historial de Numbers',
};

const STATUS_LABELS: Record<AdminPaymentLedgerStatus, string> = {
  CREATED: 'Creado',
  PENDING: 'En proceso',
  APPROVED: 'Aprobado',
  DECLINED: 'Rechazado',
  VOIDED: 'Anulado',
  ERROR: 'Error',
  EXPIRED: 'Vencido',
};

const LINK_STATUS_LABELS: Record<AdminPaymentLinkRow['status'], string> = {
  CREATING: 'Creando',
  ACTIVE: 'Activo',
  PAID: 'Pagado',
  VOIDED: 'Anulado',
  EXPIRED: 'Vencido',
  CANCELLED: 'Cancelado',
  ERROR: 'Error',
};

const CURRENCY = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function money(cents: number): string {
  return CURRENCY.format(cents / 100);
}

function shortMoney(cents: number): string {
  const pesos = cents / 100;
  if (pesos >= 1_000_000) return `$${(pesos / 1_000_000).toFixed(pesos % 1_000_000 ? 1 : 0)} M`;
  if (pesos >= 1_000) return `$${Math.round(pesos / 1_000)} mil`;
  return `$${pesos}`;
}

function formatDate(value: string): string {
  return new Date(value).toLocaleString('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  });
}

function monthKey(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    year: 'numeric',
    month: '2-digit',
    timeZone: 'America/Bogota',
  }).format(date);
}

function monthLabel(key: string): string {
  const [year, month] = key.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, 15)).toLocaleDateString('es-CO', {
    month: 'short',
    year: '2-digit',
    timeZone: 'UTC',
  });
}

function paymentDate(row: AdminPaymentLedgerRow): string {
  if (row.paidOn) return row.paidOn;
  if (row.sourcePeriod) return `${row.sourcePeriod.slice(0, 7)} · día sin registrar`;
  return formatDate(row.paidAt ?? row.observedAt);
}

function ledgerExportRows(rows: AdminPaymentLedgerRow[]): (string | number)[][] {
  const header = [
    'Fecha del movimiento', 'Periodo de origen', 'Estado', 'Origen', 'Concepto', 'Cliente', 'Correo', 'Teléfono',
    'Valor COP', 'Método', 'Referencia', 'ID Wompi', 'Ambiente',
  ];
  return [
    header,
    ...rows.map(row => [
      row.paidOn ?? (row.sourcePeriod ? '' : row.paidAt ?? row.observedAt),
      row.sourcePeriod?.slice(0, 7) ?? '',
      STATUS_LABELS[row.status],
      SOURCE_LABELS[row.source],
      row.description,
      row.customerName ?? '',
      row.customerEmail ?? '',
      row.customerPhone ?? '',
      row.amountInCents / 100,
      row.paymentMethodType ?? '',
      row.reference,
      row.providerId ?? '',
      row.environment,
    ]),
  ];
}

function csvCell(value: string | number): string {
  const text = String(value);
  const safe = typeof value === 'string' && /^(?:[\s\uFEFF]*[=+@-]|[\t\r\n])/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

async function exportLedger(rows: AdminPaymentLedgerRow[], format: 'xlsx' | 'csv'): Promise<void> {
  const cells = ledgerExportRows(rows);
  let file: Blob;
  if (format === 'xlsx') {
    const { makePaymentWorkbook } = await import('@/lib/admin-operations/payment-workbook');
    file = makePaymentWorkbook(cells);
  } else {
    const content = cells.map(row => row.map(csvCell).join(',')).join('\r\n');
    file = new Blob([`\uFEFF${content}`], { type: 'text/csv;charset=utf-8' });
  }
  const url = URL.createObjectURL(file);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `idiomaswl-pagos-${bogotaDay()}.${format}`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function latestByPayment(rows: AdminPaymentLedgerRow[]): AdminPaymentLedgerRow[] {
  const latest = new Map<string, AdminPaymentLedgerRow>();
  for (const row of [...rows].sort((a, b) => Date.parse(b.observedAt) - Date.parse(a.observedAt))) {
    const key = `${row.source}:${row.reference}`;
    if (!latest.has(key)) latest.set(key, row);
  }
  return Array.from(latest.values());
}

function StatusBadge({ status }: { status: AdminPaymentLedgerStatus }) {
  return <span className={`${styles.badge} ${styles[`status${status}`]}`}>{STATUS_LABELS[status]}</span>;
}

function CopyButton({ url, onCopy, copied }: { url: string; onCopy: (url: string) => void; copied: boolean }) {
  return (
    <button type="button" className={styles.copyButton} onClick={() => onCopy(url)}>
      {copied ? <CheckCircle2 size={15} /> : <Clipboard size={15} />}
      {copied ? 'Copiado' : 'Copiar link'}
    </button>
  );
}

export default function PaymentsAdminClient({
  data,
  adminEmail,
  owner,
  manualRequestId,
}: {
  data: AdminPaymentsData;
  adminEmail: string;
  owner: boolean;
  manualRequestId: string;
}) {
  const [environment, setEnvironment] = useState(data.currentEnvironment);
  const [status, setStatus] = useState<'all' | AdminPaymentLedgerStatus>('all');
  const [source, setSource] = useState<'all' | AdminPaymentLedgerRow['source']>('all');
  const [period, setPeriod] = useState<'30' | '90' | 'all'>('90');
  const [query, setQuery] = useState('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [amountPreview, setAmountPreview] = useState(0);
  const [exportError, setExportError] = useState(false);
  const [rowLimit, setRowLimit] = useState(75);
  const [formState, formAction, formPending] = useActionState(
    createPaymentLinkAction,
    INITIAL_CREATE_PAYMENT_LINK_STATE,
  );

  const environmentRows = useMemo(
    () => data.ledger.filter(row => row.environment === environment),
    [data.ledger, environment],
  );
  const latestPayments = useMemo(() => latestByPayment(environmentRows), [environmentRows]);
  const approved = useMemo(
    () => environmentRows.filter(row => row.status === 'APPROVED'),
    [environmentRows],
  );
  const generatedAtTimestamp = Date.parse(data.generatedAt);
  const approvedGross = approved.reduce((sum, row) => sum + row.amountInCents, 0);
  const currentMonth = monthKey(new Date(data.generatedAt));
  const approvedThisMonth = approved
    .filter(row => monthKey(new Date(row.paidAt ?? row.observedAt)) === currentMonth)
    .reduce((sum, row) => sum + row.amountInCents, 0);
  const averageTicket = approved.length ? Math.round(approvedGross / approved.length) : 0;
  const receivableRows = latestPayments.filter(row => row.status === 'CREATED' || row.status === 'PENDING');
  const receivableTotal = receivableRows.reduce((sum, row) => sum + row.amountInCents, 0);
  const onlinePayments = latestPayments.filter(row => !row.sourcePeriod);
  const approvedReferences = new Set(approved.filter(row => !row.sourcePeriod).map(row => `${row.source}:${row.reference}`)).size;
  const conversion = onlinePayments.length
    ? Math.round((approvedReferences / onlinePayments.length) * 100)
    : 0;
  const reconciliationAlerts = onlinePayments.filter(row => {
    if (row.status === 'ERROR' || row.status === 'VOIDED') return true;
    return row.status === 'PENDING' && generatedAtTimestamp - Date.parse(row.observedAt) > 86_400_000;
  });

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const cutoff = period === 'all'
      ? 0
      : generatedAtTimestamp - Number(period) * 86_400_000;
    return environmentRows.filter(row => {
      if (status !== 'all' && row.status !== status) return false;
      if (source !== 'all' && row.source !== source) return false;
      if (cutoff && Date.parse(row.paidAt ?? row.observedAt) < cutoff) return false;
      if (!normalizedQuery) return true;
      return [
        row.reference,
        row.providerId,
        row.description,
        row.customerName,
        row.customerEmail,
        row.customerPhone,
        row.paymentMethodType,
      ].some(value => value?.toLowerCase().includes(normalizedQuery));
    });
  }, [environmentRows, generatedAtTimestamp, period, query, source, status]);

  const monthlyData = useMemo(() => {
    const cursor = new Date(data.generatedAt);
    const keys: string[] = [];
    for (let offset = 5; offset >= 0; offset -= 1) {
      keys.push(monthKey(new Date(cursor.getFullYear(), cursor.getMonth() - offset, 15)));
    }
    const totals = new Map(keys.map(key => [key, 0]));
    for (const row of approved) {
      const key = monthKey(new Date(row.paidAt ?? row.observedAt));
      if (totals.has(key)) totals.set(key, (totals.get(key) ?? 0) + row.amountInCents);
    }
    return keys.map(key => ({ month: monthLabel(key), amount: (totals.get(key) ?? 0) / 100 }));
  }, [approved, data.generatedAt]);

  const paymentMethods = useMemo(() => {
    const methods = new Map<string, { count: number; total: number }>();
    for (const row of approved) {
      const method = row.paymentMethodType ?? 'Sin identificar';
      const current = methods.get(method) ?? { count: 0, total: 0 };
      current.count += 1;
      current.total += row.amountInCents;
      methods.set(method, current);
    }
    return Array.from(methods.entries()).sort((a, b) => b[1].total - a[1].total);
  }, [approved]);

  const visibleLinks = data.links.filter(link => link.environment === environment);

  async function copyLink(url: string) {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    window.setTimeout(() => setCopiedUrl(current => current === url ? null : current), 2_000);
  }

  function download(format: 'xlsx' | 'csv') {
    setExportError(false);
    void exportLedger(visibleRows, format).catch(() => setExportError(true));
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <Link href="/dashboard/admin" className={styles.back}><ArrowLeft size={16} /> Centro operativo</Link>
          <h1>Pagos y finanzas</h1>
          <p>Pagos en línea, cobros directos e historial.</p>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.admin}>{adminEmail}</span>
          <Link href="/dashboard/admin/agenda" className={styles.secondaryButton}>Agenda de clases</Link>
          <button type="button" className={styles.secondaryButton} onClick={() => window.location.reload()}>
            <RefreshCw size={15} /> Actualizar
          </button>
          <button type="button" className={styles.secondaryButton} onClick={() => download('csv')}>Exportar CSV</button>
          <button type="button" className={styles.primaryButton} onClick={() => download('xlsx')}>
            <Download size={15} /> Descargar Excel
          </button>
          {exportError && <p className={styles.errorMessage} role="status">No se pudo generar el archivo. Vuelve a intentarlo.</p>}
        </div>
      </header>

      {data.setupRequired && (
        <section className={styles.warning} role="alert">
          <AlertTriangle size={20} />
          <div><strong>Falta activar el módulo financiero en Supabase.</strong><br />Aplica la migración nueva para habilitar el tracker y los links.</div>
        </section>
      )}
      {!data.wompiConfigured && (
        <section className={styles.warning} role="alert">
          <AlertTriangle size={20} />
          <div><strong>La creación de links está deshabilitada.</strong><br />{data.configurationIssue ?? 'Revisa las credenciales de Wompi.'}</div>
        </section>
      )}

      {owner && !data.recordedPaymentsAvailable && (
        <p className={styles.warning} role="alert">El registro de pagos directos y el historial de Numbers no están disponibles.</p>
      )}
      <div className={styles.environmentBar}>
        <div>
          <span className={styles.environmentLabel}>Ambiente</span>
          <strong>{environment === 'production' ? 'Dinero real' : 'Pruebas sandbox'}</strong>
        </div>
        <div className={styles.segmented}>
          <button type="button" className={environment === 'production' ? styles.activeSegment : ''} onClick={() => setEnvironment('production')}>Producción</button>
          <button type="button" className={environment === 'sandbox' ? styles.activeSegment : ''} onClick={() => setEnvironment('sandbox')}>Sandbox</button>
        </div>
      </div>

      <section className={styles.kpiGrid} aria-label="Indicadores financieros">
        <article className={styles.kpi}>
          <span className={styles.kpiIcon}><DollarSign size={19} /></span>
          <div><p>Ingresos registrados</p><strong>{money(approvedGross)}</strong><small>Bruto histórico · {approved.length} transacciones</small></div>
        </article>
        <article className={styles.kpi}>
          <span className={`${styles.kpiIcon} ${styles.green}`}><TrendingUp size={19} /></span>
          <div><p>Cobrado este mes</p><strong>{money(approvedThisMonth)}</strong><small>Ticket promedio {money(averageTicket)}</small></div>
        </article>
        <article className={styles.kpi}>
          <span className={`${styles.kpiIcon} ${styles.blue}`}><CreditCard size={19} /></span>
          <div><p>Por cobrar / procesando</p><strong>{money(receivableTotal)}</strong><small>{receivableRows.length} referencias abiertas</small></div>
        </article>
        <article className={styles.kpi}>
          <span className={`${styles.kpiIcon} ${reconciliationAlerts.length ? styles.red : styles.green}`}><ShieldCheck size={19} /></span>
          <div><p>Conversión / alertas Wompi</p><strong>{conversion}% <em>· {reconciliationAlerts.length}</em></strong><small>Aprobados por referencia · revisar anomalías</small></div>
        </article>
      </section>

      <section className={styles.twoColumns}>
        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <div><span>Recaudo aprobado</span><h2>Últimos 6 meses</h2></div>
            <small>Valores brutos en COP</small>
          </div>
          <div className={styles.chart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 6, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ece7e1" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                <YAxis tickFormatter={value => shortMoney(Number(value) * 100)} tickLine={false} axisLine={false} fontSize={10} width={58} />
                <Tooltip formatter={value => CURRENCY.format(Number(value))} cursor={{ fill: '#f6f1eb' }} />
                <Bar dataKey="amount" name="Recaudo" fill="#c87941" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTitle}><div><span>Distribución</span><h2>Métodos de pago</h2></div></div>
          <div className={styles.methods}>
            {paymentMethods.length ? paymentMethods.slice(0, 6).map(([method, detail]) => (
              <div key={method} className={styles.methodRow}>
                <span>{method}</span>
                <div><strong>{money(detail.total)}</strong><small>{detail.count} pagos</small></div>
              </div>
            )) : <p className={styles.empty}>Aún no hay pagos aprobados en este ambiente.</p>}
          </div>
          <div className={styles.financeNote}>
            <AlertTriangle size={16} />
            <p>Concilia comisiones, retenciones y desembolsos con los reportes de Wompi y los extractos bancarios.</p>
          </div>
        </article>
      </section>

      {data.recordedPaymentsAvailable && environment === 'production' && (
        <RecordedPaymentForms requestId={manualRequestId} today={bogotaDay(new Date(data.generatedAt))} />
      )}

      <section className={styles.linkSection}>
        <article className={styles.panel}>
          <div className={styles.panelTitle}>
            <div><span>Cobro personalizado</span><h2>Crear un ticket con valor específico</h2></div>
            <FilePlus2 size={22} />
          </div>
          <form action={formAction} className={styles.form}>
            <label className={styles.amountField}>
              <span>Valor a cobrar (COP) *</span>
              <div><b>$</b><input name="amountInCop" type="number" min="1000" max="100000000" step="1000" required placeholder="350000" onChange={event => setAmountPreview(Number(event.target.value) || 0)} /></div>
              <small>{amountPreview ? CURRENCY.format(amountPreview) : 'Escribe pesos completos, sin centavos.'}</small>
            </label>
            <label>
              <span>Concepto del pago *</span>
              <input name="title" required minLength={3} maxLength={150} placeholder="Ej. Saldo curso intensivo de inglés" />
            </label>
            <label className={styles.fullField}>
              <span>Descripción para el cliente</span>
              <textarea name="description" maxLength={500} rows={2} placeholder="Detalle breve de lo que está pagando." />
            </label>
            <label><span>Nombre del cliente</span><input name="customerName" maxLength={120} autoComplete="name" /></label>
            <label><span>Correo</span><input name="customerEmail" type="email" maxLength={254} autoComplete="email" /></label>
            <label><span>WhatsApp / teléfono</span><input name="customerPhone" maxLength={30} autoComplete="tel" placeholder="+57 300 000 0000" /></label>
            <label>
              <span>El link vence en</span>
              <select name="expiresInDays" defaultValue="7">
                <option value="1">1 día</option><option value="3">3 días</option><option value="7">7 días</option><option value="15">15 días</option><option value="30">30 días</option>
              </select>
            </label>
            <label className={styles.fullField}>
              <span>Nota interna</span>
              <textarea name="internalNote" maxLength={1000} rows={2} placeholder="Solo la ve el equipo administrativo." />
            </label>
            <div className={styles.formFooter}>
              <p><ShieldCheck size={15} /> Monto fijo · un solo pago aprobado · ambiente {data.currentEnvironment === 'production' ? 'real' : 'sandbox'}</p>
              <button
                type="submit"
                className={styles.createButton}
                disabled={formPending || data.setupRequired || !data.wompiConfigured || environment !== data.currentEnvironment}
              >
                <Link2 size={17} />
                {formPending
                  ? 'Creando en Wompi…'
                  : environment !== data.currentEnvironment
                    ? `Cambia a ${data.currentEnvironment === 'production' ? 'Producción' : 'Sandbox'} para crear`
                    : 'Crear link de pago'}
              </button>
            </div>
            {formState.message && <p role="status" className={formState.status === 'success' ? styles.successMessage : styles.errorMessage}>{formState.message}</p>}
            {formState.paymentUrl && (
              <div className={styles.createdLink}>
                <code>{formState.paymentUrl}</code>
                <CopyButton url={formState.paymentUrl} onCopy={copyLink} copied={copiedUrl === formState.paymentUrl} />
                <a href={formState.paymentUrl} target="_blank" rel="noreferrer"><ExternalLink size={15} /> Abrir</a>
              </div>
            )}
          </form>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelTitle}><div><span>Tickets</span><h2>Links recientes</h2></div><strong>{visibleLinks.length}</strong></div>
          <div className={styles.linkList}>
            {visibleLinks.length ? visibleLinks.slice(0, 8).map(link => (
              <div key={link.id} className={styles.linkCard}>
                <div className={styles.linkCardTop}>
                  <div><strong>{link.title}</strong><span>{link.customerName || link.customerEmail || 'Cliente sin identificar'}</span></div>
                  <div><b>{money(link.amountInCents)}</b><span className={`${styles.linkBadge} ${styles[`link${link.status}`]}`}>{LINK_STATUS_LABELS[link.status]}</span></div>
                </div>
                <p>Creado {formatDate(link.createdAt)} · vence {formatDate(link.expiresAt)}</p>
                {link.errorMessage && <small className={styles.inlineError}>{link.errorMessage}</small>}
                {link.paymentUrl && <div className={styles.linkActions}><CopyButton url={link.paymentUrl} onCopy={copyLink} copied={copiedUrl === link.paymentUrl} /><a href={link.paymentUrl} target="_blank" rel="noreferrer"><ExternalLink size={14} /> Abrir</a></div>}
              </div>
            )) : <p className={styles.empty}>Todavía no se han creado tickets en este ambiente.</p>}
          </div>
        </article>
      </section>

      <section className={styles.panel}>
        <div className={styles.tableHeader}>
          <div><span>Ledger financiero</span><h2>Movimientos y estados</h2><small>{visibleRows.length} de {environmentRows.length} registros · Excel descarga todos los resultados filtrados</small></div>
          <div className={styles.filters}>
            <label className={styles.search}><Search size={15} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Cliente, referencia o ID…" /></label>
            <select aria-label="Filtrar por estado" value={status} onChange={event => setStatus(event.target.value as typeof status)}><option value="all">Todos los estados</option>{Object.entries(STATUS_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
            <select aria-label="Filtrar por origen" value={source} onChange={event => setSource(event.target.value as typeof source)}><option value="all">Todos los orígenes</option>{Object.entries(SOURCE_LABELS).filter(([value]) => data.recordedPaymentsAvailable || (value !== 'manual' && value !== 'historical')).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
            <select aria-label="Filtrar por periodo" value={period} onChange={event => setPeriod(event.target.value as typeof period)}><option value="30">30 días</option><option value="90">90 días</option><option value="all">Todo</option></select>
          </div>
        </div>
        <div className={styles.tableWrap}>
          <table>
            <thead><tr><th>Fecha</th><th>Estado</th><th>Origen / concepto</th><th>Cliente</th><th>Método</th><th>Valor</th><th>Referencia</th>{data.recordedPaymentsAvailable && <th>Acciones</th>}</tr></thead>
            <tbody>
              {visibleRows.slice(0, rowLimit).map(row => (
                <tr key={row.recordId}>
                  <td>{paymentDate(row)}</td>
                  <td><StatusBadge status={row.status} /></td>
                  <td><strong>{SOURCE_LABELS[row.source]}</strong><small>{row.description}</small></td>
                  <td><strong>{row.customerName || '—'}</strong><small>{row.customerEmail || row.customerPhone || 'Sin datos'}</small></td>
                  <td>{row.paymentMethodType || '—'}</td>
                  <td className={styles.amount}>{money(row.amountInCents)}</td>
                  <td><code title={row.providerId ?? row.reference}>{row.reference}</code></td>
                  {data.recordedPaymentsAvailable && <td>{row.sourcePeriod && row.status === 'APPROVED' && (
                    <VoidRecordedPayment id={row.recordId.slice(row.source.length + 1)} />
                  )}</td>}
                </tr>
              ))}
              {!visibleRows.length && <tr><td colSpan={data.recordedPaymentsAvailable ? 8 : 7} className={styles.emptyTable}>No hay movimientos que coincidan con estos filtros.</td></tr>}
            </tbody>
          </table>
        </div>
        {visibleRows.length > rowLimit && (
          <button className={styles.secondaryButton} type="button" onClick={() => setRowLimit(limit => limit + 75)}>Ver más movimientos</button>
        )}
      </section>

      <footer className={styles.footer}>
        <p>Última lectura: {formatDate(data.generatedAt)}. Los pagos en línea se actualizan con eventos verificados de Wompi.</p>
        <p>Para contabilidad formal, cruza este tracker con desembolsos, comisiones, retenciones y extractos bancarios.</p>
      </footer>
    </div>
  );
}
