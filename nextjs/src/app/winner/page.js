import Link from 'next/link';
import { reset } from '../actions';

export default function Winner() {
    return (
        <>
            <div class="result-container">
                <iframe
                    id="result-gif"
                    src="https://giphy.com/embed/3o72FeJnjfZZ31WjBu"
                    width="480"
                    height="304"
                    frameborder="0"
                    class="giphy-embed"
                    allowfullscreen
                ></iframe>
            </div>
            <form action={reset}>
                <button className="bet-button" type="submit">🎲 Volver a Jugar 🎲</button>
            </form>
        </>
    )
}