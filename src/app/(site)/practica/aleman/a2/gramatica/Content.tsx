'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface Q { s: string; opts: string[]; a: number; fb: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: Q[]; }

const TOPICS: Topic[] = [
  {
    id: 'perfekt',
    title: 'Das Perfekt: haben vs. sein',
    icon: '⏰',
    desc: 'Das Perfekt = Hilfsverb (haben ODER sein) + Partizip II. Verben mit SEIN: Bewegung (gehen→gegangen, fahren→gefahren, fliegen→geflogen, kommen→gekommen, laufen→gelaufen) + Zustandsveränderung (aufwachen→aufgewacht, einschlafen→eingeschlafen, sterben→gestorben, wachsen→gewachsen) + bleiben, sein, werden. Partizip II: regelmäßig: ge- + Stamm + -t (gemacht); unregelmäßig: ge- + Stamm + -en (gegessen, getrunken, gesehen).',
    tip: 'Eselsbrücke für sein-Verben: BEWEGUNG oder ZUSTANDSVERÄNDERUNG → sein. Ein guter Test: "Kann das Verb ein Akkusativ-Objekt haben?" → Ja = haben. "Ich habe einen Film gesehen" (Akkusativ: einen Film) → haben. "Er ist nach Hause gegangen" (kein Akkusativ-Objekt) → sein.',
    qs: [
      { s: 'Wir ___ heute Morgen sehr früh ___.  (aufwachen)', opts: ['sind / aufgewacht', 'haben / aufgewacht', 'sind / aufgeweckt', 'haben / aufgeweckt'], a: 0, fb: '"Sind aufgewacht" — aufwachen = Zustandsveränderung (vom Schlafen zum Wachsein) → Hilfsverb SEIN. Partizip II: aufgewacht.' },
      { s: 'Er ___ gestern einen alten Freund ___.  (treffen)', opts: ['hat / getroffen', 'ist / getroffen', 'hat / getroffet', 'ist / getroffen'], a: 0, fb: '"Hat getroffen" — treffen hat ein Akkusativ-Objekt (einen alten Freund) → HABEN. Partizip II irregular: getroffen.' },
      { s: 'Sie ___ letzten Sommer nach Berlin ___.  (fahren)', opts: ['ist / gefahren', 'hat / gefahren', 'ist / gefahrt', 'hat / gefahrt'], a: 0, fb: '"Ist gefahren" — fahren = Bewegungsverb → SEIN. Partizip II irregular: gefahren.' },
      { s: 'Ich ___ gestern Abend einen guten Film ___.  (sehen)', opts: ['habe / gesehen', 'bin / gesehen', 'habe / geseht', 'bin / geseht'], a: 0, fb: '"Habe gesehen" — sehen hat Akkusativ-Objekt (einen Film) → HABEN. Partizip II irregular: gesehen.' },
      { s: 'Die Kinder ___ den ganzen Tag im Park ___.  (bleiben)', opts: ['sind / geblieben', 'haben / geblieben', 'sind / gebliebt', 'haben / gebleibt'], a: 0, fb: '"Sind geblieben" — bleiben → SEIN (Ausnahme: kein Bewegungsverb, aber bleiben gehört zur sein-Gruppe). Partizip II: geblieben.' },
      { s: 'Er ___ krank ___ und ___ drei Tage im Bett ___.  (werden / bleiben)', opts: ['ist / geworden / ist / geblieben', 'hat / geworden / hat / geblieben', 'ist / geworden / hat / geblieben', 'hat / gewurdet / ist / gebleibt'], a: 0, fb: '"Ist geworden" (werden = Zustandsveränderung → sein) + "ist geblieben" (bleiben → sein).' },
      { s: 'Wir ___ das ganze Wochenende Musik ___.  (machen)', opts: ['haben / gemacht', 'sind / gemacht', 'haben / gegemacht', 'sind / getan'], a: 0, fb: '"Haben gemacht" — machen = transitives Verb mit Objekt → HABEN. Partizip II regelmäßig: ge- + mach + -t = gemacht.' },
      { s: 'Sie ___ gestern pünktlich zur Arbeit ___.  (kommen)', opts: ['ist / gekommen', 'hat / gekommen', 'ist / gekommt', 'hat / gekommt'], a: 0, fb: '"Ist gekommen" — kommen = Bewegungsverb → SEIN. Partizip II irregular: gekommen.' },
      { s: 'Ich ___ heute viel zu viel ___.  (essen)', opts: ['habe / gegessen', 'bin / gegessen', 'habe / geessen', 'bin / geessen'], a: 0, fb: '"Habe gegessen" — essen mit Akkusativ-Objekt (zu viel) → HABEN. Partizip II irregular: gegessen.' },
      { s: 'Er ___ letzte Woche in die neue Wohnung ___.  (einziehen)', opts: ['ist / eingezogen', 'hat / eingezogen', 'ist / eingezieht', 'hat / eingezieht'], a: 0, fb: '"Ist eingezogen" — einziehen (Bewegung in Wohnung) → SEIN. Partizip II: eingezogen.' },
    ],
  },
  {
    id: 'dativ',
    title: 'Der Dativ: indirektes Objekt und Präpositionen',
    icon: '🔗',
    desc: 'Dativ = indirektes Objekt (Wem?) + nach Dativpräpositionen: mit, bei, nach, von, zu, aus, seit, gegenüber, außer, ab. Artikel im Dativ: dem (m/n), der (f), den (Plural + -n am Nomen).',
    tip: 'Merksatz für Dativpräpositionen: "Mit bei nach von zu aus seit gegenüber" — lern diese Liste auswendig. Nomen im Dativ Plural bekommt immer -n: die Kinder → mit den Kindern; die Männer → mit den Männern.',
    qs: [
      { s: 'Er fährt jeden Tag ___ dem Fahrrad zur Arbeit.', opts: ['mit', 'bei', 'nach', 'von'], a: 0, fb: '"Mit dem Fahrrad" — Dativpräposition "mit" + Dativartikel "dem" (Fahrrad = neutrum). "Mit" immer + Dativ.' },
      { s: 'Ich habe eine E-Mail ___ meiner Lehrerin bekommen.', opts: ['von', 'mit', 'nach', 'bei'], a: 0, fb: '"Von meiner Lehrerin" — Dativpräposition "von". "von meiner" = Dativartikel feminin singular.' },
      { s: 'Sie wohnt ___ ihrer Schwester in München.', opts: ['bei', 'mit', 'nach', 'von'], a: 0, fb: '"Bei ihrer Schwester" — Dativpräposition "bei" = bei jemandem wohnen/sein. "bei ihrer" = Dativartikel feminin.' },
      { s: 'Ich gehe heute Nachmittag ___ dem Arzt.', opts: ['zu', 'nach', 'mit', 'bei'], a: 0, fb: '"Zu dem Arzt" (= zum Arzt) — "zu" + Dativ für Ziel bei Personen und Gebäuden. "zu dem" → Kontraktionsform "zum".' },
      { s: '___ wann lernst du Deutsch?', opts: ['Seit', 'Ab', 'Nach', 'Von'], a: 0, fb: '"Seit wann?" — "seit" + Dativ für Anfangspunkt bis jetzt (Dauer). "Seit einem Jahr", "seit 2020", "seit dem Sommer".' },
      { s: 'Er kommt ___ Kolumbien, spricht aber fließend Deutsch.', opts: ['aus', 'von', 'bei', 'mit'], a: 0, fb: '"Aus Kolumbien" — "aus" + Dativ für Herkunft (Städte, Länder, Hause). "aus dem Haus", "aus Deutschland".' },
      { s: 'Das Kino liegt genau ___ dem Hotel.', opts: ['gegenüber', 'nach', 'bei', 'seit'], a: 0, fb: '"Gegenüber dem Hotel" — Dativpräposition. "gegenüber" kann auch nach dem Nomen stehen: "dem Hotel gegenüber".' },
      { s: 'Sie geht ___ der Arbeit immer in den Park.', opts: ['nach', 'aus', 'mit', 'von'], a: 0, fb: '"Nach der Arbeit" — "nach" für Zeitpunkt danach: nach + Datilartikel "der" (Arbeit = feminin). Nach dem Essen, nach der Schule.' },
      { s: 'Ich habe ___ meinen Eltern über das Problem gesprochen.', opts: ['mit', 'bei', 'nach', 'von'], a: 0, fb: '"Mit meinen Eltern" — Dativpräposition "mit". "Meinen" = Dativartikel Plural + Possessivpronomen.' },
      { s: 'Er wohnt seit drei Jahren ___ seiner Familie.', opts: ['bei', 'mit', 'nach', 'von'], a: 0, fb: '"Bei seiner Familie" — "bei" für Cohabitation. "seiner" = Possessivpronomen im Dativ feminin (Familie = feminin).' },
    ],
  },
  {
    id: 'modalverben_praeteritum',
    title: 'Modalverben im Präteritum',
    icon: '🎯',
    desc: 'Die Modalverben im Präteritum (Vergangenheit, vor allem in der Schriftsprache): müssen→musste, können→konnte, wollen→wollte, dürfen→durfte, sollen→sollte, mögen→mochte. Konjugation: musste, musstest, musste, mussten, musstet, mussten (wie schwache Verben, kein Umlaut).',
    tip: 'In der gesprochenen Sprache benutzen wir bei Modalverben oft das Präteritum, NICHT das Perfekt: "Ich musste früh aufstehen" (nicht: "Ich habe früh aufstehen müssen" — das klingt sehr formal). Der Doppel-Infinitiv (aufstehen müssen) ist für schriftliche formelle Sprache.',
    qs: [
      { s: 'Gestern ___ ich sehr früh aufstehen, weil ich einen Zug hatte.', opts: ['musste', 'muss', 'musste haben', 'habe gemusst'], a: 0, fb: '"Musste aufstehen" — Präteritum von müssen. Kein Umlaut: muss → musste (+ te-Endung). Typisch für gesprochene Erzählung.' },
      { s: 'Als Kind ___ er nicht so lange aufbleiben.', opts: ['durfte', 'dürfte', 'hat gedurft', 'durfen'], a: 0, fb: '"Durfte nicht" — Präteritum von dürfen (Erlaubnis verneint). darf → durfte. "Nicht dürfen" = Verbot.' },
      { s: 'Sie ___ gestern das Meeting leiten, weil ihr Chef krank war.', opts: ['sollte', 'soll', 'sollte haben', 'hat gesollt'], a: 0, fb: '"Sollte das Meeting leiten" — Präteritum von sollen (Verpflichtung/Erwartung von außen). soll → sollte.' },
      { s: 'Wir ___ als Kinder gut Fußball spielen.', opts: ['konnten', 'können', 'konnten sein', 'haben gekonnt'], a: 0, fb: '"Konnten spielen" — Präteritum von können (Fähigkeit in der Vergangenheit). kann → konnte → konnten (wir).' },
      { s: 'Er ___ nicht zur Party kommen, weil er arbeitete.', opts: ['konnte', 'könnte', 'konnte sein', 'hat können'], a: 0, fb: '"Konnte nicht kommen" — Präteritum von können + Negation. Unfähigkeit in der Vergangenheit.' },
      { s: 'Ich ___ eigentlich früher schlafen gehen, aber ich habe einen Film geschaut.', opts: ['wollte', 'will', 'wollte haben', 'habe gewollt'], a: 0, fb: '"Wollte schlafen gehen" — Präteritum von wollen (Absicht/Wunsch in der Vergangenheit). will → wollte.' },
      { s: 'Sie ___ gestern zum Arzt, weil sie Fieber hatte.', opts: ['musste', 'muss', 'hat gemusst', 'müsste'], a: 0, fb: '"Musste zum Arzt" — Präteritum von müssen (Notwendigkeit in der Vergangenheit). Häufigste Verwendung im Alltag.' },
      { s: 'Als Kind ___ er keine Süßigkeiten essen — sein Arzt hat es verboten.', opts: ['durfte', 'darf', 'hat dürfen', 'dürfte'], a: 0, fb: '"Durfte keine Süßigkeiten essen" — Präteritum von dürfen + Negation. Verbot in der Vergangenheit.' },
      { s: 'Er ___ das Projekt bis Freitag fertigstellen.', opts: ['sollte', 'soll', 'hat sollen', 'sollte haben'], a: 0, fb: '"Sollte fertigstellen" — Präteritum von sollen. Eine Verpflichtung von außen (vom Chef, von der Firma).' },
      { s: 'Wir ___ gestern leider nicht ins Konzert gehen.', opts: ['konnten', 'können', 'haben können', 'könnten'], a: 0, fb: '"Konnten nicht gehen" — Präteritum von können, verneint. Unmöglichkeit in der Vergangenheit.' },
    ],
  },
  {
    id: 'trennbare_verben',
    title: 'Trennbare Verben: Position im Satz',
    icon: '🔨',
    desc: 'Trennbare Verben = Präfix + Verb. Im Hauptsatz: Präfix ans Ende! "Ich rufe dich an." (anrufen). Im Nebensatz: Verb kommt zusammen ans Ende: "Ich weiß, dass er mich anruft." Im Infinitiv mit "zu": Zu steht zwischen Präfix und Verb: "Er vergisst, mich anzurufen." Häufige Präfixe: ab-, an-, auf-, aus-, ein-, mit-, vor-, zu-, zurück-.',
    tip: 'Test ob trennbar: betone das Präfix! "AUFmachen" (trennbar) vs "verMAchen" (nicht trennbar). Trennbare Präfixe sind meistens betont: ab-, an-, auf-, aus-, ein-, mit-, nach-, vor-, zu-. Untrennbare Präfixe unbetont: be-, er-, ge-, ver-, zer-.',
    qs: [
      { s: 'Ich ___ morgen früh ___.  (aufstehen)', opts: ['stehe / auf', 'aufstehe / ∅', 'stehe / aufstehen', 'aufstehen / ∅'], a: 0, fb: '"Ich stehe auf" — trennbares Verb: Präfix "auf" ans Ende im Hauptsatz. Hauptsatz-Wortstellung: Verb an Position 2, Präfix ans Ende.' },
      { s: 'Er ___ immer das Licht ___, wenn er geht.  (ausmachen)', opts: ['macht / aus', 'ausmacht / ∅', 'macht / ausmachen', 'machen / aus'], a: 0, fb: '"Er macht das Licht aus" — ausmachen: Präfix "aus" ans Ende. Zwischen Verb und Präfix können andere Satzteile stehen.' },
      { s: 'Ich weiß, dass sie mich morgen ___.  (anrufen)', opts: ['anruft', 'ruft an', 'ruft', 'anrufen'], a: 0, fb: '"Dass sie mich anruft" — im Nebensatz (nach "dass") bleibt das Verb zusammen und kommt ans Ende.' },
      { s: 'Wann ___ der Zug in München ___?  (ankommen)', opts: ['kommt / an', 'ankam / ∅', 'ankommen / ∅', 'kommt / ankommen'], a: 0, fb: '"Wann kommt der Zug an?" — W-Frage + Inversion: Verb an Position 1, Präfix ans Ende.' },
      { s: 'Sie versucht, pünktlich ___.  (ankommen)', opts: ['anzukommen', 'aufzukommen', 'anzukommen sein', 'zu ankommen'], a: 0, fb: '"Versucht anzukommen" — Infinitiv mit "zu" bei trennbaren Verben: Präfix + zu + Verbstamm = "anzukommen".' },
      { s: 'Ich ___ dich morgen ___.  (einladen)', opts: ['lade / ein', 'einlade / ∅', 'einlade / ein', 'lade / einladen'], a: 0, fb: '"Ich lade dich ein" — einladen trennbar: lade...ein. Zwischen laden und ein steht das Objekt (dich).' },
      { s: 'Er hat vergessen, das Fenster ___.  (zumachen)', opts: ['zuzumachen', 'zu zumachen', 'machen zu', 'zumachen zu'], a: 0, fb: '"Vergessen zuzumachen" — Infinitiv mit zu bei trennbarem Verb: zu steht zwischen Präfix und Verbstamm: zu-zu-machen.' },
      { s: '___ bitte die Tür ___!  (zumachen — Imperativ)', opts: ['Mach / zu', 'Zumach / ∅', 'Zu / machen', 'Macht / zumachen'], a: 0, fb: '"Mach die Tür zu!" — Imperativ (du-Form): trennbares Verb, Präfix ans Ende. Auch möglich: "Macht die Tür zu!" (ihr-Form).' },
      { s: 'Er ___ jeden Morgen um 7 Uhr ___.  (aufwachen)', opts: ['wacht / auf', 'aufwacht / ∅', 'wacht / aufwachen', 'aufwacht / auf'], a: 0, fb: '"Er wacht auf" — aufwachen trennbar: wacht...auf. Hauptsatz: Verb an Pos. 2, Präfix ans Ende.' },
      { s: 'Ich freue mich darauf, dass du mich ___.  (abholen)', opts: ['abholst', 'holst ab', 'abholst bist', 'holst abst'], a: 0, fb: '"Dass du mich abholst" — Nebensatz: "abholen" bleibt zusammen, kommt ans Satzende.' },
    ],
  },
  {
    id: 'komparativ_superlativ',
    title: 'Komparativ und Superlativ',
    icon: '📊',
    desc: 'Komparativ: Adjektiv + -er + als ("schneller als"). Superlativ: am + Adjektiv + -sten ("am schnellsten") oder der/die/das + Adjektiv + -ste ("die schnellste Läuferin"). Gleichheit: genauso + Adj + wie. Unregelmäßige: gut→besser→am besten, viel→mehr→am meisten, gern→lieber→am liebsten, hoch→höher→am höchsten.',
    tip: 'Adjektive mit Umlaut im Komparativ/Superlativ: alt→älter→am ältesten, groß→größer→am größten, jung→jünger→am jüngsten, kalt→kälter→am kältesten, warm→wärmer→am wärmsten, lang→länger→am längsten, kurz→kürzer→am kürzesten. Diese muss man auswendig lernen!',
    qs: [
      { s: 'München ist ___ als Hamburg.  (groß)', opts: ['größer', 'mehr groß', 'am größten', 'großer'], a: 0, fb: '"Größer als" — Komparativ von groß (mit Umlaut). Komparativsatz: Adjektiv + -er + als + zweites Vergleichsobjekt.' },
      { s: 'Das ist ___ Film, den ich je gesehen habe.  (gut)', opts: ['der beste', 'der gutste', 'am besten', 'der bessere'], a: 0, fb: '"Der beste Film" — Superlativ irregular von gut. "Gut → besser → am besten" (prädikativ), "der beste" (attributiv vor Nomen).' },
      { s: 'Er spielt Gitarre ___ als sein Bruder.  (gut)', opts: ['besser', 'gut', 'am besten', 'mehr gut'], a: 0, fb: '"Besser als" — Komparativ irregular von gut (Adverb). "Gut → besser → am besten". Niemals "mehr gut"!' },
      { s: 'Sie ist ___ alt ___ ich.  (Gleichheit)', opts: ['genauso / wie', 'so / als', 'genauso / als', 'so / wie'], a: 0, fb: '"Genauso alt wie" — Gleichheit im Deutschen: genauso + Adj + wie. Niemals "so alt als".' },
      { s: 'Das Wetter in Hamburg ist ___ als in München.  (kalt)', opts: ['kälter', 'kälter als', 'am kältesten', 'mehr kalt'], a: 0, fb: '"Kälter" — Komparativ von kalt mit Umlaut. Hier: "kälter" bezieht sich auf das Vergleichsobjekt (als in München).' },
      { s: 'Von allen Schülern lernt sie ___.  (fleißig)', opts: ['am fleißigsten', 'am fleißig', 'fleißigsten', 'der fleißigste'], a: 0, fb: '"Am fleißigsten" — Superlativ (prädikativ): am + Adjektiv + -sten. Hier kein Artikel nötig (prädikativ, kein Nomen).' },
      { s: 'Ich trinke ___ Kaffee ___ Tee.  (gern, Komparativ)', opts: ['lieber / als', 'gerner / als', 'mehr gern / als', 'am liebsten / wie'], a: 0, fb: '"Lieber Kaffee als Tee" — Komparativ von gern (Adverb): gern → lieber → am liebsten. Vorliebe vergleichen.' },
      { s: 'Das Everest ist ___ Berg der Welt.  (hoch)', opts: ['der höchste', 'der höchster', 'am höchsten', 'höchster'], a: 0, fb: '"Der höchste Berg" — Superlativ attributiv (vor Nomen) mit Artikel. Hoch → höher → der höchste.' },
      { s: 'Im Sommer arbeite ich ___ lange ___ im Winter.  (Gleichheit)', opts: ['genauso / wie', 'so / als', 'genauso / als', 'as / wie'], a: 0, fb: '"Genauso lange wie" — Gleichheit. "Lange" ist Adverb → keine Endung beim Komparativ des Gleichheitsvergleichs.' },
      { s: 'Das neue Handy ist viel ___ als das alte.  (teuer)', opts: ['teurer', 'teuerer', 'mehr teuer', 'am teuersten'], a: 0, fb: '"Viel teurer" — Komparativ von teuer. Achtung: teuer verliert das -e: teu(e)r → teurer (nicht "teuerer").' },
    ],
  },
];

