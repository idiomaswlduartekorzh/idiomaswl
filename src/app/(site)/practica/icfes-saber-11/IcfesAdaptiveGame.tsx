'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Skill = 'notices' | 'vocabulary' | 'dialogs' | 'grammar' | 'reading';
type GamePhase = 'intro' | 'playing' | 'checkpoint' | 'levelup' | 'gameover' | 'victory';

interface IcfesQuestion {
  id: string;
  skill: Skill;
  level: 1 | 2 | 3 | 4;
  stimulus?: string;
  text: string;
  options: string[];
  answer: number;
  justifications?: string[];
  justCorrect?: number;
}

interface SkillStats { correct: number; total: number; }
type SkillRecord = Record<Skill, SkillStats>;

interface SavedCheckpoint {
  level: 2 | 3 | 4;
  score: number;
  lives: number;
  skillStats: SkillRecord;
  savedAt: number;
}

// ─── Question Bank (75 questions · 5 skills · 4 levels) ──────────────────────

const ALL_QUESTIONS: IcfesQuestion[] = [

  // ── AVISOS Y SEÑALES (notices) ────────────────────────────────────────────
  { id:'n01', skill:'notices', level:1,
    stimulus:'NO ENTRY\nStaff only\nAll visitors must report to reception.',
    text:'What does this sign mean?',
    options:['Visitors can enter freely','Only staff are allowed in this area','The reception is closed today','All visitors must leave the building'],
    answer:1 },
  { id:'n02', skill:'notices', level:1,
    stimulus:'LIBRARY HOURS\nMonday – Friday: 8:00 am – 7:00 pm\nSaturday: 9:00 am – 2:00 pm\nClosed on Sundays and public holidays.',
    text:'What day is the library NOT open?',
    options:['Monday','Saturday','Friday','Sunday'],
    answer:3 },
  { id:'n03', skill:'notices', level:1,
    stimulus:'PLEASE KEEP THIS AREA CLEAN\nThrow all rubbish in the bins provided.\nDo not leave food on the tables.',
    text:'What are people asked to do?',
    options:['Bring their own food','Clean the tables with water','Put their rubbish in the bins','Leave the area immediately'],
    answer:2 },
  { id:'n04', skill:'notices', level:1,
    stimulus:'FOR SALE\nSecond-hand bicycle – good condition\n150,000 COP\nCall: 311 456 7890',
    text:'What should you do to buy this bicycle?',
    options:['Send an email','Visit the shop','Call the number listed','Leave a message at reception'],
    answer:2 },
  { id:'n05', skill:'notices', level:1,
    stimulus:'VISITING HOURS\n2:00 pm – 6:00 pm only\nMaximum 2 visitors per patient.\nChildren under 12 not permitted.',
    text:'Where would you most likely see this notice?',
    options:['At a school','In a hospital','At a shopping centre','In a library'],
    answer:1 },
  { id:'n06', skill:'notices', level:2,
    stimulus:'NOTICE TO ALL STUDENTS\nThe computer room will be closed on Friday 15th for maintenance.\nPlease save all work before leaving on Thursday.',
    text:'Why is the computer room closing on Friday?',
    options:['It is a public holiday','Students need to take an exam','Maintenance work is being done','The computers are being replaced'],
    answer:2 },
  { id:'n07', skill:'notices', level:2,
    stimulus:'LOST: Brown leather wallet\nFound in the cafeteria on Tuesday.\nPlease contact the school office to identify and collect.',
    text:'What should the owner of the wallet do?',
    options:['Go to the cafeteria to look for it','Post a message on the school board','Contact the school office','Wait until Friday'],
    answer:2 },
  { id:'n08', skill:'notices', level:2,
    stimulus:'COMMUNITY ENGLISH CLASSES\nFree evening classes for adults\nTuesdays and Thursdays, 6:00 – 8:00 pm\nNo experience necessary. Register at the community centre.',
    text:'Who are these classes for?',
    options:['School students only','Adults who want to learn English','Teachers who speak English','People with university degrees'],
    answer:1 },
  { id:'n09', skill:'notices', level:2,
    stimulus:'CAUTION: WET FLOOR\nPlease walk slowly.\nCleaning in progress.',
    text:'What does this sign tell people to do?',
    options:['Wait outside the building','Walk carefully because the floor is wet','Clean the floor themselves','Go to another area immediately'],
    answer:1 },
  { id:'n10', skill:'notices', level:3,
    stimulus:'IMPORTANT NOTICE FOR PASSENGERS\nDue to a technical problem, bus route 42 will not operate today.\nPassengers are advised to use alternative routes 18 or 35.\nWe apologize for the inconvenience.',
    text:'What is the main purpose of this notice?',
    options:['To advertise a new bus route','To inform passengers about a service change','To announce higher ticket prices','To warn about road construction'],
    answer:1 },
  { id:'n11', skill:'notices', level:3,
    stimulus:'EXAM REGULATIONS\nMobile phones must be switched off and kept in your bag.\nNo dictionaries or electronic devices are permitted.\nStudents who cheat will be disqualified.',
    text:'What will happen to students who cheat?',
    options:['They will receive a written warning','They will have to retake the exam','They will lose 10 points','They will not be allowed to continue the exam'],
    answer:3 },
  { id:'n12', skill:'notices', level:3,
    stimulus:'ATTENTION: PRODUCT RECALL\nBrand: FreshJuice · Lot: FJ-2024-07\nReason: May contain glass fragments.\nDo not consume. Return to store for full refund.',
    text:'What should people do if they have this product?',
    options:['Continue using it normally','Return it to the store','Throw it away at home','Contact a doctor immediately'],
    answer:1 },
  { id:'n13', skill:'notices', level:4,
    stimulus:'SWIMMING POOL NOTICE\nThis pool uses recycled water meeting national health standards.\nAll swimmers MUST shower before entering.\nNo running on the pool deck.',
    text:'What MUST swimmers do before entering the pool?',
    options:['Get permission from a lifeguard','Buy a ticket at the entrance','Take a shower','Wear a swimming cap'],
    answer:2,
    justifications:[
      'El aviso dice "All swimmers MUST shower before entering" — regla obligatoria para todos.',
      'Los avisos de piscina siempre requieren gorro de natación como norma principal.',
      'Solo los nadadores profesionales necesitan seguir las reglas del aviso.',
      'La regla sobre el agua reciclada aplica solo al personal de mantenimiento.',
    ], justCorrect:0 },
  { id:'n14', skill:'notices', level:4,
    stimulus:'SCHOLARSHIP OPPORTUNITY\nThe National Education Foundation invites students aged 16–18 to apply for academic scholarships.\nApplicants must have a GPA of 4.0 or above.\nDeadline: March 31st. Visit our website for details.',
    text:'Who can apply for this scholarship?',
    options:['Any student over 18','Students aged 16–18 with high grades','Teachers looking for funding','University students only'],
    answer:1,
    justifications:[
      'Cualquier estudiante mayor de 16 años puede aplicar sin importar sus calificaciones.',
      'El aviso indica "students aged 16–18" y un GPA de 4.0 o más — ambas condiciones son obligatorias.',
      'Los profesores nominan a los estudiantes que consideran merecedores de la beca.',
      'Solo los estudiantes universitarios con cartas de recomendación pueden aplicar.',
    ], justCorrect:1 },
  { id:'n15', skill:'notices', level:4,
    stimulus:'HEALTH WARNING\nDo not take more than 4 tablets in 24 hours.\nKeep out of reach of children.\nConsult a doctor if symptoms persist for more than 3 days.',
    text:'What should you do if you are still ill after 3 days?',
    options:['Take more tablets','Stop taking the medicine','See a doctor','Buy a stronger medicine'],
    answer:2,
    justifications:[
      'Después de 3 días, se pueden tomar más tabletas para acelerar la recuperación.',
      'El aviso recomienda cambiar de medicamento si los síntomas no mejoran.',
      'El aviso dice "Consult a doctor if symptoms persist for more than 3 days".',
      'Si el medicamento no funciona después de 3 días, debes dejar de tomarlo automáticamente.',
    ], justCorrect:2 },

  // ── VOCABULARIO ────────────────────────────────────────────────────────────
  { id:'vo01', skill:'vocabulary', level:1,
    text:'The word "pollute" means:',
    options:['To clean the environment','To make something dirty or harmful','To recycle waste materials','To protect natural resources'],
    answer:1 },
  { id:'vo02', skill:'vocabulary', level:1,
    text:'Choose the word that means "to get better at something over time":',
    options:['Forget','Repeat','Improve','Refuse'],
    answer:2 },
  { id:'vo03', skill:'vocabulary', level:1,
    text:'"She goes to the gym three times a week — it is part of her daily ___."',
    options:['Accident','Routine','Vacation','Problem'],
    answer:1 },
  { id:'vo04', skill:'vocabulary', level:1,
    text:'The word "salary" refers to:',
    options:['The cost of renting a house','Money you earn from your job','A type of food','A government benefit'],
    answer:1 },
  { id:'vo05', skill:'vocabulary', level:2,
    text:'"The students were ___ about the exam — they did not expect so many difficult questions."',
    options:['Relaxed','Nervous','Happy','Bored'],
    answer:1 },
  { id:'vo06', skill:'vocabulary', level:2,
    text:'Which word is the OPPOSITE of "reduce"?',
    options:['Decrease','Lower','Increase','Remove'],
    answer:2 },
  { id:'vo07', skill:'vocabulary', level:2,
    text:'"The company decided to ___ a new product after years of research."',
    options:['Destroy','Launch','Ignore','Delay'],
    answer:1 },
  { id:'vo08', skill:'vocabulary', level:2,
    text:'The word "essential" means:',
    options:['Optional and flexible','Very important and necessary','Interesting but not required','Difficult to find'],
    answer:1 },
  { id:'vo09', skill:'vocabulary', level:3,
    text:'"The scientist ___ the data for three months before publishing the results."',
    options:['Ignored','Analyzed','Invented','Deleted'],
    answer:1 },
  { id:'vo10', skill:'vocabulary', level:3,
    text:'Which word is closest in meaning to "convince"?',
    options:['Confuse','Persuade','Prevent','Describe'],
    answer:1 },
  { id:'vo11', skill:'vocabulary', level:3,
    text:'"Using solar panels is an ___ way to produce electricity without harming the environment."',
    options:['Efficient','Expensive','Ancient','Ordinary'],
    answer:0 },
  { id:'vo12', skill:'vocabulary', level:3,
    text:'The word "approximately" means:',
    options:['Exactly','Roughly / About','Completely','Differently'],
    answer:1 },
  { id:'vo13', skill:'vocabulary', level:4,
    text:'"The new policy had a significant ___ on the quality of education in rural areas."',
    options:['Impact','Decoration','Routine','Instrument'],
    answer:0,
    justifications:[
      '"Have an impact on" es una colocación fija que significa "tener un efecto sobre algo".',
      '"Decoration on education" es gramaticalmente posible cuando se describe la apariencia de una escuela.',
      '"Routine on education" describe los hábitos de estudio habituales de una comunidad.',
      '"Instrument on education" se usa cuando las políticas son herramientas del gobierno.',
    ], justCorrect:0 },
  { id:'vo14', skill:'vocabulary', level:4,
    text:'"The government must ___ pollution if it wants to protect public health."',
    options:['Create','Encourage','Address','Ignore'],
    answer:2,
    justifications:[
      '"Create" es correcto — el gobierno tiene que crear nuevas soluciones ambientales.',
      '"Encourage" significa motivar, por eso el gobierno debe motivar a reducir la contaminación.',
      '"Address a problem" significa enfrentarse directamente a un problema y tomar medidas concretas.',
      '"Ignore" también puede funcionar porque el gobierno necesita concentrarse en la contaminación.',
    ], justCorrect:2 },
  { id:'vo15', skill:'vocabulary', level:4,
    text:'"Schools promote sustainability by teaching students about recycling." The word "sustainability" means:',
    options:['The ability to generate profit','Using resources without harming future generations','The study of natural disasters','A type of environmental pollution'],
    answer:1,
    justifications:[
      'La sostenibilidad es el estudio de cómo prevenir desastres naturales en el futuro.',
      'En economía, "sustainability" se refiere a la capacidad de generar ganancias de forma continua.',
      'La sostenibilidad ambiental describe los efectos de la contaminación en los ecosistemas.',
      'Sostenibilidad significa usar los recursos actuales sin comprometer los de las generaciones futuras.',
    ], justCorrect:3 },

  // ── DIÁLOGOS ───────────────────────────────────────────────────────────────
  { id:'d01', skill:'dialogs', level:1,
    stimulus:'Customer: Excuse me, how much is this jacket?\nAssistant: It\'s eighty thousand pesos, but it\'s on sale today.\nCustomer: Oh, that\'s great! ___',
    text:'What does the customer most likely say next?',
    options:['I don\'t like jackets.','I\'ll take it!','The store is very big.','What colour is it?'],
    answer:1 },
  { id:'d02', skill:'dialogs', level:1,
    stimulus:'Student: Excuse me, where is the library?\nTeacher: Go down this corridor, turn left, and it\'s the second door on the right.\nStudent: ___',
    text:'What does the student most likely say?',
    options:['I don\'t read books.','The library is very small.','Thank you very much!','I prefer the cafeteria.'],
    answer:2 },
  { id:'d03', skill:'dialogs', level:1,
    stimulus:'Waiter: Are you ready to order?\nCustomer: Yes, I\'d like a chicken sandwich, please.\nWaiter: And to drink?\nCustomer: ___',
    text:'What would the customer most likely say?',
    options:['I\'m not hungry.','I\'ll have an orange juice, please.','I don\'t like sandwiches.','The food looks terrible.'],
    answer:1 },
  { id:'d14', skill:'dialogs', level:1,
    stimulus:'Librarian: Can I help you?\nStudent: Yes, I\'m looking for books about Colombian history.\nLibrarian: They\'re in section C, on the second floor.\nStudent: ___',
    text:'What would the student most likely say?',
    options:['I prefer science books.','Do you have cooking books?','Thank you! I\'ll go up now.','Is there a lift I can use?'],
    answer:2 },
  { id:'d04', skill:'dialogs', level:2,
    stimulus:'Maria: Hi Carlos! Are you free on Saturday?\nCarlos: Yes, I think so. Why?\nMaria: I\'m organizing a study group for the English exam. Want to join?\nCarlos: ___',
    text:'What would Carlos most likely say?',
    options:['No, I don\'t like Maria.','Sure, what time does it start?','I already failed the exam.','English is too difficult for me.'],
    answer:1 },
  { id:'d05', skill:'dialogs', level:2,
    stimulus:'Receptionist: Good morning, doctor\'s office. How can I help you?\nPatient: Hello, I\'d like to make an appointment with Dr. Torres.\nReceptionist: Of course. Is Tuesday at 3 pm convenient for you?\nPatient: ___',
    text:'What would the patient most likely say?',
    options:['I don\'t like doctors.','Yes, that works perfectly. Thank you.','The hospital is very far.','I prefer Wednesday morning.'],
    answer:1 },
  { id:'d06', skill:'dialogs', level:2,
    stimulus:'Ana: I just got my exam results. I passed!\nLuisa: Really? That\'s wonderful! How did you do?\nAna: I got 85 out of 100.\nLuisa: ___',
    text:'What would Luisa most likely say?',
    options:['That\'s a terrible score.','I didn\'t study for the exam.','Congratulations! You must be really proud.','I think the exam was too easy.'],
    answer:2 },
  { id:'d07', skill:'dialogs', level:2,
    stimulus:'Pedro: I can\'t find my English textbook anywhere.\nTeacher: When did you last use it?\nPedro: Yesterday in class, I think.\nTeacher: ___',
    text:'What would the teacher most likely say?',
    options:['You should buy another one.','Let\'s check the lost and found box.','English is not important.','You don\'t need the textbook.'],
    answer:1 },
  { id:'d13', skill:'dialogs', level:2,
    stimulus:'Tourist: Excuse me, can you tell me how to get to the central market?\nLocal: Sure! Walk two blocks north, then turn right at the traffic lights.\nTourist: Is it far from here?\nLocal: ___',
    text:'What would the local most likely say?',
    options:['I don\'t know where the market is.','The market is always crowded.','No, it\'s only about 10 minutes on foot.','You should take a taxi.'],
    answer:2 },
  { id:'d08', skill:'dialogs', level:3,
    stimulus:'Interviewer: Why do you want to work at our company?\nApplicant: I believe my communication skills would be a great fit.\nInterviewer: Can you give us an example?\nApplicant: ___',
    text:'What would the applicant most likely say?',
    options:['I don\'t have any experience.','In my last job, I helped resolve a conflict between two teams.','I need more money than my last job paid.','I don\'t know much about your company.'],
    answer:1 },
  { id:'d09', skill:'dialogs', level:3,
    stimulus:'Guest: I\'d like to report a problem. The air conditioning in my room isn\'t working.\nReceptionist: I\'m sorry about that. Would you like us to send a technician?\nGuest: Yes, please. But could you also ___?',
    text:'What would the guest most likely ask?',
    options:['Bring me the menu','Give me a discount on my bill','Show me the swimming pool','Tell me about the hotel history'],
    answer:1 },
  { id:'d10', skill:'dialogs', level:3,
    stimulus:'Friend A: I\'ve been really stressed with all the schoolwork.\nFriend B: I understand. What do you do to relax?\nFriend A: I don\'t really know. What do you suggest?\nFriend B: ___',
    text:'What would Friend B most likely say?',
    options:['You should study more.','Have you tried going for a walk or listening to music?','Stress is normal, don\'t worry.','Ask your teacher for less homework.'],
    answer:1 },
  { id:'d11', skill:'dialogs', level:3,
    stimulus:'Teacher: Your essay is well-written, but you need more evidence for your arguments.\nStudent: Where should I add more information?\nTeacher: ___',
    text:'What would the teacher most likely say?',
    options:['You should change the topic completely.','In the body paragraphs, after each main idea.','The introduction is the most important part.','I don\'t think you need to change anything.'],
    answer:1 },
  { id:'d15', skill:'dialogs', level:3,
    stimulus:'Manager: Our sales have dropped this quarter. What do you recommend?\nEmployee: We need to invest in digital marketing and improve our online presence.\nManager: That\'s a good point. What\'s the first step?\nEmployee: ___',
    text:'What would the employee most likely say?',
    options:['We should reduce salaries to save money.','We could analyze which platforms our customers use most.','The problem is with the products themselves.','We need to hire more people immediately.'],
    answer:1 },
  { id:'d12', skill:'dialogs', level:4,
    stimulus:'Journalist: The city plans to close the park to build a shopping centre. What do you think?\nResident: I completely oppose this. ___\nJournalist: Why is that important?\nResident: Because green spaces improve quality of life for everyone.',
    text:'What does the resident most likely say in the blank?',
    options:['Shopping centres create jobs.','The park is essential for our community.','I don\'t use parks very often.','The city needs more development.'],
    answer:1,
    justifications:[
      'El residente se opone al plan, así que la opción A apoyaría al alcalde, no al residente.',
      'La frase siguiente ("green spaces improve quality of life") confirma que el residente defiende el parque como esencial para la comunidad.',
      'Decir "no uso los parques" debilitaría el argumento del residente contra la demolición.',
      'Apoyar más desarrollo es consistente con la postura del alcalde, no la del residente opositor.',
    ], justCorrect:1 },

  // ── GRAMÁTICA (cloze) ──────────────────────────────────────────────────────
  { id:'g01', skill:'grammar', level:2,
    text:'"She ___ to school by bus every morning." (Present simple)',
    options:['go','goes','going','gone'],
    answer:1 },
  { id:'g02', skill:'grammar', level:2,
    text:'"They ___ the championship last Saturday." (Past simple)',
    options:['win','wins','winning','won'],
    answer:3 },
  { id:'g03', skill:'grammar', level:2,
    text:'"He is very interested ___ learning new languages."',
    options:['on','at','in','of'],
    answer:2 },
  { id:'g04', skill:'grammar', level:2,
    text:'"___ Amazon River flows through Brazil." (Article)',
    options:['A','An','The','–'],
    answer:2 },
  { id:'g05', skill:'grammar', level:2,
    text:'"How ___ students are there in your class?" (Quantity with countable)',
    options:['much','many','lot','few'],
    answer:1 },
  { id:'g06', skill:'grammar', level:3,
    text:'"I have ___ in this city for five years." (Present perfect)',
    options:['live','lives','living','lived'],
    answer:3 },
  { id:'g07', skill:'grammar', level:3,
    text:'"You ___ wear a helmet when you ride a bicycle. It\'s the law." (Obligation)',
    options:['can','might','must','would'],
    answer:2 },
  { id:'g08', skill:'grammar', level:3,
    text:'"If it rains tomorrow, we ___ cancel the outdoor event." (First conditional)',
    options:['would','will','can','are'],
    answer:1 },
  { id:'g09', skill:'grammar', level:3,
    text:'"The new bridge ___ built in just six months." (Passive voice, past)',
    options:['is','are','was','were'],
    answer:2 },
  { id:'g10', skill:'grammar', level:3,
    text:'"This book is ___ than the other one." (Comparative)',
    options:['more interesting','most interesting','interestinger','interestingly'],
    answer:0 },
  { id:'g11', skill:'grammar', level:3,
    text:'"She decided ___ a new career in technology." (Verb + infinitive)',
    options:['pursuing','pursue','to pursue','pursued'],
    answer:2 },
  { id:'g12', skill:'grammar', level:4,
    text:'"He studied very hard. ___, he passed all his exams." (Resultado)',
    options:['However','Although','Therefore','Despite'],
    answer:2,
    justifications:[
      '"Therefore" expresa consecuencia lógica: estudió duro → por eso (therefore) aprobó.',
      '"However" indica contraste: estudió pero NO aprobó — significado opuesto al de la frase.',
      '"Although" es una conjunción de contraste que va dentro de la misma oración, no entre dos.',
      '"Despite" necesita ir seguido de un sustantivo o gerundio, no de una oración completa.',
    ], justCorrect:0 },
  { id:'g13', skill:'grammar', level:4,
    text:'"The man ___ helped us find our way was very kind." (Relative pronoun, person)',
    options:['which','where','who','what'],
    answer:2,
    justifications:[
      '"Which" se usa como pronombre relativo solo para cosas u objetos, no para personas.',
      '"Where" introduce cláusulas relativas de lugar, no de persona.',
      '"Who" es el pronombre relativo correcto para referirse a personas como sujeto de la cláusula.',
      '"What" no funciona como pronombre relativo para introducir cláusulas de este tipo.',
    ], justCorrect:2 },
  { id:'g14', skill:'grammar', level:4,
    text:'"She told me she ___ tired and needed to rest." (Reported speech)',
    options:['is','be','been','was'],
    answer:3,
    justifications:[
      '"Is" sería correcto solo si el verbo principal fuera en presente ("She tells me").',
      'En reported speech, el verbo principal "told" está en pasado, por eso el presente "is" retrocede a "was".',
      '"Been" es participio pasado y necesita un auxiliar ("has been"), no puede ir solo aquí.',
      '"Be" es la forma base del verbo y solo aparece con modales ("she must be"), no sola.',
    ], justCorrect:1 },
  { id:'g15', skill:'grammar', level:4,
    text:'"___ the bad weather, the game continued until the final whistle." (Contraste)',
    options:['Despite','However','Therefore','Although'],
    answer:0,
    justifications:[
      '"Despite" expresa contraste y va seguido de un sustantivo — aquí precede a "the bad weather".',
      '"However" es adverbio conjuntivo que inicia una nueva oración independiente, no una frase con sustantivo.',
      '"Therefore" indica consecuencia o resultado, no contraste entre el clima y el juego.',
      '"Although" introduce una cláusula con sujeto y verbo ("Although it rained"), no un sustantivo solo.',
    ], justCorrect:0 },

  // ── NOTICES nivel 3 — extra ───────────────────────────────────────────────
  { id:'n10b', skill:'notices', level:3,
    stimulus:'FREE WIFI AVAILABLE\nPassword: school2024\nFor academic use only.\nDo not share outside the building.',
    text:'What restriction does this notice include?',
    options:['The wifi is only for teachers','The password changes every day','The wifi should not be shared outside','Students must pay to use it'],
    answer:2 },
  { id:'n10c', skill:'notices', level:3,
    stimulus:'SCHOOL TRIP — PERMISSION SLIP\nDestination: Science Museum\nDate: Friday, October 18th\nReturn by signed form no later than Wednesday.',
    text:'What must students do before Wednesday?',
    options:['Buy their own ticket to the museum','Return the signed permission form','Arrive at school before 7 am','Bring their own lunch'],
    answer:1 },
  { id:'n10d', skill:'notices', level:3,
    stimulus:'OUT OF ORDER\nThis elevator is currently under repair.\nPlease use the stairs.\nWe apologize for any inconvenience.',
    text:'What does this notice tell you?',
    options:['The stairs are closed for cleaning','The elevator is not working at the moment','The building is being renovated','You must wait for the elevator to be fixed'],
    answer:1 },
  { id:'n10e', skill:'notices', level:3,
    stimulus:'NOTICE: CHANGE OF CLASSROOM\nAll Year 11 English classes will be held in Room 204 from Monday.\nPrevious room 108 will be used for exams.',
    text:'Why are the English classes moving to Room 204?',
    options:['Room 204 is bigger','Room 108 will be used for exams','Room 108 is being repaired','The teacher requested a change'],
    answer:1 },

  // ── VOCABULARY nivel 3 — extra ────────────────────────────────────────────
  { id:'vo09b', skill:'vocabulary', level:3,
    text:'"The new regulations will ___ all companies to reduce their carbon emissions."',
    options:['allow','encourage','require','suggest'],
    answer:2 },
  { id:'vo09c', skill:'vocabulary', level:3,
    text:'The word "consequence" most closely means:',
    options:['A cause of something','A result or effect of an action','A type of agreement','A solution to a problem'],
    answer:1 },
  { id:'vo09d', skill:'vocabulary', level:3,
    text:'"After the flood, many families were left without a home — they had lost ___ everything."',
    options:['barely','virtually','slightly','fairly'],
    answer:1 },
  { id:'vo09e', skill:'vocabulary', level:3,
    text:'Which word is closest in meaning to "demonstrate"?',
    options:['Hide','Show','Forget','Refuse'],
    answer:1 },
  { id:'vo09f', skill:'vocabulary', level:3,
    text:'"The government launched a campaign to ___ people about the dangers of smoking."',
    options:['confuse','educate','frighten','punish'],
    answer:1 },

  // ── DIALOGS nivel 3 — extra ───────────────────────────────────────────────
  { id:'d08b', skill:'dialogs', level:3,
    stimulus:'Advisor: Have you thought about what subjects you want to study at university?\nStudent: I\'m interested in medicine, but I\'m not sure I\'m good enough.\nAdvisor: What makes you say that?\nStudent: ___',
    text:'What would the student most likely say?',
    options:['I don\'t want to go to university.','My grades in biology and chemistry are not very strong.','I prefer to study art.','I have never heard of medicine.'],
    answer:1 },
  { id:'d08c', skill:'dialogs', level:3,
    stimulus:'Customer: I bought this phone last week and the screen is already cracked.\nAgent: I\'m sorry to hear that. Did you drop it?\nCustomer: No, it happened by itself.\nAgent: ___',
    text:'What would the agent most likely say?',
    options:['You should buy a better phone next time.','Screens don\'t crack by themselves.','In that case, we can offer you a replacement under warranty.','I\'m afraid we can\'t help you.'],
    answer:2 },
  { id:'d08d', skill:'dialogs', level:3,
    stimulus:'Colleague A: I don\'t think our presentation is ready. We haven\'t practised enough.\nColleague B: I agree, but we only have one more day.\nColleague A: What do you suggest?\nColleague B: ___',
    text:'What would Colleague B most likely say?',
    options:['Let\'s cancel the presentation.','We could stay after class today and rehearse together.','I think the presentation is fine as it is.','Ask the teacher to postpone the deadline.'],
    answer:1 },
  { id:'d08e', skill:'dialogs', level:3,
    stimulus:'Parent: My daughter says she\'s been having trouble concentrating in class.\nTeacher: Yes, I\'ve noticed she seems distracted lately.\nParent: What do you recommend?\nTeacher: ___',
    text:'What would the teacher most likely say?',
    options:['She should change schools.','It might help to check if she\'s sleeping enough and review her study habits.','Her grades are perfect, so there\'s no problem.','I think other students are distracting her.'],
    answer:1 },

  // ── GRAMMAR nivel 3 — extra ───────────────────────────────────────────────
  { id:'g06b', skill:'grammar', level:3,
    text:'"By the time the ambulance arrived, the patient ___ already received first aid." (Past perfect)',
    options:['has','had','have','was'],
    answer:1 },
  { id:'g06c', skill:'grammar', level:3,
    text:'"She ___ for this company since 2018." (Present perfect — duration)',
    options:['works','is working','has worked','worked'],
    answer:2 },
  { id:'g06d', skill:'grammar', level:3,
    text:'"The students are ___ tired to continue the exam." (Too / enough)',
    options:['very','too','so','such'],
    answer:1 },
  { id:'g06e', skill:'grammar', level:3,
    text:'"While I ___ my homework, my brother called me." (Past continuous)',
    options:['do','did','was doing','have done'],
    answer:2 },
  { id:'g06f', skill:'grammar', level:3,
    text:'"She is good ___ solving problems under pressure."',
    options:['to','at','in','for'],
    answer:1 },
  { id:'g06g', skill:'grammar', level:3,
    text:'"We need ___ information before we can make a decision." (Quantifier with uncountable)',
    options:['many','a few','more','several'],
    answer:2 },
  { id:'g06h', skill:'grammar', level:3,
    text:'"___ he studied hard, he still didn\'t pass the exam." (Contrast)',
    options:['Because','Therefore','Although','So'],
    answer:2 },

  // ── READING nivel 3 — extra ───────────────────────────────────────────────
  { id:'r01b', skill:'reading', level:3,
    stimulus:'Colombia is one of the most biodiverse countries in the world. It is home to thousands of species of birds, plants, and insects. However, deforestation and illegal wildlife trade continue to threaten this natural wealth.',
    text:'What is the main threat to Colombia\'s biodiversity mentioned in the text?',
    options:['Tourism','Deforestation and illegal wildlife trade','Lack of rain','Air pollution from cities'],
    answer:1 },
  { id:'r01c', skill:'reading', level:3,
    stimulus:'Many young Colombians are choosing to study online because it gives them flexibility. They can attend class from home and manage their own schedule. However, some students struggle without the structure of a traditional classroom.',
    text:'What is one advantage of online study mentioned in the text?',
    options:['It is cheaper than traditional school','Students can study at their own pace and from home','Teachers provide better feedback online','Students make more friends online'],
    answer:1 },
  { id:'r01d', skill:'reading', level:3,
    stimulus:'The library introduced a new digital catalogue this year. Students can now search for books, reserve them online, and receive notifications when they are available. The librarian says the system has reduced waiting times significantly.',
    text:'What does the new digital catalogue allow students to do?',
    options:['Download books to their phones','Reserve books and get notified online','Chat with other students about books','Access books from any country'],
    answer:1 },
  { id:'r01e', skill:'reading', level:3,
    stimulus:'Volunteering helps young people develop important skills such as teamwork, communication, and problem-solving. Many universities now consider volunteer experience when reviewing applications. It also gives students a sense of purpose and community.',
    text:'According to the text, why do universities consider volunteer experience?',
    options:['Because it replaces academic qualifications','Because it shows students have important skills and experience','Because it is required by law','Because students who volunteer get better grades'],
    answer:1 },
  { id:'r01f', skill:'reading', level:3,
    stimulus:'Street art has become an important part of urban culture in many Colombian cities. Artists use walls and public spaces to express political ideas and cultural identity. Critics argue it damages property, while supporters see it as free expression.',
    text:'What do SUPPORTERS of street art believe?',
    options:['It damages public property','It is a form of free expression','It should only happen in galleries','It is bad for tourism'],
    answer:1 },

  // ── COMPRENSIÓN DE LECTURA ─────────────────────────────────────────────────
  { id:'r01', skill:'reading', level:3,
    stimulus:'Every year, millions of tons of plastic end up in the ocean. This causes serious problems for marine life, as animals can mistake plastic bags for food. Many organizations are working to reduce plastic use by encouraging people to bring reusable bags to supermarkets.',
    text:'What is the main problem described in the text?',
    options:['Supermarkets sell too many products','Plastic in the ocean harms sea animals','Organizations are not helping the environment','People do not go to supermarkets often'],
    answer:1 },
  { id:'r02', skill:'reading', level:3,
    stimulus:'Regular physical exercise has many benefits for young people. It helps maintain a healthy weight, improves concentration in school, and reduces stress. Doctors recommend at least 60 minutes of physical activity per day for teenagers.',
    text:'How much exercise do doctors recommend for teenagers?',
    options:['30 minutes per week','60 minutes per day','60 minutes per week','30 minutes per day'],
    answer:1 },
  { id:'r03', skill:'reading', level:3,
    stimulus:'Maria has been studying English for three years. She practices every day by watching films with subtitles and speaking with international friends online. Her teacher says her progress has been remarkable.',
    text:'How does Maria practice her English?',
    options:['By taking private lessons every day','By watching films and talking to people online','By reading books at the library','By travelling to English-speaking countries'],
    answer:1 },
  { id:'r04', skill:'reading', level:3,
    stimulus:'Bucaramanga, known as "the City of Parks," has more than 150 parks and public spaces. The city\'s warm climate makes outdoor activities popular all year round. It is considered one of the best cities for quality of life in Colombia.',
    text:'Why is Bucaramanga known as "the City of Parks"?',
    options:['Because it has the largest park in Colombia','Because it has over 150 parks and public spaces','Because parks are only found in Bucaramanga','Because the parks are open 24 hours'],
    answer:1 },
  { id:'r11', skill:'reading', level:3,
    stimulus:'Fast food restaurants are popular among teenagers because they are cheap and convenient. However, eating too much fast food can lead to health problems such as obesity and high blood pressure. Nutritionists recommend limiting fast food to once or twice a week.',
    text:'What do nutritionists recommend?',
    options:['Never eating fast food','Only eating salads and fruit','Eating fast food no more than twice a week','Going to fast food restaurants with family'],
    answer:2 },
  { id:'r13', skill:'reading', level:3,
    stimulus:'Learning a new language requires patience and consistent practice. Research shows that students who practice for 20 minutes every day progress faster than those who study for 3 hours once a week. The key is to make language practice part of your daily routine.',
    text:'According to research, what is the BEST way to learn a language?',
    options:['Studying for long sessions on weekends','Taking expensive language courses','Practising for a short time every day','Travelling to countries where the language is spoken'],
    answer:2 },
  { id:'r05', skill:'reading', level:4,
    stimulus:'Social media has transformed the way young people communicate. While it offers opportunities to connect with friends and access information, excessive use can lead to anxiety and poor sleep. Experts advise limiting screen time and taking regular breaks from digital devices.',
    text:'According to the text, what do experts recommend?',
    options:['Stopping the use of social media completely','Using social media to improve mental health','Limiting screen time and taking breaks from devices','Installing apps to monitor social media use'],
    answer:2,
    justifications:[
      'El texto dice "Experts advise limiting screen time and taking regular breaks from digital devices".',
      'Los expertos recomiendan eliminar las redes sociales para reducir la ansiedad.',
      'El texto sugiere que usar más redes sociales mejora la salud mental de los jóvenes.',
      'El texto aconseja instalar aplicaciones para monitorear el uso de las redes sociales.',
    ], justCorrect:0 },
  { id:'r06', skill:'reading', level:4,
    stimulus:'Gabriel García Márquez was a Colombian author born in Aracataca in 1927. He is best known for his novel "One Hundred Years of Solitude," published in 1967. García Márquez won the Nobel Prize in Literature in 1982 for his contribution to world literature.',
    text:'When did García Márquez win the Nobel Prize?',
    options:['1927','1967','1982','2004'],
    answer:2,
    justifications:[
      '1927 es el año de nacimiento de García Márquez, no el año del Nobel.',
      '1967 es la fecha de publicación de la novela, no el año del Premio Nobel.',
      'El texto dice literalmente que ganó el Nobel "in 1982".',
      '2004 no aparece en el texto — García Márquez murió en 2014, no en 2004.',
    ], justCorrect:2 },
  { id:'r07', skill:'reading', level:4,
    stimulus:'Renewable energy sources such as solar and wind power are becoming increasingly important. Unlike fossil fuels, they do not produce harmful gases. However, the initial cost of installing solar panels can be high, which limits their use in developing countries.',
    text:'According to the text, what is one disadvantage of solar energy?',
    options:['It produces harmful gases','It is not available in developing countries','The installation cost is high','It only works in warm countries'],
    answer:2,
    justifications:[
      'El texto afirma lo contrario: la energía solar NO produce gases dañinos, a diferencia de los combustibles fósiles.',
      'El texto dice que el alto costo LIMITA su uso en países en desarrollo, no que no esté disponible allí.',
      'El texto dice "the initial cost of installing solar panels can be high" — esa es la desventaja mencionada.',
      'El texto no menciona en absoluto que la energía solar solo funcione en países cálidos.',
    ], justCorrect:2 },
  { id:'r08', skill:'reading', level:4,
    stimulus:'In many Colombian cities, public libraries are not just places to read books. They also offer free computer access, language courses, and cultural events. These services are especially important for communities with limited economic resources.',
    text:'What is the MAIN purpose of this text?',
    options:['To explain how to join a public library','To describe the multiple services that libraries offer','To compare Colombian libraries with foreign ones','To encourage people to donate books to libraries'],
    answer:1,
    justifications:[
      'El texto no explica el proceso de afiliación a una biblioteca — no menciona membresías.',
      'El texto enumera los servicios que ofrecen las bibliotecas: computadoras, cursos de idiomas y eventos culturales.',
      'El texto no compara bibliotecas colombianas con las de otros países — solo habla de Colombia.',
      'El texto no pide al lector que done libros — esa acción no aparece en ningún momento.',
    ], justCorrect:1 },
  { id:'r09', skill:'reading', level:4,
    stimulus:'Volunteering abroad can be a life-changing experience. Many students choose to spend their gap year teaching English in rural areas. This not only helps local communities but also allows volunteers to develop their communication and leadership skills.',
    text:'What does "gap year" most likely mean in this context?',
    options:['An academic year at a foreign university','A year of intensive language study','A year taken off from studying to gain experience','A government program for young people'],
    answer:2,
    justifications:[
      'El contexto muestra que los estudiantes salen de sus estudios regulares para hacer voluntariado — no para estudiar en el exterior.',
      'Un "gap year" en contexto es un año fuera de los estudios formales para adquirir experiencia real.',
      'El texto no describe el "gap year" como un año de estudio intensivo — es voluntariado, no clase.',
      'No se menciona ningún programa gubernamental en el texto — es una decisión personal del estudiante.',
    ], justCorrect:1 },
  { id:'r10', skill:'reading', level:4,
    stimulus:'The ICFES exam measures the academic competencies of Colombian students at the end of secondary school. The English component evaluates reading comprehension, vocabulary, and understanding of grammar structures. Results are used for university admissions throughout the country.',
    text:'According to the text, what is ONE use of ICFES results?',
    options:['To determine if students can travel abroad','For university admissions in Colombia','To measure teachers\'s performance','To decide which students should study English'],
    answer:1,
    justifications:[
      'El texto no menciona viajes al exterior — solo habla de admisiones universitarias en Colombia.',
      'El texto dice explícitamente que los resultados "are used for university admissions throughout the country".',
      'El texto evalúa competencias de ESTUDIANTES al final del bachillerato, no el rendimiento de profesores.',
      'El texto no dice que los resultados determinen quiénes deben tomar clases de inglés.',
    ], justCorrect:1 },
  { id:'r12', skill:'reading', level:4,
    stimulus:'Water is one of the most precious natural resources on Earth. In some regions of Colombia, communities must walk for hours to reach a water source. Governments and international organizations are working together to bring clean water to these areas.',
    text:'What can we INFER from this text?',
    options:['Colombia has enough clean water for everyone','Access to clean water is a problem in some Colombian communities','International organizations cause water pollution','Walking to water sources is good for health'],
    answer:1,
    justifications:[
      'El texto muestra lo contrario: comunidades deben caminar horas para llegar al agua — no hay suficiente para todos.',
      'Si hay comunidades que caminan horas para buscar agua, se infiere que no tienen acceso fácil a ella.',
      'Las organizaciones mencionadas trabajan para LLEVAR agua limpia, no para contaminarla.',
      'Caminar horas para buscar agua es presentado como una dificultad, no como un beneficio de salud.',
    ], justCorrect:1 },
  { id:'r14', skill:'reading', level:4,
    stimulus:'Technology has made it possible for people to work from any location. This trend, known as remote work, has grown significantly since 2020. While it offers flexibility and saves commuting time, it can also make it difficult to separate work life from personal life.',
    text:'What is a possible DISADVANTAGE of remote work mentioned in the text?',
    options:['It requires expensive technology','It is impossible to communicate with colleagues','It can be hard to keep work and personal life separate','It is only available in some countries'],
    answer:2,
    justifications:[
      'El texto no menciona que el trabajo remoto requiera tecnología cara — solo dice que es posible desde cualquier lugar.',
      'El texto no dice que sea imposible comunicarse con colegas — eso no aparece como desventaja.',
      'El texto dice "it can also make it difficult to separate work life from personal life" — esa es la desventaja.',
      'El texto no menciona restricciones geográficas — dice que es posible desde "any location".',
    ], justCorrect:2 },
  { id:'r15', skill:'reading', level:4,
    stimulus:'Air pollution in large cities is mainly caused by vehicle emissions and industrial activity. It can cause respiratory diseases, especially in children and elderly people. City governments are responding by expanding public transport networks and promoting the use of electric vehicles.',
    text:'What is the author\'s main purpose in this text?',
    options:['To argue that cars should be banned from all cities','To describe the causes and responses to urban air pollution','To explain how electric vehicles work','To encourage people to use public transport'],
    answer:1,
    justifications:[
      'El texto describe causas (emisiones e industria) y respuestas (transporte público, vehículos eléctricos).',
      'El texto no argumenta que se deban prohibir los carros — solo menciona vehículos eléctricos como alternativa.',
      'El texto no explica cómo funcionan los vehículos eléctricos — solo los menciona como una solución.',
      'Aunque se menciona el transporte público, el propósito del texto es más amplio: causas Y respuestas.',
    ], justCorrect:0 },
];

