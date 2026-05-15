import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'goethe',
  title: 'Goethe-Zertifikat B1 – Übungstest 1',
  subtitle: 'Lesen · Hören · Schreiben · Sprechen',
  timeMinutes: 190,
  sections: [
    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 1 — Lesen Teil 1
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 1,
      title: 'Lesen – Teil 1: Blogeinträge und Aussagen',
      skill: 'reading',
      instructions:
        'Lesen Sie die fünf Texte und die zehn Aussagen. Welcher Text passt zu welcher Aussage? Jeder Text kann mehrmals verwendet werden.',
      passage: `**Text A – Homeoffice: Fluch oder Segen?**
Seit zwei Jahren arbeite ich hauptsächlich von zu Hause aus. Am Anfang war es schwierig, weil ich mich leicht ablenken ließ. Inzwischen habe ich eine feste Routine entwickelt: Ich fange immer um 8 Uhr an und mache um 17 Uhr Feierabend. Das Beste am Homeoffice ist, dass ich keine Zeit mehr mit dem Pendeln verliere. Allerdings fehlt mir manchmal der persönliche Kontakt zu meinen Kollegen. Ich versuche das durch regelmäßige Videoanrufe auszugleichen.

**Text B – Kochen als neues Hobby**
Vor einem Jahr habe ich angefangen, richtig zu kochen. Vorher habe ich meistens Fertiggerichte gegessen oder war in der Kantine. Jetzt koche ich fast jeden Tag selbst und probiere neue Rezepte aus. Ich habe schon mehrere Kochbücher gekauft und schaue mir online Videos an. Es macht mir großen Spaß, neue Gerichte auszuprobieren, und meine Familie und Freunde freuen sich immer über eine Einladung zum Essen. Kochen ist für mich jetzt eine echte Leidenschaft geworden.

**Text C – Mit Bus und Bahn durch die Stadt**
In meiner Stadt Hamburg gibt es ein sehr gutes Netz aus U-Bahn, S-Bahn und Bussen. Ich benutze öffentliche Verkehrsmittel täglich, um zur Arbeit zu fahren. Seit ich ein Monatsticket habe, spare ich viel Geld im Vergleich zum Auto. Die Bahnen kommen meistens pünktlich, aber manchmal gibt es Verspätungen wegen Baustellen. Trotzdem finde ich es viel stressfreier als Autofahren – ich kann in der Bahn lesen oder Musik hören.

**Text D – Ehrenamt: Zeit für andere**
Jeden Samstag helfe ich in einem Altersheim in meiner Nähe. Ich besuche die älteren Menschen, spiele Karten mit ihnen oder lese ihnen vor. Es ist sehr erfüllend, etwas für andere zu tun, auch wenn man dafür kein Geld bekommt. Durch das Ehrenamt habe ich viele interessante Menschen kennengelernt und viel über das Leben gelernt. Ich kann jedem empfehlen, sich ehrenamtlich zu engagieren – es gibt so viele Möglichkeiten.

**Text E – Urlaub mit kleinem Budget**
Letzten Sommer wollte ich unbedingt verreisen, hatte aber nicht viel Geld. Also habe ich lange im Internet nach günstigen Angeboten gesucht. Ich habe eine Ferienwohnung direkt bei der Familie gebucht – das war viel billiger als ein Hotel. Außerdem bin ich mit dem Zug gefahren statt zu fliegen. Vor Ort habe ich hauptsächlich lokale Restaurants besucht und kostenlose Sehenswürdigkeiten besichtigt. So hatte ich einen wunderbaren Urlaub für wenig Geld.`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-1-q1',
          part: 1,
          text: 'Diese Person hat eine feste Tagesstruktur für die Arbeit entwickelt.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q2',
          part: 1,
          text: 'Diese Person spart Geld, indem sie nicht mit dem Auto fährt.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q3',
          part: 1,
          text: 'Diese Person verbringt ihre Freizeit damit, anderen Menschen zu helfen.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q4',
          part: 1,
          text: 'Diese Person hat ein neues Interesse entdeckt und kauft dafür Bücher.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q5',
          part: 1,
          text: 'Diese Person hat für den Urlaub günstige Übernachtungsmöglichkeiten gesucht.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 4,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q6',
          part: 1,
          text: 'Diese Person vermisst den direkten Kontakt zu Arbeitskollegen.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q7',
          part: 1,
          text: 'Diese Person kocht für andere und lädt Leute ein.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q8',
          part: 1,
          text: 'Diese Person nutzt die Fahrzeit im öffentlichen Verkehr produktiv.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q9',
          part: 1,
          text: 'Diese Person empfiehlt anderen, sich sozial zu engagieren.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-1-q10',
          part: 1,
          text: 'Diese Person ist lieber mit dem Zug als mit dem Flugzeug gereist.',
          options: ['Text A', 'Text B', 'Text C', 'Text D', 'Text E'],
          answer: 4,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 2 — Lesen Teil 2
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 2,
      title: 'Lesen – Teil 2: Zeitungsartikel',
      skill: 'reading',
      instructions:
        'Lesen Sie den Text und die Aufgaben 11–15. Kreuzen Sie an: richtig oder falsch.',
      passage: `**Grüne Oasen mitten in der Stadt: Berlins Gemeinschaftsgärten boomen**

Berlin, 14. Mai – In vielen Berliner Stadtteilen entstehen immer mehr Gemeinschaftsgärten. Diese Grünflächen werden von den Bewohnern gemeinsam geplant, gepflegt und genutzt. Was früher nur auf dem Land möglich schien, ist heute mitten in der Stadt Realität.

Der Gemeinschaftsgarten „Grüne Mitte" in Neukölln ist ein gutes Beispiel dafür. Vor fünf Jahren war das Gelände noch eine ungepflegte Brachfläche. Heute wachsen dort Tomaten, Kräuter, Salat und Blumen. Rund 80 Mitglieder kümmern sich regelmäßig um die Pflanzen. Jeder kann mitmachen – ob jung oder alt, ob mit oder ohne Gartenerfahrung.

Die Mitglieder treffen sich jeden Samstag, um gemeinsam zu gärtnern. Dabei lernen sie nicht nur etwas über Pflanzen und Natur, sondern kommen auch ins Gespräch. „Es ist toll, wie viele verschiedene Menschen hier zusammenkommen", sagt Projektleiterin Sandra Müller. „Wir haben Mitglieder aus über 20 verschiedenen Ländern."

Der Garten bietet aber nicht nur Gemüse und soziale Kontakte. Er ist auch ein wichtiger Beitrag zur Umwelt: Die Pflanzen verbessern die Luftqualität und bieten Insekten einen Lebensraum. Außerdem wird Regenwasser gesammelt und für die Bewässerung verwendet.

Das Projekt wird vom Bezirksamt Neukölln finanziell unterstützt. Trotzdem müssen die Mitglieder einen kleinen Jahresbeitrag bezahlen, um die laufenden Kosten zu decken. Wer mitmachen möchte, kann sich einfach am nächsten Samstag beim Garten vorstellen. Es gibt noch freie Plätze.

Ähnliche Projekte gibt es inzwischen in fast allen Berliner Bezirken. Die Stadtverwaltung plant, in den nächsten Jahren weitere Flächen für solche Gärten zur Verfügung zu stellen, denn die Nachfrage wächst stetig.`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-2-q11',
          part: 2,
          text: 'Der Gemeinschaftsgarten „Grüne Mitte" existiert seit mehr als vier Jahren.',
          options: ['Richtig', 'Falsch'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-2-q12',
          part: 2,
          text: 'Man muss Gartenerfahrung haben, um Mitglied im Garten zu werden.',
          options: ['Richtig', 'Falsch'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-2-q13',
          part: 2,
          text: 'Die Mitglieder des Gartens kommen aus vielen verschiedenen Ländern.',
          options: ['Richtig', 'Falsch'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-2-q14',
          part: 2,
          text: 'Die Mitgliedschaft im Garten ist völlig kostenlos.',
          options: ['Richtig', 'Falsch'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-2-q15',
          part: 2,
          text: 'Die Berliner Stadtverwaltung möchte in Zukunft mehr Flächen für solche Gärten anbieten.',
          options: ['Richtig', 'Falsch'],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 3 — Lesen Teil 3
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 3,
      title: 'Lesen – Teil 3: Anzeigen und Hinweise',
      skill: 'reading',
      instructions:
        'Lesen Sie die Situationen 16–20 und die Anzeigen A–H. Welche Anzeige passt zu welcher Situation?',
      passage: `**Situation 16:** Claudia möchte Sport treiben. Sie sucht ein Fitnessstudio in ihrer Nähe, das auch am Wochenende geöffnet hat und günstige Preise anbietet.

**Situation 17:** Marco braucht ein Fahrrad, aber er hat nicht viel Geld. Er möchte ein gebrauchtes Fahrrad kaufen, das gut in Schuss ist.

**Situation 18:** Anna ist neu in Deutschland und möchte ihre Deutschkenntnisse verbessern. Sie sucht einen Kurs, der abends stattfindet, weil sie tagsüber arbeitet.

**Situation 19:** Peter und seine Frau suchen jemanden, der auf ihre zwei Kinder (4 und 7 Jahre alt) aufpasst, während sie arbeiten. Sie brauchen eine zuverlässige Person.

**Situation 20:** Lena möchte mit Freunden essen gehen, aber alle haben im Moment wenig Geld. Sie sucht ein Restaurant mit günstigen Mittagsangeboten.

---

**A – FitLife Sportzentrum**
Öffnungszeiten: Mo–Fr 6:00–22:00 Uhr, Sa–So 8:00–20:00 Uhr
Mitgliedschaft ab 19,90 €/Monat. Probetraining kostenlos!
Gerätetraining, Kurse, Sauna. Jetzt anmelden und ersten Monat gratis!
Kontakt: info@fitlife-berlin.de

**B – Deutschkurs für Erwachsene – VHS Mitte**
Neue Kurse starten jeden Monat. Niveaus A1 bis C1.
Abendkurse: Di und Do, 18:30–20:30 Uhr.
Auch Intensivkurse am Wochenende verfügbar.
Anmeldung: vhs-mitte.de oder Tel. 030 / 45 67 890

**C – Babysitter gesucht – Familie Hoffmann**
Wir suchen eine verantwortungsvolle Person für unsere Kinder (5 und 9 Jahre).
Mo–Fr, 7:00–14:00 Uhr. Erfahrung mit Kindern erwünscht.
Gute Bezahlung. Bitte melden unter: familie.hoffmann@mail.de

**D – Fahrrad zu verkaufen**
Citybike, 28 Zoll, 7 Gänge, guter Zustand. 2 Jahre alt, wenig genutzt.
Preis: 120 €, VB. Kein Versand, nur Abholung in Friedrichshain.
Kontakt: 0177-345 6789

**E – Mittagstisch – Restaurant Sonne**
Täglich wechselndes Mittagsmenü: Suppe + Hauptgericht + Getränk nur 7,50 €!
Mo–Fr, 11:30–14:30 Uhr. Große Auswahl, auch vegetarisch.
Reservierung: 030 / 23 45 678

**F – Sprachcafé Deutsch**
Jeden Mittwoch, 17:00–19:00 Uhr. Für alle, die Deutsch üben möchten.
Kein Kurs – einfach reden und neue Leute kennenlernen!
Eintritt frei. Ort: Café Central, Hauptstraße 12

**G – Fahrrad – Sportrad zu verkaufen**
Rennrad, 26 Zoll, 21 Gänge. Neuwertig, nur 3x genutzt.
Preis: 450 €. Zubehör inklusive (Helm, Handschuhe).
Anfragen: sportrad.berlin@gmail.com

**H – Kinderbetreuung – Tagesmutter Angela**
Ich betreue Kinder von 0–6 Jahren in meiner Wohnung.
Mo–Fr, 8:00–17:00 Uhr. Liebevolle und erfahrene Betreuung.
Kontakt: 0160-987 6543`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-3-q16',
          part: 3,
          text: 'Claudia möchte Sport treiben und sucht ein Fitnessstudio, das auch am Wochenende geöffnet hat und günstige Preise anbietet.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-3-q17',
          part: 3,
          text: 'Marco braucht ein gebrauchtes Fahrrad, das gut in Schuss ist, und hat nicht viel Geld.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-3-q18',
          part: 3,
          text: 'Anna sucht einen Deutschkurs, der abends stattfindet, weil sie tagsüber arbeitet.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-3-q19',
          part: 3,
          text: 'Peter und seine Frau suchen jemanden für ihre zwei Kinder (4 und 7 Jahre alt).',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-3-q20',
          part: 3,
          text: 'Lena sucht ein Restaurant mit günstigen Mittagsangeboten für eine Gruppe mit wenig Budget.',
          options: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
          answer: 4,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 4 — Hören Teil 1
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 4,
      title: 'Hören – Teil 1: Kurze Gespräche',
      skill: 'listening',
      audioUrl: '/audio/goethe/set-1.mp4',
      instructions:
        'Sie hören fünf kurze Gespräche. Kreuzen Sie für jede Aufgabe die richtige Antwort an.',
      transcript: `**Gespräch 1 – Arzttermin**
Rezeptionistin: Praxis Dr. Wagner, guten Tag. Wie kann ich Ihnen helfen?
Patient: Guten Tag. Ich würde gerne einen Termin machen. Ich habe starke Halsschmerzen.
Rezeptionistin: Haben Sie morgen um 10 Uhr Zeit?
Patient: Hmm, morgen ist schwierig. Ich arbeite vormittags. Geht es auch nachmittags?
Rezeptionistin: Ja, Donnerstag um 15:30 Uhr hätten wir noch etwas frei.
Patient: Donnerstag passt mir sehr gut. Ich nehme den Termin.
Rezeptionistin: Sehr schön. Wie ist Ihr Name bitte?

**Gespräch 2 – Bahntickets kaufen**
Kunde: Entschuldigung, ich möchte zwei Tickets nach München kaufen.
Verkäufer: Für wann?
Kunde: Für Freitagabend, wenn möglich den Zug um 18 Uhr.
Verkäufer: Der Zug um 18:12 Uhr – noch zwei Plätze verfügbar. Einfache Fahrt oder hin und zurück?
Kunde: Hin und zurück bitte. Wir kommen Sonntagnachmittag zurück.
Verkäufer: Das macht dann 89 Euro für beide Tickets zusammen.
Kunde: Gut, ich zahle mit Karte.

**Gespräch 3 – Nach dem Weg fragen**
Tourist: Entschuldigung, ich suche das Stadtmuseum. Können Sie mir helfen?
Passant: Ja, natürlich. Gehen Sie diese Straße geradeaus bis zur Ampel, dann links abbiegen.
Tourist: Geradeaus bis zur Ampel, dann links.
Passant: Genau. Danach sehen Sie ein großes rotes Gebäude – das ist das Rathaus. Das Museum ist direkt daneben, auf der rechten Seite.
Tourist: Ist es weit von hier?
Passant: Nein, das sind etwa zehn Minuten zu Fuß.
Tourist: Vielen Dank!

**Gespräch 4 – Im Restaurant**
Kellner: Guten Abend, haben Sie schon gewählt?
Gast: Ja. Ich nehme die Gemüsesuppe als Vorspeise und dann das Schnitzel mit Pommes.
Kellner: Sehr gerne. Und zum Trinken?
Gast: Ein Mineralwasser und ein Glas Rotwein, bitte.
Kellner: Möchten Sie den Rotwein aus der Region oder einen italienischen?
Gast: Den regionalen bitte, der klingt interessant.
Kellner: Ausgezeichnete Wahl. Ich bringe die Getränke gleich.

**Gespräch 5 – Kollegen am Telefon**
Tobias: Hallo Lisa, hier ist Tobias. Wegen des Meetings morgen – hast du kurz Zeit?
Lisa: Ja, natürlich. Was ist los?
Tobias: Das Meeting wurde verschoben. Es findet jetzt nicht um 9 Uhr statt, sondern erst um 11 Uhr.
Lisa: Oh, danke für die Information. Ist der Raum auch gewechselt?
Tobias: Nein, Raum 204 bleibt gleich. Nur die Uhrzeit hat sich geändert.
Lisa: Alles klar, ich notiere es. Bis morgen dann.`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-4-q21',
          part: 4,
          text: 'Wann bekommt der Patient seinen Arzttermin?',
          options: [
            'Morgen um 10:00 Uhr',
            'Donnerstag um 15:30 Uhr',
            'Freitagvormittag',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-4-q22',
          part: 4,
          text: 'Was kauft der Kunde am Bahnhof?',
          options: [
            'Ein einfaches Ticket nach München',
            'Zwei Hin- und Rückfahrkarten nach München',
            'Zwei einfache Tickets nach München',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-4-q23',
          part: 4,
          text: 'Wo liegt das Stadtmuseum?',
          options: [
            'Neben dem Rathaus, auf der rechten Seite',
            'Direkt an der Ampel, auf der linken Seite',
            'Zehn Minuten vom Rathaus entfernt',
          ],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-4-q24',
          part: 4,
          text: 'Was bestellt der Gast als Vorspeise?',
          options: ['Schnitzel mit Pommes', 'Gemüsesuppe', 'Einen Rotwein'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-4-q25',
          part: 4,
          text: 'Was hat sich beim Meeting geändert?',
          options: [
            'Der Raum und die Uhrzeit',
            'Nur der Raum',
            'Nur die Uhrzeit',
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 5 — Hören Teil 2
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 5,
      title: 'Hören – Teil 2: Ansagen und Mitteilungen',
      skill: 'listening',
      audioUrl: '/audio/goethe/set-1.mp4',
      instructions:
        'Sie hören ein Radio-Interview. Lesen Sie die Aufgaben 26–30. Kreuzen Sie die richtige Antwort an.',
      transcript: `**Radio-Interview: Nachhaltig leben – aber wie?**

Moderatorin: Willkommen bei Radio Grün. Heute spreche ich mit Carla Bremer, die seit drei Jahren versucht, möglichst nachhaltig zu leben. Carla, wie hat das bei Ihnen angefangen?

Carla: Guten Tag. Es hat angefangen, als ich einen Dokumentarfilm über Plastikverschmutzung gesehen habe. Der hat mich wirklich erschüttert. Danach habe ich angefangen, meinen Alltag zu überdenken.

Moderatorin: Was haben Sie als Erstes geändert?

Carla: Zuerst habe ich aufgehört, Plastiktüten zu benutzen. Ich nehme jetzt immer Stoffbeutel mit zum Einkaufen. Dann habe ich begonnen, Lebensmittel auf dem Wochenmarkt zu kaufen statt im Supermarkt. Das ist frischer und meistens auch ohne Plastikverpackung.

Moderatorin: Hat das Ihren Alltag sehr verändert?

Carla: Am Anfang schon. Man muss mehr planen. Aber nach ein paar Wochen wird es zur Gewohnheit. Jetzt finde ich es sogar angenehmer als vorher. Ich spare auch Geld, weil ich bewusster einkaufe und weniger wegwerfe.

Moderatorin: Was würden Sie anderen Menschen empfehlen, die anfangen wollen, nachhaltiger zu leben?

Carla: Ich würde sagen: Klein anfangen. Nicht alles auf einmal ändern wollen. Vielleicht mit dem Thema Plastik beginnen oder öfter mit dem Fahrrad fahren statt mit dem Auto. Jeder kleine Schritt zählt. Und man sollte sich nicht schlecht fühlen, wenn man nicht perfekt ist. Das Wichtigste ist, dass man anfängt.

Moderatorin: Haben Sie auch Bereiche, wo es schwierig ist?

Carla: Ja, das Fliegen. Ich reise sehr gerne, und manchmal gibt es keine Alternative zum Flugzeug. Das ist mein größter Kompromiss. Ich versuche es zu reduzieren, aber ich habe es noch nicht ganz aufgegeben.

Moderatorin: Danke, Carla, für dieses inspirierende Gespräch!`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-5-q26',
          part: 5,
          text: 'Was hat Carla dazu gebracht, nachhaltiger zu leben?',
          options: [
            'Ein Buch über Umweltschutz',
            'Ein Dokumentarfilm über Plastikverschmutzung',
            'Eine Empfehlung von Freunden',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-5-q27',
          part: 5,
          text: 'Was war Carlas erste Veränderung?',
          options: [
            'Sie ist mit dem Fahrrad zur Arbeit gefahren.',
            'Sie hat aufgehört, Plastiktüten zu benutzen.',
            'Sie hat weniger Fleisch gegessen.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-5-q28',
          part: 5,
          text: 'Was sagt Carla über die Kosten ihres neuen Lebensstils?',
          options: [
            'Es ist viel teurer als vorher.',
            'Es kostet etwa gleich viel.',
            'Sie spart sogar Geld.',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-5-q29',
          part: 5,
          text: 'Was empfiehlt Carla Menschen, die nachhaltiger leben wollen?',
          options: [
            'Sofort alles auf einmal ändern.',
            'Klein anfangen und sich nicht unter Druck setzen.',
            'Zuerst ein Buch darüber lesen.',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-5-q30',
          part: 5,
          text: 'Was ist Carlas größter Kompromiss beim nachhaltigen Leben?',
          options: [
            'Sie isst noch Fleisch.',
            'Sie benutzt manchmal Plastikverpackungen.',
            'Sie fliegt noch manchmal.',
          ],
          answer: 2,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 6 — Hören Teil 3
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 6,
      title: 'Hören – Teil 3: Gespräch',
      skill: 'listening',
      audioUrl: '/audio/goethe/set-1.mp4',
      instructions:
        'Sie hören ein Gespräch zwischen zwei Personen. Kreuzen Sie für jede Aussage: Wer sagt das? Maria, Thomas oder beide?',
      transcript: `**Gespräch: Wochenendausflug planen**

Maria: Thomas, hast du schon Pläne für das Wochenende?
Thomas: Noch nicht. Ich dachte, wir könnten vielleicht einen Ausflug machen. Was meinst du?
Maria: Super Idee! Ich wollte schon lange mal ans Meer fahren. Warst du schon mal in Rügen?
Thomas: Nein, noch nie. Ich war noch nie an der Ostsee. Klingt aber toll!
Maria: Ich auch nicht. Vielleicht ist es Zeit, das zu ändern. Man kann dort wandern, schwimmen und die Natur genießen.
Thomas: Einverstanden. Aber wäre es nicht zu weit für ein Wochenende? Die Fahrt dauert doch bestimmt mehrere Stunden.
Maria: Stimmt, etwa vier Stunden mit dem Auto. Aber wir könnten früh am Samstagmorgen losfahren und Sonntagabend zurückfahren. Das reicht für ein Wochenende.
Thomas: Okay, das klingt machbar. Wo übernachten wir? Ich würde gerne in einer Jugendherberge schlafen – das ist günstiger.
Maria: Ja, das finde ich auch. Jugendherbergen sind praktisch und man trifft andere Reisende. Ich schaue mal nach Verfügbarkeit.
Thomas: Gut. Ich kümmere mich ums Auto und tanke voll. Ich habe auch einen Reiseführer über Rügen – den kann ich mitbringen.
Maria: Perfekt. Und ich bereite Snacks für die Fahrt vor. Sollen wir auch Freunde fragen, ob sie mitkommen wollen?
Thomas: Das wäre schön, aber dann wird die Planung komplizierter. Vielleicht dieses Mal nur wir zwei?
Maria: Du hast recht. Lass uns dieses Mal alleine fahren und beim nächsten Mal eine größere Gruppe organisieren.`,
      questions: [
        {
          type: 'mcq',
          id: 'goethe-s1-6-q31',
          part: 6,
          text: 'Diese Person war noch nie an der Ostsee.',
          options: ['Maria', 'Thomas', 'Beide'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-6-q32',
          part: 6,
          text: 'Diese Person möchte lieber in einer Jugendherberge übernachten.',
          options: ['Maria', 'Thomas', 'Beide'],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-6-q33',
          part: 6,
          text: 'Diese Person übernimmt die Aufgabe, Snacks für die Fahrt vorzubereiten.',
          options: ['Maria', 'Thomas', 'Beide'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-6-q34',
          part: 6,
          text: 'Diese Person schlägt vor, diesmal nur zu zweit zu fahren.',
          options: ['Maria', 'Thomas', 'Beide'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 'goethe-s1-6-q35',
          part: 6,
          text: 'Diese Person bringt einen Reiseführer mit.',
          options: ['Maria', 'Thomas', 'Beide'],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 7 — Schreiben
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 7,
      title: 'Schreiben – Forumsbeitrag',
      skill: 'writing',
      instructions:
        'Schreiben Sie einen Beitrag für ein Online-Forum. Schreiben Sie mindestens 100 Wörter.',
      questions: [
        {
          type: 'write',
          id: 'goethe-s1-7-q36',
          part: 7,
          taskNumber: 1,
          stimulus: `En un foro de internet, varios usuarios están debatiendo si se deberían prohibir los automóviles en los centros de las ciudades. Lea el siguiente hilo del foro:

**Tema: ¿Deben prohibirse los coches en el centro de la ciudad?**

*Usuario1:* „Ich finde, Autos sollten aus der Innenstadt verbannt werden. Die Luft ist viel zu schmutzig und es gibt zu viel Lärm."

*Usuario2:* „Das ist eine gute Idee für die Umwelt, aber was ist mit Menschen, die auf ein Auto angewiesen sind?"

*Usuario3:* „Autofreie Innenstädte sind die Zukunft! Andere Länder machen es schon."

Escriba su propio mensaje para este foro en alemán. En su texto debe:
- Expresar su opinión sobre si se deben prohibir los coches en el centro
- Dar al menos dos razones que apoyen su postura
- Mencionar posibles problemas o ventajas para los ciudadanos
- Proponer una solución o alternativa

Escriba al menos 100 palabras en alemán.`,
          text: 'Schreiben Sie Ihren Beitrag für das Forum. Nennen Sie Ihre Meinung, geben Sie Gründe an und machen Sie einen Vorschlag.',
          minWords: 100,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────────────────
    // SECTION 8 — Sprechen
    // ─────────────────────────────────────────────────────────────────────────
    {
      part: 8,
      title: 'Sprechen',
      skill: 'speaking',
      instructions: 'Die Prüfung besteht aus drei Teilen.',
      questions: [
        {
          type: 'speak',
          id: 'goethe-s1-8-q37',
          part: 8,
          partNumber: 1,
          text: 'Stellen Sie sich vor. Sprechen Sie über folgende Punkte:\n\n• Ihr Name und Ihre Herkunft\n• Ihr Beruf oder Ihr Studium\n• Ihre Hobbys und Freizeitaktivitäten\n• Warum Sie Deutsch lernen\n\nSie haben etwa zwei Minuten Zeit.',
        },
        {
          type: 'speak',
          id: 'goethe-s1-8-q38',
          part: 8,
          partNumber: 2,
          text: 'Sehen Sie sich das folgende Diagramm an. Beschreiben Sie das Diagramm und sagen Sie, was es Ihnen zeigt. Was finden Sie interessant oder überraschend? Sie haben etwa drei Minuten Zeit.',
          cueCard: `**Freizeitaktivitäten in Deutschland – Beliebtheit in Prozent**

Eine Umfrage unter 1.000 Deutschen (2024):

• Sport treiben: 68 %
• Reisen: 61 %
• Fernsehen / Streaming: 74 %
• Lesen: 45 %
• Kochen und Backen: 52 %

Quelle: Statistisches Bundesamt (fiktiv, für Übungszwecke)

Sprechen Sie über:
- Was die Menschen am häufigsten / am seltensten machen
- Was Sie überraschend finden
- Wie das in Ihrem Land aussieht
- Ihre eigene Lieblings-Freizeitaktivität`,
        },
        {
          type: 'speak',
          id: 'goethe-s1-8-q39',
          part: 8,
          partNumber: 3,
          text: 'Sie und Ihr Partner / Ihre Partnerin planen eine Klassenparty. Diskutieren Sie gemeinsam und treffen Sie Entscheidungen:\n\n• Was bringt jeder mit? (Essen, Getränke, Deko)\n• Welche Aktivitäten und Spiele soll es geben?\n• Wann fängt die Party an und wie lange dauert sie?\n• Wo findet die Party statt?\n\nSie haben etwa vier Minuten Zeit für die Diskussion.',
          followUp: [
            'Was würden Sie anders machen, wenn das Budget sehr begrenzt wäre?',
            'Welche Musik würden Sie für die Party auswählen und warum?',
            'Was tun Sie, wenn ein Gast eine Lebensmittelallergie hat?',
          ],
        },
      ],
    },
  ],
};

export default mock;
