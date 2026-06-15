'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#009c3b';

interface ReadingText {
  id: number; title: string; topic: string; words: number; grammar: string; text: string;
  vocab: Record<string, string>;
  preQ: string[];
  mcq: { q: string; opts: string[]; a: number; fb: string }[];
  openQ: string; prodPrompt: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Um fim de semana em Ouro Preto', topic: 'Viagens e turismo', words: 95, grammar: 'Pretérito perfeito',
    text: 'No fim de semana passado, Ana e sua amiga Carla decidiram visitar Ouro Preto, em Minas Gerais. Elas pegaram o ônibus de Belo Horizonte e chegaram no sábado à tarde. À noite, elas jantaram em um restaurante típico e experimentaram o famoso feijão tropeiro. No domingo de manhã, elas visitaram a Igreja de São Francisco de Assis e tiraram muitas fotos. As igrejas barrocas eram lindíssimas e o centro histórico parecia um cenário de filme. À tarde, elas compraram pedras preciosas na feira e voltaram para casa cheias de recordações. Elas adoraram a viagem e já planejam voltar no próximo mês.',
    vocab: {
      'decidiram': 'decidieron', 'pegaram': 'tomaron/cogieron', 'chegaram': 'llegaron', 'jantaram': 'cenaron',
      'experimentaram': 'probaron', 'famoso': 'famoso', 'feijão': 'frijoles', 'tropeiro': 'arriero/mulero',
      'visitaram': 'visitaron', 'tiraram': 'sacaron', 'igrejas': 'iglesias', 'barrocas': 'barrocas',
      'lindíssimas': 'bellísimas', 'parecia': 'parecía', 'cenário': 'escenario', 'compraram': 'compraron',
      'pedras': 'piedras', 'preciosas': 'preciosas', 'feira': 'feria/mercado', 'voltaram': 'volvieron',
      'recordações': 'recuerdos', 'adoraram': 'adoraron', 'planejam': 'planean', 'próximo': 'próximo',
    },
    preQ: ['¿Qué verbos en pasado crees que encontrarás en un texto sobre un viaje del fin de semana pasado?', '¿Qué sabes sobre Ouro Preto (Minas Gerais)? ¿Qué tipo de ciudad puede ser?'],
    mcq: [
      { q: '¿Cómo viajaron Ana y Carla a Ouro Preto?', opts: ['En avión', 'En tren', 'En ônibus (autobús)', 'En coche'], a: 2, fb: '"Elas pegaram o ônibus de Belo Horizonte" — viajaron en autobús desde Belo Horizonte.' },
      { q: '¿Qué comieron en el restaurante el sábado por la noche?', opts: ['Churrasco', 'Feijão tropeiro', 'Feijoada', 'Arroz con pollo'], a: 1, fb: '"Experimentaram o famoso feijão tropeiro" — probaron el famoso feijão tropeiro.' },
      { q: '¿Qué visitaron el domingo por la mañana?', opts: ['Un museo de arte', 'El mercado central', 'La Iglesia de São Francisco de Assis', 'El parque nacional'], a: 2, fb: '"Elas visitaram a Igreja de São Francisco de Assis" — visitaron esa iglesia barroca.' },
      { q: '¿Qué significa "parecia um cenário de filme"?', opts: ['Era un lugar de rodaje real', 'Parecía un escenario de película', 'Era un lugar conocido por el cine', 'Había mucha gente filmando'], a: 1, fb: '"Parecia" = parecía. "Cenário" = escenario. El centro histórico tenía apariencia cinematográfica.' },
      { q: '¿Qué compraron en la feria?', opts: ['Artesanías de cerámica', 'Ropa típica', 'Pedras preciosas (piedras preciosas)', 'Comida local'], a: 2, fb: '"Compraram pedras preciosas na feira" — Ouro Preto es famosa por las piedras preciosas.' },
      { q: '¿En qué tiempo verbal está la mayoría del texto?', opts: ['Presente', 'Pretérito imperfeito', 'Pretérito perfeito', 'Futuro'], a: 2, fb: 'Verbos: decidiram, pegaram, chegaram, jantaram, visitaram, compraram, voltaram — todos pretérito perfeito (ações concluídas).' },
    ],
    openQ: '¿Por qué a Ana y Carla les gustó tanto el viaje? Menciona dos razones del texto.',
    prodPrompt: 'Escribe 3 oraciones sobre un viaje que hiciste recientemente. Usa el pretérito perfeito: "Fui a..., visitei..., comi..."',
  },
  {
    id: 2, title: 'Uma entrevista de emprego', topic: 'Trabalho e carreira', words: 88, grammar: 'Pretérito perfeito + comparativo',
    text: 'Na semana passada, Marcos foi a uma entrevista de emprego numa empresa de tecnologia em São Paulo. Ele se preparou muito: revisou seu currículo, pesquisou sobre a empresa e praticou suas respostas. Na entrevista, o gerente perguntou sobre sua experiência anterior. Marcos explicou que trabalhou dois anos como desenvolvedor junior numa startup e depois conseguiu uma posição mais sênior. O gerente disse que ele era o candidato mais qualificado entre os finalistas. No final, Marcos recebeu uma oferta melhor do que esperava. Ele aceitou imediatamente e começa na segunda-feira.',
    vocab: {
      'semana': 'semana', 'entrevista': 'entrevista', 'empresa': 'empresa', 'preparou': 'preparó',
      'revisou': 'revisó', 'currículo': 'currículum', 'pesquisou': 'investigó', 'perguntou': 'preguntó',
      'experiência': 'experiencia', 'anterior': 'anterior', 'explicou': 'explicó', 'trabalhou': 'trabajó',
      'desenvolvedor': 'desarrollador', 'startup': 'startup', 'conseguiu': 'consiguió', 'posição': 'posición',
      'candidato': 'candidato', 'qualificado': 'cualificado', 'finalistas': 'finalistas', 'recebeu': 'recibió',
      'oferta': 'oferta', 'esperava': 'esperaba', 'aceitou': 'aceptó', 'imediatamente': 'inmediatamente',
    },
    preQ: ['¿Qué verbos usarías para contar lo que pasó en una entrevista de trabajo?', '¿Qué significa "o candidato mais qualificado"? ¿Qué estructura gramatical reconoces?'],
    mcq: [
      { q: '¿Dónde fue la entrevista de Marcos?', opts: ['En una empresa de marketing', 'En una empresa de tecnología en São Paulo', 'En una agencia de recursos humanos', 'En una universidad'], a: 1, fb: '"...numa empresa de tecnologia em São Paulo" — empresa de tecnología en São Paulo.' },
      { q: '¿Qué hizo Marcos para prepararse?', opts: ['Solo revisó su currículum', 'Investigó la empresa y practicó respuestas', 'Habló con amigos que trabajaban allí', 'Tomó un curso de entrevistas'], a: 1, fb: '"...revisou seu currículo, pesquisou sobre a empresa e praticou suas respostas" — tres preparativos.' },
      { q: '¿Cuánto tiempo trabajó Marcos como desarrollador junior?', opts: ['Un año', 'Dos años', 'Tres años', 'Seis meses'], a: 1, fb: '"...trabalhou dois anos como desenvolvedor junior numa startup".' },
      { q: '¿Qué significa "o candidato mais qualificado entre os finalistas"?', opts: ['El candidato menos experimentado', 'El candidato con más estudios', 'El candidato más cualificado entre los finalistas', 'El candidato más joven'], a: 2, fb: '"Mais qualificado" = más cualificado. "Entre os finalistas" = entre los finalistas. Superlativo relativo.' },
      { q: '¿Cómo fue la oferta que recibió Marcos?', opts: ['Igual a lo que esperaba', 'Peor de lo que esperaba', 'Mejor de lo que esperaba', 'No se menciona el salario'], a: 2, fb: '"...uma oferta melhor do que esperava" — mejor de lo que esperaba. Comparativo de superioridad.' },
      { q: '¿Cuándo empieza Marcos en el nuevo trabajo?', opts: ['El jueves', 'El viernes', 'El lunes', 'El martes'], a: 2, fb: '"...começa na segunda-feira" — segunda-feira = lunes en portugués.' },
    ],
    openQ: '¿Qué hizo Marcos para prepararse para la entrevista y cuál fue el resultado?',
    prodPrompt: 'Describe una entrevista de trabajo o una situación de trabajo en 3 oraciones. Usa: "Fui a..., explicei..., recebi..."',
  },
  {
    id: 3, title: 'Duas opiniões sobre viagem', topic: 'Opiniões', words: 100, grammar: 'Comparativo + futuro com ir',
    text: 'Pedro e Laura têm opiniões diferentes sobre viagens. Pedro prefere viajar para o exterior porque acha que o estrangeiro é mais interessante do que o Brasil. Ele vai visitar o Japão no próximo verão. Laura, por outro lado, acredita que o Brasil é tão fascinante quanto qualquer país do mundo. Ela diz que as praias brasileiras são as mais bonitas do planeta. No próximo mês, ela vai explorar o Pantanal pela primeira vez. Os dois concordam em um ponto: viajar é a melhor maneira de aprender sobre outras culturas. Mas Pedro prefere avião e Laura prefere viajar de trem ou de ônibus.',
    vocab: {
      'opiniões': 'opiniones', 'diferentes': 'diferentes', 'prefere': 'prefiere', 'exterior': 'extranjero',
      'estrangeiro': 'extranjero', 'mais interessante': 'más interesante', 'próximo': 'próximo',
      'verão': 'verano', 'por outro lado': 'por otro lado', 'acredita': 'cree/considera',
      'fascinante': 'fascinante', 'praias': 'playas', 'bonitas': 'bonitas', 'planeta': 'planeta',
      'explorar': 'explorar', 'pantanal': 'Pantanal', 'concordam': 'están de acuerdo',
      'maneira': 'manera', 'culturas': 'culturas', 'avião': 'avión', 'ônibus': 'autobús',
    },
    preQ: ['¿Cómo se expresa la comparación en portugués? ¿Conoces "mais... do que" o "tão... quanto"?', '¿Qué crees que significa "viajar é a melhor maneira de aprender"?'],
    mcq: [
      { q: '¿Por qué Pedro prefiere viajar al extranjero?', opts: ['Porque es más barato', 'Porque es más interesante que Brasil', 'Porque tiene amigos en otros países', 'Porque habla otros idiomas'], a: 1, fb: '"...o estrangeiro é mais interessante do que o Brasil" — comparativo de superioridad.' },
      { q: '¿Qué significa "tão fascinante quanto qualquer país do mundo"?', opts: ['Menos fascinante que otros países', 'Más fascinante que otros países', 'Igual de fascinante que cualquier país del mundo', 'El país más fascinante del mundo'], a: 2, fb: '"Tão... quanto" = tan... como. Comparativo de igualdad. Brasil es igual de fascinante que cualquier otro país.' },
      { q: '¿Qué va a hacer Pedro en el próximo verano?', opts: ['Visitar el Pantanal', 'Ir a la playa', 'Visitar Japón', 'Viajar por Brasil'], a: 2, fb: '"Ele vai visitar o Japão no próximo verão" — ir + infinitivo para plano futuro.' },
      { q: '¿Qué opina Laura sobre las playas brasileñas?', opts: ['Son bonitas pero no las mejores', 'Son las más bonitas del planeta', 'Son mejores que las del Caribe', 'Son parecidas a las europeas'], a: 1, fb: '"As praias brasileiras são as mais bonitas do planeta" — superlativo relativo.' },
      { q: '¿En qué están de acuerdo Pedro y Laura?', opts: ['Que es mejor viajar en avión', 'Que Brasil es el mejor destino', 'Que viajar es la mejor manera de aprender sobre culturas', 'Que el Pantanal es el mejor lugar de Brasil'], a: 2, fb: '"Os dois concordam em um ponto: viajar é a melhor maneira de aprender sobre outras culturas."' },
      { q: '¿Qué va a hacer Laura el próximo mes?', opts: ['Visitar una playa', 'Viajar al Japón', 'Explorar el Pantanal por primera vez', 'Tomar un curso de idiomas'], a: 2, fb: '"No próximo mês, ela vai explorar o Pantanal pela primeira vez" — ir + infinitivo = futuro próximo.' },
    ],
    openQ: '¿Cuál es la diferencia principal entre Pedro y Laura respecto a sus preferencias de viaje?',
    prodPrompt: 'Compara dos ciudades o países que conoces. Usa: "X é mais ___ do que Y" y "X é tão ___ quanto Y".',
  },
  {
    id: 4, title: 'Conselhos para aprender português', topic: 'Aprendizagem de idiomas', words: 90, grammar: 'Imperfeito + dever/poder',
    text: 'Quando eu comecei a aprender português, achava que era muito difícil. Os sons nasais eram estranhos para mim e a gramática parecia complicada. Mas com o tempo, fui melhorando. Meu professor sempre dizia: "Você deve ouvir música e assistir séries em português todo dia." Eu seguia esse conselho e praticava muito. Hoje, posso dizer que o português é uma língua linda. Para quem está aprendendo, eu recomendo: você deve praticar todos os dias, mesmo que seja por dez minutos. Pode parecer pouco, mas o progresso é constante. E nunca tenha medo de errar — os erros ensinam.',
    vocab: {
      'comecei': 'empecé', 'achava': 'pensaba/encontraba', 'difícil': 'difícil', 'sons': 'sonidos',
      'nasais': 'nasales', 'estranhos': 'extraños', 'parecia': 'parecía', 'complicada': 'complicada',
      'fui melhorando': 'fui mejorando', 'dizia': 'decía', 'deve': 'debe', 'ouvir': 'escuchar',
      'assistir': 'ver/seguir', 'séries': 'series', 'seguia': 'seguía', 'conselho': 'consejo',
      'praticava': 'practicaba', 'posso': 'puedo', 'linda': 'hermosa/linda', 'recomendo': 'recomiendo',
      'mesmo que': 'aunque', 'progresso': 'progreso', 'constante': 'constante', 'errar': 'errar/equivocarse',
    },
    preQ: ['¿Qué dificultades crees que tiene aprender portugués para hispanohablantes?', '¿Qué diferencia hay entre "achava" (achava que era difícil) y "achei" (aché que era difícil)?'],
    mcq: [
      { q: '¿Qué pensaba el narrador cuando empezó a aprender portugués?', opts: ['Que era muy fácil', 'Que era muy difícil', 'Que era parecido al español', 'Que era imposible'], a: 1, fb: '"...achava que era muito difícil" — imperfeito de "achar" (pensar/encontrar). Opinión en el pasado.' },
      { q: '¿Qué le resultaba extraño al narrador al principio?', opts: ['La gramática únicamente', 'El vocabulario y los verbos', 'Los sonidos nasales y la gramática', 'La pronunciación de las letras'], a: 2, fb: '"Os sons nasais eram estranhos para mim e a gramática parecia complicada."' },
      { q: '¿Qué consejo daba siempre el profesor?', opts: ['Leer libros todos los días', 'Escuchar música y ver series en portugués', 'Viajar a Brasil lo antes posible', 'Tomar clases intensivas'], a: 1, fb: '"Você deve ouvir música e assistir séries em português todo dia" — "deve" = debe (obligación/consejo).' },
      { q: '¿Qué significa "fui melhorando" en el contexto del texto?', opts: ['Mejoré de repente', 'Fui a mejorar (futuro)', 'Fui mejorando (progreso gradual en el pasado)', 'Mejoré una sola vez'], a: 2, fb: '"Fui melhorando" = fui mejorando (progreso continuo en el pasado). Perífrasis verbal con imperfeito.' },
      { q: '¿Cuántos minutos al día recomienda practicar el narrador como mínimo?', opts: ['Cinco minutos', 'Diez minutos', 'Treinta minutos', 'Una hora'], a: 1, fb: '"...mesmo que seja por dez minutos" — aunque sea por diez minutos. "Mesmo que" = aunque.' },
      { q: '¿Qué actitud recomienda el narrador respecto a los errores?', opts: ['Evitarlos a toda costa', 'No preocuparse por ellos', 'No tener miedo de errar, pues los errores enseñan', 'Corregirlos siempre inmediatamente'], a: 2, fb: '"Nunca tenha medo de errar — os erros ensinam" — no tengas miedo de equivocarte, los errores enseñan.' },
    ],
    openQ: '¿Qué consejos da el narrador para aprender portugués? Menciona dos.',
    prodPrompt: 'Escribe 3 oraciones sobre cómo aprendes español/portugués. Usa "devia" o "posso": "Devo praticar... / Posso melhorar..."',
  },
  {
    id: 5, title: 'Uma mensagem do exterior', topic: 'Comunicação', words: 98, grammar: 'Pretérito perfeito + presente + futuro',
    text: 'Olá, mamãe! Cheguei bem em Lisboa ontem à noite. O apartamento é pequeno mas muito aconchegante. Ontem, comi um pastel de nata numa padaria perto de casa — é incrível! Hoje de manhã, visitei o Castelo de São Jorge e tirei muitas fotos. A vista da cidade é deslumbrante. Agora estou num café, escrevendo esta mensagem. O Wi-Fi aqui é ótimo. Ainda estou me acostumando ao sotaque português europeu — é bem diferente do brasileiro! Amanhã vou ao Museu Nacional e depois vou jantar com meus colegas de trabalho. Estou adorando a cidade. Você vai adorar quando vier me visitar!',
    vocab: {
      'cheguei': 'llegué', 'aconchegante': 'acogedor', 'comi': 'comí', 'pastel de nata': 'pastel de nata (hojaldre portugués)',
      'padaria': 'panadería', 'incrível': 'increíble', 'visitei': 'visité', 'castelo': 'castillo',
      'tirei': 'saqué (fotos)', 'vista': 'vista', 'deslumbrante': 'deslumbrante', 'escrevendo': 'escribiendo',
      'acostumando': 'acostumbrando', 'sotaque': 'acento', 'diferente': 'diferente', 'adorando': 'adorando',
      'amanhã': 'mañana', 'museu': 'museo', 'colegas': 'colegas/compañeros', 'adorar': 'adorar',
    },
    preQ: ['¿Qué verbos en diferentes tiempos esperarías en un mensaje que mezcla "llegué ayer", "estoy ahora" y "mañana voy"?', '¿Qué crees que significa "pastel de nata"? ¿Puedes adivinarlo por el contexto?'],
    mcq: [
      { q: '¿Cuándo llegó la narradora a Lisboa?', opts: ['Esta mañana', 'Ayer por la noche', 'Hace dos días', 'Ayer por la mañana'], a: 1, fb: '"Cheguei bem em Lisboa ontem à noite" — pretérito perfeito: "cheguei" (llegué), "ontem à noite" = ayer por la noche.' },
      { q: '¿Cómo describe la narradora el apartamento?', opts: ['Grande y caro', 'Pequeño pero acogedor', 'Moderno y espacioso', 'Antiguo y cómodo'], a: 1, fb: '"O apartamento é pequeno mas muito aconchegante" — "aconchegante" = acogedor (estado permanente → ser).' },
      { q: '¿Qué hizo la narradora esta mañana?', opts: ['Fue al Museo Nacional', 'Comió un pastel de nata', 'Visitó el Castillo de São Jorge', 'Llegó a Lisboa'], a: 2, fb: '"Hoje de manhã, visitei o Castelo de São Jorge" — pretérito perfeito de hoje (acciones de hoy ya concluidas).' },
      { q: '¿Qué dificultad está experimentando la narradora?', opts: ['Encontrar buenos restaurantes', 'Acostumbrarse al acento portugués europeo', 'El Wi-Fi es muy lento', 'El apartamento es muy pequeño'], a: 1, fb: '"Ainda estou me acostumando ao sotaque português europeu — é bem diferente do brasileiro!" — ESTAR + gerundio = proceso en curso.' },
      { q: '¿Qué planes tiene la narradora para mañana?', opts: ['Visitar el Castillo y ir al mar', 'Ir al Museo Nacional y cenar con colegas', 'Tomar un vuelo de regreso', 'Explorar los barrios históricos'], a: 1, fb: '"Amanhã vou ao Museu Nacional e depois vou jantar com meus colegas" — ir + infinitivo para planes futuros.' },
      { q: '¿Qué le dice la narradora a su mamá al final del mensaje?', opts: ['Que ya regresará pronto', 'Que le mandará fotos por email', 'Que le encantará la ciudad cuando vaya a visitarla', 'Que necesita más dinero'], a: 2, fb: '"Você vai adorar quando vier me visitar!" — "vai adorar" (ir + inf.) = futuro próximo; "vier" = futuro do subjuntivo.' },
    ],
    openQ: '¿Qué hizo la narradora ayer y qué planea hacer mañana? Menciona dos actividades de cada momento.',
    prodPrompt: 'Escribe un mensaje corto (3-4 frases) como si estuvieras de viaje. Mezcla pasado, presente y futuro: "Cheguei..., Agora estou..., Amanhã vou..."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-ZÀ-ÿ]/g, '').toLowerCase(),
  }));
}

