import type { MockExam, MockSection } from './types';

type FidelityMaterial = {
  personal: string;
  press: [string, string];
  ads: [string, string, string, string, string, string, string, string, string, string];
  opinions: [string, string, string, string, string, string, string];
  rules: string;
  forumQuote: string;
};

const MATERIALS: Record<number, FidelityMaterial> = {
  1: {
    personal: `Am späten Nachmittag kam noch eine Familie mit einer Kaffeemaschine. Das Gerät war zwar nicht mehr zu retten, aber wir konnten einige Teile ausbauen und für andere Reparaturen aufbewahren. Dabei erklärte mir Amir, warum das Café nichts wegwirft, bevor Fachleute es genau untersucht haben. Diese ruhige und praktische Haltung hat mir besonders gefallen.`,
    press: [
      `Inzwischen hält der Bus an jedem Ort zwanzig Minuten. Wenn vorbestellte Waren fehlen, werden sie beim nächsten Besuch ohne zusätzliche Kosten geliefert. Die Gemeinden wollen außerdem prüfen, ob einzelne Haltestellen im Sommer länger bedient werden müssen.`,
      `Vor der Einführung wurden die Beschäftigten geschult, damit sie Fragen freundlich beantworten können. Wer eine normale Einkaufsatmosphäre bevorzugt, kann weiterhin zu allen anderen Zeiten kommen. Eine Ausweitung auf den Samstag ist bisher nicht geplant.`,
    ],
    ads: [
      'In einer Videoanalyse erhalten alle Teilnehmenden anschließend eine persönliche Rückmeldung.',
      'Zu jedem Termin gehören Rezepte und Hinweise zur Aufbewahrung der Gerichte.',
      'Auch das Wiederfinden einzelner Aufnahmen mithilfe von Suchbegriffen wird ausführlich geübt.',
      'Typische Gespräche werden mit wechselnden Rollen nachgestellt und gemeinsam ausgewertet.',
      'Am Ende kontrollieren die Teilnehmenden die Verkehrssicherheit ihres eigenen Fahrrads.',
      'Eine Kinderärztin beantwortet nach den praktischen Übungen Fragen aus dem Familienalltag.',
      'Die Gruppe entscheidet gemeinsam, welche Arbeiten zum jeweiligen Wetter passen.',
      'Auf Wunsch werden Atemtechnik und Lautstärke anhand kurzer Aufnahmen verglichen.',
      'Für das Abschlussstück bringen die Teilnehmenden ihren eigenen Stoff mit.',
      'Die Bewegungen werden ohne Sportkleidung ausgeführt und eignen sich auch für kleine Räume.',
    ],
    opinions: [
      'Mein Arbeitgeber hat das Modell sechs Monate getestet; die Zahl meiner Überstunden ist dabei nicht gestiegen.',
      'Besonders schwierig ist die Vertretung, wenn gleichzeitig jemand krank wird oder Urlaub hat.',
      'Entscheidend war, dass wir zuerst unnötige Abläufe abgeschafft haben und nicht einfach schneller arbeiten sollten.',
      'Ein freier Tag hilft wenig, wenn man an den vier Abenden zu erschöpft für das Familienleben ist.',
      'Meine Kurszeiten stehen lange fest, deshalb kann das Team die Aufgaben rechtzeitig verteilen.',
      'Kundinnen erwarten bei uns kurze Reparaturzeiten; daran ändert ein neues Arbeitsmodell nichts.',
      'Eine starre Lösung für alle Betriebe wäre falsch, doch als freiwilliges Modell überzeugt sie mich.',
    ],
    rules: `

VERANSTALTUNGEN
Musik und andere verstärkte Geräusche sind nur in den dafür vorgesehenen Räumen erlaubt. Ab 20 Uhr bleiben Fenster und Türen zum Hof geschlossen. Wer eine öffentliche Veranstaltung plant, nennt dem Empfang spätestens drei Werktage vorher eine verantwortliche Kontaktperson.

ABFALL UND REINIGUNG
Gruppen trennen Glas, Papier und Restmüll in den gekennzeichneten Behältern. Nach Koch- oder Werkstattkursen werden Arbeitsflächen gereinigt und ausgeliehene Geräte vollständig zurückgegeben. Zusätzliche Reinigungskosten entstehen nur, wenn ein Raum erheblich verschmutzt hinterlassen wird.`,
    forumQuote: 'Video-Beratung bei Behörden spart Wege und Wartezeit. Trotzdem sollte es weiterhin genügend persönliche Termine geben, weil nicht alle Menschen geeignete technische Geräte besitzen oder schwierige Angelegenheiten am Bildschirm besprechen möchten.',
  },
  2: {
    personal: `Nach der Abschlussveranstaltung saßen wir noch mit mehreren Gästen zusammen. Dabei erzählte die Regisseurin, dass gute Untertitel nicht jedes Wort wiederholen, sondern vor allem Stimmung und Bedeutung erhalten sollen. Das fand ich spannend, weil ich vorher nur auf Grammatik geachtet hatte. Die Festivalleitung schickte uns am Montag eine genaue Auswertung. Darin stand auch, dass viele Besucher die Untertitel besonders gut lesbar fanden.`,
    press: [
      `Für vertrauliche Gespräche stehen weiterhin kleine Räume zur Verfügung, die über einen Kalender gebucht werden. Die stillen Bereiche sind dagegen nicht reservierbar. Wer dort arbeitet, soll den Platz nach spätestens zwei Stunden wieder freigeben. In der Umfrage im Sommer wird deshalb nicht nur nach der Konzentration, sondern auch nach der gerechten Nutzung gefragt.`,
      `Vor der ersten Beratung probieren die Kundinnen mehrere Kombinationen an und besprechen, welche Kleidung zum jeweiligen Beruf passt. Die Initiative verlangt keine Angaben zum Einkommen. Sie möchte gerade Menschen erreichen, die wegen einer unerwarteten Einladung schnell etwas Passendes benötigen. Termine werden telefonisch oder über ein einfaches Onlineformular vergeben.`,
    ],
    ads: [
      'Kurze Videoaufnahmen zeigen, wie Blickkontakt und Körperhaltung auf eine Gruppe wirken.',
      'Auch Zeugnisse werden auf Vollständigkeit geprüft, eine Berufsvermittlung findet jedoch nicht statt.',
      'Die Gruppe arbeitet mit Nachrichtentexten und erhält Hinweise zu Tempo, Betonung und Pausen.',
      'Im zweiten Teil erstellen alle einen Zeitplan für ein eigenes, realistisch begrenztes Vorhaben.',
      'Vorausgesetzt werden sichere Kenntnisse auf Niveau B1; ein Einstufungsgespräch ist kostenlos.',
      'Die Tandems legen ihre Ziele selbst fest und treffen sich mindestens zweimal im Monat.',
      'Auf Wunsch werden die Übungen mit echten Gesprächsbeispielen aus dem Arbeitsalltag vorbereitet.',
      'Das Rohmaterial wird gestellt; am Ende exportiert jede Person einen kurzen Film mit Untertiteln.',
      'Teilnehmende erhalten ein Merkblatt und können eigene Vertragsfragen anonym einreichen.',
      'Geübt werden Gesprächseinstiege, ein höflicher Abschied und das Erinnern an Namen.',
    ],
    opinions: [
      'Wenn jemand kurz wegsehen muss, ist das kein Problem; eine grundsätzliche Sichtbarkeit verbessert aber den Austausch.',
      'Bei wichtigen Wortbeiträgen schalte ich die Kamera freiwillig ein, doch eine Pflicht löst mein technisches Problem nicht.',
      'Virtuelle Hintergründe sind keine vollständige Lösung, denn auch sie funktionieren auf älteren Geräten oft schlecht.',
      'Gerade während der Einarbeitung konnte ich Reaktionen sehen und schneller nachfragen, wenn etwas unklar blieb.',
      'Seit unserer Vereinbarung sind die Sitzungen kürzer, weil sich deutlich mehr Personen am Gespräch beteiligen.',
      'Beschäftigte sollten selbst entscheiden dürfen, ob ihre private Umgebung sichtbar wird oder nicht.',
      'Die Leitung sollte vorher sagen, bei welchen Sitzungen das Bild wirklich für die Zusammenarbeit gebraucht wird.',
    ],
    rules: `

REPRODUKTIONEN
Kopien fertigt ausschließlich das Archivpersonal an. Anträge werden schriftlich gestellt und je nach Umfang innerhalb von fünf Werktagen bearbeitet. Veröffentlichungen in Büchern, Ausstellungen oder sozialen Medien benötigen eine besondere Genehmigung; die Erlaubnis zum privaten Fotografieren reicht dafür nicht aus.

PAUSEN
Wer den Lesesaal länger als dreißig Minuten verlässt, gibt die Dokumente bei der Aufsicht ab. Reservierte Plätze bleiben während einer kurzen Pause bestehen. Telefonate werden außerhalb des Lesesaals geführt.`,
    forumQuote: 'Bei Online-Besprechungen sollte die Kamera eingeschaltet sein, weil man Reaktionen und Unsicherheit schneller erkennt. Ausnahmen sind sinnvoll, wenn die Verbindung schlecht ist oder jemand seine private Umgebung nicht zeigen kann.',
  },
  3: {
    personal: `Später lernte ich auch unsere älteste Bewohnerin kennen. Frau Aydin wohnt seit fast vierzig Jahren im Viertel und kennt jede Veränderung im Haus. Sie zeigte mir den Gemeinschaftsraum, in dem donnerstags gekocht wird. Ich hatte befürchtet, dass man dort jeden Abend gemeinsam verbringen muss. Tatsächlich entscheidet aber jede Person selbst, wie oft sie teilnimmt. Nur für den monatlichen Hausdienst gibt es einen verbindlichen Plan.`,
    press: [
      `Die Bibliothek stellt dafür keine neuen Geräte bereit. Interessierte bringen ihr eigenes Telefon oder Tablet mit und arbeiten in kleinen Gruppen. Wer kein Gerät besitzt, kann trotzdem teilnehmen und gemeinsam mit einer anderen Person üben. Nach dem Pilotmonat entscheidet nicht die Zahl der installierten Apps, sondern ob die Teilnehmenden alltägliche Aufgaben selbstständiger erledigen.`,
      `Die beteiligten Häuser erhalten außerdem einen gemeinsamen Werkzeugschrank und einen Raum für Treffen. Ein professioneller Hausmeister bleibt für technische Notfälle verantwortlich. Das Projekt ersetzt also keine bezahlten Stellen. Es soll vielmehr verhindern, dass kleine Probleme unbemerkt bleiben und sich Nachbarinnen erst kennenlernen, wenn bereits ein Konflikt entstanden ist.`,
    ],
    ads: [
      'Der erste Termin dient dem Kennenlernen; danach entscheidet die Gruppe über gemeinsame Themen.',
      'Wohnungsangebote werden nicht vermittelt, aber Suchprofile können zusammen verbessert werden.',
      'Ein Schwerpunkt liegt auf Gesprächen zwischen Menschen, die sehr unterschiedliche Tagesabläufe haben.',
      'Die Beratung ist vertraulich und kann auch von zwei Konfliktparteien gemeinsam genutzt werden.',
      'Für den Gartenplan werden Sonnenzeiten, Wasserbedarf und barrierefreie Wege berücksichtigt.',
      'Kinder können teilnehmen, wenn eine erwachsene Bezugsperson die Verantwortung übernimmt.',
      'Die Ergebnisse werden in einfacher Sprache zusammengefasst und an alle Hausparteien geschickt.',
      'Neben der Bedienung werden Datenschutz und sichere Passwörter anhand alltäglicher Beispiele erklärt.',
      'Werkzeug und Material sind vorhanden; repariert werden ausschließlich Gegenstände des Hauses.',
      'Die Begleitung endet nach drei Monaten mit einem gemeinsamen Auswertungsgespräch.',
    ],
    opinions: [
      'In unserem Haus teilen wir einen Gästeraum, den sonst jede Wohnung selten nutzen würde.',
      'Viele Entscheidungen dauern länger, weil zuerst alle Hausparteien angehört werden sollen.',
      'Meine Kinder haben im Haus Menschen gefunden, die Zeit für sie haben, obwohl keine Verwandtschaft besteht.',
      'Wenn Hilfe stillschweigend erwartet wird, kann aus guter Nachbarschaft schnell eine Belastung werden.',
      'Ein schriftlicher Plan verhindert, dass immer dieselben Personen Garten und Gemeinschaftsräume pflegen.',
      'Privatsphäre ist auch in einem gemeinschaftlichen Haus wichtig und muss ausdrücklich respektiert werden.',
      'Für mich liegt die Stärke darin, Hilfe anbieten zu können, ohne rund um die Uhr verfügbar zu sein.',
    ],
    rules: `

GEMEINSCHAFTSRÄUME
Der große Saal kann von Hausparteien kostenlos reserviert werden. Private Feiern enden sonntags bis donnerstags um 22 Uhr, freitags und samstags um 24 Uhr. Nach der Nutzung werden Fenster geschlossen, Geschirr eingeräumt und der Boden besenrein hinterlassen. Kommerzielle Veranstaltungen sind nicht erlaubt.

GÄSTE
Besucherinnen und Besucher melden sich nicht einzeln an. Wer jedoch länger als zwei Wochen im Haus bleibt, wird der Verwaltung mitgeteilt. Bewohnerinnen und Bewohner haften für ausgeliehene Schlüssel ihrer Gäste.`,
    forumQuote: 'Gemeinschaftliches Wohnen kann Einsamkeit verhindern und Ressourcen sparen. Es funktioniert aber nur, wenn Aufgaben, private Grenzen und die Nutzung gemeinsamer Räume früh besprochen, regelmäßig neu vereinbart und Verantwortlichkeiten schriftlich festgehalten werden.',
  },
  4: {
    personal: `Bei der Auswertung zeigte uns die Biologin, wie unterschiedlich Beobachtungen wirken können. Zwei Gruppen hatten denselben Vogel gehört, aber nur eine konnte ihn sicher bestimmen. Deshalb werden unsichere Meldungen nicht gelöscht, sondern besonders gekennzeichnet und später von Fachleuten geprüft. Ich fand es beruhigend, dass niemand perfekte Kenntnisse erwartet. Beim nächsten Mal möchte ich früher kommen und zuerst die Vogelstimmen-Übung besuchen.`,
    press: [
      `Die gesammelten Daten sind anschließend auf einer Karte sichtbar, allerdings ohne genaue Privatadressen. Schulen können für ihren Unterricht einen zusammengefassten Datensatz erhalten. Die Projektleitung warnt davor, aus einzelnen Beobachtungstagen sofort langfristige Entwicklungen abzuleiten. Erst wenn mehrere Jahre verglichen werden, lassen sich verlässliche Veränderungen erkennen.`,
      `Die Kurse beginnen mit einer kurzen Einführung und führen danach direkt ins Freie. Wer eine Art nicht erkennt, nimmt ein Foto oder eine Tonaufnahme auf. Die Kursleitung erklärt, dass auch Fehlmeldungen nützlich sein können: Sie zeigen, welche Merkmale in der Anleitung noch genauer beschrieben werden müssen.`,
    ],
    ads: [
      'Die Daten werden erst nach einer automatischen Prüfung auf der öffentlichen Karte angezeigt.',
      'Pro Termin untersucht die Gruppe dieselbe Stelle, damit Veränderungen vergleichbar bleiben.',
      'Nach jeder Meldung erscheint eine kurze Information zu den beobachteten Insektenarten.',
      'Die Tour dient dem Lernen; Beobachtungen werden nicht in eine wissenschaftliche Datenbank eingetragen.',
      'Fotos sind möglich, aber für eine gültige Meldung nicht vorgeschrieben.',
      'Bei starkem Regen wird der Termin auf den folgenden Freitag verschoben.',
      'Teilnehmende erhalten monatlich eine Grafik mit den Messwerten ihres Stadtteils.',
      'Eine Fachperson erklärt, welche Funde mitgenommen werden dürfen und welche geschützt sind.',
      'Vor dem ersten Einsatz findet eine kurze digitale Schulung zur Bestimmung statt.',
      'Reservierungen werden am Veranstaltungstag um 18 Uhr bestätigt oder wetterbedingt abgesagt.',
    ],
    opinions: [
      'In unserem Garten reicht eine kleine Lampe am Weg, die sich nach wenigen Minuten selbst ausschaltet.',
      'Ich komme oft spät nach Hause und möchte den Eingang sehen, ohne zuerst mein Telefon benutzen zu müssen.',
      'Die dunklere Nacht ist inzwischen ein Teil unseres Gartens, den wir nicht mehr missen möchten.',
      'Statt eines Verbots sollte die Stadt sichere Lampen empfehlen und gefährliche Stellen besser beleuchten.',
      'Entscheidend sind Farbe, Richtung und Dauer des Lichts; Sicherheit und Naturschutz lassen sich verbinden.',
      'Eine gemeinsame Uhrzeit ist leichter zu kontrollieren als viele unverbindliche Empfehlungen.',
      'Bei uns schaltet eine Zeituhr die Beleuchtung aus; für Notfälle kann sie sofort wieder aktiviert werden.',
    ],
    rules: `

FÜHRUNGEN
Öffentliche Kurzführungen beginnen samstags um 11 und 14 Uhr und sind im Eintritt enthalten. Schulklassen vereinbaren einen eigenen Termin. Bei starkem Wind bleibt der obere Beobachtungssteg geschlossen; die Ausstellung im Erdgeschoss kann weiterhin besucht werden.

RÜCKSICHT
Große Gruppen teilen sich an den Fenstern auf, damit andere Gäste ebenfalls beobachten können. Blitzlicht und abgespielte Tierstimmen sind im gesamten Außenbereich untersagt. Gespräche mit dem Personal sollen nicht während laufender Zählungen geführt werden.`,
    forumQuote: 'Nächtliche Beleuchtung gibt vielen Menschen Sicherheit, kann aber Tiere stören und Energie verschwenden. Private Gärten sollten deshalb nur dort beleuchtet werden, wo Wege tatsächlich benutzt werden. Unsichere Stellen brauchen gezielte, sparsame Lampen.',
  },
  5: {
    personal: `Vor dem Turnier hatte ich geglaubt, Konfliktlotsen würden nur eingreifen, wenn zwei Mannschaften laut streiten. Tatsächlich begann unsere Arbeit viel früher. Wir stellten uns den Jugendteams vor, erklärten die Gesprächsregeln und zeigten, wo man uns finden konnte. Am Vormittag kam ein Trainer zu uns, weil sich zwei Spielerinnen gegenseitig für einen Fehler verantwortlich machten. Ich hörte zunächst beiden getrennt zu und fasste ihre Sichtweisen anschließend zusammen. Erst danach suchten wir gemeinsam nach einer Vereinbarung für das nächste Spiel.`,
    press: [
      `An den Stationen stehen Studierende aus höheren Semestern neben den Fachleuten. Sie berichten, welche Missverständnisse ihnen selbst am Anfang passiert sind. Fragen können auf Karten geschrieben werden, sodass niemand vor einer Gruppe sprechen muss. Besonders beliebt ist eine Station, an der kurze Beratungsgespräche in verschiedenen Rollen ausprobiert werden.`,
      `Die Aufgaben reichen von der Vorbereitung eines Gesprächsraums bis zur Begleitung eines offenen Nachmittags. Einsätze in akuten Streitfällen gehören ausdrücklich nicht dazu. Dafür braucht man eine längere Ausbildung. Vor jedem Termin gibt es eine Kontaktperson, und nach dem Einsatz folgt ein kurzes Auswertungsgespräch. So sollen auch gelegentliche Helfer verantwortungsvoll eingesetzt werden.`,
    ],
    ads: [
      'Der Abend endet mit zwei kurzen Fallbeispielen aus Schule und Verein.',
      'Nach der Mittagspause wird ein vollständiges Erstgespräch in Kleingruppen geübt.',
      'Eigene Fälle dürfen nur ohne Namen oder andere erkennbare Angaben besprochen werden.',
      'Die Beratung richtet sich an feste Teams und umfasst ein Vorgespräch mit der Leitung.',
      'Wer einen Termin versäumt, kann die Bescheinigung erst nach einem Ersatztermin erhalten.',
      'Vor Beginn erhalten alle eine Liste mit Schlafplatz, Anreise und benötigter Kleidung.',
      'Die Lernkontrollen können beliebig wiederholt werden; persönliche Beratung ist nicht enthalten.',
      'Im Training werden komplexe Konflikte mit drei oder mehr beteiligten Personen bearbeitet.',
      'Kinder und Erwachsene bearbeiten getrennte Aufgaben und vergleichen danach ihre Lösungen.',
      'Die Begleitung umfasst ein Zielgespräch, drei Beobachtungen und eine abschließende Auswertung.',
    ],
    opinions: [
      'Wenn Jugendliche früh lernen zuzuhören, profitieren Unterricht und Pausen gleichermaßen davon.',
      'Schülerinnen dürfen nicht Aufgaben übernehmen, für die eigentlich ausgebildete Erwachsene zuständig sind.',
      'Unsere Streithelfer holen rechtzeitig eine Lehrkraft, sobald Drohungen oder Gewalt eine Rolle spielen.',
      'Eine freiwillige Arbeitsgemeinschaft erreicht meist nur diejenigen, die ohnehin gut miteinander sprechen.',
      'Die Ausbildung gibt ruhigen Jugendlichen eine verantwortungsvolle Rolle und stärkt die Klassengemeinschaft.',
      'Ohne feste Begleitung können die jungen Vermittler selbst zwischen die Konfliktparteien geraten.',
      'Ein klares Programm mit Grenzen und regelmäßiger Supervision halte ich deshalb für sinnvoll.',
    ],
    rules: `

BERATUNGSGESPRÄCHE
Gespräche sind vertraulich und dauern in der Regel höchstens neunzig Minuten. Ton- oder Bildaufnahmen sind nicht gestattet. Minderjährige nehmen nur mit Zustimmung ihrer Erziehungsberechtigten teil. Wenn eine Person das Gespräch beenden möchte, wird ein neuer Termin nur mit Zustimmung aller Beteiligten vereinbart.

UNTERLAGEN
Notizen des Zentrums werden verschlossen aufbewahrt und sechs Monate nach Abschluss vernichtet. Eigene Unterlagen nehmen die Beteiligten nach jedem Termin wieder mit. Bescheinigungen enthalten keine Angaben zum Gesprächsinhalt.`,
    forumQuote: 'Schulen sollten Jugendliche zu Streithelfern ausbilden. Sie kennen den Alltag ihrer Mitschüler gut und können kleine Konflikte früh erkennen, brauchen dafür aber klare Grenzen, kontinuierliche Begleitung und regelmäßige Gespräche mit Fachkräften.',
  },
  6: {
    personal: `Gleich nach Einbruch der Dunkelheit kamen mehr Familien als erwartet. Ich sollte eigentlich nur Sternkarten verteilen, musste dann aber auch erklären, warum die Teleskope nicht sofort benutzt werden konnten. Die Linsen mussten sich erst an die kalte Außenluft gewöhnen. Später betreute ich eine kleine Station zum Mond. Ein Junge fragte, ob man dort Wind hören könne. Gemeinsam fanden wir in einem Modell heraus, weshalb das ohne Atmosphäre nicht möglich ist. Diese einfache Frage führte zu einem erstaunlich guten Gespräch.`,
    press: [
      `Die Texte der neuen Ausstellung werden zuerst mit Besuchergruppen getestet. Fachbegriffe verschwinden nicht vollständig, sondern werden direkt am Beispiel erklärt. Zusätzliche Karten bieten genauere Informationen für Menschen, die bereits Vorkenntnisse besitzen. Auf diese Weise soll einfache Sprache nicht zu ungenauen oder kindlichen Aussagen führen.`,
      `Freiwillige können Besucher zählen, Material für Kinderstationen vorbereiten oder Fragen sammeln, die später online beantwortet werden. Das Bedienen großer Teleskope bleibt geschultem Personal vorbehalten. Mehrere Teilnehmende aus den kurzen Einsätzen haben inzwischen einen Grundkurs besucht und begleiten regelmäßig die Abendveranstaltungen.`,
    ],
    ads: [
      'Bei klarem Himmel schließt sich eine zwanzigminütige Beobachtung auf der Terrasse an.',
      'Der Praxisteil behandelt Orientierung am Himmel und den sicheren Umgang mit kleinen Fernrohren.',
      'Beobachtungsberichte dürfen eingebracht werden, technische Einzelfragen beantwortet die Runde nicht.',
      'Das Angebot umfasst auch die Überarbeitung von Hinweisschildern in verständlicher Sprache.',
      'Bei Bewölkung werden die Termine nicht abgesagt, sondern in den Vortragsraum verlegt.',
      'Warme Kleidung und eine kleine Taschenlampe mit rotem Licht werden empfohlen.',
      'Untertitel sind vorhanden; die Videos können auch ohne Ton vollständig bearbeitet werden.',
      'Vorausgesetzt werden Kenntnisse über Sternbilder und Erfahrung mit mindestens zwei Beobachtungsnächten.',
      'Kinder bauen ein drehbares Modell, Erwachsene erhalten parallel eine eigene Einführung.',
      'Die Mentorin begleitet auch die Vorbereitung der ersten selbst geleiteten Veranstaltung.',
    ],
    opinions: [
      'Helle Werbeflächen leuchten oft die ganze Nacht, obwohl kaum noch jemand unterwegs ist.',
      'Geschäfte müssen sichtbar bleiben können; eine einheitliche Grenze passt nicht zu jeder Straße.',
      'Zeitliche Grenzen schützen Wohnungen und machen den Nachthimmel wieder besser erkennbar.',
      'Moderne Anlagen lassen sich dimmen, deshalb ist ein vollständiges Verbot technisch nicht notwendig.',
      'In Wohngebieten sollte Werbung spätestens nach Ladenschluss deutlich dunkler werden.',
      'Kontrollen verursachen Kosten, während freiwillige Vereinbarungen schneller an neue Technik angepasst werden können.',
      'Für Bahnhöfe und Notdienste braucht es Ausnahmen, nicht aber für jedes leere Schaufenster.',
    ],
    rules: `

BEOBACHTUNGSABENDE
Die Kuppel öffnet nur bei geeigneter Witterung. Eine Absage wird bis 17 Uhr auf der Internetseite veröffentlicht; bereits gebuchte Karten bleiben für einen Ersatztermin gültig. Auf der Plattform sind höchstens zwölf Personen gleichzeitig erlaubt. Den roten Sicherheitsleuchten ist zu folgen.

FOTOGRAFIE
Private Fotos ohne Blitz sind in der Ausstellung erlaubt. Für Aufnahmen durch ein Teleskop ist eine besondere Veranstaltung zu buchen. Stative dürfen Fluchtwege nicht blockieren, und andere Besucherinnen und Besucher werden nur mit ihrer Zustimmung fotografiert.`,
    forumQuote: 'Städte sollten sehr helle Werbung in der Nacht begrenzen. Geschäfte können sichtbar bleiben, aber Licht muss weder Wohnungen stören noch bis zum Morgen unnötig Energie verbrauchen oder die Verkehrssicherheit beeinträchtigen.',
  },
  7: {
    personal: `Am zweiten Tag trainierten wir eine Suche im Wald. Zuerst mussten wir den Weg auf einer Karte planen und mögliche Gefahrenstellen markieren. Ich lief nicht, wie erwartet, direkt mit der Rettungsgruppe los, sondern blieb an der Sammelstelle und dokumentierte alle Meldungen per Funk. Als eine Nachricht unvollständig ankam, fragte ich noch einmal nach, statt den vermuteten Ort einzutragen. Später sagte der Ausbilder, genau diese Ruhe sei in einem echten Einsatz besonders wichtig.`,
    press: [
      `Die praktischen Stationen zeigen unter anderem, wie ein Notruf aufgebaut ist und welche Angaben Rettungskräfte benötigen. Niemand muss Verletzungen nachspielen. Wer sich unwohl fühlt, kann eine Beobachtungsaufgabe übernehmen. Die Veranstalter wollen damit auch Personen erreichen, die einen normalen Erste-Hilfe-Kurs bisher aus Unsicherheit vermieden haben.`,
      `Zu den kurzen Aufgaben gehören Materialkontrollen, die Vorbereitung von Wegmarkierungen und die Betreuung eines Informationsstands. Medizinische Tätigkeiten und Fahrdienste sind ausgeschlossen. Für jede Aufgabe wird angegeben, ob körperliche Belastbarkeit erforderlich ist. Einige Helfer besuchen danach eine längere Ausbildung, doch das ist keine Bedingung für die einmalige Teilnahme.`,
    ],
    ads: [
      'Ehemalige Teilnehmende berichten anschließend, welche Ausbildungsschritte wirklich notwendig sind.',
      'Geübt werden Notruf, stabile Seitenlage und das Absichern einer Unfallstelle.',
      'Einsatzberichte dürfen nur in anonymisierter Form besprochen werden.',
      'Nach dem Vorgespräch beobachtet eine Fachperson einen kompletten Übungstag.',
      'Der Kurs eignet sich für Personen, die vor ihrer Arbeit Zeit für mehrere feste Termine haben.',
      'Eine Teilnahme an einzelnen Tagen ist nicht möglich; die Gruppe bleibt das ganze Wochenende zusammen.',
      'Die Plattform funktioniert auch auf dem Mobiltelefon und speichert den Lernstand automatisch.',
      'Funkverkehr und Koordination mehrerer Teams bilden den Schwerpunkt des zweiten Tages.',
      'Kinder lernen eine Notrufnummer, Erwachsene üben parallel einfache Erste-Hilfe-Maßnahmen.',
      'Zwischen den Treffen kann die Mentorin telefonisch zu organisatorischen Fragen erreicht werden.',
    ],
    opinions: [
      'Regelmäßige Einsätze dienen der ganzen Region und sollten nicht ausschließlich in der Freizeit stattfinden.',
      'Kleine Betriebe können zusätzliche freie Tage oft nicht auffangen, besonders wenn mehrere Personen gleichzeitig fehlen.',
      'Eine gesetzliche Mindestregel würde verhindern, dass freiwilliges Engagement vom Wohlwollen einzelner Vorgesetzter abhängt.',
      'Freizeit ist privat; Unternehmen sollten nicht entscheiden müssen, welche ehrenamtliche Aufgabe wichtig genug ist.',
      'Bei uns werden Einsatztage ausgeglichen, und die Motivation im Team ist dadurch eher gestiegen als gesunken.',
      'Statt freier Tage wären staatliche Zuschüsse für Betriebe eine gerechtere und planbarere Lösung.',
      'Wenn Bedingungen und Höchstzahl klar geregelt sind, profitieren Helfer, Arbeitgeber und Gesellschaft.',
    ],
    rules: `

ÜBUNGSPLATZ
Der Übungsplatz darf nur mit einer Ausbilderin oder einem Ausbilder betreten werden. Schutzkleidung wird vor Beginn auf Vollständigkeit kontrolliert und darf das Gelände nicht verlassen. Private Aufnahmen sind während dargestellter Unfallsituationen untersagt.

GESUNDHEIT
Teilnehmende informieren die Kursleitung vorab über Einschränkungen, die bei körperlichen Übungen wichtig sind. Niemand muss eine Aufgabe ausführen, bei der er sich unsicher fühlt. Verletzungen und beschädigtes Material werden sofort an der Materialausgabe gemeldet.`,
    forumQuote: 'Freiwillige im Rettungsdienst sollten für verpflichtende Einsätze zusätzliche freie Tage erhalten. Ihre Arbeit nützt der Allgemeinheit, darf kleine Arbeitgeber aber nicht ohne Ausgleich belasten. Eine gesetzliche Obergrenze könnte beide Seiten schützen.',
  },
  8: {
    personal: `Vor dem Einlass prüfte ich mit einer Kollegin, ob die Untertitel gut lesbar und die reservierten Plätze erreichbar waren. Eine Besucherin meldete, dass ihr Empfänger für die Audiodeskription keinen Ton hatte. Zuerst vermuteten wir einen Defekt, doch das Gerät war nur auf den falschen Saal eingestellt. Nach dem Film diskutierten Gäste und Produktionsteam darüber, welche Bildinformationen wirklich wichtig sind. Ich hatte nicht erwartet, dass wenige präzise Sätze so viel Atmosphäre vermitteln können.`,
    press: [
      `Vor jeder Veranstaltung prüft ein gemischtes Team Wege, Beschilderung und digitale Informationen. Menschen mit unterschiedlichen Behinderungen werden dafür bezahlt und nicht nur um eine freiwillige Meinung gebeten. Die Hinweise fließen bereits in die Planung ein; spätere teure Umbauten sollen dadurch seltener notwendig werden.`,
      `Freiwillige beschreiben Sitzplätze, testen Untertiteldateien oder begleiten Gäste vom Eingang zum Saal. Sie ersetzen weder Gebärdensprachdolmetscher noch technisches Fachpersonal. Vor dem ersten Einsatz gibt es eine kurze Einführung in respektvolle Unterstützung. Besonders viele Helfer entscheiden sich später für feste monatliche Termine.`,
    ],
    ads: [
      'Eine kurze Führung zeigt Aufzug, barrierefreie Plätze und technische Hilfsmittel.',
      'Die praktischen Übungen behandeln Untertitel, Audiodeskription und eine klare Begleitung zum Sitzplatz.',
      'Filmtitel und konkrete Besucherdaten werden in der Gesprächsrunde nicht genannt.',
      'Kinos erhalten danach einen schriftlichen Bericht mit Prioritäten und realistischen Zeitplänen.',
      'Alle vier Termine finden vor der regulären Öffnungszeit des Kulturhauses statt.',
      'Am Sonntag wird gemeinsam eine Vorstellung vorbereitet und am Abend praktisch begleitet.',
      'Videos sind untertitelt; zusätzliche Aufgaben können mit einem Bildschirmleser bearbeitet werden.',
      'Erwartet werden Erfahrungen mit barrierefreien Veranstaltungen und sicherer Umgang mit Beschwerden.',
      'Kinder testen spielerisch verschiedene Zugänge zu Film, Ton und Sprache.',
      'Die Begleitung richtet sich an Personen, die erstmals ein inklusives Kulturprojekt koordinieren.',
    ],
    opinions: [
      'Ein festes Angebot schafft Verlässlichkeit; niemand sollte vor jedem Kinobesuch lange nach Sonderterminen suchen müssen.',
      'Kleine Kinos können nicht für jeden Film mehrere technische Fassungen bezahlen und brauchen flexible Förderung.',
      'Untertitel und gute Zugänge helfen auch älteren Menschen oder Gästen, die Deutsch noch lernen.',
      'Entscheidend ist die Nachfrage vor Ort; eine starre Zahl von Vorstellungen kann am Publikum vorbeigehen.',
      'Wenn alle Häuser regelmäßig Termine anbieten, verteilt sich die Verantwortung gerechter.',
      'Ich bevorzuge gemeinsame Branchenstandards und Zuschüsse statt einer Pflicht mit Strafen.',
      'Mindestens ein verlässlicher Termin pro Monat ist ein realistischer Anfang und macht Teilhabe planbar.',
    ],
    rules: `

BARRIEREFREIHEIT
Rollstuhlplätze und Plätze für Begleitpersonen werden bis dreißig Minuten vor Beginn reserviert. Mobile Empfänger für Audiodeskription gibt die Infotheke gegen ein Pfand aus. Assistenzhunde sind im gesamten Haus erlaubt und benötigen keine zusätzliche Eintrittskarte.

VERANSTALTUNGSENDE
Nach Abendveranstaltungen begleitet der Sicherheitsdienst Gäste auf Wunsch bis zum Taxistand. Der Seitenausgang mit Rampe bleibt bis dreißig Minuten nach Ende geöffnet. Technische Geräte werden noch am selben Abend zurückgegeben.`,
    forumQuote: 'Alle Kinos sollten regelmäßig barrierefreie Vorstellungen anbieten. Verbindliche Termine schaffen Verlässlichkeit und spontane Teilhabe, gleichzeitig brauchen besonders kleine Häuser dauerhafte finanzielle und technische Unterstützung, damit das Angebot langfristig finanzierbar bleibt.',
  },
  9: {
    personal: `In meiner Arbeitsgruppe ging es um sichere Fahrradwege. Wir erhielten zunächst eine Kostenübersicht und mussten entscheiden, welche Idee innerhalb des Budgets realistisch war. Einige wollten das gesamte Geld für eine neue Verbindung ausgeben, andere bevorzugten viele kleine Verbesserungen. Ich protokollierte die Argumente und achtete darauf, dass nicht nur die lautesten Personen sprachen. Am Ende einigten wir uns auf zwei beleuchtete Kreuzungen und einen kurzen neuen Abschnitt.`,
    press: [
      `Jede Station zeigt dieselben Grundinformationen, doch Beispiele und Karten stammen aus dem jeweiligen Stadtteil. Mitarbeitende erklären auch, welche Ausgaben gesetzlich festgelegt sind und deshalb nicht zur Abstimmung stehen. Die Rückmeldungen werden veröffentlicht, damit sichtbar bleibt, welche Fragen besonders häufig unklar waren.`,
      `Zu den Aufgaben gehören das Sortieren eingereichter Vorschläge, die Ausgabe neutraler Informationsblätter und Hilfe beim Finden eines Abstimmungsraums. Freiwillige dürfen keine Empfehlung für ein Projekt aussprechen. Vor jedem Termin unterschreiben sie deshalb eine kurze Regel zur politischen Neutralität.`,
    ],
    ads: [
      'Vorgestellt werden Ablauf, zulässige Vorschläge und der Unterschied zwischen Beratung und Entscheidung.',
      'Die Gruppe erstellt am Nachmittag selbst eine verständliche Kostenübersicht für ein Beispielprojekt.',
      'Besprochen werden nur Methoden; laufende politische Kampagnen sind ausdrücklich ausgeschlossen.',
      'Die externe Beratung umfasst Interviews mit Verwaltung, Politik und ausgewählten Einwohnern.',
      'Alle Termine bauen aufeinander auf; einzelne Vormittage können nicht getrennt gebucht werden.',
      'Die Unterkunft liegt in der Nähe des Tagungsortes, Mahlzeiten werden gemeinsam organisiert.',
      'Ein Glossar erklärt Verwaltungsbegriffe; Fragen an eine Fachperson sind nicht Bestandteil des Kurses.',
      'Teilnehmende müssen bereits eine öffentliche Sitzung moderiert und einen Grundkurs besucht haben.',
      'Kinder entscheiden über ein kleines Beispielbudget, während Erwachsene die Regeln kennenlernen.',
      'Im Mentoring wird eine eigene Beteiligungsveranstaltung von der Einladung bis zur Auswertung begleitet.',
    ],
    opinions: [
      'Wer von einer Entscheidung direkt betroffen ist, sollte nachvollziehbar über einen begrenzten Betrag mitbestimmen können.',
      'Bei komplizierten Bauvorhaben fehlen vielen Abstimmenden Informationen zu Folgekosten und gesetzlichen Pflichten.',
      'Ein klarer Kostenrahmen zwingt Verwaltung und Bevölkerung, Prioritäten offen zu diskutieren.',
      'Gewählte Räte tragen Verantwortung für die gesamte Stadt und dürfen diese nicht an einzelne Gruppen abgeben.',
      'Bei uns wurden kleine, lange verschobene Projekte umgesetzt, die in normalen Haushaltsberatungen kaum vorkamen.',
      'Online-Abstimmungen können leicht von gut organisierten Interessengruppen bestimmt werden.',
      'Mit neutralen Informationen und einer Abstimmung vor Ort halte ich den begrenzten Bürgerhaushalt für sinnvoll.',
    ],
    rules: `

VORSCHLÄGE
Ein Vorschlag muss einen konkreten Ort, ein Ziel und eine erreichbare Kontaktperson nennen. Projekte außerhalb des Stadtgebiets sowie rein private Anschaffungen werden nicht zugelassen. Die Verwaltung prüft Kosten und rechtliche Umsetzbarkeit, bewertet jedoch nicht die politische Idee.

ABSTIMMUNG
Jede berechtigte Person erhält nach der Ausweiskontrolle einen Stimmzettel. Fotografieren in der Wahlkabine ist nicht gestattet. Wer Unterstützung beim Lesen braucht, kann eine selbst gewählte Hilfsperson mitbringen oder das Personal im Bürgerbüro ansprechen.`,
    forumQuote: 'Einwohner sollten direkt über einen begrenzten Teil des Stadtbudgets entscheiden. Das kann lokale Bedürfnisse sichtbar machen, funktioniert aber nur mit verständlichen Kostenangaben, transparenten Regeln und einer Abstimmung, die auch offline zugänglich ist.',
  },
  10: {
    personal: `Am Vormittag kontrollierten wir gemeinsam die Ausrüstung eines Fahrzeugs. Ich las die Liste vor, während zwei erfahrene Mitglieder Schläuche, Lampen und Schutzkleidung prüften. Dabei fehlte eine kleine Tasche mit Ersatzbatterien. Sie war nicht verloren, sondern nach einer Schulung im falschen Schrank abgelegt worden. Am Nachmittag übten wir, einen verrauchten Raum zu durchsuchen. Ich durfte nur bis zur Sicherheitslinie mitgehen und übernahm danach die Zeitmessung.`,
    press: [
      `An einer Station vergleichen Besucher verschiedene Warnsignale und erfahren, warum Sirenen allein nicht jede Person erreichen. Eine andere Station zeigt, wie Nachbarschaften ältere oder hörgeschädigte Menschen informieren können, ohne private Daten offen auszulegen. Das Konzept wurde nach einem Stromausfall entwickelt, bei dem digitale Nachrichten viele Haushalte zu spät erreichten.`,
      `Kurze Einsätze bestehen aus der Vorbereitung von Informationsständen, der Kontrolle von Rauchmelderlisten und der Markierung eines Übungswegs. An echten Notfalleinsätzen nehmen ausschließlich ausgebildete Mitglieder teil. Vor jedem Termin erklärt eine feste Kontaktperson Sicherheitsregeln und Aufgaben. Wer regelmäßig mitarbeiten möchte, kann anschließend einen unverbindlichen Informationsabend besuchen.`,
    ],
    ads: [
      'Eine Fahrzeugbesichtigung findet nur statt, wenn kein Einsatz den Ablauf unterbricht.',
      'Praktisch geübt werden der Umgang mit Feuerlöschern und das richtige Verhalten bei Rauch.',
      'Die Online-Runde behandelt Ausbildung und Organisation, nicht laufende oder vergangene Einsätze.',
      'Neben Interviews gehört eine schriftliche Auswertung der internen Alarmwege zum Angebot.',
      'Die Bescheinigung setzt Anwesenheit an allen vier Vormittagen voraus.',
      'Für die Übernachtung wird ein Schlafsack benötigt; Schutzkleidung stellt die Feuerwehr.',
      'Die Videos haben Untertitel und lassen sich nach jeder Einheit erneut ansehen.',
      'Vorausgesetzt werden Grundausbildung, Funklehrgang und aktive Mitarbeit in einer Einheit.',
      'Kinder lernen Fluchtwege kennen, Erwachsene kontrollieren parallel einen Beispielhaushalt.',
      'Die Mentorin begleitet Planung, Teamkommunikation und die erste selbst organisierte Übung.',
    ],
    opinions: [
      'Viele Haushalte haben alte Rauchmelder oder wissen nicht, wie sie einen kleinen Brand sicher melden.',
      'Informationen sind wichtig, doch ein kostenloser Pflichtkurs würde Personal und Gemeinden überfordern.',
      'Ein kurzer Kurs kann gefährliche Fehler verhindern und sollte deshalb ohne finanzielle Hürde zugänglich sein.',
      'Videos und freiwillige Termine reichen aus; Erwachsene müssen selbst Verantwortung für ihre Sicherheit übernehmen.',
      'Wenn Versicherungen und Gemeinden die Kosten teilen, profitieren auch Haushalte mit wenig Einkommen.',
      'Ein allgemeiner Kurs berücksichtigt Wohnungen, Heizungen und persönliche Einschränkungen nur unzureichend.',
      'Kostenlos sollte er auf jeden Fall sein; ob die Teilnahme verpflichtend wird, kann später geprüft werden.',
    ],
    rules: `

ÜBUNGEN
Alarmübungen werden vorab angekündigt und von einer ausgebildeten Person geleitet. Zuschauer bleiben hinter den markierten Linien. Maschinen, Fahrzeuge und Atemschutzgeräte dürfen nur auf ausdrückliche Anweisung berührt werden. Bei einem echten Alarm endet die Veranstaltung sofort.

KLEIDUNG
Feste Schuhe und lange Kleidung sind auf dem Außengelände vorgeschrieben. Schutzhelme werden am Eingang ausgegeben und beim Verlassen zurückgegeben. Nasse oder beschädigte Ausrüstung wird nicht selbst gereinigt, sondern unmittelbar der Einsatzzentrale gemeldet.`,
    forumQuote: 'Ein grundlegender Brandschutzkurs sollte für alle Haushalte kostenlos sein. Schon wenige praktische Kenntnisse können schwere Fehler verhindern, allerdings benötigen Gemeinden dafür ausreichend Personal und passende Termine, die auch Berufstätige erreichen.',
  },
};

