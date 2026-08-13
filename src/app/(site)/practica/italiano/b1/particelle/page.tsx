import type { Metadata } from 'next';
import QuestEngine from '@/components/practica/QuestEngine';
import type { QuestLevel, QuestGuide } from '@/components/practica/QuestEngine';
import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Particelle pronominali italiane B1 — ci, ne, gli, le, vi',
  description: 'Guía y quest de 6 niveles para practicar las particelle pronominali italianas: ci, ne, gli, le y vi, con errores frecuentes y corrección.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/b1/particelle' },
  keywords: [
    'particelle pronominali italiane',
    'ci ne gli le vi italiano',
    'pronombres ci ne italiano',
    'gramatica italiana B1',
    'ejercicios particelle italiano',
  ],
};

const guide: QuestGuide = {
  title: 'Guía B1: particelle pronominali ci, ne, gli, le, vi',
  body: 'Las particelle pronominali son palabras pequeñas que sustituyen un lugar, una cantidad o un complemento ya mencionado. En italiano B1 aparecen todo el tiempo porque permiten evitar repeticiones: "Vado a Roma" puede convertirse en "Ci vado"; "Compro tre libri" puede convertirse en "Ne compro tre".\n\nCI suele reemplazar un lugar introducido por a, in o da, o una idea con verbos como pensare a: "Ci penso". NE reemplaza una cantidad o una expresión con di: "Ne voglio due", "Ne parliamo domani". GLI reemplaza "a lui" y, en el uso común, también "a loro"; LE reemplaza "a lei"; VI puede ser "a voi" o un lugar en registro más formal.\n\nLa posición normal es antes del verbo conjugado: "Ci vado", "Ne prendo due", "Gli scrivo". Con infinitivo puede ir al final y pegarse al verbo: "voglio andarci", "devo parlarne". En los tiempos compuestos, NE puede afectar el participio cuando expresa cantidad: "Ne ho comprate tre".\n\nEste quest tiene 6 niveles progresivos. Los niveles 1 y 2 trabajan reconocimiento con opciones; los niveles 3, 4 y 5 pasan a escritura libre en contextos cada vez más complejos; el nivel 6 es un sprint final para automatizar la respuesta. Para avanzar, necesitas contestar correctamente la mayoría de cada nivel.',
  tip: 'Atajo mental: CI = lì/a ciò; NE = di qualcosa/quantità; GLI = a lui/a loro; LE = a lei; VI = a voi o lì en registro formal.',
  tableHead: ['Particella', 'Funzione principale', 'Esempio'],
  tableRows: [
    ['ci', 'luogo / a ciò', '"Ci vado ogni anno" = vado lì'],
    ['ne', 'quantità / di ciò', '"Ne voglio tre" = tre di queste cose'],
    ['gli', 'a lui / a loro', '"Gli ho detto tutto" = ho detto tutto a lui'],
    ['le', 'a lei', '"Le ho scritto ieri" = ho scritto a lei'],
    ['vi', 'a voi / luogo formale', '"Vi aspetto qui" = aspetto voi'],
    ['-ci / -ne', 'dopo infinito', '"andarci", "parlarne", "prenderne due"'],
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
      <GrammarLessonSchema
        name="Particelle pronominali italiane B1 — ci, ne, gli, le, vi"
        url="https://www.idiomaswl.com/practica/italiano/b1/particelle"
        description="Guía de gramática italiana B1 sobre las particelle pronominali ci, ne, gli, le y vi, con explicación, ejemplos y un quest progresivo de 6 niveles."
        educationalLevel="B1"
        inLanguage="it"
        keywords={['particelle pronominali', 'ci ne italiano', 'gli le vi italiano', 'gramatica italiana B1']}
        course={{ name: 'Gramática de Italiano B1', url: 'https://www.idiomaswl.com/practica/italiano/b1/gramatica' }}
      />
      <QuizSchema
        name="Particelle Pronominali Italiane B1 — ci, ne, gli, le, vi"
        url="https://www.idiomaswl.com/practica/italiano/b1/particelle"
        description="Quest interactivo para dominar las particelle pronominali italianas: ci, ne, gli, le y vi. 6 niveles progresivos con feedback inmediato."
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
        defaultGuideOpen
      />
    </>
  );
}
