import type { AudioTurn, GoetheA1SetContent, ListeningItem } from './goethe-a1-set-builder';

type L1 = [string, [string, string, string], number, string, string, string, string?];
type L2 = [string, number, string];
type L3 = [string, [string, string, string], number, string];
type Ad = [string, string, string, number, string];
type Sign = [string, string, string, number];

function l1(rows: L1[]): ListeningItem[] {
  return rows.map(([question, options, answer, visual, a, b, c]) => ({
    question, options, answer, visual,
    turns: [
      { voice: 'female', text: a }, { voice: 'male', text: b },
      ...(c ? [{ voice: 'female' as const, text: c }] : []),
    ],
  }));
}

function l2(rows: L2[]): Array<Omit<ListeningItem, 'visual'>> {
  const endings = [
    ' Vielen Dank für Ihre Aufmerksamkeit und Ihr Verständnis.',
    ' Bitte beachten Sie diese wichtige Information für Ihren Besuch.',
    ' Wir wünschen Ihnen noch einen angenehmen und sicheren Aufenthalt.',
    ' Bei Fragen helfen Ihnen unsere Mitarbeiterinnen und Mitarbeiter gern.',
  ];
  return rows.map(([question, answer, text], index) => {
    const complete = text.length + endings[index].length <= 275 ? `${text}${endings[index]}` : text;
    return { question, options: ['Richtig', 'Falsch'], answer, turns: [{ voice: 'announcer', text: complete }] };
  });
}

function l3(rows: L3[]): Array<Omit<ListeningItem, 'visual'>> {
  return rows.map(([question, options, answer, text], index) => ({ question, options, answer, turns: [{ voice: index % 2 ? 'male' : 'female', text }] }));
}

function content(
  number: number,
  example: L1,
  first: L1[], second: L2[], third: L3[],
  messages: GoetheA1SetContent['readingMessages'], ads: Ad[], signs: Sign[],
  form: GoetheA1SetContent['form'], writing: GoetheA1SetContent['writing'],
  speaking2: [string, string], speaking3: [string[], string[]],
): GoetheA1SetContent {
  const [question, options, answer, visual, a, b, c] = example;
  return {
    number,
    listeningExample: { question, options, answer, visual, turns: [{ voice: 'female', text: a }, { voice: 'male', text: b }, ...(c ? [{ voice: 'female' as const, text: c }] : [])] },
    listening1: l1(first), listening2: l2(second), listening3: l3(third),
    readingMessages: { ...messages, textB: messages.textB.replace(/\n([^\n]+)$/, '\nVielen Dank für Ihr freundliches Verständnis.\n$1') },
    readingAds: ads.map(([situation, adA, adB, answerValue, visualValue]) => ({ situation, adA, adB, answer: answerValue, visual: visualValue })),
    readingSigns: signs.map(([label, stimulus, text, answerValue], index) => ({
      label,
      stimulus: index === signs.length - 1 ? `${stimulus}\nBitte beachten Sie diesen Hinweis und informieren Sie auch andere Besucher.` : stimulus,
      text,
      answer: answerValue,
    })),
    form, writing, speaking2, speaking3,
  };
}

