'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'preterito_perfeito_imperfeito',
    title: 'Pretérito perfeito vs imperfeito',
    icon: '⏰',
    rule: "Pretérito perfeito: ações concluídas em um momento específico do passado (ontem fui ao mercado). Pretérito imperfeito: ações habituais no passado (quando era criança, ia à praia todo verão) ou descrições de estados passados (a casa era grande / chovia muito). Marcadores: perfeito = ontem, semana passada, em 2020, de repente; imperfeito = sempre, todos os dias, quando era criança, naquela época.",
    tip: "Teste rápido: se a ação aconteceu UMA VEZ em um momento específico → perfeito. Se era REPETIDA ou HABITUAL → imperfeito. Se descreve COMO ERA (estado, contexto) → imperfeito.",
    table: {
      headers: ['Pronome', 'falar (perfeito)', 'falar (imperfeito)', 'ser (imperfeito)'],
      rows: [
        ['eu', 'falei', 'falava', 'era'],
        ['tu', 'falaste', 'falavas', 'eras'],
        ['ele/ela', 'falou', 'falava', 'era'],
        ['nós', 'falamos', 'falávamos', 'éramos'],
        ['vocês', 'falaram', 'falavam', 'eram'],
        ['eles/elas', 'falaram', 'falavam', 'eram'],
      ]
    },
    a1note: "No A1, você usava o presente: \"Eu como pizza todos os dias.\" No A2, o pretérito perfeito narra eventos terminados: \"Ontem, eu comi pizza.\" E o imperfeito descreve hábitos passados: \"Quando era criança, eu comia pizza todo sábado.\" São três realidades temporais diferentes — presente, passado pontual e passado habitual.",
    examples: [
      "Ontem, nós fomos ao cinema e assistimos a um filme incrível. (perfeito: ação única e concluída ontem)",
      "Quando era criança, eu brincava na rua todos os dias depois da escola. (imperfeito: hábito passado repetido)",
      "Ela dormia quando o telefone tocou. (imperfeito = ação em curso; perfeito = ação que interrompeu)",
    ],
    fills: [
      { s: "Quando era criança, eu ___ na rua todos os dias.", opts: ["brincava", "brinquei", "brinco", "brincarei"], a: 0, fb: "'Brincava' — imperfeito para hábito passado. 'Quando era criança + todos os dias' = ação repetida → imperfeito." },
      { s: "Ontem, nós ___ ao cinema juntos.", opts: ["fomos", "íamos", "vamos", "foram"], a: 0, fb: "'Fomos' — pretérito perfeito para ação concluída em momento específico. 'Ontem' = marcador do perfeito." },
      { s: "Ela ___ quando o telefone tocou.", opts: ["dormia", "dormiu", "dorme", "dormirá"], a: 0, fb: "'Dormia' — imperfeito para ação em progresso interrompida pelo perfeito 'tocou'. Esquema clássico A2." },
      { s: "No ano passado, eles ___ para o Nordeste.", opts: ["viajaram", "viajavam", "viajam", "viajarão"], a: 0, fb: "'Viajaram' — perfeito para ação concluída. 'No ano passado' = tempo específico → pretérito perfeito." },
      { s: "O apartamento ___ pequeno mas muito aconchegante.", opts: ["era", "foi", "é", "será"], a: 0, fb: "'Era' — imperfeito para descrição de estado passado. Descrever como algo era → imperfeito, não perfeito." },
    ],
    transforms: [
      { prompt: "Reescreva usando o pretérito perfeito:", s: "Todos os dias, ela vai ao parque. (ontem)", opts: ["Ontem, ela foi ao parque.", "Ontem, ela ia ao parque.", "Ontem, ela vai ao parque.", "Ontem, ela iria ao parque."], a: 0, fb: "Ir (irreg.): presente = vai, imperfeito = ia, perfeito = foi. 'Ontem' = momento específico → pretérito perfeito: 'foi'." },
      { prompt: "Reescreva descrevendo o hábito passado (imperfeito):", s: "Todo sábado, eu nado na piscina. (quando era criança)", opts: ["Quando era criança, todo sábado, eu nadava na piscina.", "Quando era criança, todo sábado, eu nadei na piscina.", "Quando era criança, todo sábado, eu nado na piscina.", "Quando era criança, todo sábado, eu vou nadar na piscina."], a: 0, fb: "Hábito passado repetido → imperfeito: 'nadava'. 'Quando era criança + todo sábado' = frequência habitual." },
      { prompt: "Combine os dois tempos (ação em curso + interrupção):", s: "Eu ler / o João entrar. (ação em curso + interrupção)", opts: ["Eu lia quando o João entrou.", "Eu li quando o João entrava.", "Eu lia quando o João entrava.", "Eu li quando o João entrou."], a: 0, fb: "Ação em curso = imperfeito (lia); ação que interrompe = perfeito (entrou). 'Eu lia' (em curso) quando 'o João entrou' (interrompeu)." },
    ],
    errors: [
      { s: "Quando tinha 10 anos, eu fui à praia todos os dias.", q: "Qual é o erro?", opts: ["'fui' deve ser 'ia' (hábito repetido = imperfeito)", "'tinha' deve ser 'tive'", "'todos os dias' deve ser 'todo dia'", "Não há erro"], a: 0, fb: "'Todos os dias' = hábito repetido → imperfeito. Correto: \"Quando tinha 10 anos, eu IA à praia todos os dias.\"" },
      { s: "De repente, ela lembrava o nome do professor.", q: "Qual é o erro?", opts: ["'lembrava' deve ser 'lembrou' (ação súbita e pontual = perfeito)", "'de repente' deve ser 'de vez em quando'", "'professor' deve ser 'professora'", "Não há erro"], a: 0, fb: "'De repente' indica ação súbita e pontual → pretérito perfeito. Correto: \"De repente, ela LEMBROU o nome do professor.\"" },
    ],
    production: "Conta como era a tua vida quando eras criança (3-4 frases com imperfeito) e depois conta o que aconteceu ontem ou na semana passada (2 frases com perfeito). Combine os dois tempos.",
  },
  {
    id: 'pronomes_obliquos',
    title: 'Pronomes oblíquos átonos',
    icon: '🔗',
    rule: "Pronomes oblíquos átonos substituem o objeto do verbo. Posição: no Brasil = próclise (antes do verbo) ou ênclise (depois); em Portugal = maioritariamente ênclise. No A2, foque em: me, te, o/a, nos, os/as (objeto direto) e me, te, lhe, nos, lhes (objeto indireto). Regra básica: se a ação passa diretamente para algo/alguém → objeto direto (o/a/os/as); se usa preposição 'a' → objeto indireto (lhe/lhes).",
    tip: "Simplificação prática: substituir 'ele/ela' como objeto direto → o/a. Substituir 'para ele/ela' como objeto indireto → lhe. No Brasil coloquial, 'ele' também aparece como objeto ('eu vi ele'), mas nas formas cultas, use os pronomes oblíquos.",
    table: {
      headers: ['Pessoa', 'Objeto Direto', 'Objeto Indireto', 'Reflexivo'],
      rows: [
        ['1sg (eu)', 'me', 'me', 'me'],
        ['2sg (tu)', 'te', 'te', 'te'],
        ['3sg (ele/ela)', 'o / a', 'lhe', 'se'],
        ['1pl (nós)', 'nos', 'nos', 'nos'],
        ['2pl (vocês)', 'os / as', 'lhes', 'se'],
        ['3pl (eles/elas)', 'os / as', 'lhes', 'se'],
      ]
    },
    a1note: "No A1, você repetia os substantivos: \"Eu vi o João. O João é meu amigo.\" No A2, usa pronomes para evitar repetição: \"Eu vi o João. Eu o vi ontem.\" Ou: \"Eu vi a Maria. Eu a vi ontem.\" Isso torna o discurso mais fluente e natural.",
    examples: [
      "Você viu a Ana? Sim, eu a vi no supermercado ontem. (a = objeto direto feminino, substituindo 'a Ana')",
      "Você ligou para o Pedro? Sim, eu lhe liguei cedo. (lhe = objeto indireto, substituindo 'para o Pedro')",
      "Eles me chamaram para a reunião. Eu me preparei bem. (me = objeto direto/reflexivo)",
    ],
    fills: [
      { s: "Você viu a Maria? Sim, eu ___ vi ontem.", opts: ["a", "lhe", "o", "ela"], a: 0, fb: "'A' = pronome objeto direto feminino 3ª pessoa, substituindo 'a Maria'. Objeto direto = sem preposição → o/a." },
      { s: "Você falou com o professor? Sim, eu ___ falei.", opts: ["lhe", "o", "a", "ele"], a: 0, fb: "'Lhe' = pronome objeto indireto 3ª pessoa, substituindo 'com/ao professor'. 'Falar com alguém' → objeto indireto → lhe." },
      { s: "Eles ___ convidaram para a festa. (para mim)", opts: ["me", "lhe", "nos", "se"], a: 0, fb: "'Me' = objeto indireto/direto de 1ª pessoa singular. 'Convidaram para mim' → me. 'Eles me convidaram.'" },
      { s: "A professora explicou a lição. Ela ___ explicou muito bem.", opts: ["a", "lhe", "o", "nos"], a: 0, fb: "'A' = objeto direto feminino singular, substituindo 'a lição'. Sem preposição = objeto direto → a." },
      { s: "Você escreveu para os seus pais? Sim, eu ___ escrevi ontem.", opts: ["lhes", "os", "as", "lhe"], a: 0, fb: "'Lhes' = objeto indireto de 3ª pessoa plural. 'Escrever para alguém (plural)' → objeto indireto → lhes." },
    ],
    transforms: [
      { prompt: "Substitua o objeto direto pelo pronome correto:", s: "Eu comprei os ingressos.", opts: ["Eu os comprei.", "Eu lhes comprei.", "Eu os compraram.", "Eu comprei-os corretamente."], a: 0, fb: "'Os ingressos' = objeto direto masculino plural → 'os'. 'Eu OS comprei.' (próclise, padrão no Brasil)." },
      { prompt: "Substitua o objeto indireto pelo pronome correto:", s: "Ela deu presentes aos filhos.", opts: ["Ela lhes deu presentes.", "Ela os deu presentes.", "Ela deu-lhes presentes para eles.", "Ela lhe deu presentes."], a: 0, fb: "'Aos filhos' = objeto indireto plural → 'lhes'. 'Ela LHES deu presentes.'" },
      { prompt: "Reescreva sem repetir o substantivo (use pronome):", s: "Eu vi a Joana. A Joana estava feliz.", opts: ["Eu vi a Joana. Ela estava feliz.", "Eu a vi a Joana. Ela estava feliz.", "Eu vi a Joana. A vi estava feliz.", "Eu a vi. Ela estava feliz."], a: 3, fb: "Para evitar repetição total: 'Eu A vi. Ela estava feliz.' Usa o pronome oblíquo no primeiro verbo (objeto direto = a) e pronome reto no segundo (sujeito = ela)." },
    ],
    errors: [
      { s: "Você viu ele ontem?", q: "Qual é a forma culta correta?", opts: ["'ele' deve ser 'o' (pronome objeto direto)", "'viu' deve ser 'vê'", "'ontem' deve ser 'hoje'", "Não há erro — é aceitável"], a: 0, fb: "Na forma culta: objeto direto masculino = 'o'. Correto: \"Você O viu ontem?\" No Brasil coloquial 'ele' é comum, mas nas formas escritas/formais use os pronomes oblíquos." },
      { s: "Eu expliquei eles a matéria.", q: "Qual é o erro?", opts: ["'eles' deve ser 'lhes' (objeto indireto)", "'expliquei' deve ser 'explico'", "'matéria' deve ser 'matérias'", "Não há erro"], a: 0, fb: "'Explicar algo A alguém' = objeto indireto → lhes (plural). Correto: \"Eu LHES expliquei a matéria.\"" },
    ],
    production: "Reescreva estas frases substituindo os substantivos em negrito por pronomes oblíquos: 1. Eu vi [a Ana e o Pedro] no parque. 2. Eu dei [o livro] para [a professora]. 3. Você conhece [o meu irmão]? Depois escreva 2 frases originais usando pronomes.",
  },
  {
    id: 'ser_vs_estar',
    title: 'Ser vs Estar',
    icon: '🔵',
    rule: "SER = características permanentes ou essenciais: origem, profissão, identidade, material, relacionamento, hora/data, características físicas permanentes. ESTAR = estados temporários, condições, localização, estados de ânimo, resultado de ação. Frase-chave: 'O Pedro é alto' (sempre foi, sempre será) vs 'O Pedro está cansado' (agora, pode mudar).",
    tip: "Regra prática: se você pode perguntar 'Como está?' → estar. Se você pergunta 'Como é?' (característica) → ser. Localizações de pessoas e eventos = estar. Localizações de eventos fixos no tempo = ser ('A festa é na sexta').",
    table: {
      headers: ['Pronome', 'SER (pres.)', 'ESTAR (pres.)', 'ESTAR (pret. perf.)'],
      rows: [
        ['eu', 'sou', 'estou', 'estive'],
        ['tu', 'és', 'estás', 'estiveste'],
        ['ele/ela', 'é', 'está', 'esteve'],
        ['nós', 'somos', 'estamos', 'estivemos'],
        ['vocês', 'são', 'estão', 'estiveram'],
        ['eles/elas', 'são', 'estão', 'estiveram'],
      ]
    },
    a1note: "No A1, você aprendeu as conjugações básicas: 'Eu sou brasileiro / Eu estou bem.' No A2, a distinção ser/estar fica mais sutil: 'A comida É boa' (característica geral) vs 'A comida ESTÁ fria' (estado temporário agora). O contexto — permanente ou temporário — é a chave.",
    examples: [
      "O Marco é médico e é muito inteligente, mas hoje está doente e está em casa. (ser = profissão/caráter; estar = estado atual + localização)",
      "A reunião é na quinta-feira às 14h na sala 3. (ser = evento marcado no tempo/lugar específico)",
      "O leite estava quente quando cheguei, mas agora está frio. (estar = temperatura, estado que muda com o tempo)",
    ],
    fills: [
      { s: "Ela ___ professora de matemática há 20 anos.", opts: ["é", "está", "foi", "estava"], a: 0, fb: "'É' — ser para profissão (característica estável e definitória de identidade). 20 anos confirma que é permanente." },
      { s: "O café ___ frio agora — você deve ter esquecido de tomar.", opts: ["está", "é", "foi", "era"], a: 0, fb: "'Está' — estar para estado temporário. O café pode estar frio agora mas não é frio por natureza. Temperatura = estado temporário → estar." },
      { s: "A conferência ___ no auditório principal amanhã.", opts: ["é", "está", "será", "estará"], a: 0, fb: "'É' — ser para eventos localizados no tempo (conferências, festas, eventos marcados). 'A conferência É na sexta, no auditório.' Mesmo que seja futuro, o verbo ser é usado para eventos." },
      { s: "Os alunos ___ muito cansados hoje depois da prova.", opts: ["estão", "são", "foram", "eram"], a: 0, fb: "'Estão' — estar para estado de ânimo ou condição temporária. Cansaço após uma prova é temporário → estar." },
      { s: "O Brasil ___ o maior país da América do Sul.", opts: ["é", "está", "foi", "esteve"], a: 0, fb: "'É' — ser para característica permanente e objetiva (tamanho geográfico). É um fato permanente → ser." },
    ],
    transforms: [
      { prompt: "Complete com SER ou ESTAR no tempo correto:", s: "A Ana ___ portuguesa mas agora ___ morando em Lisboa.", opts: ["é / está", "está / é", "é / é", "está / está"], a: 0, fb: "'É' = ser para origem/nacionalidade (permanente). 'Está' = estar para situação atual temporária (morando = situação em curso, pode mudar)." },
      { prompt: "Escolha ser ou estar e justifique:", s: "Esta sopa ___ deliciosa! (característica agora — você está comendo)", opts: ["está", "é", "foi", "era"], a: 0, fb: "Contexto importante: quando você prova agora e a reação é imediata → estar. 'Esta sopa ESTÁ deliciosa!' Se fosse característica geral ('a cozinha francesa é deliciosa') → ser." },
      { prompt: "Corrija se necessário:", s: "O João é muito triste hoje porque perdeu o emprego.", opts: ["O João está muito triste hoje porque perdeu o emprego.", "O João é muito triste hoje porque perdeu o emprego. (correto)", "O João foi muito triste hoje.", "O João estava muito triste hoje."], a: 0, fb: "'Triste hoje' = estado emocional temporário → estar. 'O João ESTÁ muito triste hoje.' Se dissesse 'O João é triste' (personalidade permanente), seria diferente." },
    ],
    errors: [
      { s: "A minha mãe está médica.", q: "Qual é o erro?", opts: ["'está' deve ser 'é' (profissão = ser)", "'médica' deve ser 'médico'", "'minha' deve ser 'meu'", "Não há erro"], a: 0, fb: "Profissão = característica de identidade → SER. Correto: \"A minha mãe É médica.\"" },
      { s: "Onde é você?", q: "Qual é o erro?", opts: ["'é' deve ser 'está' (localização de pessoa = estar)", "'você' deve ser 'tu'", "'onde' deve ser 'aonde'", "Não há erro"], a: 0, fb: "Localização de pessoas (e animais) = ESTAR. Correto: \"Onde ESTÁ você?\" 'Ser' para localização é usado apenas para eventos fixos, não pessoas." },
    ],
    production: "Descreva uma pessoa que você conhece bem usando SER e ESTAR. Use pelo menos 3 verbos SER (características, profissão, personalidade) e 2 verbos ESTAR (estado atual, localização). (4-5 frases)",
  },
  {
    id: 'comparativo_superlativo',
    title: 'Comparativo e superlativo',
    icon: '⚖️',
    rule: "Comparativo de superioridade: mais + adj + do que. Inferioridade: menos + adj + do que. Igualdade: tão + adj + quanto/como. Superlativo relativo: o/a mais/menos + adj + de. Formas irregulares: bom → melhor / o melhor; mau/ruim → pior / o pior; grande → maior / o maior; pequeno → menor / o menor.",
    tip: "Atenção: 'mais bom' existe mas é raro e poético — normalmente usamos 'melhor'. 'Mais grande' não existe → sempre 'maior'. 'Mais pequeno' existe mas 'menor' é mais elegante. No superlativo, o artigo concorda com o substantivo: o filme mais longo / a cidade mais bonita.",
    table: {
      headers: ['Adjetivo', 'Comparativo', 'Superlativo', 'Forma irregular'],
      rows: [
        ['bom', 'mais bom / melhor (do) que', 'o/a melhor de', 'melhor'],
        ['mau/ruim', 'mais ruim / pior (do) que', 'o/a pior de', 'pior'],
        ['grande', 'maior (do) que', 'o/a maior de', 'maior'],
        ['pequeno', 'menor (do) que', 'o/a menor de', 'menor'],
        ['regular (bonito)', 'mais bonito do que', 'o/a mais bonito/a de', '—'],
      ]
    },
    a1note: "No A1, você descrevia simplesmente: 'O Rio é bonito. São Paulo é bonito também.' No A2, você compara: 'O Rio é mais bonito do que eu esperava, mas São Paulo é maior.' Você passa de descrever para analisar e contrastar.",
    examples: [
      "O trem é mais rápido do que o ônibus, mas menos confortável do que o avião. (duplo comparativo)",
      "Ela é a melhor aluna da turma — nunca tira notas baixas. (superlativo irregular de bom)",
      "Este bairro é tão tranquilo quanto o interior, mas é menor do que eu imaginava. (igualdade + comparativo irregular)",
    ],
    fills: [
      { s: "O verão aqui é ___ quente ___ o inverno lá.", opts: ["mais / do que", "mais / que", "tão / que", "menos / de"], a: 0, fb: "Comparativo de superioridade: MAIS + adj + DO QUE. 'O verão é MAIS quente DO QUE o inverno.'" },
      { s: "Ela é a ___ jogadora do time — sempre marca gols.", opts: ["melhor", "mais boa", "mais bem", "boa"], a: 0, fb: "Superlativo de 'boa/bom' = A MELHOR (irregular). 'Mais boa' é muito informal e evitado. Forma correta: A MELHOR." },
      { s: "Este apartamento é ___ confortável ___ o meu.", opts: ["tão / quanto", "tão / como", "tanto / quanto", "tão / do que"], a: 1, fb: "Comparativo de igualdade: TÃO + adj + COMO (ou 'quanto'). 'TÃO confortável COMO o meu.' Ambos 'quanto' e 'como' são aceitos, mas 'como' também é muito comum." },
      { s: "O Brasil é ___ país ___ América do Sul em extensão.", opts: ["o maior / da", "o mais grande / de", "o maior / de", "maior / da"], a: 0, fb: "Superlativo de 'grande' = O MAIOR (irregular). 'O mais grande' não existe. Estrutura: O MAIOR + DE + grupo. 'América do Sul' → 'da' (de + a)." },
      { s: "Este exercício é ___ difícil ___ eu pensava.", opts: ["menos / do que", "menos / que", "mais / de", "tão / que"], a: 0, fb: "Comparativo de inferioridade: MENOS + adj + DO QUE. 'Este exercício é MENOS difícil DO QUE eu pensava.'" },
    ],
    transforms: [
      { prompt: "Forme o comparativo de superioridade:", s: "O café é forte. O chá é menos forte. (comparar)", opts: ["O café é mais forte do que o chá.", "O café é mais forte que o chá.", "O café é o mais forte do chá.", "O café é forte mais do que o chá."], a: 0, fb: "MAIS + adj + DO QUE. 'O café é MAIS forte DO QUE o chá.' 'Mais forte que' (sem 'do') também é aceito, mas 'do que' é a forma padrão." },
      { prompt: "Use o superlativo (entre todos):", s: "Este filme é muito bom. (de todos que vi este ano)", opts: ["Este é o melhor filme que vi este ano.", "Este é o mais bom filme que vi este ano.", "Este filme é o melhor do que todos.", "Este é o melhor filme de todos."], a: 0, fb: "Superlativo de bom = O MELHOR + que + frase. 'Este é O MELHOR filme que vi este ano.' Mais natural e preciso do que 'de todos'." },
      { prompt: "Forme o comparativo de igualdade:", s: "Pedro é alto. Lucas também é alto. (igualmente)", opts: ["Pedro é tão alto quanto Lucas.", "Pedro é tanto alto quanto Lucas.", "Pedro é tão alto como Lucas também.", "Pedro é igual alto como Lucas."], a: 0, fb: "Igualdade: TÃO + adj + QUANTO (ou COMO). 'Pedro é TÃO alto QUANTO Lucas.' Sem repetir 'também'." },
    ],
    errors: [
      { s: "São Paulo é mais grande do que o Rio.", q: "Qual é o erro?", opts: ["'mais grande' deve ser 'maior' (comparativo irregular)", "'do que' deve ser 'que'", "'São Paulo' deve ser 'a São Paulo'", "Não há erro"], a: 0, fb: "Grande → comparativo = MAIOR (irregular). 'Mais grande' não existe em português padrão. Correto: \"São Paulo é MAIOR do que o Rio.\"" },
      { s: "Ela corre tão rápido que eu.", q: "Qual é o erro?", opts: ["'que' deve ser 'quanto' ou 'como' (igualdade = tão...quanto/como)", "'rápido' deve ser 'rápida'", "'ela' deve ser 'ela mesma'", "Não há erro"], a: 0, fb: "Comparativo de igualdade: TÃO + adj + QUANTO (ou COMO). Nunca 'tão...que'. Correto: \"Ela corre tão rápido QUANTO eu.\"" },
    ],
    production: "Compare dois lugares que você conhece bem (cidades, bairros, países) usando pelo menos: 1 comparativo de superioridade, 1 de inferioridade, 1 de igualdade e 1 superlativo. (4-5 frases)",
  },
  {
    id: 'futuro',
    title: 'Futuro: ir + infinitivo vs futuro simples',
    icon: '🚀',
    rule: "Futuro perifrástico (ir + infinitivo): planos concretos, intenções próximas — muito usado no Brasil. Futuro simples (-rei/-rás/-rá/-remos/-rão): promessas formais, previsões gerais, texto escrito formal. No Brasil oral, o futuro perifrástico domina; em Portugal, o futuro simples ainda é comum na fala.",
    tip: "Verbo ir no presente: vou, vai, vamos, vão. Verbos irregulares no futuro simples: ser/ir → serei, fazer → farei, querer → quererei, trazer → trarei, dizer → direi, poder → poderei. Dica: 'vou fazer' (concreto, plano imediato) = igual a 'farei' (formal, promessa).",
    table: {
      headers: ['Pronome', 'ir + infinitivo (viajar)', 'futuro simples (viajar)', 'futuro de ser (irregular)'],
      rows: [
        ['eu', 'vou viajar', 'viajarei', 'serei'],
        ['tu', 'vais viajar', 'viajarás', 'serás'],
        ['ele/ela', 'vai viajar', 'viajará', 'será'],
        ['nós', 'vamos viajar', 'viajaremos', 'seremos'],
        ['vocês', 'vão viajar', 'viajarão', 'serão'],
        ['eles/elas', 'vão viajar', 'viajarão', 'serão'],
      ]
    },
    a1note: "No A1, você expressava intenções com 'querer + infinitivo': 'Eu quero viajar.' No A2, você planeja com 'ir + infinitivo': 'Eu vou viajar ao Japão nas férias.' (plano concreto) ou com o futuro simples: 'Daqui a 10 anos, a inteligência artificial mudará tudo.' (previsão geral, mais formal).",
    examples: [
      "Amanhã eu vou estudar para o exame — já reservei o dia. (futuro perifrástico: plano concreto e próximo)",
      "Daqui a 50 anos, as cidades serão muito diferentes das de hoje. (futuro simples: previsão geral e distante)",
      "Eu prometo que trarei os documentos amanhã sem falta. (futuro simples: promessa formal e comprometida)",
    ],
    fills: [
      { s: "Amanhã, eu ___ estudar para o exame de português.", opts: ["vou", "irei", "fui", "era"], a: 0, fb: "'Vou' = ir + infinitivo para plano concreto próximo. 'Vou estudar' é a forma mais natural no Brasil para planos imediatos." },
      { s: "Daqui a 100 anos, os seres humanos ___ muito mais longe no espaço.", opts: ["viajarão", "vão viajar", "viajam", "viajaram"], a: 0, fb: "Previsão distante e incerta → futuro simples: 'VIAJARÃO'. 'Vão viajar' é possível mas o futuro simples é mais natural para previsões de longo prazo." },
      { s: "Nós ___ uma festa de surpresa para a Ana no sábado. (já planejado)", opts: ["vamos fazer", "faremos", "fazemos", "fizermos"], a: 0, fb: "Plano concreto já organizado → futuro perifrástico: 'VAMOS fazer'. 'Faremos' seria mais formal e distante; para plano social concreto, 'vamos fazer' é o mais natural." },
      { s: "Eu te ___ assim que chegar em casa.", opts: ["ligo", "ligarei", "vou ligar", "ligou"], a: 2, fb: "Promessa em conversa informal → 'eu LIGO' (presente com valor futuro, muito comum no Brasil) ou 'vou ligar'. As três são aceitáveis; a mais formal seria 'ligarei'. Aqui, 'vou ligar' combina naturalidade com clareza de tempo futuro." },
      { s: "Se você estudar bastante, ___ passar no vestibular.", opts: ["vai", "vais", "irá", "foi"], a: 0, fb: "'Vai' = futuro perifrástico de 3ª pessoa. Em orações condicionais, usa-se 'se + presente → futuro perifrástico/simples'. 'Se você estudar... vai passar.'" },
    ],
    transforms: [
      { prompt: "Transforme no futuro perifrástico (plano concreto):", s: "Ela viaja para Buenos Aires em março. (já comprou passagem)", opts: ["Ela vai viajar para Buenos Aires em março.", "Ela viajará para Buenos Aires em março.", "Ela quer viajar para Buenos Aires em março.", "Ela viajava para Buenos Aires em março."], a: 0, fb: "Futuro perifrástico = ir + infinitivo. 'Ela VAI viajar.' Passagem comprada = plano concreto → perifrástico." },
      { prompt: "Transforme no futuro simples (previsão geral):", s: "Em 2050, as energias renováveis vão abastecer todo o planeta.", opts: ["Em 2050, as energias renováveis abastecerão todo o planeta.", "Em 2050, as energias renováveis vão abastecer todo o planeta.", "Em 2050, as energias renováveis abastecem todo o planeta.", "Em 2050, as energias renováveis abasteceram todo o planeta."], a: 0, fb: "Previsão de longo prazo e impessoal → futuro simples: 'abastecerão'. Transformação: 'vão abastecer' → 'abastecerão'." },
      { prompt: "Forme uma promessa formal com futuro simples:", s: "Eu entregar o relatório amanhã. (promessa formal)", opts: ["Eu entregarei o relatório amanhã.", "Eu vou entregar o relatório amanhã.", "Eu entrego o relatório amanhã.", "Eu entregaria o relatório amanhã."], a: 0, fb: "Promessa formal e solene → futuro simples: 'ENTREGAREI'. O futuro simples dá tom de comprometimento formal. 'Vou entregar' seria mais informal." },
    ],
    errors: [
      { s: "Eu vou a estudar muito para a prova.", q: "Qual é o erro?", opts: ["'vou a estudar' deve ser 'vou estudar' (ir + infinitivo sem preposição)", "'a prova' deve ser 'as provas'", "'muito' deve ser 'bastante'", "Não há erro"], a: 0, fb: "Futuro perifrástico = ir + INFINITIVO DIRETO (sem preposição). 'Eu VOU estudar muito para a prova.' Nunca 'vou a estudar' ou 'vou de estudar'." },
      { s: "Amanhã eu faço uma viagem ao Nordeste. Você vem?", q: "Esta frase está correta para um plano futuro?", opts: ["Sim, o presente com valor futuro é correto e muito comum no Brasil", "'faço' deve ser 'vou fazer' (obrigatório para futuro)", "'amanhã' deve ser 'amanhã de manhã'", "Não há erro mas 'farei' seria mais correto"], a: 0, fb: "No Brasil, o presente com valor futuro é MUITO comum e correto: 'Amanhã eu FAÇO uma viagem.' = 'Amanhã eu vou fazer uma viagem.' As duas formas são aceitas; o presente com marcador temporal (amanhã) é natural na fala brasileira." },
    ],
    production: "Escreva sobre seus planos e previsões em 4-5 frases: 2 frases com futuro perifrástico (planos concretos que você tem para breve) e 2-3 frases com futuro simples (previsões para daqui a muitos anos ou promessas formais).",
  },
];

