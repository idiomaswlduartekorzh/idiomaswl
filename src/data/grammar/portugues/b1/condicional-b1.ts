import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'condicional-b1',
  order: '03',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Condicional en Portugués B1',
  shortTitle: 'Condicional',
  metaTitle: 'Condicional Portugués B1 — Condicional Simple Portugués',
  description:
    'El condicional simple en portugués (condicional ou futuro do pretérito) se forma añadiendo las terminaciones -ia, -ias, -ia, -íamos, -íeis, -iam al infinitivo. Es idéntico en estructura al condicional español (-ía, -ías...) y tiene los mismos usos: hipótesis, cortesía y futuro en el pasado. Los pocos verbos irregulares son los mismos que en español (dizer, fazer, trazer).',
  lead: 'El condicional portugués: formación, usos en hipótesis y cortesía, verbos irregulares y contraste con el imperfeito do indicativo coloquial.',
  outcomes: [
    'Forma el condicional de verbos regulares añadiendo -ia al infinitivo',
    'Usa el condicional en frases hipotéticas con "se + imperfeito conjuntivo"',
    'Expresa peticiones y sugerencias corteses con el condicional',
    'Reconoce los tres verbos irregulares: dizer, fazer, trazer',
  ],

  guide: {
    goal: 'Usar el condicional para expresar hipótesis, cortesía y futuro en el pasado en portugués.',
    model: 'Gostaria de reservar uma mesa. / Se tivesse tempo, viajaria pelo mundo.',
    formula: 'Infinitivo + -ia / -ias / -ia / -íamos / -íeis / -iam',
    decisions: [
      'Terminaciones iguales para todas las conjugaciones (-ar, -er, -ir): falar-ia, comer-ia, partir-ia',
      'Hipótesis irreal: se + imperfeito conjuntivo → condicional: "Se eu fosse rico, compraria uma villa."',
      'Cortesía: "Poderia ajudar-me?" / "Gostaria de pedir a conta." — más formal que el presente',
      'Futuro en el pasado: "Ele disse que viria amanhã." (Dijo que vendría mañana)',
      'Irregulares con raíz modificada: dizer → dir-ia, fazer → far-ia, trazer → trar-ia',
      'En portugués europeo coloquial el imperfeito do indicativo puede reemplazar el condicional: "Se tivesse dinheiro, ia/comprava" en vez de "iria/compraria"',
    ],
    table: [
      ['Persona', 'Terminación', 'falar / dizer'],
      ['eu', '-ia', 'falaria / diria'],
      ['tu', '-ias', 'falarias / dirias'],
      ['ele/ela/você', '-ia', 'falaria / diria'],
      ['nós', '-íamos', 'falaríamos / diríamos'],
      ['vós', '-íeis', 'falaríeis / diríeis'],
      ['eles/elas', '-iam', 'falariam / diriam'],
    ],
    mistakes: [
      '"Eu fariia" ❌ → "Eu faria" ✓ — "fazer" irregular: raíz far- + -ia. Solo una "i".',
      '"Eles gostariam de que venhas" ❌ → "Eles gostariam de que viesses" ✓ — después del condicional en la principal, la subordinada lleva imperfeito do conjuntivo.',
      '"Se eu teria dinheiro" ❌ → "Se eu tivesse dinheiro" ✓ — en la cláusula condicional con "se" irreal nunca va el condicional sino el imperfeito do conjuntivo.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el condicional en portugués?',
      paragraphs: [
        'El condicional portugués (también llamado "futuro do pretérito") es muy fácil para hispanohablantes porque funciona exactamente igual que en español. Se forma añadiendo las terminaciones -ia, -ias, -ia, -íamos, -íeis, -iam al infinitivo completo del verbo. No hay que eliminar nada del infinitivo (a diferencia del futuro de indicativo en español).',
        'Ejemplo: falar → falaria, falarias, falaria, falaríamos, falaríeis, falariam. Comer → comeria, comerias, comeria, comeríamos, comeríeis, comeriam. Partir → partiria, partirias, partiria, partiríamos, partiríeis, partiriam.',
      ],
    },
    {
      heading: 'Los tres verbos irregulares del condicional',
      paragraphs: [
        'Solo tres verbos tienen raíz irregular en el condicional, y son los mismos que en español (haría/haré → har-). En portugués: dizer → diria (decir), fazer → faria (hacer), trazer → traria (traer). Estos verbos pierden las últimas sílabas del infinitivo.',
        'Hay un cuarto verbo que merece atención: "poder" en el condicional es "poderia" (regular), y "querer" es "quereria" (también regular). No son irregulares como en español (podría, querría).',
      ],
      table: [
        ['Verbo', 'Raíz condicional', 'Eu / Eles'],
        ['dizer', 'dir-', 'diria / diriam'],
        ['fazer', 'far-', 'faria / fariam'],
        ['trazer', 'trar-', 'traria / trariam'],
        ['poder', 'poder- (regular)', 'poderia / poderiam'],
        ['querer', 'querer- (regular)', 'quereria / quereriam'],
      ],
    },
    {
      heading: 'Usos del condicional en portugués',
      paragraphs: [
        'Hipótesis irreal: en combinación con "se + imperfeito do conjuntivo". "Se eu tivesse mais tempo, aprenderia piano." (Si tuviera más tiempo, aprendería piano). Esta es la estructura condicional más importante en B1.',
        'Cortesía: para peticiones y sugerencias educadas. "Poderia falar mais devagar?" (¿Podría hablar más despacio?). "Gostaria de reservar uma mesa para dois." (Me gustaría reservar una mesa para dos). "Queria pedir a conta, por favor." En este último caso, el imperfeito ("queria") suena más natural que el condicional en portugués europeo.',
        'Futuro en el pasado (estilo indirecto): "Ela disse que chegaria às dez." (Ella dijo que llegaría a las diez). "Pensava que irias vir." (Pensaba que ibas a venir).',
      ],
    },
    {
      heading: 'Condicional vs imperfeito do indicativo en portugués europeo',
      paragraphs: [
        'Una particularidad del portugués europeo es que en el habla coloquial el imperfeito do indicativo ("ia", "comprava", "comia") reemplaza con frecuencia al condicional. En español no existe este fenómeno.',
        '"Se eu fosse rico, comprava uma casa" es equivalente coloquial de "Se eu fosse rico, compraria uma casa." Ambas son correctas en portugués europeo, aunque la segunda es más formal. En el examen CIPLE y en la escritura formal, usa siempre el condicional.',
      ],
    },
    {
      heading: 'El condicional en el discurso indirecto',
      paragraphs: [
        'Cuando transformamos estilo directo en indirecto, el futuro de indicativo se convierte en condicional: "Vou chegar às dez." → Ela disse que chegaria às dez. "Vou estudar amanhã." → Ele prometeu que estudaria.',
        'Este uso es equivalente al español y no presenta dificultades especiales para hispanohablantes. La clave es recordar que el condicional es el "futuro del pasado": se usa para referir lo que alguien predijo o prometió en el pasado.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Condicional portugués: formación regular + 3 irregulares + usos en hipótesis y cortesía.',
    graphicPrompt: 'Dos burbujas: la realidad y el mundo hipotético conectadas por una condición irreal.',
    scene: [
      ['Se tivesse dinheiro, compraria um apartamento em Lisboa.', 'Si tuviera dinero, compraría un apartamento en Lisboa.'],
      ['Poderia trazer-me um copo de água, por favor?', '¿Podría traerme un vaso de agua, por favor?'],
      ['Gostaria de reservar um quarto para esta noite.', 'Me gustaría reservar una habitación para esta noche.'],
      ['Ela disse que viria mais tarde.', 'Ella dijo que vendría más tarde.'],
      ['O que farias se ganhasses a lotaria?', '¿Qué harías si ganaras la lotería?'],
      ['Você não poderia falar um pouco mais devagar?', '¿No podría hablar un poco más despacio?'],
      ['Nós diríamos a verdade se soubéssemos.', 'Diríamos la verdad si la supiéramos.'],
      ['Eles gostariam de participar no projeto.', 'Les gustaría participar en el proyecto.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['gostar', 'poder', 'fazer', 'dizer', 'trazer', 'querer', 'vir', 'comprar', 'ter'],
    reviewFocus: ['infinitivo + -ia', 'irregulares: diria/faria/traria', 'se + imperfeito conjuntivo → condicional'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el condicional correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del condicional para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Petición en restaurante',
            lines: [['', '___ trazer-me a ementa, por favor?']],
            options: ['Poderia', 'Pode', 'Poderá', 'Possa'],
            answer: 'Poderia',
            explain: '"Poder" condicional regular: poderia. Forma de cortesía más formal que el presente "pode".',
          },
          {
            scene: 'Hipótesis irreal',
            lines: [['', 'Se ganhasse a lotaria, ___ uma ilha.']],
            options: ['compraria', 'comprava', 'comprou', 'compre'],
            answer: 'compraria',
            explain: '"Comprar" condicional: compraria. En la estructura hipotética "se + imperfeito conjuntivo, + condicional".',
          },
          {
            scene: 'Verbo irregular: fazer',
            lines: [['', 'O que ___ tu no meu lugar?']],
            options: ['farias', 'fazias', 'farás', 'faças'],
            answer: 'farias',
            explain: '"Fazer" condicional irregular: raíz far- → faria, farias, faria... Recuerda: far- no fazer-.',
          },
          {
            scene: 'Futuro en el pasado',
            lines: [['', 'Ela prometeu que ___ à nossa festa.']],
            options: ['viria', 'vinha', 'virá', 'venha'],
            answer: 'viria',
            explain: '"Vir" condicional: viria. Futuro en el pasado: "prometeu que + condicional". Regular en condicional: vir + -ia = viria.',
          },
          {
            scene: 'Verbo irregular: dizer',
            lines: [['', 'Eu nunca ___ isso se não fosse verdade.']],
            options: ['diria', 'dizia', 'dirá', 'diga'],
            answer: 'diria',
            explain: '"Dizer" condicional irregular: raíz dir- → diria. Uno de los tres irregulares clave.',
          },
          {
            scene: 'Sugerencia cortés',
            lines: [['', '___ aconselhar-te a estudar mais cedo.']],
            options: ['Aconselharia', 'Aconselhava', 'Aconselhará', 'Aconselhe'],
            answer: 'Aconselharia',
            explain: '"Aconselhar" condicional regular: aconselhar + -ia = aconselharia. Usado para sugerencias y consejos.',
          },
          {
            scene: 'Verbo irregular: trazer',
            lines: [['', 'Se pudesse, ___ flores para toda a gente.']],
            options: ['traria', 'trazeria', 'trará', 'traga'],
            answer: 'traria',
            explain: '"Trazer" condicional irregular: raíz trar- → traria. No "trazeria" — eso sería el error típico.',
          },
          {
            scene: 'Preferencia hipotética',
            lines: [['', 'Nós preferia___ ficar em casa esta noite.']],
            options: ['preferiríamos', 'preferíamos', 'preferimos', 'preferimos'],
            answer: 'preferiríamos',
            explain: '"Preferir" condicional: preferir + -íamos = preferiríamos (nós). Acento en la sílaba tónica.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Hipótesis y cortesía',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas del condicional.',
        type: 'dual',
        items: [
          {
            scene: 'Petición en hotel',
            lines: [['', '[[0]] ter um quarto com vista para o mar? [[1]] disposto a pagar mais.']],
            blanks: [
              { options: ['Poderia', 'Pode', 'Poderá', 'Possa'], answer: 'Poderia', explain: '"Poder" condicional: poderia. Petición cortés.' },
              { options: ['Estaria', 'Estou', 'Estará', 'Esteja'], answer: 'Estaria', explain: '"Estar" condicional regular: estar + -ia = estaria.' },
            ],
          },
          {
            scene: 'Hipótesis con dos verbos',
            lines: [['', 'Se ele trabalhasse menos, [[0]] mais tempo para a família e [[1]] mais feliz.']],
            blanks: [
              { options: ['teria', 'tinha', 'terá', 'tenha'], answer: 'teria', explain: '"Ter" condicional regular: ter + -ia = teria.' },
              { options: ['seria', 'era', 'será', 'seja'], answer: 'seria', explain: '"Ser" condicional regular: ser + -ia = seria.' },
            ],
          },
          {
            scene: 'Estilo indirecto',
            lines: [['', 'O chefe disse que [[0]] os resultados e que [[1]] uma decisão na sexta-feira.']],
            blanks: [
              { options: ['analisaria', 'analisava', 'analisará', 'analise'], answer: 'analisaria', explain: '"Analisar" condicional: analisar + -ia = analisaria. Futuro en el pasado con "disse que".' },
              { options: ['tomaria', 'tomava', 'tomará', 'tome'], answer: 'tomaria', explain: '"Tomar" condicional: tomar + -ia = tomaria. Segundo elemento del estilo indirecto.' },
            ],
          },
          {
            scene: 'Consejo hipotético',
            lines: [['', 'No teu lugar, eu não [[0]] isso e [[1]] noutra estratégia.']],
            blanks: [
              { options: ['faria', 'fazia', 'fará', 'faça'], answer: 'faria', explain: '"Fazer" condicional irregular: far- + -ia = faria. En "no teu lugar" se usa el condicional.' },
              { options: ['pensaria', 'pensava', 'pensará', 'pense'], answer: 'pensaria', explain: '"Pensar" condicional: pensar + -ia = pensaria.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una vida diferente',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del condicional para este texto hipotético.',
        type: 'guidedText',
        scene: 'Elige la forma correcta del condicional.',
        text: 'Se eu pudesse recomeçar a minha vida, [[0]] escolhas muito diferentes. Primeiro, [[1]] mais cedo a tocar um instrumento musical. [[2]] também muito tempo a viajar pela Ásia. No trabalho, nunca [[3]] numa empresa grande — [[4]] o meu próprio negócio. Ao meu filho [[5]] sempre: "Faz o que te faz feliz." E [[6]] toda a gente que amava.',
        blanks: [
          { options: ['faria', 'fazia', 'fará', 'faço'], answer: 'faria', explain: '"Fazer" condicional irregular: far- + -ia = faria (eu).' },
          { options: ['aprenderia', 'aprendia', 'aprenderá', 'aprenda'], answer: 'aprenderia', explain: '"Aprender" condicional: aprender + -ia = aprenderia.' },
          { options: ['Passaria', 'Passava', 'Passarei', 'Passe'], answer: 'Passaria', explain: '"Passar" condicional: passar + -ia = passaria.' },
          { options: ['trabalharia', 'trabalhava', 'trabalhará', 'trabalhe'], answer: 'trabalharia', explain: '"Trabalhar" condicional: trabalhar + -ia = trabalharia.' },
          { options: ['criaria', 'criava', 'criará', 'crie'], answer: 'criaria', explain: '"Criar" condicional: criar + -ia = criaria.' },
          { options: ['diria', 'dizia', 'dirá', 'diga'], answer: 'diria', explain: '"Dizer" condicional irregular: dir- + -ia = diria (eu).' },
          { options: ['abraçaria', 'abraçava', 'abraçará', 'abrace'], answer: 'abraçaria', explain: '"Abraçar" condicional: abraçar + -ia = abraçaria.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del condicional para cada verbo.',
        type: 'freeText',
        scene: 'Escribe la forma correcta del condicional.',
        text: 'Se eu fosse presidente, [[0]] (fazer) grandes mudanças. Primeiro, [[1]] (investir) muito mais em educação. [[2]] (dizer) sempre a verdade ao povo. Nunca [[3]] (trair) a confiança dos cidadãos. Com certeza, [[4]] (ser) um presidente diferente.',
        blanks: [
          { answer: 'faria', accepted: ['faria'], explain: '"Fazer" condicional irregular: raíz far- + -ia = faria.' },
          { answer: 'investiria', accepted: ['investiria'], explain: '"Investir" condicional: investir + -ia = investiria.' },
          { answer: 'diria', accepted: ['diria'], explain: '"Dizer" condicional irregular: raíz dir- + -ia = diria.' },
          { answer: 'trairia', accepted: ['trairia'], explain: '"Trair" condicional: trair + -ia = trairia. Regular.' },
          { answer: 'seria', accepted: ['seria'], explain: '"Ser" condicional: ser + -ia = seria.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produce oraciones condicionales',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el condicional según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Tu hipótesis personal',
            prompt: 'Escribe lo que harías si pudieras tener el trabajo soñado (usa "se pudesse... faria/seria...").',
            answer: 'Se pudesse, seria jornalista de viagens e escreveria sobre culturas do mundo.',
            accepted: ['faria', 'seria', 'gostaria', 'queria', 'trabalharia'],
            explain: 'Estructura: Se + imperfeito conjuntivo, + condicional. Ejemplo: Se pudesse, trabalharia em Paris.',
          },
          {
            scene: 'Petición formal',
            prompt: 'Haz una petición formal en un hotel o restaurante usando el condicional.',
            answer: 'Gostaria de reservar uma mesa para quatro pessoas para as oito da noite.',
            accepted: ['gostaria', 'poderia', 'queria', 'desejaria'],
            explain: 'El condicional "gostaria/poderia" es la forma más cortés. También es correcto el imperfeito "queria".',
          },
          {
            scene: 'Estilo indirecto',
            prompt: 'Transforma esta frase al estilo indirecto: João disse: "Vou trazer o relatório amanhã."',
            answer: 'O João disse que traria o relatório no dia seguinte.',
            accepted: ['traria', 'que traria'],
            explain: '"Trazer" condicional irregular: raíz trar- + -ia = traria. Futuro → condicional en estilo indirecto.',
          },
          {
            scene: 'Consejo',
            prompt: 'Da un consejo usando "No teu lugar, eu..." con el condicional.',
            answer: 'No teu lugar, eu não faria isso — falaria com ela diretamente.',
            accepted: ['faria', 'diria', 'tentaria', 'pensaria', 'esperaria'],
            explain: '"No teu lugar" + condicional es una estructura natural para dar consejos en portugués.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu mundo ideal',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tu mundo ideal usando el condicional.',
        type: 'write',
        items: [
          {
            scene: 'Tu vida ideal',
            prompt: 'Describe cómo sería tu vida ideal (usa 2 verbos en condicional).',
            answer: 'Na minha vida ideal, viveria perto do mar e trabalharia apenas quatro dias por semana.',
            accepted: ['viveria', 'trabalharia', 'seria', 'teria', 'faria', 'estudaria'],
            explain: 'El condicional expresa situaciones hipotéticas deseadas. Uso directo sin "se" también es posible.',
          },
          {
            scene: 'Tu petición cortés',
            prompt: 'Escribe una petición cortés a un médico o profesional usando "Poderia..." o "Gostaria de...".',
            answer: 'Poderia explicar-me os resultados dos exames com mais detalhe?',
            accepted: ['poderia', 'gostaria', 'queria', 'desejaria'],
            explain: 'El condicional es esencial para la cortesía formal en portugués. Muito mais educado que el presente.',
          },
          {
            scene: 'Consejo a un amigo',
            prompt: 'Da un consejo a un amigo que tiene un problema usando "Eu no teu lugar..." o "Se eu fosse tu...".',
            answer: 'Se eu fosse tu, falaria com o teu chefe sobre o problema diretamente.',
            accepted: ['faria', 'diria', 'falaria', 'tentaria', 'procuraria', 'pensaria'],
            explain: '"Se eu fosse tu" + condicional es la estructura de consejo más natural en portugués europeo.',
          },
        ],
      },
    ],
  },
}

export default topic
