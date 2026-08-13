/**
 * La explicación larga y el ejercicio guiado de las ocho funciones del vocabulario.
 *
 * Bloques 1 y 3 del blueprint. Las ocho funciones ya tenían comparador vago→preciso, banco con
 * patrones, ejemplos, errores, ejercicio de reconocimiento y motor: lo que les faltaba era la
 * lección delante y la producción guiada en medio.
 *
 * POR QUÉ EL GUIADO DE ESTAS OCHO PIDE ALGO DISTINTO
 *
 * En paraphrasing el guiado reescribe una frase. Aquí el paso 1 casi siempre pide DECIDIR algo
 * antes de escribir: qué fuerza tiene la afirmación, quién es el dueño de la idea, qué cantidad
 * puedes defender sin datos. Es el orden en que estas funciones se usan de verdad, y es el que
 * se salta quien aprende vocabulario como lista: elegir la palabra primero produce frases
 * correctas que afirman lo que el escritor no quería afirmar.
 */

import type { Explainer, GuidedExercise } from '../../_shared/skill-blueprint';

export const FUNCTION_EXPLAINERS: Record<string, Explainer> = {
  hedging: {
    definition: 'Hedging lowers the temperature of a claim so that what you wrote is what you can defend, rather than the strongest version of it.',
    sections: [
      {
        heading: 'Why the absolute version is the weak one',
        body: [
          'Most prompts invite an absolute answer, and an absolute answer is the easiest thing in the world to argue against. “Social media damages relationships” can be destroyed by one counter-example a reader thinks of in two seconds, and once they have thought of it they read the rest of the paragraph looking for more. “Heavy social media use appears to strain relationships” survives that counter-example, and it survives it without conceding anything the evidence actually supports.',
          'This is why hedging is not caution in the sense of timidity. It is precision about scope: naming who, when and how often, so the claim covers exactly the ground you can hold. A hedge that adds no information — “somewhat problematic”, “to some extent” — is not doing this job at all, which is why the useful hedges are the ones that name a limit rather than the ones that lower the volume.',
          'The failure mode is stacking. Each hedge should mark one specific uncertainty, and a claim carrying four of them has stopped saying anything: “it may possibly be somewhat likely that costs will perhaps increase” contains four correct English words doing nothing, and an examiner reads it as avoidance rather than as care.',
        ],
        points: [
          { term: 'Name the limit', detail: '“in urban areas”, “among younger workers” beat “somewhat”. A hedge should add information, not remove it.' },
          { term: 'One per claim', detail: 'Each hedge marks one uncertainty. Four on one sentence is avoidance and reads as such.' },
          { term: 'The grammar is fixed', detail: '“Tend to” + bare infinitive. “Is likely to” + infinitive. The “to” is part of the verb, not a preposition.' },
          { term: 'Hedge the claim, not the word', detail: '“Somewhat destroyed” is a contradiction: destruction has no degrees. Some words cannot take one.' },
        ],
      },
    ],
    cost: 'An unhedged claim invites the counter-example, and the counter-example arrives while the examiner is still reading your supporting evidence — so the paragraph is being discounted as it is being read. Over-hedging costs differently and just as much: a response where nothing is asserted has no position, and Task Response is assessed on having one.',
    limits: 'Hedging cannot rescue a claim that is simply wrong, and it cannot substitute for evidence: “it may be that X” is still a claim that needs supporting. And it has no place in your position statement — an introduction hedged into invisibility has not answered the question, which is the one thing the essay is for.',
  },
  asserting: {
    definition: 'Asserting raises the temperature of a claim, so the reader knows which two or three points in your essay you are actually prepared to stand behind.',
    sections: [
      {
        heading: 'Strength is a budget, not a setting',
        body: [
          'An essay that hedges everything has no position, and an essay that asserts everything has no judgement. What separates a controlled response is that the strong words appear where the argument earned them and nowhere else — usually two or three times in the whole paper. That makes assertion a budget rather than a register: spending it on your weakest point is what makes the strong point read as noise when it arrives.',
          'The vocabulary divides by what it claims. “Consistently” claims a pattern that repeats, which evidence can support. “Invariably” claims not a single exception, which one counter-example destroys. “Undoubtedly” claims nobody reasonable disagrees, which is only safe for something nobody contests — and if nobody contested it, the prompt would not be asking.',
          'The other half of the family is what to avoid. “Totally”, “hugely”, “massively” raise volume rather than precision, and they are the clearest register drop available in an academic response. When you want to sound decisive, the move is a precise verb, not a louder adverb.',
        ],
        points: [
          { term: 'Two or three per essay', detail: 'Strong words spent everywhere stop being strong anywhere.' },
          { term: 'What each claims', detail: '“Consistently” = a repeating pattern. “Invariably” = zero exceptions. Only one of those is defensible.' },
          { term: 'Assert what you showed', detail: 'The strength should match the paragraph beneath it, not the confidence you felt while writing.' },
          { term: 'Not louder, more precise', detail: '“Hugely better” is volume. “Markedly better” is a claim about size that the data can support.' },
        ],
      },
    ],
    cost: 'An essay with no assertion reads as a survey rather than an argument, and the examiner cannot find the position they are assessing. Overassertion costs more concretely: “invariably” and “always” hand the reader a counter-example to construct, and once they have constructed one they apply it to everything else you claimed.',
    limits: 'Assertion cannot manufacture support. A strong adverb in front of an unsupported claim makes the gap more visible, not less — the reader now knows you consider it settled and can see that nothing settled it. And it does not belong in a concession: conceding forcefully is conceding.',
  },
  attributing: {
    definition: 'Attribution makes clear whose claim each sentence carries — yours, the prompt’s, or somebody else’s — which is what lets a discussion essay be read as an argument rather than a muddle.',
    sections: [
      {
        heading: 'The reader cannot tell unless you say',
        body: [
          'A discussion essay reports views in order to answer them. If a reader cannot tell which sentences report a position you are about to reject and which carry your own, the whole response reads as one confused opinion — and that costs on Task Response before Lexical Resource is even considered. The fix is four words at the front of a sentence, and it is the cheapest structural improvement available in the paper.',
          'Naming who holds a view also makes the view weighable. “Some people say cars should be banned” names nobody, so the reader cannot judge it before you answer. “Public health researchers argue that…” lets them assign it the weight it deserves, and it costs you nothing because you are about to disagree anyway.',
          'The trap is inventing the source. “Studies have proven” claims a specific thing you do not have, “it is widely held” claims a spread you cannot verify, and an invented percentage is a fabricated fact. The honest constructions — “research indicates”, “proponents argue”, “it is frequently claimed” — carry attribution without pretending to a citation.',
        ],
        points: [
          { term: 'Whose claim is this?', detail: 'Every sentence in a discussion essay belongs to somebody. Say who, or it defaults to you.' },
          { term: 'Name the holder', detail: '“Critics”, “proponents”, “employers”. Four words, and the view becomes weighable.' },
          { term: '“Research” is uncountable', detail: '“Research indicates”, never “researches indicate”. And it indicates; it does not prove.' },
          { term: '“According to” is not for you', detail: 'It reports somebody else. For your own view the essay is already yours — just state it.' },
        ],
      },
    ],
    cost: 'Without attribution a discussion essay reads as though the writer holds every view in it simultaneously, which is exactly the failure the essay type is designed to expose. And an invented source damages beyond its own sentence: once a reader has seen one fabricated statistic, every other claim is read with suspicion.',
    limits: 'Attribution reports; it does not endorse or refute. Naming who holds a view does not answer it, and an essay made entirely of attributed positions has no author in it. And it cannot manufacture authority — “according to experts” with no experts named is the same empty claim as “everybody knows”, with an academic coat on.',
  },
  quantifying: {
    definition: 'Quantifying says how many or how much at a level of precision you can defend — which, in an essay with no data, means choosing the honest word rather than the impressive one.',
    sections: [
      {
        heading: 'Every quantity in Task 2 is yours',
        body: [
          'Task 1 hands you figures; Task 2 hands you nothing. Every quantity in your essay is therefore a claim you made up, and the only thing keeping it honest is which word you chose. “Most”, “many” and “a lot of” are three different claims — one is a majority, one is unquantified, and one is spoken English that claims nothing at all — and only one of them is usually true.',
          'This makes quantifying an argument skill as much as a lexical one. Conceding that only a minority of employers have adopted a scheme, and then arguing that those that have report better outcomes, is more convincing than claiming a majority you cannot support. The honest quantity survives a reader who knows the field; the inflated one hands them a reason to distrust the paragraph.',
          'The grammar is where it breaks in predictable places. “The majority of” counts things and takes a plural verb; “most of” works with an uncountable mass. “Amount” is for a mass, “number” for a count. And “a lot of” is not wrong so much as empty — it lowers the register and reports no quantity in the same three words.',
        ],
        points: [
          { term: 'Count or mass', detail: '“The majority of workers” counts. “Most of the pollution” is a mass. “The majority of the pollution” is neither.' },
          { term: 'Number or amount', detail: '“A number of households”, “an amount of energy”. Swapping them is the commonest slip in this family.' },
          { term: 'Fractions read as considered', detail: '“A third of” sounds measured even without a source, where “many” sounds like a guess.' },
          { term: 'Concede small numbers', detail: '“A minority of” is often the stronger opening, because the argument after it does not depend on the count.' },
        ],
      },
    ],
    cost: 'An inflated quantity is the easiest claim in your essay for a reader to reject, and rejecting it costs the paragraph rather than the sentence. “A lot of” costs differently and constantly: it is spoken English and it reports nothing, so every occurrence is a place where a precise quantity was available for free.',
    limits: 'No quantifier turns an invented figure into a fact — “approximately 70%” with no source is still fabricated, and hedging it makes it worse rather than better. And quantities cannot carry an argument on their own: how many people hold a view is not evidence that the view is right, which is the fallacy this vocabulary most often enables.',
  },
  causing: {
    definition: 'Causal language names which way the arrow points between two things, and commits you to a claim about mechanism that the sentence has to be able to support.',
    sections: [
      {
        heading: 'Direction, and the claim you did not mean to make',
        body: [
          'Every verb in this family points an arrow. “Stem from” puts the effect first; “give rise to” puts the cause first. Choosing the wrong one produces a fluent, grammatical sentence that argues the reverse of what you meant, and nothing in the writing looks wrong — which is what makes it the most expensive error in problem–solution and cause–effect essays.',
          'The second and larger problem is claiming a cause where you only have a correlation. Two things moving together is not one producing the other, and “screen time causes poor sleep” asserts a mechanism nobody has established. In an essay with no sources, “is associated with” is not a weaker sentence: it is the accurate one, and the accurate one is what survives a reader who knows the research.',
          'The prepositions are fixed and not guessable. “Stem from”, “give rise to”, “attributable to”, “correlate with”. Each one is short, each one is part of the verb, and each one is the kind of error that makes a sentence read as translated rather than as written.',
        ],
        points: [
          { term: 'Which way', detail: '“Stem from” = effect first. “Give rise to” = cause first. Fluent English either way, and only one is what you meant.' },
          { term: 'Cause or correlation', detail: '“Causes” claims a mechanism. “Is associated with” claims they move together. Usually only the second is available.' },
          { term: 'Speed is a claim too', detail: '“Trigger” implies a sudden cause. Wrong for slow processes like urbanisation.' },
          { term: 'Prepositions are part of the verb', detail: '“Attributable to”, never “of”. “Correlate with”, never “to”.' },
        ],
      },
    ],
    cost: 'A reversed causal verb makes the paragraph contradict the position stated in your introduction, and it does so invisibly — the response argues against itself and no single sentence looks wrong. An overclaimed cause costs less per occurrence and appears more often: it invites the reader to supply the confounding factor, which they will, while still reading your evidence.',
    limits: 'A connector cannot create a causal relationship the ideas do not have: if the logic is not there before the word goes in, the word only makes its absence visible. And causal chains have a natural length — three links in one sentence is usually one too many, and the last one is normally the one you cannot defend.',
  },
  evaluating: {
    definition: 'Evaluation says whether something is good or bad, and in what specific respect — which is the part “good” and “bad” leave out.',
    sections: [
      {
        heading: '“Good” is not wrong. It is empty.',
        body: [
          'The problem with “public transport is good” is not register, and it is not accuracy. It is that the sentence judges without saying in what respect, so it carries no information a reader can use or dispute. “Public transport is substantially cleaner per passenger” judges and informs at the same time, and the second half is what a following sentence can build on.',
          'This is why the useful words in this family all name a dimension. “Beneficial to” names who benefits; “detrimental to” names what is harmed; “viable” claims it can work in practice, which is a different judgement from claiming it is desirable; “counterproductive” claims it works against its own aim, which no other word in the family carries.',
          'The collocations are unforgiving and follow no logic worth learning. “Detrimental to”, not “for” — the Spanish “perjudicial para” takes the other preposition and the carry-over appears in almost every draft. “Beneficial to” or “for”, both accepted. These are worth memorising as pairs, because no rule generates them.',
        ],
        points: [
          { term: 'Name the respect', detail: 'Beneficial to whom? Detrimental to what? The dimension is the information.' },
          { term: 'Viable ≠ good', detail: '“Viable” claims it can work. Whether it should is a separate judgement.' },
          { term: 'Counterproductive is specific', detail: 'It means the measure works against its own aim — not merely that it failed.' },
          { term: '“Detrimental to”', detail: 'Never “for”. It is the collocation error that survives every proofread.' },
        ],
      },
    ],
    cost: 'Every “good” and “bad” is a place where a precise adjective would have added content for free, so the cost is cumulative rather than dramatic: a response full of them says less than its length suggests. And “very good” at the head of a conclusion leaves the “so” that follows it resting on nothing the reader can check.',
    limits: 'Evaluation belongs where the task asks for it. Task 1 reports and does not judge — “a worrying rise” is a claim about the world, not about the chart. And an evaluative adjective cannot substitute for the reasoning that earns it: calling a policy counterproductive requires showing the reversal, not asserting it.',
  },
  proposing: {
    definition: 'Proposal language names what should be done, precisely enough that a reader could picture it happening.',
    sections: [
      {
        heading: 'Where problem–solution essays go to die',
        body: [
          'Almost every problem–solution response ends the same way: “the government should do something about it”. The phrase proposes nothing, and it appears at exactly the moment the essay was supposed to deliver its most valuable content. What makes it so common is that it feels like a proposal while you are writing it — it has a subject, a modal and an object, and it is grammatically indistinguishable from a real one.',
          'A proposal is only worth marks if the reader can see the action: who does what, to what, with what. “Allocate” forces you to name where the money comes from; “phase out” forces you to name the timescale; “prioritise” forces you to admit something else gets less, which is what makes it an argument rather than a wish. The verb does the work that “do something about” avoids.',
          'The grammar is small and specific. “Implement” takes a policy or a scheme — something with a plan behind it — and cannot take an abstract noun: you cannot implement awareness. “Subsidise” takes its object directly, with no preposition. “Allocate” takes a resource and then “to” plus a purpose.',
        ],
        points: [
          { term: 'Name the actor', detail: '“Everybody should” is nobody. A proposal needs somebody who can carry it out.' },
          { term: 'Name the mechanism', detail: '“Allocate a share of fuel duty” is a proposal. “Invest more” is a wish.' },
          { term: 'What each verb takes', detail: 'Implement a scheme, not awareness. Subsidise families, not “to families”.' },
          { term: 'Gradual is a proposal too', detail: '“Phase out” is often more defensible than “ban”, and it is one verb instead of a clause.' },
        ],
      },
    ],
    cost: 'A problem–solution essay whose solutions are unspecified has answered half the question, and it is the half weighted most heavily in that essay type. The phrase itself costs again on Lexical Resource: “do something about” is five words of spoken English standing where the most precise vocabulary in the response should have been.',
    limits: 'A proposal is not an argument for itself. Naming a measure precisely does not show it would work, and the paragraph still has to explain why. And proposals only belong where the prompt asked — appended to an opinion essay they answer a question nobody put, and they arrive without the paragraph that would have justified them.',
  },
  register: {
    definition: 'Register is the level of formality the task expects, and it is lost one word at a time by choices that are all grammatically correct.',
    sections: [
      {
        heading: 'Correct English in the wrong room',
        body: [
          'Nothing in “Lots of kids these days don’t get enough exercise” is a grammar error. That is exactly why it survives proofreading: you are looking for mistakes and there are none. What there is instead is four choices that belong to speech — an empty quantifier, an informal noun, a contraction, and a vague judgement — and the corrected sentence reads as though a different person wrote it.',
          'The leaks cluster predictably. They appear in the final paragraph, written fastest, and in the sentences where the writer felt strongly, because that is when the voice in your head is a speaking voice. Knowing that is most of the fix: the last paragraph is where to look first, and it takes thirty seconds.',
          'What is not a register problem is a short sentence. Simplicity is not informality, and replacing a clear short sentence with a long one at the last minute is the most reliable way to introduce a grammar error into a paragraph that did not have one. The hunt is for spoken choices, not for brevity.',
        ],
        points: [
          { term: 'Contractions', detail: '“Do not”, not “don’t”. The cheapest fix in the paper and the most visible failure.' },
          { term: 'Not every phrasal verb', detail: '“Carry out” and “point out” are fine. “Sort out” and “put up with” are not.' },
          { term: 'Rhetorical questions', detail: 'They hand the argument back to the reader at the moment you should be making it.' },
          { term: 'Where to look', detail: 'The final paragraph. It is written fastest and it is the last thing the examiner reads.' },
        ],
      },
    ],
    cost: 'Register is judged separately from grammar, so a response can be error-free and still lose on it — and because the leaks cluster in the conclusion, they land on the last thing read. Each one is also free to fix: the neutral word is usually shorter than the informal one and always available.',
    limits: 'Formality is not the goal in itself. An essay written entirely in impersonal constructions has hidden its author, and Task Response wants a position it can see. And no amount of register work rescues a response that did not answer the question — this is a polish pass, not a repair.',
  },
};

