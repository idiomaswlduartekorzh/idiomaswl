import type { RoleplayToolkit } from './types.ts'

/** Caja común para los veinte roleplays de francés A2. No es un diálogo en orden. */
export const TOOLKIT_FRANCES_A2: RoleplayToolkit = {
  language: 'frances',
  level: 'a2',
  intro:
    'Choisissez une expression utile et ajoutez vos propres informations. Ne lisez pas toutes les lignes dans l’ordre : cette boîte sert à continuer la conversation, ce n’est pas un dialogue déjà écrit.',
  blocks: [
    {
      number: 1,
      title: 'Commencer avec le bon traitement',
      rows: [
        { form: 'Bonjour, vous avez un moment, s’il vous plaît ?', when: 'pour parler à un employé ou à une personne inconnue', register: 'vous · poli' },
        { form: 'Excusez-moi, je viens pour …', when: 'pour annoncer brièvement la raison de la visite', register: 'vous · poli' },
        { form: 'Salut, tu peux parler un instant ?', when: 'avec un ami, un collègue proche ou un voisin connu', register: 'tu · courant' },
        { form: 'Bonjour, qu’est-ce que je peux faire pour vous ?', when: 'quand le personnel ouvre l’échange', register: 'vous · service', tag: '[grants]' },
      ],
      tail: 'Vérifiez la relation indiquée sur votre fiche. Gardez vous ou tu pendant toute la conversation.',
    },
    {
      number: 2,
      title: 'Faire répéter et vérifier',
      tag: '[receives]',
      rows: [
        { form: 'Excusez-moi, vous pouvez répéter plus lentement ?', reading: '[vu pu-ve re-pe-te]', when: 'quand une information est trop rapide', register: 'vous · poli' },
        { form: 'Qu’est-ce que … veut dire ?', when: 'quand un mot ou une expression bloque la compréhension', register: 'vous/tu · courant' },
        { form: 'Si j’ai bien compris, …, c’est ça ?', when: 'pour reformuler le point principal', register: 'vous/tu · neutre' },
        { form: 'Vous parlez de … ou de … ?', when: 'pour séparer deux possibilités proches', register: 'vous · poli' },
      ],
    },
    {
      number: 3,
      title: 'Expliquer autrement',
      tag: '[jargon]',
      note: 'La personne qui emploie un mot difficile doit aussi aider. Ne répétez pas seulement plus fort : changez les mots.',
      rows: [
        { form: 'Autrement dit, …', when: 'pour présenter la même idée avec des mots plus simples', register: 'vous/tu · neutre' },
        { form: 'Ce n’est pas …, c’est …', when: 'pour corriger une confusion précise', register: 'vous/tu · courant' },
        { form: 'Par exemple, …', when: 'quand un exemple court aide plus qu’une définition', register: 'vous/tu · neutre' },
        { form: 'Quand je dis …, je veux dire …', when: 'pour expliquer une règle ou un terme du service', register: 'vous/tu · neutre' },
      ],
    },
    {
      number: 4,
      title: 'Donner une raison et un besoin',
      rows: [
        { form: '… parce que …', when: 'pour donner une raison personnelle et directe', register: 'vous/tu · courant' },
        { form: 'Comme …, j’ai besoin de …', when: 'pour placer la situation avant la demande', register: 'vous/tu · neutre' },
        { form: 'Le problème, c’est que …', when: 'pour nommer l’obstacle principal', register: 'vous/tu · courant' },
        { form: 'C’est important pour moi parce que …', when: 'pour expliquer ce que la personne risque de perdre', register: 'vous/tu · courant' },
      ],
    },
    {
      number: 5,
      title: 'Refuser et poser une limite',
      tag: '[grants]',
      rows: [
        { form: 'Je suis désolé, mais ce n’est pas possible.', when: 'pour refuser une option, pas la personne', register: 'vous/tu · poli' },
        { form: 'Je peux aller jusqu’à …, mais pas plus.', when: 'pour donner une limite de prix, de temps ou de quantité', register: 'vous/tu · neutre' },
        { form: 'Pour le moment, je ne peux pas …', when: 'pour limiter une action à la situation actuelle', register: 'vous/tu · neutre' },
        { form: 'Cette solution ne me convient pas parce que …', when: 'pour refuser avec une raison vérifiable', register: 'vous/tu · neutre' },
      ],
    },
    {
      number: 6,
      title: 'Proposer une condition ou une autre solution',
      rows: [
        { form: 'Si …, on peut …', when: 'pour faire dépendre la solution d’un fait à vérifier', register: 'vous/tu · courant' },
        { form: 'Une autre possibilité serait de …', when: 'pour ouvrir une deuxième voie', register: 'vous/tu · poli' },
        { form: 'Au lieu de …, je vous propose …', when: 'pour remplacer une option impossible', register: 'vous · service' },
        { form: 'Est-ce que … vous conviendrait ?', when: 'pour demander si la condition est acceptable', register: 'vous · poli', tag: '[grants]' },
      ],
    },
    {
      number: 7,
      title: 'Gagner du temps et fixer la suite',
      rows: [
        { form: 'Un instant, je vais vérifier.', when: 'avant de consulter un document ou une règle', register: 'vous/tu · neutre' },
        { form: 'J’ai besoin de quelques minutes pour décider.', when: 'quand une réponse immédiate n’est pas possible', register: 'vous/tu · neutre' },
        { form: 'Je vous donnerai une réponse avant …', when: 'pour promettre un nouveau contact avec une heure', register: 'vous · poli' },
        { form: 'D’abord, on va … ; ensuite, …', when: 'pour répartir deux actions dans le temps', register: 'vous/tu · courant' },
      ],
      tail: 'N’inventez pas une réponse. Dites qui vérifie, quelle information manque et quand la réponse arrivera.',
    },
    {
      number: 8,
      title: 'Confirmer et terminer',
      rows: [
        { form: 'D’accord, on choisit donc …', when: 'pour nommer l’option réellement retenue', register: 'vous/tu · courant' },
        { form: 'Je récapitule : …, c’est bien ça ?', when: 'pour vérifier les informations avec ses propres mots', register: 'vous · neutre' },
        { form: 'Qui va faire quoi, et avant quelle heure ?', when: 'pour attribuer l’action et le délai', register: 'vous/tu · neutre' },
        { form: 'Merci pour votre aide. À …', when: 'pour terminer après avoir fixé le prochain contact', register: 'vous · poli' },
      ],
      tail: 'Un simple « d’accord » ne suffit pas. Les deux personnes doivent pouvoir répéter la même option, le responsable et l’heure.',
    },
  ],
}
