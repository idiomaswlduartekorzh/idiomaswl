'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number;
  phrase: string;
  romaja: string;
  phonetic: string;
  es: string;
  context: string;
  category: string;
  note: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: '제 생각에는 ~해야 할 것 같습니다.', romaja: 'Je saenggage-neun ~haeya hal geot gatsseumnida.', phonetic: 'che SAENGgage-neun ~HAEYA hal geot GATseumnida.', es: 'En mi opinión, parece que habría que ~.', context: 'Dar una opinión con recomendación', category: 'Opiniones', note: '"제 생각에는" = en mi opinión. "~것 같다" = parece que. Forma formal con -습니다.' },
  { id: 2, phrase: '전적으로 동의합니다.', romaja: 'Jeonjeok-euro dong-uihamnida.', phonetic: 'cheonJEOK-euro DONG-uiHAMnida.', es: 'Estoy totalmente de acuerdo.', context: 'Mostrar acuerdo formal', category: 'Acuerdo/Desacuerdo', note: '"전적으로" = totalmente. "동의하다" = estar de acuerdo. Nivel formal -ㅂ니다.' },
  { id: 3, phrase: '그것이 최선의 방법인지 확신하지 못하겠습니다.', romaja: 'Geugeosi choeseone bangbeopinji hwaksinhaJi mothaGetsseumnida.', phonetic: 'geu-GOsi choeSONe BANGbeopinji hwakSINhaji MOTHA-GETseumnida.', es: 'No estoy seguro/a de que eso sea la mejor manera.', context: 'Expresar dudas con matiz', category: 'Opiniones', note: '"확신하지 못하다" = no estar seguro. Forma negativa de "확신하다" (estar convencido).' },
  { id: 4, phrase: '그게 무슨 뜻인지 설명해 주시겠어요?', romaja: 'Geuge museun tteusinji seolmyeonghae jusigesseoyo?', phonetic: 'geu-GE muSUN tteu-sinji seolMYEONGhae juSIgesseOYO?', es: '¿Podría explicarme qué significa eso?', context: 'Pedir aclaración formalmente', category: 'Clarificación', note: '"-아/어 주시겠어요?" = ¿podría ~? Solicitud cortés y formal.' },
  { id: 5, phrase: '제가 잘 이해했다면, ~ 말씀이신 거죠?', romaja: 'Jega jal ihaehatsseumyeon, ~ malsseumisin geojyo?', phonetic: 'chE-ga jal iHAEhaT-seumyeon, ~ MALsseu-miSIN geojyo?', es: 'Si lo he entendido bien, ¿está usted diciendo que ~?', context: 'Verificar comprensión', category: 'Clarificación', note: '"-이신 거죠?" = ¿es que ~? confirmación cortés. "말씀" = palabra (forma honorífica de 말).' },
  { id: 6, phrase: '다른 접근 방식을 고려해 볼 수도 있을 것 같습니다.', romaja: 'Dareun jeobbgeun bangsig-eul goryeohae bol sudo isseul geot gatsseumnida.', phonetic: 'DAreun JEOP-geun BANGsig-eul goRYEOhae BOL sUdo iSSeul geot GATseumnida.', es: 'Quizás también podríamos considerar otro enfoque.', context: 'Sugerir alternativas con tacto', category: 'Sugerencias', note: '"-ㄹ 수도 있다" = también se podría. "것 같다" añade indirección y cortesía.' },
  { id: 7, phrase: '선생님의 제안에 대해서는 생각해 볼 필요가 있을 것 같습니다.', romaja: 'Seonsaengnim-ui jeeane daehaeseoneun saenggakhae bol pilyoga isseul geot gatsseumnida.', phonetic: 'seonSAENGnim-ui jeAN-e DAEhaeseoneun saengGAKhae BOL pilYOga iSSeul…', es: 'En cuanto a la propuesta de usted, parece que merece reflexión.', context: 'Responder sin comprometerse', category: 'Registro formal', note: '"~에 대해서는" = en cuanto a ~. "선생님" como tratamiento honorífico.' },
  { id: 8, phrase: '이 부분에서는 선생님이 옳으신 것 같습니다.', romaja: 'I bupun-eseoeneun seonsaengnimi olheusin geot gatsseumnida.', phonetic: 'i buPUN-eseoneun seonSAENGnim-i OLheusin geot GATseumnida.', es: 'En este punto, parece que usted tiene razón.', context: 'Conceder un argumento', category: 'Acuerdo/Desacuerdo', note: '"옳다" = tener razón/ser correcto. "-으신" = honorífico de 3a persona.' },
  { id: 9, phrase: '그런데, 또 한 가지 고려해야 할 점은…', romaja: 'Geuronde, tto han gaji goryeohaeya hal jeomeun…', phonetic: 'geu-RONde, TTO han GA-ji goRYEOhaeya hal JEOMeun…', es: 'Sin embargo, otro punto que hay que considerar es…', context: 'Introducir un matiz o contrargumento', category: 'Frases de debate', note: '"그런데" = sin embargo/pero. "또 한 가지" = otro punto/además.' },
  { id: 10, phrase: '잘 생각해 보면, ~을/를 알 수 있습니다.', romaja: 'Jal saengggakhae bomyeon, ~eul/reul al su isseumnida.', phonetic: 'jal saengGAKhae boMYEON, ~eul/reul al su iSSeumnida.', es: 'Si lo pensamos bien, podemos ver que ~.', context: 'Analizar antes de concluir', category: 'Frases de debate', note: '"-아/어 보면" = si intentamos ~/si lo miramos. Forma condicional sugerente.' },
  { id: 11, phrase: '제가 말씀드린 것을 좀 더 정확히 설명드리겠습니다.', romaja: 'Jega malsseumdeurin geoseul jom deo jeongghwaki seolmyeongdeurigesseumnida.', phonetic: 'chEga MALsseum-deurin geOSeul jom deo jeongHWAki seolMYEONG-deuriGETseumnida.', es: 'Permítame explicar con más precisión lo que dije.', context: 'Matizar lo que uno mismo dijo', category: 'Clarificación', note: '"-드리다" = forma honorífica de "주다/하다". "정확히" = con precisión.' },
  { id: 12, phrase: '상황이 생각보다 더 복잡한 것 같습니다.', romaja: 'Sanghwang-i saenggakboda deo bokjaphan geot gatsseumnida.', phonetic: 'SANGhwang-i saengGAK-boda deo BOKjaphan geot GATseumnida.', es: 'Parece que la situación es más compleja de lo que se pensaba.', context: 'Señalar complejidad', category: 'Opiniones', note: '"-보다 더" = más que. "것 같다" = parece que. Modesto y reflexivo.' },
  { id: 13, phrase: '~의 가능성에 대해 어떻게 생각하세요?', romaja: '~eui ganeungseong-e daehae eotteoke saenggakhaseyo?', phonetic: '~eui gaNEUNGseong-e daehae eotTEOke saengGAK-haseyo?', es: '¿Qué piensa usted sobre la posibilidad de ~?', context: 'Abrir un tema para debate', category: 'Sugerencias', note: '"-에 대해 어떻게 생각하세요?" = ¿qué piensa sobre ~? Fórmula estándar.' },
  { id: 14, phrase: '전반적으로 좋은 생각인 것 같습니다.', romaja: 'Jeonbanjeog-euro joeun saenggang-in geot gatsseumnida.', phonetic: 'jeonBANjeog-euro JOeun saengGANG-in geot GATseumnida.', es: 'En general, parece que es una buena idea.', context: 'Dar una valoración global', category: 'Opiniones', note: '"전반적으로" = en general/en términos generales. Útil para resumir.' },
  { id: 15, phrase: '제가 말씀드리려고 했던 것은 정확히 그게 아니었습니다.', romaja: 'Jega malsseumdeuryeogo haetdeon geoseun jeongghwaki geuge anieotsseumnida.', phonetic: 'chEga MALsseum-deuRYEogo haetDEOn geOSeun jeongHWAki geuge aniEOTseumnida.', es: 'Lo que quise decir no era exactamente eso.', context: 'Corregir una malinterpretación', category: 'Clarificación', note: '"-려고 했던" = que intentaba/que iba a. Pasado con intención previa.' },
  { id: 16, phrase: '솔직히 말씀드리면, 그 부분은 생각하지 못했습니다.', romaja: 'Soljjikhi malsseumdeurimyeon, geu bubuneun saenggakhaji mothaetsseumnida.', phonetic: 'SOLjjikhi MALsseum-deuriMYEOn, geu buBUNeun saengGAK-haji mothAETseumnida.', es: 'Honestamente, no había pensado en ese aspecto.', context: 'Reconocer un punto ciego', category: 'Acuerdo/Desacuerdo', note: '"솔직히 말씀드리면" = honestamente hablando. Muy formal y respetuoso.' },
  { id: 17, phrase: '선생님 의견을 반박하려는 것은 아니지만, 저는 ~이라고 생각합니다.', romaja: 'Seonsaengnim uigyeon-eul banbakharyeoneun geoseun aanimban, jeo-neun ~irago saenggakhamnida.', phonetic: 'seonSAENGnim uiGYEOn-eul BANbak-haryeoneun geOSeun aniJIman, jeo-neun ~iraGO saengGAKhamnida.', es: 'Sin querer rebatir su opinión, yo creo que ~.', context: 'Presentar desacuerdo con cortesía', category: 'Frases de debate', note: '"-려는 것은 아니지만" = no es que quiera ~. Forma muy diplomática.' },
  { id: 18, phrase: '아마도 ~하는 것이 더 나을 것 같습니다.', romaja: 'Amado ~haneun geosi deo naeul geot gatsseumnida.', phonetic: 'aMAdo ~HAneun geOsi deo NAeul geot GATseumnida.', es: 'Quizás sería mejor ~.', context: 'Sugerir con prudencia', category: 'Sugerencias', note: '"아마도" = quizás/tal vez. "더 나을 것 같다" = parece que sería mejor.' },
  { id: 19, phrase: '결국 중요한 것은 ~입니다.', romaja: 'Gyeolgug jungyohan geoseun ~imnida.', phonetic: 'gyeolGUG jungYOhan geOSeun ~IMnida.', es: 'A fin de cuentas, lo importante es ~.', context: 'Resumir o concluir un debate', category: 'Frases de debate', note: '"결국" = a fin de cuentas/al final. "중요한 것은" = lo importante es.' },
  { id: 20, phrase: '그 부분에서는 동의하지만, 한 가지 덧붙이자면…', romaja: 'Geu bubuneseoeneun dong-uihajiman, han gaji deosbujijamyeon…', phonetic: 'geu buBUN-eseoneun dong-uiHAjiman, han GA-ji DEOSbujijaMYEOn…', es: 'Estoy de acuerdo en ese punto, pero si añadiera algo más…', context: 'Acuerdo parcial con ampliación', category: 'Acuerdo/Desacuerdo', note: '"덧붙이다" = añadir/agregar. "-자면" = si tuviera que ~. Condicional suave.' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Acuerdo/Desacuerdo', 'Clarificación', 'Sugerencias', 'Registro formal', 'Frases de debate'];

export default function HablaCreanoB1() {
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
          <Link href="/practica/coreano/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣 Habla</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />말하기 연습 · Coreano B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          20 expresiones B1 para debates, reuniones y conversaciones formales en coreano. Incluye romanización y pronunciación.
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
            {showTranslit ? '▲ Ocultar romaja' : '▼ Ver romaja'}
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
                      <div style={{ fontSize: '0.82rem', color: '#059669', marginBottom: '0.1rem', fontFamily: 'var(--mono)' }}>{p.romaja}</div>
                      <div style={{ fontSize: '0.78rem', color: '#d97706', marginBottom: '0.2rem', fontStyle: 'italic' }}>{p.phonetic}</div>
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
          <Link href="/practica/coreano/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o practica la comprensión escrita en{' '}
          <Link href="/practica/coreano/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>.
        </div>
      </div>
    </section>
  );
}
