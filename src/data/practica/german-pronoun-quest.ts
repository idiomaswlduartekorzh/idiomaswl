import { createPronounQuest } from './create-pronoun-quest.ts'
import { authorPronounSeed } from './pronoun-quest-authoring.ts'
import type { PronounPreset, PronounTopicOption } from './pronoun-quest-types'

export type GermanPronounTopic = 'nominativ' | 'akkusativ' | 'dativ' | 'reflexiv' | 'possessiv' | 'demonstrativ' | 'relativ'

const TOPICS: readonly PronounTopicOption<GermanPronounTopic>[] = [
  { id: 'nominativ', label: 'Personales en nominativo', group: 'Caso', level: 'A1' },
  { id: 'akkusativ', label: 'Personales en acusativo', group: 'Caso', level: 'A1–A2' },
  { id: 'dativ', label: 'Personales en dativo', group: 'Caso', level: 'A2' },
  { id: 'reflexiv', label: 'Reflexivos', group: 'Referencia', level: 'A2' },
  { id: 'possessiv', label: 'Posesivos', group: 'Concordancia', level: 'A1–A2' },
  { id: 'demonstrativ', label: 'Demostrativos', group: 'Referencia', level: 'A2' },
  { id: 'relativ', label: 'Relativos', group: 'Conexión', level: 'A2–B1' },
]

const PRESETS: readonly PronounPreset<GermanPronounTopic>[] = [
  { label: 'Casos', ids: ['nominativ', 'akkusativ', 'dativ'] },
  { label: 'Referencia', ids: ['reflexiv', 'demonstrativ', 'relativ'] },
  { label: 'Posesión', ids: ['possessiv'] },
  { label: 'Todo', ids: TOPICS.map((topic) => topic.id) },
]

