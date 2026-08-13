/**
 * La explicación larga y el ejercicio guiado de cada familia de conectores.
 *
 * Bloques 1 y 3 del blueprint de Writing. Lo demás de esta unidad —las nueve familias con sus
 * conectores anotados, los ejemplos, los errores, los ejercicios, el test mixto, el motor y la
 * reparación de párrafo— ya existía y no se ha tocado: era, con diferencia, la sub-habilidad
 * más completa del curso antes de que el blueprint existiera.
 *
 * QUÉ LE FALTABA, ENTONCES
 *
 * Lo mismo que a paraphrasing: dos párrafos de introducción donde hacía falta una lección, y
 * ningún escalón entre el ejemplo resuelto y el ejercicio de opción. Un conector se elige
 * bien o mal en una frase que estás escribiendo tú, no eligiendo entre cuatro que ha escrito
 * otro, y esa producción no estaba en ninguna parte de la unidad.
 *
 * EL GUIADO DE ESTA UNIDAD TIENE UNA FORMA PROPIA
 *
 * En las demás sub-habilidades el paso 1 pide producir. Aquí pide NOMBRAR LA RELACIÓN antes de
 * tocar ninguna palabra, porque ese es el orden en que la habilidad funciona y el orden que
 * casi nadie sigue: quien elige el conector primero acaba uniendo con «because» dos frases que
 * no tienen ninguna relación causal, y la frase resultante es gramatical, suena bien y afirma
 * algo que el escritor no quería afirmar.
 */

import type { Explainer, GuidedExercise } from '../../_shared/skill-blueprint';

