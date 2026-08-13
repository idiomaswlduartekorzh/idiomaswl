/**
 * El vocabulario de Academic Writing Task 1, por subparte.
 *
 * Seis unidades, una por cada cosa que hay que escribir delante de un gráfico: la
 * introducción, el resumen general, las tendencias, las comparaciones, los procesos y los
 * mapas. Es el mismo reparto que ya tiene el curso de Task 1, así que quien esté haciendo la
 * unidad de tendencias encuentra aquí exactamente las palabras de tendencias.
 *
 * POR QUÉ AGRUPADAS POR TRABAJO Y NO EN LISTA
 *
 * Una lista de cuarenta verbos de cambio es un diccionario corto: se lee, se asiente y no se
 * usa. Agrupadas por lo que hacen —subida, bajada, tamaño del cambio, velocidad del cambio—
 * se pueden consultar mientras escribes, que es el único momento en que el vocabulario sirve.
 * Y el reparto en cuatro grupos enseña algo que ninguna lista enseña: que «sharply» y
 * «rapidly» no son sinónimos. Uno dice cuánto y el otro dice cuán rápido.
 *
 * TODAS LAS ENTRADAS LLEVAN SU PATRÓN
 *
 * Es la regla del superhub. «Peak» es el verbo que más se usa mal en Task 1 —«peaked at 40%»,
 * nunca «peaked to»— y la palabra sin su preposición no sirve de nada.
 */

import type { VocabUnit } from './vocabulary-types';

