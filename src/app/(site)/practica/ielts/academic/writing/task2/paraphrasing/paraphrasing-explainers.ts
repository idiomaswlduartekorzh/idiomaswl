/**
 * La explicación larga y el ejercicio guiado de cada técnica de paráfrasis.
 *
 * Son los bloques 1 y 3 del blueprint (`writing/_shared/skill-blueprint.ts`). Viven en su
 * propio fichero porque son la parte más extensa de la unidad y mezclarlos con
 * `paraphrasing-data.ts` habría dejado un módulo de mil líneas donde nadie encuentra nada.
 *
 * QUÉ TIENE QUE TRAER UNA EXPLICACIÓN PARA MERECER ESE NOMBRE
 *
 * La versión anterior de estas páginas abría con dos párrafos. Dos párrafos son una
 * definición: dicen qué es la técnica y no enseñan a usarla. Lo que hay aquí responde a las
 * cuatro preguntas que un estudiante se hace de verdad, y que casi ningún material de IELTS
 * escribe:
 *
 *   · Qué es exactamente esto, más allá del nombre.
 *   · Por qué existe: qué problema del examen resuelve.
 *   · Qué me cuesta si no lo hago —y cuesta en un criterio concreto, no «en general».
 *   · Dónde deja de aplicar, o dónde me paso de rosca.
 *
 * Las dos últimas son las que faltan en todas partes, y son las que evitan que alguien aplique
 * una técnica correcta en el sitio equivocado.
 */

import type { Explainer, GuidedExercise } from '../../_shared/skill-blueprint';

