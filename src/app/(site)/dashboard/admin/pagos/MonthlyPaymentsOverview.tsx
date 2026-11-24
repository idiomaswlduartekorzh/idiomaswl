'use client';

import { useMemo, useState } from 'react';
import { Download } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { AdminPaymentLedgerRow } from '@/lib/admin-payments/server';
import {
  CURRENCY, money, PAYMENT_MONTHS, shortMoney, summarizePaymentYears, type MonthlyPaymentSource,
} from '@/lib/admin-payments/metrics';
import styles from './payments.module.css';

const SOURCES: Record<MonthlyPaymentSource, string> = {
  historical: 'Historial de Numbers',
  all: 'Todos los pagos',
  online: 'Pagos en línea',
  manual: 'Pagos directos',
};

const COUNT = new Intl.NumberFormat('es-CO');
const average = (cents: number, count: number) => count ? Math.round(cents / count) : 0;

export default function MonthlyPaymentsOverview({ rows, currentMonth, downloadWorkbook }: {
  rows: AdminPaymentLedgerRow[];
  currentMonth: string;
  downloadWorkbook: (cells: (string | number)[][], name: string) => Promise<void>;
}) {
  const [source, setSource] = useState<MonthlyPaymentSource>(() =>
    rows.some(row => row.source === 'historical' && row.status === 'APPROVED') ? 'historical' : 'all');
  const [selectedYear, setSelectedYear] = useState<number>();
  const [exportFailed, setExportFailed] = useState(false);
  const years = useMemo(() => summarizePaymentYears(rows, source), [rows, source]);
  const year = years.find(item => item.year === selectedYear) ?? years[0];
  const sourceTotal = years.reduce((sum, item) => sum + item.amountInCents, 0);
  const monthIsFuture = (year: number, index: number) => `${year}-${String(index + 1).padStart(2, '0')}` > currentMonth;
  const chart = year?.months.map((month, index) => ({
    label: PAYMENT_MONTHS[index].slice(0, 3),
    amount: monthIsFuture(year.year, index) && !month.count ? null : month.amountInCents / 100,
  }));

  async function exportMonthly() {
    setExportFailed(false);
    const cells = [
      ['Año', 'Mes', 'Origen', 'Pagos', 'Recaudo COP', 'Pago promedio COP'],
      ...years.flatMap(item => item.months.flatMap((month, index) =>
        monthIsFuture(item.year, index) && !month.count ? [] : [[
          item.year, index + 1, SOURCES[source], month.count,
          month.amountInCents / 100, average(month.amountInCents, month.count) / 100,
        ]])),
    ];
    try {
      await downloadWorkbook(cells, `idiomaswl-pagos-por-mes-${source}`);
    } catch {
      setExportFailed(true);
    }
  }

  return (
    <section className={`${styles.panel} ${styles.monthlyOverview}`} aria-labelledby="payments-monthly-heading">
      <div className={styles.monthlyHeader}>
        <div>
          <h2 id="payments-monthly-heading">Pagos por mes y año</h2>
          <p>Recaudo bruto en COP · Solo pagos aprobados</p>
        </div>
        <div className={styles.monthlyControls}>
          <label>Origen<select value={source} onChange={event => {
            setSource(event.target.value as MonthlyPaymentSource);
            setSelectedYear(undefined);
            setExportFailed(false);
          }}>
            {Object.entries(SOURCES).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select></label>
          <label>Año<select value={year?.year ?? ''} disabled={!years.length}
            onChange={event => setSelectedYear(Number(event.target.value))}>
            {!years.length && <option value="">Sin datos</option>}
            {years.map(item => <option key={item.year} value={item.year}>{item.year}</option>)}
          </select></label>
          <button type="button" className={styles.secondaryButton} disabled={!year} onClick={exportMonthly}>
            <Download size={15} /> Excel por mes
          </button>
        </div>
      </div>
      {exportFailed && <p className={styles.errorMessage} role="status">No se pudo descargar el resumen mensual.</p>}
      {year ? <>
        <dl className={styles.monthlyTotals}>
          <div><dt>Total de {year.year}</dt><dd>{money(year.amountInCents)}</dd></div>
          <div><dt>Pagos de {year.year}</dt><dd>{COUNT.format(year.count)}</dd></div>
          <div><dt>Pago promedio</dt><dd>{money(average(year.amountInCents, year.count))}</dd></div>
          <div><dt>Total del origen · todos los años</dt><dd>{money(sourceTotal)}</dd></div>
        </dl>
        <div className={styles.monthlyLayout}>
          <div className={styles.monthlyChart}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} accessibilityLayer margin={{ top: 12, right: 8, left: 0, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e2da" />
                <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={10} />
                <YAxis domain={[0, 'auto']} tickFormatter={value => shortMoney(Number(value) * 100)}
                  tickLine={false} axisLine={false} fontSize={10} width={59} />
                <Tooltip formatter={value => CURRENCY.format(Number(value))}
                  labelFormatter={label => PAYMENT_MONTHS.find(month => month.startsWith(String(label))) ?? label}
                  cursor={{ fill: '#f6f1eb' }} />
                <Bar dataKey="amount" name="Recaudo" fill="#b86631" radius={[5, 5, 0, 0]} maxBarSize={42} isAnimationActive={false} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className={`${styles.tableWrap} ${styles.monthlyTable}`}>
            <table aria-label={`Pagos por mes de ${year.year}`}>
              <thead><tr><th scope="col">Mes</th><th scope="col">Pagos</th><th scope="col">Recaudo COP</th></tr></thead>
              <tbody>{year.months.map((month, index) => {
                const future = monthIsFuture(year.year, index) && !month.count;
                return <tr key={PAYMENT_MONTHS[index]}>
                  <th scope="row">{PAYMENT_MONTHS[index]}</th>
                  <td>{future ? '—' : COUNT.format(month.count)}</td>
                  <td>{future ? '—' : money(month.amountInCents)}</td>
                </tr>;
              })}</tbody>
            </table>
          </div>
        </div>
        <details className={styles.annualTotals}>
          <summary>Totales por año</summary>
          <div className={`${styles.tableWrap} ${styles.monthlyTable}`}>
            <table aria-label="Totales anuales del origen seleccionado">
              <thead><tr><th scope="col">Año</th><th scope="col">Pagos</th><th scope="col">Recaudo COP</th></tr></thead>
              <tbody>{years.map(item => <tr key={item.year}>
                <th scope="row">{item.year}</th><td>{COUNT.format(item.count)}</td><td>{money(item.amountInCents)}</td>
              </tr>)}</tbody>
            </table>
          </div>
        </details>
      </> : <p className={styles.empty}>Aún no hay pagos aprobados para este origen.</p>}
    </section>
  );
}