// ─── Level Config ─────────────────────────────────────────────────────────────

const LEVEL_CFG = {
  1: { time: 30, color: '#059669', label: 'Nivel 1', subtitle: 'Avisos y Vocabulario', icon: '📋', description: 'Señales, avisos y vocabulario básico' },
  2: { time: 28, color: '#2563eb', label: 'Nivel 2', subtitle: 'Diálogos',             icon: '💬', description: 'Conversaciones y situaciones cotidianas' },
  3: { time: 25, color: '#7c3aed', label: 'Nivel 3', subtitle: 'Gramática',             icon: '✏️', description: 'Gramática y vocabulario en contexto' },
  4: { time: 35, color: '#dc2626', label: 'Nivel 4', subtitle: 'Comprensión lectora',   icon: '📖', description: 'Textos y preguntas de inferencia' },
} as const;

const SKILL_LABELS: Record<Skill, string> = {
  notices:    '📋 Avisos',
  vocabulary: '📚 Vocabulario',
  dialogs:    '💬 Diálogos',
  grammar:    '✏️ Gramática',
  reading:    '📖 Lectura',
};

const CHECKPOINT_KEY = 'icfes_adaptive_checkpoint_v2';
const QUESTIONS_PER_LEVEL = 10;
const BONUS_THRESHOLD = 0.6;   // error rate to trigger bonus question
const MAX_BONUS_PER_LEVEL = 2;

