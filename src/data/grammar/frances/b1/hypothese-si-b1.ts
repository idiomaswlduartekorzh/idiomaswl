import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'hypothese-si-b1',
  order: '15',
  color: '#2563eb',
  category: 'Condicionales',
  level: 'B1',
  title: "L'Hypothèse avec Si en Francés B1",
  shortTitle: 'Hypothèse avec Si',
  metaTitle: "Hypothèse avec Si B1 — Condicionales franceses: si + présent, si + imparfait",
  description:
    "Las frases condicionales con 'si' expresan hipótesis, condiciones y su consecuencia. En francés B1 hay dos estructuras clave: si + présent → futur (hipótesis real/posible) y si + imparfait → conditionnel présent (hipótesis irreal en presente). La regla dorada: jamás 'si' con conditionnel ni con futur.",
  lead: "Domina las frases condicionales en francés: si hace sol iremos (real), si tuviera dinero viajaría (irreal) — con las estructuras y tiempos correctos.",
  outcomes: [
    "Usas si + présent + futur simple para hipótesis realizables",
    "Usas si + imparfait + conditionnel présent para hipótesis irreales",
    "Aplicás si + plus-que-parfait + conditionnel passé para hipótesis pasadas",
    "Recuerdas la regla de oro: jamás conditionnel ni futur después de 'si' hipotético",
  ],

  guide: {
    goal: "Expresar condiciones y sus consecuencias con el tiempo verbal correcto según el grado de probabilidad.",
    model: "Si j'ai le temps, je viendrai. / Si j'avais le temps, je viendrais. / Si j'avais eu le temps, je serais venu.",
    formula: "Si + présent → futur (probable) | Si + imparfait → conditionnel présent (irréel présent) | Si + plus-que-parfait → conditionnel passé (irréel passé)",
    decisions: [
      "Hipótesis real/probable: Si + présent + futur. 'Si tu travailles, tu réussiras.'",
      "Hipótesis irreal presente: Si + imparfait + conditionnel présent. 'Si j'étais riche, je voyagerais.'",
      "Hipótesis irreal pasada: Si + plus-que-parfait + conditionnel passé. 'Si j'avais étudié, j'aurais réussi.'",
      "JAMÁS: si + conditionnel. ❌ 'Si je pourrais' → ✓ 'Si je pouvais'.",
      "JAMÁS: si + futur. ❌ 'Si tu viendras' → ✓ 'Si tu viens'.",
      "La proposition principale et la proposition si peuvent s'inverser: 'Je viendrais si j'avais le temps.'",
      "Pour des vérités générales: si + présent + présent: 'Si tu chauffes l'eau à 100°C, elle bout.'",
    ],
    table: [
      ["Tipo de hipótesis", "Proposición si", "Proposición principal"],
      ["Real/probable", "si + présent", "futur simple"],
      ["Irreal presente", "si + imparfait", "conditionnel présent"],
      ["Irreal pasada", "si + plus-que-parfait", "conditionnel passé"],
    ],
    mistakes: [
      "\"Si je pourrais\" ❌ — jamás conditionnel tras si hipotético: \"Si je pouvais\" ✓ (imparfait).",
      "\"Si tu viendras\" ❌ — jamás futur tras si hipotético: \"Si tu viens\" ✓ (présent).",
      "\"Si j'aurais su\" ❌ — irreal pasada: \"Si j'avais su\" ✓ (plus-que-parfait).",
    ],
  },

  seo: [
    {
      heading: "Las frases condicionales con si en francés: las tres estructuras",
      paragraphs: [
        "El francés tiene tres estructuras principales con 'si' hipotético. La primera — Si + présent + futur — expresa una condición real o probable: 'S'il fait beau demain, nous irons à la plage' (Si hace buen tiempo mañana, iremos a la playa). La acción es posible y el hablante la contempla como realizable. Es el equivalente del 'si + presente + futuro' del español.",
        "La segunda — Si + imparfait + conditionnel présent — expresa una condición irreal en el presente: 'Si j'avais plus d'argent, je partirais en voyage' (Si tuviera más dinero, me iría de viaje). El hablante sabe que la condición no se cumple actualmente (no tiene suficiente dinero). En español: 'si + imperfecto de subjuntivo + condicional'. La tercera — Si + plus-que-parfait + conditionnel passé — expresa una condición irreal en el pasado: 'Si j'avais étudié davantage, j'aurais eu mon diplôme' (Si hubiera estudiado más, habría obtenido mi título).",
      ],
    },
    {
      heading: "La regla de oro: jamás conditionnel ni futur después de si",
      paragraphs: [
        "La regla más importante de las frases condicionales en francés es que JAMÁS se usa el conditionnel ni el futur directamente después de 'si' hipotético. El error 'si je pourrais' (condicional tras si) es el más frecuente entre hispanohablantes porque en español se usa 'si pudiera' (subjuntivo) o coloquialmente 'si podría'. En francés, la proposición 'si' requiere siempre un indicatif: présent, imparfait, o plus-que-parfait.",
        "Esta regla no se aplica cuando 'si' significa 'si es que' o se usa en preguntas indirectas: 'Je me demande si tu viendras' (Me pregunto si vendrás) — aquí 'si' no es hipotético sino que introduce una question indirecte, y sí puede ir con futur. La diferencia: 'Si tu viens' (hipótesis: si vienes → condición) vs 'Je ne sais pas si tu viendras' (duda: no sé si vendrás → question indirecte).",
      ],
      table: [
        ["Hipótesis", "Proposición si", "Proposición resultado"],
        ["Real", "si + présent", "futur / présent"],
        ["Irréel présent", "si + imparfait", "conditionnel présent"],
        ["Irréel passé", "si + plus-que-parfait", "conditionnel passé"],
      ],
    },
    {
      heading: "Variantes y usos especiales de si conditionnel",
      paragraphs: [
        "Además de las tres estructuras principales, hay usos especiales: Para vérités générales (leyes científicas, hechos invariables): si + présent + présent. 'Si tu chauffes le fer, il se dilate' (Si calientas el hierro, se dilata). Para condiciones con resultado inmediato: si + présent + présent/impératif. 'Si tu as faim, mange quelque chose!' (Si tienes hambre, ¡come algo!).",
        "La structure mixte (mixta) combina irreal pasado con resultado presente: si + plus-que-parfait + conditionnel présent. 'Si tu m'avais écouté hier, tu ne serais pas dans cette situation' (Si me hubieras escuchado ayer, no estarías en esta situación). El 'si' se refiere al pasado pero el resultado se aplica al presente. Esta estructura avanzada aparece en el nivel B2, pero es útil reconocerla.",
      ],
    },
  ],

  visual: {
    mode: "scene",
    teacherLens: "Hipótesis con si: présent+futur (probable), imparfait+conditionnel (irreal presente), plus-que-parfait+conditionnel passé (irreal pasado). Regla de oro: nunca condicionnal tras si.",
    graphicPrompt: "Tres flechas condicionales: una sólida (probable), una punteada (irreal presente), una discontinua (irreal pasada), con sus tiempos verbales etiquetados.",
    scene: [
      ["Si tu finis à l'heure, on pourra prendre le dernier métro.", "Si terminas a tiempo, podremos coger el último metro."],
      ["Si j'étais médecin, je travaillerais dans un pays en développement.", "Si fuera médico, trabajaría en un país en desarrollo."],
      ["Si nous avions commencé plus tôt, nous aurions fini avant la pluie.", "Si hubiéramos empezado antes, habríamos terminado antes de la lluvia."],
      ["S'il pleut demain, nous reporterons le match.", "Si llueve mañana, aplazaremos el partido."],
      ["Si j'avais su ça, je t'aurais appelé tout de suite!", "Si hubiera sabido eso, ¡te habría llamado enseguida!"],
      ["Si tu t'entraînes chaque jour, tu progresseras rapidement.", "Si te entrenas cada día, progresarás rápidamente."],
      ["Si elle avait plus de confiance en elle, elle postulerait à ce poste.", "Si ella tuviera más confianza en sí misma, solicitaría ese puesto."],
      ["Si vous m'aviez prévenu, j'aurais annulé la réunion.", "Si me hubieran avisado, habría cancelado la reunión."],
    ],
    learnerModes: ["reading", "typing", "choosing"],
    reviewFocus: ["si + présent + futur", "si + imparfait + conditionnel", "regla de oro: nunca si + conditionnel"],
  },

  practice: {
    levels: [
      {
        id: "level-1",
        title: "Identifica el tipo de hipótesis",
        tag: "Opción múltiple",
        intro: "Elige el tiempo verbal correcto según el tipo de hipótesis.",
        type: "choice",
        items: [
          {
            scene: "Hipótesis probable (mañana)",
            lines: [["", "Si demain il fait beau, nous ___ au lac."]],
            options: ["irons", "irions", "allons", "serions allés"],
            answer: "irons",
            explain: "Si + présent (fait) → futur simple (irons). Hipótesis real: mañana puede hacer buen tiempo.",
          },
          {
            scene: "Sueño irreal",
            lines: [["", "Si j'étais milliardaire, j'___ le monde entier."]],
            options: ["explorerais", "explorerai", "explore", "aurais exploré"],
            answer: "explorerais",
            explain: "Si + imparfait (étais) → conditionnel présent (explorerais). Hipótesis irreal: no soy millonario.",
          },
          {
            scene: "Irreal pasado",
            lines: [["", "Si tu ___ plus attentif, tu n'aurais pas fait cette erreur."]],
            options: ["avais été", "étais", "serais", "aurais été"],
            answer: "avais été",
            explain: "Irreal pasado: si + plus-que-parfait (avais été) + conditionnel passé (n'aurais pas fait). No fuiste más atento → no habrías cometido el error.",
          },
          {
            scene: "Regla de oro",
            lines: [["", "Si elle ___ le temps, elle viendrait te rendre visite."]],
            options: ["avait", "aurait", "aura", "avait eu"],
            answer: "avait",
            explain: "Si + imparfait (avait) → conditionnel (viendrait). NUNCA: si elle aurait (conditionnel tras si) — error muy común.",
          },
          {
            scene: "Consejo general",
            lines: [["", "Si tu as des doutes, tu ___ lui poser la question directement."]],
            options: ["devrais", "devras", "devrâs", "aurais dû"],
            answer: "devrais",
            explain: "Si + présent (as) → conditionnel (devrais para consejo) o futur. Aquí el conditionnel funciona como consejo: deberías preguntarle.",
          },
          {
            scene: "Identificar el error",
            lines: [["", "Quelle phrase est correcte?"]],
            options: ["Si je pouvais, je t'aiderais.", "Si je pourrais, je t'aiderais.", "Si j'aurais pu, je t'aiderais.", "Si je pourrai, je t'aiderai."],
            answer: "Si je pouvais, je t'aiderais.",
            explain: "Correcta: Si + imparfait (pouvais) + conditionnel (aiderais). Las otras tres usan conditionnel o futur tras si — error de regla de oro.",
          },
          {
            scene: "Vérité générale",
            lines: [["", "Si tu ___ l'eau à zéro degré, elle se transforme en glace."]],
            options: ["refroidis", "refroidiras", "refroidirais", "as refroidi"],
            answer: "refroidis",
            explain: "Vérité générale: si + présent + présent. Los hechos científicos usan présent en ambas partes.",
          },
          {
            scene: "Hipótesis pasada (resultado presente)",
            lines: [["", "Si tu avais pris le bon chemin hier, tu ___ déjà ici."]],
            options: ["serais", "seras", "étais", "serais venu"],
            answer: "serais",
            explain: "Estructura mixta: si + plus-que-parfait (avais pris) → conditionnel présent (serais). El resultado del pasado afecta al presente: serías (estarías) ya aquí ahora.",
          },
        ],
      },
      {
        id: "level-2",
        title: "Completa las hipótesis",
        tag: "2 espacios",
        intro: "Completa la proposición si y la proposición resultado.",
        type: "dual",
        items: [
          {
            scene: "Plan para el fin de semana",
            lines: [["", "Si le match [[0]] annulé, nous [[1]] au restaurant à la place."]],
            blanks: [
              { options: ["est", "était", "sera", "soit"], answer: "est", explain: "Si + présent (est): hipótesis real/probable. El partido puede estar cancelado." },
              { options: ["irons", "irions", "allons", "sommes allés"], answer: "irons", explain: "Si + présent → futur (irons). Resultado probable: iremos al restaurante." },
            ],
          },
          {
            scene: "Sueño de un escritor",
            lines: [["", "Si j'[[0]] plus de temps libre, j'[[1]] un roman."]],
            blanks: [
              { options: ["avais", "ai", "aurai", "aurais"], answer: "avais", explain: "Si + imparfait (avais): hipótesis irreal. No tengo suficiente tiempo libre ahora." },
              { options: ["écrirais", "écrirai", "écris", "aurais écrit"], answer: "écrirais", explain: "Si + imparfait → conditionnel présent (écrirais). Escribiría una novela si tuviera tiempo." },
            ],
          },
          {
            scene: "Arrepentimiento",
            lines: [["", "Si tu [[0]] avant de partir, on [[1]] organiser quelque chose."]],
            blanks: [
              { options: ["avais prévenu", "préviens", "aurais prévenu", "préviendrais"], answer: "avais prévenu", explain: "Si + plus-que-parfait (avais prévenu): irreal pasado. No avisaste antes de partir." },
              { options: ["aurait pu", "pourrait", "peut", "a pu"], answer: "aurait pu", explain: "Si + plus-que-parfait → conditionnel passé (aurait pu). Se podría haber organizado algo (pero no fue posible)." },
            ],
          },
          {
            scene: "Consecuencia de una decisión",
            lines: [["", "Si vous [[0]] cette offre maintenant, vous [[1]] une réduction de 20%."]],
            blanks: [
              { options: ["acceptez", "acceptiez", "accepteriez", "avez accepté"], answer: "acceptez", explain: "Si + présent (acceptez): condición real para el futuro. Si aceptan ahora (es posible)." },
              { options: ["bénéficierez", "bénéficieriez", "bénéficiez", "avez bénéficié"], answer: "bénéficierez", explain: "Si + présent → futur (bénéficierez). Recibirán un descuento del 20%. Hipótesis real." },
            ],
          },
        ],
      },
      {
        id: "level-3",
        title: "Dilemas y sueños",
        tag: "Texto guiado",
        intro: "Completa este texto sobre dilemas cotidianos usando el tiempo verbal correcto.",
        type: "guidedText",
        scene: "Lucas reflexiona sobre su vida actual y sus hipótesis para el futuro.",
        text: "Lucas rêve souvent de changer de vie. Il se dit: 'Si je [[0]] plus courageux, je [[1]] tout pour voyager autour du monde. Mais si je [[2]] mon emploi, comment [[3]]-je mes factures?' Il est aussi nostalgique: 'Si j'[[4]] plus sérieusement à l'université, j'[[5]] peut-être travailler dans la recherche.' Pourtant, il reste optimiste: 'Si j'[[6]] suffisamment d'argent cette année, je [[7]] en Amérique latine l'été prochain. Et si mon projet [[8]] accepté, tout [[9]] possible!'",
        blanks: [
          { options: ["étais", "suis", "serai", "serais"], answer: "étais", explain: "Si + imparfait (étais): irreal presente. No soy lo suficientemente valiente ahora mismo." },
          { options: ["quitterais", "quitterai", "quitte", "aurais quitté"], answer: "quitterais", explain: "Si + imparfait → conditionnel présent (quitterais). Dejaría todo para viajar." },
          { options: ["quitte", "quittais", "quitterais", "ai quitté"], answer: "quitte", explain: "Si + présent (quitte): hipótesis real, posible en el futuro. Si dejo mi trabajo (podría pasar)." },
          { options: ["paierai", "paierais", "paie", "aurais payé"], answer: "paierai", explain: "Si + présent → futur (paierai). ¿Cómo pagaré...? Hipótesis real y su consecuencia futura." },
          { options: ["avais travaillé", "travaillais", "aurais travaillé", "ai travaillé"], answer: "avais travaillé", explain: "Si + plus-que-parfait (avais travaillé): irreal pasado. No estudié lo suficiente en la universidad (hecho pasado)." },
          { options: ["aurais pu", "pourrais", "puis", "pouvais"], answer: "aurais pu", explain: "Si + plus-que-parfait → conditionnel passé (aurais pu). Habría podido trabajar en investigación (pero no fue así)." },
          { options: ["économise", "économisais", "économiserais", "ai économisé"], answer: "économise", explain: "Si + présent (économise): hipótesis real para el futuro. Si ahorro suficiente dinero este año (es posible)." },
          { options: ["partirai", "partirais", "pars", "suis parti"], answer: "partirai", explain: "Si + présent → futur (partirai). Me iré a Latinoamérica. Hipótesis real." },
          { options: ["est", "était", "sera", "serait"], answer: "est", explain: "Si + présent (est): hipótesis real. Si mi proyecto es aceptado (puede ocurrir)." },
          { options: ["deviendra", "deviendrait", "devient", "est devenu"], answer: "deviendra", explain: "Si + présent → futur (deviendra). Todo se volverá posible. Consecuencia futura de una hipótesis real." },
        ],
      },
      {
        id: "level-4",
        title: "Hipótesis correctas",
        tag: "Texto libre",
        intro: "Escribe el tiempo verbal correcto en cada hipótesis.",
        type: "freeText",
        scene: "Completa estas frases condicionales con el tiempo correcto.",
        text: "Si tu [[0]] (travailler) plus régulièrement, tu progresserais davantage. / Si nous [[1]] (partir) tôt demain matin, on arrivera avant midi. / Si elles [[2]] (prévenir) à l'avance, on aurait préparé quelque chose. / Qu'est-ce que tu [[3]] (faire) si tu gagnais à la loterie? / Si le temps le [[4]] (permettre), on ira en randonnée ce week-end.",
        blanks: [
          { answer: "travaillais", accepted: ["travaillais"], explain: "Si + imparfait → conditionnel présent (progresserais). Hipótesis irreal presente: no trabajas regularmente ahora." },
          { answer: "partons", accepted: ["partons", "partez"], explain: "Si + présent (partons) → futur (arrivera). Hipótesis real: podemos salir temprano mañana." },
          { answer: "avaient prévenu", accepted: ["avaient prévenu"], explain: "Si + plus-que-parfait (avaient prévenu) → conditionnel passé (aurait préparé). Irreal pasado: no avisaron." },
          { answer: "ferais", accepted: ["ferais"], explain: "Si + imparfait (gagnais implícito) → conditionnel (ferais). Qu'est-ce que tu ferais si... Hipótesis irreal." },
          { answer: "permet", accepted: ["permet"], explain: "Si + présent (permet) → futur (ira). Hipótesis real: el tiempo puede permitirlo este fin de semana." },
        ],
      },
      {
        id: "level-5",
        title: "Producción: crea hipótesis",
        tag: "Producción",
        intro: "Escribe frases condicionales completas según las instrucciones.",
        type: "write",
        items: [
          {
            scene: "Hipótesis real (probable)",
            prompt: "Escribe una hipótesis real: si estudias mucho, tendrás éxito en el examen.",
            answer: "Si tu étudies beaucoup, tu réussiras l'examen.",
            accepted: ["Si tu étudies", "si vous étudiez", "futur simple"],
            explain: "Si + présent (étudies) + futur (réussiras). Hipótesis real: es posible estudiar mucho.",
          },
          {
            scene: "Sueño irreal",
            prompt: "Escribe un sueño irreal: si tuvieras superpoderes, qué harías.",
            answer: "Si j'avais des superpouvoirs, je protégerais les gens en danger.",
            accepted: ["Si j'avais", "si tu avais", "conditionnel présent"],
            explain: "Si + imparfait (avais) + conditionnel (protégerais). Irreal: no tenemos superpoderes.",
          },
          {
            scene: "Arrepentimiento pasado",
            prompt: "Expresa un arrepentimiento: si hubieras llegado antes, habrías visto el espectáculo.",
            answer: "Si tu étais arrivé plus tôt, tu aurais vu le spectacle.",
            accepted: ["Si tu étais arrivé", "Si vous étiez arrivé", "conditionnel passé"],
            explain: "Si + plus-que-parfait (étais arrivé) + conditionnel passé (aurais vu). Irreal pasado: no llegaste a tiempo.",
          },
          {
            scene: "Regla de oro",
            prompt: "Corrige esta frase incorrecta y explica: 'Si je voudrais venir, je te le dirais.'",
            answer: "Si je voulais venir, je te le dirais. (Nunca condicionnel tras si hipotético.)",
            accepted: ["Si je voulais venir", "voulais"],
            explain: "NUNCA conditionnel après si hipotético. Si je voulais (imparfait) → je te le dirais (conditionnel présent). ✓",
          },
        ],
      },
      {
        id: "level-6",
        title: "Misión: el juego de las hipótesis",
        tag: "Producción libre",
        intro: "Escribe 3 frases condicionales sobre diferentes temas usando los tres tipos de hipótesis.",
        type: "write",
        items: [
          {
            scene: "Hipótesis real (futuro)",
            prompt: "Escribe sobre un plan para el verano usando si + présent + futur.",
            answer: "Si j'obtiens une promotion cette année, je prendrai de vraies vacances cet été.",
            accepted: ["Si j'obtiens", "si tu obtiens", "présent + futur"],
            explain: "Si + présent (obtiens) → futur (prendrai). La condición es real y posible: puede obtener la promoción.",
          },
          {
            scene: "Sueño irreal (presente)",
            prompt: "Imagina que vives en otro país. Usa si + imparfait + conditionnel.",
            answer: "Si j'habitais au Japon, j'apprendrais le japonais et je découvrirais une culture fascinante.",
            accepted: ["Si j'habitais", "si tu habitais", "imparfait + conditionnel"],
            explain: "Si + imparfait (habitais) → conditionnel (apprendrais / découvrirais). Irreal: no vivo en Japón.",
          },
          {
            scene: "Irreal pasado (arrepentimiento)",
            prompt: "Expresa un arrepentimiento real usando si + plus-que-parfait + conditionnel passé.",
            answer: "Si j'avais écouté mes parents, j'aurais évité beaucoup d'erreurs de jeunesse.",
            accepted: ["Si j'avais écouté", "plus-que-parfait + conditionnel passé"],
            explain: "Si + plus-que-parfait (avais écouté) → conditionnel passé (aurais évité). El hecho no ocurrió en el pasado.",
          },
        ],
      },
    ],
  },
}

export default topic
