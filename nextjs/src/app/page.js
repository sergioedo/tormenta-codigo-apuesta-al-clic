// import Image from 'next/image'
import styles from './page.module.css'

export default function Home() {
  return (
    <>
      <h1>Apuesta al clic</h1>

      {/* <!-- Contador de clics --> */}
      <div className="counter">
        Clics: <span id="counter">0</span>
      </div>

      {/* <!-- Botón rojo grande y redondo --> */}
      <button className="red-button">Clic</button>

      <hr />

      {/* <!-- Botón para hacer la apuesta con emojis --> */}
      <button className="bet-button">🎲 Apuesta 🎲</button>
    </>
  )
}