export const LINKING_EXPLAINERS: Record<string, Explainer> = {
  addition: {
    definition: 'Addition connectors tell the reader that the next idea travels in the same direction as the one before it — that you are piling on, not turning.',
    sections: [
      {
        heading: 'What “the same direction” actually means',
        body: [
          'Two sentences point the same way when they support the same conclusion. “Remote work removes the commute” and “it lets people live further from expensive centres” are both arguments for remote work, so an addition connector is honest between them. The test is not whether the sentences are about the same topic — they usually are either way — but whether a reader who agreed with the first would be moved further along by the second.',
            'This is why the commonest error with this family is not a misspelling or a comma. It is using “furthermore” to join a benefit and a drawback. The reader has been told to expect more of the same and receives the opposite, and the paragraph reads as though the writer lost track of their own argument halfway through — which, from the reader’s side, is exactly what happened.',
          'The second thing worth knowing is that these connectors do not all behave alike grammatically. “Furthermore” opens a sentence and cannot take an object; “in addition to” takes a noun and cannot open a clause on its own. Two words that mean the same thing, two different structures, and swapping them produces a fragment.',
        ],
        points: [
          { term: 'Same direction', detail: 'Both sentences support the same conclusion. If the second qualifies the first, you need contrast instead.' },
          { term: 'Weight, not just quantity', detail: '“Moreover” suggests the new point settles the matter. Use it for your strongest addition, not your third.' },
          { term: 'Clause or noun', detail: '“Furthermore, X happened” takes a clause. “In addition to X” takes a noun. They are not interchangeable.' },
          { term: 'Inversion after “not only”', detail: '“Not only does it cost more…” — the verb moves in front of the subject, and forgetting it is the classic slip.' },
        ],
      },
    ],
    cost: 'An addition connector in front of a contrasting idea is worse than no connector at all: with nothing there, the reader works out the relationship for themselves; with the wrong one, they are actively misled and then have to reread. It lands on Coherence and Cohesion, which is assessed on whether the signposting matches the logic — not on whether signposting is present.',
    limits: 'Adding is not developing. A paragraph of four ideas joined by “furthermore” and “moreover” is a list with connectors on it, and it scores as a list: the criterion rewards an idea followed through, not several announced. If you find yourself needing a third addition connector in one paragraph, the paragraph probably has one idea too many and no development of any of them.',
  },

  contrast: {
    definition: 'Contrast connectors warn the reader that the next idea pushes against the one before it, so the reversal does not arrive unannounced.',
    sections: [
      {
        heading: 'The warning is the whole function',
        body: [
          'A reader builds an expectation with every sentence. When the next one reverses direction without warning, they have to go back and rebuild — and that rereading is exactly what a cohesion mark measures. The contrast connector costs one word and removes the need for it. That is all it does, and it is why the family matters more in a discussion essay than anywhere else: the entire structure of that essay type is a controlled series of reversals.',
          'The family splits along a line that decides your punctuation, and the split is not about meaning. “However” is an adverb: it opens a new sentence, or follows a semicolon, and it cannot join two clauses with a comma. “But” and “whereas” are conjunctions: they join clauses inside one sentence. Writing “The scheme was cheap, however it failed” is the comma splice, and it is the most common punctuation error in Task 2 — produced by a word choice, not by carelessness with commas.',
          'The third thing is strength. “However” is neutral. “Nevertheless” concedes that the first point had force and reverses anyway. “In contrast” sets two things side by side without preferring either. Choosing among them is a decision about how much ground you are giving, and it is visible to the reader whether you meant it or not.',
        ],
        points: [
          { term: 'Adverb or conjunction', detail: '“However” opens a sentence. “But” and “whereas” join clauses. This decides the punctuation, not the meaning.' },
          { term: 'The comma splice', detail: '“X, however Y” is two sentences joined by a comma. It needs a full stop or a semicolon.' },
          { term: 'Noun or clause', detail: '“Despite” and “in spite of” take a noun. “Although” takes a clause. “Despite it was late” is the classic error.' },
          { term: 'How much you concede', detail: '“Nevertheless” admits the first point had force. “In contrast” prefers neither side.' },
        ],
      },
    ],
    cost: 'A missing contrast marker makes a reader reread, and rereading is what cohesion marks measure. A misplaced one is worse: “however” in front of an idea that agrees with the previous sentence tells the reader a reversal is coming and then does not deliver it, which reads as a writer who does not know what their own paragraph is arguing.',
    limits: 'Contrast marks a reversal that is genuinely there. Putting “however” between two compatible ideas manufactures a tension the argument has to spend a sentence resolving. And a discussion essay does not need one in every paragraph: if both body paragraphs open with a reversal, the second one has nothing to reverse — the reader lost the thread of what your actual position was somewhere in the first.',
  },

  'cause-and-effect': {
    definition: 'Cause connectors state which of two things produced the other, and they carry a claim about direction that the sentence commits you to.',
    sections: [
      {
        heading: 'Direction is the claim, and it is checkable',
        body: [
          'Every connector in this family points an arrow. “Therefore” puts the cause first and the effect second; “because” does the opposite. Choosing the wrong one does not produce awkward English — it produces a fluent sentence that argues the reverse of what you meant, which is the most expensive kind of error because nothing in the writing looks wrong.',
          'The second trap is claiming a cause you only have a correlation for. “Screen time causes poor sleep” and “screen time is associated with poor sleep” are different claims, and only the second one survives contact with someone who knows the research. In Task 2 you have no sources, so the safer verb is nearly always the honest one — and reaching for the causal claim to sound decisive is how a paragraph acquires a weakness a reader can see and you cannot.',
          'Then there is the grammar, which is unusually unforgiving here. “Because” takes a clause and “because of” takes a noun; “due to” follows a noun and a form of “be”. These are three different structures for one idea, and each one produces a fragment if you pick the wrong shape for what follows it.',
        ],
        points: [
          { term: 'Which way the arrow points', detail: '“Therefore” = cause first. “Because” = effect first. Swapping them reverses the argument fluently.' },
          { term: 'Cause or correlation', detail: '“Causes” claims a mechanism. “Is associated with” claims they move together. You usually only have the second.' },
          { term: 'Clause or noun', detail: '“Because it rained” takes a clause; “because of the rain” takes a noun. “Because of it rained” is neither.' },
          { term: '“Due to” is fussier', detail: 'In careful writing it follows a noun and “be”: “the delay was due to funding”. Opening a sentence with it is still marked.' },
        ],
      },
    ],
    cost: 'A reversed causal connector is invisible to the writer and obvious to the reader: the paragraph now argues the opposite of the position stated in the introduction, and the response contradicts itself without anybody noticing at the point where it happened. An overclaimed cause is cheaper but constant — it hands a reader a counter-example to think of while they are still reading your evidence.',
    limits: 'Two things happening in sequence are not necessarily cause and effect, and a connector cannot make them so: the logic has to be in the ideas before the word goes in. Nor does this family stack — three causal links in one sentence produces a chain nobody can follow, and the third link is usually the one you cannot defend anyway.',
  },

  examples: {
    definition: 'Example connectors introduce a concrete case that shows an abstract claim in operation. They illustrate; they do not prove.',
    sections: [
      {
        heading: 'Illustration is not evidence, and the distinction is graded',
        body: [
          'Task 2 gives you no sources and expects none. An example exists to make an abstract claim visible — to show what it looks like when it actually happens — and that is a genuinely useful job: a reader who has seen the claim in operation understands it better than one who has only been told it. What an example cannot do is establish that the claim is true, and the vocabulary has to respect that difference.',
          '“A case in point is” and “for instance” illustrate. “Studies have proven that” and “according to a 2019 report” claim a source you do not have and cannot cite, and invented statistics are the most damaging version because they feel like rigour while you are writing them. An examiner who has read four essays quoting four different invented percentages reads the fifth exactly as what it is.',
          'The grammar is small and worth getting right: “for example” takes a comma on both sides when it sits inside a sentence, and “such as” takes a noun with no comma at all. “For example of” does not exist — the phrase that does is “an example of”.',
        ],
        points: [
          { term: 'Illustrate, do not prove', detail: 'One concrete case makes the claim visible. It does not establish it, and no wording will.' },
          { term: 'No invented figures', detail: '“A recent study found that 73%…” is a fabricated fact and reads as one.' },
          { term: 'Punctuation', detail: '“For example” takes commas mid-sentence. “Such as” takes a noun and no comma.' },
          { term: 'One per paragraph', detail: 'A paragraph that is mostly example has stopped arguing.' },
        ],
      },
    ],
    cost: 'A fabricated source damages more than the sentence it sits in: once a reader has seen one invented statistic, every other claim in the essay is read with suspicion. And a missing example costs differently — an abstract claim that is never shown in operation stays abstract, and the criterion asks for ideas that are extended and supported, not merely stated.',
    limits: 'An example is one paragraph’s worth of illustration, not a substitute for reasoning: if the example is doing the arguing, the argument was never written. And it must actually be a case of the claim — a case that illustrates something adjacent is worse than none, because the reader now has to work out what it was for.',
  },

  concession: {
    definition: 'Concession connectors admit that the opposing point has force, and then go on anyway. They are the vocabulary of an argument that has considered its own weaknesses.',
    sections: [
      {
        heading: 'Why conceding makes a position stronger, not weaker',
        body: [
          'The instinct is that admitting a point against you costs ground. The opposite is true, and it is true for a specific reason: a reader who can think of an obvious objection and does not see you address it assumes you did not think of it. Naming it, granting what is true in it, and then explaining why your position survives is the difference between an argument and an assertion — and it is exactly what the criterion means by considering the issue.',
          'The family is small and the shape is fixed: concede first, then reverse. “Admittedly, the scheme is expensive; it nevertheless offers the only realistic route to lower emissions.” Doing it in the other order does not work, because a concession that arrives after your conclusion reads as an afterthought that undermines it rather than a weakness you had already priced in.',
          'The grammatical trap is the doubled marker. Spanish allows “aunque… pero”, and the carry-over produces “Although the scheme was expensive, but it went ahead.” English uses one or the other and never both — one relationship, one word announcing it.',
        ],
        points: [
          { term: 'Concede, then reverse', detail: 'The order is fixed. A concession after your conclusion reads as a retraction of it.' },
          { term: 'Grant something real', detail: 'Conceding a point nobody made is padding. Concede the objection a reader would actually raise.' },
          { term: 'Never double the marker', detail: '“Although … but” is one relationship announced twice. A direct carry-over from “aunque … pero”.' },
          { term: 'Not the same as contrast', detail: 'Contrast sets two things side by side. Concession admits one has force and proceeds anyway.' },
        ],
      },
    ],
    cost: 'An essay with no concession reads as one that never considered the other side, which is precisely what a “discuss both views” instruction is checking for — and even in an opinion essay it makes a position look unexamined. The reverse costs too: conceding without reversing leaves the paragraph having argued the opposite of your introduction, and readers take the last thing you said as your view.',
    limits: 'Concession has a floor and a ceiling. Conceding the central claim of your own position leaves you with nothing to argue, and conceding in every paragraph produces an essay whose position is invisible. One well-chosen concession per essay, or one per body paragraph at most, is what a considered argument looks like; more than that is a writer agreeing with everyone.',
  },

  comparison: {
    definition: 'Comparison connectors say that two things behave alike, which is a claim the reader will check against whatever they know about both.',
    sections: [
      {
        heading: 'Saying two things are alike is an argument, not a decoration',
        body: [
          'A comparison does real work in an essay: it lets a claim you have established about one case carry over to another, which is cheaper than arguing both. That is also why it is checkable. “Similarly, private schools face the same pressure” claims the pressure is genuinely the same, and a reader who knows one obvious difference now has a reason to doubt the paragraph rather than the sentence.',
          'The family divides by how strong the likeness is. “Similarly” and “likewise” claim close parallel. “In the same way” claims the mechanism is shared, which is stronger. “Just as … so too” is the most formal and the most emphatic, and it needs both halves — the construction is incomplete without its second clause, which is where it usually breaks.',
          'The commonest error is not grammatical. It is using a comparison connector to introduce something that is merely also true: “Similarly, the government should invest in schools” after a paragraph about hospitals claims a parallel that has not been shown. The word promises the reader a likeness, and the sentence has to deliver one.',
        ],
        points: [
          { term: 'The likeness is a claim', detail: '“Similarly” asserts the two cases behave alike. A reader who knows one difference will use it against you.' },
          { term: 'Degrees of similarity', detail: '“Likewise” = close parallel. “In the same way” = shared mechanism, which is a stronger claim.' },
          { term: 'Both halves', detail: '“Just as X, so too Y.” The construction needs its second clause, and dropping it leaves a fragment.' },
          { term: 'Not merely “also”', detail: 'A second true statement is addition. Comparison needs the two cases to be alike in the relevant respect.' },
        ],
      },
    ],
    cost: 'A comparison that does not hold gives a reader a concrete reason to distrust the paragraph, and it is the kind of doubt that spreads: if this parallel was asserted without checking, what else was? And a missing comparison is a missed economy — an argument you have already made for one case can often cover a second for the price of one connector.',
    limits: 'Two things being both good, or both common, is not a similarity worth marking: the likeness has to be in the respect the paragraph is arguing about. And comparison cannot substitute for evidence — showing that two cases resemble each other does not establish anything about either one unless something has already been established about the first.',
  },

  conclusion: {
    definition: 'Concluding connectors signal that what follows is the closing move, and that no new argument is coming.',
    sections: [
      {
        heading: 'A signal, and a promise about what comes next',
        body: [
          'These are the smallest family and the easiest to use correctly, which is why the mistakes with them are so consistent. “In conclusion” tells the reader you are about to close, and that promise binds you: what follows must restate, not extend. A new reason arriving after “in conclusion” is a claim with no paragraph behind it, and it damages the essay backwards by making the reader wonder why it was not argued.',
          'The second consistent error is using one of these to close a paragraph rather than the essay. “In conclusion” at the end of Body 1 tells the reader the essay is finishing when two paragraphs remain. The word for closing a paragraph is different — “for this reason”, “this suggests that” — and the confusion produces an essay that appears to end three times.',
          'The third is quantity. One concluding marker, once, at the start of the final paragraph. “In conclusion, to sum up, finally” is three signals for one paragraph, and each one weakens the others.',
        ],
        points: [
          { term: 'Once, at the end', detail: 'One marker, in the final paragraph. Not at the end of Body 1, and not three of them together.' },
          { term: 'It promises no new content', detail: 'A fresh reason after “in conclusion” arrives with no paragraph supporting it.' },
          { term: 'Closing a paragraph is different', detail: '“For this reason” and “this suggests that” close a paragraph. “In conclusion” closes an essay.' },
          { term: '“On balance” has a condition', detail: 'It promises two sides were weighed, so the essay has to have weighed them.' },
        ],
      },
    ],
    cost: 'A missing conclusion is the cheapest mark in the paper to lose — the paragraph is four sentences long and Task Response is assessed partly on it. A concluding marker used mid-essay is cheaper but confusing: the reader prepares to finish and then finds two more paragraphs, and the structure they had built collapses.',
    limits: 'These connectors signal a conclusion; they do not create one. “In conclusion” in front of a sentence that adds a new reason has announced a close and then not delivered it. And they cannot rescue an essay that never took a position — there is nothing to restate, and the paragraph ends up summarising the question rather than answering it.',
  },

  condition: {
    definition: 'Conditional connectors attach an outcome to a circumstance, which lets you argue about cases that have not happened.',
    sections: [
      {
        heading: 'How to argue about something that is not true yet',
        body: [
          'Much of Task 2 is about what would happen if something changed, and the conditional is the only grammar that lets you say it without claiming it is happening. “If governments restricted car access, congestion would fall” argues a case without asserting either half — which is precisely what a proposal needs, because the whole point is that it has not been done.',
          'The tenses are where this family breaks, and the break is systematic rather than random. A real possibility takes present plus “will”; a hypothetical takes past plus “would”. Mixing them — “If governments would restrict access, congestion will fall” — is one of the most recognisable first-language errors in the exam, and it appears in exactly the sentences where a writer is making their strongest proposal.',
          'The punctuation is smaller and just as consistent. A fronted “if” clause takes a comma; a trailing one does not. “If X, Y” and “Y if X” are both correct, and “Y, if X” is not.',
        ],
        points: [
          { term: 'Real or hypothetical', detail: 'Present + “will” for a real possibility. Past + “would” for a hypothetical one.' },
          { term: 'Never “if … would”', detail: 'The “would” goes in the result clause, never in the “if” clause. The most recognisable error in this family.' },
          { term: 'The comma', detail: 'A fronted “if” clause takes one; a trailing one does not.' },
          { term: 'Alternatives to “if”', detail: '“Provided that”, “unless”, “as long as”. “Unless” already means “if not” — never pair it with a negative.' },
        ],
      },
    ],
    cost: 'The tense mixture is not a subtle error: it is one of the patterns an examiner is trained to notice, and it lands on Grammatical Range and Accuracy in the sentences where you were making your most important claim. Avoiding conditionals altogether costs elsewhere — you lose the only structure that lets you argue a proposal without asserting it has already worked.',
    limits: 'A conditional argues a case; it does not establish it. “If cities restricted cars, congestion would fall” is a claim that still needs supporting, and its conditional form does not exempt it. And stacking two conditions in one sentence produces something no reader can evaluate — if the argument needs two circumstances to hold at once, it needs two sentences.',
  },

  correlative: {
    definition: 'Correlative connectors come in pairs that split across a sentence, and neither half works without the other.',
    sections: [
      {
        heading: 'Two halves, one structure',
        body: [
          '“Not only … but also”, “both … and”, “either … or”, “neither … nor”. What distinguishes these from every other family is that they are one connector in two pieces, and the grammar binds the two pieces together. Dropping the second half is the commonest failure, and it leaves a sentence that a reader has been primed to expect more of — the “not only” has promised a “but also” that never arrives.',
          'The second requirement is parallel structure: whatever follows the first half must have the same grammatical shape as whatever follows the second. “Not only to reduce costs but also improving service” fails this — an infinitive on one side, a gerund on the other — and the mismatch is audible even to a reader who could not name the rule.',
          'Then the inversion, which is specific to one member of the family. When “not only” opens a sentence, the verb moves in front of the subject: “Not only does it cost more, but it also takes longer.” Leaving the normal order there is the single most common error with the construction, and it is worth memorising as a whole phrase rather than as a rule.',
        ],
        points: [
          { term: 'Both halves, always', detail: '“Not only” without “but also” leaves the sentence unfinished for the reader.' },
          { term: 'Parallel shapes', detail: 'Infinitive on both sides, or gerund on both sides. Never one of each.' },
          { term: 'Inversion after “not only”', detail: 'Sentence-initial “not only” inverts the verb: “Not only does it cost…”.' },
          { term: '“Neither … nor” is already negative', detail: 'Adding another negative reverses the meaning: “neither X nor Y” needs no “not”.' },
        ],
      },
    ],
    cost: 'A broken correlative is unusually visible because the reader is holding the first half in mind while waiting for the second, so its absence registers immediately. And these constructions are the clearest available demonstration of grammatical range in a Task 2 response — using them accurately is worth more than using three ordinary connectors, and using them wrongly costs more too.',
    limits: 'They are emphatic by design, so more than one or two in an essay flattens the effect and starts to sound like a speech. And they will not carry a weak pairing: “not only … but also” promises that the second item is at least as strong as the first, so putting a minor point in the second half undercuts the construction that was meant to emphasise it.',
  },
};

