import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'si-conditionnel',
  order: '13',
  color: '#1a2ecc',
  category: 'Condicional',
  level: 'A2',
  title: 'Condicional en francés A2: si + imparfait + conditionnel présent',
  shortTitle: 'Si + condicionnel',
  metaTitle: 'Condicional francés A2 — si + imparfait + conditionnel présent, irréel du présent',
  description:
    'El condicional irreal del presente en francés usa la estructura: si + imparfait + conditionnel présent. Expresa hipótesis o situaciones contrarias a la realidad actual. El conditionnel présent se forma con el infinitivo + terminaciones del imparfait: -ais/-ais/-ait/-ions/-iez/-aient. Verbos irregulares: être → ser-, avoir → aur-, aller → ir-, faire → fer-, pouvoir → pourr-, vouloir → voudr-.',
  lead: 'Si j\'avais le temps, je voyagerais: la hipótesis irreal con si + imparfait + conditionnel.',
  outcomes: [
    'Formar el conditionnel présent de verbos regulares e irregulares',
    'Construir hipótesis irreales con si + imparfait + conditionnel',
    'Distinguir el condicional real (si + présent) del irreal',
    'Usar el condicional para expresar deseos y sugerencias',
  ],

  guide: {
    goal: 'Expresar hipótesis irreales usando si + imparfait + conditionnel présent.',
    model: 'Si j\'avais de l\'argent, j\'achèterais une voiture. (Si tuviera dinero, compraría un coche.) / Si tu venais, nous serions très contents. (Si vinieras, estaríamos muy contentos.)',
    formula: 'si + imparfait → conditionnel présent | conditionnel = infinitif + -ais/-ais/-ait/-ions/-iez/-aient',
    decisions: [
      'Hipótesis irreal: si + imparfait, + conditionnel → "Si j\'étais riche, je voyagerais"',
      'Hipótesis real: si + présent, + futur → "Si j\'ai le temps, je viendrai"',
      'Irregulares: être → ser- | avoir → aur- | aller → ir- | faire → fer-',
      'Deseo/sugerencia: conditionnel solo → "Je voudrais un café" / "Tu devrais partir"',
      'NUNCA: "si + conditionnel" ❌ → la cláusula con si siempre lleva imparfait',
    ],
    table: [
      ['Tipo', 'Estructura', 'Ejemplo'],
      ['Irreal (hypothèse)', 'si + imparfait + conditionnel', 'Si j\'avais le temps, je lirais'],
      ['Real (possible)', 'si + présent + futur', 'Si j\'ai le temps, je lirai'],
      ['Deseo', 'conditionnel solo', 'Je voudrais partir en vacances'],
    ],
    mistakes: [
      '"Si j\'aurais de l\'argent" ❌ → "Si j\'avais de l\'argent" ✓ — après si → imparfait, NUNCA conditionnel.',
      '"Si je serais là, je t\'aiderais" ❌ → "Si j\'étais là, je t\'aiderais" ✓ — être: imparfait = étais.',
      '"Si je fais, je ferai" ✓ (real) vs "Si je faisais, je ferais" ✓ (irreal) — distinción clave.',
    ],
  },

  seo: [
    {
      heading: 'Si + imparfait + conditionnel: la hipótesis irreal',
      paragraphs: [
        'En francés, para expresar una situación hipotética o contraria a la realidad actual, se usa: si + imparfait, + conditionnel présent. "Si j\'étais millionnaire, je ferais le tour du monde" (Si fuera millonario, haría la vuelta al mundo). La cláusula con si lleva imparfait, la consecuencia lleva conditionnel.',
        'El orden puede invertirse sin cambiar el significado: "Je ferais le tour du monde si j\'étais millionnaire." La regla clave: NUNCA conditionnel directamente después de si — siempre imparfait después de si.',
      ],
    },
    {
      heading: 'Formación del conditionnel présent',
      paragraphs: [
        'El conditionnel présent se forma con el infinitivo (como el futur simple) + terminaciones del imparfait: -ais, -ais, -ait, -ions, -iez, -aient. Verbos regulares: parler → je parlerais, manger → je mangerais, finir → je finirais. Para verbos en -re: prendre → je prendrais (se quita la -e final).',
        'Irregulares más importantes (misma raíz que el futuro irregular): être → serais, avoir → aurais, aller → irais, faire → ferais, pouvoir → pourrais, vouloir → voudrais, devoir → devrais, venir → viendrais, savoir → saurais.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'si + imparfait → conditionnel. Irregulares: ser-/aur-/ir-/fer-.',
    graphicPrompt: 'Camino bifurcado: realidad vs hipótesis. "Si..." con lupa.',
    scene: [
      ['Si j\'avais le temps, je voyagerais plus.', 'Si tuviera tiempo, viajaría más.'],
      ['Si tu travaillais plus, tu réussirais.', 'Si trabajaras más, tendrías éxito.'],
      ['Si nous avions une voiture, ce serait plus facile.', 'Si tuviéramos un coche, sería más fácil.'],
      ['Si elle habitait ici, je la verrais souvent.', 'Si viviera aquí, la vería a menudo.'],
      ['Je voudrais un café, s\'il vous plaît.', 'Querría un café, por favor.'],
      ['Tu devrais te reposer un peu.', 'Deberías descansar un poco.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['si + imparfait + conditionnel', 'ser-/aur-/ir-/fer-', 'voudrais/devrais/pourrais', 'NUNCA si + conditionnel'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta del conditionnel',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del conditionnel présent.',
        type: 'choice',
        items: [
          {
            scene: 'Si j\'avais de l\'argent, je ___ (acheter) une maison.',
            lines: [['', 'Si j\'avais de l\'argent, je ___ une maison.']],
            options: ['achèterais', 'achèterai', 'achetais', 'achète'],
            answer: 'achèterais',
            explain: '"j\'achèterais" — conditionnel: acheter → achèter- + -ais.',
          },
          {
            scene: 'Si tu venais, nous ___ (être) contents.',
            lines: [['', 'Si tu venais, nous ___ très contents.']],
            options: ['serions', 'sommes', 'étions', 'serons'],
            answer: 'serions',
            explain: '"nous serions" — être irregular: ser- + -ions.',
          },
          {
            scene: 'Si elle avait le temps, elle ___ (faire) du sport.',
            lines: [['', 'Si elle avait le temps, elle ___ du sport.']],
            options: ['ferait', 'faisait', 'fait', 'fera'],
            answer: 'ferait',
            explain: '"elle ferait" — faire irregular: fer- + -ait.',
          },
          {
            scene: 'Si vous pouviez, ___ (aller) -vous en France ?',
            lines: [['', 'Si vous pouviez, ___ vous en France ?']],
            options: ['iriez', 'alliez', 'irez', 'allez'],
            answer: 'iriez',
            explain: '"iriez" — aller irregular en conditionnel: ir- + -iez.',
          },
          {
            scene: 'Je ___ (vouloir) un café, s\'il vous plaît.',
            lines: [['', 'Je ___ un café, s\'il vous plaît.']],
            options: ['voudrais', 'veux', 'voulais', 'voudrai'],
            answer: 'voudrais',
            explain: '"je voudrais" — vouloir irregular: voudr- + -ais. Uso: petición cortés.',
          },
          {
            scene: 'Si j\'___ (avoir) su, je serais venu.',
            lines: [['', 'Si j\'___ su, je serais venu.']],
            options: ['avais', 'aurais', 'ai', 'aurai'],
            answer: 'avais',
            explain: '"Si j\'avais su" — después de si → SIEMPRE imparfait. NUNCA "si j\'aurais".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Si y sus dos partes',
        tag: '2 espacios',
        intro: 'Completa la frase condicional con imparfait y conditionnel.',
        type: 'dual',
        items: [
          {
            scene: 'Si je/avoir - je/voyager (irreal).',
            lines: [['', 'Si j\'[[0]] plus de temps libre, je [[1]] davantage.']],
            blanks: [
              { options: ['avais', 'aurais', 'ai', 'aurai'], answer: 'avais', explain: '"si j\'avais" — après si → imparfait de avoir (avais).' },
              { options: ['voyagerais', 'voyagerai', 'voyage', 'voyageais'], answer: 'voyagerais', explain: '"je voyagerais" — conditionnel: voyager + -ais.' },
            ],
          },
          {
            scene: 'Si elle/habiter - elle/prendre (irreal).',
            lines: [['', 'Si elle [[0]] à Paris, elle [[1]] le métro tous les jours.']],
            blanks: [
              { options: ['habitait', 'habiterait', 'habite', 'habitera'], answer: 'habitait', explain: '"si elle habitait" — après si → imparfait (habitait).' },
              { options: ['prendrait', 'prenait', 'prend', 'prendra'], answer: 'prendrait', explain: '"elle prendrait" — conditionnel: prendre → prendr- + -ait.' },
            ],
          },
          {
            scene: 'Si nous/pouvoir - nous/partir (irreal).',
            lines: [['', 'Si nous [[0]] partir tôt, nous [[1]] moins dans les embouteillages.']],
            blanks: [
              { options: ['pouvions', 'pourrions', 'pouvons', 'pourrons'], answer: 'pouvions', explain: '"si nous pouvions" — après si → imparfait (pouvions).' },
              { options: ['serions', 'étions', 'sommes', 'serons'], answer: 'serions', explain: '"nous serions" — être: ser- + -ions.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La vida ideal',
        tag: 'Texto guiado',
        intro: 'Completa las hipótesis sobre la vida ideal.',
        type: 'guidedText',
        scene: 'Pierre imagine sa vie idéale.',
        text: 'Si je [[0]] plus d\'argent, je [[1]] une grande maison. J\'[[0]] aussi une belle voiture. Si mes amis [[2]] du temps, nous [[1]] souvent en voyage. Ce [[3]] magnifique ! Et si je [[0]] en bonne santé, je [[1]] du sport tous les jours.',
        blanks: [
          { options: ['avais', 'aurais', 'ai', 'aurai'], answer: 'avais', explain: '"si j\'avais / si j\'avais" — après si → imparfait (avais).' },
          { options: ['achèterais', 'achèterai', 'achetais', 'achète'], answer: 'achèterais', explain: '"j\'achèterais / nous partirions / je ferais" — conditionnel.' },
          { options: ['avaient', 'auraient', 'ont', 'auront'], answer: 'avaient', explain: '"si mes amis avaient" — après si → imparfait (avaient, 3ª pl).' },
          { options: ['serait', 'était', 'est', 'sera'], answer: 'serait', explain: '"ce serait" — être: ser- + -ait (conditionnel).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa el condicional',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta (imparfait o conditionnel).',
        type: 'freeText',
        scene: 'Complétez avec la forme correcte.',
        text: 'Si tu ___ (avoir) une baguette magique, que ferais-tu ? / Si nous ___ (être) à Paris, nous ___ (visiter) le Louvre. / Elle ___ (devoir) travailler moins si elle ___ (pouvoir).',
        blanks: [
          { answer: 'avais', explain: '"si tu avais" — après si → imparfait (avais).' },
          { answer: 'étions', explain: '"si nous étions" — être imparfait: étions.' },
          { answer: 'visiterions', explain: '"nous visiterions" — conditionnel: visiter + -ions.' },
          { answer: 'devrait', explain: '"elle devrait" — devoir: devr- + -ait.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye hipótesis',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase condicional completa.',
        type: 'write',
        items: [
          {
            scene: 'Si tuvieras más tiempo, ¿qué harías?',
            prompt: 'Usa "si + imparfait (avoir) + conditionnel (faire)".',
            answer: 'Si j\'avais plus de temps, je ferais du sport.',
            accepted: ['Si j\'avais du temps libre, je lirais davantage.'],
            explain: '"si j\'avais" (imparfait) + "je ferais" (conditionnel: fer- + -ais).',
          },
          {
            scene: 'Querría un té, por favor.',
            prompt: 'Usa el conditionnel de vouloir como petición cortés.',
            answer: 'Je voudrais un thé, s\'il vous plaît.',
            accepted: ['Je voudrais un thé, s\'il te plaît.'],
            explain: '"je voudrais" — conditionnel de vouloir: voudr- + -ais. Petición cortés.',
          },
          {
            scene: 'Si fuera ella, no diría nada.',
            prompt: 'Usa "si + imparfait (être) + conditionnel (ne pas dire)".',
            answer: 'Si j\'étais elle, je ne dirais rien.',
            accepted: ['Si j\'étais à sa place, je ne dirais rien.'],
            explain: '"si j\'étais" (être: étais) + "je ne dirais rien" (dire: dir- + -ais + rien).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu vida ideal en condicional',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tu vida ideal usando si + imparfait + conditionnel.',
        type: 'write',
        items: [
          {
            scene: 'Si pudieras cambiar algo en tu vida, ¿qué harías?',
            prompt: 'Écrivez 3 phrases avec "si + imparfait + conditionnel".',
            answer: 'Si j\'avais plus d\'argent, j\'achèterais un appartement en ville. Si je parlais mieux l\'espagnol, je vivrais en Amérique Latine. Si j\'avais le choix, je travaillerais moins.',
            accepted: ['Si je pouvais, je voyagerais partout. Si j\'habitais à la mer, je nagerais tous les jours. Si j\'étais plus courageux, je changerais de travail.'],
            explain: 'après si → imparfait; conséquence → conditionnel (-ais/-ait/-ions/-iez/-aient).',
          },
          {
            scene: 'Escribe 2 peticiones corteses usando el conditionnel.',
            prompt: 'Utilisez "je voudrais / pourriez-vous / tu devrais" pour des requêtes polies.',
            answer: 'Je voudrais réserver une table pour deux personnes. Pourriez-vous m\'aider, s\'il vous plaît ? Tu devrais appeler avant de venir.',
            accepted: ['Je voudrais parler au directeur. Pourriez-vous répéter plus lentement ? Vous devriez essayer ce restaurant.'],
            explain: 'voudrais / pourriez / devrais = conditionnel solo para cortesía y consejos.',
          },
        ],
      },
    ],
  },
}

export default topic
