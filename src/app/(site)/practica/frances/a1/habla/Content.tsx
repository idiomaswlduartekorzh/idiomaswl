import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:"Bonjour!", phonetic:"[bon-ZHOOR]", es:"¡Buenos días! / ¡Hola!", note:'"Bon" = bueno, "jour" = día. La "j" francesa es como la "y" de "yo" pero más suave: [ʒ]. No es la "j" española.', category:'Saludos' },
  { id:2, phrase:"Je m'appelle ___.", phonetic:"[zhe mah-PEL ___]", es:"Me llamo ___.", note:'"Je" suena [zhe], nunca "ye". La "j" siempre es [ʒ] en francés. "Appelle" con doble "l" pero se pronuncia solo una.', category:'Presentación' },
  { id:3, phrase:"Comment allez-vous?", phonetic:"[koh-mahn-tah-LEH-voo]", es:"¿Cómo está usted? (formal)", note:'La "t" de "allez-vous" es una liaison: se une el sonido. La "z" en "allez" no se pronuncia, pero sí en liaison: [tah-LEH-voo].', category:'Saludos' },
  { id:4, phrase:"Ça va bien, merci.", phonetic:"[sah VAH byehn, mehr-SEE]", es:"Bien, gracias. (informal)", note:'"Ça" = eso/así. La cedilla (ç) hace que la "c" suene [s]. "Bien" suena como "bián" con nasal.', category:'Saludos' },
  { id:5, phrase:"Enchanté(e).", phonetic:"[ahn-shahn-TEH]", es:"Encantado/a (al conocer)", note:'La "e" final es muda. Se usa al conocer a alguien. Las vocales nasales (an, en, in) no existen en español — practica: [ɑ̃].', category:'Presentación' },
  { id:6, phrase:"Merci beaucoup.", phonetic:"[mehr-SEE boh-KOO]", es:"Muchas gracias.", note:'"Beaucoup" — la "eau" siempre suena [o]. La "p" final es muda. [boh-KOO] — acento en la última sílaba.', category:'Cortesía' },
  { id:7, phrase:"Je ne comprends pas.", phonetic:"[zhe ne kom-PRAHN pah]", es:"No entiendo.", note:'"Comprends" — la "ds" final es muda. La "an" de "comprends" es nasal [ɑ̃]. Informal: "Je comprends pas" (sin "ne").', category:'Ayuda' },
  { id:8, phrase:"Pouvez-vous répéter?", phonetic:"[poo-VEH-voo reh-peh-TEH]", es:"¿Puede repetir?", note:'"Répéter" tiene dos é — recuerda los acentos. La liaison "Pouvez-vous" → [poo-VEH-voo], la z se pronuncia en liaison.', category:'Ayuda' },
  { id:9, phrase:"Où sont les toilettes?", phonetic:"[oo sohn leh twah-LET]", es:"¿Dónde están los baños?", note:'"Où" = dónde (con acento grave). "Toilettes" siempre en plural en francés. La "s" de "sont" y "les" son silenciosas.', category:'Supervivencia' },
  { id:10, phrase:"Combien ça coûte?", phonetic:"[kom-BYEHN sah koot]", es:"¿Cuánto cuesta?", note:'"Combien" — vocal nasal "ien" [jɛ̃]. "Coûte" tiene acento circunflejo en la "û" pero la pronunciación es igual que "coute".', category:'Supervivencia' },
  { id:11, phrase:"Excusez-moi.", phonetic:"[ek-skü-ZEH-mwah]", es:"Discúlpeme / Con permiso.", note:'"Excusez" — la liaison con "moi" hace [ZEH-mwah]. La "ui" en "moi" es un diptongo: empieza con [m] y termina en [wa].', category:'Cortesía' },
  { id:12, phrase:"Je suis désolé(e).", phonetic:"[zhe swee deh-zoh-LEH]", es:"Lo siento / Disculpa.", note:'"Suis" = [swee], no "sús". "Désolé" tiene acento agudo (é) en todas sus ées. Adjetivo: désolé (m) / désolée (f).', category:'Cortesía' },
  { id:13, phrase:"J'ai besoin d'aide.", phonetic:"[zhay buh-ZWAN daid]", es:"Necesito ayuda.", note:'"J\'ai besoin de" + sustantivo = necesitar algo. "Besoin" tiene vocal nasal [buh-ZWƐN]. La contracción "d\'aide" = de + aide.', category:'Supervivencia' },
  { id:14, phrase:"Quelle heure est-il?", phonetic:"[kel uhr eh-TEEL]", es:"¿Qué hora es?", note:'"Quelle" = ¿cuál? (femenino). La liaison en "est-il" → [eh-TEEL]. Respuesta: "Il est deux heures" (son las dos).', category:'Supervivencia' },
  { id:15, phrase:"Au revoir!", phonetic:"[oh ruh-VWAHR]", es:"¡Adiós! / ¡Hasta la vista!", note:'"Revoir" = ver de nuevo. "Au" = a + le. La "r" francesa es gutural (de la garganta). "Bonne journée!" = ¡Buen día!', category:'Despedidas' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaFrancesA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/frances/a1"
      hubLabel="🇫🇷 Français A1"
      eyebrow="Expression orale · Français A1"
      title="Expressions de survie A1"
      lead="15 expresiones esenciales con guía fonética y notas especiales para hispanohablantes."
      categories={CATEGORIES.slice(1)}
      noteHeading="Note de prononciation"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Felicitaciones! Dominas las 15 expresiones."
      completionBody="Ahora úsalas en conversación real — practica con David o Zhanna."
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
          🎯 <strong>Cómo practicar:</strong> Lee la guía fonética → di la frase 3 veces en voz alta → si sonó natural, marca ✓. Si no, deja sin marcar para volver después.
        </>
      }
    />
  )
}
