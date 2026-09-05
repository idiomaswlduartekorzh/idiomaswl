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
    fixedListeningChoose(6, 'm1', 6, 'woman', 'Has the financial aid office answered your email?', ["The administrative office is located beside the main library.","Not yet, so I'll call them later this afternoon.","The email message included two large file attachments.","Careful financial planning often requires considerable time."]),
    fixedListeningChoose(6, 'm1', 7, 'man', 'Could you show me how to use this scanner?', ["The scanner is located on the building's second floor.","I scanned the assigned article yesterday after class.","The operating instructions are posted beside the printer.","Certainly; place the page face down on the glass first."]),
    fixedListeningChoose(6, 'm1', 8, 'woman', 'Why was the soccer practice cancelled?', ["The field is too wet after last night's rain.","Practice normally finishes at six in the evening.","The team won its most recent game last weekend.","The players normally use the field on the east side."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(6, 'm2', 1, 'man', 'Do you know when the replacement component is due?', ["The machine requires a small replacement part from the manufacturer.","The part was ordered from a supplier in another city.","According to the message, it should arrive sometime on Thursday.","The delivery entrance is located behind the main building."]),
      fixedListeningChoose(6, 'm2', 2, 'woman', 'I am worried that my introduction is too long.', ["Try removing the example that you explain again later.","The introduction appears before the first main section.","Your paper uses a clear and easily readable typeface.","The completed assignment must be submitted next week."]),
      fixedListeningChoose(6, 'm2', 3, 'man', 'Do we need tickets for tomorrow’s lecture?', ["The public lecture examines several examples of modern architecture.","No, but seats will be assigned on a first-come basis.","Tomorrow is the final day of classes this term.","I left the printed tickets on top of my desk."]),
      fixedListeningChoose(6, 'm2', 4, 'woman', 'Where did you find that internship listing?', ["The summer internship program begins during the month of June.","I found my missing keys beside the main entrance.","The online listing describes three available internship positions.","On the career center's official website under internships."]),
      fixedListeningChoose(6, 'm2', 5, 'man', 'The cafeteria line is much shorter today.', ["The cafeteria recently opened another food-serving station.","I brought my lunch from home in a small container.","Perhaps everyone arrived at the cafeteria earlier than we did.","The shortest walking route crosses the main courtyard."]),
      fixedListeningChoose(6, 'm2', 6, 'woman', 'Would you prefer to meet in person or online?', ["The scheduled meeting continued for approximately forty minutes.","Meeting online would be easier for me this week.","I met the new program coordinator yesterday afternoon.","The online application form contains five required questions."]),
      fixedListeningChoose(6, 'm2', 7, 'man', 'I think I left my umbrella in your office.', ["I'll look for it when I return to that office.","The current weather forecast predicts a period of heavy rain.","My office has a large window facing the courtyard.","The missing umbrella is dark green with a wooden handle."]),
      fixedListeningChoose(6, 'm2', 8, 'woman', 'How was the new student orientation?', ["The participating students represented several different countries.","The event took place inside the university's main auditorium.","The orientation schedule contained four separate information sessions.","Useful, especially the tour covering safety around campus."]),
    ],
    conversation: fixedListeningStimulus(
      6, 'm2-conversation', 'conversation', 'Revising a research essay', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My research essay has plenty of sources, but the paragraphs still feel disconnected.

INSTRUCTOR: Your evidence is relevant. The difficulty is that each paragraph summarizes a source instead of advancing one claim. Start by writing a sentence that states the relationship you see among the sources.

STUDENT: Then I should organize the evidence around that relationship?

INSTRUCTOR: Exactly. Use that sentence as a working thesis, and move each example beside the point it supports. Bring the new outline on Thursday, and we can check the sequence together.`,
      ['student', 'professor'], [
        item(6, 'm2-cv1', 'What problem does the student have with the essay?', ["The draft includes too few research sources to support its claims.","The evidence presented in the draft is unrelated to its topic.","The paragraphs fail to develop one connected argument.","The student submitted the draft after the official deadline."]),
        item(6, 'm2-cv2', 'What will the student bring on Thursday?', ["A list identifying all research sources that were not used","A revised outline showing the essay's connected argument","A completed final draft ready to be submitted for grading","A formal request asking for permission to change research topics"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      6, 'm2-announcement', 'announcement', 'Science building entrance closure', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The north entrance of the science building will be closed from Tuesday through Friday while workers replace the exterior steps. During that period, use the accessible east entrance beside the greenhouse. Deliveries must go to the loading area on Pine Street. All laboratories and classrooms will follow their normal schedules, and emergency exits will remain available.`,
      ['announcer'], [
        item(6, 'm2-an1', 'Why will the north entrance be closed?', ["Workers will replace the damaged exterior entrance steps.","The old campus greenhouse will be permanently removed.","Several laboratory schedules will change during the repairs.","A delivery truck is temporarily blocking nearby Pine Street."]),
        item(6, 'm2-an2', 'Where should building users enter during the closure?', ["Through the loading area behind the main laboratory building","At the emergency exit on the building's west side","Beside the northern laboratory near the greenhouse path","Through the eastern entrance located beside the greenhouse"]),
      ],
    ),
    academic: fixedListeningStimulus(
      6, 'm2-academic-talk', 'academic-talk', 'Atmospheric Rivers', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: An atmospheric river is a long, relatively narrow region of the atmosphere that transports water vapor. The name is a metaphor: it is not a river of liquid water in the sky. Winds move the vapor, often from warm ocean regions toward a continent. When the air rises over coastal terrain, it cools, water condenses, and substantial rain or snow can fall.

Atmospheric rivers are not automatically disasters. A moderate event may replenish reservoirs and build mountain snowpack that supplies water in later seasons. Problems arise when an especially strong system arrives, when several systems occur close together, or when the rain falls on soil that is already saturated. Then flooding, landslides, and rapid runoff become more likely.

Forecasters combine satellite observations, radar, weather balloons, aircraft measurements, and numerical models. Satellites help reveal the broad corridor of moisture over the ocean, while instruments closer to land provide details about winds and precipitation. Forecast uncertainty remains important because a small shift in the path can change which watershed receives the heaviest precipitation. So an atmospheric river is best understood as a transport mechanism whose effects depend on its strength, duration, path, and the conditions on the ground.`,
      ['professor'], [
        item(6, 'm2-at1', 'What is an atmospheric river?', ["A permanent channel carrying liquid water above the land surface","A narrow atmospheric region that transports concentrated water vapor","An ocean current that moves exclusively beneath mountain snow","A storm system that inevitably produces a major natural disaster"]),
        item(6, 'm2-at2', 'What benefit can a moderate atmospheric river provide?', ["It permanently prevents every later drought in the region.","It removes stored moisture from mountain soils and vegetation.","It can refill reservoirs and increase the mountain snowpack.","It guarantees that nearby rivers will never experience flooding."]),
        item(6, 'm2-at3', 'When does flooding become more likely?', ["When the weather system travels only across dry ocean air","When weather satellites cannot observe the nearby coastline","When all incoming precipitation remains suspended as water vapor","When intense precipitation falls on ground that is already saturated"]),
        item(6, 'm2-at4', 'Why does the professor mention a small shift in the system’s path?', ["To explain why the watershed most affected can change","To demonstrate that atmospheric rivers never travel across land","To prove that radar can replace all other weather observations","To define the process by which mountain snow becomes vapor"]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET7 = fixedListeningSet(7, {
  module1ChooseAdditions: [
    fixedListeningChoose(7, 'm1', 6, 'man', 'Do you happen to know who left this notebook?', ["The notebook contains lined paper for writing class notes.","I left the classroom shortly after noon yesterday.","It was underneath the table at the front of the room.","It may be Priya's; I saw her using it."]),
    fixedListeningChoose(7, 'm1', 7, 'woman', 'Could we postpone the rehearsal until Wednesday?', ["Wednesday works for me if everyone else agrees.","The rehearsal room contains a large upright piano.","We performed that particular piece during last month's concert.","The updated rehearsal schedule is posted outside the room."]),
    fixedListeningChoose(7, 'm1', 8, 'man', 'I was surprised the documentary ended so abruptly.', ["The ending credits named many researchers who supported the film.","The documentary was shown at a theater in the city center.","So was I; I expected one additional interview.","The recorded interview began shortly after the lunch break."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(7, 'm2', 1, 'woman', 'Where should visitors park during the construction?', ["The construction work is scheduled to begin next Monday.","In the temporary parking lot located behind the gym.","All visitors must sign in at the main reception desk.","The gymnasium has entrances on two different sides."]),
      fixedListeningChoose(7, 'm2', 2, 'man', 'I did not realize the application required two references.', ["The application form is available through the official website.","I cited that particular article in my final essay.","Two people attended the information session held yesterday.","There is still enough time to ask your supervisors."]),
      fixedListeningChoose(7, 'm2', 3, 'woman', 'Would you check whether the window is locked?', ["Sure, I'll check it carefully before we leave.","The large window overlooks the garden behind the building.","I locked my bicycle outside near the main entrance.","We left the meeting before the final discussion ended."]),
      fixedListeningChoose(7, 'm2', 4, 'man', 'Why are you taking the later bus?', ["The nearest bus stop is located across the street.","I normally take that bus about twice each week.","I need to complete a laboratory report first.","The later route includes fewer stops before the campus."]),
      fixedListeningChoose(7, 'm2', 5, 'woman', 'The bookstore says my order is finally ready.', ["The campus bookstore closes at seven this evening.","That's good; you have been waiting throughout the week.","The order number appears near the top of your receipt.","I have already read the first assigned chapter."]),
      fixedListeningChoose(7, 'm2', 6, 'man', 'How long should we leave between the two trains?', ["Allow at least twenty minutes in case the first train is late.","The transfer student joined our class near the start of term.","The complete train journey costs approximately twenty dollars.","I allowed them to travel using my extra ticket."]),
      fixedListeningChoose(7, 'm2', 7, 'woman', 'I cannot hear the speaker from the back row.', ["The guest speaker conducts research in the field of linguistics.","The front row contains ten chairs reserved for invited guests.","There are two empty seats near the front of the room.","I heard the announcement on campus earlier this morning."]),
      fixedListeningChoose(7, 'm2', 8, 'man', 'Did you remember to reserve the conference room?', ["The academic conference continues for a total of two days.","The meeting room contains a long table near the window.","Yes, I received the confirmation message this morning.","I clearly remember our first meeting in that building."]),
    ],
    conversation: fixedListeningStimulus(
      7, 'm2-conversation', 'conversation', 'Using the campus bicycle program', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I joined the campus bicycle program, but the application will not let me unlock a bicycle.

STAFF MEMBER: Your account is active. The first time you ride, you must scan your identification card at a station before using the phone application.

STUDENT: I see. Is the first half hour still free?

STAFF MEMBER: Yes. After thirty minutes, the regular fee begins. During busy periods, return the bicycle to any station with an open space rather than leaving it beside a full station.`,
      ['student', 'announcer'], [
        item(7, 'm2-cv1', 'Why can the student not unlock a bicycle?', ["The identification card has not been activated at a bicycle station.","The student's bicycle-sharing account has already been permanently cancelled.","Every bicycle station near the residence halls is currently full.","The mobile application requires the student to make another payment."]),
        item(7, 'm2-cv2', 'What should a rider do if a station is full?', ["Leave the bicycle beside the station even though it is full","Keep the bicycle overnight and return it the following day","Telephone staff and ask them to remove a different bicycle","Return the bicycle to another nearby station that has space"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      7, 'm2-announcement', 'announcement', 'Language exchange registration', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Registration for the spring language exchange opens tomorrow at nine a.m. Participants meet with a partner for one hour each week and divide the time between the two languages they are practicing. Complete the online interest form by Friday. Matches will be announced next Wednesday. The first meeting is an orientation for all participants, so partners should not arrange a separate meeting before then.`,
      ['announcer'], [
        item(7, 'm2-an1', 'What must applicants complete by Friday?', ["A recorded sample demonstrating the student's spoken language","A scheduled meeting with the student's assigned conversation partner","The completed online form indicating interest in the program","A payment submitted at the campus language-learning center"]),
        item(7, 'm2-an2', 'What should matched partners do first?', ["Practice only one language during the entire exchange program","Attend the group orientation before meeting an assigned partner","Arrange an individual meeting before the Wednesday registration deadline","Select a different partner from the published participant list"]),
      ],
    ),
    academic: fixedListeningStimulus(
      7, 'm2-academic-talk', 'academic-talk', 'Observing Phytoplankton from Space', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Phytoplankton are microscopic organisms that use photosynthesis and form the base of many aquatic food webs. Individual cells are far too small for a satellite camera to resolve. Yet large populations affect ocean color because chlorophyll and other pigments absorb and reflect particular wavelengths of light. Instruments in orbit measure that light, and scientists use the measurements to estimate surface chlorophyll and phytoplankton abundance.

The satellite view has a major advantage: it repeatedly covers broad ocean regions that ships cannot sample everywhere at once. Researchers can follow the location and timing of large blooms and compare seasonal patterns across years. Ocean color is an indirect measurement, however. Sediment, dissolved material, clouds, and the atmosphere can also affect the detected signal. A satellite generally observes the sunlit surface rather than the entire water column.

For those reasons, scientists still collect water from ships and fixed stations. Laboratory analysis can identify organisms more precisely and helps test how well a satellite estimate matches local conditions. New hyperspectral instruments measure many more wavelength bands than earlier sensors and may distinguish some communities more effectively. They do not eliminate field sampling. The strongest picture comes from combining the broad, repeated coverage of satellites with detailed measurements taken in the water.`,
      ['professor'], [
        item(7, 'm2-at1', 'Why can satellites help scientists study phytoplankton?', ["They photograph every individual cell directly from orbit.","They force chlorophyll molecules to rise toward the ocean surface.","They collect physical water samples from regions beneath clouds.","They detect light changes associated with pigments in ocean water."]),
        item(7, 'm2-at2', 'What is one advantage of satellite observations?', ["They identify every detected organism down to its exact species.","They repeatedly observe very large regions of the world's oceans.","They measure physical conditions throughout the entire water column.","They produce observations that are unaffected by atmospheric conditions."]),
        item(7, 'm2-at3', 'Why do scientists collect water samples?', ["To identify organisms and verify estimates made from satellite data","To replace all repeated observations collected from instruments in orbit","To remove dissolved organic material from samples of ocean water","To make every phytoplankton bloom visible through thick cloud cover"]),
        item(7, 'm2-at4', 'What does the professor conclude?', ["Hyperspectral instruments make all field observations unnecessary.","Only research ships can reveal broad seasonal patterns in oceans.","Satellite and field observations together provide the strongest picture.","Ocean-color sensors measure phytoplankton directly at every ocean depth."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET8 = fixedListeningSet(8, {
  module1ChooseAdditions: [
    fixedListeningChoose(8, 'm1', 6, 'woman', 'How did your appointment with the adviser go?', ["She helped me choose courses for next term.","We met in her office.","My adviser teaches biology.","Next term begins in the first week of January."]),
    fixedListeningChoose(8, 'm1', 7, 'man', 'I thought the package included a power cable.', ["The package arrived at my house before noon.","The cable measures about two meters in length.","It should have; ask the seller for the cable.","I included the receipt inside the original packaging."]),
    fixedListeningChoose(8, 'm1', 8, 'woman', 'Would you mind closing the door on your way out?', ["The exit is at the end of the hall.","Of course. I will close it behind me.","The old door was replaced during last year's renovation.","I am leaving after the meeting has finished."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(8, 'm2', 1, 'man', 'Why is the library so crowded this evening?', ["The library building has four floors in total.","The crowd came in through the western entrance.","The library's evening hours extend until twelve tonight.","Final examinations are scheduled to begin next week."]),
      fixedListeningChoose(8, 'm2', 2, 'woman', 'Could you proofread this paragraph before lunch?', ["The paragraph is on page two.","Yes, send the paragraph to me now.","Lunch is served downstairs.","I finished reading that article yesterday afternoon."]),
      fixedListeningChoose(8, 'm2', 3, 'man', 'Where can I pick up my new identification card?', ["The photograph is too dark.","Your old card expires soon.","At the service desk in Central Hall.","The card fits neatly inside this small wallet."]),
      fixedListeningChoose(8, 'm2', 4, 'woman', 'I may have deleted the wrong spreadsheet.', ["Check the recovery folder before making another copy.","The spreadsheet contains five columns of numerical data.","I deleted several old messages from my inbox.","The incorrect answer was corrected before the final submission."]),
      fixedListeningChoose(8, 'm2', 5, 'man', 'When does the campus shuttle stop running?', ["It stops beside the stadium.","I rode it after class.","The driver begins the afternoon shift at noon.","The last one leaves at eleven thirty."]),
      fixedListeningChoose(8, 'm2', 6, 'woman', 'Did Marcus agree to lead the discussion?', ["The discussion is about urban planning in growing cities.","Marcus leads a local hiking club on the weekends.","Yes, but he asked me to prepare the slides.","We agreed on a date for the next meeting."]),
      fixedListeningChoose(8, 'm2', 7, 'man', 'This soup tastes much spicier than yesterday’s.', ["The soup comes with bread.","Perhaps the cook changed the recipe.","Yesterday’s meal was inexpensive.","The spices are kept in the cabinet over there."]),
      fixedListeningChoose(8, 'm2', 8, 'woman', 'Should I bring my laptop to the workshop?', ["Yes, you need it for the first exercise.","The workshop is in Room 210.","My laptop battery is charged.","The first speaker is due to arrive tomorrow morning."]),
    ],
    conversation: fixedListeningStimulus(
      8, 'm2-conversation', 'conversation', 'Restoring access to a research database', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I can open the library catalog, but the research database says my access has expired.

LIBRARIAN: Your student record is active. Are you connecting from off campus?

STUDENT: Yes, and I used an old bookmark.

LIBRARIAN: That explains it. The database changed its address last month. Begin at the library website and sign in through the new link. Older articles are still available there; only the address changed. I will email the troubleshooting page in case your browser saved the previous login.`,
      ['student', 'announcer'], [
        item(8, 'm2-cv1', 'Why can the student not enter the database?', ["The student record has expired.","The student followed an outdated database address.","The library has removed its collection of older articles.","The campus network is down."]),
        item(8, 'm2-cv2', 'What does the librarian say about older articles?', ["They can be accessed after paying an additional fee.","They are restricted to readers using computers on campus.","They remain accessible through the new database link.","They have been transferred into the library's main catalog."]),
      ],
    ),
    announcement: fixedListeningStimulus(
      8, 'm2-announcement', 'announcement', 'Theater ticket pickup', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Tickets reserved for Friday’s student theater performance can be collected at the arts center box office beginning today. The box office is open from noon until six. Bring the confirmation message, either printed or on your phone. Uncollected reservations will be released at four p.m. on Friday, two hours before the performance. Seats are assigned, so arriving early will not change your location.`,
      ['announcer'], [
        item(8, 'm2-an1', 'When will uncollected reservations be released?', ["At noon today","After the performance on Friday","At the box office's closing time this evening","At four in the afternoon on Friday"]),
        item(8, 'm2-an2', 'What must students show to collect tickets?', ["The confirmation message for their reservation","A printed map of the university campus","Evidence of arriving before the other students","A new selection of seats for the performance"]),
      ],
    ),
    academic: fixedListeningStimulus(
      8, 'm2-academic-talk', 'academic-talk', 'How Mangrove Forests Shape Coasts', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Mangroves are groups of trees and shrubs adapted to the intertidal zones of many tropical and subtropical coasts. These environments challenge ordinary land plants. Salt levels vary, tides cover the soil, and waterlogged mud contains little oxygen. Different mangrove species have different adaptations, including structures that exclude or remove salt and roots that obtain support or exchange gases near the surface.

The visible roots also change the physical coast. They slow moving water and trap suspended sediment. As sediment accumulates, it can help stabilize the shoreline. During waves and storms, mangrove vegetation can reduce some wave energy, although no forest can prevent every loss under every condition. The protection depends on factors such as forest width, structure, storm strength, and local geography.

Mangrove habitats support fish, crabs, birds, and other organisms, and many young fish use the complex root area as shelter. Mangrove soils can also store large amounts of carbon because waterlogged conditions slow decomposition. When a forest is cleared or its soil is disturbed, some stored carbon may return to the atmosphere. Thus mangroves connect biology, coastal processes, and climate, but their services should be described with evidence and local conditions rather than as universal guarantees.`,
      ['professor'], [
        item(8, 'm2-at1', 'What environmental challenge do mangroves face?', ["Dry soil that contains plenty of oxygen year-round","An environment where salt is entirely absent from the water","Waterlogged soil with little oxygen in a tidal zone","Temperatures that remain below freezing throughout the entire year"]),
        item(8, 'm2-at2', 'How can mangrove roots affect a shoreline?', ["They slow water and trap suspended sediment.","They eliminate all storm waves.","They prevent sediment from accumulating.","They raise oxygen levels throughout all of the coastal water."]),
        item(8, 'm2-at3', 'Why does the professor mention young fish?', ["To show that mangrove leaves provide food for every fish","To compare tropical and polar coasts","To explain carbon release from roots","To illustrate the habitat offered by the complex roots"]),
        item(8, 'm2-at4', 'What qualification does the professor make about coastal protection?', ["It requires clearing the mangrove forest.","Its effectiveness depends on the forest and local conditions.","It provides a guarantee that the shoreline will never erode.","It is unrelated to storm strength."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET9 = fixedListeningSet(9, {
  module1ChooseAdditions: [
    fixedListeningChoose(9, 'm1', 6, 'man', 'Have you decided which seminar to attend?', ["The seminar begins shortly after the lunch break.","I attended a similar seminar during last semester.","Yes, the seminar about digital archives.","The final decision was difficult for everyone involved."]),
    fixedListeningChoose(9, 'm1', 7, 'woman', 'Why is the copy machine making that sound?', ["The finished copies are waiting in the output tray.","A sheet of paper may be stuck inside.","The machine is located beside the classroom window.","That unusual sound came from the hallway outside."]),
    fixedListeningChoose(9, 'm1', 8, 'man', 'Could I return these headphones tomorrow?', ["The headphones have soft cushions around both earpieces.","Tomorrow's weather forecast calls for a sunny afternoon.","I returned the borrowed microphone earlier this morning.","Yes, but please return them before noon tomorrow."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(9, 'm2', 1, 'woman', 'Where will the tutoring session take place?', ["In the study room beside the language lab.","The tutor sent everyone a reminder this morning.","The tutoring session lasts approximately one hour.","The language lab opens at nine every morning."]),
      fixedListeningChoose(9, 'm2', 2, 'man', 'I cannot believe the concert tickets sold out already.', ["The concert program features a professional string quartet.","The remaining tickets cost less for enrolled students.","They may release a few more seats tomorrow.","I already listened to that same concert recording."]),
      fixedListeningChoose(9, 'm2', 3, 'woman', 'Did the professor explain why the quiz was delayed?', ["The delayed quiz covers three textbook chapters.","The professor arrived before the scheduled class time.","I explained the technical problem after class ended.","Yes, the online system was temporarily unavailable."]),
      fixedListeningChoose(9, 'm2', 4, 'man', 'Would it be possible to extend the equipment loan?', ["The protective equipment case is unusually heavy.","Ask the media desk before the loan expires.","The required extension cable is currently missing.","I borrowed a camera during the previous term."]),
      fixedListeningChoose(9, 'm2', 5, 'woman', 'How did you get to the airport so early?', ["I took the first express bus this morning.","The international airport contains three passenger terminals.","My scheduled flight departed exactly on time.","It was still dark outside when I left."]),
      fixedListeningChoose(9, 'm2', 6, 'man', 'The new chairs are less comfortable than the old ones.', ["The old chairs were moved to an upstairs room.","The renovated room can seat fifty people comfortably.","These replacement chairs arrived early on Monday.","I agree; the backs feel much too straight."]),
      fixedListeningChoose(9, 'm2', 7, 'woman', 'Who is responsible for updating the event calendar?', ["The recent event attracted a large audience.","The printed calendar hangs beside the entrance door.","The communications assistant handles the calendar updates.","I updated my computer software yesterday afternoon."]),
      fixedListeningChoose(9, 'm2', 8, 'man', 'Should we order food before the meeting starts?', ["The scheduled meeting begins at five this afternoon.","Yes, because delivery takes nearly an hour.","I ordered that same meal during last week's meeting.","The food was served in the main lobby."]),
    ],
    conversation: fixedListeningStimulus(
      9, 'm2-conversation', 'conversation', 'Comparing housing options', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I was offered a place in the residence hall, but I am also considering an apartment with two classmates.

ADVISER: The residence contract includes utilities and is close to your morning classes. The apartment rent looks lower, but ask whether heating and internet are additional.

STUDENT: My classmates want an answer tonight.

ADVISER: Do not sign until you read the full lease and confirm how long it lasts. You can ask the housing office to review the terms tomorrow. The residence offer remains open until Friday.`,
      ['student', 'announcer'], [
        item(9, 'm2-cv1', 'What advantage of the residence hall does the adviser mention?', ["Its rooms provide more space than the apartment.","It permits residents to keep every type of pet.","It does not require any written housing contract.","Its monthly cost includes the household utility bills."]),
        item(9, 'm2-cv2', 'What does the adviser recommend as a next step?', ["Ask the housing office to review the lease.","Reject the residence offer before the end of tonight.","Sign the apartment lease as soon as possible.","Request a different schedule for the morning classes."]),
      ],
    ),
    announcement: fixedListeningStimulus(
      9, 'm2-announcement', 'announcement', 'Garden volunteer morning', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Saturday’s community garden volunteer session will begin at eight thirty, thirty minutes earlier than originally announced, because the afternoon is expected to be hot. Meet at the tool shed and wear closed shoes. Gloves and drinking water will be provided. If heavy rain forces a cancellation, registered volunteers will receive a text message by seven a.m.; otherwise, assume the session will proceed.`,
      ['announcer'], [
        item(9, 'm2-an1', 'Why will the volunteer session begin earlier?', ["The garden's tool shed will close at noon.","Hot weather is expected later in the day.","Heavy rain has already started around the garden.","Volunteers requested additional time for the scheduled work."]),
        item(9, 'm2-an2', 'How will volunteers learn that the session is cancelled?', ["A sign will be posted outside the tool shed.","An announcement will be made shortly after eight.","Registered volunteers will receive an early text message.","Volunteers must telephone the community garden office."]),
      ],
    ),
    academic: fixedListeningStimulus(
      9, 'm2-academic-talk', 'academic-talk', 'Radiocarbon Dating and Context', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Radiocarbon dating helps researchers estimate the age of material that was once alive, such as wood, seeds, bone, or charcoal. While an organism lives, carbon moves between it and the environment. After death, that exchange stops, and the radioactive isotope carbon-14 decays at a predictable rate. Measuring how much remains provides an estimate of when the organism died.

The method does not directly date every object at a site. A stone tool contains no carbon from a once-living organism, so a laboratory cannot radiocarbon-date the stone itself. Researchers may instead date charcoal or another organic material found in a secure association with the tool. That association must be evaluated carefully. A root, burrowing animal, or later human activity can move material between layers and create a misleading relationship.

Radiocarbon ages also require calibration because the concentration of carbon-14 in the atmosphere has varied over time. Researchers compare measurements with independently dated records, including long tree-ring sequences, to convert a laboratory result into probable calendar-age ranges. The result is therefore not usually one perfectly certain year. Radiocarbon evidence is strongest when it agrees with stratigraphy, artifacts, and other dating methods. Context and uncertainty are part of the conclusion, not flaws to hide.`,
      ['professor'], [
        item(9, 'm2-at1', 'What happens to carbon-14 after an organism dies?', ["It decays predictably after carbon exchange stops.","It immediately changes into a nearby stone tool.","It becomes increasingly concentrated with every passing year.","It continues moving from the atmosphere into the organism."]),
        item(9, 'm2-at2', 'Why does the professor mention a stone tool?', ["To show that stone naturally contains ancient charcoal","To prove that every artifact shares the same age","To explain why researchers no longer need tree rings","To illustrate material that cannot be radiocarbon-dated directly"]),
        item(9, 'm2-at3', 'Why must researchers evaluate the context of an organic sample?', ["Every archaeological sample originates from living plant roots.","Organic material may move between archaeological layers.","Laboratories cannot measure the carbon contained in charcoal.","A sample's context determines its radioactive decay rate."]),
        item(9, 'm2-at4', 'What does calibration help researchers do?', ["Remove every remaining source of dating uncertainty","Identify the material used to make a stone tool","Relate radiocarbon results to probable calendar-age ranges","Replace archaeological stratigraphy with one exact calendar year"]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET10 = fixedListeningSet(10, {
  module1ChooseAdditions: [
    fixedListeningChoose(10, 'm1', 6, 'woman', 'Did the maintenance team repair the lights?', ["The new lights consume less electricity each evening.","Yes, the hallway is brightly lit again.","The maintenance team arrived in a white van.","I repaired my bicycle at home yesterday."]),
    fixedListeningChoose(10, 'm1', 7, 'man', 'Could you tell me where the nearest pharmacy is?', ["There is a pharmacy across from the train station.","The nearby pharmacy closes at eight every evening.","I purchased this medicine at the store yesterday.","The train station is three stops from here."]),
    fixedListeningChoose(10, 'm1', 8, 'woman', 'I am not sure this table will fit through the doorway.', ["The dining table is made from solid oak.","The narrow doorway was recently painted blue.","Let's measure both before moving the table.","The table can seat six people comfortably."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(10, 'm2', 1, 'man', 'When are the revised schedules being posted?', ["The schedule lists every classroom used this semester.","I revised my research paper late last night.","They are posted beside the coordinator's office.","The coordinator said they would appear tomorrow morning."]),
      fixedListeningChoose(10, 'm2', 2, 'woman', 'I wonder why the laboratory is unusually warm.', ["The current experiment measures changes in room temperature.","The laboratory windows face directly toward the south.","The ventilation system may have been turned off.","Warm water is stored inside that large tank."]),
      fixedListeningChoose(10, 'm2', 3, 'man', 'Would you like me to carry one of those boxes?', ["Yes, this box is heavier than it looks.","The boxes contain several newly purchased library books.","I carried the boxes here from the main lobby.","One additional box is still inside the car."]),
      fixedListeningChoose(10, 'm2', 4, 'woman', 'Where can I download the workshop materials?', ["The workshop is scheduled to begin after lunch.","Use the link in your registration email.","The workshop materials include several detailed charts.","I downloaded the application to my computer yesterday."]),
      fixedListeningChoose(10, 'm2', 5, 'man', 'I thought the museum was open on Mondays.', ["The museum displays pottery from several ancient cultures.","Monday is normally my only free weekday.","I opened the upstairs window earlier this morning.","It is, except during the winter months."]),
      fixedListeningChoose(10, 'm2', 6, 'woman', 'Why did the committee reject the first proposal?', ["The committee holds a meeting every month.","It did not include a complete budget.","The committee's first meeting ended quite early.","The proposal describes plans for a public garden."]),
      fixedListeningChoose(10, 'm2', 7, 'man', 'Could we take a short break before the next section?', ["The next section contains two detailed examples.","We took careful notes throughout the lecture.","Certainly; let's continue in ten minutes.","The nearest break room is located downstairs."]),
      fixedListeningChoose(10, 'm2', 8, 'woman', 'How was the traffic on your way here?', ["It was much lighter than I expected.","The traffic signal at the intersection is new.","I entered the building through the eastern entrance.","The nearby highway has four traffic lanes."]),
    ],
    conversation: fixedListeningStimulus(
      10, 'm2-conversation', 'conversation', 'Exploring an environmental science major', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I am considering environmental science, but I have enjoyed both biology and public policy. I am not sure which side of the major matters more.

ADVISER: The program intentionally combines them. You study natural systems and also how communities make environmental decisions.

STUDENT: I have not taken calculus yet. Is that a problem?

ADVISER: Not for the introductory course. Enroll in Environmental Systems first, and take the required mathematics course alongside it. The department’s open house next Tuesday will let you meet students working in several specializations.`,
      ['student', 'announcer'], [
        item(10, 'm2-cv1', 'What attracts the student to environmental science?', ["The major does not require any mathematics courses.","The open house replaces the required introductory course.","The major combines biology with public policy.","Every student must select the same specialization."]),
        item(10, 'm2-cv2', 'What does the adviser recommend that the student take first?', ["A specialized seminar focused on environmental research","Only the mathematics course required by the program","A general course about speaking effectively in public","The introductory course called Environmental Systems"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      10, 'm2-announcement', 'announcement', 'Temporary dining hall schedule', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The Lakeside Dining Hall will open one hour late, at eight a.m., on Thursday while the kitchen water system is inspected. The Riverside Café will begin serving breakfast at seven and will accept all campus meal plans. Lakeside will resume its normal schedule on Friday. Thursday’s lunch and dinner hours are not affected, and no other dining locations will change their schedules.`,
      ['announcer'], [
        item(10, 'm2-an1', 'Why will Lakeside Dining Hall open late?', ["Its kitchen water system requires a scheduled inspection.","Its breakfast service has been permanently discontinued.","Its electronic meal-plan system is currently unavailable.","The nearby Riverside Café is undergoing major repairs."]),
        item(10, 'm2-an2', 'What will the Riverside Café do on Thursday?', ["Remain closed throughout the regular breakfast period","Begin serving breakfast at seven in the morning","Introduce a different schedule for its lunch service","Stop accepting every type of campus meal plan"]),
      ],
    ),
    academic: fixedListeningStimulus(
      10, 'm2-academic-talk', 'academic-talk', 'Reading Doppler Weather Radar', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Weather radar sends energy pulses and detects what atmospheric targets scatter back. Reflectivity displays that returned energy. Stronger returns often indicate more or larger precipitation particles, helping meteorologists locate precipitation and estimate intensity. But insects, birds, buildings, and other non-weather targets also produce returns. A bright color is not automatically heavy rain.

Doppler radar adds information from changes in the frequency of the returned signal. From that change, a radar estimates radial velocity—the component of motion directly toward or away from the instrument. It does not measure the complete motion of the air in every direction. Near a rotating storm, adjacent regions moving toward and away from the radar can form an important velocity pattern, but meteorologists must consider the radar’s viewing angle and other evidence.

Distance and Earth’s curvature also matter. The beam rises relative to the ground as it travels farther, so distant observations may sample a storm well above the surface. Terrain can block the beam, and intense precipitation can weaken signals from features behind it. Forecasters therefore examine multiple scans, nearby radars, satellite images, surface observations, and reports. Radar is powerful because it updates rapidly and reveals structure, not because one image answers every question.`,
      ['professor'], [
        item(10, 'm2-at1', 'What does radar reflectivity represent?', ["The exact direction of the wind at ground level","Only the temperature measured inside a storm cloud","The complete movement of air in three dimensions","The strength of energy returned by atmospheric targets"]),
        item(10, 'm2-at2', 'What does Doppler radial velocity estimate?', ["The total amount of precipitation reaching the ground","The approximate age of the observed storm system","Motion directly toward or away from the radar","The height of each individual precipitation particle"]),
        item(10, 'm2-at3', 'Why can distant radar observations miss conditions near the ground?', ["The beam samples higher altitudes at greater distances.","All distant storms eventually stop producing precipitation.","Orbiting satellites block the outgoing radar signal.","Radial velocity changes into reflectivity over distance."]),
        item(10, 'm2-at4', 'What is the professor’s main point about using radar?', ["One bright radar image provides a complete forecast.","Radar works best with limits and supporting evidence.","Targets unrelated to weather never appear on radar.","Every radar measures air movement in all directions."]),
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
