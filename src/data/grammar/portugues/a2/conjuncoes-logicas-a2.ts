import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conjuncoes-logicas-a2',
  order: '10',
  color: '#166534',
  category: 'Gramática',
  level: 'A2',
  title: 'Conjunções Lógicas em Português A2',
  shortTitle: 'Conjunções lógicas',
  metaTitle: 'Conjunções lógicas português A2 — portanto, porém, contudo, além disso',
  description:
    'Las conjunciones lógicas en portugués permiten conectar ideas con matices de consecuencia, contraste y adición. Las principales son: portanto (por lo tanto), porém/contudo/entretanto (sin embargo/pero), além disso (además). Son esenciales para la escritura y el habla formales.',
  lead: '"Portanto" concluye, "porém" contrasta, "além disso" suma. "Estudei muito, portanto passei no exame." / "Ela é inteligente; porém, não se esforça." Aprende a conectar ideas con cohesión.',
  outcomes: [
    'Usa "portanto" para expresar consecuencia lógica',
    'Usa "porém", "contudo" y "entretanto" para contrastar ideas',
    'Usa "além disso" para agregar información',
    'Distingue el registro formal de estas conjunciones vs conectores coloquiales',
  ],

  guide: {
    goal: 'Conectar ideas con conjunciones lógicas para lograr textos coherentes y bien argumentados.',
    model: 'Estudei bastante, portanto estou confiante. / Gosto de carne; porém, como mais vegetais. / Além disso, pratico esportes.',
    formula: 'Oración 1 + , + conjunção + oración 2 | Conjunção + , + oración (al inicio)',
    decisions: [
      '"Portanto" = consecuencia. "Choveu muito, portanto o jogo foi cancelado." (Por lo tanto)',
      '"Porém" = contraste (pero). "Ele é esforçado; porém, os resultados ainda são fracos." (Sin embargo/Pero)',
      '"Contudo" = contraste más formal que porém. "Era tarde; contudo, continuou trabalhando." (Sin embargo)',
      '"Entretanto" = mientras tanto / sin embargo. "Tentei ligar; entretanto, não atendeu." (Sin embargo/Mientras tanto)',
      '"Além disso" = adición. "O hotel é bonito. Além disso, fica perto da praia." (Además)',
      'En habla coloquial: "então" (portanto), "mas" (porém/contudo), "e também" (além disso).',
    ],
    table: [
      ['Conjunção', 'Función', 'Equivalente coloquial'],
      ['portanto', 'consecuencia/conclusión', 'então, por isso'],
      ['porém', 'contraste/oposición', 'mas'],
      ['contudo', 'contraste (más formal)', 'mas, no entanto'],
      ['entretanto', 'contraste / mientras tanto', 'mas, enquanto isso'],
      ['além disso', 'adición / además', 'e também, e mais'],
    ],
    mistakes: [
      '"Portanto" va después de punto y coma o coma, no al inicio de párrafo independiente sin vínculo lógico claro.',
      '"Porém" y "contudo" son sinónimos en la mayoría de los contextos; "entretanto" puede significar "mientras tanto" en contextos temporales.',
      'No confundir "mas" (pero, conjunção adversativa) con "mais" (más, de comparación o cantidad).',
      '"Além disso" siempre abre una nueva idea: no se usa dentro de la misma cláusula sin pausa.',
    ],
  },

  seo: [
    {
      heading: 'Conjunciones lógicas en portugués: conectar ideas con cohesión',
      paragraphs: [
        'Las conjunciones lógicas son las palabras que dan cohesión y estructura a un texto. En portugués A2 las más importantes son: portanto (por lo tanto/en consecuencia), porém y contudo (sin embargo/pero), entretanto (mientras tanto/sin embargo), y além disso (además/por añadidura). Su uso correcto es clave para escribir bien y para el exame CELPE-Bras.',
        'En el habla cotidiana brasileña, estas conjunciones se reemplazan con equivalentes más simples: "então" reemplaza a "portanto", "mas" reemplaza a "porém/contudo", y "e também" reemplaza a "além disso". Aprender ambos registros es importante para comunicarse en contextos formales e informales.',
      ],
    },
    {
      heading: 'Portanto: consecuencia y conclusión',
      paragraphs: [
        '"Portanto" introduce una consecuencia o conclusión lógica de lo que se dijo antes. Es equivalente a "por lo tanto", "en consecuencia" o "así que" en español. Ejemplo: "Não dormi bem, portanto estou cansado hoje." En la escritura va precedido de coma o punto y coma: "Estudei muito; portanto, passei no exame."',
        'En el habla informal se reemplaza por "então" o "por isso": "Não dormi bem, então tô cansado" (versión coloquial). En textos académicos, cartas formales y presentaciones, "portanto" es la opción más adecuada.',
      ],
    },
    {
      heading: 'Porém, contudo y entretanto: la familia del contraste',
      paragraphs: [
        '"Porém" es la conjunción de contraste más versátil del portugués formal. Equivale a "pero/sin embargo" y siempre va precedido de punto y coma o coma: "Ela é dedicada; porém, ainda comete erros." "Contudo" es sinónimo de porém con un tono más literario. "Entretanto" tiene dos funciones: contraste ("sin embargo") y sentido temporal ("mientras tanto").',
        '"Além disso" introduce información adicional, equivalente a "además/asimismo". Se usa al inicio de una nueva oración o con coma: "O apartamento é amplo. Além disso, tem uma varanda linda." Es muy útil para estructurar argumentos y enumeraciones.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a conectar ideas con conjunciones lógicas para escribir con cohesión.',
    graphicPrompt: 'Diagrama de flechas mostrando relaciones lógicas: consecuencia, contraste y adición.',
    scene: [
      ['Estudei muito, portanto passei no exame.', 'Estudié mucho, por lo tanto pasé el examen.'],
      ['Ele é inteligente; porém, não se esforça.', 'Él es inteligente; sin embargo, no se esfuerza.'],
      ['Era tarde; contudo, continuou trabalhando.', 'Era tarde; sin embargo, siguió trabajando.'],
      ['Tentei ligar; entretanto, não atendeu.', 'Intenté llamar; sin embargo, no contestó.'],
      ['O hotel é bonito. Além disso, fica perto da praia.', 'El hotel es bonito. Además, queda cerca de la playa.'],
      ['Não tenho carro; portanto, uso o metrô.', 'No tengo coche; por lo tanto, uso el metro.'],
      ['Gosto de café; porém, bebo pouco.', 'Me gusta el café; pero, bebo poco.'],
      ['A comida era boa. Além disso, o preço era justo.', 'La comida era buena. Además, el precio era justo.'],
    ],
    learnerModes: ['consecuencia: portanto', 'contraste: porém/contudo/entretanto', 'adición: além disso'],
    reviewFocus: ['portanto vs então', 'porém vs mas', 'além disso al inicio', 'puntuación con conjunciones'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la conjunción correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la conjunción lógica que mejor conecta las dos ideas.',
        type: 'choice',
        items: [
          {
            scene: 'El examen',
            lines: [['Ana', 'Estudei muito; ___, tirei dez na prova.']],
            options: ['portanto', 'porém', 'contudo', 'entretanto'],
            answer: 'portanto',
            explain: '"Portanto" para consecuencia: estudié → resultado = saqué diez.',
          },
          {
            scene: 'El esfuerzo',
            lines: [['Carlos', 'Ele se esforçou bastante; ___, não conseguiu o emprego.']],
            options: ['porém', 'portanto', 'além disso', 'então'],
            answer: 'porém',
            explain: '"Porém" para contraste (sin embargo): se esforzó pero no consiguió el empleo.',
          },
          {
            scene: 'El apartamento',
            lines: [['Pedro', 'O apartamento é grande. ___, tem uma varanda linda.']],
            options: ['Além disso', 'Portanto', 'Porém', 'Contudo'],
            answer: 'Além disso',
            explain: '"Além disso" para agregar información positiva: es grande y además tiene terraza.',
          },
          {
            scene: 'El viaje',
            lines: [['Maria', 'Não tenho passaporte; ___, não posso viajar para a Europa.']],
            options: ['portanto', 'porém', 'além disso', 'entretanto'],
            answer: 'portanto',
            explain: '"Portanto" = por lo tanto. No tener pasaporte es la causa; no poder viajar es la consecuencia.',
          },
          {
            scene: 'La oportunidad',
            lines: [['Dario', 'A proposta é interessante; ___, o prazo é muito curto.']],
            options: ['contudo', 'portanto', 'além disso'],
            answer: 'contudo',
            explain: '"Contudo" para contraste formal (sin embargo): es interesante pero el plazo es corto.',
          },
          {
            scene: 'La espera',
            lines: [['Clara', 'Ela estava cansada; ___, continuou esperando o resultado.']],
            options: ['entretanto', 'portanto', 'além disso', 'então'],
            answer: 'entretanto',
            explain: '"Entretanto" para contraste: estaba cansada pero (sin embargo) siguió esperando.',
          },
          {
            scene: 'El restaurante',
            lines: [['Lina', 'A comida era deliciosa. ___, o atendimento foi excelente.']],
            options: ['Além disso', 'Porém', 'Portanto', 'Contudo'],
            answer: 'Além disso',
            explain: '"Além disso" para agregar: la comida era rica y además el servicio fue excelente.',
          },
          {
            scene: 'El trabajo',
            lines: [['Sofia', 'Não terminei o relatório; ___, pedi mais um dia ao chefe.']],
            options: ['portanto', 'porém', 'além disso', 'contudo'],
            answer: 'portanto',
            explain: '"Portanto" = consecuencia: no terminé → entonces pedí un día más.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos conjunciones en contexto',
        tag: '2 espacios',
        intro: 'Completa el texto con las conjunciones lógicas correctas.',
        type: 'dual',
        items: [
          {
            scene: 'El candidato',
            lines: [['Ana', 'O candidato é experiente; [[0]], suas notas de inglês são baixas. [[1]], precisará fazer um curso antes de ser contratado.']],
            blanks: [
              { options: ['porém', 'portanto', 'além disso'], answer: 'porém', explain: '"Porém" para contraste: es experto pero sus notas son bajas.' },
              { options: ['Portanto', 'Porém', 'Além disso'], answer: 'Portanto', explain: '"Portanto" para consecuencia: notas bajas → necesita hacer curso.' },
            ],
          },
          {
            scene: 'La ciudad',
            lines: [['Carlos', 'São Paulo é uma cidade enorme; [[0]], tem um trânsito caótico. [[1]], oferece infinitas oportunidades de trabalho.']],
            blanks: [
              { options: ['contudo', 'portanto', 'além disso'], answer: 'contudo', explain: '"Contudo" para contraste: es enorme pero el tráfico es caótico.' },
              { options: ['Além disso', 'Portanto', 'Porém'], answer: 'Além disso', explain: '"Além disso" para agregar: además ofrece oportunidades.' },
            ],
          },
          {
            scene: 'El proyecto',
            lines: [['Pedro', 'O prazo é apertado; [[0]], vamos trabalhar nos fins de semana. O orçamento é limitado; [[1]], precisamos ser criativos.']],
            blanks: [
              { options: ['portanto', 'porém', 'além disso'], answer: 'portanto', explain: '"Portanto" para consecuencia: plazo apretado → trabajar fines de semana.' },
              { options: ['portanto', 'porém', 'além disso'], answer: 'portanto', explain: '"Portanto" para consecuencia: presupuesto limitado → ser creativos.' },
            ],
          },
          {
            scene: 'El restaurante',
            lines: [['Maria', 'A comida era gostosa; [[0]], o preço era alto demais. [[1]], o lugar era barulhento.']],
            blanks: [
              { options: ['porém', 'portanto', 'além disso'], answer: 'porém', explain: '"Porém" para contraste: rica pero cara.' },
              { options: ['Além disso', 'Portanto', 'Porém'], answer: 'Além disso', explain: '"Além disso" para agregar otro problema: además era ruidoso.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Argumentando una posición',
        tag: 'Texto guiado',
        intro: 'Elige la conjunción lógica correcta para completar este texto argumentativo.',
        type: 'guidedText',
        scene: 'Argumento sobre el aprendizaje de idiomas',
        text: 'Aprender um idioma novo é difícil; [[0]], é possível com dedicação. A prática diária é fundamental; [[1]], é necessário ter paciência. Estudar gramática ajuda muito. [[2]], praticar a conversação é igualmente importante. Sem exposição ao idioma real, [[3]], o progresso será lento. [[4]], o caminho mais eficaz combina gramática, conversação e imersão cultural.',
        blanks: [
          { options: ['porém', 'portanto', 'além disso'], answer: 'porém', explain: '"Porém" para contraste: es difícil pero es posible.' },
          { options: ['além disso', 'portanto', 'porém'], answer: 'além disso', explain: '"Além disso" para agregar otro requisito: la paciencia.' },
          { options: ['Além disso', 'Portanto', 'Porém'], answer: 'Além disso', explain: '"Além disso" para agregar la conversación como elemento igualmente importante.' },
          { options: ['portanto', 'porém', 'além disso'], answer: 'portanto', explain: '"Portanto" para consecuencia: sin exposición → progreso lento.' },
          { options: ['Portanto', 'Porém', 'Além disso'], answer: 'Portanto', explain: '"Portanto" para conclusión final del argumento.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la conjunción',
        tag: 'Texto libre',
        intro: 'Escribe la conjunción lógica correcta: portanto, porém, contudo, entretanto o além disso.',
        type: 'freeText',
        scene: 'Evaluación de un candidato a un puesto de trabajo',
        text: 'O candidato tem muita experiência na área; [[0]], não tem o nível de inglês exigido. Ele se comprometeu a estudar; [[1]], pedimos um prazo de três meses. Sua formação acadêmica é excelente. [[2]], ele tem ótimas referências profissionais. Não preencheu todos os requisitos; [[3]], a decisão final será adiada. [[4]], todos concordaram que ele é o melhor candidato.',
        blanks: [
          { answer: 'porém', explain: '"Porém" para contraste: tiene experiencia pero no tiene inglés.' },
          { answer: 'portanto', explain: '"Portanto" para consecuencia: se comprometió → le dimos plazo.' },
          { answer: 'Além disso', explain: '"Além disso" para agregar: además tiene buenas referencias.' },
          { answer: 'portanto', explain: '"Portanto" para consecuencia: no cumplió todos requisitos → decisión aplazada.' },
          { answer: 'Entretanto', explain: '"Entretanto" para contraste: sin embargo todos están de acuerdo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Conecta las ideas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa conectando las dos ideas con la conjunción indicada.',
        type: 'write',
        items: [
          {
            scene: 'Consecuencia',
            prompt: 'Conecta con "portanto": "Não estudei" + "Reprovei no exame" → Não estudei; ___, reprovei.',
            answer: 'Não estudei; portanto, reprovei no exame.',
            accepted: ['não estudei portanto reprovei', 'não estudei; portanto, reprovei no exame'],
            explain: '"Portanto" expresa consecuencia lógica después de punto y coma.',
          },
          {
            scene: 'Contraste',
            prompt: 'Conecta con "porém": "O trabalho é difícil" + "É muito gratificante" → O trabalho é difícil; ___, é muito gratificante.',
            answer: 'O trabalho é difícil; porém, é muito gratificante.',
            accepted: ['o trabalho é difícil porém é muito gratificante', 'o trabalho é difícil; porém, é muito gratificante'],
            explain: '"Porém" para contraste: difícil pero gratificante.',
          },
          {
            scene: 'Adición',
            prompt: 'Conecta con "além disso": "O hotel é confortável" + "Tem piscina e spa" → O hotel é confortável. ___, tem piscina e spa.',
            answer: 'O hotel é confortável. Além disso, tem piscina e spa.',
            accepted: ['o hotel é confortável além disso tem piscina', 'o hotel é confortável. além disso, tem piscina e spa'],
            explain: '"Além disso" para agregar información: además tiene piscina y spa.',
          },
          {
            scene: 'Contraste formal',
            prompt: 'Conecta con "contudo": "Era tarde" + "Continuei trabalhando" → Era tarde; ___, continuei trabalhando.',
            answer: 'Era tarde; contudo, continuei trabalhando.',
            accepted: ['era tarde contudo continuei trabalhando', 'era tarde; contudo, continuei trabalhando'],
            explain: '"Contudo" para contraste formal: era tarde sin embargo seguí trabajando.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Argumenta libremente',
        tag: 'Escritura libre',
        intro: 'Escribe un breve texto usando al menos tres conjunciones lógicas diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Las redes sociales',
            prompt: 'Escribe 3-4 oraciones sobre las redes sociales usando porém, além disso y portanto.',
            answer: 'As redes sociais conectam pessoas; porém, podem causar dependência. Além disso, expõem a privacidade dos usuários. Portanto, devemos usá-las com moderação.',
            accepted: ['porém', 'além disso', 'portanto', 'contudo', 'entretanto'],
            explain: 'Usa: porém (contraste), além disso (adición), portanto (conclusión).',
          },
          {
            scene: 'Aprender idiomas',
            prompt: 'Escribe tu opinión sobre aprender idiomas usando conjunciones lógicas (portanto, porém, além disso).',
            answer: 'Aprender idiomas exige esforço; porém, abre muitas portas. Além disso, expande a visão de mundo. Portanto, todo mundo deveria aprender ao menos um idioma estrangeiro.',
            accepted: ['porém', 'além disso', 'portanto', 'contudo', 'entretanto'],
            explain: 'Argumenta con: porém (contraste), além disso (adición), portanto (conclusión).',
          },
          {
            scene: 'Una decisión',
            prompt: 'Escribe sobre una decisión difícil que tomaste usando conjunciones lógicas para justificarla.',
            answer: 'Decidi mudar de cidade; porém, foi difícil deixar minha família. Além disso, o custo de vida era alto. Portanto, planejei cuidadosamente antes de me mudar.',
            accepted: ['porém', 'além disso', 'portanto', 'contudo', 'entretanto'],
            explain: 'Usa conjunciones para mostrar razonamiento: contraste, adición y consecuencia.',
          },
        ],
      },
    ],
  },
}

export default topic
