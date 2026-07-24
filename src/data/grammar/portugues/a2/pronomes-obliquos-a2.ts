import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomes-obliquos-a2',
  order: '05',
  color: '#166534',
  category: 'Pronomes',
  level: 'A2',
  title: 'Pronomes Oblíquos Átonos em Português A2',
  shortTitle: 'Pronomes oblíquos',
  metaTitle: 'Pronomes oblíquos átonos português A2 — me, te, o/a, nos, os/as',
  description:
    'Los pronombres oblicuos átonos sustituyen al objeto directo o indirecto del verbo. En portugués brasileño se usan: me (yo), te (tú), o/a (él/ella/usted), nos (nosotros), os/as (ellos/ellas). Su posición más frecuente en el habla coloquial es después del verbo.',
  lead: 'Los pronombres oblicuos átonos sustituyen al sustantivo objeto. En Brasil lo más común es colocarlos después del verbo: "Ele me ligou." / "Eu vi ela." Aprende cuándo y cómo usarlos.',
  outcomes: [
    'Identifica los pronombres oblicuos átonos del portugués',
    'Sustituye el objeto directo e indirecto con el pronombre correcto',
    'Usa la posición del pronombre en oraciones afirmativas y negativas',
    'Distingue o/a (objeto directo) de lhe (objeto indirecto)',
  ],

  guide: {
    goal: 'Usar los pronombres oblicuos átonos para sustituir objetos directos e indirectos en oraciones simples.',
    model: 'Eu te ligo mais tarde. / Ele me viu no mercado. / Você a conhece?',
    formula: 'Sujeto + verbo + pronombre oblicuo | Negación: Não + verbo + pronombre',
    decisions: [
      '"me" sustituye al objeto cuando el hablante es la primera persona: "Ele me chamou."',
      '"te" sustituye al objeto cuando el oyente es la segunda persona: "Eu te vi ontem."',
      '"o/a" sustituye al objeto directo de tercera persona: "Eu o conheço." / "Eu a encontrei."',
      '"nos" sustituye al objeto de primera persona plural: "Ela nos ajudou muito."',
      '"os/as" sustituye al objeto directo plural de tercera persona: "Eu os vi na festa."',
      'En negación el pronombre va después del verbo: "Eu não te entendi." / "Ela não me ligou."',
    ],
    table: [
      ['Persona', 'Pronombre oblicuo', 'Ejemplo'],
      ['eu (1ª sing.)', 'me', 'Ele me ligou.'],
      ['tu/você (2ª sing.)', 'te', 'Eu te conheço.'],
      ['ele/ela/você (3ª)', 'o / a', 'Eu o vi. / Eu a vi.'],
      ['nós (1ª pl.)', 'nos', 'Ela nos ajudou.'],
      ['vocês/eles/elas', 'os / as', 'Eu os conheço.'],
    ],
    mistakes: [
      '"Eu conheço ele" es coloquial y aceptado oralmente, pero la forma culta es "Eu o conheço."',
      'No confundir "me" (me/a mí) con "meu/minha" (mi, posesivo): "Ela me viu" vs "Ela viu meu carro."',
      '"Lhe" es el pronombre de objeto indirecto (a él/ella/usted): "Eu lhe disse a verdade" ≠ "Eu o disse" (OD).',
      'En Brasil informal: "te" reemplaza a "lhe" para la 2ª persona: "Eu te disse" en vez de "Eu lhe disse".',
    ],
  },

  seo: [
    {
      heading: 'Pronombres oblicuos átonos: qué son y para qué sirven',
      paragraphs: [
        'Los pronombres oblicuos átonos son pronombres que funcionan como objeto directo o indirecto dentro de una oración. En portugués brasileño los más frecuentes son: me, te, o/a, nos, os/as. Se llaman "átonos" porque no llevan acento y se apoyan en el verbo para pronunciarse.',
        'A diferencia del español, en portugués el pronombre oblicuo puede ir después del verbo (posición más coloquial en Brasil) o antes del verbo en ciertos contextos formales. En el habla cotidiana de Brasil es muy común oír: "Ele me ajudou" (Él me ayudó) o "Eu vi ela" en lugar de "Eu a vi".',
      ],
    },
    {
      heading: 'Posición del pronombre en la oración',
      paragraphs: [
        'La posición más natural en portugués brasileño coloquial es después del verbo: "Ela me ligou às 8h." / "Eu te vi no mercado." En la escritura formal el pronombre puede unirse al verbo con guion: "Chamou-me ontem." Pero en Brasil esta forma es poco frecuente en el habla cotidiana.',
        'En oraciones negativas, el pronombre siempre va entre la negación y el verbo: "Eu não te entendi nada." / "Ela não me viu." Esta regla es consistente en todos los registros del portugués.',
      ],
    },
    {
      heading: 'Objeto directo vs objeto indirecto',
      paragraphs: [
        'Para el objeto directo (sin preposición) se usan: me, te, o/a, nos, os/as. Para el objeto indirecto (con preposición "a") se usa "lhe/lhes" en la lengua formal, pero en Brasil el pronombre "te" o el nombre propio con preposición son más comunes: "Eu falei para ela" en lugar de "Eu lhe falei".',
        'El pronombre "o/a" es el de objeto directo de tercera persona. En Brasil coloquial a veces se reemplaza con "ele/ela" después del verbo: "Eu vi ele." Para el nivel A2 es importante conocer ambas formas.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a sustituir el objeto con el pronombre oblicuo correcto.',
    graphicPrompt: 'Diálogos cotidianos en los que los hablantes se refieren entre sí con pronombres oblicuos.',
    scene: [
      ['Ele me ligou ontem.', 'Él me llamó ayer.'],
      ['Eu te vi no parque.', 'Yo te vi en el parque.'],
      ['Você a conhece?', '¿La conoces?'],
      ['Ela nos convidou para a festa.', 'Ella nos invitó a la fiesta.'],
      ['Eu não te entendi.', 'No te entendí.'],
      ['Eles os encontraram no aeroporto.', 'Ellos los encontraron en el aeropuerto.'],
      ['A professora me ajudou muito.', 'La profesora me ayudó mucho.'],
      ['Eu os conheço desde criança.', 'Los conozco desde niños.'],
    ],
    learnerModes: ['coloquial: posición después del verbo', 'negación: não + verbo + pronombre', 'reemplazo de objeto'],
    reviewFocus: ['me/te/o/a/nos/os/as', 'posición', 'objeto directo vs indirecto', 'negación'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pronombre correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre oblicuo átono que mejor completa cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'La llamada',
            lines: [['Carlos', 'Ela ___ ligou ontem à noite.']],
            options: ['me', 'meu', 'eu', 'mim'],
            answer: 'me',
            explain: '"Me" es el pronombre de objeto de 1ª persona singular: Ela me ligou (ella me llamó).',
          },
          {
            scene: 'El encuentro',
            lines: [['Ana', 'Eu ___ vi no supermercado na semana passada.']],
            options: ['te', 'tu', 'ti', 'seu'],
            answer: 'te',
            explain: '"Te" es el pronombre de objeto de 2ª persona: Eu te vi (yo te vi).',
          },
          {
            scene: 'La directora',
            lines: [['Pedro', 'Você conhece a diretora? Eu ___ conheço há muitos anos.']],
            options: ['a', 'ela', 'lhe', 'sua'],
            answer: 'a',
            explain: '"A" es el pronombre de objeto directo femenino de 3ª persona: Eu a conheço.',
          },
          {
            scene: 'La invitación',
            lines: [['Maria', 'A professora ___ convidou para a reunião.']],
            options: ['nos', 'nós', 'nossa', 'nosso'],
            answer: 'nos',
            explain: '"Nos" es el pronombre de objeto de 1ª persona plural: ela nos convidou (ella nos invitó).',
          },
          {
            scene: 'Los vecinos',
            lines: [['Clara', 'Os vizinhos? Eu ___ vejo todos os dias.']],
            options: ['os', 'eles', 'seus', 'lhes'],
            answer: 'os',
            explain: '"Os" es el pronombre de objeto directo masculino plural: Eu os vejo.',
          },
          {
            scene: 'La negación',
            lines: [['Nico', 'Eu não ___ entendi nada do que você disse.']],
            options: ['te', 'tu', 'você', 'ti'],
            answer: 'te',
            explain: 'En negación: não + verbo + pronombre. "Te" para objeto de 2ª persona.',
          },
          {
            scene: 'El jefe',
            lines: [['Lina', 'O chefe ___ chamou para uma reunião urgente.']],
            options: ['nos', 'nós', 'nossa', 'nos nosso'],
            answer: 'nos',
            explain: '"Nos" para objeto de 1ª plural: o chefe nos chamou (el jefe nos llamó).',
          },
          {
            scene: 'La amiga',
            lines: [['Sofia', 'Você viu a Carla? Eu ___ procurei a tarde toda.']],
            options: ['a', 'ela', 'lhe', 'sua'],
            answer: 'a',
            explain: '"A" para objeto directo femenino de 3ª persona: Eu a procurei.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos pronombres en contexto',
        tag: '2 espacios',
        intro: 'Completa con el pronombre oblicuo correcto en cada espacio.',
        type: 'dual',
        items: [
          {
            scene: 'Los amigos',
            lines: [['Ana', 'Eles [[0]] convidaram para o churrasco e eu [[1]] agradeço muito.']],
            blanks: [
              { options: ['nos', 'nós', 'nossa'], answer: 'nos', explain: '"Nos" para objeto de 1ª plural: eles nos convidaram.' },
              { options: ['os', 'lhes', 'eles'], answer: 'os', explain: '"Os" para objeto directo plural: eu os agradeço.' },
            ],
          },
          {
            scene: 'El malentendido',
            lines: [['Carlos', 'Eu não [[0]] vi na festa e você não [[1]] ligou.']],
            blanks: [
              { options: ['te', 'tu', 'você'], answer: 'te', explain: '"Te" para objeto de 2ª persona en negación: não te vi.' },
              { options: ['me', 'mim', 'eu'], answer: 'me', explain: '"Me" para objeto de 1ª persona en negación: não me ligou.' },
            ],
          },
          {
            scene: 'La profesora',
            lines: [['Pedro', 'A professora [[0]] ensinou muito e nós [[1]] adoramos.']],
            blanks: [
              { options: ['nos', 'nós', 'nossa'], answer: 'nos', explain: '"Nos" para objeto de 1ª plural: ela nos ensinou.' },
              { options: ['a', 'ela', 'lhe'], answer: 'a', explain: '"A" para objeto directo femenino: nós a adoramos.' },
            ],
          },
          {
            scene: 'El encuentro casual',
            lines: [['Maria', 'Eu [[0]] vi no centro e [[1]] cumprimentei com um abraço.']],
            blanks: [
              { options: ['o', 'ele', 'lhe'], answer: 'o', explain: '"O" para objeto directo masculino: eu o vi.' },
              { options: ['o', 'ele', 'lhe'], answer: 'o', explain: '"O" para objeto directo: o cumprimentei (lo saludé).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Historia con pronombres oblicuos',
        tag: 'Texto guiado',
        intro: 'Elige el pronombre oblicuo correcto para completar este texto.',
        type: 'guidedText',
        scene: 'Una historia de amistad',
        text: 'Conheci a Luísa há cinco anos. Ela [[0]] apresentou a seus amigos e todos [[1]] receberam muito bem. Um dia, eu [[2]] pedi um favor e ela ficou feliz em ajudar. Hoje eu [[3]] considero minha melhor amiga. Sempre que posso, eu [[4]] ligo para saber como ela está.',
        blanks: [
          { options: ['me', 'mim', 'eu'], answer: 'me', explain: '"Me" para objeto de 1ª persona: ela me apresentou.' },
          { options: ['me', 'mim', 'eu'], answer: 'me', explain: '"Me" en "todos me receberam" (todos me recibieron).' },
          { options: ['a', 'ela', 'lhe'], answer: 'a', explain: '"A" para objeto directo femenino: eu a pedi um favor.' },
          { options: ['a', 'ela', 'lhe'], answer: 'a', explain: '"A" para objeto directo: eu a considero minha melhor amiga.' },
          { options: ['a', 'ela', 'lhe'], answer: 'a', explain: '"A" para objeto directo: eu a ligo (la llamo).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el pronombre',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre oblicuo átono correcto según el contexto.',
        type: 'freeText',
        scene: 'Mensajes entre amigos',
        text: 'Oi! Eu [[0]] liguei três vezes mas você não atendeu. A Ana também [[1]] procurou. Nós [[2]] esperamos na cafeteria por meia hora. Você pode [[3]] ligar quando ler isso? Precisamos [[4]] encontrar antes das seis.',
        blanks: [
          { answer: 'te', explain: '"Te" para objeto de 2ª persona: eu te liguei (yo te llamé).' },
          { answer: 'te', explain: '"Te" para objeto de 2ª persona: a Ana te procurou.' },
          { answer: 'te', explain: '"Te" para objeto de 2ª persona: nós te esperamos.' },
          { answer: 'me', explain: '"Me" para objeto de 1ª persona: você pode me ligar.' },
          { answer: 'te', explain: '"Te" para objeto de 2ª persona: precisamos te encontrar.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reformula con pronombre oblicuo',
        tag: 'Escritura guiada',
        intro: 'Reescribe la oración reemplazando el objeto con el pronombre oblicuo correcto.',
        type: 'write',
        items: [
          {
            scene: 'El amigo',
            prompt: 'Reemplaza el objeto: "Eu vi o Carlos ontem." → Eu ___ vi ontem.',
            answer: 'Eu o vi ontem.',
            accepted: ['eu o vi ontem', 'eu vi ele ontem'],
            explain: '"O Carlos" → "o" (objeto directo masculino de 3ª persona).',
          },
          {
            scene: 'La llamada',
            prompt: 'Reemplaza el objeto: "Ela chamou a mim para jantar." → Ela ___ chamou para jantar.',
            answer: 'Ela me chamou para jantar.',
            accepted: ['ela me chamou para jantar'],
            explain: '"A mim" → "me" (objeto de 1ª persona singular).',
          },
          {
            scene: 'Los estudiantes',
            prompt: 'Reemplaza el objeto: "A professora ajudou nós." → A professora ___ ajudou.',
            answer: 'A professora nos ajudou.',
            accepted: ['a professora nos ajudou'],
            explain: '"Nós" como objeto → "nos" (pronombre oblicuo de 1ª plural).',
          },
          {
            scene: 'Negación',
            prompt: 'Pon en negación con pronombre: "Eu te conheço." → Eu não ___ conheço.',
            answer: 'Eu não te conheço.',
            accepted: ['eu não te conheço'],
            explain: 'En negación: não + verbo + pronombre. "Te" permanece igual.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Usa pronombres oblicuos libremente',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando pronombres oblicuos átonos en contextos reales.',
        type: 'write',
        items: [
          {
            scene: 'Tu mejor amigo/a',
            prompt: 'Escribe dos oraciones sobre tu mejor amigo/a usando pronombres oblicuos (me, te, o/a, nos).',
            answer: 'Ele me liga todos os dias. Eu o conheço há dez anos.',
            accepted: ['me', 'te', 'nos', 'o', 'a', 'os', 'as'],
            explain: 'Usa pronombres como: me liga, me ajuda, o/a conheço, nos vemos.',
          },
          {
            scene: 'Una negación',
            prompt: 'Escribe una oración negativa con un pronombre oblicuo (não me, não te, não o/a, não nos).',
            answer: 'Eu não te entendi na reunião.',
            accepted: ['não me', 'não te', 'não o', 'não a', 'não nos', 'não os', 'não as'],
            explain: 'Estrutura negativa: não + verbo + pronombre. Ejemplo: não me viu, não te chamou.',
          },
          {
            scene: 'La familia',
            prompt: 'Escribe una oración sobre cómo tu familia te apoya (usa me o nos).',
            answer: 'Minha família me apoia em tudo.',
            accepted: ['me', 'nos', 'me apoia', 'nos ajuda', 'me ajuda', 'nos visita'],
            explain: 'Usa: me apoia, me ajuda, me vê, nos visita, nos liga, nos ama.',
          },
        ],
      },
    ],
  },
}

export default topic
