import { ESSAY_TYPES } from '../introduccion/introduction-data';

/**
 * Párrafos de cuerpo — TEEL: los ejercicios, el ejemplo resuelto y el diagnóstico.
 *
 * LO QUE SE MIDIÓ ANTES DE REESCRIBIR
 *
 *   · El «diagnóstico» tenía cuatro items y los CUATRO eran problemas reales. El campo
 *     `correct` existía y no lo leía nadie. Pulsando los cuatro botones salía «¡Excelente,
 *     identificaste los 4 problemas!». No diagnosticaba nada: premiaba pulsar.
 *   · El botón de ensamblar se bloqueaba por debajo de quince caracteres por caja, sin decir
 *     que existía un mínimo ni cuánto faltaba.
 *   · Once menciones de banda, incluida la que rotulaba el párrafo modelo, sobre un texto
 *     que la página no lee y no puede puntuar.
 *   · Los colores del diagnóstico salían de un array indexado por posición, así que reordenar
 *     los items descolocaba las etiquetas T/E/E/L.
 *
 * AHORA EL DIAGNÓSTICO SE PUEDE FALLAR
 *
 * Siete observaciones sobre el mismo párrafo: cuatro son defectos y tres son quejas
 * plausibles que NO lo son. Marcarlo todo ya no aprueba. Las tres falsas están elegidas a
 * propósito porque son lo que un estudiante dice cuando mira un párrafo flojo y no sabe qué
 * mirar: que es corto, que no toma partido, que le faltan conectores.
 */

/** Los planes de Body 1 y Body 2 salen de la tabla de tipos, no de una copia. */
export const BODY_PLANS = ESSAY_TYPES.map((type) => ({
  id: type.id,
  label: type.shortLabel,
  bodyOne: type.bodyOne,
  bodyTwo: type.bodyTwo,
}));

export type TeelBlock = {
  part: 'T' | 'E1' | 'E2' | 'L';
  label: string;
  text: string;
  /** Qué trabajo hace ESTE bloque. Se lee antes de escribir, no después. */
  job: string;
};

/** Watch one: un párrafo completo, bloque a bloque, antes de escribir ninguno. */
export const WORKED_EXAMPLE: {
  prompt: string;
  blocks: TeelBlock[];
  weakVersion: string;
  whatChanged: string[];
} = {
  prompt: 'Governments should invest more in public transport than in road construction. To what extent do you agree?',
  blocks: [
    {
      part: 'T',
      label: 'Topic sentence',
      text: 'Public transport represents a dramatically more efficient use of urban infrastructure than private vehicles.',
      job: 'Names the one claim this paragraph will prove. A reader should be able to predict what the next three sentences are for.',
    },
    {
      part: 'E1',
      label: 'Explanation',
      text: 'A single articulated bus carries up to 120 passengers while occupying the road space of three or four cars, so every passenger moved by bus frees capacity that would otherwise be filled by another vehicle.',
      job: 'Explains the mechanism — how the claim actually works. Not another way of saying the claim.',
    },
    {
      part: 'E2',
      label: 'Example',
      text: 'Singapore\'s Land Transport Authority reported that its mass rapid transit expansion reduced private car use by 28% between 2010 and 2022, handling 3.4 million journeys a day.',
      job: 'One named case with figures. A country name on its own proves nothing; the number is what makes it evidence.',
    },
    {
      part: 'L',
      label: 'Link',
      text: 'That measured shift is why sustained investment in mass transit delivers more usable road capacity per pound spent than building new roads does.',
      job: 'Ties the evidence back to the essay\'s position. It closes the paragraph; it does not open a new topic.',
    },
  ],
  weakVersion:
    'Public transport is more efficient than cars. When more people use buses and trains, there are fewer cars on the road. This means less traffic. For example, Singapore has a good transport system. This shows that public transport is better.',
  whatChanged: [
    'The claim moved from “more efficient” to “more efficient use of urban infrastructure” — efficient at what, and compared with what.',
    'The explanation stopped restating the claim. “Fewer cars means less traffic” is the claim again; 120 passengers in the space of four cars is the mechanism.',
    'The example gained a source, a percentage and a date. “Singapore has a good system” is an opinion about Singapore, not evidence.',
    'The final sentence stopped being circular. “This shows public transport is better” proves nothing; the rewrite says what the evidence buys.',
  ],
};

export type BodyDrill = {
  id: string;
  family: string;
  role: string;
  prompt: string;
  topicSentence: string;
  fields: {
    part: 'E1' | 'E2' | 'L';
    label: string;
    /** Qué hay que escribir, en una instrucción que se puede seguir. */
    ask: string;
    minWords: number;
    model: string;
  }[];
};

