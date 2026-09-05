import type { ErrorChallenge, GapChallenge, SeparationChallenge } from './tense-quest-types.ts'
import type { GermanFormId } from './german-structure-quest-config.ts'

type AnswerSeed = string | string[]
type CorrectionLine = [before: string, answer: AnswerSeed, wrong: string, after: string]

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
    ['Wenn ich mehr Zeit hätte, ', 'würde', 'werde', ' ich täglich kochen.'],
    ['Wenn Lena an deiner Stelle wäre, ', 'würde', 'wird', ' sie den Vertrag prüfen.'],
    ['Wenn wir ein ruhigeres Zimmer bekämen, ', 'würden', 'werden', ' wir gern ein ruhigeres Zimmer buchen.'],
    ['Wenn es nicht so laut wäre, ', 'würden', 'werden', ' die Kinder besser schlafen.'],
    ['Wenn Sie kurz warten könnten, ', 'würde', 'werde', ' ich sofort den Leiter holen.'],
    ['Wenn das Wetter besser wäre, ', 'würdet', 'werdet', ' ihr länger draußen bleiben.'],
    ['Wenn der Verein mehr Geld hätte, ', 'würde', 'wird', ' der Verein das Projekt mit einer Spende unterstützen.'],
    ['Wenn Nora die Erlaubnis bekäme, ', 'würde', 'wird', ' sie allein reisen.'],
    ['Wenn ich wählen dürfte, ', 'würde', 'werde', ' ich bitte einen Tee nehmen.'],
    ['Wenn wir einen größeren Saal hätten, ', 'würden', 'werden', ' wir mehr Gäste einladen.'],
  ],
  'konjunktiv-vergangenheit': [
    ['Ich habe den Termin tatsächlich verpasst; mit deiner Nachricht ', 'hätte', 'hatte', ' ich den Termin nicht verpasst.'],
    ['Die Gäste sind wegen des Staus tatsächlich zu spät angekommen; ohne den Stau ', 'wären', 'waren', ' die Gäste pünktlich angekommen.'],
    ['Er hat die Vase tatsächlich zerbrochen; mit mehr Vorsicht ', 'hätte', 'hatte', ' er die Vase nicht zerbrochen.'],
    ['Wir sind wegen des schlechten Wetters tatsächlich nicht zum Gipfel gegangen; bei besserem Wetter ', 'wären', 'waren', ' wir zum Gipfel gegangen.'],
    ['Du hast den Fehler tatsächlich nicht bemerkt; du ', 'hättest', 'hattest', ' den Fehler früher bemerkt.'],
    ['Ihr habt euch tatsächlich verlaufen; mit einer Karte ', 'hättet', 'hattet', ' ihr euch nicht verlaufen.'],
    ['Das Schiff ist tatsächlich nicht ausgelaufen; ohne die Warnung ', 'wäre', 'war', ' das Schiff ausgelaufen.'],
    ['Ich habe dir tatsächlich nicht geholfen; unter anderen Umständen ', 'hätte', 'hatte', ' ich dir geholfen.'],
    ['Sie haben den Auftrag tatsächlich abgelehnt; mit genug Personal ', 'hätten', 'hatten', ' sie den Auftrag angenommen.'],
    ['Der Zug ist wegen des Defekts tatsächlich zu spät abgefahren; ohne den Defekt ', 'wäre', 'war', ' der Zug rechtzeitig abgefahren.'],
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
const answerVariants = (answer: AnswerSeed): string[] => Array.isArray(answer) ? answer : [answer]

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
        form: entryIndex === wrong ? entry[2] : answerVariants(entry[1])[0],
        id: `de-${form}-independent-error-${index + 1}-token-${entryIndex + 1}`,
      })),
      after: selected[4][3],
      wrongId: `de-${form}-independent-error-${index + 1}-token-${wrong + 1}`,
      answers: answerVariants(selected[wrong][1]),
      explanation: `${rule} Im markierten Satz muss die Verbgruppe zu Subjekt, Zeitbezug und Satzbau passen.`,
    }
  })
}

