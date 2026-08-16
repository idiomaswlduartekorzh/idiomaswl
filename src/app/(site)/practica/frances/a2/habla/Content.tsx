import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:"À mon avis, ___.", phonetic:"[a mon aVI, ___]", es:"En mi opinión, ___.", note:'Expresión de opinión muy usada en francés oral y escrito. Equivale a "selon moi" (más formal) o "pour moi" (más informal). Siempre seguida de una frase: "À mon avis, c\'est une bonne idée." Se coloca al inicio o al final de la oración.', category:'Opinions' },
  { id:2, phrase:"Je suis d'accord / Je ne suis pas d'accord.", phonetic:"[zhə swi daKOR / zhə nə swi pa daKOR]", es:"Estoy de acuerdo / No estoy de acuerdo.", note:'Fórmulas esenciales para el debate. En francés oral informal se dice "D\'accord !" (como "OK!"). Matices: "Je suis tout à fait d\'accord" (completamente de acuerdo), "Je suis partiellement d\'accord" (parcialmente de acuerdo). La negación "ne" se omite frecuentemente en el habla: "Je suis pas d\'accord."', category:'Opinions' },
  { id:3, phrase:"C'est un bon point.", phonetic:"[sé ẽ bõ PWẼT]", es:"Es un buen punto / Tienes razón en eso.", note:'Expresión usada para reconocer un argumento válido del interlocutor. Variantes: "C\'est vrai" (es verdad), "Tu as raison sur ce point" (tienes razón en ese punto), "C\'est intéressant comme argument" (formal). Útil en debates y reuniones.', category:'Opinions' },
  { id:4, phrase:"Pouvez-vous répéter plus lentement ?", phonetic:"[puVEH vu repeTEH plü lãtəMÃ]", es:"¿Puede repetir más despacio?", note:'Forma formal (vouvoiement). Versión informal con "tu": "Tu peux répéter plus lentement ?" La liaison en "Pouvez-vous" → la z se pronuncia. Alternativas: "Pourriez-vous parler moins vite ?" (¿podría hablar más despacio?) o simplement "Plus lentement, s\'il vous plaît !"', category:'Compréhension' },
  { id:5, phrase:"Qu'est-ce que ___ veut dire ?", phonetic:"[kɛs kə ___ vø DIR]", es:"¿Qué significa ___?", note:'"Que veut dire" = ¿qué significa? La forma completa es "Qu\'est-ce que le mot ___ veut dire ?" También se puede decir "Quel est le sens de ___ ?" (más formal). En conversación informal: "C\'est quoi ___ ?" o "Ça signifie quoi ?"', category:'Compréhension' },
  { id:6, phrase:"Je cherche ___.", phonetic:"[zhə SHƐRSH ___]", es:"Estoy buscando ___.", note:'"Chercher" = buscar. Muy útil en tiendas, hoteles y la calle. Variantes: "Je cherche la rue ___" (busco la calle), "Je cherche un hôtel pas cher" (busco un hotel económico). Para preguntar por personas: "Je cherche Monsieur Martin." La "ch" francesa siempre es [ʃ], como "sh" en inglés.', category:'Voyages' },
  { id:7, phrase:"Pour aller à ___, s'il vous plaît ?", phonetic:"[pur aLE a ___, sil vu PLÉ]", es:"¿Para ir a ___, por favor?", note:'La forma más cortés de pedir indicaciones en Francia. Tras escuchar la respuesta, di "Merci beaucoup !" Respuestas útiles: "Tournez à droite/gauche" (gire a la derecha/izquierda), "Continuez tout droit" (siga recto), "C\'est à 5 minutes à pied" (a 5 minutos a pie).', category:'Voyages' },
  { id:8, phrase:"C'est loin d'ici ?", phonetic:"[sé LWẼ diSI]", es:"¿Está lejos de aquí?", note:'"Loin" = lejos, "près" = cerca. Respuestas posibles: "C\'est à 10 minutes à pied" (10 minutos a pie), "Prenez le bus numéro 7" (tome el bus 7), "C\'est tout près, à 100 mètres" (muy cerca, a 100 metros). Variante: "C\'est à quelle distance ?" (más formal).', category:'Voyages' },
  { id:9, phrase:"Je voudrais faire une réservation.", phonetic:"[zhə vudRÉ fɛr yn rezervaSYÕ]", es:"Quisiera hacer una reserva.", note:'"Je voudrais" = quisiera (conditionnel de vouloir — más cortés que "je veux"). Completa la frase: "...pour deux personnes / pour ce soir / pour le 15 juin." En un hotel: "Je voudrais une chambre pour deux nuits." En un restaurante: "Je voudrais réserver une table pour 4 personnes."', category:'Voyages' },
  { id:10, phrase:"À quelle heure ça ouvre / ferme ?", phonetic:"[a kɛl ÖR sa UVR / FƐRM]", es:"¿A qué hora abre / cierra?", note:'"Ouvrir" (abrir) → ça ouvre. "Fermer" (cerrar) → ça ferme. Respuestas: "Ça ouvre à 9h" / "Ça ferme à 20h". También: "C\'est ouvert le dimanche ?" (¿está abierto los domingos?). En francés se usan las horas de 0 a 24 frecuentemente: "Ça ferme à 22h" (a las 10pm).', category:'Voyages' },
  { id:11, phrase:"Je travaille ici depuis ___.", phonetic:"[zhə traVAY isi dəPWI ___]", es:"Trabajo aquí desde hace ___.", note:'"Depuis" = desde hace (expresa duración que continúa en el presente). Siempre con PRESENTE en francés: "Je travaille ici depuis trois ans" (trabajo aquí desde hace 3 años, y sigo trabajando). ¡Nunca passé composé! Ejemplo: "J\'habite à Paris depuis 2020."', category:'Travail' },
  { id:12, phrase:"Mes responsabilités comprennent ___.", phonetic:"[mé rɛspõsabiliTE kõPRÃN ___]", es:"Mis responsabilidades incluyen ___.", note:'Expresión formal para hablar de funciones laborales. Alternativas: "Je suis chargé(e) de ___" (soy responsable de), "Mon rôle consiste à ___" (mi rol consiste en). En una entrevista: "Dans mon poste actuel, je gère une équipe de cinq personnes."', category:'Travail' },
  { id:13, phrase:"Est-ce que je pourrais parler au directeur ?", phonetic:"[ɛs kə zhə puRÉ parLE o direkTÖR]", es:"¿Podría hablar con el director?", note:'"Pourrais" = conditionnel de "pouvoir" → más educado que "je peux". En el teléfono: "Pourriez-vous me passer Monsieur Dupont ?" (¿podría comunicarme con el señor Dupont?). Respuestas: "Je vous le passe" (le comunico), "Il est absent pour le moment" (está ausente en este momento).', category:'Travail' },
  { id:14, phrase:"Il/Elle est plus grand(e) que ___.", phonetic:"[il/ɛl é plü GRÃD kə ___]", es:"Él/Ella es más alto/a que ___.", note:'Estructura del comparatif de supériorité: plus + adjectif + que. Acuerda el adjetivo: "Il est grand" (m.) / "Elle est grande" (f.) / "Ils sont grands" (m. pl.) / "Elles sont grandes" (f. pl.). La "d" final de "grand" es muda, pero aparece en el femenino: "grande" [GRÃD].', category:'Description' },
  { id:15, phrase:"C'est la personne la plus ___ que je connaisse.", phonetic:"[sé la pɛrSON la plü ___ kə zhə koNÈS]", es:"Es la persona más ___ que conozco.", note:'Superlatif relatif: le/la/les + plus + adjectif + que + (subjonctif). "Je connaisse" está en subjonctif — un tiempo difícil que aprenderás en B1, pero esta frase como chunk ya la puedes usar. Ejemplos: "C\'est le film le plus intéressant que j\'aie vu."', category:'Description' },
  { id:16, phrase:"Comment est-il/elle (physiquement) ?", phonetic:"[koMÃ ɛTil/ɛl fizikMÃ]", es:"¿Cómo es él/ella físicamente?", note:'Pregunta para pedir descripción física. Respuestas posibles: "Il est grand et mince avec les cheveux bruns" (alto y delgado con pelo castaño). "Elle est de taille moyenne" (de estatura mediana). La liaison "est-il" → el sonido [t] aparece: [ɛTil]. Compare: "Comment est-il ?" (fisico/personalidad) vs "Comment va-t-il ?" (cómo está de salud).', category:'Description' },
  { id:17, phrase:"Avant, je ___. (imparfait)", phonetic:"[aVÃ, zhə ___]", es:"Antes, yo ___. (hablar del pasado habitual)", note:'"Avant" = antes (marcador clásico del imparfait). Siempre seguido de imparfait para hablar de hábitos o estados pasados. Ejemplos: "Avant, je vivais à la campagne" (antes vivía en el campo), "Avant, je ne parlais pas français" (antes no hablaba francés). Contrastarlo con "maintenant" (ahora + présent): "Avant, je prenais le bus. Maintenant, je prends le métro."', category:'Social' },
  { id:18, phrase:"Ça fait longtemps qu'on ne s'est pas vus !", phonetic:"[sa fɛ lõtÃ kõ nə sé pa VÜ]", es:"¡Hace mucho que no nos veíamos!", note:'Expresión muy natural para el reencuentro. "Longtemps" = mucho tiempo. La estructura "ça fait + durée + que" expresa duración. Respuestas: "Oui, ça fait au moins deux ans !" (¡sí, hace al menos dos años!). Informal: "Ça fait une éternité !" (¡hace una eternidad!). La "s" de "vus" se pronuncia porque es participio, no liaison.', category:'Social' },
  { id:19, phrase:"Vous voudriez vous joindre à nous ?", phonetic:"[vu vudRYÉ vu ZHWƐDR a nu]", es:"¿Le gustaría unirse a nosotros?", note:'Invitación formal y elegante usando el conditionnel. Versión informal: "Tu veux venir avec nous ?" Para las respuestas: "Avec plaisir !" (¡con mucho gusto!), "Je suis désolé(e), je ne peux pas" (lo siento, no puedo), "C\'est très aimable, merci !" (es muy amable, gracias!). "Se joindre à" = unirse a.', category:'Social' },
  { id:20, phrase:"C'est moi qui invite.", phonetic:"[sé mwa ki ẽVIT]", es:"Yo invito. / Corro yo con la cuenta.", note:'Expresión típica francesa al final de una comida o salida. La estructura "c\'est + pronom + qui + verbe" es un gallicismo de la énfasis: "C\'est moi qui invite" (soy yo quien invita). Respuestas: "Ah non, je ne peux pas accepter !" (¡no, no puedo aceptar!), "La prochaine fois, c\'est moi !" (la próxima vez, yo). Alternativa: "C\'est ma tournée !" (¡es mi ronda! — en un bar).', category:'Social' },
];

const CATEGORIES = ['Tous', 'Opinions', 'Compréhension', 'Voyages', 'Travail', 'Description', 'Social'];

export default function HablaFrancesA2() {
  return (
    <SpeakingPractice
      hubHref="/practica/frances/a2"
      hubLabel="🇫🇷 Français A2"
      eyebrow="Expression orale · Français A2"
      title="Expressions essentielles A2"
      lead="20 expressions A2 con contexto situacional, pronunciación y notas de cultura francesa."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota gramatical y cultural"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Felicitaciones! Dominas las 20 expresiones A2."
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
          🎯 <strong>Cómo practicar:</strong> Lee la transcripción fonética → di la frase 3 veces en voz alta → lee la nota cultural → si te sientes seguro/a, marca ✓.
        </>
      }
    />
  )
}