export const EXPLAINERS: Record<string, Explainer> = {
  synonyms: {
    definition: 'Swapping the words that carry the meaning for others that carry the same meaning — and knowing which words in a prompt are not allowed to move at all.',
    sections: [
      {
        heading: 'What a synonym actually is',
        body: [
          'A synonym is not a word that means roughly the same thing. It is a word you can put in this sentence, in this position, without changing what the sentence claims. That last part is what makes synonym work harder than it looks: “important” and “vital” sit in the same dictionary entry and make different claims. If the prompt says a policy is important and you write that it is vital, you have committed the rest of your essay to defending something the prompt never said.',
          'This is why word lists fail. A list gives you words that are related; it cannot tell you whether the one you picked fits the slot you are putting it in. Two things decide that. Strength is how much the word claims — “dislike”, “oppose” and “condemn” run from mild to severe and are not interchangeable. Company is what the word is allowed to stand next to: you make a decision and you reach a conclusion, and crossing the two produces English that is grammatical and that nobody writes.',
          'The practical consequence runs against instinct. You should swap fewer words, more carefully, than you want to. A response that replaces four content words accurately reads better than one that replaces nine and gets two of them wrong — because the two wrong ones are the ones the examiner notices, and they are noticed as errors rather than as ambition.',
        ],
        points: [
          { term: 'Strength', detail: 'How much the word claims. “Significant” reports size; “vital” reports necessity. Swapping one for the other rewrites the claim.' },
          { term: 'Company (collocation)', detail: 'What the word may stand next to. “Make a decision” and “reach a conclusion” are fixed pairs; crossing them is the error no spell-checker sees.' },
          { term: 'Register', detail: 'How formal it is. “Kids”, “a lot of” and “stuff” all have neutral equivalents that cost nothing to use and are noticed immediately.' },
          { term: 'Frozen words', detail: 'Technical terms, figures and proper nouns. “Photosynthesis” has no synonym; “54%” is not a word. Repeating them is correct.' },
        ],
      },
      {
        heading: 'Where the marks actually are',
        body: [
          'Lexical Resource does not count unusual words. It assesses range, precision and control — whether you have enough words to say what you mean, whether the ones you chose mean it, and whether you can handle the grammar they bring with them. A rare word used wrongly lowers all three at once, which is why reaching for the most impressive available synonym is the most reliable way to lose marks on the criterion it was meant to raise.',
          'There is a second, quieter cost. Words copied straight from the prompt are not counted as your language, so an introduction that reuses the prompt’s nouns has produced fewer words for the examiner to assess than it appears to. The sentence looks full and is, for scoring purposes, half empty — and it is the first sentence the examiner reads.',
        ],
      },
    ],
    cost: 'Two things at once. Words copied from the prompt are not counted as yours, so the opening sentence does no work at all; and a synonym that shifts the strength of a claim commits the rest of your essay to defending something the prompt never asked about. The second is the expensive one, because it damages Task Response as well as Lexical Resource, and it is completely invisible while you are writing.',
    limits: 'Some words must not move. Technical terms have no synonym inside their own field — “inflation”, “photosynthesis”, “the internet” — and replacing them changes the topic rather than the wording. Figures and proper nouns are not vocabulary: “54%” stays “54%” and “Japan” stays “Japan”. And when the prompt’s key noun genuinely has no natural equivalent, repeating it once is correct; the fix is to move something else in the sentence, which is exactly what the other four techniques are for.',
  },

  'word-order': {
    definition: 'Moving information to a different position so the same facts arrive in a different order — the technique for sentences whose words cannot be replaced.',
    sections: [
      {
        heading: 'What English lets you move, and what it does not',
        body: [
          'English is a fixed-order language in one specific way: the subject comes before its verb, and the verb before its object. Almost everything else can move. Time phrases, place phrases, whole conditional clauses and reported sources all slide to the front of a sentence, and the only thing they need on arrival is a comma. That single comma is most of what this technique asks you to remember.',
          'What cannot move is the relationship between a modifier and the thing it modifies. “Only students pay the fee” and “Students only pay the fee” are two different claims, and nothing in the words themselves tells you which is which — position is carrying the meaning on its own. Spanish can afford to be looser here because it marks these relationships in other ways; English cannot, and a word that drifts takes its meaning with it.',
          'The second thing that cannot move is the verb, upward past its subject. “In the last decade climbed the proportion of stressed children…” is a sentence a Spanish speaker writes without noticing anything wrong, because Spanish allows verb before subject freely. English allows it in a handful of fixed inversions and nowhere else, and this is one of the errors that most clearly marks a response as translated.',
        ],
        points: [
          { term: 'Free to move', detail: 'Time phrases, place phrases, “if” clauses, “according to X”. Front them and add the comma.' },
          { term: 'Moves together or not at all', detail: 'A comparison has two sides. Flip “more” to “less” and both sides must swap with it, or the sentence claims the opposite.' },
          { term: 'Never moves', detail: 'A modifier away from its noun. “Only” is the classic case: its position is its meaning.' },
          { term: 'Never inverts', detail: 'Subject before verb. Fronting a phrase does not license “climbed the proportion”.' },
        ],
      },
      {
        heading: 'Why this is the technique that rescues you',
        body: [
          'Every prompt eventually hands you a sentence whose key words have no synonyms: a technical topic, a figure, a place name. A paraphrase built only on synonyms stalls there — and what usually happens next is that the writer replaces a technical term with something inaccurate rather than admit the sentence is stuck. Reordering has no such ceiling.',
          'Moving one element forces the rest of the sentence to reorganise around it, which is why a single move can carry an entire paraphrase without touching one content word. It is also the technique that most often saves a rewrite which has started to look like the original with two adjectives changed.',
        ],
      },
    ],
    cost: 'Skipping it means running out of paraphrase on any prompt with technical vocabulary, and falling back on replacing terms that should not be replaced. Doing it wrong costs elsewhere: a fronted phrase without its comma reads as careless, and an inverted verb reads as a first-language error — and both of those land in Grammatical Range and Accuracy rather than in Lexical Resource, so the damage shows up on a criterion you were not even working on.',
    limits: 'Reordering must not become rewriting. If the new version claims a cause the original did not, or drops an element to make the sentence flow better, it has stopped being a paraphrase of that prompt. The test is mechanical and worth running: every fact in the original should be findable in the new version, and no fact should have appeared that was not there before.',
  },

  'word-form': {
    definition: 'Keeping the word and changing what it is — verb to noun, adjective to adverb — so the sentence has to rebuild itself around the new shape.',
    sections: [
      {
        heading: 'Why changing the form changes the sentence',
        body: [
          'A word’s form decides what job it is allowed to hold. Turn a verb into a noun and it can suddenly be the subject of a sentence; turn an adjective into an adverb and it now needs a verb to attach to. This is why the technique never changes only one word: the moment “decide” becomes “the decision”, the rest of the clause has to reorganise around a noun that was not there before. That forced reorganisation is the paraphrase.',
          'It is also the technique that compresses. “Technology has advanced rapidly, which has made many manual jobs unnecessary” becomes “Rapid technological advances have rendered many manual jobs unnecessary”: two clauses become one, the sentence loses three words, and the register rises on the way. Compression is worth having for its own sake — the same content in fewer words reads as control, not as brevity.',
          'And it is the one that rescues you when a word has no usable synonym at all. You do not need another word for “violent”. You need “violence”, or “violently”, and a sentence built around whichever one you chose.',
        ],
        points: [
          { term: 'Verb → noun', detail: '“decide” → “the decision”, “grow” → “growth”. The commonest move in academic English, and it usually lifts the register with it.' },
          { term: 'Adjective → adverb', detail: '“a significant increase” → “increased significantly”. Usually shortens the sentence, which helps when the prompt is long.' },
          { term: 'The preposition travels', detail: '“depend on” → “dependence on”, never “of”. “Invest in” → “investment in”. This is where these rewrites break.' },
          { term: 'Not every word has every form', detail: '“Announce” has no noun of its own — the noun is “announcement”. Forms are looked up, never derived by removing a suffix.' },
        ],
      },
    ],
    cost: 'Skipping it caps how far a paraphrase can go: you end up with the prompt’s sentence structure and a few replaced adjectives, which is what a copied opening looks like even when no word was actually copied. Doing it wrong is worse in a specific way — a form error such as “dependable factors” or “the performing” is a vocabulary error and a grammar error at the same time, so a single slip costs on two criteria.',
    limits: 'Not every word survives a change of form. “Different” has no usable adverb in most sentences — “differentially” means something else entirely — and forcing one produces a phrase no reader can parse. When the form does not exist, or exists and does not fit, leave the phrase alone and move something else instead. The technique is a tool, not a quota to fill.',
  },

  voice: {
    definition: 'Swapping which side of the action starts the sentence, so a paragraph can stay about the thing it is actually about.',
    sections: [
      {
        heading: 'The passive is not more formal. It is a choice of subject.',
        body: [
          'The most repeated piece of advice about the passive — that it sounds academic — is wrong, and following it produces the worst paragraphs in Task 2. The passive does exactly one thing: it lets you choose what the sentence starts with. “Technological advances have replaced workers” and “Workers have been replaced by technological advances” carry identical information. They differ only in what the sentence is about.',
          'That matters because a paragraph should stay about one thing. If your body paragraph is about workers, then every sentence in it that can start with workers should. Readers follow a paragraph by its subjects, and a paragraph whose subject changes every sentence reads as a list of facts rather than as an argument — which is a Coherence problem, not a grammar one, and it is invisible if you are only checking your verbs.',
          'The reverse move is just as useful and far rarer. Responses drift into the passive under time pressure and lose their argument inside it: three passive sentences in a row and nobody in the essay is doing anything to anybody. Turning one of them back into the active gives the paragraph a subject again, and usually gives the writer their position back with it.',
        ],
        points: [
          { term: 'How it is formed', detail: 'Object to the front, the right form of “be” plus the past participle, old subject after “by”. The tense does not change.' },
          { term: 'Dropping the agent', detail: '“The plan was approved” is legitimate when nobody needs to know who approved it. In an argument about responsibility, they do.' },
          { term: 'No object, no passive', detail: '“Crime rose”, “the population grew”. There is nothing on the receiving end, so there is nothing to turn around.' },
          { term: 'The preposition survives', detail: '“take care of” becomes “be taken care of by”. Two prepositions in a row look wrong and are correct.' },
        ],
      },
    ],
    cost: 'Not knowing it costs you a paraphrase technique and a cohesion tool at the same time. Overusing it costs more: an essay written mostly in the passive with the agents dropped reads as a writer avoiding commitment, and the examiner cannot find a position to assess. And an agent dropped in the wrong sentence quietly removes the responsibility the paragraph was arguing about — “dozens of youth centres have been closed” lets the councils that closed them disappear from a paragraph about council decisions.',
    limits: 'Only sentences with an object can be turned around, which rules out a large share of the sentences in a typical response. Some verbs resist the passive even when they have one: “allow someone to do something” has no direct passive and has to be rewritten with a modal instead. And the passive is never the goal in itself — if turning a sentence around does not make the paragraph start with the thing it is about, leave it active.',
  },

  'sentence-structure': {
    definition: 'Changing how many sentences the information arrives in, and stating the relationship between the parts — without changing the relationship itself.',
    sections: [
      {
        heading: 'Joining and splitting are both paraphrase',
        body: [
          'Two sentences can become one, and one can become two. Neither move changes a single word, and both change the shape of the information enough to count as a genuine rewrite. This is the technique that makes a paraphrase stop looking like the original once the words themselves have been moved as far as they will go.',
          'Joining is the more useful direction, because it forces you to state a relationship. Two sentences side by side leave the reader to guess how they connect; “Although X, Y” says it out loud. That is not only paraphrase, it is better writing — and it is assessed under Coherence and Cohesion, where making a relationship explicit is precisely what is being looked for.',
          'Splitting is the emergency move. A long prompt sentence with three clauses can be broken at its natural joint, which is often the fastest route to something that reads nothing like the original. Shorter sentences are not simpler writing: knowing where the joint is, is the skill.',
        ],
        points: [
          { term: 'Subordinate it', detail: '“X. Y.” → “Although X, Y.” The second sentence loses its full stop and gains a stated relationship.' },
          { term: 'Relative clause', detail: '“The scheme cost £2bn. It was abandoned.” → “The scheme, which cost £2bn, was abandoned.” The commas decide whether the clause identifies or merely adds.' },
          { term: 'Participle phrase', detail: '“Because it lacked funding, the project stalled” → “Lacking funding, the project stalled.” The participle must belong to the subject that follows it.' },
          { term: 'The comma splice', detail: 'A comma cannot join two complete sentences, and “however” cannot rescue it. It is the most common punctuation error in Task 2.' },
        ],
      },
      {
        heading: 'The rule that governs the whole technique',
        body: [
          'Structure may change. Logic may not. Joining two sentences with “because” when the original merely put them side by side adds a cause nobody claimed; “although” claims a tension that may not exist. This is the one way a structural paraphrase can be wrong while every single word in it is right, and it stays invisible unless you check for it deliberately — which is why the recognition exercise on this page asks you to name the relationship before you touch a connector.',
        ],
      },
    ],
    cost: 'Without it, a paraphrase runs out of room: you can move and replace words all you like and the sentence still has the prompt’s shape. With it done carelessly, you invent relationships — a cause, a contrast, a concession — that the prompt never claimed, and the rest of your essay then argues for something nobody asked about.',
    limits: 'A sentence can only be split where it has a joint. Forcing a break in the middle of a clause produces two fragments, and a fragment is a grammar error rather than a stylistic choice. Joining has a ceiling too: three ideas subordinated into a single sentence is usually one too many, and the reader loses exactly the thread the technique was supposed to make visible.',
  },
};