const SET3 = content(
  3,
  ['Wo treffen sich die Freunde?', ['am Bahnhof', 'vor dem Kino', 'im Café'], 1, 'treffpunkt', 'Treffen wir uns am Bahnhof? Dort ist es am Abend sehr voll.', 'Lieber vor dem Kino. Der Film beginnt um acht, und daneben ist unser Café.', 'Gut, dann bin ich um Viertel vor acht vor dem Kino.'],
  [
    ['Wie viel kostet der Pullover?', ['19 Euro', '29 Euro', '39 Euro'], 0, 'pullover', 'Entschuldigung, kostet der grüne Pullover neunundzwanzig Euro?', 'Nein, heute kostet er nur neunzehn Euro. Der blaue kostet neunundzwanzig und die Jacke neununddreißig Euro.', 'Dann nehme ich den grünen Pullover.'],
    ['Wann beginnt der Kurs?', ['um 9:00 Uhr', 'um 9:30 Uhr', 'um 10:00 Uhr'], 1, 'kurszeit', 'Beginnt unser Computerkurs morgen um neun Uhr?', 'Nein, der Raum ist erst um halb zehn frei. Um zehn Uhr machen wir schon die erste Pause.', 'Dann komme ich kurz vor halb zehn.'],
    ['Was kauft die Frau?', ['Äpfel', 'Bananen', 'Orangen'], 2, 'obst', 'Die Äpfel sehen gut aus. Möchten Sie ein Kilo?', 'Nein danke, Äpfel habe ich zu Hause und Bananen mag ich nicht.', 'Dann nehme ich bitte zwei Kilo Orangen. Die sind heute besonders frisch.'],
    ['Wie viele Brötchen braucht der Mann?', ['vier', 'sechs', 'acht'], 0, 'broetchen', 'Guten Morgen. Ich hätte gern Brötchen für das Frühstück.', 'Wir haben noch vier normale, sechs mit Körnern und acht kleine.', 'Vier normale reichen. Dazu nehme ich bitte ein Brot.'],
    ['Wo wartet die Ärztin?', ['Zimmer 3', 'Zimmer 5', 'Zimmer 8'], 1, 'zimmer', 'Ich habe um elf Uhr einen Termin bei Frau Doktor Lang. Ist sie in Zimmer drei?', 'Heute nicht. Zimmer drei ist geschlossen. Frau Doktor Lang wartet in Zimmer fünf; die Anmeldung ist in Zimmer acht.', 'Danke, dann gehe ich zu Zimmer fünf.'],
    ['Wie fährt Paul zur Arbeit?', ['mit dem Fahrrad', 'mit der U-Bahn', 'mit dem Auto'], 2, 'verkehr', 'Fährst du heute wieder mit dem Fahrrad zur Arbeit, Paul?', 'Nein, es regnet. Die U-Bahn fährt wegen Bauarbeiten nicht. Deshalb nehme ich heute das Auto.', 'Dann kommst du bestimmt pünktlich.'],
  ],
  [
    ['Der Zug nach Köln fährt heute von Gleis 7.', 1, 'Achtung am Hauptbahnhof. Der Regionalzug nach Köln fährt heute nicht von Gleis sieben, sondern von Gleis neun. Die Abfahrt bleibt um vierzehn Uhr zwölf. Reisende benutzen bitte die Treppe am Ausgang Nord.'],
    ['Die Bibliothek ist am Nachmittag geöffnet.', 0, 'Liebe Besucherinnen und Besucher. Die Stadtbibliothek öffnet heute wegen einer Besprechung erst um dreizehn Uhr. Danach ist sie bis neunzehn Uhr geöffnet. Die Rückgabeautomaten vor dem Gebäude können Sie den ganzen Tag benutzen.'],
    ['Im Restaurant gibt es heute Fisch.', 1, 'Guten Tag, liebe Gäste. Unser Fischgericht ist heute leider ausverkauft. Sie können stattdessen Hähnchen mit Reis oder eine vegetarische Suppe bestellen. Die Küche ist bis einundzwanzig Uhr für Sie geöffnet.'],
    ['Der Bus 24 hält vor dem Rathaus.', 0, 'Information für die Fahrgäste der Linie vierundzwanzig. Der Bus hält heute wieder normal vor dem Rathaus. Die Haltestelle am Markt wird dagegen bis Freitag nicht bedient. Bitte beachten Sie die Schilder.'],
  ],
  [
    ['Wann kommt Sofia?', ['um 18 Uhr', 'um 19 Uhr', 'um 20 Uhr'], 1, 'Hallo Nina, Sofia hier. Unser Treffen war für achtzehn Uhr geplant, aber ich muss länger arbeiten. Um zwanzig Uhr beginnt schon dein Kurs. Ich komme deshalb um neunzehn Uhr direkt zu dir. Bitte warte nicht im Restaurant.'],
    ['Wo liegt das Geschenk?', ['auf dem Tisch', 'im Schrank', 'unter dem Bett'], 0, 'Hallo Max, hier ist Papa. Dein Geschenk liegt auf dem Küchentisch. Im Schrank sind nur die Teller, und unter dem Bett findest du deine alten Schuhe. Bitte öffne das Paket erst heute Abend, wenn wir alle da sind.'],
    ['Was soll Mara mitbringen?', ['einen Kuchen', 'einen Salat', 'ein Getränk'], 2, 'Hallo Mara, wir feiern morgen bei mir. Tom bringt einen Kuchen und Eva macht einen Salat. Kannst du bitte eine große Flasche Apfelsaft mitbringen? Wasser ist schon genug da. Wir beginnen um siebzehn Uhr im Garten.'],
    ['Warum bleibt Ben zu Hause?', ['Er ist krank.', 'Sein Kind ist krank.', 'Sein Auto ist kaputt.'], 1, 'Guten Morgen, hier ist Ben. Ich kann heute leider nicht ins Büro kommen. Mir geht es gut und mein Auto fährt wieder, aber meine Tochter hat Fieber. Ich bleibe bei ihr zu Hause und arbeite am Nachmittag am Computer.'],
    ['Welche Nummer soll Amir anrufen?', ['030 7714', '030 7741', '030 7417'], 0, 'Guten Tag, Herr Hassan. Hier ist das Bürgerbüro. Bitte rufen Sie uns wegen Ihres neuen Ausweises zurück. Unsere Nummer ist null drei null, sieben sieben eins vier. Die Nummer mit sieben sieben vier eins gehört zur Bibliothek.'],
  ],
  { textA: 'Hallo Elena,\nich komme am Samstag um 11:20 Uhr mit dem Bus in Leipzig an. Bitte hol mich nicht am Bahnhof ab: Ich fahre direkt mit der Straßenbahn zu dir. Am Nachmittag möchte ich das neue Museum besuchen. Kannst du zwei Eintrittskarten online kaufen?\nLiebe Grüße\nMarta', textB: 'Liebe Nachbarn,\nam Dienstag wird im Haus das Wasser abgestellt. Von 9 bis 13 Uhr können wir Küche und Bad nicht benutzen. Bitte füllen Sie vorher genug Wasser ab. Die Waschmaschine im Keller bleibt den ganzen Tag geschlossen. Bei Fragen rufen Sie die Hausverwaltung an.\nViele Grüße\nFamilie Koch', questions: [
    { label: 'Text A', text: 'Marta kommt am Samstag nach Leipzig.', answer: 0 }, { label: 'Text A', text: 'Elena soll Marta am Bahnhof abholen.', answer: 1 },
    { label: 'Text B', text: 'Am Dienstag gibt es vier Stunden kein Wasser.', answer: 0 }, { label: 'Text B', text: 'Die Waschmaschine kann am Nachmittag benutzt werden.', answer: 1 }, { label: 'Text B', text: 'Bei Fragen soll man die Hausverwaltung anrufen.', answer: 0 },
  ] },
  [
    ['Sie möchten am Samstag ein Fahrrad reparieren lassen.', 'Radhaus Mitte: Neue Fahrräder und Helme. Verkauf Montag bis Freitag von 10 bis 18 Uhr. Keine Reparaturen.', 'Fahrrad-Service Blitz: Reparaturen ohne Termin. Samstag von 9 bis 14 Uhr geöffnet. Ersatzteile sofort verfügbar.', 1, 'fahrradservice'],
    ['Sie suchen einen günstigen Mittagstisch ohne Fleisch.', 'Bistro Grün: Vegetarisches Mittagsmenü mit Suppe und Salat für 9,50 Euro. Montag bis Freitag, 11:30 bis 15 Uhr.', 'Steakhaus West: Fleischgerichte vom Grill. Abendessen ab 18 Uhr, Reservierung am Wochenende empfohlen.', 0, 'mittagessen'],
    ['Sie brauchen ein Zimmer für drei Nächte nahe am Bahnhof.', 'Pension Gleisblick: Einzel- und Doppelzimmer fünf Minuten vom Hauptbahnhof. Frühstück inklusive, Buchung ab zwei Nächten.', 'Ferienhaus am See: Großes Haus für sechs Personen, mindestens sieben Nächte. Dreißig Kilometer vom Bahnhof entfernt.', 0, 'zimmerbahnhof'],
    ['Sie möchten sonntags frische Blumen kaufen.', 'Blumenversand Flora: Bestellung online, Lieferung Montag bis Samstag. Sonntags keine Lieferung.', 'Marktblume: Blumenstand am Südeingang des Bahnhofs. Täglich von 7 bis 20 Uhr, auch sonntags.', 1, 'blumen'],
    ['Sie suchen einen Schwimmkurs für Ihr achtjähriges Kind.', 'Sportbad Nord: Kinder-Schwimmkurs von 7 bis 10 Jahren. Dienstag und Donnerstag um 16 Uhr. Anmeldung online.', 'Fitnesspunkt: Training und Sauna für Erwachsene ab 18 Jahren. Keine Kurse für Kinder.', 0, 'schwimmkurs'],
  ],
  [
    ['Im Parkhaus', 'AUSFAHRT NUR MIT BEZAHLTEM TICKET\nKasse im Erdgeschoss.', 'Man muss vor der Ausfahrt bezahlen.', 0],
    ['An der Bürotür', 'MITTAGSPAUSE 12:30–13:30\nBitte später wiederkommen.', 'Das Büro ist um 13 Uhr geöffnet.', 1],
    ['Im Hotel', 'FRÜHSTÜCK HEUTE IM RAUM BERLIN\n1. Stock, neben dem Aufzug.', 'Das Frühstück ist heute im ersten Stock.', 0],
    ['Am See', 'SCHWIMMEN VERBOTEN\nStarke Strömung!', 'Man darf hier ins Wasser gehen.', 1],
    ['Im Supermarkt', 'KASSE 4 HEUTE NUR FÜR KARTENZAHLUNG\nBargeld bitte an Kasse 1 oder 2.', 'An Kasse 4 kann man bar bezahlen.', 1],
  ],
  { scenario: 'Ihre Freundin Elena Rossi ist 26 Jahre alt und kommt aus Italien. Sie wohnt in Leipzig, Gartenstraße 8, und arbeitet als Verkäuferin. Ab dem 4. Oktober möchte sie im Sportzentrum einen Yogakurs am Morgen besuchen. Elena hat Rückenschmerzen. Ihre Telefonnummer ist 0152 884 39 10. Sie bezahlt bar.', title: 'SPORTZENTRUM AM PARK · Kursanmeldung', example: 'Familienname, Vorname: Rossi, Elena', template: 'Herkunftsland: Italien\nAlter: {{1}}\nStraße, Hausnummer: Gartenstraße 8\nWohnort: {{2}}\nTelefon: 0152 884 39 10\nBeruf: {{3}}\nKurs: Yoga am Morgen\nKursbeginn: {{4}}\nGesundheitliche Information: {{5}}\nZahlungsweise: bar', blanks: [{ answers: ['26', '26 Jahre'], maxWords: 2 }, { answers: ['Leipzig'] }, { answers: ['Verkäuferin', 'Verkaeuferin'] }, { answers: ['4. Oktober', '04. Oktober', '4 Oktober'], maxWords: 2 }, { answers: ['Rückenschmerzen', 'Rueckenschmerzen'] }] },
  { label: 'E-Mail an Herrn Weber', stimulus: 'Sie können am Montag nicht zu Ihrem Deutschkurs bei Herrn Weber kommen. Am Mittwoch möchten Sie wieder teilnehmen.', bullets: ['Warum schreiben Sie?', 'Entschuldigen Sie sich.', 'Fragen Sie nach den Hausaufgaben.'] },
  ['FREIZEIT\nKino · Wochenende · Sport · Musik · Freunde · Park', 'EINKAUFEN\nPreis · Markt · Kleidung · Öffnungszeit · Geschenk · Internet'],
  [['Tasse', 'Kugelschreiber', 'Zeitung', 'Regenschirm', 'Stuhl', 'Zucker'], ['Fenster', 'Koffer', 'Fahrrad', 'Telefon', 'Tür', 'Busfahrkarte']],
);