type Phase = 'pre' | 'read' | 'questions' | 'done';

function TextExercise({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('pre');
  const [preAnswers, setPreAnswers] = useState<string[]>(['', '']);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [openAns, setOpenAns] = useState('');
  const [prod, setProd] = useState('');

  const tokens = tokenize(t.text);
  const allMcqDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleAnswer(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  const STEPS = ['Antes de ler', 'Leitura', 'Perguntas', 'Resultado'];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>📖 Leitura A2</button>
        <span>/</span>
        <span style={{ color: COLOR, fontWeight: 800 }}>Texto {t.id}</span>
      </div>
      <div style={{ display: 'flex', gap: '0', marginBottom: '1.75rem', overflowX: 'auto' }}>
        {STEPS.map((s, i) => {
          const phaseIdx = ['pre', 'read', 'questions', 'done'].indexOf(phase);
          const active = phaseIdx === i, done2 = phaseIdx > i;
          return (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: active ? COLOR : done2 ? '#059669' : 'var(--line-soft)', color: (active || done2) ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {done2 ? '✓' : i + 1}
                </div>
                <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: active ? COLOR : done2 ? '#059669' : 'var(--muted)', fontWeight: active ? 800 : 400, marginTop: 4, textAlign: 'center', whiteSpace: 'nowrap' }}>{s}</span>
              </div>
              {i < STEPS.length - 1 && <div style={{ height: 2, flex: 1, background: done2 ? '#059669' : 'var(--line-soft)', margin: '0 4px', marginBottom: 20 }} />}
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div>
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Tema · {t.topic}</div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)' }}>{t.title}</h2>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              <span style={{ fontSize: '0.68rem', padding: '0.12rem 0.45rem', borderRadius: 5, background: `${COLOR}15`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>~{t.words} palavras</span>
              <span style={{ fontSize: '0.68rem', padding: '0.12rem 0.45rem', borderRadius: 5, background: `${COLOR}15`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>Gramática: {t.grammar}</span>
            </div>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Antes de ler — reflita</div>
            {t.preQ.map((q, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{i + 1}. {q}</p>
                <textarea value={preAnswers[i]} onChange={e => { const a = [...preAnswers]; a[i] = e.target.value; setPreAnswers(a); }} rows={2} placeholder="Escreva sua hipótese..."
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.88rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background: COLOR, borderColor: COLOR }}>Ler o texto →</button>
        </div>
      )}

      {phase === 'read' && (
        <div>
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Clique em uma palavra para ver a tradução</div>
            <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative' }}>
              {tokens.map((tok, i) => {
                if (tok.isSpace) return <span key={i}>{tok.raw}</span>;
                const has = !!t.vocab[tok.clean];
                const isActive = activeIdx === i;
                return (
                  <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                    <button onClick={() => setActiveIdx(isActive ? null : i)}
                      style={{ background: isActive ? `${COLOR}18` : has ? `${COLOR}08` : 'transparent', border: isActive ? `1.5px solid ${COLOR}` : has ? `1px dashed ${COLOR}44` : 'none', borderRadius: 5, padding: '0 3px', cursor: has ? 'pointer' : 'default', fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s' }}>
                      {tok.raw}
                    </button>
                    {isActive && (
                      <span style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: t.vocab[tok.clean] ? COLOR : '#6b7280', color: '#fff', borderRadius: 8, padding: '0.25rem 0.6rem', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10, boxShadow: `0 4px 14px ${COLOR}30`, marginTop: 3 }}>
                        {t.vocab[tok.clean] ?? '(palavra gramatical)'}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background: COLOR, borderColor: COLOR }}>Responder perguntas →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Antes de ler</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')} style={{ marginBottom: '1rem' }}>← Voltar ao texto</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {t.mcq.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={qi} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: '1.5px solid var(--line-soft)', background: 'var(--bg)' }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Pergunta {qi + 1}</div>
                  <p style={{ margin: '0 0 0.75rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{q.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect = oi === q.a, isSel = ans === oi;
                      let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                      if (isDone && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} onClick={() => handleAnswer(qi, oi)} disabled={isDone}
                          style={{ textAlign: 'left', padding: '0.55rem 0.9rem', borderRadius: 9, border, background: bg, color, fontSize: '0.9rem', cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
                          <span style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55 }}>{String.fromCharCode(65 + oi)}.</span>
                          {opt}
                          {isDone && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                          {isDone && isSel && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && <div style={{ marginTop: '0.6rem', padding: '0.55rem 0.8rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.8rem', color: 'var(--muted)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
                </div>
              );
            })}
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: '1.5px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Pergunta aberta</div>
              <p style={{ margin: '0 0 0.6rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{t.openQ}</p>
              <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={2} placeholder="Escreva sua resposta..."
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
            </div>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: `1.5px solid ${COLOR}22`, background: `${COLOR}04` }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Mini-produção</div>
              <p style={{ margin: '0 0 0.6rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{t.prodPrompt}</p>
              <textarea value={prod} onChange={e => setProd(e.target.value)} rows={2} placeholder="Escreva em português..."
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
            </div>
            {allMcqDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background: COLOR, borderColor: COLOR }}>Ver resultado →</button>}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ padding: '1.75rem', borderRadius: 18, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🎉' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.5rem' }}>{score} / {t.mcq.length} corretas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem' }}>{score === t.mcq.length ? 'Perfeito! Compreensão total.' : score >= 4 ? 'Muito bem! Releia as partes erradas.' : 'Releia o texto com calma e tente novamente.'}</p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setAnswers({}); setRevealed({}); setOpenAns(''); setProd(''); setPreAnswers(['', '']); }} style={{ background: COLOR, borderColor: COLOR }}>Tentar de novo</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Outros textos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LeituraPortuguesA2() {
  const [textId, setTextId] = useState<number | null>(null);
  const text = TEXTS.find(t => t.id === textId);

  if (text) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <TextExercise t={text} onBack={() => setTextId(null)} />
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Leitura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Leitura · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Compreensão Leitora A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>5 textos autênticos sobre viagens, trabalho e comunicação. Vocabulário interativo e 6 perguntas por texto.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map(t => (
            <button key={t.id} onClick={() => setTextId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.1rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{t.topic} · {t.grammar} · {t.mcq.length} perguntas</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
