import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adverbios-tiempo',
  order: '19',
  color: '#1a2ecc',
  category: 'Adverbios',
  level: 'A2',
  title: 'Adverbios de tiempo en ruso A2: вчера, сегодня, завтра и más',
  shortTitle: 'Adverbios de tiempo',
  metaTitle: 'Adverbios tiempo ruso A2 — вчера сегодня завтра, раньше потом наконец, temporales rusos',
  description:
    'Los adverbios de tiempo en ruso son invariables y responden a las preguntas когда? (¿cuándo?), как долго? (¿cuánto tiempo?) y как часто? (¿con qué frecuencia?). Básicos: вчера (ayer), сегодня (hoy), завтра (mañana). Secuencia: сначала (primero), потом/затем (luego), наконец (finalmente). Frecuencia: всегда (siempre), часто (frecuentemente), иногда (a veces), редко (raramente), никогда (nunca).',
  lead: 'Вчера я был дома / Потом мы пойдём в кино / Я всегда говорю по-русски: adverbios temporales A2.',
  outcomes: [
    'Usar adverbios básicos: вчера, сегодня, завтра, сейчас, потом',
    'Ordenar eventos con сначала, потом, затем, наконец',
    'Expresar frecuencia con всегда, часто, иногда, редко, никогда',
    'Distinguir скоро (pronto), уже (ya) и ещё (todavía/aún)',
  ],

  guide: {
    goal: 'Usar adverbios temporales para situar acciones en el tiempo y organizar el discurso.',
    model: 'Вчера я был в театре. (Ayer estuve en el teatro.) / Сначала мы поели, потом пошли гулять. (Primero comimos, luego salimos a pasear.) / Я никогда не был в России. (Nunca he estado en Rusia.)',
    formula: 'adverbio temporal + V | никогда + не + V (doble negación obligatoria) | уже + V (hecho), ещё + не + V (aún no)',
    decisions: [
      'Ayer/hoy/mañana: вчера / сегодня / завтра — siempre en español-ruso sin cambios',
      'Ahora/luego/pronto: сейчас / потом / скоро',
      'Secuencia: сначала → потом/затем → наконец',
      'Frecuencia: всегда > часто > иногда > редко > никогда (никогда + не = nunca)',
      'Уже (ya — acción completada) vs ещё (todavía — acción continua) vs ещё не (aún no)',
    ],
    table: [
      ['Categoría', 'Adverbio ruso', 'Español'],
      ['Ayer/Hoy/Mañana', 'вчера / сегодня / завтра', 'ayer / hoy / mañana'],
      ['Frecuencia', 'всегда / часто / иногда / редко / никогда', 'siempre / frecuente / a veces / raro / nunca'],
    ],
    mistakes: [
      '"Никогда не" → doble negación obligatoria en ruso. "Я никогда не был там" ✓. No decir "я никогда был" ❌.',
      '"Уже" = ya (hecho/cambio). "Ещё" = todavía (continúa). "Ещё не" = aún no. Son tres expresiones distintas.',
      '"Сейчас" = ahora (en este momento). "Потом" = luego/después (en otro momento). No son sinónimos.',
    ],
  },

  seo: [
    {
      heading: 'Adverbios de tiempo básicos en ruso',
      paragraphs: [
        'Los adverbios temporales rusos son invariables: no cambian por género, número ni caso. Los más básicos son вчера (ayer), сегодня (hoy), завтра (mañana). Para "ahora" hay dos opciones: сейчас (en este momento, acción en curso) y теперь (ahora, en contraste con antes: "раньше я учился, теперь работаю"). Прошлая неделя (la semana pasada) y на следующей неделе (la semana que viene) usan el genitivo o el prepositivo según la construcción.',
        'Los adverbios de secuencia organizan el discurso: сначала (primero/al principio), потом o затем (luego/después), наконец (finalmente/por fin). Ejemplo: "Сначала я позавтракал, потом пошёл на работу, наконец вернулся домой" (Primero desayuné, luego fui al trabajo, finalmente volví a casa).',
      ],
    },
    {
      heading: 'Уже, ещё, скоро y никогда',
      paragraphs: [
        'Уже (ya) indica que algo ya ocurrió o ya es el caso: "Он уже пришёл" (Ya llegó). Ещё (todavía) indica que algo continúa: "Она ещё спит" (Todavía duerme). Ещё не (aún no) indica que algo no ha ocurrido pero se espera: "Он ещё не пришёл" (Aún no ha llegado). Скоро (pronto/en breve) indica futuro cercano: "Скоро будет зима" (Pronto llegará el invierno).',
        'Никогда (nunca) requiere doble negación con не: "Я никогда не был в Японии" (Nunca he estado en Japón). "Никогда" siempre se combina con не antes del verbo. Otros negativos que siguen el mismo patrón: нигде (en ningún lugar) y никуда (a ningún lugar).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'вчера/сегодня/завтра | сначала→потом→наконец | всегда/иногда/никогда | уже/ещё/ещё не',
    graphicPrompt: 'Línea de tiempo con вчера–сегодня–завтра y frecuencia de acción.',
    scene: [
      ['Вчера я смотрел интересный фильм.', 'Ayer vi una película interesante.'],
      ['Сначала поедим, потом пойдём гулять.', 'Primero comemos, luego salimos a pasear.'],
      ['Я всегда пью кофе утром.', 'Siempre tomo café por la mañana.'],
      ['Он ещё не пришёл домой.', 'Todavía no ha llegado a casa.'],
      ['Скоро начнётся урок.', 'Pronto empezará la clase.'],
      ['Я никогда не был в Сибири.', 'Nunca he estado en Siberia.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['вчера/сегодня/завтра', 'сначала/потом/наконец', 'всегда/иногда/никогда не', 'уже/ещё/ещё не'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el adverbio correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el adverbio temporal adecuado.',
        type: 'choice',
        items: [
          {
            scene: '___ мы поедим, ___ пойдём в кино.',
            lines: [['', '___ мы поедим, ___ пойдём в кино.']],
            options: ['Сначала / потом', 'Всегда / иногда', 'Вчера / завтра', 'Ещё / уже'],
            answer: 'Сначала / потом',
            explain: '"Сначала / потом" — primero…luego. Secuencia de acciones.',
          },
          {
            scene: 'Я ___ не был в этом ресторане.',
            lines: [['', 'Я ___ не был в этом ресторане.']],
            options: ['никогда', 'всегда', 'иногда', 'часто'],
            answer: 'никогда',
            explain: '"никогда" — nunca + не (doble negación obligatoria en ruso).',
          },
          {
            scene: 'Он ___ пришёл — вот он стоит у двери.',
            lines: [['', 'Он ___ пришёл — вот он стоит у двери.']],
            options: ['уже', 'ещё', 'скоро', 'вчера'],
            answer: 'уже',
            explain: '"уже" — ya llegó (acción completada). ещё = todavía.',
          },
          {
            scene: 'Мой брат ___ звонит мне — каждый день!',
            lines: [['', 'Мой брат ___ звонит мне — каждый день!']],
            options: ['всегда', 'никогда', 'редко', 'иногда'],
            answer: 'всегда',
            explain: '"всегда" — siempre. "Каждый день" confirma la frecuencia alta.',
          },
          {
            scene: 'Ты уже поел? — Нет, ___ не поел.',
            lines: [['', 'Ты уже поел? — Нет, ___ не поел.']],
            options: ['ещё', 'уже', 'всегда', 'потом'],
            answer: 'ещё',
            explain: '"ещё не" — aún no (todavía no). Respuesta negativa a уже.',
          },
          {
            scene: 'Урок начнётся ___. Подождите немного.',
            lines: [['', 'Урок начнётся ___. Подождите немного.']],
            options: ['скоро', 'вчера', 'всегда', 'наконец'],
            answer: 'скоро',
            explain: '"скоро" — pronto (futuro cercano). подождите = esperen → acción futura inminente.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Tiempo y frecuencia',
        tag: '2 espacios',
        intro: 'Completa con el adverbio de tiempo y frecuencia correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Primero estudia, luego descansa.',
            lines: [['', '[[0]] учись, [[1]] отдыхай.']],
            blanks: [
              { options: ['Сначала', 'Потом', 'Наконец', 'Всегда'], answer: 'Сначала', explain: '"Сначала" — primero (inicio de secuencia).' },
              { options: ['потом', 'сначала', 'никогда', 'всегда'], answer: 'потом', explain: '"потом" — luego (segundo en la secuencia).' },
            ],
          },
          {
            scene: 'Él ya llegó pero ella todavía no está.',
            lines: [['', 'Он [[0]] пришёл, но её [[1]] нет.']],
            blanks: [
              { options: ['уже', 'ещё', 'скоро', 'вчера'], answer: 'уже', explain: '"уже" — ya (acción completada). он уже пришёл.' },
              { options: ['ещё', 'уже', 'всегда', 'никогда'], answer: 'ещё', explain: '"ещё нет" — todavía no está. ещё + нет (ausencia continua).' },
            ],
          },
          {
            scene: 'Nunca voy al gimnasio, a veces camino.',
            lines: [['', 'Я [[0]] не хожу в спортзал, [[1]] гуляю.']],
            blanks: [
              { options: ['никогда', 'всегда', 'редко', 'иногда'], answer: 'никогда', explain: '"никогда" — nunca + не (doble negación).' },
              { options: ['иногда', 'всегда', 'никогда', 'часто'], answer: 'иногда', explain: '"иногда" — a veces (frecuencia baja pero existe).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El día de Наташа',
        tag: 'Texto guiado',
        intro: 'Completa la narración del día de Наташа con adverbios temporales.',
        type: 'guidedText',
        scene: 'Наташа рассказывает о своём дне.',
        text: '[[0]] я встала рано. [[1]] я выпила кофе, [[2]] оделась. [[3]] я пошла на работу. Я [[4]] опаздываю — это моё правило!',
        blanks: [
          { options: ['Сегодня', 'Завтра', 'Вчера', 'Потом'], answer: 'Сегодня', explain: '"Сегодня" — hoy. Наташа cuenta su día actual.' },
          { options: ['Сначала', 'Потом', 'Наконец', 'Всегда'], answer: 'Сначала', explain: '"Сначала" — primero (inicio de secuencia matutina).' },
          { options: ['потом', 'сначала', 'вчера', 'часто'], answer: 'потом', explain: '"потом" — luego (segundo paso).' },
          { options: ['Потом', 'Сначала', 'Вчера', 'Иногда'], answer: 'Потом', explain: '"Потом" — luego/después (tercer paso).' },
          { options: ['никогда не', 'всегда', 'иногда', 'редко'], answer: 'никогда не', explain: '"никогда не опаздываю" — nunca llego tarde. доble negación.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Traduce los adverbios',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el adverbio ruso correcto.',
        type: 'freeText',
        scene: 'Напиши наречие времени по-русски.',
        text: 'Ayer (pasado) = ___ / Pronto (futuro cercano) = ___ / A veces (frecuencia media) = ___ / Aún no (negación incompleta) = ___',
        blanks: [
          { answer: 'вчера', explain: '"вчера" — ayer. Pasado inmediato.' },
          { answer: 'скоро', explain: '"скоро" — pronto/en breve. Futuro cercano.' },
          { answer: 'иногда', explain: '"иногда" — a veces. Frecuencia media.' },
          { answer: 'ещё не', explain: '"ещё не" — aún no. Acción esperada pero no ocurrida.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe sobre tu rutina',
        tag: 'Escritura guiada',
        intro: 'Escribe frases usando adverbios temporales.',
        type: 'write',
        items: [
          {
            scene: 'Di que siempre bebes café por la mañana.',
            prompt: 'Usa всегда + пить кофе + утром.',
            answer: 'Я всегда пью кофе утром.',
            accepted: ['Я всегда выпиваю кофе утром.'],
            explain: '"всегда" — siempre. Presente habitual. всегда + V presente.',
          },
          {
            scene: 'Di que nunca llegas tarde.',
            prompt: 'Usa никогда + не + опаздывать.',
            answer: 'Я никогда не опаздываю.',
            accepted: ['Я никогда не опаздываю на работу.'],
            explain: '"никогда не" — nunca + negación. Doble negación obligatoria.',
          },
          {
            scene: 'Cuenta que ayer primero trabajaste y luego fuiste al cine.',
            prompt: 'Usa вчера + сначала + работать + потом + пойти в кино.',
            answer: 'Вчера я сначала работал, потом пошёл в кино.',
            accepted: ['Вчера сначала работала, а потом пошла в кино.'],
            explain: '"вчера" temporal base + сначала/потом para secuencia. Género según hablante.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu rutina y hábitos',
        tag: 'Escritura libre',
        intro: 'Describe tu rutina usando adverbios de tiempo y frecuencia.',
        type: 'write',
        items: [
          {
            scene: 'Describe tu mañana típica con secuencia y frecuencia.',
            prompt: 'Используй сначала, потом, всегда, иногда, никогда не.',
            answer: 'Утром я всегда встаю рано. Сначала принимаю душ, потом завтракаю. Иногда я пью чай, иногда кофе. Я никогда не пропускаю завтрак.',
            accepted: ['Я всегда встаю в семь утра. Сначала делаю зарядку, потом завтракаю. Я никогда не выхожу без кофе.'],
            explain: 'всегда + V | сначала→потом | иногда (a veces) | никогда не (nunca+neg.).',
          },
          {
            scene: 'Habla de algo que ya hiciste hoy y algo que aún no has hecho.',
            prompt: 'Используй уже сделал/сделала и ещё не + V.',
            answer: 'Сегодня я уже позвонил другу и выучил новые слова. Но я ещё не сделал домашнее задание и ещё не поужинал.',
            accepted: ['Сегодня я уже прочитала статью. Но я ещё не написала эссе и ещё не поговорила с профессором.'],
            explain: 'уже + V perfectivo (completado) | ещё не + V (incompleto, se espera).',
          },
        ],
      },
    ],
  },
}

export default topic