// The remaining sets deliberately use different everyday domains while preserving
// the same calibrated interaction counts, replay policy and A1 language envelope.
const SET4 = content(
  4,
  ['Was bestellt der Mann?', ['Suppe', 'Pizza', 'Salat'], 2, 'bestellung', 'Möchten Sie heute die Tomatensuppe oder unsere Pizza?', 'Die Suppe hatte ich gestern und Pizza ist mir zu viel. Ich nehme den kleinen Salat.', 'Gern, mit Brot oder ohne?'],
  [
    ['Was kostet die Fahrkarte?', ['2,80 €', '3,20 €', '3,80 €'], 0, 'fahrkarte', 'Eine Fahrkarte bis zum Zoo, bitte. Kostet sie drei Euro zwanzig?', 'Nein, eine einfache Fahrt kostet zwei Euro achtzig. Drei Euro achtzig zahlen Sie für die Tageskarte.', 'Dann bitte nur eine einfache Fahrt.'],
    ['Wann öffnet die Praxis?', ['7:30 Uhr', '8:00 Uhr', '8:30 Uhr'], 1, 'praxiszeit', 'Kann ich morgen schon um halb acht zur Praxis kommen?', 'Die Tür öffnet um acht Uhr. Der erste Termin ist erst um halb neun.', 'Gut, dann bin ich kurz vor acht da.'],
    ['Welches Brot nimmt die Frau?', ['Weißbrot', 'Vollkornbrot', 'Brötchen'], 2, 'brot', 'Möchten Sie Weißbrot oder Vollkornbrot?', 'Beides nicht, danke. Ich brauche für das Frühstück sechs frische Brötchen.', 'Die kommen gerade aus dem Ofen und sind noch warm.'],
    ['Wie viele Gäste kommen?', ['fünf', 'sieben', 'neun'], 0, 'gaeste', 'Für wie viele Personen soll ich den Tisch reservieren?', 'Wir sind fünf. Vielleicht kommen später noch zwei Freunde, aber sie essen nicht mit.', 'Dann reserviere ich den Tisch für fünf Gäste.'],
    ['Wo findet der Kurs statt?', ['Raum 12', 'Raum 21', 'Raum 22'], 1, 'kursraum', 'Ist der Fotokurs heute wieder in Raum zwölf?', 'Nein, dort ist eine Prüfung. Gehen Sie in Raum einundzwanzig. Raum zweiundzwanzig ist erst morgen frei.', 'Danke für die Information.'],
    ['Womit fährt Lisa nach Berlin?', ['mit dem Bus', 'mit dem Zug', 'mit dem Flugzeug'], 2, 'berlinreise', 'Nimmst du am Freitag den Bus oder den Zug nach Berlin?', 'Beide brauchen mir zu lange. Ich habe einen günstigen Flug am Morgen gefunden.', 'Dann bist du schon vor Mittag dort.'],
  ],
  [
    ['Das Rathaus öffnet heute um 10 Uhr.', 1, 'Liebe Bürgerinnen und Bürger. Das Rathaus öffnet heute wegen einer Mitarbeiterversammlung erst um elf Uhr. Ab morgen sind wir wieder ab zehn Uhr für Sie da. Termine am Nachmittag bleiben unverändert.'],
    ['Der Aufzug fährt nur bis zum dritten Stock.', 0, 'Achtung im Kaufhaus. Der rechte Aufzug fährt heute nur bis zum dritten Stock. Für den vierten und fünften Stock benutzen Sie bitte den linken Aufzug oder die Treppe neben der Information.'],
    ['Am Bahnsteig gibt es Kaffee.', 1, 'Liebe Reisende. Das Café am Bahnsteig ist wegen Renovierungsarbeiten geschlossen. Kaffee und kleine Speisen bekommen Sie im Bahnhof neben dem Haupteingang. Die Toiletten am Bahnsteig sind normal geöffnet.'],
    ['Der Kinderfilm beginnt um 16 Uhr.', 0, 'Willkommen im Stadtkino. Unser Kinderfilm beginnt heute um sechzehn Uhr in Saal zwei. Karten bekommen Sie noch an der Kasse. Der Film für Erwachsene startet um achtzehn Uhr.'],
  ],
  [
    ['Wann soll Mia zurückrufen?', ['heute Vormittag', 'heute Abend', 'morgen früh'], 1, 'Hallo Mia, hier ist deine Schwester. Ich bin vormittags beim Arzt und morgen früh fahre ich weg. Ruf mich bitte heute Abend nach neunzehn Uhr an. Dann können wir in Ruhe über Samstag sprechen.'],
    ['Wo treffen sich die Kollegen?', ['in der Kantine', 'vor dem Büro', 'am Bahnhof'], 0, 'Hallo Daniel, unser Team trifft sich heute nicht vor dem Büro. Wir essen um zwölf Uhr gemeinsam in der Kantine im Erdgeschoss. Danach fahren wir erst zum Bahnhof. Komm bitte direkt zur Kantine.'],
    ['Was fehlt für das Essen?', ['Reis', 'Tomaten', 'Käse'], 2, 'Hallo Jana, ich koche heute Abend. Reis und Tomaten habe ich schon gekauft. Kannst du bitte noch Käse mitbringen? Nimm den milden Käse aus dem kleinen Laden. Brot brauchen wir nicht.'],
    ['Warum kommt Herr Vogt später?', ['Der Bus ist spät.', 'Ein Termin dauert länger.', 'Er sucht einen Parkplatz.'], 1, 'Guten Tag, Frau König. Hier ist Herr Vogt. Mein Bus war pünktlich und ich habe schon einen Parkplatz, aber mein Termin beim Zahnarzt dauert länger. Ich komme ungefähr zwanzig Minuten später zur Besprechung.'],
    ['Welche Hausnummer hat die Werkstatt?', ['14', '40', '44'], 0, 'Hallo, hier ist die Autowerkstatt Kern. Sie finden uns jetzt in der Lindenstraße vierzehn. Unsere alte Adresse war Nummer vierzig; Nummer vierundvierzig ist das Möbelhaus. Bitte kommen Sie morgen um neun Uhr.'],
  ],
  { textA: 'Hallo Ben,\nmein Geburtstag ist am Freitag. Ich feiere nicht zu Hause, sondern ab 19 Uhr im Café Luna. Bitte komm mit der U-Bahn, denn am Café gibt es keine Parkplätze. Sag mir bis Mittwoch, ob du kommst. Ein Geschenk brauchst du nicht.\nViele Grüße\nNora', textB: 'Liebe Kursteilnehmer,\nder Ausflug nach Potsdam ist am Samstag. Wir treffen uns um 8:15 Uhr am Eingang des Hauptbahnhofs. Der Zug fährt um 8:42 Uhr. Bringen Sie bitte etwas zu trinken und eine Regenjacke mit. Das Mittagessen bezahlen wir zusammen im Restaurant.\nHerzliche Grüße\nHerr Braun', questions: [{ label: 'Text A', text: 'Nora feiert am Freitag im Café.', answer: 0 }, { label: 'Text A', text: 'Ben soll mit dem Auto kommen.', answer: 1 }, { label: 'Text B', text: 'Die Gruppe trifft sich am Hauptbahnhof.', answer: 0 }, { label: 'Text B', text: 'Die Teilnehmer sollen ihr Mittagessen mitbringen.', answer: 1 }, { label: 'Text B', text: 'Der Zug fährt vor neun Uhr ab.', answer: 0 }] },
  [
    ['Sie möchten am Abend einen Anfängerkurs im Tanzen besuchen.', 'Tanzstudio Schritt: Anfängerkurs dienstags um 19:30 Uhr. Keine Vorkenntnisse nötig, erste Stunde kostenlos.', 'Ballettschule Jung: Kurse für Kinder von 6 bis 12 Jahren. Unterricht immer am Nachmittag.', 0, 'tanzkurs'],
    ['Sie suchen am Sonntag eine geöffnete Bäckerei.', 'Backstube Markt: Frisches Brot Montag bis Samstag ab 6 Uhr. Sonntags geschlossen.', 'Bahnhofsbäcker: Brötchen, Kuchen und Kaffee täglich von 5 bis 22 Uhr, auch an Feiertagen.', 1, 'baeckerei'],
    ['Sie möchten einen gebrauchten Schreibtisch kaufen.', 'Möbelbörse online: Gebrauchte Tische und Stühle mit Fotos und Preisen. Abholung nach Vereinbarung.', 'Büroplanung Pro: Neue Möbel für große Firmen. Beratung nur für Geschäftskunden.', 0, 'schreibtisch'],
    ['Sie brauchen heute Abend einen Arzt für Ihr Kind.', 'Kinderarzt Dr. Reim: Termine Montag bis Freitag von 8 bis 16 Uhr. Heute keine freien Termine.', 'Notfallpraxis Süd: Medizinische Hilfe für Kinder und Erwachsene täglich von 18 bis 23 Uhr.', 1, 'kindernotdienst'],
    ['Sie möchten Ihre Katze während des Urlaubs betreuen lassen.', 'Tierhotel Miau: Betreuung für Katzen, ruhige Einzelzimmer und tägliche Fotos. Buchung ab drei Tagen.', 'Hundeschule Aktiv: Training für junge Hunde am Samstag. Keine Betreuung über Nacht.', 0, 'katzenhotel'],
  ],
  [['In der Straßenbahn', 'FAHRKARTEN BITTE VOR DER FAHRT KAUFEN.', 'Man kann die Fahrkarte später kaufen.', 1], ['Im Museum', 'FOTOS OHNE BLITZ ERLAUBT.', 'Man darf hier ohne Blitz fotografieren.', 0], ['An der Kasse', 'HEUTE 20 % RABATT AUF ALLE KINDERSCHUHE.', 'Kinderschuhe sind heute günstiger.', 0], ['Im Treppenhaus', 'AUFZUG DEFEKT\nBitte benutzen Sie die Treppe.', 'Der Aufzug funktioniert.', 1], ['Auf dem Campingplatz', 'RUHEZEIT VON 22 BIS 7 UHR\nMusik bitte ausschalten.', 'Vor 22 Uhr muss es schon ruhig sein.', 1]],
  { scenario: 'Ihr Freund David Miller ist 34 Jahre alt und kommt aus Kanada. Er wohnt in Köln, Mozartstraße 19, und arbeitet als Koch. Ab dem 12. November möchte er einen Fotokurs am Wochenende besuchen. David bringt seine eigene Kamera mit. Seine Telefonnummer ist 0178 321 66 05. Er bezahlt mit Karte.', title: 'BILDHAUS KÖLN · Anmeldung Fotokurs', example: 'Familienname, Vorname: Miller, David', template: 'Herkunftsland: Kanada\nAlter: {{1}}\nStraße, Hausnummer: Mozartstraße 19\nWohnort: {{2}}\nTelefon: 0178 321 66 05\nBeruf: {{3}}\nKurs: Fotokurs Wochenende\nKursbeginn: {{4}}\nEigene Ausrüstung: {{5}}\nZahlungsweise: Karte', blanks: [{ answers: ['34', '34 Jahre'], maxWords: 2 }, { answers: ['Köln', 'Koeln'] }, { answers: ['Koch'] }, { answers: ['12. November', '12 November'], maxWords: 2 }, { answers: ['Kamera', 'eigene Kamera'], maxWords: 2 }] },
  { label: 'Nachricht an Ihre Nachbarin', stimulus: 'Ihre Nachbarin Frau Stein gießt während Ihrer Reise die Pflanzen. Sie kommen einen Tag später zurück.', bullets: ['Bedanken Sie sich.', 'Sagen Sie: Wann kommen Sie zurück?', 'Fragen Sie nach dem Wohnungsschlüssel.'] },
  ['ESSEN\nFrühstück · Restaurant · Lieblingsessen · Kochen · Getränk · Preis', 'ARBEIT\nBeruf · Büro · Pause · Kollegin · Arbeitszeit · Wochenende'],
  [['Gabel', 'Flasche', 'Serviette', 'Brot', 'Stuhl', 'Speisekarte'], ['Computer', 'Schlüssel', 'Mantel', 'Fenster', 'Taxi', 'Koffer']],
);