// ─── Utilities ────────────────────────────────────────────────────────────────

function emptySkillStats(): SkillRecord {
  return { notices: { correct:0, total:0 }, vocabulary: { correct:0, total:0 }, dialogs: { correct:0, total:0 }, grammar: { correct:0, total:0 }, reading: { correct:0, total:0 } };
}

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function errorRate(s: SkillStats): number {
  return s.total > 0 ? 1 - s.correct / s.total : 0;
}

function pickWeighted(pool: IcfesQuestion[], used: Set<string>, skillStats: SkillRecord): IcfesQuestion | null {
  const available = pool.filter(q => !used.has(q.id));
  if (!available.length) return null;
  const weighted = available.map(q => ({ q, w: 1 + errorRate(skillStats[q.skill]) * 3 }));
  const total = weighted.reduce((s, { w }) => s + w, 0);
  let r = Math.random() * total;
  for (const { q, w } of weighted) { r -= w; if (r <= 0) return q; }
  return available[Math.floor(Math.random() * available.length)];
}

function worstSkill(skillStats: SkillRecord): Skill | null {
  const skills = Object.entries(skillStats) as [Skill, SkillStats][];
  const eligible = skills.filter(([, s]) => s.total >= 2 && errorRate(s) >= BONUS_THRESHOLD);
  if (!eligible.length) return null;
  return eligible.sort((a, b) => errorRate(b[1]) - errorRate(a[1]))[0][0];
}

