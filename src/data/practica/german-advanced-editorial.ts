import type { ErrorChallenge, GapChallenge, SeparationChallenge } from './tense-quest-types.ts'
import type { GermanFormId } from './german-structure-quest-config.ts'

type CorrectionLine = [before: string, answer: string, wrong: string, after: string]

const CORRECTION_LINES: Record<GermanFormId, CorrectionLine[]> = {
  praesens: [
    ['Im Lesesaal ', 'arbeitet', 'arbeiten', ' heute nur eine Archivarin.'],
    ['Die neue Straßenbahn ', 'hält', 'halten', ' direkt vor dem Theater.'],
    ['Nach der Pause ', 'bespricht', 'besprechen', ' der Kurs die Ergebnisse.'],
    ['Meine Nachbarn ', 'teilen', 'teilt', ' sich einen kleinen Garten.'],
    ['Jeden Donnerstag ', 'liefert', 'liefern', ' der Hof frisches Gemüse.'],
    ['Warum ', 'trägst', 'trägt', ' du heute einen Helm?'],
    ['Das Forschungsteam ', 'wertet', 'werten', ' die Messdaten sofort aus.'],
    ['Am Abend ', 'räumt', 'räumen', ' Yusuf die Werkstatt auf.'],
    ['Zwei Freiwillige ', 'begleiten', 'begleitet', ' die Besucher zum Ausgang.'],
    ['Der Wasserstand ', 'steigt', 'steigen', ' nach jedem starken Regen.'],
  ],
  'perfekt-haben': [
    ['Lina erzählt, dass sie den Vertrag ', 'gelesen hat', 'gelesen ist', '.'],
    ['Wir bestätigen, dass wir alle Belege ', 'gesammelt haben', 'gesammelt sind', '.'],
    ['Der Techniker sagt, dass er die Sicherung ', 'ausgetauscht hat', 'ausgetauscht ist', '.'],
    ['Ihr erklärt, dass ihr den Raum ', 'reserviert habt', 'reserviert seid', '.'],
    ['Die Redaktion meldet, dass sie den Titel ', 'geändert hat', 'geändert ist', '.'],
    ['Du hast berichtet, dass du die Datei ', 'gelöscht hast', 'gelöscht bist', '.'],
    ['Die Köchin sagt, dass sie das Menü ', 'vorbereitet hat', 'vorbereitet ist', '.'],
    ['Die Kinder erzählen, dass sie ein Modell ', 'gebaut haben', 'gebaut sind', '.'],
    ['Omar bestätigt, dass er den Fehler ', 'entdeckt hat', 'entdeckt ist', '.'],
    ['Die Gäste sagen, dass sie den Schlüssel ', 'abgegeben haben', 'abgegeben sind', '.'],
  ],
  'perfekt-sein': [
    ['Nora schreibt, dass sie sicher in Basel ', 'angekommen ist', 'angekommen hat', '.'],
    ['Die Wanderer berichten, dass sie früh ', 'aufgebrochen sind', 'aufgebrochen haben', '.'],
    ['Das Kind ist froh, dass es schnell ', 'eingeschlafen ist', 'eingeschlafen hat', '.'],
    ['Wir erzählen, dass wir am Fluss entlang ', 'gegangen sind', 'gegangen haben', '.'],
    ['Der Pegel zeigt, dass das Wasser stark ', 'gestiegen ist', 'gestiegen hat', '.'],
    ['Ihr sagt, dass ihr bis zur Hütte ', 'gelaufen seid', 'gelaufen habt', '.'],
    ['Der Zugbegleiter bestätigt, dass der Zug pünktlich ', 'abgefahren ist', 'abgefahren hat', '.'],
    ['Die Blätter sind braun, weil sie früh ', 'gefallen sind', 'gefallen haben', '.'],
    ['Mila erzählt, dass sie zu Hause ', 'geblieben ist', 'geblieben hat', '.'],
    ['Die Gäste melden, dass sie gerade ', 'zurückgekommen sind', 'zurückgekommen haben', '.'],
  ],
  praeteritum: [
    ['Im alten Hafen ', 'wartete', 'warteten', ' ein Fischer auf das Signal.'],
    ['Die beiden Schwestern ', 'fanden', 'fand', ' unter der Treppe eine Kiste.'],
    ['Damals ', 'besaß', 'besitzte', ' das Dorf nur ein Telefon.'],
    ['Plötzlich ', 'erlosch', 'erlöschte', ' das Licht im ganzen Haus.'],
    ['Der Hausmeister ', 'trug', 'tragte', ' die Nachricht nach oben.'],
    ['Wir ', 'wussten', 'wusste', ' nichts von dem zweiten Eingang.'],
    ['Eine leise Stimme ', 'rief', 'rufte', ' meinen Namen.'],
    ['Die Zeugin ', 'beschrieb', 'beschreibte', ' einen roten Lieferwagen.'],
    ['Vor dem Sturm ', 'lagen', 'lag', ' die Boote noch am Ufer.'],
    ['Am Ende ', 'verließ', 'verlasste', ' der Fremde das Gasthaus.'],
  ],
  plusquamperfekt: [
    ['Bevor die Sitzung begann, ', 'hatte', 'hat', ' Eva alle Unterlagen kopiert.'],
    ['Als wir den Bahnsteig erreichten, ', 'war', 'ist', ' der Zug schon abgefahren.'],
    ['Die Straße war nass, weil es nachts stark ', 'geregnet hatte', 'geregnet hat', '.'],
    ['Jonas kannte den Weg, weil er die Strecke vorher ', 'gefahren war', 'gefahren ist', '.'],
    ['Vor der Kontrolle ', 'hatten', 'haben', ' die Fachleute den Sensor kalibriert.'],
    ['Als der Gast anrief, ', 'hatte', 'hat', ' das Hotel das Zimmer bereits vergeben.'],
    ['Niemand war hungrig, weil alle schon ', 'gegessen hatten', 'gegessen haben', '.'],
    ['Die Tür stand offen, obwohl ich sie zuvor ', 'geschlossen hatte', 'geschlossen habe', '.'],
    ['Bevor der Schnee kam, ', 'waren', 'sind', ' die Tiere ins Tal gezogen.'],
    ['Sie konnte zahlen, weil sie vorher Geld ', 'abgehoben hatte', 'abgehoben hat', '.'],
  ],
  'futur-eins': [
    ['Die Ärztin verspricht, dass sie später ', 'anrufen wird', 'anrufen würde', '.'],
    ['Laut Prognose ', 'werden', 'würden', ' die Temperaturen deutlich sinken.'],
    ['Ich bin sicher, dass ihr die Aufgabe ', 'lösen werdet', 'lösen werden', '.'],
    ['Der Veranstalter erklärt, dass das Konzert draußen ', 'stattfinden wird', 'stattfinden würde', '.'],
    ['Wir versprechen, dass wir die Kosten ', 'übernehmen werden', 'übernehmen würden', '.'],
    ['Der Bericht sagt voraus, dass der Verkehr ', 'zunehmen wird', 'zunehmen würde', '.'],
    ['Du wirst sehen, dass dir die neue Methode ', 'helfen wird', 'helfen werden', '.'],
    ['Die Firma kündigt an, dass sie neue Stellen ', 'schaffen wird', 'schaffen würde', '.'],
    ['Morgen um diese Zeit ', 'werde', 'würde', ' ich noch im Zug sitzen.'],
    ['Die Forschenden erwarten, dass der Versuch ', 'gelingen wird', 'gelingen würde', '.'],
  ],
  'futur-zwei': [
    ['Bis Freitag ', 'wird', 'würde', ' Lea den Bericht abgeschlossen haben.'],
    ['Wenn wir eintreffen, ', 'werden', 'würden', ' die Gäste schon gegangen sein.'],
    ['Bis zum Winter wird die Stadt die Brücke ', 'erneuert haben', 'erneuert sein', '.'],
    ['Um acht Uhr ', 'wird', 'würde', ' der letzte Zug abgefahren sein.'],
    ['Vor der Prüfung werdet ihr alle Kapitel ', 'wiederholt haben', 'wiederholt sein', '.'],
    ['Bis dahin wird das Wasser vollständig ', 'verdunstet sein', 'verdunstet haben', '.'],
    ['Am Monatsende werden wir genug Geld ', 'gespart haben', 'gespart sein', '.'],
    ['Wenn du zurückkommst, wird Mia bereits ', 'eingeschlafen sein', 'eingeschlafen haben', '.'],
    ['Bis zur Eröffnung wird das Team jedes Schild ', 'montiert haben', 'montiert sein', '.'],
    ['In einer Stunde wird der Sturm weitergezogen ', 'sein', 'haben', '.'],
  ],
  'wuerde-form': [
    ['Mit mehr Zeit ', 'würde', 'werde', ' ich täglich kochen.'],
    ['An deiner Stelle ', 'würde', 'wird', ' Lena den Vertrag prüfen.'],
    ['Wir ', 'würden', 'werden', ' gern ein ruhigeres Zimmer buchen.'],
    ['Ohne den Lärm ', 'würden', 'werden', ' die Kinder besser schlafen.'],
    ['Könnten Sie warten? Ich ', 'würde', 'werde', ' sofort den Leiter holen.'],
    ['Bei gutem Wetter ', 'würdet', 'werdet', ' ihr länger draußen bleiben.'],
    ['Der Verein ', 'würde', 'wird', ' das Projekt mit einer Spende unterstützen.'],
    ['Wenn sie dürfte, ', 'würde', 'wird', ' Nora allein reisen.'],
    ['Ich ', 'würde', 'werde', ' bitte einen Tee nehmen.'],
    ['Mit einem größeren Saal ', 'würden', 'werden', ' wir mehr Gäste einladen.'],
  ],
  'konjunktiv-vergangenheit': [
    ['Mit deiner Nachricht ', 'hätte', 'hatte', ' ich den Termin nicht verpasst.'],
    ['Ohne den Stau ', 'wären', 'waren', ' die Gäste pünktlich angekommen.'],
    ['Mit mehr Vorsicht ', 'hätte', 'hatte', ' er die Vase nicht zerbrochen.'],
    ['Bei besserem Wetter ', 'wären', 'waren', ' wir zum Gipfel gegangen.'],
    ['Du ', 'hättest', 'hattest', ' den Fehler früher bemerkt.'],
    ['Mit einer Karte ', 'hättet', 'hattet', ' ihr euch nicht verlaufen.'],
    ['Ohne die Warnung ', 'wäre', 'war', ' das Schiff ausgelaufen.'],
    ['Ich ', 'hätte', 'hatte', ' dir unter anderen Umständen geholfen.'],
    ['Mit genug Personal ', 'hätten', 'hatten', ' sie den Auftrag angenommen.'],
    ['Ohne den Defekt ', 'wäre', 'war', ' der Zug rechtzeitig abgefahren.'],
  ],
  imperativ: [
    ['Mara, ', 'öffne', 'öffnet', ' bitte das Fenster!'],
    ['Kinder, ', 'bleibt', 'bleiben', ' hinter der Markierung!'],
    ['Herr Klein, ', 'nehmen', 'nimm', ' Sie bitte Platz!'],
    ['Jonas, ', 'lies', 'lest', ' die Nachricht laut vor!'],
    ['Leute, ', 'seid', 'sei', ' heute besonders vorsichtig!'],
    ['Frau Özdemir, ', 'rufen', 'ruf', ' Sie mich morgen an!'],
    ['Nina, ', 'vergiss', 'vergesst', ' deinen Ausweis nicht!'],
    ['Gäste, ', 'folgt', 'folgen', ' dem blauen Schild!'],
    ['Herr und Frau Roth, ', 'warten', 'wartet', ' Sie bitte hier!'],
    ['Paul, ', 'sprich', 'sprecht', ' etwas langsamer!'],
  ],
}

