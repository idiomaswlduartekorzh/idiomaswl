import type { Metadata } from 'next';
import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';
import { QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Particelle Pronominali B1 — ci, ne, gli, le, vi | Idiomas WeLearn',
  description: 'Practica las partículas pronominales del italiano (ci, ne, gli, le, vi) con 6 niveles progresivos: selección, escritura libre y sprint final.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b1/particelle' },
};

const guide: QuestGuide = {
  title: 'Partículas pronominales: ci, ne, gli, le, vi',
  body: 'Las partículas pronominales sustituyen un nombre o complemento ya mencionado para evitar repeticiones. Casi siempre van ANTES del verbo (proclíticas): "Ne voglio ancora". Con infinitivo, van DESPUÉS: "Vuoi parlarne?".\n\nEn combinación, el orden es: mi/ti/ci/vi/gli + lo/la/li/le/ne. Cuando "ci" o "vi" preceden a "lo/la/li/le/ne", cambian a "ce" o "ve": "Ce lo dico" (te lo digo).',
  tip: 'CI = luogo (vado lì → ci vado) o riflessivo/noi. NE = partitivo/quantità (ne voglio tre) o "di esso/di ciò". GLI = a lui / a loro (informal). LE = a lei.',
  tableHead: ['Particella', 'Funzione principale', 'Esempio'],
  tableRows: [
    ['ci', 'luogo (lì/qui) / noi', '"Ci vado ogni anno" (vado lì)'],
    ['ne', 'partitivo / quantità / di ciò', '"Ne voglio tre" (di queste)'],
    ['gli', 'c.ind. a lui / a loro', '"Gli ho detto tutto" (a lui)'],
    ['le', 'c.ind. a lei', '"Le ho scritto ieri" (a lei)'],
    ['vi', 'luogo / a voi (formale)', '"Vi aspetto qui" (a voi)'],
  ],
};

