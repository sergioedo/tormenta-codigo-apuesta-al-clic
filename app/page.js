'use client';

// import Image from 'next/image'
import { useState } from 'react'
import { apuesta } from './actions'

export default function Home() {
  const [clics, setClics] = useState(0);
  const [resultadoApuesta, setResultadoApuesta] = useState()

  async function onApuesta(formData) {
    const res = await apuesta(formData)
    setResultadoApuesta(res.success)
  }

  return (
    <>
      <h1>Apuesta al clic</h1>

      {/* <!-- Contador de clics --> */}
      <div className="counter">
        Clics: <span id="counter">{clics}</span>
      </div>

      {/* <!-- Botón rojo grande y redondo --> */}
      <button className="red-button" onClick={() => setClics((clics + 1) % 11)}>Clic</button>

      <hr />

      {/* <!-- Botón para hacer la apuesta con emojis --> */}
      <form action={onApuesta}>
        <input type="hidden" name="clics" value={clics} />
        <button className="bet-button" type="submit">🎲 Apuesta 🎲</button>
        <p>{resultadoApuesta ? 'Premio!' : resultadoApuesta === false ? 'Sigue probando...' : ''}</p>
      </form>
    </>
  )
}