function saveCheckpoint(level: 2|3|4, score: number, lives: number, skillStats: SkillRecord) {
  if (typeof window === 'undefined') return;
  const cp: SavedCheckpoint = { level, score, lives, skillStats, savedAt: Date.now() };
  localStorage.setItem(CHECKPOINT_KEY, JSON.stringify(cp));
}

function loadCheckpoint(): SavedCheckpoint | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(CHECKPOINT_KEY);
    if (!raw) return null;
    const cp = JSON.parse(raw) as SavedCheckpoint;
    if (Date.now() - cp.savedAt > 7 * 86400_000) { localStorage.removeItem(CHECKPOINT_KEY); return null; }
    return cp;
  } catch { return null; }
}

function clearCheckpoint() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(CHECKPOINT_KEY);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TimerRing({ timeLeft, maxTime, color }: { timeLeft: number; maxTime: number; color: string }) {
  const r = 26, circ = 2 * Math.PI * r;
  const pct = timeLeft / maxTime;
  const offset = circ * (1 - pct);
  const c = pct > 0.5 ? '#22c55e' : pct > 0.25 ? '#f59e0b' : '#ef4444';
  return (
    <div className="relative flex items-center justify-center" style={{ width:64, height:64 }}>
      <svg className="absolute inset-0" style={{ transform:'rotate(-90deg)' }} width="64" height="64">
        <circle cx="32" cy="32" r={r} fill="none" stroke="#1e293b" strokeWidth="4" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={c} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition:'stroke-dashoffset 0.9s linear, stroke 0.3s ease' }} />
      </svg>
      <span className="relative text-lg font-bold tabular-nums" style={{ color:c }}>{timeLeft}</span>
    </div>
  );
}

