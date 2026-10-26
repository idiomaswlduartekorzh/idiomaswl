import type { SpanishLocale } from './spanish-experience';

type EnrollmentCopy = {
  kicker: string;
  title: string;
  intro: string;
  steps: [
    { title: string; copy: string },
    { title: string; copy: string },
    { title: string; copy: string },
  ];
  note: string;
  button: string;
  question: string;
  answer: string;
};

export const spanishEnrollment: Record<SpanishLocale, EnrollmentCopy> = {
  en: {
    kicker: 'HOW TO START', title: 'Know the details before you book.',
    intro: 'Tell us what you need, then choose a class once you know the tutor, schedule and price.',
    steps: [
      { title: 'Tell us your goal', copy: 'Share your current level, what you want to do in Spanish and whether you prefer online or Bucaramanga.' },
      { title: 'Review the options', copy: 'WeLearn checks tutor availability and explains the schedule, class length and current price.' },
      { title: 'Choose your next step', copy: 'Ask any questions before booking a paid class or a paid assessment with a tutor.' },
    ],
    note: 'The first conversation by chat is free. Classes and assessments with a tutor are paid; we confirm the price before booking.',
    button: 'Ask about your options',
    question: 'Do I have to pay to ask about classes?',
    answer: 'No. The initial chat is free. A class or assessment with a tutor is paid, and we share the current price before you book.',
  },
  es: {
    kicker: 'CÓMO EMPEZAR', title: 'Conoce los detalles antes de reservar.',
    intro: 'Cuéntanos qué necesitas y elige una clase cuando conozcas el tutor, el horario y el precio.',
    steps: [
      { title: 'Cuéntanos tu objetivo', copy: 'Comparte tu nivel, para qué usarás el español y si prefieres online o presencial en Bucaramanga.' },
      { title: 'Revisa las opciones', copy: 'WeLearn consulta la disponibilidad de tutores y te explica horario, duración y precio vigente.' },
      { title: 'Elige cómo seguir', copy: 'Resuelve tus dudas antes de reservar una clase o un diagnóstico pago con tutor.' },
    ],
    note: 'La orientación inicial por chat no tiene costo. La clase y el diagnóstico con tutor son pagos; conoces el precio antes de agendar.',
    button: 'Consultar opciones',
    question: '¿Cuesta algo preguntar por las clases?',
    answer: 'No. La orientación inicial por chat es gratuita. La clase y el diagnóstico con tutor son pagos; te damos el precio vigente antes de reservar.',
  },
  fr: {
    kicker: 'POUR COMMENCER', title: 'Les détails avant de réserver.',
    intro: 'Expliquez-nous votre projet, puis choisissez un cours en connaissant le tuteur, les horaires et le tarif.',
    steps: [
      { title: 'Décrivez votre objectif', copy: 'Précisez votre niveau, votre objectif et votre préférence pour les cours en ligne ou à Bucaramanga.' },
      { title: 'Examinez les possibilités', copy: 'WeLearn vérifie les disponibilités et vous indique le tuteur, les horaires, la durée et le tarif actuel.' },
      { title: 'Choisissez la suite', copy: 'Posez vos questions avant de réserver un cours ou une évaluation payante avec un tuteur.' },
    ],
    note: 'Le premier échange par message est gratuit. Les cours et évaluations avec un tuteur sont payants ; le tarif est communiqué avant la réservation.',
    button: 'Demander les possibilités',
    question: 'La première demande de renseignements est-elle payante ?',
    answer: 'Non. Le premier échange par message est gratuit. Un cours ou une évaluation avec un tuteur est payant ; le tarif est communiqué avant la réservation.',
  },
  it: {
    kicker: 'COME INIZIARE', title: 'Tutti i dettagli prima di prenotare.',
    intro: 'Raccontaci cosa cerchi e scegli una lezione dopo aver conosciuto tutor, orario e prezzo.',
    steps: [
      { title: 'Raccontaci il tuo obiettivo', copy: 'Indica il tuo livello, perché vuoi usare lo spagnolo e se preferisci online o in presenza a Bucaramanga.' },
      { title: 'Valuta le opzioni', copy: 'WeLearn verifica la disponibilità dei tutor e ti comunica orari, durata e prezzo aggiornato.' },
      { title: 'Scegli come proseguire', copy: 'Fai tutte le tue domande prima di prenotare una lezione o una valutazione a pagamento con tutor.' },
    ],
    note: 'La prima conversazione via chat è gratuita. Le lezioni e le valutazioni con tutor sono a pagamento; conoscerai il prezzo prima di prenotare.',
    button: 'Chiedi le opzioni disponibili',
    question: 'Devo pagare per chiedere informazioni?',
    answer: 'No. La prima conversazione via chat è gratuita. Lezioni e valutazioni con tutor sono a pagamento; ti comunichiamo il prezzo prima di prenotare.',
  },
  ru: {
    kicker: 'КАК НАЧАТЬ', title: 'Узнайте условия до записи.',
    intro: 'Расскажите о своей цели и выберите занятие, когда узнаете преподавателя, расписание и стоимость.',
    steps: [
      { title: 'Расскажите о цели', copy: 'Укажите свой уровень, зачем вам испанский и какой формат удобнее: онлайн или очно в Букараманге.' },
      { title: 'Узнайте варианты', copy: 'WeLearn уточнит доступность преподавателей, расписание, продолжительность занятия и актуальную стоимость.' },
      { title: 'Выберите следующий шаг', copy: 'Задайте вопросы до записи на платное занятие или платную оценку уровня с преподавателем.' },
    ],
    note: 'Первичная переписка бесплатна. Занятия и оценка уровня с преподавателем платные; стоимость сообщается до записи.',
    button: 'Узнать доступные варианты',
    question: 'Нужно ли платить за первый вопрос о занятиях?',
    answer: 'Нет. Первичная переписка бесплатна. Занятие или оценка уровня с преподавателем платные; стоимость сообщается до записи.',
  },
  zh: {
    kicker: '如何开始', title: '预约前先了解课程详情。',
    intro: '告诉我们你的学习需求，了解教师、时间安排和费用后，再决定是否预约。',
    steps: [
      { title: '告诉我们你的目标', copy: '说明你目前的水平、学习西班牙语的目的，以及想线上学习还是到布卡拉曼加上课。' },
      { title: '了解可选课程', copy: 'WeLearn 会确认教师是否有空，并说明上课时间、单次课程时长及当前费用。' },
      { title: '决定下一步', copy: '预约付费课程或教师评估前，你可以先提出问题。' },
    ],
    note: '首次文字咨询免费。教师授课和教师评估均收费；预约前会告知费用。',
    button: '咨询可选课程',
    question: '咨询课程需要付费吗？',
    answer: '首次文字咨询免费。教师授课和教师评估均收费；预约前会告知当前费用。',
  },
};
