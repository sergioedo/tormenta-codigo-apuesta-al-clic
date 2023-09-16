'use server'
import { session } from './session';
import { redirect } from 'next/navigation';

export async function apuesta(formData) {
    // Read current random value from session
    const current = await session().get('random_value');

    // Set random value, if not defined yet in session
    if (current == undefined) {
        await session().set('random_value', Math.floor(Math.random() * 11));
    }
    const randomValue = await session().get('random_value');

    const clics = parseInt(formData.get('clics'));
    const success = randomValue === clics;

    if (success) redirect(`/winner`);

    return { success };
}

export async function reset(formData) {
    await session().destroy('random_value');
    redirect(`/`);
}