export const BODY_DRILLS: BodyDrill[] = [
  {
    id: 'transport',
    family: 'Opinion',
    role: 'Body 1 · the main reason',
    prompt: 'Governments should invest more in public transport than in roads. To what extent do you agree?',
    topicSentence: 'Public transport represents a dramatically more efficient use of urban infrastructure than private vehicle networks.',
    fields: [
      {
        part: 'E1',
        label: 'Explanation',
        ask: 'Explain the mechanism. Why is it more efficient? Use a comparison or a number — and do not name a country yet.',
        minWords: 20,
        model: 'A single articulated bus carries up to 120 passengers while occupying the space of only three or four cars, so investing in bus fleets reduces congestion proportionally while cutting emissions per passenger.',
      },
      {
        part: 'E2',
        label: 'Example',
        ask: 'Give one named case with figures: a city, an authority or a study, plus what it measured.',
        minWords: 20,
        model: 'Singapore\'s Land Transport Authority reported that its mass rapid transit expansion reduced private car usage by 28% between 2010 and 2022, handling 3.4 million daily journeys.',
      },
      {
        part: 'L',
        label: 'Link',
        ask: 'Close the paragraph by saying what that evidence buys for your position. Do not introduce a new idea.',
        minWords: 15,
        model: 'That measured reduction is why sustained investment in mass transit delivers more usable capacity per pound of public money than road expansion does.',
      },
    ],
  },
  {
    id: 'advertising',
    family: 'Opinion',
    role: 'Body 2 · concede, then rebut',
    prompt: 'Advertising aimed at children should be banned. To what extent do you agree?',
    topicSentence: 'Admittedly, a total ban on children\'s advertising would restrict commercial activity, yet that objection misunderstands the imbalance between advertisers and young audiences.',
    fields: [
      {
        part: 'E1',
        label: 'Explanation',
        ask: 'Say why the objection is not enough to defeat your position. What exactly does it fail to account for?',
        minWords: 20,
        model: 'Children below roughly eight lack the cognitive development to distinguish promotional content from information, which makes them vulnerable to commercial persuasion in a way adult consumers are not.',
      },
      {
        part: 'E2',
        label: 'Example',
        ask: 'Give evidence of that vulnerability: a study, a figure or a documented case.',
        minWords: 20,
        model: 'Research summarised by the American Psychological Association found that children under seven cannot identify the persuasive intent of an advertisement at all, and that most children aged eight to twelve report wanting an advertised product within a day of seeing it.',
      },
      {
        part: 'L',
        label: 'Link',
        ask: 'Explain why, given that evidence, the objection does not change your answer.',
        minWords: 15,
        model: 'Set against a documented inability to recognise persuasion, the commercial cost of restricting these advertisements is the smaller of the two harms, which is why the objection does not change the case for a ban.',
      },
    ],
  },
  {
    id: 'ability-grouping',
    family: 'Discussion',
    role: 'Body 1 · present the first view',
    prompt: 'Some think schools should group students by ability. Others believe mixed-ability classes are better. Discuss both views and give your own opinion.',
    topicSentence: 'Proponents of ability grouping argue that streaming students by academic level lets teachers pitch instruction precisely at the group in front of them.',
    fields: [
      {
        part: 'E1',
        label: 'Explanation',
        ask: 'Explain how teaching actually improves when a class shares a level. Present the view fairly — this is not your opinion yet.',
        minWords: 20,
        model: 'When every student in a room shares a starting point, a teacher can hold one pace and one level of complexity, instead of simultaneously leaving the fastest unchallenged and the slowest behind.',
      },
      {
        part: 'E2',
        label: 'Example',
        ask: 'Give one education system or study where grouping produced a measured result.',
        minWords: 20,
        model: 'In the United Kingdom, setting in secondary mathematics has been linked to higher attainment among already high-achieving students, with Education Endowment Foundation work reporting roughly three months of additional progress for that group.',
      },
      {
        part: 'L',
        label: 'Link',
        ask: 'Close this view without settling the debate — your verdict belongs in the conclusion.',
        minWords: 15,
        model: 'For certain subjects and age groups, then, grouping has a measurable benefit for the students at the top, which is why the argument for streaming is not easily dismissed.',
      },
    ],
  },
  {
    id: 'obesity-causes',
    family: 'Problem & solution',
    role: 'Body 1 · the cause',
    prompt: 'Obesity rates have risen sharply in many countries. What are the main causes, and what can be done?',
    topicSentence: 'One of the largest drivers of rising obesity is the collapse in habitual physical activity built into modern daily life.',
    fields: [
      {
        part: 'E1',
        label: 'Explanation',
        ask: 'Explain the causal chain. How does a sedentary day become weight gain? “People move less” is the claim, not the mechanism.',
        minWords: 20,
        model: 'As desk work replaced manual labour and screens replaced outdoor leisure, average daily energy expenditure fell while intake did not, leaving a small chronic surplus that the body stores over years.',
      },
      {
        part: 'E2',
        label: 'Example',
        ask: 'Give a figure that measures the fall in activity or its health cost.',
        minWords: 20,
        model: 'The World Health Organisation attributes a significant share of the global burden of non-communicable disease to physical inactivity, and adults in high-income countries now average well under half the recommended daily minutes of moderate activity.',
      },
      {
        part: 'L',
        label: 'Link',
        ask: 'Connect this cause to what the essay will propose, without proposing it yet.',
        minWords: 15,
        model: 'Because the inactivity is built into how people work and rest rather than chosen day by day, any effective response has to change that structure rather than simply urge people to exercise.',
      },
    ],
  },
  {
    id: 'obesity-solutions',
    family: 'Problem & solution',
    role: 'Body 2 · the response',
    prompt: 'Obesity rates have risen sharply in many countries. What are the main causes, and what can be done?',
    topicSentence: 'The most effective government response would pair a levy on ultra-processed food with investment in recreational space that is free to use.',
    fields: [
      {
        part: 'E1',
        label: 'Explanation',
        ask: 'Explain how BOTH halves work. Two measures means two mechanisms — do not explain only the tax.',
        minWords: 25,
        model: 'A levy on sugar and saturated fat raises the relative price of the least nutritious options, which moves both manufacturers and shoppers; free parks, cycle lanes and sports halls remove the cost and distance that keep lower-income households from exercising at all.',
      },
      {
        part: 'E2',
        label: 'Example',
        ask: 'Give evidence that at least one of the two measures has worked somewhere.',
        minWords: 20,
        model: 'After the United Kingdom introduced its Soft Drinks Industry Levy in 2018, manufacturers reformulated a majority of affected products and average sugar content fell by roughly a quarter, without the industry losses that had been predicted.',
      },
      {
        part: 'L',
        label: 'Link',
        ask: 'Tie the response back to the exact cause you diagnosed in Body 1.',
        minWords: 15,
        model: 'Together these measures act on the structure identified earlier: they make the least nutritious choice more expensive and the active one available, which is where a decision about diet is actually made.',
      },
    ],
  },
];