function SkillBar({ skill, stats, color }: { skill: Skill; stats: SkillStats; color: string }) {
  if (stats.total === 0) return null;
  const pct = Math.round((stats.correct / stats.total) * 100);
  const barColor = pct >= 70 ? '#22c55e' : pct >= 50 ? '#f59e0b' : '#ef4444';
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-semibold text-gray-300">{SKILL_LABELS[skill]}</span>
        <span className="text-xs font-bold tabular-nums" style={{ color: barColor }}>{stats.correct}/{stats.total} ({pct}%)</span>
      </div>
      <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: barColor }}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.5 }} />
      </div>
    </div>
  );
}

function StimulusBlock({ text, color }: { text: string; color: string }) {
  return (
    <div className="mb-5 rounded-xl p-4 text-sm leading-relaxed whitespace-pre-line text-gray-200"
      style={{ background: `${color}10`, border: `1px solid ${color}30`, fontFamily: 'var(--font-mono, monospace)' }}>
      {text}
    </div>
  );
}

// ─── Intro Screen ─────────────────────────────────────────────────────────────

function IntroScreen({ onStart, onResume, checkpoint }: {
  onStart: () => void;
  onResume: (cp: SavedCheckpoint) => void;
  checkpoint: SavedCheckpoint | null;
}) {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} className="w-full max-w-xl text-center">
        <div className="text-5xl mb-4">🇨🇴</div>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">ICFES Saber 11</h1>
        <p className="text-gray-400 mb-1">Componente de Inglés · Práctica adaptativa</p>
        <p className="text-gray-500 text-sm mb-8">El juego aprende dónde fallas y te da más práctica ahí</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left">
          {([1,2,3,4] as const).map(lvl => {
            const c = LEVEL_CFG[lvl];
            return (
              <div key={lvl} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{c.icon}</span>
                  <span className="font-semibold text-white text-sm">{c.label}</span>
                  <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background:`${c.color}22`, color:c.color }}>{c.time}s</span>
                </div>
                <p className="text-xs text-gray-400">{c.description}</p>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-6 text-sm text-gray-400 mb-8">
          <span>❤️❤️❤️ 3 vidas</span>
          <span>🔥 Racha ×2/×3</span>
          <span>🔁 Refuerzo adaptativo</span>
        </div>

        {checkpoint && (
          <div className="mb-4 rounded-2xl border border-blue-500/30 bg-blue-900/10 p-4">
            <p className="text-sm text-blue-300 font-semibold mb-1">💾 Progreso guardado</p>
            <p className="text-xs text-gray-400 mb-3">
              Quedaste en {LEVEL_CFG[checkpoint.level].label} · {checkpoint.score} puntos · {checkpoint.lives} ❤️
            </p>
            <button onClick={() => onResume(checkpoint)}
              className="w-full py-2.5 rounded-xl font-bold text-white text-sm transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500">
              Continuar desde {LEVEL_CFG[checkpoint.level].label}
            </button>
          </div>
        )}

        <button onClick={onStart}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white transition-all hover:scale-105 active:scale-95 w-full"
          style={{ background:'linear-gradient(135deg, #dc2626, #534AB7)' }}>
          {checkpoint ? 'Empezar desde el principio' : 'Comenzar práctica'}
        </button>
      </motion.div>
    </div>
  );
}

