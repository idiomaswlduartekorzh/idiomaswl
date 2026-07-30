import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-conjuntivo-b1',
  order: '02',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Futuro do Conjuntivo en Portugués B1',
  shortTitle: 'Futuro do Conjuntivo',
  metaTitle: 'Futuro do Conjuntivo Portugués B1 — Subjuntivo Futuro',
  description:
    'El futuro do conjuntivo es una forma verbal exclusiva del portugués (y del gallego) que no existe en español moderno. Se usa después de "quando", "se", "assim que", "logo que" y otras conjunciones temporales y condicionales para hablar de situaciones futuras eventuales. Es un tiempo de uso cotidiano en portugués que los hispanohablantes suelen omitir incorrectamente.',
  lead: 'Aprende el futuro del subjuntivo portugués: la forma verbal que no existe en español pero es obligatoria en portugués para hablar del futuro con "quando" y "se".',
  outcomes: [
    'Forma el futuro do conjuntivo de verbos regulares e irregulares',
    'Usa "quando + futuro conjuntivo" para hablar de acciones futuras eventuales',
    'Distingue entre el uso de "se" con futuro conjuntivo (real) e imperfeito conjuntivo (irreal)',
    'Reconoce las conjunciones que exigen futuro do conjuntivo',
  ],

  guide: {
    goal: 'Usar el futuro do conjuntivo con "quando", "se", "assim que", "logo que" para hablar de situaciones futuras eventuales o condicionales reales.',
    model: 'Quando chegares a casa, telefona-me. / Se fizeres isso, vais arrepender-te.',
    formula: 'Infinitivo → retira -r → + terminaciones: -r / -res / -r / -rmos / -rdes / -rem',
    decisions: [
      'Verbos regulares: el futuro conjuntivo = infinitivo sin -r con terminaciones propias (falar → falar, falares, falar...)',
      'En verbos regulares, eu/ele/ela = el mismo infinitivo; tu añade -es; nós añade -mos; vós añade -des; eles añade -em',
      '"Quando" + futuro conjuntivo (no indicativo presente): "Quando chegar" ✓, "Quando chego" ❌ para referirse al futuro',
      '"Se" + futuro conjuntivo = condición real posible; "se" + imperfeito conjuntivo = condición irreal/hipotética',
      'Irregulares siguen la raíz del pretérito perfeito: ter → tiver; ser/ir → for; estar → estiver; fazer → fizer; vir → vier',
      'Após "assim que", "logo que", "mal", "enquanto" + futuro conjuntivo en contexto futuro',
    ],
    table: [
      ['Persona', 'Terminación regular', 'falar / ter'],
      ['eu', '(infinitivo)', 'falar / tiver'],
      ['tu', '-es', 'falares / tiveres'],
      ['ele/ela', '(infinitivo)', 'falar / tiver'],
      ['nós', '-mos', 'falarmos / tivermos'],
      ['vós', '-des', 'falardes / tiverdes'],
      ['eles', '-em', 'falarem / tiverem'],
    ],
    mistakes: [
      '"Quando chego a casa, telefono-te" ❌ (si hablas del futuro) → "Quando chegar a casa, telefona-me" ✓ — después de "quando" futuro se usa el futuro do conjuntivo.',
      '"Se terei tempo, irei" ❌ → "Se tiver tempo, irei" ✓ — "se" condicional real no admite futuro de indicativo, sino futuro do conjuntivo.',
      '"Quando eu vou terminar" ❌ → "Quando eu terminar" ✓ — el futuro conjuntivo ya implica una acción futura, sin necesidad de "ir + infinitivo".',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el futuro do conjuntivo y por qué es único?',
      paragraphs: [
        'El futuro do conjuntivo es una de las características más distintivas del portugués frente al español. Mientras que el español antiguo tenía un subjuntivo futuro (si fuere, cuando llegare), en español moderno esta forma prácticamente ha desaparecido. En portugués, sin embargo, se usa todos los días en el habla corriente.',
        'Su función es hablar de eventos futuros eventuales: cosas que pueden pasar o no, condiciones reales que dependen del futuro. "Quando tiveres dinheiro, podes comprar o carro" (Cuando tengas dinero, puedes comprar el coche). Para un hispanohablante, lo más natural es usar el presente de subjuntivo, pero en portugués eso sonaría incorrecto.',
      ],
    },
    {
      heading: '¿Cómo se forma el futuro do conjuntivo en portugués?',
      paragraphs: [
        'Para verbos regulares, el futuro do conjuntivo es fácil: en muchas personas coincide con el infinitivo. La fórmula es: infinitivo + terminaciones. La gran ventaja es que eu y ele/ela son idénticos al infinitivo. Solo tu, nós, vós y eles/elas tienen terminaciones propias.',
        'Para irregulares, usa la raíz del pretérito perfeito (igual que el imperfeito do conjuntivo): tiver (ter), for (ser/ir), estiver (estar), fizer (fazer), vier (vir), puder (poder), quiser (querer), souber (saber), disser (dizer). Estas son las formas más importantes que debes memorizar.',
      ],
      table: [
        ['Verbo', 'eu', 'tu', 'ele', 'nós', 'eles'],
        ['falar', 'falar', 'falares', 'falar', 'falarmos', 'falarem'],
        ['comer', 'comer', 'comeres', 'comer', 'comermos', 'comerem'],
        ['partir', 'partir', 'partires', 'partir', 'partirmos', 'partirem'],
        ['ter', 'tiver', 'tiveres', 'tiver', 'tivermos', 'tiverem'],
        ['ser/ir', 'for', 'fores', 'for', 'formos', 'forem'],
      ],
    },
    {
      heading: 'Conjunciones que exigen futuro do conjuntivo',
      paragraphs: [
        'Las siguientes conjunciones siempre llevan futuro do conjuntivo cuando el verbo se refiere al futuro: "quando" (cuando), "se" (si, condición real), "assim que" (en cuanto), "logo que" (en cuanto), "mal" (en cuanto, nada más), "enquanto" (mientras), "até que" (hasta que), "desde que" (siempre que), "como" (como, de la manera en que), "onde" (donde).',
        '"Enquanto" merece atención especial: en el presente se usa con indicativo presente, pero en el futuro exige futuro do conjuntivo. "Enquanto estudares, aprenderás." (Mientras estudies, aprenderás.)',
      ],
    },
    {
      heading: '"Se" real vs "se" hipotético: diferencia crucial',
      paragraphs: [
        'Esta es una distinción que los hispanohablantes deben memorizar. "Se" + futuro do conjuntivo = condición real posible en el futuro: "Se tiveres tempo, vem jantar." (Si tienes tiempo, ven a cenar — es posible que tengas tiempo).',
        '"Se" + imperfeito do conjuntivo = condición irreal o hipotética: "Se tivesses tempo, vínhas jantar." (Si tuvieras tiempo, vendrías a cenar — pero probablemente no tengas tiempo). La diferencia de modo cambia completamente el significado.',
      ],
    },
    {
      heading: '¿Cuál es el error más frecuente con el futuro do conjuntivo?',
      paragraphs: [
        'El error número uno es usar el presente de indicativo después de "quando" cuando se habla del futuro. En español decimos "cuando llegues" (subjuntivo presente), pero en portugués es "quando chegares" (futuro do conjuntivo). Usar "quando chegas" en contexto futuro suena extraño para un hablante nativo de portugués.',
        'El segundo error es usar el futuro de indicativo: "quando chegarei" es incorrecto. En portugués nunca se usa el futuro de indicativo después de "quando" o "se". Siempre futuro do conjuntivo para acciones futuras eventuales.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futuro do conjuntivo con "quando", "se" y otras conjunciones temporales y condicionales.',
    graphicPrompt: 'Flecha hacia el futuro con una bifurcación: "quando chegar" (condición real posible).',
    scene: [
      ['Quando chegares, avisa-me.', 'Cuando llegues, avísame.'],
      ['Se fizeres isso, vais arrepender-te.', 'Si haces eso, te vas a arrepentir.'],
      ['Assim que souber a resposta, digo-te.', 'En cuanto sepa la respuesta, te lo digo.'],
      ['Logo que tivermos tempo, visitamos os avós.', 'En cuanto tengamos tiempo, visitamos a los abuelos.'],
      ['Enquanto for cedo, podemos passear.', 'Mientras sea temprano, podemos pasear.'],
      ['Onde quer que fores, leva o casaco.', 'Dondequiera que vayas, lleva el abrigo.'],
      ['Quando puder, venho ter contigo.', 'Cuando pueda, voy a verte.'],
      ['Se quiserem participar, devem inscrever-se.', 'Si quieren participar, deben inscribirse.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['chegar', 'ter', 'ser', 'ir', 'fazer', 'poder', 'querer', 'saber', 'vir', 'estar'],
    reviewFocus: ['quando + futuro conjuntivo', 'se real vs se irreal', 'irregulares: tiver, for, fizer'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del futuro do conjuntivo.',
        type: 'choice',
        items: [
          {
            scene: 'Instrucción para el futuro',
            lines: [['', 'Quando ___ a casa, manda-me uma mensagem.']],
            options: ['chegares', 'chegas', 'chegarás', 'chegues'],
            answer: 'chegares',
            explain: '"Chegar" futuro conjuntivo: eu/ele = chegar, tu = chegares. "Quando" + futuro conjuntivo para acciones futuras.',
          },
          {
            scene: 'Condición real posible',
            lines: [['', 'Se ___ tempo, passamos pelo museu.']],
            options: ['tivermos', 'temos', 'teremos', 'tenhamos'],
            answer: 'tivermos',
            explain: '"Ter" futuro conjuntivo irregular: tiver, tiveres, tiver, tivermos (nós), tiverdes, tiverem.',
          },
          {
            scene: 'En cuanto / assim que',
            lines: [['', 'Assim que ___ os resultados, telefonamos.']],
            options: ['souber', 'sabe', 'saberá', 'saiba'],
            answer: 'souber',
            explain: '"Saber" futuro conjuntivo: soube- (raíz pretérito) → souber (eu/ele). "Assim que" + futuro conjuntivo.',
          },
          {
            scene: 'Mientras / enquanto',
            lines: [['', 'Enquanto ___ aqui, tens de respeitar as regras.']],
            options: ['estiveres', 'estás', 'estarás', 'estejas'],
            answer: 'estiveres',
            explain: '"Estar" futuro conjuntivo: estiver, estiveres (tu), estiver... "Enquanto" + futuro conjuntivo en contexto futuro.',
          },
          {
            scene: 'Condición con fazer',
            lines: [['', 'Se ___ isso outra vez, terás um problema.']],
            options: ['fizeres', 'fazes', 'farás', 'faças'],
            answer: 'fizeres',
            explain: '"Fazer" futuro conjuntivo irregular: fizer (eu/ele), fizeres (tu), fizer, fizermos, fizerdes, fizerem.',
          },
          {
            scene: 'Logo que / en cuanto',
            lines: [['', 'Logo que ___ da escola, vamos ao parque.']],
            options: ['sair', 'saíres', 'sairem'],
            answer: 'sair',
            explain: '"Sair" futuro conjuntivo: eu/ele = sair (igual al infinitivo en verbos regulares). "Logo que" + futuro conjuntivo.',
          },
          {
            scene: 'Condición con vir',
            lines: [['', 'Se ___ a Lisboa, diz-me com antecedência.']],
            options: ['vieres', 'vens', 'virás', 'venhas'],
            answer: 'vieres',
            explain: '"Vir" futuro conjuntivo irregular: vier (eu/ele), vieres (tu), vier, viermos, vierdes, vierem.',
          },
          {
            scene: 'Hasta que / até que',
            lines: [['', 'Fica aqui até que eu ___.']],
            options: ['voltar', 'volto', 'voltarei', 'volte'],
            answer: 'voltar',
            explain: '"Voltar" futuro conjuntivo: eu/ele = voltar (igual al infinitivo). "Até que" + futuro conjuntivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos verbos en el futuro',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas del futuro do conjuntivo.',
        type: 'dual',
        items: [
          {
            scene: 'Planificando el fin de semana',
            lines: [['', 'Quando [[0]] o trabalho e [[1]] tempo livre, vou descansar.']],
            blanks: [
              { options: ['terminar', 'termino', 'terminei', 'termine'], answer: 'terminar', explain: '"Terminar" futuro conjuntivo: eu/ele = terminar (igual al infinitivo). "Quando" + futuro conjuntivo.' },
              { options: ['tiver', 'tenho', 'terei', 'tenha'], answer: 'tiver', explain: '"Ter" futuro conjuntivo irregular: tiver (eu/ele). Raíz del pretérito tiveram → tive- + r.' },
            ],
          },
          {
            scene: 'Reglas de la casa',
            lines: [['', 'Se tu [[0]] os pratos e [[1]] o lixo, podes sair mais cedo.']],
            blanks: [
              { options: ['lavares', 'lavas', 'lavaste', 'laves'], answer: 'lavares', explain: '"Lavar" futuro conjuntivo: tu = lavares. "Se" condicional real + futuro conjuntivo.' },
              { options: ['tirares', 'tiras', 'tiraste', 'tires'], answer: 'tirares', explain: '"Tirar" futuro conjuntivo: tu = tirares. Dos condiciones reales coordinadas.' },
            ],
          },
          {
            scene: 'Instrucciones de viaje',
            lines: [['', 'Assim que [[0]] ao aeroporto e [[1]] o check-in, espera por mim.']],
            blanks: [
              { options: ['chegares', 'chegas', 'chegaste', 'chegues'], answer: 'chegares', explain: '"Chegar" futuro conjuntivo: tu = chegares. "Assim que" + futuro conjuntivo.' },
              { options: ['fizeres', 'fazes', 'fizeste', 'faças'], answer: 'fizeres', explain: '"Fazer" futuro conjuntivo irregular: tu = fizeres.' },
            ],
          },
          {
            scene: 'Oferta condicional',
            lines: [['', 'Se vocês [[0]] ao projeto e [[1]] a prazo, receberão um bónus.']],
            blanks: [
              { options: ['aderirem', 'aderem', 'aderiram', 'adiram'], answer: 'aderirem', explain: '"Aderir" futuro conjuntivo: eles = aderirem. "Se" + futuro conjuntivo para condición real.' },
              { options: ['entregarem', 'entregam', 'entregaram', 'entreguem'], answer: 'entregarem', explain: '"Entregar" futuro conjuntivo: eles = entregarem.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Instrucciones para el viaje',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del futuro do conjuntivo para completar estas instrucciones de viaje.',
        type: 'guidedText',
        scene: 'Elige la forma correcta del futuro do conjuntivo.',
        text: 'Quando [[0]] a Lisboa, toma o metro até ao centro. Assim que [[1]] na estação do Rossio, [[2]] para a direita. Se [[3]] fome, há muitos cafés na zona. Logo que [[4]] o hotel, faz o check-in e descansa. Enquanto [[5]] tempo, visita o Castelo de São Jorge. Se [[6]] ajuda, a equipa do hotel está sempre disponível.',
        blanks: [
          { options: ['chegares', 'chegas', 'chegaste', 'chegues'], answer: 'chegares', explain: '"Chegar" futuro conjuntivo: tu = chegares. "Quando" + futuro conjuntivo.' },
          { options: ['saíres', 'sais', 'saíste', 'saias'], answer: 'saíres', explain: '"Sair" futuro conjuntivo: tu = saíres. "Assim que" + futuro conjuntivo.' },
          { options: ['vira', 'vires', 'viras', 'vira'], answer: 'vira', explain: '"Virar" imperativo para instrucciones directas: vira (tu, imperativo). En este contexto es instrucción directa.' },
          { options: ['tiveres', 'tens', 'tinhas', 'tenhas'], answer: 'tiveres', explain: '"Ter" futuro conjuntivo irregular: tu = tiveres. Condición real futura.' },
          { options: ['encontrares', 'encontras', 'encontraste', 'encontres'], answer: 'encontrares', explain: '"Encontrar" futuro conjuntivo: tu = encontrares. "Logo que" + futuro conjuntivo.' },
          { options: ['tiveres', 'tens', 'teres', 'tenhas'], answer: 'tiveres', explain: '"Ter" futuro conjuntivo: tu = tiveres. "Enquanto" + futuro conjuntivo en contexto futuro.' },
          { options: ['precisares', 'precisas', 'precisaste', 'precises'], answer: 'precisares', explain: '"Precisar" futuro conjuntivo: tu = precisares. "Se" + futuro conjuntivo para condición real.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma del futuro do conjuntivo del verbo indicado.',
        type: 'freeText',
        scene: 'Escribe la forma correcta del futuro do conjuntivo.',
        text: 'Quando [[0]] (ter) a minha própria casa, quero ter um jardim. Se [[1]] (poder) escolher o bairro, escolheria o Príncipe Real. Assim que [[2]] (encontrar) a casa certa, assino o contrato. Se [[3]] (ser) preciso, vendo o meu carro para pagar a entrada. Logo que [[4]] (estar) tudo pronto, faço uma festa de inauguração.',
        blanks: [
          { answer: 'tiver', accepted: ['tiver'], explain: '"Ter" futuro conjuntivo: eu = tiver. Raíz del pretérito tiveram → tive- + r.' },
          { answer: 'puder', accepted: ['puder'], explain: '"Poder" futuro conjuntivo: eu = puder. Raíz puderam → pude- + r.' },
          { answer: 'encontrar', accepted: ['encontrar'], explain: '"Encontrar" futuro conjuntivo: eu/ele = encontrar (igual al infinitivo).' },
          { answer: 'for', accepted: ['for'], explain: '"Ser" futuro conjuntivo irregular: eu/ele = for. Muy irregular, debe memorizarse.' },
          { answer: 'estiver', accepted: ['estiver'], explain: '"Estar" futuro conjuntivo irregular: eu/ele = estiver. Raíz estiveram → estive- + r.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye condiciones futuras',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el futuro do conjuntivo.',
        type: 'write',
        items: [
          {
            scene: 'Cuando termines',
            prompt: 'Escribe qué harás cuando termines de trabajar hoy (usa "quando terminar/terminares").',
            answer: 'Quando terminar o trabalho, vou jantar com os meus amigos.',
            accepted: ['quando terminar', 'quando terminares', 'quando acabar'],
            explain: 'Ejemplo: Quando terminar, vou ao ginásio. "Quando" + futuro conjuntivo es obligatorio en este contexto.',
          },
          {
            scene: 'Si tienes tiempo',
            prompt: 'Escribe lo que harías si tienes tiempo libre este fin de semana (condición real con "se tiver").',
            answer: 'Se tiver tempo, visito o novo museu de arte contemporânea.',
            accepted: ['se tiver', 'se tivermos', 'se tiveres'],
            explain: '"Se" + futuro conjuntivo = condición real posible. Ejemplo: Se tiver dinheiro, compro os bilhetes.',
          },
          {
            scene: 'En cuanto sepas',
            prompt: 'Di que avisarás a alguien en cuanto sepas algo (usa "assim que souber").',
            answer: 'Assim que souber os resultados, ligo-te imediatamente.',
            accepted: ['assim que souber', 'logo que souber', 'mal souber'],
            explain: '"Assim que" + futuro conjuntivo. "Saber" irregular: souber. Ejemplo: Assim que souber, aviso-te.',
          },
          {
            scene: 'Donde sea que vayas',
            prompt: 'Escribe un consejo usando "onde quer que fores" (donde quiera que vayas).',
            answer: 'Onde quer que fores, nunca te esqueças das tuas raízes.',
            accepted: ['onde quer que fores', 'onde quer que for'],
            explain: '"Onde quer que" + futuro conjuntivo. "Ir" irregular: for (eu/ele), fores (tu).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Planes y condiciones',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tus planes usando el futuro do conjuntivo con diferentes conjunciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu plan con "quando"',
            prompt: 'Escribe qué harás cuando termines tus estudios o cuando llegues a casa hoy.',
            answer: 'Quando acabar os estudos, quero trabalhar noutro país durante um ano.',
            accepted: ['quando acabar', 'quando terminar', 'quando chegar', 'quando tiver'],
            explain: '"Quando" + futuro conjuntivo es la estructura básica. Verbos regulares tienen forma = infinitivo en eu/ele.',
          },
          {
            scene: 'Tu condición con "se"',
            prompt: 'Escribe una condición real posible sobre el futuro con "se + futuro conjuntivo".',
            answer: 'Se encontrar um bom emprego em Lisboa, mudo-me para lá.',
            accepted: ['se encontrar', 'se tiver', 'se puder', 'se for', 'se conseguir'],
            explain: '"Se" + futuro conjuntivo para condición real. Contrastar con "se + imperfeito" para hipótesis irreales.',
          },
          {
            scene: 'Tu regla con "enquanto"',
            prompt: 'Escribe una regla personal o condición usando "enquanto" con futuro conjuntivo.',
            answer: 'Enquanto estiver em forma, continuarei a correr todas as manhãs.',
            accepted: ['enquanto estiver', 'enquanto tiver', 'enquanto puder', 'enquanto for'],
            explain: '"Enquanto" + futuro conjuntivo para acciones simultáneas futuras. "Estar" irregular: estiver.',
          },
        ],
      },
    ],
  },
}

export default topic
