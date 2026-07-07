import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-semplice-a2',
  order: '04',
  color: '#009246',
  category: 'Futuro',
  level: 'A2',
  title: 'Il futuro semplice en italiano A2 — Planes y predicciones',
  shortTitle: 'Futuro semplice',
  metaTitle: 'Futuro semplice italiano A2 — parlerò, andrà, saremo, vorranno',
  description:
    'El futuro semplice expresa planes, predicciones y promesas en italiano. Para verbos -are: cambia -are → -erò/-erai/-erà/-eremo/-erete/-eranno. Para -ere/-ire las terminaciones son iguales. Irregulares clave: essere→sar-, avere→avr-, andare→andr-, fare→far-, venire→verr-, volere→vorr-.',
  lead: 'parlare → parlerò/parlerai/parlerà/parleremo/parlerete/parleranno. -are/-ere/-ire: todas usan -erò/-erai/-erà/-eremo/-erete/-eranno. Irregulares: sarò, avrò, andrò, farò, verrò, vorrò.',
  outcomes: [
    'Conjugar verbos regulares en futuro semplice para los 6 sujetos',
    'Usar los 6 irregulares más comunes: essere, avere, andare, fare, venire, volere',
    'Distinguir el uso del futuro para planes, predicciones y suposiciones sobre el presente',
  ],

  guide: {
    goal: 'Conjugar el futuro semplice y usarlo para hablar de planes y predicciones.',
    model: 'Domani parlerò con il direttore. / Sarà a casa adesso. / Andremo in vacanza a luglio.',
    formula: 'infinitivo (sin vocal final) + -ò/-ai/-à/-emo/-ete/-anno',
    decisions: [
      'io → -ò: parlerò, vedrò, dormirò',
      'tu → -ai: parlerai, vedrai, dormirai',
      'lui/lei → -à: parlerà, vedrà, dormirà',
      'noi → -emo: parleremo, vedremo, dormiremo',
      'voi → -ete: parlerete, vedrete, dormirete',
      'loro → -anno: parleranno, vedranno, dormiranno',
      'Irregolari raíz: essere→sar-, avere→avr-, andare→andr-, fare→far-, dare→dar-, stare→star-',
      'Irregolari raíz doble r: venire→verr-, volere→vorr-, potere→potr-, dovere→dovr-, tenere→terr-',
    ],
    table: [
      ['Sujeto', 'parlare (regular)', 'essere (irregular)'],
      ['io', 'parlerò', 'sarò'],
      ['tu', 'parlerai', 'sarai'],
      ['lui/lei', 'parlerà', 'sarà'],
      ['noi', 'parleremo', 'saremo'],
      ['voi', 'parlerete', 'sarete'],
      ['loro', 'parleranno', 'saranno'],
    ],
    mistakes: [
      'Los verbos -are cambian la -a a -e antes de las terminaciones: parla- → parle-ò → parlerò ✓',
      'Nunca usar el futuro en la cláusula con "se": Se verrà ✗ → Se viene, ti chiamo ✓',
      'Irregulari più comuni: andrò (no andarò), sarò (no sarà), verrò (no venirò)',
    ],
  },

  seo: [
    {
      heading: 'El futuro semplice en italiano: usos principales',
      paragraphs: [
        'El futuro semplice italiano se usa para hablar de planes futuros (Domani andrò a Roma), predicciones (L\'anno prossimo farà molto caldo) y promesas (Ti chiamerò appena arrivo). En el italiano informal, a menudo se prefiere el presente indicativo para planes inmediatos, igual que en español.',
        'El italiano también usa el futuro para expresar suposiciones sobre el presente, lo que en español expresaríamos con "deber de" o "a lo mejor". Por ejemplo: "Dov\'è Marco?" — "Sarà a casa." (¿Dónde está Marco? — Estará en casa, o sea debe estar en casa).',
      ],
    },
    {
      heading: 'Irregulares del futuro semplice',
      paragraphs: [
        'Los verbos irregulares en futuro cambian la raíz pero usan las mismas terminaciones que los regulares. Los más frecuentes: essere→sarò, avere→avrò, andare→andrò, fare→farò, dare→darò, stare→starò, venire→verrò, volere→vorrò, potere→potrò, dovere→dovrò.',
        'Los verbos en -care/-gare conservan el sonido duro: cercare→cercherò, pagare→pagherò. Los en -ciare/-giare pierden la i antes de las terminaciones: mangiare→mangerò, cominciare→comincerò.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende las terminaciones -ò/-ai/-à/-emo/-ete/-anno y los 6 irregulares clave.',
    graphicPrompt: 'Tabla futuro semplice regular + columna irregulares. Flecha: -are pierde la a.',
    scene: [
      ['Domani parlerò con il direttore.', 'Mañana hablaré con el director.'],
      ['Sarà a casa adesso.', 'Estará en casa ahora. (suposición)'],
      ['Andremo in vacanza a luglio.', 'Iremos de vacaciones en julio.'],
      ['Cosa vorranno mangiare?', '¿Qué querrán comer?'],
    ],
    learnerModes: ['visual: tabla de terminaciones', 'analítico: raíz irregular', 'oral: planes para la semana'],
    reviewFocus: ['terminaciones -ò/-ai/-à/-emo/-ete/-anno', 'sarò/avrò/andrò/farò/verrò/vorrò', 'futuro de suposición', '-care/-gare: cercherò/pagherò'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Futuro correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma del futuro semplice correcta.',
        type: 'choice',
        items: [
          {
            scene: 'Planes de verano',
            lines: [['Sofia', 'Quest\'estate ___ in Sicilia con la mia famiglia. (andare / io)']],
            options: ['andrò', 'andarò', 'andavo', 'andro'],
            answer: 'andrò',
            explain: 'Andare → andr- (irregular) + -ò → andrò.',
          },
          {
            scene: 'La reunión de mañana',
            lines: [['Marco', 'Domani ___ una riunione importante alle dieci. (esserci / lei-impersonale)']],
            options: ['ci sarà', 'ci è', 'ci era', 'ci fa'],
            answer: 'ci sarà',
            explain: 'Essere → sar- (irregular) + -à → sarà. Ci sarà = habrá.',
          },
          {
            scene: 'Los amigos llegan',
            lines: [['David', 'I miei amici ___ venerdì sera. (arrivare / loro)']],
            options: ['arriveranno', 'arriverono', 'arrivano', 'arrivavano'],
            answer: 'arriveranno',
            explain: 'Arrivare: raíz arriver- + -anno → arriveranno.',
          },
          {
            scene: 'El tiempo que hará',
            lines: [['Zhanna', 'Domani ___ bel tempo al nord. (fare / impersonale)']],
            options: ['farà', 'fa', 'farebbe', 'fece'],
            answer: 'farà',
            explain: 'Fare → far- (irregular) + -à → farà. Impersonale: farà bel tempo.',
          },
          {
            scene: 'Vosotros en clase',
            lines: [['Ana', 'Voi ___ il tema domani. (scrivere)']],
            options: ['scriverete', 'scriveranno', 'scrivete', 'scrivereste'],
            answer: 'scriverete',
            explain: 'Scrivere: raíz scriver- + -ete → scriverete.',
          },
          {
            scene: 'La promesa',
            lines: [['Carlo', 'Ti ___ non appena arrivo! (chiamare / io)']],
            options: ['chiamerò', 'chiameresti', 'chiamo', 'chiamavo'],
            answer: 'chiamerò',
            explain: 'Chiamare: raíz chiamer- + -ò → chiamerò. Los -are cambian -a a -e.',
          },
          {
            scene: 'Suposición',
            lines: [['Marco', 'Dove ___ adesso? Non risponde al telefono. (essere / lui)']],
            options: ['sarà', 'è', 'era', 'fosse'],
            answer: 'sarà',
            explain: 'Futuro di probabilità: sarà = debe de estar / estará. Suposición presente.',
          },
          {
            scene: 'Los deseos',
            lines: [['Lina', 'Loro ___ venire alla festa? (volere)']],
            options: ['vorranno', 'vogliono', 'volevano', 'vorrebbero'],
            answer: 'vorranno',
            explain: 'Volere → vorr- (irregular) + -anno → vorranno.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos futuros en contexto',
        tag: '2 espacios',
        intro: 'Completa las dos formas del futuro en cada enunciado.',
        type: 'dual',
        items: [
          {
            scene: 'Planes del próximo año',
            lines: [['Sofia', "L'anno prossimo [[0]] all'università e [[1]] da sola. (iscriversi→iscrivermi / abitare / io)"]],
            blanks: [
              { options: ['mi iscriverò', 'mi iscrivevo', 'mi iscrivo'], answer: 'mi iscriverò', explain: 'Iscriversi: raíz iscriver- + -ò → mi iscriverò.' },
              { options: ['abiterò', 'abitavo', 'abito'], answer: 'abiterò', explain: 'Abitare: raíz abiter- + -ò → abiterò.' },
            ],
          },
          {
            scene: 'Predicción del tiempo',
            lines: [['David', 'Domani [[0]] caldo e [[1]] molto sole al sud. (fare / esserci)']],
            blanks: [
              { options: ['farà', 'fa', 'faceva'], answer: 'farà', explain: 'Fare → farà (impersonale).' },
              { options: ["ci sarà", "c'è", "c'era"], answer: "ci sarà", explain: 'Essere → sarà. Ci sarà molto sole.' },
            ],
          },
          {
            scene: 'Promesas entre amigos',
            lines: [['Marco', 'Io [[0]] il dolce e voi [[1]] da bere. (portare / portare)']],
            blanks: [
              { options: ['porterò', 'portavo', 'porto'], answer: 'porterò', explain: 'Io + portare → porterò.' },
              { options: ['porterete', 'portavate', 'portate'], answer: 'porterete', explain: 'Voi + portare → porterete.' },
            ],
          },
          {
            scene: 'El viaje de la empresa',
            lines: [['Zhanna', 'Noi [[0]] a Milano e [[1]] in un bel albergo. (andare / stare)']],
            blanks: [
              { options: ['andremo', 'andiamo', 'andavamo'], answer: 'andremo', explain: 'Andare → andr- + -emo → andremo.' },
              { options: ['staremo', 'stiamo', 'stavamo'], answer: 'staremo', explain: 'Stare → star- + -emo → staremo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Planes de fin de año',
        tag: 'Texto guiado',
        intro: 'Completa el mensaje de Marco sobre sus planes con el futuro correcto.',
        type: 'guidedText',
        scene: 'Marco escribe a sus amigos sobre los planes de fin de año',
        text: "Quest'anno a Capodanno [[0]] tutti insieme a casa mia. (venire / voi) Io [[1]] la cena — farò qualcosa di speciale! (preparare) Ci [[2]] anche Sofia con il suo ragazzo. (essere) Dopo cena [[3]] i fuochi d'artificio dalla finestra. (guardare / noi) Il primo dell'anno [[0]] in montagna per qualche giorno. (andare / noi) [[4]] una bella vacanza! (essere) Ci [[5]] tantissima neve. (essere-impersonale)",
        blanks: [
          { options: ['verrete', 'venite', 'venivate'], answer: 'verrete', explain: 'Venire → verr- + -ete → verrete. Voi.' },
          { options: ['preparerò', 'preparo', 'preparavo'], answer: 'preparerò', explain: 'Preparare: io preparerò.' },
          { options: ["ci sarà", "c'è", "c'era"], answer: "ci sarà", explain: 'Esserci → ci sarà. Singolare.' },
          { options: ['guarderemo', 'guardiamo', 'guardavamo'], answer: 'guarderemo', explain: 'Guardare: noi guarderemo.' },
          { options: ['Sarà', 'È', 'Era'], answer: 'Sarà', explain: 'Essere → sarà. Predizione.' },
          { options: ["ci sarà", "c'è", "ci sarà"], answer: "ci sarà", explain: "Esserci (neve, sing) → ci sarà." },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma del futuro semplice sin opciones.',
        type: 'freeText',
        scene: 'Zhanna explica los planes de WeLearn para el próximo año',
        text: "L'anno prossimo WeLearn [[0]] nuovi corsi di italiano. (aprire) Noi [[1]] gli studenti in gruppi piccoli. (dividere) Ogni studente [[2]] un programma personalizzato. (avere) I professori [[3]] lezioni ogni giorno. (tenere) [[4]] sicuramente un anno fantastico per tutti! (essere)",
        blanks: [
          { answer: 'aprirà', explain: 'Aprire: raíz aprir- + -à → aprirà.' },
          { answer: 'divideremo', explain: 'Dividere: raíz divider- + -emo → divideremo.' },
          { answer: 'avrà', explain: 'Avere → avr- (irregular) + -à → avrà.' },
          { answer: 'terranno', explain: 'Tenere → terr- (irregular) + -anno → terranno.' },
          { answer: 'Sarà', explain: 'Essere → sar- (irregular) + -à → sarà.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con el futuro semplice.',
        type: 'write',
        items: [
          {
            scene: 'Plan de vacaciones',
            prompt: 'Quest\'estate io ___ (andare) in Spagna per due settimane.',
            answer: "Quest'estate io andrò in Spagna per due settimane.",
            accepted: ["quest'estate io andrò in spagna per due settimane", "quest'estate andrò in spagna"],
            explain: 'Andare → andrò (irregular).',
          },
          {
            scene: 'Predicción meteorológica',
            prompt: 'Domani ___ (fare) molto freddo e ___ (nevicare) in montagna.',
            answer: 'Domani farà molto freddo e nevicherà in montagna.',
            accepted: ['domani farà molto freddo e nevicherà in montagna'],
            explain: 'Fare → farà; nevicare → nevicherà (mantiene sonido k).',
          },
          {
            scene: 'Promesa firme',
            prompt: 'Ti prometto: ___ (chiamare / io) ogni giorno.',
            answer: 'Ti prometto: chiamerò ogni giorno.',
            accepted: ['ti prometto: chiamerò ogni giorno', 'chiamerò ogni giorno'],
            explain: 'Chiamare: io chiamerò. -are cambia -a a -e antes de terminaciones.',
          },
          {
            scene: 'Suposición presente',
            prompt: 'Non risponde — ___ (essere) occupato adesso.',
            answer: 'Non risponde — sarà occupato adesso.',
            accepted: ['non risponde — sarà occupato adesso', 'sarà occupato adesso'],
            explain: 'Futuro di probabilità: sarà = debe de estar / estará.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Mis planes futuros',
        tag: 'Escritura guiada',
        intro: 'Usa el futuro semplice para describir planes y predicciones.',
        type: 'write',
        items: [
          {
            scene: 'Tus planes del fin de semana',
            prompt: 'Questo weekend io ___ (al menos 2 verbos en futuro)',
            answer: 'Questo weekend andrò al cinema con gli amici e poi ceneremo insieme.',
            accepted: ['questo weekend andrò', 'questo weekend parlerò', 'questo weekend farò'],
            explain: 'Futuro per piani del weekend: andrò, farò, parlerò, ecc.',
          },
          {
            scene: 'Predicciones para Italia',
            prompt: "Fra dieci anni l'Italia ___ (predici il futuro: 2 cose)",
            answer: "Fra dieci anni l'Italia avrà più turisti e le città saranno più ecologiche.",
            accepted: ["fra dieci anni l'italia avrà", "fra dieci anni sarà", "fra dieci anni ci saranno"],
            explain: 'Futuro per predizioni: avrà, sarà, ci saranno, cambierà, ecc.',
          },
          {
            scene: 'Una suposición',
            prompt: 'Dov\'è Marco? Perché non risponde? Forse ___ (supponi)',
            answer: "Forse sarà in riunione o starà dormendo.",
            accepted: ['forse sarà', 'forse starà', 'forse avrà'],
            explain: 'Futuro di probabilità: sarà, starà, avrà = debe de...',
          },
        ],
      },
    ],
  },
}

export default topic