export const TASK1_UNITS: VocabUnit[] = [
  // ── 1 · La introducción ────────────────────────────────────────────────────
  {
    slug: 'task1-introduccion',
    label: 'Task 1 introduction',
    spanishName: 'Vocabulario para la introducción de Task 1',
    seoTitle: 'Vocabulario para la introducción de IELTS Task 1: illustrate, depict, compare',
    seoDescription: 'Verbos y frases para introducir un gráfico en IELTS Task 1 sin copiar el título. Illustrate, depict, compare, y cómo nombrar el periodo y las unidades. Con ejercicios.',
    family: 'task1',
    job: 'it restates what the visual shows, without reusing the words printed above it',
    whenToUse: 'The first sentence of every Task 1 response. It is also the sentence most likely to be copied straight from the paper, which is why it needs its own vocabulary: the label above the chart is not yours, and words taken from it are not counted as your language.',
    tone: 'prompt',
    explainer: {
      definition: 'The opening sentence of a Task 1 response says what the visual is, what it shows, and over what period — in words that are not the ones printed above it.',
      sections: [
        {
          heading: 'Why this one sentence has its own vocabulary',
          body: [
            'Every Task 1 paper hands you a title, and every title is a trap. It is right there, it is accurate, and copying it produces a first sentence that took no effort and earns no credit: words lifted from the question paper are not counted as your language. A response can therefore open with a perfectly true sentence that contributes nothing at all to the assessment.',
            'What makes this fixable is that the sentence only ever does three jobs. It names the visual, it says what the visual does with its data, and it frames the period or the categories. Three jobs means three small sets of words, and those sets are almost entirely predictable — which is why this is the cheapest vocabulary in the whole exam to learn and the most reliably rewarded.',
            'The one thing that must not move is the data itself. Figures, units, years and place names are copied deliberately and correctly. Paraphrasing “54%” is not vocabulary work; it is inventing data.',
          ],
          points: [
            { term: 'Name the visual', detail: '“line graph”, “bar chart”, “table”, “process diagram”. Use the right one — a bar chart is not a graph in an examiner’s reading.' },
            { term: 'Say what it does', detail: '“illustrates”, “compares”, “gives information about”. This is where the title’s verb gets replaced.' },
            { term: 'Frame the period', detail: '“between 1990 and 2020”, “over a twenty-year period”. Years stay; the framing around them changes.' },
            { term: 'Never paraphrase data', detail: 'Figures, units and proper nouns are copied exactly. Rewriting them invents numbers the chart does not contain.' },
          ],
        },
        {
          heading: 'What a good opening is not',
          body: [
            'It is not an overview. The introduction says what the visual is; the overview says what it shows. Merging them costs you the overview, which is the single most heavily weighted feature of a Task 1 response, and it is a mistake that looks like efficiency while you are making it.',
            'It is also not a place for judgement. “The graph shows a worrying rise in obesity” has added a word the chart cannot support. Task 1 reports; it does not evaluate.',
          ],
        },
      ],
      cost: 'A copied first sentence is a sentence the examiner cannot count towards your Lexical Resource, and it is the first thing they read. It also sets the tone for the response: a paper that opens by repeating the title tends to keep repeating it, and the word-count target then gets met with the paper’s own words rather than yours.',
      limits: 'Do not paraphrase what is data. Years, figures, units, currencies and proper nouns stay exactly as printed — a “paraphrase” that turns 2015 into “the mid-2010s” or £ into dollars has changed the chart. And do not stretch this into two or three sentences: the introduction is one sentence, and the space belongs to the overview.',
    },
    upgrade: {
      vague: 'The graph shows the number of people who visited the museum from 2010 to 2020.',
      precise: 'The line graph illustrates museum attendance over a ten-year period, from 2010 to 2020.',
      earns: ['precision', 'range', 'collocation'],
      why: '“The graph shows” is the title’s own verb and the vaguest available noun. Naming it a line graph, replacing “shows” with “illustrates” and compressing “the number of people who visited” into “attendance” moves every word that could move — and both years stay exactly where they were.',
    },
    groups: [
      {
        label: 'What the visual does',
        purpose: 'These replace the verb in the printed title, which is almost always “shows”.',
        entries: [
          { text: 'illustrate', risk: 'safe', pattern: 'Takes a noun or a “wh-” clause: “illustrates how the process works”. The most reliable replacement for “show”.' },
          { text: 'depict', risk: 'safe', pattern: 'Takes a noun: “depicts the layout of the site”. Slightly more common with maps and diagrams than with figures.' },
          { text: 'compare', risk: 'safe', pattern: 'Takes two things: “compares rainfall in four cities”. Only use it when the visual really does set things side by side.' },
          { text: 'give information about', risk: 'safe', pattern: 'Takes a noun. Longer than the others and useful when the visual does several things at once.' },
          { text: 'present / set out', risk: 'watch', pattern: 'Neutral and slightly formal: “presents data on”. “Set out” suits tables and processes better than graphs.' },
          { text: 'demonstrate', risk: 'avoid', pattern: 'It claims the visual proves something. Charts display data; they do not demonstrate conclusions.' },
        ],
      },
      {
        label: 'Naming the visual',
        purpose: 'Getting this wrong is noticed immediately, and it costs nothing to get right.',
        entries: [
          { text: 'line graph', risk: 'safe', pattern: 'For data plotted over time. Not “line chart” in IELTS convention, and never just “graph” if you can be specific.' },
          { text: 'bar chart', risk: 'safe', pattern: 'For quantities compared across categories. “Bar graph” is accepted; “bar chart” is the safer choice.' },
          { text: 'pie chart', risk: 'safe', pattern: 'For proportions of a single whole. If there are two pies, they are “the pie charts”.' },
          { text: 'table', risk: 'safe', pattern: 'Takes no other word: “the table”, not “the table chart”.' },
          { text: 'process diagram / flow chart', risk: 'safe', pattern: 'For a sequence of stages. “Diagram” alone is fine when the paper uses it.' },
          { text: 'the maps', risk: 'watch', pattern: 'Almost always plural in Task 1, because you are given a before and an after. Writing “the map” usually means you have only described one.' },
        ],
      },
      {
        label: 'Framing the period',
        purpose: 'The years themselves never change. What surrounds them does.',
        entries: [
          { text: 'between X and Y', risk: 'safe', pattern: 'Takes two points: “between 1990 and 2020”. Never “between 1990 to 2020”.' },
          { text: 'from X to Y', risk: 'safe', pattern: 'The alternative to “between … and”. Do not mix the two halves of the pair.' },
          { text: 'over a X-year period', risk: 'safe', pattern: 'Hyphenated, and the noun stays singular: “a ten-year period”, never “a ten-years period”.' },
          { text: 'over the course of', risk: 'safe', pattern: 'Takes a noun phrase: “over the course of two decades”. Slightly more formal than “over”.' },
          { text: 'in a single year', risk: 'watch', pattern: 'Only when the visual has no time axis at all. A chart with one year is not a trend and must not be described as one.' },
        ],
      },
      {
        label: 'Units and measures',
        purpose: 'These are copied from the paper, not paraphrased — but they must appear.',
        entries: [
          { text: 'measured in / expressed in', risk: 'safe', pattern: 'Takes the unit: “measured in millions of tonnes”. Naming the unit once in the introduction saves repeating it later.' },
          { text: 'as a percentage of', risk: 'safe', pattern: 'Takes the whole: “as a percentage of total energy use”. The “of” phrase is what makes the figure mean anything.' },
          { text: 'per capita / per household', risk: 'watch', pattern: 'Only if the paper says so. Adding “per capita” to a raw total changes what the chart reports.' },
          { text: 'figures / data', risk: 'safe', pattern: '“Data” takes a singular verb in this register: “the data shows”. “Figures” is plural and often the safer choice.' },
        ],
      },
    ],
    examples: [
      { sentence: 'The line graph illustrates museum attendance in four European capitals between 2010 and 2020.', doing: 'illustrates · line graph · between … and', why: 'Three jobs in one sentence: the visual named, its verb replaced, and the period framed. Both years survive untouched, because they are data.' },
      { sentence: 'The two maps depict the layout of Hartley village before and after its redevelopment.', doing: 'the two maps · depict · before and after', why: 'Note the plural and the framing: when no years are given, “before and after” is the only period the visual supports, and inventing dates would be inventing data.' },
    ],
    mistakes: [
      { wrong: 'The graph shows the number of visitors to the museum from 2010 to 2020.', why: 'This is the title with the word order changed. “Graph” and “shows” are both the paper’s, and nothing here is counted as your language.', right: 'The line graph illustrates museum attendance over a ten-year period from 2010 to 2020.' },
      { wrong: 'The chart illustrates a worrying increase in obesity between 2000 and 2020.', why: '“Worrying” is a judgement, and a chart cannot support one. Task 1 reports what is drawn and stops there.', right: 'The chart illustrates the change in obesity rates between 2000 and 2020.' },
    ],
    guided: {
      brief: 'The paper says: “Bar chart: Percentage of households owning a car in five countries, 1990 and 2020.”',
      goal: 'Write the opening sentence. Three decisions, one at a time — and the figures and country count do not move.',
      steps: [
        {
          instruction: 'Name the visual and choose its verb',
          hint: 'The paper calls it a bar chart. Choose a verb that is not “shows”, and check what that verb takes after it.',
          minWords: 4,
          placeholder: 'The bar chart …',
          model: 'The bar chart compares …',
          why: '“Compares” is the accurate verb here: the chart genuinely sets five countries side by side. Choosing it over “illustrates” is a reading of the visual, not a synonym swap.',
        },
        {
          instruction: 'Rewrite the subject without the paper’s words',
          hint: '“Percentage of households owning a car” is the paper’s phrasing. Find another way to say it — and keep it a proportion, not a count.',
          minWords: 5,
          placeholder: 'the proportion of …',
          model: 'the proportion of households with access to a car',
          why: '“Percentage” → “proportion” and “owning” → “with access to” move both content words. Note that it stays a proportion: turning it into “the number of households” would change what the chart measures.',
        },
        {
          instruction: 'Write the whole sentence, with the years',
          hint: 'Put it together and frame the two years. There are only two of them, so this is not a period — be careful which framing you use.',
          minWords: 14,
          placeholder: 'The bar chart compares …',
          model: 'The bar chart compares the proportion of households with access to a car in five countries in 1990 and 2020.',
          why: '“In 1990 and 2020”, not “between 1990 and 2020”: the chart gives two separate years, not a continuous period, and “between” would promise data the chart does not contain.',
        },
      ],
      result: 'The bar chart compares the proportion of households with access to a car in five countries in 1990 and 2020. Every word that could move has moved, and not one figure was touched.',
    },
    drills: [
      {
        stem: 'The line graph ______ the number of international students at three universities.',
        correct: 0,
        options: [
          { text: 'compares', why: 'Correct. The graph sets three universities side by side, which is exactly what “compare” reports.' },
          { text: 'demonstrates', why: 'It claims the graph proves something. Visuals display data; they do not demonstrate conclusions.' },
          { text: 'shows', why: 'Grammatical, and it is the paper’s own verb. Nothing was paraphrased.' },
          { text: 'compares between', why: '“Compare” takes its objects directly. The preposition is carried over from Spanish.' },
        ],
      },
      {
        stem: 'The figures were recorded ______ 1995 and 2015.',
        correct: 0,
        options: [
          { text: 'between', why: 'Correct. “Between” pairs with “and”, and the two years mark the ends of the period.' },
          { text: 'from', why: '“From” pairs with “to”, not with “and”. The two halves of the pair have been crossed.' },
          { text: 'since', why: '“Since” takes a single starting point and runs to the present. Two years is a closed period.' },
          { text: 'during', why: '“During” takes one span — “during the 1990s” — not two separate years joined by “and”.' },
        ],
      },
      {
        stem: 'Energy consumption in the report is measured ______ millions of tonnes of oil equivalent.',
        correct: 0,
        options: [
          { text: 'in', why: 'Correct. “Measured in” plus the unit is the fixed pattern, and naming the unit once saves repeating it.' },
          { text: 'by', why: '“Measured by” names the instrument or the method, not the unit.' },
          { text: 'on', why: 'No such pattern exists with “measure”.' },
          { text: 'with', why: '“Measured with” names the tool used to take the measurement, which is not what a unit is.' },
        ],
      },
    ],
  },

  // ── 2 · El resumen general ─────────────────────────────────────────────────
  {
    slug: 'task1-overview',
    label: 'Task 1 overview',
    spanishName: 'Vocabulario para el overview de Task 1',
    seoTitle: 'Vocabulario para el overview de IELTS Task 1: overall, the most striking feature',
    seoDescription: 'Cómo escribir el resumen general de un gráfico en inglés sin dar cifras. Overall, the most striking feature, remained stable, an upward trend. Con patrón y ejercicios.',
    family: 'task1',
    job: 'it states the two or three biggest things the visual shows, without a single figure',
    whenToUse: 'The second paragraph of every Task 1 response, and the one the assessment weighs most heavily. It is also the one most often missing, because it feels like repetition when you are about to describe everything in detail anyway.',
    tone: 'review',
    explainer: {
      definition: 'The overview names the two or three most important things the visual shows, in general terms and without quoting any figure.',
      sections: [
        {
          heading: 'Why no figures, and why that feels wrong',
          body: [
            'The instinct is to prove the summary with a number, and it is exactly the wrong instinct. The overview exists to show that you can look at a visual and say what it means — that you can see the shape of the data rather than only the values in it. A figure in the overview pulls the sentence down into detail, which is Body 1’s job, and it usually crowds out the second big feature you were about to name.',
            'The practical consequence is that the overview needs its own vocabulary, and it is vocabulary of comparison and shape rather than of quantity: which one dominates, what stayed still, what moved together, what moved in opposite directions. If you find yourself unable to write the sentence without a number, that is usually a sign that you have not yet decided what the visual is about.',
          ],
          points: [
            { term: 'Shape, not values', detail: '“Rose throughout”, “moved in opposite directions”, “remained stable”. None of these needs a figure to be true.' },
            { term: 'Two or three features', detail: 'One is not an overview; five is Body 1. Two clear ones beat four vague ones.' },
            { term: 'Signal it explicitly', detail: '“Overall” or “In general” at the start. Examiners look for the overview, and a signposted one is easier to find.' },
            { term: 'No prediction, no cause', detail: 'The visual stops where it stops. Why something happened is never on it.' },
          ],
        },
        {
          heading: 'What counts as a “biggest feature”',
          body: [
            'Three things almost always qualify, and one of them is in nearly every visual. The first is dominance: which category is largest, or which line sits above the others throughout. The second is direction: what the overall movement was, if the visual has a time axis. The third is contrast: two things that behaved differently, which is the feature examiners find most convincing because it cannot be read off a single point.',
            'What does not qualify is anything you would need to squint at. If a feature requires you to compare two nearly identical bars, it belongs in the body paragraphs where you can quote the figures that make the difference visible.',
          ],
        },
      ],
      cost: 'A missing overview is the most expensive single omission in Task 1, because it is assessed directly and no amount of accurate detail replaces it. A weak one — a single feature, or one buried in figures — costs less but costs consistently, since it is the paragraph an examiner reads to decide whether you understood the visual at all.',
      limits: 'The overview does not explain and it does not predict. A map of a village that gained a supermarket does not tell you the village grew richer; a graph that ends in 2020 says nothing about 2025. And it does not judge: “a worrying rise” is a claim about the world, not about the chart.',
    },
    upgrade: {
      vague: 'Overall, the numbers went up a lot in some countries and stayed the same in others.',
      precise: 'Overall, consumption rose steadily in the three European countries, whereas it remained broadly stable elsewhere.',
      earns: ['precision', 'range', 'collocation'],
      why: '“Went up a lot” reports a direction and a size in conversational English; “rose steadily” reports the direction and the manner in two words. And “whereas” states the contrast the vague version left the reader to assemble — which is the feature that makes an overview worth reading.',
    },
    groups: [
      {
        label: 'Opening the overview',
        purpose: 'Signal it. An unsignposted overview is one an examiner may not find.',
        entries: [
          { text: 'Overall,', risk: 'safe', pattern: 'Opens the sentence with a comma. The clearest signal available, and it costs one word.' },
          { text: 'In general,', risk: 'safe', pattern: 'Same position, same comma. Slightly softer than “overall”.' },
          { text: 'Broadly speaking,', risk: 'safe', pattern: 'Opens the sentence. Useful when the pattern has exceptions you are about to ignore.' },
          { text: 'It is clear that', risk: 'watch', pattern: 'Takes a clause. Fine once; it asserts rather than summarises, so it cannot open every overview you ever write.' },
          { text: 'As can be seen,', risk: 'avoid', pattern: 'Empty: everything in a visual can be seen. It uses four words to say nothing.' },
        ],
      },
      {
        label: 'Naming what stands out',
        purpose: 'Dominance is the feature almost every visual has.',
        entries: [
          { text: 'the most striking feature', risk: 'safe', pattern: 'Takes “is that” plus a clause: “the most striking feature is that…”. The standard opener for the biggest point.' },
          { text: 'by far the largest', risk: 'safe', pattern: 'Goes before the noun: “by far the largest share”. “By far” does the work of a figure without quoting one.' },
          { text: 'dominate', risk: 'safe', pattern: 'Takes an object directly: “coal dominated the energy mix”. Strong, and only true when one item really is well ahead.' },
          { text: 'account for the majority of', risk: 'watch', pattern: 'Means more than half. Do not use it for the biggest slice when that slice is under 50%.' },
          { text: 'negligible', risk: 'watch', pattern: 'Before a noun: “a negligible proportion”. It claims the amount is too small to matter, which is a real claim.' },
        ],
      },
      {
        label: 'Reporting stability',
        purpose: 'What did not change is a feature, and it is the one most often left out.',
        entries: [
          { text: 'remained stable', risk: 'safe', pattern: 'No preposition: “remained stable throughout”. “Stayed stable” is fine but flatter.' },
          { text: 'showed little change', risk: 'safe', pattern: 'Takes no object. Useful when there is movement but not enough to call a trend.' },
          { text: 'held steady at', risk: 'watch', pattern: 'Takes “at” plus a figure — so it belongs in the body, not in a figure-free overview.' },
          { text: 'fluctuated', risk: 'safe', pattern: 'Takes no object: “fluctuated throughout the period”. It means up and down with no net direction, which is not the same as stable.' },
          { text: 'plateaued', risk: 'watch', pattern: 'Means it rose and then flattened. Wrong for something that was flat from the start.' },
        ],
      },
      {
        label: 'Reporting shape and contrast',
        purpose: 'Contrast is the feature that is hardest to fake and best rewarded.',
        entries: [
          { text: 'an upward / downward trend', risk: 'safe', pattern: 'Takes “show” or “follow”: “showed an upward trend”. A trend is the whole shape, not one movement.' },
          { text: 'followed a similar pattern', risk: 'safe', pattern: 'Takes “to” for the comparison: “followed a similar pattern to that of…”. Note “that of”, not “that from”.' },
          { text: 'moved in opposite directions', risk: 'safe', pattern: 'Takes no object. The single most useful overview phrase, because it reports two things at once.' },
          { text: 'whereas / while', risk: 'safe', pattern: 'Joins two clauses with a comma before it. The connector that turns two facts into one contrast.' },
          { text: 'the gap widened / narrowed', risk: 'safe', pattern: 'Takes “between”: “the gap between the two widened”. Reports a relationship changing, which no single figure can.' },
        ],
      },
    ],
    examples: [
      { sentence: 'Overall, car ownership rose in every country surveyed, although the gap between the highest and lowest narrowed considerably.', doing: 'Overall · rose · the gap … narrowed', why: 'Two features in one sentence: a shared direction and a changing relationship. Neither needs a figure, and the second could not be read off any single point on the chart.' },
      { sentence: 'Overall, coal dominated the energy mix at the start of the period, whereas renewables had become the largest single source by its end.', doing: 'dominated · whereas', why: '“Dominated” reports size without quoting it, and “whereas” carries the reversal. This is the shape of the data, which is exactly what an overview is for.' },
    ],
    mistakes: [
      { wrong: 'Overall, the figure for Japan was 54% in 2020, which was the highest.', why: 'A figure in the overview. It pulls the paragraph down into the detail that belongs in Body 1, and it uses the space where the second feature should have been.', right: 'Overall, Japan recorded by far the highest figure throughout the period.' },
      { wrong: 'Overall, the trend will continue to rise in the coming years.', why: 'The visual stops where it stops. A prediction is a claim about data that is not on the paper.', right: 'Overall, the trend was upward throughout the period shown.' },
    ],
    guided: {
      brief: 'A line graph shows internet use in three countries from 2000 to 2020. All three rise. Country A starts lowest and finishes highest; Country C rises slowly and finishes lowest.',
      goal: 'Write the overview: two features, no figures.',
      steps: [
        {
          instruction: 'Name the feature all three share',
          hint: 'One thing is true of every line. Write it as a full clause, with no numbers.',
          minWords: 6,
          placeholder: 'Overall, internet use …',
          model: 'Overall, internet use increased in all three countries over the period.',
          why: 'The shared direction is the safest first feature: it is true of the whole visual and needs no figure. Note “over the period”, which frames it without dates.',
        },
        {
          instruction: 'Name the feature that separates them',
          hint: 'A and C behaved differently. That difference is the second feature — and it is the one worth more, because it cannot be read off one point.',
          minWords: 8,
          placeholder: 'although Country A …',
          model: 'although Country A overtook the others, having started from the lowest position.',
          why: '“Overtook” reports a change in the relationship between the lines, which is the kind of feature an overview exists for. “Having started from” fits the sequence in without a second sentence.',
        },
        {
          instruction: 'Join them into one overview',
          hint: 'Put the two features together. Check that no figure has crept in, and that nothing claims why any of this happened.',
          minWords: 16,
          placeholder: 'Overall, internet use …',
          model: 'Overall, internet use increased in all three countries over the period, although Country A overtook the others, having started from the lowest position.',
          why: 'Two features, one sentence, not a single figure, and no explanation of causes. The contrast does the work that a list of numbers could not.',
        },
      ],
      result: 'Overall, internet use increased in all three countries over the period, although Country A overtook the others, having started from the lowest position.',
    },
    drills: [
      {
        stem: 'Overall, production remained ______ throughout the period, with no month varying by more than 2%.',
        correct: 0,
        options: [
          { text: 'stable', why: 'Correct. “Remained stable” takes no preposition and reports the absence of change, which is a feature worth naming.' },
          { text: 'stability', why: 'A noun after “remained”, where the slot needs an adjective.' },
          { text: 'stabled', why: 'Not a word in this sense. The adjective is “stable”.' },
          { text: 'plateaued', why: '“Plateau” means it rose and then flattened. This never rose.' },
        ],
      },
      {
        stem: 'The two lines ______, with imports rising as exports fell.',
        correct: 0,
        options: [
          { text: 'moved in opposite directions', why: 'Correct. One phrase reports both movements and the relationship between them, without a single figure.' },
          { text: 'moved in opposite direction', why: 'Two lines, two directions: the noun is plural in this fixed phrase.' },
          { text: 'moved to opposite directions', why: 'The preposition is “in”. “To” would name a destination.' },
          { text: 'were very different', why: 'Grammatical, and it reports nothing: different how? The phrase names no shape at all.' },
        ],
      },
      {
        stem: 'The most striking feature ______ renewables overtook coal in the final year.',
        correct: 0,
        options: [
          { text: 'is that', why: 'Correct. The phrase takes “is that” plus a clause; the clause is where the feature goes.' },
          { text: 'is', why: 'Without “that”, a full clause cannot follow the noun phrase.' },
          { text: 'is what', why: '“What” introduces a different structure and leaves the sentence without a subject.' },
          { text: 'are that', why: '“Feature” is singular, so the verb is “is”.' },
        ],
      },
    ],
  },

  // ── 3 · Tendencias ─────────────────────────────────────────────────────────
  {
    slug: 'task1-tendencias',
    label: 'Trends over time',
    spanishName: 'Vocabulario de tendencias en inglés',
    seoTitle: 'Vocabulario de tendencias en inglés para IELTS: rise, plummet, peak at, level off',
    seoDescription: 'Verbos y adverbios para describir subidas y bajadas en inglés: rise, climb, plummet, sharply, gradually, peaked at, levelled off. Con su preposición y ejercicios corregidos.',
    family: 'task1',
    job: 'it reports change over time: the direction, how big it was, and how fast it happened',
    whenToUse: 'Any visual with a time axis — line graphs above all, but also bar charts across years and tables with dated columns. It is the largest vocabulary set in Task 1 and the one where a small mistake is most visible, because the reader can check every word against the picture.',
    tone: 'development',
    explainer: {
      definition: 'Trend language reports three separate things about a change: which way it went, how large it was, and how quickly it happened. Most errors come from using one word to do two of those jobs.',
      sections: [
        {
          heading: 'Three questions, three sets of words',
          body: [
            'A line on a graph carries three pieces of information and English has a different word class for each. The verb carries direction: something rose or it fell. An adverb of degree carries size: sharply, slightly, marginally. An adverb of manner carries speed and shape: gradually, steadily, abruptly. Keeping them apart is most of what this vocabulary asks of you, and collapsing them is the commonest error in Task 1.',
            '“Rose rapidly” and “rose sharply” are not synonyms and are not interchangeable. The first says it happened quickly; the second says it went up a long way. A line can rise sharply over twenty years — a big change, slowly — and it can rise rapidly by very little. If you write one when you meant the other, the reader compares your sentence with the picture and finds them disagreeing.',
            'The good news is that these words combine freely once you know which job each does. Two words — one verb and one adverb — describe most movements accurately, and a third is usually one too many.',
          ],
          points: [
            { term: 'Direction: the verb', detail: '“rose”, “fell”, “climbed”, “declined”. This is the only one of the three you cannot omit.' },
            { term: 'Size: the degree adverb', detail: '“sharply”, “markedly”, “slightly”, “marginally”. Says how far it moved, not how fast.' },
            { term: 'Speed and shape: the manner adverb', detail: '“gradually”, “steadily”, “abruptly”. Says how it got there.' },
            { term: 'Noun form: the alternative', detail: '“a sharp rise in”, “a gradual decline in”. Same content, different grammar — and the preposition is always “in”.' },
          ],
        },
        {
          heading: 'The prepositions, which is where it breaks',
          body: [
            'Trend verbs carry prepositions that are fixed and not guessable. Something rises *to* a value and rises *by* an amount, and confusing the two turns a rise of five points into a rise to five. It peaks *at* a figure, never “peaks to”. A rise happens *in* a category — “a rise in unemployment” — and the noun keeps that “in” even when the verb it came from took something else.',
            'These are worth learning as whole phrases rather than as words, because each one is short and each one is the kind of error that a reader notices immediately: the sentence stops matching the chart.',
          ],
        },
      ],
      cost: 'Trend language is the most checkable vocabulary in the exam. Every word can be compared against the picture, so an inaccurate verb or a swapped preposition is not a stylistic slip — it makes the sentence report something the visual does not show, which reaches Task Achievement as well as Lexical Resource. And repeating “increase” eight times, which is what happens when this set is thin, is the clearest possible signal of limited range.',
      limits: 'None of this belongs in the overview, where figures and precise movements are out of place. And a trend verb needs an actual trend: two data points are a change, not a trend, and describing a chart with two dated columns as “rising steadily” claims a shape the visual never drew. Strong verbs like “plummet” and “soar” also have a floor — used for a five per cent movement they read as exaggeration.',
    },
    upgrade: {
      vague: 'The number went up a lot and then it went down a bit before going up again.',
      precise: 'The figure climbed sharply, dipped briefly, and then resumed its upward trend.',
      earns: ['precision', 'range', 'collocation'],
      why: 'Three movements described with three different verbs instead of one verb used three times, and “sharply” and “briefly” carry the size of each. The vague version needs nineteen words to say less than the precise version says in eleven.',
    },
    groups: [
      {
        label: 'Verbs of rise',
        purpose: 'Direction upward. The strength of the verb should match the size of the movement.',
        entries: [
          { text: 'rise / increase', risk: 'safe', pattern: 'Intransitive: “sales rose”, never “sales were risen”. Takes “to” for a value and “by” for an amount.' },
          { text: 'climb', risk: 'safe', pattern: 'Same pattern as “rise”, slightly more vivid. Suits a steady movement over several points.' },
          { text: 'grow', risk: 'safe', pattern: 'Best with quantities that genuinely grow: populations, economies, demand. Odd with percentages.' },
          { text: 'surge / soar', risk: 'watch', pattern: 'Strong verbs for large, fast rises only. Used for a small movement they read as exaggeration.' },
          { text: 'edge up', risk: 'watch', pattern: 'A very small rise: “edged up from 4% to 5%”. Informal in some registers, safe in data description.' },
          { text: 'raise', risk: 'avoid', pattern: 'Transitive — something raises something else. A figure on a chart raises nothing, so “the figure raised” is wrong.' },
        ],
      },
      {
        label: 'Verbs of fall',
        purpose: 'Direction downward, with the same strength rule.',
        entries: [
          { text: 'fall / decrease', risk: 'safe', pattern: 'Intransitive, same prepositions as “rise”. “Decrease” is flatter and always safe.' },
          { text: 'decline', risk: 'safe', pattern: 'Intransitive. Suits a long, sustained downward movement better than a single drop.' },
          { text: 'drop / dip', risk: 'safe', pattern: '“Dip” implies it came back up; “drop” does not. Choosing between them is a reading of the line.' },
          { text: 'plummet / plunge', risk: 'watch', pattern: 'Only for a steep, dramatic fall. Note that these are intransitive too.' },
          { text: 'halve', risk: 'watch', pattern: 'Means it fell by exactly half: “the figure halved”. Not a general word for a large fall.' },
          { text: 'lower', risk: 'avoid', pattern: 'Transitive, like “raise”. A figure does not lower; it falls.' },
        ],
      },
      {
        label: 'How big: degree adverbs',
        purpose: 'These say how far it moved. They do not say how fast.',
        entries: [
          { text: 'sharply', risk: 'safe', pattern: 'After the verb: “rose sharply”. The default for a large movement.' },
          { text: 'markedly / considerably', risk: 'safe', pattern: 'After the verb. Slightly more formal than “sharply” and equally strong.' },
          { text: 'slightly', risk: 'safe', pattern: 'After the verb. For a small but visible change.' },
          { text: 'marginally', risk: 'safe', pattern: 'After the verb. Smaller than “slightly” — the movement is barely there.' },
          { text: 'dramatically', risk: 'watch', pattern: 'Strong, and it edges towards judgement. Safe for a genuinely large movement, overdone for anything else.' },
        ],
      },
      {
        label: 'How fast, and what shape',
        purpose: 'These say how it got there. Mixing them with the degree adverbs is the classic error.',
        entries: [
          { text: 'gradually', risk: 'safe', pattern: 'After the verb: “declined gradually”. Slow, and usually smooth.' },
          { text: 'steadily', risk: 'safe', pattern: 'After the verb. At a constant rate — it says the line is straight, not that it is slow.' },
          { text: 'rapidly', risk: 'safe', pattern: 'After the verb. Fast, and says nothing about how far.' },
          { text: 'abruptly / suddenly', risk: 'watch', pattern: 'After the verb. Implies a single sharp turn rather than a movement over time.' },
          { text: 'erratically', risk: 'watch', pattern: 'After the verb. Only for a line that genuinely jumps around with no pattern.' },
        ],
      },
      {
        label: 'Peaks, floors and flattening',
        purpose: 'The points where a line changes what it is doing.',
        entries: [
          { text: 'peak at', risk: 'watch', pattern: 'Takes “at” plus the value: “peaked at 40%”, never “peaked to”. The most misused verb in Task 1.' },
          { text: 'reach a low of', risk: 'safe', pattern: 'Takes “of” plus the value. The mirror of “peak at”, and it keeps its own preposition.' },
          { text: 'level off / plateau', risk: 'safe', pattern: 'No preposition needed: “levelled off after 2010”. Means it rose or fell and then flattened.' },
          { text: 'bottom out', risk: 'watch', pattern: 'Means it stopped falling and turned. Wrong for a line that simply stayed low.' },
          { text: 'stabilise', risk: 'safe', pattern: 'Intransitive: “the figure stabilised”. Says the movement stopped, not that it was ever high or low.' },
        ],
      },
      {
        label: 'The noun forms',
        purpose: 'Same content, different grammar — useful when a sentence already has its verb.',
        entries: [
          { text: 'a sharp rise in', risk: 'safe', pattern: 'The preposition is always “in”: “a sharp rise in unemployment”, never “of unemployment”.' },
          { text: 'a gradual decline in', risk: 'safe', pattern: 'Same pattern. The degree word becomes an adjective when the verb becomes a noun.' },
          { text: 'a fluctuation in', risk: 'safe', pattern: 'Countable: “fluctuations in demand”. Means movement with no net direction.' },
          { text: 'an upward / downward trend', risk: 'safe', pattern: 'Takes “show” or “follow”, and “in” for the subject: “an upward trend in sales”.' },
        ],
      },
    ],
    examples: [
      { sentence: 'Car ownership climbed steadily from 1990, peaked at just under 80% in 2012, and then levelled off.', doing: 'climbed steadily · peaked at · levelled off', why: 'Three stages of one line with three different verbs, and each one carries its own preposition. “Peaked at” is the one to memorise as a whole phrase — “peaked to” is the single most common preposition error in Task 1.' },
      { sentence: 'Demand fell sharply during the first quarter but recovered gradually over the remainder of the year.', doing: 'fell sharply · recovered gradually', why: 'One degree adverb and one manner adverb doing different jobs: the fall was large, the recovery was slow. Swapping them would describe a different chart entirely.' },
    ],
    mistakes: [
      { wrong: 'The figure peaked to 40% in 2015 and then raised again.', why: 'Two errors. “Peak” takes “at”, never “to”. And “raise” is transitive — a figure does not raise anything; it rises.', right: 'The figure peaked at 40% in 2015 and then rose again.' },
      { wrong: 'Sales increased rapidly by nearly 60% over the two decades.', why: '“Rapidly” says fast, and sixty per cent over twenty years is not fast — it is large. The word for size is “sharply” or “markedly”.', right: 'Sales increased sharply, by nearly 60%, over the two decades.' },
    ],
    guided: {
      brief: 'A line rises gently from 20% in 2000 to 35% in 2010, jumps to 60% by 2012, and stays at roughly 60% until 2020.',
      goal: 'Describe this line in one sentence, with the right verb and the right adverb for each of its three stages.',
      steps: [
        {
          instruction: 'Describe the first stage',
          hint: 'Fifteen points over ten years. Ask yourself two separate questions: how far did it move, and how fast? Then choose one verb and one adverb.',
          minWords: 5,
          placeholder: 'The figure rose …',
          model: 'The figure rose gradually from 20% to 35%',
          why: '“Gradually” is a manner adverb: it reports the pace, which is what makes this stage different from the next one. “Sharply” would have claimed a size the movement does not have.',
        },
        {
          instruction: 'Describe the jump',
          hint: 'Twenty-five points in two years. This one is both large and fast — but pick the word for the property that distinguishes it from stage one.',
          minWords: 5,
          placeholder: 'before …',
          model: 'before climbing sharply to 60% by 2012',
          why: '“Sharply” for the size, and a second verb rather than repeating “rose”. What separates this stage from the first is how far it went, so that is the property the adverb reports.',
        },
        {
          instruction: 'Describe the flat end, and join it all',
          hint: 'The line stopped moving after 2012. There is a verb for exactly that — and check its preposition. Then write the whole sentence.',
          minWords: 16,
          placeholder: 'The figure rose gradually …',
          model: 'The figure rose gradually from 20% to 35%, before climbing sharply to 60% by 2012 and then levelling off for the remainder of the period.',
          why: 'Three stages, three verbs, two adverbs doing different jobs, and every preposition where it belongs. “Levelling off” reports the flattening in two words, which no adverb could.',
        },
      ],
      result: 'The figure rose gradually from 20% to 35%, before climbing sharply to 60% by 2012 and then levelling off for the remainder of the period.',
    },
    drills: [
      {
        stem: 'Unemployment ______ 11% in 2013 before falling steadily for the rest of the decade.',
        correct: 0,
        options: [
          { text: 'peaked at', why: 'Correct. “Peak” takes “at” plus the value, and it reports the highest point before a turn.' },
          { text: 'peaked to', why: 'The commonest preposition error in Task 1. “Peak” never takes “to”.' },
          { text: 'peaked in', why: '“In” would introduce a period, not a value. The year already has its own “in”.' },
          { text: 'was peaked at', why: '“Peak” is intransitive here, so it has no passive.' },
        ],
      },
      {
        stem: 'Between 1990 and 2020 the figure ______, gaining almost forty percentage points.',
        correct: 0,
        options: [
          { text: 'rose sharply', why: 'Correct. Forty points is a large movement, and “sharply” is the adverb for size.' },
          { text: 'rose rapidly', why: '“Rapidly” reports speed, and thirty years is not fast. The movement was big, not quick.' },
          { text: 'raised sharply', why: '“Raise” is transitive: something raises something else. A figure rises.' },
          { text: 'was risen sharply', why: '“Rise” has no passive, because it takes no object.' },
        ],
      },
      {
        stem: 'After 2015 the line flattened, and the figure ______ at around 25% until the end of the period.',
        correct: 0,
        options: [
          { text: 'remained stable', why: 'Correct. It reports the absence of movement, and “at” then introduces the value it settled on.' },
          { text: 'bottomed out', why: '“Bottom out” means it stopped falling and turned upward. This line simply stopped moving.' },
          { text: 'stabilised at', why: 'Close and redundant here: “flattened” already said the movement stopped, so this repeats it.' },
          { text: 'was stable', why: 'Grammatical and flat. “Remained” carries the sense of continuing that the sentence needs.' },
        ],
      },
    ],
  },
];
