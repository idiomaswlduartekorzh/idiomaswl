export type EmailPromptBankItem = {
  id: string;
  category: 'Academic' | 'Campus' | 'Work' | 'Service' | 'Peer';
  tone: 'formal' | 'semi-formal' | 'friendly';
  difficulty: 'B1+' | 'B2' | 'C1';
  topic: string;
  situation: string;
  task: string;
  audience: string;
  purpose: string;
  strategy: string;
  trap: string;
  checklist: string[];
  usefulLanguage: string[];
  modelEmail: string;
  whyItWorks: string;
};

export const EMAIL_PROMPT_BANK: EmailPromptBankItem[] = [
  {
    id: 'email-missed-class',
    category: 'Academic',
    tone: 'formal',
    difficulty: 'B1+',
    topic: 'Missed class materials',
    situation:
      'You missed an important class because of a medical appointment. You need the notes and want to know whether there is any homework due before the next meeting.',
    task:
      'Write an email to your professor. Apologize briefly, ask for the class materials, and ask about any homework or deadline.',
    audience: 'Professor',
    purpose: 'Request information and materials after an absence.',
    strategy:
      'Abre con una disculpa breve, explica la razón sin demasiados detalles personales y termina con una solicitud clara.',
    trap:
      'No suenes como si el profesor tuviera que resolver todo por ti. Muestra responsabilidad y ofrece ponerte al día.',
    checklist: [
      'Saludo formal.',
      'Motivo del email en la primera oración.',
      'Solicitud específica de materiales.',
      'Pregunta clara sobre tarea o fecha límite.',
      'Cierre respetuoso con agradecimiento.',
    ],
    usefulLanguage: [
      'I apologize for missing class.',
      'Could you please let me know...',
      'I would appreciate it if...',
      'Thank you for your help.',
    ],
    modelEmail:
      'Dear Professor Kim,\n\nI apologize for missing class yesterday because I had a medical appointment that could not be moved. I am writing to ask whether you could please share the main notes or slides from the session. I would also appreciate it if you could let me know whether any homework was assigned before our next class. I will review the material as soon as possible so I can be prepared.\n\nThank you for your help.\nSincerely,\nAndrea',
    whyItWorks:
      'El email explica el problema sin exceso de detalles, pide dos cosas concretas y muestra intención de ponerse al día.',
  },
  {
    id: 'email-office-hours',
    category: 'Academic',
    tone: 'formal',
    difficulty: 'B2',
    topic: 'Office hours appointment',
    situation:
      'You are struggling with a research paper and want to meet your professor during office hours, but the posted schedule conflicts with your part-time job.',
    task:
      'Write an email to your professor. Explain the problem, ask for an alternative meeting time, and mention what you want to discuss.',
    audience: 'Professor',
    purpose: 'Request an alternative office-hours meeting.',
    strategy:
      'Sé específico con el conflicto y con el tema de consulta para que el profesor pueda responder fácilmente.',
    trap:
      'No escribas solo “I need help”. Di qué parte del trabajo necesitas revisar.',
    checklist: [
      'Explica el conflicto de horario.',
      'Propón una alternativa o rango de disponibilidad.',
      'Menciona el tema académico concreto.',
      'Mantén tono formal y agradecido.',
    ],
    usefulLanguage: [
      'Would it be possible to meet at another time?',
      'I am available...',
      'I would like to discuss...',
      'Thank you for considering my request.',
    ],
    modelEmail:
      'Dear Professor Alvarez,\n\nI am writing because I would like to attend your office hours to discuss my research paper, especially the organization of my argument. Unfortunately, your regular office hours are at the same time as my part-time job. Would it be possible to meet at another time this week? I am available on Wednesday after 3 p.m. or Friday morning.\n\nThank you for considering my request.\nSincerely,\nMateo',
    whyItWorks:
      'La respuesta no solo pide ayuda: identifica el problema, da opciones de horario y concreta el foco académico.',
  },
  {
    id: 'email-roommate-noise',
    category: 'Campus',
    tone: 'semi-formal',
    difficulty: 'B1+',
    topic: 'Dorm noise problem',
    situation:
      'Your roommate often plays music late at night. You have an exam soon and need a quieter room, but you want to stay polite.',
    task:
      'Write an email or message to your roommate. Explain the problem, mention your exam, and suggest a solution.',
    audience: 'Roommate',
    purpose: 'Solve a shared-space problem politely.',
    strategy:
      'Usa lenguaje directo pero no acusatorio. Presenta el impacto y una solución específica.',
    trap:
      'Evita frases agresivas como “you always”. En emails TOEFL, el tono cuenta tanto como la gramática.',
    checklist: [
      'Saludo natural.',
      'Problema explicado sin atacar.',
      'Contexto del examen.',
      'Propuesta concreta de horario o audífonos.',
      'Cierre cooperativo.',
    ],
    usefulLanguage: [
      'I wanted to ask about...',
      'Would you mind...',
      'I have an exam coming up.',
      'I hope we can find a solution.',
    ],
    modelEmail:
      'Hi Jordan,\n\nI wanted to ask about the music at night. I know you like to relax after class, but I have an exam this week and I have been having trouble sleeping when the music is loud after 11 p.m. Would you mind using headphones or keeping the volume lower on weeknights? I think that would help me study and rest without changing your routine too much.\n\nThanks for understanding,\nLuis',
    whyItWorks:
      'El mensaje explica el impacto, evita culpar y propone una solución concreta que respeta a ambos.',
  },
  {
    id: 'email-club-event',
    category: 'Campus',
    tone: 'semi-formal',
    difficulty: 'B2',
    topic: 'Joining a student club event',
    situation:
      'You want to attend a student club event, but the registration form is closed. You still hope there may be space available.',
    task:
      'Write an email to the club organizer. Introduce yourself, ask if you can still attend, and explain why you are interested.',
    audience: 'Student club organizer',
    purpose: 'Ask for late registration politely.',
    strategy:
      'Da contexto suficiente para sonar interesado, pero no exijas una excepción.',
    trap:
      'No culpes al formulario ni al organizador. Pide una posibilidad y acepta la decisión.',
    checklist: [
      'Presentación breve.',
      'Pregunta sobre cupo disponible.',
      'Razón de interés.',
      'Tono flexible y agradecido.',
    ],
    usefulLanguage: [
      'I recently learned about...',
      'I was wondering if...',
      'If there is still space available,',
      'I understand if registration is already closed.',
    ],
    modelEmail:
      'Hello Maya,\n\nMy name is Daniel, and I recently learned about the International Film Club event this Friday. I know the registration form is already closed, but I was wondering if there is still space available for one more student. I am interested because I am studying French this semester and would like to meet other students who enjoy foreign films. I understand if registration is already full.\n\nThank you,\nDaniel',
    whyItWorks:
      'El email combina interés genuino con flexibilidad, lo cual evita sonar exigente.',
  },
  {
    id: 'email-internship-schedule',
    category: 'Work',
    tone: 'formal',
    difficulty: 'B2',
    topic: 'Internship schedule change',
    situation:
      'You were accepted for an internship interview, but the proposed interview time conflicts with a final exam.',
    task:
      'Write an email to the internship coordinator. Thank them, explain the conflict, and request a different interview time.',
    audience: 'Internship coordinator',
    purpose: 'Reschedule a professional interview.',
    strategy:
      'Empieza agradeciendo, luego explica el conflicto de forma breve y propone opciones concretas.',
    trap:
      'No suenes casual ni desorganizado. En contexto laboral, la precisión y cortesía pesan mucho.',
    checklist: [
      'Agradecimiento inicial.',
      'Conflicto explicado con claridad.',
      'Solicitud de reprogramación.',
      'Dos opciones de disponibilidad.',
      'Cierre profesional.',
    ],
    usefulLanguage: [
      'Thank you for the opportunity.',
      'Unfortunately, I have a scheduling conflict.',
      'Would it be possible to reschedule?',
      'I am available at your convenience...',
    ],
    modelEmail:
      'Dear Ms. Carter,\n\nThank you for the opportunity to interview for the marketing internship. Unfortunately, the proposed time on Tuesday at 10 a.m. conflicts with one of my final exams. Would it be possible to reschedule the interview? I am available Tuesday after 3 p.m. or any time on Wednesday morning. I apologize for the inconvenience and appreciate your flexibility.\n\nSincerely,\nCamila Torres',
    whyItWorks:
      'La respuesta protege el tono profesional: agradece, explica, ofrece opciones y cierra con cortesía.',
  },
  {
    id: 'email-library-fine',
    category: 'Service',
    tone: 'formal',
    difficulty: 'B2',
    topic: 'Library fine question',
    situation:
      'You returned a library book, but your student account still shows a late fee. You believe the fee may be a mistake.',
    task:
      'Write an email to the library office. Explain the situation, provide details, and ask them to check your account.',
    audience: 'Library office',
    purpose: 'Request account review for a possible mistake.',
    strategy:
      'Incluye datos verificables: título, fecha de devolución y número de estudiante si aplica.',
    trap:
      'No acuses al personal. Presenta el caso como algo que necesita revisión.',
    checklist: [
      'Motivo del email claro.',
      'Detalles verificables.',
      'Solicitud de revisión.',
      'Tono respetuoso.',
    ],
    usefulLanguage: [
      'I am writing about...',
      'According to my account,',
      'Could you please check...',
      'Please let me know if you need more information.',
    ],
    modelEmail:
      'Dear Library Staff,\n\nI am writing about a late fee that still appears on my student account. According to my records, I returned the book Introduction to Sociology on May 4, but my account shows that it was returned late. Could you please check whether the book was processed correctly? My student ID is 482193. Please let me know if you need any additional information from me.\n\nThank you,\nNicolás',
    whyItWorks:
      'El email da datos específicos y pide revisión sin sonar confrontacional.',
  },
  {
    id: 'email-group-project',
    category: 'Peer',
    tone: 'friendly',
    difficulty: 'B1+',
    topic: 'Group project reminder',
    situation:
      'Your class group has a presentation next week. One member has not sent their part yet, and you need it to finish the slides.',
    task:
      'Write a message to your group member. Remind them of the deadline, explain why you need their part, and offer help if needed.',
    audience: 'Classmate',
    purpose: 'Get missing group work without creating conflict.',
    strategy:
      'Sé claro con la fecha y la consecuencia, pero deja una puerta para ayudar.',
    trap:
      'No conviertas el email en reclamo. El objetivo es lograr acción.',
    checklist: [
      'Recordatorio de fecha.',
      'Explicación de por qué hace falta su parte.',
      'Oferta de ayuda.',
      'Cierre con acción concreta.',
    ],
    usefulLanguage: [
      'Just a quick reminder...',
      'We need your section so that...',
      'Let me know if you need help.',
      'Could you send it by...',
    ],
    modelEmail:
      'Hi Sara,\n\nJust a quick reminder that our presentation is next Tuesday, and we are trying to finish the slides by Friday evening. We still need your section about the survey results so that we can check the transitions and practice as a group. If you are having trouble with it, let me know and I can help organize the data. Could you send your part by Friday at 5 p.m.?\n\nThanks,\nJulian',
    whyItWorks:
      'El mensaje combina presión razonable con colaboración, y termina con una fecha clara.',
  },
  {
    id: 'email-housing-maintenance',
    category: 'Service',
    tone: 'formal',
    difficulty: 'B2',
    topic: 'Dorm maintenance request',
    situation:
      'The heater in your dorm room has not worked for two days. The weather is cold, and you need the housing office to send someone.',
    task:
      'Write an email to the housing office. Describe the problem, mention how long it has continued, and request maintenance.',
    audience: 'Housing office',
    purpose: 'Request urgent but polite maintenance support.',
    strategy:
      'Incluye duración, efecto y solicitud específica sin exagerar el tono.',
    trap:
      'No escribas solo “fix it”. Un buen email de servicio da contexto accionable.',
    checklist: [
      'Describe el problema físico.',
      'Incluye duración.',
      'Explica el impacto.',
      'Solicita visita o reparación.',
      'Proporciona información de habitación.',
    ],
    usefulLanguage: [
      'I am writing to report...',
      'The problem has continued for...',
      'Would it be possible to send someone...',
      'My room number is...',
    ],
    modelEmail:
      'Dear Housing Office,\n\nI am writing to report a problem with the heater in my dorm room. It has not worked for the past two days, and the room has become very cold at night. Would it be possible to send someone to inspect or repair it as soon as possible? My room number is B-214, and I am usually available after 2 p.m.\n\nThank you for your assistance,\nValentina',
    whyItWorks:
      'La respuesta entrega todos los datos necesarios para actuar: problema, tiempo, urgencia, ubicación y disponibilidad.',
  },
  {
    id: 'email-course-change',
    category: 'Academic',
    tone: 'formal',
    difficulty: 'C1',
    topic: 'Course section change',
    situation:
      'You want to move to another section of the same course because your current section conflicts with a required lab.',
    task:
      'Write an email to the academic advisor. Explain the conflict, ask whether a section change is possible, and mention any deadline.',
    audience: 'Academic advisor',
    purpose: 'Request administrative guidance for a course change.',
    strategy:
      'Haz evidente que no quieres evitar el curso, sino resolver un conflicto académico real.',
    trap:
      'No pidas “change my class” sin información. Incluye curso, sección y deadline.',
    checklist: [
      'Identifica el curso y la sección.',
      'Explica el conflicto académico.',
      'Pregunta por procedimiento o posibilidad.',
      'Menciona deadline si existe.',
      'Tono formal y organizado.',
    ],
    usefulLanguage: [
      'I am currently enrolled in...',
      'This section conflicts with...',
      'Could you advise me on...',
      'The add/drop deadline is...',
    ],
    modelEmail:
      'Dear Ms. Nguyen,\n\nI am currently enrolled in Biology 201, Section 3, but I recently learned that this section conflicts with a required chemistry lab. I would like to stay in Biology 201 if possible, so I am writing to ask whether I can move to another section. Could you advise me on the process and let me know whether I need to submit a form before the add/drop deadline this Friday?\n\nThank you for your guidance,\nSamuel Lee',
    whyItWorks:
      'El email es administrativo y preciso: identifica el problema, la meta, la acción requerida y el deadline.',
  },
  {
    id: 'email-event-volunteer',
    category: 'Campus',
    tone: 'semi-formal',
    difficulty: 'B2',
    topic: 'Volunteer for campus event',
    situation:
      'Your university is hosting an orientation event for new international students. You want to volunteer but need more information about the schedule and responsibilities.',
    task:
      'Write an email to the event coordinator. Express interest, ask about responsibilities, and ask about the time commitment.',
    audience: 'Event coordinator',
    purpose: 'Request details before volunteering.',
    strategy:
      'Demuestra interés real y haz preguntas prácticas que permitan tomar una decisión.',
    trap:
      'No digas simplemente “send info”. Explica por qué te interesa participar.',
    checklist: [
      'Interés en el evento.',
      'Razón personal o académica.',
      'Pregunta sobre responsabilidades.',
      'Pregunta sobre horario o duración.',
      'Cierre amable.',
    ],
    usefulLanguage: [
      'I am interested in volunteering for...',
      'Could you tell me more about...',
      'I would also like to know...',
      'I look forward to hearing from you.',
    ],
    modelEmail:
      'Hello Mr. Patel,\n\nI am interested in volunteering for the orientation event for new international students. As an international student myself, I think I could help new students feel more comfortable during their first week. Could you tell me more about the responsibilities volunteers will have? I would also like to know how many hours volunteers are expected to work during the event.\n\nI look forward to hearing from you.\nBest regards,\nLaura',
    whyItWorks:
      'El email combina motivación con preguntas concretas, lo que hace fácil responder.',
  },
  {
    id: 'email-job-reference',
    category: 'Work',
    tone: 'formal',
    difficulty: 'C1',
    topic: 'Requesting a reference',
    situation:
      'You are applying for a campus job and want to ask a former instructor if they would be willing to serve as a reference.',
    task:
      'Write an email to the instructor. Remind them who you are, explain the job, and politely ask if they can be a reference.',
    audience: 'Former instructor',
    purpose: 'Ask for a professional reference.',
    strategy:
      'Facilita la respuesta: recuerda el contexto, explica el rol y ofrece enviar información adicional.',
    trap:
      'No asumas que dirán sí. Pide permiso antes de poner su nombre.',
    checklist: [
      'Recordatorio de curso o relación.',
      'Descripción breve del trabajo.',
      'Solicitud educada de referencia.',
      'Oferta de enviar CV o detalles.',
      'Agradecimiento.',
    ],
    usefulLanguage: [
      'I hope you are doing well.',
      'I took your course...',
      'Would you be willing to serve as a reference?',
      'I would be happy to send...',
    ],
    modelEmail:
      'Dear Professor Smith,\n\nI hope you are doing well. I took your Introduction to Communication course last semester and enjoyed the group presentation project in particular. I am applying for a campus job as a student tour guide, and I wanted to ask whether you would be willing to serve as a reference. The role requires clear communication and reliability, which were both important in your class. I would be happy to send my resume or any details about the position.\n\nThank you for considering my request.\nSincerely,\nMariana',
    whyItWorks:
      'La respuesta pide permiso, conecta el trabajo con habilidades observables y ofrece información adicional.',
  },
  {
    id: 'email-lost-item',
    category: 'Service',
    tone: 'semi-formal',
    difficulty: 'B1+',
    topic: 'Lost item on campus',
    situation:
      'You left your headphones in a classroom and want to ask the department office if anyone found them.',
    task:
      'Write an email to the department office. Describe the item, say where and when you lost it, and ask what you should do next.',
    audience: 'Department office',
    purpose: 'Ask about a lost item with enough details.',
    strategy:
      'Los detalles importan: objeto, lugar, hora aproximada y forma de contacto.',
    trap:
      'No escribas un email demasiado emocional. El objetivo es ayudar a identificar el objeto.',
    checklist: [
      'Objeto descrito con detalles.',
      'Lugar y fecha/hora aproximada.',
      'Pregunta sobre lost and found o siguiente paso.',
      'Cierre con agradecimiento.',
    ],
    usefulLanguage: [
      'I may have left...',
      'They are...',
      'Could you please let me know...',
      'Thank you for checking.',
    ],
    modelEmail:
      'Hello,\n\nI may have left my black wireless headphones in Room 302 after my economics class on Monday afternoon. They are in a small gray case with my initials on the inside. Could you please let me know if anyone has turned them in to the department office? If not, I would appreciate any information about where I should check next.\n\nThank you for checking,\nEmilio',
    whyItWorks:
      'El email permite identificar el objeto y pide una acción clara sin sonar desordenado.',
  },
  {
    id: 'email-peer-feedback',
    category: 'Peer',
    tone: 'friendly',
    difficulty: 'B2',
    topic: 'Asking for peer feedback',
    situation:
      'You finished a draft of an essay and want a classmate to read it before you submit it. You know they are busy, so you want to ask politely.',
    task:
      'Write a message to your classmate. Ask for feedback, mention what kind of feedback you need, and offer to return the favor.',
    audience: 'Classmate',
    purpose: 'Request peer feedback respectfully.',
    strategy:
      'Reduce la carga: pide feedback específico, no una revisión total indefinida.',
    trap:
      'No pidas “check everything”. Eso suena pesado y poco claro.',
    checklist: [
      'Pregunta amable.',
      'Tipo de feedback específico.',
      'Deadline razonable.',
      'Oferta de reciprocidad.',
      'Tono amistoso.',
    ],
    usefulLanguage: [
      'Would you have time to...',
      'I am mainly looking for feedback on...',
      'No worries if you are too busy.',
      'I can also read your draft.',
    ],
    modelEmail:
      'Hi Priya,\n\nWould you have time to read my essay draft before Friday? I am mainly looking for feedback on whether my main argument is clear, not grammar corrections for every sentence. No worries if you are too busy this week. If you can help, I would be happy to read your draft too or give feedback on your introduction.\n\nThanks!\nAna',
    whyItWorks:
      'La solicitud es específica, respetuosa del tiempo del compañero y ofrece reciprocidad.',
  },
];

export const EMAIL_CATEGORIES = ['All', 'Academic', 'Campus', 'Work', 'Service', 'Peer'] as const;
export const EMAIL_TONES = ['All', 'formal', 'semi-formal', 'friendly'] as const;
