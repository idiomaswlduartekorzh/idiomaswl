import type { GrammarTopic } from '../types.ts'

export type FrenchAdvancedPattern = {
  label: string
  pattern: string
  example: string
  cue: string
  source: string
  key: string
  warning: string
}

export type FrenchAdvancedCurriculumSpec = {
  slug: string
  order: string
  level: 'B2' | 'C1' | 'C2'
  category: string
  color: string
  shortTitle: string
  description: string
  purpose: string
  register: string
  formula: string
  model: string
  patterns: [FrenchAdvancedPattern, FrenchAdvancedPattern, FrenchAdvancedPattern]
}

const rotate = <T,>(items: T[], offset: number) => items.map((_, index) => items[(index + offset) % items.length])

function cloze(example: string, key: string, index: number) {
  const position = example.toLocaleLowerCase('fr').indexOf(key.toLocaleLowerCase('fr'))
  if (position < 0) throw new Error(`La clé « ${key} » est absente de l’exemple « ${example} ».`)
  return `${example.slice(0, position)}[[${index}]]${example.slice(position + key.length)}`
}

export function createFrenchAdvancedCurriculumTopic(spec: FrenchAdvancedCurriculumSpec): GrammarTopic {
  const patterns = spec.patterns
  const examples = patterns.map((pattern) => pattern.example)
  const labels = patterns.map((pattern) => pattern.label)
  const cues = patterns.map((pattern) => pattern.cue)
  const recognition = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    const interpret = index >= patterns.length
    return {
      scene: `${interpret ? 'Interprétation' : 'Choix de sens'} ${index + 1}`,
      lines: [['', interpret ? `Que communique « ${target.example} » dans ce contexte ?` : `Quelle phrase exprime le mieux cette intention : ${target.cue} ?`]] as [string, string][],
      options: rotate(interpret ? cues : examples, index % examples.length),
      answer: interpret ? target.cue : target.example,
      explain: interpret ? `La structure « ${target.label} » communique ${target.cue.toLowerCase()}.` : `« ${target.label} » convient parce qu’elle exprime ${target.cue.toLowerCase()}.`,
    }
  })
  const dual = patterns.map((target, index) => ({
    scene: `Forme et fonction ${index + 1}`,
    lines: [['', `« ${target.example} » emploie [[0]] pour exprimer [[1]].`]] as [string, string][],
    blanks: [
      { options: rotate(labels, index), answer: target.label, explain: `La structure appartient au modèle « ${target.label} ».` },
      { options: rotate(cues, index), answer: target.cue, explain: `Sa fonction communicative est ${target.cue.toLowerCase()}.` },
    ],
  }))
  const guidedBlanks = Array.from({ length: 6 }, (_, index) => {
    const target = patterns[index % patterns.length]
    return { options: rotate(examples, index % examples.length), answer: target.example, explain: `${target.label} : ${target.pattern}.` }
  })
  const freeItems = [
    ...patterns.map((target, index) => ({ text: cloze(target.example, target.key, index), answer: target.key, explain: `Le modèle « ${target.label} » exige « ${target.key} ». ${target.pattern}.` })),
    ...patterns.slice(0, 2).map((target, index) => ({ text: `Donnez la structure complète de « ${target.label} » : [[${index + patterns.length}]].`, answer: target.pattern, explain: `« ${target.label} » se construit ainsi : ${target.pattern}.` })),
  ]

  return {
    slug: spec.slug,
    order: spec.order,
    color: spec.color,
    category: spec.category,
    level: spec.level,
    title: `${spec.shortTitle} en français ${spec.level}`,
    shortTitle: spec.shortTitle,
    metaTitle: `${spec.shortTitle} ${spec.level} : cours, exercices et PDF`,
    description: spec.description,
    lead: `${spec.description} Cette leçon relie la forme, le sens, le registre et la révision éditoriale au lieu d’isoler une règle hors contexte.`,
    outcomes: [
      `Reconnaître les principaux emplois associés à ${spec.shortTitle.toLowerCase()} dans des contextes authentiques.`,
      `Choisir une forme afin de ${spec.purpose.toLowerCase()}.`,
      `Éviter les erreurs qui modifient le temps, l’agent, la portée ou le degré d’engagement.`,
      `Employer la structure avec précision dans les contextes suivants : ${spec.register.toLowerCase()}.`,
    ],
    guide: {
      goal: `Maîtriser ${spec.shortTitle.toLowerCase()} afin de ${spec.purpose.toLowerCase()}, tout en préservant le sens et le registre visés.`,
      model: spec.model,
      formula: spec.formula,
      decisions: [
        `Identifiez d’abord l’intention communicative : ${spec.purpose}.`,
        `Repérez le déclencheur et rattachez-le à l’un des modèles de référence.`,
        `Vérifiez le repérage temporel, les relations entre propositions, l’agent et l’engagement énonciatif.`,
        `Relisez la phrase entière et assurez-vous que son registre convient à ${spec.register.toLowerCase()}.`,
        `Comparez avec une formulation neutre et gardez la forme marquée uniquement si elle apporte une nuance utile.`,
      ],
      table: [
        ['Emploi', 'Construction', 'Exemple'],
        ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example] as [string, string, string]),
      ],
      mistakes: patterns.map((pattern) => pattern.warning),
    },
    seo: [
      {
        heading: `Fonctions de ${spec.shortTitle.toLowerCase()}`,
        paragraphs: [
          spec.description,
          `L’objectif central consiste à ${spec.purpose.toLowerCase()}. Le bon choix conserve donc la proposition tout en rendant visibles la relation logique, le point de vue ou le degré d’engagement.`,
        ],
        examples: patterns.map((pattern) => [pattern.example, pattern.cue]),
      },
      {
        heading: 'Comment construire la structure',
        paragraphs: [
          `Utilisez cette formule de travail : ${spec.formula}. Elle fonctionne comme un parcours de décision : déclencheur, architecture de la phrase, puis élément porteur du temps ou du mode.`,
          `Le modèle « ${spec.model} » montre la structure complète en contexte. Reconstruisez-la du sens vers la forme sans traduire mot à mot.`,
        ],
        table: [['Choix', 'Structure', 'Exemple'], ...patterns.map((pattern) => [pattern.label, pattern.pattern, pattern.example])],
      },
      {
        heading: 'Choisir selon le sens, pas selon la ressemblance',
        paragraphs: [
          'Des structures voisines peuvent partager des mots tout en remplissant des fonctions différentes. Nommez l’effet recherché avant de compléter la phrase.',
          'Une réponse solide explique pourquoi la forme choisie convient et pourquoi une autre option modifierait la chronologie, la portée, la focalisation ou le degré de certitude.',
        ],
        table: [['Sens visé', 'Construction recommandée'], ...patterns.map((pattern) => [pattern.cue, pattern.label])],
      },
      {
        heading: 'Registre, discours et contrôle éditorial',
        paragraphs: [
          `Ce point de grammaire est particulièrement utile dans les contextes suivants : ${spec.register.toLowerCase()}. Il doit faciliter l’interprétation, et non rendre artificiellement la phrase plus complexe.`,
          'Après la révision, contrôlez la référence, l’ordre naturel des constituants et la cohérence avec le paragraphe. Si la forme marquée crée une ambiguïté, revenez à une proposition plus explicite.',
        ],
      },
    ],
    visual: {
      mode: `francais-avance-${spec.slug}`,
      teacherLens: 'La carte va de l’intention communicative au déclencheur, puis à la phrase finale. Le sens et la forme restent visibles afin de justifier chaque choix.',
      graphicPrompt: `Infographie grammaticale minimaliste sur ${spec.shortTitle} : intention, structure, contraste et vérification finale.`,
      scene: patterns.map((pattern) => [pattern.example, pattern.cue]),
      learnerModes: ['visuel : cartographier la relation', 'analytique : justifier la forme', 'éditorial : contrôler le registre'],
      practiceVerbs: ['Repérer', 'Comparer', 'Construire', 'Transformer', 'Réviser', 'Produire'],
      reviewFocus: ['intention communicative', 'déclencheur grammatical', 'contraste de sens', 'choix de registre'],
    },
    practice: {
      levels: [
        { id: 'level-1', title: 'Reconnaissance en contexte', tag: '6 décisions', intro: 'Choisissez la phrase dont la grammaire correspond à l’intention annoncée.', type: 'choice', items: recognition },
        { id: 'level-2', title: 'Forme et fonction', tag: '2 éléments liés', intro: 'Identifiez la famille grammaticale et le sens porté par chaque modèle.', type: 'dual', items: dual },
        {
          id: 'level-3', title: 'Choix guidés en discours', tag: '6 choix contextualisés', intro: 'Maintenez la forme et le sens dans une suite cohérente de décisions.', type: 'guidedText', scene: 'Planification éditoriale',
          text: [...patterns.map((pattern, index) => `Choisissez le modèle qui exprime ${pattern.cue} : [[${index}]].`), ...patterns.map((pattern, index) => `Choisissez le modèle construit avec ${pattern.pattern} : [[${index + patterns.length}]].`)].join(' '),
          blanks: guidedBlanks,
        },
        { id: 'level-4', title: 'Reconstruction ouverte', tag: '5 éléments à retrouver', intro: 'Rétablissez le déclencheur grammatical sans banque de mots.', type: 'freeText', scene: 'Reconstruction autonome', text: freeItems.map((item) => item.text).join(' '), blanks: freeItems.map(({ answer, explain }) => ({ answer, explain })) },
        {
          id: 'level-5', title: 'Transformation contrôlée', tag: '4 reformulations', intro: 'Reformulez la source neutre afin d’obtenir la fonction avancée demandée.', type: 'write',
          items: Array.from({ length: 4 }, (_, index) => {
            const target = patterns[index % patterns.length]
            return { scene: `Transformation ${index + 1}`, prompt: `Reformulez « ${target.source} » avec le modèle « ${target.label} » afin d’exprimer ${target.cue.toLowerCase()}.`, answer: target.example, accepted: [target.key], explain: `${target.pattern}. La reformulation conserve le message tout en ajoutant l’effet de « ${target.label} ».` }
          }),
        },
        {
          id: 'level-6', title: 'Production communicative', tag: '3 tâches développées', intro: 'Employez la grammaire de manière autonome dans des contextes réalistes.', type: 'write',
          items: patterns.map((target, index) => ({ scene: `Tâche de production ${index + 1}`, prompt: `Rédigez deux phrases liées. Utilisez « ${target.label} » pour exprimer ${target.cue.toLowerCase()}, puis ajoutez une formulation neutre qui rende le contraste évident.`, answer: `${target.example} Le contexte reprendrait ensuite la même situation dans une formulation neutre.`, accepted: [target.key], explain: `Une réponse solide emploie ${target.pattern} avec précision et rend l’intention communicative visible.` })),
        },
      ],
    },
  }
}

export function pattern(label: string, form: string, example: string, cue: string, source: string, key: string, warning: string): FrenchAdvancedPattern {
  return { label, pattern: form, example, cue, source, key, warning }
}
