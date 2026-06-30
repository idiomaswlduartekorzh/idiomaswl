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
    id: 1, title: 'Trabalho remoto no Brasil', topic: 'Atualidade', words: 138, grammar: 'Subjuntivo + presente',
    text: 'O trabalho remoto se tornou uma realidade para milhões de brasileiros após a pandemia. Embora muitas empresas tenham voltado ao modelo presencial, é importante que os trabalhadores tenham flexibilidade. Pesquisas mostram que funcionários que trabalham de casa são tão produtivos quanto aqueles que vão ao escritório. Além disso, muitos profissionais preferem o home office porque economizam tempo de deslocamento. As empresas, por sua vez, gastam menos com infraestrutura. No entanto, é necessário que haja uma comunicação eficiente entre as equipes. Especialistas recomendam que as organizações invistam em ferramentas digitais para que os colaboradores se sintam incluídos. Apesar dos desafios, o trabalho remoto veio para ficar.',
    vocab: {
      'tornou': 'se convirtió', 'embora': 'aunque', 'presencial': 'presencial', 'flexibilidade': 'flexibilidad',
      'produtivos': 'productivos', 'deslocamento': 'desplazamiento', 'infraestrutura': 'infraestructura',
      'necessário': 'necesario', 'haja': 'haya (subjuntivo de haver)', 'equipes': 'equipos',
      'recomendam': 'recomiendan', 'invistam': 'inviertan (subjuntivo de investir)', 'colaboradores': 'colaboradores',
      'apesar': 'a pesar', 'desafios': 'desafíos',
    },
    preQ: ['¿Conoces el tema del teletrabajo? ¿Qué ventajas y desventajas conoces?', '¿Reconoces las palabras "embora" y "apesar de"? ¿Qué crees que significan?'],
    mcq: [
      { q: '¿Cuándo se convirtió el teletrabajo en realidad para muchos brasileños?', opts: ['Antes de la pandemia', 'Después de la pandemia', 'Durante los años 90', 'En los últimos 5 años'], a: 1, fb: '"O trabalho remoto se tornou uma realidade... após a pandemia" — após = después de.' },
      { q: '¿Qué dice el texto sobre la productividad del trabajo remoto?', opts: ['Los trabajadores remotos son menos productivos', 'Los trabajadores remotos son más productivos', 'Los trabajadores remotos son igual de productivos que los de oficina', 'No se menciona la productividad'], a: 2, fb: '"...são tão produtivos QUANTO aqueles que vão ao escritório" — tão...quanto = tan...como (igualdad).' },
      { q: '¿Por qué muchos prefieren trabajar desde casa?', opts: ['Porque el salario es más alto', 'Porque ahorran tiempo de desplazamiento', 'Porque tienen más vacaciones', 'Porque el trabajo es más fácil'], a: 1, fb: '"...economizam tempo de deslocamento" — economizar = ahorrar; deslocamento = desplazamiento.' },
      { q: '¿Qué estructura gramatical aparece en "é necessário que haja"?', opts: ['Comparativo de superioridad', 'Voz passiva', 'Subjuntivo após expressão impessoal', 'Futuro do pretérito'], a: 2, fb: '"É necessário que" + subjuntivo (haja = subjuntivo de haver). Estructura impersonal → subjuntivo.' },
      { q: '¿Qué recomiendan los especialistas?', opts: ['Volver al trabajo presencial', 'Reducir horas de trabajo', 'Invertir en herramientas digitales', 'Contratar más empleados'], a: 2, fb: '"Especialistas recomendam que as organizações invistam em ferramentas digitais" — invistam = subjuntivo de investir.' },
      { q: '¿Cuál es la conclusión del texto?', opts: ['El trabajo remoto desaparecerá pronto', 'Las empresas prefieren el modelo presencial', 'El trabajo remoto llegó para quedarse', 'La productividad ha bajado con el teletrabajo'], a: 2, fb: '"Apesar dos desafios, o trabalho remoto veio para ficar" — veio para ficar = llegó para quedarse.' },
    ],
    openQ: '¿Cuáles son las dos principales ventajas del trabajo remoto mencionadas en el texto?',
    prodPrompt: 'Escribe 3 oraciones sobre el teletrabajo usando "é importante que", "embora" y "é necessário que".',
  },
  {
    id: 2, title: 'A proteção do meio ambiente', topic: 'Meio ambiente', words: 132, grammar: 'Subjuntivo + condicional',
    text: 'A proteção do meio ambiente é uma das maiores responsabilidades da humanidade. Embora muitos países tenham assinado acordos climáticos, ainda é necessário que haja mais comprometimento real. Cientistas afirmam que, se não agirmos rapidamente, as consequências serão devastadoras. Seria fundamental que os governos investissem mais em energias renováveis e que reduzissem as emissões de carbono. A biodiversidade, que inclui milhões de espécies animais e vegetais, está ameaçada pelo desmatamento. Para que o planeta se recupere, é preciso que cada cidadão faça a sua parte. O Brasil, cuja Amazônia representa 10% das espécies do mundo, tem um papel crucial nesta missão.',
    vocab: {
      'responsabilidades': 'responsabilidades', 'assinado': 'firmado', 'acordos': 'acuerdos',
      'comprometimento': 'compromiso', 'agirmos': 'actuemos (subjuntivo)', 'consequências': 'consecuencias',
      'devastadoras': 'devastadoras', 'fundamental': 'fundamental', 'investissem': 'invirtieran (subj.)',
      'reduzissem': 'redujeran (subj.)', 'emissões': 'emisiones', 'biodiversidade': 'biodiversidad',
      'ameaçada': 'amenazada', 'desmatamento': 'deforestación', 'cidadão': 'ciudadano', 'crucial': 'crucial',
    },
    preQ: ['¿Qué verbos en subjuntivo crees que encontrarás en un texto sobre el medio ambiente?', '¿Qué significa "cuja Amazônia"? ¿Qué pronome relativo es "cuja"?'],
    mcq: [
      { q: '¿Qué dice el texto sobre los acuerdos climáticos?', opts: ['Muchos países los han firmado y son suficientes', 'Muchos países los han firmado pero falta más compromiso', 'Ningún país ha firmado acuerdos climáticos', 'Los acuerdos climáticos son innecesarios'], a: 1, fb: '"Embora muitos países tenham assinado acordos climáticos, ainda é necessário que haja mais comprometimento real." Embora = aunque (concesión).' },
      { q: '¿Qué estructura usa "se não agirmos rapidamente"?', opts: ['Voz passiva', 'Condición hipotética con si', 'Discurso indireto', 'Comparativo'], a: 1, fb: '"Se + agirmos" = si + subjuntivo del futuro (futuro do subjuntivo). Expresa condición con consecuencia futura.' },
      { q: '¿Qué propone el texto sobre los gobiernos?', opts: ['Que construyan más ciudades', 'Que inviertan en energías renovables y reduzcan emisiones', 'Que firmen más acuerdos', 'Que protejan solo la Amazonía'], a: 1, fb: '"Seria fundamental que os governos investissem mais em energias renováveis e que reduzissem as emissões" — condicional (seria) + imperfeito do subjuntivo.' },
      { q: '¿Qué amenaza la biodiversidad según el texto?', opts: ['La contaminación del agua', 'El desmatamento (deforestación)', 'La caza furtiva', 'El cambio climático únicamente'], a: 1, fb: '"A biodiversidade... está ameaçada pelo desmatamento" — voz passiva con agente: pelo desmatamento.' },
      { q: '¿Qué función tiene "cuja" en "o Brasil, cuja Amazônia"?', opts: ['Objeto direto', 'Pronome relativo de posse (la Amazonía de Brasil)', 'Conjunção causal', 'Pronome demonstrativo'], a: 1, fb: '"Cuja" = pronome relativo de posse. "A Amazônia do Brasil" → "o Brasil, cuja Amazônia". Concorda con "Amazônia" (fem.).' },
      { q: '¿Cuál es el papel de Brasil según el texto?', opts: ['Solo un papel secundario', 'Un papel crucial por su Amazônia', 'Un papel negativo por la deforestación', 'No se menciona un papel específico'], a: 1, fb: '"O Brasil... tem um papel crucial nesta missão" — crucial = fundamental, muy importante. La Amazônia representa 10% de las especies mundiales.' },
    ],
    openQ: '¿Por qué el Brasil tiene un papel especial en la protección del medio ambiente? Cita datos del texto.',
    prodPrompt: 'Escribe 3 frases sobre el medio ambiente usando "seria fundamental que", "é preciso que" y "cuja/cujo".',
  },
  {
    id: 3, title: 'A culinária brasileira pelo mundo', topic: 'Cultura', words: 130, grammar: 'Voz passiva + pronomes relativos',
    text: 'A culinária brasileira é considerada uma das mais diversas do mundo. Pratos como a feijoada, que é preparada com feijão preto e carnes variadas, e o acarajé, que foi trazido pelos africanos escravizados, refletem a mistura cultural do Brasil. A caipirinha, o coquetel mais famoso do país, é feita com cachaça, limão e açúcar. Nos últimos anos, a gastronomia brasileira tem sido valorizada internacionalmente. Restaurantes brasileiros foram abertos em diversas cidades do mundo, onde chefs talentosos apresentam ingredientes nativos como o açaí, o cupuaçu e o jambu. O turismo gastronômico, pelo qual muitos viajantes escolhem seus destinos, tem crescido muito no Brasil.',
    vocab: {
      'considerada': 'considerada (voz passiva)', 'diversas': 'diversas', 'feijoada': 'feijoada (plato con frijoles)',
      'preparada': 'preparada', 'feijão preto': 'frijol negro', 'carnes': 'carnes', 'acarajé': 'acarajé (bolita de frijol frito)',
      'trazido': 'traído', 'escravizados': 'esclavizados', 'refletem': 'reflejan', 'mistura': 'mezcla',
      'coquetel': 'cóctel', 'cachaça': 'cachaça (aguardiente de caña)', 'valorizada': 'valorizada',
      'ingredientes': 'ingredientes', 'nativos': 'nativos', 'açaí': 'açaí', 'cupuaçu': 'cupuaçu (fruta amazónica)',
    },
    preQ: ['¿Cuántos platos o ingredientes brasileños conoces? ¿Cuáles son?', '¿Reconoces la voz passiva en "é considerada" y "foi trazido"? ¿Cómo funciona?'],
    mcq: [
      { q: '¿Cómo se describe la culinária brasileira al inicio del texto?', opts: ['La más cara del mundo', 'Una de las más diversas del mundo', 'La más saludable del mundo', 'La más conocida de América'], a: 1, fb: '"A culinária brasileira é considerada uma das mais diversas do mundo" — voz passiva: é + particípio (considerada).' },
      { q: '¿Cuál es el origen cultural del acarajé?', opts: ['Indígena', 'Europeo', 'Africano (trazido pelos africanos escravizados)', 'Japonés'], a: 2, fb: '"O acarajé, que foi trazido pelos africanos escravizados" — voz passiva: foi + trazido. "Pelos" = por los (agente).' },
      { q: '¿Con qué se hace la caipirinha?', opts: ['Ron, lima y azúcar', 'Cachaça, limón y azúcar', 'Vodka, limón y menta', 'Cachaça, açaí y azúcar'], a: 1, fb: '"A caipirinha... é feita com cachaça, limão e açúcar" — é feita = voz passiva de fazer.' },
      { q: '¿Qué significa el pronome "pelo qual" en "o turismo gastronômico, pelo qual muitos viajantes escolhem seus destinos"?', opts: ['por el que / por el cual', 'el que / que', 'en el que / donde', 'cuyo / cujo'], a: 0, fb: '"Pelo qual" = por el que/cual. Después de la preposición "por" + artigo → "pelo qual". Se refiere a "turismo" (masc.).' },
      { q: '¿Dónde han abierto restaurantes brasileños recientemente?', opts: ['Solo en ciudades de América del Sur', 'En diversas ciudades del mundo', 'En ciudades europeas únicamente', 'En Estados Unidos y Europa'], a: 1, fb: '"Restaurantes brasileiros foram abertos em diversas cidades do mundo" — voz passiva: foram + abertos (participio pl. de abrir).' },
      { q: '¿Qué papel tienen los chefs mencionados?', opts: ['Importar ingredientes exóticos', 'Presentar ingredientes nativos como açaí y cupuaçu', 'Enseñar recetas tradicionales', 'Fusionar cocina brasileña con europea'], a: 1, fb: '"...onde chefs talentosos apresentam ingredientes nativos como o açaí, o cupuaçu e o jambu."' },
    ],
    openQ: '¿Cómo refleja la culinária brasileira la historia del país? Menciona al menos dos ejemplos del texto.',
    prodPrompt: 'Escribe 3 frases sobre la gastronomía de tu país o región usando la voz passiva y pronomes relativos.',
  },
  {
    id: 4, title: 'Os benefícios de aprender idiomas', topic: 'Educação', words: 135, grammar: 'Voz passiva + subjuntivo',
    text: 'Aprender um novo idioma é considerado pelos especialistas como uma das melhores atividades para o cérebro. Estudos mostram que pessoas bilíngues são mais criativas e têm uma memória melhor do que aquelas que falam apenas uma língua. Além disso, é comprovado que o bilinguismo retarda o aparecimento de doenças como o Alzheimer. Para que esses benefícios sejam alcançados, é recomendado que o aprendiz estude com regularidade e que se exponha ao idioma o máximo possível. Aplicativos, séries e músicas são utilizados por milhões de pessoas no mundo todo. Embora seja difícil, é necessário que o estudante não desista nos momentos de dificuldade. O esforço, que é recompensado com o tempo, vale completamente a pena.',
    vocab: {
      'considerado': 'considerado (voz passiva)', 'especialistas': 'especialistas', 'cérebro': 'cerebro',
      'bilíngues': 'bilingüe', 'criativas': 'creativas', 'comprovado': 'comprobado (voz passiva)',
      'bilinguismo': 'bilingüismo', 'retarda': 'retrasa', 'aparecimento': 'aparición',
      'alcançados': 'alcanzados', 'recomendado': 'recomendado (voz passiva)', 'aprendiz': 'aprendiz',
      'regularidade': 'regularidad', 'exponha': 'exponga (subjuntivo)', 'utilizados': 'utilizados',
      'desista': 'desista (subjuntivo)', 'recompensado': 'recompensado (voz passiva)',
    },
    preQ: ['¿Cuántos idiomas hablas? ¿Crees que te ha dado ventajas cognitivas?', '¿Puedes identificar los participios pasados en el texto? ¿Cuáles pueden ser voz passiva?'],
    mcq: [
      { q: '¿Qué dice el texto sobre las personas bilingües?', opts: ['Son más disciplinadas', 'Son más creativas y tienen mejor memoria', 'Son mejores en matemáticas', 'Aprenden idiomas más fácilmente'], a: 1, fb: '"...pessoas bilíngues são mais criativas e têm uma memória melhor do que aquelas que falam apenas uma língua."' },
      { q: '¿Qué beneficio para la salud menciona el texto?', opts: ['Mejora la visión', 'Reduce el estrés', 'Retrasa el aparecimiento del Alzheimer', 'Mejora la circulación'], a: 2, fb: '"É comprovado que o bilinguismo retarda o aparecimento de doenças como o Alzheimer."' },
      { q: '¿Qué se recomienda para obtener los beneficios del bilingüismo?', opts: ['Solo tomar clases formales', 'Estudiar con regularidad y exponerse al idioma', 'Vivir en el extranjero', 'Hablar con nativos únicamente'], a: 1, fb: '"É recomendado que o aprendiz estude com regularidade e que se exponha ao idioma o máximo possível."' },
      { q: '¿Cuántos participios pasados en función de voz passiva aparecen en el texto?', opts: ['Solo 1', '2', 'Al menos 3', '5 o más'], a: 2, fb: 'Voz passiva: "considerado", "comprovado", "alcançados", "recomendado", "utilizados", "recompensado" — al menos 3 (y hasta 6).' },
      { q: '¿Qué recursos mencionan para la exposición al idioma?', opts: ['Libros y diccionarios', 'Aplicativos, séries e músicas', 'Viajes y intercambios', 'Clases presenciales'], a: 1, fb: '"Aplicativos, séries e músicas são utilizados por milhões de pessoas no mundo todo." — Voz passiva.' },
      { q: '¿Cuál es la actitud recomendada ante las dificultades?', opts: ['Tomar un descanso largo', 'Cambiar de método de estudio', 'No desistir en los momentos difíciles', 'Buscar un tutor'], a: 2, fb: '"...é necessário que o estudante não desista nos momentos de dificuldade." — subjuntivo após "é necessário que".' },
    ],
    openQ: '¿Cuáles son los dos principales beneficios de aprender idiomas mencionados en el texto?',
    prodPrompt: 'Escribe 3 frases sobre tu experiencia aprendiendo idiomas usando voz passiva: "é considerado que", "é recomendado que", "é comprovado que".',
  },
  {
    id: 5, title: 'A cidade do futuro', topic: 'Ciência e tecnologia', words: 142, grammar: 'Condicional + subjuntivo',
    text: 'Como seriam as cidades do futuro se as tecnologias atuais continuassem evoluindo? Especialistas acreditam que, dentro de algumas décadas, as cidades inteligentes seriam completamente diferentes das de hoje. Os carros autônomos, que já estão sendo desenvolvidos por grandes empresas, substituiriam os veículos tradicionais. A energia das casas seria gerada por painéis solares e a coleta de lixo seria feita por robôs. Para que isso aconteça, seria necessário que os governos investissem bilhões em infraestrutura digital. Muitos urbanistas defendem que, embora seja caro no início, o retorno a longo prazo valeria muito a pena. A cidade ideal, cujo design priorizaria o pedestre e o ciclista, reduziria as emissões de CO₂ em até 60%.',
    vocab: {
      'seriam': 'serían (condicional)', 'continuassem': 'continuaran (subj. imperf.)', 'evoluindo': 'evolucionando',
      'décadas': 'décadas', 'inteligentes': 'inteligentes', 'autônomos': 'autónomos',
      'desenvolvidos': 'desarrollados', 'substituiriam': 'sustituirían (condicional)', 'veículos': 'vehículos',
      'gerada': 'generada', 'painéis solares': 'paneles solares', 'coleta de lixo': 'recolección de basura',
      'urbanistas': 'urbanistas', 'embora seja': 'aunque sea (subj.)', 'retorno': 'retorno / beneficio',
      'valeria': 'valdría (condicional)', 'priorizaria': 'priorizaría (condicional)', 'pedestre': 'peatón',
    },
    preQ: ['¿Cómo imaginas una ciudad del futuro? ¿Qué cambios habría?', '¿Reconoces el condicional en "seriam", "substituiriam", "valeria"? ¿Cuál es su función?'],
    mcq: [
      { q: '¿Cuál es la pregunta principal que plantea el texto?', opts: ['¿Cuándo serán las ciudades del futuro?', '¿Cómo serían las ciudades si la tecnología siguiera evolucionando?', '¿Quiénes diseñarán las ciudades del futuro?', '¿Por qué las ciudades actuales son problemáticas?'], a: 1, fb: '"Como seriam as cidades do futuro se as tecnologias atuais continuassem evoluindo?" — hipótese con condicional + imperfeito do subjuntivo.' },
      { q: '¿Qué reemplazaría a los vehículos tradicionales?', opts: ['Trenes de alta velocidad', 'Bicis eléctricas', 'Carros autônomos', 'Drones de transporte'], a: 2, fb: '"Os carros autônomos... substituiriam os veículos tradicionais." — substituiriam = condicional de substituir.' },
      { q: '¿Cómo se generaría la energía en las casas del futuro?', opts: ['Con energía nuclear', 'Con paneles solares', 'Con turbinas eólicas', 'Con gas natural'], a: 1, fb: '"A energia das casas seria gerada por painéis solares" — seria gerada = voz passiva no condicional.' },
      { q: '¿Qué afirman los urbanistas sobre el costo inicial?', opts: ['Que es un obstáculo insuperable', 'Que sería caro pero valdría la pena a largo plazo', 'Que sería barato con las nuevas tecnologías', 'Que el gobierno no debería pagar'], a: 1, fb: '"...embora seja caro no início, o retorno a longo prazo valeria muito a pena." — embora + subjuntivo (seja); condicional (valeria).' },
      { q: '¿Qué priorizaría el diseño de la ciudad ideal?', opts: ['Los automóviles y la velocidad', 'Los edificios altos y el comercio', 'El peatón y el ciclista', 'Los espacios verdes únicamente'], a: 2, fb: '"...cujo design priorizaria o pedestre e o ciclista" — cujo = pronome relativo de posse (o design da cidade); priorizaria = condicional.' },
      { q: '¿En cuánto se reduciría el CO₂ en la ciudad ideal?', opts: ['Hasta un 30%', 'Hasta un 45%', 'Hasta un 60%', 'Hasta un 80%'], a: 2, fb: '"...reduziria as emissões de CO₂ em até 60%." — reduziria = condicional de reduzir.' },
    ],
    openQ: '¿Cuáles son las tres características principales de la ciudad del futuro descritas en el texto?',
    prodPrompt: 'Escribe 3 frases sobre la ciudad ideal usando el condicional: "A cidade perfeita seria...", "Haveria...", "Os cidadãos poderiam..."',
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
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>📖 Leitura B1</button>
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

export default function LeituraPortuguesB1() {
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Leitura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Leitura · Português B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Compreensão Leitora B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>5 textos B1 sobre atualidade, cultura e ciência. Vocabulário interativo, subjuntivo e condicional em contexto.</p>
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