const FORM_ORDER: GermanFormId[] = [
  'praesens', 'perfekt-haben', 'perfekt-sein', 'praeteritum', 'plusquamperfekt',
  'futur-eins', 'futur-zwei', 'wuerde-form', 'konjunktiv-vergangenheit', 'imperativ',
]

export function createGermanCorrectionChallenges(form: GermanFormId, focus: string, rule: string): ErrorChallenge<GermanFormId>[] {
  const lines = CORRECTION_LINES[form]
  const formOffset = FORM_ORDER.indexOf(form)
  return lines.map((line, index) => {
    const selected = [line, lines[(index + 2) % lines.length], lines[(index + 4) % lines.length], lines[(index + 6) % lines.length], lines[(index + 8) % lines.length]]
    const wrong = (index + formOffset) % 5
    return {
      id: `de-${form}-independent-error-${index + 1}`,
      tense: form,
      title: `Korrekturrunde · ${index + 1}`,
      focus,
      instruction: 'Lies den ganzen Text ohne Markierungen. Schreibe die falsche Verbform und danach ihre Korrektur.',
      chunks: selected.map((entry, entryIndex) => ({
        before: `${entryIndex ? selected[entryIndex - 1][3] + ' ' : ''}${entry[0]}`,
        form: entryIndex === wrong ? entry[2] : entry[1],
        id: `de-${form}-independent-error-${index + 1}-token-${entryIndex + 1}`,
      })),
      after: selected[4][3],
      wrongId: `de-${form}-independent-error-${index + 1}-token-${wrong + 1}`,
      answers: [selected[wrong][1]],
      explanation: `${rule} Im markierten Satz muss die Verbgruppe zu Subjekt, Zeitbezug und Satzbau passen.`,
    }
  })
}