type SeparationSeed = [
  verb: string,
  separation: 'separable' | 'inseparable',
  before: string,
  after: string,
  answer: AnswerSeed,
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
    ['besuchen', 'inseparable', 'Wenn Nora mehr Zeit hätte, ', ' sie in Berlin mehrere Museen besuchen.', 'würde'],
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
    ['aufstehen', 'separable', 'Mara, ', ' bitte sofort auf!', ['steh', 'stehe']],
    ['anrufen', 'separable', 'Paul, ', ' morgen die Ärztin an!', ['ruf', 'rufe']],
    ['mitbringen', 'separable', 'Kinder, ', ' eure Hefte mit!', 'bringt'],
    ['vorlesen', 'separable', 'Frau Klein, ', ' Sie den Absatz laut vor!', 'lesen'],
    ['teilnehmen', 'separable', 'Jonas, ', ' an der Besprechung teil!', 'nimm'],
    ['besuchen', 'inseparable', 'Mara, ', ' deine Großeltern am Sonntag!', ['besuche', 'besuch']],
    ['vergessen', 'inseparable', 'Leute, ', ' eure Tickets nicht!', 'vergesst'],
    ['erklären', 'inseparable', 'Herr Roth, ', ' Sie bitte den nächsten Schritt!', 'erklären'],
    ['benutzen', 'inseparable', 'Lina, ', ' den hinteren Eingang!', ['benutze', 'benutz']],
    ['entfernen', 'inseparable', 'Helfer, ', ' alle leeren Kisten!', 'entfernt'],
  ],
}

function sentencePrompt(verb: string, separation: SeparationSeed[1], before: string, after: string) {
  if (separation === 'inseparable') return `${before}___${after}`
  const finalWord = after.match(/\s([\p{L}-]+)([.!?])$/u)
  const particle = finalWord?.[1]
  const exposesDetachedParticle = particle && particle.length < verb.length && verb.startsWith(particle)
  return `${before}___${exposesDetachedParticle ? after.replace(/\s[\p{L}-]+([.!?])$/u, '$1') : after}`
}

// Los bancos editoriales declaran cinco verbos de cada clase. Este orden estable
// evita tanto los bloques 5+5 como una alternancia mecánica fácil de anticipar.
const SEPARATION_MIX_ORDER = [0, 5, 2, 7, 6, 1, 9, 4, 8, 3] as const

export const GERMAN_SEPARATION_CHALLENGES: SeparationChallenge<GermanFormId>[] = Object.entries(SEPARATION_SEEDS)
  .flatMap(([form, seeds], formIndex) => {
    const rotation = formIndex % SEPARATION_MIX_ORDER.length
    const order = [...SEPARATION_MIX_ORDER.slice(rotation), ...SEPARATION_MIX_ORDER.slice(0, rotation)]
    return order.map((seedIndex, index) => {
      const [verb, separation, before, after, answer] = seeds[seedIndex]
      return {
        id: `de-${form}-separation-${index + 1}`,
        tense: form as GermanFormId,
        title: `${verb} · ${index + 1}`,
        focus: form,
        verb,
        separation,
        prompt: sentencePrompt(verb, separation, before, after),
        answers: answerVariants(answer).flatMap((variant) => {
          const completeSentence = `${before}${variant}${after}`.replace(/\s+/g, ' ').trim()
          return [completeSentence, completeSentence.replace(/[.!?]$/, '')]
        }),
        explanation: separation === 'separable'
          ? `„${verb}“ ist trennbar. Schreibe den ganzen Satz und setze Vorsilbe und Verbstamm an ihre richtigen Positionen.`
          : `„${verb}“ ist untrennbar. Schreibe den ganzen Satz; die Vorsilbe bleibt mit dem Verbstamm verbunden.`,
      }
    })
  })

