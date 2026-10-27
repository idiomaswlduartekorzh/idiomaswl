import type { MockExam } from '@/data/mocks/types';

const mock: MockExam = {
  "id": "set-23",
  "examSlug": "ielts",
  "title": "IELTS Academic Set 23",
  "subtitle": "A Beam with a Signature · Listening to the Body: What Exactly Is Measured? · When a Sensor Is Designed to Vanish",
  "timeMinutes": 164,
  "sections": [
    {
      "part": 1,
      "skill": "listening",
      "title": "Listening — Part 1: everyday social dialogue",
      "instructions": "1-6: Complete the form below. Write NO MORE THAN TWO WORDS AND/OR A NUMBER for each answer.\n7-10: Complete the sentences below. Write NO MORE THAN TWO WORDS for each answer.",
      "transcript": "RHYS: Good afternoon, Cwm Lane Costume Store. Rhys Llewellyn speaking. How can I help?\nCARYS: Hello, Rhys. I’m Carys Morgan from the Penylan Players. We are staging a play next month, and I need to hire one costume for myself. I filled in most of the online enquiry, but the director changed my part this morning.\nRHYS: No problem. I can update the hire form while we talk. The company sent an enquiry headed The Duchess, although I also saw a note about The Tempest. Which production is this costume actually for?\nCARYS: The Duchess was cancelled. Please enter The Tempest; that is the production opening in October.\nRHYS: Thanks. Your first message said you were playing the ship’s captain. Has that changed as well? We have several naval coats, but the cut depends on whether the character is an officer or a working sailor.\nCARYS: Yes. Another actor is the captain now. I’m the boatswain, the sailor who directs the deck crew, so the clothes should look practical rather than grand.\nRHYS: That helps. For that period I could offer heavy trousers, a short wool jacket and an oilskin coat. The jacket photographs well, but it is quite warm under stage lights. Which single outer garment does your designer want us to reserve?\nCARYS: The oilskin coat, please. The director wants its wet-weather look for the opening scene. We will supply the trousers ourselves.\nRHYS: Fine. I have your height from the form, but not your waist. Please give the body measurement, not the size printed inside your everyday jeans, because costume labels vary enormously.\nCARYS: I wrote eighty-four centimetres last year. I measured again today and it is eighty-six, so record 86 centimetres.\nRHYS: Now the fitting. I initially offered Tuesday the seventeenth of September, but our alterations volunteer will be at another theatre that day. We have Wednesday the eighteenth or Friday the twentieth instead.\nCARYS: Wednesday is better because rehearsal begins later. Let’s make the fitting 18 September.\nRHYS: On Wednesday I can see you at four o’clock or half past four. The earlier slot gives you more time, though the fitting itself normally takes only twenty minutes.\nCARYS: I teach until four, so I could not cross town in time. Please book 4:30.\nRHYS: Done. Let me explain the collection and return conditions. You pay a deposit when you collect the outfit. Returning it by the agreed Monday is important, but the date alone does not release the money.\nCARYS: So the deposit stays with you until someone has looked at the costume?\nRHYS: Exactly. We release it after a damage check. Ordinary stage dust is expected, but tears, missing fasteners or permanent marks have to be recorded first.\nCARYS: The designer may also borrow your sea boots. Should we polish them before bringing them back?\nRHYS: No polish, please, because it can change the finish. Wipe away loose dirt and keep the boots dry. If they come back wet inside, the leather can distort while they are stored.\nCARYS: Understood. There is a broad sailor’s hat in the photograph. Can that travel with the coat on a hanger?\nRHYS: The coat can hang in its cover, but the hat must not be crushed. Carry that piece in the hat box we provide, even on the short journey from the store to the theatre.\nCARYS: And if our final performance runs late, shall I message you personally before the Monday return?\nRHYS: I may be away with another production. Contact the wardrobe office instead. That team can extend the booking in the system and tell you whether another group is waiting for the same pieces.\nCARYS: Great. I have the updated title, my new role, the measurements and all the care instructions. I’ll bring the deposit card to the fitting.\nRHYS: Perfect. I’ll email the revised booking this afternoon. If the director adds any accessories, reply before your appointment so we can have them ready.",
      "audioUrl": "/audio/ielts/ielts-listening-set-23.mp3",
      "mediaId": "ielts-set-23-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q01",
          "part": 1,
          "text": "Production: ______",
          "answers": [
            "the tempest",
            "The Tempest"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q02",
          "part": 1,
          "text": "Role played: ______",
          "answers": [
            "boatswain"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q03",
          "part": 1,
          "text": "Main costume item: ______",
          "answers": [
            "oilskin coat"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q04",
          "part": 1,
          "text": "Waist measurement: ______ cm",
          "answers": [
            "86",
            "86 cm",
            "86 centimetres",
            "86 centimeters"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q05",
          "part": 1,
          "text": "Fitting date: ______",
          "answers": [
            "18 September",
            "18th September",
            "September 18",
            "September 18th",
            "18/9",
            "18.09",
            "18 september"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q06",
          "part": 1,
          "text": "Fitting time: ______",
          "answers": [
            "4:30",
            "4.30",
            "4 30",
            "16:30",
            "16.30",
            "16 30"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q07",
          "part": 1,
          "text": "The deposit is released after a ______.",
          "answers": [
            "damage check"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q08",
          "part": 1,
          "text": "The hired boots must be kept ______.",
          "answers": [
            "dry"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q09",
          "part": 1,
          "text": "The borrowed hat should be carried in its ______.",
          "answers": [
            "hat box"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q10",
          "part": 1,
          "text": "If the return will be late, Carys must contact the ______.",
          "answers": [
            "wardrobe office"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 2,
      "skill": "listening",
      "title": "Listening — Part 2: everyday social monologue",
      "instructions": "11-16: Label the map below. Choose the correct letter, A-H, for Questions 11-16.\n17-20: Which location will host each activity? Choose A-E for Questions 17-20. You may use any letter more than once.",
      "transcript": "HINE: Kia ora, everyone. I’m Hine Carter, coordinator of the Te Awa Community Orchard open day. Before the gates open, I’ll explain the one-way visitor route and then match four activities with their working areas. The orchard is productive ground, not a formal park, so please follow the arrows and keep clear of taped rows.\nHINE: Look at the plan with north at the top. Visitors enter through the south gate. A boot-cleaning point is already printed just inside it; everyone brushes soil from footwear there before following the gravel path. Do not turn directly towards the packing shed on the east, because that section is the return leg.\nHINE: After the brushes, the route bends left. The first space you reach is beside the low fence in the south-west corner. That is where volunteers give the safety welcome and hand out route cards, so this is the welcome gazebo. The small square farther north is a water tank, not a public shelter.\nHINE: From the gazebo, continue north between the young apple rows until you reach the old pear tree at the central fork. The canvas structure immediately east of that tree is where specialists demonstrate joining new varieties onto rootstock, so that is the grafting tent. The larger roof on the far east belongs to the packing shed.\nHINE: Families then take the western loop. Just beyond the compost bays, the path curls through a small group of numbered trees with lift-up signs and scent boxes. That is the children’s discovery trail. The strip farther north beside the shelterbelt is closed today because pruning work is unfinished.\nHINE: The arrows next cross the top of the site. Do not enter the beehive enclosure marked by a warning triangle. The flower beds immediately south of the hives are the safe viewing area for insects; this is the pollinator garden. Staff will keep the gate between the flowers and the hives locked.\nHINE: At the north-east bend you will see the harvest barn. The long table for weighing, sorting and displaying picked fruit stands on the open apron just west of the barn. That is the harvest table. It was originally going beside the pond on the western side, but the ground there remained soft after rain, so that plan was changed.\nHINE: The return path runs south along the eastern boundary. Before you reach the exit, borrowed picking poles and baskets go back beside the tool shed. That position is the tool-return point. Please do not leave equipment at the welcome gazebo, even if that is where you collected your route card.\nHINE: Let me finish with the activity arrangements. A few locations have changed since the first programme was circulated, mainly because some sessions need shelter or specialist equipment, so please use the final placements I’m about to give rather than last week’s notice.\nHINE: The cider press is heavy and needs washable flooring, power and a drain. Although visitors might enjoy watching from the lawn, the actual cider-pressing demonstration will take place inside the packing shed. A viewing line will keep hands away from the moving parts.\nHINE: For the soil-health clinic, growers will bring small labelled samples and discuss texture, drainage and nutrient tests. Wind would scatter the loose material outdoors, so the advisers have moved this session into the orchard classroom. The compost yard is useful for demonstrations, but not for examining individual samples.\nHINE: Fruit that householders cannot use may be placed on the surplus table. We considered the packing shed, but that would mix private donations with produce being prepared for sale. The surplus-fruit exchange will therefore be on the picnic terrace, where donors can label items and visitors can carry them directly to the car park.\nHINE: The mulch-making workshop needs piles of chipped prunings, fallen leaves and finished compost. Those materials are already stored in the compost yard, so the session stays there. Participants will compare the ingredients but will not take material into the classroom.\nHINE: Two final practical points: wash or brush soil from shoes and tools before arriving, because pests, diseases and weed seeds can travel in mud. Please also eat only in the signed picnic areas. Windfall fruit within taped research rows is being monitored and is not available for picking.\nHINE: The one-way route brings everyone back to the eastern exit. If you need a shorter visit, ask a marshal at the central fork rather than walking against the arrows. Enjoy the orchard, and please leave enough time to return borrowed equipment before the gates close.",
      "audioUrl": "/audio/ielts/ielts-listening-set-23.mp3",
      "mediaId": "ielts-set-23-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q11",
          "part": 2,
          "text": "Welcome gazebo",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q12",
          "part": 2,
          "text": "Grafting tent",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q13",
          "part": 2,
          "text": "Children’s discovery trail",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 2,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q14",
          "part": 2,
          "text": "Pollinator garden",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 5,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q15",
          "part": 2,
          "text": "Harvest table",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 7,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q16",
          "part": 2,
          "text": "Tool-return point",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G",
            "H"
          ],
          "answer": 1,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q17",
          "part": 2,
          "text": "cider-pressing demonstration",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "answer": 1,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q18",
          "part": 2,
          "text": "soil-health clinic",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "answer": 0,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q19",
          "part": 2,
          "text": "surplus-fruit exchange",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "answer": 4,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        },
        {
          "type": "mcq",
          "id": "l-q20",
          "part": 2,
          "text": "mulch-making workshop",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E"
          ],
          "answer": 3,
          "imageUrl": "/assets/ielts/listening/set23-part2-map.svg",
          "imageAlt": "North is at the top. The south entrance is centred on the bottom edge, with a fixed boot-cleaning point immediately inside. The one-way route turns west to label A beside a low fence in the south-west corner, then goes north past compost bays and label C. Label E lies beside a pond on the west side. The route reaches a central fork around an old pear tree; label D is just east of that tree. Across the northern side, label G is beside the shelterbelt on a closed row, while label F is in flower beds south of a fenced beehive enclosure in the north-east. The harvest barn stands on the east side, with label H on its open western apron. The return route travels south along the eastern boundary past label B beside the tool shed, then reaches the exit immediately east of the entrance."
        }
      ]
    },
    {
      "part": 3,
      "skill": "listening",
      "title": "Listening — Part 3: educational discussion",
      "instructions": "21-25: Choose the correct answer, A, B or C.\n26-30: Who will be responsible for each task? Choose A, B or C for Questions 26-30. You may use any letter more than once.",
      "transcript": "HARRIET: Thanks for coming before your next tank booking. Your first wave-energy model run produced a useful pattern, but the force readings became inconsistent halfway through. I want us to separate a problem with the model from a problem with the measuring chain.\nNIA: I checked the wave-paddle programme first. The commanded heights and periods match our planning sheet, and the two wave gauges nearest the paddle show the waves were generated as requested.\nOWAIN: I wondered whether the foam model slowly absorbed water. Its mass increased by four grams after the session, though that seems too small to explain the sudden jump in the force trace.\nHARRIET: Agreed. A gradual mass change would normally give a gradual shift. What physical change did you notice at the sensor itself?\nOWAIN: When I removed the model, the upper bracket holding the force sensor had become loose. It could rock by about two millimetres. That fits the abrupt change much better than the paddle setting or the small mass gain.\nNIA: Should we print a fresh model before repeating the work? The existing one has marker lines and a few scratches from the clamps, so a new surface would look cleaner on video.\nOWAIN: Printing would take most of tomorrow, and we could paint the replacement quickly, but appearance is not really the issue. I would rather know whether tightening the bracket removes the variation.\nHARRIET: That is the stronger design. Keep the existing model for the short rerun, because changing only the measurement setup lets you isolate the fault. A new model would introduce another source of variation before you have tested the bracket explanation.\nNIA: For the wave conditions, our old table moves neatly from the lowest height to the highest and keeps each period together. It is easy for the technician to follow, but any warming or drift in the sensor would then be confused with wave size.\nOWAIN: We could reverse the order and start high. That would reveal one kind of drift, although it would still tie time to wave height.\nHARRIET: Exactly. Do not simply reverse it or group all runs by period. Use a randomised sequence, with one repeated reference condition at intervals. Then a slow change over time is less likely to imitate an effect of height or period.\nNIA: I also mounted an overhead camera. From that angle we can track how far the float moves sideways, but perspective distortion makes precise displacement difficult unless we add a calibration grid.\nOWAIN: Could the camera replace the second wave gauge? Its view includes the free surface near the model.\nHARRIET: No. Keep both gauges for water-level data. The overhead video’s main job is to check the timing of impact events against sudden peaks in the force record. Frame accuracy is adequate for that, even if position estimates remain rough.\nNIA: How much of the plan should we run before committing to the full matrix? If the model returns to the same centre mark after each test, that would at least show the mooring is stable.\nOWAIN: And the peak force should stay under the design limit, but we already expect that at the modest pilot height.\nHARRIET: Run three reference waves first. The pilot succeeds if the two wave gauges record a consistent phase relationship across those repeats. That checks the generated field and the acquisition timing before you interpret the force signal.\nHARRIET: Now let’s divide up the preparation so everything is ready before the technician arrives. We’ll take each job in turn and flag anything that needs formal approval.\nOWAIN: I loosened the sensor assembly when we packed it, so I should recalibrate the force sensor after fitting the replacement locking washer. I’ll document the zero check and the known-load check.\nNIA: I will rewrite the randomisation schedule and include the reference runs. I already have the script that shuffles conditions without putting two highest-energy cases together.\nOWAIN: The washer changes the assembly procedure. Do we need to amend the risk assessment ourselves?\nHARRIET: You can add the mechanical detail, but I must approve the revised risk assessment as supervisor before the tank technician accepts it. Send me the marked version by noon.\nNIA: While Owain works on the sensor, I can check the camera timestamps against the acquisition computer. I’ll film the same flashing clock with both systems and record any offset.\nOWAIN: Then I’ll request the wave-paddle logs from the technician. They contain the actual command and feedback traces, not just the settings we copied into the planning sheet.\nHARRIET: Good. Bring all five records to the pre-run meeting: calibration sheet, random order, approved risk assessment, camera offset and paddle log. If the pilot passes, you can proceed to the reduced matrix that afternoon.\nNIA: I’ll also label the raw files before anyone processes them, so the repeated reference runs cannot be mistaken for duplicates.\nOWAIN: And I’ll photograph the tightened bracket from both sides. If it moves again, we will have a visual record of the starting position.\nHARRIET: That is enough for this stage. The purpose of the rerun is diagnosis, not producing a perfect final graph. Keep changes limited, preserve the raw data and write down any departure from the plan as it happens.",
      "audioUrl": "/audio/ielts/ielts-listening-set-23.mp3",
      "mediaId": "ielts-set-23-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "mcq",
          "id": "l-q21",
          "part": 3,
          "text": "What do the students identify as the most likely cause of the inconsistent force readings?",
          "options": [
            "The wave paddle was programmed at the wrong height.",
            "A bracket holding the force sensor became loose.",
            "The model absorbed water during the later runs."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q22",
          "part": 3,
          "text": "Why do they decide to keep the existing model for the next session?",
          "options": [
            "It lets them isolate the measurement problem.",
            "A replacement would take too long to paint.",
            "Its scale matches a published experiment."
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q23",
          "part": 3,
          "text": "What change will they make to the order of the test conditions?",
          "options": [
            "Run the highest waves first.",
            "Group conditions by wave period.",
            "Use a randomised sequence."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q24",
          "part": 3,
          "text": "What will be the main purpose of the overhead video?",
          "options": [
            "To measure the model’s maximum displacement.",
            "To check the timing of impact events.",
            "To replace the readings from one wave gauge."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q25",
          "part": 3,
          "text": "What result will show that the short pilot has succeeded?",
          "options": [
            "The model returns to exactly the same position.",
            "The force signal remains below the design limit.",
            "Two wave gauges record a consistent phase relationship."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q26",
          "part": 3,
          "text": "recalibrate the force sensor",
          "options": [
            "A",
            "B",
            "C"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "l-q27",
          "part": 3,
          "text": "rewrite the randomisation schedule",
          "options": [
            "A",
            "B",
            "C"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q28",
          "part": 3,
          "text": "approve the revised risk assessment",
          "options": [
            "A",
            "B",
            "C"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "l-q29",
          "part": 3,
          "text": "check the camera timestamps",
          "options": [
            "A",
            "B",
            "C"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "l-q30",
          "part": 3,
          "text": "request the wave-paddle logs",
          "options": [
            "A",
            "B",
            "C"
          ],
          "answer": 1
        }
      ]
    },
    {
      "part": 4,
      "skill": "listening",
      "title": "Listening — Part 4: academic monologue",
      "instructions": "31-36: Complete the sentences below. Write ONE WORD ONLY for each answer.\n37-40: Answer the questions below. Write NO MORE THAN TWO WORDS for each answer.",
      "transcript": "LECTURER: Today we examine desert varnish: the dark brown, black or reddish film seen on exposed rocks in many arid landscapes. Despite its name, it is not a manufactured varnish and it is not the same as a thick weathering crust. It is extremely thin, often less than half a millimetre, yet it can preserve a record of processes operating over very long periods.\nLECTURER: First, where is it found? The film develops on stable rock faces that meet the atmosphere. Fresh fractures usually lack it, while older exposed sides may carry a continuous sheen. Shade, slope and the stability of the underlying rock all matter, so neighbouring exposures can look different even when they are made from the same stone.\nLECTURER: The bulk of the coating is not material leaking out of the host rock. Fine airborne dust settles on the surface, bringing clay minerals and small quantities of iron and manganese compounds. Local bedrock may influence the setting, but analyses often point to material transported through the atmosphere rather than extracted directly from the rock beneath.\nLECTURER: Colour reflects composition. Iron oxides contribute red and brown tones, while the darkest patches are associated with unusually concentrated manganese. Silicon-rich clay minerals may make up much of the film by mass, but manganese has a disproportionate visual effect. A tiny chemical fraction can therefore dominate what an observer sees.\nLECTURER: How does that concentration arise? One long-standing biological hypothesis proposes that metal-oxidising bacteria on the rock concentrate the dark element as part of their interaction with the coating. Finding biological material in a sample does not by itself prove that living cells built the entire film, but bacteria make a testable contribution to this explanation.\nLECTURER: A competing family of explanations gives more weight to non-biological chemistry. Changes in acidity, evaporation and the properties of clay surfaces may trap metal compounds without requiring organisms to construct the layer. These mechanisms are not mutually exclusive: mineral deposition can create a habitat, and biological activity can then alter what has already accumulated.\nLECTURER: Before considering specialised measurements, remember the scale of the object. The repository description calls the coating very thin: typically it is less than half a millimetre thick. A field photograph can make the dark material look substantial, but a sample cut through the surface shows how little material the analysis actually contains.\nLECTURER: That small amount must be separated conceptually from the rock beneath it. In the comparison described by the researchers, the substrate rock was sandstone. The varnish and the sandstone gave noticeably different magnetic behaviour, so treating the coating as merely the outermost colour of an unchanged substrate would miss an important distinction.\nLECTURER: The team noted that magnetic analysis had rarely been applied to desert varnish, even though iron-bearing minerals can respond strongly to such methods. Chemical composition tells us which elements are present; the magnetic approach asks which mineral phases may carry the signal. The two forms of evidence are related but not interchangeable.\nLECTURER: Their discussion refers to a demagnetization experiment in which the response of a varnish sample was compared with that of the rock beneath it. The result showed noticeable differences in magnetic properties. The experiment did not by itself settle how the coating formed; it narrowed the interpretation of the magnetic material within it.\nLECTURER: From those results, the earlier investigators proposed two candidates for the main magnetic component. The first was magnetite, an iron oxide familiar in magnetic studies. The other was maghemite, a related iron oxide presented as the alternative. Distinguishing what was said about each mineral matters because the evidence did not establish that the two labels were interchangeable.\nLECTURER: The possibility of a biological contribution attracts attention beyond terrestrial geology. Varnish-like coatings are interesting in discussions of Mars because a mineral film could, in principle, preserve chemical or textural clues about past environments. This does not mean that a dark coating is automatically a biosignature; it means the material deserves careful, contamination-aware analysis.\nLECTURER: We can now compare the hypotheses more fairly. A purely biological story must explain why mineral patterns track exposure and airborne supply. A purely inorganic story must explain the striking enrichment of certain elements and the recurring association with microbial traces. The strongest research designs test predictions from both accounts on the same samples.\nLECTURER: Sampling itself needs care. The film is thin, so a tool can easily include the underlying rock and dilute the signal. Researchers document orientation, take adjacent controls and use methods that preserve spatial relationships. A bulk chemical value without that context may conceal the difference between a surface layer and its substrate.\nLECTURER: The broader lesson is methodological. Desert varnish looks simple from a distance, but its origin involves transported particles, intermittent water, surface chemistry, possible organisms and long exposure. No single colour, element or microbe settles the debate. Progress comes from connecting measurements to explicit competing explanations while preserving the history of the sampled surface.",
      "audioUrl": "/audio/ielts/ielts-listening-set-23.mp3",
      "mediaId": "ielts-set-23-listening-master",
      "mediaStatus": "ready-existing",
      "questions": [
        {
          "type": "fill",
          "id": "l-q31",
          "part": 4,
          "text": "Desert varnish is found as a thin coating on exposed rock ______.",
          "answers": [
            "face",
            "faces"
          ]
        },
        {
          "type": "fill",
          "id": "l-q32",
          "part": 4,
          "text": "Much of its mineral material arrives as airborne ______.",
          "answers": [
            "dust"
          ]
        },
        {
          "type": "fill",
          "id": "l-q33",
          "part": 4,
          "text": "The darkest varnish contains a high concentration of ______.",
          "answers": [
            "manganese"
          ]
        },
        {
          "type": "fill",
          "id": "l-q34",
          "part": 4,
          "text": "One formation hypothesis gives an important role to ______.",
          "answers": [
            "bacteria"
          ]
        },
        {
          "type": "fill",
          "id": "l-q35",
          "part": 4,
          "text": "The coating is typically less than half a ______ thick.",
          "answers": [
            "millimetre",
            "millimeter"
          ]
        },
        {
          "type": "fill",
          "id": "l-q36",
          "part": 4,
          "text": "In the cited comparison, the underlying rock was ______.",
          "answers": [
            "sandstone"
          ]
        },
        {
          "type": "fill",
          "id": "l-q37",
          "part": 4,
          "text": "What kind of analysis had rarely been applied to desert varnish?",
          "answers": [
            "magnetic analysis",
            "magnetic"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q38",
          "part": 4,
          "text": "Which experiment revealed differences between varnish and its substrate?",
          "answers": [
            "demagnetization experiment",
            "demagnetisation experiment"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q39",
          "part": 4,
          "text": "Which mineral was described as familiar in magnetic studies?",
          "answers": [
            "magnetite"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "l-q40",
          "part": 4,
          "text": "Which planet makes possible biological explanations especially interesting?",
          "answers": [
            "mars",
            "Mars"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 5,
      "skill": "reading",
      "title": "Academic Reading — Passage 1: A Beam with a Signature",
      "passageTitle": "A Beam with a Signature",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Lighthouse illumination must satisfy two requirements: producing light and directing enough of it towards a distant mariner. A source inside a lantern sends rays in many directions, so only a portion travels towards the horizon. Increasing brightness can improve visibility, but undirected output still leaves much of the energy elsewhere. The keeper therefore faces linked tasks: maintaining the source and shaping its output. The optical challenge is to collect rays that would otherwise scatter and redirect them into a concentrated beam. A source can supply light, yet useful range depends on how effectively an apparatus controls where that light travels.\n\nB Early lighthouse lenses offered one answer, but conventional glass became thick and heavy when made large enough for a powerful station. Light was lost inside the material. In 1811, the French Commission on Lighthouses created a committee to investigate better illumination. Augustin Fresnel completed a flashing-lens design in 1822. Instead of requiring one enormous solid lens, the design divided the optical work among thinner pieces. This reduced unnecessary glass while preserving the curved action needed to bend light. The proposal mattered because it joined a solution to an optical purpose: more of the lamp's output could leave the tower as a useful beam.\n\nC The profile resembles a beehive assembled around the source. At its centre, a bull's-eye section bends rays passing through it. Above and below, concentric prisms intercept rays that travel too steeply upward or downward and redirect them towards the horizon. Each surface changes the path of light by refraction, reflection, or a combination for its position. Because the optical power is distributed across these sections, the apparatus can have a collecting area without the bulk of a solid lens. The result is concentration rather than creation: no light appears, but more travels in the direction where a navigator can see it.\n\nD A revolving installation combines optics, structure and motion. The lamp remains at the optical centre while the lens surrounds it. A flash panel contains elements that form a strong directional beam; several panels may be arranged around the lamp. The assembly rests on a roller carriage so that it can turn with little friction while keeping alignment. A lower clockwork unit supplies controlled motion. Its gearing is linked to a suspended drive weight, whose gradual descent stores and releases energy needed for rotation. The keeper raises the weight, much as a clock is wound. Operation depends on their relationship: centred illumination, correctly oriented glass and steady movement.\n\nE Rotation transforms a directional beam into a timed signal. When a panel faces an observer, a flash is seen; darkness follows as the lens turns away. The number of panels and rotational speed determine how often flashes return. Gears regulate the interval, while the support prevents irregular movement from distorting it. A station could display a sequence of light and dark periods rather than a merely bright light. Automation replaced repeated winding but did not alter the underlying logic. Whether raised by hand or powered otherwise, the mechanism must carry the optical assembly past the viewing direction at the expected moment.\n\nF The timed sequence became the light's characteristic. Mariners did not need every lighthouse to produce the same pattern; difference was useful. A chart or light list recorded a station's colour and its intervals of brightness and darkness. By observing a pattern and comparing it with that record, a crew could identify the station and relate the vessel's position to the coast. A beam extended the distance at which this identification was possible. Thus the rotating lens supported navigation in two ways: it concentrated illumination, and it organised that illumination into information. The darkness between flashes was part of the message, not simply an interruption.\n\nG Fresnel lenses were classified into orders according to size and optical scale. Large first-order apparatus served seacoasts, while smaller fifth- or sixth-order examples suited rivers and bays where the required range was shorter. The choice therefore followed the station's setting rather than a rule that larger was always better under the conditions then available. Many lenses were later removed or replaced by modern lights, yet examples survive in working towers and museums. An installation makes visible a chain of engineering decisions: thin optical elements reduce weight, a supporting frame keeps them aligned, rotation creates a signal, and the signal lets observers identify a place.",
      "questions": [
        {
          "type": "fill",
          "id": "r-q01",
          "part": 5,
          "text": "1  ____________",
          "answers": [
            "lamp"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q02",
          "part": 5,
          "text": "2  ____________",
          "answers": [
            "concentric prisms",
            "prisms"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q03",
          "part": 5,
          "text": "3  ____________",
          "answers": [
            "flash panel",
            "panel"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q04",
          "part": 5,
          "text": "4  ____________",
          "answers": [
            "roller carriage",
            "carriage"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q05",
          "part": 5,
          "text": "5  ____________",
          "answers": [
            "clockwork unit",
            "clockwork"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q06",
          "part": 5,
          "text": "6  ____________",
          "answers": [
            "drive weight",
            "weight"
          ],
          "maxWords": 2
        },
        {
          "type": "mcq",
          "id": "r-q07",
          "part": 5,
          "text": "an explanation of why the interval without light contributes to identification",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q08",
          "part": 5,
          "text": "the official investigation that preceded a major optical design",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q09",
          "part": 5,
          "text": "evidence that the appropriate apparatus size depended on location",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q10",
          "part": 5,
          "text": "a reason why producing light did not by itself solve the early problem",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q11",
          "part": 5,
          "text": "a later technological change that left the basic operating principle intact",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q12",
          "part": 5,
          "text": "how thinner pieces solved a structural problem while preserving optical action",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q13",
          "part": 5,
          "text": "two distinct navigational benefits produced by the rotating system",
          "options": [
            "A",
            "B",
            "C",
            "D",
            "E",
            "F",
            "G"
          ],
          "answer": 5
        }
      ]
    },
    {
      "part": 6,
      "skill": "reading",
      "title": "Academic Reading — Passage 2: Listening to the Body: What Exactly Is Measured?",
      "passageTitle": "Listening to the Body: What Exactly Is Measured?",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Interoception is the processing of signals that arise within the body. Such signals matter to accounts of emotion because bodily change and the interpretation of context jointly contribute to how a feeling is experienced. Yet research becomes misleading when every interoceptive measure is treated as the same ability. Accuracy concerns whether a person can detect or discriminate an internal event correctly. Attention concerns whether that event currently occupies awareness. A third construct, belief about accuracy, records what people think about their own performance. Someone may notice a heartbeat often but judge it poorly, or detect it accurately in a task without attending to it during ordinary life. The labels describe related questions, not interchangeable scores.\n\nB Heartbeat tasks illustrate the difficulty. In a counting task, participants report beats during a period without taking a pulse. The result can look like direct perception, but prior beliefs about normal heart rate and skill in estimating time may influence the count. Discrimination tasks instead ask whether an external cue is simultaneous with a heartbeat, testing a narrower judgement under conditions. Neither task reveals how frequently cardiac sensations attract attention outside the laboratory. Moreover, performance for one signal cannot be extended to hunger, respiration or temperature. A method is therefore informative only after its target has been specified: objective detection, self-reported belief, or the momentary allocation of attention.\n\nC To examine attention in daily life, one study used experience sampling rather than a single laboratory session. The participants were 107 adults. Smartphone messages arrived ten times a day for either five or seven days, with at least thirty minutes between prompts. At each daily survey, participants reported whether they had been attending to any of 21 signals. They also reported current fatigue, tension and emotional valence. As an external comparison, the survey asked about auditory attention. Repeated prompts created thousands of observations, allowing the researchers to separate differences between people from changes occurring within the same person across situations.\n\nD Internal signals captured attention in about one fifth of the observations, whereas sounds were attended to in eighty-three per cent. This contrast does not show that auditory perception was more accurate; the survey recorded whether attention was engaged. Nor was the internal category uniform. Thirst was noticed more often than heartbeat or rapid breathing, and the amount of variation across occasions differed among signals. Crucially, forty-four per cent of the variance in state interoceptive attention occurred within individuals. A person who seemed highly attentive on one occasion might be less so later. A single score can therefore conceal fluctuations associated with activity, temperature, food, social context or other changing circumstances.\n\nE The repeated reports also permitted comparison with mood at the same moment. Greater state interoceptive attention was associated with more negative valence and greater fatigue, but not with tension in the same pattern. The finding does not mean that noticing the body necessarily causes unpleasant feeling. A difficult experience might draw attention inward, an internal signal might influence mood, or both might respond to another condition. Because measurement was concurrent, causal direction remains unresolved. The result nevertheless challenges the assumption that more attention is always beneficial. Missing an important signal may be unhelpful, but constant monitoring may not be desirable either. The useful level probably depends on which signal is present and why it matters.\n\nF Trait questionnaires added another distinction. A person's trait attention report was related to state attention measured across prompts, situations and days. By contrast, belief in interoceptive accuracy was not related to those state reports in the same way. This difference should not be converted into a claim that accuracy is irrelevant to emotion. The questionnaire measured beliefs about accuracy, not objective performance, and earlier laboratory work has linked behavioural accuracy measures with emotional experience. The cautious conclusion is structural: attention, objective accuracy and confidence about accuracy may contribute differently. Combining them into one total would erase information that could explain why two people with similar bodily sensitivity describe different emotional lives.\n\nG Several limits shape interpretation. The sample was largely young, white and based in the United Kingdom, so the numerical rates need not represent every population. Momentary attention was self-reported, and the design observed association rather than experimentally changing attention. Even so, repeated measurement offers an advantage over a single visit because it exposes within-person movement over time that a one-off average cannot show. Future studies can add behavioural tasks, physiological recordings and more diverse samples, but they should preserve the distinction between constructs. They should also collect repeated observations with care if their question concerns a fluctuating state. Better measurement will not come from declaring one universal interoceptive score; it will come from matching the measure to the precise research claim.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q14",
          "part": 6,
          "text": "What is the main distinction made in paragraph A?",
          "options": [
            "Related interoceptive measures can address distinct kinds of research question.",
            "The three measures tend to converge when bodily signals are strong.",
            "Beliefs about accuracy provide a practical substitute for task performance.",
            "Attention is most informative when it is measured in ordinary life."
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q15",
          "part": 6,
          "text": "Why does the writer compare two heartbeat tasks?",
          "options": [
            "To explain why heartbeat counting is better suited to daily-life research.",
            "To show that cardiac tasks can be shaped by timing skills.",
            "To illustrate why a method must be linked to its intended target.",
            "To argue that cardiac tasks should be extended to hunger and temperature."
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q16",
          "part": 6,
          "text": "What was an advantage of the study design in paragraph C?",
          "options": [
            "It compared heartbeat accuracy with several other internal signals.",
            "It sampled participants many times in their everyday settings.",
            "It removed participants’ daily context from the self-reports.",
            "It collected responses at fixed thirty-minute intervals."
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q17",
          "part": 6,
          "text": "What does the writer emphasise about the percentages in paragraph D?",
          "options": [
            "They compare how precisely sounds and internal signals were detected.",
            "They describe typical differences between younger and older participants.",
            "They suggest the internal signals attracted attention at broadly similar rates.",
            "They concern whether attention was engaged, not the quality of detection."
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q18",
          "part": 6,
          "text": "How does the writer interpret the mood finding?",
          "options": [
            "It complicates the claim that greater attention is necessarily more beneficial.",
            "It indicates that inward attention is the likely cause of negative mood.",
            "It places tension alongside fatigue as part of the same association.",
            "It suggests the association is independent of the internal signal involved."
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q19",
          "part": 6,
          "text": "What caution is made in paragraph F?",
          "options": [
            "Trait reports become comparable with state reports after both are averaged.",
            "Behavioural accuracy measures are less relevant than questionnaire measures.",
            "A state-attention score should include confidence about performance.",
            "A belief measure should not be treated as objective performance."
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q20",
          "part": 6,
          "text": "Which statement best expresses the conclusion of paragraph G?",
          "options": [
            "Repeated surveys can compensate for limited demographic diversity.",
            "Physiological recordings should replace momentary self-reports in later studies.",
            "Measures should be selected to fit the claim being tested.",
            "A broad score is useful when several interoceptive constructs are combined."
          ],
          "answer": 2
        },
        {
          "type": "fill",
          "id": "r-q21",
          "part": 6,
          "text": "Heartbeat counts may partly reflect a participant's skill in ______.",
          "answers": [
            "estimating time"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q22",
          "part": 6,
          "text": "The repeated surveys asked about ______ rather than only one internal sensation.",
          "answers": [
            "21 signals",
            "twenty-one signals"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q23",
          "part": 6,
          "text": "The external comparison recorded by the surveys was ______.",
          "answers": [
            "auditory attention"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q24",
          "part": 6,
          "text": "Greater momentary internal attention occurred with more fatigue and more ______.",
          "answers": [
            "negative valence"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q25",
          "part": 6,
          "text": "Daily state reports were related to the general questionnaire measure of ______.",
          "answers": [
            "trait attention"
          ],
          "maxWords": 2
        },
        {
          "type": "fill",
          "id": "r-q26",
          "part": 6,
          "text": "Research on changing states should gather ______ with care.",
          "answers": [
            "repeated observations"
          ],
          "maxWords": 2
        }
      ]
    },
    {
      "part": 7,
      "skill": "reading",
      "title": "Academic Reading — Passage 3: When a Sensor Is Designed to Vanish",
      "passageTitle": "When a Sensor Is Designed to Vanish",
      "sectionStyle": "reading",
      "instructions": "Read the passage and answer the questions. Follow the instruction and word limit shown for each item.",
      "passage": "A Some electronic sensors are useful only briefly. A device placed inside healing tissue may be difficult to retrieve without another operation; a sensor dispersed through a crop field may cost more to collect than to install. Transient electronics addresses such cases by designing circuits that function for a limited period and then disintegrate or dissolve. That distinction limits the claim. A short-lived device is not a universal answer to electronic waste, since many products can be repaired, reused or collected efficiently. Transience is strongest where retrieval itself creates risk, labour or environmental disturbance. Even there, a device must satisfy two separate tests: it must perform long enough, and what follows must be acceptably safe.\n\nB The first test creates a timing problem. A pressure sensor that loses calibration during treatment has failed even if every component later disappears. Designers therefore need a defined service window: the period in which conductors, sensing layers, power sources and encapsulation maintain performance. Stability is not the enemy of transience; it is a requirement. The engineering task is to hold several degradation processes back until the work is complete, then allow them to proceed at a useful rate. Because different layers admit water, fracture or corrode differently, the failure of one component may end the device before the rest changes visibly. Claims about lifetime consequently require functional measurements, not merely photographs showing that an object remained present on an earlier day.\n\nC Timing also depends on the trigger. Water can enter a protective layer and start hydrolysis; heat, light, acidity or biological activity may accelerate other reactions. A trigger suitable for one setting can be unreliable in another. Humidity, ions and sunlight vary by setting. Encapsulation can postpone contact with the trigger, but adding a barrier changes thickness, flexibility and the eventual residue. A designer must therefore match the trigger and protective structure to the intended environment rather than advertise a material's fastest reported decay. Control is especially difficult when storage, transport and use expose the device to similar conditions. Premature activation and indefinite persistence are opposite failures produced by the same poorly defined boundary.\n\nD The second test begins when the device can no longer be seen. Physical disappearance is not chemical harmlessness. A film may break into fragments too small for the eye, while electrodes release metal ions or polymers leave persistent derivatives. Components that appear benign separately can also interact during degradation and form complexes absent from tests of the individual materials. Analysis of degradable sensors found that visual dissolution did not settle the identity or toxicity of the products remaining in solution. This changes the appropriate endpoint. Mass loss and photographs are useful observations, but neither proves that the surrounding medium has returned to its prior condition. Researchers need chemical identification, concentration data and toxicological evidence for the products, including those formed slowly after the visible structure has gone.\n\nE Laboratory demonstrations can exaggerate certainty if their conditions are mistaken for the field. A small sample immersed in a warm, continuously mixed buffer experiences stable contact with a liquid of known acidity. A device in soil may alternate between wet and dry periods, encounter microbes, bind to minerals or sit in a cool layer with little oxygen. An implant faces another combination of enzymes, flow and tissue response. Faster disappearance in a chosen solution is evidence about that experiment, not a general calendar for every destination. Field trials are not superior; they introduce variation and make some products harder to recover for analysis. The stronger strategy connects controlled studies, which isolate mechanisms, with realistic exposures that test whether those mechanisms dominate outside the vessel.\n\nF Language should reflect this evidence. Calling an entire sensor biodegradable because its substrate is cellulose ignores an electrode or conductive coating that may persist. Conversely, one durable part does not erase the value of a design if that part is intentionally recoverable after the other layers dissolve. Device-level assessment must record every component, the combinations created during manufacture and the expected route at end of life. Labels such as transient, degradable, biodegradable and sustainable answer different questions. Transient describes intended disappearance after stable operation; biodegradable refers to biological transformation under specified conditions; sustainable requires a wider account of sourcing, manufacture, lifetime and disposal. Treating these words as synonyms turns an engineering description into an unsupported environmental promise.\n\nG A credible evaluation can therefore be organised around four linked records. The function record defines performance and the service window. The environment record specifies the exposure that activates or delays change. The recovery record explains which residues, components or samples can be collected and what will remain beyond observation. Finally, the evidence record combines mass loss with chemical and biological tests, stating uncertainty and the duration of monitoring. No single result substitutes for the others. A device that vanishes safely but too early is useless in practical use; one that performs perfectly but leaves harmful products has merely hidden its cost. Transient electronics deserves neither automatic praise nor dismissal. Its value depends on matching a temporary need with controlled degradation and on following the material story far enough to show what disappearance actually means.",
      "questions": [
        {
          "type": "mcq",
          "id": "r-q27",
          "part": 7,
          "text": "Paragraph A",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q28",
          "part": 7,
          "text": "Paragraph B",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 3
        },
        {
          "type": "mcq",
          "id": "r-q29",
          "part": 7,
          "text": "Paragraph C",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 6
        },
        {
          "type": "mcq",
          "id": "r-q30",
          "part": 7,
          "text": "Paragraph D",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q31",
          "part": 7,
          "text": "Paragraph E",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 4
        },
        {
          "type": "mcq",
          "id": "r-q32",
          "part": 7,
          "text": "Paragraph F",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q33",
          "part": 7,
          "text": "Paragraph G",
          "options": [
            "Why disappearance is not a chemical conclusion",
            "Where avoiding retrieval creates a real advantage",
            "Applying environmental terms to the complete device",
            "A deadline for performance before change begins",
            "The different contributions of controlled and realistic trials",
            "Four records for a defensible evaluation",
            "Selecting activation conditions for the destination",
            "Extending a fast laboratory result to a destination-wide schedule",
            "Judging a complete sensor by its biodegradable substrate"
          ],
          "answer": 5
        },
        {
          "type": "mcq",
          "id": "r-q34",
          "part": 7,
          "text": "The writer regards temporary devices as the best response to every kind of electronic waste.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 1
        },
        {
          "type": "mcq",
          "id": "r-q35",
          "part": 7,
          "text": "A device may stop functioning before the rest of it changes visibly.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q36",
          "part": 7,
          "text": "Humidity-triggered devices are cheaper to produce than devices activated by light.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q37",
          "part": 7,
          "text": "Materials that appear harmless separately can form different products while degrading together.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q38",
          "part": 7,
          "text": "Certification bodies require an outdoor soil trial for every transient sensor.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 2
        },
        {
          "type": "mcq",
          "id": "r-q39",
          "part": 7,
          "text": "A durable component can be acceptable when it is deliberately recovered after other layers dissolve.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        },
        {
          "type": "mcq",
          "id": "r-q40",
          "part": 7,
          "text": "Perfect performance does not compensate for harmful products left by the device.",
          "options": [
            "YES",
            "NO",
            "NOT GIVEN"
          ],
          "answer": 0
        }
      ]
    },
    {
      "part": 8,
      "skill": "writing",
      "title": "Academic Writing",
      "instructions": "You should spend about 60 minutes on both tasks. Task 2 contributes twice as much as Task 1 to the Writing score.",
      "questions": [
        {
          "type": "write",
          "id": "w-task-1",
          "part": 8,
          "taskNumber": 1,
          "stimulus": "The chart below shows the number of occupied desks, divided into reserved and drop-in desks, and the mean carbon-dioxide (CO2) concentration in a fictional co-working space during five two-hour periods on one weekday.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "text": "The chart below shows the number of occupied desks, divided into reserved and drop-in desks, and the mean carbon-dioxide (CO2) concentration in a fictional co-working space during five two-hour periods on one weekday.\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
          "minWords": 150,
          "imageUrl": "/assets/ielts/charts/set23-task1.svg",
          "imageAlt": "Combination chart for five time bands. Stacked bars show reserved and drop-in occupied desks on the left axis, while a line shows mean CO2 concentration in ppm on the right axis."
        },
        {
          "type": "write",
          "id": "w-task-2",
          "part": 8,
          "taskNumber": 2,
          "stimulus": "Some people think that research results produced by projects financed mainly with public funds should be freely available to everyone. In this question, the term research results refers to published findings and reports, not personal, confidential or security-sensitive data.\n\nTo what extent do you agree or disagree with this view?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
          "text": "Some people think that research results produced by projects financed mainly with public funds should be freely available to everyone. In this question, the term research results refers to published findings and reports, not personal, confidential or security-sensitive data.\n\nTo what extent do you agree or disagree with this view?\n\nGive reasons for your answer and include any relevant examples from your own knowledge or experience.",
          "minWords": 250
        }
      ]
    },
    {
      "part": 9,
      "skill": "speaking",
      "title": "Speaking",
      "instructions": "Complete Parts 1, 2 and 3 in order. Part 2 includes one minute of preparation and a one-to-two-minute long turn.",
      "questions": [
        {
          "type": "speak",
          "id": "s-part-1",
          "part": 9,
          "partNumber": 1,
          "text": "How often, if ever, do you borrow things from other people?\nWhat kinds of things, if any, are you willing to lend to other people?\nIf you borrow something, how would you remember to return it on time?\nIf you borrow things at all, have your habits changed over time?\nIf streets in your area have names, how much attention do you pay to them?\nIf you notice a street name, do you ever think about what it means?\nHow useful can street names be when people are trying to find an address?\nWhat do you think makes a good street name?\nAre there times when you want to be somewhere quiet?\nIf you wanted some quiet, what might you choose to do?\nIf you look for quiet, are you more likely to find it at home, somewhere outside, or neither?\nDo you think you will want more quiet time in the future, or not?"
        },
        {
          "type": "speak",
          "id": "s-part-2",
          "part": 9,
          "partNumber": 2,
          "text": "Describe a time when information or an experience led you to change an opinion.",
          "cueCard": "Describe a time when information or an experience led you to change an opinion.\nYou should say:\n• what opinion you held before\n• what information or experience made you reconsider it\n• when you realised your opinion had changed\nand explain how this change influenced something you thought or did later.",
          "followUp": [
            "Was changing it difficult?",
            "Has the change lasted?"
          ]
        },
        {
          "type": "speak",
          "id": "s-part-3",
          "part": 9,
          "partNumber": 3,
          "text": "Why can it be difficult for a person to change an opinion after seeing new evidence?\nAre people more likely to reconsider an opinion in private or while discussing it with a group?\nWhat makes an information source seem trustworthy, and can those signs ever be misleading?\nWhat responsibilities do schools and news organisations have in helping people judge evidence?\nHow can public debates allow open disagreement without giving unreliable claims too much attention?\nIn the future, should important public decisions rely more on experts, public opinion or computer systems?"
        }
      ]
    }
  ]
};

export default mock;