// ─── Checkpoint Screen (between levels) ───────────────────────────────────────

function CheckpointScreen({ level, score, lives, skillStats, onContinue }: {
  level: 1|2|3|4; score: number; lives: number;
  skillStats: SkillRecord; onContinue: () => void;
}) {
  const nextLevel = (level + 1) as 2|3|4;
  const nextCfg = LEVEL_CFG[nextLevel];
  const skills = Object.keys(skillStats) as Skill[];
  const attempted = skills.filter(s => skillStats[s].total > 0);

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="w-full max-w-md">
        <div className="text-center mb-6">
          <motion.div animate={{ rotate:[0,-10,10,-10,0] }} transition={{ delay:0.3, duration:0.5 }} className="text-6xl mb-3">🎯</motion.div>
          <h2 className="text-2xl font-bold text-white">{LEVEL_CFG[level].label} completado</h2>
          <p className="text-gray-400 text-sm mt-1">Progreso guardado automáticamente</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-xs text-gray-400 mt-1">Puntos acumulados</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center">
            <div className="text-2xl font-bold text-white">{lives} ❤️</div>
            <div className="text-xs text-gray-400 mt-1">Vidas restantes</div>
          </div>
        </div>

        {attempted.length > 0 && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 mb-5">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Tu desempeño por habilidad</p>
            {attempted.map(skill => (
              <SkillBar key={skill} skill={skill} stats={skillStats[skill]} color={LEVEL_CFG[level].color} />
            ))}
          </div>
        )}

        <div className="rounded-xl border px-4 py-3 mb-5"
          style={{ borderColor:`${nextCfg.color}44`, background:`${nextCfg.color}11` }}>
          <div className="flex items-center gap-2">
            <span className="text-xl">{nextCfg.icon}</span>
            <div>
              <span className="font-semibold text-white text-sm">{nextCfg.label} — {nextCfg.subtitle}</span>
              <p className="text-xs text-gray-400">{nextCfg.description}</p>
            </div>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full"
              style={{ background:`${nextCfg.color}22`, color:nextCfg.color }}>{nextCfg.time}s</span>
          </div>
        </div>

        <button onClick={onContinue}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95"
          style={{ background: nextCfg.color }}>
          Ir al {nextCfg.label} →
        </button>
      </motion.div>
    </div>
  );
}

// ─── Game Over & Victory ──────────────────────────────────────────────────────

function GameOverScreen({ score, onRetry }: { score: number; onRetry: () => void }) {
  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="w-full max-w-md text-center">
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-2xl font-bold text-white mb-2">Sin vidas</h2>
        <p className="text-gray-400 mb-6">¡No te rindas! Cada error es una lección.</p>
        <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 mb-8">
          <div className="text-3xl font-bold text-white mb-1">{score} pt</div>
          <div className="text-sm text-gray-400">Puntaje final</div>
        </div>
        <button onClick={onRetry}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95 bg-blue-600 hover:bg-blue-500">
          Intentar de nuevo
        </button>
      </motion.div>
    </div>
  );
}

