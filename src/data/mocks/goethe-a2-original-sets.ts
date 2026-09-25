import { audioChoice, choice, createGoetheA2Set } from './goethe-a2-content-factory';
import type { GoetheA2Set, GoetheA2Turn } from './goethe-a2-golden-types';

type Profile = {
  set: number;
  cities: [string, string];
  names: [string, string, string, string];
  project: string;
  projectPlace: string;
  projectActivity: string;
  projectObject: string;
  projectPlan: string;
  directory: string;
  directoryLevels: [string, string, string, string];
  actionDay: string;
  actionPlace: string;
  morningTask: string;
  afternoonTask: string;
  bring: string;
  route: string;
  adTheme: string;
  itinerary: [string, string, string, string, string, string, string, string, string];
  interviewTopic: string;
  interviewFacts: [string, string, string, string, string, string];
  writingFriend: string;
  writingOffice: string;
  speakingA: string;
  speakingB: string;
  planning: string;
};

const profiles: Profile[] = [
  { set: 2, cities: ['Münster', 'Osnabrück'], names: ['Aylin', 'Jonas', 'Nora', 'Herrn Peters'], project: 'Abendmarkt am Kanal', projectPlace: 'alten Speicher am Hafen', projectActivity: 'regionale Lebensmittel direkt bei kleinen Höfen einkaufen', projectObject: 'wiederverwendbare Markttaschen', projectPlan: 'eine Tauschstelle für leere Marmeladengläser', directory: 'GARTENHAUS SONNENFELD', directoryLevels: ['Saatgut-Ausgabe · Anmeldung · Schlüsselkarten', 'Küche · Einkochen · ruhiger Beratungsraum', 'Werkzeuglager · Wasseranschluss · Schubkarren', 'Gewächshaus · Kinderbeete · offene Pflanzsprechstunde'], actionDay: 'Gartentag „Bunte Beete“', actionPlace: 'Vereinshaus am Wienburgpark', morningTask: 'Hochbeete mit neuer Erde füllen', afternoonTask: 'Schilder für Kräuter und Gemüse malen', bring: 'Gartenhandschuhe und einen eigenen Becher', route: 'mit Bus 17 bis „Wienburgpark“ und dann durch das grüne Tor', adTheme: 'Markt und Garten', itinerary: ['Bäckerei', 'Fundbüro', 'Wochenmarkt', 'Stadtpark', 'Fahrradladen', 'Gärtnerei', 'Café', 'Post', 'Kanalbrücke'], interviewTopic: 'Lebensmittel vom Abendmarkt', interviewFacts: ['der Markt ist jeden Donnerstag geöffnet', 'zwölf Höfe liefern ihre Waren', 'die Stände verkaufen auch kleine Portionen', 'Kartenzahlung ist an allen Ständen möglich', 'das Team verteilt kostenlose Kochideen', 'im Winter zieht der Markt in die Markthalle'], writingFriend: 'Nora', writingOffice: 'das Fundbüro', speakingA: 'Wie kaufen Sie Lebensmittel ein?', speakingB: 'Was machen Sie gern im Garten?', planning: 'einen gemeinsamen Besuch im Gemeinschaftsgarten' },
  { set: 3, cities: ['Freiburg', 'Offenburg'], names: ['Minh', 'Clara', 'Emre', 'Frau Schubert'], project: 'Lernatelier am Abend', projectPlace: 'Volkshochschule neben dem Rathaus', projectActivity: 'kurze praktische Kurse nach der Arbeit besuchen', projectObject: 'Leih-Tablets für digitale Übungen', projectPlan: 'Samstagskurse für Eltern und Jugendliche', directory: 'VHS FREIBURG · HAUS B', directoryLevels: ['Kursbüro · Beratung · Bezahlung', 'Sprachen · Lerncafé · Mediathek', 'Computerraum · Drucken · Leih-Tablets', 'Kreativräume · Keramik · Fotowerkstatt'], actionDay: 'Kennenlerntag „Neues lernen“', actionPlace: 'Bildungshaus am Rotteckring', morningTask: 'Kursräume vorbereiten und Namensschilder sortieren', afternoonTask: 'Besucherinnen und Besucher zu Schnupperkursen begleiten', bring: 'bequeme Schuhe und einen Stift', route: 'mit Straßenbahn 5 bis „Stadttheater“ und über den Innenhof', adTheme: 'Kurse und Mobilität', itinerary: ['VHS', 'Leihrad-Station', 'Buchladen', 'Rathaus', 'Bäckerei', 'Wohnungsbüro', 'Park', 'Copyshop', 'Café'], interviewTopic: 'Leihräder für den Alltag', interviewFacts: ['die Stadt bietet die Räder seit zwei Jahren an', 'es gibt 28 Stationen', 'die erste halbe Stunde kostet wenig', 'ein Helm gehört nicht automatisch zur Ausleihe', 'Schäden meldet man über die App', 'am Stadtrand sind neue Stationen geplant'], writingFriend: 'Clara', writingOffice: 'das VHS-Kursbüro', speakingA: 'Wie lernen Sie am besten?', speakingB: 'Wie bewegen Sie sich in Ihrer Stadt?', planning: 'einen Termin für einen gemeinsamen Schnupperkurs' },
  { set: 4, cities: ['Kassel', 'Göttingen'], names: ['Leila', 'Tom', 'Maren', 'Herrn Özdemir'], project: 'Gesundheitsmobil Nord', projectPlace: 'Bus auf verschiedenen Stadtplätzen', projectActivity: 'ohne langen Weg eine erste Beratung bekommen', projectObject: 'Informationskarten in sechs Sprachen', projectPlan: 'monatliche Stopps in zwei weiteren Stadtteilen', directory: 'STADTMUSEUM KASSEL · SERVICEPLAN', directoryLevels: ['Kasse · Garderobe · Audiogeräte', 'Stadtgeschichte · ruhige Sitzplätze · Aufzug', 'Sonderausstellung · Medienraum · Workshop', 'Dachterrasse · Museumscafé · Aussicht'], actionDay: 'Museumstag „Türen auf“', actionPlace: 'Stadtmuseum am Ständeplatz', morningTask: 'Wegweiser aufstellen und Audiogeräte prüfen', afternoonTask: 'Familien bei einer Suchaktion durch die Ausstellung begleiten', bring: 'ein neutrales T-Shirt und etwas zu trinken', route: 'mit Tram 1 bis „Ständeplatz“ und zum Seiteneingang an der Treppe', adTheme: 'Gesundheit und Kultur', itinerary: ['Apotheke', 'Gesundheitsmobil', 'Museum', 'Bäckerei', 'Park', 'Rathaus', 'Café', 'Bahnhof', 'Buchhandlung'], interviewTopic: 'Ehrenamt im Stadtmuseum', interviewFacts: ['das Team startete mit acht Personen', 'alle machen zuerst eine kurze Schulung', 'die meisten Dienste finden sonntags statt', 'der Verein zahlt die Fahrtkosten zurück', 'die Freiwilligen wählen ihre Aufgaben monatlich', 'weitere Sprachkenntnisse sind besonders willkommen'], writingFriend: 'Maren', writingOffice: 'die Freiwilligenkoordination', speakingA: 'Was tun Sie für Ihre Gesundheit?', speakingB: 'Welche Museen besuchen Sie gern?', planning: 'zwei freiwillige Dienste miteinander zu tauschen' },
  { set: 5, cities: ['Mainz', 'Wiesbaden'], names: ['Ravi', 'Sophie', 'Daniel', 'Frau König'], project: 'Paketpunkt im Viertel', projectPlace: 'Kiosk am Frauenlobplatz', projectActivity: 'Sendungen flexibel abholen und zurückgeben', projectObject: 'abschließbare Fächer für große Pakete', projectPlan: 'einen zweiten Abholabend pro Woche', directory: 'MUSIKSCHULE MAINZ · HAUSPLAN', directoryLevels: ['Büro · Anmeldung · Instrumentenausgabe', 'Klavier · Musiktheorie · Übungsräume', 'Blasinstrumente · Schlagzeug · Tonstudio', 'Kinderchor · Elternwartebereich · kleiner Saal'], actionDay: 'Willkommensnachmittag „Musik verbindet“', actionPlace: 'Musikschule in der Schillerstraße', morningTask: 'Stühle stellen und Instrumentenkarten verteilen', afternoonTask: 'kleine Gruppen zu den offenen Proben führen', bring: 'einen Kugelschreiber und, wenn vorhanden, ein kleines Instrument', route: 'mit Bus 62 bis „Schillerplatz“ und durch Eingang B', adTheme: 'Pakete und Musik', itinerary: ['Paketpunkt', 'Musikschule', 'Fähranleger', 'Bäckerei', 'Post', 'Park', 'Café', 'Instrumentenladen', 'Rathaus'], interviewTopic: 'Die Fähre zwischen Mainz und Wiesbaden', interviewFacts: ['die erste Fähre fährt morgens um sechs Uhr', 'Fahrräder fahren ohne Aufpreis mit', 'bei Hochwasser stoppt der Betrieb manchmal', 'Fahrkarten gibt es auch an Bord', 'viele Pendler nutzen Monatskarten', 'im Sommer gibt es eine spätere Rückfahrt'], writingFriend: 'Sophie', writingOffice: 'das Musikschulbüro', speakingA: 'Wie bekommen Sie Pakete?', speakingB: 'Welche Musik hören oder machen Sie?', planning: 'eine kleine Willkommensaktivität für neue Kursteilnehmende' },
  { set: 6, cities: ['Ulm', 'Neu-Ulm'], names: ['Fatima', 'Paul', 'Greta', 'Herrn Maier'], project: 'Werkzeugbibliothek Donau', projectPlace: 'ehemaligen Postraum im Bürgerhaus', projectActivity: 'selten gebrauchte Geräte tageweise ausleihen', projectObject: 'Sicherheitskarten mit einfachen Zeichnungen', projectPlan: 'mobile Ausgaben in Neu-Ulm', directory: 'DONAUBAD · ORIENTIERUNG', directoryLevels: ['Kasse · Umkleiden · Schließfächer', 'Schwimmerbecken · Kursbahn · Erste Hilfe', 'Familienbad · Rutsche · Wickelraum', 'Sauna · Ruheraum · Dachterrasse'], actionDay: 'Trainingstag „Sicher mit Werkzeug“', actionPlace: 'Bürgerhaus am Eselsberg', morningTask: 'Leihgeräte kontrollieren und Nummern aufkleben', afternoonTask: 'kurze Sicherheitsübungen mit neuen Mitgliedern durchführen', bring: 'feste Schuhe und Arbeitshandschuhe', route: 'mit Ersatzbus E2 bis „Bürgerzentrum“ und links am Spielplatz vorbei', adTheme: 'Werkzeug und Schwimmen', itinerary: ['Werkzeugbibliothek', 'Schwimmbad', 'Ersatzbushalt', 'Baumarkt', 'Bäckerei', 'Park', 'Café', 'Bahnhof', 'Apotheke'], interviewTopic: 'Schwimmkurse für Erwachsene', interviewFacts: ['die Kurse finden am frühen Abend statt', 'höchstens acht Personen kommen in eine Gruppe', 'vor dem Kurs gibt es ein Gespräch', 'eine Badekappe ist nicht vorgeschrieben', 'der Eintritt ist im Kurspreis enthalten', 'im Frühjahr sind zusätzliche Kurse geplant'], writingFriend: 'Greta', writingOffice: 'die Werkzeugbibliothek', speakingA: 'Welche Dinge leihen Sie lieber aus?', speakingB: 'Wie halten Sie sich fit?', planning: 'einen gemeinsamen Termin für ein Sicherheitstraining' },
  { set: 7, cities: ['Jena', 'Weimar'], names: ['Marta', 'Samir', 'Kilian', 'Frau Vogel'], project: 'Energiepunkt Jena', projectPlace: 'kleinen Laden am Holzmarkt', projectActivity: 'Stromverbrauch verstehen und einfache Sparideen finden', projectObject: 'Messgeräte für Haushaltsgeräte', projectPlan: 'Beratungen am Samstagvormittag', directory: 'THEATERHAUS JENA · BESUCHERSERVICE', directoryLevels: ['Kasse · Abholung · Garderobe', 'Große Bühne · barrierefreie Plätze · Aufzug', 'Probebühne · Jugendclub · Workshopraum', 'Theatercafé · Publikumsgespräch · Terrasse'], actionDay: 'Theatertag „Hinter der Bühne“', actionPlace: 'Theaterhaus am Schillergässchen', morningTask: 'Programmhefte sortieren und Besucherwege markieren', afternoonTask: 'Gäste in kleinen Gruppen zu Technikräumen begleiten', bring: 'schwarze Kleidung und eine kleine Taschenlampe', route: 'mit Wochenendbus 12 bis „Universität“ und zu Fuß durch die Passage', adTheme: 'Energie und Theater', itinerary: ['Energiepunkt', 'Theater', 'Bushalt', 'Elektroladen', 'Markt', 'Park', 'Café', 'Bibliothek', 'Bahnhof'], interviewTopic: 'Wochenendbusse zwischen Jena und Weimar', interviewFacts: ['die Busse fahren freitags und samstags', 'die letzte Fahrt ist nach Mitternacht', 'normale Verbundtickets gelten auch hier', 'Fahrräder fahren nur bei freiem Platz mit', 'die Haltestellen stehen online', 'nach einem Testjahr bleibt die Linie bestehen'], writingFriend: 'Kilian', writingOffice: 'den Theaterbesucherservice', speakingA: 'Wie sparen Sie zu Hause Energie?', speakingB: 'Was gefällt Ihnen im Theater?', planning: 'einen Theaterbesuch trotz später Busverbindungen' },
  { set: 8, cities: ['Potsdam', 'Brandenburg'], names: ['Elena', 'Noah', 'Mina', 'Herrn Berger'], project: 'Tauschraum Babelsberg', projectPlace: 'Erdgeschoss des alten Rathauses', projectActivity: 'gut erhaltene Dinge kostenlos weitergeben', projectObject: 'farbige Karten für verschiedene Kategorien', projectPlan: 'eine Abholung für große Gegenstände', directory: 'BÜRGERZENTRUM POTSDAM · WEGWEISER', directoryLevels: ['Information · Termine · Dokumentenausgabe', 'Meldeamt · Passfotos · Wartebereich', 'Familienservice · Wohngeld · Beratung', 'Veranstaltungssaal · Sprachcafé · Dachgarten'], actionDay: 'Sportparktag „Alle machen mit“', actionPlace: 'öffentlichen Sportpark am Stern', morningTask: 'Stationen markieren und Bälle kontrollieren', afternoonTask: 'Anfängergruppen bei einfachen Übungen begleiten', bring: 'Sportschuhe und eine gefüllte Trinkflasche', route: 'mit Tram 96 bis „Johannes-Kepler-Platz“ und dem blauen Weg folgen', adTheme: 'Tauschen und Bürgerservice', itinerary: ['Tauschraum', 'Bürgerzentrum', 'Sportpark', 'Copyshop', 'Bäckerei', 'Tramhalt', 'Café', 'Apotheke', 'Post'], interviewTopic: 'Kostenlose Angebote im Sportpark', interviewFacts: ['im Mai eröffnet', 'täglich bis 22 Uhr zugänglich', 'Geräte ohne Anmeldung nutzbar', 'Trainerinnen zweimal pro Woche vor Ort', 'Bälle gegen Pfand ausgeliehen', 'weitere Schattenplätze geplant'], writingFriend: 'Mina', writingOffice: 'das Bürgerzentrum', speakingA: 'Welche Dinge tauschen Sie mit anderen?', speakingB: 'Welchen Sport machen Sie draußen?', planning: 'Abholung und Behördentermin an einem Tag zu organisieren' },
  { set: 9, cities: ['Dresden', 'Meißen'], names: ['Hanna', 'Omar', 'Jule', 'Frau Richter'], project: 'Fairteiler Neustadt', projectPlace: 'Nebenraum eines Stadtteilcafés', projectActivity: 'übrig gebliebene Lebensmittel kostenlos abgeben und holen', projectObject: 'Kühlboxen mit Temperaturanzeige', projectPlan: 'eine zweite Station in Pieschen', directory: 'LESETAG AN DER ELBE · PROGRAMM', directoryLevels: ['Infozelt · Anmeldung · Fundstelle', 'Kinderbühne · Bilderbücher · Basteltisch', 'Hauptbühne · Autorengespräche · Übersetzung', 'Ruhezone · Büchertausch · Getränkestand'], actionDay: 'Lesetag „Geschichten am Fluss“', actionPlace: 'Elbwiese unterhalb der Albertbrücke', morningTask: 'Sitzkissen verteilen und Büchertische beschriften', afternoonTask: 'Gäste zu Lesungen und Gesprächsrunden führen', bring: 'eine leichte Jacke und einen eigenen Trinkbecher', route: 'wegen der Bauarbeiten mit Tram 13 bis „Sachsenallee“ und dann zehn Minuten zu Fuß', adTheme: 'Lebensmittel und Lesen', itinerary: ['Fairteiler', 'Lesebühne', 'Tramhaltestelle', 'Bäckerei', 'Buchladen', 'Elbwiese', 'Café', 'Markt', 'Bahnhof'], interviewTopic: 'Foodsharing im Stadtteil', interviewFacts: ['von 35 Personen betreut', 'Lebensmittel täglich kontrolliert', 'rohes Fleisch nicht angenommen', 'Abholung ohne Registrierung möglich', 'Betriebe am Abend Ware bringen', 'mehrsprachige Regeln neu ausgehängt'], writingFriend: 'Jule', writingOffice: 'das Organisationsteam des Lesetags', speakingA: 'Wie vermeiden Sie Lebensmittelreste?', speakingB: 'Wann und wo lesen Sie gern?', planning: 'einen Einkauf mit dem gemeinsamen Lesetag zu verbinden' },
  { set: 10, cities: ['Bamberg', 'Bayreuth'], names: ['Luis', 'Amira', 'Tessa', 'Herrn Lang'], project: 'Werkraum am Kranen', projectPlace: 'alten Lagerhaus nahe der Regnitz', projectActivity: 'Holz, Papier und Stoff gemeinsam kreativ bearbeiten', projectObject: 'Materialkisten für kleine eigene Projekte', projectPlan: 'offene Abende für junge Erwachsene', directory: 'BÜRGERFUNK BAMBERG · STUDIOPLAN', directoryLevels: ['Empfang · Anmeldung · Kopfhörerausgabe', 'Studio 1 · Nachrichten · Schnittraum', 'Studio 2 · Musik · Techniklager', 'Seminarraum · Mediathek · Dachterrasse'], actionDay: 'Radiotag „Unsere Stimmen“', actionPlace: 'Bürgerfunkstudio in der Luitpoldstraße', morningTask: 'Mikrofone testen und Namenskarten vorbereiten', afternoonTask: 'Gäste bei kurzen Probeaufnahmen unterstützen', bring: 'Kopfhörer und einen Zettel mit einer eigenen Idee', route: 'mit Bus 901 bis „ZOB“ und durch den Eingang neben der Buchhandlung', adTheme: 'Handwerk und Radio', itinerary: ['Werkraum', 'Radiostudio', 'Wanderbushalt', 'Buchhandlung', 'Bäckerei', 'Park', 'Café', 'Bahnhof', 'Touristinfo'], interviewTopic: 'Wanderbusse in der Fränkischen Schweiz', interviewFacts: ['von April bis Oktober gefahren', 'samstags häufiger unterwegs', 'Fahrradanhänger reservierbar', 'Tagestickets beim Fahrer erhältlich', 'mehrere Wanderwege direkt erreicht', 'Fahrplan nach Rückmeldungen verlängert'], writingFriend: 'Tessa', writingOffice: 'die Redaktion des Bürgerfunks', speakingA: 'Was stellen Sie gern selbst her?', speakingB: 'Welche Sendungen hören Sie?', planning: 'eine Aufnahmezeit mit einer passenden Busfahrt zu wählen' },
];

