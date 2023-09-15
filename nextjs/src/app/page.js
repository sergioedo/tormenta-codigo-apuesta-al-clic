'use client';

// import Image from 'next/image'
import { useState } from 'react'
import styles from './page.module.css'

export default function Home() {
  const [clics, setClics] = useState(0);
  return (
    <>
      <h1>Apuesta al clic</h1>

      {/* <!-- Contador de clics --> */}
      <div className="counter">
        Clics: <span id="counter">{clics}</span>
      </div>

      {/* <!-- Botón rojo grande y redondo --> */}
      <button className="red-button" onClick={() => setClics(clics + 1)}>Clic</button>

      <hr />

      {/* <!-- Botón para hacer la apuesta con emojis --> */}
      <button className="bet-button">🎲 Apuesta 🎲</button>
    </>
  )
}