type StorySeed = {
  title: string
  instruction?: string
  segments: string[]
  verbs: string[]
  answers: AnswerSeed[]
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
    segments: ['Am Sonntagabend erzählt Mara, dass der Verein das Fest monatelang ', '. Zuerst berichtet sie, dass mehrere Nachbarn Spenden ', '. Dann erklärt sie, dass ein Designer die Plakate ', ' und eine Druckerei sie rechtzeitig ', '. Für den Festtag bestätigt Mara, dass Freiwillige alle Stände ', '. Eine Elektrikerin bestätigt, dass sie jede Leitung ', '. Die Jugendlichen sagen, dass sie die Bühne ', ' und später viele Fotos ', '. Schließlich meldet Mara, dass sie den Bericht ', ' und der Vorstand allen Helfern persönlich ', '.'],
    verbs: ['planen', 'sammeln', 'entwerfen', 'liefern', 'aufbauen', 'prüfen', 'dekorieren', 'machen', 'veröffentlichen', 'danken'],
    answers: ['geplant hat', 'gesammelt haben', 'entworfen hat', 'geliefert hat', 'aufgebaut haben', 'geprüft hat', 'dekoriert haben', 'gemacht haben', 'veröffentlicht hat', 'gedankt hat'],
    explanation: 'Schreibe jede vollständige Perfektgruppe mit dem passenden Präsens von „haben“ und dem Partizip II.',
  },
  'perfekt-sein': {
    title: 'Eine Reise durch die Alpen',
    instruction: 'Lies die ganze Geschichte. Ergänze alle vollständigen Verbgruppen im Perfekt mit „sein“; die Auswertung erscheint erst am Ende.',
    segments: ['Nora erzählt, dass sie am Freitag sehr früh ', '. Ihr Bruder berichtet, dass er erst später am Bahnhof ', '. Beide sagen, dass sie trotzdem mit demselben Zug nach Innsbruck ', '. Dort erzählt Nora, dass sie sofort in einen Regionalzug ', '. Nach einer Stunde berichten sie, dass sie in einem kleinen Dorf ', '. Sie erklären, dass sie von dort zu Fuß bis zu einer Hütte ', '. Unterwegs merken alle, dass das Wetter plötzlich schlechter ', '. Der Leiter bestätigt jedoch, dass niemand ', '. Kurz vor Einbruch der Dunkelheit melden sie, dass alle sicher oben ', '. Am nächsten Morgen erzählt Nora, dass die Gruppe früh ins Tal ', '.'],
    verbs: ['aufstehen', 'ankommen', 'fahren', 'umsteigen', 'ankommen', 'gehen', 'werden', 'stehen bleiben', 'gelangen', 'absteigen'],
    answers: ['aufgestanden ist', 'angekommen ist', 'gefahren sind', 'umgestiegen ist', 'angekommen sind', 'gegangen sind', 'geworden ist', 'stehen geblieben ist', 'gelangt sind', 'abgestiegen ist'],
    explanation: 'Jede Lücke enthält Partizip II und die zum Subjekt passende Präsensform von „sein“. Bewegung, Ortswechsel und Zustandsänderung lizenzieren das Hilfsverb.',
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
    instruction: 'Lies die ganze Geschichte. Ergänze jede vollständige Verbgruppe im Plusquamperfekt; die Auswertung erscheint erst am Ende.',
    segments: ['Als die Museumsleiterin eintraf, stellte sie fest, dass der Nachtwächter bereits einen Wasserschaden ', '. Eine erste Prüfung zeigte, dass eine Leitung hinter der Wand ', ' und dass Wasser in den kleinen Saal ', '. Zum Glück erfuhr die Leiterin, dass eine Restauratorin die wertvollsten Bilder am Vorabend ', '. Das Technikteam erklärte, dass es die Hauptleitung schon ', '. Ein Mitarbeiter konnte die Gäste informieren, weil er ihre Adressen vorher ', '. Die Feuerwehr kannte den Zugang, weil sie den Plan im Frühjahr ', '. Nachdem Fachleute den Boden ', ', begann die Reinigung. Später berichtete die Leiterin, dass sie vor der Pressekonferenz eine neue Öffnungszeit ', ' und alle Hinweise rechtzeitig ', '.'],
    verbs: ['entdecken', 'brechen', 'laufen', 'auslagern', 'schließen', 'notieren', 'prüfen', 'untersuchen', 'festlegen', 'aktualisieren'],
    answers: ['entdeckt hatte', 'gebrochen war', 'gelaufen war', 'ausgelagert hatte', 'geschlossen hatte', 'notiert hatte', 'geprüft hatte', 'untersucht hatten', 'festgelegt hatte', 'aktualisiert hatte'],
    explanation: 'Jede Lücke nennt ein Geschehen, das vor einem zweiten vergangenen Zeitpunkt abgeschlossen war. Das Plusquamperfekt übernimmt „haben“ oder „sein“ aus dem Perfekt des jeweiligen Verbs.',
  },
  'futur-eins': {
    title: 'Die Stadt plant ein Kulturwochenende',
    segments: ['Die Stadt kündigt an, dass sie im kommenden Mai ein großes Kulturwochenende ', '. Der Bürgermeister verspricht, dass alle Stadtteile eigene Bühnen ', '. Die Verkehrsplanung sieht vor, dass ein neues Shuttle die Veranstaltungsorte miteinander ', '. Die Organisatoren erklären, dass Freiwillige die Besucher am Bahnhof ', '. Der Wetterdienst prognostiziert, dass es wahrscheinlich mild ', '. Für Regen versichert das Team, dass die Konzerte in Hallen ', '. Mehrere Restaurants kündigen an, dass sie regionale Gerichte ', '. Die Bibliotheksleitung kündigt an, dass das Haus bis Mitternacht geöffnet ', '. Das Programm bestätigt, dass ein Orchester am Sonntagabend das Abschlusskonzert ', '. Die Stadt verspricht außerdem, dass sie die besten Projekte im folgenden Jahr ', '.'],
    verbs: ['veranstalten', 'erhalten', 'verbinden', 'begrüßen', 'bleiben', 'stattfinden', 'anbieten', 'sein', 'spielen', 'weiter fördern'],
    answers: ['veranstalten wird', 'erhalten werden', 'verbinden wird', 'begrüßen werden', 'bleiben wird', 'stattfinden werden', 'anbieten werden', 'sein wird', 'spielen wird', 'weiter fördern wird'],
    explanation: 'Bilde in jeder Prognose oder Zusage „werden + Infinitiv“ und passe „werden“ an das Subjekt an.',
  },
  'futur-zwei': {
    title: 'Bilanz am Tag der Eröffnung',
    instruction: 'Lies die ganze Geschichte. Ergänze jede vollständige Verbgruppe im Futur II; die Auswertung erscheint erst am Ende.',
    segments: ['Wenn das Forschungszentrum im Oktober öffnet, wird feststehen, dass die Bauleute den Rohbau seit Monaten ', '. Die Leitung erwartet, dass die Elektriker alle Leitungen ', ' und dass das Sicherheitsteam jedes Notfallsystem ', '. Der Bürgermeister verspricht, dass die Stadt den Vorplatz bis dahin ', '. Die Gärtner versichern, dass vor der Eröffnung mehr als hundert Bäume ', '. Die Verwaltung rechnet damit, dass die ersten Forschenden bereits in ihre Büros ', '. Bevor die Gäste eintreffen, wird die Direktorin prüfen, ob das Kommunikationsteam alle Wegweiser ', '. Außerdem erwartet sie, dass sie ihre Eröffnungsrede mehrfach ', '. Auch die Cafeteria meldet, dass sie den ersten Einkauf bis zum Vorabend ', '. Am Abend wird die Stadt feststellen, dass das Zentrum seinen ersten öffentlichen Tag erfolgreich ', '.'],
    verbs: ['abschließen', 'prüfen', 'testen', 'gestalten', 'pflanzen', 'einziehen', 'montieren', 'proben', 'erledigen', 'beenden'],
    answers: ['abgeschlossen haben werden', 'geprüft haben werden', 'getestet haben wird', 'gestaltet haben wird', 'gepflanzt worden sein werden', 'eingezogen sein werden', 'montiert haben wird', 'geprobt haben wird', 'erledigt haben wird', 'beendet haben wird'],
    explanation: 'Jede Lücke enthält Partizip II, den passenden Perfektinfinitiv mit „haben“ oder „sein“ und die zum Subjekt passende Form von „werden“. Alle Ergebnisse liegen vor einem ausdrücklich genannten künftigen Zeitpunkt.',
  },
  'wuerde-form': {
    title: 'Ein Kulturhaus für das Viertel',
    instruction: 'Lies die ganze Geschichte. Ergänze jede vollständige Verbgruppe aus Infinitiv und passender würde-Form; die Auswertung erscheint erst am Ende.',
    segments: ['Mit einem leer stehenden Gebäude erklärt der Verein, dass er ein Kulturhaus ', '. Im Erdgeschoss sagt er, dass er ein kleines Café ', '. Die Ehrenamtlichen erklären, dass sie dort Sprachkurse ', ', und eine Musikerin sagt, dass sie jeden Freitag Proben ', '. Mit einem größeren Budget meinen wir, dass wir auch die Bühne ', '. Die Nachbarn sagen, dass sie den Innenhof gemeinsam ', '. Die Planer glauben, dass ein ruhiger Leseraum vielen Jugendlichen beim Lernen ', '. Ich sage, dass ich gern die Öffentlichkeitsarbeit ', '. Die Nachbarn fragen, ob ihr am Wochenende beim Umbau ', '. Unter diesen Bedingungen glaubt der Verein, dass das Haus schnell zu einem Treffpunkt ', '.'],
    verbs: ['eröffnen', 'einrichten', 'anbieten', 'leiten', 'renovieren', 'bepflanzen', 'helfen', 'übernehmen', 'helfen', 'werden'],
    answers: ['eröffnen würde', 'einrichten würde', 'anbieten würden', 'leiten würde', 'renovieren würden', 'bepflanzen würden', 'helfen würde', 'übernehmen würde', 'helfen würdet', 'werden würde'],
    explanation: 'Jede Lücke verlangt die vollständige Einheit „Infinitiv + würde“; die Bedingung verhindert eine Lesart als bloße Zukunft.',
  },
  'konjunktiv-vergangenheit': {
    title: 'Die abgesagte Bergtour',
    instruction: 'Lies die ganze Geschichte. Ergänze jede vollständige Verbgruppe aus Partizip II und passender hätte-/wäre-Form; die Auswertung erscheint erst am Ende.',
    segments: ['Mit einer besseren Wetterprognose meint der Leiter, dass die Gruppe früher ', '. Ohne den Defekt am Bus glaubt er, dass alle rechtzeitig am Ausgangspunkt ', '. Der Leiter sagt, dass er die Route nicht ', ', wenn der obere Weg sicher gewesen wäre. Mit wärmerer Kleidung steht fest, dass zwei Teilnehmer nicht ', '. Hättest du die Warnung gelesen, wäre klar, dass du zusätzliche Ausrüstung ', '. Ohne den starken Nebel meinen wir, dass wir den Gipfel ', '. Die Fotografin sagt, dass sie eindrucksvolle Bilder ', ', wenn die Sicht frei gewesen wäre. Mit einer offenen Hütte glaubt die Gruppe, dass sie dort ', '. Der Fahrer erklärt, dass er nicht so lange im Tal ', ', wenn er eine Nachricht erhalten hätte. Unter normalen Bedingungen meint der Leiter, dass alle am Abend zufrieden ', '.'],
    verbs: ['aufbrechen', 'ankommen', 'ändern', 'umkehren', 'mitbringen', 'erreichen', 'machen', 'übernachten', 'warten', 'zurückkehren'],
    answers: ['aufgebrochen wäre', 'angekommen wären', 'geändert hätte', 'umgekehrt wären', 'mitgebracht hättest', 'erreicht hätten', 'gemacht hätte', 'übernachtet hätte', 'gewartet hätte', 'zurückgekehrt wären'],
    explanation: 'Jede Lücke exige Partizip II y Konjunktiv II del auxiliar heredado: sein para los cambios o desplazamientos indicados y haben para los demás verbos de esta historia.',
  },
  imperativ: {
    title: 'Anweisungen vor dem Schulfest',
    segments: ['Die Koordinatorin verteilt Aufgaben: „Mara, ', ' zuerst die Gästeliste! Jonas und Elif, ', ' die Schilder am Eingang auf! Herr Klein, ', ' Sie bitte die Technik! Nina, ', ' die Kabel nicht im Durchgang liegen! Helfer, ', ' vorsichtig mit den Gläsern! Frau Roth, ', ' Sie die Lieferanten zum Hof! Kinder, ', ' während der Probe leise! Paul, ', ' die Seitentür nach draußen nicht ab! Gäste, ', ' Sie bitte dem markierten Weg! Und jetzt, Team, ', ' mit dem Aufbau an!“'],
    verbs: ['prüfen (du)', 'hängen (ihr)', 'testen (Sie)', 'lassen (du)', 'sein (ihr)', 'führen (Sie)', 'bleiben (ihr)', 'schließen (du)', 'folgen (Sie)', 'fangen (ihr)'],
    answers: [['prüfe', 'prüf'], 'hängt', 'testen', 'lass', 'seid', 'führen', 'bleibt', ['schließ', 'schließe'], 'folgen', 'fangt'],
    explanation: 'Erkenne die Anrede in jedem Satz und schreibe die passende Imperativform; sichtbare Zusätze bleiben im Text.',
  },
}

const DEFAULT_FINAL_INSTRUCTION = 'Lies die ganze Geschichte. Ergänze alle Verbgruppen schriftlich; die Auswertung erscheint erst am Ende.'

export const GERMAN_FINAL_STORIES: GapChallenge<GermanFormId>[] = Object.entries(FINAL_STORY_SEEDS).map(([form, seed]) => ({
  id: `de-${form}-written-final-story`,
  title: seed.title,
  focus: form,
  instruction: seed.instruction ?? DEFAULT_FINAL_INSTRUCTION,
  segments: seed.segments,
  gaps: seed.verbs.map((verb, index) => ({
    id: `de-${form}-written-final-story-gap-${index + 1}`,
    tense: form as GermanFormId,
    verb,
    answers: answerVariants(seed.answers[index]),
  })),
  explanation: seed.explanation,
}))
