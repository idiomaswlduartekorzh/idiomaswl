import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-probabilita-a2',
  order: '18',
  color: '#009246',
  category: 'Verbos',
  level: 'A2',
  title: 'Il futuro di probabilità en italiano A2: ipotesi nel presente',
  shortTitle: 'Futuro probabilità',
  metaTitle: 'Futuro de probabilidad en italiano A2 — Avrà trent\'anni, Sarà stanco',
  description:
    'El futuro simple en italiano también se usa para expresar suposiciones o probabilidades sobre el presente. "Avrà trent\'anni" no significa "tendrá treinta años" sino "debe de tener treinta años / probablemente tiene treinta años". Es una de las funciones más frecuentes del futuro en la lengua hablada.',
  lead: 'Dove sarà? Avrà trent\'anni: el futuro italiano que expresa suposición sobre el presente.',
  outcomes: [
    'Reconocer el futuro de probabilidad como hipótesis sobre el presente',
    'Usar sarà, avrà, starà y otros futuros para hacer suposiciones',
    'Distinguir el futuro como tiempo real del futuro como probabilidad',
    'Expresar suposiciones con frase modal equivalente (probabilmente, deve essere...)',
  ],

  guide: {
    goal: 'Usar el futuro simple para expresar suposiciones y probabilidades sobre la situación presente.',
    model: 'Dove sarà Marco? — Sarà in ufficio. (¿Dónde estará Marco? — Estará en la oficina.)',
    formula: 'Futuro semplice = probabilmente + presente indicativo / deve + infinito',
    decisions: [
      'El futuro de probabilidad expresa suposición sobre el PRESENTE, no sobre el futuro real',
      '"Sarà stanco" = probabilmente è stanco / deve essere stanco',
      '"Avrà trent\'anni" = probabilmente ha trent\'anni / penso che abbia trent\'anni',
      'Se reconoce por el contexto: cuando no hay referencia temporal al futuro, indica suposición',
      'Equivale en español a "deber de + infinitivo" o "probablemente + presente"',
    ],
    table: [
      ['Futuro (ipotesi)', 'Equivalente italiano', 'Español'],
      ['Sarà in casa', 'Probabilmente è in casa', 'Debe de estar en casa'],
      ['Avrà fame', 'Probabilmente ha fame', 'Debe de tener hambre'],
      ['Starà dormendo', 'Probabilmente sta dormendo', 'Estará durmiendo'],
      ['Costerà molto', 'Probabilmente costa molto', 'Costará mucho'],
    ],
    mistakes: [
      'Confundir con el futuro real: "Domani andrò a Roma" (futuro real) ≠ "Sarà a Roma adesso" (suposición presente).',
      '"Sarà stancato" ❌ → "Sarà stanco" ✓ — Con "essere" se usa l\'aggettivo, no el participio.',
      '"Avrà avuto trent\'anni" per suposición presente ❌ → "Avrà trent\'anni" ✓ — El futuro simple, no el anteriore.',
    ],
  },

  seo: [
    {
      heading: 'El futuro de probabilidad en italiano',
      paragraphs: [
        'En italiano, el futuro simple tiene una función especial: expresar suposiciones o probabilidades sobre el momento presente. "Sarà in ufficio" no dice que alguien ESTARÁ en la oficina en el futuro, sino que PROBABLEMENTE ESTÁ en la oficina ahora mismo.',
        'Este uso es muy común en la lengua coloquial italiana. Se reconoce porque no hay ninguna referencia temporal al futuro (no hay "domani", "la prossima settimana", etc.) y la pregunta que lo introduce suele ser sobre el presente: "Dove sarà?", "Perché non risponde?"',
      ],
    },
    {
      heading: 'Cómo distinguir futuro real de futuro de probabilidad',
      paragraphs: [
        'Futuro real: hay una referencia temporal al futuro ("domani", "la settimana prossima", "tra un\'ora") y expresa un hecho o intención futura.',
        'Futuro de probabilidad: NO hay referencia al futuro, y expresa una suposición sobre el PRESENTE. Equivale a "probabilmente + presente" o "deve essere + aggettivo".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futuro di probabilità: suposición sobre el presente con el futuro simple.',
    graphicPrompt: 'Dos personas mirando un reloj vacío con signos de pregunta, expresando duda sobre dónde está alguien.',
    scene: [
      ['Dove sarà Luigi? — Sarà al lavoro.', '¿Dónde estará Luigi? — Estará en el trabajo.'],
      ['Perché non risponde? — Starà dormendo.', '¿Por qué no contesta? — Estará durmiendo.'],
      ['Quanti anni avrà? — Avrà trent\'anni.', '¿Cuántos años tendrá? — Tendrá unos treinta años.'],
      ['Quanto costerà quel vestito?', '¿Cuánto costará ese vestido?'],
      ['Non mangia — avrà già mangiato.', 'No come — ya habrá comido.'],
      ['Sarà stanco dopo il viaggio.', 'Estará cansado después del viaje.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['futuro come ipotesi', 'sarà/avrà/starà', 'distinción futuro real vs probabilidad'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Futuro real o probabilidad',
        tag: 'Opción múltiple',
        intro: 'Elige el significado correcto de cada uso del futuro.',
        type: 'choice',
        items: [
          {
            scene: 'Alguien que no contesta el teléfono.',
            lines: [['', 'Non risponde. Starà dormendo.']],
            options: ['Probablemente está durmiendo ahora', 'Dormirá mañana', 'Siempre duerme', 'No duerme'],
            answer: 'Probablemente está durmiendo ahora',
            explain: '"Starà dormendo" = suposición sobre el presente (debe de estar durmiendo).',
          },
          {
            scene: 'Un amigo habla de sus planes.',
            lines: [['Amico', 'Domani andrò in spiaggia.']],
            options: ['Irá a la playa mañana (plan real)', 'Probablemente está en la playa ahora', 'Fue a la playa ayer', 'Le gusta la playa'],
            answer: 'Irá a la playa mañana (plan real)',
            explain: '"Domani" indica futuro real, no probabilidad sobre el presente.',
          },
          {
            scene: 'Alguien lleva retraso y se adivina la razón.',
            lines: [['', 'Perché è in ritardo? — Avrà perso il treno.']],
            options: ['Probablemente ha perdido el tren', 'Perderá el tren mañana', 'No tiene tren', 'Perdió el tren ayer (certeza)'],
            answer: 'Probablemente ha perdido el tren',
            explain: '"Avrà perso" = futuro anteriore di probabilità = suposición sobre algo ya ocurrido.',
          },
          {
            scene: 'Estimando la edad de una persona.',
            lines: [['', 'Quanti anni ha? — Avrà quarant\'anni.']],
            options: ['Probablemente tiene cuarenta años', 'Tendrá cuarenta años en el futuro', 'Tiene exactamente cuarenta años', 'No sé cuántos años tiene'],
            answer: 'Probablemente tiene cuarenta años',
            explain: '"Avrà quarant\'anni" = suposición sobre el presente sin referencia temporal futura.',
          },
          {
            scene: 'Alguien que no está en su oficina.',
            lines: [['', 'Non è in ufficio. Sarà a casa.']],
            options: ['Probablemente está en casa ahora', 'Estará en casa mañana', 'Va a casa siempre', 'Nunca está en casa'],
            answer: 'Probablemente está en casa ahora',
            explain: '"Sarà a casa" = suposición sobre el presente.',
          },
          {
            scene: 'Viendo un vestido caro en una tienda.',
            lines: [['', 'Quanto costerà questo vestito?']],
            options: ['¿Cuánto costará? (curiosidad/suposición)', 'El vestido costará mañana', 'El vestito costó mucho', 'El vestito es caro'],
            answer: '¿Cuánto costará? (curiosidad/suposición)',
            explain: '"Costerà" como pregunta retórica = suposición/curiosidad sobre el presente.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Expresar suposiciones',
        tag: '2 espacios',
        intro: 'Expresa la suposición con el futuro de probabilidad.',
        type: 'dual',
        items: [
          {
            scene: 'Supones que alguien está cansado porque ha trabajado mucho.',
            lines: [['', '[[0]] molto stanco dopo tanto lavoro. [[1]] anche fame.']],
            blanks: [
              { options: ['Sarà', 'È', 'Sarà stato', 'Sia'], answer: 'Sarà', explain: 'Suposición presente → futuro: "Sarà stanco" = probablemente está cansado.' },
              { options: ['Avrà', 'Ha', 'Aveva', 'Abbia'], answer: 'Avrà', explain: '"Avrà fame" = probablemente tiene hambre.' },
            ],
          },
          {
            scene: 'Preguntando por alguien que no contesta mensajes.',
            lines: [['', 'Perché non risponde ai messaggi? [[0]] dormendo o [[1]] occupato.']],
            blanks: [
              { options: ['Starà', 'Sta', 'Stia', 'Stava'], answer: 'Starà', explain: '"Starà dormendo" = progresivo de probabilidad (debe de estar durmiendo).' },
              { options: ['sarà', 'è', 'sia', 'era'], answer: 'sarà', explain: '"sarà occupato" = probablemente está ocupado.' },
            ],
          },
          {
            scene: 'Estimando el precio de algo en una tienda.',
            lines: [['', 'Quanto [[0]] questo orologio? [[1]] molto caro.']],
            blanks: [
              { options: ['costerà', 'costa', 'costava', 'costi'], answer: 'costerà', explain: 'Suposición sobre el precio actual → futuro di probabilità.' },
              { options: ['Sarà', 'È', 'Sia', 'Era'], answer: 'Sarà', explain: '"Sarà molto caro" = probablemente es muy caro.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Suposiciones en contexto',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo usando el futuro di probabilità.',
        type: 'guidedText',
        scene: 'Due amici discutono di un terzo amico che non è arrivato alla festa.',
        text: '— Dov\'è Marco? Non è ancora arrivato! — Boh, [[0]] in ritardo per il traffico. — Ma perché non risponde al telefono? — [[1]] la batteria scarica. — Quanti anni [[2]] la sua ragazza? È molto giovane. — [[3]] vent\'anni. — Dove [[4]] adesso?',
        blanks: [
          { options: ['Sarà', 'È', 'Sia', 'Sarebbe'], answer: 'Sarà', explain: '"sarà in ritardo" = suposición sobre el presente.' },
          { options: ['Avrà', 'Ha', 'Abbia', 'Aveva'], answer: 'Avrà', explain: '"Avrà la batteria scarica" = probablemente tiene la batería agotada.' },
          { options: ['avrà', 'ha', 'abbia', 'aveva'], answer: 'avrà', explain: '"Quanti anni avrà?" = suposición sobre la edad.' },
          { options: ['Avrà', 'Ha', 'Avrebbe', 'Abbia'], answer: 'Avrà', explain: '"Avrà vent\'anni" = probablemente tiene veinte años.' },
          { options: ['sarà', 'è', 'sia', 'era'], answer: 'sarà', explain: '"Dove sarà adesso?" = ¿dónde estará ahora? (suposición).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Expresa suposiciones libremente',
        tag: 'Texto libre',
        intro: 'Sin opciones: usa el futuro semplice para expresar suposiciones sobre el presente.',
        type: 'freeText',
        scene: 'Respondiendo a preguntas con suposiciones.',
        text: 'Perché dorme tanto? — ___ (probablemente está cansado, sarà). / Dove sono i bambini? — ___ (probablemente están jugando, staranno). / Quanti anni ha il professore? — ___ (probablemente tiene cincuenta, avrà). / Quanto costa quel vestito? — ___ (costará mucho, costerà). / Perché è triste? — ___ (probablemente tiene problemas, avrà).',
        blanks: [
          { answer: 'Sarà stanco', explain: '"sarà" + aggettivo = suposición presente.' },
          { answer: 'Staranno giocando', explain: '"staranno" + gerundio = progresivo de probabilidad.' },
          { answer: 'Avrà cinquant\'anni', explain: '"avrà" + età = estimación de edad.' },
          { answer: 'Costerà molto', explain: '"costerà" = suposición sobre el precio.' },
          { answer: 'Avrà dei problemi', explain: '"avrà" + sustantivo = suposición.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reformula con probabilità',
        tag: 'Escritura guiada',
        intro: 'Convierte la frase con "probabilmente" en futuro di probabilità.',
        type: 'write',
        items: [
          {
            scene: '"Probabilmente è stanco." → Usa futuro di probabilità.',
            prompt: 'Probabilmente è stanco.',
            answer: 'Sarà stanco.',
            accepted: ['Dev\'essere stanco.'],
            explain: '"probabilmente + è" → "sarà" (futuro di probabilità).',
          },
          {
            scene: '"Probabilmente hanno fame." → Futuro di probabilità.',
            prompt: 'Probabilmente hanno fame.',
            answer: 'Avranno fame.',
            accepted: [],
            explain: '"probabilmente + hanno" → "avranno" (futuro di probabilità, plurale).',
          },
          {
            scene: '"Probabilmente sta dormendo." → Futuro di probabilità.',
            prompt: 'Probabilmente sta dormendo.',
            answer: 'Starà dormendo.',
            accepted: ['Starà dormendo ancora.'],
            explain: '"probabilmente + sta" → "starà" + gerundio = futuro progressivo di probabilità.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe suposiciones propias',
        tag: 'Escritura libre',
        intro: 'Escribe suposiciones sobre personas o situaciones usando el futuro di probabilità.',
        type: 'write',
        items: [
          {
            scene: 'Tu amigo no ha llegado. Escribe tres suposiciones sobre dónde está o qué le pasó.',
            prompt: 'Il tuo amico non è arrivato. Scrivi tre supposizioni.',
            answer: 'Sarà in ritardo per il traffico. Avrà perso l\'autobus. Starà ancora dormendo.',
            accepted: [
              'Avrà dimenticato l\'appuntamento. Sarà a lavoro. Starà guidando.',
            ],
            explain: 'Usa sarà, avrà, starà + infinito/gerundio/aggettivo per esprimere ipotesi.',
          },
          {
            scene: 'Ves a una persona desconocida. Escribe dos suposiciones sobre ella.',
            prompt: 'Vedi una persona in biblioteca. Fai due supposizioni.',
            answer: 'Sarà una studentessa. Avrà vent\'anni.',
            accepted: [
              'Starà studiando per un esame. Avrà molti esami da fare.',
            ],
            explain: 'El futuro di probabilità es perfecto para hacer suposiciones sobre personas que no conoces.',
          },
        ],
      },
    ],
  },
}

export default topic
