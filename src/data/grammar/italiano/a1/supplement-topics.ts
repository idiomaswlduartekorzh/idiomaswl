import { createItalianCurriculumTopic } from '../supplement-factory'

export const articoliPartitivi = createItalianCurriculumTopic({
  level: 'A1', slug: 'articoli-partitivi', category: 'Determinanti e quantità', title: 'Gli articoli partitivi: del, dello, della, dei, degli e delle', shortTitle: 'Articoli partitivi',
  description: 'Gli articoli partitivi indicano una quantità non precisata e combinano la preposizione di con l’articolo determinativo. La lezione distingue il singolare non numerabile dal plurale indefinito e chiarisce quando si può usare anche un nome senza articolo.',
  goal: 'Scegliere la forma partitiva in base a genere, numero e suono iniziale del nome.', formula: 'di + articolo determinativo → quantità non precisata',
  rows: [['Maschile singolare', 'del / dello / dell’', 'del pane · dello zucchero · dell’olio'], ['Femminile singolare', 'della / dell’', 'della pasta · dell’acqua'], ['Maschile plurale', 'dei / degli', 'dei biscotti · degli spinaci'], ['Femminile plurale', 'delle', 'delle mele'], ['Negazione', 'non + nome / del…', 'Non bevo caffè · Non compro del caffè'], ['Quantità precisa', 'numero o misura', 'due mele · un chilo di riso']],
  drills: [['Compro', 'del', 'pane fresco.'], ['Vorrei', 'dello', 'zucchero.'], ['Beviamo', 'dell’', 'acqua minerale.'], ['Prendo', 'della', 'frutta.'], ['Ci sono', 'dei', 'pomodori.'], ['Mangiano', 'degli', 'spinaci.'], ['Porto', 'delle', 'arance.'], ['Serve', 'dell’', 'olio.']],
})

export const dimostrativiPresentativi = createItalianCurriculumTopic({
  level: 'A1', slug: 'dimostrativi-presentativi', category: 'Riferimento e presentazione', title: 'Questo, quello ed ecco: indicare e presentare persone e cose', shortTitle: 'Dimostrativi ed ecco',
  description: 'Questo e quello localizzano un referente rispetto a chi parla e concordano con il nome. Ecco presenta qualcosa o qualcuno direttamente. La lezione collega distanza, forma dell’articolo e accordo, evitando di usare una sola forma davanti a ogni nome.',
  goal: 'Indicare un referente vicino o lontano e presentarlo con una forma naturale.', formula: 'questo/quello + nome concordato · ecco + referente',
  rows: [['Vicino maschile', 'questo / quest’', 'questo libro · quest’amico'], ['Vicino femminile', 'questa / quest’', 'questa casa · quest’idea'], ['Lontano maschile', 'quel / quello / quell’', 'quel libro · quello zaino · quell’uomo'], ['Lontano femminile', 'quella / quell’', 'quella strada · quell’auto'], ['Plurale', 'questi/e · quei/quegli/quelle', 'questi libri · quegli studenti'], ['Presentazione', 'ecco', 'Ecco Maria. · Ecco le chiavi.']],
  drills: [['Mi piace', 'questo', 'libro qui.'], ['Conosci', 'quest’', 'insegnante?'], ['Guarda', 'quello', 'zaino là.'], ['Preferisco', 'quell’', 'albergo.'], ['Prendiamo', 'quei', 'treni.'], ['Salutiamo', 'quegli', 'studenti.'], ['Scelgo', 'quelle', 'scarpe.'], ['Ecco', 'le', 'chiavi.']],
})

export default [articoliPartitivi, dimostrativiPresentativi]