type SeparationSeed = [
  verb: string,
  separation: 'separable' | 'inseparable',
  before: string,
  after: string,
  answer: string,
]

const SEPARATION_SEEDS: Record<GermanFormId, SeparationSeed[]> = {
  praesens: [
    ['aufstehen', 'separable', 'Mara ', ' jeden Werktag um sechs Uhr auf.', 'steht'],
    ['anrufen', 'separable', 'Der Leiter ', ' die Kundin am Nachmittag an.', 'ruft'],
    ['mitbringen', 'separable', 'Ihr ', ' morgen eure Ausweise mit.', 'bringt'],
    ['vorbereiten', 'separable', 'Wir ', ' den Seminarraum gemeinsam vor.', 'bereiten'],
    ['teilnehmen', 'separable', 'Jonas ', ' jeden Mittwoch am Training teil.', 'nimmt'],
    ['besuchen', 'inseparable', 'Meine Schwester ', ' heute das Stadtmuseum.', 'besucht'],
    ['verstehen', 'inseparable', 'Du ', ' die neue Regel sofort.', 'verstehst'],
    ['erzählen', 'inseparable', 'Die Nachbarin ', ' uns eine lange Geschichte.', 'erzählt'],
    ['bekommen', 'inseparable', 'Die Gäste ', ' am Eingang ein Programm.', 'bekommen'],
    ['entdecken', 'inseparable', 'Ein Kind ', ' eine seltene Pflanze.', 'entdeckt'],
  ],
  'perfekt-haben': [
    ['aufräumen', 'separable', 'Lea sagt, dass sie das Lager ', '.', 'aufgeräumt hat'],
    ['anrufen', 'separable', 'Der Arzt bestätigt, dass er den Patienten ', '.', 'angerufen hat'],
    ['mitbringen', 'separable', 'Ihr erklärt, dass ihr alle Unterlagen ', '.', 'mitgebracht habt'],
    ['vorbereiten', 'separable', 'Wir berichten, dass wir die Sitzung ', '.', 'vorbereitet haben'],
    ['teilnehmen', 'separable', 'Milan erzählt, dass er am Workshop ', '.', 'teilgenommen hat'],
    ['besuchen', 'inseparable', 'Nora sagt, dass sie ihre Tante ', '.', 'besucht hat'],
    ['verstehen', 'inseparable', 'Du bestätigst, dass du die Aufgabe ', '.', 'verstanden hast'],
    ['erzählen', 'inseparable', 'Die Zeugin erklärt, dass sie alles ', '.', 'erzählt hat'],
    ['bekommen', 'inseparable', 'Die Gewinner sagen, dass sie ihre Urkunden ', '.', 'bekommen haben'],
    ['entdecken', 'inseparable', 'Das Team meldet, dass es den Fehler ', '.', 'entdeckt hat'],
  ],
  'perfekt-sein': [
    ['ankommen', 'separable', 'Nora schreibt, dass sie pünktlich ', '.', 'angekommen ist'],
    ['abfahren', 'separable', 'Der Zugbegleiter bestätigt, dass der Zug ', '.', 'abgefahren ist'],
    ['aufstehen', 'separable', 'Mila erzählt, dass sie sehr früh ', '.', 'aufgestanden ist'],
    ['zurückkehren', 'separable', 'Die Wanderer melden, dass sie sicher ', '.', 'zurückgekehrt sind'],
    ['ausgehen', 'separable', 'Wir sagen, dass wir gestern zusammen ', '.', 'ausgegangen sind'],
    ['verschwinden', 'inseparable', 'Der Hausmeister berichtet, dass der Schlüssel ', '.', 'verschwunden ist'],
    ['erscheinen', 'inseparable', 'Die Autorin bestätigt, dass ihr neuer Roman ', '.', 'erschienen ist'],
    ['geschehen', 'inseparable', 'Niemand weiß genau, was in der Nacht ', '.', 'geschehen ist'],
    ['entkommen', 'inseparable', 'Die Polizei meldet, dass das Tier ', '.', 'entkommen ist'],
    ['verunglücken', 'inseparable', 'Die Zeitung berichtet, dass ein Fahrer ', '.', 'verunglückt ist'],
  ],
  praeteritum: [
    ['aufwachen', 'separable', 'Kurz vor Sonnenaufgang ', ' das ganze Dorf auf.', 'wachte'],
    ['einladen', 'separable', 'Die Direktorin ', ' alle Mitarbeitenden ein.', 'lud'],
    ['mitnehmen', 'separable', 'Jonas ', ' seinen kleinen Bruder mit.', 'nahm'],
    ['vorlesen', 'separable', 'Die Lehrerin ', ' den Brief laut vor.', 'las'],
    ['zurückgeben', 'separable', 'Am Abend ', ' ich den Schlüssel zurück.', 'gab'],
    ['beginnen', 'inseparable', 'Die Vorstellung ', ' ohne Verspätung.', 'begann'],
    ['empfehlen', 'inseparable', 'Der Buchhändler ', ' einen kurzen Roman.', 'empfahl'],
    ['vergessen', 'inseparable', 'Wir ', ' damals oft die Wegbeschreibung.', 'vergaßen'],
    ['beschreiben', 'inseparable', 'Die Zeugin ', ' den Wagen sehr genau.', 'beschrieb'],
    ['erkennen', 'inseparable', 'Im Dunkeln ', ' er die Stimme sofort.', 'erkannte'],
  ],
  plusquamperfekt: [
    ['abschließen', 'separable', 'Bevor die Gäste kamen, hatte Mara die Tür ', '.', 'abgeschlossen'],
    ['vorbereiten', 'separable', 'Als die Sitzung begann, hatten wir alles ', '.', 'vorbereitet'],
    ['einsteigen', 'separable', 'Der Bus fuhr los, nachdem alle ', '.', 'eingestiegen waren'],
    ['zurückrufen', 'separable', 'Paul war beruhigt, weil die Ärztin ihn ', '.', 'zurückgerufen hatte'],
    ['wegfahren', 'separable', 'Als ich ankam, war der Lieferwagen schon ', '.', 'weggefahren'],
    ['bezahlen', 'inseparable', 'Wir gingen hinaus, nachdem wir die Rechnung ', '.', 'bezahlt hatten'],
    ['verlassen', 'inseparable', 'Die Straße war leer, weil alle das Fest ', '.', 'verlassen hatten'],
    ['entdecken', 'inseparable', 'Der Techniker kannte die Ursache, weil er den Defekt ', '.', 'entdeckt hatte'],
    ['bestellen', 'inseparable', 'Das Material lag bereit, denn die Firma hatte es früh ', '.', 'bestellt'],
    ['erreichen', 'inseparable', 'Als es dunkel wurde, hatten die Wanderer die Hütte ', '.', 'erreicht'],
  ],
  'futur-eins': [
    ['anmelden', 'separable', 'Mara verspricht, dass sie das Team morgen ', '.', 'anmelden wird'],
    ['aufbauen', 'separable', 'Die Helfer bestätigen, dass sie die Bühne ', '.', 'aufbauen werden'],
    ['mitfahren', 'separable', 'Ich bin sicher, dass du am Samstag ', '.', 'mitfahren wirst'],
    ['vorstellen', 'separable', 'Der Forscher kündigt an, dass er die Ergebnisse ', '.', 'vorstellen wird'],
    ['zurückkommen', 'separable', 'Nora schreibt, dass sie im Mai ', '.', 'zurückkommen wird'],
    ['besuchen', 'inseparable', 'Wir versprechen, dass wir euch bald ', '.', 'besuchen werden'],
    ['veröffentlichen', 'inseparable', 'Die Redaktion meldet, dass sie den Artikel ', '.', 'veröffentlichen wird'],
    ['erklären', 'inseparable', 'Der Trainer sagt, dass er die neue Regel ', '.', 'erklären wird'],
    ['bekommen', 'inseparable', 'Ihr werdet sehen, dass ihr rechtzeitig Hilfe ', '.', 'bekommen werdet'],
    ['entdecken', 'inseparable', 'Die Prognose sagt, dass das Teleskop neue Sterne ', '.', 'entdecken wird'],
  ],
  'futur-zwei': [
    ['abschließen', 'separable', 'Bis Freitag wird Lea den Vertrag ', '.', 'abgeschlossen haben'],
    ['aufbauen', 'separable', 'Vor der Eröffnung werden die Helfer alle Stände ', '.', 'aufgebaut haben'],
    ['ankommen', 'separable', 'Wenn wir starten, wird der Nachtzug bereits ', '.', 'angekommen sein'],
    ['zurückkehren', 'separable', 'Bis zum Abend werden die Wanderer ', '.', 'zurückgekehrt sein'],
    ['einreichen', 'separable', 'Am Monatsende wirst du den Antrag ', '.', 'eingereicht haben'],
    ['bezahlen', 'inseparable', 'Vor der Abreise werden wir jede Rechnung ', '.', 'bezahlt haben'],
    ['verlassen', 'inseparable', 'Wenn du eintriffst, werden die Gäste das Gebäude ', '.', 'verlassen haben'],
    ['entdecken', 'inseparable', 'Bis dahin wird das Labor die Ursache ', '.', 'entdeckt haben'],
    ['erreichen', 'inseparable', 'Am Gipfeltag wird die Gruppe ihr Ziel ', '.', 'erreicht haben'],
    ['bestellen', 'inseparable', 'Vor dem Fest wird die Küche alle Zutaten ', '.', 'bestellt haben'],
  ],
  'wuerde-form': [
    ['anrufen', 'separable', 'Mit deiner Nummer ', ' ich die Werkstatt sofort anrufen.', 'würde'],
    ['aufräumen', 'separable', 'Mit mehr Zeit ', ' Lea den Keller aufräumen.', 'würde'],
    ['mitkommen', 'separable', 'Bei gutem Wetter ', ' wir gern mitkommen.', 'würden'],
    ['vorbereiten', 'separable', 'An deiner Stelle ', ' ich das Gespräch vorbereiten.', 'würde'],
    ['teilnehmen', 'separable', 'Ohne den Termin ', ' ihr am Kurs teilnehmen.', 'würdet'],
    ['besuchen', 'inseparable', 'In Berlin ', ' Nora mehrere Museen besuchen.', 'würde'],
    ['verstehen', 'inseparable', 'Mit einem Beispiel ', ' du die Regel besser verstehen.', 'würdest'],
    ['erzählen', 'inseparable', 'Vor Freunden ', ' er die Geschichte anders erzählen.', 'würde'],
    ['bekommen', 'inseparable', 'Mit dem Stipendium ', ' die Studierenden mehr Unterstützung bekommen.', 'würden'],
    ['entdecken', 'inseparable', 'Bei klarem Himmel ', ' das Team mehr Details entdecken.', 'würde'],
  ],
  'konjunktiv-vergangenheit': [
    ['anrufen', 'separable', 'Mit einem Telefon ', ' ich dich sofort angerufen.', 'hätte'],
    ['aufpassen', 'separable', 'Mit der Warnung ', ' du besser aufgepasst.', 'hättest'],
    ['mitkommen', 'separable', 'Bei gutem Wetter ', ' wir mitgekommen.', 'wären'],
    ['zurückkehren', 'separable', 'Ohne den Sturm ', ' die Schiffe früher zurückgekehrt.', 'wären'],
    ['einpacken', 'separable', 'Mit mehr Platz ', ' ihr alle Bücher eingepackt.', 'hättet'],
    ['besuchen', 'inseparable', 'Mit einer Einladung ', ' Nora die Ausstellung besucht.', 'hätte'],
    ['verstehen', 'inseparable', 'Nach einer Erklärung ', ' er die Aufgabe verstanden.', 'hätte'],
    ['erzählen', 'inseparable', 'Ohne das Versprechen ', ' ich alles erzählt.', 'hätte'],
    ['erreichen', 'inseparable', 'Mit dem früheren Zug ', ' sie das Ziel erreicht.', 'hätten'],
    ['entkommen', 'inseparable', 'Ohne das neue Tor ', ' das Tier entkommen.', 'wäre'],
  ],
  imperativ: [
    ['aufstehen', 'separable', 'Mara, ', ' bitte sofort auf!', 'steh'],
    ['anrufen', 'separable', 'Paul, ', ' morgen die Ärztin an!', 'ruf'],
    ['mitbringen', 'separable', 'Kinder, ', ' eure Hefte mit!', 'bringt'],
    ['vorlesen', 'separable', 'Frau Klein, ', ' Sie den Absatz laut vor!', 'lesen'],
    ['teilnehmen', 'separable', 'Jonas, ', ' an der Besprechung teil!', 'nimm'],
    ['besuchen', 'inseparable', 'Mara, ', ' deine Großeltern am Sonntag!', 'besuche'],
    ['vergessen', 'inseparable', 'Leute, ', ' eure Tickets nicht!', 'vergesst'],
    ['erklären', 'inseparable', 'Herr Roth, ', ' Sie bitte den nächsten Schritt!', 'erklären'],
    ['benutzen', 'inseparable', 'Lina, ', ' den hinteren Eingang!', 'benutze'],
    ['entfernen', 'inseparable', 'Helfer, ', ' alle leeren Kisten!', 'entfernt'],
  ],
}

