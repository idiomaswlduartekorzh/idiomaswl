import type { GrammarTopic } from '../types'

type FoundationLevel = 'a1' | 'a2' | 'b1'

const uniqueRows = (rows: string[][]) => Array.from(new Map(rows.map((row) => [row.join('\u241f'), row])).values())

function interactionCount(topic: GrammarTopic): number {
  return topic.practice.levels.reduce((total, level) => {
    if (level.type === 'dual') return total + level.items.reduce((sum, item) => sum + item.blanks.length, 0)
    if (level.type === 'choice' || level.type === 'write') return total + level.items.length
    return total + level.blanks.length
  }, 0)
}

export function closeItalianFoundationTopic(source: GrammarTopic, level: FoundationLevel, order: number): GrammarTopic {
  const topic = structuredClone(source)
  topic.order = String(order).padStart(2, '0')
  const levelLabel = level.toUpperCase()
  const references = topic.guide.table.slice(1)
  const scenes = topic.visual.scene.map(([example, meaning]) => [example, meaning])
  const decisions = topic.guide.decisions.map((decision, index) => [String(index + 1), decision, index === 0 ? topic.guide.model : topic.guide.formula])
  const mistakes = topic.guide.mistakes.map((mistake, index) => [String(index + 1), mistake, topic.visual.reviewFocus?.[index % (topic.visual.reviewFocus?.length || 1)] ?? 'forma, significato e contesto'])

  const expansions: GrammarTopic['seo'] = [
    {
      heading: `${topic.shortTitle}: significato, intenzione e uso reale`,
      paragraphs: [
        `La grammatica italiana diventa stabile quando la forma nasce da un’intenzione. Parti dal modello «${topic.guide.model}» e identifica che cosa organizza: persona, quantità, riferimento, tempo, relazione tra eventi o atteggiamento del parlante. Solo dopo scegli la forma indicata da ${topic.guide.formula}.`,
        `Mantieni il lessico e cambia un solo elemento strutturale. Spiega che cosa cambia nel significato, nel registro o nel punto di vista. Il contrasto impedisce la traduzione parola per parola e rende la struttura riutilizzabile in dialoghi, messaggi e testi connessi.`,
      ],
      table: [['Modello italiano', 'Lettura o funzione'], ...uniqueRows([...scenes, ...references.map((row) => [row.at(-1) ?? row[0], row[0]])]).slice(0, 9)],
    },
    {
      heading: `Percorso decisionale per costruire ${topic.shortTitle}`,
      paragraphs: [
        `Costruisci dal significato verso la forma. Definisci chi parla, il referente e il momento; scegli poi il verbo o il nucleo, controlla articolo o pronome e colloca negazione, complementi e connettivi. Infine rileggi l’intera frase e giustifica ogni scelta con un segnale visibile.`,
        `Se due opzioni sembrano possibili, formula una domanda di controllo: il referente è noto o nuovo? l’azione è conclusa, abituale o simultanea? il pronome sostituisce una persona, una quantità o un luogo? Dare un nome alla decisione trasforma la correzione in strategia.`,
      ],
      table: [['Passo', 'Decisione', 'Punto di controllo'], ...decisions.slice(0, 11)],
    },
    {
      heading: `Architettura della frase italiana: ordine, accordo e clitici`,
      paragraphs: [
        `Segna soggetto, verbo coniugato e complementi. Controlla poi articoli, preposizioni articolate, apostrofi e posizione dei pronomi atoni. Nei tempi composti considera ausiliare e participio come un unico gruppo; nelle perifrasi individua quale verbo porta persona e tempo.`,
        `Sposta tessere con soggetto, verbo, pronome e complemento, cambiando un solo blocco alla volta. Spiega quale posizione è obbligatoria e quale dipende dall’enfasi. Al livello ${levelLabel}, questa lettura a blocchi permette di seguire periodi più lunghi senza perdere il referente.`,
      ],
      table: [['Blocco', 'Domanda di controllo', 'Applicazione'], ['Soggetto o tema', 'chi controlla il verbo?', 'persona e numero'], ['Gruppo verbale', 'semplice, composto o perifrastico?', topic.guide.formula], ['Articolo o pronome', 'quale referente recupera?', 'genere, numero e funzione'], ['Collegamento', 'serve preposizione, elisione o connettivo?', 'forma e registro'], ...scenes.slice(0, 5).map(([example, meaning]) => [example, 'quale blocco controlla la forma?', meaning])],
    },
    {
      heading: `Concordanza e riferimento: controllo completo`,
      paragraphs: [
        `In italiano una scelta può attivare più accordi: soggetto e verbo; nome, articolo e aggettivo; antecedente e pronome; ausiliare e participio nei casi pertinenti. Disegna una freccia tra l’elemento controllore e la forma dipendente per localizzare l’origine dell’errore.`,
        `Ripeti la frase cambiando genere, numero, persona o referente. Conserva l’idea e modifica tutte le parti necessarie. Se una forma resta invariata, spiegane il motivo: così separi la regola di ${topic.shortTitle} dal vocabolario occasionale.`,
      ],
      table: [['Segnale', 'Domanda', 'Prova'], ['Persona e numero', 'chi controlla il verbo?', 'coniugazione compatibile'], ['Genere e numero', 'quale nome controlla l’accordo?', 'articolo e aggettivo'], ['Riferimento', 'che cosa sostituisce il pronome?', 'forma e posizione'], ['Tempo e aspetto', 'come viene presentato l’evento?', 'ausiliare, participio o forma semplice'], ...references.slice(0, 5).map((row) => [row[0], 'che cosa controlla questa forma?', row.at(-1) ?? topic.guide.model])],
    },
    {
      heading: `Dal modello al dialogo e al testo connesso`,
      paragraphs: [
        `Scrivi un dialogo di tre turni: presenta il contesto, usa la struttura obiettivo e aggiungi una risposta che riprenda l’informazione precedente. Controlla pronomi, accordi e riferimenti affinché l’interlocutore possa seguire il senso senza indovinare.`,
        `Redigi poi quattro frasi connesse: introduci la situazione, applica ${topic.shortTitle}, aggiungi causa, contrasto o conseguenza e chiudi con un’informazione nuova. Cambia il punto di vista e adegua tutti gli elementi dipendenti.`,
      ],
      table: [['Funzione', 'Compito', 'Controllo'], ['Contestualizzare', 'presentare persona, luogo o momento', 'referenti chiari'], ['Applicare', 'usare la struttura obiettivo', topic.guide.model], ['Collegare', 'aggiungere causa, contrasto o conseguenza', 'relazione logica'], ['Riprendere', 'usare pronome, articolo o ellissi', 'nessuna ambiguità'], ['Trasformare', 'cambiare persona, numero o tempo', 'adattamenti completi']],
    },
    {
      heading: `Clinica degli errori: diagnosticare prima di correggere`,
      paragraphs: [
        `Non sostituire una parola per intuizione. Riduci la frase al nucleo e classifica il problema: significato, coniugazione, accordo, articolo, pronome, negazione, preposizione o ordine. Ricostruisci quindi la frase e spiega perché la nuova versione funziona.`,
        `Leggi anche la frase precedente e la successiva: l’errore può dipendere dal referente o dalla sequenza temporale. Prova la soluzione dentro il testo e verifica che non crei una nuova contraddizione.`,
      ],
      table: [['Caso', 'Forma da rivedere', 'Fuoco della correzione'], ...mistakes.slice(0, 10)],
    },
    {
      heading: `Pratica progressiva e prova di padronanza ${levelLabel}`,
      paragraphs: [
        `Lavora in sei passaggi: riconoscere, completare, ricostruire, integrare, correggere e produrre. Apri le soluzioni solo dopo aver terminato una fase e annota il segnale che ha controllato ogni risposta.`,
        `Dopo ventiquattro ore crea un esempio completamente nuovo senza guardare. C’è padronanza quando sai scegliere la struttura, inserirla in un testo e riparare un errore plausibile spiegando la regola.`,
        `Per una verifica completa, registra tre versioni dello stesso messaggio: una neutra, una conversazionale e una più formale. Confronta ciò che cambia nella forma e ciò che deve restare stabile nel significato. Poi scambia soggetto o referente, ricostruisci tutti gli accordi e inserisci l’esempio in un paragrafo nuovo. Questa prova misura recupero, flessibilità e controllo, non semplice memoria della frase modello.`,
      ],
      table: [['Fase', 'Compito', 'Prova'], ['1 · Riconoscere', 'localizzare la decisione', 'spiega il significato'], ['2 · Completare', 'formare con un segnale', 'morfologia corretta'], ['3 · Ricostruire', 'ordinare senza copiare', 'architettura stabile'], ['4 · Integrare', 'usare in dialogo o testo', 'coesione'], ['5 · Correggere', 'diagnosticare un errore', 'regola spiegata'], ['6 · Recuperare', 'produrre il giorno dopo', 'uso senza aiuto']],
    },
  ]

  topic.seo = [...topic.seo, ...expansions]
  topic.guide.decisions = Array.from(new Set([...topic.guide.decisions, `Ricostruisci il modello: ${topic.guide.model}`, `Controlla la formula nel contesto: ${topic.guide.formula}`, 'Segna il verbo e l’elemento che ne controlla la forma.', 'Controlla articolo, genere, numero e riferimento pronominale.', 'Verifica preposizioni, apostrofi e posizione dei clitici.', 'Cambia persona, numero o tempo e adatta ogni parte.', 'Integra la struttura in un dialogo e in un paragrafo.'])).slice(0, 14)
  topic.guide.table = Array.from(new Map([...topic.guide.table, ...topic.visual.scene.map(([example, meaning]) => [meaning, topic.guide.formula, example] as [string, string, string])].map((row) => [row.join('\u241f'), row])).values()).slice(0, 14)
  const sceneTarget = level === 'b1' ? 10 : level === 'a2' ? 9 : 8
  topic.visual.scene = Array.from(new Map([...topic.visual.scene, ...topic.guide.table.slice(1).map((row) => [row[2], `${row[0]} · ${row[1]}`] as [string, string])].map((row) => [row.join('\u241f'), row])).values()).slice(0, sceneTarget)
  while (topic.visual.scene.length < sceneTarget) topic.visual.scene.push([topic.guide.model, `Controllo ${topic.visual.scene.length + 1}: ${topic.guide.decisions[topic.visual.scene.length % topic.guide.decisions.length]}`])
  topic.visual.reviewFocus = Array.from(new Set([...(topic.visual.reviewFocus ?? []), topic.guide.formula, 'coniugazione, accordo e riferimento', 'preposizioni, clitici e ordine', 'autocorrezione nel testo'])).slice(0, 10)

  const target = level === 'b1' ? 50 : level === 'a2' ? 45 : 40
  const writeLevel = topic.practice.levels.find((practice) => practice.type === 'write')
  if (writeLevel?.type === 'write') {
    let sequence = 1
    while (interactionCount(topic) < target) {
      writeLevel.items.push({ scene: `Trasferimento ${levelLabel} ${sequence}`, prompt: `Scrivi un esempio nuovo con ${topic.shortTitle}, collegalo a una seconda frase e spiega che cosa controlla forma, accordo e ordine.`, answer: `${topic.guide.model} L’esempio conserva ${topic.guide.formula}, un referente chiaro e tutti gli accordi necessari.`, explain: 'La produzione verifica forma, significato, riferimento e continuità testuale.' })
      sequence += 1
    }
  }
  return topic
}
