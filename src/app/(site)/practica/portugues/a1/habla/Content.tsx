import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:"Olá!", phonetic:"[oh-LAH]", es:"¡Hola!", note:'"Olá" é mais formal. No dia a dia, os brasileiros dizem "Oi!" [oy] — é muito comum e amistoso.', category:'Saudações' },
  { id:2, phrase:"Meu nome é ___.", phonetic:"[mew NOH-meh eh]", es:"Mi nombre es ___.", note:'"Meu" suena [mew] con la "u" casi muda. El "e" final de "nome" es mudo. También: "Me chamo ___."', category:'Apresentação' },
  { id:3, phrase:"Como vai você?", phonetic:"[KOH-moo vai voh-SAY]", es:"¿Cómo estás?", note:'"Você" [voh-SAY] es el pronombre de segunda persona en Brasil (no se usa "tu" en el habla cotidiana). La "c" final suena [s].', category:'Saudações' },
  { id:4, phrase:"Tudo bem?", phonetic:"[TOO-doo beng]", es:"¿Todo bien?", note:'La forma más común e informal de saludar en Brasil. Respuesta: "Tudo bem, obrigado/a!" La "m" final tiene nasal.', category:'Saudações' },
  { id:5, phrase:"Prazer em conhecê-lo/la.", phonetic:"[prah-ZER eng koh-nyeh-SAY-loo/lah]", es:"Mucho gusto.", note:'"Conhecê-lo" (masc.) / "Conhecê-la" (fem.). El acento circunflejo en "ê" indica vocal fechada. Más simple: "Prazer!" [prah-ZER].', category:'Apresentação' },
  { id:6, phrase:"Obrigado / Obrigada.", phonetic:"[oh-bree-GAH-doo / -dah]", es:"Gracias.", note:'Hombres dicen "obrigado" [doo], mujeres dicen "obrigada" [dah]. Es una regla fija — no depende del receptor.', category:'Cortesia' },
  { id:7, phrase:"Não entendo.", phonetic:"[nowng en-TEN-doo]", es:"No entiendo.", note:'"Não" tiene vocal nasal [ɑ̃w̃]. Parecido al "não" en español pero más nasal. Informa: también "Não entendi" (no entendí).', category:'Ajuda' },
  { id:8, phrase:"Pode repetir?", phonetic:"[POH-djeh heh-peh-TEER]", es:"¿Puede repetir?", note:'"Pode" — en São Paulo se pronuncia [POH-djeh] con "d" suavizada. "Repetir" lleva acento en la última sílaba: [heh-peh-TEER].', category:'Ajuda' },
  { id:9, phrase:"Onde fica o banheiro?", phonetic:"[OHN-djeh FEE-kah oo bah-NYAY-roo]", es:"¿Dónde está el baño?", note:'"Banheiro" [bah-NYAY-roo] — el "nh" se pronuncia como "ñ" en español. El "lh" y "nh" son dos dígrafos únicos del portugués.', category:'Sobrevivência' },
  { id:10, phrase:"Quanto custa?", phonetic:"[KWAHN-too KOOS-tah]", es:"¿Cuánto cuesta?", note:'"Quanto" [KWAHN-too] tiene el diptongo "ua". El "a" final siempre es abierto en portugués. Alternativa: "Qual é o preço?"', category:'Sobrevivência' },
  { id:11, phrase:"Preciso de ajuda.", phonetic:"[preh-SEE-zoo djeh ah-ZHOO-dah]", es:"Necesito ayuda.", note:'"Preciso" [preh-SEE-zoo] — el "d" antes de "i" suena suavizado en São Paulo: [djeh]. La "j" suena como [zh] (la "j" francesa).', category:'Sobrevivência' },
  { id:12, phrase:"Com licença.", phonetic:"[kong lee-SEN-sah]", es:"Con permiso / Disculpe.", note:'"Com licença" se usa para pedir paso. "Desculpe" [desh-KOOL-peh] se usa para disculparse por un error.', category:'Cortesia' },
  { id:13, phrase:"Desculpe.", phonetic:"[desh-KOOL-peh]", es:"Disculpa / Lo siento.", note:'"Desculpe" = disculpa (error cometido). La "s" entre vocales suena [z] en portugués europeo, pero en Brasil suena más [sh] o [z] según la región.', category:'Cortesia' },
  { id:14, phrase:"Que horas são?", phonetic:"[keh OH-ras sowng]", es:"¿Qué hora es?", note:'"São" = son [sowng], con la nasal "ão". Respuesta: "São duas horas" (son las dos). "É uma hora" (es la una) — con "é" en singular.', category:'Sobrevivência' },
  { id:15, phrase:"Tchau!", phonetic:"[tchaw]", es:"¡Adiós! / ¡Chao!", note:'"Tchau" viene del italiano "ciao". Es muy común en Brasil. Más formal: "Até logo" [ah-TEH LOH-goo] o "Até mais" [ah-TEH mais].', category:'Despedidas' },
];

const CATEGORIES = ['Todos', 'Saudações', 'Apresentação', 'Cortesia', 'Ajuda', 'Sobrevivência', 'Despedidas'];

export default function HablaPortuguesA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/portugues/a1"
      hubLabel="🇧🇷 Português A1"
      eyebrow="Expressão oral · Português A1"
      title="Frases de sobrevivência A1"
      lead="15 expressões essenciais com guia fonético e notas para hispanofalantes."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de pronúncia"
      doneLabel="Dominada"
      todoLabel="Consegui"
      completionTitle="Ótimo trabalho! Você domina as 15 frases."
      completionBody="Agora use-as em conversa real — pratique com David ou Zhanna."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
      tip={
        <>
          🎯 <strong>Como praticar:</strong> Leia a guia fonética → diga a frase 3 vezes em voz alta → se conseguiu bem, marque ✓. Se não, deixe para voltar depois.
        </>
      }
    />
  )
}