function VictoryScreen({ score, skillStats, onRetry }: { score: number; skillStats: SkillRecord; onRetry: () => void }) {
  const skills = Object.keys(skillStats) as Skill[];
  const total = skills.reduce((s, k) => s + skillStats[k].total, 0);
  const correct = skills.reduce((s, k) => s + skillStats[k].correct, 0);
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center px-4 py-12">
      <motion.div initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} className="w-full max-w-md text-center">
        <motion.div animate={{ rotate:[0,15,-15,10,-10,0], scale:[1,1.2,1] }} transition={{ delay:0.2, duration:0.8 }} className="text-7xl mb-4">🏆</motion.div>
        <h2 className="text-3xl font-bold text-white mb-2">¡Completado!</h2>
        <p className="text-gray-400 mb-6">Superaste los 4 niveles del ICFES inglés.</p>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5">
            <div className="text-3xl font-bold text-white">{score}</div>
            <div className="text-sm text-gray-400 mt-1">Puntos totales</div>
          </div>
          <div className="rounded-2xl border border-amber-500/30 bg-amber-900/10 px-4 py-5">
            <div className="text-3xl font-bold text-amber-400">{pct}%</div>
            <div className="text-sm text-gray-400 mt-1">Precisión global</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 mb-6 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Resumen por habilidad</p>
          {skills.filter(s => skillStats[s].total > 0).map(skill => (
            <SkillBar key={skill} skill={skill} stats={skillStats[skill]} color="#dc2626" />
          ))}
        </div>

        {pct >= 70 && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
            className="rounded-xl border border-green-500/30 bg-green-900/10 px-4 py-3 mb-5 text-green-400 text-sm font-medium">
            ⭐ Excelente resultado — estás listo para el ICFES
          </motion.div>
        )}

        <button onClick={onRetry}
          className="px-10 py-4 rounded-2xl font-bold text-lg text-white w-full transition-all hover:scale-105 active:scale-95 mb-3"
          style={{ background:'linear-gradient(135deg, #dc2626, #534AB7)' }}>
          Jugar de nuevo
        </button>
        <a href="/practica" className="block text-sm text-gray-500 hover:text-gray-300 transition-colors">
          ← Volver a Práctica
        </a>
      </motion.div>
    </div>
  );
}

// ─── Main Game ────────────────────────────────────────────────────────────────

