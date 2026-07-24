import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'connecteurs',
  order: '17',
  color: '#1a2ecc',
  category: 'Cohesión textual',
  level: 'A2',
  title: 'Conectores discursivos en francés A2: donc, pourtant, cependant, en revanche',
  shortTitle: 'Conectores discursivos',
  metaTitle: 'Conectores discursivos francés A2 — donc, alors, pourtant, cependant, en revanche',
  description:
    'Los conectores discursivos en francés permiten estructurar el discurso y mostrar relaciones lógicas entre ideas. Consecuencia: donc, alors, c\'est pourquoi, par conséquent. Oposición/concesión: mais, pourtant, cependant, en revanche, par contre. Adición: de plus, en outre, aussi, de même. Orden: d\'abord, ensuite, puis, enfin. Estos conectores se usan en el habla cotidiana y en la escritura formal.',
  lead: 'Il est tard, donc je pars / Il est intelligent, pourtant il échoue: los conectores del discurso francés A2.',
  outcomes: [
    'Usar donc/alors para expresar consecuencia',
    'Usar mais/pourtant/cependant para oposición y concesión',
    'Usar en revanche/par contre para contraste',
    'Usar d\'abord/ensuite/enfin para secuencia',
  ],

  guide: {
    goal: 'Conectar ideas usando conectores de consecuencia, oposición, adición y secuencia.',
    model: 'Il pleut, donc je prends mon parapluie. (Llueve, así que cojo mi paraguas.) / C\'est cher, pourtant c\'est bon. (Es caro, sin embargo está bueno.)',
    formula: 'conséquence: donc/alors/c\'est pourquoi | opposition: mais/pourtant/cependant | contraste: en revanche',
    decisions: [
      'Consecuencia lógica: donc/alors → "J\'ai faim, donc je mange"',
      'Oposición simple: mais → "Je veux venir mais je suis occupé"',
      'Concesión (sorpresa): pourtant/cependant → "Il travaille peu, pourtant il réussit"',
      'Contraste equilibrado: en revanche/par contre → "Paris est cher; en revanche, Lyon est abordable"',
      'Secuencia: d\'abord... ensuite... enfin → "D\'abord, je prépare; ensuite, je cuisine; enfin, je mange"',
    ],
    table: [
      ['Fonction', 'Connecteurs', 'Exemple'],
      ['Conséquence', 'donc, alors, c\'est pourquoi', 'Il est malade, donc il ne vient pas'],
      ['Opposition/concession', 'mais, pourtant, cependant', 'Il est jeune, pourtant il est sage'],
      ['Contraste', 'en revanche, par contre', 'Il est rapide ; en revanche, il fait des erreurs'],
    ],
    mistakes: [
      '"Donc" en début de phrase formelle ❌ → préférer "C\'est pourquoi" ou "Par conséquent".',
      '"Mais" y "pourtant" no son intercambiables: "Il est malade mais il vient" (fact) vs "Il est malade, pourtant il vient" (sorpresa).',
      '"Par contre" es más oral; en texto escrito formal se prefiere "en revanche".',
    ],
  },

  seo: [
    {
      heading: 'Donc y alors: consecuencia natural',
      paragraphs: [
        'Donc y alors expresan una consecuencia lógica: "Il est tard, donc/alors nous partons" (Es tarde, así que nos vamos). La diferencia es matiz: donc es más formal y lógico; alors es más oral y narrativo. C\'est pourquoi y par conséquent se usan en escritura más formal: "Il n\'a pas étudié, c\'est pourquoi il a échoué."',
        'Donc puede también usarse para retomar el hilo de un discurso: "Donc, comme je vous disais..." (Entonces, como les decía...). En oral, alors tiene muchos usos: consecuencia, narración, pregunta ("Alors ?") y relleno conversacional.',
      ],
    },
    {
      heading: 'Pourtant/cependant vs en revanche: oposición y contraste',
      paragraphs: [
        'Pourtant y cependant expresan concesión o sorpresa: el segundo elemento contradice lo esperado del primero. "Il est très intelligent, pourtant il fait des erreurs stupides" (Es muy inteligente, sin embargo comete errores estúpidos — esto sorprende). Cependant es más literario y formal.',
        'En revanche y par contre expresan contraste equilibrado, no sorpresa: se presentan dos aspectos opuestos de la misma realidad. "Ce restaurant est cher, en revanche la qualité est excellente" (Este restaurante es caro; en cambio, la calidad es excelente). Par contre es más oral.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'donc/alors (consecuencia) | pourtant (concesión) | en revanche (contraste) | d\'abord/ensuite/enfin.',
    graphicPrompt: 'Flechas conectando frases: consecuencia → concesión ↔ contraste.',
    scene: [
      ['Il fait beau, donc nous allons au parc.', 'Hace buen tiempo, así que vamos al parque.'],
      ['Elle travaille beaucoup, pourtant elle est toujours fatiguée.', 'Trabaja mucho, sin embargo siempre está cansada.'],
      ['Ce quartier est bruyant ; en revanche, il est très pratique.', 'Este barrio es ruidoso; en cambio, es muy práctico.'],
      ['D\'abord, je me lave ; ensuite, je m\'habille ; enfin, je mange.', 'Primero me lavo; luego me visto; finalmente como.'],
      ['Il est vieux, cependant il court très vite.', 'Es viejo, sin embargo corre muy rápido.'],
      ['Je n\'ai pas faim, mais je mange quand même.', 'No tengo hambre, pero como de todas formas.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['donc/alors = consecuencia', 'pourtant/cependant = concesión', 'en revanche = contraste', 'd\'abord/ensuite/enfin'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el conector que mejor expresa la relación lógica.',
        type: 'choice',
        items: [
          {
            scene: 'Il pleut, ___ je reste à la maison.',
            lines: [['', 'Il pleut, ___ je reste à la maison.']],
            options: ['donc', 'pourtant', 'en revanche', 'cependant'],
            answer: 'donc',
            explain: '"donc" = consecuencia. Llueve → por eso me quedo en casa.',
          },
          {
            scene: 'Il est riche, ___ il n\'est pas heureux.',
            lines: [['', 'Il est riche, ___ il n\'est pas heureux.']],
            options: ['pourtant', 'donc', 'alors', 'de plus'],
            answer: 'pourtant',
            explain: '"pourtant" = concesión/sorpresa. Ser rico debería implicar felicidad, pero no.',
          },
          {
            scene: 'Ce film est long ; ___, il est très intéressant.',
            lines: [['', 'Ce film est long ; ___, il est très intéressant.']],
            options: ['en revanche', 'donc', 'pourtant', 'puis'],
            answer: 'en revanche',
            explain: '"en revanche" = contraste equilibrado. Largo (negativo) ↔ interesante (positivo).',
          },
          {
            scene: '___ , je prépare les ingrédients ; ensuite, je cuisine.',
            lines: [['', '___, je prépare les ingrédients ; ensuite, je cuisine.']],
            options: ["D'abord", 'Donc', 'Pourtant', 'Enfin'],
            answer: "D'abord",
            explain: '"D\'abord" = primero. Inicio de una secuencia temporal: d\'abord... ensuite... enfin.',
          },
          {
            scene: 'J\'ai beaucoup étudié, ___ j\'ai réussi l\'examen.',
            lines: [['', 'J\'ai beaucoup étudié, ___ j\'ai réussi l\'examen.']],
            options: ['alors', 'pourtant', 'cependant', 'en revanche'],
            answer: 'alors',
            explain: '"alors" = consecuencia (más narrativo que donc). Estudiar → aprobar.',
          },
          {
            scene: 'Ce logement est petit ; ___, il est très bien situé.',
            lines: [['', 'Ce logement est petit ; ___, il est très bien situé.']],
            options: ['par contre', 'donc', 'alors', 'ensuite'],
            answer: 'par contre',
            explain: '"par contre" = contraste (oral). Pequeño (negativo) ↔ bien ubicado (positivo).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conectores en pares',
        tag: '2 espacios',
        intro: 'Completa con los dos conectores correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Primero y luego, para la rutina.',
            lines: [['', '[[0]], je lis les mails ; [[1]], je réponds aux urgences.']],
            blanks: [
              { options: ["D'abord", 'Ensuite', 'Enfin', 'Donc'], answer: "D'abord", explain: '"D\'abord" = primero. Inicio de secuencia.' },
              { options: ['Ensuite', "D'abord", 'Enfin', 'Pourtant'], answer: 'Ensuite', explain: '"Ensuite" = luego/después. Segundo paso de la secuencia.' },
            ],
          },
          {
            scene: 'Consecuencia y contraste: este hotel.',
            lines: [['', 'Cet hôtel est très propre, [[0]] je le recommande. Le prix est élevé ; [[1]], le service est parfait.']],
            blanks: [
              { options: ['donc', 'pourtant', 'en revanche', 'cependant'], answer: 'donc', explain: '"donc" = consecuencia. Está limpio → por eso lo recomiendo.' },
              { options: ['en revanche', 'donc', 'alors', 'ensuite'], answer: 'en revanche', explain: '"en revanche" = contraste. Precio alto ↔ servicio perfecto.' },
            ],
          },
          {
            scene: 'Concesión y contraste en una comparación.',
            lines: [['', 'Lyon est moins touristique que Paris, [[0]] elle est magnifique. [[1]], elle est beaucoup moins chère.']],
            blanks: [
              { options: ['pourtant', 'donc', 'alors', 'ensuite'], answer: 'pourtant', explain: '"pourtant" = concesión. Menos turística pero igualmente hermosa (sorpresa).' },
              { options: ['En revanche', 'Donc', 'Pourtant', "D'abord"], answer: 'En revanche', explain: '"En revanche" = contraste. Menos turística ↔ más barata.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una opinión argumentada',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los conectores correctos.',
        type: 'guidedText',
        scene: 'Sophie donne son avis sur le télétravail.',
        text: 'Le télétravail présente de nombreux avantages. [[0]], on gagne du temps en transport. [[1]], on peut mieux organiser sa journée. [[2]], il y a des inconvénients : on peut se sentir isolé. [[3]], certaines personnes travaillent plus chez elles que au bureau. En [[4]], le télétravail n\'est pas possible pour tous les métiers.',
        blanks: [
          { options: ["D'abord", 'Donc', 'Pourtant', 'Enfin'], answer: "D'abord", explain: '"D\'abord" = en primer lugar. Primer argumento.' },
          { options: ['Ensuite', "D'abord", 'Enfin', 'Pourtant'], answer: 'Ensuite', explain: '"Ensuite" = además/luego. Segundo argumento.' },
          { options: ['Cependant', 'Donc', "D'abord", 'En revanche'], answer: 'Cependant', explain: '"Cependant" = sin embargo. Introduce los inconvenientes.' },
          { options: ['Pourtant', 'Donc', 'Ensuite', 'Enfin'], answer: 'Pourtant', explain: '"Pourtant" = sin embargo (concesión). Hay problemas pero algunos trabajan más.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el conector',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el conector correcto.',
        type: 'freeText',
        scene: 'Complétez avec le bon connecteur.',
        text: 'Il a plu toute la journée, [[0]] le match a été annulé. (consecuencia) / Ce restaurant est bruyant ; [[1]], la nourriture est délicieuse. (contraste) / [[2]], prépare les légumes ; ensuite, fais cuire la viande. (secuencia) / Il est timide, [[3]] il parle beaucoup en public. (concesión)',
        blanks: [
          { answer: 'donc', explain: '"donc" = consecuencia. Llueve → cancelan el partido.' },
          { answer: 'en revanche', explain: '"en revanche" = contraste equilibrado. Ruidoso ↔ buena comida.' },
          { answer: "D'abord", explain: '"D\'abord" = primero. Inicio de secuencia.' },
          { answer: 'pourtant', explain: '"pourtant" = concesión. Tímido pero habla mucho — sorprende.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Conecta las ideas',
        tag: 'Escritura guiada',
        intro: 'Combina las dos frases con el conector indicado.',
        type: 'write',
        items: [
          {
            scene: '"Je suis fatigué." / "Je dois finir ce travail." (consecuencia → pourtant)',
            prompt: 'Combina con pourtant.',
            answer: 'Je suis fatigué, pourtant je dois finir ce travail.',
            accepted: ['Je suis très fatigué, pourtant je continue à travailler.'],
            explain: '"pourtant" = sin embargo. Estar cansado debería implicar parar, pero continúa.',
          },
          {
            scene: '"Ce quartier est loin du centre." / "Il est calme et agréable." (contraste)',
            prompt: 'Combina con en revanche.',
            answer: 'Ce quartier est loin du centre ; en revanche, il est calme et agréable.',
            accepted: ['Ce quartier est loin du centre. En revanche, il est très calme.'],
            explain: '"en revanche" = en cambio. Lejos (desventaja) ↔ tranquilo (ventaja).',
          },
          {
            scene: '"Je n\'ai pas dormi." / "Je suis de mauvaise humeur." (consecuencia → donc)',
            prompt: 'Combina con donc.',
            answer: 'Je n\'ai pas dormi, donc je suis de mauvaise humeur.',
            accepted: ['Je n\'ai pas dormi donc je suis fatigué et de mauvaise humeur.'],
            explain: '"donc" = consecuencia. No dormir → mal humor.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Argumenta tu opinión',
        tag: 'Escritura libre',
        intro: 'Escribe un párrafo con al menos 4 conectores diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Da tu opinión sobre vivir en el campo vs. en la ciudad.',
            prompt: 'Utilisez donc, pourtant, en revanche, d\'abord, ensuite, enfin.',
            answer: 'J\'aime la ville car elle est animée. D\'abord, il y a de nombreuses activités culturelles. Ensuite, les transports sont pratiques. Pourtant, elle est souvent bruyante et stressante. En revanche, la campagne offre calme et nature. Donc, c\'est une question de priorités.',
            accepted: ['La vie à la campagne est tranquille. D\'abord, l\'air est pur. Ensuite, le coût de la vie est moins élevé. Cependant, elle peut être isolante. En revanche, la ville offre plus d\'opportunités. Donc, tout dépend du style de vie.'],
            explain: 'D\'abord/ensuite (orden) + pourtant (concesión) + en revanche (contraste) + donc (conclusión).',
          },
          {
            scene: 'Describe las ventajas y desventajas de estudiar online.',
            prompt: 'Utilisez des connecteurs variés pour structurer votre réponse.',
            answer: 'Étudier en ligne présente des avantages. D\'abord, on peut apprendre à son rythme. De plus, c\'est souvent moins cher. Pourtant, c\'est parfois difficile de rester motivé. En revanche, on développe son autonomie. Donc, c\'est une bonne option si on est discipliné.',
            accepted: ['L\'apprentissage en ligne est flexible, donc on peut étudier quand on veut. Cependant, il manque d\'interaction humaine. En revanche, les cours sont accessibles partout. D\'abord, il faut choisir une bonne plateforme ; ensuite, organiser son temps.'],
            explain: 'Variedad de conectores: D\'abord/de plus (adición) + pourtant (concesión) + en revanche (contraste) + donc (consecuencia).',
          },
        ],
      },
    ],
  },
}

export default topic