type CalibrationMaterial = Pick<FidelityMaterial, 'personal' | 'press' | 'opinions' | 'rules'>;

const CALIBRATION: Record<number, CalibrationMaterial> = {
  2: {
    personal: 'Außerdem habe ich gelernt, dass Untertitel vor der Vorführung auf unterschiedlichen Leinwänden getestet werden müssen. Eine Schrift, die am Computer gut aussieht, kann im großen Kinosaal zu klein sein. Beim nächsten Festival möchte ich deshalb schon während der technischen Probe dabei sein.',
    press: [
      'Mehrere Beschäftigte wünschen sich nun eine Anzeige am Eingang, die freie Plätze in den stillen Zonen zeigt. Andere befürchten, dadurch würde die Nutzung unnötig kontrolliert. Diese Frage soll ebenfalls in kleinen Arbeitsgruppen besprochen werden.',
      'Wer Kleidung behält, wird um eine freiwillige Spende gebeten, muss aber nichts bezahlen. Die Initiative bittet erfolgreiche Bewerber außerdem um eine kurze Rückmeldung, damit künftige Beratungen besser zu verschiedenen Branchen passen.',
    ],
    opinions: [
      'Gerade bei schwierigen Entscheidungen hilft mir ein sichtbares Nicken oder ein fragender Blick.',
      'Eine verbindliche Regel würde mich bei wichtigen Gesprächen eher ausschließen als unterstützen.',
      'Arbeitgeber können Vertrauen nicht dadurch herstellen, dass sie ständig in private Räume schauen.',
      'Nach einigen Wochen kannten wir uns gut genug, um bei kurzen Informationen auf das Bild zu verzichten.',
      'Wer konzentriert zuhört, sollte das auch durch seine Körpersprache zeigen und auf Nachfragen reagieren.',
      'Auch Menschen mit Behinderungen können durch eine dauernde Bildpflicht zusätzlich belastet werden.',
      'So bleibt die Regel nachvollziehbar und wird nicht zu einer allgemeinen Kontrolle der Anwesenheit.',
    ],
    rules: 'AUSKUNFT\nDas Personal hilft bei der Suche nach Beständen, führt jedoch keine privaten Forschungen durch. Ausführliche schriftliche Anfragen werden in der Reihenfolge ihres Eingangs beantwortet. Für eine Antwort werden bis zu zehn Werktage eingeplant. Telefonische Auskünfte beschränken sich auf Öffnungszeiten und vorhandene Sammlungen.',
  },
  3: {
    personal: 'Am Sonntag half ich noch bei einem Frühstück im Hof. Dort wurden keine Hausfragen entschieden; es ging nur darum, sich ohne Tagesordnung zu treffen. Gerade diese lockere Runde machte es mir leichter, Namen und Wohnungen zuzuordnen. Nun fühlt sich das große Gebäude schon weniger fremd an.',
    press: [
      'Die Bibliothek bietet nach vier Wochen einen offenen Wiederholungstermin an. Dort können Fragen geklärt werden, die erst beim selbstständigen Ausprobieren entstanden sind. Eine dauerhafte technische Betreuung zu Hause ist jedoch nicht Teil des Angebots.',
      'Nach einem Jahr sollen alle beteiligten Häuser berichten, welche Vereinbarungen tatsächlich genutzt wurden. Die Stadt interessiert besonders, ob Konflikte früher angesprochen werden und ob neue Bewohner schneller Kontakt finden.',
    ],
    opinions: [
      'Dadurch sparen wir Platz und Kosten, ohne bei spontanen Besuchen auf eine Lösung verzichten zu müssen.',
      'Bei dringenden Fragen ist oft unklar, wer sprechen darf und wann eine Entscheidung wirklich verbindlich wird.',
      'Solche Kontakte entstehen in einem normalen Mietshaus nicht automatisch und sind für uns sehr wertvoll.',
      'Deshalb müssen Aufgaben freiwillig bleiben und dürfen nicht an persönliche Beziehungen geknüpft werden.',
      'Wer zeitweise weniger leisten kann, übernimmt später eine andere Aufgabe oder tauscht rechtzeitig.',
      'Die Wohnungstür bleibt eine klare Grenze, auch wenn im Erdgeschoss gemeinsam gefeiert oder gearbeitet wird.',
      'Diese Freiheit unterscheidet das Projekt für mich von einer Gemeinschaft, die ständige Teilnahme verlangt.',
    ],
    rules: 'POST UND LIEFERUNGEN\nPakete werden nur angenommen, wenn die empfangende Person die Verwaltung vorher schriftlich beauftragt hat. Lieferdienste benutzen den Haupteingang und stellen keine Gegenstände in Fluren oder vor Brandschutztüren ab. Nicht abgeholte Pakete werden nach drei Werktagen an den Absender zurückgegeben.',
  },
  4: {
    personal: 'Zum Abschied bekam jede Gruppe eine kleine Karte mit den häufigsten Arten der Region. Sie enthält keine langen Erklärungen, sondern gut erkennbare Merkmale und einen Hinweis auf die passende Jahreszeit. Damit will ich vor dem nächsten Termin im Park üben, ohne gleich jede Beobachtung zu melden.',
    press: [
      'Personenbezogene Angaben werden nach Abschluss der Aktion getrennt von den Beobachtungsdaten gespeichert. Wer seinen Namen nicht nennen möchte, kann Meldungen unter einer zufälligen Kennnummer abgeben. Die wissenschaftliche Prüfung bleibt davon unberührt.',
      'Weil die Wege nicht überall barrierefrei sind, nennt die Anmeldung genaue Informationen zu Steigung und Untergrund. Für einen Teil der Termine gibt es eine kürzere Route, die auch mit Rollstuhl oder Kinderwagen genutzt werden kann.',
    ],
    opinions: [
      'So bleibt der Eingang sichtbar, während Beete und Bäume die meiste Zeit wirklich dunkel sind.',
      'Eine sparsame Lampe mit guter Ausrichtung ist für mich deshalb ein vernünftiger Kompromiss.',
      'Auch unsere Nachbarn stört kein Licht mehr, das früher direkt in ihre Schlafzimmer fiel.',
      'Besonders bei Treppen und unebenen Wegen kann eine zu strenge Regel neue Risiken schaffen.',
      'Eine Beratung durch die Gemeinde wäre hilfreicher als nur die Forderung, alle Lampen auszuschalten.',
      'Dann wissen alle, wann Rücksicht erwartet wird, und Ausnahmen können klar begründet werden.',
      'Damit bleibt die Entscheidung beim Haushalt, ohne unnötiges Dauerlicht als normal hinzunehmen.',
    ],
    rules: 'AUSSTELLUNG\nModelle und Bildschirme im Informationsraum dürfen von allen Gästen benutzt werden. Defekte werden dem Personal gemeldet; Geräte dürfen nicht selbst geöffnet werden. Jacken und größere Taschen bleiben in den kostenlosen Schließfächern neben dem Eingang.',
  },
  5: {
    personal: 'Am Ende bat uns die Turnierleitung um eine kurze Rückmeldung. Mehrere Jugendliche hatten die Gesprächsecke zunächst für eine Strafe gehalten. Beim nächsten Termin sollen deshalb farbige Schilder erklären, dass die Teilnahme freiwillig ist und Konfliktlotsen keine Entscheidungen über Schuld treffen.',
    press: [
      'Nach jedem Rundgang werden die anonymen Fragen thematisch sortiert. Daraus entsteht eine frei zugängliche Internetseite mit kurzen Antworten und Kontaktdaten. Persönliche Fälle werden dort nicht veröffentlicht, sondern an die zuständige Beratung weitergeleitet.',
      'Organisationen melden Aufgaben spätestens zwei Wochen vorher an. Die Initiative prüft dann, ob Dauer, Verantwortung und notwendige Kenntnisse realistisch beschrieben sind. Unklare oder unbezahlte reguläre Arbeit wird nicht als freiwillige Kurzaufgabe vermittelt.',
    ],
    opinions: [
      'Entscheidend ist, dass sie nicht bestrafen, sondern beiden Seiten beim ruhigen Gespräch helfen.',
      'Schwere Fälle gehören sofort zu Lehrkräften, Schulsozialarbeit oder anderen zuständigen Erwachsenen.',
      'Das Programm zeigt ihnen zugleich, wann sie eine Situation nicht mehr allein bearbeiten dürfen.',
      'Konflikte sollten im Unterricht von allen besprochen werden und nicht bei wenigen Spezialisten landen.',
      'Auch zurückhaltende Jugendliche erleben, dass ihre Beobachtungen und Fragen im Schulalltag wichtig sind.',
      'Eine monatliche Besprechung mit Fachpersonal muss deshalb fester Bestandteil der Ausbildung sein.',
      'Unter diesen Bedingungen ist die Aufgabe eine Lernchance und keine billige Ersatzberatung.',
    ],
    rules: 'BESCHWERDEN\nBeschwerden über Organisation oder Verhalten des Personals werden schriftlich an die Leitung gerichtet. Sie bestätigt den Eingang innerhalb von zwei Werktagen und antwortet normalerweise innerhalb von zwei Wochen. Eine Beschwerde hat keinen Einfluss auf bereits vereinbarte Beratungstermine.',
  },
  6: {
    personal: 'Kurz vor Mitternacht klarte der Himmel noch einmal auf. Wir konnten Saturn sehen, allerdings nur für wenige Minuten. Damit alle an die Reihe kamen, begrenzte die Leiterin die Beobachtungszeit am großen Teleskop. Niemand beschwerte sich, denn auf einem Bildschirm war gleichzeitig das vergrößerte Bild zu sehen.',
    press: [
      'Besucher können direkt am Ausgang markieren, welche Erklärung hilfreich oder noch unklar war. Die Ausstellung wird deshalb nicht erst nach Jahren, sondern in kleinen Schritten angepasst. Auch fremdsprachige Kurzfassungen sind für die nächste Saison geplant.',
      'Die Initiative versichert alle vermittelten Helfer für den jeweiligen Termin. Fahrtkosten werden nur erstattet, wenn dies in der Aufgabenbeschreibung ausdrücklich steht. Eine Bezahlung gibt es nicht, Fortbildungen und Eintritt zu ausgewählten Vorträgen sind jedoch kostenlos.',
    ],
    opinions: [
      'Das spart Energie und schützt zugleich Menschen, die nachts schlafen oder den Himmel beobachten möchten.',
      'Ein Restaurant benötigt andere Zeiten als ein Büro, das abends vollständig geschlossen ist.',
      'Die Regeln können Helligkeit und Uhrzeit verbinden, statt jede beleuchtete Fläche gleich zu behandeln.',
      'Solche Lösungen sind genauer und lassen sich bei veränderten Öffnungszeiten leichter anpassen.',
      'Gute Sichtbarkeit bis zum Abend reicht aus; danach sollte die Umgebung Vorrang haben.',
      'Die Stadt sollte zuerst beraten und messen, bevor sie neue Vorschriften und Strafen einführt.',
      'Klare Ausnahmen zeigen, dass eine Begrenzung weder Sicherheit noch wichtige Orientierung verhindern muss.',
    ],
    rules: 'BIBLIOTHEK\nBücher und Sternkarten können im Leseraum ohne Anmeldung genutzt werden. Eine Ausleihe nach Hause ist nur für Mitglieder des Fördervereins möglich. Aktuelle Zeitschriften und historische Karten bleiben grundsätzlich im Haus. Kopien bestellt man an der Kuppelaufsicht.',
  },
  7: {
    personal: 'Bei der Abschlussrunde besprachen wir nicht nur Fehler, sondern auch Entscheidungen, die gut funktioniert hatten. Meine Nachfrage beim Funkspruch wurde als positives Beispiel genannt. Dadurch verstand ich, dass im Rettungsdienst nicht Schnelligkeit allein zählt: Informationen müssen auch eindeutig sein, damit kein Team am falschen Ort sucht.',
    press: [
      'Alle Besucher erhalten eine kleine Karte, auf der die wichtigsten Angaben für einen Notruf zusammengefasst sind. Die Stadt hofft, dass diese Karte nicht in einer Schublade verschwindet, sondern zum Beispiel im Auto oder Wanderrucksack mitgenommen wird.',
      'Nach jeder Aufgabe melden Organisation und Helfer getrennt zurück, ob Beschreibung und tatsächlicher Aufwand übereinstimmten. Bei wiederholten Problemen wird eine Organisation vorübergehend nicht mehr vermittelt. So soll aus zeitlicher Flexibilität kein Mangel an Schutz entstehen.',
    ],
    opinions: [
      'Ohne diese Anerkennung müssen Helfer nach einer anstrengenden Nacht direkt zur regulären Arbeit gehen.',
      'Deshalb braucht es einen finanziellen Ausgleich, bevor man Betrieben eine weitere Verpflichtung auferlegt.',
      'Die Regel sollte für dokumentierte Einsätze gelten und eine klare jährliche Obergrenze enthalten.',
      'Eine freiwillige Vereinbarung zwischen Beschäftigten und Betrieb lässt sich besser an einzelne Fälle anpassen.',
      'Das zeigt, dass verantwortungsvolle Unterstützung nicht automatisch zu Problemen im Betrieb führt.',
      'Dann tragen nicht einzelne Unternehmen allein die Kosten für eine Aufgabe der gesamten Gesellschaft.',
      'Eine solche Balance verhindert Missbrauch und macht das wichtige Ehrenamt langfristig möglich.',
    ],
    rules: 'ABWESENHEIT\nWer einen Kurstag nicht besuchen kann, informiert die Materialausgabe vor Beginn. Bei Krankheit kann innerhalb von sechs Monaten ein Ersatztermin gebucht werden. Eine teilweise Teilnahme wird nicht bescheinigt. Bereits ausgegebene Lernunterlagen dürfen für den Ersatztermin behalten werden.',
  },
  8: {
    personal: 'Die Regisseurin erklärte später, dass Audiodeskription schon beim Schreiben des Drehbuchs mitgedacht werden kann. Dann bleiben zwischen wichtigen Dialogen passende Pausen. Diese Planung kostet nicht unbedingt mehr Geld, verlangt aber frühe Zusammenarbeit. Beim nächsten Treffen darf ich einen kurzen Szenentext selbst ausprobieren.',
    press: [
      'Zusätzlich werden Informationen zur Anreise geprüft. Ein stufenloser Saal hilft wenig, wenn der Weg von der Haltestelle falsch beschrieben ist. Deshalb arbeiten Veranstalter auch mit Verkehrsbetrieben und benachbarten Geschäften zusammen.',
      'Nach jeder Vorstellung können Gäste anonym mitteilen, was gut funktioniert hat. Diese Hinweise gehen sowohl an das Kino als auch an die technische Produktion. So werden wiederkehrende Probleme nicht bei jeder Veranstaltung neu entdeckt.',
    ],
    opinions: [
      'Spontane Besuche werden dadurch möglich, und barrierefreie Angebote sind keine seltene Sonderveranstaltung mehr.',
      'Eine gemeinsame technische Plattform wäre für sie hilfreicher als dieselbe Vorgabe für jedes Haus.',
      'Auch Menschen ohne Behinderung nutzen klare Dialoge, gute Lesbarkeit und verständliche Orientierung gern.',
      'Das Publikum sollte mitentscheiden, welche Filme und Uhrzeiten tatsächlich regelmäßig angeboten werden.',
      'Erst ein wiederkehrender Plan erlaubt es Schulen, Familien und Gruppen, ihren Besuch sicher vorzubereiten.',
      'Freiwillige Ziele könnten schneller an neue Formate angepasst werden und trotzdem messbar bleiben.',
      'Von diesem Mindestangebot aus kann jedes Kino sein Programm nach Nachfrage weiter ausbauen.',
    ],
    rules: 'GARDEROBE\nGroße Taschen, nasse Jacken und Schirme werden an der kostenlosen Garderobe abgegeben. Medizinisch notwendige Gegenstände dürfen mit in den Saal genommen werden. Das Personal zeigt auf Wunsch einen sicheren Aufbewahrungsort für Mobilitätshilfen, die während der Vorstellung nicht gebraucht werden.',
  },
  9: {
    personal: 'Vor der Schlussrunde stellte eine Mitarbeiterin klar, dass das Ergebnis noch rechtlich geprüft werden muss. Eine Abstimmung bedeutet also nicht, dass am nächsten Tag gebaut wird. Trotzdem wird zu jedem erfolgreichen Vorschlag ein Zeitplan veröffentlicht. Dadurch können Einwohner später nachvollziehen, warum sich ein Projekt verzögert.',
    press: [
      'Menschen mit wenig Deutsch können vor Ort eine Zusammenfassung in mehreren Sprachen lesen. Die eigentlichen Vorschläge bleiben vollständig erhalten, damit keine politischen Inhalte durch eine zu kurze Übersetzung verloren gehen.',
      'Bei Fragen zur eigenen Wahlentscheidung verweisen Freiwillige an die neutralen Projektbeschreibungen. Beschwerden über den Ablauf werden dokumentiert und an eine unabhängige Stelle geschickt. Diese Trennung soll Vertrauen in das Verfahren sichern.',
    ],
    opinions: [
      'Die endgültige Verantwortung für Sicherheit und Recht bleibt trotzdem bei Verwaltung und Rat.',
      'Eine kurze Abstimmung kann diese Zusammenhänge nicht immer ausreichend erklären oder abwägen.',
      'Auch abgelehnte Vorschläge liefern wertvolle Informationen über Probleme in einzelnen Vierteln.',
      'Bürgerbeteiligung sollte sie beraten und kontrollieren, aber nicht bei jeder Ausgabe ersetzen.',
      'Die veröffentlichten Zeitpläne haben außerdem gezeigt, warum manche scheinbar einfachen Ideen länger dauern.',
      'Präsenztermine und zufällig ausgewählte Gruppen würden ein ausgeglicheneres Bild ergeben.',
      'So bleibt die Entscheidung offen, ohne fachliche und rechtliche Grenzen zu ignorieren.',
    ],
    rules: 'ERGEBNISSE\nDie vorläufigen Ergebnisse werden am Abend online und im Rathaus ausgehängt. Eine unabhängige Gruppe prüft auffällige Stimmzahlen, bevor das Endergebnis bestätigt wird. Persönliche Daten der Abstimmenden werden nicht zusammen mit ihrer Entscheidung gespeichert oder veröffentlicht.',
  },
  10: {
    personal: 'Beim gemeinsamen Essen erzählten die Mitglieder, wie unterschiedlich ihre normalen Berufe sind. Eine Feuerwehrfrau arbeitet als Bäckerin, ein anderer studiert Informatik. Die Ausbildung findet deshalb meist abends und an Wochenenden statt. Mir wurde klar, wie viel Planung nötig ist, damit im Alarmfall trotzdem genügend geschulte Personen verfügbar sind.',
    press: [
      'Die Stationen sind so angeordnet, dass Besucher einen eigenen Notfallplan für zu Hause erstellen. Am Ausgang prüft niemand diesen Plan; er bleibt privat. Fachleute beantworten jedoch Fragen zu Fluchtwegen, Treffpunkten und der Unterstützung von Personen, die Hilfe brauchen.',
      'Die Feuerwehr meldet nach dem Termin, ob alle Sicherheitsregeln eingehalten wurden. Wer unentschuldigt fehlt, wird für drei Monate nicht mehr vermittelt. Diese Regel ist notwendig, weil auch einfache Vorbereitungsaufgaben fest in den Tagesplan eingebaut werden.',
    ],
    opinions: [
      'Viele Brände entstehen durch alltägliche Fehler, die in einer praktischen Stunde leicht gezeigt werden können.',
      'Freiwillige offene Termine und verständliche Informationen erreichen Menschen ohne unnötigen Zwang.',
      'Der Kurs sollte in mehreren Sprachen und zu unterschiedlichen Zeiten angeboten werden.',
      'Wer besondere Risiken hat, kann stattdessen eine individuelle Beratung bei der Feuerwehr anfragen.',
      'So wird Vorsorge nicht vom Einkommen abhängig, und Feuerwehren müssen die Aufgabe nicht allein finanzieren.',
      'Eine gezielte Beratung vor Ort wäre für solche Fälle wirksamer als ein allgemeines Programm.',
      'Zuerst muss jedoch gezeigt werden, dass genügend Kurse auch am Abend und Wochenende verfügbar sind.',
    ],
    rules: 'BESUCHER\nGäste tragen auf dem Übungsgelände einen sichtbaren Besucherausweis und bleiben bei ihrer Gruppe. Kinder unter vierzehn Jahren nehmen nur an ausdrücklich gekennzeichneten Familienveranstaltungen teil. Essen und heiße Getränke sind ausschließlich im Aufenthaltsraum gestattet.',
  },
};

