'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Grammaire Française A1 — Guía de referencia',
  body: 'Los 5 pilares del francés A1: artículos (le/la/l\'/les/un/une/des), être (ser/estar), avoir (tener), negación (ne...pas) y preguntas (où/comment/quand/combien/qui).\nDiferencias clave con el español: los sustantivos tienen género gramatical (masculin/féminin), no hay neutro. Ante vocal el artículo se elide: le+hôtel → l\'hôtel. La edad usa avoir: "J\'ai 20 ans" (tengo 20 años).',
  tip: 'Truco artículos: ¿empieza con vocal o h muda? → l\'. ¿Primera mención de algo? → un/une/des (indefinidos). ¿Ya sabemos de qué se habla? → le/la/les (definidos). La négation en français écrit: SIEMPRE ne...pas, aunque en oral informal se omita el ne.',
  tableHead: ['Tema', 'Formas', 'Ejemplo'],
  tableRows: [
    ['Articles définis', "le (m.) · la (f.) · l' (vocal) · les (pl.)", "le chat · la ville · l'école · les amis"],
    ['Articles indéfinis', 'un (m.) · une (f.) · des (pl.)', 'un frère · une sœur · des amis'],
    ['Être (ser/estar)', 'suis · es · est · sommes · êtes · sont', 'Je suis étudiant · Vous êtes à Paris'],
    ['Avoir (tener)', "ai · as · a · avons · avez · ont", "J'ai faim · Il a une voiture"],
    ['Négation', 'ne + verbe + pas / n\' + verbe + pas', 'Je ne parle pas · Il n\'aime pas'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '📗',
    title: "Articles — le, la, l', les, un, une, des",
    desc: "Masculin → le/un. Féminin → la/une. Devant voyelle (a,e,i,o,u) ou h muette → l'. Pluriel défini → les. Pluriel indéfini → des. Usar definido (le/la) cuando el objeto ya es conocido; indefinido (un/une/des) para primera mención.",
    items: [
      { text: "J'ai ___ frère.", opts: ['un', 'une', 'le', "l'"], ans: 'un', hint: '"Frère" es masculino, primera mención → un frère.' },
      { text: 'Elle a ___ sœur.', opts: ['un', 'une', 'le', 'la'], ans: 'une', hint: '"Sœur" es femenino, primera mención → une sœur.' },
      { text: '___ chat est mignon.', opts: ['Le', 'La', "L'", 'Les'], ans: 'Le', hint: '"Chat" = masculino, definido → le chat.' },
      { text: "___ école est grande.", opts: ['Le', 'La', "L'", 'Les'], ans: "L'", hint: '"École" empieza con vocal → l\'école (elision).' },
      { text: "J'ai ___ amis.", opts: ['des', 'les', 'un', 'de'], ans: 'des', hint: 'Plural indefinido (primera mención) → des amis.' },
      { text: '___ livres sont sur la table.', opts: ['Le', 'La', 'Les', "L'"], ans: 'Les', hint: 'Plural definido → les livres.' },
      { text: 'Il lit ___ journal.', opts: ['un', 'une', 'le', "l'"], ans: 'un', hint: '"Journal" es masculino, primera mención → un journal.' },
      { text: "C'est ___ belle ville.", opts: ['un', 'une', 'le', 'la'], ans: 'une', hint: '"Ville" es femenino → une ville.' },
      { text: "___ hôtel est moderne.", opts: ['Le', 'La', "L'", 'Les'], ans: "L'", hint: '"Hôtel" empieza con h muda (= vocal) → l\'hôtel.' },
      { text: "J'ai ___ stylos dans mon sac.", opts: ['des', 'les', 'un', 'de'], ans: 'des', hint: 'Plural indefinido → des stylos.' },
    ],
  },
  {
    type: 'choice',
    icon: '⚡',
    title: 'Être au présent — suis, es, est, sommes, êtes, sont',
    desc: "Être (ser/estar) es completamente irregular — hay que memorizar: je suis · tu es · il/elle est · nous sommes · vous êtes · ils/elles sont. Être se usa para identidad, profesión, origen y estado. La negación: 'Je ne suis pas...'",
    items: [
      { text: 'Je ___ étudiant(e).', opts: ['suis', 'es', 'est', 'sommes'], ans: 'suis', hint: '"Je suis" — con je siempre suis.' },
      { text: 'Tu ___ français(e)?', opts: ['suis', 'es', 'est', 'êtes'], ans: 'es', hint: '"Tu es" — con tu siempre es.' },
      { text: 'Il ___ médecin.', opts: ['suis', 'es', 'est', 'sont'], ans: 'est', hint: '"Il est" — con il/elle → est.' },
      { text: 'Elle ___ très gentille.', opts: ['suis', 'es', 'est', 'sont'], ans: 'est', hint: '"Elle est" — con il/elle → est.' },
      { text: 'Nous ___ amis.', opts: ['sommes', 'êtes', 'sont', 'es'], ans: 'sommes', hint: '"Nous sommes" — con nous → sommes.' },
      { text: 'Vous ___ à Paris?', opts: ['sommes', 'êtes', 'sont', 'es'], ans: 'êtes', hint: '"Vous êtes" — con vous → êtes.' },
      { text: "Ils ___ à l'école.", opts: ['sommes', 'êtes', 'sont', 'es'], ans: 'sont', hint: '"Ils sont" — con ils/elles → sont.' },
      { text: 'Je ne ___ pas fatigué(e).', opts: ['suis', 'es', 'est', 'sommes'], ans: 'suis', hint: '"Je ne suis pas" — negación: ne + être + pas.' },
      { text: 'Elles ___ très belles.', opts: ['sommes', 'êtes', 'sont', 'es'], ans: 'sont', hint: '"Elles sont" — plural femenino → sont.' },
      { text: 'Tu ___ prêt(e)?', opts: ['suis', 'es', 'est', 'êtes'], ans: 'es', hint: '"Tu es" — con tu → es.' },
    ],
  },
  {
    type: 'choice',
    icon: '🔑',
    title: "Avoir au présent — ai, as, a, avons, avez, ont",
    desc: "Avoir (tener) también irregular: j'ai · tu as · il/elle a · nous avons · vous avez · ils/elles ont. La h en avoir es SIEMPRE muda. Avoir se usa para posesión, estados físicos (faim, soif, peur) y la EDAD: 'J'ai 20 ans' (no 'Je suis 20 ans').",
    items: [
      { text: "J'___ vingt ans.", opts: ['ai', 'as', 'a', 'avons'], ans: 'ai', hint: '"J\'ai" — con je → ai.' },
      { text: 'Tu ___ un chat?', opts: ['ai', 'as', 'a', 'avez'], ans: 'as', hint: '"Tu as" — con tu → as.' },
      { text: 'Il ___ une voiture.', opts: ['ai', 'as', 'a', 'ont'], ans: 'a', hint: '"Il a" — con il/elle → a.' },
      { text: 'Nous ___ faim.', opts: ['avons', 'avez', 'ont', 'as'], ans: 'avons', hint: '"Nous avons" — con nous → avons. "Avoir faim" = tener hambre.' },
      { text: 'Vous ___ des enfants?', opts: ['avons', 'avez', 'ont', 'as'], ans: 'avez', hint: '"Vous avez" — con vous → avez.' },
      { text: 'Elles ___ peur.', opts: ['avons', 'avez', 'ont', 'a'], ans: 'ont', hint: '"Elles ont" — con ils/elles → ont. "Avoir peur" = tener miedo.' },
      { text: "J'___ un frère et une sœur.", opts: ['ai', 'as', 'a', 'avons'], ans: 'ai', hint: '"J\'ai" — con je → ai.' },
      { text: 'Tu ___ soif?', opts: ['ai', 'as', 'a', 'avez'], ans: 'as', hint: '"Tu as soif" = ¿Tienes sed? — con tu → as.' },
      { text: "Il ___ besoin d'aide.", opts: ['ai', 'as', 'a', 'ont'], ans: 'a', hint: '"Il a besoin" = "él necesita (tiene necesidad)" — con il → a.' },
      { text: 'Ils ___ beaucoup de travail.', opts: ['avons', 'avez', 'ont', 'a'], ans: 'ont', hint: '"Ils ont" — con ils → ont.' },
    ],
  },
  {
    type: 'choice',
    icon: '🚫',
    title: 'La négation — ne...pas / n\'...pas',
    desc: "La negación en francés rodea al verbo: ne + verbo + pas. Ante vocal o h muda, ne se elide: n'. Ejemplo: 'Je ne parle pas.' / 'Il n'aime pas.' En francés oral informal se omite el ne, pero en escrito es obligatorio.",
    items: [
      { text: "Je ___ parle pas anglais.", opts: ['ne', "n'", 'pas', 'non'], ans: 'ne', hint: '"Je ne parle pas" — ne antes de consonante (p).' },
      { text: "Il ___ aime pas les légumes.", opts: ['ne', "n'", 'pas', 'non'], ans: "n'", hint: '"Il n\'aime pas" — n\' antes de vocal (aime).' },
      { text: "Tu ___ comprends pas?", opts: ['ne', "n'", 'pas', 'non'], ans: 'ne', hint: '"Tu ne comprends pas?" — ne antes de consonante (c).' },
      { text: "Je ___ suis pas fatigué.", opts: ['ne', "n'", 'pas', 'non'], ans: 'ne', hint: '"Je ne suis pas" — être en negativo, ne antes de s.' },
      { text: "Elle ___ est pas là.", opts: ['ne', "n'", 'pas', 'non'], ans: "n'", hint: '"Elle n\'est pas" — n\' antes de vocal (est).' },
      { text: "Je parle ___ anglais.", opts: ['ne', "n'", 'pas', 'non'], ans: 'pas', hint: 'La negación requiere ne...pas: "je ne parle PAS".' },
      { text: "Nous ___ avons pas de chat.", opts: ['ne', "n'", 'pas', 'non'], ans: "n'", hint: '"Nous n\'avons pas" — avons empieza con vocal → n\'.' },
      { text: "Vous ___ habitez pas ici?", opts: ['ne', "n'", 'pas', 'non'], ans: 'ne', hint: '"Vous ne habitez pas" — ne antes de consonante (h aspirada en "habitez").' },
    ],
  },
  {
    type: 'choice',
    icon: '❓',
    title: 'Poser des questions — où, comment, quand, combien, qui',
    desc: "Las palabras interrogativas: Où (dónde) · Comment (cómo) · Quand (cuándo) · Combien (cuánto) · Qui (quién) · Qu'est-ce que / Que (qué). La forma más fácil de preguntar: 'Est-ce que' + oración afirmativa. 'Qu'est-ce que' = qué (objeto directo).",
    items: [
      { text: "___ vous habitez? (¿Dónde vives?)", opts: ['Comment', 'Où', 'Quand', 'Combien'], ans: 'Où', hint: '"Où" = dónde. "Comment" = cómo. "Quand" = cuándo.' },
      { text: "___ vous appelez-vous? (¿Cómo se llama?)", opts: ['Comment', 'Où', 'Quand', 'Qui'], ans: 'Comment', hint: '"Comment" = cómo.' },
      { text: "___ est-ce que tu vas? (¿Cómo estás?)", opts: ['Comment', 'Où', 'Combien', 'Quand'], ans: 'Comment', hint: '"Comment est-ce que tu vas?" — forma con est-ce que.' },
      { text: "___ ça coûte? (¿Cuánto cuesta?)", opts: ['Comment', 'Où', 'Combien', 'Quand'], ans: 'Combien', hint: '"Combien" = cuánto/cuántos.' },
      { text: "___ est-ce que le cours commence? (¿Cuándo empieza?)", opts: ['Pourquoi', 'Où', 'Quand', 'Comment'], ans: 'Quand', hint: '"Quand" = cuándo.' },
      { text: "___ est-ce que tu aimes? (¿Qué te gusta?)", opts: ['Qui', "Qu'", 'Où', 'Comment'], ans: "Qu'", hint: '"Qu\'est-ce que tu aimes?" — qu\' = qué (ante vocal).' },
      { text: "___ parle français? (¿Quién habla francés?)", opts: ['Qui', 'Où', 'Quand', 'Comment'], ans: 'Qui', hint: '"Qui" = quién. Sujeto de la pregunta.' },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — tous les thèmes!',
    desc: 'Mix de los 5 temas A1. Écris vite!',
    inputWidth: 80,
    items: [
      { text: "J'ai ___ frère. (indef. masc.)", ans: 'un', hint: 'masculino indefinido → un' },
      { text: "___ école est grande. (devant voyelle)", ans: "L'", hint: 'vocal → l\'' },
      { text: 'Je ___ étudiant. (être)', ans: 'suis', hint: 'être: je → suis' },
      { text: 'Nous ___ amis. (être)', ans: 'sommes', hint: 'être: nous → sommes' },
      { text: "J'___ vingt ans. (avoir)", ans: 'ai', hint: 'avoir: je → ai' },
      { text: 'Il ___ une voiture. (avoir)', ans: 'a', hint: 'avoir: il → a' },
      { text: 'Je ___ parle pas anglais. (ne/n\')', ans: 'ne', hint: "ne avant consonante (p)" },
      { text: "Il ___ aime pas. (ne/n\')", ans: "n'", hint: "n' avant voyelle (a)" },
      { text: "___ vous habitez? (¿dónde?)", ans: 'Où', hint: 'dónde → Où' },
      { text: "___ ça coûte? (¿cuánto?)", ans: 'Combien', hint: 'cuánto → Combien' },
    ],
  },
];

export default function GramaticaFrancesA1() {
  return (
    <QuestEngine
      color="#003189"
      flag="🇫🇷"
      storageKey="quest-fr-a1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/frances/a1"
      backLabel="Français A1"
      title="Grammaire A1"
      subtitle="Français A1 — Grammaire"
    />
  );
}
