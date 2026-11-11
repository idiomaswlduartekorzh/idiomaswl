import { createFrenchA1Supplement } from './supplement-factory'

export default createFrenchA1Supplement({
  slug: 'articles-partitifs', color: '#2563eb', category: 'Déterminants',
  title: 'Les articles partitifs en français A1 : du, de la, de l’ et des',
  shortTitle: 'Articles partitifs',
  metaTitle: 'Articles partitifs en français A1 — du, de la, de l’, des et de après la négation',
  description: 'Los artículos partitivos du, de la, de l’ y des presentan una cantidad no contada de comida, materia o idea. Esta lección los contrasta con los artículos definidos e indefinidos y explica el cambio a de o d’ después de una negación o una expresión de cantidad.',
  lead: 'Aprende a pedir, describir y negar cantidades naturales: du pain, de la soupe, de l’eau, des légumes, mais pas de sucre.',
  outcomes: ['Elegir du, de la, de l’ o des según el nombre', 'Cambiar el partitivo después de la negación', 'Distinguir cantidad no contada, unidad y referencia general', 'Usar de después de expresiones de cantidad'],
  goal: 'Expresar cantidades no contadas y transformar correctamente el determinante en frases afirmativas, negativas y cuantificadas.',
  model: 'Je bois de l’eau, mais je ne prends pas de sucre.',
  formula: 'du + masculin | de la + féminin | de l’ + voyelle | des + pluriel | négation/quantité + de',
  decisions: ['Decide si nombras una cantidad o la categoría en general.', 'Identifica género, número y sonido inicial del sustantivo.', 'Usa du, de la, de l’ o des en una afirmación no cuantificada.', 'Después de ne… pas, transforma normalmente el partitivo en de o d’.', 'Después de beaucoup, peu, un kilo o une tasse, usa de.', 'Con aimer, adorer o détester para una categoría general, usa le, la, l’ o les.'],
  table: [['Situación', 'Forma', 'Ejemplo'], ['masculino no contado', 'du', 'Je mange du pain.'], ['femenino no contado', 'de la', 'Elle prépare de la soupe.'], ['vocal o h muda', 'de l’', 'Nous buvons de l’eau.'], ['plural no contado', 'des', 'Ils achètent des légumes.'], ['negación', 'de / d’', 'Je ne bois pas de café.'], ['cantidad explícita', 'de / d’', 'Un litre de lait.'], ['categoría general', 'le / la / les', 'J’aime le chocolat.']],
  mistakes: ['Je ne mange pas du pain → Je ne mange pas de pain.', 'Beaucoup des fruits → beaucoup de fruits.', 'J’aime du café para gusto general → J’aime le café.', 'De le pain → du pain; de + le se contrae.'],
  sections: [
    { heading: '¿Qué expresa un artículo partitivo?', paragraphs: ['El partitivo presenta una cantidad que no se cuenta como unidades: du riz, de la musique, de l’air. No significa necesariamente “un poco de”; indica que se toma una parte de una materia o noción.', 'Compara Je mange un gâteau, una unidad completa, con Je mange du gâteau, una porción de pastel. El sustantivo puede ser el mismo, pero la manera de medirlo cambia.'], table: [['Unidad', 'Cantidad no contada', 'Lectura'], ['un café', 'du café', 'una taza / café como bebida'], ['une tarte', 'de la tarte', 'una tarta / una porción'], ['des pommes', 'de la pomme', 'manzanas / pulpa o ingrediente']] },
    { heading: 'La regla después de la negación', paragraphs: ['Con ne… pas, ne… jamais y otras negaciones de cantidad, du, de la, de l’ y des suelen convertirse en de o d’: Il boit du lait → Il ne boit pas de lait.', 'El verbo être conserva normalmente el artículo: Ce n’est pas du fromage. Aquí no se niega una cantidad disponible, sino la identidad del elemento.'] },
    { heading: 'Partitivo, definido e indefinido', paragraphs: ['Usa el definido para hablar de una categoría conocida o general: J’aime le thé. Usa el indefinido para una unidad: Je prends un thé. Usa el partitivo para una cantidad: Je bois du thé.', 'La elección cambia el significado; por eso conviene formular primero la intención y después seleccionar el artículo.'] },
  ],
  scenes: [['du pain', 'cantidad de un nombre masculino'], ['de la confiture', 'cantidad de un nombre femenino'], ['de l’eau', 'elisión ante vocal'], ['des légumes', 'cantidad plural'], ['pas de sucre', 'negación de cantidad'], ['beaucoup de café', 'cantidad explícita'], ['le chocolat', 'categoría general'], ['un chocolat', 'una unidad o servicio']],
  choices: [
    { prompt: 'Je prends ___ pain.', answer: 'du', options: ['du', 'de la', 'de l’', 'un'], explain: 'Pain es masculino y se presenta como cantidad no contada.' },
    { prompt: 'Elle prépare ___ salade.', answer: 'de la', options: ['du', 'de la', 'des', 'la'], explain: 'Salade es femenino singular y la cantidad no está medida.' },
    { prompt: 'Nous buvons ___ eau.', answer: 'de l’', options: ['de l’', 'du', 'de la', 'une'], explain: 'Ante vocal se usa de l’.' },
    { prompt: 'Ils achètent ___ fraises.', answer: 'des', options: ['des', 'du', 'de la', 'les'], explain: 'Fraises es plural y se presenta como cantidad.' },
    { prompt: 'Je ne prends pas ___ sucre.', answer: 'de', options: ['de', 'du', 'le', 'des'], explain: 'La negación transforma el partitivo en de.' },
    { prompt: 'Il boit beaucoup ___ café.', answer: 'de', options: ['de', 'du', 'le', 'des'], explain: 'Beaucoup ya expresa cantidad y exige de.' },
    { prompt: 'J’aime ___ fromage.', answer: 'le', options: ['le', 'du', 'un', 'de'], explain: 'Con aimer y una categoría general se usa el artículo definido.' },
    { prompt: 'Vous voulez ___ thé ?', answer: 'du', options: ['du', 'de la', 'le', 'des'], explain: 'Se ofrece una cantidad no medida de té.' },
  ],
  dual: [
    { scene: 'Petit-déjeuner', lines: [['', 'Je prends [[0]] café, mais je ne prends pas [[1]] sucre.']], blanks: [{ options: ['du', 'de la', 'des'], answer: 'du', explain: 'Café es masculino no contado.' }, { options: ['de', 'du', 'le'], answer: 'de', explain: 'Después de pas, partitivo → de.' }] },
    { scene: 'Marché', lines: [['', 'Nous achetons [[0]] tomates et un kilo [[1]] pommes.']], blanks: [{ options: ['des', 'du', 'de la'], answer: 'des', explain: 'Tomates es plural.' }, { options: ['de', 'des', 'les'], answer: 'de', explain: 'Un kilo es una cantidad explícita.' }] },
    { scene: 'Dîner', lines: [['', 'Elle mange [[0]] soupe et boit [[1]] eau.']], blanks: [{ options: ['de la', 'du', 'des'], answer: 'de la', explain: 'Soupe es femenino singular.' }, { options: ['de l’', 'du', 'une'], answer: 'de l’', explain: 'Eau empieza por vocal.' }] },
    { scene: 'Goûts', lines: [['', 'J’aime [[0]] chocolat, mais ce soir je mange [[1]] chocolat.']], blanks: [{ options: ['le', 'du', 'un'], answer: 'le', explain: 'Gusto general con aimer.' }, { options: ['du', 'le', 'de'], answer: 'du', explain: 'Cantidad consumida en esta situación.' }] },
  ],
  guided: { text: 'Pour le pique-nique, nous achetons [[0]] pain, [[1]] fromage, [[2]] eau et [[3]] fruits. Léa ne prend pas [[4]] viande. Elle apporte une bouteille [[5]] jus.', blanks: [
    { options: ['du', 'de la', 'des'], answer: 'du', explain: 'Pain: masculino no contado.' }, { options: ['du', 'de la', 'des'], answer: 'du', explain: 'Fromage: masculino no contado.' }, { options: ['de l’', 'du', 'une'], answer: 'de l’', explain: 'Eau: elisión.' }, { options: ['des', 'du', 'les'], answer: 'des', explain: 'Fruits: plural.' }, { options: ['de', 'de la', 'la'], answer: 'de', explain: 'Negación de cantidad.' }, { options: ['de', 'du', 'le'], answer: 'de', explain: 'Bouteille expresa cantidad.' },
  ] },
  free: { text: 'Au café, je commande [[0]] thé et [[1]] tarte. Mon ami ne veut pas [[2]] dessert; il boit seulement un verre [[3]] eau. Nous aimons [[4]] cuisine française et nous achetons souvent [[5]] produits locaux.', blanks: [
    { answer: 'du', accepted: ['du'], explain: 'Thé: cantidad no contada.' }, { answer: 'de la', accepted: ['de la'], explain: 'Tarte: porción femenina.' }, { answer: 'de', accepted: ['de'], explain: 'Negación.' }, { answer: 'd’', accepted: ["d'", 'd’'], explain: 'Cantidad + de ante vocal.' }, { answer: 'la', accepted: ['la'], explain: 'Categoría general con aimer.' }, { answer: 'des', accepted: ['des'], explain: 'Cantidad plural.' },
  ] },
  errorChoices: [
    { prompt: 'Répare : Je ne bois pas du lait.', answer: 'Je ne bois pas de lait.', options: ['Je ne bois pas de lait.', 'Je ne bois de pas lait.', 'Je ne bois pas le lait.'], explain: 'Pas de sustituye el partitivo.' },
    { prompt: 'Répare : Il achète beaucoup des légumes.', answer: 'Il achète beaucoup de légumes.', options: ['Il achète beaucoup de légumes.', 'Il achète du légumes.', 'Il achète beaucoup les légumes.'], explain: 'Beaucoup de no lleva artículo intermedio.' },
    { prompt: 'Répare : J’aime du thé.', answer: 'J’aime le thé.', options: ['J’aime le thé.', 'J’aime de thé.', 'J’aime un thé toujours.'], explain: 'Gusto general: artículo definido.' },
    { prompt: 'Répare : Elle boit de la eau.', answer: 'Elle boit de l’eau.', options: ['Elle boit de l’eau.', 'Elle boit du eau.', 'Elle boit des eaux.'], explain: 'Se elide de la ante vocal.' },
    { prompt: 'Répare : Nous prenons de le pain.', answer: 'Nous prenons du pain.', options: ['Nous prenons du pain.', 'Nous prenons de pain.', 'Nous prenons le du pain.'], explain: 'De + le se contrae en du.' },
    { prompt: 'Répare : un kilo des pommes.', answer: 'un kilo de pommes.', options: ['un kilo de pommes.', 'un kilo du pommes.', 'un kilo les pommes.'], explain: 'La cantidad explícita exige de.' },
  ],
  writing: [
    { prompt: 'Describe un desayuno con cuatro cantidades diferentes.', answer: 'Je prends du pain, de la confiture, de l’eau et des fruits.', explain: 'Incluye las cuatro formas partitivas.' },
    { prompt: 'Transforma una lista afirmativa en una lista negativa.', answer: 'Je mange du fromage, mais je ne mange pas de viande.', explain: 'La negación cambia el partitivo a de.' },
    { prompt: 'Contrasta gusto general y consumo puntual.', answer: 'J’aime le café, mais ce soir je bois du thé.', explain: 'Definido para la categoría; partitivo para la cantidad.' },
    { prompt: 'Usa una expresión de cantidad.', answer: 'Nous achetons deux litres de lait.', explain: 'La unidad cuantificadora va seguida de de.' },
  ],
})