const AD_CALIBRATION: Record<number, readonly string[]> = {
  2: ['Ein Handbuch ist im Preis enthalten.', 'Termine sind auch online möglich.', 'Kopfhörer stehen im Studio bereit.', 'Ein Zertifikat ist nicht vorgesehen.', 'Die Gruppe bleibt unter zehn Personen.', 'Die Treffen finden abwechselnd online statt.', 'Eigene Beispiele können vorher geschickt werden.', 'Eine kostenlose Software wird vorab installiert.', 'Die Veranstaltung endet gegen 21 Uhr.', 'Danach gibt es ein offenes Treffen.'],
  3: ['Der Raum ist stufenlos erreichbar.', 'Die Beratung dauert höchstens eine Stunde.', 'Ein Vorgespräch ist nicht erforderlich.', 'Termine sind auch zu zweit möglich.', 'Die Planung wird schriftlich festgehalten.', 'Materialkosten werden vorher bekannt gegeben.', 'Die Auswertung bleibt für Mitglieder sichtbar.', 'Leihgeräte sind nur begrenzt vorhanden.', 'Schutzkleidung wird bei Bedarf ausgegeben.', 'Alle Gespräche bleiben vertraulich.'],
  4: ['Anmeldeschluss ist jeweils am Mittwoch.', 'Gummistiefel können ausgeliehen werden.', 'Die Beobachtungen bleiben anonym.', 'Die Strecke ist vier Kilometer lang.', 'Meldungen dauern meist unter fünf Minuten.', 'Eine Anmeldung pro Familie genügt.', 'Stromkosten trägt das Forschungsprojekt.', 'Die Bestimmung erfolgt noch am selben Tag.', 'Eine Einführung findet jeden Monat statt.', 'Ersatztermine werden per E-Mail mitgeteilt.'],
  5: ['Der Zugang ist auch spontan möglich.', 'Ein Mittagessen ist nicht enthalten.', 'Das Treffen wird nicht aufgezeichnet.', 'Die Ergebnisse gehören nur dem Auftraggeber.', 'Ratenzahlung kann vorher vereinbart werden.', 'Die Gruppe kocht am Samstag gemeinsam.', 'Der Zugang endet automatisch nach sechs Wochen.', 'Die Fälle stammen aus dem Berufsalltag.', 'Eine Anmeldung pro Familie reicht aus.', 'Termine werden gemeinsam festgelegt.'],
  6: ['Kinder zahlen keinen Eintritt.', 'Warme Getränke gibt es im Foyer.', 'Das Treffen dauert neunzig Minuten.', 'Texte werden vorab gemeinsam ausgewählt.', 'Fragen können schriftlich eingereicht werden.', 'Der Treffpunkt liegt an der Bushaltestelle.', 'Eine Internetverbindung ist erforderlich.', 'Eigene Beobachtungsbücher sind willkommen.', 'Materialkosten sind im Familienpreis enthalten.', 'Notizen bleiben bei den Teilnehmenden.'],
  7: ['Der Informationsabend ist kostenlos.', 'Eine Mittagspause ist eingeplant.', 'Das Treffen wird fachlich moderiert.', 'Fahrtkosten sind nicht eingeschlossen.', 'Ein Erste-Hilfe-Kurs ist keine Voraussetzung.', 'Die Anreise erfolgt in eigener Verantwortung.', 'Fragen werden im Forum gesammelt.', 'Schutzkleidung wird am Kursort ausgegeben.', 'Die Familien arbeiten in kleinen Gruppen.', 'Ziele werden schriftlich vereinbart.'],
  8: ['Eine Anmeldung ist trotzdem erforderlich.', 'Der Praxisteil findet im Kinosaal statt.', 'Eine Zusammenfassung wird später verschickt.', 'Technische Umbauten sind nicht eingeschlossen.', 'Der Eingang öffnet bereits um sieben Uhr.', 'Die Gruppe endet nach der Vorstellung.', 'Tastatursteuerung wird vollständig unterstützt.', 'Ein Nachweis wird bei der Anmeldung verlangt.', 'Alle Stationen sind stufenlos zugänglich.', 'Treffen sind auch digital möglich.'],
  9: ['Der Eintritt ist frei.', 'Getränke sind im Kurspreis enthalten.', 'Eine Aufzeichnung ist ausgeschlossen.', 'Der Abschlussbericht bleibt sechs Monate online.', 'Die Termine beginnen pünktlich.', 'Arbeitsmaterial wird vorher verschickt.', 'Der Kurs endet mit einem Beispieltest.', 'Referenzen werden bei der Anmeldung geprüft.', 'Eine Anmeldung pro Haushalt genügt.', 'Die Begleitung umfasst drei persönliche Treffen.'],
  10: ['Fragen können vorab gesendet werden.', 'Die Teilnahmegebühr wird vor Ort bezahlt.', 'Das Gespräch dauert eine Stunde.', 'Empfehlungen werden schriftlich festgehalten.', 'Der Raum öffnet um halb acht.', 'Ein Abendessen ist nicht vorgesehen.', 'Ein Computer ist nicht erforderlich.', 'Die Gruppe bleibt auf acht Personen begrenzt.', 'Familien erhalten eine gemeinsame Mappe.', 'Die Termine folgen dem Ausbildungsplan.'],
};