const SEPARABLE_PREFIXES = ['zurück', 'vor', 'teil', 'mit', 'ein', 'aus', 'auf', 'weg', 'ab', 'an'] as const

function sentencePrompt(verb: string, separation: SeparationSeed[1], before: string, after: string) {
  if (separation === 'inseparable') return `${before}___${after}`
  const prefix = SEPARABLE_PREFIXES.find((candidate) => verb.startsWith(candidate))
  if (!prefix) return `${before}___${after}`
  const hiddenParticle = new RegExp(`\\s${prefix}([.!?])$`)
  return `${before}___${after.replace(hiddenParticle, '$1')}`
}

export const GERMAN_SEPARATION_CHALLENGES: SeparationChallenge<GermanFormId>[] = Object.entries(SEPARATION_SEEDS)
  .flatMap(([form, seeds]) => seeds.map(([verb, separation, before, after, answer], index) => {
    const completeSentence = `${before}${answer}${after}`.replace(/\\s+/g, ' ').trim()
    return {
      id: `de-${form}-separation-${index + 1}`,
      tense: form as GermanFormId,
      title: `${verb} · ${index + 1}`,
      focus: form,
      verb,
      separation,
      prompt: sentencePrompt(verb, separation, before, after),
      segments: [before, after],
      answers: [completeSentence, completeSentence.replace(/[.!?]$/, '')],
      explanation: separation === 'separable'
        ? `„${verb}“ ist trennbar. Schreibe den ganzen Satz und setze Vorsilbe und Verbstamm an ihre richtigen Positionen.`
        : `„${verb}“ ist untrennbar. Schreibe den ganzen Satz; die Vorsilbe bleibt mit dem Verbstamm verbunden.`,
    }
  }))

