'use server'
import { session } from './session';

export async function apuesta(formData) {
    // Read current random value from session
    const current = await session().get('random_value');

    // Set random value, if not defined yet in session
    if (current == undefined) {
        await session().set('random_value', Math.floor(Math.random() * 11));
    }
    const randomValue = await session().get('random_value');

    const clics = parseInt(formData.get('clics'));

    console.log({ randomValue, clics });

    return { success: randomValue === clics };
}