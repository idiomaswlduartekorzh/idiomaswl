import type { IeltsGuidedSpeakingReference } from './guided-mock.ts';

type Band = '5.5' | '9.0';

type SampleFeedback = {
  verdict: string;
  fluency: string;
  lexical: string;
  grammar: string;
  pronunciation: string;
};

type FeedbackBuilder = (transcript: string) => SampleFeedback;

const PEDAGOGICAL_NOTICE = 'Estas muestras son referencias pedagógicas aproximadas, no calificaciones oficiales ni predicciones de banda. La pronunciación sólo puede evaluarse sobre una grabación real.';

function cueCardTitle(fullCueCard: string) {
  return fullCueCard.split('\n', 1)[0].trim();
}

function cueCardBullets(fullCueCard: string) {
  return fullCueCard
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('•') || line.startsWith('-') || /^and explain\b/i.test(line))
    .map(line => line
      .replace(/^(?:•|-)\s*/, '')
      .replace(/^and explain\s*/i, '')
      .replace(/[.]$/, ''));
}

function sample(band: Band, transcript: string, feedback: SampleFeedback) {
  return {
    label: `Referencia pedagógica aproximada · Banda ${band === '9.0' ? '9' : band}`,
    audio: {
      ready: false,
      url: null,
      durationSeconds: null,
    },
    transcript,
    verdict: feedback.verdict,
    criteria: [
      ['Fluency & Coherence', feedback.fluency],
      ['Lexical Resource', feedback.lexical],
      ['Grammatical Range & Accuracy', feedback.grammar],
      ['Pronunciation', feedback.pronunciation],
    ] as const,
  };
}

function reference(
  fullCueCard: string,
  band55Transcript: string,
  band9Transcript: string,
  band55Feedback: FeedbackBuilder,
  band9Feedback: FeedbackBuilder,
): IeltsGuidedSpeakingReference {
  return {
    cueCard: cueCardTitle(fullCueCard),
    fullCueCard,
    bullets: cueCardBullets(fullCueCard),
    pedagogicalNotice: PEDAGOGICAL_NOTICE,
    samples: {
      '5.5': sample('5.5', band55Transcript, band55Feedback(band55Transcript)),
      '9.0': sample('9.0', band9Transcript, band9Feedback(band9Transcript)),
    },
  };
}

function sentences(transcript: string) {
  return transcript.match(/[^.!?]+[.!?]+/g)?.map(sentence => sentence.trim()) ?? [transcript.trim()];
}

function excerpt(value: string, maximum = 88) {
  const compact = value.replace(/\s+/g, ' ').trim();
  return compact.length <= maximum ? compact : `${compact.slice(0, maximum).replace(/\s+\S*$/, '')}…`;
}

function observedFeedback(band: Band, topic: string, detail: string, transcript: string): SampleFeedback {
  const transcriptSentences = sentences(transcript);
  const opening = excerpt(transcriptSentences[0]);
  const lexicalEvidence = excerpt(transcriptSentences[Math.min(1, transcriptSentences.length - 1)]);
  const middle = excerpt(transcriptSentences[Math.floor(transcriptSentences.length / 2)]);
  const closing = excerpt(transcriptSentences.at(-1) ?? transcript);
  const wordTotal = transcript.trim().split(/\s+/).filter(Boolean).length;
  const profile = band === '5.5'
    ? `La muestra escrita tiene ${wordTotal} palabras y desarrolla una línea clara, pero funciona como modelo intermedio: conviene ampliar precisión y reflexión sin inferir una banda sólo del guion.`
    : `La muestra escrita tiene ${wordTotal} palabras y sostiene una respuesta desarrollada; sirve para estudiar selección y enlace de ideas, no para predecir una banda sin actuación oral.`;

  return {
    verdict: `${profile} La cobertura de ${topic} se comprueba desde «${opening}» hasta «${closing}».`,
    fluency: `El guion abre con «${opening}», avanza mediante «${middle}» y cierra con «${closing}». Esa secuencia permite revisar coherencia textual; pausas, reinicios y velocidad no son observables sin audio.`,
    lexical: `La precisión léxica debe juzgarse sobre lenguaje realmente presente: «${lexicalEvidence}» aporta vocabulario para ${topic} y se relaciona con ${detail}. La nota no atribuye espontaneidad oral que la transcripción no pueda demostrar.`,
    grammar: `La evidencia escrita incluye ${transcriptSentences.length} enunciados. «${middle}» es una muestra localizable para revisar cómo se conectan las ideas; exactitud bajo presión y rango productivo requieren una respuesta oral nueva.`,
    pronunciation: `No hay evidencia acústica en una transcripción. «${opening}» puede usarse como tramo de práctica, pero acento, ritmo, inteligibilidad, agrupación y énfasis quedan PENDING hasta escuchar una grabación real.`,
  };
}

const intermediateFeedback = (topic: string, detail: string): FeedbackBuilder =>
  transcript => observedFeedback('5.5', topic, detail, transcript);

const advancedFeedback = (topic: string, detail: string): FeedbackBuilder =>
  transcript => observedFeedback('9.0', topic, detail, transcript);

