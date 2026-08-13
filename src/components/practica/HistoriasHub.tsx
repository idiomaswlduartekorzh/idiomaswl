// ─── Hub de Historias ─────────────────────────────────────────────────────────
// La misma página para los ocho idiomas: lista las historias del idioma y marca
// cuáles ya tienen audio y cuáles están todavía en grabación. Es un componente
// de servidor: no hay estado, solo enlaces.

import Link from 'next/link';
import type { HistoriaLang } from '@/data/practica/historias/types';
import { hasAudio, totalQuestions } from '@/data/practica/historias/types';
import { HISTORIA_LANGS, getHistorias } from '@/data/practica/historias';

export default function HistoriasHub({ lang }: { lang: HistoriaLang }) {
  const meta = HISTORIA_LANGS[lang];
  const historias = getHistorias(lang);
  const base = `/practica/${lang}`;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 840 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href={base} style={{ color: 'var(--muted)', textDecoration: 'none' }}>{meta.flag} {meta.label}</Link>
          <span>/</span>
          <span style={{ color: 'var(--ink)' }}>Historias</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
          <span className="ink-line" />{meta.flag} {meta.hubTitle}
        </p>
        <h1 style={{ fontSize: '2.2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Historias</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          Un conflicto real contado por las dos personas que lo vivieron. Lees al narrador,
          escuchas las dos notas de voz y decides tú quién tiene razón. Lectura, escucha,
          vocabulario en contexto e inferencia en un mismo ejercicio.
        </p>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '2.25rem' }}>
          {['📖 Lectura', '🎙 Escucha', '🔤 Vocabulario en contexto', '🔍 Inferencia', '🎭 Tono y registro', '🧠 Pensamiento crítico'].map(tag => (
            <span key={tag} style={{ fontSize: '0.75rem', padding: '0.25rem 0.7rem', borderRadius: 20, background: `${meta.color}0f`, color: meta.color, border: `1px solid ${meta.color}33`, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {historias.map(h => {
            const ready = hasAudio(h);
            return (
              <Link key={h.slug} href={`${base}/historias/${h.slug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.25rem',
                  padding: '1.2rem 1.5rem',
                  border: `1.5px solid ${h.color}47`,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${h.color}0f 0%, transparent 100%)`,
                }}>
                  <div style={{
                    width: 58, height: 58, borderRadius: 14, flexShrink: 0,
                    background: h.color, color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem',
                  }}>{h.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--ink)' }}>{h.title}</span>
                      <span style={{ fontSize: '0.6rem', fontWeight: 800, background: h.color, color: '#fff', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>{h.level}</span>
                      {!ready && (
                        <span style={{ fontSize: '0.6rem', fontWeight: 800, background: 'rgba(245,158,11,0.14)', color: '#d97706', border: '1px solid rgba(245,158,11,0.4)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>AUDIO EN GRABACIÓN</span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{h.tagline}</p>
                    <p style={{ margin: '0.4rem 0 0', fontSize: '0.73rem', color: h.color, fontFamily: 'var(--mono)', fontWeight: 700 }}>
                      {ready ? '2 audios' : '2 audios en producción'} · {totalQuestions(h)} preguntas · transcripción interactiva
                    </p>
                  </div>
                  <span style={{ fontSize: '1.2rem', color: h.color, fontWeight: 700, flexShrink: 0 }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.65 }}>
          Las historias marcadas como <strong style={{ color: '#d97706' }}>audio en grabación</strong> se pueden hacer
          completas por escrito: narrador, transcripción con clic para traducir y las preguntas. Cuando la grabación
          esté lista aparece en esta misma página, sin cambiar de enlace.
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link href={base} className="btn btn-ghost" style={{ fontSize: '0.9rem' }}>← {meta.flag} {meta.label}</Link>
        </div>
      </div>
    </section>
  );
}