const ITEM_PERMUTATIONS: Record<number, readonly number[]> = {
  1: [0, 1, 2, 3, 4, 5],
  2: [0, 2, 1, 3, 4, 5],
  3: [0, 1, 2, 4, 3, 5],
  4: [0, 2, 1, 3, 5, 4],
  5: [0, 2, 1, 4, 3, 5],
  6: [1, 0, 2, 3, 5, 4],
  7: [0, 1, 3, 2, 4, 5],
  8: [1, 0, 2, 4, 3, 5],
  9: [0, 2, 1, 3, 5, 4],
  10: [1, 0, 3, 2, 4, 5],
};

const OPINION_PERMUTATIONS: Record<number, readonly number[]> = {
  1: [0, 1, 2, 3, 4, 5, 6],
  2: [0, 2, 1, 3, 5, 4, 6],
  3: [1, 0, 2, 4, 3, 6, 5],
  4: [1, 0, 2, 3, 4, 5, 6],
  5: [2, 0, 1, 4, 3, 5, 6],
  6: [1, 3, 0, 2, 5, 6, 4],
  7: [3, 1, 0, 2, 6, 4, 5],
  8: [2, 1, 4, 0, 3, 6, 5],
  9: [1, 4, 0, 3, 2, 5, 6],
  10: [3, 0, 2, 5, 1, 4, 6],
};