const ordered = (correct: string, wrongA: string, wrongB: string, answer: 0 | 1 | 2): [string, string, string] => {
  if (answer === 0) return [correct, wrongA, wrongB];
  if (answer === 1) return [wrongA, correct, wrongB];
  return [wrongA, wrongB, correct];
};

const answers = (set: number): [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2] => {
  const rotations: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2][] = [
    [0, 1, 2, 0, 1], [1, 2, 0, 1, 2], [2, 0, 1, 2, 0],
  ];
  return rotations[set % 3];
};

const turn = (speaker: string, text: string): GoetheA2Turn => ({ speaker, text });

const legacyFactSentences: Record<string, string> = {
  'im Mai eröffnet': 'der Sportpark ist seit Mai geöffnet',
  'täglich bis 22 Uhr zugänglich': 'er ist täglich bis 22 Uhr zugänglich',
  'Geräte ohne Anmeldung nutzbar': 'die Geräte kann man ohne Anmeldung nutzen',
  'Trainerinnen zweimal pro Woche vor Ort': 'Trainerinnen sind zweimal pro Woche vor Ort',
  'Bälle gegen Pfand ausgeliehen': 'Bälle werden gegen Pfand ausgeliehen',
  'weitere Schattenplätze geplant': 'weitere Schattenplätze sind geplant',
  'von 35 Personen betreut': '35 Personen betreuen die Station',
  'Lebensmittel täglich kontrolliert': 'Lebensmittel werden täglich kontrolliert',
  'rohes Fleisch nicht angenommen': 'rohes Fleisch wird nicht angenommen',
  'Abholung ohne Registrierung möglich': 'die Abholung ist ohne Registrierung möglich',
  'Betriebe am Abend Ware bringen': 'Betriebe bringen am Abend ihre Ware',
  'mehrsprachige Regeln neu ausgehängt': 'neue Regeln hängen in mehreren Sprachen aus',
  'von April bis Oktober gefahren': 'die Busse fahren von April bis Oktober',
  'samstags häufiger unterwegs': 'samstags gibt es mehr Fahrten',
  'Fahrradanhänger reservierbar': 'ein Fahrradanhänger kann reserviert werden',
  'Tagestickets beim Fahrer erhältlich': 'Tagestickets sind beim Fahrer erhältlich',
  'mehrere Wanderwege direkt erreicht': 'mehrere Wanderwege beginnen direkt an Haltestellen',
  'Fahrplan nach Rückmeldungen verlängert': 'der Fahrplan wurde nach Rückmeldungen verlängert',
};

