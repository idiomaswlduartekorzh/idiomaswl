'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#003189';

interface ReadingText {
  id: number; title: string; topic: string; grammar: string; text: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; opts: string[]; a: number; fb: string }[];
  openQ: string; prodPrompt: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Le travail à distance', topic: 'Société et travail', grammar: 'Subjonctif + conditionnel',
    text: "De plus en plus d'entreprises adoptent le télétravail. Bien que certains employeurs craignent une baisse de productivité, les études montrent que les travailleurs à distance sont souvent plus efficaces. Il est essentiel que les équipes maintiennent une communication régulière pour que les projets avancent correctement. Selon un rapport récent, 68% des salariés préféreraient continuer à travailler depuis chez eux au moins trois jours par semaine. Cependant, il ne faut pas que le télétravail remplace totalement le bureau, car les interactions humaines sont importantes pour la créativité. Les entreprises qui réussiraient à trouver un équilibre entre présentiel et télétravail auraient un avantage concurrentiel significatif.",
    vocab: { adoptent: 'adoptan', craignent: 'temen', efficaces: 'eficaces', maintiennent: 'mantengan', avancent: 'avancen', salariés: 'asalariados', préféreraient: 'preferirían', totalement: 'totalmente', créativité: 'creatividad', concurrentiel: 'competitivo', équilibre: 'equilibrio', présentiel: 'presencial' },
    preQ: [
      { q: '¿Has trabajado o estudias de forma remota?', opts: ['Sí, regularmente', 'A veces', 'No, prefiero presencial'], a: -1 },
      { q: '¿Qué crees que significa "télétravail"?', opts: ['Trabajo por televisión', 'Teletrabajo / trabajo remoto', 'Trabajo en telecomunicaciones'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué muestran los estudios sobre los teletrabajadores?', opts: ['Son menos productivos', 'Son frecuentemente más eficaces', 'No hay diferencia con los trabajadores presenciales', 'Se aburren más'], a: 1, fb: '"les travailleurs à distance sont souvent plus efficaces" — los estudios muestran mayor eficacia.' },
      { q: '¿Qué porcentaje preferiría continuar en teletrabajo?', opts: ['38%', '48%', '58%', '68%'], a: 3, fb: '"68% des salariés préféreraient continuer à travailler depuis chez eux" — 68%, con condicionnel pour info non confirmée.' },
      { q: '¿Qué construcción gramatical aparece en "il est essentiel que les équipes maintiennent"?', opts: ['Indicatif présent', 'Subjonctif présent', 'Conditionnel présent', 'Impératif'], a: 1, fb: '"Il est essentiel que" → subjonctif obligatoire. "Maintiennent" = subjonctif de "maintenir".' },
      { q: '¿Por qué NO debe el teletrabajo reemplazar totalmente la oficina?', opts: ['Es más caro', 'Las interacciones humanas son importantes para la creatividad', 'La tecnología no es suficiente', 'Los jefes no confían en los empleados'], a: 1, fb: '"les interactions humaines sont importantes pour la créativité" — la creatividad requiere contacto humano.' },
      { q: '¿Qué ventaja tendrían las empresas que encuentren el equilibrio?', opts: ['Pagarían menos impuestos', 'Tendrían un avantage concurrentiel significatif', 'Trabajarían menos horas', 'No habría ninguna ventaja'], a: 1, fb: '"Les entreprises qui réussiraient... auraient un avantage concurrentiel significatif" — condicionnel pour hypothèse.' },
      { q: '¿Cuál es el modo verbal de "préféreraient" y "auraient"?', opts: ['Futur simple', 'Subjonctif', 'Conditionnel présent', 'Imparfait'], a: 2, fb: '"Préféreraient" et "auraient" sont au conditionnel présent — ils expriment des hypothèses et des informations non confirmées.' },
    ],
    openQ: 'Según el texto, ¿cuáles son los pros y contras del teletrabajo?',
    prodPrompt: 'Escribe 4-5 frases sobre tu opinión del teletrabajo. Usa: "Il est important que...", "Je pense que...", "Bien que...", "Il faudrait que..."',
  },
  {
    id: 2, title: "La protection de l'environnement", topic: 'Environnement', grammar: 'Subjonctif après conjonctions',
    text: "La crise climatique est l'un des défis les plus urgents de notre époque. Pour que les générations futures puissent vivre dans un monde habitable, il faut que nous agissions maintenant. Bien que certains gouvernements aient pris des mesures importantes, les experts estiment qu'il est insuffisant. À moins que les émissions de carbone ne soient réduites de 50% d'ici 2030, les conséquences pourraient être catastrophiques. Les scientifiques insistent pour que les citoyens adoptent des comportements plus durables : moins de viande, plus de transports en commun, moins de déchets. Il est indispensable que chaque individu comprenne l'impact de ses choix quotidiens sur l'avenir de la planète.",
    vocab: { défis: 'desafíos', génération: 'generación', habitable: 'habitable', agissions: 'actuemos', insuffisant: 'insuficiente', émissions: 'emisiones', catastrophiques: 'catastróficas', durables: 'sostenibles', déchets: 'desperdicios/residuos', indispensable: 'indispensable', individu: 'individuo', quotidiens: 'cotidianos' },
    preQ: [
      { q: '¿Qué haces en tu vida diaria para cuidar el medio ambiente?', opts: ['Reciclo y uso transporte público', 'Algunas cosas pequeñas', 'Aún no he cambiado mis hábitos'], a: -1 },
      { q: '¿Qué significa "habitable" según el contexto?', opts: ['Que se puede habitar/vivir en él', 'Que tiene muchas casas', 'Que es muy caro'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué estructura gramatical aparece en "Pour que les générations futures puissent"?', opts: ['Infinitif', 'Subjonctif après "pour que"', 'Indicatif futur', 'Conditionnel'], a: 1, fb: '"Pour que" → subjonctif. "Puissent" = subjonctif de "pouvoir". Cette conjonction exprime le but.' },
      { q: '¿Cuándo deben reducirse las emisiones de carbono?', opts: ["D'ici 2025", "D'ici 2030", "D'ici 2050", "D'ici 2100"], a: 1, fb: '"d\'ici 2030" — la deadline pour réduire les émissions de 50%.' },
      { q: '¿Qué estructura usa "à moins que...ne soient réduites"?', opts: ['Conditionnel', 'Subjonctif après "à moins que"', 'Indicatif présent', 'Impératif'], a: 1, fb: '"À moins que" → subjonctif obligatoire. "Soient" = subjonctif de "être". "Ne" explétif après "à moins que" est correct.' },
      { q: '¿Cuáles son los comportamientos sostenibles que mencionan los científicos?', opts: ['Solo reciclar', 'Menos carne, más transporte público, menos residuos', 'Solo usar energías renovables', 'Plantar árboles'], a: 1, fb: '"moins de viande, plus de transports en commun, moins de déchets" — trois comportements durables.' },
      { q: '¿Por qué es necesario que cada individuo entienda su impacto?', opts: ['Para pagar menos impuestos', 'Para el avenir de la planète', 'Para ganar dinero', 'Para estudiar mejor'], a: 1, fb: '"Il est indispensable que chaque individu comprenne l\'impact... sur l\'avenir de la planète." — el futuro del planeta depende de nuestras acciones.' },
      { q: '¿Cuántas veces aparece el subjonctif en el texto?', opts: ['1 vez', '2 veces', '3-4 veces', 'Más de 5 veces'], a: 3, fb: 'El subjonctif aparece más de 5 veces: puissent, agissions, aient, soient, adoptent, comprenne — son expresiones de obligación, concesión y condición.' },
    ],
    openQ: '¿Qué medidas crees que son las más urgentes para el medio ambiente? Usa el subjonctif.',
    prodPrompt: 'Escribe 4 frases sobre qué debería hacer el gobierno para proteger el medio ambiente. Usa: "Il faut que...", "Il est indispensable que...", "Pour que...", "À moins que..."',
  },
  {
    id: 3, title: 'La gastronomie française dans le monde', topic: 'Culture et alimentation', grammar: 'Pronoms relatifs + discours indirect',
    text: "La gastronomie française, dont la réputation est mondiale, a été inscrite au Patrimoine culturel immatériel de l'UNESCO en 2010. Les plats que les chefs français ont popularisés à l'international — le foie gras, la bouillabaisse, les macarons — sont reconnus sur tous les continents. Les restaurateurs qui ouvrent des établissements à l'étranger affirment que leur cuisine crée des ponts culturels. Un chef étoilé de Paris a déclaré que la cuisine française était un ambassadeur culturel incomparable. Le critique gastronomique Antoine Dupont a expliqué que ce qui distingue la gastronomie française était son rapport au temps et aux ingrédients locaux. Les régions où la tradition culinaire est la plus forte, comme la Bourgogne ou la Bretagne, attirent des millions de touristes chaque année.",
    vocab: { inscrite: 'inscrita', patrimoine: 'patrimonio', immatériel: 'inmaterial', popularisés: 'popularizados', reconnus: 'reconocidos', continents: 'continentes', ponts: 'puentes', étoilé: 'estrella Michelin', ambassadeur: 'embajador', distingue: 'distingue', ingrédients: 'ingredientes', culinaire: 'culinaria', attirent: 'atraen' },
    preQ: [
      { q: '¿Conoces algún plato francés famoso?', opts: ['Sí, varios', 'Solo el croissant y la baguette', 'No conozco mucho'], a: -1 },
      { q: '¿Qué crees que significa "patrimoine culturel immatériel"?', opts: ['Patrimonio cultural material (edificios)', 'Patrimonio cultural inmaterial (tradiciones, cocina)', 'Patrimonio de la UNESCO solo'], a: -1 },
    ],
    mcq: [
      { q: '¿Cuándo fue inscrita la gastronomía francesa en la UNESCO?', opts: ['2005', '2008', '2010', '2015'], a: 2, fb: '"inscrite au Patrimoine culturel immatériel de l\'UNESCO en 2010".' },
      { q: '¿Qué pronom relatif aparece en "La gastronomie française, dont la réputation est mondiale"?', opts: ['qui', 'que', 'dont', 'où'], a: 2, fb: '"Dont" = complément de "de". "La réputation DE la gastronomie" → "dont la réputation". Dont remplace un complément introduit par DE.' },
      { q: '¿Cómo reporta el texto las palabras del chef?', opts: ['En discours direct avec guillemets', 'En discours indirect (il a déclaré que...)', 'No reporta sus palabras', 'En imparfait seulement'], a: 1, fb: '"Un chef étoilé a déclaré que la cuisine française était" — discours indirect: passé composé → imparfait.' },
      { q: '¿Según Antoine Dupont, qué distingue la gastronomía francesa?', opts: ['El precio de los platos', 'Los chefs con estrellas Michelin', 'Su rapport au temps et aux ingrédients locaux', 'La variedad de regiones'], a: 2, fb: '"ce qui distingue la gastronomie française était son rapport au temps et aux ingrédients locaux" — discours indirect de l\'explication de Dupont.' },
      { q: '¿Qué función tiene "que" en "Les plats que les chefs français ont popularisés"?', opts: ['Conjonction de subordination', 'Pronom relatif COD', 'Pronom relatif sujet', 'Mot interrogatif'], a: 1, fb: '"Que" = pronom relatif COD. Les chefs ont popularisé QUOI ? → les plats. C\'est le COD de "popularisés". Avec avoir, on accorde: popularisÉS.' },
      { q: '¿Qué tiempo verbal aparece en "était" (discours indirect) que correspondería a "est" (discours direct)?', opts: ['Conditionnel', 'PQP', 'Imparfait', 'Subjonctif'], a: 2, fb: 'Discours indirect passé: présent → imparfait. "La cuisine française EST..." → "...la cuisine française ÉTAIT..." (imparfait).' },
    ],
    openQ: 'Según el texto, ¿qué hace especial a la gastronomía francesa comparada con otras?',
    prodPrompt: 'Describe un plato típico de tu país usando pronoms relatifs. Ejemplo: "Le bandeja paisa, que beaucoup de Colombiens adorent, est un plat dont la réputation est nationale. C\'est un plat où..."',
  },
  {
    id: 4, title: "Les bienfaits de l'apprentissage des langues", topic: 'Éducation et cognition', grammar: 'Subjonctif + conditionnel + plus-que-parfait',
    text: "De nombreuses études neurologiques ont confirmé que l'apprentissage d'une nouvelle langue offre des bénéfices considérables pour le cerveau. Les scientifiques ont découvert que les personnes bilingues développaient une meilleure capacité de concentration et une résistance accrue aux maladies neurodégénératives. Il est remarquable que le cerveau humain puisse s'adapter à n'importe quel système linguistique, même après l'âge adulte. Si les gouvernements avaient investi davantage dans l'éducation multilingue dès le primaire, les résultats scolaires auraient été bien meilleurs. Les chercheurs insistent pour que l'apprentissage des langues commence le plus tôt possible. Bien que ce soit un processus exigeant, les récompenses cognitives, professionnelles et sociales en valent largement la peine.",
    vocab: { neurologiques: 'neurológicos', confirmé: 'confirmado', bénéfices: 'beneficios', cerveau: 'cerebro', bilingues: 'bilingües', concentration: 'concentración', résistance: 'resistencia', neurodégénératives: 'neurodegenerativas', s_adapter: 'adaptarse', linguistique: 'lingüístico', multilingue: 'multilingüe', exigeant: 'exigente', récompenses: 'recompensas' },
    preQ: [
      { q: '¿Cuántos idiomas hablas o estás aprendiendo?', opts: ['Solo uno (mi lengua nativa)', '2 idiomas', '3 o más idiomas'], a: -1 },
      { q: '¿Qué crees que significa "bilingue"?', opts: ['Que habla un idioma perfectamente', 'Que habla dos idiomas', 'Que estudia idiomas en la universidad'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué beneficio tienen las personas bilingues según los estudios?', opts: ['Ganan más dinero', 'Mejor concentración y mayor resistencia a enfermedades neurodegenerativas', 'Aprenden más rápido las matemáticas', 'Tienen más amigos'], a: 1, fb: '"meilleure capacité de concentration et une résistance accrue aux maladies neurodégénératives" — beneficios cognitivos y de salud.' },
      { q: '¿Qué modo verbal requiere "Il est remarquable que le cerveau puisse"?', opts: ['Indicatif', 'Conditionnel', 'Subjonctif', 'Impératif'], a: 2, fb: '"Il est remarquable que" → subjonctif. "Puisse" = subjonctif de "pouvoir". Expresiones impersonales de emoción → subjonctif.' },
      { q: '¿Qué tiempo aparece en "les résultats scolaires auraient été bien meilleurs"?', opts: ['Futur simple', 'Conditionnel passé', 'PQP', 'Imparfait'], a: 1, fb: '"Auraient été" = conditionnel passé. Es la consecuencia de "Si les gouvernements avaient investi" (PQP). Hypothèse passée irréelle : Si + PQP → conditionnel passé.' },
      { q: '¿Qué uso del PQP vemos en "Si les gouvernements avaient investi"?', opts: ['Antériorité narrative', 'Discours indirect', 'Hypothèse passée irréelle', 'Description d\'un état passé'], a: 2, fb: '"Si + PQP → conditionnel passé" = hypothèse passée irréelle. Los gobiernos NO invirtieron (en la realidad), pero si lo hubieran hecho, los resultados habrían sido mejores.' },
      { q: '¿Qué dice el texto sobre cuándo debe empezar el aprendizaje de idiomas?', opts: ['En la universidad', 'Lo antes posible', 'A los 10 años', 'No importa la edad'], a: 1, fb: '"Les chercheurs insistent pour que l\'apprentissage des langues commence le plus tôt possible" — pour que + subjonctif pour exprimer le but.' },
      { q: '¿Cómo describe el texto el proceso de aprendizaje?', opts: ['Fácil y rápido', 'Aburrido pero necesario', 'Exigente pero con grandes recompensas', 'Imposible después de cierta edad'], a: 2, fb: '"Bien que ce soit un processus exigeant, les récompenses... en valent largement la peine" — concesión con "bien que" + subjonctif.' },
    ],
    openQ: '¿Por qué aprendes francés? Menciona al menos dos beneficios personales o profesionales.',
    prodPrompt: 'Escribe 4-5 frases sobre los beneficios de aprender idiomas. Usa: "Il est important que...", "Si j\'avais commencé plus tôt...", "Bien que ce soit difficile...", "Je pense que..."',
  },
  {
    id: 5, title: 'La ville du futur', topic: 'Innovation et urbanisme', grammar: 'Conditionnel + subjonctif + pronoms relatifs',
    text: "Les urbanistes imaginent des métropoles qui fonctionneraient grâce à l'énergie renouvelable et où les voitures à combustion auraient disparu d'ici 2050. Pour que cette vision devienne réalité, il faudrait que les gouvernements, les entreprises et les citoyens collaborent étroitement. Les villes dont les infrastructures seraient les plus intelligentes pourraient réduire leurs émissions de carbone de 70%. Un expert a expliqué que les bâtiments futurs produiraient leur propre électricité grâce aux panneaux solaires. Bien que ces technologies existent déjà, leur déploiement à grande échelle poserait encore des défis considérables. Les architectes qui concevraient ces villes de demain auraient besoin d'une formation interdisciplinaire alliant technologie, écologie et sciences sociales.",
    vocab: { urbanistes: 'urbanistas', métropoles: 'metrópolis', combustion: 'combustión', disparu: 'desaparecido', collaborent: 'colaboren', étroitement: 'estrechamente', infrastructures: 'infraestructuras', intelligentes: 'inteligentes', déploiement: 'despliegue', grande_échelle: 'gran escala', concevraient: 'diseñarían', interdisciplinaire: 'interdisciplinaria', alliant: 'combinando' },
    preQ: [
      { q: '¿Cómo imaginas las ciudades del futuro?', opts: ['Con mucha tecnología verde', 'Similares a las actuales', 'Con menos gente, más rural'], a: -1 },
      { q: '¿Qué significa "énergie renouvelable" según el contexto?', opts: ['Energía nuclear', 'Energía solar, eólica, etc.', 'Petróleo renovado'], a: -1 },
    ],
    mcq: [
      { q: '¿Cuándo habrán desaparecido los coches de combustión según el texto?', opts: ["D'ici 2030", "D'ici 2040", "D'ici 2050", "D'ici 2100"], a: 2, fb: '"les voitures à combustion auraient disparu d\'ici 2050" — conditionnel pour hypothèse future.' },
      { q: '¿Qué construcción usa "Pour que cette vision devienne réalité"?', opts: ['Infinitif', 'Subjonctif après "pour que"', 'Conditionnel', 'Indicatif futur'], a: 1, fb: '"Pour que" → subjonctif. "Devienne" = subjonctif de "devenir". Conjonction de but → subjonctif obligatoire.' },
      { q: '¿Cuánto podrían reducir sus emisiones las ciudades más inteligentes?', opts: ['30%', '50%', '60%', '70%'], a: 3, fb: '"pourraient réduire leurs émissions de carbone de 70%" — conditionnel pour une possibilité hypothétique.' },
      { q: '¿Qué pronom relatif aparece en "Les villes dont les infrastructures seraient les plus intelligentes"?', opts: ['qui', 'que', 'dont', 'où'], a: 2, fb: '"Dont" → complément de DE. "Les infrastructures DES villes" → "dont les infrastructures". Dont remplace un complément avec DE.' },
      { q: '¿En qué modo está "seraient" en "Les villes dont les infrastructures seraient les plus intelligentes"?', opts: ['Imparfait', 'Subjonctif', 'Conditionnel présent', 'Futur simple'], a: 2, fb: '"Seraient" = conditionnel de être. Exprime une hypothèse sur ce que seraient ces villes dans le futur.' },
      { q: '¿Cuántos modos diferentes de hablar sobre el futuro usa el texto?', opts: ['Solo el futur simple', 'Conditionnel et subjonctif', 'Futur simple et imparfait', 'Solo el conditionnel'], a: 1, fb: 'Le texte utilise le conditionnel (fonctionneraient, auraient, pourraient, produiraient) et le subjonctif (devienne, existent au présent) — deux façons B1 de parler de l\'avenir hypothétique.' },
    ],
    openQ: 'Imagina la ciudad del futuro. Describe 3 características usando el condicionnel.',
    prodPrompt: 'Escribe 5 frases sobre cómo sería la ciudad ideal del futuro. Usa: conditionnel (il y aurait..., on pourrait...), "Pour que... il faudrait que...", "Les bâtiments qui..."',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t),
    clean: t.replace(/[^a-zA-ZÀ-ÿ_']/g, '').toLowerCase(),
  }));
}

type Phase = 'pre' | 'read' | 'questions' | 'done';

function TextExercise({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<Phase>('pre');
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

  const STEPS = ['Antes de leer', 'Leer', 'Preguntas', 'Resultado'];

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>📖 Lecture B1</button>
        <span>/</span>
        <span style={{ color: COLOR, fontWeight: 800 }}>Texte {t.id}</span>
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
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Thème · {t.topic} · {t.grammar}</div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 700, fontSize: '1.4rem', color: 'var(--ink)' }}>{t.title}</h2>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Antes de leer — reflexiona</div>
            {t.preQ.map((q, i) => (
              <div key={i} style={{ marginBottom: '0.75rem' }}>
                <p style={{ margin: '0 0 0.3rem', fontSize: '0.9rem', fontWeight: 600, color: 'var(--ink)' }}>{i + 1}. {q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => (
                    <button key={oi} style={{ fontSize: '0.8rem', padding: '0.35rem 0.8rem', borderRadius: 8, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--muted)', cursor: 'default', fontFamily: 'inherit' }}>{opt}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background: COLOR, borderColor: COLOR }}>Leer el texto →</button>
        </div>
      )}

      {phase === 'read' && (
        <div>
          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Toca una palabra para ver su traducción</div>
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
                        {t.vocab[tok.clean] ?? '(mot grammatical)'}
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => setPhase('questions')} style={{ background: COLOR, borderColor: COLOR }}>Responder preguntas →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Antes de leer</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => setPhase('read')} style={{ marginBottom: '1rem' }}>← Volver al texto</button>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {t.mcq.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={qi} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: '1.5px solid var(--line-soft)', background: 'var(--bg)' }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Question {qi + 1}</div>
                  <p style={{ margin: '0 0 0.75rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{q.q}</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect = oi === q.a, isSel = ans === oi;
                      let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = `rgba(5,150,105,0.1)`; border = `1.5px solid #059669`; color = '#059669'; }
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
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Question ouverte</div>
              <p style={{ margin: '0 0 0.6rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{t.openQ}</p>
              <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={2} placeholder="Écris ta réponse..."
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
            </div>

            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: `1.5px solid ${COLOR}22`, background: `${COLOR}04` }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>Mini-production</div>
              <p style={{ margin: '0 0 0.6rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem' }}>{t.prodPrompt}</p>
              <textarea value={prod} onChange={e => setProd(e.target.value)} rows={3} placeholder="Écris en français..."
                style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: 9, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', boxSizing: 'border-box', resize: 'none' }} />
            </div>

            {allMcqDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background: COLOR, borderColor: COLOR }}>Ver resultado →</button>}
          </div>
        </div>
      )}

      {phase === 'done' && (
        <div style={{ padding: '1.75rem', borderRadius: 18, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🎉' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.5rem' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem' }}>{score === t.mcq.length ? '¡Parfait! Comprensión perfecta.' : score >= 4 ? 'Très bien — casi perfecto.' : 'Relee el texto y vuelve a intentarlo.'}</p>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('pre'); setAnswers({}); setRevealed({}); setOpenAns(''); setProd(''); }} style={{ background: COLOR, borderColor: COLOR }}>Intentar de nuevo</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Otros textos</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaFrancesB1() {
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
          <Link href="/practica/frances/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇫🇷 Français B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lecture</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lecture · Français B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Compréhension écrite B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>5 textes B1 (120-150 mots) avec vocabulaire interactif et 6 questions de compréhension par texte.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map(t => (
            <button key={t.id} onClick={() => setTextId(t.id)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.1rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.1rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{t.topic} · {t.grammar} · {t.mcq.length} preguntas</p>
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