const MATCHING_PERMUTATIONS: Record<number, readonly number[]> = {
  1: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  2: [3, 0, 7, 1, 9, 4, 2, 8, 5, 6],
  3: [6, 2, 9, 4, 0, 8, 1, 5, 7, 3],
  4: [1, 8, 3, 6, 2, 9, 5, 0, 4, 7],
  5: [5, 1, 8, 3, 0, 6, 9, 2, 7, 4],
  6: [2, 7, 0, 9, 4, 1, 6, 8, 3, 5],
  7: [8, 4, 1, 6, 3, 0, 5, 9, 2, 7],
  8: [4, 9, 5, 0, 7, 2, 8, 3, 6, 1],
  9: [7, 3, 6, 2, 9, 5, 1, 4, 0, 8],
  10: [9, 5, 2, 8, 1, 7, 3, 6, 4, 0],
};

const cloneSection = (section: MockSection): MockSection => ({
  ...section,
  questions: section.questions.map(question => ({
    ...question,
    ...(question.type === 'matching'
      ? { items: question.items.map(item => ({ ...item })), endings: question.endings.map(ending => ({ ...ending })) }
      : {}),
  })),
});

function insertBeforeSignoff(passage: string, addition: string): string {
  const signoff = /\n\n(?=(?:Liebe|Viele|Herzliche) Grüße\b)/u;
  return signoff.test(passage)
    ? passage.replace(signoff, `\n\n${addition}\n\n`)
    : `${passage}\n\n${addition}`;
}