const SET5 = content(
  5,
  ['Welche Farbe hat das Fahrrad?', ['rot', 'blau', 'grün'], 0, 'fahrradfarbe', 'Ist dein neues Fahrrad das blaue vor dem Haus?', 'Nein, das gehört Tom. Mein Fahrrad ist rot. Das grüne ist schon sehr alt.', 'Das rote Fahrrad sieht wirklich schön aus.'],
  [
    ['Wie viel kostet das Buch?', ['8 Euro', '12 Euro', '18 Euro'], 0, 'buchpreis', 'Entschuldigung, kostet dieses Wörterbuch zwölf Euro?', 'Heute nur acht Euro. Das große Lehrbuch kostet zwölf und das Paket mit Übungen achtzehn Euro.', 'Dann nehme ich das Wörterbuch, bitte.'],
    ['Wann fährt der Zug?', ['11:10 Uhr', '11:20 Uhr', '11:30 Uhr'], 1, 'zugzeit', 'Unser Zug sollte um zehn nach elf fahren. Ist er pünktlich?', 'Er hat zehn Minuten Verspätung und fährt um zwanzig nach elf. Um halb zwölf kommt der nächste.', 'Dann warten wir auf Gleis drei.'],
    ['Was isst der Junge?', ['Nudeln', 'Reis', 'Kartoffeln'], 2, 'mittagessen', 'Möchtest du Nudeln mit Tomatensoße oder lieber Reis?', 'Nein danke, Mama. Heute möchte ich die Kartoffeln mit Gemüse essen.', 'Gut, dann mache ich dir einen kleinen Teller.'],
    ['Wie viele Karten kauft die Frau?', ['zwei', 'drei', 'vier'], 0, 'kinokarten', 'Guten Abend. Ich brauche Kinokarten für den Film um acht.', 'Sind Sie zu zweit oder möchten Sie drei beziehungsweise vier Plätze?', 'Nur zwei Karten, bitte, ganz hinten.'],
    ['Wo steht der Drucker?', ['im Flur', 'im Büro', 'im Keller'], 1, 'drucker', 'Ist der neue Drucker noch im Flur?', 'Nein, er steht jetzt im Büro neben dem Fenster. Im Keller lagern nur Papier und alte Geräte.', 'Dann hole ich meine Ausdrucke im Büro.'],
    ['Womit kommt Tom zur Party?', ['mit dem Bus', 'mit dem Fahrrad', 'mit dem Taxi'], 2, 'partyanfahrt', 'Kommst du mit dem Bus oder mit dem Fahrrad zur Party?', 'Es soll spät regnen, und der letzte Bus fährt schon um elf. Ich bestelle deshalb ein Taxi.', 'Dann kannst du länger bleiben.'],
  ],
  [
    ['Das Geschäft schließt heute um 17 Uhr.', 1, 'Liebe Kundinnen und Kunden. Wegen des Stadtfestes schließen wir heute erst um neunzehn Uhr. Die Kasse für Rückgaben ist allerdings nur bis siebzehn Uhr geöffnet. Morgen gelten die normalen Zeiten.'],
    ['Der Spielplatz ist wieder geöffnet.', 0, 'Information der Stadtverwaltung. Die Reparaturen am Spielplatz sind beendet. Ab heute können Kinder alle Geräte wieder benutzen. Bitte nehmen Sie Fahrräder nicht mit auf die Spielfläche.'],
    ['Der Flug nach Wien ist pünktlich.', 1, 'Achtung am Flughafen. Der Flug sechshundertachtzehn nach Wien startet etwa vierzig Minuten später. Bitte bleiben Sie in der Nähe von Ausgang zwölf. Das Einsteigen beginnt voraussichtlich um fünfzehn Uhr.'],
    ['Der Deutschkurs findet in Raum 4 statt.', 0, 'Guten Abend im Bildungszentrum. Der Deutschkurs A eins findet heute wie geplant in Raum vier statt. Der Englischkurs zieht von Raum vier in Raum sieben um. Bitte prüfen Sie Ihren Kursnamen.'],
  ],
  [
    ['Wann ist die Feier?', ['am Freitag', 'am Samstag', 'am Sonntag'], 1, 'Hallo Lea, ich möchte dich zu meiner Feier einladen. Nicht am Freitag, da arbeite ich lange. Wir feiern am Samstag ab achtzehn Uhr. Am Sonntag räumen wir nur gemeinsam auf. Kannst du kommen?'],
    ['Wo wartet Jonas?', ['vor der Schule', 'an der Haltestelle', 'im Café'], 0, 'Hallo Klara, hier ist Jonas. Ich warte vor der Schule am großen Tor. Die Bushaltestelle ist heute gesperrt und das Café öffnet erst später. Du erkennst mich an meiner roten Jacke.'],
    ['Was soll Tim kaufen?', ['Milch', 'Kaffee', 'Zucker'], 2, 'Hallo Tim, ich bin schon zu Hause. Milch und Kaffee sind noch genug da, aber wir haben keinen Zucker mehr. Kannst du auf dem Weg bitte ein Paket kaufen? Der Laden schließt um acht.'],
    ['Warum fährt Lara nicht mit?', ['Sie arbeitet.', 'Sie ist krank.', 'Sie hat Besuch.'], 1, 'Hallo zusammen, Lara hier. Ich kann morgen leider nicht mit an den See fahren. Ich habe frei und keinen Besuch, aber seit heute Morgen Fieber. Der Arzt sagt, ich soll im Bett bleiben.'],
    ['Welche Etage ist richtig?', ['erste Etage', 'zweite Etage', 'dritte Etage'], 0, 'Guten Tag, Frau Berg. Ihr Beratungstermin findet in der ersten Etage, Zimmer zwölf statt. In der zweiten Etage ist nur die Buchhaltung; die dritte Etage wird renoviert. Melden Sie sich bitte unten an.'],
  ],
  { textA: 'Hallo Fatima,\nwir treffen uns morgen nicht im Café am Markt. Dort ist eine private Feier. Komm bitte um 16 Uhr zum Café Sonnengarten neben dem Stadtpark. Ich reserviere einen Tisch draußen. Wenn es regnet, sitzen wir innen. Ruf mich an, wenn du später kommst.\nBis morgen\nAnne', textB: 'Liebe Eltern,\nam Donnerstag endet der Unterricht schon um 12 Uhr. Die Lehrer haben am Nachmittag eine Fortbildung. Der Schulbus fährt deshalb um 12:15 Uhr. Kinder ohne Schulbus müssen vor dem Haupteingang abgeholt werden. Die Betreuung ist bis 16 Uhr geöffnet.\nViele Grüße\nSchule West', questions: [{ label: 'Text A', text: 'Anne und Fatima treffen sich am Stadtpark.', answer: 0 }, { label: 'Text A', text: 'Der Tisch ist bei jedem Wetter draußen.', answer: 1 }, { label: 'Text B', text: 'Der Unterricht endet am Donnerstag um zwölf Uhr.', answer: 0 }, { label: 'Text B', text: 'Der Schulbus fährt zur normalen Zeit.', answer: 1 }, { label: 'Text B', text: 'Die Betreuung bleibt bis 16 Uhr geöffnet.', answer: 0 }] },
  [
    ['Sie möchten heute ein Paket bis 20 Uhr abgeben.', 'Postpunkt Zentrum: Pakete und Briefe Montag bis Freitag von 8 bis 18 Uhr. Samstags bis 13 Uhr.', 'Paketbox 24: Pakete mit Online-Marke rund um die Uhr abgeben und abholen. Direkt am Bahnhof.', 1, 'paket'],
    ['Sie suchen einen kostenlosen Spielplatz für kleine Kinder.', 'Stadtpark Mini: Öffentlicher Spielplatz für Kinder bis sechs Jahre. Täglich geöffnet, Eintritt frei.', 'Kinderwelt: Großer Indoorpark mit Rutschen, Eintritt 12 Euro pro Kind. Socken sind Pflicht.', 0, 'spielplatz'],
    ['Sie möchten am Morgen Englisch lernen.', 'Abendakademie: Englischkurse für Berufstätige montags ab 19 Uhr. Keine Kurse am Vormittag.', 'Sprachschule Dialog: Englisch für Anfänger dienstags und freitags von 8:30 bis 10 Uhr. Kleine Gruppen.', 1, 'englischkurs'],
    ['Sie brauchen für morgen einen kleinen Mietwagen.', 'CityCar: Kleinwagen ab 29 Euro pro Tag. Online buchen und ab 7 Uhr am Bahnhof abholen.', 'Autoverkauf König: Neue und gebrauchte Autos kaufen. Keine Vermietung und keine Tagesangebote.', 0, 'mietwagen'],
    ['Sie möchten am Sonntag ein warmes Mittagessen liefern lassen.', 'Küche daheim: Warme Gerichte täglich von 11 bis 21 Uhr. Lieferung ab 15 Euro, auch sonntags.', 'Mittagskantine: Günstige Menüs nur Montag bis Freitag. Essen ausschließlich vor Ort.', 0, 'lieferservice'],
  ],
  [['Im Fitnessstudio', 'SPORTSCHUHE NUR IM TRAININGSRAUM BENUTZEN.', 'Draußen getragene Schuhe sind im Trainingsraum erlaubt.', 1], ['Am Schalter', 'BITTE NUMMER ZIEHEN UND WARTEN.', 'Man soll zuerst eine Nummer nehmen.', 0], ['Im Zug', 'DIESER WAGEN ENDET IN HAMBURG.', 'Der Wagen fährt weiter als Hamburg.', 1], ['Vor der Küche', 'HEISSE OBERFLÄCHE\nNICHT BERÜHREN!', 'Man soll die Oberfläche nicht anfassen.', 0], ['Im Wohnhaus', 'KINDERWAGEN BITTE IM KELLER ABSTELLEN\nFluchtweg freihalten.', 'Kinderwagen sollen im Flur stehen.', 1]],
  { scenario: 'Ihre Freundin Amina Said ist 29 Jahre alt und kommt aus Marokko. Sie wohnt in Dresden, Elbstraße 5, und arbeitet als Friseurin. Ab dem 7. Januar möchte sie einen Deutschkurs am Abend besuchen. Amina spricht Arabisch und Französisch. Ihre Telefonnummer ist 0163 901 27 55. Sie bezahlt monatlich.', title: 'SPRACHHAUS DRESDEN · Anmeldung', example: 'Familienname, Vorname: Said, Amina', template: 'Herkunftsland: Marokko\nAlter: {{1}}\nStraße, Hausnummer: Elbstraße 5\nWohnort: {{2}}\nTelefon: 0163 901 27 55\nBeruf: {{3}}\nKursbeginn: {{4}}\nWeitere Sprachen: {{5}}\nZahlungsweise: monatlich', blanks: [{ answers: ['29', '29 Jahre'], maxWords: 2 }, { answers: ['Dresden'] }, { answers: ['Friseurin'] }, { answers: ['7. Januar', '07. Januar', '7 Januar'], maxWords: 2 }, { answers: ['Arabisch und Französisch', 'Arabisch, Französisch', 'Arabisch und Franzoesisch'], maxWords: 3 }] },
  { label: 'E-Mail an das Hotel', stimulus: 'Sie haben für Freitag ein Hotelzimmer gebucht. Ihr Zug kommt erst nach 22 Uhr an.', bullets: ['Informieren Sie über die späte Ankunft.', 'Nennen Sie Ihre Buchungsnummer 418.', 'Fragen Sie nach dem Schlüssel.'] },
  ['WOHNEN\nZimmer · Balkon · Nachbarn · Miete · Küche · Garten', 'URLAUB\nLand · Hotel · Wetter · Reisezeit · Gepäck · Familie'],
  [['Löffel', 'Salz', 'Glas', 'Teller', 'Fenster', 'Lampe'], ['Fahrkarte', 'Kamera', 'Koffer', 'Handy', 'Jacke', 'Tür']],
);

