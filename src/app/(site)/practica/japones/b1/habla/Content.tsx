'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number;
  phrase: string;
  romaji: string;
  phonetic: string;
  es: string;
  context: string;
  category: string;
  note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: '私の意見では、～すべきだと思います。', romaji: 'Watashi no iken de wa, ~subeki da to omoimasu.', phonetic: 'waTAshi no Iken de wa, ~suBEki da to oMOiMASu.', es: 'En mi opinión, creo que se debería ~.', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: '"私の意見では" = en mi opinión. "べきだ" = debería (obligación moral). Forma -ます.' },
  { id: 2, phrase: 'まったくおっしゃる通りです。', romaji: 'Mattaku ossharu tōri desu.', phonetic: 'MATtaku oSSHAru TOri desu.', es: 'Tiene usted toda la razón.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: '"おっしゃる" = forma honorífica de 言う. "通りです" = exactamente/tal como dice.' },
  { id: 3, phrase: 'それが最善の方法かどうか、確信が持てません。', romaji: 'Sore ga saizen no hōhō ka dō ka, kakushin ga motemansen.', phonetic: 'SOre ga SAIzen no HOho ka DO ka, kaKUshin ga MOteMASen.', es: 'No estoy seguro/a de si esa es la mejor manera.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: '"確信が持てない" = no poder tener certeza. "かどうか" = si (es o no).' },
  { id: 4, phrase: 'それはどういう意味か、ご説明いただけますか？', romaji: 'Sore wa dō iu imi ka, go-setsumei itadakemasu ka?', phonetic: 'SOre wa DO iu IMi ka, go-setsuMEI itaDAkeMASu ka?', es: '¿Podría explicarme qué quiere decir con eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: '"ご説明いただけますか" = ¿podría explicarme? Keigo muy formal con いただく.' },
  { id: 5, phrase: '正しく理解できていれば、～とおっしゃっているのですね？', romaji: 'Tadashiku rikai dekite ireba, ~to osshatte iru no desu ne?', phonetic: 'taDASHiku riKAI deKIte iREba, ~to oSSHAtte IRU no desu ne?', es: 'Si lo he entendido correctamente, ¿está usted diciendo que ~?', context: 'Verificar comprensión', category: 'Clarificación', note: '"-ていれば" = si estoy ~ando. "おっしゃっている" = honorífico de 言っている.' },
  { id: 6, phrase: '別のアプローチを検討することもできるかもしれません。', romaji: 'Betsu no apurōchi o kentō suru koto mo dekiru kamo shiremasen.', phonetic: 'BEtsu no aPUROchi o KENto suru KOto mo deKIru KAmo shiREmaSen.', es: 'Quizás también podríamos considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: '"かもしれません" = quizás/tal vez (forma formal). Muy diplomático.' },
  { id: 7, phrase: 'ご提案に関しましては、検討に値すると思います。', romaji: 'Go-teian ni kanshimashite wa, kentō ni atai suru to omoimasu.', phonetic: 'go-TEIan ni KANshiMAShite wa, KENto ni aTAI suru to oMOiMASu.', es: 'En cuanto a su propuesta, creo que merece consideración.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"～に関しまして" = en cuanto a ~. "値する" = valer/merecer. Keigo formal.' },
  { id: 8, phrase: 'この点においては、おっしゃる通りだと思います。', romaji: 'Kono ten ni oite wa, ossharu tōri da to omoimasu.', phonetic: 'KOno TEN ni oIte wa, oSSHAru TOri da to oMOiMASu.', es: 'En este punto, creo que tiene razón.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: '"この点において" = en este punto. Demuestra honestidad intelectual en el debate.' },
  { id: 9, phrase: 'とはいえ、～という点も考慮する必要があります。', romaji: 'To wa ie, ~to iu ten mo kōryo suru hitsuyō ga arimasu.', phonetic: 'to wa IE, ~to iu TEN mo KOryo suru hitsuYO ga aRIMASu.', es: 'Sin embargo, también es necesario considerar que ~.', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"とはいえ" = sin embargo/dicho esto. Conector muy frecuente en debates formales.' },
  { id: 10, phrase: 'よく考えてみると、～ということがわかります。', romaji: 'Yoku kangaete miru to, ~to iu koto ga wakarimasu.', phonetic: 'YOku KANgaete MIru to, ~to iu KOto ga wakaRIMASu.', es: 'Si lo pensamos bien, se puede ver que ~.', context: 'Analizar antes de concluir', category: 'Frases de debate', note: '"～てみる" = intentar ~/ver si. "-と" condicional/consecuencia natural.' },
  { id: 11, phrase: '申し上げたことを、少し補足させていただきます。', romaji: 'Mōshiageta koto o, sukoshi hosoku sasete itadakimasu.', phonetic: 'MOShiageta KOto o, suKOshi HOsoku SAsete itaDAkiMASu.', es: 'Permítame añadir algo a lo que dije.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"申し上げる" = decir (honorífico). "させていただく" = permítame hacer ~ (keigo).' },
  { id: 12, phrase: '状況は思ったより複雑かもしれません。', romaji: 'Jōkyō wa omotta yori fukuzatsu kamo shiremasen.', phonetic: 'JOkyo wa oMOTta YOri fuKUZAtsu KAmo shiREmaSen.', es: 'La situación quizás sea más compleja de lo que pensaba.', context: 'Señalar complejidad', category: 'Opiniones', note: '"思ったより" = más de lo que pensaba. "かもしれない" = quizás.' },
  { id: 13, phrase: '～の可能性について、どのようにお考えですか？', romaji: '~no kanōsei ni tsuite, dono yō ni o-kangae desu ka?', phonetic: '~no KANOsei ni tsuIte, DOno YO ni o-KANgae desu ka?', es: '¿Qué piensa usted sobre la posibilidad de ~?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: '"お考えですか" = honorífico de "思いますか". Keigo para interlocutor de respeto.' },
  { id: 14, phrase: '全体的には、良い考えだと思います。', romaji: 'Zentaiteki ni wa, yoi kangae da to omoimasu.', phonetic: 'ZENtaiteki ni wa, YOi KANgae da to oMOiMASu.', es: 'En general, creo que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"全体的には" = en general/en conjunto. Útil para dar una valoración global.' },
  { id: 15, phrase: '私が申し上げたかったことは、正確にはそれではありません。', romaji: 'Watashi ga mōshiagetagakatta koto wa, seikaku ni wa sore de wa arimasen.', phonetic: 'waTAshi ga MOShiageta KAkatta KOto wa, SEIkaku ni wa SOre de wa ariMASen.', es: 'Lo que quise decir no era exactamente eso.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"申し上げたかった" = lo que quería decir (honorífico). Pasado de volición.' },
  { id: 16, phrase: '正直なところ、そのような観点は考えていませんでした。', romaji: 'Shōjiki na tokoro, sono yō na kanten wa kangaete imasen deshita.', phonetic: 'SHOjiki na TOkoro, SOno YO na KANten wa KANgaete imaSen deshiTA.', es: 'Honestamente, no había pensado en ese punto de vista.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: '"正直なところ" = honestamente hablando. "観点" = punto de vista/perspectiva.' },
  { id: 17, phrase: 'ご意見を否定するつもりはありませんが、私は～と考えます。', romaji: 'Go-iken o hitei suru tsumori wa arimasen ga, watashi wa ~to kangaemasu.', phonetic: 'go-IKen o hiTEI suru tsuMOri wa ariMASen ga, waTAshi wa ~to KANgaeMASu.', es: 'No es mi intención negar su opinión, pero yo pienso que ~.', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: '"～つもりはない" = no tengo intención de ~. "ご意見" = honorífico de 意見.' },
  { id: 18, phrase: 'おそらく、～する方がよいかもしれません。', romaji: 'Osoraku, ~suru hō ga yoi kamo shiremasen.', phonetic: 'oSOraku, ~SURu HO ga YOi KAmo shiREmaSen.', es: 'Quizás sería mejor ~.', context: 'Sugerir con prudencia', category: 'Sugerencias', note: '"おそらく" = probablemente/quizás. "～方がよい" = sería mejor ~.' },
  { id: 19, phrase: '結局のところ、大切なのは～です。', romaji: 'Kekkyoku no tokoro, taisetsu na no wa ~desu.', phonetic: 'KEKkyoku no TOkoro, taiSETsu na NO wa ~desu.', es: 'A fin de cuentas, lo importante es ~.', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"結局のところ" = a fin de cuentas. "大切なのは" = lo importante/lo valioso es.' },
  { id: 20, phrase: 'その点については同意しますが、付け加えると…', romaji: 'Sono ten ni tsuite wa dōi shimasu ga, tsukekuwaeru to…', phonetic: 'SOno TEN ni tsuite wa DOi shiMASu ga, tsukeKUWAeru to…', es: 'Estoy de acuerdo en ese punto, pero si añadiera algo…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"付け加える" = añadir/agregar. "-と" introduce la consecuencia o continuación.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaJaponesB1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);
  const [showTranslit, setShowTranslit] = useState(true);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number) {
    setPracticed(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣 Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />話す練習 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          20 expresiones B1 para debates, reuniones y conversaciones formales en japonés. Incluye romaji y pronunciación.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>Progreso: {practiced.size}/{PHRASES.length} practicadas</span>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: COLOR, fontFamily: 'var(--mono)' }}>{pct}%</span>
          </div>
          <div style={{ height: 6, borderRadius: 99, background: 'var(--line-soft)', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 99, transition: 'width 0.3s' }} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', flex: 1 }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setFilter(cat)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.7rem', borderRadius: 20, border: `1.5px solid ${filter === cat ? COLOR : 'var(--line-soft)'}`, background: filter === cat ? COLOR : 'transparent', color: filter === cat ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
                {cat}
              </button>
            ))}
          </div>
          <button onClick={() => setShowTranslit(v => !v)} style={{ fontSize: '0.75rem', padding: '0.3rem 0.8rem', borderRadius: 20, border: `1.5px solid var(--line-soft)`, background: showTranslit ? 'var(--line-soft)' : 'transparent', color: 'var(--muted)', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {showTranslit ? '▲ Ocultar romaji' : '▼ Ver romaji'}
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => (
            <div key={p.id} style={{ border: `1.5px solid ${practiced.has(p.id) ? COLOR : 'var(--line-soft)'}`, borderRadius: 14, overflow: 'hidden', transition: 'border-color 0.2s' }}>
              <div style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <button onClick={() => mark(p.id)} style={{ width: 28, height: 28, borderRadius: 8, border: `2px solid ${practiced.has(p.id) ? COLOR : 'var(--line-soft)'}`, background: practiced.has(p.id) ? COLOR : 'transparent', color: '#fff', fontSize: '0.85rem', cursor: 'pointer', flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                  {practiced.has(p.id) ? '✓' : ''}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.2rem' }}>{p.phrase}</div>
                  {showTranslit && (
                    <>
                      <div style={{ fontSize: '0.82rem', color: 'var(--wl-on-panel-ok, #059669)', marginBottom: '0.1rem', fontFamily: 'var(--mono)' }}>{p.romaji}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--wl-on-panel-warn, #d97706)', marginBottom: '0.2rem', fontStyle: 'italic' }}>{p.phonetic}</div>
                    </>
                  )}
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: '0.3rem' }}>{p.es}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>{p.context}</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                  <span style={{ fontSize: '0.65rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(217,119,6,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600, whiteSpace: 'nowrap' }}>{p.category}</span>
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} style={{ fontSize: '0.72rem', color: COLOR, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    {expanded === p.id ? '▲ menos' : '▼ nota'}
                  </button>
                </div>
              </div>
              {expanded === p.id && (
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: 'rgba(217,119,6,0.04)', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                  💡 {p.note}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Refuerza tu vocabulario en{' '}
          <Link href="/practica/japones/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/japones/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>.
        </div>
      </div>
    </section>
  );
}