type StorySeed = {
  title: string
  segments: string[]
  verbs: string[]
  answers: string[]
  explanation: string
}

const FINAL_STORY_SEEDS: Record<GermanFormId, StorySeed> = {
  praesens: {
    title: 'Ein langer Tag im Stadtarchiv',
    segments: ['Jeden Dienstag ', ' Leas Dienst um acht Uhr. Zuerst ', ' sie den Lesesaal und ', ' die neuen Anfragen. Danach ', ' zwei Kollegen alte Karten, während Lea E-Mails ', '. Gegen Mittag ', ' ein Kurier mehrere Kisten. Die Restauratorinnen ', ' empfindliche Dokumente aus dem Lager und Lea ', ' jedes Paket in eine Liste ein. Am Nachmittag ', ' eine Schulklasse an einer Führung teil. Kurz vor Feierabend ', ' das Team alle Fenster; anschließend ', ' Lea mit der Straßenbahn nach Hause.'],
    verbs: ['beginnen', 'öffnen', 'prüfen', 'sortieren', 'beantworten', 'bringen', 'holen', 'tragen', 'nehmen', 'schließen', 'fahren'],
    answers: ['beginnt', 'öffnet', 'prüft', 'sortieren', 'beantwortet', 'bringt', 'holen', 'trägt', 'nimmt', 'schließt', 'fährt'],
    explanation: 'Achte im gesamten Bericht auf Person, Numerus, Stammwechsel und trennbare Verben im Präsens.',
  },
  'perfekt-haben': {
    title: 'Das Nachbarschaftsfest ist vorbei',
    segments: ['Am Sonntagabend erzählt Mara, dass der Verein das Fest monatelang ', '. Zuerst berichtet sie, dass mehrere Nachbarn Spenden ', '. Dann erklärt sie, dass ein Designer die Plakate ', ' und eine Druckerei sie rechtzeitig ', '. Am Festtag haben Freiwillige alle Stände ', '. Eine Elektrikerin bestätigt, dass sie jede Leitung ', '. Die Jugendlichen sagen, dass sie die Bühne ', ' und später viele Fotos ', '. Schließlich meldet Mara, dass sie den Bericht ', ' und der Vorstand allen Helfern persönlich ', '.'],
    verbs: ['planen', 'sammeln', 'entwerfen', 'liefern', 'aufbauen', 'prüfen', 'dekorieren', 'machen', 'veröffentlichen', 'danken'],
    answers: ['geplant hat', 'gesammelt haben', 'entworfen hat', 'geliefert hat', 'aufgebaut', 'geprüft hat', 'dekoriert haben', 'gemacht haben', 'veröffentlicht hat', 'gedankt hat'],
    explanation: 'Schreibe jede vollständige Perfektgruppe mit dem passenden Präsens von „haben“ und dem Partizip II.',
  },
  'perfekt-sein': {
    title: 'Eine Reise durch die Alpen',
    segments: ['Nora erzählt, dass sie am Freitag sehr früh ', '. Ihr Bruder berichtet, dass er erst später zum Bahnhof ', '. Trotzdem sind beide mit demselben Zug ', '. In Innsbruck sagt Nora, dass sie sofort in einen Regionalzug ', '. Nach einer Stunde sind sie in einem kleinen Dorf ', '. Sie erzählen, dass sie von dort aus zu Fuß bis zu einer Hütte ', '. Unterwegs ist das Wetter plötzlich schlechter ', ', doch niemand ist stehen ', '. Kurz vor Einbruch der Dunkelheit sind alle sicher oben ', '. Am nächsten Morgen berichtet Nora, dass die Gruppe früh ins Tal ', '.'],
    verbs: ['aufstehen', 'kommen', 'fahren', 'umsteigen', 'ankommen', 'gehen', 'werden', 'bleiben', 'gelangen', 'zurücksteigen'],
    answers: ['aufgestanden ist', 'gekommen ist', 'gefahren', 'umgestiegen ist', 'angekommen', 'gegangen sind', 'geworden', 'geblieben', 'gelangt', 'zurückgestiegen ist'],
    explanation: 'Setze bei Bewegung und Zustandsänderung das passende Präsens von „sein“ mit dem Partizip II ein.',
  },
  praeteritum: {
    title: 'Die Nacht im alten Bahnhof',
    segments: ['Der letzte Zug ', ' kurz vor Mitternacht ab. Im Wartesaal ', ' nur noch drei Reisende. Eine Lampe ', ' unruhig, während draußen der Wind durch die Türen ', '. Plötzlich ', ' jemand an ein Fenster. Der Bahnhofsvorsteher ', ' seine Taschenlampe und ', ' langsam über den Bahnsteig. Hinter einem Gepäckwagen ', ' er einen verirrten Hund. Das Tier ', ' vor Kälte, ließ sich aber ruhig tragen. Wenig später ', ' sein Besitzer und ', ' dem Bahnhofsvorsteher erleichtert.'],
    verbs: ['fahren', 'sitzen', 'flackern', 'pfeifen', 'klopfen', 'nehmen', 'gehen', 'finden', 'zittern', 'erscheinen', 'danken'],
    answers: ['fuhr', 'saßen', 'flackerte', 'pfiff', 'klopfte', 'nahm', 'ging', 'fand', 'zitterte', 'erschien', 'dankte'],
    explanation: 'Halte die zusammenhängende Erzählung konsequent im Präteritum und beachte starke Verben.',
  },
  plusquamperfekt: {
    title: 'Warum die Ausstellung später öffnete',
    segments: ['Als die Museumsleiterin eintraf, ', ' der Nachtwächter bereits einen Wasserschaden entdeckt. Eine Leitung ', ' hinter der Wand gebrochen, und Wasser ', ' in den kleinen Saal gelaufen. Zum Glück ', ' eine Restauratorin die wertvollsten Bilder am Vorabend ausgelagert. Das Technikteam ', ' die Hauptleitung schon geschlossen, bevor weitere Räume betroffen waren. Ein Mitarbeiter konnte die Gäste informieren, weil er ihre Adressen vorher ', '. Die Feuerwehr kannte den Zugang, denn sie ', ' den Plan im Frühjahr geprüft. Nachdem Fachleute den Boden ', ', begann die Reinigung. Bis die Presse kam, ', ' die Leitung eine neue Öffnungszeit festgelegt und alle Hinweise ', '.'],
    verbs: ['haben', 'sein', 'sein', 'haben', 'haben', 'notieren', 'haben', 'untersuchen', 'haben', 'aktualisieren'],
    answers: ['hatte', 'war', 'war', 'hatte', 'hatte', 'notiert hatte', 'hatte', 'untersucht hatten', 'hatte', 'aktualisiert'],
    explanation: 'Markiere in jedem Abschnitt, was schon vor dem nächsten vergangenen Ereignis abgeschlossen war.',
  },
  'futur-eins': {
    title: 'Die Stadt plant ein Kulturwochenende',
    segments: ['Im kommenden Mai ', ' die Stadt ein großes Kulturwochenende veranstalten. Der Bürgermeister verspricht, dass alle Stadtteile eigene Bühnen ', '. Ein neues Shuttle ', ' die Veranstaltungsorte miteinander verbinden. Freiwillige ', ' Besucher am Bahnhof begrüßen und ihnen Programme geben. Laut Wetterdienst ', ' es wahrscheinlich mild bleiben. Falls es regnet, ', ' die Konzerte in Hallen stattfinden. Mehrere Restaurants kündigen an, dass sie regionale Gerichte ', '. Die Bibliothek ', ' bis Mitternacht geöffnet sein. Am Sonntagabend ', ' ein Orchester das Abschlusskonzert spielen, und die Stadt ', ' die besten Projekte im folgenden Jahr weiter fördern.'],
    verbs: ['werden', 'erhalten', 'werden', 'werden', 'werden', 'werden', 'anbieten', 'werden', 'werden', 'werden'],
    answers: ['wird', 'erhalten werden', 'wird', 'werden', 'wird', 'werden', 'anbieten werden', 'wird', 'wird', 'wird'],
    explanation: 'Bilde in jeder Prognose oder Zusage „werden + Infinitiv“ und passe „werden“ an das Subjekt an.',
  },
  'futur-zwei': {
    title: 'Bilanz am Tag der Eröffnung',
    segments: ['Wenn das Forschungszentrum im Oktober öffnet, ', ' die Bauleute den Rohbau seit Monaten abgeschlossen haben. Die Elektriker ', ' alle Leitungen geprüft haben, und das Sicherheitsteam ', ' jedes Notfallsystem getestet haben. Bis dahin wird die Stadt den Vorplatz ', ' haben. Mehr als hundert Bäume ', ' gepflanzt worden sein. Die ersten Forschenden ', ' bereits in ihre Büros eingezogen sein. Bevor die Gäste eintreffen, ', ' das Kommunikationsteam alle Wegweiser montiert haben. Die Direktorin ', ' ihre Eröffnungsrede mehrfach geprobt haben. Auch die Cafeteria wird den ersten Einkauf ', ' haben. Am Abend wird das Zentrum seinen ersten öffentlichen Tag erfolgreich ', ' haben.'],
    verbs: ['werden', 'werden', 'werden', 'gestalten', 'werden', 'werden', 'werden', 'werden', 'erledigen', 'beenden'],
    answers: ['werden', 'werden', 'wird', 'gestaltet', 'werden', 'werden', 'wird', 'wird', 'erledigt', 'beendet'],
    explanation: 'Vervollständige jede Zukunftsbilanz mit Partizip II, „haben/sein“ und der passenden Form von „werden“ im Satz.',
  },
  'wuerde-form': {
    title: 'Ein Kulturhaus für das Viertel',
    segments: ['Mit einem leer stehenden Gebäude ', ' der Verein ein Kulturhaus eröffnen. Im Erdgeschoss ', ' er ein kleines Café einrichten. Ehrenamtliche ', ' dort Sprachkurse anbieten, und eine Musikerin ', ' jeden Freitag Proben leiten. Mit einem größeren Budget ', ' wir auch die Bühne renovieren. Die Nachbarn ', ' den Innenhof gemeinsam bepflanzen. Ein ruhiger Leseraum ', ' vielen Jugendlichen beim Lernen helfen. Ich ', ' gern die Öffentlichkeitsarbeit übernehmen. Würdet ihr am Wochenende Zeit haben, ', ' ihr beim Umbau helfen? Unter diesen Bedingungen ', ' das Haus schnell zu einem Treffpunkt werden.'],
    verbs: ['werden', 'werden', 'werden', 'werden', 'werden', 'werden', 'werden', 'werden', 'werden', 'werden'],
    answers: ['würde', 'würde', 'würden', 'würde', 'würden', 'würden', 'würde', 'würde', 'würdet', 'würde'],
    explanation: 'Passe „würde“ an das Subjekt an und lasse den bedeutungstragenden Infinitiv am Satzende stehen.',
  },
  'konjunktiv-vergangenheit': {
    title: 'Die abgesagte Bergtour',
    segments: ['Mit einer besseren Wetterprognose ', ' die Gruppe früher aufgebrochen. Ohne den Defekt am Bus ', ' alle rechtzeitig am Ausgangspunkt angekommen. Der Leiter ', ' die Route nicht geändert, wenn der obere Weg sicher gewesen wäre. Mit wärmerer Kleidung ', ' zwei Teilnehmer nicht umgekehrt. Hättest du die Warnung gelesen, ', ' du zusätzliche Ausrüstung mitgebracht. Ohne den starken Nebel ', ' wir den Gipfel erreicht. Die Fotografin ', ' eindrucksvolle Bilder gemacht, wenn die Sicht frei gewesen wäre. Mit einer offenen Hütte ', ' die Gruppe dort übernachtet. Der Fahrer ', ' nicht so lange im Tal gewartet, wenn er eine Nachricht erhalten hätte. Unter normalen Bedingungen ', ' alle am Abend zufrieden zurückgekehrt.'],
    verbs: ['sein', 'sein', 'haben', 'sein', 'haben', 'haben', 'haben', 'haben', 'haben', 'sein'],
    answers: ['wäre', 'wären', 'hätte', 'wären', 'hättest', 'hätten', 'hätte', 'hätte', 'hätte', 'wären'],
    explanation: 'Bilde jede nicht eingetretene Vergangenheit mit „hätte/wäre + Partizip II“ und achte auf das Hilfsverb.',
  },
  imperativ: {
    title: 'Anweisungen vor dem Schulfest',
    segments: ['Die Koordinatorin verteilt Aufgaben: „Mara, ', ' zuerst die Gästeliste! Jonas und Elif, ', ' die Schilder am Eingang auf! Herr Klein, ', ' Sie bitte die Technik! Nina, ', ' die Kabel nicht im Durchgang liegen! Helfer, ', ' vorsichtig mit den Gläsern! Frau Roth, ', ' Sie die Lieferanten zum Hof! Kinder, ', ' während der Probe leise! Paul, ', ' die Seitentür nach draußen nicht ab! Gäste, ', ' Sie bitte dem markierten Weg! Und jetzt, Team, ', ' mit dem Aufbau an!“'],
    verbs: ['prüfen (du)', 'hängen (ihr)', 'testen (Sie)', 'lassen (du)', 'sein (ihr)', 'führen (Sie)', 'bleiben (ihr)', 'schließen (du)', 'folgen (Sie)', 'fangen (ihr)'],
    answers: ['prüfe', 'hängt', 'testen', 'lass', 'seid', 'führen', 'bleibt', 'schließ', 'folgen', 'fangt'],
    explanation: 'Erkenne die Anrede in jedem Satz und schreibe die passende Imperativform; sichtbare Zusätze bleiben im Text.',
  },
}

export const GERMAN_FINAL_STORIES: GapChallenge<GermanFormId>[] = Object.entries(FINAL_STORY_SEEDS).map(([form, seed]) => ({
  id: `de-${form}-written-final-story`,
  title: seed.title,
  focus: form,
  instruction: 'Lies die ganze Geschichte. Ergänze alle Verbgruppen schriftlich; die Auswertung erscheint erst am Ende.',
  segments: seed.segments,
  gaps: seed.verbs.map((verb, index) => ({
    id: `de-${form}-written-final-story-gap-${index + 1}`,
    tense: form as GermanFormId,
    verb,
    answers: [seed.answers[index]],
  })),
  explanation: seed.explanation,
}))
