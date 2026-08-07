'use client';

import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  BookOpenCheck,
  Brain,
  ClipboardList,
  Route,
  ShieldCheck,
  Target,
  Timer,
  Zap,
} from 'lucide-react';
import { ICFES_SMART_BANK_SUMMARY } from '@/data/icfes-smart-route';
import IcfesAdaptiveGame from './IcfesAdaptiveGame';
import IcfesSmartRoute from './IcfesSmartRoute';

type ActiveTool = 'hub' | 'quick' | 'smart';

const ICFES_COLOR = '#dc2626';
const SMART_COLOR = '#0f3d8c';

function ToolCard({
  color,
  icon,
  eyebrow,
  title,
  description,
  stats,
  cta,
  href,
  onClick,
}: {
  color: string;
  icon: ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  stats: string[];
  cta: string;
  href?: string;
  onClick?: () => void;
}) {
  const body = (
    <>
      <div className="wl-catalog-card__bar" />
      <div className="wl-catalog-card__body">
        <div className="wl-catalog-card__top">
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: `${color}12`,
              border: `1px solid ${color}30`,
              color,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            {icon}
          </div>
          <span className="wl-catalog-card__badge" style={{ background: `${color}10`, color, borderColor: `${color}30` }}>
            Disponible
          </span>
        </div>
        <p style={{ margin: '0 0 0.25rem', color, fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {eyebrow}
        </p>
        <h2 className="wl-catalog-card__name">{title}</h2>
        <p className="wl-catalog-card__tagline" style={{ minHeight: 62 }}>{description}</p>
        <div className="wl-catalog-card__stats">
          {stats.map((stat) => (
            <span key={stat} style={{ border: '1px solid var(--line-soft)', borderRadius: 999, padding: '0.18rem 0.5rem', background: 'var(--bg-2)' }}>
              {stat}
            </span>
          ))}
        </div>
      </div>
      <div className="wl-catalog-card__footer">
        <span>{cta}</span>
        <span className="wl-catalog-card__cta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          Abrir <ArrowRight size={14} />
        </span>
      </div>
    </>
  );

  const cardStyle = {
    '--exam-color': color,
    textAlign: 'left',
    cursor: 'pointer',
    margin: 0,
    padding: 0,
    font: 'inherit',
    color: 'inherit',
  } as CSSProperties;

  if (href) {
    return (
      <Link
        href={href}
        className="wl-catalog-card"
        style={{ ...cardStyle, textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
      >
        {body}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="wl-catalog-card"
      style={{
        ...cardStyle,
        appearance: 'none',
        WebkitAppearance: 'none',
      } as CSSProperties}
    >
      {body}
    </button>
  );
}

export default function IcfesHubClient({ embedded = false }: { embedded?: boolean }) {
  const [activeTool, setActiveTool] = useState<ActiveTool>('hub');

  if (activeTool === 'quick') {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1040 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setActiveTool('hub')} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <ArrowLeft size={16} /> Volver a herramientas
            </button>
            <Link href="/practica/icfes-saber-11/examenes" className="btn btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: ICFES_COLOR, borderColor: ICFES_COLOR, color: '#fff' }}>
              <ClipboardList size={16} /> Cuadernillos divulgados
            </Link>
          </div>
          <div className="wl-card" style={{ padding: 0, overflow: 'hidden', borderRadius: 20 }}>
            <IcfesAdaptiveGame embedded />
          </div>
        </div>
      </section>
    );
  }

  if (activeTool === 'smart') {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 1120 }}>
          <IcfesSmartRoute onBack={() => setActiveTool('hub')} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 980 }}>
        {!embedded && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <span style={{ color: 'var(--ink)' }}>ICFES Saber 11</span>
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <div style={{ maxWidth: 680 }}>
            <p className="eyebrow" style={{ marginBottom: '0.45rem' }}>
              <span className="ink-line" />Saber 11 — Componente de Inglés
            </p>
            {embedded ? (
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.55rem)', letterSpacing: '-0.03em', margin: '0 0 0.65rem', color: 'var(--ink)' }}>
                Refuerzos y rutas adaptativas
              </h2>
            ) : (
              <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.55rem)', letterSpacing: '-0.03em', margin: '0 0 0.65rem', color: 'var(--ink)' }}>
                Elige cómo entrenar para el ICFES
              </h1>
            )}
            <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.65, margin: 0 }}>
              Practica con una sesión rápida, una ruta inteligente o módulos enfocados en sinónimos, inferencia, gramática, conectores y cloze.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.42rem 0.72rem', borderRadius: 999, background: 'rgba(220,38,38,0.08)', color: ICFES_COLOR, border: '1px solid rgba(220,38,38,0.22)', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.72rem' }}>
              <Target size={14} /> Pre A1-B1
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', padding: '0.42rem 0.72rem', borderRadius: 999, background: 'rgba(15,61,140,0.08)', color: SMART_COLOR, border: '1px solid rgba(15,61,140,0.2)', fontFamily: 'var(--mono)', fontWeight: 800, fontSize: '0.72rem' }}>
              <BookOpenCheck size={14} /> {ICFES_SMART_BANK_SUMMARY.total} preguntas
            </span>
          </div>
        </div>

        <div style={{ padding: '0.75rem 1rem', borderRadius: 12, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.16)', marginBottom: '1.4rem', display: 'flex', justifyContent: 'space-between', gap: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.86rem' }}>
            ¿Quieres el recorrido completo? Entrena las 7 partes con 55 preguntas y explicación inmediata.
          </span>
          <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/practica/icfes-saber-11/simulacro-guiado" style={{ color: ICFES_COLOR, fontSize: '0.82rem', fontFamily: 'var(--mono)', fontWeight: 800, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              Abrir simulacro guiado <ArrowRight size={14} />
            </Link>
            <Link href="/practica/icfes-saber-11/examenes" style={{ color: SMART_COLOR, fontSize: '0.78rem', fontFamily: 'var(--mono)', fontWeight: 750, textDecoration: 'none' }}>Ver cuadernillos divulgados</Link>
          </div>
        </div>

        <div className="wl-exams-catalog" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
          <ToolCard
            color={ICFES_COLOR}
            icon={<Zap size={23} />}
            eyebrow="Práctica rápida"
            title="Práctica ICFES actual"
            description="Juego adaptativo con vidas, racha y refuerzo inmediato."
            stats={['4 niveles', '3 vidas', 'feedback inmediato']}
            cta="Comenzar práctica rápida"
            onClick={() => setActiveTool('quick')}
          />
          <ToolCard
            color="#047857"
            icon={<BookOpenCheck size={23} />}
            eyebrow="Gramática y cloze"
            title="Gramática y conjunciones"
            description="Banco adaptativo para tiempos verbales, conectores, preposiciones y cloze con modo docente."
            stats={['56 preguntas', 'modo docente', 'refuerzo por error']}
            cta="Practicar gramática ICFES"
            href="/practica/icfes-saber-11/gramatica-conjunciones"
          />
          <ToolCard
            color="#7c3aed"
            icon={<Brain size={23} />}
            eyebrow="Lectura fina"
            title="Sinónimos e inferencia"
            description="Entrena vocabulario en contexto, paráfrasis e inferencias con explicación inmediata."
            stats={['sinónimos', 'paráfrasis', 'repaso de errores']}
            cta="Practicar sinónimos"
            href="/practica/icfes-saber-11/sinonimos-inferencia"
          />
          <ToolCard
            color={SMART_COLOR}
            icon={<Route size={23} />}
            eyebrow="Ruta adaptativa"
            title="Ruta ICFES Inteligente"
            description="Entrena habilidades, sube de nivel y recibe refuerzo según tus errores."
            stats={['diagnóstico', '6 niveles', `${ICFES_SMART_BANK_SUMMARY.total} preguntas`]}
            cta="Empezar ruta inteligente"
            onClick={() => setActiveTool('smart')}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: '0.75rem', marginTop: '1.2rem' }}>
          {[
            { icon: <Brain size={18} />, label: 'Refuerzo por errores', text: 'Inserta práctica extra cuando una habilidad falla repetidamente.' },
            { icon: <Timer size={18} />, label: 'Velocidad lectora', text: 'Detecta respuestas apresuradas, lentas o inseguras.' },
            { icon: <BarChart3 size={18} />, label: 'Reporte accionable', text: 'Muestra precisión, tiempo promedio, fortalezas y debilidades.' },
            { icon: <ShieldCheck size={18} />, label: 'Progreso guardado', text: 'Conserva diagnóstico, historial, errores y reportes en este dispositivo.' },
          ].map((item) => (
            <div key={item.label} className="wl-card" style={{ padding: '1rem', borderRadius: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: SMART_COLOR, marginBottom: '0.45rem' }}>
                {item.icon}
                <strong style={{ color: 'var(--ink)', fontSize: '0.92rem' }}>{item.label}</strong>
              </div>
              <p style={{ margin: 0, color: 'var(--muted)', lineHeight: 1.5, fontSize: '0.82rem' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
