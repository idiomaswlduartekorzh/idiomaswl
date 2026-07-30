import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'plus-que-parfait-b1',
  order: '02',
  color: '#1a2ecc',
  category: 'Verbes',
  level: 'B1',
  title: 'Le Plus-que-parfait en Francés B1',
  shortTitle: 'Plus-que-parfait',
  metaTitle: 'Plus-que-parfait B1 — El pasado del pasado en francés',
  description:
    'El plus-que-parfait (pluscuamperfecto) expresa una acción que ya se había completado antes de otra acción pasada. Se forma con el imparfait de avoir o être más el participio pasado. Es esencial para narrar secuencias temporales complejas y para el discurso indirecto en pasado.',
  lead: 'Domina el plus-que-parfait para expresar "lo que ya había ocurrido" antes de otro evento pasado y enriquece tu narración en francés.',
  outcomes: [
    'Formas el plus-que-parfait con avoir/être en imparfait + participio pasado',
    'Expresas la anterioridad temporal entre dos eventos pasados',
    'Combinas plus-que-parfait con passé composé e imparfait en narraciones',
    'Aplicas el plus-que-parfait en discurso indirecto y oraciones condicionales',
  ],

  guide: {
    goal: 'Usar el plus-que-parfait para indicar que una acción ocurrió antes de otra acción en el pasado.',
    model: "Il avait déjà mangé quand je suis arrivé. / Elle ne savait pas qu'il était parti. / Comme j'avais oublié mon parapluie, j'ai été trempé.",
    formula: "Imparfait de avoir/être + participe passé",
    decisions: [
      'Formación con avoir: j\'avais mangé, tu avais vu, il avait fini, nous avions pris, vous aviez lu, ils avaient dit.',
      'Formación con être (verbos de movimiento y reflexivos): j\'étais allé(e), elle était venue, nous nous étions levés.',
      'Acuerdo del participio con être: el participio concuerda con el sujeto → Elle était partie. Ils étaient arrivés.',
      'Uso principal: anterioridad → expresa lo que ya había pasado antes de otro evento en pasado.',
      'Con "quand/lorsque": la acción en PQP ocurre ANTES de la acción en PC → Quand il est arrivé, j\'avais déjà fini.',
      'En condicional tipo 3: Si j\'avais su, j\'aurais fait... (con conditionnel passé).',
    ],
    table: [
      ['Pronombre', 'Avoir + participio', 'Être + participio'],
      ['je / j\'', 'avais mangé / vu', 'étais parti(e) / allé(e)'],
      ['il / elle / on', 'avait fini / dit', 'était venu(e) / resté(e)'],
      ['nous', 'avions pris / fait', 'étions arrivé(e)s / sorti(e)s'],
    ],
    mistakes: [
      '"J\'avais allé" ❌ → "J\'étais allé" ✓ — "aller" usa être, no avoir.',
      '"Elle avait partie" ❌ → "Elle était partie" ✓ — "partir" usa être, y el participio concuerda: partie.',
      '"Quand je suis arrivé, il mangeait déjà" puede ser correcto, pero si quieres remarcar que ya había terminado: "il avait déjà mangé".',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el plus-que-parfait en francés?',
      paragraphs: [
        'El plus-que-parfait (pluscuamperfecto) es el tiempo verbal que expresa una acción que se completó antes de otra acción pasada. En español equivale a "había comido", "había llegado", "se había ido". En francés, este tiempo es fundamental para dar profundidad temporal a las narraciones y para construir frases condicionales del tipo "si hubiera sabido...".',
        'Se forma con el imparfait del auxiliar (avoir o être) más el participio pasado del verbo principal. La elección entre avoir y être sigue exactamente las mismas reglas que en el passé composé.',
      ],
    },
    {
      heading: '¿Cómo se forma el plus-que-parfait en francés?',
      paragraphs: [
        'Con avoir: avais, avais, avait, avions, aviez, avaient + participio pasado. Ejemplos: j\'avais compris, tu avais lu, il avait dit, nous avions vu, vous aviez pris, ils avaient fini.',
        'Con être (verbos de movimiento y todos los verbos reflexivos): étais, étais, était, étions, étiez, étaient + participio pasado. El participio concuerda en género y número con el sujeto. Ejemplos: Elle était sortie. Ils s\'étaient réveillés tôt. Nous étions rentrés tard.',
      ],
      table: [
        ['Pronombre', 'Avec avoir', 'Avec être'],
        ['je', "j'avais mangé", "j'étais arrivé(e)"],
        ['tu', 'tu avais fini', 'tu étais parti(e)'],
        ['il/elle', 'il avait vu', 'elle était venue'],
        ['nous', 'nous avions pris', 'nous étions sortis'],
        ['vous', 'vous aviez dit', 'vous étiez restés'],
        ['ils/elles', 'ils avaient fait', 'elles étaient allées'],
      ],
    },
    {
      heading: '¿Para qué se usa el plus-que-parfait en francés?',
      paragraphs: [
        'El uso principal es expresar anterioridad: algo que ya había ocurrido antes de otra acción pasada. Esta estructura aparece muy frecuentemente con quand/lorsque: "Quand tu es arrivé, j\'avais déjà préparé le dîner." O con des que/une fois que: "Une fois qu\'il avait fini, il est sorti."',
        'También se usa en discurso indirecto pasado, cuando el verbo principal está en pasado y queremos reportar algo que ocurrió aún antes: "Elle a dit qu\'elle avait déjà vu ce film." Y en condicionales de tipo 3 (hipótesis irreales en el pasado): "Si j\'avais étudié, j\'aurais réussi l\'examen."',
      ],
    },
    {
      heading: 'Plus-que-parfait vs Passé composé',
      paragraphs: [
        'La diferencia clave entre el plus-que-parfait y el passé composé es el orden temporal: el PQP ocurre ANTES que el passé composé. Imagina una línea de tiempo: PQP → PC → presente. "J\'avais fini (PQP) quand elle est arrivée (PC)." Aquí "terminar" fue antes que "llegar".',
        'Un truco útil: si puedes insertar "ya" (déjà) o "antes" (avant) en la frase en español, probablemente necesitas el plus-que-parfait. "Cuando llegué, él ya había comido" → "Quand je suis arrivé(e), il avait déjà mangé."',
      ],
    },
    {
      heading: 'Conectores frecuentes con el plus-que-parfait',
      paragraphs: [
        'Los conectores temporales más frecuentes con el PQP son: quand/lorsque (+ PC para la acción posterior), à peine... que (apenas... cuando), depuis que (desde que), une fois que/dès que (una vez que/tan pronto como), avant que... ne (antes de que).',
        'También es muy común con "déjà" (ya): "Elle avait déjà compris avant que je lui explique." Y con "ne... pas encore" (todavía no): "Il n\'était pas encore parti quand nous sommes arrivés."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Plus-que-parfait como anterioridad en narraciones con passé composé de referencia.',
    graphicPrompt: 'Línea de tiempo con dos momentos pasados: PQP antes que PC, flecha hacia el presente.',
    scene: [
      ["Il avait déjà mangé quand je suis arrivé.", "Él ya había comido cuando llegué."],
      ["Elle avait oublié son parapluie et elle était trempée.", "Había olvidado su paraguas y estaba empapada."],
      ["Nous avions déjà choisi le restaurant.", "Ya habíamos elegido el restaurante."],
      ["Quand tu as appelé, j'étais sorti(e).", "Cuando llamaste, yo ya había salido."],
      ["Ils avaient étudié toute la nuit.", "Habían estudiado toda la noche."],
      ["Je n'avais jamais vu la mer avant ce voyage.", "Nunca había visto el mar antes de ese viaje."],
      ["Elle s'était déjà endormie quand il est rentré.", "Ella ya se había dormido cuando él llegó a casa."],
      ["On avait réservé la table une semaine avant.", "Habíamos reservado la mesa una semana antes."],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['PQP avec avoir/être', 'anterioridad temporal', 'accord du participe avec être'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el plus-que-parfait',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de plus-que-parfait para completar cada frase.',
        type: 'choice',
        items: [
          {
            scene: 'Llegada tardía',
            lines: [['', "Quand je suis arrivé, ils ___ déjà."]],
            options: ['étaient partis', 'sont partis', 'partiront', 'partaient'],
            answer: 'étaient partis',
            explain: '"Partir" usa être → imparfait de être + participi: étaient partis. Acción anterior a "arriver".',
          },
          {
            scene: 'Preparación terminada',
            lines: [['', "Elle ___ le rapport avant la réunion."]],
            options: ['avait fini', 'a fini', 'finissait', 'finira'],
            answer: 'avait fini',
            explain: 'Acción completada antes de la reunión (contexto pasado) → plus-que-parfait con avoir.',
          },
          {
            scene: 'Primer viaje al mar',
            lines: [['', "Je n'___ jamais la mer avant ce voyage."]],
            options: ["avais vu", 'ai vu', 'voyais', 'verrai'],
            answer: 'avais vu',
            explain: 'Nunca había hecho algo antes de un momento pasado → plus-que-parfait con avoir.',
          },
          {
            scene: 'Cena sorpresa',
            lines: [['', "Il ___ déjà quand nous sommes rentrés."]],
            options: ['avait cuisiné', 'a cuisiné', 'cuisinait', 'cuisinera'],
            answer: 'avait cuisiné',
            explain: 'Cocinar ocurrió antes de que llegáramos → plus-que-parfait: avait cuisiné.',
          },
          {
            scene: 'Acuerdo del participio con être',
            lines: [['', "Mes sœurs ___ avant moi."]],
            options: ['étaient parties', 'avaient parti', 'étaient partis', 'sont parties'],
            answer: 'étaient parties',
            explain: '"Partir" + être + sujeto femenino plural → étaient parties (acuerdo: -es).',
          },
          {
            scene: 'Sin estudiar',
            lines: [['', "Il a raté l'examen parce qu'il ne ___ pas."]],
            options: ["avait étudié", 'a étudié', 'étudiait', 'étudiera'],
            answer: 'avait étudié',
            explain: 'La causa anterior al examen → plus-que-parfait: n\'avait pas étudié.',
          },
          {
            scene: 'Mensaje perdido',
            lines: [['', "Je n'ai pas vu son message parce que j'___ mon téléphone."]],
            options: ['avais oublié', 'ai oublié', 'oubliais', 'oublierai'],
            answer: 'avais oublié',
            explain: 'Olvidar el teléfono ocurrió antes de no ver el mensaje → plus-que-parfait.',
          },
          {
            scene: 'Verbo reflexivo',
            lines: [['', "Quand l'alarme a sonné, il s'___ déjà."]],
            options: ['était levé', 'est levé', 'levait', 'sera levé'],
            answer: 'était levé',
            explain: '"Se lever" usa être → s\'était levé. Acción anterior a que sonara la alarma.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Anterioridad en contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma verbal correcta: plus-que-parfait o passé composé según el orden temporal.',
        type: 'dual',
        items: [
          {
            scene: 'La película ya había empezado',
            lines: [['', "Le film [[0]] quand nous [[1]] dans la salle."]],
            blanks: [
              { options: ['avait commencé', 'a commencé', 'commençait', 'commencera'], answer: 'avait commencé', explain: 'La película empezó ANTES de que entregáramos → plus-que-parfait.' },
              { options: ['sommes entrés', 'étions entrés', 'entrons', 'entrerons'], answer: 'sommes entrés', explain: 'Entrar a la sala es el evento de referencia pasado → passé composé.' },
            ],
          },
          {
            scene: 'Llegada al aeropuerto',
            lines: [['', "Il m'[[0]] que son vol [[1]] en avance."]],
            blanks: [
              { options: ['a dit', 'avait dit', 'disait', 'dira'], answer: 'a dit', explain: 'Decirme es el evento de referencia → passé composé.' },
              { options: ['était arrivé', 'est arrivé', 'arrivait', 'arrivera'], answer: 'était arrivé', explain: 'El vuelo llegó antes de que me lo dijera → plus-que-parfait con être.' },
            ],
          },
          {
            scene: 'La reunión sin preparación',
            lines: [['', "Lors de la réunion, il était clair qu'ils ne [[0]] pas les documents et ils n'[[1]] rien."]],
            blanks: [
              { options: ['avaient lus', 'ont lu', 'lisaient', 'liront'], answer: 'avaient lus', explain: 'No leer los documentos ocurrió antes de la reunión → plus-que-parfait.' },
              { options: ['avaient compris', 'ont compris', 'comprenaient', 'comprendront'], answer: 'avaient compris', explain: 'No comprender también fue anterior a la reunión → plus-que-parfait.' },
            ],
          },
          {
            scene: 'Una carta antigua',
            lines: [['', "J'[[0]] une lettre de quelqu'un que je [[1]] dans ma jeunesse."]],
            blanks: [
              { options: ['ai reçu', 'avais reçu', 'recevais', 'recevrai'], answer: 'ai reçu', explain: 'Recibir la carta es el evento de referencia (pasado reciente) → passé composé.' },
              { options: ['avais connu', 'ai connu', 'connaissais', 'connaîtrai'], answer: 'avais connu', explain: 'Conocer a esa persona ocurrió mucho antes de recibir la carta → plus-que-parfait.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una tarde complicada',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta (plus-que-parfait o passé composé) para completar el relato.',
        type: 'guidedText',
        scene: 'Historia de una tarde con contratiempos.',
        text: "Hier soir, quand je suis rentré(e) chez moi, je me suis rendu compte que j'[[0]] (oublier) mes clés au bureau. En plus, ma colocataire [[1]] (partir) en week-end. J'[[2]] (ne pas penser) à lui laisser un message. Heureusement, mon voisin, à qui j'[[3]] (expliquer) ma situation la semaine précédente, m'[[4]] (prêter) son téléphone. J'[[5]] (appeler) un serrurier qui [[6]] (déjà / travailler) dans mon immeuble avant.",
        blanks: [
          { options: ["avais oublié", "ai oublié", "oubliais", "oublierai"], answer: "avais oublié", explain: 'Olvidar las llaves ocurrió antes de darme cuenta → plus-que-parfait.' },
          { options: ['était partie', 'est partie', 'partait', 'partira'], answer: 'était partie', explain: 'La compañera ya se había ido antes de que llegara → plus-que-parfait con être.' },
          { options: ["n'avais pas pensé", "n'ai pas pensé", "ne pensais pas", "ne penserai pas"], answer: "n'avais pas pensé", explain: 'No pensar en dejar mensaje fue anterior a la situación → plus-que-parfait negativo.' },
          { options: ["avais expliqué", "ai expliqué", "expliquais", "expliquerai"], answer: "avais expliqué", explain: 'Explicarle la situación al vecino fue la semana anterior → plus-que-parfait.' },
          { options: ['a prêté', 'avait prêté', 'prêtait', 'prêtera'], answer: 'a prêté', explain: 'Prestarme el teléfono ocurre después de llamar → passé composé.' },
          { options: ['ai appelé', 'avais appelé', 'appelais', 'appellerai'], answer: 'ai appelé', explain: 'Llamar al cerrajero es el evento principal del relato → passé composé.' },
          { options: ['avait déjà travaillé', 'a déjà travaillé', 'travaillait déjà', 'travaillera déjà'], answer: 'avait déjà travaillé', explain: 'El cerrajero ya había trabajado antes (información anterior) → plus-que-parfait.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el pluscuamperfecto',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del plus-que-parfait para cada verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Relato de un malentendido en el trabajo.',
        text: "Ce matin, mon chef m'a convoqué(e). Apparemment, j'[[0]] (ne pas envoyer) le rapport à temps. Mais moi, j'[[1]] (finir) le travail la veille. Je lui [[2]] (dire) que j'[[3]] (envoyer) le fichier, mais il semble qu'il ne [[4]] (recevoir) rien.",
        blanks: [
          { answer: "n'avais pas envoyé", accepted: ["n'avais pas envoyé", "avais pas envoyé"], explain: 'Plus-que-parfait negativo: n\'avais pas envoyé (avoir + pas + participe).' },
          { answer: "avais fini", accepted: ["avais fini", "j'avais fini"], explain: 'Haber terminado el trabajo la víspera → plus-que-parfait: avais fini.' },
          { answer: "avais dit", accepted: ["avais dit", "lui avais dit"], explain: 'Lo que le dije referido en un contexto anterior → avais dit.' },
          { answer: "avais envoyé", accepted: ["avais envoyé", "j'avais envoyé"], explain: 'Enviar el archivo fue anterior a la reunión → avais envoyé.' },
          { answer: "avait reçu", accepted: ["n'avait pas reçu", "avait reçu"], explain: 'Que él no hubiera recibido nada → n\'avait pas reçu (plus-que-parfait).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con plus-que-parfait',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el plus-que-parfait según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Una historia de llegada tarde',
            prompt: "Escribe qué ya había pasado cuando llegaste a algún lugar (usa: quand je suis arrivé(e)... il/elle avait déjà...).",
            answer: "Quand je suis arrivé(e) à la fête, mes amis avaient déjà mangé tout le gâteau.",
            accepted: ['avait', 'avaient', 'étaient', 'était', 'déjà'],
            explain: "Quand [PC de arriver] + [PQP de lo que ya había pasado]. Usa déjà para enfatizar.",
          },
          {
            scene: 'Una explicación con causa',
            prompt: "Explica por qué algo salió mal usando plus-que-parfait como causa (parce que j'avais...).",
            answer: "J'ai raté le train parce que j'avais oublié de mettre mon réveil.",
            accepted: ['avais', 'avaient', 'était', 'étais', 'parce que'],
            explain: "Parce qu'il avait [PQP] → la causa estaba en el pasado anterior. Ej: parce que j'avais oublié/raté/perdu...",
          },
          {
            scene: 'Condicional hipotético',
            prompt: "Escribe qué habrías hecho si algo hubiera sido diferente (Si j'avais su... j'aurais...).",
            answer: "Si j'avais su qu'il pleuvait, j'aurais pris mon parapluie.",
            accepted: ['si', 'avais', 'aurais', 'aurait', 'serais', 'serait'],
            explain: "Condicionnel type 3: Si + PQP + conditionnel passé (aurais/serais + participe).",
          },
          {
            scene: 'Contexto de discurso indirecto',
            prompt: "Reporta lo que alguien te dijo que había hecho (Il m'a dit qu'il avait...).",
            answer: "Elle m'a dit qu'elle avait déjà réservé les billets pour le concert.",
            accepted: ['avait', 'avaient', 'était', 'étaient', "m'a dit", 'a dit'],
            explain: "Discurso indirecto: m'a dit que + PQP (la acción reportada fue anterior al momento de decir).",
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Relato con anterioridad',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones narrando una situación donde el plus-que-parfait sea necesario para expresar el orden de los eventos.',
        type: 'write',
        items: [
          {
            scene: 'Un momento de sorpresa',
            prompt: "Describe algo que encontraste diferente a como lo habías dejado (usa: j'avais laissé... mais quand...).",
            answer: "J'avais laissé mon bureau en ordre, mais quand je suis revenu(e), tout était en désordre.",
            accepted: ['avais', 'était', 'avaient', 'étaient'],
            explain: "J'avais + participe (lo que dejé hecho) + mais/quand + PC/imparfait (lo que encontré).",
          },
          {
            scene: 'Una oportunidad perdida',
            prompt: "Cuenta algo que ya había terminado cuando quisiste participar (c'était déjà fini / il n'y avait plus...).",
            answer: "Quand j'ai voulu acheter les billets, ils étaient déjà tous vendus.",
            accepted: ['avait', 'était', 'avaient', 'étaient', 'plus', 'déjà'],
            explain: "Usa: étaient déjà + participe, ou il n'y avait plus de + nom → anterioridad clara.",
          },
          {
            scene: 'Una explicación de algo que ya sabías',
            prompt: "Escribe algo que ya sabías o habías leído antes de que alguien te lo contara.",
            answer: "Je savais déjà ce qui s'était passé car j'avais lu les nouvelles le matin même.",
            accepted: ['avais', 'avaient', 'était', 'étaient', 'déjà', 's\'était', 'car', 'parce que'],
            explain: "Je savais déjà... parce que j'avais [PQP]. Muestra que la información llegó primero.",
          },
        ],
      },
    ],
  },
}

export default topic