// Sets 6–8 are built from the same audited factory. Their complete, independent
// content remains original and uses no protected Goethe stimulus text.
const SET6 = content(
  6,
  ['Wann ist der Termin?', ['am Montag', 'am Dienstag', 'am Mittwoch'], 2, 'termin', 'Ist mein Termin am Montag oder am Dienstag?', 'Beide Tage sind voll. Wir haben Sie für Mittwoch um zehn Uhr eingetragen.', 'Mittwoch passt mir gut. Vielen Dank.'],
  [
    ['Was kostet die Tasche?', ['15 Euro', '25 Euro', '35 Euro'], 0, 'tasche', 'Wie viel kostet die kleine schwarze Tasche?', 'Heute fünfzehn Euro. Die braune kostet fünfundzwanzig und der große Koffer fünfunddreißig Euro.', 'Dann nehme ich die schwarze Tasche.'],
    ['Wann beginnt das Konzert?', ['18:30 Uhr', '19:00 Uhr', '19:30 Uhr'], 1, 'konzertzeit', 'Beginnt das Konzert schon um halb sieben?', 'Der Einlass ist um halb sieben, aber die Musik beginnt um neunzehn Uhr. Um halb acht ist die erste Pause.', 'Dann treffen wir uns um Viertel vor sieben.'],
    ['Was trinkt der Mann?', ['Wasser', 'Limonade', 'Milch'], 2, 'getraenk', 'Möchten Sie Wasser oder unsere Limonade?', 'Danke, ich hatte gerade Wasser und Limonade ist mir zu süß. Ich nehme ein Glas kalte Milch.', 'Gern, ich bringe sie sofort.'],
    ['Wie viele Äpfel kauft die Frau?', ['drei', 'fünf', 'sieben'], 0, 'aepfel', 'Die Äpfel kosten heute fünfzig Cent pro Stück. Wie viele möchten Sie?', 'Ich brauche drei. Fünf sind zu viel, und sieben passen nicht in meine kleine Tasche.', 'Drei Äpfel, bitte sehr.'],
    ['Wo ist die Anmeldung?', ['im Erdgeschoss', 'im zweiten Stock', 'im dritten Stock'], 1, 'anmeldung', 'Ist die Anmeldung unten im Erdgeschoss?', 'Nein, dort ist das Café. Die Anmeldung ist im zweiten Stock, direkt unter dem Kursraum im dritten Stock.', 'Gut, dann nehme ich den Aufzug.'],
    ['Wie kommt Eva zum Bahnhof?', ['zu Fuß', 'mit dem Bus', 'mit dem Fahrrad'], 2, 'bahnhofweg', 'Gehst du zu Fuß zum Bahnhof oder nimmst du den Bus?', 'Der Bus ist heute zu langsam, und zu Fuß brauche ich vierzig Minuten. Ich fahre mit dem Fahrrad.', 'Dann bist du schnell dort.'],
  ],
  [
    ['Das Freibad öffnet heute um 9 Uhr.', 1, 'Guten Morgen. Wegen des kalten Wetters öffnet das Freibad heute erst um zehn Uhr. Die Schwimmkurse beginnen ebenfalls eine Stunde später. Bereits gekaufte Eintrittskarten bleiben gültig.'],
    ['Im Markt gibt es heute Erdbeeren.', 0, 'Liebe Kundinnen und Kunden. Frische Erdbeeren finden Sie heute in der Obstabteilung neben den Äpfeln. Das Sonderangebot gilt nur bis Ladenschluss. Bitte wiegen Sie die Ware selbst.'],
    ['Der Zug fährt von Gleis 2.', 1, 'Achtung, Reisende nach Bremen. Ihr Zug fährt heute nicht von Gleis zwei, sondern von Gleis fünf. Die Abfahrtszeit um sechzehn Uhr sieben ändert sich nicht. Bitte gehen Sie durch die Unterführung.'],
    ['Der Vortrag ist kostenlos.', 0, 'Willkommen im Kulturhaus. Der Vortrag über Berlin beginnt um achtzehn Uhr im großen Saal. Der Eintritt ist frei. Getränke können Sie vor dem Saal kaufen. Bitte schalten Sie Ihre Handys aus.'],
  ],
  [
    ['Wann arbeitet Felix?', ['am Vormittag', 'am Nachmittag', 'am Abend'], 1, 'Hallo Marie, Felix hier. Morgen arbeite ich nicht am Vormittag, sondern von vierzehn bis achtzehn Uhr. Am Abend bin ich frei. Wollen wir uns danach gegen halb sieben vor dem Kino treffen?'],
    ['Wo ist die Reservierung?', ['im Café', 'im Restaurant', 'im Biergarten'], 0, 'Hallo Frau Neumann, wir haben Ihren Tisch heute im Café reserviert. Das Restaurant ist wegen einer Feier geschlossen, und im Biergarten ist es zu kalt. Ihr Tisch am Fenster ist ab siebzehn Uhr frei.'],
    ['Was bringt Oskar mit?', ['Brot', 'Käse', 'Obst'], 2, 'Hallo Lina, Oskar hier. Für unser Picknick hast du schon Brot gekauft und Paul bringt Käse. Ich nehme Obst mit, wahrscheinlich Äpfel und Trauben. Getränke kaufen wir gemeinsam am See.'],
    ['Warum fehlt Nina?', ['Sie hat Urlaub.', 'Sie ist krank.', 'Sie besucht einen Kurs.'], 1, 'Guten Morgen, hier ist Nina. Ich habe keinen Urlaub und mein Kurs beginnt erst nächste Woche. Leider bin ich erkältet und bleibe heute zu Hause. Die wichtigen Unterlagen schicke ich per E-Mail.'],
    ['Welche Tür ist offen?', ['Tür A', 'Tür B', 'Tür C'], 0, 'Hallo Herr Blum. Bitte benutzen Sie heute Tür A am Haupteingang. Tür B ist wegen der Baustelle geschlossen, und Tür C kann nur das Personal öffnen. Die Rezeption wartet im Erdgeschoss.'],
  ],
  { textA: 'Hallo Luis,\nder Fußballkurs beginnt nächste Woche. Wir trainieren montags und donnerstags von 18 bis 19:30 Uhr auf dem Sportplatz Nord. Am ersten Tag sollen alle schon um 17:45 Uhr da sein. Bring bitte Sportschuhe und eine Flasche Wasser mit.\nViele Grüße\nMarco', textB: 'Liebe Gäste,\nunser Gartenfest findet am Sonntag ab 14 Uhr statt. Kuchen und Kaffee gibt es im Hof. Für Kinder beginnt um 15 Uhr ein kleines Theater. Bei Regen feiern wir im Gemeindehaus. Bitte kommen Sie ohne Auto, denn es gibt keine Parkplätze.\nIhr Kulturverein', questions: [{ label: 'Text A', text: 'Der Kurs findet zweimal pro Woche statt.', answer: 0 }, { label: 'Text A', text: 'Am ersten Tag beginnt das Training um 17:45 Uhr.', answer: 1 }, { label: 'Text B', text: 'Das Gartenfest beginnt am Nachmittag.', answer: 0 }, { label: 'Text B', text: 'Bei Regen fällt das Fest aus.', answer: 1 }, { label: 'Text B', text: 'Die Gäste sollen nicht mit dem Auto kommen.', answer: 0 }] },
  [
    ['Sie möchten am Wochenende einen Computer reparieren lassen.', 'PC-Hilfe Direkt: Reparatur von Computern und Laptops, auch samstags von 10 bis 16 Uhr. Diagnose kostenlos.', 'Elektromarkt Groß: Neue Computer und Telefone. Reparaturannahme nur Montag bis Freitag.', 0, 'computerhilfe'],
    ['Sie suchen eine Wohnung, in der ein Hund erlaubt ist.', 'City-Apartment: Ein Zimmer im Zentrum. Haustiere sind im ganzen Haus nicht erlaubt.', 'Wohnung am Park: Zwei Zimmer, Balkon, Haustiere willkommen. Frei ab November, Besichtigung am Samstag.', 1, 'wohnungmithund'],
    ['Sie brauchen morgens ein Taxi für sechs Personen.', 'Taxi Klein: Normale Wagen für höchstens vier Fahrgäste. Nachtfahrten nach Reservierung.', 'Großraumtaxi Stern: Platz für bis zu acht Personen. Fahrten rund um die Uhr, Bestellung per App.', 1, 'grosstaxi'],
    ['Sie möchten heute Karten für ein Theaterstück kaufen.', 'Theaterkasse online: Tickets für alle Vorstellungen sofort buchen und digital erhalten. Zahlung mit Karte.', 'Musikladen Ton: Konzertkarten und CDs. Keine Karten für Theater oder Kino.', 0, 'theaterkarten'],
    ['Sie suchen einen Gitarrenkurs für Anfänger am Abend.', 'Gitarrenladen West: Verkauf und Reparatur von Instrumenten. Keine Unterrichtsangebote.', 'Musikschule Klang: Gitarre ohne Vorkenntnisse mittwochs um 19 Uhr. Instrumente können geliehen werden.', 1, 'gitarrenkurs'],
  ],
  [['Im Bus', 'EINSTIEG VORN\nFAHRKARTE BEREITHALTEN.', 'Man soll vorne einsteigen.', 0], ['Am Strand', 'HUNDE VON MAI BIS SEPTEMBER NICHT ERLAUBT.', 'Im Juli dürfen Hunde hier sein.', 1], ['Im Hotelzimmer', 'HANDTÜCHER FÜR DEN WECHSEL AUF DEN BODEN LEGEN.', 'Handtücher auf dem Boden werden gewechselt.', 0], ['Vor dem Laden', 'HEUTE INVENTUR\nAB 15 UHR GESCHLOSSEN.', 'Der Laden ist um 16 Uhr geöffnet.', 1], ['In der Schule', 'ELTERNABEND AM 8. MAI UM 19 UHR IN RAUM 12.', 'Der Elternabend ist in Raum 12.', 0]],
  { scenario: 'Ihr Freund Miguel Santos ist 41 Jahre alt und kommt aus Portugal. Er wohnt in Bremen, Hafenweg 27, und arbeitet als Busfahrer. Ab dem 2. März möchte er einen Computerkurs am Samstag besuchen. Miguel hat keinen eigenen Laptop. Seine Telefonnummer ist 0175 662 18 93. Er bezahlt per Rechnung.', title: 'DIGITALHAUS BREMEN · Kursanmeldung', example: 'Familienname, Vorname: Santos, Miguel', template: 'Herkunftsland: Portugal\nAlter: {{1}}\nStraße, Hausnummer: Hafenweg 27\nWohnort: {{2}}\nTelefon: 0175 662 18 93\nBeruf: {{3}}\nKursbeginn: {{4}}\nEigener Laptop: {{5}}\nZahlungsweise: Rechnung', blanks: [{ answers: ['41', '41 Jahre'], maxWords: 2 }, { answers: ['Bremen'] }, { answers: ['Busfahrer'] }, { answers: ['2. März', '02. März', '2 Maerz'], maxWords: 2 }, { answers: ['nein', 'kein Laptop', 'keinen Laptop'], maxWords: 2 }] },
  { label: 'Nachricht an Ihren Kollegen', stimulus: 'Sie können morgen nicht zur Teamsitzung kommen. Ihr Kollege Herr Roth leitet die Sitzung.', bullets: ['Nennen Sie den Grund.', 'Schicken Sie die Unterlagen per E-Mail.', 'Fragen Sie nach einem neuen Termin.'] },
  ['VERKEHR\nBus · Bahnhof · Fahrkarte · Fahrrad · Auto · Weg', 'FAMILIE\nEltern · Kinder · Wochenende · Geburtstag · Besuch · Ferien'],
  [['Bleistift', 'Buch', 'Wasser', 'Tasche', 'Uhr', 'Fenster'], ['Regenschirm', 'Fahrradhelm', 'Handy', 'Fahrkarte', 'Tür', 'Koffer']],
);