const levels: QuestLevel[] = [
  {
    type: 'choice',
    title: 'Riconosci la particella',
    desc: 'Scegli la particella giusta per ogni frase.',
    items: [
      { text: 'Sei mai stato a Firenze? Sì, ___ sono stato due volte.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'ci', hint: 'ci = luogo (a Firenze → ci)' },
      { text: 'Vuoi del pane? Sì, ___ prendo un pezzo, grazie.', opts: ['ci', 'ne', 'vi', 'gli'], ans: 'ne', hint: 'ne = quantità/partitivo (del pane → ne)' },
      { text: 'Hai parlato a Lorenzo? Sì, ___ ho detto tutto ieri.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'gli', hint: 'gli = complemento indiretto a lui' },
      { text: 'Hai scritto a Sofia? Sì, ___ ho mandato un messaggio.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'le', hint: 'le = complemento indiretto a lei' },
      { text: 'Andate spesso in palestra? Sì, ___ andiamo tre volte a settimana.', opts: ['ci', 'ne', 'vi', 'gli'], ans: 'ci', hint: 'ci = luogo (in palestra → ci)' },
      { text: 'Quante sorelle hai? ___ ho due.', opts: ['Ne', 'Ci', 'Vi', 'Gli'], ans: 'Ne', hint: 'ne = partitivo riferito alla quantità (di sorelle)' },
      { text: 'Sei mai stato a Napoli? No, non ___ sono mai stato.', opts: ['ci', 'ne', 'vi', 'gli'], ans: 'ci', hint: 'ci = luogo (a Napoli → ci)' },
      { text: 'Hai detto a Marco del progetto? Sì, ___ ho spiegato tutto.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'gli', hint: 'gli = a lui (a Marco)' },
    ],
  },
  {
    type: 'choice',
    title: 'Contesto con persone',
    desc: 'Un po\' più difficile: distingui tra ci (luogo), ne (quantità) e i pronomi indiretti.',
    items: [
      { text: 'Quando vai al mare? ___ vado ogni estate.', opts: ['Ci', 'Ne', 'Vi', 'Gli'], ans: 'Ci', hint: 'ci = luogo (al mare → ci)' },
      { text: 'Hai molte cose da fare oggi? No, non ___ ho molte.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'ne', hint: 'ne = di esse (di cose da fare)' },
      { text: 'Hai già scritto alla professoressa? No, ___ scrivo domani.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'le', hint: 'le = a lei (alla professoressa)' },
      { text: 'Hai già parlato al tuo medico? Sì, ___ ho telefonato ieri.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'gli', hint: 'gli = a lui (al medico)' },
      { text: 'Quanto tempo passi in ufficio? ___ passo circa otto ore al giorno.', opts: ['Ci', 'Ne', 'Vi', 'Gli'], ans: 'Ci', hint: 'ci = luogo (in ufficio → ci)' },
      { text: 'Vuoi ancora del caffè? No grazie, non ___ bevo più.', opts: ['ci', 'ne', 'vi', 'gli'], ans: 'ne', hint: 'ne = partitivo (del caffè → ne)' },
      { text: 'Pensi spesso ai tuoi amici di scuola? Sì, ___ penso spesso.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'ci', hint: 'pensarci = pensare a ciò/essi; ci segue il verbo pensare + a' },
      { text: 'Hai parlato con i tuoi colleghi del problema? Sì, ___ ho detto tutto.', opts: ['ci', 'ne', 'gli', 'le'], ans: 'gli', hint: 'gli = a loro (ai colleghi, forma informale plurale)' },
    ],
  },
  {
    type: 'freeText',
    title: 'Scrivi la particella',
    desc: 'Completa le frasi scrivendo la particella corretta senza aiuto.',
    items: [
      { text: 'Sei già stato in Portogallo? No, non ___ sono mai stato.', ans: 'ci', hint: 'luogo (in Portogallo → ci)' },
      { text: 'Quante persone vengono alla festa? Non lo so, ___ vengono tante.', ans: 'ne', hint: 'ne = partitivo (di persone)' },
      { text: 'Hai detto a tua madre che arrivi tardi? Sì, ___ ho già detto.', ans: 'le', hint: 'le = a lei (a tua madre)' },
      { text: 'Hai parlato al direttore? No, non ___ ho ancora parlato.', ans: 'gli', hint: 'gli = a lui (al direttore)' },
      { text: 'Questo caffè è ottimo! ___ bevo tre al giorno.', ans: 'Ne', hint: 'ne = di questo (del caffè)' },
      { text: 'Conosci bene quella zona? Sì, ___ vado spesso.', ans: 'ci', hint: 'ci = luogo (in quella zona → ci)' },
      { text: 'Hai scritto alla professoressa Rossi? Sì, ___ ho mandato il compito.', ans: 'le', hint: 'le = a lei (alla professoressa)' },
      { text: 'Quante lingue parli? ___ parlo tre: italiano, inglese e spagnolo.', ans: ['Ne', 'ne'], hint: 'ne = partitivo (di lingue → ne)' },
    ],
  },
  {
    type: 'freeText',
    title: 'Frasi più complesse',
    desc: 'Ora senza piste: frasi con contesto più ricco.',
    items: [
      { text: 'Marco non sa ancora della riunione. ___ parlerò oggi pomeriggio.', ans: 'Gli', hint: 'gli = a lui (a Marco)' },
      { text: 'Sei sicuro di voler andare a Venezia? Sì, ___ vado assolutamente.', ans: 'ci', hint: 'ci = luogo (a Venezia)' },
      { text: 'Non hai ancora letto quel romanzo? No, non ___ ho ancora letto neanche una pagina.', ans: 'ne', hint: 'ne = di esso (del romanzo)' },
      { text: 'Hai già parlato alla dottoressa? No, ___ telefonerò domani mattina.', ans: 'le', hint: 'le = a lei (alla dottoressa)' },
      { text: 'Siamo passati davanti al museo ma non ___ siamo entrati.', ans: 'ci', hint: 'ci = luogo (nel museo → ci)' },
      { text: 'Quante volte sei stato in Francia? ___ sono stato tre volte.', ans: ['Ci', 'ci'], hint: 'ci = luogo (in Francia); come risposta autonoma: "Ci sono stato tre volte"' },
      { text: 'Hai già salutato i tuoi colleghi? Sì, ___ ho mandato un messaggio a tutti.', ans: 'gli', hint: 'gli = a loro (ai colleghi, plurale informale)' },
      { text: 'Non riesco a credere a quello che è successo. Non ___ voglio nemmeno pensare.', ans: 'ci', hint: 'pensarci = pensare a ciò; "non ci voglio pensare"' },
    ],
  },
  {
    type: 'freeText',
    title: 'Uso avanzato',
    desc: 'Frasi con sfumature: verbi riflessivi, locuzioni e contesti formali.',
    items: [
      { text: 'Hai incontrato il nuovo responsabile? No, ma ___ parlerò alla prossima riunione.', ans: 'gli', hint: 'gli = a lui (al responsabile)' },
      { text: 'Sono molto stanca oggi. ___ sono rimasta a casa tutto il giorno.', ans: 'Ci', hint: 'ci = luogo (a casa → ci sono rimasta)' },
      { text: 'Hai bevuto molta acqua oggi? No, non ___ ho bevuta molta.', ans: 'ne', hint: 'ne = partitivo (dell\'acqua → ne)' },
      { text: 'Hai già scritto alla signora Bianchi? No, ___ scriverò appena finisco.', ans: 'le', hint: 'le = a lei (alla signora Bianchi)' },
      { text: 'Quanto tempo hai passato a Roma? ___ ho passato quasi un mese.', ans: ['Ci', 'ci'], hint: 'ci = luogo (a Roma → ci)' },
      { text: 'Non hai ancora risposto all\'avvocato? No, ___ rispondo oggi stesso.', ans: 'gli', hint: 'gli = a lui (all\'avvocato)' },
      { text: 'Quante volte hai provato questa ricetta? ___ ho provata solo una volta.', ans: ['Ne', 'ne'], hint: 'ne = di volte (quante volte → ne)' },
      { text: 'Sei sicura che vuoi prendere quel corso? Sì, ___ penso seriamente.', ans: 'ci', hint: 'pensarci = stare pensando a ciò; "ci penso seriamente"' },
    ],
  },
  {
    type: 'sprint',
    title: 'Sprint — velocità!',
    desc: 'Tutte le particelle senza aiuto. Scrivi e invia.',
    inputWidth: 60,
    items: [
      { text: '___ vado spesso: la palestra è dietro casa.', ans: 'Ci', hint: 'luogo' },
      { text: 'Quante tazze di caffè bevi al giorno? ___ bevo tre.', ans: 'Ne', hint: 'partitivo' },
      { text: 'Hai detto a Giulio che domani non vieni? Sì, ___ ho già detto.', ans: 'gli', hint: 'a lui' },
      { text: 'Hai ancora parlato con la tua insegnante? No, ___ parlerò domani.', ans: 'le', hint: 'a lei' },
      { text: 'Sei mai andato in Giappone? No, ___ vorrei andare un giorno.', ans: 'ci', hint: 'luogo' },
      { text: 'Vuoi ancora della pizza? Sì, ___ prendo un altro pezzo.', ans: 'ne', hint: 'partitivo' },
      { text: 'Quando vai in palestra? ___ vado alle sette di mattina.', ans: 'Ci', hint: 'luogo' },
      { text: 'Hai salutato i colleghi prima di partire? Sì, ___ ho mandato un messaggio.', ans: 'gli', hint: 'a loro' },
      { text: 'Non capisco questa regola. Non ___ avevo mai pensato.', ans: 'ci', hint: 'pensarci' },
      { text: 'Quante sorelle hai? ___ ho una sola.', ans: 'Ne', hint: 'partitivo' },
    ],
  },
];

export default function ParticulasItalianoB1() {
  return (
    <>
      <QuizSchema
        name="Particelle Pronominali Italiane B1 — ci, ne, gli, le, vi"
        url="https://www.idiomaswl.com/practica/italiano/b1/particelle"
        description="Ejercicios interactivos para dominar las partículas pronominales del italiano: ci, ne, gli, le, vi. 6 niveles progresivos con feedback inmediato."
      />
      <QuestEngine
        color="#009246"
        flag="🇮🇹"
        storageKey="quest-it-b1-particelle"
        guide={guide}
        levels={levels}
        backHref="/practica/italiano/b1/gramatica"
        backLabel="Gramática B1"
        title="Particelle Pronominali"
        subtitle="Italiano B1 — Grammatica"
      />
    </>
  );
}