export default function GramaticaPortuguesA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const correct = t.fills.filter((q, i) => fillAns[i] === q.a).length
    + t.transforms.filter((q, i) => transAns[i] === q.a).length
    + t.errors.filter((q, i) => errAns[i] === q.a).length;
  const total = t.fills.length + t.transforms.length + t.errors.length;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Português A2</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Gramática A2 — 5 temas essenciais
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Pretéritos, pronomes oblíquos, ser/estar, comparativo e futuro. Explicação visual + exercícios progressivos.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              style={{ padding: '0.45rem 0.9rem', borderRadius: 20, fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                background: topicIdx === i ? C : 'var(--bg-2)',
                border: `1.5px solid ${topicIdx === i ? C : 'var(--line-soft)'}`,
                color: topicIdx === i ? '#fff' : 'var(--muted)' }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
            <span style={{ fontSize: '1.4rem' }}>{t.icon}</span>
            <h2 style={{ margin: 0, fontWeight: 800, fontSize: '1.15rem', color: 'var(--ink)' }}>{t.title}</h2>
          </div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ fontSize: '0.82rem', color: C, padding: '0.4rem 0.7rem', borderRadius: 8, background: `${C}10`, border: `1px solid ${C}30`, marginBottom: '0.9rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', minWidth: 400, fontSize: '0.84rem' }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.4rem 0.7rem', background: `${C}15`, border: '1px solid var(--line-soft)', fontWeight: 800, color: C, textAlign: 'left', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Exemplos em contexto real</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Complete as frases</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.88rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correto. ' : `✗ Resposta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforme as frases</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Correta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Detecte o erro</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Encontre o erro</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correto. ' : `✗ Resposta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Produção livre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Complete todos os exercícios acima para desbloquear a produção livre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Escreva sua resposta aqui..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} palavras
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 10) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 10}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 10 ? 1 : 0.5 }}>
                  Pronto →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Sua produção</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Editar</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Ver resultado do tema →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} exercícios corretos
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? 'Perfeito! Você domina este tema A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Muito bem! Revise os exercícios marcados com ✗.'
                : 'Estude a explicação acima e tente novamente.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Tentar novamente</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Próximo tema →
                </button>
              )}
              <Link href="/practica/portugues/a2" className="btn btn-ghost btn-sm">Voltar ao A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