export const LINKING_GUIDED: Record<string, GuidedExercise> = {
  addition: {
    brief: 'You have written: “Free museum entry raises visitor numbers among low-income families.” You want to add a second point in favour.',
    goal: 'Build the addition properly: check the direction first, then choose the word, then write it.',
    steps: [
      { instruction: 'Write a second sentence that goes the SAME way', hint: 'It must support the same conclusion — that free entry is a good thing. Do not write the connector yet.', minWords: 8, placeholder: 'It also …', model: 'Free entry encourages repeat visits, so a collection becomes part of someone’s education rather than a single outing.', why: 'Same direction: another argument in favour. If you had written “it does, however, leave museums dependent on public funding”, the relationship would be contrast and the whole exercise would change.' },
      { instruction: 'Choose the connector, and check what it takes after it', hint: 'You want one that opens a sentence. Say which you chose and whether it takes a clause or a noun.', minWords: 5, placeholder: 'I would use … which takes …', model: '“Furthermore”, which opens the sentence and takes a full clause after the comma.', why: 'Naming what it takes is the step that prevents “Furthermore of the cost…”. “Furthermore” cannot take an object; the phrase that can is “in addition to”.' },
      { instruction: 'Write both sentences together', hint: 'Put the connector at the front of the second sentence, with its comma. Read it back and check the direction did not drift.', minWords: 16, placeholder: 'Free museum entry raises visitor numbers … Furthermore, …', model: 'Free museum entry raises visitor numbers among low-income families. Furthermore, it encourages repeat visits, so a collection becomes part of someone’s education rather than a single outing.', why: 'The connector matches the relationship, the comma is where it belongs, and a reader told to expect more of the same receives exactly that.' },
    ],
    result: 'Free museum entry raises visitor numbers among low-income families. Furthermore, it encourages repeat visits, so a collection becomes part of someone’s education rather than a single outing.',
  },
  contrast: {
    brief: 'You have written: “Working from home suits roles that depend on long stretches of concentration.” You now want to turn.',
    goal: 'Mark the reversal — and get the punctuation right, which is where this family breaks.',
    steps: [
      { instruction: 'Write the sentence that pushes back', hint: 'It has to argue against home working, not merely say something else about it. No connector yet.', minWords: 8, placeholder: 'It weakens …', model: 'It weakens the informal contact that keeps a team coordinated.', why: 'This genuinely reverses direction. “It also removes the commute” would have been another point in favour, and a contrast connector in front of it would have misled the reader.' },
      { instruction: 'Choose the connector and decide the punctuation', hint: 'If you choose an adverb you need a full stop or semicolon. If you choose a conjunction you can use a comma. Say which you picked and why.', minWords: 6, placeholder: 'I would use … so the punctuation is …', model: '“However”, which is an adverb, so it needs a full stop before it and a comma after it.', why: 'This is the decision that produces or prevents the comma splice — the most common punctuation error in Task 2, and it comes from a word choice rather than from carelessness.' },
      { instruction: 'Write both sentences', hint: 'Apply the punctuation you just named. Read it back and check you have not joined two full sentences with a comma.', minWords: 14, placeholder: 'Working from home suits roles … However, …', model: 'Working from home suits roles that depend on long stretches of concentration. However, it weakens the informal contact that keeps a team coordinated.', why: 'Full stop, connector, comma. Written as “…concentration, however it weakens…”, the same two ideas would have been a comma splice.' },
    ],
    result: 'Working from home suits roles that depend on long stretches of concentration. However, it weakens the informal contact that keeps a team coordinated.',
  },
  'cause-and-effect': {
    brief: 'Two facts: (a) the city widened its main roads; (b) traffic volumes rose within three years.',
    goal: 'State the causal relationship — in the right direction, and at a strength you can defend.',
    steps: [
      { instruction: 'Decide which way the arrow points, in plain English', hint: 'Which one produced the other? Write it out before choosing any connector.', minWords: 8, placeholder: 'The widening produced the traffic because …', model: 'The widening came first and the traffic followed: extra capacity attracted journeys that had previously been made another way.', why: 'Naming the direction in plain English first is what stops “because” and “therefore” being chosen at random. The arrow is the claim; the connector only reports it.' },
      { instruction: 'Choose the connector that puts the cause first', hint: 'You want the cause in the first clause. Say which connector does that and what follows it.', minWords: 5, placeholder: 'I would use … because it puts …', model: '“Consequently”, which opens the second sentence and takes a clause — so the cause stays in the first.', why: '“Because” would have put the effect first and reversed the sentence. Both are correct English and only one reports what you decided in step 1.' },
      { instruction: 'Write it, at a strength the evidence supports', hint: 'You have no study. Choose between “caused”, “led to” and “is associated with”, and write the pair of sentences.', minWords: 16, placeholder: 'The city widened its main roads. Consequently, …', model: 'The city widened its main roads. Consequently, traffic volumes rose within three years, as the additional capacity drew in journeys previously made by other means.', why: 'The direction is right and the mechanism is named, which is what makes the causal claim defensible without a source. “Caused” alone would have asserted more than the reasoning shows.' },
    ],
    result: 'The city widened its main roads. Consequently, traffic volumes rose within three years, as the additional capacity drew in journeys previously made by other means.',
  },
  examples: {
    brief: 'Your claim: “Congestion charging changes driver behaviour more quickly than fuel taxes.”',
    goal: 'Support it with an example that illustrates without inventing a source.',
    steps: [
      { instruction: 'Name a concrete case', hint: 'A real, general case. No percentages, no “a recent study”, nothing you would have to cite.', minWords: 6, placeholder: 'A case in point is …', model: 'A case in point is central London, where traffic entering the charging zone fell in the first year of the scheme.', why: 'Concrete enough to illustrate and general enough to defend. A figure here would have been invented, and invented figures read as fabrication rather than as rigour.' },
      { instruction: 'Say what the example shows — and what it does not', hint: 'Write one sentence naming what a reader should take from it. Be honest about its limits.', minWords: 8, placeholder: 'This shows … although it does not establish …', model: 'This shows the mechanism working in a large city, although one case cannot establish that it works everywhere.', why: 'Naming the limit of your own example is what separates illustration from a claim to have proved something — and it costs one clause.' },
      { instruction: 'Write the claim and the example together', hint: 'Claim first, connector, example. Check the punctuation of the phrase you chose.', minWords: 16, placeholder: 'Congestion charging changes driver behaviour … For instance, …', model: 'Congestion charging changes driver behaviour more quickly than fuel taxes. A case in point is central London, where traffic entering the zone fell within the first year of the scheme.', why: 'The example is doing what an example is for: showing the claim in operation. It is not being asked to prove it, and nothing in the wording pretends otherwise.' },
    ],
    result: 'Congestion charging changes driver behaviour more quickly than fuel taxes. A case in point is central London, where traffic entering the zone fell within the first year of the scheme.',
  },
  concession: {
    brief: 'Your position: cities should restrict private cars in the centre. The obvious objection: it penalises people with no public transport alternative.',
    goal: 'Concede the objection and survive it — in that order.',
    steps: [
      { instruction: 'State the objection at its strongest', hint: 'Do not weaken it. A concession to a weak version of the objection convinces nobody.', minWords: 8, placeholder: 'Such a policy does …', model: 'Such a policy does fall hardest on households that have no realistic alternative to driving.', why: 'Conceding the strong version is what makes the reversal worth reading. A reader who can think of this objection and does not see it named assumes you did not think of it.' },
      { instruction: 'Choose the connector, and check you are not doubling it', hint: 'One marker for one relationship. Write the connector and confirm you have not paired “although” with “but”.', minWords: 5, placeholder: 'I would use … and I have not also used …', model: '“Admittedly” to open the concession, and then “nevertheless” for the reversal — with no “but” anywhere.', why: '“Although … but” is one relationship announced twice, and it is a direct carry-over from “aunque … pero”. Checking for it explicitly is the only way to catch it.' },
      { instruction: 'Concede, then reverse, in that order', hint: 'The concession comes first. Write both halves and check that the last thing you say is your position, not the objection.', minWords: 18, placeholder: 'Admittedly, …', model: 'Admittedly, such a policy falls hardest on households with no realistic alternative to driving. Nevertheless, targeted exemptions can address that difficulty without abandoning the restriction itself.', why: 'The order matters more than the words: readers take the last thing you said as your view, so a concession placed after your conclusion reads as a retraction of it.' },
    ],
    result: 'Admittedly, such a policy falls hardest on households with no realistic alternative to driving. Nevertheless, targeted exemptions can address that difficulty without abandoning the restriction itself.',
  },
  comparison: {
    brief: 'You have argued that public hospitals struggle to retain specialist staff. You want to extend the point to schools.',
    goal: 'Claim the likeness — and make sure the likeness is real before you claim it.',
    steps: [
      { instruction: 'Name what the two cases share', hint: 'Not that both are public, or both are important. Name the mechanism that is the same.', minWords: 8, placeholder: 'Both face … because …', model: 'Both lose experienced staff to better-paid private employers who can offer conditions the public sector cannot match.', why: 'The shared mechanism is what a comparison connector claims. Without naming it first, “similarly” asserts a parallel the paragraph never established.' },
      { instruction: 'Choose the connector by how strong the likeness is', hint: 'Close parallel, or shared mechanism? Those are different words. Say which you chose and why.', minWords: 6, placeholder: 'I would use … because the likeness is …', model: '“In the same way”, because the mechanism is genuinely shared rather than the two cases merely resembling each other.', why: '“Similarly” claims a close parallel; “in the same way” claims the cause is identical. You established the second in step 1, so it is the one the sentence has earned.' },
      { instruction: 'Write the comparison', hint: 'Put the connector at the front with its comma, and make sure the second clause really is parallel to the first.', minWords: 14, placeholder: 'Public hospitals struggle … In the same way, …', model: 'Public hospitals struggle to retain specialist staff. In the same way, state schools lose experienced teachers to better-paid private employers.', why: 'The likeness is stated, the mechanism behind it was established first, and a reader who knows one obvious difference has nothing to attack that the paragraph did not already account for.' },
    ],
    result: 'Public hospitals struggle to retain specialist staff. In the same way, state schools lose experienced teachers to better-paid private employers.',
  },
  conclusion: {
    brief: 'Your essay argued that congestion charging is justified in large cities, while conceding it is unsuitable for small towns.',
    goal: 'Open the final paragraph — signalling the close and promising nothing new.',
    steps: [
      { instruction: 'Choose the marker, and check the essay earned it', hint: 'Some of these promise something. “On balance” promises you weighed two sides. Say which you chose and what it commits you to.', minWords: 6, placeholder: 'I would use … which commits me to …', model: '“In conclusion”, which commits me only to closing — unlike “on balance”, which would promise that two sides had been weighed.', why: 'The marker is a promise. Choosing one whose promise the essay did not keep is a quiet mismatch a reader notices at exactly the moment you wanted them convinced.' },
      { instruction: 'Write the closing sentence', hint: 'Restate the position in words the introduction did not use. Refer back to the argument instead of running it again.', minWords: 12, placeholder: 'In conclusion, …', model: 'In conclusion, the reasons outlined above make a strong case for charging in the largest urban centres.', why: '“The reasons outlined above” points at two body paragraphs in five words. Summarising them instead would have used three sentences to tell the reader what they had just read.' },
      { instruction: 'Check what you have not written', hint: 'Read it back. Is there a new reason? A new proposal? Write what you would delete, or confirm there is nothing.', minWords: 8, placeholder: 'There is nothing new here because …', model: 'There is nothing new here: the small-town exception was argued in the body, so restating it adds no claim that lacks support.', why: 'A fresh reason after “in conclusion” arrives with no paragraph behind it, and it damages the essay backwards — the reader wonders why it was never argued.' },
    ],
    result: 'In conclusion, the reasons outlined above make a strong case for charging in the largest urban centres.',
  },
  condition: {
    brief: 'You want to argue that subsidising rail fares would shift commuters out of cars — a proposal, not something that has happened.',
    goal: 'Write the conditional at the right tense, which is where this family breaks.',
    steps: [
      { instruction: 'Decide: real possibility or hypothetical?', hint: 'Is this something likely to happen, or something you are proposing? The answer decides both tenses.', minWords: 8, placeholder: 'This is hypothetical because …', model: 'This is hypothetical: no such subsidy exists, so I am arguing about a case that has not happened.', why: 'Deciding this first is what fixes the tenses. Choosing the words first is how “If governments would subsidise…” gets written.' },
      { instruction: 'Write the two halves with the right tenses', hint: 'Hypothetical takes past in the “if” clause and “would” in the result. The “would” never goes in the “if” half.', minWords: 10, placeholder: 'If governments subsidised …', model: 'If governments subsidised rail fares, a significant proportion of commuters would abandon their cars.', why: 'Past plus “would” is the hypothetical pattern. “If governments would subsidise” is the most recognisable first-language error in this family, and it appears in exactly the sentences carrying your strongest proposal.' },
      { instruction: 'Add the comma rule, and write it both ways', hint: 'A fronted “if” clause takes a comma; a trailing one does not. Write the sentence in both orders.', minWords: 18, placeholder: 'If governments subsidised …, … / … if governments subsidised …', model: 'If governments subsidised rail fares, a significant proportion of commuters would abandon their cars. A significant proportion of commuters would abandon their cars if governments subsidised rail fares.', why: 'Both are correct; only the fronted version takes the comma. Writing it both ways is the fastest way to make the rule stick, because the difference is visible side by side.' },
    ],
    result: 'If governments subsidised rail fares, a significant proportion of commuters would abandon their cars.',
  },
  correlative: {
    brief: 'Two effects of a new cycle network: journey times fell, and collisions at major junctions dropped.',
    goal: 'Join them with a correlative pair — both halves, parallel shapes, and the inversion.',
    steps: [
      { instruction: 'Write both halves in the SAME grammatical shape', hint: 'If one is a verb phrase, the other must be too. Write them side by side before adding any connector.', minWords: 8, placeholder: 'reduced journey times / cut collisions', model: 'reduced journey times for commuters · cut the number of collisions at major junctions', why: 'Two verb phrases, matching. Doing this before the connector goes in is what prevents “not only to reduce … but also cutting”, where the shapes do not match.' },
      { instruction: 'Add the pair, and handle the inversion', hint: 'If “not only” opens the sentence, the verb jumps in front of the subject. Write the first half with the inversion.', minWords: 7, placeholder: 'Not only did the network …', model: 'Not only did the network reduce journey times', why: '“Did the network reduce”, not “the network reduced”. Sentence-initial “not only” inverts, and it is worth memorising as a whole phrase rather than as a rule.' },
      { instruction: 'Complete both halves', hint: 'The second half needs “but … also”. Read it back and confirm the two halves still match in shape.', minWords: 16, placeholder: 'Not only did the network reduce …, but it also …', model: 'Not only did the network reduce journey times for commuters, but it also cut the number of collisions at major junctions.', why: 'Both halves present, both verb phrases, and the inversion in place. This construction is the clearest demonstration of grammatical range available in a Task 2 response — which is why getting it wrong is expensive.' },
    ],
    result: 'Not only did the network reduce journey times for commuters, but it also cut the number of collisions at major junctions.',
  },
};
