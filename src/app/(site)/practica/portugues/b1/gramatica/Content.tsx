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
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'subjuntivo',
    title: 'Subjuntivo presente',
    icon: '🌀',
    rule: "O subjuntivo presente expressa desejos, dúvidas, emoções e situações hipotéticas. É formado a partir da 1ª pessoa do presente do indicativo: falar → falo → fal- → fale/fales/fale/falemos/falem. Verbos irregulares: ser → seja; estar → esteja; ter → tenha; ir → vá; querer → queira; poder → possa; saber → saiba; dar → dê; vir → venha.",
    tip: "Gatilhos do subjuntivo: desejos (querer que, esperar que), emoções (é bom que, é pena que), dúvidas (duvidar que, não acreditar que), impessoais (é necessário que, é importante que, é preciso que). Depois desses gatilhos, o verbo seguinte vai para o subjuntivo.",
    table: {
      headers: ['Pronome', 'falar (subj.)', 'ter (subj.)', 'ser (subj.)'],
      rows: [
        ['eu', 'fale', 'tenha', 'seja'],
        ['tu', 'fales', 'tenhas', 'sejas'],
        ['ele/ela/você', 'fale', 'tenha', 'seja'],
        ['nós', 'falemos', 'tenhamos', 'sejamos'],
        ['vocês', 'falem', 'tenham', 'sejam'],
        ['eles/elas', 'falem', 'tenham', 'sejam'],
      ]
    },
    b1note: "No A2, você usava o indicativo para tudo: 'Eu quero ir.' No B1, quando o sujeito muda: 'Eu quero que VOCÊ vá.' (subjuntivo). A mudança de sujeito é o sinal mais claro de que o subjuntivo é necessário.",
    examples: [
      "É necessário que você termine o relatório hoje. (é necessário que + subjuntivo)",
      "Espero que eles cheguem a tempo para a reunião. (esperar que + subjuntivo)",
      "Duvido que ele saiba a resposta certa. (duvidar que + subjuntivo)",
    ],
    fills: [
      { s: "É importante que você ___ (estudar) todos os dias.", opts: ["estude", "estuda", "estudou", "estudará"], a: 0, fb: "'Estude' — subjuntivo de 'estudar'. 'É importante que' + subjuntivo. Formação: estudo → estud- → estude." },
      { s: "Espero que ela ___ (chegar) antes das 18h.", opts: ["chegue", "chega", "chegou", "chegarei"], a: 0, fb: "'Chegue' — subjuntivo de 'chegar'. 'Esperar que' + subjuntivo. Note a mudança ch→g: chegar → chego → chegu- → chegue." },
      { s: "É pena que eles não ___ (poder) vir à festa.", opts: ["possam", "podem", "puderam", "poderão"], a: 0, fb: "'Possam' — subjuntivo de 'poder'. 'É pena que' + subjuntivo. Poder (irregular): posso → poss- → possam (plural)." },
      { s: "Quero que você ___ (ser) honesto comigo.", opts: ["seja", "é", "foi", "será"], a: 0, fb: "'Seja' — subjuntivo de 'ser'. 'Querer que' + subjuntivo. Ser é irregular no subjuntivo: seja/sejas/seja/sejamos/sejam." },
      { s: "É fundamental que nós ___ (ter) cuidado com o meio ambiente.", opts: ["tenhamos", "temos", "tivemos", "teremos"], a: 0, fb: "'Tenhamos' — subjuntivo de 'ter' na 1ª pessoa do plural. Ter (irregular): tenho → tenh- → tenhamos." },
    ],
    transforms: [
      { prompt: "Transforme usando o subjuntivo (querer que):", s: "Você fala mais devagar. (Eu quero que...)", opts: ["Eu quero que você fale mais devagar.", "Eu quero que você fala mais devagar.", "Eu quero você falar mais devagar.", "Eu quero que você falasse mais devagar."], a: 0, fb: "Quando o sujeito muda (eu → você) + 'querer que' → subjuntivo. 'Falar' → 'fale'. Correto: 'Eu quero que você FALE mais devagar.'" },
      { prompt: "Reescreva com 'é necessário que':", s: "Vocês entregam o projeto até sexta.", opts: ["É necessário que vocês entreguem o projeto até sexta.", "É necessário que vocês entregam o projeto até sexta.", "É necessário vocês entregar o projeto até sexta.", "É necessário que vocês entregaram o projeto até sexta."], a: 0, fb: "'Entregar' → subjuntivo plural = 'entreguem'. Atenção à ortografia: entregar → entrego → entreg- → entreguem (mantém o som /g/)." },
      { prompt: "Use 'duvidar que' + subjuntivo:", s: "Ele sabe a verdade.", opts: ["Duvido que ele saiba a verdade.", "Duvido que ele sabe a verdade.", "Duvido ele saber a verdade.", "Duvido que ele soubesse a verdade."], a: 0, fb: "'Saber' no subjuntivo = 'saiba'. 'Duvidar que' + subjuntivo. Saber é irregular: sei → saib- → saiba." },
    ],
    errors: [
      { s: "Espero que ele chega logo.", q: "Qual é o erro?", opts: ["'chega' deve ser 'chegue' (esperar que + subjuntivo)", "'logo' deve ser 'agora'", "'ele' deve ser 'você'", "Não há erro"], a: 0, fb: "'Esperar que' exige subjuntivo. 'Chegar' → 'chegue'. Correto: 'Espero que ele CHEGUE logo.'" },
      { s: "É importante você estuda português.", q: "Qual é o erro?", opts: ["falta 'que' e 'estuda' deve ser 'estude' (é importante que + subjuntivo)", "'você' deve ser 'tu'", "'português' deve ser 'o português'", "Não há erro"], a: 0, fb: "Estrutura correta: 'É importante QUE você ESTUDE português.' Dois erros: falta 'que' e o verbo deve estar no subjuntivo." },
    ],
    production: "Escreva 4 frases sobre o que você acha importante para aprender português. Use: 'É necessário que...', 'Espero que...', 'É fundamental que...', 'Quero que...'",
  },
  {
    id: 'condicional',
    title: 'Condicional',
    icon: '🔮',
    rule: "O condicional (futuro do pretérito) expressa ações hipotéticas, pedidos corteses e situações imaginárias. Formação: infinitivo + terminações: -ia, -ias, -ia, -íamos, -iam. Todos os verbos regulares seguem esse padrão. Irregulares: fazer → faria; dizer → diria; trazer → traria; querer → quereria (reg.); saber → saberia (reg.); poder → poderia (reg.).",
    tip: "Três usos principais: (1) Cortesia: 'Gostaria de uma mesa para dois' (mais elegante que 'Quero'); (2) Hipótese: 'Se eu tivesse tempo, viajaria mais'; (3) Futuro do passado: 'Ele disse que viria amanhã.' No português brasileiro, o condicional também é substituído pelo imperfeito: 'Se eu tivesse tempo, viajava mais.'",
    table: {
      headers: ['Pronome', 'falar (cond.)', 'fazer (cond.)', 'dizer (cond.)'],
      rows: [
        ['eu', 'falaria', 'faria', 'diria'],
        ['tu', 'falarias', 'farias', 'dirias'],
        ['ele/ela/você', 'falaria', 'faria', 'diria'],
        ['nós', 'falaríamos', 'faríamos', 'diríamos'],
        ['vocês', 'falariam', 'fariam', 'diriam'],
        ['eles/elas', 'falariam', 'fariam', 'diriam'],
      ]
    },
    b1note: "No A2, você já usou o futuro simples: 'Eu estudarei.' No B1, o condicional abre o mundo das hipóteses: 'Eu estudaria mais se tivesse tempo.' A diferença: futuro = algo que acontecerá; condicional = algo que aconteceria (mas talvez não aconteça).",
    examples: [
      "Gostaria de reservar uma mesa para esta noite, por favor. (pedido cortês — mais educado que 'quero')",
      "Se eu morasse no Brasil, falaria português fluentemente. (hipótese com se + imperfeito do subjuntivo)",
      "Ela disse que chegaria às 9h, mas ainda não apareceu. (futuro do passado)",
    ],
    fills: [
      { s: "___ (poder, eu) falar com o gerente, por favor?", opts: ["Poderia", "Posso", "Pude", "Podia"], a: 0, fb: "'Poderia' — condicional de 'poder'. Para pedidos educados em contextos formais, o condicional é mais polido que o presente 'posso'." },
      { s: "Se eu ___ (ter) mais tempo, ___ (viajar) pelo mundo inteiro.", opts: ["tivesse / viajaria", "teria / viajaria", "tivesse / viajava", "tinha / viajaria"], a: 0, fb: "'Tivesse' — imperfeito do subjuntivo de 'ter' (para condição hipotética). 'Viajaria' — condicional de 'viajar' (para resultado)." },
      { s: "Ela disse que ___ (vir) nos visitar no fim de semana.", opts: ["viria", "virá", "vinha", "venha"], a: 0, fb: "'Viria' — condicional de 'vir'. Futuro do passado: ele disse no passado que algo aconteceria. 'Vir' → 'viria' (irregular como 'ter' → 'teria')." },
      { s: "Nós ___ (preferir) um quarto com vista para o mar.", opts: ["preferiríamos", "preferiamos", "preferimos", "preferiremos"], a: 0, fb: "'Preferiríamos' — condicional de 'preferir', 1ª pessoa plural. Note o acento: preferi- + ríamos. O 'r' da terminação se junta ao infinitivo." },
      { s: "O que você ___ (fazer) se ganhasse na loteria?", opts: ["faria", "faz", "fez", "fará"], a: 0, fb: "'Faria' — condicional irregular de 'fazer'. Hipótese com 'se + imperfeito do subjuntivo (ganhasse) → condicional (faria)'." },
    ],
    transforms: [
      { prompt: "Transforme o pedido para uma forma mais cortês (condicional):", s: "Quero uma informação sobre o voo.", opts: ["Gostaria de uma informação sobre o voo.", "Quereria uma informação sobre o voo.", "Queria uma informação sobre o voo.", "Desejaria uma informação sobre o voo."], a: 0, fb: "'Gostaria' = condicional de 'gostar' — a forma mais comum e natural para pedidos formais no Brasil. 'Queria' também é aceito (imperfeito com valor de condicional)." },
      { prompt: "Forme uma hipótese com 'Se + imperfeito do subjuntivo + condicional':", s: "Eu não tenho carro. (mas se tivesse...)", opts: ["Se eu tivesse carro, viajaria mais.", "Se eu teria carro, viajaria mais.", "Se eu tivesse carro, viajaria mais facilmente.", "Se eu tinha carro, viajaria mais."], a: 0, fb: "Estrutura hipotética B1: Se + imperfeito do subjuntivo (tivesse) + condicional (viajaria). NUNCA 'se + condicional'." },
      { prompt: "Transforme para o futuro do passado (condicional):", s: "Ele disse: 'Eu vou vir amanhã.'", opts: ["Ele disse que viria amanhã.", "Ele disse que virá amanhã.", "Ele disse que vinha amanhã.", "Ele disse que venha amanhã."], a: 0, fb: "Discurso indireto: 'vou vir' (futuro) → 'viria' (condicional = futuro do passado). 'Vir' tem condicional irregular: viria/virias/viria/viríamos/viriam." },
    ],
    errors: [
      { s: "Se eu teria tempo, estudaria mais.", q: "Qual é o erro?", opts: ["'teria' deve ser 'tivesse' (Se + imperfeito do subj., não condicional)", "'estudaria' deve ser 'estudava'", "'mais' deve ser 'muito'", "Não há erro"], a: 0, fb: "NUNCA 'se + condicional'. Correto: 'Se eu TIVESSE tempo, estudaria mais.' A cláusula com 'se' usa imperfeito do subjuntivo; a cláusula principal usa condicional." },
      { s: "Poderia me dizer como chego ao museu?", q: "Esta frase está correta?", opts: ["Sim, está correta — 'poderia' é o condicional cortês adequado", "'poderia' deve ser 'pode'", "'chego' deve ser 'chegar'", "'museu' deve ser 'ao museu nacional'"], a: 0, fb: "Correto! 'Poderia me dizer...' é um pedido de informação cortês e gramaticalmente perfeito. O condicional 'poderia' é a forma mais educada de pedir algo formalmente." },
    ],
    production: "Escreva 4 frases usando o condicional: 1 pedido cortês (num restaurante ou hotel), 1 hipótese com 'se', 1 preferência e 1 conselho (O que você faria no lugar de...?).",
  },
  {
    id: 'vozpassiva',
    title: 'Voz passiva',
    icon: '🔄',
    rule: "A voz passiva em português: ser + particípio passado (concordando com o sujeito). Formação: 'Maria escreveu o livro.' → 'O livro foi escrito por Maria.' A partícula 'por' introduz o agente. Tempos: Presente: é feito; Pretérito perfeito: foi feito; Pretérito imperfeito: era feito; Futuro: será feito. Particípios irregulares comuns: fazer → feito; escrever → escrito; abrir → aberto; dizer → dito; ver → visto; pôr → posto.",
    tip: "A voz passiva é muito usada em textos formais, jornalismo e ciência para omitir o agente ou dar ênfase ao objeto. No Brasil coloquial, a voz passiva com 'se' também é muito comum: 'Vende-se apartamento' = 'Um apartamento está sendo vendido.'",
    table: {
      headers: ['Ativo', 'Passivo', 'Tempo'],
      rows: [
        ['Maria escreve o artigo.', 'O artigo é escrito por Maria.', 'Presente'],
        ['Eles abriram a loja.', 'A loja foi aberta por eles.', 'Pretérito perf.'],
        ['O governo fazia as leis.', 'As leis eram feitas pelo governo.', 'Pretérito imperf.'],
        ['Ele fará o trabalho.', 'O trabalho será feito por ele.', 'Futuro'],
      ]
    },
    b1note: "No A2, você descrevia ações ativas: 'O professor corrigiu as provas.' No B1, você pode dar ênfase ao objeto: 'As provas foram corrigidas pelo professor.' Esta forma é essencial para escrever textos acadêmicos e formais.",
    examples: [
      "O novo museu foi inaugurado pelo presidente na semana passada. (passiva no pretérito perfeito)",
      "A reunião é realizada toda semana pela diretoria. (passiva no presente habitual)",
      "O relatório será entregue pelos alunos até sexta-feira. (passiva no futuro)",
    ],
    fills: [
      { s: "O relatório ___ (escrever, passiva, presente) pela equipe de comunicação.", opts: ["é escrito", "foi escrito", "escreveu", "será escrito"], a: 0, fb: "'É escrito' — voz passiva no presente: ser (presente) + particípio. 'Escrever' tem particípio irregular: 'escrito'. Concordância: o relatório (masc. sing.) → escrito." },
      { s: "A ponte ___ (construir, passiva, pretérito perfeito) em apenas 6 meses.", opts: ["foi construída", "era construída", "foi construído", "construiu"], a: 0, fb: "'Foi construída' — passiva no pretérito perfeito. 'A ponte' é feminina → 'construída'. Particípio regular: construído/construída." },
      { s: "Os emails ___ (enviar, passiva, pretérito imperfeito) automaticamente pelo sistema.", opts: ["eram enviados", "foram enviados", "são enviados", "serão enviados"], a: 0, fb: "'Eram enviados' — passiva no imperfeito. 'Os emails' (masc. pl.) → 'enviados'. Imperfeito de 'ser' = era/eram." },
      { s: "O problema ___ (resolver, passiva, futuro) até amanhã.", opts: ["será resolvido", "foi resolvido", "é resolvido", "seria resolvido"], a: 0, fb: "'Será resolvido' — passiva no futuro. 'O problema' (masc. sing.) → 'resolvido'. Futuro de 'ser' = será/serão." },
      { s: "Os prêmios ___ (entregar, passiva, presente) anualmente pelo governo.", opts: ["são entregues", "foram entregues", "serão entregues", "eram entregues"], a: 0, fb: "'São entregues' — passiva no presente. 'Os prêmios' (masc. pl.) → 'entregues'. Particípio de 'entregar': entregue/entregues." },
    ],
    transforms: [
      { prompt: "Transforme para a voz passiva:", s: "A professora corrigiu as provas.", opts: ["As provas foram corrigidas pela professora.", "As provas foi corrigida pela professora.", "As provas foram corrigidas da professora.", "A professora foi corrigida pelas provas."], a: 0, fb: "Passiva: sujeito da ativa (a professora) → agente com 'por'. Objeto da ativa (as provas) → sujeito da passiva. Particípio: 'corrigidas' (fem. pl.)." },
      { prompt: "Transforme para a voz ativa:", s: "O novo hospital foi inaugurado pelo prefeito.", opts: ["O prefeito inaugurou o novo hospital.", "O prefeito foi inaugurado pelo hospital.", "O hospital inaugura o prefeito.", "O prefeito tinha inaugurado o hospital."], a: 0, fb: "Ativo: agente (pelo prefeito → o prefeito) se torna sujeito. Sujeito da passiva (o hospital) se torna objeto. Tempo: 'foi' (pretérito perfeito) → inaugurou." },
      { prompt: "Identifique o agente e transforme para a voz ativa:", s: "A decisão foi tomada pelos diretores.", opts: ["Os diretores tomaram a decisão.", "A decisão tomou os diretores.", "Os diretores foram tomados pela decisão.", "A decisão é tomada pelos diretores."], a: 0, fb: "Agente: 'pelos diretores' → sujeito ativo. 'A decisão' → objeto. 'Foi tomada' (passiva perf.) → 'tomaram' (ativo perf.)." },
    ],
    errors: [
      { s: "O livro foi escrevido pela autora.", q: "Qual é o erro?", opts: ["'escrevido' deve ser 'escrito' (particípio irregular de escrever)", "'foi' deve ser 'é'", "'pela' deve ser 'por a'", "Não há erro"], a: 0, fb: "'Escrever' tem particípio irregular: ESCRITO (não 'escrevido'). Outros irregulares: fazer→feito, abrir→aberto, ver→visto, dizer→dito." },
      { s: "As janelas foram abertos pelo vento.", q: "Qual é o erro?", opts: ["'abertos' deve ser 'abertas' (concordância: janelas = feminino plural)", "'foram' deve ser 'foi'", "'pelo' deve ser 'por'", "Não há erro"], a: 0, fb: "Concordância do particípio com o sujeito: 'janelas' é feminino plural → 'abertas'. Correto: 'As janelas foram ABERTAS pelo vento.'" },
    ],
    production: "Reescreva estas frases na voz passiva: 1. 'O governo aprovou a nova lei.' 2. 'Os cientistas descobriram uma vacina.' 3. 'A empresa contratou 50 funcionários.' Depois escreva 1 frase original na voz passiva sobre um evento recente.",
  },
  {
    id: 'pronomes_relativos',
    title: 'Pronomes relativos',
    icon: '🔗',
    rule: "Pronomes relativos conectam duas frases relacionadas. Principais: QUE (para pessoas e coisas — o mais usado): 'O livro que comprei...'; CUJO/CUJA/CUJOS/CUJAS (posse): 'O autor cujo livro li...'; ONDE (lugar): 'A cidade onde moro...'; O QUAL / A QUAL / OS QUAIS / AS QUAIS (mais formal, após preposições): 'O projeto no qual trabalhei...'",
    tip: "Dica prática: 'que' funciona para 90% dos casos. Use 'onde' para lugares. Use 'cujo' quando quiser dizer 'cujo/cuya' (de posse). Use 'o qual/a qual' após preposições de mais de uma sílaba (através do qual, por meio do qual) ou para maior clareza em textos formais.",
    table: {
      headers: ['Pronome', 'Uso', 'Exemplo'],
      rows: [
        ['que', 'Pessoas e coisas (mais comum)', 'A música que ouço é linda.'],
        ['cujo/cuja', 'Posse (do qual, da qual)', 'O aluno cujo projeto ganhou o prêmio.'],
        ['onde', 'Lugar', 'A cidade onde nasci fica no Sul.'],
        ['o qual / a qual', 'Formal / após preposições', 'O projeto no qual trabalhei...'],
        ['quem', 'Após preposições (pessoas)', 'A pessoa com quem falei.'],
      ]
    },
    b1note: "No A2, você usava 'que' para tudo ou usava duas frases separadas. No B1, você conecta frases fluentemente: 'Eu li um livro. O livro era muito interessante.' → 'Eu li um livro que era muito interessante.' Isso torna seu discurso mais natural e avançado.",
    examples: [
      "O professor que nos ensina gramática é excelente. (que = pessoa)",
      "A cidade onde moro tem praias lindíssimas. (onde = lugar)",
      "O candidato cujo currículo impressionou o júri ganhou o prêmio. (cujo = posse)",
    ],
    fills: [
      { s: "O filme ___ assisti ontem foi incrível.", opts: ["que", "cujo", "onde", "o qual"], a: 0, fb: "'Que' — pronome relativo mais comum. 'Assisti (a) o filme → o filme que assisti.' Para coisas sem preposição ou com preposição curta, 'que' é sempre correto." },
      { s: "A empresa ___ trabalho está crescendo muito.", opts: ["onde", "que", "cujo", "em que"], a: 0, fb: "'Onde' — para lugar/empresa onde algo acontece. 'Trabalho na empresa → a empresa onde trabalho.' Alternativa formal: 'a empresa em que trabalho' (também correto)." },
      { s: "O cientista ___ descoberta mudou a medicina recebeu o Nobel.", opts: ["cuja", "que", "onde", "cujo"], a: 0, fb: "'Cuja' — pronome relativo de posse, feminino (concorda com 'descoberta'). 'A descoberta do cientista → o cientista cuja descoberta.' NUNCA 'cujo que' ou 'cuja que'." },
      { s: "Ele é o colega com ___ trabalhei no projeto.", opts: ["quem", "que", "cujo", "onde"], a: 0, fb: "'Quem' — após preposição para pessoas. 'Trabalhei com o colega → o colega com quem trabalhei.' Após preposição + pessoa → 'quem'." },
      { s: "O bairro ___ cresci era muito tranquilo nos anos 90.", opts: ["onde", "que", "cujo", "em que"], a: 0, fb: "'Onde' — para lugar/bairro. 'Cresci no bairro → o bairro onde cresci.' Alternativa: 'o bairro em que cresci' (igualmente correto)." },
    ],
    transforms: [
      { prompt: "Una as frases com o pronome relativo correto:", s: "Eu conheço uma pessoa. A pessoa fala 5 idiomas.", opts: ["Eu conheço uma pessoa que fala 5 idiomas.", "Eu conheço uma pessoa a qual fala 5 idiomas.", "Eu conheço uma pessoa cujo fala 5 idiomas.", "Eu conheço uma pessoa onde fala 5 idiomas."], a: 0, fb: "'Que' — refere a pessoa. 'A pessoa fala 5 idiomas' → 'uma pessoa QUE fala 5 idiomas.' Para pessoas como sujeito da relativa, 'que' é sempre correto." },
      { prompt: "Use 'cujo/cuja' para conectar as frases:", s: "Li um livro. O título do livro é fascinante.", opts: ["Li um livro cujo título é fascinante.", "Li um livro cujo o título é fascinante.", "Li um livro que o título é fascinante.", "Li um livro onde o título é fascinante."], a: 0, fb: "'Cujo' — refere posse (o título do livro). Atenção: NUNCA 'cujo + artigo'. Errado: 'cujo O título'. Correto: 'cujo título' (sem artigo depois de cujo)." },
      { prompt: "Una usando 'onde':", s: "Fui a uma cidade. Nunca tinha estado nessa cidade.", opts: ["Fui a uma cidade onde nunca tinha estado.", "Fui a uma cidade que nunca tinha estado.", "Fui a uma cidade cujo nunca tinha estado.", "Fui a uma cidade quem nunca tinha estado."], a: 0, fb: "'Onde' — lugar. 'Nunca tinha estado NA cidade → uma cidade ONDE nunca tinha estado.' 'Onde' substitui 'em que/na qual'." },
    ],
    errors: [
      { s: "O professor cujo que ensina gramática é excelente.", q: "Qual é o erro?", opts: ["'cujo que' deve ser apenas 'que' (ou 'cujo' para posse — não os dois)", "'gramática' deve ter acento", "'ensina' deve ser 'ensinou'", "Não há erro"], a: 0, fb: "NUNCA 'cujo que'. Dois erros: 'cujo' indica posse (de quem algo pertence), mas aqui não há posse. Correto: 'O professor QUE ensina gramática é excelente.'" },
      { s: "A menina que o pai é médico ganhou o prêmio.", q: "Qual é o erro?", opts: ["'que' deve ser 'cujo' (relação de posse: o pai da menina)", "'ganhou' deve ser 'ganhará'", "'médico' deve ser 'médica'", "Não há erro"], a: 0, fb: "Posse (o pai DA menina) → 'cujo'. Correto: 'A menina CUJO pai é médico ganhou o prêmio.' 'Cujo' concorda com 'pai' (masc. sing.)." },
    ],
    production: "Escreva 4 frases usando pronomes relativos diferentes: 1 com 'que', 1 com 'onde', 1 com 'cujo/cuja' e 1 com 'com quem'. Tema: a sua vida, trabalho ou estudos.",
  },
  {
    id: 'discurso_indireto',
    title: 'Discurso indireto',
    icon: '💬',
    rule: "O discurso indireto transforma o que alguém disse (discurso direto) em narração. Transformações: Presente → Imperfeito: 'Eu trabalho aqui.' → Ele disse que trabalhava ali. Futuro → Condicional: 'Eu virei.' → Ela disse que viria. Imperativo → Infinitivo: 'Venha!' → Ele pediu que eu viesse (subjuntivo). Pronomes: eu → ele/ela; tu/você → ele/ela. Advérbios: aqui → ali/lá; hoje → naquele dia; amanhã → no dia seguinte.",
    tip: "Verbos de comunicação + discurso indireto: dizer que, afirmar que, explicar que (declarações); perguntar se, querer saber se (perguntas sim/não); perguntar + por que/quando/onde/como/quem (perguntas abertas); pedir para/que + subjuntivo (pedidos e ordens).",
    table: {
      headers: ['Direto', 'Indireto (verbo no passado)'],
      rows: [
        ['"Eu trabalho aqui."', 'Ela disse que trabalhava ali.'],
        ['"Vou viajar amanhã."', 'Ele disse que viajaria no dia seguinte.'],
        ['"Você pode ajudar?"', 'Ela perguntou se eu podia ajudar.'],
        ['"Venha aqui!"', 'Ele pediu que eu fosse lá.'],
        ['"Onde você mora?"', 'Ela perguntou onde eu morava.'],
      ]
    },
    b1note: "No A2, você relatava o que foi dito de forma simples. No B1, você domina as transformações de tempo verbal, pronome e advérbio que tornam o discurso indireto preciso e natural. Esta habilidade é essencial para o CELPE-Bras e para contextos profissionais.",
    examples: [
      "\"Vou chegar tarde.\" → Ela disse que chegaria tarde. (futuro → condicional)",
      "\"Você está bem?\" → Ele perguntou se eu estava bem. (presente → imperfeito; pergunta sim/não → se)",
      "\"Onde você trabalha?\" → Ela me perguntou onde eu trabalhava. (presente → imperfeito; mantém pronome interrogativo)",
    ],
    fills: [
      { s: "\"Eu moro em São Paulo.\" → Ela disse que ___ em São Paulo.", opts: ["morava", "mora", "moraria", "morasse"], a: 0, fb: "'Morava' — imperfeito. Transformação: presente (moro) → imperfeito (morava) no discurso indireto com verbo principal no passado (disse)." },
      { s: "\"Vou terminar o projeto.\" → Ele afirmou que ___ o projeto.", opts: ["terminaria", "termina", "terminou", "terminasse"], a: 0, fb: "'Terminaria' — condicional. Transformação: futuro (vou terminar → terminará) → condicional (terminaria) no discurso indireto." },
      { s: "\"Você pode vir amanhã?\" → Ela perguntou ___ eu podia ir no dia seguinte.", opts: ["se", "que", "porque", "quando"], a: 0, fb: "'Se' — pergunta sim/não no discurso indireto usa 'se'. 'Amanhã' → 'no dia seguinte' (transformação de advérbio temporal)." },
      { s: "\"Por que você não ligou?\" → Ele me perguntou por que eu não ___.", opts: ["tinha ligado", "liguei", "ligaria", "liga"], a: 0, fb: "'Tinha ligado' — mais-que-perfeito. Pergunta aberta com 'por que' mantém o pronome interrogativo. O pretérito perfeito (liguei) → mais-que-perfeito (tinha ligado) no passado." },
      { s: "\"Fale mais devagar!\" → A professora pediu que eu ___ mais devagar.", opts: ["falasse", "falaria", "falo", "falarei"], a: 0, fb: "'Falasse' — imperfeito do subjuntivo. Pedido/ordem: 'pedir que + imperfeito do subjuntivo'. 'Falar' → 'falasse'." },
    ],
    transforms: [
      { prompt: "Transforme para o discurso indireto (passado):", s: "\"Eu estou muito cansado.\" (Ele disse que...)", opts: ["Ele disse que estava muito cansado.", "Ele disse que está muito cansado.", "Ele disse que estaria muito cansado.", "Ele disse que estivesse muito cansado."], a: 0, fb: "Presente (estou) → imperfeito (estava). Pronome: eu → ele. Correto: 'Ele disse que ESTAVA muito cansado.'" },
      { prompt: "Transforme a pergunta para o discurso indireto:", s: "\"Quando você chegou?\" (Ela me perguntou...)", opts: ["Ela me perguntou quando eu tinha chegado.", "Ela me perguntou quando eu cheguei.", "Ela me perguntou se eu tinha chegado.", "Ela me perguntou quando chegaria."], a: 0, fb: "Pergunta aberta com 'quando' → mantém 'quando' no indireto. Pretérito perfeito (chegou → cheguei) → mais-que-perfeito (tinha chegado)." },
      { prompt: "Transforme o pedido para discurso indireto:", s: "\"Por favor, abra a janela.\" (O chefe me pediu que...)", opts: ["O chefe me pediu que eu abrisse a janela.", "O chefe me pediu que eu abre a janela.", "O chefe me pediu para eu abrir a janela.", "O chefe me pediu que eu abriria a janela."], a: 0, fb: "Pedido formal: 'pedir que + imperfeito do subjuntivo'. 'Abrir' → 'abrisse'. Alternativa: 'O chefe me pediu para abrir a janela' (com infinitivo) também é aceito em português brasileiro." },
    ],
    errors: [
      { s: "Ela disse que vai vir amanhã.", q: "Qual é o erro se 'disse' está no passado?", opts: ["'vai vir' deve ser 'viria' e 'amanhã' deve ser 'no dia seguinte'", "'disse' deve ser 'diz'", "'ela' deve ser 'você'", "Não há erro"], a: 0, fb: "Com 'disse' (passado): futuro → condicional (viria); 'amanhã' → 'no dia seguinte'. Correto: 'Ela disse que VIRIA NO DIA SEGUINTE.' (Nota: no português falado, a concordância às vezes é mais flexível.)" },
      { s: "Ele perguntou onde eu moro.", q: "Esta frase está correta se 'perguntou' é passado?", opts: ["Depende: 'moro' (presente) se ainda verdadeiro; 'morava' (imperfeito) em contexto formal/literário", "'moro' deve ser sempre 'morava'", "'onde' deve ser 'se'", "Não há erro nunca"], a: 0, fb: "No português brasileiro contemporâneo, 'moro' (presente) é aceito se a situação ainda é verdadeira. 'Morava' é a forma clássica. Ambas são corretas em diferentes registros." },
    ],
    production: "Relate uma conversa que você teve recentemente. Use: 'disse que', 'perguntou se', 'perguntou onde/quando/como', 'pediu que'. Escreva pelo menos 4 frases no discurso indireto.",
  },
];

export default function GramaticaPortuguesB1() {
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.3rem' }}><span className="ink-line" />Português B1</p>
        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.03em', margin: '0 0 0.4rem', color: 'var(--ink)' }}>
          Gramática B1 — 5 temas essenciais
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.92rem', margin: '0 0 2rem', lineHeight: 1.6, maxWidth: 560 }}>
          Subjuntivo, Condicional, Voz passiva, Pronomes relativos e Discurso indireto. Explicação visual + exercícios progressivos.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.b1note}
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
                      <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
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
                ? 'Perfeito! Você domina este tema B1.'
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
              <Link href="/practica/portugues/b1" className="btn btn-ghost btn-sm">Voltar ao B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
