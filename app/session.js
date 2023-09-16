import { get, set } from './session-store';

export const getUserRandomValue = async () => {
    // Read random value from session
    const current = await get('random_value');

    // Set random value, if not defined yet in session
    if (current == undefined) {
        await set('random_value', Math.floor(Math.random() * 11));
    }
    const randomValue = await get('random_value');

    return randomValue;
}

export const resetUser = async () => {
    await set('random_value', null);
    await set('winner', null);
}

export const isWinnerUser = async () => {
    const isWinner = await get('winner');
    return isWinner;
}

export const setWinnerUser = async (value = false) => {
    await set('winner', value);
}