function enrichPress(passage: string, additions: [string, string]): string {
  const marker = '\n\nTEXT B';
  const markerIndex = passage.indexOf(marker);
  if (markerIndex < 0) return `${passage}\n\n${additions.join('\n\n')}`;
  const first = passage.slice(0, markerIndex);
  const second = passage.slice(markerIndex);
  return `${first}\n\n${additions[0]}${second}\n\n${additions[1]}`;
}

function enrichBlocks(passage: string, additions: readonly string[]): string {
  const blocks = passage.split('\n\n');
  if (blocks.length !== additions.length) {
    throw new Error(`Goethe B1 fidelity enrichment expected ${additions.length} blocks, received ${blocks.length}`);
  }
  return blocks.map((block, index) => `${block} ${additions[index]}`).join('\n\n');
}

function reorder<T>(values: T[], order: readonly number[]): T[] {
  if (values.length !== order.length) throw new Error(`Cannot reorder ${values.length} values with ${order.length} positions`);
  return order.map(index => values[index]);
}

function reletterMatching(section: MockSection, order: readonly number[]): void {
  const question = section.questions[0];
  if (question?.type !== 'matching') throw new Error('Expected a matching question in Goethe B1 Lesen Teil 3');
  const blocks = (section.passage ?? '').split('\n\n');
  const advertisedEndings = question.endings.filter(ending => ending.letter !== '0');
  const zeroEnding = question.endings.find(ending => ending.letter === '0');
  if (blocks.length !== 10 || advertisedEndings.length !== 10 || !zeroEnding) throw new Error('Invalid Goethe B1 advertisement inventory');

  const oldToNew = new Map<string, string>();
  order.forEach((oldIndex, newIndex) => oldToNew.set(String.fromCharCode(65 + oldIndex), String.fromCharCode(65 + newIndex)));
  const reorderedBlocks = reorder(blocks, order).map((block, newIndex) => block.replace(/^[A-J](?= ·)/u, String.fromCharCode(65 + newIndex)));
  const reorderedEndings = reorder(advertisedEndings, order).map((ending, newIndex) => ({ ...ending, letter: String.fromCharCode(65 + newIndex) }));

  section.passage = reorderedBlocks.join('\n\n');
  question.items = question.items.map(item => ({ ...item, answer: item.answer === '0' ? '0' : (oldToNew.get(item.answer) ?? item.answer) }));
  question.endings = [...reorderedEndings, zeroEnding];
  if (question.groupLabel) {
    question.groupLabel = question.groupLabel.replace(/(→\s*)([A-J])\b/u, (_, arrow: string, letter: string) => `${arrow}${oldToNew.get(letter) ?? letter}`);
  }
}

