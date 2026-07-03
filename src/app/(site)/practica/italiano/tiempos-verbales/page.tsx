import type { Metadata } from 'next';
import TenseDrillEngine from '@/components/practica/TenseDrillEngine';
import type { DrillItem } from '@/components/practica/TenseDrillEngine';
import { GrammarLessonSchema } from '@/components/practica/EducationSchema';

export const metadata: Metadata = {
  title: 'Tiempos verbales en italiano — Traducción guiada en vivo | Idiomas WeLearn',
  description: 'Set de 50 oraciones en español para traducir al italiano en clase, de dificultad creciente, sin pistas. El profesor controla el tiempo y revisa la traducción junto al alumno.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/italiano/tiempos-verbales' },
};

const items: DrillItem[] = [
  { level: 'A1', tenseFocus: 'Presente', es: 'Yo como pan por la mañana.', it: 'Io mangio pane la mattina.', seconds: 15 },
  { level: 'A1', tenseFocus: 'Presente', es: 'Ella vive en Bogotá.', it: 'Lei vive a Bogotá.', seconds: 15 },
  { level: 'A1', tenseFocus: 'Passato prossimo (avere)', es: 'Nosotros compramos frutas ayer.', it: 'Ieri abbiamo comprato della frutta.', seconds: 18 },
  { level: 'A1', tenseFocus: 'Presente', es: 'Tú hablas italiano muy bien.', it: "Tu parli molto bene l'italiano.", seconds: 15 },
  { level: 'A1', tenseFocus: 'Passato prossimo (essere)', es: 'Ellos fueron al parque el sábado.', it: 'Sabato sono andati al parco.', seconds: 18 },
  { level: 'A1', tenseFocus: 'Presente', es: 'Mi hermano trabaja en un banco.', it: 'Mio fratello lavora in una banca.', seconds: 15 },
  { level: 'A1', tenseFocus: 'Passato prossimo impersonale', es: 'Ayer llovió mucho en la ciudad.', it: 'Ieri ha piovuto molto in città.', seconds: 18 },
  { level: 'A1', tenseFocus: 'Futuro semplice', es: 'Nosotros vamos a viajar mañana.', it: 'Domani viaggeremo.', seconds: 18 },

  { level: 'A2', tenseFocus: 'Imperfetto abituale', es: 'Cuando era niño, jugaba fútbol todos los días.', it: 'Quando ero bambino, giocavo a calcio tutti i giorni.', seconds: 25 },
  { level: 'A2', tenseFocus: 'Imperfetto + passato prossimo', es: 'Ayer, mientras cocinaba, sonó el teléfono.', it: 'Ieri, mentre cucinavo, è squillato il telefono.', seconds: 28 },
  { level: 'A2', tenseFocus: 'Comparativo', es: 'Mi ciudad es más grande que la tuya.', it: 'La mia città è più grande della tua.', seconds: 20 },
  { level: 'A2', tenseFocus: 'Riflessivo presente', es: 'Ella se levanta a las seis todos los días.', it: 'Lei si sveglia alle sei tutti i giorni.', seconds: 20 },
  { level: 'A2', tenseFocus: 'Futuro semplice', es: 'Nos vamos a encontrar en la plaza a las cinco.', it: 'Ci incontreremo in piazza alle cinque.', seconds: 22 },
  { level: 'A2', tenseFocus: 'Imperfetto + passato prossimo', es: 'El clima estaba muy frío cuando salimos.', it: 'Il tempo era molto freddo quando siamo usciti.', seconds: 25 },
  { level: 'A2', tenseFocus: 'Presente perfetto', es: 'Ustedes ya han terminado la tarea.', it: 'Voi avete già finito i compiti.', seconds: 20 },
  { level: 'A2', tenseFocus: 'Trapassato prossimo', es: 'Yo nunca había visto una playa tan bonita.', it: 'Non avevo mai visto una spiaggia così bella.', seconds: 25 },

  { level: 'B1', tenseFocus: 'Relativa', es: 'El hombre que vive al lado de mi casa es médico.', it: "L'uomo che vive accanto a casa mia è medico.", seconds: 25 },
  { level: 'B1', tenseFocus: 'Concessiva', es: 'Aunque llovía, decidimos salir a caminar.', it: 'Anche se pioveva, abbiamo deciso di uscire a camminare.', seconds: 28 },
  { level: 'B1', tenseFocus: 'Condizionale passato (indiretto)', es: 'Ella me dijo que vendría más tarde.', it: 'Lei mi ha detto che sarebbe venuta più tardi.', seconds: 28 },
  { level: 'B1', tenseFocus: 'Periodo ipotetico realtà', es: 'Si tengo tiempo, te ayudo con el proyecto.', it: 'Se ho tempo, ti aiuto con il progetto.', seconds: 22 },
  { level: 'B1', tenseFocus: 'Congiuntivo trapassato (indiretto)', es: 'Nadie sabía qué había pasado realmente.', it: 'Nessuno sapeva cosa fosse successo realmente.', seconds: 30 },
  { level: 'B1', tenseFocus: 'Gerundio composto', es: 'Después de terminar el examen, todos salieron a celebrar.', it: "Dopo aver finito l'esame, tutti sono usciti a festeggiare.", seconds: 28 },
  { level: 'B1', tenseFocus: 'Imperfetto + passato prossimo', es: 'Mientras estudiaba para el examen, recibí una llamada importante.', it: "Mentre studiavo per l'esame, ho ricevuto una chiamata importante.", seconds: 28 },
  { level: 'B1', tenseFocus: 'Relativa + passato prossimo', es: 'Los estudiantes que llegaron tarde no pudieron entrar.', it: 'Gli studenti che sono arrivati tardi non hanno potuto entrare.', seconds: 28 },

  { level: 'B1/B2', tenseFocus: 'Congiuntivo presente', es: 'Es importante que llegues a tiempo mañana.', it: 'È importante che tu arrivi in tempo domani.', seconds: 25 },
  { level: 'B1/B2', tenseFocus: 'Congiuntivo passato', es: 'Dudo que ellos hayan terminado el trabajo.', it: 'Dubito che loro abbiano finito il lavoro.', seconds: 28 },
  { level: 'B1/B2', tenseFocus: 'Periodo ipotetico possibilità', es: 'Si tuviera más dinero, compraría una casa nueva.', it: 'Se avessi più soldi, comprerei una casa nuova.', seconds: 28 },
  { level: 'B1/B2', tenseFocus: 'Passivo', es: 'El proyecto fue aprobado por el comité ayer.', it: 'Il progetto è stato approvato dal comitato ieri.', seconds: 25 },
  { level: 'B2', tenseFocus: 'Periodo ipotetico irrealtà passato', es: 'Aunque hubiera estudiado más, no habría aprobado el examen.', it: 'Anche se avessi studiato di più, non avrei superato l\'esame.', seconds: 32 },
  { level: 'B2', tenseFocus: 'Congiuntivo passato', es: 'Me sorprende que no hayas llamado antes.', it: 'Mi sorprende che tu non abbia chiamato prima.', seconds: 28 },
  { level: 'B2', tenseFocus: 'Congiuntivo imperfetto passivo', es: 'El gerente pidió que se revisaran todos los informes.', it: 'Il direttore ha chiesto che tutti i rapporti fossero rivisti.', seconds: 32 },
  { level: 'B2', tenseFocus: 'Passivo + gerundio negativo', es: 'Las decisiones fueron tomadas sin consultar al equipo.', it: 'Le decisioni sono state prese senza consultare la squadra.', seconds: 30 },

  { level: 'B2', tenseFocus: 'Passivo con venire', es: 'El edificio está siendo remodelado desde hace tres meses.', it: 'L\'edificio viene ristrutturato da tre mesi.', seconds: 30 },
  { level: 'B2', tenseFocus: 'Dopo aver + infinito', es: 'Habiendo terminado el informe, el equipo decidió tomarse un descanso.', it: 'Dopo aver finito il rapporto, la squadra ha deciso di prendersi una pausa.', seconds: 32 },
  { level: 'B2/C1', tenseFocus: 'Discorso indiretto complesso', es: 'El profesor explicó que el examen habría sido más fácil si hubiéramos practicado más.', it: "Il professore ha spiegato che l'esame sarebbe stato più facile se avessimo praticato di più.", seconds: 38 },
  { level: 'B2', tenseFocus: 'Concessiva + passato prossimo', es: 'A pesar de las dificultades económicas, la empresa logró aumentar sus ventas este año.', it: "Nonostante le difficoltà economiche, l'azienda è riuscita ad aumentare le vendite quest'anno.", seconds: 32 },
  { level: 'B2', tenseFocus: 'Comparativo proporzionale', es: 'Cuanto más practiques, más rápido aprenderás el idioma.', it: 'Più pratichi, più velocemente imparerai la lingua.', seconds: 25 },
  { level: 'B2', tenseFocus: 'Trapassato passivo + relativa', es: 'El informe, que había sido revisado tres veces, todavía tenía errores.', it: 'Il rapporto, che era stato rivisto tre volte, aveva ancora degli errori.', seconds: 32 },
  { level: 'B2', tenseFocus: 'Impersonale + futuro', es: 'Se dice que la nueva política beneficiará a los trabajadores a largo plazo.', it: 'Si dice che la nuova politica beneficerà i lavoratori a lungo termine.', seconds: 30 },
  { level: 'B2/C1', tenseFocus: 'Periodo ipotetico irrealtà', es: 'Si el gobierno hubiera actuado antes, la crisis no habría alcanzado estas proporciones.', it: 'Se il governo avesse agito prima, la crisi non avrebbe raggiunto queste proporzioni.', seconds: 35 },

  { level: 'C1', tenseFocus: 'Concessiva + discorso indiretto', es: 'El testigo afirmó que, aunque había visto el accidente, no podía identificar al conductor.', it: "Il testimone ha affermato che, anche se aveva visto l'incidente, non poteva identificare il conducente.", seconds: 38 },
  { level: 'C1', tenseFocus: 'Imperfetto multiplo', es: 'Mientras los ingenieros terminaban de instalar el sistema, los clientes esperaban impacientes en la sala de reuniones.', it: 'Mentre gli ingegneri finivano di installare il sistema, i clienti aspettavano impazienti nella sala riunioni.', seconds: 38 },
  { level: 'C1', tenseFocus: 'Trapassato passivo + relativa', es: 'Las medidas que se habían implementado el año pasado no lograron resolver el problema de fondo.', it: "Le misure che erano state attuate l'anno scorso non sono riuscite a risolvere il problema di fondo.", seconds: 38 },
  { level: 'C1', tenseFocus: 'Periodo ipotetico irrealtà + congiuntivo', es: 'Es posible que, si las negociaciones hubieran continuado, se habría alcanzado un acuerdo más favorable para ambas partes.', it: 'È possibile che, se i negoziati fossero continuati, si sarebbe raggiunto un accordo più favorevole per entrambe le parti.', seconds: 42 },
  { level: 'C1', tenseFocus: 'Congiuntivo imperfetto (obbligo)', es: 'El director insistió en que todos los empleados, sin excepción, debían presentar el informe antes del viernes.', it: 'Il direttore ha insistito sul fatto che tutti i dipendenti, senza eccezione, dovessero presentare il rapporto entro venerdì.', seconds: 40 },
  { level: 'C1', tenseFocus: 'Relativa + presente', es: 'A medida que la tecnología avanza, las empresas que no se adaptan corren el riesgo de quedar obsoletas.', it: 'Man mano che la tecnologia avanza, le aziende che non si adattano rischiano di diventare obsolete.', seconds: 38 },

  { level: 'C1/C2', tenseFocus: 'Periodo ipotetico irrealtà passato complesso', es: 'Si las autoridades hubieran tomado en cuenta las advertencias de los expertos, probablemente se habrían evitado muchas de las consecuencias que hoy enfrenta la región.', it: 'Se le autorità avessero tenuto conto degli avvertimenti degli esperti, probabilmente si sarebbero evitate molte delle conseguenze che oggi la regione sta affrontando.', seconds: 48 },
  { level: 'C2', tenseFocus: 'Concessiva + condizionale passato + relativa', es: 'Aunque el comité había garantizado que el proyecto se completaría dentro del plazo establecido, surgieron una serie de imprevistos que retrasaron considerablemente su finalización.', it: 'Anche se il comitato aveva garantito che il progetto sarebbe stato completato entro il termine stabilito, sono sorti una serie di imprevisti che ne hanno ritardato notevolmente il completamento.', seconds: 52 },
  { level: 'C2', tenseFocus: 'Causale + congiuntivo trapassato', es: 'Dado que las condiciones climáticas habían empeorado considerablemente durante la noche, los organizadores decidieron posponer el evento hasta que las autoridades competentes confirmaran que era seguro proceder.', it: "Dato che le condizioni climatiche erano peggiorate notevolmente durante la notte, gli organizzatori hanno deciso di posticipare l'evento finché le autorità competenti non avessero confermato che era sicuro procedere.", seconds: 58 },
  {
    level: 'C2', tenseFocus: 'Frase estrema: multi-subordinada',
    es: 'Las condiciones estructurales que se han venido acumulando durante los últimos años, sumadas a la falta de una respuesta oportuna por parte de las autoridades competentes, han generado una serie de consecuencias negativas que, de no ser abordadas con decisiones estratégicas y sostenibles, podrían agravarse significativamente en el mediano plazo, afectando no solo a quienes dependen directamente del sector, sino también a la economía regional en su conjunto, razón por la cual se ha solicitado que, antes de que finalice el trimestre, se convoque una reunión extraordinaria en la que participen todos los actores involucrados.',
    it: "Le condizioni strutturali che si sono andate accumulando negli ultimi anni, sommate alla mancanza di una risposta tempestiva da parte delle autorità competenti, hanno generato una serie di conseguenze negative che, se non affrontate con decisioni strategiche e sostenibili, potrebbero aggravarsi significativamente nel medio termine, colpendo non solo coloro che dipendono direttamente dal settore, ma anche l'economia regionale nel suo insieme, motivo per cui è stato richiesto che, prima della fine del trimestre, venga convocata una riunione straordinaria alla quale partecipino tutti gli attori coinvolti.",
    seconds: 100,
  },
];

export default function TiemposVerbalesItaliano() {
  return (
    <>
      <GrammarLessonSchema
        name="Tiempos verbales en italiano — Traducción guiada en vivo"
        url="https://www.idiomaswl.com/practica/italiano/tiempos-verbales"
        description="Set de 50 oraciones en español para traducir al italiano en clase, de dificultad creciente (A1 a C2), sin pistas previas. Tiempo límite por oración y revisión conjunta profesor-alumno."
        educationalLevel="A1, A2, B1, B2, C1, C2"
        inLanguage="it"
        keywords={['tiempos verbales italiano', 'passato prossimo vs imperfetto', 'traducción español italiano', 'ejercicio guiado italiano']}
        course={{ name: 'Práctica de Italiano', url: 'https://www.idiomaswl.com/practica/italiano' }}
      />
      <TenseDrillEngine
        color="#009246"
        flag="🇮🇹"
        title="Tiempos Verbales — Modo en Vivo"
        subtitle="Italiano — Traducción guiada · 50 oraciones"
        backHref="/practica/italiano"
        backLabel="Italiano"
        items={items}
      />
    </>
  );
}
