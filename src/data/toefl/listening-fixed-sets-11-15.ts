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

export const TOEFL_FIXED_LISTENING_SET11 = fixedListeningSet(11, {
  module1ChooseAdditions: [
    fixedListeningChoose(11, 'm1', 6, 'woman', 'Where did you leave the laboratory manual?', ["On the shelf beside the laboratory safety goggles.","The laboratory manual contains twelve detailed chapters.","I left the campus shortly before dinner.","The laboratory normally opens at eight every morning."]),
    fixedListeningChoose(11, 'm1', 7, 'man', 'I am afraid the afternoon tour is already full.', ["The afternoon tour begins inside the museum lobby.","The afternoon sunlight becomes very bright through those windows.","Then please add my name to the waiting list.","The museum was full of visitors yesterday afternoon."]),
    fixedListeningChoose(11, 'm1', 8, 'woman', 'Did you submit the travel reimbursement form?', ["The business trip lasted for three full days.","I submitted my final essay through the online portal.","The reimbursement form requires copies of all receipts.","Not yet; I am still missing one receipt."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(11, 'm2', 1, 'man', 'Who can unlock the equipment cabinet?', ["The equipment cabinet contains several expensive cameras.","Ask the technician working at the front desk.","The new equipment was delivered earlier today.","I locked the door to my office earlier."]),
      fixedListeningChoose(11, 'm2', 2, 'woman', 'I thought the guest lecture started at four.', ["The visiting guest teaches economics at another university.","Four students asked questions after the guest lecture.","The lecture hall is located on the floor upstairs.","It was rescheduled to begin at four thirty."]),
      fixedListeningChoose(11, 'm2', 3, 'man', 'Would you like me to print another copy?', ["Yes, please print one for the department chair.","The copy machine is located near the main stairs.","I printed the first page using color ink.","Another chair has been placed in the hallway."]),
      fixedListeningChoose(11, 'm2', 4, 'woman', 'Why are the windows covered with paper?', ["The used paper was collected and recycled yesterday.","The classroom windows face toward the central courtyard.","The art class is testing different lighting conditions.","I covered the cardboard box before carrying it."]),
      fixedListeningChoose(11, 'm2', 5, 'man', 'The coffee machine is not accepting my card.', ["The coffee tastes unusually strong this morning.","Try using the payment terminal beside the machine.","My campus payment card expires sometime next month.","The machine can also prepare cups of hot chocolate."]),
      fixedListeningChoose(11, 'm2', 6, 'woman', 'How soon can you review the revised budget?', ["I can review it before tomorrow's scheduled meeting.","The proposed budget contains several important revisions.","We will begin the next project quite soon.","The main meeting room has already been reserved."]),
      fixedListeningChoose(11, 'm2', 7, 'man', 'I may have taken the wrong bus downtown.', ["The bus was unusually crowded earlier this morning.","The shops downtown normally close at six o'clock.","I took a taxi into downtown last week.","Check the route number on the next stop display."]),
      fixedListeningChoose(11, 'm2', 8, 'woman', 'Could we use a quieter room for the interview?', ["The interview contains a total of six questions.","This meeting room contains a large round table.","Yes, the room across the hall is available.","I spoke more quietly after the lunch break."]),
    ],
    conversation: fixedListeningStimulus(
      11, 'm2-conversation', 'conversation', 'Correcting a name on a certificate', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My volunteer certificate arrived, but my family name is missing a letter. I need the certificate for an internship application.

COORDINATOR: I can correct the record today. Please show me identification with the full spelling.

STUDENT: Will I have to wait for another paper copy?

COORDINATOR: The printed copy takes about a week, but I can email a verified digital certificate by tomorrow afternoon. The internship office accepts that version, and you may collect the replacement paper copy later.`,
      ['student', 'announcer'], [
        item(11, 'm2-cv1', 'What is wrong with the student’s certificate?', ["It identifies the wrong type of volunteer activity.","One letter is missing from the student's family name.","It was delivered directly to the internship office.","The volunteer certificate has already reached its expiration date."]),
        item(11, 'm2-cv2', 'What can the coordinator provide by tomorrow afternoon?', ["A replacement form of official personal identification","A printed certificate sent through the postal service","A final decision about the student's internship application","A verified digital version of the corrected certificate"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      11, 'm2-announcement', 'announcement', 'History archive orientation', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Students registered for Friday’s archive orientation should meet in the history library at ten a.m. Bring a pencil rather than a pen because ink is not permitted near original documents. Bags and drinks must remain in the lockers outside the reading room. The session includes a short handling demonstration, so late arrivals cannot enter after ten fifteen.`,
      ['announcer'], [
        item(11, 'm2-an1', 'Why should students bring a pencil?', ["Pencils are available for purchase inside the reading room.","The handling demonstration requires students to make drawings.","Ink is prohibited near the archive's original documents.","The library computers will be unavailable during orientation."]),
        item(11, 'm2-an2', 'What happens after ten fifteen?', ["Late arrivals can no longer enter the orientation session.","The storage lockers outside the reading room will close.","Students may begin bringing drinks into the reading room.","The archive orientation moves to another campus building."]),
      ],
    ),
    academic: fixedListeningStimulus(
      11, 'm2-academic-talk', 'academic-talk', 'Plant Transpiration', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Plants absorb liquid water through their roots, but much of that water eventually leaves as vapor through tiny openings in the leaves called stomata. This release is transpiration. Evaporation from soil and water surfaces plus plant transpiration are often discussed together as evapotranspiration, an important movement of water back to the atmosphere.

Transpiration is connected to transport inside the plant. As water evaporates from leaf surfaces, it helps maintain a pull through water-conducting tissue from roots toward leaves. Water carries dissolved minerals and supports photosynthesis and other processes. Losing water, however, creates a tradeoff. Stomata also provide a route for carbon dioxide to enter a leaf, so closing them can conserve water but may limit carbon uptake.

The rate is not fixed. Sunlight, temperature, humidity, wind, soil moisture, leaf structure, and plant species all matter. Hot, dry, windy air can increase the demand for evaporation, while a plant experiencing water shortage may reduce stomatal opening. Measuring water loss from vegetation therefore requires both biological and weather information. The main idea is not that plants passively leak a constant amount, but that water movement through leaves links plant function to the larger water cycle and changes with environmental conditions.`,
      ['professor'], [
        item(11, 'm2-at1', 'What is transpiration?', ["The absorption of atmospheric carbon through plant roots","The release of water vapor through plant leaves","The freezing of liquid water inside plant tissue","The movement of loose soil particles by wind"]),
        item(11, 'm2-at2', 'What tradeoff is associated with closing stomata?', ["It increases the speed of wind around leaves.","It stops plant roots from absorbing dissolved minerals.","It causes surrounding soil water to evaporate faster.","It conserves water while limiting carbon dioxide uptake."]),
        item(11, 'm2-at3', 'Why does the professor list sunlight, humidity, and wind?', ["To identify every condition required for plants to grow","To explain why healthy roots do not require water","To show that transpiration changes with environmental conditions","To describe the physical structure of an individual stoma"]),
        item(11, 'm2-at4', 'What is the main point of the talk?', ["Leaf water loss links plant functions to the water cycle.","Every plant releases water at exactly the same rate.","Transpiration occurs only when surrounding soil becomes completely dry.","Plants absorb all required carbon dioxide through their roots."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET12 = fixedListeningSet(12, {
  module1ChooseAdditions: [
    fixedListeningChoose(12, 'm1', 6, 'man', 'Why did the study group change its meeting time?', ["The group studies in the library.","The scheduled meeting lasts approximately ninety minutes.","Two members have a laboratory that afternoon.","The meeting time appears on the shared calendar."]),
    fixedListeningChoose(12, 'm1', 7, 'woman', 'Would you like the receipt in the bag?', ["Yes, please; I may need to return it.","The bag is made of paper.","I received the package in the mail yesterday.","The purchased item is waiting on the counter."]),
    fixedListeningChoose(12, 'm1', 8, 'man', 'I cannot remember the password for this account.', ["The online account was created last September.","Use the reset link below the login box.","I remembered our appointment.","The current password contains exactly eight characters."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(12, 'm2', 1, 'woman', 'When will the gallery reopen to visitors?', ["The gallery displays photographs by several local artists.","Visitors enter the gallery through the central courtyard.","The planned reopening celebration has no admission charge.","On Saturday, after the installation work is complete."]),
      fixedListeningChoose(12, 'm2', 2, 'man', 'This desk seems too small for both monitors.', ["The office desk was delivered as separate flat pieces.","We can place one monitor on the side table.","Both computer monitors have unusually bright display screens.","The smaller office is located on the floor upstairs."]),
      fixedListeningChoose(12, 'm2', 3, 'woman', 'Did you find out who is teaching the summer course?', ["Yes, Professor Malik is listed as the instructor.","The course meets throughout the summer academic term.","I located the assigned classroom on the campus map.","The instructor recently published a new journal article."]),
      fixedListeningChoose(12, 'm2', 4, 'man', 'Could you hold the elevator for a moment?', ["The elevator received its inspection during the previous month.","I am carrying a particularly heavy package upstairs.","Of course; I will keep the door open.","The short moment seemed to pass very quickly."]),
      fixedListeningChoose(12, 'm2', 5, 'woman', 'Why is Nina returning to the computer lab?', ["The laboratory recently received several new computers.","Nina has already returned the borrowed library book.","Her personal computer has a much larger screen.","She forgot to save the file to her drive."]),
      fixedListeningChoose(12, 'm2', 6, 'man', 'I expected more people at the morning presentation.', ["The morning presentation contains several detailed charts.","Traffic was unusually heavy during the morning commute.","The later session may attract a larger audience.","I presented the completed report sometime last week."]),
      fixedListeningChoose(12, 'm2', 7, 'woman', 'Where should the signed contract be delivered?', ["The signed contract contains a total of six pages.","To the legal office on the third floor.","I signed the form confirming the package delivery.","The entire third floor is currently being painted."]),
      fixedListeningChoose(12, 'm2', 8, 'man', 'Do you think this jacket is warm enough?', ["It should be, with a sweater underneath.","The winter jacket contains two inside pockets.","I thought the afternoon lecture was very useful.","The weather became much warmer during yesterday afternoon."]),
    ],
    conversation: fixedListeningStimulus(
      12, 'm2-conversation', 'conversation', 'Joining a community orchestra', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I would like to join the community orchestra, but I have not performed in several years. Are auditions required?

DIRECTOR: New members attend a placement session, not a competitive audition. We use a short piece to decide which part fits comfortably.

STUDENT: Do I need to bring my own music stand?

DIRECTOR: We provide stands and sheet music. Bring your instrument and arrive twenty minutes early to complete the membership form. The next placement session is Monday evening in the rehearsal hall.`,
      ['student', 'announcer'], [
        item(12, 'm2-cv1', 'What is the purpose of the placement session?', ["To identify a suitable orchestra part for the student","To remove most new applicants from consideration","To teach new members how to read written music","To select a replacement director for the orchestra"]),
        item(12, 'm2-cv2', 'What must the student bring?', ["A personal music stand and printed sheet music","A completed program from the orchestra's next concert","The instrument the student intends to play","A recording from one of the student's previous performances"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      12, 'm2-announcement', 'announcement', 'Recreation center locker renewal', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Annual locker rentals at the recreation center expire at the end of this month. Current renters who want to keep the same locker must renew online by Tuesday. After that deadline, unrenewed lockers will be offered to students on the waiting list. Remove personal belongings by Friday if you are not renewing. Items left behind will be held at the service desk for fourteen days.`,
      ['announcer'], [
        item(12, 'm2-an1', 'What must current renters do to keep the same locker?', ["Visit the recreation center service desk on Friday","Renew the existing locker rental online by Tuesday","Add their names to the student waiting list","Remove all personal belongings from the locker immediately"]),
        item(12, 'm2-an2', 'How long will the center hold items left behind?', ["Until the center opens on Tuesday morning","Until the beginning of the next academic year","For a complete period of one calendar month","For fourteen days after the items are collected"]),
      ],
    ),
    academic: fixedListeningStimulus(
      12, 'm2-academic-talk', 'academic-talk', 'Coastal Upwelling', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Coastal upwelling occurs when winds move surface water away from a coast and deeper water rises to replace it. The exact motion reflects Earth’s rotation and the relationship between wind and coastline, so wind does not simply push water straight ahead. What matters for our discussion is the resulting upward movement.

Deep water is often colder and richer in nutrients than the sunlit surface water it replaces. When those nutrients reach the photic zone, phytoplankton can grow, supporting zooplankton, fish, seabirds, and marine mammals. This is why several major fishing regions occur near persistent upwelling systems. High productivity is a common outcome, not a guarantee of equal catches every year.

Upwelling also changes temperature and chemistry near the coast. Its strength and timing vary with winds and larger climate patterns. If favorable winds weaken or shift, less nutrient-rich water may reach the surface. Extremely strong or prolonged upwelling can also bring low-oxygen or more acidic deep water into coastal habitats. Scientists monitor winds, sea-surface temperature, currents, oxygen, and biological indicators rather than using one measurement alone. Coastal upwelling illustrates how atmospheric motion can reorganize the ocean and influence an entire food web.`,
      ['professor'], [
        item(12, 'm2-at1', 'What causes coastal upwelling?', ["Rivers carry additional warm water into the ocean.","Fish transport nutrients from deep water toward the coast.","Deep ocean water freezes before expanding toward the surface.","Surface water moves away as deeper water replaces it."]),
        item(12, 'm2-at2', 'Why can upwelling regions be biologically productive?', ["Nutrient-rich water rises into the sunlit zone.","Cold water prevents marine organisms from moving normally.","Coastal winds provide food directly to marine mammals.","Surface waters become completely free of phytoplankton."]),
        item(12, 'm2-at3', 'What qualification does the professor make about fishing?', ["Every upwelling event produces an identical fishing catch.","Fishing activity stops whenever coastal water becomes cold.","High productivity does not ensure equal annual catches.","Only seabird populations benefit from coastal upwelling."]),
        item(12, 'm2-at4', 'Why do scientists monitor several kinds of evidence?', ["Wind patterns have no relationship with coastal water.","Upwelling varies and changes several ocean conditions.","One temperature measurement predicts every biological response.","Currents can only be measured from active fishing boats."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET13 = fixedListeningSet(13, {
  module1ChooseAdditions: [
    fixedListeningChoose(13, 'm1', 6, 'woman', 'Is there any chance you could cover my shift tonight?', ["The night shift normally ends at ten o'clock.","I covered the dining table with a cloth.","Your scheduled shift starts shortly after mine.","I can, if you trade with me Friday."]),
    fixedListeningChoose(13, 'm1', 7, 'man', 'I wonder whether this bus stops near the stadium.', ["The stadium can hold twenty thousand spectators.","Let's ask the driver before boarding the bus.","The bus stopped at a red traffic light.","I wonder which team won the game."]),
    fixedListeningChoose(13, 'm1', 8, 'woman', 'Could I borrow the conference room projector?', ["Yes, but reserve it through the equipment system.","The conference room is occupied throughout the afternoon.","I borrowed a novel from the campus library.","The projector uses a particularly bright replacement lamp."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(13, 'm2', 1, 'man', 'How did you hear about the volunteer position?', ["The volunteer position begins sometime during May.","I heard the guest speaker very clearly.","A classmate sent me the volunteer announcement.","The participating volunteers wear matching blue shirts."]),
      fixedListeningChoose(13, 'm2', 2, 'woman', 'The office plants look much healthier now.', ["The new watering schedule seems to be working.","The office plants are placed beside the window.","My office is located on the fourth floor.","The health insurance forms are available online."]),
      fixedListeningChoose(13, 'm2', 3, 'man', 'Where can I store my suitcase during the tour?', ["The large suitcase has a damaged wheel.","The guided tour ends inside the city museum.","I stored the research data on an external drive.","There are lockers beside the ticket counter."]),
      fixedListeningChoose(13, 'm2', 4, 'woman', 'Did the restaurant change our reservation time?', ["The restaurant is located across the river.","Yes, they moved it from seven to seven thirty.","I changed my lunch order earlier today.","The table reservation is for four people."]),
      fixedListeningChoose(13, 'm2', 5, 'man', 'Would you mind explaining the last equation again?', ["The final equation appears inside the assigned textbook.","The last scheduled class ended unusually early.","Not at all; which step was unclear?","I explained the result in my written response."]),
      fixedListeningChoose(13, 'm2', 6, 'woman', 'Why has the walking path been closed?', ["Workers are repairing a damaged bridge along the path.","The walking path follows the river through the park.","I walked home from campus after class.","The damaged bridge is constructed mostly from wood."]),
      fixedListeningChoose(13, 'm2', 7, 'man', 'I cannot attend the training session on Monday.', ["The training session covers important laboratory safety procedures.","Monday is the first working day of every week.","I attended the same training session last year.","There is another training session scheduled for Wednesday."]),
      fixedListeningChoose(13, 'm2', 8, 'woman', 'Who should approve the final design?', ["The final design uses three contrasting colors.","The project manager has final design approval.","I finally completed the detailed drawing yesterday.","The project manager's office was recently redesigned."]),
    ],
    conversation: fixedListeningStimulus(
      13, 'm2-conversation', 'conversation', 'Replacing a damaged library book', CONVERSATION_INSTRUCTIONS,
      `STUDENT: A library book in my backpack was damaged when my water bottle leaked. I want to replace it.

LIBRARIAN: Thank you for reporting it. Please do not buy a copy yet, because the library needs the same edition and binding.

STUDENT: How will I know what to order?

LIBRARIAN: I will check whether our supplier can replace it. If so, you will pay the supplier’s price through your library account. If that edition is unavailable, the collections librarian will choose an equivalent rather than asking you to find one.`,
      ['student', 'announcer'], [
        item(13, 'm2-cv1', 'Why should the student not buy a replacement immediately?', ["The library requires the same edition and binding.","The damaged library book cannot ever be replaced.","The student's borrowing account has already been closed.","The library's book supplier accepts cash payments only."]),
        item(13, 'm2-cv2', 'What will happen if the same edition is unavailable?', ["The student must search several used bookstores personally.","The standard damage fee will automatically become twice as large.","A librarian will select an equivalent replacement edition.","The student can keep the damaged book without further action."]),
      ],
    ),
    announcement: fixedListeningStimulus(
      13, 'm2-announcement', 'announcement', 'Outdoor film weather plan', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Tonight’s outdoor film is still scheduled for eight p.m. on the central lawn. Staff will make a final weather decision at six. If rain is expected, the screening will move to the student center ballroom, where seating is limited to the first two hundred guests. Check the event page before leaving home. Food may be brought to the lawn but not into the ballroom.`,
      ['announcer'], [
        item(13, 'm2-an1', 'When will staff make the final weather decision?', ["At the beginning of the outdoor film screening","After the first group of guests has arrived","At eight in the evening when the film begins","At six in the evening before the event"]),
        item(13, 'm2-an2', 'What restriction applies if the film moves indoors?', ["Guests must purchase another ticket for indoor admission.","Food cannot be taken inside the student-center ballroom.","The scheduled film will begin two hours earlier indoors.","Only event staff can access the online event page."]),
      ],
    ),
    academic: fixedListeningStimulus(
      13, 'm2-academic-talk', 'academic-talk', 'Volcanic Ash and Aviation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Volcanic ash is not the soft residue produced by a wood fire. It consists of tiny fragments of rock, minerals, and volcanic glass created during an eruption. Winds can carry these abrasive particles hundreds of kilometers from the volcano and place them at the same altitudes used by aircraft.

An ash cloud presents several hazards. Particles can reduce visibility, scratch windshields, contaminate instruments, and enter jet engines. Inside a hot engine, some ash can melt and then stick to cooler components, disrupting airflow. Engines may lose power or shut down. Even a lower-concentration encounter can accelerate wear, so the absence of an immediate failure does not mean there was no damage.

Avoidance is the central protection because pilots may not reliably distinguish ash from an ordinary cloud and onboard weather radar is not designed simply to identify every ash plume. Volcano observatories report eruptions; satellites, ground observations, and atmospheric models help track and forecast plume movement; specialized advisory centers distribute warnings. Uncertainty about particle concentration and height remains, so routes or airports may be changed as a precaution. The response depends on coordinated evidence, not on a pilot waiting to see ash through the window.`,
      ['professor'], [
        item(13, 'm2-at1', 'What is volcanic ash composed of?', ["Small pieces of rock, minerals, and volcanic glass","Only condensed water mixed with volcanic smoke","Soft residue identical to ash from a fireplace","Frozen droplets formed inside operating aircraft engines"]),
        item(13, 'm2-at2', 'How can ash affect a jet engine?', ["It consistently cools the engine without causing damage.","It makes the aircraft's fuel burn more efficiently.","Melted ash sticks to components and disrupts airflow.","It prevents outside particles from entering the aircraft."]),
        item(13, 'm2-at3', 'Why is avoidance the central protection?', ["Ash clouds remain directly above their source volcanoes.","Ash can be difficult to identify and damage aircraft.","Onboard radar detects every volcanic particle with complete accuracy.","Pilots can remove accumulated ash while the aircraft flies."]),
        item(13, 'm2-at4', 'What is the professor’s main point about warnings?', ["A single visual observation provides sufficient warning information.","Airports never require precautionary changes during volcanic eruptions.","Only volcano observatories provide useful information about ash.","Coordinated observations and forecasts reduce encounter risk."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET14 = fixedListeningSet(14, {
  module1ChooseAdditions: [
    fixedListeningChoose(14, 'm1', 6, 'man', 'Why is the seminar room unavailable this morning?', ["The seminar focuses on modern city planning.","A video conference is currently using the room.","Morning classes normally begin at nine o'clock.","The seminar room contains twenty available seats."]),
    fixedListeningChoose(14, 'm1', 7, 'woman', 'Could you remind me which chapter we are discussing?', ["The classroom discussion was particularly interesting today.","I read the assigned chapter twice yesterday.","The reminder appears on my online calendar.","Chapter six, the section about human migration."]),
    fixedListeningChoose(14, 'm1', 8, 'man', 'The delivery arrived earlier than the tracking page predicted.', ["The tracking page displays a detailed delivery map.","I tracked all my travel expenses yesterday.","That's convenient; someone is still at reception.","The delivery contains several new office chairs."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(14, 'm2', 1, 'woman', 'Where should I return the visitor badge?', ["Place the visitor badge in the box beside the exit.","The identification badge has a blue stripe across it.","All visitors sign in at the reception desk.","The building exit opens directly onto the courtyard."]),
      fixedListeningChoose(14, 'm2', 2, 'man', 'I am concerned that the plants will dry out over the break.', ["The academic break is scheduled to begin on Friday.","Dry soil normally appears lighter in color.","I arranged for the custodian to water them.","The office plants grow beside the large window."]),
      fixedListeningChoose(14, 'm2', 3, 'woman', 'Did you ask for permission to record the interview?', ["The complete interview recording lasts thirty minutes.","Yes, and the participant signed the consent form.","I asked the participant the first interview question.","The requested permission was written using a pencil."]),
      fixedListeningChoose(14, 'm2', 4, 'man', 'When can I collect the repaired bicycle?', ["The bicycle repair required installation of a new chain.","I collect vintage posters showing different bicycles.","The repair shop is located close to campus.","It will be ready after three this afternoon."]),
      fixedListeningChoose(14, 'm2', 5, 'woman', 'This room is colder than it was yesterday.', ["Someone may have adjusted the room's thermostat.","The room faces toward the northern courtyard.","Yesterday's scheduled meeting ended unusually late.","I wore a warmer winter coat this morning."]),
      fixedListeningChoose(14, 'm2', 6, 'man', 'Would you send me the notes from the committee meeting?', ["The committee currently consists of nine members.","Certainly; I will attach the notes to an email.","The committee meeting took place in the upstairs room.","I sent the requested package earlier this morning."]),
      fixedListeningChoose(14, 'm2', 7, 'woman', 'How did the students respond to the new assignment?', ["The new assignment is due this coming Friday.","The students wrote several short responses during class.","Most students seemed interested in the topic.","The new classroom provides much better lighting."]),
      fixedListeningChoose(14, 'm2', 8, 'man', 'I am sorry, but the vegetarian sandwiches are gone.', ["The vegetarian sandwiches were displayed on this tray.","Vegetarian dishes do not contain any meat products.","I ordered my lunch before noon today.","That's fine; I will have the salad instead."]),
    ],
    conversation: fixedListeningStimulus(
      14, 'm2-conversation', 'conversation', 'Rescheduling a laboratory orientation', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I registered for tomorrow’s laboratory orientation, but my train was cancelled and I will not reach campus in time.

TECHNICIAN: There is another session Friday morning. I can move your registration if space remains.

STUDENT: My first experiment is Thursday afternoon. Could I attend that class before orientation?

TECHNICIAN: No. The safety orientation is required before entering the laboratory. Contact your instructor today; the experiment can be completed during Friday’s make-up period after your orientation.`,
      ['student', 'announcer'], [
        item(14, 'm2-cv1', 'Why will the student miss tomorrow’s orientation?', ["The laboratory is closed while undergoing major repairs.","The student forgot to complete the orientation registration.","The student's scheduled laboratory experiment was cancelled.","The student's train service was cancelled."]),
        item(14, 'm2-cv2', 'What must the student do before entering the laboratory?', ["Complete the first laboratory experiment through an online simulation","Attend the required safety orientation before entering","Purchase new protective equipment for use in the laboratory","Speak directly with the company operating the cancelled train"]),
      ],
    ),
    announcement: fixedListeningStimulus(
      14, 'm2-announcement', 'announcement', 'Weekend parking restriction', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The west parking lot will close at ten p.m. Friday for resurfacing and will remain closed through Sunday evening. Vehicles left there after ten will be moved to the north lot. Weekend permit holders may use the north or stadium lots at no additional charge. The accessible spaces beside the administration building will remain open. Normal parking resumes Monday at six a.m.`,
      ['announcer'], [
        item(14, 'm2-an1', 'What will happen to vehicles left in the west lot?', ["They will be relocated to the north parking lot.","Their weekend parking permits will be permanently cancelled.","They must remain inside the west lot until Monday.","They will be relocated beside the administration building."]),
        item(14, 'm2-an2', 'When will normal parking resume?', ["On Friday evening at exactly ten o'clock","During the afternoon on the following Sunday","On Monday morning at exactly six o'clock","After the conclusion of the following weekend"]),
      ],
    ),
    academic: fixedListeningStimulus(
      14, 'm2-academic-talk', 'academic-talk', 'Seasonal Lake Turnover', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: In many temperate lakes, summer sunlight warms the surface water. Warm water is less dense than the colder water below, so the lake separates into layers that resist mixing. This condition is thermal stratification. Wind may mix the upper layer, but the density difference limits exchange with deeper water.

Organisms continue using oxygen in the deep layer while little new oxygen arrives from the atmosphere. Oxygen can therefore decline near the bottom, especially where decomposition consumes it rapidly. The amount of decline varies with lake depth, productivity, water clarity, weather, and other local conditions; stratification does not make every lake bottom oxygen-free.

In autumn, the surface cools. As the density difference becomes smaller, wind can mix water through much more of the lake. This fall turnover redistributes oxygen and nutrients. A similar mixing period can occur in spring after ice melts and surface water changes temperature. Turnover is not the lake physically flipping upside down, nor is it caused by one calendar date. It describes mixing made possible when temperature and density differences weaken. Monitoring temperature and dissolved oxygen at several depths helps scientists see when layers form, how long they persist, and how conditions differ among lakes.`,
      ['professor'], [
        item(14, 'm2-at1', 'Why does a lake often form layers in summer?', ["Wind completely stops moving across the lake's surface.","Warm surface water is less dense than deep water.","Deep lake water receives more sunlight during summer.","All dissolved oxygen moves downward into lake sediments."]),
        item(14, 'm2-at2', 'Why can oxygen decline in the deep layer?', ["Deep water consistently becomes warmer than surface water.","Autumn winds remove dissolved oxygen from the entire lake.","Melting ice deposits excessive nutrients along the lake bottom.","Organisms consume oxygen while mixing replaces little."]),
        item(14, 'm2-at3', 'What allows fall turnover to occur?', ["Cooling reduces the density difference between water layers.","The bottom of the lake physically rises toward the surface.","Sunlight permanently stops reaching any part of the lake.","Every aquatic organism moves into the shallow upper water."]),
        item(14, 'm2-at4', 'Why do scientists measure several depths?', ["One surface measurement represents every part of every lake.","Lake turnover occurs on the same date each year.","Layering and oxygen vary across depth and time.","Water temperature has no relationship to its density."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET15 = fixedListeningSet(15, {
  module1ChooseAdditions: [
    fixedListeningChoose(15, 'm1', 6, 'woman', 'Have you seen the updated conference program?', ["Yes, the afternoon panel has a new speaker.","The conference program was printed on thick paper.","I visited the conference center yesterday afternoon.","The update took minutes."]),
    fixedListeningChoose(15, 'm1', 7, 'man', 'Why did Leo bring an extra extension cord?', ["The extension cord measures ten meters in length.","The outlets may be too far from the display.","Leo extended his visit.","The conference display uses very little electrical power."]),
    fixedListeningChoose(15, 'm1', 8, 'woman', 'Could you let me know when the director arrives?', ["The office is locked.","I arrived at the building before everyone else.","The scheduled meeting begins at noon today.","Certainly; I will send you a message."]),
  ],
  module2: {
    choose: [
      fixedListeningChoose(15, 'm2', 1, 'man', 'Who should receive the completed survey forms?', ["The completed survey contains ten separate questions.","I completed all the required forms yesterday.","Give the forms to the research coordinator.","The research coordinator recently received an academic award."]),
      fixedListeningChoose(15, 'm2', 2, 'woman', 'I did not expect the trail to be this muddy.', ["The hiking trail crosses a small wooden bridge.","I expected the walk to be much longer.","Mud covered the bottom of both my shoes.","It must have rained here last night."]),
      fixedListeningChoose(15, 'm2', 3, 'man', 'Would you mind turning the projector slightly?', ["Not at all; tell me when the image is centered.","The digital projector belongs to the science department.","The projected image shows a distant mountain range.","I turned in the completed assignment yesterday."]),
      fixedListeningChoose(15, 'm2', 4, 'woman', 'Where can I find the minutes from last month’s meeting?', ["The committee meeting lasted exactly sixty minutes.","They are saved in the shared project folder.","Last month was unusually busy for the entire team.","I found the missing folder beneath the table."]),
      fixedListeningChoose(15, 'm2', 5, 'man', 'Why are you replacing the batteries already?', ["The replacement batteries are in the top drawer.","I replaced the computer keyboard sometime last year.","The recorder keeps turning off without warning.","The required replacement had a relatively low cost."]),
      fixedListeningChoose(15, 'm2', 6, 'woman', 'The registration page will not accept my address.', ["The registration page includes a detailed campus map.","I registered for two professional workshops this month.","My mailing address changed during the previous month.","Try entering the postal code without a space."]),
      fixedListeningChoose(15, 'm2', 7, 'man', 'How long will the temporary exhibit remain open?', ["The temporary exhibit is located near the entrance.","Until the end of the current academic semester.","The museum staff needed one hour to install it.","The museum normally remains open late on Fridays."]),
      fixedListeningChoose(15, 'm2', 8, 'woman', 'Did the mechanic identify the unusual noise?', ["Yes, a loose cover was causing the vibration.","The mechanic works in a shop near the station.","The unusual noise became much louder yesterday.","I identified three different bird calls this morning."]),
    ],
    conversation: fixedListeningStimulus(
      15, 'm2-conversation', 'conversation', 'Changing a meal-plan selection', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I selected the largest meal plan when I moved into residence, but I eat off campus on weekends and have many meals left.

STAFF MEMBER: You may switch to the medium plan during the adjustment period, which ends Wednesday.

STUDENT: Will the unused meals transfer to the new plan?

STAFF MEMBER: The system will first calculate what you have already used. Any payment difference will appear as a credit on your student account within five business days. Submit the online change form before midnight Wednesday.`,
      ['student', 'announcer'], [
        item(15, 'm2-cv1', 'Why does the student want to change meal plans?', ["The student has many unused meals remaining.","The residence dining hall closes every weekend.","The largest available meal plan is being discontinued.","The student plans to move out of residence."]),
        item(15, 'm2-cv2', 'What will happen to a payment difference?', ["It must be paid immediately using physical cash.","It will automatically purchase additional weekend meals.","It will become a credit on the student account.","It will be transferred directly to the residence office."]),
      ],
    ),
    announcement: fixedListeningStimulus(
      15, 'm2-announcement', 'announcement', 'Chemistry tutoring location', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: This evening’s chemistry tutoring has moved from Science Room 105 to Library Room 214 because the laboratory ventilation system is being tested. The session still begins at six thirty and requires no registration. Enter the library through its east door after six. Students may bring current problem sets, but tutors will not review completed take-home examinations.`,
      ['announcer'], [
        item(15, 'm2-an1', 'Where will chemistry tutoring take place?', ["Inside Science Room 105 in the laboratory building","Inside Library Room 214 through the east entrance","At the main entrance to the science laboratory","Inside the library's large western meeting hall"]),
        item(15, 'm2-an2', 'What will tutors not review?', ["Current problem sets assigned during regular chemistry courses","Questions concerning the laboratory's ventilation testing process","Registration forms required to access the university library","Completed take-home examinations from chemistry courses"]),
      ],
    ),
    academic: fixedListeningStimulus(
      15, 'm2-academic-talk', 'academic-talk', 'Finding Exoplanets by Transit', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: The transit method detects exoplanets without resolving their images. A transit occurs when a planet passes between its star and the observer. The planet blocks a small fraction of starlight, creating a dip in a graph of brightness over time called a light curve.

Repeated dips at regular intervals can reveal the planet’s orbital period. The depth of a dip, interpreted with the star’s size, helps estimate the planet’s radius: a larger planet generally blocks a larger fraction of light. A transit can also support studies of an atmosphere because some wavelengths of starlight pass through gases around the planet differently.

The method has selection effects. The orbit must be aligned so the planet crosses the star from our viewpoint. Many planets never transit as seen from Earth. Short-period planets produce more events during a limited campaign, and large planets create deeper, easier-to-detect dips. Other phenomena, including eclipsing stars or changes on a star’s surface, can mimic a planetary signal. Astronomers therefore seek repeated events and use follow-up observations or other methods to validate candidates. Transit surveys monitor many stars consistently, but their discoveries are not an unbiased sample of planetary systems.`,
      ['professor'], [
        item(15, 'm2-at1', 'What happens during an exoplanet transit?', ["A star passes between its planet and an observer.","The planet suddenly emits a flash of visible light.","The planet permanently changes the size of its star.","A planet blocks a small portion of starlight."]),
        item(15, 'm2-at2', 'What can the time between repeated dips indicate?', ["The length of the planet's orbital period","The precise chemical composition of the host star","The distance separating Earth from every observed planet","The total number of moons orbiting the planet"]),
        item(15, 'm2-at3', 'Why are short-period planets easier for a limited survey to detect?', ["They are consistently larger than long-period planets.","They never require additional follow-up observations afterward.","They produce more repeated transits during the survey.","Their host stars never experience surface brightness changes."]),
        item(15, 'm2-at4', 'What limitation of the transit method does the professor emphasize?', ["It detects planets regardless of their orbital orientation.","It favors aligned, larger, or short-period planets.","It produces a detailed visual image of each planet.","It cannot detect changes in a star's brightness."]),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SETS_11_TO_15 = [
  TOEFL_FIXED_LISTENING_SET11,
  TOEFL_FIXED_LISTENING_SET12,
  TOEFL_FIXED_LISTENING_SET13,
  TOEFL_FIXED_LISTENING_SET14,
  TOEFL_FIXED_LISTENING_SET15,
] as const;