export const IELTS_GUIDED_SPEAKING_REFERENCES_21_40 = {
  21: reference(
    `Describe an outdoor place you know about where volunteers or other local people have cared for it or tried to improve it.
You should say:
• where the place is and how you know about it
• what the people did or tried to do
• what effect their effort had, if any
and explain what you think about the way the place was looked after.`,
    `Well, the place I want to describe is a small riverside path near my aunt's neighbourhood. I know it because we walk there on Sunday mornings. A few years ago it had a lot of plastic bags, broken benches and weeds, so local residents started meeting once a month. They collected rubbish, painted the benches and planted native flowers. At first, not many people came, and some plants died during a dry week, but the path slowly became cleaner and safer. Now families use it more often and there are signs asking visitors to take litter home. I think the volunteers did a good job because they improved the place without changing its natural character, although the local council should help more with bins and watering.`,
    `A place that immediately comes to mind is a neglected strip of riverbank beside the San Rafael footbridge, about fifteen minutes from my aunt's home. I first noticed it on our Sunday walks, when the path was narrow, two benches were damaged and litter collected after every period of heavy rain. Rather than waiting for a major municipal project, a neighbourhood group began organising monthly work mornings. They removed waste, repaired the benches with donated timber, cleared invasive plants and replaced them with native grasses whose roots help stabilise the bank. They also persuaded a nearby café to provide drinking water for volunteers and asked the council to install two covered bins.

The immediate improvement was visual, but the more important effect was social. Families returned to the path, older residents felt comfortable resting there, and people who had barely spoken before began sharing tools and responsibilities. Not everything succeeded: several young plants died during a dry spell, and occasional flooding still deposits rubbish. Even so, the group records what survives and adapts its planting rather than pretending the problem is solved. I admire that approach because it combines local initiative with realistic expectations. Volunteers should not replace public services, but their detailed knowledge and steady presence made the council's later support far more effective.`,
    intermediateFeedback('a community effort to restore a riverside path', 'the monthly clean-up'),
    advancedFeedback('the restoration of a neglected riverbank', 'the shift from physical repair to stronger neighbourhood relationships'),
  ),
  22: reference(
    `Describe a public building that makes different people feel welcome.
You should say:
• what the building is and where it is
• what design features or services are useful
• who uses the building
• and explain why it feels welcoming`,
    `I'd like to talk about the central public library in my city. It is beside the main bus station, so people can reach it easily. The entrance has a ramp and automatic doors, and the signs use large letters and simple symbols. Inside, there is a children's room, quiet study tables, computers and a desk where staff help people complete online forms. Students, parents, older people and newcomers all use it. I once saw a librarian patiently show an elderly man how to book a medical appointment, while a group of teenagers were studying nearby. It feels welcoming because nobody has to buy anything to stay there. The building is bright and the staff do not make people feel embarrassed when they ask basic questions.`,
    `The public building I would choose is the Metropolitan Library beside the central transport interchange. Its location already removes one barrier, because several bus routes stop outside, but the design goes further. The entrance is level, the doors open automatically and a tactile route leads from reception to the lifts. Information appears in large print, pictograms and two commonly used community languages. Instead of one imposing hall, the interior is divided into a lively children's area, silent study rooms, a digital-support desk and flexible tables where community groups can meet.

Its users are unusually diverse: school pupils doing homework, jobseekers preparing applications, parents attending story sessions, older residents reading newspapers and recent arrivals asking about local services. What makes the building genuinely welcoming is not just accessibility equipment but the behaviour it supports. Staff circulate rather than waiting behind a high counter, and they treat requests for basic digital help as normal. I once watched a librarian help an elderly visitor arrange a hospital appointment while teenagers collaborated nearby without being treated as a nuisance. Because entry, seating and assistance are free, people can participate without first proving that they belong or can afford to stay.`,
    intermediateFeedback('an inclusive city library', 'the accessible entrance and help desk'),
    advancedFeedback('a library designed for social and practical inclusion', 'the connection between physical access and respectful staff behaviour'),
  ),
  23: reference(
    `Describe a time when information or an experience led you to change an opinion.
You should say:
• what opinion you held before
• what information or experience made you reconsider it
• when you realised your opinion had changed
and explain how this change influenced something you thought or did later.`,
    `I used to think working from home always made people less productive because there are many distractions. I had this opinion from seeing friends answer messages while studying. Last year, my team had to work remotely for two weeks while our office was repaired. Our manager used short morning meetings and a shared task board, and I noticed that we finished reports faster because nobody was commuting or being interrupted by visitors. I realised my opinion had changed near the end of the first week, when I completed a difficult spreadsheet before lunchtime. Since then, I still believe remote work needs rules, but I no longer think it is automatically lazy. I now plan quiet periods at home and judge colleagues by their results, not by whether I can see them at a desk.`,
    `For years I assumed that remote work inevitably reduced productivity. My evidence was superficial: whenever I visited friends who studied at home, I noticed phones, household noise and frequent breaks, so I generalised from those moments to professional work. That view changed when repairs made our office unusable for a fortnight. Our manager introduced a concise morning check-in, a shared task board and two protected periods without meetings. To my surprise, the team completed a demanding client report a day early, and I finished an analysis before lunch that would normally have been interrupted repeatedly in the office.

The turning point was not simply that I personally had a productive day. During our final review, the task board showed that response times and error rates had both improved. I realised the relevant question was not where people sat, but whether expectations, communication and concentrated time were designed well. Since then, I have supported a hybrid schedule for work that requires sustained attention, while still preferring the office for mentoring and complex discussion. I also stopped treating visible presence as proof of effort. The experience replaced a simple opinion with a conditional one: remote work can fail badly, but under clear arrangements it can be more disciplined than an interruption-heavy office.`,
    intermediateFeedback('changing an opinion about remote work', 'a two-week office closure'),
    advancedFeedback('a shift from judging location to judging work design', 'the shared task board and measured results'),
  ),
  24: reference(
    `Describe a traditional craft that an older person taught you or showed you.
You should say:
• what the craft was and who the person was
• how the person demonstrated the craft
• what you tried to do or learned
and explain why you think this knowledge was worth preserving.`,
    `The craft was weaving a small basket from palm leaves, and my grandmother showed me during a family visit. She did not give a long explanation. First, she chose leaves that were flexible, then split them into equal strips and crossed them to make the base. She worked slowly so I could copy each movement. My first basket was uneven and one side opened, but she showed me how to tighten the strips without breaking them. I learned that the preparation of the leaves is as important as the weaving. I think this knowledge is worth preserving because the baskets are useful, biodegradable and connected to family memories. Also, watching an experienced person teaches details that are difficult to understand from a video, such as how much pressure to use.`,
    `The traditional craft I was shown was palm-leaf basket weaving, taught by my grandmother during a long visit to her village. She began before the actual weaving, selecting mature leaves, drying them briefly in the shade and splitting them into strips of almost equal width. Rather than completing a basket while I watched passively, she demonstrated one crossing at a time and then handed the work to me. My first base twisted badly, and one wall began to open, but she showed me how to loosen three strips, correct the tension and rebuild the edge without discarding the material.

What I learned was partly technical: preparation determines flexibility, consistent tension creates strength, and a small mistake can be repaired if it is noticed early. More importantly, I learned how much judgement is stored in the hands. My grandmother could feel when a strip was about to split and adjusted pressure before any damage was visible. This knowledge deserves preservation because the finished objects are useful, biodegradable and locally adapted, but also because the teaching process carries family history and patience. A diagram can record the pattern, yet it cannot fully capture the rhythm, touch and quiet conversation through which the craft has traditionally been passed on.`,
    intermediateFeedback('learning palm-leaf basket weaving from a grandmother', 'the uneven first basket'),
    advancedFeedback('the preservation of embodied craft knowledge', 'repairing the twisted base instead of starting again'),
  ),
  25: reference(
    `Describe a rule in a shared place that you think works well.
You should say:
• what the place is and what the rule says
• who is expected to follow the rule
• how the rule affects people's behaviour
and explain why you think the rule is effective or how it could be improved.`,
    `A rule that works well is in the study room of my local library. It says that phone calls must be taken outside, although silent messages are allowed. The rule applies to everyone, including students, staff and people using the public computers. Before the signs were installed, one long call could distract the whole room and sometimes people argued. Now most visitors put their phones on silent and leave quickly if they need to speak. I think the rule is effective because it is simple and explains the expected behaviour. It is also fair because there is a small lobby with seats where calls are permitted. Maybe it could be improved by making the sign larger near the computer area, because new visitors occasionally do not notice it.`,
    `The rule I value operates in the silent study room of our municipal library: phone calls must be taken beyond the glass doors, although silent messaging and emergency alerts are permitted. It applies equally to students, staff, computer users and visitors who enter only briefly. Before the rule was introduced, enforcement depended on whether someone felt confident enough to confront a stranger, so a single extended call could disturb dozens of people and create unnecessary conflict.

The rule changed behaviour because it is specific, visible and supported by the design of the space. Clear signs appear at both entrances, desks have a small silent-mode symbol, and a seated lobby immediately outside provides an acceptable place to speak. Consequently, visitors rarely interpret a reminder as a personal criticism; they can see that the expectation is shared and that an alternative is available. I consider it effective because it protects concentration without pretending that phones can be banned from modern life. The only improvement I would make is an illuminated reminder near the public computers, where first-time users sometimes miss the entrance signs. Good rules do not merely prohibit conduct; they make the desired conduct easy to understand and follow.`,
    intermediateFeedback('a no-phone-call rule in a library study room', 'the lobby where calls are allowed'),
    advancedFeedback('a shared rule that protects concentration fairly', 'the link between clear signage and an acceptable alternative space'),
  ),
  26: reference(
    `Describe a person who made something difficult easy for you to understand.
You should say:
• who the person was and what they explained
• when or where the explanation took place
• how the person explained it
and explain why the explanation was effective.`,
    `The person was my colleague Marta, and she explained how a complicated budget spreadsheet worked. This happened when I joined a project team and had to update monthly costs. At first, I saw many formulas and different colours, so I was afraid of changing the wrong cell. Marta copied one small section into a blank file and used three simple examples. She showed me which numbers were inputs, which were calculated automatically and how an error appeared. Then she asked me to explain the process back to her. Her explanation was effective because she did not start with every detail. She reduced the problem, connected each formula to a real expense and let me practise safely. After that, I could use the original spreadsheet with much more confidence.`,
    `The person was a colleague called Marta, who helped me understand a dense budget workbook when I first joined a research project. The file contained linked sheets, colour codes and formulas that seemed to change unpredictably, so I was reluctant to touch anything. Instead of describing the entire system, Marta copied a single monthly section into a blank workbook. She entered three imaginary expenses and traced each one from the input cell to the subtotal and final forecast. She then deliberately created a reference error, showed me how to identify it, and asked me to reconstruct the process while explaining my decisions aloud.

Her method was effective for three reasons. First, she reduced the scale of the problem without oversimplifying the underlying relationship. Second, every formula corresponded to a recognisable project expense, so the symbols acquired a practical meaning. Finally, asking me to teach the sequence back to her revealed the point at which I was still guessing. By the time we returned to the real workbook, its complexity had not disappeared, but it had become organised complexity. I learned not only how to update that budget, but also a reusable way of approaching unfamiliar technical systems: isolate one working example, test it and then expand carefully.`,
    intermediateFeedback('a colleague simplifying a budget spreadsheet', 'the three imaginary expenses'),
    advancedFeedback('an explanation that turns technical complexity into a transferable method', 'the deliberate error and teach-back step'),
  ),
  27: reference(
    `Describe a promise you kept even though it was difficult.
You should say:
• what the promise was
• who you made it to
• what made it difficult to keep
and explain why keeping the promise mattered to you.`,
    `I promised my younger cousin that I would attend her first school concert. I made the promise several weeks before the event because she was nervous and wanted to see a familiar face. On the same day, an urgent task appeared at work and heavy rain caused traffic problems. I almost sent her a message saying I could not come, but I spoke to my manager, finished the most important part early and took the bus instead of driving. I arrived a few minutes before her group performed. Keeping the promise mattered because she had practised for months and trusted me. When she saw me after the concert, she looked relieved and proud. It also reminded me that promises should influence my decisions, not only express good intentions when life is easy.`,
    `The promise was to attend my younger cousin's first school concert. She had been practising the violin for months and was anxious about performing, so when she asked whether I would be there, I gave her an unqualified yes. The difficulty arose on the afternoon of the concert, when an urgent client request arrived at work just as heavy rain began disrupting traffic. Cancelling would have been understandable, and I even drafted a message, but it felt wrong to make her carry the cost of circumstances she could not control.

I explained the situation to my manager, completed the genuinely urgent analysis, delegated a formatting task and took a bus because the roads near the school were blocked to cars. I entered the hall only minutes before her group began. Keeping the promise mattered less because of the concert itself than because she had organised her courage around the expectation that someone familiar would be present. Her expression when she found me afterwards made that clear. The experience also changed how I make commitments: I now avoid promising casually, but once I do, I treat the promise as a real constraint on my choices rather than a pleasant intention that disappears when the day becomes inconvenient.`,
    intermediateFeedback('keeping a promise to attend a cousin’s concert', 'the last-minute work emergency'),
    advancedFeedback('a difficult promise treated as a genuine obligation', 'the unsent cancellation message and practical reorganisation'),
  ),
  28: reference(
    `Describe a public place that is better at a particular time of day.
You should say:
• what the place is
• what time of day is best
• what is different there at that time
and explain why that time makes the experience better.`,
    `The place is the main market square in my city, and I think it is best early on Sunday morning, around seven o'clock. Later in the day it becomes crowded and hot, with loud music from several shops. In the morning, delivery vehicles have already left, but most tourists have not arrived. The stone buildings catch soft light, café workers are arranging tables and local people buy bread or flowers. It is easier to hear the fountain and walk without stopping every few metres. This time makes the experience better because the square still feels active, not empty, but it is calm enough to notice details. I also like seeing the people who prepare the place before it becomes a busy attraction.`,
    `I would choose the old market square in the centre of my city, specifically at about seven on a Sunday morning. By midday it is an energetic but exhausting place: tour groups occupy the pavements, several shops compete with loud music and the pale stone reflects considerable heat. Early in the morning, however, the delivery vans have just departed and the larger crowds have not yet arrived. Café staff unfold chairs, flower sellers arrange their first displays and residents cross the square carrying bread rather than cameras.

The physical space seems to expand at that hour. Without constant movement around me, I can hear the fountain, notice carved details above the shopfronts and watch sunlight travel gradually across the eastern façade. Yet the square is not lifeless; the quiet activity of people preparing for the day gives it purpose. That balance is what improves the experience. An empty square at midnight might be peaceful, but it would feel detached from its public function. Sunday morning reveals both the architecture and the routines that sustain it. It also allows me to participate as a local resident, buying coffee and greeting vendors, before the square changes into a crowded visitor attraction.`,
    intermediateFeedback('a market square experienced early in the morning', 'the contrast with the crowded midday period'),
    advancedFeedback('the way time alters both space and social meaning', 'the square’s transition from local routine to visitor attraction'),
  ),
  29: reference(
    `Describe a person who stayed calm in a difficult situation.
You should say:
• the person involved and the difficulty they faced
• what the person did
• how other people reacted
and explain why the calm response was effective or memorable.`,
    `The person was a bus driver during a journey when the engine suddenly stopped on a busy road. Some passengers became worried because it was getting dark and one person started complaining loudly. The driver parked safely, turned on the warning lights and explained that he had already contacted the company. He checked whether anyone needed urgent help and gave us updates every few minutes. Because he spoke slowly and did not argue with the angry passenger, the atmosphere became calmer. Another bus arrived after about twenty minutes. His response was effective because he gave clear information and practical instructions instead of pretending there was no problem. I remember it because his calm behaviour changed the whole group, even though he could not repair the engine himself.`,
    `The person was a bus driver whose vehicle lost power on a congested road shortly after sunset. The sudden silence from the engine alarmed everyone, and one passenger began accusing the driver of poor maintenance while others tried to phone relatives at once. The driver first guided the bus into the safest available position, activated the hazard lights and contacted the control centre. He then addressed us directly, explained what he knew, admitted what he did not yet know and asked whether anyone had a medical or time-sensitive need.

What impressed me was the discipline of his communication. He did not promise an exact rescue time, but he returned every few minutes with a brief update, even when the update was simply that a replacement bus was still approaching. He also refused to match the aggressive passenger's tone. As a result, people stopped speculating, one traveller offered a charger to another, and the atmosphere shifted from blame to cooperation. A replacement arrived after roughly twenty minutes. His calmness was effective because it was active rather than passive: he combined safety procedures, honest information and attention to vulnerable passengers. I remember the incident because he could not remove the mechanical problem, yet he prevented uncertainty from becoming a second crisis.`,
    intermediateFeedback('a bus driver managing a breakdown', 'regular updates to anxious passengers'),
    advancedFeedback('calm leadership during a transport disruption', 'the distinction between controlling the situation and repairing the engine'),
  ),
  30: reference(
    `Describe a durable object you have used or seen.
You should say:
• what the object is
• how it is used
• what design features help it last
and explain why its durability matters.`,
    `The object is my father's metal toolbox, which he has used for more than twenty years. It stores basic tools and is carried to repair jobs around the house. The box is made from thick steel, the corners are folded and reinforced, and the handle is attached with metal pins instead of glue. It has scratches and some faded paint, but the lid still closes properly. The removable tray also keeps small items from damaging the bottom. Its durability matters because tools are heavy and a weak box could open while someone is carrying it. It also means my father has repaired the latch twice instead of buying a completely new box. For me, the marks on it show useful work, so age has added character rather than making it worthless.`,
    `A durable object I know well is my father's steel toolbox, which has survived more than two decades of household repairs and occasional professional jobs. It carries heavy hand tools, screws and measuring equipment from a storage room to wherever they are needed. Its longevity comes from several unremarkable but intelligent decisions: thick folded steel forms the body, the corners are mechanically reinforced, the handle pivots on replaceable pins, and a removable upper tray prevents small sharp tools from repeatedly striking the base. The paint is scratched and the lid is slightly dented, yet the hinges remain aligned and the clasp still closes securely.

Its durability matters first for safety, because a box full of metal tools must not open while being carried. It also matters economically and environmentally. When the clasp weakened, my father replaced a small part rather than discarding the entire object; the design makes repair possible without specialist equipment. Finally, the toolbox has acquired a kind of practical history. Its marks correspond to shelves built, bicycles repaired and problems solved, so wear records use rather than simple decline. In a market full of objects designed for rapid replacement, it demonstrates how robust materials, accessible fasteners and maintenance can keep an ordinary product useful across generations.`,
    intermediateFeedback('a long-lasting steel toolbox', 'its reinforced corners and repaired latch'),
    advancedFeedback('durability as safety, repairability and accumulated history', 'the replaceable clasp and visible record of use'),
  ),
  31: reference(
    `Describe a time when a plan changed unexpectedly.
You should say:
• what the original plan was
• why it changed
• what you did next
and explain what you learned from the change.`,
    `Last year, three friends and I planned to spend a Saturday hiking to a lake outside the city. We had booked transport and prepared food, but early that morning the park service closed the trail because heavy rain had damaged a bridge. At first, we were disappointed and considered cancelling the whole day. Then one friend suggested visiting a smaller nature reserve near the train line. We checked the weather, changed our tickets and bought lunch there instead. The new walk was shorter, but we saw many birds and had more time to talk. I learned that a detailed plan is useful, but it should not become the only acceptable result. Checking official information early and having a simple alternative can save the purpose of a day even when the original route disappears.`,
    `A plan that changed unexpectedly was a Saturday hike to a mountain lake with three friends. We had reserved a minibus, divided the food and chosen the route carefully. At six that morning, however, the park authority announced that overnight rain had damaged a footbridge and closed the only safe approach. Our first reaction was to abandon the outing because every preparation seemed tied to that destination. After a brief and rather unproductive period of complaining, we identified what we actually wanted from the day: time outdoors together, not that particular photograph of a lake.

We compared weather alerts and public transport, then chose a smaller wetland reserve beside a railway station. We changed the tickets, bought lunch locally and followed a shorter marked circuit. The alternative lacked the dramatic scenery we had expected, but we watched migratory birds from a hide and had time for a long conversation that the more demanding hike might not have allowed. I learned to separate a plan's purpose from its mechanism. Preparation still mattered, because checking official information prevented us from taking a dangerous route, but flexibility protected the underlying goal. Since then, I build one credible fallback into important outings and discuss it before anyone is tired or disappointed.`,
    intermediateFeedback('adapting a cancelled hiking plan', 'the alternative wetland reserve'),
    advancedFeedback('recovering the purpose of a plan after its route became unsafe', 'the distinction between reaching the lake and spending meaningful time outdoors'),
  ),
  32: reference(
    `Describe a public announcement you remember.
You should say:
• where and when you heard it
• what the message was and how it was delivered
• how people responded
and explain why it was effective or ineffective.`,
    `I remember an announcement at a railway station during a very crowded evening. A storm had damaged signals, so trains on two platforms were delayed and one service would leave from another platform. The message first appeared on the screens, and then a staff member repeated it slowly over the loudspeaker. She mentioned the destination before the platform number and repeated the new number twice. People stopped moving for a moment, checked the screens and then walked in the same direction. Some staff stood near the stairs to answer questions. I think it was effective because it gave one clear action and used both visual and spoken information. It also arrived before the train entered, so passengers had enough time to move without running.`,
    `The public announcement I remember was made at Central Station during a stormy weekday evening. Signal damage had delayed several services, and a regional train was being transferred from platform six to platform eleven. The information appeared first on the departure boards, but because the concourse was crowded, a member of staff also delivered it over the public-address system. She began with the destination and scheduled departure time, paused, and then repeated the new platform number twice. Colleagues wearing bright vests positioned themselves beside the stairs and displayed handwritten destination cards.

The initial response was a moment of stillness while passengers verified that the message applied to them. Then most people moved in the same direction without running; those with luggage or limited mobility approached the staff, who directed them to a lift. The announcement was effective because its design matched the conditions. It used visual and spoken channels, foregrounded the information passengers recognised, and translated the disruption into one clear action. Crucially, it was issued before the incoming train appeared, leaving enough time for an orderly transfer. It did not eliminate frustration or delay, but it prevented uncertainty from producing a dangerous rush, which is a realistic measure of successful public communication.`,
    intermediateFeedback('a railway platform-change announcement', 'the repeated platform number'),
    advancedFeedback('a multimodal announcement during transport disruption', 'the coordinated use of boards, voice and visible staff'),
  ),
  33: reference(
    `Describe a place that is used by people of different generations.
You should say:
• where the place is
• who uses it and what they do there
• when people of different ages tend to meet there
and explain why the place works well for different generations.`,
    `The place is a community garden beside a sports centre near my home. Older residents usually go there early to water plants and share gardening advice. Parents bring young children after school, and teenagers sometimes help with heavy jobs or sit at the picnic tables. The generations meet most often on Saturday mornings, when tools are shared and vegetables are collected. The place works well because there are different kinds of activity. Someone can do serious gardening, join a workshop or simply sit in the shade. The paths are wide and the raised beds are easier for people who cannot bend down. I also think the shared task helps conversation, because people can talk while planting instead of feeling they must speak to a stranger without any reason.`,
    `A place used successfully across generations is the community garden beside our district sports centre. Retired residents often arrive early to water seedlings and maintain the compost, while parents bring children after school to observe insects or harvest herbs. Teenagers contribute less regularly, but several help with heavy materials and use the sheltered tables for homework. The strongest overlap occurs on Saturday mornings, when the garden holds a shared work session followed by a simple meal made from whatever is ready to pick.

The site accommodates different ages without assigning them rigid roles. Wide paths suit prams and mobility aids, raised beds reduce the need to bend, and a small unstructured area allows children to dig without threatening carefully managed crops. Equally important, participation can vary: one person may lead a seed-saving workshop, another may carry soil, and someone else may simply sit under the shade structure and talk. The garden works because conversation grows around a common task rather than being forced as an abstract intergenerational exercise. Experience is valuable, but younger users also contribute digital skills, physical energy and new ideas. As a result, the place encourages exchange without suggesting that every age group must behave in the same way.`,
    intermediateFeedback('an intergenerational community garden', 'the Saturday work session'),
    advancedFeedback('a shared place that supports different abilities and forms of participation', 'the way conversation develops around practical work'),
  ),
  34: reference(
    `Describe a well-organised event that you attended.
You should say:
• what the event was and why it was held
• how it was organised
• what the participants experienced
and explain why you thought the organisation was effective.`,
    `I attended a neighbourhood book exchange that was held to collect reading materials for a new school library. The organisers divided a community hall into labelled sections such as children's books, fiction and reference. People registered online for a short arrival period, but they could also come without booking. Volunteers checked donations at the entrance, gave each person tokens and explained how many books they could choose. There was also a table for damaged books and a quiet storytelling area. Participants did not have to wait long, and the shelves stayed tidy even when the hall became busy. I thought the organisation was effective because every step was visible and simple. The event collected many useful books, but it also let families choose something, so it felt like an exchange rather than just a request for donations.`,
    `The event was a neighbourhood book exchange organised to stock a newly opened school library while giving local families access to affordable reading material. The community hall was divided into clearly labelled zones for children's books, fiction, reference works and other languages. Participants could reserve a thirty-minute arrival window, although a separate queue remained available for people without internet access. At the entrance, volunteers inspected donations, issued exchange tokens and directed unsuitable or damaged items to a repair table rather than mixing them with usable books.

Inside, participants experienced a calm browsing environment despite the large attendance. Shelf teams continually reorganised material, a storytelling corner kept younger children engaged, and a visible information desk resolved questions without blocking the entrance. The organisers also monitored which categories were moving quickly and released stored boxes gradually, so early visitors did not take every attractive title. I found the organisation effective because it treated logistics and purpose as one problem. Clear movement reduced waiting, but the token system also preserved the event's character as a reciprocal exchange rather than a one-sided appeal. By the end, the school had received hundreds of relevant books, families had taken useful reading home and volunteers could account for what remained.`,
    intermediateFeedback('a neighbourhood book exchange', 'the labelled sections and token system'),
    advancedFeedback('an event whose logistics reinforced its community purpose', 'the gradual release of books and accessible arrival options'),
  ),
  35: reference(
    `Describe a local news report that caused you to change a plan.
You should say:
• what the report was about
• where and when you encountered it
• what plan you changed
and explain why the report influenced your decision.`,
    `A local radio report warned that strong winds would close a bridge used by buses between my town and the airport. I heard it while having breakfast on the morning I was supposed to collect a friend. My original plan was to leave at midday and take the usual bus, but the report said the bridge might close from eleven and that journeys would be diverted. I checked the transport website, left two hours earlier and used a train route on the other side of the river. The report influenced me because it gave a specific location, time and official source instead of only saying the weather was bad. My friend’s flight was also early, so the cost of ignoring it was high. The change made the trip longer but prevented me from being stranded.`,
    `The report concerned dangerously strong winds and a planned closure of the East River Bridge, a route used by most buses to the airport. I heard it on a local radio bulletin over breakfast on the morning I was due to collect a friend. My original plan was to leave around midday on the direct airport bus. The report stated that authorities might close the bridge from eleven, identified the likely diversion and advised passengers to verify services before travelling.

I checked both the municipal alert and the transport operator's website, then left nearly two hours earlier and took a train that crossed the river farther north. That route involved one additional connection, but it remained outside the predicted closure area. The report influenced me because it was specific and actionable: it named the bridge, provided a time window and attributed the warning to the transport authority. It was therefore different from vague weather commentary that might encourage unnecessary alarm. Collecting my friend also had a fixed deadline, so the consequence of waiting for certainty was greater than the inconvenience of changing early. The bridge did close shortly afterwards. The experience reinforced that reliable local news is most useful when it helps people make proportionate decisions rather than merely announcing that a problem exists.`,
    intermediateFeedback('changing an airport journey after a local weather report', 'the named bridge and closure time'),
    advancedFeedback('using specific local reporting to make a proportionate travel decision', 'the verification of the alert across two official sources'),
  ),
  36: reference(
    `Describe an object that you used in an unexpected way.
You should say:
• what the object was and its usual purpose
• what problem you were trying to solve
• how you used the object differently
and explain why this unexpected use was effective or memorable.`,
    `The object was a metal binder clip, which is normally used to hold papers together. I was working online when the small stand for my phone broke, and I needed the phone beside my laptop for a video call. I opened the clip, removed one handle and bent the other handle slightly. Then I placed the phone between the metal arms and used a book behind it for support. It was not beautiful, but it kept the camera steady at the correct height for the whole meeting. The use was effective because the clip was strong, easy to adjust and already on my desk. I remember it because I nearly bought a new stand immediately, but a simple object solved the problem and was returned to its normal purpose afterwards.`,
    `The object was an ordinary metal binder clip, designed to secure a stack of papers. Minutes before an online interview, the hinge on my small phone stand snapped, leaving the camera at an unusably low angle. I needed a stable support beside my laptop, but there was no time to buy or construct a conventional replacement. I opened the clip, removed one wire handle, rotated the other to form a rear brace and attached the clip to the edge of a thick notebook. The padded inner surfaces gripped the phone without scratching it, while the notebook supplied enough weight to prevent tipping.

The improvised stand was effective because the original design already contained the properties the problem required: spring tension, compact strength and an adjustable metal loop. I was not forcing a fragile object to perform an unrelated task; I was recognising functions hidden by its usual context. The camera remained at eye level for the entire interview, and afterwards I reassembled the clip and returned it to my documents. The incident is memorable because it interrupted an automatic consumer response. My first impulse was to replace the broken stand, but examining the tools already available produced a faster, reversible and waste-free solution.`,
    intermediateFeedback('turning a binder clip into a temporary phone stand', 'the broken stand before a video call'),
    advancedFeedback('recognising useful design properties outside an object’s usual context', 'the reversible combination of spring tension and a weighted notebook'),
  ),
  37: reference(
    `Describe a person who improved a routine.
You should say:
• who the person was and what routine was involved
• what change the person made
• how other people responded
and explain why the change had a lasting effect.`,
    `The person was a nurse who coordinated appointments at a small clinic I visited. The old routine required patients to wait in one line to register and then ask again where to go. She introduced coloured cards for different services and a short message system that told people when their room was nearly ready. At first, some staff thought the cards were too simple, but patients understood them quickly and the reception area became less crowded. Other nurses also spent less time giving directions. The change lasted because it did not require expensive equipment and it solved a problem people faced every day. The nurse asked for feedback during the first week and changed two confusing colours, so the routine improved instead of being treated as perfect from the beginning.`,
    `The person was Elena, a senior nurse responsible for patient flow at a neighbourhood clinic. The previous routine sent everyone to the same reception queue, after which patients often had to ask repeatedly whether they should wait for laboratory work, vaccination or a consultation. Elena introduced two linked changes: colour-coded cards corresponding to service areas and a simple text message sent when a room was almost ready. She tested the system for one week rather than imposing it permanently, observed where people hesitated and replaced two colours that older patients found difficult to distinguish.

Initial staff reactions were mixed. Some considered the cards almost childish, while others worried that messages would create extra work. Patients, however, understood the routes quickly, the crowded reception area became quieter and nurses spent less time repeating directions. Once the benefits were visible, staff suggested refinements of their own, including a paper alternative for visitors without phones. The change endured because it was inexpensive, easy to explain and responsive to feedback. More importantly, Elena improved the routine without blaming individuals for confusion; she treated repeated questions as evidence that the system, rather than the patient, needed redesign. That principle influenced later changes at the clinic and made her intervention more lasting than the cards themselves.`,
    intermediateFeedback('a nurse simplifying patient flow', 'the coloured service cards'),
    advancedFeedback('a routine improved through testing and respectful redesign', 'the decision to interpret repeated questions as system evidence'),
  ),
  38: reference(
    `Describe a small business that serves its local area well.
You should say:
• what the business is and where it operates
• what service it provides
• what it does particularly well
and explain why it is valuable to the local area.`,
    `The business is a bicycle repair shop near a university and a residential neighbourhood. It repairs tyres, brakes and gears, and it also sells a few basic parts. What it does particularly well is explain the problem before charging for work. The owner shows customers the worn part and gives a cheaper and a longer-lasting option when possible. Small repairs can often be done the same day, and students can borrow a simple tool at the entrance. The shop is valuable because many local people depend on bicycles for transport and cannot wait a week for a repair. It also runs a free monthly session where people learn to fix a puncture. This saves money, reduces abandoned bicycles and makes cycling feel possible for beginners.`,
    `A small business that serves my area exceptionally well is a bicycle workshop located between the university campus and a dense residential district. It handles routine repairs such as punctures, brakes and gears, while keeping a modest stock of commonly needed parts. Its strongest quality is transparent diagnosis. Before beginning work, the owner shows the customer the worn component, explains the safety implications and, where possible, offers both a low-cost repair and a more durable replacement. Straightforward jobs are completed the same day, and a public workbench outside allows people to borrow a pump or basic tool without making a purchase.

The workshop is valuable because bicycles are not merely recreational in this neighbourhood; students, delivery workers and families rely on them for daily transport. A delayed or confusing repair can therefore disrupt work and study. The business also runs a free monthly puncture class and collects usable parts from abandoned bicycles for low-cost repairs. These activities might not maximise immediate sales, but they build practical confidence and reduce waste. The shop succeeds commercially because residents trust it, yet its broader contribution is a more resilient local transport culture in which beginners can ask questions and necessary maintenance remains accessible.`,
    intermediateFeedback('a neighbourhood bicycle repair shop', 'the explanation of repair options'),
    advancedFeedback('a small workshop that strengthens local transport', 'the relationship between transparent service, skills sharing and trust'),
  ),
  39: reference(
    `Describe a public service that was more useful than you expected.
You should say:
• what the public service was
• how you discovered it
• how the service was used
and explain why it was more useful than expected.`,
    `The service was an online appointment system at the municipal advice centre. I discovered it when I searched for information about replacing a damaged identity document. I expected only a form, but the website offered a short video call with an adviser. During the call, I showed the damaged document, and the adviser checked which copies I needed and reserved a time at the correct office. She also sent a checklist by email. The service was more useful than I expected because it prevented two unnecessary journeys and answered a question that was not clear on the general website. It was free and took about fifteen minutes. I had imagined public administration would be slow and impersonal, but this service combined digital convenience with a real person who could understand the unusual part of my case.`,
    `The public service was a remote advice and appointment system operated by the municipal documentation office. I found it while searching for instructions on replacing an identity card that had been damaged but was still partly readable. I expected the website to provide a generic form; instead, it offered a fifteen-minute video consultation. During that call, an adviser inspected the damage, identified the exact replacement category, checked which supporting copies were necessary and booked me directly into the office equipped to process the request. A personalised checklist arrived by email moments later.

The service exceeded my expectations because it solved the costly part of the problem before I travelled. Without the consultation, I would probably have visited the nearest office, discovered that it lacked the required facility and returned with different documents. The digital channel was convenient, but its real value came from combining that convenience with human judgement. The adviser could ask follow-up questions and recognise that my case did not fit the most obvious website category. It was also free, brief and available outside conventional working hours. The experience challenged my assumption that public administration is inevitably impersonal: careful service design can use technology to direct attention more precisely rather than simply removing people from the process.`,
    intermediateFeedback('a municipal video-advice service', 'the personalised document checklist'),
    advancedFeedback('a digital public service strengthened by human judgement', 'the avoided journeys and correct office booking'),
  ),
  40: reference(
    `Describe a person who asks useful questions.
You should say:
• who the person is
• what kinds of questions the person asks
• a situation in which a question helped
and explain why the person’s questions are useful.`,
    `The person is my former project supervisor, Daniel. He does not ask questions just to test people. He usually asks what evidence supports an idea, who will use the result and what could make a plan fail. During one project, our team wanted to build a detailed online survey. Daniel asked, "What decision will each question help us make?" We realised that almost half of the survey collected interesting information but did not connect to the project goal. We shortened it, and more participants completed it. His questions are useful because they slow people down at the right moment and reveal assumptions without embarrassing anyone. He listens to the answer and often asks a second, simpler question. This helps the team improve its own thinking instead of waiting for him to provide every solution.`,
    `The person is Daniel, a former project supervisor whose questions consistently improve discussions. He rarely asks for information that a report already contains. Instead, he asks what evidence supports a claim, whose needs are absent, what decision a proposed activity will change and under which condition the plan would fail. His tone is curious rather than theatrical, so people do not feel that he has hidden the correct answer and is waiting for them to guess it.

One useful question arose when our team designed a long online survey. We were debating the wording of individual items when Daniel asked, "What decision will each answer allow us to make?" Mapping the questions to actual decisions revealed that nearly half collected interesting background information but had no role in the project. We removed them, clarified the remaining options and achieved a much higher completion rate. The question helped because it shifted attention from the document we were producing to the purpose it was meant to serve. Daniel's questions are valuable for the same reason more generally: they expose assumptions without humiliating the person who made them, and they invite the group to construct the solution. He listens carefully, then asks a simpler follow-up that often reaches the real uncertainty beneath a complicated debate.`,
    intermediateFeedback('a supervisor whose questions improve project decisions', 'the survey question-to-decision check'),
    advancedFeedback('useful questioning as a method for exposing assumptions respectfully', 'the move from editing survey wording to clarifying its purpose'),
  ),
} satisfies Record<number, IeltsGuidedSpeakingReference>;

