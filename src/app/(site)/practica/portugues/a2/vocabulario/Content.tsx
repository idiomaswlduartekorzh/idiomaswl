'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation?: string; }
interface VocabSet { id: string; name: string; namePt: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'viagens', name: 'Viajes y transporte', namePt: 'Viagens e transporte', icon: '✈️',
    words: [
      { word: 'a passagem', es: 'el pasaje/boleto', emoji: '🎫', example: 'Comprei a passagem para o Rio com antecedência.', exampleEs: 'Compré el boleto para Río con anticipación.', pronunciation: '[pa-SAH-zheng]' },
      { word: 'o passaporte', es: 'el pasaporte', emoji: '📘', example: 'Não esqueça o passaporte na hora de embarcar.', exampleEs: 'No olvides el pasaporte a la hora de embarcar.', pronunciation: '[pa-sa-POR-tchi]' },
      { word: 'a bagagem', es: 'el equipaje', emoji: '🧳', example: 'Minha bagagem está muito pesada.', exampleEs: 'Mi equipaje está muy pesado.', pronunciation: '[ba-GAH-zheng]' },
      { word: 'a alfândega', es: 'la aduana', emoji: '🛃', example: 'Passamos pela alfândega sem problemas.', exampleEs: 'Pasamos por la aduana sin problemas.', pronunciation: '[al-FAN-deh-gah]' },
      { word: 'o check-in', es: 'el check-in', emoji: '✅', example: 'O check-in abre duas horas antes do voo.', exampleEs: 'El check-in abre dos horas antes del vuelo.', pronunciation: '[TCHE-khin]' },
      { word: 'o destino', es: 'el destino', emoji: '📍', example: 'Qual é o seu destino de férias este ano?', exampleEs: '¿Cuál es tu destino de vacaciones este año?', pronunciation: '[des-TCHEE-noo]' },
      { word: 'o embarque', es: 'el embarque', emoji: '🚪', example: 'O embarque começa às 10h30 na porta 5.', exampleEs: 'El embarque comienza a las 10h30 en la puerta 5.', pronunciation: '[em-BAR-keh]' },
      { word: 'a chegada', es: 'la llegada', emoji: '🛬', example: 'A chegada está prevista para as 15h.', exampleEs: 'La llegada está prevista para las 15h.', pronunciation: '[sheh-GAH-dah]' },
      { word: 'a escala', es: 'la escala', emoji: '🔄', example: 'O voo tem uma escala de duas horas em Guarulhos.', exampleEs: 'El vuelo tiene una escala de dos horas en Guarulhos.', pronunciation: '[es-KAH-lah]' },
      { word: 'o cartão de embarque', es: 'la tarjeta de embarque', emoji: '🎟️', example: 'Salve o cartão de embarque no celular.', exampleEs: 'Guarda la tarjeta de embarque en el celular.', pronunciation: '[kar-TOWNG dji em-BAR-keh]' },
    ],
  },
  {
    id: 'trabalho', name: 'Trabajo y carrera', namePt: 'Trabalho e carreira', icon: '💼',
    words: [
      { word: 'o salário', es: 'el salario', emoji: '💰', example: 'O salário foi depositado na conta ontem.', exampleEs: 'El salario fue depositado en la cuenta ayer.', pronunciation: '[sa-LAH-ryoo]' },
      { word: 'o/a colega', es: 'el/la colega/compañero/a', emoji: '🤝', example: 'Minha colega de trabalho é muito competente.', exampleEs: 'Mi compañera de trabajo es muy competente.', pronunciation: '[koo-LEH-gah]' },
      { word: 'o/a gerente', es: 'el/la gerente', emoji: '👔', example: 'O gerente aprovou o novo projeto.', exampleEs: 'El gerente aprobó el nuevo proyecto.', pronunciation: '[zheh-REN-tchi]' },
      { word: 'o prazo', es: 'el plazo/deadline', emoji: '⏰', example: 'O prazo de entrega é amanhã às 18h.', exampleEs: 'El plazo de entrega es mañana a las 18h.', pronunciation: '[PRAH-zoo]' },
      { word: 'a reunião', es: 'la reunión', emoji: '📋', example: 'A reunião de equipe é toda segunda às 9h.', exampleEs: 'La reunión de equipo es todos los lunes a las 9h.', pronunciation: '[heh-oony-OWN]' },
      { word: 'a promoção', es: 'el ascenso/la promoción', emoji: '📈', example: 'Ele recebeu uma promoção depois de dois anos.', exampleEs: 'Él recibió un ascenso después de dos años.', pronunciation: '[proo-moo-SOWNG]' },
      { word: 'demitir-se', es: 'renunciar/dimitir', emoji: '🚪', example: 'Ela se demitiu para abrir o próprio negócio.', exampleEs: 'Ella renunció para abrir su propio negocio.', pronunciation: '[deh-mee-TCHEER seh]' },
      { word: 'contratar', es: 'contratar', emoji: '📝', example: 'A empresa vai contratar cinco novos funcionários.', exampleEs: 'La empresa va a contratar cinco nuevos empleados.', pronunciation: '[kon-tra-TAR]' },
      { word: 'desempregado/a', es: 'desempleado/a', emoji: '😔', example: 'Ele está desempregado há três meses.', exampleEs: 'Él está desempleado hace tres meses.', pronunciation: '[deh-zen-preh-GAH-doo]' },
      { word: 'a hora extra', es: 'la hora extra', emoji: '⌚', example: 'Trabalhei muitas horas extras este mês.', exampleEs: 'Trabajé muchas horas extras este mes.', pronunciation: '[OH-rah EKS-trah]' },
    ],
  },
  {
    id: 'compras', name: 'Compras y dinero', namePt: 'Compras e dinheiro', icon: '🛍️',
    words: [
      { word: 'o recibo', es: 'el recibo', emoji: '🧾', example: 'Guarda o recibo para trocar o produto.', exampleEs: 'Guarda el recibo para cambiar el producto.', pronunciation: '[heh-SEE-boo]' },
      { word: 'o desconto', es: 'el descuento', emoji: '🏷️', example: 'Esta loja dá 20% de desconto à vista.', exampleEs: 'Esta tienda da 20% de descuento en efectivo.', pronunciation: '[des-KON-too]' },
      { word: 'o reembolso', es: 'el reembolso/reintegro', emoji: '💵', example: 'Pedi o reembolso porque o produto era defeituoso.', exampleEs: 'Pedí el reembolso porque el producto era defectuoso.', pronunciation: '[heh-em-BOL-soo]' },
      { word: 'a pechincha', es: 'la ganga/oferta', emoji: '✨', example: 'Achei uma pechincha na liquidação de fim de ano.', exampleEs: 'Encontré una ganga en la liquidación de fin de año.', pronunciation: '[peh-SHEEN-shah]' },
      { word: 'custar', es: 'costar', emoji: '💲', example: 'Quanto custa esse vestido na vitrine?', exampleEs: '¿Cuánto cuesta ese vestido en el escaparate?', pronunciation: '[koos-TAR]' },
      { word: 'a moeda', es: 'la moneda', emoji: '🪙', example: 'O real é a moeda do Brasil.', exampleEs: 'El real es la moneda de Brasil.', pronunciation: '[moo-EH-dah]' },
      { word: 'o dinheiro vivo', es: 'el dinero en efectivo', emoji: '💵', example: 'Prefiro pagar em dinheiro vivo nesta feira.', exampleEs: 'Prefiero pagar en efectivo en esta feria.', pronunciation: '[dji-NYAY-roo VEE-voo]' },
      { word: 'o cartão de crédito', es: 'la tarjeta de crédito', emoji: '💳', example: 'Posso parcelar no cartão de crédito?', exampleEs: '¿Puedo pagar en cuotas con tarjeta de crédito?', pronunciation: '[kar-TOWNG dji KREH-djee-too]' },
      { word: 'o troco', es: 'el cambio/vuelto', emoji: '🪙', example: 'O vendedor me deu o troco errado.', exampleEs: 'El vendedor me dio el cambio equivocado.', pronunciation: '[TROH-koo]' },
      { word: 'a etiqueta', es: 'la etiqueta/precio', emoji: '🏷️', example: 'A etiqueta diz que custa R$49,90.', exampleEs: 'La etiqueta dice que cuesta R$49,90.', pronunciation: '[eh-tchi-KEH-tah]' },
    ],
  },
  {
    id: 'saude', name: 'Salud y cuerpo', namePt: 'Saúde e corpo', icon: '🏥',
    words: [
      { word: 'a dor de cabeça', es: 'el dolor de cabeza', emoji: '🤕', example: 'Estou com uma dor de cabeça terrível hoje.', exampleEs: 'Tengo un dolor de cabeza terrible hoy.', pronunciation: '[dor dji kah-BEH-sah]' },
      { word: 'a febre', es: 'la fiebre', emoji: '🌡️', example: 'A criança está com febre de 38 graus.', exampleEs: 'El niño tiene fiebre de 38 grados.', pronunciation: '[FEH-breh]' },
      { word: 'a receita médica', es: 'la receta médica', emoji: '📋', example: 'Preciso de uma receita médica para comprar este remédio.', exampleEs: 'Necesito una receta médica para comprar este medicamento.', pronunciation: '[heh-SAY-tah MEH-djee-kah]' },
      { word: 'a farmácia', es: 'la farmacia', emoji: '💊', example: 'A farmácia mais próxima fica na próxima esquina.', exampleEs: 'La farmacia más cercana está en la próxima esquina.', pronunciation: '[far-MAH-syah]' },
      { word: 'o sintoma', es: 'el síntoma', emoji: '🤒', example: 'Quais são os sintomas da gripe?', exampleEs: '¿Cuáles son los síntomas de la gripe?', pronunciation: '[SEEN-too-mah]' },
      { word: 'a consulta', es: 'la consulta/cita médica', emoji: '🏨', example: 'Marquei uma consulta para terça-feira.', exampleEs: 'Reservé una consulta para el martes.', pronunciation: '[kon-SOOL-tah]' },
      { word: 'o/a cirurgião/ã', es: 'el/la cirujano/a', emoji: '🔪', example: 'O cirurgião realizou a operação com sucesso.', exampleEs: 'El cirujano realizó la operación con éxito.', pronunciation: '[see-roor-ZHYOWNG]' },
      { word: 'se recuperar', es: 'recuperarse', emoji: '💪', example: 'Ela está se recuperando bem da cirurgia.', exampleEs: 'Ella se está recuperando bien de la cirugía.', pronunciation: '[seh heh-koo-peh-RAR]' },
      { word: 'a alergia', es: 'la alergia', emoji: '🤧', example: 'Tenho alergia a amendoim e marisco.', exampleEs: 'Tengo alergia al maní y al marisco.', pronunciation: '[ah-ler-ZHYAH]' },
      { word: 'a injeção', es: 'la inyección', emoji: '💉', example: 'O médico deu uma injeção para aliviar a dor.', exampleEs: 'El médico puso una inyección para aliviar el dolor.', pronunciation: '[een-zheh-SOWNG]' },
    ],
  },
  {
    id: 'pessoas', name: 'Describir personas', namePt: 'Descrever pessoas', icon: '👤',
    words: [
      { word: 'confiante', es: 'seguro/a de sí mismo', emoji: '😎', example: 'Ela é muito confiante durante as apresentações.', exampleEs: 'Ella es muy segura de sí misma durante las presentaciones.', pronunciation: '[kon-fy-AN-tchi]' },
      { word: 'ambicioso/a', es: 'ambicioso/a', emoji: '🎯', example: 'Ele é ambicioso e sempre busca novas oportunidades.', exampleEs: 'Él es ambicioso y siempre busca nuevas oportunidades.', pronunciation: '[am-bi-SYOH-zoo]' },
      { word: 'confiável', es: 'confiable/de confianza', emoji: '🤝', example: 'Ela é uma pessoa confiável — cumpre sempre o que promete.', exampleEs: 'Ella es una persona confiable — siempre cumple lo que promete.', pronunciation: '[kon-fy-AH-vel]' },
      { word: 'teimoso/a', es: 'terco/a/obstinado/a', emoji: '😤', example: 'Ele é teimoso — nunca muda de opinião.', exampleEs: 'Él es terco — nunca cambia de opinión.', pronunciation: '[tay-MOH-zoo]' },
      { word: 'generoso/a', es: 'generoso/a', emoji: '🎁', example: 'Minha avó é muito generosa com todo mundo.', exampleEs: 'Mi abuela es muy generosa con todo el mundo.', pronunciation: '[zheh-neh-ROH-zoo]' },
      { word: 'paciente', es: 'paciente', emoji: '🧘', example: 'Um bom professor precisa ser muito paciente.', exampleEs: 'Un buen profesor necesita ser muy paciente.', pronunciation: '[pa-SYEN-tchi]' },
      { word: 'ansioso/a', es: 'ansioso/a/nervioso/a', emoji: '😟', example: 'Fico ansioso antes de cada exame.', exampleEs: 'Me pongo ansioso antes de cada examen.', pronunciation: '[an-SYOH-zoo]' },
      { word: 'alegre', es: 'alegre/feliz', emoji: '😄', example: 'Ela é sempre alegre e sorridente.', exampleEs: 'Ella siempre está alegre y sonriente.', pronunciation: '[ah-LEH-greh]' },
      { word: 'independente', es: 'independiente', emoji: '🦅', example: 'Desde cedo, ele foi muito independente.', exampleEs: 'Desde pequeño, fue muy independiente.', pronunciation: '[een-deh-pen-DEN-tchi]' },
      { word: 'criativo/a', es: 'creativo/a', emoji: '🎨', example: 'Ela é muito criativa no trabalho.', exampleEs: 'Ella es muy creativa en el trabajo.', pronunciation: '[kree-ah-TCHEE-voo]' },
    ],
  },
  {
    id: 'restaurante', name: 'Comida y restaurantes', namePt: 'Comida e restaurantes', icon: '🍽️',
    words: [
      { word: 'o cardápio', es: 'el menú/la carta', emoji: '📋', example: 'Você pode me trazer o cardápio, por favor?', exampleEs: '¿Me puede traer el menú, por favor?', pronunciation: '[kar-DAH-pyoo]' },
      { word: 'a entrada', es: 'el entrante/la entrada', emoji: '🥗', example: 'Como entrada, peço a salada caprese.', exampleEs: 'De entrante, pido la ensalada caprese.', pronunciation: '[en-TRAH-dah]' },
      { word: 'o prato principal', es: 'el plato principal', emoji: '🍽️', example: 'O prato principal do dia é frango grelhado.', exampleEs: 'El plato principal del día es pollo a la plancha.', pronunciation: '[PRAH-too preen-see-PAL]' },
      { word: 'a sobremesa', es: 'el postre', emoji: '🍰', example: 'De sobremesa, quero um pudim de leite.', exampleEs: 'De postre, quiero un flan de leche.', pronunciation: '[soh-breh-MEH-zah]' },
      { word: 'a conta', es: 'la cuenta', emoji: '💵', example: 'Garçom, pode trazer a conta, por favor?', exampleEs: 'Mesero, ¿puede traer la cuenta, por favor?', pronunciation: '[KON-tah]' },
      { word: 'a gorjeta', es: 'la propina', emoji: '💰', example: 'Deixei 10% de gorjeta para o garçom.', exampleEs: 'Dejé el 10% de propina para el mesero.', pronunciation: '[gor-ZHEH-tah]' },
      { word: 'a reserva', es: 'la reserva', emoji: '📞', example: 'Fiz uma reserva para dois às 20h.', exampleEs: 'Hice una reserva para dos a las 20h.', pronunciation: '[heh-ZER-vah]' },
      { word: 'o/a garçom/garçonete', es: 'el mesero/la mesera', emoji: '🧑‍🍳', example: 'O garçom trouxe o prato errado.', exampleEs: 'El mesero trajo el plato equivocado.', pronunciation: '[gar-SOWNG]' },
      { word: 'o ingrediente', es: 'el ingrediente', emoji: '🥕', example: 'Qual é o ingrediente principal desta receita?', exampleEs: '¿Cuál es el ingrediente principal de esta receta?', pronunciation: '[een-greh-dy-EN-tchi]' },
      { word: 'o sabor', es: 'el sabor', emoji: '😋', example: 'Este bolo tem um sabor incrível de chocolate.', exampleEs: 'Este pastel tiene un sabor increíble a chocolate.', pronunciation: '[sa-BOR]' },
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnología y comunicación', namePt: 'Tecnologia e comunicação', icon: '📱',
    words: [
      { word: 'a senha', es: 'la contraseña', emoji: '🔑', example: 'Esqueci minha senha do email.', exampleEs: 'Olvidé mi contraseña del email.', pronunciation: '[SEH-nyah]' },
      { word: 'a atualização', es: 'la actualización', emoji: '🔄', example: 'O aplicativo precisa de uma atualização.', exampleEs: 'La aplicación necesita una actualización.', pronunciation: '[ah-too-ah-lee-zah-SOWNG]' },
      { word: 'baixar', es: 'descargar', emoji: '⬇️', example: 'Vou baixar o aplicativo agora.', exampleEs: 'Voy a descargar la aplicación ahora.', pronunciation: '[bay-SHAR]' },
      { word: 'a conexão', es: 'la conexión', emoji: '📶', example: 'A conexão com a internet está lenta hoje.', exampleEs: 'La conexión a internet está lenta hoy.', pronunciation: '[ko-nek-SOWNG]' },
      { word: 'o aparelho', es: 'el aparato/dispositivo', emoji: '📱', example: 'Meu aparelho celular está com problema.', exampleEs: 'Mi dispositivo celular tiene un problema.', pronunciation: '[ah-pah-REH-lyoo]' },
      { word: 'o e-mail', es: 'el correo electrónico', emoji: '📧', example: 'Mandei o documento por e-mail.', exampleEs: 'Envié el documento por correo electrónico.', pronunciation: '[ee-MAY-oo]' },
      { word: 'anexar', es: 'adjuntar', emoji: '📎', example: 'Não esqueça de anexar o currículo.', exampleEs: 'No olvides adjuntar el currículum.', pronunciation: '[ah-neh-KS-ar]' },
      { word: 'pesquisar', es: 'buscar/investigar', emoji: '🔍', example: 'Vou pesquisar o assunto no Google.', exampleEs: 'Voy a buscar el tema en Google.', pronunciation: '[pes-kee-ZAR]' },
      { word: 'carregar', es: 'cargar (batería)', emoji: '🔋', example: 'Preciso carregar o celular — está com 5%.', exampleEs: 'Necesito cargar el celular — está al 5%.', pronunciation: '[ka-heh-GAR]' },
      { word: 'a notificação', es: 'la notificación', emoji: '🔔', example: 'Recebi muitas notificações do WhatsApp.', exampleEs: 'Recibí muchas notificaciones de WhatsApp.', pronunciation: '[noo-tchi-fee-kah-SOWNG]' },
    ],
  },
  {
    id: 'meioambiente', name: 'Medio ambiente y naturaleza', namePt: 'Meio ambiente e natureza', icon: '🌿',
    words: [
      { word: 'a poluição', es: 'la contaminación', emoji: '🏭', example: 'A poluição do ar é um problema grave nas cidades.', exampleEs: 'La contaminación del aire es un problema grave en las ciudades.', pronunciation: '[poo-loo-ee-SOWNG]' },
      { word: 'reciclar', es: 'reciclar', emoji: '♻️', example: 'É importante reciclar vidro, papel e plástico.', exampleEs: 'Es importante reciclar vidrio, papel y plástico.', pronunciation: '[heh-see-KLAR]' },
      { word: 'renovável', es: 'renovable', emoji: '☀️', example: 'O Brasil investe muito em energia renovável.', exampleEs: 'Brasil invierte mucho en energía renovable.', pronunciation: '[heh-noo-VAH-vel]' },
      { word: 'a seca', es: 'la sequía', emoji: '🏜️', example: 'A seca afetou muitas regiões do Nordeste.', exampleEs: 'La sequía afectó muchas regiones del Nordeste.', pronunciation: '[SEH-kah]' },
      { word: 'a enchente', es: 'la inundación', emoji: '🌊', example: 'As enchentes causaram muitos danos neste ano.', exampleEs: 'Las inundaciones causaron muchos daños este año.', pronunciation: '[en-SHEN-tchi]' },
      { word: 'a espécie ameaçada', es: 'la especie amenazada', emoji: '🐆', example: 'A onça-pintada é uma espécie ameaçada no Brasil.', exampleEs: 'El jaguar es una especie amenazada en Brasil.', pronunciation: '[es-PEH-syeh ah-meh-ah-SAH-dah]' },
      { word: 'o habitat', es: 'el hábitat', emoji: '🌴', example: 'A destruição do habitat é a maior ameaça à biodiversidade.', exampleEs: 'La destrucción del hábitat es la mayor amenaza a la biodiversidad.', pronunciation: '[ah-bi-TAT]' },
      { word: 'o desmatamento', es: 'la deforestación', emoji: '🪵', example: 'O desmatamento da Amazônia é um problema global.', exampleEs: 'La deforestación de la Amazonía es un problema global.', pronunciation: '[dez-mah-tah-MEN-too]' },
      { word: 'o clima', es: 'el clima', emoji: '🌡️', example: 'As mudanças no clima afetam todo o planeta.', exampleEs: 'Los cambios en el clima afectan todo el planeta.', pronunciation: '[KLEE-mah]' },
      { word: 'o carbono', es: 'el carbono', emoji: '💨', example: 'Precisamos reduzir as emissões de carbono.', exampleEs: 'Necesitamos reducir las emisiones de carbono.', pronunciation: '[kar-BOH-noo]' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';
function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>Baralho completo!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palavras marcadas como conhecidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir baralho</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            {w.pronunciation && <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLORMix(8.2)}` }}>{w.pronunciation}</div>}
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toque para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br /><span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ Eu sei</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Rever →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
        {w.pronunciation && <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.3rem' }}>{w.pronunciation}</div>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Próxima →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} corretas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Outros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() || input.trim().toLowerCase() === w.word.replace(/\/.*$/, '').trim().toLowerCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escreva a palavra em português:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked} placeholder="Sua resposta em português..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ Correto!' : `✗ A resposta é: ${w.word}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Próxima →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioPortuguesA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.25rem' }}>← {set.namePt}</button>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabulário A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.namePt}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} palavras · Escolha um modo de prática</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[{ id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Veja cada palavra e sua tradução.' }, { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Múltipla escolha', desc: 'Escolha a tradução correta.' }, { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escrever a palavra', desc: 'Escreva a palavra em português.' }].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Lista de palavras</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{w.es}</div>
                {w.pronunciation && <div style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)' }}>{w.pronunciation}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulário</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulário · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulário A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temas essenciais — 80 palavras com fonética e exemplos. Flashcards, múltipla escolha e escrita.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.namePt}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} palavras</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Começar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