export default function IcfesAdaptiveGame() {
  const [phase,       setPhase]       = useState<GamePhase>('intro');
  const [checkpoint,  setCheckpoint]  = useState<SavedCheckpoint | null>(null);
  const [level,       setLevel]       = useState<1|2|3|4>(1);
  const [lives,       setLives]       = useState(3);
  const [score,       setScore]       = useState(0);
  const [streak,      setStreak]      = useState(0);
  const [skillStats,  setSkillStats]  = useState<SkillRecord>(emptySkillStats);
  const [levelPool,   setLevelPool]   = useState<IcfesQuestion[]>([]);
  const [usedIds,     setUsedIds]     = useState<Set<string>>(new Set());
  const [currentQ,    setCurrentQ]    = useState<IcfesQuestion | null>(null);
  const [qIndex,      setQIndex]      = useState(0);
  const [baseCount,   setBaseCount]   = useState(0);
  const [bonusCount,  setBonusCount]  = useState(0);
  const [isBonus,     setIsBonus]     = useState(false);
  const [timeLeft,    setTimeLeft]    = useState(30);
  const [feedback,    setFeedback]    = useState<'correct'|'wrong'|null>(null);
  const [wrongAnswer, setWrongAnswer] = useState<string | null>(null);
  const [selected,    setSelected]    = useState<number | null>(null);
  const [timedOut,    setTimedOut]    = useState(false);
  const [justPhase,   setJustPhase]   = useState(false);
  const [mainCorrect, setMainCorrect] = useState<boolean | null>(null);
  const [selectedJust,setSelectedJust]= useState<number | null>(null);
  const [bonusEarned, setBonusEarned] = useState(0);

  const intervalRef    = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  // refs to avoid stale closures in async handlers
  const justPhaseRef   = useRef(false);
  const mainCorrectRef = useRef<boolean | null>(null);
  justPhaseRef.current   = justPhase;
  mainCorrectRef.current = mainCorrect;
  const cfg = LEVEL_CFG[level];

  // Load checkpoint on mount
  useEffect(() => { setCheckpoint(loadCheckpoint()); }, []);

  // ── Build level pool ───────────────────────────────────────────────────────
  const buildLevelPool = useCallback((lvl: 1|2|3|4) => {
    return shuffle(ALL_QUESTIONS.filter(q => q.level === lvl));
  }, []);

  // ── Load first question of level ───────────────────────────────────────────
  const loadQuestion = useCallback((pool: IcfesQuestion[], used: Set<string>, stats: SkillRecord, bonus: boolean) => {
    const q = pickWeighted(pool.filter(q => !used.has(q.id)), new Set(), stats);
    if (!q) return null;
    setCurrentQ(q);
    setIsBonus(bonus);
    setFeedback(null);
    setSelected(null);
    setWrongAnswer(null);
    setTimeLeft(LEVEL_CFG[level].time);
    return q;
  }, [level]);

  // ── Start a level (fresh or from checkpoint) ───────────────────────────────
  const startLevel = useCallback((lvl: 1|2|3|4, initScore: number, initLives: number, initStats: SkillRecord) => {
    const pool = buildLevelPool(lvl);
    const used = new Set<string>();
    setLevel(lvl);
    setScore(initScore);
    setLives(initLives);
    setSkillStats(initStats);
    setLevelPool(pool);
    setUsedIds(used);
    setQIndex(0);
    setBaseCount(0);
    setBonusCount(0);
    setStreak(0);
    setTimeLeft(LEVEL_CFG[lvl].time);
    setFeedback(null);
    setSelected(null);
    setWrongAnswer(null);
    setIsBonus(false);
    setJustPhase(false);
    setMainCorrect(null);
    setSelectedJust(null);
    setBonusEarned(0);

    const firstQ = pickWeighted(pool, used, initStats);
    setCurrentQ(firstQ);
    setPhase('playing');
  }, [buildLevelPool]);

  const startGame = useCallback(() => {
    clearCheckpoint();
    startLevel(1, 0, 3, emptySkillStats());
  }, [startLevel]);

  const resumeFromCheckpoint = useCallback((cp: SavedCheckpoint) => {
    startLevel(cp.level, cp.score, cp.lives, cp.skillStats);
  }, [startLevel]);

  // ── Process answer ─────────────────────────────────────────────────────────
  const processAnswer = useCallback((correct: boolean, correctAnswer?: string, bonusPts = 0) => {
    if (!currentQ) return;
    clearInterval(intervalRef.current);

    const multi = streak >= 5 ? 3 : streak >= 3 ? 2 : 1;
    const pts = correct ? 10 * multi + bonusPts : 0;
    setBonusEarned(bonusPts);

    setFeedback(correct ? 'correct' : 'wrong');
    if (!correct && correctAnswer) setWrongAnswer(correctAnswer);

    const newScore = score + pts;
    const newLives = correct ? lives : lives - 1;
    const newStreak = correct ? streak + 1 : 0;
    const newStats: SkillRecord = {
      ...skillStats,
      [currentQ.skill]: {
        correct: skillStats[currentQ.skill].correct + (correct ? 1 : 0),
        total:   skillStats[currentQ.skill].total + 1,
      }
    };

    setScore(newScore);
    if (!correct) setLives(newLives);
    setStreak(newStreak);
    setSkillStats(newStats);
    const newUsed = new Set(usedIds).add(currentQ.id);
    setUsedIds(newUsed);

    const newBase = isBonus ? baseCount : baseCount + 1;
    const newBonus = isBonus ? bonusCount + 1 : bonusCount;
    if (!isBonus) setBaseCount(newBase);
    else setBonusCount(newBonus);

    setTimeout(() => {
      if (newLives <= 0) { setPhase('gameover'); return; }

      // Level complete: all base questions done
      if (newBase >= QUESTIONS_PER_LEVEL && !isBonus) {
        if (level === 4) {
          clearCheckpoint();
          setSkillStats(newStats);
          setScore(newScore);
          setPhase('victory');
        } else {
          const nextLvl = (level + 1) as 2|3|4;
          saveCheckpoint(nextLvl, newScore, newLives, newStats);
          setSkillStats(newStats);
          setScore(newScore);
          setLives(newLives);
          setPhase('checkpoint');
        }
        return;
      }

      // Check for bonus question insertion (every 5 base questions)
      const shouldInsertBonus = !isBonus && newBase > 0 && newBase % 5 === 0 && newBonus < MAX_BONUS_PER_LEVEL;
      const targetSkill = shouldInsertBonus ? worstSkill(newStats) : null;
      const bonusPool = targetSkill
        ? levelPool.filter(q => !newUsed.has(q.id) && q.skill === targetSkill)
        : [];

      const resetForNext = () => {
        setFeedback(null);
        setSelected(null);
        setWrongAnswer(null);
        setJustPhase(false);
        setMainCorrect(null);
        setSelectedJust(null);
        setBonusEarned(0);
        setTimeLeft(LEVEL_CFG[level].time);
      };

      if (targetSkill && bonusPool.length > 0) {
        const bq = bonusPool[Math.floor(Math.random() * bonusPool.length)];
        setCurrentQ(bq);
        setIsBonus(true);
        resetForNext();
        return;
      }

      // Normal next question (weighted)
      const remaining = levelPool.filter(q => !newUsed.has(q.id));
      const nextQ = pickWeighted(remaining, new Set(), newStats);
      if (nextQ) {
        setCurrentQ(nextQ);
        setIsBonus(false);
        resetForNext();
      }
    }, 1600);
  }, [currentQ, score, lives, streak, skillStats, usedIds, isBonus, baseCount, bonusCount, level, levelPool]);

  // ── Timeout handler ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!timedOut) return;
    setTimedOut(false);
    if (!currentQ) return;
    if (justPhaseRef.current) {
      const mc = mainCorrectRef.current ?? false;
      processAnswer(mc, mc ? undefined : currentQ.options[currentQ.answer], 0);
    } else {
      processAnswer(false, currentQ.options[currentQ.answer]);
    }
  }, [timedOut, currentQ, processAnswer]);

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || feedback !== null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(intervalRef.current); setTimedOut(true); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [phase, feedback, currentQ, justPhase]);

  // ── Answer handler ─────────────────────────────────────────────────────────
  const handleAnswer = (idx: number) => {
    if (feedback !== null || justPhase || !currentQ) return;
    setSelected(idx);
    const correct = idx === currentQ.answer;
    if (currentQ.level === 4 && currentQ.justifications) {
      clearInterval(intervalRef.current);
      setMainCorrect(correct);
      setJustPhase(true);
      setTimeLeft(20);
    } else {
      processAnswer(correct, correct ? undefined : currentQ.options[currentQ.answer]);
    }
  };

  // ── Justification handler (Level 4 only) ───────────────────────────────────
  const handleJustification = (idx: number) => {
    if (feedback !== null || !currentQ) return;
    setSelectedJust(idx);
    const justCorrect = idx === currentQ.justCorrect;
    const mc = mainCorrectRef.current ?? false;
    const bonus = (mc && justCorrect) ? 5 : 0;
    processAnswer(mc, mc ? undefined : currentQ.options[currentQ.answer], bonus);
  };

  const progressPct = ((baseCount + (feedback !== null && !isBonus ? 1 : 0)) / QUESTIONS_PER_LEVEL) * 100;

  // ── Phase routing ──────────────────────────────────────────────────────────
  if (phase === 'intro') return (
    <IntroScreen onStart={startGame} onResume={resumeFromCheckpoint} checkpoint={checkpoint} />
  );
  if (phase === 'checkpoint') return (
    <CheckpointScreen level={level} score={score} lives={lives} skillStats={skillStats}
      onContinue={() => startLevel((level + 1) as 2|3|4, score, lives, skillStats)} />
  );
  if (phase === 'gameover') return <GameOverScreen score={score} onRetry={startGame} />;
  if (phase === 'victory')  return <VictoryScreen score={score} skillStats={skillStats} onRetry={startGame} />;
  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-start px-4 py-8">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-4">
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <motion.span key={i} animate={lives <= i ? { scale:[1,1.4,0.7,1] } : {}} transition={{ duration:0.4 }}
              className="text-xl sm:text-2xl">{lives > i ? '❤️' : '🖤'}</motion.span>
          ))}
        </div>

        <div className="flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color:cfg.color }}>
            {cfg.icon} {cfg.label}
          </span>
          <span className="text-xs text-gray-500">{cfg.subtitle}</span>
          {isBonus && (
            <span className="text-xs font-bold mt-0.5" style={{ color:'#f59e0b' }}>🔁 Refuerzo</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-lg font-bold text-white tabular-nums">{score}</div>
            {streak >= 3
              ? <div className="text-xs font-bold text-amber-400">🔥 ×{streak >= 5 ? 3 : 2}</div>
              : <div className="text-xs text-gray-500">puntos</div>}
          </div>
          <TimerRing timeLeft={timeLeft} maxTime={cfg.time} color={cfg.color} />
        </div>
      </div>

      {/* ── Progress bar (base questions only) ─────────────────────────────── */}
      <div className="w-full max-w-2xl h-1.5 bg-gray-800/80 rounded-full mb-1">
        <motion.div className="h-full rounded-full" style={{ background: cfg.color }}
          animate={{ width:`${progressPct}%` }} transition={{ duration:0.3 }} />
      </div>
      <div className="w-full max-w-2xl flex justify-between mb-5">
        <span className="text-xs text-gray-600">{SKILL_LABELS[currentQ.skill]}</span>
        <span className="text-xs text-gray-600 tabular-nums">{baseCount}/{QUESTIONS_PER_LEVEL}</span>
      </div>

      {/* ── Question card ──────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ.id}
          initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-24 }}
          transition={{ duration:0.2 }}
          className={[
            'w-full max-w-2xl rounded-2xl border p-6 sm:p-8',
            feedback === 'correct' ? 'border-green-500/40 bg-green-900/10'
              : feedback === 'wrong' ? 'border-red-500/40 bg-red-900/10'
              : 'border-white/10 bg-white/[0.04]',
          ].join(' ')}>

          {currentQ.stimulus && <StimulusBlock text={currentQ.stimulus} color={cfg.color} />}

          <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-6">
            {currentQ.text}
          </p>

          <AnimatePresence>
            {feedback && (
              <motion.div initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }} exit={{ opacity:0, height:0 }}
                className={`mb-4 text-center font-semibold text-base ${feedback === 'correct' ? 'text-green-400' : 'text-red-400'}`}>
                {feedback === 'correct'
                  ? <>✓ ¡Correcto! {streak >= 3 ? ` +${streak >= 5 ? 30 : 20} pt 🔥` : ' +10 pt'}{bonusEarned > 0 ? <span className="text-amber-300"> +{bonusEarned} 🧠</span> : null}</>
                  : wrongAnswer
                    ? <>✗ La respuesta era: <span className="font-bold text-white">&ldquo;{wrongAnswer}&rdquo;</span></>
                    : '✗ ¡Se acabó el tiempo!'}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQ.options.map((opt, i) => {
              let cls = 'border border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 cursor-pointer';
              const answerRevealed = feedback !== null || justPhase;
              if (answerRevealed) {
                if (i === currentQ.answer) cls = 'border-green-500 bg-green-900/30 text-green-300 cursor-default';
                else if (i === selected)  cls = 'border-red-500 bg-red-900/30 text-red-300 cursor-default';
                else                      cls = 'border-white/5 bg-transparent text-gray-600 cursor-default';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answerRevealed}
                  className={`rounded-xl px-4 py-3 font-medium text-sm sm:text-base text-left transition-all duration-150 ${cls}`}>
                  <span className="font-bold mr-2 opacity-50">{['A','B','C','D'][i]}.</span>{opt}
                </button>
              );
            })}
          </div>

          {/* ── Justification panel (Level 4 two-phase) ─────────────────────── */}
          <AnimatePresence>
            {justPhase && currentQ.justifications && (
              <motion.div
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}
                transition={{ duration:0.3 }}
                className="mt-5 pt-4 border-t border-white/10">
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color:'#f59e0b' }}>
                  🧠 ¿Por qué es correcta la respuesta?
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {currentQ.justifications.map((just, i) => {
                    const done = selectedJust !== null || feedback !== null;
                    let jcls = 'border border-white/10 bg-white/5 text-white hover:border-amber-400/50 hover:bg-amber-900/10 cursor-pointer';
                    if (done) {
                      if (i === currentQ.justCorrect) jcls = 'border-green-500 bg-green-900/20 text-green-300 cursor-default';
                      else if (i === selectedJust)    jcls = 'border-red-500 bg-red-900/20 text-red-300 cursor-default';
                      else                             jcls = 'border-white/5 bg-transparent text-gray-500 cursor-default';
                    }
                    return (
                      <button key={i} onClick={() => handleJustification(i)}
                        disabled={done}
                        className={`rounded-xl px-4 py-2.5 font-medium text-sm text-left transition-all duration-150 ${jcls}`}>
                        <span className="font-bold mr-2 opacity-50">{['A','B','C','D'][i]}.</span>{just}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      {streak >= 2 && phase === 'playing' && (
        <motion.div key={streak} initial={{ opacity:0, scale:0.8, y:10 }} animate={{ opacity:1, scale:1, y:0 }}
          className="mt-4 text-sm font-bold text-amber-400">
          🔥 {streak} respuestas seguidas correctas
        </motion.div>
      )}

      <a href="/practica" className="mt-8 text-xs text-gray-600 hover:text-gray-400 transition-colors">
        ← Volver a Práctica
      </a>
    </div>
  );
}