const SEEDS = [
  authorPronounSeed({ id: 'nominativ', explanation: 'Ich, du, er/sie/es, wir, ihr y sie/Sie marcan el sujeto. El tratamiento formal Sie siempre se escribe con mayúscula.', functionAnswer: 'sujeto en nominativo', functionDistractors: ['objeto en acusativo', 'objeto en dativo', 'posesivo'], examples: [
    { context: 'Mara arbeitet hier; ___ organisiert die Termine.', answer: 'sie', distractors: ['ihr', 'ihre', 'ihnen'], cue: 'Mara es singular y sujeto de organisiert.', wrong: 'ihr', transform: ['Sustituye “Paul und ich”.', 'Wir kommen um acht Uhr.', ['Uns kommen um acht Uhr.', 'Sie kommen um acht Uhr.', 'Wir kommt um acht Uhr.']] },
    { context: 'Herr Weber, haben ___ einen Moment?', answer: 'Sie', distractors: ['sie', 'Ihnen', 'Ihr'], cue: 'Se dirige formalmente al señor Weber.', wrong: 'Ihnen', transform: ['Sustituye “das Paket”.', 'Es liegt am Eingang.', ['Ihn liegt am Eingang.', 'Er liegt am Eingang.', 'Sein liegt am Eingang.']] },
    { context: 'Die Schlüssel sind da; ___ liegen auf dem Tisch.', answer: 'sie', distractors: ['ihnen', 'ihre', 'es'], cue: 'Schlüssel es plural y sujeto.', wrong: 'ihnen', transform: ['Sustituye “Lena und Sara”.', 'Sie kennen die Stadt.', ['Ihr kennen die Stadt.', 'Ihnen kennen die Stadt.', 'Sie kennt die Stadt.']] },
  ], final: { before: 'Mara kennt den Ablauf; ', after: ' begrüßt die Gäste. ', answer: 'sie' } }),
  authorPronounSeed({ id: 'akkusativ', explanation: 'Mich, dich, ihn, sie, es, uns, euch y sie/Sie aparecen como objeto directo o tras preposiciones que rigen acusativo.', functionAnswer: 'objeto en acusativo', functionDistractors: ['sujeto en nominativo', 'objeto en dativo', 'determinante posesivo'], examples: [
    { context: 'Der Vertrag ist fertig. Ich prüfe ___ jetzt.', answer: 'ihn', distractors: ['er', 'ihm', 'sein'], cue: 'Vertrag es masculino y objeto directo.', wrong: 'ihm', transform: ['Sustituye “die Rechnung”.', 'Ich bezahle sie morgen.', ['Ich bezahle ihr morgen.', 'Ich sie bezahle morgen.', 'Ich bezahle ihre morgen.']] },
    { context: 'Kannst du Anna und ___ abholen?', answer: 'mich', distractors: ['ich', 'mir', 'mein'], cue: 'Ambas personas son objeto directo de abholen.', wrong: 'ich', transform: ['Sustituye “die Formulare”.', 'Wir füllen sie aus.', ['Wir füllen ihnen aus.', 'Wir sie ausfüllen.', 'Wir füllen ihre aus.']] },
    { context: 'Ohne ___ beginnt die Sitzung nicht.', answer: 'euch', distractors: ['ihr', 'euer', 'euch selbst'], cue: 'Ohne rige acusativo y se habla con varias personas.', wrong: 'ihr', transform: ['Sustituye “der Drucker” tras durch.', 'Das Papier läuft durch ihn.', ['Das Papier läuft durch ihm.', 'Das Papier läuft durch er.', 'Das Papier ihn durch läuft.']] },
  ], final: { before: 'Der Techniker wartet draußen; hol ', after: ' bitte herein. ', answer: 'ihn' } }),
  authorPronounSeed({ id: 'dativ', explanation: 'Mir, dir, ihm, ihr, uns, euch e ihnen/Ihnen marcan destinatario o siguen verbos y preposiciones que rigen dativo.', functionAnswer: 'objeto en dativo', functionDistractors: ['objeto en acusativo', 'sujeto en nominativo', 'posesivo'], examples: [
    { context: 'Ich telefoniere mit Lea und erkläre ___ den Plan.', answer: 'ihr', distractors: ['sie', 'ihre', 'ihnen'], cue: 'Lea es destinataria singular de erklären.', wrong: 'sie', transform: ['Sustituye “den Gästen”.', 'Wir zeigen ihnen den Saal.', ['Wir zeigen sie den Saal.', 'Wir ihnen zeigen den Saal.', 'Wir zeigen ihre den Saal.']] },
    { context: 'Kannst du ___ bitte helfen?', answer: 'mir', distractors: ['mich', 'ich', 'mein'], cue: 'Helfen rige dativo; quien habla recibe la ayuda.', wrong: 'mich', transform: ['Sustituye “Paul”.', 'Der Schlüssel gehört ihm.', ['Der Schlüssel gehört ihn.', 'Der Schlüssel gehört er.', 'Der Schlüssel ihm gehört.']] },
    { context: 'Frau Klein, ich schicke ___ die Adresse.', answer: 'Ihnen', distractors: ['Sie', 'Ihr', 'sie'], cue: 'El destinatario formal requiere Ihnen con mayúscula.', wrong: 'Sie', transform: ['Usa dativo plural tras mit.', 'Ich spreche mit ihnen.', ['Ich spreche mit sie.', 'Ich spreche ihnen mit.', 'Ich spreche mit ihre.']] },
  ], final: { before: 'Die Helfer brauchen den Plan; wir geben ', after: ' eine Kopie. ', answer: 'ihnen' } }),
  authorPronounSeed({ id: 'reflexiv', explanation: 'Los reflexivos remiten al sujeto. En tercera persona se usa sich; en primera y segunda persona coinciden con formas de acusativo o dativo.', functionAnswer: 'pronombre reflexivo ligado al sujeto', functionDistractors: ['objeto de otra persona', 'pronombre posesivo', 'demostrativo'], examples: [
    { context: 'Ich beeile ___, damit wir pünktlich sind.', answer: 'mich', distractors: ['mir', 'ich', 'sich'], cue: 'Sich beeilen lleva acusativo reflexivo y el sujeto es ich.', wrong: 'mir', transform: ['Cambia el sujeto a wir.', 'Wir beeilen uns.', ['Wir beeilen sich.', 'Wir beeilen euch.', 'Uns beeilen wir uns.']] },
    { context: 'Lena wäscht ___ die Hände.', answer: 'sich', distractors: ['sie', 'ihr', 'ihre'], cue: 'Con una parte del cuerpo, la persona aparece en dativo reflexivo.', wrong: 'sie', transform: ['Cambia el sujeto a du.', 'Du wäschst dir die Hände.', ['Du wäschst dich die Hände.', 'Du wäschst sich die Hände.', 'Du wascht dir die Hände.']] },
    { context: 'Paul und Mira treffen ___ vor dem Bahnhof.', answer: 'sich', distractors: ['sie', 'ihnen', 'ihre'], cue: 'La acción es recíproca entre los sujetos.', wrong: 'sie', transform: ['Cambia el sujeto a ihr.', 'Ihr trefft euch am Eingang.', ['Ihr trefft sich am Eingang.', 'Euch trefft ihr euch am Eingang.', 'Ihr treffen euch am Eingang.']] },
  ], final: { before: 'Vor der Eröffnung treffen wir ', after: ' an der Bühne. ', answer: 'uns' } }),
  authorPronounSeed({ id: 'possessiv', explanation: 'Mein-, dein-, sein-, ihr-, unser-, euer- y Ihr- indican poseedor; sus terminaciones siguen género, número y caso de lo poseído.', functionAnswer: 'posesivo con terminación de caso', functionDistractors: ['pronombre personal', 'demostrativo', 'relativo'], examples: [
    { context: 'Mara sucht ___ Schlüssel.', answer: 'ihren', distractors: ['ihr', 'ihrem', 'ihres'], cue: 'Schlüssel es masculino acusativo; la poseedora es Mara.', wrong: 'ihr', transform: ['Cambia lo poseído a femenino nominativo.', 'Ihre Tasche ist neu.', ['Ihr Tasche ist neu.', 'Ihren Tasche ist neu.', 'Ihrem Tasche ist neu.']] },
    { context: 'Wir arbeiten mit ___ neuen Team.', answer: 'unserem', distractors: ['unser', 'unseren', 'unsere'], cue: 'Mit rige dativo y Team es neutro singular.', wrong: 'unser', transform: ['Expresa “nuestros invitados” en acusativo plural.', 'Wir begrüßen unsere Gäste.', ['Wir begrüßen unseren Gäste.', 'Wir begrüßen unserem Gäste.', 'Wir begrüßen unser Gäste.']] },
    { context: 'Ist das dein Ordner? — Nein, das ist ___.', answer: 'seiner', distractors: ['sein', 'seinen', 'seinem'], cue: 'El pronombre posesivo sustituye sein Ordner, masculino nominativo.', wrong: 'sein', transform: ['Sustituye “meine Jacke”.', 'Meine ist blau.', ['Meiner ist blau.', 'Meinen ist blau.', 'Mein ist blau.']] },
  ], final: { before: 'Ihr habt eure Liste; wir benutzen ', after: '. ', answer: 'unsere' } }),
  authorPronounSeed({ id: 'demonstrativ', explanation: 'Dieser y sus formas señalan y concuerdan como el artículo definido. Der/die/das también pueden retomar con énfasis un referente ya conocido.', functionAnswer: 'demostrativo con género, número y caso', functionDistractors: ['pronombre personal átono', 'posesivo', 'pronombre relativo subordinante'], examples: [
    { context: 'Von den zwei Ordnern nehme ich ___.', answer: 'diesen', distractors: ['dieser', 'diesem', 'dieses'], cue: 'Ordner es masculino singular y objeto acusativo.', wrong: 'dieser', transform: ['Señala una caja neutra cercana.', 'Dieses Paket ist für dich.', ['Dieser Paket ist für dich.', 'Diesen Paket ist für dich.', 'Diese Paket ist für dich.']] },
    { context: 'Kennst du die Frau dort? ___ arbeitet mit Mara.', answer: 'Die', distractors: ['Der', 'Das', 'Den'], cue: 'Se retoma enfáticamente Frau, femenino nominativo.', wrong: 'Der', transform: ['Señala varios documentos.', 'Diese sind schon unterschrieben.', ['Dieser sind schon unterschrieben.', 'Dieses sind schon unterschrieben.', 'Diesen ist schon unterschrieben.']] },
    { context: 'Mit ___ Gerät drucken wir die Karten.', answer: 'diesem', distractors: ['dieses', 'diesen', 'dieser'], cue: 'Mit exige dativo y Gerät es neutro.', wrong: 'dieses', transform: ['Contrasta una opción lejana con diese.', 'Nicht diese, sondern jene.', ['Nicht dieser, sondern jene.', 'Nicht diese, sondern jener.', 'Nicht diesem, sondern jenes.']] },
  ], final: { before: 'Zwei Geräte sind frei; mit ', after: ' drucken wir die Namensschilder. ', answer: 'diesem' } }),
  authorPronounSeed({ id: 'relativ', explanation: 'Der, die, das y sus formas relativas concuerdan en género y número con el antecedente; el caso depende de su función dentro de la subordinada.', functionAnswer: 'pronombre relativo con caso propio', functionDistractors: ['artículo sin cláusula', 'pronombre posesivo', 'demostrativo principal'], examples: [
    { context: 'Die Frau, ___ uns hilft, heißt Nora.', answer: 'die', distractors: ['der', 'den', 'deren'], cue: 'Frau es femenino y el relativo es sujeto nominativo.', wrong: 'der', transform: ['Une: Der Mann arbeitet hier. Ich sehe ihn.', 'Der Mann, den ich sehe, arbeitet hier.', ['Der Mann, der ich sehe, arbeitet hier.', 'Der Mann, dem ich sehe, arbeitet hier.', 'Der Mann, ihn ich sehe, arbeitet hier.']] },
    { context: 'Das Gerät, mit ___ wir drucken, ist neu.', answer: 'dem', distractors: ['das', 'den', 'der'], cue: 'Gerät es neutro y mit exige dativo.', wrong: 'das', transform: ['Une con dativo plural.', 'Die Gäste, mit denen wir sprechen, warten draußen.', ['Die Gäste, mit die wir sprechen, warten draußen.', 'Die Gäste, mit den wir sprechen, warten draußen.', 'Die Gäste, denen mit wir sprechen, warten draußen.']] },
    { context: 'Das ist die Kollegin, ___ Idee wir nutzen.', answer: 'deren', distractors: ['die', 'der', 'dessen'], cue: 'Se expresa que la idea pertenece a una antecedente femenina.', wrong: 'dessen', transform: ['Expresa posesión con antecedente masculino.', 'Der Mann, dessen Auto dort steht, ist mein Chef.', ['Der Mann, deren Auto dort steht, ist mein Chef.', 'Der Mann, dem Auto dort steht, ist mein Chef.', 'Der Mann, sein Auto dort steht, ist mein Chef.']] },
  ], final: { before: 'Zum Schluss danken wir der Kollegin, ', after: ' Idee alles vereinfacht hat.', answer: 'deren' } }),
] as const

export const GERMAN_PRONOUN_QUEST = createPronounQuest({
  id: 'german-pronoun-quest', storageKey: 'wl-german-pronoun-quest-v1', languageName: 'Alemán', languageCode: 'de', title: 'Der Pronomenpfad', finalTitle: 'Eine Veranstaltung, sieben klare Bezüge',
  reviewLinks: [{ href: '/practica/aleman/a1/gramatica/pronombres-personales', label: 'Repasar pronombres personales' }, { href: '/practica/aleman/a2/gramatica', label: 'Repasar gramática A2' }],
  topics: TOPICS, presets: PRESETS, seeds: SEEDS, finalDistractors: ['er', 'ihr', 'dessen'],
})
