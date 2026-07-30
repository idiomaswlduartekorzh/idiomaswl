import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conditionnel-present-b1',
  order: '04',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'B1',
  title: 'Le Conditionnel Présent en Francés B1',
  shortTitle: 'Conditionnel Présent',
  metaTitle: 'Conditionnel Présent B1 — El condicional en francés: formas y usos',
  description:
    'El conditionnel présent se forma con la raíz del futur simple más las terminaciones del imparfait. Expresa hipótesis, deseos, peticiones educadas, consejos y condiciones irreales. Dominar sus usos eleva significativamente la sofisticación de tu francés hablado y escrito.',
  lead: 'Aprende el conditionnel présent para expresar hipótesis, pedir de forma educada, dar consejos y hablar de condiciones irreales en francés B1.',
  outcomes: [
    'Formas el conditionnel présent con la raíz del futur + terminaciones del imparfait',
    'Expresas peticiones educadas y deseos con el condicionnel',
    'Construyes hipótesis del tipo 2: Si + imparfait → conditionnel',
    'Das consejos usando "tu devrais / vous devriez"',
  ],

  guide: {
    goal: 'Usar el conditionnel présent para hipótesis, deseos, peticiones corteses y consejos.',
    model: "Je voudrais un café, s'il vous plaît. / Si j'avais de l'argent, je voyagerais partout. / Tu devrais étudier davantage.",
    formula: "Raíz del futur simple + terminaciones del imparfait: -ais, -ais, -ait, -ions, -iez, -aient",
    decisions: [
      'Raíces regulares: infinitivo completo (-er/-ir) o sin -e final (-re) → mêmes raíces que futur.',
      'Raíces irregulares idénticas al futur: être → ser-, avoir → aur-, aller → ir-, faire → fer-, venir → viendr-, pouvoir → pourr-.',
      'Petición cortés: voudrais/pourriez/auriez en lugar de veux/pouvez/avez.',
      'Deseos con "j\'aimerais" o "je voudrais": más suaves que vouloir en présent.',
      'Condición irreal tipo 2: Si + imparfait → conditionnel présent.',
      'Consejo con "devrais/devrait": "Tu devrais faire du sport." = Deberías hacer deporte.',
    ],
    table: [
      ['Pronombre', 'Parler', 'Être (ser-)'],
      ['je', 'parlerais', 'serais'],
      ['tu', 'parlerais', 'serais'],
      ['il/elle/on', 'parlerait', 'serait'],
    ],
    mistakes: [
      '"Si j\'aurais de l\'argent" ❌ → "Si j\'avais de l\'argent" ✓ — la cláusula con "si" tipo 2 lleva imparfait, nunca conditionnel.',
      '"Je voudrai un café" ❌ → "Je voudrais un café" ✓ — para petición cortés se usa conditionnel (-ais), no futur (-ai).',
      '"Il ferait beau si il pleuvrait" ❌ → "Il ferait beau s\'il ne pleuvait pas" ✓ — si + imparfait (no conditionnel).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el conditionnel présent?',
      paragraphs: [
        'El conditionnel présent se construye tomando exactamente la misma raíz que el futur simple y añadiendo las terminaciones del imparfait: -ais, -ais, -ait, -ions, -iez, -aient. Esto significa que si ya dominas el futur simple, el conditionnel présent es muy fácil de aprender: cambias solo las terminaciones.',
        'Para verbos regulares: parler → parlerais, parlerais, parlerait, parlerions, parleriez, parleraient. Para irregulares: être → serais, serais, serait, serions, seriez, seraient. La clave es que las raíces irregulares son las mismas que en el futur simple.',
      ],
    },
    {
      heading: '¿Cuáles son los usos del conditionnel présent en francés?',
      paragraphs: [
        'El conditionnel présent tiene varios usos esenciales. El más importante para el nivel B1 es la hipótesis irreal o improbable (tipo 2): "Si j\'avais plus de temps, je lirais davantage." Aquí la condición (tener más tiempo) se presenta como contraria a la realidad actual.',
        'También expresa peticiones corteses y deseos: "Je voudrais réserver une table." (Quisiera reservar una mesa.) / "Pourriez-vous m\'aider?" (¿Podría usted ayudarme?) / "J\'aimerais visiter le Japon un jour." Estas formas son mucho más educadas que usar el présent directo.',
      ],
    },
    {
      heading: '¿Cómo se dan consejos con el conditionnel en francés?',
      paragraphs: [
        'El conditionnel de "devoir" (devrais/devriez/devrait) es la forma más natural para dar consejos en francés: "Tu devrais te reposer." (Deberías descansar.) / "Vous devriez consulter un médecin." / "Il devrait partir plus tôt pour éviter les embouteillages."',
        'También puedes usar el conditionnel de "pouvoir" para sugerencias más suaves: "Tu pourrais essayer cette application." (Podrías probar esta aplicación.) O "avoir intérêt à": "Tu aurais intérêt à arriver en avance."',
      ],
    },
    {
      heading: 'Conditionnel en información no verificada',
      paragraphs: [
        'En el periodismo y las noticias, el conditionnel se usa para reportar información no confirmada o rumores: "Le président serait malade." (Se dice que el presidente estaría enfermo.) / "L\'entreprise aurait licencié 200 employés." Este uso es muy frecuente en medios de comunicación.',
        'También aparece en noticias para distanciarse de afirmaciones que no se pueden verificar: "La réunion aurait lieu demain." / "Les deux partis seraient proches d\'un accord."',
      ],
    },
    {
      heading: 'El condicional tipo 2: Si + imparfait',
      paragraphs: [
        'La hipótesis irreal en el presente usa la estructura: Si + imparfait → conditionnel présent. Esta estructura habla de situaciones contrarias a la realidad actual: "Si j\'étais riche, je ferais le tour du monde." (Si fuera rico, haría la vuelta al mundo — pero no lo soy.)',
        'Atención: NUNCA se pone el conditionnel en la cláusula con "si". El error más común de los hispanohablantes es decir "si je serais" en lugar de "si j\'étais". La regla es fija: si + imparfait (cláusula de condición), + conditionnel (cláusula de resultado).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Conditionnel présent en peticiones corteses, hipótesis y consejos.',
    graphicPrompt: 'Situaciones de cortesía y mundos hipotéticos con burbujas de conditionnel.',
    scene: [
      ["Je voudrais un café, s'il vous plaît.", "Quisiera un café, por favor."],
      ["Si j'avais le temps, je voyagerais plus.", "Si tuviera tiempo, viajaría más."],
      ["Tu devrais te coucher plus tôt.", "Deberías acostarte más temprano."],
      ["Pourriez-vous répéter, s'il vous plaît?", "¿Podría repetir, por favor?"],
      ["J'aimerais vivre au bord de la mer.", "Me gustaría vivir a orillas del mar."],
      ["Que feriez-vous si vous gagniez au loto?", "¿Qué harían si ganaran la lotería?"],
      ["Il devrait consulter un spécialiste.", "Debería consultar a un especialista."],
      ["On pourrait aller au cinéma ce soir.", "Podríamos ir al cine esta noche."],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['raíz futur + terminaciones imparfait', 'si + imparfait → conditionnel', 'petición cortés'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el conditionnel',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del conditionnel présent.',
        type: 'choice',
        items: [
          {
            scene: 'Petición en un restaurante',
            lines: [['', "Je ___ le menu du jour, s'il vous plaît."]],
            options: ['voudrais', 'veux', 'voudrai', 'veuille'],
            answer: 'voudrais',
            explain: 'Petición cortés → conditionnel de vouloir: je voudrais.',
          },
          {
            scene: 'Hipótesis irreal',
            lines: [['', "Si elle ___ plus de temps libre, elle ferait du yoga."]],
            options: ['avait', 'aurait', 'aura', 'a'],
            answer: 'avait',
            explain: 'Cláusula con "si" tipo 2 → imparfait: avait (no conditionnel).',
          },
          {
            scene: 'Consejo a un amigo',
            lines: [['', "Tu ___ consulter un médecin pour cette douleur."]],
            options: ['devrais', 'dois', 'devras', 'doives'],
            answer: 'devrais',
            explain: 'Consejo en conditionnel: tu devrais (devoir → devrais).',
          },
          {
            scene: 'Sugerencia amable',
            lines: [['', "On ___ prendre un taxi plutôt que le bus."]],
            options: ['pourrait', 'peut', 'pourra', 'puisse'],
            answer: 'pourrait',
            explain: 'Sugerencia en conditionnel: on pourrait (pouvoir → pourrait).',
          },
          {
            scene: 'Información no confirmada',
            lines: [['', "Selon les rumeurs, le concert ___ annulé."]],
            options: ['serait', 'sera', 'est', 'soit'],
            answer: 'serait',
            explain: 'Información no verificada → conditionnel: serait (être → serait).',
          },
          {
            scene: 'Sueño hipotético',
            lines: [['', "Si je gagnais au loto, j'___ le tour du monde."]],
            options: ['ferais', 'fais', 'ferai', 'fasse'],
            answer: 'ferais',
            explain: 'Hipótesis tipo 2 → conditionnel en la consecuencia: faire → ferais.',
          },
          {
            scene: 'Petición formal',
            lines: [['', "___ -vous m'indiquer le chemin pour la gare?"]],
            options: ['Pourriez', 'Pouvez', 'Pourrez', 'Puissiez'],
            answer: 'Pourriez',
            explain: 'Petición muy cortés en conditionnel: pourriez (vous, pouvoir).',
          },
          {
            scene: 'Deseo expresado con cortesía',
            lines: [['', "J'___ visiter le musée d'Orsay un jour."]],
            options: ['aimerais', 'aime', 'aimerai'],
            answer: 'aimerais',
            explain: 'Deseo con aimer en conditionnel: j\'aimerais (regular: aim- + -erais).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Hipótesis y cortesía',
        tag: '2 espacios',
        intro: 'Completa con conditionnel présent o imparfait según la estructura de la frase.',
        type: 'dual',
        items: [
          {
            scene: 'En una tienda',
            lines: [['', "Je [[0]] essayer cette veste. Est-ce que vous [[1]] une taille plus grande?"]],
            blanks: [
              { options: ['voudrais', 'veux', 'voudrai', 'veuille'], answer: 'voudrais', explain: 'Petición cortés → conditionnel: voudrais.' },
              { options: ['auriez', 'avez', 'aurez', 'ayez'], answer: 'auriez', explain: 'Pregunta cortés → conditionnel de avoir: auriez.' },
            ],
          },
          {
            scene: 'Hipótesis tipo 2',
            lines: [['', "Si tu [[0]] davantage, tu [[1]] de meilleurs résultats."]],
            blanks: [
              { options: ['t\'entraînais', 'tu entraînes', 't\'entraîneras', 't\'entraînerais'], answer: "t'entraînais", explain: 'Cláusula con "si" tipo 2 → imparfait: tu t\'entraînais.' },
              { options: ['obtiendrais', 'obtiens', 'obtiendras', 'obtiendrais'], answer: 'obtiendrais', explain: 'Consecuencia tipo 2 → conditionnel: obtiendrais (obtenir → obtendr-).' },
            ],
          },
          {
            scene: 'Noticias sin confirmar',
            lines: [['', "Selon une source, le gouvernement [[0]] une nouvelle loi et les prix [[1]] baisser."]],
            blanks: [
              { options: ['préparerait', 'prépare', 'préparera', 'préparerait'], answer: 'préparerait', explain: 'Información sin confirmar → conditionnel: préparerait.' },
              { options: ['pourraient', 'peuvent', 'pourront', 'puissent'], answer: 'pourraient', explain: 'Posibilidad no verificada → conditionnel: pourraient.' },
            ],
          },
          {
            scene: 'Consejo a un colega',
            lines: [['', "À ta place, je [[0]] au directeur. Tu [[1]] expliquer la situation clairement."]],
            blanks: [
              { options: ['parlerais', 'parle', 'parlerai', 'parles'], answer: 'parlerais', explain: '"À ta place, je" → conditionnel: parlerais.' },
              { options: ['devrais', 'dois', 'devras', 'doives'], answer: 'devrais', explain: 'Consejo → conditionnel de devoir: devrais.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Si j\'étais millionnaire...',
        tag: 'Texto guiado',
        intro: 'Completa esta hipótesis con conditionnel présent o imparfait según corresponda.',
        type: 'guidedText',
        scene: 'Reflexión hipotética sobre ganar la lotería.',
        text: "Si je [[0]] (gagner) à la loterie, ma vie [[1]] (changer) complètement. D'abord, j'[[2]] (acheter) une grande maison à la campagne. Ensuite, je [[3]] (faire) le tour du monde pendant un an. Mais je ne [[4]] (oublier) pas mes proches — je [[5]] (aider) ma famille et mes amis. Si j'[[6]] (avoir) autant d'argent, je [[7]] (créer) aussi une fondation pour aider les enfants défavorisés.",
        blanks: [
          { options: ['gagnais', 'gagne', 'gagnerais', 'gagnerai'], answer: 'gagnais', explain: 'Cláusula con "si" tipo 2 → imparfait: gagnais.' },
          { options: ['changerait', 'change', 'changera', 'ait changé'], answer: 'changerait', explain: 'Consecuencia hipotética → conditionnel: changerait.' },
          { options: ["j'achèterais", 'j\'achète', "j'achèterai", "j'achèterais"], answer: "achèterais", explain: '"Acheter" con accent: achèterais (conditionnel).' },
          { options: ['ferais', 'fais', 'ferai', 'fasse'], answer: 'ferais', explain: 'Conditionnel de faire: ferais.' },
          { options: ['oublierais', 'oublie', 'oublierai', 'oublie'], answer: 'oublierais', explain: 'Conditionnel negativo: n\'oublierais pas.' },
          { options: ['aiderais', 'aide', 'aiderai', 'aide'], answer: 'aiderais', explain: 'Conditionnel de aider: aiderais.' },
          { options: ['avais', 'ai', 'aurais', 'aurai'], answer: 'avais', explain: 'Segunda cláusula con "si" tipo 2 → imparfait: avais.' },
          { options: ['créerais', 'crée', 'créerai', 'créerait'], answer: 'créerais', explain: 'Conditionnel de créer: créerais.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el condicionnel',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del conditionnel présent para cada verbo.',
        type: 'freeText',
        scene: 'Diálogo en una agencia de viajes.',
        text: "Bonjour, je [[0]] (vouloir) des informations sur vos voyages en Asie. Est-ce que vous [[1]] (pouvoir) me recommander une destination? Si j'[[2]] (avoir) un budget de 2000 euros, [[3]] (être) -ce suffisant pour deux semaines? Mon ami [[4]] (aimer) aussi venir — est-ce que vous auriez une offre pour deux personnes?",
        blanks: [
          { answer: 'voudrais', accepted: ['voudrais'], explain: 'Petición cortés → conditionnel: je voudrais.' },
          { answer: 'pourriez', accepted: ['pourriez'], explain: 'Pregunta cortés → conditionnel de pouvoir: pourriez (vous).' },
          { answer: 'avais', accepted: ['avais'], explain: 'Cláusula con "si" tipo 2 → imparfait: j\'avais.' },
          { answer: 'serait', accepted: ['serait', 'ce serait'], explain: 'Consecuencia hipotética → conditionnel: serait.' },
          { answer: 'aimerait', accepted: ['aimerait'], explain: 'Conditionnel de aimer: aimerait (il).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con conditionnel',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el conditionnel présent según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'En un hotel',
            prompt: "Escribe una petición cortés para un hotel (reserva, información, servicio).",
            answer: "Je voudrais réserver une chambre double pour deux nuits, s'il vous plaît.",
            accepted: ['voudrais', 'pourriez', 'auriez', 'aimerait', 'pourrais'],
            explain: "Usa: Je voudrais + infinitivo, o Pourriez-vous + infinitivo, ou Auriez-vous + nom.",
          },
          {
            scene: 'Un consejo a un amigo',
            prompt: "Da un consejo a un amigo que está estresado por el trabajo (usa tu devrais / tu pourrais).",
            answer: "Tu devrais prendre quelques jours de vacances et essayer de te détendre.",
            accepted: ['devrais', 'pourrais', 'aurais intérêt', 'vaudrait mieux'],
            explain: "Tu devrais + infinitivo, tu pourrais + infinitivo, ou il vaudrait mieux que + subjonctif.",
          },
          {
            scene: 'Hipótesis personal',
            prompt: "Escribe qué harías si no tuvieras que trabajar mañana (Si je n\'avais pas à travailler demain...).",
            answer: "Si je n'avais pas à travailler demain, je dormirais jusqu'à midi et je lirais toute la journée.",
            accepted: ['ferais', 'irais', 'dormirais', 'lirais', 'resterais', 'voyagerais', 'mangerais', 'sortirais'],
            explain: "Si + [imparfait], je + [conditionnel]. Recuerda: NUNCA 'si je ferais'.",
          },
          {
            scene: 'Noticia no confirmada',
            prompt: "Escribe una noticia hipotética usando conditionnel para información no verificada.",
            answer: "Selon certaines sources, le directeur de l'entreprise aurait décidé de démissionner.",
            accepted: ['serait', 'aurait', 'ferait', 'pourrait', 'devrait', 'envisagerait'],
            explain: "Selon [source] + [sujeto] + [conditionnel] — distancia epistémica del periodista.",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El mundo ideal',
        tag: 'Producción libre',
        intro: 'Describe tu mundo ideal usando conditionnel présent en 3 oraciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu vida ideal',
            prompt: "Describe cómo sería tu vida ideal si pudieras cambiarla (Dans ma vie idéale, je...).",
            answer: "Dans ma vie idéale, je travaillerais quatre jours par semaine et j'aurais plus de temps pour mes passions.",
            accepted: ['serais', 'ferais', 'aurais', 'travaillerais', 'vivrai', 'habituerais', 'pourrais'],
            explain: "Dans ma vie idéale, je [conditionnel] et je [conditionnel].",
          },
          {
            scene: 'El mundo ideal',
            prompt: "Describe cómo sería el mundo ideal (Dans un monde idéal, les gens...).",
            answer: "Dans un monde idéal, les gens se respecteraient davantage et il n'y aurait plus de guerres.",
            accepted: ['seraient', 'feraient', 'auraient', 'pourraient', 'vivraient', 'respecteraient', "n'y aurait"],
            explain: "Dans un monde idéal, les gens [conditionnel]... et il n'y aurait plus de + problème.",
          },
          {
            scene: 'Una petición soñada',
            prompt: "Formula una petición imposible o muy difícil usando conditionnel (J'aimerais que... / Je voudrais...).",
            answer: "J'aimerais pouvoir parler toutes les langues du monde sans les étudier.",
            accepted: ['aimerais', 'voudrais', 'souhaiterais', 'rêverais', 'adorerais'],
            explain: "J'aimerais + infinitivo, ou je voudrais + infinitivo. Expresa el deseo imposible o muy ambicioso.",
          },
        ],
      },
    ],
  },
}

export default topic
