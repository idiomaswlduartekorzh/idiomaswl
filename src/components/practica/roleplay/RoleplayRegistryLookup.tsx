'use client'

import { useState, type FormEvent, type ReactNode } from 'react'
import s from './roleplay.module.css'

/** A local prop for one published case. The result is the scenario's existing card. */
export default function RoleplayRegistryLookup({ result }: { result: ReactNode }) {
  const [buyer, setBuyer] = useState('')
  const [phone, setPhone] = useState('')
  const [searched, setSearched] = useState(false)
  const [found, setFound] = useState(false)
  const [solution, setSolution] = useState('')
  const [box, setBox] = useState('')
  const [owner, setOwner] = useState('')
  const [when, setWhen] = useState('')
  const [prepared, setPrepared] = useState(false)

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const normalizedBuyer = buyer.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    setFound(normalizedBuyer === 'lucia' && phone.trim() === '8842')
    setSearched(true)
    setPrepared(false)
  }

  return (
    <div className={s.systemWindow}>
      <div className={s.systemTitlebar}>
        <span aria-hidden="true" className={s.systemIndicator} />
        <strong>Casa Norte · Registro de regalos</strong>
        <span>Simulación del caso</span>
      </div>
      <div className={s.systemBody}>
        <p className={s.systemEyebrow}>Buscar una compra existente</p>
        <h2>Identifica el pedido antes de ofrecer una solución</h2>
        <p>Pide a la clienta el nombre y los últimos cuatro dígitos del teléfono de quien compró el regalo. Ingresa lo que te diga.</p>
        <form className={s.systemForm} onSubmit={search}>
          <label>
            Nombre de quien compró
            <input autoComplete="off" value={buyer} onChange={(event) => { setBuyer(event.target.value); setSearched(false) }} placeholder="Nombre" required />
          </label>
          <label>
            Últimos 4 dígitos del teléfono
            <input autoComplete="off" inputMode="numeric" pattern="[0-9]{4}" maxLength={4} value={phone} onChange={(event) => { setPhone(event.target.value); setSearched(false) }} placeholder="0000" required />
          </label>
          <button className="wlp-btn" type="submit">Buscar pedido</button>
        </form>
        <div className={s.systemResult} role="status" aria-live="polite">
          {!searched ? 'Esperando datos de la clienta.' : found ? 'Pedido encontrado. Revisa el registro y explica solo los datos necesarios.' : 'No hay coincidencia con esos datos. Confirma el nombre y el teléfono con la clienta.'}
        </div>
        {searched && found ? (
          <div className={s.systemRecord}>
            {result}
            <form className={s.decisionForm} onSubmit={(event) => { event.preventDefault(); setPrepared(true) }}>
              <h3>Prepara la decisión con la clienta</h3>
              <p>El registro muestra las opciones posibles. Acuerden una antes de completar esta nota local.</p>
              <label>
                Solución elegida
                <select value={solution} onChange={(event) => { setSolution(event.target.value); setPrepared(false) }} required>
                  <option value="">Elige después de hablar</option>
                  <option value="Replacement today">Replacement today · if the serial number matches</option>
                  <option value="Store credit">Store credit · manager approval needed</option>
                  <option value="Refund">Refund to original payment · manager approval needed</option>
                </select>
              </label>
              <div className={s.decisionFields}>
                <label>¿Qué pasa con la licuadora y su caja?<input value={box} onChange={(event) => { setBox(event.target.value); setPrepared(false) }} placeholder="Box and product" required /></label>
                <label>¿Quién hace el siguiente paso?<input value={owner} onChange={(event) => { setOwner(event.target.value); setPrepared(false) }} placeholder="Person responsible" required /></label>
                <label>¿Cuándo ocurre?<input value={when} onChange={(event) => { setWhen(event.target.value); setPrepared(false) }} placeholder="Exact time or date" required /></label>
              </div>
              <button className="wlp-btn wlp-btn--secondary" type="submit">Preparar nota de cierre</button>
            </form>
            {prepared ? (
              <div className={s.decisionSummary} role="status" aria-live="polite">
                <strong>Nota de cierre · repítanla los dos</strong>
                <dl>
                  <div><dt>Solution</dt><dd>{solution}</dd></div>
                  <div><dt>Box / product</dt><dd>{box}</dd></div>
                  <div><dt>Next person</dt><dd>{owner}</dd></div>
                  <div><dt>Time / date</dt><dd>{when}</dd></div>
                </dl>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}
