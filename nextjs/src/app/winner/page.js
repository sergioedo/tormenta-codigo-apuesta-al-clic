import Link from 'next/link';
import { reset } from '../actions';

export default function Winner() {
    return (
        <>
            <div className="result-container">
                <iframe
                    id="result-gif"
                    src="https://giphy.com/embed/3o72FeJnjfZZ31WjBu"
                    width="480"
                    height="304"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                ></iframe>
            </div>
            <form action={reset}>
                <button className="bet-button" type="submit">🎲 Volver a Jugar 🎲</button>
            </form>
        </>
    )
}