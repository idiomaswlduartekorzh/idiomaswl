'use client';

import { useState } from 'react';

export interface Submission {
  id: string;
  username: string;
  email: string | null;
  nivel: string;
  texto_id: string;
  quiz_level: string;
  audio_url: string;
  respuestas: (string | boolean | string[])[] | null;
  created_at: string;
}

const NIVEL_COLORS: Record<string, string> = {
  A1: '#059669', A2: '#534AB7', B1: '#d97706',
};
const QUIZ_COLORS: Record<string, string> = {
  principiante: '#059669', intermedio: '#534AB7', avanzado: '#e11d48',
};
const TEXT_TITLES: Record<string, string> = {
  'a1-1': 'Presentarse',        'a1-2': 'Rutina diaria',       'a1-3': 'En el restaurante',
  'a2-1': 'Planes fin de sem.', 'a2-2': 'Mi apartamento',      'a2-3': 'Clima y estaciones',
  'b1-1': 'Experiencias viaje', 'b1-2': 'Ciudad vs campo',     'b1-3': 'Aprendizaje idiomas',
};

export default function AudiosAdmin({
  initialSubmissions, total, newCount,
}: {
  initialSubmissions: Submission[];
  total: number;
  newCount: number;
}) {
  const [submissions] = useState<Submission[]>(initialSubmissions);
  const [filterNivel, setFilterNivel]   = useState('all');
  const [filterDate,  setFilterDate]    = useState('all');
  const [expanded,    setExpanded]      = useState<string | null>(null);
  const [playing,     setPlaying]       = useState<string | null>(null);

  const now = Date.now();
  const filtered = submissions.filter(s => {
    if (filterNivel !== 'all' && s.nivel !== filterNivel) return false;
    if (filterDate === '24h' && Date.now() - new Date(s.created_at).getTime() > 86_400_000) return false;
    if (filterDate === '7d'  && Date.now() - new Date(s.created_at).getTime() > 7 * 86_400_000) return false;
    return true;
  });

  function formatDate(iso: string) {
    const d = new Date(iso);
    return d.toLocaleDateString('es-CO', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
  }

  return (
    <div style={{ padding:'2rem', maxWidth:1100, margin:'0 auto' }}>

      {/* Header */}
      <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem', marginBottom:'2rem' }}>
        <div>
          <p style={{ margin:'0 0 0.25rem', fontSize:'0.72rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--muted)' }}>
            Panel de administración
          </p>
          <h1 style={{ margin:0, fontSize:'1.8rem', fontWeight:900, color:'var(--ink)' }}>
            Audios del Ciclo Coreano
          </h1>
          <p style={{ margin:'0.4rem 0 0', color:'var(--muted)', fontSize:'0.9rem' }}>
            {total} envíos en total
          </p>
        </div>
        <div style={{ display:'flex', gap:'0.75rem', alignItems:'center', flexWrap:'wrap' }}>
          {newCount > 0 && (
            <div style={{
              padding:'0.5rem 1rem', borderRadius:10,
              background:'rgba(225,29,72,0.1)', border:'1.5px solid rgba(225,29,72,0.3)',
              fontSize:'0.85rem', fontWeight:800, color:'#e11d48',
            }}>
              🔴 {newCount} nuevos (últimas 24h)
            </div>
          )}
          <a href="/dashboard/admin" className="btn btn-ghost btn-sm" style={{ fontSize:'0.82rem' }}>
            ← Volver al panel
          </a>
        </div>
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'0.75rem', flexWrap:'wrap', marginBottom:'1.5rem', padding:'1rem 1.25rem', borderRadius:14, background:'var(--bg-2,rgba(0,0,0,0.02))', border:'1px solid var(--line-soft)' }}>
        <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)', whiteSpace:'nowrap' }}>Nivel:</span>
          {['all','A1','A2','B1'].map(v => (
            <button key={v} onClick={() => setFilterNivel(v)}
              style={{
                padding:'0.3rem 0.7rem', borderRadius:8, fontSize:'0.8rem', fontWeight:700,
                background: filterNivel === v ? '#534AB7' : 'var(--bg)',
                border:`1.5px solid ${filterNivel === v ? '#534AB7' : 'var(--line-soft)'}`,
                color: filterNivel === v ? '#fff' : 'var(--ink)',
                cursor:'pointer', fontFamily:'inherit',
              }}>{v === 'all' ? 'Todos' : v}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:'0.4rem', alignItems:'center' }}>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)', whiteSpace:'nowrap' }}>Fecha:</span>
          {[{v:'all',l:'Todo'},{v:'24h',l:'Últimas 24h'},{v:'7d',l:'Última semana'}].map(({v,l}) => (
            <button key={v} onClick={() => setFilterDate(v)}
              style={{
                padding:'0.3rem 0.7rem', borderRadius:8, fontSize:'0.8rem', fontWeight:700,
                background: filterDate === v ? '#534AB7' : 'var(--bg)',
                border:`1.5px solid ${filterDate === v ? '#534AB7' : 'var(--line-soft)'}`,
                color: filterDate === v ? '#fff' : 'var(--ink)',
                cursor:'pointer', fontFamily:'inherit',
              }}>{l}</button>
          ))}
        </div>
        <div style={{ marginLeft:'auto', fontSize:'0.82rem', color:'var(--muted)', alignSelf:'center' }}>
          Mostrando {filtered.length} de {submissions.length}
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div style={{ textAlign:'center', padding:'4rem', color:'var(--muted)', fontSize:'1rem' }}>
          No hay envíos con los filtros seleccionados.
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem' }}>
          {filtered.map(s => {
            const isExpanded = expanded === s.id;
            const isPlaying  = playing  === s.id;
            const isNew = Date.now() - new Date(s.created_at).getTime() < 86_400_000;

            return (
              <div key={s.id} style={{
                borderRadius:14, border:`1.5px solid ${isExpanded ? '#534AB744' : 'var(--line-soft)'}`,
                background:'var(--bg)', overflow:'hidden',
                boxShadow: isExpanded ? '0 4px 20px rgba(83,74,183,0.08)' : 'none',
                transition:'all 0.2s',
              }}>
                {/* Row */}
                <div style={{
                  display:'grid', gridTemplateColumns:'auto 1fr auto auto auto auto',
                  gap:'0.75rem', alignItems:'center', padding:'0.85rem 1.1rem', flexWrap:'wrap',
                }}>
                  {/* New badge */}
                  <div style={{ width:8, height:8, borderRadius:'50%', background: isNew ? '#e11d48' : 'transparent', flexShrink:0 }} title={isNew ? 'Nuevo' : ''} />

                  {/* User info */}
                  <div style={{ minWidth:0 }}>
                    <div style={{ fontWeight:800, color:'var(--ink)', fontSize:'0.9rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>
                      {s.username}
                    </div>
                    {s.email && <div style={{ fontSize:'0.75rem', color:'var(--muted)', fontFamily:'var(--mono)' }}>{s.email}</div>}
                    <div style={{ fontSize:'0.72rem', color:'var(--muted)', marginTop:'0.1rem' }}>{formatDate(s.created_at)}</div>
                  </div>

                  {/* Nivel badge */}
                  <span style={{
                    padding:'0.25rem 0.6rem', borderRadius:8, fontSize:'0.78rem', fontWeight:800,
                    background:`${NIVEL_COLORS[s.nivel] ?? '#534AB7'}15`,
                    color: NIVEL_COLORS[s.nivel] ?? '#534AB7',
                    border:`1px solid ${NIVEL_COLORS[s.nivel] ?? '#534AB7'}44`,
                    fontFamily:'var(--mono)', whiteSpace:'nowrap',
                  }}>{s.nivel}</span>

                  {/* Text */}
                  <span style={{ fontSize:'0.8rem', color:'var(--muted)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', maxWidth:130 }}>
                    {TEXT_TITLES[s.texto_id] ?? s.texto_id}
                  </span>

                  {/* Actions */}
                  <div style={{ display:'flex', gap:'0.4rem', flexShrink:0 }}>
                    <a
                      href={s.audio_url}
                      download
                      style={{
                        padding:'0.35rem 0.6rem', borderRadius:8, fontSize:'0.75rem', fontWeight:700,
                        background:'var(--bg)', border:'1.5px solid var(--line-soft)',
                        color:'var(--ink)', textDecoration:'none', cursor:'pointer',
                      }}
                      title="Descargar audio"
                    >⬇</a>
                    <button
                      onClick={() => setExpanded(isExpanded ? null : s.id)}
                      style={{
                        padding:'0.35rem 0.6rem', borderRadius:8, fontSize:'0.75rem', fontWeight:700,
                        background: isExpanded ? '#534AB7' : 'var(--bg)',
                        border:`1.5px solid ${isExpanded ? '#534AB7' : 'var(--line-soft)'}`,
                        color: isExpanded ? '#fff' : 'var(--ink)',
                        cursor:'pointer', fontFamily:'inherit',
                      }}
                    >{isExpanded ? '▲' : '▼'}</button>
                  </div>
                </div>

                {/* Expanded panel */}
                {isExpanded && (
                  <div style={{ borderTop:'1px solid var(--line-soft)', padding:'1.1rem', background:'rgba(83,74,183,0.02)' }}>
                    {/* Audio player */}
                    <div style={{ marginBottom:'1rem' }}>
                      <p style={{ margin:'0 0 0.5rem', fontSize:'0.78rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--muted)', fontWeight:700 }}>Audio del estudiante</p>
                      <audio controls src={s.audio_url} style={{ width:'100%', borderRadius:8 }} />
                    </div>

                    {/* Quiz level + answers */}
                    <div>
                      <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.75rem' }}>
                        <p style={{ margin:0, fontSize:'0.78rem', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', color:'var(--muted)', fontWeight:700 }}>Preguntas de comprensión</p>
                        <span style={{
                          padding:'0.2rem 0.5rem', borderRadius:6, fontSize:'0.7rem', fontWeight:800,
                          background:`${QUIZ_COLORS[s.quiz_level] ?? '#534AB7'}15`,
                          color: QUIZ_COLORS[s.quiz_level] ?? '#534AB7',
                          fontFamily:'var(--mono)', textTransform:'capitalize',
                        }}>{s.quiz_level}</span>
                      </div>
                      {s.respuestas ? (
                        <div style={{ display:'flex', flexDirection:'column', gap:'0.4rem' }}>
                          {s.respuestas.map((ans, i) => (
                            <div key={i} style={{
                              padding:'0.5rem 0.75rem', borderRadius:8,
                              background:'var(--bg)', border:'1px solid var(--line-soft)',
                              fontSize:'0.85rem', color:'var(--ink)',
                            }}>
                              <span style={{ fontFamily:'var(--mono)', color:'var(--muted)', fontSize:'0.72rem', marginRight:'0.5rem' }}>P{i+1}</span>
                              {Array.isArray(ans) ? ans.join(' → ') : String(ans)}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p style={{ margin:0, color:'var(--muted)', fontSize:'0.85rem', fontStyle:'italic' }}>Sin respuestas guardadas</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <p style={{ marginTop:'1.5rem', fontSize:'0.75rem', color:'var(--muted)', textAlign:'center', fontFamily:'var(--mono)' }}>
        Mostrando hasta 20 resultados · página 1 · {total} total
      </p>
    </div>
  );
}
