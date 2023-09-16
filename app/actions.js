'use server'
import { getUserRandomValue, resetUser, setWinnerUser } from './session';
import { redirect } from 'next/navigation';

export async function apuesta(formData) {
    const randomValue = await getUserRandomValue();
    const clics = parseInt(formData.get('clics'));

    const success = randomValue === clics;
    await setWinnerUser(success);

    if (success) redirect(`/winner`);

    return { success };
}

export async function reset(formData) {
    await resetUser();
    redirect(`/`);
}