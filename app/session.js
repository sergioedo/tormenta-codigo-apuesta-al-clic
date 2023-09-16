import nextAppSession from 'next-app-session';

// Setup the config for your session and cookie
export const session = nextAppSession({
    name: 'SID',
    secret: 'cr84nut98uvy908453yt09n89v94vnfjhgd'
});

export const getUserRandomValue = async () => {
    // Read random value from session
    const current = await session().get('random_value');

    // Set random value, if not defined yet in session
    if (current == undefined) {
        await session().set('random_value', Math.floor(Math.random() * 11));
    }
    const randomValue = await session().get('random_value');

    return randomValue;
}

export const resetUser = async () => {
    await session().destroy('random_value');
    await session().destroy('winner');
}

export const isWinnerUser = async () => {
    const isWinner = await session().get('winner');
    return isWinner;
}

export const setWinnerUser = async (value = false) => {
    await session().set('winner', value);
}