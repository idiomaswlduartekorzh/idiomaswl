export type AcademicDiscussionPrompt = {
  id: string;
  category: 'Education' | 'Campus life' | 'Technology' | 'Society' | 'Work';
  difficulty: 'B1+' | 'B2' | 'C1';
  topic: string;
  professor: string;
  studentA: string;
  studentB: string;
  question: string;
  strategy: string;
  trap: string;
  checklist: string[];
  usefulLanguage: string[];
  modelAnswer: string;
  whyItWorks: string;
};

export const ACADEMIC_DISCUSSION_PROMPTS: AcademicDiscussionPrompt[] = [
  {
    id: 'ad-feedback-online',
    category: 'Education',
    difficulty: 'B2',
    topic: 'Online feedback',
    professor:
      'In many courses, instructors now give most feedback through digital platforms instead of handwritten comments. What are the benefits or drawbacks of this change?',
    studentA:
      'I think online feedback is better because students can read it at any time and keep a record of their progress during the semester.',
    studentB:
      'I prefer handwritten feedback because it feels more personal, and I usually pay more attention when the teacher writes directly on my paper.',
    question:
      'Which type of feedback do you think is more useful for university students? Explain why.',
    strategy:
      'Toma una posición clara, concede una ventaja del otro lado y muestra por qué tu opción produce más mejora real.',
    trap:
      'No conviertas la respuesta en una lista de herramientas tecnológicas. La pregunta evalúa utilidad para el estudiante.',
    checklist: [
      'Declara tu preferencia en la primera oración.',
      'Conecta con al menos una idea de Student A o Student B.',
      'Incluye una razón central y un ejemplo de uso.',
      'Cierra explicando el impacto en aprendizaje.',
    ],
    usefulLanguage: [
      'I agree with Student A that...',
      'Although handwritten comments can feel personal,',
      'This matters because...',
      'For example,',
    ],
    modelAnswer:
      "I agree with Student A that online feedback is usually more useful because it gives students a clear record of what they need to improve. Although handwritten comments can feel more personal, digital comments are easier to review before the next assignment. For example, if a student receives repeated notes about weak topic sentences, the platform lets them compare old comments and check whether the same problem appears again. This kind of record turns feedback into a study tool, not just a grade explanation.",
    whyItWorks:
      'La respuesta toma posición, responde a Student A y Student B, usa un ejemplo concreto y explica el efecto académico.',
  },
  {
    id: 'ad-required-presentations',
    category: 'Education',
    difficulty: 'B2',
    topic: 'Required presentations',
    professor:
      'Some departments require every student to give at least one oral presentation in each course. Should presentations be required even in classes that are not focused on speaking?',
    studentA:
      'Yes. Presentations help students organize their thoughts and prepare for professional communication after graduation.',
    studentB:
      'No. Some students understand the material well but become too nervous to show what they know in front of the class.',
    question:
      'Should university classes require oral presentations? Support your opinion.',
    strategy:
      'Evita responder solo desde comodidad personal. Enfoca la utilidad académica o profesional.',
    trap:
      'Decir “presentations are good” sin explicar por qué no basta. Necesitas una consecuencia observable.',
    checklist: [
      'Responde yes/no o una postura matizada.',
      'Menciona organización, confianza o evaluación justa.',
      'Incluye una condición si tu postura es matizada.',
      'Usa un ejemplo de clase o futuro profesional.',
    ],
    usefulLanguage: [
      'I would support this requirement if...',
      'Student B raises a fair concern, but...',
      'A reasonable solution would be...',
      'In professional settings,',
    ],
    modelAnswer:
      "I would support required presentations if professors grade the content more heavily than performance style. Student B raises a fair concern because anxiety can hide a student's knowledge, but avoiding presentations completely does not help students prepare for professional settings. A reasonable solution would be to start with short, low-stakes presentations before longer ones. This gives students practice explaining ideas clearly while still making the evaluation fair.",
    whyItWorks:
      'La postura es matizada, reconoce una objeción y propone una condición práctica, lo cual desarrolla la idea.',
  },
  {
    id: 'ad-ai-study-tools',
    category: 'Technology',
    difficulty: 'C1',
    topic: 'AI study tools',
    professor:
      'Artificial intelligence tools can summarize articles, explain difficult concepts, and generate practice questions. How should universities respond to students using these tools for studying?',
    studentA:
      'Universities should encourage AI for study support because it helps students review material more efficiently.',
    studentB:
      'I think schools should limit it because students may depend on AI instead of learning how to think through problems themselves.',
    question:
      'Should universities encourage or restrict AI study tools? Explain your view.',
    strategy:
      'Distingue uso para estudiar de uso para reemplazar el trabajo del estudiante.',
    trap:
      'No trates IA como “buena” o “mala” en abstracto. La pregunta pide política universitaria.',
    checklist: [
      'Define una política clara: encourage, restrict o guided use.',
      'Diferencia apoyo de sustitución.',
      'Responde explícitamente a una preocupación del otro estudiante.',
      'Incluye un ejemplo de uso permitido o no permitido.',
    ],
    usefulLanguage: [
      'I would favor guided use rather than...',
      'The main distinction is...',
      'This would address Student B’s concern because...',
      'For instance,',
    ],
    modelAnswer:
      "I would favor guided use rather than a broad restriction. The main distinction is whether AI helps students practice or replaces their own reasoning. For instance, a student could use AI to generate extra quiz questions after reading a chapter, but not to write a lab report or discussion post. This would address Student B's concern because students still have to explain and apply ideas themselves, while also gaining the efficiency Student A mentions.",
    whyItWorks:
      'La respuesta crea una categoría clara, responde a ambos estudiantes y propone un ejemplo específico de política.',
  },
  {
    id: 'ad-campus-attendance',
    category: 'Campus life',
    difficulty: 'B1+',
    topic: 'Attendance policies',
    professor:
      'Some professors count attendance as part of the final grade, while others only grade assignments and exams. Which approach is better for university courses?',
    studentA:
      'Attendance should count because students are more likely to participate and keep up with the course schedule.',
    studentB:
      'I disagree. Adults should be responsible for deciding whether they need to attend, especially if they can learn independently.',
    question:
      'Should attendance affect a student’s final grade? Explain your opinion.',
    strategy:
      'Usa una postura fácil de defender: asistencia parcial o solo en cursos participativos.',
    trap:
      'No confundas asistencia con puntualidad o disciplina escolar. El foco es evaluación universitaria.',
    checklist: [
      'Aclara si aplica a todos los cursos o solo algunos.',
      'Conecta asistencia con participación o autonomía.',
      'Da un ejemplo de curso donde tu regla funcionaría.',
      'Evita moralizar sobre estudiantes responsables o irresponsables.',
    ],
    usefulLanguage: [
      'In my view, attendance should count only when...',
      'This is different from...',
      'For example, in a discussion-based class,',
      'Therefore,',
    ],
    modelAnswer:
      "In my view, attendance should count only when participation is part of the learning process. Student B is right that university students need independence, so a lecture course should not punish someone who can study effectively alone. However, in a discussion-based class, missing class means missing the actual activity that develops the skill. Therefore, attendance can be fair when it measures participation, not just physical presence.",
    whyItWorks:
      'La respuesta limita el alcance, usa contraste y evita una postura extrema difícil de sostener.',
  },
  {
    id: 'ad-group-projects',
    category: 'Education',
    difficulty: 'B2',
    topic: 'Group projects',
    professor:
      'Group projects are common in university courses because they can teach collaboration. However, some students feel group grades are unfair. Should professors use group projects regularly?',
    studentA:
      'Yes, because students need to learn how to divide tasks and solve problems with other people.',
    studentB:
      'No, because one hardworking student often ends up doing most of the work for everyone else.',
    question:
      'Do you think group projects should be a regular part of university courses? Why or why not?',
    strategy:
      'Propón una condición de diseño: roles claros, evaluación individual o checkpoints.',
    trap:
      'Evita contar una mala experiencia personal sin extraer una regla general.',
    checklist: [
      'Indica si apoyas proyectos grupales regulares.',
      'Incluye una condición para hacerlos justos.',
      'Responde a la preocupación de desigualdad.',
      'Explica qué habilidad académica o profesional desarrollan.',
    ],
    usefulLanguage: [
      'I support group projects, but only if...',
      'To make this fair,',
      'This reduces the problem Student B describes because...',
      'At the same time,',
    ],
    modelAnswer:
      "I support group projects, but only if professors include an individual component in the grade. Collaboration is important, as Student A says, because most professional tasks require people to coordinate ideas and deadlines. To make this fair, each student could submit a short reflection explaining their contribution and what they learned from the group process. This reduces the problem Student B describes because students are not rewarded only for the final product.",
    whyItWorks:
      'La respuesta no ignora el problema de justicia; lo resuelve con una condición evaluable.',
  },
  {
    id: 'ad-campus-jobs',
    category: 'Work',
    difficulty: 'B2',
    topic: 'Part-time jobs',
    professor:
      'Many university students work part-time while studying. Some people think this builds responsibility, while others think it distracts from academic work.',
    studentA:
      'Working part-time is valuable because students learn time management and become more independent.',
    studentB:
      'I think students should avoid jobs if possible because coursework already requires a lot of attention and energy.',
    question:
      'Is having a part-time job beneficial for university students? Explain your opinion.',
    strategy:
      'Haz una respuesta proporcional: beneficios si las horas son limitadas.',
    trap:
      'No asumas que todos los estudiantes pueden elegir no trabajar. Reconoce contexto económico si ayuda.',
    checklist: [
      'Presenta una postura con límite de horas o condiciones.',
      'Incluye una ventaja concreta más allá de ganar dinero.',
      'Reconoce el riesgo académico.',
      'Cierra con una recomendación equilibrada.',
    ],
    usefulLanguage: [
      'A limited part-time job can be beneficial because...',
      'However, this depends on...',
      'If the job takes too many hours,',
      'For this reason,',
    ],
    modelAnswer:
      "A limited part-time job can be beneficial because it teaches students to manage time and communicate professionally. I agree with Student A that independence matters, especially for students who need to handle real responsibilities while studying. However, this depends on the number of hours. If the job takes too much energy, Student B's concern becomes valid because assignments and reading will suffer. For this reason, universities should support flexible campus jobs rather than encourage heavy work schedules.",
    whyItWorks:
      'La respuesta usa condición, reconoce ambos lados y termina con una recomendación clara.',
  },
  {
    id: 'ad-digital-textbooks',
    category: 'Technology',
    difficulty: 'B1+',
    topic: 'Digital textbooks',
    professor:
      'Some universities are replacing printed textbooks with digital materials. What effect might this have on students?',
    studentA:
      'Digital textbooks are better because they are cheaper and easier to carry.',
    studentB:
      'Printed books are better because students can concentrate without notifications or screen fatigue.',
    question:
      'Should universities move mostly to digital textbooks? Support your answer.',
    strategy:
      'Compara costo/acceso con concentración, y sugiere flexibilidad si quieres matizar.',
    trap:
      'No respondas solo “technology is convenient”. Debes conectar con aprendizaje.',
    checklist: [
      'Elige digital, print o flexible access.',
      'Menciona costo, acceso o concentración.',
      'Incluye una situación estudiantil concreta.',
      'Explica cómo afecta el aprendizaje.',
    ],
    usefulLanguage: [
      'I would prefer a flexible system because...',
      'Student A makes a strong point about...',
      'At the same time,',
      'This helps students who...',
    ],
    modelAnswer:
      "I would prefer a flexible system because students have different needs. Student A makes a strong point about cost, since digital textbooks can reduce the financial pressure of buying several books each semester. At the same time, Student B is right that some students concentrate better with printed pages. A university could provide digital access by default but allow students to print key chapters. This keeps materials affordable while protecting students' ability to study deeply.",
    whyItWorks:
      'La respuesta combina los dos puntos de vista y ofrece una solución práctica, no una opinión plana.',
  },
  {
    id: 'ad-community-service',
    category: 'Society',
    difficulty: 'B2',
    topic: 'Community service',
    professor:
      'Some universities require students to complete community service before graduation. Supporters say it builds civic responsibility; critics say it should be voluntary.',
    studentA:
      'I support the requirement because students should understand social problems outside the classroom.',
    studentB:
      'I think required service loses its meaning because students may participate only to complete a rule.',
    question:
      'Should community service be required for graduation? Explain your opinion.',
    strategy:
      'Distingue obligación vacía de experiencia académica guiada con reflexión.',
    trap:
      'Evita sonar moralista. Explica diseño educativo y resultado.',
    checklist: [
      'Di si debe ser obligatorio, opcional o integrado a cursos.',
      'Responde a la crítica de motivación falsa.',
      'Incluye reflexión o conexión académica.',
      'Explica beneficio para estudiante o comunidad.',
    ],
    usefulLanguage: [
      'The requirement can be meaningful if...',
      'I understand Student B’s concern, but...',
      'Reflection is important because...',
      'As a result,',
    ],
    modelAnswer:
      "The requirement can be meaningful if it is connected to coursework and reflection. I understand Student B's concern that students may participate only because they have to, but that is true of many academic assignments. What matters is whether the activity teaches something. If students volunteer at a local organization and then write about how the experience relates to public policy or education, they can understand social issues in a deeper way. As a result, service becomes part of learning, not just a rule.",
    whyItWorks:
      'La respuesta convierte una obligación en un diseño pedagógico y responde directamente a la objeción.',
  },
  {
    id: 'ad-study-abroad',
    category: 'Campus life',
    difficulty: 'C1',
    topic: 'Study abroad',
    professor:
      'Study abroad programs can expose students to new cultures, but they can also be expensive. Should universities invest more money in expanding these programs?',
    studentA:
      'Yes. International experience helps students develop independence and understand global issues more personally.',
    studentB:
      'Universities should spend that money on campus resources because only a small number of students can study abroad.',
    question:
      'Should universities invest more in study abroad opportunities? Support your view.',
    strategy:
      'Considera equidad: si apoyas inversión, explica cómo más estudiantes acceden; si no, ofrece alternativa.',
    trap:
      'No idealices viajar. La pregunta es inversión universitaria y acceso.',
    checklist: [
      'Responde sobre inversión, no solo sobre viajar.',
      'Incluye el problema de acceso o costo.',
      'Propón becas, programas cortos o alternativas locales.',
      'Conecta la respuesta con aprendizaje global.',
    ],
    usefulLanguage: [
      'I would support more investment only if...',
      'Student B’s concern about access is important because...',
      'One practical approach would be...',
      'This would make the benefit less exclusive.',
    ],
    modelAnswer:
      "I would support more investment only if universities use the money to make study abroad less exclusive. Student A is right that international experience can build independence, but Student B's concern about access is important because expensive programs often benefit students who already have advantages. One practical approach would be to fund shorter programs and need-based scholarships. This would allow more students to gain cross-cultural experience without turning study abroad into a privilege for a small group.",
    whyItWorks:
      'La respuesta sostiene una condición ética y mantiene el foco en política institucional.',
  },
  {
    id: 'ad-late-work',
    category: 'Education',
    difficulty: 'B1+',
    topic: 'Late work policies',
    professor:
      'Professors handle late assignments in different ways. Some accept late work with a penalty, while others do not accept it at all. Which policy is better?',
    studentA:
      'A penalty is fair because students still learn from completing the assignment, even if it is late.',
    studentB:
      'Strict deadlines are better because they teach responsibility and keep the class moving at the same pace.',
    question:
      'Should professors accept late assignments with a penalty? Explain your answer.',
    strategy:
      'Defiende aprendizaje y responsabilidad al mismo tiempo: penalización limitada o ventana corta.',
    trap:
      'No ignores al profesor. La política también afecta calificación, retroalimentación y ritmo del curso.',
    checklist: [
      'Elige una política concreta.',
      'Explica cómo protege aprendizaje.',
      'Explica cómo mantiene responsabilidad.',
      'Incluye una limitación razonable.',
    ],
    usefulLanguage: [
      'I think a limited penalty system is best because...',
      'This supports learning while...',
      'For example,',
      'After that point,',
    ],
    modelAnswer:
      "I think a limited penalty system is best because it supports learning while still teaching responsibility. Student A is right that completing the assignment has value, especially if the task practices an important skill. For example, a professor could accept work up to three days late with a small grade reduction. After that point, the assignment could receive no credit so the class schedule remains manageable. This policy is more educational than simply refusing all late work.",
    whyItWorks:
      'La respuesta propone una política precisa y explica por qué equilibra dos valores.',
  },
  {
    id: 'ad-public-transport',
    category: 'Society',
    difficulty: 'B2',
    topic: 'Public transportation',
    professor:
      'Cities sometimes offer discounted public transportation passes to university students. Should universities help pay for these programs?',
    studentA:
      'Yes. Transportation support helps students attend class consistently, especially if they live far from campus.',
    studentB:
      'I disagree because university money should go directly to academic resources like libraries and tutoring.',
    question:
      'Should universities help fund transportation discounts for students? Support your opinion.',
    strategy:
      'Conecta transporte con acceso académico, no solo comodidad.',
    trap:
      'No presentes transporte como beneficio extra; explica cómo afecta asistencia y equidad.',
    checklist: [
      'Declara si transporte es una prioridad universitaria.',
      'Conecta movilidad con asistencia o permanencia.',
      'Responde a la preocupación sobre recursos académicos.',
      'Usa un ejemplo de estudiante concreto.',
    ],
    usefulLanguage: [
      'I agree with Student A because...',
      'This is still an academic issue because...',
      'For students who...',
      'Without this support,',
    ],
    modelAnswer:
      "I agree with Student A because transportation is directly connected to academic access. Student B is right that libraries and tutoring matter, but those resources are less useful if students cannot reliably get to campus. For students who live far away or work before class, a discounted pass can make attendance more consistent. This is still an academic issue because reducing transportation barriers helps students participate in the courses they are already paying for.",
    whyItWorks:
      'La respuesta redefine movilidad como acceso académico y responde a la objeción de presupuesto.',
  },
  {
    id: 'ad-exam-retakes',
    category: 'Education',
    difficulty: 'C1',
    topic: 'Exam retakes',
    professor:
      'Some instructors allow students to retake exams after reviewing their mistakes. Others believe retakes make grading less rigorous. What do you think?',
    studentA:
      'Retakes are useful because students learn more when they correct errors and try again.',
    studentB:
      'I think retakes are unfair to students who prepared well the first time and earned a high score.',
    question:
      'Should professors allow exam retakes? Explain your position.',
    strategy:
      'Propón retakes parciales o con límite para proteger rigor y aprendizaje.',
    trap:
      'No digas solo “second chances are good”. Necesitas explicar justicia evaluativa.',
    checklist: [
      'Incluye una regla de retake concreta.',
      'Explica cómo promueve aprendizaje.',
      'Explica cómo evita injusticia.',
      'Menciona revisión de errores o límite de puntaje.',
    ],
    usefulLanguage: [
      'Retakes can be fair if...',
      'To preserve academic standards,',
      'This responds to Student B’s concern because...',
      'The purpose is not to erase...',
    ],
    modelAnswer:
      "Retakes can be fair if they are limited and connected to error analysis. I agree with Student A that students learn more when they correct mistakes, but Student B's concern about fairness is valid. To preserve academic standards, a professor could allow a partial retake after students submit a written explanation of their errors, and the new score could be capped. The purpose is not to erase poor preparation; it is to reward students who can identify and fix misunderstandings.",
    whyItWorks:
      'La respuesta combina aprendizaje, justicia y una regla concreta; eso suena académico y razonable.',
  },
];

export const PROMPT_CATEGORIES = ['All', 'Education', 'Campus life', 'Technology', 'Society', 'Work'] as const;