const SET7 = content(
  7,
  ['Was braucht die Frau?', ['Briefmarken', 'einen Umschlag', 'einen Stift'], 1, 'post', 'Brauchen Sie Briefmarken für Ihren Brief?', 'Nein, die habe ich schon. Mir fehlt nur noch ein großer Umschlag.', 'Einen Stift können Sie hier auch benutzen.'],
  [
    ['Was kostet das Frühstück?', ['6 Euro', '9 Euro', '12 Euro'], 0, 'fruehstueck', 'Ist das Frühstück im Zimmerpreis? Sonst kostet es neun Euro, oder?', 'Heute zahlen Hotelgäste nur sechs Euro. Zwölf Euro kostet das große Buffet für Besucher.', 'Dann frühstücke ich morgen hier.'],
    ['Wann kommt der Handwerker?', ['13 Uhr', '14 Uhr', '15 Uhr'], 1, 'handwerkerzeit', 'Kommt der Handwerker heute schon um dreizehn Uhr?', 'Nein, er ist um vierzehn Uhr bei Ihnen. Um fünfzehn Uhr muss er beim nächsten Kunden sein.', 'Gut, dann bin ich rechtzeitig zu Hause.'],
    ['Was bestellt der Mann?', ['Kaffee', 'Tee', 'Kakao'], 2, 'heissgetraenk', 'Möchten Sie Kaffee oder schwarzen Tee?', 'Beides trinke ich abends nicht. Haben Sie heißen Kakao?', 'Ja, natürlich, mit Milch und wenig Zucker. Der Kakao ist gleich fertig.'],
    ['Wie viele Nächte bleibt das Paar?', ['zwei', 'vier', 'sechs'], 0, 'hotelnaechte', 'Sie möchten also vier Nächte bleiben?', 'Nein, nur zwei Nächte, von Freitag bis Sonntag. Sechs Nächte wären schön, aber wir müssen Montag arbeiten.', 'Dann reserviere ich das Doppelzimmer bis Sonntag.'],
    ['Wo gibt es die Tickets?', ['an der Kasse', 'im Reisebüro', 'im Internet'], 1, 'ticketverkauf', 'Bekommen wir die Bustickets an der Kasse im Bahnhof?', 'Nein, die verkauft nur Zugkarten. Die Bustickets gibt es im Reisebüro nebenan; im Internet erst ab nächstem Monat.', 'Dann gehen wir ins Reisebüro.'],
    ['Wie fährt der Mann zum Markt?', ['mit der Straßenbahn', 'mit dem Bus', 'zu Fuß'], 2, 'marktweg', 'Fährst du mit der Straßenbahn oder dem Bus zum Markt?', 'Beide halten heute nicht dort. Der Markt ist nur zehn Minuten entfernt, deshalb gehe ich zu Fuß.', 'Dann komme ich mit.'],
  ],
  [
    ['Die Apotheke ist heute Nacht geöffnet.', 1, 'Liebe Kundinnen und Kunden. Unsere Apotheke schließt heute um zwanzig Uhr und hat keinen Nachtdienst. Die nächste geöffnete Apotheke finden Sie am Krankenhaus. Ihre Adresse steht an unserer Tür.'],
    ['Der Kurs beginnt in Raum 15.', 0, 'Guten Morgen im Sprachzentrum. Der Integrationskurs beginnt heute in Raum fünfzehn im zweiten Stock. Die Prüfungsteilnehmer gehen bitte in Raum elf. Der Aufzug ist wieder in Betrieb.'],
    ['Der Markt findet draußen statt.', 1, 'Information zum Wochenmarkt. Wegen des starken Regens stehen alle Stände heute in der großen Markthalle. Der Platz draußen bleibt leer. Die Öffnungszeit von acht bis dreizehn Uhr bleibt gleich.'],
    ['Der Bus wartet fünf Minuten.', 0, 'Achtung an der Haltestelle Rathaus. Der Bus nach Neustadt wartet wegen des Anschlusszuges noch fünf Minuten. Fahrgäste bleiben bitte im Bus. Die nächste Abfahrt ist erst in einer Stunde.'],
  ],
  [
    ['Wann beginnt der Besuch?', ['um 10 Uhr', 'um 11 Uhr', 'um 12 Uhr'], 1, 'Hallo Oma, wir kommen morgen gegen elf Uhr zu dir. Um zehn Uhr holen wir noch den Kuchen ab, und um zwölf Uhr möchten wir gemeinsam essen. Die Kinder freuen sich schon sehr auf dich.'],
    ['Wo steht das Auto?', ['vor dem Haus', 'in der Garage', 'am Supermarkt'], 0, 'Hallo Anna, mein Auto steht vor deinem Haus. Die Garage war geschlossen und am Supermarkt gab es keinen freien Platz. Ich warte im Wagen und trage eine blaue Jacke.'],
    ['Was soll Kai mitbringen?', ['Teller', 'Gläser', 'Servietten'], 2, 'Hallo Kai, für das Fest habe ich Teller und Gläser schon ausgeliehen. Bitte bring noch weiße Servietten mit. Wir brauchen ungefähr dreißig Stück. Komm am besten um sechzehn Uhr zum Aufbau.'],
    ['Warum sagt Paula ab?', ['Sie muss lernen.', 'Sie arbeitet länger.', 'Sie bekommt Besuch.'], 1, 'Hallo Leon, Paula hier. Ich kann heute nicht zum Essen kommen. Für die Prüfung muss ich erst morgen lernen, und mein Besuch kommt am Wochenende. Aber heute muss ich unerwartet bis zwanzig Uhr arbeiten.'],
    ['Welche Buslinie fährt richtig?', ['Linie 5', 'Linie 15', 'Linie 50'], 0, 'Guten Tag, Frau Ali. Zum Krankenhaus nehmen Sie bitte die Buslinie fünf. Die Linie fünfzehn fährt zum Stadion, und die Linie fünfzig endet am Bahnhof. Steigen Sie am Stadtpark aus.'],
  ],
  { textA: 'Hallo Cem,\nich habe zwei Karten für das Stadtmuseum am Sonntag. Die Führung beginnt um 10:30 Uhr. Wir sollten uns um 10 Uhr am Eingang treffen. Danach können wir im Museumscafé frühstücken. Bitte bring deinen Studentenausweis mit, dann ist der Eintritt günstiger.\nViele Grüße\nLukas', textB: 'Liebe Kundinnen und Kunden,\nunsere Filiale in der Bahnhofstraße zieht um. Ab Montag finden Sie uns am Marktplatz 6, neben der Post. Am Samstag bleibt das Geschäft wegen des Umzugs geschlossen. Online-Bestellungen liefern wir weiterhin ohne Pause.\nIhr Buchladen-Team', questions: [{ label: 'Text A', text: 'Die Museumsführung ist am Sonntag.', answer: 0 }, { label: 'Text A', text: 'Cem soll erst um 10:30 Uhr am Eingang sein.', answer: 1 }, { label: 'Text B', text: 'Das Geschäft hat ab Montag eine neue Adresse.', answer: 0 }, { label: 'Text B', text: 'Die Filiale ist am Samstag geöffnet.', answer: 1 }, { label: 'Text B', text: 'Online-Bestellungen sind weiter möglich.', answer: 0 }] },
  [
    ['Sie suchen eine günstige Reinigung für einen Wintermantel.', 'SauberFix: Reinigung von Mänteln und Jacken ab 14 Euro. Abgabe ohne Termin, fertig in drei Tagen.', 'Waschsalon Schnell: Waschmaschinen für Kleidung und Bettwäsche. Keine chemische Reinigung.', 0, 'reinigung'],
    ['Sie möchten am Sonntag ein Museum mit Kindern besuchen.', 'Kunstarchiv: Lesesaal für Studierende, nur montags bis freitags nach Anmeldung.', 'Technikmuseum: Experimente für Familien, sonntags von 10 bis 17 Uhr. Kinder unter zwölf Jahren frei.', 1, 'familienmuseum'],
    ['Sie brauchen einen Babysitter am Freitagabend.', 'Kinderzeit: Erfahrene Betreuung bei Ihnen zu Hause, auch abends und am Wochenende. Online reservieren.', 'Familiencafé: Spielraum und Kuchen täglich bis 17 Uhr. Kinder nur gemeinsam mit ihren Eltern.', 0, 'babysitter'],
    ['Sie möchten einen Schrank transportieren lassen.', 'Schreinerei Holz: Neue Schränke nach Maß. Keine Abholung fremder Möbel.', 'Möbeltaxi: Kleine Umzüge und Transporte in der Stadt. Zwei Helfer und großer Wagen buchbar.', 1, 'moebeltransport'],
    ['Sie suchen ein vegetarisches Abendessen nach 21 Uhr.', 'Mittagshaus: Vegetarisches Tagesmenü von 11 bis 15 Uhr. Abends geschlossen.', 'Nachtküche Grün: Vegetarische Bowls und Suppen bis Mitternacht, täglich geöffnet.', 1, 'spaetessen'],
  ],
  [['An der Tür', 'KLINGEL DEFEKT\nBITTE KLOPFEN.', 'Man soll an die Tür klopfen.', 0], ['Im Zug', 'FAHRRÄDER NUR IM LETZTEN WAGEN.', 'Fahrräder dürfen in jedem Wagen stehen.', 1], ['Im Café', 'SELBSTBEDIENUNG\nBESTELLUNG AN DER THEKE.', 'Ein Kellner kommt an den Tisch.', 1], ['Am Parkplatz', 'KUNDENPARKPLATZ\nMAXIMAL 90 MINUTEN.', 'Kunden dürfen höchstens anderthalb Stunden parken.', 0], ['Im Büro', 'BESPRECHUNG BIS 14 UHR\nBITTE NICHT STÖREN.', 'Vor 14 Uhr soll man nicht hineingehen.', 0]],
  { scenario: 'Ihre Freundin Mei Lin ist 32 Jahre alt und kommt aus China. Sie wohnt in Nürnberg, Adlergasse 11, und arbeitet als Ingenieurin. Ab dem 15. April möchte sie einen Schwimmkurs am Dienstag besuchen. Mei kann noch nicht schwimmen. Ihre Telefonnummer ist 0157 440 82 16. Sie bezahlt per Lastschrift.', title: 'STADTBAD NÜRNBERG · Kursanmeldung', example: 'Familienname, Vorname: Lin, Mei', template: 'Herkunftsland: China\nAlter: {{1}}\nStraße, Hausnummer: Adlergasse 11\nWohnort: {{2}}\nTelefon: 0157 440 82 16\nBeruf: {{3}}\nKursbeginn: {{4}}\nSchwimmerfahrung: {{5}}\nZahlungsweise: Lastschrift', blanks: [{ answers: ['32', '32 Jahre'], maxWords: 2 }, { answers: ['Nürnberg', 'Nuernberg'] }, { answers: ['Ingenieurin'] }, { answers: ['15. April', '15 April'], maxWords: 2 }, { answers: ['keine', 'kann nicht schwimmen', 'Anfängerin'], maxWords: 3 }] },
  { label: 'E-Mail an die Musikschule', stimulus: 'Sie interessieren sich für einen Gitarrenkurs. Auf der Internetseite fehlen einige Informationen.', bullets: ['Fragen Sie nach dem Kursbeginn.', 'Fragen Sie nach dem Preis.', 'Sagen Sie, wann Sie Zeit haben.'] },
  ['GESUNDHEIT\nArzt · Sport · Apotheke · Schlaf · Essen · Termin', 'SCHULE\nKurs · Lehrer · Hausaufgaben · Sprache · Prüfung · Pause'],
  [['Medikament', 'Wasser', 'Stuhl', 'Fenster', 'Handtuch', 'Telefon'], ['Heft', 'Bleistift', 'Buch', 'Tasche', 'Computer', 'Tür']],
);