export const FUNCTION_GUIDED: Record<string, GuidedExercise> = {
  hedging: {
    brief: 'The claim you want to make: “Automation will eliminate most manufacturing jobs within a decade.”',
    goal: 'Hedge it without emptying it — one hedge, marking one specific uncertainty.',
    steps: [
      { instruction: 'Name what you are actually unsure about', hint: 'Not “everything”. Is it whether it happens, how many jobs, or how fast? Pick one and say so.', minWords: 8, placeholder: 'I am unsure about …', model: 'I am unsure about the size: something will go, but “most” is a number I cannot support.', why: 'Naming the uncertainty first is what produces one hedge instead of four. A writer who has not decided what is uncertain hedges the whole sentence and says nothing.' },
      { instruction: 'Hedge that one thing', hint: 'Change the part you named and leave the rest alone. Check the grammar of whatever you chose.', minWords: 8, placeholder: 'Automation is likely to …', model: 'Automation is likely to eliminate a substantial share of manufacturing jobs.', why: '“A substantial share” replaces the number you could not defend, and “is likely to” marks the prediction as probable. The timescale survived because you were not unsure about it.' },
      { instruction: 'Read it back and count the hedges', hint: 'How many uncertainty markers are in your sentence? If more than two, delete one and say which.', minWords: 6, placeholder: 'There are … hedges, which is …', model: 'Two: “is likely to” and “a substantial share”. Each marks a different thing, so neither is redundant.', why: 'This step is the whole discipline. Four hedges on one claim is avoidance, and it is invisible while writing because each one felt reasonable on its own.' },
    ],
    result: 'Automation is likely to eliminate a substantial share of manufacturing jobs over the next decade.',
  },
  asserting: {
    brief: 'Your paragraph has just shown that cycle networks reduce serious injuries in three cities.',
    goal: 'Assert the conclusion at the strength that paragraph earned — no more.',
    steps: [
      { instruction: 'Say what your evidence actually supports', hint: 'Three cities. Does that support “always”, “consistently”, or “in some cases”? Write which and why.', minWords: 8, placeholder: 'Three cities support … but not …', model: 'Three cities support a repeating pattern, but not a universal law: one city with different results would not refute “consistently”, but it would refute “invariably”.', why: 'The strength is decided by the evidence, not by how convinced you feel. Testing a word against one imagined counter-example is the fastest way to find its ceiling.' },
      { instruction: 'Write the assertion', hint: 'Choose the adverb you just justified, and put it where it goes — before the verb or after the auxiliary.', minWords: 8, placeholder: 'Cities with protected networks have …', model: 'Cities with protected cycle networks have consistently recorded lower rates of serious injury.', why: '“Consistently” claims the pattern repeats, which three cities can support, and “recorded” keeps the sentence to what the data shows rather than to what caused it.' },
      { instruction: 'Check your budget', hint: 'How many strong words are in this essay so far? If this is the third, say what you would soften elsewhere.', minWords: 6, placeholder: 'This is my … strong claim, so …', model: 'This is my second, so it can stand. If I had already asserted twice, I would soften the weaker of the two.', why: 'Strength is a budget. Spent on every paragraph it stops registering anywhere, and the point you most wanted to land arrives sounding like all the others.' },
    ],
    result: 'Cities with protected cycle networks have consistently recorded lower rates of serious injury.',
  },
  attributing: {
    brief: 'You are about to answer a view you reject: that congestion charging penalises poorer drivers.',
    goal: 'Report it so a reader can weigh it — and so nobody mistakes it for yours.',
    steps: [
      { instruction: 'Decide who holds this view', hint: 'Not “some people”. Who specifically would argue this? Naming them is what makes it weighable.', minWords: 6, placeholder: 'This view is held by …', model: 'Critics of the scheme, and motoring organisations in particular.', why: 'A named holder lets the reader assign the view its weight before you answer it. “Some people” names nobody, so they cannot.' },
      { instruction: 'Choose the reporting verb', hint: 'Does the verb mark this as contested or as established? Say which you chose and what it signals.', minWords: 6, placeholder: 'I would use … because it marks …', model: '“Contend”, because it marks the view as a position being argued rather than a fact being reported.', why: '“Argue” and “contend” mark a claim as contested; “show” and “demonstrate” would concede it. The verb is doing work you did not have to spend a clause on.' },
      { instruction: 'Write the sentence', hint: 'Holder, verb, clause. Check nothing in it commits you to agreeing.', minWords: 10, placeholder: 'Critics of the scheme contend that …', model: 'Critics of the scheme contend that it penalises drivers who have no realistic alternative.', why: 'Attributed, weighable, and entirely uncommitted — which is what the sentence before a rebuttal has to be.' },
    ],
    result: 'Critics of the scheme contend that it penalises drivers who have no realistic alternative.',
  },
  quantifying: {
    brief: 'You believe this is true of clearly more than half of urban households, and you have no figure.',
    goal: 'State the quantity honestly, and get the grammar of the quantifier right.',
    steps: [
      { instruction: 'Decide the strongest claim you can defend', hint: 'More than half. Is that “most”, “the vast majority”, or “a number of”? Write which and why the others fail.', minWords: 8, placeholder: 'I can defend … but not …', model: 'I can defend “the majority”, which claims more than half. “The overwhelming majority” claims nearly all, and “a number of” claims almost nothing.', why: 'Three words for one idea, and they are three different claims. Choosing before writing is what stops the quantity drifting upward as the sentence is composed.' },
      { instruction: 'Check countable or mass, and fix the verb', hint: 'Households are counted. Does your quantifier work with a count? And is the verb singular or plural?', minWords: 6, placeholder: 'Households are countable, so …', model: 'Households are countable, so “the majority of households” works, and the verb agrees with “households”: plural.', why: '“The majority of” counts and “most of” works with a mass. And the verb agrees with the noun after “of”, not with “majority” — the slip that appears in almost every draft.' },
      { instruction: 'Write it', hint: 'Put the quantifier, the noun and the verb together, and add what makes the claim mean something.', minWords: 10, placeholder: 'The majority of urban households …', model: 'The majority of urban households now spend more than a third of their income on rent.', why: 'Two quantities and neither invented: one for how many households, one for how big the burden is. A fraction reads as considered even without a source.' },
    ],
    result: 'The majority of urban households now spend more than a third of their income on rent.',
  },
  causing: {
    brief: 'Two facts: rents rose sharply in the city centre, and the number of families with children living there fell.',
    goal: 'State the relationship at the strength the evidence supports — which may not be causal.',
    steps: [
      { instruction: 'Decide what you actually know', hint: 'Do you know one caused the other, or only that they moved together? Be honest before choosing a verb.', minWords: 8, placeholder: 'I know that … but I do not know …', model: 'I know both happened over the same period. I do not know that rents drove the move — the schools or the housing stock could have.', why: 'This is the decision the verb will report. Made after choosing the verb, it never gets made at all, and the sentence claims a mechanism by accident.' },
      { instruction: 'Choose the verb that reports exactly that', hint: 'If you only know they moved together, there is a phrase for that. Write it, with its preposition.', minWords: 5, placeholder: 'I would use …', model: '“Is associated with”, which takes “with” and claims they move together without claiming direction.', why: 'This is not a weaker sentence: it is the accurate one. “Caused” would have asserted a mechanism that a reader with one confounding factor can dismantle.' },
      { instruction: 'Write it, and then write the causal version too', hint: 'Write both, and say in one clause what extra you would need before the causal one is defensible.', minWords: 16, placeholder: 'Rising rents are associated with … / To claim causation I would need …', model: 'Rising central rents are associated with a decline in the number of resident families. To claim causation I would need evidence ruling out schools and housing supply.', why: 'Writing both makes the gap visible. The causal claim is not forbidden — it is unpurchased, and now you know exactly what it would cost.' },
    ],
    result: 'Rising central rents are associated with a decline in the number of resident families.',
  },
  evaluating: {
    brief: 'You want to say that home working is good for employees and bad for firms.',
    goal: 'Judge it, and name the respect — which is the content the vague version was missing.',
    steps: [
      { instruction: 'Name the respect in each direction', hint: 'Good for employees in what way? Bad for firms in what way? Two answers, no adjectives yet.', minWords: 10, placeholder: 'Good for employees because … bad for firms because …', model: 'Good for employees in terms of work–life balance; bad for firms in terms of the informal contact teams rely on.', why: 'The respect is the content, not a decoration on it. The vague version was not badly worded — it was missing this, and no adjective would have supplied it.' },
      { instruction: 'Choose the adjectives, and check their prepositions', hint: 'Two adjectives, and one of them takes a preposition that Spanish gets wrong. Name both.', minWords: 6, placeholder: 'beneficial … detrimental …', model: '“Beneficial for” employees and “detrimental to” the firm — “detrimental” never takes “for”.', why: '“Detrimental for” is the collocation error that survives every proofread, because nothing about it is a grammar mistake. It is a carry-over from “perjudicial para”.' },
      { instruction: 'Write the sentence', hint: 'Both judgements, both respects, both prepositions. One sentence.', minWords: 16, placeholder: 'Home working is beneficial for …', model: 'Home working is beneficial for employees’ work–life balance but detrimental to the informal contact that teams depend on.', why: 'Two judgements, each naming what is affected, so the sentence carries an argument rather than an opinion — and the next sentence has something to build on.' },
    ],
    result: 'Home working is beneficial for employees’ work–life balance but detrimental to the informal contact that teams depend on.',
  },
  proposing: {
    brief: 'Your problem–solution essay is about food waste. You are writing the solution paragraph.',
    goal: 'Turn “something must be done” into a measure a reader can picture.',
    steps: [
      { instruction: 'Name who can actually do it', hint: 'Not “society” and not “everybody”. Who has the power to carry this out?', minWords: 5, placeholder: 'The actor is …', model: 'Local authorities, because they already regulate what supermarkets may discard.', why: 'A proposal without an actor is a wish. “Everybody should be more careful” is the version that appears when this step is skipped.' },
      { instruction: 'Choose the verb, and check what it takes', hint: 'Implement, allocate, require, phase out? Each takes something different after it. Say which and what.', minWords: 6, placeholder: 'I would use … which takes …', model: '“Require”, which takes an object and then an infinitive: require supermarkets to do something.', why: '“Implement” would have failed here — it takes a scheme, not an action by somebody else. Checking what the verb takes is what stops “implement more awareness”.' },
      { instruction: 'Write the measure', hint: 'Actor, verb, target, and what specifically happens. A reader should be able to picture it.', minWords: 12, placeholder: 'Local authorities should require …', model: 'Local authorities should require supermarkets to redistribute unsold edible stock to registered food banks.', why: 'Actor, mechanism and destination all named. The reader can picture it happening, which is the only test a proposal has to pass.' },
    ],
    result: 'Local authorities should require supermarkets to redistribute unsold edible stock to registered food banks.',
  },
  register: {
    brief: 'Your conclusion reads: “To sum up, I reckon the govt needs to sort out this problem ASAP, don’t you think?”',
    goal: 'Find every leak and fix it — without rewriting the sentence.',
    steps: [
      { instruction: 'List the leaks', hint: 'There are five, and not one of them is a grammar error. Name each and what kind it is.', minWords: 10, placeholder: 'reckon (spoken verb), govt (…), …', model: '“Reckon” is a spoken verb; “govt” is an abbreviation; “sort out” is an informal phrasal verb; “ASAP” is an initialism; and the tag question is a rhetorical device.', why: 'Five separate kinds in one sentence, all grammatically correct. That is exactly why they survive a proofread: you are looking for errors and there are none.' },
      { instruction: 'Name the replacement for each', hint: 'Neutral equivalents. Careful with the phrasal verb — not all of them are informal.', minWords: 8, placeholder: 'reckon → …, govt → …', model: 'reckon → consider; govt → government; sort out → resolve; ASAP → without further delay; and the tag question is deleted, not replaced.', why: 'The tag question is the important one: it hands the argument back to the reader at the moment the conclusion should be making it, so there is nothing to swap it for.' },
      { instruction: 'Write the repaired sentence', hint: 'Same structure, same claim. Only the words change.', minWords: 10, placeholder: 'In conclusion, …', model: 'In conclusion, the government should resolve this problem without further delay.', why: 'Five swaps, no restructuring, and the sentence now belongs to the register the task expects. This is the whole of what a register pass costs.' },
    ],
    result: 'In conclusion, the government should resolve this problem without further delay.',
  },
};
