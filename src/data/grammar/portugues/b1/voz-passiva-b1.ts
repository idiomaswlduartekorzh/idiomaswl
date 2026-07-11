import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'voz-passiva-b1',
  order: '05',
  color: '#166534',
  category: 'Estrutura',
  level: 'B1',
  title: 'Voz Passiva en Portugués B1',
  shortTitle: 'Voz Passiva',
  metaTitle: 'Voz Passiva Portugués B1 — Pasiva con Ser y Passiva Reflexiva',
  description:
    'La voz pasiva en portugués se forma con el verbo "ser" + participio pasado + "por" (agente). El participio concuerda en género y número con el sujeto pasivo. El portugués también usa mucho la pasiva reflexiva con "se" (pasiva pronominal), que es la forma más frecuente en el habla cotidiana. Los hispanos deben tener cuidado con la concordancia del participio.',
  lead: 'Aprende las dos formas de voz pasiva en portugués: con "ser + participio" y con "se" pronominal. Concordancia del participio y uso del agente.',
  outcomes: [
    'Forma la voz pasiva con ser + participio + por (agente)',
    'Aplica la concordancia del participio en género y número con el sujeto',
    'Usa la pasiva reflexiva con "se" para acciones sin agente explícito',
    'Distingue cuándo usar pasiva con "ser" vs pasiva con "se"',
  ],

  guide: {
    goal: 'Construir oraciones en voz pasiva con "ser + participio" y con la pasiva pronominal con "se".',
    model: 'O livro foi escrito pelo autor. / Vendem-se apartamentos. / A carta foi enviada ontem.',
    formula: 'Sujeito paciente + ser (conjugado) + participio (concorda) + por + agente (opcional)',
    decisions: [
      'Agente de la pasiva: introducido por "por" o "por + artículo" (pelo, pela, pelos, pelas)',
      'El participio concuerda en género y número con el sujeto: A carta foi enviada. / Os livros foram escritos.',
      'Tiempo de la pasiva: el verbo "ser" lleva el tiempo; presente → é, pretérito → foi, imperfeito → era, futuro → será',
      'Pasiva pronominal con "se": más usada en portugués cotidiano para acciones sin agente; "Vendem-se casas" = "Se venden casas"',
      'Posición del "se": en Portugal va después del verbo con guion (vendem-se); en Brasil puede ir antes (se vendem)',
      'Cuando no hay agente, la pasiva con "se" es más natural: "Fala-se português aqui." (Se habla portugués aquí.)',
    ],
    table: [
      ['Voz activa', 'Tiempo', 'Voz pasiva'],
      ['O Pedro escreve o relatório.', 'presente', 'O relatório é escrito pelo Pedro.'],
      ['A empresa pagou os salários.', 'pretérito', 'Os salários foram pagos pela empresa.'],
      ['Alguém construiu o edifício.', 'pretérito (sin agente)', 'O edifício foi construído.'],
      ['Vendem apartamentos aqui.', 'pasiva-se', 'Vendem-se apartamentos aqui.'],
    ],
    mistakes: [
      '"A carta foi enviado" ❌ → "A carta foi enviada" ✓ — el participio concuerda con el sujeto: "a carta" es femenino.',
      '"Os problemas foram resolvidos por mim" ❌ en estilo neutro → "Os problemas foram resolvidos" ✓ — el agente se omite si no es informativo.',
      '"Se vendem-se casas" ❌ → "Vendem-se casas" ✓ — la pasiva pronominal usa solo un "se", no duplica.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma la voz pasiva en portugués?',
      paragraphs: [
        'La voz pasiva en portugués funciona igual que en español: verbo "ser" conjugado + participio pasado. El participio en portugués es regular para la mayoría de verbos (-ado, -ido) pero algunos tienen participios irregulares: "escrever" → "escrito", "fazer" → "feito", "abrir" → "aberto", "ver" → "visto", "dizer" → "dito", "pôr" → "posto".',
        'La diferencia principal con el español es la concordancia obligatoria del participio: en portugués el participio siempre concuerda en género y número con el sujeto. "O livro foi escrito" pero "A carta foi escrita" y "As cartas foram escritas".',
      ],
    },
    {
      heading: 'La concordancia del participio: clave del portugués',
      paragraphs: [
        'En español también existe la concordancia en la pasiva, pero en portugués es especialmente importante conocer los participios irregulares que cambian de forma. Algunos verbos tienen dos participios: uno regular (para los tiempos compuestos) y uno irregular (para la voz pasiva y adjetivos).',
        'Verbos con doble participio más importantes: "abrir" → abrido (compuesto) / aberto (pasiva); "escrever" → escrevido (menos usado) / escrito (pasiva); "ganhar" → ganhado/ganho; "pagar" → pagado/pago; "aceitar" → aceitado/aceite. En el portugués europeo culto se prefieren las formas irregulares en la pasiva.',
      ],
      table: [
        ['Verbo', 'Participio regular', 'Participio irregular (pasiva)'],
        ['escrever', 'escrevido', 'escrito'],
        ['abrir', 'abrido', 'aberto'],
        ['fazer', 'fazido', 'feito'],
        ['ver', 'vido', 'visto'],
        ['dizer', 'dizido', 'dito'],
      ],
    },
    {
      heading: 'La pasiva reflexiva con "se": la más frecuente',
      paragraphs: [
        'En el habla cotidiana, el portugués prefiere la pasiva pronominal con "se" cuando no se menciona el agente. "Alugam-se quartos" (Se alquilan habitaciones), "Fala-se espanhol" (Se habla español), "Procuram-se candidatos" (Se buscan candidatos).',
        'En portugués europeo, el pronombre "se" va después del verbo unido con guion cuando es el inicio de frase o después de conjunción, pausa o en frases afirmativas neutras. El verbo concuerda con el sujeto: "Vende-se um apartamento" (singular) vs "Vendem-se apartamentos" (plural).',
      ],
    },
    {
      heading: 'La voz pasiva en diferentes tiempos verbales',
      paragraphs: [
        'La pasiva se puede usar en cualquier tiempo verbal. Solo cambia la conjugación del verbo "ser": presente (é/são), pretérito perfeito (foi/foram), imperfeito (era/eram), futuro (será/serão), condicional (seria/seriam), conjuntivo presente (seja/sejam), conjuntivo imperfeito (fosse/fossem).',
        '"O relatório é feito mensalmente." (presente, habitual). "O museu foi inaugurado em 1904." (pretérito, evento único). "As cartas eram escritas à mão." (imperfeito, habitual en el pasado). "O problema será resolvido brevemente." (futuro, promesa/predicción).',
      ],
    },
    {
      heading: 'Pasiva con "ser" vs "estar" en portugués',
      paragraphs: [
        'Una distinción importante: "ser + participio" expresa la acción pasiva (el proceso o evento). "Estar + participio" expresa el resultado o estado. "A janela foi fechada pelo vento" (la ventana fue cerrada por el viento — acción). "A janela está fechada" (la ventana está cerrada — estado resultante).',
        'Este contraste existe también en español (fue cerrada / está cerrada) y funciona de la misma manera. La elección entre "ser" y "estar" cambia el enfoque: acción vs estado. En contextos donde el agente es importante, siempre usa "ser".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Voz pasiva: ser + participio (concordado) + por, y pasiva pronominal con se.',
    graphicPrompt: 'Flecha inversa: de sujeto paciente al agente, ilustrando la inversión de la voz activa.',
    scene: [
      ['O livro foi escrito pelo autor em 2020.', 'El libro fue escrito por el autor en 2020.'],
      ['As cartas foram enviadas pela secretária.', 'Las cartas fueron enviadas por la secretaria.'],
      ['O museu é visitado por milhares de pessoas.', 'El museo es visitado por miles de personas.'],
      ['Vendem-se apartamentos neste bairro.', 'Se venden apartamentos en este barrio.'],
      ['Fala-se português em muitos países.', 'Se habla portugués en muchos países.'],
      ['O projeto foi aprovado pela diretoria.', 'El proyecto fue aprobado por la dirección.'],
      ['A porta estava aberta quando cheguei.', 'La puerta estaba abierta cuando llegué.'],
      ['Procuram-se candidatos com experiência.', 'Se buscan candidatos con experiencia.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['ser + participio concordado', 'pasiva-se pronominal', 'participios irregulares'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la pasiva correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de la voz pasiva.',
        type: 'choice',
        items: [
          {
            scene: 'Concordancia del participio',
            lines: [['', 'A reunião foi ___ pelo diretor.']],
            options: ['marcada', 'marcado', 'marcados', 'marcadas'],
            answer: 'marcada',
            explain: '"A reunião" es femenino singular → participio "marcada" (femenino singular).',
          },
          {
            scene: 'Participio irregular',
            lines: [['', 'Os documentos foram ___ ontem.']],
            options: ['escritos', 'escrevidos', 'escrita', 'escrito'],
            answer: 'escritos',
            explain: '"Os documentos" es masculino plural → "escritos". Participio irregular de "escrever": escrito/escritos/escrita/escritas.',
          },
          {
            scene: 'Pasiva con se',
            lines: [['', '___ apartamentos neste edifício.']],
            options: ['Alugam-se', 'Se aluga', 'Aluga-se', 'Alugam-me'],
            answer: 'Alugam-se',
            explain: '"Apartamentos" es plural → verbo en plural: "alugam". Pasiva pronominal: alugam-se (al inicio de frase).',
          },
          {
            scene: 'Pasiva en presente',
            lines: [['', 'Este vinho ___ produzido no Alentejo.']],
            options: ['é', 'foi', 'era', 'será'],
            answer: 'é',
            explain: 'Hecho actual y habitual → presente de "ser": é. Pasiva: sujeito + é + participio.',
          },
          {
            scene: 'Participio irregular: fazer',
            lines: [['', 'O trabalho foi ___ com muito cuidado.']],
            options: ['feito', 'fazido', 'fecto', 'fazendo'],
            answer: 'feito',
            explain: '"Fazer" tiene participio irregular: feito. El regular "fazido" no se usa en la pasiva.',
          },
          {
            scene: 'Pasiva en pretérito',
            lines: [['', 'As cartas ___ enviadas ontem de manhã.']],
            options: ['foram', 'são', 'serão', 'eram'],
            answer: 'foram',
            explain: '"Ontem" indica pretérito → "foram" (pretérito perfeito de "ser"). Pasiva: as cartas foram enviadas.',
          },
          {
            scene: 'Pasiva-se singular',
            lines: [['', '___ espanhol nesta escola.']],
            options: ['Ensina-se', 'Ensinam-se', 'Se ensina-se', 'Ensinou-se'],
            answer: 'Ensina-se',
            explain: '"Espanhol" es singular → verbo en singular: "ensina-se". Pasiva pronominal con sujeto singular.',
          },
          {
            scene: 'Ser vs estar',
            lines: [['', 'A janela ___ aberta quando chegámos — alguém tinha entrado.']],
            options: ['estava', 'foi', 'é', 'está'],
            answer: 'estava',
            explain: '"Estava aberta" = estado resultante. "Estar + participio" expresa estado; "ser + participio" expresa la acción.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Transforma a voz pasiva',
        tag: '2 espacios',
        intro: 'Completa la voz pasiva con el verbo ser y el participio correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Voz activa: O Pedro pintou a casa.',
            lines: [['', 'A casa [[0]] [[1]] pelo Pedro.']],
            blanks: [
              { options: ['foi', 'é', 'era', 'será'], answer: 'foi', explain: 'Pretérito perfeito (pintou) → "foi" en la pasiva. O verbo "ser" lleva el tiempo.' },
              { options: ['pintada', 'pintado', 'pintadas', 'pintados'], answer: 'pintada', explain: '"A casa" es femenino singular → participio "pintada".' },
            ],
          },
          {
            scene: 'Voz activa: Os engenheiros construíram as pontes.',
            lines: [['', 'As pontes [[0]] [[1]] pelos engenheiros.']],
            blanks: [
              { options: ['foram', 'são', 'eram', 'serão'], answer: 'foram', explain: 'Pretérito + sujeto plural "as pontes" → "foram".' },
              { options: ['construídas', 'construídos', 'construído', 'construída'], answer: 'construídas', explain: '"As pontes" es femenino plural → "construídas".' },
            ],
          },
          {
            scene: 'Pasiva pronominal en anuncio',
            lines: [['', '[[0]] quartos e [[1]] refeições neste hostel.']],
            blanks: [
              { options: ['Alugam-se', 'Aluga-se', 'Se alugam', 'Alugaram-se'], answer: 'Alugam-se', explain: '"Quartos" es plural → "alugam-se".' },
              { options: ['servem-se', 'serve-se', 'serviu-se', 'serviram-se'], answer: 'servem-se', explain: '"Refeições" es plural → "servem-se".' },
            ],
          },
          {
            scene: 'Voz activa: O governo aprovou a nova lei.',
            lines: [['', 'A nova lei [[0]] [[1]] pelo governo.']],
            blanks: [
              { options: ['foi', 'é', 'era', 'será'], answer: 'foi', explain: 'Pretérito (aprovou) → "foi" en la pasiva.' },
              { options: ['aprovada', 'aprovado', 'aprovadas', 'aprovados'], answer: 'aprovada', explain: '"A nova lei" es femenino singular → "aprovada".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La historia de un museo',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de la voz pasiva para este texto sobre un museo.',
        type: 'guidedText',
        scene: 'Elige la opción correcta de la voz pasiva.',
        text: 'O Museu Nacional [[0]] fundado em 1884 pelo rei D. Luís I. As suas coleções [[1]] reunidas ao longo de mais de um século. A entrada [[2]] gratuita às terças-feiras. Atualmente, [[3]] obras de arte de todo o país. O edifício [[4]] recentemente restaurado. As visitas guiadas [[5]] oferecidas em português e inglês. [[6]] bilhetes online com desconto.',
        blanks: [
          { options: ['foi', 'é', 'era', 'será'], answer: 'foi', explain: 'Pretérito perfeito histórico → "foi".' },
          { options: ['foram', 'são', 'eram', 'serão'], answer: 'foram', explain: '"As coleções" (plural femenino) + pretérito → "foram reunidas".' },
          { options: ['é', 'foi', 'era', 'será'], answer: 'é', explain: 'Política actual y habitual → presente "é".' },
          { options: ['expõem-se', 'expõe-se', 'expuseram-se', 'expor-se'], answer: 'expõem-se', explain: 'Pasiva pronominal, "obras de arte" (plural) → "expõem-se".' },
          { options: ['foi', 'é', 'era', 'será'], answer: 'foi', explain: 'Acción completada recientemente → "foi restaurado".' },
          { options: ['são', 'foram', 'eram', 'serão'], answer: 'são', explain: 'Realidad actual habitual → "são oferecidas".' },
          { options: ['Vendem-se', 'Vende-se', 'Venderam-se', 'Se vendem'], answer: 'Vendem-se', explain: '"Bilhetes" (plural) → "vendem-se".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de la voz pasiva.',
        type: 'freeText',
        scene: 'Escribe la forma correcta de la voz pasiva con ser y el participio.',
        text: 'O novo hospital [[0]] (inaugurar, pretérito, passiva) pelo Presidente da República. As novas instalações [[1]] (equipar, pretérito, passiva) com tecnologia de ponta. Os médicos [[2]] (selecionar, pretérito, passiva) através de um concurso rigoroso. Atualmente, centenas de doentes [[3]] (atender, presente, passiva) todos os dias. As consultas [[4]] (marcar, presente, passiva-se) por telefone ou online.',
        blanks: [
          { answer: 'foi inaugurado', accepted: ['foi inaugurado'], explain: '"O novo hospital" (masc. sing.) + pretérito → foi inaugurado.' },
          { answer: 'foram equipadas', accepted: ['foram equipadas'], explain: '"As novas instalações" (fem. pl.) + pretérito → foram equipadas.' },
          { answer: 'foram selecionados', accepted: ['foram selecionados', 'foram seleccionados'], explain: '"Os médicos" (masc. pl.) + pretérito → foram selecionados.' },
          { answer: 'são atendidos', accepted: ['são atendidos'], explain: '"Centenas de doentes" (masc. pl.) + presente → são atendidos.' },
          { answer: 'marcam-se', accepted: ['marcam-se'], explain: 'Pasiva pronominal: "as consultas" (plural) → marcam-se.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones en pasiva',
        tag: 'Producción',
        intro: 'Transforma las oraciones activas en pasivas o crea oraciones pasivas según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Voz activa a pasiva',
            prompt: 'Transforma: "A polícia prendeu o ladrão ontem." → Voz pasiva.',
            answer: 'O ladrão foi preso pela polícia ontem.',
            accepted: ['foi preso', 'pela polícia'],
            explain: '"O ladrão" (masc. sing.) + pretérito → "foi preso". "Prender" tiene participio "preso" (irregular).',
          },
          {
            scene: 'Anuncio con pasiva-se',
            prompt: 'Escribe un anuncio usando la pasiva con "se": alquilas una habitación y ofreces servicio de limpieza.',
            answer: 'Aluga-se quarto mobilado. Inclui-se serviço de limpeza semanal.',
            accepted: ['aluga-se', 'alugam-se', 'inclui-se', 'incluem-se'],
            explain: 'Pasiva pronominal para anuncios: verbo concuerda con el sujeto.',
          },
          {
            scene: 'Pasiva en futuro',
            prompt: 'Escribe que el nuevo puente será construido el próximo año.',
            answer: 'A nova ponte será construída no próximo ano.',
            accepted: ['será construída', 'vai ser construída'],
            explain: '"A nova ponte" (fem. sing.) + futuro → "será construída". Participio de "construir": construído/construída.',
          },
          {
            scene: 'Pasiva habitual',
            prompt: 'Escribe una oración sobre algo que se hace todos los años en tu país (usa la pasiva con "se" o "ser").',
            answer: 'Realiza-se um carnaval de rua todos os anos em fevereiro.',
            accepted: ['realiza-se', 'organiza-se', 'celebra-se', 'é realizado', 'é celebrado'],
            explain: 'Pasiva-se o pasiva con "ser" para hechos habituales: "realiza-se", "é realizado", etc.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Noticias en pasiva',
        tag: 'Producción libre',
        intro: 'Escribe 3 noticias breves usando la voz pasiva en diferentes tiempos.',
        type: 'write',
        items: [
          {
            scene: 'Noticia en pretérito',
            prompt: 'Escribe una noticia breve de algo que ocurrió usando "foi/foram + participio".',
            answer: 'O prédio histórico foi destruído por um incêndio esta madrugada.',
            accepted: ['foi', 'foram'],
            explain: 'Usa el pretérito de "ser" (foi/foram) + participio concordado con el sujeto.',
          },
          {
            scene: 'Anuncio en pasiva-se',
            prompt: 'Escribe un anuncio de trabajo o inmueble usando la pasiva reflexiva con "se".',
            answer: 'Procuram-se engenheiros com experiência em energias renováveis.',
            accepted: ['procura-se', 'procuram-se', 'vende-se', 'vendem-se', 'aluga-se', 'alugam-se'],
            explain: 'El verbo concuerda con el sujeto: "engenheiros" (plural) → "procuram-se".',
          },
          {
            scene: 'Noticia en futuro',
            prompt: 'Escribe algo que se hará o se anunciará próximamente usando "será/serão + participio".',
            answer: 'Os novos impostos serão anunciados na próxima semana pelo governo.',
            accepted: ['será', 'serão'],
            explain: 'Futuro de "ser" (será/serão) + participio concordado. Útil para noticias de anticipación.',
          },
        ],
      },
    ],
  },
}

export default topic