export default function GramaticaAlemanA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});

  const topic = TOPICS[topicIdx];
  const score = topic.qs.filter((q, i) => mcqAnswers[i] === q.a).length;
  const allAnswered = topic.qs.every((_, i) => mcqAnswers[i] !== undefined);

  function reset() { setMcqAnswers({}); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Grammatik</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Grammatik · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 1.5rem', fontWeight: 700 }}>Grammatik A2</h1>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.8rem', ...(topicIdx === i ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {t.icon} {t.title.split(':')[0].trim()}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.3rem' }}>{topic.icon} {topic.title}</div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{topic.desc}</p>
          <div style={{ padding: '0.55rem 0.75rem', borderRadius: 8, background: `${COLOR}0d`, fontSize: '0.82rem', color: COLOR, borderLeft: `3px solid ${COLOR}` }}>💡 {topic.tip}</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
          {topic.qs.map((q, i) => {
            const sel = mcqAnswers[i];
            const answered = sel !== undefined;
            return (
              <div key={i} style={{ padding: '0.85rem 1.1rem', borderRadius: 12, border: `1.5px solid ${answered ? (sel === q.a ? '#05966944' : '#dc262644') : 'var(--line-soft)'}`, background: answered ? (sel === q.a ? 'rgba(5,150,105,0.04)' : 'rgba(220,38,38,0.03)') : 'var(--bg)' }}>
                <p style={{ margin: '0 0 0.6rem', color: 'var(--ink)', fontWeight: 600, fontSize: '0.93rem', lineHeight: 1.55 }}>{i + 1}. {q.s}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {q.opts.map((opt, j) => {
                    let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
                    if (answered && j === q.a) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                    else if (answered && j === sel) { bg = 'rgba(220,38,38,0.08)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                    return (
                      <button key={j} onClick={() => !answered && setMcqAnswers(p => ({ ...p, [i]: j }))} disabled={answered}
                        style={{ padding: '0.5rem 0.85rem', borderRadius: 9, border, background: bg, color, fontSize: '0.88rem', cursor: answered ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {answered && (
                  <p style={{ margin: '0.5rem 0 0', fontSize: '0.78rem', color: sel === q.a ? '#059669' : '#dc2626', lineHeight: 1.5 }}>
                    {sel === q.a ? '✓ Richtig!' : `✗ Richtig: ${q.opts[q.a]}`} — {q.fb}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {allAnswered && (
          <div style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ padding: '0.65rem 1rem', borderRadius: 10, background: `${COLOR}0d`, border: `1.5px solid ${COLOR}33`, fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)' }}>
              {score}/{topic.qs.length} richtig
            </div>
            <button className="btn btn-ghost btn-sm" onClick={reset}>Nochmal üben</button>
            {topicIdx < TOPICS.length - 1 && (
              <button className="btn btn-sm" onClick={() => { setTopicIdx(i => i + 1); reset(); }} style={{ background: COLOR, borderColor: COLOR }}>
                Nächstes Thema →
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