export function applyGoetheB1Fidelity(set: number, mock: MockExam): MockExam {
  const material = MATERIALS[set];
  if (!material) throw new Error(`Missing Goethe B1 fidelity material for set ${set}`);
  const calibration = CALIBRATION[set];

  const sections = mock.sections.map(cloneSection);
  const reading = sections.filter(section => section.skill === 'reading');
  const writing = sections.filter(section => section.skill === 'writing');
  const speaking = sections.filter(section => section.skill === 'speaking');

  if (reading.length !== 5 || writing.length !== 3 || speaking.length !== 3) {
    throw new Error(`Goethe B1 set ${set} does not expose the expected 5/3/3 module structure`);
  }

  reading[0].passage = insertBeforeSignoff(reading[0].passage ?? '', material.personal);
  reading[1].passage = enrichPress(reading[1].passage ?? '', material.press);
  reading[2].passage = enrichBlocks(reading[2].passage ?? '', material.ads);
  reading[3].passage = enrichBlocks(reading[3].passage ?? '', material.opinions);
  reading[4].passage = `${reading[4].passage ?? ''}${material.rules}`;

  if (calibration) {
    reading[0].passage = insertBeforeSignoff(reading[0].passage ?? '', calibration.personal);
    reading[1].passage = enrichPress(reading[1].passage ?? '', calibration.press);
    reading[3].passage = enrichBlocks(reading[3].passage ?? '', calibration.opinions);
    reading[4].passage = `${reading[4].passage ?? ''}\n\n${calibration.rules}`;
  }
  const adCalibration = AD_CALIBRATION[set];
  if (adCalibration) reading[2].passage = enrichBlocks(reading[2].passage ?? '', adCalibration);

  reading[0].questions = reorder(reading[0].questions, ITEM_PERMUTATIONS[set]);
  const opinionOrder = OPINION_PERMUTATIONS[set];
  reading[3].passage = reorder((reading[3].passage ?? '').split('\n\n'), opinionOrder)
    .map((block, index) => block.replace(/^\d{2}(?= ·)/u, String(20 + index)))
    .join('\n\n');
  reading[3].questions = reorder(reading[3].questions, opinionOrder);
  reletterMatching(reading[2], MATCHING_PERMUTATIONS[set]);

  const forumQuestion = writing[1].questions[0];
  if (forumQuestion?.type === 'write') forumQuestion.stimulus = `„${material.forumQuote}“`;

  speaking[1].instructions = 'Wählen Sie eines von zwei Themen. Sprechen Sie circa drei Minuten. Nutzen Sie alle fünf Folien Ihrer Präsentationskarte.';
  const presentation = speaking[1].questions[0];
  if (presentation?.type === 'speak') {
    presentation.cueCard = presentation.cueCard
      ?.replaceAll('Thema vorstellen', 'Folie 1 · Thema und Aufbau vorstellen')
      .replaceAll('persönliche Erfahrung', 'Folie 2 · persönliche Erfahrung')
      .replaceAll('Situation im Heimatland', 'Folie 3 · Situation im Heimatland und Beispiele')
      .replaceAll('Vorteile und Nachteile', 'Folie 4 · Vor- und Nachteile, Meinung und Beispiele')
      .replaceAll('eigene Meinung', 'Folie 5 · Abschluss und Dank');
  }

  return { ...mock, sections };
}
