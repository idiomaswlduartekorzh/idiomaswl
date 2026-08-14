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
    fixedListeningChoose(11, 'm1', 6, 'woman', 'Where did you leave the laboratory manual?', ['On the shelf beside the safety goggles.', 'The manual has twelve chapters.', 'I left campus before dinner.', 'The laboratory opens at eight.']),
    fixedListeningChoose(11, 'm1', 7, 'man', 'I am afraid the afternoon tour is already full.', ['The tour begins in the lobby.', 'Afternoon sunlight is very bright.', 'Then please add me to the waiting list.', 'The museum was full yesterday.']),
    fixedListeningChoose(11, 'm1', 8, 'woman', 'Did you submit the travel reimbursement form?', ['The trip took three days.', 'I submitted my essay online.', 'The form asks for receipts.', 'Not yet; I am still missing one receipt.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(11, 'm2', 1, 'man', 'Who can unlock the equipment cabinet?', ['The cabinet contains cameras.', 'Ask the technician at the front desk.', 'The equipment was delivered today.', 'I locked my office earlier.']),
      fixedListeningChoose(11, 'm2', 2, 'woman', 'I thought the guest lecture started at four.', ['The guest teaches economics.', 'Four students asked questions.', 'The lecture hall is upstairs.', 'It was moved to four thirty.']),
      fixedListeningChoose(11, 'm2', 3, 'man', 'Would you like me to print another copy?', ['Yes, one for the department chair, please.', 'The copy machine is near the stairs.', 'I printed the first page in color.', 'Another chair is in the hallway.']),
      fixedListeningChoose(11, 'm2', 4, 'woman', 'Why are the windows covered with paper?', ['The paper was recycled.', 'The windows face the courtyard.', 'The art class is testing different lighting conditions.', 'I covered the box before carrying it.']),
      fixedListeningChoose(11, 'm2', 5, 'man', 'The coffee machine is not accepting my card.', ['The coffee is unusually strong today.', 'Try the payment terminal beside it.', 'My card expires next month.', 'The machine makes hot chocolate too.']),
      fixedListeningChoose(11, 'm2', 6, 'woman', 'How soon can you review the revised budget?', ['I can read it before tomorrow’s meeting.', 'The budget contains several revisions.', 'Soon we will begin the next project.', 'The meeting room is reserved.']),
      fixedListeningChoose(11, 'm2', 7, 'man', 'I may have taken the wrong bus downtown.', ['The bus was crowded this morning.', 'Downtown shops close at six.', 'I took a taxi last week.', 'Check the route number on the next stop display.']),
      fixedListeningChoose(11, 'm2', 8, 'woman', 'Could we use a quieter room for the interview?', ['The interview has six questions.', 'This room has a round table.', 'Yes, the room across the hall is available.', 'I spoke more quietly after lunch.']),
    ],
    conversation: fixedListeningStimulus(
      11, 'm2-conversation', 'conversation', 'Correcting a name on a certificate', CONVERSATION_INSTRUCTIONS,
      `STUDENT: My volunteer certificate arrived, but my family name is missing a letter. I need the certificate for an internship application.

COORDINATOR: I can correct the record today. Please show me identification with the full spelling.

STUDENT: Will I have to wait for another paper copy?

COORDINATOR: The printed copy takes about a week, but I can email a verified digital certificate by tomorrow afternoon. The internship office accepts that version, and you may collect the replacement paper copy later.`,
      ['student', 'announcer'], [
        item(11, 'm2-cv1', 'What is wrong with the student’s certificate?', ['It lists the wrong volunteer activity.', 'A letter is missing from the family name.', 'It was sent to the internship office.', 'The certificate has already expired.']),
        item(11, 'm2-cv2', 'What can the coordinator provide by tomorrow afternoon?', ['A new form of identification', 'A paper copy delivered by mail', 'An internship decision', 'A verified digital certificate']),
      ],
    ),
    announcement: fixedListeningStimulus(
      11, 'm2-announcement', 'announcement', 'History archive orientation', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Students registered for Friday’s archive orientation should meet in the history library at ten a.m. Bring a pencil rather than a pen because ink is not permitted near original documents. Bags and drinks must remain in the lockers outside the reading room. The session includes a short handling demonstration, so late arrivals cannot enter after ten fifteen.`,
      ['announcer'], [
        item(11, 'm2-an1', 'Why should students bring a pencil?', ['Pencils are sold inside the reading room.', 'The demonstration requires drawing.', 'Ink is not allowed near original documents.', 'The library computers are unavailable.']),
        item(11, 'm2-an2', 'What happens after ten fifteen?', ['Late arrivals cannot enter the session.', 'The lockers will be closed.', 'Students may bring drinks inside.', 'The orientation moves to another building.']),
      ],
    ),
    academic: fixedListeningStimulus(
      11, 'm2-academic-talk', 'academic-talk', 'Plant Transpiration', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Plants absorb liquid water through their roots, but much of that water eventually leaves as vapor through tiny openings in the leaves called stomata. This release is transpiration. Evaporation from soil and water surfaces plus plant transpiration are often discussed together as evapotranspiration, an important movement of water back to the atmosphere.

Transpiration is connected to transport inside the plant. As water evaporates from leaf surfaces, it helps maintain a pull through water-conducting tissue from roots toward leaves. Water carries dissolved minerals and supports photosynthesis and other processes. Losing water, however, creates a tradeoff. Stomata also provide a route for carbon dioxide to enter a leaf, so closing them can conserve water but may limit carbon uptake.

The rate is not fixed. Sunlight, temperature, humidity, wind, soil moisture, leaf structure, and plant species all matter. Hot, dry, windy air can increase the demand for evaporation, while a plant experiencing water shortage may reduce stomatal opening. Measuring water loss from vegetation therefore requires both biological and weather information. The main idea is not that plants passively leak a constant amount, but that water movement through leaves links plant function to the larger water cycle and changes with environmental conditions.`,
      ['professor'], [
        item(11, 'm2-at1', 'What is transpiration?', ['The absorption of carbon through roots', 'The release of water vapor from plant leaves', 'The freezing of water inside plant tissue', 'The movement of soil particles by wind']),
        item(11, 'm2-at2', 'What tradeoff is associated with closing stomata?', ['It increases wind around the leaf.', 'It prevents roots from absorbing minerals.', 'It makes soil evaporate more rapidly.', 'It can conserve water but limit carbon dioxide uptake.']),
        item(11, 'm2-at3', 'Why does the professor list sunlight, humidity, and wind?', ['To identify the only conditions in which plants grow', 'To explain why roots do not need water', 'To show that transpiration rate varies with conditions', 'To define the structure of a stoma']),
        item(11, 'm2-at4', 'What is the main point of the talk?', ['Leaf water loss connects plant processes with the water cycle.', 'Every plant releases water at the same constant rate.', 'Transpiration occurs only when soil is completely dry.', 'Plants obtain all carbon dioxide through their roots.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET12 = fixedListeningSet(12, {
  module1ChooseAdditions: [
    fixedListeningChoose(12, 'm1', 6, 'man', 'Why did the study group change its meeting time?', ['The group studies in the library.', 'The meeting lasts ninety minutes.', 'Two members have an afternoon laboratory.', 'The time is shown on the calendar.']),
    fixedListeningChoose(12, 'm1', 7, 'woman', 'Would you like the receipt in the bag?', ['Yes, please. I may need to return the item.', 'The bag is made of paper.', 'I received the package yesterday.', 'The item is on the counter.']),
    fixedListeningChoose(12, 'm1', 8, 'man', 'I cannot remember the password for this account.', ['The account was created in September.', 'Use the reset link below the login box.', 'I remembered our appointment.', 'The password contains eight characters.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(12, 'm2', 1, 'woman', 'When will the gallery reopen to visitors?', ['The gallery displays local photographs.', 'Visitors enter through the courtyard.', 'The reopening celebration is free.', 'On Saturday, after the installation is finished.']),
      fixedListeningChoose(12, 'm2', 2, 'man', 'This desk seems too small for both monitors.', ['The desk was delivered flat.', 'We can put one monitor on the side table.', 'Both monitors have bright screens.', 'The smaller office is upstairs.']),
      fixedListeningChoose(12, 'm2', 3, 'woman', 'Did you find out who is teaching the summer course?', ['Yes, Professor Malik is listed as the instructor.', 'The course meets during the summer.', 'I found the classroom on a map.', 'The instructor published a new article.']),
      fixedListeningChoose(12, 'm2', 4, 'man', 'Could you hold the elevator for a moment?', ['The elevator was inspected last month.', 'I am carrying a heavy package.', 'Of course. I will keep the door open.', 'The moment passed quickly.']),
      fixedListeningChoose(12, 'm2', 5, 'woman', 'Why is Nina returning to the computer lab?', ['The laboratory has new computers.', 'Nina returned the book already.', 'Her computer screen is larger.', 'She forgot to save the file to her drive.']),
      fixedListeningChoose(12, 'm2', 6, 'man', 'I expected more people at the morning presentation.', ['The presentation includes several charts.', 'Morning traffic was unusually heavy.', 'The later session may attract a larger audience.', 'I presented the report last week.']),
      fixedListeningChoose(12, 'm2', 7, 'woman', 'Where should the signed contract be delivered?', ['The contract has six pages.', 'To the legal office on the third floor.', 'I signed for the delivery.', 'The third floor is being painted.']),
      fixedListeningChoose(12, 'm2', 8, 'man', 'Do you think this jacket is warm enough?', ['It should be, if you wear a sweater underneath.', 'The jacket has two pockets.', 'I think the lecture was useful.', 'The weather warmed yesterday.']),
    ],
    conversation: fixedListeningStimulus(
      12, 'm2-conversation', 'conversation', 'Joining a community orchestra', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I would like to join the community orchestra, but I have not performed in several years. Are auditions required?

DIRECTOR: New members attend a placement session, not a competitive audition. We use a short piece to decide which part fits comfortably.

STUDENT: Do I need to bring my own music stand?

DIRECTOR: We provide stands and sheet music. Bring your instrument and arrive twenty minutes early to complete the membership form. The next placement session is Monday evening in the rehearsal hall.`,
      ['student', 'announcer'], [
        item(12, 'm2-cv1', 'What is the purpose of the placement session?', ['To find a suitable orchestra part for the student', 'To eliminate most new applicants', 'To teach members how to read music', 'To choose a new orchestra director']),
        item(12, 'm2-cv2', 'What must the student bring?', ['A music stand and sheet music', 'A completed concert program', 'The student’s instrument', 'A recording of a previous performance']),
      ],
    ),
    announcement: fixedListeningStimulus(
      12, 'm2-announcement', 'announcement', 'Recreation center locker renewal', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Annual locker rentals at the recreation center expire at the end of this month. Current renters who want to keep the same locker must renew online by Tuesday. After that deadline, unrenewed lockers will be offered to students on the waiting list. Remove personal belongings by Friday if you are not renewing. Items left behind will be held at the service desk for fourteen days.`,
      ['announcer'], [
        item(12, 'm2-an1', 'What must current renters do to keep the same locker?', ['Visit the service desk on Friday', 'Renew the rental online by Tuesday', 'Join the student waiting list', 'Remove all belongings immediately']),
        item(12, 'm2-an2', 'How long will the center hold items left behind?', ['Until Tuesday morning', 'Until the next academic year', 'For one month', 'For fourteen days']),
      ],
    ),
    academic: fixedListeningStimulus(
      12, 'm2-academic-talk', 'academic-talk', 'Coastal Upwelling', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Coastal upwelling occurs when winds move surface water away from a coast and deeper water rises to replace it. The exact motion reflects Earth’s rotation and the relationship between wind and coastline, so wind does not simply push water straight ahead. What matters for our discussion is the resulting upward movement.

Deep water is often colder and richer in nutrients than the sunlit surface water it replaces. When those nutrients reach the photic zone, phytoplankton can grow, supporting zooplankton, fish, seabirds, and marine mammals. This is why several major fishing regions occur near persistent upwelling systems. High productivity is a common outcome, not a guarantee of equal catches every year.

Upwelling also changes temperature and chemistry near the coast. Its strength and timing vary with winds and larger climate patterns. If favorable winds weaken or shift, less nutrient-rich water may reach the surface. Extremely strong or prolonged upwelling can also bring low-oxygen or more acidic deep water into coastal habitats. Scientists monitor winds, sea-surface temperature, currents, oxygen, and biological indicators rather than using one measurement alone. Coastal upwelling illustrates how atmospheric motion can reorganize the ocean and influence an entire food web.`,
      ['professor'], [
        item(12, 'm2-at1', 'What causes coastal upwelling?', ['Rivers add warm water to the ocean.', 'Fish carry nutrients toward the coast.', 'Deep water freezes and expands upward.', 'Surface water moves away and deeper water replaces it.']),
        item(12, 'm2-at2', 'Why can upwelling regions be biologically productive?', ['Nutrient-rich water reaches the sunlit zone.', 'Cold water prevents all organisms from moving.', 'The wind directly feeds marine mammals.', 'Surface water becomes free of phytoplankton.']),
        item(12, 'm2-at3', 'What qualification does the professor make about fishing?', ['Every upwelling event produces the same catch.', 'Fishing stops whenever water is cold.', 'High productivity does not guarantee equal catches each year.', 'Only seabirds benefit from upwelling.']),
        item(12, 'm2-at4', 'Why do scientists monitor several kinds of evidence?', ['Wind is unrelated to coastal water.', 'Upwelling varies and affects multiple ocean conditions.', 'One temperature reading predicts every biological response.', 'Currents can be measured only from fishing boats.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET13 = fixedListeningSet(13, {
  module1ChooseAdditions: [
    fixedListeningChoose(13, 'm1', 6, 'woman', 'Is there any chance you could cover my shift tonight?', ['The night shift ends at ten.', 'I covered the table with a cloth.', 'Your shift starts after mine.', 'I can, if you trade with me on Friday.']),
    fixedListeningChoose(13, 'm1', 7, 'man', 'I wonder whether this bus stops near the stadium.', ['The stadium holds twenty thousand people.', 'Let us ask the driver before we board.', 'The bus stopped at a red light.', 'I wonder who won the game.']),
    fixedListeningChoose(13, 'm1', 8, 'woman', 'Could I borrow the conference room projector?', ['Yes, but reserve it through the equipment system.', 'The conference room is occupied.', 'I borrowed a novel from the library.', 'The projector uses a bright lamp.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(13, 'm2', 1, 'man', 'How did you hear about the volunteer position?', ['The position begins in May.', 'I heard the speaker clearly.', 'A classmate sent me the announcement.', 'The volunteers wear blue shirts.']),
      fixedListeningChoose(13, 'm2', 2, 'woman', 'The office plants look much healthier now.', ['The new watering schedule seems to be working.', 'The plants are beside the window.', 'My office is on the fourth floor.', 'Health insurance forms are online.']),
      fixedListeningChoose(13, 'm2', 3, 'man', 'Where can I store my suitcase during the tour?', ['The suitcase has a broken wheel.', 'The tour ends at the museum.', 'I stored the data on a drive.', 'There are lockers beside the ticket counter.']),
      fixedListeningChoose(13, 'm2', 4, 'woman', 'Did the restaurant change our reservation time?', ['The restaurant is across the river.', 'Yes, they moved it from seven to seven thirty.', 'I changed my order at lunch.', 'The reservation is for four people.']),
      fixedListeningChoose(13, 'm2', 5, 'man', 'Would you mind explaining the last equation again?', ['The equation appears in the textbook.', 'The last class ended early.', 'Not at all. Which step was unclear?', 'I explained the result in writing.']),
      fixedListeningChoose(13, 'm2', 6, 'woman', 'Why has the walking path been closed?', ['Workers are repairing a damaged bridge.', 'The path follows the river.', 'I walked home after class.', 'The bridge is made of wood.']),
      fixedListeningChoose(13, 'm2', 7, 'man', 'I cannot attend the training session on Monday.', ['The training covers laboratory safety.', 'Monday is the first workday.', 'I attended last year’s session.', 'There is another session on Wednesday.']),
      fixedListeningChoose(13, 'm2', 8, 'woman', 'Who should approve the final design?', ['The design uses three colors.', 'The project manager has final approval.', 'I finally finished the drawing.', 'The manager’s office was redesigned.']),
    ],
    conversation: fixedListeningStimulus(
      13, 'm2-conversation', 'conversation', 'Replacing a damaged library book', CONVERSATION_INSTRUCTIONS,
      `STUDENT: A library book in my backpack was damaged when my water bottle leaked. I want to replace it.

LIBRARIAN: Thank you for reporting it. Please do not buy a copy yet, because the library needs the same edition and binding.

STUDENT: How will I know what to order?

LIBRARIAN: I will check whether our supplier can replace it. If so, you will pay the supplier’s price through your library account. If that edition is unavailable, the collections librarian will choose an equivalent rather than asking you to find one.`,
      ['student', 'announcer'], [
        item(13, 'm2-cv1', 'Why should the student not buy a replacement immediately?', ['The library requires a specific edition and binding.', 'The damaged book can never be replaced.', 'The student’s account has been closed.', 'The supplier accepts only cash.']),
        item(13, 'm2-cv2', 'What will happen if the same edition is unavailable?', ['The student must search used bookstores.', 'The damage fee will automatically double.', 'A librarian will choose an equivalent replacement.', 'The student may keep the damaged book without action.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      13, 'm2-announcement', 'announcement', 'Outdoor film weather plan', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: Tonight’s outdoor film is still scheduled for eight p.m. on the central lawn. Staff will make a final weather decision at six. If rain is expected, the screening will move to the student center ballroom, where seating is limited to the first two hundred guests. Check the event page before leaving home. Food may be brought to the lawn but not into the ballroom.`,
      ['announcer'], [
        item(13, 'm2-an1', 'When will staff make the final weather decision?', ['At the beginning of the film', 'After the first guests arrive', 'At eight p.m.', 'At six p.m.']),
        item(13, 'm2-an2', 'What restriction applies if the film moves indoors?', ['Guests must buy a second ticket.', 'Food cannot be brought into the ballroom.', 'The film will begin two hours earlier.', 'Only staff may view the event page.']),
      ],
    ),
    academic: fixedListeningStimulus(
      13, 'm2-academic-talk', 'academic-talk', 'Volcanic Ash and Aviation', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: Volcanic ash is not the soft residue produced by a wood fire. It consists of tiny fragments of rock, minerals, and volcanic glass created during an eruption. Winds can carry these abrasive particles hundreds of kilometers from the volcano and place them at the same altitudes used by aircraft.

An ash cloud presents several hazards. Particles can reduce visibility, scratch windshields, contaminate instruments, and enter jet engines. Inside a hot engine, some ash can melt and then stick to cooler components, disrupting airflow. Engines may lose power or shut down. Even a lower-concentration encounter can accelerate wear, so the absence of an immediate failure does not mean there was no damage.

Avoidance is the central protection because pilots may not reliably distinguish ash from an ordinary cloud and onboard weather radar is not designed simply to identify every ash plume. Volcano observatories report eruptions; satellites, ground observations, and atmospheric models help track and forecast plume movement; specialized advisory centers distribute warnings. Uncertainty about particle concentration and height remains, so routes or airports may be changed as a precaution. The response depends on coordinated evidence, not on a pilot waiting to see ash through the window.`,
      ['professor'], [
        item(13, 'm2-at1', 'What is volcanic ash composed of?', ['Small fragments of rock, minerals, and volcanic glass', 'Only smoke and condensed water', 'Soft material identical to fireplace ash', 'Frozen droplets produced inside aircraft engines']),
        item(13, 'm2-at2', 'How can ash affect a jet engine?', ['It always cools the engine safely.', 'It makes fuel more efficient.', 'Melted material can stick to components and disrupt airflow.', 'It prevents particles from entering the aircraft.']),
        item(13, 'm2-at3', 'Why is avoidance the central protection?', ['Ash clouds occur only directly above a volcano.', 'Ash may be hard to recognize and can damage aircraft.', 'Onboard radar identifies every ash particle perfectly.', 'Pilots can remove ash while flying.']),
        item(13, 'm2-at4', 'What is the professor’s main point about warnings?', ['One visual observation is always sufficient.', 'Airports never need precautionary changes.', 'Only volcano observatories contribute information.', 'Coordinated observations and forecasts reduce encounter risk.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET14 = fixedListeningSet(14, {
  module1ChooseAdditions: [
    fixedListeningChoose(14, 'm1', 6, 'man', 'Why is the seminar room unavailable this morning?', ['The seminar discusses city planning.', 'A video conference is using it.', 'Morning classes begin at nine.', 'The room has twenty seats.']),
    fixedListeningChoose(14, 'm1', 7, 'woman', 'Could you remind me which chapter we are discussing?', ['The discussion was interesting.', 'I read the chapter twice.', 'The reminder is on my calendar.', 'Chapter six, the one about migration.']),
    fixedListeningChoose(14, 'm1', 8, 'man', 'The delivery arrived earlier than the tracking page predicted.', ['The page displays a map.', 'I tracked my expenses yesterday.', 'That is convenient; someone is still at reception.', 'The delivery contains office chairs.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(14, 'm2', 1, 'woman', 'Where should I return the visitor badge?', ['Place it in the box beside the exit.', 'The badge has a blue stripe.', 'Visitors sign in at this desk.', 'The exit opens onto the courtyard.']),
      fixedListeningChoose(14, 'm2', 2, 'man', 'I am concerned that the plants will dry out over the break.', ['The break begins on Friday.', 'Dry soil is lighter in color.', 'I arranged for the custodian to water them.', 'The plants grow near the window.']),
      fixedListeningChoose(14, 'm2', 3, 'woman', 'Did you ask for permission to record the interview?', ['The recording lasts thirty minutes.', 'Yes, and the participant signed the consent form.', 'I asked the first interview question.', 'Permission was written in pencil.']),
      fixedListeningChoose(14, 'm2', 4, 'man', 'When can I collect the repaired bicycle?', ['The repair required a new chain.', 'I collect old bicycle posters.', 'The shop is near campus.', 'It will be ready after three today.']),
      fixedListeningChoose(14, 'm2', 5, 'woman', 'This room is colder than it was yesterday.', ['Someone may have changed the thermostat.', 'The room faces the northern courtyard.', 'Yesterday’s meeting ended late.', 'I wore a warmer coat.']),
      fixedListeningChoose(14, 'm2', 6, 'man', 'Would you send me the notes from the committee meeting?', ['The committee has nine members.', 'Certainly. I will attach them to an email.', 'The meeting took place upstairs.', 'I sent the package this morning.']),
      fixedListeningChoose(14, 'm2', 7, 'woman', 'How did the students respond to the new assignment?', ['The assignment is due Friday.', 'The students wrote short responses.', 'Most seemed interested in the topic.', 'The new classroom has better lighting.']),
      fixedListeningChoose(14, 'm2', 8, 'man', 'I am sorry, but the vegetarian sandwiches are gone.', ['The sandwiches were on this tray.', 'Vegetarian meals include no meat.', 'I ordered lunch before noon.', 'That is fine. I will have the salad instead.']),
    ],
    conversation: fixedListeningStimulus(
      14, 'm2-conversation', 'conversation', 'Rescheduling a laboratory orientation', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I registered for tomorrow’s laboratory orientation, but my train was cancelled and I will not reach campus in time.

TECHNICIAN: There is another session Friday morning. I can move your registration if space remains.

STUDENT: My first experiment is Thursday afternoon. Could I attend that class before orientation?

TECHNICIAN: No. The safety orientation is required before entering the laboratory. Contact your instructor today; the experiment can be completed during Friday’s make-up period after your orientation.`,
      ['student', 'announcer'], [
        item(14, 'm2-cv1', 'Why will the student miss tomorrow’s orientation?', ['The laboratory is being repaired.', 'The student forgot to register.', 'The experiment was cancelled.', 'The student’s train was cancelled.']),
        item(14, 'm2-cv2', 'What must the student do before entering the laboratory?', ['Complete the experiment online', 'Attend the safety orientation', 'Buy new laboratory equipment', 'Speak to the train company']),
      ],
    ),
    announcement: fixedListeningStimulus(
      14, 'm2-announcement', 'announcement', 'Weekend parking restriction', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: The west parking lot will close at ten p.m. Friday for resurfacing and will remain closed through Sunday evening. Vehicles left there after ten will be moved to the north lot. Weekend permit holders may use the north or stadium lots at no additional charge. The accessible spaces beside the administration building will remain open. Normal parking resumes Monday at six a.m.`,
      ['announcer'], [
        item(14, 'm2-an1', 'What will happen to vehicles left in the west lot?', ['They will be moved to the north lot.', 'Their permits will be cancelled.', 'They must remain until Monday.', 'They will be moved beside the administration building.']),
        item(14, 'm2-an2', 'When will normal parking resume?', ['On Friday at ten p.m.', 'On Sunday afternoon', 'On Monday at six a.m.', 'After the next weekend']),
      ],
    ),
    academic: fixedListeningStimulus(
      14, 'm2-academic-talk', 'academic-talk', 'Seasonal Lake Turnover', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: In many temperate lakes, summer sunlight warms the surface water. Warm water is less dense than the colder water below, so the lake separates into layers that resist mixing. This condition is thermal stratification. Wind may mix the upper layer, but the density difference limits exchange with deeper water.

Organisms continue using oxygen in the deep layer while little new oxygen arrives from the atmosphere. Oxygen can therefore decline near the bottom, especially where decomposition consumes it rapidly. The amount of decline varies with lake depth, productivity, water clarity, weather, and other local conditions; stratification does not make every lake bottom oxygen-free.

In autumn, the surface cools. As the density difference becomes smaller, wind can mix water through much more of the lake. This fall turnover redistributes oxygen and nutrients. A similar mixing period can occur in spring after ice melts and surface water changes temperature. Turnover is not the lake physically flipping upside down, nor is it caused by one calendar date. It describes mixing made possible when temperature and density differences weaken. Monitoring temperature and dissolved oxygen at several depths helps scientists see when layers form, how long they persist, and how conditions differ among lakes.`,
      ['professor'], [
        item(14, 'm2-at1', 'Why does a lake often form layers in summer?', ['Wind stops moving over the water.', 'Warm surface water is less dense than colder deep water.', 'Deep water receives more sunlight.', 'All dissolved oxygen moves into the sediment.']),
        item(14, 'm2-at2', 'Why can oxygen decline in the deep layer?', ['The deep water always becomes warmer than the surface.', 'Autumn winds remove oxygen from the entire lake.', 'Ice adds too many nutrients to the bottom.', 'Organisms use oxygen while limited mixing replaces little of it.']),
        item(14, 'm2-at3', 'What allows fall turnover to occur?', ['Cooling reduces the density difference between layers.', 'The lake bottom rises toward the surface.', 'Sunlight permanently stops reaching the lake.', 'Every organism moves into shallow water.']),
        item(14, 'm2-at4', 'Why do scientists measure several depths?', ['One surface reading describes every part of every lake.', 'Turnover happens on exactly the same date each year.', 'Layering and oxygen conditions vary through depth and time.', 'Temperature has no relationship to water density.']),
      ],
    ),
  },
});

export const TOEFL_FIXED_LISTENING_SET15 = fixedListeningSet(15, {
  module1ChooseAdditions: [
    fixedListeningChoose(15, 'm1', 6, 'woman', 'Have you seen the updated conference program?', ['Yes, the afternoon panel has a new speaker.', 'The program was printed on thick paper.', 'I saw the conference center yesterday.', 'The update took several minutes.']),
    fixedListeningChoose(15, 'm1', 7, 'man', 'Why did Leo bring an extra extension cord?', ['The cord is ten meters long.', 'The outlets may be too far from the display.', 'Leo extended his visit by a day.', 'The display uses little power.']),
    fixedListeningChoose(15, 'm1', 8, 'woman', 'Could you let me know when the director arrives?', ['The director’s office is locked.', 'I arrived before the others.', 'The meeting begins at noon.', 'Certainly. I will send you a message.']),
  ],
  module2: {
    choose: [
      fixedListeningChoose(15, 'm2', 1, 'man', 'Who should receive the completed survey forms?', ['The survey contains ten questions.', 'I completed the forms yesterday.', 'Give them to the research coordinator.', 'The coordinator received an award.']),
      fixedListeningChoose(15, 'm2', 2, 'woman', 'I did not expect the trail to be this muddy.', ['The trail crosses a small bridge.', 'I expected a longer walk.', 'Mud covered the bottom of my shoes.', 'It must have rained here last night.']),
      fixedListeningChoose(15, 'm2', 3, 'man', 'Would you mind turning the projector slightly?', ['Not at all. Tell me when the image is centered.', 'The projector belongs to the department.', 'The image shows a mountain range.', 'I turned in the assignment.']),
      fixedListeningChoose(15, 'm2', 4, 'woman', 'Where can I find the minutes from last month’s meeting?', ['The meeting lasted sixty minutes.', 'They are saved in the shared project folder.', 'Last month was unusually busy.', 'I found the folder under the table.']),
      fixedListeningChoose(15, 'm2', 5, 'man', 'Why are you replacing the batteries already?', ['The batteries are in the top drawer.', 'I replaced the keyboard last year.', 'The recorder keeps shutting off unexpectedly.', 'The replacement cost was low.']),
      fixedListeningChoose(15, 'm2', 6, 'woman', 'The registration page will not accept my address.', ['The page includes a campus map.', 'I registered for two workshops.', 'My address changed last month.', 'Try entering the postal code without a space.']),
      fixedListeningChoose(15, 'm2', 7, 'man', 'How long will the temporary exhibit remain open?', ['The exhibit is near the entrance.', 'Until the end of the semester.', 'It took an hour to install.', 'The museum remains open late.']),
      fixedListeningChoose(15, 'm2', 8, 'woman', 'Did the mechanic identify the unusual noise?', ['Yes, a loose cover was vibrating.', 'The mechanic works near the station.', 'The noise became louder yesterday.', 'I identified three bird calls.']),
    ],
    conversation: fixedListeningStimulus(
      15, 'm2-conversation', 'conversation', 'Changing a meal-plan selection', CONVERSATION_INSTRUCTIONS,
      `STUDENT: I selected the largest meal plan when I moved into residence, but I eat off campus on weekends and have many meals left.

STAFF MEMBER: You may switch to the medium plan during the adjustment period, which ends Wednesday.

STUDENT: Will the unused meals transfer to the new plan?

STAFF MEMBER: The system will first calculate what you have already used. Any payment difference will appear as a credit on your student account within five business days. Submit the online change form before midnight Wednesday.`,
      ['student', 'announcer'], [
        item(15, 'm2-cv1', 'Why does the student want to change meal plans?', ['The student has many meals remaining.', 'The dining hall closes every weekend.', 'The largest plan is no longer offered.', 'The student is moving out of residence.']),
        item(15, 'm2-cv2', 'What will happen to a payment difference?', ['It must be paid in cash immediately.', 'It will purchase weekend meals automatically.', 'It will appear as a credit on the student account.', 'It will be sent to the residence office.']),
      ],
    ),
    announcement: fixedListeningStimulus(
      15, 'm2-announcement', 'announcement', 'Chemistry tutoring location', ANNOUNCEMENT_INSTRUCTIONS,
      `ANNOUNCER: This evening’s chemistry tutoring has moved from Science Room 105 to Library Room 214 because the laboratory ventilation system is being tested. The session still begins at six thirty and requires no registration. Enter the library through its east door after six. Students may bring current problem sets, but tutors will not review completed take-home examinations.`,
      ['announcer'], [
        item(15, 'm2-an1', 'Where will chemistry tutoring take place?', ['In Science Room 105', 'In Library Room 214', 'At the laboratory entrance', 'In the library’s west hall']),
        item(15, 'm2-an2', 'What will tutors not review?', ['Current problem sets', 'Questions about ventilation', 'Library registration forms', 'Completed take-home examinations']),
      ],
    ),
    academic: fixedListeningStimulus(
      15, 'm2-academic-talk', 'academic-talk', 'Finding Exoplanets by Transit', ACADEMIC_INSTRUCTIONS,
      `PROFESSOR: The transit method detects exoplanets without resolving their images. A transit occurs when a planet passes between its star and the observer. The planet blocks a small fraction of starlight, creating a dip in a graph of brightness over time called a light curve.

Repeated dips at regular intervals can reveal the planet’s orbital period. The depth of a dip, interpreted with the star’s size, helps estimate the planet’s radius: a larger planet generally blocks a larger fraction of light. A transit can also support studies of an atmosphere because some wavelengths of starlight pass through gases around the planet differently.

The method has selection effects. The orbit must be aligned so the planet crosses the star from our viewpoint. Many planets never transit as seen from Earth. Short-period planets produce more events during a limited campaign, and large planets create deeper, easier-to-detect dips. Other phenomena, including eclipsing stars or changes on a star’s surface, can mimic a planetary signal. Astronomers therefore seek repeated events and use follow-up observations or other methods to validate candidates. Transit surveys monitor many stars consistently, but their discoveries are not an unbiased sample of planetary systems.`,
      ['professor'], [
        item(15, 'm2-at1', 'What happens during an exoplanet transit?', ['A star passes between a planet and the observer.', 'The planet emits a sudden flash of visible light.', 'The planet permanently changes its star’s size.', 'A planet blocks a small fraction of its star’s light.']),
        item(15, 'm2-at2', 'What can the time between repeated dips indicate?', ['The planet’s orbital period', 'The exact composition of the star', 'The distance from Earth to every planet', 'The number of moons around the planet']),
        item(15, 'm2-at3', 'Why are short-period planets easier for a limited survey to detect?', ['They are always larger than long-period planets.', 'They never need follow-up observations.', 'They produce more repeated transits during the survey.', 'Their stars have no surface changes.']),
        item(15, 'm2-at4', 'What limitation of the transit method does the professor emphasize?', ['It can detect planets in every orbital orientation.', 'It favors aligned, often larger or short-period planets.', 'It produces a detailed image of each planet.', 'It cannot measure changes in a star’s brightness.']),
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
