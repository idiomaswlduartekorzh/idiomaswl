import { createFrenchA1Supplement } from './supplement-factory'

export default createFrenchA1Supplement({
  slug: 'demonstratifs-presentatifs', color: '#dc2626', category: 'Référence',
  title: 'Les démonstratifs et les présentatifs en français A1',
  shortTitle: 'Ce, cet, cette, ces · c’est et il y a',
  metaTitle: 'Démonstratifs en français A1 — ce, cet, cette, ces, c’est, ce sont et il y a',
  description: 'Los demostrativos ce, cet, cette y ces identifican un nombre dentro de una situación. Los presentativos c’est, ce sont y il y a permiten presentar, identificar o señalar existencia. Esta lección organiza las formas por género, número, sonido inicial y función comunicativa.',
  lead: 'Señala y presenta con precisión: ce livre, cet hôtel, cette rue, ces photos; c’est mon ami, ce sont mes voisins, il y a un café ici.',
  outcomes: ['Elegir ce, cet, cette o ces', 'Distinguir c’est, ce sont e il/elle est', 'Usar il y a para expresar existencia', 'Mantener concordancia y referencia en un texto'],
  goal: 'Identificar un nombre y presentar personas, objetos o lugares con la forma demostrativa o presentativa adecuada.',
  model: 'Cet appartement est lumineux. C’est notre nouveau logement et il y a deux balcons.',
  formula: 'ce + masc. | cet + masc. voyelle | cette + fém. | ces + pluriel | c’est/ce sont + identification | il y a + existence',
  decisions: ['Decide si acompañas un nombre o si presentas una identidad completa.', 'Para un nombre masculino, distingue consonante de vocal o h muda.', 'Usa cette con femenino singular y ces con cualquier plural.', 'Usa c’est delante de nombre propio, grupo nominal o adjetivo neutro.', 'Usa ce sont para presentar varias personas o cosas en registro cuidado.', 'Usa il y a para indicar que algo existe o está disponible en un lugar.'],
  table: [['Función', 'Forma', 'Ejemplo'], ['masculino + consonante', 'ce', 'ce livre'], ['masculino + vocal/h muda', 'cet', 'cet hôtel'], ['femenino singular', 'cette', 'cette adresse'], ['plural', 'ces', 'ces étudiants'], ['identificar singular', 'c’est', 'C’est Lina.'], ['identificar plural', 'ce sont', 'Ce sont mes clés.'], ['existencia', 'il y a', 'Il y a une pharmacie ici.'], ['describir', 'il/elle est', 'Elle est médecin.']],
  mistakes: ['Ce appartement → cet appartement.', 'Cet voiture → cette voiture.', 'C’est mes amis en registro cuidado → ce sont mes amis.', 'Il y a mon professeur para identificarlo → c’est mon professeur.'],
  sections: [
    { heading: '¿Cómo elegir ce, cet, cette o ces?', paragraphs: ['El demostrativo va delante del nombre y concuerda con él. Ce acompaña masculino ante consonante; cet evita el choque de sonidos ante vocal o h muda; cette acompaña femenino; ces sirve para todos los plurales.', 'La elección depende del nombre, no de la persona que habla ni del objeto señalado. Por eso decimos cet homme y cette femme, aunque ambos estén igualmente cerca.'], table: [['Singular', 'Plural', 'Ejemplo'], ['ce livre', 'ces livres', 'ce livre est utile'], ['cet ami', 'ces amis', 'cet ami habite ici'], ['cette idée', 'ces idées', 'cette idée est claire']] },
    { heading: 'C’est, ce sont e il/elle est', paragraphs: ['C’est presenta o identifica: C’est Marie; c’est une ingénieure; c’est intéressant. Il est o elle est describe una persona ya identificada y suele llevar profesión sin artículo: Elle est ingénieure.', 'Ce sont es la forma cuidada del plural: Ce sont mes voisins. En conversación se oye c’est mes voisins, pero conviene dominar primero la concordancia estándar.'] },
    { heading: 'Il y a para expresar existencia', paragraphs: ['Il y a significa “hay” y no cambia en singular o plural: Il y a un problème; il y a trois solutions. Presenta la existencia, no la identidad del referente.', 'Compara Il y a un café dans la rue, existe un café, con C’est le café de Paul, se identifica cuál es.'] },
  ],
  scenes: [['ce quartier', 'masculino ante consonante'], ['cet appartement', 'masculino ante vocal'], ['cette maison', 'femenino singular'], ['ces rues', 'plural'], ['C’est Nora.', 'identificación singular'], ['Ce sont nos voisins.', 'identificación plural'], ['Il y a un parc.', 'existencia'], ['Elle est architecte.', 'descripción de referente conocido']],
  choices: [
    { prompt: '___ livre est très clair.', answer: 'Ce', options: ['Ce', 'Cet', 'Cette', 'Ces'], explain: 'Livre es masculino y empieza por consonante.' },
    { prompt: '___ hôtel est moderne.', answer: 'Cet', options: ['Ce', 'Cet', 'Cette', 'Ces'], explain: 'Hôtel es masculino con h muda.' },
    { prompt: '___ rue est calme.', answer: 'Cette', options: ['Ce', 'Cet', 'Cette', 'Ces'], explain: 'Rue es femenino singular.' },
    { prompt: '___ photos sont anciennes.', answer: 'Ces', options: ['Ce', 'Cet', 'Cette', 'Ces'], explain: 'Photos está en plural.' },
    { prompt: '___ mon amie Léa.', answer: 'C’est', options: ['C’est', 'Ce sont', 'Il y a', 'Elle est'], explain: 'Se identifica una persona singular.' },
    { prompt: '___ mes parents.', answer: 'Ce sont', options: ['Ce sont', 'C’est', 'Il est', 'Il y a'], explain: 'Se identifican varias personas.' },
    { prompt: '___ une boulangerie près d’ici.', answer: 'Il y a', options: ['Il y a', 'C’est', 'Elle est', 'Ce sont'], explain: 'Se indica existencia en un lugar.' },
    { prompt: 'Voici Emma. ___ médecin.', answer: 'Elle est', options: ['Elle est', 'C’est', 'Il y a', 'Ce sont'], explain: 'La persona ya está identificada y se describe su profesión.' },
  ],
  dual: [
    { scene: 'Appartement', lines: [['', '[[0]] appartement est grand et [[1]] notre nouveau logement.']], blanks: [{ options: ['Cet', 'Ce', 'Cette'], answer: 'Cet', explain: 'Appartement es masculino ante vocal.' }, { options: ['c’est', 'il y a', 'ce sont'], answer: 'c’est', explain: 'Se identifica el apartamento.' }] },
    { scene: 'Quartier', lines: [['', 'Dans [[0]] quartier, [[1]] deux parcs.']], blanks: [{ options: ['ce', 'cet', 'cette'], answer: 'ce', explain: 'Quartier es masculino ante consonante.' }, { options: ['il y a', 'c’est', 'ce sont'], answer: 'il y a', explain: 'Se expresa existencia.' }] },
    { scene: 'Présentation', lines: [['', '[[0]] mes collègues. [[1]] très sympathiques.']], blanks: [{ options: ['Ce sont', 'C’est', 'Il y a'], answer: 'Ce sont', explain: 'Presentación plural.' }, { options: ['Ils sont', 'C’est', 'Il y a'], answer: 'Ils sont', explain: 'Después se describe el referente plural.' }] },
    { scene: 'Ville', lines: [['', '[[0]] place est célèbre; [[1]] la place centrale.']], blanks: [{ options: ['Cette', 'Ce', 'Ces'], answer: 'Cette', explain: 'Place es femenino.' }, { options: ['c’est', 'il y a', 'ce sont'], answer: 'c’est', explain: 'Se identifica la plaza.' }] },
  ],
  guided: { text: 'Bienvenue dans [[0]] quartier. [[1]] un marché le samedi. [[2]] marché est très animé. Voici Lina : [[3]] notre guide. Derrière elle, [[4]] nos vélos et [[5]] prêts pour la visite.', blanks: [
    { options: ['ce', 'cet', 'cette'], answer: 'ce', explain: 'Quartier: masculino ante consonante.' }, { options: ['Il y a', 'C’est', 'Ce sont'], answer: 'Il y a', explain: 'Existencia del mercado.' }, { options: ['Ce', 'Cet', 'Cette'], answer: 'Ce', explain: 'Marché: masculino ante consonante.' }, { options: ['c’est', 'elle est', 'il y a'], answer: 'c’est', explain: 'Identificación con grupo nominal.' }, { options: ['ce sont', 'c’est', 'il y a'], answer: 'ce sont', explain: 'Presentación plural.' }, { options: ['ils sont', 'c’est', 'il y a'], answer: 'ils sont', explain: 'Descripción del referente plural.' },
  ] },
  free: { text: 'Regarde [[0]] immeuble. [[1]] très ancien, mais [[2]] appartements modernes à l’intérieur. [[3]] fenêtres donnent sur le parc. La femme à l’entrée, [[4]] la propriétaire; [[5]] architecte.', blanks: [
    { answer: 'cet', accepted: ['cet', 'Cet'], explain: 'Immeuble: masculino ante vocal.' }, { answer: 'Il est', accepted: ['Il est', 'il est'], explain: 'Se describe el edificio ya señalado.' }, { answer: 'il y a', accepted: ['il y a', 'Il y a'], explain: 'Existencia de apartamentos.' }, { answer: 'Ces', accepted: ['Ces', 'ces'], explain: 'Fenêtres: plural.' }, { answer: 'c’est', accepted: ["c'est", 'c’est', 'C’est'], explain: 'Identificación.' }, { answer: 'Elle est', accepted: ['Elle est', 'elle est'], explain: 'Profesión sin artículo.' },
  ] },
  errorChoices: [
    { prompt: 'Répare : ce appartement.', answer: 'cet appartement.', options: ['cet appartement.', 'cette appartement.', 'ces appartement.'], explain: 'Masculino ante vocal: cet.' },
    { prompt: 'Répare : cet voiture.', answer: 'cette voiture.', options: ['cette voiture.', 'ce voiture.', 'ces voiture.'], explain: 'Voiture es femenino.' },
    { prompt: 'Répare : c’est mes amis.', answer: 'ce sont mes amis.', options: ['ce sont mes amis.', 'il y a mes amis.', 'ils est mes amis.'], explain: 'Presentación plural estándar: ce sont.' },
    { prompt: 'Répare : il y a mon frère Paul.', answer: 'c’est mon frère Paul.', options: ['c’est mon frère Paul.', 'ce frère Paul.', 'il est y a Paul.'], explain: 'Aquí se identifica quién es Paul.' },
    { prompt: 'Répare : cette hôtel.', answer: 'cet hôtel.', options: ['cet hôtel.', 'ce hôtel.', 'ces hôtel.'], explain: 'Hôtel es masculino con h muda.' },
    { prompt: 'Répare : voici Léa, c’est médecin.', answer: 'voici Léa, elle est médecin.', options: ['voici Léa, elle est médecin.', 'voici Léa, il y a médecin.', 'voici Léa, ce sont médecin.'], explain: 'Persona identificada + profesión sin artículo: elle est.' },
  ],
  writing: [
    { prompt: 'Presenta cuatro objetos con las cuatro formas demostrativas.', answer: 'Ce livre, cet agenda, cette carte et ces photos sont à moi.', explain: 'Incluye ce, cet, cette y ces.' },
    { prompt: 'Presenta una persona y luego descríbela.', answer: 'C’est Nadia. Elle est ingénieure et elle est très patiente.', explain: 'C’est identifica; elle est describe.' },
    { prompt: 'Describe lo que existe en tu barrio.', answer: 'Dans mon quartier, il y a un parc, deux cafés et une bibliothèque.', explain: 'Il y a no cambia con singular o plural.' },
    { prompt: 'Conecta demostrativo, identificación y existencia.', answer: 'Cette rue est agréable. C’est la rue du marché et il y a beaucoup de boutiques.', explain: 'Las tres funciones aparecen en un contexto coherente.' },
  ],
})