const SET8 = content(
  8,
  ['Wie kommt die Frau nach Hause?', ['mit dem Taxi', 'mit dem Bus', 'zu Fuß'], 1, 'heimweg', 'Nimmst du nach dem Konzert ein Taxi? Vor dem Saal stehen bestimmt noch einige Wagen.', 'Nein, das ist zu teuer. Zu Fuß ist es nachts zu weit. Der letzte Bus fährt um halb zwölf direkt bis zu meiner Straße.', 'Gut, dann fahren wir beide mit dem Bus. Ich steige zwei Haltestellen vor dir aus und begleite dich noch bis zur Tür.'],
  [
    ['Was kostet der Schirm?', ['10 Euro', '16 Euro', '20 Euro'], 0, 'schirmpreis', 'Wie viel kostet der rote Regenschirm? Zwanzig Euro?', 'Heute nur zehn Euro. Der blaue kostet sechzehn Euro und der große schwarze zwanzig.', 'Dann nehme ich den roten.'],
    ['Wann ist die Pause?', ['10:15 Uhr', '10:30 Uhr', '10:45 Uhr'], 1, 'pausenzeit', 'Machen wir die Pause schon um Viertel nach zehn?', 'Nein, heute um halb elf. Um Viertel vor elf beginnt der zweite Teil.', 'Dann hole ich vorher noch einen Kaffee.'],
    ['Was möchte das Kind?', ['ein Eis', 'einen Kuchen', 'ein Brötchen'], 2, 'snack', 'Möchtest du ein Eis oder ein Stück Kuchen?', 'Nein, ich habe keinen Hunger auf etwas Süßes. Kann ich ein Brötchen mit Käse bekommen?', 'Ja, das ist gleich fertig.'],
    ['Wie viele Fotos druckt der Mann?', ['zehn', 'zwanzig', 'dreißig'], 0, 'fotos', 'Sie können zehn, zwanzig oder dreißig Fotos sofort drucken.', 'Dann nehme ich zehn. Die anderen Bilder brauche ich erst nächste Woche.', 'Gut, die zehn Fotos sind in fünf Minuten fertig.'],
    ['Wo ist die Toilette?', ['neben dem Café', 'hinter der Kasse', 'vor dem Ausgang'], 1, 'toilette', 'Entschuldigung, ist die Toilette neben dem Café?', 'Nein, gehen Sie hinter die Kasse. Vor dem Ausgang finden Sie nur die Schließfächer.', 'Vielen Dank, ich sehe das Schild schon.'],
    ['Wie fährt Alex zum Sport?', ['mit dem Bus', 'mit dem Auto', 'mit der Straßenbahn'], 2, 'sportweg', 'Fährst du mit dem Bus oder mit dem Auto zum Sport?', 'Mein Auto ist in der Werkstatt, und der Bus kommt zu spät. Ich nehme die Straßenbahn.', 'Die hält direkt vor der Halle.'],
  ],
  [
    ['Die Führung beginnt um 14 Uhr.', 1, 'Liebe Museumsbesucher. Die Führung beginnt heute nicht um vierzehn Uhr, sondern erst um fünfzehn Uhr. Treffpunkt ist weiterhin an der Information. Sie dauert ungefähr sechzig Minuten.'],
    ['Im Café kann man mit Karte bezahlen.', 0, 'Guten Tag, liebe Gäste. Unser Kartenlesegerät funktioniert wieder. Sie können im Café ab sofort bar oder mit Karte bezahlen. Bestellungen nehmen wir bis zwanzig Uhr dreißig an.'],
    ['Die Straße ist für Fahrräder offen.', 1, 'Achtung im Stadtzentrum. Die Gartenstraße ist heute wegen Bauarbeiten für Autos und Fahrräder geschlossen. Fußgänger benutzen bitte den Weg durch den Park. Ab morgen ist die Straße wieder frei.'],
    ['Der Koffer liegt am Informationsschalter.', 0, 'Information am Flughafen. Ein schwarzer Koffer wurde am Eingang gefunden und liegt jetzt am Informationsschalter in Halle zwei. Der Besitzer bringt bitte seinen Ausweis und den Gepäckschein mit.'],
  ],
  [
    ['Wann fährt Emma ab?', ['am Morgen', 'am Mittag', 'am Abend'], 1, 'Hallo Mama, Emma hier. Mein Zug fährt morgen um zwölf Uhr zwanzig, also am Mittag. Am Morgen packe ich noch meinen Koffer, und am Abend bin ich schon bei Anna in München.'],
    ['Wo ist der Schlüssel?', ['in der Küche', 'im Briefkasten', 'bei der Nachbarin'], 0, 'Hallo Paul, ich bin schon unterwegs. Der Schlüssel liegt in der Küche neben der Kaffeemaschine. Im Briefkasten ist nur Post, und die Nachbarin hat diesmal keinen zweiten Schlüssel.'],
    ['Was bringt Hanna?', ['Saft', 'Wasser', 'Kaffee'], 2, 'Hallo Erik, für das Frühstück hast du Saft gekauft und Wasser ist im Kühlschrank. Ich bringe Kaffee und Milch mit. Kannst du bitte noch frische Brötchen holen?'],
    ['Warum kann Herr Klein nicht kommen?', ['Er hat einen Termin.', 'Sein Zug fällt aus.', 'Sein Sohn ist krank.'], 1, 'Guten Tag, hier ist Herr Klein. Mein anderer Termin ist schon vorbei und meinem Sohn geht es gut. Leider fällt mein Zug heute aus. Ich kann deshalb nicht zur Besprechung kommen.'],
    ['Welche Zimmernummer hat Frau Roth?', ['102', '120', '201'], 0, 'Hallo Frau Roth, Ihr Hotelzimmer ist Nummer einhundertzwei im ersten Stock. Zimmer einhundertzwanzig ist noch nicht fertig, und Zimmer zweihunderteins gehört einer anderen Gruppe.'],
  ],
  { textA: 'Hallo Sara,\nam Mittwoch gehe ich nach der Arbeit ins neue Schwimmbad. Es öffnet bis 21 Uhr. Treffen wir uns um 18:30 Uhr vor dem Eingang? Ich habe eine zweite Eintrittskarte. Bring bitte ein Handtuch mit; eine Badekappe brauchst du dort nicht.\nLiebe Grüße\nJulia', textB: 'Liebe Hausbewohner,\nam Freitag reinigen wir die Tiefgarage. Zwischen 7 und 15 Uhr dürfen dort keine Autos stehen. Bitte parken Sie in dieser Zeit auf dem Platz hinter dem Supermarkt. Ab 15:30 Uhr ist die Garage wieder geöffnet.\nIhre Hausverwaltung', questions: [{ label: 'Text A', text: 'Julia möchte am Mittwoch schwimmen gehen.', answer: 0 }, { label: 'Text A', text: 'Sara muss eine Eintrittskarte kaufen.', answer: 1 }, { label: 'Text B', text: 'Am Freitag wird die Tiefgarage gereinigt.', answer: 0 }, { label: 'Text B', text: 'Autos können bis 15 Uhr in der Garage bleiben.', answer: 1 }, { label: 'Text B', text: 'Nach 15:30 Uhr ist die Garage wieder offen.', answer: 0 }] },
  [
    ['Sie möchten am Sonntag ein Fahrrad mieten.', 'Radverleih Fluss: Fahrräder und Helme täglich von 8 bis 19 Uhr. Reservierung am Wochenende empfohlen.', 'Sportkauf Aktiv: Fahrräder kaufen und reparieren lassen. Sonntags bleibt das Geschäft geschlossen.', 0, 'radverleih'],
    ['Sie suchen einen Kochkurs ohne Fleisch.', 'Grillkurs Feuer: Fleisch und Fisch richtig grillen. Kein vegetarisches Menü.', 'Kochatelier Grün: Vegetarische Küche für Anfänger, donnerstags um 18 Uhr. Zutaten sind im Preis enthalten.', 1, 'kochkurs'],
    ['Sie brauchen heute einen Drucker für wenige Stunden.', 'Technikmiete City: Drucker, Beamer und Laptops stundenweise mieten. Abholung noch am selben Tag.', 'Büroshop Papier: Neue Drucker und Zubehör kaufen. Keine Vermietung möglich.', 0, 'druckermiete'],
    ['Sie möchten Ihren Geburtstag draußen mit 20 Gästen feiern.', 'Zimmer Privat: Ruhiges Gästezimmer für eine Person. Besuche und Feiern nicht erlaubt.', 'Gartenlokal See: Terrasse für Feiern bis 30 Personen. Essen, Getränke und Regenschutz buchbar.', 1, 'gartenfeier'],
    ['Sie suchen nachts eine geöffnete Tankstelle.', 'Autohof Süd: Werkstatt Montag bis Freitag von 8 bis 17 Uhr. Keine Tankmöglichkeit.', 'Tankpunkt Ost: Kraftstoff und kleiner Laden rund um die Uhr, jeden Tag geöffnet.', 1, 'tankstelle'],
  ],
  [['In der Arztpraxis', 'BITTE HANDY AUSSCHALTEN.', 'Das Telefon soll aus sein.', 0], ['Am Fenster', 'FRISCH GESTRICHEN\nBITTE NICHT ÖFFNEN.', 'Man darf das Fenster öffnen.', 1], ['Im Restaurant', 'KÜCHE BIS 21 UHR\nGETRÄNKE BIS 23 UHR.', 'Nach 21 Uhr kann man noch Getränke bestellen.', 0], ['Auf dem Markt', 'HEUTE NUR BIS 12 UHR GEÖFFNET.', 'Der Markt schließt heute mittags.', 0], ['An der Garage', 'EINFAHRT FREIHALTEN\nABSCHLEPPGEFAHR.', 'Man darf vor der Einfahrt parken.', 1]],
  { scenario: 'Ihr Freund Noah Wilson ist 24 Jahre alt und kommt aus Australien. Er wohnt in München, Isarweg 33, und arbeitet als Student. Ab dem 21. Juni möchte er einen Kochkurs am Freitag besuchen. Noah isst kein Fleisch. Seine Telefonnummer ist 0160 735 94 28. Er bezahlt online.', title: 'KOCHATELIER MÜNCHEN · Anmeldung', example: 'Familienname, Vorname: Wilson, Noah', template: 'Herkunftsland: Australien\nAlter: {{1}}\nStraße, Hausnummer: Isarweg 33\nWohnort: {{2}}\nTelefon: 0160 735 94 28\nBeruf: {{3}}\nKursbeginn: {{4}}\nErnährung: {{5}}\nZahlungsweise: online', blanks: [{ answers: ['24', '24 Jahre'], maxWords: 2 }, { answers: ['München', 'Muenchen'] }, { answers: ['Student'] }, { answers: ['21. Juni', '21 Juni'], maxWords: 2 }, { answers: ['kein Fleisch', 'vegetarisch'], maxWords: 2 }] },
  { label: 'Nachricht an Ihren Vermieter', stimulus: 'In Ihrer Küche funktioniert der Kühlschrank nicht. Ihr Vermieter Herr König soll helfen.', bullets: ['Beschreiben Sie das Problem.', 'Sagen Sie, wann Sie zu Hause sind.', 'Bitten Sie um einen schnellen Termin.'] },
  ['REISEN\nZiel · Hotel · Zug · Urlaub · Koffer · Wetter', 'STADT\nMarkt · Park · Kino · Bus · Geschäft · Restaurant'],
  [['Teller', 'Messer', 'Glas', 'Wasser', 'Zucker', 'Stuhl'], ['Stadtplan', 'Fahrkarte', 'Regenschirm', 'Kamera', 'Taxi', 'Tür']],
);

export const GOETHE_A1_SETS_3_TO_8: Record<number, GoetheA1SetContent> = {
  3: SET3, 4: SET4, 5: SET5, 6: SET6, 7: SET7, 8: SET8,
};

export function getGoetheA1SetContent(number: number) {
  const value = GOETHE_A1_SETS_3_TO_8[number];
  if (!value) throw new Error(`Unknown Goethe A1 set: ${number}`);
  return value;
}
