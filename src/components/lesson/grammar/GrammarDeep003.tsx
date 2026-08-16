/** GrammarDeep003 — Server Component. SEO: forma -요, 주세요, cortesía coreana, saludos. */

export default function GrammarDeep003() {
  const accent = '#6c63ff';
  return (
    <section aria-label="Explicación gramatical — Día 3: Cortesía y cafetería" style={{ maxWidth: 720, margin: '0 auto', padding: '3rem 1.25rem 4rem', fontFamily: 'system-ui,-apple-system,"Segoe UI",sans-serif', color: 'var(--ink)' }}>

      <div style={{ marginBottom: '2.5rem', borderTop: `3px solid ${accent}`, paddingTop: '2rem' }}>
        <p style={{ margin: '0 0 6px', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: accent }}>REFERENCIA GRAMATICAL · DÍA 3</p>
        <h2 style={{ margin: '0 0 10px', fontSize: 28, fontWeight: 800, lineHeight: 1.2 }}>주세요, 감사합니다 y la forma -요: cortesía coreana esencial</h2>
        <p style={{ margin: 0, fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>El sistema de niveles de formalidad del coreano, el sufijo -요 para hablar con cortesía, y las frases imprescindibles para cualquier situación pública en Corea.</p>
      </div>

      {/* 1 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>1. Los 3 niveles de cortesía que usarás en Corea</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El coreano tiene oficialmente 7 niveles de formalidad, pero en la vida cotidiana moderna se usan principalmente tres. Usar el nivel incorrecto no es solo un error gramatical — es una señal social que el interlocutor registra de inmediato. Para un extranjero, el nivel educado (-요) es la armadura perfecta: nunca ofende, nunca suena demasiado formal ni demasiado relajado.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 2fr' }}>
            {[['Nivel','Sufijo','Cuándo usarlo'],['합쇼체 (formal)','-(스)ㅂ니다','Noticias, discursos, presentaciones, jefes directos'],['해요체 (educado)','-요','Tiendas, cafés, desconocidos, uso diario ★ RECOMENDADO'],['해체 (casual)','(sin sufijo)','Amigos íntimos, familia, personas menores']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`l-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : 13, fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : ri === 2 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 1 ? accent : 'var(--ink)', fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', background: ri === 0 ? accent : ri === 2 ? `${accent}08` : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
        <div style={{ background: `${accent}08`, border: `1px solid ${accent}25`, borderRadius: 10, padding: '12px 16px' }}>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7 }}>💡 <strong>Regla de oro para extranjeros:</strong> usa siempre el nivel -요 (해요체) en cualquier situación pública. Funciona en tiendas, cafés, transporte, con personas mayores y con desconocidos. El nivel formal (-ㅂ니다) lo aprenderás de forma natural a medida que avances.</p>
        </div>
      </div>

      {/* 2 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>2. El sufijo -요 — cómo funciona la cortesía</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El sufijo <strong>-요</strong> es lo que transforma un verbo casual en una expresión educada. Se añade directamente al final del verbo conjugado. La misma raíz verbal puede sonar íntima o respetuosa dependiendo de si lleva -요 o no.
        </p>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)', marginBottom: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            {[['Raíz verbal','Sin -요 (casual)','Con -요 (educado)'],['가다 (ir)','가','가요'],['오다 (venir)','와','와요'],['먹다 (comer)','먹어','먹어요'],['주다 (dar)','줘','줘요 / 주세요'],['있다 (estar/haber)','있어','있어요']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`r-${ri}-${ci}`} style={{ padding: '9px 12px', fontSize: ri === 0 ? 10 : ci > 0 ? 15 : 13, fontFamily: ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : 600, color: ri === 0 ? '#fff' : ci === 2 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 3 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>3. 주세요 — la frase más útil del coreano de supervivencia</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          <span style={{ fontFamily: "'Noto Sans KR',sans-serif", color: accent, fontWeight: 700, fontSize: 17 }}>주세요</span> viene de <strong>주다</strong> (dar) + <strong>세요</strong> (imperativo honorífico suave). Significa literalmente "por favor deme" y funciona como navaja suiza: añade cualquier sustantivo delante y tienes un pedido educado correcto al 100%.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
          {[['물 주세요','mul ju-se-yo','Agua, por favor'],['메뉴 주세요','me-nyu ju-se-yo','El menú, por favor'],['영수증 주세요','yeong-su-jeung ju-se-yo','El recibo, por favor'],['봉투 주세요','bong-tu ju-se-yo','Una bolsa, por favor'],['아메리카노 한 잔 주세요','a-me-ri-ka-no han jan ju-se-yo','Un americano, por favor']].map(([kr, rom, es]) => (
            <div key={kr} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ padding: '10px 12px', fontFamily: "'Noto Sans KR',sans-serif", fontSize: 16, fontWeight: 700, color: accent, borderRight: '1px solid var(--line-soft)' }}>{kr}</div>
              <div style={{ padding: '10px 12px', fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', borderRight: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center' }}>{rom}</div>
              <div style={{ padding: '10px 12px', fontSize: 13, color: 'var(--ink)', display: 'flex', alignItems: 'center' }}>{es}</div>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
          La fórmula es <strong>[sustantivo] + [cantidad opcional] + 주세요</strong>. Funciona en cafés, restaurantes, tiendas, farmacias y mercados. Con esta sola frase puedes sobrevivir el 80% de las interacciones comerciales en Corea.
        </p>
      </div>

      {/* 4 */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>4. Gracias en coreano — tres niveles para una sola palabra</h3>
        <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          El agradecimiento en coreano cambia según el nivel de formalidad. Usar el nivel incorrecto puede sonar irrespetuoso (informal con extraños) o artificialmente rígido (formal con amigos).
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          {[{ kr: '감사합니다', rom: 'gam-sa-ham-ni-da', level: 'Formal', when: 'Tiendas, servicios, personas mayores', color: 'var(--wl-on-panel-link, #6c63ff)' }, { kr: '고마워요', rom: 'go-ma-wo-yo', level: 'Educado', when: 'Conocidos, compañeros, vecinos', color: '#22c55e' }, { kr: '고마워', rom: 'go-ma-wo', level: 'Casual', when: 'Solo amigos íntimos y familia', color: '#f59e0b' }].map(g => (
            <div key={g.kr} style={{ background: 'var(--bg-2)', border: `2px solid ${g.color}25`, borderRadius: 10, padding: '14px', textAlign: 'center' }}>
              <p style={{ margin: '0 0 2px', fontSize: 20, fontFamily: "'Noto Sans KR',sans-serif", fontWeight: 800, color: g.color }}>{g.kr}</p>
              <p style={{ margin: '0 0 6px', fontSize: 10, fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{g.rom}</p>
              <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, color: g.color }}>{g.level}</p>
              <p style={{ margin: 0, fontSize: 11, color: 'var(--muted)', lineHeight: 1.5 }}>{g.when}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.85, color: 'var(--muted)' }}>
          La reverencia acompaña el agradecimiento formal: una inclinación de 15° al decir 감사합니다 completa el gesto de respeto. Recibir algo con <strong>ambas manos</strong> mientras dices 감사합니다 es la forma más completa de mostrar cortesía en un intercambio coreano.
        </p>
      </div>

      {/* 5 — Errores */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 14px', fontSize: 20, fontWeight: 700 }}>5. Errores comunes de hispanohablantes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: '01', title: 'Usar 고마워 con desconocidos', why: 'En español "gracias" es neutro para todos. En coreano 고마워 es íntimo — con un desconocido suena irrespetuoso. Usa siempre 감사합니다 o 고마워요 en público.' },
            { n: '02', title: 'Añadir artículo antes de 주세요', why: 'En español decimos "El menú, por favor". En coreano no hay artículo: 메뉴 주세요 (sin "el"). Escribir o pensar en el artículo es un paso extra innecesario.' },
            { n: '03', title: 'Olvidar la reverencia', why: 'En Corea los gestos físicos son parte de la comunicación formal. Decir 감사합니다 mirando al frente sin inclinarse puede sonar mecánico. Una pequeña inclinación de 15° completa el mensaje.' },
          ].map(e => (
            <div key={e.n} style={{ background: 'var(--bg-2)', border: '1px solid var(--line-soft)', borderRadius: 10, padding: '14px 16px', display: 'flex', gap: 14 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--muted)', opacity: 0.3, flexShrink: 0, lineHeight: 1.2 }}>{e.n}</span>
              <div><p style={{ margin: '0 0 6px', fontSize: 14, fontWeight: 700 }}>{e.title}</p><p style={{ margin: 0, fontSize: 12, color: 'var(--muted)', lineHeight: 1.6 }}>{e.why}</p></div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 — Vocabulario */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ margin: '0 0 12px', fontSize: 20, fontWeight: 700 }}>6. Vocabulario completo del Día 3</h3>
        <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--line-soft)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr' }}>
            {[['Coreano','Romano','Español','Notas'],['어서 오세요','eo-seo o-se-yo','Bienvenido/a','protocolo de entrada a tiendas'],['안녕하세요','an-nyeong-ha-se-yo','Hola (formal)','mañana/tarde/noche — siempre válido'],['아메리카노 한 잔 주세요','a-me-ri-ka-no han jan ju-se-yo','Un americano, por favor','fórmula: bebida + cantidad + 주세요'],['네, 금방 드릴게요','ne geum-bang deu-ril-ge-yo','Sí, ahora mismo','respuesta de servicio estándar'],['사이즈 뭐로 드릴까요','sa-i-jeu mwo-ro deu-ril-kka-yo','¿De qué tamaño?','드릴까요 = forma ultra-cortés de preguntar'],['여기 있습니다','yeo-gi it-seum-ni-da','Aquí tiene','entrega formal, nivel -ㅂ니다'],['감사합니다','gam-sa-ham-ni-da','Gracias (formal)','+ reverencia 15° + ambas manos'],['이름이 뭐예요','i-reu-mi mwo-ye-yo','¿Cómo te llamas?','estructura: [sustantivo]+이/가+뭐예요']].map((row, ri) =>
              row.map((cell, ci) => (
                <div key={`voc-${ri}-${ci}`} style={{ padding: '8px 10px', fontSize: ri === 0 ? 10 : ci === 0 ? 14 : 12, fontFamily: ci === 0 && ri > 0 ? "'Noto Sans KR',sans-serif" : 'inherit', fontWeight: ri === 0 ? 700 : ci === 0 ? 700 : 400, color: ri === 0 ? '#fff' : ci === 0 ? accent : 'var(--ink)', background: ri === 0 ? accent : ri % 2 === 0 ? 'var(--bg-2)' : 'var(--bg)', borderTop: ri > 0 ? '1px solid var(--line-soft)' : 'none', borderLeft: ci > 0 ? '1px solid var(--line-soft)' : 'none', textTransform: ri === 0 ? 'uppercase' : 'none', letterSpacing: ri === 0 ? '0.06em' : 0 }}>
                  {cell}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div style={{ background: `${accent}0d`, border: `1px solid ${accent}30`, borderRadius: 14, padding: '20px 24px' }}>
        <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: accent }}>Siguiente paso</p>
        <h4 style={{ margin: '0 0 8px', fontSize: 16, fontWeight: 700 }}>Día 4: Mercado callejero y números nativos</h4>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--muted)', lineHeight: 1.65 }}>Aprende los números nativos coreanos (하나, 둘, 셋...) en contexto real — pides hodduk en un mercado callejero de Seúl y descubres que el sabor cambia el vocabulario.</p>
      </div>
    </section>
  );
}
