'use server'
import { getUserRandomValue, resetUser } from './session';
import { redirect } from 'next/navigation';

export async function apuesta(formData) {
    const randomValue = await getUserRandomValue();
    const clics = parseInt(formData.get('clics'));
    const success = randomValue === clics;

    if (success) redirect(`/winner`);

    return { success };
}

export async function reset(formData) {
    await resetUser();
    redirect(`/`);
}