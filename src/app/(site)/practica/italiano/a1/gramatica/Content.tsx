'use client';

import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';

const guide: QuestGuide = {
  title: 'Grammatica Italiana A1 — Guía de referencia',
  body: 'Los 5 pilares del italiano A1: artículos (il/la/lo/l\'/i/le/gli + un/una/uno/un\'), essere (ser/estar), avere (tener), verbos en presente (-ARE/-ERE/-IRE) y la existencia (c\'è / ci sono).\nEl italiano tiene 2 géneros (masculino y femenino). Los pronombres sujeto son OPCIONALES porque la desinencia verbal los indica.',
  tip: 'Truco "lo" vs "il": usa "lo" ante z-, s+consonante, gn-, ps-, x-, y- (lo zaino, lo studente, lo gnomo). Para todo lo demás: il. En plural: gli ante vocal o z/s+cons; i ante el resto.',
  tableHead: ['Tema', 'Formas', 'Ejemplo'],
  tableRows: [
    ['Articoli def.', "il (m.) · la (f.) · lo (z/s+c) · l' (vocal) · i/le/gli (pl.)", "il libro · la casa · lo zaino · l'amico"],
    ['Essere', 'sono · sei · è · siamo · siete · sono', 'Io sono studente · Lei è di Roma'],
    ['Avere', 'ho · hai · ha · abbiamo · avete · hanno', 'Ho fame · Luca ha 20 anni'],
    ['Verbi pres.', '-are: -o/-i/-a/-iamo/-ate/-ano', 'parlo · vedo · dormo · capisco'],
    ["C'è / Ci sono", "c'è (sing.) · ci sono (pl.) + preposizioni", "C'è un gatto · Ci sono libri sul tavolo"],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    icon: '📌',
    title: "Articoli — il, la, lo, l', un, una…",
    desc: "Articolo determinativo: il (masc.), la (fem.), lo (z, s+cons., gn-), l' (davanti vocale). Plurale: i, le, gli. Indeterminativo: un, una, uno, un'.",
    items: [
      { text: '___ libro è interessante.', opts: ['Il', 'Lo', 'La', 'Un'], ans: 'Il', hint: '"Il libro" — libro è maschile, inizia con consonante normale: il.' },
      { text: '___ amica di Maria è simpatica.', opts: ['Il', 'Lo', "L'", 'La'], ans: "L'", hint: '"L\'amica" — parola femminile che inizia con vocale: l\'.' },
      { text: 'Ho ___ zaino nuovo.', opts: ['un', 'uno', "un'", 'una'], ans: 'uno', hint: '"Uno zaino" — zaino inizia con z: si usa uno (indeterminativo maschile).' },
      { text: '___ studente studia molto.', opts: ['Il', 'Lo', 'La', 'Un'], ans: 'Lo', hint: '"Lo studente" — studente inizia con s+t (gruppo consonantico): si usa lo.' },
      { text: 'Leggo ___ libro ogni giorno.', opts: ['il', 'lo', 'un', 'uno'], ans: 'un', hint: '"un libro" — prima menzione, maschile con consonante normale: un.' },
      { text: '___ case di Roma sono bellissime.', opts: ['Il', 'Le', 'I', 'Gli'], ans: 'Le', hint: '"Le case" — case è femminile plurale: si usa le.' },
      { text: '___ amici vengono stasera.', opts: ['I', 'Gli', 'Le', 'Il'], ans: 'Gli', hint: '"Gli amici" — amici inizia con vocale, plurale maschile: gli.' },
      { text: 'Ho ___ sorella maggiore.', opts: ['un', 'uno', "un'", 'una'], ans: 'una', hint: '"una sorella" — sorella è femminile con consonante: una.' },
      { text: '___ occhi di Giulia sono verdi.', opts: ['I', 'Gli', 'Le', "L'"], ans: 'Gli', hint: '"Gli occhi" — occhi inizia con o (vocale), plurale maschile: gli.' },
      { text: 'Compro ___ arancia al mercato.', opts: ['un', 'uno', "un'", 'una'], ans: "un'", hint: '"un\'arancia" — arancia è femminile con vocale: un\' (con apostrofo).' },
    ],
  },
  {
    type: 'choice',
    icon: '🔵',
    title: 'Essere e Avere — presente',
    desc: 'ESSERE: sono / sei / è / siamo / siete / sono. AVERE: ho / hai / ha / abbiamo / avete / hanno. La h en avere es SIEMPRE muda.',
    items: [
      { text: 'Io ___ italiano.', opts: ['sono', 'sei', 'è', 'ho'], ans: 'sono', hint: '"Io sono" — 1ª persona singular di essere: sono.' },
      { text: 'Luca ___ venti anni.', opts: ['è', 'ha', 'sono', 'hai'], ans: 'ha', hint: '"Luca ha" — per l\'età si usa AVERE: ha venti anni.' },
      { text: 'Voi ___ di Milano?', opts: ['siete', 'avete', 'sono', 'siamo'], ans: 'siete', hint: '"Voi siete" — 2ª persona plurale di essere.' },
      { text: 'Noi ___ due gatti.', opts: ['siamo', 'abbiamo', 'hanno', 'avete'], ans: 'abbiamo', hint: '"Noi abbiamo" — 1ª persona plurale di avere.' },
      { text: 'Tu ___ stanco?', opts: ['sei', 'hai', 'è', 'siete'], ans: 'sei', hint: '"Tu sei" — 2ª persona singular di essere.' },
      { text: 'Maria ___ una borsa rossa.', opts: ['è', 'ha', 'sono', 'hai'], ans: 'ha', hint: '"Maria ha" — 3ª persona singular di avere: ha.' },
      { text: 'Loro ___ studenti universitari.', opts: ['sono', 'hanno', 'è', 'siete'], ans: 'sono', hint: '"Loro sono" — 3ª persona plurale di essere (igual a la 1ª!).' },
      { text: 'Io non ___ fame adesso.', opts: ['sono', 'ho', 'sei', 'ha'], ans: 'ho', hint: '"non ho fame" — avere fame = tener hambre. Sensaciones físicas: avere.' },
      { text: 'Dove ___ la fermata del bus?', opts: ['è', 'ha', 'sono', 'sei'], ans: 'è', hint: '"Dov\'è" = dónde está. Essere para posición/existencia.' },
      { text: 'Gli studenti ___ molto entusiasmo.', opts: ['sono', 'hanno', 'è', 'siamo'], ans: 'hanno', hint: '"hanno entusiasmo" — avere per "tener algo": gli studenti hanno.' },
    ],
  },
  {
    type: 'choice',
    icon: '⏰',
    title: 'Verbi -ARE/-ERE/-IRE al presente',
    desc: 'PARLARE: parlo/parli/parla/parliamo/parlate/parlano. VEDERE: vedo/vedi/vede/vediamo/vedete/vedono. DORMIRE: dormo/dormi/dorme/dormiamo/dormite/dormono.',
    items: [
      { text: 'Io ___ (parlare) italiano ogni giorno.', opts: ['parlo', 'parli', 'parla', 'parlano'], ans: 'parlo', hint: '"parlo" — io + -are: radice + -o. parl + o = parlo.' },
      { text: 'Marco ___ (vedere) un film stasera.', opts: ['vedo', 'vedi', 'vede', 'vedono'], ans: 'vede', hint: '"vede" — lui/lei + -ere: radice + -e. ved + e = vede.' },
      { text: 'Voi ___ (dormire) tardi il sabato?', opts: ['dormite', 'dormono', 'dormiamo', 'dormi'], ans: 'dormite', hint: '"dormite" — voi + -ire: radice + -ite. dorm + ite = dormite.' },
      { text: 'Noi ___ (lavorare) in un ufficio.', opts: ['lavorano', 'lavoriamo', 'lavorate', 'lavori'], ans: 'lavoriamo', hint: '"lavoriamo" — noi + -are: radice + -iamo. lavor + iamo = lavoriamo.' },
      { text: 'Loro ___ (mangiare) la pizza.', opts: ['mangia', 'mangiamo', 'mangiate', 'mangiano'], ans: 'mangiano', hint: '"mangiano" — loro + -are: radice + -ano. mangi + ano = mangiano.' },
      { text: 'Tu ___ (leggere) molti libri?', opts: ['leggo', 'leggi', 'legge', 'leggono'], ans: 'leggi', hint: '"leggi" — tu + -ere: radice + -i. legg + i = leggi.' },
      { text: 'Lei ___ (abitare) a Roma.', opts: ['abito', 'abiti', 'abita', 'abitano'], ans: 'abita', hint: '"abita" — lei/lui + -are: radice + -a. abit + a = abita.' },
      { text: 'Io ___ (capire) bene lo spagnolo.', opts: ['capisci', 'capisce', 'capisco', 'capiscono'], ans: 'capisco', hint: '"capisco" — io + verbo -isc: cap + isco = capisco. Verbi con infisso -isc-.' },
    ],
  },
  {
    type: 'choice',
    icon: '👤',
    title: 'Pronomi soggetto',
    desc: 'Pronomi: io, tu, lui/lei, noi, voi, loro. En italiano los pronombres son OPCIONALES porque la desinencia verbal los indica.',
    items: [
      { text: 'Maria è italiana. ___ è di Roma.', opts: ['Lui', 'Lei', 'Loro', 'Essa'], ans: 'Lei', hint: '"Lei" — Maria è donna → pronome femminile singolare lei.' },
      { text: 'Marco e Luca studiano. ___ studiano medicina.', opts: ['Noi', 'Voi', 'Loro', 'Lui'], ans: 'Loro', hint: '"Loro" — Marco e Luca, terza persona plurale → loro.' },
      { text: 'Io e te siamo amici. ___ siamo colleghi da anni.', opts: ['Voi', 'Loro', 'Noi', 'Lui'], ans: 'Noi', hint: '"Noi" — io + te = noi (prima persona plurale).' },
      { text: 'Il gatto dorme. ___ dorme sul divano.', opts: ['Lei', 'Lui', 'Esso', 'Loro'], ans: 'Lui', hint: '"Lui" — in italiano colloquiale lui/lei anche per animali.' },
      { text: "___ (voi) dove andate in vacanza?", opts: ['Tu', 'Loro', 'Voi', 'Noi'], ans: 'Voi', hint: '"Voi" — 2ª persona plurale, equivale a "ustedes".' },
      { text: 'La macchina è rossa. ___ è molto veloce.', opts: ['Lui', 'Lei', 'Esso', 'Loro'], ans: 'Lei', hint: '"Lei" — macchina è femminile → lei (colloquiale).' },
      { text: 'Io e mia sorella cuciniamo insieme. ___ cuciniamo la domenica.', opts: ['Voi', 'Loro', 'Noi', 'Tu'], ans: 'Noi', hint: '"Noi" — io + mia sorella = noi. Prima persona plurale.' },
      { text: 'Il professore spiega bene. ___ spiega in modo chiaro.', opts: ['Lei', 'Lui', 'Voi', 'Loro'], ans: 'Lui', hint: '"Lui" — professore è maschile → lui.' },
    ],
  },
  {
    type: 'choice',
    icon: '📍',
    title: "C'è / Ci sono + preposizioni di luogo",
    desc: "C'È = hay (singular). CI SONO = hay (plural). Preposizioni: in, su, sotto, vicino a, davanti a, dietro a, accanto a.",
    items: [
      { text: "___ un gatto sul tetto.", opts: ["C'è", 'Ci sono', 'È', 'Sono'], ans: "C'è", hint: '"C\'è un gatto" — singular → c\'è.' },
      { text: '___ molte persone in piazza.', opts: ["C'è", 'Ci sono', 'È', 'Ha'], ans: 'Ci sono', hint: '"Ci sono molte persone" — plurale → ci sono.' },
      { text: 'Il libro è ___ tavolo.', opts: ['in', 'su', 'a', 'sotto'], ans: 'su', hint: '"sul tavolo" — su = sopra una superficie. Sul = su + il.' },
      { text: "La fermata è ___ all'angolo.", opts: ['dietro', 'sotto', 'vicino', 'dentro'], ans: 'vicino', hint: '"vicino all\'angolo" — vicino a = cerca de.' },
      { text: "___ due ristoranti ___ scuola.", opts: ["C'è / vicino alla", 'Ci sono / vicino alla', "C'è / sotto la", 'Ci sono / dentro la'], ans: 'Ci sono / vicino alla', hint: '"Ci sono due ristoranti vicino alla scuola" — plurale → ci sono.' },
      { text: 'Il cane dorme ___ il letto.', opts: ['su', 'in', 'sotto', 'davanti a'], ans: 'sotto', hint: '"sotto il letto" — sotto = debajo de.' },
      { text: 'La farmacia è ___ la banca.', opts: ['sotto', 'davanti a', 'accanto a', 'dentro'], ans: 'accanto a', hint: '"accanto alla banca" — accanto a = al lado de.' },
      { text: "___ una piscina ___ palestra.", opts: ["C'è / in", "Ci sono / nella", "C'è / dentro la", "C'è / nella"], ans: "C'è / nella", hint: '"C\'è una piscina nella palestra" — singolare → c\'è; nella = in + la.' },
    ],
  },
  {
    type: 'sprint',
    icon: '⚡',
    title: 'Sprint — tutti i temi!',
    desc: 'Mix dei 5 temi A1. Scrivi veloce!',
    inputWidth: 80,
    items: [
      { text: '___ libro è interessante. (art. masc.)', ans: 'Il', hint: 'masculino, consonante normal → il' },
      { text: "___ amica di Maria è simpatica. (davanti vocale f.)", ans: "L'", hint: 'femenino + vocal → l\'' },
      { text: 'Io ___ italiano. (essere)', ans: 'sono', hint: 'essere: io → sono' },
      { text: 'Luca ___ venti anni. (avere)', ans: 'ha', hint: 'avere: lui → ha' },
      { text: 'Io ___ (parlare) italiano ogni giorno.', ans: 'parlo', hint: '-are: io → parlo' },
      { text: 'Marco ___ (vedere) un film stasera.', ans: 'vede', hint: '-ere: lui → vede' },
      { text: 'Maria è italiana. ___ è di Roma.', ans: 'Lei', hint: 'femenino → lei' },
      { text: 'Marco e Luca studiano. ___ studiano medicina.', ans: 'Loro', hint: 'terza plurale → loro' },
      { text: "___ un gatto sul tetto. (hay sing.)", ans: "C'è", hint: "singular → c'è" },
      { text: '___ molte persone in piazza. (hay pl.)', ans: 'Ci sono', hint: 'plural → ci sono' },
    ],
  },
];

export default function GramaticaItalianoA1() {
  return (
    <QuestEngine
      color="#009246"
      flag="🇮🇹"
      storageKey="quest-it-a1-grammatik"
      guide={guide}
      levels={levels}
      backHref="/practica/italiano/a1"
      backLabel="Italiano A1"
      title="Grammatica A1"
      subtitle="Italiano A1 — Grammatica"
    />
  );
}
