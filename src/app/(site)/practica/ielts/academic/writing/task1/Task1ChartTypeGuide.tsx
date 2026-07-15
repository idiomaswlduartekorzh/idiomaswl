'use client';

import Link from 'next/link';

const CHART_TYPES = [
  {
    name: 'Line graph',
    route: '/practica/ielts/academic/writing/task1/graficos-lineales',
    useFor: 'Cambios en el tiempo',
    overview: 'Busca tendencia dominante, cruce de líneas, pico, caída o convergencia.',
    body: 'Agrupa por periodos: inicio, cambio rápido, estabilización o cierre.',
    language: 'rose steadily, peaked at, declined gradually, overtook, remained stable',
  },
  {
    name: 'Bar chart',
    route: '/practica/ielts/academic/writing/task1/graficos-de-barras',
    useFor: 'Comparaciones entre categorías',
    overview: 'Busca la categoría más alta/baja y el contraste más claro.',
    body: 'Agrupa categorías similares; no describas barra por barra.',
    language: 'higher than, whereas, considerably lower, the largest proportion',
  },
  {
    name: 'Pie charts',
    route: '/practica/ielts/academic/writing/task1/pie-charts',
    useFor: 'Partes de un total',
    overview: 'Busca el segmento dominante y cómo cambia la distribución si hay dos gráficos.',
    body: 'Compara proporciones grandes vs pequeñas; evita sumar todo.',
    language: 'accounted for, made up, represented, the smallest share',
  },
  {
    name: 'Table',
    route: '/practica/ielts/academic/writing/task1/tablas',
    useFor: 'Datos densos por filas/columnas',
    overview: 'Busca extremos, patrones por fila/columna y categorías que se agrupan.',
    body: 'Convierte la tabla en 2 grupos lógicos antes de escribir.',
    language: 'the figure for, respectively, by contrast, across all categories',
  },
  {
    name: 'Process diagram',
    route: '/practica/ielts/academic/writing/task1/procesos',
    useFor: 'Etapas de producción o ciclo',
    overview: 'Menciona número de etapas y si el proceso es lineal o cíclico.',
    body: 'Usa voz pasiva y orden temporal; no inventes razones.',
    language: 'is collected, is heated, after this, subsequently, finally',
  },
  {
    name: 'Map',
    route: '/practica/ielts/academic/writing/task1/mapas',
    useFor: 'Cambios espaciales antes/después',
    overview: 'Busca desarrollo general: urbanización, reemplazos, expansión o reducción.',
    body: 'Divide por zonas: norte/sur/centro o antes/después.',
    language: 'was replaced by, was converted into, to the north of, adjacent to',
  },
  {
    name: 'Mixed chart',
    route: '/practica/ielts/academic/writing/task1/tarea-completa',
    useFor: 'Dos visuales conectados',
    overview: 'Encuentra la relación entre ambos visuales, no los trates como tareas separadas.',
    body: 'Un párrafo por visual o por relación común, según el caso.',
    language: 'while, in relation to, this corresponded with, a similar pattern',
  },
];

export default function Task1ChartTypeGuide() {
  return (
    <section style={{ margin: '1.75rem 0 2rem' }}>
      <p className="eyebrow" style={{ marginBottom: '0.75rem' }}>
        <span className="ink-line" />Tipos de gráfico en Task 1
      </p>
      <div style={{ border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ padding: '1rem 1.15rem', background: 'rgba(15,61,140,0.06)', borderBottom: '1px solid var(--line-soft)' }}>
          <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.08rem', letterSpacing: 0 }}>
            Antes de practicar subhabilidades, identifica el tipo de visual.
          </h2>
          <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.6, fontSize: '0.92rem' }}>
            La estructura de respuesta cambia según el input: una línea pide tendencia, una tabla pide agrupación,
            un proceso pide secuencia y un mapa pide transformación espacial. Esta tarjeta es el puente entre
            formato oficial IELTS y estrategia WeLearn.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
          {CHART_TYPES.map((type) => (
            <article key={type.name} style={{ padding: '1rem', borderRight: '1px solid var(--line-soft)', borderBottom: '1px solid var(--line-soft)' }}>
              <h3 style={{ margin: '0 0 0.25rem', fontSize: '0.98rem' }}>{type.name}</h3>
              <p style={{ margin: '0 0 0.55rem', color: '#0f3d8c', fontWeight: 800, fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>
                {type.useFor}
              </p>
              <p style={{ margin: '0 0 0.4rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong>Overview:</strong> {type.overview}
              </p>
              <p style={{ margin: '0 0 0.55rem', color: 'var(--ink-2)', lineHeight: 1.55, fontSize: '0.84rem' }}>
                <strong>Cuerpo:</strong> {type.body}
              </p>
              <p style={{ margin: '0 0 0.65rem', color: 'var(--muted)', lineHeight: 1.55, fontSize: '0.78rem', fontFamily: 'var(--mono)' }}>
                {type.language}
              </p>
              <Link href={type.route} style={{ color: '#0f3d8c', fontWeight: 800, fontSize: '0.82rem', textDecoration: 'none' }}>
                Practicar este tipo →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
