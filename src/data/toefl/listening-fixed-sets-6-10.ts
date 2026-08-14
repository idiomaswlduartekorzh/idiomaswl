import {
  fixedListeningChoose,
  fixedListeningItem,
  fixedListeningSet,
  fixedListeningStimulus,
} from './listening-fixed-types.ts';

const CONVERSATION_INSTRUCTIONS = 'Listen to a short conversation. Then answer questions 1–2. The audio plays once.';
const ANNOUNCEMENT_INSTRUCTIONS = 'Listen to an announcement. Then answer questions 1–2. The audio plays once.';
const ACADEMIC_INSTRUCTIONS = 'Listen to an academic talk. Then answer questions 1–4. The audio plays once.';

const item = (setNumber: number, code: string, prompt: string, options: readonly string[]) =>
  fixedListeningItem(setNumber, code, prompt, options);

export const TOEFL_FIXED_LISTENING_SET6 = fixedListeningSet(6, {
  module1ChooseAdditions: [
    fixedListeningChoose(6, 'm1', 6, 'woman', 'Has the financial aid office answered your email?', ['The office is beside the library.', 'Not yet, so I will call them this afternoon.', 'The email included two attachments.', 'Financial planning takes time.']),
    fixedListeningChoose(6, 'm1', 7, 'man', 'Could you show me how to use this scanner?', ['The scanner is on the second floor.', 'I scanned the article yesterday.', 'The instructions are beside the printer.', 'Certainly. Put the page face down first.']),
    fixedListeningChoose(6, 'm1', 8, 'woman', 'Why was the soccer practice cancelled?', ['The field is too wet after last night’s rain.', 'Practice usually ends at six.', 'The team won its last game.', 'The players use the eastern field.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(6, 'm2', 1, 'man', 'Do you know when the replacement component is due?', ['The machine needs a small part.', 'It was ordered from another city.', 'According to the message, sometime on Thursday.', 'The delivery entrance is behind the building.']),
      fixedListeningChoose(6, 'm2', 2, 'woman', 'I am worried that my introduction is too long.', ['Try removing the example that you explain again later.', 'The introduction comes before the first section.', 'Your paper uses a clear typeface.', 'The assignment is due next week.']),
      fixedListeningChoose(6, 'm2', 3, 'man', 'Do we need tickets for tomorrow’s lecture?', ['The lecture discusses modern architecture.', 'No, but the seats are available on a first-come basis.', 'Tomorrow is the final day of classes.', 'I left the tickets on my desk.']),
      fixedListeningChoose(6, 'm2', 4, 'woman', 'Where did you find that internship listing?', ['The internship begins in June.', 'I found my keys near the entrance.', 'The listing describes three positions.', 'On the career center’s website.']),
      fixedListeningChoose(6, 'm2', 5, 'man', 'The cafeteria line is much shorter today.', ['The cafeteria added another serving station.', 'I brought lunch from home.', 'Maybe everyone came earlier than we did.', 'The shortest route crosses the courtyard.']),
      fixedListeningChoose(6, 'm2', 6, 'woman', 'Would you prefer to meet in person or online?', ['The meeting lasted forty minutes.', 'Online would be easier for me this week.', 'I met the new coordinator yesterday.', 'The online form has five questions.']),
      fixedListeningChoose(6, 'm2', 7, 'man', 'I think I left my umbrella in your office.', ['I will look for it when I get back there.', 'The forecast mentions heavy rain.', 'My office has a large window.', 'The umbrella is dark green.']),
      fixedListeningChoose(6, 'm2', 8, 'woman', 'How was the new student orientation?', ['The students came from several countries.', 'It was held in the main auditorium.', 'The orientation schedule had four sessions.', 'Useful, especially the campus safety tour.']),
    ],
    conversation: fixedListeningStimulus(
      6, 'm2-conversation', 'conversation', 'Revising a research essay', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My research essay has plenty of sources, but the paragraphs still feel disconnected.

INSTRUCTOR: Your evidence is relevant. The difficulty is that each paragraph summarizes a source instead of advancing one claim. Start by writing a sentence that states the relationship you see among the sources.

STUDENT: Then I should organize the evidence around that relationship?

INSTRUCTOR: Exactly. Use that sentence as a working thesis, and move each example beside the point it supports. Bring the new outline on Thursday, and we can check the sequence together.`,
      ['student', 'professor'], [
        item(6, 'm2-cv1', 'What problem does the student have with the essay?', ['It contains too few research sources.', 'Its evidence is unrelated to the topic.', 'Its paragraphs do not form a connected argument.', 'It was submitted after the deadline.']),
        item(6, 'm2-cv2', 'What will the student bring on Thursday?', ['A list of unused sources', 'A revised outline', 'A completed final draft', 'A request to change topics']),
      ],
    ),
    announcement: fixedListeningStimulus(
      6, 'm2-announcement', 'announcement', 'Science building entrance closure', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The north entrance of the science building will be closed from Tuesday through Friday while workers replace the exterior steps. During that period, use the accessible east entrance beside the greenhouse. Deliveries must go to the loading area on Pine Street. All laboratories and classrooms will follow their normal schedules, and emergency exits will remain available.`,
      ['announcer'], [
        item(6, 'm2-an1', 'Why will the north entrance be closed?', ['Workers will replace the exterior steps.', 'The greenhouse is being removed.', 'Laboratory schedules are changing.', 'A delivery is blocking Pine Street.']),
        item(6, 'm2-an2', 'Where should building users enter during the closure?', ['Through the loading area', 'At the emergency exit', 'Beside the north laboratory', 'Through the east entrance by the greenhouse']),
      ],
    ),
    academic: fixedListeningStimulus(
      6, 'm2-academic-talk', 'academic-talk', 'Atmospheric Rivers', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: An atmospheric river is a long, relatively narrow region of the atmosphere that transports water vapor. The name is a metaphor: it is not a river of liquid water in the sky. Winds move the vapor, often from warm ocean regions toward a continent. When the air rises over coastal terrain, it cools, water condenses, and substantial rain or snow can fall.

Atmospheric rivers are not automatically disasters. A moderate event may replenish reservoirs and build mountain snowpack that supplies water in later seasons. Problems arise when an especially strong system arrives, when several systems occur close together, or when the rain falls on soil that is already saturated. Then flooding, landslides, and rapid runoff become more likely.

Forecasters combine satellite observations, radar, weather balloons, aircraft measurements, and numerical models. Satellites help reveal the broad corridor of moisture over the ocean, while instruments closer to land provide details about winds and precipitation. Forecast uncertainty remains important because a small shift in the path can change which watershed receives the heaviest precipitation. So an atmospheric river is best understood as a transport mechanism whose effects depend on its strength, duration, path, and the conditions on the ground.`,
      ['professor'], [
        item(6, 'm2-at1', 'What is an atmospheric river?', ['A permanent channel of liquid water above land', 'A narrow atmospheric region that transports water vapor', 'A current that moves only through mountain snow', 'A storm that always produces a natural disaster']),
        item(6, 'm2-at2', 'What benefit can a moderate atmospheric river provide?', ['It prevents all later droughts.', 'It removes moisture from mountain soils.', 'It can replenish reservoirs and add to snowpack.', 'It guarantees that rivers will not flood.']),
        item(6, 'm2-at3', 'When does flooding become more likely?', ['When the system passes only over dry ocean air', 'When satellites cannot see the coastline', 'When all precipitation remains as water vapor', 'When heavy precipitation reaches already saturated ground']),
        item(6, 'm2-at4', 'Why does the professor mention a small shift in the system’s path?', ['To explain why the most affected watershed can change', 'To show that atmospheric rivers never cross land', 'To prove that radar replaces all other observations', 'To define how mountain snow becomes water vapor']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET7 = fixedListeningSet(7, {
  module1ChooseAdditions: [
    fixedListeningChoose(7, 'm1', 6, 'man', 'Do you happen to know who left this notebook?', ['The notebook has lined paper.', 'I left class at noon.', 'It was under the front table.', 'It may belong to Priya; I saw her using it.']),
    fixedListeningChoose(7, 'm1', 7, 'woman', 'Could we postpone the rehearsal until Wednesday?', ['Wednesday works, as long as everyone agrees.', 'The rehearsal room has a piano.', 'We performed the piece last month.', 'The schedule is posted outside.']),
    fixedListeningChoose(7, 'm1', 8, 'man', 'I was surprised the documentary ended so abruptly.', ['The ending credits listed many researchers.', 'The documentary was shown downtown.', 'So was I. I expected one more interview.', 'The interview began after lunch.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(7, 'm2', 1, 'woman', 'Where should visitors park during the construction?', ['The construction begins next Monday.', 'In the temporary lot behind the gym.', 'Visitors must sign in at reception.', 'The gym has two entrances.']),
      fixedListeningChoose(7, 'm2', 2, 'man', 'I did not realize the application required two references.', ['The application is available online.', 'I referenced that article in my essay.', 'Two people attended the information session.', 'There is still time to ask your supervisors.']),
      fixedListeningChoose(7, 'm2', 3, 'woman', 'Would you check whether the window is locked?', ['Sure, I will check it before we leave.', 'The window overlooks the garden.', 'I locked my bicycle outside.', 'We left the meeting early.']),
      fixedListeningChoose(7, 'm2', 4, 'man', 'Why are you taking the later bus?', ['The bus stop is across the street.', 'I take the bus twice a week.', 'I need to finish a laboratory report first.', 'The later route has fewer stops.']),
      fixedListeningChoose(7, 'm2', 5, 'woman', 'The bookstore says my order is finally ready.', ['The bookstore closes at seven.', 'That is good; you have been waiting all week.', 'Your order number is on the receipt.', 'I read the first chapter already.']),
      fixedListeningChoose(7, 'm2', 6, 'man', 'How long should we leave between the two trains?', ['At least twenty minutes, in case the first train is late.', 'The transfer student joined our class.', 'The trip costs twenty dollars.', 'I allowed them to use my ticket.']),
      fixedListeningChoose(7, 'm2', 7, 'woman', 'I cannot hear the speaker from the back row.', ['The speaker studies linguistics.', 'The row has ten chairs.', 'I heard the announcement this morning.', 'There are two empty seats near the front.']),
      fixedListeningChoose(7, 'm2', 8, 'man', 'Did you remember to reserve the conference room?', ['The conference lasts two days.', 'The room has a long table.', 'Yes, I received the confirmation this morning.', 'I remember our first meeting.']),
    ],
    conversation: fixedListeningStimulus(
      7, 'm2-conversation', 'conversation', 'Using the campus bicycle program', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I joined the campus bicycle program, but the application will not let me unlock a bicycle.

STAFF MEMBER: Your account is active. The first time you ride, you must scan your identification card at a station before using the phone application.

STUDENT: I see. Is the first half hour still free?

STAFF MEMBER: Yes. After thirty minutes, the regular fee begins. During busy periods, return the bicycle to any station with an open space rather than leaving it beside a full station.`,
      ['student', 'announcer'], [
        item(7, 'm2-cv1', 'Why can the student not unlock a bicycle?', ['The identification card has not yet been scanned at a station.', 'The student’s account has been cancelled.', 'Every bicycle station is currently full.', 'The phone application requires a new payment.']),
        item(7, 'm2-cv2', 'What should a rider do if a station is full?', ['Leave the bicycle beside that station.', 'Keep the bicycle until the next day.', 'Call staff to remove another bicycle.', 'Return it to a different station with space.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      7, 'm2-announcement', 'announcement', 'Language exchange registration', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Registration for the spring language exchange opens tomorrow at nine a.m. Participants meet with a partner for one hour each week and divide the time between the two languages they are practicing. Complete the online interest form by Friday. Matches will be announced next Wednesday. The first meeting is an orientation for all participants, so partners should not arrange a separate meeting before then.`,
      ['announcer'], [
        item(7, 'm2-an1', 'What must applicants complete by Friday?', ['A recorded language sample', 'A meeting with a partner', 'The online interest form', 'A payment at the language center']),
        item(7, 'm2-an2', 'What should matched partners do first?', ['Practice only one language', 'Attend the group orientation', 'Arrange a meeting before Wednesday', 'Choose a different partner']),
      ],
    ),
    academic: fixedListeningStimulus(
      7, 'm2-academic-talk', 'academic-talk', 'Observing Phytoplankton from Space', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Phytoplankton are microscopic organisms that use photosynthesis and form the base of many aquatic food webs. Individual cells are far too small for a satellite camera to resolve. Yet large populations affect ocean color because chlorophyll and other pigments absorb and reflect particular wavelengths of light. Instruments in orbit measure that light, and scientists use the measurements to estimate surface chlorophyll and phytoplankton abundance.

The satellite view has a major advantage: it repeatedly covers broad ocean regions that ships cannot sample everywhere at once. Researchers can follow the location and timing of large blooms and compare seasonal patterns across years. Ocean color is an indirect measurement, however. Sediment, dissolved material, clouds, and the atmosphere can also affect the detected signal. A satellite generally observes the sunlit surface rather than the entire water column.

For those reasons, scientists still collect water from ships and fixed stations. Laboratory analysis can identify organisms more precisely and helps test how well a satellite estimate matches local conditions. New hyperspectral instruments measure many more wavelength bands than earlier sensors and may distinguish some communities more effectively. They do not eliminate field sampling. The strongest picture comes from combining the broad, repeated coverage of satellites with detailed measurements taken in the water.`,
      ['professor'], [
        item(7, 'm2-at1', 'Why can satellites help scientists study phytoplankton?', ['They photograph each individual cell directly.', 'They cause chlorophyll to rise to the surface.', 'They collect water samples from below clouds.', 'They detect changes in light associated with ocean pigments.']),
        item(7, 'm2-at2', 'What is one advantage of satellite observations?', ['They identify every organism to species.', 'They repeatedly cover broad ocean regions.', 'They measure the entire water column.', 'They are unaffected by the atmosphere.']),
        item(7, 'm2-at3', 'Why do scientists collect water samples?', ['To identify organisms and check satellite estimates', 'To replace all repeated observations from orbit', 'To remove dissolved material from the ocean', 'To make every bloom visible through clouds']),
        item(7, 'm2-at4', 'What does the professor conclude?', ['Hyperspectral sensors make fieldwork unnecessary.', 'Only ships can reveal seasonal patterns.', 'Combining satellite and field data gives the strongest picture.', 'Ocean color measures phytoplankton directly at every depth.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET8 = fixedListeningSet(8, {
  module1ChooseAdditions: [
    fixedListeningChoose(8, 'm1', 6, 'woman', 'How did your appointment with the adviser go?', ['She helped me choose courses for next term.', 'The appointment was in her office.', 'My adviser teaches biology.', 'Next term begins in January.']),
    fixedListeningChoose(8, 'm1', 7, 'man', 'I thought the package included a power cable.', ['The package arrived before noon.', 'The cable is two meters long.', 'It should have. Contact the seller about the missing part.', 'I included the receipt inside.']),
    fixedListeningChoose(8, 'm1', 8, 'woman', 'Would you mind closing the door on your way out?', ['The exit is at the end of the hall.', 'Of course. I will close it behind me.', 'The door was replaced last year.', 'I am leaving after the meeting.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(8, 'm2', 1, 'man', 'Why is the library so crowded this evening?', ['The library has four floors.', 'The crowd entered through the west door.', 'Evening hours end at midnight.', 'Final examinations begin next week.']),
      fixedListeningChoose(8, 'm2', 2, 'woman', 'Could you proofread this paragraph before lunch?', ['The paragraph is on the second page.', 'Yes, send it to me now.', 'Lunch is served downstairs.', 'I read the article yesterday.']),
      fixedListeningChoose(8, 'm2', 3, 'man', 'Where can I pick up my new identification card?', ['The photograph is too dark.', 'Your old card expires soon.', 'At the service desk in Central Hall.', 'The card fits in this wallet.']),
      fixedListeningChoose(8, 'm2', 4, 'woman', 'I may have deleted the wrong spreadsheet.', ['Check the recovery folder before creating another copy.', 'The spreadsheet has five columns.', 'I deleted several old messages.', 'The wrong answer was corrected.']),
      fixedListeningChoose(8, 'm2', 5, 'man', 'When does the campus shuttle stop running?', ['The shuttle stops beside the stadium.', 'I rode it after class.', 'The driver starts at noon.', 'The last one leaves at eleven thirty.']),
      fixedListeningChoose(8, 'm2', 6, 'woman', 'Did Marcus agree to lead the discussion?', ['The discussion concerns urban planning.', 'Marcus leads a hiking club.', 'Yes, but he asked me to prepare the slides.', 'We agreed on the meeting date.']),
      fixedListeningChoose(8, 'm2', 7, 'man', 'This soup tastes much spicier than yesterday’s.', ['The soup is served with bread.', 'Perhaps the cook changed the recipe.', 'Yesterday’s meal was inexpensive.', 'Spices are stored in that cabinet.']),
      fixedListeningChoose(8, 'm2', 8, 'woman', 'Should I bring my laptop to the workshop?', ['Yes, you will need it for the first exercise.', 'The workshop is in Room 210.', 'My laptop battery is charged.', 'The first speaker arrives tomorrow.']),
    ],
    conversation: fixedListeningStimulus(
      8, 'm2-conversation', 'conversation', 'Restoring access to a research database', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I can open the library catalog, but the research database says my access has expired.

LIBRARIAN: Your student record is active. Are you connecting from off campus?

STUDENT: Yes, and I used an old bookmark.

LIBRARIAN: That explains it. The database changed its address last month. Begin at the library website and sign in through the new link. Older articles are still available there; only the address changed. I will email the troubleshooting page in case your browser saved the previous login.`,
      ['student', 'announcer'], [
        item(8, 'm2-cv1', 'Why can the student not enter the database?', ['The student record has expired.', 'The student used an outdated database address.', 'The library removed all older articles.', 'The campus network is unavailable.']),
        item(8, 'm2-cv2', 'What does the librarian say about older articles?', ['They require a separate payment.', 'They can be read only on campus.', 'They remain available through the new link.', 'They were moved to the library catalog.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      8, 'm2-announcement', 'announcement', 'Theater ticket pickup', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Tickets reserved for Friday’s student theater performance can be collected at the arts center box office beginning today. The box office is open from noon until six. Bring the confirmation message, either printed or on your phone. Uncollected reservations will be released at four p.m. on Friday, two hours before the performance. Seats are assigned, so arriving early will not change your location.`,
      ['announcer'], [
        item(8, 'm2-an1', 'When will uncollected reservations be released?', ['At noon today', 'After the performance', 'When the box office closes today', 'At four p.m. on Friday']),
        item(8, 'm2-an2', 'What must students show to collect tickets?', ['Their confirmation message', 'A printed campus map', 'Proof that they arrived early', 'A new seat selection']),
      ],
    ),
    academic: fixedListeningStimulus(
      8, 'm2-academic-talk', 'academic-talk', 'How Mangrove Forests Shape Coasts', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Mangroves are groups of trees and shrubs adapted to the intertidal zones of many tropical and subtropical coasts. These environments challenge ordinary land plants. Salt levels vary, tides cover the soil, and waterlogged mud contains little oxygen. Different mangrove species have different adaptations, including structures that exclude or remove salt and roots that obtain support or exchange gases near the surface.

The visible roots also change the physical coast. They slow moving water and trap suspended sediment. As sediment accumulates, it can help stabilize the shoreline. During waves and storms, mangrove vegetation can reduce some wave energy, although no forest can prevent every loss under every condition. The protection depends on factors such as forest width, structure, storm strength, and local geography.

Mangrove habitats support fish, crabs, birds, and other organisms, and many young fish use the complex root area as shelter. Mangrove soils can also store large amounts of carbon because waterlogged conditions slow decomposition. When a forest is cleared or its soil is disturbed, some stored carbon may return to the atmosphere. Thus mangroves connect biology, coastal processes, and climate, but their services should be described with evidence and local conditions rather than as universal guarantees.`,
      ['professor'], [
        item(8, 'm2-at1', 'What environmental challenge do mangroves face?', ['Constantly dry soil with abundant oxygen', 'The complete absence of salt', 'Waterlogged, low-oxygen soil in a tidal zone', 'Temperatures below freezing throughout the year']),
        item(8, 'm2-at2', 'How can mangrove roots affect a shoreline?', ['They slow water and trap suspended sediment.', 'They remove every wave during a storm.', 'They prevent sediment from accumulating.', 'They increase the oxygen in all coastal water.']),
        item(8, 'm2-at3', 'Why does the professor mention young fish?', ['To show that all fish eat mangrove leaves', 'To compare tropical and polar coasts', 'To explain why roots release carbon', 'To illustrate the habitat provided by complex roots']),
        item(8, 'm2-at4', 'What qualification does the professor make about coastal protection?', ['It occurs only when mangroves are cleared.', 'Its effectiveness depends on forest and local conditions.', 'It guarantees that no shoreline will erode.', 'It is unrelated to storm strength.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET9 = fixedListeningSet(9, {
  module1ChooseAdditions: [
    fixedListeningChoose(9, 'm1', 6, 'man', 'Have you decided which seminar to attend?', ['The seminar begins after lunch.', 'I attended one last semester.', 'Yes, the one on digital archives.', 'The decision was difficult.']),
    fixedListeningChoose(9, 'm1', 7, 'woman', 'Why is the copy machine making that sound?', ['The copies are in the tray.', 'A sheet of paper may be stuck inside.', 'The machine is beside the window.', 'That sound came from the hallway.']),
    fixedListeningChoose(9, 'm1', 8, 'man', 'Could I return these headphones tomorrow?', ['The headphones have soft cushions.', 'Tomorrow’s forecast is sunny.', 'I returned the microphone earlier.', 'Yes, but please bring them before noon.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(9, 'm2', 1, 'woman', 'Where will the tutoring session take place?', ['In the study room beside the language lab.', 'The tutor sent a reminder.', 'The session lasts one hour.', 'The language lab opens at nine.']),
      fixedListeningChoose(9, 'm2', 2, 'man', 'I cannot believe the concert tickets sold out already.', ['The concert features a string quartet.', 'The tickets cost less for students.', 'They may release a few more seats tomorrow.', 'I already heard that recording.']),
      fixedListeningChoose(9, 'm2', 3, 'woman', 'Did the professor explain why the quiz was delayed?', ['The quiz covers three chapters.', 'The professor arrived early.', 'I explained the problem after class.', 'Yes, the online system was unavailable.']),
      fixedListeningChoose(9, 'm2', 4, 'man', 'Would it be possible to extend the equipment loan?', ['The equipment case is heavy.', 'Ask the media desk before the current loan expires.', 'The extension cable is missing.', 'I borrowed a camera last term.']),
      fixedListeningChoose(9, 'm2', 5, 'woman', 'How did you get to the airport so early?', ['I took the first express bus.', 'The airport has three terminals.', 'My flight departed on time.', 'It was still dark outside.']),
      fixedListeningChoose(9, 'm2', 6, 'man', 'The new chairs are less comfortable than the old ones.', ['The old chairs were moved upstairs.', 'The room seats fifty people.', 'These chairs arrived on Monday.', 'I agree; the backs feel too straight.']),
      fixedListeningChoose(9, 'm2', 7, 'woman', 'Who is responsible for updating the event calendar?', ['The event was well attended.', 'The calendar hangs by the door.', 'The communications assistant handles it.', 'I updated my computer yesterday.']),
      fixedListeningChoose(9, 'm2', 8, 'man', 'Should we order food before the meeting starts?', ['The meeting starts at five.', 'Yes, because delivery takes nearly an hour.', 'I ordered the same meal last week.', 'The food was served in the lobby.']),
    ],
    conversation: fixedListeningStimulus(
      9, 'm2-conversation', 'conversation', 'Comparing housing options', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I was offered a place in the residence hall, but I am also considering an apartment with two classmates.

ADVISER: The residence contract includes utilities and is close to your morning classes. The apartment rent looks lower, but ask whether heating and internet are additional.

STUDENT: My classmates want an answer tonight.

ADVISER: Do not sign until you read the full lease and confirm how long it lasts. You can ask the housing office to review the terms tomorrow. The residence offer remains open until Friday.`,
      ['student', 'announcer'], [
        item(9, 'm2-cv1', 'What advantage of the residence hall does the adviser mention?', ['Its rooms are larger than the apartment.', 'It permits every type of pet.', 'It has no written contract.', 'Utilities are included.']),
        item(9, 'm2-cv2', 'What does the adviser recommend as a next step?', ['Ask the housing office to review the lease.', 'Reject the residence offer tonight.', 'Sign the apartment lease immediately.', 'Request different morning classes.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      9, 'm2-announcement', 'announcement', 'Garden volunteer morning', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Saturday’s community garden volunteer session will begin at eight thirty, thirty minutes earlier than originally announced, because the afternoon is expected to be hot. Meet at the tool shed and wear closed shoes. Gloves and drinking water will be provided. If heavy rain forces a cancellation, registered volunteers will receive a text message by seven a.m.; otherwise, assume the session will proceed.`,
      ['announcer'], [
        item(9, 'm2-an1', 'Why will the volunteer session begin earlier?', ['The tool shed closes at noon.', 'Hot weather is expected later in the day.', 'Heavy rain has already begun.', 'Volunteers requested a longer session.']),
        item(9, 'm2-an2', 'How will volunteers learn that the session is cancelled?', ['From a sign at the tool shed', 'Through an announcement after eight', 'They will receive a text message.', 'They must call the garden office.']),
      ],
    ),
    academic: fixedListeningStimulus(
      9, 'm2-academic-talk', 'academic-talk', 'Radiocarbon Dating and Context', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Radiocarbon dating helps researchers estimate the age of material that was once alive, such as wood, seeds, bone, or charcoal. While an organism lives, carbon moves between it and the environment. After death, that exchange stops, and the radioactive isotope carbon-14 decays at a predictable rate. Measuring how much remains provides an estimate of when the organism died.

The method does not directly date every object at a site. A stone tool contains no carbon from a once-living organism, so a laboratory cannot radiocarbon-date the stone itself. Researchers may instead date charcoal or another organic material found in a secure association with the tool. That association must be evaluated carefully. A root, burrowing animal, or later human activity can move material between layers and create a misleading relationship.

Radiocarbon ages also require calibration because the concentration of carbon-14 in the atmosphere has varied over time. Researchers compare measurements with independently dated records, including long tree-ring sequences, to convert a laboratory result into probable calendar-age ranges. The result is therefore not usually one perfectly certain year. Radiocarbon evidence is strongest when it agrees with stratigraphy, artifacts, and other dating methods. Context and uncertainty are part of the conclusion, not flaws to hide.`,
      ['professor'], [
        item(9, 'm2-at1', 'What happens to carbon-14 after an organism dies?', ['It decays at a predictable rate after carbon exchange stops.', 'It immediately changes into a stone tool.', 'It becomes more concentrated every year.', 'It moves continuously from the atmosphere into the organism.']),
        item(9, 'm2-at2', 'Why does the professor mention a stone tool?', ['To show that stone always contains charcoal', 'To prove that every artifact has the same age', 'To explain why tree rings are unnecessary', 'To illustrate material that cannot itself be radiocarbon-dated']),
        item(9, 'm2-at3', 'Why must researchers evaluate the context of an organic sample?', ['All samples come from living roots.', 'Material may have moved between archaeological layers.', 'Laboratories cannot measure carbon in charcoal.', 'Context determines the rate of radioactive decay.']),
        item(9, 'm2-at4', 'What does calibration help researchers do?', ['Remove every source of uncertainty', 'Determine the material of a stone tool', 'Relate a radiocarbon result to calendar-age ranges', 'Replace stratigraphy with one exact year']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET10 = fixedListeningSet(10, {
  module1ChooseAdditions: [
    fixedListeningChoose(10, 'm1', 6, 'woman', 'Did the maintenance team repair the lights?', ['The lights use less electricity.', 'Yes, the hallway is bright again.', 'The team arrived in a van.', 'I repaired my bicycle yesterday.']),
    fixedListeningChoose(10, 'm1', 7, 'man', 'Could you tell me where the nearest pharmacy is?', ['There is one across from the train station.', 'The pharmacy closes at eight.', 'I bought this medicine yesterday.', 'The station is three stops away.']),
    fixedListeningChoose(10, 'm1', 8, 'woman', 'I am not sure this table will fit through the doorway.', ['The table is made of oak.', 'The doorway was recently painted.', 'Let us measure both before we move it.', 'It fits six people comfortably.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(10, 'm2', 1, 'man', 'When are the revised schedules being posted?', ['The schedule lists every classroom.', 'I revised my paper last night.', 'They are posted beside the office.', 'The coordinator said tomorrow morning.']),
      fixedListeningChoose(10, 'm2', 2, 'woman', 'I wonder why the laboratory is unusually warm.', ['The experiment measures temperature.', 'The windows face south.', 'The ventilation system may be off.', 'Warm water is stored in that tank.']),
      fixedListeningChoose(10, 'm2', 3, 'man', 'Would you like me to carry one of those boxes?', ['Yes, this one is heavier than it looks.', 'The boxes contain new books.', 'I carried them from the lobby.', 'One box is still in the car.']),
      fixedListeningChoose(10, 'm2', 4, 'woman', 'Where can I download the workshop materials?', ['The workshop begins after lunch.', 'From the link in your registration email.', 'The materials include several charts.', 'I downloaded the application yesterday.']),
      fixedListeningChoose(10, 'm2', 5, 'man', 'I thought the museum was open on Mondays.', ['The museum displays ancient pottery.', 'Monday is usually my free day.', 'I opened the window upstairs.', 'It is, except during the winter months.']),
      fixedListeningChoose(10, 'm2', 6, 'woman', 'Why did the committee reject the first proposal?', ['The committee meets every month.', 'It did not include a complete budget.', 'The first meeting was brief.', 'The proposal describes a public garden.']),
      fixedListeningChoose(10, 'm2', 7, 'man', 'Could we take a short break before the next section?', ['The next section has two examples.', 'We took notes during the lecture.', 'Certainly. Let us continue in ten minutes.', 'The break room is downstairs.']),
      fixedListeningChoose(10, 'm2', 8, 'woman', 'How was the traffic on your way here?', ['Much lighter than I expected.', 'The traffic signal is new.', 'I came through the east entrance.', 'The highway has four lanes.']),
    ],
    conversation: fixedListeningStimulus(
      10, 'm2-conversation', 'conversation', 'Exploring an environmental science major', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I am considering environmental science, but I have enjoyed both biology and public policy. I am not sure which side of the major matters more.

ADVISER: The program intentionally combines them. You study natural systems and also how communities make environmental decisions.

STUDENT: I have not taken calculus yet. Is that a problem?

ADVISER: Not for the introductory course. Enroll in Environmental Systems first, and take the required mathematics course alongside it. The department’s open house next Tuesday will let you meet students working in several specializations.`,
      ['student', 'announcer'], [
        item(10, 'm2-cv1', 'What attracts the student to environmental science?', ['The major requires no mathematics.', 'The open house replaces an introductory course.', 'It includes both biology and public policy.', 'Every student follows one specialization.']),
        item(10, 'm2-cv2', 'What does the adviser recommend that the student take first?', ['A specialized research seminar', 'Only the required calculus course', 'A course in public speaking', 'Environmental Systems']),
      ],
    ),
    announcement: fixedListeningStimulus(
      10, 'm2-announcement', 'announcement', 'Temporary dining hall schedule', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The Lakeside Dining Hall will open one hour late, at eight a.m., on Thursday while the kitchen water system is inspected. The Riverside Café will begin serving breakfast at seven and will accept all campus meal plans. Lakeside will resume its normal schedule on Friday. Thursday’s lunch and dinner hours are not affected, and no other dining locations will change their schedules.`,
      ['announcer'], [
        item(10, 'm2-an1', 'Why will Lakeside Dining Hall open late?', ['Its kitchen water system will be inspected.', 'Breakfast service has been cancelled permanently.', 'The meal plan system is unavailable.', 'The Riverside Café is being repaired.']),
        item(10, 'm2-an2', 'What will the Riverside Café do on Thursday?', ['Close during breakfast', 'Begin serving breakfast at seven', 'Change its lunch schedule', 'Refuse campus meal plans']),
      ],
    ),
    academic: fixedListeningStimulus(
      10, 'm2-academic-talk', 'academic-talk', 'Reading Doppler Weather Radar', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Weather radar sends energy pulses and detects what atmospheric targets scatter back. Reflectivity displays that returned energy. Stronger returns often indicate more or larger precipitation particles, helping meteorologists locate precipitation and estimate intensity. But insects, birds, buildings, and other non-weather targets also produce returns. A bright color is not automatically heavy rain.

Doppler radar adds information from changes in the frequency of the returned signal. From that change, a radar estimates radial velocity—the component of motion directly toward or away from the instrument. It does not measure the complete motion of the air in every direction. Near a rotating storm, adjacent regions moving toward and away from the radar can form an important velocity pattern, but meteorologists must consider the radar’s viewing angle and other evidence.

Distance and Earth’s curvature also matter. The beam rises relative to the ground as it travels farther, so distant observations may sample a storm well above the surface. Terrain can block the beam, and intense precipitation can weaken signals from features behind it. Forecasters therefore examine multiple scans, nearby radars, satellite images, surface observations, and reports. Radar is powerful because it updates rapidly and reveals structure, not because one image answers every question.`,
      ['professor'], [
        item(10, 'm2-at1', 'What does radar reflectivity represent?', ['The exact surface wind direction', 'Only the temperature inside a cloud', 'The complete three-dimensional motion of air', 'The strength of energy returned from atmospheric targets']),
        item(10, 'm2-at2', 'What does Doppler radial velocity estimate?', ['The total amount of rain on the ground', 'The age of a storm system', 'Motion toward or away from the radar', 'The height of every precipitation particle']),
        item(10, 'm2-at3', 'Why can distant radar observations miss conditions near the ground?', ['The beam samples higher altitudes as distance increases.', 'All distant storms stop producing precipitation.', 'Satellites block the radar signal.', 'Radial velocity becomes reflectivity.']),
        item(10, 'm2-at4', 'What is the professor’s main point about using radar?', ['One bright image is enough for a complete forecast.', 'Radar is strongest when interpreted with its limits and other evidence.', 'Non-weather targets never appear on radar.', 'Every radar directly measures air motion in all directions.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SETS_6_TO_10 = [
  TOEFL_FIXED_LISTENING_SET6,
  TOEFL_FIXED_LISTENING_SET7,
  TOEFL_FIXED_LISTENING_SET8,
  TOEFL_FIXED_LISTENING_SET9,
  TOEFL_FIXED_LISTENING_SET10,
] as const;