export const GUIDED: Record<string, GuidedExercise> = {
  synonyms: {
    brief: 'Prompt: “Some people believe that governments should spend more money on public parks rather than on sports facilities.”',
    goal: 'Paraphrase this one sentence, one decision at a time. Each step asks you to write something before it shows you a model — and the model is one version that works, not a correction of yours.',
    steps: [
      {
        instruction: 'Mark what cannot move',
        hint: 'Decide which words are frozen: a technical term, a figure, a proper noun, or a word whose replacement would narrow the topic. Write the ones you would leave alone, and why.',
        minWords: 8,
        placeholder: 'I would leave … alone because …',
        model: 'Nothing here is technical, so almost everything can move. “Governments” could become “the state” or “national authorities”. “Public parks” and “sports facilities” are the topic: they can be rephrased but not narrowed — “playgrounds” is not “parks”.',
        why: 'Starting with what cannot move is faster than starting with what can, and it heads off the commonest failure in this technique: quietly narrowing the topic while hunting for variety.',
      },
      {
        instruction: 'Swap the verb, and watch its preposition',
        hint: '“Spend more money on” is the engine of the sentence. Find a single verb or a tighter phrase for it — and check which preposition the one you chose actually takes.',
        minWords: 5,
        placeholder: 'spend more money on → …',
        model: '“allocate greater funding to”. The verb “allocate” takes “to”, not “on”, and “greater funding” replaces the quantity and the noun in one move.',
        why: 'Verbs carry more meaning than nouns and get swapped less often, which is exactly why moving one is worth more. Note that the preposition changed with the verb — that is where these rewrites usually break.',
      },
      {
        instruction: 'Write the whole sentence',
        hint: 'Put the pieces together. Keep “some people believe” as a reported view rather than your own opinion, and check the strength: the prompt says “should”, not “must”.',
        minWords: 12,
        placeholder: 'A number of people argue that…',
        model: 'A number of people argue that the state ought to allocate greater funding to public green spaces rather than to sports facilities.',
        why: 'Six content words moved and not one claim changed. “Ought to” preserves the strength of “should”, “argue” keeps it a reported view, and “rather than to” keeps the comparison intact with the preposition repeated as English requires.',
      },
    ],
    result: 'A number of people argue that the state ought to allocate greater funding to public green spaces rather than to sports facilities. Six words moved, the claim untouched, and nothing an examiner could mistake for the prompt.',
  },

  'word-order': {
    brief: 'Prompt: “The proportion of adults taking regular exercise rose from 34% to 51% between 2005 and 2020.”',
    goal: 'This sentence resists synonyms: the figures and the years cannot move at all, and “exercise” is the topic. You are going to paraphrase it by moving things instead of replacing them.',
    steps: [
      {
        instruction: 'Front the time phrase, with its comma',
        hint: 'The period sits at the end. Move it to the start and write the first few words of the new sentence. The years themselves do not change.',
        minWords: 6,
        placeholder: 'Between 2005 and 2020, the …',
        model: 'Between 2005 and 2020, the share of adults …',
        why: 'The comma after a fronted phrase is required, not decorative. And the subject still comes next: fronting a phrase never licenses the verb to jump ahead of it.',
      },
      {
        instruction: 'Replace the one word that can be replaced',
        hint: '“Proportion” has a natural equivalent. The figures and “exercise” do not. Write the noun phrase you would use.',
        minWords: 4,
        placeholder: 'the proportion of adults → …',
        model: 'the share of adults who exercised regularly',
        why: '“Proportion” → “share” is the one safe swap available. “34%” stays exactly as it is, and turning “taking regular exercise” into a relative clause is a change of form, not of meaning.',
      },
      {
        instruction: 'Write the whole sentence',
        hint: 'Combine both moves and keep the two figures exactly as the prompt wrote them. Check that the direction survives: it rose.',
        minWords: 14,
        placeholder: 'Between 2005 and 2020, …',
        model: 'Between 2005 and 2020, the share of adults who exercised regularly climbed from 34% to 51%.',
        why: 'One phrase moved, one noun swapped, one verb form changed — and both figures sit exactly where the prompt put them. That is a full paraphrase of a sentence with almost no synonyms available.',
      },
    ],
    result: 'Between 2005 and 2020, the share of adults who exercised regularly climbed from 34% to 51%. Nothing invented, no figure touched, and it could not be mistaken for the original.',
  },

  'word-form': {
    brief: 'Sentence: “The council applied the policy inconsistently, which reduced public trust.”',
    goal: 'Compress two clauses into one by changing the form of two words. Nothing will be replaced with a synonym.',
    steps: [
      {
        instruction: 'Turn the verb into a noun',
        hint: '“Applied” is doing the work in the first clause. Write its noun form — and the preposition that has to come with it.',
        minWords: 3,
        placeholder: 'applied → …',
        model: 'the application of',
        why: 'The preposition arrived with the noun: it is “the application of the policy”, never “the application the policy”. Every form change can move a preposition, and that is the commonest casualty of this technique.',
      },
      {
        instruction: 'Change the adverb to match',
        hint: '“Inconsistently” was modifying a verb. Now that the verb has become a noun, the word has to change category too.',
        minWords: 1,
        placeholder: 'inconsistently → …',
        model: 'inconsistent',
        why: 'An adverb modifies a verb; an adjective modifies a noun. Once the verb becomes a noun, its adverb has nothing left to attach to.',
      },
      {
        instruction: 'Write the whole sentence',
        hint: 'The new noun phrase is now the subject, so the relative clause is no longer needed — its verb can become the main verb.',
        minWords: 7,
        placeholder: 'Inconsistent application …',
        model: 'Inconsistent application of the policy reduced public trust.',
        why: 'Two form changes collapsed two clauses into one, four words shorter, with no synonym anywhere. Note that the council disappeared: keep it if the paragraph is about who is responsible — “The council’s inconsistent application of the policy…”.',
      },
    ],
    result: 'Inconsistent application of the policy reduced public trust. Two words changed category, the sentence lost a clause, and not one word was replaced with a synonym.',
  },

  voice: {
    brief: 'Sentence: “Local councils have closed dozens of youth centres since 2010.” Your paragraph is about the centres, not about the councils.',
    goal: 'Turn this around so the paragraph can stay on its subject — without letting the councils quietly disappear.',
    steps: [
      {
        instruction: 'Choose the new subject',
        hint: 'The paragraph is about the centres. Write the noun phrase that will now start the sentence.',
        minWords: 3,
        placeholder: 'Dozens of …',
        model: 'Dozens of youth centres',
        why: 'This is the entire decision; everything after it is mechanics. If the paragraph were about council policy instead, you would stop here and leave the sentence active.',
      },
      {
        instruction: 'Build the verb',
        hint: 'The original is present perfect: “have closed”. Write the passive form. The tense does not change when the voice does.',
        minWords: 2,
        placeholder: 'have closed → …',
        model: 'have been closed',
        why: '“Have” plus “been” plus the past participle. The commonest slip here is dropping to the past simple — “were closed” — which cuts the link to the present that “since 2010” depends on.',
      },
      {
        instruction: 'Decide about the agent, then write it all',
        hint: 'You can end with “by local councils” or leave it out. Ask what the paragraph is arguing before you choose, then write the full sentence.',
        minWords: 9,
        placeholder: 'Dozens of youth centres have been closed …',
        model: 'Dozens of youth centres have been closed by local councils since 2010.',
        why: 'The “by” phrase stays because the paragraph is about a decision somebody made. Drop it and the sentence reads as though the centres shut by themselves, which removes exactly the responsibility the argument depends on.',
      },
    ],
    result: 'Dozens of youth centres have been closed by local councils since 2010. The paragraph now starts where it is pointing, the tense survived, and nobody vanished.',
  },

  'sentence-structure': {
    brief: 'Two sentences: “Public transport in the city is heavily subsidised. Fares have still risen every year since 2015.”',
    goal: 'Join these into one sentence that states the relationship the word “still” is only hinting at.',
    steps: [
      {
        instruction: 'Name the relationship first',
        hint: 'Before choosing any connector, say in plain English how the second sentence relates to the first. The word “still” is your clue.',
        minWords: 6,
        placeholder: 'The second sentence is surprising because…',
        model: 'The second fact is surprising given the first: you would expect a subsidy to hold fares down, and it did not. The relationship is contrast, or more precisely concession.',
        why: 'Naming the relationship before the word is the whole discipline of this technique. Choosing the connector first is how “because” ends up joining two sentences that have no causal link at all.',
      },
      {
        instruction: 'Choose the connector and decide the shape',
        hint: 'You want a subordinator that marks concession and can open a sentence. Write it, and say which half it will attach to.',
        minWords: 4,
        placeholder: 'I would use … in front of …',
        model: '“Although”, in front of the first sentence — so the subsidy becomes the concession and the fare rise becomes the main clause.',
        why: 'Which half becomes the main clause is a decision, not an accident: the main clause is what the reader remembers. Here the fare rise is the point, so it keeps the main slot.',
      },
      {
        instruction: 'Write the joined sentence',
        hint: 'A fronted subordinate clause takes a comma. And check what happens to “still” once the relationship is stated explicitly.',
        minWords: 12,
        placeholder: 'Although public transport …',
        model: 'Although public transport in the city is heavily subsidised, fares have risen every year since 2015.',
        why: '“Still” disappeared because “although” now carries the surprise it was only hinting at. That is the sign of a structural paraphrase done properly: a word becomes unnecessary rather than being replaced.',
      },
    ],
    result: 'Although public transport in the city is heavily subsidised, fares have risen every year since 2015. Two sentences became one, the relationship went from implied to stated, and no fact moved.',
  },
};
