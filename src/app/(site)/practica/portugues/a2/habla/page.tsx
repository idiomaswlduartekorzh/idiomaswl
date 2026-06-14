'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Na minha opinião, ___.', phonetic: '[nah MEE-nyah oh-pee-NYOWNG]', es: 'En mi opinión, ___.',
    note: '"Na minha opinião" = en mi opinión. Alternativas: "Para mim" [pa-rah MING] = para mí; "Eu acho que" [ew AH-shoo keh] = yo creo que. "Acho" es muy usado en el habla cotidiana brasileña.', category: 'Opiniões' },
  { id: 2, phrase: 'Concordo / Não concordo.', phonetic: '[kon-KOR-doo / nowng kon-KOR-doo]', es: 'Estoy de acuerdo / No estoy de acuerdo.',
    note: '"Concordo" = estoy de acuerdo. "Discordo" [dis-KOR-doo] = discrepo. En el habla coloquial: "Tô de acordo" [toh dji ah-KOR-doo]. La "ão" final de "não" suena nasal [ɑ̃w̃].', category: 'Opiniões' },
  { id: 3, phrase: 'Que bom ponto!', phonetic: '[keh bong PON-too]', es: '¡Qué buen punto!',
    note: '"Que bom ponto!" = ¡Qué buen punto! Alternativas: "Boa observação!" [BOH-ah ob-ser-vah-SOWNG] = ¡Buena observación! "Faz sentido" [fahz sen-TCHEE-doo] = tiene sentido.', category: 'Opiniões' },
  { id: 4, phrase: 'Pode repetir mais devagar?', phonetic: '[POH-djeh heh-peh-TCHEER mais deh-vah-GAR]', es: '¿Puede repetir más despacio?',
    note: '"Devagar" [deh-vah-GAR] = despacio/lento. "Pode" suena [POH-djeh] con la "d" suavizada antes de "e". Alternativa: "Pode falar mais lentamente?" [mais len-tah-MEN-tchi].', category: 'Compreensão' },
  { id: 5, phrase: 'O que ___ quer dizer?', phonetic: '[oo keh ___ ker dee-ZER]', es: '¿Qué significa ___?',
    note: '"Quer dizer" = quiere decir/significa. Alternativa: "O que significa ___?" [oo keh sig-nee-FEE-kah]. "Quer" aquí no es "querer" sino "significar" — falso cognado para hispanohablantes.', category: 'Compreensão' },
  { id: 6, phrase: 'Estou procurando ___.', phonetic: '[es-TOH pro-koo-RAN-doo]', es: 'Estoy buscando ___.',
    note: '"Procurar" [pro-koo-RAR] = buscar. Ejemplo: "Estou procurando o hotel Central". Alternativa: "Estou à procura de ___" [es-TOH ah pro-KOO-rah dji] — más formal.', category: 'Viagens' },
  { id: 7, phrase: 'Como chego a ___?', phonetic: '[KOH-moo SHEH-goo ah]', es: '¿Cómo llego a ___?',
    note: '"Chego" = llego (1ª persona de chegar). El "h" después de "c" no existe en español. La "ch" en brasileño suena como "sh" del inglés: [SHEH-goo]. Alternativa: "Como eu faço para chegar a ___?"', category: 'Viagens' },
  { id: 8, phrase: 'É longe daqui?', phonetic: '[eh LON-zheh dah-KEE]', es: '¿Está lejos de aquí?',
    note: '"Longe" [LON-zheh] = lejos. "Perto" [PER-too] = cerca. "Daqui" = de aquí (de + aqui). Respuestas: "É pertinho daqui" [es-tah per-TCHEN-yoo] = está cerquita / "Fica a 10 minutos de caminhada" = está a 10 minutos caminando.', category: 'Viagens' },
  { id: 9, phrase: 'Gostaria de fazer uma reserva.', phonetic: '[gos-tah-REE-ah dji fah-ZER OO-mah heh-ZER-vah]', es: 'Me gustaría hacer una reserva.',
    note: '"Gostaria" = condicional de "gostar" → me gustaría. Más formal que "Quero fazer". Ejemplo completo: "Gostaria de fazer uma reserva para dois adultos para sexta-feira."', category: 'Viagens' },
  { id: 10, phrase: 'A que horas abre/fecha?', phonetic: '[ah keh OH-ras AH-breh / FEH-shah]', es: '¿A qué hora abre/cierra?',
    note: '"Abre" [AH-breh] = abre. "Fecha" [FEH-shah] = cierra (¡falso cognado! "Fecha" en PT = cierra, no "fecha del calendario" — esa es "data"). "O horário de funcionamento é..." = el horario de atención es...', category: 'Viagens' },
  { id: 11, phrase: 'Trabalho aqui há ___.', phonetic: '[trah-BAH-lyoo ah-KEE ah]', es: 'Trabajo aquí hace ___.',
    note: '"Há" + tiempo = hace (expresión de duración). Ejemplo: "Trabalho aqui há dois anos" = trabajo aquí hace dos años. "Há" no tiene tilde diacrítica pero es diferente de "a" (preposición). Confusión común en el CELPE-Bras.', category: 'Trabalho' },
  { id: 12, phrase: 'Minhas responsabilidades incluem ___.', phonetic: '[MEE-nyahs hes-pon-sah-bee-lee-DAH-djees een-KLOO-eng]', es: 'Mis responsabilidades incluyen ___.',
    note: 'Frase essencial para entrevistas. Alternativa: "Sou responsável por ___" [soh hes-pon-SAH-vel por]. "Minha área de atuação é ___" = mi área de trabajo es ___. Useful for the CELPE-Bras oral exam.', category: 'Trabalho' },
  { id: 13, phrase: 'Poderia falar com o/a gerente?', phonetic: '[poh-deh-REE-ah fah-LAR kong oo zheh-REN-tchi]', es: '¿Podría hablar con el/la gerente?',
    note: '"Poderia" = condicional de "poder" → podría. Más formal y cortés que "Posso falar" (puedo hablar). "Gerente" [zheh-REN-tchi] — el "g" antes de "e" suena como "zh" (la "j" francesa).', category: 'Trabalho' },
  { id: 14, phrase: 'Ela é mais alta que ___.', phonetic: '[EH-lah eh mais AL-tah keh]', es: 'Ella es más alta que ___.',
    note: 'Comparativo de superioridade. "Mais + adjetivo + que/do que". No Brasil, "que" (sin "do") es muy común en el habla. Formalmente: "Ela é mais alta do que eu." Recuerda: "maior" (más grande) no usa "mais".', category: 'Descrição' },
  { id: 15, phrase: 'Ela/ele é a pessoa mais ___ que conheço.', phonetic: '[EH-lah eh ah peh-SOH-ah mais ___ keh ko-NYEH-soo]', es: 'Ella/él es la persona más ___ que conozco.',
    note: 'Superlativo relativo. Estrutura: o/a + mais + adjetivo + que + conheço/vi/já encontrei. Ejemplos: "É a pessoa mais inteligente que conheço" / "É o lugar mais bonito que já visitei."', category: 'Descrição' },
  { id: 16, phrase: 'Como ele/ela é fisicamente?', phonetic: '[KOH-moo EH-leh eh fee-zee-kah-MEN-tchi]', es: '¿Cómo es él/ella físicamente?',
    note: '"Fisicamente" = físicamente. Para describir: "Ela tem cabelo curto e olhos castanhos" / "Ele é alto e tem barba". Vocabulario: cabelo [kah-BEH-loo] = pelo; olhos [OH-lyoos] = ojos; barba = barba.', category: 'Descrição' },
  { id: 17, phrase: 'Antigamente, eu ___.', phonetic: '[an-tchi-gah-MEN-tchi, ew]', es: 'Antes, yo ___.',
    note: '"Antigamente" + imperfeito = antes (en el pasado). Ejemplo: "Antigamente, eu morava no interior" (Antes, vivía en el interior). Similar a "quando era criança" o "antes". El imperfeito es el tiempo natural con "antigamente".', category: 'Social' },
  { id: 18, phrase: 'Faz tempo que não nos vemos!', phonetic: '[fahz TEM-poo keh nowng nooz VEH-mooz]', es: '¡Hace tiempo que no nos vemos!',
    note: '"Faz tempo que..." = hace tiempo que... "Nos vemos" = nos vemos. Esta estructura "faz + tiempo + que + verbo" es muy común: "Faz três anos que não venho ao Brasil." Equivalente coloquial: "Quanto tempo!"', category: 'Social' },
  { id: 19, phrase: 'Você quer se juntar a nós?', phonetic: '[voh-SAY ker seh zhoon-TAR ah nohs]', es: '¿Quieres unirte a nosotros?',
    note: '"Se juntar a" = unirse a. "Juntar" [zhoon-TAR] — la "j" suena como "zh" (j francesa). Alternativa informal: "Quer vir com a gente?" [ker veer kong ah ZHEN-tchi] — "a gente" = nosotros (muy coloquial).', category: 'Social' },
  { id: 20, phrase: 'Eu pago!', phonetic: '[ew PAH-goo]', es: '¡Yo pago! / ¡Invito yo!',
    note: '"Eu pago" = yo pago / pago yo. Variantes: "Hoje é por minha conta!" [oh-ZHEH eh por MEE-nyah KON-tah] = ¡hoy es mi cuenta! "A rodada é minha" = esta ronda la pago yo. Muy común en situaciones sociales brasileñas.', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniões', 'Compreensão', 'Viagens', 'Trabalho', 'Descrição', 'Social'];

export default function HablaPortuguesA2() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expressão oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Expressão oral · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expressões A2 — contexto e pronúncia</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 expressões situacionais com fonética para hispanofalantes e notas de registro (formal vs coloquial).
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.8rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎯 <strong style={{ color: 'var(--ink)' }}>Como praticar:</strong> Leia a fonética → diga a frase 3 vezes em voz alta → expanda a nota para entender o registro → marque ✓ quando se sentir confortável.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => {
            const done = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border: `1.5px solid ${done ? `${COLOR}44` : 'var(--line-soft)'}`, borderRadius: 16, background: done ? `${COLOR}06` : 'var(--bg)', overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic', marginBottom: '0.12rem' }}>{p.phonetic}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.es}</div>
                      <span style={{ fontSize: '0.62rem', padding: '0.08rem 0.35rem', borderRadius: 4, background: `${COLOR}18`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{p.category}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setExpanded(isExpanded ? null : p.id)}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 6, border: '1px solid var(--line-soft)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                      {isExpanded ? '▲ nota' : '▼ nota'}
                    </button>
                    <button onClick={() => mark(p.id, !done)}
                      style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', borderRadius: 8, border: `1.5px solid ${done ? COLOR : 'var(--line-soft)'}`, background: done ? COLOR : 'transparent', color: done ? '#fff' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                      {done ? '✓ Dominada' : 'Consegui ✓'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.7rem 1.25rem 0.85rem 4.5rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}04` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota de pronúncia e registro</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.note}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size === PHRASES.length && (
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 16, background: `${COLOR}0a`, border: `2px solid ${COLOR}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>Ótimo trabalho! Você domina as 20 expressões A2.</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Agora use-as em conversa real — pratique com David ou Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