export type Observation = {
  id: string;
  part: 'T' | 'E1' | 'E2' | 'L' | '—';
  claim: string;
  /** `true` = es un defecto real del párrafo. `false` = queja plausible que no lo es. */
  real: boolean;
  why: string;
};

/**
 * El diagnóstico. Cuatro observaciones son defectos y tres no lo son.
 *
 * Las tres falsas no están puestas para engañar: son exactamente lo que dice un estudiante
 * cuando ve un párrafo flojo y no sabe qué mirar —que es corto, que no toma partido, que le
 * faltan conectores—. Aprender a descartarlas es la mitad del ejercicio.
 */
export const DIAGNOSTIC: { paragraph: string; observations: Observation[]; rebuilt: string } = {
  paragraph:
    'Climate change is a serious problem for the environment. Many scientists have said this is happening. There are lots of effects like flooding and droughts. This is very bad for people all over the world. Governments should do something about it.',
  observations: [
    {
      id: 'vague-topic',
      part: 'T',
      claim: 'The opening sentence does not say what this paragraph will argue.',
      real: true,
      why: '“Climate change is a serious problem” could open any paragraph in any essay on the topic. Nothing in it predicts what the next four sentences are for, so the reader has no idea what is being proved.',
    },
    {
      id: 'no-mechanism',
      part: 'E1',
      claim: 'The second sentence points at authority instead of explaining anything.',
      real: true,
      why: '“Many scientists have said this is happening” tells us who agrees, not how anything works. The explanation slot is where the causal chain goes — what produces what, and why.',
    },
    {
      id: 'unmeasured-example',
      part: 'E2',
      claim: 'The example names effects but never measures them.',
      real: true,
      why: '“Flooding and droughts” is a category, not evidence. An example does its job when it carries a source, a figure and a period — how much, where, and over how long.',
    },
    {
      id: 'link-opens-topic',
      part: 'L',
      claim: 'The last sentence opens a new subject instead of closing this one.',
      real: true,
      why: '“Governments should do something about it” starts an argument about policy that this paragraph has not prepared and will not develop. The final sentence has to spend the evidence just given, not introduce the next essay.',
    },
    {
      id: 'too-short',
      part: '—',
      claim: 'The paragraph is too short.',
      real: false,
      why: 'It is five sentences, which is a normal length. Length is not what fails here: adding two more sentences of the same kind would make it longer and no better. What fails is what each sentence does.',
    },
    {
      id: 'no-position',
      part: '—',
      claim: 'The writer never says which side of the argument they are on.',
      real: false,
      why: 'A body paragraph is not where the position is stated — that belongs to the introduction and the conclusion. This paragraph fails because it develops nothing, not because it withholds an opinion.',
    },
    {
      id: 'no-connectors',
      part: '—',
      claim: 'There are no linking words such as “furthermore” or “however”.',
      real: false,
      why: 'True, and it changes nothing. Drop three connectors into these five sentences and they still say the same empty thing. Connectors mark a relationship between ideas; they cannot supply one.',
    },
  ],
  rebuilt:
    'One of the most damaging consequences of a warming atmosphere is the sharp rise in extreme rainfall. Warmer air holds roughly seven per cent more water vapour for every degree of warming, so the same storm now arrives carrying more water to drop in one place. Pakistan\'s 2022 floods, which followed rainfall almost three times the August average, put a third of the country under water and displaced eight million people. A single season that removes a third of a country from use is the scale of disruption that makes early adaptation cheaper than late repair.',
};