const factSentence = (value: string) => {
  const normalized = legacyFactSentences[value] ?? value;
  return `${normalized.charAt(0).toUpperCase()}${normalized.slice(1)}`;
};

const dialogueTurns = (value: string): GoetheA2Turn[] => {
  const turns = [...value.matchAll(/(Frau|Mann):\s*(.*?)(?=\s(?:Frau|Mann):|$)/gu)]
    .map(match => turn(match[1], match[2].trim()));
  if (turns.length) turns[turns.length - 1].text += ' So ist die gemeinsame Entscheidung für beide am Ende wirklich eindeutig und praktisch.';
  return turns;
};

function buildSet(p: Profile): GoetheA2Set {
  const [a1, a2, a3, a4, a5] = answers(p.set);
  const [b1, b2, b3, b4, b5] = answers(p.set + 1);
  const [c1, c2, c3, c4, c5] = answers(p.set + 2);
  const h3Base: [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2] = [1, 2, 0, 1, 2];
  const h3Shift = p.set % h3Base.length;
  const h3Answers = [...h3Base.slice(h3Shift), ...h3Base.slice(0, h3Shift)] as [0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2, 0 | 1 | 2];
  const h2Letters = ['B', 'D', 'F', 'G', 'A'] as const;
  const r1Text = `In ${p.cities[0]} gibt es seit neun Monaten das Projekt „${p.project}“. Es befindet sich im ${p.projectPlace}. Dort können Besucherinnen und Besucher ${p.projectActivity}. Das Angebot ist an drei Tagen pro Woche geöffnet und wird von einem kleinen Verein organisiert. ${p.names[0]} koordiniert zwölf freiwillige Helferinnen und Helfer.

Wer zum ersten Mal kommt, erhält am Eingang eine kurze Erklärung. Für die Teilnahme zahlt man nichts. Nur besondere Materialien oder ein Pfand müssen manchmal bezahlt werden. Sehr beliebt sind ${p.projectObject}. Sie können vor Ort benutzt werden, dürfen aber nicht ohne Anmeldung mitgenommen werden. Gruppen ab sechs Personen vereinbaren vorher einen Termin.

Das Team möchte Menschen aus verschiedenen Stadtteilen zusammenbringen. Deshalb gibt es jeden Monat einen offenen Nachmittag mit Kaffee, einfachen Informationen und einer praktischen Vorführung. Kinder dürfen teilnehmen, wenn eine erwachsene Person sie begleitet. Hunde müssen draußen warten, weil im Raum Lebensmittel und empfindliche Geräte stehen.

Im letzten Monat kamen 318 Gäste. Viele blieben länger als geplant und halfen neuen Besucherinnen und Besuchern. Für das nächste Halbjahr plant der Verein ${p.projectPlan}. Dafür sucht das Team noch zwei Personen, die am Freitagabend Zeit haben. Interessierte können sich online melden oder direkt während der Öffnungszeiten mit ${p.names[0]} sprechen.`;

  const r2Text = `${p.directory}\n\nERDGESCHOSS\n${p.directoryLevels[0]} · Café bis 18 Uhr · barrierefreier Eingang\n\n1. OBERGESCHOSS\n${p.directoryLevels[1]} · Toiletten · ruhiger Warteplatz\n\n2. OBERGESCHOSS\n${p.directoryLevels[2]} · Beratung Dienstag und Donnerstag 15–18 Uhr\n\n3. OBERGESCHOSS\n${p.directoryLevels[3]} · Gruppen nur nach Anmeldung\n\nHEUTE\n16:30 Uhr · Einführung für neue Besucher · 1. OG\n18:00 Uhr · Offenes Treffen mit ${p.names[1]} · 3. OG\n\nSERVICE\nKopieren im 2. OG gegen Gebühr. Verlorene Sachen liegen sieben Tage an der Information. Der Aufzug fährt heute nur bis ins 2. Obergeschoss. Große Taschen bleiben in den Schließfächern neben dem Eingang. Samstags schließt das Haus bereits um 14 Uhr.`;

  const r3Text = `Betreff: ${p.actionDay} am Samstag

Liebe Helferinnen und Helfer,

vielen Dank, dass ihr bei unserem ${p.actionDay} mitmacht. Wegen einer anderen Veranstaltung treffen wir uns nicht am ursprünglich genannten Ort, sondern im ${p.actionPlace}. Beginn ist um 9:30 Uhr. Ab 9 Uhr könnt ihr am Seiteneingang eure Namensschilder abholen.

Am Vormittag wollen wir ${p.morningTask}. Nach der gemeinsamen Pause werden wir ${p.afternoonTask}. Bitte bringt ${p.bring} mit. Das übrige Material liegt schon bereit. Kaffee, Tee und ein warmes Mittagessen organisiert der Verein. Wer eine Allergie hat oder vegetarisch essen möchte, schreibt mir bitte spätestens bis Mittwoch.

Um 12:30 Uhr essen wir zusammen. Danach teilen wir uns in drei Gruppen. Eine Gruppe bleibt am Infotisch, eine arbeitet mit den angemeldeten Familien, und die dritte räumt Material nach jeder Runde wieder auf. Wir möchten gegen 16:30 Uhr fertig sein. Wer nur bis mittags helfen kann, sagt morgens bei der Anmeldung Bescheid.

Ihr erreicht uns ${p.route}. Fahrräder können hinter dem Gebäude angeschlossen werden. Für Autos gibt es dort keine Besucherparkplätze. Bitte nutzt deshalb möglichst öffentliche Verkehrsmittel. Kinder ab zehn Jahren dürfen helfen, wenn eine erwachsene Person bei ihnen bleibt.

Während des Tages macht ${p.names[2]} einige Fotos für unseren Vereinsbericht. Wer nicht fotografiert werden möchte, bekommt bei der Anmeldung einen gelben Aufkleber. Bei starkem Regen arbeiten wir nur in den Innenräumen; der Termin fällt nicht aus.

Schreibt mir bis Donnerstag, falls ihr besondere Erfahrungen mitbringt oder eine Aufgabe nicht übernehmen könnt. Am Freitag schicke ich den endgültigen Plan.

Viele Grüße\n${p.names[0]}`;

  const readingParts: GoetheA2Set['reading']['parts'] = [
    {
      part: 1, family: 'continuous-media-text', title: p.project, text: r1Text,
      example: choice(p.set, 'r1-0', 'Worum geht es in dem Artikel?', ['um ein neues Angebot im Stadtteil', 'um eine private Reisegruppe', 'um den Verkauf eines Gebäudes'], 0),
      items: [
        choice(p.set, 'r1-1', 'Was erfahren neue Gäste zuerst?', ordered('Sie bekommen eine kurze Erklärung.', 'Sie müssen einen Kurs bezahlen.', 'Sie sprechen mit der Stadtverwaltung.', a1), a1),
        choice(p.set, 'r1-2', 'Wann sollen größere Gruppen Kontakt aufnehmen?', ordered('vor ihrem Besuch', 'erst nach der Veranstaltung', 'nur am Freitagabend', a2), a2),
        choice(p.set, 'r1-3', 'Was gilt für Kinder?', ordered('Eine erwachsene Begleitung ist nötig.', 'Sie dürfen nur draußen warten.', 'Sie können Material ohne Anmeldung mitnehmen.', a3), a3),
        choice(p.set, 'r1-4', 'Was gefiel vielen Gästen im letzten Monat?', ordered('Sie halfen auch anderen Personen.', 'Sie bekamen kostenlos Geräte geschenkt.', 'Sie konnten ihre Hunde mitbringen.', a4), a4),
        choice(p.set, 'r1-5', 'Wofür sucht das Projekt weitere Hilfe?', ordered(`für ${p.projectPlan}`, 'für den Verkauf am Eingang', 'für eine Reise in die Partnerstadt', a5), a5),
      ],
    },
    {
      part: 2, family: 'directory-program-board', title: p.directory, text: r2Text,
      example: choice(p.set, 'r2-0', 'Sie möchten sich am Eingang informieren. Wohin gehen Sie?', ['ins Erdgeschoss', 'ins 2. Obergeschoss', 'an einen anderen Ort'], 0),
      items: [
        choice(p.set, 'r2-1', 'Sie möchten heute an der Einführung teilnehmen. Wohin gehen Sie?', ordered('ins 1. Obergeschoss', 'ins Erdgeschoss', 'an einen anderen Ort', b1), b1),
        choice(p.set, 'r2-2', 'Sie brauchen am Donnerstag eine Beratung. Wohin gehen Sie?', ordered('ins 2. Obergeschoss', 'ins 3. Obergeschoss', 'an einen anderen Ort', b2), b2),
        choice(p.set, 'r2-3', `Sie möchten das offene Treffen mit ${p.names[1]} besuchen. Wohin gehen Sie?`, ordered('ins 3. Obergeschoss', 'ins 1. Obergeschoss', 'an einen anderen Ort', b3), b3),
        choice(p.set, 'r2-4', 'Sie haben gestern Ihre Mütze verloren. Wohin gehen Sie?', ordered('zur Information im Erdgeschoss', 'zum Café im 1. Obergeschoss', 'an einen anderen Ort', b4), b4),
        choice(p.set, 'r2-5', 'Sie möchten heute mit dem Aufzug ganz nach oben fahren. Wohin gehen Sie?', ordered('über die Treppe ins 3. Obergeschoss', 'mit dem Aufzug ins 3. Obergeschoss', 'ins Untergeschoss', b5), b5),
      ],
    },
    {
      part: 3, family: 'correspondence', title: `Informationen zum ${p.actionDay}`, text: r3Text,
      items: [
        choice(p.set, 'r3-1', 'Was hat sich für Samstag geändert?', ordered('der Treffpunkt', 'das Datum', 'das Mittagessen', c1), c1),
        choice(p.set, 'r3-2', 'Wann muss man wegen besonderem Essen schreiben?', ordered('spätestens am Mittwoch', 'erst am Freitag', 'nach dem Aktionstag', c2), c2),
        choice(p.set, 'r3-3', 'Was sollen Personen tun, die nur vormittags Zeit haben?', ordered('bei der Anmeldung Bescheid sagen', 'die Fotos selbst machen', 'mit dem Auto kommen', c3), c3),
        choice(p.set, 'r3-4', 'Warum soll man möglichst nicht mit dem Auto kommen?', ordered('Es gibt keine Besucherparkplätze.', 'Die Straße bleibt den ganzen Tag geschlossen.', 'Autos dürfen nur am Morgen fahren.', c4), c4),
        choice(p.set, 'r3-5', 'Woran erkennt man Personen, die nicht fotografiert werden möchten?', ordered('an einem gelben Aufkleber', 'an einem schwarzen T-Shirt', 'an einem besonderen Namensschild', c5), c5),
      ],
    },
    {
      part: 4, family: 'needs-to-six-ads', title: `Angebote: ${p.adTheme}`,
      example: { profile: `0 · ${p.names[1]} sucht am Dienstagabend einen kurzen Einführungskurs.`, answer: 'B' },
      profiles: [
        { id: `g-a2-${p.set}-r4-1`, text: `1 · ${p.names[2]} möchte für einen Tag ein Gerät ausleihen, aber nichts kaufen.`, answer: 'C', rationale: 'Anzeige C bietet eine tageweise Ausleihe.' },
        { id: `g-a2-${p.set}-r4-2`, text: '2 · Eine Familie sucht am Samstag ein gemeinsames Angebot für ein Kind von neun Jahren.', answer: 'D', rationale: 'Anzeige D richtet sich an Erwachsene mit Kindern ab acht Jahren.' },
        { id: `g-a2-${p.set}-r4-3`, text: `3 · ${p.names[0]} möchte am Freitag nach der Arbeit persönliche Beratung bekommen.`, answer: 'A', rationale: 'Anzeige A ist am Freitagabend geöffnet und bietet Beratung.' },
        { id: `g-a2-${p.set}-r4-4`, text: '4 · Ein Student sucht sonntags einen kostenlosen Reparaturservice für seinen Laptop.', answer: 'X', rationale: 'Keine Anzeige verbindet Sonntag, kostenlos und Laptopreparatur.' },
        { id: `g-a2-${p.set}-r4-5`, text: '5 · Eine Seniorin kann nicht selbst kommen und braucht eine Lieferung nach Hause.', answer: 'F', rationale: 'Anzeige F bietet eine Lieferung nach Termin an.' },
      ],
      adverts: [
        { letter: 'A', heading: 'BERATUNG AM ABEND', text: `Freitags von 17 bis 20 Uhr beantworten wir persönliche Fragen rund um ${p.adTheme.toLowerCase()}. Bringen Sie vorhandene Unterlagen mit. Ein Termin ist nicht nötig, die Beratung kostet fünf Euro.` },
        { letter: 'B', heading: 'ERSTER SCHRITT', text: `Dienstag 18 Uhr: In neunzig Minuten lernen Anfängerinnen und Anfänger die wichtigsten Regeln zu ${p.adTheme.toLowerCase()} kennen. Material liegt bereit. Bitte melden Sie sich spätestens einen Tag vorher online an.` },
        { letter: 'C', heading: 'LEIHEN STATT KAUFEN', text: 'Verschiedene Geräte und praktische Gegenstände können Sie für einen Tag oder eine Woche ausleihen. Abholung werktags bis 19 Uhr. Ausweis und kleines Pfand erforderlich. Eine kurze Bedienungserklärung ist inklusive.' },
        { letter: 'D', heading: 'SAMSTAG FÜR FAMILIEN', text: `Erwachsene und Kinder ab acht Jahren entdecken gemeinsam unser Thema ${p.adTheme}. Der Kurs beginnt um 10 Uhr und dauert zwei Stunden. Getränke sind vorhanden; bequeme Kleidung bitte mitbringen.` },
        { letter: 'E', heading: 'NUR ONLINE', text: 'Unsere Videos erklären die wichtigsten Grundlagen Schritt für Schritt. Sie lernen zu Hause und können Fragen per E-Mail stellen. Persönliche Treffen, Ausleihe und Lieferung bieten wir bei diesem Angebot nicht an.' },
        { letter: 'F', heading: 'WIR KOMMEN ZU IHNEN', text: 'Wer nicht zu uns kommen kann, vereinbart telefonisch eine Lieferung nach Hause. Termine sind Montag bis Samstag möglich. Unsere Mitarbeitenden erklären alles an der Tür; Reparaturen gehören nicht zum Service.' },
      ],
    },
  ];

  const h1Topics = [
    [`Bis wann liegt ${p.names[2]}s Reservierung bereit?`, ['bis Dienstag', 'bis Donnerstag', 'bis Samstag'] as [string, string, string], 1 as const, `${p.names[2]}, hier ist die Information. Ihre reservierten Unterlagen sind angekommen und liegen bis Donnerstagabend für Sie bereit. Am Mittwoch schließen wir wegen einer internen Besprechung schon um sechzehn Uhr. Donnerstag sind wir wieder bis neunzehn Uhr da. Bitte bringen Sie zur Abholung Ihren Ausweis und die Reservierungsnummer aus unserer E-Mail mit.`],
    ['Wo hält der Bus heute?', ['vor dem Bahnhof', 'am Rathaus', 'in der Gartenstraße'] as [string, string, string], 2 as const, `Achtung, wegen Bauarbeiten kann die Haltestelle vor dem Rathaus heute nicht benutzt werden. Der Bus fährt trotzdem nach dem normalen Fahrplan. Bitte steigen Sie an der Ersatzhaltestelle in der Gartenstraße ein. Sie liegt etwa hundertfünfzig Meter weiter, direkt vor der Apotheke. Ab morgen früh halten alle Busse wieder wie gewohnt am Rathaus.`],
    [`Warum kann ${p.names[1]} den Gegenstand noch nicht abholen?`, ['Ein Teil fehlt noch.', 'Das Büro ist geschlossen.', 'Die Rechnung wurde verloren.'] as [string, string, string], 0 as const, `Guten Tag ${p.names[1]}, wir haben Ihren Gegenstand geprüft und fast alles erledigt. Leider fehlt uns noch ein passendes kleines Ersatzteil. Es wird morgen Vormittag geliefert. Deshalb ist eine Abholung heute nicht möglich. Kommen Sie bitte am Freitag nach fünfzehn Uhr. Dann können Sie auch direkt mit Karte oder bar bezahlen.`],
    ['Was sollen die Teilnehmenden mitbringen?', ['einen Becher', 'einen Regenschirm', 'ein Handtuch'] as [string, string, string], 0 as const, `Noch eine Information zum Termin morgen: Wir treffen uns um neun Uhr am Haupteingang. Die Veranstaltung findet größtenteils im Gebäude statt, deshalb brauchen Sie keinen Regenschirm. Getränke stehen kostenlos bereit, aber bitte bringen Sie einen eigenen Becher mit. Arbeitsmaterial und Schutzkleidung bekommen Sie von uns. Der Termin endet voraussichtlich gegen zwölf Uhr dreißig.`],
    ['Wann beginnt das Treffen?', ['um 17:30 Uhr', 'um 18:00 Uhr', 'um 18:30 Uhr'] as [string, string, string], 2 as const, `Hallo zusammen, unser heutiges Treffen beginnt eine halbe Stunde später als geplant, also erst um achtzehn Uhr dreißig. Der Raum bleibt derselbe: Raum vier im ersten Stock. Wer schon um achtzehn Uhr kommt, kann im Café warten. Dort habe ich einen Tisch reserviert. Bitte gebt diese Änderung auch an die neuen Mitglieder weiter.`],
  ];

  const h1 = h1Topics.map((entry, index) => audioChoice(p.set, `h1-${index + 1}`, entry[0] as string, entry[1] as [string, string, string], entry[2] as 0 | 1 | 2, [turn('Ansage', entry[3] as string)]));
  const h2Options = p.itinerary.map((label, index) => ({ letter: String.fromCharCode(65 + index), label }));
  const h2Turns = [
    turn(p.names[0], `Unser freier Samstag ist voll, aber wir schaffen alles. Wir treffen uns zuerst um neun Uhr bei der ${p.itinerary[2]}. Dort hole ich die bestellten Sachen ab. Das ist unser Beispiel. Danach müssen wir noch einige Wege gemeinsam planen.`),
    turn(p.names[1], `Gut. Um zehn Uhr gehen wir zur ${p.itinerary[1]}. Du hast doch die Nummer von dem verlorenen Rucksack dabei. Ich war dort noch nie, aber es liegt gleich hinter dem Rathaus.`),
    turn(p.names[0], `Ja. Danach möchte ich gegen elf Uhr in den ${p.itinerary[3]}. Wir können dort kurz sitzen und die Unterlagen ansehen. Wenn es regnet, nehmen wir stattdessen das Café, aber die Wetter-App zeigt Sonne.`),
    turn(p.names[1], `Um zwölf Uhr brauche ich etwas vom ${p.itinerary[5]}. Meine Pflanze hat neue Erde nötig, und dort gibt es auch kleine Töpfe. Das dauert bestimmt nicht lange.`),
    turn(p.names[0], `Dann essen wir um halb zwei im ${p.itinerary[6]}. Ich habe gestern einen Tisch am Fenster reserviert. Die Bäckerei wäre schneller, aber ich möchte in Ruhe mit dir sprechen.`),
    turn(p.names[1], `Am Nachmittag, etwa um drei, müssen wir noch zur ${p.itinerary[0]}. Für Sonntag fehlt uns Brot. Danach bringe ich um vier das Paket zur ${p.itinerary[7]}. Sie schließt schon um halb fünf.`),
    turn(p.names[0], `Einverstanden. Den ${p.itinerary[4]} und die ${p.itinerary[8]} lassen wir heute aus. Wenn alles klappt, sind wir kurz nach vier fertig und können direkt nach Hause fahren. Danach prüfen wir noch den Plan für Sonntag und sprechen den Rückweg gemeinsam ab.`),
  ];

  const h3Scenarios = [
    { prompt: 'Was kauft die Frau?', opts: [p.projectObject, 'eine Fahrkarte', 'einen Blumenstrauß'] as [string, string, string], correct: 0, answer: h3Answers[0], text: `Frau: Ich wollte eigentlich nur eine Fahrkarte kaufen, aber die habe ich schon in der App. Den Blumenstrauß nehme ich erst morgen mit. Heute brauche ich unbedingt ${p.projectObject}; zu Hause ist nichts mehr davon da. Mann: Dann gehen wir zuerst dorthin. Der Laden schließt nämlich schon in zwanzig Minuten.` },
    { prompt: 'Wie kommt der Mann nach Hause?', opts: ['mit dem Bus', 'mit dem Fahrrad', 'zu Fuß'] as [string, string, string], correct: 2, answer: h3Answers[1], text: `Mann: Mein Fahrrad steht noch am Bahnhof, aber wegen des starken Regens fahre ich heute nicht damit. Der Bus kommt erst in vierzig Minuten. Frau: Ich kann dich ein Stück begleiten. Zu Fuß brauchen wir nur fünfundzwanzig Minuten. Mann: Gute Idee, dann nehme ich einen Schirm und wir gehen gemeinsam.` },
    { prompt: 'Wo treffen sich die beiden?', opts: [p.itinerary[6], p.itinerary[3], p.itinerary[8]] as [string, string, string], correct: 2, answer: h3Answers[2], text: `Frau: Treffen wir uns im ${p.itinerary[6]}? Dort ist es am Nachmittag oft sehr voll. Mann: Im ${p.itinerary[3]} wäre es ruhiger, aber der liegt weit weg. Komm lieber direkt zur ${p.itinerary[8]}; ich warte am Haupteingang neben der großen Uhr. Frau: Gut, ich bin um Viertel vor sechs da.` },
    { prompt: 'Wann beginnt der Termin?', opts: ['14:00 Uhr', '14:30 Uhr', '15:00 Uhr'] as [string, string, string], correct: 1, answer: h3Answers[3], text: `Mann: In meiner Nachricht steht, dass der Termin um vierzehn Uhr beginnt. Frau: Das war die alte Uhrzeit. Gestern kam eine neue E-Mail: Die Gruppe vor uns braucht länger, deshalb starten wir erst um halb drei. Mann: Also vierzehn Uhr dreißig. Gut, dann kann ich vorher noch etwas essen.` },
    { prompt: 'Welchen Raum nehmen sie?', opts: ['Raum 1', 'Raum 3', 'Raum 5'] as [string, string, string], correct: 2, answer: h3Answers[4], text: `Frau: Raum eins ist heute für eine Prüfung reserviert. Raum drei wäre frei, aber dort funktioniert der Beamer nicht. Mann: Für unsere Bilder brauchen wir unbedingt einen. Frau: Dann bleibt Raum fünf. Er ist zwar kleiner, aber die Technik wurde gestern geprüft. Mann: Perfekt, ich schreibe die neue Raumnummer an alle.` },
  ];
  const h3 = h3Scenarios.map((scenario, index) => {
    const wrong = scenario.opts.filter((_, optionIndex) => optionIndex !== scenario.correct);
    return audioChoice(p.set, `h3-${index + 1}`, scenario.prompt, ordered(scenario.opts[scenario.correct], wrong[0], wrong[1], scenario.answer), scenario.answer, dialogueTurns(scenario.text), index + 1);
  });

  const fact = p.interviewFacts.map(factSentence);
  const h4Turns = [
    turn('Moderatorin', `Heute sprechen wir mit ${p.names[2]} über „${p.interviewTopic}“. Viele Menschen kennen das Angebot, aber nicht alle wissen, wie es organisiert wird. Seit wann sind Sie dabei?`),
    turn(p.names[2], `Ich helfe seit dem ersten Jahr mit. ${fact[0]}. Anfangs kamen nur wenige Gäste, inzwischen kennen es viele Familien und Berufstätige. Wichtig ist uns, dass alle ohne komplizierte Schritte teilnehmen können.`),
    turn('Moderatorin', 'Wie groß ist das Angebot heute, und was müssen neue Besucherinnen und Besucher beachten?'),
    turn(p.names[2], `${fact[1]}. ${fact[2]}. Neue Gäste bekommen vor Ort eine kurze Erklärung. Man kann Fragen stellen, und niemand muss schon Erfahrung mitbringen. Nur bei größeren Gruppen wünschen wir eine Nachricht vorher.`),
    turn('Moderatorin', 'Welche praktischen Regeln sind besonders wichtig?'),
    turn(p.names[2], `${fact[3]}. Viele glauben, man müsse alles im Internet buchen, aber das stimmt nicht. Wir bieten auch persönliche Hilfe. Wer uns regelmäßig besucht, lernt schnell andere Menschen aus dem Viertel kennen.`),
    turn('Moderatorin', 'Gibt es zusätzliche Informationen oder neue Pläne?'),
    turn(p.names[2], `Ja. ${fact[4]}. ${fact[5]}. Dafür brauchen wir weitere Freiwillige, vor allem am späten Nachmittag. Interessierte können erst einmal zwei Stunden zuschauen und danach entscheiden, ob sie mitmachen möchten.`),
  ];

  const speakingFolder = `/images/goethe/a2-${p.set}`;
  return createGoetheA2Set(p.set, `Goethe-Zertifikat A2 · WeLearn Mock ${p.set}`, [p.project, p.directory, p.actionDay, p.interviewTopic], {
    reading: { minutes: 30, parts: readingParts },
    listening: {
      minutesApprox: 30,
      parts: [
        { part: 1, family: 'five-short-public-or-private-messages', plays: 2, items: h1 },
        {
          part: 2, family: 'one-continuous-conversation', plays: 1,
          visualAsset: `/images/goethe/a2-${p.set}/hoeren-teil2.svg`,
          visualAlt: `Neun funktionale Bildfelder zum Tagesplan in ${p.cities[0]}`,
          leadQuestion: `Was machen ${p.names[0]} und ${p.names[1]} am Samstag?`, options: h2Options, turns: h2Turns,
          example: { number: 0, stageLabel: '09:00 Uhr', answer: 'C', rationale: `Sie treffen sich zuerst bei ${p.itinerary[2]}.` },
          items: h2Letters.map((letter, index) => ({ id: `g-a2-${p.set}-h2-${index + 1}`, number: (index + 6) as 6 | 7 | 8 | 9 | 10, stageLabel: ['10:00 Uhr', '11:00 Uhr', '12:00 Uhr', '13:30 Uhr', '15:00 Uhr'][index], answer: letter, rationale: `Dieser Ort wird für die Uhrzeit ausdrücklich genannt.` })),
        },
        { part: 3, family: 'five-short-conversations', plays: 1, items: h3 },
        {
          part: 4, family: 'radio-interview', plays: 2, turns: h4Turns,
          example: { statement: `Das Gespräch handelt von ${p.interviewTopic}.`, answer: true, rationale: 'Das Thema wird in der Einleitung genannt.' },
          items: [
            { id: `g-a2-${p.set}-h4-1`, statement: 'Das Angebot ist heute bekannter als zu Beginn.', answer: true, rationale: 'Inzwischen kennen es viele Menschen.' },
            { id: `g-a2-${p.set}-h4-2`, statement: 'Neue Gäste müssen bereits Erfahrung haben.', answer: false, rationale: 'Erfahrung wird ausdrücklich nicht verlangt.' },
            { id: `g-a2-${p.set}-h4-3`, statement: 'Größere Gruppen sollen sich vorher melden.', answer: true, rationale: 'Für Gruppen wird eine Nachricht gewünscht.' },
            { id: `g-a2-${p.set}-h4-4`, statement: 'Die Teilnahme ist nur über das Internet möglich.', answer: false, rationale: 'Es gibt auch persönliche Hilfe vor Ort.' },
            { id: `g-a2-${p.set}-h4-5`, statement: 'Neue Freiwillige können das Projekt zuerst kennenlernen.', answer: true, rationale: 'Sie dürfen zunächst zwei Stunden zuschauen.' },
          ],
        },
      ],
    },
    writing: {
      minutes: 30,
      tasks: [
        { part: 1, family: 'personal-message', situation: `Sie wollten sich heute mit ${p.writingFriend} treffen, können aber nicht kommen.`, functions: ['Entschuldigen Sie sich.', 'Nennen Sie den Grund.', 'Schlagen Sie einen neuen Termin vor.'], minWords: 20, maxWords: 30, modelAnswer: `Liebe ${p.writingFriend}, leider kann ich heute nicht kommen, weil ich länger arbeiten muss. Entschuldige bitte! Hast du morgen um 18 Uhr Zeit? Liebe Grüße, Alex` },
        { part: 2, family: 'semi-official-email', situation: `Sie haben eine Frage an ${p.writingOffice} und brauchen eine persönliche Auskunft.`, addressee: p.writingOffice, functions: ['Erklären Sie kurz Ihre Situation.', 'Bitten Sie um einen Termin.', 'Fragen Sie, welche Unterlagen Sie mitbringen sollen.'], minWords: 30, maxWords: 40, modelAnswer: `Guten Tag, ich brauche eine persönliche Auskunft zu Ihrem Angebot. Könnte ich bitte am Donnerstagnachmittag einen Termin bekommen? Welche Unterlagen soll ich zum Gespräch mitbringen? Vielen Dank und freundliche Grüße, Alex Martin` },
      ],
    },
    speaking: {
      pairMinutes: 15, preparationMinutes: 0,
      tasks: [
        { part: 1, family: 'personal-information-exchange', cards: ['Wohnort?', 'Wochenende?', 'Verkehrsmittel?', 'Lieblingsort?'], examples: ['Wo wohnen Sie?', 'Was machen Sie am Wochenende?', 'Welches Verkehrsmittel benutzen Sie oft?', 'Was ist Ihr Lieblingsort in der Stadt?'] },
        { part: 2, family: 'guided-personal-monologue', candidateA: { prompt: p.speakingA, cues: ['wann?', 'wo?', 'wie oft?', 'mit wem?'], followUps: ['Was ist dabei wichtig?', 'Was möchten Sie ändern?'] }, candidateB: { prompt: p.speakingB, cues: ['wann?', 'wo?', 'wie?', 'warum?'], followUps: ['Wie war das früher?', 'Was empfehlen Sie?'] } },
        { part: 3, family: 'pair-planning-negotiation', situation: `Sie möchten ${p.planning}. Finden Sie mithilfe Ihrer beiden Terminkarten einen gemeinsamen Zeitpunkt.`, candidateAAsset: `${speakingFolder}/sprechen-teil3-a.svg`, candidateBAsset: `${speakingFolder}/sprechen-teil3-b.svg`, candidateAAlt: 'Terminkarte A mit freien und belegten Zeiten', candidateBAlt: 'Terminkarte B mit freien und belegten Zeiten', requiredOutcome: 'Beide Personen einigen sich auf einen gemeinsamen Termin und nennen Zeit und Treffpunkt.' },
      ],
    },
  });
}

export const GOETHE_A2_ORIGINAL_SETS = profiles.map(buildSet);

export const getGoetheA2OriginalSet = (set: number): GoetheA2Set => {
  const result = GOETHE_A2_ORIGINAL_SETS.find(candidate => candidate.id === `a2-${set}`);
  if (!result) throw new Error(`Unknown Goethe A2 set ${set}`);
  return result;
};
