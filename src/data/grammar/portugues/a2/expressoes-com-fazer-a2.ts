import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'expressoes-com-fazer-a2',
  order: '20',
  color: '#166534',
  category: 'Vocabulario',
  level: 'A2',
  title: 'Expressões com fazer en portugués A2: fazer falta, fazer sentido, fazer bem',
  shortTitle: 'Expressões com fazer',
  metaTitle: 'Expresiones con fazer en portugués A2 — fazer falta, fazer sentido, fazer bem, fazer parte',
  description:
    'El verbo "fazer" (hacer) aparece en decenas de expresiones fijas del portugués brasileño que no se pueden traducir palabra por palabra. "Fazer falta" (hacer falta/echar de menos), "fazer sentido" (tener sentido), "fazer bem" (hacer bien), "fazer parte" (formar parte). Estas expresiones son esenciales para sonar natural en portugués.',
  lead: 'Você me faz falta: las expresiones con fazer que harán tu português sonar natural.',
  outcomes: [
    'Usar "fazer falta" para expresar que algo o alguien hace falta',
    'Usar "fazer sentido", "fazer parte" y "fazer bem/mal" correctamente',
    'Reconocer las expresiones de tiempo con fazer (faz tempo, faz calor)',
    'Distinguir las expresiones idiomáticas de la traducción literal',
  ],

  guide: {
    goal: 'Dominar las expresiones fijas más frecuentes con o verbo "fazer" en el portugués cotidiano.',
    model: 'Você me faz falta. / Isso não faz sentido. / Fazer exercício faz bem para a saúde.',
    formula: 'fazer + [substantivo/adjetivo] = expresión idiomática con significado fijo',
    decisions: [
      '"fazer falta": ser necesario o echar de menos → "Você me faz falta" (te echo de menos)',
      '"fazer sentido": tener sentido → "Isso faz sentido" / "Isso não faz sentido"',
      '"fazer bem/mal": ser bueno/malo para la salud o el bienestar → "Fumar faz mal" / "Dormir bem faz bem"',
      '"fazer parte (de)": formar parte de → "Você faz parte da equipe"',
      '"faz calor/frio": hacer calor/frío (expresión impersonal de clima) → "Hoje faz muito calor"',
      '"fazer compras": hacer compras/ir de compras → "Vou fazer compras no mercado"',
      '"fazer uma pergunta": hacer una pregunta → "Posso fazer uma pergunta?"',
    ],
    table: [
      ['Expressão', 'Significado', 'Exemplo'],
      ['fazer falta', 'echar de menos / ser necesario', 'Você me faz muita falta.'],
      ['fazer sentido', 'tener sentido', 'Essa explicação faz sentido.'],
      ['fazer bem/mal', 'ser bueno/malo', 'Ler faz bem para a mente.'],
    ],
    mistakes: [
      '"Você me falta" (traducción del español) — en portugués se dice "Você me faz falta" (con fazer).',
      '"Isso tem sentido" ❌ (calco del español) → "Isso faz sentido" ✓ — en portugués usa "fazer".',
      '"Fazer calor" es siempre impersonal: "Faz calor" (jamás "Eu faço calor").',
    ],
  },

  seo: [
    {
      heading: 'Las expresiones con fazer: mucho más que "hacer"',
      paragraphs: [
        'El verbo "fazer" en portugués va mucho más allá del significado de "hacer". En decenas de expresiones fijas cambia completamente de sentido. "Fazer falta" no es "hacer falta" en sentido literal, sino "echar de menos a alguien": "Você me faz falta" = "te echo de menos". "Fazer sentido" equivale al español "tener sentido", no "hacer sentido".',
        'Muchos brasileños que aprenden español cometen el error inverso: dicen "tengo calor" cuando en portugués dirían "faz calor" (expresión impersonal). Estas diferencias entre las dos lenguas hacen que las expresiones con fazer sean especialmente importantes de aprender explícitamente.',
      ],
    },
    {
      heading: 'Fazer falta vs. faltar: la confusión más frecuente',
      paragraphs: [
        '"Fazer falta" significa echar de menos a alguien o algo, o que algo sea necesario. "Sinto que você me faz falta" (siento que te echo de menos). No confundir con "faltar" (faltar): "Faltam três dias para o fim de semana" (faltan tres días para el fin de semana).',
        'Otras expresiones esenciales: "fazer questão de" (insistir en, dar importancia a): "Faço questão de agradecer pessoalmente"; "fazer uma viagem" (hacer un viaje); "fazer silêncio" (guardar silencio); "fazer sucesso" (tener éxito).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Expressões com fazer: idiomas fijos que hay que aprender como unidades.',
    graphicPrompt: 'Persona expresando diferentes sentimientos con "fazer": falta, sentido, bem, parte.',
    scene: [
      ['Você me faz muita falta!', '¡Te echo mucho de menos!'],
      ['Isso não faz sentido nenhum.', 'Esto no tiene ningún sentido.'],
      ['Fazer exercício faz bem para a saúde.', 'Hacer ejercicio es bueno para la salud.'],
      ['Você faz parte da nossa família.', 'Formas parte de nuestra familia.'],
      ['Hoje faz muito calor, né?', 'Hoy hace mucho calor, ¿verdad?'],
      ['Posso fazer uma pergunta?', '¿Puedo hacer una pregunta?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['fazer falta', 'fazer sentido', 'fazer bem/mal', 'fazer parte'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Expresión con fazer correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la expresión con fazer correcta para cada contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Echas de menos a tu mejor amigo.',
            lines: [['', 'Meu melhor amigo me ___ muito.']],
            options: ['faz falta', 'faz sentido', 'faz bem', 'faz parte'],
            answer: 'faz falta',
            explain: '"fazer falta" = echar de menos a alguien o que algo sea necesario.',
          },
          {
            scene: 'La explicación del profesor tiene sentido.',
            lines: [['', 'A explicação do professor ___.']],
            options: ['faz sentido', 'faz falta', 'faz mal', 'faz parte'],
            answer: 'faz sentido',
            explain: '"fazer sentido" = tener sentido.',
          },
          {
            scene: 'Fumar es malo para la salud.',
            lines: [['', 'Fumar ___ para a saúde.']],
            options: ['faz mal', 'faz bem', 'faz falta', 'faz sentido'],
            answer: 'faz mal',
            explain: '"fazer mal" = ser perjudicial/malo para la salud.',
          },
          {
            scene: 'Tú eres parte de nuestro equipo.',
            lines: [['', 'Você ___ da nossa equipe.']],
            options: ['faz parte', 'faz falta', 'faz sentido', 'faz mal'],
            answer: 'faz parte',
            explain: '"fazer parte de" = formar parte de.',
          },
          {
            scene: 'Hoy hace mucho frío.',
            lines: [['', 'Hoje ___ muito frio.']],
            options: ['faz', 'está', 'tem', 'é'],
            answer: 'faz',
            explain: '"fazer frio/calor" = hacer frío/calor (impersonal, siempre 3ª persona).',
          },
          {
            scene: 'Leer hace bien para el cerebro.',
            lines: [['', 'Ler ___ para o cérebro.']],
            options: ['faz bem', 'faz mal', 'faz falta', 'faz sentido'],
            answer: 'faz bem',
            explain: '"fazer bem" = ser bueno/beneficioso para algo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dois contextos com fazer',
        tag: '2 espacios',
        intro: 'Completa con la expresión de fazer correcta en cada espacio.',
        type: 'dual',
        items: [
          {
            scene: 'Una cosa que tiene sentido y una persona que echas de menos.',
            lines: [['', 'Essa decisão [[0]]. Mas você [[1]] aqui.']],
            blanks: [
              { options: ['faz sentido', 'faz falta', 'faz bem', 'faz parte'], answer: 'faz sentido', explain: '"fazer sentido" = tener sentido (la decisión es lógica).' },
              { options: ['faz falta', 'faz sentido', 'faz bem', 'faz mal'], answer: 'faz falta', explain: '"você faz falta aqui" = te echamos de menos aquí.' },
            ],
          },
          {
            scene: 'El café es bueno y el azúcar es malo.',
            lines: [['', 'O café [[0]] para a concentração, mas o açúcar em excesso [[1]].']],
            blanks: [
              { options: ['faz bem', 'faz mal', 'faz falta', 'faz sentido'], answer: 'faz bem', explain: '"fazer bem" = ser beneficioso.' },
              { options: ['faz mal', 'faz bem', 'faz falta', 'faz sentido'], answer: 'faz mal', explain: '"fazer mal" = ser perjudicial.' },
            ],
          },
          {
            scene: 'El proyecto forma parte del plan y tiene sentido.',
            lines: [['', 'Este projeto [[0]] do plano geral e [[1]] incluí-lo.']],
            blanks: [
              { options: ['faz parte', 'faz falta', 'faz bem', 'faz sentido'], answer: 'faz parte', explain: '"fazer parte de" = formar parte de.' },
              { options: ['faz sentido', 'faz falta', 'faz bem', 'faz mal'], answer: 'faz sentido', explain: '"faz sentido incluí-lo" = tiene sentido incluirlo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Email sobre um amigo',
        tag: 'Texto guiado',
        intro: 'Completa el email eligiendo la expresión con fazer correcta.',
        type: 'guidedText',
        scene: 'Ana escreve para seu amigo Carlos que está morando em outro país.',
        text: 'Oi Carlos! Você nos [[0]] muito por aqui. Essa decisão de mudar para o exterior [[1]], mas ainda assim sentimos sua falta. Comer bem [[2]] para a saúde, então cuide-se! Você ainda [[3]] da nossa vida, mesmo à distância. [[4]] muito frio aí?',
        blanks: [
          { options: ['faz falta', 'faz sentido', 'faz bem', 'faz parte'], answer: 'faz falta', explain: '"você nos faz falta" = te echamos de menos.' },
          { options: ['faz sentido', 'faz falta', 'faz mal', 'faz parte'], answer: 'faz sentido', explain: '"essa decisão faz sentido" = esa decisión tiene sentido.' },
          { options: ['faz bem', 'faz mal', 'faz falta', 'faz sentido'], answer: 'faz bem', explain: '"comer bem faz bem" = comer bien es bueno para la salud.' },
          { options: ['faz parte', 'faz falta', 'faz bem', 'faz sentido'], answer: 'faz parte', explain: '"você faz parte da nossa vida" = formas parte de nuestra vida.' },
          { options: ['Faz', 'Está', 'Tem', 'É'], answer: 'Faz', explain: '"Faz muito frio" = hace mucho frío (impersonal).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con a expressão certa',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la expresión correcta con fazer.',
        type: 'freeText',
        scene: 'Completando frases com expressões de fazer.',
        text: 'O exercício [[0]] para a saúde mental. / Essa explicação não [[1]]. / Minha família me [[2]] quando estou viajando. / O Brasil [[3]] da América do Sul. / Hoje [[4]] muito calor nesta cidade.',
        blanks: [
          { answer: 'faz bem', explain: '"fazer bem" = ser bueno para la salud.' },
          { answer: 'faz sentido', explain: '"fazer sentido" = tener sentido.' },
          { answer: 'faz falta', explain: '"fazer falta" = echar de menos.' },
          { answer: 'faz parte', explain: '"fazer parte de" = formar parte de.' },
          { answer: 'faz', explain: '"faz calor" = hace calor (impersonal).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Usa as expressões em contexto',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con la expresión de fazer indicada.',
        type: 'write',
        items: [
          {
            scene: 'Tu amigo se ha ido y lo echas de menos.',
            prompt: 'Escreva usando "fazer falta".',
            answer: 'Você me faz muita falta desde que foi embora.',
            accepted: ['Meu amigo me faz falta.'],
            explain: '"fazer falta" = echar de menos a alguien.',
          },
          {
            scene: 'Esta idea no tiene sentido.',
            prompt: 'Escreva usando "não fazer sentido".',
            answer: 'Essa ideia não faz sentido nenhum.',
            accepted: ['Isso não faz sentido para mim.'],
            explain: '"não fazer sentido" = no tener sentido.',
          },
          {
            scene: 'Dormir bien es bueno para el rendimiento.',
            prompt: 'Escreva usando "fazer bem".',
            answer: 'Dormir bem faz bem para o desempenho e a concentração.',
            accepted: ['Descansar faz bem para o corpo.'],
            explain: '"fazer bem" = ser beneficioso para algo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escreve com expressões de fazer',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias con las expresiones de fazer.',
        type: 'write',
        items: [
          {
            scene: 'Describe tres cosas que son buenas o malas para la salud o el bienestar.',
            prompt: 'Escreva três frases usando "fazer bem" e "fazer mal".',
            answer: 'Comer frutas faz bem. Fumar faz muito mal. Dormir pouco também faz mal à saúde.',
            accepted: ['Fazer esporte faz bem ao corpo. Estresse faz mal. Meditar faz bem para a mente.'],
            explain: '"fazer bem/mal" para evaluar hábitos y su impacto en la salud.',
          },
          {
            scene: 'Describe algo que echas de menos y algo que forma parte de tu vida.',
            prompt: 'Escreva usando "fazer falta" e "fazer parte".',
            answer: 'A comida da minha mãe me faz muita falta. A música faz parte da minha vida.',
            accepted: ['Meus amigos fazem falta quando viajo. Estudar idiomas faz parte da minha rotina.'],
            explain: '"fazer falta" = echar de menos; "fazer parte" = formar parte.',
          },
        ],
      },
    ],
  },
}

export default topic
